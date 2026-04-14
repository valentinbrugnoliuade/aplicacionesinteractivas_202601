# CréditosApp — Frontend

Interfaz de usuario para el TPO de Aplicaciones Interactivas (UADE 2026).

## Stack
- **React 18** + Vite
- **React Router v6** — navegación con rutas protegidas
- **Redux Toolkit** — manejo de estado global (auth, clientes, créditos, cobranzas)

## Estructura

```
src/
├── main.jsx                  # Entry point con <Provider>
├── App.jsx                   # BrowserRouter + Routes + ProtectedRoute
├── index.css                 # Variables CSS globales y reset
├── store/
│   ├── store.js              # configureStore
│   └── slices/
│       ├── authSlice.js      # login / register / logout (JWT)
│       ├── clientesSlice.js  # CRUD clientes
│       ├── creditosSlice.js  # CRUD créditos
│       └── cobranzasSlice.js # CRUD cobranzas
├── services/
│   ├── api.js                # fetch base con inyección de JWT
│   ├── authService.js
│   ├── clientesService.js
│   ├── creditosService.js
│   └── cobranzasService.js
├── components/
│   ├── layout/
│   │   ├── Layout.jsx        # Sidebar + <Outlet>
│   │   └── Layout.module.css
│   └── ui/
│       ├── UI.jsx            # PageHeader, Card, Table, Badge, Alert, Btn, etc.
│       └── UI.module.css
└── pages/
    ├── LoginPage.jsx         # Login + Register
    ├── DashboardPage.jsx
    ├── ClientesPage.jsx
    ├── CreditosPage.jsx
    ├── CobranzasPage.jsx
    └── Pages.module.css
```

## Setup

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo (proxy a localhost:8080)
npm run dev

# Build producción
npm run build
```

> El backend debe estar corriendo en `http://localhost:8080`.  
> El proxy en `vite.config.js` redirige `/api` → `http://localhost:8080/api`.

## Flujo de autenticación

1. El usuario hace login → el backend devuelve un JWT.
2. El token se guarda en `localStorage` y en el store Redux.
3. Todas las llamadas a la API inyectan el header `Authorization: Bearer <token>`.
4. Las rutas privadas verifican `state.auth.token`; si no existe redirigen a `/login`.

## Endpoints consumidos

| Slice | Método | Endpoint |
|-------|--------|----------|
| auth | POST | `/api/auth/login` |
| auth | POST | `/api/auth/register` |
| clientes | POST | `/api/clientes` |
| clientes | GET | `/api/clientes` |
| clientes | GET | `/api/clientes/:dni` |
| creditos | POST | `/api/creditos` |
| creditos | GET | `/api/creditos/:id` |
| creditos | GET | `/api/creditos/cliente/:dni` |
| cobranzas | POST | `/api/cobranzas` |
| cobranzas | GET | `/api/cobranzas/credito/:idCredito` |
