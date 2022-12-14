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
            user_type="Fish",
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        business = m.Business(
            name=fake.company(),
            user_id=user.id,
            logo=fake.image_url(),
            phone_number=fake.phone_number(),
        )
        db.add(business)
        db.commit()
        db.refresh(business)

        add_business_fake_products(business_id=business.id, db=db)


def add_business_fake_products(business_id: int, db: SessionLocal) -> None:
    for n in range(fake.random_int(4, 6)):
        if n <= 2:
            product = m.Product(
                business_id=business_id,
                name=f"fish_{n}",
                price=fake.random_int(1, 10),
                sold_by=m.SoldBy.by_unit,
                image=fake.image_url(),
            )
            db.add(product)
            db.commit()
            db.refresh(product)
            add_prep_to_product(product_id=product.id, db=db)
        elif 2 > n <= 4:
            product = m.Product(
                business_id=business_id,
                name=f"fish_{n}",
                price=fake.random_int(1, 10),
                sold_by=m.SoldBy.by_kilogram,
                image=fake.image_url(),
            )
            db.add(product)
            db.commit()
            db.refresh(product)
            add_prep_to_product(product_id=product.id, db=db)
        else:
            product = m.Product(
                business_id=business_id,
                name=f"fish_{n}",
                price=fake.random_int(1, 10),
                sold_by=m.SoldBy.by_both,
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

    for _ in range(fake.random_int(2, 4)):
        prep = m.Prep(
            product_id=product_id, name=random.choice(list_prep_name), is_active=True
        )
        db.add(prep)
    db.commit()


def create_test_customer_order(db: SessionLocal) -> tuple[m.Business, m.Order]:

    phone_number = m.PhoneNumber(number="972545657514")
    db.add(phone_number)
    db.commit()
    db.refresh(phone_number)

    business = db.query(m.Business).first()

    order: m.Order = m.Order(
        phone_number_id=phone_number.id,
        business_id=business.id,
        customer_name="Alex",
        note="Do it",
    )
    db.add(order)
    db.commit()
    db.refresh(order)

    products = business.products

    for i, product in enumerate(products):
        for prep in product.preps:
            order_item = m.OrderItem(
                order_id=order.id,
                prep_id=prep.id,
                qty=i + 1,
                unit_type=m.SoldBy.by_kilogram,
            )
            db.add(order_item)
            if i == 2:
                break
    db.commit()
    db.refresh(order)

    return business, order
