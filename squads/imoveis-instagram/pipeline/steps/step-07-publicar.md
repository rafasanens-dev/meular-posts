---
execution: inline
agent: squads/imoveis-instagram/agents/paula-publica
inputFile: squads/imoveis-instagram/output/slides/
outputFile: squads/imoveis-instagram/output/publication-result.md
---

# Step 07: Agendar Publicação no Instagram

## Context Loading

Load these files before executing:
- `squads/imoveis-instagram/state.json` — current run ID and metadata
- `squads/imoveis-instagram/output/` — find the current run's slides folder
- `squads/imoveis-instagram/output/legenda.md` or `copy.md` — caption text

## Instructions

Paula Publica executes this step. She runs the automated scheduling pipeline:

### Process

1. **Determinar run atual** — ler `squads/imoveis-instagram/state.json` para obter o run ID atual (campo `startedAt` ou o nome da pasta de output)

2. **Encontrar slides** — localizar os arquivos `*-ig.jpg` na pasta:
   `squads/imoveis-instagram/output/{run-id}/slides/`

3. **Determinar property-id** — criar um slug limpo a partir do nome da pasta da propriedade em `property-focus.md`:
   - Usar cidade + bairro em minúsculas separados por hífen
   - Exemplos: `komaki-ikenouchi`, `nagoya-minato`, `minokamu-nakatomi`

4. **Localizar legenda** — verificar nesta ordem:
   - `squads/imoveis-instagram/output/{run-id}/legenda.md`
   - `squads/imoveis-instagram/output/legenda.md`
   - `squads/imoveis-instagram/output/copy.md`

5. **Determinar caminho da pasta da propriedade** — ler `property-focus.md` para obter o caminho completo em `properties/` (campo **Property Folder**)

6. **Executar o script de agendamento:**
   ```
   node scripts/schedule-post.js \
     --property-id {property-id} \
     --slides-dir squads/imoveis-instagram/output/{run-id}/slides \
     --caption-file {caminho-da-legenda} \
     --property-folder "{caminho-completo-da-pasta-em-properties}"
   ```

6. **Reportar resultado** — mostrar ao usuário a data/hora de publicação agendada

### O que o script faz automaticamente
- Copia os slides para `posts/{property-id}/`
- Adiciona o post ao `scheduled-posts.json`
- Faz `git push` → GitHub Actions publica no horário certo

## Output Format

```markdown
# Agendamento Concluído

## Post
- Propriedade: {property-id}
- Slides: {N} imagens copiadas para posts/{property-id}/
- Legenda: {N} chars

## Agendamento
- Data: {dia da semana}, {data} às {hora} JST
- GitHub Actions publicará automaticamente

## Arquivos Atualizados
- scheduled-posts.json ✓
- posts/{property-id}/ ✓ ({N} slides)
- git push ✓
```

## Veto Conditions

Reject and report error if ANY are true:
1. Slides não encontrados na pasta de output
2. Legenda vazia ou não encontrada
3. Erro no git push — reportar mensagem de erro ao usuário
4. Menos de 2 ou mais de 10 slides

## Quality Criteria

- [ ] property-id é um slug limpo (sem caracteres especiais, só letras, números e hífens)
- [ ] Slides copiados corretamente para posts/{property-id}/
- [ ] scheduled-posts.json atualizado com status "pending"
- [ ] Pasta da propriedade movida para properties/Casas Publicadas/
- [ ] git push executado com sucesso
- [ ] Data de publicação reportada ao usuário
