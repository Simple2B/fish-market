# flake8: noqa E712
from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s


NEW_BUSINESS_NAME = "test new business name"
NEW_BUSINESS_LOGO = "/dir/media/logs/new_log.png"
NEW_USER_EMAIL = "test@test.com"


def test_get_user_marketeer_business(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]

    res = marketer_client.get(f"/business/")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.UserBusinessOut.parse_obj(res.json())
    assert user_business.logo == res_data.logo
    assert user_business.name == res_data.name
    assert user.email == res_data.email
    assert user_business.id == res_data.id


def test_get_user_admin_business(admin_client: TestClient, db: Session):
    new_business_data = s.BusinessUpdate(
        name=NEW_BUSINESS_NAME,
        logo=NEW_BUSINESS_LOGO,
    )

    admin: m.User = db.query(m.User).filter_by(role=m.UserRole.Admin).first()

    res = admin_client.get("/business/")
    assert res.status_code == status.HTTP_403_FORBIDDEN
    assert admin.businesses == []

    # test admin can not change business
    res = admin_client.patch("/business/", json=new_business_data.dict())
    assert res.status_code == status.HTTP_403_FORBIDDEN


def test_user_business_update(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()

    new_business_data = s.BusinessUpdate(
        name=NEW_BUSINESS_NAME,
        logo=NEW_BUSINESS_LOGO,
        user_email=NEW_USER_EMAIL,
    )

    new_business_data: dict = new_business_data.dict()

    res = marketer_client.patch("/business/", json=new_business_data)
    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessUpdateOut.parse_obj(res.json())
    assert res_data.name == NEW_BUSINESS_NAME
    assert res_data.logo == NEW_BUSINESS_LOGO
    assert res_data.email == NEW_USER_EMAIL

    # test check if data change in db
    business_id = user.businesses[0].id
    business: m.Business = db.query(m.Business).get(business_id)
    assert business.name == NEW_BUSINESS_NAME
    assert business.logo == NEW_BUSINESS_LOGO
    assert user.email == NEW_USER_EMAIL

    # test change one business filed
    del new_business_data["name"]
    del new_business_data["user_email"]
    res = marketer_client.patch("/business/", json=new_business_data)
    res_data = s.BusinessUpdateOut.parse_obj(res.json())
    assert res_data.name == business.name
    assert res_data.logo == NEW_BUSINESS_LOGO
    assert user.email == NEW_USER_EMAIL

    # test any business filed
    res = marketer_client.patch("/business/", json={})
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_upload_image(marketer_client: TestClient, db: Session):
    TEST_JPG_FILE = "tests/img/jumeirah-fish-market.jpg"
    TEST_WEBP_FILE = "tests/img/lobster.webp"
    client = marketer_client
    user: m.User = client.user
    assert user
    assert user.businesses
    business: m.Business = user.businesses[0]
    res = None
    with open(TEST_JPG_FILE, "br") as f:
        res = client.post(
            f"/business/img/{business.id}/logo",
            files={"img_file": (TEST_JPG_FILE, f, "image/jpeg")},
        )
    assert res
    img: s.BusinessImage = s.BusinessImage.parse_obj(res.json())
    assert img
    res = client.get(img.img_url)
    assert res

    with open(TEST_WEBP_FILE, "br") as f:
        res = client.post(
            f"/business/img/{business.id}/product",
            files={"img_file": (TEST_WEBP_FILE, f, "image/webp")},
        )
    assert res
    img: s.BusinessImage = s.BusinessImage.parse_obj(res.json())
    assert img
    res = client.get(img.img_url)
    assert res

    # Try to use wrong business id
    with open(TEST_WEBP_FILE, "br") as f:
        res = client.post(
            f"/business/img/56/product",
            files={"img_file": (TEST_WEBP_FILE, f, "image/webp")},
        )
    assert not res
    assert res.status_code == status.HTTP_403_FORBIDDEN

    # Try to use wrong image type name
    with open(TEST_WEBP_FILE, "br") as f:
        res = client.post(
            f"/business/img/{business.id}/wrong_image_type_name",
            files={"img_file": (TEST_WEBP_FILE, f, "image/webp")},
        )
    assert not res
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
