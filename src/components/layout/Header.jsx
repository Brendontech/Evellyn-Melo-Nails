import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
import MobileMenu from './MobileMenu'

export const LINKS = [
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#tecnicas', label: 'Técnicas' },
  { href: '#sobre', label: 'Sobre' },
]

export default function Header() {
  const [solido, setSolido] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const fn = () => setSolido(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (menu) document.body.classList.add('travado')
    const esc = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('keydown', esc)
      if (menu) document.body.classList.remove('travado')
    }
  }, [menu])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[75] pt-[env(safe-area-inset-top,0px)] transition-colors duration-500 ${
          solido || menu ? 'border-b border-hair bg-ink/75 backdrop-blur-xl' : ''
        }`}
      >
        <div className="container-site flex h-[68px] items-center justify-between lg:h-[76px]">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Evellyn Melo, início">
            <Logo tipo="monograma" className="w-9!" alt="" />
            <span className="font-caps text-[0.82rem] tracking-[0.14em] text-gold-light xs:inline sm:text-[0.8rem] max-[379px]:hidden">EVELLYN MELO</span>
          </a>

          <nav aria-label="Seções" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="group relative py-1 font-caps text-[0.84rem] uppercase tracking-[0.14em] text-mute transition-colors hover:text-cream">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-gold-light transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <a href="#agenda" className="hidden rounded-full border border-gold px-5 py-3 font-caps text-[0.82rem] tracking-[0.14em] text-gold-pale transition-colors hover:bg-gold-light hover:text-ink lg:inline-block">
            AGENDAR
          </a>

          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menu}
            aria-controls="menu-mobile"
            className="relative h-12 w-12 rounded-full border border-hair bg-ink/40 backdrop-blur lg:hidden"
          >
            <i className={`absolute left-3.5 right-3.5 h-px bg-gold-pale transition-all duration-500 ${menu ? 'top-[23px] rotate-45' : 'top-[19px]'}`} />
            <i className={`absolute left-3.5 right-3.5 h-px bg-gold-pale transition-all duration-500 ${menu ? 'top-[23px] -rotate-45' : 'top-[27px]'}`} />
          </button>
        </div>
      </header>
      <MobileMenu aberto={menu} fechar={() => setMenu(false)} />
    </>
  )
}
