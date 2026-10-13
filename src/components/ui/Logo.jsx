import logo from '../../assets/brand/logo.png'
import monograma from '../../assets/brand/monograma.png'

/**
 * Logo oficial da cliente (arquivo original, sem alterações de desenho).
 * tipo 'completo' = Evellyn Melo + UN + Univers Nails | 'monograma' = coroa + UN
 * brilho = faixa de luz passando por cima, recortada no formato do próprio logo.
 */
export default function Logo({ tipo = 'completo', brilho = false, className = '', alt = 'Evellyn Melo · Univers Nails' }) {
  const src = tipo === 'monograma' ? monograma : logo
  const img = <img src={src} alt={alt} className={`block h-auto ${brilho || !className ? 'w-full' : className}`} draggable="false" />
  if (!brilho) return img
  return (
    <span className={`logo-brilho ${className}`} style={{ '--logo': `url(${src})` }}>
      {img}
    </span>
  )
}
