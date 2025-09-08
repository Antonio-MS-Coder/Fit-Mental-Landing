"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { JobService } from '@/services/firebase'
import { Job } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  SearchIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  DollarSignIcon,
  FilterIcon,
  EyeIcon
} from 'lucide-react'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  // Job categories for filtering
  const categories = [
    'hoteleria',
    'restauracion',
    'turismo-aventura',
    'agencias-viajes',
    'transporte-turistico',
    'entretenimiento',
    'guias-turisticos',
    'eventos',
    'marketing-turistico',
    'administracion'
  ]

  const jobTypes = [
    'tiempo-completo',
    'medio-tiempo',
    'contrato',
    'practicas'
  ]

  const locations = [
    'Ciudad de México',
    'Cancún',
    'Playa del Carmen',
    'Puerto Vallarta',
    'Acapulco',
    'Guadalajara',
    'Mérida',
    'Oaxaca',
    'San Miguel de Allende',
    'Tulum'
  ]

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchQuery, selectedCategory, selectedType, selectedLocation])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const jobsData = await JobService.getJobs({ limit: 50 })
      setJobs(jobsData)
    } catch (error) {
      console.error('Error loading jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = jobs

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory)
    }

    if (selectedType) {
      filtered = filtered.filter(job => job.type === selectedType)
    }

    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation)
    }

    setFilteredJobs(filtered)
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

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'hoteleria': 'Hotelería',
      'restauracion': 'Restauración',
      'turismo-aventura': 'Turismo de Aventura',
      'agencias-viajes': 'Agencias de Viajes',
      'transporte-turistico': 'Transporte Turístico',
      'entretenimiento': 'Entretenimiento',
      'guias-turisticos': 'Guías Turísticos',
      'eventos': 'Eventos',
      'marketing-turistico': 'Marketing Turístico',
      'administracion': 'Administración'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Oportunidades de Trabajo
          </h1>
          <p className="text-gray-600">
            Encuentra las mejores oportunidades en el sector turismo de México
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <FilterIcon className="h-5 w-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Filtros</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Título, empresa, ubicación..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {getCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Trabajo
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">Todos los tipos</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {getJobTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">Todas las ubicaciones</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                  setSelectedType('')
                  setSelectedLocation('')
                }}
                className="w-full"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredJobs.length} oportunidad{filteredJobs.length !== 1 ? 'es' : ''} encontrada{filteredJobs.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-primary">
                            <Link href={`/jobs/${job.id}`}>
                              {job.title}
                            </Link>
                          </h3>
                          {job.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Destacado
                            </Badge>
                          )}
                          {job.urgent && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              Urgente
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 font-medium mb-3">{job.company}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <BriefcaseIcon className="h-4 w-4" />
                            {getJobTypeLabel(job.type)}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSignIcon className="h-4 w-4" />
                            {formatSalary(job.salary)}
                          </div>
                          <div className="flex items-center gap-1">
                            <EyeIcon className="h-4 w-4" />
                            {job.views} visualizaciones
                          </div>
                        </div>
                        
                        <p className="text-gray-700 line-clamp-2 mb-4">
                          {job.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{getCategoryLabel(job.category)}</Badge>
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline">+{job.skills.length - 3} más</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4" />
                        Publicado hace {Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))} días
                      </div>
                      <Button asChild>
                        <Link href={`/jobs/${job.id}`}>
                          Ver Detalles
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron oportunidades
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Intenta ajustar tus filtros de búsqueda para ver más resultados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('')
                      setSelectedType('')
                      setSelectedLocation('')
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}