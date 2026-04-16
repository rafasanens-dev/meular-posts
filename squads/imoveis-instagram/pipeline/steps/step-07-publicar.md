---
execution: inline
agent: squads/imoveis-instagram/agents/paula-publica
inputFile: squads/imoveis-instagram/output/slides/
outputFile: squads/imoveis-instagram/output/publication-result.md
---

# Step 07: Publicar no Instagram

## Context Loading

Load these files before executing:
- `squads/imoveis-instagram/output/slides/` — PNG files from Diana's rendering
- `squads/imoveis-instagram/output/copy.md` — caption text and hashtags
- `skills/instagram-publisher/SKILL.md` — publish script instructions and API configuration

## Instructions

Paula Publica executes this step. She runs her `publicar-instagram` task:

### Process
1. **List PNG files** in the slides folder. Count slides (must be 2–10)
2. **Validate format** — convert PNG to JPEG if needed (inform user)
3. **Validate dimensions** — each image must be 1080×1440px
4. **Read caption** from copy.md — check length (≤2200 chars) and hashtag count
5. **Check rate limit** — report X/25 posts used in last 24h; warn if ≥20
6. **Present preview** — account, slides list with dimensions, caption preview (200 chars), hashtags, validation status
7. **Execute dry-run** — `node skills/instagram-publisher/scripts/publish.js --dry-run ...`
8. **Wait for explicit user confirmation** — do NOT publish without "sim"
9. **Publish** — `node skills/instagram-publisher/scripts/publish.js --images ... --caption "..."`
10. **Report result** — post URL, post ID, timestamp

### API Configuration
The instagram-publisher skill reads credentials from environment variables:
- `INSTAGRAM_ACCESS_TOKEN` — Instagram Graph API access token
- `INSTAGRAM_USER_ID` — Instagram account user ID
- `IMGBB_API_KEY` — imgBB image hosting key (for temporary public URLs)

If any credential is missing, stop with: "[CREDENTIAL_NAME] não configurado. Configure na skill instagram-publisher antes de publicar."

## Output Format

```markdown
# Resultado da Publicação

## Validação
- Slides: [N] imagens ✓
- Formato: JPEG ✓ (convertido de PNG: Sim/Não)
- Dimensões: 1080×1440px ✓
- Legenda: [N] chars ✓
- Rate limit: [N]/25 posts

## Dry-Run
Status: [Passou / Falhou]

## Confirmação
Recebida: [resposta do usuário] às [timestamp]

## Publicação
Status: Publicado ✓ / Cancelado / Falhou
URL: [post URL]
Post ID: [id]
Timestamp: [ISO timestamp]
```

## Output Example

> Use as quality reference, not as rigid template.

```markdown
# Resultado da Publicação

## Validação
- Slides: 8 imagens ✓
- Formato: JPEG ✓ (convertido de PNG: Sim — 8 arquivos)
- Dimensões: 1080×1440px ✓ (todos os 8 verificados)
- Legenda: 512 chars ✓ | 5 hashtags ✓
- Rate limit: 3/25 posts nas últimas 24h ✓

## Preview
Conta: @meular.jp
Slides: slide-01.jpg (1080×1440) · slide-02.jpg · ... · slide-08.jpg
Legenda: "Casa reformada em Nagoya: 3 quartos, garagem dupla e ofurô completo. 🏡..."
Hashtags: #meularjp #imoveisnojapo #casanojapo #nagoya #brasileirosnojapo

## Dry-Run
Status: Passou ✓
Containers criados: 8 media containers + 1 carousel container
API resposta: OK

## Confirmação
Recebida: "sim, publicar" às 14:35:22

## Publicação
Status: Publicado ✓
URL: https://www.instagram.com/p/XXXXXXXX/
Post ID: 17938579521234567
Timestamp: 2026-04-13T14:35:28Z
Slides publicados: 8
```

## Veto Conditions

Reject and redo if ANY are true:
1. Real publication was triggered without explicit user confirmation — this is non-negotiable regardless of dry-run result
2. Success is reported without a valid post URL — publication cannot be confirmed without proof

## Quality Criteria

- [ ] Preview presented before dry-run
- [ ] All validations passed (or issues reported to user)
- [ ] Dry-run executed and result reported
- [ ] User confirmation received and logged
- [ ] Post URL returned on success
- [ ] publication-result.md written with full metadata
