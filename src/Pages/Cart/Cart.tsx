import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { formatCurrency } from 'src/Components/utils/utils'
import { purchaseApi } from 'src/Components/apis/purchases'
import { purchaseStatus } from 'src/Components/Contant.path/purchase'
import { generateNameId } from 'src/Components/utils/utils'
import { QuantityController } from 'src/Components/QuantityController/QuantityController'
import { Button } from 'src/Components/Button/Button'
import { useEffect, useState } from 'react'
import produce from 'immer'
import { Purchase } from 'src/types/purchases.type'
interface ExtendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}
export const Cart = () => {
  const location= useLocation()
  const purchaseId= (location.state as {purchaseId:string } | null)?.purchaseId
  const [extendedPurchases, setExendedPurchases] = useState<ExtendedPurchases[]>([])
  const { data: purchaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchaseStatus.inCart as -1 })
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deleteProduct,
    onSuccess: () => {
      refetch()
    }
  })
  const purchaseInCart = purchaseInCartData?.data?.data
  const isAllChecked = extendedPurchases.every((check) => check.checked)
  const checkedPurchase = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchaseLenght = checkedPurchase.length
  const totalCheckPurchasePrice = checkedPurchase.reduce((sum, value) => {
    return sum + value.product.price * value.buy_count
  }, 0)
  const totalCheckPurchaseSavingPrice = checkedPurchase.reduce((sum, value) => {
    return sum + (value.product.price_before_discount - value.product.price) * value.buy_count
  }, 0)

  // const updatePurchase = useMutation({
  //   mutationFn:(body:{product_id:string , buy_count:number})=> purchaseApi.updateProduct(body),

  // })

  useEffect(() => {
    setExendedPurchases(purchaseInCart?.map((purchase) => ({ ...purchase, checked: false, disabled: false })) || [])
  }, [purchaseInCart])

  const handleChecked = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleDelete = (productId: number) => () => {
    const purchaseId = extendedPurchases[productId]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteMany = () => {
    const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  const handleBuyPurchase = () => {
    if (checkedPurchase.length > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  // const handleQuantity = (purchaseIndex: number, value: number) => {
  //   const purchase = extendedPurchases[purchaseIndex]
  //   setExendedPurchases(
  //     produce((draft) => {
  //       draft[purchaseIndex].disabled = true
  //     })
  //   )
  //   updatePurchase.mutate({ product_id: purchase._id, buy_count: value })
  //   setExendedPurchases(
  //     produce((draft) => {
  //       draft[purchaseIndex].disabled = false
  //     })
  //   )
  // }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6 bg-white'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số Lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            {extendedPurchases &&
              extendedPurchases.map((purchase, index) => {
                return (
                  <div
                    key={purchase._id}
                    className='grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex shrink-0 items-center justify-center'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase?.checked}
                            onChange={handleChecked(index)}
                          />
                        </div>
                        <div className='grow'>
                          <div className='flex'>
                            <Link
                              to={`product/${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='h-20 w-20 shrink-0'
                            >
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='grow px-5 pt-1 pb-2'>
                              <Link
                                to={`product/${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className=''
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid-col-5 grid items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              {formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.buy_count}
                            // onIncrease={(value) => handleQuantity(index, value)}
                            // onDecrease={(value) => handleQuantity(index, value)}
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>
                            {formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='transition-color bg-none text-blue-600 hover:text-orange'
                            onClick={handleDelete(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className='sticky bottom-0 z-10 flex items-center rounded-sm'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='bb-none mx-3 border-none'>Chọn tất cả</button>
            <button className=' mx-3 border-none bg-none' onClick={handleDeleteMany}>
              Xóa
            </button>
            <div className='ml-auto flex items-center'>
              <div>
                <div className='flex items-center justify-center'>
                  <div>Tổng thanh toán ({checkedPurchaseLenght} sản phẩm)</div>
                  <div className='ml-2 text-2xl text-orange'>{formatCurrency(totalCheckPurchasePrice)}</div>
                </div>
              </div>
              <div className='flex items-center justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiểm</div>
                <div className='ml-6 text-orange'>{formatCurrency(totalCheckPurchaseSavingPrice)}</div>
              </div>
              <Button className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'  onClick={handleBuyPurchase} disabled={buyProductMutation.isLoading}>
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
