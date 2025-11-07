from pydantic import BaseModel
from typing import Optional

class VendedorBase(BaseModel):
    email: str

class VendedorCreate(VendedorBase):
    password: str

class Vendedor(VendedorBase):
    id: int
    hashed_password: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class ProductoBase(BaseModel):
    nombre: str
    precio: float


class ProductoCreate(ProductoBase):
    pass


class Producto(ProductoBase):
    id: int
    descripcion_marketing: str
    imagen_url: Optional[str] = None

    class Config:
        orm_mode = True