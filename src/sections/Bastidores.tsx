import { Instagram, Play } from 'lucide-react';
import { site } from '@/config/site';

// Reels publicados em @h_bcorreia. Atualizar quando sair um novo.
const reels = [
  { id: 'DfdWEAtpnU5', tag: 'EXPEDIENTE 07:59', title: 'Trabalhe comigo: 7 horas em 2 minutos com Claude Code' },
  { id: 'DYNKYWWJKm-', tag: 'AUTOMAÇÃO', title: '3 coisas que você ainda faz na mão e uma IA já faz' },
  { id: 'DYUcL0JJlYA', tag: 'FERRAMENTA', title: 'Segundo cérebro grátis e 100% local' },
  { id: 'DXt9N66iSsI', tag: 'PROMPT', title: '3 dicas pra usar o ChatGPT muito melhor no trabalho' },
];

export function Bastidores() {
  return (
    <section id="bastidores" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="font-pixel text-primary uppercase text-sm mb-3">// bastidores</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              O dia a dia, <span className="gradient-text">sem filtro</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Rotina com agentes de IA, automações e ferramentas que eu uso de verdade. Toda semana no Instagram.
            </p>
          </div>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            <Instagram className="w-4 h-4" /> @h_bcorreia
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {reels.map((reel, i) => (
            <a
              key={reel.id}
              href={`https://www.instagram.com/h_bcorreia/reel/${reel.id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-[9/16] max-w-full rounded-2xl overflow-hidden border border-border p-4 flex flex-col justify-end gap-3 transition-transform hover:-translate-y-1 ${
                i % 3 === 1 ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
              }`}
            >
              <span
                className={`font-pixel absolute top-3 left-3 rounded px-2 py-1 text-[11px] ${
                  i % 3 === 1 ? 'bg-background text-primary' : 'bg-background text-foreground border border-border'
                }`}
              >
                {reel.tag}
              </span>
              <Play
                className={`absolute top-3 right-3 w-5 h-5 ${i % 3 === 1 ? 'text-primary-foreground' : 'text-primary'}`}
                aria-hidden="true"
              />
              <h3 className="text-lg md:text-xl font-extrabold uppercase leading-tight">{reel.title}</h3>
              <span className={`font-pixel text-xs ${i % 3 === 1 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                ASSISTIR NO INSTAGRAM →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
