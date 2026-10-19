import { SCHOOL } from '../data/constants'
import { fmtFull, protocol } from '../lib/format'

export default function ReportDocument({ item: o }) {
  const year = String(o.datetime).slice(0, 4)
  return (
    <article className="paper">
      <header className="r-head">
        <div>
          <p className="r-school">{SCHOOL}</p>
          <p className="r-dept">Coordenação Pedagógica</p>
        </div>
        <p className="r-proto"><span>Protocolo</span>{protocol(o)}</p>
      </header>
      <h2 className="r-title">Registro de Ocorrência Escolar</h2>
      <dl className="r-grid">
        <div><dt>Aluno(a)</dt><dd>{o.student}</dd></div>
        <div><dt>Turma/Série</dt><dd>{o.className}</dd></div>
        <div><dt>Data e hora</dt><dd>{fmtFull(o.datetime)}</dd></div>
        <div><dt>Categoria</dt><dd>{o.category}</dd></div>
        <div><dt>Gravidade</dt><dd>{o.severity}</dd></div>
        <div><dt>Status</dt><dd>{o.status}</dd></div>
      </dl>
      <h3>Descrição da ocorrência</h3>
      <div className="r-text">{o.description}</div>
      <h3>Ações tomadas pela coordenação</h3>
      <div className="r-text">{o.actions || '—'}</div>
      <h3>Ciência do responsável</h3>
      <p>Declaro estar ciente do registro acima e das providências adotadas pela Coordenação Pedagógica.</p>
      <div className="r-signs">
        <div>Coordenação Pedagógica</div>
        <div>Responsável legal</div>
        <div>Aluno(a)</div>
      </div>
      <p className="r-place">______________________________, _____ de ____________________ de {year}.</p>
      <footer className="r-foot">
        <span>Emitido em {fmtFull(new Date())}</span>
        <span>Documento de uso interno e comunicação à família</span>
      </footer>
    </article>
  )
}
