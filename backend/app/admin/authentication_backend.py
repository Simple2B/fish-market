from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from fastapi import HTTPException

from app.database import get_db
from app.config import settings
from app.model import User, UserRole

from app.oauth2 import create_access_token, verify_access_token
from app.schema import TokenData

db = get_db().__next__()


class BaseAuthenticationBackend(AuthenticationBackend):
    async def login(
        self,
        request: Request,
        db=db,
    ) -> bool:
        # TEST IT OUT + TEST CLI COMMAND
        form = await request.form()
        username = form["username"]
        password = form["password"]
        superuser = User.authenticate(db, username, password)  # type: ignore
        if not superuser or superuser.role != UserRole.Admin:
            return False
        access_token = create_access_token(data={"user_id": superuser.id})
        request.session.update({"token": access_token})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")

        if not token:
            # return RedirectResponse("/admin/login")
            return False

        credentials_exception: HTTPException = HTTPException(
            status_code=404,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        token_data: TokenData = verify_access_token(token, credentials_exception)
        superuser: User = db.query(User).get(token_data.id)
        if not superuser:
            raise credentials_exception
        return True


authentication_backend: BaseAuthenticationBackend = BaseAuthenticationBackend(
    secret_key=settings.JWT_SECRET
)
