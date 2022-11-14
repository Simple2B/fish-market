import pytest
from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s

USER_NAME = "michael"
USER_EMAIL = "test@test.ku"
USER_PASSWORD = "secret"
USER_ADDRESS = "Kalush 1D"
USER_PHONE_NUMBER = "123131313"

new_user_data = s.UserCreate(
    username=USER_NAME,
    email=USER_EMAIL,
    password=USER_PASSWORD,
    address=USER_ADDRESS,
    phone_number=USER_PHONE_NUMBER,
)


def test_login(client: TestClient, db: Session):
    # get admin user:
    # admin: m.User = db.query(m.User).filter(m.User.role == m.UserRole.Admin).first()
    admin: m.User = db.query(m.User).filter_by(role=m.UserRole.Admin).first()
    assert admin
    # data = OAuth2PasswordRequestForm(username=admin.username, password="1234")
    res = client.post("/login", data=dict(username=admin.username, password="1234"))
    assert res.status_code == status.HTTP_200_OK
    token = s.Token.parse_obj(res.json())
    assert token.access_token


def test_create_user_marketeer(auth_client_admin: TestClient, db: Session):
    response = auth_client_admin.post("/user/", json=new_user_data.dict())
    assert response.status_code == status.HTTP_201_CREATED

    new_user = s.UserOut.parse_obj(response.json())
    user = db.query(m.User).get(new_user.id)
    assert user.username == new_user.username
    assert user.businesses and user.role == m.UserRole.Marketeer

    response = auth_client_admin.get("/user/all")
    assert response and response.status_code == status.HTTP_200_OK
    user = s.UserOut.parse_obj(response.json()["users"][-1])
    assert user.username == USER_NAME

    # new user can login
    del auth_client_admin.headers["Authorization"]
    client = auth_client_admin

    # if password or username is not correct
    res = client.post("/login", data=dict(username=USER_NAME, password="secret1"))
    assert res.status_code == status.HTTP_403_FORBIDDEN
    res = client.post("/login", data=dict(username="michael1", password=USER_PASSWORD))
    assert res.status_code == status.HTTP_403_FORBIDDEN

    # if data is correct
    res = client.post("/login", data=dict(username=USER_NAME, password=USER_PASSWORD))
    assert res.status_code == status.HTTP_200_OK
    token = s.Token.parse_obj(res.json())
    assert token.access_token


def test_user_marketeer_can_not_get_users(auth_client_marketeer: TestClient):

    # user marketeer do not have access to rousts /user/ and /user/all
    res = auth_client_marketeer.post("/user/", json=new_user_data.dict())
    assert res.status_code == status.HTTP_403_FORBIDDEN

    res = auth_client_marketeer.get("/user/all")
    assert res.status_code == status.HTTP_403_FORBIDDEN
