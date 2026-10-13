/** Cabeçalho padrão das seções: rótulo, título com parte em itálico e texto de apoio. */
export default function SectionHeading({ rotulo, titulo, destaque, texto }) {
  return (
    <div className="revelar mb-9 grid gap-x-7 gap-y-2 md:mb-14 md:grid-cols-[auto_1fr] md:items-end">
      <span className="rotulo md:col-span-2">{rotulo}</span>
      <h2 className="m-0 font-serif text-[clamp(2.6rem,7vw,5.4rem)] font-normal leading-[0.95] tracking-tight">
        {titulo} {destaque && <i className="text-nude">{destaque}</i>}
      </h2>
      {texto && <p className="m-0 max-w-[36ch] font-light text-mute md:mb-2">{texto}</p>}
    </div>
  )
}
