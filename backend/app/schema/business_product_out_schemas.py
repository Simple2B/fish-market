from typing import Optional

from pydantic import BaseModel

from app import model as m


class BusinessOut(BaseModel):
    logo: Optional[str]
    name: str

    class Config:
        orm_mode = True


class BusinessProductPrepOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class BusinessProductOut(BaseModel):
    id: int
    name: str
    price: float
    image: Optional[str]
    sold_by: m.SoldBy
    preps: list[BusinessProductPrepOut]

    class Config:
        orm_mode = True
        use_enum_values = True


class BusinessProductsOut(BaseModel):
    products: list[BusinessProductOut]
