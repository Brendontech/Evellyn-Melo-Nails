import { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import { PORTFOLIO } from '../data/portfolio'
import { useMediaQuery } from '../hooks/useMediaQuery'

function Card({ item, onAbrir, inclinar }) {
  const ref = useRef(null)
  const mover = (e) => {
    if (!inclinar) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.transform = `rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 10}deg)`
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }
  return (
    <article
      ref={ref}
      onMouseMove={mover}
      onMouseLeave={() => ref.current && (ref.current.style.transform = '')}
      className="group relative w-[76vw] max-w-[340px] shrink-0 snap-center transition-transform duration-500 [transform-style:preserve-3d] md:w-[clamp(250px,30vw,360px)] md:max-w-none"
    >
      <button type="button" onClick={() => onAbrir(item)} aria-label={`Ampliar: ${item.titulo}`} className="block w-full cursor-zoom-in text-left">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-[220px] rounded-b-[10px] border border-hair bg-ink-3">
          <img src={item.foto} alt={item.titulo} loading="lazy" draggable="false" className="pointer-events-none block h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.07]" />
          <span
            className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(circle at var(--mx,50%) var(--my,30%), rgba(255,240,212,.3), transparent 45%)' }}
          />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-full border border-hair bg-ink/60 px-3 py-1.5 font-caps text-[0.84rem] uppercase tracking-label backdrop-blur">
            {item.tag}
          </span>
        </div>
        <h3 className="mb-0.5 mt-4 font-serif text-[1.3rem] font-normal leading-tight md:text-[1.45rem]">{item.titulo}</h3>
        <p className="m-0 text-[0.95rem] text-mute">{item.descricao}</p>
      </button>
    </article>
  )
}

export default function Portfolio() {
  const trilho = useRef(null)
  const arrasto = useRef({ ativo: false, movido: false, x: 0, scroll: 0 })
  const [progresso, setProgresso] = useState(0)
  const [aberto, setAberto] = useState(null)
  const dialogo = useRef(null)
  const mouseFino = useMediaQuery('(pointer: fine)')

  const atualizar = useCallback(() => {
    const el = trilho.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgresso(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    atualizar()
    window.addEventListener('resize', atualizar)
    const mover = (e) => {
      const a = arrasto.current
      if (!a.ativo) return
      const dx = e.clientX - a.x
      if (Math.abs(dx) > 5) a.movido = true
      trilho.current.scrollLeft = a.scroll - dx
    }
    const soltar = () => {
      arrasto.current.ativo = false
      trilho.current?.classList.remove('snap-none', 'cursor-grabbing')
      setTimeout(() => (arrasto.current.movido = false), 50)
    }
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', soltar)
    return () => {
      window.removeEventListener('resize', atualizar)
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', soltar)
    }
  }, [atualizar])

  useEffect(() => {
    const d = dialogo.current
    if (!d) return
    if (aberto && !d.open) d.showModal?.()
    if (!aberto && d.open) d.close()
  }, [aberto])

  const passo = () => (trilho.current?.querySelector('article')?.offsetWidth ?? 300) + 24

  return (
    <section id="trabalhos" className="relative z-[2] py-20 lg:py-36">
      <div className="container-site">
        <SectionHeading rotulo="Portfólio" titulo="A arte" destaque="nas mãos" texto="Toque em uma foto para ver de perto. Arraste para o lado para ver mais." />

        <div
          ref={trilho}
          onScroll={atualizar}
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse') return
            arrasto.current = { ativo: true, movido: false, x: e.clientX, scroll: trilho.current.scrollLeft }
            trilho.current.classList.add('snap-none', 'cursor-grabbing')
          }}
          className="sem-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-10 pt-2 [perspective:1200px] sm:-mx-5 sm:px-5 md:cursor-grab md:gap-6"
        >
          {PORTFOLIO.map((item) => (
            <Card key={item.id} item={item} inclinar={mouseFino} onAbrir={(i) => !arrasto.current.movido && setAberto(i)} />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="btn-circulo" aria-label="Foto anterior" disabled={progresso < 0.02} onClick={() => trilho.current.scrollBy({ left: -passo(), behavior: 'smooth' })}>←</button>
          <div className="relative h-px flex-1 bg-hair">
            <i className="absolute -top-px h-[3px] w-1/4 rounded" style={{ left: `${progresso * 75}%`, background: 'var(--foil)' }} />
          </div>
          <button className="btn-circulo" aria-label="Próxima foto" disabled={progresso > 0.98} onClick={() => trilho.current.scrollBy({ left: passo(), behavior: 'smooth' })}>→</button>
        </div>
      </div>

      <dialog
        ref={dialogo}
        onClose={() => setAberto(null)}
        onClick={(e) => e.target === dialogo.current && setAberto(null)}
        className="fixed inset-0 m-auto h-fit max-h-[94svh] w-[min(92vw,520px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-ink/90 backdrop:backdrop-blur"
      >
        {aberto && (
          <div className="text-center">
            <img src={aberto.foto} alt={aberto.titulo} className="mx-auto block max-h-[72svh] w-auto max-w-full rounded-t-[180px] rounded-b-[10px] border border-gold object-contain" />
            <p className="my-3 font-serif text-[1.4rem] text-cream">{aberto.titulo}</p>
            <button type="button" onClick={() => setAberto(null)} className="btn-secundario min-h-[48px]">Fechar</button>
          </div>
        )}
      </dialog>
    </section>
  )
}
