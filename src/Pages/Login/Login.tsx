// import { rules } from 'src/Components/utils/rules'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input } from 'src/Components/Input/Input'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/Components/apis/auth.api'
import { isAxiosAbleEntity } from '../../Components/utils/utils'
import { ResponseApi } from '../../types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/App.context'
import { Button } from 'src/Components/Button/Button'
import { Helmet } from 'react-helmet-async'
import { schema, Schema } from '../../Components/utils/rules'
// import { pick } from 'lodash'

type FormData = Pick<Schema, 'email' | 'password'>
const schemaLogin = schema.pick(['password', 'email'])

export const Login = () => {
  const { setIsAuthenticationed, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess(data) {
        setIsAuthenticationed(true)
        const mes = data?.data.data
        setProfile(mes?.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosAbleEntity<ResponseApi<FormData>>(error)) {
          const formError = error?.response?.data.data
          if (formError?.password) {
            setError('password', {
              type: 'server',
              message: formError.password
            })
          }

          if (formError?.email) {
            setError('email', {
              type: 'server',
              message: formError.email
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng nhập | Shoppe Clone</title>
        <meta name='description' content='Đăng nhập vào dự án shoppe clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='shadow-sn rounded bg-white p-10' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>

              <Input
                name='email'
                type='email'
                placeholder='nhập email'
                className='mt-8'
                errorMessage={errors.email?.message}
                //  rules={rules.email}
                register={register}
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

              <div className='mt-3'>
                <Button
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                  className='w-full bg-red-500 py-4 px-2 text-center'
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='fex items-center'>
                  <span className='text-slate-400'>Bạn đã có tài khoản ?</span>
                  <Link className='text-red-400' to='/register'>
                    Đăng Ký
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
