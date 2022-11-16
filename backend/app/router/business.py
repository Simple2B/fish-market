from fastapi import Depends, APIRouter, status, HTTPException
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log


router = APIRouter(prefix="/business", tags=["business"])


@router.get("/")
def get_business_cur_user(
    db: Session = Depends(get_db), current_user: m.User = Depends(get_current_user)
):
    log(log.INFO, "get_business_cur_user")
    business: m.Business = (
        db.query(m.Business).filter_by(user_id=current_user.id).first()
    )

    if not business:
        log(log.WARNING, "get_business_cur_user: User does not have business")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not have business"
        )

    return s.BusinessOut(**business.to_dict())
