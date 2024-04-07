from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional
from datetime import date


class ExcerciseMuscleLink(SQLModel, table=True):
    muscle_id: int | None = Field(
        default=None, foreign_key="muscle.id", primary_key=True)
    excercise_id: int | None = Field(
        default=None, foreign_key="excercise.id", primary_key=True)


class UserWorkoutLink(SQLModel, table=True):
    user_id: Optional[int] = Field(
        default=None, foreign_key="appuser.id", primary_key=True)
    workout_id: Optional[int] = Field(
        default=None, foreign_key="workout.id", primary_key=True)
    workout_date: Optional[date] = Field(default=date.today(), index = True)

class WorkoutExcerciseLink(SQLModel, table = True):
    workout_id: Optional[int] = Field(
        default=None, foreign_key="workout.id", primary_key=True)
    excercise_id: Optional[int] = Field(
        default=None, foreign_key="excercise.id", primary_key=True)
    reps: int = Field()
    sets: int = Field() 
    
    
class ExcerciseBase(SQLModel):
    name: str = Field(index=True)

class Excercise(ExcerciseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    muscles: list["Muscle"] = Relationship(back_populates="excercises", link_model=ExcerciseMuscleLink)
    workouts: list["Workout"] = Relationship(back_populates="excercises", link_model=WorkoutExcerciseLink)
    
class MuscleBase(SQLModel):
    name: str = Field(index=True)

class Muscle(MuscleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    excercises: list["Excercise"] = Relationship(
        back_populates="muscles", link_model=ExcerciseMuscleLink)

class MuscleRead(MuscleBase):
    pass

class MuscleCreate(MuscleBase):
    pass

class ExcerciseCreate(ExcerciseBase):
    pass

class ExcerciseRead(ExcerciseBase):
    id: int

class ExcerciseUpdate(SQLModel):
    name: str | None = None
    reps: int | None = None
    sets: int | None = None
    id: int | None = None

class ExcerciseReadWithMuscle(ExcerciseRead):
    muscles: list["MuscleRead"] = []
    workouts: list["WorkoutRead"] = []

class MuscleReadWithExcercise(MuscleRead):
    excercises: list[ExcerciseRead] = []

class WorkoutBase(SQLModel):
    name: str = Field(index=True)

class Workout(WorkoutBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    excercises: list["Excercise"] = Relationship(back_populates="workouts", link_model=WorkoutExcerciseLink)
    users: list["AppUser"] = Relationship(
        back_populates="workouts", link_model = UserWorkoutLink)

class WorkoutRead(WorkoutBase):
    pass

class WorkoutReadWithRelationships(WorkoutRead):
    excercises: list["ExcerciseRead"] = []
    workouts: list["WorkoutRead"] = []

class WorkoutCreate(WorkoutBase):
    pass

class AppUserBase(SQLModel):
    first_name: str = Field()
    last_name: str = Field()
    date_of_birth: date = Field()


class AppUser(AppUserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    workouts: list["Workout"] = Relationship(
        back_populates="users", link_model = UserWorkoutLink)


class AppUserCreate(AppUserBase):
    pass


class AppUserRead(AppUserBase):
    id: int