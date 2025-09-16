from sqlalchemy.orm import Session
import models, schemas

def get_product(db: Session, product_id: str):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(nombre=product.nombre, precio=product.precio, cantidad=product.cantidad, categoria=product.categoria)
    db.add(db_product)
    db.commit()
    db.refresh(db_product) 
    return db_product

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def delete_product(db: Session, product_id: str):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return db_product
    return None

def update_product(db: Session, product_id: str, product: schemas.ProductCreate):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db_product.nombre = product.nombre
        db_product.precio = product.precio
        db_product.cantidad = product.cantidad
        db_product.categoria = product.categoria
        db.commit()
        db.refresh(db_product)
        return db_product
    return None
