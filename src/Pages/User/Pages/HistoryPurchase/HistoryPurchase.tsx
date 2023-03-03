import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import { purchaseApi } from 'src/Components/apis/purchases'
import { purchaseStatus } from 'src/Components/Contant.path/purchase'
import { useQueryParam } from 'src/hook/useQueryParam'
import { PurchaseStatus } from 'src/types/purchases.type'
import { path } from '../../../../Components/Contant.path/Path'
export const HistoryPurchase = () => {
  const queryParam: { status?: string } = useQueryParam()
  const status: number = Number(queryParam.status) || purchaseStatus.all
  const { data } = useQuery({
    queryKey: ['statusPurchase', status],
    queryFn: () => purchaseApi.getPurchaseList({ status: status as PurchaseStatus })
  })
  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
        <Link
          to={{
            pathname: path.historyPurchases,
            search: createSearchParams({
              status: String(purchaseStatus.all)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange': status === purchaseStatus.all,
            'border-b-black text-gray-900': status !== purchaseStatus.all
          })}
        >
          Tất cả
        </Link>
        <Link
          to={{
            pathname: path.historyPurchases,
            search: createSearchParams({
              status: String(purchaseStatus.waitForConfirmation)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange': status === purchaseStatus.waitForConfirmation,
            'border-b-black text-gray-900': status !== purchaseStatus.waitForConfirmation
          })}
        >
          Chờ xác nhận
        </Link>
        <Link
          to={{
            pathname: path.historyPurchases,
            search: createSearchParams({
              status: String(purchaseStatus.waitForGetting)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange': status === purchaseStatus.waitForGetting,
            'border-b-black text-gray-900': status !== purchaseStatus.waitForGetting
          })}
        >
          Chờ lấy hàng
        </Link>
        <Link
          to={{
            pathname: path.historyPurchases,
            search: createSearchParams({
              status: String(purchaseStatus.inProgress)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange': status === purchaseStatus.inProgress,
            'border-b-black text-gray-900': status !== purchaseStatus.inProgress
          })}
        >
          Sản phẩm đang vận chuyển
        </Link>
        <Link
          to={{
            pathname: path.historyPurchases,
            search: createSearchParams({
              status: String(purchaseStatus.delivered)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange': status === purchaseStatus.delivered,
            'border-b-black text-gray-900': status !== purchaseStatus.delivered
          })}
        >
          San phẩm đã được giao
        </Link>
        <Link
          to={{
            pathname: path.historyPurchases,
            search: createSearchParams({
              status: String(purchaseStatus.cancelled)
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
            'border-b-orange text-orange': status === purchaseStatus.cancelled,
            'border-b-black text-gray-900': status !== purchaseStatus.cancelled
          })}
        >
          Sản phẩm đã bị hủy
        </Link>
      </div>
      <div>
        {data?.data.data?.map((purchase) => {
          return (
            <div key={purchase._id}>
              <Link to=''>
                <div className='flex-shrink-0'>
                  <div className='h-20 w-20 object-cover'>
                    <img src={purchase.product.image} alt='' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncale'>{purchase.product.name}</div>
                    <div className='mt-2'>{purchase.buy_count}</div>
                  </div>
                  <div className='flex-shirnk-0 ml-3'>
                    <div className='truncate text-gray-300'></div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
