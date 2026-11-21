import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Workflow, Bot, LayoutDashboard, Lightbulb, HelpCircle, Send, Check, Copy, Ticket } from 'lucide-react';
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


type Props = {
  /** Tipo de serviço já escolhido (ex.: vindo de ?tipo= na URL). */
  initial?: { service?: ServiceTypeId; ref: string; cupom?: string };
  /** Prefixo dos ids dos campos, para não repetir id quando há dois formulários na página. */
  idPrefix?: string;
  /**
   * Conteúdo da coluna da esquerda (seção Contato). Quando presente, o formulário vira duas colunas:
   * esquerda = conteúdo + escolha do serviço; direita = dados e projeto.
   */
  aside?: ReactNode;
};

// Formulário único de solicitação: usado na página /solicitar e na seção Contato.
export function RequestForm({ initial = { ref: '' }, idPrefix = 'req', aside }: Props) {
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
      initial.cupom ? `Cupom: ${initial.cupom} (até 10% de desconto, achado no terminal do site)` : '',
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
  // Título de cada etapa: maior, em negrito, com a barrinha roxa da identidade.
  const titulo =
    "mb-4 flex items-center gap-3 text-lg md:text-xl font-extrabold text-foreground before:content-[''] before:w-1.5 before:h-6 before:rounded-full before:bg-gradient-to-b before:from-primary before:to-accent before:shadow-[0_0_10px_hsl(var(--primary)/0.6)]";
  const chip = (active: boolean) =>
    `px-3 py-2 rounded-full border text-sm transition-colors ${
      active ? 'border-primary bg-primary/15 text-foreground' : 'border-border text-muted-foreground hover:border-primary/50'
    }`;

  const enviado = (
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
  );

  const servicos = (
        <fieldset className="space-y-3">
          <legend className={titulo}>O que você precisa?</legend>
          <div className={`grid sm:grid-cols-2 gap-3 ${aside ? 'lg:grid-cols-1' : ''}`}>
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
  );

  const resto = (
    <>
        <fieldset className="space-y-4">
          <legend className={titulo}>Seus dados</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor={`${idPrefix}-name`} className={field}>Nome</label>
              <Input id={`${idPrefix}-name`} autoComplete="name" {...register('name')} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor={`${idPrefix}-company`} className={field}>
                Empresa <span className="text-muted-foreground font-normal">(opcional)</span>
              </label>
              <Input id={`${idPrefix}-company`} autoComplete="organization" {...register('company')} />
            </div>
            <div className="space-y-2">
              <label htmlFor={`${idPrefix}-email`} className={field}>E-mail</label>
              <Input id={`${idPrefix}-email`} type="email" autoComplete="email" {...register('email')} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor={`${idPrefix}-phone`} className={field}>
                WhatsApp <span className="text-muted-foreground font-normal">(opcional)</span>
              </label>
              <Input id={`${idPrefix}-phone`} type="tel" autoComplete="tel" placeholder="(47) 9 0000-0000" {...register('phone')} />
            </div>
          </div>
        </fieldset>
  
        <fieldset className="space-y-4">
          <legend className={titulo}>O projeto</legend>
          <div className="space-y-2">
            <label htmlFor={`${idPrefix}-description`} className={field}>Descreva a necessidade</label>
            <Textarea
              id={`${idPrefix}-description`}
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
  
        {initial.cupom && (
          <div className="flex items-start gap-3 rounded-xl border border-primary/50 bg-primary/10 px-4 py-3" role="note">
            <Ticket className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              <span className="font-pixel text-foreground">{initial.cupom}</span> aplicado: até{' '}
              <strong className="text-foreground">10% de desconto</strong> no seu projeto. O cupom já vai junto na
              mensagem.
            </p>
          </div>
        )}

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
    </>
  );

  const enviar = handleSubmit(hasWhatsapp ? sendWhatsapp : sendEmail);

  if (!aside) {
    return sent ? (
      enviado
    ) : (
      <form onSubmit={enviar} className="space-y-8" noValidate>
        {servicos}
        {resto}
      </form>
    );
  }

  const colunas = 'grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10';
  const cartao = 'rounded-2xl border border-border bg-card/50 p-6 md:p-8 min-w-0';

  return sent ? (
    <div className={colunas}>
      <div className="space-y-6 min-w-0">{aside}</div>
      {enviado}
    </div>
  ) : (
    <form onSubmit={enviar} className={colunas} noValidate>
      <div className="space-y-6 min-w-0">
        {aside}
        <div className={cartao}>{servicos}</div>
      </div>
      <div className={`${cartao} space-y-8`}>{resto}</div>
    </form>
  );
}
