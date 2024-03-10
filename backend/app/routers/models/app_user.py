from sqlmodel import Field, SQLModel
from typing import Optional
from datetime import date


class AppUserBase(SQLModel):
    first_name: str = Field()
    last_name: str = Field()
    date_of_birth: date = Field()


class AppUser(AppUserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class AppUserCreate(AppUserBase):
    pass


class AppUserRead(AppUserBase):
    id: int
