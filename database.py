from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexión usando los mismos parámetros de tu clase Connection
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:@localhost:3306/ecomers"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()