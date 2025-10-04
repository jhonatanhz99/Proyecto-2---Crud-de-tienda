## Documentación de archivos

Este documento describe la estructura del proyecto, el propósito de cada archivo y carpeta dentro de las carpetas `BACKEND` y `frontend`, las variables de entorno necesarias y cómo arrancar cada parte. Está escrito en español.

---

## Resumen rápido

- Backend: carpeta `BACKEND` contiene un servidor Express que expone rutas REST para clientes, productos, ventas, inventario, pagos, proveedores, vendedores, comisiones, crédito, autenticación y recuperación de contraseña. Utiliza MySQL via `mysql2/promise`.
- Frontend: carpeta `frontend` es una aplicación React (Create React App) con páginas para `Clientes`, `Productos`, `Inventario`, `Ventas`, `Proveedores`, `Usuarios`, `Reportes` y un `Login`.

---

## Variables de entorno (esperadas)

Las variables que aparecen en el código o por convención:

- `DB_HOST` - host de la base de datos MySQL
- `DB_USER` - usuario de la base de datos
- `DB_PASS` - contraseña de la base de datos
- `DB_NAME` - nombre de la base de datos
- `DB_PORT` - puerto de la base de datos (por ejemplo, 3306)
- `PORT` - puerto para levantar el servidor backend (por defecto 3000 si no existe)
- `JWT_SECRET` - (probable) secreto para firmar JWT en autenticación (buscar en `authController`/`authRoutes`)
- Variables para el envío de correos (si se usan en `recover`): SMTP host/port/user/pass (revisar `nodemailer` configuración en código)

Coloca estas variables en el archivo `.env` dentro de `BACKEND`.

---

## Cómo arrancar

1) Backend

```bash
cd BACKEND
npm install
npm start
```

Esto ejecuta `node server.js` según el `package.json` del backend.

2) Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## Archivos y carpetas (descripción detallada)

Raíz del proyecto:

- `package.json` (raíz): manifiesto principal del proyecto; la mayoría de la lógica del servidor está dentro de `BACKEND` y la UI en `frontend`.
- `README.md` (raíz): información general del repositorio (revisar y complementar si es necesario).

### Carpeta `BACKEND`

- `.env`: archivo de variables de entorno (no incluido en el repo, pero se usa con `dotenv`).
- `index.js`:
  - Contiene una ruta mínima: `app.get('/', ...)` que responde con `Backend en funcionamiento ✅`.
  - Es útil como sanity-check/health endpoint.
- `server.js`:
  - Punto de entrada principal del servidor Express.
  - Configura middlewares globales: `cors`, `express.json()` y sirve archivos estáticos en `/login-frontend`.
  - Registra las rutas montando cada `routes/*.js` bajo prefijos como `/api/clientes`, `/api/productos`, `/api/ventas`, etc.
  - Lee `process.env.PORT` o usa `3000` por defecto.

#### `config/`

