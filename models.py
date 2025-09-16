import uuid
from sqlalchemy import Column, Integer, String, Float
from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    nombre = Column(String(255), index=True)
    precio = Column(Float)
    cantidad = Column(Integer)
    categoria = Column(String(255))
