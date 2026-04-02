import { 
  Bot, 
  Workflow, 
  MessageSquare, 
  Database, 
  Cpu, 
  LineChart, 
  Code2, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const automationServices = [
  {
    icon: Bot,
    title: 'Agentes de IA Inteligentes',
    description: 'Desenvolvimento de agentes autônomos capazes de tomar decisões, processar informações e executar tarefas complexas sem intervenção humana.',
    features: ['Processamento de Linguagem Natural', 'Tomada de Decisão Automática', 'Aprendizado Contínuo', 'Integração Multi-plataforma'],
    color: 'from-indigo-500 to-purple-600'
  },
  {
    icon: Workflow,
    title: 'Automação de Workflows',
    description: 'Criação de fluxos de trabalho automatizados que eliminam tarefas repetitivas e aumentam a produtividade da equipe em até 300%.',
    features: ['Automação de Processos', 'Integração de Sistemas', 'Triggers Inteligentes', 'Relatórios Automáticos'],
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: MessageSquare,
    title: 'Chatbots e Assistentes Virtuais',
    description: 'Chatbots avançados com IA que compreendem contexto, aprendem com interações e oferecem suporte 24/7 aos seus clientes.',
    features: ['Compreensão Contextual', 'Respostas Personalizadas', 'Integração com CRM', 'Análise de Sentimento'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Database,
    title: 'Gestão de Dados com IA',
    description: 'Soluções inteligentes para coleta, processamento e análise de dados, transformando informações brutas em insights acionáveis.',
    features: ['ETL Automatizado', 'Data Quality', 'Análise Preditiva', 'Visualização Inteligente'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    icon: LineChart,
    title: 'Análise Preditiva',
    description: 'Modelos de machine learning que preveem tendências, comportamentos e resultados para decisões baseadas em dados.',
    features: ['Forecasting', 'Segmentação de Clientes', 'Detecção de Anomalias', 'Score de Propensão'],
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Code2,
    title: 'Integrações e APIs',
    description: 'Desenvolvimento de integrações customizadas entre sistemas, APIs inteligentes e middlewares para conectar toda sua stack tecnológica.',
    features: ['APIs RESTful', 'Webhooks', 'Middleware', 'Conectores Customizados'],
    color: 'from-violet-500 to-indigo-600'
  }
];

const stats = [
  { value: 80, suffix: '+', label: 'Automações Entregues' },
  { value: 88, suffix: '%', label: 'Redução de Tarefas Manuais' },
  { value: 10, suffix: 'x', label: 'Aumento de Produtividade' },
  { value: 24, suffix: '/7', label: 'Operação Automática' },
];

export function Automation() {
  return (
    <section id="automation" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Especialização Principal</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Automação &{' '}
            <span className="gradient-text">Inteligência Artificial</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Transformo negócios através da automação inteligente. Desenvolvo soluções que 
            eliminam tarefas repetitivas, otimizam processos e criam experiências 
            personalizadas usando o poder da IA.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="card-hover bg-card/50 border border-border rounded-2xl p-6 text-center relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${index === 0 ? 'from-indigo-500/10' : index === 1 ? 'from-purple-500/10' : index === 2 ? 'from-cyan-500/10' : 'from-emerald-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <p className="text-4xl md:text-5xl font-bold gradient-text mb-2 relative">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-muted-foreground text-sm relative">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {automationServices.map((service, index) => (
            <div 
              key={index}
              className="card-hover group bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-cyan-600/20 border border-primary/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-full mb-6">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground text-sm">Pronto para automatizar?</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vamos criar sua solução de IA
              </h3>
              
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Cada negócio é único. Vamos conversar sobre seus desafios e criar 
                uma solução de automação personalizada que vai transformar sua operação.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full glow"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Iniciar Projeto
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-border text-muted-foreground hover:bg-secondary px-8 py-6 text-lg rounded-full"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Cases de Sucesso
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
