import { DIAS_FECHADOS, HORARIOS, SINAL_PIX } from '../data/site'
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

/**
 * Dia aceita agendamento? Recebe os horários ocupados (vindos do serviço).
 * ocupados: Set de "YYYY-MM-DD HH:MM"
 */
export function diaDisponivel(data, ocupados) {
  if (data <= hoje()) return false
  if (DIAS_FECHADOS.includes(data.getDay())) return false
  if (temaDoMes(data.getMonth()).fechado.includes(data.getDate())) return false
  return HORARIOS.some((h) => !ocupados.has(`${chaveData(data)} ${h}`))
}

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
