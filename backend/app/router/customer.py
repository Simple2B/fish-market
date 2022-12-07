from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session
from twilio.base.exceptions import TwilioRestException

from app.service import send_sms
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import is_number_valid

router = APIRouter(prefix="/customer", tags=["customer"])


@router.post(
    "/",
    response_model=s.CreateCustomerOut,
    status_code=status.HTTP_201_CREATED,
)
def create_check_customer(data: s.CreateCustomer, db: Session = Depends(get_db)):

    log(log.INFO, "Create_check_customer")

    is_number_valid(data.phone_number)

    customer = db.query(m.Customer).filter_by(phone_number=data.phone_number).first()

    if not customer:
        customer = m.Customer(**data.dict())
        db.add(customer)
        db.commit()
    if not customer.is_number_verified:
        customer.confirm_code = m.gen_confirm_code()
        db.commit()
        try:
            send_sms(
                confirm_code=customer.confirm_code,
                phone_number=customer.phone_number,
            )
        except TwilioRestException:
            log(
                log.ERROR,
                "Exception when send sms,  number: [%s]",
                customer.phone_number,
            )
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Phone number is not valid",
            )
    return customer


@router.post(
    "/validate",
    response_model=s.CreateCustomerOut,
    status_code=status.HTTP_200_OK,
)
def valid_customer(data: s.ValidCustomerPhone, db: Session = Depends(get_db)):
    log(log.INFO, "validate_customer")
    phone_number = data.phone_number
    confirm_code = data.sms_code

    is_number_valid(phone_number)

    customer = db.query(m.Customer).filter_by(phone_number=phone_number).first()

    if not customer:
        log(log.ERROR, "validate_customer: Customer was not found")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Customer was not found",
        )

    if confirm_code == customer.confirm_code:
        customer.is_number_verified = True
        customer.confirm_code = m.gen_confirm_code()
        db.commit()
        db.refresh(customer)

        return customer

    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail="Code is not valid",
    )
