from fastapi import HTTPException, Depends, APIRouter, status
from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.service import get_current_user
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log


router = APIRouter(prefix="/business", tags=["business"])

# ask for response_model
@router.get("/")
def get_business_cur_user(
    db: Session = Depends(get_db), current_user: m.User = Depends(get_current_user)
):
    log(log.INFO, "get_business_cur_user")
    business: m.Business = (
        db.query(m.Business).filter_by(user_id=current_user.id).first()
    )

    return s.BusinessOut(**business.to_dict())
