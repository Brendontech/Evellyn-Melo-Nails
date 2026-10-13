import { MESES } from '../../../lib/format'

/** Pílulas com o que a cliente já escolheu. */
export default function Resumo({ data, horario, procedimento }) {
  const itens = [
    data && ['Dia', `${data.getDate()} de ${MESES[data.getMonth()]}`],
    horario && ['às', horario],
    procedimento && ['', procedimento.nome],
  ].filter(Boolean)
  if (!itens.length) return null
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {itens.map(([rot, val]) => (
        <span key={val} className="rounded-full border border-hair bg-cream/5 px-3.5 py-1.5 text-[0.9rem]">
          {rot && <span className="text-mute">{rot} </span>}
          <b className="font-medium text-gold-pale">{val}</b>
        </span>
      ))}
    </div>
  )
}
