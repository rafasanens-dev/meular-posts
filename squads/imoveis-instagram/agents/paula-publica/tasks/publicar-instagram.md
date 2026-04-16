---
task: "Publicar no Instagram"
order: 1
input: |
  - slides_folder: Path to rendered PNG files (from Diana's output)
  - copy_file: Path to copy.md (caption text)
  - instagram_publisher_skill: skills/instagram-publisher/SKILL.md
output: |
  - publication_result: Post URL, post ID, timestamp, slide count
  - dry_run_result: Dry-run output before real publication
---

# Publicar no Instagram

Validate the generated images and caption, present a full preview, run a dry-run, wait for explicit user confirmation, and then publish the carousel to @meular.jp via the Instagram Graph API.

## Process

1. **List and validate image files:**
   - List all PNG files in the slides folder, in slide-NN order
   - Count slides (must be 2–10 inclusive)
   - If < 2: stop with error "Mínimo 2 slides para publicar carrossel"
   - If > 10: stop with error "Máximo 10 slides para carrossel Instagram. Remover X slides antes de publicar."

2. **Validate image format (JPEG required):**
   - Instagram Graph API requires JPEG for carousel media
   - Check if files are PNG: if yes, convert each PNG to JPEG before upload
   - Inform user: "Convertendo [N] arquivos PNG para JPEG antes do upload."
   - Do NOT silently convert without informing — the user needs to know the format changed

3. **Validate image dimensions:**
   - Each image must be exactly 1080×1440px
   - If any image is a different size: stop with error "[filename] tem dimensões [W]×[H]px — esperado 1080×1440px. Corrigir antes de publicar."

4. **Read and validate caption:**
   - Read caption from copy.md
   - Count total characters (≤2200 required)
   - Count hashtags (≤30 required, 3–5 recommended)
   - If >2200 chars: stop and show the user exactly where to cut

5. **Check rate limits:**
   - Run: `node skills/instagram-publisher/scripts/publish.js --check-rate-limit`
   - Report: "X de 25 posts usados nas últimas 24h"
   - If ≥ 20: warn the user before proceeding

6. **Present pre-publish preview:**
   ```
   ═══════════════════════════════════════
   📋 Preview de Publicação — @meular.jp
   ═══════════════════════════════════════
   Conta: @meular.jp
   Slides: [N] imagens
     [01] slide-01.jpg (1080×1440px) ✓
     [02] slide-02.jpg (1080×1440px) ✓
     ...
   Legenda: [first 200 chars]...
   Hashtags: [list]
   Chars: [N]/2200
   Rate limit: [N]/25 posts nas últimas 24h
   Validação: ✓ Todos os checks passaram
   ═══════════════════════════════════════
   ```

7. **Execute dry-run:**
   - Run: `node skills/instagram-publisher/scripts/publish.js --dry-run --images [list] --caption "[caption]"`
   - Show output to user
   - If dry-run fails: report the exact error code and message. Stop. Do NOT proceed to real publication.
   - If dry-run succeeds: present confirmation prompt

8. **Wait for explicit user confirmation:**
   Ask the user: "Dry-run aprovado. Publicar agora no @meular.jp? (responda 'sim' para confirmar)"
   - If user says anything other than an affirmative: abort. "Publicação cancelada. Os slides estão salvos em [folder]."
   - If user confirms: proceed to step 9.

9. **Publish:**
   - Run: `node skills/instagram-publisher/scripts/publish.js --images [list] --caption "[caption]"`
   - Capture: post URL, post ID, timestamp from API response
   - Save to `output/publication-result.md`

10. **Report result:**
    - Success: "Publicado com sucesso! 🎉\nURL: [post URL]\nPost ID: [id]\nPublicado: [timestamp]"
    - Failure: "Falha na publicação. HTTP [code]: [message]\nSugestão: [corrective action]"

## Output Format

```markdown
# Resultado da Publicação

## Dry-Run
Status: [Passou / Falhou]
Output: [dry-run output summary]

## Publicação
Status: [Publicado / Cancelado / Falhou]
URL: [post URL or N/A]
Post ID: [id or N/A]
Timestamp: [ISO timestamp or N/A]
Slides publicados: [N]
Legenda: [first 100 chars]...
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
# Resultado da Publicação

## Preview Apresentado
- Conta: @meular.jp
- 8 slides (1080×1440px, JPEG) ✓
- Legenda: 512 chars, 5 hashtags ✓
- Rate limit: 3/25 posts nas últimas 24h ✓

## Dry-Run
Status: Passou ✓
Output: Media containers criados. Carousel container validado. Pronto para publicar.

## Confirmação do Usuário
Recebida: "sim" às 14:35:22

## Publicação
Status: Publicado ✓
URL: https://www.instagram.com/p/XXXXXXXX/
Post ID: 17938579521234567
Timestamp: 2026-04-13T14:35:28Z
Slides publicados: 8
Legenda: "Casa reformada em Nagoya: 3 quartos, garagem dupla e ofurô completo. 🏡..."
```

## Quality Criteria

- [ ] Slide count validated (2–10 inclusive)
- [ ] All images validated as JPEG and 1080×1440px
- [ ] Caption validated for length (≤2200 chars)
- [ ] Preview presented before dry-run
- [ ] Dry-run executed and result shown to user
- [ ] Explicit user confirmation received before real publication
- [ ] Post URL returned in result on success

## Veto Conditions

Reject and redo if ANY are true:
1. Real publication triggered without explicit user confirmation — this is an irreversible public action; automated publishing without consent is prohibited
2. Success reported without a valid post URL — a publication cannot be confirmed without the URL; if the API returned no URL, the publication status is unknown and must be reported as such
