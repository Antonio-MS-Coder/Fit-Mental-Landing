"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { EmployerService } from '@/services/firebase'
import { Employer } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  SearchIcon, 
  MapPinIcon, 
  UsersIcon,
  FilterIcon,
  StarIcon,
  BuildingIcon,
  ExternalLinkIcon,
  EyeIcon
} from 'lucide-react'

export default function EmployersPage() {
  const [employers, setEmployers] = useState<Employer[]>([])
  const [filteredEmployers, setFilteredEmployers] = useState<Employer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const industries = [
    'Hotelería y Alojamiento',
    'Restaurantes y Gastronomía',
    'Turismo de Aventura',
    'Agencias de Viajes',
    'Transporte Turístico',
    'Entretenimiento',
    'Ecoturismo',
    'Turismo Cultural',
    'Cruceros',
    'Consultoría Turística'
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
    'Tulum',
    'Los Cabos',
    'Mazatlán'
  ]

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-1000',
    '1000+'
  ]

  useEffect(() => {
    loadEmployers()
  }, [])

  useEffect(() => {
    filterEmployers()
  }, [employers, searchQuery, selectedIndustry, selectedLocation, selectedSize])

  const loadEmployers = async () => {
    try {
      setLoading(true)
      const employersData = await EmployerService.getEmployers({ limit: 50 })
      setEmployers(employersData)
    } catch (error) {
      console.error('Error loading employers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEmployers = () => {
    let filtered = employers

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(employer => 
        employer.name.toLowerCase().includes(query) ||
        employer.description.toLowerCase().includes(query) ||
        employer.industry.toLowerCase().includes(query) ||
        employer.location.toLowerCase().includes(query)
      )
    }

    if (selectedIndustry) {
      filtered = filtered.filter(employer => employer.industry === selectedIndustry)
    }

    if (selectedLocation) {
      filtered = filtered.filter(employer => employer.location === selectedLocation)
    }

    if (selectedSize) {
      filtered = filtered.filter(employer => employer.size === selectedSize)
    }

    setFilteredEmployers(filtered)
  }

  const getSizeLabel = (size: string) => {
    const labels: Record<string, string> = {
      '1-10': '1-10 empleados',
      '11-50': '11-50 empleados',
      '51-200': '51-200 empleados',
      '201-1000': '201-1000 empleados',
      '1000+': '1000+ empleados'
    }
    return labels[size] || size
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
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
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
            Empresas del Sector Turismo
          </h1>
          <p className="text-gray-600">
            Descubre las mejores empresas para desarrollar tu carrera en turismo
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
                    placeholder="Nombre, industria, ubicación..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industria
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">Todas las industrias</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
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

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamaño de Empresa
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                >
                  <option value="">Todos los tamaños</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>
                      {getSizeLabel(size)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedIndustry('')
                  setSelectedLocation('')
                  setSelectedSize('')
                }}
                className="w-full"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Employers List */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredEmployers.length} empresa{filteredEmployers.length !== 1 ? 's' : ''} encontrada{filteredEmployers.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-6">
              {filteredEmployers.map((employer) => (
                <Card key={employer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-xl">
                            {employer.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      {/* Company Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 hover:text-primary">
                                <Link href={`/employers/${employer.id}`}>
                                  {employer.name}
                                </Link>
                              </h3>
                              {employer.verified && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Verificado
                                </Badge>
                              )}
                              {employer.featured && (
                                <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                  Destacado
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-gray-600 font-medium mb-2">{employer.industry}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                {employer.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <UsersIcon className="h-4 w-4" />
                                {getSizeLabel(employer.size)}
                              </div>
                              {employer.rating && (
                                <div className="flex items-center gap-1">
                                  <StarIcon className="h-4 w-4 text-yellow-500" />
                                  <span>{employer.rating}/5 ({employer.reviewsCount} reseñas)</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <BuildingIcon className="h-4 w-4" />
                                <span>{employer.jobsCount} trabajo{employer.jobsCount !== 1 ? 's' : ''}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 line-clamp-2 mb-4">
                          {employer.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {employer.benefits.slice(0, 3).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {employer.benefits.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{employer.benefits.length - 3} más beneficios
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {employer.website && (
                              <a 
                                href={employer.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-primary"
                              >
                                <ExternalLinkIcon className="h-4 w-4" />
                                Sitio web
                              </a>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/employers/${employer.id}`}>
                                Ver Perfil
                              </Link>
                            </Button>
                            {employer.jobsCount > 0 && (
                              <Button size="sm" asChild>
                                <Link href={`/jobs?employer=${employer.id}`}>
                                  Ver Trabajos
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredEmployers.length === 0 && (
                <div className="text-center py-12">
                  <BuildingIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No se encontraron empresas
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Intenta ajustar tus filtros de búsqueda para ver más resultados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedIndustry('')
                      setSelectedLocation('')
                      setSelectedSize('')
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