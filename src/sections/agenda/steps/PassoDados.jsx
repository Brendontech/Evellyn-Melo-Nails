import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { mascaraTelefone } from '../../../lib/format'

export default function PassoDados({ nomeInicial, telefoneInicial, comSinal, enviando, onEnviar, onVoltar }) {
  const [nome, setNome] = useState(nomeInicial)
  const [telefone, setTelefone] = useState(telefoneInicial)
  const [erro, setErro] = useState('')

  const enviar = (e) => {
    e.preventDefault()
    if (nome.trim().length < 2) return setErro('Escreva seu nome, por favor.')
    if (telefone.replace(/\D/g, '').length < 10) return setErro('Confira o WhatsApp: DDD e número completo.')
    setErro('')
    onEnviar({ nome: nome.trim(), telefone })
  }

  return (
    <form onSubmit={enviar} noValidate>
      <h3 className="mb-5 mt-1 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal leading-tight">
        Quase <i className="text-nude">pronto</i>
      </h3>
      <div className="flex flex-col gap-4">
        <label className="campo" htmlFor="ag-nome">
          <span>Seu nome</span>
          <input id="ag-nome" autoComplete="name" placeholder="Ex.: Maria Aparecida" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label className="campo" htmlFor="ag-telefone">
          <span>Seu WhatsApp com DDD</span>
          <input id="ag-telefone" inputMode="tel" autoComplete="tel" placeholder="(34) 9 0000-0000" value={telefone} onChange={(e) => setTelefone(mascaraTelefone(e.target.value))} />
        </label>
      </div>
      <p className="mb-0 mt-3 min-h-[1.4em] text-[0.95rem] text-[#ffb39b]" role="alert">{erro}</p>
      <p className="m-0 text-[0.94rem] font-light text-mute">Você recebe a confirmação nesse número um dia antes do horário.</p>
      <div className="mt-6">
        <Button type="submit" className="w-full" disabled={enviando}>
          {enviando ? 'Enviando…' : comSinal ? 'Ir para o sinal' : 'Confirmar horário'}
        </Button>
      </div>
      <button type="button" className="link-voltar" onClick={onVoltar}>← Voltar</button>
    </form>
  )
}
