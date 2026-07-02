<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tarima-project-rules -->
# Reglas permanentes del proyecto Tarima

Estas reglas aplican a TODA página nueva, sin excepción. Revisar antes de dar por terminada cualquier pantalla.

## Experiencia tipo app nativa (no negociable)
- Ya está resuelto a nivel global en `src/app/layout.tsx` (export `viewport`) y `src/app/globals.css`
  (`input, select, textarea, button { font-size: 16px }` + `overscroll-behavior-y: none` + `touch-action: manipulation`).
  Esto cubre automáticamente cualquier página nueva — NO hay que repetirlo por página.
- Al agregar un campo de texto nuevo, NUNCA bajarle el `font-size` por debajo de 16px — eso es lo que dispara
  el zoom automático de iOS. Si un diseño "pide" texto más chico, usar `transform: scale()` en vez de `font-size`.
- La página no debe moverse/descuadrarse ni hacer zoom involuntario al enfocar un campo. Si algo lo hace, es bug.

## Zonas identificables
- Cada sección visual de una pantalla compleja (perfil de banda, admin de banda, admin general) debe tener un
  comentario `/** ZONA: NOMBRE */` arriba del componente que la construye, para poder referenciarla rápido
  en conversación ("cambia la zona de reseñas") sin ambigüedad.

## Roles y accesos
- `user`: puede reservar y dejar reseñas, solo si tiene sesión.
- `band_admin`: administra su propia banda en `/mi-banda` (mobile-first).
- `super_admin`: administra todo desde `/admin/*` (desktop-first).
- El nombre de la banda NUNCA se edita desde `/mi-banda` una vez aprobada — solo soporte lo puede cambiar
  (evita que una banda aprobada por su historial cambie de identidad sin verificación).

## Verificación obligatoria antes de dar algo por terminado
`npx tsc --noEmit` → `npx eslint src --ext .ts,.tsx` → `npm run build` → levantar `next start` y probar con
`curl` las rutas tocadas. Nunca marcar una tarea como lista sin correr los cuatro pasos.
<!-- END:tarima-project-rules -->
