import SectionHeading from '../components/ui/SectionHeading'
import { PROCEDIMENTOS } from '../data/procedimentos'
import { brl, duracaoTexto } from '../lib/format'

/** "A carta": lista de procedimentos no estilo cardápio de restaurante fino. */
export default function Procedimentos() {
  return (
    <section id="tecnicas" className="relative z-[2] pb-20 lg:pb-36">
      <div className="container-site">
        <SectionHeading rotulo="Técnicas & valores" titulo="A" destaque="carta" texto="Cada técnica com seu tempo. Na hora de agendar, você escolhe a sua." />
        <div className="grid gap-x-16 md:grid-cols-2">
          {PROCEDIMENTOS.map((p) => (
            <div key={p.id} className="item-carta revelar group relative border-b border-hair py-5 lg:py-6">
              <div className="flex items-baseline gap-3">
                <h3 className="m-0 min-w-0 flex-1 font-serif text-[1.25rem] font-normal leading-snug transition-transform duration-500 group-hover:translate-x-2 sm:flex-none sm:text-[1.5rem]">
                  {p.nome}
                </h3>
                <span className="hidden min-w-5 flex-1 -translate-y-1.5 border-b border-dotted border-gold/40 sm:block" />
                <span className="whitespace-nowrap text-right font-caps text-[1rem] tabular-nums text-gold-pale">
                  {p.aPartirDe && <small className="block font-sans text-[0.7rem] tracking-wide text-mute sm:mr-1 sm:inline">a partir de</small>}
                  {brl(p.preco)}
                </span>
              </div>
              <p className="m-0 mt-1.5 text-[0.98rem] text-mute">
                {p.descricao} <span className="ml-1 text-nude">· {duracaoTexto(p.duracao)}</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm italic text-mute">Valores e tempos de exemplo.</p>
      </div>
    </section>
  )
}
