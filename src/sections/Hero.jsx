import { useEffect, useRef } from 'react'
import foto from '../assets/images/evellyn.jpg'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import { SITE } from '../data/site'
import { temaDoMes } from '../data/temas'
import { diasAte, hoje } from '../lib/agenda'

/** Nome dividido em letras que sobem uma a uma depois da abertura. */
function NomeAnimado({ texto, atraso, ativo, className }) {
  return (
    <span className={`block ${className}`} aria-hidden="true">
      {[...texto].map((c, i) => (
        <span key={i} className="letra-mascara">
          <span className={`letra foil ${ativo ? 'ativa' : ''}`} style={{ animationDelay: `${atraso + i * 0.055}s` }}>
            {c}
          </span>
        </span>
      ))}
    </span>
  )
}

/** Aviso "Faltam X dias para o Halloween" baseado no tema do mês atual. */
function ContagemData() {
  const h = hoje()
  const tema = temaDoMes(h.getMonth())
  if (!tema.destaque) return null
  const n = diasAte(new Date(h.getFullYear(), h.getMonth(), tema.destaque.dia))
  if (n < 0) return null
  return (
    <div
      className="mb-6 inline-flex items-center gap-3 rounded-full border py-2 pl-2.5 pr-5 text-[0.9rem] lg:mb-7"
      style={{ borderColor: `${tema.cor}88`, background: `${tema.cor}1a` }}
    >
      <span className="h-6 w-6 rounded-full animate-pulsar" style={{ background: `radial-gradient(circle at 35% 30%, #fff 0, ${tema.cor} 45%, transparent 72%)`, boxShadow: `0 0 18px ${tema.cor}` }} />
      <span>{n === 0 ? <>Hoje é <b className="font-semibold">{tema.destaque.nome}</b></> : <>Faltam <b className="font-semibold">{n} {n === 1 ? 'dia' : 'dias'}</b> para o {tema.destaque.nome}</>}</span>
    </div>
  )
}

export default function Hero({ iniciado }) {
  const img = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const fn = () => img.current && (img.current.style.transform = `translateY(${window.scrollY * 0.12}px) scale(1.02)`)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section id="inicio" className="container-site relative grid overflow-x-clip items-center gap-0 lg:min-h-[min(900px,100svh)] lg:grid-cols-[1.15fr_.85fr] lg:gap-5 lg:pb-16 lg:pt-28">

      {/* Foto */}
      <div className="relative order-first -mx-4 h-[min(76svh,640px)] sm:-mx-5 lg:order-none lg:col-start-2 lg:row-start-1 lg:mx-0 lg:aspect-[3/4] lg:h-auto lg:max-w-[440px] lg:justify-self-end lg:w-full">
        <div className="pointer-events-none absolute -inset-7 hidden rounded-t-full rounded-b-[20px] border border-gold-light/10 lg:block" />
        <div className="pointer-events-none absolute -inset-3.5 hidden rounded-t-full rounded-b-[20px] border border-hair lg:block" />
        <div className="absolute inset-0 overflow-hidden lg:rounded-t-full lg:rounded-b-[14px]">
          <img ref={img} src={foto} alt="Evellyn Melo atendendo no estúdio Univers Nails" className="block h-[115%] w-full object-cover object-[50%_20%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,5,.55)_0,transparent_25%,transparent_45%,#070605_98%)] lg:bg-[linear-gradient(180deg,transparent_55%,rgba(7,6,5,.85))]" />
        </div>
        {/* selo girando */}
        <div aria-hidden="true" className="absolute right-4 top-24 z-[4] h-[104px] w-[104px] lg:-left-14 lg:bottom-14 lg:right-auto lg:top-auto lg:h-32 lg:w-32">
          <svg viewBox="0 0 120 120" className="h-full w-full animate-girar">
            <defs>
              <path id="circulo-selo" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
            </defs>
            <text className="fill-gold-light font-caps" style={{ fontSize: 10.4, letterSpacing: 3.2 }}>
              <textPath href="#circulo-selo">UNIVERS NAILS · ESPECIALISTA · </textPath>
            </text>
          </svg>
          <div className="absolute inset-[26px] grid place-items-center rounded-full border border-gold bg-ink p-2.5 lg:inset-[32px] lg:p-3">
            <Logo tipo="monograma" alt="" />
          </div>
        </div>
      </div>

      {/* Texto */}
      <div className="relative z-[3] -mt-48 pb-4 sm:-mt-56 lg:col-start-1 lg:row-start-1 lg:mt-0">
        <ContagemData />
        <h1 className="m-0 font-serif text-[clamp(3.6rem,15vw,10.5rem)] font-normal leading-[0.86] tracking-[-0.02em]" aria-label={SITE.nome}>
          <NomeAnimado texto="Evellyn" atraso={0} ativo={iniciado} />
          <NomeAnimado texto="Melo" atraso={0.25} ativo={iniciado} className="mt-[0.02em] pl-[0.6em] italic lg:pl-[0.9em]" />
        </h1>
        <div className="mt-6 flex items-center gap-4 lg:mt-8">
          <span className="h-px w-10 lg:w-16" style={{ background: 'var(--foil)' }} />
          <p className="m-0 font-caps text-[0.72rem] uppercase tracking-[0.22em] sm:text-[0.8rem] sm:tracking-label">{SITE.marca} · Design de unhas</p>
        </div>
        <p className="mb-7 mt-4 max-w-[32ch] text-[1.05rem] font-light text-mute lg:mb-9 lg:mt-5 lg:text-[1.15rem]">
          Mais de <em className="font-serif text-[1.15em] text-nude">{SITE.totalTecnicas} técnicas avançadas</em> e arte feita à mão, unha por unha. Atendimento exclusivo em {SITE.cidade}.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="#agenda" className="w-full sm:w-auto sm:min-w-[300px]">Agendar meu horário</Button>
          <Button href="#trabalhos" variante="secundario" className="w-full sm:w-auto">Ver trabalhos</Button>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-caps text-[0.65rem] tracking-label text-mute lg:flex">
        <i className="block h-11 w-px bg-gradient-to-b from-gold-light to-transparent" />
        ROLE
      </div>
    </section>
  )
}
