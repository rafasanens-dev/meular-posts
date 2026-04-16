# Domain Framework — Carrossel de Imóveis para Instagram

## Overview

This framework defines the methodology for producing Instagram carousel posts for Japanese real estate, targeting Brazilian/Portuguese-speaking buyers. It governs content structure, slide composition, copy strategy, and visual design decisions.

---

## Phase 1: Property Data Reading

### Input Schema (imovel.md or imovel.txt)

The property input file must contain the following fields:

```markdown
# Dados do Imóvel

## Identificação
- **Tipo:** Casa Residencial | Apartamento | Sobrado | Terreno
- **Status:** À VENDA | RECÉM REFORMADO | NOVO | ALUGUEL
- **Endereço / Bairro:** [neighborhood or area]
- **Cidade:** [city, prefecture]
- **Preço:** ¥[amount]

## Localização
- **Estação mais próxima:** [station name] (linha [line name])
- **Distância a pé:** [N] minutos a pé

## Especificações
- **Área total:** [N]m²
- **Quartos:** [N]
- **Banheiros:** [N]
- **Vagas de garagem:** [N]
- **Pet permitido:** Sim | Não
- **Ano de construção:** [year] (optional)
- **Reformado:** Sim | Não (if yes, describe)

## Destaques Especiais
[Any standout features: western-style kitchen, garden, corner unit, new appliances, etc.]

## Contato WhatsApp
[wa.me/819099221830 or specific number]
```

### Photo Inventory Categories (in priority order)
1. **fachada** — exterior front view (mandatory, always slide 1)
2. **garagem / estacionamento** — parking area
3. **entrada** — entrance / genkan
4. **sala** — living room (high priority — lifestyle signal)
5. **cozinha** — kitchen (high priority — functional signal)
6. **ofurô** — Japanese bath (1 best photo — cultural differentiator)
7. **banheiro** — bathroom
8. **quarto principal** — master bedroom
9. **varanda** — balcony / engawa
10. **quintal** — outdoor/garden (renovation upsell slide)

### Photo Count Rules
- **2–10 photos available:** Use all
- **11–15 photos available:** Select by priority — fachada (mandatory) → sala/cozinha (best 1 each) → ofurô (1 best) → quarto principal → garagem → quintal → outros
- **Maximum slides:** 10 (Instagram carousel limit)
- **Minimum slides:** 3 (cover + at least 1 room + CTA)
- **CTA slide:** Always added as the final slide (does not require a photo)

---

## Phase 2: Copy Strategy Framework

### Emotional Driver Identification

| Profile | Driver | Copy Framework |
|---------|--------|----------------|
| Família com filhos | Segurança e espaço familiar | BAB (Before-After-Bridge): current pain → better life |
| Primeiro imóvel | Conquista e novo começo | PAS (Problem-Agitate-Solution): anxiety → validation → clarity |
| Investidor | ROI e valorização | AIDA (Attention-Interest-Desire-Action): price anchor first |
| Expatriado recente | Praticidade no Japão | FAB (Feature-Advantage-Benefit): Japan-specific frictions |

### Slide Text Structure

