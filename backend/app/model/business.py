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
    phone_number = Column(String(64), nullable=False)
    sms_used = Column(Integer, default=0)

    user = relationship("User")
    products = relationship("Product", viewonly=True)
    orders = relationship("Order")

    @property
    def active_products(self):
        return [product for product in self.products if not product.is_deleted]

    @property
    def user_email(self) -> str:
        return self.user.email

    @user_email.setter
    def user_email(self, value):
        self.user.email = value

    def __repr__(self) -> str:
        return f"<id:{self.id}, name:{self.name},  user:{self.user}>"
