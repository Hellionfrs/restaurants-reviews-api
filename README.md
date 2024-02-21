# Proyecto: API de Reseñas de Restaurantes

## Acerca del proyecto

RESTful API para un sistema de reseñas de restaurantes. Los usuarios pueden registrar diferentes restaurantes, añadir reseñas y puntuaciones. Hay roles de usuario que permitirán distintos niveles de acceso y funcionalidades.

## Esquema de Base de Datos

### Tabla `users`
- **id** (INTEGER): Primary Key, Autoincremental.
- **username** (VARCHAR(50)): Unique, Not Null.
- **password** (VARCHAR(255)): Not Null.
- **role** (VARCHAR(20)): Not Null, Default 'user', Valores posibles: 'admin', 'user'.

### Tabla `restaurants`
- **id** (INTEGER): Primary Key, Autoincremental.
- **name** (VARCHAR(100)): Not Null.
- **address** (VARCHAR(255)): Not Null.
- **category** (VARCHAR(50)): Not Null.

### Tabla `reviews`
- **id** (INTEGER): Primary Key, Autoincremental.
- **userId** (INTEGER): Foreign Key references `Users(id)`, Not Null.
- **restaurantId** (INTEGER): Foreign Key references `Restaurants(id)`, Not Null.
- **score** (INTEGER): Not Null, Rango 1-5.
- **title** (VARCHAR(100)): Not Null.
- **description** (TEXT): Not Null.

#### Relaciones Entre las Tablas
- Un usuario puede escribir varias reseñas, pero una reseña pertenece a un usuario
- Un restaurante puede tener varias reseñas, pero una reseña pertenece a un restaurante.

## Detalles de los endpoints

### Registro de Usuarios (`POST /register`):
- Acceso: público
- Body:
  - `username` (string)
  - `password` (string)
  - `role` (string, opcional, valores posibles: "user" | "admin", default: "user")
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Usuario registrado exitosamente",
    "data": { "id": 1, "username": "newUser", role: "user" }
  }
  ```

### Autenticación de Usuarios (`POST /login`):
- Acceso: público
- Body:
  - `username` (string)
  - `password` (string)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Login exitoso",
    "data": { "token": "jwt_token_here" }
  }
  ```

### Listado de Restaurantes (`GET /restaurants`):
- Acceso: público
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Lista de restaurantes",
    "data": [
      { "id": 1, "name": "Restaurante A", "address": "Calle 123", "category": "Italiana" },
      { "id": 2, "name": "Restaurante B", "address": "Avenida 456", "category": "Mexicana" }
    ]
  }
  ```

### Creación de Restaurante (`POST /restaurants`):
- Acceso: usuarios autenticados
- Body:
  - `name` (string)
  - `address` (string)
  - `category` (string)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Restaurante creado exitosamente",
    "data": { "id": 3, "name": "Restaurante C", "address": "Calle 789", "category": "Japonesa" }
  }
  ```

### Actualización de Restaurante (`PATCH /restaurants/{id}`):
- Acceso: usuarios autenticados
- Body:
  - `name` (string, opcional)
  - `address` (string, opcional)
  - `category` (string, opcional)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Restaurante actualizado exitosamente",
    "data": { "id": 1, "name": "Nuevo Nombre", "address": "Nueva Dirección", "category": "Nueva Categoría" }
  }
  ```

### Eliminación de Restaurante (`DELETE /restaurants/{id}`):
- Acceso: usuarios autenticados
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Restaurante eliminado exitosamente"
  }
  ```

### Listar Reseñas de un Restaurante (`GET /restaurants/{id}/reviews`):
- Acceso: público
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Lista de reseñas para el restaurante",
    "data": [
      { "id": 1, "userId": 2, "restaurantId": 1, "score": 4, "title": "Muy Bueno", "description": "Gran ambiente y comida deliciosa." },
      { "id": 2, "userId": 3, "restaurantId": 1, "score": 5, "title": "Excelente", "description": "Una experiencia inolvidable." }
      // ... más reseñas
    ]
  }
  ```

### Añadir Reseña a Restaurante (`POST /restaurants/{id}/reviews`):
- Acceso: usuarios autenticados
- Body:
  - `score` (integer, 1-5)
  - `title` (string)
  - `description` (string)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Reseña añadida exitosamente",
    "data": { "id": 1, "userId": 1, "restaurantId": 1, "score": 5, "title": "Excelente", "description": "La mejor experiencia" }
  }
  ```

### Actualizar Reseña (`PATCH /reviews/{id}`):
- Acceso: usuarios autenticados y autorizados
  - El usuario con rol "user" solo puede editar una reseña que pertenezca a su usuario.
  - El usuario con rol "admin" puede editar cualquier reseña.
- Body:
  - `score` (integer, 1-5, opcional)
  - `title` (string, opcional)
  - `description` (string, opcional)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Reseña actualizada exitosamente",
    "data": { "id": 1, "userId": 1, "restaurantId": 1, "score": 4, "title": "Muy Bueno", "description": "Excelente comida" }
  }
  ```

### Eliminar Reseña (`DELETE /reviews/{id}`):
- Acceso: usuarios autenticados y autorizados
  - El usuario con rol "user" solo puede eliminar una reseña que pertenezca a su usuario.
  - El usuario con rol "admin" puede eliminar cualquier reseña.
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Reseña eliminada exitosamente"
  }
  ```

### Listar Usuarios (`GET /users`):
- Acceso: usuarios autenticados y autorizados
  - Solo usuarios con rol "admin" pueden acceder.
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Lista de usuarios",
    "data": [
      { "id": 1, "username": "user1", "role": "user" },
      { "id": 2, "username": "user2", "role": "admin" }
      // ... más usuarios
    ]
  }
  ```

### Actualizar Usuario (`PATCH /users/{id}`):
- Acceso: usuarios autenticados y autorizados
  - Solo usuarios con rol "admin" pueden acceder.
- Body:
  - `username` (string, opcional)
  - `password` (string, opcional)
  - `role` (string, opcional)
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Usuario actualizado exitosamente",
    "data": { "id": 1, "username": "updatedUser", "role": "editor" }
  }
  ```

### Eliminar Usuario (`DELETE /users/{id}`):
- Acceso: usuarios autenticados y autorizados
  - Solo usuarios con rol "admin" pueden acceder.
- Respuesta Exitosa:
  ```json
  {
    "ok": true,
    "message": "Usuario eliminado exitosamente"
  }
  ```

## Mensajes de error

Los mensajes de error deben mantener una estructura estándar en todos los endpoints y utilizar códigos de estatus adecuados como 400, 401, 403 o 500.

```json
{
  "ok": false,
  "message": "Mensaje de error",
  "details": {
    // detalles del error
  }
}
```

## Features técnicos

- Implementada con `Express.js` y `TypeScript`.
- Uso de arquitectura de 3 capas.
- Organización de la API utilizando rutas y routers modulares.
- Implementación de middlewares para autenticación y autorización basada en roles.
- Uso de autenticación basada en sesiones o tokens (decisión del equipo).
- Validación datos de entrada con `Zod`.
- Uso `PostgreSQL` para la persistencia de datos.
- Interación con la base de datos utilizando la librería `pg`.

