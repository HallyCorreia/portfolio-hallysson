import { ChevronLeft, ChevronRight, Instagram, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/config/site';
import { TikTokIcon } from '@/components/TikTokIcon';

// Reels publicados em @h_bcorreia. Quando sair um novo, adicionar no topo (mais recente primeiro).
type Serie = 'trabalhe' | 'nodo' | 'pauta' | 'automacao';

const series: { id: Serie; label: string; desc: string }[] = [
  { id: 'trabalhe', label: 'Trabalhe comigo', desc: 'Expediente real, acelerado' },
  { id: 'nodo', label: 'Dicas do Nodo', desc: 'Uma dica simples de IA por dia' },
  { id: 'pauta', label: 'IA em pauta', desc: 'Minha opinião sobre a notícia' },
  { id: 'automacao', label: 'Automação e ferramentas', desc: 'O que dá pra tirar da mão' },
];

const reels: { id: string; serie: Serie; data: string; title: string }[] = [
  { id: 'Df8fiZbpyI7', serie: 'pauta', data: '19/11', title: 'Coleira que traduz latido: 95% de acerto?' },
  { id: 'Df5_ZhtJlhR', serie: 'pauta', data: '19/11', title: 'Bug no GTA 6: culpa da Rockstar, dos devs ou da IA?' },
  { id: 'Df41Y0vJ3sJ', serie: 'nodo', data: '18/11', title: 'Dica #4: tira foto da lista e a IA monta tua semana' },
  { id: 'Df16gyMJLiT', serie: 'trabalhe', data: '17/11', title: 'Só restavam 5% de Claude Code: trabalhei até zerar' },
  { id: 'Dfubc_vpmFO', serie: 'nodo', data: '14/11', title: 'Dica #2: foto da geladeira vira receita' },
  { id: 'Dfr_jvzJ1cq', serie: 'nodo', data: '13/11', title: 'Dica #1: deixa a IA planejar teu fim de semana' },
  { id: 'DfpPKrYp_Nh', serie: 'nodo', data: '12/11', title: 'Esse é o Nodo, meu agente de IA' },
  { id: 'DfdWEAtpnU5', serie: 'trabalhe', data: '07/11', title: '7 horas de trabalho em 2 minutos com Claude Code' },
  { id: 'DYUcL0JJlYA', serie: 'automacao', data: '14/05', title: 'Segundo cérebro grátis e 100% local' },
  { id: 'DYNKYWWJKm-', serie: 'automacao', data: '11/05', title: '3 coisas que você ainda faz na mão e uma IA já faz' },
  { id: 'DXy89FMJlQ_', serie: 'automacao', data: '01/05', title: 'Automação não é só um sisteminha de agendamento' },
  { id: 'DXt9N66iSsI', serie: 'automacao', data: '29/04', title: '3 dicas pra usar o ChatGPT muito melhor no trabalho' },
];

export function Bastidores() {
  const [filtro, setFiltro] = useState<Serie | 'todos'>('todos');
  const lista = filtro === 'todos' ? reels : reels.filter((r) => r.serie === filtro);

  // Carrossel: 4 cards por vez no desktop, rola de página em página.
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState(1);

  const medir = useCallback(() => {
    const t = trilhoRef.current;
    if (!t) return;
    const total = Math.max(1, Math.round(t.scrollWidth / t.clientWidth));
    setPaginas(total);
    setPagina(Math.min(total - 1, Math.round(t.scrollLeft / t.clientWidth)));
  }, []);

  useEffect(() => {
    const t = trilhoRef.current;
    if (!t) return;
    t.scrollTo({ left: 0 });
    medir();
    t.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    return () => {
      t.removeEventListener('scroll', medir);
      window.removeEventListener('resize', medir);
    };
  }, [filtro, medir]);

  const irPara = (p: number) => {
    const t = trilhoRef.current;
    if (!t) return;
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollTo({ left: p * t.clientWidth, behavior: reduz ? 'auto' : 'smooth' });
  };
  const nomeSerie = (id: Serie) => series.find((s) => s.id === id)?.label ?? '';

  const tabs: { id: Serie | 'todos'; label: string; n: number }[] = [
    { id: 'todos', label: 'Todos', n: reels.length },
    ...series.map((s) => ({ id: s.id, label: s.label, n: reels.filter((r) => r.serie === s.id).length })),
  ];

  return (
    <section id="bastidores" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="font-pixel text-primary uppercase text-sm mb-3">// conteúdo</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              IA na prática, <span className="gradient-text">em vídeo</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Bastidores do meu expediente, as dicas diárias do Nodo e o que eu penso sobre as notícias de IA. Tudo
              curto, direto e com a ferramenta rodando de verdade.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-colors"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-colors"
            >
              <TikTokIcon className="w-4 h-4" /> TikTok
            </a>
          </div>
        </div>

        {/* Séries */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {series.map((s) => (
            <div key={s.id} className="rounded-xl border border-border bg-card/40 px-4 py-3">
              <p className="font-pixel text-primary text-[11px] uppercase">{s.label}</p>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Filtro */}
        <div role="tablist" aria-label="Filtrar vídeos por série" className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
          {tabs.map((t) => {
            const ativo = filtro === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={ativo}
                onClick={() => setFiltro(t.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-all duration-300 ${
                  ativo
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_20px_hsl(var(--primary)/0.35)]'
                    : 'border-border text-muted-foreground hover:text-primary hover:border-primary/40'
                }`}
              >
                {t.label} <span className={ativo ? 'opacity-70' : 'opacity-60'}>{t.n}</span>
              </button>
            );
          })}
        </div>

        <div
          key={filtro}
          ref={trilhoRef}
          className="reel-trilho"
          aria-roledescription="carrossel"
          aria-label="Vídeos"
        >
          {lista.map((reel) => {
            const destaque = reel.serie === 'trabalhe';
            return (
              <a
                key={reel.id}
                href={`https://www.instagram.com/h_bcorreia/reel/${reel.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${reel.title} (assistir no Instagram)`}
                className={`reel-card group relative aspect-[9/16] max-w-full rounded-2xl overflow-hidden border bg-card p-4 flex flex-col justify-end gap-2 card-glow animate-fade-in ${
                  destaque ? 'border-primary/60' : 'border-border'
                }`}
              >
                <img
                  src={`reels/${reel.id}.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                  aria-hidden="true"
                />
                <span
                  className={`font-pixel absolute top-3 left-3 rounded px-2 py-1 text-[11px] uppercase ${
                    destaque ? 'bg-primary text-primary-foreground' : 'bg-black/70 text-white border border-white/15'
                  }`}
                >
                  {nomeSerie(reel.serie)}
                </span>
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Play className="w-4 h-4 text-white" aria-hidden="true" />
                </span>
                <span className="relative font-pixel text-xs text-white/70">{reel.data}</span>
                <h3 className="relative text-sm md:text-base font-bold text-white leading-snug line-clamp-2">{reel.title}</h3>
                <span className="relative font-pixel text-[11px] text-primary">ASSISTIR NO INSTAGRAM →</span>
              </a>
            );
          })}
        </div>
        {paginas > 1 && (
          <div className="flex items-center justify-between gap-4 mt-6">
            <div className="flex gap-2" role="group" aria-label="Páginas do carrossel">
              {Array.from({ length: paginas }, (_, i) => (
                <button
                  key={i}
                  onClick={() => irPara(i)}
                  aria-label={`Página ${i + 1} de ${paginas}`}
                  aria-current={i === pagina}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === pagina
                      ? 'w-8 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]'
                      : 'w-2 bg-border hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => irPara(pagina - 1)}
                disabled={pagina === 0}
                aria-label="Vídeos anteriores"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => irPara(pagina + 1)}
                disabled={pagina >= paginas - 1}
                aria-label="Próximos vídeos"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
