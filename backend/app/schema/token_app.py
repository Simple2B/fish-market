from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    is_admin: Optional[bool]


class TokenData(BaseModel):
    id: Optional[str] = None
