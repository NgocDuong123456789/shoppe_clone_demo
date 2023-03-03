import React from 'react'

export const Footer = () => {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <div className='lg:col-span-1'>
          <div>©© 2023 Shopee. Tất cả các quyền được bảo lưu. </div>
        </div>
        <div className='lg:col-span-2'>
          <div>
            Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
            Colombia Chile
          </div>
        </div>
      </div>
    </footer>
  )
}
