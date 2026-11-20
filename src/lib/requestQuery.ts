import { serviceTypes, type ServiceTypeId } from '@/config/services';

// Lê ?tipo= e ?ref= da URL para já abrir a solicitação com o serviço escolhido.
export function readQuery(): { service?: ServiceTypeId; ref: string } {
  if (typeof window === 'undefined') return { ref: '' }; // prerender no build
  const q = new URLSearchParams(window.location.search);
  const tipo = q.get('tipo') as ServiceTypeId | null;
  return {
    service: serviceTypes.some((s) => s.id === tipo) ? tipo! : undefined,
    ref: q.get('ref') ?? '',
  };
}
