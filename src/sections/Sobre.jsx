import foto from '../assets/images/evellyn.jpg'
import unha from '../assets/images/trabalho-coracoes.jpg'
import { SITE } from '../data/site'
import { useCountUp } from '../hooks/useCountUp'

/* Números em Nunito Sans (algarismos retos, o "1" não parece "l") e rótulos sempre em duas linhas, para alinhar as três colunas. */
const NUMERO = 'foil block font-sans text-[clamp(2.4rem,7vw,3.6rem)] font-semibold leading-none tabular-nums tracking-tight'
const ROTULO = 'mt-3 block font-caps text-[0.76rem] uppercase leading-snug tracking-[0.08em] text-mute sm:text-[0.84rem] sm:tracking-[0.12em]'

function Numero({ valor, prefixo = '', sufixo = '', linha1, linha2 }) {
  const [ref, n] = useCountUp(valor)
  return (
    <div>
      <b ref={ref} className={NUMERO}>
        {prefixo}
        {n}
        {sufixo}
      </b>
      <span className={ROTULO}>
        {linha1}
        <br />
        {linha2}
      </span>
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
          <p className="my-6 font-accent text-[clamp(1.7rem,3.4vw,2.5rem)] italic leading-tight">
            <span className="block h-[0.4em] font-accent text-[4rem] not-italic leading-[0.5] text-gold">“</span>
            Cada mão que sai daqui leva uma peça única, feita com tempo e cuidado.
          </p>
          <p className="m-0 max-w-[52ch] text-mute">
            Sou a Evellyn, designer de unhas em Presidente Olegário. Trabalho com alongamento, manutenção e nail art à mão livre. Atendo com hora marcada, material esterilizado e foco total em você.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-hair pt-8 sm:gap-4">
            <Numero valor={SITE.anosProfissao} prefixo="+" linha1="Anos de" linha2="profissão" />
            <Numero valor={SITE.totalTecnicas} sufixo="+" linha1="Técnicas" linha2="avançadas" />
            <div>
              <b className={NUMERO}>1 a 1</b>
              <span className={ROTULO}>
                Atendimento
                <br />
                exclusivo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
