from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import relationship


from app.database import Base
from .enums import OrderStatus
from .utils import gen_unique_uid


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    created_at = Column(DateTime, default=datetime.now)
    status = Column(Enum(OrderStatus), default=OrderStatus.created)
    order_uid = Column(String(36), default=gen_unique_uid)

    customer = relationship("Customer")

    def __repr__(self) -> str:
        return f"<id:{self.id}>, customer:{self.customer}"
