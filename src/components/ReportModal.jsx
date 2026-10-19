import { useLatest } from '../hooks/useLatest'
import { canPrint } from '../lib/format'
import Icon from './Icon'
import Modal from './Modal'
import ReportDocument from './ReportDocument'

export default function ReportModal({ item, onClose, onPrint, onCopy }) {
  const o = useLatest(item)
  if (!o) return null

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      eyebrow="Relatório individual"
      title="Documento para assinatura"
      size="lg"
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={() => onCopy(o)}>
            <Icon name="copy" />Copiar texto
          </button>
          {canPrint && (
            <button type="button" className="btn btn-primary" data-autofocus onClick={() => onPrint(o)}>
              <Icon name="print" />Imprimir / Salvar PDF
            </button>
          )}
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <p className="text-muted text-[13px]">
          {canPrint
            ? 'Use "Imprimir / Salvar PDF" e escolha a impressora ou a opção Salvar como PDF.'
            : 'Esta visualização não permite imprimir. Rode o projeto no seu computador para imprimir ou salvar em PDF, ou copie o texto do relatório.'}
        </p>
        <div className="paper-wrap">
          <ReportDocument item={o} />
        </div>
      </div>
    </Modal>
  )
}
