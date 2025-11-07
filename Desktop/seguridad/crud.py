from sqlalchemy.orm import Session
import models, schemas
from models import Vendedor
from typing import Optional


def get_vendedor_by_email(db: Session, email: str):
    return db.query(Vendedor).filter(Vendedor.email == email).first()


def create_vendedor(db: Session, email: str, hashed_password: str):
    db_vendedor = Vendedor(email=email, hashed_password=hashed_password)
    db.add(db_vendedor)
    db.commit()
    db.refresh(db_vendedor)
    return db_vendedor

def get_vendedor_by_id(db: Session, vendedor_id: int):
    return db.query(Vendedor).filter(Vendedor.id == vendedor_id).first()

def get_vendedores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Vendedor).offset(skip).limit(limit).all()


def create_producto(db: Session, producto: schemas.ProductoCreate, vendedor_id: int, descripcion_marketing: str, imagen_url: Optional[str] = None):
    db_producto = models.Producto(**producto.model_dump(), vendedor_id=vendedor_id, descripcion_marketing=descripcion_marketing, imagen_url=imagen_url)
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    return db_producto


def get_productos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Producto).offset(skip).limit(limit).all()

def get_productos_by_vendedor(db: Session, vendedor_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Producto).filter(models.Producto.vendedor_id == vendedor_id).offset(skip).limit(limit).all()