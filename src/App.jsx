import { useCallback, useEffect, useState } from 'react'
import GoldDust from './components/effects/GoldDust'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import Intro from './components/layout/Intro'
import MobileDock from './components/layout/MobileDock'
import { ToastProvider } from './components/ui/Toast'
import { useReveal } from './hooks/useReveal'
import { ativarLinksSuaves } from './lib/scroll'
import Agenda from './sections/agenda/Agenda'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import Portfolio from './sections/Portfolio'
import Procedimentos from './sections/Procedimentos'
import Sobre from './sections/Sobre'

export default function App() {
  const [iniciado, setIniciado] = useState(false)
  const aoTerminarIntro = useCallback(() => setIniciado(true), [])
  useReveal()
  useEffect(() => ativarLinksSuaves(), [])

  return (
    <ToastProvider>
      <Intro onFim={aoTerminarIntro} />
      <GoldDust />
      <Header />
      <main className="relative z-[2] overflow-x-clip">
        <Hero iniciado={iniciado} />
        <Marquee />
        <Portfolio />
        <Procedimentos />
        <Sobre />
        <Agenda />
      </main>
      <Footer />
      <MobileDock />
    </ToastProvider>
  )
}
