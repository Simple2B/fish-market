from typing import Optional
from datetime import datetime

from pydantic import BaseModel

from app import model as m


class CreatePhoneNumber(BaseModel):
    phone_number: str


class CreatePhoneNumberOut(BaseModel):
    number: str
    is_number_verified: bool

    class Config:
        orm_mode = True


class ValidPhoneNumber(BaseModel):
    phone_number: str
    sms_code: str


class CreateOrderItem(BaseModel):
    prep_id: int
    qty: float
    unit_type: m.SoldBy

    class Config:
        use_enum_values = True


class CreateOrder(BaseModel):
    phone_number: str
    customer_name: str
    note: Optional[str]
    pick_up_data: Optional[datetime]
    items: list[CreateOrderItem]


class CreateOrderOut(BaseModel):
    phone_number: str
    order_status: m.OrderStatus

    class Config:
        use_enum_values = True
