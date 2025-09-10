
# Turismo Mundial AO — Roadmap Técnico & Arquitectura (Firebase-first)

> **Objetivo**: Documento _listo para construir_ (AI-friendly) para desarrollar el MVP y escalar.  
> **Stack base asumido**: Firebase (Auth, Firestore, Storage, Functions, Hosting, FCM), BigQuery export, Cloud Tasks, Cloud Scheduler, Firebase Extensions (opcional: Algolia Search), PWA (Next.js/React).

---

## 0) Visión técnica

- **Monorepo** con `web` (Next.js PWA), `functions` (Cloud Functions TS + Express), `admin` (panel), `shared` (tipos/SDK).
- **API-first**: endpoints versionados en Functions HTTPS + triggers de Firestore.
- **Seguridad**: Firebase Auth + Custom Claims (roles: `citizen`, `business`, `admin`, `moderator`).
- **Datos**: Firestore (OLTP) + BigQuery (OLAP) para tableros públicos.
- **Media**: Storage (imágenes, certificados) + reglas finas.
- **Mensajería**: FCM (push) + (opcional) WhatsApp/SMS vía Twilio.
- **Mapas**: tiles OSM/Mapbox; capas de seguridad cargadas desde Firestore/Storage (GeoJSON).
- **i18n**: ES/EN/PT con fallback ES (namespace JSON por módulo).
- **Accesibilidad**: WCAG 2.2 AA; performance PWA (Lighthouse > 90).

---

## 1) Módulos (Experiencias UX → Servicios)

### A) **Trabaja** (Empleabilidad)
- Buscador y postulación a vacantes, directorio de proveedores.
- Verificación de perfil (licencias, DC-3) y reputación básica.

### B) **Aprende** (Certificaciones — AO proveedor + aliados)
- Cursos AO (gratuitos/patrocinados) + SSO/links profundos a plataformas hermanas.
- Registro de constancias y badges en el expediente del usuario.

### C) **Descubre** (Paquetes, gastronomía, artesanías)
- Marketplace de experiencias/paquetes, listado de comercios y artesanos.

### D) **Explora Seguro** (Rutas + capas de seguridad)
- Rutas temáticas con puntos de apoyo (C5/cuadrantes) y botón de auxilio.

### E) **Eventos**
- Agenda cultural filtrable y shareable.

### F) **Impacto AO**
- Tablero público (empleo, turismo, certificación).

---

## 2) Arquitectura de alto nivel (Mermaid)

```mermaid
flowchart LR
  subgraph Client[Web/App PWA (Next.js)]
    UI[UI ES/EN/PT] --> SDK(Firebase SDK)
    UI --> Map(Maps + GeoJSON)
  end

  SDK --> AUTH[Firebase Auth + Custom Claims]
  SDK --> FS[Cloud Firestore]
  SDK --> STG[Cloud Storage]
  SDK --> API[Cloud Functions HTTPS/Express]
  API --> TASKS[Cloud Tasks/Scheduler]
  FS <--> TRIG[Cloud Functions Triggers]
  FS --> BQ[(BigQuery Export)]
  STG --> CDN[(CDN/Hosting)]

  subgraph Integrations
    ALG[(Algolia Ext)] -.optional.-> FS
    TWL[Twilio/WhatsApp] -.optional.-> API
    MAP[OSM/Mapbox] -.tiles.-> Client
  end
```

---

## 3) Modelo de datos (Firestore — colecciones principales)

> **Convención**: `snake_case` en campos, timestamps con `created_at`, `updated_at` (serverTimestamp).  
> **Reglas generales**: escritura sensible sólo por dueño/rol; campos de verificación **sólo** por `admin/moderator`.

### 3.1 Autenticación & perfiles
- `users/{uid}`
  - `role`: `"citizen" | "business" | "admin" | "moderator"`
  - `display_name`, `email`, `phone`, `lang`: `"es" | "en" | "pt"`
  - `geo`: `{ country, state, city, colonia }`
  - `verified_flags`: `{ id_doc: bool, license: bool, dc3: bool }`
  - `badges`: string[]
  - `stats`: `{ applications: number, hires: number }`

