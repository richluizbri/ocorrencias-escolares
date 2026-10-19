# Livro de Ocorrências

Sistema de gestão de ocorrências escolares para a Coordenação Pedagógica.
React 18 + Vite + Tailwind CSS + Framer Motion. Os dados ficam no `localStorage` do navegador.

## Como rodar (Windows / PowerShell)

Pré-requisito: Node.js 18 ou superior (`node -v` para conferir).

```powershell
cd ocorrencias-escolares
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Gerar versão para publicar

```powershell
npm run build
npm run preview
```

A pasta `dist/` gerada pode ser hospedada em qualquer servidor estático (Netlify, Vercel, GitHub Pages, servidor da escola).

## Estrutura

```
src/
├── App.jsx                     estado da tela, modais e ações
├── main.jsx                    ponto de entrada
├── index.css                   paleta (variáveis CSS), componentes e estilos de impressão
├── data/
│   ├── constants.js            nome da escola, categorias, gravidades, status
│   └── seed.js                 ocorrências fictícias de exemplo
├── hooks/
│   ├── useOcorrencias.js       CRUD + persistência
│   └── useLatest.js            mantém o conteúdo do modal durante a animação de saída
├── lib/
│   ├── format.js               datas, protocolo, utilitários
│   ├── filters.js              busca e filtros
│   ├── report.js               texto do relatório e cópia
│   └── storage.js              leitura e gravação no localStorage
└── components/
    ├── Header.jsx
    ├── Metrics.jsx             cards de indicadores (clicáveis, filtram a lista)
    ├── AnimatedNumber.jsx
    ├── Toolbar.jsx             busca e filtros
    ├── OcorrenciaList.jsx      tabela (desktop) e cards (celular)
    ├── Badges.jsx              gravidade, status e troca rápida de status
    ├── Modal.jsx               modal animado reutilizável
    ├── FormModal.jsx           cadastro e edição
    ├── DetailsModal.jsx
    ├── ConfirmModal.jsx
    ├── ReportModal.jsx
    ├── ReportDocument.jsx      documento A4 para assinatura
    ├── Toast.jsx
    ├── Datalists.jsx           sugestões de alunos e turmas no formulário
    └── Icon.jsx
```

## Adaptar para a escola

- Nome da escola, categorias, gravidades e status: `src/data/constants.js`.
- Começar sem dados de exemplo: faça `createSeed()` em `src/data/seed.js` retornar `[]`.
- Cores: variáveis no topo de `src/index.css` (tema claro e escuro).
- Trocar o `localStorage` por uma API: altere apenas `src/lib/storage.js` e `src/hooks/useOcorrencias.js`.

## Impressão

O botão **Imprimir / Salvar PDF** abre o diálogo do navegador com o relatório em A4.
Escolha a impressora ou "Salvar como PDF".
