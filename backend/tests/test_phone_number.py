from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s

FULL_NAME = "TEST USER"
PHONE_NUMBER = "972545657514"
NOTE = "Do it quickly"


def test_create_check_phone_number(client: TestClient, db: Session, mocker):
    mocker.patch("app.router.phone_number.send_sms")
    req_data = s.CreatePhoneNumber(phone_number=PHONE_NUMBER)
    # test create phone number
    res = client.post("/phone-number/", json=req_data.dict())
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.CreatePhoneNumberOut.parse_obj(res.json())
    assert res_data.number == PHONE_NUMBER
    assert not res_data.is_number_verified

    phone_numbers = db.query(m.PhoneNumber).all()

    assert len(phone_numbers) == 1
    phone_number = phone_numbers[0]
    assert phone_number
    assert phone_number.number == req_data.phone_number
    assert not phone_number.is_number_verified

    # test if phone number already exist
    res = client.post("/phone-number/", json=req_data.dict())
    assert res.status_code == status.HTTP_201_CREATED
    phone_numbers = db.query(m.PhoneNumber).all()
    assert len(phone_numbers) == 1

    # test phone verification is valid
    phone_number.is_number_verified = True
    db.commit()

    res = client.post("/phone-number/", json=req_data.dict())
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.CreatePhoneNumberOut.parse_obj(res.json())
    assert res_data.is_number_verified

    # test number is not valid
    req_data.phone_number = "123456789"
    res = client.post("/phone-number/", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


def test_valid_phone_number(client: TestClient, db: Session, customer_orders):
    _, order = customer_orders
    # test is code valid
    phone_number = order.phone_number

    req_data = s.ValidPhoneNumber(
        phone_number=phone_number.number, sms_code=phone_number.confirm_code
    )
    res = client.post("/phone-number/validate", json=req_data.dict())
    assert res.status_code == status.HTTP_200_OK
    res_data = s.CreatePhoneNumberOut.parse_obj(res.json())
    assert res_data.is_number_verified
    assert phone_number.is_number_verified

    # test code is not valid
    req_data.sms_code = "123456"
    res = client.post("/phone-number/validate", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # test number is not valid
    req_data.sms_code = phone_number.confirm_code
    req_data.phone_number = "123456778"
    res = client.post("/phone-number/validate", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # test if number not found
    req_data.phone_number = "3805023123456"
    res = client.post("/phone-number/validate", json=req_data.dict())
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
