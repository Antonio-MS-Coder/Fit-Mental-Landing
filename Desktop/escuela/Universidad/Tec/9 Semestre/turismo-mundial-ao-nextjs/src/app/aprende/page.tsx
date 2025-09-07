import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  GraduationCapIcon, 
  BookOpenIcon, 
  StarIcon,
  ClockIcon,
  UsersIcon,
  TrendingUpIcon,
  PlayCircleIcon,
  FileTextIcon,
  AwardIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aprende - Certificaciones y Cursos',
  description: 'Desarrolla tus habilidades con más de 200 cursos especializados en turismo. Obtén certificaciones reconocidas por la industria mexicana.',
}

const courseCategories = [
  { 
    name: 'Hospitalidad y Servicio', 
    count: 45, 
    icon: UsersIcon, 
    level: 'Todos los niveles',
    popular: true 
  },
  { 
    name: 'Gastronomía Mexicana', 
    count: 38, 
    icon: BookOpenIcon, 
    level: 'Intermedio',
    popular: true 
  },
  { 
    name: 'Guías de Turismo', 
    count: 32, 
    icon: GraduationCapIcon, 
    level: 'Certificación oficial',
    popular: false 
  },
  { 
    name: 'Marketing Turístico Digital', 
    count: 28, 
    icon: TrendingUpIcon, 
    level: 'Avanzado',
    popular: true 
  },
  { 
    name: 'Sustentabilidad Turística', 
    count: 25, 
    icon: AwardIcon, 
    level: 'Principiante',
    popular: false 
  },
  { 
    name: 'Administración Hotelera', 
    count: 22, 
    icon: FileTextIcon, 
    level: 'Intermedio',
    popular: false 
  },
]

const featuredCourses = [
  {
    id: '1',
    title: 'Certificación en Hospitalidad Premium',
    instructor: 'Chef Elena Reygadas',
    duration: 120,
    level: 'Intermedio',
    price: 2850,
    originalPrice: 3500,
    thumbnail: '/images/course-hospitality.jpg',
    rating: 4.9,
    studentsCount: 2847,
    modules: 8,
    featured: true,
    category: 'Hospitalidad',
    description: 'Domina las técnicas avanzadas de servicio al cliente en la industria turística mexicana.',
    benefits: ['Certificación oficial SECTUR', 'Prácticas en hoteles 5 estrellas', 'Bolsa de trabajo exclusiva']
  },
  {
    id: '2',
    title: 'Marketing Digital para Destinos Turísticos',
    instructor: 'Lic. Carlos Mendoza',
    duration: 80,
    level: 'Avanzado',
    price: 1950,
    originalPrice: null,
    thumbnail: '/images/course-marketing.jpg',
    rating: 4.8,
    studentsCount: 1893,
    modules: 6,
    featured: true,
    category: 'Marketing Digital',
    description: 'Aprende a promocionar destinos turísticos usando las últimas tendencias digitales.',
    benefits: ['Proyecto real con DMO', 'Herramientas premium incluidas', 'Mentoría personalizada']
  },
  {
    id: '3',
    title: 'Cocina Regional Mexicana Contemporánea',
    instructor: 'Chef Alejandro Ruiz',
    duration: 160,
    level: 'Intermedio',
    price: 3200,
    originalPrice: null,
    thumbnail: '/images/course-cooking.jpg',
    rating: 4.9,
    studentsCount: 1456,
    modules: 10,
    featured: true,
    category: 'Gastronomía',
    description: 'Fusiona técnicas tradicionales con innovación culinaria contemporánea.',
    benefits: ['Kit de ingredientes incluido', 'Sesiones presenciales', 'Certificado internacional']
  },
]

const certifications = [
  {
    name: 'Guía de Turismo General',
    issuer: 'SECTUR',
    validity: '3 años',
    difficulty: 'Intermedio',
    duration: '40 horas',
    price: 1200,
    description: 'Certificación oficial para ejercer como guía de turismo en México.'
  },
  {
    name: 'Especialista en Turismo Sustentable',
    issuer: 'SEMARNAT',
    validity: '2 años',
    difficulty: 'Avanzado',
    duration: '60 horas',
    price: 1800,
    description: 'Certíficate en prácticas sostenibles para el turismo responsable.'
  },
  {
    name: 'Sommelier de Mezcal y Tequila',
    issuer: 'CRM',
    validity: '5 años',
    difficulty: 'Avanzado',
    duration: '80 horas',
    price: 2500,
    description: 'Conviértete en experto certificado en bebidas tradicionales mexicanas.'
  },
]

export default function AprendePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCapIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Aprende</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Desarrolla tus habilidades y obtén certificaciones reconocidas. 
              Más de 200 cursos especializados en turismo mexicano.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-white/80 text-sm">Cursos Disponibles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">15,000+</div>
                <div className="text-white/80 text-sm">Certificaciones Emitidas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-white/80 text-sm">Instructores Expertos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">4.8⭐</div>
                <div className="text-white/80 text-sm">Calificación Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Categorías de Cursos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Especialízate en diferentes áreas del turismo mexicano
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.name} variant="interactive" className="group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.count} cursos</p>
                          <p className="text-xs text-gray-500">{category.level}</p>
                        </div>
                      </div>
                      {category.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Explorar Cursos
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Cursos Destacados</h2>
            <p className="text-xl text-gray-600">
              Los cursos más populares y mejor calificados
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <PlayCircleIcon className="w-16 h-16 text-white" />
                  </div>
                  {course.featured && (
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Destacado
                    </Badge>
                  )}
                  <Badge className="absolute top-4 right-4" variant="outline">
                    {course.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription>
                    Por {course.instructor}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      <span>{course.studentsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{course.duration}h</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {course.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                          ${course.price.toLocaleString()} MXN
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${course.originalPrice.toLocaleString()} MXN
                          </span>
                        )}
                      </div>
                      <Badge variant="success" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>
                    <Button className="w-full">
                      Inscribirse Ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Certificaciones Oficiales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Obtén certificaciones reconocidas por organismos gubernamentales y la industria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <AwardIcon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <CardDescription>
                    Certificado por {cert.issuer}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-6">{cert.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span>Duración:</span>
                      <span className="font-medium">{cert.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vigencia:</span>
                      <span className="font-medium">{cert.validity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nivel:</span>
                      <Badge variant="outline" className="text-xs">{cert.difficulty}</Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-2xl font-bold text-primary mb-3">
                      ${cert.price.toLocaleString()} MXN
                    </div>
                    <Button className="w-full">
                      Comenzar Certificación
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="bg-gradient-ao text-white rounded-2xl p-12 text-center">
            <h2 className="heading-md text-white mb-6">
              ¿Listo para impulsar tu carrera?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a más de 25,000 profesionales que han transformado su carrera con nuestros cursos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Explorar Todos los Cursos
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Hablar con un Asesor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}