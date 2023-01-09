from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserDetailOut(BaseModel):
    email: EmailStr
    phone_number: str
    address: str

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: int
    username: str
    orders_taken: int = Field(alias="orders_taken")
    items_sold: int = Field(alias="items_sold")
    kg_sold: int = Field(alias="kg_sold")
    meter_sold: int = Field(alias="meter_sold")
    sms_used: int = Field(alias="sms_used")
    is_active: bool
    user_type: str
    created_at: datetime

    class Config:
        orm_mode = True


class AllUsers(BaseModel):
    users: list[UserOut]
