import { ExternalLink, Github, Bot, Zap, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Agente de Atendimento IA',
    description: 'Chatbot inteligente com GPT-4 que atende clientes 24/7, resolve dúvidas complexas e integra-se ao CRM da empresa. Reduziu em 70% o tempo de resposta.',
    image: 'gradient-1',
    tags: ['OpenAI GPT-4', 'Node.js', 'PostgreSQL', 'n8n'],
    icon: Bot,
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Pipeline de Dados Automatizado',
    description: 'Sistema ETL completo que coleta, processa e analisa dados de múltiplas fontes em tempo real. Gera relatórios automáticos e alertas inteligentes.',
    image: 'gradient-2',
    tags: ['Python', 'Apache Airflow', 'AWS', 'Power BI'],
    icon: Zap,
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Automação de Processos Internos',
    description: 'Suite de automações que eliminou 90% das tarefas manuais da operação, desde onboarding de clientes até geração de documentos.',
    image: 'gradient-3',
    tags: ['Make', 'Google Apps Script', 'Notion API', 'Slack API'],
    icon: Brain,
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Assistente Virtual de Vendas',
    description: 'IA que qualifica leads automaticamente, agenda reuniões e envia propostas personalizadas. Aumentou a taxa de conversão em 45%.',
    image: 'gradient-4',
    tags: ['LangChain', 'Python', 'FastAPI', 'Twilio'],
    icon: MessageSquare,
    demoUrl: '#',
    repoUrl: '#',
  },
];

const gradientStyles: Record<string, string> = {
  'gradient-1': 'from-indigo-500 via-purple-500 to-pink-500',
  'gradient-2': 'from-emerald-500 via-teal-500 to-cyan-500',
  'gradient-3': 'from-orange-500 via-red-500 to-pink-500',
  'gradient-4': 'from-blue-500 via-indigo-500 to-violet-500',
};

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-purple-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-medium mb-2 tracking-wider uppercase text-sm">
            Portfólio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cases de <span className="gradient-text">Automação & IA</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Projetos reais que demonstram o poder da automação inteligente 
            e da IA aplicada a negócios.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="card-hover group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Project Image */}
              <div className={`aspect-video bg-gradient-to-br ${gradientStyles[project.image]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <project.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    <Button 
                      size="sm" 
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      onClick={() => window.open(project.demoUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/20"
                      onClick={() => window.open(project.repoUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Código
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            Ver Mais Projetos
          </Button>
        </div>
      </div>
    </section>
  );
}
