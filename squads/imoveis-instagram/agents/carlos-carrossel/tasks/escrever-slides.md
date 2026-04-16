---
task: "Escrever Textos dos Slides"
order: 2
input: |
  - property_data: Structured data from ler-dados-imovel task
  - selected_slides: Ordered list of photos with categories
output: |
  - slide_texts: Complete text content for each slide (label, description, layout notes)
  - cover_slide: Full data for Template B cover slide (all fields)
  - cta_slide: CTA slide content
---

# Escrever Textos dos Slides

Write the complete text content for each slide in the carousel. Slide 1 (cover) uses the Template B structure. Slides 2–N are photo slides with a room label and one description line. The last slide is always a CTA with solid blue background.

## Process

1. **Diagnose the emotional driver** — based on property_data, identify the primary buyer profile and choose the copy framework:
   - Family home (3+ quartos + quintal) → BAB framework, warm tone
   - First property / starter (1–2 quartos, budget range) → PAS framework, encouraging tone
   - Investment property → AIDA framework, ROI-forward tone
   - Note the chosen framework and tone — use them consistently across all slides

2. **Write Slide 1 (Cover — always fachada photo):**
   - Status badge text: "VENDA" (default) or "RECÉM REFORMADO" (if reformado: true) or "NOVO" (if status: NOVO)
   - Type label: "Casa Residencial" / "Apartamento" / etc.
   - City overlay (photo, bottom-left): "[Cidade], [Prefecture]" — e.g., "Nagoya, Aichi"
   - Card title: Write a 2–3 element description using the most appealing features — e.g., "3 quartos · ofurô completo · 2 vagas"
   - Spec chips (up to 5, in this order):
     - 🛏 NLDK (or N quartos) — always first
     - 🏠 Nm² — built area (área construída) — always second
     - 🚗 N vagas — when garagem exists
     - 4th chip — first that applies:
       - 🟫 Nm² terreno — when terrain area available (houses/sobrados)
       - Pet OK — ONLY for apartments/condos where pet policy is a real restriction. NEVER for houses (casa/sobrado) for sale.
       - 🏫 Escola Xm — when school ≤1km and property suits families
     - 5th chip (ONLY when station ≤20 min walking AND data available):
       - 🚉 X min [Estação] — station proximity as the last chip, alongside terrain/other info
   - Price: "¥[amount]"
   - Below price line — show ONLY monthly installment when available:
     - "a partir de ¥[parcela]/mês" — when prestação data exists
     - Omit this line entirely if no installment data available
     - NEVER show station info below the price — station always goes in the chips only

3. **Write each room slide (slides 2 through N-1):**
   For each slide in selected_slides (excluding cover and CTA):
   - Label: UPPERCASE room name — "SALA DE ESTAR", "COZINHA", "OFURÔ", "QUARTO PRINCIPAL", "VARANDA", "QUINTAL", "GARAGEM", "ENTRADA"
   - Description: One sentence, benefit-oriented (not descriptive of what's visible, but what it means for the resident)
     - ✓ "Integrada com a cozinha — luminosa e acolhedora."
     - ✓ "Balcão amplo, moderna e pronta para usar."
     - ✗ "Sala com janelas e piso de madeira."
   - **Special rule for QUINTAL:** Always use the upsell angle: "Espaço aberto com potencial para área gourmet. Transformamos para você." (do not change this line)

4. **Write the CTA slide (last slide):**
   - Background: #00A5EC (solid)
   - Line 1: "Ficou interessado?"
   - Line 2: "Fale com a gente pelo WhatsApp"
   - Handle: "@meular.jp"
   - WhatsApp URL: from property_data.whatsapp

5. **Review all slides** — verify that no slide description uses banned terms (incrível, imperdível, sensacional, imóvel dos sonhos, oportunidade única) and that every description is property-specific.

## Output Format

```markdown
=== SLIDE 1 (CAPA — fachada) ===
Status badge: [text]
Tipo: [property type]
Cidade (overlay): [City, Prefecture]
Título do card: [feature1 · feature2 · feature3]
Spec chips: [chip1] | [chip2] | [chip3] | [chip4]
Preço: ¥[amount]
Estação: 📍 [N] min da estação [Name]

=== SLIDE 2 ([CATEGORY UPPERCASE]) ===
Label: [ROOM NAME]
Destaque: [One benefit-oriented sentence.]

=== SLIDE 3 ([CATEGORY UPPERCASE]) ===
Label: [ROOM NAME]
Destaque: [One benefit-oriented sentence.]

[... one section per selected photo slide ...]

=== SLIDE N (CTA) ===
Fundo: #00A5EC (sólido)
Linha 1: Ficou interessado?
Linha 2: Fale com a gente pelo WhatsApp
Handle: @meular.jp
WhatsApp: [wa.me link]
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
=== SLIDE 1 (CAPA — fachada) ===
Status badge: VENDA
Tipo: Casa Residencial
Cidade (overlay): Nagoya, Aichi
Título do card: 3 quartos · ofurô completo · 2 vagas
Spec chips: 🛏 3 quartos | 📐 98m² | 🚗 2 vagas | Pet OK
Preço: ¥28,800,000
Estação: 📍 5 min da estação Jingumae

=== SLIDE 2 (GARAGEM) ===
Label: GARAGEM
Destaque: 2 vagas cobertas — espaço de sobra para a família.

=== SLIDE 3 (SALA DE ESTAR) ===
Label: SALA DE ESTAR
Destaque: Integrada com a cozinha — luminosa e acolhedora.

=== SLIDE 4 (COZINHA) ===
Label: COZINHA
Destaque: Balcão amplo, moderna e pronta para usar.

=== SLIDE 5 (OFURÔ) ===
Label: OFURÔ
Destaque: Banheiro completo com ofurô — conforto japonês de verdade.

=== SLIDE 6 (QUARTO PRINCIPAL) ===
Label: QUARTO PRINCIPAL
Destaque: Espaçoso, com closet e boa iluminação natural.

=== SLIDE 7 (QUINTAL) ===
Label: QUINTAL
Destaque: Espaço aberto com potencial para área gourmet. Transformamos para você.

=== SLIDE 8 (CTA) ===
Fundo: #00A5EC (sólido)
Linha 1: Ficou interessado?
Linha 2: Fale com a gente pelo WhatsApp
Handle: @meular.jp
WhatsApp: wa.me/819099221830
```

## Quality Criteria

- [ ] Slide 1 has all required fields: status + tipo + cidade + card title + spec chips + preço + estação
- [ ] Every room slide has exactly 1 UPPERCASE label and 1 description sentence
- [ ] Quintal slide uses the exact upsell line when outdoor photo is selected
- [ ] CTA slide is present as the last slide with correct background color
- [ ] Zero banned terms in any slide text
- [ ] Room descriptions are benefit-oriented (not furniture/fixture inventory)

## Veto Conditions

Reject and redo if ANY are true:
1. Station distance (distância a pé) is absent from Slide 1 AND property_data.estacao is not null — if the data exists, it must appear in slide 1
2. The quintal slide exists in selected_slides but does NOT contain the renovation upsell line — this is the Meu Lar JP brand differentiator and cannot be omitted
