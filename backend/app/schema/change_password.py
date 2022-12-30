from pydantic import BaseModel


class ChangePassword(BaseModel):
    password: str
    new_password: str
