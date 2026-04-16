/**
 * scheduled-publish.js
 * Publicação agendada — Casa Komaki-Ikenouchi
 * Agendado para: 16/04/2026 às 12:00 JST
 * Carousel container ID: 18049448228738337
 */

import { publishMedia, getPermalink } from '../../../skills/instagram-publisher/scripts/publish.js';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = resolve(__dirname, '../../queue.json');

const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID } = process.env;
const CAROUSEL_ID = '18049448228738337';

console.log(`🚀 Publicando carousel ${CAROUSEL_ID}...`);
const postId = await publishMedia(INSTAGRAM_USER_ID, CAROUSEL_ID, INSTAGRAM_ACCESS_TOKEN);
const permalink = await getPermalink(postId, INSTAGRAM_ACCESS_TOKEN);

console.log(`✅ Publicado!`);
console.log(`   Post ID: ${postId}`);
if (permalink) console.log(`   URL: ${permalink}`);

// Update queue.json
const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
queue.scheduled = queue.scheduled || [];
queue.scheduled.push({
  postId,
  scheduledUnixTs: Math.floor(new Date('2026-04-16T03:00:00Z').getTime() / 1000),
  scheduledJST: '16/04/2026, 12:00 JST',
  caption: 'Casa nova em Komaki: 3 vagas, 379m² de terreno...',
  addedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  permalink,
});
writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
console.log('   queue.json atualizado ✓');
