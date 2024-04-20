from routers.models.tables import *
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException
from datetime import date, timedelta
import random

def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/challenge")

@router.get("", response_model=Excercise)
def challenge_exercises(*, session: Session = Depends(get_session), user_id = int):
     user = session.get(AppUser, user_id)
     if not user:
         raise HTTPException(status_code=404, detail="User not found")
     rand_exercise = session.query(Excercise)[random.randrange(0, session.query(Excercise).count())]
     return rand_exercise


""" Old - This would get all exercises done in the last week and then add a random exercise on top of it
@router.get("", response_model=list[Excercise])
def challenge_exercises(*, session: Session = Depends(get_session), user_id = int):
     user = session.get(AppUser, user_id)
     if not user:
         raise HTTPException(status_code=404, detail="User not found")
     links: list[int] = (session.exec(select(UserWorkoutLink.workout_id).where(UserWorkoutLink.workout_date >= date.today()-timedelta(weeks=1), UserWorkoutLink.user_id == user.id)))
     workoutlinks: list[int] = []
     excerciselinks: list[int] = []
     for item in links:
        if item not in workoutlinks:
             workoutlinks.append(item)
     for item in workoutlinks:
              db_excerciselinks = session.exec(select(WorkoutExcerciseLink.excercise_id).where(WorkoutExcerciseLink.workout_id == item))
              for db_links in db_excerciselinks:
                   if db_links not in excerciselinks:
                        excerciselinks.append(db_links)
     allExercises = session.exec(select(Excercise)).all()
     challengeList: list[Excercise] = []
     for exercise in allExercises:
        if exercise.id in excerciselinks:
            challengeList.append(exercise)
     while True:
        rand_exercise = session.query(Excercise)[random.randrange(0, session.query(Excercise).count())]
        if rand_exercise.id not in challengeList:
            challengeList.append(rand_exercise)
            break
     return challengeList
     """