import classNames from 'classnames'
import { path } from '../Contant.path/Path'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/Pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  page_size: number
}

const RANGE = 2
export const Paginate = ({ queryConfig, page_size }: Props) => {
  const page = Number(queryConfig.page)
  const rederPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(page_size)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1) {
          if (pageNumber > RANGE + page && pageNumber < page_size - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page > RANGE * 2 + 1 && page < page_size - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < page_size - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= page_size - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          }
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='felx mt-6 flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-2 cursor-not-allowed cursor-pointer rounded bg-white px-3 py-2 shadow-sm '>prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'
        >
          prev
        </Link>
      )}

      {rederPagination()}
      {page === page_size ? (
        <span className='mx-2 cursor-not-allowed cursor-pointer rounded bg-white px-3 py-2 shadow-sm '>prev</span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'
        >
          prev
        </Link>
      )}
    </div>
  )
}
