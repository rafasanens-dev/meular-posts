#!/usr/bin/env node
/**
 * run-scheduled.js
 * Verifica scheduled-posts.json e publica posts agendados no Instagram.
 * Executado automaticamente pelo GitHub Actions (cron a cada 15 min).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createChildContainer,
  pollUntilFinished,
  createCarouselContainer,
  publishMedia,
  getPermalink,
} from './skills/instagram-publisher/scripts/publish.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEDULE_PATH = resolve(__dirname, 'scheduled-posts.json');

const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID } = process.env;
if (!INSTAGRAM_ACCESS_TOKEN) throw new Error('INSTAGRAM_ACCESS_TOKEN não configurado');
if (!INSTAGRAM_USER_ID) throw new Error('INSTAGRAM_USER_ID não configurado');

const schedule = JSON.parse(readFileSync(SCHEDULE_PATH, 'utf8'));
const now = Date.now();

const duePosts = schedule.posts.filter(
  p => p.status === 'pending' && new Date(p.scheduledAt).getTime() <= now
);

if (duePosts.length === 0) {
  console.log('Nenhum post agendado para publicar agora.');
  const pending = schedule.posts.filter(p => p.status === 'pending');
  if (pending.length > 0) {
    console.log('\nPróximos posts agendados:');
    for (const p of pending) {
      const dt = new Date(p.scheduledAt).toLocaleString('pt-BR', { timeZone: 'Asia/Tokyo' });
      console.log(`  • ${p.id} → ${dt} JST`);
    }
  }
  process.exit(0);
}

console.log(`${duePosts.length} post(s) para publicar.\n`);

for (const post of duePosts) {
  console.log(`${'━'.repeat(50)}`);
  console.log(`Publicando: ${post.id}`);
  console.log(`Agendado para: ${post.scheduledAt}`);
  console.log(`${'━'.repeat(50)}`);

  try {
    // 1. Criar containers filhos
    console.log(`\n1/4 Criando ${post.slides.length} containers de imagem...`);
    const childIds = [];
    for (const [i, url] of post.slides.entries()) {
      const id = await createChildContainer(INSTAGRAM_USER_ID, url, INSTAGRAM_ACCESS_TOKEN);
      childIds.push(id);
      console.log(`   [${i + 1}/${post.slides.length}] ${id}`);
    }

    // 2. Aguardar processamento
    console.log('\n2/4 Aguardando processamento dos containers...');
    await Promise.all(childIds.map(id => pollUntilFinished(id, INSTAGRAM_ACCESS_TOKEN)));
    console.log('   Todos prontos ✓');

    // 3. Criar carousel container
    console.log('\n3/4 Criando carousel container...');
    const carouselId = await createCarouselContainer(
      INSTAGRAM_USER_ID, childIds, post.caption, INSTAGRAM_ACCESS_TOKEN
    );
    await pollUntilFinished(carouselId, INSTAGRAM_ACCESS_TOKEN);
    console.log(`   Carousel ID: ${carouselId}`);

    // 4. Publicar
    console.log('\n4/4 Publicando no Instagram...');
    const postId = await publishMedia(INSTAGRAM_USER_ID, carouselId, INSTAGRAM_ACCESS_TOKEN);
    const permalink = await getPermalink(postId, INSTAGRAM_ACCESS_TOKEN);

    console.log(`\n✅ Publicado com sucesso!`);
    console.log(`   Post ID: ${postId}`);
    if (permalink) console.log(`   URL: ${permalink}`);

    // Atualizar status no JSON
    post.status = 'published';
    post.publishedAt = new Date().toISOString();
    post.postId = postId;
    post.permalink = permalink ?? null;

  } catch (err) {
    console.error(`\n❌ Erro ao publicar ${post.id}: ${err.message}`);
    post.status = 'error';
    post.error = err.message;
    post.errorAt = new Date().toISOString();
    process.exitCode = 1;
  }
}

writeFileSync(SCHEDULE_PATH, JSON.stringify(schedule, null, 2));
console.log('\nscheduled-posts.json atualizado ✓');
