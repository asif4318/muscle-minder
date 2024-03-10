from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional
from routers.models.excercise import ExcerciseBase
from routers.models.muscle import MuscleBase


class ExcerciseMuscleLink(SQLModel, table=True):
    muscle_id: Optional[int] = Field(
        default=None, foreign_key="muscle.id", primary_key=True)
    excercise_id: Optional[int] = Field(
        default=None, foreign_key="excercise.id", primary_key=True)


class Muscle(MuscleBase, table=True):
    excercises: List["Excercise"] = Relationship(
        back_populates="muscles", link_model=ExcerciseMuscleLink)


class Excercise(ExcerciseBase, table=True):
    muscles: List["Muscle"] = Relationship(
        back_populates="excercises", link_model=ExcerciseMuscleLink)
