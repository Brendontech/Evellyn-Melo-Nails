import foto from '../assets/images/evellyn.jpg'
import unha from '../assets/images/trabalho-coracoes.jpg'
import { SITE } from '../data/site'
import { useCountUp } from '../hooks/useCountUp'

function Numero({ valor, prefixo = '', sufixo = '', rotulo }) {
  const [ref, n] = useCountUp(valor)
  return (
    <div>
      <b ref={ref} className="foil block font-serif text-[clamp(2.4rem,6vw,3.8rem)] font-normal leading-none">
        {prefixo}
        {n}
        {sufixo}
      </b>
      <span className="font-caps text-[0.58rem] uppercase tracking-[0.14em] text-mute sm:text-[0.66rem] sm:tracking-[0.2em]">{rotulo}</span>
    </div>
  )
}

export default function Sobre() {
  return (
    <section id="sobre" className="relative z-[2] pb-20 lg:pb-36">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        {/* colagem: retrato + unha */}
        <div className="revelar relative mx-auto aspect-[4/5] w-full max-w-[460px]">
          <div className="absolute bottom-[12%] left-0 right-[18%] top-0 overflow-hidden rounded-md border border-hair">
            <img src={foto} alt={SITE.nome} className="h-full w-full object-cover object-[50%_10%] contrast-[1.05] grayscale-[.25]" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-[3/4] w-[52%] overflow-hidden rounded-t-[160px] rounded-b-md border-4 border-ink shadow-[0_30px_60px_-20px_#000] sm:border-[6px]">
            <img src={unha} alt="Francesinha vermelha com corações feita por Evellyn" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="revelar">
          <span className="rotulo">Sobre mim</span>
          <p className="my-6 font-serif text-[clamp(1.7rem,3.4vw,2.5rem)] italic leading-tight">
            <span className="block h-[0.4em] font-serif text-[4rem] not-italic leading-[0.5] text-gold">“</span>
            Cada mão que sai daqui leva uma peça única, feita com tempo e cuidado.
          </p>
          <p className="m-0 max-w-[52ch] font-light text-mute">
            Sou a Evellyn, designer de unhas em Presidente Olegário. Trabalho com alongamento, manutenção e nail art à mão livre. Atendo com hora marcada, material esterilizado e foco total em você.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-hair pt-8 sm:gap-4">
            <Numero valor={SITE.anosProfissao} prefixo="+" rotulo="Anos de profissão" />
            <Numero valor={SITE.totalTecnicas} sufixo="+" rotulo="Técnicas" />
            <div>
              <b className="foil block font-serif text-[clamp(2.4rem,6vw,3.8rem)] font-normal leading-none">1:1</b>
              <span className="font-caps text-[0.58rem] uppercase tracking-[0.14em] text-mute sm:text-[0.66rem] sm:tracking-[0.2em]">Atendimento</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
