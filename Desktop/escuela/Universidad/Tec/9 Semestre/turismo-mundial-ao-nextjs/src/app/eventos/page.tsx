import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UsersIcon,
  StarIcon,
  PresentationIcon,
  GraduationCapIcon,
  MusicIcon,
  CameraIcon,
  NetworkIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eventos - Conferencias y Talleres de Turismo',
  description: 'Participa en conferencias, talleres y eventos especializados en turismo. Networking y aprendizaje continuo para profesionales del sector.',
}

const eventTypes = [
  { name: 'Conferencias', count: 12, icon: PresentationIcon, color: 'bg-blue-500' },
  { name: 'Talleres', count: 18, icon: GraduationCapIcon, color: 'bg-green-500' },
  { name: 'Festivales', count: 8, icon: MusicIcon, color: 'bg-purple-500' },
  { name: 'Exhibiciones', count: 6, icon: CameraIcon, color: 'bg-orange-500' },
  { name: 'Networking', count: 15, icon: NetworkIcon, color: 'bg-pink-500' },
]

const featuredEvents = [
  {
    id: '1',
    title: 'Cumbre Nacional de Turismo Sustentable 2024',
    type: 'Conferencia',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    location: 'Centro de Convenciones, Ciudad de México',
    venue: 'WTC México',
    organizer: 'SECTUR',
    capacity: 2000,
    registeredCount: 1456,
    price: 850,
    image: '/images/event-sustentable.jpg',
    featured: true,
    status: 'upcoming',
    description: 'El evento más importante del sector turístico mexicano, enfocado en prácticas sustentables y responsables.',
    speakers: ['Dra. Ana López', 'Ing. Carlos Mendoza', 'Chef Elena Reygadas'],
    agenda: [
      'Turismo Regenerativo en México',
      'Tecnología para la Sustentabilidad',
      'Cases de Éxito Internacionales'
    ]
  },
  {
    id: '2',
    title: 'Taller de Marketing Digital para Destinos',
    type: 'Taller',
    startDate: '2024-02-20',
    endDate: '2024-02-22',
    location: 'Playa del Carmen, Quintana Roo',
    venue: 'Hotel Grand Xcaret',
    organizer: 'Tourism Marketing Institute',
    capacity: 50,
    registeredCount: 38,
    price: 1200,
    image: '/images/workshop-marketing.jpg',
    featured: true,
    status: 'upcoming',
    description: 'Aprende las últimas estrategias de marketing digital específicamente diseñadas para destinos turísticos.',
    speakers: ['Lic. María González', 'David Rodriguez'],
    agenda: [
      'Social Media para Turismo',
      'Influencer Marketing',
      'Análisis de Datos Turísticos'
    ]
  },
  {
    id: '3',
    title: 'Festival Gastronómico Internacional México',
    type: 'Festival',
    startDate: '2024-04-10',
    endDate: '2024-04-14',
    location: 'Guadalajara, Jalisco',
    venue: 'Expo Guadalajara',
    organizer: 'Asociación de Chefs de México',
    capacity: 5000,
    registeredCount: 3200,
    price: 450,
    image: '/images/festival-gastronomico.jpg',
    featured: true,
    status: 'upcoming',
    description: 'Celebración de la diversidad gastronómica mexicana con chefs reconocidos internacionalmente.',
    speakers: ['Chef Enrique Olvera', 'Chef Daniela Soto-Innes'],
    agenda: [
      'Cocina Prehispánica Moderna',
      'Ingredientes Endémicos',
      'Fusión de Sabores Regionales'
    ]
  },
]

export default function EventosPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CalendarIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Eventos</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Conecta, aprende y crece con la comunidad turística mexicana. 
              Conferencias, talleres y eventos especializados para profesionales del sector.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
              <div>
                <div className="text-2xl font-bold text-secondary">50+</div>
                <div className="text-white/80 text-sm">Eventos Anuales</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">15,000+</div>
                <div className="text-white/80 text-sm">Participantes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-white/80 text-sm">Ponentes Expertos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">32</div>
                <div className="text-white/80 text-sm">Estados Participantes</div>
              </div>
            </div>

            <Button size="lg" variant="secondary">
              Ver Calendario de Eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Tipos de Eventos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diferentes formatos de aprendizaje y networking para profesionales del turismo
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {eventTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Card key={type.name} variant="interactive" className="text-center group">
                  <CardContent className="p-6">
                    <div className={`mx-auto mb-4 p-4 ${type.color} rounded-full text-white w-fit group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-sm text-primary font-medium">{type.count} próximos</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Próximos Eventos Destacados</h2>
            <p className="text-xl text-gray-600">
              No te pierdas estos eventos imperdibles del sector turístico
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <CalendarIcon className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Destacado
                    </Badge>
                  </div>
                  <Badge className="absolute top-4 right-4" variant="outline">
                    {event.type}
                  </Badge>
                  <Badge className="absolute bottom-4 right-4" variant="success">
                    {event.status === 'upcoming' ? 'Próximamente' : 'En curso'}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  <CardDescription>
                    Organizado por {event.organizer}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString('es-MX')} - {new Date(event.endDate).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4" />
                      <span>{event.registeredCount.toLocaleString()} / {event.capacity.toLocaleString()} registrados</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Agenda principal:</h4>
                    {event.agenda.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl font-bold text-primary">
                        ${event.price.toLocaleString()} MXN
                      </div>
                      <span className="text-sm text-gray-500">por persona</span>
                    </div>
                    <Button className="w-full">
                      Registrarse Ahora
                    </Button>
                  </div>
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
              ¿Quieres organizar un evento?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Comparte tu conocimiento y conecta con la comunidad turística mexicana
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Proponer Evento
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Ser Ponente
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}