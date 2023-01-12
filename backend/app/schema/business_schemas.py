from typing import Optional

from pydantic import BaseModel, root_validator


class UserBusinessOut(BaseModel):
    id: int
    name: Optional[str]
    logo: Optional[str]
    web_site_id: str
    phone_number: str

    class Config:
        orm_mode = True


class BusinessUpdate(BaseModel):
    name: Optional[str]
    logo: Optional[str]
    phone_number: Optional[str]

    @root_validator
    def any_of(cls, v):
        if not any(v.values()):
            raise ValueError(f"At least one of fields: {v.keys()} must have a value")
        return v


class BusinessUpdateOut(BaseModel):
    name: str
    logo: str
    phone_number: str
