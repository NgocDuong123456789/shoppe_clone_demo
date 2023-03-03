import { useMutation, useQuery } from '@tanstack/react-query'
import { userApi } from 'src/Components/apis/user.api'
import { Button } from 'src/Components/Button/Button'
import { Input } from 'src/Components/Input/Input'
import { User, userSchema } from 'src/Components/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputNumber } from 'src/Components/InputNumber/InputNumber'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { DateSelect } from '../../Component/DateSelect/DateSelect'
import { AppContext } from 'src/contexts/App.context'
import { getAvatar, isAxiosAbleEntity } from 'src/Components/utils/utils'
import { ResponseApi } from 'src/types/utils.type'
type FormData = Pick<User, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'avatar', 'date_of_birth'])

export const Profile = () => {
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const fileInputReft = useRef<HTMLInputElement>(null)
  const { setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    setError,

    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      avatar: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile()
  })
  const profile = profileData?.data.data
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const uploadAvatar = useMutation({
    mutationFn: userApi.upLoadAvatar
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = profile?.avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatar.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data?.date_of_birth?.toISOString(),
        avatar: avatarName
      })

      setProfile(res.data.data)
      setProfile(res.data.data)
      refetch()
      toast.success('update successfully')
    } catch (error) {
      if (isAxiosAbleEntity<ResponseApi<FormDataError>>(error)) {
        const formError = error?.response?.data?.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'server'
            })
          })
        }
      }
    }
  })

  /*
  flow 1: update// nhấn upload lên server =>server trả về url
  nhấn submit thì giửi url ảnh cộng thêm data lên server

  // flow 2
  // nhấn upload : không upload lên server
  // nhấn submit thì tiến hành upload lên server , nếu upload thảnh công thì tiến hành gọi Api

  */
  const handleUpload = () => {
    fileInputReft.current?.click()
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if ((fileFromLocal && fileFromLocal?.size >= 1048576) || !fileFromLocal?.type.includes('image')) {
      toast.error('file không đúng định dạng quy định')
    } else {
      setFile(fileFromLocal)
    }
  }

  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='md-flex-grow mt-8 flex flex-col-reverse md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className=' mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Input
                className=''
                register={register}
                name='name'
                placeholder='ten'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className=' mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    name='phone'
                    placeholder='So ddin thoai'
                    errorMessage={errors.phone?.message}
                    // {...field}
                     value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className=' mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Input
                className=''
                register={register}
                name='address'
                placeholder='dia chi'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect
                errorMessage={errors.date_of_birth?.message}
                onChange={field.onChange}
                value={field.value}
                // {...field}
              />
            )}
          />
        </div>

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src={profile?.avatar && getAvatar(profile?.avatar)} alt='' className='h-full w-full object-cover' />
            </div>

            <input
              type='file'
              name=''
              id=''
              accept='.jpg,.jpeg,.png'
              className='hidden'
              ref={fileInputReft}
              onChange={onFileChange}
              onClick={(e) => {
                ;(e.target as any).value = null
              }}
            />
            <button
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
              onClick={handleUpload}
            >
              chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng file tối đa 1MB</div>
              <div>Định dạng:JPEG,PNG</div>
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
