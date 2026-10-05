const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')

const TOKEN_KEY = 'pvault.token'

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('The API is not configured. Set VITE_API_BASE_URL to your deployed API URL.')
  }

  const headers = new Headers(options.headers)
  const token = getAuthToken()

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = typeof payload === 'string'
      ? payload
      : payload.message || payload.error || 'The request could not be completed.'
    throw new Error(message)
  }

  return payload
}

export function registerUser(credentials) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function createSession(credentials) {
  return apiRequest('/sessions', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function getProfile() {
  return apiRequest('/users/me')
}

export function getVaultItems({ limit = 20, offset = 0, sort = '-createdAt', siteName = '' } = {}) {
  const query = new URLSearchParams({ limit, offset, sort })
  if (siteName) query.set('siteName', siteName)
  return apiRequest(`/vault-items?${query}`)
}

export function getVaultItem(itemId) {
  return apiRequest(`/vault-items/${encodeURIComponent(itemId)}`)
}

export function createVaultItem(item) {
  return apiRequest('/vault-items', { method: 'POST', body: JSON.stringify(item) })
}

export function updateVaultItem(itemId, item) {
  return apiRequest(`/vault-items/${encodeURIComponent(itemId)}`, {
    method: 'PATCH',
    body: JSON.stringify(item),
  })
}

export function deleteVaultItem(itemId) {
  return apiRequest(`/vault-items/${encodeURIComponent(itemId)}`, { method: 'DELETE' })
}

export function logoutSession() {
  return apiRequest('/sessions/current', { method: 'DELETE' })
}

export function changePassword(currentPassword, newPassword) {
  return apiRequest('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword }),
  })
}

export function getAuthLogs() {
  return apiRequest('/auth-logs')
}

export function deleteAuthLogs() {
  return apiRequest('/auth-logs', { method: 'DELETE' })
}

export async function downloadApiFile(path, fallbackName) {
  if (!API_BASE_URL) {
    throw new Error('The API is not configured. Set VITE_API_BASE_URL to your deployed API URL.')
  }

  const headers = new Headers()
  const token = getAuthToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_BASE_URL}${path}`, { headers })
  if (!response.ok) {
    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text()
    throw new Error(typeof payload === 'string'
      ? payload
      : payload.message || payload.error || 'The download could not be completed.')
  }

  const filename = response.headers.get('content-disposition')
    ?.match(/filename="?([^";]+)"?/i)?.[1] || fallbackName
  const objectUrl = URL.createObjectURL(await response.blob())
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filename
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token, rememberDevice) {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  const storage = rememberDevice ? localStorage : sessionStorage
  storage.setItem(TOKEN_KEY, token)
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}