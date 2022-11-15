# flake8: noqa E712
from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app import model as m
from app import schema as s


def test_get_user_marketeer_business(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]

    res = marketer_client.get("/business/")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessOut.parse_obj(res.json())
    assert user_business.web_site_id == res_data.web_site_id
    assert user_business.user_id == user.id
