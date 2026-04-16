# Visual Identity — Meu Lar JP | Instagram Carrossel

Aprovado em: 2026-04-13
Template base: Template B (Barra azul + Card branco)

---

## Color Palette

- **Primary (Azul meular):** `#00A5EC` — barra do topo, badge VENDA, preço, ícones, linha de destaque, dots
- **Deep Blue (Azul profundo):** `#0077B6` — títulos no card, texto de tipo, cor do texto nos chips
- **Light Blue (Azul claro):** `#D9F4FF` — fundo dos chips de specs, fundo de áreas suaves
- **Light Blue Border:** `#A8E4FB` — borda dos chips
- **Yellow Accent (Destaque premium):** `#FFC857` — badge "VENDA" sobre a foto
- **Background (Branco):** `#FFFFFF` — card de informações
- **Background Alt:** `#F5F7FA` — fundo do corpo quando não há foto
- **Text Primary:** `#1F2937` — título principal no card, headlines
- **Text Secondary:** `#6B7280` — tipo de imóvel, estação, detalhes complementares
- **Handle/Caption:** `rgba(255,255,255,0.80)` — @meular.jp na barra azul

---

## Typography

- **Family:** `'Inter'`, sans-serif (via Google Fonts)
- **Logo bar / handle:** 26px / weight 600
- **Status badge (VENDA):** 26px / weight 900 / letter-spacing 0.14em / UPPERCASE
- **City on photo:** 48px / weight 900 / white
- **Card type label:** 24px / weight 700 / uppercase / letter-spacing 0.12em
- **Card title / property description:** 44px / weight 900 / color `#1F2937`
- **Spec chips:** 26px / weight 700
- **Price:** 52px / weight 900 / color `#00A5EC`
- **Station / address:** 26px / weight 500 / color `#6B7280`

---

## Layout

- **Viewport:** 1080 × 1440 px (Instagram Carousel, 3:4 portrait)
- **Structure:** Top bar (88px) + Photo area (flex 0 0 912px) + White info card (flex 1, ~440px)
- **Top bar:** `background: #00A5EC` | padding: 0 56px | logo left, handle right
- **Photo area:** full bleed background image | `overflow: hidden`
- **Info card:** `border-top: 5px solid #00A5EC` | padding: 32px 56px 36px 56px
- **Padding:** 56px horizontal on all main content areas

---

## Composition Rules

- **Logo placement:** Top-left of the blue bar, `height: 50px`, inverted to white via CSS filter
- **Handle placement:** Top-right of blue bar, muted white
- **Status badge ("VENDA"):** Top-right of photo, background `#FFC857`, color `#1F2937`, border-radius 100px (pill)
- **City overlay:** Bottom-left of photo, font 48px/900/white, on dark photo gradient
- **Info card order:** Type label → Title → Spec chips → Price + Station
- **Spec chips:** `background: #D9F4FF`, `border: 1px solid #A8E4FB`, border-radius 8px
- **No slide number counters** — Instagram shows native navigation

---

## Adaptation Rules

- **Photo slides (slides 2–N):** Remove the info card. Keep the blue top bar. Add a small room label at bottom-left of photo (e.g., "Sala de Estar") in white, 36px/700. Add a subtle dark gradient at the bottom for readability.
- **CTA slide (last slide):** Replace photo with a solid `#00A5EC` background. Show logo centered, WhatsApp CTA, and "@meular.jp". White text throughout.
- **Color on light:** When slide uses a light background, switch text to `#1F2937`. Never use `#6B7280` on white for body copy smaller than 32px.
- **Badge alternatives:** "RECÉM REFORMADO" or "NOVO" use `#0077B6` background + white text instead of yellow.
- **Price color:** Always `#00A5EC` on white/light backgrounds. Always `#FFC857` on dark backgrounds.
- **Logo version:** Blue logo (`logo-azul.png`) + `filter: brightness(0) invert(1)` on dark/colored backgrounds. Blue logo as-is on white backgrounds.
