from sqlalchemy import Column, Enum, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship

from app.database import Base
from .enums import SoldBy


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    prep_id = Column(Integer, ForeignKey("preps.id"))
    unit_type = Column(Enum(SoldBy))
    qty = Column(Float, default=0.0)

    prep = relationship("Prep")
    order = relationship("Order")

    # @property
    # def product(self):
    #     return self.prep.product

    @property
    def product(self):
        return self.prep.product

    @property
    def product_name(self):
        return self.prep.product.name

    @property
    def product_image(self):
        return self.prep.product.image

    @property
    def prep_name(self):
        return self.prep.name

    def __repr__(self) -> str:
        return f"<order_id:{self.order_id}, product:{self.product}, prep:{self.prep}>"
