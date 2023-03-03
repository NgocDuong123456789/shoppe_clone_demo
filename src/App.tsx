/* eslint-disable import/no-unresolved */
import { useRouterElement } from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './Components/utils/auth'
import { AppContext, AppProvider } from './contexts/App.context'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorBounday from './Components/ErrorBounday/ErrorBounday'

import { queryClient } from './main'
const App = () => {
  const { reset } = useContext(AppContext)
  const routeElements = useRouterElement()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      reset
    })
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])
  return (
   
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ErrorBounday>
              {routeElements}
              <ToastContainer />
            </ErrorBounday>
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    
  )
}

export default App