- `db.js`:
  - Crea un pool de conexiones MySQL usando `mysql2/promise` y variables de entorno (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT`).
  - Exporta el pool para que los modelos/controladores lo usen.

#### `controllers/`
Cada archivo de esta carpeta contiene la lógica para manejar peticiones relacionadas con su recurso.

- `authController.js` - lógica de autenticación: login, verificación de credenciales, generación de token JWT.
- `clientes.controller.js` - operaciones CRUD y consultas para clientes.
- `comisiones.controller.js` - maneja comisiones (cálculo, listado, CRUD relacionado con vendedores/ventas).
- `credito.controller.js` - acciones sobre la entidad crédito (préstamos/financiación vinculada a ventas o clientes).
- `detalle_ventas.controller.js` - administra los detalles de cada venta (líneas de pedido: producto, cantidad, precio).
- `inventario.controller.js` - operaciones sobre inventario: existencias, movimientos, ajustes.
- `pagos.controller.js` - registrar y consultar pagos vinculados a ventas o créditos.
- `productos.controller.js` - CRUD y búsquedas sobre productos.
- `proveedores.controller.js` - CRUD y operaciones sobre proveedores.
- `usuarioController.js` - gestión de usuarios (posiblemente admins): creación, listado, roles.
- `vendedores.controller.js` - lógica para vendedores (asignación de comisiones, ventas asociadas).
- `ventas.controller.js` - crea/consulta ventas, totalización, estado de la venta.

> Nota: revisar cada archivo para confirmar nombres de funciones exportadas y las rutas que los consumen (se indican en `routes/`).

#### `middleware/`

- Carpeta para middlewares personalizados (autenticación, autorización, validaciones, manejo de errores). Si está vacía, es buen lugar para agregar `authMiddleware` que verifique JWT.

#### `models/`

Modelos que contienen funciones que ejecutan consultas SQL usando el pool de `config/db.js`.

- `clientes.model.js` - consultas SQL para clientes (INSERT, SELECT, UPDATE, DELETE).
- `comisiones.model.js` - consultas relacionadas con comisiones.
- `credito.model.js` - consultas del módulo crédito.
- `detalle_ventas.model.js` - consultas para las líneas de ventas.
- `inventario.model.js` - consultas de inventario y movimientos.
- `pagos.model.js` - persistencia de pagos.
- `productos.model.js` - operaciones en la tabla productos.
- `proveedores.model.js` - operaciones sobre proveedores.
- `usuario.js` - (posiblemente) modelo/consultas para usuarios (nombres inconsistente: mira `usuarioController.js`).
- `vendedores.model.js` - queries sobre vendedores.
- `ventas.model.js` - queries sobre ventas y resumen por venta.

#### `public/`

- Carpeta para archivos estáticos del backend. El `server.js` sirve `login-frontend` desde un path estático; revisa si `login-frontend` es una carpeta dentro de `BACKEND/public` o en la raíz del backend.

#### `routes/`

- `administradores.routes.js` - rutas relacionadas con administradores.
- `authRoutes.js` - ruta de autenticación (login). Montada en `/api`.
- `clientes.routes.js` - rutas REST para clientes, montada en `/api/clientes`.
- `comisiones.routes.js` - rutas para comisiones.
- `credito.routes.js` - rutas para crédito.
- `detalle_ventas.routes.js` - rutas para detalle de ventas.
- `inventario.routes.js` - rutas de inventario.
- `pagos.routes.js` - rutas para registrar y consultar pagos.
- `productos.routes.js` - rutas para productos.
- `proveedores.routes.js` - rutas para proveedores.
- `recover.routes.js` - rutas para recuperación de contraseña (probablemente usa `nodemailer`).
- `register.routes.js` - rutas para registro de nuevos usuarios, montada en `/api/register`.
- `usuario.routes.js` - rutas para gestión de usuarios.
- `vendedores.routes.js` - rutas para vendedores.
- `ventas.routes.js` - rutas para ventas.

### Carpeta `frontend`

- `.env` - variables de entorno del frontend (por ejemplo `REACT_APP_API_URL` si se usa). Revisar para configurar la URL del backend.
- `.gitignore` - reglas de git.
- `package.json` - dependencias y scripts del frontend (probablemente creado con Create React App).
- `README.md` - documentación específica del frontend.

`public/` contiene archivos estáticos de la app React (HTML y assets):

- `index.html`, íconos y `manifest.json`.

`src/` contiene el código React:

- `index.js` - punto de entrada React (renderiza `<App />`).
- `App.js` - componente raíz que normalmente contiene rutas del lado cliente (React Router) y layout general.
- `App.css`, `index.css` - estilos globales.
- `App.test.js`, `setupTests.js` - tests y configuración de testing (jest/react-testing-library).
- `reportWebVitals.js` - métrica de rendimiento (opcional).
- `logo.svg` - asset.

`src/components/`:

- `Login.js` - componente de formulario de inicio de sesión.
- `Sidebar.js` - componente de navegación lateral que probablemente contiene links a páginas principales del dashboard.

`src/context/`:

- `AuthContext.js` - Context API para mantener estado de autenticación en la app (usuario, token, funciones de login/logout).

`src/pages/`:

- `Clientes.js` - página para gestionar clientes (listado, crear, editar).
- `Dashboard.js` - vista principal con métricas/resumen.
- `Inventario.js` - página de inventario.
- `Productos.js` - lista/gestión de productos.
- `Proveedores.js` - gestión de proveedores.
- `Reportes.js` - generación de reportes (ventas, inventario, comisiones).
- `Usuarios.js` - gestión de usuarios.
- `Ventas.js` - página para registrar y listar ventas.

---

## Recomendaciones para documentación adicional e inmediata (opcional, puedo hacerlo por ti):

1. Añadir cabeceras JSDoc en cada archivo JS con un breve `@file` y `@module` y descripción de funciones exportadas.
   - Ejemplo (encabezado de `controllers/clientes.controller.js`):

```js
/**
 * @file clientes.controller.js
 * @description Controlador para manejar operaciones CRUD sobre clientes.
 * Exporta funciones: getClientes, getClienteById, crearCliente, actualizarCliente, borrarCliente.
 */
```

2. Añadir `README.md` dentro de `BACKEND` que explique flujo de autenticación, rutas principales, formato de tokens, y esquema de la base de datos esperado.
3. Añadir un archivo `API_DOC.md` o usar Swagger/OpenAPI para documentar endpoints, parámetros y respuestas.
4. Añadir un `CONTRIBUTING.md` y reglas de linting/estilo si el proyecto crecerá.

---

## ¿Quieres que haga esto por ti ahora?

Puedo:

- Generar automáticamente cabeceras JSDoc en todos los archivos `.js` del `BACKEND` y `frontend` (modificando los archivos) — esto añade comentarios arriba de cada archivo con la descripción y las funciones exportadas.
- Crear `BACKEND/README.md` y `BACKEND/API_DOC.md` con ejemplos de requests para los endpoints más importantes.

Dime si prefieres que agregue JSDoc inline a los archivos (puede implicar muchos cambios) o que genere documentación externa (archivos `README`/`API_DOC`) — te recomiendo empezar por los README para no modificar el código fuente hasta validar el contenido.

---

Fin de la documentación generada automáticamente.
