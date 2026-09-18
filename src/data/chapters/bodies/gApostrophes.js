/**
 * Learn lesson body — Apostrophes & Possessives (Standard English Conventions).
 *
 * VOICE v4 (adopted 2026-07-18, exemplar: bodies/centralIdeas.js): practiced-tutor
 * register — developed 2-5 sentence paragraphs with connective tissue; every rule
 * earns its "because"; student-psychology named concretely; math teaching is
 * example-led; varied rhythm, no aphorism-per-block. Bans carried from v3: no
 * analogies, no pep talk, no exclamation marks, no emojis, no test-personification.
 * All v3 teaching claims preserved. Gated by bodies.test.js.
 *
 * COMPOSED MODE (2026-07-18): chapterOpener lede + auto-numbered
 * sections/examples/figures + aside margin-notes + summary close
 * (exemplar: bodies/mPercents.js).
 *
 * Rendered by SectionContent (ContentTabRenderer). Loaded lazily via
 * bodies/index.js — never import this from the chapter index.
 */

export const gApostrophesBlocks = [
  {
    type: 'chapterOpener',
    lede: "Modifiers, lists, comparisons — the conventions have been shrinking in scope, and they end here, at the smallest mark on the page. Say *dogs*, *dog's*, and *dogs'* out loud and the three are identical, which is why your ear can't resolve an apostrophe question no matter how carefully it listens. The call gets made on the page, with two questions: **how many, and does someone own something?**",
  },

  { type: 'heading', content: 'What these questions test' },
  {
    type: 'text',
    content: "The question is never about pronunciation; it's about which spelling the sentence requires, and the two checks settle every item — **how many?** (one, or more than one) and **whose?** (whether anything is being owned). The distinction matters because a student who sounds out the options is guessing without realizing it: every choice passes the read-aloud test, so the ear reports a tie and the student picks on feel. Answer the two questions instead, and the apostrophe places itself.",
  },

  { type: 'heading', content: 'The four noun cases' },
  {
    type: 'table',
    headers: ['Intended meaning', 'Form', 'Example'],
    rows: [
      ['More than one (no ownership)', 'plain -s, no apostrophe', '*The **dogs** ran across the yard.*'],
      ['One thing owns something', "add **'s**", '*The **dog\'s** leash snapped.*'],
      ['Many owners (already ends in s)', "add **s'**", '*The **dogs\'** leashes were tangled.*'],
      ['Irregular plural (no s)', "add **'s**", '*The **children\'s** coats are here.*'],
    ],
  },
  {
    type: 'aside',
    kind: 'remember',
    content: "Forming a plural **never** takes an apostrophe. If nothing is being owned, the apostrophe is wrong — however long or unfamiliar the word looks. Length doesn't change punctuation.",
  },

  { type: 'heading', content: 'The next-word test (for nouns)' },
  {
    type: 'text',
    content: "There's a mechanical way to answer the *whose* question: look at the word immediately to the right of the noun, because ownership shows up in what follows.",
  },
  {
    type: 'list',
    items: [
      'Another **noun** follows → something is being owned → an apostrophe belongs.',
      'A verb, a preposition, or the end of the sentence follows → no apostrophe.',
    ],
  },
  {
    type: 'text',
    content: "Compare *The **teacher's** desk* — the noun *desk* follows, so something is owned — with *The **teachers** met*, where the verb *met* follows and the word is a plain plural. Run the test even when the noun is long and technical, because those are the nouns most often handed an apostrophe they haven't earned: a word like *organizations* looks weighty enough to deserve extra punctuation, and weight is not a criterion.",
  },

  { type: 'heading', content: 'The "is/has" test (for its, it\'s, and other pronouns)' },
  {
    type: 'text',
    content: "Pronouns reverse the noun rule, and the reversal drives most of the errors on these items: **possessive pronouns take no apostrophe** (*its, their, whose, your*), so a pronoun *with* an apostrophe is always a contraction — the mark stands for a squeezed-out letter, not for ownership. That gives you the test. Expand the apostrophe to **\"is\" or \"has\"** and reread: if the sentence still makes sense, the contraction is correct; if the expansion turns to nonsense, the sentence needed the no-apostrophe possessive.",
  },
  {
    type: 'table',
    headers: ['With apostrophe (= is/has)', 'No apostrophe (possessive)'],
    rows: [
      ["**it's** = it is / it has", '**its** = belonging to it'],
      ["**they're** = they are", '**their** = belonging to them'],
      ["**who's** = who is / who has", '**whose** = belonging to whom'],
      ["**you're** = you are", '**your** = belonging to you'],
    ],
  },
  {
    type: 'aside',
    kind: 'note',
    content: "*There* is a third look-alike, and it's neither a possessive nor a contraction — it points to a **place** or states existence: *The books are over **there**.* Check for a location meaning before weighing the other two forms.",
  },

  { type: 'heading', content: 'How to approach these questions' },
  {
    type: 'steps',
    items: [
      "**Don't sound it out.** Every choice is identical to the ear; the decision lives in the spelling.",
      '**Noun in the blank? Ask the two questions.** How many owners — one or more? And is anything owned — a noun right after means yes.',
      '**Pronoun in the blank? Expand the apostrophe.** Read it as *is* or *has*: a sentence that parses wants the contraction, one that fails wants the possessive.',
      "**Place the mark.** One owner → *'s*. Many owners ending in *s* → *s'*. No owner → no apostrophe.",
    ],
  },

  { type: 'heading', content: 'Worked examples' },
  {
    type: 'example',
    difficulty: 'Easy',
    problem: 'The committee released ______ findings on Friday.\n\n(A) its\n(B) it\'s',
    steps: [
      { label: 'Run the is/has test', content: 'Expand (B) to *it is*: "The committee released **it is** findings" — that doesn\'t parse, so the apostrophe form fails.' },
      { label: 'Choose', content: 'The committee owns the findings, so the possessive is required — **(A) its**, no apostrophe.' },
    ],
  },
  {
    type: 'example',
    difficulty: 'Medium',
    problem: 'After the storm, the two ______ roofs both needed repair.\n\n(A) house\'s\n(B) houses\'\n(C) houses',
    steps: [
      { label: 'Count the owners', content: "*Two* houses — plural. The singular possessive **(A) house's** is out immediately." },
      { label: 'Check for ownership', content: 'A noun (*roofs*) follows, and the roofs belong to the houses → something is owned, so the plain plural **(C) houses** is out too.' },
      { label: 'Place the mark', content: "Many owners already ending in *s* take **s'** → **(B) houses'**." },
    ],
  },
  {
    type: 'example',
    difficulty: 'Hard',
    problem: 'The researchers announced that ______ going to publish the survey\'s results next month.\n\n(A) their\n(B) there\n(C) they\'re',
    steps: [
      { label: 'Test the contraction', content: 'Expand (C) to *they are*: "announced that **they are** going to publish" — the sentence parses cleanly.' },
      { label: 'Rule out the look-alikes', content: "(A) *their* would have to own a following noun, but *going* follows; (B) *there* points to a place, and no location is involved." },
      { label: 'Choose', content: "**(C) they're**. And *survey's results* is correct as written — one survey owns the results." },
    ],
  },
  {
    type: 'example',
    difficulty: 'Medium',
    problem: 'The scientist ______ theory reshaped the field went on to win the prize.\n\n(A) who\'s\n(B) whose',
    steps: [
      { label: 'Run the is/has test', content: 'Expand (A) *who\'s* to *who is*: "the scientist **who is** theory reshaped the field" — the expansion fails.' },
      { label: 'Choose', content: 'The theory belongs to the scientist, so the possessive is required — **(B) whose**, no apostrophe. A noun (*theory*) follows, confirming ownership.' },
    ],
  },

  { type: 'heading', content: 'Check yourself' },
  {
    type: 'checkpointQuestion',
    question: 'The band recorded three albums, but only one of ______ songs became a hit. Fill the blank: *its*, *it\'s*, or *their*?',
    answer: '**its.** *Band* is a collective noun treated as a single unit, so its possessive is *its*. The test confirms it: *it\'s* = *it is* yields "one of **it is** songs," which fails, eliminating the apostrophe form. *Their* would need a plural owner, but *band* is singular.',
  },
  {
    type: 'checkpointQuestion',
    question: 'Choose the right spelling: *The two witness\'s / witnesses\' / witnesses accounts matched.* Why?',
    answer: "**witnesses'.** *Two* witnesses → plural, and a noun (*accounts*) follows → the accounts are owned. Multiple owners already ending in *s* take **s'**. The plain plural *witnesses* would claim nothing is owned, but the accounts belong to the witnesses.",
  },
  {
    type: 'checkpointQuestion',
    question: 'Fill each blank: *The company redesigned ______ logo, and now ______ everywhere.* Use *its* or *it\'s* for each.',
    answer: 'First blank **its** — the company owns the logo, so the no-apostrophe possessive applies. Second blank **it\'s** — the meaning is *it is* everywhere, a contraction. The expansion confirms both: "redesigned **it is** logo" fails → *its*; "now **it is** everywhere" works → *it\'s*.',
  },

  {
    type: 'summary',
    title: 'The whole skill in two questions',
    points: [
      'For nouns, settle two questions — **how many** owners, and is **anything owned**?',
      'For pronouns, expand the apostrophe to **is / has** and check whether the sentence survives.',
      'Where **nothing is owned**, no apostrophe belongs.',
    ],
  },
];
