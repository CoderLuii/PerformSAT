// Practice Test 8 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// round-6 blueprint: M1 5E/9M/8H, domains 7/6/5/4. M2 3E/7M/12H with easies
// at Q1, Q2, Q18 and hard closers.
// Figure density lifted to official ~20%: M1 carries 5 diagram items,
// M2 carries 5. Numeric MC choices sorted ascending (official convention).
// Scenario families this test: tide tables, pottery glaze recipes, parking
// garage rates, cross-country ski trails, honey extraction yields, orchard
// ladders (M1); aquifer pumping, bicycle-repair shop, greenhouse ventilation
// (M2); disjoint from tests 1-7 and the concurrent test-9 recreation.

export const practiceTest8 = {
  id: "practice-test-8",
  title: "Practice Test 8",
  description: "Full-length SAT Math practice test with 2 modules",
  totalQuestions: 44,
  timePerModule: 35,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      timeLimit: 35,
      questions: [
{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A surveyor plots line $\\ell$ on the coordinate grid shown. A second line on the same grid crosses line $\\ell$ at a right angle. What is the slope of that second line?",
  diagram: { type: "linearGraph", params: { slope: -0.75, yIntercept: 3, xRange: [-6, 8], yRange: [-6, 8], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, highlightPoints: [[0, 3], [4, 0]], label: "ℓ" } },
  choices: [
    // distractor: takes the reciprocal but keeps the graphed line's negative sign, giving -4/3
    { id: "A", text: "$-\\frac{4}{3}$" },
    // distractor: reports the slope of the graphed line itself, -3/4
    { id: "B", text: "$-\\frac{3}{4}$" },
    // distractor: changes the sign but never takes the reciprocal, giving 3/4
    { id: "C", text: "$\\frac{3}{4}$" },
    { id: "D", text: "$\\frac{4}{3}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** The plotted line falls $3$ units for every $4$ units it runs right, so its slope is $-\\frac{3}{4}$; the perpendicular slope is the opposite reciprocal, $\\frac{4}{3}$.\n\n**The Full Solution:**\nStep 1: Read two marked lattice points off the grid: $(0, 3)$ and $(4, 0)$. The slope of line $\\ell$ is $\\frac{0 - 3}{4 - 0} = -\\frac{3}{4}$.\nStep 2: Two lines meet at a right angle exactly when the product of their slopes is $-1$. Let $m$ be the slope of the second line, so $-\\frac{3}{4} \\cdot m = -1$.\nStep 3: Solving gives $m = \\frac{4}{3}$. Check: $-\\frac{3}{4} \\cdot \\frac{4}{3} = -\\frac{12}{12} = -1$, so the two slopes do describe perpendicular lines. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{4}{3}$): flips $\\frac{3}{4}$ to $\\frac{4}{3}$ but carries the original minus sign along, so the product of the slopes is $\\frac{3}{4} \\cdot \\frac{4}{3} \\cdot (+1) = +1$, not $-1$.\n* Choice B ($-\\frac{3}{4}$): reports the slope of the graphed line instead of the slope of the line drawn across it.\n* Choice C ($\\frac{3}{4}$): changes only the sign. The product would be $-\\frac{3}{4} \\cdot \\frac{3}{4} = -\\frac{9}{16}$, which is not $-1$.\n\n**Test Day Takeaway:** Perpendicular means flip AND negate. Do both moves, then multiply the two slopes together — the product must be exactly $-1$.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Of the 180 hand samples logged from one outcrop, 63 contain visible quartz. One of the logged samples is chosen at random. Which expression gives the probability that the chosen sample contains visible quartz?",
  choices: [
    { id: "A", text: "$\\frac{63}{180}$" },
    // distractor: uses the 117 samples WITHOUT quartz as the denominator instead of all 180
    { id: "B", text: "$\\frac{63}{117}$" },
    // distractor: gives the probability that the sample does NOT contain quartz, 117/180
    { id: "C", text: "$\\frac{117}{180}$" },
    // distractor: inverts the ratio, putting the total over the favorable count
    { id: "D", text: "$\\frac{180}{63}$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Basic Probability**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** Probability is favorable outcomes over total outcomes: $63$ quartz-bearing samples out of $180$ logged samples, or $\\frac{63}{180}$.\n\n**The Full Solution:**\nStep 1: Identify the total. Every one of the $180$ logged samples is equally likely to be chosen, so the denominator is $180$.\nStep 2: Identify the favorable outcomes. Exactly $63$ of those samples contain visible quartz, so the numerator is $63$.\nStep 3: The probability is $\\frac{63}{180}$. Check: the remaining $180 - 63 = 117$ samples have no visible quartz, and $\\frac{63}{180} + \\frac{117}{180} = \\frac{180}{180} = 1$, exactly as the two outcomes of a single draw must. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{63}{117}$): puts the quartz count over the non-quartz count. That is an odds ratio, not a probability, and $\\frac{63}{117} \\approx 0.54$ overstates the chance.\n* Choice C ($\\frac{117}{180}$): counts the samples that do not contain quartz, answering the opposite question.\n* Choice D ($\\frac{180}{63}$): puts the total on top. A probability can never exceed $1$, and $\\frac{180}{63} \\approx 2.86$.\n\n**Test Day Takeaway:** The denominator of a simple probability is the size of the whole group you are drawing from — not the leftover group.",
  skills: ["probability-basics"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A planning office has already reviewed 84 rezoning applications and reviews 12 additional applications each week. Which equation can be used to find the number of weeks $w$ needed for the total number reviewed to reach 300?",
  choices: [
    { id: "A", text: "$84 + 12w = 300$" },
    // distractor: swaps the roles of the starting count and the weekly rate, attaching w to 84
    { id: "B", text: "$84w + 12 = 300$" },
    // distractor: subtracts the 84 already reviewed instead of adding them to the total
    { id: "C", text: "$12w - 84 = 300$" },
    // distractor: treats the weekly reviews as a decrease from the starting count
    { id: "D", text: "$84 - 12w = 300$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The $84$ finished applications are a one-time starting amount and the $12$ per week is a rate, so the total after $w$ weeks is $84 + 12w$, which must equal $300$.\n\n**The Full Solution:**\nStep 1: Fix the starting value. Before any of the $w$ weeks pass, $84$ applications are already reviewed, so $84$ is a constant term, not a coefficient.\nStep 2: Build the changing part. The office adds $12$ applications per week for $w$ weeks, which contributes $12 \\cdot w = 12w$ applications.\nStep 3: Set the total equal to the target: $84 + 12w = 300$. Check: solving gives $12w = 216$, so $w = 18$, and $84 + 12(18) = 84 + 216 = 300$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($84w + 12 = 300$): attaches the variable to the wrong number. It says the office reviews $84$ applications per week and had $12$ finished, which reverses the setup.\n* Choice C ($12w - 84 = 300$): subtracts the completed work. Applications already reviewed count toward the goal, so they are added.\n* Choice D ($84 - 12w = 300$): treats reviewing as shrinking the total. Since $84 < 300$, this equation forces a negative $w$.\n\n**Test Day Takeaway:** In a linear translation, the one-time amount is the constant and the per-unit amount is the coefficient on the variable. Ask \"what happens when the variable is $0$?\" to see which number is which.",
  skills: ["word-problem-to-equation"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The linear model $\\hat{y} = 0.09x + 0.3$ predicts significant wave height $\\hat{y}$, in meters, from wind speed $x$, in knots. The table lists the recorded wave height at five wind speeds. Which statement compares the recorded height with the height the model predicts at $x = 30$?",
  questionTable: { headers: ["Wind speed (knots)", "Recorded wave height (m)"], rows: [["10", "1.3"], ["15", "1.6"], ["20", "2.3"], ["25", "2.5"], ["30", "2.6"]] },
  choices: [
    // distractor: drops the 0.3 intercept (predicting 2.7) and also reverses the direction of the miss
    { id: "A", text: "The model underestimates the recorded height by $0.1$ meter." },
    // distractor: gets the size 0.4 right but reverses which value is larger
    { id: "B", text: "The model underestimates the recorded height by $0.4$ meter." },
    // distractor: drops the 0.3 intercept, predicting 2.7 instead of 3.0, for a gap of 0.1
    { id: "C", text: "The model overestimates the recorded height by $0.1$ meter." },
    { id: "D", text: "The model overestimates the recorded height by $0.4$ meter." }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Residual**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** At $x = 30$ the model predicts $0.09(30) + 0.3 = 3.0$ meters, but only $2.6$ meters was recorded, so the prediction sits $0.4$ meter too high.\n\n**The Full Solution:**\nStep 1: Compute the predicted value at $x = 30$: $\\hat{y} = 0.09(30) + 0.3 = 2.7 + 0.3 = 3.0$ meters.\nStep 2: Read the recorded value from the table's last row: $2.6$ meters.\nStep 3: The residual is recorded minus predicted: $2.6 - 3.0 = -0.4$. A negative residual means the model predicted more than what happened, so the model overestimates by $0.4$ meter. Check: adding the residual back to the prediction restores the data, $3.0 + (-0.4) = 2.6$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (underestimates by $0.1$): drops the intercept, predicting $2.7$, and then reports the miss in the wrong direction.\n* Choice B (underestimates by $0.4$): finds the right gap of $0.4$ but flips the direction. A prediction of $3.0$ against a reading of $2.6$ is too high, not too low.\n* Choice C (overestimates by $0.1$): uses $0.09(30) = 2.7$ as the prediction, forgetting the $+0.3$ intercept, which shrinks the gap to $0.1$.\n\n**Test Day Takeaway:** Residual = actual $-$ predicted. Negative residual, model too high; positive residual, model too low. Compute the prediction from the full equation, intercept included.",
  skills: ["calculate-mean", "slope-intercept-form"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The table summarizes 250 parcels in one district by zoning category and by distance to the nearest transit stop. If a parcel within 400 meters of a stop is selected at random, which expression gives the probability that the parcel is zoned commercial?",
  questionTable: { headers: ["", "Within 400 m", "Farther than 400 m", "Total"], rows: [["Residential", "84", "96", "180"], ["Commercial", "42", "28", "70"], ["Total", "126", "124", "250"]] },
  choices: [
    // distractor: uses all 250 parcels as the denominator, ignoring the within-400-m condition
    { id: "A", text: "$\\frac{42}{250}$" },
    { id: "B", text: "$\\frac{42}{126}$" },
    // distractor: gives the probability that a parcel is within 400 m, not the conditional probability
    { id: "C", text: "$\\frac{126}{250}$" },
    // distractor: conditions on commercial zoning instead of on the distance, reversing the condition
    { id: "D", text: "$\\frac{42}{70}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The phrase \"a parcel within $400$ meters\" shrinks the pool to that column's $126$ parcels, of which $42$ are commercial, so the probability is $\\frac{42}{126}$.\n\n**The Full Solution:**\nStep 1: Find the conditioning group. The selection is made only from parcels within $400$ meters of a stop, and the column total for that group is $126$.\nStep 2: Find the favorable count inside that group. The commercial row meets the \"Within 400 m\" column at $42$.\nStep 3: The probability is $\\frac{42}{126}$. Check: the other $84$ parcels in that column are residential, and $\\frac{42}{126} + \\frac{84}{126} = \\frac{126}{126} = 1$, so the two categories account for the whole conditioning group. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{42}{250}$): divides by the grand total. That answers \"what is the chance a parcel is both commercial and close to transit,\" which is a different question.\n* Choice C ($\\frac{126}{250}$): reports how much of the district is within $400$ meters, ignoring zoning entirely.\n* Choice D ($\\frac{42}{70}$): divides by the commercial row total, which answers the reversed question, \"given a commercial parcel, how likely is it to be within $400$ meters?\"\n\n**Test Day Takeaway:** The condition sets the denominator. Underline the group named after \"if\" and use that group's total, not the grand total.",
  skills: ["conditional-probability", "two-way-table"]
},
{
  id: 6,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A rack in a recording studio holds the microphones listed in the table. One ribbon microphone is taken from the rack and is not returned. If a second microphone is then taken at random, what is the probability that it is also a ribbon microphone?",
  questionTable: { headers: ["Microphone type", "Number in rack"], rows: [["Ribbon", "18"], ["Condenser", "14"], ["Dynamic", "8"]] },
  correctAnswer: "17/39",
  explanation: "**SAT Pattern: Probability Without Replacement**\n\n**The correct answer is $\\frac{17}{39}$.**\n\n**The Fast Way (~20s):** Removing one ribbon microphone leaves $17$ ribbons in a rack of $39$, so the second draw is a ribbon with probability $\\frac{17}{39}$.\n\n**The Full Solution:**\nStep 1: Total the rack before anything is removed: $18 + 14 + 8 = 40$ microphones.\nStep 2: One ribbon microphone leaves and does not come back, so both counts drop by one: $18 - 1 = 17$ ribbons remain out of $40 - 1 = 39$ microphones.\nStep 3: The second draw is made from those $39$, so the probability is $\\frac{17}{39}$. Check: the $22$ non-ribbon microphones are untouched, and $\\frac{17}{39} + \\frac{22}{39} = \\frac{39}{39} = 1$. ✓\n\n**Common Mistakes:**\n* $\\frac{18}{40}$ ($= 0.45$): ignores the removal entirely and treats the second draw as if the rack were still full.\n* $\\frac{18}{39}$ ($\\approx 0.46$): shrinks the total to $39$ but forgets that the microphone removed was itself a ribbon, so the numerator must drop too.\n* $\\frac{17}{40}$ ($= 0.425$): shrinks the ribbon count but leaves the total at $40$, double-counting a microphone that is no longer in the rack.\n\n**Test Day Takeaway:** \"Not returned\" changes BOTH numbers. Subtract one from the total and, when the item removed matches the category asked about, subtract one from that category as well.",
  skills: ["probability-basics"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An excavated channel is modeled in cross-section with the ground surface along $y = x^2 - 6x + 11$ and a straight drain pipe along $y = 2x + c$. The pipe meets the ground surface at exactly one point. What is the value of the constant $c$?",
  choices: [
    { id: "A", text: "$-5$" },
    // distractor: never subtracts the line's 2x, using b = -6 in the discriminant, which gives c = 2
    { id: "B", text: "$2$" },
    // distractor: drops the sign when solving 4c = -20, reporting 5 instead of -5
    { id: "C", text: "$5$" },
    // distractor: combines -6x and 2x as -4x instead of -8x, which gives c = 7
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Setting the two expressions equal gives $x^2 - 8x + (11 - c) = 0$, and one shared point means the discriminant vanishes: $64 - 4(11 - c) = 0$, so $c = -5$.\n\n**The Full Solution:**\nStep 1: A shared point satisfies both equations, so set them equal: $x^2 - 6x + 11 = 2x + c$. Move everything to one side: $x^2 - 8x + (11 - c) = 0$.\nStep 2: \"Exactly one point\" means this quadratic has exactly one real root, so its discriminant $b^2 - 4ac$ is $0$: $(-8)^2 - 4(1)(11 - c) = 0$.\nStep 3: Expand and solve: $64 - 44 + 4c = 0$, so $4c = -20$ and $c = -5$. Check: with $c = -5$ the quadratic is $x^2 - 8x + 16 = (x - 4)^2$, whose only root is $x = 4$; there the line gives $2(4) - 5 = 3$ and the parabola gives $16 - 24 + 11 = 3$, the same point $(4, 3)$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($2$): uses $b = -6$ from the parabola without subtracting the line's $2x$. Then $36 - 4(11 - c) = 0$ gives $4c = 8$ and $c = 2$, but the line $y = 2x + 2$ actually cuts the parabola twice.\n* Choice C ($5$): reaches $4c = -20$ correctly and then reports $5$, losing the negative sign.\n* Choice D ($7$): writes $-6x + 2x$ as $-4x$. Then $16 - 4(11 - c) = 0$ gives $4c = 28$ and $c = 7$.\n\n**Test Day Takeaway:** One intersection point equals one root equals discriminant $= 0$. Combine the linear terms carefully before you square $b$ — that subtraction is where the item hides its trap.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A survey line runs 84 meters east from a benchmark and then due north to a marker post. The post is 205 meters from the benchmark in a straight line. How many meters north does the survey line run?",
  correctAnswer: "187",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $187$.**\n\n**The Fast Way (~30s):** The east and north runs are the legs and the $205$-meter straight line is the hypotenuse, so the north leg is $\\sqrt{205^2 - 84^2} = \\sqrt{34{,}969} = 187$.\n\n**The Full Solution:**\nStep 1: East and north are perpendicular directions, so the path forms a right triangle with legs $84$ and $n$ and hypotenuse $205$.\nStep 2: Apply the Pythagorean theorem: $84^2 + n^2 = 205^2$, that is $7{,}056 + n^2 = 42{,}025$, so $n^2 = 34{,}969$.\nStep 3: Take the positive square root: $n = \\sqrt{34{,}969} = 187$ meters. Check: $84^2 + 187^2 = 7{,}056 + 34{,}969 = 42{,}025 = 205^2$. ✓\n\n**Common Mistakes:**\n* $121$: subtracts the lengths themselves, $205 - 84$, instead of subtracting their squares. The Pythagorean theorem never lets you subtract sides directly.\n* $221.5$: adds the squares, $\\sqrt{205^2 + 84^2} \\approx 221.5$, treating the $205$-meter straight line as a leg. The straight-line distance is always the longest side here.\n* $34{,}969$: stops at $n^2$ and reports the square instead of taking the square root.\n\n**Test Day Takeaway:** Name the hypotenuse first — it is the side opposite the right angle, and in a \"straight-line distance\" problem it is the straight line. Legs get added; the hypotenuse gets subtracted.",
  skills: ["pythagorean-theorem"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Two mastering engineers estimate the time for a project of $p$ songs with the formulas $6(p - 1) + kp$ and $2p + 26$, both in hours, where $k$ is a constant. The two estimates agree when $p = 4$. What is the value of $k$?",
  choices: [
    // distractor: adds the 2p to the left side instead of subtracting it, giving 4(8 + k) = 32 and k = 0
    { id: "A", text: "$0$" },
    { id: "B", text: "$4$" },
    // distractor: adds 18 to 34 instead of subtracting it, giving 4k = 52 and k = 13
    { id: "C", text: "$13$" },
    // distractor: stops at 4k = 16 and reports 16 without dividing by 4
    { id: "D", text: "$16$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Substituting $p = 4$ turns the equality into $18 + 4k = 34$, so $4k = 16$ and $k = 4$.\n\n**The Full Solution:**\nStep 1: The two formulas agree at $p = 4$, so write $6(4 - 1) + k(4) = 2(4) + 26$.\nStep 2: Simplify each side. The left side becomes $6(3) + 4k = 18 + 4k$ and the right side becomes $8 + 26 = 34$.\nStep 3: Subtract $18$ from both sides to get $4k = 16$, then divide by $4$ to get $k = 4$. Check: with $k = 4$ the left formula gives $6(3) + 4(4) = 18 + 16 = 34$ hours and the right gives $2(4) + 26 = 34$ hours. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): collects the terms as $p(6 + k + 2) = 32$, adding the $2p$ instead of subtracting it. That gives $4(8 + k) = 32$, so $8 + k = 8$ and $k = 0$ — but $k = 0$ makes the left formula $18$, not $34$.\n* Choice C ($13$): moves the $18$ to the right side by adding, producing $4k = 34 + 18 = 52$ and $k = 13$. Constants cross the equals sign by subtraction.\n* Choice D ($16$): reaches $4k = 16$ and reports $16$, forgetting the last division.\n\n**Test Day Takeaway:** Plug the given value in first, then simplify each side completely before you move anything across the equals sign. The final division is the step most often skipped.",
  skills: ["combining-like-terms"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A land-use model pairs the requirement $3x + 5y = 12$ with the requirement $9x + ky = 20$, where $x$ and $y$ are the changes, in hectares, in land zoned for housing and for retail and $k$ is a constant. No pair of values $(x, y)$ meets both requirements. What is the value of $k$?",
  choices: [
    // distractor: reports the multiplier 3 between the two equations rather than the coefficient it produces
    { id: "A", text: "$3$" },
    // distractor: copies the first equation's y-coefficient without scaling it by 3
    { id: "B", text: "$5$" },
    { id: "C", text: "$15$" },
    // distractor: scales the 5 by 9, the second equation's x-coefficient, instead of by the ratio 3
    { id: "D", text: "$45$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The $x$-coefficients scale by $9 \\div 3 = 3$, so a no-solution system needs the $y$-coefficients to scale the same way: $k = 3 \\cdot 5 = 15$.\n\n**The Full Solution:**\nStep 1: Two linear equations have no common solution exactly when their left sides are proportional but their right sides are not — the graphs are parallel and distinct.\nStep 2: Compare the $x$-terms: $9x$ is $3$ times $3x$. For proportionality the $y$-terms must obey the same factor, so $ky = 3(5y)$ and $k = 15$.\nStep 3: Verify that the constants break the pattern: $3$ times $12$ is $36$, and the second equation's constant is $20$, not $36$. Check: with $k = 15$ the second equation is $9x + 15y = 20$; multiplying the first by $3$ gives $9x + 15y = 36$, and no pair $(x, y)$ can make the same expression equal both $20$ and $36$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): reports the scale factor itself. The factor tells you what to multiply by; it is not the coefficient.\n* Choice B ($5$): copies the $y$-coefficient straight down. With $k = 5$ the equations are $3x + 5y = 12$ and $9x + 5y = 20$, which have different slopes and therefore exactly one solution.\n* Choice D ($45$): multiplies $5$ by $9$ instead of by $3$, using the second equation's coefficient rather than the ratio between the two equations.\n\n**Test Day Takeaway:** No solution means \"same left side, different right side.\" Find the factor from the $x$-terms, apply it to the $y$-terms, and confirm the constants do NOT follow it.",
  skills: ["system-solution-types"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table summarizes the numbers of tracks on the 26 albums in a studio archive. Four more albums, each with 11 tracks, are added to the archive. What is the mode of the numbers of tracks for the 30 albums?",
  questionTable: { headers: ["Number of tracks", "Number of albums"], rows: [["8", "3"], ["9", "8"], ["10", "5"], ["11", "6"], ["12", "4"]] },
  choices: [
    // distractor: gives the mode of the original 26 albums, ignoring the four albums added
    { id: "A", text: "$9$" },
    // distractor: reports the median of the 30 albums instead of the mode
    { id: "B", text: "$10$" },
    { id: "C", text: "$11$" },
    // distractor: reports the greatest number of tracks listed rather than the most frequent
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Adding four albums to the $11$-track row raises its count from $6$ to $10$, which beats the $8$ albums with $9$ tracks, so the mode is $11$.\n\n**The Full Solution:**\nStep 1: Read the frequencies from the table: $8$ tracks appears $3$ times, $9$ appears $8$ times, $10$ appears $5$ times, $11$ appears $6$ times, and $12$ appears $4$ times, totaling $26$ albums.\nStep 2: Update the row that changes. Four albums with $11$ tracks each raise that frequency from $6$ to $6 + 4 = 10$; every other row is unchanged.\nStep 3: The new frequencies are $3$, $8$, $5$, $10$, $4$, and the largest is $10$, which belongs to $11$ tracks. Check: the frequencies now sum to $3 + 8 + 5 + 10 + 4 = 30$ albums, matching the count in the question, and no other value occurs $10$ or more times. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): the mode before the change. With $8$ albums, $9$ tracks led the original list, but $11$ tracks now occurs $10$ times.\n* Choice B ($10$): the median. The $15$th and $16$th values in the ordered list of $30$ are both $10$, so $10$ is the middle, not the most frequent.\n* Choice D ($12$): the largest value in the left column. Mode asks which value occurs most often, not which value is greatest.\n\n**Test Day Takeaway:** In a frequency table the mode lives in the second column — find the largest frequency, then read the value beside it. Update the frequency before you compare.",
  skills: ["find-mode"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Two survey stakes on a seafloor grid are at $A(2, 9)$ and $B(8, 6)$ in the xy-plane. The perpendicular bisector of $\\overline{AB}$ meets the y-axis at $(0, k)$. What is the value of $k$?",
  correctAnswer: "-2.5",
  explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**The correct answer is $-2.5$.**\n\n**The Fast Way (~40s):** $\\overline{AB}$ has slope $-\\frac{1}{2}$ and midpoint $(5, 7.5)$, so the bisector is $y = 2(x - 5) + 7.5$, which hits the y-axis at $-2.5$.\n\n**The Full Solution:**\nStep 1: Find the slope of $\\overline{AB}$: $\\frac{6 - 9}{8 - 2} = \\frac{-3}{6} = -\\frac{1}{2}$. The perpendicular bisector must have the opposite reciprocal slope, $2$.\nStep 2: Find the point the bisector passes through — the midpoint of $\\overline{AB}$: $\\left(\\frac{2 + 8}{2}, \\frac{9 + 6}{2}\\right) = (5, 7.5)$.\nStep 3: Write the line through $(5, 7.5)$ with slope $2$: $y - 7.5 = 2(x - 5)$, or $y = 2x - 2.5$. At $x = 0$ this gives $k = -2.5$. Check: the point $(5, 7.5)$ satisfies $y = 2x - 2.5$ since $2(5) - 2.5 = 7.5$, and $2 \\cdot \\left(-\\frac{1}{2}\\right) = -1$ confirms the two lines are perpendicular. ✓\n\n**Common Mistakes:**\n* $10$: uses the slope of $\\overline{AB}$ itself, $-\\frac{1}{2}$, instead of the perpendicular slope, producing $y = -\\frac{1}{2}x + 10$.\n* $5$: uses the correct slope of $2$ but runs the line through endpoint $A(2, 9)$ rather than the midpoint, giving $y = 2x + 5$.\n* $17.5$: takes the perpendicular slope as $-2$, negating the slope without flipping it, which gives $y = -2x + 17.5$.\n\n**Test Day Takeaway:** A perpendicular bisector needs two ingredients — the opposite reciprocal slope AND the midpoint. Compute both before you write a single equation.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A diffuser panel for a recording booth is cut as a right triangle whose acute angles measure $30^\\circ$ and $60^\\circ$. The face of the panel has an area of $200\\sqrt{3}$ square inches. What is the perimeter, in inches, of the panel?",
  choices: [
    // distractor: adds only the two legs, 20 and 20*sqrt(3), and omits the 40-inch hypotenuse
    { id: "A", text: "$20 + 20\\sqrt{3}$" },
    { id: "B", text: "$60 + 20\\sqrt{3}$" },
    // distractor: uses 3 times the short leg (60) as the hypotenuse instead of 2 times the short leg (40)
    { id: "C", text: "$80 + 20\\sqrt{3}$" },
    // distractor: writes the longer leg as 40*sqrt(3), doubling the short leg before multiplying by sqrt(3)
    { id: "D", text: "$60 + 40\\sqrt{3}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** In a $30$-$60$-$90$ triangle the legs are $a$ and $a\\sqrt{3}$, so $\\frac{a^2\\sqrt{3}}{2} = 200\\sqrt{3}$ gives $a = 20$, and the perimeter is $20 + 20\\sqrt{3} + 40 = 60 + 20\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: Name the sides. A right triangle with acute angles $30^\\circ$ and $60^\\circ$ has sides in the ratio $a : a\\sqrt{3} : 2a$, where $a$ is the leg opposite the $30^\\circ$ angle.\nStep 2: Use the area to find $a$. The two legs are perpendicular, so the area is $\\frac{1}{2} \\cdot a \\cdot a\\sqrt{3} = \\frac{a^2\\sqrt{3}}{2}$. Setting $\\frac{a^2\\sqrt{3}}{2} = 200\\sqrt{3}$ gives $a^2 = 400$, so $a = 20$ inches.\nStep 3: Add the three sides: $20 + 20\\sqrt{3} + 2(20) = 60 + 20\\sqrt{3}$ inches. Check: with $a = 20$ the area is $\\frac{1}{2}(20)(20\\sqrt{3}) = 200\\sqrt{3}$ square inches, matching the given, and $20^2 + (20\\sqrt{3})^2 = 400 + 1200 = 1600 = 40^2$ confirms the hypotenuse. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20 + 20\\sqrt{3}$): stops after the two legs. Perimeter is the distance around all three sides, and the hypotenuse contributes another $40$ inches.\n* Choice C ($80 + 20\\sqrt{3}$): triples the short leg for the hypotenuse. In a $30$-$60$-$90$ triangle the hypotenuse is twice the short leg, $40$, not three times it.\n* Choice D ($60 + 40\\sqrt{3}$): builds the longer leg from the hypotenuse, writing $40\\sqrt{3}$. The $\\sqrt{3}$ multiplies the SHORT leg, giving $20\\sqrt{3}$.\n\n**Test Day Takeaway:** Write the $30$-$60$-$90$ ratio $a : a\\sqrt{3} : 2a$ before touching the numbers. The area uses the two legs only; the perimeter needs all three sides.",
  skills: ["triangle-area"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "On a street plan, one centerline is the graph of $8x - 6y = 21$ and another is the graph of $y = \\frac{2c}{9}x - 4$ for some constant $c$. The two centerlines never meet. What is the value of $c$?",
  choices: [
    // distractor: drops the sign when dividing by -6, taking the first slope as -4/3 and getting c = -6
    { id: "A", text: "$-6$" },
    { id: "B", text: "$6$" },
    // distractor: ignores the factor of 2 in 2c/9, solving c/9 = 4/3 to get c = 12
    { id: "C", text: "$12$" },
    // distractor: reads the first line's slope as 8, the coefficient of x, giving 2c/9 = 8 and c = 36
    { id: "D", text: "$36$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Solving $8x - 6y = 21$ for $y$ gives slope $\\frac{4}{3}$; setting $\\frac{2c}{9} = \\frac{4}{3}$ gives $c = 6$.\n\n**The Full Solution:**\nStep 1: Put the first centerline in slope-intercept form. From $8x - 6y = 21$, subtract $8x$ to get $-6y = -8x + 21$, then divide by $-6$: $y = \\frac{4}{3}x - \\frac{7}{2}$.\nStep 2: Lines in the same plane never meet exactly when they have equal slopes and different y-intercepts, so set $\\frac{2c}{9} = \\frac{4}{3}$.\nStep 3: Cross-multiply: $6c = 36$, so $c = 6$. Check: with $c = 6$ the second centerline is $y = \\frac{12}{9}x - 4 = \\frac{4}{3}x - 4$, whose slope matches $\\frac{4}{3}$ while its intercept $-4$ differs from $-\\frac{7}{2}$, so the two lines are parallel and distinct. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): divides $-8x + 21$ by $-6$ without changing the sign of the $x$-term, producing slope $-\\frac{4}{3}$ and then $c = -6$.\n* Choice C ($12$): matches $\\frac{c}{9}$ to $\\frac{4}{3}$, overlooking the $2$ multiplying $c$ in the numerator.\n* Choice D ($36$): treats $8$ as the slope of the first line, forgetting that the $-6y$ must be divided out first.\n\n**Test Day Takeaway:** Convert to $y = mx + b$ before comparing slopes, and watch the sign when you divide by a negative $y$-coefficient — that sign flip is the whole trap.",
  skills: ["system-solution-types"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The function $u$ gives the number of housing units approved in a district $t$ years after 2010, and $u(t) = mt + b$, where $m$ and $b$ are constants. From 2014 to 2020 the number approved decreased by 27 units, and 96 units were approved in 2018. What is the value of $b$?",
  choices: [
    // distractor: subtracts the 36-unit change instead of adding it back, giving 96 - 36 = 60
    { id: "A", text: "$60$" },
    // distractor: reports the 2018 count as b, but b is the value at t = 0, which is 2010
    { id: "B", text: "$96$" },
    // distractor: walks the rate back over 6 years instead of the 8 years from 2010 to 2018, giving 96 + 27 = 123
    { id: "C", text: "$123$" },
    { id: "D", text: "$132$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** The rate is $m = \\frac{-27}{6} = -4.5$ units per year, so walking back the $8$ years from 2018 to 2010 gives $b = 96 + 4.5(8) = 132$.\n\n**The Full Solution:**\nStep 1: Convert the years to $t$-values. 2014 is $t = 4$, 2018 is $t = 8$, and 2020 is $t = 10$.\nStep 2: Find $m$. Between $t = 4$ and $t = 10$ the output falls by $27$ over $6$ years, so $m = \\frac{-27}{10 - 4} = -4.5$.\nStep 3: Use the known point $u(8) = 96$: $-4.5(8) + b = 96$, so $-36 + b = 96$ and $b = 132$. Check: $u(4) = -4.5(4) + 132 = 114$ and $u(10) = -4.5(10) + 132 = 87$, and $114 - 87 = 27$, exactly the stated decrease. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($60$): computes $96 - 36$. Because the function is decreasing, earlier years have LARGER outputs, so the $36$ must be added back.\n* Choice B ($96$): treats the 2018 value as the constant $b$. In $u(t) = mt + b$, $b$ is the output at $t = 0$, which is the year 2010.\n* Choice C ($123$): applies the rate over $6$ years rather than $8$, adding $4.5(6) = 27$ instead of $4.5(8) = 36$.\n\n**Test Day Takeaway:** Translate the years to $t$ first, get $m$ from the change over the matching span, then substitute one known point. Going backward in $t$ on a decreasing line means going UP in value.",
  skills: ["slope-intercept-form"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For a peaking equalizer filter, the quadratic function $g$ gives the gain, in decibels, at a frequency of $x$ hundred hertz. The table gives the gain at four frequencies. What is the maximum gain, in decibels, of the filter?",
  questionTable: { headers: ["$x$ (hundred hertz)", "$g(x)$ (decibels)"], rows: [["3", "$-4$"], ["5", "$8$"], ["9", "$8$"], ["11", "$-4$"]] },
  choices: [
    // distractor: takes the leading coefficient as +1 instead of -1, so g(5) = 8 gives k = 4
    { id: "A", text: "$4$" },
    // distractor: reports the greatest gain listed in the table instead of the vertex value
    { id: "B", text: "$8$" },
    { id: "C", text: "$12$" },
    // distractor: treats the gains as linear, continuing the +12 rise from x = 3 to x = 5 out to x = 7
    { id: "D", text: "$20$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The equal gains at $x = 5$ and $x = 9$ put the axis of symmetry at $x = 7$; writing $g(x) = a(x - 7)^2 + k$ and using two table rows gives $a = -1$ and $k = 12$.\n\n**The Full Solution:**\nStep 1: Locate the axis of symmetry. A parabola takes the same value at points equally far from its vertex, and $g(5) = g(9) = 8$, so the axis is at $x = \\frac{5 + 9}{2} = 7$ and $g(x) = a(x - 7)^2 + k$.\nStep 2: Substitute two rows. From $x = 5$: $a(5 - 7)^2 + k = 8$, so $4a + k = 8$. From $x = 3$: $a(3 - 7)^2 + k = -4$, so $16a + k = -4$.\nStep 3: Subtract the first equation from the second: $12a = -12$, so $a = -1$ and $k = 8 - 4(-1) = 12$. Since $a < 0$ the parabola opens downward and $k$ is the maximum, so the maximum gain is $12$ decibels. Check: $g(11) = -(11 - 7)^2 + 12 = -16 + 12 = -4$, matching the last table row. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): uses $a = +1$, which gives $k = 8 - 4 = 4$. An upward-opening parabola has a minimum, not a maximum, and it would not produce the $-4$ readings at both ends.\n* Choice B ($8$): reports the largest gain in the table. The table never lists $x = 7$, so the peak itself is not shown.\n* Choice D ($20$): extends the $+12$ jump from $x = 3$ to $x = 5$ for two more units. Quadratic values do not rise at a constant rate; the increase shrinks as the curve nears its vertex.\n\n**Test Day Takeaway:** Two equal outputs hand you the axis of symmetry for free. Get $h$ from the midpoint, then solve for $a$ and $k$ with any other row — the maximum is $k$, never the biggest number printed in the table.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A monitoring buoy records $250$ micrograms per liter of a dissolved tracer at release and $205$ micrograms per liter $4$ hours later, and the concentration continues to fall by the same percent every $4$ hours. Which function models the concentration $C(t)$, in micrograms per liter, $t$ hours after release?",
  choices: [
    // distractor: uses the fraction lost, (250 - 205)/250 = 0.18, as the multiplier instead of the fraction remaining, 0.82
    { id: "A", text: "$C(t) = 250(0.18)^{\\frac{t}{4}}$" },
    // distractor: multiplies the time by 4 instead of dividing, running four decay periods per hour
    { id: "B", text: "$C(t) = 250(0.82)^{4t}$" },
    { id: "C", text: "$C(t) = 250(0.82)^{\\frac{t}{4}}$" },
    // distractor: finds the 18% drop and then applies it as an 18% increase, using base 1.18
    { id: "D", text: "$C(t) = 250(1.18)^{\\frac{t}{4}}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** One $4$-hour period takes $250$ down to $205$, and $\\frac{205}{250} = 0.82$, so $C(t) = 250(0.82)^{\\frac{t}{4}}$.\n\n**The Full Solution:**\nStep 1: Set the initial amount. At release, $t = 0$, the concentration is $250$ micrograms per liter, so $250$ is the coefficient in front.\nStep 2: Find the multiplier for one period. Dividing the later reading by the earlier one gives $\\frac{205}{250} = 0.82$, so each $4$-hour period keeps $82\\%$ of what was there — a loss of $18\\%$.\nStep 3: Count the periods. One period lasts $4$ hours, so $t$ hours contain $\\frac{t}{4}$ periods, giving $C(t) = 250(0.82)^{\\frac{t}{4}}$. Check: $C(4) = 250(0.82)^1 = 205$, the recorded reading, and $C(8) = 250(0.82)^2 = 168.1$, another $18\\%$ below it. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($250(0.18)^{\\frac{t}{4}}$): uses the fraction LOST, $\\frac{250 - 205}{250} = 0.18$, as the multiplier. After one period that leaves $250(0.18) = 45$ micrograms per liter, not the recorded $205$.\n* Choice B ($250(0.82)^{4t}$): multiplies the time by $4$ instead of dividing. At $t = 4$ it applies the decay $16$ times, leaving about $10.4$ micrograms per liter.\n* Choice D ($250(1.18)^{\\frac{t}{4}}$): finds the $18\\%$ drop and then applies it as a rise. A base above $1$ makes the concentration grow, reporting $295$ at $t = 4$ instead of $205$.\n\n**Test Day Takeaway:** Divide the later reading by the earlier one to get the multiplier for ONE period — the base is that quotient, never the part that disappeared. If the period is $n$ time units, the exponent is $\\frac{t}{n}$.",
  skills: ["exponential-growth-decay"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A subdivision plan shows two similar triangular parcels, $PQR$ and $STU$, with areas of 3,600 square meters and 10,000 square meters. Side $PQ$ measures 45 meters. What is the length, in meters, of the corresponding side $ST$?",
  choices: [
    // distractor: reduces the area ratio to 25/9 but square-roots only the numerator, scaling 45 by 5/9
    { id: "A", text: "$25$" },
    // distractor: inverts the scale factor, shrinking the side by 3/5 instead of enlarging it by 5/3
    { id: "B", text: "$27$" },
    { id: "C", text: "$75$" },
    // distractor: scales the side by the full area ratio 10000/3600 instead of by its square root
    { id: "D", text: "$125$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The areas are in the ratio $\\frac{3600}{10000} = \\frac{9}{25}$, so the sides are in the ratio $\\frac{3}{5}$, making $ST = 45 \\cdot \\frac{5}{3} = 75$ meters.\n\n**The Full Solution:**\nStep 1: Form the area ratio, smaller to larger: $\\frac{3600}{10000} = \\frac{9}{25}$.\nStep 2: For similar figures, areas scale as the SQUARE of the side ratio, so the side ratio is $\\sqrt{\\frac{9}{25}} = \\frac{3}{5}$. Since $PQR$ is the smaller parcel, $\\frac{PQ}{ST} = \\frac{3}{5}$.\nStep 3: Solve $\\frac{45}{ST} = \\frac{3}{5}$ to get $ST = \\frac{45 \\cdot 5}{3} = 75$ meters. Check: squaring the side ratio $\\frac{75}{45} = \\frac{5}{3}$ gives $\\frac{25}{9}$, and $3600 \\cdot \\frac{25}{9} = 10{,}000$, the larger parcel's area. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): reduces $\\frac{10000}{3600}$ to $\\frac{25}{9}$ and then takes the square root of only the top, scaling by $\\frac{5}{9}$: $45 \\cdot \\frac{5}{9} = 25$.\n* Choice B ($27$): applies the factor upside down, computing $45 \\cdot \\frac{3}{5} = 27$. That would shrink the side of the LARGER parcel.\n* Choice D ($125$): scales by the area ratio itself, $45 \\cdot \\frac{10000}{3600} = 125$, skipping the square root. That parcel would have area $3600 \\cdot \\left(\\frac{125}{45}\\right)^2 \\approx 27{,}778$ square meters.\n\n**Test Day Takeaway:** Sides scale by $k$, areas by $k^2$. Going from areas back to sides always costs you a square root — and check which figure is larger before you multiply or divide.",
  skills: ["similar-triangles"]
},
{
  id: 19,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cylindrical core sample 36 centimeters long and 10 centimeters in diameter is emptied into a cylindrical tube of radius 6 centimeters, and the sediment fills the tube to a depth of $d$ centimeters with none left over. What is the value of $d$?",
  correctAnswer: "25",
  explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $25$.**\n\n**The Fast Way (~45s):** The core's radius is half of $10$, so it holds $\\pi(5)^2(36) = 900\\pi$ cubic centimeters; in the tube that same volume gives $36\\pi d = 900\\pi$, so $d = 25$.\n\n**The Full Solution:**\nStep 1: Halve the diameter to get the core's radius, $\\frac{10}{2} = 5$ centimeters, then use $V = \\pi r^2 h$: $\\pi(5)^2(36) = \\pi(25)(36) = 900\\pi$ cubic centimeters.\nStep 2: Write the same volume in the tube. Its radius is given directly as $6$, so the filled portion has volume $\\pi(6)^2 d = 36\\pi d$.\nStep 3: Nothing is lost, so $36\\pi d = 900\\pi$, giving $d = \\frac{900}{36} = 25$ centimeters. Check: $\\pi(6)^2(25) = \\pi(36)(25) = 900\\pi$, the same volume the core held. ✓\n\n**Common Mistakes:**\n* $100$: uses the diameter $10$ as the radius. That inflates the core to $\\pi(10)^2(36) = 3{,}600\\pi$ cubic centimeters and gives $d = \\frac{3600}{36} = 100$.\n* $30$: scales the length by the ratio of the radii, $36 \\cdot \\frac{5}{6} = 30$. Volume depends on the radius SQUARED, so the column shrinks by $\\frac{25}{36}$, not $\\frac{5}{6}$.\n* $43.2$: uses $36 \\cdot \\frac{6}{5}$, lengthening the column. A wider tube holds the same sediment in a SHORTER column, so $d$ must come out below $36$.\n\n**Test Day Takeaway:** Check radius against diameter before you square anything. When material moves from one container to another the volume is what stays fixed, so set the two volume expressions equal and solve.",
  skills: ["volume-prism"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cubic model for a settling curve is $p(x) = 2x^3 + kx^2 - 17x + 20$ for some constant $k$, and $x - 4$ divides $p(x)$ evenly. What is the sum of the three solutions to $p(x) = 0$?",
  correctAnswer: "2.5",
  explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**The correct answer is $2.5$.**\n\n**The Fast Way (~50s):** $x - 4$ dividing evenly means $p(4) = 0$, which gives $80 + 16k = 0$ and $k = -5$; the solutions are then $4$, $1$, and $-\\frac{5}{2}$, summing to $2.5$.\n\n**The Full Solution:**\nStep 1: If $x - 4$ divides $p(x)$ with no remainder, then $p(4) = 0$. Substituting gives $2(64) + k(16) - 17(4) + 20 = 128 + 16k - 68 + 20 = 80 + 16k$, so $16k = -80$ and $k = -5$.\nStep 2: Write the full polynomial and factor out the known piece: $p(x) = 2x^3 - 5x^2 - 17x + 20 = (x - 4)(2x^2 + 3x - 5)$.\nStep 3: Factor the quadratic: $2x^2 + 3x - 5 = (2x + 5)(x - 1)$, so the three solutions are $4$, $-\\frac{5}{2}$, and $1$, and their sum is $4 - 2.5 + 1 = 2.5$. Check: expanding $(x - 4)(2x + 5)(x - 1)$ returns $2x^3 - 5x^2 - 17x + 20$, and $p(1) = 2 - 5 - 17 + 20 = 0$. ✓\n\n**Common Mistakes:**\n* $4$: stops after using the given factor and reports the one solution it hands you. The question asks for all three added together.\n* $7.5$: reads the factor $2x + 5$ as the solution $x = \\frac{5}{2}$ instead of $x = -\\frac{5}{2}$, turning the sum into $4 + 1 + 2.5$.\n* $-5$: reports the constant $k$ rather than the sum of the solutions. Finding $k$ is only the first of two stages.\n\n**Test Day Takeaway:** A stated factor is a stated zero — substitute it to pin the unknown coefficient, then divide it out and factor what is left. Read the final question again before you write the answer.",
  skills: ["finding-roots-factoring"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "On a mixing console, moving the fader to position $x$ produces a gain of $s(x)$ decibels, and a gain of $x$ decibels produces a meter reading of $v(x)$. Using the table, what is the meter reading produced when the fader is set to position 2?",
  questionTable: { headers: ["$x$", "$s(x)$", "$v(x)$"], rows: [["1", "3", "9"], ["2", "5", "6"], ["3", "1", "8"], ["4", "4", "5"], ["5", "2", "7"]] },
  choices: [
    // distractor: applies s twice, computing s(s(2)) = s(5) = 2 instead of v(s(2))
    { id: "A", text: "$2$" },
    // distractor: stops at the gain s(2) = 5 and never converts it to a meter reading
    { id: "B", text: "$5$" },
    // distractor: reads v at the fader position, v(2) = 6, skipping the fader-to-gain step
    { id: "C", text: "$6$" },
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Position $2$ gives a gain of $s(2) = 5$ decibels, and a gain of $5$ decibels gives a meter reading of $v(5) = 7$.\n\n**The Full Solution:**\nStep 1: Identify the order. The fader position feeds $s$, and the gain that comes out feeds $v$, so the meter reading is $v(s(2))$ — the inner function runs first.\nStep 2: Evaluate the inner function. In the row $x = 2$, the $s(x)$ column reads $5$, so the gain is $5$ decibels.\nStep 3: Feed that output into $v$. Look for $x = 5$ and read the $v(x)$ column: $v(5) = 7$, so the meter reads $7$. Check: reversing the order gives $s(v(2)) = s(6)$, which the table cannot even evaluate, confirming that $v(s(2))$ is the composition the setup describes. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): applies $s$ a second time, computing $s(s(2)) = s(5) = 2$. The second stage of the signal path is $v$, not $s$ again.\n* Choice B ($5$): reports the gain $s(2) = 5$. That is the intermediate value in decibels, not the meter reading.\n* Choice C ($6$): looks up $v(2) = 6$, feeding the fader POSITION into $v$. $v$ takes a gain as its input, and the gain at position $2$ is $5$.\n\n**Test Day Takeaway:** In a composition, work from the inside out and label what each number means as you go. Writing \"position $2 \\to$ gain $5 \\to$ reading $7$\" makes the skipped-step traps visible.",
  skills: ["function-composition"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The number of algal cells in a 1-liter seawater sample $t$ days after a bloom begins is given by the expression $\\frac{2^{4t} \\cdot 8^{t+3}}{4^{3t-2}}$. Which expression is equivalent to this one?",
  choices: [
    { id: "A", text: "$2^{t+13}$" },
    // distractor: subtracts the denominator's -4 instead of adding it, giving 7t + 9 - 6t - 4 = t + 5
    { id: "B", text: "$2^{t+5}$" },
    // distractor: leaves 8^(t+3) unconverted, using exponent t + 3 instead of 3t + 9
    { id: "C", text: "$2^{7-t}$" },
    // distractor: adds the denominator's exponent instead of subtracting it, giving 7t + 9 + 6t - 4
    { id: "D", text: "$2^{13t+5}$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** Rewriting everything in base $2$ gives $\\frac{2^{4t} \\cdot 2^{3t+9}}{2^{6t-4}} = 2^{(7t+9)-(6t-4)} = 2^{t+13}$.\n\n**The Full Solution:**\nStep 1: Convert each base to a power of $2$. Since $8 = 2^3$, $8^{t+3} = 2^{3(t+3)} = 2^{3t+9}$; since $4 = 2^2$, $4^{3t-2} = 2^{2(3t-2)} = 2^{6t-4}$.\nStep 2: Multiply in the numerator by adding exponents: $2^{4t} \\cdot 2^{3t+9} = 2^{4t+3t+9} = 2^{7t+9}$.\nStep 3: Divide by subtracting exponents: $2^{(7t+9)-(6t-4)} = 2^{7t+9-6t+4} = 2^{t+13}$. Check: at $t = 1$ the original is $\\frac{2^4 \\cdot 8^4}{4^1} = \\frac{16 \\cdot 4096}{4} = 16{,}384$, and $2^{1+13} = 2^{14} = 16{,}384$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($2^{t+5}$): subtracts the constant $-4$ as if it were $+4$, giving $7t + 9 - 6t - 4$. Subtracting a negative exponent adds.\n* Choice C ($2^{7-t}$): forgets to rewrite $8^{t+3}$ in base $2$ and uses $t + 3$ for its exponent, which loses the factor of $3$.\n* Choice D ($2^{13t+5}$): adds the denominator's exponent instead of subtracting it. That result grows far faster than the original, which is $2^{14}$ at $t = 1$ rather than $2^{18}$.\n\n**Test Day Takeaway:** Get every base identical first, distribute the outer exponent, then add for multiplication and subtract for division. Test $t = 1$ in both the original and your answer as a $10$-second safety check.",
  skills: ["exponent-laws"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 8 — Math Module 2 (22 questions)
// Official-calibration recreation (2026-09-01). Frozen flow: easies at Q1,
// Q2, Q18 (breather); mediums at Q3, Q5, Q6, Q9, Q12, Q13, Q16; hards at
// Q4, Q7, Q8, Q10, Q11, Q14, Q15, Q17, Q19, Q20, Q21, Q22. 3E / 7M / 12H
// with a band ramp from warm-up openers to parameter-heavy hard closers.
// Q1-5 warm-ups are never trivial: rate-scaling (Q1), percent-complement
// distractor field (Q2), negative-slope reading (Q3), multi-step product
// target (Q4), weighted-percent table (Q5) — trap families unused in the
// recreated tests 1-7.

{
  id: 1,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table gives the absorbance $A(c)$ recorded by a spectrophotometer for four calibration solutions of concentration $c$, in milligrams per liter. If $A$ is a linear function of $c$, what is the value of $A(15)$?",
  questionTable: { headers: ["$c$ (mg/L)", "$A(c)$"], rows: [["$2$", "$0.14$"], ["$5$", "$0.32$"], ["$8$", "$0.50$"], ["$11$", "$0.68$"]] },
  choices: [
    // distractor: adds one unit-step of 0.06 to 0.68, treating c = 15 as one unit past c = 11 instead of four
    { id: "A", text: "$0.74$" },
    // distractor: adds one full table increment of 0.18 (three units) to 0.68 instead of four unit-steps
    { id: "B", text: "$0.86$" },
    // distractor: computes 0.06(15) and drops the initial value 0.02
    { id: "C", text: "$0.90$" },
    { id: "D", text: "$0.92$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Evaluation**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Absorbance climbs $0.54$ across the $9$ units from $c = 2$ to $c = 11$, so it climbs $0.06$ per unit; four more units past $c = 11$ gives $0.68 + 4(0.06) = 0.92$.\n\n**The Full Solution:**\nStep 1: A linear function has a constant rate of change. Using the first and last rows, that rate is $\\frac{0.68 - 0.14}{11 - 2} = \\frac{0.54}{9} = 0.06$ absorbance unit per milligram per liter.\nStep 2: Write $A(c) = 0.06c + b$ and use the row $c = 2$, $A = 0.14$: $0.14 = 0.06(2) + b = 0.12 + b$, so $b = 0.02$ and $A(c) = 0.06c + 0.02$.\nStep 3: Evaluate at $c = 15$: $A(15) = 0.06(15) + 0.02 = 0.90 + 0.02 = 0.92$. Check the two middle rows against this rule: $A(5) = 0.30 + 0.02 = 0.32$ and $A(8) = 0.48 + 0.02 = 0.50$, both matching the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.74$): adds a single step of $0.06$ to the last table value, as though $c = 15$ were one unit past $c = 11$ rather than four.\n* Choice B ($0.86$): adds one whole table increment, $0.18$ for every three units, to $0.68$ instead of the four unit-steps the jump actually needs.\n* Choice C ($0.90$): computes $0.06(15)$ and forgets the initial value $0.02$, so every answer it produces is short by exactly that constant.\n\n**Test Day Takeaway:** A table of a linear function gives you the rate from any two rows; get the initial value from one row before you evaluate anywhere outside the table.",
  skills: ["function-evaluation"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A nightly batch job takes $s$ minutes to run. After the search index is rebuilt, the job's runtime is $62\\%$ less than $s$ minutes. Which expression represents the new runtime, in minutes?",
  choices: [
    { id: "A", text: "$0.38s$" },
    // distractor: gives the time removed, 62% of s, rather than the time the job still takes
    { id: "B", text: "$0.62s$" },
    // distractor: adds the remaining 38% to the full original runtime instead of keeping only that 38%
    { id: "C", text: "$1.38s$" },
    // distractor: adds the 62% instead of subtracting it, modeling a 62% increase
    { id: "D", text: "$1.62s$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** A $62\\%$ decrease leaves $100\\% - 62\\% = 38\\%$ of the original, so the rebuilt job takes $0.38s$ minutes.\n\n**The Full Solution:**\nStep 1: The time the rebuild removes is $62\\%$ of $s$, which is $0.62s$ minutes.\nStep 2: The new runtime is what is left after that removal: $s - 0.62s$.\nStep 3: Factor out $s$: $s - 0.62s = (1 - 0.62)s = 0.38s$. Check with $s = 50$: the rebuild saves $0.62(50) = 31$ minutes and the job still needs $19$, and $0.38(50) = 19$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($0.62s$): this is the time the rebuild saved, not the time the job still takes.\n* Choice C ($1.38s$): keeps the correct $38\\%$ but attaches it to the original as growth, giving a job that runs longer after the rebuild.\n* Choice D ($1.62s$): adds the $62\\%$ instead of subtracting it, which models a $62\\%$ increase.\n\n**Test Day Takeaway:** A percent decrease of $p\\%$ means multiplying by $1 - \\frac{p}{100}$ in one move; the percent itself is never the multiplier.",
  skills: ["percent-change"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A compression utility reduces a data set to $80\\%$ of its original size. A second pass then reduces the already-compressed data by $p$ percent, and the result is $76\\%$ smaller than the original data set. What is the value of $p$?",
  choices: [
    // distractor: reports the percent of the original that survives both passes, 24, instead of the second pass's percent decrease
    { id: "A", text: "$24$" },
    // distractor: reports the percent of the compressed data that survives the second pass, 30, rather than the percent it removes
    { id: "B", text: "$30$" },
    // distractor: subtracts 20 from 76, treating the two percent decreases as additive
    { id: "C", text: "$56$" },
    { id: "D", text: "$70$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Increase**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Ending $76\\%$ smaller means $0.24$ of the original survives, and the first pass already left $0.80$; since $0.80 \\times 0.30 = 0.24$, the second pass keeps $30\\%$ and therefore removes $70\\%$.\n\n**The Full Solution:**\nStep 1: Let the original size be $x$. After the first pass the size is $0.80x$, and the second pass multiplies that by $1 - \\frac{p}{100}$.\nStep 2: A result $76\\%$ smaller than the original has size $(1 - 0.76)x = 0.24x$, so $0.80x\\left(1 - \\frac{p}{100}\\right) = 0.24x$.\nStep 3: Divide both sides by $0.80x$: $1 - \\frac{p}{100} = 0.30$, so $\\frac{p}{100} = 0.70$ and $p = 70$. Check with $x = 500$ gigabytes: the first pass leaves $400$, removing $70\\%$ of that leaves $120$, and $120$ is $76\\%$ below $500$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($24$): this is the percent of the original that survives both passes, which the stem already gave as $100 - 76$; it is not the second pass's rate.\n* Choice B ($30$): this is the fraction of the compressed data still left after the second pass, $0.30$, read as a percent removed.\n* Choice C ($56$): subtracts $20$ from $76$, treating chained percent decreases as if they add; percent changes compose by multiplying.\n\n**Test Day Takeaway:** Chained percent changes multiply their surviving fractions, so convert every stated decrease to what remains before you combine them.",
  skills: ["percent-of-value", "percent-change"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A supplier quotes $4(kt - 3) + 8t$ hundred dollars for $t$ tons of reinforcing steel, and a competitor quotes $2(10t + 5) - 6$ hundred dollars for the same order, where $k$ is a constant. For what value of $k$ are the two quotes never equal for any value of $t$?",
  choices: [
    // distractor: solves 4k = 8 - 20 instead of 4k = 20 - 8, subtracting in the wrong direction
    { id: "A", text: "$-3$" },
    { id: "B", text: "$3$" },
    // distractor: solves 4k = 20 + 8 = 28, adding the 8 instead of subtracting it
    { id: "C", text: "$7$" },
    // distractor: stops at 4k = 12 and reports 12 without dividing by 4
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Expanded, the quotes are $(4k + 8)t - 12$ and $20t + 4$; they can never be equal only if the $t$-coefficients match while the constants do not, so $4k + 8 = 20$ and $k = 3$.\n\n**The Full Solution:**\nStep 1: Expand each side. The supplier's quote is $4kt - 12 + 8t = (4k + 8)t - 12$, and the competitor's is $20t + 10 - 6 = 20t + 4$.\nStep 2: Setting them equal gives $(4k + 8)t - 12 = 20t + 4$, or $(4k + 8 - 20)t = 16$. This has no solution exactly when the coefficient of $t$ is zero and the constant is not, since $0 \\cdot t = 16$ is impossible.\nStep 3: Solve $4k + 8 - 20 = 0$: $4k = 12$, so $k = 3$. Check: with $k = 3$ the supplier's quote is $20t - 12$ and the competitor's is $20t + 4$, which differ by $16$ hundred dollars at every $t$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): sets up $4k = 8 - 20 = -12$, subtracting in the wrong direction after moving the $8$ across.\n* Choice C ($7$): sets up $4k = 20 + 8 = 28$, adding the $8$ rather than subtracting it from $20$.\n* Choice D ($12$): reaches $4k = 12$ correctly but reports that value as $k$ without dividing by $4$.\n\n**Test Day Takeaway:** Two linear expressions are never equal exactly when their variable coefficients match and their constants do not, so collect both sides before you judge the number of solutions.",
  skills: ["solving-equations"]
},
{
  id: 5,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "For nine trials, a chemist recorded the reaction rate, in millimoles per liter per minute, at temperature $T$, in degrees Celsius; the scatterplot and its line of best fit $\\hat{r} = 0.5T - 4$ are shown. A tenth trial, not plotted, had a residual of $1.5$ and a measured rate of $15.5$. At what temperature was the tenth trial run?",
  diagram: { type: "scatterplot", params: { points: [[20, 6.9], [25, 7.4], [30, 11.6], [35, 12.8], [40, 17.3], [45, 18], [50, 21.8], [55, 22.3], [60, 26.4]], xMin: 15, xMax: 65, yMin: 0, yMax: 30, xGridStep: 5, yGridStep: 5, xLabelStep: 10, yLabelStep: 10, xLabel: "Temperature (degrees Celsius)", yLabel: "Rate (mmol per L per min)", bestFitLine: { slope: 0.5, intercept: -4 } } },
  correctAnswer: "36",
  explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~25s):** A residual of $1.5$ means the measurement sits $1.5$ above the line, so the predicted rate was $15.5 - 1.5 = 14$; solving $0.5T - 4 = 14$ gives $T = 36$.\n\n**The Full Solution:**\nStep 1: Residual equals measured value minus predicted value, so $1.5 = 15.5 - \\hat{r}$ and the predicted rate for that trial is $\\hat{r} = 14$.\nStep 2: The prediction comes from the line of best fit, so set $0.5T - 4 = 14$.\nStep 3: Add $4$ to both sides to get $0.5T = 18$, then divide by $0.5$ to get $T = 36$. Check: at $T = 36$ the line predicts $0.5(36) - 4 = 14$, and $15.5 - 14 = 1.5$, the stated residual ✓\n\n**Common Mistakes:**\n* $42$: adds the residual to the measured rate, using $\\hat{r} = 17$ and solving $0.5T - 4 = 17$.\n* $39$: skips the residual entirely and sets the line equal to the measured rate, $0.5T - 4 = 15.5$.\n* $28$: solves $0.5T = 14$ without first undoing the $-4$ in the model.\n\n**Test Day Takeaway:** Residual = actual $-$ predicted, so a positive residual means the point sits above the line and the prediction is the smaller number.",
  skills: ["scatterplots", "linear-functions"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Marked on the figure are the angle measures, in degrees, at the three corners of a steel gusset plate. Subtracting the narrowest corner measure from the widest one gives how many degrees?",
  diagram: { type: "triangleWithAngles", params: { angleLabels: ["(2x + 9)°", "(x + 5)°", "(3x - 14)°"], vertexLabels: ["J", "K", "L"], figureNote: true } },
  choices: [
    // distractor: subtracts the two largest angles, 76 - 69, instead of the widest minus the narrowest
    { id: "A", text: "$7$" },
    // distractor: reports the value of x, 30, rather than a difference of angle measures
    { id: "B", text: "$30$" },
    // distractor: subtracts 35 from 69, using the middle angle in place of the widest
    { id: "C", text: "$34$" },
    { id: "D", text: "$41$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The three measures sum to $180$, so $6x = 180$ and $x = 30$; the corners then measure $69$, $76$, and $35$ degrees, and $76 - 35 = 41$.\n\n**The Full Solution:**\nStep 1: The interior angles of a triangle sum to $180$ degrees: $(2x + 9) + (3x - 14) + (x + 5) = 180$.\nStep 2: Combine like terms: $6x + 0 = 180$, so $x = 30$.\nStep 3: Substitute back: $2(30) + 9 = 69$, $3(30) - 14 = 76$, and $30 + 5 = 35$. The widest corner is $76$ and the narrowest is $35$, so the difference is $76 - 35 = 41$. Check: $69 + 76 + 35 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): differences the two largest measures, $76 - 69$, instead of the widest and the narrowest.\n* Choice B ($30$): stops at $x = 30$; the variable is only a step toward the angle measures, never an angle itself here.\n* Choice C ($34$): computes $69 - 35$, taking $(2x + 9)$ to be the widest corner without comparing it to $(3x - 14)$.\n\n**Test Day Takeaway:** Solve for the variable, then convert every expression to a number before you decide which angle is largest — the biggest coefficient is not always the biggest angle.",
  skills: ["triangle-angle-sum"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Each hour, a $240$-microgram sample of a radioactive tracer loses $15\\%$ of the mass it still has. Which equation gives the mass $A$, in micrograms, that remains after $t$ hours?",
  choices: [
    // distractor: uses the 15% lost as the hourly multiplier instead of the 85% retained
    { id: "A", text: "$A = 240(0.15)^t$" },
    { id: "B", text: "$A = 240(0.85)^t$" },
    // distractor: models a 15% hourly gain rather than a 15% hourly loss
    { id: "C", text: "$A = 240(1.15)^t$" },
    // distractor: adds 0.85 to 1 instead of subtracting 0.15 from 1
    { id: "D", text: "$A = 240(1.85)^t$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Losing $15\\%$ each hour keeps $85\\%$ each hour, so the multiplier is $0.85$ and $A = 240(0.85)^t$.\n\n**The Full Solution:**\nStep 1: Exponential decay has the form $A = A_0 b^t$, where $A_0$ is the starting mass and $b$ is the fraction that survives one hour.\nStep 2: Here $A_0 = 240$ micrograms, and a $15\\%$ hourly loss leaves $100\\% - 15\\% = 85\\%$, so $b = 0.85$.\nStep 3: The model is $A = 240(0.85)^t$. Check one hour by hand: the sample loses $0.15(240) = 36$ micrograms and keeps $204$, and $240(0.85)^1 = 204$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($A = 240(0.15)^t$): uses the percent lost as the multiplier, so after one hour it predicts $36$ micrograms rather than $204$.\n* Choice C ($A = 240(1.15)^t$): a base above $1$ makes the sample grow, which contradicts a tracer that is decaying.\n* Choice D ($A = 240(1.85)^t$): starts from the correct $0.85$ but adds it to $1$, again producing growth instead of decay.\n\n**Test Day Takeaway:** For repeated percent loss the base is $1$ minus the rate; a base greater than $1$ can only describe growth.",
  skills: ["exponential-growth-decay"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "On a site plan, the edge of a circular reflecting pool consists of the points satisfying $(x - 12)^2 + (y + 5)^2 = r^2$, with $r > 0$ and units in meters. The point $(20, 1)$ is on that edge. Across its widest part, how many meters wide is the pool?",
  choices: [
    // distractor: reports the radius, 10, instead of the width across the pool
    { id: "A", text: "$10$" },
    // distractor: adds the horizontal and vertical offsets, 8 + 6, instead of using the Pythagorean theorem
    { id: "B", text: "$14$" },
    { id: "C", text: "$20$" },
    // distractor: reports r squared, 100, as a length
    { id: "D", text: "$100$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The center is $(12, -5)$, and the given edge point is $8$ right and $6$ up from it, so $r = \\sqrt{8^2 + 6^2} = 10$ and the pool is $2r = 20$ meters across.\n\n**The Full Solution:**\nStep 1: In $(x - h)^2 + (y - k)^2 = r^2$ the center is $(h, k)$. Rewriting $(y + 5)^2$ as $(y - (-5))^2$ shows the center is $(12, -5)$.\nStep 2: Substitute the edge point $(20, 1)$: $(20 - 12)^2 + (1 + 5)^2 = 8^2 + 6^2 = 64 + 36 = 100$, so $r^2 = 100$ and $r = 10$ meters.\nStep 3: The widest distance across a circle is the diameter, $2r = 20$ meters. Check: the point $(2, -5)$, which is $10$ meters left of the center, satisfies $(2 - 12)^2 + (-5 + 5)^2 = 100$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): this is the radius; the width across the pool at its widest is twice that.\n* Choice B ($14$): adds the two offsets, $8 + 6$, instead of combining them with the Pythagorean theorem, which always overstates the distance.\n* Choice D ($100$): reports $r^2$, the number the substitution produces, without taking the square root.\n\n**Test Day Takeaway:** Standard form hands you $r^2$, not $r$ — take the root, then double it if the question asks how far across.",
  skills: ["circle-equation"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 4,
  question: "One curtain-wall panel is rectangular, is $3$ feet wider than twice its height, and covers $90$ square feet. Trim is installed along all four edges of the panel. What total length of trim, in feet, does the panel need?",
  choices: [
    // distractor: adds height and width, 6 + 15, without doubling for the four edges
    { id: "A", text: "$21$" },
    // distractor: treats the panel as a square of side 6, computing 4 times the height
    { id: "B", text: "$24$" },
    { id: "C", text: "$42$" },
    // distractor: treats the panel as a square of side 15, computing 4 times the width
    { id: "D", text: "$60$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** With height $h$ the width is $2h + 3$, so $h(2h + 3) = 90$ gives $h = 6$ and width $15$; the trim is $2(6 + 15) = 42$ feet.\n\n**The Full Solution:**\nStep 1: Let $h$ be the height in feet. The width is $2h + 3$ feet, and the area gives $h(2h + 3) = 90$.\nStep 2: Expand and set to zero: $2h^2 + 3h - 90 = 0$. Factoring gives $(2h + 15)(h - 6) = 0$, and a height must be positive, so $h = 6$ feet and the width is $2(6) + 3 = 15$ feet.\nStep 3: Trim runs the full perimeter: $2(6 + 15) = 42$ feet. Check the givens: $6 \\times 15 = 90$ square feet, and $15$ is $3$ more than twice $6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($21$): adds the height and width once, $6 + 15$, forgetting that a rectangle has two of each.\n* Choice B ($24$): computes $4(6)$, treating the panel as a square built from the height.\n* Choice D ($60$): computes $4(15)$, treating the panel as a square built from the width.\n\n**Test Day Takeaway:** When one dimension is described in terms of the other, name that dimension, build the area equation, and solve before you touch the perimeter.",
  skills: ["triangle-area"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A network engineer maps a coverage zone whose edge consists of the points satisfying $x^2 + y^2 - 18x + 8y + c = 0$, for some constant $c$, where $x$ and $y$ are measured in meters from a corner of the building. One sensor lying exactly on that edge is at $(21, -4)$. What is the value of $c$?",
  choices: [
    { id: "A", text: "$-47$" },
    // distractor: computes 144 - 97 instead of 97 - 144, flipping the sign of c
    { id: "B", text: "$47$" },
    // distractor: sets 97 - c equal to the distance 12 rather than to 12 squared
    { id: "C", text: "$85$" },
    // distractor: adds, computing 97 + 144 instead of 97 - 144
    { id: "D", text: "$241$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** Completing the square gives center $(9, -4)$ and $r^2 = 97 - c$; the sensor at $(21, -4)$ is $12$ meters from the center, so $97 - c = 144$ and $c = -47$.\n\n**The Full Solution:**\nStep 1: Group and complete the square: $x^2 - 18x + y^2 + 8y = -c$ becomes $(x - 9)^2 - 81 + (y + 4)^2 - 16 = -c$, so $(x - 9)^2 + (y + 4)^2 = 97 - c$.\nStep 2: The center is $(9, -4)$. The sensor $(21, -4)$ lies on the same horizontal line, $21 - 9 = 12$ meters away, so $r = 12$ and $r^2 = 144$.\nStep 3: Set $97 - c = 144$, giving $c = 97 - 144 = -47$. Check by substituting the sensor into the original equation: $441 + 16 - 378 - 32 - 47 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($47$): computes $144 - 97$, reversing the subtraction and flipping the sign of $c$.\n* Choice C ($85$): sets $97 - c$ equal to the distance $12$ instead of to $12^2 = 144$, forgetting that general form stores the square of the radius.\n* Choice D ($241$): adds, $97 + 144$, which is what you get by moving $c$ across the equal sign without changing its sign.\n\n**Test Day Takeaway:** Complete the square first; the constant left on the right is $r^2$, so any radius information must be squared before you compare.",
  skills: ["circle-equation", "completing-square-circles"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A reactant concentration $C$, in millimoles per liter, is recorded every $10$ minutes after a reaction begins, as shown in the table. Which of the following equations models $C$ in terms of the elapsed time $t$, in minutes?",
  questionTable: { headers: ["$t$ (minutes)", "$C$ (mmol/L)"], rows: [["$0$", "$250$"], ["$10$", "$200$"], ["$20$", "$160$"], ["$30$", "$128$"]] },
  choices: [
    // distractor: uses the 20% lost per interval as the base instead of the 0.8 that survives
    { id: "A", text: "$C = 250(0.2)^{t/10}$" },
    { id: "B", text: "$C = 250(0.8)^{t/10}$" },
    // distractor: treats t in minutes as the number of 10-minute intervals, so it decays ten times too fast
    { id: "C", text: "$C = 250(0.8)^{t}$" },
    // distractor: uses 1 + 0.8 as the base, turning the decay into growth
    { id: "D", text: "$C = 250(1.8)^{t/10}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Each $10$-minute row multiplies the previous concentration by $\\frac{200}{250} = 0.8$, and $t$ minutes contain $\\frac{t}{10}$ such intervals, so $C = 250(0.8)^{t/10}$.\n\n**The Full Solution:**\nStep 1: Check that the ratio between consecutive rows is constant: $\\frac{200}{250} = 0.8$, $\\frac{160}{200} = 0.8$, and $\\frac{128}{160} = 0.8$, so the data are exponential with a factor of $0.8$ per $10$ minutes.\nStep 2: The initial concentration at $t = 0$ is $250$ millimoles per liter, which is the coefficient in front of the base.\nStep 3: Because the factor $0.8$ applies once every $10$ minutes, the exponent counts intervals: $\\frac{t}{10}$. The model is $C = 250(0.8)^{t/10}$. Check the last row: $250(0.8)^{30/10} = 250(0.512) = 128$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($C = 250(0.2)^{t/10}$): uses the $20\\%$ that disappears as the base, predicting $50$ at $t = 10$ instead of $200$.\n* Choice C ($C = 250(0.8)^{t}$): applies the factor once per minute, so at $t = 10$ it predicts about $26.8$, far below the recorded $200$.\n* Choice D ($C = 250(1.8)^{t/10}$): adds the surviving fraction to $1$, giving growth when the table clearly falls.\n\n**Test Day Takeaway:** Read the growth factor from the ratio of consecutive rows, then divide $t$ by the spacing of those rows so the exponent counts intervals, not raw units.",
  skills: ["exponential-growth-decay"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A storage plan charges a fixed monthly fee plus $d$ dollars for each terabyte used beyond the first $8$ terabytes. A month in which $20$ terabytes were used cost \\$186, and a month in which $32$ terabytes were used cost \\$258. What is the fixed monthly fee, in dollars?",
  choices: [
    // distractor: reports d, the per-terabyte rate, instead of the fixed monthly fee
    { id: "A", text: "$6$" },
    // distractor: subtracts 6 times 20 rather than 6 times 12, ignoring the 8-terabyte allowance
    { id: "B", text: "$66$" },
    { id: "C", text: "$114$" },
    // distractor: subtracts 6 times 8, charging only for the allowance terabytes
    { id: "D", text: "$138$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The billed terabytes rise from $12$ to $24$ while the cost rises by \\$72, so $d = 6$; then the fee is $186 - 12(6) = 114$ dollars.\n\n**The Full Solution:**\nStep 1: Only usage past the first $8$ terabytes is billed by the terabyte, so the two months bill $20 - 8 = 12$ and $32 - 8 = 24$ terabytes. With fee $F$: $F + 12d = 186$ and $F + 24d = 258$.\nStep 2: Subtract the first equation from the second: $12d = 72$, so $d = 6$ dollars per terabyte.\nStep 3: Substitute back: $F + 12(6) = 186$, so $F = 186 - 72 = 114$ dollars. Check the second month: $114 + 24(6) = 114 + 144 = 258$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): this is $d$, the rate per billed terabyte, not the fee charged before any usage.\n* Choice B ($66$): computes $186 - 6(20)$, billing all $20$ terabytes and ignoring the $8$ that are included.\n* Choice D ($138$): computes $186 - 6(8)$, billing only the allowance and leaving the $12$ chargeable terabytes in the fee.\n\n**Test Day Takeaway:** When a plan includes a free allowance, subtract it from every usage figure before you build the equations — the rate is found from the billed amounts, not the raw ones.",
  skills: ["word-problem-to-equation"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "An architect models the depth of shade on a facade by $D(w)$, where $w$ is the week of the year. A revised model uses $R(w) = D(w - k) + 3$ for a constant $k$. The greatest shade depth occurs in week $18$ under the first model and in week $26$ under the revised model. What is the value of $k$?",
  correctAnswer: "8",
  explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~20s):** Replacing $w$ with $w - k$ slides the graph right by $k$ weeks, and the peak slid from week $18$ to week $26$, so $k = 26 - 18 = 8$.\n\n**The Full Solution:**\nStep 1: In $R(w) = D(w - k) + 3$, the $+3$ raises every output by $3$ but changes no input, so it cannot move the week in which the peak occurs.\nStep 2: The inside change $w - k$ is the only part that shifts the input. $R$ takes its greatest value at the $w$ for which $w - k$ equals the input where $D$ peaks, namely $18$.\nStep 3: So $26 - k = 18$, giving $k = 8$. Check: with $k = 8$, $R(26) = D(26 - 8) + 3 = D(18) + 3$, which is the largest output $R$ can produce ✓\n\n**Common Mistakes:**\n* $-8$: reads $w - k$ as a shift to the left and computes $18 - 26$.\n* $11$: adds the vertical shift, computing $26 - 18 + 3$, even though $+3$ moves outputs and not weeks.\n* $5$: subtracts the vertical shift, computing $26 - 18 - 3$, for the same reason.\n\n**Test Day Takeaway:** Inside the parentheses moves the graph horizontally and outside moves it vertically, so a question about *when* something happens depends only on the inside change.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The table summarizes $200$ network requests by protocol version and by whether the response was served from cache. Which expression represents the probability that a randomly selected one of these requests was served from cache?",
  questionTable: { headers: ["Protocol", "Served from cache", "Not served from cache", "Total"], rows: [["IPv4", "$96$", "$44$", "$140$"], ["IPv6", "$29$", "$31$", "$60$"], ["Total", "$125$", "$75$", "$200$"]] },
  choices: [
    // distractor: uses only the IPv4-and-cached cell, 96, over the grand total instead of the whole cached column
    { id: "A", text: "$\\frac{96}{200}$" },
    { id: "B", text: "$\\frac{125}{200}$" },
    // distractor: conditions on IPv4 requests by dividing 96 by 140 rather than by all 200 requests
    { id: "C", text: "$\\frac{96}{140}$" },
    // distractor: gives the probability that the request used IPv4, not that it was cached
    { id: "D", text: "$\\frac{140}{200}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Cached requests total $125$ out of all $200$ requests, so the probability is $\\frac{125}{200}$.\n\n**The Full Solution:**\nStep 1: A probability is the count of favorable outcomes over the count of all outcomes in the group being selected from.\nStep 2: The selection is made from all $200$ requests, so the denominator is $200$.\nStep 3: Every cached request counts, regardless of protocol: $96 + 29 = 125$, the total of that column. The probability is $\\frac{125}{200}$. Check: the not-cached total is $44 + 31 = 75$, and $125 + 75 = 200$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{96}{200}$): counts only IPv4 requests that were cached, dropping the $29$ cached IPv6 requests.\n* Choice C ($\\frac{96}{140}$): answers a different question — the chance a request was cached *given* that it used IPv4.\n* Choice D ($\\frac{140}{200}$): uses the IPv4 row total, giving the probability of the protocol rather than of the caching outcome.\n\n**Test Day Takeaway:** A marginal probability uses a whole row or column total over the grand total; the moment the denominator is a subgroup, you have answered a conditional question instead.",
  skills: ["probability-basics"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The percent of protein recovered from a sample is modeled by $y = a(r - 68)^2 + 91$ for $60 \\le r \\le 76$, where $r$ is the centrifuge rotor speed in hundreds of revolutions per minute and $a$ is a constant. The model predicts $75$ percent recovery at $r = 60$. What is the value of $a$?",
  correctAnswer: "-0.25",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $-0.25$.**\n\n**The Fast Way (~25s):** Substituting $r = 60$ and $y = 75$ gives $75 = a(-8)^2 + 91$, so $64a = -16$ and $a = -0.25$.\n\n**The Full Solution:**\nStep 1: The vertex form already fixes the peak at $(68, 91)$; the second condition is the point $(60, 75)$, which pins the single unknown $a$.\nStep 2: Substitute: $75 = a(60 - 68)^2 + 91 = a(-8)^2 + 91 = 64a + 91$.\nStep 3: Subtract $91$ from both sides to get $64a = -16$, so $a = -\\frac{16}{64} = -0.25$. Check by putting that value back in the model: $-0.25(60 - 68)^2 + 91 = -0.25(64) + 91 = 75$, the recovery the stem reports ✓\n\n**Common Mistakes:**\n* $0.25$: drops the negative sign, which would make $6800$ revolutions per minute the worst speed instead of the best.\n* $-16$: stops at $64a = -16$ and reports $-16$ without dividing by $64$.\n* $2$: divides by $r - 68 = -8$ instead of by $(-8)^2 = 64$, since $\\frac{-16}{-8} = 2$.\n\n**Test Day Takeaway:** With the vertex given, one extra point is all you need — substitute it, and remember the squared factor is squared before you divide.",
  skills: ["vertex-form", "function-evaluation"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The figure shows $y = g(x)$, the cross section of the parabolic arch under a stone footbridge, measured in feet, where $g(x) = a(x - 12)^2 + 4$ for a negative constant $a$ and the curve contains the point $(8, 0)$. A larger footbridge has arch cross section $y = g(x) + 5$. Its two points of contact with the line $y = 0$ are how many feet apart?",
  diagram: { type: "parabola", params: { vertex: { h: 12, k: 4 }, a: -0.25, xRange: [0, 24], yRange: [-8, 8], xTickInterval: 4, yTickInterval: 2, gridInterval: 2, showVertex: false } },
  choices: [
    // distractor: reads the span of the graphed arch, 16 - 8, instead of the larger arch's span
    { id: "A", text: "$8$" },
    { id: "B", text: "$12$" },
    // distractor: reports the larger x-intercept, 18, rather than the distance between the two
    { id: "C", text: "$18$" },
    // distractor: adds the two x-intercepts, 6 + 18, instead of subtracting them
    { id: "D", text: "$24$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The point $(8, 0)$ gives $16a = -4$, so $a = -0.25$; the larger arch is $-0.25(x - 12)^2 + 9 = 0$, so $(x - 12)^2 = 36$ and the intercepts $6$ and $18$ are $12$ feet apart.\n\n**The Full Solution:**\nStep 1: Find $a$. Substituting $(8, 0)$ into $g(x) = a(x - 12)^2 + 4$ gives $0 = a(-4)^2 + 4 = 16a + 4$, so $a = -0.25$.\nStep 2: The larger arch is $y = g(x) + 5 = -0.25(x - 12)^2 + 9$. Setting $y = 0$ gives $0.25(x - 12)^2 = 9$, so $(x - 12)^2 = 36$.\nStep 3: Then $x - 12 = \\pm 6$, so $x = 6$ and $x = 18$, a distance of $18 - 6 = 12$ feet. Check $x = 6$ in the larger model: $-0.25(6 - 12)^2 + 9 = -9 + 9 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): measures the graphed arch, whose intercepts are $8$ and $16$; raising the curve by $5$ widens the opening, so this span is too small.\n* Choice C ($18$): reports the larger intercept as though it were the width, ignoring that the arch starts at $x = 6$ rather than at the origin.\n* Choice D ($24$): adds the two intercepts instead of subtracting, which measures nothing on the figure.\n\n**Test Day Takeaway:** For a vertical-form parabola the intercepts sit symmetrically about $x = h$, so once $(x - h)^2$ is isolated the distance between them is twice the square root.",
  skills: ["quadratics"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A triangular window frame with a perimeter of $80$ centimeters has two edges measuring $18$ centimeters and $28$ centimeters. A second frame, geometrically similar to the first, has a perimeter of $20$ meters. The longest edge of the second frame is how many meters long?",
  choices: [
    // distractor: scales the 18-centimeter edge instead of the longest edge
    { id: "A", text: "$4.5$" },
    // distractor: scales the 28-centimeter edge instead of the longest edge
    { id: "B", text: "$7$" },
    { id: "C", text: "$8.5$" },
    // distractor: takes the longest edge to be half the perimeter of the second frame
    { id: "D", text: "$10$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The small frame's third edge is $80 - 18 - 28 = 34$ centimeters, the longest; the perimeters give a scale of $\\frac{20 \\text{ m}}{80 \\text{ cm}} = 0.25$ meter per centimeter, so the answer is $34(0.25) = 8.5$ meters.\n\n**The Full Solution:**\nStep 1: Find the missing edge of the smaller frame: $80 - (18 + 28) = 34$ centimeters. Since $34 > 28 > 18$, that edge is the longest.\nStep 2: In similar figures, every length scales by the same factor as the perimeter. The larger perimeter is $20$ meters and the smaller is $80$ centimeters, so each centimeter of the small frame becomes $\\frac{20}{80} = 0.25$ meter.\nStep 3: The longest edge of the second frame is $34(0.25) = 8.5$ meters. Check the whole frame: $18(0.25) + 28(0.25) + 8.5 = 4.5 + 7 + 8.5 = 20$ meters ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.5$): scales the $18$-centimeter edge, the shortest one, instead of the longest.\n* Choice B ($7$): scales the $28$-centimeter edge, which is only the longest of the two edges the stem happens to name.\n* Choice D ($10$): takes the longest edge to be half of the $20$-meter perimeter, a relationship no triangle satisfies.\n\n**Test Day Takeaway:** Perimeters of similar figures share the side scale factor, so use them to get the ratio, but find the missing side first to know which edge you are actually scaling.",
  skills: ["similar-triangles"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A $3.2$-liter reservoir of solvent loses $250$ milliliters during priming and then $145$ milliliters for each analysis run. The reservoir must be refilled before the volume of solvent remaining drops below $500$ milliliters. What is the least number of analysis runs after which the reservoir must be refilled?",
  correctAnswer: "17",
  explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**The correct answer is $17$.**\n\n**The Fast Way (~40s):** After priming, $3200 - 250 = 2950$ milliliters remain and only $2450$ of that may be consumed, so $145n > 2450$ gives $n > 16.9$ and the first run past the limit is the $17$th.\n\n**The Full Solution:**\nStep 1: Convert to one unit: $3.2$ liters is $3200$ milliliters. Priming leaves $3200 - 250 = 2950$ milliliters.\nStep 2: After $n$ runs the volume left is $2950 - 145n$, and refilling is required once that is below $500$: $2950 - 145n < 500$.\nStep 3: Rearranging gives $145n > 2450$, so $n > 16.89\\ldots$ and the least whole number of runs is $17$. Check both sides: after $16$ runs $2950 - 2320 = 630$ milliliters remain, still at or above $500$, while after $17$ runs only $485$ remain ✓\n\n**Common Mistakes:**\n* $16$: rounds $16.89$ down; rounding down lands on the last run that does *not* trigger a refill.\n* $19$: ignores the $250$ milliliters lost to priming and solves $145n > 2700$.\n* $21$: ignores the $500$-milliliter reserve and asks instead when the reservoir empties, solving $145n > 2950$.\n\n**Test Day Takeaway:** After solving an inequality, test the integers on both sides of the boundary — 'least number that triggers' always rounds up, never down.",
  skills: ["inequalities"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A load-balancing model assigns the primary server the weight $\\dfrac{kx - 8}{2x + 5}$, where $x$ is the model's tuning parameter, $k$ is an integer constant, and $x$ is any real number other than $-\\dfrac{5}{2}$. For which value of $k$ is this weight never equal to $3$?",
  choices: [
    // distractor: sets k + 6 = 0 instead of k - 6 = 0, flipping the sign when the 6x moves across
    { id: "A", text: "$-6$" },
    // distractor: uses the 3 on the right as the needed coefficient, ignoring the 2 in the denominator
    { id: "B", text: "$3$" },
    { id: "C", text: "$6$" },
    // distractor: multiplies 3 by the denominator's constant 5 instead of by its coefficient 2
    { id: "D", text: "$15$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Clearing the denominator turns the equation into $kx - 8 = 6x + 15$, so $(k - 6)x = 23$; that is unsolvable only when $k - 6 = 0$, giving $k = 6$.\n\n**The Full Solution:**\nStep 1: Set the weight equal to $3$ and multiply both sides by $2x + 5$, which is allowed because $x \\ne -\\frac{5}{2}$: $kx - 8 = 3(2x + 5) = 6x + 15$.\nStep 2: Collect the variable terms on one side: $kx - 6x = 23$, or $(k - 6)x = 23$.\nStep 3: If $k - 6 \\ne 0$ there is a solution, $x = \\frac{23}{k - 6}$. The only way no $x$ works is $k - 6 = 0$, so $k = 6$, which leaves $0 = 23$. Check: with $k = 6$ the weight is $\\frac{6x - 8}{2x + 5}$, and at $x = 100$ it is about $2.88$, at $x = 1000$ about $2.99$ — always short of $3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): comes from writing $k + 6 = 0$, losing the sign change when $6x$ crosses the equal sign.\n* Choice B ($3$): copies the $3$ from the right-hand side as the coefficient to match, forgetting the $2$ in $2x + 5$ doubles it.\n* Choice D ($15$): multiplies $3$ by the constant $5$ instead of by the coefficient $2$, matching constant terms rather than $x$-terms.\n\n**Test Day Takeaway:** Clear the denominator, gather the $x$-terms, and remember that a rational equation runs out of solutions exactly when the variable cancels and leaves a false statement.",
  skills: ["rational-expressions"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A lab protocol models the setting time $t$, in minutes, of a gel layer as $t = \\sqrt{9d + b}$, where $d$ is the thickness of the layer in millimeters and $b$ is a constant. A layer $12$ millimeters thick sets in $14$ minutes. What is the value of $b$?",
  choices: [
    { id: "A", text: "$88$" },
    // distractor: reports 9 times 12, the quantity that must be subtracted, rather than b itself
    { id: "B", text: "$108$" },
    // distractor: squares 14 but never subtracts the 108 contributed by the thickness term
    { id: "C", text: "$196$" },
    // distractor: adds 108 to 196 instead of subtracting it
    { id: "D", text: "$304$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Radical Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Squaring gives $9(12) + b = 14^2$, so $108 + b = 196$ and $b = 88$.\n\n**The Full Solution:**\nStep 1: Substitute the measured pair into the model: $14 = \\sqrt{9(12) + b} = \\sqrt{108 + b}$.\nStep 2: Square both sides to remove the radical: $196 = 108 + b$.\nStep 3: Subtract $108$ to get $b = 88$. Check by substituting back: $\\sqrt{9(12) + 88} = \\sqrt{196} = 14$ minutes, and $14$ is positive, so this root is not extraneous ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($108$): reports $9(12)$, the thickness term inside the radical, instead of the constant $b$.\n* Choice C ($196$): squares the $14$ correctly but then stops, never subtracting the $108$ that the thickness already contributes.\n* Choice D ($304$): adds $108$ to $196$, treating the isolated radical as though the constant were on the other side.\n\n**Test Day Takeaway:** Square once to clear a lone radical, then finish the ordinary linear step and substitute back — the check also confirms no extraneous root slipped in.",
  skills: ["radical-equations"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A machinist cuts the right-triangular bracing plate shown from sheet metal, using $90$ centimeters of edge in total. In this plate, $\\cos R = \\dfrac{12}{13}$. How long is $\\overline{RQ}$, in centimeters?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 5]], labels: ["R", "Q", "S"], rightAngleVertex: 1, figureNote: true } },
  correctAnswer: "36",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~45s):** $\\cos R = \\frac{12}{13}$ marks a $5$-$12$-$13$ triangle, whose edges total $30$ parts; $90 \\div 30 = 3$, and $\\overline{RQ}$ is the $12$-part edge, so it measures $36$ centimeters.\n\n**The Full Solution:**\nStep 1: The right angle is at $Q$, so $\\overline{RS}$ is the hypotenuse and $\\overline{RQ}$ is the leg adjacent to angle $R$. Then $\\cos R = \\frac{RQ}{RS} = \\frac{12}{13}$, so $RQ = 12m$ and $RS = 13m$ for some positive $m$.\nStep 2: The third edge follows from the Pythagorean theorem: $QS = \\sqrt{(13m)^2 - (12m)^2} = \\sqrt{25m^2} = 5m$.\nStep 3: The three edges total $12m + 13m + 5m = 30m = 90$, so $m = 3$ and $RQ = 12(3) = 36$ centimeters. Check the whole plate: the edges are $36$, $39$, and $15$ centimeters, $36^2 + 15^2 = 1296 + 225 = 1521 = 39^2$, and the three add to $90$ ✓\n\n**Common Mistakes:**\n* $39$: reports the hypotenuse $\\overline{RS}$, the $13$-part edge, instead of the adjacent leg.\n* $15$: reports the short leg $\\overline{QS}$, the $5$-part edge opposite angle $R$.\n* $12$: reads the $12$ straight out of the cosine ratio without scaling by $m = 3$.\n\n**Test Day Takeaway:** A trig ratio fixes the shape but not the size, so write every edge as a multiple of one scale factor and let the perimeter pin that factor down.",
  skills: ["soh-cah-toa"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An equipment reserve account is opened by a contractor with \\$45,000 and pays $4.8\\%$ annual interest, compounded quarterly. Once the balance $t$ years later is written in the form $45000b^{t}$ dollars, the base $b$ is a constant. To the nearest thousandth, what is the value of $b$?",
  choices: [
    // distractor: reports the quarterly growth factor 1.012 as though the exponent counted years
    { id: "A", text: "$1.012$" },
    // distractor: uses the nominal annual rate, 1 + 0.048, ignoring that interest compounds four times a year
    { id: "B", text: "$1.048$" },
    { id: "C", text: "$1.049$" },
    // distractor: raises the annual factor 1.048 to the fourth power, compounding a full year four times
    { id: "D", text: "$1.206$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Compound Interest**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Each quarter multiplies the balance by $1 + \\frac{0.048}{4} = 1.012$, and a year holds four quarters, so $b = 1.012^4 \\approx 1.049$.\n\n**The Full Solution:**\nStep 1: Quarterly compounding splits the annual rate into four equal periods: the periodic rate is $\\frac{0.048}{4} = 0.012$, so each quarter multiplies the balance by $1.012$.\nStep 2: In $t$ years there are $4t$ quarters, so the balance is $45000(1.012)^{4t}$.\nStep 3: Rewrite that with a yearly base: $45000\\left(1.012^4\\right)^{t}$, so $b = 1.012^4 = 1.04887\\ldots \\approx 1.049$. Check one year against the quarters: $45000(1.012)^4 = 47199.19$ dollars, and $45000(1.049) = 47205$ dollars, agreeing to the rounding used ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.012$): this is the growth for one quarter; used with a yearly exponent it under-counts the interest by a factor of four periods.\n* Choice B ($1.048$): treats $4.8\\%$ as though it were applied once a year, which ignores the interest that earns interest within the year.\n* Choice D ($1.206$): applies the fourth power to $1.048$ rather than to $1.012$, compounding a whole year four times over.\n\n**Test Day Takeaway:** Convert compounding to a yearly base by raising the periodic factor to the number of periods per year — the nominal rate is never the yearly multiplier.",
  skills: ["exponential-functions"]
}
      ]
    }
  ]
};

export default practiceTest8;
