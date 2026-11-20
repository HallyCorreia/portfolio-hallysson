import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { RequestForm } from '@/components/RequestForm';
import { readQuery } from '@/lib/requestQuery';

export function RequestPage() {
  const [initial] = useState(readQuery);

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

        <RequestForm initial={initial} />
      </div>
    </div>
  );
}
