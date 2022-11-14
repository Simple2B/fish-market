import uuid
from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship


from app.database import Base


def gen_business_id() -> str:
    return str(uuid.uuid4())


class Business(Base):

    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(128))
    logo = Column(String(128))
    web_site_id = Column(String(36), default=gen_business_id)

    user = relationship("User")
    products = relationship("Product", viewonly=True)

    def __repr__(self) -> str:
        return f"<id:{self.id}, name:{self.name},  user:{self.user}>"
