from faker import Faker


from app.database import SessionLocal
from app import model as m


def fill_test_data(db: SessionLocal):
    fake = Faker()

    admin: m.User = m.User(
        username=fake.name(),
        password="1234",
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
            password="1234",
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
