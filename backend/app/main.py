from typing import Optional
from utilities import engine
import uvicorn

# One line of FastAPI imports here later 👈
from fastapi import FastAPI
from sqlmodel import SQLModel
from routers import users, muscles, excercises


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    SQLModel.exec


# Startup the API and include all of the routers
app = FastAPI()
app.include_router(users.router)
app.include_router(muscles.router)
app.include_router(excercises.router)


@app.on_event("startup")
async def startup_event():
    create_db_and_tables()
    print("STARTED")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
