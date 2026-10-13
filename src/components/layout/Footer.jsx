import { SITE } from '../../data/site'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="relative z-[2] border-t border-hair pb-32 pt-20 text-center lg:pb-20">
      <div className="container-site flex flex-col items-center">
        <Logo brilho className="w-[min(320px,72vw)]" />
        <div className="mt-10 grid w-full max-w-3xl gap-6 border-t border-hair pt-8 text-mute sm:grid-cols-3">
          <div>
            <span className="rotulo block">Onde</span>
            <p className="m-0 mt-1">{SITE.cidade}</p>
          </div>
          <div>
            <span className="rotulo block">WhatsApp</span>
            <p className="m-0 mt-1 select-all">{SITE.whatsapp}</p>
          </div>
          <div>
            <span className="rotulo block">Atendimento</span>
            <p className="m-0 mt-1">{SITE.atendimento}</p>
          </div>
        </div>
        <p className="mt-10 text-sm text-mute/60">© {new Date().getFullYear()} {SITE.nome} · {SITE.marca}</p>
      </div>
    </footer>
  )
}
