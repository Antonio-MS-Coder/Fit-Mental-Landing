import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  ShieldIcon, 
  MapPinIcon, 
  PhoneIcon, 
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  CarIcon,
  BuildingIcon,
  UmbrellaIcon,
  CameraIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Explora Seguro - Guías de Seguridad Turística',
  description: 'Viaja con confianza por México. Guías de seguridad, rutas verificadas, puntos de apoyo C5 y recomendaciones para un turismo seguro.',
}

const safetyCategories = [
  { 
    name: 'Salud y Bienestar', 
    icon: HeartIcon, 
    count: 45,
    description: 'Centros de salud, medicamentos y emergencias médicas' 
  },
  { 
    name: 'Seguridad Personal', 
    icon: ShieldIcon, 
    count: 38,
    description: 'Prevención, contactos de emergencia y protocolos' 
  },
  { 
    name: 'Documentación', 
    icon: CameraIcon, 
    count: 32,
    description: 'Requisitos, copias de seguridad y trámites' 
  },
  { 
    name: 'Transporte Seguro', 
    icon: CarIcon, 
    count: 28,
    description: 'Operadores confiables y rutas recomendadas' 
  },
  { 
    name: 'Alojamiento', 
    icon: BuildingIcon, 
    count: 25,
    description: 'Hoteles verificados y zonas seguras' 
  },
  { 
    name: 'Clima y Temporadas', 
    icon: UmbrellaIcon, 
    count: 22,
    description: 'Condiciones meteorológicas y mejor época para viajar' 
  },
]

const emergencyContacts = [
  {
    name: 'Emergencias Generales',
    number: '911',
    description: 'Policía, bomberos y servicios médicos de emergencia',
    available: '24/7',
    type: 'general'
  },
  {
    name: 'Policía Turística',
    number: '078',
    description: 'Asistencia especializada para turistas',
    available: '24/7',
    type: 'tourist'
  },
  {
    name: 'Cruz Roja Mexicana',
    number: '065',
    description: 'Servicios médicos y de rescate',
    available: '24/7',
    type: 'medical'
  },
  {
    name: 'SECTUR Emergencias',
    number: '01-800-903-9200',
    description: 'Línea directa de la Secretaría de Turismo',
    available: '24/7',
    type: 'tourism'
  },
]

const safeRoutes = [
  {
    id: '1',
    name: 'Ruta Maya Segura',
    region: 'Península de Yucatán',
    destinations: ['Mérida', 'Chichén Itzá', 'Tulum', 'Playa del Carmen'],
    duration: '7-10 días',
    safetyLevel: 'Alto',
    c5Points: 15,
    verifiedHotels: 45,
    lastUpdate: '2024-01-15',
    description: 'Recorre los sitios arqueológicos más importantes con total seguridad.',
    highlights: ['Sitios UNESCO', 'Cenotes protegidos', 'Guías certificados']
  },
  {
    id: '2',
    name: 'Corredor Gastronómico Oaxaca',
    region: 'Oaxaca',
    destinations: ['Oaxaca Capital', 'Monte Albán', 'Hierve el Agua', 'Teotitlán'],
    duration: '4-6 días',
    safetyLevel: 'Alto',
    c5Points: 8,
    verifiedHotels: 32,
    lastUpdate: '2024-01-10',
    description: 'Descubre la gastronomía oaxaqueña en un entorno completamente seguro.',
    highlights: ['Mercados tradicionales', 'Talleres artesanales', 'Mezcal auténtico']
  },
  {
    id: '3',
    name: 'Pueblos Mágicos del Bajío',
    region: 'Guanajuato - Querétaro',
    destinations: ['San Miguel de Allende', 'Guanajuato', 'Querétaro', 'Tequisquiapan'],
    duration: '5-7 días',
    safetyLevel: 'Muy Alto',
    c5Points: 12,
    verifiedHotels: 38,
    lastUpdate: '2024-01-20',
    description: 'Explora la arquitectura colonial con máxima tranquilidad.',
    highlights: ['Patrimonio cultural', 'Arte colonial', 'Viñedos boutique']
  },
]

