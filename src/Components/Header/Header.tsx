import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { logout } from '../apis/auth.api'
import { Popover } from '../Popover/Popover'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/App.context'
import { useContext } from 'react'
import { SetProfile } from '../utils/auth'
import { useQueryConfig } from 'src/hook/useQueryConfig'
import { useForm } from 'react-hook-form'
import { Register } from 'src/Pages/Register/Register'
import { Schema, schema } from '../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchaseStatus } from '../Contant.path/purchase'
import { purchaseApi } from '../apis/purchases'
import { formatCurrency } from '../utils/utils'
import { queryClient } from 'src/main'
import {path} from '../../Components/Contant.path/Path'
import { Nav } from '../Nav/Nav'
import { CartHeader } from '../CartHeader/CartHeader'

type formData = Pick<Schema, 'name'>

export const Header = () => {
  const nameSchema = schema.pick(['name'])

  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<formData>({
    defaultValues: { name: '' },
    resolver: yupResolver(nameSchema)
  })

  const navigate = useNavigate()
  const { setIsAuthenticationed, isAuthenticationed, setProfile, profile } = useContext(AppContext)

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/')
      }
    })
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig?.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })

  // khi chúng ta chuyển trang thì header chỉ bị re-render
  // chứ không bị unmount-mounting again
  // (trừ trường hợp logout rồi nhảy sang registerLayOut)
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchaseList({ status: purchaseStatus.inCart as -1 }),
    enabled: isAuthenticationed
  })
  const logoutMutation = useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      setIsAuthenticationed(false)
      setProfile(undefined)
      queryClient.refetchQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })
  const purchaseInCart = purchaseInCartData?.data.data

  return (
    <div className='bg-orange pb-5 pt-2'>
      <div className='container'>
        {/* <div className='flex justify-end'>
          <Popover
            className='flex cursor-pointer items-center py-1 hover:text-gray-300'
            renderPopover={
              <div className='shodow-sm   z-2000 relative z-10  border  border-gray-200 bg-white '>
                <div className='flex flex-col py-2 px-3 '>
                  <button className='cursor-pointer py-2 px-3 hover:text-orange'>Tiếng Việt</button>
                  <button className='cursor-pointer py-2 px-3 hover:text-orange'>English</button>
                </div>
              </div>
            }
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
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
          </Popover>
          {isAuthenticationed && (
            <Popover
              className='flex items-center py-1 hover:text-gray-300'
              renderPopover={
                <div className='shodow-sm   z-2000 relative z-10  border  border-gray-200 bg-white '>
                  <div className='flex flex-col py-2 px-3 '>
                    <Link className='cursor-pointer py-2 px-3 hover:text-orange' to='/profile'>
                      Tài khoản của tôi
                    </Link>
                    <Link to='/' className='cursor-pointer py-2 px-3 hover:text-orange'>
                      Đơn mua
                    </Link>
                    <button className='cursor-pointer py-2 px-3 hover:text-orange' onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              }
            >
              <div className='nr-2 m-6 h-6 flex-shrink-0'>
                <img
                  src='https://tse4.mm.bing.net/th?id=OIP.uL2XgWojP9CevRm9Sj1T7wHaJQ&pid=Api&P=0'
                  alt='ảnh'
                  className='m-full h-full rounded-full object-cover'
                />
              </div>
              <div>{profile?.email}</div>
            </Popover>
          )}

          {!isAuthenticationed && (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='h-4 border-r-[1px] border-r-white/40'></div>
              <Link to='/login' className='hover:text-white-70 mx-3 capitalize'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div> */}
        <CartHeader />

        <div className='mt-4 grid grid-cols-12 items-end gap-4'>
          <form action='' className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input type='text' id='' {...register('name')} />
              <button className='flex-shrink-0 rounded-sm py-2 px-6'>Search</button>
            </div>
          </form>

          <Popover
            className='cols-span-1'
            renderPopover={
              <div className='shodow-sm   z-2000 relative z-10  max-w-[400px]  border border-gray-200 bg-white text-sm '>
                {purchaseInCart ? (
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      {purchaseInCart.slice(0, 5).map((item) => {
                        return (
                          <div key={item._id} className='mt-4 flex'>
                            <div className='flex-shrink-0'>
                              <img src={item.product.image} alt='' className='h-11 w-11 object-cover' />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'>{item.product.name}</div>
                              <div className='ml-2 flex-shrink-0'>
                                <span className='text-orange'>{formatCurrency(item.product.price)}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className='flex items-center'>
                      <Link to={path.cart}>Xem Gio hàng</Link>
                      <button></button>
                    </div>
                  </div>
                ) : (
                  <div className='dib9cf'>
                    <img
                      src='url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png)'
                      alt=''
                    />
                    hello
                  </div>
                )}
              </div>
            }
          >
            <Link to='/' className=''>
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
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </Link>
          </Popover>
        </div>
      </div>
    </div>
  )
}

//
