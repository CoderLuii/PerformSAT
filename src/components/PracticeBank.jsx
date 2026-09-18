import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import {
  questionBank as mathQuestionBank,
  getQuestionsByCBSkill,
} from '../data/questions/bank';
import {
  rwQuestionBank,
  RW_DOMAINS,
  getQuestionsBySkillIds as getRWQuestionsBySkillIds,
} from '../data/questions/rwBank';
import { deriveRWQuestionType, RW_PATTERN_LABELS } from '../data/questions/rwBank/deriveRWPattern';
import { RW_READING_TYPE_LABELS } from '../data/questions/rwBank/rwReadingType';
import { extractSatPattern } from '../data/questions/extractSatPattern';
import {
  CB_MATH_SKILLS,
  CB_MATH_DOMAIN_LABELS,
  CB_RW_DOMAIN_LABELS,
  CB_RW_SKILLS,
  CB_DOMAIN_DESCRIPTIONS,
  PATTERN_TO_CB_SKILL,
} from '../data/questions/cbSkillTaxonomy';
import { formatPatternLabel } from '../services/selectors/missedPatternLabel';
import { progressForIds } from '../services/selectors/bankProgress';
import { masteryForIds, masterySummary, MASTERY_BANDS } from '../services/selectors/bankMastery';
import { buildBankRecommendations, assembleSmartMix } from '../services/selectors/bankRecommendations';
import { composeCustomPool } from '../services/selectors/customDrillPool';
import { getWeaknessSection } from '../services/selectors/weaknesses';
import './PracticeBank.css';

// "Suggested" recommendation kinds → row eyebrow copy + tri-color tone. Orange = the
// action to take now (revisit misses), purple = focus from the last test, navy =
// neutral new ground. Green stays reserved for strength/done.
const FORYOU_KINDS = {
  'fix-misses':    { eyebrow: 'Revisit', tone: 'orange' },
  'test-weakness': { eyebrow: 'From your last test', tone: 'purple' },
  'new-territory': { eyebrow: 'New territory', tone: 'navy' },
};
// A "Suggested" row navigates: it selects the rec's domain and applies the filter
// that matches its kind (test-weakness marks the weak topic rows instead).
const FORYOU_POOL = { 'fix-misses': 'missed', 'new-territory': 'unseen' };
const FORYOU_MAX = 2;

const MIN_PATTERN_POOL = 4;
// Custom drill builder — count options + filter-chip definitions.
const CUSTOM_COUNTS = [10, 15, 20, 25];
const CUSTOM_COUNT_DEFAULT = 15;
const DIFFICULTY_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
];
// The builder modal keeps its explicit "only" wording; the pane filter bar is
// tighter ("All · Unseen · Missed") because it sits under a SHOW label.
const POOL_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'unseen', label: 'Unseen only' },
  { key: 'missed', label: 'Missed only' },
];
const PANE_POOL_CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'unseen', label: 'Unseen' },
  { key: 'missed', label: 'Missed' },
];
const allTopicSlugs = (cat) => new Set((cat?.cbSkills || []).map(s => s.slug));
const DRILL_COUNT_PER_DOMAIN = 20;
const DRILL_COUNT_SPRINT = 10;
const FILTERED_DRILL_COUNT = 20;
const NAV_STORAGE_KEY = 'pb:nav';
const SEARCH_MIN_CHARS = 2;
// "Practiced this week" horizon for the rail tile.
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const isDrillable = (q) => Array.isArray(q.choices) && q.choices.length >= 2;

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Push a question id onto a Map<key, string[]> bucket.
function pushId(map, key, id) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(id);
}

function buildMathCategories() {
  const patternCounts = new Map();
  const cbSkillItemCount = new Map();
  const domainTotals = new Map();
  const patternQids = new Map();   // pattern slug → [question id]
  const cbSkillQids = new Map();   // cb skill slug → [question id]
  const domainQids = new Map();    // domain slug → [question id]

  for (const q of mathQuestionBank) {
    if (!isDrillable(q)) continue;
    const domain = q.domain || 'algebra';
    domainTotals.set(domain, (domainTotals.get(domain) || 0) + 1);
    pushId(domainQids, domain, q.id);

    const pattern = extractSatPattern(q.explanation);
    if (!pattern) continue;
    patternCounts.set(pattern, (patternCounts.get(pattern) || 0) + 1);
    pushId(patternQids, pattern, q.id);

    const cbSkill = PATTERN_TO_CB_SKILL[pattern];
    if (cbSkill) {
      cbSkillItemCount.set(cbSkill, (cbSkillItemCount.get(cbSkill) || 0) + 1);
      pushId(cbSkillQids, cbSkill, q.id);
    }
  }

  const domainOrder = ['algebra', 'advanced-math', 'problem-solving', 'geometry'];
  return domainOrder
    .filter(d => domainTotals.has(d))
    .map(domainSlug => {
      const skillsInDomain = CB_MATH_SKILLS.filter(s => s.domain === domainSlug);
      const cbSkills = skillsInDomain
        .map(skill => {
          const total = cbSkillItemCount.get(skill.slug) || 0;
          const patterns = Object.entries(PATTERN_TO_CB_SKILL)
            .filter(([, sSlug]) => sSlug === skill.slug)
            .map(([patternSlug]) => ({
              slug: patternSlug,
              label: formatPatternLabel(patternSlug),
              count: patternCounts.get(patternSlug) || 0,
              qids: patternQids.get(patternSlug) || [],
            }))
            .filter(p => p.count >= MIN_PATTERN_POOL)
            .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
          return { ...skill, total, patterns, qids: cbSkillQids.get(skill.slug) || [] };
        })
        .filter(skill => skill.total > 0)
        .sort((a, b) => b.total - a.total);
      return {
        domain: domainSlug,
        label: CB_MATH_DOMAIN_LABELS[domainSlug] || domainSlug,
        total: domainTotals.get(domainSlug) || 0,
        cbSkills,
        qids: domainQids.get(domainSlug) || [],
      };
    });
}

// Display labels for R&W "question types" in the practice bank (Tier-1 grammar
// patterns + reading-comprehension sub-types + three sub-threshold grammar types).
const RW_TYPE_LABELS = {
  ...RW_PATTERN_LABELS,
  ...RW_READING_TYPE_LABELS,
  'fss-pronoun': 'Pronouns & antecedents',
  'fss-possessive': 'Possessives & apostrophes',
  'fss-comparison': 'Comparisons',
};

function buildRWCategories() {
  const skillCounts = new Map();
  const domainTotals = new Map();
  const patternCounts = new Map();          // patternSlug → item count
  const skillToPatterns = new Map();        // skillSlug → Set<patternSlug>
  const skillQids = new Map();              // skillSlug → [question id]
  const patternQids = new Map();            // patternSlug → [question id]
  const domainQids = new Map();             // domainSlug → [question id]

  for (const q of rwQuestionBank) {
    if (!isDrillable(q)) continue;
    const domain = q.domain;
    if (domain) {
      domainTotals.set(domain, (domainTotals.get(domain) || 0) + 1);
      pushId(domainQids, domain, q.id);
    }
    (q.skills || []).forEach(sid => {
      skillCounts.set(sid, (skillCounts.get(sid) || 0) + 1);
      pushId(skillQids, sid, q.id);
    });

    const pattern = deriveRWQuestionType(q);
    if (pattern) {
      patternCounts.set(pattern, (patternCounts.get(pattern) || 0) + 1);
      pushId(patternQids, pattern, q.id);
      const sid = q.skill || (Array.isArray(q.skills) ? q.skills[0] : null);
      if (sid) {
        if (!skillToPatterns.has(sid)) skillToPatterns.set(sid, new Set());
        skillToPatterns.get(sid).add(pattern);
      }
    }
  }

  return RW_DOMAINS.map(domain => {
    const skills = CB_RW_SKILLS
      .filter(s => s.domain === domain)
      .map(skill => {
        const patternSlugs = skillToPatterns.get(skill.slug) || new Set();
        const patterns = [...patternSlugs]
          .filter(slug => RW_TYPE_LABELS[slug])   // only meaningful, named types
          .map(slug => ({
            slug,
            label: RW_TYPE_LABELS[slug],
            count: patternCounts.get(slug) || 0,
            qids: patternQids.get(slug) || [],
          }))
          .filter(p => p.count >= MIN_PATTERN_POOL)
          .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
        return {
          ...skill,
          count: skillCounts.get(skill.slug) || 0,
          patterns,
          qids: skillQids.get(skill.slug) || [],
        };
      })
      .filter(s => s.count > 0)
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
    return {
      domain,
      label: CB_RW_DOMAIN_LABELS[domain] || domain,
      total: domainTotals.get(domain) || 0,
      cbSkills: skills,
      qids: domainQids.get(domain) || [],
    };
  });
}

