import React from 'react'
import { Footer } from 'src/Components/Footer/Footer'
import { RegisterHeader } from 'src/Components/RegisterHeader/RegisterHeader'

interface Props {
  children: React.ReactNode
}
export const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
