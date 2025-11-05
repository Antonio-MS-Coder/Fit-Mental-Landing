# FitMental App Admin Panel - Guía de Uso

## 📱 Descripción General

El nuevo panel de administración de la aplicación FitMental (`app-admin.html`) permite gestionar todo el contenido de la aplicación móvil nativa, incluyendo meditaciones, programas, playlists y música de fondo.

## 🔗 Acceso al Panel

### Desde el Panel Principal del Curso
1. Inicia sesión en `admin.html`
2. Haz clic en el botón **"📱 Panel App FitMental"** en la parte superior derecha

### Acceso Directo
- URL: `https://tu-dominio.com/app-admin.html`
- Credenciales: Las mismas que usas para el panel del curso

### Desde la Página Principal
- Si eres admin y estás logueado, verás dos botones adicionales en el header:
  - **📚 Curso**: Para administrar el curso presencial
  - **📱 App**: Para administrar la aplicación móvil

## 🎯 Funcionalidades Principales

### 1. Dashboard
Vista general con estadísticas en tiempo real:
- Total de meditaciones
- Programas activos
- Playlists creadas
- Pistas de música de fondo
- Actividad reciente

### 2. Gestión de Meditaciones

#### Crear Nueva Meditación
1. Ve a la sección **"Meditaciones"**
2. Haz clic en **"+ Nueva Meditación"**
3. Completa el formulario:
   - **Título**: Nombre de la meditación
   - **Tipo**: meditation, hypnosis, song, affirmation, lesson
   - **Categoría**: Relajación, Sueño, Ansiedad, etc.
   - **Tipo de Acceso**:
     - `free`: Gratis para todos
     - `premium`: Solo suscriptores
     - `program`: Solo dentro de programas
     - `both`: Premium + Programas
   - **Descripción**: Texto descriptivo (opcional)
   - **Instructor**: Nombre del guía
   - **Idioma**: es/en
   - **Tags**: Palabras clave para búsqueda
   - **Archivo de Audio**: MP3/M4A/WAV (máx. 100MB)
   - **Imagen de Portada**: JPG/PNG/WebP (máx. 5MB)

#### Editar/Eliminar Meditaciones
- Cada tarjeta de meditación tiene botones de **Editar** y **Eliminar**
- Al editar, puedes cambiar cualquier campo incluyendo archivos

#### Buscar y Filtrar
- **Búsqueda por texto**: Título, descripción, instructor
- **Filtro por categoría**: Dropdown con todas las categorías
- **Filtro por tipo**: meditation, hypnosis, song, etc.

### 3. Gestión de Programas

Los programas son cursos estructurados con contenido organizado por días y semanas.

#### Estructura de un Programa
```javascript
{
  title: "Programa de Pérdida de Peso - 90 Días",
  totalDays: 90,
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          contentIds: ["meditation1", "meditation2"],
          isRestDay: false
        }
      ]
    }
  ],
  accessType: "purchase", // free, premium, purchase
  price: 9900 // en centavos ($99.00)
}
```

### 4. Gestión de Playlists

#### Tipos de Playlists
- **Admin Playlists**: Creadas por el equipo de FitMental
- **Featured**: Playlists destacadas en la app
- **User**: Playlists creadas por usuarios (solo lectura)

#### Campos de Playlist
- Título y descripción
- Lista ordenada de meditaciones
- Tipo de acceso (free/premium/purchase)
- Imagen de portada
- Tags para búsqueda

### 5. Música de Fondo

Pistas ambientales que los usuarios pueden reproducir durante las meditaciones.

#### Categorías Disponibles
- Nature (sonidos de naturaleza)
- Ambient (música ambiental)
- Classical (música clásica)

## 🗂️ Estructura en Firebase

### Colecciones Principales

#### `meditaciones`
```javascript
{
  id: string,
  title: string,
  type: "meditation" | "hypnosis" | "song" | "affirmation" | "lesson",
  category: string,
  duration: number, // segundos
  audioURL: string,
  imageURL: string,
  description: string,
  accessType: "free" | "premium" | "program" | "both",
  programIds: string[],
  isPremium: boolean,
  instructor: string,
  tags: string[],
  language: "es" | "en",
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean,
  order: number
}
```

