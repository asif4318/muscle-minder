from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional
from datetime import date


class ExcerciseMuscleLink(SQLModel, table=True):
    muscle_id: Optional[int] = Field(
        default=None, foreign_key="muscle.id", primary_key=True)
    excercise_id: Optional[int] = Field(
        default=None, foreign_key="excercise.id", primary_key=True)
    
    muscle: "Muscle" = Relationship(back_populates = "excercise_links")
    excercise: "Excercise" = Relationship(back_populates = "muscle_links")


class UserWorkoutLink(SQLModel, table=True):
    user_id: Optional[int] = Field(
        default=None, foreign_key="appuser.id", primary_key=True)
    workout_id: Optional[int] = Field(
        default=None, foreign_key="workout.id", primary_key=True)
    
    user: "AppUser" = Relationship(back_populates = "workout_links")
    workout: "Workout" = Relationship(back_populates = "user_links")
    

class Excercise(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    muscle_links: list[ExcerciseMuscleLink] = Relationship(
        back_populates="excercise")
    
class Muscle(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    excercise_links: list[ExcerciseMuscleLink] = Relationship(
        back_populates="muscle")

class Workout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    reps: int = Field()
    sets: int = Field()
    workoutDate: date = Field()

    user_links: list["UserWorkoutLink"] = Relationship(
        back_populates="workout")
    
class AppUserBase(SQLModel):
    first_name: str = Field()
    last_name: str = Field()
    date_of_birth: date = Field()


class AppUser(AppUserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    workout_links: list["UserWorkoutLink"] = Relationship(
        back_populates="user")


class AppUserCreate(AppUserBase):
    pass


class AppUserRead(AppUserBase):
    id: int