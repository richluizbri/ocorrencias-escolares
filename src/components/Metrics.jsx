import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import Icon from './Icon'
import { isOpen } from '../lib/format'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const Swatch = ({ color }) => <span className="inline-block w-2 h-2 rounded-[2px]" style={{ background: color }} />

const tileAnim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function Metrics({ items, onPick }) {
  const total = items.length
  const count = s => items.filter(o => o.status === s).length
  const pending = count('Pendente')
  const progress = count('Em Andamento')
  const done = count('Resolvido')
  const highOpen = items.filter(o => o.severity === 'Alta' && isOpen(o)).length
  const pct = n => (total ? (n / total) * 100 : 0)
  const bar = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }

  return (
    <motion.section
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      aria-label="Indicadores"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.button type="button" className="tile" variants={tileAnim} onClick={() => onPick('all')}>
        <span className="tile-label">Total registrado</span>
        <AnimatedNumber value={total} className="tile-num" />
        <span className="stack" aria-hidden="true">
          <motion.span style={{ background: 'var(--bar-1)' }} initial={{ width: 0 }} animate={{ width: `${pct(pending)}%` }} transition={bar} />
          <motion.span style={{ background: 'var(--bar-2)' }} initial={{ width: 0 }} animate={{ width: `${pct(progress)}%` }} transition={bar} />
          <motion.span style={{ background: 'var(--bar-3)' }} initial={{ width: 0 }} animate={{ width: `${pct(done)}%` }} transition={bar} />
        </span>
        <span className="legend">
          <span className="inline-flex items-center gap-1.5"><Swatch color="var(--bar-1)" />{pending} pendentes</span>
          <span className="inline-flex items-center gap-1.5"><Swatch color="var(--bar-2)" />{progress} em andamento</span>
          <span className="inline-flex items-center gap-1.5"><Swatch color="var(--bar-3)" />{done} resolvidas</span>
        </span>
      </motion.button>

      <motion.button type="button" className="tile" variants={tileAnim} onClick={() => onPick('Pendente')}>
        <span className="tile-label"><span className="dot tone-pending" />Pendentes</span>
        <AnimatedNumber value={pending} className="tile-num" />
        <span className="tile-hint">aguardando primeira ação</span>
      </motion.button>

      <motion.button type="button" className="tile" variants={tileAnim} onClick={() => onPick('Resolvido')}>
        <span className="tile-label"><span className="dot tone-done" />Resolvidas</span>
        <AnimatedNumber value={done} className="tile-num" />
        <span className="tile-hint">{Math.round(pct(done))}% do total · {done} de {total}</span>
      </motion.button>

      <motion.button
        type="button"
        className={`tile ${highOpen ? 'alert-on' : ''}`}
        variants={tileAnim}
        onClick={() => onPick('high')}
      >
        <span className="tile-label">
          {highOpen > 0 ? <Icon name="alert" size={15} /> : <span className="dot tone-low" />}
          Gravidade alta em aberto
        </span>
        <AnimatedNumber value={highOpen} className="tile-num" />
        <span className="tile-hint">{highOpen ? 'exigem acompanhamento prioritário' : 'nenhum caso grave em aberto'}</span>
      </motion.button>
    </motion.section>
  )
}
