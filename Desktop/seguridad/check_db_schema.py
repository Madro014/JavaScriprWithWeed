from sqlalchemy import create_engine, text
from database import DATABASE_URL

# Conectar a la base de datos
engine = create_engine(DATABASE_URL)
with engine.connect() as connection:
    # Consultar el esquema de la tabla 'productos' usando text()
    result = connection.execute(text("DESCRIBE productos;"))
    # Mostrar los resultados
    print("Esquema de la tabla 'productos':")
    for row in result:
        print(row)