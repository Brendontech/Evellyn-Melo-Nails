import { useEffect, useRef } from 'react'

/**
 * Cena animada do topo do calendário.
 * cena: 'halloween' (lua + morcegos) | 'confete' (confete dourado) | 'natal' (neve + luzinhas)
 */
export default function SeasonScene({ cena }) {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const R = (a, b) => a + Math.random() * (b - a)
    let W = 0, H = 0, raf, parts = []

    const tamanho = () => {
      const r = cv.getBoundingClientRect()
      W = r.width
      H = r.height
      cv.width = W * dpr
      cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    tamanho()

    if (cena === 'halloween') {
      for (let i = 0; i < 9; i++) parts.push({ t: 'morcego', x: R(-50, W), y: R(20, H * 0.6), s: R(0.5, 1.1), v: R(0.6, 1.6), ph: R(0, 6) })
      for (let i = 0; i < 40; i++) parts.push({ t: 'nevoa', x: R(0, W), y: R(H * 0.6, H), r: R(30, 80), v: R(0.1, 0.3) })
    } else if (cena === 'natal') {
      for (let i = 0; i < 90; i++) parts.push({ t: 'neve', x: R(0, W), y: R(0, H), r: R(0.8, 2.6), v: R(0.3, 1), ph: R(0, 6) })
      for (let i = 0; i < 14; i++) parts.push({ t: 'luz', i })
    } else {
      const cores = ['#fff0d4', '#e3b57c', '#b07a3f', '#f2c46d']
      for (let i = 0; i < 70; i++) parts.push({ t: 'confete', x: R(0, W), y: R(-H, H), w: R(3, 8), h: R(6, 14), v: R(0.5, 1.6), rot: R(0, 6), vr: R(-0.08, 0.08), c: cores[i % 4] })
    }

    const morcego = (x, y, s, f) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(s, s)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(-7, -10 * f - 4, -20, -5 * f)
      ctx.quadraticCurveTo(-14, 1, -10, 4)
      ctx.quadraticCurveTo(-5, 1, 0, 5)
      ctx.quadraticCurveTo(5, 1, 10, 4)
      ctx.quadraticCurveTo(14, 1, 20, -5 * f)
      ctx.quadraticCurveTo(7, -10 * f - 4, 0, 0)
      ctx.fillStyle = '#050302'
      ctx.fill()
      ctx.restore()
    }
    const varal = (x) => 30 + Math.sin((x / W) * Math.PI * 2) * 10

    const desenhar = (t) => {
      ctx.clearRect(0, 0, W, H)
      if (cena === 'halloween') {
        const mx = W * 0.76, my = H * 0.36, mr = Math.min(56, H * 0.26)
        const halo = ctx.createRadialGradient(mx, my, mr * 0.6, mx, my, mr * 3)
        halo.addColorStop(0, 'rgba(255,170,90,.35)')
        halo.addColorStop(1, 'rgba(255,170,90,0)')
        ctx.fillStyle = halo
        ctx.fillRect(0, 0, W, H)
        const lua = ctx.createRadialGradient(mx - mr * 0.3, my - mr * 0.3, 4, mx, my, mr)
        lua.addColorStop(0, '#fff4dc')
        lua.addColorStop(1, '#f3b06a')
        ctx.fillStyle = lua
        ctx.beginPath()
        ctx.arc(mx, my, mr, 0, 7)
        ctx.fill()
        for (const p of parts) {
          if (p.t === 'morcego') {
            p.x += p.v
            p.y += Math.sin(t * 0.003 + p.ph) * 0.5
            if (p.x > W + 40) { p.x = -40; p.y = R(20, H * 0.6) }
            morcego(p.x, p.y, p.s, Math.sin(t * 0.02 + p.ph))
          } else {
            p.x += p.v
            if (p.x > W + 80) p.x = -80
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
            g.addColorStop(0, 'rgba(255,138,61,.07)')
            g.addColorStop(1, 'rgba(255,138,61,0)')
            ctx.fillStyle = g
            ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2)
          }
        }
      } else if (cena === 'natal') {
        ctx.strokeStyle = 'rgba(230,190,140,.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = 0; x <= W; x += 10) x === 0 ? ctx.moveTo(x, varal(x)) : ctx.lineTo(x, varal(x))
        ctx.stroke()
        for (const p of parts) {
          if (p.t === 'neve') {
            p.y += p.v
            p.x += Math.sin(t * 0.001 + p.ph) * 0.3
            if (p.y > H + 5) { p.y = -5; p.x = R(0, W) }
            ctx.fillStyle = 'rgba(255,255,255,.85)'
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, 7)
            ctx.fill()
          } else {
            const x = ((p.i + 0.5) * W) / 14, y = varal(x) + 6
            const on = (Math.sin(t * 0.003 + p.i * 1.7) + 1) / 2
            const c = ['#ff5a5a', '#f2c46d', '#7fd6a0'][p.i % 3]
            const g = ctx.createRadialGradient(x, y, 0, x, y, 16)
            g.addColorStop(0, c)
            g.addColorStop(1, 'transparent')
            ctx.globalAlpha = 0.25 + on * 0.6
            ctx.fillStyle = g
            ctx.fillRect(x - 16, y - 16, 32, 32)
            ctx.globalAlpha = 1
            ctx.fillStyle = c
            ctx.beginPath()
            ctx.arc(x, y, 3.5, 0, 7)
            ctx.fill()
          }
        }
      } else {
        for (const p of parts) {
          p.y += p.v
          p.rot += p.vr
          p.x += Math.sin(t * 0.001 + p.y * 0.02) * 0.3
          if (p.y > H + 20) { p.y = -20; p.x = R(0, W) }
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.scale(1, Math.cos(t * 0.004 + p.x))
          ctx.fillStyle = p.c
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
          ctx.restore()
        }
      }
    }

    const loop = (t) => {
      desenhar(t)
      raf = requestAnimationFrame(loop)
    }
    if (reduz) desenhar(0)
    else raf = requestAnimationFrame(loop)

    window.addEventListener('resize', tamanho)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', tamanho)
    }
  }, [cena])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
