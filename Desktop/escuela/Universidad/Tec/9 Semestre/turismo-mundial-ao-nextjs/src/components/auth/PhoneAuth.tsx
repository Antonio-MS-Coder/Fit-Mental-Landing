"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PhoneIcon, ShieldCheckIcon } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface PhoneAuthProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
}

export function PhoneAuth({ mode, onSuccess }: PhoneAuthProps) {
  const [step, setStep] = useState<'phone' | 'verification'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [confirmationResult, setConfirmationResult] = useState<any>(null)
  const recaptchaRef = useRef<HTMLDivElement>(null)

  const { signInWithPhone, verifyPhoneCode } = useAuth()

  useEffect(() => {
    // Initialize reCAPTCHA (placeholder for now)
    if (recaptchaRef.current && step === 'phone') {
      // reCAPTCHA would be initialized here
    }
  }, [step])

  const formatPhoneNumber = (phone: string) => {
    // Simple format for Mexican numbers
    let cleaned = phone.replace(/\D/g, '')
    if (cleaned.startsWith('52')) {
      return `+${cleaned}`
    }
    if (cleaned.length === 10) {
      return `+52${cleaned}`
    }
    return `+${cleaned}`
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) {
      setError('Por favor ingresa un número de teléfono')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      // For now, simulate sending code
      setStep('verification')
      setError('')
    } catch (error) {
      console.error('Error sending SMS:', error)
      setError('Error al enviar el código SMS. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!verificationCode.trim()) {
      setError('Por favor ingresa el código de verificación')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // For now, simulate successful verification
      if (verificationCode === '123456') {
        onSuccess?.()
      } else {
        setError('Código incorrecto. El código de prueba es 123456')
      }
    } catch (error) {
      console.error('Error verifying code:', error)
      setError('Código de verificación inválido')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'phone') {
    return (
      <form onSubmit={handleSendCode} className="space-y-4">
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Número de Teléfono
          </label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-11"
              placeholder="+52 55 1234 5678"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Ingresa tu número con código de país (ej: +52 para México)
          </p>
        </div>

        <div ref={recaptchaRef} id="recaptcha-container"></div>

        <Button 
          type="submit" 
          className="w-full" 
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Código SMS'}
        </Button>

        <p className="text-xs text-center text-gray-500">
          Recibirás un código de verificación por SMS
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleVerifyCode} className="space-y-4">
      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="text-center mb-4">
        <ShieldCheckIcon className="h-12 w-12 text-primary mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          Hemos enviado un código de verificación a<br />
          <span className="font-medium">{phoneNumber}</span>
        </p>
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
          Código de Verificación
        </label>
        <Input
          id="code"
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="123456"
          className="text-center text-2xl tracking-widest"
          maxLength={6}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Verificando...' : 'Verificar Código'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setStep('phone')
            setError('')
            setVerificationCode('')
          }}
          className="text-sm text-primary hover:text-primary-600"
        >
          ← Cambiar número de teléfono
        </button>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">¿No recibiste el código?</p>
        <button
          type="button"
          onClick={handleSendCode}
          className="text-sm text-primary hover:text-primary-600"
          disabled={isSubmitting}
        >
          Reenviar código
        </button>
      </div>
    </form>
  )
}