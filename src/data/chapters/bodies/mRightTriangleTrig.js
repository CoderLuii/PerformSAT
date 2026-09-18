/**
 * Learn lesson body — Right-Triangle Trigonometry (Geometry & Trigonometry).
 *
 * VOICE v4 (adopted 2026-07-18, exemplar: bodies/centralIdeas.js):
 * practiced-tutor register — developed 2-5 sentence paragraphs with
 * connective tissue; every rule earns its "because"; student-psychology
 * named concretely; math teaching is example-led; varied rhythm, no
 * aphorism-per-block. Bans carried from v3: no analogies, no pep talk,
 * no exclamation marks, no emojis, no test-personification. All v3
 * teaching claims preserved.
 *
 * COMPOSED MODE (2026-07-18): chapterOpener lede + auto-numbered sections/examples/figures +
 * aside margin-notes + summary close (exemplar: bodies/mPercents.js).
 *
 * Rendered by SectionContent (ContentTabRenderer). Loaded lazily via
 * bodies/index.js — never import this from the chapter index.
 */

export const mRightTriangleTrigBlocks = [
  {
    type: 'chapterOpener',
    lede: "Of the triangle tools from the last chapter, similarity is the one that makes trigonometry possible. Fix an acute angle of a right triangle and you've fixed the ratios of its sides, because every right triangle with that angle is a scaled copy of every other — and sine, cosine, and tangent simply name those ratios. In practice, the work rests less on the ratios themselves than on labeling the sides correctly: one acronym, **SOH-CAH-TOA**, plus one shortcut for the recurring $\\sin(x°) = \\cos(y°)$ question covers nearly all of it, with little calculator work involved.",
  },

  { type: 'heading', content: 'The three ratios' },
  {
    type: 'text',
    content: "Choose one acute angle and describe the whole triangle from that vertex — every label that follows is assigned relative to the angle you chose.",
  },
  {
    type: 'list',
    title: 'The three side labels:',
    items: [
      '**Opposite** — the side across from the chosen angle.',
      "**Adjacent** — the side touching the angle that isn't the longest side.",
      '**Hypotenuse** — the longest side, always across from the right angle, no matter which angle you chose.',
    ],
  },
  {
    type: 'text',
    content: "This labeling carries the entire method, because each ratio is nothing more than a fixed pairing of two of these names. Once the labels are assigned, the choice of sine, cosine, or tangent is determined — no judgment call remains. Figure 1 shows the three labels around the angle and pairs each with its ratio.",
  },
  {
    type: 'diagramRef',
    visualType: 'trigSideLabelingDiagram',
    description: "A right triangle labeled from the acute angle $\\theta$: the adjacent side touches $\\theta$, the opposite side sits across from it, the hypotenuse faces the right angle, and the SOH-CAH-TOA strip pairs each ratio with its two sides.",
  },
  {
    type: 'formulaGrid',
    items: [
      { label: 'SOH', formula: '$\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$', note: 'sine = opposite over hypotenuse.' },
      { label: 'CAH', formula: '$\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$', note: 'cosine = adjacent over hypotenuse.' },
      { label: 'TOA', formula: '$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$', note: 'tangent = opposite over adjacent.' },
    ],
  },

  {
    type: 'example',
    difficulty: 'Easy',
    problem: 'In a right triangle, the angle $\\theta$ has an opposite side of length $6$ and a hypotenuse of length $10$. What is $\\sin\\theta$?',
    steps: [
      { label: 'Select the ratio', content: "The given sides are the opposite and the hypotenuse — the pairing in **SOH**: $\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}$." },
      { label: 'Substitute', content: '$\\sin\\theta = \\dfrac{6}{10} = \\dfrac{3}{5}$.' },
    ],
  },

  { type: 'heading', content: 'Labels come from the angle, not the drawing' },
  {
    type: 'text',
    content: "Draw a right triangle with legs $5$ and $12$. From one acute angle, the $5$ leg sits across the figure — opposite; walk to the other acute angle and the same leg now touches the vertex — adjacent. Nothing about the side changed; the vertex you measured from did. That is why the labels have to be reassigned from scratch whenever the angle of interest changes, and why they can never be read off the drawing's orientation.",
  },
  {
    type: 'keyInsight',
    content: "The same leg is \"opposite\" for one acute angle and \"adjacent\" for the other — so labels come from the chosen angle's vertex, never from how the figure happens to be turned. A trig value is also independent of size: every right triangle with a $30°$ angle has $\\sin 30° = \\tfrac{1}{2}$, whatever its dimensions. The angle alone determines the ratio.",
  },

  { type: 'heading', content: 'Finding a missing side' },
  {
    type: 'text',
    content: "Every missing-side problem turns on one selection: the ratio that connects the side you're **given** to the side you **want**. Name that ratio, set it equal to its fraction, and solve — the equation is one line long, and the labeling has already done the hard part.",
  },
  {
    type: 'aside',
    kind: 'note',
    content: "Resist converting to a decimal. The answer choices are usually **expressions**, so $12\\sin(40°)$ isn't an unfinished answer — it's the answer in its expected form.",
  },
  {
    type: 'table',
    headers: ['Given', 'Required', 'Use'],
    rows: [
      ['hypotenuse + angle', 'opposite side', '$\\sin$'],
      ['hypotenuse + angle', 'adjacent side', '$\\cos$'],
      ['adjacent side + angle', 'opposite side', '$\\tan$'],
    ],
  },

  {
    type: 'example',
    difficulty: 'Medium',
    problem: 'A ramp rises at an angle of $18°$ from the ground. If the ramp is $12$ feet long (the hypotenuse), which expression gives its height $h$?\n\n(A) $12\\sin(18°)$\n(B) $12\\cos(18°)$\n(C) $\\dfrac{12}{\\sin(18°)}$',
    steps: [
      { label: 'Name the sides', content: 'The height is **opposite** the $18°$ angle; the ramp itself is the **hypotenuse**.' },
      { label: 'Choose the ratio', content: 'Opposite paired with hypotenuse is sine: $\\sin(18°) = \\dfrac{h}{12}$.' },
      { label: 'Solve for h', content: 'Multiply both sides by $12$: $h = 12\\sin(18°)$ → **(A)**. Choice (B) comes from mislabeling the height as "adjacent" — the wrong label is the entire error.' },
    ],
  },
  {
    type: 'example',
    difficulty: 'Medium',
    problem: 'From a point $30$ feet from the base of a tree, the angle of elevation to the top is $40°$. Which expression gives the tree\'s height $h$?\n\n(A) $30\\tan(40°)$\n(B) $30\\sin(40°)$\n(C) $\\dfrac{30}{\\tan(40°)}$',
    steps: [
      { label: 'Name the sides', content: "The tree's height is **opposite** the $40°$ angle; the $30$-foot ground distance touches the angle, so it's **adjacent**." },
      { label: 'Choose the ratio', content: "Opposite paired with adjacent is tangent — the hypotenuse isn't involved, so sine doesn't apply: $\\tan(40°) = \\dfrac{h}{30}$." },
      { label: 'Solve for h', content: 'Multiply both sides by $30$: $h = 30\\tan(40°)$ → **(A)**.' },
    ],
  },

  { type: 'heading', content: 'The cofunction identity' },
  {
    type: 'text',
    content: "The two acute angles of a right triangle are complementary — together they account for the $90°$ the right angle leaves behind. Now recall the relabeling fact: viewed from one acute angle, a given leg is **opposite**, while viewed from the other, the same leg is **adjacent**. That exchange of roles is exactly why one angle's sine equals the other angle's cosine — the two ratios use the same leg over the same hypotenuse — so $\\sin\\theta = \\cos(90° - \\theta)$.",
  },
  {
    type: 'aside',
    kind: 'remember',
    content: "When a problem states $\\sin(x°) = \\cos(y°)$ for acute angles, no triangle needs to be drawn. The angles are complementary, so **$x + y = 90$** — that single equation settles the standard version of this question.",
  },

  {
    type: 'example',
    difficulty: 'Hard',
    problem: 'For acute angles, $\\sin(2x + 10)° = \\cos(3x - 5)°$. What is the value of $x$?',
    steps: [
      { label: 'Recognize cofunctions', content: "$\\sin = \\cos$ with acute angles signals the cofunction identity: the two angles are complementary, so their sum is $90$." },
      { label: 'Write the equation', content: '$(2x + 10) + (3x - 5) = 90$.' },
      { label: 'Combine', content: '$5x + 5 = 90$, so $5x = 85$.' },
      { label: 'Solve', content: '$x = 17$.' },
    ],
  },

  {
    type: 'steps',
    title: 'How to approach these questions',
    items: [
      '**Mark the angle in use.** Every label is assigned from that vertex.',
      '**Label the three sides.** Opposite across from the angle, adjacent touching it, hypotenuse across from the right angle.',
      '**Pick the one ratio linking given to required.** SOH, CAH, or TOA — the pairing of sides decides it.',
      '**Solve, and leave the expression.** $12\\sin(40°)$ is a finished answer.',
      '**Watch for the shortcut.** $\\sin(x°) = \\cos(y°)$ with acute angles means $x + y = 90$, no triangle required.',
    ],
  },

  { type: 'heading', content: 'Check yourself' },
  {
    type: 'checkpointQuestion',
    question: 'In a right triangle, angle $\\theta$ has an adjacent side of $8$ and a hypotenuse of $17$. What is $\\cos\\theta$?',
    answer: "**$\\dfrac{8}{17}$.** Adjacent paired with hypotenuse is the **CAH** ratio: $\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}} = \\dfrac{8}{17}$. Once the labels are assigned, the ratio follows immediately.",
  },
  {
    type: 'checkpointQuestion',
    question: 'If $\\sin(x°) = \\cos(y°)$ and both angles are acute, what is $x + y$?',
    answer: "**$90$.** For acute angles, $\\sin(x°) = \\cos(y°)$ means the two angles are complementary — the cofunction identity. No triangle required; the equation $x + y = 90$ is the complete answer.",
  },
  {
    type: 'checkpointQuestion',
    question: 'In a right triangle, angle $\\theta$ has opposite side $7$ and adjacent side $24$. What is $\\tan\\theta$, and what is the hypotenuse?',
    answer: "**$\\tan\\theta = \\dfrac{7}{24}$; the hypotenuse is $25$.** Opposite over adjacent gives $\\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}} = \\dfrac{7}{24}$. The sides form the $7\\text{-}24\\text{-}25$ Pythagorean triple, and the theorem confirms it: $\\sqrt{7^2 + 24^2} = \\sqrt{625} = 25$.",
  },

  {
    type: 'summary',
    title: 'The whole method',
    points: [
      '**Mark the angle in use** — every label is assigned from that vertex, not from how the figure is turned.',
      'Label **opposite, adjacent, and hypotenuse**: opposite across from the angle, hypotenuse across from the right angle.',
      '**Pick the one ratio** — SOH, CAH, or TOA — that links the side you are given to the side you want.',
      'When a problem states $\\sin = \\cos$ for acute angles, skip the triangle: the two angles **sum to $90$**.',
    ],
  },
];
