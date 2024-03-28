from sqlmodel import Field, SQLModel
from typing import Optional
from .exercise_muscle_link import ExcerciseMuscleLink


class Muscle(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
