---
execution: inline
agent: squads/imoveis-instagram/agents/renata-revisao
inputFile: squads/imoveis-instagram/output/slides/
outputFile: squads/imoveis-instagram/output/review.md
on_reject: step-04-criar-slides
---

# Step 05: Revisar Qualidade

## Context Loading

Load these files before executing:
- `squads/imoveis-instagram/output/slides/` — all rendered PNG files from Diana
- `squads/imoveis-instagram/output/copy.md` — Carlos's slide texts and caption
- `squads/imoveis-instagram/pipeline/data/quality-criteria.md` — scoring rubric and hard-fail conditions
- `squads/imoveis-instagram/pipeline/data/visual-identity.md` — design system reference for visual checks

## Instructions

Renata Revisão executes this step. She runs her `revisar-conteudo` task:

### Process
1. Read quality-criteria.md — internalize all criteria IDs and hard-fail conditions
2. Open each PNG slide and evaluate all visual criteria (V1–V9)
3. Read copy.md and evaluate all content criteria (C1–C8) and caption criteria (T1–T8, A1–A3)
4. Score each criterion from 1–10 with a one-line justification
5. Compute overall score (arithmetic average)
6. Issue verdict: APROVAR / REJEITAR / APROVAR COM RESSALVAS
7. For any failed criterion: write a specific, copy-ready correction

### On REJEITAR verdict
- Identify which agent needs to fix the issue:
  - Visual issues (V-criteria) → Diana Design (step 4)
  - Copy/caption issues (C/T/A-criteria) → Carlos Carrossel (step 2)
- Present the corrections list organized by agent
- The pipeline will route back to the appropriate step

## Output Format

```markdown
# Revisão de Qualidade — [Property description]

## Scorecard

### Conteúdo dos Slides
| Critério | Score | Hard Fail | Nota |
|----------|-------|-----------|------|
| C1: Slide 1 completo | /10 | Sim | |
| C2: Distância da estação | /10 | Sim | |
| C3: Dados corretos | /10 | Sim | |
| C4: Pet OK | /10 | Não | |
| C5: Quintal upsell | /10 | Não | |
| C6: CTA slide presente | /10 | Sim | |
| C7: WhatsApp presente | /10 | Sim | |
| C8: Hook ≤125 chars | /10 | Não | |

### Visual
| Critério | Score | Hard Fail | Nota |
|----------|-------|-----------|------|
| V1: Dimensões 1080x1440 | /10 | Sim | |
| V2: Top bar presente | /10 | Não | |
| V3: Logo visível | /10 | Sim | |
| V4: Font ≥24px | /10 | Sim | |
| V6: Fotos reais | /10 | Sim | |
| V7: Sem overflow | /10 | Sim | |
| V8: Contraste legível | /10 | Sim | |

### Legenda
| Critério | Score | Hard Fail | Nota |
|----------|-------|-----------|------|
| T1: Hook ≤125 chars | /10 | Não | |
| T2: Sem termos banidos | /10 | Sim | |
| T3: Spec block completo | /10 | Sim | |
| T4: 3–5 hashtags | /10 | Não | |
| T5: #meularjp | /10 | Sim | |
| T6: ≤2200 chars | /10 | Sim | |
| A2: Link WhatsApp wa.me | /10 | Sim | |

## Score Geral: X.X / 10
## Veredicto: [APROVAR / REJEITAR / APROVAR COM RESSALVAS]

## Correções Obrigatórias (se REJEITAR / RESSALVAS)
[One entry per failed criterion with exact fix]
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
# Revisão de Qualidade — Casa Nagoya Tenpaku · 3Q · ¥28,800,000

## Scorecard

### Conteúdo dos Slides
| Critério | Score | Hard Fail | Nota |
|----------|-------|-----------|------|
| C1: Slide 1 completo | 10/10 | Sim | Status + tipo + cidade + preço: todos presentes |
| C2: Distância da estação | 10/10 | Sim | "5 min da estação Jingumae" no chip e na legenda |
| C3: Dados corretos | 10/10 | Sim | Todos os dados conferidos contra imovel.md |
| C4: Pet OK | 10/10 | Não | Chip "Pet OK" no slide 1 e "Pet OK ✓" na legenda |
| C5: Quintal upsell | 10/10 | Não | "Espaço aberto com potencial para área gourmet" presente |
| C6: CTA slide presente | 10/10 | Sim | Último slide: fundo #00A5EC, WhatsApp, @meular.jp |
| C7: WhatsApp presente | 10/10 | Sim | wa.me/819099221830 no slide CTA e na legenda |
| C8: Hook ≤125 chars | 10/10 | Não | 73 chars: "Casa reformada em Nagoya: 3 quartos, garagem dupla e ofurô completo. 🏡" |

[... remaining criteria with scores ...]

## Score Geral: 9.9 / 10
## Veredicto: APROVAR
```

## Veto Conditions

Reject and redo if ANY are true:
1. Not all criteria from quality-criteria.md are present in the scorecard — partial reviews cannot be trusted to catch all issues
2. A REJEITAR verdict has no corrections section — every rejection must provide actionable fixes

## Quality Criteria

- [ ] All criteria have explicit scores with justification notes
- [ ] Hard-fail criteria are flagged in the Hard Fail column
- [ ] Overall score is computed correctly
- [ ] Verdict is unambiguous (APROVAR / REJEITAR / APROVAR COM RESSALVAS)
- [ ] Failed criteria have copy-ready corrections
