from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s

FULL_NAME = "TEST USER"
PHONE_NUMBER = "380673838523"
NOTE = "Do it quickly"


def test_create_check_customer(client: TestClient, db: Session, mocker):
    mocker.patch("app.router.customer.send_sms")
    req_data = s.CreateCustomer(
        full_name=FULL_NAME, phone_number=PHONE_NUMBER, note=NOTE
    )
    # test create customer but not pass phone verification
    res = client.post("/customer/", json=req_data.dict())
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.CreateCustomerOut.parse_obj(res.json())
    assert not res_data.is_number_verified

    db_customer = db.query(m.Customer).first()

    assert db_customer
    assert db_customer.phone_number == req_data.phone_number
    assert not db_customer.is_number_verified

    # test if customer already exist
    res = client.post("/customer/", json=req_data.dict())
    assert res.status_code == status.HTTP_201_CREATED

    # test phone verification is valid
    db_customer.is_number_verified = True
    db.commit()

    res = client.post("/customer/", json=req_data.dict())
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.CreateCustomerOut.parse_obj(res.json())
    assert res_data.is_number_verified

    # test number is not valid
    req_data.phone_number = "123456789"
    res = client.post("/customer/", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_valid_customer(client: TestClient, db: Session, customer_orders):
    business, order = customer_orders
    # test is code valid
    customer = order.customer

    test_phone_number = "380502221085"
    req_data = s.ValidCustomerPhone(
        phone_number=test_phone_number, sms_code=customer.confirm_code
    )
    res = client.post("/customer/valid", json=req_data.dict())
    assert res.status_code == status.HTTP_200_OK
    assert customer.is_number_verified

    # test code is not valid
    req_data.sms_code = "123456"
    res = client.post("/customer/valid", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # test number is not valid
    req_data.sms_code = customer.confirm_code
    req_data.phone_number = "123456778"
    res = client.post("/customer/valid", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # test if number not found
    req_data.phone_number = "3805023123456"
    res = client.post("/customer/valid", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
