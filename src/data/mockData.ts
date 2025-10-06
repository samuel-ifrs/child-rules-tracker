import { Rule, Parent } from '../types';

export const defaultRules: Rule[] = [
  {
    id: '1',
    name: 'RECLAMAR PARA IR A AULA, TOMAR BANHO OU PARA FAZER O QUE FOI MANDADO',
    description: 'Reclamar quando mandada fazer atividades básicas',
    weight: 4,
    imageUrl: 'https://images.unsplash.com/photo-1648572182183-17dc80760033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGNvbXBsYWluaW5nJTIwY3J5aW5nfGVufDF8fHx8MTc1OTcxNzMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'comportamento'
  },
  {
    id: '2',
    name: 'NÃO CUMPRIR AS REGRAS',
    description: 'Lavar o rosto, escovar os dentes e o cabelo',
    weight: 5,
    imageUrl: 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzaGluZyUyMHRlZXRoJTIwaHlnaWVuZXxlbnwxfHx8fDE3NTk3MTczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'higiene'
  },
  {
    id: '3',
    name: 'DEMORAR NO BANHO SEM PRECISAR',
    description: 'Gastar tempo desnecessário no banho',
    weight: 3,
    imageUrl: 'https://images.unsplash.com/photo-1609220361664-a5cd02bc7345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHRha2luZyUyMGJhdGglMjBzaG93ZXJ8ZW58MXx8fHwxNzU5NzE3MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'higiene'
  },
  {
    id: '4',
    name: 'NÃO SE LAVAR DIREITO NO BANHO',
    description: 'Não fazer a higiene adequada durante o banho',
    weight: 5,
    imageUrl: 'https://images.unsplash.com/photo-1609220361664-a5cd02bc7345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHRha2luZyUyMGJhdGglMjBzaG93ZXJ8ZW58MXx8fHwxNzU5NzE3MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'higiene'
  },
  {
    id: '5',
    name: 'NÃO SE LIMPAR DIREITO APÓS IR AO BANHEIRO',
    description: 'Não fazer a higiene adequada após usar o banheiro',
    weight: 6,
    imageUrl: 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzaGluZyUyMHRlZXRoJTIwaHlnaWVuZXxlbnwxfHx8fDE3NTk3MTczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'higiene'
  },
  {
    id: '6',
    name: 'DESOBEDECER OS PAIS, AVÓS, TIOS OU PROFESSORES',
    description: 'Não obedecer às pessoas responsáveis',
    weight: 10,
    imageUrl: 'https://images.unsplash.com/photo-1576224078074-dd322ca23884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNvYmVkaWVudCUyMGNoaWxkJTIwcGFyZW50fGVufDF8fHx8MTc1OTcxNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'comportamento'
  },
  {
    id: '7',
    name: 'MENTIR',
    description: 'Não falar a verdade',
    weight: 10,
    imageUrl: 'https://images.unsplash.com/photo-1648197753080-474bed0bf289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxseWluZyUyMGNoaWxkJTIwcGlua3klMjBwcm9taXNlfGVufDF8fHx8MTc1OTcxNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'comportamento'
  },
  {
    id: '8',
    name: 'NÃO FAZER ATIVIDADES DADAS EM CASA OU PELA ESCOLA',
    description: 'Não completar tarefas escolares ou domésticas',
    weight: 7,
    imageUrl: 'https://images.unsplash.com/photo-1720465593272-4ec303433cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21ld29yayUyMHNjaG9vbCUyMGJvb2tzfGVufDF8fHx8MTc1OTcxNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '9',
    name: 'ESTRAGAR OU PERDER OS MATERIAIS',
    description: 'Danificar ou perder materiais escolares ou pessoais',
    weight: 6,
    imageUrl: 'https://images.unsplash.com/photo-1720465593272-4ec303433cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21ld29yayUyMHNjaG9vbCUyMGJvb2tzfGVufDF8fHx8MTc1OTcxNzMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '10',
    name: 'DEIXAR ROUPA OU CALÇADO FORA DO LUGAR',
    description: 'Não organizar roupas e sapatos no lugar correto',
    weight: 2,
    imageUrl: 'https://images.unsplash.com/photo-1598838909554-7ed3ccba096d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMHJvb20lMjB0b3lzJTIwc2NhdHRlcmVkfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '11',
    name: 'NÃO COMER',
    description: 'Recusar-se a comer as refeições',
    weight: 5,
    imageUrl: 'https://images.unsplash.com/photo-1627747776910-6d7e50f57c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGVhdGluZyUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'alimentacao'
  },
  {
    id: '12',
    name: 'DEIXAR BRINQUEDOS OU TECIDOS FORA DO LUGAR',
    description: 'Não organizar brinquedos e tecidos após usar',
    weight: 2,
    imageUrl: 'https://images.unsplash.com/photo-1598838909554-7ed3ccba096d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMHJvb20lMjB0b3lzJTIwc2NhdHRlcmVkfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '13',
    name: 'DEIXAR O PORTA ESCOVA/PASTA DESTAMPADO',
    description: 'Não tampar os produtos de higiene após usar',
    weight: 1,
    imageUrl: 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzaGluZyUyMHRlZXRoJTIwaHlnaWVuZXxlbnwxfHx8fDE3NTk3MTczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'higiene'
  },
  {
    id: '14',
    name: 'NÃO ALIMENTAR O COSMO',
    description: 'Esquecer de dar comida ao pet',
    weight: 4,
    imageUrl: 'https://images.unsplash.com/photo-1719463814216-9216db4b98c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBkb2clMjBmZWVkaW5nfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '15',
    name: 'NÃO LIMPAR AS MERDAS DO COSMO',
    description: 'Não limpar os dejetos do pet',
    weight: 5,
    imageUrl: 'https://images.unsplash.com/photo-1719463814216-9216db4b98c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBkb2clMjBmZWVkaW5nfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '16',
    name: 'SER MALVADA COM O COSMO',
    description: 'Maltratar ou ser agressiva com o pet',
    weight: 8,
    imageUrl: 'https://images.unsplash.com/photo-1719463814216-9216db4b98c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBkb2clMjBmZWVkaW5nfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'comportamento'
  },
  {
    id: '17',
    name: 'MEXER NO CELULAR/TABLET/COMPUTADOR SEM PERMISSÃO',
    description: 'Usar dispositivos eletrônicos sem autorização',
    weight: 6,
    imageUrl: 'https://images.unsplash.com/photo-1713942590404-d6981e63fb56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBzbWFydHBob25lJTIwY2hpbGR8ZW58MXx8fHwxNzU5NzE3MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'comportamento'
  },
  {
    id: '18',
    name: 'RECLAMAR PARA IR DORMIR NO QUARTO',
    description: 'Reclamar na hora de dormir',
    weight: 3,
    imageUrl: 'https://images.unsplash.com/photo-1644691211587-a0107492ad0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMGJlZHJvb20lMjBzbGVlcGluZ3xlbnwxfHx8fDE3NTk3MTczNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'comportamento'
  },
  {
    id: '19',
    name: 'DEIXAR QUARTO BAGUNÇADO OU SUJO',
    description: 'Não manter o quarto organizado e limpo',
    weight: 4,
    imageUrl: 'https://images.unsplash.com/photo-1598838909554-7ed3ccba096d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNzeSUyMHJvb20lMjB0b3lzJTIwc2NhdHRlcmVkfGVufDF8fHx8MTc1OTcxNzMzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'responsabilidade'
  },
  {
    id: '20',
    name: 'NÃO DAR DESCARGA AO SAIR DO BANHEIRO',
    description: 'Esquecer de dar descarga',
    weight: 3,
    imageUrl: 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzaGluZyUyMHRlZXRoJTIwaHlnaWVuZXxlbnwxfHx8fDE3NTk3MTczMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'higiene'
  },
  {
    id: '21',
    name: 'NÃO COLOCAR O CINTO AO ENTRAR NO CARRO',
    description: 'Não usar o cinto de segurança',
    weight: 8,
    imageUrl: 'https://images.unsplash.com/photo-1630245504731-db44b722fd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzZWF0YmVsdCUyMHNhZmV0eXxlbnwxfHx8fDE3NTk3MTczNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'seguranca'
  },
  {
    id: '22',
    name: 'ABRIR A PORTA DO CARRO SEM PERMISSÃO',
    description: 'Abrir a porta do carro sem autorização',
    weight: 10,
    imageUrl: 'https://images.unsplash.com/photo-1630245504731-db44b722fd7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzZWF0YmVsdCUyMHNhZmV0eXxlbnwxfHx8fDE3NTk3MTczNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'seguranca'
  }
];

export const defaultParents: Parent[] = [
  { id: '1', name: 'Papai', role: 'pai' },
  { id: '2', name: 'Mamãe', role: 'mae' },
  { id: '3', name: 'Vovó', role: 'avó' },
  { id: '4', name: 'Vovô', role: 'avo' }
];

export const WEEKLY_ALLOWANCE_BASE = 100; // R$ 100 por semana