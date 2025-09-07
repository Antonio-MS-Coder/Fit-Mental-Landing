"use client"

import React from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BuildingIcon,
  PlusIcon,
  BriefcaseIcon,
  UsersIcon,
  EyeIcon,
  EditIcon,
  TrendingUpIcon,
  CalendarIcon,
  MapPinIcon,
  DollarSignIcon,
  ClockIcon
} from 'lucide-react'
import Link from 'next/link'

export default function EmployerDashboard() {
  const { userProfile } = useAuth()

  return (
    <ProtectedRoute allowedRoles={['employer']}>
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <BuildingIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userProfile?.companyName || userProfile?.displayName}
                    </h1>
                    <p className="text-secondary-600">
                      Panel de control empresarial
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/employer/profile">
                      <EditIcon className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/dashboard/employer/jobs/new">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Publicar Empleo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-secondary-600">Empleos Activos</p>
                          <p className="text-3xl font-bold text-gray-900">12</p>
                          <p className="text-sm text-success-600">+2 este mes</p>
                        </div>
                        <div className="bg-primary-50 rounded-full p-3">
                          <BriefcaseIcon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-secondary-600">Candidatos</p>
                          <p className="text-3xl font-bold text-gray-900">89</p>
                          <p className="text-sm text-warning-600">+15 esta semana</p>
                        </div>
                        <div className="bg-warning-50 rounded-full p-3">
                          <UsersIcon className="w-6 h-6 text-warning-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-secondary-600">Visualizaciones</p>
                          <p className="text-3xl font-bold text-gray-900">1.2K</p>
                          <p className="text-sm text-success-600">+18% vs. mes anterior</p>
                        </div>
                        <div className="bg-success-50 rounded-full p-3">
                          <EyeIcon className="w-6 h-6 text-success-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Job Posts */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Mis Empleos</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/employer/jobs">
                          Ver Todos
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Sample Job Cards */}
                      {[
                        {
                          title: "Gerente de Operaciones Turísticas",
                          location: "Cancún, Quintana Roo",
                          salary: "$35,000 - $45,000 MXN",
                          applicants: 23,
                          status: "Activo",
                          posted: "3 días",
                          views: 156
                        },
                        {
                          title: "Coordinador de Eventos",
                          location: "Puerto Vallarta, Jalisco",
                          salary: "$28,000 - $35,000 MXN",
                          applicants: 15,
                          status: "Activo",
                          posted: "1 semana",
                          views: 89
                        },
                        {
                          title: "Recepcionista Hotelero Bilingüe",
                          location: "Tulum, Quintana Roo",
                          salary: "$18,000 - $22,000 MXN",
                          applicants: 41,
                          status: "Pausado",
                          posted: "2 semanas",
                          views: 234
                        }
                      ].map((job, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  job.status === 'Activo' 
                                    ? 'bg-success-100 text-success-800' 
                                    : 'bg-warning-100 text-warning-800'
                                }`}>
                                  {job.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-secondary-600">
                                <span className="flex items-center gap-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSignIcon className="w-4 h-4" />
                                  {job.salary}
                                </span>
                                <span className="flex items-center gap-1">
                                  <UsersIcon className="w-4 h-4" />
                                  {job.applicants} candidatos
                                </span>
                                <span className="flex items-center gap-1">
                                  <EyeIcon className="w-4 h-4" />
                                  {job.views} vistas
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <EditIcon className="w-4 h-4 mr-1" />
                                Editar
                              </Button>
                              <Button size="sm">
                                Ver Candidatos
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Applications */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Aplicaciones Recientes</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/employer/applications">
                          Ver Todas
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          name: "María González",
                          position: "Gerente de Operaciones Turísticas",
                          experience: "5 años",
                          applied: "2 horas",
                          status: "Nuevo"
                        },
                        {
                          name: "Carlos Hernández",
                          position: "Coordinador de Eventos",
                          experience: "3 años",
                          applied: "5 horas",
                          status: "Revisando"
                        },
                        {
                          name: "Ana Martínez",
                          position: "Recepcionista Hotelero Bilingüe",
                          experience: "2 años",
                          applied: "1 día",
                          status: "Entrevista"
                        }
                      ].map((application, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary font-medium text-sm">
                                {application.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{application.name}</h4>
                              <p className="text-sm text-secondary-600">{application.position}</p>
                              <p className="text-xs text-secondary-500">
                                {application.experience} • Aplicó hace {application.applied}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              application.status === 'Nuevo' ? 'bg-blue-100 text-blue-800' :
                              application.status === 'Revisando' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {application.status}
                            </span>
                            <Button size="sm" variant="outline">
                              Ver Perfil
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Acciones Rápidas</h3>
                    <div className="space-y-3">
                      <Button asChild className="w-full justify-start">
                        <Link href="/dashboard/employer/jobs/new">
                          <PlusIcon className="w-4 h-4 mr-2" />
                          Publicar Nuevo Empleo
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard/employer/candidates">
                          <UsersIcon className="w-4 h-4 mr-2" />
                          Buscar Candidatos
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard/employer/analytics">
                          <TrendingUpIcon className="w-4 h-4 mr-2" />
                          Ver Analíticas
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Mi Empresa</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-secondary-500">Empresa:</span>
                        <p className="font-medium text-gray-900">
                          {userProfile?.companyName || 'No especificado'}
                        </p>
                      </div>
                      <div>
                        <span className="text-secondary-500">Email:</span>
                        <p className="text-gray-700">{userProfile?.email}</p>
                      </div>
                      <div>
                        <span className="text-secondary-500">Plan:</span>
                        <p className="font-medium text-primary">Básico</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      asChild
                    >
                      <Link href="/dashboard/employer/profile">
                        Editar Información
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Calendar */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Próximas Entrevistas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">María González</p>
                          <p className="text-xs text-secondary-600">Hoy, 3:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                        <CalendarIcon className="w-5 h-5 text-secondary-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Carlos Hernández</p>
                          <p className="text-xs text-secondary-600">Mañana, 10:00 AM</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      size="sm"
                    >
                      Ver Calendario
                    </Button>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Consejos</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-primary-50 rounded-lg">
                        <p className="text-primary-700">
                          <strong>Completa tu perfil empresarial</strong> - Agrega descripción y fotos
                        </p>
                      </div>
                      <div className="p-3 bg-success-50 rounded-lg">
                        <p className="text-success-700">
                          <strong>Responde rápido</strong> - Los candidatos valoran respuestas dentro de 24h
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}