import { ANTECEDENCIA_MINUTOS, DIAS_FECHADOS, HORARIOS, MESES_AGENDA, SINAL_PIX } from '../data/site'
import { temaDoMes } from '../data/temas'
import { pad } from './format'

export const hoje = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export const mesmoDia = (a, b) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export const diasAte = (destino, base = hoje()) => Math.round((destino - base) / 864e5)

export const chaveData = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const exigeSinal = (data) => !!data && SINAL_PIX.meses.includes(data.getMonth())

/** Monta a grade do mês: células nulas antes do dia 1 e depois os dias. */
export function gradeDoMes(ano, mes) {
  const primeiro = new Date(ano, mes, 1).getDay()
  const total = new Date(ano, mes + 1, 0).getDate()
  return [...Array(primeiro).fill(null), ...Array.from({ length: total }, (_, i) => new Date(ano, mes, i + 1))]
}

/** O horário já passou (ou está perto demais para marcar hoje)? */
export function horarioEncerrado(data, horario) {
  const [hh, mm] = horario.split(':').map(Number)
  const inicio = new Date(data.getFullYear(), data.getMonth(), data.getDate(), hh, mm)
  return inicio.getTime() < Date.now() + ANTECEDENCIA_MINUTOS * 60000
}

/** ocupados: Set de "YYYY-MM-DD HH:MM" vindo do serviço */
export const horarioOcupado = (data, horario, ocupados) => ocupados.has(`${chaveData(data)} ${horario}`)

export const horarioLivre = (data, horario, ocupados) => !horarioOcupado(data, horario, ocupados) && !horarioEncerrado(data, horario)

/** Dia aceita agendamento? Hoje entra se ainda tiver horário livre mais tarde. */
export function diaDisponivel(data, ocupados) {
  if (data < hoje()) return false
  if (DIAS_FECHADOS.includes(data.getDay())) return false
  if (temaDoMes(data.getMonth()).fechado.includes(data.getDate())) return false
  return HORARIOS.some((h) => horarioLivre(data, h, ocupados))
}

/** Primeiro dia com horário livre a partir de hoje, dentro dos meses liberados. */
export function proximoDiaLivre(ocupados) {
  const ultimo = MESES_AGENDA[MESES_AGENDA.length - 1]
  const fim = new Date(ultimo.ano, ultimo.mes + 1, 0)
  for (let d = hoje(); d <= fim; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
    if (diaDisponivel(d, ocupados)) return d
  }
  return null
}

/** Índice em MESES_AGENDA do mês de uma data (ou 0). */
export const indiceDoMes = (data) => Math.max(0, MESES_AGENDA.findIndex((m) => m.ano === data.getFullYear() && m.mes === data.getMonth()))

/** Link "Adicionar ao Google Agenda" para a cliente salvar o próprio horário. */
export function linkGoogleAgenda({ titulo, inicio, duracaoMin, local }) {
  const fim = new Date(inicio.getTime() + duracaoMin * 60000)
  const f = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: titulo,
    dates: `${f(inicio)}/${f(fim)}`,
    ctz: 'America/Sao_Paulo',
    location: local,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
