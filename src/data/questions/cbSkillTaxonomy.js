/**
 * College Board Official SAT Skill Taxonomy
 *
 * Source: College Board Educator Question Bank
 *         (https://satsuiteeducatorquestionbank.collegeboard.org/)
 *         API: qbank-api.collegeboard.org/.../digital/get-questions
 *
 * The 19 math skills + 11 R&W skills below are the canonical units College
 * Board uses to organize Bluebook practice tests, the Educator Bank, and
 * Khan Academy's SAT prep. Every question on the digital SAT is tagged
 * with exactly one of these skills by CB.
 *
 * PerformSAT's bank uses a finer-grained "SAT Pattern" granularity below
 * the CB skill (e.g., `slope-from-two-points`, `interpret-slope-in-context`
 * — both sit under CB skill `H.B.` "Linear functions"). Patterns give us
 * precision in drill routing; CB skills give students a recognizable
 * top-level taxonomy that matches what they see in Bluebook.
 *
 * The Practice Bank UI surfaces CB skills as the primary unit. Patterns
 * appear as a secondary "specific question types" expansion inside each
 * skill card.
 */

// ── Math: 19 skills across 4 domains ─────────────────────────────────────────

export const CB_MATH_DOMAIN_LABELS = {
  algebra: 'Algebra',
  'advanced-math': 'Advanced Math',
  'problem-solving': 'Problem-Solving and Data Analysis',
  geometry: 'Geometry and Trigonometry',
};

/**
 * Each CB skill has:
 *   - code:   The CB skill code (e.g., "H.A.")
 *   - domain: PerformSAT-canonical domain slug
 *   - slug:   Stable kebab-case ID used in the runtime
 *   - label:  Student-facing display name (CB's own wording)
 *   - short:  Short label for narrow UI surfaces
 *   - description: One neutral sentence on what the skill covers. Shown on the
 *                  Practice Bank's topic cards, so it is written in the catalog's
 *                  voice (what is in the box), never addressed to the student.
 */
