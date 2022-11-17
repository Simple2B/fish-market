import random

from faker import Faker

from app.database import SessionLocal
from app import model as m

fake = Faker()


def fill_test_data(db: SessionLocal):

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
        db.refresh(business)

        add_business_fake_products(business_id=business.id, db=db)


def add_business_fake_products(business_id: int, db: SessionLocal) -> None:
    for _ in range(fake.random_int(1, 5)):
        product = m.Product(
            business_id=business_id,
            name="fish",
            price=fake.random_int(1, 10),
            sold_by=m.SoldBy.by_unit,
            image=fake.image_url(),
        )
        db.add(product)
        db.commit()
        db.refresh(product)
        add_prep_to_product(product_id=product.id, db=db)


def add_prep_to_product(product_id: int, db: SessionLocal) -> None:
    list_prep_name = [
        "fillet",
        "cleaned",
        "without head",
        "red",
        "live",
        "without tail",
        "without bones",
    ]

    for _ in range(fake.random_int(1, 4)):
        prep = m.Prep(product_id=product_id, name=random.choice(list_prep_name))
        db.add(prep)
        db.commit()
