from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import check_access_to_business


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

    for product in products:
        product.preps = [
            prep for prep in product.preps if not prep.is_deleted and prep.is_active
        ]

    return s.BusinessProductsOut(products=products)


@router.post("/{business_uid}/order", status_code=status.HTTP_201_CREATED)
def create_order_for_business(
    business_uid: str, data: s.CreateOrder, db: Session = Depends(get_db)
):
    pass
