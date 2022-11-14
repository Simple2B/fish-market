from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    is_active: bool
    phone_number: str
    address: str

    class Config:
        orm_mode = True


class AllUsers(BaseModel):
    users: list[UserOut]
