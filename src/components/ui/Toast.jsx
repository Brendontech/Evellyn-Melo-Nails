import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('')
  const [visivel, setVisivel] = useState(false)
  const timer = useRef()

  const mostrar = useCallback((texto) => {
    setMsg(texto)
    setVisivel(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisivel(false), 2200)
  }, [])

  return (
    <ToastContext.Provider value={mostrar}>
      {children}
      <div
        role="status"
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-gold-light px-6 py-3 font-semibold text-ink transition-all duration-300 ${
          visivel ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {msg}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
