import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// Third-party origins used by the HubSpot tracking code (and the chat/banner/forms it can load).
const hubspotScripts = [
  'https://js.hs-scripts.com',
  'https://*.hs-scripts.com',
  'https://js.hs-analytics.net',
  'https://js.hs-banner.com',
  'https://js.hscollectedforms.net',
  'https://js.hsadspixel.net',
  'https://*.hsforms.net',
  'https://*.hsappstatic.net',
  'https://*.usemessages.com',
  'https://*.hubspot.com',
]

// https://astro.build/config
export default defineConfig({
  site: 'https://kometsoft.com.my',
  vite: {
    plugins: [tailwindcss()],
  },
  // Emits a <meta http-equiv="content-security-policy"> on every page, with hashes for
  // Astro's own inline scripts/styles. GitHub Pages can't set response headers, so a
  // meta tag is the only option (frame-ancestors is therefore not enforceable here).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self' https://api.web3forms.com",
        "font-src 'self' https://fonts.cdnfonts.com",
        "img-src 'self' data: https://*.hubspot.com https://*.hsforms.com https://*.hsforms.net https://*.hs-banner.com https://*.usemessages.com",
        "connect-src 'self' https://api.web3forms.com https://*.hubspot.com https://*.hubapi.com https://*.hs-banner.com https://*.hscollectedforms.net https://*.hsforms.com https://*.hs-analytics.net https://*.usemessages.com",
        "frame-src https://www.google.com https://*.hubspot.com https://*.usemessages.com",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'", ...hubspotScripts],
      },
      styleDirective: {
        // HubSpot's chat/banner widgets set inline styles; style injection is low risk compared to script.
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },
})
