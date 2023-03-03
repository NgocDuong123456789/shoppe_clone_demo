import { ResponseApi } from './utils.type'
import { User } from './user.type'
export type Auth = ResponseApi<{
  access_token: string
  expires: string
  refresh_token: string
  user: User
  expires_refresh_toke: number
}>


export type RefreshTokenReponse=ResponseApi<{ access_token: string }>