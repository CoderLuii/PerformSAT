// Practice Test 12 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// round-6 blueprint: M1 5E/9M/8H, domains 7/6/5/4. M2 3E/7M/12H wavy flow.
// Figure density lifted to official ~20%: M1 carries 4 diagram items
// (Q7 coordinatePoints, Q11 similarTriangles, Q12 scatterplot, Q13 twoWayTable),
// M2 carries 4 (Q1 rightTriangle, Q8 dotPlot, Q10 quadraticVertex, Q12 linearGraph).
// Numeric MC choices sorted ascending (official convention).
// Scenario families (test-12 exclusive): birding festival, quarry aggregate,
// wallpaper hanging, violin-shop repairs, cheese-shop wheels (M1);
// sign-shop vinyl, riverboat cruises, escape rooms, minigolf (M2).

export const practiceTest12 = {
  id: "practice-test-12",
  title: "Practice Test 12",
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
  question: "Peak wind gusts at four automated stations during one storm are listed in the table, in meters per second. Using $3.6$ kilometers per hour for every $1$ meter per second, convert Brantley's peak gust to kilometers per hour.",
  questionTable: { headers: ["Station", "Peak gust (m/s)"], rows: [["Aldergrove", "18"], ["Brantley", "25"], ["Coulee", "12"], ["Denman", "30"]] },
  choices: [
    // distractor: divides by the conversion factor instead of multiplying: 25 / 3.6 = 6.9
    { id: "A", text: "$6.9$" },
    // distractor: converts Aldergrove's 18 m/s instead of Brantley's 25 m/s: 18 x 3.6 = 64.8
    { id: "B", text: "$64.8$" },
    { id: "C", text: "$90$" },
    // distractor: converts Denman's 30 m/s instead of Brantley's 25 m/s: 30 x 3.6 = 108
    { id: "D", text: "$108$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice C is correct.** The Brantley row lists a peak gust of $25$ meters per second, and each meter per second is $3.6$ kilometers per hour, so the gust is $25 \\times 3.6 = 90$ kilometers per hour.\n\n**The Fast Way (~15s):** Read $25$ from the Brantley row and multiply by $3.6$ to get $90$.\n\n**The Full Solution:**\nStep 1: Find Brantley in the table. Its peak gust is $25$ meters per second, not $18$, $12$, or $30$.\nStep 2: Write the conversion as a rate whose bottom unit is the unit being replaced: $\\frac{3.6 \\text{ km/h}}{1 \\text{ m/s}}$.\nStep 3: $25 \\text{ m/s} \\times \\frac{3.6 \\text{ km/h}}{1 \\text{ m/s}} = 90 \\text{ km/h}$. Check by converting back: $90 \\div 3.6 = 25$ meters per second, exactly the table value. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6.9$): divides by the conversion factor instead of multiplying, giving $25 \\div 3.6 \\approx 6.9$. One meter per second is worth several kilometers per hour, so the number has to grow.\n* Choice B ($64.8$): converts the wrong row, Aldergrove's $18$ meters per second, giving $18 \\times 3.6 = 64.8$.\n* Choice D ($108$): converts the wrong row, Denman's $30$ meters per second, giving $30 \\times 3.6 = 108$.\n\n**Test Day Takeaway:** Set a conversion up as a fraction whose denominator carries the unit you are leaving; the units cancel and the multiply-or-divide decision is made for you.",
  skills: ["unit-conversion"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A wildlife survey found that the trumpeter swan population at a wetland reserve decreased by $20\\%$ between 2018 and 2024. If the 2024 population was $1{,}240$ swans, what was the 2018 population?",
  choices: [
    // distractor: applies the 20% decrease to the 2024 count instead of reversing it: 1240 x 0.80 = 992
    { id: "A", text: "$992$" },
    // distractor: subtracts 20 swans rather than 20 percent, so 1240 + 20 = 1260
    { id: "B", text: "$1{,}260$" },
    // distractor: increases the 2024 count by 20% instead of dividing by 0.80: 1240 x 1.20 = 1488
    { id: "C", text: "$1{,}488$" },
    { id: "D", text: "$1{,}550$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice D is correct.** A $20\\%$ decrease leaves $80\\%$ of the 2018 count, so $0.80 \\times (\\text{2018 count}) = 1{,}240$, which gives $1{,}240 \\div 0.80 = 1{,}550$ swans.\n\n**The Fast Way (~20s):** The 2024 count is $80\\%$ of the 2018 count, so divide: $1{,}240 \\div 0.8 = 1{,}550$.\n\n**The Full Solution:**\nStep 1: Let $p$ be the 2018 population. A decrease of $20\\%$ means the reserve kept $100\\% - 20\\% = 80\\%$ of it.\nStep 2: Translate: $0.80p = 1{,}240$.\nStep 3: Divide both sides by $0.80$ to get $p = 1{,}550$. Check: $20\\%$ of $1{,}550$ is $310$, and $1{,}550 - 310 = 1{,}240$, the 2024 count. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($992$): takes another $20\\%$ off the 2024 count, $1{,}240 \\times 0.80 = 992$. That moves forward in time again instead of backward.\n* Choice B ($1{,}260$): reads the $20\\%$ as $20$ swans and adds them, giving $1{,}240 + 20 = 1{,}260$. A percent is a fraction of the whole, not a count.\n* Choice C ($1{,}488$): adds $20\\%$ to the smaller number, $1{,}240 \\times 1.20 = 1{,}488$. Undoing a $20\\%$ cut requires dividing by $0.80$, not multiplying by $1.20$.\n\n**Test Day Takeaway:** To undo a percent change, divide by the multiplier that produced it; adding the same percent back always lands short.",
  skills: ["percent-word-problems", "percent-of-value"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Rebound totals for eleven games of one basketball season are plotted, one dot per game. What is the median of the eleven totals?",
  diagram: { type: "dotPlot", params: { data: [{ value: 2, count: 1 }, { value: 3, count: 1 }, { value: 4, count: 1 }, { value: 5, count: 1 }, { value: 6, count: 1 }, { value: 9, count: 3 }, { value: 10, count: 3 }], xMin: 0, xMax: 12, xLabel: "Rebounds in a game" } },
  choices: [
    // distractor: averages only the least and greatest values: (2 + 10) / 2 = 6
    { id: "A", text: "$6$" },
    // distractor: reports the mean, 77 / 11 = 7, instead of the median
    { id: "B", text: "$7$" },
    // distractor: reports the range, 10 - 2 = 8, instead of the median
    { id: "C", text: "$8$" },
    { id: "D", text: "$9$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Median Calculation**\n\n**Choice D is correct.** Read left to right the plotted totals are $2, 3, 4, 5, 6, 9, 9, 9, 10, 10, 10$; with $11$ values the median is the $6$th one, which is $9$.\n\n**The Fast Way (~20s):** Eleven dots means the median is the $6$th from either end. Counting up from the left: $2, 3, 4, 5, 6, 9$ — the median is $9$.\n\n**The Full Solution:**\nStep 1: Read the eleven totals off the plot from left to right, counting each stacked dot: $2, 3, 4, 5, 6, 9, 9, 9, 10, 10, 10$.\nStep 2: With an odd count $n = 11$, the median sits in position $\\frac{n + 1}{2} = 6$.\nStep 3: The $6$th value is $9$. Check: five totals ($2, 3, 4, 5, 6$) fall below it and five ($9, 9, 10, 10, 10$) fall at or above it, so $9$ splits the eleven games evenly. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): averages only the smallest and largest plotted values, $\\frac{2 + 10}{2} = 6$. That midpoint ignores where the other nine games actually fall.\n* Choice B ($7$): is the mean, $\\frac{77}{11} = 7$. The four low games pull the mean below the middle value.\n* Choice C ($8$): is the range, $10 - 2 = 8$, a measure of spread rather than of center.\n\n**Test Day Takeaway:** On a dot plot, count dots from the left rather than eyeballing the tallest stack; the median sits at position $\\frac{n + 1}{2}$, so a median question is a counting task, never an arithmetic one.",
  skills: ["find-median"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A snowpack survey measured depths of $2d$, $3d-4$, and $d+10$ centimeters at three stakes on one ridge. The three depths total $66$ centimeters. What is the value of $d$?",
  choices: [
    { id: "A", text: "$10$" },
    // distractor: drops the constant terms -4 and +10 and solves 6d = 66
    { id: "B", text: "$11$" },
    // distractor: adds the net constant instead of subtracting it, solving 6d = 66 + 6
    { id: "C", text: "$12$" },
    // distractor: divides the total by the number of stakes, 66 / 3, instead of by the coefficient sum
    { id: "D", text: "$22$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice A is correct.** Combining the three depths gives $2d + (3d - 4) + (d + 10) = 6d + 6$, so $6d + 6 = 66$ and $d = 10$.\n\n**The Fast Way (~20s):** The $d$ terms add to $6d$ and the constants add to $+6$, so $6d = 60$ and $d = 10$.\n\n**The Full Solution:**\nStep 1: Add the three expressions: $2d + 3d + d = 6d$, and $-4 + 10 = 6$, so the total depth is $6d + 6$.\nStep 2: Set the total equal to the measured $66$: $6d + 6 = 66$, then subtract $6$ from both sides to get $6d = 60$.\nStep 3: Divide by $6$ to get $d = 10$. Check: the stakes read $2(10) = 20$, $3(10) - 4 = 26$, and $10 + 10 = 20$ centimeters, and $20 + 26 + 20 = 66$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($11$): combines only the variable terms and solves $6d = 66$. The constants $-4$ and $+10$ are part of the total and cannot be dropped.\n* Choice C ($12$): moves the $+6$ to the right side by adding, solving $6d = 72$. Undoing $+6$ requires subtracting it.\n* Choice D ($22$): divides the total by the three stakes, $66 \\div 3$, as if each stake read the same depth $d$.\n\n**Test Day Takeaway:** Collect the variable terms and the constants separately before you touch the equals sign; the arithmetic slips happen during the combining, not the solving.",
  skills: ["combining-like-terms"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A reforestation crew models the average height of its planted firs, in meters, by $H(t) = 1.4 + 0.35t$, with $t$ the number of years since planting. Which statement best describes $0.35$?",
  choices: [
    { id: "A", text: "The predicted average height increases by $0.35$ meter for each additional year since planting." },
    // distractor: flips the sign of the slope, reading a rising model as a falling one
    { id: "B", text: "The predicted average height decreases by $0.35$ meter for each additional year since planting." },
    // distractor: swaps the input and output, reading 0.35 as years per meter instead of meters per year
    { id: "C", text: "Each additional meter of average height takes $0.35$ year." },
    // distractor: reads 0.35 as the starting value of the model instead of its rate of change; the starting value is 1.4
    { id: "D", text: "At the time of planting, the predicted average height is $0.35$ meter." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice A is correct.** In $H(t) = 1.4 + 0.35t$ the coefficient of $t$ is $0.35$, so each additional year after planting raises the predicted average height by $0.35$ meter.\n\n**The Fast Way (~15s):** The number multiplied by $t$ is the per-year change, and it is positive, so the height rises $0.35$ meter each year.\n\n**The Full Solution:**\nStep 1: Match the model to slope-intercept form: the constant $1.4$ is the value at $t = 0$ and $0.35$ is the slope.\nStep 2: Slope is output units per input unit here, meters per year, so the predicted average height changes by $0.35$ meter each year.\nStep 3: A positive coefficient means an increase. Check: $H(0) = 1.4$ and $H(4) = 1.4 + 1.4 = 2.8$ meters, a gain of $1.4$ meters across four years, which is $0.35$ meter per year. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (a $0.35$-meter drop per year): keeps the size of the slope but reverses its sign. The $+0.35t$ term is what makes the firs taller, not shorter.\n* Choice C ($0.35$ year per meter): inverts the rate, reporting years per meter rather than meters per year. The slope is always output per input.\n* Choice D ($0.35$ meter at planting): describes the starting value, which is $1.4$ meters; $0.35$ never appears as a height in this model.\n\n**Test Day Takeaway:** Read the coefficient of the input as \"output units per one input unit\", and carry its sign into the sentence before you compare choices.",
  skills: ["slope-intercept-form"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A grassland survey draws two straight transects in the xy-plane, with distances in kilometers. Transect $\\ell$ is graphed. Transect $t$ heads in exactly the same direction and includes $(-2, 5)$. An equation for transect $t$ is which of the following?",
  diagram: { type: "linearGraph", params: { slope: 1.5, yIntercept: -3, xRange: [-6, 6], yRange: [-12, 6], gridInterval: 1, xTickInterval: 2, yTickInterval: 3 } },
  choices: [
    // distractor: uses the reciprocal of the slope, 2/3 instead of 3/2, though it does pass through (-2, 5)
    { id: "A", text: "$2x - 3y = -19$" },
    { id: "B", text: "$3x - 2y = -16$" },
    // distractor: uses the opposite of the slope, -3/2 instead of 3/2, though it does pass through (-2, 5)
    { id: "C", text: "$3x + 2y = 4$" },
    // distractor: gives transect l itself, which has the right direction but misses (-2, 5)
    { id: "D", text: "$3x - 2y = 6$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice B is correct.** Transect $\\ell$ passes through $(0, -3)$ and $(2, 0)$, so its slope is $\\frac{3}{2}$; the line through $(-2, 5)$ with slope $\\frac{3}{2}$ is $y = \\frac{3}{2}x + 8$, or $3x - 2y = -16$.\n\n**The Fast Way (~30s):** Same direction means same slope $\\frac{3}{2}$, so transect $t$ has the form $3x - 2y = k$; substituting $(-2, 5)$ gives $k = -6 - 10 = -16$.\n\n**The Full Solution:**\nStep 1: Read two lattice points off the graph, $(0, -3)$ and $(2, 0)$. The slope of $\\ell$ is $\\frac{0 - (-3)}{2 - 0} = \\frac{3}{2}$.\nStep 2: Transect $t$ runs in the same direction, so it also has slope $\\frac{3}{2}$. Through $(-2, 5)$: $y - 5 = \\frac{3}{2}(x + 2)$, which simplifies to $y = \\frac{3}{2}x + 8$.\nStep 3: Clear the fraction and collect: $2y = 3x + 16$, so $3x - 2y = -16$. Check: at $(-2, 5)$, $3(-2) - 2(5) = -6 - 10 = -16$, and the coefficients $3$ and $-2$ give slope $\\frac{3}{2}$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x - 3y = -19$): passes through $(-2, 5)$ but has slope $\\frac{2}{3}$, the reciprocal of $\\frac{3}{2}$. Reading rise over run backwards produces exactly this line.\n* Choice C ($3x + 2y = 4$): also passes through $(-2, 5)$, but its slope is $-\\frac{3}{2}$; a sign slip turns a rising transect into a falling one.\n* Choice D ($3x - 2y = 6$): is transect $\\ell$ itself. It has the right direction but does not contain $(-2, 5)$, since $3(-2) - 2(5) = -16 \\neq 6$.\n\n**Test Day Takeaway:** For a line in the same direction, keep the $x$ and $y$ coefficients exactly as they are and recompute only the constant from the given point.",
  skills: ["writing-parallel-equation"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Three timing sensors at a track meet mark the vertices of a right triangle. The two acute angles of that triangle measure $(4x - 6)^\\circ$ and $(x + 21)^\\circ$. What number is $x$?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $15$.** The three angles of a triangle total $180^\\circ$, and one of them is the right angle, so the two acute angles total $90^\\circ$: $(4x - 6) + (x + 21) = 90$.\n\n**The Fast Way (~25s):** The acute angles of a right triangle add to $90$, so $5x + 15 = 90$ and $x = 15$.\n\n**The Full Solution:**\nStep 1: The angles of any triangle sum to $180^\\circ$. Here one angle measures $90^\\circ$, so the remaining two sum to $180 - 90 = 90$ degrees.\nStep 2: Combine the two expressions: $(4x - 6) + (x + 21) = 5x + 15$, and set that equal to $90$.\nStep 3: Solve: $5x = 75$, so $x = 15$. Check: the acute angles measure $4(15) - 6 = 54$ degrees and $15 + 21 = 36$ degrees, and $54 + 36 + 90 = 180$. ✓\n\n**Common Mistakes:**\n* $33$: sets the two acute angles equal to $180$ instead of $90$, forgetting that the right angle already uses half the total.\n* $21$: solves $5x - 15 = 90$, mishandling the sign when moving the constant $+15$ across the equals sign.\n* $18$: drops the constants $-6$ and $+21$ and solves $5x = 90$.\n\n**Test Day Takeaway:** In a right triangle the two acute angles are complementary; subtract the $90^\\circ$ before you set up the equation and the arithmetic stays small.",
  skills: ["triangle-angle-sum"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "During a six-hour storm a tipping-bucket gauge recorded $r$ millimeters and a manual gauge recorded $m$ millimeters, where $r + m = k$ and $r - m = 14$. If the tipping-bucket gauge recorded $48$ millimeters, what is the value of $k$?",
  choices: [
    // distractor: reports m, the manual gauge's 34 millimeters, instead of the combined total k
    { id: "A", text: "$34$" },
    // distractor: adds the 14-millimeter difference to 48 and reports 62 as the total
    { id: "B", text: "$62$" },
    { id: "C", text: "$82$" },
    // distractor: solves r - m = 14 as m = 48 + 14 = 62, then reports k = 48 + 62 = 110
    { id: "D", text: "$110$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice C is correct.** Substituting $r = 48$ into $r - m = 14$ gives $m = 34$, so $k = r + m = 48 + 34 = 82$.\n\n**The Fast Way (~25s):** The gauges differ by $14$, so the manual gauge read $48 - 14 = 34$, and the two together read $82$.\n\n**The Full Solution:**\nStep 1: Subtracting the second equation from the first eliminates $r$: $(r + m) - (r - m) = k - 14$, so $2m = k - 14$.\nStep 2: Use the given reading. With $r = 48$, the equation $r - m = 14$ becomes $48 - m = 14$, so $m = 34$.\nStep 3: Substitute both readings into $r + m = k$: $48 + 34 = 82$, so $k = 82$. Check: $48 - 34 = 14$, matching the second equation. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($34$): stops at the manual gauge's reading. The question asks for $k$, the combined total, not for $m$.\n* Choice B ($62$): adds the $14$-millimeter difference to the tipping-bucket reading and calls the result the total. The difference and the sum are different quantities.\n* Choice D ($110$): solves $r - m = 14$ as $m = 48 + 14 = 62$, a sign error, and then totals $48 + 62 = 110$. The larger reading is $r$, so $m$ must be smaller than $48$.\n\n**Test Day Takeaway:** When a system pairs a sum with a difference, one substitution settles the second variable; then re-read the question to see which quantity it actually wants.",
  skills: ["elimination-method", "setting-up-systems"]
},
{
  id: 9,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A parabola in the xy-plane, $y = ax^2 - 24x + 18$, crosses the x-axis twice. Adding together the x-coordinates of the two crossing points gives $4$. What nonzero value must the constant $a$ have?",
  correctAnswer: "6",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**The correct answer is $6$.** For $ax^2 + bx + c = 0$ the two solutions add to $-\\frac{b}{a}$, so here $-\\frac{-24}{a} = \\frac{24}{a} = 4$, giving $a = 6$.\n\n**The Fast Way (~25s):** The sum of the roots is $\\frac{24}{a}$, so $\\frac{24}{a} = 4$ and $a = 6$.\n\n**The Full Solution:**\nStep 1: The x-intercepts are the solutions of $ax^2 - 24x + 18 = 0$, and for any quadratic the solutions sum to $-\\frac{b}{a}$, where $b = -24$.\nStep 2: Set that sum equal to the given value: $-\\frac{-24}{a} = 4$, that is, $\\frac{24}{a} = 4$.\nStep 3: Multiply both sides by $a$ and divide by $4$: $a = 6$. Check: $6x^2 - 24x + 18 = 6(x - 1)(x - 3)$, whose x-intercepts are $1$ and $3$, and $1 + 3 = 4$. ✓\n\n**Common Mistakes:**\n* $-6$: uses $\\frac{b}{a}$ rather than $-\\frac{b}{a}$, so the sign of the sum is flipped and the equation becomes $\\frac{-24}{a} = 4$.\n* $4.5$: uses the product formula $\\frac{c}{a}$ instead of the sum, solving $\\frac{18}{a} = 4$.\n* $96$: multiplies instead of dividing, treating the relationship as $a = 24 \\times 4$.\n\n**Test Day Takeaway:** Sum of roots is $-\\frac{b}{a}$ and product is $\\frac{c}{a}$; when a question hands you the sum, you are being asked to solve one small equation, not to factor.",
  skills: ["quadratic-factoring"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Any ordered pair that satisfies $4x + 3y = 9$ also satisfies $ax + 6y = 18$, in which $a$ is a constant. What number must $a$ be?",
  choices: [
    // distractor: reports the scale factor 2 that links the two equations rather than the coefficient 4 x 2 = 8
    { id: "A", text: "$2$" },
    // distractor: copies the x-coefficient 4 from the first equation without scaling it
    { id: "B", text: "$4$" },
    { id: "C", text: "$8$" },
    // distractor: scales the wrong coefficient, doubling the 6 that multiplies y to get 12
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice C is correct.** Every solution of one equation solving the other means the two equations describe the same line, and $18 \\div 9 = 2$, so multiplying $4x + 3y = 9$ by $2$ gives $8x + 6y = 18$ and $a = 8$.\n\n**The Fast Way (~25s):** The constants go $9 \\to 18$, a factor of $2$, and $6 \\div 3 = 2$ agrees, so $a = 4 \\times 2 = 8$.\n\n**The Full Solution:**\nStep 1: If every pair satisfying the first equation also satisfies the second, the two equations have identical graphs, so one is a constant multiple of the other.\nStep 2: Find the multiplier from a pair of matching terms. The $y$-terms give $6 \\div 3 = 2$, and the constants agree: $18 \\div 9 = 2$.\nStep 3: Apply the same multiplier to the $x$-term: $a = 2 \\times 4 = 8$. Check: $2(4x + 3y) = 8x + 6y$ and $2(9) = 18$, so the second equation is exactly twice the first. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): stops at the multiplier itself. The multiplier tells you how to scale the coefficient, but $a$ is the scaled coefficient.\n* Choice B ($4$): copies $4$ straight from the first equation. That would make the second line $4x + 6y = 18$, which has a different slope.\n* Choice D ($12$): applies the multiplier to the wrong coefficient, doubling $6$ instead of $4$.\n\n**Test Day Takeaway:** Identical lines mean every coefficient and the constant share one multiplier; find it from the pair of terms you already know, then apply it to the unknown.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Two straight game trails cross at a single point in a preserve, forming four angles. Three of those angles are labeled in the figure, and all measures are in degrees. Determine the value of $y$.",
  diagram: { type: "intersectingLines", params: { angles: ["(4x - 12)°", "y°", "(2x + 24)°", ""], lineLabels: ["", ""] } },
  choices: [
    // distractor: reports x = 18 rather than the angle measure the question asks for
    { id: "A", text: "$18$" },
    // distractor: reports the measure of the labeled angle, 60 degrees, instead of its supplement y
    { id: "B", text: "$60$" },
    // distractor: treats the two labeled angles as supplementary rather than equal, getting x = 28 and y = 80
    { id: "C", text: "$80$" },
    { id: "D", text: "$120$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice D is correct.** The two labeled expressions mark vertical angles, so $4x - 12 = 2x + 24$ gives $x = 18$ and each measures $60^\\circ$; $y$ is adjacent to one of them, so $y = 180 - 60 = 120$.\n\n**The Fast Way (~30s):** Set the vertical angles equal: $4x - 12 = 2x + 24$, so $x = 18$ and the angle is $60^\\circ$. Then $y = 180 - 60 = 120$.\n\n**The Full Solution:**\nStep 1: Two straight trails crossing form two pairs of vertical angles, and vertical angles are equal, so $4x - 12 = 2x + 24$.\nStep 2: Solve: $2x = 36$, so $x = 18$. Each labeled angle measures $4(18) - 12 = 60$ degrees, and $2(18) + 24 = 60$ degrees confirms it.\nStep 3: The angle $y$ sits next to a $60^\\circ$ angle along a straight trail, so the two are supplementary: $y = 180 - 60 = 120$. Check: the four angles are $60$, $120$, $60$, and $120$, and they total $360$ degrees. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): is the value of $x$, not an angle measure. $x$ is only an intermediate result here.\n* Choice B ($60$): is the labeled angle. The question asks for $y$, which is the angle beside it, not the one equal to it.\n* Choice C ($80$): sets $4x - 12$ and $2x + 24$ supplementary instead of equal, giving $x = 28$, an angle of $100^\\circ$, and $y = 80$. Vertical angles are congruent; only adjacent angles are supplementary.\n\n**Test Day Takeaway:** At a crossing, name each angle as vertical (equal) or adjacent (summing to $180^\\circ$) before writing any equation, then check which one the question wants.",
  skills: ["angles"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A weather station's total snowfall in 2024 was $15\\%$ less than its total in 2023, which was $20\\%$ more than its total in 2022. If the station recorded $204$ centimeters in 2024, how many centimeters did it record in 2022?",
  correctAnswer: "200",
  explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**The correct answer is $200$.** If $s$ is the 2022 total, then 2023 is $1.20s$ and 2024 is $0.85(1.20s) = 1.02s$, so $1.02s = 204$ and $s = 200$.\n\n**The Fast Way (~30s):** The two changes multiply: $1.20 \\times 0.85 = 1.02$, so $s = 204 \\div 1.02 = 200$.\n\n**The Full Solution:**\nStep 1: Let $s$ be the 2022 total in centimeters. A $20\\%$ increase makes the 2023 total $1.20s$.\nStep 2: A $15\\%$ decrease from 2023 keeps $85\\%$ of it, so the 2024 total is $0.85 \\times 1.20s = 1.02s$.\nStep 3: Solve $1.02s = 204$ to get $s = 200$. Check: $200 \\times 1.20 = 240$ centimeters in 2023, and $240 - 0.15(240) = 240 - 36 = 204$ centimeters in 2024. ✓\n\n**Common Mistakes:**\n* $240$: undoes only the $15\\%$ decrease, $204 \\div 0.85 = 240$, and reports the 2023 total instead of continuing back to 2022.\n* $170$: undoes only the $20\\%$ increase, $204 \\div 1.20 = 170$, skipping the decrease entirely.\n* $194.3$: treats the changes as adding to a net $5\\%$ increase and computes $204 \\div 1.05$. Percent changes compose by multiplying, not by adding.\n\n**Test Day Takeaway:** Chain percent changes as a product of multipliers, then divide the final amount by that single product to walk all the way back.",
  skills: ["percent-of-value", "percent-word-problems"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A rowing club recorded the weekly training distance, in kilometers, and the $2{,}000$-meter ergometer time, in seconds, for each of its $12$ members. For the line of best fit $\\hat{y} = 452 - 0.8x$, what does $0.8$ represent?",
  diagram: { type: "scatterplot", params: { points: [[22, 440], [28, 424], [32, 430], [38, 418], [42, 423], [46, 411], [52, 414], [58, 400], [62, 406], [68, 393], [72, 398], [78, 386]], xMin: 20, xMax: 80, yMin: 380, yMax: 450, xGridStep: 5, yGridStep: 10, xLabelStep: 10, yLabelStep: 20, xLabel: "Weekly training distance (km)", yLabel: "Ergometer time (s)", bestFitLine: { slope: -0.8, intercept: 452 } } },
  choices: [
    // distractor: swaps the input and the output, reading the slope as kilometers per second instead of seconds per kilometer
    { id: "A", text: "The predicted weekly training distance falls by $0.8$ kilometer for each additional second of ergometer time." },
    { id: "B", text: "The predicted ergometer time falls by $0.8$ second for each additional kilometer of weekly training distance." },
    // distractor: ignores the minus sign in front of 0.8, turning a falling model into a rising one
    { id: "C", text: "The predicted ergometer time rises by $0.8$ second for each additional kilometer of weekly training distance." },
    // distractor: reads 0.8 as the value at x = 0; that value is the intercept 452 seconds
    { id: "D", text: "A member who trains $0$ kilometers per week has a predicted ergometer time of $0.8$ second." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**Choice B is correct.** In $\\hat{y} = 452 - 0.8x$ the coefficient of $x$ is $-0.8$, so each additional kilometer of weekly training distance lowers the predicted ergometer time by $0.8$ second.\n\n**The Fast Way (~20s):** The number attached to $x$ is the change in predicted $y$ per one unit of $x$, and it is negative, so the time drops $0.8$ second per kilometer.\n\n**The Full Solution:**\nStep 1: Identify the variables. $x$ is weekly training distance in kilometers and $\\hat{y}$ is predicted ergometer time in seconds.\nStep 2: The slope of a line of best fit is the predicted change in $y$ for a one-unit increase in $x$, so its units here are seconds per kilometer.\nStep 3: The slope is $-0.8$, a decrease of $0.8$ second per extra kilometer. Check: $\\hat{y}$ at $x = 40$ is $452 - 32 = 420$ seconds and at $x = 50$ is $452 - 40 = 412$ seconds, which is $8$ seconds faster over $10$ additional kilometers. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.8$ kilometer per second): reverses the roles of the variables. Distance is the predictor, so the rate is seconds per kilometer, not kilometers per second.\n* Choice C ($+0.8$ second per kilometer): keeps the size of the slope but drops the minus sign, which reverses what the data show.\n* Choice D ($0.8$ second at $0$ kilometers): describes the value of $\\hat{y}$ when $x = 0$, which is the intercept $452$ seconds, not $0.8$.\n\n**Test Day Takeaway:** Say the slope out loud with its units attached, \"seconds per kilometer\", before comparing statements; the wrong choices almost always break the units or the sign.",
  skills: ["scatterplots", "linear-functions"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A radio-collared wolf's home range is bounded on a map by $x^2 + y^2 - 12x + 8y = c$, with distances in kilometers, and walking that boundary once covers $20\\pi$ kilometers. What is the value of the constant $c$?",
  choices: [
    // distractor: completes the square without halving the linear coefficients, subtracting 144 and 64 to get 100 - 208 = -108
    { id: "A", text: "$-108$" },
    // distractor: uses the radius 10 in place of the radius squared, computing 10 - 52 = -42
    { id: "B", text: "$-42$" },
    { id: "C", text: "$48$" },
    // distractor: adds the completing-the-square constants instead of subtracting them: 100 + 52 = 152
    { id: "D", text: "$152$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.** A boundary of length $20\\pi$ gives radius $10$, and completing the square turns the equation into $(x - 6)^2 + (y + 4)^2 = c + 52$, so $c + 52 = 100$ and $c = 48$.\n\n**The Fast Way (~35s):** Radius $10$ means the right side of the standard form is $100$; completing the square adds $36 + 16 = 52$ to it, so $c = 100 - 52 = 48$.\n\n**The Full Solution:**\nStep 1: The boundary is a circle, so its length is $2\\pi r$. From $2\\pi r = 20\\pi$, the radius is $r = 10$ kilometers.\nStep 2: Complete the square in each variable. Half of $-12$ is $-6$ and $(-6)^2 = 36$; half of $8$ is $4$ and $4^2 = 16$. So $x^2 - 12x + y^2 + 8y = c$ becomes $(x - 6)^2 + (y + 4)^2 = c + 36 + 16 = c + 52$.\nStep 3: Standard form requires the right side to equal $r^2 = 100$, so $c + 52 = 100$ and $c = 48$. Check: $(x - 6)^2 + (y + 4)^2 = 100$ expands to $x^2 + y^2 - 12x + 8y + 52 = 100$, that is, $x^2 + y^2 - 12x + 8y = 48$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-108$): squares the full linear coefficients instead of half of them, adding $144$ and $64$ and landing on $100 - 208 = -108$.\n* Choice B ($-42$): puts the radius $10$ on the right side instead of $r^2 = 100$, giving $10 - 52 = -42$. Standard form always carries the square of the radius.\n* Choice D ($152$): moves the $52$ to the wrong side, computing $100 + 52$. The constants were created on the left, so they must be subtracted from $100$.\n\n**Test Day Takeaway:** Convert the given circumference or area to $r^2$ first, then complete the square and match the right sides; the only sign trap is which way the added constants travel.",
  skills: ["circle-equation"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "At a climate station, the number of hours per year under a heat advisory was $250$ in 2015 and has increased by $8\\%$ every $5$ years since. Which function models the number of such hours $t$ years after 2015?",
  choices: [
    // distractor: uses 0.08 as the growth factor instead of 1.08, which models a 92% drop every five years
    { id: "A", text: "$h(t) = 250(0.08)^{t/5}$" },
    // distractor: multiplies t by 5 instead of dividing, applying the 8% increase five times per year
    { id: "B", text: "$h(t) = 250(1.08)^{5t}$" },
    // distractor: converts 8% per five years into 40% per year by multiplying, treating compound growth as linear
    { id: "C", text: "$h(t) = 250(1.4)^{t}$" },
    { id: "D", text: "$h(t) = 250(1.08)^{t/5}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice D is correct.** An $8\\%$ increase multiplies by $1.08$, and one such increase occurs every $5$ years, so after $t$ years the number of increases is $\\frac{t}{5}$ and $h(t) = 250(1.08)^{t/5}$.\n\n**The Fast Way (~30s):** Growth factor $1.08$, one application per $5$ years, so the exponent is $\\frac{t}{5}$.\n\n**The Full Solution:**\nStep 1: Start with the 2015 value, $250$ hours, as the coefficient in front.\nStep 2: An increase of $8\\%$ multiplies the previous amount by $1 + 0.08 = 1.08$, so $1.08$ is the growth factor.\nStep 3: The factor applies once per $5$-year period, and $t$ years contain $\\frac{t}{5}$ periods, so $h(t) = 250(1.08)^{t/5}$. Check: at $t = 5$, $h(5) = 250(1.08)^1 = 270$ hours, which is $8\\%$ more than $250$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (base $0.08$): uses $0.08$ rather than $1.08$. At $t = 5$ that gives $250(0.08) = 20$ hours, a $92\\%$ collapse instead of an increase.\n* Choice B (exponent $5t$): writes the exponent as $5t$, applying the growth five times a year. At $t = 5$ it gives $250(1.08)^{25} \\approx 1712$ hours.\n* Choice C (base $1.4$): converts \"$8\\%$ every $5$ years\" into \"$40\\%$ every year\" by multiplying. Repeated percent growth compounds, so the yearly factor is $1.08^{1/5} \\approx 1.0155$, not $1.4$.\n\n**Test Day Takeaway:** Put the percent in the base and the timing in the exponent; if one increase covers $n$ years, the exponent is $\\frac{t}{n}$, never $nt$.",
  skills: ["exponential-growth-decay"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table shows the total cost, in dollars, for a cycling club to reserve one velodrome session for several numbers of riders, and the cost is a linear function of the number of riders. If the club has $\\$600$ available for a session, what is the greatest number of riders it can register?",
  questionTable: { headers: ["Riders", "Total cost (dollars)"], rows: [["4", "117"], ["6", "153"], ["9", "207"], ["12", "261"]] },
  choices: [
    { id: "A", text: "$30$" },
    // distractor: rounds 30.83 up instead of down, exceeding the 600-dollar budget by 3 dollars
    { id: "B", text: "$31$" },
    // distractor: ignores the 45-dollar reservation fee and computes 600 / 18 = 33.3, rounded down to 33
    { id: "C", text: "$33$" },
    // distractor: adds the 45-dollar fee instead of subtracting it, computing (600 + 45) / 18 = 35.8, rounded down to 35
    { id: "D", text: "$35$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice A is correct.** The table gives a rate of $\\$18$ per rider and a fixed $\\$45$ per session, so $45 + 18n \\leq 600$ yields $n \\leq 30.8\\overline{3}$, and the greatest whole number of riders is $30$.\n\n**The Fast Way (~40s):** Cost per rider is $\\frac{153 - 117}{6 - 4} = 18$, and $117 - 4(18) = 45$ is fixed, so $n \\leq \\frac{600 - 45}{18} = 30.8$, giving $30$ riders.\n\n**The Full Solution:**\nStep 1: Find the per-rider rate from two table rows: $\\frac{153 - 117}{6 - 4} = \\frac{36}{2} = 18$ dollars per rider.\nStep 2: Find the fixed part by working one row back to zero riders: $117 - 4(18) = 45$ dollars. So the cost model is $C = 45 + 18n$, and the row $n = 12$ confirms it: $45 + 216 = 261$.\nStep 3: Solve $45 + 18n \\leq 600$, so $18n \\leq 555$ and $n \\leq 30.8\\overline{3}$. Since $n$ counts riders, $n = 30$. Check: $45 + 18(30) = 585 \\leq 600$, while $31$ riders would cost $45 + 558 = 603$, over budget. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($31$): rounds $30.8$ up. Rounding up a \"greatest number that fits\" answer always breaks the budget, here by $\\$3$.\n* Choice C ($33$): drops the fixed $\\$45$ and divides the whole budget by $18$. The reservation fee is charged once no matter how many ride.\n* Choice D ($35$): adds the fee to the budget rather than removing it, computing $\\frac{645}{18} \\approx 35.8$.\n\n**Test Day Takeaway:** Pull the rate from two rows and the fixed charge from one row, then round a \"greatest number\" answer down every time, even when the decimal looks close.",
  skills: ["word-problem-to-equation"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A parabola is given by $y = 2x^2 + bx + 18$, no point of its graph touches the x-axis, and the constant $b$ is an integer. Which statement below gives all of the values $b$ can take?",
  choices: [
    // distractor: omits the factor 4 in b^2 - 4ac, solving b^2 < 36 instead of b^2 < 144
    { id: "A", text: "$-5 \\leq b \\leq 5$" },
    { id: "B", text: "$-11 \\leq b \\leq 11$" },
    // distractor: includes b = -12 and b = 12, where the discriminant is 0 and the graph touches the x-axis at one point
    { id: "C", text: "$-12 \\leq b \\leq 12$" },
    // distractor: reverses the inequality and gives the values for which the graph does cross the x-axis twice
    { id: "D", text: "$b \\leq -12$ or $b \\geq 12$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.** No point of the graph touching the x-axis means $b^2 - 4ac < 0$, so $b^2 - 4(2)(18) < 0$, that is $b^2 < 144$ and $-12 < b < 12$; the integers in that range run from $-11$ to $11$.\n\n**The Fast Way (~40s):** $b^2 < 4(2)(18) = 144$ gives $|b| < 12$, and the integer values stop at $\\pm 11$.\n\n**The Full Solution:**\nStep 1: The graph meets the x-axis exactly where $2x^2 + bx + 18 = 0$ has real solutions, so \"no point touches the x-axis\" means the equation has no real solutions and the discriminant is negative.\nStep 2: Compute the discriminant with $a = 2$ and $c = 18$: $b^2 - 4(2)(18) = b^2 - 144$, and require $b^2 - 144 < 0$, so $b^2 < 144$ and $-12 < b < 12$.\nStep 3: Because $b$ is an integer, the endpoints $\\pm 12$ are excluded and the largest allowed magnitude is $11$, giving $-11 \\leq b \\leq 11$. Check: $b = 11$ gives $121 - 144 = -23 < 0$, no x-intercepts, while $b = 12$ gives $144 - 144 = 0$, a single touching point. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5 \\leq b \\leq 5$): forgets the $4$ in $b^2 - 4ac$ and solves $b^2 < 2(18) = 36$, which caps $b$ at $5$ instead of $11$.\n* Choice C ($-12 \\leq b \\leq 12$): keeps the endpoints. At $b = \\pm 12$ the discriminant is exactly $0$, so the parabola has one point on the x-axis, which the question forbids.\n* Choice D ($b \\leq -12$ or $b \\geq 12$): describes when the discriminant is nonnegative, the values for which the graph does meet the x-axis.\n\n**Test Day Takeaway:** Turn \"touches the x-axis\" language into a discriminant inequality first; then let the word \"integer\" decide whether the boundary values survive.",
  skills: ["discriminant-analysis"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A ski-jump ramp drops $64$ meters vertically over a horizontal run of $120$ meters as it descends in a straight line from the top of a vertical tower. What is the sine of the angle between the ramp and the tower?",
  correctAnswer: "15/17",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**The correct answer is $15/17$.** The tower, the ground, and the ramp form a right triangle with legs $64$ and $120$ meters and hypotenuse $\\sqrt{64^2 + 120^2} = 136$ meters; the angle at the top of the tower has the $120$-meter run opposite it, so its sine is $\\frac{120}{136} = \\frac{15}{17}$.\n\n**The Fast Way (~40s):** The legs $64$ and $120$ scale the $8$-$15$-$17$ triple by $8$, so the ramp is $136$ meters, and the side opposite the tower angle is the $120$-meter run: $\\frac{120}{136} = \\frac{15}{17}$.\n\n**The Full Solution:**\nStep 1: The vertical tower and the horizontal ground meet at a right angle, so the ramp is the hypotenuse of a right triangle whose legs are the $64$-meter drop and the $120$-meter run.\nStep 2: Find the ramp length: $64^2 + 120^2 = 4096 + 14400 = 18496$, and $\\sqrt{18496} = 136$ meters.\nStep 3: The angle in question sits at the top of the tower, between the tower and the ramp. The side opposite that angle is the horizontal run, so the sine is $\\frac{120}{136} = \\frac{15}{17}$. Check: the other acute angle has sine $\\frac{64}{136} = \\frac{8}{17}$, and $\\left(\\frac{15}{17}\\right)^2 + \\left(\\frac{8}{17}\\right)^2 = \\frac{225 + 64}{289} = 1$. ✓\n\n**Common Mistakes:**\n* $8/17$: takes the sine of the angle the ramp makes with the ground instead of with the tower. The two angles are complementary, so their sines swap.\n* $15/8$: divides the two legs, $\\frac{120}{64}$, which is a tangent, not a sine.\n* $8/15$: divides the legs the other way, $\\frac{64}{120}$, the tangent of the angle at the base.\n\n**Test Day Takeaway:** Sine is opposite over hypotenuse, so first mark which side is opposite the named angle; naming the angle from the wrong side is what swaps $\\frac{15}{17}$ and $\\frac{8}{17}$.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 19,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A trail-running club's membership is modeled by $M(t) = 40 \\cdot 2^{t/6}$, where $t$ is the number of months since the club was founded. At what value of $t$ does the model predict a membership that is $8$ times the membership it predicts at $t = 6$?",
  correctAnswer: "24",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**The correct answer is $24$.** Since $M(6) = 40 \\cdot 2^{1} = 80$, the target is $8(80) = 640$, and $40 \\cdot 2^{t/6} = 640$ gives $2^{t/6} = 16 = 2^4$, so $\\frac{t}{6} = 4$ and $t = 24$.\n\n**The Fast Way (~40s):** Eight times means three more doublings, and each doubling takes $6$ months, so $t = 6 + 3(6) = 24$.\n\n**The Full Solution:**\nStep 1: Evaluate the model at $t = 6$: $M(6) = 40 \\cdot 2^{6/6} = 40 \\cdot 2 = 80$ members. The target membership is $8 \\times 80 = 640$.\nStep 2: Set the model equal to the target: $40 \\cdot 2^{t/6} = 640$, so $2^{t/6} = 16$.\nStep 3: Write both sides with base $2$: $2^{t/6} = 2^4$, so $\\frac{t}{6} = 4$ and $t = 24$ months. Check: $M(24) = 40 \\cdot 2^{4} = 640$, and $640 = 8 \\times 80 = 8 \\cdot M(6)$. ✓\n\n**Common Mistakes:**\n* $18$: solves $2^{t/6} = 8$, comparing the target to the founding membership of $40$ rather than to $M(6) = 80$.\n* $48$: multiplies the $6$ months by the factor $8$, treating exponential growth as if the time scaled with the output.\n* $4$: stops at the exponent $\\frac{t}{6} = 4$ and reports it instead of solving for $t$.\n\n**Test Day Takeaway:** Rewrite both sides as powers of one base, then set the exponents equal; the trap is comparing to the starting value when the question names a different reference time.",
  skills: ["exponential-functions"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A habitat restoration fund's only holding is $\\$8{,}000$ in an account paying $6\\%$ annual interest compounded semiannually, with no other deposits. To the nearest dollar, how much interest does that account earn in $4$ years?",
  choices: [
    // distractor: uses simple interest, 8000 x 0.06 x 4 = 1920, so no interest ever earns interest
    { id: "A", text: "$1{,}920$" },
    // distractor: compounds once a year instead of twice: 8000(1.06)^4 - 8000 is about 2099.82, or 2,100
    { id: "B", text: "$2{,}100$" },
    { id: "C", text: "$2{,}134$" },
    // distractor: uses 8 compounding periods but keeps the full 6% rate in each: 8000(1.06)^8 - 8000 is about 4750.77
    { id: "D", text: "$4{,}751$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Compound Interest**\n\n**Choice C is correct.** Semiannual compounding pays $\\frac{6\\%}{2} = 3\\%$ in each of $2(4) = 8$ periods, so the balance is $8000(1.03)^8 \\approx 10{,}134.16$ dollars and the interest earned is about $2{,}134$ dollars.\n\n**The Fast Way (~45s):** Rate per period $0.03$, periods $8$: $8000(1.03)^8 \\approx 10{,}134$, and subtracting the original $8{,}000$ leaves about $2{,}134$.\n\n**The Full Solution:**\nStep 1: Convert the annual rate to a per-period rate. Compounded semiannually, each period pays $\\frac{0.06}{2} = 0.03$.\nStep 2: Count the periods. Four years at two periods per year is $8$ periods, so the balance is $8000(1 + 0.03)^8 = 8000(1.03)^8 \\approx 10{,}134.16$ dollars.\nStep 3: The question asks for interest, not balance, so subtract the deposit: $10{,}134.16 - 8{,}000 = 2{,}134.16$, about $2{,}134$ dollars. Check: $8{,}000 + 2{,}134 = 10{,}134$, and dividing by $(1.03)^8 \\approx 1.2668$ returns $8{,}000$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1{,}920$): uses simple interest, $8000(0.06)(4)$. That never lets earned interest earn interest, so it always undershoots.\n* Choice B ($2{,}100$): compounds annually rather than semiannually, $8000(1.06)^4 - 8000 \\approx 2{,}099.82$. More frequent compounding at the same annual rate always earns a little more.\n* Choice D ($4{,}751$): uses $8$ periods but charges the full $6\\%$ in each, $8000(1.06)^8 - 8000 \\approx 4{,}750.77$. Splitting the year doubles the periods and halves the rate together.\n\n**Test Day Takeaway:** Divide the annual rate by the number of periods per year and multiply the years by that same number; then re-read whether the question wants the balance or only the interest.",
  skills: ["exponential-functions"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Beaver lodge counts for a river basin in four survey years are given in the table, and the function $N(t) = 32(1.5)^{t/3}$ models the number of lodges $t$ years after the first survey. What does this model indicate about the number of lodges?",
  questionTable: { headers: ["Years after first survey", "Lodges counted"], rows: [["0", "32"], ["4", "55"], ["8", "94"], ["12", "162"]] },
  choices: [
    // distractor: reads the growth factor 1.5 as an amount added each year, describing linear rather than exponential growth
    { id: "A", text: "The lodge count grows by $1.5$ lodges each year." },
    { id: "B", text: "The lodge count is $1.5$ times as great every $3$ years." },
    // distractor: drops the division by 3 in the exponent, applying the factor once per year instead of once per 3 years
    { id: "C", text: "The lodge count is $1.5$ times as great each year." },
    // distractor: reads the factor 1.5 as a percent increase of 1.5%, when 1.5 means a 50% increase
    { id: "D", text: "The lodge count grows by $1.5\\%$ every $3$ years." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice B is correct.** In $N(t) = 32(1.5)^{t/3}$ the base $1.5$ is applied once for every $3$ years, so the count is multiplied by $1.5$ each $3$-year span.\n\n**The Fast Way (~30s):** The base is the multiplier and the $3$ under $t$ is how long one multiplication takes: $1.5$ times as many lodges every $3$ years.\n\n**The Full Solution:**\nStep 1: In $a(b)^{t/n}$, the value $a$ is the starting amount, $b$ is the factor applied in one full period, and $n$ is the length of that period. Here $a = 32$, $b = 1.5$, and $n = 3$ years.\nStep 2: Increasing $t$ by $3$ increases the exponent by exactly $1$, which multiplies the count by $1.5$ once.\nStep 3: So the count is $1.5$ times as great every $3$ years. Check against the table: $12$ years hold four $3$-year spans, so the count should grow by a factor of $(1.5)^4 = 5.0625$, and $32 \\times 5.0625 = 162$, the year-$12$ entry. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (an added $1.5$ lodges a year): treats $1.5$ as lodges added per year. The recorded counts rise by $23$, then $39$, then $68$ lodges over successive $4$-year spans, so the increase is not constant.\n* Choice C (factor $1.5$ applied yearly): ignores the $3$ in the exponent. Multiplying by $1.5$ once a year would put the count near $32(1.5)^4 = 162$ lodges by year $4$, but the survey records $55$.\n* Choice D (an increase of $1.5$ percent): reads $1.5$ as $1.5\\%$. A factor of $1.5$ is a $50\\%$ increase, which is far more than the table would allow.\n\n**Test Day Takeaway:** Read an exponential model as three separate facts: the coefficient is the start, the base is the multiplier, and the denominator under $t$ is how long one multiplication takes.",
  skills: ["exponential-growth-decay"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In a field-archery round, a hit in the inner ring scores $5$ points and a hit in the outer ring scores $3$ points. An archer scored $254$ points, and the number of outer-ring hits was $2$ fewer than half the number of inner-ring hits. How many outer-ring hits did the archer record?",
  choices: [
    { id: "A", text: "$18$" },
    // distractor: reports the 40 inner-ring hits instead of the outer-ring hits the question asks for
    { id: "B", text: "$40$" },
    // distractor: swaps the relationship, making the inner-ring count 2 fewer than half the outer-ring count, which gives 48 outer-ring hits
    { id: "C", text: "$48$" },
    // distractor: reports the total number of scoring hits, 40 + 18 = 58
    { id: "D", text: "$58$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice A is correct.** With $i$ inner-ring and $r$ outer-ring hits, $5i + 3r = 254$ and $r = \\frac{i}{2} - 2$; substituting gives $6.5i = 260$, so $i = 40$ and $r = 18$.\n\n**The Fast Way (~50s):** Replace $r$ with $\\frac{i}{2} - 2$: $5i + 1.5i - 6 = 254$, so $6.5i = 260$, $i = 40$, and $r = 20 - 2 = 18$.\n\n**The Full Solution:**\nStep 1: Name the counts. Let $i$ be inner-ring hits and $r$ outer-ring hits. The score gives $5i + 3r = 254$.\nStep 2: Translate the comparison. \"Two fewer than half the inner-ring hits\" is $\\frac{i}{2} - 2$, so $r = \\frac{i}{2} - 2$. Substitute into the score equation: $5i + 3\\left(\\frac{i}{2} - 2\\right) = 254$, which becomes $5i + 1.5i - 6 = 254$.\nStep 3: Solve: $6.5i = 260$, so $i = 40$, and then $r = \\frac{40}{2} - 2 = 18$. Check: $5(40) + 3(18) = 200 + 54 = 254$ points, and $18$ is indeed $2$ fewer than half of $40$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($40$): is the inner-ring count. It comes out of the algebra first, which makes it easy to stop there.\n* Choice C ($48$): reverses the comparison to $i = \\frac{r}{2} - 2$, giving $11i = 242$, $i = 22$, and $r = 48$. The sentence defines the outer count in terms of the inner count, not the other way around.\n* Choice D ($58$): totals the two counts, $40 + 18$, answering how many scoring hits there were rather than how many were in the outer ring.\n\n**Test Day Takeaway:** Write the comparison sentence as an equation exactly in the order it is stated, then circle the letter the question asks for before you start solving.",
  skills: ["substitution-method"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 12 — Math Module 2 (22 questions)
// Distribution: 3E / 7M / 12H. Wavy flow: easies at Q1/Q2/Q8 (Q8 breather),
// mediums at Q3/Q4/Q5/Q10/Q11/Q14/Q19, hards elsewhere; Q21-22 closers.
// Warm-ups Q1-5 each carry 2+ steps or a trap (missing-leg + shifted ask,
// intercept-vs-slope, excluded-value reasoning, negative-reciprocal chain,
// direction-flipped successive percents). All content re-authored fresh
// 2026-09-01; slot metadata and SAT Pattern headers frozen.

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Two rectangular settling basins at a water-treatment plant have the widths and perimeters listed in the table. What is the area, in square meters, of basin A?",
  questionTable: { headers: ["Basin", "Width (m)", "Perimeter (m)"], rows: [["A", "$18$", "$96$"], ["B", "$12$", "$76$"]] },
  choices: [
    // distractor: computes the area of basin B (26 x 12 = 312) instead of basin A
    { id: "A", text: "$312$" },
    { id: "B", text: "$540$" },
    // distractor: uses half the perimeter, 48, as the length instead of subtracting the width: 48 x 18
    { id: "C", text: "$864$" },
    // distractor: multiplies the full perimeter by the width: 96 x 18
    { id: "D", text: "$1{,}728$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice B is correct.** Basin A has width $18$ m and perimeter $96$ m, so its length is $30$ m and its area is $540$ square meters.\n\n**The Fast Way (~20s):** Half of $96$ is $48$, and $48 - 18 = 30$. Then $30 \\times 18 = 540$.\n\n**The Full Solution:**\nStep 1: For a rectangle, $P = 2(\\ell + w)$, so $96 = 2(\\ell + 18)$ and $\\ell + 18 = 48$.\nStep 2: Subtract the width: $\\ell = 48 - 18 = 30$ meters.\nStep 3: Area $= \\ell w = 30 \\times 18 = 540$ square meters. Check: the perimeter of a $30$ by $18$ rectangle is $2(30 + 18) = 96$ meters, matching the table row for basin A. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($312$): the area of basin B, whose length is $\\frac{76}{2} - 12 = 26$ and whose area is $26 \\times 12 = 312$ — the wrong row of the table.\n* Choice C ($864$): treats half the perimeter, $48$, as the length and multiplies $48 \\times 18 = 864$, forgetting that half the perimeter is length PLUS width.\n* Choice D ($1{,}728$): multiplies the full perimeter by the width, $96 \\times 18 = 1{,}728$, which is not an area formula at all.\n\n**Test Day Takeaway:** Half a rectangle's perimeter is $\\ell + w$, not $\\ell$. Peel off the width before you multiply.",
  skills: ["triangle-area"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A contact-tracing unit has completed $900$ of the $3{,}600$ interviews it must finish. Each of the $c$ callers on the unit completes $r$ interviews per hour and works $h$ hours each day. Which expression gives the number of additional days the unit needs to finish the remaining interviews?",
  choices: [
    // distractor: multiplies by the hours per day instead of dividing by them
    { id: "A", text: "$\\frac{2700h}{cr}$" },
    { id: "B", text: "$\\frac{2700}{crh}$" },
    // distractor: uses the full 3,600 interviews instead of the 2,700 that remain
    { id: "C", text: "$\\frac{3600}{crh}$" },
    // distractor: uses 3,600 instead of 2,700 AND multiplies by h instead of dividing
    { id: "D", text: "$\\frac{3600h}{cr}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice B is correct.** The unit still owes $3{,}600 - 900 = 2{,}700$ interviews, and it finishes $crh$ interviews per day, so it needs $\\frac{2700}{crh}$ days.\n\n**The Fast Way (~30s):** Remaining work over work per day. Remaining $= 2{,}700$; per day $= c \\cdot r \\cdot h$. Divide.\n\n**The Full Solution:**\nStep 1: Subtract what is already done: $3{,}600 - 900 = 2{,}700$ interviews remain.\nStep 2: Build the daily rate. One caller does $r$ interviews each hour for $h$ hours, or $rh$ interviews per day; $c$ callers do $crh$ interviews per day.\nStep 3: Days $=$ $\\frac{\\text{interviews remaining}}{\\text{interviews per day}} = \\frac{2700}{crh}$. Check the units: interviews divided by (interviews per day) leaves days. With $c = 5$, $r = 3$, and $h = 6$ the unit does $90$ interviews per day and needs $\\frac{2700}{90} = 30$ days, which is exactly what $\\frac{2700}{crh}$ returns. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{2700h}{cr}$): keeps the correct numerator but multiplies by $h$. More hours per day should shorten the job, so $h$ belongs in the denominator; with $c = 5$, $r = 3$, $h = 6$ this returns $1{,}080$ days.\n* Choice C ($\\frac{3600}{crh}$): divides the whole assignment by the daily rate and ignores the $900$ interviews already finished, overstating the answer by $\\frac{900}{crh}$ days.\n* Choice D ($\\frac{3600h}{cr}$): makes both errors at once — the full total in the numerator and $h$ on the wrong side of the fraction bar.\n\n**Test Day Takeaway:** In a rate translation, anything that makes the job go faster belongs in the denominator. Test your expression with easy numbers before you bubble.",
  skills: ["word-problem-to-equation"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "An inspection crew marks sensor P at $(-6, 3)$ and sensor Q at $(2, -9)$ on a coordinate grid of a truss bridge, where each unit represents 1 meter. Which expression gives the distance, in meters, between the two sensors?",
  choices: [
    // distractor: reverses the sign of P's x-coordinate, writing 2 - 6 instead of 2 - (-6), which gives sqrt(160)
    { id: "A", text: "$\\sqrt{(2 - 6)^2 + (-9 - 3)^2}$" },
    // distractor: reverses the sign of both of P's coordinates: 2 - 6 and -9 + 3, which gives sqrt(52)
    { id: "B", text: "$\\sqrt{(2 - 6)^2 + (-9 + 3)^2}$" },
    { id: "C", text: "$\\sqrt{(2 + 6)^2 + (-9 - 3)^2}$" },
    // distractor: reverses the sign of P's y-coordinate, writing -9 + 3 instead of -9 - 3, which gives a clean 10
    { id: "D", text: "$\\sqrt{(2 + 6)^2 + (-9 + 3)^2}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Distance Formula**\n\n**Choice C is correct.** The distance between $(x_1, y_1)$ and $(x_2, y_2)$ is $\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$, and subtracting the negative coordinates of P turns both differences into sums of the correct magnitude: $\\sqrt{(2 + 6)^2 + (-9 - 3)^2}$.\n\n**The Fast Way (~20s):** $x$ runs from $-6$ to $2$, a change of $8$; $y$ runs from $3$ to $-9$, a change of $-12$. Only Choice C shows $2 + 6$ and $-9 - 3$.\n\n**The Full Solution:**\nStep 1: Label the points: $(x_1, y_1) = (-6, 3)$ and $(x_2, y_2) = (2, -9)$.\nStep 2: $x_2 - x_1 = 2 - (-6) = 2 + 6 = 8$, and $y_2 - y_1 = -9 - 3 = -12$.\nStep 3: The distance is $\\sqrt{8^2 + (-12)^2} = \\sqrt{208}$, which is what Choice C evaluates to. Check: the horizontal run of $8$ m and vertical drop of $12$ m give a hypotenuse a little over $14$ m, and $\\sqrt{208} \\approx 14.4$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\sqrt{160}$): writes $2 - 6$ for the horizontal difference, reversing the sign of P's $x$-coordinate; it shrinks the run from $8$ to $4$.\n* Choice B ($\\sqrt{52}$): reverses the sign of both of P's coordinates, shrinking the run to $4$ and the rise to $6$.\n* Choice D ($10$): writes $-9 + 3$ for the vertical difference, reversing the sign of P's $y$-coordinate; that turns a drop of $12$ into a drop of $6$ and produces a suspiciously clean $10$.\n\n**Test Day Takeaway:** Subtracting a negative coordinate ADDS. Write $x_2 - x_1$ with the parentheses in place before you simplify.",
  skills: ["coordinate-geometry"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A stage-rigging worksheet evaluates the expression $5(x - 2c) + 3(x + 4c)$ and displays the result in the form $8x + m$ for every value of $x$, where $c$ and $m$ are constants. What is the value of $m$ in terms of $c$?",
  choices: [
    // distractor: treats both constant terms as negative: -10c - 12c
    { id: "A", text: "$-22c$" },
    // distractor: distributes the 3 only to x, leaving +4c instead of +12c: -10c + 4c
    { id: "B", text: "$-6c$" },
    // distractor: combines the constants in the wrong order: 10c - 12c
    { id: "C", text: "$-2c$" },
    { id: "D", text: "$2c$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice D is correct.** Distributing gives $5x - 10c + 3x + 12c = 8x + 2c$, so $m = 2c$.\n\n**The Fast Way (~20s):** The $x$-terms already match ($5x + 3x = 8x$), so only the constants matter: $-10c + 12c = 2c$.\n\n**The Full Solution:**\nStep 1: Distribute both factors: $5(x - 2c) = 5x - 10c$ and $3(x + 4c) = 3x + 12c$.\nStep 2: Group like terms: $(5x + 3x) + (-10c + 12c) = 8x + 2c$.\nStep 3: The worksheet shows $8x + m$ for every $x$, so the constant terms must match: $m = 2c$. Check with $c = 3$ and $x = 1$: the expression is $5(1 - 6) + 3(1 + 12) = -25 + 39 = 14$, and $8(1) + 2(3) = 14$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-22c$): keeps a minus sign on both constants, $-10c - 12c$, as if distributing $3$ across $+4c$ produced a negative term.\n* Choice B ($-6c$): distributes the $3$ to $x$ but not to $4c$, so the second constant enters as $4c$ instead of $12c$ and the sum becomes $-10c + 4c$.\n* Choice C ($-2c$): gets both constants right but subtracts them backwards, $10c - 12c$, flipping the sign of the answer.\n\n**Test Day Takeaway:** When an expression must equal a given form for EVERY value of $x$, match coefficients piece by piece — the constants alone decide the constant.",
  skills: ["combining-like-terms"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Average daily traffic volume on a river crossing is modeled by $V = 34{,}600 - 1{,}200t$, where $t$ is the number of years after 2018. Which equation models the average daily traffic volume in terms of $w$, the number of years after 2023?",
  choices: [
    { id: "A", text: "$V = 28{,}600 - 1{,}200w$" },
    // distractor: re-anchors the starting value correctly but reverses the sign of the yearly change
    { id: "B", text: "$V = 28{,}600 + 1{,}200w$" },
    // distractor: keeps the 2018 starting value of 34,600 and only renames the variable
    { id: "C", text: "$V = 34{,}600 - 1{,}200w$" },
    // distractor: adds 5(1,200) to the starting value instead of subtracting it
    { id: "D", text: "$V = 40{,}600 - 1{,}200w$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice A is correct.** Because $2023$ is $5$ years after $2018$, $t = w + 5$, and substituting gives $V = 34{,}600 - 1{,}200(w + 5) = 28{,}600 - 1{,}200w$.\n\n**The Fast Way (~25s):** The rate never changes, so only the intercept moves: five years of decline is $5(1{,}200) = 6{,}000$, and $34{,}600 - 6{,}000 = 28{,}600$.\n\n**The Full Solution:**\nStep 1: Relate the two clocks. If $w$ counts years after $2023$ and $t$ counts years after $2018$, then $t = w + 5$.\nStep 2: Substitute: $V = 34{,}600 - 1{,}200(w + 5) = 34{,}600 - 1{,}200w - 6{,}000$.\nStep 3: Combine the constants: $V = 28{,}600 - 1{,}200w$. Check at $w = 0$ (the year $2023$): the new model gives $28{,}600$, and the original model at $t = 5$ gives $34{,}600 - 6{,}000 = 28{,}600$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($V = 28{,}600 + 1{,}200w$): re-anchors the intercept correctly but flips the sign of the slope, turning a declining crossing into a growing one.\n* Choice C ($V = 34{,}600 - 1{,}200w$): renames $t$ as $w$ without moving the starting point, so it reports the 2018 volume as the 2023 volume — an overstatement of $6{,}000$ vehicles.\n* Choice D ($V = 40{,}600 - 1{,}200w$): moves the intercept the wrong way, adding $6{,}000$ instead of subtracting it, as if traffic had been rising before 2023.\n\n**Test Day Takeaway:** Shifting the origin of a linear model changes the intercept only. Write the substitution $t = w + 5$ and let the algebra move the constant for you.",
  skills: ["slope-intercept-form"]
},
{
  id: 6,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The graph of the quadratic function $f$ is shown, where $f(x)$ is the elevation, in feet, of a drainage channel bed at a horizontal distance of $x$ feet from a survey stake. Written in the form $f(x) = ax^2 + bx + c$, what is the value of $b$?",
  diagram: { type: "parabola", params: { vertex: { h: 3, k: -2 }, a: 0.5, xRange: [0, 6], yRange: [-3, 3], xTickInterval: 1, yTickInterval: 1, gridInterval: 1, showVertex: false } },
  correctAnswer: "-3",
  explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**The correct answer is $-3$.** The graph has its lowest point at $(3, -2)$ and crosses the $x$-axis at $(1, 0)$ and $(5, 0)$, so $f(x) = \\frac{1}{2}(x - 3)^2 - 2 = \\frac{1}{2}x^2 - 3x + \\frac{5}{2}$.\n\n**The Fast Way (~35s):** In vertex form $a(x - h)^2 + k$, the expanded middle term is $-2ah$. Here $a = \\frac{1}{2}$ and $h = 3$, so $b = -2\\left(\\frac{1}{2}\\right)(3) = -3$.\n\n**The Full Solution:**\nStep 1: Read the vertex from the graph: the curve bottoms out at $(3, -2)$, so $f(x) = a(x - 3)^2 - 2$.\nStep 2: Find $a$ with a second point. The curve passes through $(1, 0)$, so $0 = a(1 - 3)^2 - 2 = 4a - 2$, giving $a = \\frac{1}{2}$.\nStep 3: Expand: $\\frac{1}{2}(x^2 - 6x + 9) - 2 = \\frac{1}{2}x^2 - 3x + \\frac{9}{2} - 2 = \\frac{1}{2}x^2 - 3x + \\frac{5}{2}$, so $b = -3$. Check the other intercept: $\\frac{1}{2}(25) - 3(5) + \\frac{5}{2} = 12.5 - 15 + 2.5 = 0$, matching $(5, 0)$ on the graph. ✓\n\n**Common Mistakes:**\n* $-6$: assumes $a = 1$ and expands $(x - 3)^2 - 2 = x^2 - 6x + 7$. The graph's second point rules that out — a channel $2$ feet deep and $4$ feet wide forces $a = \\frac{1}{2}$.\n* $3$: expands correctly but reports $+3$, losing the sign that a vertex to the RIGHT of the $y$-axis always produces.\n* $2.5$: reports $c$, the value of $f(0)$, instead of the coefficient $b$.\n\n**Test Day Takeaway:** Read the vertex first, then use one more point on the graph to pin $a$ — the coefficient $b$ is $-2ah$, so $a$ must be settled before $b$ can be.",
  skills: ["distributive-property", "converting-quadratic-forms"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A pumping-station flow meter is calibrated by solving the equation $|3x - 40| = 5x + 8$, where $x$ is the calibration offset, in liters per minute, applied to the meter's reading. What is the value of $x$?",
  correctAnswer: "4",
  explanation: "**SAT Pattern: Absolute Value Equation**\n\n**The correct answer is $4$.** Splitting the absolute value gives $x = -24$ or $x = 4$, and only $x = 4$ satisfies the original equation.\n\n**The Fast Way (~40s):** The right side must be non-negative, so $5x + 8 \\ge 0$ and $x \\ge -1.6$. That kills the negative branch immediately; solve $3x - 40 = -(5x + 8)$ to get $x = 4$.\n\n**The Full Solution:**\nStep 1: Branch one: $3x - 40 = 5x + 8$ gives $-2x = 48$, so $x = -24$.\nStep 2: Branch two: $3x - 40 = -(5x + 8) = -5x - 8$ gives $8x = 32$, so $x = 4$.\nStep 3: Test both in the ORIGINAL equation. At $x = -24$: the left side is $|-112| = 112$ but the right side is $5(-24) + 8 = -112$, so that branch fails. At $x = 4$: the left side is $|12 - 40| = 28$ and the right side is $20 + 8 = 28$. ✓\n\n**Common Mistakes:**\n* $-24$: the root from the first branch, kept without testing it. An absolute value can never equal the negative number $-112$.\n* $6$: comes from writing the second branch as $3x - 40 = -5x + 8$, distributing the minus sign to $5x$ but not to $8$, which gives $8x = 48$.\n* $24$: comes from solving $-2x = 48$ as $x = 24$, dropping the minus sign on the coefficient.\n\n**Test Day Takeaway:** When a variable sits on BOTH sides of an absolute value equation, every branch is a candidate, not an answer — substitute each one back before you grid it.",
  skills: ["combining-like-terms"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A county health department recorded $900$ confirmed cases of a respiratory illness, $540$ of them in adults and the rest in children. Hospitalization was required for $30\\%$ of the adult cases and for $15\\%$ of the child cases. If one of the $900$ cases is selected at random, what is the probability that the selected case required hospitalization?",
  choices: [
    // distractor: reports the child hospitalization rate alone, ignoring the 540 adult cases
    { id: "A", text: "$0.15$" },
    // distractor: averages the two rates, (0.30 + 0.15)/2, instead of weighting them by group size
    { id: "B", text: "$0.225$" },
    { id: "C", text: "$0.24$" },
    // distractor: reports the adult hospitalization rate alone, ignoring the 360 child cases
    { id: "D", text: "$0.30$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice C is correct.** There are $162$ adult and $54$ child hospitalizations, so $216$ of the $900$ cases required hospitalization and the probability is $\\frac{216}{900} = 0.24$.\n\n**The Fast Way (~40s):** Weight each rate by its share: $0.6(0.30) + 0.4(0.15) = 0.18 + 0.06 = 0.24$.\n\n**The Full Solution:**\nStep 1: Count the children: $900 - 540 = 360$.\nStep 2: Count hospitalizations in each group: $0.30(540) = 162$ adults and $0.15(360) = 54$ children, for $162 + 54 = 216$ in all.\nStep 3: A marginal probability is the group total over the grand total: $\\frac{216}{900} = 0.24$. Check: $216$ is a little under a quarter of $900$, and $0.24$ lands between the two group rates but closer to $0.30$ because adults are the larger group. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.15$): the child rate by itself. That is the probability of hospitalization GIVEN a child case, not the probability across all $900$ cases.\n* Choice B ($0.225$): the plain average of $0.30$ and $0.15$. Averaging rates works only when the groups are the same size, and here adults outnumber children $540$ to $360$.\n* Choice D ($0.30$): the adult rate by itself, which would be the answer only if every case were an adult case.\n\n**Test Day Takeaway:** A marginal probability puts the whole population in the denominator. When two subgroups have different rates, weight each rate by its share before combining.",
  skills: ["probability-basics"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A vaccination clinic charges $x$ dollars for a first-dose visit and $y$ dollars for a booster visit. One week's charges satisfy $5x + 4y = k$ and the next week's satisfy $4x + 5y = k - 10$, where $k$ is a constant. If $x + y = 14$, what is the value of $k$?",
  choices: [
    // distractor: reports k - 10, the right side of the second equation, instead of k
    { id: "A", text: "$58$" },
    // distractor: drops the -10 and solves 2k = 126
    { id: "B", text: "$63$" },
    { id: "C", text: "$68$" },
    // distractor: reports 9(x + y) = 126 without solving for k
    { id: "D", text: "$126$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice C is correct.** Adding the two equations gives $9x + 9y = 2k - 10$; substituting $x + y = 14$ gives $126 = 2k - 10$, so $k = 68$.\n\n**The Fast Way (~30s):** Add the equations: $9(x + y) = 2k - 10$. Then $9(14) = 126 = 2k - 10$, so $2k = 136$ and $k = 68$.\n\n**The Full Solution:**\nStep 1: Add the equations term by term: $(5x + 4x) + (4y + 5y) = k + (k - 10)$, or $9x + 9y = 2k - 10$.\nStep 2: The left side is $9(x + y)$, and $x + y = 14$, so $9(14) = 126 = 2k - 10$.\nStep 3: Solve: $2k = 136$, so $k = 68$. Check by finding the individual charges: subtracting the equations gives $x - y = 10$, so $x = 12$ and $y = 2$; then $5(12) + 4(2) = 68$ and $4(12) + 5(2) = 58 = 68 - 10$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($58$): the value of $k - 10$, the right side of the second equation. It is a real quantity in the problem, just not the one asked for.\n* Choice B ($63$): drops the $-10$ and solves $2k = 126$, which ignores that the two right sides differ.\n* Choice D ($126$): stops at $9(x + y) = 126$ and reports that sum instead of finishing the equation $126 = 2k - 10$.\n\n**Test Day Takeaway:** When the question asks for a combination, add or subtract the equations first — solving for $x$ and $y$ separately is a longer road to the same place.",
  skills: ["elimination-method"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The velocity of water leaving a spillway is modeled by $v = 8\\sqrt{h + 5}$, where $v$ is the velocity in feet per second and $h$ is the head in feet. For what value of $h$ does this model predict a velocity of $56$ feet per second?",
  choices: [
    // distractor: divides 56 by 8 to get 7 and then subtracts 5 without ever squaring
    { id: "A", text: "$2$" },
    // distractor: stops at the value of the radical, 56/8 = 7
    { id: "B", text: "$7$" },
    { id: "C", text: "$44$" },
    // distractor: squares 7 correctly but forgets to subtract the 5 inside the radical
    { id: "D", text: "$49$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Radical Equation**\n\n**Choice C is correct.** Setting $8\\sqrt{h + 5} = 56$ gives $\\sqrt{h + 5} = 7$, so $h + 5 = 49$ and $h = 44$.\n\n**The Fast Way (~25s):** Divide by $8$, square, subtract $5$: $7 \\to 49 \\to 44$.\n\n**The Full Solution:**\nStep 1: Isolate the radical: $\\sqrt{h + 5} = \\frac{56}{8} = 7$.\nStep 2: Square both sides: $h + 5 = 49$.\nStep 3: Solve: $h = 49 - 5 = 44$ feet. Check in the original model: $8\\sqrt{44 + 5} = 8\\sqrt{49} = 8(7) = 56$ feet per second. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): divides by $8$ to get $7$, then subtracts $5$ immediately. Skipping the squaring step undoes only half of the radical.\n* Choice B ($7$): the value of $\\sqrt{h + 5}$, not of $h$ — the answer to the middle step rather than to the question.\n* Choice D ($49$): squares correctly but reports $h + 5$ as though the radical held $h$ alone.\n\n**Test Day Takeaway:** Isolate the radical before squaring, and remember that squaring returns the WHOLE expression under the root — anything added inside still has to be removed.",
  skills: ["radical-equations"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table lists the ticket price for each seating section of a concert hall. The mezzanine was closed for one performance; the other two sections sold $610$ tickets and took in $\\$19{,}060$. How many more balcony tickets than orchestra tickets were sold?",
  questionTable: { headers: ["Section", "Ticket price (dollars)"], rows: [["Balcony", "$24$"], ["Mezzanine", "$33$"], ["Orchestra", "$41$"]] },
  choices: [
    { id: "A", text: "$90$" },
    // distractor: stops at the number of orchestra tickets, 260, instead of the difference
    { id: "B", text: "$260$" },
    // distractor: stops at the number of balcony tickets, 350, instead of the difference
    { id: "C", text: "$350$" },
    // distractor: reports the total number of tickets sold rather than the difference between the two sections
    { id: "D", text: "$610$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice A is correct.** With $b$ balcony and $r$ orchestra tickets, $b + r = 610$ and $24b + 41r = 19{,}060$, which give $r = 260$ and $b = 350$, a difference of $90$.\n\n**The Fast Way (~50s):** If all $610$ tickets were balcony seats, sales would be $24(610) = 14{,}640$ dollars. Each orchestra seat adds $17$ dollars, so $r = \\frac{19{,}060 - 14{,}640}{17} = 260$, leaving $b = 350$ and $b - r = 90$.\n\n**The Full Solution:**\nStep 1: Write the system. Ticket count: $b + r = 610$. Revenue, using only the two open sections: $24b + 41r = 19{,}060$.\nStep 2: Substitute $b = 610 - r$: $24(610 - r) + 41r = 19{,}060$, so $14{,}640 + 17r = 19{,}060$ and $17r = 4{,}420$, giving $r = 260$.\nStep 3: Then $b = 610 - 260 = 350$, so $b - r = 350 - 260 = 90$. Check the revenue: $24(350) + 41(260) = 8{,}400 + 10{,}660 = 19{,}060$ dollars. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($260$): the orchestra count. It is the value the substitution produces first, so it is easy to bubble before finishing the comparison.\n* Choice C ($350$): the balcony count, the second quantity the system produces — still not the difference the question asks for.\n* Choice D ($610$): the total tickets sold, which is a given rather than a result.\n\n**Test Day Takeaway:** Build the system from the sections that actually sold, then reread the last sentence — \"how many more\" asks for a difference, not for either count.",
  skills: ["word-problem-to-equation", "setting-up-systems"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "hard",
  band: 6,
  question: "In a traffic-signal timing model, the constants $c$ and $k$, both measured in seconds, satisfy $\\frac{2c + 9}{5} = k$. What is the value of $\\frac{2c + 29}{5}$ in terms of $k$?",
  choices: [
    { id: "A", text: "$k + 4$" },
    // distractor: adds 29/5 to k without removing the 9/5 that is already inside k
    { id: "B", text: "$k + \\frac{29}{5}$" },
    // distractor: adds the raw difference 20 without dividing it by 5
    { id: "C", text: "$k + 20$" },
    // distractor: multiplies the whole equation by 5 and then adds 20, so the k-term is scaled too
    { id: "D", text: "$5k + 20$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Shifted Output**\n\n**Choice A is correct.** Since $\\frac{2c + 29}{5} = \\frac{(2c + 9) + 20}{5} = \\frac{2c + 9}{5} + \\frac{20}{5}$, the second expression equals $k + 4$.\n\n**The Fast Way (~20s):** The numerator grows by $20$ and everything is divided by $5$, so the output grows by $\\frac{20}{5} = 4$.\n\n**The Full Solution:**\nStep 1: Compare the two numerators: $2c + 29$ is exactly $20$ more than $2c + 9$.\nStep 2: Split the fraction: $\\frac{(2c + 9) + 20}{5} = \\frac{2c + 9}{5} + \\frac{20}{5}$.\nStep 3: The first piece is $k$ by the given equation and the second is $4$, so the value is $k + 4$. Check with a number: if $c = 8$, then $k = \\frac{25}{5} = 5$ and $\\frac{2(8) + 29}{5} = \\frac{45}{5} = 9$, which is $k + 4$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($k + \\frac{29}{5}$): adds the whole new constant as if the original numerator had none, double-counting the $9$ that is already baked into $k$.\n* Choice C ($k + 20$): notices the numerator rose by $20$ but forgets that the $5$ in the denominator shrinks that jump to $4$.\n* Choice D ($5k + 20$): clears the denominator on one side only, scaling $k$ by $5$ while the question still asks for the divided value.\n\n**Test Day Takeaway:** Do not solve for the hidden variable. Write the new expression as the old one plus a constant and let the given value carry the weight.",
  skills: ["solving-equations", "ratios"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A cylindrical autoclave chamber whose base radius is $6$ inches holds $864\\pi$ cubic inches when it is filled to $80\\%$ of capacity. How many inches tall is the chamber?",
  correctAnswer: "30",
  explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $30$.** The full capacity is $\\frac{864\\pi}{0.8} = 1080\\pi$ cubic inches, and $1080\\pi = \\pi(6)^2 h$ gives $h = 30$ inches.\n\n**The Fast Way (~35s):** Undo the $80\\%$ first ($864 \\div 0.8 = 1080$), then divide by $r^2 = 36$: $1080 \\div 36 = 30$.\n\n**The Full Solution:**\nStep 1: The $864\\pi$ cubic inches is only $80\\%$ of the chamber, so the full volume $V$ satisfies $0.8V = 864\\pi$ and $V = 1080\\pi$ cubic inches.\nStep 2: A cylinder's volume is $V = \\pi r^2 h$, and $r = 6$, so $1080\\pi = \\pi(36)h$.\nStep 3: Divide both sides by $36\\pi$: $h = 30$ inches. Check: a chamber of radius $6$ and height $30$ holds $\\pi(36)(30) = 1080\\pi$ cubic inches, and $80\\%$ of that is $864\\pi$. ✓\n\n**Common Mistakes:**\n* $24$: treats $864\\pi$ as the full capacity and computes $\\frac{864}{36}$, ignoring that the chamber was only four-fifths full.\n* $7.5$: uses the diameter, $12$ inches, in place of the radius, so the division becomes $\\frac{1080}{144}$.\n* $180$: divides by $r$ instead of $r^2$, computing $\\frac{1080}{6}$ and forgetting that the base area is $\\pi r^2$.\n\n**Test Day Takeaway:** Convert a partial fill to the full volume BEFORE you use $V = \\pi r^2 h$, and square the radius — the two most common cylinder slips both live in that one formula.",
  skills: ["volume-prism"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "On a levee profile, two survey benchmarks are plotted at $(-3, 8)$ and $(k, -4)$, where the coordinates are in meters. The segment joining the benchmarks has a slope of $-\\frac{3}{2}$. What is the value of $k$?",
  choices: [
    // distractor: sets k + 3 = -8, losing the minus sign already carried by the rise of -12
    { id: "A", text: "$-11$" },
    { id: "B", text: "$5$" },
    // distractor: solves k + 3 = 8 correctly but reports 8 without subtracting the 3
    { id: "C", text: "$8$" },
    // distractor: inverts the slope, solving (k + 3)/(-12) = -3/2 to get k + 3 = 18
    { id: "D", text: "$15$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice B is correct.** The slope is $\\frac{-4 - 8}{k - (-3)} = \\frac{-12}{k + 3}$, and setting that equal to $-\\frac{3}{2}$ gives $k + 3 = 8$, so $k = 5$.\n\n**The Fast Way (~25s):** The rise is $-12$. A slope of $-\\frac{3}{2}$ means the run is $\\frac{-12}{-3/2} = 8$, so $k = -3 + 8 = 5$.\n\n**The Full Solution:**\nStep 1: Write the slope with the unknown in place: $m = \\frac{-4 - 8}{k - (-3)} = \\frac{-12}{k + 3}$.\nStep 2: Set it equal to the given slope: $\\frac{-12}{k + 3} = -\\frac{3}{2}$. Cross-multiplying gives $-24 = -3(k + 3)$, so $k + 3 = 8$.\nStep 3: Solve: $k = 5$. Check with the two points $(-3, 8)$ and $(5, -4)$: the slope is $\\frac{-12}{8} = -\\frac{3}{2}$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-11$): sets $k + 3 = -8$, applying the minus sign a second time even though the rise of $-12$ already carries it; the points $(-3, 8)$ and $(-11, -4)$ have slope $+\\frac{3}{2}$.\n* Choice C ($8$): reaches $k + 3 = 8$ and bubbles the $8$, one subtraction short of the answer.\n* Choice D ($15$): flips the slope on the way in, solving $\\frac{k + 3}{-12} = -\\frac{3}{2}$, which produces a run of $18$ instead of $8$.\n\n**Test Day Takeaway:** Put the unknown coordinate into $\\frac{y_2 - y_1}{x_2 - x_1}$ before you touch it, and finish by isolating the variable, not the binomial that contains it.",
  skills: ["slope-from-points"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A steel bracing frame on a pedestrian overpass forms a triangle whose sides measure $9$ feet, $k$ feet, and $41$ feet, and the angle opposite the $41$-foot side measures $90^\\circ$. What is the value of $k$?",
  choices: [
    // distractor: subtracts the side lengths, 41 - 9, instead of the squares
    { id: "A", text: "$32$" },
    { id: "B", text: "$40$" },
    // distractor: adds the two given side lengths, 9 + 41, as if 41 were a leg
    { id: "C", text: "$50$" },
    // distractor: stops at k squared, 1,600, without taking the square root
    { id: "D", text: "$1{,}600$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice B is correct.** The side opposite the right angle is the hypotenuse, so $9^2 + k^2 = 41^2$, giving $k^2 = 1{,}681 - 81 = 1{,}600$ and $k = 40$.\n\n**The Fast Way (~25s):** $41$ is the hypotenuse, and $9$-$40$-$41$ is a standard Pythagorean triple.\n\n**The Full Solution:**\nStep 1: The angle opposite the $41$-foot side is the right angle, so $41$ is the hypotenuse and $9$ and $k$ are the legs.\nStep 2: Apply the Pythagorean theorem: $9^2 + k^2 = 41^2$, or $81 + k^2 = 1{,}681$.\nStep 3: Solve: $k^2 = 1{,}600$, so $k = 40$ feet. Check: $81 + 1{,}600 = 1{,}681 = 41^2$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): subtracts the side lengths themselves, $41 - 9$, instead of subtracting their squares — the theorem never applies to the sides directly.\n* Choice C ($50$): adds $9$ and $41$, which would treat $41$ as a leg and $k$ as the hypotenuse, contradicting the given right angle.\n* Choice D ($1{,}600$): the value of $k^2$, one square root short of the length.\n\n**Test Day Takeaway:** Find the hypotenuse first — it is always the side opposite the right angle — then square, subtract, and remember to take the root.",
  skills: ["pythagorean-theorem"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A quadratic function $f$ has the graph shown. A projection-mapping program computes a second function using $g(x) = -3f(x + 1) + 2$. What is the value of $g(1)$?",
  diagram: { type: "parabola", params: { vertex: { h: 2, k: -4 }, a: 1, xRange: [-2, 6], yRange: [-6, 10], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showVertex: false } },
  choices: [
    // distractor: multiplies by +3 instead of -3: 3(-4) + 2
    { id: "A", text: "$-10$" },
    // distractor: drops the factor of -3 entirely and computes f(2) + 2
    { id: "B", text: "$-2$" },
    // distractor: evaluates f at 1, ignoring the +1 inside the function: -3(-3) + 2
    { id: "C", text: "$11$" },
    { id: "D", text: "$14$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Transformation**\n\n**Choice D is correct.** $g(1) = -3f(1 + 1) + 2 = -3f(2) + 2$, and the graph shows $f(2) = -4$, so $g(1) = 12 + 2 = 14$.\n\n**The Fast Way (~30s):** Substitute the input first: $g(1)$ needs $f(2)$, the low point of the graph, which is $-4$. Then $-3(-4) + 2 = 14$.\n\n**The Full Solution:**\nStep 1: Substitute $x = 1$ into the definition: $g(1) = -3f(1 + 1) + 2 = -3f(2) + 2$.\nStep 2: Read $f(2)$ from the graph. The curve reaches its lowest point at $(2, -4)$, so $f(2) = -4$.\nStep 3: Evaluate: $-3(-4) + 2 = 12 + 2 = 14$. Check the reading against a second point: the graph crosses the $x$-axis at $(0, 0)$ and $(4, 0)$, which is consistent with $f(x) = (x - 2)^2 - 4$, and $f(2) = -4$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$): uses $f(2) = -4$ but multiplies by $+3$, giving $-12 + 2$. The negative coefficient reflects the graph, and dropping its sign flips the result.\n* Choice B ($-2$): applies the shift correctly but ignores the factor of $-3$, computing $f(2) + 2 = -4 + 2$.\n* Choice C ($11$): evaluates $f$ at $1$ instead of at $1 + 1$, ignoring the shift inside the function; the graph gives $f(1) = -3$, and $-3(-3) + 2 = 11$.\n\n**Test Day Takeaway:** Evaluate the inside of the function first. $g(1)$ asks for $f$ at $1 + 1$, not at $1$ itself — do that substitution before you touch the graph.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 17,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "On a shop drawing in which each unit represents $1$ foot, a triangular acoustic panel has corners at $(-4, 1)$, $(8, 1)$, and $(2, 10)$. How many square feet of fabric cover one face of the panel?",
  correctAnswer: "54",
  explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $54$.** The side from $(-4, 1)$ to $(8, 1)$ is horizontal with length $12$, the opposite corner sits $9$ units above that line, and $\\frac{1}{2}(12)(9) = 54$.\n\n**The Fast Way (~35s):** Two corners share the height $y = 1$, so the base is $8 - (-4) = 12$ and the height is $10 - 1 = 9$. Half of $12 \\times 9$ is $54$.\n\n**The Full Solution:**\nStep 1: Spot the horizontal side. The corners $(-4, 1)$ and $(8, 1)$ have the same $y$-value, so that side is the base and its length is $8 - (-4) = 12$ feet.\nStep 2: The height is the vertical distance from the third corner to that base: $10 - 1 = 9$ feet.\nStep 3: Area $= \\frac{1}{2}bh = \\frac{1}{2}(12)(9) = 54$ square feet. Check: the triangle fits inside the $12$-by-$9$ rectangle spanning $x$ from $-4$ to $8$ and $y$ from $1$ to $10$, and it fills exactly half of it. ✓\n\n**Common Mistakes:**\n* $108$: computes $12 \\times 9$ and forgets the factor of $\\frac{1}{2}$ — that is the rectangle, not the triangle.\n* $60$: uses the apex's $y$-coordinate, $10$, as the height instead of the vertical distance $10 - 1 = 9$ above the base.\n* $36$: uses $8$, the $x$-coordinate of the right corner, as the base instead of the length $8 - (-4) = 12$.\n\n**Test Day Takeaway:** Look for two points that share an $x$- or $y$-value; that side is the base and the third point's distance from that line is the height. Both are differences of coordinates, never coordinates themselves.",
  skills: ["triangle-area"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A technician counts $180$ cells in a laboratory culture at hour $0$ and $1{,}440$ cells at hour $9$ of the same experiment. If the cell count is modeled by an exponential function of the number of hours since hour $0$, how many cells are present at hour $6$?",
  choices: [
    // distractor: applies the 3-hour doubling factor only once instead of twice
    { id: "A", text: "$360$" },
    { id: "B", text: "$720$" },
    // distractor: averages the two counts, (180 + 1,440)/2, as if the count rose by equal amounts and hour 6 were the halfway point
    { id: "C", text: "$810$" },
    // distractor: interpolates linearly: 180 + (2/3)(1,440 - 180)
    { id: "D", text: "$1{,}020$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice B is correct.** The count multiplies by $\\frac{1440}{180} = 8$ over $9$ hours, so it doubles every $3$ hours; at hour $6$ it has doubled twice, giving $180(4) = 720$ cells.\n\n**The Fast Way (~40s):** $8 = 2^3$, so the culture doubles every $3$ hours. Hour $6$ is two doublings after hour $0$: $180 \\to 360 \\to 720$.\n\n**The Full Solution:**\nStep 1: Find the total growth factor: $\\frac{1{,}440}{180} = 8$ over the $9$-hour span.\nStep 2: Split that span into three equal $3$-hour blocks. If the per-block factor is $b$, then $b^3 = 8$, so $b = 2$.\nStep 3: Hour $6$ is two blocks after hour $0$: $180 \\cdot 2^2 = 180(4) = 720$ cells. Check the model forward: $720 \\cdot 2 = 1{,}440$ at hour $9$, which matches the technician's second count. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($360$): doubles once and stops, as if hour $6$ were one block after hour $0$ rather than two.\n* Choice C ($810$): the plain average of the two counts. Averaging the endpoints ignores the compounding and also ignores that hour $6$ is two-thirds of the way through the span, not halfway.\n* Choice D ($1{,}020$): interpolates in a straight line, adding two-thirds of the total increase; that treats the growth as linear, which the constant multiplier rules out.\n\n**Test Day Takeaway:** Turn the total factor into a per-period factor with a root, not a division. Here $8$ over three blocks means $\\sqrt[3]{8} = 2$ per block.",
  skills: ["exponential-growth-decay"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A scenic shop mills a curved backdrop edge whose profile is given by $x^2 - 18x + 74$. The shop stores every profile in the form $(x - h)^2 + k$, where $h$ and $k$ are constants. Which expression does the shop store for this profile?",
  choices: [
    // distractor: keeps the original constant 74 and never compensates for the 81 the square introduces; it expands to x^2 - 18x + 155
    { id: "A", text: "$(x - 9)^2 + 74$" },
    // distractor: subtracts in the wrong order, 81 - 74 = 7 instead of 74 - 81 = -7; it expands to x^2 - 18x + 88
    { id: "B", text: "$(x - 9)^2 + 7$" },
    // distractor: uses +9 inside the square, which expands to x^2 + 18x + 74 and reverses the sign of the middle term
    { id: "C", text: "$(x + 9)^2 - 7$" },
    { id: "D", text: "$(x - 9)^2 - 7$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice D is correct.** Half of $-18$ is $-9$, and $(x - 9)^2 = x^2 - 18x + 81$, so $x^2 - 18x + 74 = (x - 9)^2 - 81 + 74 = (x - 9)^2 - 7$.\n\n**The Fast Way (~20s):** Halve the middle coefficient to get $-9$, then adjust the constant: $74 - 81 = -7$.\n\n**The Full Solution:**\nStep 1: Take half of the coefficient of $x$: $\\frac{-18}{2} = -9$, so the square is $(x - 9)^2$.\nStep 2: Expanding $(x - 9)^2$ gives $x^2 - 18x + 81$, which is $81 - 74 = 7$ too large in its constant term.\nStep 3: Subtract that surplus: $x^2 - 18x + 74 = (x - 9)^2 - 7$. Check by expanding back: $(x - 9)^2 - 7 = x^2 - 18x + 81 - 7 = x^2 - 18x + 74$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(x - 9)^2 + 74$): forms the square correctly but carries the original constant along unchanged, so it expands to $x^2 - 18x + 155$.\n* Choice B ($(x - 9)^2 + 7$): does the compensation backwards, computing $81 - 74$ instead of $74 - 81$, and expands to $x^2 - 18x + 88$.\n* Choice C ($(x + 9)^2 - 7$): has the right constant but the wrong sign inside the square; it expands to $x^2 + 18x + 74$, whose middle term points the wrong way.\n\n**Test Day Takeaway:** Completing the square always adds $\\left(\\frac{b}{2}\\right)^2$, so you must subtract it back. Expand your answer for two seconds — the middle term is the fastest check there is.",
  skills: ["quadratics"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A tank holds $60$ liters of water containing $45$ milligrams of chlorine. Water containing $1.2$ milligrams of chlorine per liter is then added. After $v$ liters have been added, the chlorine concentration, in milligrams per liter, is $\\frac{45 + 1.2v}{60 + v}$. For what value of $c$ does the equation $\\frac{45 + 1.2v}{60 + v} = c$ have no solution?",
  choices: [
    // distractor: gives the concentration before any water is added, 45/60, which the equation reaches at v = 0
    { id: "A", text: "$0.75$" },
    // distractor: sets the numerator equal to the denominator, 45 + 1.2v = 60 + v, which has the solution v = 75
    { id: "B", text: "$1.00$" },
    { id: "C", text: "$1.20$" },
    // distractor: adds the two concentrations, 0.75 + 1.2, instead of examining the equation
    { id: "D", text: "$1.95$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice C is correct.** Clearing the denominator gives $45 + 1.2v = c(60 + v)$, or $(1.2 - c)v = 60c - 45$. At $c = 1.2$ the coefficient of $v$ is $0$ while the right side is $27$, so no value of $v$ works.\n\n**The Fast Way (~45s):** A rational equation has no solution exactly when the variable cancels and leaves a false statement. Here the $v$-terms cancel when $c$ equals the added water's concentration, $1.2$.\n\n**The Full Solution:**\nStep 1: Multiply both sides by $60 + v$: $45 + 1.2v = 60c + cv$.\nStep 2: Collect the $v$-terms on one side: $1.2v - cv = 60c - 45$, so $(1.2 - c)v = 60c - 45$.\nStep 3: This has a solution for every $c$ except one: when $1.2 - c = 0$, the left side is $0$ for every $v$, and the right side is $60(1.2) - 45 = 27 \\ne 0$. So $c = 1.20$ makes the equation unsolvable. Check a nearby value: at $c = 1.19$, $(0.01)v = 26.4$ gives $v = 2{,}640$, a genuine solution — the mixture creeps toward $1.2$ but never reaches it. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.75$): the concentration of the tank before anything is added, $\\frac{45}{60}$. The equation reaches it at $v = 0$, so it is a solution, not a gap.\n* Choice B ($1.00$): comes from setting the numerator equal to the denominator, $45 + 1.2v = 60 + v$; that gives $v = 75$ and a concentration of exactly $1$, again a solution.\n* Choice D ($1.95$): adds $0.75$ and $1.2$ as if concentrations stacked. Mixing two liquids can never produce a concentration above the stronger of the two.\n\n**Test Day Takeaway:** A rational equation fails only when the variable disappears and leaves a contradiction. Move everything to one side, factor out the variable, and ask which constant zeroes its coefficient.",
  skills: ["rational-expressions"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cable profile is modeled by $y = x^2 - 6x + 14$, whose graph is shown, where $x$ and $y$ are measured in meters. A straight support modeled by $y = mx - 2$, where $m$ is positive, is tangent to the cable profile. What is the value of $m$?",
  diagram: { type: "parabola", params: { vertex: { h: 3, k: 5 }, a: 1, xRange: [-1, 7], yRange: [0, 16], xTickInterval: 1, yTickInterval: 2, gridInterval: 1, showVertex: false } },
  correctAnswer: "2",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $2$.** Setting the two models equal gives $x^2 - (6 + m)x + 16 = 0$, and tangency forces the discriminant to zero: $(6 + m)^2 = 64$, so $m = 2$ or $m = -14$, and only $m = 2$ is positive.\n\n**The Fast Way (~50s):** One shared point means one repeated root, so $(6 + m)^2 - 4(16) = 0$. Then $6 + m = \\pm 8$, and the positive choice is $m = 2$.\n\n**The Full Solution:**\nStep 1: Set the curve equal to the line: $x^2 - 6x + 14 = mx - 2$, so $x^2 - (6 + m)x + 16 = 0$.\nStep 2: A tangent line meets the curve exactly once, so this quadratic has one repeated solution and its discriminant is $0$: $(6 + m)^2 - 4(1)(16) = 0$, giving $(6 + m)^2 = 64$.\nStep 3: Then $6 + m = 8$ or $6 + m = -8$, so $m = 2$ or $m = -14$; the problem restricts $m$ to positive values, so $m = 2$. Check: with $m = 2$, $x^2 - 8x + 16 = (x - 4)^2 = 0$ has the single root $x = 4$, where the curve is at $16 - 24 + 14 = 6$ and the line is at $2(4) - 2 = 6$. ✓\n\n**Common Mistakes:**\n* $-14$: the other root of $(6 + m)^2 = 64$. It describes a real tangent line, but the problem says $m$ is positive.\n* $8$: comes from dropping the $-6x$ term when combining, which leaves $x^2 - mx + 16 = 0$ and $m^2 = 64$. The curve's own linear term has to be folded into the coefficient.\n* $\\frac{7}{3}$: assumes the support touches at the vertex $(3, 5)$ and solves $3m - 2 = 5$. A tangent line meets a parabola at one point, but not necessarily at the vertex.\n\n**Test Day Takeaway:** Tangent means one solution, and one solution means discriminant zero. Combine into $ax^2 + bx + c = 0$ first, then set $b^2 - 4ac = 0$.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A mosquito-abatement district models its treatment zone in the xy-plane by the equation $x^2 + y^2 - 14x + 8y - 16 = 0$, where the units are kilometers. The point $(a, -4)$ lies on the boundary of the zone and $a > 7$. What is the value of $a$?",
  correctAnswer: "16",
  explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $16$.** Completing the square gives $(x - 7)^2 + (y + 4)^2 = 81$, so the zone is a circle centered at $(7, -4)$ with radius $9$; the boundary point at height $y = -4$ with $a > 7$ is $(7 + 9, -4) = (16, -4)$.\n\n**The Fast Way (~45s):** The center is $(7, -4)$ and the radius is $9$. Because $(a, -4)$ has the same $y$-value as the center, it sits on the horizontal diameter: $a = 7 + 9 = 16$.\n\n**The Full Solution:**\nStep 1: Group and complete the square: $x^2 - 14x$ needs $+49$, and $y^2 + 8y$ needs $+16$, so $(x - 7)^2 + (y + 4)^2 = 16 + 49 + 16 = 81$.\nStep 2: The zone is the circle with center $(7, -4)$ and radius $\\sqrt{81} = 9$ kilometers.\nStep 3: Substitute $y = -4$: $(a - 7)^2 + 0 = 81$, so $a - 7 = \\pm 9$ and $a = 16$ or $a = -2$; the condition $a > 7$ selects $a = 16$. Check in the original equation: $16^2 + (-4)^2 - 14(16) + 8(-4) - 16 = 256 + 16 - 224 - 32 - 16 = 0$. ✓\n\n**Common Mistakes:**\n* $-2$: the other point where the circle crosses $y = -4$. It satisfies the equation but violates the condition $a > 7$.\n* $7$: the $x$-coordinate of the center, which is the midpoint of the zone rather than a point on its boundary.\n* $11$: comes from reading $r^2$ as the $16$ already sitting in the equation, giving $r = 4$ and $a = 7 + 4$. The two constants added while completing the square, $49$ and $16$, must move to the right side first.\n\n**Test Day Takeaway:** Move the constant, complete both squares, and add every compensating term to the right side — the radius is the square root of what lands there, not of the number the general form started with.",
  skills: ["circle-equation", "completing-square-circles"]
}
      ]
    }
  ]
};

export default practiceTest12;
