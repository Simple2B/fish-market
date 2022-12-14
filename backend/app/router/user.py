# flake8: noqa E712
from fastapi import HTTPException, Depends, APIRouter, status
from sqlalchemy import and_
from sqlalchemy.orm import Session

from app.service import get_current_admin
from app import schema as s
from app import model as m
from app.database import get_db
from app.logger import log


router = APIRouter(prefix="/user", tags=["Users"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=s.UserOut)
def create_user_business(
    data: s.CreateUserBusiness,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    log(log.INFO, "create_user_business ")

    user_data = data.user
    business_data = data.business

    new_user = m.User(**user_data.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    user_business = m.Business(user_id=new_user.id, **business_data.dict())
    db.add(user_business)
    db.commit()
    return new_user


@router.get("/all", response_model=s.AllUsers)
def get_all_user(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_admin),
):
    log(log.INFO, "get_all_user")
    users: m.User = (
        db.query(m.User)
        .filter(and_(m.User.is_deleted == False, m.User.role != m.UserRole.Admin))
        .order_by(m.User.id.desc())
        .all()
    )
    return s.AllUsers(users=users)


@router.get("/{id}", response_model=s.UserDetailOut)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_admin),
):
    log(log.INFO, "get_user")
    user: m.User = db.query(m.User).get(id)

    if not user or user.is_deleted or user.role == m.UserRole.Admin:
        log(log.WARNING, "get_user: This user was not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="This user was not found"
        )

    return user


@router.delete("/{id}", status_code=status.HTTP_200_OK)
def delete_user_marketeer(
    id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_admin),
):

    log(log.INFO, "delete_user_marketeer")
    user: m.User = db.query(m.User).get(id)

    if not user or user.is_deleted or user.role != m.UserRole.Marketeer:
        log(log.WARNING, "delete_user_marketeer: This user was not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="This user was not found"
        )

    user.is_deleted = True
    db.commit()
    return {"user_id": user.id}


@router.patch("/{id}", status_code=status.HTTP_200_OK)
def update_user(
    id: int,
    data: s.UserUpdate,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_admin),
):

    log(log.INFO, "update_user")
    user: m.User = db.query(m.User).get(id)

    if not user or user.is_deleted or user.role != m.UserRole.Marketeer:
        log(log.WARNING, "update_user: This user was not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="This user was not found"
        )

    user.is_active = data.is_active

    db.commit()
    db.refresh(user)

    return {"user_id": user.id}
