// Uma única lista de ferramentas no site inteiro, sem porcentagens.
const stack = [
  { group: 'IA', items: ['Claude e Claude Code', 'OpenAI', 'Gemini', 'RAG / pgvector', 'Engenharia de prompt'] },
  { group: 'Automação', items: ['n8n', 'Make', 'Zapier', 'Typebot', 'Evolution API'] },
  { group: 'Desenvolvimento', items: ['TypeScript', 'React', 'Vite', 'Tailwind', 'Node.js'] },
  { group: 'Dados e infra', items: ['Supabase', 'PostgreSQL', 'SQL Server', 'Cloudflare', 'Vercel', 'Firebase'] },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 items-start">
          <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border">
              <img
                src="/profile-about.webp"
                alt="Hallysson Correia"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="font-pixel absolute -bottom-4 left-4 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-primary">
              &gt; Blumenau, SC
            </span>
          </div>

          <div className="space-y-6 min-w-0">
            <div>
              <p className="font-pixel text-primary uppercase text-sm mb-3">// sobre</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
                De suporte técnico a <span className="gradient-text">gestor de automações</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Comecei em 2017 com suporte técnico, redes e banco de dados. Hoje sou Gestor de Automações na Marvee
              e atendo clientes por conta própria: automatizo processos, integro sistemas e construo sites e agentes
              de IA do começo ao deploy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              No caminho recebi o diagnóstico de uma deficiência progressiva chamada Charcot. Isso não me
              limitou: reforçou minha resiliência e o hábito de aprender todo dia.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Gosto de sistema que dura: padronizado, seguro e fácil de manter por quem vem depois.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-4">
              {stack.map(({ group, items }) => (
                <div key={group}>
                  <p className="font-pixel text-xs uppercase text-muted-foreground mb-2">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="px-3 py-1 bg-secondary text-foreground/85 text-xs rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
