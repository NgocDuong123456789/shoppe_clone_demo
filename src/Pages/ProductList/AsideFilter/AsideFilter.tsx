import { path } from '../../../Components/Contant.path/Path'
import { QueryConfig } from '../ProductList'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { category } from 'src/types/category'
// import { Input } from 'src/Components/Input/Input'
import { Button } from 'src/Components/Button/Button'
import classNames from 'classnames'
import { InputNumber } from 'src/Components/InputNumber/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema, Schema } from '../../../Components/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import { RangingStart } from '../RantingStart/RangingStart'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'
interface Props {
  categories: category[]
  queryConfig: QueryConfig
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

/**
 rule validate
 nếu có price_min và price thì price_max >= price_min
 còn không thì có price_min thì không có có pric

 */

const priceSchema = schema.pick(['price_min', 'price_max'])
export const AsideFilter = ({ categories, queryConfig }: Props) => {
  const { t } = useTranslation('home') //  nếu muốn điền nhiều thì dùng ['home','product']
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false // tắt chế độ tự focus
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleDeleteAll = () => {
    reset()
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_min', 'price_max', 'rating_filter', 'category']
        )
      ).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='m-3 h-4  fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {t('aside filter.all categories')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        <li className='py-2 pl-2'>
          <Link to={path.home} className='relative px-2 font-semibold text-orange'>
            <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'>
              <polygon points='4 3.5 0 0 0 7'></polygon>
            </svg>
            Thời trang nam
          </Link>
        </li>
        {categories.map((categorys) => {
          const isActive = category === categorys._id
          return (
            <li className='py-2 pl-2' key={categorys._id}>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    category: categorys._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'font-semibold text-orange': isActive,
                  'text-black': !isActive
                })}
              >
                {categorys.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase '>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit='10'
            ></polyline>
          </g>
        </svg>
        {t('aside filter.filter')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='item-start flex'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    ref={field.ref}
                    type='text'
                    className='grow'
                    placeholder='đ từ'
                    name=''
                    // classNameInput='px-1  w-full py-1 text-sm outline-none border border-gray-300'
                    onChange={(event) => {
                      field.onChange(event), trigger('price_max') // validate lại form của mình
                    }}
                    // value={field.value}
                  />
                )
              }}
             /> 
            <div className='mx-2 mt-2 shrink-0'></div>
           <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    ref={field.ref}
                    type='text'
                    className='grow'
                    placeholder='đ đến'
                    name=''
                    // classNameInput='px-1  w-full py-1 text-sm outline-none border border-gray-300'
                    onChange={(event) => {
                      field.onChange(event), trigger('price_min')
                    }}
                    // value={field.value}
                  />
                )
              }}
            />
          </div>
          <div>{errors.price_min?.message}</div>
          <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
            ÁP DỤNG
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='text-sm'>Đánh Gía</div>

      <RangingStart queryConfig={queryConfig} />

      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button className='w-full bg-orange py-2 px-2 text-white' onClick={handleDeleteAll}>
        Xóa TẤT CẢ
      </Button>
    </div>
  )
}
