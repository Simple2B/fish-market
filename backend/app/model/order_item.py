from sqlalchemy import Column, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship

from app.database import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    prep_id = Column(Integer, ForeignKey("preps.id"))
    qty = Column(Float, default=0.0)

    prep = relationship("Prep")
    order = relationship("Order")

    @property
    def product(self):
        return self.prep.product

    def __repr__(self) -> str:
        return f"<order_id:{self.order_id}, product:{self.product}, prep:{self.prep}>"
