/** Cabeçalho padrão das seções: rótulo, título (com parte em itálico) e, logo abaixo, o texto de apoio. */
export default function SectionHeading({ rotulo, titulo, destaque, texto }) {
  return (
    <div className="revelar mb-10 flex max-w-3xl flex-col gap-3 md:mb-14">
      <span className="rotulo">{rotulo}</span>
      <h2 className="m-0 font-serif text-[clamp(2.5rem,6.5vw,4.8rem)] font-normal leading-[1.02]">
        {titulo} {destaque && <i className="text-nude">{destaque}</i>}
      </h2>
      {texto && <p className="m-0 mt-1 max-w-[46ch] text-[1.08rem] text-mute md:text-[1.15rem]">{texto}</p>}
    </div>
  )
}
