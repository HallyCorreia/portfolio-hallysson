import { Workflow, Bot, LayoutDashboard, ArrowRight } from 'lucide-react';
import { requestUrl, type ServiceTypeId } from '@/config/services';

const services = [
  {
    icon: Workflow,
    type: 'automation' as ServiceTypeId,
    title: 'Automação de processos',
    text: 'Planilha que vira relatório, formulário que vira tarefa, sistema que conversa com outro sistema. Tiro da equipe o trabalho que se repete toda semana.',
    tools: ['n8n', 'Make', 'APIs e webhooks', 'Google Workspace'],
  },
  {
    icon: Bot,
    type: 'agent' as ServiceTypeId,
    title: 'Agentes de IA no WhatsApp',
    text: 'Atendimento que consulta estoque, agenda e registra pedidos sozinho, e chama uma pessoa quando precisa. Com o seu catálogo e as suas regras.',
    tools: ['Claude', 'OpenAI', 'Gemini', 'RAG', 'Evolution API'],
  },
  {
    icon: LayoutDashboard,
    type: 'website' as ServiceTypeId,
    title: 'Sites e sistemas com painel',
    text: 'Site que gera contato e sistema que o próprio cliente consegue atualizar. Publicado, com SEO e hospedagem barata ou gratuita.',
    tools: ['React', 'Supabase', 'Cloudflare', 'Vercel'],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative border-y border-border/60 bg-accent/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <p className="font-pixel text-primary uppercase text-sm mb-3">// como eu ajudo</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Três coisas, <span className="gradient-text">bem feitas</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, type, title, text, tools }) => (
            <div key={title} className="card-glow rounded-2xl border border-border bg-card/70 p-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {tools.map((t) => (
                  <span key={t} className="px-3 py-1 bg-secondary text-muted-foreground text-xs rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <a href={requestUrl(type)} className="inline-flex items-center gap-1.5 font-pixel text-sm text-primary hover:underline underline-offset-4">
                SOLICITAR <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
