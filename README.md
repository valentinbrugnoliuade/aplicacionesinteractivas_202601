# TPO UADE 2026 — Full Stack

Backend Spring Boot + Frontend React, listos para correr en VS Code.

---

## Requisitos previos

Instalá estas herramientas si no las tenés:

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|----------|
| Java JDK | 17 | https://adoptium.net |
| Maven | 3.8 | https://maven.apache.org (o usar el wrapper incluido) |
| Node.js | 18 | https://nodejs.org |
| VS Code | cualquiera | https://code.visualstudio.com |

**Extensiones de VS Code recomendadas:**
- Extension Pack for Java (Microsoft)
- Spring Boot Extension Pack (VMware)
- ES7+ React/Redux/React-Native snippets

---

## Opción A — Correr desde VS Code (recomendado)

1. Abrí VS Code
2. `File → Open Workspace from File...`
3. Seleccioná el archivo **`tpo-uade.code-workspace`**
4. En el panel **Run & Debug** (`Ctrl+Shift+D`), seleccioná **Full Stack** y presioná ▶️

Eso levanta el backend y el frontend al mismo tiempo.

---

## Opción B — Correr desde la terminal

Abrí **dos terminales** en la raíz del proyecto:

**Terminal 1 — Backend:**
```bash
cd backend
./mvnw spring-boot:run
```
> En Windows: `mvnw.cmd spring-boot:run`

El backend queda en: http://localhost:8080

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

El frontend queda en: http://localhost:5173

---

## Usar la app

1. Abrí http://localhost:5173
2. Hacé click en **Registrate** y creá un usuario
3. Iniciá sesión
4. Listo — podés crear clientes, créditos y registrar cobranzas

**Consola H2** (base de datos en memoria):
http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:tpdb`
- User: `sa` / Password: *(vacío)*

---

## Estructura del proyecto

```
tpo-uade/
├── tpo-uade.code-workspace   ← abrí este en VS Code
├── backend/                  ← Spring Boot + H2 + JWT
│   ├── src/
│   ├── pom.xml
│   └── .vscode/launch.json
├── frontend/                 ← React + Redux Toolkit + React Router
│   ├── src/
│   ├── package.json
│   └── vite.config.js        ← proxy /api → localhost:8080
└── README.md
```

---

> **Nota:** La base de datos es H2 en memoria. Los datos se pierden al reiniciar el backend — esto es normal para desarrollo.

---

## Módulo implementado — Sistema de comentarios

### Descripción

El módulo permite registrar comentarios asociados a las entidades principales del sistema: clientes, créditos y cobranzas.

Cada comentario almacena:
- el texto del comentario
- el tipo de entidad al que pertenece (cliente, crédito o cobranza)
- la referencia a esa entidad
- el usuario autenticado que lo creó
- la fecha y hora de creación (asignada automáticamente)

Todos los endpoints requieren autenticación mediante JWT.

---

### Modelo de datos

**Entidad: `Comentario`**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Long | Identificador único (auto-generado) |
| `contenido` | String (max 1000) | Texto del comentario |
| `tipoEntidad` | Enum | `CLIENTE`, `CREDITO` o `COBRANZA` |
| `fechaCreacion` | LocalDateTime | Fecha y hora de creación (automática) |
| `usuario` | Usuario | Usuario que creó el comentario (FK) |
| `cliente` | Cliente | Cliente asociado — presente si `tipoEntidad = CLIENTE` (FK nullable) |
| `credito` | Credito | Crédito asociado — presente si `tipoEntidad = CREDITO` (FK nullable) |
| `cobranza` | Cobranza | Cobranza asociada — presente si `tipoEntidad = COBRANZA` (FK nullable) |

**Relaciones**

```
Usuario     ──< Comentario >── Cliente
                    │
                    ├────────── Credito
                    │
                    └────────── Cobranza
```

Un comentario pertenece a exactamente un usuario y a exactamente una de las tres entidades de negocio. Las dos FK restantes quedan en null.

---

### Endpoints implementados

Base URL: `http://localhost:8080/api/comentarios`

Todos los endpoints requieren el header:
```
Authorization: Bearer <token>
```

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/comentarios` | Crear un comentario | Requerida |
| `GET` | `/api/comentarios` | Listar todos los comentarios | Requerida |
| `GET` | `/api/comentarios/{id}` | Obtener un comentario por ID | Requerida |
| `PUT` | `/api/comentarios/{id}` | Actualizar un comentario | Requerida |
| `DELETE` | `/api/comentarios/{id}` | Eliminar un comentario | Requerida |
| `GET` | `/api/comentarios/cliente/{dni}` | Listar comentarios de un cliente | Requerida |
| `GET` | `/api/comentarios/credito/{idCredito}` | Listar comentarios de un crédito | Requerida |
| `GET` | `/api/comentarios/cobranza/{idCobranza}` | Listar comentarios de una cobranza | Requerida |

---

#### Ejemplos de request / response

**POST `/api/comentarios`** — Crear comentario sobre un cliente
```json
{
  "contenido": "Cliente con buen historial de pagos.",
  "tipoEntidad": "CLIENTE",
  "dniCliente": "12345678"
}
```

**POST `/api/comentarios`** — Crear comentario sobre un crédito
```json
{
  "contenido": "Crédito aprobado con condiciones especiales.",
  "tipoEntidad": "CREDITO",
  "idCredito": 3
}
```

**POST `/api/comentarios`** — Crear comentario sobre una cobranza
```json
{
  "contenido": "Cobranza recibida fuera de término.",
  "tipoEntidad": "COBRANZA",
  "idCobranza": 7
}
```

**Respuesta exitosa (201 Created)**
```json
{
  "id": 1,
  "tipoEntidad": "CLIENTE",
  "contenido": "Cliente con buen historial de pagos.",
  "fechaCreacion": "2026-04-14T10:30:00",
  "nombreUsuario": "juan",
  "dniCliente": "12345678",
  "idCredito": null,
  "idCobranza": null
}
```

**Respuesta de error — entidad no encontrada (404)**
```json
{
  "status": 404,
  "error": "Recurso no encontrado",
  "mensajes": ["Cliente no encontrado con dni: '99999999'"],
  "timestamp": "2026-04-14T10:30:00"
}
```

**Respuesta de error — validación incorrecta (400)**
```json
{
  "status": 400,
  "error": "Error de negocio",
  "mensajes": ["Para tipoEntidad CLIENTE debe informar dniCliente."],
  "timestamp": "2026-04-14T10:30:00"
}
```
