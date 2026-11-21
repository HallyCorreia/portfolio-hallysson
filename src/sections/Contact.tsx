import { useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Instagram, MessageCircle, Copy, Check } from 'lucide-react';
import { RequestForm } from '@/components/RequestForm';
import { site, whatsappUrl } from '@/config/site';
import { TikTokIcon } from '@/components/TikTokIcon';
import { cupomSalvo } from '@/lib/requestQuery';

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: site.social.linkedin },
  { icon: Instagram, label: 'Instagram', href: site.social.instagram },
  { icon: TikTokIcon, label: 'TikTok', href: site.social.tiktok },
  { icon: Github, label: 'GitHub', href: site.social.github },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  // Se a pessoa achou o cupom do terminal nesta aba, ele segue junto no formulário daqui.
  const [initial] = useState(() => ({ ref: '', cupom: cupomSalvo() }));
  const hasWhatsapp = Boolean(site.whatsapp);

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
            Me conta o que hoje é feito na mão. Escolha o tipo de serviço, descreva a necessidade e eu respondo com o
            caminho que seguiria, o prazo e uma estimativa.
          </p>
        </div>

        <RequestForm
          idPrefix="contato"
          initial={initial}
          aside={
            <>
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
            </>
          }
        />
      </div>
    </section>
  );
}
