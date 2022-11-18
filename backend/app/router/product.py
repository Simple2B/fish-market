from fastapi import Depends, APIRouter, status
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import get_business_id_from_cur_user, check_access_to_product


router = APIRouter(prefix="/product", tags=["Product"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_products(
    db: Session = Depends(get_db), current_user: m.User = Depends(get_current_user)
):

    business_id = get_business_id_from_cur_user(current_user)

    products = (
        db.query(m.Product).filter_by(business_id=business_id, is_deleted=False).all()
    )

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


@router.get("/{id}", response_model=s.ProductOut, status_code=status.HTTP_200_OK)
def get_product_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "get_product_by_id")
    product = db.query(m.Product).get(id)

    check_access_to_product(product=product, user=current_user, product_id=id)

    return product


@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_product_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "delete_product_by_id")
    product = db.query(m.Product).get(id)

    check_access_to_product(product=product, user=current_user, product_id=id)

    product.is_deleted = True
    db.commit()

    return {"ok", "true"}


@router.patch("/{id}", response_model=s.ProductOut, status_code=status.HTTP_200_OK)
def update_product(
    id: int,
    data: s.UpdateProduct,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "update_product")
    product = db.query(m.Product).get(id)

    check_access_to_product(product=product, user=current_user, product_id=id)

    update_data: dict = data.dict()
    for key, value in update_data.items():
        if value is not None:
            setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product
