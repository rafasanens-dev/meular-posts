---
task: "Renderizar Screenshots"
order: 2
input: |
  - html_files: List of HTML files from criar-slides-html task
  - output_folder: Absolute path to slides folder
output: |
  - png_files: List of rendered PNG file paths (slide-01.png through slide-NN.png)
  - render_manifest: Summary of all rendered slides with verification status
---

# Renderizar Screenshots

Start a local HTTP server, navigate to each HTML slide in a Playwright browser, resize the viewport to exactly 1080×1440px, and take a PNG screenshot. Verify slide 1 before running the full batch. Save all screenshots as zero-padded PNG files.

## Process

1. **Start local HTTP server:**
   Use Node.js to start an HTTP server on port 8765 serving the output slides folder:
   ```javascript
   const http = require('http');
   const fs = require('fs');
   const path = require('path');

   const server = http.createServer((req, res) => {
     const filePath = path.join(OUTPUT_FOLDER, req.url === '/' ? 'index.html' : req.url);
     fs.readFile(filePath, (err, data) => {
       if (err) { res.writeHead(404); res.end(); return; }
       res.writeHead(200);
       res.end(data);
     });
   });
   server.listen(8765);
   ```
   Note: If port 8765 is already in use (server from a previous run still running), use the existing server — do not attempt to kill and restart.

2. **Render slide 1 first (verification step):**
   Using the image-creator skill (Playwright):
   - Navigate to `http://localhost:8765/slide-01.html`
   - Resize viewport to 1080×1440
   - Take screenshot, save as `slide-01.png` in output folder
   - **Inspect the screenshot:** Confirm that:
     a. The fachada photo is visible (not a broken image or fallback gradient)
     b. The blue top bar is present with the logo visible
     c. Text in the card is readable (not overflowing)
     d. The yellow badge "À VENDA" (or equivalent) is visible
   - If ANY check fails: report the specific issue and STOP. Do not proceed to batch render.
   - If all checks pass: proceed to step 3.

3. **Batch render remaining slides:**
   For each HTML file from slide-02.html to slide-NN.html:
   - Navigate to `http://localhost:8765/{slide-name}.html`
   - Resize viewport to 1080×1440
   - Take screenshot, save as `{slide-name}.png` in output folder

4. **Stop the HTTP server** after all screenshots are captured.

5. **Output render manifest:** List all generated PNG files with their paths and a brief verification note.

## Output Format

```markdown
## Render Manifest

Pasta de output: [absolute path]

| # | PNG | Status | Nota |
|---|-----|--------|------|
| 1 | slide-01.png | ✓ Verificado | Foto carregada, texto legível |
| 2 | slide-02.png | ✓ Renderizado | |
| ... | ... | ... | ... |
| N | slide-NN.png | ✓ Renderizado | CTA slide |

Total: [N] PNG gerados
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
## Render Manifest

Pasta de output: C:/Users/rafas/.../squads/imoveis-instagram/output/2026-04-13-143022/slides/v1/

| # | PNG | Status | Nota |
|---|-----|--------|------|
| 1 | slide-01.png | ✓ Verificado | Fachada carregada, top bar azul visível, card branco com preço ¥28,800,000 |
| 2 | slide-02.png | ✓ Renderizado | Garagem carregada, label "GARAGEM" visível |
| 3 | slide-03.png | ✓ Renderizado | Sala carregada, overlay aplicado |
| 4 | slide-04.png | ✓ Renderizado | Cozinha carregada |
| 5 | slide-05.png | ✓ Renderizado | Ofurô carregado |
| 6 | slide-06.png | ✓ Renderizado | Quarto principal carregado |
| 7 | slide-07.png | ✓ Renderizado | Quintal carregado, upsell text visível |
| 8 | slide-08.png | ✓ Renderizado | CTA slide — fundo azul, logo e WhatsApp visíveis |

Total: 8 PNG gerados
Pronto para revisão de qualidade (Renata).
```

## Quality Criteria

- [ ] Slide 1 verified before batch (photo loads, top bar visible, text readable)
- [ ] All N slides rendered and saved as PNG
- [ ] Files named with zero-padded numbering (slide-01, slide-02, not slide-1)
- [ ] All PNGs saved to the correct output folder
- [ ] HTTP server stopped after rendering
- [ ] Render manifest lists all files with paths

## Veto Conditions

Reject and redo if ANY are true:
1. Slide 1 verification failed (broken photo, missing top bar, or unreadable text) — fixing slide 1 first is mandatory before batch rendering; if the issue is a missing file path, return to criar-slides-html task
2. Any PNG file in the manifest is missing or 0 bytes — all slides must be successfully rendered; a partial batch is not acceptable
