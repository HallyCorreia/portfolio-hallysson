// Renderização no build (prerender): gera o HTML de cada página para Google, IAs e prévias de link
// lerem o conteúdo sem rodar JavaScript. Usado só por scripts/prerender.mjs.
import { renderToString } from 'react-dom/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import App from './App';
import { RequestPage } from './pages/RequestPage';

export function render(path: string) {
  const Page = path === '/solicitar' ? RequestPage : App;
  return renderToString(
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <Page />
    </ThemeProvider>,
  );
}
