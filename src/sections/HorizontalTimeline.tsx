import { Briefcase, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

export type TimelineItem = {
  kind: 'work' | 'education';
  year: string;
  title: string;
  org: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
};

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

function TimelineCard({ item, index, reached }: { item: TimelineItem; index: number; reached: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  // Cada experiência aparece quando entra na tela (funciona com o translate da trilha).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Posição do mouse para o brilho da borda seguir o cursor.
  const onMove = (ev: MouseEvent<HTMLElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    ev.currentTarget.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    ev.currentTarget.style.setProperty('--my', `${ev.clientY - r.top}px`);
  };

  const Icon = item.kind === 'education' ? GraduationCap : Briefcase;

  return (
    <div
      ref={ref}
      className={`tl-item ${shown ? 'tl-shown' : ''} ${reached ? 'tl-reached' : ''}`}
      style={{ '--d': `${(index % 3) * 90}ms` } as CSSProperties}
    >
      <span className="tl-dot" aria-hidden="true" />
      <span className="tl-year font-pixel" aria-hidden="true">{item.year}</span>
      <article className="tl-card" onMouseMove={onMove} tabIndex={0}>
        <div className="flex items-center gap-3 mb-3">
          <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </span>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{item.period}</span>
        </div>
        <h4 className="text-lg font-semibold text-foreground leading-snug mb-1">{item.title}</h4>
        <p className="text-primary font-medium text-sm">{item.org}</p>
        <p className="text-muted-foreground text-xs mb-3">{item.location}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((s) => (
            <span key={s} className="px-2.5 py-1 bg-secondary text-foreground/80 text-xs rounded-full">
              {s}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

export function HorizontalTimeline({ items, header }: { items: TimelineItem[]; header?: ReactNode }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const desktop = useMedia('(min-width: 768px)');
  // Desktop: rolar a página para baixo leva a trilha para o lado.
  // Celular ou movimento reduzido: rolagem lateral nativa (arrastar/setas).
  const pinned = desktop && !reduced;

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [progress, setProgress] = useState(0);
  // Posição de cada ponto na trilha, para saber quando a barra chega nele.
  const [dots, setDots] = useState<number[]>([]);
  const [trackW, setTrackW] = useState(1);

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      setDist(Math.max(0, t.scrollWidth - window.innerWidth));
      setTrackW(t.scrollWidth || 1);
      setDots(
        Array.from(t.querySelectorAll<HTMLElement>('.tl-item')).map((el) => {
          const d = el.querySelector<HTMLElement>('.tl-dot');
          return el.offsetLeft + (d ? d.offsetLeft + d.offsetWidth / 2 : 0);
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const o = outerRef.current;
      if (!o) return;
      const total = o.offsetHeight - window.innerHeight;
      const p = total > 0 ? -o.getBoundingClientRect().top / total : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, [pinned, dist]);

  useEffect(() => {
    if (pinned) return;
    const s = scrollerRef.current;
    if (!s) return;
    const on = () => {
      const max = s.scrollWidth - s.clientWidth;
      setProgress(max > 0 ? s.scrollLeft / max : 0);
    };
    on();
    s.addEventListener('scroll', on, { passive: true });
    return () => s.removeEventListener('scroll', on);
  }, [pinned]);

  const nudge = (dir: 1 | -1) =>
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: reduced ? 'auto' : 'smooth' });

  const track = (
    <div
      ref={trackRef}
      className="tl-track"
      style={pinned ? { transform: `translate3d(${-progress * dist}px,0,0)` } : undefined}
    >
      <div className="tl-line" aria-hidden="true">
        <div className="tl-line-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
      {items.map((item, i) => (
        <TimelineCard
          key={item.title + item.org}
          item={item}
          index={i}
          reached={dots[i] !== undefined && progress * trackW >= dots[i]}
        />
      ))}
      <div className="tl-end font-pixel" aria-hidden="true">
        continua_
      </div>
    </div>
  );

  if (pinned) {
    return (
      <div ref={outerRef} className="relative" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">
          {header}
          <p className="font-pixel text-muted-foreground text-xs uppercase text-center mt-2 mb-1">
            role para avançar na linha do tempo →
          </p>
          {track}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {header}
      <div ref={scrollerRef} className="tl-scroller" tabIndex={0} aria-label="Linha do tempo: role para o lado">
        {track}
      </div>
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => nudge(-1)}
          aria-label="Voltar"
          className="w-10 h-10 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-primary flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="Avançar"
          className="w-10 h-10 rounded-full border border-border hover:border-primary/50 text-muted-foreground hover:text-primary flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
