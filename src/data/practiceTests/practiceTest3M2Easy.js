// Practice Test 3 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Official-calibration recreation (2026-08-31): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Diagram items: Q15 rightTriangle, Q19 dataTable, Q21 scatterplot, Q22 twoWayTable.

export const practiceTest3M2Easy = {
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
      question: "The table gives the output voltage $f(x)$, in millivolts, of a pressure sensor at several input pressures $x$, in kilopascals, where $f$ is a linear function. At what input pressure is the output voltage $280$ millivolts?",
      diagram: { type: "dataTable", params: { headers: ["Input pressure x (kilopascals)", "Output voltage f(x) (millivolts)"], rows: [["5", "72"], ["10", "112"], ["15", "152"], ["20", "192"]] } },
      choices: [
        // distractor: divides 280 by 8 first and subtracts 32 afterward: 35 - 32 = 3
        { id: "A", text: "$3$" },
        { id: "B", text: "$31$" },
        // distractor: ignores the 32-millivolt offset and computes 280/8 = 35
        { id: "C", text: "$35$" },
        // distractor: adds 32 instead of subtracting it: 312/8 = 39
        { id: "D", text: "$39$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The voltage climbs $40$ millivolts for every $5$ kilopascals, so the rate is $8$ millivolts per kilopascal, and $f(5) = 72$ forces an offset of $32$. Then $280 = 8x + 32$ gives $x = 31$.\n\n**The Full Solution:**\nStep 1: Find the rate of change from any two rows. From $x = 5$ to $x = 10$ the output rises from $72$ to $112$, so the rate is $\\frac{112 - 72}{10 - 5} = 8$ millivolts per kilopascal.\nStep 2: Find the offset. Substituting into $f(x) = 8x + b$ with $x = 5$ and $f(5) = 72$ gives $72 = 40 + b$, so $b = 32$ and $f(x) = 8x + 32$.\nStep 3: Set the output equal to $280$ and solve for the input. $8x + 32 = 280$, so $8x = 248$ and $x = 31$. Check: $8(31) + 32 = 248 + 32 = 280$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): divides before subtracting. $280 \\div 8 = 35$ and then $35 - 32 = 3$ undoes the two operations in the wrong order.\n* Choice C ($35$): ignores the $32$-millivolt offset entirely and reports $280 \\div 8 = 35$, the input that would be right only if the sensor read $0$ at $0$ kilopascals.\n* Choice D ($39$): adds the offset instead of removing it, giving $\\frac{280 + 32}{8} = 39$.\n\n**Test Day Takeaway:** When a table defines a linear function, build the rule $f(x) = mx + b$ before you answer anything. Solving $f(a) = c$ then means undoing the operations in reverse order: subtract the offset first, divide by the rate second.",
      skills: ["function-notation"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "Circle A is defined in the xy-plane by $(x + 9)^2 + (y - 12)^2 = 196$. Circle B is obtained by shifting circle A right $5$ units and down $3$ units. If circle B is defined by $(x - h)^2 + (y - k)^2 = 196$, what is the value of $h + k$?",
      correctAnswer: "5",
      explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~20s):** Standard form reads the center off directly: circle A is centered at $(-9, 12)$. Shifting right $5$ and down $3$ puts circle B at $(-4, 9)$, so $h + k = -4 + 9 = 5$.\n\n**The Full Solution:**\nStep 1: Read the center of circle A. In $(x - h)^2 + (y - k)^2 = r^2$ the center is $(h, k)$, and $(x + 9)^2$ is $(x - (-9))^2$, so circle A is centered at $(-9, 12)$.\nStep 2: Apply the shift. Moving right $5$ units adds $5$ to the x-coordinate and moving down $3$ units subtracts $3$ from the y-coordinate, so circle B is centered at $(-9 + 5, 12 - 3) = (-4, 9)$.\nStep 3: Match the requested form. Circle B is $(x + 4)^2 + (y - 9)^2 = 196$, which is $(x - (-4))^2 + (y - 9)^2 = 196$, so $h = -4$, $k = 9$, and $h + k = 5$. Check: the radius is unchanged, so the right side stays $196$ ✓\n\n**Common Mistakes:**\n* $13$: reads $(x + 4)^2$ as $h = 4$ instead of $h = -4$. The form subtracts $h$, so a plus sign inside the parentheses means a negative coordinate.\n* $1$: shifts the center left and up instead of right and down, landing on $(-14, 15)$ and giving $-14 + 15 = 1$.\n* $3$: never applies the shift and adds the coordinates of circle A's center, $-9 + 12 = 3$.\n\n**Test Day Takeaway:** In $(x - h)^2 + (y - k)^2 = r^2$ the signs inside the parentheses are already flipped. Translate the center first, then rewrite the equation in the requested form and read the constants off the finished equation, not the description.",
      skills: ["circle-equation"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A monthly transit pass costs $\\$46$, and each ride taken beyond the first $40$ rides costs an additional $\\$1.75$. Which equation gives the number of rides $r$ taken in a month when the total cost was $\\$81$, where $r > 40$?",
      choices: [
        // distractor: charges $1.75 for every ride instead of only the rides past the first 40
        { id: "A", text: "$46 + 1.75r = 81$" },
        { id: "B", text: "$46 + 1.75(r - 40) = 81$" },
        // distractor: swaps the roles of the fixed pass price and the per-ride charge
        { id: "C", text: "$46(r - 40) + 1.75 = 81$" },
        // distractor: subtracts the pass price instead of adding it
        { id: "D", text: "$1.75r - 46 = 81$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The total is the flat $\\$46$ plus $\\$1.75$ for each ride past $40$, and the number of such rides is $r - 40$. That is $46 + 1.75(r - 40) = 81$.\n\n**The Full Solution:**\nStep 1: Name the charged rides. Only rides beyond the first $40$ cost extra, so the number of charged rides is $r - 40$, not $r$.\nStep 2: Build the total. The charge for those rides is $1.75(r - 40)$ dollars, and the pass adds a flat $46$ dollars, so the total cost is $46 + 1.75(r - 40)$.\nStep 3: Set the total equal to the given cost. $46 + 1.75(r - 40) = 81$. Check by solving: $1.75(r - 40) = 35$, so $r - 40 = 20$ and $r = 60$, which does satisfy $r > 40$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($46 + 1.75r = 81$): charges $\\$1.75$ for all $r$ rides, ignoring that the first $40$ are already covered by the pass. It would give $r = 20$, contradicting $r > 40$.\n* Choice C ($46(r - 40) + 1.75 = 81$): swaps the two prices, multiplying the flat pass price by the number of extra rides and adding the per-ride charge once.\n* Choice D ($1.75r - 46 = 81$): subtracts the pass price rather than adding it, which would describe a refund instead of a purchase.\n\n**Test Day Takeaway:** When a price applies only past a threshold, the multiplier is the amount over that threshold, written as a subtraction inside the parentheses. Translate the sentence piece by piece and check the answer against any stated restriction such as $r > 40$.",
      skills: ["combining-like-terms"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A hydrogel sample soaked for $8$ hours had a measured mass of $53$ grams. Using the line of best fit $y = 3.5x + 18$ drawn with the plotted data, by how many grams does that measured mass exceed the mass the line predicts at $8$ hours?",
      diagram: { type: "scatterplot", params: { points: [[1, 20], [2, 27], [4, 30], [5, 38], [6, 36], [8, 53], [10, 50], [11, 59], [13, 61], [14, 70], [16, 72]], xMin: 0, xMax: 16, yMin: 0, yMax: 80, xGridStep: 2, yGridStep: 10, xLabelStep: 4, yLabelStep: 20, xLabel: "Soaking time (hours)", yLabel: "Mass (grams)", bestFitLine: { slope: 3.5, intercept: 18 }, highlightPoint: [8, 53], highlightLabel: "(8, 53)", showResidual: true } },
      choices: [
        { id: "A", text: "$7$" },
        // distractor: drops the intercept, predicting 3.5(8) = 28 and reporting 53 - 28
        { id: "B", text: "$25$" },
        // distractor: reports the predicted mass instead of the difference
        { id: "C", text: "$46$" },
        // distractor: reports the measured mass instead of the difference
        { id: "D", text: "$53$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Predict, then subtract. At $x = 8$ the line gives $3.5(8) + 18 = 46$ grams, and $53 - 46 = 7$ grams.\n\n**The Full Solution:**\nStep 1: Evaluate the line of best fit at the stated time. Substituting $x = 8$ into $y = 3.5x + 18$ gives $y = 28 + 18 = 46$ grams.\nStep 2: Identify the measured value. The plotted point at $8$ hours sits at $(8, 53)$, so the measured mass is $53$ grams.\nStep 3: Subtract in the order the question asks. The measured mass exceeds the predicted mass by $53 - 46 = 7$ grams. Check: adding $7$ back to the prediction returns $46 + 7 = 53$, the measured value ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($25$): uses $3.5(8) = 28$ as the prediction and computes $53 - 28 = 25$, dropping the $18$-gram intercept.\n* Choice C ($46$): stops at the predicted mass. That is the middle of the calculation, not the gap the question asks for.\n* Choice D ($53$): reports the measured mass straight off the plot without comparing it to the line.\n\n**Test Day Takeaway:** The vertical gap between a plotted point and the line of best fit is measured value minus predicted value. Always run the x-value through the whole equation, intercept included, before subtracting.",
      skills: ["scatterplots", "linear-functions"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A machinist plots two cutting paths in the xy-plane. One path follows $y = \\frac{2}{5}x - 4$ and the other follows $8x + ky = 9$, where $k$ is a constant, and the two paths never cross. For what value of $k$ is this the case?",
      choices: [
        { id: "A", text: "$-20$" },
        // distractor: inverts the slope, solving -k/8 = 2/5 to get -16/5
        { id: "B", text: "$-3.2$" },
        // distractor: inverts the slope and drops the sign, solving k/8 = 2/5
        { id: "C", text: "$3.2$" },
        // distractor: loses the negative created by moving 8x across, solving 8/k = 2/5
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Paths that never cross are parallel, so the slopes match. Solving $8x + ky = 9$ for $y$ gives slope $-\\frac{8}{k}$, and setting $-\\frac{8}{k} = \\frac{2}{5}$ gives $k = -20$.\n\n**The Full Solution:**\nStep 1: Translate the condition. Two lines in a plane fail to intersect exactly when they are parallel and distinct, which means equal slopes and different y-intercepts.\nStep 2: Put the second equation in slope-intercept form. From $8x + ky = 9$, $ky = -8x + 9$, so $y = -\\frac{8}{k}x + \\frac{9}{k}$ and the slope is $-\\frac{8}{k}$.\nStep 3: Match the slopes and solve. $-\\frac{8}{k} = \\frac{2}{5}$ gives $2k = -40$, so $k = -20$. Check: with $k = -20$ the second path is $y = \\frac{2}{5}x - \\frac{9}{20}$, the same slope as $\\frac{2}{5}$ but a different y-intercept, so the paths are parallel and distinct ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-3.2$): inverts the fraction, solving $-\\frac{k}{8} = \\frac{2}{5}$ to get $-\\frac{16}{5} = -3.2$. The unknown belongs in the denominator of the slope.\n* Choice C ($3.2$): makes the same inversion and also drops the negative sign, solving $\\frac{k}{8} = \\frac{2}{5}$.\n* Choice D ($20$): forgets that moving $8x$ to the other side makes the slope negative, solving $\\frac{8}{k} = \\frac{2}{5}$. With $k = 20$ the second path has slope $-\\frac{2}{5}$ and the paths do cross.\n\n**Test Day Takeaway:** No solution means parallel and distinct. Solve the messy equation for $y$ so the slope is visible, and keep the sign that appears when the x-term crosses the equals sign.",
      skills: ["system-solution-types"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "The table gives the target diameter $d$ and the tolerance $t$, both in millimeters, for three machined shafts. A measured diameter $m$ is at the tolerance limit when $|m - d| = t$. What is the greatest measured diameter, in millimeters, at the tolerance limit for shaft R?",
      diagram: { type: "dataTable", params: { headers: ["Shaft", "Target diameter d (mm)", "Tolerance t (mm)"], rows: [["P", "18.00", "0.25"], ["Q", "24.60", "0.40"], ["R", "31.50", "0.75"]] } },
      correctAnswer: "32.25",
      explanation: "**SAT Pattern: Absolute Value Equation**\n\n**The correct answer is $32.25$.**\n\n**The Fast Way (~20s):** An absolute value equation has two solutions, one on each side of the target. The greater one is $31.50 + 0.75 = 32.25$ millimeters.\n\n**The Full Solution:**\nStep 1: Pull shaft R's numbers from the table. Its target diameter is $d = 31.50$ millimeters and its tolerance is $t = 0.75$ millimeter, so the equation is $|m - 31.50| = 0.75$.\nStep 2: Split the absolute value into its two cases. Either $m - 31.50 = 0.75$ or $m - 31.50 = -0.75$.\nStep 3: Solve both and take the greater. The two limits are $m = 32.25$ and $m = 30.75$, so the greatest is $32.25$. Check: $|32.25 - 31.50| = 0.75$ ✓\n\n**Common Mistakes:**\n* $30.75$: solves only the negative case and reports the lower limit. The question asks for the greatest of the two solutions.\n* $31.50$: reports the target diameter itself, which satisfies $|m - d| = 0$, not $|m - d| = 0.75$.\n* $33.00$: adds the tolerance to both sides of the target, using $2t = 1.50$ instead of $t = 0.75$.\n\n**Test Day Takeaway:** $|A| = b$ with $b > 0$ always splits into $A = b$ and $A = -b$. Write both cases down before deciding which one the question wants, and read the row of the table the question actually names.",
      skills: ["combining-like-terms"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Of the $640$ soil samples tested at a lab, $44$ exceeded the moisture threshold, $36$ exceeded the density threshold, and $16$ exceeded both thresholds. What is the probability that a randomly selected sample from this group exceeded at least one threshold?",
      choices: [
        // distractor: counts only the 16 samples that exceeded both thresholds
        { id: "A", text: "$\\frac{1}{40}$" },
        // distractor: removes the 16 overlap samples twice, using 44 + 36 - 32 = 48
        { id: "B", text: "$\\frac{3}{40}$" },
        { id: "C", text: "$\\frac{1}{10}$" },
        // distractor: adds 44 and 36 without removing the 16 counted in both groups
        { id: "D", text: "$\\frac{1}{8}$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Basic Probability**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The $16$ double-counted samples come out once: $44 + 36 - 16 = 64$ samples exceeded at least one threshold, and $\\frac{64}{640} = \\frac{1}{10}$.\n\n**The Full Solution:**\nStep 1: Count the favorable samples. A sample counted in the $44$ and a sample counted in the $36$ can be the same sample, and $16$ samples are in both counts, so adding $44$ and $36$ counts those $16$ twice.\nStep 2: Remove the double count once. The number exceeding at least one threshold is $44 + 36 - 16 = 64$.\nStep 3: Divide by the total. The probability is $\\frac{64}{640} = \\frac{1}{10}$. Check: $28$ samples exceeded moisture only, $20$ exceeded density only, and $16$ exceeded both, and $28 + 20 + 16 = 64$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{1}{40}$): uses only the $16$ samples over both thresholds, giving $\\frac{16}{640}$. That is the probability of exceeding both, not at least one.\n* Choice B ($\\frac{3}{40}$): subtracts the overlap from each group, using $44 + 36 - 32 = 48$ and giving $\\frac{48}{640}$. The overlap is removed once, not twice.\n* Choice D ($\\frac{1}{8}$): adds the two counts as if no sample were in both, giving $\\frac{80}{640}$.\n\n**Test Day Takeaway:** Whenever two groups can share members, the count of \"at least one\" is first group plus second group minus the overlap. Subtract the shared count exactly once, then divide by the total.",
      skills: ["probability-basics"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Let $c$ be a constant such that $\\frac{4x^2 - 81}{2x + 9}$ and $2x + c$ have the same value for every $x$ in the domain of the first expression. What is the value of $c$?",
      choices: [
        // distractor: carries the numerator's constant -81 straight down without factoring
        { id: "A", text: "$-81$" },
        // distractor: doubles -9, applying the factor of 2 from 2x to the constant as well
        { id: "B", text: "$-18$" },
        { id: "C", text: "$-9$" },
        // distractor: divides -9 by 2, as if the whole numerator had been split by 2x
        { id: "D", text: "$-4.5$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The numerator is a difference of squares: $4x^2 - 81 = (2x + 9)(2x - 9)$. Cancelling $2x + 9$ leaves $2x - 9$, so $c = -9$.\n\n**The Full Solution:**\nStep 1: Recognize the numerator's form. Both terms are perfect squares, since $4x^2 = (2x)^2$ and $81 = 9^2$, so $4x^2 - 81 = (2x + 9)(2x - 9)$.\nStep 2: Cancel the common factor. $\\frac{(2x + 9)(2x - 9)}{2x + 9} = 2x - 9$ for every $x$ in the domain, that is, every $x$ except $-\\frac{9}{2}$.\nStep 3: Match the result to $2x + c$. Writing $2x - 9$ as $2x + (-9)$ gives $c = -9$. Check with $x = 2$: $\\frac{16 - 81}{4 + 9} = \\frac{-65}{13} = -5$, and $2(2) - 9 = -5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-81$): copies the constant out of the numerator without factoring at all. The $-81$ belongs to a squared term and does not survive the cancellation intact.\n* Choice B ($-18$): doubles the $-9$, applying the $2$ from $2x$ to the constant term as well. Only the x-term carries that coefficient.\n* Choice D ($-4.5$): divides $-9$ by $2$, treating the division as if each term of the numerator were divided by $2x$.\n\n**Test Day Takeaway:** A quadratic numerator over a linear denominator is a factoring problem, and $a^2 - b^2 = (a + b)(a - b)$ is the pattern the SAT reuses most. Factor, cancel, and then read the constant off the quotient rather than off the original numerator.",
      skills: ["simplifying-rational-expressions", "difference-of-squares"]
    },
    {
      id: 9,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A quality engineer sampled resistors at random from a production lot and reported a $95\\%$ confidence interval for the mean resistance of the lot extending from $112.6$ ohms to $119.4$ ohms. What is the margin of error, in ohms, for this interval?",
      correctAnswer: "3.4",
      explanation: "**SAT Pattern: Margin of Error**\n\n**The correct answer is $3.4$.**\n\n**The Fast Way (~15s):** The interval is the sample mean plus or minus the margin of error, so the margin is half the width: $\\frac{119.4 - 112.6}{2} = 3.4$ ohms.\n\n**The Full Solution:**\nStep 1: Recall the structure of a confidence interval. It runs from mean minus margin of error to mean plus margin of error, so the full interval is $2$ margins wide.\nStep 2: Find the width. The interval spans $119.4 - 112.6 = 6.8$ ohms.\nStep 3: Halve the width. The margin of error is $\\frac{6.8}{2} = 3.4$ ohms. Check: the midpoint is $116.0$ ohms, and $116.0 \\pm 3.4$ reproduces $112.6$ and $119.4$ ✓\n\n**Common Mistakes:**\n* $6.8$: reports the full width of the interval. The margin of error reaches only one direction from the mean, so the width is twice the margin.\n* $116$: reports the midpoint, which is the sample mean estimate rather than the margin around it.\n* $1.7$: halves the width twice, dividing $6.8$ by $4$.\n\n**Test Day Takeaway:** Margin of error equals half the interval width, and the sample mean sits at the midpoint. Given endpoints, subtract then divide by two; given a mean and a margin, add and subtract to rebuild the endpoints.",
      skills: ["margin-of-error"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The masses $x$ and $y$, in grams, of two alloy samples satisfy both $7x + 4y = 94$ and $4x + 7y = 82$. What is the combined mass, in grams, of the two samples?",
      choices: [
        // distractor: solves the system and reports y alone
        { id: "A", text: "$6$" },
        // distractor: adds the equations but divides 176 by 22 instead of 11
        { id: "B", text: "$8$" },
        // distractor: solves the system and reports x alone
        { id: "C", text: "$10$" },
        { id: "D", text: "$16$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Add the two equations: $11x + 11y = 176$. Dividing by $11$ gives $x + y = 16$ grams, with no need to find $x$ and $y$ separately.\n\n**The Full Solution:**\nStep 1: Notice what the question asks for. It wants $x + y$, a combination, so look for a way to produce $x + y$ directly instead of solving for each mass.\nStep 2: Add the equations. $(7x + 4y) + (4x + 7y) = 94 + 82$ gives $11x + 11y = 176$, because the coefficients of $x$ and of $y$ each total $11$.\nStep 3: Factor and divide. $11(x + y) = 176$, so $x + y = \\frac{176}{11} = 16$ grams. Check: solving fully gives $x = 10$ and $y = 6$, and $7(10) + 4(6) = 94$ with $10 + 6 = 16$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): finishes the full solve and reports $y$, the mass of one sample rather than the combined mass.\n* Choice B ($8$): adds the equations correctly but divides $176$ by $22$, the total of all four coefficients, instead of by the shared factor $11$.\n* Choice C ($10$): reports $x$, the other single sample's mass.\n\n**Test Day Takeaway:** When a system asks for a sum or difference rather than for $x$ and $y$, add or subtract the equations first. If the resulting coefficients match, one division finishes the problem.",
      skills: ["elimination-method"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The table gives this year's monthly budgeted amount for four household categories and the percent by which each amount increased from last year. What amount was budgeted for utilities last year?",
      diagram: { type: "dataTable", params: { headers: ["Category", "This year's amount (dollars)", "Percent increase"], rows: [["Housing", "1,344", "12%"], ["Utilities", "261", "16%"], ["Groceries", "638", "10%"], ["Transportation", "405", "8%"]] } },
      choices: [
        // distractor: takes 16% off this year's amount: 261 x 0.84 = 219.24
        { id: "A", text: "$\\$219.24$" },
        { id: "B", text: "$\\$225.00$" },
        // distractor: subtracts 16 dollars instead of 16 percent: 261 - 16 = 245
        { id: "C", text: "$\\$245.00$" },
        // distractor: increases this year's amount by 16% instead of undoing the increase: 261 x 1.16 = 302.76
        { id: "D", text: "$\\$302.76$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** This year is $116\\%$ of last year, so last year is $\\frac{261}{1.16} = 225$ dollars.\n\n**The Full Solution:**\nStep 1: Write the relationship in the direction the table gives it. Last year's utilities amount $u$ grew by $16\\%$, so this year's amount is $u + 0.16u = 1.16u$.\nStep 2: Substitute the table value for utilities. $1.16u = 261$.\nStep 3: Undo the increase by dividing, not subtracting. $u = \\frac{261}{1.16} = 225$ dollars. Check: $16\\%$ of $225$ is $36$, and $225 + 36 = 261$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\$219.24$): takes $16\\%$ off this year's amount, computing $261 \\times 0.84$. The percent was applied to last year's smaller amount, so removing it is a division.\n* Choice C ($\\$245.00$): subtracts $16$ dollars instead of $16$ percent, treating a rate as a fixed amount.\n* Choice D ($\\$302.76$): raises this year's amount by another $16\\%$, moving forward in time instead of backward.\n\n**Test Day Takeaway:** A percent increase always applies to the earlier amount. To go backward, divide by $1 + r$; taking the same percent off the new amount lands short every time.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 12,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A triangular brace contains a right angle, and its three sides measure $k$, $k + 7$, and $k + 8$ centimeters, where $k$ is a positive constant. What is the value of $k$?",
      correctAnswer: "5",
      explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~30s):** The longest side, $k + 8$, is the hypotenuse, so $k^2 + (k + 7)^2 = (k + 8)^2$. Expanding collapses to $k^2 - 2k - 15 = 0$, giving $k = 5$.\n\n**The Full Solution:**\nStep 1: Identify the hypotenuse. Since $k$ is positive, $k + 8$ is the longest of the three sides, so it faces the right angle and the legs are $k$ and $k + 7$.\nStep 2: Apply the Pythagorean theorem and expand. $k^2 + (k + 7)^2 = (k + 8)^2$ becomes $k^2 + k^2 + 14k + 49 = k^2 + 16k + 64$.\nStep 3: Collect terms and solve. Subtracting $k^2 + 16k + 64$ from both sides gives $k^2 - 2k - 15 = 0$, which factors as $(k - 5)(k + 3) = 0$, so $k = 5$ or $k = -3$; only $k = 5$ is positive. Check: the sides are $5$, $12$, and $13$, and $25 + 144 = 169$ ✓\n\n**Common Mistakes:**\n* $-3$: keeps the negative root of $k^2 - 2k - 15 = 0$. A side length cannot be negative, and the problem states $k$ is positive.\n* $12$: reports $k + 7$, the longer leg, instead of the value of $k$ itself.\n* $13$: reports $k + 8$, the hypotenuse, instead of the value of $k$.\n\n**Test Day Takeaway:** When side lengths are written in terms of one variable, the largest expression is the hypotenuse and belongs alone on one side of the Pythagorean equation. The $k^2$ terms cancel, so what looks quadratic often reduces to a short factorable equation.",
      skills: ["pythagorean-theorem"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Sensors are mounted at $(m, 5)$ and $(4, -3)$ on a coordinate grid marked in feet, where $m$ is a constant, and the sensors are $17$ feet apart. Which of the following could be the value of $m$?",
      choices: [
        // distractor: adds the legs instead of squaring them, solving |m - 4| + 8 = 17
        { id: "A", text: "$13$" },
        // distractor: reports the horizontal leg 15 rather than solving m - 4 = 15
        { id: "B", text: "$15$" },
        { id: "C", text: "$19$" },
        // distractor: sets (m - 4)^2 = 289, ignoring the vertical leg of 8
        { id: "D", text: "$21$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Distance Formula**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The vertical leg is $5 - (-3) = 8$, so the horizontal leg satisfies $8^2 + (m - 4)^2 = 17^2$. That gives $(m - 4)^2 = 225$, so $m - 4 = \\pm 15$ and $m = 19$ is one possibility.\n\n**The Full Solution:**\nStep 1: Write the distance formula for the two points. $\\sqrt{(m - 4)^2 + (5 - (-3))^2} = 17$.\nStep 2: Square both sides and simplify the known leg. $(m - 4)^2 + 8^2 = 289$, so $(m - 4)^2 + 64 = 289$ and $(m - 4)^2 = 225$.\nStep 3: Take both square roots. $m - 4 = 15$ or $m - 4 = -15$, so $m = 19$ or $m = -11$. Only $19$ appears among the choices. Check: from $(19, 5)$ to $(4, -3)$ the legs are $15$ and $8$, and $\\sqrt{225 + 64} = \\sqrt{289} = 17$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($13$): adds the legs rather than their squares, solving $|m - 4| + 8 = 17$ to get $m - 4 = 9$. Distance combines legs through squares, not through addition.\n* Choice B ($15$): stops at the horizontal leg. That $15$ is the difference $m - 4$, so the coordinate is $4 + 15$, not $15$.\n* Choice D ($21$): sets $(m - 4)^2 = 289$, using the whole distance as the horizontal leg and ignoring the $8$-foot vertical drop.\n\n**Test Day Takeaway:** A distance question is a right triangle in disguise: legs are the coordinate differences and the distance is the hypotenuse. Subtract the known leg's square before taking a root, and remember the root has two signs when a coordinate is unknown.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The vertical displacement of a piston from its centerline, in millimeters, is modeled by $h(t) = 2t^2 - 22t + 48$, where $t$ is the time in seconds since a test began. Given that $h(3) = 0$, at what other value of $t$ is the piston at its centerline?",
      choices: [
        // distractor: sign slip in factoring, writing 2(t - 3)(t + 8) instead of 2(t - 3)(t - 8)
        { id: "A", text: "$-8$" },
        // distractor: repeats the time already given instead of finding the second one
        { id: "B", text: "$3$" },
        { id: "C", text: "$8$" },
        // distractor: uses 22/2 = 11, the sum of the two roots, as the second root
        { id: "D", text: "$11$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Since $h(3) = 0$, $t - 3$ is a factor. Factoring out the $2$ gives $h(t) = 2(t^2 - 11t + 24) = 2(t - 3)(t - 8)$, so the other zero is $t = 8$.\n\n**The Full Solution:**\nStep 1: Use the given zero. $h(3) = 0$ means $t = 3$ is a root, so $t - 3$ divides $h(t)$.\nStep 2: Factor the model. Removing the common factor $2$ gives $h(t) = 2(t^2 - 11t + 24)$, and the two numbers multiplying to $24$ and adding to $-11$ are $-3$ and $-8$, so $h(t) = 2(t - 3)(t - 8)$.\nStep 3: Read the remaining zero. Setting $2(t - 3)(t - 8) = 0$ gives $t = 3$ or $t = 8$, so the other time is $8$ seconds. Check: $h(8) = 2(64) - 22(8) + 48 = 128 - 176 + 48 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): flips a sign while factoring, writing $2(t - 3)(t + 8)$. That product would have a middle term of $+10t$, not $-22t$.\n* Choice B ($3$): repeats the time the question already supplies. The question asks for the other zero.\n* Choice D ($11$): computes $\\frac{22}{2} = 11$, which is the sum of the two roots, not the second root. Subtracting the known root gives $11 - 3 = 8$.\n\n**Test Day Takeaway:** One known zero turns a quadratic into a one-step factoring problem. Pull out the leading coefficient first so the remaining trinomial is monic, then find the pair of numbers whose product is the constant and whose sum is the middle coefficient.",
      skills: ["finding-roots-factoring"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A triangular gusset plate is positioned in the xy-plane with two corners on the x-axis at $(0, 0)$ and $(14, 0)$. Its third corner sits directly above $(6, 0)$, and the plate covers $63$ square units. How far above the x-axis is the third corner?",
      choices: [
        // distractor: divides 63 by the base 14 without doubling, dropping the factor of 1/2
        { id: "A", text: "$4.5$" },
        { id: "B", text: "$9$" },
        // distractor: uses 6, the x-coordinate of the third corner, as the base: 63/6 = 10.5
        { id: "C", text: "$10.5$" },
        // distractor: doubles the area but divides by 7, half of the base: 126/7 = 18
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The side on the x-axis is the base, $14$ units, and the height is the third corner's distance above the axis. From $\\frac{1}{2}(14)h = 63$, $h = 9$.\n\n**The Full Solution:**\nStep 1: Identify the base. The corners $(0, 0)$ and $(14, 0)$ both lie on the x-axis, so that side is horizontal with length $14 - 0 = 14$ units.\nStep 2: Identify the height. The height is measured perpendicular to the base, so it is the vertical distance from the third corner down to the x-axis, which is exactly the height being asked for.\nStep 3: Solve the area equation. $\\frac{1}{2}(14)h = 63$ gives $7h = 63$, so $h = 9$ units. Check: $\\frac{1}{2}(14)(9) = 63$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.5$): computes $\\frac{63}{14}$ and forgets that the area formula already divides by $2$, so the height is twice that quotient.\n* Choice C ($10.5$): uses $6$ as the base because the third corner sits above $x = 6$. That $6$ locates the corner horizontally; it is not a side of the triangle.\n* Choice D ($18$): divides $126$ by $7$ instead of by $14$, halving the base a second time.\n\n**Test Day Takeaway:** When one side of a triangle lies along an axis, that side is the base and the opposite vertex's perpendicular coordinate is the height. The horizontal position of the third vertex never enters the area.",
      skills: ["triangle-area"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A tray holds $25$ capacitors sorted by grade, as the table shows. Two of the capacitors are drawn from the tray at random, one after the other, and the first is not returned. What is the probability that both are grade A?",
      diagram: { type: "dataTable", params: { headers: ["Grade", "Number of capacitors"], rows: [["A", "10"], ["B", "9"], ["C", "6"], ["Total", "25"]] } },
      correctAnswer: "3/20",
      explanation: "**SAT Pattern: Probability Without Replacement**\n\n**The correct answer is $\\frac{3}{20}$.**\n\n**The Fast Way (~25s):** The first draw is $\\frac{10}{25}$; with that capacitor gone the second is $\\frac{9}{24}$. Their product is $\\frac{90}{600} = \\frac{3}{20}$.\n\n**The Full Solution:**\nStep 1: Find the probability of the first draw. The tray holds $10$ grade A capacitors out of $25$, so the first draw is grade A with probability $\\frac{10}{25} = \\frac{2}{5}$.\nStep 2: Update both counts for the second draw. One grade A capacitor has been removed and not returned, leaving $9$ grade A among $24$ capacitors, so the second draw is grade A with probability $\\frac{9}{24} = \\frac{3}{8}$.\nStep 3: Multiply the two probabilities. $\\frac{2}{5} \\times \\frac{3}{8} = \\frac{6}{40} = \\frac{3}{20}$. Check: $\\frac{10}{25} \\times \\frac{9}{24} = \\frac{90}{600} = \\frac{3}{20}$ ✓\n\n**Common Mistakes:**\n* $\\frac{4}{25}$: uses $\\frac{10}{25} \\times \\frac{10}{25}$, treating the draws as if the first capacitor were returned. Without replacement both the favorable count and the total shrink.\n* $\\frac{1}{6}$: uses $\\frac{10}{25} \\times \\frac{10}{24}$, reducing the total to $24$ but forgetting that only $9$ grade A capacitors remain.\n* $\\frac{2}{5}$: reports the probability of a single grade A draw and never accounts for the second capacitor.\n\n**Test Day Takeaway:** Without replacement, both numerator and denominator drop by one for the second draw of the same category. Multiply the two updated fractions; \"and\" between draws always means multiply.",
      skills: ["probability-basics"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A calibration line is recorded by two instruments. The first records it as $\\frac{5}{3}x - \\frac{4}{3}y = \\frac{14}{3}$, and the second records it as $ax + 12y = b$, where $a$ and $b$ are constants. Infinitely many ordered pairs $(x, y)$ satisfy both records. What is the value of $a + b$?",
      choices: [
        { id: "A", text: "$-57$" },
        // distractor: uses +9 for a and -9 for b, applying two different multipliers: 15 + (-42)
        { id: "B", text: "$-27$" },
        // distractor: uses -9 for a and +9 for b, applying two different multipliers: -15 + 42
        { id: "C", text: "$27$" },
        // distractor: multiplies by +9 throughout, missing the sign change needed to turn -4/3 into +12
        { id: "D", text: "$57$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Infinitely many shared solutions means one equation is a multiple of the other. Turning $-\\frac{4}{3}$ into $12$ takes a multiplier of $-9$, so $a = -9 \\cdot \\frac{5}{3} = -15$ and $b = -9 \\cdot \\frac{14}{3} = -42$, giving $-57$.\n\n**The Full Solution:**\nStep 1: Translate the condition. Two linear equations share infinitely many solutions exactly when they describe the same line, which means every coefficient and the constant are scaled by the same nonzero multiplier.\nStep 2: Find that multiplier from the y-terms, the only pair fully known. The first equation's y-coefficient is $-\\frac{4}{3}$ and the second's is $12$, and $-\\frac{4}{3} \\cdot n = 12$ gives $n = -9$.\nStep 3: Apply $n = -9$ to the other two entries. $a = \\frac{5}{3}(-9) = -15$ and $b = \\frac{14}{3}(-9) = -42$, so $a + b = -57$. Check: multiplying the first record by $-9$ gives $-15x + 12y = -42$, exactly the second record ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-27$): scales $a$ by $+9$ and $b$ by $-9$, giving $15 + (-42)$. A single multiplier has to hit every term of the equation.\n* Choice C ($27$): makes the reverse mismatch, $-15 + 42$, scaling the constant with the wrong sign.\n* Choice D ($57$): uses $+9$ throughout, which would send $-\\frac{4}{3}$ to $-12$ rather than $+12$. The sign of the multiplier is set by the y-terms.\n\n**Test Day Takeaway:** For infinitely many solutions, find the one multiplier that maps a fully known pair of coefficients, then apply it to every remaining term including the constant. A sign slip in the multiplier flips both unknowns at once.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "Two rectangular aluminum sheets cover the same area. The first sheet measures $x$ inches by $x + 5$ inches, and the second sheet measures $x - 2$ inches by $x + 9$ inches, where $x$ is greater than $2$. What area, in square inches, does each of the two sheets cover?",
      correctAnswer: "126",
      explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $126$.**\n\n**The Fast Way (~40s):** Setting the areas equal gives $x^2 + 5x = x^2 + 7x - 18$. The $x^2$ terms cancel, leaving $2x = 18$ and $x = 9$, so each sheet covers $9(14) = 126$ square inches.\n\n**The Full Solution:**\nStep 1: Write both areas as products. The first sheet covers $x(x + 5) = x^2 + 5x$ square inches, and the second covers $(x - 2)(x + 9) = x^2 + 7x - 18$ square inches.\nStep 2: Set them equal and solve. $x^2 + 5x = x^2 + 7x - 18$ loses its quadratic terms, leaving $5x = 7x - 18$, so $2x = 18$ and $x = 9$, which satisfies $x > 2$.\nStep 3: Return to the question, which asks for the area, not for $x$. The first sheet measures $9$ by $14$ inches, so its area is $126$ square inches. Check: the second sheet measures $7$ by $18$ inches, and $7 \\times 18 = 126$ ✓\n\n**Common Mistakes:**\n* $9$: stops at the value of $x$. The variable was a tool for finding the dimensions, and the question asks for the area.\n* $14$: reports $x + 5$, the length of the first sheet, rather than the area it covers.\n* $252$: adds the two sheets' areas. The sheets cover equal areas, so the shared value is $126$, not their total.\n\n**Test Day Takeaway:** When two areas are equal, write both as expanded products and subtract; matching $x^2$ terms cancel and a hard-looking quadratic becomes linear. Then substitute back and answer the quantity actually requested.",
      skills: ["triangle-area"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A conveyor alarm sounds at every integer belt speed $x$, in meters per minute, for which $3x - 8 > k$, where $k$ is an integer constant. The least speed at which the alarm sounds is $12$ meters per minute. What is the greatest possible value of $k$?",
      choices: [
        // distractor: uses 3(11) - 8 = 25, a value of k that works but is not the greatest one
        { id: "A", text: "$25$" },
        { id: "B", text: "$27$" },
        // distractor: uses 3(12) - 8 = 28, treating x = 12 as a solution of 3x - 8 = k rather than a strict inequality
        { id: "C", text: "$28$" },
        // distractor: drops the -8 and computes 3(12) = 36
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** Solving gives $x > \\frac{k + 8}{3}$. For $12$ to be the least integer speed above that boundary, the boundary must satisfy $11 \\le \\frac{k + 8}{3} < 12$, so $25 \\le k < 28$ and the greatest integer is $27$.\n\n**The Full Solution:**\nStep 1: Isolate $x$. Adding $8$ to both sides of $3x - 8 > k$ and dividing by $3$ gives $x > \\frac{k + 8}{3}$, so the solutions are every number strictly above that boundary.\nStep 2: Say what makes $12$ the least integer speed that satisfies the inequality. The boundary must be below $12$ so that $12$ sounds the alarm, and at least $11$ so that $11$ does not, which is $11 \\le \\frac{k + 8}{3} < 12$.\nStep 3: Solve for $k$ and take the greatest integer. Multiplying by $3$ gives $33 \\le k + 8 < 36$, so $25 \\le k < 28$ and the greatest integer value is $k = 27$. Check: with $k = 27$, $x > \\frac{35}{3} \\approx 11.67$, so the least integer speed is $12$; with $k = 28$, $x > 12$ and the least integer speed becomes $13$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): comes from $3(11) - 8 = 25$. That value of $k$ does make $12$ the least speed that sounds the alarm, but the question asks for the greatest such $k$, and $26$ and $27$ also work.\n* Choice C ($28$): comes from $3(12) - 8 = 28$, which treats $x = 12$ as making the two sides equal. The inequality is strict, so $x = 12$ must exceed the boundary rather than sit on it.\n* Choice D ($36$): drops the $-8$ and computes $3(12)$, solving $3x > k$ instead of $3x - 8 > k$.\n\n**Test Day Takeaway:** \"The least integer that works is $n$\" is a two-sided condition: the boundary sits at or below $n$ and strictly above $n - 1$. Write both inequalities, then read off the extreme value of the constant.",
      skills: ["inequalities"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "An engineer writes $5(2x - 3) + k = a(x + 4) - 1$ and finds that substituting any number for $x$ produces a true statement, where $a$ and $k$ are constants. What is the value of $k$?",
      choices: [
        // distractor: computes 39 - 15 instead of 39 + 15, moving the -15 the wrong way
        { id: "A", text: "$24$" },
        // distractor: stops at the right side's constant 4a - 1 = 39 without undoing the -15 on the left
        { id: "B", text: "$39$" },
        { id: "C", text: "$54$" },
        // distractor: drops the -1 on the right, solving -15 + k = 40
        { id: "D", text: "$55$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Expand both sides to $10x - 15 + k = ax + 4a - 1$. Matching x-terms gives $a = 10$, and matching constants gives $-15 + k = 39$, so $k = 54$.\n\n**The Full Solution:**\nStep 1: Expand each side. The left becomes $10x - 15 + k$ and the right becomes $ax + 4a - 1$.\nStep 2: Match the x-coefficients. An equation true for every $x$ requires identical coefficients, so $10 = a$.\nStep 3: Match the constant terms using that value. With $a = 10$ the right side's constant is $4(10) - 1 = 39$, so $-15 + k = 39$ and $k = 54$. Check: the left side becomes $10x - 15 + 54 = 10x + 39$, and the right side becomes $10x + 40 - 1 = 10x + 39$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($24$): computes $39 - 15$. The $-15$ is already on the left with $k$, so removing it means adding $15$ to $39$.\n* Choice B ($39$): reports the right side's constant, $4a - 1$. That is what $-15 + k$ equals, not what $k$ equals.\n* Choice D ($55$): forgets the $-1$ and matches $-15 + k$ to $4a = 40$.\n\n**Test Day Takeaway:** \"True for every value of $x$\" means the two sides are the same expression. Expand, match x-coefficients to pin the first constant, then substitute it before matching the constant terms.",
      skills: ["distributive-property"]
    },
    {
      id: 21,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "The table gives the coverage rate, in square feet per gallon, of three concrete sealants. A crew will apply two coats of sealant Y to a surface with an area of $1{,}530$ square feet. Sealant Y is sold only in quart containers, and $1$ gallon equals $4$ quarts. What is the least number of containers the crew needs?",
      diagram: { type: "dataTable", params: { headers: ["Sealant", "Coverage rate (square feet per gallon)"], rows: [["X", "425"], ["Y", "340"], ["Z", "510"]] } },
      correctAnswer: "36",
      explanation: "**SAT Pattern: Proportion Solving**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~45s):** Two coats cover $2(1{,}530) = 3{,}060$ square feet of surface. At $340$ square feet per gallon that is $9$ gallons, and $9(4) = 36$ quarts.\n\n**The Full Solution:**\nStep 1: Find the total area to be coated. Each coat covers the full $1{,}530$ square feet, so two coats require sealant for $2 \\times 1{,}530 = 3{,}060$ square feet.\nStep 2: Convert area to gallons using sealant Y's rate from the table. Setting up the proportion $\\frac{340 \\text{ square feet}}{1 \\text{ gallon}} = \\frac{3{,}060 \\text{ square feet}}{g \\text{ gallons}}$ gives $340g = 3{,}060$, so $g = 9$ gallons.\nStep 3: Convert gallons to containers. Since $1$ gallon is $4$ quarts, $9$ gallons is $9 \\times 4 = 36$ quart containers. Check: $36$ quarts is $9$ gallons, which covers $9 \\times 340 = 3{,}060$ square feet, exactly two coats ✓\n\n**Common Mistakes:**\n* $9$: stops at gallons. The sealant is sold in quarts, so the count of containers is four times the number of gallons.\n* $18$: applies a single coat, computing $\\frac{1{,}530}{340} = 4.5$ gallons and converting to $18$ quarts.\n* $24$: reads the rate from sealant Z's row, $510$ square feet per gallon, giving $6$ gallons and $24$ quarts.\n\n**Test Day Takeaway:** Track the units at every step of a rate chain: area to gallons through the coverage rate, gallons to containers through the conversion. Multiply for repeated coats before dividing, and reread which row of the table the problem names.",
      skills: ["unit-conversion"]
    },
    {
      id: 22,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "At a plant, $60\\%$ of the units are produced on line 1 and the rest on line 2. Of the line 1 units, $8\\%$ fail inspection, and of the line 2 units, $3\\%$ fail inspection. A unit that failed inspection is selected at random. What is the probability that it came from line 1?",
      choices: [
        // distractor: reports 0.60 x 0.08 = 0.048, the share of ALL units that are line 1 failures
        { id: "A", text: "$0.048$" },
        // distractor: reports the overall failure rate, 0.048 + 0.012 = 0.06
        { id: "B", text: "$0.06$" },
        // distractor: reports line 1's share of production, ignoring the two different failure rates
        { id: "C", text: "$0.6$" },
        { id: "D", text: "$0.8$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Take $1{,}000$ units: $600$ from line 1 produce $48$ failures and $400$ from line 2 produce $12$, for $60$ failures in all. Then $\\frac{48}{60} = 0.8$.\n\n**The Full Solution:**\nStep 1: Count the failures from each line. Using a convenient total of $1{,}000$ units, line 1 makes $0.60(1{,}000) = 600$ units of which $0.08(600) = 48$ fail, and line 2 makes $400$ units of which $0.03(400) = 12$ fail.\nStep 2: Build the group the condition names. The unit selected is known to have failed, so the pool is not all $1{,}000$ units but the $48 + 12 = 60$ failed ones.\nStep 3: Divide the favorable count by that conditional pool. $\\frac{48}{60} = 0.8$. Check: $0.8$ of the failures come from line 1 and $\\frac{12}{60} = 0.2$ from line 2, and those shares total $1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.048$): computes $0.60 \\times 0.08$, the share of all units that are line 1 failures. That is the numerator of the calculation, divided by the wrong total.\n* Choice B ($0.06$): adds $0.048$ and $0.012$ to get the plant's overall failure rate. That is the denominator, not the answer.\n* Choice C ($0.6$): reports line 1's share of production. Failures are not split in the same ratio as production, because line 1 fails at the higher rate.\n\n**Test Day Takeaway:** A condition shrinks the denominator. Once you are told the unit failed, divide by the number of failures rather than by the whole population, and picking a round total such as $1{,}000$ turns the percents into counts you can add.",
      skills: ["conditional-probability"]
    }
  ]
};

export default practiceTest3M2Easy;
