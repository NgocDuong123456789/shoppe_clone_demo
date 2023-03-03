import { Footer } from 'src/Components/Footer/Footer'
import { Header } from 'src/Components/Header/Header'

interface Props {
  children: React.ReactNode
}
export const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