export const CB_MATH_SKILLS = [
  // Algebra (5)
  { code: 'H.A.', domain: 'algebra',         slug: 'linear-equations-one-variable',        label: 'Linear equations in one variable',         short: 'Linear equations',
    description: 'Single-unknown equations, from setup to solution, including cases with no solution or infinitely many.' },
  { code: 'H.B.', domain: 'algebra',         slug: 'linear-functions',                     label: 'Linear functions',                          short: 'Linear functions',
    description: 'Slope, intercepts, and rate of change, with linear models read from tables, graphs, and word problems.' },
  { code: 'H.C.', domain: 'algebra',         slug: 'linear-equations-two-variables',       label: 'Linear equations in two variables',         short: 'Lines in xy-plane',
    description: 'Lines in the xy-plane: slope-intercept and standard form, parallel and perpendicular lines, and their graphs.' },
  { code: 'H.D.', domain: 'algebra',         slug: 'linear-systems',                       label: 'Systems of two linear equations in two variables', short: 'Linear systems',
    description: 'Two equations in two unknowns: substitution, elimination, and the conditions for one, no, or infinitely many solutions.' },
  { code: 'H.E.', domain: 'algebra',         slug: 'linear-inequalities',                  label: 'Linear inequalities in one or two variables', short: 'Linear inequalities',
    description: 'Inequalities in one or two variables, the regions their graphs shade, and constraints translated from context.' },

  // Advanced Math (3)
  { code: 'P.A.', domain: 'advanced-math',   slug: 'equivalent-expressions',               label: 'Equivalent expressions',                    short: 'Equivalent expressions',
    description: 'Rewriting expressions: factoring, expanding, and combining rational and radical terms into an equivalent form.' },
  { code: 'P.B.', domain: 'advanced-math',   slug: 'nonlinear-equations',                  label: 'Nonlinear equations & systems',             short: 'Nonlinear equations',
    description: 'Quadratic, exponential, radical, and rational equations, and systems that pair a line with a curve.' },
  { code: 'P.C.', domain: 'advanced-math',   slug: 'nonlinear-functions',                  label: 'Nonlinear functions',                       short: 'Nonlinear functions',
    description: 'Quadratic and exponential functions: vertex and factored forms, growth and decay, and graph features such as intercepts and extrema.' },

  // Problem-Solving and Data Analysis (7)
  { code: 'Q.A.', domain: 'problem-solving', slug: 'ratios-rates-proportions',             label: 'Ratios, rates, proportional relationships, and units', short: 'Ratios & rates',
    description: 'Ratios, unit rates, proportional reasoning, and unit conversions, including density and scale.' },
  { code: 'Q.B.', domain: 'problem-solving', slug: 'percentages',                          label: 'Percentages',                               short: 'Percentages',
    description: 'Percent of a quantity, percent change, and repeated percent change, from prices to populations.' },
  { code: 'Q.C.', domain: 'problem-solving', slug: 'one-variable-data',                    label: 'One-variable data: distributions and measures of center and spread', short: 'One-variable data',
    description: 'Mean, median, range, and standard deviation, read from lists, dot plots, and histograms, and how an outlier moves each.' },
  { code: 'Q.D.', domain: 'problem-solving', slug: 'two-variable-data',                    label: 'Two-variable data: models and scatterplots', short: 'Scatterplots',
    description: 'Scatterplots and lines of best fit, with linear and exponential models and the meaning of their slopes and intercepts.' },
  { code: 'Q.E.', domain: 'problem-solving', slug: 'probability',                          label: 'Probability and conditional probability',   short: 'Probability',
    description: 'Probability from two-way tables and counts, including conditional probability.' },
  { code: 'Q.F.', domain: 'problem-solving', slug: 'inference-margin-of-error',            label: 'Inference from sample statistics and margin of error', short: 'Margin of error',
    description: 'What a sample statistic says about a population, and how margin of error and sample size limit the claim.' },
  { code: 'Q.G.', domain: 'problem-solving', slug: 'statistical-claims',                   label: 'Evaluating statistical claims: observational studies and experiments', short: 'Statistical claims',
    description: 'Random sampling versus random assignment, and which conclusions an observational study or an experiment can support.' },

  // Geometry and Trigonometry (4)
  { code: 'S.A.', domain: 'geometry',        slug: 'area-and-volume',                      label: 'Area and volume',                           short: 'Area & volume',
    description: 'Area of plane figures and volume of solids, including composite shapes and the effect of scaling a dimension.' },
  { code: 'S.B.', domain: 'geometry',        slug: 'lines-angles-triangles',               label: 'Lines, angles, and triangles',              short: 'Lines & angles',
    description: 'Angle relationships with parallel lines, triangle congruence and similarity, and angle sums in polygons.' },
  { code: 'S.C.', domain: 'geometry',        slug: 'right-triangles-trig',                 label: 'Right triangles and trigonometry',          short: 'Right triangles',
    description: 'The Pythagorean theorem, special right triangles, and the sine, cosine, and tangent of an acute angle.' },
  { code: 'S.D.', domain: 'geometry',        slug: 'circles',                              label: 'Circles',                                   short: 'Circles',
    description: 'Equations of circles in the xy-plane, arc length, sector area, and angles measured in radians.' },
];

// ── R&W: 11 skills across 4 domains ──────────────────────────────────────────

export const CB_RW_DOMAIN_LABELS = {
  'information-and-ideas':         'Information and Ideas',
  'craft-and-structure':           'Craft and Structure',
  'standard-english-conventions':  'Standard English Conventions',
  'expression-of-ideas':           'Expression of Ideas',
};

// ── Domain descriptions ──────────────────────────────────────────────────────
// One neutral sentence per domain for the Practice Bank's domain pane: what the
// domain covers, then its share of the section. Question ranges are the College
// Board Digital SAT specifications per content domain (Math = 44 questions,
// Reading and Writing = 54). Catalog voice, never addressed to the student.

