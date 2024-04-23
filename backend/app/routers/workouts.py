from routers.models.tables import Workout, WorkoutRead, WorkoutCreate, UserWorkoutLink, WorkoutCreateWithExcercises, AppUser, WorkoutReadWithExcercises
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException
from datetime import date, timedelta

def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/workouts")

@router.post("", response_model=WorkoutRead)
def create_workouts(*, session: Session = Depends(get_session) , workout: WorkoutCreate):
    '''Create Excercise'''
    db_workout = Workout.model_validate(workout)
    session.add(db_workout)
    session.commit()
    session.refresh(db_workout)
    return db_workout

@router.get("", response_model=list[WorkoutRead])
def read_workouts(*, session: Session = Depends(get_session)):
    workouts = session.exec(select(Workout)).all()
    return workouts

@router.post("/user-workout-link", response_model=UserWorkoutLink)
def create_user_workout_link(*, session: Session = Depends(get_session), link: UserWorkoutLink):
    db_link = UserWorkoutLink.model_validate(link)
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    return db_link

@router.get("/user-workout-link", response_model=list[UserWorkoutLink])
def read_user_workout_link(session: Session = Depends(get_session)):
    links = session.exec(select(UserWorkoutLink)).all()
    return links
@router.get("/userid-workout-link", response_model=list[UserWorkoutLink])
def read_user_workout_link(*, session: Session = Depends(get_session), userid: int):
    links = session.exec(select(UserWorkoutLink).where(userid == UserWorkoutLink.user_id)).all()
    return links
@router.get("/recent-workouts", response_model=list[WorkoutReadWithExcercises])
def read_recent_workouts(*, session: Session = Depends(get_session), userid: int):
    delta = timedelta(days=7)
    res: list[Workout] = []
    links = session.exec(select(UserWorkoutLink).where(userid == UserWorkoutLink.user_id and date.today() >= UserWorkoutLink.workout_date >= date.today-delta)).all() #checks if the date the workout was logged was within the last 7 days
    for link in links:
        workout = session.exec(select(Workout).where(link.workout_id == Workout.id)).one()
        res.append(workout)
    return res

