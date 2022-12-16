from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session

from app.service import get_business_from_cur_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log


router = APIRouter(prefix="/order", tags=["Orders"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_orders(
    business: m.Business = Depends(get_business_from_cur_user),
):

    log(log.INFO, "get_orders, business_id: [%s]", business.id)

    orders = business.orders

    orders_out = []
    for order in orders:
        if not order.is_deleted:
            order_items = []
            for item in order.items:
                product = item.prep.product
                item_out = s.OrderItemOut(
                    prep_name=item.prep.name,
                    qty=item.qty,
                    product_name=product.name,
                    product_image=product.image,
                )
                order_items.append(item_out)

            order_out = s.OrderOut(
                id=order.id,
                customer_name=order.customer_name,
                note=order.note,
                phone_number=order.phone_number.number,
                created_at=order.created_at,
                pick_up_data=order.pick_up_data,
                status=order.status,
                items=order_items,
            )
            orders_out.append(order_out)

    return s.OrdersOut(orders=orders_out)


@router.patch(
    "/{order_id}", response_model=s.ChangeOrderStatusOut, status_code=status.HTTP_200_OK
)
def change_status_order(
    order_id: int,
    data: s.ChangeOrderStatus,
    db: Session = Depends(get_db),
    business: m.Business = Depends(get_business_from_cur_user),
):
    log(log.INFO, "change_status_order, order_id: [%s] data: [%s]", order_id, data)

    order = db.query(m.Order).get(order_id)

    if not order or order.is_deleted:
        log(log.WARNING, "Order [%s] was not found", order_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order was not found",
        )

    order_ids = [order.id for order in business.orders]

    if order.id not in order_ids:
        log(log.WARNING, "Order [%s] does not belong to the business", order_id)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Order does not belong to the business",
        )

    order.status = data.new_status
    db.commit()
    db.refresh(order)

    return order


@router.delete("/{order_id}", status_code=status.HTTP_200_OK)
def delete_order_by_marketer(
    order_id: int,
    db: Session = Depends(get_db),
    business: m.Business = Depends(get_business_from_cur_user),
):

    log(
        log.INFO,
        "delete_order_by_marketer, order_id:[%s], business_id: [%s]",
        order_id,
        business.id,
    )

    order = db.query(m.Order).get(order_id)

    if not order or order.is_deleted:
        log(log.WARNING, "Order [%s] was not found", order_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order was not found",
        )

    order_ids = [order.id for order in business.orders]

    if order.id not in order_ids:
        log(log.WARNING, "Order [%s] does not belong to the business", order_id)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Order does not belong to the business",
        )

    order.is_deleted = True
    db.commit()

    return {"ok", "true"}
