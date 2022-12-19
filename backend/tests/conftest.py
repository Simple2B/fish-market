import pytest
from typing import Generator

from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.main import app
from app.database import Base, get_db
from tests.database import fill_test_data, create_test_customer_order
from app import model as m
from app import schema as s


@pytest.fixture
def client() -> Generator:
    with TestClient(app) as c:
        yield c


@pytest.fixture
def db() -> Generator:
    # SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
    SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestingSessionLocal() as db:

        def override_get_db() -> Generator:
            yield db

        app.dependency_overrides[get_db] = override_get_db

        # generate test data
        fill_test_data(db)

        yield db
        Base.metadata.drop_all(bind=engine)


def authorized_client(client: TestClient, db: Session, role: m.UserRole) -> Generator:
    admin: m.User = db.query(m.User).filter_by(role=role).first()
    assert admin
    res = client.post("/login", data=dict(username=admin.username, password="1234"))
    assert res.status_code == status.HTTP_200_OK
    token = s.Token.parse_obj(res.json())
    assert token.access_token
    client.headers.update(
        {
            "Authorization": f"Bearer {token.access_token}",
        }
    )
    return client


@pytest.fixture
def admin_client(client: TestClient, db: Session) -> Generator:
    yield authorized_client(client, db, m.UserRole.Admin)


@pytest.fixture
def marketer_client(client: TestClient, db: Session) -> Generator:
    yield authorized_client(client, db, m.UserRole.Marketeer)


@pytest.fixture
def customer_orders(db: Session) -> tuple[m.Business, m.Order]:
    return create_test_customer_order(db)
