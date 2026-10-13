/** Bolinhas numeradas ligadas por linha, mostrando em que passo a cliente está. */
export default function Progresso({ atual, total, nomes }) {
  return (
    <div className="mb-6">
      <div className="mb-5 flex items-center" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1
          const feito = n < atual
          const ativo = n === atual
          return (
            <div key={n} className={`flex items-center ${n > 1 ? 'flex-1' : ''}`}>
              {n > 1 && (
                <span className="relative h-px flex-1 bg-hair">
                  <i className="absolute inset-0 origin-left bg-gold-light transition-transform duration-500" style={{ transform: `scaleX(${n <= atual ? 1 : 0})` }} />
                </span>
              )}
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border font-caps text-[0.8rem] transition-all duration-500 sm:h-9 sm:w-9 ${
                  feito ? 'border-gold-light bg-gold-light text-ink' : ativo ? 'border-gold-light text-gold-pale' : 'border-hair text-mute'
                }`}
              >
                {feito ? '✓' : n}
              </span>
            </div>
          )
        })}
      </div>
      <span className="font-caps text-[0.72rem] uppercase tracking-[0.22em] text-gold">
        Passo {atual} de {total} · {nomes[atual - 1]}
      </span>
    </div>
  )
}
