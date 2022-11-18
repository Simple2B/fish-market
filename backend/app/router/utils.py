from fastapi import HTTPException, status

from app import model as m
from app.logger import log


def get_business_id_from_cur_user(user: m.User) -> int:

    business_id = None

    if user.businesses and user.role == m.UserRole.Marketeer:
        business_id = user.businesses[0].id

    if not business_id:
        log(log.WARNING, "User [%s] does not have business", user)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't  have permission to the business",
        )

    return business_id


def check_access_to_product(product: m.Product, user: m.User, product_id: int) -> None:
    if user.role == m.UserRole.Admin:
        log(
            log.WARNING,
            "User [%s] dose not have permission to the product",
            user,
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't  have permission to the product",
        )
    elif not product or product.is_deleted:
        log(log.WARNING, "delete_product_by_id: [%d] product was not found", product_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product was not found"
        )
