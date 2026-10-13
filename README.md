# Evellyn Melo · Univers Nails

Site de portfólio e agendamento online da Evellyn Melo, designer de unhas em Presidente Olegário – MG.

**Stack:** React 18 · Vite 7 · Tailwind CSS 4 (plugin `@tailwindcss/vite`, tema definido em `src/styles/index.css`)

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist pronto para publicar
npm run preview   # serve o /dist localmente
```

## Estrutura

```
├── index.html                  # HTML base (meta tags, fontes)
├── public/
│   └── favicon.png
└── src/
    ├── main.jsx                # ponto de entrada
    ├── App.jsx                 # monta as seções na ordem da página
    ├── assets/
    │   ├── brand/              # logo oficial (logo.png) e monograma recortado do logo
    │   └── images/             # foto da Evellyn e fotos dos trabalhos
    ├── components/
    │   ├── layout/             # Intro, Header, MobileMenu, Footer, MobileDock
    │   ├── ui/                 # Button, Logo, SectionHeading, Toast
    │   └── effects/            # GoldDust (pó de ouro), SeasonScene (cena do mês)
    ├── sections/
    │   ├── Hero.jsx
    │   ├── Marquee.jsx
    │   ├── Portfolio.jsx
    │   ├── Procedimentos.jsx
    │   ├── Sobre.jsx
    │   └── agenda/
    │       ├── Agenda.jsx      # orquestra o fluxo de agendamento
    │       ├── Calendario.jsx  # calendário com swipe entre meses
    │       └── steps/          # um componente por passo + Progresso e Resumo
    ├── data/                   # ⚙ conteúdo editável (sem mexer em componente)
    │   ├── site.js             # contato, PIX, horários, meses liberados, regra do sinal
    │   ├── procedimentos.js    # técnicas, preços e durações
    │   ├── portfolio.js        # fotos e legendas do portfólio
    │   └── temas.js            # cena, cor e datas comemorativas de cada mês
    ├── lib/                    # funções puras (datas, formatação, link Google Agenda)
    ├── hooks/                  # useReveal, useCountUp, useMediaQuery
    ├── services/
    │   └── agendaService.js    # camada de dados da agenda (hoje em modo demonstração)
    └── styles/
        └── index.css           # tema Tailwind (@theme), componentes e animações globais
```

## O que editar para a cliente

| Quero mudar… | Arquivo |
|---|---|
| WhatsApp, chave PIX, anos de profissão | `src/data/site.js` |
| Horários de atendimento / dias fechados | `src/data/site.js` |
| Meses abertos na agenda e mês com sinal | `src/data/site.js` (`MESES_AGENDA`, `SINAL_PIX`) |
| Preços e procedimentos | `src/data/procedimentos.js` |
| Fotos do portfólio | `src/assets/images` + `src/data/portfolio.js` |
| Datas comemorativas e feriados | `src/data/temas.js` |
| Logo | substituir `src/assets/brand/logo.png` (e `monograma.png`) mantendo o nome |

Valores marcados com `[EXEMPLO]` nos arquivos de dados ainda precisam ser confirmados com a Evellyn.

## Regras do agendamento

1. Dia → 2. Horário → 3. Procedimento → 4. Nome e WhatsApp → confirmação
2. Nos meses listados em `SINAL_PIX.meses` (dezembro), entra o passo **5: sinal de 50% via PIX** antes da confirmação.
3. Domingos, feriados (`fechado` em `temas.js`) e dias sem horário livre ficam bloqueados.

## Modo demonstração → produção

`src/services/agendaService.js` simula os horários ocupados e o envio. Para produção, trocar as funções por chamadas ao backend:

- **Disponibilidade e registro na agenda da Evellyn:** Google Calendar API (ler ocupados / criar evento).
- **Lembrete no WhatsApp 1 dia antes:** job diário (cron) disparando via Evolution API / Z-API ou API oficial do WhatsApp Business.
- **Sinal PIX em dezembro:** Mercado Pago ou Efí (gera QR Code e confirma pagamento por webhook).

## Publicar

`vite.config.js` usa `base: './'`, então o `/dist` funciona em qualquer host:

- **Vercel / Netlify:** importar o repositório; build `npm run build`, pasta `dist`.
- **GitHub Pages:** publicar a pasta `dist` (ex.: action `peaceiris/actions-gh-pages`).
- **Hospedagem comum (Hostinger etc.):** enviar o conteúdo de `dist/` para `public_html`.
