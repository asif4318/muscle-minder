from routers.models.tables import Excercise, ExcerciseRead, ExcerciseCreate, ExcerciseReadWithMuscle, ExcerciseMuscleLink, ExcerciseUpdate, Muscle, WorkoutExcerciseLink
from utilities import engine
from sqlmodel import Session, select
from fastapi import APIRouter, Depends, HTTPException

def get_session():
    with Session(engine) as session:
        yield session

router = APIRouter(prefix="/excercises")


@router.post("", response_model=ExcerciseRead)
def create_excercise(*, session: Session = Depends(get_session) , excercise: ExcerciseCreate):
    '''Create Excercise'''
    db_excercise = Excercise.model_validate(excercise)
    session.add(db_excercise)
    session.commit()
    session.refresh(db_excercise)
    return db_excercise


# @router.get("", response_model=list[ExcerciseRead])
# def read_excercises(
#     *,
#     session: Session = Depends(get_session),
#     offset: int = 0,
#     limit: int = Query(default=100, le=100),
# ):
#     with Session(engine.engine) as session:
#         excercises = session.exec(select(Excercise).offset(offset).limit(limit)).all()
#         return excercises

@router.get("", response_model=list[ExcerciseReadWithMuscle])
def read_excercise(*, session: Session = Depends(get_session)):
     excercise = session.exec(select(Excercise)).all()
     return excercise

@router.patch("", response_model=ExcerciseRead)
def update_excercise(
    *, session: Session = Depends(get_session), excercise_id: int, excercise: ExcerciseUpdate):
    db_excercise = session.get(Excercise, excercise_id)
    if not db_excercise:
        raise HTTPException(status_code=404, detail = "Excercise not found")
    excercise_data = excercise.model_dump(exclude_unset=True)
    for key, value in excercise_data.items():
        setattr(db_excercise, key, value)
    session.add(db_excercise)
    session.commit()
    session.refresh(db_excercise)
    return db_excercise

@router.post("/excercise-muscle-link/", response_model=ExcerciseMuscleLink)
def create_excercise_muscle_link(link: ExcerciseMuscleLink, session: Session = Depends(get_session)):
    db_link = ExcerciseMuscleLink.model_validate(link)
    session.add(db_link)
    session.commit()
    session.refresh(db_link)
    
    session.commit()

    return db_link

@router.get("/excercise-muscle-link/", response_model=list[ExcerciseMuscleLink])
def read_all_excercise_muscle_links(session: Session = Depends(get_session)):
    links = session.exec(select(ExcerciseMuscleLink)).all()
    return links

@router.post("/workout-excercise-link", response_model=list[WorkoutExcerciseLink])
def create_workout_excercise_link(link: WorkoutExcerciseLink, session: Session = Depends(get_session)):
    db_link = WorkoutExcerciseLink.model_validate(link)
    session.add(db_link)
    session.commit()
    session.refresh(db_link)

    session.commit()

    return db_link

@router.get("/workout-excercise-link", response_model=list[WorkoutExcerciseLink])
def read_all_workout_excercise_link(session: Session = Depends(get_session)):
    links = session.exec(select(WorkoutExcerciseLink)).all()
    return links