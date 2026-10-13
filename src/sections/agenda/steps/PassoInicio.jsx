/** Estado inicial do painel: convida a escolher o dia no calendário. */
export default function PassoInicio() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center lg:min-h-[400px]">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 120 120" className="h-full w-full animate-girar" aria-hidden="true">
          <defs>
            <path id="circulo-inicio" d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
          </defs>
          <text className="fill-gold-light font-caps" style={{ fontSize: 9.6, letterSpacing: 3 }}>
            <textPath href="#circulo-inicio">ESCOLHA O DIA · ESCOLHA O DIA · </textPath>
          </text>
        </svg>
        <b className="absolute inset-0 grid place-items-center font-serif text-[2.2rem] font-normal italic text-gold-pale">1</b>
      </div>
      <h3 className="m-0 font-serif text-[clamp(1.9rem,4vw,2.4rem)] font-normal">
        Comece pelo <i className="text-nude">dia</i>
      </h3>
      <p className="m-0 max-w-[30ch] text-mute">Toque em um dia claro no calendário. Os dias apagados já estão sem horário.</p>
    </div>
  )
}
