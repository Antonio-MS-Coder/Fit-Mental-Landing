"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function SignUpPage() {
  const { signInWithGoogle, user, needsRoleSelection, loading } = useAuth()
  const router = useRouter()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Redirect based on auth state
  React.useEffect(() => {
    if (!loading && user) {
      if (needsRoleSelection) {
        router.push('/auth/select-role')
      } else {
        router.push('/')
      }
    }
  }, [user, needsRoleSelection, loading, router])

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      await signInWithGoogle()
      // User will be redirected to select role
    } catch (error: any) {
      console.error('Google sign up error:', error)
      setError('Error al registrarse con Google. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AO</span>
            </div>
            <span className="text-xl font-bold text-primary">Turismo Mundial AO</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Únete a la Plataforma
          </h2>
          <p className="text-secondary-600">
            Conecta con oportunidades en el sector turismo
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            {/* Google Sign Up - Primary Option */}
            <div className="space-y-4">
              <Button
                type="button"
                className="w-full"
                size="lg"
                onClick={handleGoogleSignUp}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isSubmitting ? 'Creando cuenta...' : 'Continuar con Google'}
              </Button>
              
              <p className="text-xs text-center text-secondary-500 leading-relaxed">
                Al continuar, aceptas nuestros términos de servicio y política de privacidad.
                Después de autenticarte podrás elegir si buscas empleo o quieres contratar.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-secondary-600">
                ¿Ya tienes cuenta?{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-primary hover:text-primary-600 transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">¿Por qué unirte?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-secondary-700">Plataforma oficial del Gobierno de México</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-secondary-700">Miles de oportunidades verificadas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-secondary-700">Certificaciones profesionales reconocidas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-secondary-700">Registro 100% gratuito</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-secondary-500">
          <p>© 2025 Turismo Mundial AO - Gobierno de México</p>
        </div>
      </div>
    </div>
  )
}