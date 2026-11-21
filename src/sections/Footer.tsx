import { ArrowUp } from 'lucide-react';
import { site } from '@/config/site';

const navLinks = [
  { label: 'Projetos', href: '#projects' },
  { label: 'Serviços', href: '#services' },
  { label: 'Sobre', href: '#about' },
  { label: 'Trajetória', href: '#experience' },
  { label: 'Conteúdo', href: '#bastidores' },
  { label: 'Contato', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-extrabold gradient-text" style={{ fontFamily: 'var(--font-display, inherit)' }}>
              {site.name}
            </p>
            <p className="font-pixel text-muted-foreground text-xs mt-1">&gt; engenharia &amp; arquitetura de software_</p>
            {/* Dica do easter egg: aponta para o terminal sem contar o que tem lá. */}
            <p className="font-pixel text-muted-foreground/70 text-[11px] mt-2">
              // psst: o <span className="text-primary">&gt;</span> lá no topo não é só enfeite
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Rodapé">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full h-px bg-border my-8" />

        <p className="text-center text-muted-foreground text-sm">
          © {currentYear} {site.name} · {site.location} ·{' '}
          <span className="select-all">{site.email}</span>
        </p>
      </div>
    </footer>
  );
}
