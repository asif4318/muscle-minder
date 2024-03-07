from sqlmodel import create_engine

engine = create_engine("postgresql://user:password@localhost:5432", echo=True)
