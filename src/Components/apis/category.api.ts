import http from '../utils/http'
import { ResponseApi } from 'src/types/utils.type'
import { category } from 'src/types/category'
const URL = 'categories'

export const categoryApi = {
  getCategory() {
    return http.get<ResponseApi<category[]>>(URL)
  }
}
