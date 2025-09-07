import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { ShieldIcon, CalendarIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidad - Turismo Mundial AO',
  description: 'Política de privacidad de Turismo Mundial AO. Conoce cómo protegemos y manejamos tus datos personales.',
}

export default function PrivacidadPage() {
  return (
    <Layout>
      {/* Header */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ShieldIcon className="w-10 h-10 text-primary" />
              <h1 className="heading-xl">Política de Privacidad</h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-8">
              <CalendarIcon className="w-4 h-4" />
              <span>Última actualización: Septiembre 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 prose prose-lg max-w-none">
                <div className="space-y-8">
                  
                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introducción</h2>
                    <p className="text-gray-700 leading-relaxed">
                      En Turismo Mundial AO, respetamos su privacidad y estamos comprometidos con la protección de sus datos personales. 
                      Esta política explica cómo recopilamos, utilizamos, almacenamos y protegemos su información de acuerdo con la 
                      Ley Federal de Protección de Datos Personales en Posesión de los Particulares y normativas internacionales.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Información que Recopilamos</h2>
                    
                    <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Información Personal</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>Nombre completo y datos de contacto (teléfono, correo electrónico, dirección)</li>
                      <li>Información profesional y educativa (experiencia laboral, certificaciones)</li>
                      <li>Documentos de identificación para verificación (INE, pasaporte, CURP)</li>
                      <li>Información de certificaciones y habilidades profesionales</li>
                      <li>Datos financieros para procesamiento de pagos</li>
                      <li>Fotografías de perfil y documentos profesionales</li>
                    </ul>
                    
                    <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Información Técnica</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Direcciones IP y datos de ubicación geográfica</li>
                      <li>Información del navegador y dispositivo utilizado</li>
                      <li>Cookies y tecnologías de seguimiento similares</li>
                      <li>Registros de actividad y patrones de uso en la plataforma</li>
                      <li>Datos de rendimiento y diagnóstico del sistema</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cómo Utilizamos su Información</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Proporcionar y mejorar nuestros servicios de manera personalizada</li>
                      <li>Verificar su identidad y credenciales profesionales</li>
                      <li>Conectarlo con oportunidades laborales relevantes a su perfil</li>
                      <li>Enviar notificaciones sobre su cuenta, servicios y oportunidades</li>
                      <li>Procesar pagos y transacciones de manera segura</li>
                      <li>Cumplir con obligaciones legales y regulatorias</li>
                      <li>Prevenir fraude y garantizar la seguridad de la plataforma</li>
                      <li>Realizar análisis estadísticos para mejorar nuestros servicios</li>
                      <li>Contactarlo para encuestas de satisfacción y retroalimentación</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Compartir Información</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Compartimos su información únicamente en las siguientes circunstancias:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Con empleadores verificados cuando usted aplica a oportunidades específicas</li>
                      <li>Con instituciones educativas para verificación de certificaciones</li>
                      <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
                      <li>Con proveedores de experiencias turísticas para procesar reservas</li>
                      <li>Cuando sea requerido por ley o autoridades competentes</li>
                      <li>Con su consentimiento explícito para casos específicos</li>
                      <li>En caso de fusión, adquisición o transferencia de activos empresariales</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Protección de Datos</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Encriptación de datos en tránsito y en reposo mediante protocolos SSL/TLS</li>
                      <li>Control de acceso basado en roles y autenticación multifactor</li>
                      <li>Monitoreo continuo de seguridad y detección de amenazas</li>
                      <li>Auditorías regulares de seguridad por terceros certificados</li>
                      <li>Capacitación continua del personal en protección de datos</li>
                      <li>Respaldo seguro y planes de recuperación ante desastres</li>
                      <li>Cumplimiento con estándares internacionales de seguridad</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sus Derechos</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Como titular de datos personales, usted tiene derecho a:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos y cómo los utilizamos</li>
                      <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos en cualquier momento</li>
                      <li><strong>Cancelación:</strong> Solicitar la eliminación de sus datos bajo ciertas circunstancias</li>
                      <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos para fines específicos</li>
                      <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado y legible</li>
                      <li><strong>Limitación:</strong> Restringir el procesamiento de sus datos bajo ciertas condiciones</li>
                      <li><strong>Revocación:</strong> Retirar su consentimiento en cualquier momento</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Para ejercer estos derechos, puede contactarnos en{' '}
                      <strong>privacidad@turismomundial.ao.gob.mx</strong> o a través de su panel de usuario.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies y Tecnologías Similares</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Utilizamos cookies para:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>Mantener su sesión activa y recordar sus preferencias</li>
                      <li>Analizar el uso de la plataforma y mejorar la experiencia del usuario</li>
                      <li>Personalizar contenido y anuncios relevantes</li>
                      <li>Proporcionar funciones de redes sociales integradas</li>
                      <li>Realizar estudios de mercado y análisis de comportamiento</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                      Puede administrar las cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar 
                      ciertas cookies puede afectar la funcionalidad de la plataforma.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Retención de Datos</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Conservamos sus datos personales durante:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>El tiempo que mantenga una cuenta activa en la plataforma</li>
                      <li>El período requerido por ley para cumplir obligaciones fiscales y legales</li>
                      <li>El tiempo necesario para resolver disputas o hacer cumplir nuestros términos</li>
                      <li>Hasta 7 años después del cierre de cuenta para fines de auditoría</li>
                      <li>Datos anonimizados pueden conservarse indefinidamente para fines estadísticos</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Transferencias Internacionales</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de México. 
                      En estos casos, garantizamos estándares adecuados de protección mediante:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Cláusulas contractuales estándar aprobadas por autoridades competentes</li>
                      <li>Certificaciones de privacidad reconocidas internacionalmente</li>
                      <li>Decisiones de adecuación emitidas por autoridades mexicanas</li>
                      <li>Evaluaciones periódicas de los niveles de protección</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Menores de Edad</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente 
                      información personal de menores de edad. Si descubrimos que hemos recopilado datos de un menor, 
                      los eliminaremos inmediatamente y notificaremos a los padres o tutores cuando sea posible.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Violaciones de Seguridad</h2>
                    <p className="text-gray-700 leading-relaxed">
                      En caso de una violación de seguridad que pueda afectar sus datos personales, 
                      le notificaremos dentro de las 72 horas posteriores al descubrimiento del incidente, 
                      proporcionando detalles sobre las medidas tomadas y los pasos recomendados.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Cambios a esta Política</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Podemos actualizar esta política periódicamente para reflejar cambios en nuestras prácticas o 
                      en la legislación aplicable. Le notificaremos sobre cambios significativos a través de la 
                      plataforma, correo electrónico o avisos prominentes en nuestro sitio web con al menos 30 días de anticipación.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contacto del Responsable de Datos</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Si tiene preguntas sobre esta política o desea ejercer sus derechos, puede contactarnos:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <ul className="space-y-2 text-gray-700">
                        <li><strong>Correo electrónico:</strong> privacidad@turismomundial.ao.gob.mx</li>
                        <li><strong>Teléfono:</strong> +52 55 1234 5678 ext. 101</li>
                        <li><strong>Dirección:</strong> Secretaría de Turismo, Av. Presidente Masaryk 172, Col. Bosque de Chapultepec, Ciudad de México, CDMX 11580</li>
                        <li><strong>Horario de atención:</strong> Lunes a viernes de 9:00 a 17:00 horas</li>
                        <li><strong>Responsable de datos:</strong> Departamento de Protección de Datos Personales</li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Autoridad de Control</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Si considera que el tratamiento de sus datos personales no se ajusta a esta política o a la legislación vigente, 
                      tiene derecho a presentar una queja ante el Instituto Nacional de Transparencia, Acceso a la Información y 
                      Protección de Datos Personales (INAI) o la autoridad competente en su jurisdicción.
                    </p>
                  </section>

                  <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-gray-700 text-center">
                      <strong>Última actualización:</strong> Septiembre 2024<br />
                      <strong>Versión:</strong> 3.2<br />
                      <strong>Vigencia:</strong> A partir de la fecha de publicación<br />
                      <strong>Revisión programada:</strong> Marzo 2025
                    </p>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}