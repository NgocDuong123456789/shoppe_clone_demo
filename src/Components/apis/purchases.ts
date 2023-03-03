import { Purchase, PurchaseListStatus, PurchaseStatus } from 'src/types/purchases.type'
import { ResponseApi } from 'src/types/utils.type'
import http from '../utils/http'

const URL = 'purchases'
export const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<ResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  
  getPurchaseList(params: { status: PurchaseStatus }) {
    return http.get<ResponseApi<Purchase[]>>(`${URL}`, {
      params
    })
  },

  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<ResponseApi<Purchase[]>>(`${URL}/buy-products`, body)
  },

  updateProduct(body: { product_id: string; buy_count: number }) {
    return http.put<ResponseApi<Purchase>>(`${URL}/update-product`, body)
  },
  deleteProduct(id: string[]) {
    return http.delete<ResponseApi<{ deleted_count: number }>>(`${URL}`, {
      data: id
    })
  }
}
