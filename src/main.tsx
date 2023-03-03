import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/App.context'
import ErrorBounday from './Components/ErrorBounday/ErrorBounday'
import './i18n/i18n'
// eslint-disable-next-line prettier/prettier

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// có 3 môi trường khi làm vc
// -- môi trường vs code, khi chúng ta đưa chuột vào click thì chạy đến file đúng file
// -- môi trường eslint
// -- môi trường terminal*
