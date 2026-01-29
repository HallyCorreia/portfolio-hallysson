import { Heart, ArrowUp, Bot, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Automação & IA', href: '#automation' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold gradient-text">Hallysson Correia</h3>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400 text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                IA
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              Especialista em Automação & Inteligência Artificial
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-slate-400 hover:text-indigo-400 transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-300"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800 my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1">
            © {currentYear} Hallysson Correia. Feito com{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> e{' '}
            <Bot className="w-4 h-4 text-indigo-400" /> em Blumenau, SC
          </p>
        </div>
      </div>
    </footer>
  );
}
