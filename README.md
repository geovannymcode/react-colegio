# PROYÉCTATE — Frontend

PWA en React para el ciclo planificar → ejecutar → evaluar → mejorar de metas
estudiantiles. Specs completas en `Downloads/01-SPEC.md`, `06-DESIGN-SYSTEM.md`,
`05-PWA-PUSH.md` y `07-FIGMA-EXTRACT.md`.

Este repo es **solo frontend**. El backend (NestJS + Prisma + PostgreSQL) se
desarrolla en otro proyecto.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router v7 · TanStack
Query (con persistencia offline en IndexedDB) · Zustand · react-hook-form + zod
· vite-plugin-pwa (`injectManifest`) · lucide-react

## Desarrollo

```bash
npm install
cp .env.example .env   # define VITE_API_URL y VITE_VAPID_PUBLIC_KEY
npm run dev
```

Requiere el backend corriendo en `VITE_API_URL` (por defecto `http://localhost:3000`).

## Contrato de API

El backend expone OpenAPI en `/api-json`. Para regenerar los tipos después de
un cambio de contrato:

```bash
curl -s http://localhost:3000/api-json > openapi.json
npx openapi-typescript openapi.json -o src/lib/api-types.ts
```

Los DTOs de request (`CreateGoalDto`, `UpdateTaskDto`, etc.) se importan desde
`src/lib/api-types.ts` en cada `src/features/*/api.ts`. El contrato no
documenta las formas de respuesta (el backend no anota `@ApiOkResponse`), así
que esas quedan tipadas a mano en `src/types/domain.ts` a partir de inspección
directa de las respuestas reales.

## Sesión

Login real contra `/auth/login` y `/auth/register`. El cliente HTTP
(`src/lib/api-client.ts`) inyecta `Authorization: Bearer <accessToken>`, y ante
un 401 intenta `POST /auth/refresh` una sola vez (varias peticiones en 401
simultáneo comparten el mismo refresh en vuelo); si el refresh también falla,
limpia la sesión y `RequireAuth` redirige a la pantalla de bienvenida.

Usuario semilla para pruebas: `matias@colegio.edu.co` / `proyectate123`.

## Pendiente conocido

- Editar una meta existente: no hay pantalla de edición en las 11 pantallas de
  Figma; hoy solo se puede crear, ver detalle y eliminar.
- El "Hoy" del Inicio (tareas por vencer entre todas las metas) se quitó: el
  backend no expone tareas en `GET /goals` (solo agregados por meta), y no hay
  endpoint de tareas cruzado entre metas. Se puede reconstruir con N+1 a
  `GET /goals/:id` si hace falta, pero no se hizo para no meter ese costo sin
  pedirlo.
- Reordenar tareas (`PATCH /goals/:goalId/tasks/reorder`) y borrar una tarea
  suelta (`DELETE /tasks/:id`) existen en el backend pero no tienen UI todavía.
- Code-splitting del bundle (warning de Vite por tamaño, no bloqueante para v1).
