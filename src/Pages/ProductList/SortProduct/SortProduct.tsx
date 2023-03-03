import { sortBy as sort, order as orderPrice } from '../../../Components/Contant.path/Path'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import { omit } from 'lodash'
import { ProductListConfig } from 'src/types/products.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
interface Props {
  queryConfig: QueryConfig
  page_size: number
}

export const SortProduct = ({ queryConfig, page_size }: Props) => {
  const navigate = useNavigate()
  const { sort_by = sort.view, order } = queryConfig
  const isActionSortBy = (sortByValue: string) => {
    return sort_by === sortByValue
  }
  const handleSort = (sortByValue: string) => {
    navigate({
      pathname: '',
      search: createSearchParams(
        omit({
          ...queryConfig,
          sort_by: sortByValue
        },['order'])
       
      ).toString()
    })
  }

  const handlePriceOrder = (orderVaue: string) => {
    navigate({
      pathname: '',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sort.price,
        order: orderVaue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='item-center flex flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8  px-4 text-sm capitalize text-white', {
              'bg-orange text-white hover:bg-orange/80': isActionSortBy(sort.view),
              'bg-white text-black': !isActionSortBy(sort.view)
            })}
            
            onClick={() => handleSort(sort.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8  px-4 text-sm capitalize text-black', {
              'bg-orange text-white hover:bg-orange/80': isActionSortBy(sort?.sold),
              'bg-white text-black': !isActionSortBy(sort.sold)
            })}
            onClick={() => handleSort(sort.sold)}
          >
            Mới Nhât
          </button>
          <button
            className={classNames('h-8  px-4 text-sm capitalize text-black', {
              'bg-orange text-white hover:bg-orange/80': isActionSortBy(sort?.price),
              'bg-white text-black': !isActionSortBy(sort.price)
            })}
            onClick={() => handleSort(sort.price)}
          >
            Bán chạy
          </button>
          <select
            className='h-8 bg-white px-4 text-black'
            value={order || ''}
            onChange={(e) => handlePriceOrder(e.target.value)}
          >
            <option value='' disabled>
              Gía
            </option>
            <option value={orderPrice.asc}>Gía thấp tới cao</option>
            <option value={orderPrice.desc}>Gía cao tới thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 rounded-tl-sm px-3'></button>
          </div>
        </div>
      </div>
    </div>
  )
}
