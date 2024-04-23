from routers.models.tables import Workout, WorkoutRead, WorkoutCreate, UserWorkoutLink, WorkoutExcerciseLink, Excercise
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends

def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/workoutFilter")

@router.get("", response_model=list[WorkoutRead])
def read_workouts(*, session: Session = Depends(get_session)):
    workouts: list[WorkoutRead] = []
    db_workouts = session.exec(select(Workout)).all()
    for workout in db_workouts:
        flag = 0
        excerciselinks: list[WorkoutExcerciseLink] = session.exec(select(WorkoutExcerciseLink).where(WorkoutExcerciseLink.workout_id == workout.id)).all()
        excercises: list[int] = []
        for item in excerciselinks:
            if item.excercise_id not in excercises:
                excercises.append(item.excercise_id)
        for num in excercises:
            if session.exec(select(Excercise).where(Excercise.id == num)).one().machines != []:
                flag = 1
        if flag == 0:
            workouts.append(workout)
    return workouts