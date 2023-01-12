# flake8: noqa E712
from fastapi import Depends, APIRouter, HTTPException, Request, status
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.service import send_sms
from app.service import get_business_from_cur_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from app.config import settings

from .constants import MESSAGE_TEXT


router = APIRouter(prefix="/order", tags=["Orders"])


@router.get("/", status_code=status.HTTP_200_OK, response_model=s.OrdersOut)
def get_orders(
    is_archive: bool = False,
    db: Session = Depends(get_db),
    business: m.Business = Depends(get_business_from_cur_user),
):

    log(log.INFO, "get_orders, business_id: [%d]", business.id)

    query = db.query(m.Order).filter_by(business_id=business.id)

    status_list_is_archive = [m.OrderStatus.picked_up, m.OrderStatus.can_not_complete]

    if is_archive:
        query = query.filter(
            or_(m.Order.status.in_(status_list_is_archive), m.Order.is_deleted == True)
        )
    else:
        query = query.filter(m.Order.status.not_in(status_list_is_archive))
        query = query.filter(m.Order.is_deleted == False)

    return s.OrdersOut(orders=query.all())


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

    if order.business_id != business.id:
        log(log.WARNING, "Order [%s] does not belong to the business", order_id)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Order does not belong to the business",
        )

    message = None
    if data.new_status == m.OrderStatus.ready.value:
        market_link = f"{settings.FRONTEND_URL}/market/{business.web_site_id}"
        message = MESSAGE_TEXT[settings.SMS_LANGUAGE][m.OrderStatus.ready].format(
            business.name, business.phone_number, order_id, market_link
        )
    elif data.new_status == m.OrderStatus.can_not_complete.value:
        message = MESSAGE_TEXT[settings.SMS_LANGUAGE][
            m.OrderStatus.can_not_complete
        ].format(business.name, business.phone_number, order_id)

    if message is not None:
        business.sms_used += 1
        db.commit()
        is_send = send_sms(message, order.phone_number.number)
        # TODO what to do if message is not sent

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

    if order.business_id != business.id:
        log(log.WARNING, "Order [%s] does not belong to the business", order_id)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Order does not belong to the business",
        )

    order.is_deleted = True
    db.commit()

    return {"ok", "true"}
