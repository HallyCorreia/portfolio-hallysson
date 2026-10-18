import { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Sparkles, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const particleCount = 80;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '0.8s' }} />
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Profile Image */}
        <div className="animate-slide-up opacity-0 mb-8" style={{ animationFillMode: 'forwards' }}>
          <div className="relative inline-block">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/30 mx-auto relative">
              <img 
                src="/profile.webp" 
                alt="Hallysson Correia - Especialista em Automação e IA" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-cyan-500 opacity-30 blur-xl -z-10 scale-110" />
            {/* AI Badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-4 h-4" />
              IA Expert
            </div>
          </div>
        </div>

        <div className="animate-slide-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
          <p className="text-primary font-medium mb-4 tracking-wider uppercase text-sm flex items-center justify-center gap-2">
            <Bot className="w-4 h-4" />
            Especialista em Automação & IA
          </p>
        </div>
        
        <h1 className="animate-slide-up opacity-0 stagger-1 text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ animationFillMode: 'forwards' }}>
          <span className="gradient-text">Hallysson</span>
          <span className="text-foreground"> Correia</span>
        </h1>
        
        <div className="animate-slide-up opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transformo processos complexos em{' '}
            <span className="text-primary font-semibold">soluções inteligentes</span>{' '}
            através de automações e Inteligência Artificial
          </p>
        </div>
        
        <div className="animate-slide-up opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground text-sm">Automação de Processos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <Bot className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground text-sm">Agentes de IA</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-muted-foreground text-sm">Integrações Inteligentes</span>
            </div>
          </div>
        </div>
        
        <div className="animate-slide-up opacity-0 stagger-4 flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationFillMode: 'forwards' }}>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full glow"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Vamos Automatizar
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border text-muted-foreground hover:bg-secondary px-8 py-6 text-lg rounded-full"
            onClick={() => document.getElementById('automation')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Soluções de IA
          </Button>
        </div>
        
        <div className="animate-slide-up opacity-0 stagger-5 flex justify-center gap-6" style={{ animationFillMode: 'forwards' }}>
          <a 
            href="https://github.com/hallyssoncorreia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary transition-all duration-300"
            aria-label="Visitar GitHub de Hallysson Correia"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://www.linkedin.com/in/hallysson-correia-722965218" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary transition-all duration-300"
            aria-label="Visitar LinkedIn de Hallysson Correia"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="mailto:hallysson.correia@email.com" 
            className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary transition-all duration-300"
            aria-label="Enviar email para Hallysson Correia"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <button 
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Rolar para a seção Sobre"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
