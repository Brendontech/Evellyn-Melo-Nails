import { useRef } from 'react'
import SeasonScene from '../../components/effects/SeasonScene'
import { MESES_AGENDA, SINAL_PIX } from '../../data/site'
import { temaDoMes } from '../../data/temas'
import { chaveData, diaDisponivel, diasAte, gradeDoMes, hoje, mesmoDia } from '../../lib/agenda'
import { DIAS_CURTOS, MESES, pad } from '../../lib/format'

function Mes({ ano, mes, ocupados, selecionado, onEscolher }) {
  const tema = temaDoMes(mes)
  const h = hoje()
  return (
    <div className="w-full shrink-0">
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {DIAS_CURTOS.map((d) => (
          <div key={d} className="pb-1.5 text-center font-caps text-[0.58rem] tracking-[0.06em] text-mute sm:text-[0.66rem] sm:tracking-[0.14em]">{d}</div>
        ))}
        {gradeDoMes(ano, mes).map((data, i) => {
          if (!data) return <span key={`v${i}`} aria-hidden="true" />
          const livre = diaDisponivel(data, ocupados)
          const comemorativa = tema.datas[data.getDate()]
          const sel = mesmoDia(data, selecionado)
          const ehHoje = mesmoDia(data, h)
          return (
            <button
              key={chaveData(data)}
              type="button"
              disabled={!livre}
              onClick={() => onEscolher(data)}
              title={comemorativa}
              aria-pressed={sel}
              aria-label={`${data.getDate()} de ${MESES[mes]}${comemorativa ? `, ${comemorativa}` : ''}${livre ? '' : ', indisponível'}`}
              className={[
                'relative aspect-square rounded-full border text-[1rem] font-medium tabular-nums transition-all duration-300 sm:text-[1.1rem]',
                sel
                  ? 'border-transparent bg-gold-btn font-semibold text-ink'
                  : livre
                    ? 'border-gold-light/20 bg-cream/[0.045] text-cream hover:scale-[1.08] hover:border-gold-light hover:shadow-[0_0_22px_-6px_#e3b57c]'
                    : 'cursor-not-allowed border-transparent text-mute/30',
                ehHoje && !sel ? '!text-gold-light' : '',
              ].join(' ')}
            >
              {data.getDate()}
              {comemorativa && (
                <span className="absolute right-[10%] top-[6%] h-1.5 w-1.5 rounded-full sm:h-[7px] sm:w-[7px]" style={{ background: tema.cor, boxShadow: `0 0 8px ${tema.cor}` }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Calendario({ indice, setIndice, ocupados, selecionado, onEscolher }) {
  const toque = useRef(null)
  const atual = MESES_AGENDA[indice]
  const tema = temaDoMes(atual.mes)
  const ir = (i) => setIndice(Math.max(0, Math.min(MESES_AGENDA.length - 1, i)))
  const faltam = tema.destaque ? diasAte(new Date(atual.ano, atual.mes, tema.destaque.dia)) : null

  return (
    <div className="relative min-w-0 overflow-hidden rounded-[18px] border border-hair bg-gradient-to-b from-ink-3 to-ink-2 shadow-[0_40px_80px_-40px_#000] sm:rounded-[22px]">
      {/* Cena do mês */}
      <div className="relative h-[170px] overflow-hidden transition-[background] duration-1000 sm:h-[220px]" style={{ background: tema.ceu }}>
        <SeasonScene key={tema.cena} cena={tema.cena} />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-b from-transparent to-black/70 p-4 sm:px-6 sm:py-5">
          <h3 className="m-0 font-serif text-[clamp(2.3rem,6vw,3.4rem)] font-normal capitalize italic leading-[0.9]">{MESES[atual.mes]}</h3>
          {tema.destaque && (
            <div className="text-right text-[0.82rem] leading-snug sm:text-[0.92rem]">
              <b className="block font-caps text-[0.66rem] font-semibold tracking-[0.18em] sm:text-[0.72rem]" style={{ color: tema.cor }}>
                {tema.destaque.nome} · {pad(tema.destaque.dia)}/{pad(atual.mes + 1)}
              </b>
              <strong className="font-serif text-[1.25rem] font-normal sm:text-[1.6rem]">
                {faltam > 0 ? `faltam ${faltam} dias` : faltam === 0 ? 'é hoje' : 'já passou'}
              </strong>
              {SINAL_PIX.meses.includes(atual.mes) && <span className="block text-mute">Sinal de {SINAL_PIX.porcentagem}% via PIX</span>}
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        {/* Navegação de meses */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <button className="btn-circulo" aria-label="Mês anterior" disabled={indice === 0} onClick={() => ir(indice - 1)}>←</button>
          <div className="flex gap-1.5 sm:gap-2">
            {MESES_AGENDA.map((m, i) => (
              <button
                key={`${m.ano}-${m.mes}`}
                type="button"
                onClick={() => ir(i)}
                className={`rounded-full border px-2.5 py-2 font-caps text-[0.68rem] tracking-[0.12em] transition-all duration-300 sm:px-3.5 sm:tracking-[0.2em] ${
                  i === indice ? 'border-gold-btn bg-gold-btn text-ink' : 'border-hair text-mute hover:text-cream'
                }`}
              >
                {MESES[m.mes].slice(0, 3).toUpperCase()}
              </button>
            ))}
          </div>
          <button className="btn-circulo" aria-label="Próximo mês" disabled={indice === MESES_AGENDA.length - 1} onClick={() => ir(indice + 1)}>→</button>
        </div>

        {/* Meses lado a lado, troca por swipe */}
        <div
          className="overflow-hidden [touch-action:pan-y]"
          onTouchStart={(e) => (toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!toque.current) return
            const dx = e.changedTouches[0].clientX - toque.current.x
            const dy = e.changedTouches[0].clientY - toque.current.y
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) ir(indice + (dx < 0 ? 1 : -1))
            toque.current = null
          }}
        >
          <div className="flex transition-transform duration-700 [transition-timing-function:cubic-bezier(.7,0,.2,1)]" style={{ transform: `translateX(-${indice * 100}%)` }}>
            {MESES_AGENDA.map((m) => (
              <Mes key={`${m.ano}-${m.mes}`} {...m} ocupados={ocupados} selecionado={selecionado} onEscolher={onEscolher} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.84rem] text-mute">
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full border border-gold-light/30 bg-cream/10" />Dia livre</span>
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-gold-btn" />Seu dia</span>
          <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{ background: tema.cor }} />Data comemorativa</span>
        </div>
        <p className="mb-0 mt-3 flex items-center justify-center gap-3 text-[0.84rem] text-mute">
          Arraste para ver o próximo mês
          <span className="relative inline-block h-px w-6 animate-dica bg-gold-light after:absolute after:-right-px after:-top-[3px] after:border-[3.5px] after:border-transparent after:border-l-gold-light after:content-['']" />
        </p>
      </div>
    </div>
  )
}
