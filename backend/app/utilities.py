from sqlmodel import create_engine

# Connection/Drive code to connect to postgresDB
engine = create_engine("postgresql://user:password@localhost:5432", echo=True)
