from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Vendedor(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))

    productos = relationship("Producto", back_populates="vendedor")


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255), index=True)
    precio = Column(Float)
    descripcion_marketing = Column(String(500))
    imagen_url = Column(String(500))
    vendedor_id = Column(Integer, ForeignKey("usuarios.id"))

    vendedor = relationship("Vendedor", back_populates="productos")