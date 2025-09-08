export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'moderator'
  createdAt: Date
  updatedAt: Date
}

export interface JobOpportunity {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  salary?: {
    min: number
    max: number
    currency: string
  }
  description: string
  requirements: string[]
  benefits: string[]
  tags: string[]
  publishedAt: Date
  expiresAt: Date
  verified: boolean
  featured: boolean
}

// Extended job types for Firebase integration
export interface Job {
  id: string
  title: string
  company: string
  employerId: string
  location: string
  state?: string
  type: 'tiempo-completo' | 'medio-tiempo' | 'contrato' | 'practicas'
  category: string
  salary?: {
    min: number
    max: number
    currency: string
    period: 'hora' | 'dia' | 'semana' | 'mes' | 'año'
  }
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  skills: string[]
  experience: string
  education: string
  languages?: string[]
  tags: string[]
  remote: boolean
  urgent: boolean
  featured: boolean
  verified: boolean
  status: 'active' | 'paused' | 'closed'
  views: number
  applications: number
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
}

export interface Employer {
  id: string
  name: string
  description: string
  website?: string
  email: string
  phone?: string
  logo?: string
  banner?: string
  industry: string
  size: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+'
  location: string
  state?: string
  founded?: number
  benefits: string[]
  culture: string
  mission?: string
  vision?: string
  values?: string[]
  socialMedia?: {
    linkedin?: string
    facebook?: string
    twitter?: string
    instagram?: string
  }
  verified: boolean
  featured: boolean
  premium: boolean
  rating?: number
  reviewsCount?: number
  jobsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface JobApplication {
  id: string
  jobId: string
  userId: string
  employerId: string
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'offered' | 'hired' | 'rejected'
  coverLetter?: string
  resume?: string
  expectedSalary?: number
  availableFrom?: Date
  notes?: string
  appliedAt: Date
  updatedAt: Date
  createdAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // in hours
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  price: number
  currency: string
  thumbnail: string
  rating: number
  studentsCount: number
  modules: CourseModule[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CourseModule {
  id: string
  title: string
  description: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: 'video' | 'article' | 'quiz' | 'assignment'
  duration: number // in minutes
  content: string
  order: number
}

export interface TourismExperience {
  id: string
  title: string
  description: string
  location: string
  state: string
  country: string
  type: 'cultural' | 'adventure' | 'gastronomic' | 'ecological' | 'historical'
  price: number
  currency: string
  duration: number // in days
  maxParticipants: number
  images: string[]
  includes: string[]
  excludes: string[]
  requirements: string[]
  rating: number
  reviewsCount: number
  provider: string
  verified: boolean
  available: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'conference' | 'workshop' | 'festival' | 'exhibition' | 'networking'
  startDate: Date
  endDate: Date
  location: string
  venue: string
  organizer: string
  capacity: number
  registeredCount: number
  price: number
  currency: string
  image: string
  tags: string[]
  featured: boolean
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface SafetyGuide {
  id: string
  title: string
  description: string
  category: 'health' | 'security' | 'documentation' | 'transportation' | 'emergency'
  content: string
  region?: string
  lastUpdated: Date
  priority: 'low' | 'medium' | 'high' | 'critical'
  tags: string[]
}

export interface ImpactMetric {
  id: string
  name: string
  value: number
  unit: string
  description: string
  category: 'employment' | 'education' | 'tourism' | 'economy' | 'social'
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  lastUpdated: Date
  trend: 'up' | 'down' | 'stable'
  changePercentage: number
}

export interface Certification {
  id: string
  name: string
  description: string
  provider: string
  type: 'technical' | 'professional' | 'academic' | 'industry'
  level: 'basic' | 'intermediate' | 'advanced' | 'expert'
  duration: number // in hours
  validityPeriod: number // in months
  requirements: string[]
  benefits: string[]
  cost: number
  currency: string
  available: boolean
  tags: string[]
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  actionUrl?: string
  createdAt: Date
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface SearchFilters {
  query?: string
  category?: string
  location?: string
  priceRange?: {
    min: number
    max: number
  }
  dateRange?: {
    start: Date
    end: Date
  }
  tags?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type: 'general' | 'support' | 'partnership' | 'media'
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  helpful: number
  notHelpful: number
}

export interface PageMeta {
  title: string
  description: string
  keywords: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
}