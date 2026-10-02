// Utilitários de formatação de dados brasileiros (Moeda, CPF, Datas)

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
};

export const formatCPF = (value) => {
  const clean = (value || '').replace(/\D/g, '').slice(0, 11);
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
  if (clean.length <= 9) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
};

export const validateCPF = (cpf) => {
  const clean = (cpf || '').replace(/\D/g, '');
  return clean.length === 11;
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

export const getMinutesElapsed = (dateString) => {
  if (!dateString) return 0;
  const start = new Date(dateString).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - start) / 60000));
};
