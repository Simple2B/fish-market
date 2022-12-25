from typing import Optional, Union

from pydantic import BaseModel, root_validator

from app import model as m


class ProductOut(BaseModel):
    id: int
    name: str
    price: float
    sold_by: m.SoldBy
    image: Optional[str]
    is_out_of_stock: bool

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


class UpdateProduct(BaseModel):
    name: Optional[str]
    price: Optional[float]
    sold_by: Optional[m.SoldBy]
    image: Optional[str]
    is_out_of_stock: Optional[bool]

    @root_validator
    def any_of(cls, v):
        if len(v.values()) == sum([1 for value in v.values() if value is None]):
            raise ValueError(f"At least one of fields: {v.keys()} must have a value")
        return v

    class Config:
        use_enum_values = True
