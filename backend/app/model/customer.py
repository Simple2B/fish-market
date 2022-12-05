from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(128), nullable=False)
    phone_number_id = Column(Integer, ForeignKey("phone_numbers.id"))
    note = Column(String(512))

    phone_number = relationship("PhoneNumber", viewonly=True)
    orders: list = relationship("Order", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}:{self.full_name} orders:[{self.orders}]>"
