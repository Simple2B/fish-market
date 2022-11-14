from fastapi import HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session

from app.service import get_current_admin
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log


router = APIRouter(prefix="/user", tags=["Users"])


@router.post("/", status_code=201, response_model=s.UserOut)
def create_user(
    user: s.UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    log(log.INFO, "create_user [%s]", user)

    new_user = m.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    user_business = m.Business(user_id=new_user.id)
    db.add(user_business)
    db.commit()
    return new_user


@router.get("/all", response_model=s.AllUsers)
def get_all_user(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    log(log.INFO, "get_all_user")
    users: m.User = db.query(m.User).filter(m.User.is_deleted == False).all()
    return s.AllUsers(users=users)


@router.get("/{id}", response_model=s.UserOut)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_admin),
):
    user = db.query(m.User).get(id)

    if not user:
        raise HTTPException(status_code=404, detail="This user was not found")

    return user
