import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  BuildingIcon,
  UserIcon,
  SendIcon,
  HeadphonesIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto - Turismo Mundial AO',
  description: 'Contáctanos para resolver tus dudas sobre empleo, capacitación y experiencias turísticas. Soporte especializado 24/7.',
}

const contactMethods = [
  {
    type: 'Soporte General',
    icon: HeadphonesIcon,
    email: 'contacto@turismomundial.ao.gob.mx',
    phone: '+52 55 1234 5678',
    hours: '24/7',
    description: 'Consultas generales sobre la plataforma'
  },
  {
    type: 'Empleo y Trabajo',
    icon: UserIcon,
    email: 'trabaja@turismomundial.ao.gob.mx',
    phone: '+52 55 1234 5679',
    hours: 'Lun-Vie 8:00-18:00',
    description: 'Dudas sobre empleos y oportunidades laborales'
  },
  {
    type: 'Certificaciones',
    icon: BuildingIcon,
    email: 'aprende@turismomundial.ao.gob.mx',
    phone: '+52 55 1234 5680',
    hours: 'Lun-Vie 9:00-17:00',
    description: 'Información sobre cursos y certificaciones'
  },
  {
    type: 'Experiencias Turísticas',
    icon: MapPinIcon,
    email: 'descubre@turismomundial.ao.gob.mx',
    phone: '+52 55 1234 5681',
    hours: 'Lun-Dom 7:00-22:00',
    description: 'Consultas sobre destinos y experiencias'
  },
]

const officeLocations = [
  {
    name: 'Oficina Central - Ciudad de México',
    address: 'Av. Presidente Masaryk 172, Col. Bosque de Chapultepec',
    city: 'Ciudad de México, CDMX 11580',
    phone: '+52 55 1234 5678',
    email: 'cdmx@turismomundial.ao.gob.mx',
    hours: 'Lun-Vie 8:00-18:00',
    services: ['Atención presencial', 'Certificaciones', 'Capacitación'],
    isMain: true
  },
  {
    name: 'Oficina Regional - Cancún',
    address: 'Av. Tulum 260, SM 4, Centro',
    city: 'Cancún, Quintana Roo 77500',
    phone: '+52 998 123 4567',
    email: 'cancun@turismomundial.ao.gob.mx',
    hours: 'Lun-Vie 8:00-17:00',
    services: ['Experiencias turísticas', 'Empleo hotelero'],
    isMain: false
  },
  {
    name: 'Oficina Regional - Oaxaca',
    address: 'Calle 5 de Mayo 102, Centro Histórico',
    city: 'Oaxaca, Oaxaca 68000',
    phone: '+52 951 123 4567',
    email: 'oaxaca@turismomundial.ao.gob.mx',
    hours: 'Lun-Vie 9:00-17:00',
    services: ['Turismo cultural', 'Artesanías'],
    isMain: false
  },
]

const faqItems = [
  {
    question: '¿Cómo puedo registrarme en la plataforma?',
    answer: 'El registro es gratuito. Haz clic en "Comenzar Ahora" en la página principal y completa el formulario con tus datos profesionales.'
  },
  {
    question: '¿Las certificaciones tienen costo?',
    answer: 'Algunos cursos son gratuitos y otros tienen costo. Las certificaciones oficiales de SECTUR tienen tarifas establecidas por el gobierno.'
  },
  {
    question: '¿Cómo verifican la autenticidad de los empleos?',
    answer: 'Todos los empleos pasan por un proceso de verificación que incluye validación de la empresa, condiciones laborales y salarios.'
  },
  {
    question: '¿Puedo cancelar una experiencia turística?',
    answer: 'Sí, las cancelaciones están sujetas a las políticas de cada proveedor. Generalmente puedes cancelar hasta 48 horas antes sin penalización.'
  },
]

export default function ContactoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageSquareIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Contacto</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte. Contáctanos para resolver cualquier duda 
              sobre empleo, certificaciones o experiencias turísticas.
            </p>
            
            {/* Quick Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <MailIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="font-medium mb-1">Email Principal</div>
                <div className="text-sm text-white/80">contacto@turismomundial.ao.gob.mx</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <PhoneIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="font-medium mb-1">Teléfono 24/7</div>
                <div className="text-sm text-white/80">+52 55 1234 5678</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <ClockIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="font-medium mb-1">Horario</div>
                <div className="text-sm text-white/80">Soporte 24/7 disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="heading-lg mb-6">Envíanos un Mensaje</h2>
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Nombre Completo"
                        placeholder="Tu nombre"
                        required
                      />
                      <Input
                        label="Correo Electrónico"
                        type="email"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Teléfono (Opcional)"
                        type="tel"
                        placeholder="+52 55 1234 5678"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de Consulta
                        </label>
                        <select className="select w-full">
                          <option value="">Selecciona una opción</option>
                          <option value="general">Consulta General</option>
                          <option value="trabajo">Empleo y Trabajo</option>
                          <option value="certificaciones">Certificaciones</option>
                          <option value="experiencias">Experiencias Turísticas</option>
                          <option value="tecnico">Soporte Técnico</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto
                      </label>
                      <Input
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje
                      </label>
                      <textarea
                        className="textarea min-h-32 w-full"
                        placeholder="Describe tu consulta con el mayor detalle posible..."
                        required
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" required />
                      <label className="text-sm text-gray-600">
                        Acepto el tratamiento de mis datos personales conforme a la{' '}
                        <a href="/privacidad" className="text-primary hover:underline">
                          Política de Privacidad
                        </a>
                      </label>
                    </div>

                    <Button size="lg" className="w-full" rightIcon={<SendIcon className="w-4 h-4" />}>
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Methods */}
            <div>
              <h2 className="heading-lg mb-6">Canales de Atención</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <Card key={method.type}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{method.type}</h3>
                            <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <MailIcon className="w-4 h-4 text-gray-500" />
                                <a href={`mailto:${method.email}`} className="text-primary hover:underline">
                                  {method.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4 text-gray-500" />
                                <a href={`tel:${method.phone}`} className="text-primary hover:underline">
                                  {method.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">{method.hours}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Nuestras Oficinas</h2>
            <p className="text-xl text-gray-600">
              Visítanos en persona en cualquiera de nuestras ubicaciones
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {officeLocations.map((office) => (
              <Card key={office.name} className={office.isMain ? 'ring-2 ring-primary' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{office.name}</CardTitle>
                    {office.isMain && (
                      <Badge variant="primary" className="text-xs">
                        Principal
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div>{office.address}</div>
                        <div className="text-gray-600">{office.city}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-500" />
                      <a href={`tel:${office.phone}`} className="text-primary hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-4 h-4 text-gray-500" />
                      <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Servicios disponibles:</h4>
                    <div className="flex flex-wrap gap-1">
                      {office.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <HelpCircleIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="heading-lg mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600">
              Respuestas a las consultas más comunes de nuestros usuarios
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">
              Ver Todas las Preguntas Frecuentes
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}