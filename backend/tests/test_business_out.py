import uuid

from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s

FULL_NAME = "TEST USER"
PHONE_NUMBER = "380502221085"
NOTE = "Do it quickly"


def test_get_business_product_out(
    client: TestClient, db: Session, marketer_client: TestClient
):
    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]

    first_product: m.Product = user_business.products[0]

    res = client.get(f"/business/{user_business.web_site_id}/product")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessProductsOut.parse_obj(res.json())
    first_product_res = res_data.products[0]
    assert first_product.name == first_product_res.name
    assert len(first_product.preps) == len(first_product_res.preps)
    assert len(user_business.products) == len(res_data.products)

    user_business.products[0].is_out_of_stoke = True
    user_business.products[1].price = 100
    for prep in user_business.products[2].preps:
        prep.is_deleted = True
    for prep in user_business.products[3].preps:
        prep.is_active = False
    count_of_products = len(user_business.products)
    db.commit()
    res = client.get(f"/business/{user_business.web_site_id}/product")
    res_products = res.json()["products"]
    # test if marketeer make product out of stocks
    assert user_business.products[0].name != res_products[0]["name"]
    # test if marketeer change product
    assert res_products[0]["price"] == 100
    # test if product preps is not active or deleted
    assert len(res_products) == count_of_products - 3


def test_create_product_order(client: TestClient, db: Session):

    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]

    first_product = user_business.products[0]

    first_prep = first_product.preps[0]
    second_prep = first_product.preps[1]

    first_qty = 5
    second_qty = 7.2

    order_items = [
        s.CreateOrderItem(prep_id=first_prep.id, qty=first_qty),
        s.CreateOrderItem(prep_id=second_prep.id, qty=second_qty),
    ]

    data_create_order = s.CreateOrder(
        customer=s.CreateCustomer(
            full_name=FULL_NAME, phone_number=PHONE_NUMBER, note=NOTE
        ),
        items=order_items,
    )

    order_data = data_create_order.dict()

    res = client.post(f"/business/{user_business.web_site_id}/order", json=order_data)
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.CreateOrderOut.parse_obj(res.json())
    assert res_data.customer.full_name == FULL_NAME
    assert res_data.order_status == m.OrderStatus.created.value

    # test the customer was created in db
    customers = db.query(m.Customer).all()
    assert customers
    assert len(customers) == 1
    customer = customers[0]
    assert customer.phone_number == PHONE_NUMBER

    # test order was created in db
    orders = db.query(m.Order).all()
    assert orders
    assert len(orders) == 1

    # test the customer has order
    assert len(customer.orders) == 1
    assert customer.orders[0].status == m.OrderStatus.created

    # test the order has correct customer
    order = orders[0]
    assert order.customer.full_name == FULL_NAME
    assert order.customer.phone_number == PHONE_NUMBER
    assert order.items
    assert len(order.items) == 2

    # test if the customer already exists
    res = client.post(f"/business/{user_business.web_site_id}/order", json=order_data)
    assert res.status_code == status.HTTP_201_CREATED
    customers = db.query(m.Customer).all()
    assert len(customers) == 1
    customer = customers[0]
    assert customer.phone_number == PHONE_NUMBER

    # test customers order was created twice
    assert len(customer.orders) == 2
    assert sum([len(order.items) for order in customer.orders]) == 4

    # test if prep_id is not correct
    data_create_order.items = [
        s.CreateOrderItem(prep_id=first_prep.id, qty=first_qty),
        s.CreateOrderItem(prep_id=second_prep.id, qty=second_qty),
        s.CreateOrderItem(prep_id=140, qty=second_qty),
    ]
    res = client.post(
        f"/business/{user_business.web_site_id}/order", json=data_create_order.dict()
    )
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # test id web_site_id is not correct
    res = client.post(f"/business/fasfaf76fa7f8afaffafaf/order", json=order_data)
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_delete_customer_order(client: TestClient, db: Session, customer_orders):
    business, order = customer_orders
    fake_uid = uuid.uuid4()

    res = client.delete(f"/business/{business.web_site_id}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_200_OK
    assert "ok" in res.json()
    db.refresh(order)
    assert order.status == m.OrderStatus.cancelled

    # test bad order uid
    res = client.delete(f"/business/{business.web_site_id}/order/{fake_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test bad business uid
    res = client.delete(f"/business/{fake_uid}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_get_customer_orders(client: TestClient, db: Session, customer_orders):
    business, order = customer_orders
    fake_uid = uuid.uuid4()

    res = client.get(f"/business/{business.web_site_id}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.OrderProductsOut.parse_obj(res.json())
    assert len(res_data.products) == len(order.items)
    assert [item.prep_id for item in order.items] == [
        product.elect_prep.prep_id for product in res_data.products
    ]

    assert sum(item.qty for item in order.items) == sum(
        product.elect_prep.qty for product in res_data.products
    )

    # test bad order uid
    res = client.delete(f"/business/{business.web_site_id}/order/{fake_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test bad business uid
    res = client.delete(f"/business/{fake_uid}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    #  test if product prep is deleted or not active
    for prep in order.items[0].prep.product.preps:
        prep.is_active = False
    for prep in order.items[1].prep.product.preps:
        prep.is_deleted = True

    db.commit()

    res = client.get(f"/business/{business.web_site_id}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.OrderProductsOut.parse_obj(res.json())
    assert len(res_data.products[0].preps) == 1
    assert len(res_data.products[1].preps) == 1
