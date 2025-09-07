"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { UserIcon, BriefcaseIcon, CheckIcon } from 'lucide-react'

export default function SelectRolePage() {
  const { user, selectUserRole, loading, needsRoleSelection } = useAuth()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'job_seeker' | 'employer' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if user is not authenticated or doesn't need role selection
  useEffect(() => {
    if (!loading && (!user || !needsRoleSelection)) {
      router.push('/')
    }
  }, [user, loading, needsRoleSelection, router])

  const handleRoleSelect = (role: 'job_seeker' | 'employer') => {
    setSelectedRole(role)
  }

  const handleSubmit = async () => {
    if (!selectedRole) return
    
    setIsSubmitting(true)
    try {
      await selectUserRole(selectedRole)
      // Redirect will happen automatically via auth context
    } catch (error) {
      console.error('Error selecting role:', error)
      setIsSubmitting(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AO</span>
            </div>
            <span className="text-xl font-bold text-primary">Turismo Mundial AO</span>
          </Link>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Bienvenido, {user.displayName}!
            </h1>
            <p className="text-lg text-secondary-600 max-w-lg mx-auto">
              Para personalizar tu experiencia, cuéntanos cuál es tu objetivo principal:
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Seeker Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === 'job_seeker'
                ? 'border-primary bg-primary-50 shadow-lg'
                : 'border-gray-200 hover:border-primary hover:shadow-md'
            }`}
            onClick={() => handleRoleSelect('job_seeker')}
          >
            <CardContent className="p-8 text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                selectedRole === 'job_seeker' ? 'bg-primary' : 'bg-primary-100'
              }`}>
                <UserIcon className={`w-10 h-10 ${
                  selectedRole === 'job_seeker' ? 'text-white' : 'text-primary'
                }`} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Busco Empleo
              </h2>
              
              <p className="text-secondary-600 mb-6 leading-relaxed">
                Encuentra oportunidades laborales en el sector turismo, accede a certificaciones 
                y conecta con empresas de toda la República Mexicana.
              </p>
              
              <div className="text-left space-y-3">
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Búsqueda avanzada de empleos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Certificaciones profesionales</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Perfil profesional verificado</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Alertas de nuevas oportunidades</span>
                </div>
              </div>
              
              {selectedRole === 'job_seeker' && (
                <div className="mt-6 p-3 bg-primary-100 rounded-lg">
                  <p className="text-primary-800 text-sm font-medium">
                    ✓ Opción seleccionada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Employer Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === 'employer'
                ? 'border-primary bg-primary-50 shadow-lg'
                : 'border-gray-200 hover:border-primary hover:shadow-md'
            }`}
            onClick={() => handleRoleSelect('employer')}
          >
            <CardContent className="p-8 text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                selectedRole === 'employer' ? 'bg-primary' : 'bg-primary-100'
              }`}>
                <BriefcaseIcon className={`w-10 h-10 ${
                  selectedRole === 'employer' ? 'text-white' : 'text-primary'
                }`} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Quiero Contratar
              </h2>
              
              <p className="text-secondary-600 mb-6 leading-relaxed">
                Publica vacantes, encuentra el talento ideal para tu empresa turística 
                y accede a profesionales certificados en toda México.
              </p>
              
              <div className="text-left space-y-3">
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Publicación ilimitada de empleos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Base de candidatos verificados</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Panel de gestión avanzado</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-success-600" />
                  <span className="text-sm text-gray-700">Soporte prioritario</span>
                </div>
              </div>
              
              {selectedRole === 'employer' && (
                <div className="mt-6 p-3 bg-primary-100 rounded-lg">
                  <p className="text-primary-800 text-sm font-medium">
                    ✓ Opción seleccionada
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!selectedRole || isSubmitting}
            className="px-12 py-4 text-lg"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Configurando tu cuenta...' : 'Continuar'}
          </Button>
          
          <p className="text-sm text-secondary-500 mt-4">
            Podrás cambiar esta configuración más tarde en tu perfil
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-secondary-500">
          <p>© 2025 Turismo Mundial AO - Gobierno de México</p>
        </div>
      </div>
    </div>
  )
}