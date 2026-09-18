/**
 * Extracts the SAT Pattern title from a question's explanation text and
 * returns it in kebab-case. SAT Patterns are encoded as
 * `**SAT Pattern: <Title>**` at the head of every PerformSAT bank and
 * test-bundle explanation (verified universal: 300+ bank + 528 test items).
 *
 * @param {string|null|undefined} text — explanation text (or any value)
 * @returns {string|null} canonical kebab slug (e.g., 'reverse-percent') or null
 *
 * When to use: building the bank's patternIndex at module load, and
 * extracting the SAT Pattern of a wrong test item during diagnosis so the
 * weakness can carry `missedPatterns` into `getTargetedWeaknessSet`'s
 * Tier 1 (exact SAT Pattern) cascade.
 *
 * Alias normalization: test-bundle authors used variant titles for some
 * shared concepts (e.g., "Volume of a Cylinder" vs the canonical "Cylinder
 * Volume", or three variants of "Pythagorean Theorem (5-12-13 ...)"
 * for one Pythagorean triple). The PATTERN_ALIASES map below normalizes
 * these to the canonical slug so the existing bank pool serves all variants.
 * This is the architectural fix for routing-redundancy authoring; without
 * it we'd author 8 duplicate bank items per variant, which is 2000+ items
 * of redundant work for the long tail.
 */

// Non-greedy capture of the title between the `**SAT Pattern:` and the
// closing `**`. The title cannot contain `*` itself — bank/test authoring
// guarantees this (no SAT Pattern title in production contains `*`).
const SAT_PATTERN_RE = /\*\*SAT Pattern:\s*([^*]+?)\s*\*\*/;

/**
 * Maps non-canonical kebab slugs (from test bundles) to canonical slugs
 * (covered in the bank). Keys are post-kebab slugs; values are the canonical
 * slug a covered bank pool already lives under.
 *
 * Granularity principle (2026-05-12, see docs/SAT_PATTERN_GRANULARITY_PROPOSAL.md):
 *   A pattern is the correct granularity when a student who has mastered one
 *   cannot, on test day, apply that mastery to a question of a different
 *   pattern WITHOUT applying a DIFFERENT METHOD.
 *
 *   Recognizing a 5-12-13 triple is a different skill from setting up
 *   Pythagorean on generic sides. Computing f(3) is a different skill from
 *   solving f(a) = c. Vieta's (sum=-b/a, product=c/a) is a different method
 *   from factoring. Line tangent to circle is different geometry from line
 *   tangent to parabola.
 *
 * Add an entry here when:
 *   - A test bundle uses a variant title for a concept the bank already covers
 *   - The two slugs describe a question that requires the SAME method
 *
 * Do NOT add an entry when:
 *   - The patterns require different methods on test day
 *   - One is a textbook-unit-level label and the other is a specific skill
 *   - The "concepts overlap" but a student who masters one wouldn't
 *     transfer to the other without separate practice
 */
