/**
 * scheduled-publish.js — Casa Nagoya-Minato
 * Agendado para: 19/04/2026 às 19:00 JST
 *
 * Script auto-suficiente: inicia HTTP server, abre Cloudflare tunnel,
 * cria containers, aguarda processamento e publica.
 */

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '../../../..');
const SLIDES_DIR = resolve(__dirname, 'slides');
const QUEUE_PATH = resolve(__dirname, '../../queue.json');
const CLOUDFLARED = resolve(
  process.env.USERPROFILE || process.env.HOME,
  'AppData/Local/npm-cache/_npx/8a26fc3a61fe4212/node_modules/.bin/cloudflared.cmd'
);

const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID } = process.env;
const IG_BASE = 'https://graph.facebook.com/v21.0';

const CAPTION = `Casa nova em Nagoya: 4 vagas, 230m² de terreno e Walk-in Closet! 🏡

No bairro de Minato-ku, esta casa nova tem tudo que a sua família precisa: sala integrada espaçosa, cozinha moderna com bancada americana, ofurô completo e um terreno de 230m² com espaço de sobra para área gourmet e jardim.

🏠 Casa Nova · 4LDK · 103m² construídos
🌿 230m² de terreno
📍 Nagoya, Aichi — Minato-ku
💴 ¥36,900,000 (parcela a partir de ¥114.500/mês)

💛 Gostou dessa casa? Entre em contato hoje mesmo pelo número abaixo ou comente "GOSTEI" para mais informações sobre essa e outras disponíveis na região!
📲 Fale com a gente pelo WhatsApp: +81 90-9922-1830 (Rafael)

#meularjp #imoveisnojapo #casanojapo #nagoya #brasileirosnojapo`;

// ── HTTP Server ───────────────────────────────────────────────
function startServer(port = 8766) {
  return new Promise(resolve => {
    const server = createServer((req, res) => {
      const fp = join(SLIDES_DIR, req.url.replace(/^\//, ''));
      if (existsSync(fp) && statSync(fp).isFile()) {
        const ct = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' }[extname(fp)] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': ct });
        createReadStream(fp).pipe(res);
      } else {
        res.writeHead(404); res.end('Not found');
      }
    });
    server.listen(port, () => { console.log(`   HTTP server on port ${port}`); resolve(server); });
  });
}

// ── Cloudflare Tunnel ─────────────────────────────────────────
function startTunnel(port) {
  return new Promise((resolve, reject) => {
    const cf = spawn(CLOUDFLARED, ['tunnel', '--url', `http://localhost:${port}`, '--no-autoupdate']);
    const timeout = setTimeout(() => reject(new Error('Tunnel timeout')), 30000);
    cf.stderr.on('data', data => {
      const text = data.toString();
      const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
      if (match) {
        clearTimeout(timeout);
        console.log(`   Tunnel: ${match[0]}`);
        resolve({ url: match[0], process: cf });
      }
    });
    cf.on('error', err => { clearTimeout(timeout); reject(err); });
  });
}

// ── Instagram API ─────────────────────────────────────────────
async function createChildContainer(imageUrl) {
  const params = new URLSearchParams({ image_url: imageUrl, is_carousel_item: 'true', access_token: INSTAGRAM_ACCESS_TOKEN });
  const res = await fetch(`${IG_BASE}/${INSTAGRAM_USER_ID}/media?${params}`, { method: 'POST' });
  if (!res.ok) throw new Error(`createChildContainer failed: ${await res.text()}`);
  return (await res.json()).id;
}

async function pollUntilFinished(id, timeoutMs = 120000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const params = new URLSearchParams({ fields: 'status_code', access_token: INSTAGRAM_ACCESS_TOKEN });
    const res = await fetch(`${IG_BASE}/${id}?${params}`);
    const { status_code } = await res.json();
    if (status_code === 'FINISHED') return;
    if (status_code === 'ERROR') throw new Error(`Container ${id} in ERROR state`);
    await new Promise(r => setTimeout(r, 3000));
  }
  throw new Error(`Container ${id} timed out`);
}

async function createCarouselContainer(childIds) {
  const params = new URLSearchParams({ media_type: 'CAROUSEL', children: childIds.join(','), caption: CAPTION, access_token: INSTAGRAM_ACCESS_TOKEN });
  const res = await fetch(`${IG_BASE}/${INSTAGRAM_USER_ID}/media?${params}`, { method: 'POST' });
  if (!res.ok) throw new Error(`createCarouselContainer failed: ${await res.text()}`);
  return (await res.json()).id;
}

async function publishMedia(carouselId) {
  const params = new URLSearchParams({ creation_id: carouselId, access_token: INSTAGRAM_ACCESS_TOKEN });
  const res = await fetch(`${IG_BASE}/${INSTAGRAM_USER_ID}/media_publish?${params}`, { method: 'POST' });
  if (!res.ok) throw new Error(`publishMedia failed: ${await res.text()}`);
  return (await res.json()).id;
}

async function getPermalink(postId) {
  const params = new URLSearchParams({ fields: 'permalink', access_token: INSTAGRAM_ACCESS_TOKEN });
  const res = await fetch(`${IG_BASE}/${postId}?${params}`);
  const json = await res.json();
  return json.permalink ?? null;
}

// ── Main ──────────────────────────────────────────────────────
console.log('🏠 Publicação agendada — Casa Nagoya-Minato');
console.log('━'.repeat(50));

console.log('\n1️⃣  Iniciando servidor HTTP...');
const server = await startServer(8766);

console.log('2️⃣  Abrindo túnel Cloudflare...');
const { url: tunnelUrl, process: cfProcess } = await startTunnel(8766);
await new Promise(r => setTimeout(r, 3000)); // aguarda estabilizar

const slides = Array.from({ length: 10 }, (_, i) =>
  `${tunnelUrl}/slide-${String(i + 1).padStart(2, '0')}-ig.jpg`
);

console.log('\n3️⃣  Criando containers de imagem...');
const childIds = [];
for (const [i, url] of slides.entries()) {
  const id = await createChildContainer(url);
  childIds.push(id);
  console.log(`   [${i + 1}/10] ${id}`);
}

console.log('\n4️⃣  Aguardando processamento...');
await Promise.all(childIds.map(id => pollUntilFinished(id)));
console.log('   Todos prontos ✓');

console.log('\n5️⃣  Criando carousel container...');
const carouselId = await createCarouselContainer(childIds);
await pollUntilFinished(carouselId);
console.log(`   Carousel ID: ${carouselId}`);

console.log('\n6️⃣  Publicando...');
const postId = await publishMedia(carouselId);
const permalink = await getPermalink(postId);
console.log(`\n✅ Publicado com sucesso!`);
console.log(`   Post ID: ${postId}`);
if (permalink) console.log(`   URL: ${permalink}`);

// Update queue.json
const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
queue.scheduled = queue.scheduled || [];
queue.scheduled.push({
  postId, permalink,
  scheduledUnixTs: Math.floor(new Date('2026-04-19T10:00:00Z').getTime() / 1000),
  scheduledJST: '19/04/2026, 19:00 JST',
  caption: 'Casa nova em Nagoya: 4 vagas, 230m² de terreno e Walk-in Closet!',
  publishedAt: new Date().toISOString(),
});
writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));

// Cleanup
server.close();
cfProcess.kill();
process.exit(0);
