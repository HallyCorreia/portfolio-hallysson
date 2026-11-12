import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Send, Linkedin, Github, Instagram, MessageCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { site, mailtoUrl, whatsappUrl } from '@/config/site';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Escreva seu nome (mínimo 2 letras)').max(100, 'Nome muito longo'),
  company: z.string().trim().max(100, 'Nome muito longo').optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Conte um pouco mais (mínimo 10 caracteres)')
    .max(1500, 'Mensagem muito longa'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: site.social.linkedin },
  { icon: Instagram, label: 'Instagram', href: site.social.instagram },
  { icon: Github, label: 'GitHub', href: site.social.github },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState<'email' | 'whatsapp' | null>(null);
  const hasWhatsapp = Boolean(site.whatsapp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const buildText = (data: ContactFormData) =>
    [`Olá, Hallysson! Sou ${data.name}${data.company ? `, da ${data.company}` : ''}.`, '', data.message].join('\n');

  const openEmail = (data: ContactFormData) => {
    window.location.assign(mailtoUrl(`Projeto: ${data.name}${data.company ? ` (${data.company})` : ''}`, buildText(data)));
    setOpened('email');
  };

  const openWhatsapp = (data: ContactFormData) => {
    window.open(whatsappUrl(buildText(data)), '_blank', 'noopener,noreferrer');
    setOpened('whatsapp');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <p className="font-pixel text-primary uppercase text-sm mb-3">// contato</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Tem um processo que <span className="gradient-text">dá pra automatizar?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Me conta o que hoje é feito na mão. Respondo com o caminho que eu seguiria e quanto tempo leva.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10">
          <div className="space-y-6 min-w-0">
            <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-sm">E-mail</p>
                  <p className="text-foreground font-semibold break-all select-all">{site.email}</p>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mt-1 inline-flex items-center gap-1.5 font-pixel text-xs text-primary hover:underline"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'COPIADO' : 'COPIAR E-MAIL'}
                  </button>
                </div>
              </div>

              {hasWhatsapp && (
                <a
                  href={whatsappUrl('Olá, Hallysson! Vim pelo seu site.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">WhatsApp</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">Chamar no WhatsApp</p>
                  </div>
                </a>
              )}

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Base</p>
                  <p className="text-foreground font-semibold">{site.location} · atendo remoto</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit(hasWhatsapp ? openWhatsapp : openEmail)}
            className="rounded-2xl border border-border bg-card/50 p-6 md:p-8 space-y-5 min-w-0"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Seu nome</label>
                <Input id="contact-name" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-company" className="text-sm font-medium text-foreground">
                  Empresa <span className="text-muted-foreground">(opcional)</span>
                </label>
                <Input id="contact-company" autoComplete="organization" {...register('company')} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                O que você quer automatizar ou construir?
              </label>
              <Textarea
                id="contact-message"
                rows={6}
                placeholder="Ex.: todo dia copio pedidos do WhatsApp para uma planilha e depois mando para o estoque."
                {...register('message')}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-destructive text-sm">{errors.message.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                <Send className="w-4 h-4 mr-2" />
                {hasWhatsapp ? 'Enviar pelo WhatsApp' : 'Enviar por e-mail'}
              </Button>
              {hasWhatsapp && (
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                  onClick={handleSubmit(openEmail)}
                >
                  Prefiro e-mail
                </Button>
              )}
            </div>

            <p className="text-muted-foreground text-sm" aria-live="polite">
              {opened === 'email'
                ? `Abrimos seu app de e-mail com a mensagem pronta. Se nada abriu, escreva para ${site.email}.`
                : opened === 'whatsapp'
                  ? 'Abrimos o WhatsApp com a mensagem pronta. É só tocar em enviar.'
                  : hasWhatsapp
                    ? 'O botão abre o WhatsApp com a sua mensagem já escrita.'
                    : 'O botão abre o seu app de e-mail com a mensagem já escrita.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
