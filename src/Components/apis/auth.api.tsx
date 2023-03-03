import { Auth } from 'src/types/auth.types'
import http from '../utils/http'
export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const registerAccount = async (body: { email: string; password: string }) => {
  return await http.post<Auth>(URL_REGISTER, body)
}

export const loginAccount = async (body: { email: string; password: string }) => {
  return await http.post<Auth>(URL_LOGIN, body)
}

export const logout = async () => {
  return await http.post(URL_LOGOUT)
}
