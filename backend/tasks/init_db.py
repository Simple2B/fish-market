from invoke import task
from app.config import settings
from app.model import User


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
