import { useEffect, useRef } from 'react'

/** Pó de ouro flutuando pela página. Afasta-se do dedo/mouse. */
export default function GoldDust() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const R = (a, b) => a + Math.random() * (b - a)
    let W = 0, H = 0, raf
    const mouse = { x: -999, y: -999 }

    const tamanho = () => {
      W = window.innerWidth
      H = window.innerHeight
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    tamanho()

    const qtd = W < 700 ? 34 : 70
    const pts = Array.from({ length: qtd }, () => ({
      x: R(0, W), y: R(0, H), r: R(0.4, 1.8), vx: R(-0.15, 0.15), vy: R(-0.35, -0.05), a: R(0.2, 0.8), ph: R(0, 6),
    }))

    const mover = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('resize', tamanho)
    window.addEventListener('pointermove', mover)

    const loop = (t) => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy
        if (d2 < 14000) {
          const f = ((14000 - d2) / 14000) * 1.6, d = Math.sqrt(d2 + 1)
          p.x += (dx / d) * f
          p.y += (dy / d) * f
        }
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) { p.y = H + 10; p.x = R(0, W) }
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        const a = p.a * (0.5 + 0.5 * Math.sin(t * 0.002 + p.ph))
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
        g.addColorStop(0, `rgba(255,226,170,${a})`)
        g.addColorStop(1, 'rgba(255,226,170,0)')
        ctx.fillStyle = g
        ctx.fillRect(p.x - p.r * 5, p.y - p.r * 5, p.r * 10, p.r * 10)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', tamanho)
      window.removeEventListener('pointermove', mover)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-full w-full mix-blend-screen" />
}
