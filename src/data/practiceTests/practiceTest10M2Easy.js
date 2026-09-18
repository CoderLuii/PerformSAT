// Practice Test 10 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Official-calibration recreation (2026-09-01): every item re-authored fresh
// against the CB register (docs/TEST_RECREATION_SPEC.md); slot metadata
// (id/type/difficulty/band/skills/pattern) frozen from the prior build.
// 4 diagram items: Q4 dataTable, Q13 rightTriangle, Q14 scatterplot,
// Q15 twoWayTable. Numeric MC choices sorted ascending.

export const practiceTest10M2Easy = {
  id: "module-2-easy",
  title: "Module 2 (Easy)",
  variant: "easy",
  timeLimit: 35,
  questions: [
    // ============================================================
    // Q1-Q3: Easy openers (band 2-3)
    // ============================================================
    {
      id: 1,
      type: "multiple-choice",
      difficulty: "easy",
      band: 2,
      question: "A lake-core study charts sediment thickness $y$, in millimeters, against the number of years $x$ since coring began, and the graph of the model is shown. Which equation defines the model?",
      diagram: { type: "linearGraph", params: { slope: 2, yIntercept: 4, xRange: [0, 10], yRange: [0, 28], xTickInterval: 2, yTickInterval: 4, gridInterval: 2 } },
      choices: [
        // distractor: swaps the slope and the y-intercept read from the graph
        { id: "A", text: "$y = 4x + 2$" },
        { id: "B", text: "$y = 2x + 4$" },
        // distractor: keeps the slope but flips the sign of the y-intercept
        { id: "C", text: "$y = 2x - 4$" },
        // distractor: divides run by rise instead of rise by run
        { id: "D", text: "$y = \\frac{1}{2}x + 4$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice B is correct.** The line meets the vertical axis at $4$ millimeters and climbs $2$ millimeters per year, so the model is $y = 2x + 4$.\n\n**The Fast Way (~15s):** The line starts at $4$ on the $y$-axis, so $b = 4$; it reaches $24$ millimeters at $x = 10$, a climb of $20$ over $10$, so $m = 2$.\n\n**The Full Solution:**\nStep 1: In $y = mx + b$, the constant $b$ is the value of $y$ when $x = 0$. The graph passes through $(0, 4)$, so $b = 4$.\nStep 2: Slope is rise over run. Between $(0, 4)$ and $(10, 24)$ the rise is $24 - 4 = 20$ and the run is $10 - 0 = 10$, so $m = \\frac{20}{10} = 2$.\nStep 3: The model is $y = 2x + 4$. Check the midpoint of the window: at $x = 6$ the equation gives $2(6) + 4 = 16$, and the graph is at $16$ millimeters six years in. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = 4x + 2$): swaps the two numbers, using $4$ as the slope and $2$ as the intercept. That line would start at $2$ millimeters and reach $42$ millimeters after ten years, far above the graph.\n* Choice C ($y = 2x - 4$): reads the slope correctly but flips the sign of the intercept. That line would start at $-4$ millimeters, below the horizontal axis, which the graph never does.\n* Choice D ($y = \\frac{1}{2}x + 4$): divides the run by the rise, $\\frac{10}{20}$, instead of the rise by the run. That line climbs only $5$ millimeters in ten years.\n\n**Test Day Takeaway:** Read the intercept first, where the line crosses the $y$-axis, then read the slope from two gridline points. The axes here use different scales, so count units by the tick labels, not by squares.",
      skills: ["slope-intercept-form"]
    },
    {
      id: 2,
      type: "multiple-choice",
      difficulty: "easy",
      band: 2,
      question: "A touring crew loads $9x$ cable coils onto a truck. After $4x$ of the coils are returned to the shop, $35$ coils remain on the truck. Which expression is equal to $x$?",
      choices: [
        // distractor: divides the coefficient by the constant, inverting the division
        { id: "A", text: "$\\frac{5}{35}$" },
        // distractor: adds the two coefficients (9 + 4 = 13) instead of subtracting them
        { id: "B", text: "$\\frac{35}{13}$" },
        { id: "C", text: "$\\frac{35}{5}$" },
        // distractor: divides by 4, the coefficient of the coils returned, instead of by the difference 5
        { id: "D", text: "$\\frac{35}{4}$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice C is correct.** The coils left are $9x - 4x = 5x$, so $5x = 35$ and $x = \\frac{35}{5}$.\n\n**The Fast Way (~10s):** Combine $9x - 4x$ into $5x$, then undo the multiplication by dividing $35$ by $5$.\n\n**The Full Solution:**\nStep 1: Translate the sentence. Coils loaded minus coils returned equals coils remaining: $9x - 4x = 35$.\nStep 2: The left side has like terms, so $9x - 4x = 5x$ and the equation becomes $5x = 35$.\nStep 3: Divide both sides by $5$: $x = \\frac{35}{5} = 7$. Check: the crew loaded $9(7) = 63$ coils, returned $4(7) = 28$, and $63 - 28 = 35$ remain. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{5}{35}$): divides the coefficient by the constant instead of the constant by the coefficient. That value is $\\frac{1}{7}$, and $5\\left(\\frac{1}{7}\\right)$ is nowhere near $35$.\n* Choice B ($\\frac{35}{13}$): adds the coefficients instead of subtracting them, treating the return as another load and giving $13x = 35$. That value, about $2.7$, is not a whole number of coils.\n* Choice D ($\\frac{35}{4}$): divides by the coefficient of the coils returned rather than by the $5$ left after the subtraction. The $4x$ coils came off the truck, so $4$ is not what multiplies $x$ in the final equation.\n\n**Test Day Takeaway:** Combine like terms before you touch the constant. Once the variable side is a single term, one inverse operation finishes the problem.",
      skills: ["combining-like-terms"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A survey team budgets $\\$29{,}450$ for one drilling season: a single rig-mobilization charge of $\\$650$ plus $\\$2{,}400$ for each borehole drilled. Which equation gives the number of boreholes, $n$, that the budget covers?",
      choices: [
        // distractor: swaps the per-borehole cost with the one-time mobilization charge
        { id: "A", text: "$650n + 2{,}400 = 29{,}450$" },
        // distractor: adds the mobilization charge to n before multiplying, billing the charge once per borehole
        { id: "B", text: "$2{,}400(n + 650) = 29{,}450$" },
        // distractor: subtracts the mobilization charge instead of adding it
        { id: "C", text: "$2{,}400n - 650 = 29{,}450$" },
        { id: "D", text: "$2{,}400n + 650 = 29{,}450$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice D is correct.** The cost is $2{,}400$ per borehole plus a single $650$ charge, so $2{,}400n + 650 = 29{,}450$.\n\n**The Fast Way (~15s):** The per-item price multiplies the count; the one-time charge is added once. That is $2{,}400n + 650$, set equal to the season's budget.\n\n**The Full Solution:**\nStep 1: Name the repeating cost. Each borehole costs $\\$2{,}400$, and there are $n$ of them, so drilling costs $2{,}400n$ dollars.\nStep 2: The mobilization charge is paid once, no matter how many boreholes are drilled, so it is added on its own: $2{,}400n + 650$.\nStep 3: Total spending equals the budget: $2{,}400n + 650 = 29{,}450$. Check: $n = 12$ gives $2{,}400(12) + 650 = 28{,}800 + 650 = 29{,}450$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($650n + 2{,}400 = 29{,}450$): swaps the two dollar amounts, charging $\\$650$ per borehole and $\\$2{,}400$ once. It solves to $n = 41.6$, not a whole number of boreholes.\n* Choice B ($2{,}400(n + 650) = 29{,}450$): puts the charge inside the parentheses, which bills $\\$650$ for every borehole. The left side is already over a million dollars at $n = 1$.\n* Choice C ($2{,}400n - 650 = 29{,}450$): subtracts the mobilization charge, as if the team were refunded it instead of paying it.\n\n**Test Day Takeaway:** A per-unit rate multiplies the unknown; a one-time charge is added outside any parentheses. Test your equation with a whole number before you move on.",
      skills: ["word-problem-to-equation"]
    },
    // ============================================================
    // Q4-Q16: Medium core (band 4-5)
    // ============================================================
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A land-use plan pairs the acreage constraints $12x + 8y = 60$ and $9x + 6y = 54$, where $x$ and $y$ are the acres given to two permitted uses. How many ordered pairs $(x, y)$ satisfy both constraints at once?",
      choices: [
        { id: "A", text: "Zero" },
        // distractor: assumes two different linear equations always cross at one point
        { id: "B", text: "Exactly one" },
        // distractor: counts one solution per equation rather than solving the system
        { id: "C", text: "Exactly two" },
        // distractor: notices the left sides are proportional but never compares the constants
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice A is correct.** Reduced, the constraints read $3x + 2y = 15$ and $3x + 2y = 18$, and no pair makes $3x + 2y$ equal two different numbers.\n\n**The Fast Way (~20s):** Divide the first constraint by $4$ and the second by $3$. Identical left sides with different right sides means the lines are parallel and never meet.\n\n**The Full Solution:**\nStep 1: Divide every term of $12x + 8y = 60$ by $4$: $3x + 2y = 15$.\nStep 2: Divide every term of $9x + 6y = 54$ by $3$: $3x + 2y = 18$.\nStep 3: The same expression $3x + 2y$ cannot equal $15$ and $18$ at the same time, so no ordered pair satisfies both. Check with a pair that satisfies the first, $(1, 6)$: it gives $3(1) + 2(6) = 15$ for the first constraint but only $15$, not $18$, for the second. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (Exactly one): true for most systems, but only when the two lines have different slopes. Here both reduce to slope $-\\frac{3}{2}$, so they never cross.\n* Choice C (Exactly two): counts the two equations rather than the solutions. Two straight lines can meet at most once, so two intersection points is impossible.\n* Choice D (Infinitely many): the right answer if the constants had matched after reducing. They do not: $15 \\ne 18$, so the lines are parallel and distinct, not the same line.\n\n**Test Day Takeaway:** Reduce both equations until the variable sides look alike. Same variable side and same constant means infinitely many; same variable side and different constant means none.",
      skills: ["system-solution-types"]
    },
    {
      id: 5,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "A tide-gauge log records the relationship $5x + 3y = 7$ and, on a later page, the relationship $20x + cy = 28$. Both hold for exactly the same pairs $(x, y)$. What is the value of $c$?",
      correctAnswer: "12",
      explanation: "**SAT Pattern: System Equivalence Check**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~15s):** The constants went from $7$ to $28$, a factor of $4$, so every coefficient is multiplied by $4$: $c = 3(4) = 12$.\n\n**The Full Solution:**\nStep 1: Two linear equations hold for exactly the same pairs only when one is a nonzero multiple of the other. Call that multiplier $k$, so $5k = 20$, $3k = c$, and $7k = 28$.\nStep 2: From $5k = 20$, $k = 4$; the constants agree, since $7(4) = 28$.\nStep 3: Then $c = 3(4) = 12$. Check with the pair $(2, -1)$, which satisfies $5(2) + 3(-1) = 7$: the second relationship gives $20(2) + 12(-1) = 40 - 12 = 28$. $\\checkmark$\n\n**Common Mistakes:** Entering $4$ (reporting the multiplier itself instead of $3$ times the multiplier); entering $3$ (leaving the coefficient unchanged, as if only the $x$-term were scaled); entering $60$ (multiplying $3$ by the full coefficient $20$ rather than by the multiplier $4$).\n\n**Test Day Takeaway:** When two equations describe the same relationship, find the multiplier from a pair of matching terms, then apply that same multiplier everywhere.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 6,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The figure shows a right-triangular lot whose two labeled sides are in meters. A fence of length $90$ meters encloses the lot. What is the value of $\\cos X$?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [40, 0], [0, 9]], labels: ["", "X", ""], sideLabels: ["40", "", "9"], rightAngleVertex: 0 } },
      choices: [
        // distractor: uses the side opposite X over the hypotenuse, which is sin X
        { id: "A", text: "$\\frac{9}{41}$" },
        // distractor: divides the two legs, which is tan X
        { id: "B", text: "$\\frac{9}{40}$" },
        { id: "C", text: "$\\frac{40}{41}$" },
        // distractor: inverts tan X, putting the adjacent leg over the opposite leg
        { id: "D", text: "$\\frac{40}{9}$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice C is correct.** The fence gives the missing side: $90 - 40 - 9 = 41$ meters is the hypotenuse, and $\\cos X = \\frac{40}{41}$.\n\n**The Fast Way (~20s):** Subtract the two labeled sides from the perimeter to get the hypotenuse $41$, then take adjacent over hypotenuse for the angle $X$.\n\n**The Full Solution:**\nStep 1: The perimeter is the sum of all three sides, so the unlabeled side measures $90 - (40 + 9) = 41$ meters. It is opposite the right angle, so it is the hypotenuse.\nStep 2: Angle $X$ sits between the side of length $40$ and the hypotenuse, so $40$ is the adjacent leg and $9$ is the opposite leg.\nStep 3: Cosine is adjacent over hypotenuse: $\\cos X = \\frac{40}{41}$. Check with the Pythagorean theorem: $40^2 + 9^2 = 1600 + 81 = 1681 = 41^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{9}{41}$): uses the leg opposite $X$ over the hypotenuse. That ratio is $\\sin X$, about $0.22$, not the cosine.\n* Choice B ($\\frac{9}{40}$): divides one leg by the other and never uses the hypotenuse. That ratio is $\\tan X$.\n* Choice D ($\\frac{40}{9}$): flips $\\tan X$, putting the adjacent leg over the opposite leg. Any cosine must be less than $1$, and this value is greater than $4$.\n\n**Test Day Takeaway:** When a right-triangle figure gives a perimeter, the perimeter is usually the fastest route to the missing side. Label the sides as opposite, adjacent, and hypotenuse relative to the named angle before choosing the ratio.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "An acoustics technician needs one pair of values $(x, y)$ to satisfy both $y = 4x - 9$ and $3x + 2y = 48$. Which equation in $x$ alone has that same $x$-value as its solution?",
      choices: [
        { id: "A", text: "$3x + 2(4x - 9) = 48$" },
        // distractor: multiplies only the 4x term by 2 and leaves the -9 undoubled
        { id: "B", text: "$3x + 8x - 9 = 48$" },
        // distractor: replaces x instead of y in the second equation
        { id: "C", text: "$3(4x - 9) + 2x = 48$" },
        // distractor: changes the sign of the constant, using 4x + 9 in place of 4x - 9
        { id: "D", text: "$3x + 2(4x + 9) = 48$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice A is correct.** The first equation already gives $y$, so replacing $y$ with $4x - 9$ in $3x + 2y = 48$ yields $3x + 2(4x - 9) = 48$.\n\n**The Fast Way (~15s):** $y$ is alone in the first equation, so put $4x - 9$ everywhere $y$ appears in the second — parentheses included, since the whole expression is doubled.\n\n**The Full Solution:**\nStep 1: The first equation states that $y$ and $4x - 9$ name the same number, so either one may take the other's place.\nStep 2: In $3x + 2y = 48$, the $y$ is multiplied by $2$. Wrapping the replacement in parentheses keeps that factor on the entire expression: $3x + 2(4x - 9) = 48$.\nStep 3: That equation solves to $3x + 8x - 18 = 48$, so $11x = 66$ and $x = 6$. Check the pair: $y = 4(6) - 9 = 15$, and $3(6) + 2(15) = 18 + 30 = 48$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($3x + 8x - 9 = 48$): doubles the $4x$ but forgets to double the $-9$. It solves to $x = \\frac{57}{11}$, which does not satisfy the original pair.\n* Choice C ($3(4x - 9) + 2x = 48$): puts the replacement where $x$ sits instead of where $y$ sits. The expression $4x - 9$ equals $y$, not $x$.\n* Choice D ($3x + 2(4x + 9) = 48$): flips the sign of the constant. It solves to $x = \\frac{30}{11}$, and $4x + 9$ is not the given expression for $y$.\n\n**Test Day Takeaway:** When one equation is already solved for a variable, substitute the entire expression in parentheses so every factor outside them reaches all of it.",
      skills: ["substitution-method"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A drawer holds $18$ ammonite fossils and an unknown number of trilobite fossils. If one fossil is selected at random, the probability of selecting an ammonite is $0.4$. How many trilobite fossils are in the drawer?",
      choices: [
        // distractor: multiplies 18 by 0.4 instead of dividing
        { id: "A", text: "$7.2$" },
        // distractor: divides 18 by 0.6 to get a total of 30, then subtracts 18
        { id: "B", text: "$12$" },
        { id: "C", text: "$27$" },
        // distractor: reports the total number of fossils instead of the trilobite count
        { id: "D", text: "$45$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Basic Probability**\n\n**Choice C is correct.** Since $\\frac{18}{\\text{total}} = 0.4$, the drawer holds $45$ fossils, so $45 - 18 = 27$ are trilobites.\n\n**The Fast Way (~20s):** $18 \\div 0.4 = 45$ fossils in all; the trilobite count is what is left, $45 - 18 = 27$.\n\n**The Full Solution:**\nStep 1: Probability is the count of ammonites over the total count, so $\\frac{18}{T} = 0.4$, where $T$ is the total.\nStep 2: Multiply both sides by $T$ and divide by $0.4$: $T = \\frac{18}{0.4} = 45$ fossils.\nStep 3: Everything that is not an ammonite is a trilobite: $45 - 18 = 27$. Check: with $27$ trilobites the drawer holds $45$, and $\\frac{18}{45} = 0.4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($7.2$): multiplies $18$ by $0.4$ instead of dividing. The probability is already a part over a whole, so the whole is reached by dividing, and a count cannot be a decimal anyway.\n* Choice B ($12$): divides by $0.6$, the probability of a trilobite, giving a total of $30$, then subtracts $18$. The $18$ counted fossils are ammonites, so they pair with $0.4$, not with $0.6$.\n* Choice D ($45$): stops at the total number of fossils. The question asks only for the trilobites.\n\n**Test Day Takeaway:** Match each count to its own probability before dividing, and reread the last line of the stem — the part you solved for is often one subtraction short of the answer.",
      skills: ["probability-basics"]
    },
    {
      id: 9,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A hydrophone calibration routine requires the exponential statement $9^{2t} = 3^{t + 10}$ to hold, where the constant $t$ is the routine's damping level. Which equation must $t$ satisfy?",
      choices: [
        // distractor: treats the base 9 as though it were already 3 and keeps the exponent 2t
        { id: "A", text: "$2t = t + 10$" },
        { id: "B", text: "$4t = t + 10$" },
        // distractor: rewrites 9 as 3 cubed instead of 3 squared
        { id: "C", text: "$6t = t + 10$" },
        // distractor: rewrites the left side correctly but also multiplies the right exponent by 3
        { id: "D", text: "$4t = 3(t + 10)$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice B is correct.** Since $9 = 3^2$, the left side is $3^{4t}$, and equal powers of $3$ force $4t = t + 10$.\n\n**The Fast Way (~15s):** Rewrite $9^{2t}$ as $(3^2)^{2t} = 3^{4t}$; with base $3$ on both sides the exponents must match.\n\n**The Full Solution:**\nStep 1: Write both sides over one base. Because $9 = 3^2$, $9^{2t} = (3^2)^{2t}$.\nStep 2: A power raised to a power multiplies the exponents: $(3^2)^{2t} = 3^{2 \\cdot 2t} = 3^{4t}$. The statement becomes $3^{4t} = 3^{t + 10}$.\nStep 3: Exponential functions with the same base are one-to-one, so the exponents are equal: $4t = t + 10$. Check by solving: $3t = 10$, so $t = \\frac{10}{3}$, and $4\\left(\\frac{10}{3}\\right) = \\frac{40}{3}$ matches $\\frac{10}{3} + 10 = \\frac{40}{3}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2t = t + 10$): carries the exponent $2t$ straight across without converting the base $9$ to base $3$. That skips the step that makes the bases comparable.\n* Choice C ($6t = t + 10$): uses $9 = 3^3$, which is $27$. Multiplying $2t$ by $3$ instead of $2$ gives an exponent that is too large.\n* Choice D ($4t = 3(t + 10)$): converts the left side correctly, then scales the right exponent as well. The right side was already written in base $3$ and needs no change.\n\n**Test Day Takeaway:** Convert one side so both sides share a base, multiply exponents when a power is raised to a power, and only then set the exponents equal.",
      skills: ["exponential-functions"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "On a zoning map whose units are meters, a greenway path lies along the line $4x + 10y = 35$ in the $xy$-plane, and a service road meets the greenway at a right angle. What is the slope of the service road?",
      choices: [
        // distractor: takes the reciprocal but keeps the negative sign
        { id: "A", text: "$-\\frac{5}{2}$" },
        // distractor: reports the slope of the greenway path itself
        { id: "B", text: "$-\\frac{2}{5}$" },
        // distractor: changes the sign of the greenway slope without taking the reciprocal
        { id: "C", text: "$\\frac{2}{5}$" },
        { id: "D", text: "$\\frac{5}{2}$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Perpendicular Slope**\n\n**Choice D is correct.** The greenway has slope $-\\frac{2}{5}$, so a perpendicular road has slope $\\frac{5}{2}$.\n\n**The Fast Way (~15s):** In $4x + 10y = 35$ the slope is $-\\frac{4}{10} = -\\frac{2}{5}$; flip it and change the sign to get $\\frac{5}{2}$.\n\n**The Full Solution:**\nStep 1: Solve for $y$: $10y = -4x + 35$, so $y = -\\frac{2}{5}x + \\frac{7}{2}$. The greenway's slope is $-\\frac{2}{5}$.\nStep 2: Perpendicular lines have slopes whose product is $-1$. If $m$ is the service road's slope, then $-\\frac{2}{5}m = -1$.\nStep 3: Multiply both sides by $-\\frac{5}{2}$: $m = \\frac{5}{2}$. Check: $-\\frac{2}{5} \\cdot \\frac{5}{2} = -1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{5}{2}$): turns the fraction over but leaves the sign negative. Two negative slopes multiply to a positive number, never $-1$.\n* Choice B ($-\\frac{2}{5}$): reports the greenway's own slope. A road with that slope would run parallel to the path, not across it.\n* Choice C ($\\frac{2}{5}$): changes the sign only. Its product with $-\\frac{2}{5}$ is $-\\frac{4}{25}$, not $-1$.\n\n**Test Day Takeaway:** Perpendicular means both moves: flip the fraction and change the sign. Multiply the two slopes as a check — the product must be exactly $-1$.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 11,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The coordinate plane shows the moorings of two ocean buoys, where each unit represents one kilometer. A cable runs straight from one mooring to the other. How many kilometers long is the cable?",
      diagram: { type: "coordinatePoints", params: { points: [[2, 2], [10, 8]], xMin: 0, xMax: 12, yMin: 0, yMax: 12 } },
      correctAnswer: "10",
      explanation: "**SAT Pattern: Distance Formula**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~15s):** The moorings are $8$ units apart horizontally and $6$ vertically, and $6$-$8$-$10$ is a right-triangle triple, so the cable is $10$ kilometers.\n\n**The Full Solution:**\nStep 1: Read the plotted points: $(2, 2)$ and $(10, 8)$.\nStep 2: The distance formula gives $d = \\sqrt{(10 - 2)^2 + (8 - 2)^2} = \\sqrt{8^2 + 6^2}$.\nStep 3: $\\sqrt{64 + 36} = \\sqrt{100} = 10$ kilometers. Check on the grid: going $8$ units right and $6$ units up from $(2, 2)$ lands exactly on $(10, 8)$, and those legs make a $6$-$8$-$10$ right triangle. $\\checkmark$\n\n**Common Mistakes:** Entering $8$ (using only the horizontal separation); entering $6$ (using only the vertical separation); entering $14$ (adding the two separations instead of using the Pythagorean relationship); entering $100$ (stopping at the sum of the squares and forgetting the square root).\n\n**Test Day Takeaway:** Two plotted points make the legs of a right triangle. Count the horizontal and vertical gaps, then take the square root of the sum of their squares — and watch for the familiar $3$-$4$-$5$ family.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 12,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A field lab computes a soil-permeability index $w$ from two drainage readings and requires that $\\frac{5w - 3}{6} = \\frac{w + 9}{3}$. Which of the following equations has the same solution for $w$ as the given equation?",
      choices: [
        // distractor: cancels both denominators as if 6 and 3 were the same number
        { id: "A", text: "$5w - 3 = w + 9$" },
        { id: "B", text: "$5w - 3 = 2(w + 9)$" },
        // distractor: multiplies only the w term of the right side by 2 and leaves the 9 alone
        { id: "C", text: "$5w - 3 = 2w + 9$" },
        // distractor: multiplies each side by its own denominator instead of by a common one
        { id: "D", text: "$6(5w - 3) = 3(w + 9)$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice B is correct.** Multiplying both sides by $6$ clears the fractions and gives $5w - 3 = 2(w + 9)$.\n\n**The Fast Way (~15s):** $6$ is the common denominator: the left side loses its $6$, and the right side is multiplied by $\\frac{6}{3} = 2$.\n\n**The Full Solution:**\nStep 1: Multiply every part of the equation by $6$, the least common denominator: $6 \\cdot \\frac{5w - 3}{6} = 6 \\cdot \\frac{w + 9}{3}$.\nStep 2: On the left the $6$ cancels, leaving $5w - 3$. On the right, $\\frac{6}{3} = 2$, so the right side becomes $2(w + 9)$ — the factor $2$ reaches both terms.\nStep 3: The cleared equation is $5w - 3 = 2(w + 9)$, which solves to $5w - 3 = 2w + 18$, then $3w = 21$ and $w = 7$. Check in the original: $\\frac{5(7) - 3}{6} = \\frac{32}{6}$ and $\\frac{7 + 9}{3} = \\frac{16}{3} = \\frac{32}{6}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5w - 3 = w + 9$): erases both denominators as though they matched. It solves to $w = 3$, and $\\frac{12}{6}$ does not equal $\\frac{12}{3}$.\n* Choice C ($5w - 3 = 2w + 9$): doubles the $w$ but not the $9$. It solves to $w = 4$, which fails the original equation.\n* Choice D ($6(5w - 3) = 3(w + 9)$): multiplies each side by the denominator it already has, which enlarges both sides unequally. It solves to $w = \\frac{5}{3}$.\n\n**Test Day Takeaway:** Clear fractions by multiplying every term by one common denominator, and distribute the resulting factor across the entire numerator you kept.",
      skills: ["solving-equations"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Planners describe a circular fountain basin by the equation $x^2 + y^2 - 10x + 24y + 144 = 0$, where $x$ and $y$ are ground distances measured in meters from a survey marker. How many meters long is the radius of the basin?",
      choices: [
        { id: "A", text: "$5$" },
        // distractor: reads the 12 inside (y + 12)^2 as the radius
        { id: "B", text: "$12$" },
        // distractor: completes both squares but never subtracts the 144 from the left side, giving the square root of 169
        { id: "C", text: "$13$" },
        // distractor: reports r squared instead of r
        { id: "D", text: "$25$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice A is correct.** Completing both squares gives $(x - 5)^2 + (y + 12)^2 = 25$, so the radius is $\\sqrt{25} = 5$ meters.\n\n**The Fast Way (~30s):** Half of $-10$ is $-5$ and half of $24$ is $12$, contributing $25 + 144 = 169$; moving the $144$ across leaves $169 - 144 = 25$, so $r = 5$.\n\n**The Full Solution:**\nStep 1: Group and move the constant: $(x^2 - 10x) + (y^2 + 24y) = -144$.\nStep 2: Complete each square. Add $\\left(\\frac{-10}{2}\\right)^2 = 25$ and $\\left(\\frac{24}{2}\\right)^2 = 144$ to both sides: $(x - 5)^2 + (y + 12)^2 = -144 + 25 + 144 = 25$.\nStep 3: In $(x - h)^2 + (y - k)^2 = r^2$, the right side is $r^2$, so $r^2 = 25$ and $r = 5$ meters. Check the point $(10, -12)$, which is $5$ meters right of the center: $100 + 144 - 100 - 288 + 144 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($12$): grabs the $12$ from $(y + 12)^2$. That number locates the center's $y$-coordinate at $-12$; it says nothing about the radius.\n* Choice C ($13$): completes both squares but leaves the original $+144$ on the left, so the right side reads $169$ and the square root is $13$. The constant has to move across first.\n* Choice D ($25$): stops at $r^2$. The equation's right side is the square of the radius, so one more square root is needed.\n\n**Test Day Takeaway:** Move the constant first, then add the square of half of each linear coefficient to both sides. The number that survives on the right is $r^2$, never $r$.",
      skills: ["circle-equation", "completing-square-circles"]
    },
    {
      id: 14,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The salinity at each of six estuary stations, in parts per thousand, is $9$, $12$, $15$, $20$, $24$, and $k$. What value of $k$ gives the six measurements a median of $16$?",
      correctAnswer: "17",
      explanation: "**SAT Pattern: Median Calculation**\n\n**The correct answer is $17$.**\n\n**The Fast Way (~25s):** With six values the median is the average of the third and fourth. The known middle value is $15$, so the partner must satisfy $\\frac{15 + k}{2} = 16$, giving $k = 17$.\n\n**The Full Solution:**\nStep 1: Order the five known values: $9$, $12$, $15$, $20$, $24$. The unknown $k$ takes one of the six slots.\nStep 2: If $k$ were $15$ or less, the middle pair would be $12$ and $15$, a median of $13.5$; if $k$ were $20$ or more, the middle pair would be $15$ and $20$, a median of $17.5$. Neither is $16$, so $k$ lands between $15$ and $20$ and becomes the fourth value.\nStep 3: The middle pair is then $15$ and $k$, so $\\frac{15 + k}{2} = 16$, which gives $15 + k = 32$ and $k = 17$. Check: ordered, the values are $9$, $12$, $15$, $17$, $20$, $24$, and $\\frac{15 + 17}{2} = 16$. $\\checkmark$\n\n**Common Mistakes:** Entering $16$ (assuming the missing measurement equals the median, which would make the middle pair $15$ and $16$ and the median $15.5$); entering $12$ (pairing $k$ with $20$ instead of $15$ and solving $\\frac{k + 20}{2} = 16$); entering $32$ (doubling the median and forgetting to subtract the $15$).\n\n**Test Day Takeaway:** For an even count, the median is the average of the two middle values. Decide where the unknown must sit before you write the averaging equation.",
      skills: ["find-median"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The table summarizes the $180$ tape reels in a broadcast archive by tape width and by the decade in which each reel was recorded. If one of these reels is selected at random, which statement is true?",
      questionTable: { headers: ["Tape width", "1970s", "1980s"], rows: [["Quarter-inch", "$48$", "$27$"], ["Half-inch", "$42$", "$63$"]] },
      choices: [
        { id: "A", text: "The probability that the reel is half-inch is $\\frac{105}{180}$." },
        // distractor: keeps the grand total but counts one cell instead of the whole 1980s column
        { id: "B", text: "The probability that the reel was recorded in the 1980s is $\\frac{63}{180}$." },
        // distractor: divides the quarter-inch 1970s cell by the 1970s column total instead of putting the quarter-inch row total over 180
        { id: "C", text: "The probability that the reel is quarter-inch is $\\frac{48}{90}$." },
        // distractor: divides the half-inch 1970s cell by the half-inch row total instead of putting the 1970s column total over 180
        { id: "D", text: "The probability that the reel was recorded in the 1970s is $\\frac{42}{105}$." }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice A is correct.** The archive holds $42 + 63 = 105$ half-inch reels among the $180$ reels, so the probability is $\\frac{105}{180}$.\n\n**The Fast Way (~25s):** A marginal probability is a whole row total over the grand total: the half-inch row sums to $105$, and the archive holds $180$ reels.\n\n**The Full Solution:**\nStep 1: Total each row and each column. Quarter-inch: $48 + 27 = 75$. Half-inch: $42 + 63 = 105$. The 1970s column: $48 + 42 = 90$. The 1980s column: $27 + 63 = 90$. All four cells sum to $180$.\nStep 2: The event \"the reel is half-inch\" covers both cells of the half-inch row, so its count is $105$, not either cell on its own.\nStep 3: Divide by the grand total: $\\frac{105}{180} = \\frac{7}{12}$. Check the complement: quarter-inch is $\\frac{75}{180} = \\frac{5}{12}$, and $\\frac{7}{12} + \\frac{5}{12} = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{63}{180}$): keeps the correct grand total but counts only the half-inch reels from the 1980s. That column also holds $27$ quarter-inch reels, so its count is $90$.\n* Choice C ($\\frac{48}{90}$): divides one cell by its column total, which answers a different question — the chance that a 1970s reel is quarter-inch. The marginal probability is $\\frac{75}{180}$.\n* Choice D ($\\frac{42}{105}$): divides one cell by its row total. That gives the chance that a half-inch reel is from the 1970s, not the chance that any reel is, which is $\\frac{90}{180}$.\n\n**Test Day Takeaway:** A marginal probability always sits over the grand total with a whole row or column on top. A single cell in the numerator makes it a joint probability; a row or column total in the denominator makes it a conditional one.",
      skills: ["probability-basics"]
    },
    {
      id: 16,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The table gives the measured density of four rock samples collected on one field survey. Based on the table, what is the density of the granite sample, in kilograms per cubic meter? ($1$ meter $= 100$ centimeters)",
      questionTable: { headers: ["Sample", "Density (grams per cubic centimeter)"], rows: [["Basalt", "$2.9$"], ["Granite", "$2.7$"], ["Limestone", "$2.4$"], ["Quartzite", "$2.6$"]] },
      choices: [
        // distractor: converts grams to kilograms but leaves the volume in cubic centimeters
        { id: "A", text: "$0.0027$" },
        // distractor: multiplies by 100 once instead of 100 cubed
        { id: "B", text: "$0.27$" },
        // distractor: squares the length conversion instead of cubing it
        { id: "C", text: "$27$" },
        { id: "D", text: "$2{,}700$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice D is correct.** One cubic meter holds $100^3 = 1{,}000{,}000$ cubic centimeters, so $2.7$ grams per cubic centimeter is $2.7 \\times 1{,}000$ kilograms per cubic meter, or $2{,}700$.\n\n**The Fast Way (~20s):** Grams to kilograms divides by $1{,}000$; cubic centimeters to cubic meters multiplies by $1{,}000{,}000$. Net: multiply by $1{,}000$, giving $2{,}700$.\n\n**The Full Solution:**\nStep 1: Read the granite row: $2.7$ grams per cubic centimeter.\nStep 2: Convert the mass unit: $2.7$ grams $= 0.0027$ kilograms, so the density is $0.0027$ kilograms per cubic centimeter.\nStep 3: Convert the volume unit. Because $1$ meter $= 100$ centimeters, $1$ cubic meter $= 100^3 = 1{,}000{,}000$ cubic centimeters, so $0.0027 \\times 1{,}000{,}000 = 2{,}700$ kilograms per cubic meter. Check the size: water is about $1{,}000$ kilograms per cubic meter, and granite is a bit under three times as dense. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.0027$): converts grams to kilograms and stops, leaving the volume in cubic centimeters. The unit asked for is per cubic meter.\n* Choice B ($0.27$): scales the volume by $100$ rather than by $100^3$, as if a cubic meter were only one hundred cubic centimeters.\n* Choice C ($27$): squares the conversion, using $100^2$. Volume needs three factors of the length conversion, not two.\n\n**Test Day Takeaway:** A length conversion is cubed when it acts on a volume. Multiply by the conversion factor written as a fraction so the unwanted unit cancels three times.",
      skills: ["unit-conversion"]
    },
    // ============================================================
    // Q17-Q22: Medium-hard ceiling (band 6-7)
    // ============================================================
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A city street-improvement budget, in dollars, satisfies $4{,}000c + 2{,}500s = 960{,}000$, where $c$ is the number of crosswalks repainted and $s$ is the number of streetlights installed. Which statement is the best interpretation of the relationship between $c$ and $s$?",
      choices: [
        // distractor: inverts the ratio, dividing 2500 by 4000 instead of 4000 by 2500
        { id: "A", text: "For each additional crosswalk repainted, the number of streetlights installed decreases by $0.625$." },
        { id: "B", text: "For each additional crosswalk repainted, the number of streetlights installed decreases by $1.6$." },
        // distractor: keeps the size of the rate but drops the negative sign built into the budget
        { id: "C", text: "For each additional crosswalk repainted, the number of streetlights installed increases by $1.6$." },
        // distractor: swaps the two variables, applying the crosswalk rate to a streetlight
        { id: "D", text: "For each additional streetlight installed, the number of crosswalks repainted decreases by $1.6$." }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice B is correct.** Solving for $s$ gives $s = 384 - 1.6c$, so each extra crosswalk costs the city $1.6$ streetlights.\n\n**The Fast Way (~25s):** A fixed budget makes the rate the ratio of the prices: $\\frac{4{,}000}{2{,}500} = 1.6$ streetlights given up per crosswalk added.\n\n**The Full Solution:**\nStep 1: Isolate the streetlight count: $2{,}500s = 960{,}000 - 4{,}000c$.\nStep 2: Divide by $2{,}500$: $s = 384 - 1.6c$. The coefficient of $c$ is $-1.6$.\nStep 3: A slope of $-1.6$ means $s$ falls by $1.6$ each time $c$ rises by $1$. Check two budget-filling pairs: $c = 0$ gives $s = 384$, and $c = 10$ gives $s = 384 - 16 = 368$, since $4{,}000(10) + 2{,}500(368) = 40{,}000 + 920{,}000 = 960{,}000$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.625$): divides $2{,}500$ by $4{,}000$. That number is the rate in the other direction — how many crosswalks one streetlight costs.\n* Choice C (increases by $1.6$): reads the size of the rate but ignores the sign. The budget is fixed, so spending more on crosswalks must leave less for streetlights.\n* Choice D (per streetlight): applies the crosswalk rate to the wrong variable. Adding one streetlight frees only $\\$2{,}500$, which is $0.625$ of a crosswalk, not $1.6$.\n\n**Test Day Takeaway:** With an equation in standard form, solve for the variable the statement is about before reading a rate. The sign of the resulting coefficient carries the direction.",
      skills: ["slope-intercept-form"]
    },
    {
      id: 18,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A microphone-sensitivity formula contains the expression $\\frac{y^4\\sqrt{y^k}}{y}$, where $k$ is a constant and $y$ is a positive scaling factor. For every positive value of $y$ that expression equals $y^9$. What is the value of $k$?",
      choices: [
        // distractor: treats the square root of y to the k as y to the k, skipping the one-half exponent
        { id: "A", text: "$6$" },
        // distractor: ignores the y in the denominator, solving 4 + k/2 = 9
        { id: "B", text: "$10$" },
        { id: "C", text: "$12$" },
        // distractor: treats the square root as a cube root, solving 4 + k/3 - 1 = 9
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice C is correct.** The expression simplifies to $y^{4 + \\frac{k}{2} - 1}$, and setting $3 + \\frac{k}{2} = 9$ gives $k = 12$.\n\n**The Fast Way (~30s):** The three exponents combine to $4 + \\frac{k}{2} - 1$. Set that equal to $9$: $\\frac{k}{2} = 6$, so $k = 12$.\n\n**The Full Solution:**\nStep 1: A square root is the one-half power: $\\sqrt{y^k} = y^{\\frac{k}{2}}$.\nStep 2: Multiplying adds exponents and dividing subtracts them, so $\\frac{y^4 \\cdot y^{\\frac{k}{2}}}{y^1} = y^{4 + \\frac{k}{2} - 1} = y^{3 + \\frac{k}{2}}$.\nStep 3: Two powers of the same positive base agree for all $y$ only when the exponents agree: $3 + \\frac{k}{2} = 9$, so $\\frac{k}{2} = 6$ and $k = 12$. Check with $k = 12$ and $y = 2$: $\\frac{2^4\\sqrt{2^{12}}}{2} = \\frac{16 \\cdot 64}{2} = 512 = 2^9$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): drops the radical, treating $\\sqrt{y^k}$ as $y^k$ and solving $4 + k - 1 = 9$. The root halves the exponent it covers.\n* Choice B ($10$): forgets the $y$ in the denominator and solves $4 + \\frac{k}{2} = 9$. Dividing subtracts $1$ from the exponent total.\n* Choice D ($18$): treats the radical as a cube root, dividing $k$ by $3$. The symbol has no index, so it is a square root.\n\n**Test Day Takeaway:** Turn every radical into a fractional exponent first, then add exponents for factors and subtract for divisors before matching the two sides.",
      skills: ["exponent-rules", "radical-expressions"]
    },
    {
      id: 19,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "Two inspectors each visited every residential and commercial site in one district. The first inspector spent $4$ hours at each residential site and $7$ hours at each commercial site, for $219$ hours in all. The second inspector spent $7$ hours at each residential site and $4$ hours at each commercial site, for $210$ hours in all. What is the total number of sites in the district?",
      correctAnswer: "39",
      explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**The correct answer is $39$.**\n\n**The Fast Way (~35s):** Adding the two equations gives $11r + 11c = 429$, so $r + c = \\frac{429}{11} = 39$ without ever finding $r$ or $c$ separately.\n\n**The Full Solution:**\nStep 1: Let $r$ be the number of residential sites and $c$ the number of commercial sites. The first inspector's hours give $4r + 7c = 219$; the second inspector's give $7r + 4c = 210$.\nStep 2: The question asks for $r + c$, and the coefficients are mirrored, so add the equations: $(4r + 7r) + (7c + 4c) = 219 + 210$, which is $11r + 11c = 429$.\nStep 3: Divide by $11$: $r + c = 39$. Check by solving fully — subtracting the equations gives $3c - 3r = 9$, so $c - r = 3$; with $r + c = 39$ that means $c = 21$ and $r = 18$, and $4(18) + 7(21) = 72 + 147 = 219$. $\\checkmark$\n\n**Common Mistakes:** Entering $429$ (adding the two hour totals and never dividing by $11$); entering $18$ or $21$ (reporting one type of site instead of the total); entering $3$ (subtracting the equations, which gives the difference $c - r$ rather than the sum).\n\n**Test Day Takeaway:** When a system asks for a combination such as $r + c$, check whether adding or subtracting the equations produces that combination directly. Mirrored coefficients are the signal.",
      skills: ["word-problem-to-equation", "setting-up-systems"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "Two water-quality readings satisfy $6x + 10y = 34$ and $9x - 4y = 32$ at the same time, where $x$ is a dissolved-oxygen level and $y$ is a turbidity index. Which equation is also satisfied by that pair of values?",
      choices: [
        // distractor: adds the two equations as written and treats 10y - 4y as canceling
        { id: "A", text: "$15x = 66$" },
        // distractor: scales to 18x on both equations, then adds instead of subtracting so the x terms do not cancel
        { id: "B", text: "$22y = 166$" },
        { id: "C", text: "$57x = 228$" },
        // distractor: scales the left sides by 2 and 5 but adds the original constants 34 and 32
        { id: "D", text: "$57x = 66$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice C is correct.** Doubling the first equation and multiplying the second by $5$ makes the $y$-terms opposites, and adding gives $57x = 228$.\n\n**The Fast Way (~35s):** $10y$ and $-4y$ share $20y$: take $2$ times the first equation and $5$ times the second, then add. The result is $57x = 228$, and $x = 4$ fits both equations.\n\n**The Full Solution:**\nStep 1: Multiply the first equation by $2$: $12x + 20y = 68$. Multiply the second by $5$: $45x - 20y = 160$. Both constants scale along with the left sides.\nStep 2: Add the two scaled equations. The $y$-terms cancel: $(12x + 45x) = 68 + 160$, so $57x = 228$.\nStep 3: That equation gives $x = 4$, and substituting into $6x + 10y = 34$ gives $10y = 10$, so $y = 1$. Check the second reading: $9(4) - 4(1) = 36 - 4 = 32$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($15x = 66$): adds the equations untouched and assumes $10y - 4y$ vanishes. It leaves $6y$ behind and gives $x = 4.4$, which fails both readings.\n* Choice B ($22y = 166$): scales to $18x$ in each equation, then adds instead of subtracting, so the $x$-terms survive rather than cancel. It gives $y \\approx 7.5$, far from $y = 1$.\n* Choice D ($57x = 66$): scales the left sides correctly but carries the original constants, adding $34 + 32$. Every term of an equation must be multiplied, constants included.\n\n**Test Day Takeaway:** To eliminate a variable, scale both equations to the least common multiple of its coefficients, multiply the constants too, and add only when the signs are opposite.",
      skills: ["elimination-method", "setting-up-systems"]
    },
    {
      id: 21,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "A studio plug-in converts an input level $x$ into the output level $f(x)$ listed in the table, and $f$ is linear. A second pass sends that output back through the same plug-in. What output does an input of $3$ produce after two passes?",
      questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$1$", "$5$"], ["$3$", "$11$"], ["$5$", "$17$"], ["$7$", "$23$"]] },
      choices: [
        // distractor: runs the table backward, finding the input whose output is 11
        { id: "A", text: "$3$" },
        // distractor: reports the result of one pass and stops
        { id: "B", text: "$11$" },
        // distractor: uses the rule f(x) = 3x and drops the constant 2
        { id: "C", text: "$33$" },
        { id: "D", text: "$35$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Function Evaluation**\n\n**Choice D is correct.** The table gives $f(x) = 3x + 2$; one pass sends $3$ to $11$, and a second pass sends $11$ to $35$.\n\n**The Fast Way (~30s):** Outputs rise $6$ for every $2$ of input, so $f(x) = 3x + 2$. Then $f(3) = 11$ and $f(11) = 35$.\n\n**The Full Solution:**\nStep 1: Find the rule. From $x = 1$ to $x = 3$ the output climbs $11 - 5 = 6$ over a run of $2$, so the slope is $3$; since $f(1) = 5$, the constant is $5 - 3 = 2$, giving $f(x) = 3x + 2$.\nStep 2: The first pass reads straight off the table: $f(3) = 11$.\nStep 3: The second pass feeds $11$ back in, and $11$ is outside the table, so use the rule: $f(11) = 3(11) + 2 = 35$. Check the rule against a row it was not built from: $f(7) = 3(7) + 2 = 23$, which matches the table. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): searches the table for the input that produces $11$ and reports it. That runs the plug-in backward instead of forward.\n* Choice B ($11$): stops after one pass. The output of the first pass is the input of the second.\n* Choice C ($33$): uses $f(x) = 3x$, which fits the spacing of the outputs but not their values; it misses the constant $2$ and fails every row of the table.\n\n**Test Day Takeaway:** For a repeated application, work from the inside out, and extend a table to a rule as soon as the needed input falls outside the listed values.",
      skills: ["function-evaluation"]
    },
    {
      id: 22,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "A seismograph's factory setup requires $\\frac{3(2x - k)}{4} + 5 = 14$, where $k$ is a constant fixed at the plant. Technicians find that $x = 10$ satisfies the requirement. What is the value of $k$?",
      correctAnswer: "8",
      explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~25s):** Subtracting $5$ leaves $\\frac{3(20 - k)}{4} = 9$, so $20 - k = 12$ and $k = 8$.\n\n**The Full Solution:**\nStep 1: Put $x = 10$ into the requirement: $\\frac{3(20 - k)}{4} + 5 = 14$.\nStep 2: Subtract $5$ from both sides, then multiply both sides by $4$: $3(20 - k) = 36$.\nStep 3: Divide by $3$ to get $20 - k = 12$, so $k = 8$. Check with $k = 8$ and $x = 10$: $\\frac{3(20 - 8)}{4} + 5 = \\frac{36}{4} + 5 = 9 + 5 = 14$. $\\checkmark$\n\n**Common Mistakes:** Entering $17$ (multiplying out $3(20 - k) = 9$ without first multiplying the $9$ by $4$); entering $24$ (distributing the $3$ to the $2x$ only, which turns the numerator into $6x - k$); entering $-8$ (reading the numerator as $3(2x + k)$ and flipping the sign of the constant).\n\n**Test Day Takeaway:** Substitute the known solution first, then undo the operations in reverse order — the added constant, then the denominator, then the factor outside the parentheses.",
      skills: ["combining-like-terms"]
    }
  ]
};

export default practiceTest10M2Easy;
