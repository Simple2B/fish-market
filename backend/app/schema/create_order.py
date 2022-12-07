from typing import Optional

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


class CreateOrder(BaseModel):
    phone_number: str
    customer_name: str
    note: Optional[str]
    items: list[CreateOrderItem]


class CreateOrderOut(BaseModel):
    phone_number: str
    order_status: m.OrderStatus

    class Config:
        use_enum_values = True
