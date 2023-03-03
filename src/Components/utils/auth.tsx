import { User } from 'src/types/user.type'
export const LocalStorageEventTarget = new EventTarget()

export const saveAccessTokenLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('refresh_token')
  const clearLocalStorageEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

export const getAccessTokenLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const SetProfile = (Profile: User) => {
  return localStorage.setItem('profile', JSON.stringify(Profile))
}
export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const saveRefreshTokenLS = (refresh_token: string) => {
  return localStorage.setItem('refresh_token', refresh_token)
}

export const getRefreshTokenLS = () => {
  return localStorage.getItem('refresh_token') || ''
}
