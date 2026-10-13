import { useEffect, useState } from 'react'
import Button from '../ui/Button'

/** Botão fixo "Agendar" no celular. Some quando a pessoa já está na agenda. */
export default function MobileDock() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const agenda = document.getElementById('agenda')
    const fn = () => {
      const r = agenda?.getBoundingClientRect()
      const naAgenda = r && r.top < window.innerHeight * 0.85 && r.bottom > 0
      setVisivel(window.scrollY > window.innerHeight * 0.6 && !naAgenda)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('scroll', fn)
      window.removeEventListener('resize', fn)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-6 transition-transform duration-500 lg:hidden ${
        visivel ? 'translate-y-0' : 'translate-y-[120%]'
      }`}
      style={{ background: 'linear-gradient(transparent, rgba(7,6,5,.95) 40%)' }}
    >
      <Button href="#agenda" className="w-full" tabIndex={visivel ? 0 : -1}>
        Agendar meu horário
      </Button>
    </div>
  )
}
