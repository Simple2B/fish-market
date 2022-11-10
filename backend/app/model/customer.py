from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(128), nullable=False)
    phone_number = Column(String(128), nullable=False, unique=True)
    sms_confirmation_number = Column(Integer)
    note = Column(Text)

    orders = relationship("Order", back_populates="customer")

    def __repr__(self) -> str:
        return f"<id:{self.id}, full_name:{self.full_name}> orders:[{self.orders}]"
