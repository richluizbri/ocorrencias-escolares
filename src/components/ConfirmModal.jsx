import { useLatest } from '../hooks/useLatest'
import Modal from './Modal'

export default function ConfirmModal({ config, onClose }) {
  const c = useLatest(config)
  if (!c) return null

  return (
    <Modal
      open={Boolean(config)}
      onClose={onClose}
      title={c.title}
      size="sm"
      hideHeader
      footer={
        <>
          <button type="button" className="btn btn-ghost" data-autofocus onClick={onClose}>Cancelar</button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              onClose()
              c.onConfirm()
            }}
          >
            {c.label}
          </button>
        </>
      }
    >
      <p className="text-muted">{c.text}</p>
    </Modal>
  )
}
