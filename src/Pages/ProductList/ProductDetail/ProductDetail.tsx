import { useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { path } from '../../../Components/Contant.path/Path'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputNumber } from 'src/Components/InputNumber/InputNumber'
import { QuantityController } from 'src/Components/QuantityController/QuantityController'
import { formatNumberToSocialStyle, rateSale } from 'src/Components/utils/utils'
import { prodcutApi } from '../../../Components/apis/product.api'
import { getIdFromNameId } from '../../../Components/utils/utils'
import { Product } from '../Product/Product'
import { purchaseApi } from 'src/Components/apis/purchases'
import { queryClient } from 'src/main'
import { purchaseStatus } from 'src/Components/Contant.path/purchase'
import { useTranslation } from 'react-i18next'
export const ProductDetail = () => {
  const { t } = useTranslation(['product'])
  const [byCount, setByCount] = useState<number>(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const imageRef = useRef<HTMLImageElement>(null)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => prodcutApi.getProductDetails(id as string)
  })
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState([0, 5])
  const [activeImage, setActiveImage] = useState<string>('')
  const product = productDetailData?.data?.data

  const queryConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => prodcutApi.getProducts(queryConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const currentImage = useMemo(() => (product ? product?.images.slice(...currentIndex) : []), [product, currentIndex])

  const handleByCount = (value: number) => {
    setByCount(value)
  }

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const handleActive = (image: string) => {
    setActiveImage(image)
  }

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })

  const next = () => {
    if (product && currentIndex[1] < product?.images.length) {
      setCurrentIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
    console.log(currentIndex)
  }

  const prev = () => {
    if (currentIndex[0]) {
      setCurrentIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image

    // Cách 1 lấy offsetX , offsetY khi chúng ta sử lý đc bubble event
    const { offsetX, offsetY } = e.nativeEvent // lấy được các kích thước bao gồm kích thuocws ảnh , padding , border

    const top = (offsetY * (1 - naturalHeight)) / rect.height
    const left = (offsetX * (1 - naturalWidth)) / rect.width

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'

    // event bubble
    // cách 2 lấy offsetX, offsetY khi không cần sử lý bubble event
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: byCount },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] }) // cập nhật ngay sau khi gọi  get ra
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: byCount })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase?._id
      }
    })
  }
  if (!product) {
    return null
  }
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                  alt={activeImage}
                  src={activeImage}
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='.translate-y-1/2 absolute left-0 top-1/2 z-10 m-5 h-9 bg-black text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {product &&
                  currentImage.map((img) => {
                    const isActive = img === activeImage
                    return (
                      <div className='relative w-full pt-[100%] ' key={img} onMouseEnter={() => handleActive(img)}>
                        <img
                          className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white bg-white object-cover'
                          src={img}
                          alt={img}
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                      </div>
                    )
                  })}
                <button
                  className='.translate-y-1/2 absolute right-0 top-1/2 z-10 m-5 h-9 bg-black text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product?.name}</h1>
              <div className='ml-2 text-sm'>
                <span>{formatNumberToSocialStyle(product?.sold as number)}</span>
                <span className='ml-1'>Đã bán</span>
              </div>
              <div className='flex-item-centers mt-8 bg-gray-500 px-5 py-4'>
                <div className='text-gray-200 line-through'>đ{product?.price_before_discount}</div>
                <div className='ml3 text-3xl font-medium text-orange'>{product?.price}</div>
                <div className='ml-4 rounded-sm bg-orange px-1'>
                  {rateSale(product?.price_before_discount as number, product?.price as number)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>
                  <QuantityController
                    onDecrease={handleByCount}
                    onIncrease={handleByCount}
                    onType={handleByCount}
                    value={byCount}
                    max={product.quantity}
                  />
                  <div className='ml-6 text-sm text-gray-500'>
                    {product?.quantity} {t('product:available')}
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange'
                  onClick={handleAddToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4  h-12   rounded-sm border border-orange bg-orange' onClick={buyNow}>
                  Mua Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
          <div className='loading-loose mx-4 mt-12 mb-4 text-sm'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <h3>Sản phẩm liên quan</h3>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {productData?.data.data?.products.map((product) => {
              return (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// relative w-full pt-[100%] để có tấm ảnh có chiều cao bằng chiều rộng
