from typing import List
from routers.models.tables import AppUser, AppUserCreate, AppUserRead
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter

router = APIRouter(prefix="/users")


@router.post("", response_model=AppUserRead)
def create_user(user: AppUserCreate):
    with Session(engine.engine) as session:
        db_user = AppUser.model_validate(user)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user


@router.get("", response_model=List[AppUser])
def read_users():
    with Session(engine.engine) as session:
        users = session.exec(select(AppUser)).all()
        return users
