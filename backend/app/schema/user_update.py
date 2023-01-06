from pydantic import BaseModel, root_validator, EmailStr
from typing import Optional


class UserUpdate(BaseModel):
    is_active: bool
