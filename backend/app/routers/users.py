from routers.models.user import User
from engine_singleton import EngineSingleton
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/users")

engine = EngineSingleton()


@router.post("")
def create_user(user: User):
    with Session(engine.engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user


@router.get("")
def read_users():
    with Session(engine.engine) as session:
        users = session.exec(select(User)).all()
        return users
