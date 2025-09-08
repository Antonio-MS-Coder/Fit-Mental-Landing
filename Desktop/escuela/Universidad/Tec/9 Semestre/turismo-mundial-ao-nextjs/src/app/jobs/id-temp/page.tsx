"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { JobService, EmployerService, ApplicationService } from '@/services/firebase'
import { Job, Employer } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  DollarSignIcon,
  BuildingIcon,
  CalendarIcon,
  EyeIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  GlobeIcon,
  UsersIcon
} from 'lucide-react'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, userProfile } = useAuth()
  
  const [job, setJob] = useState<Job | null>(null)
  const [employer, setEmployer] = useState<Employer | null>(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  
  const jobId = params.id as string

  useEffect(() => {
    if (jobId) {
      loadJobDetails()
    }
  }, [jobId])

  useEffect(() => {
    if (job && user) {
      checkApplicationStatus()
    }
  }, [job, user])

  const loadJobDetails = async () => {
    try {
      setLoading(true)
      const jobData = await JobService.getJob(jobId)
      
      if (jobData) {
        setJob(jobData)
        
        // Load employer details
        const employerData = await EmployerService.getEmployer(jobData.employerId)
        setEmployer(employerData)
      }
    } catch (error) {
      console.error('Error loading job details:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkApplicationStatus = async () => {
    if (!user || !job) return
    
    try {
      const applied = await ApplicationService.hasUserApplied(user.uid, job.id)
      setHasApplied(applied)
    } catch (error) {
      console.error('Error checking application status:', error)
    }
  }

  const handleApply = async () => {
    if (!user || !userProfile || !job) {
      router.push('/auth/signin')
      return
    }

    if (userProfile.role !== 'job_seeker') {
      alert('Solo los buscadores de empleo pueden aplicar a trabajos')
      return
    }

    try {
      setApplying(true)
      
      const applicationData = {
        jobId: job.id,
        userId: user.uid,
        employerId: job.employerId,
        status: 'pending' as const,
        appliedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const applicationId = await ApplicationService.createApplication(applicationData)
      
      if (applicationId) {
        setHasApplied(true)
        alert('¡Aplicación enviada exitosamente!')
      } else {
        alert('Error al enviar la aplicación. Intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error applying to job:', error)
      alert('Error al enviar la aplicación. Intenta de nuevo.')
    } finally {
      setApplying(false)
    }
  }

  const formatSalary = (salary?: Job['salary']) => {
    if (!salary) return 'Salario no especificado'
    
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: salary.currency || 'MXN'
    })

    if (salary.min && salary.max) {
      return `${formatter.format(salary.min)} - ${formatter.format(salary.max)} por ${salary.period || 'mes'}`
    } else if (salary.min) {
      return `Desde ${formatter.format(salary.min)} por ${salary.period || 'mes'}`
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trabajo no encontrado</h2>
          <p className="text-gray-600 mb-4">
            El trabajo que buscas no existe o ha sido eliminado.
          </p>
          <Button asChild>
            <Link href="/jobs">Volver a Trabajos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()} className="gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            Volver
          </Button>
        </div>

        {/* Job Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                  {job.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">Destacado</Badge>
                  )}
                  {job.urgent && (
                    <Badge className="bg-red-100 text-red-800">Urgente</Badge>
                  )}
                  {job.verified && (
                    <Badge className="bg-green-100 text-green-800 gap-1">
                      <CheckCircleIcon className="h-3 w-3" />
                      Verificado
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <BuildingIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-xl font-semibold text-gray-800">{job.company}</span>
                  {employer && (
                    <Link 
                      href={`/employers/${employer.id}`}
                      className="text-primary hover:text-primary-600 text-sm"
                    >
                      Ver perfil de empresa
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>{getJobTypeLabel(job.type)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <EyeIcon className="h-4 w-4" />
                    <span>{job.views} visualizaciones</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      Publicado hace {Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))} días
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BookmarkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ShareIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="border-t pt-6">
              {hasApplied ? (
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span className="font-medium">Ya aplicaste a este trabajo</span>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  onClick={handleApply}
                  loading={applying}
                  disabled={applying}
                  className="w-full md:w-auto"
                >
                  {applying ? 'Aplicando...' : 'Aplicar Ahora'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Descripción del Trabajo
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {job.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Responsabilidades
                  </h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requisitos
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Beneficios
                  </h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Detalles del Trabajo</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Experiencia Requerida
                    </label>
                    <p className="text-gray-900">{job.experience}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Educación
                    </label>
                    <p className="text-gray-900">{job.education}</p>
                  </div>

                  {job.languages && job.languages.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Idiomas
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {job.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Trabajo Remoto
                    </label>
                    <p className="text-gray-900">
                      {job.remote ? 'Disponible' : 'No disponible'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {job.skills.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Habilidades Requeridas</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Employer Info */}
            {employer && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Acerca de la Empresa</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{employer.name}</h4>
                      <p className="text-sm text-gray-600">{employer.industry}</p>
                    </div>
                    
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {employer.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UsersIcon className="h-4 w-4" />
                      <span>{employer.size} empleados</span>
                    </div>

                    {employer.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <GlobeIcon className="h-4 w-4 text-gray-400" />
                        <a 
                          href={employer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-600"
                        >
                          Visitar sitio web
                        </a>
                      </div>
                    )}

                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/employers/${employer.id}`}>
                        Ver perfil completo
                      </Link>
                    </Button>
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