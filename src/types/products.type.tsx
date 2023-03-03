export interface Product {
  _id: string
  image: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string

  createdAt: string
  updatedAt: string
  category: {
    _id: string
    name: string
    _v: number
  }
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  price_max?: number | string
  price_min?: number | string
  name?: string
  rating_filter?: number | string
  category?:string
}