export const CB_DOMAIN_DESCRIPTIONS = {
  algebra: 'Linear equations, inequalities, functions, and systems. 13 to 15 of the 44 questions on the Math section.',
  'advanced-math': 'Equivalent expressions and nonlinear equations and functions. 13 to 15 of the 44 questions on the Math section.',
  'problem-solving': 'Ratios, percentages, data, probability, and statistical reasoning. 5 to 7 of the 44 questions on the Math section.',
  geometry: 'Area and volume, lines and angles, right triangles, and circles. 5 to 7 of the 44 questions on the Math section.',
  'information-and-ideas': 'Central ideas, inferences, and command of evidence. 12 to 14 of the 54 questions on the Reading and Writing section.',
  'craft-and-structure': 'Words in context, text structure and purpose, and cross-text connections. 13 to 15 of the 54 questions on the Reading and Writing section.',
  'standard-english-conventions': 'Sentence boundaries and the form, structure, and sense of a sentence. 11 to 15 of the 54 questions on the Reading and Writing section.',
  'expression-of-ideas': 'Transitions and rhetorical synthesis. 8 to 12 of the 54 questions on the Reading and Writing section.',
};

export const CB_RW_SKILLS = [
  { slug: 'central-ideas-and-details',        domain: 'information-and-ideas',         label: 'Central Ideas and Details',
    description: 'The main idea of a passage and the details that state or support it.' },
  { slug: 'inferences',                       domain: 'information-and-ideas',         label: 'Inferences',
    description: 'The conclusion a passage supports without stating, chosen to complete its reasoning.' },
  { slug: 'command-of-evidence-textual',      domain: 'information-and-ideas',         label: 'Command of Evidence (Textual)',
    description: 'The quotation or finding that best supports, illustrates, or weakens a stated claim.' },
  { slug: 'command-of-evidence-quantitative', domain: 'information-and-ideas',         label: 'Command of Evidence (Quantitative)',
    description: 'Reading a table or graph to complete a claim with the data that fits it.' },
  { slug: 'words-in-context',                 domain: 'craft-and-structure',           label: 'Words in Context',
    description: 'The most precise word for a blank, and the meaning of a word as the passage uses it.' },
  { slug: 'text-structure-and-purpose',       domain: 'craft-and-structure',           label: 'Text Structure and Purpose',
    description: 'The overall purpose of a passage and the function of one sentence within it.' },
  { slug: 'cross-text-connections',           domain: 'craft-and-structure',           label: 'Cross-Text Connections',
    description: 'How two authors writing on one subject agree, differ, or respond to each other.' },
  { slug: 'boundaries',                       domain: 'standard-english-conventions',  label: 'Boundaries',
    description: 'Punctuation between and within sentences: periods, semicolons, commas, colons, and dashes.' },
  { slug: 'form-structure-and-sense',         domain: 'standard-english-conventions',  label: 'Form, Structure, and Sense',
    description: 'Subject-verb agreement, verb tense, pronouns, modifiers, and parallel structure.' },
  { slug: 'transitions',                      domain: 'expression-of-ideas',           label: 'Transitions',
    description: 'The word or phrase that links two sentences by the logical relationship between them.' },
  { slug: 'rhetorical-synthesis',             domain: 'expression-of-ideas',           label: 'Rhetorical Synthesis',
    description: 'Combining a set of notes into one sentence that meets a stated rhetorical goal.' },
];

// ── Pattern → CB Skill mapping ───────────────────────────────────────────────
// Maps each PerformSAT SAT Pattern slug (post-alias) to its CB skill slug.
// When a new pattern appears in a bank item explanation, ADD a row here.
// The audit script `scripts/auditCBCoverage.mjs` will fail if a surfaced
// pattern is missing from this map.
//
// Conservative mapping rules:
//   - If the pattern is a sub-skill of a CB skill, map to that skill.
//   - When a pattern straddles two CB skills, prefer the one the SAT
//     historically classifies it under (see CB Educator Bank for precedent).
//   - Patterns that don't represent a real CB question type are NOT listed
//     here — they should be removed from the bank or renamed.

