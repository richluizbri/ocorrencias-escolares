import { useEffect, useState } from 'react'
import { CATEGORIES, SEVERITIES, SEVERITY_TONE, STATUSES, STATUS_TONE } from '../data/constants'
import { nowLocal, protocol } from '../lib/format'
import Modal from './Modal'

const blank = () => ({
  student: '',
  className: '',
  datetime: nowLocal(),
  category: CATEGORIES[0],
  severity: 'Baixa',
  description: '',
  actions: '',
  status: 'Pendente'
})

const REQUIRED = [
  ['student', 'f-student', 'o nome do aluno'],
  ['className', 'f-class', 'a turma'],
  ['datetime', 'f-datetime', 'a data e hora'],
  ['description', 'f-desc', 'a descrição']
]

function Segmented({ name, options, value, onChange, tones }) {
  return (
    <div className="seg" role="radiogroup">
      {options.map((opt, i) => (
        <label key={opt} className={`seg-option ${value === opt ? 'checked' : ''}`}>
          <input
            type="radio"
            id={`${name}-${i}`}
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span className={`dot tone-${tones[opt]}`} />
          {opt}
        </label>
      ))}
    </div>
  )
}

export default function FormModal({ open, item, onClose, onSave, notify }) {
  const [values, setValues] = useState(blank)

  useEffect(() => {
    if (open) setValues(item ? { ...item } : blank())
  }, [open, item])

  const set = key => e => setValues(v => ({ ...v, [key]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    const data = {
      student: values.student.trim(),
      className: values.className.trim(),
      datetime: values.datetime,
      category: values.category,
      severity: values.severity,
      description: values.description.trim(),
      actions: values.actions.trim(),
      status: values.status
    }
    const missing = REQUIRED.find(([key]) => !data[key])
    if (missing) {
      notify(`Preencha ${missing[2]} para salvar.`)
      document.getElementById(missing[1])?.focus()
      return
    }
    onSave(data)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={item ? protocol(item) : 'Novo registro'}
      title={item ? 'Editar ocorrência' : 'Nova ocorrência'}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" form="ocorrencia-form" className="btn btn-primary">
            {item ? 'Salvar alterações' : 'Registrar ocorrência'}
          </button>
        </>
      }
    >
      <form id="ocorrencia-form" className="grid gap-4 sm:grid-cols-2" onSubmit={submit} noValidate>
        <div>
          <label className="field-label" htmlFor="f-student">Nome do aluno</label>
          <input id="f-student" data-autofocus className="input" list="dl-students" autoComplete="off" value={values.student} onChange={set('student')} />
        </div>
        <div>
          <label className="field-label" htmlFor="f-class">Turma/Série</label>
          <input id="f-class" className="input" list="dl-classes" placeholder="Ex.: 8º ano B" autoComplete="off" value={values.className} onChange={set('className')} />
        </div>
        <div>
          <label className="field-label" htmlFor="f-datetime">Data e hora</label>
          <div className="flex gap-2">
            <input id="f-datetime" className="input mono" type="datetime-local" value={values.datetime} onChange={set('datetime')} />
            <button type="button" className="btn btn-ghost" onClick={() => setValues(v => ({ ...v, datetime: nowLocal() }))}>Agora</button>
          </div>
          <p className="field-hint">Preenchida automaticamente. Ajuste se o fato ocorreu em outro horário.</p>
        </div>
        <div>
          <label className="field-label" htmlFor="f-category">Categoria</label>
          <select id="f-category" className="input" value={values.category} onChange={set('category')}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="field-label">Nível de gravidade</legend>
          <Segmented name="f-sev" options={SEVERITIES} value={values.severity} onChange={v => setValues(s => ({ ...s, severity: v }))} tones={SEVERITY_TONE} />
        </fieldset>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="f-desc">Descrição detalhada</label>
          <textarea id="f-desc" className="input" rows={4} placeholder="O que aconteceu, onde, quem estava envolvido e quem relatou." value={values.description} onChange={set('description')} />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="f-actions">Ações tomadas pela coordenação</label>
          <textarea id="f-actions" className="input" rows={3} placeholder="Encaminhamentos, contato com a família, prazos combinados." value={values.actions} onChange={set('actions')} />
        </div>
        <fieldset className="sm:col-span-2">
          <legend className="field-label">Status</legend>
          <Segmented name="f-status" options={STATUSES} value={values.status} onChange={v => setValues(s => ({ ...s, status: v }))} tones={STATUS_TONE} />
        </fieldset>
      </form>
    </Modal>
  )
}
