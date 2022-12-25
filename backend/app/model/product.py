from sqlalchemy import Integer, String, Column, Float, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from app.database import Base

from .enums import SoldBy


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    name = Column(String(128), nullable=False)
    price = Column(Float, default=0.0)
    sold_by = Column(Enum(SoldBy), default=SoldBy.unknown)  # TODO add both
    image = Column(String(256))
    is_out_of_stock = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)

    business = relationship("Business")
    preps = relationship("Prep", viewonly=True)

    def __repr__(self) -> str:
        return f"<{self.id}:{self.name}, business:[{self.business}]>"
