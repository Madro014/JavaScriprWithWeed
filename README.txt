# E-Commerce de Moda

Este proyecto implementa una plataforma de comercio electrónico de moda, dividida en un backend desarrollado con Spring Boot y un frontend con React.

## 1. Estructura del Proyecto

El proyecto está organizado en dos directorios principales: `backend` y `frontend`.

### `/backend` (Spring Boot)

```
/backend
├── src/main/java/com/example/crudprueba
│   ├── ProductoController.java    - Endpoints API REST para la gestión de Productos
│   ├── ProductoService.java       - Lógica de negocio para Productos
│   ├── ProductoRepository.java    - Acceso a datos para Productos
│   ├── UsuarioController.java     - Endpoints API REST para Autenticación de Usuarios
│   ├── UsuarioService.java        - Lógica de negocio para Usuarios
│   ├── UsuarioRepository.java     - Acceso a datos para Usuarios
│   ├── SecurityConfig.java        - Configuración de Seguridad (Spring Security)
│   ├── Producto.java              - Entidad que representa un Producto
│   └── Usuario.java               - Entidad que representa un Usuario
```

### `/frontend` (React)

```
/frontend
└── src/App.jsx - Componente principal de la aplicación, enfocado en la vista de productos.
```

## 2. Tecnologías Utilizadas

### Backend
- **Java**: 17
- **Spring Boot**: 3.2.4
- **Spring Security**: Para autenticación y autorización
- **MySQL**: 8.0 (Base de datos relacional)

### Frontend
- **React**: 18
- **Bootstrap**: 5 (Framework CSS para diseño responsivo)

## 3. Configuración Inicial y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 3.1. Base de Datos MySQL

1.  Asegúrate de tener un servidor MySQL 8.0 en ejecución.
2.  Crea la base de datos necesaria ejecutando el siguiente comando SQL:

    ```sql
    CREATE DATABASE ecomers;
    ```

### 3.2. Ejecución del Backend

1.  Navega al directorio `/backend`:
    ```bash
    cd backend
    ```
2.  Ejecuta la aplicación Spring Boot:
    ```bash
    mvn spring-boot:run
    ```
    El backend se iniciará en `http://localhost:8080`.

### 3.3. Configuración y Ejecución del Frontend

1.  Navega al directorio `/frontend`:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias de Node.js:
    ```bash
    npm install
    ```
3.  Inicia la aplicación React:
    ```bash
    npm start
    ```
    El frontend se iniciará en `http://localhost:3000` (o un puerto similar si el 3000 está ocupado).

## 4. Endpoints Principales del Backend

El backend expone los siguientes endpoints API REST en `http://localhost:8080/api/v1`:

### Productos

-   **GET** `/api/v1/productos`
    -   Descripción: Lista todos los productos disponibles.
-   **POST** `/api/v1/productos`
    -   Descripción: Crea un nuevo producto.
    -   Cuerpo de la solicitud (JSON): Ver "Ejemplo de Producto" más abajo.
-   **GET** `/api/v1/productos/{id}`
    -   Descripción: Obtiene los detalles de un producto específico por su ID.
-   **PUT** `/api/v1/productos/{id}`
    -   Descripción: Actualiza un producto existente por su ID.
    -   Cuerpo de la solicitud (JSON): Ver "Ejemplo de Producto" más abajo.
-   **DELETE** `/api/v1/productos/{id}`
    -   Descripción: Elimina un producto específico por su ID.

### Autenticación

-   **POST** `/api/v1/auth/register`
    -   Descripción: Registra un nuevo usuario en el sistema.
    -   Cuerpo de la solicitud (JSON): Ver "Ejemplo de Usuario" más abajo.
-   **POST** `/api/v1/auth/login`
    -   Descripción: Permite a un usuario iniciar sesión y obtener un token de autenticación.
    -   Cuerpo de la solicitud (JSON): Ver "Ejemplo de Usuario" más abajo (solo `correo` y `contrasena`).

## 5. Ejemplos de Modelos (JSON)

### Ejemplo de Producto

```json
{
  "nombre": "Vestido Verano",
  "precio": 89.99,
  "talla": "M",
  "color": "Azul",
  "categoria": "Vestidos"
}
```

### Ejemplo de Usuario

```json
{
  "nombre": "david madro",
  "correo": "david.madro@example.com",
  "contrasena": "password123"
}
```

## 6. Integración Frontend con Backend

Para asegurar una correcta comunicación entre el frontend (React) y el backend (Spring Boot), considera los siguientes puntos:

-   **CORS (Cross-Origin Resource Sharing)**: Asegúrate de que el backend tenga CORS habilitado para permitir solicitudes desde el dominio del frontend (generalmente `http://localhost:3000`).
-   **Configuración de Proxy**: En el archivo `package.json` del frontend, puedes configurar un proxy para redirigir las solicitudes API al backend, evitando problemas de CORS durante el desarrollo. Por ejemplo:
    ```json
    // package.json (en el directorio frontend)
    {
      "name": "frontend",
      "version": "0.1.0",
      "private": true,
      "proxy": "http://localhost:8080", // Redirige las solicitudes a este puerto
      "dependencies": {
        // ...
      }
    }
    ```
    Con esta configuración, puedes hacer solicitudes desde el frontend a `/api/v1/productos` y se redirigirán automáticamente a `http://localhost:8080/api/v1/productos`.
-   **Uso de `fetch` o Axios**: Utiliza la API `fetch` de JavaScript o una librería como Axios para realizar las llamadas HTTP al backend. Por ejemplo:
    ```javascript
    fetch('/api/v1/productos')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    ```
