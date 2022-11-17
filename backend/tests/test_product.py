from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app import model as m
from app import schema as s

PRODUCT_NAME = "fish"
PRODUCT_PRICE = 2
PRODUCT_SOLD_BY = m.SoldBy.by_kilogram
PRODUCT_IMAGE = "/dir/imag/logo_product.png"

data_create_product = s.CreateProduct(
    name=PRODUCT_NAME,
    price=PRODUCT_PRICE,
    sold_by=PRODUCT_SOLD_BY,
    image=PRODUCT_IMAGE,
)


def test_get_all_product_cur_user(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()

    user_business = user.businesses[0]

    user_products = s.ProductsOut(products=user_business.products)

    res = marketer_client.get("/product/")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.ProductsOut.parse_obj(res.json())
    assert user_products == res_data

    # test if we add new product
    new_pro_res = marketer_client.post("/product/", json=data_create_product.dict())
    res = marketer_client.get("/product/")

    assert res.status_code == status.HTTP_200_OK
    res_data = s.ProductsOut.parse_obj(res.json())
    new_pro_res = s.ProductOut.parse_obj(new_pro_res.json())
    assert new_pro_res in res_data.products

    # test if one user product was deleted
    # product = db.query(m.Product).get(res_data.id)
    # product.is_deleted = True
    # db.commit()
    # user_products = s.ProductsOut(products=user.businesses[0].products)
    # assert res.status_code == status.HTTP_200_OK
    # res_data = s.ProductsOut.parse_obj(res.json())
    # assert user_products == res_data

    # test if user does not have any products
    # for _ in res_data:
    #     product = db.query(m.Product).get(res_data.id)
    #     product.is_deleted = True
    #     db.commit()
    # res = marketer_client.get("/product/")
    # assert res.status_code == status.HTTP_200_OK
    # assert res.json() == {"products": []}


def test_admin_can_not_create_product(admin_client: TestClient, db: Session):
    product: m.Product = db.query(m.Product).filter_by(is_deleted=False).first()
    res = admin_client.post("/product/", json=data_create_product.dict())
    assert res.status_code == status.HTTP_403_FORBIDDEN

    res = admin_client.get(f"/product/{product.id}")
    assert res.status_code == status.HTTP_403_FORBIDDEN

    res = admin_client.delete(f"/product/{product.id}")
    assert res.status_code == status.HTTP_403_FORBIDDEN


def test_cur_user_create_product(marketer_client: TestClient, db: Session):

    new_product = data_create_product.dict()

    res = marketer_client.post("/product/", json=new_product)
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.ProductOut.parse_obj(res.json())
    assert res_data.name == PRODUCT_NAME
    assert res_data.image == PRODUCT_IMAGE

    # test product was created in db
    product = m.Product = db.query(m.Product).get(res_data.id)
    assert product
    assert product.price == PRODUCT_PRICE
    assert product.sold_by == PRODUCT_SOLD_BY

    # test business has new product
    business = db.query(m.Business).get(product.business_id)
    assert business


def test_get_product_by_id(marketer_client: TestClient, db: Session):
    product: m.Product = db.query(m.Product).filter_by(is_deleted=False).first()

    res = marketer_client.get(f"/product/{product.id}")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.ProductOut.parse_obj(res.json())
    assert s.ProductOut(**product.__dict__) == res_data

    # test can not get defunct product
    res = marketer_client.get(f"/product/{100}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_delete_product(marketer_client: TestClient, db: Session):

    product: m.Product = db.query(m.Product).filter_by(is_deleted=False).first()

    res = marketer_client.delete(f"/product/{product.id}")
    assert res.status_code == status.HTTP_200_OK
    assert "ok" in res.json()

    # test can get deleted product
    product: m.Product = db.query(m.Product).get(product.id)
    res = marketer_client.get(f"/product/{product.id}")
    assert res.status_code == status.HTTP_404_NOT_FOUND
    assert product.is_deleted == True
