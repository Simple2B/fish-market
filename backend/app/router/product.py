from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import get_business_id_from_cur_user


router = APIRouter(prefix="/product", tags=["Product"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_products(
    db: Session = Depends(get_db), current_user: m.User = Depends(get_current_user)
):

    business_id = current_user.businesses[0].id

    products = db.query(m.Product).filter_by(business_id=business_id).all()

    return s.ProductsOut(products=products)


@router.post("/", response_model=s.ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    data: s.CreateProduct,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "create_product")
    business_id = get_business_id_from_cur_user(current_user)

    new_product = m.Product(business_id=business_id, **data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product
