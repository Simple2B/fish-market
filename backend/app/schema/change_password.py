from typing import Optional

from pydantic import BaseModel, root_validator


class ChangePassword(BaseModel):
    password: str
    new_password: str
