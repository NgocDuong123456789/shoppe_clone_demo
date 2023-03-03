import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../src/index.css'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/App.context'

import ErrorBounday from '../src/Components/ErrorBounday/ErrorBounday'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})
export const decorator = [
  (Story) => {
    ;<BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ErrorBounday>
              <Story />
            </ErrorBounday>
          </AppProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </BrowserRouter>
  }
]
