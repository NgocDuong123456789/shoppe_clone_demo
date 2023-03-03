import React, { useState } from 'react'
import { InputNumber, InputNumberProps } from '../InputNumber/InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
  // value: number
}
//extends InputNumberProps

export const QuantityController = ({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper = 'ml-10',
  onType,
  value,
  ...rest
}: Props) => {
  // const [localValue, setLocalValue] = useState<number>(Number(value || 0))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    // setLocalValue(_value)
  }
  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    // setLocalValue(String(_value))
  }
  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    // setLocalValue(_value)
  }
  return (
    <div className='ml-10 flex items-center'>
      <button
        className='jusstify-center flex h-8 w-8 items-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        -
      </button>
      <InputNumber
        onChange={handleChange}
        value={value}
        {...rest}
        className=''
        // classNameError='hidden'
        // classNameInput='h-8 w-14 border-t border-gray-400 text-center'
      />
      <button
        className='jusstify-center flex h-8 w-8 items-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
        +
      </button>
    </div>
  )
}
