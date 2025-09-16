# Proyecto FastAPI de Gestión de Productos

Este es un proyecto de ejemplo que implementa una API RESTful para la gestión de productos utilizando FastAPI, SQLAlchemy y MySQL.

## Estructura del Proyecto

- `main.py`: Archivo principal de la aplicación FastAPI, define los endpoints de la API.
- `models.py`: Define los modelos de la base de datos utilizando SQLAlchemy.
- `schemas.py`: Define los esquemas de datos para la validación de entrada y salida con Pydantic.
- `service.py`: Contiene la lógica de negocio para interactuar con la base de datos.
- `database.py`: Configuración de la conexión a la base de datos.
- `Requirements/requirements.txt`: Lista de dependencias del proyecto.

## Configuración del Entorno

1.  **Clonar el repositorio** (si aplica):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd pback
    ```

2.  **Crear un entorno virtual** (recomendado):
    ```bash
    python -m venv venv
    ```

3.  **Activar el entorno virtual**:
    *   **Windows (PowerShell)**:
        ```bash
        .\venv\Scripts\Activate.ps1
        ```
    *   **Windows (CMD)**:
        ```bash
        .\venv\Scripts\activate.bat
        ```
    *   **macOS/Linux**:
        ```bash
        source venv/bin/activate
        ```

4.  **Instalar las dependencias**:
    ```bash
    pip install -r Requirements/requirements.txt
    ```

## Configuración de la Base de Datos

Este proyecto utiliza MySQL. Asegúrate de tener un servidor MySQL en ejecución (por ejemplo, con XAMPP o Docker).

1.  **Crear la base de datos**: Crea una base de datos llamada `productos_db` en tu servidor MySQL.

2.  **Actualizar `database.py`**: Asegúrate de que la cadena de conexión en `database.py` sea correcta para tu configuración de MySQL.

## Ejecutar la Aplicación

Para iniciar el servidor FastAPI, ejecuta el siguiente comando desde la raíz del proyecto con el entorno virtual activado:

```bash
.\venv\Scripts\uvicorn.exe main:app --reload
```

La API estará disponible en `http://127.0.0.1:8000`.

## Endpoints de la API (con Postman)

Una vez que la aplicación esté en ejecución, puedes probar los endpoints utilizando Postman o una herramienta similar.

### 1. Crear un Producto (POST)

-   **URL**: `http://127.0.0.1:8000/products/`
-   **Método**: `POST`
-   **Headers**: `Content-Type: application/json`
-   **Body (raw, JSON)**:
    ```json
    {
        "nombre": "Laptop",
        "precio": 1200.00,
        "cantidad": 50,
        "categoria": "Electrónica"
    }
    ```

### 2. Obtener Todos los Productos (GET)

-   **URL**: `http://127.0.0.1:8000/products/`
-   **Método**: `GET`
-   **Parámetros de consulta (opcional)**:
    -   `skip`: Número de elementos a omitir (por defecto: 0)
    -   `limit`: Número máximo de elementos a devolver (por defecto: 10)

### 3. Obtener un Producto por ID (GET)

-   **URL**: `http://127.0.0.1:8000/products/{product_id}` (reemplaza `{product_id}` con el ID real del producto)
-   **Método**: `GET`

### 4. Actualizar un Producto (PUT)

-   **URL**: `http://127.0.0.1:8000/products/`
-   **Método**: `PUT`
-   **Headers**: `Content-Type: application/json`
-   **Body (raw, JSON)**:
    ```json
    {
        "id": "<ID_DEL_PRODUCTO>",
        "nombre": "Laptop Pro",
        "precio": 1500.00,
        "cantidad": 45,
        "categoria": "Electrónica"
    }
    ```

### 5. Eliminar un Producto (DELETE)

-   **URL**: `http://127.0.0.1:8000/products/`
-   **Método**: `DELETE`
-   **Headers**: `Content-Type: application/json`
-   **Body (raw, JSON)**:
    ```json
    {
        "id": "<ID_DEL_PRODUCTO>"
    }
    ```