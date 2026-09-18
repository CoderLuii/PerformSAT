// Practice Test 4 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Official-calibration recreation (2026-09-01): fresh scenarios throughout;
// diagrams at Q6 (right triangle), Q7 (dot plot), Q21 (scatterplot),
// Q22 (two-way table). Numeric MC choices sorted ascending.

export const practiceTest4M2Easy = {
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
      question: "The graph shows the charge $c$, in ampere-hours, remaining in a CubeSat battery $h$ hours into a communications pass, where $h$ is measured along the horizontal axis. Which equation represents this relationship?",
      diagram: { type: "linearGraph", params: { slope: -2, yIntercept: 18, xRange: [0, 8], yRange: [0, 20], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showPoints: [[2, 14], [6, 6]], label: "c" } },
      choices: [
        // distractor: correct slope but copies the charge at h = 2 as the intercept instead of extending the line back to h = 0
        { id: "A", text: "$c = -2h + 14$" },
        { id: "B", text: "$c = -2h + 18$" },
        // distractor: inverts the slope fraction, dividing run by rise (4 / -8) instead of rise by run
        { id: "C", text: "$c = -\\frac{1}{2}h + 18$" },
        // distractor: drops the negative sign, so the model has the battery gaining charge
        { id: "D", text: "$c = 2h + 18$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** From $(2, 14)$ to $(6, 6)$ the charge falls $8$ ampere-hours over $4$ hours, so the slope is $-2$; backing up two more hours to $h = 0$ adds $4$ to $14$, giving an intercept of $18$.\n\n**The Full Solution:**\nStep 1: Read the two marked lattice points off the graph: at $h = 2$ the charge is $14$, and at $h = 6$ the charge is $6$.\nStep 2: Compute the slope: $\\frac{6 - 14}{6 - 2} = \\frac{-8}{4} = -2$ ampere-hours per hour.\nStep 3: Substitute $(2, 14)$ into $c = -2h + b$: $14 = -2(2) + b$, so $b = 18$ and $c = -2h + 18$. Test the other point: $-2(6) + 18 = 6$, which matches the graph ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($c = -2h + 14$): the slope is right, but $14$ is the charge at $h = 2$, not at $h = 0$. This line passes through $(0, 14)$ and misses both marked points.\n* Choice C ($c = -\\frac{1}{2}h + 18$): this flips the slope fraction to $\\frac{4}{-8}$. At $h = 6$ it predicts $15$ ampere-hours, not the $6$ shown.\n* Choice D ($c = 2h + 18$): dropping the minus sign gives a rising line; at $h = 6$ it predicts $30$ ampere-hours, above every value on the graph.\n\n**Test Day Takeaway:** Slope is rise over run with the signs kept, and the intercept is the value at $h = 0$ — never the first coordinate you happen to read off the figure.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "A food-science lab weighs $12$ dried apricots and finds a mean mass of $8.5$ grams. Every recorded mass is then multiplied by $4$ to estimate the mass of the fruit before drying. What is the mean of the $12$ estimated masses, in grams?",
      correctAnswer: "34",
      explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**The correct answer is $34$.**\n\n**The Fast Way (~15s):** Multiplying every value in a data set by $4$ multiplies the mean by $4$, so the new mean is $4(8.5) = 34$ grams.\n\n**The Full Solution:**\nStep 1: A mean of $8.5$ grams over $12$ values means the masses total $12(8.5) = 102$ grams.\nStep 2: Multiplying each of the $12$ masses by $4$ multiplies the total by $4$: $4(102) = 408$ grams.\nStep 3: The count is still $12$, so the new mean is $\\frac{408}{12} = 34$ grams, which is exactly $4(8.5)$ ✓\n\n**Common Mistakes:**\n* $12.5$: adding $4$ to the mean instead of multiplying. Adding $4$ grams to every mass would shift the mean to $12.5$, but the conversion here scales, it does not shift.\n* $48$: multiplying the sample size $12$ by $4$ and reporting $48$, which is a count of values, not a mean mass.\n* $2.125$: dividing $8.5$ by $4$, reversing the direction of the conversion and shrinking the fruit instead of restoring it.\n\n**Test Day Takeaway:** Scaling every value by $k$ multiplies the mean, the median, and the standard deviation by $k$; adding $k$ moves the center but leaves the spread unchanged.",
      skills: ["data-analysis"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A fermentation tank holds a yeast population given by $N(t) = 4{,}200(1.35)^t$ after $t$ hours of incubation. What does the value $1.35$ tell you about how the population changes each hour?",
      choices: [
        // distractor: reads the growth factor as a fixed number of cells added each hour instead of a multiplier
        { id: "A", text: "The population increases by $1.35$ cells each hour." },
        // distractor: reads the decimal part 0.35 as a count of cells rather than a percent
        { id: "B", text: "The population increases by $35$ cells each hour." },
        // distractor: reports the whole multiplier as the percent increase instead of the part above 1
        { id: "C", text: "The population increases by $135\\%$ each hour." },
        { id: "D", text: "The population increases by $35\\%$ each hour." }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** In $a(b)^t$ the base $b$ is the hourly multiplier, and $1.35 - 1 = 0.35$, so the population grows $35\\%$ each hour.\n\n**The Full Solution:**\nStep 1: The model has the form $N(t) = a(b)^t$ with $a = 4{,}200$ cells at $t = 0$ and $b = 1.35$.\nStep 2: Each increase of $1$ in $t$ multiplies $N$ by $1.35$, and a multiplier of $1 + r$ corresponds to a percent increase of $r = 0.35 = 35\\%$.\nStep 3: Check with the numbers: $N(0) = 4{,}200$ and $N(1) = 4{,}200(1.35) = 5{,}670$, an increase of $1{,}470$ cells, and $\\frac{1{,}470}{4{,}200} = 0.35$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (increase of $1.35$ cells): a growth factor multiplies, it does not add. Adding $1.35$ cells per hour would take $4{,}200$ to $4{,}201.35$, not to the $5{,}670$ the model gives.\n* Choice B (increase of $35$ cells): the same error shifted one decimal place. $4{,}200 + 35 = 4{,}235$, far below $N(1) = 5{,}670$.\n* Choice C ($135\\%$ increase): a $135\\%$ increase multiplies by $2.35$, giving $9{,}870$ cells after one hour. Only the part of the base above $1$ is the percent increase.\n\n**Test Day Takeaway:** In an exponential model the base is a multiplier: subtract $1$ and read the remainder as the percent change per unit of time.",
      skills: ["exponential-growth-decay"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A vessel is being unloaded, and $f(x) = 96 - 6x$ gives the number of shipping containers still aboard $x$ hours after unloading begins. If $f(a) = 30$, what is the value of $a$?",
      choices: [
        // distractor: sign error while isolating: turns -6a = -66 into a = -11
        { id: "A", text: "$-11$" },
        // distractor: divides only the output by the rate, 30 / 6, ignoring the 96 containers on board at the start
        { id: "B", text: "$5$" },
        { id: "C", text: "$11$" },
        // distractor: solves 96 - 6x = 0 instead of 30, finding the hour the vessel empties
        { id: "D", text: "$16$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Function Evaluation**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The vessel has gone from $96$ containers to $30$, a drop of $66$, and it loses $6$ containers per hour, so $a = \\frac{66}{6} = 11$ hours.\n\n**The Full Solution:**\nStep 1: Set the rule equal to the given output: $96 - 6a = 30$.\nStep 2: Subtract $96$ from both sides: $-6a = -66$.\nStep 3: Divide by $-6$: $a = 11$. Check by evaluating forward: $f(11) = 96 - 6(11) = 96 - 66 = 30$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-11$): this divides $-66$ by $6$ instead of by $-6$. A negative number of hours is impossible here, and $f(-11) = 96 + 66 = 162$.\n* Choice B ($5$): this uses $\\frac{30}{6}$, treating $30$ as the number unloaded rather than the number remaining. In fact $f(5) = 96 - 30 = 66$.\n* Choice D ($16$): this solves $96 - 6x = 0$, the hour the last container leaves, not the hour $30$ remain.\n\n**Test Day Takeaway:** When a function value is given and the input is not, substitute the value for the whole expression and solve; then evaluate forward once to confirm the input you found.",
      skills: ["function-evaluation"]
    },
    {
      id: 5,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "A delivery van has $11$ kilowatt-hours of stored energy and gains $6.5$ kilowatt-hours for each hour it spends charging. Its next route requires at least $58$ kilowatt-hours. What is the smallest integer number of charging hours that meets this requirement?",
      correctAnswer: "8",
      explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~25s):** The van still needs $58 - 11 = 47$ kilowatt-hours, and $\\frac{47}{6.5} \\approx 7.23$, so charging must run through an $8$th hour.\n\n**The Full Solution:**\nStep 1: Let $h$ be the number of charging hours. Stored energy is $6.5h + 11$, and it must be at least $58$: $6.5h + 11 \\geq 58$.\nStep 2: Subtract $11$: $6.5h \\geq 47$, so $h \\geq \\frac{47}{6.5} \\approx 7.23$.\nStep 3: The smallest integer at or above $7.23$ is $8$. Check both sides: $6.5(7) + 11 = 56.5$, which is short of $58$, while $6.5(8) + 11 = 63$, which clears it ✓\n\n**Common Mistakes:**\n* $7$: rounding $7.23$ down out of habit. Seven hours yields only $56.5$ kilowatt-hours, so the requirement fails.\n* $9$: ignoring the $11$ kilowatt-hours already stored and solving $6.5h \\geq 58$, which gives $h \\geq 8.92$ and rounds up to $9$.\n* $7.23$: reporting the boundary value itself. The question asks for an integer number of hours, so the boundary must be rounded up.\n\n**Test Day Takeaway:** For a smallest-integer question, solve the inequality first and then round toward the direction the inequality points — up for at least, down for at most.",
      skills: ["inequalities"]
    },
    {
      id: 6,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "The table gives the dimensions of panels $A$ and $B$, the two rectangular solar panels on a deep-space probe. What is the sum of the areas of the two panels, in square meters?",
      questionTable: { headers: ["Panel", "Length (meters)", "Width (meters)"], rows: [["$A$", "$3.5$", "$1.2$"], ["$B$", "$2.4$", "$1.5$"]] },
      choices: [
        // distractor: finds only panel A's area, 3.5 x 1.2, and stops
        { id: "A", text: "$4.2$" },
        { id: "B", text: "$7.8$" },
        // distractor: adds all four table entries instead of multiplying length by width within each row
        { id: "C", text: "$8.6$" },
        // distractor: computes the combined perimeter, 2(3.5 + 1.2) + 2(2.4 + 1.5), instead of the combined area
        { id: "D", text: "$17.2$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Multiply within each row and add: $3.5(1.2) = 4.2$ and $2.4(1.5) = 3.6$, so the panels cover $7.8$ square meters.\n\n**The Full Solution:**\nStep 1: Panel $A$ measures $3.5$ meters by $1.2$ meters, so its area is $3.5 \\times 1.2 = 4.2$ square meters.\nStep 2: Panel $B$ measures $2.4$ meters by $1.5$ meters, so its area is $2.4 \\times 1.5 = 3.6$ square meters.\nStep 3: The total area is $4.2 + 3.6 = 7.8$ square meters. Check the size: both panels are near $2$ meters wide and under $4$ meters long, so a total near $8$ square meters is reasonable ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.2$): this is panel $A$ alone. The question asks for the sum, and panel $B$ adds another $3.6$ square meters.\n* Choice C ($8.6$): this adds the four table numbers, $3.5 + 1.2 + 2.4 + 1.5$. Adding a length to a width produces meters, not square meters.\n* Choice D ($17.2$): this is the total perimeter, $9.4 + 7.8$. Perimeter measures the edge, area measures the surface.\n\n**Test Day Takeaway:** When a table supplies dimensions row by row, do the row arithmetic first and combine afterward — combining the raw table entries first changes the units.",
      skills: ["triangle-area"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A dairy laboratory measured the fat content of a random sample of $240$ milk cartons and reported that the mean fat content of all cartons is between $3.42\\%$ and $3.68\\%$. What is the margin of error for this estimate?",
      choices: [
        // distractor: divides the interval width by 4 instead of by 2
        { id: "A", text: "$0.065\\%$" },
        { id: "B", text: "$0.13\\%$" },
        // distractor: reports the full interval width, 3.68 - 3.42, as the margin of error
        { id: "C", text: "$0.26\\%$" },
        // distractor: reports the center of the interval, the sample mean, instead of the margin
        { id: "D", text: "$3.55\\%$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Margin of Error**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The interval spans $3.68 - 3.42 = 0.26$ percentage points, and the margin of error is half that span: $0.13\\%$.\n\n**The Full Solution:**\nStep 1: A reported interval always has the form (estimate $-$ margin) to (estimate $+$ margin), so the margin is half the width.\nStep 2: The width is $3.68 - 3.42 = 0.26$ percentage points, so the margin of error is $\\frac{0.26}{2} = 0.13$ percentage points.\nStep 3: Check by rebuilding the interval. The center is $\\frac{3.42 + 3.68}{2} = 3.55\\%$, and $3.55 \\pm 0.13$ gives exactly $3.42\\%$ to $3.68\\%$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.065\\%$): this halves the width twice, $\\frac{0.26}{4}$. Rebuilding with it gives $3.485\\%$ to $3.615\\%$, an interval narrower than the one reported.\n* Choice C ($0.26\\%$): this is the full width. Using it would stretch the interval to $3.29\\%$ to $3.81\\%$, twice as wide as reported.\n* Choice D ($3.55\\%$): this is the sample mean, the center of the interval, not the distance from the center to an endpoint.\n\n**Test Day Takeaway:** Margin of error is the radius of the interval, not its diameter: subtract the endpoints and divide by two, then rebuild the interval to confirm.",
      skills: ["margin-of-error"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A telescope data archive labels each spectrograph frame with the value $\\frac{9^{a} \\cdot 9^{5}}{9^{2}}$, where $a$ is a positive integer. For one frame the label equals $9^{14}$. What is the value of $a$?",
      choices: [
        // distractor: subtracts the denominator exponent again, computing 14 - 5 - 2 instead of 14 - 5 + 2
        { id: "A", text: "$7$" },
        // distractor: ignores the denominator entirely and computes 14 - 5
        { id: "B", text: "$9$" },
        { id: "C", text: "$11$" },
        // distractor: adds all three exponents, 14 + 5 + 2, instead of solving the exponent equation
        { id: "D", text: "$21$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The label simplifies to $9^{a + 5 - 2} = 9^{a + 3}$, so $a + 3 = 14$ and $a = 11$.\n\n**The Full Solution:**\nStep 1: Multiplying powers of the same base adds exponents: $9^{a} \\cdot 9^{5} = 9^{a + 5}$.\nStep 2: Dividing powers of the same base subtracts exponents: $\\frac{9^{a + 5}}{9^{2}} = 9^{a + 3}$.\nStep 3: Equal powers of the same base force equal exponents, so $a + 3 = 14$ and $a = 11$. Check: $\\frac{9^{11} \\cdot 9^{5}}{9^{2}} = 9^{16 - 2} = 9^{14}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): this subtracts the $2$ a second time, computing $14 - 5 - 2$. Substituting back gives $9^{7 + 3} = 9^{10}$, not $9^{14}$.\n* Choice B ($9$): this drops the denominator and solves $a + 5 = 14$. Substituting back gives $9^{12}$.\n* Choice D ($21$): this adds every exponent in sight, $14 + 5 + 2$. Substituting back gives $9^{24}$, far too large.\n\n**Test Day Takeaway:** Collapse the whole expression to a single power of the base first; only then set the exponents equal — combining the exponents in the wrong order is where the sign errors live.",
      skills: ["exponent-laws"]
    },
    {
      id: 9,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "For $12$ plots, the scatterplot relates yield to soil moisture, and the line of best fit is $y = 2.5x + 9$, where $x$ is the soil moisture in percent and $y$ is the predicted yield in kilograms per plot. What soil moisture corresponds to a predicted yield of $41.5$ kilograms?",
      diagram: { type: "scatterplot", params: { points: [[1, 12.1], [2, 13.2], [3, 17.8], [4, 18.1], [5, 23], [6, 22.6], [7, 28.3], [8, 27.9], [9, 32.8], [10, 33.4], [11, 38.2], [12, 37.5]], xMin: 0, xMax: 15, yMin: 0, yMax: 50, xGridStep: 1, yGridStep: 5, xLabelStep: 3, yLabelStep: 10, xLabel: "Soil moisture (percent)", yLabel: "Yield (kg per plot)", bestFitLine: { slope: 2.5, intercept: 9 } } },
      correctAnswer: "13",
      explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**The correct answer is $13$.**\n\n**The Fast Way (~20s):** Set $2.5x + 9 = 41.5$; the yield above the intercept is $32.5$, and $\\frac{32.5}{2.5} = 13$ percent.\n\n**The Full Solution:**\nStep 1: The line of best fit predicts $y$ from $x$, so substitute the predicted yield: $2.5x + 9 = 41.5$.\nStep 2: Subtract the intercept: $2.5x = 32.5$.\nStep 3: Divide by the slope: $x = \\frac{32.5}{2.5} = 13$ percent. Check forward: $2.5(13) + 9 = 32.5 + 9 = 41.5$ kilograms ✓\n\n**Common Mistakes:**\n* $16.6$: dividing $41.5$ by $2.5$ without first removing the intercept of $9$.\n* $81.25$: multiplying by the slope instead of dividing, $(41.5 - 9)(2.5)$, which reverses the last step.\n* $20.2$: adding the intercept instead of subtracting it, $\\frac{41.5 + 9}{2.5}$, a sign slip on the constant term.\n\n**Test Day Takeaway:** A line of best fit runs both directions: substitute $x$ to predict $y$, or substitute $y$ and solve back for $x$ — undoing the intercept before the slope.",
      skills: ["scatterplots", "linear-functions"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Loading a ferry takes a fixed $96$ seconds to secure the ramp plus $23$ seconds for each vehicle driven aboard. Which equation gives the number of vehicles $v$ loaded during an $878$-second loading period?",
      choices: [
        { id: "A", text: "$23v + 96 = 878$" },
        // distractor: subtracts the fixed ramp time instead of adding it to the per-vehicle time
        { id: "B", text: "$23v - 96 = 878$" },
        // distractor: swaps the roles of 96 and 23, charging 96 seconds per vehicle and 23 seconds once
        { id: "C", text: "$96v + 23 = 878$" },
        // distractor: multiplies the ramp time by the per-vehicle rate instead of adding it separately
        { id: "D", text: "$23(v + 96) = 878$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Time per vehicle times the number of vehicles, plus the one-time ramp cost, equals the total: $23v + 96 = 878$.\n\n**The Full Solution:**\nStep 1: The $23$ seconds is charged once per vehicle, so the vehicles account for $23v$ seconds.\nStep 2: The $96$ seconds is charged once for the whole loading, so it is a constant added to $23v$, not multiplied by $v$.\nStep 3: The two parts fill the $878$-second period: $23v + 96 = 878$. Solving gives $v = \\frac{782}{23} = 34$ vehicles, and $23(34) + 96 = 782 + 96 = 878$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($23v - 96 = 878$): subtracting the ramp time treats it as time saved. It would give $v = \\frac{974}{23} \\approx 42.3$ vehicles, more than the period allows.\n* Choice C ($96v + 23 = 878$): this swaps the two rates, charging $96$ seconds per vehicle. It gives $v \\approx 8.9$, far too few for a $14$-minute load.\n* Choice D ($23(v + 96) = 878$): distributing gives $23v + 2{,}208$, which already exceeds $878$ before a single vehicle boards.\n\n**Test Day Takeaway:** A one-time charge is added outside the parentheses; only the quantity that repeats gets multiplied by the count.",
      skills: ["combining-like-terms"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A grain lot loses mass during drying and again during cleaning, by the percents shown in the table, and $1{,}080$ kilograms remain after both stages. What was the mass of the lot, in kilograms, before drying?",
      questionTable: { headers: ["Stage", "Percent decrease in mass"], rows: [["Drying", "$20\\%$"], ["Cleaning", "$10\\%$"]] },
      choices: [
        // distractor: reverses only the cleaning stage, computing 1,080 / 0.9
        { id: "A", text: "$1{,}200$" },
        // distractor: reverses only the drying stage, computing 1,080 / 0.8
        { id: "B", text: "$1{,}350$" },
        // distractor: adds the two percents back to the final mass, computing 1,080 x 1.30, instead of dividing
        { id: "C", text: "$1{,}404$" },
        { id: "D", text: "$1{,}500$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Two decreases multiply: $0.8 \\times 0.9 = 0.72$, so the original mass is $\\frac{1{,}080}{0.72} = 1{,}500$ kilograms.\n\n**The Full Solution:**\nStep 1: A $20\\%$ decrease leaves $80\\%$, so after drying the lot is $0.8M$, where $M$ is the mass before drying.\nStep 2: A $10\\%$ decrease leaves $90\\%$ of that, so after cleaning the lot is $0.9(0.8M) = 0.72M$, and $0.72M = 1{,}080$.\nStep 3: Divide: $M = \\frac{1{,}080}{0.72} = 1{,}500$ kilograms. Check forward: $1{,}500(0.8) = 1{,}200$ after drying, and $1{,}200(0.9) = 1{,}080$ after cleaning ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1{,}200$): this undoes only the cleaning stage, $\\frac{1{,}080}{0.9}$. It is the mass after drying, an intermediate value, not the starting mass.\n* Choice B ($1{,}350$): this undoes only the drying stage, $\\frac{1{,}080}{0.8}$, leaving the cleaning loss unaccounted for.\n* Choice C ($1{,}404$): this adds $30\\%$ to the final mass, $1{,}080(1.30)$. Percent decreases are undone by dividing, and they do not simply add.\n\n**Test Day Takeaway:** Chain percent changes as a product of multipliers, then divide the final amount by that product — never add the percents and never multiply back up.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 12,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "Inside an observatory dome, strut $DE$ runs parallel to the floor beam $BC$ of triangular truss $ABC$, meeting $AB$ at $D$ and $AC$ at $E$. $AD$ measures $12$ feet, $DB$ measures $8$ feet, and $AE$ measures $15$ feet. How long is $EC$, in feet?",
      correctAnswer: "10",
      explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~25s):** A parallel strut cuts the two sides proportionally, so $\\frac{12}{8} = \\frac{15}{EC}$ and $EC = \\frac{15(8)}{12} = 10$ feet.\n\n**The Full Solution:**\nStep 1: Because $DE$ is parallel to $BC$, triangle $ADE$ is similar to triangle $ABC$, so $DE$ divides $AB$ and $AC$ in the same ratio.\nStep 2: Set up the proportion on the two pieces of each side: $\\frac{AD}{DB} = \\frac{AE}{EC}$, that is $\\frac{12}{8} = \\frac{15}{EC}$.\nStep 3: Cross multiply: $12 \\cdot EC = 15(8) = 120$, so $EC = 10$ feet. Check the whole sides: $\\frac{AD}{AB} = \\frac{12}{20} = 0.6$ and $\\frac{AE}{AC} = \\frac{15}{25} = 0.6$ ✓\n\n**Common Mistakes:**\n* $25$: pairing the piece $AD$ with the whole side $AB$, solving $\\frac{12}{20} = \\frac{15}{EC}$. That expression returns $AC$, not $EC$.\n* $22.5$: flipping the ratio to $\\frac{8}{12} = \\frac{15}{EC}$, which puts the shorter piece over the longer one.\n* $8$: assuming the strut cuts equal lengths off both sides, so $EC = DB$. Equal ratios do not mean equal lengths unless the two sides are equal.\n\n**Test Day Takeaway:** With a parallel cut, keep the pieces matched: top-to-bottom on one side must be compared with top-to-bottom on the other, or whole-to-whole on both.",
      skills: ["similar-triangles"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A sorting line moves $c$ crates per minute, and a second line moves $9$ fewer than twice that number of crates per minute. Which expression represents the total number of crates the two lines move in $m$ minutes?",
      choices: [
        // distractor: counts only the second line's rate, 2c - 9, and forgets the first line's c crates per minute
        { id: "A", text: "$m(2c - 9)$" },
        // distractor: reads nine fewer than twice as nine more than twice, adding 9 instead of subtracting it
        { id: "B", text: "$m(3c + 9)$" },
        // distractor: subtracts 9 from each line's rate instead of from the second line only
        { id: "C", text: "$m(3c - 18)$" },
        { id: "D", text: "$m(3c - 9)$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Together the lines move $c + (2c - 9) = 3c - 9$ crates per minute, and $m$ minutes multiplies that rate: $m(3c - 9)$.\n\n**The Full Solution:**\nStep 1: The first line moves $c$ crates per minute. Nine fewer than twice that number is $2c - 9$, the second line's rate.\nStep 2: Add the two rates: $c + 2c - 9 = 3c - 9$ crates per minute for the pair.\nStep 3: Multiply the combined rate by the number of minutes: $m(3c - 9)$. Test with $c = 10$: the lines move $10$ and $11$ crates per minute, $21$ together, and $m(3 \\cdot 10 - 9) = 21m$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($m(2c - 9)$): this is the second line alone. At $c = 10$ it gives $11m$ crates, missing the $10m$ the first line contributes.\n* Choice B ($m(3c + 9)$): this reverses the direction of the comparison. At $c = 10$ it gives $39m$, which exceeds the $21m$ the two lines actually move.\n* Choice C ($m(3c - 18)$): this takes $9$ off both rates. At $c = 10$ it gives $12m$, treating the first line as if it also lost $9$ crates per minute.\n\n**Test Day Takeaway:** Translate one phrase at a time into its own expression, add the pieces, and only then multiply by the time — subtracting a constant from the combined rate is not the same as subtracting it from each part.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A mirror-cell load model uses the expression $2x^2 + kx - 40$, which is the product of $x - 4$ and a second linear expression. What is the value of the constant $k$?",
      choices: [
        // distractor: uses x = -4 as the zero instead of x = 4, flipping the sign inside the factor
        { id: "A", text: "$-2$" },
        { id: "B", text: "$2$" },
        // distractor: drops the leading coefficient 2 and solves 16 + 4k - 40 = 0
        { id: "C", text: "$6$" },
        // distractor: sets the expression equal to 40 instead of 0 when substituting the zero
        { id: "D", text: "$12$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** If $x - 4$ is a factor, then substituting $x = 4$ gives $0$: $32 + 4k - 40 = 0$, so $k = 2$.\n\n**The Full Solution:**\nStep 1: A factor of $x - 4$ means $x = 4$ makes the expression $0$.\nStep 2: Substitute: $2(4)^2 + k(4) - 40 = 32 + 4k - 40 = 4k - 8$, and setting that equal to $0$ gives $4k = 8$.\nStep 3: So $k = 2$. Check by factoring completely: $2x^2 + 2x - 40 = 2(x^2 + x - 20) = 2(x + 5)(x - 4)$, which does contain $x - 4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$): this substitutes $x = -4$. The factor $x - 4$ is zero at $x = 4$; at $k = -2$ the expression factors as $2(x + 4)(x - 5)$, with no $x - 4$ factor.\n* Choice C ($6$): this ignores the leading $2$ and evaluates $16 + 4k - 40$. With $k = 6$, substituting $x = 4$ leaves $32 + 24 - 40 = 16$, not $0$.\n* Choice D ($12$): this sets the expression equal to $40$ rather than $0$. With $k = 12$, substituting $x = 4$ leaves $40$, so $x - 4$ is not a factor.\n\n**Test Day Takeaway:** A linear factor hands you a zero: set the factor equal to zero, substitute that input into the whole expression, and solve for the unknown coefficient.",
      skills: ["finding-roots-factoring"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A tracking station's antenna sits at the point $(-4, 7)$ on a survey grid marked in kilometers and holds a data link with any rover within $9$ kilometers of the antenna. Which equation describes the boundary of the region the station can reach?",
      choices: [
        { id: "A", text: "$(x + 4)^2 + (y - 7)^2 = 81$" },
        // distractor: puts the radius 9 on the right side instead of the radius squared, 81
        { id: "B", text: "$(x + 4)^2 + (y - 7)^2 = 9$" },
        // distractor: copies the center's x-coordinate -4 straight into the parentheses instead of subtracting it
        { id: "C", text: "$(x - 4)^2 + (y - 7)^2 = 81$" },
        // distractor: subtracts the y-coordinate with the wrong sign, placing the center at (-4, -7)
        { id: "D", text: "$(x + 4)^2 + (y + 7)^2 = 81$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Standard form is $(x - h)^2 + (y - k)^2 = r^2$ with center $(-4, 7)$ and $r = 9$, giving $(x + 4)^2 + (y - 7)^2 = 81$.\n\n**The Full Solution:**\nStep 1: The boundary is every point exactly $9$ kilometers from the antenna, which is a circle of radius $9$ centered at $(-4, 7)$.\nStep 2: Substitute into $(x - h)^2 + (y - k)^2 = r^2$: $h = -4$ becomes $x - (-4) = x + 4$, and $k = 7$ becomes $y - 7$.\nStep 3: Square the radius: $r^2 = 81$, so the equation is $(x + 4)^2 + (y - 7)^2 = 81$. Check a boundary point: $(5, 7)$ is $9$ kilometers east of the antenna, and $(9)^2 + 0 = 81$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($= 9$): the right side is $r^2$, not $r$. This equation describes a circle of radius $3$, which would cut the link range to a third.\n* Choice C ($(x - 4)^2$): this copies $-4$ without negating it, centering the circle at $(4, 7)$ — eight kilometers east of the actual antenna.\n* Choice D ($(y + 7)^2$): this negates the $y$-coordinate that was already positive, centering the circle at $(-4, -7)$.\n\n**Test Day Takeaway:** Standard form subtracts the center's coordinates, so a negative coordinate turns into a plus sign inside the parentheses, and the right side is always the radius squared.",
      skills: ["circle-equation"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "Twelve one-hundred-gram samples were drawn at an olive press, and the dot plot records how many undersized olives each sample contained. What is the median of the twelve sample counts?",
      diagram: { type: "dotPlot", params: { data: [{ value: 3, count: 5 }, { value: 4, count: 2 }, { value: 6, count: 1 }, { value: 7, count: 1 }, { value: 8, count: 2 }, { value: 11, count: 1 }], xMin: 2, xMax: 12, xLabel: "Undersized olives per sample" } },
      correctAnswer: "4",
      explanation: "**SAT Pattern: Median Calculation**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~25s):** With $12$ values the median averages the $6$th and $7$th. Five dots sit at $3$ and two at $4$, so both middle values are $4$.\n\n**The Full Solution:**\nStep 1: Read the counts off the plot: five samples at $3$, two at $4$, one at $6$, one at $7$, two at $8$, one at $11$, for $12$ samples in all.\nStep 2: In order the values are $3, 3, 3, 3, 3, 4, 4, 6, 7, 8, 8, 11$. An even count means the median is the mean of the $6$th and $7$th values.\nStep 3: Those are $4$ and $4$, so the median is $\\frac{4 + 4}{2} = 4$. Check the split: the lower six values are $3, 3, 3, 3, 3, 4$ and the upper six are $4, 6, 7, 8, 8, 11$ ✓\n\n**Common Mistakes:**\n* $6.5$: averaging the middle two of the six distinct values $3, 4, 6, 7, 8, 11$. Every dot counts, so a value stacked five times pulls the middle down.\n* $5.25$: computing the mean, $\\frac{63}{12}$. The single sample at $11$ drags the mean above the median.\n* $3$: reporting the most frequent value. That is the mode; the median is a position, not a peak.\n\n**Test Day Takeaway:** On a dot plot, count the dots, not the labeled values — the median sits at the middle position of the full list, so tall stacks matter.",
      skills: ["find-median"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "On an airport survey grid, a taxiway lies along the line $3x + ky = 12$, where $k$ is a constant, and a service road that crosses the taxiway at a right angle has slope $-\\frac{5}{3}$. What is the value of $k$?",
      choices: [
        { id: "A", text: "$-5$" },
        // distractor: takes the negative reciprocal in the wrong direction, solving -3/k = 5/3
        { id: "B", text: "$-\\frac{9}{5}$" },
        // distractor: gives the taxiway the same slope as the service road, solving -3/k = -5/3
        { id: "C", text: "$\\frac{9}{5}$" },
        // distractor: reads the taxiway's slope as 3/k, dropping the sign produced by moving 3x across
        { id: "D", text: "$5$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The taxiway must have slope $\\frac{3}{5}$, the negative reciprocal of $-\\frac{5}{3}$. Its slope is $-\\frac{3}{k}$, so $-\\frac{3}{k} = \\frac{3}{5}$ and $k = -5$.\n\n**The Full Solution:**\nStep 1: Put the taxiway in slope-intercept form: $ky = -3x + 12$, so $y = -\\frac{3}{k}x + \\frac{12}{k}$ and its slope is $-\\frac{3}{k}$.\nStep 2: Perpendicular slopes multiply to $-1$: $\\left(-\\frac{3}{k}\\right)\\left(-\\frac{5}{3}\\right) = \\frac{5}{k} = -1$.\nStep 3: Solving gives $k = -5$. Check: with $k = -5$ the taxiway is $3x - 5y = 12$, slope $\\frac{3}{5}$, and $\\frac{3}{5} \\cdot \\left(-\\frac{5}{3}\\right) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-\\frac{9}{5}$): this sets $-\\frac{3}{k}$ equal to $\\frac{5}{3}$, flipping the fraction but keeping the wrong sign. That taxiway slope is $\\frac{5}{3}$, parallel in steepness but not perpendicular.\n* Choice C ($\\frac{9}{5}$): this gives the taxiway the same slope, $-\\frac{5}{3}$, as the service road. Two lines with equal slopes are parallel, so they never cross at a right angle.\n* Choice D ($5$): this reads the taxiway's slope as $\\frac{3}{k}$ and solves $\\frac{3}{k} = \\frac{3}{5}$, forgetting that moving $3x$ across makes the slope negative. With $k = 5$ the taxiway is $3x + 5y = 12$, whose slope is $-\\frac{3}{5}$, and $-\\frac{3}{5} \\cdot \\left(-\\frac{5}{3}\\right) = 1$, not $-1$.\n\n**Test Day Takeaway:** Solve for $y$ before reading a slope out of $Ax + By = C$, then apply the negative reciprocal in the right direction — flip the fraction and change the sign, not one or the other.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "Three drip-irrigation valves in a vineyard sit at grid positions $(1, 2)$, $(8, 3)$, and $(4, 9)$, with each grid unit equal to one meter. How many square meters does the triangular region they enclose cover?",
      correctAnswer: "23",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $23$.**\n\n**The Fast Way (~45s):** Box the triangle in the $7$ by $7$ rectangle from $(1, 2)$ to $(8, 9)$, area $49$, and peel off the three right triangles in the corners, $3.5 + 12 + 10.5 = 26$, leaving $23$.\n\n**The Full Solution:**\nStep 1: No side is horizontal or vertical, so there is no base to read off directly. Enclose the triangle in the smallest rectangle: $x$ runs from $1$ to $8$ and $y$ runs from $2$ to $9$, so the rectangle is $7$ by $7$ with area $49$ square meters.\nStep 2: Three right triangles fill the gap between the rectangle and the region: legs $7$ and $1$ give $3.5$; legs $4$ and $6$ give $12$; legs $3$ and $7$ give $10.5$. Together they cover $26$ square meters.\nStep 3: Subtract: $49 - 26 = 23$ square meters. Check with the coordinate formula: $\\frac{1}{2}|1(3 - 9) + 8(9 - 2) + 4(2 - 3)| = \\frac{1}{2}|-6 + 56 - 4| = 23$ ✓\n\n**Common Mistakes:**\n* $49$: reporting the bounding rectangle and forgetting that the region is only part of it.\n* $26$: reporting the three corner triangles, the region that must be removed rather than the region that remains.\n* $24.5$: treating the horizontal spread of $7$ as a base and the vertical spread of $7$ as a height, $\\frac{1}{2}(7)(7)$. Neither spread is a side of this triangle.\n\n**Test Day Takeaway:** When no side of a coordinate triangle is horizontal or vertical, box it and subtract the corner right triangles — or use the coordinate area formula and let the absolute value handle the order of the points.",
      skills: ["triangle-area"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A cargo aircraft is loaded with $x$ standard pallets of mass $340$ kilograms each and $y$ oversize pallets of mass $560$ kilograms each. The aircraft carries $48$ pallets with a combined mass of $18.3$ metric tons, where $1$ metric ton equals $1{,}000$ kilograms. Which system of equations represents this situation?",
      choices: [
        // distractor: swaps the two totals, counting pallets with the mass and weighing them with the count
        { id: "A", text: "$x + y = 18.3$ and $340x + 560y = 48$" },
        // distractor: leaves the total in metric tons while the per-pallet masses are in kilograms
        { id: "B", text: "$x + y = 48$ and $340x + 560y = 18.3$" },
        // distractor: converts the per-pallet masses to tons but leaves the total in kilograms, mixing the units the other way
        { id: "C", text: "$x + y = 48$ and $0.34x + 0.56y = 18{,}300$" },
        { id: "D", text: "$x + y = 48$ and $340x + 560y = 18{,}300$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** One equation counts pallets, $x + y = 48$; the other weighs them, and $18.3$ metric tons is $18{,}300$ kilograms, so $340x + 560y = 18{,}300$.\n\n**The Full Solution:**\nStep 1: The count equation adds pallets to pallets: $x + y = 48$.\nStep 2: The mass equation adds kilograms to kilograms. The per-pallet masses are given in kilograms, so the total must be too: $18.3 \\times 1{,}000 = 18{,}300$ kilograms, giving $340x + 560y = 18{,}300$.\nStep 3: Confirm the system has a sensible solution: substituting $y = 48 - x$ gives $340x + 26{,}880 - 560x = 18{,}300$, so $220x = 8{,}580$ and $x = 39$, $y = 9$. Check: $340(39) + 560(9) = 13{,}260 + 5{,}040 = 18{,}300$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: this reverses the two totals, so it claims the aircraft carries $18.3$ pallets weighing $48$ kilograms altogether — lighter than a single pallet.\n* Choice B: the units clash. With masses in kilograms, $340x + 560y = 18.3$ would need fewer than one pallet in total.\n* Choice C: this converts the wrong side, measuring each pallet in tons while the total stays in kilograms; reaching a total of $18{,}300$ that way would take more than $30{,}000$ pallets, not $48$.\n\n**Test Day Takeaway:** Write one equation per quantity being totaled, and make both sides of each equation carry the same unit before you commit to it — unit mismatch is the usual trap in system-setup questions.",
      skills: ["word-problem-to-equation", "setting-up-systems"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "On a rail survey grid marked in kilometers, station $P$ is at $(-9, 4)$ and station $Q$ is at $(5, -12)$, and a signal repeater is installed at $(-2, -3)$. Which statement about the repeater and segment $PQ$ is true?",
      choices: [
        // distractor: assumes the repeater is the midpoint because its x-coordinate matches; the midpoint is (-2, -4), not (-2, -3)
        { id: "A", text: "The repeater is the midpoint of $PQ$." },
        // distractor: accepts the repeater as on the segment because it sits between the stations, without testing it against the line
        { id: "B", text: "The repeater lies on $PQ$ but is not its midpoint." },
        // distractor: treats the repeater as a point on the extension of PQ, even though its x-coordinate lies between -9 and 5
        { id: "C", text: "The repeater lies on the line through $P$ and $Q$ but outside $PQ$." },
        { id: "D", text: "The repeater does not lie on the line through $P$ and $Q$." }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** The midpoint of $PQ$ is $\\left(\\frac{-9 + 5}{2}, \\frac{4 - 12}{2}\\right) = (-2, -4)$. The repeater sits at $(-2, -3)$, one kilometer above the only point of the line with $x = -2$, so it is off the line entirely.\n\n**The Full Solution:**\nStep 1: Apply the midpoint formula to $P(-9, 4)$ and $Q(5, -12)$: the midpoint is $(-2, -4)$.\nStep 2: A vertical line $x = -2$ meets the line through $P$ and $Q$ exactly once, and that single point is the midpoint $(-2, -4)$.\nStep 3: The repeater is at $(-2, -3)$, so it is not that point and cannot be anywhere else on the line. Check with the slope: $PQ$ has slope $\\frac{-12 - 4}{5 + 9} = -\\frac{8}{7}$, while $P$ to the repeater has slope $\\frac{-3 - 4}{-2 + 9} = -1$; unequal slopes mean the three points are not collinear ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: the $x$-coordinates match, which makes $(-2, -3)$ look like the midpoint. But the midpoint's $y$-coordinate is $-4$, so the repeater misses it by one kilometer.\n* Choice B: sitting between the two stations is not the same as sitting on the segment. The point of $PQ$ directly below the repeater is $(-2, -4)$.\n* Choice C: points outside $PQ$ on that line have $x$ below $-9$ or above $5$. The repeater's $x = -2$ is between the stations, so this describes a location it cannot occupy.\n\n**Test Day Takeaway:** Matching one coordinate is not membership: compute the midpoint, then confirm collinearity with a slope comparison before deciding where a point sits relative to a segment.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 21,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "The bar chart shows the mass of apples harvested, in hundreds of kilograms, for each of five varieties. Of the Gala harvest, $15\\%$ is rejected for bruising. The rejected Gala is what percent of the total harvest of all five varieties?",
      diagram: { type: "barChart", params: { data: [{ label: "Gala", value: 240 }, { label: "Fuji", value: 200 }, { label: "Honeycrisp", value: 160 }, { label: "Braeburn", value: 120 }, { label: "Cortland", value: 80 }], xAxisLabel: "Variety", yAxisLabel: "Harvest (hundreds of kg)", yMax: 280, yStep: 40 } },
      correctAnswer: "4.5",
      explanation: "**SAT Pattern: Percent of a Whole**\n\n**The correct answer is $4.5$.**\n\n**The Fast Way (~40s):** Gala is $\\frac{240}{800} = 30\\%$ of the harvest, and $15\\%$ of that is rejected: $0.15(30) = 4.5\\%$.\n\n**The Full Solution:**\nStep 1: Read the five bars and total them: $240 + 200 + 160 + 120 + 80 = 800$ hundreds of kilograms.\nStep 2: The rejected Gala is $15\\%$ of the $240$ Gala bar: $0.15(240) = 36$ hundreds of kilograms.\nStep 3: Express that as a percent of the whole harvest: $\\frac{36}{800} = 0.045 = 4.5\\%$. Check the two-step version: Gala is $30\\%$ of the total, and $15\\%$ of $30\\%$ is $4.5\\%$ ✓\n\n**Common Mistakes:**\n* $30$: reporting Gala's share of the total harvest and never applying the $15\\%$ rejection rate.\n* $15$: repeating the rejection rate. That percent is measured against the Gala harvest alone, not against all five varieties.\n* $25.5$: computing the accepted Gala as a percent of the total, $\\frac{204}{800}$, which answers the opposite question.\n\n**Test Day Takeaway:** A percent is meaningless without its whole — when a rate applies to one category and the question asks about the full data set, multiply the two shares rather than reporting either one.",
      skills: ["percent-of-value"]
    },
    {
      id: 22,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "The table shows the number of clear and overcast nights recorded at an observatory in winter and in summer, where $n$ is the number of clear summer nights. The probability that a night chosen at random from the summer nights was clear is $0.75$. What is the probability that a night chosen at random from the clear nights was in summer?",
      diagram: { type: "twoWayTable", params: { headers: ["", "Clear", "Overcast", "Total"], rows: [["Winter", "72", "108", "180"], ["Summer", "n", "60", "n + 60"]] } },
      choices: [
        // distractor: reports the winter share of the clear nights, 72/252, instead of the summer share
        { id: "A", text: "$\\frac{2}{7}$" },
        // distractor: divides the 180 clear summer nights by the grand total of 420 nights rather than by the 252 clear nights
        { id: "B", text: "$\\frac{3}{7}$" },
        { id: "C", text: "$\\frac{5}{7}$" },
        // distractor: reuses the given 0.75, treating the probability of clear given summer as the probability of summer given clear
        { id: "D", text: "$\\frac{3}{4}$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** If $75\\%$ of summer nights are clear, the $60$ overcast nights are the other $25\\%$, so summer has $240$ nights and $n = 180$. Clear nights total $72 + 180 = 252$, and $\\frac{180}{252} = \\frac{5}{7}$.\n\n**The Full Solution:**\nStep 1: The given probability conditions on summer: $\\frac{n}{n + 60} = 0.75$.\nStep 2: Solve: $n = 0.75n + 45$, so $0.25n = 45$ and $n = 180$ clear summer nights, with $240$ summer nights in all.\nStep 3: Now condition on clear instead. Clear nights number $72 + 180 = 252$, of which $180$ are summer, so the probability is $\\frac{180}{252} = \\frac{5}{7}$. Check the first condition: $\\frac{180}{240} = 0.75$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{2}{7}$): this is $\\frac{72}{252}$, the probability that a clear night was in winter. It is the complement of the answer, not the answer.\n* Choice B ($\\frac{3}{7}$): this is $\\frac{180}{420}$, dividing by every night on record. Conditioning on clear means the denominator is the $252$ clear nights.\n* Choice D ($\\frac{3}{4}$): this recycles the given $0.75$. Conditional probability is not symmetric: $0.75$ of summer nights are clear, but only $\\frac{5}{7}$ of clear nights are in summer.\n\n**Test Day Takeaway:** The condition sets the denominator. Rebuild the missing cell from the first condition, then re-total along the other direction before dividing.",
      skills: ["conditional-probability", "two-way-table"]
    }
  ]
};

export default practiceTest4M2Easy;
