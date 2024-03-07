from routers.models.muscle import Muscle
from engine_singleton import EngineSingleton
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/muscles")

engine = EngineSingleton()


@router.post("")
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
