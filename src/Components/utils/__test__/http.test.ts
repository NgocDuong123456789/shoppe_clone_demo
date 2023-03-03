import { HttpStatusCode } from 'axios'

import { describe, it, expect, beforeEach } from 'vitest'
import { saveAccessTokenLS, saveRefreshTokenLS } from '../auth'
import { Http } from '../http'

describe('htpp axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    http = new Http().instance
    localStorage.clear()
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTFkNmQ3YzYyMDM0MDg1MWI0OSIsImVtYWlsIjoib2sxMjM0NUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDE3OjA1OjAzLjIyNVoiLCJpYXQiOjE2Nzc3NzY3MDMsImV4cCI6MTY3Nzc3NjcwNH0.8SlKAJDPUzNn2CeJ9_VFOalOPGXo93OoJlhporGeu28'
  const refresh_token_1000d =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTFkNmQ3YzYyMDM0MDg1MWI0OSIsImVtYWlsIjoib2sxMjM0NUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDE3OjA4OjQ3LjA1MloiLCJpYXQiOjE2Nzc3NzY5MjcsImV4cCI6MTc2NDE3NjkyN30.oR1qFcLrF7qdthWroN0xYuV4jaUgnXLl-CwVugii4bM'
  it('Gọi Api', async () => {
    // không nên đụng đến thư mục api
    // vì chúng ta test riêng file http
    // thì chỉ nên dùng http thôi
    // vì lỡ như api có thay đổi gì đó
    // thì cũng không ảnh hưởng đến file test này

    const res = await http.get('products')

    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    // nên có 1 account giả
    // và 1 server test
    await http.post('login', {
      email: 'ok12345@gmail.com',
      password: '123123'
    })

    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('refresh token', async () => {
    saveAccessTokenLS(access_token_1s)
    saveRefreshTokenLS(refresh_token_1000d)
    const res = await http.get('me')

    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
