import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SEVERITY_TONE } from '../data/constants'
import { fmtDate, fmtTime, protocol } from '../lib/format'
import { SeverityBadge, StatusSelect } from './Badges'
import Icon from './Icon'

const rowMotion = {
  layout: 'position',
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -16, transition: { duration: 0.18 } },
  transition: { duration: 0.25, ease: 'easeOut' }
}

function Actions({ item, onAction }) {
  const btn = (action, icon, label, extra = '') => (
    <motion.button
      type="button"
      className={`icon-btn ${extra}`}
      onClick={() => onAction(action, item.id)}
      title={label}
      aria-label={`${label}: ${item.student}`}
      whileTap={{ scale: 0.9 }}
    >
      <Icon name={icon} />
    </motion.button>
  )
  return (
    <div className="flex items-center gap-0.5 justify-end">
      {btn('view', 'eye', 'Ver detalhes')}
      {btn('edit', 'edit', 'Editar')}
      {btn('report', 'print', 'Relatório')}
      {btn('delete', 'trash', 'Excluir', 'danger')}
    </div>
  )
}

function Motivo({ item, open, onToggle }) {
  return (
    <div className="min-w-0">
      <p className="motivo-cat">{item.category}</p>
      <p className={`motivo-text ${open ? '' : 'clamp-2'}`}>{item.description}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="motivo-extra">
              <p className="motivo-cat">Ações tomadas</p>
              <p className="motivo-text">
                {item.actions || <span className="text-muted">Nenhuma ação registrada ainda.</span>}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" className="motivo-toggle" onClick={() => onToggle(item.id)} aria-expanded={open}>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
          <Icon name="chevron" size={14} />
        </motion.span>
        {open ? 'Recolher' : 'Ver completo e ações tomadas'}
      </button>
    </div>
  )
}

export default function OcorrenciaList({ items, onAction, onStatus }) {
  const [openIds, setOpenIds] = useState(() => new Set())
  const toggle = id =>
    setOpenIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const allOpen = items.length > 0 && items.every(o => openIds.has(o.id))
  const toggleAll = () => setOpenIds(allOpen ? new Set() : new Set(items.map(o => o.id)))

  return (
    <>
      {items.length > 0 && (
        <div className="flex justify-end px-4 pt-3">
          <button type="button" className="motivo-toggle" onClick={toggleAll}>
            {allOpen ? 'Recolher todos os motivos' : 'Expandir todos os motivos'}
          </button>
        </div>
      )}

      <div className="hidden md:block overflow-x-auto">
        <table className="grid-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Aluno · Turma</th>
              <th className="w-[38%]">Motivo</th>
              <th>Gravidade</th>
              <th>Status</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {items.map(o => (
                <motion.tr key={o.id} {...rowMotion} className={`row-${SEVERITY_TONE[o.severity]} align-top`}>
                  <td className="stripe align-top">
                    <div className="mono whitespace-nowrap">{fmtDate(o.datetime)}</div>
                    <div className="mono text-[12px] text-muted whitespace-nowrap">{fmtTime(o.datetime)} · {protocol(o)}</div>
                  </td>
                  <td className="align-top">
                    <button type="button" className="link-name" onClick={() => onAction('view', o.id)}>
                      {o.student}
                    </button>
                    <div className="text-muted text-[13px]">{o.className}</div>
                  </td>
                  <td className="align-top min-w-[260px]">
                    <Motivo item={o} open={openIds.has(o.id)} onToggle={toggle} />
                  </td>
                  <td className="align-top"><SeverityBadge value={o.severity} /></td>
                  <td className="align-top"><StatusSelect item={o} onChange={onStatus} idPrefix="st-t" /></td>
                  <td className="align-top"><Actions item={o} onAction={onAction} /></td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {items.map(o => (
            <motion.article key={o.id} {...rowMotion} className={`card-item stripe row-${SEVERITY_TONE[o.severity]}`}>
              <div className="flex justify-between gap-2 mono text-[12px] text-muted">
                <span>{protocol(o)}</span>
                <span>{fmtDate(o.datetime)} {fmtTime(o.datetime)}</span>
              </div>
              <div>
                <button type="button" className="link-name text-[15px]" onClick={() => onAction('view', o.id)}>
                  {o.student}
                </button>
                <div className="text-muted text-[13px]">{o.className}</div>
              </div>
              <Motivo item={o} open={openIds.has(o.id)} onToggle={toggle} />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityBadge value={o.severity} />
                  <StatusSelect item={o} onChange={onStatus} idPrefix="st-c" />
                </div>
                <Actions item={o} onAction={onAction} />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            className="p-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-semibold">Nenhuma ocorrência encontrada.</p>
            <p className="text-muted mt-1">Ajuste a busca ou os filtros, ou registre uma nova ocorrência.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
