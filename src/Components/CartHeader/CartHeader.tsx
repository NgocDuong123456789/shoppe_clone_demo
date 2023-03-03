import { Link } from 'react-router-dom'
import { Nav } from '../Nav/Nav'

export const CartHeader = () => {
  return (
    <div className='border-b border-b-black'>
      <div className='bg-white text-blue-500'>
        <div className='container'>
          <Nav />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='fex items-end'>
            <Link to='/' className='h8 fill-orange lg:h-11'>
              <img src='https://tse2.mm.bing.net/th?id=OIP.5ItIOcgyq5w6ynwBwP4rBwHaJ4&pid=Api&P=0' alt='' />
            </Link>
            <div className='ml-5 text-xl lg:text-2xl'>Đăng ký</div>
          </nav>
        </div>
      </div>
    </div>
  )
}
