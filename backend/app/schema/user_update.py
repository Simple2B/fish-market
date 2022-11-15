from pydantic import BaseModel, root_validator, EmailStr
from typing import Optional


class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    address: Optional[str]
    phone_number: Optional[str]
    is_active: Optional[bool]

    @root_validator
    def any_of(cls, v):
        if not any(v.values()):
            raise ValueError(f"At least one of fields: {v.keys()} must have a value")
        return v
