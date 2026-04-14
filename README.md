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
