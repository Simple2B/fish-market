# flake8: noqa E712
from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app import model as m
from app import schema as s

USER_NAME = "michael"
USER_EMAIL = "test@test.ku"
USER_PASSWORD = "secret"
USER_ADDRESS = "Kalush 1D"
USER_PHONE_NUMBER = "123131313"
USER_TYPE = "Fish"

BUSINESS_NAME = "FISH Market"


new_user_data = s.CreateUserBusiness(
    user=s.UserData(
        username=USER_NAME,
        user_type=USER_TYPE,
        address=USER_ADDRESS,
        phone_number=USER_PHONE_NUMBER,
        email=USER_EMAIL,
        password=USER_PASSWORD,
    ),
    business=s.BusinessData(
        name=BUSINESS_NAME,
        phone_number=USER_PHONE_NUMBER,
    ),
)


def test_user_info(marketer_client: TestClient):
    res = marketer_client.get("/me-info")
    assert res.status_code == status.HTTP_200_OK
    res = marketer_client.get("/me-info?is_admin=true")
    assert res.status_code == status.HTTP_403_FORBIDDEN


def test_admin_info(admin_client: TestClient):
    res = admin_client.get("/me-info?is_admin=true")
    assert res.status_code == status.HTTP_200_OK


def test_user_not_info(client: TestClient):
    res = client.get("/me-info")
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


def test_login_admin(client: TestClient, db: Session):
    # get admin user:
    # admin: m.User = db.query(m.User).filter(m.User.role == m.UserRole.Admin).first()
    admin: m.User = db.query(m.User).filter_by(role=m.UserRole.Admin).first()
    assert admin
    # data = OAuth2PasswordRequestForm(username=admin.username, password="1234")
    res = client.post("/login", data=dict(username=admin.username, password="1234"))
    assert res.status_code == status.HTTP_200_OK
    token = s.Token.parse_obj(res.json())
    assert token.access_token


def test_get_all_user(admin_client: TestClient, db: Session):
    users = (
        db.query(m.User).filter_by(is_deleted=False, role=m.UserRole.Marketeer).all()
    )
    res = admin_client.get("/user/all")
    assert res
    res_data = s.AllUsers.parse_obj(res.json())
    assert len(res_data.users) == len(users)
    assert res_data.users[-1].id == users[0].id

    assert res_data.users[0].kg_sold == users[-1].kg_sold


def test_create_user_marketeer(admin_client: TestClient, db: Session):
    count_of_user: int = int(db.query(m.User).count())

    response = admin_client.post("/user/", json=new_user_data.dict())
    assert response.status_code == status.HTTP_201_CREATED

    new_count_of_user: int = int(db.query(m.User).count())
    assert new_count_of_user == count_of_user + 1

    new_user = s.UserOut.parse_obj(response.json())
    user = db.query(m.User).get(new_user.id)
    assert user.username == new_user.username
    assert user.businesses and user.role == m.UserRole.Marketeer

    response = admin_client.get("/user/all")
    assert response and response.status_code == status.HTTP_200_OK
    # admin do not need to check his data
    assert count_of_user == len(response.json()["users"])

    user = s.UserOut.parse_obj(response.json()["users"][0])
    assert user.username == USER_NAME
    # new user can login
    del admin_client.headers["Authorization"]
    client = admin_client

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