const MATH_CATEGORIES = buildMathCategories();
const RW_CATEGORIES = buildRWCategories();
// Drillable totals per section — the tab count badges.
const sumTotals = (cats) => cats.reduce((a, c) => a + (c.total || 0), 0);
const MATH_TOTAL = sumTotals(MATH_CATEGORIES);
const RW_TOTAL = sumTotals(RW_CATEGORIES);

// Safe fallback when a mastery-map lookup misses (should not happen in practice).
const EMPTY_MASTERY = { total: 0, practiced: 0, correct: 0, accuracy: null, coveragePct: 0, band: MASTERY_BANDS.UNSEEN };

const fmt = (n) => Number(n).toLocaleString('en-US');

/** Session-scoped "remember my place" state. Reads are guarded — private mode throws. */
function readNavState() {
  try {
    const raw = window.sessionStorage.getItem(NAV_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (err) {
    return null;
  }
}

// ── Inline icons (inherit currentColor unless a fixed stroke is given) ──────
const Arrow = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const Search = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
const Close = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>);

// ── Domain tiles ─────────────────────────────────────────────────────────────
// One line icon per College Board domain, drawn in the app's 24-grid stroke
// style (SVG only — never emojis). The tint rotates blue / lavender / lime /
// peach by position, so each section's four cards read as four tiles; the
// tints are identity, while the chips and pips keep the tri-color semantics
// (green = strong, purple = focus, orange = in progress).
const DOMAIN_TINT = {
  algebra: 't-blue', 'advanced-math': 't-lavender', 'problem-solving': 't-lime', geometry: 't-peach',
  'information-and-ideas': 't-blue', 'craft-and-structure': 't-lavender',
  'standard-english-conventions': 't-lime', 'expression-of-ideas': 't-peach',
};
const ICON_PROPS = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};
const DOMAIN_ICONS = {
  // axes + a rising line
  algebra: () => (<svg {...ICON_PROPS}><path d="M4 4v16h16" /><path d="m7 16 9-8" /><circle cx="17" cy="7.5" r="1.5" fill="currentColor" stroke="none" /></svg>),
  // axes + a parabola
  'advanced-math': () => (<svg {...ICON_PROPS}><path d="M4 4v16h16" /><path d="M7 7c1.2 9 8.8 9 10 0" /></svg>),
  // bar chart
  'problem-solving': () => (<svg {...ICON_PROPS}><rect x="4" y="12" width="4" height="8" rx="1" /><rect x="10" y="5" width="4" height="15" rx="1" /><rect x="16" y="9" width="4" height="11" rx="1" /></svg>),
  // right triangle with its right-angle mark
  geometry: () => (<svg {...ICON_PROPS}><path d="M4 20h16L4 6z" /><path d="M4 15h5v5" /></svg>),
  // lightbulb
  'information-and-ideas': () => (<svg {...ICON_PROPS}><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.3V16h6v-.2c0-.9.4-1.7 1-2.3A6 6 0 0 0 12 3z" /></svg>),
  // layers
  'craft-and-structure': () => (<svg {...ICON_PROPS}><path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3z" /><path d="m3.5 12 8.5 4.5 8.5-4.5" /><path d="m3.5 16.5 8.5 4.5 8.5-4.5" /></svg>),
  // pen over a line
  'standard-english-conventions': () => (<svg {...ICON_PROPS}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>),
  // speech bubble
  'expression-of-ideas': () => (<svg {...ICON_PROPS}><path d="M21 12a8 8 0 0 1-8 8H8l-5 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z" /></svg>),
};
const DomainIcon = ({ domain }) => { const Icon = DOMAIN_ICONS[domain]; return Icon ? <Icon /> : null; };

// Filter segment glyphs: one to three signal bars for Easy / Medium / Hard, a
// dashed circle for Unseen (the topic ring's "not started"), a crossed circle
// for Missed. Decorative — the segment's text carries the meaning.
const DIFF_BARS = { easy: 1, medium: 2, hard: 3 };
const Bars = ({ n }) => (
  <svg className="pb-bars" width="12" height="10" viewBox="0 0 12 10" aria-hidden="true">
    {[0, 1, 2].map(i => (
      <rect key={i} x={i * 4.5} y={7 - i * 3} width="3" height={3 + i * 3} rx="0.8" className={i < n ? 'is-lit' : undefined} />
    ))}
  </svg>
);
const POOL_GLYPH = {
  unseen: () => (<svg className="pb-fico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8" strokeDasharray="4.2 3.4" /></svg>),
  missed: () => (<svg className="pb-fico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m9 9 6 6M15 9l-6 6" /></svg>),
};
const PoolGlyph = ({ pool }) => { const G = POOL_GLYPH[pool]; return G ? <G /> : null; };

/**
 * TopicRing — the session card's left circle. Unseen topics get the Study
 * Plan's dashed static circle; a practiced topic gets a 20px coverage ring
 * (orange while it is still work, green once the band is STRONG), and a strong
 * topic gets the filled green check instead of an arc.
 */
const RING_R = 8;
const RING_C = 2 * Math.PI * RING_R;
const TopicRing = ({ seen, strong, pct, band }) => {
  if (!seen) return <span className="pb-c-ring is-static" aria-hidden="true" />;
  const dash = Math.max(0.06, Math.min(1, (pct || 0) / 100)) * RING_C;
  return (
    <span className={`pb-c-ring is-${strong ? 'strong' : band}`} aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20">
        {strong ? (
          <>
            <circle cx="10" cy="10" r="9.2" fill="currentColor" />
            <path d="M6 10.3 8.6 12.9 14 7.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <circle cx="10" cy="10" r={RING_R} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <circle
              cx="10" cy="10" r={RING_R} fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeDasharray={`${dash} ${RING_C}`} transform="rotate(-90 10 10)"
            />
          </>
        )}
      </svg>
    </span>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// PracticeBank — a question-bank NAVIGATOR wearing the Study Plan's clothes
// (2026-09-07 reskin) in the library's voice (2026-09-09). Main column: the
// library head (title · one subtitle · Build a custom drill), section tabs
// with count badges, four domain cards, then one white "day card" holding the
// domain's neutral description, filters and topics — each topic a session card
// (progress ring · title · one neutral description · chips · orange
// Start/Continue). Grammar question types hang under a card as the "rounds"
// list. Right rail (340px, sticky): resume, Start practice, Suggested, pastel
// stat tiles. The student's own numbers appear only as chips, rings and rail
// tiles, never as sentences addressed to them: the bank is a shared catalog,
// not a personal page (founder, 2026-09-08/09). Search replaces the day card's
// body with grouped matches; the custom-drill builder stays behind the head's
// "Build a custom drill" ghost button. Behaviour is unchanged from the
// navigator — this is a design pass over the same flows and launch semantics.
// ────────────────────────────────────────────────────────────────────────────
const PracticeBank = ({
  onStartPractice,
  onStartAdaptive,
  bankPractice = {},
  weaknesses = null,
  activeDrill = null,
  onResumeDrill,
  onDiscardDrill,
  focusRequest = null,
  progressHydrated = true,
}) => {
  // Restore the student's place inside the session (section / domain / filters).
  const [restored] = useState(readNavState);
  const [section, setSection] = useState(() => (restored?.section === 'rw' ? 'rw' : 'math'));
  const [domain, setDomain] = useState(() => (typeof restored?.domain === 'string' ? restored.domain : null));
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState(() => (DIFFICULTY_CHIPS.some(c => c.key === restored?.difficulty) ? restored.difficulty : 'all'));
  const [pool, setPool] = useState(() => (PANE_POOL_CHIPS.some(c => c.key === restored?.pool) ? restored.pool : 'all'));
  // Rows flagged by a chapter hand-off / a test-weakness recommendation:
  // { slugs: string[], label: string }. Cleared on a launch or a domain change.
  const [marker, setMarker] = useState(null);

  const paneRef = useRef(null);
  const railListRef = useRef(null);
  const lastFocusToken = useRef(null);
  const didMount = useRef(false);

  // ── Custom drill builder (modal) ───────────────────────────────────────────
  const [builderOpen, setBuilderOpen] = useState(false);
  const [builderDomainIdx, setBuilderDomainIdx] = useState(0);
  const [builderTopics, setBuilderTopics] = useState(() => allTopicSlugs(MATH_CATEGORIES[0]));
  const [builderCount, setBuilderCount] = useState(CUSTOM_COUNT_DEFAULT);
  const [builderDifficulty, setBuilderDifficulty] = useState('all');
  const [builderPool, setBuilderPool] = useState('all');

  const categories = section === 'math' ? MATH_CATEGORIES : RW_CATEGORIES;
  const allItems = section === 'math' ? mathQuestionBank : rwQuestionBank;
  const sectionLabel = section === 'math' ? 'Math' : 'Reading & Writing';

  const sectionProgress = useMemo(
    () => progressForIds(allItems.filter(isDrillable).map(q => q.id), bankPractice),
    [allItems, bankPractice],
  );

  // Recency for the "practiced this week" tile. `stamped` says how many of the
  // section's practice records actually carry a timestamp — when none do (older
  // records predate the `t` field) the tile falls back to the lifetime count and
  // relabels itself, so it never claims a week it can't prove.
  const sectionRecency = useMemo(() => {
    const cutoff = Date.now() - WEEK_MS;
    let week = 0;
    let stamped = 0;
    for (const q of allItems) {
      if (!isDrillable(q)) continue;
      const rec = bankPractice[String(q.id)];
      if (!rec) continue;
      const tv = rec.t == null ? NaN : Date.parse(rec.t);
      if (!Number.isFinite(tv)) continue;
      stamped += 1;
      if (tv >= cutoff) week += 1;
    }
    return { week, stamped };
  }, [allItems, bankPractice]);

  // Single-pass mastery aggregation: one map lookup per row render instead of
  // re-walking thousands of ids inside every domain / topic / type render.
  const masteryByKey = useMemo(() => {
    const map = new Map();
    for (const cat of categories) {
      map.set(`domain:${cat.domain}`, masteryForIds(cat.qids || [], bankPractice));
      for (const skill of cat.cbSkills) {
        map.set(`topic:${skill.slug}`, masteryForIds(skill.qids || [], bankPractice));
        for (const p of skill.patterns || []) {
          map.set(`type:${p.slug}`, masteryForIds(p.qids || [], bankPractice));
        }
      }
    }
    return map;
  }, [categories, bankPractice]);

  // Per-domain "2 strong · 1 focus" tallies for the domain cards.
  const domainTallies = useMemo(() => {
    const map = new Map();
    for (const cat of categories) map.set(cat.domain, masterySummary(cat.cbSkills, bankPractice));
    return map;
  }, [categories, bankPractice]);

  // Section rollups for the rail tiles: how many topics sit in each band, and
  // out of how many topics in the section.
  const sectionTally = useMemo(() => {
    let strongCount = 0;
    let focusCount = 0;
    let topics = 0;
    for (const cat of categories) {
      const t = domainTallies.get(cat.domain) || { strongCount: 0, focusCount: 0 };
      strongCount += t.strongCount;
      focusCount += t.focusCount;
      topics += (cat.cbSkills || []).length;
    }
    return { strongCount, focusCount, topics };
  }, [categories, domainTallies]);

  // Performance-driven "For you" recommendations (fix-misses / test-weakness /
  // new-territory). `now` is captured once per render — fine here since the
  // strip only needs coarse (20h) spacing, not a live clock.
  const recommendations = useMemo(
    () => buildBankRecommendations({ categories, bankPractice, weaknesses, now: Date.now() }),
    [categories, bankPractice, weaknesses],
  );
  // Suppress new-territory for a student who has practiced nothing in this
  // section — everything is "new" then, so it reads as noise on first visit.
  // Recommendations only make sense once the student's history has hydrated.
  const foryouRecs = useMemo(
    () => {
      if (!progressHydrated) return [];
      const list = sectionProgress.practiced === 0
        ? recommendations.filter(r => r.kind !== 'new-territory')
        : recommendations;
      return list.slice(0, FORYOU_MAX);
    },
    [recommendations, sectionProgress.practiced, progressHydrated],
  );

  // id → difficulty for the current section (missing tag → medium, matching the
  // selector's default). Rebuilt only when the section's item array changes.
  const difficultyById = useMemo(() => {
    const map = new Map();
    for (const q of allItems) map.set(q.id, q.difficulty || 'medium');
    return map;
  }, [allItems]);

  // qid → domain, so a recommendation (which carries only question ids) can
  // resolve the domain its pool mostly lives in.
  const domainByQid = useMemo(() => {
    const map = new Map();
    for (const cat of categories) for (const id of cat.qids || []) map.set(String(id), cat.domain);
    return map;
  }, [categories]);

  // ── Which domain is selected ───────────────────────────────────────────────
  // First visit: the first weakness that maps into this section's taxonomy.
  const weaknessDomain = useMemo(() => {
    const list = Array.isArray(weaknesses) ? weaknesses : [];
    for (const w of list) {
      if (!w || getWeaknessSection(w) !== section) continue;
      if (w.domain && categories.some(c => c.domain === w.domain)) return w.domain;
      const cat = categories.find(c => (c.cbSkills || []).some(s => s.slug === w.skillId));
      if (cat) return cat.domain;
    }
    return null;
  }, [weaknesses, section, categories]);

  const fallbackDomain = weaknessDomain || categories[0]?.domain || null;
  const selectedDomain = categories.some(c => c.domain === domain) ? domain : fallbackDomain;
  const selectedCat = categories.find(c => c.domain === selectedDomain) || categories[0] || null;

  // Remember the place for the rest of the session.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(NAV_STORAGE_KEY, JSON.stringify({ section, domain: selectedDomain, difficulty, pool }));
    } catch (err) {
      /* sessionStorage unavailable (private mode) — the nav just doesn't persist */
    }
  }, [section, selectedDomain, difficulty, pool]);

  // The pane is the tabpanel for the rail's tablist: a domain change moves
  // focus there so keyboard users land on the content they just chose.
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    const el = paneRef.current;
    // preventScroll: the session-restore / weakest-domain preselect fires this
    // right after mount, and a scrolling focus() hid the title bar under the
    // shell header on every open (found in the browser sweep).
    if (el && typeof el.focus === 'function') el.focus({ preventScroll: true });
  }, [selectedDomain, section]);

  // ── Search ─────────────────────────────────────────────────────────────────
  const trimmedQuery = query.trim();
  const searching = trimmedQuery.length >= SEARCH_MIN_CHARS;
  const searchGroups = useMemo(() => {
    if (!searching) return [];
    const needle = trimmedQuery.toLowerCase();
    const hit = (skill) => String(skill.label || '').toLowerCase().includes(needle)
      || (skill.patterns || []).some(p => String(p.label || '').toLowerCase().includes(needle));
    return categories
      .map(cat => ({ cat, skills: (cat.cbSkills || []).filter(hit) }))
      .filter(g => g.skills.length > 0);
  }, [categories, searching, trimmedQuery]);
  const searchMatchCount = searchGroups.reduce((a, g) => a + g.skills.length, 0);

  // ── Filter counts ──────────────────────────────────────────────────────────
  const filtersActive = difficulty !== 'all' || pool !== 'all';
  const activeChipLabels = [
    difficulty === 'all' ? null : DIFFICULTY_CHIPS.find(c => c.key === difficulty)?.label,
    pool === 'all' ? null : PANE_POOL_CHIPS.find(c => c.key === pool)?.label,
  ].filter(Boolean);

  // Static E / M / H composition per topic (independent of the student).
  const topicBreakdown = useMemo(() => {
    const map = new Map();
    for (const cat of categories) {
      for (const skill of cat.cbSkills) {
        const { counts } = composeCustomPool({ qids: skill.qids || [], difficultyById, bankPractice: null });
        map.set(skill.slug, counts.byDifficulty);
      }
    }
    return map;
  }, [categories, difficultyById]);

  // How many of each topic survive the active filters ("34 of 91").
  const topicFiltered = useMemo(() => {
    const map = new Map();
    for (const cat of categories) {
      for (const skill of cat.cbSkills) {
        const { ids } = composeCustomPool({ qids: skill.qids || [], difficultyById, bankPractice, difficulty, poolFilter: pool });
        map.set(skill.slug, ids.length);
      }
    }
    return map;
  }, [categories, difficultyById, bankPractice, difficulty, pool]);

  // Chip availability is scoped to what the pane is showing: the selected
  // domain, or the union of the search matches while a query is active.
  const chipScopeQids = useMemo(() => {
    if (searching) {
      const seen = new Set();
      const out = [];
      for (const g of searchGroups) {
        for (const skill of g.skills) {
          for (const id of skill.qids || []) {
            const k = String(id);
            if (!seen.has(k)) { seen.add(k); out.push(id); }
          }
        }
      }
      return out;
    }
    return selectedCat?.qids || [];
  }, [searching, searchGroups, selectedCat]);

  const chipCounts = useMemo(
    () => composeCustomPool({ qids: chipScopeQids, difficultyById, bankPractice, difficulty, poolFilter: pool }).counts,
    [chipScopeQids, difficultyById, bankPractice, difficulty, pool],
  );

  // ── Custom drill builder derivations ───────────────────────────────────────
  const builderDomain = categories[Math.min(builderDomainIdx, Math.max(0, categories.length - 1))];

  // Candidate ids = de-duped union of the selected builder domain's picked topics.
  const builderCandidateIds = useMemo(() => {
    if (!builderDomain) return [];
    const seen = new Set();
    const out = [];
    for (const skill of builderDomain.cbSkills) {
      if (!builderTopics.has(skill.slug)) continue;
      for (const id of (skill.qids || [])) {
        if (!seen.has(id)) { seen.add(id); out.push(id); }
      }
    }
    return out;
  }, [builderDomain, builderTopics]);

  const composedPool = useMemo(
    () => composeCustomPool({
      qids: builderCandidateIds,
      difficultyById,
      bankPractice,
      difficulty: builderDifficulty,
      poolFilter: builderPool,
    }),
    [builderCandidateIds, difficultyById, bankPractice, builderDifficulty, builderPool],
  );
  const builderAvailable = composedPool.ids.length;
  const allTopicsSelected = !!builderDomain && builderTopics.size === builderDomain.cbSkills.length;

  // ── Selection handlers ─────────────────────────────────────────────────────
  const selectDomain = useCallback((next) => {
    setDomain(next);
    setMarker(null);
    setQuery('');
  }, []);

  // Apply an incoming chapter focus request. Guarded by token so a stale
  // focusRequest (still held in App while the student navigates back via the
  // nav bar) never re-fires — only a fresh token from a chapter CTA does.
  useEffect(() => {
    const token = focusRequest?.token;
    if (!token || lastFocusToken.current === token) return undefined;
    lastFocusToken.current = token;
    const nextSection = focusRequest.section === 'rw' || focusRequest.section === 'math' ? focusRequest.section : section;
    const cats = nextSection === 'math' ? MATH_CATEGORIES : RW_CATEGORIES;
    const slugs = (focusRequest.skillSlugs || []).filter(Boolean);
    const cat = cats.find(c => c.domain === focusRequest.domain)
      || cats.find(c => (c.cbSkills || []).some(s => slugs.includes(s.slug)))
      || cats[0];
    const matching = cat ? (cat.cbSkills || []).filter(s => slugs.includes(s.slug)).map(s => s.slug) : [];
    setSection(nextSection);
    setQuery('');
    setDomain(cat ? cat.domain : null);
    setMarker(matching.length ? { slugs: matching, label: 'From your chapter' } : null);
    // Delay the scroll so the section + domain switch commits first.
    const scrollTimer = setTimeout(() => {
      const root = paneRef.current;
      if (!root || !matching.length) return;
      const target = root.querySelector(`[data-pb-skill="${matching[0]}"]`);
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
    return () => clearTimeout(scrollTimer);
  }, [focusRequest, section]);

  // Builder dialog focus contract: focus lands on Close when it opens, Tab
  // cycles inside the dialog, Escape closes it, and focus returns to whatever
  // opened it (the "Build a custom drill" row) when it closes.
  const builderModalRef = useRef(null);
  const builderOpenerRef = useRef(null);
  useEffect(() => {
    if (!builderOpen) return undefined;
    builderOpenerRef.current = document.activeElement;
    const modal = builderModalRef.current;
    const closeBtn = modal && modal.querySelector('.pb-builder-close');
    if (closeBtn) closeBtn.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setBuilderOpen(false); return; }
      if (e.key !== 'Tab' || !modal) return;
      const list = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')];
      if (!list.length) return;
      const idx = list.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
      else if (!e.shiftKey && (idx === -1 || idx === list.length - 1)) { e.preventDefault(); list[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      const opener = builderOpenerRef.current;
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus();
    };
  }, [builderOpen]);

  // ── Drill launchers (sources all keep the `practice-bank` prefix) ──────────
  const launchFromPool = (poolItems, count, label, source) => {
    const drillable = poolItems.filter(isDrillable);
    if (drillable.length === 0) return;
    setMarker(null);
    onStartPractice(shuffle(drillable).slice(0, count).map(q => q.id), { label, source, section });
  };
  const launchQuickDrill = () => launchFromPool(allItems, DRILL_COUNT_SPRINT, `Quick ${sectionLabel} drill`, 'practice-bank-quick');

  // Smart "Today's mix": weighted blend of the student's weak-skill pool, their
  // bank misses, and untouched types — degrades to random when there's no
  // history yet. Buckets are pre-shuffled; the assembler holds the proportions.
  const launchTodaysMix = () => {
    const drillableIds = allItems.filter(isDrillable).map(q => q.id);
    const weakRec = recommendations.find(r => r.kind === 'test-weakness');
    const weaknessQids = weakRec ? weakRec.qids : [];
    const missedQids = drillableIds.filter(id => bankPractice[String(id)]?.c === false);
    const unseenQids = drillableIds.filter(id => !bankPractice[String(id)]);
    const ids = assembleSmartMix({
      size: DRILL_COUNT_PER_DOMAIN,
      weaknessQids: shuffle(weaknessQids),
      missedQids: shuffle(missedQids),
      unseenQids: shuffle(unseenQids),
      allQids: shuffle(drillableIds),
    });
    if (ids.length === 0) return;
    setMarker(null);
    onStartPractice(ids, { label: "Today's mix", source: 'practice-bank-mix', section });
  };

  // Domain "Practice" → an adaptive round over the whole domain, rendered in
  // the SEVA Round shell (difficulty ladders to the student's performance).
  const launchDomainMixed = (cat) => {
    setMarker(null);
    onStartAdaptive({
      enforcedDomain: cat.domain,
      label: `${cat.label} practice`,
      section,
      ephemeral: true,
      source: 'practice-bank-domain',
    });
  };
  // Topic "Practice" → an adaptive round pulling from EVERY question type under
  // this topic (types folded in). The round adapts difficulty per answer; it
  // renders in the SEVA Round design with a target-based, growing progress rail.
  const launchSkillDrill = (skill) => {
    const skillPool = section === 'math' ? getQuestionsByCBSkill(skill.slug) : getRWQuestionsBySkillIds([skill.slug]);
    const poolIds = skillPool.filter(isDrillable).map(q => q.id);
    if (poolIds.length === 0) return;
    setMarker(null);
    onStartAdaptive({
      poolIds,
      label: skill.label,
      section,
      enforcedDomain: skill.domain,
      ephemeral: true,
      source: 'practice-bank-topic',
    });
  };

  // Question-type drill: an adaptive round over ONE derived type inside a
  // topic (e.g. Subject-verb agreement under Form, Structure, and Sense) —
  // the pattern qids were collected at category-build time.
  const launchTypeDrill = (skill, pattern) => {
    if (!pattern?.qids?.length) return;
    setMarker(null);
    onStartAdaptive({
      poolIds: pattern.qids,
      label: pattern.label,
      section,
      enforcedDomain: skill.domain,
      ephemeral: true,
      source: 'practice-bank-type',
    });
  };

  // A filter is set → the adaptive engine can't honour it, so serve a FIXED
  // drill composed from exactly the filtered pool instead.
  const launchFiltered = (qids, name) => {
    const { ids } = composeCustomPool({ qids: qids || [], difficultyById, bankPractice, difficulty, poolFilter: pool });
    if (ids.length === 0) return;
    setMarker(null);
    onStartPractice(shuffle(ids).slice(0, FILTERED_DRILL_COUNT), {
      label: `${name} · ${activeChipLabels.join(' · ')}`,
      source: 'practice-bank-filtered',
      section,
    });
  };

  const practiceDomain = (cat) => (filtersActive ? launchFiltered(cat.qids, cat.label) : launchDomainMixed(cat));
  const practiceTopic = (skill) => (filtersActive ? launchFiltered(skill.qids, skill.label) : launchSkillDrill(skill));
  const practiceType = (skill, pattern) => (filtersActive ? launchFiltered(pattern.qids, pattern.label) : launchTypeDrill(skill, pattern));

  // A "For you" row NAVIGATES (it no longer launches): it selects the domain the
  // rec's pool lives in and applies the filter that matches its kind.
  const openRecommendation = (rec) => {
    const tally = new Map();
    for (const id of rec.qids || []) {
      const d = domainByQid.get(String(id));
      if (d) tally.set(d, (tally.get(d) || 0) + 1);
    }
    let best = null;
    for (const [d, n] of tally) if (!best || n > best.n) best = { d, n };
    const targetDomain = best ? best.d : selectedDomain;
    setQuery('');
    setDomain(targetDomain);
    const nextPool = FORYOU_POOL[rec.kind];
    if (nextPool) {
      setPool(nextPool);
      setMarker(null);
      return;
    }
    // test-weakness: leave the filters alone and mark the weak topic rows.
    setPool('all');
    setDifficulty('all');
    const cat = categories.find(c => c.domain === targetDomain);
    const recIds = new Set((rec.qids || []).map(String));
    const slugs = (cat?.cbSkills || [])
      .filter(s => (s.qids || []).some(id => recIds.has(String(id))))
      .map(s => s.slug);
    setMarker(slugs.length ? { slugs, label: FORYOU_KINDS['test-weakness'].eyebrow } : null);
  };

  // Custom builder: multi-select topics (at least one must stay on), then launch
  // the composed + shuffled pool sliced to the chosen count.
  const toggleBuilderTopic = (slug) => setBuilderTopics(prev => {
    const next = new Set(prev);
    if (next.has(slug)) {
      if (next.size <= 1) return prev; // no-op — keep at least one topic selected
      next.delete(slug);
    } else {
      next.add(slug);
    }
    return next;
  });
  const launchCustomDrill = () => {
    if (!builderDomain) return;
    const ids = shuffle(composedPool.ids).slice(0, builderCount);
    if (ids.length === 0) return;
    onStartPractice(ids, { label: `${builderDomain.label} · custom drill`, source: 'practice-bank-custom', section });
    setBuilderOpen(false);
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const pickSection = (next) => {
    if (next === section) return;
    setSection(next);
    setDomain(null);
    setQuery('');
    setMarker(null);
    setBuilderOpen(false);
    setBuilderDomainIdx(0);
    const cats = next === 'math' ? MATH_CATEGORIES : RW_CATEGORIES;
    setBuilderTopics(allTopicSlugs(cats[0]));
    setBuilderCount(CUSTOM_COUNT_DEFAULT);
    setBuilderDifficulty('all');
    setBuilderPool('all');
  };
  const openBuilder = () => {
    const idx = Math.max(0, categories.findIndex(c => c.domain === selectedDomain));
    setBuilderDomainIdx(idx);
    setBuilderTopics(allTopicSlugs(categories[idx]));
    setBuilderCount(CUSTOM_COUNT_DEFAULT);
    setBuilderDifficulty('all');
    setBuilderPool('all');
    setBuilderOpen(true);
  };
  const pickBuilderDomain = (idx) => {
    setBuilderDomainIdx(idx);
    setBuilderTopics(allTopicSlugs(categories[idx]));
    setBuilderDifficulty('all');
    setBuilderPool('all');
  };
  const resetBuilder = () => {
    setBuilderTopics(allTopicSlugs(builderDomain));
    setBuilderCount(CUSTOM_COUNT_DEFAULT);
    setBuilderDifficulty('all');
    setBuilderPool('all');
  };
  const clearFilters = () => { setDifficulty('all'); setPool('all'); };

  // Roving tabindex over the rail's vertical tablist: Up/Down (and Left/Right,
  // for the horizontal phone strip) move + select, Home/End jump to the ends.
  const onDomainKeyDown = (e) => {
    const nav = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!nav.includes(e.key)) return;
    const tabs = Array.from(railListRef.current?.querySelectorAll('[role="tab"]') || []);
    if (tabs.length === 0) return;
    e.preventDefault();
    const active = tabs.indexOf(document.activeElement);
    const current = active === -1 ? Math.max(0, tabs.findIndex(t => t.getAttribute('aria-selected') === 'true')) : active;
    let next = current;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else next = (current - 1 + tabs.length) % tabs.length;
    const el = tabs[next];
    if (!el) return;
    if (typeof el.focus === 'function') el.focus();
    selectDomain(el.getAttribute('data-pb-domain'));
  };

  // Arrow keys inside a filter radiogroup move to the next ENABLED chip.
  const onChipKeyDown = (e, chips, currentKey, setter) => {
    const nav = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
    if (!nav.includes(e.key)) return;
    e.preventDefault();
    const enabled = chips.filter(c => c.enabled);
    if (enabled.length === 0) return;
    const idx = Math.max(0, enabled.findIndex(c => c.key === currentKey));
    let next = idx;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % enabled.length;
    else next = (idx - 1 + enabled.length) % enabled.length;
    setter(enabled[next].key);
  };

  const resumeTotal = Array.isArray(activeDrill?.questionIds) ? activeDrill.questionIds.length : 0;
  const resumeAnswered = activeDrill?.answers ? Object.keys(activeDrill.answers).length : 0;
  const resumePos = Math.min((activeDrill?.currentQuestionIndex || 0) + 1, resumeTotal || 1);
  const resumeLabel = activeDrill?.assignmentMeta?.label || 'Practice Bank drill';
  const resumeMeta = resumeTotal > 0 ? `Question ${resumePos} of ${resumeTotal} · ${resumeAnswered} answered` : `${resumeAnswered} answered`;
  const showResume = !!activeDrill && typeof onResumeDrill === 'function';

  const markedSlugs = marker?.slugs || [];

  // The "no questions match" copy is assembled from the ACTIVE chips so it
  // always names the filter the student actually set.
  const emptyCopy = (() => {
    const diffWord = difficulty === 'all' ? '' : `${DIFFICULTY_CHIPS.find(c => c.key === difficulty)?.label} `;
    const poolWord = pool === 'unseen' ? " you haven't seen" : pool === 'missed' ? " you've missed" : '';
    return `No ${diffWord}questions${poolWord} in ${selectedCat?.label || sectionLabel} yet.`;
  })();

  // ── Row renderer: one Study-Plan session card per topic ──────────────────
  const renderTopicRow = (skill) => {
    const breakdown = topicBreakdown.get(skill.slug) || { all: 0, easy: 0, medium: 0, hard: 0 };
    const shown = topicFiltered.get(skill.slug) ?? breakdown.all;
    const dim = shown === 0;
    const marked = markedSlugs.includes(skill.slug);
    const m = masteryByKey.get(`topic:${skill.slug}`) || EMPTY_MASTERY;
    const seen = progressHydrated && m.practiced > 0;
    const strong = seen && m.band === MASTERY_BANDS.STRONG;
    const chipText = dim
      ? `0 of ${fmt(breakdown.all)}`
      : filtersActive
        ? `${fmt(shown)} of ${fmt(breakdown.all)} · ${activeChipLabels.join(' · ')}`
        : `${fmt(breakdown.all)} questions · E ${breakdown.easy} · M ${breakdown.medium} · H ${breakdown.hard}`;
    // Question-type chips are a GRAMMAR-only affordance (user, 2026-07-16):
    // conventions topics list their types FLAT below the card as "rounds" —
    // always visible, no accordion. skill.patterns stays populated for ALL
    // topics (the For-you engine reads it), so gate the list here, never in the
    // category data.
    const typeChips = skill.domain === 'standard-english-conventions' ? (skill.patterns || []) : [];

    return (
      <div
        className={`pb-card${dim ? ' is-dim' : ''}${marked ? ' is-from-chapter' : ''}`}
        data-pb-skill={skill.slug}
        key={skill.slug}
        // The whole card is the hit area (design review 15A); the Start button
        // stays the only focusable control on it, so keyboard and screen-reader
        // users see one. The rounds list below carries its own buttons.
        onClick={dim ? undefined : (e) => { if (e.target.closest && e.target.closest('.pb-c-rounds, .pb-c-btn')) return; practiceTopic(skill); }}
      >
        {marked && <span className="pb-c-mark">{marker.label}</span>}
        <div className="pb-c-head">
          <TopicRing seen={seen} strong={strong} pct={m.coveragePct} band={m.band} />
          <h3 className="pb-c-title">{skill.label}</h3>
        </div>
        <p className="pb-c-sub">
          {dim ? 'Nothing here under these filters.' : skill.description}
        </p>
        <div className="pb-c-row">
          <div className="pb-c-chips">
            <span className="pb-c-chip">{chipText}</span>
            {seen && (
              <span className={`pb-c-chip ${strong ? 'is-strong' : 'is-seen'}`}>
                {m.practiced} practiced · {m.accuracy}%
              </span>
            )}
          </div>
          {!dim && (
            <button
              type="button"
              className="pb-c-btn"
              aria-label={`Practice ${skill.label}, ${shown} questions`}
              onClick={() => practiceTopic(skill)}
            >
              {seen ? 'Continue' : 'Start'}
              <Arrow size={14} />
            </button>
          )}
        </div>
        {typeChips.length > 0 && (
          <div className="pb-c-rounds">
            {typeChips.map((p) => {
              const pm = masteryByKey.get(`type:${p.slug}`) || EMPTY_MASTERY;
              const typeSeen = progressHydrated && pm.band !== MASTERY_BANDS.UNSEEN && pm.accuracy != null;
              const typeShown = filtersActive
                ? composeCustomPool({ qids: p.qids || [], difficultyById, bankPractice, difficulty, poolFilter: pool }).ids.length
                : p.count;
              return (
                <button
                  type="button"
                  className="pb-c-round"
                  key={p.slug}
                  disabled={typeShown === 0}
                  onClick={() => practiceType(skill, p)}
                >
                  <span className="pb-c-round-label">{p.label}</span>
                  <span className={`pb-c-round-prog${typeSeen ? ' is-active' : ''}`}>
                    {typeSeen ? `${pm.accuracy}% · ${p.count}` : `${p.count} questions`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const paneRows = selectedCat ? (selectedCat.cbSkills || []) : [];
  const allZero = !searching && filtersActive && paneRows.length > 0
    && paneRows.every(s => (topicFiltered.get(s.slug) ?? 0) === 0);

  // The domain's one-line description: what the domain covers and its share
  // of the section, from the taxonomy. It never changes with the student's
  // history; their numbers live in the chips, rings and rail tiles.
  const domainName = selectedCat?.label || sectionLabel;
  const domainDescription = CB_DOMAIN_DESCRIPTIONS[selectedDomain] || '';

  // Rail stat tile: the week count when the records carry timestamps, the
  // lifetime count (relabelled) when they don't.
  const stampedWeek = sectionRecency.stamped > 0;
  const statNumber = stampedWeek ? sectionRecency.week : sectionProgress.practiced;
  const showStats = progressHydrated && sectionProgress.practiced > 0;

  return (
    <div className="pb-screen" data-theme="light">
      <div className="pb-inner">
        <div className="pb-grid">
          <div className="pb-main">

            {/* ── Page head — a library title like Videos / Learn, not the Study
                   Plan's avatar bar: the bank is a shared catalog, not the
                   student's own page (founder, 2026-09-08). The personal
                   numbers live in the rail tiles. ─────────────────────────── */}
            <header className="pb-titlebar">
              <div className="pb-titlebar-id">
                <h1 className="pb-title">Practice Bank</h1>
                <p className="pb-title-sub">
                  Every practice question, sorted by section, domain, and topic. Pick a topic and start a set.
                </p>
              </div>
              <button type="button" className="pb-ghost-btn" onClick={openBuilder}>
                Build a custom drill
              </button>
            </header>

            {/* ── Section tabs (this IS the section toggle) ─────────────── */}
            <div className="pb-tabs-row">
              <div className="pb-tabs" role="group" aria-label="Practice section">
                <button
                  type="button"
                  aria-pressed={section === 'math'}
                  className={`pb-tab${section === 'math' ? ' is-active' : ''}`}
                  onClick={() => pickSection('math')}
                >
                  Math
                  <span className="pb-tab-count">{fmt(MATH_TOTAL)}</span>
                </button>
                <button
                  type="button"
                  aria-pressed={section === 'rw'}
                  className={`pb-tab${section === 'rw' ? ' is-active' : ''}`}
                  onClick={() => pickSection('rw')}
                >
                  Reading &amp; Writing
                  <span className="pb-tab-count">{fmt(RW_TOTAL)}</span>
                </button>
              </div>
            </div>

            {/* ── Domain chooser (vertical-arrow tablist, roving tabindex) ─ */}
            <div className="pb-domains">
              <div
                className="pb-dlist"
                role="tablist"
                aria-label={`${sectionLabel} domains`}
                ref={railListRef}
                onKeyDown={onDomainKeyDown}
              >
                {categories.map((cat) => {
                  const on = cat.domain === selectedDomain;
                  const tally = domainTallies.get(cat.domain) || { strongCount: 0, focusCount: 0 };
                  const dm = masteryByKey.get(`domain:${cat.domain}`) || EMPTY_MASTERY;
                  const matches = searching ? (searchGroups.find(g => g.cat.domain === cat.domain)?.skills.length || 0) : null;
                  const showTally = progressHydrated && dm.practiced > 0;
                  return (
                    <button
                      type="button"
                      role="tab"
                      key={cat.domain}
                      id={`pb-dtab-${cat.domain}`}
                      data-pb-domain={cat.domain}
                      aria-selected={on}
                      aria-controls="pb-pane"
                      tabIndex={on ? 0 : -1}
                      className={`pb-dcard ${DOMAIN_TINT[cat.domain] || 't-blue'}${on ? ' is-on' : ''}`}
                      onClick={() => selectDomain(cat.domain)}
                    >
                      <span className="pb-dcard-top">
                        <span className="pb-dcard-badge"><DomainIcon domain={cat.domain} /></span>
                        {/* One pip per topic, coloured by its band once history has loaded. */}
                        <span className="pb-dcard-pips" aria-hidden="true">
                          {(cat.cbSkills || []).map((s) => {
                            const band = progressHydrated ? (masteryByKey.get(`topic:${s.slug}`) || EMPTY_MASTERY).band : MASTERY_BANDS.UNSEEN;
                            return <i key={s.slug} className={`pb-pip is-${band}`} />;
                          })}
                        </span>
                      </span>
                      <span className="pb-dcard-name">{cat.label}</span>
                      <span className="pb-dcard-count">
                        {matches != null
                          ? <><b>{matches}</b> matching</>
                          : <><b>{fmt(cat.total)}</b> questions</>}
                      </span>
                      {showTally && (
                        <span className="pb-dcard-tally">
                          {tally.focusCount > 0 && <span className="pb-dchip is-focus">{tally.focusCount} focus</span>}
                          {tally.strongCount > 0 && <span className="pb-dchip is-strong">{tally.strongCount} strong</span>}
                          {tally.focusCount === 0 && tally.strongCount === 0 && (
                            <span className="pb-dchip">{dm.practiced} practiced</span>
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── The day card: this domain's topics, or the search results ─ */}
            <section
              className="pb-day"
              id="pb-pane"
              ref={paneRef}
              role="tabpanel"
              tabIndex={-1}
              aria-labelledby={searching ? 'pb-search-heading' : `pb-dtab-${selectedDomain}`}
            >
              <div className="pb-dayhead">
                {searching ? (
                  // Zero matches: the message below IS the heading (it carries the
                  // aria-live announcement), so the copy is never said twice.
                  searchMatchCount > 0 && (
                    <h2 className="pb-daytitle" id="pb-search-heading" aria-live="polite">
                      {`${searchMatchCount} topic${searchMatchCount === 1 ? '' : 's'} matching “${trimmedQuery}”`}
                    </h2>
                  )
                ) : (
                  <>
                    <h2 className="pb-daytitle">{domainName}</h2>
                    <span className="pb-daycount">{paneRows.length} topic{paneRows.length === 1 ? '' : 's'}</span>
                  </>
                )}
                <label className="pb-search" htmlFor="pb-search-input">
                  <span className="pb-sr-only">{`Search ${sectionLabel} topics`}</span>
                  <span className="pb-search-icon" aria-hidden="true"><Search /></span>
                  <input
                    id="pb-search-input"
                    className="pb-search-input"
                    type="search"
                    value={query}
                    placeholder={`Search ${sectionLabel} topics`}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); setQuery(''); } }}
                  />
                </label>
                {!searching && selectedCat && (
                  <button type="button" className="pb-pbtn" onClick={() => practiceDomain(selectedCat)}>
                    Practice this domain <Arrow size={14} />
                  </button>
                )}
              </div>

              {!searching && domainDescription && <p className="pb-desc">{domainDescription}</p>}

              <div className="pb-filters">
                <div className="pb-fgroup" role="radiogroup" aria-label="Difficulty">
                  <span className="pb-fgroup-label" aria-hidden="true">Difficulty</span>
                  <span className="pb-ftrack">
                  {DIFFICULTY_CHIPS.map(({ key, label }) => {
                    const on = difficulty === key;
                    const n = chipCounts.byDifficulty[key];
                    const enabled = on || n > 0;
                    const chips = DIFFICULTY_CHIPS.map(c => ({ key: c.key, enabled: c.key === difficulty || chipCounts.byDifficulty[c.key] > 0 }));
                    return (
                      <button
                        type="button"
                        key={key}
                        role="radio"
                        aria-checked={on}
                        tabIndex={on ? 0 : -1}
                        disabled={!enabled}
                        className={`pb-fchip${on ? ' is-on' : ''}`}
                        onClick={() => setDifficulty(key)}
                        onKeyDown={(e) => onChipKeyDown(e, chips, difficulty, setDifficulty)}
                      >
                        {DIFF_BARS[key] && <Bars n={DIFF_BARS[key]} />}
                        {label}
                      </button>
                    );
                  })}
                  </span>
                </div>
                <div className="pb-fgroup" role="radiogroup" aria-label="Show">
                  <span className="pb-fgroup-label" aria-hidden="true">Show</span>
                  <span className="pb-ftrack">
                  {PANE_POOL_CHIPS.map(({ key, label }) => {
                    const on = pool === key;
                    const n = chipCounts.byPool[key];
                    const enabled = on || n > 0;
                    const chips = PANE_POOL_CHIPS.map(c => ({ key: c.key, enabled: c.key === pool || chipCounts.byPool[c.key] > 0 }));
                    return (
                      <button
                        type="button"
                        key={key}
                        role="radio"
                        aria-checked={on}
                        tabIndex={on ? 0 : -1}
                        disabled={!enabled}
                        className={`pb-fchip${on ? ' is-on' : ''}`}
                        onClick={() => setPool(key)}
                        onKeyDown={(e) => onChipKeyDown(e, chips, pool, setPool)}
                      >
                        <PoolGlyph pool={key} />
                        {label}
                      </button>
                    );
                  })}
                  </span>
                </div>
              </div>

              {searching ? (
                searchMatchCount === 0 ? (
                  <p className="pb-nomatch" id="pb-search-heading" aria-live="polite">
                    No topic matches “{trimmedQuery}”. Try “linear”, “circles”, or “evidence”.
                  </p>
                ) : (
                  <div className="pb-list">
                    {searchGroups.map(({ cat, skills }) => (
                      <div className="pb-sgroup" key={cat.domain}>
                        <div className="pb-sgroup-head">{cat.label}</div>
                        {skills.map(renderTopicRow)}
                      </div>
                    ))}
                  </div>
                )
              ) : allZero ? (
                <div className="pb-empty">
                  <p className="pb-empty-copy">{emptyCopy}</p>
                  <button type="button" className="pb-empty-clear" onClick={clearFilters}>Clear filters</button>
                </div>
              ) : (
                <div className="pb-list">
                  {paneRows.map(renderTopicRow)}
                </div>
              )}
            </section>
          </div>

          {/* ── Right rail — launchers, Suggested, pastel stat tiles ─────── */}
          <aside className="pb-rail" aria-label="Practice bank summary">

            {showResume && (
              <div className="pb-tile is-resume">
                <div className="pb-tile-eyebrow">Continue your drill</div>
                <div className="pb-tile-title">{resumeLabel}</div>
                <div className="pb-tile-sub">{resumeMeta}</div>
                <div className="pb-tile-acts">
                  <button type="button" className="pb-c-btn" onClick={onResumeDrill}>
                    Continue <Arrow size={14} />
                  </button>
                  {typeof onDiscardDrill === 'function' && (
                    <button type="button" className="pb-c-btn is-ghost" onClick={onDiscardDrill}>Discard</button>
                  )}
                </div>
              </div>
            )}

            <div className="pb-tile is-plain">
              <div className="pb-tile-eyebrow">Adaptive set</div>
              <div className="pb-tile-title">Start practice</div>
              <div className="pb-tile-sub">{DRILL_COUNT_PER_DOMAIN} questions · about 25 min</div>
              <div className="pb-tile-acts">
                <button type="button" className="pb-c-btn" onClick={launchTodaysMix}>
                  Start <Arrow size={14} />
                </button>
                <button type="button" className="pb-c-btn is-ghost" onClick={launchQuickDrill}>
                  Quick drill · {DRILL_COUNT_SPRINT} questions
                </button>
              </div>
            </div>

            {foryouRecs.length > 0 && (
              <div className="pb-tile is-foryou">
                <div className="pb-tile-eyebrow">Suggested</div>
                <div className="pb-rec-list">
                  {foryouRecs.map((rec) => {
                    const meta = FORYOU_KINDS[rec.kind];
                    return (
                      <div className="pb-rec" key={rec.kind}>
                        <span className="pb-rec-eyebrow">{meta.eyebrow}</span>
                        <span className="pb-rec-title">{rec.title}</span>
                        <span className="pb-rec-count">{rec.count} q</span>
                        <button
                          type="button"
                          className="pb-rec-go"
                          aria-label={`Go to ${rec.title}`}
                          onClick={() => openRecommendation(rec)}
                        >
                          Go
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {showStats && (
              <>
                <div className="pb-tile is-score">
                  <div className="pb-tile-eyebrow">{stampedWeek ? 'Practiced this week' : 'Practiced'}</div>
                  <div className="pb-tile-num">{fmt(statNumber)}</div>
                  {sectionProgress.accuracy != null && (
                    <div className="pb-tile-sub">{sectionProgress.accuracy}% accuracy</div>
                  )}
                </div>
                <div className="pb-tile-pair">
                  <div className="pb-tile is-goal">
                    <div className="pb-tile-eyebrow">Strong topics</div>
                    <div className="pb-tile-num">{sectionTally.strongCount}</div>
                    <div className="pb-tile-sub">of {sectionTally.topics} in {sectionLabel}</div>
                  </div>
                  <div className="pb-tile is-exam">
                    <div className="pb-tile-eyebrow">Focus topics</div>
                    <div className="pb-tile-num">{sectionTally.focusCount}</div>
                    <div className="pb-tile-sub">under 60% accuracy</div>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>

      {/* Phone-only resume bar — sits above the bottom tab bar */}
      {showResume && (
        <div className="pb-resume-bar">
          <span className="pb-resume-bar-text">{resumeLabel}</span>
          {typeof onDiscardDrill === 'function' && (
            <button type="button" className="pb-resume-bar-discard" onClick={onDiscardDrill}>Discard</button>
          )}
          <button type="button" className="pb-resume-bar-go" onClick={onResumeDrill}>Continue</button>
        </div>
      )}

      {/* Custom drill builder — one-click-away modal (reuses the existing builder) */}
      {builderOpen && builderDomain && (
        <div className="pb-modal-backdrop" role="presentation" onClick={() => setBuilderOpen(false)}>
          <div className="pb-modal" role="dialog" aria-modal="true" aria-label="Custom drill builder" ref={builderModalRef} onClick={(e) => e.stopPropagation()}>
            <div className="pb-builder">
              <div className="pb-builder-head">
                <div className="pb-builder-title">Build a custom drill</div>
                <button type="button" className="pb-builder-close" aria-label="Close drill builder" onClick={() => setBuilderOpen(false)}>
                  <Close />
                </button>
              </div>

              <div className="pb-builder-row">
                <div className="pb-builder-label">Domain</div>
                <div className="pb-chips">
                  {categories.map((cat, i) => {
                    const on = i === builderDomainIdx;
                    return (
                      <button
                        type="button"
                        key={cat.domain}
                        className={`pb-chip${on ? ' is-on' : ' is-off'}`}
                        aria-pressed={on}
                        onClick={() => pickBuilderDomain(i)}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pb-builder-row">
                <div className="pb-builder-label">Topics</div>
                <div className="pb-chips">
                  <button
                    type="button"
                    className={`pb-chip${allTopicsSelected ? ' is-on' : ' is-off'}`}
                    aria-pressed={allTopicsSelected}
                    onClick={() => setBuilderTopics(allTopicSlugs(builderDomain))}
                  >
                    All topics
                  </button>
                  {builderDomain.cbSkills.map((skill) => {
                    const on = builderTopics.has(skill.slug);
                    const count = section === 'math' ? skill.total : skill.count;
                    return (
                      <button
                        type="button"
                        key={skill.slug}
                        className={`pb-chip${on ? ' is-on' : ' is-off'}`}
                        aria-pressed={on}
                        onClick={() => toggleBuilderTopic(skill.slug)}
                      >
                        {skill.label} <span className="pb-chip-n">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pb-builder-row">
                <div className="pb-builder-label">How many</div>
                <div className="pb-seg" role="group" aria-label="Number of questions">
                  {CUSTOM_COUNTS.map((n) => (
                    <button
                      type="button"
                      key={n}
                      className={`pb-seg-btn${builderCount === n ? ' is-on' : ''}`}
                      aria-pressed={builderCount === n}
                      onClick={() => setBuilderCount(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-builder-row">
                <div className="pb-builder-label">Difficulty</div>
                <div className="pb-chips">
                  {DIFFICULTY_CHIPS.map(({ key, label }) => {
                    const n = composedPool.counts.byDifficulty[key];
                    const disabled = n === 0;
                    const on = builderDifficulty === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        disabled={disabled}
                        className={`pb-chip${on ? ' is-on' : ' is-off'}${disabled ? ' is-disabled' : ''}`}
                        aria-pressed={on}
                        onClick={() => setBuilderDifficulty(key)}
                      >
                        {label} <span className="pb-chip-n">{n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pb-builder-row">
                <div className="pb-builder-label">Questions</div>
                <div className="pb-chips">
                  {POOL_CHIPS.map(({ key, label }) => {
                    const n = composedPool.counts.byPool[key];
                    const disabled = n === 0;
                    const on = builderPool === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        disabled={disabled}
                        className={`pb-chip${on ? ' is-on' : ' is-off'}${disabled ? ' is-disabled' : ''}`}
                        aria-pressed={on}
                        onClick={() => setBuilderPool(key)}
                      >
                        {label} <span className="pb-chip-n">{n}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pb-builder-foot">
                <button type="button" className="pb-builder-reset" onClick={resetBuilder}>Reset</button>
                <button
                  type="button"
                  className="pb-builder-start"
                  disabled={builderAvailable === 0}
                  onClick={launchCustomDrill}
                >
                  {builderAvailable === 0
                    ? 'No questions match'
                    : <>Start {Math.min(builderCount, builderAvailable)} of {builderAvailable} <Arrow size={16} /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeBank;
