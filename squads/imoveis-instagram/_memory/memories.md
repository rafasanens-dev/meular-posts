# Squad Memory: Post Casa — Carrossel de Imóveis

## Estilo de Escrita

### Público na Legenda
- Sempre usar "estrangeiro(s)" em vez de "brasileiro(s)" quando a copy fizer referência ao público-alvo em geral. O público da Meu Lar JP inclui hispânicos, ingleses e outros expatriados — não apenas brasileiros.

### Regra do Hook (primeira linha da legenda)
- **Formato obrigatório:** `Casa (nova/usada) em (Cidade) + diferencial principal`
- O hook deve destacar o que mais chama atenção no imóvel — priorizar diferenciais raros/valiosos
- Ordem de prioridade dos diferenciais: terreno grande > vagas em excesso > Walk-in Closet > ofurô > localização
- Exemplos: "Casa nova em Nagoya com 4 vagas e 230m² de terreno! 🏡" / "Casa usada em Handa com quintal enorme e 3 vagas! 🏡"
- Sempre terminar com emoji 🏡 e nunca ultrapassar 125 caracteres

## Design Visual

### Slide 1 — Capa do Carrossel (template finalizado)

**Layout geral**
- Dimensões: 1080×1440px
- Background: foto da fachada do imóvel (cover)
- Overlay sutil para legibilidade: `linear-gradient 135deg rgba(0,0,0,0.18→0.05→0.10)`

**Logo**
- Canto superior esquerdo, `top: 26px / left: 28px`
- Logo branco com `filter: brightness(0) invert(1)`, altura 82px

**Badge + Painel de valores (coluna direita)**
- Posição: `top: 36px / right: 48px / width: 348px`
- Badge "CASA NOVA": fundo `#00A5EC`, pill (`border-radius: 9999px`), fonte 46px, largura `calc(100% + 30px)` (15px além do painel em cada lado)
- Painel de preço/endereço: fundo `rgba(6,10,26,0.82)`, borda `3px solid #00A5EC`, `border-radius: 20px`

**Círculos de fotos internas (coluna esquerda)**
- 3 círculos sobrepostos, `left: 28px / top: 444px` (círculo do meio centralizado verticalmente na imagem)
- Borda: `5px solid #00A5EC`
- Sombra: `0 4px 18px rgba(0,0,0,0.55), 0 0 18px 4px rgba(255,255,255,0.35)`
- Tamanhos: topo 192px, meio 232px (z-index alto), base 192px

**Barra de specs (rodapé)**
- Flutuante: `bottom: 32px / left: 28px / right: 28px / height: 138px`
- Fundo `rgba(6,10,26,0.88)`, borda `3px solid #00A5EC`, `border-radius: 20px`
- Ícones PNG do material: `icon-bed.png`, `icon-car.png`, `icon-house.png`, `icon-land.png` (Land 02)

**Paleta de cores**
- Azul celeste principal: `#00A5EC` (badge, bordas, barra de specs)
- Fundo escuro painéis: `rgba(6, 10, 26, 0.82–0.88)`

## Estrutura de Conteúdo

## Seleção de Fotos — Critérios e Ordem

### Ordem padrão do carrossel (10 slides)
1. **Capa** — Fachada principal da casa
2. **Estacionamento/Garagem** — Foto da frente com foco nas vagas (diferencial de espaço)
3. **Sala/LDK** — Ângulo que mostre amplitude do espaço
4. **Sala com acesso ao quintal** — Janelão ou porta de correr para área externa
5. **Cozinha** — Bancada completa, moderna
6. **Lavabo principal** — Sempre presente, pia/armário com espelho
7. **Ofurô** — Logo após o lavabo (se completam)
8. **Quarto principal** — Preferência para quarto com varanda ou walk-in closet
9. **Diferencial único** — Ex: lavabo decorativo, quarto especial, área de lazer
10. **CTA** — Grid 3×3 com fotos restantes + overlay de contato

