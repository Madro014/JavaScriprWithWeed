E-Commerce de Moda - Documentación

1. ESTRUCTURA DEL PROYECTO:
/backend (Spring Boot)
├── src/main/java/com/example/crudprueba
│   ├── ProductoController.java - Endpoints API REST de Productos
│   ├── ProductoService.java - Lógica de negocio de Productos
│   ├── ProductoRepository.java - Acceso a datos de Productos
│   ├── UsuarioController.java - Endpoints API REST de Autenticación
│   ├── UsuarioService.java - Lógica de negocio de Usuarios
│   ├── UsuarioRepository.java - Acceso a datos de Usuarios
│   ├── SecurityConfig.java - Configuración de Seguridad
│   ├── Producto.java - Entidad Producto
│   └── Usuario.java - Entidad Usuario

/frontend (React)
└── src/App.jsx - Vista principal de productos

2. TECNOLOGÍAS:
- Java 17
- Spring Boot 3.2.4
- Spring Security
- MySQL 8.0
- React 18
- Bootstrap 5

3. CONFIGURACIÓN INICIAL:
1. Crear base de datos MySQL:
   CREATE DATABASE ecomers;
2. Ejecutar backend:
   mvn spring-boot:run
3. Configurar frontend:
   npm install
   npm start

4. ENDPOINTS PRINCIPALES (localhost:8080):
GET    /api/v1/productos       - Listar todos
POST   /api/v1/productos       - Crear producto
GET    /api/v1/productos/{id}  - Detalle producto
PUT    /api/v1/productos/{id}  - Actualizar producto
DELETE /api/v1/productos/{id}  - Eliminar producto
POST   /api/v1/auth/register   - Registrar un nuevo usuario
POST   /api/v1/auth/login      - Iniciar sesión

5. EJEMPLO DE PRODUCTO (JSON):
{
  "nombre": "Vestido Verano",
  "precio": 89.99,
  "talla": "M",
  "color": "Azul",
  "categoria": "Vestidos"
}

6. EJEMPLO DE USUARIO (JSON):
{
    "nombre": "david madro",
    "correo": "david.madro@example.com",
    "contrasena": "password123"
}

7. INTEGRACIÓN FRONTEND:
- Asegurar CORS habilitado en backend
- Configurar proxy en package.json
- Usar fetch hacia http://localhost:8080/api/v1/productos