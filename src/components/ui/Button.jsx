/**
 * Botão do site. Vira <a> quando recebe `href`.
 * variante: 'primario' (champanhe com seta) | 'secundario' (contorno)
 */
// nomes literais para o Tailwind encontrar as classes no build
const VARIANTES = { primario: 'btn-primario', secundario: 'btn-secundario' }

export default function Button({ variante = 'primario', href, children, seta = variante === 'primario', className = '', ...props }) {
  const Tag = href ? 'a' : 'button'
  const extra = href ? { href } : { type: props.type ?? 'button' }
  return (
    <Tag className={`${VARIANTES[variante]} ${className}`} {...extra} {...props}>
      <span>{children}</span>
      {seta && (
        <span className="btn-seta" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </Tag>
  )
}
