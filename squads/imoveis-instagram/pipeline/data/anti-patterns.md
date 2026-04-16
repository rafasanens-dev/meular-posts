# Anti-Patterns — Post Casa: Carrossel de Imóveis

> These are real failure modes observed in real estate Instagram content — both from investigation profiles and domain research. Avoid all of these.

---

## Copy Anti-Patterns

### AP-C1: Generic Hook
**The mistake:** Opening the caption with "Confira este imóvel!", "Olha só!", "Incrível oportunidade!" or any variation that could apply to any listing.

**Why it fails:** The hook is the only text visible before "ver mais." If it's generic, 80% of the audience scrolls past without tapping. The Instagram algorithm also ranks engagement — a weak hook kills reach.

**Correct approach:** Open with a concrete data point ("Casa de 3 quartos com garagem dupla em Nagoya...") or a specific emotional benefit ("Já imaginou acender a churrasqueira no quintal depois do trabalho?").

---

### AP-C2: Missing Station Proximity
**The mistake:** Posting a Japan property listing without mentioning the nearest train station and walking distance.

**Why it fails:** Station proximity is the #1 search filter for real estate in Japan. Buyers won't inquire without this information — they assume the property is inconvenient. This was the single most consistent pattern across all 4 investigated profiles.

**Correct approach:** Always include "X min a pé da estação [Name]" — in slide 1 spec chips AND in the caption spec block.

---

### AP-C3: Superlative Language
**The mistake:** Using "incrível," "imperdível," "sensacional," "imóvel dos sonhos," "oportunidade única," "o melhor custo-benefício."

**Why it fails:** These terms are so overused in Brazilian real estate content that audiences have learned to tune them out. They signal low-quality copy and create buyer skepticism.

**Correct approach:** Replace with concrete facts. "Incrível" → "98m² com varanda." "Imperdível" → "¥28,800,000 — abaixo do mercado para a região." "Imóvel dos sonhos" → "Casa com ofurô, garagem e quintal."

---

### AP-C4: No WhatsApp CTA
**The mistake:** Ending the caption with "Entre em contato!" or "Saiba mais na bio" without a direct WhatsApp link.

**Why it fails:** For Brazilian buyers in Japan, WhatsApp is the primary conversion channel. "Bio" links require an extra step and lose conversions. No link = no lead.

**Correct approach:** Always include "📲 Fale com a gente pelo WhatsApp: wa.me/819099221830" as the last conversion line before hashtags.

---

### AP-C5: Dense Paragraph Caption
**The mistake:** Writing the caption as a wall of text with no line breaks, emojis, or structure.

**Why it fails:** Mobile users read Instagram captions in portrait orientation. Dense paragraphs are invisible — eyes skip to the end or the scroll button. Maximum 2 lines per paragraph on mobile.

**Correct approach:** Short paragraphs (1–2 lines), use line breaks aggressively, use spec-block emoji formatting (🏡 📍 💴).

---

### AP-C6: Hashtag Abuse
**The mistake:** Using 10–30 hashtags in every post, including generic tags (#house, #realestate, #japan, #beautiful, #home).

**Why it fails:** Instagram's algorithm no longer boosts reach from hashtag volume. Over-tagging looks spammy and signals low content quality to both algorithm and humans. Generic tags attract no targeted audience.

**Correct approach:** 3–5 highly specific hashtags. Always: #meularjp. Add: #imoveisnojapo, #casanojapo, and a city tag (#nagoya, #toyotajapan, etc.).

---

## Design Anti-Patterns

### AP-D1: Text Below 24px
**The mistake:** Using font sizes under 24px for any visible text in the slides.

**Why it fails:** Instagram carousel images display at ~390px wide on most phones. Text that looks fine on desktop at 14px is completely illegible on mobile at actual display size.

**Correct approach:** Minimum 24px for captions/labels. Main headlines: 40–66px. Specs/chips: 26px minimum.

---

### AP-D2: Text on Photo Without Overlay
**The mistake:** Placing text directly over a photo without a dark gradient or semi-transparent background.

**Why it fails:** Photo backgrounds vary wildly — a bright sky behind white text, a light-colored wall behind white text, are both unreadable. The text disappears.

**Correct approach:** Always add `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%)` as an overlay before placing any white text. For header bars, use solid #00A5EC background.

---

### AP-D3: Slide Number Counters
**The mistake:** Adding "1 / 7," "Slide 2," dot indicators, or arrow graphics to indicate position.

**Why it fails:** Instagram shows its own native navigation dots. Adding your own creates visual clutter and makes slides look amateurish. This was specifically absent in all high-quality profiles investigated.

**Correct approach:** No slide counters. Trust Instagram's native UI.

---

### AP-D4: Placeholder Gradients Instead of Real Photos
**The mistake:** Rendering the carousel with the template's placeholder gradient instead of the actual property photos.

**Why it fails:** Placeholder gradients were created for template preview/testing only. Publishing them would mean the audience sees a fake blue gradient instead of the actual property — immediately destroys credibility.

**Correct approach:** Always replace placeholder backgrounds with `url('{absolute-path-to-photo}') center/cover no-repeat` before rendering. Verify slide 1 screenshot before batch-rendering the rest.

---

### AP-D5: Skip Rendering Verification
**The mistake:** Triggering a batch render of all slides without first verifying that slide 1 looks correct.

**Why it fails:** If the HTML has a path error, font loading issue, or layout bug, all slides will be wrong. Catching it on slide 1 before batch saves significant time.

**Correct approach:** Render slide-01 first. Inspect it. Only proceed with batch if slide 1 passes visual check.

---

## Publication Anti-Patterns

### AP-P1: Publish Without User Confirmation
**The mistake:** Automatically publishing after a successful dry-run.

**Why it fails:** Dry-run success only means the API is correctly configured — it does not mean the content is approved. Posting to a public Instagram account without explicit user approval is an irreversible action.

**Correct approach:** After dry-run, present a full preview and wait for explicit "sim, publicar" from the user.

---

### AP-P2: Truncate Caption Silently
**The mistake:** Automatically cutting the caption at 2200 chars without informing the user.

**Why it fails:** The truncation point might cut the CTA or hashtags. The user might not notice until after publication.

**Correct approach:** If caption >2200 chars, stop and inform the user exactly how many chars to cut and what to remove.

---

### AP-P3: PNG Without Conversion
**The mistake:** Attempting to upload PNG files directly to Instagram Graph API.

**Why it fails:** Instagram Graph API requires JPEG for carousel media. PNG uploads will fail with a format error.

**Correct approach:** Convert all PNG → JPEG before upload. Inform the user that conversion happened.
