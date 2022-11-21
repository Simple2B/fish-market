from pydantic import BaseModel


class CreateProductPrep(BaseModel):
    name: str


class ProductPrepOut(BaseModel):
    id: str
    name: str
    is_active: str

    class Config:
        orm_mode = True


class ProductPrepsOut(BaseModel):
    id: int
    preps: list[ProductPrepOut]


class UpdateProductPrep(BaseModel):
    is_active: bool