- `profiles/{uid}` (detalle extendido ciudadano)
  - `skills`: string[]
  - `licenses`: [{ `type`, `number`, `expiration_at` }]
  - `certificates`: [{ `issuer`, `type`, `folio`, `expires_at`, `source`: "AO"|"ALLY"|"UPLOAD" }]
  - `languages`: [{ code: "es"|"en"|"pt", level: "A2|B1|B2|C1|C2" }]

- `business/{biz_id}`
  - `owner_uid`, `name`, `tax_id` (opcional), `category`
  - `verified`: bool, `rating_avg`, `rating_count`

### 3.2 Empleo
- `jobs/{job_id}`
  - `biz_id`, `title`, `description`, `location`, `requirements`
  - `min_reqs`: `{ license?:bool, dc3?:bool, lang?:string }`
  - `status`: `"draft"|"active"|"closed"`
  - `slots`: number, `pay_range`: `{ min,max,currency }`

- `applications/{app_id}`
  - `job_id`, `candidate_uid`, `status`: `"applied"|"shortlist"|"hired"|"rejected"`
  - `notes`, `events`: [ { `type`, `at`, `by` } ]

### 3.3 Certificaciones (AO + aliados)
- `courses/{course_id}`
  - `provider`: `"AO"|"ALLY"`, `title`, `modality`: `"online"|"presencial"`
  - `venue?`, `external_url?`, `requires_signup`: bool, `price?`

- `enrollments/{enr_id}`
  - `course_id`, `uid`, `status`: `"active"|"completed"`
  - `issued_certificate_id?`

- `certificates/{cert_id}`
  - `uid`, `issuer`: `"AO"|"ALLY"|"UPLOAD"`, `type`, `folio?`, `expires_at?`
  - `file_url` (Storage), `verified_by?`

### 3.4 Turismo / Marketplace
- `packages/{pkg_id}`
  - `owner`: `biz_id|admin_uid`, `title`, `price`, `currency`, `photos`[], `description`
  - `includes`: string[], `duration_hours`, `accessibility_tags`[]
  - `status`: `"draft"|"active"`

- `bookings/{booking_id}`
  - `pkg_id`, `uid`, `status`: `"pending"|"confirmed"|"cancelled"`
  - `party_size`, `schedule_at`

- `merchants/{mrc_id}` (gastronomía/artesanos)
  - `biz_id`, `type`: `"food"|"craft"`, `name`, `photos`[], `address`

### 3.5 Rutas & Seguridad
- `routes/{route_id}`
  - `title`, `theme`: `"gastronomy"|"hiking"|"family"|...`
  - `geojson_url` (Storage), `duration_min`, `accessibility_tags`[]
  - `safety_overlays`: [`quadrants`, `support_points`]

- `safety_points/{sp_id}`
  - `type`: `"c5"|"locatel"|"police"|"hospital"`, `coords`, `hours`

### 3.6 Moderación, Incidentes, Reseñas
- `incidents/{inc_id}`
  - `type`, `reported_by`, `entity_ref`, `status`, `resolution`

- `reviews/{rev_id}`
  - `entity_type`: `"job"|"package"|"merchant"`, `entity_id`
  - `author_uid`, `rating` 1–5, `comment`

### 3.7 Analítica y métricas
- `metrics_daily/{YYYYMMDD}`
  - `jobs_active`, `applications_count`, `hires_count`, `bookings_count`, `routes_views`
- Exportar a **BigQuery** vía Firebase → construir tablero público.

---

## 4) API (Cloud Functions HTTPS — Express, v1)

> Endpoints pensados para AI-generation (`functions/src/api.v1.ts`). Autenticación con `Authorization: Bearer <idToken>` y claims de rol.

### 4.1 Auth & perfiles
- `POST /v1/auth/claim-role` (admin): asigna custom claim a `uid`.
- `GET /v1/me` : datos del usuario + perfil + badges.
- `PUT /v1/me/profile` : actualiza perfil (validaciones server-side).