#### `programs`
```javascript
{
  id: string,
  title: string,
  subtitle: string,
  description: string,
  type: "course" | "challenge" | "journey",
  totalDays: number,
  weeks: Array,
  accessType: "free" | "premium" | "purchase",
  price: number,
  coverImageURL: string,
  bannerImageURL: string,
  benefits: string[],
  targetAudience: string,
  difficulty: "beginner" | "intermediate" | "advanced",
  enrolledCount: number,
  rating: number,
  createdAt: timestamp,
  isActive: boolean
}
```

#### `playlists`
```javascript
{
  id: string,
  title: string,
  description: string,
  type: "user" | "admin" | "program",
  creatorId: string,
  contentIds: string[],
  contentCount: number,
  totalDuration: number,
  visibility: "private" | "public" | "premium" | "purchasable",
  accessType: "free" | "subscription" | "purchase",
  price: number,
  coverImageURL: string,
  tags: string[],
  isOfficial: boolean,
  isFeatured: boolean,
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: boolean
}
```

#### `backgroundTracks`
```javascript
{
  id: string,
  name: string,
  category: "Nature" | "Ambient" | "Classical",
  url: string,
  duration: number,
  thumbnailUrl: string,
  isActive: boolean,
  order: number
}
```

## 📦 Storage Structure

```
gs://fit-mental.firebasestorage.app/
├── app-meditations/          # Audio de meditaciones
│   └── {timestamp}_{filename}.mp3
├── meditation-images/        # Imágenes de portada
│   └── {timestamp}_{filename}.jpg
├── music/                    # Música de fondo
│   └── {trackId}.mp3
└── music-thumbnails/        # Thumbnails de música
    └── {trackId}.jpg
```

## 🔐 Seguridad

### Requisitos de Admin
- Solo usuarios con `role: 'admin'` en Firestore pueden acceder
- Se valida el rol en cada carga de página
- Si no es admin, se redirige al login

### Límites de Archivos
- **Audio**: Máximo 100MB (MP3, M4A, WAV)
- **Imágenes**: Máximo 5MB (JPG, PNG, WebP)
- **Bitrate recomendado**: 128-192 kbps para audio

## 🚀 Mejores Prácticas

### 1. Optimización de Contenido
- **Imágenes**: Comprimir antes de subir
- **Audio**: Normalizar volumen para consistencia
- **Metadatos**: Completar todos los campos para mejor búsqueda

### 2. Organización
- Usar categorías consistentes
- Agregar tags relevantes
- Mantener títulos descriptivos

### 3. Control de Acceso
- Definir claramente si el contenido es free/premium
- Asociar contenido a programas cuando corresponda
- Usar `isActive` para ocultar sin eliminar

## 🛠️ Solución de Problemas

### Contenido no aparece en la app
1. Verificar que `isActive: true`
2. Confirmar que los URLs de audio/imagen son válidos
3. Revisar el tipo de acceso configurado

### Error al subir archivos
1. Verificar tamaño del archivo
2. Confirmar formato soportado
3. Revisar conexión a internet

### Cambios no se reflejan
1. La app usa caché offline
2. Usuarios deben sincronizar manualmente
3. Cambios en tiempo real para usuarios online

## 📊 Próximas Funcionalidades

- [ ] Constructor visual de programas
- [ ] Editor drag-and-drop de playlists
- [ ] Bulk upload de contenido vía CSV
- [ ] Analytics detallado de uso
- [ ] Sistema de reviews y ratings
- [ ] Gestión de suscripciones

## 🆘 Soporte

Para problemas técnicos o preguntas sobre el panel de administración:
1. Revisa esta documentación
2. Verifica los logs en la consola del navegador
3. Contacta al equipo de desarrollo

## 📝 Notas Importantes

1. **Siempre hacer backup** antes de eliminar contenido
2. **Los archivos eliminados no se pueden recuperar**
3. **Los cambios son inmediatos** para usuarios online
4. **Contenido descargado** permanece en caché del usuario hasta actualización manual

---

*Última actualización: Noviembre 2024*
*Versión: 1.0.0*