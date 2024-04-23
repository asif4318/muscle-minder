from sqlmodel import Field, Relationship, SQLModel
from typing import List, Optional
from datetime import date

# All of the tables used to store data in the backend, starts with linktables, each table is split into 
# 5 classes, the base, the main table, a create table, an update table, and a read table
# The read, create, and update tables tell the API what to expect, the base tables reduce 
# repeat code

# Table design:
#                                 User
#                                 Workout
#                                 Excercise <--> Machine
#                                 Muscle


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
    
class ExcerciseMachineLink(SQLModel, table = True):
    excercise_id: Optional[int] = Field(
        default=None, foreign_key = "excercise.id", primary_key=True)
    machine_id: Optional[int] = Field(
        default=None, foreign_key="machine.id", primary_key=True)
    
class ExcerciseBase(SQLModel):
    name: str = Field(index=True)
    reptime: int = Field()

class Excercise(ExcerciseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    muscles: list["Muscle"] = Relationship(
        back_populates="excercises", link_model=ExcerciseMuscleLink)
    workouts: list["Workout"] = Relationship(
        back_populates="excercises", link_model=WorkoutExcerciseLink)
    machines: list["Machine"] = Relationship(
        back_populates="excercises", link_model=ExcerciseMachineLink)
    
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

class MuscleReadWithExcercise(MuscleRead):
    excercises: list[ExcerciseRead] = []

class WorkoutBase(SQLModel):
    name: str = Field(index=True)
    time: Optional[int] = Field(default=0)

class Workout(WorkoutBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    excercises: list["Excercise"] = Relationship(
        back_populates="workouts", link_model=WorkoutExcerciseLink)
    users: list["AppUser"] = Relationship(
        back_populates="workouts", link_model = UserWorkoutLink)

class WorkoutRead(WorkoutBase):
    id: Optional[int] = None

class WorkoutReadWithRelationships(WorkoutRead):
    excercises: list["ExcerciseRead"] = []
    workouts: list["WorkoutRead"] = []

class WorkoutCreate(WorkoutBase):
    pass

class WorkoutCreateWithExcercises(WorkoutBase):
    excercises: list["Excercise"] = []

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

class MachineBase(SQLModel):
    name: str = Field()

class Machine(MachineBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    excercises: list["Excercise"] = Relationship(
        back_populates = "machines", link_model = ExcerciseMachineLink)
    
class MachineCreate(MachineBase):
    pass

class MachineRead(MachineBase):
    name: str