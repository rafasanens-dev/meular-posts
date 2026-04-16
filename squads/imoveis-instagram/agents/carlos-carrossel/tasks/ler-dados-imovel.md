---
task: "Ler Dados do Imóvel"
order: 1
input: |
  - property_focus: Path to the property folder (from step-01 checkpoint output in property-focus.md)
output: |
  - property_data: Structured property data extracted from images _2 and _3 (type, city, price, specs, station)
  - photo_inventory: Ordered list of photo files with category mapping (visual classification)
  - selected_slides: Final list of photos to use (max 10), with selection rationale if any were dropped
  - missing_fields: List of any required fields that could not be extracted from _2 or _3 images
---

# Ler Dados do Imóvel

Read property data directly from the images in the folder. Image `_2` contains a Portuguese-language summary with key property details. Image `_3` contains the Japanese info sheet with full specs. All other images (except `_1`) are property photos to be visually classified by room type.

## Folder Structure Convention

The property folder follows this convention:
- **`*_1*`** — Cover image made by the real estate agency. **Always skip — do not use.**
- **`*_2*`** — Text image with property details summarized in Portuguese. **Read to extract all structured data.**
- **`*_3*`** — Japanese info sheet (物件概要 / 間取り etc.). **Read to complement data from _2.**
- **All other images** — Property photos (rooms, exterior, etc.). **Classify visually.**
- **`imovel.md` or `imovel.txt`** (optional) — Manual data override. If present, use it as the primary source and skip _2/_3 extraction.

## Process

1. **Read property-focus.md** — extract the path to the property folder. This file was written by the step-01 checkpoint.

2. **List all files** in the property folder. Separate into:
   - Data images: files containing `_1`, `_2`, `_3` in their name
   - Photo files: all other jpg/jpeg/png files
   - Optional text file: imovel.md or imovel.txt (if present, use as primary source)

3. **Extract property data:**
   - If `imovel.md` / `imovel.txt` exists → read it as primary source, skip to step 4
   - Otherwise: read image `_2` (Portuguese summary) — extract all visible text fields:
     - `tipo` (Casa / Apartamento / Sobrado / Terreno / マンション→Apartamento / 戸建→Casa)
     - `status` (À VENDA / RECÉM REFORMADO / NOVO — default to À VENDA if not specified)
     - `cidade` and `bairro`
     - `estação` and `distância a pé` (minutes walking)
     - `preço` in ¥
     - `quartos`, `banheiros`, `vagas`, `área em m²`
     - `pet permitido` (Sim / Não)
     - `reformado` (Sim / Não + any renovation details)
     - `destaques especiais` (any highlighted features)
     - `WhatsApp` link (use wa.me/819099221830 as default if not found)
   - Then read image `_3` (Japanese info sheet) — extract any data missing from `_2`:
     - 駅 (station) → estação + 徒歩 (walking) → distância a pé
     - 価格 (price) → preço
     - 間取り (floor plan code, e.g. 3LDK) → quartos count
     - 土地面積 / 建物面積 (land/building area) → área m²
     - 築年数 (building age) → ano de construção
     - ペット可 → pet permitido: Sim
     - 駐車場 (parking) → vagas
     - Fill in any gaps from step 3's _2 read

4. **Visually classify all photo files** (skip `_1`):
   Open each photo file and identify the room/area shown:
   - fachada — exterior front view of the building
   - garagem / estacionamento — parking area or garage
   - entrada — entrance hall / genkan
   - sala — living room / dining area
   - cozinha — kitchen
   - ofurô — Japanese-style bath (distinct tub/unit)
   - banheiro — bathroom / toilet area
   - quarto — bedroom
   - varanda / sacada — balcony or engawa
   - quintal — outdoor garden or yard area
   - outros — any space that doesn't fit the above

5. **Apply slide selection** if photo count > 9 (leaving room for CTA slide):
   Priority order: fachada (1, mandatory) → sala (1 best) → cozinha (1 best) → ofurô (1 best) → quarto principal (1) → garagem (1) → quintal (1) → varanda (1) → entrada (1) → outros (fill to max 9)
   Note which photos were excluded and why.

