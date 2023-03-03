import { Footer } from 'src/Components/Footer/Footer'
import { Header } from 'src/Components/Header/Header'
import { Nav } from 'src/Components/Nav/Nav'
import {CartHeader} from '../../Components/CartHeader/CartHeader'
interface Props {
  children: React.ReactNode
}

export const CartLayout = ({ children }: Props) => {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
