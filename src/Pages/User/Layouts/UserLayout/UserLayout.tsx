import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from 'src/Components/Footer/Footer'
import { RegisterHeader } from 'src/Components/RegisterHeader/RegisterHeader'
import { UserSideNav } from '../../Component/UserSideNav/UserSideNav'

export const UserLayout = () => {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
