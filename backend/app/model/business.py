from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base


class Business(Base):

    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True)
    business_name = Column(String(128))
    logo = Column(String(128))
    web_site_link = Column(String(256))  # TODO generate unique link
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="business")
    products = relationship("Product", back_populates="business")

    def __repr__(self) -> str:
        return f"id:<{self.id}, business_name:{self.business_name},  user:{self.user}>"
