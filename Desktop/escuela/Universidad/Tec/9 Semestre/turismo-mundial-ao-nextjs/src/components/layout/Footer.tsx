"use client"

import React from 'react'
import Link from 'next/link'
import { FOOTER_LINKS, CONTACT_INFO } from '@/data/constants'
import { MailIcon, PhoneIcon } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="main-footer bg-primary text-white" role="contentinfo">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="footer-content">
          <div className="footer-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Simplified Brand Section */}
            <div className="footer-brand lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">AO</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight">Turismo Mundial AO</h3>
                  <p className="text-sm text-white/70">Gobierno de México</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 max-w-lg text-sm leading-relaxed">
                Conectamos profesionales del turismo con oportunidades laborales, certificaciones y experiencias verificadas en México.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-white/60" />
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-white/60" />
                  <span className="text-white/80">{CONTACT_INFO.phone}</span>
                </div>
              </div>
            </div>

            {/* Modules */}
            <div className="footer-modules">
              <h4 className="text-lg font-semibold mb-4 text-white">Nuestros Módulos</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.modules.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-support">
              <h4 className="text-lg font-semibold mb-4 text-white">Soporte</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>


          {/* Bottom Footer */}
          <div className="footer-bottom pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="footer-legal">
                <p className="text-gray-300 text-sm">
                  &copy; {currentYear} Turismo Mundial AO. Una iniciativa del Gobierno de México.
                </p>
              </div>
              <div className="footer-social flex items-center gap-4">
                {FOOTER_LINKS.social.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.label}
                    className="social-icon w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center text-lg"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}