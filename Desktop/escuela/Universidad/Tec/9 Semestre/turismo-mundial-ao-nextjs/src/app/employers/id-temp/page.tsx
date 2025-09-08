"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { EmployerService, JobService } from '@/services/firebase'
import { Employer, Job } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  MapPinIcon, 
  GlobeIcon,
  PhoneIcon,
  MailIcon,
  UsersIcon,
  CalendarIcon,
  BuildingIcon,
  StarIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  ExternalLinkIcon,
  HeartIcon,
  ShareIcon
} from 'lucide-react'

export default function EmployerDetailPage() {
  const params = useParams()
  const [employer, setEmployer] = useState<Employer | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [jobsLoading, setJobsLoading] = useState(true)
  
  const employerId = params.id as string

  useEffect(() => {
    if (employerId) {
      loadEmployerData()
    }
  }, [employerId])

  const loadEmployerData = async () => {
    try {
      setLoading(true)
      setJobsLoading(true)
      
      const [employerData, jobsData] = await Promise.all([
        EmployerService.getEmployer(employerId),
        JobService.getJobsByEmployer(employerId)
      ])
      
      setEmployer(employerData)
      setJobs(jobsData)
    } catch (error) {
      console.error('Error loading employer data:', error)
    } finally {
      setLoading(false)
      setJobsLoading(false)
    }
  }

  const formatSalary = (salary?: Job['salary']) => {
    if (!salary) return 'Salario no especificado'
    
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: salary.currency || 'MXN'
    })

    if (salary.min && salary.max) {
      return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`
    } else if (salary.min) {
      return `Desde ${formatter.format(salary.min)}`
    }

    return 'Salario no especificado'
  }

  const getJobTypeLabel = (type: Job['type']) => {
    const labels = {
      'tiempo-completo': 'Tiempo Completo',
      'medio-tiempo': 'Medio Tiempo',
      'contrato': 'Contrato',
      'practicas': 'Prácticas'
    }
    return labels[type] || type
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
              <div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!employer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BuildingIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Empresa no encontrada</h2>
          <p className="text-gray-600 mb-4">
            La empresa que buscas no existe o ha sido eliminada.
          </p>
          <Button asChild>
            <Link href="/employers">Volver a Empresas</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {employer.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{employer.name}</h1>
                    {employer.verified && (
                      <Badge className="bg-green-100 text-green-800">Verificado</Badge>
                    )}
                    {employer.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Destacado</Badge>
                    )}
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-4">{employer.industry}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{employer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-5 w-5" />
                      <span>{employer.size} empleados</span>
                    </div>
                    {employer.founded && (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        <span>Fundada en {employer.founded}</span>
                      </div>
                    )}
                    {employer.rating && (
                      <div className="flex items-center gap-2">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <span>{employer.rating}/5 ({employer.reviewsCount} reseñas)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <HeartIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Acerca de la Empresa
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {employer.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mission & Vision */}
            {(employer.mission || employer.vision) && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Misión y Visión
                  </h2>
                  <div className="space-y-4">
                    {employer.mission && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Misión</h3>
                        <p className="text-gray-700">{employer.mission}</p>
                      </div>
                    )}
                    {employer.vision && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Visión</h3>
                        <p className="text-gray-700">{employer.vision}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Values */}
            {employer.values && employer.values.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Nuestros Valores
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {employer.values.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {employer.benefits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Beneficios y Ventajas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {employer.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Job Openings */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Oportunidades Actuales ({jobs.length})
                  </h2>
                  {jobs.length > 0 && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/jobs">Ver Todas</Link>
                    </Button>
                  )}
                </div>

                {jobsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse border rounded-lg p-4">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.slice(0, 5).map((job) => (
                      <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 hover:text-primary">
                              <Link href={`/jobs/${job.id}`}>
                                {job.title}
                              </Link>
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <BriefcaseIcon className="h-4 w-4" />
                                {getJobTypeLabel(job.type)}
                              </div>
                              <span>{formatSalary(job.salary)}</span>
                            </div>
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/jobs/${job.id}`}>
                              Ver Detalles
                            </Link>
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 3} más
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Esta empresa no tiene oportunidades de trabajo activas en este momento.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Información de Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{employer.email}</span>
                  </div>
                  {employer.phone && (
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{employer.phone}</span>
                    </div>
                  )}
                  {employer.website && (
                    <div className="flex items-center gap-3">
                      <GlobeIcon className="h-5 w-5 text-gray-400" />
                      <a 
                        href={employer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-600 flex items-center gap-1"
                      >
                        Visitar sitio web
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Company Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Estadísticas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Empleados</span>
                    <span className="font-medium">{employer.size}</span>
                  </div>
                  {employer.founded && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fundada</span>
                      <span className="font-medium">{employer.founded}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trabajos Activos</span>
                    <span className="font-medium">{jobs.length}</span>
                  </div>
                  {employer.rating && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calificación</span>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{employer.rating}/5</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            {employer.socialMedia && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Redes Sociales</h3>
                  <div className="space-y-2">
                    {employer.socialMedia.linkedin && (
                      <a
                        href={employer.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary"
                      >
                        <span>LinkedIn</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    )}
                    {employer.socialMedia.facebook && (
                      <a
                        href={employer.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary"
                      >
                        <span>Facebook</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    )}
                    {employer.socialMedia.twitter && (
                      <a
                        href={employer.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary"
                      >
                        <span>Twitter</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    )}
                    {employer.socialMedia.instagram && (
                      <a
                        href={employer.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-primary"
                      >
                        <span>Instagram</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}