6. **Flag missing required fields**: If any of the following could not be extracted, add to `missing_fields`:
   - estação + distância a pé (critical)
   - preço (critical)
   - tipo (critical)
   - cidade (critical)
   - quartos / m² (important)

## Output Format

```yaml
property_data:
  tipo: "Casa Residencial"
  status: "À VENDA"
  cidade: "Nagoya, Aichi"
  bairro: "Tenpaku-ku"
  estacao: "Jingumae"
  distancia_pe: "5"  # minutes
  preco: "¥28,800,000"
  quartos: 3
  banheiros: 2
  vagas: 2
  area_m2: 98
  pet_ok: true
  reformado: true
  reforma_descricao: "Hidráulica, elétrica e piso renovados em 2024"
  destaques: "Ofurô completo, varanda espaçosa, quintal com área coberta"
  whatsapp: "wa.me/819099221830"

photo_inventory:
  - file: "01-fachada.jpg"
    category: "fachada"
    selected: true
    order: 1
  - file: "02-garagem.jpg"
    category: "garagem"
    selected: true
    order: 2
  - file: "03-sala.jpg"
    category: "sala"
    selected: true
    order: 3

selected_slides:
  - order: 1
    category: fachada
    file: "01-fachada.jpg"
    note: "Cover slide — Template B structure"
  - order: 2
    category: garagem
    file: "02-garagem.jpg"
  # ... remaining slides

missing_fields: []  # or list of missing field names
```

## Output Example

> Use as quality reference, not as rigid template.

```yaml
property_data:
  tipo: "Casa Residencial"
  status: "À VENDA"
  cidade: "Nagoya, Aichi"
  bairro: "Tenpaku-ku"
  estacao: "Jingumae"
  distancia_pe: "5"
  preco: "¥28,800,000"
  quartos: 3
  banheiros: 2
  vagas: 2
  area_m2: 98
  pet_ok: true
  reformado: true
  reforma_descricao: "Reforma completa em 2024: hidráulica, elétrica, piso e cozinha planejada"
  destaques: "Ofurô completo, quintal com cobertura parcial, garagem dupla coberta"
  whatsapp: "wa.me/819099221830"

photo_inventory:
  - file: "01-fachada.jpg"
    category: "fachada"
    selected: true
    order: 1
  - file: "02-garagem.jpg"
    category: "garagem"
    selected: true
    order: 2
  - file: "03-sala.jpg"
    category: "sala"
    selected: true
    order: 3
  - file: "04-cozinha.jpg"
    category: "cozinha"
    selected: true
    order: 4
  - file: "05-ofuro.jpg"
    category: "ofurô"
    selected: true
    order: 5
  - file: "06-quarto-01.jpg"
    category: "quarto"
    selected: true
    order: 6
  - file: "07-quintal.jpg"
    category: "quintal"
    selected: true
    order: 7
  - file: "08-quarto-02.jpg"
    category: "quarto"
    selected: false
    drop_reason: "Max 10 slides reached — selected quarto principal only"

selected_slides:
  - order: 1
    category: fachada
    file: "01-fachada.jpg"
    note: "Cover slide"
  - order: 2
    category: garagem
    file: "02-garagem.jpg"
  - order: 3
    category: sala
    file: "03-sala.jpg"
  - order: 4
    category: cozinha
    file: "04-cozinha.jpg"
  - order: 5
    category: ofurô
    file: "05-ofuro.jpg"
  - order: 6
    category: quarto
    file: "06-quarto-01.jpg"
  - order: 7
    category: quintal
    file: "07-quintal.jpg"
  - order: 8
    category: cta
    file: null
    note: "CTA slide — no photo, solid #00A5EC background"

missing_fields: []
```

## Quality Criteria

- [ ] All required fields extracted from imovel.md (or flagged as missing)
- [ ] Every photo in the folder is listed in photo_inventory with category assignment
- [ ] Selection respects max 10 slides (including CTA)
- [ ] Drop rationale provided for any excluded photos
- [ ] CTA slide always added as the final slide in selected_slides (file: null)

## Veto Conditions

Reject and redo if ANY are true:
1. `estacao` or `distancia_pe` is missing from property_data AND not listed in missing_fields — this data must either be extracted or explicitly flagged as absent
2. `preco` is missing from property_data AND not listed in missing_fields — price is mandatory for slide 1
