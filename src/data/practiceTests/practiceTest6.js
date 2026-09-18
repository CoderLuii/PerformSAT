// Practice Test 6 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) FROZEN from the prior
// build: M1 5E/9M/8H; M2 wavy flow — easy at Q1/Q6/Q16, medium at
// Q2/Q3/Q5/Q9/Q12/Q14/Q17, hard at the rest with hard closers Q18-Q22 and the
// band ramp mean(Q1-5)=5.0 < mean(Q18-22)=7.0. All scenarios replaced fresh
// (vineyard / wind-farm / bookbindery / kite-festival / radio-tower /
// freight-yard palette — disjoint from recreated tests 1-5). Figure density
// lifted to official ~20%: M1 carries 4 diagram items (Q7 twoWayTable, Q8
// scatterplot, Q17 nestedRightTriangles, Q22 dotPlot), M2 carries 4 (Q6
// intersectingLines, Q13 dataTable, Q15 circleWithInscribedTriangle, Q16
// barChart). Numeric MC choices sorted ascending (official convention).

export const practiceTest6 = {
  id: "practice-test-6",
  title: "Practice Test 6",
  description: "Full-length SAT Math practice test with 2 modules",
  totalQuestions: 44,
  timePerModule: 35,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      timeLimit: 35,
      questions: [
// Practice Test 6 — Math Module 1 (22 questions)
// Easy block Q1-5 keeps the frozen archetype order: multi-step-linear (Q1),
// percent-of-whole (Q2), shifted-output (Q3), reverse-percent (Q4),
// proportion (Q5). All stems, numbers, and scenarios are new.

// ===== EASY (Q1–Q5) =====

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The table records the number of unsold seats remaining for a scenic railway excursion on four days after tickets went on sale. Which of the following best describes the meaning of the slope of the linear model of these data?",
  questionTable: { headers: ["Days after tickets went on sale", "Unsold seats"], rows: [["0", "240"], ["2", "210"], ["4", "180"], ["6", "150"]] },
  choices: [
    { id: "A", text: "The number of unsold seats decreased by $15$ each day." },
    // distractor: reads the 30-seat drop between consecutive table rows as a one-day drop, ignoring that the rows are 2 days apart
    { id: "B", text: "The number of unsold seats decreased by $30$ each day." },
    // distractor: uses the day-0 value 240 as the rate of change instead of as the starting amount
    { id: "C", text: "The number of unsold seats decreased by $240$ each day." },
    // distractor: interprets the slope 15 as the y-intercept, that is, as a starting number of seats
    { id: "D", text: "There were $15$ unsold seats when tickets went on sale." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice A is correct.** The slope of a linear model is the change in the output for a one-unit change in the input, so here it is the change in unsold seats per day.\n\n**The Fast Way (~15s):** Seats fall $30$ over each $2$-day step in the table, so the per-day change is $30 \\div 2 = 15$ seats lost per day.\n\n**The Full Solution:**\nStep 1: Take any two rows, say $(0, 240)$ and $(6, 150)$. The change in unsold seats is $150 - 240 = -90$ and the change in days is $6 - 0 = 6$.\nStep 2: The slope is $\\frac{-90}{6} = -15$. The negative sign means the number of unsold seats is decreasing.\nStep 3: Check with a different pair: from $(2, 210)$ to $(4, 180)$ the slope is $\\frac{180 - 210}{4 - 2} = \\frac{-30}{2} = -15$, the same value, so the data are linear and $15$ seats are lost per day ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($30$ per day): $30$ is the drop from one table row to the next, but consecutive rows are $2$ days apart, so $30$ is a two-day drop, not a daily one.\n* Choice C ($240$ per day): $240$ is the value at day $0$, the y-intercept of the model, not its rate of change.\n* Choice D ($15$ seats at the start): this attaches the slope value $15$ to the starting amount; the model starts at $240$ unsold seats.\n\n**Test Day Takeaway:** When a table's input values step by more than $1$, divide the output change by the actual input change — never read the row-to-row difference as the slope.",
  skills: ["slope-intercept-form"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A weaving mill blends cotton and linen fibers in a ratio of $5$ to $3$ by mass. Which expression gives the mass, in kilograms, of cotton fiber in a batch whose total mass is $m$ kilograms?",
  choices: [
    // distractor: gives the linen share 3/8 instead of the cotton share
    { id: "A", text: "$\\frac{3}{8}m$" },
    // distractor: uses the part-to-part ratio 3:5 as a fraction of the total
    { id: "B", text: "$\\frac{3}{5}m$" },
    { id: "C", text: "$\\frac{5}{8}m$" },
    // distractor: uses the part-to-part ratio 5:3 directly as a fraction of the total, which exceeds the whole batch
    { id: "D", text: "$\\frac{5}{3}m$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**Choice C is correct.** A ratio of $5$ to $3$ splits the batch into $5 + 3 = 8$ equal parts, and cotton is $5$ of those $8$ parts.\n\n**The Fast Way (~15s):** Add the ratio terms to get the total number of parts, $8$, then take the cotton share: $\\frac{5}{8}m$.\n\n**The Full Solution:**\nStep 1: Let each part have mass $p$ kilograms. Then the cotton mass is $5p$, the linen mass is $3p$, and the batch mass is $5p + 3p = 8p = m$.\nStep 2: Solving $8p = m$ gives $p = \\frac{m}{8}$, so the cotton mass is $5p = \\frac{5}{8}m$.\nStep 3: Check the split: cotton $\\frac{5}{8}m$ plus linen $\\frac{3}{8}m$ equals $m$, and $\\frac{5}{8}m \\div \\frac{3}{8}m = \\frac{5}{3}$, the required ratio ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3}{8}m$): this is the linen share. It uses the correct denominator but the other part's numerator.\n* Choice B ($\\frac{3}{5}m$): this treats the part-to-part ratio $3:5$ as a part-to-whole fraction; $5$ is not the number of parts in the batch.\n* Choice D ($\\frac{5}{3}m$): this uses $5:3$ itself as a fraction of the total, which would make the cotton mass larger than the entire batch.\n\n**Test Day Takeaway:** A ratio of parts becomes a fraction of the whole only after you add the terms — the denominator is the sum, never the other part.",
  skills: ["word-problem-to-equation"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A hospital pharmacy divides a $92$-milligram supply of a medication into $4$ doses of equal mass. What is the mass, in milligrams, of each dose?",
  choices: [
    { id: "A", text: "$23$" },
    // distractor: divides by 2 instead of by 4, giving 92/2 = 46
    { id: "B", text: "$46$" },
    // distractor: subtracts 4 from 92 instead of dividing, giving 88
    { id: "C", text: "$88$" },
    // distractor: multiplies by 4 instead of dividing, giving 368
    { id: "D", text: "$368$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice A is correct.** If $d$ is the mass of one dose, then $4d = 92$, so $d = 23$ milligrams.\n\n**The Fast Way (~10s):** Equal doses means divide: $92 \\div 4 = 23$.\n\n**The Full Solution:**\nStep 1: Let $d$ be the mass, in milligrams, of each dose. Four equal doses account for the whole supply, so $4d = 92$.\nStep 2: Divide each side by $4$: $d = \\frac{92}{4} = 23$.\nStep 3: Check by rebuilding the supply: $4(23) = 92$ milligrams ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($46$): this divides by $2$ rather than by $4$, the answer for two doses, not four.\n* Choice C ($88$): this subtracts $4$ from $92$. The phrase \"divides into $4$ doses\" signals division, not subtraction.\n* Choice D ($368$): this multiplies $92$ by $4$. Multiplying makes each dose larger than the whole supply, which cannot happen.\n\n**Test Day Takeaway:** Before computing, ask whether the answer must be smaller or larger than the given total — splitting a supply always makes each piece smaller.",
  skills: ["combining-like-terms"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A quality inspector examines a rack of $30$ shirts, $6$ of which have a stitching flaw. One shirt with a flaw is removed from the rack. Which expression gives the probability that a shirt then chosen at random from the rack has a flaw?",
  choices: [
    // distractor: reduces the flawed count to 5 but leaves the total at 30, forgetting the removed shirt leaves the rack
    { id: "A", text: "$\\frac{5}{30}$" },
    { id: "B", text: "$\\frac{5}{29}$" },
    // distractor: ignores the removal entirely and uses the original 6 out of 30
    { id: "C", text: "$\\frac{6}{30}$" },
    // distractor: reduces the total to 29 but leaves the flawed count at 6, forgetting the shirt removed was itself flawed
    { id: "D", text: "$\\frac{6}{29}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Probability Without Replacement**\n\n**Choice B is correct.** Removing one flawed shirt lowers both counts: $5$ flawed shirts remain among $29$ shirts, so the probability is $\\frac{5}{29}$.\n\n**The Fast Way (~15s):** Subtract $1$ from the flawed count and $1$ from the total, since the removed shirt was flawed: $\\frac{6-1}{30-1} = \\frac{5}{29}$.\n\n**The Full Solution:**\nStep 1: At the start the rack holds $30$ shirts, of which $6$ have a flaw.\nStep 2: One flawed shirt is removed. The rack now holds $30 - 1 = 29$ shirts, of which $6 - 1 = 5$ have a flaw.\nStep 3: Probability is favorable outcomes over total outcomes, so the answer is $\\frac{5}{29}$. Check the complement: $\\frac{24}{29}$ shirts are flawless, and $\\frac{5}{29} + \\frac{24}{29} = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{5}{30}$): the numerator is updated but the denominator is not; the shirt removed is no longer available to be chosen.\n* Choice C ($\\frac{6}{30}$): this is the probability before the removal, which is what \"with replacement\" would give.\n* Choice D ($\\frac{6}{29}$): the denominator is updated but the numerator is not; the shirt removed was one of the flawed ones, so the flawed count also drops.\n\n**Test Day Takeaway:** Without replacement, update every count the removed item belonged to — the total always, and the favorable count whenever the removed item was favorable.",
  skills: ["probability-basics"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A harbor chart shows the morning ferry route along the line $3x + y = 7$. The afternoon route never meets the morning route and contains the point $(4, 5)$. Which equation could represent the afternoon route?",
  choices: [
    // distractor: copies the given line, but a line identical to the morning route meets it everywhere rather than never
    { id: "A", text: "$3x + y = 7$" },
    { id: "B", text: "$3x + y = 17$" },
    // distractor: swaps the coordinates of the point, computing 3(5) + 4 = 19 instead of 3(4) + 5
    { id: "C", text: "$3x + y = 19$" },
    // distractor: changes the sign of the y-coefficient, which changes the slope and produces a line that does cross the morning route
    { id: "D", text: "$3x - y = 7$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice B is correct.** Two distinct lines never meet exactly when they are parallel, so the afternoon route keeps the left side $3x + y$ and only its constant changes.\n\n**The Fast Way (~20s):** Substitute $(4, 5)$ into $3x + y$: $3(4) + 5 = 17$, so the equation is $3x + y = 17$.\n\n**The Full Solution:**\nStep 1: Rewrite the morning route as $y = -3x + 7$; its slope is $-3$. A line that never meets it must have slope $-3$ as well and a different y-intercept.\nStep 2: In standard form, every line of slope $-3$ can be written as $3x + y = c$. Substituting the point $(4, 5)$ gives $3(4) + 5 = c$, so $c = 17$.\nStep 3: Check that the two lines are distinct and parallel: $3x + y = 17$ has slope $-3$ and passes through $(4, 5)$, since $12 + 5 = 17$, while the morning route gives $12 + 5 \\neq 7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3x + y = 7$): this is the morning route itself. Identical lines share every point, so they meet rather than never meeting.\n* Choice C ($3x + y = 19$): this comes from entering the point as $(5, 4)$; the x-coordinate is $4$, not $5$.\n* Choice D ($3x - y = 7$): flipping the sign on $y$ changes the slope from $-3$ to $3$, and lines with different slopes always intersect.\n\n**Test Day Takeaway:** In standard form, parallel means keep the whole left side and recompute only the constant by plugging in the given point.",
  skills: ["writing-parallel-equation"]
},

// ===== MEDIUM (Q6–Q14) =====

{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Each corner angle of the denim gusset in the figure is marked in terms of $x$. How many degrees greater than the smallest corner angle is the largest corner angle?",
  diagram: { type: "triangleWithAngles", params: { angleLabels: ["(4x)°", "(3x)°", "(5x)°"], note: "Note: Figure not drawn to scale." } },
  choices: [
    // distractor: stops at x = 15 and reports the value of the variable instead of a difference of angle measures
    { id: "A", text: "$15$" },
    { id: "B", text: "$30$" },
    // distractor: reports the smallest corner angle, 3x = 45, instead of the difference
    { id: "C", text: "$45$" },
    // distractor: reports the largest corner angle, 5x = 75, instead of the difference
    { id: "D", text: "$75$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice B is correct.** The three marked measures add to $180$, which fixes $x$, and the largest angle exceeds the smallest by $30$ degrees.\n\n**The Fast Way (~25s):** $4x + 3x + 5x = 12x = 180$, so $x = 15$. The gap between the largest and smallest is $5x - 3x = 2x = 30$.\n\n**The Full Solution:**\nStep 1: The interior angles of a triangle sum to $180^\\circ$, so $4x + 3x + 5x = 180$, which gives $12x = 180$ and $x = 15$.\nStep 2: The three angle measures are $4(15) = 60$, $3(15) = 45$, and $5(15) = 75$ degrees. The largest is $75^\\circ$ and the smallest is $45^\\circ$.\nStep 3: The difference is $75 - 45 = 30$ degrees. Check the sum: $60 + 45 + 75 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): this is $x$ itself. Solving for $x$ is only the first step; the question asks for a difference of angle measures.\n* Choice C ($45$): this is the smallest angle, $3x$, rather than how much the largest exceeds it.\n* Choice D ($75$): this is the largest angle, $5x$. It answers \"what is the largest angle\" instead of \"how much greater.\"\n\n**Test Day Takeaway:** After solving for the variable in an angle-sum equation, reread the final sentence — SAT geometry items often ask for a difference or a sum of the angles, not for the variable.",
  skills: ["triangle-angle-sum"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table summarizes the excursions booked by the $240$ travelers on a tour operator's spring itinerary. One of these travelers will be selected at random. Which expression gives the probability of selecting a traveler who booked a guided hike?",
  diagram: { type: "twoWayTable", params: { headers: ["", "Kayak trip", "No kayak trip", "Total"], rows: [["Guided hike", "54", "42", "96"], ["No guided hike", "30", "114", "144"], ["Total", "84", "156", "240"]] } },
  choices: [
    // distractor: uses only the guided-hike-and-no-kayak cell, 42, and leaves out the 54 travelers who booked both
    { id: "A", text: "$\\frac{42}{240}$" },
    // distractor: uses the joint cell 54, which is the probability of booking a guided hike AND a kayak trip
    { id: "B", text: "$\\frac{54}{240}$" },
    { id: "C", text: "$\\frac{96}{240}$" },
    // distractor: divides the guided-hike row total 96 by the no-guided-hike row total 144 instead of by the grand total 240
    { id: "D", text: "$\\frac{96}{144}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice C is correct.** A marginal probability uses a row or column total over the grand total, so the probability is $\\frac{96}{240}$.\n\n**The Fast Way (~20s):** The guided-hike row totals $96$, and every traveler in the table is one of $240$, so the probability is $\\frac{96}{240}$.\n\n**The Full Solution:**\nStep 1: The travelers who booked a guided hike occupy one full row: $54$ also booked a kayak trip and $42$ did not, for $54 + 42 = 96$ travelers.\nStep 2: The selection is made from all travelers on the itinerary, so the total number of possible outcomes is $240$.\nStep 3: The probability is $\\frac{96}{240}$. Check with the complement: $144$ travelers booked no guided hike, and $\\frac{96}{240} + \\frac{144}{240} = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{42}{240}$): $42$ counts only the hikers who skipped the kayak trip; the $54$ who booked both are still guided hikers.\n* Choice B ($\\frac{54}{240}$): $54$ is the overlap cell, so this is the probability of booking both excursions, not of booking a guided hike.\n* Choice D ($\\frac{96}{144}$): the denominator $144$ is the other row's total. A marginal probability is always divided by the grand total $240$.\n\n**Test Day Takeaway:** In a two-way table, a marginal probability reads one margin over the corner total; the moment a cell value appears in the numerator, you have switched to a joint probability.",
  skills: ["probability-basics"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A blood bank's weekly plasma collection fell $12\\%$ after a donor center closed, and the collection is now $4{,}048$ units per week. How many units per week were collected before the closure?",
  correctAnswer: "4600",
  explanation: "**SAT Pattern: Reverse-Percent**\n\n**The correct answer is $4{,}600$.** A $12\\%$ decrease leaves $88\\%$ of the earlier collection, so the earlier figure is $4{,}048 \\div 0.88$.\n\n**The Fast Way (~25s):** After a $12\\%$ drop, what remains is $0.88$ of the start, so divide: $\\frac{4{,}048}{0.88} = 4{,}600$.\n\n**The Full Solution:**\nStep 1: Let $u$ be the number of units collected each week before the closure. Falling $12\\%$ leaves $u - 0.12u = 0.88u$.\nStep 2: The reduced collection is given, so $0.88u = 4{,}048$, and dividing each side by $0.88$ gives $u = 4{,}600$.\nStep 3: Check forward: $12\\%$ of $4{,}600$ is $552$, and $4{,}600 - 552 = 4{,}048$ ✓\n\n**Common Mistakes:**\n* $4{,}533.76$: multiplying $4{,}048$ by $1.12$. The percent applies to the earlier amount, not to the reduced one, so the operation is division, not multiplication.\n* $3{,}562.24$: multiplying $4{,}048$ by $0.88$, which cuts an already-reduced collection a second time.\n* $3{,}614.29$: dividing by $1.12$ instead of $0.88$, using the growth multiplier for a decrease.\n\n**Test Day Takeaway:** Reverse-percent problems are always division by the multiplier: a $p\\%$ decrease divides by $1 - \\frac{p}{100}$, and a $p\\%$ increase divides by $1 + \\frac{p}{100}$.",
  skills: ["percent-word-problems", "percent-of-value"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A knitting workshop's daily yarn cost, in dollars, is given by $4(3x + c)$, and the same cost is also given by $12x + 76$, where $x$ is the number of garments knitted and $c$ is a constant. What is the value of $c$?",
  choices: [
    // distractor: matches the wrong pair of terms, dividing the coefficient 12 by 4 instead of the constant 76
    { id: "A", text: "$3$" },
    { id: "B", text: "$19$" },
    // distractor: reads the constant 76 straight off the second expression without dividing by the factor 4
    { id: "C", text: "$76$" },
    // distractor: multiplies 76 by 4 instead of dividing, reversing the distribution
    { id: "D", text: "$304$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice B is correct.** Distributing gives $12x + 4c$, so matching constant terms yields $4c = 76$ and $c = 19$.\n\n**The Fast Way (~20s):** Expand: $4(3x + c) = 12x + 4c$. The $x$-terms already agree, so $4c = 76$ and $c = 19$.\n\n**The Full Solution:**\nStep 1: Because the two expressions give the same cost for every value of $x$, they are equivalent: $4(3x + c) = 12x + 76$.\nStep 2: Distribute on the left: $12x + 4c = 12x + 76$. Subtracting $12x$ from each side leaves $4c = 76$.\nStep 3: Divide by $4$: $c = 19$. Check by substituting: $4(3x + 19) = 12x + 76$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): this divides the coefficient $12$ by $4$, matching the $x$-terms instead of the constants. The $x$-terms match automatically here and carry no information about $c$.\n* Choice C ($76$): this copies the constant from the right side. Inside the parentheses, $c$ is multiplied by $4$ before it reaches the constant term.\n* Choice D ($304$): this multiplies by $4$ rather than dividing, undoing the distribution in the wrong direction.\n\n**Test Day Takeaway:** When two expressions are equal for every value of the variable, distribute first and then set matching coefficients equal — constants with constants, $x$-terms with $x$-terms.",
  skills: ["distributive-property"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The function $h$ models the number of daily visitors, in hundreds, at a coastal overlook, where $h(w) = -3w^2 + 42w + 5$ and $w$ is the number of weeks after the overlook reopened. According to the model, what is the greatest number of daily visitors, in hundreds?",
  correctAnswer: "152",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**The correct answer is $152$.** The graph of $h$ is a downward parabola, so its maximum output occurs at the vertex, where $w = 7$ and $h(7) = 152$.\n\n**The Fast Way (~30s):** The vertex is at $w = -\\frac{b}{2a} = -\\frac{42}{2(-3)} = 7$, and $h(7) = -147 + 294 + 5 = 152$.\n\n**The Full Solution:**\nStep 1: Because $a = -3 < 0$, the parabola opens downward and the vertex gives the maximum value of $h$.\nStep 2: The vertex input is $w = -\\frac{b}{2a} = -\\frac{42}{-6} = 7$ weeks.\nStep 3: Substitute: $h(7) = -3(49) + 42(7) + 5 = -147 + 294 + 5 = 152$. Check a nearby week: $h(6) = -108 + 252 + 5 = 149$ and $h(8) = -192 + 336 + 5 = 149$, both below $152$ ✓\n\n**Common Mistakes:**\n* $7$: this is the week at which the maximum occurs, not the number of visitors. The question asks for the output, so the $w$-value must be substituted back.\n* $147$: this drops the constant term $+5$ when evaluating $h(7)$.\n* $5$: this reads the constant term as the maximum. The constant is $h(0)$, the value at reopening, not the peak.\n\n**Test Day Takeaway:** A maximum question has two moves — find the vertex input with $-\\frac{b}{2a}$, then substitute it back to get the output. Stopping after the first move is the most common error on this pattern.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 11,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A drug's concentration in a patient's blood, in milligrams per liter, is $c(t) = -2(t - h)^2 + k$, where $t$ is the number of hours after an injection and the constants $h$ and $k$ can be read from the graph. When $c(t)$ is rewritten in the form $-2t^2 + bt + d$, what is the value of $b$?",
  diagram: { type: "parabola", params: { vertex: { h: 3, k: 20 }, a: -2, xRange: [0, 6], yRange: [0, 22], showVertex: true, gridInterval: 2, xTickInterval: 2, yTickInterval: 4, label: "y = c(t)" } },
  correctAnswer: "12",
  explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**The correct answer is $12$.** The graph shows the vertex at $(3, 20)$, so $c(t) = -2(t - 3)^2 + 20$, and expanding gives $-2t^2 + 12t + 2$.\n\n**The Fast Way (~30s):** With $h = 3$, the middle term is $-2 \\cdot (-2h)t = 4(3)t = 12t$, so $b = 12$.\n\n**The Full Solution:**\nStep 1: Read the vertex from the graph: $h = 3$ and $k = 20$, so $c(t) = -2(t - 3)^2 + 20$.\nStep 2: Expand the square: $(t - 3)^2 = t^2 - 6t + 9$, so $c(t) = -2t^2 + 12t - 18 + 20 = -2t^2 + 12t + 2$.\nStep 3: Comparing with $-2t^2 + bt + d$ gives $b = 12$ and $d = 2$. Check at $t = 0$: vertex form gives $-2(9) + 20 = 2$, and standard form gives $2$ ✓\n\n**Common Mistakes:**\n* $-12$: dropping a sign when distributing $-2$ over $-6t$. Two negatives multiply to a positive, so the middle term is $+12t$.\n* $6$: reporting $2h = 6$ and forgetting to multiply by the leading coefficient $-2$.\n* $2$: reporting $d$, the constant term, instead of $b$, the coefficient of $t$.\n\n**Test Day Takeaway:** Expanding $a(t - h)^2 + k$ always gives a middle term of $-2ah$ — read the vertex off the graph, then let that formula do the work instead of re-deriving it each time.",
  skills: ["distributive-property", "converting-quadratic-forms"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An antibiotic test culture contained $6{,}000$ cells when the test began, and the number of cells doubles every $40$ minutes. Which equation gives $N$, the number of cells present $t$ minutes after the test began?",
  choices: [
    // distractor: swaps the starting count and the growth factor, using 2 as the initial value and 6,000 as the base
    { id: "A", text: "$N = 2(6{,}000)^{t/40}$" },
    // distractor: multiplies the time by 40 instead of dividing, so one minute already produces 40 doublings
    { id: "B", text: "$N = 6{,}000(2)^{40t}$" },
    // distractor: swaps the growth factor and the doubling time, using 40 as the base and 2 as the period
    { id: "C", text: "$N = 6{,}000(40)^{t/2}$" },
    { id: "D", text: "$N = 6{,}000(2)^{t/40}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice D is correct.** An exponential model has the form (initial amount)(growth factor) raised to (elapsed time divided by the period), which here is $6{,}000(2)^{t/40}$.\n\n**The Fast Way (~20s):** Start at $6{,}000$, double each period, and count periods with $\\frac{t}{40}$: $N = 6{,}000(2)^{t/40}$.\n\n**The Full Solution:**\nStep 1: The count at the start is $6{,}000$, so that is the coefficient in front. Doubling means the growth factor is $2$.\nStep 2: The doubling happens once every $40$ minutes, so after $t$ minutes the number of doublings is $\\frac{t}{40}$, which is the exponent.\nStep 3: The model is $N = 6{,}000(2)^{t/40}$. Check at $t = 40$: $N = 6{,}000(2)^1 = 12{,}000$, exactly one doubling ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($N = 2(6{,}000)^{t/40}$): the starting count and the growth factor are interchanged; at $t = 0$ this gives $2$ cells rather than $6{,}000$.\n* Choice B ($N = 6{,}000(2)^{40t}$): multiplying by $40$ instead of dividing makes the culture double $40$ times per minute.\n* Choice C ($N = 6{,}000(40)^{t/2}$): the base and the period are interchanged; the population multiplies by $40$, not by $2$, each period.\n\n**Test Day Takeaway:** Read an exponential model as three separate slots — starting amount, growth factor, and time divided by the period — and check each slot against the sentence before choosing.",
  skills: ["exponential-growth-decay"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An airport shuttle service charges a flat dispatch fee of $\\$192$ plus $\\$32$ for each rider. The total cost of one run was $\\$1{,}088$. How many riders were on that run?",
  choices: [
    // distractor: divides the dispatch fee 192 by the per-rider charge 32, using two numbers that are never divided in this model
    { id: "A", text: "$6$" },
    { id: "B", text: "$28$" },
    // distractor: ignores the dispatch fee and divides the whole total: 1,088/32 = 34
    { id: "C", text: "$34$" },
    // distractor: adds the dispatch fee to the total instead of subtracting it: (1,088 + 192)/32 = 40
    { id: "D", text: "$40$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice B is correct.** With $r$ riders, $32r + 192 = 1{,}088$, so $r = 28$.\n\n**The Fast Way (~25s):** Strip the dispatch fee first: $1{,}088 - 192 = 896$, then $896 \\div 32 = 28$.\n\n**The Full Solution:**\nStep 1: Let $r$ be the number of riders. The service charges $\\$32$ per rider plus a one-time $\\$192$, so the total cost is $32r + 192$.\nStep 2: Set the total equal to the amount paid: $32r + 192 = 1{,}088$. Subtracting $192$ from each side gives $32r = 896$.\nStep 3: Divide by $32$: $r = 28$. Check: $32(28) + 192 = 896 + 192 = 1{,}088$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): this divides the dispatch fee by the per-rider charge. Those two amounts are never compared to each other in this model.\n* Choice C ($34$): this divides the whole total by $32$, treating the $\\$192$ as if it were part of the per-rider charge.\n* Choice D ($40$): this adds the dispatch fee to the total instead of removing it, charging the fee once and then paying for it again.\n\n**Test Day Takeaway:** In a flat-fee-plus-rate model, remove the one-time fee before dividing — the division applies only to the part that varies with the count.",
  skills: ["word-problem-to-equation"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A hotel's occupancy rate, as a percent, is modeled by a linear function of $d$, the number of days after a festival began. The model gives a rate of $38$ when $d = 2$ and a rate of $86$ when $d = 8$. What is the slope of this function?",
  choices: [
    // distractor: inverts the ratio, computing run over rise as 6/48 = 0.125
    { id: "A", text: "$0.125$" },
    // distractor: uses the sum of the day numbers, 2 + 8 = 10, as the run: 48/10 = 4.8
    { id: "B", text: "$4.8$" },
    // distractor: uses the later day number 8 as the run instead of the change in days: 48/8 = 6
    { id: "C", text: "$6$" },
    { id: "D", text: "$8$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice D is correct.** The slope is the change in occupancy rate divided by the change in days: $\\frac{86 - 38}{8 - 2} = 8$.\n\n**The Fast Way (~20s):** The rate climbs $48$ points across $6$ days, so the slope is $\\frac{48}{6} = 8$.\n\n**The Full Solution:**\nStep 1: The two given data pairs are $(2, 38)$ and $(8, 86)$, with $d$ as the input and the occupancy rate as the output.\nStep 2: Apply the slope formula: $\\frac{86 - 38}{8 - 2} = \\frac{48}{6} = 8$.\nStep 3: Check by stepping forward from $(2, 38)$: six days at $8$ points per day adds $48$, and $38 + 48 = 86$, matching the second pair ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.125$): this computes $\\frac{6}{48}$, the change in days over the change in rate. Slope is always output change over input change.\n* Choice B ($4.8$): this uses $2 + 8 = 10$ as the run. The run is the difference of the inputs, not their sum.\n* Choice C ($6$): this divides by the later day number $8$ rather than by the $6$-day gap, forgetting that the first observation is at $d = 2$, not $d = 0$.\n\n**Test Day Takeaway:** Subtract in the same order top and bottom, and make sure the denominator is a difference of inputs — using a single input value as the run is the classic slip when the data do not start at zero.",
  skills: ["slope-from-points"]
},

// ===== HARD (Q15–Q22) =====

{
  id: 15,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A dosing model uses the quadratic expression $2x^2 + kx + 8$, where $x$ is the deviation, in milliliters, of a measured dose from its target, and the model requires this expression to be positive for every real value of $x$. If the constant $k$ is an integer, how many values of $k$ are possible?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**The correct answer is $15$.** An upward parabola stays positive exactly when it has no real zeros, so $k^2 - 64 < 0$, giving the integers $-7$ through $7$.\n\n**The Fast Way (~40s):** No real zeros means $k^2 < 4(2)(8) = 64$, so $-8 < k < 8$, which holds for $15$ integers.\n\n**The Full Solution:**\nStep 1: The leading coefficient $2$ is positive, so the parabola opens upward. Such a parabola is positive for every $x$ exactly when it never touches the $x$-axis, that is, when $2x^2 + kx + 8 = 0$ has no real solutions.\nStep 2: No real solutions means a negative discriminant: $k^2 - 4(2)(8) < 0$, so $k^2 < 64$ and $-8 < k < 8$.\nStep 3: The integers strictly between $-8$ and $8$ are $-7, -6, \\ldots, 0, \\ldots, 6, 7$, which is $7 + 7 + 1 = 15$ values. Check an endpoint: $k = 8$ gives $2x^2 + 8x + 8 = 2(x + 2)^2$, which equals $0$ at $x = -2$, so $8$ is correctly excluded ✓\n\n**Common Mistakes:**\n* $17$: counting $k = -8$ and $k = 8$ as well. At those values the discriminant is zero, so the expression touches zero instead of staying positive.\n* $14$: forgetting to count $k = 0$, which does satisfy $0^2 < 64$.\n* $8$: reporting the boundary $8$ rather than the number of integers the inequality allows.\n\n**Test Day Takeaway:** \"Positive for every real $x$\" with a positive leading coefficient is the discriminant condition $b^2 - 4ac < 0$ in disguise — and when the question counts integers, decide the endpoints deliberately.",
  skills: ["discriminant-analysis"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Two identical right triangular canvas panels reinforce a boat-shed awning, and one panel is drawn in the figure with two side lengths in inches. What is the combined area, in square inches, of both panels?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [13.856, 0], [13.856, 8]], sideLabels: ["", "8", "16"], rightAngleVertex: 1, showRightAngle: true } },
  choices: [
    // distractor: reports the missing leg length 8 times sqrt(3) as if it were an area
    { id: "A", text: "$8\\sqrt{3}$" },
    // distractor: gives the area of a single panel, 32 times sqrt(3), instead of both panels
    { id: "B", text: "$32\\sqrt{3}$" },
    { id: "C", text: "$64\\sqrt{3}$" },
    // distractor: omits the factor 1/2 in the triangle area formula for both panels: 2 times 8 times 8 sqrt(3) = 128 sqrt(3)
    { id: "D", text: "$128\\sqrt{3}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice C is correct.** The missing leg is $8\\sqrt{3}$, so one panel has area $32\\sqrt{3}$ and two panels have area $64\\sqrt{3}$ square inches.\n\n**The Fast Way (~35s):** A leg of $8$ with hypotenuse $16$ is half the hypotenuse, so the other leg is $8\\sqrt{3}$. One panel is $\\frac{1}{2}(8)(8\\sqrt{3}) = 32\\sqrt{3}$; doubling gives $64\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: The panel is a right triangle with hypotenuse $16$ and one leg $8$. By the Pythagorean theorem the other leg is $\\sqrt{16^2 - 8^2} = \\sqrt{256 - 64} = \\sqrt{192}$.\nStep 2: Simplify the radical: $\\sqrt{192} = \\sqrt{64 \\cdot 3} = 8\\sqrt{3}$ inches. The two legs are therefore $8$ and $8\\sqrt{3}$.\nStep 3: One panel has area $\\frac{1}{2}(8)(8\\sqrt{3}) = 32\\sqrt{3}$, so two identical panels have area $64\\sqrt{3}$ square inches. Check numerically: $8\\sqrt{3} \\approx 13.86$, and $\\frac{1}{2}(8)(13.86)(2) \\approx 110.9 \\approx 64\\sqrt{3}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8\\sqrt{3}$): this is the missing leg, a length, not an area. It is the answer to the setup step, not to the question.\n* Choice B ($32\\sqrt{3}$): this is one panel's area. The awning uses two identical panels, so the total is twice this.\n* Choice D ($128\\sqrt{3}$): this multiplies the legs for both panels but never applies the factor $\\frac{1}{2}$, giving the area of two rectangles instead of two triangles.\n\n**Test Day Takeaway:** With a right triangle, find the missing side and simplify the radical before touching the area formula — and reread whether the question wants one figure or several.",
  skills: ["triangle-area"]
},
{
  id: 17,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A museum's count of international visitors rose $15\\%$ from $2021$ to $2022$ and then rose another $20\\%$ from $2022$ to $2023$. The count in $2023$ was $p\\%$ greater than the count in $2021$. What is the value of $p$?",
  correctAnswer: "38",
  explanation: "**SAT Pattern: Percent Increase**\n\n**The correct answer is $38$.** Successive increases multiply, so the $2023$ count is $1.15 \\times 1.20 = 1.38$ times the $2021$ count, a $38\\%$ increase.\n\n**The Fast Way (~30s):** Multiply the growth factors: $1.15(1.20) = 1.38$, and $1.38 - 1 = 0.38$, so $p = 38$.\n\n**The Full Solution:**\nStep 1: Let $v$ be the $2021$ count. A $15\\%$ increase makes the $2022$ count $1.15v$.\nStep 2: A further $20\\%$ increase applies to the $2022$ count, so the $2023$ count is $1.20(1.15v) = 1.38v$.\nStep 3: Since $1.38v = v + 0.38v$, the $2023$ count exceeds the $2021$ count by $38\\%$, so $p = 38$. Check with a number: $200$ visitors becomes $230$, then $276$, and $\\frac{276 - 200}{200} = 0.38$ ✓\n\n**Common Mistakes:**\n* $35$: adding the two percents. Percent increases compound, so the second increase also applies to the first increase.\n* $138$: reporting the total as a percent of the original instead of the percent greater than the original; $1.38$ means $138\\%$ of, which is $38\\%$ greater.\n* $3$: keeping only the cross term $0.15(0.20) = 0.03$ and reading it as $3\\%$, which is the extra growth beyond $35\\%$, not the whole increase.\n\n**Test Day Takeaway:** Chain percent changes by multiplying their factors, then subtract $1$ — the difference between \"percent of\" and \"percent greater than\" is exactly that subtraction.",
  skills: ["percent-of-value", "percent-change"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "On a cutting table's coordinate grid, a pattern grader stores the outline of a circular fabric die as $x^2 + y^2 - 14x + 8y + 40 = 0$, graphed in the $xy$-plane. Written in standard form, that outline has which equation?",
  choices: [
    { id: "A", text: "$(x - 7)^2 + (y + 4)^2 = 25$" },
    // distractor: completes both squares but never moves the constant 40 across, leaving 49 + 16 = 65 on the right
    { id: "B", text: "$(x - 7)^2 + (y + 4)^2 = 65$" },
    // distractor: adds 40 to the right side instead of subtracting it, giving 49 + 16 + 40 = 105
    { id: "C", text: "$(x - 7)^2 + (y + 4)^2 = 105$" },
    // distractor: flips the signs inside the parentheses, placing the center at (-7, 4) instead of (7, -4)
    { id: "D", text: "$(x + 7)^2 + (y - 4)^2 = 25$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice A is correct.** Completing the square in $x$ and in $y$ gives $(x - 7)^2 + (y + 4)^2 = 25$.\n\n**The Fast Way (~40s):** Half of $-14$ is $-7$ and half of $8$ is $4$, so the center is $(7, -4)$; then $r^2 = 49 + 16 - 40 = 25$.\n\n**The Full Solution:**\nStep 1: Group the variables: $(x^2 - 14x) + (y^2 + 8y) = -40$.\nStep 2: Complete each square. Add $49$ for $x$ and $16$ for $y$ to both sides: $(x - 7)^2 + (y + 4)^2 = -40 + 49 + 16 = 25$.\nStep 3: The circle has center $(7, -4)$ and radius $5$. Check a point on it: $(12, -4)$ gives $144 + 16 - 168 - 32 + 40 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($= 65$): the two completing terms $49$ and $16$ are added, but the original constant $40$ is never moved to the right side.\n* Choice C ($= 105$): the constant $40$ is added instead of subtracted; it starts on the left, so moving it makes it $-40$.\n* Choice D (center $(-7, 4)$): the signs inside the parentheses are copied from the equation rather than reversed. In standard form, $(x - h)$ with $h = 7$ produces the $-14x$ term.\n\n**Test Day Takeaway:** Completing the square adds to both sides — track the constant you started with, because forgetting to carry it is what turns a radius of $5$ into a radius of $\\sqrt{65}$.",
  skills: ["circle-equation"]
},
{
  id: 19,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "On a resort map, a cable car runs in a straight path from a station at $(1, 5)$ to a summit at $(1 + 4t, 5 + 3t)$, where $t$ is a positive constant. The length of this path on the map is $35$ units. What is the value of $t$?",
  correctAnswer: "7",
  explanation: "**SAT Pattern: Distance Formula**\n\n**The correct answer is $7$.** The horizontal change is $4t$ and the vertical change is $3t$, so the distance is $\\sqrt{(4t)^2 + (3t)^2} = 5t$, and $5t = 35$ gives $t = 7$.\n\n**The Fast Way (~30s):** The legs are $4t$ and $3t$, a $3$-$4$-$5$ pattern, so the distance is $5t = 35$ and $t = 7$.\n\n**The Full Solution:**\nStep 1: Subtract the coordinates: the change in $x$ is $(1 + 4t) - 1 = 4t$ and the change in $y$ is $(5 + 3t) - 5 = 3t$.\nStep 2: Apply the distance formula: $\\sqrt{(4t)^2 + (3t)^2} = \\sqrt{16t^2 + 9t^2} = \\sqrt{25t^2} = 5t$, using $t > 0$.\nStep 3: Set $5t = 35$, so $t = 7$. Check: the summit is at $(29, 26)$, and $\\sqrt{28^2 + 21^2} = \\sqrt{784 + 441} = \\sqrt{1{,}225} = 35$ ✓\n\n**Common Mistakes:**\n* $5$: reporting the factor $\\sqrt{4^2 + 3^2} = 5$, which is the distance per unit of $t$, not $t$ itself.\n* $1.4$: squaring the coefficients to get $25t^2$ and then dividing $35$ by $25$ without taking the square root first.\n* $49$: solving $25t^2 = 1{,}225$ to get $t^2 = 49$ and reporting $t^2$ instead of $t$.\n\n**Test Day Takeaway:** When both coordinate differences carry the same factor, pull it out of the radical first — the distance formula collapses to a familiar triple times that factor.",
  skills: ["coordinate-geometry"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For one dye vat, the function $g$ gives the mass, in grams, of dye absorbed by a fabric roll after $t$ minutes in the vat, and the function $s$ gives the shade rating of a roll that has absorbed $x$ grams of dye. Which expression represents the shade rating of a roll after $2t$ minutes in the vat?",
  choices: [
    // distractor: doubles the shade rating that comes out instead of doubling the number of minutes that goes in
    { id: "A", text: "$2s(g(t))$" },
    // distractor: doubles the mass of dye absorbed instead of the elapsed time, which is not what 2t minutes means
    { id: "B", text: "$s(2g(t))$" },
    // distractor: composes in the wrong order, feeding minutes into s and a shade rating into g
    { id: "C", text: "$g(s(2t))$" },
    { id: "D", text: "$s(g(2t))$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice D is correct.** Minutes go into $g$ and a mass goes into $s$, so the shade rating at $2t$ minutes is $s(g(2t))$.\n\n**The Fast Way (~30s):** Work inside out: $2t$ minutes gives the mass $g(2t)$, and feeding that mass into $s$ gives $s(g(2t))$.\n\n**The Full Solution:**\nStep 1: Identify each function's input and output. The input of $g$ is a number of minutes and its output is a mass in grams; the input of $s$ is a mass in grams and its output is a shade rating.\nStep 2: The elapsed time is $2t$ minutes, so the mass of dye absorbed at that moment is $g(2t)$ grams.\nStep 3: A shade rating comes from feeding a mass into $s$, so the rating is $s(g(2t))$. Check the units chain: minutes goes into $g$, grams comes out and goes into $s$, a shade rating comes out ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2s(g(t))$): this doubles the output rating. Nothing in the setup makes the rating proportional to time, so doubling the time need not double the rating.\n* Choice B ($s(2g(t))$): this doubles the mass absorbed in $t$ minutes. The question doubles the elapsed time, not the mass.\n* Choice C ($g(s(2t))$): this reverses the order, feeding minutes into $s$ and a shade rating into $g$, which mismatches every input and output.\n\n**Test Day Takeaway:** Compose by matching units: the inner function must output exactly what the outer function accepts, and a change to the time always belongs inside the innermost parentheses.",
  skills: ["function-composition"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A textile lab models $y$, a spool's mass in grams above or below its target mass, as a quadratic function of the position $x$, in meters, along the winding machine. The table gives five values of $x$ and their corresponding values of $y$. What is the distance between the two $x$-intercepts of the graph of this function?",
  questionTable: { headers: ["x", "y"], rows: [["0", "-14"], ["1", "-24"], ["2", "-30"], ["3", "-32"], ["4", "-30"]] },
  choices: [
    // distractor: reports the distance from the vertex to one intercept, 4, which is half the distance between the two intercepts
    { id: "A", text: "$4$" },
    // distractor: reports the sum of the two intercepts, 7 + (-1) = 6, instead of the distance between them
    { id: "B", text: "$6$" },
    { id: "C", text: "$8$" },
    // distractor: stops at (x - 3)^2 = 16 and reports 16, the square of the half-distance
    { id: "D", text: "$16$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice C is correct.** The table gives the vertex $(3, -32)$ and leading coefficient $2$, so the intercepts are $x = -1$ and $x = 7$, a distance of $8$ apart.\n\n**The Fast Way (~40s):** The table is symmetric about $x = 3$, and $2(x - 3)^2 = 32$ gives $x - 3 = \\pm 4$, so the intercepts sit $4$ on each side of $3$: distance $8$.\n\n**The Full Solution:**\nStep 1: Read the vertex from the symmetry of the table: $y = -30$ at both $x = 2$ and $x = 4$, so the axis of symmetry is $x = 3$ and the vertex is $(3, -32)$.\nStep 2: Find the leading coefficient from any other row. Using $(0, -14)$ in $y = a(x - 3)^2 - 32$ gives $-14 = 9a - 32$, so $9a = 18$ and $a = 2$; the function is $y = 2(x - 3)^2 - 32$.\nStep 3: Set $y = 0$: $2(x - 3)^2 = 32$, so $(x - 3)^2 = 16$ and $x = 3 \\pm 4$, that is $x = -1$ and $x = 7$. The distance is $7 - (-1) = 8$. Check with the table row $x = 1$: $2(1 - 3)^2 - 32 = 8 - 32 = -24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): this is the distance from the axis of symmetry to a single intercept. The two intercepts sit on opposite sides, so the full gap is twice this.\n* Choice B ($6$): this adds the intercepts, $7 + (-1)$, instead of subtracting them. A distance is always a difference.\n* Choice D ($16$): this reports $(x - 3)^2 = 16$ without taking the square root, so it is the square of the half-distance, not a distance.\n\n**Test Day Takeaway:** A symmetric pair of table rows hands you the axis of symmetry for free; once you have the vertex, the intercept gap is just twice the horizontal offset.",
  skills: ["quadratics"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A vaccine storage log lists $20$ vials: $11$ of the vials each hold $6$ milliliters, and the other $9$ vials hold $10$, $10$, $12$, $12$, $14$, $14$, $16$, $16$, and $18$ milliliters. What is the median volume, in milliliters, of the $20$ vials?",
  correctAnswer: "6",
  explanation: "**SAT Pattern: Median Calculation**\n\n**The correct answer is $6$.** With $20$ values, the median is the mean of the $10$th and $11$th values in order, and both of those are $6$ because the eleven $6$-milliliter vials fill positions $1$ through $11$.\n\n**The Fast Way (~35s):** Eleven $6$s occupy positions $1$ through $11$, so positions $10$ and $11$ are both $6$ and the median is $6$.\n\n**The Full Solution:**\nStep 1: Order the $20$ volumes from least to greatest: $6$ appears $11$ times, then $10, 10, 12, 12, 14, 14, 16, 16, 18$.\nStep 2: For an even count of $20$ values, the median is the average of the $10$th and $11$th values. Positions $1$ through $11$ all hold $6$ milliliters.\nStep 3: The median is $\\frac{6 + 6}{2} = 6$ milliliters. Check the balance: $11$ of the $20$ vials are at or below $6$, which is more than half, so the middle of the list must sit at $6$ ✓\n\n**Common Mistakes:**\n* $14$: taking the median of only the nine larger vials and ignoring the eleven $6$-milliliter vials entirely.\n* $10$: averaging the two groups' medians, $\\frac{6 + 14}{2}$. Medians of subgroups cannot be averaged to give the median of the combined list.\n* $9.4$: computing the mean, $\\frac{66 + 122}{20}$, instead of the median. A cluster of repeated low values pulls the median lower than the mean.\n\n**Test Day Takeaway:** When one value repeats enough times to cover the middle positions, the median is that value — count how far the repeats reach before averaging anything.",
  skills: ["find-median"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 6 — Math Module 2 (22 questions) — hard track
// Frozen wavy flow: easy 3 [1,6,16] / medium 7 [2,3,5,9,12,14,17] /
// hard 12 [4,7,8,10,11,13,15,18,19,20,21,22]. Bands: Q1 band 3 opener,
// band-2 breathers Q6 (vertical angles figure) and Q16 (range bar graph),
// medium band 5-6, hard band 7 with Q9/Q11 at band 6.
// Band ramp holds: mean(Q1-5)=5.0 < mean(Q18-22)=7.0.
// Q1-5 warm-up rule: every opener is 2+ steps or carries a trap
// (ratio-sum probability, no-solution coefficient, percent-of-ORIGINAL
// linear-vs-exponential trap, quadratic-linear greatest root, vertex swap).

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 2,
  question: "Each point on the scatterplot gives the applied load, in kilonewtons, and the deflection, in millimeters, of one of 12 steel beams. Using the line of best fit $y = 0.5x + 1.5$, at what load, in kilonewtons, is the predicted deflection $9.5$ millimeters?",
  diagram: { type: "scatterplot", params: { points: [[2, 2.5], [4, 3.5], [6, 5], [8, 5], [10, 6.5], [12, 7], [14, 9], [16, 10], [18, 11], [20, 11], [22, 13], [23, 12.5]], xMin: 0, xMax: 24, yMin: 0, yMax: 14, xGridStep: 2, yGridStep: 2, xLabelStep: 4, yLabelStep: 4, xLabel: "Applied load (kN)", yLabel: "Deflection (mm)", bestFitLine: { slope: 0.5, intercept: 1.5 } } },
  choices: [
    // distractor: swaps the slope and the intercept: computes (9.5 - 0.5)/1.5 = 6
    { id: "A", text: "$6$" },
    { id: "B", text: "$16$" },
    // distractor: ignores the intercept and divides 9.5 by the slope: 9.5/0.5 = 19
    { id: "C", text: "$19$" },
    // distractor: adds the intercept instead of subtracting it: (9.5 + 1.5)/0.5 = 22
    { id: "D", text: "$22$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** A predicted deflection is a $y$-value, so set $0.5x + 1.5 = 9.5$. Subtracting the intercept leaves $0.5x = 8$, so $x = 16$ kilonewtons.\n\n**The Full Solution:**\nStep 1: On this scatterplot the load is $x$ and the deflection is $y$, so \"predicted deflection $9.5$\" means $y = 9.5$ on the line of best fit, not at a plotted point.\nStep 2: Substitute into the line: $9.5 = 0.5x + 1.5$. Subtract $1.5$ from both sides to get $8 = 0.5x$.\nStep 3: Divide by $0.5$: $x = 16$. Check by predicting forward: $0.5(16) + 1.5 = 8 + 1.5 = 9.5$ millimeters ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): swaps the roles of the slope and the intercept, computing $(9.5 - 0.5)/1.5 = 6$.\n* Choice C ($19$): drops the intercept entirely and divides $9.5$ by $0.5$, which predicts $0.5(19) + 1.5 = 11$ millimeters, not $9.5$.\n* Choice D ($22$): adds $1.5$ instead of subtracting it, giving $(9.5 + 1.5)/0.5 = 22$.\n\n**Test Day Takeaway:** Working backward on a line of best fit is the same algebra as working forward — undo the intercept first, then divide by the slope.",
  skills: ["scatterplots", "linear-functions"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "On a factory floor grid a conveyor rail runs along $2x + 5y = 40$, and a bracing rail meets it at a right angle after passing through the bolt at $(10, 5)$. At what $x$-value does the bracing rail cross the $x$-axis?",
  choices: [
    // distractor: uses slope 2/5, the reciprocal without the sign change: y = 0.4x + 1 crosses at -2.5
    { id: "A", text: "$-2.5$" },
    { id: "B", text: "$8$" },
    // distractor: negates the reciprocal a second time, using slope -5/2: y = -2.5x + 30 crosses at 12
    { id: "C", text: "$12$" },
    // distractor: reuses the conveyor rail's own slope -2/5: y = -0.4x + 9 crosses at 22.5
    { id: "D", text: "$22.5$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The conveyor rail has slope $-\\frac{2}{5}$, so the bracing rail has slope $\\frac{5}{2}$. Through $(10, 5)$ that is $y = \\frac{5}{2}x - 20$, which is $0$ at $x = 8$.\n\n**The Full Solution:**\nStep 1: Put the conveyor rail in slope-intercept form: $5y = -2x + 40$, so $y = -\\frac{2}{5}x + 8$ and its slope is $-\\frac{2}{5}$.\nStep 2: Perpendicular means the negative reciprocal: flip to $-\\frac{5}{2}$ and change the sign to get $\\frac{5}{2}$. Using the bolt, $5 = \\frac{5}{2}(10) + b$, so $b = 5 - 25 = -20$.\nStep 3: Set $y = 0$: $0 = \\frac{5}{2}x - 20$, so $x = 8$. Check the right angle: $\\left(-\\frac{2}{5}\\right)\\left(\\frac{5}{2}\\right) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2.5$): uses $\\frac{2}{5}$, the reciprocal with no sign change, giving $y = 0.4x + 1$ and a crossing at $-2.5$.\n* Choice C ($12$): negates twice and uses $-\\frac{5}{2}$, giving $y = -2.5x + 30$ and a crossing at $12$.\n* Choice D ($22.5$): keeps the conveyor rail's own slope $-\\frac{2}{5}$, which produces a parallel rail, not a perpendicular one.\n\n**Test Day Takeaway:** Perpendicular slopes multiply to $-1$ — flip and change the sign, then use the given point to pin down the intercept before answering what was actually asked.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A commuter's monthly transportation budget allots $m$ dollars to fuel and $t$ dollars to transit passes, where $m + t = 540$ and $m = 3t - 40$. What is the value of $t$?",
  choices: [
    // distractor: flips the sign of the constant, solving m = 3t + 40, so 4t = 500 and t = 125
    { id: "A", text: "$125$" },
    // distractor: drops the -40 and splits 540 into four equal shares: t = 135
    { id: "B", text: "$135$" },
    { id: "C", text: "$145$" },
    // distractor: solves for m, the fuel allotment, instead of t: m = 395
    { id: "D", text: "$395$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Replace $m$ with $3t - 40$ in the total: $(3t - 40) + t = 540$, so $4t = 580$ and $t = 145$.\n\n**The Full Solution:**\nStep 1: The second equation already isolates $m$, so substitute it into the first: $3t - 40 + t = 540$.\nStep 2: Combine like terms and undo the constant: $4t - 40 = 540$, so $4t = 580$.\nStep 3: Divide by $4$: $t = 145$. Check both equations with $m = 3(145) - 40 = 395$: $395 + 145 = 540$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($125$): reads the model as $m = 3t + 40$, which gives $4t = 500$ and misses the sign on the $40$.\n* Choice B ($135$): ignores the $-40$ and divides $540$ by $4$, which would only be right if fuel were exactly three times the pass allotment.\n* Choice D ($395$): solves the system correctly but reports $m$, the fuel dollars, instead of $t$.\n\n**Test Day Takeaway:** When one variable is already isolated, substitute immediately — then reread the question to confirm which variable it wants.",
  skills: ["substitution-method"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The two times, in seconds, at which a launched probe passes an altitude of $40$ meters are the solutions of $5t^2 + 12 = 34t$. Which expression gives the sum of those two times?",
  choices: [
    // distractor: applies -b/a with b = 34 instead of the rearranged b = -34, giving -34/5
    { id: "A", text: "$-\\frac{34}{5}$" },
    // distractor: inverts the ratio, writing a/b as 5/34
    { id: "B", text: "$\\frac{5}{34}$" },
    // distractor: gives the product of the solutions, c/a = 12/5, instead of the sum
    { id: "C", text: "$\\frac{12}{5}$" },
    { id: "D", text: "$\\frac{34}{5}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Rearranged, the equation is $5t^2 - 34t + 12 = 0$, so the sum of the solutions is $-\\frac{b}{a} = \\frac{34}{5}$.\n\n**The Full Solution:**\nStep 1: Standard form comes first. Subtract $34t$ from both sides: $5t^2 - 34t + 12 = 0$, so $a = 5$, $b = -34$, and $c = 12$.\nStep 2: For any quadratic with two solutions, their sum is $-\\frac{b}{a}$. Here that is $-\\frac{-34}{5} = \\frac{34}{5}$.\nStep 3: Confirm the solutions are real before trusting the shortcut: $b^2 - 4ac = 1156 - 240 = 916 > 0$, so the probe really does pass $40$ meters twice, once rising and once falling ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{34}{5}$): uses $-\\frac{b}{a}$ with $b$ read as $+34$ from the unrearranged equation, so the sign comes out negative — impossible for two positive times.\n* Choice B ($\\frac{5}{34}$): inverts the ratio and reports $\\frac{a}{b}$.\n* Choice C ($\\frac{12}{5}$): gives $\\frac{c}{a}$, which is the product of the two times, not their sum.\n\n**Test Day Takeaway:** The sum and product shortcuts only read off standard form — move every term to one side before you name $a$, $b$, and $c$.",
  skills: ["quadratic-factoring"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "medium",
  band: 6,
  question: "In a milling model the profile $y = 2x^2 + 8x + c$, where $c$ is a constant, gives the depth of cut across one pass, and the profile never meets the $x$-axis. Which statement about $c$ must be true?",
  choices: [
    // distractor: flips the inequality when dividing, reading 64 - 8c < 0 as c < 8
    { id: "A", text: "$c < 8$" },
    // distractor: uses the tangent case 64 - 8c = 0, where the profile touches the axis exactly once
    { id: "B", text: "$c = 8$" },
    { id: "C", text: "$c > 8$" },
    // distractor: computes the discriminant as b^2 - ac = 64 - 2c, giving c > 32
    { id: "D", text: "$c > 32$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** No $x$-intercepts means $b^2 - 4ac < 0$: $64 - 8c < 0$, so $c > 8$.\n\n**The Full Solution:**\nStep 1: The profile meets the $x$-axis where $2x^2 + 8x + c = 0$. \"Never meets\" means that equation has no real solutions.\nStep 2: No real solutions happens exactly when the discriminant is negative: $b^2 - 4ac = 8^2 - 4(2)(c) = 64 - 8c < 0$.\nStep 3: Add $8c$ to both sides and divide by $8$: $64 < 8c$, so $c > 8$. Check a value: $c = 10$ gives $64 - 80 = -16 < 0$, and $c = 6$ gives $64 - 48 = 16 > 0$, which would cross twice ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($c < 8$): reverses the inequality; $c = 6$ makes the discriminant positive, so the profile crosses the axis twice.\n* Choice B ($c = 8$): is the boundary case, where the discriminant is $0$ and the profile touches the axis once instead of missing it.\n* Choice D ($c > 32$): drops the $4$ from $4ac$ and solves $64 - 2c < 0$; it also fails as a \"must be true\" statement, since $c = 10$ works but is not greater than $32$.\n\n**Test Day Takeaway:** Translate the picture into the discriminant first — no intercepts is negative, one intercept is zero, two intercepts is positive — and keep the $4$ in $4ac$.",
  skills: ["discriminant-analysis"]
},
{
  id: 6,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "In the right triangular bracket shown, angle $E$ is the right angle and $\\tan F = \\frac{12}{5}$. The bracket is cut from steel plate and covers $270$ square centimeters of it. How many centimeters of edging are needed to run along all three of its edges?",
  diagram: { type: "rightTriangle", params: { vertices: [[12, 0], [0, 0], [0, 5]], labels: ["D", "E", "F"], rightAngleVertex: 1, showRightAngle: true } },
  correctAnswer: "90",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**The correct answer is $90$.**\n\n**The Fast Way (~45s):** $\\tan F = \\frac{12}{5}$ makes the legs $12k$ and $5k$, so the area is $30k^2 = 270$ and $k = 3$. The sides are then $36$, $15$, and $39$, for $90$ centimeters of edging.\n\n**The Full Solution:**\nStep 1: With the right angle at $E$, $\\tan F = \\frac{DE}{EF} = \\frac{12}{5}$, so write $DE = 12k$ and $EF = 5k$ for some positive $k$.\nStep 2: The legs are the base and height: $\\frac{1}{2}(12k)(5k) = 30k^2 = 270$, so $k^2 = 9$ and $k = 3$. That gives $DE = 36$ and $EF = 15$.\nStep 3: The hypotenuse is $DF = \\sqrt{36^2 + 15^2} = \\sqrt{1296 + 225} = \\sqrt{1521} = 39$, so the perimeter is $36 + 15 + 39 = 90$. Check the area: $\\frac{1}{2}(36)(15) = 270$ ✓\n\n**Common Mistakes:**\n* $30$: treats $12$ and $5$ as the actual leg lengths and adds $5 + 12 + 13$, ignoring the given area.\n* $270$: solves $30k = 270$ instead of $30k^2 = 270$, getting $k = 9$ and sides $108$, $45$, $117$.\n* $102$: adds the legs to get the hypotenuse ($36 + 15 = 51$) instead of using the Pythagorean theorem.\n\n**Test Day Takeaway:** A tangent ratio fixes the shape, not the size — introduce a scale factor $k$, and remember that area carries $k^2$ while perimeter carries $k$.",
  skills: ["soh-cah-toa"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "In a machine-vision calibration, one detected edge runs from $(1, 3)$ to $(9, -1)$, coordinates in millimeters, and a second detected edge satisfies $ax + 12y = 60$ for a constant $a$. The two edges are perpendicular. What is the value of $a$?",
  correctAnswer: "-24",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**The correct answer is $-24$.**\n\n**The Fast Way (~50s):** The first edge has slope $\\frac{-1 - 3}{9 - 1} = -\\frac{1}{2}$, so the second must have slope $2$. Since $ax + 12y = 60$ has slope $-\\frac{a}{12}$, $-\\frac{a}{12} = 2$ and $a = -24$.\n\n**The Full Solution:**\nStep 1: Find the slope of the first edge from its two endpoints: $\\frac{-1 - 3}{9 - 1} = \\frac{-4}{8} = -\\frac{1}{2}$.\nStep 2: Perpendicular means the negative reciprocal, so the second edge has slope $2$. Solve its equation for $y$ to see where $a$ sits: $12y = -ax + 60$, so $y = -\\frac{a}{12}x + 5$ and its slope is $-\\frac{a}{12}$, not $\\frac{a}{12}$.\nStep 3: Set the slopes equal: $-\\frac{a}{12} = 2$, so $a = -24$. Check the product of the slopes: with $a = -24$ the second edge is $-24x + 12y = 60$, or $y = 2x + 5$, and $\\left(-\\frac{1}{2}\\right)(2) = -1$ ✓\n\n**Common Mistakes:**\n* $24$: reads the slope of $ax + 12y = 60$ as $\\frac{a}{12}$ and solves $\\frac{a}{12} = 2$, dropping the sign that appears when the $ax$ term moves across.\n* $6$: reuses the first edge's own slope, solving $-\\frac{a}{12} = -\\frac{1}{2}$; that makes the two edges parallel, not perpendicular.\n* $-6$: changes the sign of the slope without flipping the fraction, solving $-\\frac{a}{12} = \\frac{1}{2}$.\n\n**Test Day Takeaway:** A line written as $Ax + By = C$ has slope $-\\frac{A}{B}$ — solve for $y$ before matching slopes, or the sign of the parameter comes out backwards.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A sloped pipe section rises $16$ centimeters over a horizontal run of $63$ centimeters between two supports on a rack. How many centimeters longer is the sloped pipe than the horizontal run beneath it?",
  choices: [
    { id: "A", text: "$2$" },
    // distractor: reports the rise, 16, instead of the extra length of the pipe
    { id: "B", text: "$16$" },
    // distractor: subtracts the rise from the slant length: 65 - 16 = 49
    { id: "C", text: "$49$" },
    // distractor: reports the sloped pipe's full length, 65, instead of how much longer it is
    { id: "D", text: "$65$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The rise and run are the legs of a right triangle, so the pipe is $\\sqrt{16^2 + 63^2} = 65$ centimeters long, which is $65 - 63 = 2$ centimeters longer than the run.\n\n**The Full Solution:**\nStep 1: The vertical rise, the horizontal run, and the pipe form a right triangle with the pipe as the hypotenuse.\nStep 2: Apply the Pythagorean theorem: $16^2 + 63^2 = 256 + 3969 = 4225$, and $\\sqrt{4225} = 65$ centimeters.\nStep 3: The question asks for the difference, not the length: $65 - 63 = 2$ centimeters. Check: $63^2 + 16^2 = 3969 + 256 = 4225 = 65^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($16$): repeats the rise; the pipe gains only $2$ centimeters over the run because the rise is small compared with it.\n* Choice C ($49$): subtracts the rise from the hypotenuse instead of subtracting the run.\n* Choice D ($65$): stops at the hypotenuse and never takes the difference the question asks for.\n\n**Test Day Takeaway:** Finish the Pythagorean theorem, then reread the last line — \"how much longer\" is a subtraction after the length, not the length itself.",
  skills: ["pythagorean-theorem"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "easy",
  band: 2,
  question: "A sensor calibration reduces to the equation $4^{3x} = 8^{x + 2}$. Which equation has the same solution as this equation?",
  choices: [
    { id: "A", text: "$6x = 3x + 6$" },
    // distractor: rewrites both sides in base 2 but does not distribute the 3 over x + 2, writing 3x + 2
    { id: "B", text: "$6x = 3x + 2$" },
    // distractor: matches the exponents without rewriting the bases, as though 4 and 8 were the same base
    { id: "C", text: "$3x = x + 2$" },
    // distractor: rewrites 4^(3x) as 2^(12x), multiplying the exponent by the base 4 instead of by 2
    { id: "D", text: "$12x = 3x + 6$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Write both sides in base $2$: $4^{3x} = 2^{6x}$ and $8^{x+2} = 2^{3x+6}$. Equal powers of $2$ force $6x = 3x + 6$.\n\n**The Full Solution:**\nStep 1: Both bases are powers of $2$: $4 = 2^2$ and $8 = 2^3$.\nStep 2: Apply the power-of-a-power rule: $\\left(2^2\\right)^{3x} = 2^{6x}$ and $\\left(2^3\\right)^{x+2} = 2^{3(x+2)} = 2^{3x+6}$.\nStep 3: With one common base, the exponents must be equal: $6x = 3x + 6$. Check by solving: $x = 2$, and $4^6 = 4096 = 8^4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($6x = 3x + 2$): forgets to distribute the $3$ across $x + 2$, so the exponent on the right is short by $4$.\n* Choice C ($3x = x + 2$): sets the exponents equal while the bases are still $4$ and $8$, which is only legal once the bases match.\n* Choice D ($12x = 3x + 6$): turns $4^{3x}$ into $2^{12x}$ by multiplying by the base $4$ rather than by the exponent $2$.\n\n**Test Day Takeaway:** Rewrite both sides as the same base first, then set the exponents equal — and distribute across every term in the exponent.",
  skills: ["exponential-functions"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A fracture-toughness model reduces to the equation $\\sqrt{c + 12} = c$, where $c$ is the model's dimensionless growth parameter and may be any real number. Which statement about the solutions of this equation is true?",
  choices: [
    // distractor: keeps the root -3 and discards 4, but a square root is never negative, so -3 fails the original equation
    { id: "A", text: "$c = -3$ is the only solution." },
    { id: "B", text: "$c = 4$ is the only solution." },
    // distractor: solves the squared equation and skips the check, so the extraneous root -3 is kept alongside 4
    { id: "C", text: "Both $c = -3$ and $c = 4$ are solutions." },
    // distractor: squares only the left side, reducing the equation to c + 12 = c, and concludes no value works
    { id: "D", text: "The equation has no real solutions." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Radical Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** Squaring gives $c + 12 = c^2$, so $c^2 - c - 12 = (c - 4)(c + 3) = 0$. Only $c = 4$ survives the check, because the left side of the original equation is never negative.\n\n**The Full Solution:**\nStep 1: Square both sides — the whole side, not just the radical: $\\left(\\sqrt{c + 12}\\right)^2 = c^2$, so $c + 12 = c^2$.\nStep 2: Set the quadratic to zero and factor: $c^2 - c - 12 = 0$, so $(c - 4)(c + 3) = 0$ and the candidates are $c = 4$ and $c = -3$.\nStep 3: Test each candidate in the original equation. For $c = 4$: $\\sqrt{16} = 4$ ✓. For $c = -3$: $\\sqrt{9} = 3$, but the right side is $-3$, so this candidate is extraneous ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($c = -3$ only): keeps the candidate that fails the check and throws out the one that works.\n* Choice C (both roots): trusts the squared equation without testing, but squaring can create solutions the original equation never had.\n* Choice D (no solutions): comes from squaring only the radical side, which collapses the equation to $c + 12 = c$.\n\n**Test Day Takeaway:** Squaring is a one-way street — every candidate must be substituted back, and a root that makes the non-radical side negative is always extraneous.",
  skills: ["radical-equations"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table gives the activity of a radioisotope sample, in microcuries, recorded by a detector every $4$ hours after the first reading. Which function models the activity $A(t)$, in microcuries, $t$ hours after that first reading?",
  diagram: { type: "dataTable", params: { headers: ["Time (hours)", "Activity (microcuries)"], rows: [["0", "640"], ["4", "480"], ["8", "360"], ["12", "270"]] } },
  choices: [
    { id: "A", text: "$A(t) = 640(0.75)^{t/4}$" },
    // distractor: inverts the exponent so the sample decays four times per hour: at t = 4 it predicts about 6.4 microcuries, not 480
    { id: "B", text: "$A(t) = 640(0.75)^{4t}$" },
    // distractor: treats 0.75 as the hourly factor: at t = 4 it predicts 202.5 microcuries, not 480
    { id: "C", text: "$A(t) = 640(0.75)^{t}$" },
    // distractor: uses the 25 percent lost as the decay factor: at t = 4 it predicts 160 microcuries, not 480
    { id: "D", text: "$A(t) = 640(0.25)^{t/4}$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** Each reading is $0.75$ times the one before, and the readings are $4$ hours apart, so the exponent counts four-hour blocks: $A(t) = 640(0.75)^{t/4}$.\n\n**The Full Solution:**\nStep 1: Check that the decay is exponential by dividing consecutive readings: $\\frac{480}{640} = 0.75$, $\\frac{360}{480} = 0.75$, and $\\frac{270}{360} = 0.75$. A constant ratio means an exponential model.\nStep 2: The factor $0.75$ applies once per $4$ hours, so the number of factors elapsed after $t$ hours is $\\frac{t}{4}$, and the model is $A(t) = 640(0.75)^{t/4}$ with $640$ as the starting activity.\nStep 3: Test the model on a row it must reproduce: $A(8) = 640(0.75)^2 = 640(0.5625) = 360$ microcuries ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($640(0.75)^{4t}$): flips the exponent, applying the factor four times an hour; at $t = 4$ it predicts about $6.4$ microcuries instead of $480$.\n* Choice C ($640(0.75)^{t}$): treats $0.75$ as the hourly factor; at $t = 4$ it predicts $202.5$ microcuries.\n* Choice D ($640(0.25)^{t/4}$): uses the $25\\%$ lost as the multiplier instead of the $75\\%$ kept; at $t = 4$ it predicts $160$ microcuries.\n\n**Test Day Takeaway:** In an exponential model the base is the fraction that remains and the exponent counts how many measurement intervals have passed — divide $t$ by the interval length.",
  skills: ["exponential-growth-decay"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A shift inspection covers $250$ castings, $40\\%$ of them poured on line A and the remainder on line B. Line A rejects $6\\%$ of its own castings and line B rejects $10\\%$ of its own. One rejected casting from that shift is picked at random. Which expression gives the probability that it was poured on line A?",
  choices: [
    // distractor: gives the chance that a line A casting is rejected, 6 out of 100, reversing the condition
    { id: "A", text: "$\\frac{6}{100}$" },
    // distractor: gives the overall rejection rate, 21 out of all 250 castings
    { id: "B", text: "$\\frac{21}{250}$" },
    { id: "C", text: "$\\frac{6}{21}$" },
    // distractor: gives the share of all castings poured on line A, 100 out of 250, ignoring that the casting was rejected
    { id: "D", text: "$\\frac{100}{250}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Basic Probability**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Line A supplies $0.06(100) = 6$ rejects and line B supplies $0.10(150) = 15$, so $21$ rejects exist and $\\frac{6}{21}$ of them came from line A.\n\n**The Full Solution:**\nStep 1: Split the shift: $40\\%$ of $250$ is $100$ castings on line A, leaving $250 - 100 = 150$ on line B.\nStep 2: Count rejects on each line: $6\\%$ of $100$ is $6$, and $10\\%$ of $150$ is $15$, for $6 + 15 = 21$ rejected castings in all.\nStep 3: The casting is drawn from the rejects only, so the denominator is $21$, not $250$: the probability is $\\frac{6}{21}$. Check that the parts add up: $\\frac{6}{21} + \\frac{15}{21} = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{6}{100}$): answers the reversed question — the chance a line A casting gets rejected.\n* Choice B ($\\frac{21}{250}$): gives the rejection rate for the whole shift, using every casting in the denominator.\n* Choice D ($\\frac{100}{250}$): gives line A's share of all castings, which ignores the given that the casting was rejected.\n\n**Test Day Takeaway:** When the item hands you a member of a smaller group, that group is the denominator — count the rejects first, then ask how many of them came from the line in question.",
  skills: ["probability-basics"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A household's water bills for nine consecutive months were \\$38, \\$41, \\$43, \\$44, \\$46, \\$47, \\$49, \\$52, and \\$207, the last of these covering a month with an undetected leak. By how many dollars does the mean of these nine bills exceed their median?",
  choices: [
    // distractor: drops the \$207 leak month before averaging (mean 45) and compares that with the median 46
    { id: "A", text: "$1$" },
    // distractor: reads the median as 47, the sixth of the nine bills, giving 63 - 47 = 16
    { id: "B", text: "$16$" },
    { id: "C", text: "$17$" },
    // distractor: uses 45, the median of the eight bills without the leak month, giving 63 - 45 = 18
    { id: "D", text: "$18$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Outlier Effect**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** The nine bills total \\$567, so the mean is \\$63, while the fifth of nine ordered bills, \\$46, is the median. The mean sits $63 - 46 = 17$ dollars above it.\n\n**The Full Solution:**\nStep 1: Add the bills: $38 + 41 + 43 + 44 + 46 + 47 + 49 + 52 + 207 = 567$, so the mean is $\\frac{567}{9} = 63$ dollars.\nStep 2: The bills are already in order, and with nine values the median is the fifth one, \\$46. The single \\$207 bill drags the mean far above the middle of the data but cannot move the median.\nStep 3: Subtract: $63 - 46 = 17$ dollars. Check the pull of the outlier: without it the eight remaining bills average \\$45, just below the median ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): removes the leak month first, which is exactly what the question does not ask; that mean of \\$45 differs from the median by only $1$.\n* Choice B ($16$): counts to the sixth bill, \\$47, for the median; with nine values the middle position is the fifth.\n* Choice D ($18$): pairs the full mean of \\$63 with \\$45, the median of the eight ordinary bills.\n\n**Test Day Takeaway:** One extreme value moves the mean and leaves the median alone — compute each from the full data set exactly as given.",
  skills: ["calculate-mean", "find-median"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A balance that read every mass $25\\%$ too high forces a technician to rescale $15$ sample masses whose mean was $46.0$ grams and whose range was $18.0$ grams. Which pair gives the mean and the range after rescaling?",
  choices: [
    // distractor: subtracts 25 percent of each reading (multiplies by 0.75) instead of dividing by 1.25, giving 34.5 and 13.5
    { id: "A", text: "Mean $34.5$ grams, range $13.5$ grams" },
    { id: "B", text: "Mean $36.8$ grams, range $14.4$ grams" },
    // distractor: scales the mean but leaves the range at 18.0, treating spread as unaffected by rescaling
    { id: "C", text: "Mean $36.8$ grams, range $18.0$ grams" },
    // distractor: multiplies by 1.25 instead of dividing by it, making the corrected masses larger, 57.5 and 22.5
    { id: "D", text: "Mean $57.5$ grams, range $22.5$ grams" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** Readings are $1.25$ times the true masses, so every value is multiplied by $\\frac{1}{1.25} = 0.8$. Both the mean and the range scale: $46.0(0.8) = 36.8$ and $18.0(0.8) = 14.4$.\n\n**The Full Solution:**\nStep 1: \"$25\\%$ too high\" means each reading equals $1.25$ times the true mass, so the correction multiplies every recorded mass by $\\frac{1}{1.25} = 0.8$.\nStep 2: Multiplying every value by a constant multiplies the mean by that constant: $46.0(0.8) = 36.8$ grams.\nStep 3: The range is a difference of two values, so it scales by the same constant: $18.0(0.8) = 14.4$ grams. Check with a sample pair: masses of $55$ and $37$ grams have range $18$, and rescaled they are $44$ and $29.6$, a range of $14.4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (mean $34.5$, range $13.5$): takes $25\\%$ off the readings, multiplying by $0.75$; but a reading $25\\%$ above the truth is undone by dividing by $1.25$, not by subtracting a quarter of it.\n* Choice C (mean $36.8$, range $18.0$): scales the center and leaves the spread, though shrinking every value pulls the extremes together too.\n* Choice D (mean $57.5$, range $22.5$): multiplies by $1.25$, which corrects in the wrong direction and makes a balance that already read high read higher.\n\n**Test Day Takeaway:** Multiplying a data set by a constant multiplies the mean, median, range, and standard deviation by that same constant — only adding a constant leaves the spread alone.",
  skills: ["data-analysis"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "An extrusion die produces a cylindrical rod of radius $r$ and length $h$. A redesigned die produces rods of radius $1.5r$ and length $0.5h$ from the same alloy. The volume of a redesigned rod is how many times the volume of an original rod?",
  correctAnswer: "1.125",
  explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $1.125$.**\n\n**The Fast Way (~35s):** Volume goes as $\\pi r^2 h$, so the factors are $(1.5)^2$ for the radius and $0.5$ for the length: $2.25(0.5) = 1.125$.\n\n**The Full Solution:**\nStep 1: The original rod has volume $V = \\pi r^2 h$.\nStep 2: The redesigned rod has radius $1.5r$ and length $0.5h$, so its volume is $\\pi (1.5r)^2 (0.5h) = \\pi (2.25r^2)(0.5h) = 1.125\\pi r^2 h$.\nStep 3: Divide: $\\frac{1.125\\pi r^2 h}{\\pi r^2 h} = 1.125$. Check with numbers: $r = 2$ and $h = 10$ give $40\\pi$, while $r = 3$ and $h = 5$ give $45\\pi$, and $\\frac{45}{40} = 1.125$ ✓\n\n**Common Mistakes:**\n* $0.75$: scales the radius linearly, computing $1.5(0.5)$ and forgetting that the radius is squared.\n* $2.25$: squares the radius factor but ignores the halved length.\n* $1.5$: uses only the change in radius and drops the length change entirely.\n\n**Test Day Takeaway:** In $V = \\pi r^2 h$ a radius factor enters squared and a height factor enters once — multiply the factors instead of recomputing the whole volume.",
  skills: ["volume-prism"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "hard",
  band: 6,
  question: "The table gives the number of surface defects counted on each of $45$ rolled sheets. Twelve more sheets, each carrying $3$ defects, are then added to the batch. What is the mode of the defect counts for all $57$ sheets?",
  diagram: { type: "dataTable", params: { headers: ["Defects per sheet", "Number of sheets"], rows: [["0", "11"], ["1", "14"], ["2", "9"], ["3", "7"], ["4", "4"]] } },
  correctAnswer: "3",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**The correct answer is $3$.**\n\n**The Fast Way (~40s):** Adding twelve sheets to the row for $3$ defects raises that count from $7$ to $19$, past the $14$ sheets with $1$ defect, so $3$ is the most common value.\n\n**The Full Solution:**\nStep 1: Read the frequencies from the table: $11$ sheets with $0$ defects, $14$ with $1$, $9$ with $2$, $7$ with $3$, and $4$ with $4$, which is $45$ sheets in all.\nStep 2: The twelve new sheets each show $3$ defects, so only that row changes: $7 + 12 = 19$ sheets with $3$ defects, and the batch totals $45 + 12 = 57$ sheets.\nStep 3: Compare the updated frequencies $11$, $14$, $9$, $19$, and $4$. The largest is $19$, and the value it belongs to is $3$ defects. Check the total: $11 + 14 + 9 + 19 + 4 = 57$ ✓\n\n**Common Mistakes:**\n* $1$: reports the mode of the original $45$ sheets and never applies the addition.\n* $19$: reports the frequency itself instead of the defect count that occurs most often.\n* $2$: reports the median of the $57$ counts rather than the mode.\n\n**Test Day Takeaway:** The mode is the value in the left column, not the count in the right one — update the frequency table first, then read across to the value.",
  skills: ["find-mode"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A load cell reports a force of $6w - 5$ newtons for a specimen of width $w$ millimeters, and for one specimen it reports $31$ newtons. For that specimen, what is the value of $12w + 4$?",
  choices: [
    // distractor: treats 12w + 4 as (6w - 5) + 9 and adds 9 to the reported 31
    { id: "A", text: "$40$" },
    // distractor: doubles the reported 31 and adds 4, which evaluates 12w - 6 rather than 12w + 4
    { id: "B", text: "$66$" },
    // distractor: finds w = 6 correctly but reports 12w and drops the +4
    { id: "C", text: "$72$" },
    { id: "D", text: "$76$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Shifted Output**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $6w - 5 = 31$ gives $6w = 36$, so $12w = 72$ and $12w + 4 = 76$.\n\n**The Full Solution:**\nStep 1: Set the reported force equal to the expression: $6w - 5 = 31$.\nStep 2: Add $5$ to both sides to isolate the piece the target expression is built from: $6w = 36$. Doubling gives $12w = 72$.\nStep 3: Add the constant the question asks for: $12w + 4 = 72 + 4 = 76$. Check by solving for the width: $w = 6$, so $6(6) - 5 = 31$ newtons and $12(6) + 4 = 76$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($40$): assumes the target is the reported value plus $9$, as if $12w + 4$ were $(6w - 5) + 9$; that is only true when $6w = 9$.\n* Choice B ($66$): doubles $31$ and adds $4$, which doubles the $-5$ as well and evaluates $12w - 6$.\n* Choice C ($72$): finds $12w = 72$ and stops one step early.\n\n**Test Day Takeaway:** Build the requested expression out of the given one — double $6w$ before touching the constants, and finish with the constant the question actually names.",
  skills: ["solving-equations", "ratios"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "In a bridge frame, a truss member meets the horizontal at acute angle $A$ of a right triangle whose right angle is at $B$. Given that $\\sin A = 3k$ and $\\cos A = 4k$ for a positive constant $k$, what is the value of $k$?",
  correctAnswer: "0.2",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**The correct answer is $0.2$.**\n\n**The Fast Way (~45s):** Since $\\sin^2 A + \\cos^2 A = 1$, $9k^2 + 16k^2 = 25k^2 = 1$, so $k = \\frac{1}{5} = 0.2$.\n\n**The Full Solution:**\nStep 1: In a right triangle with the right angle at $B$, $\\sin A = \\frac{BC}{AC}$ and $\\cos A = \\frac{AB}{AC}$. Squaring and adding gives $\\frac{BC^2 + AB^2}{AC^2}$, which is $1$ by the Pythagorean theorem.\nStep 2: Substitute the given ratios: $(3k)^2 + (4k)^2 = 1$, so $9k^2 + 16k^2 = 25k^2 = 1$ and $k^2 = \\frac{1}{25}$.\nStep 3: Take the positive root, since $k > 0$: $k = \\frac{1}{5} = 0.2$. Check: $\\sin A = 0.6$ and $\\cos A = 0.8$, and $0.6^2 + 0.8^2 = 0.36 + 0.64 = 1$ ✓\n\n**Common Mistakes:**\n* $\\frac{1}{7}$: adds the ratios instead of their squares, solving $3k + 4k = 1$.\n* $0.04$: writes $9k + 16k = 1$, squaring the coefficients but not $k$.\n* $0.75$: reports $\\tan A = \\frac{3k}{4k} = \\frac{3}{4}$ instead of $k$.\n\n**Test Day Takeaway:** A sine and a cosine of the same acute angle are locked together by $\\sin^2 A + \\cos^2 A = 1$ — square both expressions and add before doing anything else.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Blending two alloys to hit a target mass and a target cost gives the equations $3x + ay = 12$ and $6x + 10y = 7$, where $x$ and $y$ are the kilograms of each alloy used and $a$ is a constant. For what value of $a$ can no blend satisfy both requirements?",
  choices: [
    // distractor: scales by the constant terms instead of the x-coefficients, computing 7(3/6) = 3.5
    { id: "A", text: "$3.5$" },
    { id: "B", text: "$5$" },
    // distractor: makes the y-coefficients match outright, a = 10, which only doubles one equation's x-term
    { id: "C", text: "$10$" },
    // distractor: inverts the ratio, computing 10(6/3) = 20
    { id: "D", text: "$20$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** No solution means the two equations describe parallel lines, so the coefficients must be proportional while the constants are not: $\\frac{3}{6} = \\frac{a}{10}$ gives $a = 5$.\n\n**The Full Solution:**\nStep 1: A system of two linear equations has no solution exactly when the lines have equal slopes but different intercepts, which happens when $\\frac{3}{6} = \\frac{a}{10} \\neq \\frac{12}{7}$.\nStep 2: Solve the coefficient proportion: $6a = 30$, so $a = 5$.\nStep 3: Confirm the constants break the pattern: $\\frac{12}{7} \\neq \\frac{1}{2}$, so the lines are parallel and distinct rather than identical. Check the slopes with $a = 5$: $3x + 5y = 12$ has slope $-\\frac{3}{5}$, and $6x + 10y = 7$ has slope $-\\frac{6}{10} = -\\frac{3}{5}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.5$): builds the proportion from the constants $12$ and $7$; with $a = 3.5$ the slopes are $-\\frac{6}{7}$ and $-\\frac{3}{5}$, so the blends do meet at one point.\n* Choice C ($10$): matches the two $y$-coefficients without matching the $x$-coefficients; $3x + 10y = 12$ has slope $-0.3$, not $-0.6$.\n* Choice D ($20$): flips the ratio to $\\frac{6}{3}$; with $a = 20$ the first slope is $-0.15$, so a unique blend still exists.\n\n**Test Day Takeaway:** No solution means proportional coefficients with a non-proportional constant — set up the coefficient ratio first, then verify the constants do not follow it.",
  skills: ["system-solution-types"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The prices $x$ and $y$, in dollars per meter, of two grades of copper wire satisfy $6x - 5y = 2$ and $5x - 6y = c$ for some constant $c$. The two prices together come to $15$ dollars per meter. What is the value of $c$?",
  correctAnswer: "-13",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**The correct answer is $-13$.**\n\n**The Fast Way (~50s):** Subtracting the second equation from the first gives $x + y = 2 - c$. Since $x + y = 15$, $c = 2 - 15 = -13$.\n\n**The Full Solution:**\nStep 1: Line up the equations and subtract: $(6x - 5y) - (5x - 6y) = 2 - c$, and the left side collapses to $x + y$.\nStep 2: The question supplies that combination directly: $x + y = 15$, so $15 = 2 - c$.\nStep 3: Solve: $c = 2 - 15 = -13$. Check by finding the prices: $y = 15 - x$ turns $6x - 5y = 2$ into $11x = 77$, so $x = 7$ and $y = 8$, and $5(7) - 6(8) = -13$ ✓\n\n**Common Mistakes:**\n* $13$: solves $2 - c = 15$ as though $c = 15 - 2$, losing the sign.\n* $17$: subtracts in the other order, getting $-x - y = c - 2$, then forgets to negate and writes $c - 2 = 15$.\n* $163$: adds the equations instead of subtracting, producing $11x - 11y = 2 + c$, and reads $x - y$ as the given $15$.\n\n**Test Day Takeaway:** When a system asks for $x + y$ rather than for $x$ and $y$ separately, add or subtract the equations whole — the combination usually falls out in one move.",
  skills: ["elimination-method"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A cover plate is punched as a rectangle with three of its corners at the plotted points $(-2, 4)$, $(0, 0)$, and $(6, 3)$ on a nesting grid spaced one centimeter apart. How many square centimeters does the finished plate occupy?",
  diagram: { type: "coordinatePoints", params: { points: [[-2, 4], [0, 0], [6, 3]], xMin: -4, xMax: 8, yMin: -2, yMax: 10 } },
  choices: [
    // distractor: finds the area of the triangle joining the three plotted corners, half of the rectangle: 15
    { id: "A", text: "$15$" },
    { id: "B", text: "$30$" },
    // distractor: squares the longer side, treating the plate as a square of side sqrt(45): 45
    { id: "C", text: "$45$" },
    // distractor: reads the bounding box that encloses all four corners, including the missing corner (4, 7): 8 units wide by 7 units tall gives 56
    { id: "D", text: "$56$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~55s):** The corner at $(0, 0)$ is the right angle, and its two sides run to $(6, 3)$ and $(-2, 4)$, with lengths $\\sqrt{45} = 3\\sqrt{5}$ and $\\sqrt{20} = 2\\sqrt{5}$. The area is $3\\sqrt{5} \\cdot 2\\sqrt{5} = 30$.\n\n**The Full Solution:**\nStep 1: Identify which plotted corner joins the two sides. From $(0, 0)$ the steps to the other corners are $6$ right and $3$ up, and $2$ left and $4$ up. These are perpendicular, since $\\frac{3}{6} = \\frac{1}{2}$ and $\\frac{4}{-2} = -2$ are negative reciprocals.\nStep 2: Find the side lengths with the distance formula: $\\sqrt{6^2 + 3^2} = \\sqrt{45}$ and $\\sqrt{(-2)^2 + 4^2} = \\sqrt{20}$.\nStep 3: Multiply length by width: $\\sqrt{45} \\cdot \\sqrt{20} = \\sqrt{900} = 30$ square centimeters. Check the missing corner: adding both steps to $(0, 0)$ lands on $(4, 7)$, and the four corners do form a rectangle ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): stops at the triangle formed by the three plotted corners, which is exactly half the plate.\n* Choice C ($45$): uses $\\sqrt{45}$ for both sides, treating a tilted rectangle as a square.\n* Choice D ($56$): reads the plate off the axes, using the upright box that encloses all four corners — $8$ units wide by $7$ units tall, since the missing corner is $(4, 7)$; that box is not the plate.\n\n**Test Day Takeaway:** A tilted rectangle on a grid still has perpendicular sides — check the slopes at the shared corner, then multiply the two distances instead of reading widths off the axes.",
  skills: ["triangle-area"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The cross-section of a parabolic trough is given by $f(x) = a(x - h)^2 + k$, with $a$, $h$, and $k$ constants. The trough meets its rim, where $f$ equals $0$, at $x = 2$ and at $x = 8$, and its lowest point lies $18$ centimeters below that rim. Which equation could define $f$?",
  choices: [
    { id: "A", text: "$f(x) = 2(x - 5)^2 - 18$" },
    // distractor: takes a = 1 without using a rim point: (2 - 5)^2 - 18 = -9, not 0
    { id: "B", text: "$f(x) = (x - 5)^2 - 18$" },
    // distractor: places the lowest point 18 above the rim, so the graph never reaches f = 0
    { id: "C", text: "$f(x) = 2(x - 5)^2 + 18$" },
    // distractor: reads the sign in (x - h) backwards, putting the vertex at x = -5
    { id: "D", text: "$f(x) = 2(x + 5)^2 - 18$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice A is correct.**\n\n**The Fast Way (~50s):** The vertex sits halfway between the rim points, so $h = \\frac{2 + 8}{2} = 5$ and $k = -18$. Then $f(2) = 0$ forces $9a = 18$, so $a = 2$.\n\n**The Full Solution:**\nStep 1: A parabola is symmetric about its vertex, and the two rim points are equally far from it, so $h = \\frac{2 + 8}{2} = 5$.\nStep 2: The lowest point is the vertex, $18$ centimeters below the rim where $f = 0$, so $k = -18$ and $f(x) = a(x - 5)^2 - 18$.\nStep 3: Use a rim point to pin down $a$: $f(2) = a(2 - 5)^2 - 18 = 9a - 18 = 0$, so $a = 2$. Check the other rim point: $f(8) = 2(3)^2 - 18 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($a = 1$): keeps the correct vertex but never uses a rim point; it gives $f(2) = -9$, so the trough would not reach its rim at $x = 2$.\n* Choice C ($+18$): reads \"$18$ below the rim\" as a positive $k$; that parabola has a minimum of $18$ and never equals $0$.\n* Choice D ($x + 5$): flips the sign inside the square, placing the vertex at $x = -5$, nowhere near the rim points.\n\n**Test Day Takeaway:** Two symmetric zeros hand you $h$, the depth hands you $k$, and one point solves for $a$ — build vertex form in that order instead of expanding.",
  skills: ["vertex-form", "function-evaluation"]
}
      ]
    }
  ]
};

export default practiceTest6;
