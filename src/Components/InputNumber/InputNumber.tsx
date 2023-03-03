import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
   errorMessage?: string
   classNameInput?: string
   classNameError?: string
   value:number
  //  register?: UseFormRegister<any>
  //  rules?: RegisterOptions
  // value:string
  // onChange:(value: number)=>void
}




export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    //  errorMessage,
    // classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500',
    // classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value,
    ...rest
  },
  ref
) {

  const [localValue, setLocalValue] = useState<number>(value )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      // kiểm tra số
      // thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(e)
      // cập nhật localvalueState
      // setLocalValue(value)
    }
  }
  return (
    <div>
      <input
        // type={type}
        onChange={handleChange}
        {...rest}
        ref={ref}
        value={value === undefined ? localValue : value}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
      />
      {/* <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errorMessage}</div> */}
    </div>
  )
})