export const PATTERN_TO_CB_SKILL = {
  // ── H.A. Linear equations in one variable ─────────────────────────────────
  'shifted-output':                          'linear-equations-one-variable', // "If 7x − 4 = 24, find 7x + 11"
  'one-step-linear-equation':                'linear-equations-one-variable',
  'two-step-linear-equation':                'linear-equations-one-variable',
  'multi-step-linear-equation':              'linear-equations-one-variable',
  'linear-equation-with-distribution':       'linear-equations-one-variable',
  'linear-equation-with-variables-on-both-sides': 'linear-equations-one-variable',
  'combining-like-terms':                    'linear-equations-one-variable',
  'absolute-value-equation':                 'linear-equations-one-variable',
  'identifying-identity-contradiction-equations': 'linear-equations-one-variable',
  'matching-coefficients':                   'linear-equations-one-variable',
  'word-problem-to-multi-step-linear':       'linear-equations-one-variable',
  'linear-cost-equation-setup':              'linear-equations-one-variable',

  // ── H.B. Linear functions ─────────────────────────────────────────────────
  'slope-from-two-points':                   'linear-functions',
  'interpret-slope-in-context':              'linear-functions',
  'slope-as-rate-of-change-in-context':      'linear-functions',
  'reading-slope-intercept-form':            'linear-functions',
  'linear-cost-model':                       'linear-functions',
  'solve-for-input-from-output':             'linear-functions',
  'function-evaluation':                     'linear-functions', // direct evaluation of a linear function (f(x) = ax + b)
  'line-from-two-points':                    'linear-functions',

  // ── H.C. Linear equations in two variables ────────────────────────────────
  'parallel-line-through-a-point':           'linear-equations-two-variables',
  'perpendicular-line-through-point':        'linear-equations-two-variables',
  'perpendicular-slope':                     'linear-equations-two-variables',
  'distance-formula':                        'linear-equations-two-variables',
  'midpoint-formula':                        'linear-equations-two-variables',

  // ── H.D. Systems of two linear equations in two variables ─────────────────
  'system-of-equations-substitution':        'linear-systems',
  'system-of-equations-elimination':         'linear-systems',
  'linear-system-by-substitution':           'linear-systems',
  'no-solution-condition':                   'linear-systems',
  'parallel-lines-no-solution':              'linear-systems',
  'same-line-infinitely-many-solutions':     'linear-systems',
  'system-equivalence-check':                'linear-systems',
  'solve-for-a-combination':                 'linear-systems',
  'two-equation-system-from-a-word-problem': 'linear-systems',

  // ── H.E. Linear inequalities ──────────────────────────────────────────────
  'inequality-word-problem-floor':           'linear-inequalities',
  'one-variable-linear-inequality':          'linear-inequalities',
  'system-of-linear-inequalities':           'linear-inequalities',

  // ── P.A. Equivalent expressions ───────────────────────────────────────────
  'vertex-form-to-standard-form':            'equivalent-expressions',
  'rational-expression-simplification':      'equivalent-expressions',
  'common-base-exponent-simplification':     'equivalent-expressions',
  'exponent-rules-with-radicals':            'equivalent-expressions',
  'factor-by-grouping':                      'equivalent-expressions',
  'completing-the-square':                   'equivalent-expressions', // standard form → vertex form

  // ── P.B. Nonlinear equations & systems ────────────────────────────────────
  'quadratic-via-factoring':                 'nonlinear-equations',
  'discriminant-analysis':                   'nonlinear-equations',
  'discriminant-with-integer-bound':         'nonlinear-equations',
  'vieta-sum-product-of-roots':              'nonlinear-equations',
  'tangent-line-and-discriminant':           'nonlinear-equations',
  'rational-equation-with-extraneous-solution': 'nonlinear-equations', // solve, then check domain
  'polynomial-remainder-theorem':            'nonlinear-equations', // p(a)=remainder when divided by (x−a)
  'quadratic-inequality-from-context':       'nonlinear-equations', // ax²+bx+c ≷ 0 from a real-world setup
  'radical-equation':                        'nonlinear-equations', // √(...) = x — isolate then square
  'exponential-equation-with-common-base':   'nonlinear-equations', // 2^(3x)=8 — set exponents equal
  'distance-between-x-intercepts':           'nonlinear-equations', // |root_a − root_b|

  // ── P.C. Nonlinear functions ──────────────────────────────────────────────
  'classify-physical-motion-model':          'nonlinear-functions',
  'interpret-initial-value-in-context':      'nonlinear-functions',
  'interpret-vertex-form':                   'nonlinear-functions',
  'interpret-exponential-parameters':        'nonlinear-functions',
  'exponential-growth-decay':                'nonlinear-functions',
  'exponential-growth-model':                'nonlinear-functions',
  'build-exponential-model':                 'nonlinear-functions',
  'reverse-exponential-back-in-time':        'nonlinear-functions', // past-value: divide by b^n
  'compound-interest':                       'nonlinear-functions', // A = P(1+r)^t — exponential model
  'function-composition':                    'nonlinear-functions',
  'function-evaluation-with-negative-input': 'nonlinear-functions',
  'function-transformation':                 'nonlinear-functions',
  'function-from-shifted-graph':             'nonlinear-functions', // reverse of function-transformation
  'vertical-shift':                          'nonlinear-functions', // f(x) + k
  'horizontal-shift':                        'nonlinear-functions', // f(x ± h)
  'reflection-of-graph':                     'nonlinear-functions', // -f(x) or f(-x)
  'vertical-stretch':                        'nonlinear-functions', // a·f(x)
  'vertex-form-from-two-conditions':         'nonlinear-functions',
  'vertex-form-maximum':                     'nonlinear-functions',

  // ── Q.A. Ratios, rates, proportional relationships, units ────────────────
  'proportion-ratio':                        'ratios-rates-proportions',
  'sum-of-parts-ratio':                      'ratios-rates-proportions',
  'unit-conversion':                         'ratios-rates-proportions',
  'mixture-problems':                        'ratios-rates-proportions',
  'distance-rate-time':                      'ratios-rates-proportions', // d = rt word problems
  'average-rate':                            'ratios-rates-proportions', // total/total
  'simple-interest':                         'ratios-rates-proportions', // A = P(1 + rt); linear growth

  // ── Q.B. Percentages ──────────────────────────────────────────────────────
  'percent-of-a-number':                     'percentages',
  'percent-of-a-whole':                      'percentages',
  'percent-decrease':                        'percentages',
  'reverse-percent':                         'percentages',
  'reverse-percent-multi-step':              'percentages',
  'percent-complement':                      'percentages', // 100% − x%; not probability complement
  'compound-percent-of':                     'percentages', // count-anchored chained percent (1200 × 18% × 25%)
  'chained-percent-relationship':            'percentages', // pure-algebraic chained percent (a→b→c)
  'percent-greater-than-less-than':          'percentages', // "X% greater than" / "X% less than" verbal framing

  // ── Q.C. One-variable data (distributions/center/spread) ─────────────────
  'mean-from-list':                          'one-variable-data',
  'finding-a-missing-value-given-the-mean':  'one-variable-data',
  'outlier-effect':                          'one-variable-data',
  'box-plot-interpretation':                 'one-variable-data',
  'standard-deviation-comparison':           'one-variable-data',
  'median-from-list':                        'one-variable-data',
  'mode-from-list':                          'one-variable-data',
  'scaling-a-data-set':                      'one-variable-data', // effect of × constant on mean/SD

  // ── Q.D. Two-variable data (models, scatterplots) ────────────────────────
  'residual':                                'two-variable-data',
  'scatterplot-line-of-best-fit':            'two-variable-data',
  'interpret-slope-of-best-fit':             'two-variable-data',
  'interpret-intercept-of-best-fit':         'two-variable-data',

  // ── Q.E. Probability and conditional probability ─────────────────────────
  'basic-probability':                       'probability',
  'marginal-probability':                    'probability',
  'conditional-probability-from-two-way-table': 'probability',
  'two-way-table-conditional-probability':   'probability',
  'conditional-probability-with-percent':    'probability',
  'probability-without-replacement':         'probability', // sequential draws, shrinking denominator

  // ── Q.F. Inference / margin of error ──────────────────────────────────────
  'margin-of-error':                         'inference-margin-of-error',
  'confidence-interval-interpretation':      'inference-margin-of-error',
  'sample-size-for-margin-reduction':        'inference-margin-of-error',

  // ── Q.G. Evaluating statistical claims ────────────────────────────────────
  'observational-vs-experimental-study':     'statistical-claims', // random ASSIGNMENT supports causation
  'scope-of-inference':                      'statistical-claims', // sampling validity & generalization

  // ── S.A. Area and volume ──────────────────────────────────────────────────
  'rectangle-area':                          'area-and-volume',
  'square-perimeter':                        'area-and-volume',
  'cylinder-volume':                         'area-and-volume',
  'volume-of-a-rectangular-prism':           'area-and-volume',
  'area-of-a-circle':                        'area-and-volume',
  'symbolic-area-or-volume':                 'area-and-volume', // area/volume expressed in terms of a variable
  'similar-figures-area-ratio':              'area-and-volume', // linear ratio² = area ratio
  'area-of-triangle-from-coordinates':       'area-and-volume', // base-height or shoelace
  'triangle-area':                           'area-and-volume', // generic 1/2 base × height
  'circumference-of-a-circle':               'area-and-volume', // C = 2π r or π d

  // ── S.B. Lines, angles, and triangles ─────────────────────────────────────
  'triangle-angle-sum':                      'lines-angles-triangles',
  'angles-with-parallel-lines-and-transversals': 'lines-angles-triangles',
  'exterior-angle-theorem':                  'lines-angles-triangles',
  'similar-triangles-proportion':            'lines-angles-triangles',
  'vertical-angles':                         'lines-angles-triangles', // ∠ = its vertical pair

  // ── S.C. Right triangles and trigonometry ─────────────────────────────────
  'right-triangle-pythagorean':              'right-triangles-trig',
  'right-triangle-trig-ratios':              'right-triangles-trig',
  'pythagorean-triple-recognition':          'right-triangles-trig',
  'pythagorean-theorem-3-4-5-family':        'right-triangles-trig',
  'soh-cah-toa-in-a-3-4-5-triangle':         'right-triangles-trig',
  'trig-ratio-from-perimeter':               'right-triangles-trig',
  'trig-ratio-with-known-triple':            'right-triangles-trig',
  'radians-degrees-conversion':              'right-triangles-trig', // π/180 or 180/π
  '30-60-90-triangle':                       'right-triangles-trig', // sides 1 : √3 : 2
  '45-45-90-triangle':                       'right-triangles-trig', // sides 1 : 1 : √2

  // ── S.D. Circles ──────────────────────────────────────────────────────────
  'circle-in-standard-form':                 'circles',
  'circle-in-general-form':                  'circles',
  'distance-from-center-as-radius':          'circles',
  'line-tangent-to-circle':                  'circles',
  'arc-length':                              'circles',
  'sector-area':                             'circles', // (θ/360) · π r²
};