def test_admin_get_user_marketeer_by_id(admin_client: TestClient, db: Session):
    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    res = admin_client.get(f"/user/{user.id}")
    assert res.status_code == status.HTTP_200_OK
    user_data = s.UserDetailOut.parse_obj(res.json())
    assert user_data.email == user.email

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Admin).first()
    res = admin_client.get(f"/user/{user.id}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test user does not exist
    res = admin_client.get(f"/user/{100}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_user_marketeer_can_not_get_users(marketer_client: TestClient, db: Session):
    user_marketeer = (
        db.query(m.User)
        .filter(and_(m.User.role == m.UserRole.Marketeer, m.User.is_deleted == False))
        .first()
    )
    user_admin = (
        db.query(m.User)
        .filter(and_(m.User.role == m.UserRole.Admin, m.User.is_deleted == False))
        .first()
    )

    # user marketeer do not have access to rousts /user/ and /user/all
    res = marketer_client.post("/user/", json=new_user_data.dict())
    assert res.status_code == status.HTTP_403_FORBIDDEN

    res = marketer_client.get("/user/all")
    assert res.status_code == status.HTTP_403_FORBIDDEN

    res = marketer_client.delete(f"/user/{user_marketeer.id}")
    assert res.status_code == status.HTTP_403_FORBIDDEN

    res = marketer_client.delete(f"/user/{user_admin.id}")
    assert res.status_code == status.HTTP_403_FORBIDDEN


def test_admin_delete_user_marketeer(admin_client: TestClient, db: Session):
    marketer_set = db.query(m.User).filter(
        and_(m.User.role == m.UserRole.Marketeer, m.User.is_deleted == False)
    )
    count_of_marketeers = int(marketer_set.count())
    marketeer = marketer_set.first()

    res = admin_client.delete(f"/user/{marketeer.id}")
    assert res.status_code == status.HTTP_200_OK

    new_count_of_marketers = (
        db.query(m.User)
        .filter(and_(m.User.role == m.UserRole.Marketeer, m.User.is_deleted == False))
        .count()
    )

    assert new_count_of_marketers == count_of_marketeers - 1

    res = admin_client.get(f"/user/{marketeer.id}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    admin = db.query(m.User).filter_by(role=m.UserRole.Admin).first()
    res = admin_client.delete(f"/user/{admin.id}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_user_market_update_by_admin(admin_client: TestClient, db: Session):

    user: m.User = (
        db.query(m.User)
        .filter(and_(m.User.role == m.UserRole.Marketeer, m.User.is_deleted == False))
        .first()
    )
    admin: m.User = (
        db.query(m.User)
        .filter(and_(m.User.role == m.UserRole.Admin, m.User.is_deleted == False))
        .first()
    )

    data_to_update = s.UserUpdate(
        is_active=not user.is_active,
    )

    data_to_update = data_to_update.dict()

    # test admin can not update admin
    res = admin_client.patch(f"/user/{admin.id}", json=data_to_update)
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test admin update user
    res = admin_client.patch(f"/user/{user.id}", json=data_to_update)
    assert res.status_code == status.HTTP_200_OK
    assert user.id == res.json()["user_id"]
    assert not user.is_active

    # test user id is not correct
    res = admin_client.patch(f"/user/{100}", json=data_to_update)
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_change_password(marketer_client: TestClient, db: Session):
    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    old_password = "1234"
    new_password = "new1234"
    new_password_data = s.ChangePassword(
        password=old_password, new_password=new_password
    )

    # test change password
    res = marketer_client.patch("/change-password", json=new_password_data.dict())
    assert res.status_code == status.HTTP_200_OK
    assert "ok" in res.json()

    # login old password
    res = marketer_client.post(
        "/login", data=dict(username=user.username, password=old_password)
    )
    assert res.status_code == status.HTTP_403_FORBIDDEN

    # login new password
    res = marketer_client.post(
        "/login", data=dict(username=user.username, password=new_password)
    )
    assert res.status_code == status.HTTP_200_OK

    # test if old password is not correct
    res = marketer_client.patch("/change-password", json=new_password_data.dict())
    assert res.status_code == status.HTTP_403_FORBIDDEN

    # test user is not authorization
    new_password_data.password = new_password
    del marketer_client.headers["Authorization"]
    res = marketer_client.patch("/change-password", json=new_password_data.dict())
    assert res.status_code == status.HTTP_401_UNAUTHORIZED


def test_login_as_user(admin_client: TestClient, db: Session):
    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()

    res = admin_client.get(f"/login-as-user/{user.id}")
    assert res.status_code == status.HTTP_200_OK
    token = s.Token.parse_obj(res.json())
    assert token.access_token


def test_login_as_user_not_admin(marketer_client: TestClient, db: Session):
    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()

    res = marketer_client.get(f"/login-as-user/{user.id}")
    assert res.status_code == status.HTTP_403_FORBIDDEN
