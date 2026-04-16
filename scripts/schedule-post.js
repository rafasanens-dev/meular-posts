#!/usr/bin/env node
/**
 * schedule-post.js
 * Agenda um post no Instagram:
 *   1. Copia slides para posts/{property-id}/
 *   2. Calcula próximo slot disponível
 *   3. Adiciona entrada no scheduled-posts.json
 *   4. Faz git push (GitHub Actions publica no horário)
 *
 * Uso:
 *   node scripts/schedule-post.js \
 *     --property-id <slug>       ex: komaki-ikenouchi
 *     --slides-dir  <path>       pasta com arquivos *-ig.jpg
 *     --caption-file <path>      arquivo legenda.md ou copy.md
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { nextSlot, addToQueue } from '../skills/instagram-publisher/scripts/scheduler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Argumentos ────────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name) {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
}

const propertyId  = getArg('--property-id');
const slidesDirRaw = getArg('--slides-dir');
const captionFile = getArg('--caption-file');

if (!propertyId)  throw new Error('--property-id é obrigatório (ex: komaki-ikenouchi)');
if (!slidesDirRaw) throw new Error('--slides-dir é obrigatório');
if (!captionFile)  throw new Error('--caption-file é obrigatório');

const slidesDir = resolve(slidesDirRaw);
if (!existsSync(slidesDir)) throw new Error(`Pasta de slides não encontrada: ${slidesDir}`);
if (!existsSync(captionFile)) throw new Error(`Arquivo de legenda não encontrado: ${captionFile}`);

// ── 1. Descobrir slides ───────────────────────────────────────
const slideFiles = readdirSync(slidesDir)
  .filter(f => f.endsWith('-ig.jpg'))
  .sort();

if (slideFiles.length < 2 || slideFiles.length > 10) {
  throw new Error(`Número inválido de slides: ${slideFiles.length} (precisa ser entre 2 e 10)`);
}

console.log(`\n📂 ${slideFiles.length} slides encontrados em ${slidesDir}`);

// ── 2. Copiar slides para posts/{property-id}/ ────────────────
const destDir = join(ROOT, 'posts', propertyId);
mkdirSync(destDir, { recursive: true });

const slideUrls = [];
for (const [i, file] of slideFiles.entries()) {
  const num = String(i + 1).padStart(2, '0');
  const destName = `slide-${num}.jpg`;
  copyFileSync(join(slidesDir, file), join(destDir, destName));
  slideUrls.push(
    `https://raw.githubusercontent.com/rafasanens-dev/meular-posts/main/posts/${propertyId}/${destName}`
  );
  console.log(`   [${num}] ${file} → posts/${propertyId}/${destName}`);
}

// ── 3. Extrair legenda ────────────────────────────────────────
const raw = readFileSync(captionFile, 'utf8');
let caption = '';

// Tenta extrair entre === LEGENDA === e === METADADOS ===
const match = raw.match(/===\s*LEGENDA\s*===\s*\n([\s\S]*?)\n===\s*METADADOS/i);
if (match) {
  caption = match[1].trim();
} else {
  // Fallback: usa o arquivo inteiro (sem linhas de metadados)
  caption = raw.replace(/===.*===/g, '').trim();
}

if (!caption) throw new Error('Legenda vazia — verifique o arquivo de legenda');
console.log(`\n📝 Legenda extraída (${caption.length} chars)`);

// ── 4. Calcular próximo slot ──────────────────────────────────
const queuePath = join(ROOT, 'squads', 'imoveis-instagram', 'queue.json');
const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
const slot = nextSlot(queue);

console.log(`\n📅 Próximo slot disponível: ${slot.label}`);

// ── 5. Atualizar scheduled-posts.json ────────────────────────
const schedulePath = join(ROOT, 'scheduled-posts.json');
const schedule = JSON.parse(readFileSync(schedulePath, 'utf8'));

schedule.posts.push({
  id: propertyId,
  scheduledAt: new Date(slot.unixTs * 1000).toISOString(),
  caption,
  slides: slideUrls,
  status: 'pending',
});

writeFileSync(schedulePath, JSON.stringify(schedule, null, 2));
console.log(`✅ scheduled-posts.json atualizado`);

// ── 6. Atualizar queue.json ───────────────────────────────────
addToQueue(queue, {
  postId: propertyId,
  scheduledUnixTs: slot.unixTs,
  caption: caption.slice(0, 60),
});
writeFileSync(queuePath, JSON.stringify(queue, null, 2));

// ── 7. Git push ───────────────────────────────────────────────
console.log('\n🚀 Fazendo git push...');
try {
  execSync('git add .', { cwd: ROOT, stdio: 'inherit' });
  execSync(`git commit -m "feat: agendar post ${propertyId}"`, { cwd: ROOT, stdio: 'inherit' });
  execSync('git pull --rebase', { cwd: ROOT, stdio: 'inherit' });
  execSync('git push', { cwd: ROOT, stdio: 'inherit' });
  console.log('   Push feito ✓');
} catch (err) {
  throw new Error(`Erro no git push: ${err.message}`);
}

// ── Resultado ─────────────────────────────────────────────────
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Post agendado com sucesso!

   Propriedade: ${propertyId}
   Publicação:  ${slot.label}
   Slides:      ${slideUrls.length} imagens em posts/${propertyId}/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
