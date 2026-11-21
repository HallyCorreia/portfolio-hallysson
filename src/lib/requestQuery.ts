import { serviceTypes, type ServiceTypeId } from '@/config/services';

// Cupom do easter egg do terminal (logo "HC | >"). Só este código é aceito na URL.
export const CUPOM_TERMINAL = 'TERMINAL10';

// Lê ?tipo=, ?ref= e ?cupom= da URL para já abrir a solicitação preenchida.
export function readQuery(): { service?: ServiceTypeId; ref: string; cupom?: string } {
  if (typeof window === 'undefined') return { ref: '' }; // prerender no build
  const q = new URLSearchParams(window.location.search);
  const tipo = q.get('tipo') as ServiceTypeId | null;
  const cupom = q.get('cupom')?.toUpperCase();
  return {
    service: serviceTypes.some((s) => s.id === tipo) ? tipo! : undefined,
    ref: q.get('ref') ?? '',
    cupom: cupom === CUPOM_TERMINAL ? cupom : undefined,
  };
}
