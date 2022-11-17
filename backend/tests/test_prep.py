# flake8: noqa E712
from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app import model as m
from app import schema as s

PREP_NAME = "red"

prep_data_create = s.CreateProductPrep(name=PREP_NAME)


def test_create_prep_for_product(marketer_client: TestClient, db: Session):
    product = db.query(m.Product).first()
    res = marketer_client.post(
        f"/product/{product.id}/prep", json=prep_data_create.dict()
    )
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.ProductPrepOut.parse_obj(res.json())
    assert res_data.name == PREP_NAME

    # test check prep was created in db
    prep = db.query(m.Prep).get(res_data.id)
    assert prep
    assert prep.name == PREP_NAME
    assert prep.product_id == product.id


def test_get_product_preps(marketer_client: TestClient, db: Session):
    product = db.query(m.Product).first()
    product_prep: list = product.preps

    res = marketer_client.get(f"/product/{product.id}/prep")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.ProductPrepsOut.parse_obj(res.json())
    assert res_data.preps == s.ProductPrepsOut(id=product.id, preps=product_prep).preps
