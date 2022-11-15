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
    users: m.User = (
        db.query(m.User)
        .filter(and_(m.User.is_deleted == False, m.User.role != m.UserRole.Admin))
        .all()
    )
    return s.AllUsers(users=users)


@router.get("/{id}", response_model=s.UserOut)
def get_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_admin),
):
    user = (
        db.query(m.User)
        .filter(
            and_(
                m.User.id == id,
                m.User.role != m.UserRole.Admin,
                m.User.is_deleted == False,
            )
        )
        .first()
    )

    if not user:
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
    user = (
        db.query(m.User)
        .filter(
            and_(
                m.User.id == id,
                m.User.is_deleted == False,
                m.User.role == m.UserRole.Marketeer,
            )
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="This user was not found"
        )

    user.is_deleted = True
    db.commit()
    return {"ok": True}


@router.patch("/update", response_model=s.UserFields)
def update_user(
    data: s.UserUpdate,
    db: Session = Depends(get_db),
    current_user: int = Depends(get_current_admin),
):
    user_id = data.id

    user = (
        db.query(m.User)
        .filter(
            and_(
                m.User.id == user_id,
                m.User.is_deleted == False,
                m.User.role == m.UserRole.Marketeer,
            )
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="This user was not found"
        )

    user_fields = data.fields
    for key, value in user_fields:
        if value is not None and getattr(user, key):
            setattr(user, key, value)

    db.commit()

    return user_fields
