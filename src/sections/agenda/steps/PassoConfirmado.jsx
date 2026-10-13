import Button from '../../../components/ui/Button'
import { SINAL_PIX, SITE } from '../../../data/site'
import { linkGoogleAgenda } from '../../../lib/agenda'
import { brl, dataCurta, dataLonga, primeiroNome } from '../../../lib/format'

export default function PassoConfirmado({ data, horario, procedimento, nome, telefone, comSinal, onNovo }) {
  const [hh, mm] = horario.split(':').map(Number)
  const inicio = new Date(data.getFullYear(), data.getMonth(), data.getDate(), hh, mm)
  const vespera = new Date(data)
  vespera.setDate(vespera.getDate() - 1)
  const pn = primeiroNome(nome)
  const link = linkGoogleAgenda({ titulo: `${procedimento.nome} · ${SITE.nome}`, inicio, duracaoMin: procedimento.duracao, local: SITE.cidade })

  return (
    <>
      <div className="text-center">
        <div className="mx-auto mb-4 h-24 w-24">
          <svg viewBox="0 0 110 110" className="h-full w-full" aria-hidden="true">
            <circle cx="55" cy="55" r="52" fill="none" stroke="#e3b57c" strokeWidth="1.5" strokeDasharray="330" strokeDashoffset="330" style={{ animation: 'tracar 1.2s cubic-bezier(.7,0,.2,1) forwards' }} />
            <path d="M36 56 L50 70 L76 42" fill="none" stroke="#fff0d4" strokeWidth="3" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="60" style={{ animation: 'tracar .6s .9s forwards' }} />
          </svg>
        </div>
        <span className="font-caps text-[0.72rem] uppercase tracking-[0.22em] text-gold">Horário reservado</span>
        <h3 className="mb-2 mt-1 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal leading-tight">
          Te espero, <i className="text-nude">{pn}</i>!
        </h3>
        <p className="m-0 text-mute first-letter:uppercase">{dataLonga(data)}, às {horario}</p>
        <p className="m-0 text-mute">{procedimento.nome}</p>
      </div>

      {comSinal && (
        <p className="mb-0 mt-4 text-center text-[0.94rem] font-light text-mute">
          A Evellyn confere o seu PIX de {brl((procedimento.preco * SINAL_PIX.porcentagem) / 100)} e confirma a reserva.
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-[#1d3a2b] bg-[#0b1410] p-4">
        <small className="text-[0.8rem] tracking-wide text-[#8fbca3]">WhatsApp · {dataCurta(vespera)} · para {telefone}</small>
        <div className="animate-surgir max-w-[94%] self-start rounded-[14px] rounded-bl-[4px] bg-[#1d4a34] px-3.5 py-3 text-[0.96rem] leading-relaxed text-[#eaf7ef]">
          Oi, {pn}! Lembrando do seu horário amanhã, {dataCurta(data)} às {horario}: {procedimento.nome}. Responda 1 para confirmar ou 2 para remarcar. {SITE.nome} · {SITE.marca}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button href={link} variante="secundario" target="_blank" rel="noopener noreferrer">Salvar na minha agenda</Button>
        <Button onClick={onNovo}>Marcar outro horário</Button>
      </div>
    </>
  )
}
