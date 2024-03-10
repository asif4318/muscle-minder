from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional


class ExcerciseBase(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
