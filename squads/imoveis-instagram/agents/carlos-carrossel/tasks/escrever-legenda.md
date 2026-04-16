---
task: "Escrever Legenda do Post"
order: 3
input: |
  - property_data: Structured property data (from task 1)
  - slide_texts: Written slide content (from task 2)
output: |
  - caption: Complete Instagram caption (hook + narrative + spec block + CTA + hashtags)
  - hook_char_count: Character count of the hook line
  - caption_char_count: Total character count of the caption
  - hashtags: List of 3–5 hashtags used
---

# Escrever Legenda do Post

Write the complete Instagram caption for the carousel post. The caption follows the proven structure: hook → location anchor → lifestyle narrative → spec block → WhatsApp CTA → hashtags. Every element must be specific to this property.

## Process

1. **Write the hook (first line):**
   - Maximum 125 characters (including emoji if used)
   - Must contain at least one concrete data point from the property
   - Choose a hook formula based on the emotional driver identified in task 2:
     - Price-anchor: "Casa de 3 quartos reformada a ¥28,800,000 — pertinho da estação em Nagoya. 🏡"
     - Benefit-first: "3 quartos, 2 vagas e ofurô completo — tudo que você precisa no Japão. 🏡"
     - Question: "Imagina ter seu próprio espaço, com ofurô e garagem, a 5 minutos da estação? 🏡"
   - Count the characters after writing. If >125, shorten until it fits.

2. **Write the location anchor + lifestyle narrative (2–3 lines):**
   - Open with: "A [N] minutos a pé da estação [Name], em [City],"
   - Follow with 1–2 sentences about the lifestyle benefit of the specific property
   - Reference at least one concrete feature (sala integrada, garagem, quintal, ofurô)
   - Leave a blank line between the hook and this block

3. **Write the spec block (structured lines):**
   - 🏡 [Tipo] · [N] quartos · [N]m²
   - 📍 [Cidade] — [N] min a pé da estação [Name]
   - 💴 ¥[preço]
   - Pet OK ✓ (only if pet_ok: true)
   - (one blank line after)

4. **Write the CTA block:**
   - "👉 Deslize para ver todas as fotos"
   - "📲 Fale com a gente pelo WhatsApp: [wa.me link]"
   - (one blank line after)

5. **Write the hashtag block:**
   - Always include: #meularjp
   - Add 2–4 from this list (choose by relevance):
     - #imoveisnojapo (always add)
     - #casanojapo (for house/sobrado)
     - #apartamentonojapo (for apartments)
     - #[city in lowercase, no spaces: #nagoya, #toyotajapan, #hamamatsu, #aichi]
     - #brasileirosnojapo (when targeting Brazilian audience)
     - #vivernojapo (general Japan lifestyle tag)
   - Maximum 5 hashtags total

6. **Count and verify:**
   - Count total caption characters (full caption including emojis — each emoji counts as 1 char)
   - Count hook line characters only
   - If total >2200: shorten the narrative block first (never cut spec block or CTA)
   - Report hook_char_count and caption_char_count in output

## Output Format

```markdown
=== LEGENDA ===
[hook line — max 125 chars]

[location anchor + narrative — 2–3 sentences]

🏡 [tipo] · [quartos] quartos · [m²]m²
📍 [cidade] — [N] min a pé da estação [station]
💴 ¥[preço]
[Pet OK ✓ — only if applicable]

👉 Deslize para ver todas as fotos
📲 Fale com a gente pelo WhatsApp: [wa.me link]

#meularjp #[tag2] #[tag3] #[tag4]

=== METADADOS ===
Hook: [N] chars
Total: [N] chars
Hashtags: [list]
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
=== LEGENDA ===
Casa reformada em Nagoya: 3 quartos, garagem dupla e ofurô completo. 🏡

A 5 minutos a pé da estação Jingumae, este imóvel reúne tudo que você precura:
sala integrada com a cozinha, ofurô completo — e ainda espaço externo com
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

## Quality Criteria

- [ ] Hook is ≤125 characters AND contains at least one concrete data point
- [ ] Location anchor uses exact format "A [N] minutos a pé da estação [Name]"
- [ ] Spec block has all 3 required lines (tipo/quartos/m², cidade/estação, preço)
- [ ] WhatsApp CTA uses wa.me link format (not just "WhatsApp")
- [ ] 3–5 hashtags, #meularjp always first
- [ ] Zero banned terms (incrível, imperdível, sensacional, imóvel dos sonhos, oportunidade única)
- [ ] Total character count reported and ≤2200

## Veto Conditions

Reject and redo if ANY are true:
1. Hook is over 125 characters — Instagram truncates at this boundary; a hook that's cut off loses all value
2. WhatsApp wa.me link is absent from the caption — the most important conversion element of the post cannot be missing
