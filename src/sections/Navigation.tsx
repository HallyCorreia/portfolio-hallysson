import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Sobre', href: '#about' },
  { label: 'Automação & IA', href: '#automation' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass border-b border-slate-800/50 py-4' 
            : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2"
            >
              <span className="text-xl font-bold gradient-text">HC</span>
              <span className="hidden sm:inline text-slate-400 text-sm">|</span>
              <span className="hidden sm:inline text-indigo-400 text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                IA Expert
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button 
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contratar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-20 left-4 right-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-slate-300 hover:text-white transition-colors text-lg font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white mt-4"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contratar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
