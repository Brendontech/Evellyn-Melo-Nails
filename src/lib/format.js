export const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
export const DIAS_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
export const DIAS_CURTOS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

export const pad = (n) => String(n).padStart(2, '0')

export const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const duracaoTexto = (min) =>
  min >= 60 ? `${Math.floor(min / 60)}h${min % 60 ? pad(min % 60) : ''}` : `${min}min`

export const dataLonga = (d) => `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`

export const dataCurta = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`

export const primeiroNome = (nome) => nome.trim().split(/\s+/)[0] ?? ''

// Máscara (34) 9 0000-0000
export const mascaraTelefone = (valor) => {
  const v = valor.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 2) return v
  if (v.length <= 3) return `(${v.slice(0, 2)}) ${v.slice(2)}`
  if (v.length <= 7) return `(${v.slice(0, 2)}) ${v[2]} ${v.slice(3)}`
  return `(${v.slice(0, 2)}) ${v[2]} ${v.slice(3, 7)}-${v.slice(7)}`
}