const safetyTips = [
  {
    category: 'Antes del Viaje',
    tips: [
      'Registra tu viaje en el consulado si eres extranjero',
      'Contrata un seguro de viaje integral',
      'Investiga las condiciones meteorológicas del destino',
      'Haz copias digitales de documentos importantes'
    ]
  },
  {
    category: 'Durante el Viaje',
    tips: [
      'Mantén contacto regular con familiares',
      'Usa solo cajeros automáticos en lugares seguros',
      'Evita mostrar objetos de valor en público',
      'Consume solo agua y alimentos de fuentes confiables'
    ]
  },
  {
    category: 'Transporte',
    tips: [
      'Utiliza solo servicios de transporte oficial',
      'Verifica las credenciales de guías y operadores',
      'Planifica rutas durante horarios diurnos',
      'Comparte tu itinerario con personas de confianza'
    ]
  },
]

export default function ExploraSeguroPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ShieldIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Explora Seguro</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Viaja con total confianza por México. Rutas verificadas, puntos de apoyo C5 
              y toda la información que necesitas para un turismo seguro.
            </p>
            
            {/* Safety Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
              <div>
                <div className="text-2xl font-bold text-secondary">200+</div>
                <div className="text-white/80 text-sm">Rutas Verificadas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">150+</div>
                <div className="text-white/80 text-sm">Puntos de Apoyo C5</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-white/80 text-sm">Hoteles Verificados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-white/80 text-sm">Asistencia</div>
              </div>
            </div>

            <Button size="lg" variant="secondary">
              Ver Rutas Seguras
            </Button>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="section bg-red-50">
        <div className="container">
          <div className="text-center mb-12">
            <AlertTriangleIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="heading-lg mb-4 text-red-900">Contactos de Emergencia</h2>
            <p className="text-xl text-red-700 max-w-3xl mx-auto">
              Números importantes que debes tener siempre a la mano durante tu viaje
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact) => (
              <Card key={contact.name} className="border-red-200 bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 p-3 bg-red-100 rounded-full w-fit">
                    <PhoneIcon className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg text-red-900">{contact.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{contact.number}</div>
                  <p className="text-sm text-red-700 mb-3">{contact.description}</p>
                  <Badge variant="outline" className="border-red-300 text-red-700">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {contact.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Guías de Seguridad</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Información completa y actualizada para cada aspecto de tu viaje
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.name} variant="interactive" className="group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <p className="text-sm font-medium text-primary">{category.count} guías disponibles</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Guías
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Safe Routes */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Rutas Seguras Verificadas</h2>
            <p className="text-xl text-gray-600">
              Itinerarios completamente verificados con puntos de apoyo y servicios confiables
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {safeRoutes.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="success" className="text-xs">
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      Seguridad {route.safetyLevel}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Act. {new Date(route.lastUpdate).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{route.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {route.region}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{route.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Destinos incluidos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {route.destinations.map((destination, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {destination}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {route.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <StarIcon className="w-3 h-3 text-secondary" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Duración</div>
                      <div>{route.duration}</div>
                    </div>
                    <div>
                      <div className="font-medium">Puntos C5</div>
                      <div>{route.c5Points} disponibles</div>
                    </div>
                  </div>

                  <Button className="w-full">
                    Ver Ruta Completa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Consejos de Seguridad</h2>
            <p className="text-xl text-gray-600">
              Recomendaciones esenciales para un viaje seguro y sin contratiempos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {safetyTips.map((section) => (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle className="text-lg text-center">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{tip}</span>
                      </div>
                    ))}
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
              ¿Necesitas asistencia especializada?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está disponible 24/7 para brindarte asistencia personalizada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Contactar Asistencia
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Reportar Incidencia
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}