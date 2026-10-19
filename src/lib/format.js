const pad = n => String(n).padStart(2, '0')

export const toLocalInput = d =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`

export const nowLocal = () => toLocalInput(new Date())

export const fmtDate = v => {
  const d = new Date(v)
  return isNaN(d) ? '—' : d.toLocaleDateString('pt-BR')
}

export const fmtTime = v => {
  const d = new Date(v)
  return isNaN(d) ? '' : d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export const fmtFull = v => `${fmtDate(v)} às ${fmtTime(v)}`

export const protocol = o => `OC-${String(o.datetime).slice(0, 4)}-${String(o.seq).padStart(4, '0')}`

export const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 10)

export const normalize = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

export const isOpen = o => o.status !== 'Resolvido'

export const canPrint = (() => {
  try {
    return window.self === window.top
  } catch {
    return false
  }
})()
