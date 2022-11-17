from typing import Optional, Union

from pydantic import BaseModel, root_validator

from app import model as m


class ProductOut(BaseModel):
    id: int
    name: str
    price: float
    sold_by: m.SoldBy
    image: Optional[str]

    class Config:
        orm_mode = True
        use_enum_values = True


class ProductsOut(BaseModel):
    products: list[ProductOut]


class CreateProduct(BaseModel):
    name: str
    price: Union[int, float]
    sold_by: m.SoldBy
    image: str

    class Config:
        use_enum_values = True
