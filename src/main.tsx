import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import './index.css'
import App from './App.tsx'
import { RequestPage } from './pages/RequestPage.tsx'
import { paginaDe } from './lib/requestQuery'

// Rota simples sem dependência de router: /solicitar abre a solicitação; /cupom, a mesma com o cupom aplicado.
const pagina = paginaDe(window.location.pathname)

// Dica para quem abre o console (sem estragar a surpresa).
console.info('%c> curioso? o ">" da logo não é só enfeite_', 'color:#a78bfa;font-family:monospace')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      {pagina === 'home' ? <App /> : <RequestPage cupom={pagina === 'cupom'} />}
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>,
)
