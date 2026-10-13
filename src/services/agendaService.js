/**
 * Camada de dados da agenda.
 *
 * Hoje roda em MODO DEMONSTRAÇÃO: gera horários ocupados de forma fixa
 * e simula a criação do agendamento, para a cliente validar o fluxo.
 *
 * Para produção, troque o corpo das funções por chamadas ao backend:
 *  - buscarOcupados  → GET  /api/agenda/ocupados?inicio=&fim=   (lê a Google Agenda da Evellyn)
 *  - criarAgendamento → POST /api/agenda                         (cria o evento na Google Agenda,
 *                                                                 grava o telefone e agenda o
 *                                                                 lembrete de WhatsApp 1 dia antes)
 *  - gerarCobrancaPix → POST /api/pix                            (Mercado Pago / Efí: QR Code + webhook)
 */
import { HORARIOS, MESES_AGENDA } from '../data/site'
import { chaveData } from '../lib/agenda'

const espera = (ms) => new Promise((r) => setTimeout(r, ms))

// Gera ~25% dos horários como ocupados, sempre os mesmos para cada data.
function ocupadoDemo(data, i) {
  let h = (data.getMonth() * 31 + data.getDate()) * 13 + i * 7 + 11
  h = Math.imul(h ^ (h >>> 7), 2246822519)
  h ^= h >>> 13
  h = Math.imul(h, 3266489917)
  h ^= h >>> 16
  return (h >>> 0) % 100 < 26
}

/** @returns {Promise<Set<string>>} conjunto de "YYYY-MM-DD HH:MM" já ocupados */
export async function buscarOcupados() {
  const ocupados = new Set()
  for (const { ano, mes } of MESES_AGENDA) {
    const dias = new Date(ano, mes + 1, 0).getDate()
    for (let d = 1; d <= dias; d++) {
      const data = new Date(ano, mes, d)
      HORARIOS.forEach((h, i) => ocupadoDemo(data, i) && ocupados.add(`${chaveData(data)} ${h}`))
    }
  }
  return ocupados
}

/**
 * @param {{data: Date, horario: string, procedimentoId: string, nome: string, telefone: string, sinalPago?: boolean}} dados
 */
export async function criarAgendamento(dados) {
  await espera(700)
  return { id: `demo-${Date.now()}`, status: dados.sinalPago ? 'aguardando-confirmacao-pix' : 'confirmado', ...dados }
}
