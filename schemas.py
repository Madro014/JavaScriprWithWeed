from pydantic import BaseModel

class ProductBase(BaseModel):
    nombre: str
    precio: float
    cantidad: int
    categoria: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: str

    class Config:
        from_attributes = True