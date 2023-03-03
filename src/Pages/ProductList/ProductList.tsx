import { AsideFilter } from './AsideFilter/AsideFilter'
// import { omitBy, isUndefined } from 'lodash'
import { SortProduct } from './SortProduct/SortProduct'
import { useQuery } from '@tanstack/react-query'
import { prodcutApi } from 'src/Components/apis/product.api'
// import { useQueryParam } from 'src/hook/useQueryParam'
import { Product } from './Product/Product'
import { Paginate } from 'src/Components/Paginate/Paginate'
import { categoryApi } from 'src/Components/apis/category.api'
import { ProductListConfig } from '../../types/products.type'
// import { category } from 'src/types/category'
import { useQueryConfig } from 'src/hook/useQueryConfig'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export const ProductList = () => {
  const queryConfig = useQueryConfig()

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return prodcutApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategory()
    }
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              {dataCategory?.data.data && (
                <AsideFilter categories={dataCategory?.data.data} queryConfig={queryConfig} />
              )}
            </div>
            <div className='col-span-9'>
              <SortProduct queryConfig={queryConfig} page_size={data?.data?.data?.pagination?.page_size as number} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data?.data.data?.products.map((product, index) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Paginate queryConfig={queryConfig} page_size={data?.data?.data?.pagination?.page_size as number} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
