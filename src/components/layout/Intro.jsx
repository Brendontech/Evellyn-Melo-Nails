import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'

/**
 * Abertura em vidro fosco: o site já aparece desfocado ao fundo e o logo oficial
 * surge no centro com um brilho passando. Depois o vidro "desembaça" e revela a página.
 * Toque/clique em qualquer lugar para pular.
 */
const DURACAO_ENTRADA = 2300 // ms com o logo em destaque
const DURACAO_SAIDA = 1000 // ms para o vidro desembaçar

export default function Intro({ onFim }) {
  const [fase, setFase] = useState('entrada') // entrada → saida → fim

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFase('fim')
      onFim()
      return
    }
    document.body.classList.add('travado')
    const t = setTimeout(() => setFase('saida'), DURACAO_ENTRADA)
    return () => clearTimeout(t)
  }, [onFim])

  useEffect(() => {
    if (fase !== 'saida') return
    document.body.classList.remove('travado')
    onFim()
    const t = setTimeout(() => setFase('fim'), DURACAO_SAIDA)
    return () => clearTimeout(t)
  }, [fase, onFim])

  if (fase === 'fim') return null
  const saindo = fase === 'saida'
  const ease = 'cubic-bezier(.65,0,.25,1)'

  return (
    <div
      aria-hidden="true"
      onClick={() => fase === 'entrada' && setFase('saida')}
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center px-6"
      style={{
        backdropFilter: saindo ? 'blur(0px) saturate(100%)' : 'blur(22px) saturate(140%)',
        WebkitBackdropFilter: saindo ? 'blur(0px) saturate(100%)' : 'blur(22px) saturate(140%)',
        background: saindo ? 'rgba(7,6,5,0)' : 'rgba(7,6,5,.42)',
        transition: `backdrop-filter ${DURACAO_SAIDA}ms ${ease}, -webkit-backdrop-filter ${DURACAO_SAIDA}ms ${ease}, background ${DURACAO_SAIDA}ms ${ease}`,
      }}
    >
      {/* halo dourado suave atrás do logo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,620px)] w-[min(90vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(227,181,124,.22) 0%, rgba(227,181,124,.06) 40%, transparent 68%)',
          opacity: saindo ? 0 : 1,
          transition: `opacity ${DURACAO_SAIDA * 0.7}ms ${ease}`,
        }}
      />

      <div
        className="relative w-[min(380px,78vw)]"
        style={{
          opacity: saindo ? 0 : 1,
          transform: saindo ? 'scale(1.06)' : 'none',
          filter: saindo ? 'blur(6px)' : 'none',
          transition: `opacity ${DURACAO_SAIDA * 0.8}ms ${ease}, transform ${DURACAO_SAIDA}ms ${ease}, filter ${DURACAO_SAIDA}ms ${ease}`,
        }}
      >
        <div style={{ animation: 'logo-entrada 1.1s cubic-bezier(.2,.9,.2,1) both' }}>
          <Logo brilho className="w-full drop-shadow-[0_10px_40px_rgba(0,0,0,.55)]" />
        </div>
        {/* filete dourado que se abre embaixo do logo */}
        <span
          className="mx-auto mt-7 block h-px w-full origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, #e3b57c, transparent)', animation: 'filete 1.2s .6s cubic-bezier(.65,0,.25,1) both' }}
        />
      </div>
    </div>
  )
}
