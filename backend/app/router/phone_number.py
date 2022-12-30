from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session

from app.service import send_sms
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log
from .utils import is_number_valid

router = APIRouter(prefix="/phone-number", tags=["Phone-number"])


@router.post(
    "/",
    response_model=s.CreatePhoneNumberOut,
    status_code=status.HTTP_201_CREATED,
)
def create_check_phone_number(data: s.CreatePhoneNumber, db: Session = Depends(get_db)):

    log(log.INFO, "create_check_phone_number")

    number = data.phone_number

    is_number_valid(number)

    phone_number = (
        db.query(m.PhoneNumber)
        .filter(
            m.PhoneNumber.number.ilike(
                f"%{number if len(number) != 10 else number[1:]}%"
            )
        )
        .first()
    )

    if not phone_number:
        phone_number = m.PhoneNumber(number=number)
        db.add(phone_number)
        db.commit()
    if not phone_number.is_number_verified:
        phone_number.confirm_code = m.gen_confirm_code()
        db.commit()
        is_sent = send_sms(phone_number.confirm_code, phone_number.number)
        if not is_sent:
            log(
                log.ERROR,
                "Exception when send sms,  number: [%s]",
                phone_number.number,
            )
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Phone number is not valid",
            )
    return phone_number


@router.post(
    "/validate",
    response_model=s.CreatePhoneNumberOut,
    status_code=status.HTTP_200_OK,
)
def validate_phone_number(data: s.ValidPhoneNumber, db: Session = Depends(get_db)):
    log(log.INFO, "validate_phone_number")
    phone_number = data.phone_number
    confirm_code = data.sms_code

    is_number_valid(phone_number)

    db_phone_number = db.query(m.PhoneNumber).filter_by(number=phone_number).first()

    if not db_phone_number:
        log(log.ERROR, "validate_customer: Phone number was not found")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Phone number was not found",
        )

    if confirm_code == db_phone_number.confirm_code:
        db_phone_number.is_number_verified = True
        db_phone_number.confirm_code = m.gen_confirm_code()
        db.commit()
        db.refresh(db_phone_number)

        return db_phone_number

    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail="Code is not valid",
    )
