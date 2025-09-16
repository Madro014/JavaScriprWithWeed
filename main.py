from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
import service
from database import SessionLocal, engine
from typing import List


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/products/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    try:
        return service.create_product(db=db, product=product)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear el producto: {e}")

@app.get("/products/", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    products = service.get_products(db, skip=skip, limit=limit)
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: str, db: Session = Depends(get_db)):
    db_product = service.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_product

@app.delete("/products/", response_model=schemas.Product)
def delete_product(product: schemas.Product, db: Session = Depends(get_db)):
    db_product = service.delete_product(db, product_id=product.id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_product

@app.put("/products/", response_model=schemas.Product)
def update_product(product: schemas.Product, db: Session = Depends(get_db)):
    db_product = service.update_product(db, product.id, product)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_product