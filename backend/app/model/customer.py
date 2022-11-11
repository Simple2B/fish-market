from sqlalchemy import Column, String, Integer, Boolean
from sqlalchemy.orm import relationship

from app.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(128), nullable=False)
    phone_number = Column(String(128), nullable=False, unique=True)
    is_number_verified = Column(Boolean, default=False)
    note = Column(String(512))

    customer_orders: list = relationship("Order", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}:{self.full_name} orders:[{self.customer_orders}]>"
