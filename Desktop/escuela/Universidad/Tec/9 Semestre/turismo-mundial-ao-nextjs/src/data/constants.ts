import { 
  BriefcaseIcon, 
  GraduationCapIcon, 
  CompassIcon, 
  ShieldCheckIcon, 
  CalendarIcon, 
  BarChart3Icon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon
} from 'lucide-react'

export const SITE_CONFIG = {
  name: 'Turismo Mundial AO',
  description: 'Plataforma oficial del Gobierno de México que conecta profesionales del turismo con oportunidades laborales, certificaciones y experiencias turísticas verificadas.',
  url: 'https://turismomundial.ao.gob.mx',
  ogImage: '/images/og-image.jpg',
  keywords: [
    'turismo',
    'México',
    'empleos',
    'certificaciones',
    'capacitación',
    'gobierno',
    'SECTUR',
    'oportunidades laborales',
    'turismo sustentable',
    'industria turística'
  ] as string[],
  authors: [
    {
      name: 'Gobierno de México',
      url: 'https://gob.mx',
    },
  ],
  creator: 'SECTUR - Secretaría de Turismo',
  metadataBase: new URL('https://turismomundial.ao.gob.mx'),
}

export const NAVIGATION_ITEMS = [
  {
    title: 'Trabaja',
    href: '/trabaja',
    icon: BriefcaseIcon,
    description: 'Encuentra oportunidades laborales en el sector turístico'
  },
  {
    title: 'Aprende',
    href: '/aprende',
    icon: GraduationCapIcon,
    description: 'Certifícate y mejora tus habilidades profesionales'
  },
  {
    title: 'Descubre',
    href: '/descubre',
    icon: CompassIcon,
    description: 'Explora experiencias turísticas auténticas de México'
  },
  {
    title: 'Explora Seguro',
    href: '/explora-seguro',
    icon: ShieldCheckIcon,
    description: 'Guías de seguridad y recomendaciones para viajar'
  },
  {
    title: 'Eventos',
    href: '/eventos',
    icon: CalendarIcon,
    description: 'Conferencias, talleres y eventos del sector turístico'
  },
  {
    title: 'Impacto AO',
    href: '/impacto',
    icon: BarChart3Icon,
    description: 'Métricas e impacto de la plataforma en el turismo mexicano'
  },
] as const

export const FOOTER_LINKS = {
  modules: [
    { title: 'Trabaja', href: '/trabaja', icon: BriefcaseIcon },
    { title: 'Aprende', href: '/aprende', icon: GraduationCapIcon },
    { title: 'Descubre', href: '/descubre', icon: CompassIcon },
    { title: 'Explora Seguro', href: '/explora-seguro', icon: ShieldCheckIcon },
    { title: 'Eventos', href: '/eventos', icon: CalendarIcon },
    { title: 'Impacto AO', href: '/impacto', icon: BarChart3Icon },
  ],
  support: [
    { title: 'Centro de Ayuda', href: '/ayuda' },
    { title: 'Contacto', href: '/contacto' },
    { title: 'Términos y Condiciones', href: '/terminos' },
    { title: 'Política de Privacidad', href: '/privacidad' },
  ],
  social: [
    { title: 'Facebook', href: 'https://facebook.com/turismomundial', icon: FacebookIcon, label: 'Facebook' },
    { title: 'Instagram', href: 'https://instagram.com/turismomundial', icon: InstagramIcon, label: 'Instagram' },
    { title: 'Twitter', href: 'https://twitter.com/turismomundial', icon: TwitterIcon, label: 'Twitter' },
    { title: 'LinkedIn', href: 'https://linkedin.com/company/turismomundial', icon: LinkedinIcon, label: 'LinkedIn' },
  ],
} as const

export const CONTACT_INFO = {
  email: 'contacto@turismomundial.ao.gob.mx',
  phone: '+52 55 1234 5678',
  address: 'Secretaría de Turismo, Ciudad de México',
  privacy: {
    email: 'privacidad@turismomundial.ao.gob.mx',
    phone: '+52 55 1234 5678',
    address: 'Secretaría de Turismo, Ciudad de México',
  },
} as const

export const JOB_TYPES = {
  'full-time': 'Tiempo Completo',
  'part-time': 'Tiempo Parcial',
  'contract': 'Por Contrato',
  'internship': 'Prácticas Profesionales',
} as const

export const EXPERIENCE_TYPES = {
  'cultural': 'Cultural',
  'adventure': 'Aventura',
  'gastronomic': 'Gastronómico',
  'ecological': 'Ecológico',
  'historical': 'Histórico',
} as const

export const EVENT_TYPES = {
  'conference': 'Conferencia',
  'workshop': 'Taller',
  'festival': 'Festival',
  'exhibition': 'Exhibición',
  'networking': 'Networking',
} as const

export const COURSE_LEVELS = {
  'beginner': 'Principiante',
  'intermediate': 'Intermedio',
  'advanced': 'Avanzado',
} as const

export const SAFETY_CATEGORIES = {
  'health': 'Salud',
  'security': 'Seguridad',
  'documentation': 'Documentación',
  'transportation': 'Transporte',
  'emergency': 'Emergencias',
} as const

export const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
] as const

export const TOURISM_CATEGORIES = [
  'Turismo Cultural',
  'Turismo de Aventura',
  'Turismo Gastronómico',
  'Turismo Ecológico',
  'Turismo Histórico',
  'Turismo de Playa',
  'Turismo Rural',
  'Turismo de Negocios',
  'Turismo de Bienestar',
  'Turismo Religioso',
] as const

export const SKILL_CATEGORIES = [
  'Idiomas',
  'Tecnología',
  'Liderazgo',
  'Comunicación',
  'Marketing Digital',
  'Atención al Cliente',
  'Gestión de Proyectos',
  'Ventas',
  'Contabilidad',
  'Recursos Humanos',
] as const

export const IMPACT_CATEGORIES = {
  'employment': 'Empleo',
  'education': 'Educación',
  'tourism': 'Turismo',
  'economy': 'Economía',
  'social': 'Impacto Social',
} as const

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 12,
} as const

export const API_ENDPOINTS = {
  jobs: '/api/jobs',
  courses: '/api/courses',
  experiences: '/api/experiences',
  events: '/api/events',
  safety: '/api/safety',
  impact: '/api/impact',
  auth: '/api/auth',
  users: '/api/users',
  contact: '/api/contact',
} as const

export const STORAGE_KEYS = {
  user: 'ao-user',
  token: 'ao-token',
  preferences: 'ao-preferences',
  cart: 'ao-cart',
  favorites: 'ao-favorites',
} as const