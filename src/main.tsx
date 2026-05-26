import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlinkUIProvider, Toaster } from '@blinkdotnew/ui'
import { BlinkProvider } from '@blinkdotnew/react'
import App from './App'
import './index.css'

const queryClient = new QueryClient()
const projectId = import.meta.env.VITE_BLINK_PROJECT_ID || 'vepai-branding-site-veiuebrl'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BlinkProvider projectId={projectId}>
      <QueryClientProvider client={queryClient}>
        <BlinkUIProvider theme="linear" darkMode="light">
          <Toaster />
          <App />
        </BlinkUIProvider>
      </QueryClientProvider>
    </BlinkProvider>
  </React.StrictMode>,
)
