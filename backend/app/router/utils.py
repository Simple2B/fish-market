from typing import Optional

from fastapi import HTTPException, status

from app import model as m
from app.logger import log


def get_business_id_from_cur_user(user: m.User) -> Optional[int]:

    business_id = None

    if user.businesses and user.role == m.UserRole.Marketeer:
        business_id = user.businesses[0].id

    if not business_id:
        log(log.WARNING, "create_product: [%s] current user can not add new product")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Current user can not add new product",
        )

    return business_id


def access_to_product(product: m.Product, user: m.User) -> None:
    if user.role == m.UserRole.Admin:
        log(log.WARNING, "get_product_by_id: [%s] user can get product", str(user))
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="user can get product"
        )
    elif not product or product.is_deleted:
        log(log.WARNING, "delete_product_by_id: [%s] product was not found", id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="product was not found"
        )
