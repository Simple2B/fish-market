import jinja2

# patch https://jinja.palletsprojects.com/en/3.0.x/changes/
# pass_context replaces contextfunction and contextfilter.
jinja2.contextfunction = jinja2.pass_context
# flake8: noqa F402

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqladmin import Admin

from app.router import phone_number, user, auth, business, product, order
from app import admin
from app.database import engine
from .config import settings


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sql_admin = Admin(
    app=app,
    engine=engine,
    authentication_backend=admin.authentication_backend,
)

for view in (
    admin.UserView,
    admin.BusinessView,
    admin.PhoneView,
    admin.ProductView,
    admin.OrderView,
):
    sql_admin.add_view(view)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(business.router)
app.include_router(product.router)
app.include_router(phone_number.router)
app.include_router(order.router)


@app.get("/")
def root():
    SAMPLE_ENV_VAR = settings.SAMPLE_ENV_VAR
    return {"ENV": SAMPLE_ENV_VAR}
