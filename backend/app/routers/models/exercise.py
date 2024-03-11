from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional
from .muscle import Muscle
from .exercise_muscle_link import ExerciseMuscleLink


class Exercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    # muscles: List["Muscle"] = Relationship(
    #     back_populates="muscle", link_model=ExerciseMuscleLink)
