from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional
from .muscle import Muscle
from .exercise_muscle_link import ExcerciseMuscleLink


class Excercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    instruction: Optional[str] = None
    # muscles: List["Muscle"] = Relationship(
    #     back_populates="muscle", link_model=ExcerciseMuscleLink)
