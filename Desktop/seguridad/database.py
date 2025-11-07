from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base

# Configuración de la base de datos
DATABASE_URL = "mysql+pymysql://root:@localhost/login"

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL)

# Crear una sesión de base de datos local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Función para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear las tablas en la base de datos
def create_db_tables():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)