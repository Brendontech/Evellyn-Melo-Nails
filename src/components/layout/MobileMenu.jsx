import { SITE } from '../../data/site'
import { LINKS } from './Header'

/** Menu em tela cheia para celular. Abre em círculo a partir do botão. */
export default function MobileMenu({ aberto, fechar }) {
  const itens = [...LINKS, { href: '#agenda', label: 'Agendar', destaque: true }]
  return (
    <nav
      id="menu-mobile"
      aria-label="Menu"
      aria-hidden={!aberto}
      className="fixed inset-0 z-[70] flex flex-col justify-center px-7 pb-[calc(40px+env(safe-area-inset-bottom,0px))] pt-24 lg:hidden"
      style={{
        background: 'radial-gradient(circle at 80% 0, #2a1c10, #070605 60%)',
        clipPath: aberto ? 'circle(150% at calc(100% - 44px) 46px)' : 'circle(0% at calc(100% - 44px) 46px)',
        transition: 'clip-path .9s cubic-bezier(.77,0,.18,1), visibility .9s',
        visibility: aberto ? 'visible' : 'hidden',
      }}
    >
      {itens.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          onClick={fechar}
          tabIndex={aberto ? 0 : -1}
          className="flex items-baseline gap-4 border-b border-hair py-2 font-serif text-[2.5rem] leading-tight"
          style={{
            transition: 'transform .7s cubic-bezier(.2,.9,.2,1), opacity .7s',
            transitionDelay: aberto ? `${0.15 + i * 0.06}s` : '0s',
            transform: aberto ? 'none' : 'translateY(30px)',
            opacity: aberto ? 1 : 0.01,
          }}
        >
          <small className="font-caps text-[0.7rem] tracking-label text-gold">{String(i + 1).padStart(2, '0')}</small>
          {l.destaque ? <i className="text-gold-light">{l.label}</i> : l.label}
        </a>
      ))}
      <p className="mt-8 text-[0.95rem] text-mute">
        {SITE.cidade}
        <br />
        {SITE.atendimento}
      </p>
    </nav>
  )
}
