# DESIGN.md — Portfólio Técnico Gabriel Chaves (`gccavalcante`)

```design-tokens
fonts: Syne, Space Grotesk, Plus Jakarta Sans, Inter, Source Sans 3, JetBrains Mono, IBM Plex Mono
colors: #F5F4F0, #ECEAE3, #141413, #575652, #1D4ED8, #DCDAD3, #161618, #FAF8F5, #F1EFEA, #111312, #4B524E, #047857, #D8D5CD, #0E0E10, #151518, #ECECEF, #9A9AA2, #D97706, #26262B
radii: 0, 4px, 8px
```

## 1. Verdade do produto
- **Quem usa:** Tech Recruiters, Tech Leads, Engenheiros Sênior e Coordenadores de Dados avaliando candidatos para vagas de **Desenvolvedor Full-Stack / Back-end Júnior** ou **Analista de Dados Júnior**.
- **O que o produto faz por essa pessoa:** Apresenta em menos de 30 segundos a experiência prática real de Gabriel Chaves (Residência TIC no **Editais.GOV / Prefeitura de Niterói**, API REST **SIRH** em TypeScript/Clean Architecture, **NexusTech Store** em React 19 e formação estruturada em **SQL, Python e Power BI**), com acesso direto a repositórios, diagramas de arquitetura, schema SQL real e currículo em PDF.
- **Restrições:** Zero dados inventados; zero clichês visuais de IA (sem eyebrow em toda seção, sem ponto colorido no fim de títulos, sem chip piscando, sem roxo padrão, sem cards com borda lateral pintada); performance imediata e deploy direto em GitHub + Vercel.
- **Material real disponível:**
  - Currículo oficial em PDF (`curriculo-gabriel-chaves.pdf`).
  - Repositório e schema SQL real do **SIRH** (`github.com/gccavalcante/projeto-integrador`, `gestaorh.sql`).
  - Experiência real em produção/residência no **Editais.GOV** (Django, Wagtail CMS, Signals, Q Objects, Rate Limiting, Docker).
  - Aplicação em produção **NexusTech Store** (`tads-store-gccavalcante.vercel.app` e `github.com/gccavalcante/tads-store`).
  - Repositório de banco de dados **Bolsa Futuro Digital** (`github.com/gccavalcante/Bolsa-Futuro-Digital`) + trilha estruturada de Análise de Dados e BI (Power BI, Power Query, DAX, Modelagem Dimensional, SQL Profissional, Python para Dados, Estatística Aplicada, preparação PL-300).

## 2. Leitura e intenção das páginas
Lendo isto como: portfólio técnico de engenharia back-end/full-stack e análise de dados para recrutadores e líderes técnicos, uma página de mostrar + convencer com linguagem editorial suíça / engenharia de precisão, em HTML/CSS/JS estático para Vercel.

| Página | Intenção | Variação | Movimento | Densidade |
|---|---|---|---|---|
| Portfólio (`index.html`) | mostrar / convencer | alta | média | média |

## 3. Direções visuais comparativas (Modo de Decisão)
O projeto implementa três direções completas selecionáveis em tempo real para decisão do autor:

1. **Direção 1 — Editorial Suíço & Engenharia (`data-direction="editorial"`):**
   - Superfície em papel pedra quente (`#F5F4F0`), tinta carvão (`#141413`), divisórias arquiteturais de `1px` (`#DCDAD3`), blocos de inspeção técnica em grafite escuro (`#161618`) e acento único em Azul Cobalto (`#1D4ED8`).
   - Tipografia: `Syne` (Display) + `Inter` (Corpo) + `JetBrains Mono` (Metadados, SQL e código).
2. **Direção 2 — Papel Técnico & Blueprint de Dados (`data-direction="blueprint"`):**
   - Superfície papel técnico (`#FAF8F5`), malha estrutural com coordenadas técnicas aparentes, texto tinta (`#111312`), superfícies tabulares (`#F1EFEA`) e acento único em Verde Esmeralda Escuro (`#047857`).
   - Tipografia: `Space Grotesk` (Display) + `Source Sans 3` (Corpo) + `IBM Plex Mono` (Tabelas, queries e índices).
3. **Direção 3 — Dark Terminal de Precisão (`data-direction="terminal"`):**
   - Superfície carbono (`#0E0E10`), painéis elevados (`#151518`), linhas de grade (`#26262B`), texto osso (`#ECECEF`) e acento único em Âmbar Técnico (`#D97706`).
   - Tipografia: `Plus Jakarta Sans` (Display) + `Inter` (Corpo) + `JetBrains Mono` (Protagonista em esquemas e arquitetura).

## 4. Proibições estritas (Catálogo UI Humanizer)
- Proibido eyebrow caixa-alta acima de títulos de seção (A1).
- Proibido gradiente em texto (A2) ou headline bicolor (A3).
- Proibido ponto colorido no final de títulos (`copy.md`).
- Proibido chip com bolinha verde pulsando (A7).
- Proibido card com borda lateral ou superior grossa pintada (A5).
- Proibido emoji como ícone (A9) ou ícone dentro de quadradinho colorido (B3).
- Proibido `transition: all` e obrigatório suporte a `prefers-reduced-motion`.

## 5. Registro de decisões
### 2026-11-12 — Arquitetura de Lente Dupla (Back-end/Full-Stack + Dados) e Seletor de 3 Direções
- **Contexto:** O autor busca vaga Júnior tanto em Engenharia de Software (Full-Stack com foco em Back-end) quanto em Análise de Dados, e pediu para visualizar as 3 direções antes de bater o martelo.
- **Decisão:** Construir o portfólio completo com o seletor de lente técnica (Visão Integrada / Engenharia Back-end / Análise de Dados & BI) e barra flutuante de comparação das 3 direções visuais.
- **Porquê:** Permite que o recrutador filtre a leitura pelo cargo da vaga e permite ao autor comparar as 3 propostas reais no navegador.
