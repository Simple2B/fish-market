from pydantic import BaseModel


class UserUpdate(BaseModel):
    is_active: bool