const PATTERN_ALIASES = Object.freeze({
  // Volume — cylinder
  'volume-of-a-cylinder': 'cylinder-volume',

  // Volume — rectangular prism (two near-typo variants in test bundles)
  'volume-of-rectangular-prism': 'volume-of-a-rectangular-prism',
  'volume-of-a-rectangular-box': 'volume-of-a-rectangular-prism',

  // Pythagorean — generic theorem (kept aliased, same method as canonical)
  'pythagorean-theorem-on-a-rectangle': 'right-triangle-pythagorean',

  // Pythagorean triple recognition — DISTINCT METHOD from generic Pythagorean.
  // Triple recognition is a memorization shortcut (5-12-13, 3-4-5, 8-15-17,
  // 7-24-25, 9-40-41 families). A student trained only on a^2 + b^2 = c^2
  // won't see the shortcut on test day. Now its own pattern.
  'pythagorean-theorem-5-12-13': 'pythagorean-triple-recognition',
  'pythagorean-theorem-5-12-13-triple': 'pythagorean-triple-recognition',
  'pythagorean-theorem-5-12-13-family': 'pythagorean-triple-recognition',
  'pythagorean-theorem-3-4-5-family': 'pythagorean-triple-recognition',
  'pythagorean-theorem-6-8-10-2x-3-4-5': 'pythagorean-triple-recognition',
  'pythagorean-theorem-multiple-of-3-4-5': 'pythagorean-triple-recognition',
  'perimeter-of-a-right-triangle-3-4-5': 'pythagorean-triple-recognition',

  // Trig — short form, same method
  'soh-cah-toa': 'right-triangle-trig-ratios',

  // Trig with known Pythagorean triple — DISTINCT METHOD from generic trig
  // ratios. With a 5-12-13 or 9-40-41 triangle, students who know the triples
  // can read off sin/cos/tan from memory without recomputing via Pythagorean.
  'soh-cah-toa-in-a-5-12-13-triangle': 'trig-ratio-with-known-triple',
  'soh-cah-toa-in-a-3-4-5-triangle': 'trig-ratio-with-known-triple',
  'soh-cah-toa-in-an-8-15-17-triangle': 'trig-ratio-with-known-triple',
  'soh-cah-toa-tangent-in-a-9-40-41-triangle': 'trig-ratio-with-known-triple',

  // Trig with perimeter constraint — DISTINCT METHOD. Given the perimeter
  // (one equation), you must first solve for the sides before taking the
  // ratio. Different setup from "given sides, find ratio."
  'right-triangle-trigonometry-with-perimeter': 'trig-ratio-from-perimeter',

  // Linear systems — same method (mechanical naming variants)
  'linear-system-by-elimination': 'system-of-equations-elimination',
  'system-by-elimination-sum-difference': 'system-of-equations-elimination',
  'system-by-substitution': 'system-of-equations-substitution',

  // Systems from word problems — title variants, same method
  'system-of-equations-from-word-problem': 'two-equation-system-from-a-word-problem',
  'two-variable-word-problem': 'two-equation-system-from-a-word-problem',
  'word-problem-to-linear-equation': 'two-equation-system-from-a-word-problem',
  'substitution-into-a-two-variable-equation': 'two-equation-system-from-a-word-problem',

  // Proportions — title variants, same method
  'solve-a-proportion': 'proportion-ratio',
  'solving-a-proportion': 'proportion-ratio',
  'solving-a-simple-proportion': 'proportion-ratio',
  'unit-rate-direct-proportion': 'proportion-ratio',
  'proportions': 'proportion-ratio',
  'proportion-with-linear-expressions': 'proportion-ratio',
  'rate-word-problem-proportions': 'proportion-ratio',
  'ratios-with-a-total': 'proportion-ratio',

  // Two-step linear equations — variants (same method, fraction is surface)
  'two-step-equation-with-fraction': 'two-step-linear-equation',
  'two-step-linear-equation-with-fraction-coefficient': 'two-step-linear-equation',
  'linear-equation-with-a-fraction': 'two-step-linear-equation',
  'linear-word-problem-with-two-step-solve': 'two-step-linear-equation',

  // Function evaluation — DIRECT variants only. Compute f(x) at a given
  // input. Different from solve-for-input-from-output below.
  'solving-with-function-notation': 'function-evaluation',
  'solving-via-function-notation': 'function-evaluation',
  'function-evaluation-in-context': 'function-evaluation',
  'exponential-function-evaluation': 'function-evaluation',
  'function-evaluation-with-quadratic': 'function-evaluation',

  // Solve for input from output — DISTINCT METHOD from direct evaluation.
  // Given f(a) = c (output), find a (input). Requires solving an equation,
  // not just substitution. Now its own pattern.
  'solve-f-x-c': 'solve-for-input-from-output',
  'solve-f-a-c': 'solve-for-input-from-output',
  'solving-for-input-from-output': 'solve-for-input-from-output',
  'solving-for-the-input-given-the-output': 'solve-for-input-from-output',

  // Two-way table conditional probability — canonical slug is
  // `conditional-probability-from-two-way-table` (matches the explicit
  // SAT pattern phrasing in PT explanations). Two synonym slugs alias here.
  'two-way-table-conditional-probability': 'conditional-probability-from-two-way-table',
  'two-way-table-conditional-percentage': 'conditional-probability-from-two-way-table',

  // Tangent line to PARABOLA (set line=quadratic, get one quadratic in x,
  // Δ=0). Same method between alias and canonical.
  'tangent-line-via-discriminant-0': 'tangent-line-and-discriminant',

  // Tangent line to CIRCLE — DISTINCT METHOD. Two options on test day:
  // (a) distance-from-center = radius (geometric), or
  // (b) substitute line into circle equation, get quadratic, Δ=0.
  // Both are geometric setups distinct from parabola tangent. Now its own pattern.
  'tangent-line-to-circle-discriminant-0': 'line-tangent-to-circle',

  // Discriminant — Δ=0 is one specific case of Δ-analysis, same method
  'discriminant-equals-zero': 'discriminant-analysis',

  // Zero product property IS factoring's last step — same method
  'zero-product-property': 'quadratic-via-factoring',
  'quadratic-by-factoring': 'quadratic-via-factoring',
  'polynomial-factoring-with-given-factor': 'quadratic-via-factoring',

  // Vieta's sum/product of roots — DISTINCT METHOD from factoring.
  // sum = -b/a, product = c/a, applied directly without finding roots.
  // Useful when roots are irrational/ugly. A student who can factor doesn't
  // necessarily know Vieta's. Now its own pattern.
  'sum-product-of-roots-vieta-s': 'vieta-sum-product-of-roots',
  'vieta-s-with-product-sum-relation': 'vieta-sum-product-of-roots',
  'quadratic-vieta-s-sum-product': 'vieta-sum-product-of-roots',

  // Reading slope-intercept form variants
  'y-intercept-from-slope-intercept-form': 'reading-slope-intercept-form',
  'slope-from-y-mx-b': 'reading-slope-intercept-form',
  'slope-intercept-form': 'reading-slope-intercept-form',

  // Scatterplot / best-fit-line variants — same method
  'line-of-best-fit-prediction': 'scatterplot-line-of-best-fit',

  // Linear cost equation setup — single-variable. Used to be mis-aliased
  // into a 2-variable-system pool. Now its own pattern.
  'linear-cost-setup': 'linear-cost-equation-setup',

  // Probability — complement is the same method (P(not A) = 1 - P(A))
  'complement-probability': 'basic-probability',

  // FOIL / matching coefficients — when the test problem is "expand then
  // match," FOIL is the inner mechanical step. Same skill cluster.
  'expanding-a-product-foil': 'matching-coefficients',
  'algebraic-identity-expansion': 'matching-coefficients',
  'foil-distribution': 'matching-coefficients',

  // Parallel / line-construction variants
  'parallel-line-equation': 'parallel-line-through-a-point',
  'equation-of-a-line-through-two-points': 'line-from-two-points',

  // Combining like terms — variants
  'distribute-and-combine': 'combining-like-terms',

  // Mean — variants
  'mean-from-total': 'mean-from-list',
  'mean-of-a-small-data-set': 'mean-from-list',
  'combined-mean-with-parameter': 'finding-a-missing-value-given-the-mean',

  // Percent — same method variants
  'percent-of-a-value': 'percent-of-a-whole',
  // percent-complement was previously aliased to basic-probability (BUG —
  // unrelated concept). It is now its own pattern (no alias entry; canonical
  // slug is `percent-complement` itself).

  // Triangle angle sum variant (isosceles is a special case, same theorem)
  'isosceles-triangle-angle-sum': 'triangle-angle-sum',

  // Rectangle area variant (word order)
  'area-of-a-rectangle': 'rectangle-area',

  // Exponential growth/decay — rate and period are surface parameter variants
  'exponential-growth-rate': 'exponential-growth-decay',
  'exponential-growth-with-period': 'exponential-growth-decay',

  // Build exponential model — DISTINCT from interpret. See
  // `build-exponential-model` and `interpret-exponential-parameters`
  // as new patterns under the granularity principle. Test-bundle slug
  // `exponential-growth-interpretation` now redirects to interpret.
  'exponential-growth-interpretation': 'interpret-exponential-parameters',
  'exponential-growth-model': 'build-exponential-model',

  // Multi-step linear — DISTINCT from word-problem-to-multi-step under
  // granularity principle. New patterns:
  //   - `pure-algebra-multi-step-linear` (covers current bank pool)
  //   - `word-problem-to-multi-step-linear` (covers word problems)
  // No alias entries needed; test bundles using "Multi-Step Linear Equation"
  // continue to kebab to that slug (still a valid canonical with bank pool).
  // Authors should use the new specific slugs going forward.

  // Percent decrease variant — same method
  'percent-change-decrease': 'percent-decrease',

  // Percent "X greater than" / "X less than" verbal framing — SAME pattern,
  // different surface forms. Test bundles use either kebab slug; both route
  // to the canonical `percent-greater-than-less-than` pool (8 hand-authored
  // items, see bank/problemSolving.js §B3 batch).
  'percent-greater-than':  'percent-greater-than-less-than',
  'percent-less-than':     'percent-greater-than-less-than',
  'percent-increase':      'percent-greater-than-less-than',

  // Two-way table conditional probability — naming variant (with article "a").
  // Identical method to the canonical slug.
  'conditional-probability-from-a-two-way-table': 'conditional-probability-from-two-way-table',

  // Right triangle trigonometry — long-form vs the canonical short slug.
  'right-triangle-trigonometry': 'right-triangle-trig-ratios',

  // Complete-the-square for circle center — same as recognizing a circle in
  // general form (you complete the square to extract (h, k, r)).
  'complete-the-square-circle-center': 'circle-in-general-form',
  'complete-the-square-non-square-radius': 'circle-in-general-form',

  // ── 2026-05-18 batch: Bucket A consolidation (micro-pattern fragments) ───
  // Median (Q.C.) — 9 micro-variants in bank, all same skill (find median of
  // a list). Collapse to canonical `median-from-list`.
  'median-of-sorted-set':              'median-from-list',
  'median-of-sorted-odd-count-set':    'median-from-list',
  'median-of-even-count-set':          'median-from-list',
  'median-of-even-decimal-set':        'median-from-list',
  'median-after-removal-reasoning':    'median-from-list',
  'median-from-frequency-table':       'median-from-list',
  'median-shift-from-insertion':       'median-from-list',
  'mean-median-comparison':            'median-from-list',
  'mode-vs-median-comparison':         'median-from-list',
  'median-calculation':                'median-from-list',
  'median-for-even-count-data-set':    'median-from-list',
  'median-from-a-bar-graph':           'median-from-list',
  'median-of-a-sorted-list':           'median-from-list',
  'median-of-an-odd-sized-data-set':   'median-from-list',
  'median-of-an-ordered-list':         'median-from-list',

  // Mode (Q.C.) — same method (most frequent value)
  'mode-identification':               'mode-from-list',
  'mode-of-shoe-sizes':                'mode-from-list',
  'mode-of-a-data-set':                'mode-from-list',

  // Triangle area (S.A.) — 1/2 base × height; surface variants of the same skill
  'isosceles-triangle-area':           'triangle-area',
  'triangle-area-with-a-line-constraint': 'triangle-area',
  'right-triangle-area':               'triangle-area',
  'right-triangle-area-with-surds':    'triangle-area',

  // Sector area (S.D.) — fraction × π r²; multiple input forms, same method
  'sector-area-from-central-angle':    'sector-area',
  'sector-area-from-arc-length':       'sector-area',
  'sector-area-in-radians':            'sector-area',
  'circumference-radius-sector':       'sector-area',

  // Circumference (S.A.) — C = 2π r or π d; same skill
  'circumference-from-diameter':       'circumference-of-a-circle',

  // Radians ↔ degrees conversion (S.C.) — 5 micro-variants all about the
  // conversion factor π/180 or 180/π. Same method.
  'degrees-to-radians':                'radians-degrees-conversion',
  'radians-to-degrees':                'radians-degrees-conversion',
  'radian-measure-of-a-full-circle':   'radians-degrees-conversion',
  'degrees-to-radians-with-reduction': 'radians-degrees-conversion',
  'radian-degree-conversion-factor':   'radians-degrees-conversion',

  // D = R × T word problems (Q.A.) — multiple surface forms of the same skill
  'rate-time-total':                   'distance-rate-time',
  'rate-time-total-mixed-units':       'distance-rate-time',
  'total-rate-time':                   'distance-rate-time',
  'rate-time':                         'distance-rate-time',
  'rate-time-with-mixed-units':        'distance-rate-time',

  // Average rate (Q.A.) — total/total
  'average-rate-over-time':            'average-rate',

  // ── 2026-05-18 batch: Bucket C PT-title naming variants ──────────────────
  // (PT bundles used variant titles for concepts already covered as canonicals.
  // Adding aliases so these route to the existing bank pool.)
  //
  // Absolute value
  'absolute-value-equation-splits':    'absolute-value-equation',
  'absolute-value-of-a-difference':    'absolute-value-equation',
  // Average
  'average-of-a-small-data-set':       'mean-from-list',
  // Percent
  'basic-percent-of-a-number':         'percent-of-a-number',
  'percent-change-markup':             'percent-greater-than-less-than',
  'percent-discount':                  'percent-decrease',
  'percent-from-counts':               'percent-of-a-whole',
  'fraction-of-a-whole':               'percent-of-a-whole',
  'multi-step-percent':                'chained-percent-relationship',
  'percent-of-a-whole-multi-step':     'chained-percent-relationship',
  // Geometry — parallel/transversal & similar triangles
  'corresponding-angles-parallel-lines': 'angles-with-parallel-lines-and-transversals',
  'similar-triangles-and-area-ratio':  'similar-figures-area-ratio',
  'similar-triangles-side-ratios':     'similar-triangles-proportion',
  'similar-triangles-side-splitter-theorem': 'similar-triangles-proportion',
  // Linear equation — distribution and combining
  'distributing-the-negative-sign':    'linear-equation-with-distribution',
  'distributive-property':             'linear-equation-with-distribution',
  // Line construction — same skill cluster (different setup, same answer form)
  'equation-of-a-line-from-two-points': 'line-from-two-points',
  'equation-of-a-line-from-slope-and-point': 'line-from-two-points',
  'linear-function-from-two-points':   'line-from-two-points',
  'line-from-slope-and-point':         'line-from-two-points',
  'points-on-a-line':                  'line-from-two-points',
  // Function evaluation — direct or via simple manipulation
  'function-at-a-root':                'function-evaluation',
  'function-evaluation-with-rational-function': 'function-evaluation',
  'function-difference':               'function-evaluation',
  'equation-of-a-line-evaluate':       'function-evaluation',
  // Solve for input given output
  'finding-the-x-intercept':           'solve-for-input-from-output',
  'finding-x-given-y-on-a-line':       'solve-for-input-from-output',
  'function-equation-solve-for-input': 'solve-for-input-from-output',
  // Exponent rules — surface variants of the same method
  'exponent-laws-product-and-quotient': 'common-base-exponent-simplification',
  'exponent-rules-same-base-multiplication': 'common-base-exponent-simplification',
  'exponent-rules-with-multiple-variables': 'common-base-exponent-simplification',
  // Exponential growth/decay — surface variants
  'exponential-decay':                 'exponential-growth-decay',
  'exponential-decay-with-half-life':  'exponential-growth-decay',
  'exponential-growth-model-with-period': 'exponential-growth-decay',
  // FOIL / matching coefficients — concept fusion under one canonical
  'foil-multiplying-two-binomials':    'matching-coefficients',
  'parameterized-quadratic-from-a-functional-identity': 'matching-coefficients',
  'polynomial-from-zeros-coefficient-match': 'matching-coefficients',
  'polynomial-from-zeros-value':       'matching-coefficients',
  'solving-for-a-coefficient-given-a-root': 'matching-coefficients',
  'sum-product-cubic-identity':        'matching-coefficients',
  // Probability — counts/joint/independent are all "count favorable / count total"
  'counting-favorable-outcomes':       'basic-probability',
  'independent-probability-with-replacement': 'basic-probability',
  'geometric-probability':             'basic-probability',
  'simple-probability':                'basic-probability',
  'joint-probability-from-two-way-table': 'basic-probability',
  'two-way-table-joint-probability':   'basic-probability',
  'basic-probability-with-constraint': 'basic-probability',
  // Identity / contradiction
  'identifying-contradiction-equations': 'identifying-identity-contradiction-equations',
  'identifying-identity-equations':    'identifying-identity-contradiction-equations',
  // Inequality variants
  'inequality-boundary':               'one-variable-linear-inequality',
  'smallest-integer-in-an-inequality': 'one-variable-linear-inequality',
  // Initial value (interpret)
  'initial-value-in-exponential-function': 'interpret-initial-value-in-context',
  // Scatterplot — interpret/predict are the same skill
  'interpreting-scatterplot-association': 'scatterplot-line-of-best-fit',
  'predicting-from-a-line-of-best-fit': 'scatterplot-line-of-best-fit',
  // Two-step linear — fraction coefficient is a surface variant
  'linear-equation-with-fractional-coefficient': 'two-step-linear-equation',
  // Linear extrapolation — interpret slope to predict future value
  'linear-function-extrapolation':     'interpret-slope-in-context',
  // Classify model — recognize linear/exp/quadratic
  'linear-vs-exponential':             'classify-physical-motion-model',
  'classify-model-by-expanding':       'classify-physical-motion-model',
  // Parallel/perpendicular line construction
  'parallel-lines-and-standard-form':  'parallel-line-through-a-point',
  'perpendicular-line-through-a-point': 'perpendicular-line-through-point',
  // Vertex form construction — multiple input formats, same method
  'parameterized-quadratic-from-zeros-vertex': 'vertex-form-from-two-conditions',
  'quadratic-from-roots-and-vertex-constraint': 'vertex-form-from-two-conditions',
  // Vertex form interpretation
  'quadratic-vertex-form-application': 'interpret-vertex-form',
  // Square perimeter
  'perimeter-of-a-square':             'square-perimeter',
  // Proportion / ratio variants
  'proportion-solving':                'proportion-ratio',
  'algebraic-manipulation-of-ratios':  'proportion-ratio',
  // Distance from center
  'radius-via-distance-formula':       'distance-from-center-as-radius',
  // Rational equation — no solution is a sub-case of extraneous (domain check)
  'rational-equation-with-no-solution': 'rational-equation-with-extraneous-solution',
  // Rectangle area — perimeter+ratio and radical sides are surface variants
  'rectangle-from-perimeter-and-side-ratio': 'rectangle-area',
  'area-with-radical-side-lengths':    'rectangle-area',
  // Reverse area of circle
  'reverse-area-of-a-circle':          'area-of-a-circle',
  // Simplifying radicals
  'simplifying-and-adding-radicals':   'exponent-rules-with-radicals',
  // Slope variants
  'slope-as-rate-of-change':           'slope-as-rate-of-change-in-context',
  'slope-from-two-points-with-negatives': 'slope-from-two-points',
  // System — 2×2 single-variable solve = solve-for-a-combination
  'solve-a-2-times-2-system-for-one-variable': 'solve-for-a-combination',
  // Function composition variants
  'solve-for-inner-function-in-a-composition': 'function-composition',
  // Circle standard form
  'standard-form-circle-centered-at-origin': 'circle-in-standard-form',
  // Perfect square trinomial = standard form of (x+a)² (P.A. equivalent expressions)
  'perfect-square-trinomial':          'vertex-form-to-standard-form',
  // Word-to-expression translation
  'word-to-expression-translation':    'word-problem-to-multi-step-linear',
  // Cube reverse = special rectangular prism
  'volume-of-a-cube-reverse':          'volume-of-a-rectangular-prism',
  // Multi-item cost = linear cost model with two-item terms
  'multi-item-total-cost':             'linear-cost-model',
  // Solving exponential equation with common base — new canonical (Batch B)
  'solving-exponential-equation':      'exponential-equation-with-common-base',
  'exponential-equations-with-common-base': 'exponential-equation-with-common-base',
  // Exponential function from two conditions = build the model
  'exponential-function-with-two-conditions': 'build-exponential-model',
  // Radical equation — multiple surface variants, all about isolating then squaring
  'square-root-equation':              'radical-equation',
  'square-root-solutions':             'radical-equation',
  'square-root-with-sign-restriction': 'radical-equation',
  'square-root-equation-with-both-roots': 'radical-equation',
  'radical-equation-with-potential-extraneous-solution': 'radical-equation',
  // Simple interest variants (Batch B)
  'simple-interest-linear-growth':     'simple-interest',
  'simple-interest-model':             'simple-interest',
  // Completing the square — forward direction (P.A.)
  'quadratic-completing-the-square':   'completing-the-square',
  // Scaling a data set
  'scaling-a-data-set-by-a-constant':  'scaling-a-data-set',
  // Sector arc & central angle = arc length given central angle
  'sector-arc-central-angle':          'arc-length',
  // System with no solution — CB symbolic-constant phrasing (solve for the
  // constant from the no-solution condition). Same method as the covered
  // no-solution pool: proportional x/y coefficients, constant breaking the
  // proportion. (Craft pilot 2026-08-13.)
  'system-with-no-solution':           'no-solution-condition',
});

export const extractSatPattern = (text) => {
  if (!text || typeof text !== 'string') return null;
  const m = SAT_PATTERN_RE.exec(text);
  if (!m) return null;
  const slug = m[1]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return PATTERN_ALIASES[slug] || slug;
};

/**
 * Exposed for testing — the alias map itself.
 * Tests can verify a given non-canonical slug maps to its canonical form.
 */
export const _PATTERN_ALIASES = PATTERN_ALIASES;
