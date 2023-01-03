from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from fastapi import HTTPException
from fastapi.responses import RedirectResponse

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
        request.session.update({"user_id": superuser.id})

        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        user_id = request.session.get("user_id")

        if not user_id:
            return RedirectResponse("/admin/login")

        superuser: User = db.query(User).get(user_id)
        if not superuser:
            return RedirectResponse("/admin/login")
        return True


authentication_backend: BaseAuthenticationBackend = BaseAuthenticationBackend(
    secret_key=settings.JWT_SECRET
)
