// Dados de contato e redes num só lugar. Campo vazio esconde o botão correspondente.
export const site = {
  name: 'Hallysson Correia',
  email: 'desenvolvimentohcweb@gmail.com',
  // Só dígitos, com DDI e DDD (ex.: 5547912345678). Vazio = botão do WhatsApp escondido.
  whatsapp: '',
  location: 'Blumenau, SC',
  social: {
    github: 'https://github.com/HallyCorreia',
    linkedin: 'https://www.linkedin.com/in/hallysson-correia-722965218',
    instagram: 'https://www.instagram.com/h_bcorreia/',
  },
};

export const whatsappUrl = (text?: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : '';

export const mailtoUrl = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${site.email}${query ? `?${query}` : ''}`;
};