#### Slide 1 (Cover — Fachada)
- **Status badge:** "À VENDA" (¥FFC857) or "RECÉM REFORMADO" (#0077B6)
- **Type label:** Casa Residencial / Apartamento / etc.
- **City overlay (photo, bottom-left):** "Nagoya, Aichi" (48px/900/white)
- **Card content:** type label + description + spec chips + price
- **Description pattern:** "[N] quartos · varanda · [N] vagas" or "[N] quartos · cozinha moderna · Pet OK"

#### Slides 2–N (Room Slides)
- **Label (uppercase):** "SALA DE ESTAR" / "COZINHA" / "OFURÔ" / etc.
- **Description (one sentence max):** Benefit-oriented, not just descriptive
  - Good: "Integrada com a cozinha — luminosa e acolhedora."
  - Bad: "Sala com janelas e sofá."

#### Quintal Slide (Special)
- **Always include upsell angle:** "Espaço aberto com potencial para área gourmet. Transformamos para você."
- **Why:** Renovation upsell is Meu Lar JP's core business differentiator

#### CTA Slide (Last)
- **Background:** Solid #00A5EC (brand blue)
- **Content:** "Ficou interessado?" + "Fale com a gente pelo WhatsApp" + @meular.jp
- **No photo needed** — this is a brand slide

### Caption Structure

```
[HOOK ≤125 chars]

[LOCATION ANCHOR: "A X minutos da estação Y, em Cidade"]
[LIFESTYLE HOOK: 1–2 sentences, emotional]

[DIFFERENTIATOR: reforma / garagem / quintal / Pet OK]

🏡 Tipo · quartos · m²
📍 Cidade — X min da estação Y
💴 ¥preço
[Pet OK] (only if applicable)

👉 Deslize para ver todas as fotos
📲 Fale com a gente pelo WhatsApp: [link]

#meularjp [2–4 more hashtags]
```

**Hook formulas:**
- Price-anchor: "Casa de 3 quartos reformada a ¥28,800,000 — pertinho da estação em Nagoya. 🏡"
- Question: "Imagina ter seu próprio espaço, com garagem e ofurô, a 5 minutos da estação? 🏡"
- Benefit-first: "3 quartos, 2 vagas e ofurô completo — tudo que você precisa para se sentir em casa no Japão."

---

## Phase 3: HTML/CSS Slide Generation

### Template Reference
Base template: `pipeline/data/template-reference.html` (Template B, approved)
Visual identity: `pipeline/data/visual-identity.md`

### Cover Slide (Template B adaptation)
Structure: Blue bar (88px, #00A5EC) → Photo area (912px, full-bleed) → White card (flex 1, ~440px)

### Photo Slides (adaptation rule)
Structure: Blue bar (80px, #00A5EC) → Full-bleed photo (with overlay) → Room info overlay at bottom

### CSS Specifications
- **Viewport:** 1080px × 1440px (always)
- **Font:** Inter (Google Fonts), min 24px
- **Logo:** logo-azul.png with `filter: brightness(0) invert(1)` on colored backgrounds
- **Photo as background:** `background: url('{path}') center/cover no-repeat`
- **Dark overlay:** `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%)`

### Render Process
1. Start HTTP server (Node.js, port 8765) serving the squad output directory
2. Navigate to `http://localhost:8765/{slide}.html`
3. Resize browser viewport to 1080×1440
4. Take screenshot (PNG)
5. Verify slide 1 before batch (inspect visually)
6. Render remaining slides in sequence
7. Stop HTTP server

---

## Phase 4: Quality Review

### Scorecard (1–10 per criterion)
- **Content accuracy:** Data matches imovel.md (price, city, specs)
- **Visual compliance:** Template-reference structure respected
- **Readability:** All text ≥24px, adequate contrast
- **Slide completeness:** Status + type + city + price in slide 1
- **Station proximity:** Present in slide 1 or caption
- **CTA quality:** WhatsApp link present and correct
- **Hashtag hygiene:** 3–5 tags, #meularjp present
- **No banned terms:** incrível/imperdível/sensacional/imóvel dos sonhos absent

**Verdict thresholds:**
- APROVAR: Overall ≥7.0 AND no criterion <4
- REJEITAR: Overall <7.0 OR any criterion <4
- APROVAR COM RESSALVAS: Overall ≥7.0 but improvements recommended

---

## Phase 5: Publication

### Pre-publish checklist
- [ ] Images are JPEG format (convert from PNG if needed)
- [ ] 2–10 images in carousel
- [ ] Each image is 1080×1440px
- [ ] Caption ≤2200 chars
- [ ] Hashtag count ≤30 (recommended: 3–5)
- [ ] Dry-run completed successfully
- [ ] User confirmed publication explicitly

### Instagram Graph API sequence
1. Upload each image to hosting (imgBB)
2. Create media containers (one per image)
3. Create carousel container
4. Publish carousel
5. Capture post URL and post ID

### Rate limits
- Instagram: 25 posts per 24 hours
- Alert user if ≥20 posts used in last 24h
