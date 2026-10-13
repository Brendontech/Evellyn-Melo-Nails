import Button from '../../../components/ui/Button'
import { diaDisponivel, hoje, mesmoDia, proximoDiaLivre } from '../../../lib/agenda'
import { DIAS_SEMANA, MESES, pad } from '../../../lib/format'

/**
 * Estado inicial do painel: já mostra o dia de hoje e leva direto aos horários
 * (de hoje, se ainda houver vaga, ou do próximo dia livre).
 */
export default function PassoInicio({ ocupados, onEscolher }) {
  const h = hoje()
  const hojeLivre = diaDisponivel(h, ocupados)
  const proximo = hojeLivre ? h : proximoDiaLivre(ocupados)
  const amanha = proximo && !hojeLivre && mesmoDia(proximo, new Date(h.getFullYear(), h.getMonth(), h.getDate() + 1))

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center lg:min-h-[400px]">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full animate-girar" aria-hidden="true">
          <defs>
            <path id="circulo-inicio" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
          </defs>
          <text className="fill-gold-light font-caps" style={{ fontSize: 9.6, letterSpacing: 3 }}>
            <textPath href="#circulo-inicio">HOJE · {DIAS_SEMANA[h.getDay()].toUpperCase()} · HOJE · {DIAS_SEMANA[h.getDay()].toUpperCase()} · </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <b className="font-serif text-[2.6rem] font-normal text-gold-pale">{h.getDate()}</b>
          <span className="mt-1 font-caps text-[0.78rem] uppercase tracking-[0.12em] text-gold">{MESES[h.getMonth()].slice(0, 3)}</span>
        </div>
      </div>

      <h3 className="m-0 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal">
        Comece pelo <i className="text-nude">dia</i>
      </h3>

      {proximo ? (
        <>
          <p className="m-0 max-w-[32ch] text-mute">
            {hojeLivre
              ? 'Ainda tem horário livre hoje. Toque abaixo para ver, ou escolha outro dia no calendário.'
              : 'Hoje não tem mais horário livre. Veja o próximo dia disponível ou escolha outro no calendário.'}
          </p>
          <Button className="mt-2 w-full max-w-[360px]" onClick={() => onEscolher(proximo)}>
            {hojeLivre ? 'Ver horários de hoje' : amanha ? 'Ver horários de amanhã' : `Ver ${DIAS_SEMANA[proximo.getDay()]}, ${pad(proximo.getDate())}/${pad(proximo.getMonth() + 1)}`}
          </Button>
        </>
      ) : (
        <p className="m-0 max-w-[32ch] text-mute">Toque em um dia claro no calendário. Os dias apagados já estão sem horário.</p>
      )}
    </div>
  )
}
