// Logo "HC | >_" com easter egg: o ">" abre um mini terminal com comandos clicáveis.
import { useEffect, useRef, useState } from 'react';
import { site } from '@/config/site';
import { CUPOM_TERMINAL } from '@/lib/requestQuery';

type Linha = { tipo: 'cmd' | 'out'; texto: string };

type Comando = { cmd: string; saida: string[]; acao?: () => void };

const irPara = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const comandos: Comando[] = [
  {
    cmd: 'whoami',
    saida: ['Hallysson Correia', 'engenheiro de software full stack · Blumenau/SC'],
  },
  {
    cmd: 'cat stack.txt',
    saida: ['React · TypeScript · Node.js', 'Supabase · PostgreSQL · n8n · Claude'],
  },
  {
    cmd: 'ls projetos/',
    saida: ['abrindo projetos no ar…'],
    acao: () => irPara('projects'),
  },
  {
    cmd: 'ping hally',
    saida: [`resposta de ${site.email}`, 'disponível para novos projetos ✓'],
  },
  {
    cmd: './desconto.sh',
    saida: [
      'procurando cupons escondidos… 1 encontrado 🎟️',
      `${CUPOM_TERMINAL}: até 10% de desconto no seu projeto`,
      'aplicando no pedido de orçamento…',
    ],
    acao: () => window.location.assign(`/solicitar?cupom=${CUPOM_TERMINAL}`),
  },
  {
    cmd: 'sudo contratar',
    saida: ['[sudo] permissão concedida.', 'redirecionando para /solicitar…'],
    acao: () => window.location.assign('/solicitar'),
  },
];

export function TerminalLogo() {
  const [aberto, setAberto] = useState(false);
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [ocupado, setOcupado] = useState(false);
  const caixaRef = useRef<HTMLDivElement>(null);
  const saidaRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Fecha com Esc ou clique fora.
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    const onClick = (e: MouseEvent) => {
      if (caixaRef.current && !caixaRef.current.contains(e.target as Node)) setAberto(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [aberto]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    saidaRef.current?.scrollTo({ top: saidaRef.current.scrollHeight });
  }, [linhas]);

  const rodar = (c: Comando) => {
    if (ocupado) return;
    setOcupado(true);
    setLinhas((l) => [...l, { tipo: 'cmd', texto: c.cmd }]);
    c.saida.forEach((texto, i) => {
      timers.current.push(
        window.setTimeout(() => setLinhas((l) => [...l, { tipo: 'out', texto }]), 220 * (i + 1)),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setOcupado(false);
        if (c.acao) {
          c.acao();
          if (c.cmd.startsWith('ls')) setAberto(false);
        }
      }, 220 * (c.saida.length + 1) + 150),
    );
  };

  return (
    <div ref={caixaRef} className="relative flex items-center gap-2">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-xl font-bold gradient-text"
        aria-label="Ir para o início"
      >
        HC
      </a>
      <span className="hidden sm:inline text-muted-foreground text-sm" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className={`hidden sm:inline-flex items-center font-pixel text-sm rounded px-1.5 py-0.5 transition-colors ${
          aberto ? 'bg-primary/20 text-foreground' : 'text-primary hover:bg-primary/10'
        }`}
        aria-expanded={aberto}
        aria-haspopup="dialog"
        aria-label="Abrir terminal"
        title="psst… clica aqui"
      >
        <span className="term-prompt">&gt;</span>
        <span className="ml-1">engenharia</span>
        <span className="term-cursor" aria-hidden="true">_</span>
      </button>

      {aberto && (
        <div
          role="dialog"
          aria-label="Terminal do Hally"
          className="term-pop absolute left-0 top-full mt-3 w-[22rem] max-w-[calc(100vw-2rem)] rounded-xl border border-primary/40 bg-[hsl(260_30%_6%/0.96)] shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.45)] backdrop-blur-md overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/60">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 font-pixel text-xs text-muted-foreground">hally@portfolio:~</span>
          </div>

          <div ref={saidaRef} className="font-pixel text-xs leading-relaxed px-3 py-3 max-h-48 overflow-y-auto" aria-live="polite">
            {linhas.length === 0 && (
              <p className="text-muted-foreground">Você achou o terminal. Escolhe um comando 👇</p>
            )}
            {linhas.map((l, i) =>
              l.tipo === 'cmd' ? (
                <p key={i} className="text-foreground">
                  <span className="text-primary">$</span> {l.texto}
                </p>
              ) : (
                <p key={i} className="text-muted-foreground pl-3">
                  {l.texto}
                </p>
              ),
            )}
            <p className="text-primary">
              $ <span className="term-cursor">▍</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pb-3">
            {comandos.map((c) => (
              <button
                key={c.cmd}
                type="button"
                onClick={() => rodar(c)}
                disabled={ocupado}
                className="font-pixel text-[11px] rounded-md border border-border bg-secondary/40 px-2 py-1 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-colors disabled:opacity-50"
              >
                {c.cmd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
