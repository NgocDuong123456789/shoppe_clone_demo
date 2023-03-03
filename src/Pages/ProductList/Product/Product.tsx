import { createSearchParams, Link } from 'react-router-dom'
import { ProductRating } from 'src/Components/ProductRating/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/Components/utils/utils'
import { Product as ProductItem } from 'src/types/products.type'
// import { path } from '../../../Components/Contant.path/Path'
interface ProductProps {
  product: ProductItem
}
export const Product = ({ product }: ProductProps) => {
  
  return (
    <Link to={`product/${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='rounded-sm bg-white shadow  transition-transform duration-100 hover:translate-y-[0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
            alt={product.name}
            src={product.image}
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[1.75rem] text-sm line-clamp-2 '>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-m-[50%] text-gray-500 line-through'>
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-sx'>đ</span>
              <span>{product.price}</span>
            </div>
          </div>
          <div className='jusstify-end mt-3 flex items-center'>
            <div className='flex items-center'>
              <ProductRating rating={product.rating} />
              <div className='ml-2 text-sm'>
                <span>{formatNumberToSocialStyle(product.sold)}</span>
                <span className='ml-1'>Đã bán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
