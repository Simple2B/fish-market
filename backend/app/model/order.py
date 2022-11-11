from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import relationship


from app.database import Base
from .order_item import order_items
from .enums import OrderStatus


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    created_at = Column(DateTime, default=datetime.now)
    status = Column(Enum(OrderStatus), default=OrderStatus.created)

    customer = relationship("Customer")

    def __repr__(self) -> str:
        return f"<id:{self.id}>, customer:{self.customer}"
