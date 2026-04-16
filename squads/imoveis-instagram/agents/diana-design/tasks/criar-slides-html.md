---
task: "Criar Slides HTML"
order: 1
input: |
  - copy_file: Path to copy.md (Carlos's slide texts, caption, photo file paths)
  - template_reference: squads/imoveis-instagram/pipeline/data/template-reference.html
  - visual_identity: squads/imoveis-instagram/pipeline/data/visual-identity.md
  - photo_folder: Absolute path to the property's photo folder
output: |
  - html_files: List of HTML files created (slide-01.html through slide-NN.html)
  - output_folder: Absolute path to folder where HTML files are saved
---

# Criar Slides HTML

Generate one self-contained HTML file per carousel slide, using real property photos as background images. Slide 1 uses the approved Template B structure. Slides 2–N are photo slides with a top bar and room text overlay. The last slide is a CTA with solid #00A5EC background.

## Process

1. **Load context files:**
   - Read `copy.md` — extract slide texts, photo file paths, caption metadata
   - Read `template-reference.html` — use as the structural base for slide 1
   - Read `visual-identity.md` — use for all typography, color, and layout specifications
   - Note the absolute path to the property photo folder

2. **Verify all photo file paths:**
   Before writing any HTML, confirm that each photo file referenced in the slide texts actually exists on the filesystem. Use absolute paths (e.g., `C:/Users/rafas/.../property-folder/01-fachada.jpg`). If a photo is missing, report it immediately and stop — do not substitute with a placeholder.

3. **Generate slide-01.html (Cover — Template B):**
   Base structure from template-reference.html:
   - Top bar: `background: #00A5EC`, height 88px, logo (white filter) + @meular.jp handle
   - Photo area: height 912px, `background: url('{absolute-path-to-fachada}') center/cover no-repeat`
   - Yellow badge top-right: "À VENDA" or "RECÉM REFORMADO" (`#FFC857` bg, `#1F2937` text)
   - City overlay bottom-left of photo: "[City, Prefecture]" (48px/900/white)
   - White card: `border-top: 5px solid #00A5EC`, padding 32px 56px 36px 56px
   - Card content: type label (24px/700/uppercase, `#6B7280`) → title (44px/900, `#1F2937`) → spec chips (`#D9F4FF` bg, `#A8E4FB` border, 26px/700, `#0077B6`) → price (52px/900, `#00A5EC`) → station (26px/500, `#6B7280`)

4. **Generate slide-02.html through slide-NN.html (Photo slides):**
   For each room photo in selected_slides (excluding CTA):
   - Body: position relative, 1080×1440px
   - Photo background: `background: url('{absolute-path}') center/cover no-repeat`
   - Dark overlay: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%)`
   - Top bar: `background: #00A5EC`, height 80px, logo (white filter) + @meular.jp
   - Room info div (absolute, bottom 56px, left 56px):
     - Room label: UPPERCASE, 28px/700, `#D9F4FF`, letter-spacing 0.12em, margin-bottom 12px
     - Room description: 40px/900, `#FFFFFF`, line-height 1.2, max-width 860px

5. **Generate last slide — CTA (slide-NN.html):**
   - Body background: solid `#00A5EC`
   - Logo: centered, height 80px, `filter: brightness(0) invert(1)` (white on blue)
   - "Ficou interessado?": centered, 58px/900, white, margin-top 120px after logo
   - "Fale com a gente pelo WhatsApp": centered, 36px/500, white, margin-top 24px
   - "@meular.jp": centered, 28px/600, `rgba(255,255,255,0.70)`, margin-top 40px

6. **Save all HTML files** to `squads/imoveis-instagram/output/slides/` (or the run-scoped equivalent). File naming: slide-01.html, slide-02.html, ..., slide-NN.html (zero-padded to 2 digits).

## Output Format

```markdown
## Slides HTML Criados

Pasta: [absolute path to output folder]

| Slide | Arquivo | Categoria | Foto |
|-------|---------|-----------|------|
| 01 | slide-01.html | capa | 01-fachada.jpg |
| 02 | slide-02.html | garagem | 02-garagem.jpg |
| ... | ... | ... | ... |
| NN | slide-NN.html | cta | (sem foto) |

Total: [N] slides HTML criados
Pronto para renderização.
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
## Slides HTML Criados

Pasta: C:/Users/rafas/.../squads/imoveis-instagram/output/2026-04-13-143022/slides/v1/

| Slide | Arquivo | Categoria | Foto |
|-------|---------|-----------|------|
| 01 | slide-01.html | capa (Template B) | C:/.../01-fachada.jpg ✓ |
| 02 | slide-02.html | garagem | C:/.../02-garagem.jpg ✓ |
| 03 | slide-03.html | sala | C:/.../03-sala.jpg ✓ |
| 04 | slide-04.html | cozinha | C:/.../04-cozinha.jpg ✓ |
| 05 | slide-05.html | ofurô | C:/.../05-ofuro.jpg ✓ |
| 06 | slide-06.html | quarto principal | C:/.../06-quarto-01.jpg ✓ |
| 07 | slide-07.html | quintal | C:/.../07-quintal.jpg ✓ |
| 08 | slide-08.html | cta | (sem foto) |

Total: 8 slides HTML criados
Pronto para renderização.
```

## Quality Criteria

- [ ] Slide 1 follows Template B structure (top bar + photo 912px + white card)
- [ ] All photo slides use real property photos with absolute file paths
- [ ] Dark overlay applied to all photo slides (not to slide 1 card area or CTA)
- [ ] Top bar (#00A5EC) present in slides 1 through N-1
- [ ] CTA slide has solid #00A5EC background, no photo
- [ ] All font sizes ≥24px in every slide
- [ ] Logo uses `filter: brightness(0) invert(1)` on colored/dark backgrounds
- [ ] Files saved with zero-padded naming (slide-01, slide-02, not slide-1, slide-2)

## Veto Conditions

Reject and redo if ANY are true:
1. Any photo file path cannot be verified as existing — do not generate slides with broken image references; report the missing files and stop
2. Slide 1 does not follow the Template B structure from template-reference.html — the approved template is the visual identity anchor for the entire carousel
