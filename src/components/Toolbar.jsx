import { CATEGORIES, EMPTY_FILTERS, SEVERITIES, STATUSES } from '../data/constants'
import { hasActiveFilters } from '../lib/filters'
import { plural } from '../lib/format'
import Icon from './Icon'

export default function Toolbar({ filters, setFilters, shown, total }) {
  const set = key => e => setFilters(f => ({ ...f, [key]: e.target.value }))
  const active = hasActiveFilters(filters)

  return (
    <div className="flex flex-col gap-3 p-4 border-b border-line">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-[10px] text-muted pointer-events-none" />
          <input
            id="busca"
            className="input pl-[38px]"
            type="search"
            placeholder="Buscar por aluno, turma ou protocolo"
            autoComplete="off"
            aria-label="Buscar"
            value={filters.q}
            onChange={set('q')}
          />
        </div>
        <select id="filtro-categoria" className="input" aria-label="Filtrar por categoria" value={filters.cat} onChange={set('cat')}>
          <option value="">Todas as categorias</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select id="filtro-gravidade" className="input" aria-label="Filtrar por gravidade" value={filters.sev} onChange={set('sev')}>
          <option value="">Todas as gravidades</option>
          {SEVERITIES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select id="filtro-status" className="input" aria-label="Filtrar por status" value={filters.status} onChange={set('status')}>
          <option value="">Todos os status</option>
          <option value="open">Em aberto (pendente + andamento)</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 min-h-[20px]">
        <p className="text-muted text-[13px]">
          {active
            ? `Mostrando ${shown} de ${plural(total, 'ocorrência', 'ocorrências')}`
            : plural(total, 'ocorrência registrada', 'ocorrências registradas')}
        </p>
        {active && (
          <button type="button" className="btn-text text-[13px]" onClick={() => setFilters(EMPTY_FILTERS)}>
            Limpar busca e filtros
          </button>
        )}
      </div>
    </div>
  )
}
