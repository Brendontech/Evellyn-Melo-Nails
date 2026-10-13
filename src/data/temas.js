// Tema visual e datas comemorativas de cada mês (chave = mês 0 a 11).
// "cena" escolhe a animação do topo do calendário (ver components/effects/SeasonScene.jsx).
// "fechado" bloqueia o dia inteiro na agenda.

export const TEMAS = {
  9: {
    cena: 'halloween',
    cor: '#ff8a3d',
    ceu: 'radial-gradient(circle at 75% 35%, #3a1d0c 0, #140a05 55%, #070605 100%)',
    destaque: { nome: 'Halloween', dia: 31 },
    datas: { 12: 'Dia das Crianças', 31: 'Halloween' },
    fechado: [12],
  },
  10: {
    cena: 'confete',
    cor: '#f2c46d',
    ceu: 'radial-gradient(circle at 30% 20%, #2b2010 0, #0f0b07 60%, #070605 100%)',
    destaque: { nome: 'Black Friday', dia: 27 },
    datas: { 2: 'Finados', 15: 'Proclamação da República', 20: 'Consciência Negra', 27: 'Black Friday' },
    fechado: [2, 15],
  },
  11: {
    cena: 'natal',
    cor: '#ff5a5a',
    ceu: 'radial-gradient(circle at 50% 0, #13233a 0, #0a0f18 55%, #070605 100%)',
    destaque: { nome: 'Natal', dia: 25 },
    datas: { 24: 'Véspera de Natal', 25: 'Natal', 31: 'Réveillon' },
    fechado: [25],
  },
}

// Fallback para meses sem tema configurado.
export const TEMA_PADRAO = {
  cena: 'confete',
  cor: '#e3b57c',
  ceu: 'radial-gradient(circle at 50% 0, #241a10 0, #0f0b07 60%, #070605 100%)',
  destaque: null,
  datas: {},
  fechado: [],
}

export const temaDoMes = (mes) => TEMAS[mes] ?? TEMA_PADRAO
