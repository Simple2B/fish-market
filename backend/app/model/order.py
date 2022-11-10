from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base
from .enums import OrderStatus


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    order_time = Column(DateTime(), default=datetime.now)
    status = Column(Enum(OrderStatus), default=OrderStatus.was_seen)
    customer_phone_number = Column(Integer, ForeignKey("customers.phone_number"))
    # TODO relationship with products

    customer = relationship("Custumer", back_populates="orders")
