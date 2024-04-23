from typing import Optional
from utilities import engine
import uvicorn

# One line of FastAPI imports here later 👈
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from routers import users, muscles, excercises, workouts, testingMuscleSearch, challenges, bodyweightfilter, machines


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Startup the API and include all of the routers
app = FastAPI()

origins = [
    "http://localhost:5194"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)
app.include_router(muscles.router)
app.include_router(workouts.router)
app.include_router(excercises.router)
app.include_router(testingMuscleSearch.router)
app.include_router(challenges.router)
app.include_router(bodyweightfilter.router)
app.include_router(machines.router)


@app.on_event("startup")
async def startup_event():
    create_db_and_tables()
    print("STARTED")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
