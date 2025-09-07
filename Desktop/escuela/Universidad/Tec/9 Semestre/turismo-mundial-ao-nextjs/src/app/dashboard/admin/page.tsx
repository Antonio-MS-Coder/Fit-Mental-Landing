"use client"

import React from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ShieldIcon,
  UsersIcon,
  BriefcaseIcon,
  BuildingIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  SettingsIcon,
  BarChartIcon,
  FileTextIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { userProfile } = useAuth()

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <Layout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <ShieldIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Panel de Administración
                    </h1>
                    <p className="text-secondary-600">
                      Bienvenido, {userProfile?.displayName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/admin/settings">
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Configuración
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/dashboard/admin/reports">
                      <BarChartIcon className="w-4 h-4 mr-2" />
                      Reportes
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-600">Usuarios Totales</p>
                      <p className="text-3xl font-bold text-gray-900">2,847</p>
                      <p className="text-sm text-success-600">+12% este mes</p>
                    </div>
                    <div className="bg-primary-50 rounded-full p-3">
                      <UsersIcon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-600">Empleos Activos</p>
                      <p className="text-3xl font-bold text-gray-900">456</p>
                      <p className="text-sm text-warning-600">+8% esta semana</p>
                    </div>
                    <div className="bg-warning-50 rounded-full p-3">
                      <BriefcaseIcon className="w-6 h-6 text-warning-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-600">Empresas</p>
                      <p className="text-3xl font-bold text-gray-900">189</p>
                      <p className="text-sm text-success-600">+5% este mes</p>
                    </div>
                    <div className="bg-success-50 rounded-full p-3">
                      <BuildingIcon className="w-6 h-6 text-success-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-secondary-600">Tasa de Éxito</p>
                      <p className="text-3xl font-bold text-gray-900">73%</p>
                      <p className="text-sm text-success-600">+3% vs. mes anterior</p>
                    </div>
                    <div className="bg-secondary-50 rounded-full p-3">
                      <TrendingUpIcon className="w-6 h-6 text-secondary-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Recent Activity */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Actividad Reciente</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/activity">
                          Ver Todo
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          type: 'user',
                          message: 'Nuevo usuario registrado: María González (Buscador de empleo)',
                          time: '5 min',
                          status: 'success'
                        },
                        {
                          type: 'job',
                          message: 'Empleo publicado: "Gerente Hotelero" por Hotel Presidente',
                          time: '15 min',
                          status: 'info'
                        },
                        {
                          type: 'report',
                          message: 'Reporte de abuso enviado por usuario sobre empleo #1234',
                          time: '2 horas',
                          status: 'warning'
                        },
                        {
                          type: 'company',
                          message: 'Nueva empresa registrada: Maya Tours & Adventures',
                          time: '3 horas',
                          status: 'success'
                        },
                        {
                          type: 'system',
                          message: 'Actualización del sistema completada exitosamente',
                          time: '1 día',
                          status: 'success'
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                          <div className={`rounded-full p-2 ${
                            activity.status === 'success' ? 'bg-success-50' :
                            activity.status === 'warning' ? 'bg-warning-50' :
                            'bg-primary-50'
                          }`}>
                            {activity.type === 'user' && <UsersIcon className="w-4 h-4 text-success-600" />}
                            {activity.type === 'job' && <BriefcaseIcon className="w-4 h-4 text-primary" />}
                            {activity.type === 'report' && <AlertTriangleIcon className="w-4 h-4 text-warning-600" />}
                            {activity.type === 'company' && <BuildingIcon className="w-4 h-4 text-success-600" />}
                            {activity.type === 'system' && <SettingsIcon className="w-4 h-4 text-success-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <p className="text-xs text-secondary-500 mt-1">Hace {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Reviews */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Pendientes de Revisión</h2>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/admin/pending">
                          Ver Todos
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          type: 'job',
                          title: 'Empleo: "Guía Turístico Senior" - Adventure México',
                          description: 'Nuevo empleo requiere aprobación',
                          time: '2 horas',
                          urgent: false
                        },
                        {
                          type: 'company',
                          title: 'Empresa: "Tropical Experiences LLC"',
                          description: 'Verificación de documentos pendiente',
                          time: '5 horas',
                          urgent: true
                        },
                        {
                          type: 'report',
                          title: 'Reporte: Contenido inapropiado en empleo #5678',
                          description: 'Usuario reportó descripción engañosa',
                          time: '1 día',
                          urgent: true
                        }
                      ].map((item, index) => (
                        <div key={index} className={`border rounded-lg p-4 ${
                          item.urgent ? 'border-warning-200 bg-warning-50' : 'border-gray-200'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                {item.urgent && (
                                  <span className="px-2 py-1 text-xs bg-warning-100 text-warning-800 rounded-full">
                                    Urgente
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-secondary-600">{item.description}</p>
                              <p className="text-xs text-secondary-500 mt-2">Hace {item.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                              <Button size="sm">
                                Revisar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Estado del Sistema</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-success-200 rounded-lg bg-success-50">
                        <CheckCircleIcon className="w-8 h-8 text-success-600 mx-auto mb-2" />
                        <p className="font-medium text-success-800">Servidor Web</p>
                        <p className="text-sm text-success-600">Operativo</p>
                      </div>
                      <div className="text-center p-4 border border-success-200 rounded-lg bg-success-50">
                        <CheckCircleIcon className="w-8 h-8 text-success-600 mx-auto mb-2" />
                        <p className="font-medium text-success-800">Base de Datos</p>
                        <p className="text-sm text-success-600">Operativo</p>
                      </div>
                      <div className="text-center p-4 border border-warning-200 rounded-lg bg-warning-50">
                        <ClockIcon className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                        <p className="font-medium text-warning-800">Email Service</p>
                        <p className="text-sm text-warning-600">Lento</p>
                      </div>
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
                        <Link href="/dashboard/admin/users">
                          <UsersIcon className="w-4 h-4 mr-2" />
                          Gestionar Usuarios
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard/admin/jobs">
                          <BriefcaseIcon className="w-4 h-4 mr-2" />
                          Moderar Empleos
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard/admin/companies">
                          <BuildingIcon className="w-4 h-4 mr-2" />
                          Verificar Empresas
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full justify-start">
                        <Link href="/dashboard/admin/reports">
                          <FileTextIcon className="w-4 h-4 mr-2" />
                          Reportes Analíticos
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Support Tickets */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Tickets de Soporte</h3>
                      <span className="bg-error-100 text-error-800 text-xs px-2 py-1 rounded-full">
                        3 Nuevos
                      </span>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          user: "Carlos M.",
                          subject: "No puedo subir mi CV",
                          priority: "Alta",
                          time: "30 min"
                        },
                        {
                          user: "Hotel Paradise",
                          subject: "Error al publicar empleo",
                          priority: "Media",
                          time: "2 horas"
                        },
                        {
                          user: "Ana L.",
                          subject: "Problema con notificaciones",
                          priority: "Baja",
                          time: "5 horas"
                        }
                      ].map((ticket, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{ticket.user}</p>
                              <p className="text-xs text-secondary-600">{ticket.subject}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              ticket.priority === 'Alta' ? 'bg-error-100 text-error-800' :
                              ticket.priority === 'Media' ? 'bg-warning-100 text-warning-800' :
                              'bg-secondary-100 text-secondary-800'
                            }`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <p className="text-xs text-secondary-500 mt-1">Hace {ticket.time}</p>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      size="sm"
                      asChild
                    >
                      <Link href="/dashboard/admin/support">
                        Ver Todos los Tickets
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Platform Stats */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Estadísticas de Hoy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Nuevos registros</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Empleos publicados</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Aplicaciones enviadas</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-600">Tiempo promedio sesión</span>
                        <span className="font-medium">12m 34s</span>
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