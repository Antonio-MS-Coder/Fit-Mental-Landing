"use client"

import React from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon, 
  BriefcaseIcon, 
  GraduationCapIcon, 
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  EditIcon,
  SearchIcon,
  BookmarkIcon,
  TrendingUpIcon
} from 'lucide-react'
import Link from 'next/link'

export default function JobSeekerDashboard() {
  const { userProfile } = useAuth()

  return (
    <ProtectedRoute allowedRoles={['job_seeker']}>
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      ¡Bienvenido, {userProfile?.displayName}!
                    </h1>
                    <p className="text-secondary-600">
                      Encuentra tu próxima oportunidad en turismo
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/job-seeker/profile">
                    <EditIcon className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button asChild className="h-auto p-4">
                        <Link href="/dashboard/job-seeker/jobs">
                          <div className="text-center">
                            <SearchIcon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">Buscar Empleos</div>
                          </div>
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="h-auto p-4">
                        <Link href="/dashboard/job-seeker/saved">
                          <div className="text-center">
                            <BookmarkIcon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">Empleos Guardados</div>
                          </div>
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="h-auto p-4">
                        <Link href="/dashboard/job-seeker/applications">
                          <div className="text-center">
                            <BriefcaseIcon className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-medium">Mis Postulaciones</div>
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Jobs */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Empleos Recomendados</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/job-seeker/jobs">
                          Ver Todos
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Sample Job Cards */}
                      {[
                        {
                          title: "Guía Turístico - Playa del Carmen",
                          company: "Maya Tours",
                          location: "Quintana Roo",
                          type: "Tiempo Completo",
                          posted: "2 días"
                        },
                        {
                          title: "Recepcionista Hotelero",
                          company: "Hotel Presidente",
                          location: "Ciudad de México",
                          type: "Tiempo Completo",
                          posted: "5 días"
                        },
                        {
                          title: "Coordinador de Eventos",
                          company: "Eventos & Turismo",
                          location: "Guadalajara",
                          type: "Medio Tiempo",
                          posted: "1 semana"
                        }
                      ].map((job, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                              <p className="text-secondary-600 mb-2">{job.company}</p>
                              <div className="flex items-center gap-4 text-sm text-secondary-500">
                                <span className="flex items-center gap-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  {job.location}
                                </span>
                                <span>{job.type}</span>
                                <span>Publicado hace {job.posted}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <BookmarkIcon className="w-4 h-4" />
                              </Button>
                              <Button size="sm">
                                Ver Detalles
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Mi Actividad</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="bg-primary-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <SearchIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">127</div>
                        <div className="text-sm text-secondary-600">Búsquedas</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-warning-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <BriefcaseIcon className="w-6 h-6 text-warning-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">8</div>
                        <div className="text-sm text-secondary-600">Postulaciones</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-success-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <BookmarkIcon className="w-6 h-6 text-success-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">15</div>
                        <div className="text-sm text-secondary-600">Guardados</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-secondary-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <TrendingUpIcon className="w-6 h-6 text-secondary-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">85%</div>
                        <div className="text-sm text-secondary-600">Perfil Completo</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Profile Summary */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Mi Perfil</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <MailIcon className="w-4 h-4 text-secondary-500" />
                        <span className="text-secondary-700">{userProfile?.email}</span>
                      </div>
                      {userProfile?.phone && (
                        <div className="flex items-center gap-3">
                          <PhoneIcon className="w-4 h-4 text-secondary-500" />
                          <span className="text-secondary-700">{userProfile.phone}</span>
                        </div>
                      )}
                      {userProfile?.location && (
                        <div className="flex items-center gap-3">
                          <MapPinIcon className="w-4 h-4 text-secondary-500" />
                          <span className="text-secondary-700">{userProfile.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      asChild
                    >
                      <Link href="/dashboard/job-seeker/profile">
                        Completar Perfil
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Certificaciones</h3>
                    <div className="text-center py-8">
                      <GraduationCapIcon className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                      <p className="text-secondary-600 text-sm mb-4">
                        Aún no tienes certificaciones
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/aprende">
                          Explorar Cursos
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Consejos</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-primary-50 rounded-lg">
                        <p className="text-primary-700">
                          <strong>Completa tu perfil</strong> - Los perfiles completos reciben 3x más visualizaciones
                        </p>
                      </div>
                      <div className="p-3 bg-success-50 rounded-lg">
                        <p className="text-success-700">
                          <strong>Actualiza tus habilidades</strong> - Obtén certificaciones para destacar
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