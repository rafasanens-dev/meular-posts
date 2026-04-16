/**
 * scheduler.js — Instagram posting queue manager
 *
 * Slot config lives in squads/imoveis-instagram/queue.json
 * Supports: nextSlot(), showQueue(), addToQueue()
 *
 * Usage (CLI):
 *   node skills/instagram-publisher/scripts/scheduler.js         → show queue
 *   node skills/instagram-publisher/scripts/scheduler.js --next  → show next available slot
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = resolve(__dirname, '../../../squads/imoveis-instagram/queue.json');

const DAY_NAMES = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };

/**
 * Get JST date components (year, month, day, weekday) for a given UTC timestamp.
 * Uses Intl.DateTimeFormat.formatToParts for reliable cross-platform results.
 */
function getJSTParts(date) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long',
  });
  const parts = fmt.formatToParts(date);
  return {
    year:    Number(parts.find(p => p.type === 'year').value),
    month:   Number(parts.find(p => p.type === 'month').value),
    day:     Number(parts.find(p => p.type === 'day').value),
    weekday: parts.find(p => p.type === 'weekday').value.toLowerCase(), // e.g. "thursday"
  };
}

/**
 * Build a UTC Date for a given JST year/month/day at hour:minute JST.
 * Constructs an ISO-8601 string with +09:00 offset to ensure correct UTC conversion.
 */
function makeJSTDate(year, month, day, hour, minute) {
  const iso = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00+09:00`;
  return new Date(iso);
}

/**
 * Format a UTC Date as a human-readable JST string.
 */
function formatJST(date) {
  return date.toLocaleString('pt-BR', {
    timeZone: 'Asia/Tokyo',
    weekday: 'long', day: '2-digit', month: '2-digit',
    year: 'numeric', hour: '2-digit', minute: '2-digit',
  }) + ' JST';
}

/**
 * Calculate the next available slot timestamp.
 * A slot is "available" if no post in queue.scheduled is within 30 minutes of it.
 */
export function nextSlot(queue) {
  const now = new Date();
  const minLeadMs = 10 * 60 * 1000; // Instagram requires ≥10 min lead time

  const candidates = [];

  for (let daysAhead = 0; daysAhead <= 75; daysAhead++) {
    const checkDate = new Date(now.getTime() + daysAhead * 86400 * 1000);
    const { year, month, day, weekday } = getJSTParts(checkDate);

    for (const slot of queue.slots) {
      if (weekday !== slot.day.toLowerCase()) continue;

      const slotDate = makeJSTDate(year, month, day, slot.hour, slot.minute);
      if (slotDate.getTime() - now.getTime() < minLeadMs) continue;

      candidates.push(slotDate);
    }
  }

  candidates.sort((a, b) => a - b);

  const occupiedTs = (queue.scheduled || []).map(p => p.scheduledUnixTs * 1000);
  for (const slotDate of candidates) {
    const ts = slotDate.getTime();
    const conflict = occupiedTs.some(ots => Math.abs(ots - ts) < 30 * 60 * 1000);
    if (!conflict) {
      return {
        unixTs: Math.floor(ts / 1000),
        label: formatJST(slotDate),
        date: slotDate,
      };
    }
  }

  throw new Error('Nenhum slot disponível nos próximos 75 dias.');
}

/**
 * Add a post to the queue after scheduling.
 */
export function addToQueue(queue, { postId, scheduledUnixTs, caption }) {
  queue.scheduled = queue.scheduled || [];
  queue.scheduled.push({
    postId,
    scheduledUnixTs,
    scheduledJST: formatJST(new Date(scheduledUnixTs * 1000)),
    caption,
    addedAt: new Date().toISOString(),
  });
  // Clean up entries older than 7 days
  const cutoff = Date.now() / 1000 - 7 * 24 * 3600;
  queue.scheduled = queue.scheduled.filter(p => p.scheduledUnixTs > cutoff);
}

/**
 * CLI: show queue or next slot
 */
async function main() {
  const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf8'));
  const args = process.argv.slice(2);

  if (args.includes('--next')) {
    const slot = nextSlot(queue);
    console.log(`\n📅 Próximo slot disponível:`);
    console.log(`   ${slot.label}`);
    console.log(`   Unix timestamp: ${slot.unixTs}`);
    return;
  }

  // Show full queue
  const slotSummary = queue.slots.map(s =>
    `${s.day} ${String(s.hour).padStart(2,'0')}:${String(s.minute).padStart(2,'0')} JST`
  ).join(' · ');

  console.log('\n📋 Fila de postagens — @meular.jp\n');
  console.log(`Slots: ${slotSummary}\n`);

  const scheduled = queue.scheduled || [];
  const now = Date.now() / 1000;
  const upcoming = scheduled.filter(p => p.scheduledUnixTs > now);
  const past     = scheduled.filter(p => p.scheduledUnixTs <= now);

  if (scheduled.length === 0) {
    console.log('Fila vazia — nenhum post agendado.');
  } else {
    if (upcoming.length) {
      console.log('⏰ Agendados:');
      upcoming.forEach((p, i) => {
        console.log(`   [${i+1}] ${p.scheduledJST} — "${p.caption}..."`);
      });
    }
    if (past.length) {
      console.log('\n✅ Publicados recentemente:');
      past.forEach((p, i) => {
        console.log(`   [${i+1}] ${p.scheduledJST} — "${p.caption}..."`);
      });
    }
  }

  const next = nextSlot(queue);
  console.log(`\n➡️  Próximo slot livre: ${next.label}`);
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) main().catch(err => { console.error(`\n❌ ${err.message}`); process.exit(1); });
