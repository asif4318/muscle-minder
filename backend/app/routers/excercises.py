from typing import List
from routers.models.exercise_muscle_link import Excercise, Muscle
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/excercises")


@router.post("")
def create_excercise(excercise: Excercise, muscles: List[Muscle]):
    '''Create Excercise'''
    with Session(engine.engine) as session:
        excercise.muscles = muscles
        session.add(excercise)
        session.commit()
        session.refresh(excercise)
        return excercise


@router.get("")
def read_excercises():
    with Session(engine.engine) as session:
        excercises = session.exec(select(Excercise)).all()
        return excercises
