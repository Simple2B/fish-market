from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from app.database import Base


class Prep(Base):
    __tablename__ = "preps"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    name = Column(String(64), nullable=False)
    is_deleted = Column(Boolean, default=False)
    is_active = Column(Boolean, default=False)

    product = relationship("Product")

    def __repr__(self) -> str:
        return f"<{self.id}:{self.name}>"
