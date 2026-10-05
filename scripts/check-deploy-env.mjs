const isNetlify = process.env.NETLIFY === 'true'

if (!isNetlify) process.exit(0)

const apiBaseUrl = process.env.VITE_API_BASE_URL
if (!apiBaseUrl) {
  console.error('Netlify builds require VITE_API_BASE_URL to be set in the site environment variables.')
  process.exit(1)
}

let parsedApiUrl
try {
  parsedApiUrl = new URL(apiBaseUrl)
} catch {
  console.error('VITE_API_BASE_URL must be an absolute HTTPS URL ending in /api/v1.')
  process.exit(1)
}

if (parsedApiUrl.protocol !== 'https:' || !parsedApiUrl.pathname.replace(/\/$/, '').endsWith('/api/v1')) {
  console.error('VITE_API_BASE_URL must be an HTTPS URL ending in /api/v1.')
  process.exit(1)
}

if (
  process.env.CONTEXT === 'production'
  && parsedApiUrl.hostname === 'p-vault-kbnl80oxd-pana-backends-projects.vercel.app'
) {
  console.error('The production Netlify deploy cannot target the documented staging API.')
  process.exit(1)
}