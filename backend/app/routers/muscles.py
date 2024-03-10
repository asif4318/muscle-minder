from routers.models.exercise_muscle_link import Muscle
from routers.models.muscle import MuscleRead
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/muscles")


@router.post("", response_model=MuscleRead)
def create_muscle(muscle: Muscle):
    with Session(engine.engine) as session:
        session.add(muscle)
        session.commit()
        session.refresh(muscle)
        return muscle


@router.get("")
def read_muscles():
    with Session(engine.engine) as session:
        muscles = session.exec(select(Muscle)).all()
        return muscles
