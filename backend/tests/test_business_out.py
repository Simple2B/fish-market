from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s


def test_get_business_product_out(
    client: TestClient, db: Session, marketer_client: TestClient
):
    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]

    first_product = user_business.products[0]

    res = client.get(f"/business/{user_business.web_site_id}/product")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessProductsOut.parse_obj(res.json())
    first_product_res = res_data.products[0]
    assert first_product.name == first_product_res.name
    assert len(first_product.preps) == len(first_product_res.preps)
    assert len(user_business.products) == len(res_data.products)
