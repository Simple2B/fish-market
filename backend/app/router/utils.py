from typing import Optional

from fastapi import HTTPException, status

from app import model as m
from app.logger import log


def get_business_id_from_cur_user(user: m.User) -> Optional[int]:

    business_id = None

    if user.businesses and user.role == m.UserRole.Marketeer:
        business_id = user.businesses[0].id

    if not business_id:
        log(log.WARNING, "create_product: [%x] current user can not add new product")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Current user can not add new product",
        )

    return business_id
