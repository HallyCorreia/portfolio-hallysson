import { ExternalLink, Github } from 'lucide-react';
import { site } from '@/config/site';

type Project = {
  title: string;
  kind: string;
  problem: string;
  delivered: string[];
  stack: string[];
  live?: string;
  repo: string;
  image?: string;
};

// Só projetos reais. Os detalhes vêm dos repositórios-vitrine públicos.
const projects: Project[] = [
  {
    title: 'Ninchoo',
    kind: 'SaaS próprio · barbearias e salões',
    problem:
      'Barbearias pequenas controlam agenda no WhatsApp e no caderno: cliente falta sem avisar e a comissão é calculada à mão.',
    delivered: [
      'Agendamento online 24h, com lembretes por WhatsApp, e-mail e push',
      'Financeiro com comissão automática e cobrança recorrente via Asaas',
      'Nix, assistente de IA que atende no chat e captura leads',
      'App Android/iOS com Capacitor',
    ],
    stack: ['React', 'Supabase', 'Edge Functions', 'Asaas', 'Capacitor', 'LLM'],
    live: 'https://ninchoo.com.br',
    repo: 'https://github.com/HallyCorreia/ninchoo-showcase',
    image: '/cases/ninchoo.webp',
  },
  {
    title: 'Agente de IA para autopeças',
    kind: 'Cliente · e-commerce em Blumenau',
    problem:
      'A loja respondia estoque, pedidos e agendamentos manualmente pelo WhatsApp e vendia em vários canais sem integração.',
    delivered: [
      'Agente no WhatsApp com 10 ferramentas: estoque, pedidos, agenda e histórico',
      'RAG com pgvector, entende áudio e imagem e passa a conversa para um humano',
      'Loja com checkout Mercado Pago e sincronização com o Mercado Livre',
      'Claude, Gemini e OpenAI com fallback entre eles',
    ],
    stack: ['TanStack Start', 'Cloudflare Workers', 'Supabase', 'pgvector', 'Evolution API'],
    repo: 'https://github.com/HallyCorreia/ecommerce-autopecas-ia-showcase',
  },
  {
    title: 'Alisson Alcântara',
    kind: 'Cliente · intérprete de Libras',
    problem:
      'O intérprete dependia de indicação e não conseguia atualizar o próprio portfólio sem chamar um desenvolvedor.',
    delivered: [
      'Site com foco em contato pelo WhatsApp e agenda de eventos',
      'Painel admin para eventos, fotos e cidades, com permissões no banco',
      'Páginas por cidade, sitemap e dados estruturados para o Google',
      'Hospedagem migrada para Cloudflare Pages, sem custo mensal',
    ],
    stack: ['React', 'Vite', 'Supabase', 'Cloudflare Pages', 'SEO'],
    live: 'https://alissonalcantara.com.br',
    repo: 'https://github.com/HallyCorreia/alisson-alcantara-showcase',
    image: '/cases/alisson.webp',
  },
];

function AgentPreview() {
  // Ilustração do fluxo do agente, já que o projeto do cliente não tem tela pública.
  const lines = [
    ['cliente', 'tem pastilha de freio pro Onix 2019?'],
    ['agente', 'consultando estoque…'],
    ['tool', 'buscar_estoque(veiculo="Onix 2019")'],
    ['agente', 'Tenho 2 marcas. Quer que eu reserve?'],
  ];
  return (
    <div className="h-full w-full bg-card p-5 font-pixel text-[13px] leading-relaxed flex flex-col justify-center gap-2" aria-hidden="true">
      {lines.map(([who, text], i) => (
        <p key={i} className={who === 'cliente' ? 'text-foreground' : who === 'tool' ? 'text-muted-foreground' : 'text-primary'}>
          <span className="text-muted-foreground">{who === 'tool' ? '$' : '>'} {who}:</span> {text}
        </p>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <p className="font-pixel text-primary uppercase text-sm mb-3">// projetos no ar</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            O que eu já <span className="gradient-text">coloquei pra rodar</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Três projetos reais, do problema ao deploy. O código dos clientes é privado. Os links levam para o
            site no ar e para uma vitrine com arquitetura e decisões técnicas.
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-border bg-card/50"
            >
              <div className={`aspect-video lg:aspect-auto lg:min-h-[340px] border-b lg:border-b-0 border-border ${index % 2 ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Tela do projeto ${project.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-left-top"
                  />
                ) : (
                  <AgentPreview />
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4 min-w-0">
                <div>
                  <p className="font-pixel text-xs uppercase text-muted-foreground mb-1">{project.kind}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">{project.title}</h3>
                </div>
                <p className="text-muted-foreground">{project.problem}</p>
                <ul className="grid gap-2 text-sm text-foreground/90">
                  {project.delivered.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary font-pixel" aria-hidden="true">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-secondary text-muted-foreground text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-auto pt-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Ver no ar <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                  >
                    <Github className="w-4 h-4" /> Arquitetura
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-muted-foreground">
          Mais projetos e código aberto no{' '}
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
