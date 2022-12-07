from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base
from .utils import gen_unique_uid


class Business(Base):

    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(128), default="")
    logo = Column(String(128), default="")
    web_site_id = Column(String(36), default=gen_unique_uid)

    user = relationship("User")
    products = relationship("Product", viewonly=True)
    orders = relationship("Order")

    def __repr__(self) -> str:
        return f"<id:{self.id}, name:{self.name},  user:{self.user}>"
