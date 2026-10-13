import { SITE } from '../../data/site'
import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { LINKS } from './Header'

export default function Footer() {
  return (
    <footer className="relative z-[2] overflow-hidden border-t border-hair bg-ink-2 pb-32 pt-16 lg:pb-12 lg:pt-20">
      {/* luz dourada suave atrás do logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full lg:left-[18%]"
        style={{ background: 'radial-gradient(circle, rgba(227,181,124,.12), transparent 65%)' }}
      />

      <div className="container-site relative grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
        {/* Logo oficial, sem efeitos */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <Logo className="w-[min(230px,60vw)]" />
          <Button href="#agenda" className="w-full max-w-[320px]">Agendar horário</Button>
        </div>

        {/* Informações */}
        <div className="grid gap-8 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <span className="rotulo">Onde</span>
            <p className="m-0 mt-2 text-cream">{SITE.cidade}</p>
          </div>
          <div>
            <span className="rotulo">WhatsApp</span>
            <p className="m-0 mt-2 select-all text-[1.15rem] font-semibold text-cream">{SITE.whatsapp}</p>
          </div>
          <div>
            <span className="rotulo">Atendimento</span>
            <p className="m-0 mt-2 text-cream">{SITE.atendimento}</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-wrap justify-center gap-x-7 gap-y-2 border-t border-hair pt-6 sm:col-span-3 sm:justify-start">
            {[...LINKS, { href: '#agenda', label: 'Agenda' }].map((l) => (
              <a key={l.href} href={l.href} className="py-1 text-mute underline-offset-4 hover:text-gold-pale hover:underline">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <p className="container-site relative mt-12 border-t border-hair pt-6 text-center text-[0.9rem] text-mute/80 lg:text-left">
        © {new Date().getFullYear()} {SITE.nome} · {SITE.marca}
      </p>
    </footer>
  )
}
