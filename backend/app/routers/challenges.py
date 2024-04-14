from routers.models.tables import *
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException
from datetime import date, timedelta

def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/challenge")

@router.get("", response_model=list[Excercise])
def challenge_exercises(*, session: Session = Depends(get_session), user_id = int):
     user = session.get(AppUser, user_id)
     if not user:
         raise HTTPException(status_code=404, detail="User not found")
     links: list[int] = (session.exec(select(UserWorkoutLink.workout_id).where(UserWorkoutLink.workout_date >= date.today()-timedelta(weeks=1), UserWorkoutLink.user_id == user.id)))
     workoutlinks: list[int] = []
     excerciselinks: list[int] = []
     challengeList: list[Excercise] = []
     for item in links:
        if item not in workoutlinks:
             workoutlinks.append(item)
     for item in workoutlinks:
              db_excerciselinks = session.exec(select(WorkoutExcerciseLink.excercise_id).where(WorkoutExcerciseLink.workout_id == item))
              for db_links in db_excerciselinks:
                   if db_links not in excerciselinks:
                        excerciselinks.append(db_links)
     allExercises = session.exec(select(Excercise)).all()
     for exercise in allExercises:
          challengeList.append(exercise)
     return challengeList