import { TECNICAS } from '../data/procedimentos'

/** Faixa de técnicas passando em loop. */
export default function Marquee() {
  const lista = [...TECNICAS, ...TECNICAS]
  return (
    <div aria-hidden="true" className="relative z-[2] overflow-hidden border-y border-hair bg-linear-to-r from-ink via-ink-2 to-ink py-4 lg:py-6">
      <div className="flex w-max animate-marquee">
        {lista.map((t, i) => (
          <span key={i} className="flex items-center gap-14 whitespace-nowrap px-7 font-accent text-[clamp(1.6rem,4vw,2.6rem)] italic">
            <span className="foil">{t}</span>
            <span className="h-3 w-3 rotate-45" style={{ background: 'var(--foil)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
