import axios, { type AxiosInstance, AxiosError, isAxiosError, HttpStatusCode } from 'axios'
import { configs } from '../../Components/Contant.path/config'
import { toast } from 'react-toastify'
import {
  clearAccessTokenLS,
  saveAccessTokenLS,
  getAccessTokenLS,
  SetProfile,
  saveRefreshTokenLS,
  getRefreshTokenLS
} from './auth'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '../apis/auth.api'
import { RefreshTokenReponse } from 'src/types/auth.types'
import { isAxiosTokenError } from './utils'
import { ResponseApi } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.refreshTokenRequest = null
    // lấy accessToken trên LC sẽ lâu hơn là lấy trên Ram
    this.accessToken = getAccessTokenLS()
    this.refreshToken = getRefreshTokenLS()
    this.instance = axios.create({
      baseURL: configs.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10, // 10s
        'expire-refresh-token': 60 * 60 //  1h
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // khi refresh token bị lỗi thì nó sẽ nhảy vào phần lỗi trong inter, seter response

    this.instance.interceptors.response.use(
      (config) => {
        const { url } = config.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          // hạn chế gọi 2 lần refresh_token
          // nhưng vẫn có 1 số trường hợp bị gọi 2 lần
          // purchase error:1 -3
          // me error : 2-5
          // purchase gọi refreshtoken :3-4s
          // sau khi xong gọi lại purchase ở giây thứ 4
          // me gọi lại refresh token tại giây thứ 5 -6s

          this.accessToken = config.data.data.access_token
          this.refreshToken = config.data.data.refresh_token
          saveAccessTokenLS(this.accessToken)
          saveRefreshTokenLS(this.refreshToken)
          SetProfile(config.data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearAccessTokenLS()
        }
        return config
      },

      (error: AxiosError ) => {
        // chỉ toast không phải  lỗi của 422 và 401
       
        if (error.response?.status !== 422 && error.response?.status !== 401) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error?.message
          toast.error(message)
        }

        // lỗi 401 có rất nhiều trường hợp
        // token không đúng
        // không truyền token
        // token hết hạn

        // nếu lỗi 401 , lỗi token hết hạn

        if (isAxiosError(error)) {
          // // trường hợp token hết hạn và request đó không phải request token thì
          // // chúng ta mới tiến hành gọi refresh token
          const config = error.config
          console.log(config)
          const url = error?.config?.url || {}

          if (isAxiosTokenError<ResponseApi<{ name: string; message: string }>>(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // giữ lại refresh token trong 10s cho những request tiếp theo nếu 401 dùng
                  setTimeout(() => {
                    return (this.refreshTokenRequest = null)
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              if (config?.headers) {
                config.headers.authorization = access_token
                //  // tiếp tục gọi lại gọi lại request cũ vừa lỗi
                return this.instance(config)
              }

              // return this.instance({ ...config, headers: { ...config?.headers, authorization: access_token } })
            })
          }
          // trường hợp 401 khác
          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          clearAccessTokenLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data?.data?.message || error.response?.data?.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const access_token = String(res.data.data?.access_token)
        saveAccessTokenLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        // thất bại khi hết hạn cái refresh_token thì cho logout ra

        clearAccessTokenLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
