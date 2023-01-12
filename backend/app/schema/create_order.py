from typing import Optional
from datetime import datetime

from pydantic import BaseModel, validator

from app import model as m


class CreatePhoneNumber(BaseModel):
    phone_number: str
    business_uid: str


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
    pick_up_data: datetime
    items: list[CreateOrderItem]

    @validator("pick_up_data")
    def ensure_date_is_valid(cls, date):
        if datetime.now().date() > date.date():
            raise ValueError("Pick up date is not valid")
        return date


class CreateOrderOut(BaseModel):
    phone_number: str
    order_status: m.OrderStatus

    class Config:
        use_enum_values = True
