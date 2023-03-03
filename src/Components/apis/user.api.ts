import { User } from 'src/types/user.type'
import http from '../utils/http'
import { ResponseApi } from '../../types/utils.type'

interface BodyUpdate extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

export const userApi = {
  getProfile() {
    return http.get<ResponseApi<User>>('me')
  },
  updateProfile(body: BodyUpdate) {
    return http.put<ResponseApi<User>>('user', body)
  },
  upLoadAvatar(body: FormData) {
    return http.post<ResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
