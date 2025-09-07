import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { 
  BriefcaseIcon, 
  MapPinIcon, 
  ClockIcon, 
  StarIcon,
  SearchIcon,
  FilterIcon,
  TrendingUpIcon,
  UsersIcon,
  BuildingIcon,
  GraduationCapIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trabaja - Empleos en Turismo',
  description: 'Encuentra más de 2,500 empleos verificados en el sector turístico mexicano. Oportunidades en hotelería, restaurantes, agencias de viajes y más.',
}

const jobCategories = [
  { name: 'Hotelería', count: 850, icon: BuildingIcon, growth: '+15%' },
  { name: 'Restaurantes', count: 650, icon: UsersIcon, growth: '+12%' },
  { name: 'Agencias de Viaje', count: 380, icon: MapPinIcon, growth: '+8%' },
  { name: 'Guías de Turismo', count: 290, icon: GraduationCapIcon, growth: '+20%' },
  { name: 'Transporte Turístico', count: 180, icon: BriefcaseIcon, growth: '+10%' },
  { name: 'Eventos y Entretenimiento', count: 150, icon: StarIcon, growth: '+18%' },
]

const featuredJobs = [
  {
    id: '1',
    title: 'Gerente de Hotel Resort',
    company: 'Hotel Paradisus Cancún',
    location: 'Cancún, Quintana Roo',
    type: 'Tiempo Completo',
    salary: '$35,000 - $45,000 MXN',
    posted: '2 días',
    verified: true,
    featured: true,
    tags: ['Liderazgo', 'Hospitalidad', 'Bilingüe'],
    description: 'Buscamos un gerente experimentado para liderar las operaciones de nuestro resort de lujo en Cancún.'
  },
  {
    id: '2',
    title: 'Chef Ejecutivo',
    company: 'Restaurante Pujol',
    location: 'Ciudad de México',
    type: 'Tiempo Completo',
    salary: '$28,000 - $38,000 MXN',
    posted: '1 día',
    verified: true,
    featured: true,
    tags: ['Cocina Mexicana', 'Creatividad', 'Experiencia'],
    description: 'Únete a nuestro equipo culinario de clase mundial y crea experiencias gastronómicas únicas.'
  },
  {
    id: '3',
    title: 'Coordinador de Eventos',
    company: 'Grupo Presidente',
    location: 'Playa del Carmen, Quintana Roo',
    type: 'Tiempo Completo',
    salary: '$22,000 - $28,000 MXN',
    posted: '3 días',
    verified: true,
    featured: false,
    tags: ['Organización', 'Bodas', 'Protocolo'],
    description: 'Coordina eventos especiales y bodas en nuestros resorts de lujo en la Riviera Maya.'
  },
  {
    id: '4',
    title: 'Guía de Turismo Certificado',
    company: 'Turismo Cultural México',
    location: 'Oaxaca, Oaxaca',
    type: 'Por Proyecto',
    salary: '$15,000 - $20,000 MXN',
    posted: '1 semana',
    verified: true,
    featured: false,
    tags: ['Patrimonio', 'Historia', 'Multilingüe'],
    description: 'Comparte la riqueza cultural de Oaxaca con visitantes nacionales e internacionales.'
  },
]

export default function TrabajaPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BriefcaseIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Trabaja</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Encuentra tu oportunidad ideal en el sector turístico mexicano. 
              Más de 2,500 empleos verificados te esperan.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="¿Qué trabajo buscas?"
                    leftIcon={<SearchIcon className="w-4 h-4" />}
                    className="bg-white"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="¿En qué ciudad?"
                    leftIcon={<MapPinIcon className="w-4 h-4" />}
                    className="bg-white"
                  />
                </div>
                <Button size="lg" variant="secondary">
                  Buscar Empleos
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary">2,500+</div>
                <div className="text-white/80 text-sm">Empleos Activos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-white/80 text-sm">Empresas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">32</div>
                <div className="text-white/80 text-sm">Estados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-white/80 text-sm">Verificados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Categorías de Trabajo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explora oportunidades en diferentes sectores del turismo mexicano
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.name} variant="interactive" className="group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.count} empleos</p>
                        </div>
                      </div>
                      <Badge variant="success" className="text-xs">
                        <TrendingUpIcon className="w-3 h-3 mr-1" />
                        {category.growth}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Empleos
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="heading-lg mb-4">Empleos Destacados</h2>
              <p className="text-xl text-gray-600">
                Las mejores oportunidades seleccionadas para ti
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button variant="outline" leftIcon={<FilterIcon className="w-4 h-4" />}>
                Filtros
              </Button>
              <Button variant="outline">
                Ver Todos
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {job.featured && (
                        <Badge variant="secondary" className="text-xs">
                          <StarIcon className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      )}
                      {job.verified && (
                        <Badge variant="success" className="text-xs">
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">Hace {job.posted}</span>
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="text-base">
                    <span className="font-medium">{job.company}</span> • {job.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="font-medium text-primary">{job.salary}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    Ver Detalles y Aplicar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section">
        <div className="container">
          <div className="bg-gradient-ao text-white rounded-2xl p-12 text-center">
            <h2 className="heading-md text-white mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Crea tu perfil profesional y recibe notificaciones de empleos que coincidan con tu experiencia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Crear Perfil Profesional
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Subir CV
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}