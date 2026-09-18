// Practice Test 7 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Official-calibration recreation (2026-09-01): all content re-authored fresh
// against the CB register; slot metadata and pattern slugs frozen. Figure
// density lifted to 4 diagram items (linearGraph, rightTriangle, scatterplot,
// twoWayTable). Numeric MC choices sorted ascending.

export const practiceTest7M2Easy = {
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
      question: "A store sells wall calendars and desk planners at the prices shown. Last week it sold $45$ of these items in all and collected $\\$390$. How many desk planners did it sell?",
      questionTable: { headers: ["Item", "Price"], rows: [["Wall calendar", "$\\$6$"], ["Desk planner", "$\\$10$"]] },
      choices: [
        // distractor: gives the number of wall calendars, the other variable, instead of the number of desk planners
        { id: "A", text: "$15$" },
        // distractor: divides the \$120 above the all-calendar baseline by \$6 (the calendar price) instead of by the \$4 price difference
        { id: "B", text: "$20$" },
        { id: "C", text: "$30$" },
        // distractor: divides the \$390 total by the \$10 planner price, ignoring the 45-item count entirely
        { id: "D", text: "$39$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** If all $45$ items were calendars the take would be $6(45)=\\$270$, which is $\\$120$ short; each planner swapped in adds $\\$10-\\$6=\\$4$, so $120\\div4=30$ planners.\n\n**The Full Solution:**\nStep 1: Let $c$ be the number of wall calendars and $d$ the number of desk planners. The count gives $c+d=45$ and the money gives $6c+10d=390$.\nStep 2: Solve the first equation for $c$: $c=45-d$. Substitute into the second: $6(45-d)+10d=390$, so $270-6d+10d=390$, or $270+4d=390$.\nStep 3: Then $4d=120$, so $d=30$, and $c=45-30=15$. Check: $6(15)+10(30)=90+300=390$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): this is $c$, the number of wall calendars. Substitution solves for one variable first, and stopping there answers the wrong question.\n* Choice B ($20$): divides the $\\$120$ shortfall by the $\\$6$ calendar price instead of by the $\\$4$ price difference: $120\\div6=20$.\n* Choice D ($39$): divides the $\\$390$ total by the $\\$10$ planner price, which ignores the $45$-item constraint: $390\\div10=39$.\n\n**Test Day Takeaway:** In a two-item count-and-cost system, substitute the count equation into the cost equation, then read the question again to see which variable it asked for.",
      skills: ["substitution-method"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "Anchor bolts for a library display sit at grid points $(3, 2)$, $(3, 11)$, and $(15, 2)$, where one unit is one foot. A triangular platform bolted at those three points covers how many square feet?",
      correctAnswer: "54",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $54$.**\n\n**The Fast Way (~15s):** Two of the bolts share $x=3$ and two share $y=2$, so the legs are $11-2=9$ and $15-3=12$; the area is $\\frac{1}{2}(12)(9)=54$.\n\n**The Full Solution:**\nStep 1: The points $(3,2)$ and $(3,11)$ have the same $x$-coordinate, so the segment between them is vertical with length $11-2=9$ feet.\nStep 2: The points $(3,2)$ and $(15,2)$ have the same $y$-coordinate, so the segment between them is horizontal with length $15-3=12$ feet. These two segments meet at $(3,2)$ at a right angle, so they are the base and the height.\nStep 3: Area $=\\frac{1}{2}(12)(9)=54$ square feet. Check: the platform is half of the $12$-by-$9$ rectangle, whose area is $108$, and $108\\div2=54$ ✓\n\n**Common Mistakes:**\n* $108$: multiplies the two leg lengths but forgets the $\\frac{1}{2}$ in the triangle area formula.\n* $36$: computes the perimeter instead of the area — the third side is $\\sqrt{12^2+9^2}=15$, and $9+12+15=36$.\n* $21$: adds the two leg lengths, $12+9$, instead of multiplying them.\n\n**Test Day Takeaway:** When two vertices share an $x$-coordinate and two share a $y$-coordinate, the triangle already has a right angle — the legs are just coordinate differences, so no distance formula is needed.",
      skills: ["triangle-area"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A battery cell is at a tolerance limit when its voltage $v$, in volts, differs from $3.70$ by exactly $0.15$. Which equation represents the two tolerance limits for $v$?",
      choices: [
        { id: "A", text: "$|v - 3.70| = 0.15$" },
        // distractor: swaps the reference value and the tolerance, so it measures distance from 0.15 rather than from 3.70
        { id: "B", text: "$|v - 0.15| = 3.70$" },
        // distractor: adds 3.70 instead of subtracting it, describing voltages 0.15 away from -3.70
        { id: "C", text: "$|v + 3.70| = 0.15$" },
        // distractor: uses the sum 3.70 + 0.15 = 3.85 as the distance instead of the tolerance 0.15
        { id: "D", text: "$|v - 3.70| = 3.85$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** “Differs from $3.70$ by exactly $0.15$” is the distance between $v$ and $3.70$, so $|v-3.70|=0.15$.\n\n**The Full Solution:**\nStep 1: The distance between $v$ and a reference value $r$ on a number line is written $|v-r|$. Here the reference value is $3.70$, so the distance is $|v-3.70|$.\nStep 2: That distance is stated to be exactly $0.15$, giving $|v-3.70|=0.15$.\nStep 3: Solving confirms the two limits: $v-3.70=0.15$ gives $v=3.85$, and $v-3.70=-0.15$ gives $v=3.55$. Check: both $3.85$ and $3.55$ sit $0.15$ from $3.70$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($|v - 0.15| = 3.70$): swaps the roles of the two numbers, so it measures distance from $0.15$ and its solutions are $3.85$ and $-3.55$.\n* Choice C ($|v + 3.70| = 0.15$): adds the reference value instead of subtracting it, which describes voltages near $-3.70$.\n* Choice D ($|v - 3.70| = 3.85$): uses $3.70+0.15=3.85$ as the distance, which produces limits of $7.55$ and $-0.15$.\n\n**Test Day Takeaway:** Inside the bars goes the variable minus the center; outside the bars goes the allowed distance. Center in, distance out.",
      skills: ["combining-like-terms"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A library district's e-book loans increased by $20\\%$ from last year to this year, and this year the district recorded a total of $46{,}800$ loans. How many e-book loans did the district record last year?",
      choices: [
        // distractor: takes 20% off this year's 46,800 instead of reversing a 20% increase: 46,800(0.8) = 37,440
        { id: "A", text: "$37{,}440$" },
        { id: "B", text: "$39{,}000$" },
        // distractor: applies the 20% increase a second time to this year's figure: 46,800(1.2) = 56,160
        { id: "C", text: "$56{,}160$" },
        // distractor: divides by 0.8 instead of 1.2, reversing a 20% decrease rather than a 20% increase
        { id: "D", text: "$58{,}500$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** This year is $1.2$ times last year, so last year $=46{,}800\\div1.2=39{,}000$.\n\n**The Full Solution:**\nStep 1: Let $L$ be last year's number of loans. A $20\\%$ increase multiplies $L$ by $1+0.20=1.20$, so $1.20L=46{,}800$.\nStep 2: Divide both sides by $1.20$: $L=\\dfrac{46{,}800}{1.20}=39{,}000$.\nStep 3: Check by going forward: $20\\%$ of $39{,}000$ is $7{,}800$, and $39{,}000+7{,}800=46{,}800$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($37{,}440$): subtracts $20\\%$ of this year's total instead of undoing the increase: $46{,}800(0.80)=37{,}440$. The percent was taken of the wrong base.\n* Choice C ($56{,}160$): increases this year's total by another $20\\%$: $46{,}800(1.20)=56{,}160$, running the change forward rather than backward.\n* Choice D ($58{,}500$): divides by $0.80$ instead of $1.20$, which would undo a $20\\%$ decrease.\n\n**Test Day Takeaway:** To undo a percent change, divide by the multiplier that caused it — $1.20$ for a $20\\%$ increase — never multiply by the same percent again.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "On a solar farm's layout drawing, mounting pier $A$ is located at $(-4, 3)$ and mounting pier $B$ is located at $(k, 11)$, where $k$ is a constant. The midpoint of $\\overline{AB}$ is $(5, 7)$. What is the value of $k$?",
      choices: [
        // distractor: drops the sign of the -4, solving 2(5) - 4 = 6 instead of 2(5) - (-4)
        { id: "A", text: "$6$" },
        // distractor: forgets to double the midpoint coordinate, computing 5 - (-4) = 9
        { id: "B", text: "$9$" },
        // distractor: applies the midpoint relation to the y-coordinates, computing 2(7) - 3 = 11
        { id: "C", text: "$11$" },
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** The midpoint's $x$-coordinate is the average of $-4$ and $k$, so $k=2(5)-(-4)=14$.\n\n**The Full Solution:**\nStep 1: The midpoint of a segment has $x$-coordinate $\\dfrac{x_A+x_B}{2}$. Here that gives $\\dfrac{-4+k}{2}=5$.\nStep 2: Multiply both sides by $2$: $-4+k=10$, so $k=14$.\nStep 3: Check both coordinates: the midpoint of $(-4,3)$ and $(14,11)$ is $\\left(\\dfrac{-4+14}{2},\\dfrac{3+11}{2}\\right)=(5,7)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): drops the negative on the $-4$, computing $2(5)-4=6$ instead of $2(5)-(-4)$.\n* Choice B ($9$): forgets to double the midpoint coordinate and computes $5-(-4)=9$, treating the midpoint as if it were the full run.\n* Choice C ($11$): runs the midpoint relation on the $y$-coordinates, computing $2(7)-3=11$, which is the wrong axis.\n\n**Test Day Takeaway:** With one endpoint and the midpoint known, the missing endpoint coordinate is $2(\\text{midpoint})-(\\text{known endpoint})$ — doubling first is what most sign errors skip.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "The figure shows a solar-panel bracket in the shape of right triangle $ABC$. Aluminum tubing $72$ inches long is bent to form all three edges of the bracket, and $\\sin A = \\frac{3}{5}$. How long, in inches, is $\\overline{BC}$?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [4, 0], [4, 3]], labels: ["A", "B", "C"], rightAngleVertex: 1, figureNote: true } },
      correctAnswer: "18",
      explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**The correct answer is $18$.**\n\n**The Fast Way (~25s):** $\\sin A=\\frac{3}{5}$ makes this a $3$-$4$-$5$ triangle scaled by $x$, so the perimeter is $12x=72$, giving $x=6$ and $BC=3x=18$.\n\n**The Full Solution:**\nStep 1: The right angle is at $B$, so $\\overline{AC}$ is the hypotenuse and $\\overline{BC}$ is the leg opposite $\\angle A$. Then $\\sin A=\\dfrac{BC}{AC}=\\dfrac{3}{5}$, so $BC=3x$ and $AC=5x$ for some positive $x$.\nStep 2: By the Pythagorean theorem the remaining leg is $AB=\\sqrt{(5x)^2-(3x)^2}=\\sqrt{16x^2}=4x$.\nStep 3: The three edges total $3x+4x+5x=12x=72$, so $x=6$ and $BC=3(6)=18$. Check: the sides are $18$, $24$, $30$, and $\\sin A=\\frac{18}{30}=\\frac{3}{5}$ ✓\n\n**Common Mistakes:**\n* $24$: reports $AB$, the leg adjacent to $\\angle A$, instead of the opposite leg $\\overline{BC}$.\n* $30$: reports the hypotenuse $AC=5x$ rather than the side the question asked for.\n* $43.2$: takes $\\frac{3}{5}$ of the whole $72$-inch perimeter, treating the sine ratio as a share of the perimeter.\n\n**Test Day Takeaway:** A sine or cosine of $\\frac{3}{5}$ hands you the whole side ratio $3:4:5$; add the ratio parts, set that sum equal to the perimeter, and every side follows from one scale factor.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A hardware supplier raised the price of a bucket of primer from $\\$28.50$ to $\\$34.20$ and raised the price of a paint roller from $\\$6.00$ by the same percent. What is the new price of the roller?",
      choices: [
        // distractor: applies the 20% as a decrease: 6.00(0.80) = 4.80
        { id: "A", text: "$\\$4.80$" },
        // distractor: divides the \$5.70 increase by the new price 34.20 instead of the original 28.50, getting 16.67% and 6.00(1.1667) = 7.00
        { id: "B", text: "$\\$7.00$" },
        { id: "C", text: "$\\$7.20$" },
        // distractor: adds the \$5.70 dollar increase to the roller price instead of the percent increase
        { id: "D", text: "$\\$11.70$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Percent Increase**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** $34.20\\div28.50=1.20$, a $20\\%$ increase, so the roller becomes $6.00(1.20)=\\$7.20$.\n\n**The Full Solution:**\nStep 1: The primer rose by $34.20-28.50=\\$5.70$. As a percent of the original price that is $\\dfrac{5.70}{28.50}=0.20$, or $20\\%$.\nStep 2: A $20\\%$ increase multiplies a price by $1.20$, so the new roller price is $6.00(1.20)$.\nStep 3: $6.00(1.20)=\\$7.20$. Check: $20\\%$ of $\\$6.00$ is $\\$1.20$, and $6.00+1.20=7.20$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\$4.80$): applies the $20\\%$ as a decrease, computing $6.00(0.80)=4.80$ instead of increasing.\n* Choice B ($\\$7.00$): divides the $\\$5.70$ increase by the new price $\\$34.20$ instead of the original $\\$28.50$, producing $16.\\overline{6}\\%$ and $6.00(1.16\\overline{6})=7.00$.\n* Choice D ($\\$11.70$): adds the $\\$5.70$ dollar increase to the roller price. Equal percent increases are not equal dollar increases.\n\n**Test Day Takeaway:** Percent change is always measured against the ORIGINAL amount; convert it to a multiplier once, then reuse that multiplier on the second quantity.",
      skills: ["percent-of-value", "percent-change"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A storage battery holds $8{,}000$ watt-hours of usable capacity when new, and its usable capacity decreases by $5\\%$ of its current value each year. To the nearest watt-hour, what is the usable capacity after $4$ years?",
      choices: [
        // distractor: treats the decay as linear, subtracting 5% of the ORIGINAL 8,000 four times: 8,000 - 4(400) = 6,400
        { id: "A", text: "$6{,}400$" },
        { id: "B", text: "$6{,}516$" },
        // distractor: uses an exponent of 3 instead of 4: 8,000(0.95)^3 = 6,859
        { id: "C", text: "$6{,}859$" },
        // distractor: applies the 5% decrease only once: 8,000(0.95) = 7,600
        { id: "D", text: "$7{,}600$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Losing $5\\%$ of the current value leaves $95\\%$, so the capacity is $8{,}000(0.95)^4\\approx6{,}516$ watt-hours.\n\n**The Full Solution:**\nStep 1: “Decreases by $5\\%$ of its current value” means each year multiplies the capacity by $1-0.05=0.95$, which is exponential decay, not a fixed subtraction.\nStep 2: After $t$ years the capacity is $C(t)=8{,}000(0.95)^t$, so after $4$ years it is $8{,}000(0.95)^4$.\nStep 3: $(0.95)^4=0.81450625$, so $C(4)=8{,}000(0.81450625)=6{,}516.05$, or $6{,}516$ watt-hours. Check: stepping down year by year gives $7{,}600$, $7{,}220$, $6{,}859$, $6{,}516$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6{,}400$): treats the loss as a fixed $400$ watt-hours per year: $8{,}000-4(400)=6{,}400$. That is linear decay, and it always undershoots true decay.\n* Choice C ($6{,}859$): uses an exponent of $3$, the capacity after only three years.\n* Choice D ($7{,}600$): applies the $5\\%$ decrease a single time and stops.\n\n**Test Day Takeaway:** “By $r\\%$ of its current value” is the exponential signal — build the multiplier $1-r$ once and raise it to the number of periods.",
      skills: ["exponential-growth-decay"]
    },
    {
      id: 9,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The table shows the number of juniors and seniors at a high school who ride the bus to school and who walk to school, where $k$ is a constant. The probability that a randomly selected bus rider is a senior is $0.4$. What is the value of $k$?",
      questionTable: { headers: ["", "Rides the bus", "Walks"], rows: [["Juniors", "$45$", "$60$"], ["Seniors", "$k$", "$72$"]] },
      correctAnswer: "30",
      explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~25s):** Seniors are $0.4$ of the bus riders, so juniors are the other $0.6$; $45$ juniors correspond to $0.6$, so $0.4$ corresponds to $45\\cdot\\frac{0.4}{0.6}=30$.\n\n**The Full Solution:**\nStep 1: “A randomly selected bus rider is a senior” restricts the sample space to the bus column, whose total is $45+k$. The favorable count is $k$.\nStep 2: So $\\dfrac{k}{45+k}=0.4$. Multiply both sides by $45+k$: $k=0.4(45+k)=18+0.4k$.\nStep 3: Then $0.6k=18$, so $k=30$. Check: the bus column totals $45+30=75$, and $\\dfrac{30}{75}=0.4$ ✓\n\n**Common Mistakes:**\n* $18$: computes $0.4(45)$, using only the junior bus count as the denominator instead of the whole bus column.\n* $48$: reverses the condition and solves $\\dfrac{k}{k+72}=0.4$, which answers “the probability that a senior rides the bus.”\n* $27$: computes $0.6(45)$, applying the leftover $60\\%$ to the junior count rather than solving the equation.\n\n**Test Day Takeaway:** In a conditional probability the given condition names the denominator — here the bus column — and that denominator must include the unknown when the unknown sits inside it.",
      skills: ["conditional-probability", "two-way-table"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A stationery wholesaler charges $C = 4.5n + k$ dollars for an order of $n$ notebooks, where $k$ is a fixed handling fee. An order of $60$ notebooks costs $\\$312$. What is the cost, in dollars, of an order of $100$ notebooks?",
      choices: [
        // distractor: computes 4.5(100) and omits the \$42 handling fee entirely
        { id: "A", text: "$450$" },
        { id: "B", text: "$492$" },
        // distractor: scales the \$312 total proportionally, 312(100/60) = 520, treating the cost as directly proportional to n
        { id: "C", text: "$520$" },
        // distractor: adds the \$42 handling fee twice: 450 + 2(42) = 534
        { id: "D", text: "$534$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $312-4.5(60)=42$ is the handling fee, so $100$ notebooks cost $4.5(100)+42=\\$492$.\n\n**The Full Solution:**\nStep 1: Substitute the known order into $C=4.5n+k$: $312=4.5(60)+k$, so $312=270+k$.\nStep 2: Solve for the fee: $k=312-270=42$ dollars. The fee is charged once per order, not once per notebook.\nStep 3: Now evaluate at $n=100$: $C=4.5(100)+42=450+42=492$ dollars. Check: the extra $40$ notebooks add $4.5(40)=\\$180$, and $312+180=492$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($450$): computes $4.5(100)$ and forgets the $\\$42$ handling fee.\n* Choice C ($520$): scales the $\\$312$ by $\\frac{100}{60}$. That would be right only if the cost were directly proportional to $n$, but the fixed fee breaks proportionality.\n* Choice D ($534$): adds the $\\$42$ fee a second time on top of the fee already inside the $\\$312$ order.\n\n**Test Day Takeaway:** A fixed fee makes cost linear but NOT proportional — solve for the fee first, then rebuild the total; never scale one total to another.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The table shows the energy produced by a rooftop solar array during each of three months. Given that $1$ kilowatt-hour is equal to $3.6$ megajoules, how many megajoules of energy did the array produce during these three months?",
      questionTable: { headers: ["Month", "Energy produced (kilowatt-hours)"], rows: [["June", "$545$"], ["July", "$610$"], ["August", "$645$"]] },
      choices: [
        // distractor: divides the 1,800 kilowatt-hour total by 3.6 instead of multiplying: 1,800/3.6 = 500
        { id: "A", text: "$500$" },
        // distractor: converts only August's 645 kilowatt-hours: 645(3.6) = 2,322
        { id: "B", text: "$2{,}322$" },
        // distractor: multiplies the total by 3 instead of 3.6: 1,800(3) = 5,400
        { id: "C", text: "$5{,}400$" },
        { id: "D", text: "$6{,}480$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The three months total $1{,}800$ kilowatt-hours, and $1{,}800(3.6)=6{,}480$ megajoules.\n\n**The Full Solution:**\nStep 1: Add the three monthly amounts: $545+610+645=1{,}800$ kilowatt-hours.\nStep 2: Set up the conversion so kilowatt-hours cancel: $1{,}800\\ \\text{kWh}\\times\\dfrac{3.6\\ \\text{MJ}}{1\\ \\text{kWh}}$.\nStep 3: That gives $1{,}800(3.6)=6{,}480$ megajoules. Check: a megajoule is smaller than a kilowatt-hour, so the number of megajoules must be larger than $1{,}800$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($500$): divides by $3.6$ instead of multiplying, flipping the conversion factor upside down.\n* Choice B ($2{,}322$): converts only August's $645$ kilowatt-hours and skips the sum.\n* Choice C ($5{,}400$): multiplies by $3$ rather than $3.6$, dropping the tenths digit of the conversion factor.\n\n**Test Day Takeaway:** Write the conversion as a fraction with the unit you are leaving on the bottom — if the units cancel, the multiplication is pointed the right way.",
      skills: ["unit-conversion"]
    },
    {
      id: 12,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A supplier prints rectangular price tags whose length is $2.5$ times their width. One tag covers $40$ square centimeters of a shelf strip. How many centimeters wide is a tag?",
      correctAnswer: "4",
      explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~20s):** Area $=w(2.5w)=2.5w^2=40$, so $w^2=16$ and $w=4$ centimeters.\n\n**The Full Solution:**\nStep 1: Let $w$ be the width in centimeters. The length is $2.5w$, so the area is $w(2.5w)=2.5w^2$.\nStep 2: Set the area equal to the given value: $2.5w^2=40$, so $w^2=\\dfrac{40}{2.5}=16$.\nStep 3: Since a width must be positive, $w=\\sqrt{16}=4$ centimeters. Check: the length is $2.5(4)=10$, and $4(10)=40$ square centimeters ✓\n\n**Common Mistakes:**\n* $10$: solves correctly but reports the length $2.5w$ instead of the width.\n* $16$: stops at $w^2=16$ without taking the square root.\n* $6.32$: computes $\\sqrt{40}$, treating the tag as a square and ignoring the $2.5$ ratio.\n\n**Test Day Takeaway:** When one dimension is a multiple of the other, write both in terms of a single variable before setting the area equation — the square root at the end is the step most often skipped.",
      skills: ["triangle-area"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A library's summer reading log grows at a constant rate of $15$ items per week. The log recorded $120$ items in week $4$ and $300$ items in week $t$, where $t$ is a constant. What is the value of $t$?",
      choices: [
        // distractor: finds the 12-week gap correctly but subtracts it from week 4 instead of adding: 12 - 4 = 8
        { id: "A", text: "$8$" },
        // distractor: uses t rather than t - 4 in the denominator, solving 180/t = 15
        { id: "B", text: "$12$" },
        { id: "C", text: "$16$" },
        // distractor: divides 300 by 15, ignoring the 120 items already recorded in week 4
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The log gains $300-120=180$ items at $15$ per week, which takes $12$ weeks, so $t=4+12=16$.\n\n**The Full Solution:**\nStep 1: The two readings are the points $(4,120)$ and $(t,300)$, and a constant rate of change is a slope: $\\dfrac{300-120}{t-4}=15$.\nStep 2: Simplify the numerator and clear the fraction: $\\dfrac{180}{t-4}=15$, so $180=15(t-4)$ and $t-4=12$.\nStep 3: Therefore $t=16$. Check: from week $4$ to week $16$ is $12$ weeks, and $120+15(12)=300$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): finds the $12$-week gap but subtracts it from the starting week, computing $12-4=8$ instead of $4+12$.\n* Choice B ($12$): drops the $-4$ from the denominator and solves $\\dfrac{180}{t}=15$, which finds the elapsed weeks, not the week number.\n* Choice D ($20$): divides $300$ by $15$, treating the log as starting from $0$ items at week $0$ and ignoring the week-$4$ reading.\n\n**Test Day Takeaway:** A constant rate is a slope between two points — put the value difference over the time difference, and remember the denominator is a difference of week numbers, not a week number.",
      skills: ["slope-from-points"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A bulk-goods retailer computes a shelf price, in dollars, using the expression $\\sqrt[4]{16x^{12}}$, where $x$ is a positive constant set by the warehouse. Which of the following expressions is equivalent to the given expression?",
      choices: [
        { id: "A", text: "$2x^{3}$" },
        // distractor: subtracts the index from the exponent, 12 - 4 = 8, instead of dividing 12 by 4
        { id: "B", text: "$2x^{8}$" },
        // distractor: takes the square root of 16 instead of its fourth root, giving 4 rather than 2
        { id: "C", text: "$4x^{3}$" },
        // distractor: applies the fourth root only to the variable and leaves the coefficient 16 unchanged
        { id: "D", text: "$16x^{3}$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** A fourth root is the power $\\frac{1}{4}$: $16^{1/4}=2$ and $(x^{12})^{1/4}=x^{3}$, so the expression is $2x^{3}$.\n\n**The Full Solution:**\nStep 1: Rewrite the radical as a rational exponent: $\\sqrt[4]{16x^{12}}=(16x^{12})^{1/4}$.\nStep 2: Distribute the exponent over the product: $(16)^{1/4}\\cdot(x^{12})^{1/4}$. Since $2^4=16$, the coefficient is $16^{1/4}=2$.\nStep 3: For the variable, multiply exponents: $(x^{12})^{1/4}=x^{12/4}=x^{3}$, so the expression equals $2x^{3}$. Check: $(2x^{3})^{4}=2^{4}x^{12}=16x^{12}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($2x^{8}$): subtracts the index from the exponent, $12-4=8$. Roots divide exponents; they do not subtract from them.\n* Choice C ($4x^{3}$): takes $\\sqrt{16}=4$ instead of $\\sqrt[4]{16}=2$, using the wrong index on the coefficient.\n* Choice D ($16x^{3}$): applies the fourth root to $x^{12}$ but leaves the $16$ untouched, so the coefficient never gets rooted.\n\n**Test Day Takeaway:** Convert the radical to a $\\frac{1}{n}$ exponent and apply it to EVERY factor — coefficient included — then verify by raising your answer back to the $n$th power.",
      skills: ["exponent-rules", "radical-expressions"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The edge of a sprinkler's watered region is graphed in the $xy$-plane, and every point on that edge satisfies $x^{2} - 10x + y^{2} + 6y = m$ for some constant $m$. If the region has a radius of $8$ meters, what is the value of $m$?",
      choices: [
        // distractor: uses the radius 8 where the radius squared belongs: 8 - 34 = -26
        { id: "A", text: "$-26$" },
        { id: "B", text: "$30$" },
        // distractor: completes the square on the x-terms only, adding 25 but forgetting the 9 from the y-terms: 64 - 25 = 39
        { id: "C", text: "$39$" },
        // distractor: adds 34 to 64 instead of subtracting it: 64 + 34 = 98
        { id: "D", text: "$98$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Completing both squares adds $25+9=34$ to the left side, so $m+34=8^{2}=64$ and $m=30$.\n\n**The Full Solution:**\nStep 1: Group the variables: $(x^{2}-10x)+(y^{2}+6y)=m$. Half of $-10$ is $-5$ and $(-5)^{2}=25$; half of $6$ is $3$ and $3^{2}=9$.\nStep 2: Add $25$ and $9$ to both sides: $(x-5)^{2}+(y+3)^{2}=m+25+9=m+34$.\nStep 3: In standard form the right side is $r^{2}$, so $m+34=8^{2}=64$ and $m=30$. Check: with $m=30$ the right side is $30+34=64$, and $\\sqrt{64}=8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-26$): sets $m+34=8$, using the radius itself where $r^{2}$ belongs.\n* Choice C ($39$): completes the square on the $x$-terms only, adding $25$ and forgetting the $9$ the $y$-terms require: $64-25=39$.\n* Choice D ($98$): adds $34$ to $64$ instead of subtracting, moving the completing-the-square constants to the wrong side.\n\n**Test Day Takeaway:** Completing the square adds the SAME constants to both sides; the right side then equals $r^{2}$, never $r$.",
      skills: ["circle-equation", "completing-square-circles"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The table shows the number of items returned late to a library on each of $7$ days. By how much does the mean of the $7$ values decrease when the value $40$ is removed from the data set?",
      questionTable: { headers: ["Day", "Items returned late"], rows: [["1", "$6$"], ["2", "$2$"], ["3", "$40$"], ["4", "$5$"], ["5", "$7$"], ["6", "$4$"], ["7", "$6$"]] },
      correctAnswer: "5",
      explanation: "**SAT Pattern: Outlier Effect**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~30s):** The seven values total $70$, so the mean is $10$; dropping the $40$ leaves $30$ over $6$ days, a mean of $5$, a decrease of $5$.\n\n**The Full Solution:**\nStep 1: Add all seven values: $6+2+40+5+7+4+6=70$, so the mean of the full set is $\\dfrac{70}{7}=10$.\nStep 2: Remove the $40$. The remaining six values total $70-40=30$, so their mean is $\\dfrac{30}{6}=5$.\nStep 3: The mean falls from $10$ to $5$, a decrease of $10-5=5$. Check: every remaining value lies between $2$ and $7$, so a mean of $5$ is reasonable and a mean of $10$ was being propped up entirely by the outlier ✓\n\n**Common Mistakes:**\n* $4$: reports the gap between the original mean and the original median, $10-6=4$, rather than the change in the mean.\n* $0.5$: reports the change in the MEDIAN, which moves only from $6$ to $5.5$ — exactly the point that the median resists outliers.\n* $5.71$: divides the outlier by the original count, $\\dfrac{40}{7}$, instead of recomputing the mean from the remaining values.\n\n**Test Day Takeaway:** Removing a value changes both the sum and the count — recompute the mean from the new sum over the new count rather than adjusting the old mean.",
      skills: ["calculate-mean", "find-median"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "On a supermarket floor plan, one aisle marking is graphed as $ax + 8y = b$ and a second is graphed as $3x - 2y = 7$, where $a$ and $b$ are constants. The two markings never meet, and $(4, -1)$ lies on the first marking. What is the value of $b$?",
      choices: [
        { id: "A", text: "$-56$" },
        // distractor: substitutes only the x-term, dropping 8y: -12(4) = -48
        { id: "B", text: "$-48$" },
        // distractor: solves -a/8 = 3/2 as a = 12, losing the negative sign: 12(4) + 8(-1) = 40
        { id: "C", text: "$40$" },
        // distractor: swaps the coordinates of the point, computing -12(-1) + 8(4) = 44
        { id: "D", text: "$44$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Never meeting means equal slopes: $-\\frac{a}{8}=\\frac{3}{2}$ gives $a=-12$, and $-12(4)+8(-1)=-56$.\n\n**The Full Solution:**\nStep 1: Two distinct lines never meet exactly when they are parallel, so the two graphs have the same slope. Solving $3x-2y=7$ for $y$ gives $y=\\frac{3}{2}x-\\frac{7}{2}$, a slope of $\\frac{3}{2}$.\nStep 2: Solving $ax+8y=b$ for $y$ gives $y=-\\frac{a}{8}x+\\frac{b}{8}$, so $-\\frac{a}{8}=\\frac{3}{2}$. Multiplying by $-8$ gives $a=-12$.\nStep 3: The point $(4,-1)$ satisfies the equation: $-12(4)+8(-1)=-48-8=-56$, so $b=-56$. Check: $-12x+8y=-56$ simplifies to $y=\\frac{3}{2}x-7$, whose slope is $\\frac{3}{2}$ and which contains $(4,-1)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-48$): substitutes the point into $ax$ only and forgets the $8y$ term: $-12(4)=-48$.\n* Choice C ($40$): drops the negative when solving $-\\frac{a}{8}=\\frac{3}{2}$, taking $a=12$, which gives $12(4)+8(-1)=40$ and a line that is not parallel.\n* Choice D ($44$): swaps the coordinates of the point, computing $-12(-1)+8(4)=44$.\n\n**Test Day Takeaway:** In $Ax+By=C$ the slope is $-\\frac{A}{B}$; match that to the other line's slope first, then let the given point supply the constant.",
      skills: ["writing-parallel-equation"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "Two straight guy wires on a wind-turbine mast intersect, and the four angles at the intersection form two pairs of vertical angles. The angles in one pair each measure $(2t)^{\\circ}$ and the angles in the other pair each measure $(3t + 40)^{\\circ}$, where $t$ is a constant. What is the smaller of the two angle measures, in degrees?",
      correctAnswer: "56",
      explanation: "**SAT Pattern: Vertical Angles**\n\n**The correct answer is $56$.**\n\n**The Fast Way (~30s):** An angle from each pair forms a straight line, so $2t+(3t+40)=180$, giving $t=28$ and the smaller measure $2t=56$.\n\n**The Full Solution:**\nStep 1: Two crossing lines create two pairs of vertical angles. Vertical angles are equal, which is why each pair carries a single expression, and an angle from one pair is supplementary to an angle from the other.\nStep 2: Therefore $2t+(3t+40)=180$, so $5t+40=180$ and $5t=140$, giving $t=28$.\nStep 3: The two measures are $2t=56$ and $3t+40=124$, so the smaller is $56$ degrees. Check: $56+124=180$, and the four angles $56$, $124$, $56$, $124$ total $360$ ✓\n\n**Common Mistakes:**\n* $28$: stops at $t$ instead of substituting it back into $2t$.\n* $124$: solves correctly but reports the larger pair's measure.\n* $90$: assumes the two wires cross at right angles, which the setup never states.\n\n**Test Day Takeaway:** Vertical angles are equal and adjacent angles are supplementary — set the two DIFFERENT expressions equal to $180$, not equal to each other.",
      skills: ["angles"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A site plan shows a drainage line that is perpendicular to the segment joining $(0, 8)$ and $(15, 2)$, and the point $(-2, 7)$ lies on the drainage line. Which of the following equations represents the drainage line, where $x$ and $y$ are measured in meters from a survey marker?",
      choices: [
        // distractor: takes the reciprocal of the segment's slope but keeps it negative, using -5/2 instead of 5/2
        { id: "A", text: "$y = -\\frac{5}{2}x + 2$" },
        // distractor: reuses the segment's own slope of -2/5, giving a parallel line rather than a perpendicular one
        { id: "B", text: "$y = -\\frac{2}{5}x + \\frac{31}{5}$" },
        // distractor: flips the sign of the segment's slope to 2/5 without taking the reciprocal
        { id: "C", text: "$y = \\frac{2}{5}x + \\frac{39}{5}$" },
        { id: "D", text: "$y = \\frac{5}{2}x + 12$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The segment's slope is $\\frac{2-8}{15-0}=-\\frac{2}{5}$, so the drainage line's slope is $\\frac{5}{2}$; through $(-2,7)$ that gives $y=\\frac{5}{2}x+12$.\n\n**The Full Solution:**\nStep 1: Slope of the segment: $\\dfrac{2-8}{15-0}=\\dfrac{-6}{15}=-\\dfrac{2}{5}$. Reducing the fraction matters here — the unreduced $-\\frac{6}{15}$ hides the clean reciprocal.\nStep 2: Perpendicular slopes are negative reciprocals, so the drainage line has slope $\\dfrac{5}{2}$. Both the sign and the flip are required.\nStep 3: Use $(-2,7)$: $7=\\dfrac{5}{2}(-2)+b=-5+b$, so $b=12$ and the line is $y=\\dfrac{5}{2}x+12$. Check: $\\left(-\\frac{2}{5}\\right)\\left(\\frac{5}{2}\\right)=-1$, and substituting $x=-2$ gives $y=7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y=-\\frac{5}{2}x+2$): flips the fraction but keeps the negative sign, so the slope is $-\\frac{5}{2}$ instead of $\\frac{5}{2}$.\n* Choice B ($y=-\\frac{2}{5}x+\\frac{31}{5}$): keeps the segment's own slope, producing a line parallel to the segment rather than perpendicular to it.\n* Choice C ($y=\\frac{2}{5}x+\\frac{39}{5}$): changes the sign but never takes the reciprocal, so the slope is $\\frac{2}{5}$.\n\n**Test Day Takeaway:** Perpendicular means negative AND reciprocal — do both moves, then confirm by multiplying the two slopes and looking for $-1$.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A copy shop's charge for $x$ copies can be written as $\\frac{a}{3}(6x - 9) + 5$ dollars and also as $4x + b$ dollars, where $a$ and $b$ are constants and $x$ is the number of copies. The two forms give the same charge for every value of $x$. What is the value of $a + b$?",
      choices: [
        // distractor: drops the +5 when matching constants, taking b = -3a = -6 so that a + b = -4
        { id: "A", text: "$-4$" },
        // distractor: fails to multiply the -9 by a/3, taking the constant term as -9 + 5 = -4 so that a + b = -2
        { id: "B", text: "$-2$" },
        { id: "C", text: "$1$" },
        // distractor: mishandles the sign of (a/3)(-9), taking b = 3a + 5 = 11 so that a + b = 13
        { id: "D", text: "$13$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Expanding gives $2ax-3a+5$; matching $2a=4$ gives $a=2$, so $b=-3(2)+5=-1$ and $a+b=1$.\n\n**The Full Solution:**\nStep 1: Distribute: $\\dfrac{a}{3}(6x-9)+5=\\dfrac{6a}{3}x-\\dfrac{9a}{3}+5=2ax-3a+5$.\nStep 2: Two expressions equal for every $x$ must have identical coefficients. Matching the $x$-terms: $2a=4$, so $a=2$.\nStep 3: Matching the constant terms: $b=-3a+5=-3(2)+5=-1$, so $a+b=2+(-1)=1$. Check: with $a=2$ the first form is $\\frac{2}{3}(6x-9)+5=4x-6+5=4x-1$, which matches $4x+b$ when $b=-1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): forgets the $+5$ sitting outside the parentheses, taking $b=-3a=-6$ and $2+(-6)=-4$.\n* Choice B ($-2$): distributes $\\frac{a}{3}$ to the $6x$ but not to the $-9$, so the constant becomes $-9+5=-4$ and $2+(-4)=-2$.\n* Choice D ($13$): drops the negative on $\\frac{a}{3}(-9)$, taking $b=3a+5=11$ and $2+11=13$.\n\n**Test Day Takeaway:** “Same value for every $x$” means expand fully, then set $x$-coefficients equal and constants equal separately — the constant match is where the distributed sign gets lost.",
      skills: ["distributive-property"]
    },
    {
      id: 21,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "A feeder pump fills an irrigation reservoir at a constant rate. The graph shows the volume $V$, in cubic meters, of water in the reservoir $t$ hours after the pump was switched on. The reservoir holds $90$ cubic meters $d$ hours after the pump was switched on. What is the value of $d$?",
      diagram: { type: "linearGraph", params: { slope: 2, yIntercept: 8, xRange: [0, 8], yRange: [0, 24], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showPoints: [[2, 12], [6, 20]], label: "V" } },
      correctAnswer: "41",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**The correct answer is $41$.**\n\n**The Fast Way (~40s):** From $(2,12)$ to $(6,20)$ the volume rises $8$ cubic meters over $4$ hours, so $V=2t+8$; then $90=2d+8$ gives $d=41$.\n\n**The Full Solution:**\nStep 1: Read the two marked points from the graph: $(2,12)$ and $(6,20)$. The rate is $\\dfrac{20-12}{6-2}=\\dfrac{8}{4}=2$ cubic meters per hour.\nStep 2: Find the starting volume. Using $(2,12)$: $12=2(2)+V_0$, so $V_0=12-4=8$ cubic meters were already in the reservoir when the pump started, and $V=2t+8$.\nStep 3: Set $V=90$: $90=2d+8$, so $2d=82$ and $d=41$ hours. Check: $2(41)+8=82+8=90$ ✓\n\n**Common Mistakes:**\n* $45$: divides $90$ by $2$ and ignores the $8$ cubic meters already in the reservoir at $t=0$.\n* $49$: adds the $8$ instead of subtracting it, computing $\\dfrac{98}{2}$.\n* $15$: uses $\\dfrac{12}{2}=6$ cubic meters per hour as the rate, which is the average from the origin rather than the slope of the line.\n\n**Test Day Takeaway:** A line through two graph points gives a rate AND a starting value — subtract the starting value before dividing by the rate, or every backward question comes out short.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 22,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "At a school, $55\\%$ of all students take Spanish and $20\\%$ of all students take both chemistry and Spanish. Among the students who take chemistry, $40\\%$ take Spanish. If $k$ percent of the students take chemistry, what is the value of $k$?",
      choices: [
        // distractor: multiplies 0.40 by 20 instead of dividing 20 by 0.40
        { id: "A", text: "$8$" },
        // distractor: reports the 20 percent who take both courses as the chemistry percentage
        { id: "B", text: "$20$" },
        // distractor: reports the conditional percentage 40 itself as the chemistry percentage
        { id: "C", text: "$40$" },
        { id: "D", text: "$50$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The $20\\%$ who take both are $40\\%$ of the chemistry students, so chemistry students are $20\\div0.40=50$ percent of the school.\n\n**The Full Solution:**\nStep 1: Suppose the school has $100$ students. Then $20$ of them take both chemistry and Spanish, and $k$ of them take chemistry.\nStep 2: “Among the students who take chemistry, $40\\%$ take Spanish” makes the chemistry group the denominator: $\\dfrac{20}{k}=0.40$.\nStep 3: Solving, $k=\\dfrac{20}{0.40}=50$. Check: $40\\%$ of $50$ chemistry students is $20$ students, which matches the $20\\%$ of the school who take both ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): multiplies $0.40(20)=8$ instead of dividing. Multiplying would find the both-group from the chemistry group, which is the direction already given.\n* Choice B ($20$): reports the percent who take both courses; that group is only part of the chemistry group, so it must be smaller than $k$.\n* Choice C ($40$): reports the conditional percentage itself, confusing a percent OF the chemistry students with a percent of the whole school.\n\n**Test Day Takeaway:** A conditional percent is measured against the condition group, so the overlap divided by the conditional rate recovers that group's size — divide, do not multiply.",
      skills: ["conditional-probability"]
    }
  ]
};

export default practiceTest7M2Easy;
