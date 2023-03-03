import { useForm } from 'react-hook-form'
import { Button } from 'src/Components/Button/Button'
import { Input } from 'src/Components/Input/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { User, userSchema } from '../../../../Components/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { userApi } from '../../../../Components/apis/user.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { isAxiosAbleEntity } from 'src/Components/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = Pick<User, 'password' | 'new_password' | 'confirm_password'>
const userSchemas = userSchema.pick(['password', 'new_password', 'confirm_password'])

export const ChangePasswork = () => {
  const {
    handleSubmit,
    register,
    // setValue,
    setError,
    control,
    reset,
    // watch,

    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(userSchemas)
  })
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_passowd']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosAbleEntity<ResponseApi<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Đổi mật khẩu</div>
      </div>
      <form className='md-flex-grow mt-8 flex flex-col-reverse md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'></div>
            </div>
          </div>

          <div className=' mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>mật khẩu cũ</div>
            <div className=' relative w-[80%] pl-5'>
              <Input
                className=''
                register={register}
                name='password'
                type="password"
                placeholder='mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className=' mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>mật khẩu mới</div>
            <div className=' relative w-[80%] pl-5'>
              <Input
                className=''
                register={register}
                name='new_password'
                type="password"
                placeholder='dia chi'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className=' mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>nhập lại mật khẩu mới</div>
            <div className=' relative w-[80%] pl-5'>
              <Input
                className=''
                type='password'
                register={register}
                name='confirm_password'
                placeholder='dia chi'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
        </div>

        <Button className='flex justify-center px-5 text-center text-white hover:bg-orange/80 md:w-72 md:bg-orange'>
          Lưu
        </Button>
      </form>
    </div>
  )
}
