import { Product, ProductList, ProductListConfig } from 'src/types/products.type'
import { ResponseApi } from 'src/types/utils.type'
import http from '../utils/http'

const URL = 'products'

export const prodcutApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<ResponseApi<ProductList>>(URL, {
      params: params
    })
  },
  
  getProductDetails: (id: string) => {
    return http.get<ResponseApi<Product>>(`${URL}/${id}`)
  }
}