// ── Lookup helpers ───────────────────────────────────────────────────────────

const CB_MATH_BY_SLUG = new Map(CB_MATH_SKILLS.map(s => [s.slug, s]));

/**
 * Returns the CB math skill object for a given pattern slug, or null.
 *
 * @param {string} patternSlug — post-alias SAT Pattern slug (the value that
 *   `extractSatPattern` returns).
 */
export function getCBSkillForPattern(patternSlug) {
  const skillSlug = PATTERN_TO_CB_SKILL[patternSlug];
  if (!skillSlug) return null;
  return CB_MATH_BY_SLUG.get(skillSlug) || null;
}

// Canonical display label for ANY CB skill slug, both sections — the official
// College Board names, punctuation included ("Form, Structure, and Sense").
// Naive kebab-case de-slugging loses that punctuation, so every UI surface
// that has only a slug should resolve it here first.
const CB_LABEL_BY_SLUG = new Map(
  [...CB_MATH_SKILLS, ...CB_RW_SKILLS].map((s) => [s.slug, s.label])
);

/**
 * getCBSkillLabel — canonical display name for a CB skill slug (math or R&W).
 * @param {string} slug  e.g. 'form-structure-and-sense'
 * @returns {string|null} 'Form, Structure, and Sense' — null when unknown.
 */
export function getCBSkillLabel(slug) {
  return CB_LABEL_BY_SLUG.get(slug) || null;
}

/**
 * Returns all patterns mapped to a given CB skill slug.
 */
export function getPatternsForCBSkill(cbSkillSlug) {
  return Object.entries(PATTERN_TO_CB_SKILL)
    .filter(([, s]) => s === cbSkillSlug)
    .map(([p]) => p);
}

export function getCBMathSkillsByDomain(domainSlug) {
  return CB_MATH_SKILLS.filter(s => s.domain === domainSlug);
}

export function getCBRWSkillsByDomain(domainSlug) {
  return CB_RW_SKILLS.filter(s => s.domain === domainSlug);
}
