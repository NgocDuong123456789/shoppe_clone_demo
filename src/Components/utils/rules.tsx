import * as yup from 'yup'
import { type RegisterOptions } from 'react-hook-form'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
export const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'email là bắt buộc'
    },
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'độ dài từ 5-160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'độ dài từ 5-160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'email là bắt buộc'
    },

    maxLength: {
      value: 160,
      message: 'độ dài từ 6-160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'độ dài từ 6-160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'bắt buộc nhập lại password'
    },

    maxLength: {
      value: 160,
      message: 'độ dài từ 6-160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'độ dài từ 6-160 ký tự'
    }
  }
}
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_max: string; price_min: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup
  .object({
    email: yup
      .string()
      .required('Email là bắt buộc')
      .email()
      .min(5, 'Độ dài từ 5-160 ký tự')
      .max(160, 'Độ dài từ 5-160 ký tự'),
    password: yup.string().required('password là bắt buộc').min(6, 'độ dài').max(160, 'độ dài'),
    confirm_password: yup
      .string()
      .required('confirm_password là bắt buộc')
      .min(6, 'độ dài')
      .max(160, 'độ dài')
      .oneOf([yup.ref('password')], 'nhập password không khớp'),
    price_min: yup.string().test({
      name: 'price-not-allowed',
      message: 'giá không phù hợp',
      test: testPriceMinMax

      //  function (value) {
      //   const price_min = value
      //   const { price_max } = this.parent as {price_min:string , price_max:string}
      //   if (price_min !== '' && price_max !== '') {
      //     return Number(price_max) >= Number(price_min)
      //   }
      //   return price_min !== '' || price_max !== ''
      // }
    }),
    price_max: yup.string().test({
      name: 'price-not-allowed',
      message: 'giá không phù hợp',
      test: testPriceMinMax
      // function (value) {
      //   const price_max = value
      //   const { price_min} = this.parent as {price_min:string , price_max:string} // this.parant lấy được object chứa nó
      //   if (price_min !== '' && price_max !== '') {
      //     return Number(price_max) >= Number(price_min)
      //   }
      //   return price_min !== '' || price_max !== ''
      // }
    }),
    name: yup.string().trim().required()
  })
  .required()

export const userSchema = yup.object({
  name: yup.string().max(160, 'độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20,'không được quá 20 ký tự'),
  address: yup.string().max(160, 'độ dài tối đa là 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'hãy chọn 1 ngày trong quá khứ'),
  // password: schema.fields['password'], 
  // password: schema.fields['password'],
  password:yup.string().required('password là bắt buộc').min(6, 'độ dài').max(160, 'độ dài'),
  // new_password: schema.fields['password'], 
  // confirm_password: schema.fields['confirm_password'], 
  new_password: yup.string().required('password là bắt buộc').min(6, 'độ dài').max(160, 'độ dài'),
  confirm_password: yup
  .string()
  .required('confirm_password là bắt buộc')
  .min(6, 'độ dài')
  .max(160, 'độ dài')
  .oneOf([yup.ref('new_password')], 'nhập password không khớp'),
  avatar:yup.string().max(1000, 'độ dài max là 1000')
})
// muốn tạo 1 schema mới chỉ có email , password từ schema tổng
const loginSchema = schema.omit(['confirm_password'])

export type Schema = yup.InferType<typeof schema>
export type User =yup.InferType<typeof userSchema>