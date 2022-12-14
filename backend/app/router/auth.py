from fastapi import APIRouter, Depends, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi import status
from sqlalchemy.orm import Session

from app.schema import Token
from app.database import get_db
from app import model as m
from app import schema as s
from app.model import User
from app.service.oauth2 import create_access_token
from app.service import get_current_user, get_current_admin
from app.logger import log

router = APIRouter(tags=["Authentication"])


@router.post("/login", response_model=Token, response_model_exclude_none=True)
def login(
    user_credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user: User = User.authenticate(
        db,
        user_credentials.username,
        user_credentials.password,
    )

    if not user or user.is_deleted or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials"
        )

    access_token = create_access_token(data={"user_id": user.id})

    if user.role == m.UserRole.Admin:
        return {"access_token": access_token, "token_type": "bearer", "is_admin": True}
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me-info", status_code=status.HTTP_200_OK)
def user_info(
    is_admin: bool = False,
    current_user: m.User = Depends(get_current_user),
):
    if is_admin:
        if current_user.role == m.UserRole.Admin:
            return {"is_valid": True}
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access is denied",
        )
    return {"is_valid": True}


@router.patch("/change-password", status_code=status.HTTP_200_OK)
def change_password(
    data: s.ChangePassword,
    db: Session = Depends(get_db),
    current_user: m.User = Depends(get_current_user),
):

    log(log.INFO, "change_password user_id:[%s]", current_user.id)
    password = data.password
    new_password = data.new_password

    user: m.User = m.User.authenticate(
        db,
        current_user.username,
        password,
    )

    if not user:
        log(log.ERROR, "change_password user_id:[%s] not found", current_user.id)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Incorrect current password"
        )

    user.password = new_password
    db.commit()
    return {"ok", True}


@router.get(
    "/login-as-user/{id}",
    status_code=status.HTTP_200_OK,
    response_model=Token,
    response_model_exclude_none=True,
)
def login_as_user(
    id: int,
    current_user: int = Depends(get_current_admin),
    db: Session = Depends(get_db),
):

    log(log.INFO, "login_as_user user: id [%d]", id)
    user = db.query(m.User).get(id)

    access_token = create_access_token(data={"user_id": user.id})

    return {"access_token": access_token, "token_type": "bearer"}
