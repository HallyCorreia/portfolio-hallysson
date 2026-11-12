import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Workflow, Bot, LayoutDashboard, Lightbulb, HelpCircle, Send, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { site, mailtoUrl, whatsappUrl } from '@/config/site';
import { serviceTypes, type ServiceTypeId } from '@/config/services';

const icons: Record<ServiceTypeId, typeof Workflow> = {
  automation: Workflow,
  agent: Bot,
  website: LayoutDashboard,
  consulting: Lightbulb,
  other: HelpCircle,
};

const deadlines = ['Urgente (até 2 semanas)', 'Este mês', 'Nos próximos 3 meses', 'Sem pressa'];
const budgets = ['Até R$ 1.000', 'R$ 1.000 a R$ 3.000', 'R$ 3.000 a R$ 10.000', 'Acima de R$ 10.000', 'Ainda não sei'];

const schema = z.object({
  service: z.enum(['automation', 'agent', 'website', 'consulting', 'other'], {
    message: 'Escolha o tipo de serviço',
  }),
  name: z.string().trim().min(2, 'Escreva seu nome'),
  email: z.string().trim().email('E-mail inválido'),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(100).optional(),
  description: z.string().trim().min(20, 'Conte um pouco mais (mínimo 20 caracteres)').max(3000),
  deadline: z.string().optional(),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function readQuery() {
  const q = new URLSearchParams(window.location.search);
  const tipo = q.get('tipo') as ServiceTypeId | null;
  return {
    service: serviceTypes.some((s) => s.id === tipo) ? tipo! : undefined,
    ref: q.get('ref') ?? '',
  };
}

export function RequestPage() {
  const [initial] = useState(readQuery);
  const [sent, setSent] = useState<'email' | 'whatsapp' | null>(null);
  const [copied, setCopied] = useState(false);
  const hasWhatsapp = Boolean(site.whatsapp);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: initial.service },
  });

  const service = watch('service');

  const buildBody = (d: FormData) => {
    const tipo = serviceTypes.find((s) => s.id === d.service)?.label ?? d.service;
    return [
      'Nova solicitação de serviço pelo portfólio',
      '',
      `Tipo: ${tipo}`,
      initial.ref ? `Referência: projeto ${initial.ref}` : '',
      `Nome: ${d.name}`,
      d.company ? `Empresa: ${d.company}` : '',
      `E-mail: ${d.email}`,
      d.phone ? `WhatsApp/telefone: ${d.phone}` : '',
      d.deadline ? `Prazo: ${d.deadline}` : '',
      d.budget ? `Investimento: ${d.budget}` : '',
      '',
      'Necessidade:',
      d.description,
    ]
      .filter((line, i, arr) => line !== '' || arr[i - 1] !== '')
      .join('\n');
  };

  const subjectFor = (d: FormData) => {
    const tipo = serviceTypes.find((s) => s.id === d.service)?.label ?? 'Serviço';
    return `Solicitação: ${tipo} · ${d.name}`;
  };

  const sendEmail = (d: FormData) => {
    window.location.assign(mailtoUrl(subjectFor(d), buildBody(d)));
    setSent('email');
  };

  const sendWhatsapp = (d: FormData) => {
    window.open(whatsappUrl(buildBody(d)), '_blank', 'noopener,noreferrer');
    setSent('whatsapp');
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

  const field = 'text-sm font-medium text-foreground';
  const chip = (active: boolean) =>
    `px-3 py-2 rounded-full border text-sm transition-colors ${
      active ? 'border-primary bg-primary/15 text-foreground' : 'border-border text-muted-foreground hover:border-primary/50'
    }`;

  return (
    <div className="min-h-screen text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> Voltar ao portfólio
        </a>

        <p className="font-pixel text-primary uppercase text-sm mb-3">// solicitar serviço</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Vamos tirar isso <span className="gradient-text">do papel</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
          Preencha em 2 minutos. Eu leio, entendo o contexto e respondo com o caminho que seguiria, o prazo e uma
          estimativa.
          {initial.ref && (
            <>
              {' '}
              Você veio pelo projeto <span className="text-foreground font-semibold">{initial.ref}</span>.
            </>
          )}
        </p>

        {sent ? (
          <div className="card-glow rounded-2xl border border-primary/40 bg-card/70 p-8 space-y-4" role="status">
            <div className="w-14 h-14 rounded-full bg-[#22e07a]/15 flex items-center justify-center">
              <Check className="w-7 h-7 text-[#22e07a]" />
            </div>
            <h2 className="text-2xl font-extrabold">
              {sent === 'email' ? 'Seu e-mail abriu com a solicitação pronta' : 'O WhatsApp abriu com a solicitação pronta'}
            </h2>
            <p className="text-muted-foreground">
              Agora é só tocar em <strong className="text-foreground">enviar</strong> no app. Se nada abriu, mande a
              mensagem para <span className="text-foreground font-semibold select-all">{site.email}</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="rounded-full" onClick={copyEmail}>
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'E-mail copiado' : 'Copiar e-mail'}
              </Button>
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setSent(null)}>
                Voltar ao formulário
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(hasWhatsapp ? sendWhatsapp : sendEmail)}
            className="space-y-8"
            noValidate
          >
            <fieldset className="space-y-3">
              <legend className={`${field} mb-3`}>1. O que você precisa?</legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {serviceTypes.map((s) => {
                  const Icon = icons[s.id];
                  const active = service === s.id;
                  return (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setValue('service', s.id, { shouldValidate: true })}
                      aria-pressed={active}
                      className={`card-glow text-left rounded-2xl border p-4 flex gap-3 items-start ${
                        active ? 'border-primary bg-primary/10' : 'border-border bg-card/60'
                      }`}
                    >
                      <span className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${active ? 'bg-primary text-primary-foreground' : 'bg-primary/15 text-primary'}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block font-bold text-foreground">{s.label}</span>
                        <span className="block text-sm text-muted-foreground">{s.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.service && <p className="text-destructive text-sm">{errors.service.message}</p>}
            </fieldset>

            <fieldset className="space-y-4">
              <legend className={`${field} mb-3`}>2. Seus dados</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="req-name" className={field}>Nome</label>
                  <Input id="req-name" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="req-company" className={field}>
                    Empresa <span className="text-muted-foreground font-normal">(opcional)</span>
                  </label>
                  <Input id="req-company" autoComplete="organization" {...register('company')} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="req-email" className={field}>E-mail</label>
                  <Input id="req-email" type="email" autoComplete="email" {...register('email')} aria-invalid={!!errors.email} />
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="req-phone" className={field}>
                    WhatsApp <span className="text-muted-foreground font-normal">(opcional)</span>
                  </label>
                  <Input id="req-phone" type="tel" autoComplete="tel" placeholder="(47) 9 0000-0000" {...register('phone')} />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className={`${field} mb-3`}>3. O projeto</legend>
              <div className="space-y-2">
                <label htmlFor="req-description" className={field}>Descreva a necessidade</label>
                <Textarea
                  id="req-description"
                  rows={6}
                  placeholder="O que acontece hoje, o que você gostaria que acontecesse e quais sistemas estão envolvidos (planilha, WhatsApp, ERP, site…)."
                  {...register('description')}
                  aria-invalid={!!errors.description}
                />
                {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <p className={field}>Prazo</p>
                <div className="flex flex-wrap gap-2">
                  {deadlines.map((d) => (
                    <button type="button" key={d} className={chip(watch('deadline') === d)} aria-pressed={watch('deadline') === d}
                      onClick={() => setValue('deadline', watch('deadline') === d ? undefined : d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className={field}>
                  Investimento previsto <span className="text-muted-foreground font-normal">(opcional)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button type="button" key={b} className={chip(watch('budget') === b)} aria-pressed={watch('budget') === b}
                      onClick={() => setValue('budget', watch('budget') === b ? undefined : b)}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </fieldset>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 glow">
                <Send className="w-4 h-4 mr-2" />
                {hasWhatsapp ? 'Enviar pelo WhatsApp' : 'Enviar solicitação por e-mail'}
              </Button>
              {hasWhatsapp && (
                <Button type="button" size="lg" variant="outline" className="rounded-full px-8" onClick={handleSubmit(sendEmail)}>
                  Prefiro e-mail
                </Button>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              O botão abre o seu {hasWhatsapp ? 'WhatsApp' : 'app de e-mail'} com tudo preenchido. Nada é salvo neste site.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
