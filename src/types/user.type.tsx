type Role = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Role[]
  name?: string
  date_of_birth?: string // IOS 8601
  avatar?: string
  phone?: string
  address?: string
  email: string
  createdAt: string
  updatedAt: string
}
