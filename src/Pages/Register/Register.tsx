import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
// import { rules } from 'src/Components/utils/rules'
import { Input } from 'src/Components/Input/Input'
import { schema, Schema } from '../../Components/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerAccount } from 'src/Components/apis/auth.api'
// không có tinh năng tree-shaking
// import { omit}  from 'lodash'
// import chỉ mỗi function omit
import  omit  from 'lodash/omit'
import { isAxiosAbleEntity } from 'src/Components/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/App.context'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/Components/Button/Button'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export const Register = () => {
  const navigate = useNavigate()
  const { setIsAuthenticationed, setProfile } = useContext(AppContext)
  const {
    // watch,
    setError,
    register,
    handleSubmit,
    // getValues,
    formState: { errors }
  } = useForm<FormData>({
   
     resolver: yupResolver(registerSchema)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        navigate('/')
        setIsAuthenticationed(true)
        setProfile(data.data.data?.user)
      },
      
      onError: (error) => {
        if (isAxiosAbleEntity<ResponseApi<Omit<FormData, 'conform_password'>>>(error)) {
          const formError = error?.response?.data?.data

          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Pick<FormData, 'email' | 'password'>) => registerAccount(body)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='shadow-sn rounded bg-white p-10' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>

              <Input
                name='email'
                register={register}
                type='email'
                placeholder='nhập email'
                className='mt-8'
                errorMessage={errors.email?.message}
                // rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                placeholder='nhập password'
                className='mt-8'
                errorMessage={errors.password?.message}
                // rules={rules.password}
              />

              <div className='mt-8'>
                <input
                  type='password'
                  placeholder='nhập lại password'
                  {...register(
                    'confirm_password'
                    // {
                    //   ...rules.confirm_password,
                    //   validate: (value) => {
                    //     if (value === getValues('password')) {
                    //       return true
                    //     }
                    //     return 'mật khẩu nhập lại sai'
                    //   }
                    // }
                  )}
                  className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.confirm_password?.message}</div>
              </div>
              {/* <Input
                name='confirm_password'
                register={register}
                type='password'
                placeholder='nhập lại password'
                className='mt-8'
                errorMessage={errors.confirm_password?.message}
                rules={rules.confirm_password}
              /> */}
              <div className='mt-3'>
                <Button
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                  className='w-full bg-red-500 py-4 px-2 text-center'
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='fex items-center'>
                  <span className='text-slate-400'>Bạn đã có tài khoản ?</span>
                  <Link className='text-red-400' to='/login'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
