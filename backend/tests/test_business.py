# flake8: noqa E712
from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s


NEW_BUSINESS_NAME = "test new business name"
NEW_BUSINESS_LOGO = "/dir/media/logs/new_log.png"


def test_get_user_marketeer_business(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]

    res = marketer_client.get("/business/")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessOut.parse_obj(res.json())
    assert user_business.web_site_id == res_data.web_site_id
    assert user_business.user_id == user.id


def test_get_user_admin_business(admin_client: TestClient, db: Session):
    new_business_data = s.BusinessUpdate(
        name=NEW_BUSINESS_NAME,
        logo=NEW_BUSINESS_LOGO,
    )

    admin: m.User = db.query(m.User).filter_by(role=m.UserRole.Admin).first()

    res = admin_client.get("/business/")
    assert res.status_code == status.HTTP_404_NOT_FOUND
    assert admin.businesses == []

    # test admin can not change business
    res = admin_client.patch("/business/", json=new_business_data.dict())
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_user_business_update(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()

    new_business_data = s.BusinessUpdate(
        name=NEW_BUSINESS_NAME,
        logo=NEW_BUSINESS_LOGO,
    )

    new_business_data: dict = new_business_data.dict()

    res = marketer_client.patch("/business/", json=new_business_data)
    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessUpdateOut.parse_obj(res.json())
    assert res_data.name == NEW_BUSINESS_NAME
    assert res_data.logo == NEW_BUSINESS_LOGO

    # test check if data change in db
    business_id = user.businesses[0].id
    business: m.Business = db.query(m.Business).get(business_id)
    assert business.name == NEW_BUSINESS_NAME
    assert business.logo == NEW_BUSINESS_LOGO

    # test change one business filed
    del new_business_data["name"]
    res = marketer_client.patch("/business/", json=new_business_data)
    res_data = s.BusinessUpdateOut.parse_obj(res.json())
    assert res_data.name == business.name
    assert res_data.logo == NEW_BUSINESS_LOGO

    # test any business filed
    res = marketer_client.patch("/business/", json={})
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
