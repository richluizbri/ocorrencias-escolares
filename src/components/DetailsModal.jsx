import { useLatest } from '../hooks/useLatest'
import { fmtFull, protocol } from '../lib/format'
import { SeverityBadge, StatusBadge } from './Badges'
import Icon from './Icon'
import Modal from './Modal'

export default function DetailsModal({ item, onClose, onEdit, onReport, onDelete }) {
  const o = useLatest(item)
  if (!o) return null

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      eyebrow={protocol(o)}
      title={o.student}
      footer={
        <>
          <button type="button" className="btn btn-ghost danger" onClick={() => onDelete(o.id)}>
            <Icon name="trash" />Excluir
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onReport(o.id)}>
            <Icon name="print" />Relatório
          </button>
          <button type="button" className="btn btn-primary" data-autofocus onClick={() => onEdit(o.id)}>
            <Icon name="edit" />Editar
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <dl className="detail-grid">
          <div><dt>Turma/Série</dt><dd>{o.className}</dd></div>
          <div><dt>Data e hora</dt><dd className="mono">{fmtFull(o.datetime)}</dd></div>
          <div><dt>Categoria</dt><dd>{o.category}</dd></div>
          <div><dt>Gravidade</dt><dd><SeverityBadge value={o.severity} /></dd></div>
          <div><dt>Status</dt><dd><StatusBadge value={o.status} /></dd></div>
          <div><dt>Última atualização</dt><dd className="mono">{fmtFull(o.updatedAt)}</dd></div>
        </dl>
        <div>
          <p className="field-label">Descrição detalhada</p>
          <div className="prose-block">{o.description}</div>
        </div>
        <div>
          <p className="field-label">Ações tomadas pela coordenação</p>
          <div className="prose-block">
            {o.actions || <span className="text-muted">Nenhuma ação registrada ainda.</span>}
          </div>
        </div>
      </div>
    </Modal>
  )
}
