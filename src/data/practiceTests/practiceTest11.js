// Practice Test 11 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// 2026-06 blueprint: M1 5E/9M/8H; M2 wavy T11-unique flow 3E/7M/12H
// (easy [2,5,10] / medium [1,3,4,7,9,13,18] / hard elsewhere).
// Figure density at official ~20%: M1 carries 4 diagram items, M2 carries 4.
// Numeric MC choices sorted ascending (official convention).
// Scenario palette (test-11 exclusive): ropes courses, bike-share docks,
// seed-drill calibration, ice-rink resurfacing, hotel linen laundry,
// elevator load limits, camera-equipment rental, vending machines,
// water-park slides, community-orchestra ticketing.

export const practiceTest11 = {
  id: "practice-test-11",
  title: "Practice Test 11",
  description: "Full-length SAT Math practice test with 2 modules",
  totalQuestions: 44,
  timePerModule: 35,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      timeLimit: 35,
      questions: [
// Practice Test 11 — Math Module 1
// 22 questions: Easy (1-5), Medium (6-14), Hard (15-22)

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A technician records three pairs of measurements in the table. Each recorded pair is a solution of both equations of a system of two linear equations in $x$ and $y$. How many solutions does the system have?",
  questionTable: { headers: ["Trial", "$x$ (mL)", "$y$ (mL)"], rows: [["$1$", "$2$", "$9$"], ["$2$", "$4$", "$5$"], ["$3$", "$5$", "$3$"]] },
  choices: [
    // distractor: treats a system whose graphs coincide as inconsistent (no solution)
    { id: "A", text: "None" },
    // distractor: assumes every system of two linear equations meets in exactly one point
    { id: "B", text: "Exactly one" },
    // distractor: counts only the three recorded pairs as the solution set
    { id: "C", text: "Exactly three" },
    { id: "D", text: "Infinitely many" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Two distinct points already determine one line, so two linear graphs that share three points are the same line. Every point of that line solves both equations, so the system has infinitely many solutions.\n\n**The Full Solution:**\nStep 1: Each equation of the system is linear, so each graph is a line, and the table says all three pairs $(2, 9)$, $(4, 5)$, and $(5, 3)$ lie on both lines.\nStep 2: Exactly one line passes through two distinct points. Both lines contain $(2, 9)$ and $(4, 5)$, so the two lines are the same line. The recorded pairs are consistent with that: the slope from $(2, 9)$ to $(4, 5)$ is $-2$, and the slope from $(4, 5)$ to $(5, 3)$ is also $-2$.\nStep 3: Two coincident lines share every one of their points, so the system has infinitely many solutions. Check with the shared line $y = -2x + 13$: at $x = 4$ it gives $y = 5$, which is the recorded pair in trial $2$, and every other $x$ produces another solution. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (None): a system of two linear equations has no solution only when the lines are parallel and distinct; here the lines cannot be distinct, because they share three points.\n* Choice B (Exactly one): this is the usual case, but two distinct lines can cross at most once, and these graphs agree at three different points.\n* Choice C (Exactly three): this counts only the pairs the technician happened to record; every point on the shared line is also a solution.\n\n**Test Day Takeaway:** When two linear equations are satisfied by more than one common point, the equations describe the same line — answer infinitely many, not the number of points listed.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The masses, in milligrams, of nine crystals grown in a lab are $45$, $47$, $50$, $51$, $51$, $53$, $55$, $57$, and $212$. How do the mean and the median of these masses change if the crystal of mass $212$ milligrams is removed?",
  choices: [
    { id: "A", text: "The mean decreases, and the median stays the same." },
    // distractor: reverses the roles: says the outlier moves the median rather than the mean
    { id: "B", text: "The mean stays the same, and the median decreases." },
    // distractor: assumes removing any value must move the median as well as the mean
    { id: "C", text: "Both the mean and the median decrease." },
    // distractor: assumes one value out of nine cannot change either measure
    { id: "D", text: "Neither the mean nor the median changes." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Outlier Effect**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The mean uses every value, so dropping the far-out $212$ pulls it down sharply. The median only depends on the middle of the ordered list, and the two central values are both $51$ either way.\n\n**The Full Solution:**\nStep 1: With all nine masses, the sum is $621$, so the mean is $\\frac{621}{9} = 69$ milligrams, and the fifth of the nine ordered values is the median, $51$ milligrams.\nStep 2: Without $212$, the sum is $409$ over eight values, so the mean is $\\frac{409}{8} = 51.125$ milligrams — a drop of almost $18$ milligrams.\nStep 3: The eight remaining values in order are $45$, $47$, $50$, $51$, $51$, $53$, $55$, $57$, so the median is the average of the fourth and fifth values, $\\frac{51 + 51}{2} = 51$ milligrams. Check: the median is $51$ before and $51$ after, while the mean falls from $69$ to $51.125$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (mean unchanged, median lower): this swaps the two measures. Removing a value from the sum must change the mean, while the median is protected by the repeated middle value $51$.\n* Choice C (both lower): the median is $51$ in both lists, so it does not decrease; only the mean does.\n* Choice D (neither changes): the mean is $69$ with the outlier and $51.125$ without it, so it clearly changes.\n\n**Test Day Takeaway:** An extreme value drags the mean toward itself and usually leaves the median alone — check the middle of the ordered list before claiming the median moved.",
  skills: ["calculate-mean", "find-median"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Renting a scissor lift costs $\\$95$ for delivery plus $\\$40$ for each day it stays on site. Which equation gives the total cost $C$, in dollars, of renting the lift for $d$ days?",
  choices: [
    // distractor: swaps the one-time delivery charge with the daily rate
    { id: "A", text: "$C = 95d + 40$" },
    // distractor: adds the delivery charge into the daily rate and charges it every day
    { id: "B", text: "$C = 135d$" },
    // distractor: subtracts the delivery charge instead of adding it
    { id: "C", text: "$C = 40d - 95$" },
    { id: "D", text: "$C = 40d + 95$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** The charge that repeats attaches to $d$ and the charge that happens once stands alone, so $C = 40d + 95$.\n\n**The Full Solution:**\nStep 1: The lift costs $\\$40$ for each day on site, so $d$ days of rental cost $40d$ dollars.\nStep 2: Delivery is charged one time no matter how long the lift stays, so it contributes the constant $95$ dollars.\nStep 3: The total is the sum of the two parts: $C = 40d + 95$. Check with $d = 3$: the equation gives $40(3) + 95 = 215$ dollars, which matches $\\$120$ for three days plus the $\\$95$ delivery. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($C = 95d + 40$): this attaches the one-time $\\$95$ to the number of days. At $d = 3$ it charges $\\$325$, which bills delivery three times.\n* Choice B ($C = 135d$): this rolls the delivery charge into the daily rate, giving $\\$405$ for three days instead of $\\$215$.\n* Choice C ($C = 40d - 95$): this subtracts delivery, giving only $\\$25$ for three days, less than the daily charges alone.\n\n**Test Day Takeaway:** Sort each amount into per-unit or one-time before writing the equation: per-unit amounts multiply the variable, one-time amounts are the constant.",
  skills: ["word-problem-to-equation"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A distillation runs two identical passes of $x$ minutes each after $4$ minutes of heating, so the run lasts $2x + 4$ minutes. The two pass times for which the run differs from $50$ minutes by exactly $6$ satisfy $|2x - 46| = 6$. What is the greater of these two pass times?",
  choices: [
    // distractor: reports the lesser solution, from the branch 2x - 46 = -6
    { id: "A", text: "$20$" },
    // distractor: solves 2x - 46 = 0, the pass time whose run is exactly 50 minutes
    { id: "B", text: "$23$" },
    { id: "C", text: "$26$" },
    // distractor: stops at 2x = 52 and reports the doubled value instead of x
    { id: "D", text: "$52$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** An absolute value of $6$ means the inside equals $6$ or $-6$, so $2x = 52$ or $2x = 40$, giving $x = 26$ or $x = 20$. The greater pass time is $26$ minutes.\n\n**The Full Solution:**\nStep 1: The equation $|2x - 46| = 6$ splits into $2x - 46 = 6$ and $2x - 46 = -6$.\nStep 2: The first branch gives $2x = 52$, so $x = 26$. The second gives $2x = 40$, so $x = 20$.\nStep 3: The greater of the two pass times is $26$ minutes. Check: two $26$-minute passes after $4$ minutes of heating make a run of $2(26) + 4 = 56$ minutes, and $56$ differs from $50$ by exactly $6$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): this is the other solution, from the branch $2x - 46 = -6$. It is a valid pass time, but the question asks for the greater one.\n* Choice B ($23$): this comes from setting $2x - 46 = 0$, the pass time that makes the run exactly $50$ minutes, which ignores the required difference of $6$.\n* Choice D ($52$): this stops one step early at $2x = 52$ and reports the doubled quantity rather than the pass time $x$.\n\n**Test Day Takeaway:** Split an absolute-value equation into its two branches, solve both, and then reread which of the two solutions the question wants.",
  skills: ["combining-like-terms"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "On an elevation drawing, a diagonal brace lies along the line $5x - 2y = 18$. A second brace is parallel to the first and contains the point $(4, 5)$. At what $y$-coordinate does the second brace cross the $y$-axis?",
  choices: [
    // distractor: keeps the first brace's constant 18 and reports that line's y-intercept
    { id: "A", text: "$-9$" },
    { id: "B", text: "$-5$" },
    // distractor: divides 10 by -2 but keeps the result positive
    { id: "C", text: "$5$" },
    // distractor: reports the constant term of the new equation instead of the y-coordinate
    { id: "D", text: "$10$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Parallel lines in standard form differ only in the constant, so the second brace is $5x - 2y = c$ with $5(4) - 2(5) = 10$. Setting $x = 0$ gives $-2y = 10$, so $y = -5$.\n\n**The Full Solution:**\nStep 1: Two lines are parallel exactly when they have the same slope, and in standard form that happens when the $x$- and $y$-coefficients are the same. The second brace therefore has an equation of the form $5x - 2y = c$.\nStep 2: The point $(4, 5)$ lies on it, so $5(4) - 2(5) = 20 - 10 = 10$, which means $c = 10$ and the equation is $5x - 2y = 10$.\nStep 3: The line crosses the $y$-axis where $x = 0$: $-2y = 10$, so $y = -5$. Check: $(0, -5)$ satisfies $5(0) - 2(-5) = 10$, and both braces have slope $\\frac{5}{2}$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9$): this uses the original constant, solving $-2y = 18$. That is the $y$-intercept of the first brace, not the parallel one through $(4, 5)$.\n* Choice C ($5$): this divides $10$ by $-2$ but drops the negative sign; substituting $(0, 5)$ gives $-10$, not $10$.\n* Choice D ($10$): this reports the constant $c$ from $5x - 2y = 10$ instead of solving for $y$ when $x = 0$.\n\n**Test Day Takeaway:** For a parallel line in standard form, keep both coefficients and recompute only the constant from the given point.",
  skills: ["writing-parallel-equation"]
},
{
  id: 6,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The table gives the capacity, in terabytes, of each drive model a data center installs. One rack holds $12$ model A drives, $8$ model B drives, and $n$ model C drives, for a total capacity of $232$ terabytes. What is the value of $n$?",
  questionTable: { headers: ["Drive model", "Capacity (TB)"], rows: [["A", "$4$"], ["B", "$10$"], ["C", "$8$"]] },
  correctAnswer: "13",
  explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**The correct answer is $13$.**\n\n**The Fast Way (~30s):** The model A and model B drives supply $12(4) + 8(10) = 128$ terabytes, leaving $232 - 128 = 104$ terabytes for the model C drives at $8$ terabytes each, so $n = 13$.\n\n**The Full Solution:**\nStep 1: Read each capacity from the table: model A is $4$ TB, model B is $10$ TB, and model C is $8$ TB. The $12$ model A drives hold $12(4) = 48$ TB and the $8$ model B drives hold $8(10) = 80$ TB.\nStep 2: Translate the total into an equation: $48 + 80 + 8n = 232$, so $8n = 232 - 128 = 104$.\nStep 3: Divide: $n = \\frac{104}{8} = 13$. Check: $48 + 80 + 8(13) = 48 + 80 + 104 = 232$ terabytes, matching the rack total. ✓\n\n**Common Mistakes:**\n* Pairing the model C count with model A's capacity gives $\\frac{104}{4} = 26$, a rack of $46$ drives that would hold far more than $232$ TB.\n* Pairing it with model B's capacity gives $\\frac{104}{10} = 10.4$, which is not a whole number of drives — a signal that the wrong row was used.\n* Forgetting the model B drives entirely gives $\\frac{232 - 48}{8} = 23$, which double-counts their $80$ TB as model C capacity.\n\n**Test Day Takeaway:** Convert each row of a table into a product of count and unit value first; the unknown count is then a one-step division.",
  skills: ["word-problem-to-equation"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 4,
  question: "A quality engineer triples every recorded latency in a set of $30$ network measurements to model performance under a heavier load. Which statement compares the mean and the standard deviation of the tripled measurements with those of the original measurements?",
  choices: [
    { id: "A", text: "Both the mean and the standard deviation are $3$ times as large." },
    // distractor: treats spread as unaffected by a multiplier (that is what adding a constant does)
    { id: "B", text: "The mean is $3$ times as large, and the standard deviation is unchanged." },
    // distractor: swaps the two measures, leaving the mean alone instead of the spread
    { id: "C", text: "The mean is unchanged, and the standard deviation is $3$ times as large." },
    // distractor: assumes a common factor cancels out of both summary measures
    { id: "D", text: "Both the mean and the standard deviation are unchanged." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Multiplying every value by $3$ multiplies the average by $3$ and stretches every distance from the average by $3$, so the mean and the standard deviation are both $3$ times as large.\n\n**The Full Solution:**\nStep 1: The mean is the sum divided by the count. Tripling all $30$ latencies triples the sum while the count stays $30$, so the mean is $3$ times its original value.\nStep 2: The standard deviation measures typical distance from the mean. If a value was $d$ milliseconds above the mean, after tripling it is $3d$ above the tripled mean, so every deviation is $3$ times as large and so is their typical size.\nStep 3: Both measures scale by the same factor $3$. Check with the two-value set $20$ and $40$: the mean is $30$ and each value sits $10$ from it; tripled, the values $60$ and $120$ have mean $90 = 3(30)$ and each sits $30$ from that mean, so every deviation, and with it the standard deviation, is $3$ times as large. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (mean tripled, spread unchanged): that is what *adding* a constant does. In the check above it would keep the deviations at $10$, but $60$ and $120$ each sit $30$ from their mean.\n* Choice C (mean unchanged, spread tripled): the mean moves with the values — the tripled set of the check averages $90$, not $30$.\n* Choice D (neither changes): multiplying is not a relabeling — the tripled set has mean $90$ and deviations of $30$, three times the original mean $30$ and deviations of $10$.\n\n**Test Day Takeaway:** Multiplying every value by $k$ multiplies the mean, the median, the range, and the standard deviation by $k$; adding a constant moves the center but leaves the spread alone.",
  skills: ["data-analysis"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A parabolic arch rises to a height of $-0.02x^2 + 1.2x$ meters at a horizontal distance of $x$ meters from one base. What is the least integer number of meters that is greater than every height on the arch?",
  choices: [
    // distractor: gives the greatest height the arch actually reaches, which is not greater than every height
    { id: "A", text: "$18$" },
    { id: "B", text: "$19$" },
    // distractor: reports the horizontal distance at which the arch peaks instead of a height
    { id: "C", text: "$30$" },
    // distractor: reports the distance between the two bases of the arch instead of a height
    { id: "D", text: "$60$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** A height $h$ occurs on the arch only if $-0.02x^2 + 1.2x = h$ has a real solution, which requires $1.44 - 0.08h \\ge 0$, or $h \\le 18$. The least integer above every reachable height is $19$.\n\n**The Full Solution:**\nStep 1: Set the height expression equal to $h$: $-0.02x^2 + 1.2x = h$, which rearranges to $0.02x^2 - 1.2x + h = 0$.\nStep 2: This quadratic has a real solution $x$ exactly when its discriminant is not negative: $(-1.2)^2 - 4(0.02)(h) = 1.44 - 0.08h \\ge 0$, so $h \\le 18$. Heights above $18$ meters never occur on the arch.\nStep 3: Every height on the arch is at most $18$, so the least integer greater than all of them is $19$. Check: at $h = 18$ the discriminant is $0$ and $x = 30$ is a real solution, so $18$ is attained and is not greater than every height, while $h = 19$ gives a discriminant of $-0.08$ and no real $x$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): this is the maximum height itself, reached at $x = 30$ meters. The question asks for an integer strictly greater than every height, and $18$ is not greater than $18$.\n* Choice C ($30$): this is the horizontal distance from the base at which the peak occurs, not a height.\n* Choice D ($60$): the arch meets the ground at $x = 0$ and $x = 60$, so this is the span between the bases, again not a height.\n\n**Test Day Takeaway:** When a question asks which output values are impossible, set the expression equal to the output and let the discriminant decide when a real input exists.",
  skills: ["discriminant-analysis"]
},
{
  id: 9,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Of the $n$ processors in a computing cluster, $45\\%$ are installed in rack A. The probability that a randomly selected processor from rack A is idle is $0.2$, and $27$ processors in rack A are idle. What is the value of $n$?",
  correctAnswer: "300",
  explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**The correct answer is $300$.**\n\n**The Fast Way (~35s):** Idle processors in rack A are $0.2$ of the $0.45n$ processors in that rack, so $0.09n = 27$ and $n = 300$.\n\n**The Full Solution:**\nStep 1: Rack A holds $45\\%$ of the cluster, which is $0.45n$ processors.\nStep 2: The probability that a processor chosen from rack A is idle is $0.2$, so the number of idle processors in rack A is $0.2(0.45n) = 0.09n$.\nStep 3: Setting $0.09n = 27$ gives $n = \\frac{27}{0.09} = 300$. Check: $45\\%$ of $300$ is $135$ processors in rack A, and $0.2(135) = 27$ idle processors, as given. ✓\n\n**Common Mistakes:**\n* Dividing by only the rack share gives $\\frac{27}{0.45} = 60$, which treats the $27$ idle processors as all of rack A and never uses the probability $0.2$.\n* Dividing by only the idle probability gives $\\frac{27}{0.2} = 135$, which is the size of rack A, not of the whole cluster.\n* Multiplying instead of dividing gives $27(0.09) = 2.43$, a count smaller than the $27$ idle processors already reported.\n\n**Test Day Takeaway:** A conditional probability applies to its subgroup, so chain the two factors — group share times conditional rate — and divide the count by the product.",
  skills: ["conditional-probability"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A rectangular window opening is $40$ inches wide. Making the opening taller without changing its width increases its area from $1{,}120$ square inches to $1{,}400$ square inches. By how many inches does the height of the opening increase?",
  correctAnswer: "7",
  explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~25s):** The width is fixed, so height is area divided by $40$: the opening goes from $\\frac{1{,}120}{40} = 28$ inches tall to $\\frac{1{,}400}{40} = 35$ inches tall, an increase of $7$ inches.\n\n**The Full Solution:**\nStep 1: For a rectangle, area equals width times height, so height equals area divided by width.\nStep 2: The original height is $\\frac{1{,}120}{40} = 28$ inches and the new height is $\\frac{1{,}400}{40} = 35$ inches.\nStep 3: The increase is $35 - 28 = 7$ inches. Check: a $40$-inch by $35$-inch opening has area $1{,}400$ square inches, and $40(28) = 1{,}120$ square inches, so the height grew by exactly $7$ inches. ✓\n\n**Common Mistakes:**\n* Reporting the change in area, $1{,}400 - 1{,}120 = 280$, answers a different question — that is square inches of glass added, not inches of height.\n* Dividing only the new area gives $35$, the new height rather than the increase.\n* Dividing the areas gives $\\frac{1{,}400}{1{,}120} = 1.25$, the scale factor, which is a ratio and not a number of inches.\n\n**Test Day Takeaway:** When one dimension is held fixed, divide each area by it to turn an area comparison into a length comparison.",
  skills: ["triangle-area"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A surveyor's plan shows property line $\\ell$. A fence will run along $6x + py = 21$, in which $p$ is a constant, so that it never crosses line $\\ell$. What is the value of $p$?",
  diagram: { type: "linearGraph", params: { slope: -2, yIntercept: 3, xRange: [-2, 6], yRange: [-9, 7], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showPoints: [[0, 3], [2, -1]], label: "ℓ" } },
  choices: [
    // distractor: sets -6/p equal to positive 2, flipping the sign of the slope
    { id: "A", text: "$-3$" },
    // distractor: copies the y-coefficient of line l instead of scaling it
    { id: "B", text: "$1$" },
    { id: "C", text: "$3$" },
    // distractor: multiplies 6 by the slope's magnitude 2 instead of dividing
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Line $\\ell$ passes through $(0, 3)$ and $(2, -1)$, so its slope is $-2$. Two lines never meet only when their slopes match: $-\\frac{6}{p} = -2$ gives $p = 3$.\n\n**The Full Solution:**\nStep 1: Read two points off the plotted property line $\\ell$: $(0, 3)$ and $(2, -1)$. The slope is $\\frac{-1 - 3}{2 - 0} = -2$, so line $\\ell$ is $y = -2x + 3$, or $2x + y = 3$.\nStep 2: Solving $6x + py = 21$ for $y$ gives $y = -\\frac{6}{p}x + \\frac{21}{p}$, so its slope is $-\\frac{6}{p}$. Lines that never meet are parallel, so $-\\frac{6}{p} = -2$ and $p = 3$.\nStep 3: With $p = 3$ the second line is $6x + 3y = 21$, or $2x + y = 7$. Check that the fence and the property line really are distinct: $2x + y$ equals $3$ on line $\\ell$ and $7$ on the second line, so no point can satisfy both, and the lines never meet. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): this comes from matching $-\\frac{6}{p}$ to $+2$ instead of $-2$. That line, $6x - 3y = 21$, has slope $2$ and crosses line $\\ell$.\n* Choice B ($1$): this copies the coefficient of $y$ in $2x + y = 3$ without scaling it. The line $6x + y = 21$ has slope $-6$ and meets line $\\ell$.\n* Choice D ($12$): this multiplies $6$ by $2$ rather than dividing. The line $6x + 12y = 21$ has slope $-\\frac{1}{2}$, so it also crosses line $\\ell$.\n\n**Test Day Takeaway:** Lines with no point in common have equal slopes and different intercepts — match the slopes first, then confirm the constants differ.",
  skills: ["system-solution-types"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The function $C$ models a building's monthly heating cost, in dollars, where $C(t)$ is the cost $t$ months after January. Next year the same seasonal pattern is expected $2$ months later, with each month's cost $\\$300$ greater. Which function models next year's cost?",
  choices: [
    // distractor: uses t + 2 inside, which slides the pattern 2 months earlier instead of later
    { id: "A", text: "$C(t + 2) + 300$" },
    // distractor: slides the pattern 2 months earlier and lowers every cost
    { id: "B", text: "$C(t + 2) - 300$" },
    { id: "C", text: "$C(t - 2) + 300$" },
    // distractor: shifts the timing correctly but subtracts the 300-dollar increase
    { id: "D", text: "$C(t - 2) - 300$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Function Transformation**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** A pattern that happens later is fed a delayed input, so use $C(t - 2)$; costs that are higher get a constant added, so the model is $C(t - 2) + 300$.\n\n**The Full Solution:**\nStep 1: Next year's cost in month $t$ repeats what this year's pattern did $2$ months earlier, which is $C(t - 2)$. Subtracting inside the parentheses delays the pattern; adding inside would move it earlier.\nStep 2: Every month also costs $\\$300$ more, and that is an adjustment to the output, so add $300$ outside the function.\nStep 3: Combining the two gives $C(t - 2) + 300$. Check: if this year's peak cost of $\\$800$ occurs in January ($t = 0$), next year's peak should be $\\$1{,}100$ in March ($t = 2$), and $C(2 - 2) + 300 = C(0) + 300 = 800 + 300 = 1{,}100$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($C(t + 2) + 300$): the cost increase is right, but $C(t + 2)$ pulls the pattern $2$ months earlier — it would put next year's $\\$1{,}100$ peak in November of the previous year, not March.\n* Choice B ($C(t + 2) - 300$): this gets both directions wrong, moving the peak earlier and dropping it to $\\$500$.\n* Choice D ($C(t - 2) - 300$): the timing is right, but subtracting gives a March peak of $\\$500$ instead of the required $\\$1{,}100$.\n\n**Test Day Takeaway:** Changes inside the parentheses shift time in the opposite direction; changes outside move the output the way they read.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table classifies $180$ concrete test cylinders by curing method and by whether the cylinder passed a compression test. Which expression gives the probability that a cylinder chosen at random from those that failed was steam cured?",
  questionTable: { headers: ["Curing method", "Passed", "Failed", "Total"], rows: [["Steam", "$72$", "$18$", "$90$"], ["Moist", "$54$", "$36$", "$90$"], ["Total", "$126$", "$54$", "$180$"]] },
  choices: [
    // distractor: divides by the 180 cylinders in the whole study instead of the 54 that failed
    { id: "A", text: "$\\frac{18}{180}$" },
    // distractor: divides by the 90 steam-cured cylinders, which reverses the condition
    { id: "B", text: "$\\frac{18}{90}$" },
    // distractor: gives the probability that a cylinder failed, ignoring the curing method
    { id: "C", text: "$\\frac{54}{180}$" },
    { id: "D", text: "$\\frac{18}{54}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The condition \"failed\" makes the $54$ failed cylinders the whole group, and $18$ of them were steam cured, so the probability is $\\frac{18}{54}$.\n\n**The Full Solution:**\nStep 1: The phrase \"chosen at random from those that failed\" restricts attention to the Failed column, whose total is $54$ cylinders.\nStep 2: Within that column, the steam-cured row contributes $18$ cylinders.\nStep 3: The probability is the part over the restricted whole: $\\frac{18}{54}$. Check the column: $18$ steam-cured failures plus $36$ moist-cured failures is $54$, so the two conditional probabilities $\\frac{18}{54}$ and $\\frac{36}{54}$ add to $1$, as they must. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{18}{180}$): this divides by every cylinder in the study, giving the probability that a randomly chosen cylinder is both steam cured and failed, which is $0.1$ rather than the required conditional probability of about $0.33$.\n* Choice B ($\\frac{18}{90}$): this divides by the steam-cured total, answering the reversed question — the probability that a steam-cured cylinder failed, which is $0.2$.\n* Choice C ($\\frac{54}{180}$): this is the overall failure rate, $0.3$, and never uses the curing method at all.\n\n**Test Day Takeaway:** In a conditional probability, the group named after \"given\" or \"from those that\" becomes the denominator — find that row or column total first.",
  skills: ["conditional-probability", "two-way-table"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "One supplier charges $\\$5$ per liter of ethanol and $\\$3$ per liter of acetone for a lab order totaling $\\$87$. A second supplier charges $\\$3$ per liter of ethanol and $\\$5$ per liter of acetone for the identical order, totaling $\\$73$. How many liters does the order contain in all?",
  choices: [
    // distractor: subtracts the two equations, producing the difference in liters rather than the total
    { id: "A", text: "$7$" },
    { id: "B", text: "$20$" },
    // distractor: divides the combined total 160 by 4 instead of by 8
    { id: "C", text: "$40$" },
    // distractor: adds the two quoted totals and stops, reporting 8 times the number of liters
    { id: "D", text: "$160$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** With $x$ liters of ethanol and $y$ liters of acetone, $5x + 3y = 87$ and $3x + 5y = 73$. Adding gives $8x + 8y = 160$, so $x + y = 20$ liters.\n\n**The Full Solution:**\nStep 1: Let $x$ be the liters of ethanol and $y$ the liters of acetone. The first quote is $5x + 3y = 87$ and the second is $3x + 5y = 73$.\nStep 2: The question asks only for $x + y$, and adding the two equations produces the symmetric combination $8x + 8y = 160$.\nStep 3: Dividing by $8$ gives $x + y = 20$ liters. Check by solving fully: subtracting the equations gives $2x - 2y = 14$, so $x - y = 7$; with $x + y = 20$ that gives $x = 13.5$ and $y = 6.5$, and $5(13.5) + 3(6.5) = 67.5 + 19.5 = 87$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): subtracting instead of adding gives $x - y = 7$, the difference between the two volumes, not the total order.\n* Choice C ($40$): this divides the combined total $160$ by $4$ rather than by the $8$ that actually multiplies $x + y$.\n* Choice D ($160$): this stops at $8x + 8y = 160$, which is eight times the number of liters, not the number of liters.\n\n**Test Day Takeaway:** When a system asks for a sum or difference rather than for each variable, add or subtract the equations and read the combination directly.",
  skills: ["elimination-method"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cylindrical concrete bridge pier is poured with a diameter equal to two-thirds of its height. The finished pier contains $192\\pi$ cubic feet of concrete. What is the height, in feet, of the pier?",
  correctAnswer: "12",
  explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~45s):** A diameter of $\\frac{2}{3}h$ makes the radius $\\frac{h}{3}$, so $V = \\pi\\left(\\frac{h}{3}\\right)^2 h = \\frac{\\pi h^3}{9} = 192\\pi$. Then $h^3 = 1{,}728$ and $h = 12$ feet.\n\n**The Full Solution:**\nStep 1: The diameter is $\\frac{2}{3}h$, so the radius is half of that: $r = \\frac{h}{3}$.\nStep 2: Substitute into $V = \\pi r^2 h$: $\\pi\\left(\\frac{h}{3}\\right)^2 h = \\frac{\\pi h^3}{9}$. Setting this equal to $192\\pi$ gives $h^3 = 9(192) = 1{,}728$.\nStep 3: Taking the cube root gives $h = 12$ feet. Check: a $12$-foot pier has radius $\\frac{12}{3} = 4$ feet and diameter $8$ feet, which is $\\frac{2}{3}$ of $12$, and $\\pi(4)^2(12) = 192\\pi$ cubic feet. ✓\n\n**Common Mistakes:**\n* Using the diameter as the radius gives $\\frac{4\\pi h^3}{9} = 192\\pi$ and $h^3 = 432$, so $h$ is about $7.6$ feet — not a whole number, which is the signal that the radius step was skipped.\n* Stopping at $h^3 = 1{,}728$ and gridding in $1728$ skips the cube root.\n* Reporting $4$ answers with the radius rather than the height the question asks for.\n\n**Test Day Takeaway:** Turn every given dimension into the radius before using $V = \\pi r^2 h$; a diameter must be halved first, and one variable then carries the whole formula.",
  skills: ["volume-prism"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The bar chart shows the storage, in gigabytes, used by each of four file categories on a server. After $40\\%$ of the storage used by video files is freed and the other categories are unchanged, image files use what percent of the storage still in use?",
  diagram: { type: "barChart", params: { data: [{ label: "Video", value: 300 }, { label: "Images", value: 120 }, { label: "Logs", value: 60 }, { label: "Backups", value: 120 }], xAxisLabel: "File category", yAxisLabel: "Storage used (GB)", yMax: 360, yStep: 60 } },
  correctAnswer: "25",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**The correct answer is $25$.**\n\n**The Fast Way (~40s):** Freeing $40\\%$ of the $300$ GB of video removes $120$ GB, so the server holds $600 - 120 = 480$ GB. Images still occupy $120$ GB, and $\\frac{120}{480} = 25\\%$.\n\n**The Full Solution:**\nStep 1: Read the four bars: video $300$ GB, images $120$ GB, logs $60$ GB, and backups $120$ GB, for a total of $600$ GB in use at the start.\nStep 2: Freeing $40\\%$ of the video storage removes $0.40(300) = 120$ GB, leaving $180$ GB of video and a new total of $180 + 120 + 60 + 120 = 480$ GB.\nStep 3: Images are unchanged at $120$ GB, so they now occupy $\\frac{120}{480} = 0.25$, or $25\\%$, of the storage in use. Check: the four new shares are $\\frac{180}{480} = 37.5\\%$, $25\\%$, $12.5\\%$, and $25\\%$, and these add to $100\\%$. ✓\n\n**Common Mistakes:**\n* Using the original $600$ GB total gives $\\frac{120}{600} = 20\\%$ and ignores that the whole shrank.\n* Computing the video share of the new total gives $\\frac{180}{480} = 37.5\\%$, the wrong category.\n* Removing $40$ GB instead of $40\\%$ of $300$ GB leaves $560$ GB and gives about $21.4\\%$.\n\n**Test Day Takeaway:** When part of the whole is removed, rebuild the new total before taking any percent — the denominator changes even when the numerator does not.",
  skills: ["percent-of-value"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In a signal-processing model, the gain of a filter is $\\frac{4x^2 - 49}{2x^2 - x - 28}$ for every value of $x$ greater than $4$. Which expression gives the same gain?",
  choices: [
    { id: "A", text: "$\\frac{2x - 7}{x - 4}$" },
    // distractor: cancels the factor 2x - 7 instead of the shared factor 2x + 7
    { id: "B", text: "$\\frac{2x + 7}{x - 4}$" },
    // distractor: factors the denominator as (2x + 7)(x + 4), which expands to 2x^2 + 15x + 28
    { id: "C", text: "$\\frac{2x - 7}{x + 4}$" },
    // distractor: factors the denominator as (2x + 7)(2x - 8), which is twice the given denominator
    { id: "D", text: "$\\frac{2x - 7}{2x - 8}$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The numerator is a difference of squares, $(2x - 7)(2x + 7)$, and the denominator factors as $(2x + 7)(x - 4)$. Dividing out $2x + 7$ leaves $\\frac{2x - 7}{x - 4}$.\n\n**The Full Solution:**\nStep 1: Factor the numerator: $4x^2 - 49 = (2x)^2 - 7^2 = (2x - 7)(2x + 7)$.\nStep 2: Factor the denominator: $2x^2 - x - 28 = (2x + 7)(x - 4)$, since $(2x + 7)(x - 4) = 2x^2 - 8x + 7x - 28 = 2x^2 - x - 28$.\nStep 3: The common factor $2x + 7$ is not zero for $x > 4$, so it divides out and the gain equals $\\frac{2x - 7}{x - 4}$. Check at $x = 5$: the original is $\\frac{100 - 49}{50 - 5 - 28} = \\frac{51}{17} = 3$, and the simplified form gives $\\frac{10 - 7}{5 - 4} = 3$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{2x + 7}{x - 4}$): this divides out the wrong factor. At $x = 5$ it gives $\\frac{17}{1} = 17$, not $3$.\n* Choice C ($\\frac{2x - 7}{x + 4}$): this comes from factoring the denominator as $(2x + 7)(x + 4)$, which expands to $2x^2 + 15x + 28$, not the given denominator. At $x = 5$ it gives $\\frac{3}{9} = \\frac{1}{3}$.\n* Choice D ($\\frac{2x - 7}{2x - 8}$): this uses $(2x + 7)(2x - 8)$, a product equal to $4x^2 - 2x - 56$ — twice the denominator — so the value at $x = 5$ is $\\frac{3}{2}$, half of the correct gain.\n\n**Test Day Takeaway:** Factor both parts completely before cancelling, and confirm a factorization by expanding it back; only whole factors, never single terms, may be divided out.",
  skills: ["simplifying-rational-expressions", "difference-of-squares"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The cost per pallet, in dollars, of producing $x$ pallets of paving stones in one day is modeled by $C(x) = 2x^2 - 28x + 117$. Which equivalent form of $C(x)$ displays the number of pallets that minimizes the cost per pallet as a constant or coefficient?",
  choices: [
    // distractor: uses half of 28 as the shift instead of half of 14, giving (x - 14)^2
    { id: "A", text: "$2(x - 14)^2 + 19$" },
    // distractor: reverses the sign inside the square, expanding to 2x^2 + 28x + 117
    { id: "B", text: "$2(x + 7)^2 + 19$" },
    { id: "C", text: "$2(x - 7)^2 + 19$" },
    // distractor: keeps the leading 2 inside the square, expanding to 4x^2 - 56x + 215
    { id: "D", text: "$(2x - 14)^2 + 19$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Factor the $2$ out of the variable terms: $2(x^2 - 14x) + 117 = 2(x - 7)^2 - 98 + 117 = 2(x - 7)^2 + 19$, so the cost per pallet is least at $x = 7$ pallets.\n\n**The Full Solution:**\nStep 1: Group the variable terms and factor out the leading coefficient: $C(x) = 2(x^2 - 14x) + 117$.\nStep 2: Complete the square inside the parentheses. Half of $-14$ is $-7$, and $(x - 7)^2 = x^2 - 14x + 49$, so $x^2 - 14x = (x - 7)^2 - 49$. Then $C(x) = 2[(x - 7)^2 - 49] + 117 = 2(x - 7)^2 - 98 + 117$.\nStep 3: Simplify: $C(x) = 2(x - 7)^2 + 19$. Because $2(x - 7)^2$ is never negative and equals $0$ only at $x = 7$, the smallest cost per pallet is $\\$19$ at $7$ pallets, and that $7$ appears as a constant in the form. Check by expanding: $2(x^2 - 14x + 49) + 19 = 2x^2 - 28x + 98 + 19 = 2x^2 - 28x + 117$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2(x - 14)^2 + 19$): this uses the whole coefficient $-28$ divided by $2$ as the shift instead of halving $-14$. Expanding gives $2x^2 - 56x + 411$, which is not the cost model.\n* Choice B ($2(x + 7)^2 + 19$): the sign inside is reversed. Expanding gives $2x^2 + 28x + 117$, a model whose cost rises for every positive $x$.\n* Choice D ($(2x - 14)^2 + 19$): the leading $2$ was squared along with the binomial. Expanding gives $4x^2 - 56x + 215$, so at $x = 0$ it predicts $\\$215$ instead of the model's $\\$117$.\n\n**Test Day Takeaway:** Factor the leading coefficient out of the variable terms first, then complete the square — and expand the finished form once to confirm it is the same function.",
  skills: ["quadratics"]
},
{
  id: 19,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A circular reflecting pool is drawn on a landscape plan so that its rim satisfies $x^2 + y^2 - 14x - 6y + c = 0$ and just reaches, without crossing, a walkway that runs down the $x$-axis. What is the value of $c$?",
  correctAnswer: "49",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $49$.**\n\n**The Fast Way (~45s):** Completing both squares gives center $(7, 3)$ and $r^2 = 58 - c$. Touching the $x$-axis once means the radius equals the center's distance to it, $3$, so $58 - c = 9$ and $c = 49$.\n\n**The Full Solution:**\nStep 1: Group and complete the square: $x^2 - 14x + y^2 - 6y = -c$ becomes $(x - 7)^2 - 49 + (y - 3)^2 - 9 = -c$, so $(x - 7)^2 + (y - 3)^2 = 58 - c$. The center is $(7, 3)$ and $r^2 = 58 - c$.\nStep 2: A rim that just reaches the walkway without crossing it touches the $x$-axis at exactly one point, so that line is tangent to the circle, which happens when the radius equals the distance from the center to the line. That distance from $(7, 3)$ to the $x$-axis is $3$, so $r = 3$ and $r^2 = 9$.\nStep 3: Solve $58 - c = 9$ to get $c = 49$. Check: with $c = 49$ the equation is $(x - 7)^2 + (y - 3)^2 = 9$; setting $y = 0$ gives $(x - 7)^2 = 0$, whose only solution is $x = 7$, so the rim touches the walkway at the single point $(7, 0)$. ✓\n\n**Common Mistakes:**\n* Setting $58 - c = 0$ gives $c = 58$, which shrinks the circle to the single point $(7, 3)$ — a figure that never reaches the walkway at all.\n* Reporting $9$ answers with $r^2$ instead of the constant $c$ the equation asks for.\n* Using the distance $3$ as $r^2$ instead of $r$ gives $58 - c = 3$ and $c = 55$, a circle of radius $\\sqrt{3}$ that misses the walkway entirely.\n\n**Test Day Takeaway:** Convert to standard form first; tangency to a horizontal or vertical line then just says the radius equals the center's distance to that line.",
  skills: ["circle-equation"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A rectangular scaffold platform measures $16$ feet by $12$ feet. A vertical post $21$ feet tall is fixed at one corner of the platform. What is the distance, in feet, from the top of the post to the corner of the platform diagonally opposite the post?",
  choices: [
    // distractor: stops at the platform's diagonal and never brings in the post height
    { id: "A", text: "$20$" },
    { id: "B", text: "$29$" },
    // distractor: adds the 20-foot diagonal and the 21-foot post instead of combining them as legs
    { id: "C", text: "$41$" },
    // distractor: adds the three given lengths, 16 + 12 + 21
    { id: "D", text: "$49$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The platform's diagonal is $\\sqrt{16^2 + 12^2} = 20$ feet, and that diagonal is perpendicular to the post, so the distance is $\\sqrt{20^2 + 21^2} = \\sqrt{841} = 29$ feet.\n\n**The Full Solution:**\nStep 1: The platform is a rectangle, so its two sides and its diagonal form a right triangle: the diagonal is $\\sqrt{16^2 + 12^2} = \\sqrt{256 + 144} = \\sqrt{400} = 20$ feet.\nStep 2: The post is vertical, so it is perpendicular to the platform and therefore to that diagonal. The post, the diagonal, and the segment from the top of the post to the far corner form a second right triangle with legs $21$ feet and $20$ feet.\nStep 3: The required distance is $\\sqrt{21^2 + 20^2} = \\sqrt{441 + 400} = \\sqrt{841} = 29$ feet. Check: $29^2 = 841$ and $20^2 + 21^2 = 841$, so the triangle with sides $20$, $21$, and $29$ is right. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): this is the platform's own diagonal, the distance between the two corners along the deck, with the $21$-foot climb ignored.\n* Choice C ($41$): this adds $20$ and $21$. Adding the legs always overshoots a hypotenuse, which must be less than their sum.\n* Choice D ($49$): this adds all three given lengths, $16 + 12 + 21$, which measures a path along the edges rather than a straight-line distance.\n\n**Test Day Takeaway:** For a distance across a box-shaped setup, apply the Pythagorean theorem twice — once for the base diagonal, then with the vertical height.",
  skills: ["pythagorean-theorem"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A kiln operator models the yield, in kilograms, at furnace setting $x$ with a quadratic function $f$. The table gives $f(x)$ at four settings. What is the greatest yield the model predicts, in kilograms?",
  questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$0$", "$5$"], ["$1$", "$20$"], ["$5$", "$20$"], ["$6$", "$5$"]] },
  choices: [
    // distractor: reports the setting x = 3 at which the peak occurs instead of the yield there
    { id: "A", text: "$3$" },
    // distractor: solves 5a = 15 instead of 5a = -15, getting a = 3 and k = 20 - 12 = 8
    { id: "B", text: "$8$" },
    // distractor: reads the largest yield listed in the table as the model's maximum
    { id: "C", text: "$20$" },
    { id: "D", text: "$32$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Equal yields at $x = 1$ and $x = 5$ put the vertex at $x = 3$, so $f(x) = a(x - 3)^2 + k$. From $4a + k = 20$ and $9a + k = 5$, $a = -3$ and $k = 32$ kilograms.\n\n**The Full Solution:**\nStep 1: A parabola takes equal values at inputs equally spaced from its axis of symmetry. Since $f(1) = f(5) = 20$, the axis is $x = \\frac{1 + 5}{2} = 3$, so $f(x) = a(x - 3)^2 + k$ and the maximum or minimum value is $k$.\nStep 2: Substitute two table rows: $f(1) = a(1 - 3)^2 + k = 4a + k = 20$, and $f(0) = a(0 - 3)^2 + k = 9a + k = 5$. Subtracting the first from the second gives $5a = -15$, so $a = -3$.\nStep 3: Then $k = 20 - 4(-3) = 32$. Because $a = -3$ is negative the parabola opens downward, so $32$ kilograms is the greatest yield, reached at setting $x = 3$. Check the remaining row: $f(6) = -3(6 - 3)^2 + 32 = -27 + 32 = 5$, which matches the table. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): this is the furnace setting at which the peak occurs, not the yield the model predicts there.\n* Choice B ($8$): this comes from solving $5a = 15$ instead of $5a = -15$; that gives $a = 3$ and $k = 20 - 12 = 8$, an upward-opening parabola with a minimum, which contradicts $f(0) = 5$ being lower than $f(1) = 20$.\n* Choice C ($20$): this is the largest value printed in the table, but the table skips the settings between $x = 1$ and $x = 5$, where the model runs higher.\n\n**Test Day Takeaway:** Two equal outputs locate the axis of symmetry halfway between them; from there two table rows are enough to pin down the vertex value.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In a data pipeline, stage one applies the rule $f(n) = 2n - 5$ to a number and stage two applies the rule $g(n) = n^2 + 3$. Which expression is equivalent to $g(f(n)) - f(g(n))$?",
  choices: [
    { id: "A", text: "$2n^2 - 20n + 27$" },
    // distractor: subtracts in the reverse order, computing f(g(n)) - g(f(n))
    { id: "B", text: "$-2n^2 + 20n - 27$" },
    // distractor: expands (2n - 5)^2 as 4n^2 + 25, dropping the -20n middle term
    { id: "C", text: "$2n^2 + 27$" },
    // distractor: stops after computing g(f(n)) and never subtracts f(g(n))
    { id: "D", text: "$4n^2 - 20n + 28$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** $g(f(n)) = (2n - 5)^2 + 3 = 4n^2 - 20n + 28$ and $f(g(n)) = 2(n^2 + 3) - 5 = 2n^2 + 1$, so the difference is $2n^2 - 20n + 27$.\n\n**The Full Solution:**\nStep 1: Compute $g(f(n))$ by substituting $2n - 5$ for the input of $g$: $g(f(n)) = (2n - 5)^2 + 3 = 4n^2 - 20n + 25 + 3 = 4n^2 - 20n + 28$.\nStep 2: Compute $f(g(n))$ by substituting $n^2 + 3$ for the input of $f$: $f(g(n)) = 2(n^2 + 3) - 5 = 2n^2 + 6 - 5 = 2n^2 + 1$.\nStep 3: Subtract in the order asked: $(4n^2 - 20n + 28) - (2n^2 + 1) = 2n^2 - 20n + 27$. Check at $n = 3$: $g(f(3)) = g(1) = 4$ and $f(g(3)) = f(12) = 19$, so the difference is $-15$, and $2(9) - 20(3) + 27 = 18 - 60 + 27 = -15$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-2n^2 + 20n - 27$): this is the difference taken in the reverse order. At $n = 3$ it gives $+15$ instead of $-15$.\n* Choice C ($2n^2 + 27$): this expands $(2n - 5)^2$ as $4n^2 + 25$ and loses the $-20n$ middle term. At $n = 3$ it gives $45$.\n* Choice D ($4n^2 - 20n + 28$): this is $g(f(n))$ alone, with the subtraction never carried out. At $n = 3$ it gives $4$.\n\n**Test Day Takeaway:** Composition is not commutative — expand each order separately, keeping every middle term of the square, before combining.",
  skills: ["function-composition"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 11 — Math Module 2 (22 questions)
// Flow (wavy, T11-unique): easy at [2,5,10]; medium at [1,3,4,7,9,13,18];
// hard at [6,8,11,12,14,15,16,17,19,20,21,22].
// Distribution: 3 easy / 7 medium / 12 hard = 22.
// Official-calibration recreation (2026-09-01): all content re-authored;
// slot metadata and flow shape frozen. Q1-5 warm-ups each carry 2+ steps
// or a trap (successive-percent, add-squares missing leg, shifted ask,
// retain-vs-lose, first-value-as-intercept).
// Palette: bike-share docks, camera-equipment rental, ice-rink resurfacing,
// ropes courses, water-park slides, seed-drill calibration,
// community-orchestra ticketing.

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 2,
  question: "A restoration fund opened by a heritage-railway trust earns a fixed annual rate, and no money is added or removed. Three values of the fund are recorded in the table. Which equation models the fund's value $V$, in dollars, $t$ years after the fund was opened?",
  questionTable: { headers: ["Years after opening", "Fund value (dollars)"], rows: [["$0$", "$2{,}500$"], ["$1$", "$2{,}600$"], ["$2$", "$2{,}704$"]] },
  choices: [
    // distractor: treats the first year's 100-dollar rise as a fixed yearly amount, giving a linear model that predicts 2,700 at t = 2 instead of 2,704
    { id: "A", text: "$V = 2{,}500 + 100t$" },
    // distractor: uses the rate 0.04 as the growth factor instead of 1 + 0.04, predicting 100 dollars after one year
    { id: "B", text: "$V = 2{,}500(0.04)^t$" },
    { id: "C", text: "$V = 2{,}500(1.04)^t$" },
    // distractor: misplaces the decimal in the growth factor, reading 1.04 as 1.4 and predicting 3,500 dollars after one year
    { id: "D", text: "$V = 2{,}500(1.4)^t$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Compound Interest**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Divide consecutive fund values: $2{,}600 \\div 2{,}500 = 1.04$. A constant multiplier each year means $V = 2{,}500(1.04)^t$.\n\n**The Full Solution:**\nStep 1: At $t = 0$ the fund is worth $\\$2{,}500$, so any exponential model $V = a \\cdot b^{\\,t}$ has $a = 2{,}500$.\nStep 2: Find the yearly factor $b$ from the table. From year $0$ to year $1$, $\\frac{2{,}600}{2{,}500} = 1.04$; from year $1$ to year $2$, $\\frac{2{,}704}{2{,}600} = 1.04$. The same factor applies each year, so $b = 1.04$.\nStep 3: Check the model against the last row: $2{,}500(1.04)^2 = 2{,}500(1.0816) = 2{,}704$, exactly the recorded value. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($V = 2{,}500 + 100t$): the first year does rise by $\\$100$, but a fixed yearly amount predicts $2{,}500 + 100(2) = \\$2{,}700$ at $t = 2$, while the table shows $\\$2{,}704$. The extra $\\$4$ is interest earned on interest.\n* Choice B ($V = 2{,}500(0.04)^t$): this uses the rate itself as the multiplier and predicts $2{,}500(0.04) = \\$100$ after one year, a fund that nearly vanishes.\n* Choice D ($V = 2{,}500(1.4)^t$): a decimal slip turns a $4\\%$ rate into a $40\\%$ rate and predicts $2{,}500(1.4) = \\$3{,}500$ after one year.\n\n**Test Day Takeaway:** When a table of values grows by a constant ratio rather than a constant amount, the model is exponential. Divide neighbouring values to get the factor, and remember that the factor is $1 + r$, never $r$ alone.",
  skills: ["exponential-functions"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A denim gusset is cut so that its hypotenuse is $25$ centimeters and its shorter leg is $7$ centimeters. Let $w$ be the acute angle formed where those two edges meet. What is the value of $\\tan w$?",
  choices: [
    // distractor: reports cos w = 7/25 instead of the tangent
    { id: "A", text: "$\\dfrac{7}{25}$" },
    // distractor: finds the tangent of the other acute angle, 7/24
    { id: "B", text: "$\\dfrac{7}{24}$" },
    // distractor: reports sin w = 24/25, using the hypotenuse where the adjacent leg belongs
    { id: "C", text: "$\\dfrac{24}{25}$" },
    { id: "D", text: "$\\dfrac{24}{7}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The missing leg is $24$, since $7$-$24$-$25$ is a Pythagorean triple. Angle $w$ has the $7$ cm leg adjacent and the $24$ cm leg opposite, so $\\tan w = \\frac{24}{7}$.\n\n**The Full Solution:**\nStep 1: The hypotenuse is $25$ and one leg is $7$, so the other leg $b$ satisfies $7^2 + b^2 = 25^2$. Then $b^2 = 625 - 49 = 576$, so $b = 24$, and $7$ is indeed the shorter leg.\nStep 2: Angle $w$ sits where the hypotenuse meets the $7$ cm leg. Measured from $w$, the $7$ cm leg is adjacent and the $24$ cm leg is opposite, so $\\tan w = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{24}{7}$.\nStep 3: Check against the other two ratios: $\\sin w = \\frac{24}{25}$ and $\\cos w = \\frac{7}{25}$, and $\\frac{24/25}{7/25} = \\frac{24}{7}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{7}{25}$): this is adjacent over hypotenuse — that is $\\cos w$, not $\\tan w$.\n* Choice B ($\\frac{7}{24}$): this is the tangent of the *other* acute angle, the one where the $24$ cm leg meets the hypotenuse.\n* Choice C ($\\frac{24}{25}$): this is opposite over hypotenuse — that is $\\sin w$. Tangent never uses the hypotenuse.\n\n**Test Day Takeaway:** Label the sides from the angle named in the question before writing any ratio. The hypotenuse always lies opposite the right angle, and tangent is the one ratio that ignores it.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A patient's daily dose of a medication starts at $12$ milligrams and is increased by $4$ milligrams each day after the first. What is the least number of days after the start for which the daily dose is at least $75$ milligrams?",
  choices: [
    // distractor: truncates 15.75 to 15 instead of rounding up, and 12 + 4(15) = 72 is below 75
    { id: "A", text: "$15$" },
    { id: "B", text: "$16$" },
    // distractor: ignores the 12 mg starting dose and solves 4d >= 75, giving d >= 18.75 and d = 19
    { id: "C", text: "$19$" },
    // distractor: adds the starting dose instead of subtracting it, solving 4d >= 87 and rounding 21.75 up to 22
    { id: "D", text: "$22$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The dose after $d$ days is $12 + 4d$. Solving $12 + 4d \\ge 75$ gives $d \\ge 15.75$, and the least whole number of days that clears that bar is $16$.\n\n**The Full Solution:**\nStep 1: Write the dose. Day $0$ is $12$ mg, and each later day adds $4$ mg, so after $d$ days the dose is $12 + 4d$ milligrams.\nStep 2: Set up and solve the inequality $12 + 4d \\ge 75$. Subtracting gives $4d \\ge 63$, so $d \\ge 15.75$. Days are whole numbers, and $d$ must be *at least* $15.75$, so the least value is $d = 16$.\nStep 3: Check both sides of the boundary: at $d = 16$ the dose is $12 + 64 = 76 \\ge 75$, and at $d = 15$ it is $12 + 60 = 72 < 75$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): dropping the decimal part of $15.75$ instead of rounding up. Day $15$ reaches only $72$ mg, short of the target.\n* Choice C ($19$): forgetting the $12$ mg the patient already receives and solving $4d \\ge 75$, which gives $d \\ge 18.75$.\n* Choice D ($22$): moving the $12$ to the wrong side, solving $4d \\ge 87$ and rounding $21.75$ up to $22$ — six days later than necessary.\n\n**Test Day Takeaway:** For a \"least number of\" question, solve the inequality first, then round in the direction the inequality demands: round **up** for \"at least,\" down for \"at most.\" Always test the integer on each side of the boundary.",
  skills: ["inequalities"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For a fabric mill, the daily profit, in dollars, from finishing $x$ bolts of upholstery cloth is modeled by $P(x) = -2x^2 + 114x - 1{,}080$ for $x \\ge 0$. Which inequality gives all values of $x$ for which the mill's daily profit is positive?",
  choices: [
    { id: "A", text: "$12 < x < 45$" },
    // distractor: replaces the larger zero 45 with 57, the sum of the two zeros
    { id: "B", text: "$12 < x < 57$" },
    // distractor: selects the outside intervals, where the downward parabola is below the x-axis and the profit is negative
    { id: "C", text: "$x < 12$ or $x > 45$" },
    // distractor: keeps only the branch beyond the larger zero, where P(x) is already negative
    { id: "D", text: "$x > 45$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Factor: $P(x) = -2(x - 12)(x - 45)$. A downward parabola is above the $x$-axis strictly between its zeros, so the profit is positive for $12 < x < 45$.\n\n**The Full Solution:**\nStep 1: Find the zeros. Setting $-2x^2 + 114x - 1{,}080 = 0$ and dividing by $-2$ gives $x^2 - 57x + 540 = 0$. Since $12 \\cdot 45 = 540$ and $12 + 45 = 57$, the zeros are $x = 12$ and $x = 45$.\nStep 2: Decide which side is positive. The leading coefficient $-2$ is negative, so the parabola opens downward: it lies above the $x$-axis between the zeros and below it outside them.\nStep 3: Check an interior value and an exterior one. At $x = 30$, $P(30) = -1{,}800 + 3{,}420 - 1{,}080 = 540 > 0$; at $x = 50$, $P(50) = -5{,}000 + 5{,}700 - 1{,}080 = -380 < 0$. So the profit is positive exactly on $12 < x < 45$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($12 < x < 57$): $57$ is the *sum* of the zeros (it comes from $-\\frac{b}{a}$ after dividing), not a zero itself. At $x = 50$ the profit is already $-\\$380$.\n* Choice C ($x < 12$ or $x > 45$): this is the correct answer to the opposite question. Outside the zeros a downward parabola is negative, which here means the mill loses money.\n* Choice D ($x > 45$): finishing more than $45$ bolts pushes $P(x)$ below zero, so this interval is exactly where the mill should not operate.\n\n**Test Day Takeaway:** For a quadratic inequality, factor to the zeros, then let the sign of the leading coefficient decide which side is positive: downward parabolas are positive *between* their zeros, upward parabolas *outside* them.",
  skills: ["quadratics"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An infusion bag holds $f(t) = 750 - 12.5t$ milliliters of fluid $t$ minutes after an infusion begins, and the bag is empty at $t = 60$. At minute $a$ the bag holds twice as much fluid as it does at minute $a + 20$. What is the value of $a$?",
  choices: [
    { id: "A", text: "$20$" },
    // distractor: drops the 20-minute shift and solves f(a) = 2f(a), i.e. f(a) = 0, the minute the bag empties
    { id: "B", text: "$60$" },
    // distractor: applies the factor 2 to the wrong side, solving 2f(a) = f(a + 20) and getting 80
    { id: "C", text: "$80$" },
    // distractor: computes f(a + 20) as 1000 - 12.5a, adding the 250 mL change instead of subtracting it
    { id: "D", text: "$100$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Twenty minutes drains $12.5(20) = 250$ mL, so $f(a + 20) = f(a) - 250$. Then $f(a) = 2\\big(f(a) - 250\\big)$ gives $f(a) = 500$, and $750 - 12.5a = 500$ gives $a = 20$.\n\n**The Full Solution:**\nStep 1: Write both volumes in terms of $a$. $f(a) = 750 - 12.5a$, and $f(a + 20) = 750 - 12.5(a + 20) = 750 - 12.5a - 250 = 500 - 12.5a$.\nStep 2: Translate the condition. \"Twice as much at minute $a$ as at minute $a + 20$\" means $750 - 12.5a = 2(500 - 12.5a)$, so $750 - 12.5a = 1{,}000 - 25a$ and $12.5a = 250$, giving $a = 20$.\nStep 3: Check with the actual volumes: $f(20) = 750 - 250 = 500$ mL and $f(40) = 750 - 500 = 250$ mL, and $500 = 2(250)$. $\\checkmark$ Both minutes come before the bag empties at $t = 60$, so the answer is physically possible.\n\n**Why the wrong answers are tempting:**\n* Choice B ($60$): dropping the $+20$ turns the condition into $f(a) = 2f(a)$, which forces $f(a) = 0$ — the minute the bag runs dry, not the minute asked about.\n* Choice C ($80$): putting the $2$ on the wrong side gives $2(750 - 12.5a) = 500 - 12.5a$, so $1{,}000 = 12.5a$ and $a = 80$. That would also be after the bag is empty.\n* Choice D ($100$): treating the $20$-minute shift as $+250$ mL gives $750 - 12.5a = 2(1{,}000 - 12.5a)$, so $12.5a = 1{,}250$ and $a = 100$. A draining bag holds *less* later, not more.\n\n**Test Day Takeaway:** When a condition compares $f(a)$ with $f(a + h)$, substitute $a + h$ into the rule before writing the equation. For a linear rule the shift is a fixed amount — here $-250$ mL — and that single substitution removes every sign trap.",
  skills: ["function-notation"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For a clinical study, blood-glucose deviation from a target level, in milligrams per deciliter, is modeled by a quadratic function $f$ of the time $t$, in hours, after a meal. The table gives three of the modeled deviations. The deviation is zero at two times. How many hours apart are those two times?",
  questionTable: { headers: ["Time $t$ (hours)", "Deviation $f(t)$ (mg/dL)"], rows: [["$0$", "$12$"], ["$2$", "$-8$"], ["$4$", "$-12$"]] },
  choices: [
    // distractor: halves the gap, giving the distance 2.5 from the axis of symmetry to one zero rather than between the two zeros
    { id: "A", text: "$2.5$" },
    { id: "B", text: "$5$" },
    // distractor: adds the two times, 1 + 6 = 7, instead of subtracting them
    { id: "C", text: "$7$" },
    // distractor: computes the square root of the discriminant, 10, and forgets to divide by the leading coefficient 2
    { id: "D", text: "$10$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The table forces $f(t) = 2t^2 - 14t + 12 = 2(t - 1)(t - 6)$. The deviation is zero at $t = 1$ and $t = 6$, which are $5$ hours apart.\n\n**The Full Solution:**\nStep 1: Write $f(t) = At^2 + Bt + C$. From $f(0) = 12$, $C = 12$. From $f(2) = -8$: $4A + 2B + 12 = -8$, so $2A + B = -10$. From $f(4) = -12$: $16A + 4B + 12 = -12$, so $4A + B = -6$.\nStep 2: Subtract the two relations: $(4A + B) - (2A + B) = -6 - (-10)$ gives $2A = 4$, so $A = 2$ and then $B = -14$. The model is $f(t) = 2t^2 - 14t + 12$.\nStep 3: Solve $2t^2 - 14t + 12 = 0$. Dividing by $2$ gives $t^2 - 7t + 6 = 0$, so $(t - 1)(t - 6) = 0$ and $t = 1$ or $t = 6$; the gap is $6 - 1 = 5$ hours. Check the true solution $t = 6$ in the original model: $2(36) - 14(6) + 12 = 72 - 84 + 12 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.5$): the axis of symmetry sits at $t = 3.5$, which is $2.5$ from each zero. That is half the gap, not the gap.\n* Choice C ($7$): $1 + 6 = 7$ is the *sum* of the two times (and equals $-\\frac{B}{A}$ after dividing). \"How far apart\" asks for the difference.\n* Choice D ($10$): $\\sqrt{B^2 - 4AC} = \\sqrt{196 - 96} = 10$ is the numerator of the gap formula; the gap is $\\frac{10}{A} = \\frac{10}{2} = 5$.\n\n**Test Day Takeaway:** Three points pin down a quadratic — build the coefficients with a small system, then read the zeros from the factored form. The gap between the zeros is $\\frac{\\sqrt{b^2 - 4ac}}{|a|}$, never the bare square root.",
  skills: ["quadratics"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A vial-filling line rejects vials at a rate modeled by $r(h) = 3h^2 - 18h + 31$, in vials per hour, where $h$ is the number of hours after startup. For how many values of $h$ is the reject rate exactly $2$ vials per hour?",
  choices: [
    { id: "A", text: "No values of $h$" },
    // distractor: aims at the model's lowest rate, 4 vials per hour, instead of 2; r(h) = 4 is the equation with exactly one solution
    { id: "B", text: "Exactly one value of $h$" },
    // distractor: assumes a quadratic model must meet every horizontal line twice
    { id: "C", text: "Exactly two values of $h$" },
    // distractor: reads a negative discriminant as meaning every h works rather than none
    { id: "D", text: "Infinitely many values of $h$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Setting $r(h) = 2$ gives $3h^2 - 18h + 29 = 0$, whose discriminant is $(-18)^2 - 4(3)(29) = 324 - 348 = -24$. A negative discriminant means no real $h$ works.\n\n**The Full Solution:**\nStep 1: Translate the question into an equation: $3h^2 - 18h + 31 = 2$, which rearranges to $3h^2 - 18h + 29 = 0$.\nStep 2: Compute the discriminant of that equation: $b^2 - 4ac = (-18)^2 - 4(3)(29) = 324 - 348 = -24$. Because it is negative, the equation has no real solutions.\nStep 3: Check against the model itself. The lowest rate occurs at $h = -\\frac{-18}{2(3)} = 3$, where $r(3) = 27 - 54 + 31 = 4$. The line never drops below $4$ vials per hour, so a rate of $2$ is never reached. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (exactly one value of $h$): $r(h) = 4$ — the model's minimum — is the equation with a single solution, $h = 3$. The question asks about $2$, not $4$.\n* Choice C (exactly two values of $h$): true only when the horizontal line sits above the minimum. Here it sits below the whole curve, so it meets the curve nowhere.\n* Choice D (infinitely many values of $h$): \"no real solutions\" is the opposite of \"all real solutions.\" A quadratic equals a given constant for at most two values of the variable.\n\n**Test Day Takeaway:** Move everything to one side first, then read the discriminant: negative means none, zero means one, positive means two. A quick check of the vertex value confirms the verdict.",
  skills: ["discriminant-analysis"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A quantity is written as $\\dfrac{9^{2x} \\cdot 3^{x-4}}{27^{x+1}}$ and also as $3^{k}$, and the two forms agree for every value of $x$. Which expression gives $k$ in terms of $x$?",
  choices: [
    { id: "A", text: "$2x - 7$" },
    // distractor: rewrites 27^(x+1) as 3^(3x+1), multiplying only the x by 3 and leaving the +1 alone
    { id: "B", text: "$2x - 5$" },
    // distractor: rewrites 3^(x-4) as 3^(x+4), flipping the sign of the -4
    { id: "C", text: "$2x + 1$" },
    // distractor: adds the denominator's exponent instead of subtracting it, giving 4x + (x-4) + (3x+3)
    { id: "D", text: "$8x - 1$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Rewrite everything base $3$: $3^{4x} \\cdot 3^{x-4} \\div 3^{3x+3}$. Combine exponents: $4x + (x - 4) - (3x + 3) = 2x - 7$.\n\n**The Full Solution:**\nStep 1: Convert each power to base $3$. Since $9 = 3^2$, $9^{2x} = 3^{4x}$; since $27 = 3^3$, $27^{x+1} = 3^{3(x+1)} = 3^{3x+3}$. The middle factor is already base $3$.\nStep 2: Multiply by adding exponents and divide by subtracting them: $k = 4x + (x - 4) - (3x + 3) = 5x - 4 - 3x - 3 = 2x - 7$.\nStep 3: Check with a convenient value, $x = 2$: the original is $\\frac{9^4 \\cdot 3^{-2}}{27^3} = \\frac{6{,}561 \\cdot \\frac{1}{9}}{19{,}683} = \\frac{729}{19{,}683} = \\frac{1}{27} = 3^{-3}$, and $2(2) - 7 = -3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($2x - 5$): distributing the $3$ over only part of $x + 1$ gives $27^{x+1} = 3^{3x+1}$, and $4x + (x - 4) - (3x + 1) = 2x - 5$. The exponent of a power of a power multiplies the *whole* exponent.\n* Choice C ($2x + 1$): reading $3^{x-4}$ as $3^{x+4}$ gives $4x + (x + 4) - (3x + 3) = 2x + 1$.\n* Choice D ($8x - 1$): adding the denominator's exponent gives $4x + (x - 4) + (3x + 3) = 8x - 1$. Division subtracts exponents.\n\n**Test Day Takeaway:** Force every base to match before touching the exponents, and distribute across the full exponent when rewriting $a^{m(x+n)}$. Then multiplication adds, division subtracts.",
  skills: ["exponent-laws"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "In grading a jacket up one size, every measurement is multiplied by $\\left(32x^{15}\\right)^{\\frac{2}{5}}$, where $x > 0$. Which of the following is equivalent to that multiplier?",
  choices: [
    // distractor: takes the fifth root of 32 but never squares it, giving 2 instead of 4
    { id: "A", text: "$2x^{6}$" },
    { id: "B", text: "$4x^{6}$" },
    // distractor: multiplies the exponent 15 by 2 and never divides by 5, giving x^30
    { id: "C", text: "$4x^{30}$" },
    // distractor: squares 32 first and never takes the fifth root, giving 1,024
    { id: "D", text: "$1{,}024x^{6}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $32 = 2^5$, so $32^{2/5} = 2^2 = 4$, and $\\left(x^{15}\\right)^{2/5} = x^{6}$. The multiplier is $4x^{6}$.\n\n**The Full Solution:**\nStep 1: Distribute the exponent across the product: $\\left(32x^{15}\\right)^{\\frac{2}{5}} = 32^{\\frac{2}{5}} \\cdot \\left(x^{15}\\right)^{\\frac{2}{5}}$.\nStep 2: Handle the number. A fractional exponent $\\frac{2}{5}$ means \"fifth root, then square\": $\\sqrt[5]{32} = 2$ and $2^2 = 4$.\nStep 3: Handle the variable by multiplying exponents: $15 \\cdot \\frac{2}{5} = 6$, so $\\left(x^{15}\\right)^{\\frac{2}{5}} = x^{6}$, and the multiplier is $4x^{6}$. Check at $x = 1$: $\\left(32\\right)^{\\frac{2}{5}} = 4$ and $4(1)^6 = 4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x^{6}$): $\\sqrt[5]{32} = 2$ is only half the job; the numerator $2$ of the exponent still squares it to $4$.\n* Choice C ($4x^{30}$): multiplying $15$ by $2$ and forgetting to divide by $5$. A fractional exponent multiplies by the whole fraction, not just its numerator.\n* Choice D ($1{,}024x^{6}$): squaring $32$ to $1{,}024$ and stopping. The denominator $5$ still asks for a fifth root, and $\\sqrt[5]{1{,}024} = 4$.\n\n**Test Day Takeaway:** Read $a^{m/n}$ as \"$n$th root, then $m$th power,\" and apply the exponent to every factor inside the parentheses. Taking the root first keeps the arithmetic small.",
  skills: ["exponent-rules", "radical-expressions"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Each dot in the plot stands for one of the $11$ guests who checked into a coastal hostel on one day, placed at the number of nights that guest booked. Which statement about these data is true?",
  diagram: { type: "dotPlot", params: { data: [{ value: 2, count: 2 }, { value: 3, count: 3 }, { value: 4, count: 1 }, { value: 5, count: 2 }, { value: 7, count: 1 }, { value: 9, count: 1 }, { value: 12, count: 1 }], xMin: 1, xMax: 13, xLabel: "Nights booked" } },
  choices: [
    // distractor: swaps the two measures: 3 is the most frequent value and 4 is the middle value, not the reverse
    { id: "A", text: "The mode is $4$ and the median is $3$." },
    // distractor: reports the mean, 5, in place of the median
    { id: "B", text: "The mode is $3$ and the median is $5$." },
    { id: "C", text: "The mode is $3$ and the median is $4$." },
    // distractor: counts the two dots at 5 as the tallest stack, overlooking the three dots at 3
    { id: "D", text: "The mode is $5$ and the median is $4$." }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The tallest stack sits at $3$, so the mode is $3$. With $11$ values, the median is the $6$th from the left, which is $4$.\n\n**The Full Solution:**\nStep 1: Read the counts off the plot: $2$ appears twice, $3$ appears three times, $4$ once, $5$ twice, and $7$, $9$, and $12$ once each. That is $2 + 3 + 1 + 2 + 1 + 1 + 1 = 11$ guests, as stated.\nStep 2: The mode is the value that occurs most often. No value occurs more than three times, and only $3$ occurs three times, so the mode is $3$.\nStep 3: The median of $11$ ordered values is the $6$th. Counting from the left, positions $1$-$2$ are $2$, positions $3$-$5$ are $3$, and position $6$ is $4$, so the median is $4$. Check by counting from the right: positions $11$ down to $7$ are $12, 9, 7, 5, 5$, and position $6$ is again $4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (mode $4$, median $3$): the two statistics are switched. Only one dot sits at $4$, so $4$ cannot be the most frequent value.\n* Choice B (mode $3$, median $5$): $5$ is the *mean* here ($\\frac{55}{11} = 5$), pulled up by the guest who booked $12$ nights. The median ignores how far the outliers reach.\n* Choice D (mode $5$, median $4$): the median is right, but $5$ carries only two dots against three at $3$.\n\n**Test Day Takeaway:** On a dot plot the mode is the tallest stack and the median is found by counting dots, not by scanning the axis. With an odd count $n$, the median sits at position $\\frac{n+1}{2}$.",
  skills: ["find-mode"]
},
{
  id: 11,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The polynomial function $p$ satisfies $p(x) = x^3 + ax^2 + bx + 30$ for constants $a$ and $b$, and $p$ has three distinct real zeros. The table gives the value of $p$ at four inputs, two of which are zeros of $p$. What is the value of the third zero?",
  questionTable: { headers: ["$x$", "$p(x)$"], rows: [["$-2$", "$0$"], ["$1$", "$24$"], ["$2$", "$12$"], ["$3$", "$0$"]] },
  correctAnswer: "5",
  explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~30s):** The table shows $p(-2) = 0$ and $p(3) = 0$, so $p(x) = (x + 2)(x - 3)(x - r)$. Its constant term is $(2)(-3)(-r) = 6r$, and that must equal $30$, so $r = 5$.\n\n**The Full Solution:**\nStep 1: Identify the known zeros. A zero is an input where the output is $0$, so the rows $p(-2) = 0$ and $p(3) = 0$ give the zeros $-2$ and $3$. The rows $p(1) = 24$ and $p(2) = 12$ are nonzero, so those inputs are not zeros.\nStep 2: Because $p$ is a cubic with leading coefficient $1$ and three distinct real zeros, it factors as $p(x) = (x + 2)(x - 3)(x - r)$, where $r$ is the third zero.\nStep 3: Match the constant terms. Setting $x = 0$ gives $p(0) = (2)(-3)(-r) = 6r$, and the rule gives $p(0) = 30$. So $6r = 30$ and $r = 5$. Check the whole polynomial: $(x + 2)(x - 3)(x - 5) = x^3 - 6x^2 - x + 30$, and $p(1) = 1 - 6 - 1 + 30 = 24$, matching the table. $\\checkmark$\n\n**Common Mistakes:** Entering $-5$ (writing the constant term as $-6r$ and solving $-6r = 30$, a sign slip in $(2)(-3)(-r)$); entering $15$ (dividing out only the factor $x + 2$ to get $x^2 - 8x + 15$ and reporting its constant term, which is the product of the two remaining zeros, not a zero itself); entering $30$ (reporting the constant term of the rule instead of the missing zero).\n\n**Test Day Takeaway:** A table row with output $0$ hands you a factor. Once every factor but one is known, the constant term of the product pins the last zero down in one step — no long division needed.",
  skills: ["finding-roots-factoring"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A textile lab models the color intensity of a dyed swatch after $n$ industrial washes by $I(n) = 92(0.7)^{n/5}$. The intensity decreases by $p\\%$ every $5$ washes. What is the value of $p$?",
  correctAnswer: "30",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~20s):** Every $5$ washes the exponent $\\frac{n}{5}$ rises by $1$, so the intensity is multiplied by $0.7$. Keeping $70\\%$ means losing $30\\%$.\n\n**The Full Solution:**\nStep 1: Find the block of washes tied to one factor of $0.7$. Replacing $n$ with $n + 5$ raises the exponent from $\\frac{n}{5}$ to $\\frac{n}{5} + 1$, so $I(n + 5) = 0.7 \\cdot I(n)$.\nStep 2: Convert the multiplier to a percent change. A factor of $0.7$ means the new intensity is $70\\%$ of the old one, so the decrease is $100\\% - 70\\% = 30\\%$, giving $p = 30$.\nStep 3: Check with numbers: $I(0) = 92$ and $I(5) = 92(0.7)^1 = 64.4$. The drop is $92 - 64.4 = 27.6$, and $\\frac{27.6}{92} = 0.30$. $\\checkmark$\n\n**Common Mistakes:** Entering $70$ (reporting the fraction of intensity that remains rather than the percent lost); entering $7$ (finding the per-wash decrease, $1 - 0.7^{1/5} \\approx 0.069$, when the question asks about a $5$-wash block); entering $6$ (dividing the correct $30\\%$ by the $5$ washes, as if percent decreases add).\n\n**Test Day Takeaway:** In $a \\cdot b^{\\,n/c}$, the base $b$ describes one block of $c$ units, not one unit. Convert the base to a percent by comparing it with $1$: $b = 0.7$ is a $30\\%$ decrease, $b = 1.3$ a $30\\%$ increase.",
  skills: ["exponential-growth-decay"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For a chartered coach tour, the numbers of adult tickets $a$ and student tickets $s$ sold satisfy $18a + 12s = 540$. Every ordered pair $(a, s)$ that satisfies that equation also satisfies $ka + 8s = 360$, where $k$ is a constant. What is the value of $k$?",
  choices: [
    // distractor: copies the student-ticket coefficient 8 into k, as if the two coefficients in an equation must match
    { id: "A", text: "$8$" },
    { id: "B", text: "$12$" },
    // distractor: assumes the adult-ticket coefficient 18 survives the rescaling unchanged
    { id: "C", text: "$18$" },
    // distractor: uses the reciprocal scale factor 3/2 instead of 2/3, giving 18(3/2) = 27
    { id: "D", text: "$27$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** If every solution of the first equation solves the second, the two are the same equation rescaled. The student-ticket coefficient went from $12$ to $8$, a factor of $\\frac{2}{3}$, so $k = 18 \\cdot \\frac{2}{3} = 12$.\n\n**The Full Solution:**\nStep 1: Two linear equations in $a$ and $s$ share every solution only when one is a nonzero multiple of the other. Let that multiplier be $m$, so $18m = k$, $12m = 8$, and $540m = 360$.\nStep 2: Solve for $m$ two ways and confirm they agree: $12m = 8$ gives $m = \\frac{2}{3}$, and $540m = 360$ gives $m = \\frac{360}{540} = \\frac{2}{3}$ as well. The scaling is consistent, so such a $k$ exists.\nStep 3: Apply the multiplier to the first coefficient: $k = 18 \\cdot \\frac{2}{3} = 12$. Check a solution of the first equation, $(a, s) = (10, 30)$: $18(10) + 12(30) = 540$ $\\checkmark$, and $12(10) + 8(30) = 120 + 240 = 360$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): borrowing the $8$ from the student-ticket term. Then $8(10) + 8(30) = 320 \\ne 360$, so the pair $(10, 30)$ fails.\n* Choice C ($18$): leaving the adult coefficient alone while the rest of the equation shrinks. Then $18(10) + 8(30) = 420 \\ne 360$.\n* Choice D ($27$): scaling in the wrong direction with $\\frac{3}{2}$. The second equation is smaller than the first, so its coefficients must shrink, not grow.\n\n**Test Day Takeaway:** \"Every solution of one is a solution of the other\" means the equations are proportional. Find the multiplier from a term you can see, then confirm it on the constant before applying it to the unknown coefficient.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Junctions $A$, $B$, and $C$ on a hiking trail network form a triangular loop, and the trail leaving $B$ passes through $C$ and continues straight to a lookout at $D$. Angle $ACD$ measures $(4x + 6)^\\circ$, angle $A$ measures $(x + 30)^\\circ$, and angle $B$ measures $(2x - 4)^\\circ$. What is the measure, in degrees, of angle $ACB$?",
  choices: [
    // distractor: reports x = 20 instead of substituting it back into an angle expression
    { id: "A", text: "$20$" },
    // distractor: reports angle A, (20) + 30 = 50 degrees, rather than the angle at C inside the loop
    { id: "B", text: "$50$" },
    // distractor: reports angle ACD, 4(20) + 6 = 86 degrees, the angle outside the loop, instead of its supplement
    { id: "C", text: "$86$" },
    { id: "D", text: "$94$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Angle $ACD$ is the exterior angle at $C$, so it equals the two remote interior angles: $4x + 6 = (x + 30) + (2x - 4)$, giving $x = 20$ and angle $ACD = 86^\\circ$. Then angle $ACB = 180^\\circ - 86^\\circ = 94^\\circ$.\n\n**The Full Solution:**\nStep 1: Because $B$, $C$, and $D$ lie on one straight trail, angle $ACB$ and angle $ACD$ are supplementary, and angle $ACD$ is an exterior angle of triangle $ABC$. An exterior angle equals the sum of the two interior angles not next to it, so $4x + 6 = (x + 30) + (2x - 4)$.\nStep 2: Solve: $4x + 6 = 3x + 26$, so $x = 20$. That makes angle $A = 50^\\circ$, angle $B = 36^\\circ$, and angle $ACD = 86^\\circ$.\nStep 3: Take the supplement: angle $ACB = 180^\\circ - 86^\\circ = 94^\\circ$. Check the interior angles of the loop: $50 + 36 + 94 = 180$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): $x = 20$ is only the intermediate value. Every angle in this problem still needs $x$ substituted into its expression.\n* Choice B ($50$): angle $A$, not the angle at junction $C$. Naming the vertex letters in order — $ACB$ has its vertex at $C$ — keeps the target straight.\n* Choice C ($86$): angle $ACD$ points away from the loop, toward the lookout. The angle inside the loop is its supplement.\n\n**Test Day Takeaway:** When a side is extended, the exterior angle equals the sum of the two remote interior angles — that single equation solves for the variable faster than the three-angle sum. Then check which angle the question actually names before answering.",
  skills: ["triangle-angle-sum"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A curved hem on a skirt panel is laid out along $y = x^2 - 8x + 21$, and a straight binding tape is laid along $y = 2x + b$ for some constant $b$. The tape touches the hem at one point and stays below it elsewhere. What is the value of $b$?",
  correctAnswer: "-4",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $-4$.**\n\n**The Fast Way (~25s):** Setting the two rules equal gives $x^2 - 10x + (21 - b) = 0$. One touch point means one real solution, so $100 - 4(21 - b) = 0$ and $b = -4$.\n\n**The Full Solution:**\nStep 1: A point on both paths satisfies $x^2 - 8x + 21 = 2x + b$. Moving the line's terms across gives $x^2 - 10x + (21 - b) = 0$.\nStep 2: Touching at exactly one point means that quadratic has exactly one real solution, so its discriminant is zero: $(-10)^2 - 4(1)(21 - b) = 0$, which is $100 - 84 + 4b = 0$, so $4b = -16$ and $b = -4$.\nStep 3: Check the true value. With $b = -4$ the equation becomes $x^2 - 10x + 25 = 0$, that is $(x - 5)^2 = 0$, so the single contact point is at $x = 5$. There the hem is at $25 - 40 + 21 = 6$ and the tape is at $2(5) - 4 = 6$ — the same height. $\\checkmark$\n\n**Common Mistakes:** Entering $4$ (solving $4b = -16$ as $b = 4$, a sign slip); entering $12$ (adding $2x$ to the quadratic instead of subtracting it, which gives $x^2 - 6x + 21 - b = 0$ and then $4b - 48 = 0$); entering $46$ (using $B^2 + 4AC$ in place of $B^2 - 4AC$, which gives $100 + 84 - 4b = 0$).\n\n**Test Day Takeaway:** \"Touches at exactly one point\" is the discriminant condition in disguise. Subtract one equation from the other, set $b^2 - 4ac = 0$, and solve for the constant — then confirm the repeated root by factoring the perfect square.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The drawn line contains the two marked points. For exactly one constant $n$, no ordered pair $(x, y)$ satisfies both $y = (n^2 - 2n)x + 4n - 4$ and the equation of that line. What is the value of $n$?",
  diagram: { type: "linearGraph", params: { slope: 3, yIntercept: 8, xRange: [-2, 6], yRange: [0, 26], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showPoints: [[0, 8], [4, 20]] } },
  choices: [
    // distractor: reports the second line's y-intercept at n = -1, namely 4(-1) - 4 = -8, instead of n itself
    { id: "A", text: "$-8$" },
    { id: "B", text: "$-1$" },
    // distractor: the other root of n^2 - 2n = 3, which also makes 4n - 4 equal 8, so the two equations describe the same line and share every point
    { id: "C", text: "$3$" },
    // distractor: matches n^2 - 2n to the drawn line's y-intercept 8 instead of its slope 3, solving n^2 - 2n = 8 and taking the positive root
    { id: "D", text: "$4$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The drawn line is $y = 3x + 8$. Equal slopes need $n^2 - 2n = 3$, so $n = 3$ or $n = -1$; $n = 3$ rebuilds the same line, so only $n = -1$ leaves no shared point.\n\n**The Full Solution:**\nStep 1: Read the drawn line from its two marked points, $(0, 8)$ and $(4, 20)$. Its slope is $\\frac{20 - 8}{4 - 0} = 3$ and its $y$-intercept is $8$, so the line is $y = 3x + 8$.\nStep 2: Two lines have no point in common exactly when their slopes are equal and their $y$-intercepts are not. Equal slopes require $n^2 - 2n = 3$, that is $n^2 - 2n - 3 = 0$, so $(n - 3)(n + 1) = 0$ and $n = 3$ or $n = -1$.\nStep 3: Test the intercepts of those two candidates. At $n = 3$ the constant is $4(3) - 4 = 8$, the drawn line's own intercept, so that equation *is* the drawn line and every point is shared. At $n = -1$ the constant is $4(-1) - 4 = -8$, and $3x + 8 = 3x - 8$ reduces to $8 = -8$, false for every $x$, so no ordered pair satisfies both. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): $-8$ is the second line's $y$-intercept once $n = -1$ is found, not the constant the question asks for.\n* Choice C ($3$): this value does make the slopes match, but it also makes $4n - 4$ equal $8$. The two equations then describe one line, which shares every point — infinitely many solutions, not none.\n* Choice D ($4$): matching $n^2 - 2n$ to the intercept $8$ instead of the slope $3$ gives $n = 4$. That line, $y = 8x + 12$, crosses the drawn line at $x = -\\frac{4}{5}$.\n\n**Test Day Takeaway:** \"No solution\" is two conditions, not one: equal slopes **and** unequal intercepts. When the slope condition is quadratic in the parameter, both roots must be tested — the root that also matches the intercept produces the same line, whose system has infinitely many solutions.",
  skills: ["system-solution-types"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Consider the equation $\\sqrt{2x + 3} = x - 6$, where $x$ is a real number. Which statement correctly describes its solutions?",
  choices: [
    { id: "A", text: "The equation has exactly one real solution, $x = 11$." },
    // distractor: keeps the candidate 3, for which the right side is -3, and discards the candidate that actually works
    { id: "B", text: "The equation has exactly one real solution, $x = 3$." },
    // distractor: squares both sides and accepts both roots of x^2 - 14x + 33 = 0 without substituting them back
    { id: "C", text: "The equation has two real solutions, $x = 3$ and $x = 11$." },
    // distractor: sees one candidate fail the check and discards the other candidate along with it
    { id: "D", text: "The equation has no real solutions." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Radical Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Squaring gives $x^2 - 14x + 33 = 0$, so $x = 3$ or $x = 11$. A square root is never negative, and $x - 6$ is negative at $x = 3$, so only $x = 11$ survives.\n\n**The Full Solution:**\nStep 1: Square both sides: $2x + 3 = (x - 6)^2 = x^2 - 12x + 36$, which rearranges to $x^2 - 14x + 33 = 0$.\nStep 2: Factor: $(x - 3)(x - 11) = 0$, so the candidates are $x = 3$ and $x = 11$. Squaring can create solutions the original equation does not have, so both must be tested.\nStep 3: Test them in the original equation. At $x = 11$: $\\sqrt{2(11) + 3} = \\sqrt{25} = 5$ and $11 - 6 = 5$, so $x = 11$ works. $\\checkmark$ At $x = 3$: $\\sqrt{2(3) + 3} = \\sqrt{9} = 3$, but $3 - 6 = -3$, and $3 \\ne -3$. So $x = 3$ is extraneous and the equation has exactly one real solution.\n\n**Why the wrong answers are tempting:**\n* Choice B ($x = 3$ only): the right candidate is thrown out and the extraneous one kept. The test is whether the right-hand side is non-negative; at $x = 3$ it equals $-3$.\n* Choice C (both $3$ and $11$): stopping after factoring. Every squaring step obliges you to substitute back.\n* Choice D (no real solutions): one failed candidate does not condemn the other. $x = 11$ satisfies the original equation exactly.\n\n**Test Day Takeaway:** Squaring a radical equation can invent roots. Solve, then substitute every candidate into the original: the side equal to the radical must come out non-negative.",
  skills: ["radical-equations"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A pharmacy stocks $10$-milligram and $25$-milligram tablets of one medication in the ratio $5$ to $3$, and it holds $8n$ tablets in all, where $n$ is a positive integer. If the pharmacy has $96$ more $10$-milligram tablets than $25$-milligram tablets, what is the value of $n$?",
  correctAnswer: "48",
  explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**The correct answer is $48$.**\n\n**The Fast Way (~20s):** The ratio parts $5$ and $3$ add to $8$, so with $8n$ tablets in total the counts are $5n$ and $3n$. Their difference is $2n = 96$, so $n = 48$.\n\n**The Full Solution:**\nStep 1: The parts of the ratio $5 : 3$ sum to $8$, and the total is $8n$ tablets. Each part is therefore worth $n$ tablets: there are $5n$ tablets of the $10$-milligram strength and $3n$ of the $25$-milligram strength.\nStep 2: Translate the comparison. \"$96$ more $10$-milligram tablets than $25$-milligram tablets\" gives $5n - 3n = 96$, so $2n = 96$ and $n = 48$.\nStep 3: Check both given facts with $n = 48$: there are $5(48) = 240$ and $3(48) = 144$ tablets, a difference of $240 - 144 = 96$ $\\checkmark$, and a total of $240 + 144 = 384 = 8(48)$. $\\checkmark$\n\n**Common Mistakes:** Entering $96$ (repeating the given difference instead of solving for $n$); entering $384$ (reporting the total number of tablets, $8n$, rather than $n$); entering $12$ (reading the $96$ as the total number of tablets and solving $8n = 96$).\n\n**Test Day Takeaway:** Write each part of a ratio as a multiple of one common unit, then translate \"how many more\" into a subtraction of those multiples. The parts-sum tells you what the unit is worth.",
  skills: ["word-problem-to-equation"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The listed nightly rate for a lakeside cabin was raised by $20\\%$ for the peak season and then cut by $15\\%$ of the raised rate for a midweek promotion. If the promotional rate is $p$ dollars, which expression gives the listed rate, in dollars, before the raise?",
  choices: [
    // distractor: reverses only the 15 percent cut and never undoes the 20 percent raise
    { id: "A", text: "$\\dfrac{p}{0.85}$" },
    { id: "B", text: "$\\dfrac{p}{1.02}$" },
    // distractor: nets the two changes into a single 5 percent increase by subtracting 15 from 20
    { id: "C", text: "$\\dfrac{p}{1.05}$" },
    // distractor: adds the multipliers 1.20 and 0.15 instead of multiplying 1.20 by 0.85
    { id: "D", text: "$\\dfrac{p}{1.35}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Successive percent changes multiply: $1.20 \\times 0.85 = 1.02$. So $p = 1.02$ times the listed rate, and the listed rate is $\\dfrac{p}{1.02}$.\n\n**The Full Solution:**\nStep 1: Call the listed rate $L$. Raising it by $20\\%$ multiplies it by $1 + 0.20 = 1.20$, giving a peak rate of $1.20L$.\nStep 2: The promotion cuts $15\\%$ **of the raised rate**, which multiplies by $1 - 0.15 = 0.85$. The promotional rate is therefore $0.85(1.20L) = 1.02L$, and this equals $p$.\nStep 3: Solve for $L$: $L = \\dfrac{p}{1.02}$. Check with a concrete listed rate of $\\$100$: the peak rate is $\\$120$, the cut is $0.15(120) = \\$18$, and the promotional rate is $\\$102$; then $\\frac{102}{1.02} = 100$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{p}{0.85}$): this undoes the promotion only. Applied to $p = 102$ it returns $120$, the peak rate, not the original listed rate.\n* Choice C ($\\frac{p}{1.05}$): subtracting the percents treats a $15\\%$ cut on $\\$120$ as if it were a $15\\%$ cut on $\\$100$. The cut is larger than that, so the net rise is $2\\%$, not $5\\%$.\n* Choice D ($\\frac{p}{1.35}$): adding $1.20$ and $0.15$ mixes a multiplier with a rate. Chained percent changes are multiplied, never added.\n\n**Test Day Takeaway:** Turn each percent change into a multiplier ($+20\\% \\to 1.20$, $-15\\% \\to 0.85$), multiply them in order, then divide the final amount by the product to walk backwards to the original.",
  skills: ["percent-of-value", "percent-word-problems"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A proportional enlargement of a triangular appliqué patch turns edges of $8$, $15$, and $17$ centimeters into a patch of perimeter $100$ centimeters. The enlarged patch's area is $k$ times the original patch's area. What is the value of $k$?",
  choices: [
    // distractor: reports the linear scale factor 100/40 = 2.5 itself, which scales lengths rather than areas
    { id: "A", text: "$2.5$" },
    // distractor: doubles the linear scale factor, 2(2.5) = 5, instead of squaring it
    { id: "B", text: "$5$" },
    { id: "C", text: "$6.25$" },
    // distractor: cubes the linear scale factor, 2.5^3 = 15.625, which is the rule for volumes of similar solids
    { id: "D", text: "$15.625$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The original perimeter is $8 + 15 + 17 = 40$ cm, so the scale factor is $\\frac{100}{40} = 2.5$. Areas of similar figures scale by the square of that factor: $2.5^2 = 6.25$.\n\n**The Full Solution:**\nStep 1: A perimeter is a sum of lengths, so it scales by the same factor every edge does. The original perimeter is $8 + 15 + 17 = 40$ cm and the enlarged perimeter is $100$ cm, so each length is multiplied by $\\frac{100}{40} = 2.5$.\nStep 2: Every length is multiplied by $2.5$, so both the base and the height of the triangle are multiplied by $2.5$, and the area — a product of two lengths — is multiplied by $2.5 \\times 2.5 = 6.25$. Hence $k = 6.25$.\nStep 3: Check with actual areas. Because $8^2 + 15^2 = 64 + 225 = 289 = 17^2$, the patch is a right triangle with area $\\frac{1}{2}(8)(15) = 60$ cm$^2$. The enlarged edges are $20$, $37.5$, and $42.5$ cm, which do sum to $100$ cm, and the enlarged area is $\\frac{1}{2}(20)(37.5) = 375$ cm$^2$, giving $\\frac{375}{60} = 6.25$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.5$): this is the ratio of the perimeters, which is the ratio of the lengths. It answers how many times longer the new edges are, not how many times larger the area is.\n* Choice B ($5$): doubling the scale factor. Area involves two perpendicular lengths, so the factor is squared, not doubled.\n* Choice D ($15.625$): cubing applies to volumes of similar solids. A flat patch has area, so the exponent is $2$.\n\n**Test Day Takeaway:** For similar figures, lengths scale by $r$, areas by $r^2$, and volumes by $r^3$. Perimeter scales like a length, so a pair of perimeters gives $r$ directly — then raise it to the power the question's dimension calls for.",
  skills: ["similar-triangles"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A parabola is drawn in the $xy$-plane with its minimum point labeled, and it rises to height $22$ where it meets the vertical axis. If the parabola is the graph of $y = f(x)$, what is $f(8)$?",
  diagram: { type: "parabola", params: { vertex: { h: 3, k: 4 }, a: 2, xRange: [0, 6], yRange: [-2, 24], xTickInterval: 1, yTickInterval: 4, gridInterval: 2, showVertex: true } },
  choices: [
    // distractor: computes 2(8 - 3) + 4 = 14, forgetting to square the difference
    { id: "A", text: "$14$" },
    // distractor: assumes a leading coefficient of 1, computing (8 - 3)^2 + 4 = 29 and never using the height 22
    { id: "B", text: "$29$" },
    // distractor: drops the +4 from the vertex form, computing 2(8 - 3)^2 = 50
    { id: "C", text: "$50$" },
    { id: "D", text: "$54$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The vertex $(3, 4)$ gives $f(x) = a(x - 3)^2 + 4$, and the point $(0, 22)$ gives $9a + 4 = 22$, so $a = 2$. Then $f(8) = 2(25) + 4 = 54$.\n\n**The Full Solution:**\nStep 1: The labeled minimum is the vertex, at $(3, 4)$, so the function can be written in vertex form as $f(x) = a(x - 3)^2 + 4$ for some constant $a$.\nStep 2: Use the second condition. The curve meets the vertical axis at $(0, 22)$, so $a(0 - 3)^2 + 4 = 22$, that is $9a = 18$ and $a = 2$. The rule is $f(x) = 2(x - 3)^2 + 4$.\nStep 3: Evaluate at $x = 8$: $f(8) = 2(8 - 3)^2 + 4 = 2(25) + 4 = 54$. Check the rule against the drawing: $f(6) = 2(6 - 3)^2 + 4 = 22$, and the curve does climb back to height $22$ at $x = 6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($14$): $2(8 - 3) + 4$ skips the square. Vertex form squares the horizontal distance from the vertex before scaling it.\n* Choice B ($29$): $(8 - 3)^2 + 4$ assumes $a = 1$. That parabola would meet the vertical axis at $13$, not $22$, so the second condition is what pins $a$ down.\n* Choice C ($50$): $2(8 - 3)^2$ leaves off the vertex height. The $+4$ lifts the whole curve.\n\n**Test Day Takeaway:** A labeled vertex plus one more point determines a parabola completely: write $a(x - h)^2 + k$ from the vertex, substitute the second point to find $a$, then evaluate. Verifying the rule at a point you can see on the graph catches sign and scale slips.",
  skills: ["vertex-form", "function-evaluation"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A triangular support bracket has a right angle, and the tangent of one of its acute angles is $\\frac{5}{12}$. The perimeter of the bracket is $k$ times the length of the side opposite that acute angle. What is the value of $k$?",
  choices: [
    // distractor: divides the perimeter by the adjacent leg, 30/12 = 2.5, instead of by the opposite leg
    { id: "A", text: "$2.5$" },
    // distractor: leaves the hypotenuse out of the perimeter, computing (5 + 12)/5 = 3.4
    { id: "B", text: "$3.4$" },
    { id: "C", text: "$6$" },
    // distractor: takes the hypotenuse to be the sum of the legs, 17, giving (5 + 12 + 17)/5 = 6.8
    { id: "D", text: "$6.8$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Tangent $\\frac{5}{12}$ makes the legs $5t$ and $12t$, so the hypotenuse is $13t$ and the perimeter is $30t$. Dividing by the opposite leg $5t$ gives $k = 6$.\n\n**The Full Solution:**\nStep 1: For an acute angle of a right triangle, tangent is opposite over adjacent. So the leg opposite the angle is $5t$ and the leg adjacent to it is $12t$, for some positive $t$.\nStep 2: Find the hypotenuse: $\\sqrt{(5t)^2 + (12t)^2} = \\sqrt{25t^2 + 144t^2} = \\sqrt{169t^2} = 13t$. The perimeter is $5t + 12t + 13t = 30t$.\nStep 3: Form the requested ratio: $k = \\frac{30t}{5t} = 6$, and the $t$ cancels, so $k$ is the same for every such bracket. Check with $t = 2$: the sides are $10$, $24$, and $26$, the perimeter is $60$, and $\\frac{60}{10} = 6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.5$): $\\frac{30t}{12t}$ divides by the adjacent leg. Tangent's numerator, $5$, is the side opposite the angle.\n* Choice B ($3.4$): $\\frac{17t}{5t}$ adds only the two legs. Perimeter includes the hypotenuse.\n* Choice D ($6.8$): $\\frac{34t}{5t}$ uses $5t + 12t = 17t$ as the hypotenuse. The hypotenuse comes from the Pythagorean theorem, $13t$, and is always shorter than the sum of the legs.\n\n**Test Day Takeaway:** A trig ratio fixes the shape but not the size, so introduce a scale $t$, build every side from it, and let $t$ cancel in the final ratio. Recognizing $5$-$12$-$13$ saves the square roots.",
  skills: ["soh-cah-toa"]
}
      ]
    }
  ]
};

export default practiceTest11;
