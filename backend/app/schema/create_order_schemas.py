from typing import Optional

from pydantic import BaseModel

from app import model as m


class CreateOrderItem(BaseModel):
    prep_id: int
    qty: float


class CreateCustomer(BaseModel):
    full_name: str
    phone_number: str
    note: Optional[str]


class CreateCustomerOut(BaseModel):
    full_name: str
    phone_number: str
    note: Optional[str]
    is_number_verified: bool

    class Config:
        orm_mode = True


class CreateOrder(BaseModel):
    customer: CreateCustomer
    items: list[CreateOrderItem]


class CustomerOut(BaseModel):
    full_name: str

    class Config:
        orm_mode = True


class CreateOrderOut(BaseModel):
    customer: CustomerOut
    order_status: m.OrderStatus

    class Config:
        use_enum_values = True


class ValidCustomerPhone(BaseModel):
    phone_number: str
    sms_code: str
