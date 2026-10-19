import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SCHOOL } from '../data/constants'
import Icon from './Icon'

export default function Header({ onNew }) {
  const today = useMemo(() => {
    const s = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    return s.charAt(0).toUpperCase() + s.slice(1)
  }, [])

  return (
    <header className="band-head">
      <div className="wrap flex flex-wrap items-end justify-between gap-4 py-5">
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <p className="eyebrow">Coordenação Pedagógica · {SCHOOL}</p>
          <h1 className="display text-[28px] sm:text-[32px] mt-1">Livro de Ocorrências</h1>
          <p className="text-muted mt-1">{today}</p>
        </motion.div>
        <motion.button type="button" className="btn btn-primary" onClick={onNew} whileTap={{ scale: 0.97 }}>
          <Icon name="plus" />
          Nova ocorrência
        </motion.button>
      </div>
    </header>
  )
}
