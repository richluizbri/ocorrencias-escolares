import { SCHOOL } from '../data/constants'
import { fmtFull, protocol } from './format'

export function reportText(o) {
  return [
    `${SCHOOL} · Coordenação Pedagógica`,
    `REGISTRO DE OCORRÊNCIA ESCOLAR · ${protocol(o)}`,
    '',
    `Aluno(a): ${o.student}`,
    `Turma/Série: ${o.className}`,
    `Data e hora: ${fmtFull(o.datetime)}`,
    `Categoria: ${o.category}`,
    `Gravidade: ${o.severity}`,
    `Status: ${o.status}`,
    '',
    'Descrição da ocorrência:',
    o.description,
    '',
    'Ações tomadas pela coordenação:',
    o.actions || '—',
    '',
    'Ciência do responsável: declaro estar ciente do registro acima e das providências adotadas.',
    '',
    'Coordenação Pedagógica: ______________________',
    'Responsável legal: ______________________',
    'Aluno(a): ______________________'
  ].join('\n')
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}
