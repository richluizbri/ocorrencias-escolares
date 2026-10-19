import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { MotionConfig } from 'framer-motion'
import { EMPTY_FILTERS } from './data/constants'
import { useOcorrencias } from './hooks/useOcorrencias'
import { filterItems } from './lib/filters'
import { protocol } from './lib/format'
import { copyText, reportText } from './lib/report'
import Header from './components/Header'
import Metrics from './components/Metrics'
import CategoryBreakdown from './components/CategoryBreakdown'
import Toolbar from './components/Toolbar'
import OcorrenciaList from './components/OcorrenciaList'
import FormModal from './components/FormModal'
import DetailsModal from './components/DetailsModal'
import ReportModal from './components/ReportModal'
import ReportDocument from './components/ReportDocument'
import ConfirmModal from './components/ConfirmModal'
import Toast from './components/Toast'
import Datalists from './components/Datalists'

export default function App() {
  const { items, storageOk, create, update, remove, restore, reset } = useOcorrencias()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const deferredQuery = useDeferredValue(filters.q)
  const [form, setForm] = useState({ open: false, id: null })
  const [viewId, setViewId] = useState(null)
  const [reportId, setReportId] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [toast, setToast] = useState(null)
  const [printing, setPrinting] = useState(null)

  const byId = useCallback(id => items.find(o => o.id === id) ?? null, [items])
  const visible = useMemo(() => filterItems(items, { ...filters, q: deferredQuery }), [items, filters, deferredQuery])

  const notify = useCallback((message, action) => setToast({ id: Date.now(), message, action }), [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), toast.action ? 6000 : 3200)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!storageOk) notify('Este navegador bloqueou o armazenamento local. As alterações valem só até fechar a página.')
  }, [storageOk, notify])

  useEffect(() => {
    if (!printing) return
    const done = () => setPrinting(null)
    window.addEventListener('afterprint', done)
    const timer = setTimeout(() => window.print(), 300)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('afterprint', done)
    }
  }, [printing])

  const openNew = () => setForm({ open: true, id: null })
  const openEdit = id => {
    setViewId(null)
    setForm({ open: true, id })
  }
  const closeForm = () => setForm(f => ({ ...f, open: false }))

  const save = data => {
    if (form.id) {
      update(form.id, data)
      notify('Alterações salvas.')
    } else {
      const created = create(data)
      notify(`Ocorrência ${protocol(created)} registrada.`)
    }
    closeForm()
  }

  const askDelete = id => {
    const o = byId(id)
    if (!o) return
    setConfirm({
      title: 'Excluir esta ocorrência?',
      text: `${protocol(o)} · ${o.student} (${o.className}). O registro sai do livro e dos relatórios.`,
      label: 'Excluir ocorrência',
      onConfirm: () => {
        const removed = remove(id)
        setViewId(null)
        if (!removed) return
        notify(`Ocorrência ${protocol(o)} excluída.`, {
          label: 'Desfazer',
          run: () => {
            restore(removed)
            notify('Exclusão desfeita.')
          }
        })
      }
    })
  }

  const changeStatus = (id, status) => {
    const o = byId(id)
    update(id, { status })
    if (o) notify(`${protocol(o)} agora está como "${status}".`)
  }

  const openReport = id => {
    setViewId(null)
    setReportId(id)
  }

  const printReport = o => {
    setReportId(null)
    setPrinting(o)
  }

  const copyReport = async o => {
    const ok = await copyText(reportText(o))
    notify(ok ? 'Texto do relatório copiado.' : 'Não foi possível copiar automaticamente. Selecione o texto no relatório.')
  }

  const handleAction = (action, id) => {
    if (action === 'view') setViewId(id)
    if (action === 'edit') openEdit(id)
    if (action === 'report') openReport(id)
    if (action === 'delete') askDelete(id)
  }

  const pickMetric = metric => {
    if (metric === 'all') setFilters(EMPTY_FILTERS)
    else if (metric === 'high') setFilters({ ...EMPTY_FILTERS, sev: 'Alta', status: 'open' })
    else setFilters({ ...EMPTY_FILTERS, status: metric })
  }

  const askReset = () =>
    setConfirm({
      title: 'Restaurar dados de exemplo?',
      text: 'Todas as ocorrências atuais serão substituídas pelos 9 registros fictícios de teste.',
      label: 'Restaurar exemplos',
      onConfirm: () => {
        reset()
        notify('Dados de exemplo restaurados.')
      }
    })

  const printRoot = document.getElementById('print-root')

  return (
    <MotionConfig reducedMotion="user">
      <Header onNew={openNew} />

      <main className="wrap py-6 flex flex-col gap-5">
        <Metrics items={items} onPick={pickMetric} />
        <CategoryBreakdown items={items} active={filters.cat} onPick={cat => setFilters(f => ({ ...f, cat }))} />

        <section className="panel overflow-hidden" aria-label="Ocorrências registradas">
          <Toolbar filters={filters} setFilters={setFilters} shown={visible.length} total={items.length} />
          <OcorrenciaList items={visible} onAction={handleAction} onStatus={changeStatus} />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-muted pb-4">
          <p>Os registros ficam salvos neste navegador. Dados iniciais são fictícios, apenas para teste.</p>
          <button type="button" className="btn-text" onClick={askReset}>Restaurar dados de exemplo</button>
        </footer>
      </main>

      <Datalists items={items} />

      <FormModal open={form.open} item={form.id ? byId(form.id) : null} onClose={closeForm} onSave={save} notify={notify} />
      <DetailsModal item={viewId ? byId(viewId) : null} onClose={() => setViewId(null)} onEdit={openEdit} onReport={openReport} onDelete={askDelete} />
      <ReportModal item={reportId ? byId(reportId) : null} onClose={() => setReportId(null)} onPrint={printReport} onCopy={copyReport} />
      <ConfirmModal config={confirm} onClose={() => setConfirm(null)} />
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {printing && printRoot && createPortal(<ReportDocument item={printing} />, printRoot)}
    </MotionConfig>
  )
}
