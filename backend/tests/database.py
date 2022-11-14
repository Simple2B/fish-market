from faker import Faker


from app.database import SessionLocal
from app import model as m
from app.config import settings as conf


def fill_test_data(db: SessionLocal):
    fake = Faker()

    for _ in range(2):
        admin: m.User = m.User(
            username=fake.name(),
            password=fake.password(),
            address=fake.address(),
            phone_number=fake.phone_number(),
            email=fake.email(),
            role=m.UserRole.Admin,
        )
        db.add(admin)
        db.commit()

    for _ in range(5):
        user: m.User = m.User(
            username=fake.name(),
            password=fake.password(),
            address=fake.address(),
            phone_number=fake.phone_number(),
            email=fake.email(),
            role=m.UserRole.Marketeer,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        business = m.Business(name=fake.company(), user_id=user.id)
        db.add(business)
        db.commit()
