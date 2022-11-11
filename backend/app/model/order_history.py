from datetime import datetime


from sqlalchemy import Column, Integer, Enum, DateTime
from sqlalchemy.orm import ForeignKey


from .enums import OrderStatus
from app.database import Base


class OrderHistory(Base):

    __tablename__ = "order_history"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    created_at = Column(DateTime, default=datetime.now)
    prev_status = Column(Enum(OrderStatus))
    new_status = Column(Enum(OrderStatus))

    def __repr__(self) -> str:
        return f"<{self.id}, order_id:{self.order_id}>"
