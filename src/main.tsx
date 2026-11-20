import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import App from './App.tsx'
import { RequestPage } from './pages/RequestPage.tsx'

// Rota simples sem dependência de router: /solicitar abre a área de solicitação de serviço.
const path = window.location.pathname.replace(/\/+$/, '')
const Page = path === '/solicitar' ? RequestPage : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <Page />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>,
)
