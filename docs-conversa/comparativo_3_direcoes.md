# Portfólio Gabriel Chaves — WebGL2 Glass Light Toggle & Crossfade Óptico

Todos os ajustes solicitados foram aplicados em [Portifolio](file:///C:/Users/chave/.gemini/antigravity/scratch/Portifolio):

1. **Tema Dark como padrão (`data-direction="terminal"`):** O site carrega por padrão no tema escuro (`p = 0`, Lua à esquerda, LED azul na base).
2. **Toggle exclusivamente no topo:** O segundo toggle foi removido do dossiê; agora existe apenas o `#glass-toggle-header` na barra superior.
3. **Motor WebGL2 e física idênticos ao modelo de referência (`main.js?v=3`):**
   - **Posição e órbita da barra de LED:** Repousa exatamente na **base (`+π/2`)** no modo Dark, varre pela direita até o **topo (`-π/2`)** no modo Light, e no retorno varre pela esquerda de volta para a base, com sua própria mola criticamente amortecida (`k = 70`).
   - **Física do bloco e dos pixels conforme velocidade e cantos:** Ao arrastar além dos cantos esquerdo/direito, há overscroll elástico (`0.22`) e compressão lateral do bloco de vidro contra a parede (`over * 110` em `khx` e `+ over * 30` em `khy`). Ao arrastar rápido, o bloco estica horizontalmente (`stretch = Math.min(speed * 6.5, 16)`) e cada pixel da matriz `17×17` reage com sua própria mola individual (`k = 260..460`) e arraste proporcional à velocidade (`-kvx * px.drag`).
4. **Suavização de transição entre fontes diferentes (`0.0px` de salto):** Todos os títulos utilizam `.font-morph-host` em CSS Grid sobrepondo `.font-layer-dark` (`Plus Jakarta Sans` 800) e `.font-layer-light` (`Syne` 700), fazendo um *cross-dissolve* óptico contínuo sincronizado com a posição do toggle.

---

## Capturas Verificadas (1440×900)

````carousel
![Tema Padrão Dark Terminal — LED na Base (+π/2)](C:/Users/chave/.gemini/antigravity/brain/4ca55be0-cb4b-4105-a758-f995be8fe9c5/webgl_1_dark_standard.png)
**1. Tema Padrão: Dark Terminal (`p = 0`)**
- Toggle único no topo com refração WebGL2, Lua em matriz `17×17` e barra de LED exatamente na base (`+π/2`).
<!-- slide -->
![Física em Arraste Rápido — Deformação por Velocidade e Trilha de Pixels](C:/Users/chave/.gemini/antigravity/brain/4ca55be0-cb4b-4105-a758-f995be8fe9c5/webgl_2_velocity_drag.png)
**2. Física de Velocidade + Crossfade Óptico de Fontes no Meio do Curso**
- Os pixels reagem à velocidade do arraste, o bloco sofre *stretch* dinâmico e as duas famílias tipográficas fazem *cross-dissolve* suave sem deslocar o layout.
<!-- slide -->
![Tema Editorial Claro — LED no Topo (-π/2)](C:/Users/chave/.gemini/antigravity/brain/4ca55be0-cb4b-4105-a758-f995be8fe9c5/webgl_3_light_top_led.png)
**3. Tema Editorial Claro (`p = 1`)**
- A barra de LED completa a órbita e estaciona exatamente no topo (`-π/2`) acima do Sol.
````
