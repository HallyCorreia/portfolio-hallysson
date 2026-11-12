import { Briefcase, GraduationCap, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// Fonte: LinkedIn (perfil hallysson-correia-722965218), conferido em 11/2026.
const experiences = [
  {
    type: 'work',
    title: 'Desenvolvedor Full Stack com foco em IA',
    company: 'Marvee',
    location: 'Blumenau, SC',
    period: 'set. 2026 – atual',
    description: 'Desenvolvimento de aplicações e automações com IA, de ponta a ponta, conectando tecnologia às regras de negócio da empresa.',
    skills: ['React', 'TypeScript', 'Supabase', 'Claude Code', 'Engenharia de prompt'],
  },
  {
    type: 'work',
    title: 'Gestor de Automação',
    company: 'Marvee',
    location: 'Blumenau, SC',
    period: 'nov. 2025 – set. 2026',
    description: 'Automações e agentes de IA para destravar gargalos do dia a dia da operação, com especialização em IA generativa.',
    skills: ['n8n', 'Agentes de IA', 'IA generativa', 'APIs'],
  },
  {
    type: 'work',
    title: 'Analista de sistema e Consultor de implantação',
    company: 'Sances',
    location: 'Blumenau, SC',
    period: 'jan. 2022 – nov. 2025',
    description: 'Análise de sistemas e, na fase final, implantação: treinamento de usuários, onboarding de clientes e otimização de processos via SQL Server.',
    skills: ['SQL Server', 'Análise de sistemas', 'Implantação', 'Análise de dados'],
  },
  {
    type: 'work',
    title: 'Técnico de suporte em TI',
    company: 'Sergipe Industrial Têxtil',
    location: 'Sergipe',
    period: 'abr. 2018 – ago. 2021',
    description: 'Suporte técnico e redes LAN/WAN.',
    skills: ['Redes LAN-WAN', 'Serviços técnicos'],
  },
  {
    type: 'work',
    title: 'Técnico de suporte em TI',
    company: 'Peixoto Gonçalves S/A',
    location: 'Neópolis, SE',
    period: 'mar. 2017 – abr. 2018',
    description: 'Início da carreira em TI, com suporte técnico.',
    skills: ['Suporte técnico'],
  },
];

const education = [
  {
    type: 'education',
    title: 'Engenharia de Software',
    institution: 'GRAN',
    period: 'Em andamento',
    description: 'Formação superior com foco em desenvolvimento de software, automação e inteligência artificial.',
  },
];

const certifications = [
  {
    type: 'certification',
    title: 'Introdução aos Fundamentos de IA Generativa',
    institution: 'Universia',
    period: '2025',
    description: 'Fundamentos de Inteligência Artificial Generativa e suas aplicações práticas.',
  },
  {
    type: 'certification',
    title: 'Técnicas de Engenharia de Prompt',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Técnicas avançadas para elaboração de prompts eficientes com modelos de linguagem.',
  },
  {
    type: 'certification',
    title: 'Formação de ChatGPT',
    institution: 'Hashtag Treinamentos',
    period: '2025',
    description: 'Formação completa no uso estratégico do ChatGPT para produtividade e automação.',
  },
  {
    type: 'certification',
    title: 'Formação de Lovable',
    institution: 'Hashtag Treinamentos',
    period: '2025',
    description: 'Desenvolvimento de aplicações web com a plataforma Lovable baseada em IA.',
  },
  {
    type: 'certification',
    title: 'Formação de n8n',
    institution: 'Hashtag Treinamentos',
    period: '2025',
    description: 'Automação de workflows com n8n, integrações e agentes de IA.',
  },
  {
    type: 'certification',
    title: 'Formação de Veo3',
    institution: 'Hashtag Treinamentos',
    period: '2025',
    description: 'Geração de vídeos com IA utilizando o modelo Veo3 do Google.',
  },
  {
    type: 'certification',
    title: 'SQL Server',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Administração e consultas avançadas em SQL Server.',
  },
  {
    type: 'certification',
    title: 'Como Trabalhar com Inteligência Artificial',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Aplicação prática de IA no ambiente de trabalho e otimização de processos.',
  },
  {
    type: 'certification',
    title: 'Fundamentos de Modelos de Linguagem de Grande Escala',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Conceitos e aplicações de Large Language Models (LLMs).',
  },
  {
    type: 'certification',
    title: 'Administração de Bancos de Dados',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Gestão, manutenção e otimização de bancos de dados relacionais.',
  },
  {
    type: 'certification',
    title: 'AI-900 — Fundamentos de IA no Azure',
    institution: 'Microsoft',
    period: '2025',
    description: 'Fundamentos de Inteligência Artificial e serviços de IA na plataforma Azure.',
  },
  {
    type: 'certification',
    title: 'Aplicações Práticas da Inteligência Artificial',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Implementação de soluções de IA em cenários reais de negócio.',
  },
  {
    type: 'certification',
    title: 'Bootcamp Programador',
    institution: 'DevClub',
    period: '2025',
    description: 'Bootcamp intensivo de programação full stack com foco em desenvolvimento web.',
  },
  {
    type: 'certification',
    title: 'CSS — Fundamentos e Boas Práticas',
    institution: 'DevClub',
    period: '2025',
    description: 'Estilização web com CSS moderno, responsividade e boas práticas.',
  },
  {
    type: 'certification',
    title: 'Introdução ao n8n',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Primeiros passos com automação de fluxos de trabalho usando n8n.',
  },
  {
    type: 'certification',
    title: 'Google — Inteligência Artificial e Produtividade',
    institution: 'Google',
    period: '2025',
    description: 'Uso de ferramentas de IA do Google para aumento de produtividade.',
  },
  {
    type: 'certification',
    title: 'HTML — Fundamentos',
    institution: 'DevClub',
    period: '2025',
    description: 'Fundamentos de HTML e estruturação semântica de páginas web.',
  },
  {
    type: 'certification',
    title: 'IA para Devs',
    institution: 'DevClub',
    period: '2025',
    description: 'Integração de Inteligência Artificial em projetos de desenvolvimento de software.',
  },
  {
    type: 'certification',
    title: 'Imersão Inteligência Artificial na Prática',
    institution: 'Alura',
    period: '2025',
    description: 'Imersão prática em IA com projetos reais e ferramentas de ponta.',
  },
  {
    type: 'certification',
    title: 'Introdução à Engenharia de Prompts',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Técnicas introdutórias de engenharia de prompts para modelos de linguagem.',
  },
  {
    type: 'certification',
    title: 'Introdução à Inteligência Artificial',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Conceitos fundamentais de Inteligência Artificial e suas aplicações.',
  },
  {
    type: 'certification',
    title: 'Liderança de Alta Performance — Lições da Fórmula 1',
    institution: 'Fundação Bradesco',
    period: '2025',
    description: 'Desenvolvimento de liderança e gestão de alta performance.',
  },
];

export function Experience() {
  const [showAll, setShowAll] = useState(false);
  const visibleCerts = showAll ? certifications : certifications.slice(0, 6);

  return (
    <section id="experience" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-gradient-to-r from-accent/5 to-transparent -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <p className="font-pixel text-primary uppercase text-sm mb-3">// trajetória</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Experiência e <span className="gradient-text">formação</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Experiência Profissional</h3>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="card-hover relative bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  {/* Timeline line */}
                  <div className="absolute -left-3 top-8 w-6 h-0.5 bg-primary/30 hidden lg:block" />
                  <div className="absolute -left-4 top-7 w-3 h-3 rounded-full bg-primary hidden lg:block" />
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {exp.period}
                    </span>
                    <span className="text-muted-foreground text-sm">{exp.location}</span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-foreground mb-1">{exp.title}</h4>
                  <p className="text-primary font-medium mb-3">{exp.company}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-secondary text-foreground/80 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Educação</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="card-hover bg-card/50 border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
                  >
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-3">
                      {edu.period}
                    </span>
                    <h4 className="text-xl font-semibold text-foreground mb-1">{edu.title}</h4>
                    <p className="text-accent font-medium mb-3">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Certificações</h3>
                  <p className="text-muted-foreground text-sm">{certifications.length} certificados conquistados</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleCerts.map((cert, index) => (
                  <div
                    key={index}
                    className="group bg-card/50 border border-border rounded-xl p-4 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-primary text-xs font-medium">{cert.institution}</span>
                      <span className="ml-auto text-muted-foreground/70 text-xs">{cert.period}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                  </div>
                ))}
              </div>

              {certifications.length > 6 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border hover:border-primary/30 text-muted-foreground hover:text-primary text-sm font-medium transition-all duration-300 bg-card/30 hover:bg-card/60"
                >
                  {showAll ? (
                    <><ChevronUp className="w-4 h-4" /> Ver menos</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> Ver todas as {certifications.length} certificações</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
