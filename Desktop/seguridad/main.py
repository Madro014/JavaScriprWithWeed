from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta

import crud, models, schemas
from database import SessionLocal, engine, create_db_tables, get_db # Import get_db
from security import hash_password, verify_password, create_access_token, get_current_user, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_SECONDS
from gemini_client import generar_descripcion, generar_imagen
from fastapi.middleware.cors import CORSMiddleware # Import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  # La URL de la aplicación React
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear las tablas de la base de datos al iniciar la aplicación
@app.on_event("startup")
def on_startup():
    create_db_tables()

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/register", response_model=schemas.Vendedor, summary="Registrar un nuevo usuario")
async def register_user(user: schemas.VendedorCreate, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_vendedor_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="El email ya está registrado")
        hashed_password = hash_password(user.password)
        db_vendedor = crud.create_vendedor(db=db, email=user.email, hashed_password=hashed_password)
        return db_vendedor
    except Exception as e:
        logger.error(f"Error during user registration: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor durante el registro")

@app.post("/token", response_model=schemas.Token, summary="Iniciar sesión y obtener token de acceso")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_vendedor_by_email(db, email=form_data.username)
    if not user or not verify_password(user.hashed_password, form_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users", response_model=List[schemas.Vendedor], summary="Obtener todos los usuarios (protegido)")
async def get_all_users(current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    users = crud.get_vendedores(db)
    return users

@app.get("/productos/", response_model=List[schemas.Producto], summary="Obtener todos los productos (protegido)")
async def get_all_productos(current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    productos = crud.get_productos(db)
    return productos

@app.get("/productos/me", response_model=List[schemas.Producto], summary="Obtener productos del usuario actual (protegido)")
async def get_my_productos(current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    productos = crud.get_productos_by_vendedor(db, vendedor_id=current_user.id)
    return productos

@app.post("/productos/", response_model=schemas.Producto, summary="Crear un nuevo producto (protegido)")
async def create_new_producto(producto: schemas.ProductoCreate, current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        descripcion_marketing = generar_descripcion(producto.nombre)
        imagen_url = generar_imagen(producto.nombre)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al generar descripción o imagen: {e}")
    
    try:
        db_producto = crud.create_producto(db=db, producto=producto, vendedor_id=current_user.id, descripcion_marketing=descripcion_marketing, imagen_url=imagen_url)
        return db_producto
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear el producto en la base de datos: {e}")

@app.get("/users/{user_id}", response_model=schemas.Vendedor, summary="Obtener un usuario por ID (protegido)")
async def get_user_by_id(user_id: int, current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    user = crud.get_vendedor_by_id(db, vendedor_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@app.put("/users/{user_id}", response_model=schemas.Vendedor, summary="Actualizar un usuario por ID (protegido)")
async def update_user(user_id: int, user: schemas.VendedorCreate, current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = crud.get_vendedor_by_id(db, vendedor_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Actualizar solo los campos proporcionados
    update_data = user.dict(exclude_unset=True)
    for key, value in update_data.items():
        if key == "password":
            db_user.hashed_password = hash_password(value)
        else:
            setattr(db_user, key, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}", summary="Eliminar un usuario por ID (protegido)")
async def delete_user(user_id: int, current_user: models.Vendedor = Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = crud.get_vendedor_by_id(db, vendedor_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_user)
    db.commit()
    return {"message": "Usuario eliminado exitosamente"}