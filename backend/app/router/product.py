from fastapi import Depends, APIRouter, status
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import (
    get_business_from_cur_user,
    check_access_to_product,
    check_access_to_product_prep,
)


router = APIRouter(prefix="/product", tags=["Product"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_products(
    db: Session = Depends(get_db), current_user: m.User = Depends(get_current_user)
):

    business = get_business_from_cur_user(current_user)

    products = (
        db.query(m.Product).filter_by(business_id=business.id, is_deleted=False).all()
    )

    return s.ProductsOut(products=products)


@router.post("/", response_model=s.ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    data: s.CreateProduct,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "create_product")
    business = get_business_from_cur_user(current_user)

    new_product = m.Product(business_id=business.id, **data.dict())
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


@router.post(
    "/{id}/prep",
    response_model=s.ProductPrepOut,
    status_code=status.HTTP_201_CREATED,
)
def create_product_prep(
    id: int,
    data: s.CreateProductPrep,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    product = db.query(m.Product).get(id)

    log(log.INFO, "create_product_prep")
    check_access_to_product(product=product, user=current_user, product_id=id)

    prep: m.Prep = m.Prep(product_id=product.id, name=data.name)

    db.add(prep)
    db.commit()
    db.refresh(prep)

    return prep


@router.get(
    "/{id}/prep",
    response_model=s.ProductPrepsOut,
    status_code=status.HTTP_200_OK,
)
def get_product_prep(
    id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "get_product_prep")
    product = db.query(m.Product).get(id)

    check_access_to_product(product=product, user=current_user, product_id=id)

    preps = db.query(m.Prep).filter_by(product_id=id, is_deleted=False).all()

    return s.ProductPrepsOut(id=product.id, preps=preps)


@router.delete("/{product_id}/prep/{prep_id}", status_code=status.HTTP_200_OK)
def delete_product_prep_by_id(
    product_id: int,
    prep_id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "delete_product_prep_by_id")
    product = db.query(m.Product).get(product_id)

    check_access_to_product(product=product, user=current_user, product_id=product_id)

    prep: m.Prep = db.query(m.Prep).get(prep_id)

    check_access_to_product_prep(prep_id=prep_id, product=product, prep=prep)
    # TODO can not show product without any preps or active preps

    prep.is_deleted = True
    db.commit()

    return {"ok", True}


@router.patch(
    "/{product_id}/prep/{prep_id}",
    response_model=s.ProductPrepOut,
    status_code=status.HTTP_200_OK,
)
def patch_product_prep_by_id(
    data: s.UpdateProductPrep,
    product_id: int,
    prep_id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "patch_product_prep_by_id")
    product = db.query(m.Product).get(product_id)

    check_access_to_product(product=product, user=current_user, product_id=product_id)

    prep: m.Prep = db.query(m.Prep).get(prep_id)

    check_access_to_product_prep(prep_id=prep_id, product=product, prep=prep)

    prep.is_active = data.is_active
    db.commit()

    return prep
