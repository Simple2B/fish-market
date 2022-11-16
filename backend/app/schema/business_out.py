from typing import Optional

from pydantic import BaseModel


class BusinessOut(BaseModel):
    user_id: int
    name: Optional[str]
    log: Optional[str]
    web_site_id: str
