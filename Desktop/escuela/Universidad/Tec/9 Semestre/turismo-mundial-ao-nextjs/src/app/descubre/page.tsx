import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  CompassIcon, 
  MapPinIcon, 
  StarIcon, 
  CalendarIcon,
  UsersIcon,
  CameraIcon,
  HeartIcon,
  MountainIcon,
  TreePalmIcon,
  BuildingIcon,
  UtensilsIcon,
  BookOpenIcon as HistoryIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Descubre - Experiencias Turísticas Auténticas',
  description: 'Explora más de 500 experiencias turísticas verificadas en México. Desde aventuras hasta cultura, gastronomía y tradiciones.',
}

const experienceTypes = [
  { 
    name: 'Cultural y Patrimonial', 
    count: 128, 
    icon: BuildingIcon, 
    color: 'bg-blue-500',
    description: 'Sitios arqueológicos, museos y tradiciones ancestrales' 
  },
  { 
    name: 'Aventura y Naturaleza', 
    count: 95, 
    icon: MountainIcon, 
    color: 'bg-green-500',
    description: 'Ecoturismo, deportes extremos y parques naturales' 
  },
  { 
    name: 'Gastronomía Regional', 
    count: 87, 
    icon: UtensilsIcon, 
    color: 'bg-orange-500',
    description: 'Cocina tradicional, mercados y experiencias culinarias' 
  },
  { 
    name: 'Playas y Costas', 
    count: 74, 
    icon: TreePalmIcon, 
    color: 'bg-cyan-500',
    description: 'Destinos costeros, deportes acuáticos y vida marina' 
  },
  { 
    name: 'Pueblos Mágicos', 
    count: 68, 
    icon: HeartIcon, 
    color: 'bg-purple-500',
    description: 'Encanto colonial, artesanías y tradiciones locales' 
  },
  { 
    name: 'Arte y Creatividad', 
    count: 52, 
    icon: CameraIcon, 
    color: 'bg-pink-500',
    description: 'Talleres artísticos, galerías y experiencias creativas' 
  },
]

const featuredExperiences = [
  {
    id: '1',
    title: 'Taller de Chocolate Maya en Chichén Itzá',
    location: 'Yucatán',
    type: 'Cultural',
    duration: '4 horas',
    price: 850,
    maxParticipants: 12,
    rating: 4.9,
    reviewsCount: 247,
    images: ['/images/chocolate-maya.jpg'],
    featured: true,
    verified: true,
    provider: 'Experiencias Mayas Auténticas',
    description: 'Aprende el proceso ancestral de preparación del chocolate mientras exploras las ruinas milenarias.',
    includes: ['Guía especializado maya-hablante', 'Degustación de 5 chocolates', 'Kit para llevar a casa'],
    highlights: ['Ceremonia del cacao', 'Historia prehispánica', 'Técnicas tradicionales']
  },
  {
    id: '2',
    title: 'Safari Fotográfico en la Reserva de la Mariposa Monarca',
    location: 'Michoacán',
    type: 'Naturaleza',
    duration: '6 horas',
    price: 1200,
    maxParticipants: 8,
    rating: 4.8,
    reviewsCount: 189,
    images: ['/images/monarca-safari.jpg'],
    featured: true,
    verified: true,
    provider: 'EcoTour Michoacán',
    description: 'Captura la migración más espectacular del mundo con equipo profesional y guías expertos.',
    includes: ['Equipo fotográfico profesional', 'Desayuno campestre', 'Transporte desde Morelia'],
    highlights: ['Millones de mariposas', 'Fotografía profesional', 'Conservación ambiental']
  },
  {
    id: '3',
    title: 'Cena Privada con Chef en Casa Colonial de San Miguel',
    location: 'Guanajuato',
    type: 'Gastronomía',
    duration: '3 horas',
    price: 2500,
    maxParticipants: 6,
    rating: 5.0,
    reviewsCount: 94,
    images: ['/images/chef-colonial.jpg'],
    featured: true,
    verified: true,
    provider: 'Casa Gastronómica Colonial',
    description: 'Experiencia culinaria exclusiva en una casona del siglo XVIII con menú de autor.',
    includes: ['Chef ejecutivo privado', 'Menú degustación 7 tiempos', 'Maridaje con vinos mexicanos'],
    highlights: ['Casa del siglo XVIII', 'Ingredientes orgánicos locales', 'Recetas familiares secretas']
  },
]

const popularDestinations = [
  { name: 'Oaxaca', experiences: 45, image: '/images/dest-oaxaca.jpg', type: 'Cultural' },
  { name: 'Riviera Maya', experiences: 38, image: '/images/dest-riviera.jpg', type: 'Playa' },
  { name: 'San Cristóbal', experiences: 32, image: '/images/dest-sancristobal.jpg', type: 'Aventura' },
  { name: 'Puerto Vallarta', experiences: 29, image: '/images/dest-vallarta.jpg', type: 'Gastronomía' },
  { name: 'Guanajuato', experiences: 27, image: '/images/dest-guanajuato.jpg', type: 'Pueblos Mágicos' },
  { name: 'Mérida', experiences: 24, image: '/images/dest-merida.jpg', type: 'Historia' },
]

export default function DescubrePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <CompassIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Descubre</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Vive experiencias auténticas e inolvidables en México. 
              Más de 500 experiencias verificadas te esperan en todo el país.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
              <div>
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-white/80 text-sm">Experiencias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">32</div>
                <div className="text-white/80 text-sm">Estados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-white/80 text-sm">Proveedores</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">4.8⭐</div>
                <div className="text-white/80 text-sm">Satisfacción</div>
              </div>
            </div>

            <Button size="lg" variant="secondary">
              Explorar Experiencias
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Types */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Tipos de Experiencias</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre la diversidad de México a través de experiencias únicas y auténticas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experienceTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Card key={type.name} variant="interactive" className="group hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 ${type.color} rounded-lg text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <p className="text-sm font-medium text-primary">{type.count} experiencias</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Experiencias
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Experiencias Destacadas</h2>
            <p className="text-xl text-gray-600">
              Las experiencias más populares y mejor valoradas por nuestros viajeros
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative aspect-[4/3] bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <CameraIcon className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 left-4 space-y-2">
                    {experience.featured && (
                      <Badge variant="secondary">
                        <StarIcon className="w-3 h-3 mr-1" />
                        Destacada
                      </Badge>
                    )}
                    {experience.verified && (
                      <Badge variant="success" className="block">
                        Verificada
                      </Badge>
                    )}
                  </div>
                  <Badge className="absolute top-4 right-4" variant="outline">
                    {experience.type}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-sm">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{experience.rating}</span>
                      <span className="text-gray-500">({experience.reviewsCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{experience.title}</CardTitle>
                  <CardDescription>
                    Por {experience.provider}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{experience.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Destacados:</h4>
                    {experience.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>Máx. {experience.maxParticipants}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl font-bold text-primary">
                        ${experience.price.toLocaleString()} MXN
                      </div>
                      <span className="text-sm text-gray-500">por persona</span>
                    </div>
                    <Button className="w-full">
                      Reservar Experiencia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Destinos Populares</h2>
            <p className="text-xl text-gray-600">
              Los destinos con más experiencias disponibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination) => (
              <Card key={destination.name} variant="interactive" className="overflow-hidden group">
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.experiences} experiencias disponibles</p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4" variant="outline">
                    {destination.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Explorar {destination.name}
                  </Button>
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
              ¿Eres un proveedor de experiencias?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a nuestra plataforma y comparte tus experiencias únicas con miles de viajeros
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Registrar mi Experiencia
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Conocer Requisitos
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}