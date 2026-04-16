---
type: checkpoint
outputFile: squads/imoveis-instagram/output/property-focus.md
---

# Step 01: Selecionar Imóvel

## Auto-detecção de imóvel novo

As pastas de imóveis ficam sempre em:
```
C:\Users\rafas\Documents\Coding Projects\Automação Post Casa\properties\
```

**Processo de auto-detecção:**
1. Listar todas as subpastas em `properties/`
2. Ler `squads/imoveis-instagram/_memory/runs.md` para obter lista de imóveis já publicados (coluna "Tema")
3. Filtrar pastas que ainda **não** aparecem no histórico
4. Se restar **apenas 1** pasta não publicada → selecioná-la automaticamente, sem perguntar ao usuário
5. Se restar **mais de 1** → apresentar apenas as não publicadas via AskUserQuestion
6. Se **todas** já foram publicadas → perguntar ao usuário qual deseja republicar

> **Nota:** O campo "Tema" em runs.md deve sempre conter o nome exato da pasta do imóvel (ex: `Gifu-Ken Minokamu-Shi Nakatomi-Cho (Casa-B) 2,458万`) para que a auto-detecção funcione.

A pasta do imóvel deve conter:
- Um arquivo `imovel.md` (ou `imovel.txt`) com os dados do imóvel
- As fotos do imóvel nos formatos JPG, JPEG ou PNG
- As fotos devem ter nomes que identifiquem o cômodo (ex: `01-fachada.jpg`, `03-sala.jpg`)
