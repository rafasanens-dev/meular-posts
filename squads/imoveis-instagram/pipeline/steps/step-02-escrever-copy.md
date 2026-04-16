---
execution: inline
agent: squads/imoveis-instagram/agents/carlos-carrossel
format: instagram-feed
inputFile: squads/imoveis-instagram/output/property-focus.md
outputFile: squads/imoveis-instagram/output/copy.md
---

# Step 02: Escrever Textos do Carrossel

## Context Loading

Load these files before executing:
- `squads/imoveis-instagram/output/property-focus.md` — path to the property folder (from step 1 checkpoint)
- `squads/imoveis-instagram/pipeline/data/domain-framework.md` — property data schema and copy methodology
- `squads/imoveis-instagram/pipeline/data/output-examples.md` — quality reference for slide texts and caption
- `squads/imoveis-instagram/pipeline/data/anti-patterns.md` — common copy mistakes to avoid
- `squads/imoveis-instagram/pipeline/data/tone-of-voice.md` — tone selection guide

## Instructions

Carlos Carrossel executes this step. He runs his 3 tasks in sequence:

### Task 1: ler-dados-imovel
Read the property folder from property-focus.md. Find and parse imovel.md. List all photos and map them to categories. Select up to 10 slides (applying priority order if > 10 photos). Flag any missing required fields.

### Task 2: escrever-slides
Using the structured data and selected photos from task 1, write the text content for each slide:
- Slide 1 (cover): status badge + tipo + cidade overlay + card title + spec chips + price + station
- Slides 2–N (rooms): UPPERCASE label + one benefit-oriented sentence per slide
- Quintal slide: always use the renovation upsell line
- CTA slide (last): blue background text content

### Task 3: escrever-legenda
Write the complete Instagram caption:
- Hook ≤125 chars (concrete, property-specific)
- Location anchor + 1–2 lifestyle sentences
- Spec block (🏡 📍 💴 emojis)
- WhatsApp CTA with wa.me link
- 3–5 hashtags (#meularjp mandatory)

## Output Format

```markdown
# Copy — [Property description]

## Dados Lidos
[Summary of extracted property_data from imovel.md]

## Fotos Selecionadas
[List of selected slides with categories and filenames]

## Textos dos Slides

=== SLIDE 1 (CAPA — fachada) ===
Status badge: [text]
Tipo: [type]
Cidade (overlay): [City, Prefecture]
Título do card: [feature1 · feature2 · feature3]
Spec chips: [chips]
Preço: ¥[amount]
Estação: 📍 [N] min da estação [Name]

=== SLIDE 2 ([CATEGORY]) ===
Label: [ROOM NAME]
Destaque: [benefit sentence]

[... one section per photo slide ...]

=== SLIDE N (CTA) ===
Fundo: #00A5EC (sólido)
Linha 1: Ficou interessado?
Linha 2: Fale com a gente pelo WhatsApp
Handle: @meular.jp
WhatsApp: [wa.me link]

## Legenda

[Full caption text]

=== METADADOS ===
Hook: [N] chars
Total: [N] chars
Hashtags: [list]
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
# Copy — Casa Nagoya Tenpaku-ku · 3Q · ¥28,800,000

## Dados Lidos
- Tipo: Casa Residencial | Status: À VENDA
- Cidade: Nagoya, Aichi | Bairro: Tenpaku-ku
- Estação: Jingumae (5 min a pé)
- Preço: ¥28,800,000
- Specs: 3Q · 2B · 98m² · 2 vagas · Pet OK · Reformado 2024
- WhatsApp: wa.me/819099221830

## Fotos Selecionadas
1. 01-fachada.jpg → capa (cover)
2. 02-garagem.jpg → garagem
3. 03-sala.jpg → sala
4. 04-cozinha.jpg → cozinha
5. 05-ofuro.jpg → ofurô
6. 06-quarto-01.jpg → quarto principal
7. 07-quintal.jpg → quintal
8. (CTA — sem foto)

## Textos dos Slides

=== SLIDE 1 (CAPA — fachada) ===
Status badge: À VENDA
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

## Legenda

Casa reformada em Nagoya: 3 quartos, garagem dupla e ofurô completo. 🏡

A 5 minutos a pé da estação Jingumae, este imóvel reúne tudo que você precisa:
sala integrada, cozinha moderna, ofurô completo — e ainda espaço externo com
potencial de área gourmet.

🏡 Casa Residencial · 3 quartos · 98m²
📍 Nagoya, Aichi — 5 min a pé da estação Jingumae
💴 ¥28,800,000
Pet OK ✓

👉 Deslize para ver todas as fotos
📲 Fale com a gente pelo WhatsApp: wa.me/819099221830

#meularjp #imoveisnojapo #casanojapo #nagoya #brasileirosnojapo

=== METADADOS ===
Hook: 73 chars
Total: 512 chars
Hashtags: [meularjp, imoveisnojapo, casanojapo, nagoya, brasileirosnojapo]
```

## Veto Conditions

Reject and redo if ANY are true:
1. Station walking distance is absent from slide 1 AND the data was available in imovel.md — if the data exists, it must be in the output
2. Caption hook exceeds 125 characters — this is the Instagram "above the fold" limit
3. WhatsApp wa.me link is absent from the caption

## Quality Criteria

- [ ] All slides are written (one section per selected photo + CTA)
- [ ] Slide 1 has all required fields (status + tipo + cidade + specs + price + station)
- [ ] Quintal slide has the renovation upsell line (when quintal photo selected)
- [ ] Caption hook ≤125 chars with at least one concrete data point
- [ ] Spec block complete in caption (tipo/quartos/m², cidade/estação, preço)
- [ ] 3–5 hashtags with #meularjp first
- [ ] Zero banned terms anywhere in the output
