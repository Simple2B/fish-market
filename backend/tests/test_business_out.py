import uuid

from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s

FULL_NAME = "TEST USER"
PHONE_NUMBER = "972545657512"
NOTE = "Do it quickly"


def test_get_business_by_uid(client: TestClient, db: Session):
    user = db.query(m.User).filter_by(role=m.UserRole.Marketeer).first()
    user_business: m.Business = user.businesses[0]
    fake_uid = uuid.uuid4()

    res = client.get(f"/business/{user_business.web_site_id}")

    assert res.status_code == status.HTTP_200_OK
    res_data = s.BusinessOut.parse_obj(res.json())
    assert res_data.name == user_business.name
    assert res_data.logo == user_business.logo

    res = client.get(f"/business/{fake_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


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


def test_create_product_order(client: TestClient, db: Session, customer_orders):
    business, order = customer_orders
    phone_number = order.phone_number
    user_business: m.Business = business

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
        phone_number=phone_number.number,
        business_id=business.id,
        note=NOTE,
        customer_name=FULL_NAME,
        items=order_items,
    )

    order_data = data_create_order.dict()
    # # test order is exist
    # res = client.post(f"/business/{user_business.web_site_id}/order", json=order_data)
    # assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    # test create order
    phone_number.is_number_verified = True
    db.commit()
    res = client.post(f"/business/{user_business.web_site_id}/order", json=order_data)
    assert res.status_code == status.HTTP_201_CREATED
    res_data = s.CreateOrderOut.parse_obj(res.json())
    assert res_data.phone_number == phone_number.number
    assert res_data.order_status == m.OrderStatus.pending.value

    # test order was created in db
    orders = db.query(m.Order).all()
    assert len(orders) == 2

    # test the customer has order
    assert len(phone_number.orders) == 2
    second_order = phone_number.orders[1]
    assert second_order.status == m.OrderStatus.pending
    assert len(second_order.items) == 2

    # test the order has correct customer
    assert second_order.customer_name == FULL_NAME
    assert second_order.phone_number.number == phone_number.number

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

    # test if the number not exists
    data_create_order.phone_number = "380672215670"
    res = client.post(
        f"/business/{user_business.web_site_id}/order", json=data_create_order.dict()
    )
    assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    phone_numbers = db.query(m.PhoneNumber).all()
    assert len(phone_numbers) == 1

    # test id web_site_id is not correct
    res = client.post("/business/fasfaf76fa7f8afaffafaf/order", json=order_data)
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_delete_order(client: TestClient, db: Session, customer_orders):
    business, order = customer_orders
    fake_uid = uuid.uuid4()

    res = client.delete(f"/business/{business.web_site_id}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_200_OK
    assert "ok" in res.json()
    db.refresh(order)
    assert order.is_deleted

    # test bad order uid
    res = client.delete(f"/business/{business.web_site_id}/order/{fake_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test bad business uid
    res = client.delete(f"/business/{fake_uid}/order/{order.order_uid}")
    assert res.status_code == status.HTTP_404_NOT_FOUND


def test_get_orders(client: TestClient, db: Session, customer_orders):
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


# def test_patch_customer_orders(client: TestClient, db: Session, customer_orders):
#     business, order = customer_orders
#     new_qty = 100
#     fake_uid = uuid.uuid4()
#     res_data = client.get(f"/business/{business.web_site_id}/order/{order.order_uid}")
#     products_for_update = s.OrderProductsOut.parse_obj(res_data.json())

#     products = products_for_update.products

#     update_products = []
#     for index, product in enumerate(products):
#         product = s.OrderProductOut.parse_obj(product)
#         if index == 0:
#             update_products.append(
#                 s.UpdateOrderProduct(
#                     prep_id=product.preps[1].id,
#                     qty=product.elect_prep.qty,
#                     prod_name=product.name,
#                 )
#             )
#         elif index == 1:
#             update_products.append(
#                 s.UpdateOrderProduct(
#                     prep_id=product.elect_prep.prep_id,
#                     qty=new_qty,
#                     prod_name=product.name,
#                 )
#             )
#         elif index == 2:
#             update_products.append(
#                 s.UpdateOrderProduct(
#                     **product.elect_prep.dict(), delete=True, prod_name=product.name
#                 )
#             )
#         else:
#             update_products.append(
#                 s.UpdateOrderProduct(
#                     **product.elect_prep.dict(), prod_name=product.name
#                 )
#             )

#     update_data = s.UpdateOrderProducts(products=update_products)

#     res = client.patch(
#         f"/business/{business.web_site_id}/order/{order.order_uid}",
#         json=update_data.dict(),
#     )
#     assert res.status_code == status.HTTP_200_OK
#     res_data = s.OrderProductOut.parse_obj(res.json())
#     assert len(res_data.products) == len(products_for_update) - 1
#     assert res_data.products[0].elect_prep.prep_id == product.preps[1].id
#     assert res_data.products[1].price == new_qty
#     assert res_data.products[2].elect_prep.dict() == products_for_update[3].elect_prep

#     # test data wsa changed in db
#     db.refresh(order)
#     assert order.items[0].prep_id == product.preps[2].id
#     assert order.items[1].price == new_qty
#     assert len(order.items) == len(products_for_update) - 1

#     # test if prep belongs to the products
#     update_data.products[0].elect_prep.prep_id = 200
#     res = client.patch(
#         f"/business/{business.web_site_id}/order/{order.order_uid}",
#         json=update_data.dict(),
#     )
#     assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
