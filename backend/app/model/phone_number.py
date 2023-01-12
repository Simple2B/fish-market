from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship

from app.database import Base
from .utils import gen_confirm_code


class PhoneNumber(Base):
    __tablename__ = "phone_numbers"

    id = Column(Integer, primary_key=True)
    number = Column(String(64), nullable=False, unique=True)
    confirm_code = Column(String(4), default=gen_confirm_code)
    is_number_verified = Column(Boolean, default=False)

    orders: list = relationship("Order", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}:{self.number} code:[{self.confirm_code}] orders:[{self.orders}]>"
