import { useEffect, useRef, useState } from 'react'

/** Conta de 0 até `alvo` quando o elemento entra na tela. */
export function useCountUp(alvo, passoMs = 140) {
  const ref = useRef(null)
  const [valor, setValor] = useState(alvo)

  useEffect(() => {
    const el = ref.current
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || reduz || !('IntersectionObserver' in window)) return
    let timer
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        let i = 0
        setValor(0)
        timer = setInterval(() => {
          i += 1
          setValor(i)
          if (i >= alvo) clearInterval(timer)
        }, passoMs)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [alvo, passoMs])

  return [ref, valor]
}
