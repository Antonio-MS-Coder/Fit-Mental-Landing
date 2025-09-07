import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  BarChartIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  BriefcaseIcon,
  GraduationCapIcon,
  MapPinIcon,
  CalendarIcon,
  AwardIcon,
  DollarSignIcon,
  BuildingIcon,
  StarIcon,
  TargetIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impacto AO - Métricas y Resultados',
  description: 'Conoce el impacto real de la plataforma Turismo Mundial AO en el desarrollo del sector turístico mexicano. Datos, métricas y casos de éxito.',
}

const impactMetrics = [
  {
    category: 'Empleo',
    metrics: [
      { name: 'Empleos Generados', value: '12,847', unit: 'puestos', trend: 'up', change: '+23%' },
      { name: 'Tasa de Colocación', value: '78.5', unit: '%', trend: 'up', change: '+12%' },
      { name: 'Salario Promedio', value: '$28,450', unit: 'MXN', trend: 'up', change: '+18%' },
    ]
  },
  {
    category: 'Educación',
    metrics: [
      { name: 'Certificaciones Emitidas', value: '15,234', unit: 'títulos', trend: 'up', change: '+45%' },
      { name: 'Horas de Capacitación', value: '89,650', unit: 'horas', trend: 'up', change: '+67%' },
      { name: 'Satisfacción Promedio', value: '4.8', unit: '/5', trend: 'stable', change: '0%' },
    ]
  },
  {
    category: 'Turismo',
    metrics: [
      { name: 'Experiencias Verificadas', value: '1,456', unit: 'experiencias', trend: 'up', change: '+34%' },
      { name: 'Visitantes Conectados', value: '234,567', unit: 'personas', trend: 'up', change: '+56%' },
      { name: 'Ingresos Generados', value: '$45.2M', unit: 'MXN', trend: 'up', change: '+28%' },
    ]
  },
  {
    category: 'Alcance Social',
    metrics: [
      { name: 'Usuarios Activos', value: '67,890', unit: 'usuarios', trend: 'up', change: '+41%' },
      { name: 'Estados Cubiertos', value: '32', unit: 'estados', trend: 'stable', change: '0%' },
      { name: 'Comunidades Beneficiadas', value: '1,247', unit: 'comunidades', trend: 'up', change: '+19%' },
    ]
  }
]

const successStories = [
  {
    id: '1',
    title: 'María Elena - De Mesera a Gerente de Hotel',
    location: 'Cancún, Quintana Roo',
    category: 'Desarrollo Profesional',
    image: '/images/story-maria.jpg',
    summary: 'Certificación en hospitalidad premium transformó su carrera en 8 meses.',
    impact: {
      salaryIncrease: '280%',
      timeframe: '8 meses',
      certification: 'Hospitalidad Premium'
    },
    quote: 'La plataforma AO cambió completamente mi vida profesional. Pasé de mesera a gerente de operaciones en un resort 5 estrellas.'
  },
  {
    id: '2',
    title: 'Cooperativa Artesanal Oaxaca',
    location: 'Oaxaca, Oaxaca',
    category: 'Turismo Comunitario',
    image: '/images/story-cooperativa.jpg',
    summary: '45 familias aumentaron sus ingresos 300% vendiendo artesanías a turistas.',
    impact: {
      families: '45',
      incomeIncrease: '300%',
      timeframe: '1 año'
    },
    quote: 'Ahora nuestras artesanías llegan a turistas de todo el mundo gracias a las experiencias verificadas de AO.'
  },
  {
    id: '3',
    title: 'Startup TechTour - Escalamiento Nacional',
    location: 'Ciudad de México',
    category: 'Innovación',
    image: '/images/story-startup.jpg',
    summary: 'Plataforma de realidad virtual para sitios arqueológicos creó 150 empleos.',
    impact: {
      jobsCreated: '150',
      investment: '$2.5M USD',
      sites: '25 sitios'
    },
    quote: 'El ecosistema de AO nos conectó con inversionistas y nos ayudó a expandir por todo México.'
  }
]

const regionalImpact = [
  { region: 'Península de Yucatán', jobs: 3456, experiences: 287, growth: '+45%' },
  { region: 'Riviera Maya', jobs: 2890, experiences: 234, growth: '+38%' },
  { region: 'Oaxaca', jobs: 1567, experiences: 189, growth: '+52%' },
  { region: 'Bajío', jobs: 2145, experiences: 156, growth: '+41%' },
  { region: 'Pacífico Norte', jobs: 1789, experiences: 134, growth: '+36%' },
  { region: 'Centro', jobs: 1234, experiences: 98, growth: '+29%' }
]

export default function ImpactoPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero relative bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container section text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarChartIcon className="w-12 h-12 text-secondary" />
              <h1 className="heading-xl text-white">Impacto AO</h1>
            </div>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Midiendo el impacto real en el desarrollo del turismo mexicano. 
              Datos concretos sobre empleo, educación y crecimiento económico.
            </p>
            
            {/* Key Impact Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">12,847</div>
                <div className="text-white/80">Empleos Generados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">15,234</div>
                <div className="text-white/80">Certificaciones</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">$45.2M</div>
                <div className="text-white/80">Ingresos MXN</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">67,890</div>
                <div className="text-white/80">Usuarios Activos</div>
              </div>
            </div>

            <Button size="lg" variant="secondary">
              Descargar Reporte Completo
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Metrics by Category */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Métricas de Impacto</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resultados cuantificables en las áreas más importantes del desarrollo turístico
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {impactMetrics.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-xl text-center text-primary">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.metrics.map((metric) => (
                      <div key={metric.name} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{metric.name}</h4>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary">
                              {metric.value}
                            </span>
                            <span className="text-sm text-gray-600">{metric.unit}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUpIcon className={`w-4 h-4 ${
                            metric.trend === 'up' ? 'text-green-500' : 
                            metric.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                          }`} />
                          <Badge variant={
                            metric.trend === 'up' ? 'success' : 
                            metric.trend === 'down' ? 'error' : 'default'
                          } className="text-xs">
                            {metric.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Historias de Éxito</h2>
            <p className="text-xl text-gray-600">
              Casos reales de transformación gracias a la plataforma AO
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <StarIcon className="w-16 h-16 text-white" />
                  </div>
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {story.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {story.location}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{story.summary}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4 p-3 bg-gray-50 rounded-lg">
                    {Object.entries(story.impact).map(([key, value]) => (
                      <div key={key}>
                        <div className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                        <div className="text-primary font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="italic text-sm text-gray-700 border-l-4 border-primary pl-4 mb-4">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>

                  <Button variant="outline" size="sm" className="w-full">
                    Leer Historia Completa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Impact */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Impacto por Región</h2>
            <p className="text-xl text-gray-600">
              Distribución geográfica del impacto de AO en todo México
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalImpact.map((region) => (
              <Card key={region.region}>
                <CardHeader>
                  <CardTitle className="text-lg text-center">{region.region}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">{region.jobs.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Empleos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{region.experiences}</div>
                      <div className="text-sm text-gray-600">Experiencias</div>
                    </div>
                  </div>
                  <Badge variant="success" className="text-sm">
                    <TrendingUpIcon className="w-3 h-3 mr-1" />
                    {region.growth}
                  </Badge>
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
              ¿Quieres contribuir al impacto?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a la transformación del turismo mexicano y forma parte de estas historias de éxito
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Comenzar Mi Historia
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Compartir Testimonio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}