from sqlmodel import create_engine


class EngineSingleton(object):
    def __init__(self):
        self.engine = create_engine(
            "postgresql://user:password@localhost:5432", echo=True)

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(EngineSingleton, cls).__new__(cls)
        return cls.instance
