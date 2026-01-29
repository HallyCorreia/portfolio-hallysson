import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Linkedin, Github, CheckCircle, Bot, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hallysson.correia@email.com',
    href: 'mailto:hallysson.correia@email.com',
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+55 (47) 99999-9999',
    href: 'tel:+5547999999999',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Blumenau, SC - Brasil',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hallysson-correia-722965218',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com',
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Vamos Trabalhar Juntos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para <span className="gradient-text">Automatizar?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tem um processo que gostaria de automatizar? Quer implementar IA no seu negócio? 
            Vamos conversar sobre como posso ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Informações de Contato
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Estou sempre aberto a novos desafios e projetos interessantes. 
              Seja para uma automação simples ou uma solução completa de IA, 
              vamos encontrar a melhor abordagem para o seu negócio.
            </p>
            
            {/* Quick services */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <Bot className="w-6 h-6 text-indigo-400 mb-2" />
                <p className="text-white font-medium text-sm">Agentes de IA</p>
                <p className="text-slate-500 text-xs">Chatbots inteligentes</p>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <Zap className="w-6 h-6 text-purple-400 mb-2" />
                <p className="text-white font-medium text-sm">Automações</p>
                <p className="text-slate-500 text-xs">Workflows automáticos</p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <info.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Social Links */}
            <div>
              <p className="text-slate-500 text-sm mb-4">Redes Sociais</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Envie uma Mensagem
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Conte-me sobre seu projeto e retornarei em até 24 horas.
            </p>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Mensagem Enviada!</h4>
                <p className="text-slate-400">Obrigado pelo contato. Responderei em breve!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-400 text-sm mb-2">
                      Nome
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-400 text-sm mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-slate-400 text-sm mb-2">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Ex: Automação de processo de vendas"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-slate-400 text-sm mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Descreva seu projeto ou necessidade..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
