import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Phone, Send, Linkedin, Github, CheckCircle, Bot, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .transform((val) => val.trim()),
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'Email muito longo')
    .transform((val) => val.trim()),
  subject: z
    .string()
    .min(5, 'Assunto deve ter pelo menos 5 caracteres')
    .max(150, 'Assunto muito longo')
    .transform((val) => val.trim()),
  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem muito longa')
    .transform((val) => val.trim()),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
    href: 'https://github.com/HallyCorreia',
  },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In production, send to your backend
    console.log('Form data:', data);
    
    toast.success('Mensagem enviada com sucesso!', {
      description: 'Retornarei em até 24 horas.',
    });
    
    reset();
  };

  return (
    <section id="contact" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Vamos Trabalhar Juntos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pronto para <span className="gradient-text">Automatizar?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tem um processo que gostaria de automatizar? Quer implementar IA no seu negócio? 
            Vamos conversar sobre como posso ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Informações de Contato
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Estou sempre aberto a novos desafios e projetos interessantes. 
              Seja para uma automação simples ou uma solução completa de IA, 
              vamos encontrar a melhor abordagem para o seu negócio.
            </p>
            
            {/* Quick services */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-card/50 border border-border rounded-xl">
                <Bot className="w-6 h-6 text-primary mb-2" />
                <p className="text-foreground font-medium text-sm">Agentes de IA</p>
                <p className="text-muted-foreground/70 text-xs">Chatbots inteligentes</p>
              </div>
              <div className="p-4 bg-card/50 border border-border rounded-xl">
                <Zap className="w-6 h-6 text-accent mb-2" />
                <p className="text-foreground font-medium text-sm">Automações</p>
                <p className="text-muted-foreground/70 text-xs">Workflows automáticos</p>
              </div>
            </div>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-card/50 border border-border rounded-xl hover:border-primary/30 transition-all duration-300 group"
                  aria-label={`${info.label}: ${info.value}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground/70 text-sm">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Social Links */}
            <div>
              <p className="text-muted-foreground/70 text-sm mb-4">Redes Sociais</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary transition-all duration-300"
                    aria-label={`Visitar ${social.label}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/50 border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Envie uma Mensagem
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Conte-me sobre seu projeto e retornarei em até 24 horas.
            </p>
            
            {isSubmitSuccessful ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Mensagem Enviada!</h4>
                <p className="text-muted-foreground">Obrigado pelo contato. Responderei em breve!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-muted-foreground text-sm mb-2">
                      Nome
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      {...register('name')}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-muted-foreground text-sm mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-muted-foreground text-sm mb-2">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Ex: Automação de processo de vendas"
                    {...register('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary"
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-muted-foreground text-sm mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Descreva seu projeto ou necessidade..."
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    rows={5}
                    className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary resize-none"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                  aria-label="Enviar mensagem de contato"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
