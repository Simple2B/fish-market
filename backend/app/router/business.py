import os
import uuid
from pathlib import Path
from urllib.parse import urljoin

from fastapi import Depends, APIRouter, status, HTTPException, UploadFile, File, Request
from sqlalchemy.orm import Session

from app.service import get_current_user, get_business_from_cur_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import check_access_to_business, check_access_to_order
from app.config import settings


router = APIRouter(prefix="/business", tags=["Business"])


@router.get("/", response_model=s.UserBusinessOut, status_code=status.HTTP_200_OK)
def get_business_cur_user(
    business: m.User = Depends(get_business_from_cur_user),
):
    log(log.INFO, "get_business_cur_user business_id:[%d]", business.id)

    return business


@router.patch("/", status_code=status.HTTP_200_OK)
def update_business_cur_user(
    data: s.BusinessUpdate,
    db: Session = Depends(get_db),
    business: m.User = Depends(get_business_from_cur_user),
):
    log(log.INFO, "update_business_cur_user, business_id: [%d]", business.id)

    data: dict = data.dict()
    for key, value in data.items():
        if key == "user_email" and value is not None:
            email = db.query(m.User).filter_by(email=value).first()
            if email:
                continue

        if value is not None:
            setattr(business, key, value)

    db.commit()
    db.refresh(business)

    return s.BusinessUpdateOut(
        name=business.name, logo=business.logo, email=business.user_email
    )


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
        if not product.is_deleted and not product.is_out_of_stock
    ]

    show_products = []
    for product in products:
        preps = [
            prep for prep in product.preps if not prep.is_deleted and prep.is_active
        ]
        if preps:
            show_products.append(
                s.BusinessProductOut(
                    id=product.id,
                    name=product.name,
                    price=product.price,
                    image=product.image,
                    sold_by=product.sold_by,
                    preps=preps,
                )
            )

    return s.BusinessProductsOut(products=show_products)


@router.post("/{business_uid}/order", status_code=status.HTTP_201_CREATED)
def create_order_for_business(
    business_uid: str, data: s.CreateOrder, db: Session = Depends(get_db)
):
    log(log.INFO, "create_order_for_business")

    prep_ids = set(item.prep_id for item in data.items)
    preps = db.query(m.Prep).filter(m.Prep.id.in_(prep_ids)).all()

    if len(prep_ids) != len(preps):
        log(log.ERROR, "Incorrect data")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Incorrect data"
        )

    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )

    check_access_to_business(business=business, data_mes=business_uid)

    phone_number = data.phone_number

    db_phone_number = db.query(m.PhoneNumber).filter_by(number=phone_number).first()

    if not db_phone_number or not db_phone_number.is_number_verified:
        log(log.ERROR, "Phone number is not valid")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Phone number is not valid",
        )

    log(log.INFO, "create order")
    order_status = (
        m.OrderStatus.pending if not data.pick_up_data else m.OrderStatus.created
    )
    order = m.Order(
        phone_number_id=db_phone_number.id,
        business_id=business.id,
        customer_name=data.customer_name,
        note=data.note,
        pick_up_data=data.pick_up_data,
        status=order_status,
    )
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

    return s.CreateOrderOut(
        phone_number=order.phone_number.number, order_status=order.status
    )


@router.delete("/{business_uid}/order/{order_uid}", status_code=status.HTTP_200_OK)
def delete_order(business_uid: str, order_uid: str, db: Session = Depends(get_db)):
    log(log.INFO, "delete_order")
    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )

    check_access_to_business(business=business, data_mes=business_uid)

    order = db.query(m.Order).filter_by(order_uid=order_uid).first()

    check_access_to_order(order=order)

    order.is_deleted = True
    db.commit()

    return {"ok", True}


@router.get("/{business_uid}/order/{order_uid}", status_code=status.HTTP_200_OK)
def get_order(business_uid: str, order_uid: str, db: Session = Depends(get_db)):
    log(log.INFO, "get_order")
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
            id=item.product.id,
            name=item.product.name,
            price=item.product.price,
            image=item.product.image,
            sold_by=item.product.sold_by,
            elect_prep=item,
            preps=preps,
        )
        get_products.append(product_schema)

    return s.OrderProductsOut(products=get_products)


# @router.patch("/{business_uid}/order/{order_uid}", status_code=status.HTTP_200_OK)
# def patch_customer_order(
#     data: s.UpdateOrderProducts,
#     business_uid: str,
#     order_uid: str,
#     db: Session = Depends(get_db),
# ):
#     log(log.INFO, "patch_customer_order")
#     # TODO prep belongs to product, chack  the stats order was not in progre
#     business: m.Business = (
#         db.query(m.Business).filter_by(web_site_id=business_uid).first()
#     )
#     check_access_to_business(business=business, data_mes=business_uid)
#     order = db.query(m.Order).filter_by(order_uid=order_uid).first()

#     check_access_to_order(order=order)

#     products = data.products


@router.get(
    "/{business_uid}",
    response_model=s.BusinessOut,
    status_code=status.HTTP_200_OK,
)
def get_business_out_by_uid(business_uid: str, db: Session = Depends(get_db)):
    log(log.INFO, "get_business_out_by_uid [%s]", business_uid)

    business: m.Business = (
        db.query(m.Business).filter_by(web_site_id=business_uid).first()
    )
    check_access_to_business(business=business, data_mes=business_uid)

    return business


@router.post("/img/{business_id}/{img_type}", response_model=s.BusinessImage)
def upload_business_image(
    business_id: int,
    img_type: s.BusinessImageType,
    request: Request,
    current_user: m.User = Depends(get_current_user),
    img_file: UploadFile = File(),
):

    if business_id not in [b.id for b in current_user.businesses]:
        log(
            log.WARNING,
            "Wrong business id:[%d] for user: [%s]",
            business_id,
            current_user,
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Business was not found",
        )

    file_name = str(uuid.uuid4()) + "." + img_file.filename.split(".")[-1]

    dir_path = (
        Path(settings.STATIC_FOLDER)
        / "market"
        / "img"
        / f"{business_id}"
        / f"{img_type.value}"
    )

    os.makedirs(dir_path, exist_ok=True)

    file_path = Path(dir_path) / file_name

    with open(file_path, "wb") as f:
        log(log.INFO, "File :[%s] created", f.name)

    img_url = urljoin(
        str(request.base_url),
        f"static/market/img/{business_id}/{img_type.value}/{file_name}",
    )

    return s.BusinessImage(business_id=business_id, img_url=img_url)
