// Practice Test 6 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Official-calibration recreation (2026-09-01): every item re-authored per
// docs/TEST_RECREATION_SPEC.md with slot metadata (id/type/difficulty/band/
// skills/pattern) frozen. Distribution: 3E / 13M / 6H. Q1-3 easy openers.
// Max-score ceiling: ~650. Figure density lifted: 5 diagram items
// (Q2 rightTriangle, Q7 dotPlot, Q15 rightTriangle, Q21 scatterplot,
// Q22 twoWayTable). Numeric MC choices sorted ascending.

export const practiceTest6M2Easy = {
  id: "module-2-easy",
  title: "Module 2 (Easy)",
  variant: "easy",
  timeLimit: 35,
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      difficulty: "easy",
      band: 2,
      question: "The graph shows the water level $L$, in meters, at a reservoir gauge $m$ months after the start of a regional drought. Which equation represents the relationship shown in the graph?",
      diagram: { type: "linearGraph", params: { slope: -1.5, yIntercept: 12, xRange: [0, 8], yRange: [0, 12], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showPoints: [[0, 12], [8, 0]], label: "L" } },
      choices: [
        { id: "A", text: "$L = 12 - 1.5m$" },
        // distractor: reads the falling line as rising and keeps the slope positive
        { id: "B", text: "$L = 12 + 1.5m$" },
        // distractor: moves the minus sign off the rate and onto the starting level, giving a rising line that starts at $-12$
        { id: "C", text: "$L = 1.5m - 12$" },
        // distractor: swaps the slope and the $y$-intercept, using $1.5$ as the starting level
        { id: "D", text: "$L = 1.5 - 12m$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The line starts at $12$ on the vertical axis and falls to $0$ at $m = 8$, so the rate is $-12 \\div 8 = -1.5$ meters per month. That is $L = 12 - 1.5m$.\n\n**The Full Solution:**\nStep 1: Read the $y$-intercept. The line crosses the vertical axis at $L = 12$, so the reservoir held $12$ meters of water when the drought began.\nStep 2: Read the slope from the two marked points $(0, 12)$ and $(8, 0)$: $\\frac{0 - 12}{8 - 0} = \\frac{-12}{8} = -1.5$.\nStep 3: Write slope-intercept form $L = -1.5m + 12$, or $L = 12 - 1.5m$. Check at $m = 4$: $12 - 1.5(4) = 6$, and the graph passes through $(4, 6)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($L = 12 + 1.5m$): reads the falling line as rising. A positive slope would put the level at $24$ meters after $8$ months, but the graph shows $0$.\n* Choice C ($L = 1.5m - 12$): moves the minus sign off the rate and onto the starting level. That line rises from $-12$, so month $0$ would start with a negative water level.\n* Choice D ($L = 1.5 - 12m$): swaps the slope and the $y$-intercept, treating $1.5$ as the starting level and $-12$ as the monthly change.\n\n**Test Day Takeaway:** Read the intercept off the vertical axis first, then get the slope from two lattice points the line actually passes through — the two numbers drop straight into $y = mx + b$.",
      skills: ["slope-intercept-form"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "A flock circles a lake along the path $x^2 + y^2 + 6x - 14y - 42 = 0$, measured in kilometers from a trail marker. How many kilometers is the flock from the center of its circular path?",
      correctAnswer: "10",
      explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~20s):** A circular path keeps a constant distance from its center, so the question asks for the radius. Half of $6$ is $3$ and half of $-14$ is $-7$, so $r^2 = 42 + 9 + 49 = 100$ and $r = 10$.\n\n**The Full Solution:**\nStep 1: Group the variables and move the constant: $(x^2 + 6x) + (y^2 - 14y) = 42$.\nStep 2: Complete each square. For $x$, half of $6$ is $3$ and $3^2 = 9$. For $y$, half of $-14$ is $-7$ and $(-7)^2 = 49$. Adding both to each side gives $(x + 3)^2 + (y - 7)^2 = 42 + 9 + 49$.\nStep 3: The right side is $100$, so the path is a circle of radius $\\sqrt{100} = 10$ kilometers about the center $(-3, 7)$. Check the point $(7, 7)$: $49 + 49 + 42 - 98 - 42 = 0$ ✓\n\n**Common Mistakes:**\n* $100$: stops at $r^2$ and reports it as the distance without taking the square root.\n* $\\sqrt{58} \\approx 7.62$: adds $9$ and $49$ but leaves the $-42$ on the left, so $r^2$ comes out as $58$.\n* $7$: reports the $y$-coordinate of the center rather than the distance from it.\n\n**Test Day Takeaway:** Distance from a center on a circular path is the radius. Complete both squares, add the same amounts to the right side, and take the square root at the end.",
      skills: ["circle-equation", "completing-square-circles"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "In a soil lab the nitrogen dose $a$ and the potassium dose $b$, both in grams, must satisfy $2a + 5b = 9$. A second requirement, $8a + 20b = c$, is met by exactly the same dose pairs $(a, b)$. What is the value of $c$?",
      choices: [
        // distractor: divides 9 by the scale factor 4 instead of multiplying (9/4 = 2.25)
        { id: "A", text: "$2.25$" },
        // distractor: reports the scale factor 4 itself instead of applying it to the constant
        { id: "B", text: "$4$" },
        // distractor: copies the constant unchanged, scaling only the coefficients
        { id: "C", text: "$9$" },
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** The coefficients quadruple, $2 \\to 8$ and $5 \\to 20$, so the constant must quadruple too: $c = 4(9) = 36$.\n\n**The Full Solution:**\nStep 1: Two equations are satisfied by exactly the same pairs only when one is a constant multiple of the other.\nStep 2: Compare matching coefficients: $\\frac{8}{2} = 4$ and $\\frac{20}{5} = 4$, so the multiplier is $4$.\nStep 3: Apply that multiplier to the constant: $c = 4 \\times 9 = 36$. Check by scaling the first equation outright: $4(2a + 5b) = 4(9)$ gives $8a + 20b = 36$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.25$): divides the constant by the scale factor instead of multiplying, giving $9 \\div 4 = 2.25$ — the constant would shrink while the coefficients grow.\n* Choice B ($4$): reports the scale factor itself and never applies it to $9$.\n* Choice C ($9$): copies the constant unchanged. Then $8a + 20b = 9$ is a parallel line with no shared pairs at all, not the same set of pairs.\n\n**Test Day Takeaway:** Identical solution sets means one equation is the other times a single number. Read that number off the coefficients, then multiply the constant by it.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "An automated rain gauge at a coastal station records precipitation falling at a constant rate of $18$ millimeters per hour. At that rate, how many centimeters of precipitation fall over one full day of steady rain?",
      choices: [
        // distractor: divides by 24 instead of multiplying by it (18/24 = 0.75)
        { id: "A", text: "$0.75$" },
        // distractor: converts millimeters to centimeters but reports the hourly rate, not the daily total
        { id: "B", text: "$1.8$" },
        { id: "C", text: "$43.2$" },
        // distractor: leaves the daily total in millimeters without converting to centimeters
        { id: "D", text: "$432$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** A day is $24$ hours, so $18 \\times 24 = 432$ millimeters, and $432 \\div 10 = 43.2$ centimeters.\n\n**The Full Solution:**\nStep 1: Convert the time. One full day is $24$ hours, so the total fall is $18 \\, \\frac{\\text{mm}}{\\text{hr}} \\times 24 \\, \\text{hr} = 432$ millimeters.\nStep 2: Convert the length. There are $10$ millimeters in $1$ centimeter, so $432 \\div 10 = 43.2$ centimeters.\nStep 3: Confirm the chain cancels correctly: $\\frac{18 \\text{ mm}}{1 \\text{ hr}} \\times \\frac{24 \\text{ hr}}{1 \\text{ day}} \\times \\frac{1 \\text{ cm}}{10 \\text{ mm}} = 43.2$ centimeters per day ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.75$): divides by $24$ instead of multiplying by it, giving $18 \\div 24 = 0.75$. Dividing would answer how much falls per hour if $18$ were a daily total.\n* Choice B ($1.8$): converts millimeters to centimeters correctly but reports the hourly rate $18 \\div 10 = 1.8$ and never multiplies by $24$.\n* Choice D ($432$): stops after the time conversion and reports $432$ millimeters as though it were centimeters.\n\n**Test Day Takeaway:** Write the conversion as a chain of fractions and cancel units. If the units that survive are not the ones the question asks for, a factor is upside down.",
      skills: ["unit-conversion"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A regatta scorer uses the system $3x + 4y = 47$ and $5x - 2y = 9$, where $x$ and $y$ are the point values of a heat win and a lane bonus. Which system has the same solution as this one?",
      choices: [
        // distractor: doubles the left side of the second equation but leaves its constant at 9
        { id: "A", text: "$3x + 4y = 47$ and $10x - 4y = 9$" },
        { id: "B", text: "$3x + 4y = 47$ and $10x - 4y = 18$" },
        // distractor: doubles the x-term and the constant but leaves the y-term at -2y
        { id: "C", text: "$3x + 4y = 47$ and $10x - 2y = 18$" },
        // distractor: doubles the x-term and the constant of the first equation but leaves 4y unchanged
        { id: "D", text: "$6x + 4y = 94$ and $5x - 2y = 9$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Multiplying an entire equation by $2$ never moves its solutions. Doubling every term of $5x - 2y = 9$ gives $10x - 4y = 18$, paired with the untouched first equation.\n\n**The Full Solution:**\nStep 1: A system keeps its solution when one equation is replaced by a nonzero multiple of itself — every term, including the constant, must be scaled.\nStep 2: Scale the second equation by $2$: $2(5x) - 2(2y) = 2(9)$, which is $10x - 4y = 18$.\nStep 3: Verify with the actual solution. Solving the original system gives $x = 5$ and $y = 8$, since $3(5) + 4(8) = 47$ and $5(5) - 2(8) = 9$. Testing choice B: $10(5) - 4(8) = 50 - 32 = 18$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10x - 4y = 9$): doubles only the left side and leaves the constant at $9$. At $(5, 8)$ the left side is $18$, not $9$, so the original solution no longer works.\n* Choice C ($10x - 2y = 18$): doubles the $x$-term and the constant but leaves $-2y$ alone. At $(5, 8)$ this gives $50 - 16 = 34$, not $18$.\n* Choice D ($6x + 4y = 94$): doubles the $x$-term and the constant of the first equation but leaves $4y$ unchanged. At $(5, 8)$ this gives $30 + 32 = 62$, not $94$.\n\n**Test Day Takeaway:** Equivalent means every single term scaled by the same factor. Partial scaling is the trap, and one substitution of the original solution exposes it instantly.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "A practice throwing zone $ABC$ and a regulation zone $DEF$ are similar triangles, with sides $AB$ and $DE$ labeled in feet. Zone $ABC$ covers $56$ square feet of turf. How many square feet does zone $DEF$ cover?",
      diagram: { type: "similarTriangles", params: { triangle1: { labels: ["A", "B", "C"], sideLabels: ["8", "", ""] }, triangle2: { labels: ["D", "E", "F"], sideLabels: ["20", "", ""] }, figureNote: true } },
      correctAnswer: "350",
      explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**The correct answer is $350$.**\n\n**The Fast Way (~25s):** The sides are in the ratio $20 : 8 = 2.5$, so the areas are in the ratio $2.5^2 = 6.25$, and $56 \\times 6.25 = 350$.\n\n**The Full Solution:**\nStep 1: Find the scale factor from the labeled corresponding sides: $\\frac{DE}{AB} = \\frac{20}{8} = \\frac{5}{2}$.\nStep 2: For similar figures the ratio of areas is the square of the ratio of corresponding lengths: $\\left(\\frac{5}{2}\\right)^2 = \\frac{25}{4} = 6.25$.\nStep 3: Multiply the known area by that ratio: $56 \\times \\frac{25}{4} = 14 \\times 25 = 350$ square feet. Check the reverse direction: $350 \\div 6.25 = 56$ ✓\n\n**Common Mistakes:**\n* $140$: multiplies the area by the length ratio $2.5$ instead of by its square, giving $56 \\times 2.5 = 140$.\n* $22.4$: divides by $2.5$ instead of multiplying, shrinking the larger zone: $56 \\div 2.5 = 22.4$.\n* $8.96$: uses the correct squared ratio but divides by it, giving $56 \\div 6.25 = 8.96$.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas scale by $k^2$, volumes by $k^3$. Decide which quantity you were given before you multiply, and check that the larger figure ends up with the larger number.",
      skills: ["similar-triangles"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A lake survey netted $850$ trout in a single week, and $36\\%$ of them were below the minimum length required for tagging. How many of the netted trout were long enough to be tagged?",
      choices: [
        // distractor: reports the percent 36 as though it were a count of fish
        { id: "A", text: "$36$" },
        // distractor: computes 36% of 850 = 306, the group that was too short
        { id: "B", text: "$306$" },
        { id: "C", text: "$544$" },
        // distractor: subtracts the percent as a count: 850 - 36 = 814
        { id: "D", text: "$814$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Percent Complement**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** If $36\\%$ were too short, then $64\\%$ were long enough, and $0.64 \\times 850 = 544$.\n\n**The Full Solution:**\nStep 1: The two groups account for the whole catch, so the tagged-length percent is $100\\% - 36\\% = 64\\%$.\nStep 2: Convert to a decimal and multiply: $0.64 \\times 850 = 544$ trout.\nStep 3: Check that the parts sum to the whole: $0.36 \\times 850 = 306$ too short, and $306 + 544 = 850$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($36$): reports the percent itself as a number of fish. A percent is a rate, not a count, until it multiplies the total.\n* Choice B ($306$): computes $36\\%$ of $850$ correctly but answers for the wrong group — those are the trout that were too short.\n* Choice D ($814$): subtracts $36$ from $850$, treating the percent as though it were already a count of fish.\n\n**Test Day Takeaway:** Underline which group the question wants before you multiply. Taking the complement first, then one multiplication, beats computing the wrong part and correcting later.",
      skills: ["percent-of-value"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "During a punt the height of the ball, in feet, is $h = -16t^2 + 64t$ at $t$ seconds after the kick. A tower camera captures the ball only while it is at least $48$ feet high. During which interval is the ball captured?",
      choices: [
        // distractor: stops at the first crossing t = 1 and uses the climb up to it
        { id: "A", text: "$0 \\le t \\le 1$" },
        { id: "B", text: "$1 \\le t \\le 3$" },
        // distractor: keeps the first crossing but ends at the landing time t = 4 instead of the second crossing
        { id: "C", text: "$1 \\le t \\le 4$" },
        // distractor: uses the descent from the second crossing t = 3 to the landing time t = 4
        { id: "D", text: "$3 \\le t \\le 4$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Set $-16t^2 + 64t = 48$; dividing by $-16$ gives $t^2 - 4t + 3 = 0$, so $t = 1$ and $t = 3$. Between those two times the parabola is above $48$.\n\n**The Full Solution:**\nStep 1: Write the condition: $-16t^2 + 64t \\ge 48$.\nStep 2: Move everything to one side and divide by $-16$, which reverses the inequality: $t^2 - 4t + 3 \\le 0$. Factoring gives $(t - 1)(t - 3) \\le 0$.\nStep 3: A product of two factors is negative or zero exactly between the roots, so $1 \\le t \\le 3$. Check the midpoint $t = 2$: $-16(4) + 64(2) = 64$ feet, which is at least $48$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0 \\le t \\le 1$): uses the climb up to the first crossing. At $t = 0.5$ the height is $-16(0.25) + 32 = 28$ feet, below $48$.\n* Choice C ($1 \\le t \\le 4$): starts correctly but runs to the landing time $t = 4$ instead of the second crossing. At $t = 3.5$ the height is $-196 + 224 = 28$ feet.\n* Choice D ($3 \\le t \\le 4$): takes the descent after the ball has already dropped back through $48$ feet.\n\n**Test Day Takeaway:** Solve the equality first to find the two crossing times, then decide inside or outside by testing one convenient value — a downward parabola is above its level between the roots.",
      skills: ["quadratics"]
    },
    {
      id: 9,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "Of the $600$ birds captured at a banding station, $k$ percent were juveniles, and the probability that a randomly selected juvenile was female is $0.25$. If $45$ juvenile females were captured, what is the value of $k$?",
      correctAnswer: "30",
      explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~30s):** The $45$ juvenile females are a quarter of the juveniles, so there were $45 \\div 0.25 = 180$ juveniles, and $\\frac{180}{600} = 0.30$, or $30$ percent.\n\n**The Full Solution:**\nStep 1: The conditional statement says $P(\\text{female} \\mid \\text{juvenile}) = 0.25$, so (juvenile females) $= 0.25 \\times$ (juveniles).\nStep 2: Solve for the number of juveniles: $45 = 0.25J$, so $J = \\frac{45}{0.25} = 180$.\nStep 3: Convert that count to a percent of the whole capture: $\\frac{180}{600} = 0.30$, so $k = 30$. Check forward: $30\\%$ of $600$ is $180$, and a quarter of $180$ is $45$ ✓\n\n**Common Mistakes:**\n* $7.5$: divides $45$ by $600$ and stops, ignoring that the $45$ are only a quarter of the juvenile group.\n* $180$: finds the number of juveniles correctly but reports that count instead of the percent the question asks for.\n* $1.875$: multiplies by $0.25$ instead of dividing, getting $11.25$ juveniles and then $\\frac{11.25}{600} = 0.01875$.\n\n**Test Day Takeaway:** A conditional probability multiplies the group it is conditioned on. Divide by it to recover that group, then convert to a percent of the total only at the very end.",
      skills: ["conditional-probability"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "At a mountain pass the snow depth, in centimeters, is modeled by $86 - 4.5d$, where $d$ is the number of days since melting began. What is the least whole number of days after which the depth is below $50$ centimeters?",
      choices: [
        // distractor: stops at d = 8, where the depth is exactly 50 and not yet below it
        { id: "A", text: "$8$" },
        { id: "B", text: "$9$" },
        // distractor: divides the threshold 50 by 4.5 instead of the drop 36, giving 11.1 rounded up
        { id: "C", text: "$12$" },
        // distractor: divides the starting depth 86 by 4.5, ignoring the 50-centimeter threshold
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The depth must fall by more than $86 - 50 = 36$ centimeters, and $36 \\div 4.5 = 8$ exactly, so the first whole day strictly past $8$ is $9$.\n\n**The Full Solution:**\nStep 1: Translate the requirement: $86 - 4.5d < 50$.\nStep 2: Subtract $86$ from both sides to get $-4.5d < -36$, then divide by $-4.5$ and reverse the inequality: $d > 8$.\nStep 3: The least whole number greater than $8$ is $9$. Check both sides: at $d = 8$ the depth is $86 - 36 = 50$, which is not below $50$, and at $d = 9$ it is $86 - 40.5 = 45.5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): treats $d > 8$ as $d \\ge 8$. At exactly $8$ days the depth is $50$ centimeters, which the word *below* excludes.\n* Choice C ($12$): divides the threshold by the rate, $50 \\div 4.5 \\approx 11.1$ rounded up to $12$, instead of dividing the required drop of $36$.\n* Choice D ($20$): divides the starting depth by the rate, $86 \\div 4.5 \\approx 19.1$ rounded up to $20$, which is when the snow would be gone entirely.\n\n**Test Day Takeaway:** Dividing by a negative number flips the inequality sign, and a strict inequality that lands on a whole number pushes the answer one step further — test the boundary value before you commit.",
      skills: ["inequalities"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The scatterplot shows beetles counted per trap at ten survey sites, along with the line of best fit $\\hat{y} = 40 - 3x$, where $x$ is elevation in hundreds of meters. What is the residual for the site plotted at $x = 6$?",
      diagram: { type: "scatterplot", params: { points: [[1, 38], [2, 32], [3, 33], [4, 27], [5, 26], [6, 17], [7, 18], [8, 17], [9, 12], [10, 11]], xMin: 0, xMax: 10, yMin: 0, yMax: 44, xGridStep: 1, yGridStep: 4, xLabelStep: 2, yLabelStep: 8, xLabel: "Elevation (hundreds of meters)", yLabel: "Beetles per trap", bestFitLine: { slope: -3, intercept: 40 }, highlightPoint: [6, 17], highlightLabel: "(6, 17)", showResidual: true } },
      choices: [
        { id: "A", text: "$-5$" },
        // distractor: subtracts actual from predicted (22 - 17) instead of predicted from actual
        { id: "B", text: "$5$" },
        // distractor: reports the observed count 17 rather than the difference from the line
        { id: "C", text: "$17$" },
        // distractor: reports the predicted value 40 - 3(6) = 22 rather than the difference
        { id: "D", text: "$22$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Residual**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The line predicts $40 - 3(6) = 22$ and the plotted point sits at $17$, so the residual is $17 - 22 = -5$.\n\n**The Full Solution:**\nStep 1: Read the observed value from the highlighted point: at $x = 6$ the survey recorded $17$ beetles per trap.\nStep 2: Compute the predicted value from the line of best fit: $\\hat{y} = 40 - 3(6) = 40 - 18 = 22$.\nStep 3: Residual $=$ observed $-$ predicted $= 17 - 22 = -5$. The negative sign matches the picture, since the point lies below the line ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($5$): subtracts in the wrong order, $22 - 17$, which reports the size of the gap but loses the sign that says the point is below the line.\n* Choice C ($17$): reports the observed count itself instead of its distance from the model.\n* Choice D ($22$): reports the predicted value $40 - 3(6) = 22$ and never compares it to the data point.\n\n**Test Day Takeaway:** Residual is always observed minus predicted. Check the sign against the picture: below the line is negative, above the line is positive.",
      skills: ["calculate-mean", "slope-intercept-form"]
    },
    {
      id: 12,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "On a slalom course, two straight gate poles cross at a single point. The opening marked $(5x - 15)^\\circ$ lies directly across that crossing from an opening of $65^\\circ$, where $x$ is a constant. What is the value of $x$?",
      correctAnswer: "16",
      explanation: "**SAT Pattern: Vertical Angles**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~15s):** Opposite angles at a crossing are equal, so $5x - 15 = 65$, giving $5x = 80$ and $x = 16$.\n\n**The Full Solution:**\nStep 1: When two straight lines cross, the two angles opposite each other are vertical angles and have equal measures.\nStep 2: Set the expressions equal: $5x - 15 = 65$.\nStep 3: Add $15$ to both sides to get $5x = 80$, then divide by $5$ to get $x = 16$. Check: $5(16) - 15 = 80 - 15 = 65$ ✓\n\n**Common Mistakes:**\n* $26$: uses the angle next to the $65^\\circ$ angle instead of the one opposite it, solving $5x - 15 = 115$.\n* $13$: divides $65$ by $5$ and forgets the $-15$ entirely.\n* $10$: subtracts $15$ from $65$ instead of adding it, computing $\\frac{65 - 15}{5}$.\n\n**Test Day Takeaway:** At a crossing, opposite angles are equal and adjacent angles add to $180^\\circ$. Decide which pair you are looking at before writing the equation — that single choice separates $16$ from $26$.",
      skills: ["angles"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The function $C(w) = 3.5w - 14$ models the mass of honey, in kilograms, a hive holds above its winter reserve after $w$ weeks of a nectar flow. For what value of $w$ does the model give $56$ kilograms above the reserve?",
      choices: [
        // distractor: subtracts 14 instead of adding it: (56 - 14)/3.5 = 12
        { id: "A", text: "$12$" },
        // distractor: divides 56 by 3.5 and ignores the -14 entirely
        { id: "B", text: "$16$" },
        { id: "C", text: "$20$" },
        // distractor: substitutes 56 for w instead of for C(w): 3.5(56) - 14 = 182
        { id: "D", text: "$182$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Set $3.5w - 14 = 56$. Adding $14$ gives $3.5w = 70$, so $w = 20$.\n\n**The Full Solution:**\nStep 1: The question gives the output, so substitute it for $C(w)$: $3.5w - 14 = 56$.\nStep 2: Undo the subtraction first. Adding $14$ to both sides gives $3.5w = 70$.\nStep 3: Divide by the coefficient: $w = \\frac{70}{3.5} = 20$ weeks. Check forward: $3.5(20) - 14 = 70 - 14 = 56$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): subtracts the $14$ instead of adding it, computing $\\frac{56 - 14}{3.5} = 12$. Substituting $12$ gives $3.5(12) - 14 = 28$, not $56$.\n* Choice B ($16$): divides $56$ by $3.5$ and never undoes the $-14$. Substituting $16$ gives $56 - 14 = 42$.\n* Choice D ($182$): substitutes $56$ for $w$ instead of for $C(w)$, evaluating the function rather than solving it.\n\n**Test Day Takeaway:** $f(a) = c$ means the output is known and the input is not. Put the number where the function value goes, then undo the operations in reverse order.",
      skills: ["function-notation"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "An offshore buoy flags any wind reading $w$, in knots, that satisfies $|2w - 48| = 18$ during a squall calibration test. What is the lesser of the two wind speeds that the buoy flags?",
      choices: [
        { id: "A", text: "$15$" },
        // distractor: solves the positive case only and reports the greater speed, 33
        { id: "B", text: "$33$" },
        // distractor: reports the sum of the two flagged speeds, 15 + 33 = 48
        { id: "C", text: "$48$" },
        // distractor: solves 2w = 66 but forgets to divide by 2
        { id: "D", text: "$66$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $2w - 48 = \\pm 18$ gives $2w = 66$ or $2w = 30$, so $w = 33$ or $w = 15$. The lesser is $15$.\n\n**The Full Solution:**\nStep 1: An absolute value equals $18$ when the inside equals $18$ or $-18$, so split into $2w - 48 = 18$ and $2w - 48 = -18$.\nStep 2: Solve each. Adding $48$ gives $2w = 66$ and $2w = 30$, so $w = 33$ and $w = 15$.\nStep 3: The question asks for the lesser flagged speed, which is $15$ knots. Check: $|2(15) - 48| = |30 - 48| = 18$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($33$): solves only the positive case and reports the greater of the two speeds, the opposite of what the question asks.\n* Choice C ($48$): reports the sum $15 + 33 = 48$, which is also the constant already sitting inside the absolute value.\n* Choice D ($66$): stops at $2w = 66$ and never divides by $2$, reporting twice the greater speed.\n\n**Test Day Takeaway:** Every absolute value equation splits into two linear equations. Solve both, then reread the question to see which of the two roots it actually wants.",
      skills: ["combining-like-terms"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A ramp cross section is a right triangle with a horizontal run of $7m$ feet and a sloped face of $25m$ feet, where $m$ is positive. What is the tangent of the angle between the run and the sloped face?",
      choices: [
        // distractor: gives cosine of the angle, adjacent over hypotenuse
        { id: "A", text: "$\\frac{7}{25}$" },
        // distractor: inverts the tangent, using adjacent over opposite
        { id: "B", text: "$\\frac{7}{24}$" },
        // distractor: gives sine of the angle, opposite over hypotenuse
        { id: "C", text: "$\\frac{24}{25}$" },
        { id: "D", text: "$\\frac{24}{7}$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $7$-$24$-$25$ is a Pythagorean triple, so the vertical rise is $24m$ and $\\tan = \\frac{24m}{7m} = \\frac{24}{7}$.\n\n**The Full Solution:**\nStep 1: The sloped face is the hypotenuse and the run is the leg adjacent to the angle, so the rise is the opposite leg. By the Pythagorean theorem, rise$^2 = (25m)^2 - (7m)^2 = 625m^2 - 49m^2 = 576m^2$.\nStep 2: Take the square root: rise $= 24m$ feet. The factor $m$ appears in every side, so it cancels out of any ratio.\nStep 3: Tangent is opposite over adjacent: $\\frac{24m}{7m} = \\frac{24}{7}$. Check the triple: $7^2 + 24^2 = 49 + 576 = 625 = 25^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{7}{25}$): uses adjacent over hypotenuse, which is the cosine of the angle, not the tangent.\n* Choice B ($\\frac{7}{24}$): flips the tangent upside down, dividing adjacent by opposite. That ratio belongs to the other acute angle.\n* Choice C ($\\frac{24}{25}$): uses opposite over hypotenuse, which is the sine of the angle.\n\n**Test Day Takeaway:** A common factor on every side cancels in every trig ratio, so a parameter like $m$ changes nothing. Find the missing leg first, then read SOH-CAH-TOA off the angle you were asked about.",
      skills: ["soh-cah-toa", "pythagorean-theorem"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The table shows how the wolf count changed at three preserves between 2019 and 2024, along with each preserve's 2024 count. What was the combined wolf count at the North and Ridge preserves in 2019?",
      questionTable: { headers: ["Preserve", "Change since 2019", "2024 count"], rows: [["North", "20% decrease", "168"], ["Ridge", "12% increase", "224"], ["Delta", "35% decrease", "195"]] },
      correctAnswer: "410",
      explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**The correct answer is $410$.**\n\n**The Fast Way (~35s):** Undo each change by dividing: $168 \\div 0.80 = 210$ and $224 \\div 1.12 = 200$, so the two preserves held $410$ wolves in $2019$.\n\n**The Full Solution:**\nStep 1: Read the two rows the question names. North fell by $20\\%$ to $168$, and Ridge rose by $12\\%$ to $224$.\nStep 2: Write each change forward with the unknown $2019$ count. For North, $0.80N = 168$, so $N = \\frac{168}{0.80} = 210$. For Ridge, $1.12R = 224$, so $R = \\frac{224}{1.12} = 200$.\nStep 3: Add the two originals: $210 + 200 = 410$ wolves. Check forward: $210 - 0.20(210) = 168$ and $200 + 0.12(200) = 224$ ✓\n\n**Common Mistakes:**\n* $392$: adds the two $2024$ counts, $168 + 224$, without undoing either percent change.\n* $434$: undoes the North decrease correctly but copies Ridge's $2024$ count of $224$ straight into the sum.\n* $210$: stops after the North preserve and never adds the Ridge count.\n\n**Test Day Takeaway:** Reversing a percent change is division by the multiplier, never addition of the percent. Undo each row on its own before you combine them.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A dye-mixing model uses the equations $kx + 3y = 11$ and $27x + ky = 4$, where $k$ is a constant and $x$ and $y$ are the volumes, in liters, of two stock solutions. No ordered pair $(x, y)$ satisfies both equations. What positive value must $k$ have?",
      choices: [
        // distractor: takes a second square root of the coefficient ratio 27/3 = 9, reporting 3
        { id: "A", text: "$3$" },
        { id: "B", text: "$9$" },
        // distractor: adds the two known coefficients, 27 + 3 = 30
        { id: "C", text: "$30$" },
        // distractor: solves k squared = 81 but reports k squared instead of k
        { id: "D", text: "$81$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** No solution means the coefficients are proportional, so $\\frac{27}{k} = \\frac{k}{3}$, giving $k^2 = 81$ and $k = 9$ for the positive value.\n\n**The Full Solution:**\nStep 1: Two linear equations have no common solution exactly when their lines are parallel but not identical — the $x$- and $y$-coefficients are in the same ratio while the constants are not.\nStep 2: Set the coefficient ratios equal: $\\frac{27}{k} = \\frac{k}{3}$. Cross-multiplying gives $k^2 = 81$, so $k = 9$ or $k = -9$; the positive value is $9$.\nStep 3: Confirm the lines are parallel and not the same line. With $k = 9$ the equations are $9x + 3y = 11$ and $27x + 9y = 4$; the second has coefficients exactly $3$ times the first, but $3(11) = 33 \\ne 4$, so there is no solution ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): computes the ratio $27 \\div 3 = 9$ and then square-roots it again, reporting $3$. With $k = 3$ the equations are $3x + 3y = 11$ and $27x + 3y = 4$, which cross at one point.\n* Choice C ($30$): adds the two known coefficients, $27 + 3$, instead of using their ratio.\n* Choice D ($81$): solves $k^2 = 81$ correctly but reports $k^2$ rather than $k$.\n\n**Test Day Takeaway:** When the unknown constant sits in both equations, proportionality becomes a quadratic. Solve it, then check the constants — matching constants would mean infinitely many solutions instead of none.",
      skills: ["system-solution-types"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "Three weather stations occupy the points $A(2, 1)$, $B(10, 5)$, and $C(4, t)$ on a map grid marked in kilometers, where $t$ is the north-south coordinate of the third station. If triangle $ABC$ encloses an area of $24$ square kilometers, what is the greatest possible value of $t$?",
      correctAnswer: "8",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~45s):** The shoelace expression collapses to area $= 4|t - 2|$. Setting $4|t - 2| = 24$ gives $|t - 2| = 6$, so $t = 8$ or $t = -4$, and the greater is $8$.\n\n**The Full Solution:**\nStep 1: Apply the coordinate area formula: area $= \\frac{1}{2}\\left|x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)\\right|$.\nStep 2: Substitute the three points: $\\frac{1}{2}\\left|2(5 - t) + 10(t - 1) + 4(1 - 5)\\right| = \\frac{1}{2}\\left|10 - 2t + 10t - 10 - 16\\right| = \\frac{1}{2}\\left|8t - 16\\right| = 4|t - 2|$.\nStep 3: Solve $4|t - 2| = 24$, so $|t - 2| = 6$ and $t = 8$ or $t = -4$. The question asks for the greatest value, so $t = 8$. Check with $C(4, 8)$: $\\frac{1}{2}|2(-3) + 10(7) + 4(-4)| = \\frac{1}{2}(48) = 24$ ✓\n\n**Common Mistakes:**\n* $-4$: solves the absolute value correctly but reports the lesser of the two positions instead of the greater.\n* $5$: drops the factor $\\frac{1}{2}$ from the area formula and solves $8t - 16 = 24$. The triangle with $C(4, 5)$ has area $12$, not $24$.\n* $6$: reports $|t - 2| = 6$, the vertical offset from the pivot, instead of the coordinate $t$ itself.\n\n**Test Day Takeaway:** With one coordinate unknown, the shoelace formula turns into an absolute value equation, which has two solutions. Simplify all the way to $|{\\dots}|$ before solving, then reread which root the question wants.",
      skills: ["triangle-area"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A polar station recorded the sea-ice edge at $1{,}482$ meters from a fixed marker in year $3$ and at $1{,}218$ meters in year $9$, and the retreat is modeled as linear in the year number. In which year does the model place the ice edge $998$ meters from the marker?",
      choices: [
        // distractor: measures the drop from the year-9 reading, (1218 - 998)/44 = 5, and reports the elapsed years as the year
        { id: "A", text: "$5$" },
        // distractor: measures the drop from the year-3 reading, (1482 - 998)/44 = 11, and forgets to add the starting year 3
        { id: "B", text: "$11$" },
        { id: "C", text: "$14$" },
        // distractor: measures the drop from the year-3 reading but adds the 11 elapsed years to year 9 instead of year 3
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The ice edge moves $\\frac{1218 - 1482}{9 - 3} = -44$ meters per year. From year $3$ it must fall another $1482 - 998 = 484$ meters, which takes $484 \\div 44 = 11$ years, landing in year $3 + 11 = 14$.\n\n**The Full Solution:**\nStep 1: Find the slope from the two recorded points $(3, 1482)$ and $(9, 1218)$: $m = \\frac{1218 - 1482}{9 - 3} = \\frac{-264}{6} = -44$ meters per year.\nStep 2: Write the model using the year-$3$ point: $d = 1482 - 44(y - 3)$, which expands to $d = 1614 - 44y$.\nStep 3: Set $d = 998$ and solve: $1614 - 44y = 998$, so $44y = 616$ and $y = 14$. Check with the other data point: $1614 - 44(9) = 1614 - 396 = 1218$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): computes $\\frac{1218 - 998}{44} = 5$ from the year-$9$ reading and reports that elapsed count as the year; the actual year would be $9 + 5 = 14$.\n* Choice B ($11$): computes $\\frac{1482 - 998}{44} = 11$ from the year-$3$ reading, which is the number of years that pass, not the year number — the starting year $3$ still has to be added.\n* Choice D ($20$): finds the same $11$ elapsed years from the year-$3$ reading but adds them to year $9$, double-counting the six years already used to find the slope.\n\n**Test Day Takeaway:** Two points give you a rate, not a model. Anchor the rate at one of the given points and keep track of whether the question wants elapsed time or the labeled input value.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A swim squad logged $34$ sessions during one training block, totaling $71$ hours of pool time. Each interval session ran $150$ minutes and each recovery session ran $1.5$ hours. How many of those $71$ hours were spent in interval sessions?",
      choices: [
        // distractor: swaps the two session lengths, using 1.5 hours for interval and 2.5 hours for recovery, which returns 14
        { id: "A", text: "$14$" },
        // distractor: reports the number of interval sessions instead of the hours they occupied
        { id: "B", text: "$20$" },
        // distractor: reports the hours spent in recovery sessions, 1.5 times 14 = 21
        { id: "C", text: "$21$" },
        { id: "D", text: "$50$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice D is correct.**\n\n**The Fast Way (~50s):** $150$ minutes is $2.5$ hours. With $x + y = 34$ and $2.5x + 1.5y = 71$, subtracting $1.5$ times the first equation leaves $x = 71 - 51 = 20$ interval sessions, so $2.5(20) = 50$ hours.\n\n**The Full Solution:**\nStep 1: Convert to one unit. $150$ minutes $= \\frac{150}{60} = 2.5$ hours, so with $x$ interval sessions and $y$ recovery sessions the system is $x + y = 34$ and $2.5x + 1.5y = 71$.\nStep 2: Eliminate $y$. Multiply the first equation by $1.5$ to get $1.5x + 1.5y = 51$, then subtract it from the second: $(2.5 - 1.5)x = 71 - 51$, so $x = 20$ and $y = 14$.\nStep 3: The question asks for hours, not sessions: $2.5 \\times 20 = 50$ hours. Check the total: $50 + 1.5(14) = 50 + 21 = 71$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($14$): swaps the two lengths, solving $1.5x + 2.5y = 71$ instead, which returns $x = 14$. It is also the number of recovery sessions.\n* Choice B ($20$): solves the system correctly but stops at the number of interval sessions instead of converting to hours.\n* Choice C ($21$): computes hours for the wrong group, $1.5 \\times 14 = 21$ recovery hours.\n\n**Test Day Takeaway:** Convert every quantity to a single unit before writing the system, and reread the final sentence — a system that solves for counts often asks for a total in some other unit.",
      skills: ["elimination-method", "setting-up-systems"]
    },
    {
      id: 21,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "The table gives four values of the linear function $g$, where $g(x)$ is a backup generator's fuel reserve, in liters above the required minimum, on day $x$ of an outage. By how much does the reserve change from day $4$ to day $12$?",
      questionTable: { headers: ["$x$", "$g(x)$"], rows: [["$1$", "$19$"], ["$3$", "$13$"], ["$5$", "$7$"], ["$7$", "$1$"]] },
      correctAnswer: "-24",
      explanation: "**SAT Pattern: Function Evaluation**\n\n**The correct answer is $-24$.**\n\n**The Fast Way (~35s):** The table falls $6$ for every $2$ that $x$ rises, so the rate is $-3$ per unit. Over the $8$ days from day $4$ to day $12$ the reserve changes by $8(-3) = -24$ liters.\n\n**The Full Solution:**\nStep 1: Build the rule. Consecutive rows go from $(1, 19)$ to $(3, 13)$, a change of $-6$ over $2$, so the slope is $-3$. Using $(1, 19)$: $g(x) = 19 - 3(x - 1) = 22 - 3x$.\nStep 2: Evaluate at both inputs, neither of which appears in the table: $g(4) = 22 - 12 = 10$ and $g(12) = 22 - 36 = -14$.\nStep 3: Subtract in the order the question states: $g(12) - g(4) = -14 - 10 = -24$. Check against a table value: $g(7) = 22 - 21 = 1$, which matches the last row ✓\n\n**Common Mistakes:**\n* $24$: computes the size of the change but drops the sign. The reserve falls, so the change is negative.\n* $-14$: reports $g(12)$ by itself and never subtracts $g(4) = 10$.\n* $-3$: reports the slope, the change per single unit, instead of the change across all $8$ units.\n\n**Test Day Takeaway:** A table of a linear function hands you the slope in two rows. Turn it into a rule before you evaluate anywhere outside the table, and let the question dictate the subtraction order.",
      skills: ["function-evaluation"]
    },
    {
      id: 22,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "A monitored glacier covered $48.0$ square kilometers in 2000. Its area decreased by $25\\%$ over the next decade and by a further $20\\%$ over the decade after that. By what percent did the glacier's area decrease from 2000 to 2020?",
      choices: [
        { id: "A", text: "$40\\%$" },
        // distractor: adds the two percents, 25 + 20, as if both applied to the original area
        { id: "B", text: "$45\\%$" },
        // distractor: reports the percent of the original area that remains, not the percent lost
        { id: "C", text: "$60\\%$" },
        // distractor: divides the 19.2 square kilometers lost by the 2020 area instead of the 2000 area
        { id: "D", text: "$66.7\\%$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** Multiply the two survival factors: $0.75 \\times 0.80 = 0.60$, so $60\\%$ of the area remains and $40\\%$ is gone.\n\n**The Full Solution:**\nStep 1: A $25\\%$ decrease multiplies by $0.75$: the $2010$ area is $48.0 \\times 0.75 = 36.0$ square kilometers.\nStep 2: A further $20\\%$ decrease multiplies by $0.80$: the $2020$ area is $36.0 \\times 0.80 = 28.8$ square kilometers.\nStep 3: Compare the loss to the original: $48.0 - 28.8 = 19.2$ lost, and $\\frac{19.2}{48.0} = 0.40$, a $40\\%$ decrease. Check with the factors alone: $0.75 \\times 0.80 = 0.60$ remaining ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($45\\%$): adds $25\\%$ and $20\\%$. The second decrease applies to $36.0$ square kilometers, not to the original $48.0$, so its actual loss is $7.2$ rather than $9.6$.\n* Choice C ($60\\%$): reports the fraction of the area that survives, $\\frac{28.8}{48.0}$, instead of the fraction lost.\n* Choice D ($66.7\\%$): divides the $19.2$ square kilometers lost by the $2020$ area, $\\frac{19.2}{28.8}$, using the ending value as the base instead of the starting value.\n\n**Test Day Takeaway:** Chain percent changes by multiplying decimal factors, never by adding percents, and always divide the change by the ORIGINAL amount when the question says decrease.",
      skills: ["percent-change"]
    }
  ]
};

export default practiceTest6M2Easy;
