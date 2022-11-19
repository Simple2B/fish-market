from typing import Optional

from pydantic import BaseModel

from app import model as m
from .business_product_out_schemas import BusinessProductPrepOut


class OrderProductOut(BaseModel):
    name: str
    price: float
    image: Optional[str]
    sold_by: m.SoldBy
    elect_prep_id: int
    preps: list[BusinessProductPrepOut]

    class Config:
        orm_mode = True
        use_enum_values = True


class OrderProductsOut(BaseModel):
    products: list[OrderProductOut]
