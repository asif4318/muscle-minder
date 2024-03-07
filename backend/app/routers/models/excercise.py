from sqlmodel import Field, SQLModel
from typing import Optional
from .muscle import Muscle


class Excercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    # muscles: Optional[list[Muscle]] = Field()
