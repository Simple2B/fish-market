from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app import model as m


class OrderItemOut(BaseModel):
    product_image: str
    product_name: str
    prep_name: str
    qty: float

    class Config:
        orm_mode = True


class OrderOut(BaseModel):
    id: int
    customer_name: str
    phone_number: str = Field(alias="prone_number_value")
    note: Optional[str]
    created_at: datetime
    pick_up_data: Optional[datetime]
    status: m.OrderStatus
    items: list[OrderItemOut]

    class Config:
        orm_mode = True


class OrdersOut(BaseModel):
    orders: list[OrderOut]


class ChangeOrderStatus(BaseModel):
    new_status: m.OrderStatus

    class Config:
        use_enum_values = True


class ChangeOrderStatusOut(BaseModel):
    id: int
    status: m.OrderStatus

    class Config:
        orm_mode = True
        use_enum_values = True
