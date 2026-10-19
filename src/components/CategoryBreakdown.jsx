import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/constants'

export default function CategoryBreakdown({ items, active, onPick }) {
  const counts = CATEGORIES.map(c => ({ name: c, count: items.filter(o => o.category === c).length }))
  const max = Math.max(1, ...counts.map(c => c.count))

  return (
    <section className="panel p-4 flex flex-col gap-3" aria-label="Motivos das ocorrências">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[15px] font-semibold">Motivos das ocorrências</h2>
        <p className="text-muted text-[12.5px]">Clique em um motivo para ver só esses registros</p>
      </div>
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-5">
        {counts.map(({ name, count }, i) => (
          <button
            key={name}
            type="button"
            className={`cat-item ${active === name ? 'active' : ''}`}
            onClick={() => onPick(active === name ? '' : name)}
            aria-pressed={active === name}
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-medium leading-snug">{name}</span>
              <span className="mono text-[15px] font-semibold">{count}</span>
            </span>
            <span className="cat-bar" aria-hidden="true">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${(count / max) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
