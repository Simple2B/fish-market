from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.schema import TokenData
from app.database import get_db
from app import model as m
from app.logger import log
from app.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.JWT_SECRET
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY)

    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY)
        id: str = payload.get("user_id")

        if not id:
            raise credentials_exception

        token_data = TokenData(id=id)
    except JWTError:
        raise credentials_exception

    return token_data


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=404,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = verify_access_token(token, credentials_exception)
    user = db.query(m.User).get(int(token.id))

    return user


def get_current_admin(current_user=Depends(get_current_user)):
    if current_user.role != m.UserRole.Admin:
        log(log.WARNING, "The user not admin")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permissions to do it",
        )
    return current_user


def get_business_from_cur_user(current_user=Depends(get_current_user)) -> m.Business:

    business = None

    if current_user.businesses and current_user.role == m.UserRole.Marketeer:
        business = current_user.businesses[0]

    if not business or business.user.is_deleted:
        log(log.WARNING, "User [%s] does not have business", current_user)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't  have permission to the business",
        )

    return business
