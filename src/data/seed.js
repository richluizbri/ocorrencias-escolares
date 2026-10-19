import { uid } from '../lib/format'

const ROWS = [
  ['Mariana Lopes Ferreira', '8º ano B', '2026-10-05T09:40', 'Disciplinar', 'Média', 'Uso de celular durante a avaliação bimestral de Matemática, após duas advertências verbais do professor Ricardo.', 'Celular recolhido e devolvido ao final do turno. Registro comunicado aos responsáveis pela agenda escolar.', 'Resolvido'],
  ['Rafael Nogueira Santos', '1º EM A', '2026-10-16T10:15', 'Disciplinar', 'Alta', 'Discussão com colega durante o intervalo que evoluiu para empurrões próximos à cantina. Inspetora Carla interveio.', 'Alunos separados e ouvidos individualmente. Responsáveis convocados para reunião em 21/10 às 8h.', 'Em Andamento'],
  ['Beatriz Carvalho Menezes', '6º ano A', '2026-10-09T14:00', 'Acadêmica', 'Média', 'Queda de rendimento em Língua Portuguesa (4,5) e Ciências (5,0) no 3º bimestre, segundo conselho de classe.', 'Encaminhada ao reforço escolar às terças. Plano de estudos combinado com os professores das duas disciplinas.', 'Em Andamento'],
  ['Pedro Henrique Almeida', '9º ano C', '2026-10-14T16:30', 'Reunião com Pais', 'Baixa', 'Reunião com a mãe para orientar a escolha do itinerário formativo do Ensino Médio.', 'Apresentados os itinerários disponíveis. Família retornará com a decisão até 30/10.', 'Pendente'],
  ['Lívia Tavares Rocha', '3º EM B', '2026-10-02T11:20', 'Elogio/Destaque', 'Baixa', 'Medalha de prata na Olimpíada Brasileira de Astronomia e Astronáutica (OBA).', 'Reconhecimento no mural da escola e comunicado de parabéns enviado à família.', 'Resolvido'],
  ['Gustavo Ribeiro Lima', '7º ano A', '2026-10-13T09:05', 'Atendimento Médico/Psicopedagógico', 'Média', 'Aluno relatou dor de cabeça e tontura durante a aula de Educação Física.', 'Acompanhado à enfermaria. Responsável contatado por telefone e buscou o aluno às 10h40.', 'Resolvido'],
  ['Ana Clara Souza Pinto', '5º ano A', '2026-10-15T13:50', 'Atendimento Médico/Psicopedagógico', 'Média', 'Professora regente relatou dificuldade persistente de concentração e de leitura em voz alta.', 'Agendada avaliação com a psicopedagoga da escola. Família informada e de acordo.', 'Pendente'],
  ['João Vitor Mendes', '2º EM A', '2026-10-17T15:10', 'Disciplinar', 'Alta', 'Pichação na parede do banheiro masculino do 2º andar, identificada pelas câmeras do corredor.', 'Aluno ouvido pela coordenação. Responsáveis notificados. Aguardando reunião para definir a medida reparadora.', 'Pendente'],
  ['Sofia Martins Duarte', '8º ano B', '2026-10-18T08:30', 'Acadêmica', 'Baixa', 'Três trabalhos de História não entregues no prazo do bimestre.', 'Conversa com a aluna. Novo prazo combinado até 24/10.', 'Em Andamento']
]

export function createSeed() {
  return ROWS.map(([student, className, datetime, category, severity, description, actions, status], i) => ({
    id: uid(),
    seq: i + 1,
    student,
    className,
    datetime,
    category,
    severity,
    description,
    actions,
    status,
    updatedAt: datetime
  }))
}
