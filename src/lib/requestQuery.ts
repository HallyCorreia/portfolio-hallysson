import { serviceTypes, type ServiceTypeId } from '@/config/services';

// Cupom do easter egg do terminal (logo "HC | >"). Só este código é aceito.
export const CUPOM_TERMINAL = 'TERMINAL10';

// Textos do cupom num só lugar. Validade e regras são decisão do Hally: vazio = não aparece.
export const cupomInfo = {
  beneficio: 'até 10% de desconto',
  // Ex.: 'Válido para pedidos enviados até 31/01/2027.'
  validade: '',
  // Ex.: 'Vale para o primeiro projeto, não cumulativo.'
  regras: '',
  // Texto neutro mostrado sempre, enquanto não houver regras definidas.
  aviso: 'O valor do desconto é confirmado junto com o orçamento.',
};

// Página própria do cupom: o Cloudflare Web Analytics não grava query string nem eventos
// personalizados, então cada etapa do funil vira um caminho (/cupom, /cupom/enviado).
export const ROTA_CUPOM = '/cupom';

export type Pagina = 'home' | 'solicitar' | 'cupom';

export function paginaDe(pathname: string): Pagina {
  const p = pathname.replace(/\/+$/, '');
  if (p === ROTA_CUPOM || p.startsWith(`${ROTA_CUPOM}/`)) return 'cupom';
  if (p === '/solicitar' || p.startsWith('/solicitar/')) return 'solicitar';
  return 'home';
}

// Guarda só o código do cupom na aba atual (sessionStorage), para ele seguir junto se a pessoa
// voltar ao portfólio e usar o formulário do Contato. Nenhum dado pessoal é salvo.
const CHAVE = 'hc-cupom';

export function cupomSalvo(): string | undefined {
  try {
    return window.sessionStorage.getItem(CHAVE) === CUPOM_TERMINAL ? CUPOM_TERMINAL : undefined;
  } catch {
    return undefined; // prerender, aba anônima restrita etc.
  }
}

function salvarCupom() {
  try {
    window.sessionStorage.setItem(CHAVE, CUPOM_TERMINAL);
  } catch {
    /* sem storage: o cupom vale só nesta página */
  }
}

// Lê ?tipo=, ?ref= e ?cupom= da URL para já abrir a solicitação preenchida.
// `viaCupom` = página /cupom, que já traz o cupom aplicado.
export function readQuery(viaCupom = false): { service?: ServiceTypeId; ref: string; cupom?: string } {
  if (typeof window === 'undefined') return { ref: '', cupom: viaCupom ? CUPOM_TERMINAL : undefined }; // prerender
  const q = new URLSearchParams(window.location.search);
  const tipo = q.get('tipo') as ServiceTypeId | null;
  const naUrl = viaCupom || q.get('cupom')?.toUpperCase() === CUPOM_TERMINAL;
  const cupom = naUrl ? CUPOM_TERMINAL : cupomSalvo();
  if (cupom) salvarCupom();
  return {
    service: serviceTypes.some((s) => s.id === tipo) ? tipo! : undefined,
    ref: q.get('ref') ?? '',
    cupom,
  };
}
