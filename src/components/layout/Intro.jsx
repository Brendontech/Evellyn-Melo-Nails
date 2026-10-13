import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'

/**
 * Abertura: o logo oficial surge com um brilho passando, uma linha dourada corta a tela
 * e as duas metades se abrem como cortina. Toque para pular.
 */
export default function Intro({ onFim }) {
  const [fase, setFase] = useState('entrada') // entrada → corte → aberta → fim

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFase('fim')
      onFim()
      return
    }
    document.body.classList.add('travado')
    const t1 = setTimeout(() => setFase('corte'), 1500)
    return () => clearTimeout(t1)
  }, [onFim])

  useEffect(() => {
    if (fase === 'corte') {
      const t = setTimeout(() => {
        setFase('aberta')
        document.body.classList.remove('travado')
        onFim()
      }, 420)
      return () => clearTimeout(t)
    }
    if (fase === 'aberta') {
      const t = setTimeout(() => setFase('fim'), 1200)
      return () => clearTimeout(t)
    }
  }, [fase, onFim])

  if (fase === 'fim') return null
  const aberta = fase === 'aberta'
  const ease = 'cubic-bezier(.77,0,.18,1)'

  return (
    <div
      aria-hidden="true"
      onClick={() => fase === 'entrada' && setFase('corte')}
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center"
    >
      <div className="absolute inset-x-0 top-0 h-[50.5%] bg-ink" style={{ transition: `transform 1.1s ${ease}`, transform: aberta ? 'translateY(-100%)' : 'none' }} />
      <div className="absolute inset-x-0 bottom-0 h-[50.5%] bg-ink" style={{ transition: `transform 1.1s ${ease}`, transform: aberta ? 'translateY(100%)' : 'none' }} />
      <div
        className="absolute left-1/2 top-1/2 h-px -translate-x-1/2 bg-gold-light"
        style={{ width: fase === 'entrada' ? 0 : '100vw', transition: `width .9s ${ease}`, boxShadow: '0 0 18px #e3b57c' }}
      />
      <div
        className="relative w-[min(340px,70vw)]"
        style={{
          transition: `opacity .5s, transform 1.1s ${ease}, filter 1.2s`,
          opacity: aberta ? 0 : 1,
          transform: aberta ? 'scale(1.15)' : 'none',
        }}
      >
        <div style={{ animation: 'surgir 1s cubic-bezier(.2,.9,.2,1) both' }}>
          <Logo brilho className="w-full" />
        </div>
      </div>
    </div>
  )
}
