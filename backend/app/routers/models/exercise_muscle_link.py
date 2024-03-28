from sqlmodel import Field, SQLModel
from typing import Optional


class ExcerciseMuscleLink(SQLModel, table=True):
    muscle_id: Optional[int] = Field(
        default=None, foreign_key="muscle.id", primary_key=True)
    excercise_id: Optional[int] = Field(
        default=None, foreign_key="excercise.id", primary_key=True)