### 4.2 Empleo
- `POST /v1/jobs` (business/admin): crea vacante.
- `GET /v1/jobs` : lista con filtros `q`, `location`, `reqs`.
- `GET /v1/jobs/:id` : detalle.
- `POST /v1/jobs/:id/apply` (citizen): crea `application`.
- `PATCH /v1/applications/:id` (business/admin): cambia estado.

### 4.3 Certificaciones
- `GET /v1/courses` : catálogo (`provider=AO|ALLY`).
- `POST /v1/courses` (admin): crear curso AO.
- `POST /v1/courses/:id/enroll` (citizen): inscripción.
- `POST /v1/certificates/upload` (citizen): subir constancia (Storage signed URL).
- `POST /v1/certificates/issue` (admin): emite constancia AO.
- `POST /v1/certificates/webhook` (ally): recepción de certificados externos (firma compartida).

### 4.4 Turismo / Marketplace
- `GET /v1/packages` ; `GET /v1/packages/:id`
- `POST /v1/packages` (business/admin)
- `POST /v1/packages/:id/book` (citizen)

### 4.5 Rutas & Seguridad
- `GET /v1/routes` ; `GET /v1/routes/:id`
- `GET /v1/safety/points` : puntos por bounding box
- `POST /v1/incidents` : reporte de incidente

### 4.6 Búsqueda (opcional Algolia)
- `GET /v1/search?q=&type=jobs|packages|routes`

---

## 5) Reglas de seguridad (pseudocódigo)

```js
// Firestore.rules (fragmento conceptual)
match /users/{uid} {
  allow read: if request.auth != null && request.auth.uid == uid;
  allow write: if request.auth != null && request.auth.uid == uid;
}

match /profiles/{uid} {
  allow read: if isOwner(uid) || hasRole(['admin','moderator']);
  allow write: if isOwner(uid);
}

match /jobs/{job_id} {
  allow read: if true;
  allow create,update: if hasRole(['business','admin']);
  allow delete: if hasRole(['admin']);
}

match /certificates/{cert_id} {
  allow read: if isOwner(resource.data.uid) || hasRole(['admin','moderator']);
  allow create: if isOwner(request.resource.data.uid);
  allow update: if hasRole(['admin','moderator']); // verificación o folio
}
```

---

## 6) Estructura de monorepo

```
/turismo-ao
  /apps
    /web           # Next.js PWA (TS, i18n, maps)
    /admin         # Panel interno (Next.js + Admin SDK via API)
  /functions       # Cloud Functions (TS): api.v1.ts, triggers.ts
  /packages
    /shared        # tipos TS, validadores zod, utils i18n
    /ui            # design system (Tailwind/Radix)
  /infra           # scripts de deploy, índices, reglas, seed
```

---

## 7) Esqueletos de código (AI-starters)

### 7.1 Functions (Express v1)

```ts
// functions/src/api.v1.ts
import * as functions from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import { authGuard, roleGuard } from './middleware/auth';

admin.initializeApp();
const app = express();
app.use(express.json());

app.get('/v1/me', authGuard, async (req, res) => {
  const uid = (req as any).uid;
  const userDoc = await admin.firestore().doc(`users/${uid}`).get();
  const profileDoc = await admin.firestore().doc(`profiles/${uid}`).get();
  return res.json({ user: userDoc.data(), profile: profileDoc.data() });
});

app.post('/v1/jobs', authGuard, roleGuard(['business','admin']), async (req, res) => {
  const { title, description, location, min_reqs } = req.body;
  const payload = {
    title, description, location, min_reqs,
    status: 'active', created_at: admin.firestore.FieldValue.serverTimestamp()
  };
  const ref = await admin.firestore().collection('jobs').add(payload);
  res.status(201).json({ id: ref.id });
});

export const api = functions.onRequest({ cors: true }, app);
```

### 7.2 Middleware de Auth

