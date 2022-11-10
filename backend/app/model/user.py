from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum, func, or_
from sqlalchemy.orm import relationship

from app.hash_utils import make_hash, hash_verify
from app.database import Base, SessionLocal

from .enums import Role


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    password_hash = Column(String(128), nullable=False)
    created_at = Column(DateTime(), default=datetime.now)
    is_active = Column(Boolean, default=False)
    adress = Column(String(128), nullable=False)
    phone_number = Column(String, nullable=False, unique=True)

    orders_taken = Column(Integer, default=0)
    items_sold = Column(Integer, default=0)
    kg_sold = Column(Integer, default=0)
    sms_used = Column(Integer, default=0)

    role = Column(Enum(Role), default=Role.Marketeer)

    business = relationship("Business", back_populates="user", uselist=False)

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, value: str):
        self.password_hash = make_hash(value)

    @classmethod
    def authenticate(cls, db: SessionLocal, user_id: str, password: str):
        user = (
            db.query(cls)
            .filter(
                or_(
                    func.lower(cls.username) == func.lower(user_id),
                    func.lower(cls.email) == func.lower(user_id),
                )
            )
            .first()
        )
        if user is not None and hash_verify(password, user.password):
            return user

    def __repr__(self):
        return f"<{self.id}: {self.username}>"
