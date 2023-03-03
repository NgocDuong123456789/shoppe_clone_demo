import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import { path } from 'src/Components/Contant.path/Path'

export const UserSideNav = () => {
  return (
    <div>
      <div className='flex items-center border-b-gray-200 py-4'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black', {
              'text-orange': isActive,
              black: !isActive
            })
          }
        >
          <img
            src='https://tse4.mm.bing.net/th?id=OIP.uL2XgWojP9CevRm9Sj1T7wHaJQ&pid=Api&P=0'
            alt=''
            className='h-full w-full object-cover'
          />
        </NavLink>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>cdthanh</div>
          <NavLink
            to={path.profile}
            className={({ isActive }) =>
              classNames('h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black', {
                'text-orange': isActive,
                black: !isActive
              })
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
                d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
              />
            </svg>
            SỬA HỒ SƠ
          </NavLink>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black', {
              'text-orange': isActive,
              black: !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://tse4.mm.bing.net/th?id=OIP.uL2XgWojP9CevRm9Sj1T7wHaJQ&pid=Api&P=0'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black', {
              'text-orange': isActive,
              black: !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://tse4.mm.bing.net/th?id=OIP.uL2XgWojP9CevRm9Sj1T7wHaJQ&pid=Api&P=0'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchases}
          className={({ isActive }) =>
            classNames('h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black', {
              'text-orange': isActive,
              black: !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://tse4.mm.bing.net/th?id=OIP.uL2XgWojP9CevRm9Sj1T7wHaJQ&pid=Api&P=0'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
