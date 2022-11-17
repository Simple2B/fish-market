from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import get_business_id_from_cur_user, access_to_product


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


@router.get("/{id}", status_code=status.HTTP_200_OK)
def get_product_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "get_product_by_id")
    product = db.query(m.Product).get(id)

    access_to_product(product=product, user=current_user)

    return s.ProductOut(
        id=product.id,
        name=product.name,
        price=product.price,
        sold_by=product.sold_by,
        image=product.image,
    )


@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_product_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "delete_product_by_id")
    product = db.query(m.Product).get(id)

    access_to_product(product=product, user=current_user)

    product.is_deleted = True
    db.commit()

    return {"ok", "true"}


@router.patch("/{id}", status_code=status.HTTP_200_OK)
def update_product(
    id: int,
    data: s.UpdateProduct,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "update_product")
    product = db.query(m.Product).get(id)

    access_to_product(product=product, user=current_user)

    update_data: dict = data.dict()
    for key, value in update_data.items():
        if value is not None:
            setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return s.ProductOut(
        id=product.id,
        name=product.name,
        price=product.price,
        sold_by=product.sold_by,
        image=product.image,
    )


@router.post(
    "/{id}/prep",
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
    access_to_product(product=product, user=current_user)

    prep: m.Prep = m.Prep(product_id=product.id, name=data.name)

    db.add(prep)
    db.commit()
    db.refresh(prep)

    return s.ProductPrepOut(id=prep.id, name=prep.name, is_active=prep.is_active)


@router.get(
    "/{id}/prep",
    status_code=status.HTTP_200_OK,
)
def get_product_prep(
    id: int,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):
    log(log.INFO, "get_product_prep")
    product = db.query(m.Product).get(id)

    access_to_product(product=product, user=current_user)

    preps = db.query(m.Prep).filter_by(product_id=id, is_deleted=False).all()

    return s.ProductPrepsOut(id=product.id, preps=preps)
