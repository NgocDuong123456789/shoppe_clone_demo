import { range } from 'lodash'
import React, { useState } from 'react'
interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export const DateSelect = ({ value, onChange, errorMessage }: Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueSelect, name } = e.target

    const newDate = {
      date: value?.getDate() || 1,
      month: value?.getMonth() || 0,
      year: value?.getFullYear() || 1990,
      [name]: Number(valueSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-wrap'>
      <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
      <div className='flex justify-between'>
        <select
          onChange={handleChange}
          className=' h-10 w-[32%] cursor-pointer border border-black px-3 hover:border-orange '
          name='date'
          value={value?.getDate() || date.date}
        >
          <option disabled>Ngày</option>
          {range(1, 32).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </select>
        <select
        onChange={handleChange}
          className=' h-10 w-[32%] cursor-pointer border border-black px-3 hover:border-orange'
          name='month'
          value={value?.getMonth() || date.month}
        >
          <option disabled>thangs </option>
          {range(0, 12).map((item) => {
            return <option value={item} key={item}>{`thang ${item + 1}`}</option>
          })}
        </select>
        <select
        onChange={handleChange}
          className=' h-10 w-[32%] cursor-pointer border border-black px-3 hover:border-orange'
          name='year'
          value={value?.getFullYear() || date.year}
        >
          <option disabled>year</option>
          {range(1990, 2024).map((item) => {
            return <option value={item} key={item}>{`nam ${item + 1}`}</option>
          })}
        </select>
      </div>
      <div className='text-red-600'>{errorMessage}</div>
    </div>
  )
}
