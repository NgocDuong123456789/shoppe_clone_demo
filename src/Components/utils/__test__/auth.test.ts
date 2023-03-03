
import { beforeEach,describe, expect, it } from 'vitest'
import {
  clearAccessTokenLS,
  getAccessTokenLS,
  getRefreshTokenLS,
  saveAccessTokenLS,
  saveRefreshTokenLS,
  SetProfile
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTFkNmQ3YzYyMDM0MDg1MWI0OSIsImVtYWlsIjoib2sxMjM0NUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDE1OjIzOjI2LjQ2MFoiLCJpYXQiOjE2Nzc3NzA2MDYsImV4cCI6MTY3Nzc3MDYxNn0.lJ-O11FEtYX0YC5Tu0Skv7EV6aW6qZaFu6xtwAZTwNs'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWYzNTFkNmQ3YzYyMDM0MDg1MWI0OSIsImVtYWlsIjoib2sxMjM0NUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDE1OjIzOjI2LjQ2MFoiLCJpYXQiOjE2Nzc3NzA2MDYsImV4cCI6MTY3Nzc3NDIwNn0.ymsCNKImILnQ2k3vXHcW6zgbtJEoKy3A8jB_wLg73Rg'
const profile =
  '{"_id":"63ef351d6d7c620340851b49","roles":["User"],"email":"ok12345@gmail.com","createdAt":"2023-02-17T08:04:45.229Z","updatedAt":"2023-03-01T03:27:57.032Z","__v":0,"address":"43434343","date_of_birth":"1992-02-15T17:00:00.000Z","phone":"343434343","name":"duong","avatar":"ea31b7dc-b187-40db-9134-9c49bf7d456a.png"}'
beforeEach(() =>{
    localStorage.clear()
})
describe('saveAccessTokenLS', () => {
  it('access_token được set vào localstorage', () => {
    saveAccessTokenLS(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('getAccessTokenLS', () => {
  it('access_token được lấy ra', () => {
    saveAccessTokenLS(access_token)
    getAccessTokenLS()
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('saveRefreshTokenLS', () => {
  it('refresh_token được set vào localstorage', () => {
    saveRefreshTokenLS(refresh_token)
    expect(localStorage.getItem('refresh_token')).toEqual(refresh_token)
  })
})

describe('getRefreshTokenLS', () => {
  it('lấy refresh_token', () => {
     saveRefreshTokenLS(refresh_token)
    getRefreshTokenLS()
    expect(localStorage.getItem('refresh_token')).toEqual(refresh_token)
  })
})

describe('clearAccessTokenLS', () => {
  it('xóa access_token ', () => {
    saveAccessTokenLS(access_token)
    saveRefreshTokenLS(refresh_token)
    // set profile
    clearAccessTokenLS()
    expect(getAccessTokenLS()).toBe('')
    expect(getRefreshTokenLS()).toBe('')
  })
})
