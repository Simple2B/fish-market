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
    name = Column(String(128), default="")
    logo = Column(String(128), default="")
    web_site_id = Column(String(36), default=gen_business_id)

    user = relationship("User")
    products = relationship("Product", viewonly=True)

    def to_dict(self):
        self_data = {
            "user_id": self.user_id,
            "name": self.name,
            "logo": self.logo,
            "web_site_id": self.web_site_id,
        }
        return self_data

    def __repr__(self) -> str:
        return f"<id:{self.id}, name:{self.name},  user:{self.user}>"
