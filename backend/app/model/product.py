from sqlalchemy import Integer, String, Column, Float, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from app.database import Base

from .enums import SoldBy


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    item_name = Column(String(128), nullable=False)
    price = Column(Float, nullable=False)
    sold_by = Column(Enum(SoldBy), nullable=False)
    image = Column(String(256))
    is_display = Column(Boolean, default=False)
    business_id = Column(Integer, ForeignKey("businesses.id"))

    business = relationship("Business", back_populates="products")

    preps = relationship("Prep", back_populates="product")

    def __repr__(self) -> str:
        return f"<id:{self.id}, item_name:{self.item_name}, businesses:[{self.businesses}]>"
