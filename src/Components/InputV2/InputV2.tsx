// import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
// import { forwardRef, InputHTMLAttributes, useState } from 'react'
// import { useForm, useController, UseControllerProps } from "react-hook-form";
// export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
//   errorMessage?: string
//   classNameInput?: string
//   classNameError?: string
//   register?: UseFormRegister<any>
//   rules?: RegisterOptions
// }
// // export const InputV2 = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(

// //   {
// //     errorMessage,
// //     classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500',
// //     classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
// //     onChange,
// //     value = '',
// //     ...rest
// //   },
// //   ref
// // ) 
// function InputV2(props:UseControllerProps & InputNumberProps){
    
//     const { field, fieldState } = useController(props);
//     const [localValue, setLocalValue] = useState<string>(field.value)
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const  valueFromInput  = e.target.value
//       const numberCondition=type === 'number'  && /^\d+$/.test( valueFromInput) ||  valueFromInput === ''
//       if ( numberCondition && type !=='number') {
//         setLocalValue(numberCondition)
//         // thực thi onChange callback từ bên ngoài truyền vào props
//         onChange && onChange(e)
//         // cập nhật localvalueState
    
//       }
//     }
  
//     return (
//       <div>
//         <input
//          {...field}
//           // type={type}
//           onChange={handleChange}
//           {...rest}
//           ref={ref}
//           value={value || localValue}
//           className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
//         />
//         <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errorMessage}</div>
//       </div>
//     )
// }

import React from 'react'

export const InputV2 = () => {
  return (
    <div>InputV2</div>
  )
}

