// Practice Test 2 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Official-calibration recreation (2026-08-31): fresh scenarios throughout,
// accessible official register; diagrams at Q8 (bar chart), Q20 (parallel
// lines), Q21 (scatterplot), Q22 (two-way table).

export const practiceTest2M2Easy = {
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
      question: "Sediment depth at two coring sites is modeled by a linear function of the number of years since monitoring began. The table gives the modeled depth, in millimeters, at each site for four selected years. How many solutions does the system consisting of the two models have?",
      questionTable: { headers: ["Years since monitoring began", "Site $P$ depth (mm)", "Site $Q$ depth (mm)"], rows: [["$0$", "$5$", "$12$"], ["$1$", "$9$", "$16$"], ["$2$", "$13$", "$20$"], ["$3$", "$17$", "$24$"]] },
      choices: [
        { id: "A", text: "No solution" },
        // distractor: assumes any two distinct lines must cross, ignoring that both models rise 4 mm per year
        { id: "B", text: "Exactly one solution" },
        // distractor: treats a pair of linear models like a quadratic, which can meet twice
        { id: "C", text: "Exactly two solutions" },
        // distractor: sees the equal rate of 4 mm per year and concludes the two models are the same line, ignoring the different starting depths of 5 and 12
        { id: "D", text: "Infinitely many solutions" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Both columns climb by $4$ each year but start at $5$ and $12$, so the models are parallel lines and never meet.\n\n**The Full Solution:**\nStep 1: Read the rate for each site. Site $P$ goes $5, 9, 13, 17$, a gain of $4$ mm per year; site $Q$ goes $12, 16, 20, 24$, also a gain of $4$ mm per year.\nStep 2: Read the starting depths at $0$ years: site $P$ begins at $5$ mm and site $Q$ at $12$ mm. The models are $d = 4t + 5$ and $d = 4t + 12$.\nStep 3: Equal slopes with unequal intercepts means the lines are parallel and distinct, so the system has no solution. Check: setting $4t + 5 = 4t + 12$ gives $5 = 12$, which is never true. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (Exactly one solution): assumes two different lines always cross, but equal slopes rule that out.\n* Choice C (Exactly two solutions): a system of two lines can never have exactly two solutions; two intersections require a curve.\n* Choice D (Infinitely many solutions): the equal rate of $4$ mm per year is only half the test. The gap of $12 - 5 = 7$ mm never closes, so the lines are not identical.\n\n**Test Day Takeaway:** In a table, equal step sizes mean equal slopes. Then look at the starting values: same start means one line, different start means no solution.",
      skills: ["system-solution-types"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "The total cost $y$, in dollars, to rent a microphone for $x$ days satisfies $y - 8x = 35$. A second equation, $3y - 24x = m$, describes the same relationship for every value of $x$, where $m$ is a constant. What is the value of $m$?",
      correctAnswer: "105",
      explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**The correct answer is $105$.**\n\n**The Fast Way (~20s):** The second equation is the first multiplied by $3$, so $m = 3(35) = 105$.\n\n**The Full Solution:**\nStep 1: Two equations describe the same relationship exactly when one is a nonzero multiple of the other, which is the infinitely-many-solutions condition.\nStep 2: Compare the variable terms. Going from $y - 8x$ to $3y - 24x$ multiplies both terms by $3$, since $3(1) = 3$ and $3(-8) = -24$.\nStep 3: The same factor must hit the constant, so $m = 3(35) = 105$. Check: dividing $3y - 24x = 105$ by $3$ returns $y - 8x = 35$, the original equation. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $35$ by scaling only the variable terms and leaving the constant alone; that system would have no solution, not infinitely many.\n* Dividing instead of multiplying, giving $35 \\div 3 \\approx 11.67$.\n* Adding the multiplier rather than applying it, giving $35 + 3 = 38$.\n\n**Test Day Takeaway:** Infinitely many solutions means every coefficient scales by the same factor. Find the factor from the variable terms, then apply it to the constant.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A land-use plan sets aside $x$ acres of parkland and $y$ acres of wetland, and the plan's stormwater credit requirement is $6x + 10y = 84$. Which equation, paired with the given equation, forms a system with infinitely many solutions?",
      choices: [
        { id: "A", text: "$3x + 5y = 42$" },
        // distractor: halves the coefficients but leaves the constant at 84, so the lines are parallel and the system has no solution
        { id: "B", text: "$3x + 5y = 84$" },
        // distractor: halves the constant to 42 but leaves the coefficients unchanged, again giving parallel lines
        { id: "C", text: "$6x + 10y = 42$" },
        // distractor: doubles the coefficients but leaves the constant at 84 instead of doubling it to 168
        { id: "D", text: "$12x + 20y = 84$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Divide every term of $6x + 10y = 84$ by $2$: $3x + 5y = 42$.\n\n**The Full Solution:**\nStep 1: A system has infinitely many solutions only when the two equations are multiples of each other, term for term, including the constant.\nStep 2: Scale the given equation by $\\frac{1}{2}$. Then $6x$ becomes $3x$, $10y$ becomes $5y$, and $84$ becomes $42$.\nStep 3: The equivalent equation is $3x + 5y = 42$. Check: multiplying it back by $2$ gives $6x + 10y = 84$, so the two equations describe the same line. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($3x + 5y = 84$): scales the left side only. Since $3x + 5y$ cannot equal both $42$ and $84$, this system has no solution.\n* Choice C ($6x + 10y = 42$): scales the right side only, leaving two parallel lines with no point in common.\n* Choice D ($12x + 20y = 84$): doubles the coefficients but not the constant, which should have become $168$.\n\n**Test Day Takeaway:** Equivalent means every term scales by the same factor. Check the constant last, because that is the term the eye skips.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    // ============================================================
    // Q4-Q16: Medium core (band 4-5)
    // ============================================================
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "An engineer logs the duration, in seconds, of each of the eight tracks on an album as 205, 142, 236, 191, 310, 168, 219, and 177. What is the median of these durations?",
      choices: [
        // distractor: takes the lower of the two middle values, 191, instead of averaging the two middle values
        { id: "A", text: "$191$" },
        { id: "B", text: "$198$" },
        // distractor: computes the mean, 1648 divided by 8, instead of the median
        { id: "C", text: "$206$" },
        // distractor: averages the two middle entries of the unsorted list, 191 and 310, without ordering the values first
        { id: "D", text: "$250.5$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Median Calculation**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Sorted, the eight values put $191$ and $205$ in the middle, and their average is $198$.\n\n**The Full Solution:**\nStep 1: Order the durations: $142, 168, 177, 191, 205, 219, 236, 310$.\nStep 2: With an even count of $8$, the median is the average of the 4th and 5th values, which are $191$ and $205$.\nStep 3: $\\frac{191 + 205}{2} = \\frac{396}{2} = 198$. Check: four values ($142, 168, 177, 191$) fall below $198$ and four ($205, 219, 236, 310$) fall above it. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($191$): stops at the 4th sorted value. With an even count there is no single middle entry, so the two middle values must be averaged.\n* Choice C ($206$): the mean, $\\frac{1648}{8}$. The large outlier $310$ pulls the mean above the median.\n* Choice D ($250.5$): averages the 4th and 5th entries of the list as printed, $191$ and $310$, skipping the sort.\n\n**Test Day Takeaway:** Sort first, always. Then count: an even number of values means average the two in the middle.",
      skills: ["find-median"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A concert hall's reflector panel follows the curve $h(x) = -3(x - 4)^2 + 61$, where $h$ is the height in feet above the stage at a horizontal distance of $x$ feet from the stage's left edge. Which expression is equivalent to $-3(x - 4)^2 + 61$?",
      choices: [
        { id: "A", text: "$-3x^2 + 24x + 13$" },
        // distractor: expands the square correctly but never multiplies the 16 by -3, adding 16 + 61 = 77 instead of -48 + 61 = 13
        { id: "B", text: "$-3x^2 + 24x + 77$" },
        // distractor: loses a sign on the middle term, using -3 times -8x = -24x instead of +24x
        { id: "C", text: "$-3x^2 - 24x + 13$" },
        // distractor: squares term by term, treating (x - 4)^2 as x^2 + 16, which drops the middle term entirely
        { id: "D", text: "$-3x^2 + 13$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** $(x-4)^2 = x^2 - 8x + 16$; multiplying by $-3$ gives $-3x^2 + 24x - 48$, and $-48 + 61 = 13$.\n\n**The Full Solution:**\nStep 1: Expand the square: $(x - 4)^2 = x^2 - 8x + 16$.\nStep 2: Distribute the $-3$ across all three terms: $-3x^2 + 24x - 48$.\nStep 3: Add the outside constant: $-48 + 61 = 13$, so the expression is $-3x^2 + 24x + 13$. Check: at $x = 4$ the original gives $61$, and $-3(16) + 24(4) + 13 = -48 + 96 + 13 = 61$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-3x^2 + 24x + 77$): forgets to multiply the $16$ by $-3$, so the constant comes out as $16 + 61 = 77$ instead of $-48 + 61 = 13$.\n* Choice C ($-3x^2 - 24x + 13$): mishandles the sign on the middle term; $-3$ times $-8x$ is $+24x$, not $-24x$.\n* Choice D ($-3x^2 + 13$): squares term by term as if $(x - 4)^2 = x^2 + 16$, which erases the $-8x$ cross term.\n\n**Test Day Takeaway:** Expand the binomial square fully before distributing, and let the outside multiplier reach all three terms, the constant included.",
      skills: ["distributive-property", "converting-quadratic-forms"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "A survey crew mapped a sea cliff as right triangle $ABC$, with the right angle at $B$, where $AB$ is the distance along the beach and $BC$ is the height of the cliff face. Lengths are in meters. What is the value of $\\cos A$?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 45]], labels: ["A", "B", "C"], sideLabels: ["24", "45", ""], rightAngleVertex: 1, figureNote: true } },
      correctAnswer: "8/17",
      explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**The correct answer is $\\frac{8}{17}$.**\n\n**The Fast Way (~30s):** The legs $24$ and $45$ give hypotenuse $51$, so $\\cos A = \\frac{24}{51} = \\frac{8}{17}$.\n\n**The Full Solution:**\nStep 1: The hypotenuse $AC$ is unknown, so use the Pythagorean theorem: $AC^2 = 24^2 + 45^2 = 576 + 2025 = 2601$, and $AC = 51$.\nStep 2: Cosine is adjacent over hypotenuse. The side adjacent to angle $A$ is $AB = 24$, and the hypotenuse is $AC = 51$.\nStep 3: $\\cos A = \\frac{24}{51} = \\frac{8}{17}$. Check: $\\sin A = \\frac{45}{51} = \\frac{15}{17}$, and $\\left(\\frac{8}{17}\\right)^2 + \\left(\\frac{15}{17}\\right)^2 = \\frac{64 + 225}{289} = 1$. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $\\frac{8}{15}$, which is $\\frac{24}{45}$, the leg adjacent to $A$ over the opposite leg instead of over the hypotenuse.\n* Gridding $\\frac{15}{17}$, which is $\\frac{45}{51}$, the sine of $A$ rather than the cosine.\n* Adding the legs for the hypotenuse, $24 + 45 = 69$, and gridding $\\frac{24}{69} = \\frac{8}{23}$.\n\n**Test Day Takeaway:** When a trig ratio needs the hypotenuse and the figure gives only the legs, run the Pythagorean theorem first, then name adjacent and opposite from the labeled angle.",
      skills: ["soh-cah-toa", "pythagorean-theorem"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A transit agency counted 2,760 bicycles parked at station racks this year, which is 15% more than the count last year. Last year, 35% of the parked bicycles were at downtown stations. How many bicycles were parked at downtown stations last year?",
      choices: [
        // distractor: takes 15% of last year's total instead of 35%, computing 0.15 times 2400 = 360
        { id: "A", text: "$360$" },
        { id: "B", text: "$840$" },
        // distractor: applies the 35% to this year's 2760 instead of last year's total, giving 966
        { id: "C", text: "$966$" },
        // distractor: reverses the percent increase correctly to 2400 but stops there, never taking 35%
        { id: "D", text: "$2{,}400$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $2760 \\div 1.15 = 2400$ bicycles last year, and $0.35(2400) = 840$.\n\n**The Full Solution:**\nStep 1: This year is $15\\%$ more than last year, so this year equals $1.15$ times last year. Let $L$ be last year's count: $1.15L = 2760$.\nStep 2: Divide to reverse the increase: $L = \\frac{2760}{1.15} = 2400$.\nStep 3: Take $35\\%$ of last year's total: $0.35(2400) = 840$. Check: $1.15(2400) = 2760$, matching the reported count. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($360$): uses the $15\\%$ from the first sentence instead of the $35\\%$ the question asks about, giving $0.15(2400)$.\n* Choice C ($966$): applies $35\\%$ to this year's $2{,}760$. The question asks about last year, so the percent belongs to $2{,}400$.\n* Choice D ($2{,}400$): correctly reverses the increase but answers the wrong question; this is the whole of last year's count, not the downtown share.\n\n**Test Day Takeaway:** Reverse a percent increase by dividing by $1 + r$, never by subtracting the percent. Then re-read which year the second percent applies to.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 8,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A harbor's 15 daily tide-range readings have a mean of 2.6 feet and a standard deviation of 0.8 feet. Every reading is rescaled by multiplying it by 5 and then adding 3. What is the mean of the rescaled readings?",
      correctAnswer: "16",
      explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~20s):** The mean follows the same rule each value follows: $5(2.6) + 3 = 16$.\n\n**The Full Solution:**\nStep 1: Multiplying every value by $5$ multiplies the mean by $5$, so the mean becomes $5(2.6) = 13$.\nStep 2: Adding $3$ to every value shifts the mean up by $3$, so the mean becomes $13 + 3 = 16$.\nStep 3: The rescaled mean is $16$. Check: the sum of the original readings is $15(2.6) = 39$; the rescaled sum is $5(39) + 15(3) = 195 + 45 = 240$, and $\\frac{240}{15} = 16$. $\\checkmark$\n\n**Common Mistakes:**\n* Adding before multiplying, giving $(2.6 + 3)(5) = 28$; the readings are multiplied first, so the order matters.\n* Gridding $13$ by applying the multiplier and forgetting the $+3$ shift.\n* Transforming the standard deviation instead of the mean, giving $5(0.8) + 3 = 7$. A shift does not change spread at all.\n\n**Test Day Takeaway:** The mean obeys the exact transformation applied to each value. Spread measures obey only the multiplier, since adding a constant slides the whole data set.",
      skills: ["data-analysis"]
    },
    {
      id: 9,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The floor of a pedestrian underpass has elevation $y = 0.5x^2 - 7x + 20$, in feet relative to the street, at a horizontal distance of $x$ feet from one entrance. What is the distance between the two values of $x$ at which the floor is at street level?",
      choices: [
        // distractor: reports the smaller x-intercept, 4, instead of the distance between the two intercepts
        { id: "A", text: "$4$" },
        { id: "B", text: "$6$" },
        // distractor: reports the larger x-intercept, 10, instead of the distance between the two intercepts
        { id: "C", text: "$10$" },
        // distractor: adds the two intercepts, 4 + 10, instead of subtracting them
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Street level means $y = 0$; doubling gives $x^2 - 14x + 40 = 0$, so $x = 4$ or $x = 10$, a gap of $6$.\n\n**The Full Solution:**\nStep 1: Street level is $y = 0$, so solve $0.5x^2 - 7x + 20 = 0$. Multiply through by $2$ to clear the decimal: $x^2 - 14x + 40 = 0$.\nStep 2: Factor: $(x - 4)(x - 10) = 0$, so the floor meets street level at $x = 4$ and $x = 10$.\nStep 3: The distance between those inputs is $10 - 4 = 6$ feet. Check: $0.5(16) - 7(4) + 20 = 8 - 28 + 20 = 0$ and $0.5(100) - 7(10) + 20 = 50 - 70 + 20 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): the smaller $x$-intercept. It answers where the floor first reaches street level, not how far apart the two crossings are.\n* Choice C ($10$): the larger $x$-intercept, the same misread from the other end.\n* Choice D ($14$): adds the roots instead of subtracting. Note that $14$ is also the sum of the roots, which equals $-\\frac{b}{a}$ after clearing the decimal, a tempting but wrong quantity.\n\n**Test Day Takeaway:** Distance between intercepts is always the larger root minus the smaller one. Solve for both, then subtract; do not stop at one root.",
      skills: ["quadratics"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "For a speaker array, the total length of cable used, in meters, is given by both $4(px + 5) - 3x$ and $17x + 20$ for every number of speakers $x$, where $p$ is a constant. What is the value of $p$?",
      choices: [
        // distractor: subtracts the 3 instead of adding it back, solving 4p = 17 - 3 to get 3.5
        { id: "A", text: "$3.5$" },
        // distractor: ignores the -3x term entirely, solving 4p = 17 to get 4.25
        { id: "B", text: "$4.25$" },
        { id: "C", text: "$5$" },
        // distractor: reaches 4p = 20 but reports 20 without dividing by 4
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Expanding gives $(4p - 3)x + 20$, so $4p - 3 = 17$ and $p = 5$.\n\n**The Full Solution:**\nStep 1: Expand the first expression: $4(px + 5) - 3x = 4px + 20 - 3x$.\nStep 2: Collect the $x$ terms: $(4p - 3)x + 20$. Because the two expressions agree for every $x$, their $x$-coefficients must match and their constants must match. The constants already agree at $20$.\nStep 3: Set $4p - 3 = 17$, so $4p = 20$ and $p = 5$. Check: $4(5x + 5) - 3x = 20x + 20 - 3x = 17x + 20$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.5$): moves the $-3$ the wrong way, solving $4p = 17 - 3 = 14$.\n* Choice B ($4.25$): drops the $-3x$ term before comparing, solving $4p = 17$.\n* Choice D ($20$): correct through $4p = 20$, then reports that value instead of dividing by $4$.\n\n**Test Day Takeaway:** Two expressions equal for every value of the variable means coefficient equals coefficient. Combine all like terms first, or a stray term outside the parentheses gets lost.",
      skills: ["distributive-property"]
    },
    {
      id: 11,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A drainage channel's bed lies $f(x) = x^2 - 18x + 88$ centimeters above a benchmark at the point $x$ meters along the channel. The table gives $f(x)$ at four selected values of $x$. What is the least height, in centimeters, of the bed above the benchmark?",
      questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$2$", "$56$"], ["$5$", "$23$"], ["$8$", "$8$"], ["$11$", "$11$"]] },
      correctAnswer: "7",
      explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~35s):** Half of $-18$ is $-9$, so $f(x) = (x - 9)^2 + 7$ and the minimum is $7$.\n\n**The Full Solution:**\nStep 1: Take half the coefficient of $x$ and square it: $\\left(\\frac{-18}{2}\\right)^2 = (-9)^2 = 81$.\nStep 2: Write $x^2 - 18x + 88 = (x^2 - 18x + 81) + 88 - 81 = (x - 9)^2 + 7$.\nStep 3: Since $(x - 9)^2$ is never negative, the least value of $f$ is $7$, reached at $x = 9$. Check: the table straddles $x = 9$, with $f(8) = 8$ and $f(11) = 11$, both above $7$. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $9$, the value of $x$ where the minimum occurs, rather than the least height itself.\n* Gridding $8$, the least value printed in the table. The table skips $x = 9$, so the true minimum never appears in it.\n* Squaring the whole coefficient instead of half of it, writing $(x - 18)^2$ and getting $88 - 324 = -236$.\n\n**Test Day Takeaway:** Completing the square turns a quadratic into vertex form, where the constant is the minimum (or maximum) value. Halve the middle coefficient before you square it.",
      skills: ["quadratics"]
    },
    {
      id: 12,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The depth of the seafloor below the surface, in meters, along a survey line is modeled by $d(x) = a(x - 6)^2 + 11$, where $x$ is the distance in kilometers from shore and $a$ is a constant. The model gives a depth of 2 meters at $x = 0$. What is the depth, in meters, at $x = 2$?",
      choices: [
        // distractor: evaluates with (x + 6)^2 = 64 instead of (x - 6)^2 = 16, giving -0.25 times 64 plus 11 = -5
        { id: "A", text: "$-5$" },
        { id: "B", text: "$7$" },
        // distractor: multiplies a by (x - 6) = -4 without squaring, giving -0.25 times -4 plus 11 = 12
        { id: "C", text: "$12$" },
        // distractor: solves 36a = -9 as a = 0.25, dropping the negative sign, giving 0.25 times 16 plus 11 = 15
        { id: "D", text: "$15$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $36a + 11 = 2$ gives $a = -0.25$, and $-0.25(2 - 6)^2 + 11 = -4 + 11 = 7$.\n\n**The Full Solution:**\nStep 1: Use the given point. At $x = 0$, $d(0) = a(0 - 6)^2 + 11 = 36a + 11$, and that equals $2$.\nStep 2: Solve $36a + 11 = 2$, so $36a = -9$ and $a = -\\frac{1}{4} = -0.25$. The model is $d(x) = -0.25(x - 6)^2 + 11$.\nStep 3: Evaluate at $x = 2$: $(2 - 6)^2 = 16$, so $d(2) = -0.25(16) + 11 = -4 + 11 = 7$ meters. Check: $d(0) = -0.25(36) + 11 = -9 + 11 = 2$, matching the given condition. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): uses $(2 + 6)^2 = 64$ instead of $(2 - 6)^2 = 16$, flipping the sign inside the parentheses.\n* Choice C ($12$): multiplies $a$ by $-4$ without squaring, so the squared factor never gets applied.\n* Choice D ($15$): reads $36a = -9$ as $a = 0.25$, losing the negative sign that makes the basin deepen toward $x = 6$.\n\n**Test Day Takeaway:** Vertex form hands you the vertex; one extra point pins down $a$. Solve for $a$ first, then substitute, and keep the sign inside the parentheses intact.",
      skills: ["vertex-form", "function-evaluation"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A pressing plant produced 450 records, each either a 7-inch or a 12-inch disc. A 7-inch disc uses 90 grams of vinyl and a 12-inch disc uses 180 grams, and the plant used 63,000 grams in all. How many 12-inch discs were produced?",
      choices: [
        // distractor: solves the system correctly but reports the number of 7-inch discs, 200, instead of the 12-inch discs
        { id: "A", text: "$200$" },
        // distractor: splits the 450 discs evenly, 450 divided by 2, ignoring the vinyl totals entirely
        { id: "B", text: "$225$" },
        { id: "C", text: "$250$" },
        // distractor: divides all 63,000 grams by 180, as if every disc were a 12-inch disc
        { id: "D", text: "$350$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** If all $450$ were 7-inch, the vinyl would be $40{,}500$ g. Each swap to 12-inch adds $90$ g, and $\\frac{63{,}000 - 40{,}500}{90} = 250$.\n\n**The Full Solution:**\nStep 1: Let $s$ be the number of 7-inch discs and $t$ the number of 12-inch discs. Then $s + t = 450$ and $90s + 180t = 63{,}000$.\nStep 2: Multiply the first equation by $90$ to line up the $s$ terms: $90s + 90t = 40{,}500$. Subtract it from the second equation: $90t = 22{,}500$.\nStep 3: $t = \\frac{22{,}500}{90} = 250$ twelve-inch discs. Check: $s = 450 - 250 = 200$, and $90(200) + 180(250) = 18{,}000 + 45{,}000 = 63{,}000$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($200$): the number of 7-inch discs. The elimination is right, but the wrong variable gets reported.\n* Choice B ($225$): assumes an even split of the $450$ discs, which ignores the vinyl equation.\n* Choice D ($350$): computes $\\frac{63{,}000}{180}$, treating every disc as a 12-inch disc, which contradicts the count of $450$.\n\n**Test Day Takeaway:** Scale one equation so a variable's coefficients match, subtract, then circle back to which quantity the question actually names.",
      skills: ["elimination-method", "setting-up-systems"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A quarry map shows a mineral seam with slope $\\frac{2}{5}$ passing through the point $(0, 3)$, and a haul road along the graph of $8x - ky = 12$ for some constant $k$. The road and the seam have no point in common. What is the value of $k$?",
      choices: [
        // distractor: multiplies instead of dividing, computing 8 times 2/5 = 3.2
        { id: "A", text: "$3.2$" },
        // distractor: copies the denominator of the slope 2/5 as k, without using the coefficient 8
        { id: "B", text: "$5$" },
        { id: "C", text: "$20$" },
        // distractor: reaches 2k = 40 and reports 40 without dividing by 2
        { id: "D", text: "$40$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** No point in common means equal slopes: $\\frac{8}{k} = \\frac{2}{5}$, so $2k = 40$ and $k = 20$.\n\n**The Full Solution:**\nStep 1: The seam is the line $y = \\frac{2}{5}x + 3$. Put the road's equation in the same form: from $8x - ky = 12$, $ky = 8x - 12$, so $y = \\frac{8}{k}x - \\frac{12}{k}$.\nStep 2: Two lines have no point in common when their slopes are equal and their $y$-intercepts differ. Set $\\frac{8}{k} = \\frac{2}{5}$ and cross multiply: $2k = 40$, so $k = 20$.\nStep 3: Confirm the intercepts differ: with $k = 20$ the second line is $y = \\frac{2}{5}x - 0.6$, and $-0.6 \\ne 3$, so the lines are parallel and distinct. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.2$): computes $8 \\cdot \\frac{2}{5}$. The slope is $\\frac{8}{k}$, so $k$ sits in the denominator and the proportion must be solved, not evaluated.\n* Choice B ($5$): borrows the $5$ from the slope $\\frac{2}{5}$, which would make the second slope $\\frac{8}{5}$, not $\\frac{2}{5}$.\n* Choice D ($40$): stops at $2k = 40$ without the final division by $2$.\n\n**Test Day Takeaway:** No solution means same slope, different intercept. Solve the second equation for $y$ so the slope is visible before matching.",
      skills: ["system-solution-types"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A city ordinance sets a circular quiet zone centered 5 kilometers east and 7 kilometers south of a transit hub, reaching 4 kilometers from that center in every direction. With the hub at the origin and east and north positive, which equation describes the boundary of the zone?",
      choices: [
        { id: "A", text: "$(x - 5)^2 + (y + 7)^2 = 16$" },
        // distractor: puts the radius 4 on the right side instead of the radius squared, 16
        { id: "B", text: "$(x - 5)^2 + (y + 7)^2 = 4$" },
        // distractor: squares the diameter 8 instead of the radius 4, giving 64
        { id: "C", text: "$(x - 5)^2 + (y + 7)^2 = 64$" },
        // distractor: flips both center signs, placing the center at (-5, 7) instead of (5, -7)
        { id: "D", text: "$(x + 5)^2 + (y - 7)^2 = 16$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Center $(5, -7)$ and radius $4$ give $(x - 5)^2 + (y + 7)^2 = 4^2 = 16$.\n\n**The Full Solution:**\nStep 1: Translate the description into coordinates. East is positive $x$, so the center is $5$ km east; south is negative $y$, so the center is at $(5, -7)$. The zone reaches $4$ km in every direction, so $r = 4$.\nStep 2: Standard form is $(x - h)^2 + (y - k)^2 = r^2$. With $h = 5$ and $k = -7$, the binomials are $(x - 5)$ and $(y - (-7)) = (y + 7)$.\nStep 3: The right side is $r^2 = 4^2 = 16$, giving $(x - 5)^2 + (y + 7)^2 = 16$. Check: the point $(9, -7)$, exactly $4$ km east of the center, satisfies $16 + 0 = 16$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($= 4$): writes the radius on the right side. Standard form stores $r^2$, so this circle would have radius $2$.\n* Choice C ($= 64$): squares the diameter $8$ instead of the radius, describing a zone twice as wide.\n* Choice D (center $(-5, 7)$): flips both signs. Inside the binomials the sign is opposite the coordinate, so a center at $(5, -7)$ produces $(x - 5)$ and $(y + 7)$.\n\n**Test Day Takeaway:** In $(x - h)^2 + (y - k)^2 = r^2$, the signs inside flip and the right side is squared. Test one obvious boundary point before committing.",
      skills: ["circle-equation"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A track's weekly stream count, in thousands, grows by a constant factor from one week to the next. The table gives the count for weeks 0 through 3 after release. What count, in thousands, does the model give for week 4?",
      questionTable: { headers: ["Week", "Streams (thousands)"], rows: [["$0$", "$16$"], ["$1$", "$24$"], ["$2$", "$36$"], ["$3$", "$54$"]] },
      correctAnswer: "81",
      explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**The correct answer is $81$.**\n\n**The Fast Way (~25s):** Each week multiplies by $1.5$, so week 4 is $54(1.5) = 81$.\n\n**The Full Solution:**\nStep 1: Find the constant factor from consecutive entries: $\\frac{24}{16} = 1.5$.\nStep 2: Confirm the factor holds across the table: $\\frac{36}{24} = 1.5$ and $\\frac{54}{36} = 1.5$, so the model is $S(t) = 16(1.5)^t$.\nStep 3: Week 4 gives $S(4) = 54(1.5) = 81$ thousand streams. Check: $16(1.5)^4 = 16(5.0625) = 81$. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $72$ by adding the last difference, $54 + 18$, which treats constant growth as linear.\n* Gridding $62$ by adding the first difference, $54 + 8$, the same linear error with the earliest gap.\n* Gridding $121.5$ by multiplying by the factor twice, $54(1.5)^2$, which lands on week 5 instead of week 4.\n\n**Test Day Takeaway:** Divide consecutive values to test for a constant factor. A constant ratio means multiply forward; a constant difference would mean add.",
      skills: ["exponential-growth-decay"]
    },
    // ============================================================
    // Q17-Q22: Hard ceiling for Easy variant (band 6-7, NO band 8)
    // ============================================================
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "Seismic stations $A$ and $B$ sit at $(-6, 3)$ and $(2a, a + 4)$ on a map grid marked in kilometers, where $a$ is a constant. A recording buoy is placed at the midpoint of the segment joining the two stations, and its $x$-coordinate is 5. What is the $y$-coordinate of the buoy?",
      choices: [
        // distractor: averages the constant a = 8 with the y-coordinate 3, giving 5.5, instead of averaging the two y-coordinates
        { id: "A", text: "$5.5$" },
        // distractor: drops the division by 2 in the x-equation, solving -6 + 2a = 5 to get a = 5.5, so station B has y-coordinate 9.5 and the midpoint y becomes 6.25
        { id: "B", text: "$6.25$" },
        { id: "C", text: "$7.5$" },
        // distractor: reports station B's y-coordinate, 12, instead of the midpoint's
        { id: "D", text: "$12$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** $\\frac{-6 + 2a}{2} = 5$ gives $a = 8$, so $B = (16, 12)$ and the midpoint's $y$ is $\\frac{3 + 12}{2} = 7.5$.\n\n**The Full Solution:**\nStep 1: The midpoint's $x$-coordinate is the average of the two $x$-coordinates: $\\frac{-6 + 2a}{2} = 5$.\nStep 2: Multiply both sides by $2$: $-6 + 2a = 10$, so $2a = 16$ and $a = 8$. Station $B$ is therefore at $(2(8), 8 + 4) = (16, 12)$.\nStep 3: The midpoint's $y$-coordinate is $\\frac{3 + 12}{2} = \\frac{15}{2} = 7.5$. Check: the midpoint is $(5, 7.5)$, and $\\frac{-6 + 16}{2} = 5$ confirms the $x$-coordinate. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5.5$): averages $a = 8$ with $3$. The constant $a$ is not a coordinate; station $B$'s $y$-coordinate is $a + 4 = 12$.\n* Choice B ($6.25$): solves $-6 + 2a = 5$, skipping the multiplication by $2$, which gives $a = 5.5$ and a midpoint $y$ of $\\frac{3 + 9.5}{2}$.\n* Choice D ($12$): station $B$'s own $y$-coordinate. The question asks for the buoy at the midpoint, not the endpoint.\n\n**Test Day Takeaway:** With a parameter in one endpoint, use the coordinate you are given to solve for it first, then rebuild the full point before averaging the other coordinate.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "A triangular field tapers to a single corner at its north end. A hedgerow crosses the field parallel to the 63-meter south boundary and measures 36 meters. The north corner is 24 meters from the hedgerow along the west boundary. How many meters of the west boundary lie between the hedgerow and the south boundary?",
      correctAnswer: "18",
      explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is $18$.**\n\n**The Fast Way (~45s):** $\\frac{36}{63} = \\frac{4}{7}$, so the $24$-meter piece is $\\frac{4}{7}$ of the whole west boundary; the whole is $42$ and the remaining piece is $18$.\n\n**The Full Solution:**\nStep 1: The hedgerow is parallel to the south boundary, so it cuts off a small triangle at the north corner that is similar to the whole field. The hedgerow corresponds to the south boundary, and the $24$-meter piece of the west boundary corresponds to the entire west boundary.\nStep 2: Set up the proportion with the whole west boundary as $w$: $\\frac{24}{w} = \\frac{36}{63} = \\frac{4}{7}$, so $4w = 168$ and $w = 42$ meters.\nStep 3: The stretch below the hedgerow is the whole minus the top piece: $42 - 24 = 18$ meters. Check: $\\frac{24}{42} = \\frac{4}{7}$, matching $\\frac{36}{63}$. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $42$, the full length of the west boundary. That is what the proportion returns, but the question asks only for the stretch below the hedgerow.\n* Gridding $27$ from $63 - 36$, the difference of the two parallel lengths. That difference is not a piece of the west boundary.\n* Gridding $39$ from $63 - 24$, subtracting two lengths that are not corresponding parts of the two similar triangles.\n\n**Test Day Takeaway:** A cut parallel to one side creates similar triangles, but the sides that correspond are the whole sides, not the pieces. Solve for the whole first, then subtract to get the part.",
      skills: ["similar-triangles"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "Along a straight utility corridor, a shutoff valve is set at mile marker $x$ and a pump station stands at mile marker $9$. The maintenance log records the valve's distance from the pump station as $2x - 6$ miles. What is the value of $x$?",
      choices: [
        // distractor: solves x - 9 = 2x - 6 and keeps x = -3 without checking it; there the left side is 12 but the right side is -12
        { id: "A", text: "$-3$" },
        // distractor: negates only the 2x when writing the second case, solving 9 - x = 2x + 6 to get x = 1
        { id: "B", text: "$1$" },
        // distractor: drops the -6 from the right side, solving 9 - x = 2x to get x = 3
        { id: "C", text: "$3$" },
        { id: "D", text: "$5$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** $|x - 9| = 2x - 6$ has cases $x = -3$ and $x = 5$; only $x = 5$ keeps the recorded distance positive.\n\n**The Full Solution:**\nStep 1: Distance along a line is the absolute value of the difference in positions, so the log's reading gives $|x - 9| = 2x - 6$.\nStep 2: Split into two cases. Case 1: $x - 9 = 2x - 6$, which gives $x = -3$. Case 2: $-(x - 9) = 2x - 6$, that is $9 - x = 2x - 6$, so $15 = 3x$ and $x = 5$.\nStep 3: Test both candidates, because a distance is never negative. At $x = -3$ the left side is $|-3 - 9| = 12$ while the right side is $2(-3) - 6 = -12$, so that root is extraneous. At $x = 5$, $|5 - 9| = 4$ and $2(5) - 6 = 4$, so $x = 5$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): the case-1 root, kept without checking. It would make the recorded distance $-12$ miles.\n* Choice B ($1$): comes from $9 - x = 2x + 6$, negating only the $2x$ when the whole right side was never the thing being negated.\n* Choice C ($3$): comes from $9 - x = 2x$, dropping the $-6$ on the right.\n\n**Test Day Takeaway:** A distance between two positions is an absolute value. Split it into two cases, then substitute both roots back, because a variable on the other side makes one root extraneous.",
      skills: ["combining-like-terms"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A parking structure's concrete pillar is a right circular cylinder of height 3 meters and base radius 0.6 meter. Running along its axis for the full height is a cylindrical duct of radius 0.2 meter. How many cubic meters of concrete does the pillar contain?",
      choices: [
        // distractor: computes the volume of the duct alone, pi times 0.2 squared times 3
        { id: "A", text: "$0.12\\pi$" },
        // distractor: subtracts the radii before squaring, using (0.6 - 0.2) squared times 3 = 0.48 pi
        { id: "B", text: "$0.48\\pi$" },
        { id: "C", text: "$0.96\\pi$" },
        // distractor: ignores the duct and reports the volume of the solid cylinder, pi times 0.6 squared times 3
        { id: "D", text: "$1.08\\pi$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Concrete equals the outer cylinder minus the duct: $\\pi(0.6^2 - 0.2^2)(3) = \\pi(0.32)(3) = 0.96\\pi$.\n\n**The Full Solution:**\nStep 1: The full pillar is a cylinder of radius $0.6$ and height $3$, so its volume is $\\pi(0.6)^2(3) = 1.08\\pi$ cubic meters.\nStep 2: The duct is a cylinder of radius $0.2$ running the same height, with volume $\\pi(0.2)^2(3) = 0.12\\pi$ cubic meters.\nStep 3: Concrete fills the difference: $1.08\\pi - 0.12\\pi = 0.96\\pi$ cubic meters. Check: factoring gives $3\\pi(0.36 - 0.04) = 3\\pi(0.32) = 0.96\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.12\\pi$): the duct's volume, the hole rather than the concrete around it.\n* Choice B ($0.48\\pi$): subtracts the radii first and squares afterward, using $(0.6 - 0.2)^2 = 0.16$. Squaring must happen before the subtraction, since $0.36 - 0.04 = 0.32$, not $0.16$.\n* Choice D ($1.08\\pi$): the solid cylinder, with the duct never removed.\n\n**Test Day Takeaway:** For a pipe or a drilled column, subtract volumes, not radii. Square each radius first, then take the difference.",
      skills: ["volume-prism"]
    },
    {
      id: 21,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "A stage monitor's measured sound level, in decibels above a reference, at a distance of $x$ meters from the monitor is given by the linear function $f$. The table gives $f(x)$ at four selected distances. For what value of $a$ is $f(2a) = 3$?",
      questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$2$", "$43$"], ["$5$", "$31$"], ["$8$", "$19$"], ["$11$", "$7$"]] },
      correctAnswer: "6",
      explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~45s):** The table drops $12$ over every $3$ meters, so $f(x) = 51 - 4x$; $f(12) = 3$ means $2a = 12$ and $a = 6$.\n\n**The Full Solution:**\nStep 1: Find the rate. From $x = 2$ to $x = 5$, $f$ falls from $43$ to $31$, a change of $-12$ over $3$ meters, so the slope is $-4$ per meter.\nStep 2: Build the rule using the point $(2, 43)$: $f(x) = 43 - 4(x - 2) = 51 - 4x$. Setting $f(x) = 3$ gives $51 - 4x = 3$, so $4x = 48$ and $x = 12$.\nStep 3: The question sets the input to $2a$, so $2a = 12$ and $a = 6$. Check: $f(2 \\cdot 6) = f(12) = 51 - 48 = 3$. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $12$, the input that makes $f$ equal $3$. That value is $2a$, so it still has to be halved.\n* Reading the slope as $-12$, the drop between table rows, instead of $-4$ per meter; that gives $67 - 12x = 3$ and a non-integer input.\n* Doubling instead of halving at the last step, gridding $24$.\n\n**Test Day Takeaway:** Solve for the whole input first, then unwrap it. When the argument is $2a$ rather than $a$, the final step is one more division.",
      skills: ["function-notation"]
    },
    {
      id: 22,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "In a list of three positive numbers, the second number is $\\frac{9}{4}$ times the first and the third number is $\\frac{11}{9}$ times the second. The three numbers have a sum of $480$. By how much does the third number exceed the first?",
      choices: [
        // distractor: reports the common part 480 divided by 24 = 20 instead of the difference it produces
        { id: "A", text: "$20$" },
        // distractor: reports the first number, 80, rather than the gap between the third and the first
        { id: "B", text: "$80$" },
        // distractor: computes the gap between the second and the first, 180 - 80, instead of the third and the first
        { id: "C", text: "$100$" },
        { id: "D", text: "$140$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** The three numbers are in the ratio $4 : 9 : 11$, so $24$ parts equal $480$, one part is $20$, and the gap is $(11 - 4)(20) = 140$.\n\n**The Full Solution:**\nStep 1: Write the numbers in parts. Let the first be $4u$. The second is $\\frac{9}{4}(4u) = 9u$, and the third is $\\frac{11}{9}(9u) = 11u$, so the ratio is $4 : 9 : 11$.\nStep 2: The parts sum to $4u + 9u + 11u = 24u$, and that equals $480$, so $u = 20$. The numbers are $80$, $180$, and $220$.\nStep 3: The third exceeds the first by $220 - 80 = 140$. Check: $80 + 180 + 220 = 480$, and $\\frac{180}{80} = \\frac{9}{4}$, $\\frac{220}{180} = \\frac{11}{9}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): the value of one part. It has to be multiplied by the $7$-part gap between $11u$ and $4u$.\n* Choice B ($80$): the first number itself, not a difference.\n* Choice C ($100$): the gap between the second and the first, $180 - 80$. The question compares the third with the first.\n\n**Test Day Takeaway:** Chain two ratios by rewriting both against a shared quantity, then let one variable carry all three parts so the sum becomes a single equation.",
      skills: ["word-problem-to-equation"]
    }
  ]
};

export default practiceTest2M2Easy;
