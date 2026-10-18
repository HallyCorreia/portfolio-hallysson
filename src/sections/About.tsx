import { Database, Globe, Server, Shield, Brain, Bot, Sparkles } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const stats = [
  { value: 8, suffix: '+', label: 'Anos de Experiência' },
  { value: 98, suffix: '+', label: 'Automações Criadas' },
  { value: 25, suffix: '+', label: 'Projetos de IA' },
  { value: 98, suffix: '%', label: 'Satisfação Clientes' },
];

const services = [
  {
    icon: Bot,
    title: 'Agentes de IA',
    description: 'Desenvolvimento de agentes autônomos inteligentes para automação de tarefas complexas.',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Modelos preditivos e algoritmos de aprendizado para insights de negócio.',
  },
  {
    icon: Globe,
    title: 'Automação Web',
    description: 'Automação de processos web, scraping inteligente e integrações de sistemas.',
  },
  {
    icon: Database,
    title: 'Banco de Dados',
    description: 'Modelagem, otimização e gestão de bases de dados com processamento inteligente.',
  },
  {
    icon: Server,
    title: 'Suporte Técnico',
    description: 'Suporte especializado em infraestrutura com monitoramento automatizado.',
  },
  {
    icon: Shield,
    title: 'Cibersegurança',
    description: 'Proteção de dados e sistemas com detecção de ameaças baseada em IA.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Sobre Mim</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Conheça Minha <span className="gradient-text">Trajetória</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="card-hover bg-card/50 border border-border rounded-2xl p-6 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[9/16] rounded-3xl overflow-hidden border border-border relative group">
              <img
                src="/profile-about.webp"
                alt="Hallysson Correia"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Especialista em Automação e IA
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Iniciei minha trajetória em 2017, atuando em suporte técnico, redes e bancos de dados.
              Desde então, venho ampliando minha experiência e hoje atuo como{' '}
              <strong className="text-foreground">Gestor de Automações</strong>, unindo tecnologia,
              automação e desenvolvimento para entregar resultados estratégicos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sou apaixonado por transformar processos complexos em soluções simples e eficientes.
              Nos últimos anos, mergulhei em projetos de{' '}
              <strong className="text-foreground">desenvolvimento web</strong> e venho me especializando
              em automações com <strong className="text-foreground">n8n</strong>,{' '}
              <strong className="text-foreground">IA generativa</strong> e engenharia de prompts.
              Meu objetivo vai além de resolver problemas: quero gerar confiança, fortalecer equipes
              e criar valor real para os negócios.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Um ponto marcante da minha jornada foi enfrentar o diagnóstico de uma deficiência
              progressiva chamada <strong className="text-foreground">Charcot</strong>. Esse desafio
              não me limitou, pelo contrário, fortaleceu minha resiliência e reforçou a importância
              do aprendizado contínuo. Sigo evoluindo e transformando adversidades em oportunidades.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Acredito que a <strong className="text-foreground">tecnologia aplicada de forma estratégica</strong>{' '}
              impulsiona produtividade e gera impacto positivo. Estou sempre aberto a novos desafios
              e disposto a contribuir com projetos que façam a diferença.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              {['JavaScript', 'Automação', 'Machine Learning', 'IA Generativa', 'APIs', 'Banco de Dados', 'Lovable', 'Engenharia de Prompt', 'n8n', 'Typebot', 'Web Design', 'SQL', 'Cibersegurança', 'Vibe Coding', 'Frontend', 'Gestão'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-secondary/50 border border-border rounded-full text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            O que Eu Faço
          </h3>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Combino tecnologia de ponta com criatividade para desenvolver soluções 
            que realmente fazem a diferença no seu negócio.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="card-hover group bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
