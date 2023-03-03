import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/App.context'
import { queryClient } from 'src/main'
import { logout } from '../apis/auth.api'
import { purchaseStatus } from '../Contant.path/purchase'
import { Popover } from '../Popover/Popover'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'
export const Nav = () => {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  console.log(currentLanguage)
  const navigate = useNavigate()
  const { setIsAuthenticationed, isAuthenticationed, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      setIsAuthenticationed(false)
      setProfile(undefined)
      queryClient.refetchQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/')
      }
    })
  }
  const changeLange = (lng: 'en' | 'vi') => {
  
    i18n.changeLanguage(lng)
  }
  return (
    <div className='flex justify-end'>
      <Popover
        className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        renderPopover={
          <div className='shodow-sm   z-2000 relative z-10  border  border-gray-200 bg-white '>
            <div className='flex flex-col py-2 px-3 '>
              <button className='cursor-pointer py-2 px-3 hover:text-orange' onClick={() => changeLange('vi')}>
                Tiếng Việt
              </button>
              <button className='cursor-pointer py-2 px-3 hover:text-orange' onClick={() => changeLange('en')}>
                English
              </button>
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
        <span className='mx-1'>{currentLanguage}</span>
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
    </div>
  )
}
