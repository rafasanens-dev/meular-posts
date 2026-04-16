# Quality Criteria — Post Casa: Carrossel de Imóveis

## Scoring Guide

Each criterion is evaluated on a 1–10 scale.

**Verdict:**
- **APROVAR** — Overall ≥7.0 AND no criterion scores below 4
- **REJEITAR** — Overall <7.0 OR any criterion scores below 4
- **APROVAR COM RESSALVAS** — Overall ≥7.0 but specific improvements recommended

---

## Content Accuracy (slides + caption)

| ID | Criterion | Hard Fail |
|----|-----------|-----------|
| C1 | Slide 1 shows: status badge + property type + city + price — all 4 present | Yes — if any missing |
| C2 | Station walking distance present in slide 1 (spec chips or overlay) OR in caption | Yes |
| C3 | All spec data (quartos, m², vagas, preço) matches the source imovel.md | Yes — if mismatch |
| C4 | Pet OK mentioned (in chips or caption) when property allows pets | No |
| C5 | Renovation angle present in quintal slide when outdoor photo is included | No |
| C6 | CTA slide (last) present with solid #00A5EC background | Yes |
| C7 | WhatsApp link (wa.me/...) present in caption | Yes |
| C8 | Caption hook ≤125 chars (visible before "ver mais") | No |

---

## Visual Compliance

| ID | Criterion | Hard Fail |
|----|-----------|-----------|
| V1 | All slides are exactly 1080×1440px | Yes |
| V2 | Blue top bar (#00A5EC, ~80–88px) present in all slides except CTA | No (warn) |
| V3 | Logo Meu Lar JP visible in all slides | Yes — if missing in 2+ slides |
| V4 | No text below 24px in any slide | Yes |
| V5 | No text below font-weight 500 in main copy | No |
| V6 | Photo slides use real property photo as background (not placeholder gradient) | Yes |
| V7 | No content clipped or overflowing outside slide bounds | Yes |
| V8 | Text is legible (contrast adequate against photo/background) | Yes — if any illegible text |
| V9 | Slide counter numbers absent (no "1/7", "slide 2" indicators) | No |

---

## Caption Quality

| ID | Criterion | Hard Fail |
|----|-----------|-----------|
| T1 | Hook line ≤125 chars | No |
| T2 | No banned terms: incrível, imperdível, sensacional, imóvel dos sonhos, oportunidade única | Yes |
| T3 | Spec block complete: tipo · quartos · m² · preço · estação | Yes — if 2+ missing |
| T4 | 3–5 hashtags (not 0, not >8) | No (warn) |
| T5 | #meularjp hashtag present | Yes |
| T6 | Caption length ≤2200 chars | Yes |
| T7 | Caption in Portuguese (Brazilian) | Yes — if not Portuguese |
| T8 | Copy is property-specific (≥1 detail unique to this listing) | No |

---

## CTA Quality

| ID | Criterion | Hard Fail |
|----|-----------|-----------|
| A1 | "Deslize" swipe prompt present in caption OR in slide copy | No |
| A2 | WhatsApp contact link (wa.me format) present | Yes |
| A3 | @meular.jp handle present in last slide | No |

---

## Overall Score Calculation

Sum of all scored criteria ÷ count of scored criteria.

For hard-fail criteria: if any hard-fail criterion scores <4, the overall verdict is REJEITAR regardless of total score.

---

## Mandatory Corrections Format

When issuing a REJEITAR verdict, provide for each failed criterion:
```
[CRITERION ID] [Score: N/10]
Problem: [What is wrong]
Location: [Slide X / Caption line Y]
Fix: [Exact corrected text or design instruction]
```
