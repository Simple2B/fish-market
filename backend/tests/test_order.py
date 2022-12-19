from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import model as m
from app import schema as s

PHONE_NUMBER = "972545657512"


def test_get_orders(
    marketer_client: TestClient,
    customer_orders: tuple[m.Business, m.Order],
    db: Session,
):
    _, order = customer_orders

    res = marketer_client.get("/order/")
    assert res.status_code == status.HTTP_200_OK
    res_data = s.OrdersOut.parse_obj(res.json())
    first_order = res_data.orders[0]
    assert order.id == first_order.id
    assert len(order.items) == len(first_order.items)

    # test order is removed
    order.is_deleted = True
    db.commit()
    db.refresh(order)
    res = marketer_client.get("/order/")

    assert res.status_code == status.HTTP_200_OK
    assert res.json()["orders"] == []


def test_change_order_by_id(marketer_client: TestClient, customer_orders, db: Session):
    business, order = customer_orders

    order_data = s.ChangeOrderStatus(new_status=m.OrderStatus.in_progress)

    res = marketer_client.patch(f"/order/{order.id}", json=order_data.dict())
    assert res.status_code == status.HTTP_200_OK
    res_data = s.ChangeOrderStatusOut.parse_obj(res.json())
    assert res_data.id == order.id
    assert res_data.status == m.OrderStatus.in_progress.value
    assert res_data.status == order.status.value

    # test order was not found
    res = marketer_client.patch("/order/100", json=order_data.dict())
    assert res.status_code == status.HTTP_404_NOT_FOUND

    # test order not belong to the business
    new_order = m.Order(phone_number=PHONE_NUMBER, customer_name="Test", business_id=2)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    res = marketer_client.patch(f"/order/{new_order.id}", json=order_data.dict())
    assert res.status_code == status.HTTP_403_FORBIDDEN


def test_delete_order_by_marketer(marketer_client: TestClient, customer_orders):
    business, order = customer_orders

    res = marketer_client.delete(f"/order/{order.id}")
    assert res.status_code == status.HTTP_200_OK
    assert len([order for order in business.orders if not order.is_deleted]) == 0
