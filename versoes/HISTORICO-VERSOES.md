# Histórico de Versões e Atualizações do Portfólio (`gccavalcante`)

Todas as versões do portfólio são preservadas cronologicamente nesta pasta (`versoes/`) com numeração semântica padrão (`v1.0.0` -> `v1.1.0` -> `v2.0.0`), além de tags correspondentes no Git.

---

## Ordem Cronológica das Atualizações

### 1. `v1.0.0-inicial-webgl-toggle` (Commit `75390a4`)
- **Descrição:** Primeira versão completa do portfólio técnico integrando o tema padrão **Dark Terminal (Opção 3)** e **Editorial Suíço (Opção 1)** através do **WebGL2 Glass Light Toggle** no cabeçalho, com crossfade óptico de fontes (`Plus Jakarta Sans` e `Syne`).
- **Pasta:** `./versoes/v1.0.0-inicial-webgl-toggle/`
- **Acesso direto no navegador:** `/versoes/v1.0.0-inicial-webgl-toggle/index.html`

### 2. `v1.1.0-padrao-anterior-desktop` (Commit `4a91b92` — Padrão Antigo Reservado)
- **Descrição:** Atualização que removeu o retângulo/halo externo do `<canvas>` do toggle no cabeçalho (`ledHaloMask` no fragment shader), garantindo fusão exata (`0` de diferença RGB) com o fundo do header (`#0E0E10` no Dark e `#F5F4F0` no Light). Mantém o layout original pré-otimização mobile dinâmica.
- **Pasta:** `./versoes/v1.1.0-padrao-anterior-desktop/`
- **Acesso direto no navegador:** `/versoes/v1.1.0-padrao-anterior-desktop/index.html`

### 3. `v2.0.0-padrao-atual-mobile-dinamico` (Padrão Ativo na Raiz)
- **Descrição:** Novo padrão ativo com adaptação dinâmica ao viewport do dispositivo (`visualViewport` + `ResizeObserver`), cabeçalho mobile compacto em linha única, barra horizontal de seções com *scroll-spy*, Seletor de Lente Técnica em linha única no topo da tela inicial, Ficha Técnica 2x2 visível já na abertura mobile, filtros interativos por seção (Casos, 22 Módulos de Dados, Matriz 4 Eixos), botão de copiar código e transformação automática da tabela de repositórios em cards estruturados no mobile (`zero scroll horizontal`).
- **Pasta de backup:** `./versoes/v2.0.0-padrao-atual-mobile-dinamico/`
- **Ativo na raiz:** `/index.html`, `/styles.css`, `/app.js`

---

## Como restaurar qualquer versão anterior como padrão principal

Caso queira voltar a raiz do site para o padrão antigo (`v1.1.0`) ou para o inicial (`v1.0.0`), basta copiar os 3 arquivos da pasta desejada para a raiz do projeto:

```powershell
# Exemplo: restaurar o padrão anterior (v1.1.0) para a raiz
Copy-Item ".\versoes\v1.1.0-padrao-anterior-desktop\*" "." -Force
```
