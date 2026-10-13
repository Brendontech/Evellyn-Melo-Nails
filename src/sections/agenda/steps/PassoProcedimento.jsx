import Button from '../../../components/ui/Button'
import { PROCEDIMENTOS } from '../../../data/procedimentos'
import { brl, duracaoTexto } from '../../../lib/format'

export default function PassoProcedimento({ selecionado, onSelecionar, onContinuar, onVoltar }) {
  return (
    <>
      <h3 className="mb-5 mt-1 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal leading-tight">
        Qual <i className="text-nude">procedimento</i>?
      </h3>
      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Procedimentos">
        {PROCEDIMENTOS.map((p) => {
          const sel = selecionado === p.id
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={sel}
              onClick={() => onSelecionar(p.id)}
              className={`grid min-h-[64px] grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all sm:px-5 ${
                sel ? 'border-gold-light bg-gold-light/10' : 'border-hair bg-cream/[0.03] hover:border-gold'
              }`}
            >
              <span className={`grid h-6 w-6 place-items-center rounded-full border-2 ${sel ? 'border-gold-light' : 'border-mute/60'}`}>
                {sel && <span className="h-2.5 w-2.5 rounded-full bg-gold-light" />}
              </span>
              <span className="text-[1.05rem] font-medium leading-snug">
                {p.nome}
                <small className="block text-[0.86rem] font-normal text-mute">{duracaoTexto(p.duracao)} de atendimento</small>
              </span>
              <span className="whitespace-nowrap font-caps text-gold-pale">{brl(p.preco)}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-6">
        <Button className="w-full" disabled={!selecionado} onClick={onContinuar}>Continuar</Button>
      </div>
      <button type="button" className="link-voltar" onClick={onVoltar}>← Voltar</button>
    </>
  )
}
