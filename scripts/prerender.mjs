// Depois do `vite build`: grava o HTML pronto de cada página pública, o sitemap e o llms.txt.
// - Google, ChatGPT/Perplexity e prévias de link (WhatsApp, LinkedIn) leem o conteúdo sem rodar JS.
// - Cada página ganha title, description, canonical e robots próprios.
// Se algo falhar, o build segue como SPA comum (o site continua funcionando).
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const SITE = 'https://hallyssoncorreia.com.br';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'Hallysson Correia | Dev Full Stack e IA em Blumenau/SC',
    description:
      'Hallysson Correia é Dev Full Stack com foco em IA em Blumenau/SC: automação de processos, agentes de IA no WhatsApp e sistemas web, com projetos reais no ar.',
    priority: '1.0',
  },
  {
    path: '/solicitar',
    file: 'solicitar.html', // Cloudflare Pages serve /solicitar sem redirecionar para /solicitar/
    title: 'Solicitar serviço | Hallysson Correia',
    description:
      'Peça um orçamento a Hallysson Correia: automação de processos, agente de IA no WhatsApp, site ou sistema com painel e consultoria em IA.',
    priority: '0.7',
  },
  {
    // Destino do ./desconto.sh do terminal. Fora do Google: só quem acha o easter egg chega aqui.
    path: '/cupom',
    file: 'cupom.html',
    title: 'Você achou o cupom | Hallysson Correia',
    description: 'Cupom do terminal escondido no portfólio de Hallysson Correia, aplicado no pedido de orçamento.',
    noindex: true,
  },
  {
    path: '/404',
    file: '404.html',
    title: 'Página não encontrada | Hallysson Correia',
    description: 'Esta página não existe. Volte para o portfólio de Hallysson Correia.',
    noindex: true,
    render: '/',
  },
];

const setHead = (html, r) => {
  const url = `${SITE}${r.path === '/' ? '/' : r.path}`;
  const meta = (attr, name, value) => (h) =>
    h.replace(new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`), `$1${esc(value)}$2`);
  const robots = r.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  return [
    (h) => h.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`),
    meta('name', 'description', r.description),
    meta('name', 'robots', robots),
    meta('property', 'og:title', r.title),
    meta('property', 'og:description', r.description),
    meta('property', 'og:url', url),
    meta('name', 'twitter:title', r.title),
    meta('name', 'twitter:description', r.description),
    (h) => h.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`),
  ].reduce((h, f) => f(h), html);
};

try {
  const entry = join(ssrDir, 'entry-server.js');
  if (!existsSync(entry)) throw new Error('dist-ssr/entry-server.js não encontrado');
  const { render } = await import(pathToFileURL(entry).href);
  const template = readFileSync(join(dist, 'index.html'), 'utf8');

  for (const r of routes) {
    const body = render(r.render ?? r.path);
    const html = setHead(template, r).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    writeFileSync(join(dist, r.file), html);
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...routes.filter((r) => !r.noindex).map((r) => ({ loc: `${SITE}${r.path}`, priority: r.priority })),
    { loc: `${SITE}/links/`, priority: '0.6' },
  ];
  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
      .join('\n')}\n</urlset>\n`,
  );

  console.log(`prerender: ${routes.length} páginas + sitemap.xml`);
} catch (err) {
  console.warn(`prerender: ignorado, o site segue como SPA (${err.message})`);
} finally {
  rmSync(ssrDir, { recursive: true, force: true });
}
