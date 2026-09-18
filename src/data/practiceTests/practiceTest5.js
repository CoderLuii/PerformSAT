// Practice Test 5 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// 2026-06 blueprint: M1 5E/9M/8H; M2 keeps its wavy flow
// E M M E M H H M H H M H E H H M H H H M H H (3E/7M/12H, band-7 ceiling).
// Figure density lifted toward the official ~20%: M1 carries 4 diagram items
// (Q4 triangle, Q10 scatterplot, Q15 two-way table, Q21 right triangle),
// M2 carries 4 (Q1 right triangle, Q12 two-way table, Q13 data table,
// Q17 scatterplot). Numeric MC choices sorted ascending (official convention).
// Scenario palette (fresh; disjoint from recreated tests 1-3 and from this
// test's previous edition): creamery, mountain weather stations, harbor
// ferry, soil-sampling lab, community theater / box office, streetlight
// maintenance, aquatic-center pools, plant nursery.

export const practiceTest5 = {
  id: "practice-test-5",
  title: "Practice Test 5",
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
  question: "A hardware supplier posted clearance prices for four items, as listed in the table. The clearance price of the brass hinge is $60\\%$ of that item's original price. What was the original price, in dollars, of the brass hinge?",
  diagram: { type: "dataTable", params: { headers: ["Item", "Clearance price (dollars)"], rows: [["Brass hinge", "27.00"], ["Copper elbow", "18.00"], ["Steel bracket", "32.50"], ["Nylon washer", "4.75"]] } },
  choices: [
    // distractor: takes 60% OF the clearance price (0.60 x 27 = 16.20) instead of treating 27 as the 60%
    { id: "A", text: "$16.20$" },
    // distractor: adds 60% of the clearance price to the clearance price (27 + 16.20 = 43.20)
    { id: "B", text: "$43.20$" },
    { id: "C", text: "$45.00$" },
    // distractor: divides by the complement 0.40 instead of 0.60 (27 / 0.40 = 67.50)
    { id: "D", text: "$67.50$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The clearance price is the part, not the whole. Divide: $27 \\div 0.60 = 45$.\n\n**The Full Solution:**\nStep 1: Let $p$ be the original price of the brass hinge. The table gives its clearance price as $27$ dollars, and the clearance price is $60\\%$ of the original price, so $0.60p = 27$.\nStep 2: Divide both sides by $0.60$: $p = \\frac{27}{0.60} = 45$.\nStep 3: Check by running the percent forward: $60\\%$ of $45$ is $0.60(45) = 27$, which matches the table entry.\n\n**Why the wrong answers are tempting:**\n* Choice A ($16.20$): takes $60\\%$ of the clearance price, $0.60(27) = 16.20$. That treats $27$ as the original price instead of as the reduced one, so the answer comes out smaller than the price you started with.\n* Choice B ($43.20$): adds $60\\%$ of $27$ back onto $27$, giving $27 + 16.20 = 43.20$. Adding a percent of the SMALLER number never undoes taking a percent of the LARGER one.\n* Choice D ($67.50$): divides by $0.40$ instead of $0.60$, giving $27 \\div 0.40 = 67.50$. The $40\\%$ is the part that was taken OFF; the $60\\%$ is the part that remains and is the one the $27$ represents.\n\n**Test Day Takeaway:** When a price is stated as a percent OF an unknown original, the given number is the product, so you divide by the percent. Multiplying is only correct when the whole is the number you already have.",
  skills: ["percent-word-problems", "percent-of-value"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A school district ordered $x$ hardcover copies and $y$ paperback copies of a novel, and the order satisfies both $4x + 9y = 140$ and $9x + 4y = 120$. Which equation must also be true?",
  choices: [
    // distractor: divides the summed equation by 26 instead of 13 (260/26 = 10), doubling the coefficient
    { id: "A", text: "$x + y = 10$" },
    { id: "B", text: "$x + y = 20$" },
    // distractor: divides the summed right side by 2, the number of equations (260/2 = 130)
    { id: "C", text: "$x + y = 130$" },
    // distractor: adds the two equations but never divides by 13, leaving 13x + 13y = 260
    { id: "D", text: "$x + y = 260$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Adding the two equations gives $13x + 13y = 260$. Divide by $13$: $x + y = 20$.\n\n**The Full Solution:**\nStep 1: Add the equations term by term. The $x$-terms give $4x + 9x = 13x$, the $y$-terms give $9y + 4y = 13y$, and the constants give $140 + 120 = 260$. So $13x + 13y = 260$.\nStep 2: Factor the left side as $13(x + y) = 260$, then divide both sides by $13$ to get $x + y = 20$.\nStep 3: Check with the actual solution. Solving the system gives $x = 8$ and $y = 12$: $4(8) + 9(12) = 32 + 108 = 140$ and $9(8) + 4(12) = 72 + 48 = 120$, and $8 + 12 = 20$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($x + y = 10$): divides $260$ by $26$ rather than $13$. Adding the coefficients $4$ and $9$ gives $13$, not $26$ — the $13$ appears once in front of $x$ and once in front of $y$, but it is factored out only once.\n* Choice C ($x + y = 130$): divides $260$ by $2$ because two equations were added. The number of equations is never the divisor; the common coefficient is.\n* Choice D ($x + y = 260$): stops at $13x + 13y = 260$ and drops the $13$ without dividing. The sum $x + y$ is thirteen times smaller than $260$.\n\n**Test Day Takeaway:** When a question asks for $x + y$ rather than for $x$ and $y$ separately, add or subtract the equations and look for a common factor. Solving the whole system first is legal but costs far more time.",
  skills: ["elimination-method"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A worksheet asks students to compare the expressions $4(3x + 7)$ and $12x + 28$. Which statement correctly describes the values of $x$ for which the two expressions are equal?",
  choices: [
    // distractor: distributes the 4 only to 3x, getting 12x + 7, which never equals 12x + 28
    { id: "A", text: "No value of $x$ makes the two expressions equal." },
    // distractor: adds 12x to both sides instead of subtracting, getting 24x + 28 = 28 and x = 0
    { id: "B", text: "Only $x = 0$ makes the two expressions equal." },
    // distractor: divides 28 by 4 to get 7 and reports that as the solution
    { id: "C", text: "Only $x = 7$ makes the two expressions equal." },
    { id: "D", text: "Every value of $x$ makes the two expressions equal." }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** Distributing gives $12x + 28$, the same expression on both sides, so every $x$ works.\n\n**The Full Solution:**\nStep 1: Distribute the $4$ across BOTH terms inside the parentheses: $4(3x + 7) = 4(3x) + 4(7) = 12x + 28$.\nStep 2: Compare coefficients. The $x$-coefficients match ($12 = 12$) and the constants match ($28 = 28$), so the two expressions are identical, not merely equal at one point.\nStep 3: Check with two different inputs. At $x = 0$: $4(0 + 7) = 28$ and $12(0) + 28 = 28$. At $x = 5$: $4(15 + 7) = 88$ and $12(5) + 28 = 88$. Both agree, as an identity requires.\n\n**Why the wrong answers are tempting:**\n* Choice A (no value): distributes the $4$ only to the $3x$, producing $12x + 7$. Then $12x + 7 = 12x + 28$ would give $7 = 28$, which is false for every $x$ — the right conclusion drawn from the wrong left side.\n* Choice B (only $x = 0$): moves $12x$ to the left by ADDING it, giving $24x + 28 = 28$ and therefore $x = 0$. The term must be subtracted from both sides, and when it is, the $x$-terms vanish entirely.\n* Choice C (only $x = 7$): pulls the $7$ out of the parentheses (or computes $28 \\div 4$) and reports it as a solution. The $7$ is a constant inside the expression, not a value of $x$.\n\n**Test Day Takeaway:** Distribute first, then compare the $x$-coefficient and the constant separately. Same coefficient and same constant means infinitely many solutions; same coefficient and different constant means none.",
  skills: ["distributive-property"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A right-triangular pennant hangs in a school gymnasium. Its legs measure $a\\sqrt{3}$ feet and $10\\sqrt{3}$ feet, where $a$ is a positive constant. Which expression represents the area of the pennant, in square feet?",
  choices: [
    // distractor: multiplies only the coefficients and drops both radical factors: (1/2)(a)(10) = 5a
    { id: "A", text: "$5a$" },
    { id: "B", text: "$15a$" },
    // distractor: computes the product of the legs, 30a, and omits the factor 1/2
    { id: "C", text: "$30a$" },
    // distractor: replaces each sqrt(3) with 3, giving (1/2)(3a)(30) = 45a
    { id: "D", text: "$45a$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $\\sqrt{3}\\cdot\\sqrt{3} = 3$, so the area is $\\frac{1}{2}(a)(10)(3) = 15a$.\n\n**The Full Solution:**\nStep 1: In a right triangle the two legs are the base and the height, so the area is $\\frac{1}{2}\\left(a\\sqrt{3}\\right)\\left(10\\sqrt{3}\\right)$.\nStep 2: Multiply the coefficients and the radicals separately: $a \\cdot 10 = 10a$ and $\\sqrt{3}\\cdot\\sqrt{3} = 3$. The product of the legs is therefore $30a$.\nStep 3: Apply the factor $\\frac{1}{2}$: $\\frac{1}{2}(30a) = 15a$. Check with $a = 2$: the legs are $2\\sqrt{3}$ and $10\\sqrt{3}$, the product is $20 \\cdot 3 = 60$, and half of that is $30$, which equals $15(2)$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($5a$): multiplies $\\frac{1}{2}$, $a$, and $10$ but throws the radicals away, as if $\\sqrt{3}\\cdot\\sqrt{3} = 1$. The radicals contribute a factor of $3$, so this answer is three times too small.\n* Choice C ($30a$): computes the product of the two legs correctly but forgets the $\\frac{1}{2}$. That is the area of the rectangle with those side lengths, which is twice the triangle.\n* Choice D ($45a$): replaces each $\\sqrt{3}$ with $3$, turning the legs into $3a$ and $30$ and giving $\\frac{1}{2}(3a)(30) = 45a$. Only the PRODUCT of the two radicals is $3$; neither radical equals $3$ on its own.\n\n**Test Day Takeaway:** With radical side lengths, multiply the rational parts and the radical parts separately. A pair of identical square roots collapses to the number inside — that is usually the whole trick.",
  skills: ["triangle-area"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A maintenance walkway crosses a row of solar panels at a right angle. In the $xy$-plane the panel row lies along $y = \\frac{3}{4}x - 2$, and the walkway contains the point $(6, -1)$. Which of the following is an equation of the walkway?",
  choices: [
    { id: "A", text: "$y = -\\frac{4}{3}x + 7$" },
    // distractor: negates the slope but does not take the reciprocal, using -3/4 through (6, -1)
    { id: "B", text: "$y = -\\frac{3}{4}x + \\frac{7}{2}$" },
    // distractor: reuses the panel row's slope 3/4, which gives a parallel walkway, not a perpendicular one
    { id: "C", text: "$y = \\frac{3}{4}x - \\frac{11}{2}$" },
    // distractor: takes the reciprocal but does not negate, using 4/3 through (6, -1)
    { id: "D", text: "$y = \\frac{4}{3}x - 9$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Flip and negate $\\frac{3}{4}$ to get slope $-\\frac{4}{3}$; at $x = 6$ that slope must give $y = -1$, and only $y = -\\frac{4}{3}x + 7$ does.\n\n**The Full Solution:**\nStep 1: The panel row has slope $\\frac{3}{4}$. A line perpendicular to it has the negative reciprocal slope, $-\\frac{4}{3}$.\nStep 2: Use the point $(6, -1)$ to find the $y$-intercept: $-1 = -\\frac{4}{3}(6) + b$, so $-1 = -8 + b$ and $b = 7$.\nStep 3: The walkway is $y = -\\frac{4}{3}x + 7$. Check the point: $-\\frac{4}{3}(6) + 7 = -8 + 7 = -1$, and the product of the slopes is $\\frac{3}{4} \\cdot \\left(-\\frac{4}{3}\\right) = -1$, which confirms the right angle.\n\n**Why the wrong answers are tempting:**\n* Choice B ($y = -\\frac{3}{4}x + \\frac{7}{2}$): negates the slope without reciprocating it. Its slope product with the row is $\\frac{3}{4}\\cdot\\left(-\\frac{3}{4}\\right) = -\\frac{9}{16}$, not $-1$, so it is not perpendicular even though it does pass through $(6, -1)$.\n* Choice C ($y = \\frac{3}{4}x - \\frac{11}{2}$): keeps the row's own slope. This line runs PARALLEL to the panel row, so it never crosses it at all.\n* Choice D ($y = \\frac{4}{3}x - 9$): reciprocates without negating. Its slope product is $\\frac{3}{4}\\cdot\\frac{4}{3} = 1$, so the two lines meet at an angle, but not a right one.\n\n**Test Day Takeaway:** Perpendicular means BOTH operations: flip the fraction and change the sign. Then use the given point only to pin down the intercept — three of the four choices usually pass through the point too.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A spreadsheet stores two functions, $f$ and $g$, whose outputs at five inputs appear in the table. Applying $g$ to the input $2$ and then applying $f$ to that output produces what value?",
  questionTable: { headers: ["$x$", "$f(x)$", "$g(x)$"], rows: [["1", "8", "2"], ["2", "5", "4"], ["3", "9", "5"], ["4", "3", "1"], ["5", "6", "6"]] },
  choices: [
    { id: "A", text: "$3$" },
    // distractor: stops after evaluating the inner function, reporting g(2) = 4
    { id: "B", text: "$4$" },
    // distractor: evaluates the outer function at 2 instead of at g(2), reporting f(2) = 5
    { id: "C", text: "$5$" },
    // distractor: applies the functions in the reverse order, computing g(f(2)) = g(5) = 6
    { id: "D", text: "$6$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Read $g(2) = 4$ from the table, then read $f(4) = 3$.\n\n**The Full Solution:**\nStep 1: The inner function is applied first. In the row $x = 2$, the $g(x)$ column gives $g(2) = 4$.\nStep 2: That output, $4$, becomes the input of $f$. In the row $x = 4$, the $f(x)$ column gives $f(4) = 3$.\nStep 3: So the composed value is $f(g(2)) = f(4) = 3$. Check the order: the input $2$ is fed to $g$, not to $f$, and the table row that matters for the second step is $x = 4$, not $x = 2$.\n\n**Why the wrong answers are tempting:**\n* Choice B ($4$): stops one step early and reports $g(2) = 4$. That is the input to $f$, not the final output.\n* Choice C ($5$): reads $f(2) = 5$ from the $x = 2$ row. This evaluates the outer function at the ORIGINAL input rather than at the inner function's output.\n* Choice D ($6$): computes $g(f(2))$ instead: $f(2) = 5$, then $g(5) = 6$. Composition is not commutative — the function written on the inside is always the one that acts first.\n\n**Test Day Takeaway:** In $f(g(x))$, work from the inside out and change rows between steps. The most common table error is staying in the same row for both lookups.",
  skills: ["function-composition"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A community solar array produced $5{,}500$ megawatt-hours of electricity in 2025, which was $25\\%$ greater than the amount it produced in 2024. How many megawatt-hours did the array produce in 2024?",
  choices: [
    // distractor: computes 25% of 5,500 (0.25 x 5,500 = 1,375) instead of reversing the increase
    { id: "A", text: "$1{,}375$" },
    // distractor: subtracts 25% of the 2025 output: 5,500 - 1,375 = 4,125
    { id: "B", text: "$4{,}125$" },
    { id: "C", text: "$4{,}400$" },
    // distractor: increases 5,500 by 25% instead of undoing the increase: 1.25 x 5,500 = 6,875
    { id: "D", text: "$6{,}875$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Percent Increase**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The 2025 figure is $1.25$ times the 2024 figure, so $5{,}500 \\div 1.25 = 4{,}400$.\n\n**The Full Solution:**\nStep 1: Let $P$ be the 2024 output. A $25\\%$ increase multiplies $P$ by $1 + 0.25 = 1.25$, so $1.25P = 5{,}500$.\nStep 2: Divide both sides by $1.25$: $P = \\frac{5{,}500}{1.25} = 4{,}400$.\nStep 3: Check by increasing $4{,}400$ by $25\\%$: $25\\%$ of $4{,}400$ is $1{,}100$, and $4{,}400 + 1{,}100 = 5{,}500$, which matches the 2025 output.\n\n**Why the wrong answers are tempting:**\n* Choice A ($1{,}375$): computes $0.25(5{,}500) = 1{,}375$, the size of a $25\\%$ slice of the 2025 output. That is neither year's production.\n* Choice B ($4{,}125$): subtracts $25\\%$ of the LARGER number, $5{,}500 - 1{,}375 = 4{,}125$. Percent increases are computed from the original, so removing $25\\%$ of the new value overshoots the reduction.\n* Choice D ($6{,}875$): multiplies by $1.25$ instead of dividing, giving $6{,}875$. That is what 2026 would be if the array grew another $25\\%$, not what 2024 was.\n\n**Test Day Takeaway:** A percent increase runs forward by multiplying by $1 + r$; running it backward means dividing by $1 + r$. Subtracting the same percent from the new value is the classic trap and always lands short.",
  skills: ["percent-of-value", "percent-change"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A rooftop cistern holds $W(m) = 540 - 24m$ gallons of water $m$ minutes after a drain valve opens. After how many minutes does the cistern hold $156$ gallons?",
  correctAnswer: "16",
  explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~20s):** $540 - 156 = 384$ gallons have drained, and $384 \\div 24 = 16$ minutes.\n\n**The Full Solution:**\nStep 1: Set the output equal to the given value: $540 - 24m = 156$.\nStep 2: Subtract $540$ from both sides to get $-24m = -384$, then divide both sides by $-24$ to get $m = 16$.\nStep 3: Check by substituting back: $W(16) = 540 - 24(16) = 540 - 384 = 156$, which matches the given amount.\n\n**Common Mistakes:**\n* $29$: adds instead of subtracts, computing $\\frac{540 + 156}{24} = 29$. The $156$ gallons are what REMAIN, so they must come off the starting $540$, not be added to it.\n* $6.5$: divides the target value alone, $\\frac{156}{24} = 6.5$, ignoring the starting volume of $540$ entirely. That would answer a question about a cistern that starts empty.\n* $22.5$: computes $\\frac{540}{24} = 22.5$, which solves $W(m) = 0$. That is the minute the cistern runs dry, not the minute it holds $156$ gallons.\n\n**Test Day Takeaway:** \"For what input does the function equal $c$?\" means substitute $c$ for the OUTPUT and solve, never substitute it for the input. Finish by plugging your answer back into the rule — one substitution catches every sign slip.",
  skills: ["function-notation"]
},
{
  id: 9,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A garden center sells clay pots in two sizes. Buying $4$ small pots and $3$ large pots costs $\\$73$; buying $2$ small pots and $5$ large pots costs $\\$89$. How many dollars does one large pot cost?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**The correct answer is $15$.**\n\n**The Fast Way (~35s):** Double the second purchase to match the $4$ small pots: $4s + 10\\ell = 178$. Subtracting the first purchase leaves $7\\ell = 105$, so $\\ell = 15$.\n\n**The Full Solution:**\nStep 1: Let $s$ be the price of a small pot and $\\ell$ the price of a large pot. The two purchases give $4s + 3\\ell = 73$ and $2s + 5\\ell = 89$.\nStep 2: Multiply the second equation by $2$ so the $s$-terms match: $4s + 10\\ell = 178$. Subtract the first equation from this one: $(4s - 4s) + (10\\ell - 3\\ell) = 178 - 73$, or $7\\ell = 105$.\nStep 3: Divide by $7$ to get $\\ell = 15$. Check both purchases with $\\ell = 15$ and $s = 7$: $4(7) + 3(15) = 28 + 45 = 73$ and $2(7) + 5(15) = 14 + 75 = 89$.\n\n**Common Mistakes:**\n* $7$: solves the system correctly but reports the SMALL pot's price. The question names the large pot, so the variable you eliminate is $s$, not $\\ell$.\n* $8$: subtracts the two equations as given, without scaling, getting $2s - 2\\ell = -16$ and therefore $\\ell - s = 8$. That is the price DIFFERENCE, not a price.\n* $22$: adds the two prices, $7 + 15 = 22$, answering for one pot of each size.\n\n**Test Day Takeaway:** Scale one equation so a variable's coefficients match, subtract, and then read the question again before gridding. In two-price systems the answer is usually the variable you were about to eliminate.",
  skills: ["elimination-method", "setting-up-systems"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Of the $n$ students at a community college, $18\\%$ are enrolled in an evening section, and $40\\%$ of those evening students also take a laboratory course. Which expression represents the number of students who are enrolled in an evening section and take a laboratory course?",
  choices: [
    { id: "A", text: "$0.072n$" },
    // distractor: subtracts the percents (0.40 - 0.18 = 0.22) instead of multiplying them
    { id: "B", text: "$0.22n$" },
    // distractor: applies the 40% to all n students rather than to the 18% who are evening students
    { id: "C", text: "$0.40n$" },
    // distractor: adds the percents (0.18 + 0.40 = 0.58) instead of multiplying them
    { id: "D", text: "$0.58n$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** A percent of a percent multiplies: $0.40 \\times 0.18 = 0.072$, so the count is $0.072n$.\n\n**The Full Solution:**\nStep 1: The number of evening students is $18\\%$ of $n$, which is $0.18n$.\nStep 2: Of THOSE students, $40\\%$ take a laboratory course, so the count is $0.40(0.18n)$.\nStep 3: Multiply the decimals: $0.40 \\times 0.18 = 0.072$, giving $0.072n$. Check with $n = 1{,}000$: there are $180$ evening students, $40\\%$ of $180$ is $72$, and $0.072(1{,}000) = 72$.\n\n**Why the wrong answers are tempting:**\n* Choice B ($0.22n$): subtracts the two percents, $0.40 - 0.18 = 0.22$. Subtraction would answer a question about students in one group but not the other, and here neither percent is a part of the other on the same base.\n* Choice C ($0.40n$): applies $40\\%$ to the entire enrollment. The $40\\%$ is measured within the evening group only, so its base is $0.18n$, not $n$.\n* Choice D ($0.58n$): adds the percents, $0.18 + 0.40 = 0.58$. Adding would count students in EITHER group; the question asks for students in both at once, which is always the smaller number.\n\n**Test Day Takeaway:** \"$q\\%$ of the students who...\" signals a second percent taken on a reduced base. Multiply the decimals; the answer must come out smaller than either percent alone.",
  skills: ["percent-of-value"]
},
{
  id: 11,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The figure shows a guy wire from a ground anchor at $A$ to the point $C$ on a utility pole that stands perpendicular to the ground at $B$. The wire is $58$ feet long, and $\\tan A = \\frac{20}{21}$. How many feet above the ground is point $C$?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [42, 0], [42, 40]], labels: ["A", "B", "C"], sideLabels: ["", "", "58 ft"], rightAngleVertex: 1 } },
  correctAnswer: "40",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**The correct answer is $40$.**\n\n**The Fast Way (~30s):** $\\tan A = \\frac{20}{21}$ makes this a $20$-$21$-$29$ triangle; the wire, $58$, is $2 \\times 29$, so the height is $2 \\times 20 = 40$.\n\n**The Full Solution:**\nStep 1: In right triangle $ABC$ with the right angle at $B$, $\\tan A = \\frac{BC}{AB} = \\frac{20}{21}$, so the legs are in the ratio $20 : 21$. Write $BC = 20k$ and $AB = 21k$.\nStep 2: Apply the Pythagorean theorem: $(20k)^2 + (21k)^2 = 58^2$, so $400k^2 + 441k^2 = 3{,}364$ and $841k^2 = 3{,}364$. Then $k^2 = 4$ and $k = 2$.\nStep 3: Point $C$ sits $BC = 20(2) = 40$ feet above the ground. Check: $AB = 21(2) = 42$, and $40^2 + 42^2 = 1{,}600 + 1{,}764 = 3{,}364 = 58^2$.\n\n**Common Mistakes:**\n* $42$: computes $21k = 42$, the ground distance $\\overline{AB}$ from the anchor to the base of the pole. That is the side ADJACENT to angle $A$; the tangent's numerator names the opposite side, which is the vertical one.\n* $20$: reads the tangent's numerator as a length and never scales. The ratio $\\frac{20}{21}$ fixes only the shape of the triangle; the $58$-foot wire fixes its size, and here it doubles every side.\n* About $55.2$: computes $58 \\cdot \\frac{20}{21} \\approx 55.2$ by applying the tangent ratio to the hypotenuse. Tangent relates the two LEGS; a hypotenuse calls for sine or cosine, or for the Pythagorean theorem.\n\n**Test Day Takeaway:** A tangent value plus one length is a scaled Pythagorean triple. Name the legs $20k$ and $21k$, solve for $k$ once, and every side falls out.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "On a campus map in the $xy$-plane, one service road contains the points $(-4, 1)$ and $(4, 13)$. A second service road, parallel to the first, contains the point $(-2, 7)$. Which equation could describe the second road?",
  choices: [
    // distractor: uses the perpendicular slope -2/3 instead of the parallel slope 3/2, through (-2, 7)
    { id: "A", text: "$2x + 3y = 17$" },
    { id: "B", text: "$3x - 2y = -20$" },
    // distractor: uses the correct slope but substitutes the point coordinates in reverse order, as (7, -2)
    { id: "C", text: "$3x - 2y = 25$" },
    // distractor: uses slope -3/2, a sign error on the parallel slope, through (-2, 7)
    { id: "D", text: "$3x + 2y = 8$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The first road's slope is $\\frac{13 - 1}{4 - (-4)} = \\frac{3}{2}$, so the parallel line is $3x - 2y = c$; substituting $(-2, 7)$ gives $c = -20$.\n\n**The Full Solution:**\nStep 1: Find the slope of the first road: $m = \\frac{13 - 1}{4 - (-4)} = \\frac{12}{8} = \\frac{3}{2}$. A parallel road has the same slope.\nStep 2: A line of slope $\\frac{3}{2}$ written in standard form is $3x - 2y = c$, because solving that for $y$ gives $y = \\frac{3}{2}x - \\frac{c}{2}$.\nStep 3: Substitute the point $(-2, 7)$: $3(-2) - 2(7) = -6 - 14 = -20$, so the equation is $3x - 2y = -20$. Check by solving for $y$: $y = \\frac{3}{2}x + 10$, and $\\frac{3}{2}(-2) + 10 = 7$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x + 3y = 17$): has slope $-\\frac{2}{3}$, the negative reciprocal. It does pass through $(-2, 7)$, but a perpendicular road would cross the first one rather than run alongside it.\n* Choice C ($3x - 2y = 25$): uses the right slope but plugs the coordinates in backward, evaluating $3(7) - 2(-2) = 25$. Order matters: the first coordinate is always $x$.\n* Choice D ($3x + 2y = 8$): has slope $-\\frac{3}{2}$. Flipping the sign of the slope tilts the road the other way; parallel requires the slope to be copied exactly, sign included.\n\n**Test Day Takeaway:** For a parallel line in standard form, keep the $x$- and $y$-coefficients of the target slope and let the point determine the constant. Substituting the given point is faster than converting to slope-intercept form and back.",
  skills: ["writing-parallel-equation"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A library's audiobook display holds $45$ mystery titles and $k$ biography titles and no other titles. If one of these titles is selected at random, the probability of selecting a biography is $\\frac{2}{5}$. What is the value of $k$?",
  correctAnswer: "30",
  explanation: "**SAT Pattern: Basic Probability**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~30s):** If biographies are $\\frac{2}{5}$ of the display, mysteries are $\\frac{3}{5}$, so $45$ corresponds to $\\frac{3}{5}$ of the total; the total is $75$ and $k = 30$.\n\n**The Full Solution:**\nStep 1: The display holds $45 + k$ titles in all, so the probability of drawing a biography is $\\frac{k}{45 + k} = \\frac{2}{5}$.\nStep 2: Cross-multiply: $5k = 2(45 + k)$, so $5k = 90 + 2k$ and $3k = 90$.\nStep 3: Divide by $3$ to get $k = 30$. Check: the display holds $45 + 30 = 75$ titles, and $\\frac{30}{75} = \\frac{2}{5}$.\n\n**Common Mistakes:**\n* $18$: computes $\\frac{2}{5}$ of $45$. The denominator of a probability is the TOTAL number of titles, not the number of mysteries, so $45$ is the wrong base for that fraction.\n* $27$: computes $\\frac{3}{5}$ of $45$, applying the complement to the mystery count. Again the base is wrong, and $\\frac{3}{5}$ describes the mysteries themselves, not the biographies.\n* $75$: solves correctly for the total number of titles and grids that instead of $k$. The question asks only for the biography count.\n\n**Test Day Takeaway:** When a probability is given and one category's count is unknown, write the part over the whole with the unknown appearing in BOTH the numerator and the denominator, then cross-multiply. Only the total is safe to write as a sum.",
  skills: ["probability-basics"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A parabola given by $y = 2x^2 + 50$ and a line given by $y = -bx$ meet at two different points in the $xy$-plane. If $b$ is a positive integer, what is its smallest possible value?",
  choices: [
    // distractor: drops the factor 4, using b^2 - (2)(50) > 0, so b > 10 and the least integer is 11
    { id: "A", text: "$11$" },
    // distractor: drops the leading coefficient a = 2, using b^2 - 4(50) > 0, so b > 14.14 and the least integer is 15
    { id: "B", text: "$15$" },
    // distractor: allows the discriminant to equal 0, which gives one point of tangency, not two intersections
    { id: "C", text: "$20$" },
    { id: "D", text: "$21$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Setting the two expressions equal gives $2x^2 + bx + 50 = 0$, so $b^2 > 4(2)(50) = 400$ and $b > 20$; the least integer is $21$.\n\n**The Full Solution:**\nStep 1: The graphs meet where $2x^2 + 50 = -bx$. Rearranged, that is $2x^2 + bx + 50 = 0$, a quadratic in $x$ whose real solutions are the $x$-coordinates of the intersection points.\nStep 2: Two DIFFERENT intersection points means two distinct real solutions, which requires a strictly positive discriminant: $b^2 - 4(2)(50) > 0$, or $b^2 > 400$.\nStep 3: Since $b$ is positive, $b > 20$, so the smallest integer value is $b = 21$. Check: at $b = 21$ the discriminant is $441 - 400 = 41 > 0$, while at $b = 20$ it is $400 - 400 = 0$, a single point of tangency.\n\n**Why the wrong answers are tempting:**\n* Choice A ($11$): drops the factor of $4$ and uses $b^2 - (2)(50) > 0$, giving $b > 10$. At $b = 11$ the true discriminant is $121 - 400 = -279$, so the graphs would not meet at all.\n* Choice B ($15$): drops the leading coefficient and uses $b^2 - 4(50) > 0$, giving $b > \\sqrt{200} \\approx 14.14$. At $b = 15$ the true discriminant is $225 - 400 = -175$, again negative.\n* Choice C ($20$): uses $b^2 - 400 \\ge 0$ instead of $> 0$. Equality makes the discriminant zero, which is exactly ONE shared point — the line is tangent to the parabola, not a secant.\n\n**Test Day Takeaway:** Two different points always means discriminant $> 0$, never $\\ge 0$, so an exact square root is the boundary you must step past. Set the two expressions equal first; the coefficients $a$, $b$, and $c$ all come from the combined equation.",
  skills: ["discriminant-analysis"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "During one week, a public library recorded the number of books borrowed on each of $180$ randomly chosen visits. The mean for those visits was $4.2$ books, and the estimate carries a margin of error of $0.35$ book. Which conclusion is best supported by these data?",
  choices: [
    { id: "A", text: "It is plausible that the mean number of books borrowed per visit for all visits to this library is between $3.85$ and $4.55$." },
    // distractor: applies the interval to the 180 sampled visits, whose mean is already known exactly to be 4.2
    { id: "B", text: "It is plausible that the mean number of books borrowed per visit for the $180$ visits in the sample is between $3.85$ and $4.55$." },
    // distractor: adds the margin of error on one side only, giving 4.2 to 4.55 instead of 3.85 to 4.55
    { id: "C", text: "It is plausible that the mean number of books borrowed per visit for all visits to this library is between $4.2$ and $4.55$." },
    // distractor: doubles the margin of error, giving 4.2 plus or minus 0.7, which is 3.5 to 4.9
    { id: "D", text: "It is plausible that the mean number of books borrowed per visit for all visits to this library is between $3.5$ and $4.9$." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Margin of Error**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The interval is $4.2 \\pm 0.35$, or $3.85$ to $4.55$, and it estimates the mean for ALL visits, not for the sampled ones.\n\n**The Full Solution:**\nStep 1: A margin of error is applied on both sides of the sample estimate, so the plausible interval runs from $4.2 - 0.35$ to $4.2 + 0.35$.\nStep 2: Compute the endpoints: $4.2 - 0.35 = 3.85$ and $4.2 + 0.35 = 4.55$.\nStep 3: Identify what the interval describes. The $180$ visits were chosen at random in order to learn about every visit to the library, so the interval is a plausible range for the POPULATION mean. Check: the mean of the sampled visits is stated as exactly $4.2$, so no interval is needed for it.\n\n**Why the wrong answers are tempting:**\n* Choice B (the $180$ sampled visits, $3.85$ to $4.55$): the arithmetic is right but the group is wrong. The mean for those $180$ visits was measured, not estimated, so it is known to be $4.2$ with no uncertainty at all.\n* Choice C ($4.2$ to $4.55$): adds the margin on the high side only. A margin of error is always two-sided, so leaving off $4.2 - 0.35$ discards half of the plausible values.\n* Choice D ($3.5$ to $4.9$): uses $4.2 \\pm 0.7$, doubling the given margin. Nothing in the problem calls for doubling; the reported $0.35$ is already the full one-sided distance.\n\n**Test Day Takeaway:** Build the interval as estimate $\\pm$ margin, then ask which group it describes. The sample statistic is a measured fact; the interval is always a claim about the larger population the sample was drawn from.",
  skills: ["margin-of-error"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The table gives three values of $t$ and their corresponding values of $p(t)$, where $p$ is a quadratic function that models the power drawn, in kilowatts, by a well pump $t$ minutes after it starts. What is the minimum power, in kilowatts, given by this model?",
  questionTable: { headers: ["$t$", "$p(t)$"], rows: [["3", "62"], ["5", "30"], ["13", "62"]] },
  correctAnswer: "12",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~50s):** $p(3) = p(13)$ puts the vertex at $t = 8$; writing $p(t) = a(t - 8)^2 + k$ and using the two remaining values gives $16a = 32$, so $a = 2$ and $k = 12$.\n\n**The Full Solution:**\nStep 1: The table shows $p(3) = p(13) = 62$. A quadratic takes equal values at inputs equally distant from its axis of symmetry, so the axis is at $t = \\frac{3 + 13}{2} = 8$ and the model is $p(t) = a(t - 8)^2 + k$.\nStep 2: Substitute the two distinct data points. From $t = 3$: $a(3 - 8)^2 + k = 25a + k = 62$. From $t = 5$: $a(5 - 8)^2 + k = 9a + k = 30$. Subtracting gives $16a = 32$, so $a = 2$.\nStep 3: Back-substitute: $9(2) + k = 30$, so $k = 12$. Because $a = 2 > 0$ the parabola opens upward and $k$ is the minimum value. Check the third point: $p(13) = 2(13 - 8)^2 + 12 = 2(25) + 12 = 62$.\n\n**Common Mistakes:**\n* $8$: grids the $t$-value of the vertex instead of the power there. The axis of symmetry answers when, while the question asks how much.\n* $30$: assumes the smallest number in the table is the minimum. The table lists only three instants; the model's low point sits at $t = 8$, which is not tabulated.\n* $2$: reports the leading coefficient $a$. That number controls how steeply the power rises away from the low point, not the low point itself.\n\n**Test Day Takeaway:** Two equal outputs hand you the axis of symmetry for free — average their inputs. From there, one more point turns vertex form into two quick equations for $a$ and $k$.",
  skills: ["vertex-form", "function-evaluation"]
},
{
  id: 17,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A utility's battery fleet stores $E(t) = A(2)^{t/k}$ megawatt-hours of energy $t$ months after installation, where $A$ and $k$ are positive constants. The fleet stored $640$ megawatt-hours $5$ months after installation and $5{,}120$ megawatt-hours $20$ months after installation. What is the value of $k$?",
  correctAnswer: "5",
  explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~45s):** Between the two readings the stored energy multiplies by $\\frac{5{,}120}{640} = 8 = 2^3$, and that takes $20 - 5 = 15$ months, so $\\frac{15}{k} = 3$ and $k = 5$.\n\n**The Full Solution:**\nStep 1: Substitute each reading into the model: $A(2)^{5/k} = 640$ and $A(2)^{20/k} = 5{,}120$.\nStep 2: Divide the second equation by the first. The unknown $A$ cancels and the exponents subtract, leaving $2^{\\frac{20 - 5}{k}} = \\frac{5{,}120}{640}$, or $2^{15/k} = 8$.\nStep 3: Write $8$ as $2^3$. With equal bases the exponents must match, so $\\frac{15}{k} = 3$ and $k = 5$. Check: $A = \\frac{640}{2^{5/5}} = 320$, and $320(2)^{20/5} = 320(16) = 5{,}120$.\n\n**Common Mistakes:**\n* $\\frac{20}{3}$: uses the later reading alone, solving $\\frac{20}{k} = 3$. That treats $640$ as the amount at installation, but the first reading comes $5$ months in, so only the $15$ months BETWEEN the readings account for the three doublings.\n* $3$: grids the exponent $\\frac{15}{k}$ rather than $k$. The $3$ is the number of doublings that occurred; the question asks how many months one doubling takes.\n* $8$: grids the growth factor $\\frac{5{,}120}{640} = 8$. That is how many times the stored energy multiplied, not a length of time.\n\n**Test Day Takeaway:** When two readings share an unknown coefficient, divide one equation by the other — the coefficient cancels and the exponents subtract. Then rewrite both sides with the same base and match the exponents.",
  skills: ["exponential-growth-decay"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The price of a discontinued espresso grinder falls by $12\\%$ each year, and the price was $\\$1{,}450$ when the markdown schedule began. A retailer models the price after $m$ months as $V(m) = 1{,}450b^{m}$, where $b$ is a constant. Which expression is equal to $b$?",
  choices: [
    // distractor: uses the percent removed, 0.12, as the yearly factor instead of the retained fraction 0.88
    { id: "A", text: "$(0.12)^{\\frac{1}{12}}$" },
    // distractor: raises the yearly factor to the 12th power, which is the factor for 12 years, not one month
    { id: "B", text: "$(0.88)^{12}$" },
    { id: "C", text: "$(0.88)^{\\frac{1}{12}}$" },
    // distractor: treats a 12% decrease as a 12% increase, using 1.12 in place of 0.88
    { id: "D", text: "$(1.12)^{\\frac{1}{12}}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** One year is $12$ months and multiplies the price by $0.88$, so $b^{12} = 0.88$ and $b = (0.88)^{\\frac{1}{12}}$.\n\n**The Full Solution:**\nStep 1: A $12\\%$ decrease leaves $100\\% - 12\\% = 88\\%$ of the price, so each year multiplies the price by $0.88$.\nStep 2: In the model, $m$ counts MONTHS, so one year corresponds to $m = 12$ and the yearly factor is $b^{12}$. Setting the two descriptions of one year equal gives $b^{12} = 0.88$.\nStep 3: Take the twelfth root of both sides: $b = (0.88)^{\\frac{1}{12}}$. Check the size: $b \\approx 0.9894$, a small monthly drop, and $(0.9894)^{12} \\approx 0.88$ as required.\n\n**Why the wrong answers are tempting:**\n* Choice A ($(0.12)^{\\frac{1}{12}}$): uses the percent that is REMOVED as the multiplier. A factor of $0.12$ per year would erase $88\\%$ of the price each year, not $12\\%$.\n* Choice B ($(0.88)^{12}$): raises the yearly factor to the twelfth power. That value, about $0.22$, is the factor after twelve YEARS; a single month must shrink the price far less than a single year does.\n* Choice D ($(1.12)^{\\frac{1}{12}}$): reads falls by $12\\%$ as growth and uses $1.12$. Any base greater than $1$ makes the modeled price rise over time, contradicting a markdown.\n\n**Test Day Takeaway:** Convert the stated rate into a multiplier ($1 - r$ for a decrease), then match the time unit of the exponent. When the model counts months and the rate is annual, the base is the twelfth root of the annual factor.",
  skills: ["exponential-growth-decay"]
},
{
  id: 19,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "In the $xy$-plane, a buried water main runs along the line $4x + 6y = 51$. A service branch leaves the main at a right angle and rises $12$ units for every $c$ units it runs. What is the value of $c$?",
  correctAnswer: "8",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~40s):** The main has slope $-\\frac{2}{3}$, so the branch has slope $\\frac{3}{2}$; setting $\\frac{12}{c} = \\frac{3}{2}$ gives $c = 8$.\n\n**The Full Solution:**\nStep 1: Put the main in slope-intercept form. From $4x + 6y = 51$, $6y = -4x + 51$, so $y = -\\frac{2}{3}x + \\frac{51}{6}$ and the slope is $-\\frac{2}{3}$.\nStep 2: A line meeting it at a right angle has the negative reciprocal slope, $\\frac{3}{2}$.\nStep 3: Rising $12$ units for every $c$ units of run means the branch's slope is $\\frac{12}{c}$. Set $\\frac{12}{c} = \\frac{3}{2}$, cross-multiply to get $3c = 24$, and divide to get $c = 8$. Check: $\\frac{12}{8} = \\frac{3}{2}$, and $-\\frac{2}{3} \\cdot \\frac{3}{2} = -1$.\n\n**Common Mistakes:**\n* $18$: uses the main's own slope size, solving $\\frac{12}{c} = \\frac{2}{3}$. That gives a branch PARALLEL to the main rather than perpendicular to it.\n* $-8$: keeps the negative sign and uses slope $-\\frac{3}{2}$, solving $\\frac{12}{c} = -\\frac{3}{2}$. Only one sign flip is needed, and it was already applied when the reciprocal was negated.\n* $1.5$: grids the perpendicular slope $\\frac{3}{2}$ itself. The slope is the ratio $\\frac{12}{c}$, not the run $c$ the question asks for.\n\n**Test Day Takeaway:** Convert standard form to a slope before doing anything else, then remember that rising $p$ for every $q$ of run IS a slope of $\\frac{p}{q}$. Setting two slope expressions equal turns the geometry into one linear equation.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A student rewrites $r(x) = \\frac{x^2 + 2x - 15}{x + 5}$ in a simpler form and uses that form to solve $r(x) = -8$. Which of the following correctly describes the real solutions of the equation?",
  choices: [
    // distractor: sign slip when isolating x in x - 3 = -8, computing -8 - 3 = -11 instead of -8 + 3 = -5
    { id: "A", text: "The only real solution is $x = -11$." },
    { id: "B", text: "The equation has no real solution." },
    // distractor: solves the simplified linear equation but never checks that x = -5 makes the denominator zero
    { id: "C", text: "The only real solution is $x = -5$." },
    // distractor: sets the numerator equal to zero, giving the roots -5 and 3, and ignores the right side
    { id: "D", text: "The real solutions are $x = -5$ and $x = 3$." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** For $x \\ne -5$ the rule simplifies to $r(x) = x - 3$, so $x - 3 = -8$ gives $x = -5$ — exactly the value the denominator forbids.\n\n**The Full Solution:**\nStep 1: Factor the numerator: $x^2 + 2x - 15 = (x + 5)(x - 3)$, so $r(x) = \\frac{(x + 5)(x - 3)}{x + 5}$ and the equation is $\\frac{(x + 5)(x - 3)}{x + 5} = -8$.\nStep 2: The denominator is zero when $x = -5$, so $x = -5$ is excluded from the domain before any solving happens. For every other $x$, the common factor divides out and the equation reduces to $x - 3 = -8$.\nStep 3: Solving gives $x = -5$, which is the one value already ruled out. No number satisfies $r(x) = -8$, so the equation has no real solution. Check directly: substituting $x = -5$ makes $r(-5)$ read $\\frac{0}{0}$, which is undefined.\n\n**Why the wrong answers are tempting:**\n* Choice A ($x = -11$): solves $x - 3 = -8$ by subtracting $3$ instead of adding it. The $-3$ moves across the equals sign as $+3$, giving $-8 + 3 = -5$.\n* Choice C ($x = -5$): does the algebra correctly but skips the domain check. Dividing out $x + 5$ is legal only when $x + 5 \\ne 0$, so any candidate equal to $-5$ must be discarded.\n* Choice D ($x = -5$ and $x = 3$): sets the NUMERATOR equal to zero and lists its roots. That would answer where the left side equals $0$, not where it equals $-8$.\n\n**Test Day Takeaway:** Note the excluded values before you simplify a rational equation, then compare them with whatever you solve for. When the only candidate is an excluded value, the equation has no solution at all.",
  skills: ["rational-expressions"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The figure shows a triangular display stand in a bookstore, with the measure of each interior angle written in terms of the constant $x$. The three measures are given in degrees. By how many degrees does the largest of the three measures exceed the smallest?",
  diagram: { type: "triangleWithAngles", params: { angleLabels: ["(3x + 10)°", "(2x - 5)°", "(x + 55)°"], note: "Note: Figure not drawn to scale." } },
  choices: [
    // distractor: subtracts the two largest angles, 75 - 70 = 5, instead of the largest and the smallest
    { id: "A", text: "$5$" },
    // distractor: reports the value of x rather than a difference of angle measures
    { id: "B", text: "$20$" },
    // distractor: reports the smallest angle measure, 35 degrees, without subtracting
    { id: "C", text: "$35$" },
    { id: "D", text: "$40$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** The three measures sum to $180$, so $6x + 60 = 180$ and $x = 20$; the angles are $70$, $35$, and $75$, and $75 - 35 = 40$.\n\n**The Full Solution:**\nStep 1: The interior angles of a triangle sum to $180^\\circ$: $(3x + 10) + (2x - 5) + (x + 55) = 180$.\nStep 2: Combine like terms: $6x + 60 = 180$, so $6x = 120$ and $x = 20$.\nStep 3: Evaluate each expression: $3(20) + 10 = 70$, $2(20) - 5 = 35$, and $20 + 55 = 75$. The largest measure is $75^\\circ$ and the smallest is $35^\\circ$, so the difference is $75 - 35 = 40$. Check the sum: $70 + 35 + 75 = 180$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): subtracts $70$ from $75$, the two LARGEST angles. The expression with the biggest coefficient, $3x + 10$, looks like it should be the largest angle, but at $x = 20$ it is only the middle one.\n* Choice B ($20$): stops at $x = 20$. Solving for $x$ is the first step, not the answer; $x$ is not itself an angle measure here.\n* Choice C ($35$): reports the smallest angle instead of the difference. The question asks by HOW MANY degrees one exceeds the other, which requires the subtraction.\n\n**Test Day Takeaway:** Solve for the variable, then evaluate every expression before deciding which angle is largest — the biggest coefficient does not decide it. Re-read the final question so you subtract the right pair.",
  skills: ["triangle-angle-sum"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A lecture hall whiteboard is a rectangle with side lengths $m - 4$ feet and $m + 4$ feet, where $m > 4$. A strip of trim joins two opposite corners of the board. Which expression represents the length of the trim, in feet?",
  choices: [
    // distractor: squares each binomial term by term as m^2 - 16 and m^2 + 16, so the constants cancel and only 2m^2 is left
    { id: "A", text: "$\\sqrt{2m^2}$" },
    // distractor: squares only one of the 4s, using 16 instead of 16 + 16 = 32
    { id: "B", text: "$\\sqrt{2m^2 + 16}$" },
    { id: "C", text: "$\\sqrt{2m^2 + 32}$" },
    // distractor: treats both middle terms as positive, giving +16m where -8m and +8m should cancel
    { id: "D", text: "$\\sqrt{2m^2 + 16m + 32}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** $(m - 4)^2 + (m + 4)^2 = 2m^2 + 32$, so the trim, which lies along a diagonal, is $\\sqrt{2m^2 + 32}$ feet long.\n\n**The Full Solution:**\nStep 1: A diagonal of a rectangle splits it into two right triangles whose legs are the rectangle's sides, so the diagonal $d$ satisfies $d^2 = (m - 4)^2 + (m + 4)^2$.\nStep 2: Expand each square: $(m - 4)^2 = m^2 - 8m + 16$ and $(m + 4)^2 = m^2 + 8m + 16$. Adding them, the $-8m$ and $+8m$ cancel and the constants add: $d^2 = 2m^2 + 32$.\nStep 3: Take the positive square root: $d = \\sqrt{2m^2 + 32}$. Check with $m = 5$: the sides are $1$ and $9$, so $d = \\sqrt{1 + 81} = \\sqrt{82}$, and $\\sqrt{2(25) + 32} = \\sqrt{82}$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\sqrt{2m^2}$): squares each binomial term by term, treating $(m - 4)^2$ as $m^2 - 16$ and $(m + 4)^2$ as $m^2 + 16$. Those constants then cancel instead of adding to $32$; at $m = 5$ this gives $\\sqrt{50}$, not $\\sqrt{82}$.\n* Choice B ($\\sqrt{2m^2 + 16}$): counts the constant $16$ once. Each binomial contributes its own square of $4$, so the constants total $32$; at $m = 5$ this gives $\\sqrt{66}$, not $\\sqrt{82}$.\n* Choice D ($\\sqrt{2m^2 + 16m + 32}$): adds the two middle terms as if both were positive. Squaring $m - 4$ produces $-8m$, which cancels the $+8m$ from $(m + 4)^2$ exactly.\n\n**Test Day Takeaway:** Expand both squares in full rather than guessing at the pattern. A conjugate pair such as $m - 4$ and $m + 4$ always kills its middle terms and doubles its constants.",
  skills: ["pythagorean-theorem"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 5 — Math Module 2 (22 questions)
// Wavy flow (frozen): E M M E M H H M H H M H E H H M H H H M H H
// Distribution: 3 E (Q1/Q4/Q13), 7 M (Q2/Q3/Q5/Q8/Q11/Q16/Q20), 12 H (rest), band-7 ceiling.
// Warm-ups Q1-5 are never trivial: Q1 scaled-triple right triangle (recognize
// 5x = hypotenuse, then answer the requested quantity — NOT the tests-1-3
// missing-leg/hypotenuse-radical trap family), Q4 rate with a
// minutes-to-hours conversion, Q2/Q3/Q5 each carry a named trap.
// Q13 breather = pure range read from a data table.
// Slot archetypes carried from the 2026-06 blueprint with fresh content:
// Q6 parametric dependent system, Q7 tangent-line discriminant, Q9 circle
// x-extent, Q10 quadratic-formula discriminant form, Q14 exponential period
// years-to-months, Q17 scatterplot best-fit scaling, Q21 survey scale-up
// margin, Q22 vertex/two-intercept a+b+c bound.
// Diagrams: Q1 right triangle, Q12 two-way table, Q13 data table, Q17 scatterplot.

{
  id: 1,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A bathymetric chart records two straight survey tracks that cross at a single point, as shown. Every label gives an angle measure in degrees, and $x$ and $y$ are constants. What is the value of $y$?",
  diagram: { type: "intersectingLines", params: { angles: ["(7x + 5)°", "y°", "(3x + 25)°", ""], lineLabels: ["m", "n"], figureNote: true } },
  choices: [
    // distractor: stops at x = 5 and reports the solution of the equation instead of the angle measure y
    { id: "A", text: "$5$" },
    // distractor: reports 40, the measure of the two labeled vertical angles, instead of the supplementary angle y
    { id: "B", text: "$40$" },
    // distractor: sets the two labeled angles supplementary (7x + 5 + 3x + 25 = 180), gets x = 15 and 110 degrees, then takes 180 - 110 = 70
    { id: "C", text: "$70$" },
    { id: "D", text: "$140$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The two labeled angles sit opposite each other, so $7x+5=3x+25$ gives $x=5$ and a $40^\\circ$ angle. The angle labeled $y^\\circ$ is its supplement: $180-40=140$.\n\n**The Full Solution:**\nStep 1: When two straight lines cross, the angles opposite each other are vertical angles and have equal measure. The angles measuring $(7x+5)^\\circ$ and $(3x+25)^\\circ$ are opposite, so $7x+5=3x+25$.\nStep 2: Subtracting $3x$ and $5$ from both sides gives $4x=20$, so $x=5$. Each of those two angles therefore measures $7(5)+5=40$ degrees.\nStep 3: The angle labeled $y^\\circ$ and the $40^\\circ$ angle together form a straight line along one of the two tracks, so they are supplementary: $y=180-40=140$. Check: the four angles are $40$, $140$, $40$, and $140$, and $40+140+40+140=360$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): stops at $x=5$. The equation was only the setup — $x$ is a parameter inside the angle expression, not an angle measure.\n* Choice B ($40$): finds the measure of the two labeled vertical angles correctly but reports it instead of $y$, which is the other pair.\n* Choice C ($70$): treats the labeled angles as supplementary rather than vertical, solving $7x+5+3x+25=180$ for $x=15$, then $180-110=70$.\n\n**Test Day Takeaway:** At a crossing of two straight lines there are only two distinct angle measures, and they add to $180$. Solve for $x$, build the angle the expression describes, then check which of the two measures the question actually names.",
  skills: ["angles"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The function $f$ gives the water temperature, in degrees Celsius, at a depth of $x$ meters below the surface at an ocean monitoring station. Which statement best interprets $f(250)=9$?",
  choices: [
    // distractor: swaps input and output, reading 250 as the temperature and 9 as the depth
    { id: "A", text: "The water temperature is $250$ degrees Celsius at a depth of $9$ meters." },
    { id: "B", text: "The water temperature is $9$ degrees Celsius at a depth of $250$ meters." },
    // distractor: reads the single output value as a rate of change instead of one temperature reading
    { id: "C", text: "The water temperature decreases by $9$ degrees Celsius for each $250$ meters of depth." },
    // distractor: reads one ordered pair as a statement about an entire interval of depths
    { id: "D", text: "The water temperature is $9$ degrees Celsius at every depth greater than $250$ meters." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Function Evaluation**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** The number inside the parentheses is the depth and the number after the equals sign is the temperature, so $250$ meters down the water is $9$ degrees Celsius.\n\n**The Full Solution:**\nStep 1: Identify the roles. It is given that $f$ takes a depth $x$, in meters, as its input and returns a water temperature, in degrees Celsius, as its output.\nStep 2: In $f(250)=9$, the input is $250$ and the output is $9$. So the depth is $250$ meters and the temperature there is $9$ degrees Celsius.\nStep 3: Match that to the choices. Choice B states exactly this pairing. Check: written as an ordered pair the statement is $(250,\\ 9)$ — depth first, temperature second — which is the order the definition of $f$ requires ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: swaps the input and the output, reporting a temperature of $250$ degrees at a depth of $9$ meters. Nothing in the definition allows the two numbers to trade places.\n* Choice C: turns the single output into a rate of change. One equation $f(250)=9$ reports one reading, not how fast temperature falls with depth.\n* Choice D: stretches one ordered pair into a claim about every depth past $250$ meters. A function value describes one input only.\n\n**Test Day Takeaway:** In an interpretation question, name the input and the output before reading the choices. The number in the parentheses always carries the input units, and the number across the equals sign always carries the output units.",
  skills: ["function-evaluation"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "An audio engineer models the total latency $L$, in milliseconds, of a signal chain containing $n$ effects units as $L=3n+12$, where $n$ is a whole number. Which expression gives $n$ in terms of $L$?",
  choices: [
    // distractor: adds 12 instead of subtracting it, undoing the +12 in the wrong direction
    { id: "A", text: "$\\dfrac{L+12}{3}$" },
    // distractor: reverses the order of subtraction, writing 12 - L instead of L - 12
    { id: "B", text: "$\\dfrac{12-L}{3}$" },
    { id: "C", text: "$\\dfrac{L-12}{3}$" },
    // distractor: swaps the roles of the coefficient 3 and the constant 12
    { id: "D", text: "$\\dfrac{L-3}{12}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Undo the operations on $n$ in reverse order: subtract $12$, then divide by $3$, giving $n=\\dfrac{L-12}{3}$.\n\n**The Full Solution:**\nStep 1: Start from $L=3n+12$. To isolate $n$, first remove the constant term by subtracting $12$ from both sides: $L-12=3n$.\nStep 2: The coefficient of $n$ is $3$, so divide both sides by $3$: $\\dfrac{L-12}{3}=n$.\nStep 3: Confirm the expression by testing a value. If $n=4$, the model gives $L=3(4)+12=24$; substituting $L=24$ into $\\dfrac{L-12}{3}$ gives $\\dfrac{24-12}{3}=4$, the original number of units ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{L+12}{3}$): adds $12$ rather than subtracting it. Testing $L=24$ gives $12$, not $4$.\n* Choice B ($\\frac{12-L}{3}$): reverses the subtraction. Testing $L=24$ gives $-4$, a negative number of effects units.\n* Choice D ($\\frac{L-3}{12}$): trades the coefficient and the constant. Testing $L=24$ gives $1.75$, not $4$.\n\n**Test Day Takeaway:** Solving a formula for a different variable is the same two moves as solving for a number: strip the constant first, then divide by the coefficient. Test one value at the end — a wrong rearrangement fails instantly.",
  skills: ["solving-equations"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A geologist measures the thickness, in centimeters, of the seven ash layers in a drill core as $14$, $9$, $22$, $9$, $31$, $18$, and $k$. Which expression gives the mean thickness, in centimeters, of the seven layers?",
  choices: [
    // distractor: counts the repeated 9 only once, summing the six known values as 94 instead of 103
    { id: "A", text: "$\\dfrac{k+94}{7}$" },
    // distractor: divides by 6, the number of known thicknesses, instead of by 7, the number of layers
    { id: "B", text: "$\\dfrac{k+103}{6}$" },
    // distractor: averages only the six known thicknesses and then adds k on afterward
    { id: "C", text: "$\\dfrac{103}{7}+k$" },
    { id: "D", text: "$\\dfrac{k+103}{7}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Mean from List**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The six known thicknesses total $103$, and there are $7$ layers in all, so the mean is $\\dfrac{k+103}{7}$.\n\n**The Full Solution:**\nStep 1: The mean of a data set is the sum of its values divided by how many values there are. Here the data set has $7$ values, one of which is the unknown $k$.\nStep 2: Add the six known thicknesses: $14+9+22+9+31+18$. Grouping, $14+22=36$, $9+9=18$, and $31+18=49$, so the sum is $36+18+49=103$. Including the last layer, the total is $k+103$.\nStep 3: Divide the total by $7$: the mean is $\\dfrac{k+103}{7}$. Check with a value: if $k=15$, the seven thicknesses total $118$ and the mean is $\\dfrac{118}{7}$, which is exactly what $\\dfrac{15+103}{7}$ gives ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{k+94}{7}$): counts the repeated $9$ only once, so the known sum comes out $94$ instead of $103$. A repeated value contributes every time it appears.\n* Choice B ($\\frac{k+103}{6}$): divides by the six thicknesses that were written as numbers, forgetting that $k$ is a seventh measurement.\n* Choice C ($\\frac{103}{7}+k$): averages the six known layers and then tacks $k$ on. That adds $k$ whole centimeters to the mean instead of $\\frac{k}{7}$.\n\n**Test Day Takeaway:** Build the mean as one fraction — every value in the numerator, the full count in the denominator — before simplifying anything. Unknown entries are counted like any other value.",
  skills: ["calculate-mean"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A zoning district contains $4{,}800$ parcels, of which $p$ percent are zoned residential and $150$ are zoned industrial. Which expression gives the number of parcels in the district that are zoned neither residential nor industrial?",
  choices: [
    // distractor: multiplies by p instead of p/100, so the percent is never converted to a decimal
    { id: "A", text: "$4{,}650-4{,}800p$" },
    { id: "B", text: "$4{,}650-48p$" },
    // distractor: treats p as a count of parcels rather than a percent of 4,800
    { id: "C", text: "$4{,}650-p$" },
    // distractor: subtracts the residential parcels but forgets to remove the 150 industrial parcels
    { id: "D", text: "$4{,}800-48p$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Percent Complement**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $p$ percent of $4{,}800$ is $48p$ parcels, so the parcels left over after removing those and the $150$ industrial parcels number $4{,}800-48p-150=4{,}650-48p$.\n\n**The Full Solution:**\nStep 1: Convert the percent to a count. Since $p$ percent means $\\dfrac{p}{100}$, the residential parcels number $\\dfrac{p}{100}(4{,}800)=48p$.\nStep 2: The three categories named are residential, industrial, and everything else, so subtract both named groups from the total: $4{,}800-48p-150$.\nStep 3: Combine the two constants: $4{,}800-150=4{,}650$, so the expression is $4{,}650-48p$. Check with $p=25$: a quarter of the parcels is $1{,}200$ residential, leaving $4{,}800-1{,}200-150=3{,}450$, and $4{,}650-48(25)=4{,}650-1{,}200=3{,}450$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4{,}650-4{,}800p$): skips the division by $100$. At $p=25$ it gives $4{,}650-120{,}000$, a large negative count.\n* Choice C ($4{,}650-p$): treats $p$ as a number of parcels instead of a percent. At $p=25$ it removes only $25$ parcels rather than $1{,}200$.\n* Choice D ($4{,}800-48p$): handles the percent correctly but never removes the $150$ industrial parcels, overcounting by exactly $150$.\n\n**Test Day Takeaway:** A percent of a fixed total collapses to a single coefficient — here $p$ percent of $4{,}800$ is just $48p$. Convert first, then subtract every named group the question excludes.",
  skills: ["percent-of-value"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A planning board's site plan uses $x$ townhouse lots and $y$ apartment lots. The table gives the land area and the parking spaces required for each lot type. The plan uses $7.8$ acres of land in total and requires $360$ parking spaces in total. How many more townhouse lots than apartment lots does the plan use?",
  questionTable: { headers: ["Lot type", "Land area per lot (acres)", "Parking spaces per lot"], rows: [["Townhouse", "$0.05$", "$2$"], ["Apartment", "$0.12$", "$6$"]] },
  choices: [
    { id: "A", text: "$20$" },
    // distractor: solves the system and reports y = 40, the number of apartment lots, instead of the difference
    { id: "B", text: "$40$" },
    // distractor: solves the system and reports x = 60, the number of townhouse lots, instead of the difference
    { id: "C", text: "$60$" },
    // distractor: adds the two counts, 60 + 40 = 100, instead of subtracting them
    { id: "D", text: "$100$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice A is correct.**\n\n**The Fast Way (~50s):** The parking row divides by $2$ to $x+3y=180$, so $x=180-3y$. Substituting into $0.05x+0.12y=7.8$ gives $y=40$, then $x=60$, and $60-40=20$.\n\n**The Full Solution:**\nStep 1: Turn each total into an equation using the table's per-lot values. Land: $0.05x+0.12y=7.8$. Parking: $2x+6y=360$.\nStep 2: The parking equation has a common factor of $2$, so $x+3y=180$, which solves cleanly for $x=180-3y$. Substitute into the land equation: $0.05(180-3y)+0.12y=7.8$, or $9-0.15y+0.12y=7.8$, so $-0.03y=-1.2$ and $y=40$.\nStep 3: Back-substitute: $x=180-3(40)=60$. The question asks how many more townhouse lots than apartment lots, so the answer is $60-40=20$. Check: $0.05(60)+0.12(40)=3+4.8=7.8$ acres and $2(60)+6(40)=120+240=360$ spaces ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($40$): reports $y=40$, the number of apartment lots. That is a solved variable, not the comparison the question asks for.\n* Choice C ($60$): reports $x=60$, the number of townhouse lots — the value most students reach last and stop on.\n* Choice D ($100$): adds the two counts, $60+40$, reading \"how many more\" as a request for the combined total.\n\n**Test Day Takeaway:** When a table supplies per-unit rates and the stem supplies totals, each total becomes one equation. Clear the easier equation of its common factor before substituting, and reread the final sentence — systems questions usually ask for a combination of $x$ and $y$, not for either one alone.",
  skills: ["substitution-method"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A loudspeaker crossover network has a response ratio equal to $\\dfrac{9x^{2}-64}{3x^{2}+20x+32}$, where $x$ is the ratio of the input frequency to the crossover frequency and $x>4$. Which of the following expressions has the same value as the response ratio for every such $x$?",
  choices: [
    // distractor: factors the denominator as (3x + 8)(x - 4), a sign slip that gives 3x^2 - 4x - 32 instead of 3x^2 + 20x + 32
    { id: "A", text: "$\\dfrac{3x-8}{x-4}$" },
    // distractor: cancels the wrong half of the difference of squares, keeping 3x + 8 in the numerator instead of 3x - 8
    { id: "B", text: "$\\dfrac{3x+8}{x+4}$" },
    { id: "C", text: "$\\dfrac{3x-8}{x+4}$" },
    // distractor: writes 9x^2 - 64 as (9x - 8)(9x + 8), forgetting that the square root of 9x^2 is 3x, not 9x
    { id: "D", text: "$\\dfrac{9x-8}{x+4}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The numerator is a difference of squares, $(3x-8)(3x+8)$, and the denominator factors as $(3x+8)(x+4)$. The shared $(3x+8)$ divides out, leaving $\\dfrac{3x-8}{x+4}$.\n\n**The Full Solution:**\nStep 1: Factor the numerator. Since $9x^{2}=(3x)^{2}$ and $64=8^{2}$, the difference of squares pattern $a^{2}-b^{2}=(a-b)(a+b)$ gives $9x^{2}-64=(3x-8)(3x+8)$.\nStep 2: Factor the denominator. Look for two binomials $(3x+m)(x+n)$ with $mn=32$ and $m+3n=20$. Taking $m=8$ and $n=4$ works: $(3x+8)(x+4)=3x^{2}+12x+8x+32=3x^{2}+20x+32$.\nStep 3: Cancel the common factor $(3x+8)$, which is nonzero because $x>4$. The result is $\\dfrac{3x-8}{x+4}$. Check at $x=5$: the original is $\\dfrac{225-64}{75+100+32}=\\dfrac{161}{207}$, and the simplified form is $\\dfrac{7}{9}$; since $\\dfrac{161}{207}=\\dfrac{7\\cdot 23}{9\\cdot 23}=\\dfrac{7}{9}$, they agree ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3x-8}{x-4}$): factors the denominator as $(3x+8)(x-4)$. Expanding that gives $3x^{2}-4x-32$, not the denominator in the problem.\n* Choice B ($\\frac{3x+8}{x+4}$): cancels the wrong half of the difference of squares. The factor shared with the denominator is $(3x+8)$, so $(3x+8)$ is what disappears, not what survives.\n* Choice D ($\\frac{9x-8}{x+4}$): writes $9x^{2}-64$ as $(9x-8)(9x+8)$. That product is $81x^{2}-64$; the square root of $9x^{2}$ is $3x$.\n\n**Test Day Takeaway:** Factor both parts completely before cancelling anything. When the numerator is a difference of squares, the factor that matches the denominator is the one that leaves — the other one is your answer's numerator.",
  skills: ["simplifying-rational-expressions", "difference-of-squares"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A geologist writes $10x+24y=46$ to relate $x$, the mass in kilograms of quartz, and $y$, the mass in kilograms of feldspar, in a rock standard. A second laboratory writes $15x+by=69$ for the same standard, where $b$ is a constant. If the two equations have exactly the same solutions, what is the value of $b$?",
  correctAnswer: "36",
  explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~30s):** The constants scale by $\\dfrac{69}{46}=\\dfrac{3}{2}$, and so does the $x$-coefficient ($10\\to 15$), so $b=\\dfrac{3}{2}(24)=36$.\n\n**The Full Solution:**\nStep 1: Two linear equations have exactly the same solutions when one is a constant multiple of the other. So there is a number $r$ with $15=10r$, $b=24r$, and $69=46r$.\nStep 2: Find $r$ from a pair that has no unknown. From $15=10r$, $r=\\dfrac{15}{10}=\\dfrac{3}{2}$. The constant terms confirm it: $\\dfrac{69}{46}=\\dfrac{3}{2}$ as well, so such an $r$ really does exist.\nStep 3: Apply $r$ to the $y$-coefficient: $b=24\\left(\\dfrac{3}{2}\\right)=36$. Check: $15x+36y=69$ divided through by $\\dfrac{3}{2}$ gives $10x+24y=46$, the first equation exactly ✓\n\n**Common Mistakes:**\n* $24$: assuming the two equations must have identical coefficients, so $b$ copies the first equation's $y$-coefficient. Identical solutions only require proportional equations, not identical ones.\n* $16$: applying the ratio upside down, computing $24\\left(\\dfrac{10}{15}\\right)=16$. The second equation is the larger one, so its coefficients are $\\dfrac{3}{2}$ times the first equation's, not $\\dfrac{2}{3}$ times.\n* $69$: scaling the first equation correctly to $15x+36y=69$ but reporting the constant term instead of the coefficient of $y$.\n\n**Test Day Takeaway:** \"Same solutions\" means one equation is a multiple of the other. Find the multiplier from the pair of matching coefficients that contains no unknown, verify it on a second pair, then apply it to the unknown.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Sound editors on a film leave $f(x)$ unmixed tracks after $x$ hours of work, and $f$ is linear. Two readings from their log are $f(3)=47$ and $f(11)=15$. Which of the following defines $f$?",
  choices: [
    // distractor: uses the change in output, -32, as the slope without dividing by the change in input, 8
    { id: "A", text: "$f(x)=-32x+143$" },
    { id: "B", text: "$f(x)=-4x+59$" },
    // distractor: finds the slope correctly but uses the output 47 as the y-intercept instead of solving for it
    { id: "C", text: "$f(x)=-4x+47$" },
    // distractor: drops the negative on the slope, computing (47 - 15)/(11 - 3) = 4 instead of (15 - 47)/(11 - 3) = -4
    { id: "D", text: "$f(x)=4x+35$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Line from Two Points**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The count drops $32$ tracks over $8$ hours, so the slope is $-4$. Backing up from $(3,47)$ three hours to $x=0$ adds $12$, giving an intercept of $59$.\n\n**The Full Solution:**\nStep 1: The two log readings are the points $(3,47)$ and $(11,15)$. The slope of a linear function through two points is the change in output over the change in input: $m=\\dfrac{15-47}{11-3}=\\dfrac{-32}{8}=-4$.\nStep 2: Write $f(x)=-4x+b$ and substitute one of the points to find $b$. Using $(3,47)$: $47=-4(3)+b$, so $47=-12+b$ and $b=59$.\nStep 3: The equation is $f(x)=-4x+59$. Check the other point: $f(11)=-4(11)+59=-44+59=15$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($f(x)=-32x+143$): uses the raw drop of $32$ tracks as the slope, skipping the division by the $8$-hour span. It predicts $f(11)=-209$ tracks.\n* Choice C ($f(x)=-4x+47$): gets the slope right but treats the output $47$ as the $y$-intercept. That value belongs to $x=3$, not $x=0$; this equation gives $f(3)=35$.\n* Choice D ($f(x)=4x+35$): subtracts the outputs in the wrong order, producing a positive slope. It has the count of unmixed tracks growing as the editors work.\n\n**Test Day Takeaway:** Slope is the change in output divided by the change in input — always divide, and keep the subtraction order the same top and bottom. Then substitute a given point to get the intercept, and verify with the point you did not use.",
  skills: ["linear-functions", "slope", "coordinate-geometry"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A tracer dye released into a coastal lagoon has concentration $C(t)=480(0.84)^{t}$ parts per million $t$ days after release, and the model predicts the concentration falls by the same percent $p$ during each seven-day week. What is the value of $p$, to the nearest whole number?",
  correctAnswer: "70",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**The correct answer is $70$.**\n\n**The Fast Way (~45s):** Seven days multiply the concentration by $(0.84)^{7}\\approx 0.295$, so about $29.5\\%$ remains and roughly $70\\%$ is gone.\n\n**The Full Solution:**\nStep 1: In $C(t)=480(0.84)^{t}$ the base $0.84$ is the factor applied for each single day. A week is $7$ days, so the factor for one week is $(0.84)^{7}$.\nStep 2: Evaluate the weekly factor: $(0.84)^{7}\\approx 0.2951$. That is the fraction of the dye still present after a week.\nStep 3: The percent that disappears is $100\\%$ minus the percent that remains: $100-29.51=70.49$, so $p\\approx 70$. Check with numbers: starting at $480$ parts per million, after $7$ days $C(7)=480(0.2951)\\approx 141.6$, and $\\dfrac{480-141.6}{480}\\approx 0.705$ ✓\n\n**Common Mistakes:**\n* $16$: reporting the daily decay rate, $1-0.84=0.16$, as though the exponent's time unit did not matter. That is the drop per day, not per week.\n* $112$: multiplying the daily $16\\%$ by $7$. Percent changes compound rather than add, and $112\\%$ would mean more dye vanished than was ever released.\n* $30$: computing the weekly factor $0.295$ correctly but reporting the percent that remains instead of the percent lost.\n\n**Test Day Takeaway:** The base of an exponential model is tied to whatever unit sits in the exponent. To change the time unit, raise the base to the number of old units in one new unit — then decide whether the question wants the part that stays or the part that goes.",
  skills: ["exponential-growth-decay"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Line $\\ell$ shown gives every combination of $x$ acres of parkland and $y$ acres of housing that exactly fills a planning district. A second requirement is $6x+ky=72$, where $k$ is a constant. If no combination meets both the line $\\ell$ requirement and the second requirement, what is the value of $k$?",
  diagram: { type: "linearGraph", params: { slope: -0.75, yIntercept: 12, xRange: [0, 16], yRange: [0, 16], xTickInterval: 4, yTickInterval: 4, gridInterval: 2, showPoints: [[0, 12], [8, 6]], label: "ℓ", xLabel: "Parkland (acres)", yLabel: "Housing (acres)" } },
  choices: [
    // distractor: makes the slopes opposites instead of equal, solving -6/k = 3/4 to get k = -8
    { id: "A", text: "$-8$" },
    // distractor: copies the y-coefficient 4 straight from 3x + 4y = 48, ignoring that the x-coefficient was doubled from 3 to 6
    { id: "B", text: "$4$" },
    // distractor: scales by the ratio of the constant terms, 72/48 = 1.5, giving 1.5 times 4 = 6 instead of using the x-coefficient ratio 2
    { id: "C", text: "$6$" },
    { id: "D", text: "$8$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** Line $\\ell$ is $3x+4y=48$. Doubling the $x$-coefficient from $3$ to $6$ forces the $y$-coefficient to double too, so $k=8$; the constants ($72$ versus $96$) then disagree, which is exactly what \"no combination\" requires.\n\n**The Full Solution:**\nStep 1: Read line $\\ell$ from the graph. It passes through $(0,12)$ and $(8,6)$, so its slope is $\\dfrac{6-12}{8-0}=-\\dfrac{3}{4}$ and its equation is $y=-\\dfrac{3}{4}x+12$, or $3x+4y=48$ in standard form.\nStep 2: Two linear requirements share no solution exactly when the lines are parallel and distinct — the coefficients of $x$ and $y$ are proportional but the constants break that proportion. Matching $6x+ky=72$ to $3x+4y=48$, the $x$-coefficients give the ratio $\\dfrac{6}{3}=2$, so $k=2(4)=8$.\nStep 3: Confirm the lines are distinct. Scaling $3x+4y=48$ by $2$ gives $6x+8y=96$, and $96\\neq 72$, so the two lines are parallel but not the same line. Check: $6x+8y=72$ simplifies to $3x+4y=36$, which is parallel to $3x+4y=48$ and never meets it ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): sets the slopes as opposites rather than equal. With $k=-8$ the second line has slope $\\dfrac{3}{4}$, and two lines with different slopes always cross.\n* Choice B ($4$): copies the $4$ from $3x+4y=48$ without scaling. With $k=4$ the second requirement is $3x+2y=36$, slope $-\\dfrac{3}{2}$, which crosses $\\ell$.\n* Choice C ($6$): uses the constants' ratio $\\dfrac{72}{48}=1.5$ to scale the $y$-coefficient. With $k=6$ the second line is $x+y=12$, slope $-1$, which crosses $\\ell$.\n\n**Test Day Takeaway:** Parallel and distinct is the whole test for no solution. Match the $x$-coefficients to find the scale factor, apply it to the $y$-coefficient, then confirm the constants do not follow the same scale — if they do, the answer would be infinitely many solutions instead.",
  skills: ["system-solution-types"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A record label's catalog held $n$ titles at the start of $2023$. The catalog grew by $35\\%$ during $2023$ and then shrank by $12\\%$ during $2024$, ending with $2{,}376$ titles. Which expression gives $n$?",
  choices: [
    // distractor: treats the 12 percent decrease as a 12 percent increase, using 1.12 in place of 0.88
    { id: "A", text: "$\\dfrac{2{,}376}{(1.35)(1.12)}$" },
    // distractor: adds the two percent changes as 35 - 12 = 23 percent instead of compounding the two factors
    { id: "B", text: "$\\dfrac{2{,}376}{1.23}$" },
    { id: "C", text: "$\\dfrac{2{,}376}{(1.35)(0.88)}$" },
    // distractor: swaps which year grew and which shrank, using 1 - 0.35 = 0.65 and 1 + 0.12 = 1.12
    { id: "D", text: "$\\dfrac{2{,}376}{(0.65)(1.12)}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Forward, $n(1.35)(0.88)=2{,}376$. Running that backward means dividing, so $n=\\dfrac{2{,}376}{(1.35)(0.88)}$.\n\n**The Full Solution:**\nStep 1: Turn each percent change into a multiplier. A $35\\%$ increase multiplies by $1+0.35=1.35$; a $12\\%$ decrease multiplies by $1-0.12=0.88$.\nStep 2: Apply them in order to the starting count. After $2023$ the catalog holds $1.35n$ titles, and after $2024$ it holds $(0.88)(1.35n)$ titles. Setting that equal to the ending count gives $(1.35)(0.88)n=2{,}376$.\nStep 3: Solve for $n$ by dividing both sides by the product of the multipliers: $n=\\dfrac{2{,}376}{(1.35)(0.88)}$. Check: $(1.35)(0.88)=1.188$ and $\\dfrac{2{,}376}{1.188}=2{,}000$, and running $2{,}000$ forward gives $2{,}000(1.35)=2{,}700$, then $2{,}700(0.88)=2{,}376$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: reads the $12\\%$ decrease as an increase. It returns about $1{,}571$, and running that value forward would overshoot $2{,}376$.\n* Choice B: adds the percent changes into a single $23\\%$ increase. Percent changes compound rather than add; this one returns about $1{,}932$.\n* Choice D: reverses the roles of the two years, using $0.65$ for the growth and $1.12$ for the decline. It returns about $3{,}264$, more titles than the label ever had.\n\n**Test Day Takeaway:** Convert every percent change to a multiplier, chain the multipliers in order, and remember that finding the ORIGINAL value means dividing by the chain — not multiplying by it, and never adding the percents.",
  skills: ["percent-of-value", "percent-word-problems"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Eleven mineral grains from one outcrop were tested for Mohs hardness, with results $3$, $5$, $4$, $5$, $6$, $4$, $5$, $7$, $4$, $5$, and $8$. Which statement about this set of results is true?",
  choices: [
    // distractor: miscounts the frequencies and calls 4 the mode; 4 appears three times but 5 appears four times
    { id: "A", text: "The mode is less than the median." },
    { id: "B", text: "The mode is equal to the median." },
    // distractor: leaves the largest reading, 8, out of the sum, producing a mean of 4.8 that the mode would exceed
    { id: "C", text: "The mode is greater than the mean." },
    // distractor: adds the eleven readings as 55 instead of 56, making the mean come out exactly 5
    { id: "D", text: "The mode is equal to the mean." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The value $5$ appears four times, more than any other, so the mode is $5$. Sorted, the sixth of eleven readings is also $5$, so mode and median match.\n\n**The Full Solution:**\nStep 1: Count how often each reading appears: $3$ once, $4$ three times, $5$ four times, and $6$, $7$, and $8$ once each. The mode is the most frequent value, so the mode is $5$.\nStep 2: Sort the readings: $3$, $4$, $4$, $4$, $5$, $5$, $5$, $5$, $6$, $7$, $8$. With $11$ values the median is the sixth one, which is $5$. So the mode equals the median.\nStep 3: Check the remaining comparisons before committing. The sum is $3+4+4+4+5+5+5+5+6+7+8=56$, so the mean is $\\dfrac{56}{11}\\approx 5.09$, which is greater than the mode, not less. Only the mode-median comparison in Choice B holds ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: counts $4$ as the most frequent value. It appears three times; $5$ appears four times, and the two extra $5$s are easy to miss in an unsorted list.\n* Choice C: comes from dropping the largest reading, $8$, when adding. That gives a mean of $\\dfrac{48}{10}=4.8$, below the mode of $5$.\n* Choice D: comes from an addition slip of $55$ instead of $56$, which would make the mean exactly $5$. The true mean, $\\dfrac{56}{11}$, is not an integer.\n\n**Test Day Takeaway:** Sort the list first — one pass then gives you the mode by counting runs and the median by position. Compare each offered statement against your own numbers rather than accepting the first plausible one.",
  skills: ["find-mode"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In an audio equalizer model, the curve $y=2x^{2}+bx+5$ and the line $y=3x+1$ meet at exactly one point in the $xy$-plane, where $b$ is a constant and $x$ is a frequency offset in kilohertz. Which equation must $b$ satisfy?",
  choices: [
    { id: "A", text: "$(b-3)^{2}=32$" },
    // distractor: uses a = 1 instead of a = 2 in 4ac, computing 4(1)(4) = 16 rather than 4(2)(4) = 32
    { id: "B", text: "$(b-3)^{2}=16$" },
    // distractor: sets the discriminant equal to 4ac minus (b - 3)^2, flipping the sign of the whole condition
    { id: "C", text: "$(b-3)^{2}=-32$" },
    // distractor: adds 3x to the left side instead of subtracting it, producing a linear coefficient of b + 3
    { id: "D", text: "$(b+3)^{2}=32$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** Setting the two expressions equal gives $2x^{2}+(b-3)x+4=0$. One intersection point means the discriminant is zero: $(b-3)^{2}-4(2)(4)=0$, so $(b-3)^{2}=32$.\n\n**The Full Solution:**\nStep 1: A point where the curve meets the line is a value of $x$ with $2x^{2}+bx+5=3x+1$. Collect everything on one side: $2x^{2}+bx-3x+5-1=0$, or $2x^{2}+(b-3)x+4=0$.\nStep 2: This quadratic has exactly one real solution precisely when its discriminant is zero. With $a=2$, the linear coefficient $b-3$, and $c=4$, the discriminant is $(b-3)^{2}-4(2)(4)=(b-3)^{2}-32$.\nStep 3: Set it equal to zero: $(b-3)^{2}=32$. Check one solution: $b=3+4\\sqrt{2}$ makes the quadratic $2x^{2}+4\\sqrt{2}\\,x+4=0$, whose discriminant is $32-32=0$, a single repeated root ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($(b-3)^{2}=16$): uses $a=1$ in $4ac$, computing $4(1)(4)=16$. The leading coefficient of the combined equation is $2$, not $1$.\n* Choice C ($(b-3)^{2}=-32$): moves the $4ac$ term the wrong way, which makes the equation impossible — a square is never negative.\n* Choice D ($(b+3)^{2}=32$): adds $3x$ instead of subtracting it when moving the line's terms across, so the linear coefficient comes out $b+3$.\n\n**Test Day Takeaway:** \"Meets at exactly one point\" is a discriminant-equals-zero instruction. Combine the two equations into one quadratic first, read $a$, $b$, and $c$ off that combined form, and set $b^{2}-4ac=0$.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "easy",
  band: 3,
  question: "In a noise-cancellation test, the sound level still audible, in decibels, at time $x$ milliseconds is modeled by $f(x)=(x-4)^{2}+3$. A second run repeats the same profile $6$ milliseconds later, giving $g(x)=f(x-6)$. At what value of $x$ does $g$ reach its minimum?",
  correctAnswer: "10",
  explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~20s):** $f$ bottoms out at $x=4$, and replacing $x$ with $x-6$ shifts the whole graph $6$ units right, so $g$ bottoms out at $4+6=10$.\n\n**The Full Solution:**\nStep 1: Read the vertex of $f$. In the form $(x-h)^{2}+k$, the minimum occurs at $x=h$, so $f$ is least at $x=4$, where $f(4)=3$.\nStep 2: Build $g$ explicitly: $g(x)=f(x-6)=\\big((x-6)-4\\big)^{2}+3=(x-10)^{2}+3$.\nStep 3: This is again vertex form, with $h=10$, so $g$ is least at $x=10$. Check: $g(10)=(10-10)^{2}+3=3$, the same minimum level as $f$, reached $6$ milliseconds later ✓\n\n**Common Mistakes:**\n* $-2$: subtracting the shift from the vertex, $4-6$, instead of adding it. The minus sign inside the parentheses moves the graph to the right, not the left.\n* $6$: reporting the size of the delay itself rather than the time at which the second run is least.\n* $4$: reporting where $f$ is least and forgetting that $g$ is the shifted profile.\n\n**Test Day Takeaway:** Replacing $x$ with $x-c$ shifts a graph $c$ units to the right — every feature, including the vertex, moves with it. When in doubt, substitute and rewrite in vertex form; the new $h$ is the answer.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Twelve daily wave heights, in decimeters, recorded at a buoy appear in the dot plot. A thirteenth reading of $4$ decimeters is then added. Which statement correctly describes how the mean and the median of the enlarged set differ from the original ones?",
  diagram: { type: "dotPlot", params: { data: [{ value: 18, count: 1 }, { value: 19, count: 2 }, { value: 20, count: 3 }, { value: 21, count: 2 }, { value: 22, count: 2 }, { value: 23, count: 1 }, { value: 24, count: 1 }], xMin: 16, xMax: 26, xLabel: "Wave height (decimeters)" } },
  choices: [
    { id: "A", text: "Both the mean and the median decrease, and the mean decreases by more." },
    // distractor: assumes the median is dragged as far as the mean by a distant value; the median falls only 0.5, the mean about 1.29
    { id: "B", text: "Both the mean and the median decrease, and the median decreases by more." },
    // distractor: assumes an added value outside the range can never move the median, missing that the middle position shifts from between the 6th and 7th values to the 7th
    { id: "C", text: "The mean decreases, and the median stays the same." },
    // distractor: reverses which measure resists an outlier, treating the median as the sensitive one and the mean as the stable one
    { id: "D", text: "The median decreases, and the mean stays the same." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Outlier Effect**\n\n**Choice A is correct.**\n\n**The Fast Way (~50s):** The new reading sits far below every other, so it pulls the mean down hard (from $20.75$ to about $19.46$) while the median slides only one position (from $20.5$ to $20$).\n\n**The Full Solution:**\nStep 1: Read the original $12$ readings off the dot plot: $18$, $19$, $19$, $20$, $20$, $20$, $21$, $21$, $22$, $22$, $23$, $24$. Their sum is $249$, so the mean is $\\dfrac{249}{12}=20.75$, and the median is the average of the sixth and seventh values, $\\dfrac{20+21}{2}=20.5$.\nStep 2: Add the reading of $4$. The new sum is $253$ over $13$ readings, so the new mean is $\\dfrac{253}{13}\\approx 19.46$ — a drop of about $1.29$.\nStep 3: With $13$ values the median is the seventh in order. Sorted, the list starts $4$, $18$, $19$, $19$, $20$, $20$, $20$, so the new median is $20$ — a drop of exactly $0.5$. Since $1.29>0.5$, both measures fall and the mean falls by more ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: assumes the far-away value drags the median as hard as it drags the mean. The median only counts positions, so it moved a single step, from $20.5$ to $20$.\n* Choice C: assumes an outlier below the whole data set cannot touch the median. Adding a thirteenth value changes the middle from a two-value average to a single value, which moved it.\n* Choice D: has the roles backwards. The mean uses every value's size, so it is the one an extreme reading distorts.\n\n**Test Day Takeaway:** An extreme value moves the mean by its full distance spread over the count, but moves the median only as far as the next value in line. When a question compares them, compute both — the ordering of the two drops is the whole question.",
  skills: ["calculate-mean", "find-median"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A studio logs the peak level, in decibels, of each of $30$ takes; the levels have mean $m$ and standard deviation $s$. A processing stage replaces each level $L$ with $\\dfrac{3}{4}L-6$. Which statement describes the mean and the standard deviation of the processed levels?",
  choices: [
    // distractor: applies the multiplier to the mean but never subtracts the 6, leaving the mean 6 decibels too high
    { id: "A", text: "The mean is $\\dfrac{3}{4}m$ and the standard deviation is $\\dfrac{3}{4}s$." },
    // distractor: assumes multiplying every value leaves the spread alone, so the standard deviation stays s instead of shrinking to three-fourths of s
    { id: "B", text: "The mean is $\\dfrac{3}{4}m-6$ and the standard deviation is $s$." },
    // distractor: subtracts the 6 from the standard deviation as well; a shift moves every value equally and leaves the spread unchanged
    { id: "C", text: "The mean is $\\dfrac{3}{4}m-6$ and the standard deviation is $\\dfrac{3}{4}s-6$." },
    { id: "D", text: "The mean is $\\dfrac{3}{4}m-6$ and the standard deviation is $\\dfrac{3}{4}s$." }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** Multiplying every value by $\\dfrac{3}{4}$ scales both the mean and the standard deviation by $\\dfrac{3}{4}$; subtracting $6$ then shifts the mean down by $6$ and leaves the spread alone.\n\n**The Full Solution:**\nStep 1: Handle the multiplication. Scaling every value by $\\dfrac{3}{4}$ scales the sum by $\\dfrac{3}{4}$, so the mean becomes $\\dfrac{3}{4}m$, and it scales every distance between values by $\\dfrac{3}{4}$, so the standard deviation becomes $\\dfrac{3}{4}s$.\nStep 2: Handle the subtraction. Subtracting $6$ from every value slides the whole data set down the number line: the mean drops by $6$ to $\\dfrac{3}{4}m-6$, while every gap between values is unchanged, so the standard deviation stays $\\dfrac{3}{4}s$.\nStep 3: Combine the two effects. The processed levels have mean $\\dfrac{3}{4}m-6$ and standard deviation $\\dfrac{3}{4}s$. Check on a tiny set: $\\{8,12\\}$ has mean $10$ and spread $2$ about the mean; processed it becomes $\\{0,3\\}$, with mean $1.5=\\dfrac{3}{4}(10)-6$ and spread $1.5=\\dfrac{3}{4}(2)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: scales both measures but forgets the $-6$ entirely, reporting a mean $6$ decibels too high.\n* Choice B: treats the standard deviation as untouched by the multiplication. Stretching or shrinking every value stretches or shrinks the spread by the same factor.\n* Choice C: subtracts $6$ from the standard deviation too. A shift moves every value the same distance, so no gap between values changes.\n\n**Test Day Takeaway:** Multiplying affects center and spread alike; adding or subtracting a constant moves only the center. Split any $aL+b$ transformation into those two moves and apply each rule separately.",
  skills: ["data-analysis"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A scaling law for river sediment discharge writes the quantity $\\dfrac{\\sqrt[3]{x^{8}}\\cdot\\sqrt{x}}{x^{2}}$ in the form $x^{k}$, where $x$ is a positive channel width in meters and $k$ is a constant. What is the value of $k$?",
  correctAnswer: "7/6",
  explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $\\dfrac{7}{6}$.**\n\n**The Fast Way (~40s):** Rewrite the radicals as exponents $\\dfrac{8}{3}$ and $\\dfrac{1}{2}$, then add and subtract: $\\dfrac{8}{3}+\\dfrac{1}{2}-2=\\dfrac{16+3-12}{6}=\\dfrac{7}{6}$.\n\n**The Full Solution:**\nStep 1: Convert each radical to a rational exponent. A cube root is a power of $\\dfrac{1}{3}$, so $\\sqrt[3]{x^{8}}=x^{8/3}$; a square root is a power of $\\dfrac{1}{2}$, so $\\sqrt{x}=x^{1/2}$.\nStep 2: Multiply in the numerator by adding exponents: $x^{8/3}\\cdot x^{1/2}=x^{8/3+1/2}=x^{19/6}$.\nStep 3: Divide by $x^{2}$ by subtracting exponents: $x^{19/6-2}=x^{19/6-12/6}=x^{7/6}$, so $k=\\dfrac{7}{6}$. Check at $x=64$: the original is $\\dfrac{(64^{8})^{1/3}\\cdot 8}{4096}=\\dfrac{2^{16}\\cdot 8}{4096}=128$, and $64^{7/6}=2^{7}=128$ ✓\n\n**Common Mistakes:**\n* $\\dfrac{19}{6}$: combining the two numerator factors correctly but never dividing by $x^{2}$, so the $-2$ is left out.\n* $\\dfrac{31}{6}$: adding the denominator's exponent instead of subtracting it, treating $\\dfrac{1}{x^{2}}$ as $x^{2}$.\n* $\\dfrac{8}{3}$: reading $\\sqrt{x}$ as $x^{2}$, which cancels the $x^{2}$ in the denominator and leaves only the cube root's exponent.\n\n**Test Day Takeaway:** Turn every radical into a rational exponent before doing anything else. Then multiplication adds exponents, division subtracts them, and the whole problem becomes one fraction sum over a common denominator.",
  skills: ["exponent-rules", "radical-expressions"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The volume, in cubic meters, of a sediment basin is modeled by $p(x)=3x^{3}+19x^{2}+22x-24$, where $x$ is a scaling length in meters. Given that $x+4$ is a factor of $p(x)$, which of the following is also a factor of $p(x)$?",
  choices: [
    { id: "A", text: "$3x-2$" },
    // distractor: flips the sign of the quotient's root, reading the factor of 3x^2 + 7x - 6 as 3x + 2 (root -2/3) instead of 3x - 2 (root 2/3)
    { id: "B", text: "$3x+2$" },
    // distractor: flips the sign of the other quotient factor; the quotient contains x + 3, whose root is -3, not +3
    { id: "C", text: "$x-3$" },
    // distractor: guesses a factor straight from the constant term by pairing -24 as (4)(-6), without performing the division
    { id: "D", text: "$x-6$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**Choice A is correct.**\n\n**The Fast Way (~55s):** Dividing $p(x)$ by $x+4$ leaves $3x^{2}+7x-6$, which factors as $(3x-2)(x+3)$. So $3x-2$ is a factor.\n\n**The Full Solution:**\nStep 1: Since $x+4$ is a factor, divide it out. Using synthetic division with the root $-4$ on the coefficients $3$, $19$, $22$, $-24$: bring down $3$; $19+3(-4)=7$; $22+7(-4)=-6$; $-24+(-6)(-4)=0$. The remainder is $0$, confirming the given factor, and the quotient is $3x^{2}+7x-6$.\nStep 2: Factor the quadratic quotient. Look for two numbers whose product is $3(-6)=-18$ and whose sum is $7$: those are $9$ and $-2$. Splitting the middle term, $3x^{2}+9x-2x-6=3x(x+3)-2(x+3)=(3x-2)(x+3)$.\nStep 3: So $p(x)=(x+4)(3x-2)(x+3)$, and the factor offered among the choices is $3x-2$. Check by expanding: $(3x-2)(x+3)=3x^{2}+7x-6$, and $(x+4)(3x^{2}+7x-6)=3x^{3}+19x^{2}+22x-24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($3x+2$): flips the sign inside the factor. Its root is $-\\dfrac{2}{3}$, and $p\\left(-\\dfrac{2}{3}\\right)=-\\dfrac{280}{9}\\neq 0$.\n* Choice C ($x-3$): flips the sign of the third factor. The quotient contains $x+3$, root $-3$, so $x-3$ is not a factor; $p(3)=294$.\n* Choice D ($x-6$): reads $-24$ as $(4)(-6)$ and guesses a matching factor. Constant-term pairs only suggest candidates; $p(6)=1{,}440$, so $x-6$ fails.\n\n**Test Day Takeaway:** A given factor is an invitation to divide. Synthetic division with that factor's root reduces the cubic to a quadratic in one pass, and factoring that quadratic hands you the remaining factors — the zero remainder is your check that the division was right.",
  skills: ["finding-roots-factoring"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In the equation $7(x-2c)+3x=6x+2c$, the constant $c$ is a transit planner's base block length in meters, and $x$ is the length of a redesigned block. Which expression gives the solution for $x$ in terms of $c$?",
  choices: [
    // distractor: carries -14c across the equal sign with the wrong sign, solving 10x + 14c = 6x + 2c to get 4x = -12c
    { id: "A", text: "$-3c$" },
    // distractor: distributes the 7 only to the x, using 7x - 2c instead of 7x - 14c, which leaves 4x = 4c
    { id: "B", text: "$c$" },
    { id: "C", text: "$4c$" },
    // distractor: never combines 7x with 3x, solving 7x - 14c = 6x + 2c and getting x = 16c
    { id: "D", text: "$16c$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Distribute and gather like terms: $10x-14c=6x+2c$ becomes $4x=16c$, so $x=4c$.\n\n**The Full Solution:**\nStep 1: Distribute the $7$ across both terms in the parentheses: $7(x-2c)=7x-14c$. The left side is now $7x-14c+3x$.\nStep 2: Combine the like terms on the left: $7x+3x=10x$, so the equation reads $10x-14c=6x+2c$. Move the $x$-terms to one side and the $c$-terms to the other: subtracting $6x$ and adding $14c$ to both sides gives $4x=16c$.\nStep 3: Divide both sides by $4$: $x=4c$. Check with $c=5$: the left side is $7(20-10)+3(20)=70+60=130$ and the right side is $6(20)+2(5)=120+10=130$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3c$): moves $-14c$ across the equal sign without changing its sign, producing $4x=-12c$. At $c=5$ that would make a block length negative.\n* Choice B ($c$): distributes the $7$ to the $x$ only, using $7x-2c$. That drops $12c$ from the equation and leaves $4x=4c$.\n* Choice D ($16c$): never combines $7x$ with the $3x$, solving $7x-14c=6x+2c$ instead. One like term left behind changes the coefficient of $x$ from $4$ to $1$.\n\n**Test Day Takeaway:** With a constant in the equation, distribute to every term inside the parentheses and sweep up all like terms before moving anything. The answer is an expression in that constant, so substitute a convenient value at the end to verify both sides agree.",
  skills: ["combining-like-terms"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A studio's uncompressed stereo master is written to disk at a constant rate of $1{,}536$ kilobits per second. Using only the conversions shown, how many megabytes of storage does a single take lasting $5$ minutes require?",
  questionTable: { headers: ["Quantity", "Equivalent"], rows: [["$1$ kilobit", "$1{,}000$ bits"], ["$1$ byte", "$8$ bits"], ["$1$ megabyte", "$1{,}000{,}000$ bytes"], ["$1$ minute", "$60$ seconds"]] },
  choices: [
    // distractor: divides by 8 a second time after the bits-to-bytes step is already done, turning 57.6 into 7.2
    { id: "A", text: "$7.2$" },
    { id: "B", text: "$57.6$" },
    // distractor: reports 460,800,000 bits as 460.8 megabytes, skipping the division by 8 that converts bits to bytes
    { id: "C", text: "$460.8$" },
    // distractor: multiplies by 8 instead of dividing when converting bits to bytes, giving 3,686,400,000 bytes
    { id: "D", text: "$3{,}686.4$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** $1{,}536$ kilobits per second is $1{,}536{,}000$ bits per second; over $300$ seconds that is $460{,}800{,}000$ bits, which is $57{,}600{,}000$ bytes, or $57.6$ megabytes.\n\n**The Full Solution:**\nStep 1: Convert the rate to bits per second. Each kilobit is $1{,}000$ bits, so the rate is $1{,}536\\times 1{,}000=1{,}536{,}000$ bits per second.\nStep 2: Convert the duration and multiply. A $5$-minute take lasts $5\\times 60=300$ seconds, so the take holds $1{,}536{,}000\\times 300=460{,}800{,}000$ bits.\nStep 3: Convert bits to megabytes. Dividing by $8$ gives $57{,}600{,}000$ bytes, and dividing by $1{,}000{,}000$ gives $57.6$ megabytes. Check by running the chain backward: $57.6\\times 1{,}000{,}000\\times 8=460{,}800{,}000$ bits, and $460{,}800{,}000\\div 300=1{,}536{,}000$ bits per second ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7.2$): applies the divide-by-$8$ step twice. Once the count is in bytes, the only conversion left is bytes to megabytes.\n* Choice C ($460.8$): stops at $460{,}800{,}000$ bits and reads the leading digits as megabytes. That number counts bits, and a byte is $8$ of them.\n* Choice D ($3{,}686.4$): multiplies by $8$ where the conversion calls for division. A byte is larger than a bit, so the count of bytes must be smaller than the count of bits.\n\n**Test Day Takeaway:** Write the chain of conversions out and let the units cancel one at a time. When one unit is larger than the other, ask whether the count should grow or shrink before choosing to multiply or divide.",
  skills: ["unit-conversion"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The depth of a tidal channel, in meters, at a horizontal distance $x$ meters from its west bank is modeled by $d(x)=-0.05x^{2}+2x$ for $0\\le x\\le 40$. A vessel requires a depth of at least $15$ meters. Which inequality describes every position where the channel is deep enough?",
  choices: [
    // distractor: reverses the inequality and takes the stretch before the depth first reaches 15 meters, where the channel is too shallow
    { id: "A", text: "$0\\le x\\le 10$" },
    // distractor: stops at the vertex x = 20, the deepest point, assuming the depth drops below 15 meters right after the maximum
    { id: "B", text: "$10\\le x\\le 20$" },
    { id: "C", text: "$10\\le x\\le 30$" },
    // distractor: takes the stretch past the second crossing at x = 30, where the depth has already fallen back below 15 meters
    { id: "D", text: "$30\\le x\\le 40$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice C is correct.**\n\n**The Fast Way (~55s):** Solve $-0.05x^{2}+2x=15$: multiplying by $-20$ gives $x^{2}-40x+300=0$, so $x=10$ and $x=30$. The parabola opens downward, so the depth is at least $15$ between those crossings.\n\n**The Full Solution:**\nStep 1: Write the requirement as an inequality: $-0.05x^{2}+2x\\ge 15$. Multiply both sides by $-20$ and reverse the inequality sign: $x^{2}-40x\\le -300$, or $x^{2}-40x+300\\le 0$.\nStep 2: Find where the expression equals zero. Factoring, $x^{2}-40x+300=(x-10)(x-30)$, so the boundary positions are $x=10$ and $x=30$.\nStep 3: Decide which side satisfies the inequality. Since $x^{2}-40x+300$ opens upward, it is negative or zero exactly between its zeros, so $10\\le x\\le 30$, and both endpoints lie inside the given domain. Check the midpoint: $d(20)=-0.05(400)+40=20$ meters, which clears $15$, while $d(5)=-1.25+10=8.75$ meters, which does not ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0\\le x\\le 10$): keeps the wrong side of the first crossing. At $x=5$ the depth is only $8.75$ meters.\n* Choice B ($10\\le x\\le 20$): stops at the vertex $x=20$. That is where the channel is deepest, not where it stops being deep enough; the depth stays above $15$ meters until $x=30$.\n* Choice D ($30\\le x\\le 40$): takes the stretch beyond the second crossing. At $x=35$ the depth is $8.75$ meters, the mirror image of the $x=5$ position.\n\n**Test Day Takeaway:** Solve the equation first to get the boundary values, then use the direction the parabola opens to pick the region. A downward parabola is above a horizontal cutoff between its two crossings and below it outside them — test one interior point to confirm.",
  skills: ["quadratics"]
}
      ]
    }
  ]
};

export default practiceTest5;
