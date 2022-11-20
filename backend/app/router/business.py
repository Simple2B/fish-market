from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import check_access_to_business, check_access_to_order


router = APIRouter(prefix="/business", tags=["business"])


@router.get("/", response_model=s.BusinessOut)
def get_business_cur_user(
    db: Session = Depends(get_db), current_user: m.User = Depends(get_current_user)
):
    log(log.INFO, "get_business_cur_user [%s]", current_user)
    business: m.Business = (
        db.query(m.Business).filter_by(user_id=current_user.id).first()
    )

    check_access_to_business(business=business, data_mes=current_user)

    return business


@router.patch("/", status_code=status.HTTP_200_OK)
def update_business_cur_user(
    data: s.BusinessUpdate,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "update_business_cur_user")
    business: m.Business = (
        db.query(m.Business).filter_by(user_id=current_user.id).first()
    )

    check_access_to_business(business=business, data_mes=current_user)

    data: dict = data.dict()
    for key, value in data.items():
        if value is not None:
            setattr(business, key, value)

    db.commit()
    db.refresh(business)

    return s.BusinessUpdateOut(name=business.name, logo=business.logo)


@router.get("/{business_uid}/product", status_code=status.HTTP_200_OK)
def get_business_product_out(business_uid: str, db: Session = Depends(get_db)):
    log(log.INFO, "get_business_product_out: [%s]", business_uid)
    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )

    check_access_to_business(business=business, data_mes=business_uid)

    products = [
        product
        for product in business.products
        if not product.is_deleted and not product.is_out_of_stoke
    ]

    show_products = []
    for product in products:
        product.preps = [
            prep for prep in product.preps if not prep.is_deleted and prep.is_active
        ]
        if product.preps:
            show_products.append(product)

    return s.BusinessProductsOut(products=show_products)


@router.post("/{business_uid}/order", status_code=status.HTTP_201_CREATED)
def create_order_for_business(
    business_uid: str, data: s.CreateOrder, db: Session = Depends(get_db)
):
    log(log.INFO, "create_order_for_business")

    prep_ids = [item.prep_id for item in data.items]
    preps = db.query(m.Prep).filter(m.Prep.id.in_(prep_ids)).all()

    if len(prep_ids) != len(preps):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Incorrect data"
        )

    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )

    check_access_to_business(business=business, data_mes=business_uid)

    customer_data: s.CreateCustomer = data.customer

    customer = (
        db.query(m.Customer).filter_by(phone_number=customer_data.phone_number).first()
    )

    if not customer:
        log(log.INFO, "create customer")
        create_customer = m.Customer(**customer_data.dict())
        db.add(create_customer)
        db.commit()
        db.refresh(create_customer)
        customer = create_customer

    log(log.INFO, "create order")
    order = m.Order(customer_id=customer.id)
    db.add(order)
    db.commit()
    db.refresh(order)

    order_items = data.items

    log(log.INFO, "create_order_items")
    for item in order_items:
        create_order_item = m.OrderItem(
            order_id=order.id, prep_id=item.prep_id, qty=item.qty
        )
        db.add(create_order_item)
    db.commit()

    return s.CreateOrderOut(customer=customer, order_status=order.status)


@router.delete("/{business_uid}/order/{order_uid}", status_code=status.HTTP_200_OK)
def delete_customer_order(
    business_uid: str, order_uid: str, db: Session = Depends(get_db)
):
    log(log.INFO, "delete_customer_order")
    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )

    check_access_to_business(business=business, data_mes=business_uid)

    order = db.query(m.Order).filter_by(order_uid=order_uid).first()

    check_access_to_order(order=order)

    order.status = m.OrderStatus.cancelled
    db.commit()

    return {"ok", True}


@router.get("/{business_uid}/order/{order_uid}", status_code=status.HTTP_200_OK)
def get_customer_order(
    business_uid: str, order_uid: str, db: Session = Depends(get_db)
):
    log(log.INFO, "get_customer_order")
    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )

    check_access_to_business(business=business, data_mes=business_uid)

    order = db.query(m.Order).filter_by(order_uid=order_uid).first()

    check_access_to_order(order=order)

    get_products = []
    for item in order.items:
        preps = [
            prep
            for prep in item.product.preps
            if (not prep.is_deleted and prep.is_active) or prep.id == item.prep_id
        ]
        product_schema = s.OrderProductOut(
            name=item.product.name,
            price=item.product.price,
            image=item.product.image,
            sold_by=item.product.sold_by,
            elect_prep=item,
            preps=preps,
        )
        get_products.append(product_schema)

    return s.OrderProductsOut(products=get_products)
