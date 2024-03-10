from routers.models.excercise import Instructions
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/instructions")


@router.post("")
def create_instruction(instruction: Instruction):
    '''Insert your instructions for this exercise'''
    with Session(engine.engine) as session:
        session.add(instruction)
        session.commit()
        session.refresh(instruction)
        return instruction


@router.get("")
def read_instructions():
    with Session(engine.engine) as session:
        instructions = session.exec(select(Instruction)).all()
        return instructions
