from typing import Optional
from engine_singleton import EngineSingleton

# One line of FastAPI imports here later 👈
from fastapi import FastAPI
from sqlmodel import SQLModel
from routers import users

engine = EngineSingleton()


def create_db_and_tables():
    SQLModel.metadata.create_all(engine.engine)


app = FastAPI()
app.include_router(users.router)


@app.on_event("startup")
async def startup_event():
    create_db_and_tables()
    print("STARTED")
