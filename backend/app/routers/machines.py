from routers.models.tables import Machine, MachineCreate, MachineRead, ExcerciseMachineLink
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix="/machines")

def get_session():
    with Session(engine) as session:
        yield session

@router.post("")
def create_machine(machine: MachineCreate):
    with Session(engine.engine) as session:
        db_machine = Machine.model_validate(machine)
        session.add(db_machine)
        session.commit()
        session.refresh(db_machine)
        return db_machine

@router.get("", response_model=MachineRead)
def read_excercise(*, session: Session = Depends(get_session), machine_id = int):
     machine = session.get(Machine, machine_id)
     if not machine:
         raise HTTPException(status_code=404, detail="machine not found")
     return machine

@router.post("/excercise-machine-link/", response_model=ExcerciseMachineLink)
def create_excercise_machine_link(link: ExcerciseMachineLink, session: Session = Depends(get_session)):
    db_link = ExcerciseMachineLink.model_validate(link)
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    
    session.commit()

    return db_link

@router.get("/excercise-machine-link", response_model=list[ExcerciseMachineLink])
def read_excercise_machine_link(*, session: Session = Depends(get_session)):
     machinelinks = session.exec(select(ExcerciseMachineLink)).all()
     return machinelinks