// Practice Test 9 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md);
// slot metadata frozen. 4 visual items (scatterplot, right triangle,
// triangle with angles, plus the M1-frozen set). Numeric MC choices ascending.

export const practiceTest9M2Easy = {
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
      question: "The figure plots two valve stations on a natural gas transmission main, with each grid unit equal to one kilometer. A replacement pipe will run straight between them. How many kilometers long is that pipe?",
      diagram: { type: "coordinatePoints", params: { points: [[-2, -2], [4, 6]], xMin: -6, xMax: 6, yMin: -4, yMax: 8 } },
      choices: [
        // distractor: reports only the horizontal gap, 4 - (-2) = 6
        { id: "A", text: "$6$" },
        // distractor: reports only the vertical gap, 6 - (-2) = 8
        { id: "B", text: "$8$" },
        { id: "C", text: "$10$" },
        // distractor: adds the two gaps, 6 + 8 = 14, instead of using the Pythagorean theorem
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Distance Formula**\n\n**Choice C is correct.** The plotted valve stations sit at $(-2, -2)$ and $(4, 6)$, so the straight pipe is the hypotenuse of a right triangle whose legs are the horizontal and vertical gaps.\n\n**The Fast Way (~15s):** Read the gaps off the grid: $6$ across and $8$ up. That is the $6$-$8$-$10$ triple, so the pipe is $10$ kilometers long.\n\n**The Full Solution:**\nStep 1: Read the two plotted points: $(-2, -2)$ and $(4, 6)$.\nStep 2: Apply the distance formula: $d = \\sqrt{(4 - (-2))^2 + (6 - (-2))^2} = \\sqrt{6^2 + 8^2}$.\nStep 3: $\\sqrt{36 + 64} = \\sqrt{100} = 10$. Check: $6^2 + 8^2 = 36 + 64 = 100$, and $10^2 = 100$, so a right triangle with legs $6$ and $8$ really does have hypotenuse $10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): reports only the horizontal gap, $4 - (-2) = 6$, and calls it the distance. That is one leg, not the hypotenuse.\n* Choice B ($8$): reports only the vertical gap, $6 - (-2) = 8$ — the other leg.\n* Choice D ($14$): adds the gaps, $6 + 8 = 14$. That is how far you would travel along the grid lines, not the straight-line distance.\n\n**Test Day Takeaway:** A straight-line distance between plotted points is always the hypotenuse of the horizontal and vertical gaps — square them and add, never add the lengths themselves.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "A county health office recorded 84 influenza cases on day 3 of an outbreak and 156 cases on day 9, and the count grew linearly. By how many cases per day did the count increase?",
      correctAnswer: "12",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**The correct answer is $12$.** A linear count means the increase per day is the slope through the two recorded readings.\n\n**The Fast Way (~15s):** The count rose $156 - 84 = 72$ cases across $9 - 3 = 6$ days, so it rose $72 \\div 6 = 12$ cases per day.\n\n**The Full Solution:**\nStep 1: Write the readings as points, with the day as $x$ and the case count as $y$: $(3, 84)$ and $(9, 156)$.\nStep 2: The daily increase is the slope: $m = \\dfrac{156 - 84}{9 - 3} = \\dfrac{72}{6}$.\nStep 3: $m = 12$ cases per day. Check: starting from $84$ on day $3$ and adding $12$ for each of the next $6$ days gives $84 + 6(12) = 84 + 72 = 156$, the day-$9$ reading ✓\n\n**Common Mistakes:**\n* $72$: the total increase over the whole stretch, not the increase per day. The question asks for a rate, so the total must still be divided by $6$ days.\n* $8$: dividing the increase by the later day number, $72 \\div 9 = 8$, instead of by the $6$-day gap between readings.\n* $28$: computing $84 \\div 3$, which assumes the count is proportional to the day — but a line through these readings does not pass through the origin.\n\n**Test Day Takeaway:** \"Per day,\" \"per unit,\" and \"rate of change\" all mean slope: divide the change in the output by the change in the input, never by one of the raw values.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "During a concert load-in, the number of speaker cases $c$ moved by one crew satisfies $5c + 8 = 68$. What is the value of $5c + 20$?",
      choices: [
        // distractor: solves for c = 12 and reports the number of cases instead of 5c + 20
        { id: "A", text: "$12$" },
        // distractor: stops at 5c = 60 and forgets to add 20
        { id: "B", text: "$60$" },
        // distractor: copies the given 68, treating 5c + 20 as unchanged
        { id: "C", text: "$68$" },
        { id: "D", text: "$80$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Shifted Output**\n\n**Choice D is correct.** The expression $5c + 20$ is exactly $12$ more than the expression $5c + 8$, whose value is given.\n\n**The Fast Way (~10s):** $20$ is $12$ more than $8$, so $5c + 20 = 68 + 12 = 80$.\n\n**The Full Solution:**\nStep 1: From $5c + 8 = 68$, subtract $8$ from both sides: $5c = 60$.\nStep 2: Substitute that block into the requested expression: $5c + 20 = 60 + 20$.\nStep 3: $5c + 20 = 80$. Check: $5c = 60$ gives $c = 12$, and $5(12) + 8 = 68$ matches the given equation, while $5(12) + 20 = 80$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): solves all the way down to $c = 12$ and reports the number of cases. The question asks for the value of an expression, not for $c$.\n* Choice B ($60$): stops at $5c = 60$ and never adds the $20$.\n* Choice C ($68$): copies the given value, as if changing $+8$ to $+20$ left the expression alone.\n\n**Test Day Takeaway:** When a question gives one expression's value and asks for a shifted version of it, compare the two expressions directly — solving for the variable is legal but slower.",
      skills: ["solving-equations", "ratios"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A steel gusset plate for a footbridge has the shape of right triangle $ABC$, where angle $B$ is the right angle, the perimeter is $120$ cm, side $AB$ measures $30$ cm, and hypotenuse $AC$ measures $50$ cm. Which expression is equal to $\\tan A$?",
      choices: [
        // distractor: gives cos A, adjacent over hypotenuse, which equals 0.6
        { id: "A", text: "$\\dfrac{30}{50}$" },
        // distractor: inverts the tangent ratio to adjacent over opposite, which equals 0.75
        { id: "B", text: "$\\dfrac{30}{40}$" },
        // distractor: gives sin A, opposite over hypotenuse, which equals 0.8
        { id: "C", text: "$\\dfrac{40}{50}$" },
        { id: "D", text: "$\\dfrac{40}{30}$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice D is correct.** The perimeter supplies the missing leg $BC = 40$ cm, and $\\tan A$ is the leg opposite $A$ over the leg adjacent to $A$.\n\n**The Fast Way (~25s):** $BC = 120 - 30 - 50 = 40$. From vertex $A$, the opposite leg is $BC = 40$ and the adjacent leg is $AB = 30$, so $\\tan A = \\dfrac{40}{30}$.\n\n**The Full Solution:**\nStep 1: The perimeter is the sum of all three sides, so $AB + BC + AC = 120$, giving $30 + BC + 50 = 120$ and $BC = 40$ cm.\nStep 2: Angle $B$ is the right angle, so from vertex $A$ the side $BC$ is opposite and the side $AB$ is adjacent; $AC$ is the hypotenuse.\nStep 3: $\\tan A = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{BC}{AB} = \\dfrac{40}{30}$. Check: $30^2 + 40^2 = 900 + 1600 = 2500 = 50^2$, so the three sides really do form a right triangle ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\dfrac{30}{50}$): that is $\\cos A$, adjacent over hypotenuse, and equals $0.6$ rather than the tangent.\n* Choice B ($\\dfrac{30}{40}$): flips the tangent upside down to adjacent over opposite, giving $0.75$; that ratio is $\\tan C$, not $\\tan A$.\n* Choice C ($\\dfrac{40}{50}$): that is $\\sin A$, opposite over hypotenuse, and equals $0.8$.\n\n**Test Day Takeaway:** When a right-triangle question hands you a perimeter, the perimeter is there to produce the third side — find it first, then label opposite, adjacent, and hypotenuse from the named angle.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A mobile vaccination unit models the doses remaining in its cooler as $d = -kt + 480$, where $t$ is the number of hours since the clinic opened. If $300$ doses remain after $6$ hours, what is the value of $k$?",
      choices: [
        { id: "A", text: "$30$" },
        // distractor: divides the doses still remaining by the time, 300 / 6 = 50
        { id: "B", text: "$50$" },
        // distractor: divides the starting number of doses by the time, 480 / 6 = 80
        { id: "C", text: "$80$" },
        // distractor: reports the total decrease, 480 - 300 = 180, without dividing by 6 hours
        { id: "D", text: "$180$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice A is correct.** In $d = -kt + 480$ the number $480$ is the starting count and $k$ is the number of doses used each hour, so $k$ comes from the decrease divided by the elapsed time.\n\n**The Fast Way (~20s):** The cooler lost $480 - 300 = 180$ doses in $6$ hours, so $k = 180 \\div 6 = 30$.\n\n**The Full Solution:**\nStep 1: Substitute the reading $t = 6$, $d = 300$ into the model: $300 = -k(6) + 480$.\nStep 2: Subtract $480$ from both sides: $-180 = -6k$.\nStep 3: Divide by $-6$: $k = 30$. Check: $-30(6) + 480 = -180 + 480 = 300$, the stated reading ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($50$): divides the doses still in the cooler by the time, $300 \\div 6 = 50$. The rate describes what left the cooler, not what stayed.\n* Choice C ($80$): divides the starting count by the time, $480 \\div 6 = 80$, which would be the rate only if the cooler emptied completely in $6$ hours.\n* Choice D ($180$): reports the total decrease over the $6$ hours instead of the hourly rate.\n\n**Test Day Takeaway:** In $y = mx + b$ the constant $b$ is the starting value and $m$ is the per-unit change; solve for $m$ from the change in the output, never from a single raw output value.",
      skills: ["slope-intercept-form"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "A vertical mast on an outdoor festival stage is braced by a guy wire that runs from the top of the mast to an anchor in the deck, as shown. What is the height $h$ of the mast, in feet?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 45]], sideLabels: ["24 ft", "h", "51 ft"], rightAngleVertex: 1 } },
      correctAnswer: "45",
      explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $45$.** The mast, the deck, and the guy wire form a right triangle in which the wire is the hypotenuse, so the mast is a leg.\n\n**The Fast Way (~20s):** $51^2 - 24^2 = 2601 - 576 = 2025$, and $\\sqrt{2025} = 45$ feet.\n\n**The Full Solution:**\nStep 1: The mast is vertical and the deck is horizontal, so the right angle sits at the base of the mast and the $51$-foot wire is the hypotenuse.\nStep 2: Write the Pythagorean relationship with $h$ as the unknown leg: $24^2 + h^2 = 51^2$.\nStep 3: $576 + h^2 = 2601$, so $h^2 = 2025$ and $h = 45$ feet. Check: $24^2 + 45^2 = 576 + 2025 = 2601 = 51^2$ ✓\n\n**Common Mistakes:**\n* $27$: subtracting the lengths, $51 - 24 = 27$, instead of subtracting their squares. Side lengths do not subtract that way.\n* $56.4$: adding the squares, $\\sqrt{51^2 + 24^2} = \\sqrt{3177} \\approx 56.4$, which treats the $51$-foot wire as a leg rather than the hypotenuse.\n* $2025$: stopping at $h^2 = 2025$ and never taking the square root.\n\n**Test Day Takeaway:** Identify the hypotenuse before you write the equation — it is the side opposite the right angle, and it always sits alone on one side of $a^2 + b^2 = c^2$.",
      skills: ["pythagorean-theorem"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A storage protocol requires a vaccine vial to be discarded when its recorded temperature $T$, in degrees Fahrenheit, differs from the target of $46$ by exactly $8$ degrees. Which equation gives the temperatures at which a vial is discarded?",
      choices: [
        // distractor: adds 8 to T and compares to 46; its solutions are T = 38 and T = -54
        { id: "A", text: "$|T + 8| = 46$" },
        { id: "B", text: "$|T - 46| = 8$" },
        // distractor: adds the target instead of subtracting it; its solutions are T = -38 and T = -54
        { id: "C", text: "$|T + 46| = 8$" },
        // distractor: swaps the target and the allowed difference; its solutions are T = 54 and T = -38
        { id: "D", text: "$|T - 8| = 46$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice B is correct.** The distance between the recorded temperature and the target is $|T - 46|$, and the protocol sets that distance equal to $8$.\n\n**The Fast Way (~15s):** \"Differs from $46$ by exactly $8$\" is the distance from $T$ to $46$, written $|T - 46|$, set equal to $8$.\n\n**The Full Solution:**\nStep 1: An absolute value measures distance on the number line, and the distance between $T$ and the target $46$ is $|T - 46|$.\nStep 2: The protocol discards the vial when that distance equals $8$, so $|T - 46| = 8$.\nStep 3: Solving gives $T - 46 = 8$ or $T - 46 = -8$, so $T = 54$ or $T = 38$. Check: $54$ and $38$ each sit exactly $8$ degrees from $46$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($|T + 8| = 46$): adds the $8$ to $T$ and compares to the target, giving $T = 38$ or $T = -54$. It happens to catch $38$, but it also admits $-54^\\circ$F, which is nowhere near the target.\n* Choice C ($|T + 46| = 8$): adds the target instead of subtracting it, giving $T = -38$ or $T = -54$ — neither is $8$ degrees from $46$.\n* Choice D ($|T - 8| = 46$): swaps the roles of the target and the allowed difference, giving $T = 54$ or $T = -38$.\n\n**Test Day Takeaway:** \"Differs from $c$ by $d$\" always becomes $|x - c| = d$: the center of the interval is subtracted inside the bars, and the allowed gap sits alone on the right.",
      skills: ["combining-like-terms"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A pump-curve worksheet defines $f(x) = \\dfrac{x^2 - 9}{x - 3}$ for every input $x$ other than $3$. For what constant $k$ does the equation $f(x) = k$ have no solution?",
      choices: [
        // distractor: uses x = -3, the other zero of the numerator, and reports f(-3) = 0, an output the function does reach
        { id: "A", text: "$0$" },
        // distractor: reports the excluded input x = 3 instead of the output that cannot occur
        { id: "B", text: "$3$" },
        { id: "C", text: "$6$" },
        // distractor: copies the constant 9 from the numerator x^2 - 9
        { id: "D", text: "$9$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice C is correct.** The numerator factors, so $f(x) = x + 3$ for every allowed input; the one output the function can never produce is the value $x + 3$ would take at the forbidden input $x = 3$.\n\n**The Fast Way (~25s):** $\\dfrac{x^2 - 9}{x - 3} = \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$ when $x \\neq 3$. The missing output is $3 + 3 = 6$.\n\n**The Full Solution:**\nStep 1: Factor the numerator as a difference of squares: $x^2 - 9 = (x - 3)(x + 3)$.\nStep 2: Cancel the common factor, which is legal for every $x \\neq 3$: $f(x) = x + 3$.\nStep 3: Setting $x + 3 = k$ gives $x = k - 3$, which is an allowed input unless $k - 3 = 3$, that is, unless $k = 6$. Check: $f(x) = 6$ would force $x = 3$, the one input the worksheet excludes, so no input produces $6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): comes from the other zero of the numerator, $x = -3$. But $x = -3$ is an allowed input and $f(-3) = -3 + 3 = 0$, so $0$ is an output the function actually reaches.\n* Choice B ($3$): reports the excluded input rather than the unreachable output. The question asks for a value of $k$, which lives on the output side.\n* Choice D ($9$): copies the constant from $x^2 - 9$; substituting $k = 9$ gives $x = 6$, a perfectly legal input.\n\n**Test Day Takeaway:** When a rational expression cancels to a line, the graph is that line with one point punched out — the missing output is the height of the hole, not the $x$-value where it sits.",
      skills: ["rational-expressions"]
    },
    {
      id: 9,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A costume shop logged $8$, $15$, $11$, $19$, and $10$ quick changes during the first five performances of a musical. After the sixth performance the mean for all six was $13$. How many quick changes did the sixth performance require?",
      choices: [
        // distractor: multiplies the mean by 5 instead of 6: 13 x 5 = 65, then 65 - 63 = 2
        { id: "A", text: "$2$" },
        // distractor: assumes the sixth performance matched the mean of 13
        { id: "B", text: "$13$" },
        { id: "C", text: "$15$" },
        // distractor: reports the sum of the five logged counts, 63
        { id: "D", text: "$63$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Mean from List**\n\n**Choice C is correct.** Six values with mean $13$ must total $78$, and the five logged counts already total $63$.\n\n**The Fast Way (~20s):** $6 \\times 13 = 78$ and $8 + 15 + 11 + 19 + 10 = 63$, so the sixth count is $78 - 63 = 15$.\n\n**The Full Solution:**\nStep 1: Add the five logged counts: $8 + 15 + 11 + 19 + 10 = 63$.\nStep 2: A mean of $13$ across six performances means the six counts sum to $6 \\times 13 = 78$.\nStep 3: The sixth count is $78 - 63 = 15$. Check: $\\dfrac{63 + 15}{6} = \\dfrac{78}{6} = 13$, the stated mean ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): multiplies the mean by $5$ rather than $6$, getting a required total of $65$ and then $65 - 63 = 2$. The mean covers all six performances, so the multiplier is $6$.\n* Choice B ($13$): assumes the missing performance simply matched the mean. That is true only when the other five already average $13$, and here they average $12.6$.\n* Choice D ($63$): reports the sum of the five logged counts instead of the missing sixth count.\n\n**Test Day Takeaway:** Turn every mean into a total before you do anything else: mean times count gives the sum, and the missing value is whatever the known values leave behind.",
      skills: ["calculate-mean"]
    },
    {
      id: 10,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The three interior angles of a triangular acoustic panel mounted above a recital hall stage measure $(2k)^\\circ$, $(3k + 10)^\\circ$, and $(4k - 19)^\\circ$. What is the value of $k$?",
      correctAnswer: "21",
      explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $21$.** The three interior angles of any triangle add to $180^\\circ$, which turns the three expressions into one linear equation in $k$.\n\n**The Fast Way (~20s):** $2k + 3k + 4k = 9k$ and $10 - 19 = -9$, so $9k - 9 = 180$, giving $k = 21$.\n\n**The Full Solution:**\nStep 1: Set the sum of the three expressions equal to $180$: $2k + (3k + 10) + (4k - 19) = 180$.\nStep 2: Combine like terms: $9k - 9 = 180$.\nStep 3: Add $9$ to both sides and divide by $9$: $9k = 189$, so $k = 21$. Check: the angles measure $2(21) = 42^\\circ$, $3(21) + 10 = 73^\\circ$, and $4(21) - 19 = 65^\\circ$, and $42 + 73 + 65 = 180$ ✓\n\n**Common Mistakes:**\n* $20$: dropping the constants and solving $9k = 180$. The $+10$ and $-19$ do not cancel; together they contribute $-9$.\n* $19$: mis-signing the constants and solving $9k + 9 = 180$, which gives $9k = 171$.\n* $41$: using $360^\\circ$ instead of $180^\\circ$, which gives $9k = 369$. A triangle's interior angles sum to $180^\\circ$; $360^\\circ$ belongs to a quadrilateral.\n\n**Test Day Takeaway:** Collect the variable terms and the constant terms separately before solving — the constants inside the angle expressions are exactly where careless work loses the point.",
      skills: ["triangle-angle-sum"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A city water utility charges a fixed monthly service fee plus a constant rate per hundred cubic feet (CCF) of water used. The table gives the total monthly charge $C$, in dollars, for three amounts of water used $w$, in CCF. Which equation gives $C$ in terms of $w$?",
      questionTable: { headers: ["Water used, $w$ (CCF)", "Total charge, $C$ (dollars)"], rows: [["$4$", "$38$"], ["$9$", "$63$"], ["$15$", "$93$"]] },
      choices: [
        { id: "A", text: "$C = 5w + 18$" },
        // distractor: treats the first row as a pure rate, 38 / 4 = 9.5, and drops the fixed fee
        { id: "B", text: "$C = 9.5w$" },
        // distractor: swaps the rate and the fixed fee, using 18 per CCF and a 5 dollar fee
        { id: "C", text: "$C = 18w + 5$" },
        // distractor: uses the raw change in charge, 63 - 38 = 25, as the rate without dividing by the 5 CCF change
        { id: "D", text: "$C = 25w + 18$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice A is correct.** A fixed fee plus a constant rate is a linear model $C = mw + b$, where $m$ is the rate per CCF and $b$ is the fee charged even at zero usage.\n\n**The Fast Way (~25s):** From the first two rows the charge rises $\\$25$ over $5$ CCF, so $m = 5$. Then $38 - 5(4) = 18$ is the fixed fee.\n\n**The Full Solution:**\nStep 1: Find the rate from any two rows: $m = \\dfrac{63 - 38}{9 - 4} = \\dfrac{25}{5} = 5$ dollars per CCF.\nStep 2: Substitute one row to find the fee: $38 = 5(4) + b$, so $b = 38 - 20 = 18$ dollars.\nStep 3: The model is $C = 5w + 18$. Check the third row: $5(15) + 18 = 75 + 18 = 93$, matching the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($C = 9.5w$): divides the first row's charge by its usage, $38 \\div 4 = 9.5$, as if the whole bill were usage. That model gives $9.5(9) = 85.5$ for $9$ CCF, not $\\$63$.\n* Choice C ($C = 18w + 5$): swaps the rate and the fee. It gives $18(4) + 5 = \\$77$ for $4$ CCF, far above the table's $\\$38$.\n* Choice D ($C = 25w + 18$): uses the raw rise of $\\$25$ as the rate without dividing by the $5$ CCF that produced it. It gives $25(4) + 18 = \\$118$ for $4$ CCF.\n\n**Test Day Takeaway:** In any fixed-fee-plus-rate table, the rate is a difference divided by a difference, and the fee is what is left after you subtract the rate's share — then confirm the model on a row you did not use.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 12,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A cylindrical laboratory incubator drum has radius $r$ centimeters and height $30$ centimeters. A second drum of the same height has a radius $50\\%$ greater. Which expression gives how many more cubic centimeters the second drum holds?",
      choices: [
        // distractor: squares only the increase: 30(0.5)^2 = 7.5
        { id: "A", text: "$7.5\\pi r^2$" },
        // distractor: scales the volume by 1.5 instead of 1.5^2: 45 - 30 = 15
        { id: "B", text: "$15\\pi r^2$" },
        // distractor: gives the original drum's volume, 30 pi r^2, instead of the increase
        { id: "C", text: "$30\\pi r^2$" },
        { id: "D", text: "$37.5\\pi r^2$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice D is correct.** Volume is $\\pi r^2 h$, so multiplying the radius by $1.5$ multiplies the volume by $1.5^2 = 2.25$, and the question asks for the difference between the two volumes.\n\n**The Fast Way (~30s):** $1.5^2 = 2.25$, so the second drum holds $2.25$ times as much; the extra is $1.25 \\times 30\\pi r^2 = 37.5\\pi r^2$.\n\n**The Full Solution:**\nStep 1: The first drum's volume is $V_1 = \\pi r^2 (30) = 30\\pi r^2$.\nStep 2: The second drum has radius $1.5r$ and the same height, so $V_2 = \\pi (1.5r)^2 (30) = \\pi (2.25 r^2)(30) = 67.5\\pi r^2$.\nStep 3: The increase is $V_2 - V_1 = 67.5\\pi r^2 - 30\\pi r^2 = 37.5\\pi r^2$. Check with $r = 2$: $V_1 = 120\\pi$ and $V_2 = \\pi(3)^2(30) = 270\\pi$, a difference of $150\\pi$, and $37.5\\pi(2)^2 = 150\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7.5\\pi r^2$): squares the $50\\%$ by itself, $30(0.5)^2 = 7.5$, instead of squaring the whole factor $1.5$.\n* Choice B ($15\\pi r^2$): scales the volume by $1.5$ rather than by $1.5^2$, giving $45\\pi r^2 - 30\\pi r^2 = 15\\pi r^2$. The radius is squared in the volume formula, so a $50\\%$ radius increase is more than a $50\\%$ volume increase.\n* Choice C ($30\\pi r^2$): reports the original drum's volume instead of the extra capacity the redesign adds.\n\n**Test Day Takeaway:** Scaling a radius by $c$ scales a cylinder's volume by $c^2$, not by $c$ — and when a question asks \"how much more,\" the final step is always a subtraction.",
      skills: ["volume-prism"]
    },
    {
      id: 13,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A resurfacing crew lays asphalt at a constant rate of $240$ square feet per minute. Working at that rate for one hour, how many square yards of asphalt does the crew lay?",
      correctAnswer: "1600",
      explanation: "**SAT Pattern: Unit Conversion**\n\n**The correct answer is $1600$.** Two conversions are needed: minutes to an hour, and square feet to square yards.\n\n**The Fast Way (~25s):** $240 \\times 60 = 14{,}400$ square feet in an hour, and $14{,}400 \\div 9 = 1600$ square yards.\n\n**The Full Solution:**\nStep 1: One hour is $60$ minutes, so the crew lays $240 \\times 60 = 14{,}400$ square feet.\nStep 2: One yard is $3$ feet, so one square yard is $3 \\times 3 = 9$ square feet.\nStep 3: Convert: $14{,}400 \\div 9 = 1600$ square yards. Check: $1600$ square yards is $1600 \\times 9 = 14{,}400$ square feet, and $14{,}400 \\div 60 = 240$ square feet per minute ✓\n\n**Common Mistakes:**\n* $14400$: stopping after the time conversion and reporting square feet when the question asks for square yards.\n* $4800$: dividing by $3$ instead of $9$. The factor $3$ converts lengths; areas need that factor squared.\n* $129600$: multiplying by $9$ instead of dividing. A square yard is larger than a square foot, so the count of square yards must be smaller.\n\n**Test Day Takeaway:** Squared units convert by the square of the length factor — $1$ yd $= 3$ ft means $1$ yd$^2 = 9$ ft$^2$ — and a larger unit always yields a smaller number.",
      skills: ["unit-conversion"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A scene shop cuts a triangular flat whose corners fall at $(0, 2)$, $(9, 2)$, and $(4, 8)$ on a layout grid marked in feet. How many square feet of plywood does the flat use?",
      choices: [
        // distractor: adds the base and the height, 9 + 6 = 15, instead of using the area formula
        { id: "A", text: "$15$" },
        { id: "B", text: "$27$" },
        // distractor: uses 8 as the height, measured from the x-axis instead of from the line y = 2: (1/2)(9)(8) = 36
        { id: "C", text: "$36$" },
        // distractor: multiplies base by height without halving: 9 x 6 = 54
        { id: "D", text: "$54$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice B is correct.** Two corners share the height $y = 2$, so that side is a horizontal base of length $9$, and the height is the vertical distance from the third corner up to that base.\n\n**The Fast Way (~25s):** Base $= 9 - 0 = 9$, height $= 8 - 2 = 6$, so the area is $\\tfrac{1}{2}(9)(6) = 27$ square feet.\n\n**The Full Solution:**\nStep 1: The corners $(0, 2)$ and $(9, 2)$ lie on the same horizontal line, so the segment joining them is a base of length $9 - 0 = 9$ feet.\nStep 2: The height is the perpendicular distance from $(4, 8)$ to the line $y = 2$, which is $8 - 2 = 6$ feet.\nStep 3: Area $= \\tfrac{1}{2}(9)(6) = 27$ square feet. Check: the triangle fits inside the $9$-by-$6$ rectangle spanning $x$ from $0$ to $9$ and $y$ from $2$ to $8$, and it fills exactly half of that $54$-square-foot rectangle ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): adds the base and the height, $9 + 6 = 15$. That is a perimeter-style move, not an area.\n* Choice C ($36$): uses $8$ as the height, measuring from the $x$-axis instead of from the base line $y = 2$, giving $\\tfrac{1}{2}(9)(8) = 36$.\n* Choice D ($54$): multiplies base by height and forgets the factor of $\\tfrac{1}{2}$; $54$ is the area of the surrounding rectangle.\n\n**Test Day Takeaway:** Look for two vertices with a shared coordinate — that side is your base, and the height is the distance from the third vertex to that line, not to an axis.",
      skills: ["triangle-area"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Two lighting trusses are hung perpendicular to each other over a stage. On the lighting plot, one truss lies along the line $3x - 12y = 24$. Which equation could describe the other truss?",
      choices: [
        { id: "A", text: "$y = -4x + 5$" },
        // distractor: negates the slope 1/4 without taking the reciprocal
        { id: "B", text: "$y = -\\dfrac{1}{4}x + 5$" },
        // distractor: keeps the slope 1/4, which is parallel to the first truss, not perpendicular
        { id: "C", text: "$y = \\dfrac{1}{4}x + 5$" },
        // distractor: takes the reciprocal 4 without negating it
        { id: "D", text: "$y = 4x + 5$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Perpendicular Slope**\n\n**Choice A is correct.** The given truss has slope $\\tfrac{1}{4}$, so a perpendicular truss must have the negative reciprocal slope, $-4$.\n\n**The Fast Way (~20s):** Solve for $y$: $3x - 12y = 24$ becomes $y = \\tfrac{1}{4}x - 2$, slope $\\tfrac{1}{4}$. The perpendicular slope is $-4$.\n\n**The Full Solution:**\nStep 1: Put the given equation in slope-intercept form: $-12y = -3x + 24$, so $y = \\tfrac{1}{4}x - 2$.\nStep 2: The slope of the first truss is $m = \\tfrac{1}{4}$.\nStep 3: Perpendicular slopes multiply to $-1$, so the second slope is $-\\tfrac{1}{m} = -4$, and $y = -4x + 5$ is the only choice with that slope. Check: $\\tfrac{1}{4} \\times (-4) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($y = -\\tfrac{1}{4}x + 5$): negates the slope but never flips it; $\\tfrac{1}{4} \\times \\left(-\\tfrac{1}{4}\\right) = -\\tfrac{1}{16}$, not $-1$.\n* Choice C ($y = \\tfrac{1}{4}x + 5$): keeps the same slope, so this truss runs parallel to the first one, never crossing it.\n* Choice D ($y = 4x + 5$): flips the slope but leaves it positive; $\\tfrac{1}{4} \\times 4 = 1$, not $-1$.\n\n**Test Day Takeaway:** Perpendicular means flip and negate — both moves, every time. Getting the equation into $y = mx + b$ first keeps the sign of the slope honest.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A single dose of a medication is given at hour $0$. The table shows the blood concentration measured at four later times, and the concentration keeps falling in the same pattern. What will the concentration be, in milligrams per liter, at hour $15$?",
      questionTable: { headers: ["Hours after the dose", "Concentration (mg/L)"], rows: [["$3$", "$120$"], ["$6$", "$60$"], ["$9$", "$30$"], ["$12$", "$15$"]] },
      correctAnswer: "7.5",
      explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**The correct answer is $7.5$.** Each $3$-hour step multiplies the concentration by the same factor, $\\tfrac{1}{2}$, so hour $15$ is one more halving past hour $12$.\n\n**The Fast Way (~20s):** The readings halve every $3$ hours, so after hour $12$'s $15$ mg/L the next value is $15 \\div 2 = 7.5$ mg/L.\n\n**The Full Solution:**\nStep 1: Compare consecutive rows: $120 \\to 60 \\to 30 \\to 15$. Each ratio is $\\tfrac{1}{2}$, so the decay is exponential with a $3$-hour half-life.\nStep 2: Hour $15$ is one $3$-hour step past hour $12$.\nStep 3: Multiply the hour-$12$ value by $\\tfrac{1}{2}$: $15 \\times \\tfrac{1}{2} = 7.5$ mg/L. Check: modeling from the first row, $120 \\left(\\tfrac{1}{2}\\right)^{4} = 120 \\div 16 = 7.5$, since hour $15$ is four steps past hour $3$ ✓\n\n**Common Mistakes:**\n* $15$: reading the hour-$12$ entry straight off the table instead of extending it one more step to hour $15$.\n* $3.75$: taking two more steps and landing on hour $18$. From hour $12$, only one $3$-hour step is needed.\n* $0$: treating the decline as a constant drop of $15$ mg/L per $3$ hours, giving $15 - 15 = 0$. The drops shrink ($60$, then $30$, then $15$), which is the signature of a ratio, not a difference.\n\n**Test Day Takeaway:** Check consecutive ratios before consecutive differences — a constant ratio means exponential, and then you extend the table by multiplying, never by subtracting.",
      skills: ["exponential-growth-decay"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A county immunization program's monthly appointment total fell by $25\\%$ from January to February and then rose by $50\\%$ from February to March, ending at $720$ appointments in March. How many appointments were scheduled in January?",
      choices: [
        // distractor: undoes only the 50% increase: 720 / 1.5 = 480, the February total
        { id: "A", text: "$480$" },
        // distractor: treats the two changes as one net 25% increase: 720 / 1.25 = 576
        { id: "B", text: "$576$" },
        { id: "C", text: "$640$" },
        // distractor: undoes only the 25% decrease: 720 / 0.75 = 960
        { id: "D", text: "$960$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**Choice C is correct.** The two changes multiply, so March $=$ January $\\times 0.75 \\times 1.5$, and January is found by dividing $720$ by that combined factor.\n\n**The Fast Way (~30s):** $0.75 \\times 1.5 = 1.125$, so January $= 720 \\div 1.125 = 640$.\n\n**The Full Solution:**\nStep 1: A $25\\%$ decrease multiplies by $1 - 0.25 = 0.75$; a $50\\%$ increase multiplies by $1 + 0.50 = 1.5$.\nStep 2: Let $J$ be the January total. Then $J(0.75)(1.5) = 720$, so $1.125J = 720$.\nStep 3: $J = 720 \\div 1.125 = 640$ appointments. Check: $640 \\times 0.75 = 480$ in February, and $480 \\times 1.5 = 720$ in March ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($480$): undoes only the $50\\%$ increase, $720 \\div 1.5 = 480$. That is the February total, not the January one.\n* Choice B ($576$): treats a $25\\%$ drop followed by a $50\\%$ rise as a single $25\\%$ net rise and computes $720 \\div 1.25 = 576$. Percent changes compound on different bases, so they never simply add or subtract.\n* Choice D ($960$): undoes only the $25\\%$ decrease, $720 \\div 0.75 = 960$, ignoring the March increase entirely.\n\n**Test Day Takeaway:** Chain percent changes as multipliers, then divide once by the product to run the chain backward — adding and subtracting the percents is the trap this item is built around.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 18,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A mixing console's gain chart lists $\\dfrac{27^{2x}}{9^{x + 3}}$ beside $3^{kx - 6}$ and notes that the two agree at every setting $x$. What is the value of the constant $k$?",
      choices: [
        // distractor: divides the exponents, 6x / 2x = 3, instead of subtracting them
        { id: "A", text: "$3$" },
        { id: "B", text: "$4$" },
        // distractor: rewrites 9^(x+3) as 3^(x+3), forgetting 9 = 3^2, which leaves 3^(5x-3)
        { id: "C", text: "$5$" },
        // distractor: uses only the numerator's exponent, 6x, and never divides
        { id: "D", text: "$6$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice B is correct.** Writing $27$ and $9$ as powers of $3$ turns the quotient into $3^{4x - 6}$, so $k = 4$.\n\n**The Fast Way (~30s):** $27^{2x} = 3^{6x}$ and $9^{x+3} = 3^{2x+6}$; subtracting exponents gives $3^{6x - (2x+6)} = 3^{4x-6}$, so $k = 4$.\n\n**The Full Solution:**\nStep 1: Rewrite the numerator with base $3$: $27 = 3^3$, so $27^{2x} = \\left(3^3\\right)^{2x} = 3^{6x}$.\nStep 2: Rewrite the denominator: $9 = 3^2$, so $9^{x+3} = \\left(3^2\\right)^{x+3} = 3^{2x+6}$.\nStep 3: Divide by subtracting exponents: $3^{6x - 2x - 6} = 3^{4x - 6}$. Matching this with $3^{kx-6}$ gives $k = 4$. Check at $x = 2$: $\\dfrac{27^{4}}{9^{5}} = \\dfrac{531441}{59049} = 9$, and $3^{4(2)-6} = 3^2 = 9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): divides the exponents, $6x \\div 2x = 3$, instead of subtracting them. Division of powers subtracts exponents; it does not divide them.\n* Choice C ($5$): rewrites $9^{x+3}$ as $3^{x+3}$, forgetting that $9 = 3^2$. That leaves $3^{6x - x - 3} = 3^{5x - 3}$, whose constant term $-3$ does not even match the given $-6$.\n* Choice D ($6$): reads off the numerator's exponent $6x$ and skips the division entirely.\n\n**Test Day Takeaway:** Convert every base to the same prime first, then apply one rule at a time — power to a power multiplies, and division subtracts. The constant term is a free check that your rewrite is right.",
      skills: ["exponent-laws"]
    },
    {
      id: 19,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "A hospital district polled $500$ randomly chosen residents about access to a primary care provider, and $285$ of them had one. The plausible range the district published for the percent of all its residents with a provider has an upper bound of $61.4\\%$. What margin of error, in percentage points, does that range imply?",
      correctAnswer: "4.4",
      explanation: "**SAT Pattern: Margin of Error**\n\n**The correct answer is $4.4$.** A plausible range is centered on the sample percent, so the distance from that percent out to either endpoint is the margin of error.\n\n**The Fast Way (~35s):** $285$ of $500$ is $57\\%$, and the range reaches $61.4\\%$, so the margin is $61.4 - 57 = 4.4$ percentage points.\n\n**The Full Solution:**\nStep 1: Convert the poll result to a percent: $\\dfrac{285}{500} = 0.57$, so the sample percent is $57\\%$.\nStep 2: The plausible range runs from sample percent $-$ margin to sample percent $+$ margin, so its upper bound is $57\\% +$ margin.\nStep 3: Margin $= 61.4 - 57 = 4.4$ percentage points. Check: the range is then $52.6\\%$ to $61.4\\%$, whose center $\\dfrac{52.6 + 61.4}{2} = 57\\%$ is the sample percent ✓\n\n**Common Mistakes:**\n* $2.2$: halving the $4.4$-point gap, applying the \"margin is half the width\" rule to a gap that already runs from the center to one endpoint. Halving is for the distance between the two endpoints.\n* $8.8$: doubling the gap, as if $57\\%$ were an endpoint and $61.4\\%$ the center. The sample percent is always the center.\n* $57$: reporting the sample percent itself instead of its distance to the endpoint.\n\n**Test Day Takeaway:** Locate the center before you touch the arithmetic: the sample percent sits at the middle of a plausible range, and the margin of error is the distance from it to an endpoint — half the width only when both endpoints are given.",
      skills: ["margin-of-error"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A traffic engineer counted the vehicles making a left turn at an intersection during each of eight five-minute periods. Seven of the counts were $38$, $41$, $44$, $45$, $49$, $52$, and $55$, and the median of all eight counts was $46$. What was the eighth count?",
      choices: [
        // distractor: pairs the median with 49 instead of 45: 2(46) - 49 = 43
        { id: "A", text: "$43$" },
        // distractor: reports the middle value of the seven listed counts, 45
        { id: "B", text: "$45$" },
        // distractor: assumes the eighth count equals the median, 46
        { id: "C", text: "$46$" },
        { id: "D", text: "$47$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Median Calculation**\n\n**Choice D is correct.** With eight values the median is the average of the 4th and 5th in order, and the missing count has to land in the 5th position for that average to be $46$.\n\n**The Fast Way (~35s):** The listed values put $45$ in the 4th slot, so the 5th value must satisfy $\\dfrac{45 + v}{2} = 46$, giving $v = 47$.\n\n**The Full Solution:**\nStep 1: The seven listed counts in order are $38$, $41$, $44$, $45$, $49$, $52$, $55$. Adding an eighth value makes the median the mean of the 4th and 5th ordered values.\nStep 2: Suppose the eighth count falls between $45$ and $49$. Then the ordered list is $38$, $41$, $44$, $45$, $v$, $49$, $52$, $55$, so the median is $\\dfrac{45 + v}{2}$.\nStep 3: Set $\\dfrac{45 + v}{2} = 46$, so $45 + v = 92$ and $v = 47$, which does lie between $45$ and $49$ as assumed. Check: the full ordered list is $38$, $41$, $44$, $45$, $47$, $49$, $52$, $55$, and $\\dfrac{45 + 47}{2} = 46$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($43$): pairs the median with $49$ instead of $45$, computing $2(46) - 49 = 43$. Inserting $43$ actually gives ordered 4th and 5th values of $44$ and $45$, a median of $44.5$.\n* Choice B ($45$): reports the middle of the seven listed counts. Inserting $45$ makes both middle values $45$, so the median would be $45$, not $46$.\n* Choice C ($46$): assumes the missing value equals the median. Inserting $46$ gives middle values $45$ and $46$, a median of $45.5$.\n\n**Test Day Takeaway:** With an even count the median is an average of two entries, so back-solving means asking which slot the unknown fills — then verify by rebuilding the ordered list.",
      skills: ["find-median"]
    },
    {
      id: 21,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "Line $\\ell$ in the figure is the centerline of a proposed levee. A second engineer writes that same centerline as $12x + 8y = c$. What must $c$ equal for the two descriptions to agree?",
      diagram: { type: "linearGraph", params: { slope: -1.5, yIntercept: 6, xRange: [-2, 6], yRange: [-4, 10], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, label: "ℓ" } },
      choices: [
        // distractor: copies the constant 12 from 3x + 2y = 12 without scaling it
        { id: "A", text: "$12$" },
        // distractor: adds the scale factor 4 to 12 instead of multiplying: 12 + 4 = 16
        { id: "B", text: "$16$" },
        { id: "C", text: "$48$" },
        // distractor: compares the second equation's x-coefficient 12 with l's y-coefficient 2 to get a factor of 6, then computes 6 x 12 = 72
        { id: "D", text: "$72$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice C is correct.** Two equations describe the same line only when one is a constant multiple of the other — the condition that makes their system have infinitely many solutions.\n\n**The Fast Way (~35s):** The graph gives $3x + 2y = 12$. Multiplying every term by $4$ gives $12x + 8y = 48$, so $c = 48$.\n\n**The Full Solution:**\nStep 1: Read line $\\ell$ off the figure: it crosses the $y$-axis at $(0, 6)$ and the $x$-axis at $(4, 0)$, so its slope is $\\dfrac{0 - 6}{4 - 0} = -\\dfrac{3}{2}$ and $y = -\\dfrac{3}{2}x + 6$, which rearranges to $3x + 2y = 12$.\nStep 2: For $12x + 8y = c$ to be the same line, every coefficient must be scaled by one common factor. Here $12 \\div 3 = 4$ and $8 \\div 2 = 4$, so the factor is $4$.\nStep 3: The constant must be scaled by that same factor: $c = 4 \\times 12 = 48$. Check: $(4, 0)$ gives $12(4) + 8(0) = 48$, and $(0, 6)$ gives $12(0) + 8(6) = 48$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): copies the constant from $3x + 2y = 12$ and leaves it unscaled, even though both coefficients were multiplied by $4$. Testing $(0, 6)$ in $12x + 8y = 12$ gives $48 \\neq 12$.\n* Choice B ($16$): adds the scale factor to the constant, $12 + 4 = 16$, instead of multiplying. Scaling an equation multiplies every term, including the constant.\n* Choice D ($72$): builds the factor by comparing $12$ with $\\ell$'s $y$-coefficient $2$, getting $6$, and then computes $6 \\times 12 = 72$. Coefficients must be compared term by term: $x$ with $x$, $y$ with $y$.\n\n**Test Day Takeaway:** Same line, infinitely many solutions, and \"one equation is a multiple of the other\" all mean the same thing — find the factor from a matching pair of coefficients, then apply it to the constant and verify with a point.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 22,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "At a screening clinic, $400$ people were tested and $60\\%$ of them were adults. Of the adults tested, $20\\%$ received a positive result, and of the people tested who were not adults, $15\\%$ received a positive result. If one person with a positive result is selected at random, what is the probability that the person is an adult?",
      correctAnswer: "2/3",
      explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**The correct answer is $\\frac{2}{3}$.** The condition \"a person with a positive result\" shrinks the pool to the people who tested positive, so that count becomes the denominator.\n\n**The Fast Way (~40s):** Adults: $0.60(400) = 240$, of whom $48$ tested positive. Non-adults: $160$, of whom $24$ tested positive. So the probability is $\\dfrac{48}{48 + 24} = \\dfrac{2}{3}$.\n\n**The Full Solution:**\nStep 1: Split the $400$ people: adults $= 0.60(400) = 240$, and non-adults $= 400 - 240 = 160$.\nStep 2: Count the positives in each group: $0.20(240) = 48$ adults and $0.15(160) = 24$ non-adults, for $48 + 24 = 72$ positives in all.\nStep 3: Restrict to the $72$ positives: $\\dfrac{48}{72} = \\dfrac{2}{3}$. Check: $\\dfrac{24}{72} = \\dfrac{1}{3}$ of the positives are non-adults, and $\\dfrac{2}{3} + \\dfrac{1}{3} = 1$ ✓\n\n**Common Mistakes:**\n* $0.6$: reporting the share of adults among everyone tested. That ignores the condition, which restricts the pool to people who tested positive.\n* $0.2$: reporting the chance an adult tests positive. That is the reverse conditional, with adults as the pool instead of positives.\n* $\\frac{1}{3}$: computing $\\dfrac{24}{72}$, the probability that a positive result belongs to a non-adult.\n\n**Test Day Takeaway:** In a conditional probability the given condition names the denominator — build both counts first, then divide the group you want by the whole conditioned pool.",
      skills: ["conditional-probability"]
    }
  ]
};

export default practiceTest9M2Easy;