### Regras de seleção
- **Terreno grande = ponto de decisão** — sempre incluir foto do terreno/quintal, mesmo que seja o terreno vazio; para estrangeiros é um dos fatores mais importantes (lazer, área gourmet, quintal)
- **Tatami = evitar** — quarto de tatami é visto negativamente pela maioria dos estrangeiros, que geralmente reformam para piso normal. Só incluir se não houver alternativa melhor
- **Lavabo + Ofurô sempre juntos** — são slides complementares, nunca separar
- **Walk-in Closet = valorizar** — quarto com WIC deve ser o quarto principal do carrossel
- **Lavabo decorativo (cuba sobre bancada)** — é diferencial visual forte, sempre incluir se disponível
- **Varanda/sacada** — incluir quando o quarto principal tiver acesso direto

### Slide CTA (último slide) — Grid 3×3 padrão
- Overlay escuro `rgba(6,10,26,0.62)` sobre o grid
- CTA centralizado: logo → divider azul → título → subtítulo → botão WhatsApp verde → www.meular.jp → tag de idiomas

**Ordem padrão do grid (adaptar se faltar foto):**
- Linha 1 (topo): fachada ângulo 2 · porta da entrada (exterior) · entrada interior/sapateira
- Linha 2 (meio): sanitário · escada · quarto secundário
- Linha 3 (baixo): outro quarto · segundo banheiro/lavabo · varanda ou área externa

## Proibições Explícitas

### Vocabulário — Ofurô
- Nunca usar "conforto japonês" — soa estranho para o público. Substituir por "conforto e praticidade todo dia."

### Texto de Descrição dos Slides (room-detail)
- **Máximo 2 linhas.** Frases longas devem ser encurtadas, não quebradas em 3 linhas.
- Usar `<br>` manual quando necessário, com pelo menos 3 palavras na linha 2.
- Evitar informações óbvias para o contexto: em casa nova, não mencionar "piso novo" ou "teto alto" (padrão).

### Orientação das Fotos
- **Usar apenas fotos na vertical (portrait).** Fotos na horizontal (landscape) são proibidas no carrossel.
- Antes de selecionar qualquer foto, verificar a orientação. Se a pasta tiver fotos landscape e portrait, usar apenas as portrait.
- O usuário pode ter enviado fotos horizontais por engano — nunca incluí-las nos slides.

## Técnico (específico do squad)

### Publicação no Instagram — Fluxo Validado

- **Formato:** PNG → JPEG via `ffmpeg -qscale:v 2`
- **Dimensões para API:** Redimensionar de 1080×1440 para **1080×1350** (4:5) — a API exige proporção mínima 4:5. Comando: `ffmpeg -vf scale=1080:1350`
- **Hosting de imagens:** imgBB está **bloqueado** pelos servidores do Facebook. Usar **Cloudflare Tunnel** (`cloudflared`) apontando para o servidor Node local (porta 8765). Binary em `~/.../npm-cache/_npx/.../cloudflared.exe`, invocar via `npx cloudflared`.
- **Containers sequenciais:** Criar os 10 containers um a um (loop `for...of`) — evita rate limit e facilita debug.
- **Legenda no carousel container:** Passar a legenda diretamente no `createCarouselContainer`, nunca via variável de ambiente. Verificar antes de publicar que o caption não está vazio.
- **Editar legenda após publicação:** `POST /v21.0/{post-id}` com `caption=...` e `comment_enabled=true`.
- **Carousel container:** Criar após todos os child containers estarem com status `FINISHED`.
- **Legenda CTA padrão:** Usar sempre o bloco com "GOSTEI" e número `+81 90-9922-1830 (Rafael)` — nunca link `wa.me`.
- **Pasta Posts Finalizados:** Salvar cópia em `Documents/Posts Finalizados/Posts Casas/{data}_{cidade}-{bairro}-{ldk}/` com slides como `slide-NN-preview.png` + `legenda.md`.
- **Após publicação:** Mover a pasta da casa de `properties/{nome}` para `properties/Casas Publicadas/{nome}`.
