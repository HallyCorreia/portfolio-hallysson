import { Briefcase, GraduationCap, Award, Sparkles } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Especialista em Automação & IA',
    company: 'Marvee',
    location: 'Blumenau, SC',
    period: '2023 - 2024',
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
    title: 'Graduação em Tecnologia',
    institution: 'GRAN',
    period: 'Em andamento',
    description: 'Formação superior com foco em desenvolvimento de software, automação e inteligência artificial.',
  },
];

const certifications = [
  {
    type: 'certification',
    title: 'OpenAI API Mastery',
    institution: 'OpenAI',
    period: '2024',
    description: 'Certificação avançada em integração e desenvolvimento de soluções com APIs da OpenAI.',
  },
  {
    type: 'certification',
    title: 'LangChain & LLM Development',
    institution: 'LangChain Academy',
    period: '2024',
    description: 'Desenvolvimento de aplicações com Large Language Models usando LangChain.',
  },
  {
    type: 'certification',
    title: 'Nivelamento do Programa Hackers do Bem',
    institution: 'Hackers do Bem',
    period: '2025',
    description: 'Formação em Cibersegurança, com foco em segurança de aplicações e proteção de dados.',
  },
  {
    type: 'certification',
    title: 'Certificado HTML',
    institution: 'LinkedIn Learning',
    period: '2025',
    description: 'Certificação em HTML fundamentos e boas práticas de desenvolvimento web.',
  },
];

export function Experience() {
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
                <h3 className="text-2xl font-bold text-white">Certificações</h3>
              </div>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="card-hover bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-pink-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                      <span className="px-2 py-1 bg-pink-500/10 text-pink-400 text-xs font-medium rounded-full">
                        {cert.period}
                      </span>
                    </div>
                    <p className="text-pink-400 text-sm font-medium mb-1">{cert.institution}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
