import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { 
  HelpCircleIcon, 
  SearchIcon, 
  BookOpenIcon, 
  VideoIcon,
  FileTextIcon,
  MessageSquareIcon,
  UserIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  MapIcon,
  ShieldIcon,
  CalendarIcon,
  ArrowRightIcon,
  PlayIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Centro de Ayuda - Turismo Mundial AO',
  description: 'Encuentra respuestas, guías y tutoriales para aprovechar al máximo la plataforma Turismo Mundial AO. Soporte completo para usuarios.',
}

const helpCategories = [
  {
    title: 'Primeros Pasos',
    icon: UserIcon,
    description: 'Guías para comenzar a usar la plataforma',
    articlesCount: 12,
    color: 'bg-blue-500',
    topics: ['Crear cuenta', 'Completar perfil', 'Verificar identidad', 'Primeros pasos']
  },
  {
    title: 'Empleo y Trabajo',
    icon: BriefcaseIcon,
    description: 'Todo sobre búsqueda de empleo y postulaciones',
    articlesCount: 18,
    color: 'bg-green-500',
    topics: ['Buscar empleos', 'Postular', 'CV y perfil', 'Entrevistas']
  },
  {
    title: 'Certificaciones',
    icon: GraduationCapIcon,
    description: 'Información sobre cursos y certificaciones',
    articlesCount: 15,
    color: 'bg-purple-500',
    topics: ['Inscripciones', 'Pagos', 'Certificados', 'Evaluaciones']
  },
  {
    title: 'Experiencias Turísticas',
    icon: MapIcon,
    description: 'Guías para reservar y disfrutar experiencias',
    articlesCount: 22,
    color: 'bg-orange-500',
    topics: ['Reservas', 'Cancelaciones', 'Reembolsos', 'Valoraciones']
  },
  {
    title: 'Seguridad',
    icon: ShieldIcon,
    description: 'Políticas de seguridad y privacidad',
    articlesCount: 8,
    color: 'bg-red-500',
    topics: ['Datos personales', 'Seguridad', 'Denuncias', 'Verificación']
  },
  {
    title: 'Eventos',
    icon: CalendarIcon,
    description: 'Información sobre eventos y conferencias',
    articlesCount: 10,
    color: 'bg-pink-500',
    topics: ['Registro', 'Participación', 'Certificados', 'Networking']
  },
]

const featuredArticles = [
  {
    id: '1',
    title: 'Cómo crear tu perfil profesional perfecto',
    category: 'Primeros Pasos',
    readTime: '5 min',
    views: '12,453',
    type: 'article',
    description: 'Guía completa para optimizar tu perfil y destacar entre empleadores',
    isPopular: true
  },
  {
    id: '2',
    title: 'Tutorial: Proceso de verificación de certificaciones',
    category: 'Certificaciones',
    readTime: '8 min',
    views: '8,765',
    type: 'video',
    description: 'Video paso a paso del proceso de verificación oficial',
    isPopular: true
  },
  {
    id: '3',
    title: 'Guía de seguridad para experiencias turísticas',
    category: 'Seguridad',
    readTime: '10 min',
    views: '15,234',
    type: 'article',
    description: 'Recomendaciones esenciales para viajar seguro',
    isPopular: false
  },
  {
    id: '4',
    title: 'Cómo cancelar o modificar una reserva',
    category: 'Experiencias Turísticas',
    readTime: '3 min',
    views: '6,543',
    type: 'article',
    description: 'Políticas y pasos para cambios en tus reservas',
    isPopular: false
  },
]

const videoTutorials = [
  {
    title: 'Introducción a Turismo Mundial AO',
    duration: '4:32',
    thumbnail: '/images/video-intro.jpg',
    description: 'Conoce todas las funcionalidades de la plataforma'
  },
  {
    title: 'Cómo buscar y aplicar a empleos',
    duration: '6:45',
    thumbnail: '/images/video-jobs.jpg',
    description: 'Proceso completo de búsqueda laboral'
  },
  {
    title: 'Inscripción a cursos y certificaciones',
    duration: '5:18',
    thumbnail: '/images/video-courses.jpg',
    description: 'Desde la inscripción hasta obtener tu certificado'
  },
]

const quickActions = [
  { title: 'Contactar Soporte', icon: MessageSquareIcon, action: 'chat' },
  { title: 'Reportar Problema', icon: HelpCircleIcon, action: 'report' },
  { title: 'Solicitar Reembolso', icon: ArrowRightIcon, action: 'refund' },
  { title: 'Verificar Cuenta', icon: ShieldIcon, action: 'verify' },
]

export default function AyudaPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircleIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Centro de Ayuda</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas a tus preguntas, tutoriales y guías completas 
              para aprovechar al máximo la plataforma Turismo Mundial AO.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  placeholder="¿Qué necesitas ayuda? Busca aquí..."
                  leftIcon={<SearchIcon className="w-5 h-5" />}
                  className="bg-white text-gray-900 pr-20"
                />
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
                  size="sm"
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-secondary">150+</div>
                <div className="text-white/80 text-sm">Artículos de Ayuda</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">25</div>
                <div className="text-white/80 text-sm">Video Tutoriales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-white/80 text-sm">Soporte Disponible</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">98%</div>
                <div className="text-white/80 text-sm">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section -mt-16 relative z-10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Card key={action.title} variant="interactive" className="text-center group">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Categorías de Ayuda</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra información organizada por tema para resolver tus dudas rápidamente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.title} variant="interactive" className="group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${category.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{category.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="outline" className="text-xs">
                        {category.articlesCount} artículos
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      {category.topics.slice(0, 3).map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          <span>{topic}</span>
                        </div>
                      ))}
                      {category.topics.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{category.topics.length - 3} temas más
                        </div>
                      )}
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Explorar Categoría
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Artículos Destacados</h2>
            <p className="text-xl text-gray-600">
              Los artículos más útiles y consultados por nuestra comunidad
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {article.isPopular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                      {article.type === 'video' ? (
                        <VideoIcon className="w-4 h-4 text-primary" />
                      ) : (
                        <FileTextIcon className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>⏱️ {article.readTime} lectura</span>
                    <span>👁️ {article.views} vistas</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    {article.type === 'video' ? (
                      <>
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Ver Video
                      </>
                    ) : (
                      <>
                        <BookOpenIcon className="w-4 h-4 mr-2" />
                        Leer Artículo
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Video Tutoriales</h2>
            <p className="text-xl text-gray-600">
              Aprende visualmente con nuestros tutoriales paso a paso
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <PlayIcon className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2" variant="outline">
                    {video.duration}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <VideoIcon className="w-4 h-4 mr-2" />
                    Ver Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="bg-gradient-ao text-white rounded-2xl p-12 text-center">
            <MessageSquareIcon className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="heading-md text-white mb-6">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier consulta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Contactar Soporte
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Chat en Vivo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}