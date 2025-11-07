# Proyecto FastAPI con SQLAlchemy y Gemini API

Este proyecto es una API RESTful construida con FastAPI que gestiona usuarios (vendedores) y productos. Utiliza SQLAlchemy para la interacción con la base de datos y la API de Gemini para generar descripciones de marketing e imágenes para los productos.

## Características

- **Autenticación y Autorización**: Registro de usuarios, inicio de sesión y protección de rutas con tokens JWT.
- **Gestión de Usuarios**: CRUD (Crear, Leer, Actualizar, Eliminar) para vendedores.
- **Gestión de Productos**: CRUD para productos, incluyendo la generación automática de descripciones de marketing e imágenes mediante la API de Gemini.
- **Base de Datos**: Integración con MySQL usando SQLAlchemy.

## Configuración del Entorno

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd seguridad
```

### 2. Crear y Activar un Entorno Virtual

Es recomendable usar un entorno virtual para gestionar las dependencias del proyecto.

```bash
python -m venv venv
# En Windows
.\venv\Scripts\activate
# En macOS/Linux
source venv/bin/activate
```

### 3. Instalar Dependencias

Instala todas las dependencias necesarias usando `pip`:

```bash
pip install -r requirements.txt
```

### 4. Configuración de la Base de Datos

Este proyecto utiliza MySQL. Asegúrate de tener un servidor MySQL en ejecución.

- **Crear la Base de Datos**: Crea una base de datos llamada `login` en tu servidor MySQL.
- **Configurar la Conexión**: La URL de la base de datos está definida en `database.py`:

  ```python
  DATABASE_URL = "mysql+pymysql://root:@localhost/login"
  ```
  Asegúrate de que las credenciales (`root`, `@localhost`) coincidan con tu configuración de MySQL.

### 5. Configuración de la API de Gemini

Necesitarás una clave de API de Gemini para utilizar las funciones de generación de contenido. Configura tu clave en el archivo `gemini_client.py` o como una variable de entorno.

### 6. Ejecutar la Aplicación

Una vez que todas las dependencias estén instaladas y la base de datos configurada, puedes iniciar la aplicación FastAPI:

```bash
uvicorn main:app --reload
```

La aplicación estará disponible en `http://127.0.0.1:8000`.

### 7. Acceder a la Documentación de la API

FastAPI genera automáticamente documentación interactiva (Swagger UI) en:

- `http://127.0.0.1:8000/docs`

Aquí podrás probar todos los endpoints de la API.

## Endpoints Principales

- `POST /register`: Registrar un nuevo usuario.
- `POST /login`: Iniciar sesión y obtener un token de acceso JWT.
- `GET /users`: Obtener todos los usuarios (protegido).
- `GET /users/{user_id}`: Obtener un usuario por ID (protegido).
- `PUT /users/{user_id}`: Actualizar un usuario por ID (protegido).
- `DELETE /users/{user_id}`: Eliminar un usuario por ID (protegido).
- `GET /productos/`: Obtener todos los productos (protegido).
- `POST /productos/`: Crear un nuevo producto (protegido, genera descripción e imagen con Gemini).