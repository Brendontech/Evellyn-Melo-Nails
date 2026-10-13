import { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeading from '../../components/ui/SectionHeading'
import { PROCEDIMENTOS } from '../../data/procedimentos'
import { temaDoMes } from '../../data/temas'
import { MESES_AGENDA } from '../../data/site'
import { exigeSinal, indiceDoMes } from '../../lib/agenda'
import { rolarPara } from '../../lib/scroll'
import { buscarOcupados, criarAgendamento } from '../../services/agendaService'
import Calendario from './Calendario'
import PassoConfirmado from './steps/PassoConfirmado'
import PassoDados from './steps/PassoDados'
import PassoHorario from './steps/PassoHorario'
import PassoInicio from './steps/PassoInicio'
import PassoPix from './steps/PassoPix'
import PassoProcedimento from './steps/PassoProcedimento'
import Progresso from './steps/Progresso'
import Resumo from './steps/Resumo'

const NOMES_PASSOS = ['Dia', 'Horário', 'Procedimento', 'Seus dados', 'Sinal PIX']
const VAZIO = { passo: 1, data: null, horario: null, procedimentoId: null, nome: '', telefone: '' }

/**
 * Passos: 1 dia → 2 horário → 3 procedimento → 4 dados → (5 PIX, só nos meses com sinal) → 6 confirmado
 */
export default function Agenda() {
  const [indiceMes, setIndiceMes] = useState(0)
  const [ocupados, setOcupados] = useState(() => new Set())
  const [estado, setEstado] = useState(VAZIO)
  const [enviando, setEnviando] = useState(false)
  const painel = useRef(null)

  useEffect(() => {
    buscarOcupados().then(setOcupados)
  }, [])

  // a cor sazonal do site acompanha o mês aberto no calendário
  useEffect(() => {
    document.documentElement.style.setProperty('--season', temaDoMes(MESES_AGENDA[indiceMes].mes).cor)
  }, [indiceMes])

  const atualizar = (parcial) => setEstado((s) => ({ ...s, ...parcial }))
  const rolarPainel = useCallback(() => {
    if (window.innerWidth < 1024) setTimeout(() => rolarPara(painel.current), 60)
  }, [])

  const comSinal = exigeSinal(estado.data)
  const totalPassos = comSinal ? 5 : 4
  const procedimento = PROCEDIMENTOS.find((p) => p.id === estado.procedimentoId)

  const finalizar = async (extra = {}) => {
    setEnviando(true)
    await criarAgendamento({ data: estado.data, horario: estado.horario, procedimentoId: estado.procedimentoId, nome: estado.nome, telefone: estado.telefone, ...extra })
    setEnviando(false)
    atualizar({ passo: 6 })
    rolarPainel()
  }

  const escolherDia = (data) => {
    setIndiceMes(indiceDoMes(data))
    setEstado((s) => ({ ...s, data, horario: null, passo: 2 }))
    rolarPainel()
  }

  let conteudo
  switch (estado.passo) {
    case 2:
      conteudo = <PassoHorario data={estado.data} ocupados={ocupados} onEscolher={(horario) => atualizar({ horario, passo: 3 })} onVoltar={() => atualizar({ passo: 1, data: null })} />
      break
    case 3:
      conteudo = <PassoProcedimento selecionado={estado.procedimentoId} onSelecionar={(procedimentoId) => atualizar({ procedimentoId })} onContinuar={() => atualizar({ passo: 4 })} onVoltar={() => atualizar({ passo: 2 })} />
      break
    case 4:
      conteudo = (
        <PassoDados
          nomeInicial={estado.nome}
          telefoneInicial={estado.telefone}
          comSinal={comSinal}
          enviando={enviando}
          onVoltar={() => atualizar({ passo: 3 })}
          onEnviar={async (dados) => {
            if (comSinal) {
              atualizar({ ...dados, passo: 5 })
              rolarPainel()
            } else {
              setEstado((s) => ({ ...s, ...dados }))
              setEnviando(true)
              await criarAgendamento({ data: estado.data, horario: estado.horario, procedimentoId: estado.procedimentoId, ...dados })
              setEnviando(false)
              setEstado((s) => ({ ...s, passo: 6 }))
              rolarPainel()
            }
          }}
        />
      )
      break
    case 5:
      conteudo = <PassoPix procedimento={procedimento} enviando={enviando} onPago={() => finalizar({ sinalPago: true })} onVoltar={() => atualizar({ passo: 4 })} />
      break
    case 6:
      conteudo = (
        <PassoConfirmado
          {...estado}
          procedimento={procedimento}
          comSinal={comSinal}
          onNovo={() => {
            setEstado(VAZIO)
            rolarPara('#calendario', { bloco: 'center' })
          }}
        />
      )
      break
    default:
      conteudo = <PassoInicio ocupados={ocupados} onEscolher={escolherDia} />
  }

  const mostraCabecalho = estado.passo >= 2 && estado.passo <= 5

  return (
    <section id="agenda" className="relative z-[2] pb-20 lg:pb-36">
      <div className="container-site">
        <SectionHeading rotulo="Agenda online" titulo="Reserve" destaque="seu momento" texto="Escolha o dia no calendário. Depois o horário, o procedimento e o seu WhatsApp." />

        <div className="grid items-start gap-5 lg:grid-cols-[1.05fr_.95fr] lg:gap-7">
          <div id="calendario" className="min-w-0">
            <Calendario
              indice={indiceMes}
              setIndice={setIndiceMes}
              ocupados={ocupados}
              selecionado={estado.data}
              onEscolher={escolherDia}
            />
          </div>

          <div ref={painel} aria-live="polite" className="min-w-0 scroll-mt-24 rounded-[18px] border border-hair bg-linear-to-b from-cream/[0.03] to-transparent px-4 py-6 sm:rounded-[22px] sm:px-7 sm:py-8">
            <div key={estado.passo} className="animate-deslizar">
              {mostraCabecalho && <Progresso atual={estado.passo} total={totalPassos} nomes={NOMES_PASSOS} />}
              {estado.passo >= 3 && estado.passo <= 5 && <Resumo data={estado.data} horario={estado.horario} procedimento={estado.passo > 3 ? procedimento : null} />}
              {conteudo}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
