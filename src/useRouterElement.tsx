import { Outlet, useRoutes, Navigate } from 'react-router-dom'
 import { ProductList } from './Pages/ProductList/ProductList'
//  import { Login } from './Pages/Login/Login'

import { Register } from './Pages/Register/Register'
import { RegisterLayout } from './Layouts/RegisterLayout/Register'
import { MainLayout } from './Layouts/MainLayout/MainLayout'
import { Profile } from './Pages/User/Pages/Profile/Profile'
import { useContext, lazy, Suspense } from 'react'
import { ChangePasswork } from './Pages/User/Pages/ChangePasswork/ChangePasswork'
import { AppContext } from './contexts/App.context'
import { path } from './Components/Contant.path/Path'
import { ProductDetail } from './Pages/ProductList/ProductDetail/ProductDetail'
import { Cart } from './Pages/Cart/Cart'
import { Login } from './Pages/Login/Login'

import { CartHeader } from './Components/CartHeader/CartHeader'
import { CartLayout } from './Layouts/CartLayout/CartLayout'

import { UserLayout } from './Pages/User/Layouts/UserLayout/UserLayout'
import { HistoryPurchase } from './Pages/User/Pages/HistoryPurchase/HistoryPurchase'
// import   from './Pages/User/Pages/NotFound/NotFound'
import { divide } from 'lodash'

const  NotFound= lazy(() => import('./Pages/User/Pages/NotFound/NotFound'))

function ProtectedRoute() {
  const { isAuthenticationed } = useContext(AppContext)
  return isAuthenticationed ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticationed } = useContext(AppContext)
  return !isAuthenticationed ? <Outlet /> : <Navigate to='/' />
}

export const useRouterElement = () => {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true, // nhận biết là route chính
      element: (
        <MainLayout>

          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
          </Suspense>
          
        </MainLayout>
      )
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: `product/${path.productDetail}`,
          element: (
            <MainLayout>
              
                <ProductDetail />
                npm install --save-dev rollup-plugin-visualizer
            </MainLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePasswork />
            },
            {
              path: path.historyPurchases,
              element: <HistoryPurchase />
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
