---
execution: subagent
agent: squads/imoveis-instagram/agents/diana-design
inputFile: squads/imoveis-instagram/output/copy.md
outputFile: squads/imoveis-instagram/output/slides/
model_tier: powerful
---

# Step 04: Criar Slides Visuais

## Context Loading

Load these files before executing:
- `squads/imoveis-instagram/output/copy.md` — Carlos's slide texts, photo file paths, caption
- `squads/imoveis-instagram/pipeline/data/template-reference.html` — approved Template B base structure
- `squads/imoveis-instagram/pipeline/data/visual-identity.md` — design system (colors, typography, layout)
- `squads/imoveis-instagram/pipeline/data/anti-patterns.md` — design mistakes to avoid

## Instructions

Diana Design executes this step as a subagent. She runs 2 tasks in sequence:

### Task 1: criar-slides-html
Read copy.md to extract slide texts and the absolute path to each property photo.
- Verify all photo file paths exist on the filesystem before generating any HTML
- Generate slide-01.html (Template B cover structure) with the fachada photo
- Generate slide-02.html through slide-NN.html (photo slides: full-bleed photo + top bar + room text overlay)
- Generate the CTA slide (last) with solid #00A5EC background
- Save all HTML files to the output/slides/ folder

**HTML specification for photo slides (slides 2–N):**
```html
body { width:1080px; height:1440px; position:relative; }
/* Photo background */
.photo { position:absolute; top:0; left:0; right:0; bottom:0;
  background: url('{ABSOLUTE_PATH}') center/cover no-repeat; }
/* Dark overlay for text legibility */
.overlay { position:absolute; top:0; left:0; right:0; bottom:0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%); }
/* Blue top bar */
.top-bar { position:absolute; top:0; left:0; right:0; height:80px;
  background:#00A5EC; display:flex; align-items:center;
  justify-content:space-between; padding:0 56px; }
.logo { height:44px; filter:brightness(0) invert(1); }
.handle { font-size:26px; font-weight:600; color:rgba(255,255,255,0.80); }
/* Room info overlay */
.room-info { position:absolute; bottom:56px; left:56px; }
.room-label { font-size:28px; font-weight:700; color:#D9F4FF;
  text-transform:uppercase; letter-spacing:0.12em; margin-bottom:12px; }
.room-desc { font-size:40px; font-weight:900; color:#FFFFFF;
  line-height:1.2; max-width:860px; }
```

### Task 2: renderizar-screenshots
- Start HTTP server on port 8765 serving the slides output folder
- Navigate to slide-01.html, resize to 1080×1440, take screenshot
- Verify slide 1: photo loaded, top bar visible, text readable → if fail, stop and report
- Batch render slides 2 through N
- Stop HTTP server
- Output render manifest with all PNG file paths

## Output Format

```markdown
# Slides Criados — [Property description]

## HTML Files
[Table: slide number | filename | category | photo used]

## Render Manifest
[Table: slide number | PNG filename | status | verification note]

## Output
Pasta: [absolute path]
Total de slides: [N] PNG

Pronto para revisão de qualidade.
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
# Slides Criados — Casa Nagoya Tenpaku · 3Q · ¥28,800,000

## HTML Files
| # | Arquivo | Categoria | Foto |
|---|---------|-----------|------|
| 01 | slide-01.html | Capa (Template B) | C:/.../01-fachada.jpg ✓ |
| 02 | slide-02.html | Garagem | C:/.../02-garagem.jpg ✓ |
| 03 | slide-03.html | Sala | C:/.../03-sala.jpg ✓ |
| 04 | slide-04.html | Cozinha | C:/.../04-cozinha.jpg ✓ |
| 05 | slide-05.html | Ofurô | C:/.../05-ofuro.jpg ✓ |
| 06 | slide-06.html | Quarto Principal | C:/.../06-quarto-01.jpg ✓ |
| 07 | slide-07.html | Quintal | C:/.../07-quintal.jpg ✓ |
| 08 | slide-08.html | CTA | (sem foto) |

## Render Manifest
| # | PNG | Status | Nota |
|---|-----|--------|------|
| 1 | slide-01.png | ✓ Verificado | Fachada carregada, top bar visível, card branco com ¥28,800,000 |
| 2 | slide-02.png | ✓ OK | |
| 3 | slide-03.png | ✓ OK | |
| 4 | slide-04.png | ✓ OK | |
| 5 | slide-05.png | ✓ OK | |
| 6 | slide-06.png | ✓ OK | |
| 7 | slide-07.png | ✓ OK | Upsell "área gourmet" visível |
| 8 | slide-08.png | ✓ OK | CTA azul, logo e WhatsApp visíveis |

## Output
Pasta: C:/.../squads/imoveis-instagram/output/2026-04-13-143022/slides/v1/
Total de slides: 8 PNG

Pronto para revisão de qualidade.
```

## Veto Conditions

Reject and redo if ANY are true:
1. Any photo file path is broken (image loads as broken or shows fallback) — real property photos are mandatory for all non-CTA slides
2. Slide 1 does not match Template B structure (blue bar + photo area + white info card) — the approved template is non-negotiable for the cover

## Quality Criteria

- [ ] All HTML files generated with real photo paths (not placeholders)
- [ ] Slide 1 follows Template B structure exactly
- [ ] All photo slides have dark overlay and blue top bar
- [ ] CTA slide has solid #00A5EC background
- [ ] All font sizes ≥24px
- [ ] Slide 1 screenshot verified before batch
- [ ] All PNG files present in output folder
