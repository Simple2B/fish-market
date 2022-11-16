from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from sqlalchemy import and_

from app import model as m
from app import schema as s


def test_get_all_product_cur_user(marketer_client: TestClient, db: Session):

    user: m.User = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()

    user_business = user.businesses[0]

    user_products = s.ProductsOut(products=user_business.products)

    res = marketer_client.get("/product/")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.ProductsOut.parse_obj(res.json())
    assert user_products == res_data

    # test if we add new product
    # product = m.Product(business_id=user_business.id, name="meat")
    # db.add(product)
    # db.commit()
    # db.refresh(product)
    # res = marketer_client.get("/product/")
    # assert res.status_code == status.HTTP_200_OK
    # assert s.ProductOut(product).dict() in res.json()["products"]

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
