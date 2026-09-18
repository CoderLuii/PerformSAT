#!/usr/bin/env node
/**
 * Fetch the College Board Educator Question Bank (SAT R&W) via its public API.
 *
 * Endpoints (unauthenticated, confirmed 2026-04):
 *   GET  /msreportingquestionbank-prod/questionbank/lookup
 *   POST /msreportingquestionbank-prod/questionbank/digital/get-questions   {asmtEventId, test, domain}
 *   POST /msreportingquestionbank-prod/questionbank/digital/get-question    {external_id}
 *
 * Output:
 *   scripts/generated/cbEducatorQBankRW.json  — full math item cache with content
 *   scripts/generated/cbEducatorQBankRWIndex.json — lightweight metadata index
 *
 * Usage:
 *   node scripts/fetchCBQuestionBank.mjs              # full fetch (resumes from cache if present)
 *   node scripts/fetchCBQuestionBank.mjs --refresh    # ignore cache, refetch all content
 *   node scripts/fetchCBQuestionBank.mjs --limit=50   # fetch first 50 items only (smoke test)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const GEN_DIR = path.join(ROOT, 'scripts', 'generated');
const CACHE_PATH = path.join(GEN_DIR, 'cbEducatorQBankRW.json');
const INDEX_PATH = path.join(GEN_DIR, 'cbEducatorQBankRWIndex.json');
const LOOKUP_PATH = path.join(GEN_DIR, 'cbEducatorQBankLookup.json');

const API_BASE = 'https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Origin': 'https://satsuiteeducatorquestionbank.collegeboard.org',
  'Referer': 'https://satsuiteeducatorquestionbank.collegeboard.org/',
  'User-Agent': 'Mozilla/5.0 (PerformSAT calibration fetcher)',
};

const SAT_ASSESSMENT_ID = 99;
const MATH_TEST_ID = 1; // Reading and Writing
const MATH_DOMAINS = 'INI,CAS,EOI,SEC'; // R&W domains

const REQUEST_DELAY_MS = 150;
const CHECKPOINT_EVERY = 25;

const args = process.argv.slice(2);
const REFRESH = args.includes('--refresh');
const LIMIT = (() => {
  const a = args.find(a => a.startsWith('--limit='));
  return a ? parseInt(a.split('=')[1], 10) : null;
})();

fs.mkdirSync(GEN_DIR, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function apiGet(pathSegment) {
  const res = await fetch(`${API_BASE}${pathSegment}`, { method: 'GET', headers: HEADERS });
  if (!res.ok) throw new Error(`GET ${pathSegment} failed: ${res.status}`);
  return res.json();
}

async function apiPost(pathSegment, body) {
  const res = await fetch(`${API_BASE}${pathSegment}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${pathSegment} failed: ${res.status}`);
  return res.json();
}

function extractAltText(mathml) {
  if (!mathml) return '';
  return [...mathml.matchAll(/alttext="([^"]+)"/g)].map(m => m[1]).join(' ');
}

function htmlToPlain(html) {
  if (!html) return '';
  const stripped = html
    .replace(/<math[^>]*alttext="([^"]+)"[^>]*>[\s\S]*?<\/math>/g, ' [$1] ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  return stripped;
}

function normalizeItem(meta, content) {
  const answerOptions = Array.isArray(content.answerOptions)
    ? content.answerOptions.map((o, i) => ({
        letter: String.fromCharCode(65 + i),
        contentHtml: o.content,
        contentPlain: htmlToPlain(o.content),
      }))
    : null;

  const keys = Array.isArray(content.keys) ? content.keys : (content.correct_answer ? [content.correct_answer] : []);

  return {
    externalId: meta.external_id,
    questionId: meta.questionId,
    uId: meta.uId,
    ibn: meta.ibn || null,
    domain: meta.primary_class_cd_desc,
    domainCode: meta.primary_class_cd,
    skill: meta.skill_desc?.trim(),
    skillCode: meta.skill_cd,
    difficulty: meta.difficulty, // E | M | H
    scoreBandRangeCd: meta.score_band_range_cd,
    program: meta.program,
    type: content.type, // "mcq" | "spr"
    stemHtml: content.stem,
    stemPlain: htmlToPlain(content.stem),
    stimulusHtml: content.stimulus || null,
    stimulusPlain: content.stimulus ? htmlToPlain(content.stimulus) : null,
    answerOptions,
    correctAnswer: content.correct_answer ?? null,
    correctKeys: keys,
    rationaleHtml: content.rationale,
    rationalePlain: htmlToPlain(content.rationale),
  };
}

function loadCache() {
  if (REFRESH || !fs.existsSync(CACHE_PATH)) return { items: {}, fetchedAt: null };
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return { items: {}, fetchedAt: null };
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

async function main() {
  console.log('[1/3] Fetching lookup taxonomy...');
  const lookup = await apiGet('/lookup');
  fs.writeFileSync(LOOKUP_PATH, JSON.stringify(lookup, null, 2));
  console.log(`      mathLiveItems=${lookup.mathLiveItems.length}  readingLiveItems=${lookup.readingLiveItems.length}`);

  console.log('[2/3] Fetching SAT R&W metadata index (all 4 domains)...');
  const index = await apiPost('/digital/get-questions', {
    asmtEventId: SAT_ASSESSMENT_ID,
    test: MATH_TEST_ID,
    domain: MATH_DOMAINS,
  });
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
  console.log(`      metadata items=${index.length}`);

  const byDomain = {};
  const byDifficulty = {};
  for (const m of index) {
    byDomain[m.primary_class_cd_desc] = (byDomain[m.primary_class_cd_desc] || 0) + 1;
    byDifficulty[m.difficulty] = (byDifficulty[m.difficulty] || 0) + 1;
  }
  console.log('      by domain:', byDomain);
  console.log('      by difficulty:', byDifficulty);

  console.log('[3/3] Fetching full content per item (rate-limited)...');
  const cache = loadCache();
  const targetIds = (LIMIT ? index.slice(0, LIMIT) : index).map(m => m.external_id);
  const metaById = Object.fromEntries(index.map(m => [m.external_id, m]));

  let fetched = 0;
  let skipped = 0;
  let errors = 0;
  const startTime = Date.now();

  for (const id of targetIds) {
    if (cache.items[id] && !REFRESH) {
      skipped++;
      continue;
    }
    try {
      const content = await apiPost('/digital/get-question', { external_id: id });
      cache.items[id] = normalizeItem(metaById[id], content);
      fetched++;
      if (fetched % CHECKPOINT_EVERY === 0) {
        saveCache(cache);
        const elapsed = (Date.now() - startTime) / 1000;
        const rate = fetched / elapsed;
        const remaining = targetIds.length - skipped - fetched;
        const eta = remaining / rate;
        console.log(`      progress: ${fetched} fetched, ${skipped} cached, ${errors} errors | ${rate.toFixed(1)}/s | ETA ${Math.round(eta)}s`);
      }
      await sleep(REQUEST_DELAY_MS);
    } catch (e) {
      errors++;
      console.warn(`      error for ${id}: ${e.message}`);
      await sleep(REQUEST_DELAY_MS * 3);
    }
  }

  cache.fetchedAt = new Date().toISOString();
  cache.totalItems = Object.keys(cache.items).length;
  saveCache(cache);

  console.log(`\nDone. fetched=${fetched} skipped=${skipped} errors=${errors}`);
  console.log(`Cache: ${CACHE_PATH} (${cache.totalItems} items total)`);
}

main().catch(e => { console.error(e); process.exit(1); });
