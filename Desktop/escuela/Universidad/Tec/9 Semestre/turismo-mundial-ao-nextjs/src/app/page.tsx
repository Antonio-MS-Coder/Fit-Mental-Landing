import React from 'react'
import Link from 'next/link'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { NAVIGATION_ITEMS } from '@/data/constants'

export default function HomePage() {
  return (
    <Layout>
      {/* Minimal Government Banner */}
      <div className="bg-primary text-white py-2 text-sm" role="banner">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium">
              Sitio oficial del <span className="font-semibold">Gobierno de México</span>
            </span>
          </div>
        </div>
      </div>

      {/* Minimal Hero Section */}
      <section className="hero bg-white min-h-[80vh] flex items-center">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-8 leading-tight">
              Turismo Mundial <span className="text-secondary">AO</span>
            </h1>
            <p className="text-xl sm:text-2xl text-secondary-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Conectamos profesionales del turismo con oportunidades laborales, certificaciones y experiencias seguras en México.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                asChild 
                className="px-8 py-4"
              >
                <Link href="/trabaja">
                  Encuentra Trabajo
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="px-8 py-4"
              >
                <Link href="/explora-seguro">
                  Explora Seguro
                </Link>
              </Button>
            </div>
            
            <div className="text-center text-secondary-500 text-sm">
              50,000+ profesionales • Plataforma oficial • Datos protegidos
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Modules Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="modules-heading">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="modules-heading" className="text-3xl font-bold text-primary mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Herramientas profesionales para impulsar tu carrera en turismo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAVIGATION_ITEMS.map((module) => (
              <Card 
                key={module.href} 
                className="group bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <module.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {module.title}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-full"
                  >
                    <Link href={module.href}>
                      Explorar
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Stats Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">2,500+</div>
              <div className="text-secondary-600 text-sm">Empleos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">15,000+</div>
              <div className="text-secondary-600 text-sm">Certificaciones</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-secondary-600 text-sm">Experiencias</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">50,000+</div>
              <div className="text-secondary-600 text-sm">Usuarios</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-primary" aria-labelledby="cta-heading">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold text-white mb-6">
            ¿Listo para transformar tu carrera?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que han encontrado su oportunidad ideal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-50"
            >
              Comenzar Ahora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Conocer Más
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
