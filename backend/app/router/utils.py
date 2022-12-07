from typing import Union

from fastapi import HTTPException, status
import phonenumbers
from phonenumbers.phonenumberutil import NumberParseException

from app import model as m
from app.config import settings
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


def check_access_to_product_prep(prep_id: int, product: m.Product, prep: m.Prep):
    if not prep or prep.is_deleted or prep.product_id != product.id:
        log(
            log.WARNING,
            "The product [%d] dose not have access to the prep [%d] or prep is deleted",
            product.id,
            prep_id,
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Prep was not found",
        )


def check_access_to_business(business: m.Business, data_mes: Union[str, m.User]):
    if not business:
        log(log.WARNING, "Business was not found: [%s]", data_mes)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business was not found",
        )


def check_access_to_order(order: m.Order):
    if not order:
        log(log.WARNING, "Order was not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order was not found",
        )


def is_number_valid(number: str) -> None:

    try:
        log(log.INFO, "is_number_valid")
        is_valid = phonenumbers.parse(number, settings.COUNTRY_CODE)
    except NumberParseException:
        log(log.ERROR, "is_number_valid")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Phone number is not valid",
        )

    if not phonenumbers.is_valid_number(is_valid):
        log(log.ERROR, "is_number_valid.is_valid_number")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Phone number is not valid",
        )
