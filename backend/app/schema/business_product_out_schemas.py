from typing import Optional

from pydantic import BaseModel, root_validator

from app import model as m


class BusinessProductPrepOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class BusinessProductOut(BaseModel):
    name: str
    price: float
    logo: Optional[str]
    sold_by: m.SoldBy
    preps: list[BusinessProductPrepOut]

    class Config:
        orm_mode = True
        use_enum_values = True


class BusinessProductsOut(BaseModel):
    products: list[BusinessProductOut]
