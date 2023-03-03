import { isUndefined, omitBy } from 'lodash'
import { QueryConfig } from 'src/Pages/ProductList/ProductList'
import { useQueryParam } from './useQueryParam'

export const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page ?? '1',
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      category: queryParams.category,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  return queryConfig
}
