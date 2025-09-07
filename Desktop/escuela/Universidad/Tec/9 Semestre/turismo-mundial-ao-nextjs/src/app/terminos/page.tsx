import React from 'react'
import { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { FileTextIcon, CalendarIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Turismo Mundial AO',
  description: 'Términos y condiciones de uso de la plataforma Turismo Mundial AO. Conoce tus derechos y responsabilidades.',
}

export default function TerminosPage() {
  return (
    <Layout>
      {/* Header */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileTextIcon className="w-10 h-10 text-primary" />
              <h1 className="heading-xl">Términos y Condiciones</h1>
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
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Al acceder y utilizar la plataforma Turismo Mundial AO, usted acepta estos términos y condiciones en su totalidad. 
                      Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Descripción del Servicio</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Turismo Mundial AO es una plataforma oficial del Gobierno de México que conecta profesionales del turismo con 
                      oportunidades laborales, certificaciones y experiencias turísticas verificadas.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Registro y Cuenta de Usuario</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Debe proporcionar información precisa y actualizada al crear su cuenta</li>
                      <li>Es responsable de mantener la confidencialidad de sus credenciales</li>
                      <li>Debe notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
                      <li>Solo se permite una cuenta por usuario</li>
                      <li>Debe ser mayor de edad para crear una cuenta</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Uso Aceptable</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">Usted se compromete a:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                      <li>Utilizar la plataforma solo para fines legítimos y profesionales</li>
                      <li>No publicar contenido falso, engañoso o fraudulento</li>
                      <li>Respetar los derechos de propiedad intelectual</li>
                      <li>No interferir con el funcionamiento de la plataforma</li>
                      <li>No realizar actividades que puedan dañar la reputación del servicio</li>
                      <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacidad y Protección de Datos</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Su privacidad es importante para nosotros. Por favor, consulte nuestra{' '}
                      <Link href="/privacidad" className="text-primary hover:underline font-medium">
                        Política de Privacidad
                      </Link>{' '}
                      para entender cómo recopilamos, utilizamos y protegemos sus datos personales.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Servicios de Empleo</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Las oportunidades laborales son proporcionadas por terceros empleadores</li>
                      <li>No garantizamos la obtención de empleo a través de la plataforma</li>
                      <li>Los términos y condiciones de empleo son responsabilidad del empleador</li>
                      <li>Verificamos la legitimidad de los empleadores registrados</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Certificaciones y Cursos</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Los certificados emitidos están respaldados por organismos oficiales</li>
                      <li>Los pagos por cursos están sujetos a políticas de reembolso específicas</li>
                      <li>La validez de las certificaciones puede variar según el organismo emisor</li>
                      <li>Es responsabilidad del usuario completar los requisitos para obtener certificaciones</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Experiencias Turísticas</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Las experiencias son proporcionadas por operadores turísticos verificados</li>
                      <li>Las reservas están sujetas a disponibilidad y condiciones climáticas</li>
                      <li>Las políticas de cancelación varían según el proveedor</li>
                      <li>Los precios pueden cambiar sin previo aviso</li>
                      <li>Se requiere seguro de viaje para ciertas actividades</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Propiedad Intelectual</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Todo el contenido de esta plataforma, incluyendo textos, imágenes, logotipos y software, está protegido por 
                      derechos de autor y otras leyes de propiedad intelectual del Gobierno de México. No está permitida la 
                      reproducción sin autorización previa.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Pagos y Transacciones</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Todos los pagos se procesan de forma segura a través de proveedores certificados</li>
                      <li>Los precios incluyen impuestos cuando sea aplicable</li>
                      <li>Las transacciones internacionales pueden estar sujetas a comisiones adicionales</li>
                      <li>Los reembolsos se procesarán según las políticas específicas de cada servicio</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitación de Responsabilidad</h2>
                    <p className="text-gray-700 leading-relaxed">
                      La plataforma se proporciona &ldquo;tal como está&rdquo;. No garantizamos que el servicio sea ininterrumpido o libre de errores. 
                      No seremos responsables de daños indirectos, incidentales o consecuentes que puedan surgir del uso de la plataforma.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modificaciones</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor 
                      inmediatamente después de su publicación en la plataforma. Se notificará a los usuarios sobre cambios significativos.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Terminación</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Podemos suspender o terminar su acceso a la plataforma en caso de violación de estos términos o por cualquier otra 
                      razón, con o sin previo aviso. Usted puede cancelar su cuenta en cualquier momento desde su panel de usuario.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Resolución de Disputas</h2>
                    <p className="text-gray-700 leading-relaxed">
                      En caso de controversias, se priorizará la mediación y el arbitraje antes de proceder por vía judicial. 
                      Los usuarios tienen derecho a presentar quejas ante las autoridades competentes.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Ley Aplicable</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa será resuelta en los 
                      tribunales competentes de México, específicamente en la Ciudad de México.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contacto</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Si tiene preguntas sobre estos términos, puede contactarnos a través de nuestro{' '}
                      <Link href="/contacto" className="text-primary hover:underline font-medium">
                        Centro de Contacto
                      </Link>{' '}
                      o enviando un correo a legal@turismomundial.ao.gob.mx
                    </p>
                  </section>

                  <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Última actualización:</strong> Septiembre 2024<br />
                      <strong>Versión:</strong> 2.1<br />
                      <strong>Vigencia:</strong> A partir de la fecha de publicación
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