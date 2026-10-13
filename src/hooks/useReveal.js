import { useEffect } from 'react'

/**
 * Anima a entrada de todo elemento com a classe .revelar.
 * Só esconde o que está abaixo da dobra, então o primeiro quadro já aparece completo.
 */
export function useReveal(dep) {
  useEffect(() => {
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduz || !('IntersectionObserver' in window)) return

    const els = [...document.querySelectorAll('.revelar')]
    els.forEach((el) => el.getBoundingClientRect().top > window.innerHeight && el.classList.add('pre'))

    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (!e.isIntersecting) return
          const irmaos = [...e.target.parentElement.children].filter((c) => c.classList.contains('revelar'))
          e.target.style.transitionDelay = `${Math.max(0, irmaos.indexOf(e.target)) * 0.08}s`
          e.target.classList.remove('pre')
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    const seguranca = setTimeout(() => els.forEach((el) => el.classList.remove('pre')), 6000)
    return () => {
      io.disconnect()
      clearTimeout(seguranca)
    }
  }, [dep])
}
