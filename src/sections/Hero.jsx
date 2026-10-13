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
      className="inline-flex items-center gap-3 rounded-full border py-2 pl-2.5 pr-5 text-[0.95rem]"
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
    <section id="inicio" className="container-site relative grid items-center gap-0 overflow-x-clip lg:min-h-[min(900px,100svh)] lg:grid-cols-[1.15fr_.85fr] lg:gap-5 lg:pb-16 lg:pt-28">
      {/* Foto */}
      <div className="relative order-first -mx-4 h-[min(68svh,580px)] sm:-mx-5 lg:order-none lg:col-start-2 lg:row-start-1 lg:mx-0 lg:aspect-[3/4] lg:h-auto lg:w-full lg:max-w-[440px] lg:justify-self-end">
        <div className="pointer-events-none absolute -inset-7 hidden rounded-t-full rounded-b-[20px] border border-gold-light/10 lg:block" />
        <div className="pointer-events-none absolute -inset-3.5 hidden rounded-t-full rounded-b-[20px] border border-hair lg:block" />
        <div className="absolute inset-0 overflow-hidden lg:rounded-t-full lg:rounded-b-[14px]">
          <img ref={img} src={foto} alt="Evellyn Melo atendendo no estúdio Univers Nails" className="block h-[115%] w-full object-cover object-[50%_12%] lg:object-[50%_20%]" />
          {/* no celular o degradê escurece a parte de baixo da foto (onde fica o texto) */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,5,.45)_0,transparent_18%,transparent_40%,rgba(7,6,5,.94)_60%,#070605_76%)] lg:bg-[linear-gradient(180deg,transparent_55%,rgba(7,6,5,.85))]" />
        </div>
        {/* selo girando (só no computador, no celular poluía a foto) */}
        <div aria-hidden="true" className="absolute -left-14 bottom-14 z-[4] hidden h-32 w-32 lg:block">
          <svg viewBox="0 0 120 120" className="h-full w-full animate-girar">
            <defs>
              <path id="circulo-selo" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
            </defs>
            <text className="fill-gold-light font-caps" style={{ fontSize: 10.4, letterSpacing: 3.2 }}>
              <textPath href="#circulo-selo">UNIVERS NAILS · ESPECIALISTA · </textPath>
            </text>
          </svg>
          <div className="absolute inset-[32px] grid place-items-center rounded-full border border-gold bg-ink p-3">
            <Logo tipo="monograma" alt="" />
          </div>
        </div>
      </div>

      {/* Texto: centralizado no celular, alinhado à esquerda no computador */}
      <div className="relative z-[3] -mt-44 flex flex-col items-center pb-6 text-center sm:-mt-52 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:items-start lg:text-left">
        <h1 className="m-0 font-serif text-[clamp(3.4rem,14vw,10.5rem)] font-normal leading-[0.9] tracking-[-0.01em]" aria-label={SITE.nome}>
          <NomeAnimado texto="Evellyn" atraso={0} ativo={iniciado} />
          <NomeAnimado texto="Melo" atraso={0.25} ativo={iniciado} className="mt-[0.04em] font-accent italic lg:pl-[0.9em]" />
        </h1>
        <div className="mt-5 flex items-center gap-3 lg:mt-8 lg:gap-4">
          <span className="hidden h-px w-8 sm:block lg:w-16" style={{ background: 'var(--foil)' }} />
          <p className="m-0 whitespace-nowrap font-caps text-[0.8rem] uppercase tracking-[0.1em] text-gold-pale sm:text-[0.9rem] sm:tracking-[0.14em]">Especialista em design de unhas</p>
          <span className="hidden h-px w-8 sm:block lg:hidden" style={{ background: 'var(--foil)' }} />
        </div>
        <p className="mb-6 mt-4 max-w-[34ch] text-[1.05rem] text-mute lg:mb-7 lg:mt-5 lg:text-[1.15rem]">
          Mais de <em className="text-[1.08em] text-nude">{SITE.totalTecnicas} técnicas avançadas</em> e arte feita à mão. Atendimento em {SITE.cidade}.
        </p>
        <div className="mb-7 lg:mb-9">
          <ContagemData />
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Button href="#agenda" className="w-full sm:w-auto sm:min-w-[320px]">Agendar meu horário</Button>
          <Button href="#trabalhos" variante="secundario" className="w-full sm:w-auto">Ver trabalhos</Button>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-caps text-[0.76rem] tracking-label text-mute lg:flex">
        <i className="block h-11 w-px bg-linear-to-b from-gold-light to-transparent" />
        ROLE
      </div>
    </section>
  )
}