```ts
// functions/src/middleware/auth.ts
import * as admin from 'firebase-admin';
export async function authGuard(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'NO_TOKEN' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    (req as any).uid = decoded.uid;
    (req as any).claims = decoded;
    next();
  } catch(e) { return res.status(401).json({ error: 'BAD_TOKEN' }); }
}

export function roleGuard(roles: string[]) {
  return (req, res, next) => {
    const claims = (req as any).claims || {};
    const ok = roles.some(r => claims[r] === true || claims.role === r);
    if (!ok) return res.status(403).json({ error: 'FORBIDDEN' });
    next();
  }
}
```

### 7.3 Web (Next.js) — i18n y guardas

```ts
// apps/web/src/app/layout.tsx (concepto)
export const metadata = { title: 'Turismo Mundial AO' };
// i18n via next-intl / next-translate
```

---

## 8) Integraciones clave

- **SSO/Identidad**: Firebase Auth (email/password, SMS, OAuth Google/Apple).  
- **Certificados aliados**: Webhooks firmados (`/v1/certificates/webhook`) + `enrollments`.  
- **Algolia (extensión)**: indexar `jobs`, `packages`, `routes` con `onWrite` trigger.  
- **WhatsApp**: Twilio → notificaciones de confirmación reserva/aplicación.  
- **Mapas**: cargar GeoJSON desde Storage para rutas y capas de seguridad.

---

## 9) Analítica & KPIs

- **BigQuery export** habilitado. Jobs: aplicaciones, hires; Turismo: bookings; Certificación: completions.  
- **Scheduler** diario → `metrics_daily/{date}` + export CSV para tablero público.  
- Tablero (Looker Studio/Metabase) embebido en sitio **Impacto AO**.

---

## 10) DevOps & Calidad

- **Entornos**: `dev`, `stg`, `prod` (3 proyectos Firebase).  
- **CI/CD**: GitHub Actions → lint+test → deploy Hosting/Functions/Rules.  
- **Emulators**: Auth/Firestore/Functions/Storage locales.  
- **Testing**: e2e (Playwright) + integración (Functions emulator).  
- **Índices Firestore**: predefinidos en `/infra/firestore.indexes.json`.  
- **Security Reviews**: reglas con unit tests (firestore-rule-tester).

---

## 11) UX de confianza (microcopy + empty states)

- “Sube tu **DC-3** para destacar en empleos de alimentos.”  
- “¿Primera vez? Explora **Paquetes AO** recomendados.”  
- “Activa **Explora Seguro** para ver puntos de apoyo cercanos.”

---

## 12) Roadmap funcional (sin fechas)

1) **MVP Core**: Registro/Perfiles, Empleo (crear/aplicar), Aprende (AO cursos + upload cert), Descubre (paquetes y booking), Explora Seguro (rutas + botón), Eventos, Admin básico.  
2) **V2**: reputación, verificación avanzada, Algolia, WhatsApp, BigQuery tablero público.  
3) **V3**: pagos/escrow, AO Card (descuentos), multialcaldía/CDMX.

---

## 13) Seeds iniciales (fixtures)

- 10 vacantes ejemplo, 5 cursos AO, 5 aliados, 8 paquetes turísticos, 3 rutas (gastronomía/hiking/familia), 20 safety_points (C5/LOCATEL).

---

## 14) Checklist “Listo para Programar” (AI-friendly)

- [ ] Crear proyectos Firebase (`dev/stg/prod`) y llaves CI.  
- [ ] Inicializar monorepo con workspaces y ESLint/Prettier.  
- [ ] Subir reglas Firestore/Storage + índices.  
- [ ] Implementar `api.v1.ts` con rutas arriba.  
- [ ] Crear páginas Next: `/trabaja`, `/aprende`, `/descubre`, `/explora-seguro`, `/eventos`.  
- [ ] Conectar mapas (GeoJSON) y botón de auxilio (enlace 911/LOCATEL).  
- [ ] Panel admin con moderación de `jobs/packages/courses/routes`.  
- [ ] BigQuery export + Job Scheduler métricas.  
- [ ] Script `seed.ts` para fixtures.  
- [ ] Pipeline CI/CD y pruebas e2e mínimas.
