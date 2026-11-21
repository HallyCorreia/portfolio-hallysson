import { useState } from 'react';
import { ArrowLeft, Check, Copy, Share2, Ticket } from 'lucide-react';
import { RequestForm } from '@/components/RequestForm';
import { cupomInfo, readQuery } from '@/lib/requestQuery';

// Texto de indicação: leva ao portfólio, não ao cupom. Quem recebe ainda precisa achar o terminal.
const SITE_URL = 'https://hallyssoncorreia.com.br/';
const TEXTO_INDICACAO = 'Tem um cupom escondido no terminal deste portfólio. Acha se conseguir 👀';

function CupomBanner({ codigo }: { codigo: string }) {
  const [aviso, setAviso] = useState('');

  const avisar = (texto: string) => {
    setAviso(texto);
    window.setTimeout(() => setAviso(''), 2200);
  };

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      avisar('código copiado');
    } catch {
      avisar('não deu para copiar, anote o código');
    }
  };

  const indicar = async () => {
    const dados = { title: 'Hallysson Correia', text: TEXTO_INDICACAO, url: SITE_URL };
    try {
      if (navigator.share) {
        await navigator.share(dados);
        return;
      }
      await navigator.clipboard.writeText(`${TEXTO_INDICACAO} ${SITE_URL}`);
      avisar('convite copiado, é só colar');
    } catch {
      // Compartilhamento cancelado pela pessoa: nada a fazer.
    }
  };

  const botao =
    'inline-flex items-center gap-1.5 font-pixel text-xs rounded-md border border-border bg-secondary/40 px-3 py-2 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-colors';

  return (
    <section
      aria-labelledby="cupom-titulo"
      className="mb-10 rounded-2xl border border-primary/50 bg-[hsl(260_30%_6%/0.85)] shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.5)] overflow-hidden"
    >
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/60">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" aria-hidden="true" />
        <span className="ml-2 font-pixel text-xs text-muted-foreground">hally@portfolio:~/cupom</span>
      </div>
      <div className="p-5 md:p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Ticket className="w-6 h-6 text-primary shrink-0 mt-1" aria-hidden="true" />
          <div className="space-y-1">
            <h2 id="cupom-titulo" className="text-xl md:text-2xl font-extrabold">
              Você achou o cupom <span className="font-pixel text-primary">{codigo}</span>
            </h2>
            <p className="text-muted-foreground">
              Vale <strong className="text-foreground">{cupomInfo.beneficio}</strong> no seu projeto. Ele já está
              aplicado: é só preencher abaixo e enviar o pedido de orçamento.
            </p>
            <p className="text-muted-foreground text-sm">
              {[cupomInfo.validade, cupomInfo.regras, cupomInfo.aviso].filter(Boolean).join(' ')}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={copiarCodigo} className={botao}>
            <Copy className="w-3.5 h-3.5" aria-hidden="true" /> copiar código
          </button>
          <button type="button" onClick={indicar} className={botao}>
            <Share2 className="w-3.5 h-3.5" aria-hidden="true" /> desafiar alguém a achar
          </button>
          <span className="font-pixel text-xs text-primary inline-flex items-center gap-1" role="status" aria-live="polite">
            {aviso && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
            {aviso}
          </span>
        </div>
      </div>
    </section>
  );
}

export function RequestPage({ cupom = false }: { cupom?: boolean }) {
  const [initial] = useState(() => readQuery(cupom));

  return (
    <div className="min-h-screen text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Voltar ao portfólio
        </a>

        <p className="font-pixel text-primary uppercase text-sm mb-3">// solicitar serviço</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Vamos tirar isso <span className="gradient-text">do papel</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          Preencha em 2 minutos. Eu leio, entendo o contexto e respondo com o caminho que seguiria, o prazo e uma
          estimativa.
          {initial.ref && (
            <>
              {' '}
              Você veio pelo projeto <span className="text-foreground font-semibold">{initial.ref}</span>.
            </>
          )}
        </p>

        {initial.cupom && <CupomBanner codigo={initial.cupom} />}

        <RequestForm initial={initial} />
      </div>
    </div>
  );
}
