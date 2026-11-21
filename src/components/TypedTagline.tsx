// Linha "> engenharia de software_" que alterna digitando entre as frases.
// Com prefers-reduced-motion (e no HTML pré-renderizado) mostra a versão fixa.
import { useEffect, useState } from 'react';

const frases = ['engenharia de software', 'arquitetura de sistemas'];
const fixa = 'engenharia & arquitetura de software';

export function TypedTagline() {
  const [texto, setTexto] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Começa apagando a frase fixa (a mesma do HTML pré-renderizado) e segue alternando.
    let alvo = fixa;
    let i = -1;
    let n = fixa.length;
    let apagando = true;
    let timer = 0;
    const passo = () => {
      if (!apagando) {
        n++;
        setTexto(alvo.slice(0, n));
        if (n === alvo.length) {
          apagando = true;
          timer = window.setTimeout(passo, 2200);
          return;
        }
        timer = window.setTimeout(passo, 55);
      } else {
        n--;
        setTexto(alvo.slice(0, n));
        if (n === 0) {
          apagando = false;
          i = (i + 1) % frases.length;
          alvo = frases[i];
          timer = window.setTimeout(passo, 350);
          return;
        }
        timer = window.setTimeout(passo, 28);
      }
    };
    timer = window.setTimeout(passo, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <p className="font-pixel text-primary uppercase text-sm min-h-[1.25rem]">
      <span className="sr-only">{fixa}</span>
      <span aria-hidden="true">
        &gt; {texto ?? fixa}
        <span className="term-cursor">_</span>
      </span>
    </p>
  );
}
