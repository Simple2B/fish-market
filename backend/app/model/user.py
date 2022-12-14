from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum, func, or_
from sqlalchemy.orm import relationship

from app.hash_utils import make_hash, hash_verify
from app.database import Base, SessionLocal

from .enums import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(64), nullable=False, unique=True)
    email = Column(String(128), nullable=False, unique=True)
    password_hash = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    is_active = Column(Boolean, default=True)
    address = Column(String(128), nullable=False)
    phone_number = Column(String(32), nullable=False, unique=True)
    is_deleted = Column(Boolean, default=False)

    # orders_taken = Column(Integer, default=0)
    # items_sold = Column(Integer, default=0)
    # kg_sold = Column(Integer, default=0)
    # sms_used = Column(Integer, default=0)

    role = Column(Enum(UserRole), default=UserRole.Marketeer)

    businesses = relationship("Business", viewonly=True)

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
        return f"<{self.id}: {'*' if self.role == UserRole.Admin else ' '}  {self.username}>"
