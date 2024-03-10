from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional


class MuscleBase(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    category: str = Field(default=None)


class MuscleRead(MuscleBase):
    id: int
