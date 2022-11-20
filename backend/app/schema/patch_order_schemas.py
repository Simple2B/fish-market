from typing import Optional

from pydantic import BaseModel

from app import model as m


class UpdateOrderProduct(BaseModel):
    # ask for validations
    prod_name: str
    prep_id: Optional[int]
    qty: Optional[float]
    delete: Optional[bool]


class UpdateOrderProducts(BaseModel):
    products: list[UpdateOrderProduct]
