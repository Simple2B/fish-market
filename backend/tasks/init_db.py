from sqlalchemy.orm import Session
from invoke import task
from app.config import settings
from app.model import User, Business


@task
def init_db(_):
    """Initialization database

    Args:
        --test-data (bool, optional): wether fill database by test data. Defaults to False.
    """
    from app.database import SessionLocal

    db = SessionLocal()
    # add admin user
    admin: User = User(
        username=settings.ADMIN_USER,
        password=settings.ADMIN_PASS,
        email=settings.ADMIN_EMAIL,
    )
    db.add(admin)

    db.commit()


def create_business(db):
    business = m.Business(business_name="test business")
    db.add(business)
    db.commit()

    return business


@task
def create_user(_):
    from app.database import SessionLocal

    db = SessionLocal()
    business: Business = create_business(db)
    user = m.User(
        username="test1",
        email="test@test.com",
        password_hash="qwe123",
    )
    db.add(user)
    db.commit()

    return user
