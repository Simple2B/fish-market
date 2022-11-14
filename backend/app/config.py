from pydantic import BaseSettings, EmailStr


class Settings(BaseSettings):
    SAMPLE_ENV_VAR: str = "<None>"
    JWT_SECRET: str = "<None>"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URI: str = ""
    DEV_DATABASE_URI: str = "sqlite:///./test.db"
    ADDRESS = "1D Home, rome 1"
    PHONE_NUMBER = "380121233413"
    ADMIN_USER: str = "admin"
    ADMIN_PASS: str = "admin"
    ADMIN_EMAIL: EmailStr = "admin@admin.com"

    class Config:
        env_file = ".env"


settings = Settings()
