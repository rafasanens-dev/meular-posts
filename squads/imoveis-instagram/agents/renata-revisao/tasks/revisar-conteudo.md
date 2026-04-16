---
task: "Revisar Conteúdo"
order: 1
input: |
  - slides_folder: Path to rendered PNG files (from Diana's output)
  - copy_file: Path to copy.md (Carlos's slide texts and caption)
  - quality_criteria_file: squads/imoveis-instagram/pipeline/data/quality-criteria.md
output: |
  - scorecard: Per-criterion scores with justifications
  - verdict: APROVAR | REJEITAR | APROVAR COM RESSALVAS
  - overall_score: Numerical average (0–10)
  - corrections: List of required corrections (only on REJEITAR/RESSALVAS)
---

# Revisar Conteúdo

Evaluate the complete carousel — all rendered PNG slides and the written caption — against the squad's quality criteria. Score each criterion, compute the overall, issue a clear verdict, and provide specific corrections for every failed element.

## Process

1. **Load quality criteria:** Read `pipeline/data/quality-criteria.md` — internalize all criteria IDs, their hard-fail status, and scoring guidance.

2. **Review the PNG slides:**
   Read each PNG file in the slides folder. For each slide, evaluate:
   - V1: Is the viewport 1080×1440px?
   - V2: Is the blue top bar (#00A5EC) present? (except CTA slide)
   - V3: Is the logo visible in all slides?
   - V4: Is all text ≥24px? (scan for any small text)
   - V5: Is font-weight ≥500 for main copy?
   - V6: Are real property photos used (not placeholder gradients)?
   - V7: Is all content within bounds (no clipping)?
   - V8: Is text legible against the background (adequate contrast)?
   - V9: Are there any slide counters or manual navigation elements? (should be absent)

3. **Review the slide texts in copy.md:**
   - C1: Slide 1 has all 4 required elements (status badge text + tipo + cidade + preço)?
   - C2: Station walking distance present in slide 1 spec chips or caption?
   - C3: All spec data matches property_data (no typos or wrong numbers)?
   - C4: Pet OK present when applicable?
   - C5: Quintal upsell angle present when outdoor photo is included?
   - C6: CTA slide is present as the last slide?

4. **Review the caption:**
   - C7: WhatsApp wa.me link present?
   - C8: Hook ≤125 chars?
   - T1: Hook ≤125 chars (confirm)?
   - T2: Zero banned terms (incrível, imperdível, sensacional, imóvel dos sonhos, oportunidade única)?
   - T3: Spec block complete (tipo + quartos + m² + preço + estação)?
   - T4: 3–5 hashtags?
   - T5: #meularjp present?
   - T6: Caption ≤2200 chars?
   - T7: Caption in Portuguese?
   - T8: At least 1 property-specific detail?
   - A2: WhatsApp link in wa.me format?
   - A3: @meular.jp in last slide?

5. **Compute overall score:** Average of all criterion scores.

6. **Determine verdict:**
   - APROVAR: overall ≥7.0 AND no criterion <4
   - REJEITAR: overall <7.0 OR any hard-fail criterion scores <4
   - APROVAR COM RESSALVAS: overall ≥7.0 but some criteria between 4–6

7. **Write corrections (for REJEITAR or RESSALVAS):**
   For each criterion scoring <7:
   ```
   [CRITERION ID] Score: N/10
   Problema: [specific description of what is wrong]
   Localização: [Slide X / Caption linha Y]
   Correção: [exact replacement text or design instruction]
   ```

## Output Format

```markdown
# Revisão de Qualidade — [Property description, e.g. "Casa Nagoya 3Q ¥28.8M"]

## Scorecard

### Conteúdo dos Slides
| Critério | Score | Status | Nota |
|----------|-------|--------|------|
| C1: Slide 1 completo | /10 | | |
| C2: Distância da estação | /10 | | |
| C3: Dados corretos | /10 | | |
| C4: Pet OK | /10 | | |
| C5: Quintal upsell | /10 | | |
| C6: CTA slide presente | /10 | | |

### Visual
| Critério | Score | Status | Nota |
|----------|-------|--------|------|
| V1: Dimensões 1080x1440 | /10 | | |
| V2: Top bar presente | /10 | | |
| V3: Logo visível | /10 | | |
| V4: Font ≥24px | /10 | | |
| V6: Fotos reais | /10 | | |
| V7: Sem overflow | /10 | | |
| V8: Contraste legível | /10 | | |

### Legenda
| Critério | Score | Status | Nota |
|----------|-------|--------|------|
| T1: Hook ≤125 chars | /10 | | |
| T2: Sem termos banidos | /10 | | |
| T3: Spec block completo | /10 | | |
| T4: 3–5 hashtags | /10 | | |
| T5: #meularjp presente | /10 | | |
| T6: ≤2200 chars | /10 | | |
| A2: Link WhatsApp wa.me | /10 | | |

## Veredicto

**Score Geral: X.X / 10**
**Veredicto: [APROVAR / REJEITAR / APROVAR COM RESSALVAS]**

## Correções Obrigatórias

[Only present if REJEITAR or RESSALVAS]
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
# Revisão de Qualidade — Casa Nagoya 3Q ¥28,800,000

## Scorecard

### Conteúdo dos Slides
| Critério | Score | Status | Nota |
|----------|-------|--------|------|
| C1: Slide 1 completo | 10/10 | ✓ | Status + tipo + cidade + preço presentes |
| C2: Distância da estação | 10/10 | ✓ | "5 min da estação Jingumae" em slide 1 e legenda |
| C3: Dados corretos | 10/10 | ✓ | Todos os dados batem com imovel.md |
| C4: Pet OK | 10/10 | ✓ | "Pet OK" no chip e na legenda |
| C5: Quintal upsell | 10/10 | ✓ | "Espaço aberto com potencial para área gourmet" presente |
| C6: CTA slide presente | 10/10 | ✓ | Último slide é CTA azul com WhatsApp |

### Visual
| Critério | Score | Status | Nota |
|----------|-------|--------|------|
| V1: Dimensões 1080x1440 | 10/10 | ✓ | Todos os 8 slides confirmados |
| V2: Top bar presente | 10/10 | ✓ | Slides 1–7 têm barra azul; slide 8 (CTA) tem fundo azul total |
| V3: Logo visível | 10/10 | ✓ | Logo presente e legível em todos os slides |
| V4: Font ≥24px | 10/10 | ✓ | Menor texto: 26px (handle @meular.jp) |
| V6: Fotos reais | 10/10 | ✓ | Todas as fotos do imóvel carregadas corretamente |
| V7: Sem overflow | 10/10 | ✓ | Nenhum conteúdo cortado detectado |
| V8: Contraste legível | 9/10 | ✓ | Slide 5 (ofurô) tem parede clara — overlay escurece adequadamente |

### Legenda
| Critério | Score | Status | Nota |
|----------|-------|--------|------|
| T1: Hook ≤125 chars | 10/10 | ✓ | 73 chars |
| T2: Sem termos banidos | 10/10 | ✓ | Nenhum termo proibido encontrado |
| T3: Spec block completo | 10/10 | ✓ | Tipo + quartos + m² + cidade + estação + preço |
| T4: 3–5 hashtags | 10/10 | ✓ | 5 hashtags |
| T5: #meularjp presente | 10/10 | ✓ | Primeiro hashtag |
| T6: ≤2200 chars | 10/10 | ✓ | 512 chars total |
| A2: Link WhatsApp wa.me | 10/10 | ✓ | wa.me/819099221830 presente |

## Veredicto

**Score Geral: 9.9 / 10**
**Veredicto: APROVAR**
```

## Quality Criteria

- [ ] Every criterion from quality-criteria.md has an explicit score and note
- [ ] Hard-fail criteria are clearly flagged when they score <4
- [ ] Verdict is one of exactly three options: APROVAR / REJEITAR / APROVAR COM RESSALVAS
- [ ] All corrections are specific and include exact replacement text (not just problem description)
- [ ] Overall score is the arithmetic average of all criterion scores

## Veto Conditions

Reject and redo if ANY are true:
1. Any criterion in quality-criteria.md is missing from the scorecard — a partial review is more dangerous than no review
2. A REJEITAR verdict is issued without at least one correction with a specific replacement text — if you're rejecting, you must tell the agent exactly what to fix
