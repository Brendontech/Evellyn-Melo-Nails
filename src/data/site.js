// Dados gerais do negócio. Tudo que a cliente pode querer trocar fica aqui.
// ⚠ Valores marcados com [EXEMPLO] precisam ser confirmados com a Evellyn.

export const SITE = {
  nome: 'Evellyn Melo',
  marca: 'Univers Nails',
  titulo: 'Especialista em design de unhas',
  cidade: 'Presidente Olegário – MG',
  whatsapp: '(34) 9 0000-0000', // [EXEMPLO]
  instagram: '', // ex.: 'https://instagram.com/usuario'
  chavePix: 'pix@evellynmelo.com.br', // [EXEMPLO]
  anosProfissao: 5, // [EXEMPLO]
  totalTecnicas: 6,
  atendimento: 'Segunda a sábado, com hora marcada',
}

// Horários que a agenda oferece em cada dia útil. [EXEMPLO]
export const HORARIOS = ['08:00', '09:30', '11:00', '13:30', '15:00', '16:30', '18:00']

// Antecedência mínima para marcar no próprio dia (minutos). Ex.: às 14h50, com 60, o primeiro horário possível é depois das 15h50.
export const ANTECEDENCIA_MINUTOS = 60

// Dias da semana sem atendimento (0 = domingo).
export const DIAS_FECHADOS = [0]

// Meses liberados na agenda online (mês: 0 a 11).
export const MESES_AGENDA = [
  { ano: 2026, mes: 9 },
  { ano: 2026, mes: 10 },
  { ano: 2026, mes: 11 },
]

// Em quais meses o agendamento exige sinal via PIX, e qual a porcentagem.
export const SINAL_PIX = { meses: [11], porcentagem: 50 }
