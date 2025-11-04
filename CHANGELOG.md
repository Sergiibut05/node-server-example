# Changelog

## v0.5.0 - Módulo Auth (registro/login)

### Añadido
- Módulo de autenticación completo
- Registro de usuarios con hash de contraseñas (bcrypt)
- Login con verificación de contraseñas
- Generación de JWT con expiración de 7 días
- Auth service con manejo de errores específicos
- Auth controller con validación Zod integrada
- Rutas de autenticación

### Endpoints nuevos
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login y generación de JWT

### Seguridad implementada
- Hash de contraseñas con bcrypt (10 rounds por defecto)
- JWT firmado con secret desde variables de entorno
- Payload JWT: sub (user id), email, iat, exp
- Validación de datos de entrada con Zod
- Mensajes de error genéricos para seguridad

### Manejo de errores
- Email duplicado (409 Conflict)
- Credenciales inválidas (401 Unauthorized)
- Validación de entrada (400 Bad Request)

### Archivos principales
- `src/modules/auth/auth.service.ts` - Lógica de negocio
- `src/modules/auth/auth.controller.ts` - Controladores HTTP
- `src/modules/auth/auth.routes.ts` - Rutas de auth

### Flujo de autenticación
1. Usuario se registra con email, name, password
2. Sistema valida datos con Zod
3. Sistema hashea contraseña con bcrypt
4. Sistema crea usuario en base de datos
5. Sistema genera JWT
6. Usuario recibe token para autenticar futuras peticiones

---

## v0.4.0 - Validación con Zod

### Añadido
- Middleware genérico de validación con Zod
- Esquemas de validación para users (register, login, update)
- Types de TypeScript generados desde esquemas Zod
- CRUD completo de usuarios con validación
- Controladores de users con manejo de errores de Prisma
- Rutas de users: GET, PATCH, DELETE
- Documentación de ejemplos de API

### Endpoints nuevos
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PATCH /api/users/:id` - Actualizar usuario (con validación)
- `DELETE /api/users/:id` - Eliminar usuario

### Validación implementada
- Email válido
- Nombre mínimo 2 caracteres
- Password mínimo 8 caracteres
- Mensajes de error en español

### Archivos principales
- `src/middleware/validate.ts` - Middleware genérico
- `src/modules/users/users.schema.ts` - Esquemas Zod
- `src/modules/users/users.service.ts` - Lógica de negocio
- `src/modules/users/users.controller.ts` - Controladores
- `src/modules/users/users.routes.ts` - Rutas
- `docs/API_EXAMPLES.md` - Ejemplos de uso

---

## v0.3.0 - PostgreSQL + Docker con Prisma

### Añadido
- `docker-compose.yml` con PostgreSQL 16
- Prisma ORM configurado
- Modelo `User` en schema de Prisma
- Cliente Prisma en `src/config/db.ts`
- Migración inicial creada
- Tabla `User` en base de datos

### Comandos útiles

**Levantar base de datos:**
```bash
docker-compose up -d
```

**Ver logs de PostgreSQL:**
```bash
docker-compose logs -f postgres
```

**Parar base de datos:**
```bash
docker-compose down
```

**Crear nueva migración:**
```bash
npx prisma migrate dev --name nombre_migracion
```

**Ver base de datos con Prisma Studio:**
```bash
npx prisma studio
```

**Regenerar cliente Prisma:**
```bash
npx prisma generate
```

### Estructura de base de datos

**Tabla User:**
- `id` (INT, PK, autoincrement)
- `email` (TEXT, unique)
- `name` (TEXT)
- `passwordHash` (TEXT)
- `createdAt` (TIMESTAMP)

---

## v0.2.0 - Express básico

### Añadido
- Servidor Express configurado
- Variables de entorno con validación
- Middlewares: helmet, cors, morgan
- Endpoint `/health`
- Manejo global de errores

---

## v0.1.0 - Proyecto base

### Añadido
- Inicialización de proyecto npm
- Configuración TypeScript
- Estructura de carpetas modular
- Scripts de desarrollo y build
- Configuración de nodemon

