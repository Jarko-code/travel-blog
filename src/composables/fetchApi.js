import { useAuthStore } from '@/stores/authStore'

export const fetchApi = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}

function request(method) {
  return async (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    const response = await fetch(url, requestOptions)
    return handleResponse(response)
  }
}

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

async function handleResponse(response) {
  const isJson = response.headers?.get('content-type')?.includes('application/json')
  const data = isJson ? await response.json() : null

  // check for error response
  if (!response.ok) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout()
    }

    // return a structured error object
    const error = {
      message: (data && data.message) || 'An error occurred',
      status: response.status,
      data: data || null,
    }
    return Promise.reject(error) // return the structured error object
  }

  return data
}
