import { isOpen, normalize, protocol } from './format'

export function filterItems(items, { q, cat, sev, status }) {
  const term = normalize(q.trim())
  return items
    .filter(o => !term || normalize(`${o.student} ${o.className} ${protocol(o)}`).includes(term))
    .filter(o => !cat || o.category === cat)
    .filter(o => !sev || o.severity === sev)
    .filter(o => !status || (status === 'open' ? isOpen(o) : o.status === status))
    .sort((a, b) => b.datetime.localeCompare(a.datetime))
}

export const hasActiveFilters = f => Boolean(f.q || f.cat || f.sev || f.status)
