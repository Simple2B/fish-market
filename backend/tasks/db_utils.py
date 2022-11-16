from invoke import task

from app.config import settings
from app.model import User, UserRole


@task
def create_admin(_):
    """Create admin user"""
    from app.database import SessionLocal

    db = SessionLocal()
    admin: User = User(
        username=settings.ADMIN_USER,
        password=settings.ADMIN_PASS,
        address=settings.ADDRESS,
        phone_number=settings.PHONE_NUMBER,
        email=settings.ADMIN_EMAIL,
        role=UserRole.Admin,
    )
    db.add(admin)

    db.commit()


@task
def fill_test_data(_):
    """Fill DB by test data"""
    from app.database import SessionLocal
    from tests.database import fill_test_data

    fill_test_data(SessionLocal())
