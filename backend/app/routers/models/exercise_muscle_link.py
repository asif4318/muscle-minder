from sqlmodel import Field, SQLModel
from typing import Optional


class ExerciseMuscleLink(SQLModel, table=True):
    muscle_id: Optional[int] = Field(
        default=None, foreign_key="muscle.id", primary_key=True)
    exercise_id: Optional[int] = Field(
        default=None, foreign_key="exercise.id", primary_key=True)
