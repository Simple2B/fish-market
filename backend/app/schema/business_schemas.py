from typing import Optional

from pydantic import BaseModel, root_validator, Field


class UserBusinessOut(BaseModel):
    id: int
    name: Optional[str]
    logo: Optional[str]
    web_site_id: str
    email: str = Field(alias="user_email")

    class Config:
        orm_mode = True


class BusinessUpdate(BaseModel):
    name: Optional[str]
    logo: Optional[str]
    user_email: Optional[str]

    @root_validator
    def any_of(cls, v):
        if not any(v.values()):
            raise ValueError(f"At least one of fields: {v.keys()} must have a value")
        return v


class BusinessUpdateOut(BaseModel):
    name: str
    logo: str
    email: str
