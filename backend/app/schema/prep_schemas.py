from typing import Optional

from pydantic import BaseModel, root_validator


class CreateProductPrep(BaseModel):
    name: str


class ProductPrepOut(BaseModel):
    id: str
    name: str
    is_active: str


class ProductPrepsOut(BaseModel):
    id: int
    preps: list[ProductPrepOut]
