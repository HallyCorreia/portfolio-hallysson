import { Briefcase, GraduationCap, Award, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const experiences = [
  {
    type: 'work',
    title: 'Especialista em Automação & IA',
    company: 'Marvee',
    location: 'Blumenau, SC',
    period: '2025 - 2026',
    description: 'Liderança no desenvolvimento de soluções de automação e IA. Implementação de agentes inteligentes, pipelines de dados automatizados e integrações entre sistemas que reduziram tarefas manuais em 90%.',
    skills: ['Automação', 'IA Generativa', 'n8n', 'Python', 'APIs'],
  },
  {
    type: 'work',
    title: 'Desenvolvedor de Automações',
    company: 'Freelancer',
    location: 'Remoto',
    period: '2020 - 2023',
    description: 'Desenvolvimento de soluções customizadas de automação para diversos clientes. Criação de chatbots, workflows automatizados e integrações entre plataformas.',
    skills: ['Make', 'Zapier', 'JavaScript', 'Node.js', 'PostgreSQL'],
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
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-gradient-to-r from-purple-500/5 to-transparent -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Trajetória Profissional</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experiência & <span className="gradient-text">Formação</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Experiência Profissional</h3>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="card-hover relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300"
                >
                  {/* Timeline line */}
                  <div className="absolute -left-3 top-8 w-6 h-0.5 bg-indigo-500/30 hidden lg:block" />
                  <div className="absolute -left-4 top-7 w-3 h-3 rounded-full bg-indigo-500 hidden lg:block" />
                  
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-full">
                      {exp.period}
                    </span>
                    <span className="text-slate-500 text-sm">{exp.location}</span>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-1">{exp.title}</h4>
                  <p className="text-indigo-400 font-medium mb-3">{exp.company}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full"
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
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Educação</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div 
                    key={index}
                    className="card-hover bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-medium rounded-full mb-3">
                      {edu.period}
                    </span>
                    <h4 className="text-xl font-semibold text-white mb-1">{edu.title}</h4>
                    <p className="text-purple-400 font-medium mb-3">{edu.institution}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Certificações</h3>
                  <p className="text-slate-500 text-sm">{certifications.length} certificados conquistados</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleCerts.map((cert, index) => (
                  <div
                    key={index}
                    className="group bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-pink-500/30 hover:bg-slate-900/80 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="text-pink-400 text-xs font-medium">{cert.institution}</span>
                      <span className="ml-auto text-slate-600 text-xs">{cert.period}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white leading-snug group-hover:text-pink-100 transition-colors">
                      {cert.title}
                    </h4>
                  </div>
                ))}
              </div>

              {certifications.length > 6 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-800 hover:border-pink-500/30 text-slate-400 hover:text-pink-400 text-sm font-medium transition-all duration-300 bg-slate-900/30 hover:bg-slate-900/60"
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

        {/* Coding image banner */}
        <div className="mt-20 relative rounded-3xl overflow-hidden border border-slate-800 h-[480px]">
          <img
            src="/coding.jpeg"
            alt="Hallysson Correia programando"
            style={{
              position: 'absolute',
              right: 0,
              top: '-30%',
              height: '160%',
              width: 'auto',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 max-w-xl">
            <span className="text-pink-400 text-sm font-medium mb-3 tracking-wide uppercase">Sempre evoluindo</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Aprendizado contínuo é parte da rotina
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cada certificação representa horas dedicadas a dominar ferramentas e conceitos que aplicam valor real aos projetos.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
