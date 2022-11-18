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

    # test create prep when product does not exist
    res = marketer_client.post(f"/product/{100}/prep", json=prep_data_create.dict())
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_get_product_preps(marketer_client: TestClient, db: Session):
    product = db.query(m.Product).first()
    assert product.preps, "Product must have preps"
    product_prep: list = product.preps

    res = marketer_client.get(f"/product/{product.id}/prep")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.ProductPrepsOut.parse_obj(res.json())
    assert res_data.preps == s.ProductPrepsOut(id=product.id, preps=product_prep).preps

    # test get product preps when product does not exist
    res = marketer_client.get(f"/product/{100}/prep")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_delete_product_preps(marketer_client: TestClient, db: Session):
    product = db.query(m.Product).first()
    take_first_prep = product.preps[0]

    res = marketer_client.delete(f"/product/{product.id}/prep/{take_first_prep.id}")
    assert res.status_code == status.HTTP_200_OK
    assert "ok" in res.json()

    # test prep was deleted in db
    prep = db.query(m.Prep).filter_by(id=take_first_prep.id).first()
    assert prep.is_deleted

    # test prep was deleted try delete the prep again
    res = marketer_client.delete(f"/product/{product.id}/prep/{take_first_prep.id}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test prep does not below to the product
    prep = db.query(m.Prep).filter(and_(m.Prep.product_id != product.id)).first()
    res = marketer_client.delete(f"/product/{product.id}/prep/{prep.id}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test prep does not exist
    res = marketer_client.delete(f"/product/{product.id}/prep/{100}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_patch_product_prep(marketer_client: TestClient, db: Session):
    pass
