// Tipos de serviço usados na página /solicitar e nos links "Solicitar" dos projetos e serviços.
export type ServiceTypeId = 'automation' | 'agent' | 'website' | 'consulting' | 'other';

export const serviceTypes: { id: ServiceTypeId; label: string; hint: string }[] = [
  { id: 'automation', label: 'Automação de processos', hint: 'Planilhas, integrações, n8n' },
  { id: 'agent', label: 'Agente de IA no WhatsApp', hint: 'Atendimento, vendas, agenda' },
  { id: 'website', label: 'Site ou sistema com painel', hint: 'Site, SaaS, área admin' },
  { id: 'consulting', label: 'Consultoria', hint: 'Diagnóstico e plano de IA' },
  { id: 'other', label: 'Outro', hint: 'Me conta o que é' },
];

export const requestUrl = (tipo?: ServiceTypeId, ref?: string) => {
  const q = new URLSearchParams();
  if (tipo) q.set('tipo', tipo);
  if (ref) q.set('ref', ref);
  const s = q.toString();
  return `/solicitar${s ? `?${s}` : ''}`;
};
