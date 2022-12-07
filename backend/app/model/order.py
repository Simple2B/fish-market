from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import relationship


from app.database import Base
from .enums import OrderStatus
from .utils import gen_unique_uid


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    phone_number_id = Column(Integer, ForeignKey("phone_numbers.id"))
    created_at = Column(DateTime, default=datetime.now)
    customer_name = Column(String(128), nullable=False)
    note = Column(String(512))
    status = Column(Enum(OrderStatus), default=OrderStatus.created)
    order_uid = Column(String(36), default=gen_unique_uid)

    phone_number = relationship("PhoneNumber", viewonly=True)
    items = relationship("OrderItem", viewonly=True)

    def __repr__(self) -> str:
        return f"<id:{self.id}>, customer:{self.customer}"
