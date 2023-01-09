from pydantic import BaseModel, EmailStr


class UserData(BaseModel):
    user_type: str
    address: str
    username: str
    phone_number: str
    email: EmailStr
    password: str


class BusinessData(BaseModel):
    phone_number: str
    name: str


class CreateUserBusiness(BaseModel):
    user: UserData
    business: BusinessData
