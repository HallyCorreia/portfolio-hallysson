import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Github, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';

const formatClock = (d: Date) => d.toLocaleTimeString('pt-BR', { hour12: false });

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();

    const particleCount = window.innerWidth < 640 ? 40 : 80;
    const connectionDistance = 150;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    let animationId = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(18, 17, 24, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 166, 255, 0.55)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 166, 255, ${0.18 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      if (!reduceMotion) animationId = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const socials = [
    { href: site.social.github, label: 'GitHub', icon: Github },
    { href: site.social.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: site.social.instagram, label: 'Instagram', icon: Instagram },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px]" aria-hidden="true" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-slide-up opacity-0 mb-8" style={{ animationFillMode: 'forwards' }}>
          <div className="relative inline-block">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary/40 mx-auto">
              <img
                src="/profile.webp"
                alt="Hallysson Correia"
                width={176}
                height={176}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl -z-10 scale-110" aria-hidden="true" />
          </div>
        </div>

        <div className="animate-slide-up opacity-0 stagger-1 flex flex-col items-center gap-4 mb-5" style={{ animationFillMode: 'forwards' }}>
          <span className="font-pixel inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground">
            <span className="rec-dot" aria-hidden="true" />
            EXPEDIENTE <span className="tabular-nums">{clock}</span>
          </span>
          <p className="font-pixel text-primary uppercase text-sm">&gt; automação &amp; IA aplicada_</p>
        </div>

        <h1 className="animate-slide-up opacity-0 stagger-1 text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6" style={{ animationFillMode: 'forwards' }}>
          <span className="gradient-text">Hallysson</span>
          <span className="text-foreground"> Correia</span>
        </h1>

        <p
          className="animate-slide-up opacity-0 stagger-2 text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
          style={{ animationFillMode: 'forwards' }}
        >
          Automatizo o trabalho repetitivo da sua empresa e coloco{' '}
          <span className="text-foreground font-semibold">sites, sistemas e agentes de IA</span> no ar, do
          protótipo ao deploy.
        </p>

        <div
          className="animate-slide-up opacity-0 stagger-3 flex flex-col sm:flex-row gap-4 justify-center mb-10"
          style={{ animationFillMode: 'forwards' }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
            onClick={() => scrollTo('projects')}
          >
            Ver projetos no ar <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary px-8 py-6 text-lg rounded-full"
            onClick={() => scrollTo('contact')}
          >
            Falar comigo
          </Button>
        </div>

        <div className="animate-slide-up opacity-0 stagger-4 flex justify-center gap-4" style={{ animationFillMode: 'forwards' }}>
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-colors"
              aria-label={`${label} de Hallysson Correia`}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollTo('projects')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors motion-safe:animate-bounce"
        aria-label="Rolar para os projetos"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
