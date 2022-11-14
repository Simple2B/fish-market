from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List


class BusinessM(BaseModel):
    id: int

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    is_active: bool
    address: str
    businesses: List[BusinessM]

    class Config:
        orm_mode = True
