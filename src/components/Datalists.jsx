import { useMemo } from 'react'

export default function Datalists({ items }) {
  const unique = key => [...new Set(items.map(o => o[key]))].sort((a, b) => a.localeCompare(b, 'pt-BR'))
  const students = useMemo(() => unique('student'), [items])
  const classes = useMemo(() => unique('className'), [items])

  return (
    <>
      <datalist id="dl-students">
        {students.map(s => <option key={s} value={s} />)}
      </datalist>
      <datalist id="dl-classes">
        {classes.map(c => <option key={c} value={c} />)}
      </datalist>
    </>
  )
}
