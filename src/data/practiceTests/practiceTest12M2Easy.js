// Practice Test 12 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Official-calibration recreation (2026-09-01): all content re-authored
// fresh against the CB register (docs/TEST_RECREATION_SPEC.md); slot
// metadata and SAT Pattern headers frozen. Figure density lifted to 4
// diagram items (Q9 barChart, Q12 rightTriangle, Q16 scatterplot, Q21 table).
// Scenario families: airport shuttle vans, minigolf, escape rooms, riverboat.

export const practiceTest12M2Easy = {
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
      question: "The table lists the total number of parcels sorted by each of two constant-rate sorting lines after $h$ hours at a distribution center. For how many values of $h$ do the two lines have the same total?",
      questionTable: { headers: ["$h$", "Line A total", "Line B total"], rows: [["$1$", "$340$", "$415$"], ["$2$", "$620$", "$695$"], ["$3$", "$900$", "$975$"]] },
      choices: [
        { id: "A", text: "Zero" },
        // distractor: assumes two different lines must cross somewhere, ignoring that both totals climb by the same 280 parcels per hour
        { id: "B", text: "Exactly one" },
        // distractor: treats the two totals as curves that could meet twice; two linear models meet at most once
        { id: "C", text: "Exactly two" },
        // distractor: reads the fixed 75-parcel gap as the two lines being the same line
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Both totals rise by $280$ parcels every hour, so the $75$-parcel gap between them never closes. Equal slopes with different starting totals means the lines are parallel and share no point.\n\n**The Full Solution:**\nStep 1: Find each rate. Line A: $620 - 340 = 280$ and $900 - 620 = 280$. Line B: $695 - 415 = 280$ and $975 - 695 = 280$. Both lines have slope $280$.\nStep 2: Extend each model back to $h = 0$. Line A started at $340 - 280 = 60$ parcels and Line B at $415 - 280 = 135$, so $A = 280h + 60$ and $B = 280h + 135$.\nStep 3: Set them equal: $280h + 60 = 280h + 135$. Subtracting $280h$ leaves $60 = 135$, which is false for every $h$, so there is no solution. Check the table: the gap is $415 - 340 = 75$, $695 - 620 = 75$, and $975 - 900 = 75$ — constant, never zero. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (Exactly one): a pair of lines usually crosses once, but that requires different slopes. Here both slopes are $280$, and $280h + 60 = 280h + 135$ has no solution at all.\n* Choice C (Exactly two): two straight-line models can agree at most once, so two matching hours is impossible for a system of two linear equations.\n* Choice D (Infinitely many): that would require the totals to match at every hour, but every row of the table shows Line B ahead by exactly $75$ parcels.\n\n**Test Day Takeaway:** Read the slopes out of the table first. Equal rates of change with different starting values is the signature of parallel lines, and a parallel pair has zero solutions.",
      skills: ["system-solution-types"]
    },
    {
      id: 2,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "On a harbor chart, buoy $M$ at $(3, -1)$ marks the midpoint of the straight channel between buoy $J$ at $(-5, 4)$ and buoy $K$. Which ordered pair gives the coordinates of buoy $K$?",
      choices: [
        // distractor: runs the doubling in the wrong direction, computing 2J - M instead of 2M - J
        { id: "A", text: "$(-13, 9)$" },
        // distractor: averages J with M again instead of continuing past M
        { id: "B", text: "$(-1, 1.5)$" },
        // distractor: computes M - J, the change from J to M, and reports it as a location
        { id: "C", text: "$(8, -5)$" },
        { id: "D", text: "$(11, -6)$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Going from $J$ to $M$ moves right $8$ and down $5$; repeating that step from $M$ lands on $(3 + 8, -1 - 5) = (11, -6)$.\n\n**The Full Solution:**\nStep 1: Let $K = (x, y)$. The midpoint formula gives $\\frac{-5 + x}{2} = 3$ and $\\frac{4 + y}{2} = -1$.\nStep 2: Multiply each equation by $2$: $-5 + x = 6$ and $4 + y = -2$.\nStep 3: Solve: $x = 11$ and $y = -6$, so $K = (11, -6)$. Check by taking the midpoint of $J$ and $K$: $\\left(\\frac{-5 + 11}{2}, \\frac{4 + (-6)}{2}\\right) = (3, -1)$, which is buoy $M$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-13, 9)$): doubles $J$ and subtracts $M$, computing $(2(-5) - 3,\\ 2(4) - (-1))$. That reverses which buoy is the endpoint and which is the midpoint.\n* Choice B ($(-1, 1.5)$): averages $J$ and $M$, giving $\\left(\\frac{-5 + 3}{2}, \\frac{4 - 1}{2}\\right)$. That is the midpoint of the half-channel, not the far end.\n* Choice C ($(8, -5)$): computes $M - J = (3 - (-5),\\ -1 - 4)$. That is the step from $J$ to $M$, not a position on the chart.\n\n**Test Day Takeaway:** The midpoint is the average of the endpoints, so the missing endpoint is $2M - J$. Confirm by re-averaging: the answer and the known endpoint must return the given midpoint.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A refrigerated locker is loaded with cartons of frozen peas weighing $14.5$ kilograms each on a steel dolly weighing $62$ kilograms. What is the least number of cartons $c$ for which $14.5c + 62 \\ge 250$?",
      choices: [
        // distractor: truncates 12.96 down to 12 instead of moving up to the next whole carton
        { id: "A", text: "$12$" },
        { id: "B", text: "$13$" },
        // distractor: divides 250 by 14.5 and ignores the 62-kilogram dolly, rounding 17.2 up
        { id: "C", text: "$18$" },
        // distractor: adds the dolly mass to 250 instead of subtracting it, rounding 21.5 up
        { id: "D", text: "$22$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $14.5c \\ge 188$ gives $c \\ge 12.96\\ldots$, and cartons come whole, so the least value is $13$.\n\n**The Full Solution:**\nStep 1: Subtract the dolly mass from both sides: $14.5c + 62 \\ge 250$ becomes $14.5c \\ge 188$.\nStep 2: Divide both sides by $14.5$: $c \\ge \\frac{188}{14.5} = 12.965\\ldots$\nStep 3: The least integer at or above $12.965\\ldots$ is $13$. Check: $14.5(13) + 62 = 188.5 + 62 = 250.5 \\ge 250$, while $14.5(12) + 62 = 236 < 250$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): rounds $12.96$ down. Twelve cartons give only $236$ kilograms, which misses the $250$-kilogram requirement.\n* Choice C ($18$): divides $250$ by $14.5$ to get $17.2$ and rounds up, forgetting that the $62$-kilogram dolly already counts toward the total.\n* Choice D ($22$): adds the dolly mass instead of subtracting it, dividing $312$ by $14.5$ to get $21.5$ and rounding up.\n\n**Test Day Takeaway:** Isolate the variable first, then round in the direction the inequality demands: for $c \\ge$ a decimal, always round up, even when the decimal part is tiny.",
      skills: ["inequalities"]
    },
    // ============================================================
    // Q4-Q16: Medium core (band 4-5)
    // ============================================================
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A haulage firm quotes $3(2x + k) - 12$ dollars for express handling and $5x + 21$ dollars for standard handling of $x$ pallets, where $k$ is a constant. The two quotes are equal when $x = 9$. What is the value of $k$?",
      choices: [
        // distractor: subtracts 12 from both sides instead of adding it, leaving 54 + 3k = 54
        { id: "A", text: "$0$" },
        // distractor: drops the -12 term entirely and solves 54 + 3k = 66
        { id: "B", text: "$4$" },
        { id: "C", text: "$8$" },
        // distractor: distributes the 3 onto 2x only, solving 54 + k - 12 = 66
        { id: "D", text: "$24$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** At $x = 9$ the standard quote is $66$, so $3(18 + k) = 78$, giving $18 + k = 26$ and $k = 8$.\n\n**The Full Solution:**\nStep 1: Substitute $x = 9$ into both expressions: $3(2 \\cdot 9 + k) - 12 = 3(18 + k) - 12$ and $5(9) + 21 = 66$.\nStep 2: Set them equal and distribute: $54 + 3k - 12 = 66$, so $3k + 42 = 66$.\nStep 3: Subtract $42$ and divide by $3$: $3k = 24$, so $k = 8$. Check with $k = 8$: $3(18 + 8) - 12 = 78 - 12 = 66$, which matches the standard quote of $66$ dollars. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): moves the $-12$ to the right side as a subtraction, solving $54 + 3k = 66 - 12 = 54$. The $-12$ is already on the left, so it must be added to both sides.\n* Choice B ($4$): ignores the $-12$ and solves $54 + 3k = 66$, giving $3k = 12$.\n* Choice D ($24$): distributes the $3$ only onto $2x$ and writes $54 + k - 12 = 66$, which loses the factor of $3$ on $k$.\n\n**Test Day Takeaway:** Substitute the given solution first, then distribute completely before combining. Every term inside the parentheses, constants included, gets the outside factor.",
      skills: ["solving-equations"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A telescope's declination axis lies along the line $ax + 15y = 60$ and its polar axis lies along the line $y = \\frac{5}{3}x - 7$, where $a$ is a constant. The two axes are perpendicular. What is the value of $a$?",
      choices: [
        // distractor: matches the given slope 5/3 instead of using its negative reciprocal
        { id: "A", text: "$-25$" },
        // distractor: flips 5/3 to 3/5 but keeps the slope positive
        { id: "B", text: "$-9$" },
        { id: "C", text: "$9$" },
        // distractor: negates 5/3 without flipping it
        { id: "D", text: "$25$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Perpendicular Slope**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The declination axis must have slope $-\\frac{3}{5}$. Since that line's slope is $-\\frac{a}{15}$, set $-\\frac{a}{15} = -\\frac{3}{5}$ and get $a = 9$.\n\n**The Full Solution:**\nStep 1: The polar axis has slope $\\frac{5}{3}$, so a perpendicular line has slope $-\\frac{3}{5}$, the negative reciprocal.\nStep 2: Put the other line in slope-intercept form: $15y = -ax + 60$, so $y = -\\frac{a}{15}x + 4$ and its slope is $-\\frac{a}{15}$.\nStep 3: Set the slopes equal: $-\\frac{a}{15} = -\\frac{3}{5}$, so $a = \\frac{3}{5}(15) = 9$. Check: with $a = 9$ the line is $9x + 15y = 60$, or $y = -\\frac{3}{5}x + 4$, and $\\left(-\\frac{3}{5}\\right)\\left(\\frac{5}{3}\\right) = -1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-25$): sets $-\\frac{a}{15} = \\frac{5}{3}$, using the polar axis's own slope. That would make the two axes parallel, not perpendicular.\n* Choice B ($-9$): sets $-\\frac{a}{15} = \\frac{3}{5}$, flipping the fraction but forgetting the negative sign that perpendicularity requires.\n* Choice D ($25$): sets $-\\frac{a}{15} = -\\frac{5}{3}$, negating the slope without flipping it. The product of the slopes would be $-\\frac{25}{9}$, not $-1$.\n\n**Test Day Takeaway:** Perpendicular means flip AND negate. Solve for $y$ before reading the slope off a line written in $Ax + By = C$ form.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A line is drawn through the two plotted points and extended downward to the right until its height is $y = -22$. What is the $x$-coordinate of the line at that height?",
      diagram: { type: "coordinatePoints", params: { points: [[-2, 6], [2, -2]], xMin: -6, xMax: 6, yMin: -4, yMax: 8 } },
      correctAnswer: "12",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~30s):** The plotted points $(-2, 6)$ and $(2, -2)$ give slope $-2$ and the line $y = -2x + 2$. Setting $-2x + 2 = -22$ gives $x = 12$.\n\n**The Full Solution:**\nStep 1: Read the plotted points from the grid: $(-2, 6)$ and $(2, -2)$. The slope is $\\frac{-2 - 6}{2 - (-2)} = \\frac{-8}{4} = -2$.\nStep 2: Find the $y$-intercept using $(2, -2)$: $-2 = -2(2) + b = -4 + b$, so $b = 2$ and the line is $y = -2x + 2$.\nStep 3: Set $y = -22$: $-2x + 2 = -22$, so $-2x = -24$ and $x = 12$. Check: $-2(12) + 2 = -24 + 2 = -22$. $\\checkmark$\n\n**Common Mistakes:** Entering $-12$ (dividing $-24$ by $2$ instead of by $-2$, so a negative divided by a negative is reported as negative); entering $11$ (taking $b = 0$, as if the line passed through the origin, and solving $-2x = -22$); entering $-24$ (stopping at $-2x = -24$ and reporting that value instead of dividing by the slope).\n\n**Test Day Takeaway:** Two plotted points give you slope and intercept in two moves; write the equation once, then plug in the target $y$ rather than counting squares off the edge of the grid.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "During a contact window a deep-space probe transmits $f(x) = 3x + c$ megabytes in $x$ hours, where the constant $c$ accounts for a fixed header block sent once per window. Given that $f(2) = 17$, what is the value of $f(6)$?",
      choices: [
        // distractor: uses the input 2 as the constant, computing 3(6) + 2
        { id: "A", text: "$20$" },
        { id: "B", text: "$29$" },
        // distractor: finds c = 17 - 2 = 15 by subtracting the input instead of 3 times the input
        { id: "C", text: "$33$" },
        // distractor: triples f(2), treating f as if it were proportional
        { id: "D", text: "$51$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Function Evaluation**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $f(2) = 6 + c = 17$ gives $c = 11$, so $f(6) = 18 + 11 = 29$.\n\n**The Full Solution:**\nStep 1: Substitute $x = 2$ into the rule: $f(2) = 3(2) + c = 6 + c$.\nStep 2: Set that equal to the given output: $6 + c = 17$, so $c = 11$ and the function is $f(x) = 3x + 11$.\nStep 3: Evaluate at $x = 6$: $f(6) = 3(6) + 11 = 18 + 11 = 29$. Check the rule against the given data point: $f(2) = 3(2) + 11 = 17$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): plugs the input $2$ in where the constant belongs, computing $3(6) + 2$. The number $2$ is an hour count, not the header size.\n* Choice C ($33$): finds $c = 17 - 2 = 15$ by subtracting the input rather than $3(2) = 6$, then computes $18 + 15$.\n* Choice D ($51$): multiplies $f(2)$ by $3$ because the input tripled. A function with a nonzero constant term is not proportional, so outputs do not scale with inputs.\n\n**Test Day Takeaway:** Pin the unknown constant with the given data point first, then evaluate. Never scale outputs in proportion to inputs unless the constant term is zero.",
      skills: ["function-evaluation"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Two straight paths on a site map are perpendicular. One is the service road $x + 2y = 14$; the other is a loading ramp through $(6, -3)$. The ramp's line reaches the $y$-axis at $y = b$. What is the value of $b$?",
      choices: [
        { id: "A", text: "$-15$" },
        // distractor: uses the service road's own slope -1/2 instead of the perpendicular slope 2
        { id: "B", text: "$0$" },
        // distractor: uses -2, the reciprocal of -1/2 with the negative sign left in place
        { id: "C", text: "$9$" },
        // distractor: substitutes the coordinates in reverse, using x = -3 and y = 6
        { id: "D", text: "$12$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The ramp has slope $2$, so $-3 = 2(6) + b$ gives $b = -15$.\n\n**The Full Solution:**\nStep 1: Solve the road's equation for $y$: $2y = -x + 14$, so $y = -\\frac{1}{2}x + 7$ and the road has slope $-\\frac{1}{2}$.\nStep 2: A perpendicular line has the negative reciprocal slope, so the ramp has slope $2$ and its equation is $y = 2x + b$.\nStep 3: Substitute the point $(6, -3)$: $-3 = 2(6) + b = 12 + b$, so $b = -15$. Check: the ramp is $y = 2x - 15$, and at $x = 6$ it gives $y = 12 - 15 = -3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($0$): substitutes with the road's own slope, $-3 = -\\frac{1}{2}(6) + b = -3 + b$. That builds a line parallel to the road, which never meets it at a right angle.\n* Choice C ($9$): uses slope $-2$, the reciprocal of $-\\frac{1}{2}$ with the sign left negative, giving $-3 = -12 + b$.\n* Choice D ($12$): plugs the point in backwards as $x = -3$, $y = 6$, computing $6 = 2(-3) + b$.\n\n**Test Day Takeaway:** Convert to slope-intercept form, flip and negate for the perpendicular slope, then substitute the point in the order $(x, y)$ — reversing it is the most common silent error.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 9,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Fifteen daily temperature readings from a fermentation vat have a mean of $4.5$ degrees Celsius. Every reading is converted to degrees Fahrenheit with $F = 1.8C + 32$. What is the mean, in degrees Fahrenheit, of the converted readings?",
      choices: [
        // distractor: multiplies the mean by 1.8 but never adds the 32
        { id: "A", text: "$8.1$" },
        // distractor: adds 32 to the mean without multiplying by 1.8
        { id: "B", text: "$36.5$" },
        { id: "C", text: "$40.1$" },
        // distractor: adds 32 to the mean first and then multiplies the sum by 1.8
        { id: "D", text: "$65.7$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** A mean transforms exactly the way each value does, so the new mean is $1.8(4.5) + 32 = 40.1$.\n\n**The Full Solution:**\nStep 1: Multiplying every value by $1.8$ multiplies the mean by $1.8$: the mean becomes $1.8(4.5) = 8.1$.\nStep 2: Adding $32$ to every value adds $32$ to the mean: $8.1 + 32 = 40.1$ degrees Fahrenheit.\nStep 3: Confirm with the totals. The $15$ Celsius readings sum to $15(4.5) = 67.5$, so the Fahrenheit readings sum to $1.8(67.5) + 15(32) = 121.5 + 480 = 601.5$, and $\\frac{601.5}{15} = 40.1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8.1$): applies only the multiplication, $1.8(4.5)$, and never adds the $32$-degree shift.\n* Choice B ($36.5$): applies only the shift, $4.5 + 32$, and never scales by $1.8$.\n* Choice D ($65.7$): adds first and multiplies second, computing $1.8(4.5 + 32)$. The conversion multiplies before it adds.\n\n**Test Day Takeaway:** Under $y = mx + k$ applied to every value, the mean follows the same rule: multiply the old mean by $m$, then add $k$, in that order.",
      skills: ["data-analysis"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A dryer removes water at a steady rate, so the moisture content of a rice batch, in grams per kilogram, after $n$ hours is modeled by $M(n) = 96 - 3n$. For what value of $n$ does $M(n)$ equal $42$?",
      choices: [
        // distractor: divides the output 42 by 3 and ignores the starting 96
        { id: "A", text: "$14$" },
        { id: "B", text: "$18$" },
        // distractor: adds 96 and 42 before dividing by 3 instead of subtracting
        { id: "C", text: "$46$" },
        // distractor: stops at 3n = 54 without dividing by 3
        { id: "D", text: "$54$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $96 - 3n = 42$ gives $3n = 54$, so $n = 18$.\n\n**The Full Solution:**\nStep 1: Set the rule equal to the given output: $96 - 3n = 42$.\nStep 2: Move the variable term: add $3n$ to both sides and subtract $42$, giving $54 = 3n$.\nStep 3: Divide by $3$: $n = 18$ hours. Check by evaluating the model: $M(18) = 96 - 3(18) = 96 - 54 = 42$ grams per kilogram. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($14$): divides the target output by $3$, computing $\\frac{42}{3}$, and never subtracts from the starting moisture of $96$.\n* Choice C ($46$): adds instead of subtracts, computing $\\frac{96 + 42}{3}$. The $96$ is the starting value the drying removes from, not something added to the output.\n* Choice D ($54$): stops at $3n = 54$ and reports $54$, which is the drop in moisture content, not the number of hours.\n\n**Test Day Takeaway:** Solving $f(n) = c$ means substituting for the OUTPUT and solving for the input. Finish the division, then re-evaluate the model to confirm the output lands on $c$.",
      skills: ["function-notation"]
    },
    {
      id: 11,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A $40$-kilogram flour blend contains $x$ kilograms of oat flour and the rest barley flour, with the fiber contents given in the table. The total fiber in the blend, in grams, can be written as $ax + b$, where $a$ and $b$ are constants. What is the value of $a + b$?",
      questionTable: { headers: ["Flour", "Fiber per kilogram (grams)"], rows: [["Oat", "$96$"], ["Barley", "$132$"]] },
      correctAnswer: "5244",
      explanation: "**SAT Pattern: Matching Coefficients**\n\n**The correct answer is $5244$.**\n\n**The Fast Way (~35s):** Total fiber $= 96x + 132(40 - x) = 5280 - 36x$, so $a = -36$, $b = 5280$, and $a + b = 5244$.\n\n**The Full Solution:**\nStep 1: With $x$ kilograms of oat flour in a $40$-kilogram blend, the barley portion is $40 - x$ kilograms. Total fiber $= 96x + 132(40 - x)$ grams.\nStep 2: Distribute and collect like terms: $96x + 5280 - 132x = -36x + 5280$.\nStep 3: Match this to $ax + b$: the coefficient of $x$ is $a = -36$ and the constant term is $b = 5280$, so $a + b = -36 + 5280 = 5244$. Check at $x = 40$ (all oat flour): the expression gives $-36(40) + 5280 = -1440 + 5280 = 3840$, and $96(40) = 3840$ grams. $\\checkmark$\n\n**Common Mistakes:** Entering $5316$ (writing $a = 36$ from $132 - 96$ and losing the sign; oat flour has LESS fiber per kilogram, so total fiber falls as $x$ grows); entering $5280$ (reporting $b$ alone and forgetting to add $a$); entering $-36$ (reporting $a$ alone); entering $228$ (adding the two table values, $96 + 132$, instead of building the expression).\n\n**Test Day Takeaway:** Write the mixture expression, expand it completely, and read $a$ and $b$ off the collected form. The sign of $a$ comes from the subtraction, not from the larger table value.",
      skills: ["distributive-property"]
    },
    {
      id: 12,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A conveyor guard is shaped as a triangle whose two shorter sides are perpendicular. One of those sides is $5\\sqrt{2}$ centimeters long and the guard's surface is $60$ square centimeters. How long, in centimeters, is the other perpendicular side?",
      choices: [
        // distractor: omits the factor of 1/2 in the area formula, dividing 60 rather than 120 by 5 root 2
        { id: "A", text: "$6\\sqrt{2}$" },
        { id: "B", text: "$12\\sqrt{2}$" },
        // distractor: drops the radical and divides 120 by 5
        { id: "C", text: "$24$" },
        // distractor: multiplies by root 2 instead of dividing by it when clearing the radical
        { id: "D", text: "$24\\sqrt{2}$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $\\frac{1}{2}(5\\sqrt{2})h = 60$ gives $h = \\frac{120}{5\\sqrt{2}} = \\frac{24}{\\sqrt{2}} = 12\\sqrt{2}$.\n\n**The Full Solution:**\nStep 1: The two perpendicular sides are the legs, so the area is $\\frac{1}{2}(5\\sqrt{2})(h) = 60$, where $h$ is the unknown side.\nStep 2: Multiply both sides by $2$ and divide by $5\\sqrt{2}$: $h = \\frac{120}{5\\sqrt{2}} = \\frac{24}{\\sqrt{2}}$.\nStep 3: Rationalize: $\\frac{24}{\\sqrt{2}} \\cdot \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{24\\sqrt{2}}{2} = 12\\sqrt{2}$ centimeters. Check: $5\\sqrt{2} \\cdot 12\\sqrt{2} = 60 \\cdot 2 = 120$, and half of $120$ is $60$ square centimeters. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6\\sqrt{2}$): divides $60$ by $5\\sqrt{2}$ and skips the factor of $2$ that clearing $\\frac{1}{2}$ requires. That triangle would have area $30$ square centimeters.\n* Choice C ($24$): treats the given side as $5$ and computes $\\frac{120}{5}$, dropping the radical entirely.\n* Choice D ($24\\sqrt{2}$): multiplies $\\frac{120}{5} = 24$ by $\\sqrt{2}$ instead of dividing by it, doubling the true length.\n\n**Test Day Takeaway:** For a right triangle the legs are the base and height, so double the area before dividing by the known leg. When a radical lands in the denominator, rationalize and simplify before comparing to the choices.",
      skills: ["triangle-area"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "In a random sample of $240$ vans drawn from a regional delivery fleet, the mean odometer reading was $47.6$ thousand kilometers, and the associated margin of error was $2.3$ thousand kilometers. Which statement about odometer readings is best supported?",
      choices: [
        // distractor: doubles the margin of error before building the interval, giving 47.6 plus or minus 4.6
        { id: "A", text: "The mean odometer reading of all vans in the fleet is between $43.0$ and $52.2$ thousand kilometers." },
        // distractor: subtracts the margin but keeps the sample mean itself as the upper bound
        { id: "B", text: "The mean odometer reading of all vans in the fleet is between $45.3$ and $47.6$ thousand kilometers." },
        // distractor: attaches the interval to the 240 sampled vans, whose mean is already known exactly to be 47.6
        { id: "C", text: "The mean odometer reading of the $240$ sampled vans is between $45.3$ and $49.9$ thousand kilometers." },
        { id: "D", text: "The mean odometer reading of all vans in the fleet is between $45.3$ and $49.9$ thousand kilometers." }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Margin of Error**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The interval is the sample mean plus or minus the margin: $47.6 - 2.3 = 45.3$ and $47.6 + 2.3 = 49.9$, and it describes the whole fleet.\n\n**The Full Solution:**\nStep 1: A margin of error is applied to the sample mean in both directions to estimate the population value.\nStep 2: Lower bound $= 47.6 - 2.3 = 45.3$ thousand kilometers; upper bound $= 47.6 + 2.3 = 49.9$ thousand kilometers.\nStep 3: The population here is every van in the fleet, not the $240$ sampled, so the supported statement is that the fleet's mean lies between $45.3$ and $49.9$ thousand kilometers. Check the width: the interval spans $49.9 - 45.3 = 4.6$, which is twice the $2.3$ margin, as it must be. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($43.0$ to $52.2$): doubles the margin before applying it, using $\\pm 4.6$. The margin of error is already the full one-sided distance.\n* Choice B ($45.3$ to $47.6$): subtracts the margin but leaves the sample mean as the top of the interval, making it one-sided. A margin of error extends above the mean as well as below.\n* Choice C (the $240$ sampled vans): builds the right interval but attaches it to the sample. The sample's mean is known to be exactly $47.6$; the interval estimates the unknown population mean.\n\n**Test Day Takeaway:** Sample mean $\\pm$ margin of error, applied once in each direction, and the resulting interval always describes the POPULATION, never the sample you already measured.",
      skills: ["margin-of-error"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Two constraints of a scheduling model, $6x - 9y = 15$ and $kx + 12y = 7$, apply to the same pair of quantities, yet no ordered pair $(x, y)$ meets them both. What is the value of the constant $k$ in the second constraint?",
      choices: [
        // distractor: uses 3/2, the reciprocal of the first constraint's slope 2/3
        { id: "A", text: "$-18$" },
        { id: "B", text: "$-8$" },
        // distractor: matches the slopes but drops the minus sign that dividing by 12y introduces
        { id: "C", text: "$8$" },
        // distractor: flips the slope to 3/2 and also drops the minus sign
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** No solution means equal slopes. The first constraint has slope $\\frac{2}{3}$ and the second has slope $-\\frac{k}{12}$, so $-\\frac{k}{12} = \\frac{2}{3}$ and $k = -8$.\n\n**The Full Solution:**\nStep 1: Solve each constraint for $y$. From $6x - 9y = 15$: $9y = 6x - 15$, so $y = \\frac{2}{3}x - \\frac{5}{3}$. From $kx + 12y = 7$: $12y = -kx + 7$, so $y = -\\frac{k}{12}x + \\frac{7}{12}$.\nStep 2: Two linear equations have no common solution exactly when their slopes are equal and their $y$-intercepts differ: $-\\frac{k}{12} = \\frac{2}{3}$.\nStep 3: Solve: $k = -12 \\cdot \\frac{2}{3} = -8$. Check the intercepts: $-\\frac{5}{3}$ and $\\frac{7}{12}$ are different, so the lines are parallel and distinct rather than identical. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-18$): sets $-\\frac{k}{12} = \\frac{3}{2}$, inverting the first slope. Reading $6x - 9y = 15$ as slope $\\frac{9}{6}$ flips rise and run.\n* Choice C ($8$): sets $\\frac{k}{12} = \\frac{2}{3}$, forgetting that moving $kx$ across the equal sign makes the slope $-\\frac{k}{12}$.\n* Choice D ($18$): combines both slips, inverting the slope and dropping the sign.\n\n**Test Day Takeaway:** Put both equations in slope-intercept form before comparing. No solution needs equal slopes AND different intercepts — always confirm the intercepts differ, or the system has infinitely many solutions instead.",
      skills: ["system-solution-types"]
    },
    {
      id: 15,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A blending sheet lists $4x + 10y = 26$ beside $6x + cy = 39$ for the ingredient masses $x$ and $y$, in kilograms, and any masses that satisfy the first equation satisfy the second as well. What is the value of the constant $c$?",
      correctAnswer: "15",
      explanation: "**SAT Pattern: System Equivalence Check**\n\n**The correct answer is $15$.**\n\n**The Fast Way (~30s):** The constants scale by $\\frac{39}{26} = \\frac{3}{2}$, and $6 = \\frac{3}{2}(4)$ confirms it, so $c = \\frac{3}{2}(10) = 15$.\n\n**The Full Solution:**\nStep 1: If every solution of one equation solves the other, the two equations are multiples of each other, so all three matching parts share one scale factor.\nStep 2: Find the factor from the parts you know: $\\frac{6}{4} = \\frac{3}{2}$ from the $x$-coefficients and $\\frac{39}{26} = \\frac{3}{2}$ from the constants. They agree, so the factor is $\\frac{3}{2}$.\nStep 3: Apply it to the $y$-coefficient: $c = \\frac{3}{2}(10) = 15$. Check by scaling the whole first equation: $\\frac{3}{2}(4x + 10y = 26)$ gives $6x + 15y = 39$, matching the second line exactly. $\\checkmark$\n\n**Common Mistakes:** Entering $10$ (copying the $y$-coefficient from the first equation, as if only the other two terms changed); entering $6.67$ (scaling by $\\frac{26}{39} = \\frac{2}{3}$, the reciprocal of the correct factor); entering $12$ (adding the difference $6 - 4 = 2$ to $10$ instead of multiplying by $\\frac{3}{2}$ — equivalent equations scale, they do not shift).\n\n**Test Day Takeaway:** Equivalent equations means one is a constant multiple of the other. Read the factor off a pair of terms you can see, verify it on a second pair, then apply it to the unknown.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 16,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "During a meteor watch, an observer logged the number of meteors visible in each of $10$ consecutive one-hour sessions, and the dot plot displays those counts. What was the mean number of meteors per session?",
      diagram: { type: "dotPlot", params: { data: [{ value: 3, count: 1 }, { value: 4, count: 2 }, { value: 6, count: 1 }, { value: 7, count: 1 }, { value: 8, count: 3 }, { value: 10, count: 1 }, { value: 12, count: 1 }], xMin: 2, xMax: 13, xLabel: "Meteors per session" } },
      choices: [
        { id: "A", text: "$7$" },
        // distractor: reports the median, the average of the 5th and 6th dots
        { id: "B", text: "$7.5$" },
        // distractor: reports the mode, the value under the tallest stack
        { id: "C", text: "$8$" },
        // distractor: reports the range, 12 minus 3
        { id: "D", text: "$9$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Mean from List**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The ten dots sum to $70$, and $\\frac{70}{10} = 7$.\n\n**The Full Solution:**\nStep 1: Read one value per dot: $3, 4, 4, 6, 7, 8, 8, 8, 10, 12$. That is $10$ values, matching the $10$ sessions.\nStep 2: Add them, using the stacks: $3 + 2(4) + 6 + 7 + 3(8) + 10 + 12 = 3 + 8 + 6 + 7 + 24 + 10 + 12 = 70$.\nStep 3: Divide by the number of sessions: $\\frac{70}{10} = 7$ meteors per session. Check: $10 \\times 7 = 70$, which is the total counted. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($7.5$): averages the $5$th and $6$th ordered values, $7$ and $8$. That is the median, which a dot plot makes easy to find but is not what the question asks for.\n* Choice C ($8$): reads off the tallest stack, the mode. Three sessions had $8$ meteors, but the mean weighs every session.\n* Choice D ($9$): computes $12 - 3$, the range. That measures spread, not center.\n\n**Test Day Takeaway:** Every dot is a separate value, so multiply each value by its stack height, add, and divide by the total number of dots — not by the number of distinct positions.",
      skills: ["calculate-mean"]
    },
    // ============================================================
    // Q17-Q22: Medium-hard ceiling (band 6-7)
    // ============================================================
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A star tracker reports a guide star's vertical offset, in arcseconds, $t$ seconds after a correction begins as $D(t) = a(t - 4)^2 - 9$ for $0 \\le t \\le 8$, where $a$ is a constant, and the offset at $t = 0$ is $23$ arcseconds. Rewriting $D(t)$ in the form $at^2 + bt + c$, what is the value of $b$?",
      choices: [
        { id: "A", text: "$-16$" },
        // distractor: expands the square but never multiplies the middle term by a, reporting -2 times 4
        { id: "B", text: "$-8$" },
        // distractor: solves 16a - 9 = 23 as 16a = 14, getting a = 0.875 and then b = -7
        { id: "C", text: "$-7$" },
        // distractor: keeps the middle term positive, reporting +2 times 2 times 4
        { id: "D", text: "$16$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** $D(0) = 16a - 9 = 23$ gives $a = 2$, and the middle term of $a(t - 4)^2$ is $-8at = -16t$, so $b = -16$.\n\n**The Full Solution:**\nStep 1: Use the given offset at $t = 0$: $D(0) = a(0 - 4)^2 - 9 = 16a - 9$. Setting $16a - 9 = 23$ gives $16a = 32$, so $a = 2$.\nStep 2: Expand with $a = 2$: $2(t - 4)^2 - 9 = 2(t^2 - 8t + 16) - 9 = 2t^2 - 16t + 32 - 9$.\nStep 3: Collect: $D(t) = 2t^2 - 16t + 23$, so $b = -16$. Check the constant term against the given value: $c = 23$, which is exactly $D(0)$, as it must be. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-8$): expands $(t - 4)^2$ to $t^2 - 8t + 16$ and copies the $-8$ straight down, forgetting that every term inside gets multiplied by $a = 2$.\n* Choice C ($-7$): solves $16a - 9 = 23$ by subtracting $9$ instead of adding it, getting $16a = 14$ and $a = 0.875$, then $b = -8(0.875) = -7$.\n* Choice D ($16$): expands correctly in size but drops the minus sign; $(t - 4)^2$ has a NEGATIVE middle term because the binomial is a difference.\n\n**Test Day Takeaway:** Pin the leading coefficient with a known point first, then expand the square completely before distributing. In $a(t - h)^2 + k$ the middle coefficient is always $-2ah$, sign included.",
      skills: ["distributive-property", "converting-quadratic-forms"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "A two-stage image filter processes an input $a$ by first applying $g(x) = (x - 2)^2$ and then applying $f(x) = 3x - 7$ to the value that $g$ returns. For one input the filter's output is $41$. What is the greatest possible value of $a$?",
      correctAnswer: "6",
      explanation: "**SAT Pattern: Function Composition**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~40s):** $3(a - 2)^2 - 7 = 41$ gives $(a - 2)^2 = 16$, so $a - 2 = \\pm 4$ and the greater input is $a = 6$.\n\n**The Full Solution:**\nStep 1: Write the composition in order. The inner stage gives $g(a) = (a - 2)^2$, and the outer stage gives $f(g(a)) = 3(a - 2)^2 - 7 = 41$.\nStep 2: Undo the outer stage: add $7$ to both sides for $3(a - 2)^2 = 48$, then divide by $3$ for $(a - 2)^2 = 16$.\nStep 3: Take both square roots: $a - 2 = 4$ or $a - 2 = -4$, so $a = 6$ or $a = -2$. The greater value is $6$. Check: $g(6) = (6 - 2)^2 = 16$ and $f(16) = 3(16) - 7 = 41$. $\\checkmark$\n\n**Common Mistakes:** Entering $-2$ (the other valid input; the question asks for the GREATEST value, so both roots must be found and compared); entering $18$ (writing $a - 2 = 16$ without taking the square root of both sides); entering $4$ (stopping at $a - 2 = 4$ and never adding the $2$ back).\n\n**Test Day Takeaway:** Work a composition from the outside in, undoing one stage at a time. A squared expression yields two roots, so solve for both and then answer the question that was actually asked.",
      skills: ["function-composition"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "At a rail yard with $n$ stacking rows, where $n$ is an integer greater than $1$, the ratio of loaded slots to empty slots is $\\frac{25n^2 - 4}{5n^2 + 8n - 4}$. Which of the following expressions is equivalent to that ratio for every such value of $n$?",
      choices: [
        // distractor: inverts the simplified ratio, reporting empty slots per loaded slot
        { id: "A", text: "$\\frac{n + 2}{5n + 2}$" },
        // distractor: keeps 5n - 2 in the numerator and cancels 5n + 2, which is not a factor of the denominator
        { id: "B", text: "$\\frac{5n - 2}{n + 2}$" },
        // distractor: factors the denominator as (5n + 2)(n - 2), which expands to 5n^2 - 8n - 4 instead
        { id: "C", text: "$\\frac{5n + 2}{n - 2}$" },
        { id: "D", text: "$\\frac{5n + 2}{n + 2}$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** The numerator is a difference of squares, $(5n - 2)(5n + 2)$, and the denominator factors as $(5n - 2)(n + 2)$. The common factor $5n - 2$ divides out, leaving $\\frac{5n + 2}{n + 2}$.\n\n**The Full Solution:**\nStep 1: Factor the numerator. $25n^2 - 4 = (5n)^2 - 2^2 = (5n - 2)(5n + 2)$.\nStep 2: Factor the denominator. Look for factors of $5n^2 + 8n - 4$: $(5n - 2)(n + 2) = 5n^2 + 10n - 2n - 4 = 5n^2 + 8n - 4$. $\\checkmark$\nStep 3: Divide out the shared factor $5n - 2$, which is nonzero because $n > 1$: $\\frac{(5n - 2)(5n + 2)}{(5n - 2)(n + 2)} = \\frac{5n + 2}{n + 2}$. Check at $n = 2$: the original is $\\frac{100 - 4}{20 + 16 - 4} = \\frac{96}{32} = 3$, and the simplified form gives $\\frac{12}{4} = 3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{n + 2}{5n + 2}$): the correct simplification turned upside down. At $n = 2$ it equals $\\frac{1}{3}$, not $3$.\n* Choice B ($\\frac{5n - 2}{n + 2}$): cancels the wrong half of the difference of squares, keeping $5n - 2$ instead of the factor that survives. At $n = 2$ it gives $\\frac{8}{4} = 2$.\n* Choice C ($\\frac{5n + 2}{n - 2}$): comes from factoring the denominator as $(5n + 2)(n - 2)$, which multiplies out to $5n^2 - 8n - 4$ — the middle term has the wrong sign.\n\n**Test Day Takeaway:** Factor both parts completely before cancelling, and verify any factorization by multiplying it back out. A quick numerical check at one legal value catches every sign slip.",
      skills: ["simplifying-rational-expressions", "difference-of-squares"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "A freight desk charges a flat fee of \\$15 per crate plus \\$2.50 for each kilogram of a crate's mass above $30$ kilograms. One crate was charged \\$75. What was that crate's mass, in kilograms?",
      choices: [
        // distractor: divides the 60-dollar overage by 2.50 but never adds the 30-kilogram allowance back
        { id: "A", text: "$24$" },
        // distractor: treats the 15-dollar flat fee as a 15-kilogram allowance, solving 15 + 2.50(m - 15) = 75
        { id: "B", text: "$39$" },
        { id: "C", text: "$54$" },
        // distractor: divides the full 75-dollar charge by 2.50 before removing the flat fee, then adds 30
        { id: "D", text: "$60$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The charge above the flat fee is $75 - 15 = 60$ dollars, which buys $\\frac{60}{2.50} = 24$ kilograms beyond the $30$-kilogram allowance, so the mass is $54$ kilograms.\n\n**The Full Solution:**\nStep 1: Translate the fee structure. With mass $m$ kilograms, only the part above $30$ is billed per kilogram, so the charge is $15 + 2.50(m - 30)$ dollars.\nStep 2: Set the charge equal to $75$: $15 + 2.50(m - 30) = 75$. Subtract $15$: $2.50(m - 30) = 60$.\nStep 3: Divide by $2.50$ and add $30$: $m - 30 = 24$, so $m = 54$ kilograms. Check: $2.50(54 - 30) = 2.50(24) = 60$ dollars, and $15 + 60 = 75$ dollars. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($24$): correctly finds the billable $24$ kilograms above the allowance but reports that as the mass. The first $30$ kilograms still count toward the crate's mass; they are just not billed per kilogram.\n* Choice B ($39$): reads the $15$ as a mass allowance, solving $15 + 2.50(m - 15) = 75$. The $15$ is a fee in dollars, and the allowance is $30$ kilograms.\n* Choice D ($60$): divides the entire $75$-dollar charge by $2.50$ to get $30$, then adds the $30$-kilogram allowance. The flat fee must come off before the per-kilogram rate is applied.\n\n**Test Day Takeaway:** In a fee with an allowance, the per-unit rate applies only to the excess. Peel off the flat fee first, divide by the rate, then add the allowance back to answer for the total.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 21,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "A balloon-borne telescope rises at a constant rate after release from its launch pad. The table gives the instrument's altitude above sea level at two times after release. What is the telescope's rate of change of altitude, in meters per second?",
      questionTable: { headers: ["Time since release (minutes)", "Altitude above sea level (meters)"], rows: [["$6.0$", "$3{,}000$"], ["$16.0$", "$6{,}000$"]] },
      choices: [
        { id: "A", text: "$5$" },
        // distractor: divides the later altitude by the later time in seconds, assuming the line passes through the origin
        { id: "B", text: "$6.25$" },
        // distractor: divides the 3,000-meter rise by 60 instead of by the 600-second interval
        { id: "C", text: "$50$" },
        // distractor: computes meters per minute and never converts to meters per second
        { id: "D", text: "$300$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The rise is $6{,}000 - 3{,}000 = 3{,}000$ meters over $16.0 - 6.0 = 10$ minutes, which is $600$ seconds, so the rate is $\\frac{3{,}000}{600} = 5$ meters per second.\n\n**The Full Solution:**\nStep 1: Take the two rows as the points $(6.0, 3{,}000)$ and $(16.0, 6{,}000)$, with time in minutes. The change in altitude is $6{,}000 - 3{,}000 = 3{,}000$ meters and the change in time is $16.0 - 6.0 = 10$ minutes.\nStep 2: Convert the time interval to the units the question asks for: $10$ minutes $\\times 60 = 600$ seconds.\nStep 3: Divide: $\\frac{3{,}000 \\text{ m}}{600 \\text{ s}} = 5$ meters per second. Check with the model: at $5$ meters per second the telescope gains $5(600) = 3{,}000$ meters between the two rows, matching the table. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($6.25$): computes $\\frac{6{,}000}{960}$, dividing the second altitude by the second time in seconds. That treats the altitude as $0$ at release; extending the line back to time $0$ gives $3{,}000 - 5(360) = 1{,}200$ meters, the pad's elevation above sea level.\n* Choice C ($50$): divides the $3{,}000$-meter rise by $60$, converting as though the interval were one minute rather than $10$ minutes.\n* Choice D ($300$): computes $\\frac{3{,}000}{10} = 300$ meters per MINUTE and stops, skipping the conversion the question requires.\n\n**Test Day Takeaway:** Slope is the change in output over the change in input — never an endpoint over an endpoint. Convert units inside the denominator before dividing, and reread the unit the answer must carry.",
      skills: ["slope-from-points"]
    },
    {
      id: 22,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "Eleven archived exposures have a mean duration of $46$ seconds. A twelfth exposure, much longer than the others, is added, and the mean duration of all $12$ exposures is $6$ seconds greater than the mean of the first eleven. What is the duration, in seconds, of the twelfth exposure?",
      correctAnswer: "118",
      explanation: "**SAT Pattern: Outlier Effect**\n\n**The correct answer is $118$.**\n\n**The Fast Way (~40s):** The new mean is $46 + 6 = 52$, so the twelfth exposure is $12(52) - 11(46) = 624 - 506 = 118$ seconds.\n\n**The Full Solution:**\nStep 1: The mean of all twelve is $6$ seconds above $46$, so it is $52$ seconds. Convert each mean to a total: the first eleven exposures total $11 \\times 46 = 506$ seconds.\nStep 2: All twelve exposures total $12 \\times 52 = 624$ seconds.\nStep 3: The added exposure accounts for the difference: $624 - 506 = 118$ seconds. Check: $\\frac{506 + 118}{12} = \\frac{624}{12} = 52$ seconds, which is $6$ more than $46$. $\\checkmark$\n\n**Common Mistakes:** Entering $52$ (reporting the new mean instead of the new value; a $52$-second exposure would lift the mean only to $\\frac{506 + 52}{12} = 46.5$ seconds); entering $66$ (computing $11(52) - 11(46)$, which spreads the new mean over eleven exposures instead of twelve); entering $72$ (computing $12 \\times 6 = 72$, the amount the total must rise above $12 \\times 46$, and stopping there instead of adding the $46$ seconds a twelfth average-length exposure would already supply).\n\n**Test Day Takeaway:** Means are hard to combine, but totals add. Turn every mean into a sum with mean times count, subtract, and the unknown value falls out — and remember a single far value moves the mean far more than it moves the median.",
      skills: ["calculate-mean", "find-median"]
    }
  ]
};

export default practiceTest12M2Easy;
