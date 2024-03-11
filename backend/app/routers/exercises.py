from routers.models.exercise import Exercise
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/exercises")


@router.post("")
def create_exercise(exercise: Exercise):
    '''Create Exercise'''
    with Session(engine.engine) as session:
        session.add(exercise)
        session.commit()
        session.refresh(exercise)
        return exercise


@router.get("")
def read_exercises():
    with Session(engine.engine) as session:
        exercises = session.exec(select(Exercise)).all()
        return exercises
