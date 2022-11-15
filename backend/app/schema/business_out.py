from pydantic import BaseModel
from typing import Optional


class BusinessOut(BaseModel):
    user_id: int
    name: Optional[str]
    log: Optional[str]
    web_site_id: str
