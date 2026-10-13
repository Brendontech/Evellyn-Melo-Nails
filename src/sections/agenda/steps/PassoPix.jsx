import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import { useToast } from '../../../components/ui/Toast'
import { SINAL_PIX, SITE } from '../../../data/site'
import { brl } from '../../../lib/format'

export default function PassoPix({ procedimento, enviando, onPago, onVoltar }) {
  const toast = useToast()
  const chaveRef = useRef(null)
  const [copiado, setCopiado] = useState(false)
  const sinal = (procedimento.preco * SINAL_PIX.porcentagem) / 100

  const selecionar = () => {
    const r = document.createRange()
    r.selectNodeContents(chaveRef.current)
    const s = window.getSelection()
    s.removeAllRanges()
    s.addRange(r)
    toast('Chave selecionada, é só copiar')
  }
  const copiar = () => {
    try {
      navigator.clipboard.writeText(SITE.chavePix).then(() => {
        setCopiado(true)
        toast('Chave PIX copiada')
      }, selecionar)
    } catch {
      selecionar()
    }
  }

  return (
    <>
      <h3 className="mb-5 mt-1 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal leading-tight">
        Garanta seu <i className="text-nude">horário</i>
      </h3>
      <div className="rounded-2xl border p-5" style={{ borderColor: 'color-mix(in srgb, var(--season) 50%, transparent)', background: 'radial-gradient(circle at 100% 0, color-mix(in srgb, var(--season) 22%, transparent), transparent 60%), rgba(255,240,212,.03)' }}>
        <span className="font-caps text-[0.82rem] uppercase tracking-[0.14em] text-gold">Sinal de {SINAL_PIX.porcentagem}%</span>
        <div className="foil mt-1 font-serif text-[2.6rem] leading-none tabular-nums sm:text-[3rem]">{brl(sinal)}</div>
        <p className="mb-0 mt-3">Abra o app do seu banco, escolha <b>PIX</b> e cole esta chave:</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <code ref={chaveRef} className="min-w-0 flex-1 break-all rounded-xl border border-dashed border-gold bg-ink p-3.5 font-sans text-base">{SITE.chavePix}</code>
          <button type="button" onClick={copiar} className="min-h-[52px] rounded-xl bg-gold-btn px-5 font-semibold text-ink">{copiado ? 'Copiado ✓' : 'Copiar chave'}</button>
        </div>
        <p className="mb-0 mt-3 text-[0.94rem] text-mute">
          Dezembro tem muita procura. O sinal segura sua vaga e é descontado no dia. O restante, {brl(procedimento.preco - sinal)}, você paga no atendimento.
        </p>
      </div>
      <div className="mt-6">
        <Button className="w-full" disabled={enviando} onClick={onPago}>{enviando ? 'Enviando…' : 'Já fiz o PIX'}</Button>
      </div>
      <button type="button" className="link-voltar" onClick={onVoltar}>← Voltar</button>
    </>
  )
}
