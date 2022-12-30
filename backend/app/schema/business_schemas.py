from typing import Optional

from pydantic import BaseModel, root_validator


class UserBusinessOut(BaseModel):
    user_id: int
    name: Optional[str]
    logo: Optional[str]
    web_site_id: str

    class Config:
        orm_mode = True


class BusinessUpdate(BaseModel):
    name: Optional[str]
    logo: Optional[str]

    @root_validator
    def any_of(cls, v):
        if not any(v.values()):
            raise ValueError(f"At least one of fields: {v.keys()} must have a value")
        return v


class BusinessUpdateOut(BaseModel):
    name: str
    logo: str
