import { HORARIOS } from '../../../data/site'
import { chaveData } from '../../../lib/agenda'
import { MESES } from '../../../lib/format'

export default function PassoHorario({ data, ocupados, onEscolher, onVoltar }) {
  return (
    <>
      <h3 className="mb-5 mt-1 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal leading-tight">
        Que horas, <i className="text-nude">{data.getDate()} de {MESES[data.getMonth()]}</i>?
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {HORARIOS.map((h) => {
          const ocupado = ocupados.has(`${chaveData(data)} ${h}`)
          return (
            <button
              key={h}
              type="button"
              disabled={ocupado}
              onClick={() => onEscolher(h)}
              aria-label={`${h}${ocupado ? ', ocupado' : ''}`}
              className="min-h-[60px] rounded-2xl border border-hair bg-cream/[0.03] text-[1.15rem] font-medium tabular-nums text-cream transition-all hover:border-gold-light hover:bg-gold-light/10 disabled:cursor-not-allowed disabled:line-through disabled:opacity-30 disabled:hover:border-hair disabled:hover:bg-transparent"
            >
              {h}
              <small className="block text-[0.7rem] tracking-wide text-mute">{ocupado ? 'ocupado' : 'livre'}</small>
            </button>
          )
        })}
      </div>
      <button type="button" className="link-voltar" onClick={onVoltar}>← Trocar o dia</button>
    </>
  )
}
