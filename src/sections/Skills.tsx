import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'Inteligência Artificial',
    skills: [
      { name: 'OpenAI GPT', level: 95 },
      { name: 'Claude AI', level: 90 },
      { name: 'LangChain', level: 85 },
      { name: 'Machine Learning', level: 80 },
      { name: 'Prompt Engineering', level: 92 },
    ],
  },
  {
    title: 'Automação & Workflows',
    skills: [
      { name: 'n8n', level: 95 },
      { name: 'Make (Integromat)', level: 90 },
      { name: 'Zapier', level: 88 },
      { name: 'Python Automation', level: 92 },
      { name: 'RPA', level: 75 },
    ],
  },
  {
    title: 'Desenvolvimento',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'React', level: 75 },
      { name: 'APIs RESTful', level: 88 },
    ],
  },
  {
    title: 'Banco de Dados & Cloud',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 70 },
      { name: 'AWS', level: 75 },
      { name: 'Docker', level: 78 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setTimeout(() => {
            setWidth(level);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-indigo-400 font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-medium mb-2 tracking-wider uppercase text-sm">
            Competências
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Stack tecnológica completa para desenvolver soluções de IA e automação 
            de ponta a ponta.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="card-hover bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
                  {categoryIndex + 1}
                </span>
                {category.title}
              </h3>
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skillIndex}
                    name={skill.name}
                    level={skill.level}
                    delay={skillIndex * 100}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies tags */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-6">Tecnologias que domino</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'OpenAI', 'Claude', 'LangChain', 'Pinecone', 'n8n', 'Make',
              'Python', 'FastAPI', 'Node.js', 'React', 'TypeScript',
              'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS',
              'Git', 'GitHub Actions', 'REST APIs', 'GraphQL', 'WebSockets'
            ].map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-slate-300 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-400 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
