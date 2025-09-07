# Turismo Mundial AO - Next.js Platform

**Plataforma oficial de empleo en el sector turismo del Gobierno de México**

Una moderna aplicación web construida con Next.js 15 que conecta profesionales del turismo con oportunidades laborales en toda la República Mexicana.

## 🚀 Características Principales

- **Autenticación con Google**: Registro e inicio de sesión simplificado
- **Selección de Rol**: Diferenciación entre buscadores de empleo y empleadores
- **Dashboards Personalizados**: Experiencias únicas por tipo de usuario
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Firebase Integration**: Base de datos en tiempo real y autenticación segura
- **SEO Optimizado**: Metadatos y estructuras de datos para mejor posicionamiento

## 🎯 Roles de Usuario

### 👤 Buscador de Empleo
- Búsqueda avanzada de empleos
- Certificaciones profesionales
- Perfil profesional verificado
- Alertas de nuevas oportunidades

### 🏢 Empleador
- Publicación ilimitada de empleos
- Base de candidatos verificados
- Panel de gestión avanzado
- Soporte prioritario

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15.5.2 con App Router
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth con Google OAuth
- **Database**: Firebase Firestore
- **TypeScript**: Para tipado estático
- **Deployment**: Vercel

## 📦 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Proyecto de Firebase configurado

### Configuración

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd turismo-mundial-ao-nextjs
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales de Firebase:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu-measurement-id
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:3000`

## 🚀 Deployment

### Vercel (Recomendado)

1. **Deploy automático**
   - Conecta tu repositorio de GitHub con Vercel
   - Configura las variables de entorno en el dashboard de Vercel
   - Los deploys se realizarán automáticamente con cada push

2. **Deploy manual**
   ```bash
   npm run build
   vercel --prod
   ```

### Variables de Entorno en Producción

Asegúrate de configurar todas las variables de entorno de Firebase en tu plataforma de deployment.

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Role-based dashboards
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── auth/             # Auth-related components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── data/                 # Static data and constants
├── lib/                  # Utilities and configurations
│   └── firebase.ts       # Firebase configuration
└── styles/              # Additional styles
```

## 🔐 Autenticación y Seguridad

- **Google OAuth**: Autenticación segura con Google
- **Firestore Security Rules**: Reglas de seguridad en base de datos
- **Role-based Access Control**: Control de acceso basado en roles
- **Environment Variables**: Configuración segura de credenciales

## 🎨 Design System

La aplicación utiliza un sistema de diseño minimalista basado en:
- **Colores**: Paleta burgundy (#722F37) del logo oficial AO
- **Tipografía**: Inter font family
- **Componentes**: Sistema modular con Tailwind CSS
- **Iconos**: Lucide React icons

## 🤝 Contribución

Este es un proyecto del Gobierno de México. Las contribuciones son bienvenidas siguiendo las mejores prácticas de desarrollo.

## 📄 Licencia

© 2025 Gobierno de México - SECTUR. Todos los derechos reservados.

---

**Desarrollado con ❤️ para el sector turismo de México**
