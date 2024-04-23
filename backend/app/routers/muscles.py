from routers.models.tables import Muscle, MuscleCreate, MuscleReadWithExcercise
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix="/muscles")

def get_session():
    with Session(engine) as session:
        yield session

@router.post("")
def create_muscle(muscle: MuscleCreate):
    with Session(engine.engine) as session:
        db_muscle = Muscle.model_validate(muscle)
        session.add(db_muscle)
        session.commit()
        session.refresh(db_muscle)
        return db_muscle

@router.get("", response_model=list[Muscle])
def read_excercise(*, session: Session = Depends(get_session)):
     muscle = session.exec(select(Muscle)).all()
     return muscle