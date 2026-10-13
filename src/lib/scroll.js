/**
 * Rolagem suave com controle de tempo e curva (o scroll-behavior do navegador é rápido demais).
 * Desconta a altura do topo fixo. Respeita "reduzir movimento".
 */
const ALTURA_TOPO = 84

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

let animacao = null

export function rolarPara(alvo, { offset = ALTURA_TOPO, bloco = 'start' } = {}) {
  const el = typeof alvo === 'string' ? document.querySelector(alvo) : alvo
  if (!el) return
  const r = el.getBoundingClientRect()
  let destino = window.scrollY + r.top - offset
  if (bloco === 'center') destino = window.scrollY + r.top - (window.innerHeight - r.height) / 2
  destino = Math.max(0, Math.min(destino, document.documentElement.scrollHeight - window.innerHeight))

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, destino)
    return
  }

  cancelAnimationFrame(animacao)
  const inicio = window.scrollY
  const distancia = destino - inicio
  // mais longe = um pouco mais demorado, entre 0,9s e 1,6s
  const duracao = Math.min(1600, Math.max(900, Math.abs(distancia) * 0.45))
  const t0 = performance.now()

  // se a pessoa mexer na tela no meio do caminho, a rolagem automática para
  const parar = () => cancelAnimationFrame(animacao)
  window.addEventListener('wheel', parar, { once: true, passive: true })
  window.addEventListener('touchstart', parar, { once: true, passive: true })

  const passo = (agora) => {
    const p = Math.min(1, (agora - t0) / duracao)
    window.scrollTo(0, inicio + distancia * easeInOutCubic(p))
    if (p < 1) animacao = requestAnimationFrame(passo)
    else {
      window.removeEventListener('wheel', parar)
      window.removeEventListener('touchstart', parar)
    }
  }
  animacao = requestAnimationFrame(passo)
}

/** Faz todos os links internos (#agenda, #sobre...) usarem a rolagem suave. */
export function ativarLinksSuaves() {
  const clique = (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
    const id = a.getAttribute('href')
    if (id.length < 2) return
    const el = document.querySelector(id)
    if (!el) return
    e.preventDefault()
    rolarPara(el)
    history.replaceState(null, '', id)
  }
  document.addEventListener('click', clique)
  return () => document.removeEventListener('click', clique)
}
