from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship

from app.database import Base
from .utils import gen_confirm_code


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(128), nullable=False)
    phone_number = Column(String(64), nullable=False, unique=True)
    confirm_code = Column(String(6), default=gen_confirm_code)
    is_number_verified = Column(Boolean, default=False)
    note = Column(String(512))

    orders: list = relationship("Order", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}:{self.full_name} orders:[{self.orders}]>"
