import { SEVERITY_TONE, STATUSES, STATUS_TONE } from '../data/constants'

export function SeverityBadge({ value }) {
  const tone = SEVERITY_TONE[value]
  return (
    <span className={`badge ${tone === 'high' ? 'is-high' : ''}`}>
      <span className={`dot tone-${tone}`} />
      {value}
    </span>
  )
}

export function StatusBadge({ value }) {
  return (
    <span className="badge">
      <span className={`dot tone-${STATUS_TONE[value]}`} />
      {value}
    </span>
  )
}

export function StatusSelect({ item, onChange, idPrefix }) {
  return (
    <span className="status-wrap">
      <span className={`dot tone-${STATUS_TONE[item.status]}`} />
      <select
        id={`${idPrefix}-${item.id}`}
        className="status-select"
        value={item.status}
        onChange={e => onChange(item.id, e.target.value)}
        aria-label={`Alterar status de ${item.student}`}
      >
        {STATUSES.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </span>
  )
}
