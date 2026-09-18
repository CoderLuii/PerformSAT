// Practice Test 7 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// prior blueprint: M1 5E/9M/8H, domains 7/6/5/4. M2 3E/7M/12H wavy flow.
// Figure density lifted to official ~20%: M1 carries 4 diagram items,
// M2 carries 4. Numeric MC choices sorted ascending (official convention).

export const practiceTest7 = {
  id: "practice-test-7",
  title: "Practice Test 7",
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
  question: "For one performance, a concert hall filled 240 seats across the two seat types priced in the table and took in \\$6,240 in ticket revenue. How many of those seats were in the orchestra section?",
  diagram: { type: "dataTable", params: { headers: ["Seat type", "Price per ticket (dollars)"], rows: [["Balcony", "18"], ["Orchestra", "30"]] } },
  choices: [
    // distractor: solves the system correctly but reports the balcony count instead of the orchestra count
    { id: "A", text: "$80$" },
    // distractor: splits the 240 seats evenly between the two prices instead of using the revenue equation
    { id: "B", text: "$120$" },
    { id: "C", text: "$160$" },
    // distractor: divides the full \$6,240 by the \$30 orchestra price, ignoring the balcony revenue
    { id: "D", text: "$208$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** If all $240$ seats sold at the \\$18 balcony price the hall would take in \\$4,320, and every seat moved to the orchestra adds \\$12. Since $6240 - 4320 = 1920$ and $1920 \\div 12 = 160$, there were $160$ orchestra seats.\n\n**The Full Solution:**\nStep 1: Let $b$ be the number of balcony seats and $r$ the number of orchestra seats. The seat count gives $b + r = 240$, and the table's prices give $18b + 30r = 6240$.\nStep 2: Substitute $b = 240 - r$ into the revenue equation: $18(240 - r) + 30r = 6240$, so $4320 + 12r = 6240$ and $12r = 1920$.\nStep 3: Divide by $12$ to get $r = 160$, so $b = 80$. Check both equations: $80 + 160 = 240$ and $18(80) + 30(160) = 1440 + 4800 = 6240$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($80$): this is $b$, the balcony count. The system is set up correctly and then the wrong variable is reported — label each variable before you solve.\n* Choice B ($120$): this splits $240$ in half, which would only be right if the two prices were equal; it never uses the \\$6,240 total, so it ignores half the given information.\n* Choice D ($208$): this is $6240 \\div 30$, the seat count if every dollar came from orchestra tickets. The balcony seats also contributed revenue, so this overcounts.\n\n**Test Day Takeaway:** A two-price total is always two equations — one counting items, one counting dollars. Write both before touching the arithmetic, and circle which variable the question actually asks for.",
  skills: ["word-problem-to-equation", "setting-up-systems"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "At a county clinic, the number of vaccine doses remaining after $d$ days of a vaccination drive is given by $n = 384 - 12d$. For what value of $d$ is $n = 156$?",
  choices: [
    // distractor: divides 156 by 12, using the doses left rather than the doses used
    { id: "A", text: "$13$" },
    { id: "B", text: "$19$" },
    // distractor: divides 384 by 12, finding the day the supply runs out instead of the day 156 remain
    { id: "C", text: "$32$" },
    // distractor: adds 384 and 156 before dividing by 12 instead of subtracting
    { id: "D", text: "$45$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The drive has used $384 - 156 = 228$ doses, and it uses $12$ per day, so $d = 228 \\div 12 = 19$.\n\n**The Full Solution:**\nStep 1: Substitute $156$ for $n$: $384 - 12d = 156$.\nStep 2: Subtract $384$ from both sides: $-12d = -228$.\nStep 3: Divide both sides by $-12$: $d = 19$. Check: $384 - 12(19) = 384 - 228 = 156$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($13$): this is $156 \\div 12$, which treats the doses still on the shelf as the doses already given. Only the $228$ used doses are divided by the daily rate.\n* Choice C ($32$): this is $384 \\div 12$, the day the supply reaches $0$, not the day $156$ doses remain.\n* Choice D ($45$): this is $(384 + 156) \\div 12$; the constant moves across the equals sign by subtraction, not addition.\n\n**Test Day Takeaway:** In a \"starting amount minus rate times time\" model, isolate the variable term first. The number you divide by the rate is the amount used, not the amount left.",
  skills: ["combining-like-terms"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A maintenance log lists the potholes repaired on each of nine street segments as 12, 5, 17, 9, 11, 7, 14, 9, and 6. What is the median number repaired per segment?",
  choices: [
    { id: "A", text: "$9$" },
    // distractor: reports the mean, 90 divided by 9, instead of the median
    { id: "B", text: "$10$" },
    // distractor: takes the middle entry of the list as written without ordering the values first
    { id: "C", text: "$11$" },
    // distractor: reports the range, 17 minus 5
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Median Calculation**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Nine values means the median is the $5$th one in order. Sorted, the list is $5, 6, 7, 9, 9, 11, 12, 14, 17$, and the $5$th value is $9$.\n\n**The Full Solution:**\nStep 1: Order the nine counts from least to greatest: $5, 6, 7, 9, 9, 11, 12, 14, 17$.\nStep 2: With an odd count of $9$ values, the median sits at position $(9 + 1) \\div 2 = 5$.\nStep 3: The $5$th ordered value is $9$. Check: four values ($5, 6, 7, 9$) sit at or below it and four ($11, 12, 14, 17$) sit above it ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($10$): this is the mean, $90 \\div 9$. The mean is pulled up here by the $17$; the median ignores how far out the extremes sit.\n* Choice C ($11$): this is the $5$th number as the log happens to list it. The median is defined on the ordered list, so sorting is not optional.\n* Choice D ($12$): this is the range, $17 - 5$, which measures spread rather than center.\n\n**Test Day Takeaway:** Sort first, then count to the middle. For $n$ odd, the median is the $\\frac{n+1}{2}$th ordered value — never the middle of the list as printed.",
  skills: ["find-median"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A print studio charges \\$6 for each poster after the first 4, which are free. A second studio charges an \\$8 setup fee plus \\$2 for each poster. For how many posters do the two studios charge the same amount?",
  choices: [
    // distractor: distributes the 6 to only the first term, solving 6n - 4 = 2n + 8
    { id: "A", text: "$3$" },
    // distractor: adds the two per-poster rates instead of subtracting them, solving 8n = 32
    { id: "B", text: "$4$" },
    { id: "C", text: "$8$" },
    // distractor: divides 32 by the second studio's rate of 2 rather than by the difference of the rates, 4
    { id: "D", text: "$16$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Set $6(n - 4) = 2n + 8$. Expanding gives $6n - 24 = 2n + 8$, so $4n = 32$ and $n = 8$.\n\n**The Full Solution:**\nStep 1: With $n$ posters, the first studio charges for $n - 4$ of them at \\$6 each, or $6(n - 4)$ dollars; the second charges $2n + 8$ dollars.\nStep 2: Set the two totals equal and distribute: $6n - 24 = 2n + 8$.\nStep 3: Subtract $2n$ and add $24$ to both sides: $4n = 32$, so $n = 8$. Check: $6(8 - 4) = 24$ and $2(8) + 8 = 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): this comes from $6n - 4 = 2n + 8$, where the $6$ was multiplied only by $n$. The factor outside a parenthesis reaches every term inside it.\n* Choice B ($4$): this comes from $8n = 32$, adding the rates $6$ and $2$. Bringing $2n$ to the left subtracts it, giving $4n$.\n* Choice D ($16$): this divides $32$ by $2$, the second studio's rate, instead of by $4$, the coefficient that survives after combining like terms.\n\n**Test Day Takeaway:** \"Free for the first $k$ items\" always becomes a parenthesis, $rate \\times (n - k)$. Distribute it before you combine like terms, and divide by the coefficient you actually end up with.",
  skills: ["solving-equations"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Volunteers at a health department have assembled 26 outbreak-response kits and assemble 18 more each hour. What is the least whole number of hours after which at least 200 kits have been assembled?",
  choices: [
    // distractor: rounds 174 divided by 18 down to 9 instead of up
    { id: "A", text: "$9$" },
    { id: "B", text: "$10$" },
    // distractor: ignores the 26 kits already assembled and rounds 200 divided by 18 up
    { id: "C", text: "$12$" },
    // distractor: adds the 26 kits to 200 instead of subtracting them, then rounds 226 divided by 18 up
    { id: "D", text: "$13$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $200 - 26 = 174$ kits are still needed, and $174 \\div 18 \\approx 9.7$. A partial hour does not finish the job, so round up to $10$ hours.\n\n**The Full Solution:**\nStep 1: After $h$ hours the volunteers have $26 + 18h$ kits, so the condition is $26 + 18h \\geq 200$.\nStep 2: Subtract $26$: $18h \\geq 174$, so $h \\geq \\frac{174}{18} = 9.67$.\nStep 3: The least whole number that is at least $9.67$ is $10$. Check: at $h = 9$ they have $26 + 162 = 188$ kits, short of $200$; at $h = 10$ they have $26 + 180 = 206$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): this rounds $9.67$ down. Rounding down lands at $188$ kits, which fails the \"at least $200$\" requirement.\n* Choice C ($12$): this is $200 \\div 18$ rounded up, which throws away the $26$ kits that were finished before the hourly count started.\n* Choice D ($13$): this is $226 \\div 18$ rounded up; the starting stock is subtracted from the target, not added to it.\n\n**Test Day Takeaway:** For a \"$\\geq$\" target, solve the inequality, then round in the direction that keeps the statement true — for a minimum requirement that always means rounding up, even when the decimal is small.",
  skills: ["inequalities"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Water pressure in a straight main was measured at four distances from the pump station, as given in the table, and the readings are modeled by a linear function of distance. Which statement best interprets the slope of that model?",
  diagram: { type: "dataTable", params: { headers: ["Distance from pump station (km)", "Water pressure (psi)"], rows: [["2", "88"], ["4", "76"], ["6", "64"], ["8", "52"]] } },
  choices: [
    // distractor: keeps the size of the slope but drops its negative sign, so the reading is backwards
    { id: "A", text: "The water pressure increases by $6$ psi for each additional kilometer from the pump station." },
    // distractor: uses the 12 psi drop between consecutive rows without dividing by the 2 km step
    { id: "B", text: "The water pressure decreases by $12$ psi for each additional kilometer from the pump station." },
    // distractor: interprets the model's y-intercept, 100 psi at 0 km, rather than its slope
    { id: "C", text: "The water pressure is $100$ psi at the pump station." },
    { id: "D", text: "The water pressure decreases by $6$ psi for each additional kilometer from the pump station." }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Pressure falls $12$ psi every $2$ km, and $-12 \\div 2 = -6$: the model loses $6$ psi per kilometer.\n\n**The Full Solution:**\nStep 1: Take any two rows, say $(2, 88)$ and $(4, 76)$. The slope is $\\frac{76 - 88}{4 - 2} = \\frac{-12}{2} = -6$.\nStep 2: The units of the slope are the units of the second column over the units of the first, so $-6$ means psi per kilometer, and the negative sign means the pressure drops.\nStep 3: Confirm the rate holds across the table: $(6, 64)$ and $(8, 52)$ give $\\frac{52 - 64}{8 - 6} = -6$ as well ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: the size $6$ is right, but the pressure column is falling, so the slope is negative. Reading the magnitude and ignoring the sign reverses the physical claim.\n* Choice B: $12$ is the drop between consecutive rows, and those rows are $2$ km apart. A slope is a change divided by the change in the input, so $12$ must still be divided by $2$.\n* Choice C: this describes the intercept. It is a true consequence of the model — extending back to $0$ km gives $88 + 2(6) = 100$ psi — but the question asks what the slope means.\n\n**Test Day Takeaway:** A slope read from a table is (change in the output column) over (change in the input column). Check the step size in the input column before you quote a rate, and carry the sign into the sentence.",
  skills: ["slope-intercept-form"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "In a clinic's staffing model, the number of morning shifts $x$ and the number of evening shifts $y$ obey the two constraints $5x + 3y = 63$ and $2x - 3y = k$. If the model schedules 12 morning shifts, what is the value of the constant $k$?",
  correctAnswer: "21",
  explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**The correct answer is $21$.**\n\n**The Fast Way (~20s):** Adding the two constraints eliminates $y$ and gives $7x = 63 + k$. With $x = 12$, $84 = 63 + k$, so $k = 21$.\n\n**The Full Solution:**\nStep 1: The $y$-terms are already opposites, so adding the equations gives $(5x + 2x) + (3y - 3y) = 63 + k$, or $7x = 63 + k$.\nStep 2: Substitute the given $x = 12$: $7(12) = 63 + k$, so $84 = 63 + k$ and $k = 21$.\nStep 3: Check by finding $y$ from the first constraint: $5(12) + 3y = 63$ gives $3y = 3$ and $y = 1$. Then $2(12) - 3(1) = 24 - 3 = 21$ ✓\n\n**Common Mistakes:**\n* $27$: adding $3y$ instead of subtracting it in the second constraint, $2(12) + 3(1)$. The second equation subtracts $3y$, which is exactly why adding the equations eliminates $y$.\n* $84$: stopping at $7x = 84$ and reporting that total instead of solving $84 = 63 + k$ for the constant.\n* $1$: reporting $y$, the evening-shift count found on the way, rather than the constant $k$ the question asks for.\n\n**Test Day Takeaway:** When one system contains an unknown constant, add or subtract the equations first — eliminating the other variable turns the constant into the only unknown left, so no substitution chain is needed.",
  skills: ["elimination-method", "setting-up-systems"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A recording studio's gain model contains the expression $\\frac{2^{3x} \\cdot 4^{x+1}}{8^{x-1}}$, where $x$ is a positive integer. Written as a single power of 2, which expression is equivalent to it?",
  choices: [
    // distractor: rewrites 4^(x+1) as 2^(x+1), forgetting to double the exponent when changing base 4 to base 2
    { id: "A", text: "$2^{x+4}$" },
    // distractor: rewrites 8^(x-1) as 2^(3x-1), failing to multiply the 3 through the -1
    { id: "B", text: "$2^{2x+3}$" },
    { id: "C", text: "$2^{2x+5}$" },
    // distractor: adds the denominator's exponent instead of subtracting it
    { id: "D", text: "$2^{8x-1}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Put everything over base $2$: the numerator is $2^{3x} \\cdot 2^{2x+2} = 2^{5x+2}$ and the denominator is $2^{3x-3}$. Subtracting exponents gives $2^{(5x+2)-(3x-3)} = 2^{2x+5}$.\n\n**The Full Solution:**\nStep 1: Rewrite each factor in base $2$: $4^{x+1} = (2^2)^{x+1} = 2^{2x+2}$ and $8^{x-1} = (2^3)^{x-1} = 2^{3x-3}$.\nStep 2: Multiply in the numerator by adding exponents: $2^{3x} \\cdot 2^{2x+2} = 2^{5x+2}$.\nStep 3: Divide by subtracting exponents: $2^{5x+2-3x+3} = 2^{2x+5}$. Check with $x = 1$: the original is $\\frac{8 \\cdot 16}{1} = 128$ and $2^{2(1)+5} = 2^7 = 128$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2^{x+4}$): this treats $4^{x+1}$ as $2^{x+1}$. Changing base $4$ to base $2$ doubles the exponent, so the term is $2^{2x+2}$.\n* Choice B ($2^{2x+3}$): this treats $8^{x-1}$ as $2^{3x-1}$. The $3$ multiplies the whole exponent, giving $3x - 3$, and the extra $-3$ becomes $+3$ when it is subtracted.\n* Choice D ($2^{8x-1}$): this adds the denominator's exponent $3x - 3$ instead of subtracting it. Division of like bases subtracts.\n\n**Test Day Takeaway:** Convert every base to the smallest common base first, then apply one rule at a time: multiply exponents for a power of a power, add to multiply, subtract to divide. Testing $x = 1$ catches a slipped sign in seconds.",
  skills: ["exponent-laws"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A water-treatment operator measured a chlorine concentration of 3.4 milligrams per liter 2 hours after dosing and 2.2 milligrams per liter 6 hours after dosing, and the concentration falls linearly with time. Which equation gives the concentration $c$, in milligrams per liter, $t$ hours after dosing?",
  choices: [
    // distractor: back-solves the intercept with the wrong sign, computing 2.2 - 0.3(6) = 0.4 instead of 2.2 + 0.3(6)
    { id: "A", text: "$c = 0.4 - 0.3t$" },
    // distractor: uses the first measured concentration, 3.4, as the value at t = 0
    { id: "B", text: "$c = 3.4 - 0.3t$" },
    { id: "C", text: "$c = 4.0 - 0.3t$" },
    // distractor: uses the total drop of 1.2 as the hourly rate instead of dividing it by the 4-hour gap, so the intercept becomes 3.4 + 1.2(2) = 5.8
    { id: "D", text: "$c = 5.8 - 1.2t$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The concentration drops $1.2$ mg/L over $4$ hours, so the slope is $-0.3$. Running back the $2$ hours from $(2, 3.4)$ adds $0.6$, giving an intercept of $4.0$ and $c = 4.0 - 0.3t$.\n\n**The Full Solution:**\nStep 1: The two measurements are the points $(2, 3.4)$ and $(6, 2.2)$. The slope is $\\frac{2.2 - 3.4}{6 - 2} = \\frac{-1.2}{4} = -0.3$.\nStep 2: Use $c = mt + b$ with $(2, 3.4)$: $3.4 = -0.3(2) + b$, so $b = 3.4 + 0.6 = 4.0$.\nStep 3: The model is $c = 4.0 - 0.3t$. Check the second point: $4.0 - 0.3(6) = 4.0 - 1.8 = 2.2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: this uses $2.2 - 0.3(6) = 0.4$ for the intercept. Going backward in time on a falling line raises the value, so the $1.8$ must be added, not subtracted.\n* Choice B: this takes $3.4$ as the starting concentration, but $3.4$ was measured at $t = 2$, not at $t = 0$. Only a reading at $t = 0$ can be dropped straight into $b$.\n* Choice D: this uses the total drop $1.2$ as the rate, which also inflates the intercept to $3.4 + 1.2(2) = 5.8$. A rate is a change divided by the elapsed time, so $1.2$ must first be divided by the $4$ hours between the readings.\n\n**Test Day Takeaway:** Two measured points give the slope first, then the intercept. Never assume the earliest reading is the intercept — substitute a point and solve for $b$.",
  skills: ["slope-intercept-form"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A theater's average cost per printed program is modeled by $C = \\frac{450 + 3n}{n}$ dollars, where $n$ is the number of programs printed. How many values of $n$ give an average cost of exactly 3 dollars per program?",
  choices: [
    { id: "A", text: "Zero" },
    // distractor: drops the 3n term and solves 450/n = 3, reporting n = 150
    { id: "B", text: "Exactly one" },
    // distractor: multiplies the right side by n twice, turning the equation into 450 + 3n = 3n^2 and counting the two roots of that quadratic
    { id: "C", text: "Exactly two" },
    // distractor: cancels the 3n against the 3 and concludes the equation is an identity satisfied by every n
    { id: "D", text: "Infinitely many" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Split the model: $C = \\frac{450}{n} + 3$. The fixed \\$450 always adds something positive, so $C$ is greater than $3$ for every $n$ and never equals $3$.\n\n**The Full Solution:**\nStep 1: Set the model equal to $3$: $\\frac{450 + 3n}{n} = 3$.\nStep 2: Multiply both sides by $n$ (allowed, since $n \\neq 0$ for a printing run): $450 + 3n = 3n$.\nStep 3: Subtract $3n$ from both sides: $450 = 0$, which is false, so no value of $n$ works. Check the structure: $\\frac{450 + 3n}{n} = \\frac{450}{n} + 3 > 3$ for every positive $n$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: dropping the $3n$ leaves $\\frac{450}{n} = 3$ and the tidy answer $n = 150$. At $n = 150$ the true average is $\\frac{450 + 450}{150} = 6$ dollars, not $3$.\n* Choice C: multiplying the right side by $n$ a second time produces $450 + 3n = 3n^2$, a quadratic with two roots — but that equation is not the one the model gives.\n* Choice D: cancelling the $3n$ with the $3$ would make both sides identical for every $n$. Terms may only be cancelled as whole factors, and $450 + 3n$ does not factor as $3n$ times anything.\n\n**Test Day Takeaway:** When every variable term cancels and a false numeric statement is left, the equation has no solution. Splitting a rational expression into a constant plus a fraction shows why in one line.",
  skills: ["rational-expressions"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The scatterplot shows the number of mosquitoes caught per trap-night at 10 monitoring sites, plotted against each site's average weekly temperature, together with the line of best fit. According to that line, what number of mosquitoes per trap-night is predicted at a site whose average weekly temperature is 30 degrees Celsius?",
  diagram: { type: "scatterplot", params: { points: [[17, 6], [18, 20], [20, 19], [22, 38], [23, 40], [25, 39], [26, 53], [28, 60], [30, 56], [31, 68]], xMin: 16, xMax: 32, yMin: 0, yMax: 80, xGridStep: 2, yGridStep: 8, xLabelStep: 4, yLabelStep: 16, xLabel: "Average weekly temperature (°C)", yLabel: "Mosquitoes per trap-night", bestFitLine: { slope: 4, intercept: -56 } } },
  choices: [
    // distractor: misreads the vertical scale as 4 per gridline instead of 8, halving the reading
    { id: "A", text: "$32$" },
    // distractor: reads the line at 26 degrees, counting the labeled ticks (every 4 degrees) as if they were gridlines (every 2 degrees)
    { id: "B", text: "$48$" },
    // distractor: reads the plotted data point at 30 degrees instead of the line of best fit
    { id: "C", text: "$56$" },
    { id: "D", text: "$64$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Follow the vertical gridline at $30$ degrees up to the line of best fit; it meets the line at the gridline for $64$ mosquitoes per trap-night.\n\n**The Full Solution:**\nStep 1: Read two easy points on the line of best fit, where it crosses gridline intersections: $(20, 24)$ and $(30, 64)$.\nStep 2: The slope is $\\frac{64 - 24}{30 - 20} = 4$ mosquitoes per trap-night for each degree, so the line is $y = 4x - 56$.\nStep 3: At $x = 30$, $y = 4(30) - 56 = 64$. Check against the neighboring gridline: at $x = 28$ the line gives $56$, and it rises $8$ over the next two degrees ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): this halves the reading by treating each horizontal gridline as $4$ instead of $8$. Read the labeled values before counting gridlines.\n* Choice B ($48$): this is the height of the line at $26$ degrees, which happens when the labeled ticks (every $4$ degrees) are counted as if each gridline were a label.\n* Choice C ($56$): this is the plotted data point at $30$ degrees. A prediction question asks for the height of the line, not of the observation; the difference between them is the residual.\n\n**Test Day Takeaway:** \"According to the line of best fit\" means read the line, never the dot. Confirm the axis scales first, then travel up from the given input to the line.",
  skills: ["scatterplots", "linear-functions"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A transit survey covered 400 commuters. Exactly 160 of them ride the bus, and 44 of those bus riders also bike to work; of the 240 who never ride the bus, 56 bike to work. One surveyed commuter is chosen at random. What is the probability that this commuter bikes to work?",
  choices: [
    // distractor: counts only the 44 bus riders who bike, over the full 400 surveyed
    { id: "A", text: "$\\frac{11}{100}$" },
    // distractor: counts only the 56 non-bus commuters who bike, over the full 400 surveyed
    { id: "B", text: "$\\frac{7}{50}$" },
    { id: "C", text: "$\\frac{1}{4}$" },
    // distractor: computes the conditional probability of biking given bus ridership, 44 over 160
    { id: "D", text: "$\\frac{11}{40}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Bikers total $44 + 56 = 100$ out of $400$ commuters, so the probability is $\\frac{100}{400} = \\frac{1}{4}$.\n\n**The Full Solution:**\nStep 1: A marginal probability ignores the other category, so count every commuter who bikes, from both the bus group and the non-bus group: $44 + 56 = 100$.\nStep 2: The sample space is every surveyed commuter: $160 + 240 = 400$.\nStep 3: The probability is $\\frac{100}{400} = \\frac{1}{4}$. Check the complement: $300$ of the $400$ do not bike, and $\\frac{300}{400} = \\frac{3}{4}$, which adds to $1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{11}{100}$): this is $\\frac{44}{400}$, using only the bikers who also ride the bus. A marginal count includes both groups.\n* Choice B ($\\frac{7}{50}$): this is $\\frac{56}{400}$, the other half of the biker count, and misses the $44$ bus riders who bike.\n* Choice D ($\\frac{11}{40}$): this is $\\frac{44}{160}$, the probability of biking among bus riders only. That is a conditional probability, which shrinks the sample space to one row.\n\n**Test Day Takeaway:** Marginal means \"whole population\": the numerator adds every case in the category, and the denominator is the full survey total. If a denominator smaller than the total shows up, a conditional probability has been computed by mistake.",
  skills: ["probability-basics"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "medium",
  band: 4,
  question: "An urgent-care center sampled 150 of its visits at random and reported a mean wait of 34 minutes; the report gives 30.6 to 37.4 minutes as the plausible interval for the mean wait of all visits. What margin of error $m$ produced that interval?",
  correctAnswer: "3.4",
  explanation: "**SAT Pattern: Margin of Error**\n\n**The correct answer is $3.4$.**\n\n**The Fast Way (~15s):** The interval reaches the same distance on each side of the sample mean, so $m = 37.4 - 34 = 3.4$ minutes.\n\n**The Full Solution:**\nStep 1: A plausible interval is the sample mean plus or minus the margin of error, so the interval is $34 - m$ to $34 + m$.\nStep 2: Match the endpoints: $34 + m = 37.4$ gives $m = 3.4$, and $34 - m = 30.6$ gives the same $m$.\nStep 3: Equivalently, halve the width: $\\frac{37.4 - 30.6}{2} = \\frac{6.8}{2} = 3.4$. Check: $34 \\pm 3.4$ reproduces $30.6$ and $37.4$ ✓\n\n**Common Mistakes:**\n* $6.8$: reporting the full width of the interval. The margin of error is the distance from the center to one endpoint, which is half the width.\n* $1.7$: halving $6.8$ twice. Only one division by $2$ turns the width into the margin.\n* $34$: reporting the sample mean itself, which is the center of the interval, not its reach.\n\n**Test Day Takeaway:** The sample mean sits exactly in the middle of the plausible interval. Subtract the center from an endpoint — or halve the width once — and never divide twice.",
  skills: ["margin-of-error"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A traffic island is shaped as a triangle whose interior angles, in degrees, are $2k + 10$, $3k - 5$, and $k + 7$ for some constant $k$. How many degrees are in the island's largest interior angle?",
  choices: [
    { id: "A", text: "$79$" },
    // distractor: drops the constant terms and solves 6k = 180, getting k = 30 before substituting
    { id: "B", text: "$85$" },
    // distractor: adds the constant 12 to 180 instead of subtracting it, getting k = 32
    { id: "C", text: "$91$" },
    // distractor: uses 360 degrees for the angle sum of a triangle, getting k = 58
    { id: "D", text: "$169$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The three measures add to $6k + 12 = 180$, so $k = 28$. The largest coefficient belongs to $3k - 5$, which is $3(28) - 5 = 79$.\n\n**The Full Solution:**\nStep 1: The angles of a triangle sum to $180$ degrees: $(2k + 10) + (3k - 5) + (k + 7) = 180$.\nStep 2: Combine like terms: $6k + 12 = 180$, so $6k = 168$ and $k = 28$.\nStep 3: Substitute: the angles are $2(28) + 10 = 66$, $3(28) - 5 = 79$, and $28 + 7 = 35$ degrees, so the largest is $79$. Check: $66 + 79 + 35 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($85$): this comes from $6k = 180$, ignoring the $+10$, $-5$, and $+7$. Those constants combine to $+12$ and must be subtracted before dividing.\n* Choice C ($91$): this comes from $6k = 192$, moving the $12$ across the equals sign by addition instead of subtraction, which gives $k = 32$.\n* Choice D ($169$): this uses $360$ degrees, the sum for a quadrilateral. A triangle's three angles always total $180$ degrees.\n\n**Test Day Takeaway:** Combine every algebraic angle into one equation set equal to $180$, solve for the letter, and then substitute back — the question rarely wants the letter itself.",
  skills: ["triangle-angle-sum"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A scenic arch meets the stage floor at the two solutions of $2x^2 - 26x + 60 = 0$, where $x$ is measured in feet from the wings. How many feet apart are the two points where the arch meets the floor?",
  choices: [
    { id: "A", text: "$7$" },
    // distractor: reports the sum of the two solutions, 26 divided by 2, instead of their difference
    { id: "B", text: "$13$" },
    // distractor: computes the square root of the discriminant, 14, but never divides by the leading coefficient 2
    { id: "C", text: "$14$" },
    // distractor: reports the product of the two solutions, 60 divided by 2
    { id: "D", text: "$30$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The solutions sum to $\\frac{26}{2} = 13$ and multiply to $\\frac{60}{2} = 30$. Two numbers with sum $13$ and product $30$ are $3$ and $10$, which are $7$ apart.\n\n**The Full Solution:**\nStep 1: For $ax^2 + bx + c = 0$ the solutions satisfy $p + q = -\\frac{b}{a} = \\frac{26}{2} = 13$ and $pq = \\frac{c}{a} = \\frac{60}{2} = 30$.\nStep 2: The gap between the solutions follows from $(p - q)^2 = (p + q)^2 - 4pq = 169 - 120 = 49$, so $|p - q| = 7$.\nStep 3: Confirm by factoring: $2x^2 - 26x + 60 = 2(x - 3)(x - 10)$, so the arch meets the floor at $3$ feet and $10$ feet, which are $7$ feet apart ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($13$): this is $p + q$, the sum of the two positions. The question asks how far apart they are, which is the difference.\n* Choice C ($14$): this is $\\sqrt{b^2 - 4ac} = \\sqrt{196}$. That expression equals $a|p - q|$, so with $a = 2$ it must still be divided by $2$.\n* Choice D ($30$): this is $pq$, the product. A product of two lengths is not a distance.\n\n**Test Day Takeaway:** Sum and product come straight off the coefficients as $-\\frac{b}{a}$ and $\\frac{c}{a}$. Any question about the gap between the roots is $(p+q)^2 - 4pq$ under a square root — divide out the leading coefficient before you trust the number.",
  skills: ["quadratic-factoring"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A quality auditor will pull two different samples at random from the 40 logged in the table and run each of them a second time. What is the probability that both of the samples pulled tested positive on the first run?",
  questionTable: { headers: ["", "Positive", "Negative", "Total"], rows: [["Clinic A", "9", "13", "22"], ["Clinic B", "7", "11", "18"], ["Total", "16", "24", "40"]] },
  correctAnswer: "2/13",
  explanation: "**SAT Pattern: Probability Without Replacement**\n\n**The correct answer is $\\frac{2}{13}$.**\n\n**The Fast Way (~30s):** The table's positive total is $16$ of $40$. Multiply the two draws: $\\frac{16}{40} \\cdot \\frac{15}{39} = \\frac{2}{5} \\cdot \\frac{5}{13} = \\frac{2}{13}$.\n\n**The Full Solution:**\nStep 1: Add the positive column: $9 + 7 = 16$ positive samples out of $40$ total, so the first pull is positive with probability $\\frac{16}{40} = \\frac{2}{5}$.\nStep 2: That sample is not returned, so only $39$ samples remain and only $15$ of them are positive: the second pull is positive with probability $\\frac{15}{39} = \\frac{5}{13}$.\nStep 3: Multiply the two stages: $\\frac{2}{5} \\cdot \\frac{5}{13} = \\frac{10}{65} = \\frac{2}{13}$. Check as a decimal: $0.4 \\times 0.3846 \\approx 0.154$, and $\\frac{2}{13} \\approx 0.154$ ✓\n\n**Common Mistakes:**\n* $\\frac{4}{25}$: using $\\frac{16}{40} \\cdot \\frac{16}{40}$, which is the with-replacement answer. Pulling two different samples removes the first one from the pool.\n* $\\frac{3}{20}$: using $\\frac{16}{40} \\cdot \\frac{15}{40}$, reducing the positive count for the second draw but leaving the total at $40$. Both the numerator and the denominator drop by one.\n* $\\frac{2}{5}$: reporting only the first draw's probability and forgetting that the event requires two positives.\n\n**Test Day Takeaway:** \"Two different\" items means the second fraction has both parts reduced by one. Write the two fractions side by side before multiplying so neither denominator is left at the original total.",
  skills: ["probability-basics"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "During a scene change a scrim slides toward a stage wall and back again, and its distance from that wall, in centimeters, after $x$ seconds is $f(x) = x^2 - 12x + c$ for a constant $c$. The scrim never touches the wall. What is the least integer value of $c$?",
  choices: [
    // distractor: completes the square but subtracts 12 rather than 6 squared, giving c greater than 12
    { id: "A", text: "$13$" },
    // distractor: uses the discriminant equal to zero, the case where the scrim just touches the wall instead of staying clear of it
    { id: "B", text: "$36$" },
    { id: "C", text: "$37$" },
    // distractor: stops at b squared equals 144 and never divides by 4a
    { id: "D", text: "$144$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** A distance that is never $0$ means $f(x) = 0$ has no real solution, so the discriminant is negative: $144 - 4c < 0$, giving $c > 36$ and a least integer of $37$.\n\n**The Full Solution:**\nStep 1: The scrim reaches the wall exactly when $f(x) = 0$, so $x^2 - 12x + c = 0$ must have no real solution, which requires $b^2 - 4ac < 0$.\nStep 2: With $a = 1$ and $b = -12$: $144 - 4c < 0$, so $4c > 144$ and $c > 36$.\nStep 3: The least integer greater than $36$ is $37$. Check by completing the square: $f(x) = (x - 6)^2 + (c - 36)$, so the closest approach is $c - 36 = 1$ centimeter at $x = 6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($13$): this comes from completing the square with $12$ instead of $6^2 = 36$, giving $c > 12$. Half of $12$ is squared, so the constant removed is $36$.\n* Choice B ($36$): at $c = 36$ the discriminant is exactly $0$ and $f(6) = 0$, so the scrim touches the wall at $6$ seconds. \"Never reaches\" excludes touching, so $c = 36$ fails.\n* Choice D ($144$): this is $b^2$ alone. The discriminant subtracts $4ac$ from it, and the inequality is then solved for $c$.\n\n**Test Day Takeaway:** \"Never equals zero\" is the discriminant test $b^2 - 4ac < 0$. Solve the inequality, then check whether the boundary value itself is allowed — a strict inequality pushes the answer one integer past it.",
  skills: ["discriminant-analysis"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A pump controller sets the flow factor $\\frac{8^{x+1}}{2^{k}}$ equal to $4^{x-3} \\cdot 2^{x}$ at every speed setting $x$, measured in hundreds of revolutions per minute, where $k$ is a constant. What is the value of $k$?",
  correctAnswer: "9",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~30s):** In base $2$ the left side is $2^{3x + 3 - k}$ and the right side is $2^{3x - 6}$. Matching the constants gives $3 - k = -6$, so $k = 9$.\n\n**The Full Solution:**\nStep 1: Rewrite the left side: $8^{x+1} = 2^{3(x+1)} = 2^{3x+3}$, so $\\frac{8^{x+1}}{2^{k}} = 2^{3x + 3 - k}$.\nStep 2: Rewrite the right side: $4^{x-3} = 2^{2(x-3)} = 2^{2x-6}$, so $4^{x-3} \\cdot 2^{x} = 2^{2x - 6 + x} = 2^{3x-6}$.\nStep 3: Both sides are powers of $2$ that agree for every $x$, so the exponents are identical: $3x + 3 - k = 3x - 6$, giving $3 - k = -6$ and $k = 9$. Check at $x = 3$: the left side is $\\frac{8^4}{2^9} = \\frac{4096}{512} = 8$ and the right side is $4^{0} \\cdot 2^{3} = 8$ ✓\n\n**Common Mistakes:**\n* $-3$: writing $k - 3 = -6$ instead of $3 - k = -6$. The $k$ is subtracted in the exponent, so it carries a negative sign into the comparison.\n* $7$: reading $8^{x+1}$ as $2^{3x+1}$, multiplying the $3$ only by $x$. The exponent $3$ multiplies the entire quantity $x + 1$.\n* $6$: reading $4^{x-3}$ as $2^{x-3}$, forgetting that base $4$ doubles the exponent to $2x - 6$.\n\n**Test Day Takeaway:** Convert everything to the smallest common base, collect each side into a single exponent, and then set the exponents equal. When the statement holds for every $x$, the $x$-terms match automatically and the constants determine the unknown.",
  skills: ["exponential-functions"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A public-health model gives the number of new daily cases $t$ weeks after an intervention as $c(t) = 3t^2 - 24t + 59$, for values of $t$ from 0 through 10. According to this model, what is the least number of new daily cases during that period?",
  choices: [
    { id: "A", text: "$11$" },
    // distractor: subtracts 16 rather than 3 times 16 when moving the completed square outside the parentheses, giving 59 - 16
    { id: "B", text: "$43$" },
    // distractor: adds 16 instead of subtracting 48, giving 59 + 16
    { id: "C", text: "$75$" },
    // distractor: adds 48 instead of subtracting it, giving 59 + 48
    { id: "D", text: "$107$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Factor out the $3$ and complete the square: $3(t^2 - 8t) + 59 = 3(t - 4)^2 + 11$. The squared term is never negative, so the least value is $11$.\n\n**The Full Solution:**\nStep 1: Factor $3$ from the variable terms: $c(t) = 3(t^2 - 8t) + 59$.\nStep 2: Half of $-8$ is $-4$ and $(-4)^2 = 16$, so $t^2 - 8t = (t - 4)^2 - 16$. Multiplying that $-16$ by the factored-out $3$ gives $-48$: $c(t) = 3(t - 4)^2 - 48 + 59 = 3(t - 4)^2 + 11$.\nStep 3: The minimum occurs at $t = 4$, which lies in the interval from $0$ to $10$, and there $c(4) = 3(16) - 24(4) + 59 = 48 - 96 + 59 = 11$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($43$): this is $59 - 16$. The $16$ sits inside the parentheses, so it is multiplied by the factored-out $3$ before it leaves them.\n* Choice C ($75$): this is $59 + 16$, adding the completing term instead of subtracting it and skipping the factor of $3$ as well.\n* Choice D ($107$): this is $59 + 48$. The correct constant $-48$ is subtracted, because $(t - 4)^2$ overshoots $t^2 - 8t$ by $16$ in each of the three copies.\n\n**Test Day Takeaway:** When the leading coefficient is not $1$, factor it out of the variable terms first — the constant you add back is multiplied by that coefficient. The vertex constant is then the minimum for an upward parabola.",
  skills: ["quadratics"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A stage set's plywood brace is cut as a right triangle with hypotenuse $3k$ and with one leg $k\\sqrt{5}$, for a positive constant $k$. In terms of $k$, how much surface does one face of that brace cover?",
  choices: [
    // distractor: takes the missing leg as k rather than 2k
    { id: "A", text: "$\\frac{k^2\\sqrt{5}}{2}$" },
    { id: "B", text: "$k^2\\sqrt{5}$" },
    // distractor: uses the hypotenuse 3k as the second leg instead of the missing leg 2k
    { id: "C", text: "$\\frac{3k^2\\sqrt{5}}{2}$" },
    // distractor: multiplies the two legs but forgets the one-half in the area formula
    { id: "D", text: "$2k^2\\sqrt{5}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The missing leg is $\\sqrt{9k^2 - 5k^2} = 2k$, so the area is $\\frac{1}{2}(2k)(k\\sqrt{5}) = k^2\\sqrt{5}$.\n\n**The Full Solution:**\nStep 1: The Pythagorean theorem gives $(k\\sqrt{5})^2 + (\\text{leg})^2 = (3k)^2$, so $5k^2 + (\\text{leg})^2 = 9k^2$.\nStep 2: Then $(\\text{leg})^2 = 4k^2$, and since $k > 0$ the missing leg is $2k$.\nStep 3: The two legs are perpendicular, so the area is $\\frac{1}{2}(2k)(k\\sqrt{5}) = k^2\\sqrt{5}$. Check with $k = 2$: the sides are $2\\sqrt{5}$, $4$, and $6$, and $\\frac{1}{2}(4)(2\\sqrt{5}) = 4\\sqrt{5} = 2^2\\sqrt{5}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{k^2\\sqrt{5}}{2}$): this uses $k$ as the missing leg. Squaring gives $4k^2$, whose square root is $2k$, not $k$.\n* Choice C ($\\frac{3k^2\\sqrt{5}}{2}$): this multiplies the given leg by the hypotenuse $3k$. Area uses the two perpendicular sides, and the hypotenuse is never one of them.\n* Choice D ($2k^2\\sqrt{5}$): this is the product of the legs with no $\\frac{1}{2}$. That product is the area of the rectangle the triangle fills half of.\n\n**Test Day Takeaway:** Square a radical leg before using the Pythagorean theorem — $(k\\sqrt{5})^2 = 5k^2$ — and confirm which two sides meet at the right angle before multiplying.",
  skills: ["triangle-area"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An engineer's drawing shows similar steel gusset plates $ABC$ and $DEF$, whose vertices correspond in that order, with the marked lengths given in centimeters. What is the perimeter, in centimeters, of plate $DEF$?",
  diagram: { type: "similarTriangles", params: { triangle1: { labels: ["A", "B", "C"], sideLabels: ["8", "12", "10"] }, triangle2: { labels: ["D", "E", "F"], sideLabels: ["", "18", ""] }, figureNote: true } },
  choices: [
    // distractor: scales only the two unmarked sides, 1.5 times 8 plus 1.5 times 10, and leaves out the side that measures 18
    { id: "A", text: "$27$" },
    { id: "B", text: "$45$" },
    // distractor: adds the difference 18 minus 12 to each side of ABC instead of multiplying by the scale factor
    { id: "C", text: "$48$" },
    // distractor: pairs the 18 with side CA of length 10, using a scale factor of 1.8
    { id: "D", text: "$54$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $EF$ corresponds to $BC$, so the scale factor is $\\frac{18}{12} = 1.5$. Perimeters scale the same way: $1.5(8 + 12 + 10) = 1.5(30) = 45$.\n\n**The Full Solution:**\nStep 1: The correspondence $D \\to A$, $E \\to B$, $F \\to C$ matches $EF$ with $BC$, so the scale factor is $k = \\frac{EF}{BC} = \\frac{18}{12} = \\frac{3}{2}$.\nStep 2: Every side of $DEF$ is $\\frac{3}{2}$ times its partner in $ABC$: $DE = \\frac{3}{2}(8) = 12$, $EF = \\frac{3}{2}(12) = 18$, and $FD = \\frac{3}{2}(10) = 15$.\nStep 3: The perimeter is $12 + 18 + 15 = 45$ centimeters. Check against the shortcut: the perimeter of $ABC$ is $30$ and $\\frac{3}{2}(30) = 45$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($27$): this scales $8$ and $10$ but forgets to include the third side. A perimeter needs all three, and $18$ is already the scaled version of $12$.\n* Choice C ($48$): this adds $6$ to each side, treating similar figures as though corresponding sides differ by a constant. Similarity multiplies; it does not add.\n* Choice D ($54$): this pairs $18$ with $CA = 10$ for a factor of $1.8$. The letter order in \"$ABC$ and $DEF$\" fixes which sides correspond, and $EF$ matches $BC$.\n\n**Test Day Takeaway:** Read the correspondence off the letter order before setting up any ratio, then use the fact that perimeters of similar figures scale by the same factor as the sides — one multiplication replaces three.",
  skills: ["similar-triangles"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A bridge-maintenance reserve grows according to $A = 25000(1 + k)^{t}$, where $A$ is the balance in dollars after $t$ years and $k$ is a constant annual growth rate. The balance after 2 years is 28,090 dollars. What is the value of $k$?",
  correctAnswer: "0.06",
  explanation: "**SAT Pattern: Compound Interest**\n\n**The correct answer is $0.06$.**\n\n**The Fast Way (~30s):** Two years of growth multiply the reserve by $\\frac{28090}{25000} = 1.1236$, and $\\sqrt{1.1236} = 1.06$, so $k = 0.06$.\n\n**The Full Solution:**\nStep 1: Substitute $t = 2$ and $A = 28090$: $25000(1 + k)^2 = 28090$.\nStep 2: Divide by $25000$: $(1 + k)^2 = 1.1236$. Take the positive square root: $1 + k = 1.06$.\nStep 3: Subtract $1$: $k = 0.06$. Check: $25000(1.06)^2 = 25000(1.1236) = 28090$ ✓\n\n**Common Mistakes:**\n* $0.1236$: using the whole two-year increase, $\\frac{28090 - 25000}{25000}$, as the annual rate. That growth was earned over two compounding periods, not one.\n* $0.0618$: halving the two-year increase. Compounding is repeated multiplication, so the yearly factor is the square root of the two-year factor, not half of the growth.\n* $1.06$: reporting the growth factor. The model is written as $1 + k$, so the rate is what remains after $1$ is subtracted.\n\n**Test Day Takeaway:** Divide the ending balance by the starting balance to isolate the growth factor, then take the $t$-th root — never divide the total percent increase by the number of years.",
  skills: ["exponential-functions"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 7 — Math Module 2 (22 questions)
// Wavy flow (frozen): M[1] E[2,3] M[4,5] H[6,7] M[8] H[9] M[10] E[11] H[12,13,14] M[15] H[16,17,18] M[19] H[20,21,22].
// Distribution: E=3 (q2,q3,q11) / M=7 (q1,q4,q5,q8,q10,q15,q19) / H=12 (q6,q7,q9,q12,q13,q14,q16,q17,q18,q20,q21,q22).
// Official-calibration recreation (2026-09-01): all content re-authored fresh;
// slot metadata and pattern slugs frozen. Q1-5 warm-ups each carry 2+ steps or
// a trap (scale-the-difference, intercept-vs-slope, equal-constants decoy,
// f(a)-f(b) != f(a-b), rational-zero denominator check).

{
  id: 1,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table shows the number of freight cars of each cargo type held at two classification yards on the same morning, with no other cars present at either yard. Of the cars at Yard B, what percent carry grain?",
  questionTable: { headers: ["Cargo type", "Yard A", "Yard B"], rows: [["Grain", "84", "63"], ["Lumber", "56", "42"], ["Chemicals", "42", "57"], ["Automobiles", "28", "48"]] },
  choices: [
    // distractor: divides the 63 grain cars by the 420-car two-yard total instead of the 210 cars at Yard B
    { id: "A", text: "$15\\%$" },
    { id: "B", text: "$30\\%$" },
    // distractor: uses the 147 grain cars from both yards over the 420-car two-yard total
    { id: "C", text: "$35\\%$" },
    // distractor: reads the Yard A column instead of Yard B, computing 84 out of 210
    { id: "D", text: "$40\\%$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Yard B holds $63+42+57+48=210$ cars, and $\\frac{63}{210}=0.3$, so $30\\%$ of them carry grain.\n\n**The Full Solution:**\nStep 1: Identify the whole. The question restricts attention to Yard B, so the whole is the Yard B column only: $63+42+57+48=210$ cars.\nStep 2: Identify the part. Grain at Yard B is $63$ cars — the Yard A entry of $84$ belongs to a different whole.\nStep 3: Divide and convert. $\\frac{63}{210}=\\frac{3}{10}=0.30=30\\%$. Check: $30\\%$ of $210$ is $0.30(210)=63$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15\\%$): divides $63$ by the two-yard total $420$ instead of by the $210$ cars at Yard B, giving $\\frac{63}{420}=15\\%$.\n* Choice C ($35\\%$): adds the grain from both yards, $84+63=147$, and divides by $420$, giving $35\\%$ — that answers a question about both yards, not about Yard B.\n* Choice D ($40\\%$): reads across the wrong column, computing $\\frac{84}{210}=40\\%$ for Yard A.\n\n**Test Day Takeaway:** In a percent-of-a-whole question the hard part is never the division — it is deciding which total is the whole. Underline the restricting phrase (\"of the cars at Yard B\") before you touch the table.\n",
  skills: ["percent-of-value"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The cross-section of a parabolic antenna dish is modeled by $y = c(x - 3)^2 - 45$, where $x$ and $y$ are measured in centimeters and $c$ is a positive constant. When this equation is written as $y = cx^2 + mx + n$, the coefficient $m$ equals $-42$. What is the value of $n$?",
  choices: [
    // distractor: substitutes c = 1 instead of solving -6c = -42, giving 9(1) - 45 = -36
    { id: "A", text: "$-36$" },
    { id: "B", text: "$18$" },
    // distractor: finds c = 7 correctly but reports 9c = 63 and drops the constant -45
    { id: "C", text: "$63$" },
    // distractor: expands (x - 3)^2 as x^2 - 3x + 9, so m = -3c gives c = 14 and 9(14) - 45 = 81
    { id: "D", text: "$81$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Expanding gives the middle term $-6cx$, so $-6c=-42$ and $c=7$; the constant term is $9c-45=63-45=18$.\n\n**The Full Solution:**\nStep 1: Expand the given form. $c(x-3)^2-45 = c(x^2-6x+9)-45 = cx^2-6cx+(9c-45)$.\nStep 2: Match the middle coefficient. Comparing with $cx^2+mx+n$ gives $m=-6c$. Since $m=-42$, $-6c=-42$, so $c=7$.\nStep 3: Read off the constant. $n = 9c-45 = 9(7)-45 = 63-45 = 18$. Check: $7(x-3)^2-45 = 7x^2-42x+18$, whose middle coefficient is indeed $-42$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-36$): assumes $c=1$ without using $m=-42$ at all, giving $9(1)-45=-36$.\n* Choice C ($63$): finds $c=7$ but reports only the $9c$ piece, $63$, forgetting that the $-45$ is still part of the constant term.\n* Choice D ($81$): expands $(x-3)^2$ as $x^2-3x+9$, so the middle coefficient becomes $-3c$; then $-3c=-42$ gives $c=14$ and $9(14)-45=81$.\n\n**Test Day Takeaway:** Expanding $a(x-h)^2+k$ always produces $ax^2-2ahx+(ah^2+k)$. The constant term carries BOTH $ah^2$ and $k$ — losing $k$ is the single most common slip in this conversion.\n",
  skills: ["distributive-property", "converting-quadratic-forms"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Two lab notebooks record the same linear relationship between the volume of syrup, $x$, and the volume of water, $y$, in a diluted juice concentrate: $8x + 20y = 12$ and $rx + sy = 21$, where $r$ and $s$ are constants. Every ordered pair that satisfies the first equation also satisfies the second. What is the value of $r - s$?",
  choices: [
    { id: "A", text: "$-21$" },
    // distractor: sets r = 8 and s = 20, assuming the coefficients themselves must match rather than being scaled
    { id: "B", text: "$-12$" },
    // distractor: scales the x-coefficient by 7/4 to get r = 14 but leaves s = 20 unscaled
    { id: "C", text: "$-6$" },
    // distractor: computes s - r = 35 - 14 instead of r - s
    { id: "D", text: "$21$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The constants scale by $\\frac{21}{12}=\\frac{7}{4}$, so $r=8\\left(\\frac{7}{4}\\right)=14$ and $s=20\\left(\\frac{7}{4}\\right)=35$; $r-s=-21$.\n\n**The Full Solution:**\nStep 1: Translate the condition. If every ordered pair satisfying the first equation also satisfies the second, the two equations describe the same line, so one is a constant multiple of the other.\nStep 2: Find the multiplier from the constant terms. $8x+20y=12$ becomes $rx+sy=21$ only if every coefficient is multiplied by $k=\\frac{21}{12}=\\frac{7}{4}$.\nStep 3: Apply it to both coefficients. $r=\\frac{7}{4}(8)=14$ and $s=\\frac{7}{4}(20)=35$, so $r-s=14-35=-21$. Check: $14x+35y=21$ divided by $\\frac{7}{4}$ returns $8x+20y=12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-12$): sets $r=8$ and $s=20$, as if identical solution sets required identical coefficients; that gives $8-20=-12$ but the constants $12$ and $21$ would then disagree.\n* Choice C ($-6$): scales only the $x$-coefficient, using $r=14$ with $s=20$, giving $14-20=-6$. One scale factor must hit every term.\n* Choice D ($21$): computes $s-r=35-14$ — the right numbers subtracted in the wrong order.\n\n**Test Day Takeaway:** \"Same solution set\" means one equation is a multiple of the other. Get the multiplier from the pair of numbers you know completely — here the constants — then apply it to every remaining term.\n",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 4,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A tunnel-clearance model gives the gap, in centimeters, between a train roof and the tunnel arch as $g(x) = 3x^2 + bx + 27$, where $x$ is the distance in meters from the entrance and $b$ is an integer constant. The gap is never zero. What is the greatest possible value of $b$?",
  correctAnswer: "17",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**The correct answer is 17.**\n\n**The Fast Way (~35s):** No real zero means $b^2-4(3)(27)<0$, so $b^2<324$ and $-18<b<18$; the greatest integer is $17$.\n\n**The Full Solution:**\nStep 1: Translate the condition. \"The gap is never zero\" means $3x^2+bx+27=0$ has no real solution, so the discriminant is negative.\nStep 2: Write and simplify the discriminant. $b^2-4ac = b^2-4(3)(27) = b^2-324$. Requiring $b^2-324<0$ gives $b^2<324$.\nStep 3: Solve the inequality and take integers. $b^2<324$ means $-18<b<18$, so the largest integer value is $b=17$. Check: with $b=17$, the discriminant is $289-324=-35<0$, so $g$ never reaches $0$ ✓\n\n**Common Mistakes:**\n* $18$: uses $b^2-324\\le 0$ instead of $<0$. At $b=18$ the discriminant is exactly $0$, so the gap touches zero once — the condition fails.\n* $6$: computes $\\sqrt{324}=18$ correctly but then divides by the leading coefficient $3$, reporting $6$. The leading coefficient is already inside the discriminant.\n* $-17$: solves the inequality correctly but reports the least integer in $-18<b<18$ instead of the greatest.\n\n**Test Day Takeaway:** \"No real solutions\" is a strict inequality on the discriminant. Solve $b^2 < 4ac$ for the open interval first, then step inward one integer — the endpoint itself is always the trap.\n",
  skills: ["discriminant-analysis"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Two distinct flight corridors are drawn as straight lines in the xy-plane and never intersect at any point. One corridor is described by the equation $6x - 9y = 15$. Which equation could describe the other corridor?",
  choices: [
    // distractor: is the same line as 6x - 9y = 15 (multiply by 3), so the corridors would coincide rather than be distinct
    { id: "A", text: "$2x - 3y = 5$" },
    // distractor: flips the sign of the y-coefficient, giving slope -2/3, so the lines cross at one point
    { id: "B", text: "$2x + 3y = 11$" },
    // distractor: swaps the coefficients, giving slope 3/2, so the lines cross at one point
    { id: "C", text: "$3x - 2y = 11$" },
    { id: "D", text: "$2x - 3y = 11$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Divide the given equation by $3$: $2x-3y=5$. Parallel and distinct means the same left side with a different constant, so $2x-3y=11$.\n\n**The Full Solution:**\nStep 1: Translate the condition. Two distinct lines that never intersect are parallel, so they have equal slopes but different constants.\nStep 2: Reduce the given equation. $6x-9y=15$ divided by $3$ is $2x-3y=5$, so any parallel line has the form $2x-3y=k$.\nStep 3: Pick the constant that keeps the lines distinct. $k=11$ works because $2x-3y=11$ is not a multiple of $2x-3y=5$. Check: both have slope $\\frac{2}{3}$, and their $y$-intercepts, $-\\frac{5}{3}$ and $-\\frac{11}{3}$, differ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x-3y=5$): multiplying it by $3$ returns $6x-9y=15$ exactly, so this is the SAME corridor — the lines coincide at infinitely many points instead of never meeting.\n* Choice B ($2x+3y=11$): the sign change makes the slope $-\\frac{2}{3}$, so this line crosses the given one exactly once.\n* Choice C ($3x-2y=11$): swapping $2$ and $3$ gives slope $\\frac{3}{2}$, again a single crossing point.\n\n**Test Day Takeaway:** For \"no solution,\" reduce the given equation to lowest terms first. The answer must copy the reduced left side exactly and change ONLY the constant — an identical constant makes the lines the same line, not parallel.\n",
  skills: ["system-solution-types"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "In the xy-plane shown, the parabola crosses the x-axis at two lattice points. Which equation could define the parabola?",
  diagram: { type: "parabola", params: { vertex: { h: 4, k: 12 }, a: -3, xRange: [0, 8], yRange: [-16, 16], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showVertex: false } },
  choices: [
    // distractor: reads the vertex correctly but assumes a = -1, so the curve would meet the x-axis near x = 0.5 and x = 7.5, not at 2 and 6
    { id: "A", text: "$y = -(x - 4)^2 + 12$" },
    // distractor: flips the sign inside the parentheses, placing the vertex at (-4, 12) instead of (4, 12)
    { id: "B", text: "$y = -3(x + 4)^2 + 12$" },
    { id: "C", text: "$y = -3(x - 4)^2 + 12$" },
    // distractor: flips the sign of k, placing the vertex at (4, -12), which would open downward with no x-intercepts
    { id: "D", text: "$y = -3(x - 4)^2 - 12$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The peak sits at $(4,12)$, so the form is $y=a(x-4)^2+12$; the graph passes through $(6,0)$, giving $0=4a+12$ and $a=-3$.\n\n**The Full Solution:**\nStep 1: Read the vertex from the graph. The highest point is at $x=4$, $y=12$, so the equation has the form $y=a(x-4)^2+12$.\nStep 2: Read a second point. The curve crosses the $x$-axis at $x=2$ and $x=6$, so $(6,0)$ is on the graph.\nStep 3: Solve for $a$. Substituting gives $0=a(6-4)^2+12=4a+12$, so $a=-3$ and $y=-3(x-4)^2+12$. Check: at $x=2$, $-3(4)+12=0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y=-(x-4)^2+12$): keeps the correct vertex but takes $a=-1$ without using a second point; that curve would cross the axis at $x=4\\pm2\\sqrt{3}\\approx0.5$ and $7.5$, not at the lattice points shown.\n* Choice B ($y=-3(x+4)^2+12$): reads the vertex $x$-coordinate as $-4$; $(x+4)^2$ shifts the peak to the left of the origin, off the visible grid.\n* Choice D ($y=-3(x-4)^2-12$): reads the vertex $y$-coordinate as $-12$; that parabola peaks below the $x$-axis and never crosses it.\n\n**Test Day Takeaway:** A vertex-form question always needs two readings from the graph: the vertex fixes $h$ and $k$, and one more point fixes $a$. Skipping the second reading is what makes $a=\\pm1$ so tempting.\n",
  skills: ["vertex-form", "function-evaluation"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "During a flyby, a probe's height above a reference plane, in kilometers, is $h(t) = 2t^2 - 20t + k$ at time $t$ hours, where $k$ is a constant. The probe stays below the plane for exactly 6 hours. What is the value of $k$?",
  correctAnswer: "32",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**The correct answer is 32.**\n\n**The Fast Way (~35s):** The two zeros sum to $\\frac{20}{2}=10$ and differ by $6$, so they are $8$ and $2$; then $k=2(8)(2)=32$.\n\n**The Full Solution:**\nStep 1: Translate the condition. The probe is below the plane between the two zeros of $h$, so those zeros are $6$ hours apart.\nStep 2: Use the sum and the difference. For $2t^2-20t+k=0$, the zeros sum to $-\\frac{-20}{2}=10$. With sum $10$ and difference $6$, the zeros are $t=8$ and $t=2$.\nStep 3: Recover the constant. Factoring, $h(t)=2(t-8)(t-2)=2t^2-20t+32$, so $k=32$. Check: the discriminant is $400-8(32)=144$, and $\\frac{\\sqrt{144}}{2}=6$, the required gap ✓\n\n**Common Mistakes:**\n* $16$: finds the zeros $8$ and $2$ and multiplies them, but forgets that the leading coefficient $2$ multiplies the constant term as well, reporting $8 \\cdot 2 = 16$ instead of $2(8)(2)$.\n* $8$: reports the later zero, $t = 8$, rather than the constant $k$ the question asks for.\n* $45.5$: uses the gap formula as $(\\text{difference})^2 = b^2-4ac$ and drops the $a^2$ in the denominator, solving $36 = 400-8k$ to get $45.5$; the correct relation is $(\\text{difference})^2 = \\frac{b^2-4ac}{a^2}$.\n\n**Test Day Takeaway:** The gap between the two zeros of $ax^2+bx+c$ is $\\frac{\\sqrt{b^2-4ac}}{|a|}$. When the sum of the roots is also clean, the fastest route is sum-and-difference: solve for the two roots, then rebuild the quadratic.\n",
  skills: ["quadratics"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "easy",
  band: 3,
  question: "In a food-science model, the crushing strength $s$, in newtons, of a dried apple slice at a given moisture level satisfies the equation $\\sqrt{5s - 11} = 8$. What is the value of $s$?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: Radical Equation**\n\n**The correct answer is 15.**\n\n**The Fast Way (~20s):** Square both sides: $5s-11=64$, so $5s=75$ and $s=15$.\n\n**The Full Solution:**\nStep 1: Undo the radical. Squaring both sides of $\\sqrt{5s-11}=8$ gives $5s-11=64$.\nStep 2: Isolate the variable term. Adding $11$ to both sides gives $5s=75$.\nStep 3: Solve and verify. Dividing by $5$ gives $s=15$. Check: $\\sqrt{5(15)-11}=\\sqrt{75-11}=\\sqrt{64}=8$ ✓\n\n**Common Mistakes:**\n* $75$: squares correctly and adds $11$ to reach $5s=75$, then stops without dividing by $5$.\n* $3.8$: never squares, treating the equation as $5s-11=8$ and solving $5s=19$.\n* $10.6$: squares to $64$ but subtracts $11$ instead of adding it, solving $5s=53$.\n\n**Test Day Takeaway:** Square first, then solve the linear equation that remains — and always substitute your answer back into the original radical, since squaring can introduce solutions that do not work.\n",
  skills: ["radical-equations"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "One pair of numbers obeys both rules of a depot loading plan, $5x - 2y = 22$ and $3x + 4y = 34$, where $x$ is a count of pallets and $y$ is a count of crates. Substituting that pair into $kx - 3y$ produces $30$. What is the value of the constant $k$?",
  choices: [
    // distractor: adds 3y instead of subtracting it, solving 6k + 12 = 30 to get k = 3
    { id: "A", text: "$3$" },
    // distractor: drops the -3y term entirely, solving 6k = 30 to get k = 5
    { id: "B", text: "$5$" },
    { id: "C", text: "$7$" },
    // distractor: swaps the coordinates, substituting x = 4 and y = 6 to solve 4k - 18 = 30
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Solving the system gives $(6, 4)$; substituting into $kx-3y=30$ gives $6k-12=30$, so $k=7$.\n\n**The Full Solution:**\nStep 1: Solve the system. Multiply $5x-2y=22$ by $2$ to get $10x-4y=44$, then add $3x+4y=34$: $13x=78$, so $x=6$.\nStep 2: Find the other coordinate. Substituting $x=6$ into $3x+4y=34$ gives $18+4y=34$, so $4y=16$ and $y=4$. The ordered pair is $(6,4)$.\nStep 3: Impose the third equation. $k(6)-3(4)=30$ becomes $6k-12=30$, so $6k=42$ and $k=7$. Check: $7(6)-3(4)=42-12=30$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): mishandles the sign of the $-3y$ term, solving $6k+12=30$ to get $k=3$.\n* Choice B ($5$): substitutes only the $x$-value, solving $6k=30$ and ignoring the $-3(4)$ contribution.\n* Choice D ($12$): reverses the ordered pair, using $x=4$ and $y=6$ to solve $4k-18=30$.\n\n**Test Day Takeaway:** When a third equation must share a system's solution, there is no shortcut around solving the system first. Write the ordered pair down in order before substituting — reversed coordinates are the most expensive error here.\n",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "For a spectrometer calibration, a technician records the quantity $\\frac{6v^2 - v - 35}{3v + 7}$ at each voltage $v > 0$ and finds that the recorded value always equals $av + b$, where $a$ and $b$ are constants that do not depend on $v$. What is the value of $ab$?",
  correctAnswer: "-10",
  explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**The correct answer is -10.**\n\n**The Fast Way (~35s):** $6v^2-v-35=(3v+7)(2v-5)$, so the quotient is $2v-5$; then $a=2$, $b=-5$, and $ab=-10$.\n\n**The Full Solution:**\nStep 1: Factor the numerator. The denominator $3v+7$ must be one of its factors, so write $6v^2-v-35=(3v+7)(2v+p)$; matching the constant gives $7p=-35$, so $p=-5$ and $6v^2-v-35=(3v+7)(2v-5)$.\nStep 2: Cancel the common factor. $\\frac{(3v+7)(2v-5)}{3v+7}=2v-5$ for every $v>0$, since $3v+7\\ne 0$ there.\nStep 3: Match and multiply. Comparing $2v-5$ with $av+b$ gives $a=2$ and $b=-5$, so $ab=2(-5)=-10$. Check: at $v=4$, $\\frac{96-4-35}{19}=\\frac{57}{19}=3$ and $2(4)-5=3$ ✓\n\n**Common Mistakes:**\n* $10$: factors correctly but keeps $b$ positive, reading the leftover factor as $2v+5$ and computing $2(5)$.\n* $-3$: identifies $a=2$ and $b=-5$ but adds them, reporting $a+b=-3$ instead of the product.\n* $2$: cancels correctly and then reports only the coefficient $a$, stopping before the product.\n\n**Test Day Takeaway:** A quadratic over a linear expression is a factoring question in disguise: the denominator is always one of the numerator's factors, so build the second factor from the constant term. Then re-read which combination of the constants the question actually wants.\n",
  skills: ["simplifying-rational-expressions", "difference-of-squares"]
},
{
  id: 11,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "An automated sky camera counted meteors on each of 9 consecutive nights, as shown. Adding the count from a 10th night raises the mean to 8 meteors per night. What was the count on the 10th night?",
  diagram: { type: "dotPlot", params: { data: [{ value: 3, count: 1 }, { value: 5, count: 1 }, { value: 6, count: 1 }, { value: 7, count: 2 }, { value: 8, count: 2 }, { value: 9, count: 1 }, { value: 10, count: 1 }], xMin: 2, xMax: 12, xLabel: "Meteors counted per night" } },
  correctAnswer: "17",
  explanation: "**SAT Pattern: Mean from List**\n\n**The correct answer is 17.**\n\n**The Fast Way (~40s):** The 9 nights total $63$; ten nights averaging $8$ total $80$, so the 10th night contributed $80-63=17$.\n\n**The Full Solution:**\nStep 1: Total the dot plot. The counts are $3, 5, 6, 7, 7, 8, 8, 9, 10$, and their sum is $63$ meteors over $9$ nights.\nStep 2: Find the new total. A mean of $8$ across $10$ nights means the ten counts sum to $8 \\times 10 = 80$.\nStep 3: Subtract. The 10th night contributed $80-63=17$ meteors. Check: $\\frac{63+17}{10}=\\frac{80}{10}=8$ ✓\n\n**Common Mistakes:**\n* $8$: assumes the new value must equal the new mean; a single value only equals the mean when it leaves the mean unchanged, and here the mean rose from $7$ to $8$.\n* $9$: multiplies the new mean by the OLD count, computing $8 \\times 9 = 72$ and then $72-63=9$. The new mean applies to all ten nights.\n* $80$: reports the ten-night total instead of the single missing value.\n\n**Test Day Takeaway:** Every mean question is really a question about totals. Convert each mean to a sum (mean $\\times$ count) before comparing, and be careful that the new mean multiplies the NEW number of values.\n",
  skills: ["calculate-mean"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An observing run is scheduled with $x$ long exposures and $y$ short exposures, and the schedule must satisfy both $5x + 2y = 26$ and $2x + 5y = 23$. How many more long exposures than short exposures does the run include?",
  choices: [
    { id: "A", text: "$1$" },
    // distractor: subtracts the equations to reach 3x - 3y = 3 but reports 3 without dividing by 3
    { id: "B", text: "$3$" },
    // distractor: solves the system fully and reports x = 4 instead of the difference
    { id: "C", text: "$4$" },
    // distractor: adds the equations instead of subtracting, producing 7x + 7y = 49 and reporting x + y = 7
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Subtracting the second equation from the first gives $3x-3y=3$, so $x-y=1$.\n\n**The Full Solution:**\nStep 1: Line the equations up. $5x+2y=26$ and $2x+5y=23$ have coefficients that are mirror images, which is the signal to add or subtract rather than solve.\nStep 2: Subtract. $(5x+2y)-(2x+5y)=26-23$ gives $3x-3y=3$.\nStep 3: Divide by the common factor. $3(x-y)=3$, so $x-y=1$. Check: solving fully gives $x=4$ and $y=3$, and $4-3=1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($3$): reaches $3x-3y=3$ correctly and then reports the $3$ on the right side, forgetting to divide by the factor of $3$.\n* Choice C ($4$): solves the whole system and reports $x=4$ rather than the requested difference.\n* Choice D ($7$): adds the equations instead of subtracting, getting $7x+7y=49$ and $x+y=7$ — the right technique aimed at the wrong combination.\n\n**Test Day Takeaway:** When the coefficients of a system are swapped between the two equations, adding gives $x+y$ and subtracting gives $x-y$ in one line. Check which combination is asked for before you choose the operation.\n",
  skills: ["elimination-method"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A drone flies in a straight line from the point $(3, k)$ to the point $(11, 1)$ on a coordinate map, covering $10$ units, where $k$ exceeds $1$. What is the value of $k$?",
  choices: [
    // distractor: takes the negative square root, k - 1 = -6, ignoring the condition that k exceeds 1
    { id: "A", text: "$-5$" },
    // distractor: adds the coordinate differences instead of their squares, solving 8 + (k - 1) = 10
    { id: "B", text: "$3$" },
    // distractor: solves (k - 1)^2 = 36 to get k - 1 = 6 and reports 6 instead of adding 1 back
    { id: "C", text: "$6$" },
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Distance Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The horizontal leg is $8$, so the vertical leg satisfies $8^2+(k-1)^2=10^2$; that gives $(k-1)^2=36$ and, since $k>1$, $k=7$.\n\n**The Full Solution:**\nStep 1: Set up the distance formula. $\\sqrt{(11-3)^2+(1-k)^2}=10$, so $64+(1-k)^2=100$.\nStep 2: Isolate the squared term. $(1-k)^2=36$, so $1-k=\\pm 6$ and $k=-5$ or $k=7$.\nStep 3: Apply the restriction. Only $k=7$ satisfies $k>1$. Check: $\\sqrt{8^2+6^2}=\\sqrt{64+36}=\\sqrt{100}=10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): keeps the negative root $1-k=6$, which gives $k=-5$ — a real solution of the equation, but the problem states $k>1$.\n* Choice B ($3$): adds the leg lengths instead of their squares, solving $8+(k-1)=10$; distance is never the sum of the legs.\n* Choice C ($6$): solves $(k-1)^2=36$ correctly but reports $k-1=6$ rather than $k$ itself.\n\n**Test Day Takeaway:** A distance question with a variable coordinate always produces two roots. Read the restriction printed in the stem before you choose — it is there precisely because both roots satisfy the equation.\n",
  skills: ["coordinate-geometry"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Grain in a cylindrical bin occupies $324\\pi$ cubic meters, filling the bin to a uniform depth, and the circle forming the base of the bin has circumference $12\\pi$ meters. How many meters deep is the grain?",
  correctAnswer: "9",
  explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is 9.**\n\n**The Fast Way (~35s):** $C=2\\pi r=12\\pi$ gives $r=6$, so the base area is $36\\pi$; then $\\frac{324\\pi}{36\\pi}=9$ meters.\n\n**The Full Solution:**\nStep 1: Get the radius from the circumference. $2\\pi r = 12\\pi$, so $r = 6$ meters.\nStep 2: Find the base area. $A=\\pi r^2=\\pi(6)^2=36\\pi$ square meters.\nStep 3: Divide the volume by the base area. $V=Ah$ gives $324\\pi = 36\\pi h$, so $h = 9$ meters. Check: $\\pi(6)^2(9)=324\\pi$ ✓\n\n**Common Mistakes:**\n* $27$: divides the volume by the circumference, $\\frac{324\\pi}{12\\pi}$, using the distance around the base in place of the area of the base.\n* $54$: finds $r=6$ but writes the volume as $\\pi r h$ instead of $\\pi r^2 h$, solving $324\\pi = 6\\pi h$.\n* $2.25$: reads the circumference as $\\pi r$ rather than $2\\pi r$, so $r=12$ and the base area becomes $144\\pi$.\n\n**Test Day Takeaway:** Volume of any cylinder is (base area)(height), so a circumference or a diameter must be converted to a radius, then squared, before it can be used. Track which of $r$, $2\\pi r$, and $\\pi r^2$ you actually hold.\n",
  skills: ["volume-prism"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For a linear calibration, an instrument reading is given by $f(x) = a(x - 4) + 9$, where $a$ is a constant and $x$ is the input in millivolts. The technician measures $f(10) = 33$. At what input, in millivolts, does the reading equal $-3$?",
  choices: [
    // distractor: evaluates f(-3) = 4(-3 - 4) + 9 instead of solving f(x) = -3
    { id: "A", text: "$-19$" },
    // distractor: reads the output -3 as the input, reporting the number already given
    { id: "B", text: "$-3$" },
    { id: "C", text: "$1$" },
    // distractor: mishandles the sign in 4(x - 4) = -12, solving x - 4 = 3 to get x = 7
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** $f(10)=6a+9=33$ gives $a=4$; then $4(x-4)+9=-3$ gives $x-4=-3$, so $x=1$.\n\n**The Full Solution:**\nStep 1: Pin down the constant. $f(10)=a(10-4)+9=6a+9$. Setting $6a+9=33$ gives $6a=24$, so $a=4$.\nStep 2: Write the equation the question asks about. $f(x)=-3$ means $4(x-4)+9=-3$.\nStep 3: Solve for the input. Subtracting $9$ gives $4(x-4)=-12$, so $x-4=-3$ and $x=1$. Check: $f(1)=4(1-4)+9=-12+9=-3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-19$): substitutes $-3$ for $x$ and evaluates, $4(-3-4)+9=-19$ — that answers \"what is $f(-3)$?\", the reverse of what is asked.\n* Choice B ($-3$): reports the given output as though it were the input; $-3$ is the reading, not the value of $x$ that produces it.\n* Choice D ($7$): loses the negative sign in $4(x-4)=-12$, solving $x-4=3$.\n\n**Test Day Takeaway:** Two-stage function questions ask you to find the constant first, then solve. Before answering, ask which slot the given number occupies — input or output — since the distractors are built from swapping them.\n",
  skills: ["function-notation"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Every crane at a container port unloads cargo at the same constant rate, and the table shows three completed unloadings from last week. At that same rate, how many hours do 9 cranes working together need to unload $1{,}620$ tonnes?",
  questionTable: { headers: ["Unloading", "Cranes used", "Cargo unloaded (tonnes)", "Time (hours)"], rows: [["1", "4", "480", "4"], ["2", "6", "720", "4"], ["3", "5", "900", "6"]] },
  choices: [
    // distractor: treats 720 / 6 = 120 as tonnes per crane per hour, ignoring that unloading 2 ran for 4 hours
    { id: "A", text: "$1.5$" },
    { id: "B", text: "$6$" },
    // distractor: uses unloading 2's whole-crew rate of 180 tonnes per hour and never adjusts from 6 cranes to 9
    { id: "C", text: "$9$" },
    // distractor: uses unloading 1's whole-crew rate of 120 tonnes per hour and never adjusts from 4 cranes to 9
    { id: "D", text: "$13.5$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** Each crane moves $\\frac{480}{4 \\cdot 4}=30$ tonnes per hour, so $9$ cranes move $270$ tonnes per hour and $\\frac{1{,}620}{270}=6$ hours.\n\n**The Full Solution:**\nStep 1: Reduce every row to one rate. Unloading 1 gives $\\frac{480}{(4)(4)}=30$, unloading 2 gives $\\frac{720}{(6)(4)}=30$, and unloading 3 gives $\\frac{900}{(5)(6)}=30$ tonnes per crane per hour — the table is consistent.\nStep 2: Scale up to the new crew. Nine cranes move $9 \\times 30 = 270$ tonnes each hour.\nStep 3: Divide. $\\frac{1{,}620}{270}=6$ hours. Check: $9$ cranes $\\times$ $6$ hours $\\times$ $30$ tonnes $= 1{,}620$ tonnes ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.5$): computes $\\frac{720}{6}=120$ and calls it tonnes per crane per hour, dropping the $4$ hours unloading 2 took; that inflates the rate fourfold and gives $\\frac{1{,}620}{9(120)}=1.5$.\n* Choice C ($9$): uses unloading 2's crew rate of $\\frac{720}{4}=180$ tonnes per hour without noticing the new crew has $9$ cranes, not $6$.\n* Choice D ($13.5$): uses unloading 1's crew rate of $\\frac{480}{4}=120$ tonnes per hour, again skipping the crane adjustment.\n\n**Test Day Takeaway:** When a table carries two varying inputs, collapse it to a rate per unit of BOTH — here tonnes per crane per hour. Any rate that mentions only one of the two inputs cannot transfer to a crew of a different size.\n",
  skills: ["unit-conversion"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Two crews describe the same shipment with the expressions $7(2w - 5) + c$ and $14w + 9$, where $w$ is the number of drums on a trailer and $c$ is a constant. Whatever whole number $w$ a crew uses, the two expressions give the same value. What is the value of $c$?",
  choices: [
    // distractor: solves -35 + c = 9 but reports the negative, writing c = -(9 + 35)
    { id: "A", text: "$-44$" },
    // distractor: computes -35 + 9 instead of solving -35 + c = 9 for c
    { id: "B", text: "$-26$" },
    // distractor: sets c equal to the constant term on the right side without accounting for the -35
    { id: "C", text: "$9$" },
    { id: "D", text: "$44$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Distributing gives $14w-35+c$; matching constants with $14w+9$ requires $-35+c=9$, so $c=44$.\n\n**The Full Solution:**\nStep 1: Distribute. $7(2w-5)+c = 14w-35+c$.\nStep 2: Match the two expressions term by term. Since they agree for every $w$, the $w$-terms already match ($14w$ on both sides), so the constant terms must match: $-35+c=9$.\nStep 3: Solve the one-step equation. Adding $35$ to both sides gives $c=44$. Check: $7(2w-5)+44 = 14w-35+44 = 14w+9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-44$): gets the arithmetic right but flips the sign at the last step, writing $c=-(9+35)$ instead of $c=9+35$.\n* Choice B ($-26$): computes $-35+9=-26$, combining the two constants instead of solving $-35+c=9$ for $c$.\n* Choice C ($9$): sets $c$ equal to the constant on the right side, forgetting that distributing $7$ across $-5$ already contributed $-35$ to the left side.\n\n**Test Day Takeaway:** \"True for every value of the variable\" means the two sides are the same expression: match variable terms to variable terms and constants to constants. Distribute completely first — the hidden constant from the distribution is where this question is won or lost.\n",
  skills: ["combining-like-terms"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A poultry feed mix is $7$ parts corn, $4$ parts soybean meal, and $3$ parts limestone by mass, and it contains $240$ grams more corn than limestone. What is the total mass of the mix, in grams?",
  correctAnswer: "840",
  explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**The correct answer is 840.**\n\n**The Fast Way (~30s):** Corn exceeds limestone by $7-3=4$ parts, so one part is $\\frac{240}{4}=60$ grams, and the $14$ parts total $840$ grams.\n\n**The Full Solution:**\nStep 1: Convert the difference to parts. The mix is $7$ parts corn and $3$ parts limestone, a gap of $4$ parts.\nStep 2: Size one part. Those $4$ parts weigh $240$ grams, so one part weighs $\\frac{240}{4}=60$ grams.\nStep 3: Total the parts. The mix has $7+4+3=14$ parts, so its mass is $14(60)=840$ grams. Check: corn is $7(60)=420$ grams and limestone is $3(60)=180$ grams, and $420-180=240$ ✓\n\n**Common Mistakes:**\n* $60$: finds the mass of one part and stops, reporting $60$ instead of the total of all $14$ parts.\n* $420$: reports the mass of the corn alone, $7(60)$, rather than the mass of the whole mix.\n* $3{,}360$: treats the $240$-gram gap as the size of one part, computing $14(240)$ instead of first dividing by the $4$-part difference.\n\n**Test Day Takeaway:** In a parts-ratio question, translate every given quantity into parts first. A difference between two ingredients is a difference of parts, never the value of a single part.\n",
  skills: ["word-problem-to-equation"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An observatory logged $240$ transient events last year: $156$ were stellar flares, $36$ were satellite glints, and the rest were unidentified. If one of the logged events is selected at random, what is the probability that it was unidentified?",
  choices: [
    // distractor: reports the satellite glints, 36/240, instead of the unidentified events
    { id: "A", text: "$\\frac{3}{20}$" },
    { id: "B", text: "$\\frac{1}{5}$" },
    // distractor: reports the stellar flares, 156/240, instead of the unidentified events
    { id: "C", text: "$\\frac{13}{20}$" },
    // distractor: reports the complement, 192/240, the probability that an event WAS identified
    { id: "D", text: "$\\frac{4}{5}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Basic Probability**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Unidentified events number $240-156-36=48$, and $\\frac{48}{240}=\\frac{1}{5}$.\n\n**The Full Solution:**\nStep 1: Find the favorable count. \"The rest\" means everything not already named: $240-156-36=48$ unidentified events.\nStep 2: Identify the whole. One event is chosen from all $240$ logged events, so the denominator is $240$.\nStep 3: Form and reduce the ratio. $\\frac{48}{240}=\\frac{1}{5}$. Check: $\\frac{156}{240}+\\frac{36}{240}+\\frac{48}{240}=\\frac{240}{240}=1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3}{20}$): uses the $36$ satellite glints, $\\frac{36}{240}$ — the smaller named category, not the leftover one.\n* Choice C ($\\frac{13}{20}$): uses the $156$ stellar flares, $\\frac{156}{240}$, answering for the largest category instead.\n* Choice D ($\\frac{4}{5}$): computes $\\frac{156+36}{240}=\\frac{192}{240}$, the probability that the event WAS identified — the complement of what is asked.\n\n**Test Day Takeaway:** When a stem names some categories and ends with \"the rest,\" the favorable count is a subtraction, not a number printed in the problem. Compute it, then confirm the categories add back to the total.\n",
  skills: ["probability-basics"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A food-safety model gives the bacterial count per gram in a chilled shipment as $N(t) = 96(2)^{t/8}$, where $t$ is the number of hours since refrigeration failed. According to the model, by what percent does the count increase every $24$ hours?",
  choices: [
    // distractor: treats the 100% increase per 8 hours as additive, adding it three times to get 300%
    { id: "A", text: "$300\\%$" },
    // distractor: multiplies the base 2 by the 3 eight-hour periods to get a factor of 6, then reports 600%
    { id: "B", text: "$600\\%$" },
    { id: "C", text: "$700\\%$" },
    // distractor: finds the growth factor 8 but reports it as 800% without subtracting the original 100%
    { id: "D", text: "$800\\%$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Twenty-four hours is three $8$-hour periods, so the count multiplies by $2^3=8$; an $8$-fold count is a $700\\%$ increase.\n\n**The Full Solution:**\nStep 1: Read the exponent. Because $t$ is divided by $8$, the exponent advances by $1$ for every $8$ hours, so the count doubles every $8$ hours.\nStep 2: Compound over the requested window. $\\frac{N(t+24)}{N(t)} = 2^{\\frac{t+24}{8}-\\frac{t}{8}} = 2^{3} = 8$, so the count becomes $8$ times as large.\nStep 3: Convert a factor to a percent increase. Growing to $8$ times the original is an increase of $8-1=7$ times, or $700\\%$. Check: $N(0)=96$ and $N(24)=96(2)^3=768$, and $\\frac{768-96}{96}=7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($300\\%$): adds the per-period increase three times, as if $100\\%$ growth in each of three periods totaled $300\\%$; percent growth compounds, it does not add.\n* Choice B ($600\\%$): multiplies the base $2$ by the $3$ periods to get a factor of $6$; the number of periods belongs in the exponent, not as a multiplier.\n* Choice D ($800\\%$): computes the correct factor $8$ but reports it as the percent increase; the original $100\\%$ must be subtracted first.\n\n**Test Day Takeaway:** In $a(b)^{t/k}$, the count multiplies by $b$ every $k$ units, so over $n$ periods the factor is $b^n$. A factor of $F$ is a percent increase of $(F-1)\\times100\\%$ — subtracting that $1$ is the step the distractors are built on.\n",
  skills: ["exponential-growth-decay"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 6,
  question: "A triangular bracket for a telescope mount is shown, with its two legs meeting at a right angle and every length given in centimeters. What is the perimeter of the bracket, in centimeters?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 8]], sideLabels: ["x + 7", "x", "17"], rightAngleVertex: 1 } },
  choices: [
    // distractor: finds x = 8 but adds x, 7, and 17 instead of x, x + 7, and 17
    { id: "A", text: "$32$" },
    // distractor: assumes the two legs add to the hypotenuse, solving x + (x + 7) = 17 for x = 5 and adding 5 + 12 + 17
    { id: "B", text: "$34$" },
    { id: "C", text: "$40$" },
    // distractor: uses the magnitude of the rejected root x = -15, adding 15 + 22 + 17
    { id: "D", text: "$54$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** $x^2+(x+7)^2=17^2$ simplifies to $x^2+7x-120=0$, so $x=8$; the sides are $8$, $15$, and $17$, giving perimeter $40$.\n\n**The Full Solution:**\nStep 1: Apply the Pythagorean theorem to the labeled legs. $x^2+(x+7)^2=17^2$ becomes $x^2+x^2+14x+49=289$, or $2x^2+14x-240=0$.\nStep 2: Solve the quadratic. Dividing by $2$ gives $x^2+7x-120=0$, which factors as $(x+15)(x-8)=0$, so $x=-15$ or $x=8$. A length cannot be negative, so $x=8$.\nStep 3: Add the three sides. The legs are $8$ and $8+7=15$, and the hypotenuse is $17$, so the perimeter is $8+15+17=40$ centimeters. Check: $8^2+15^2=64+225=289=17^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): solves for $x=8$ correctly but then adds $8+7+17$, treating the $7$ as a side rather than as part of the leg $x+7$.\n* Choice B ($34$): assumes the legs add to the hypotenuse, solving $x+(x+7)=17$ for $x=5$ and summing $5+12+17$; only the SQUARES of the legs add to the square of the hypotenuse.\n* Choice D ($54$): keeps the rejected root as a length, using $x=15$ and $x+7=22$ to get $15+22+17$.\n\n**Test Day Takeaway:** When a right triangle's legs are given as expressions in one variable, the Pythagorean theorem produces a quadratic — expect two roots and discard the negative one. Then re-read which quantity the question wants; the variable is rarely the answer.\n",
  skills: ["pythagorean-theorem"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A circular scan region in the xy-plane is described by the equation $x^2 + y^2 - 14x + 8y = c$, where $c$ is a constant and both coordinates are measured in degrees. The region has a radius of $9$ degrees. What is the value of $c$?",
  choices: [
    // distractor: treats the given 9 as r^2 rather than r, computing c = 9 - 65
    { id: "A", text: "$-56$" },
    { id: "B", text: "$16$" },
    // distractor: subtracts 16 instead of adding it when completing the square on the y-terms, giving c = 81 - 49 + 16
    { id: "C", text: "$48$" },
    // distractor: adds 65 to 81 instead of subtracting, giving c = 81 + 65
    { id: "D", text: "$146$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** Completing both squares adds $49$ and $16$ to each side, so $c+65=9^2=81$ and $c=16$.\n\n**The Full Solution:**\nStep 1: Complete the square in $x$. Half of $-14$ is $-7$, and $(-7)^2=49$, so $x^2-14x$ becomes $(x-7)^2-49$.\nStep 2: Complete the square in $y$. Half of $8$ is $4$, and $4^2=16$, so $y^2+8y$ becomes $(y+4)^2-16$.\nStep 3: Set the right side equal to $r^2$. The equation becomes $(x-7)^2+(y+4)^2 = c+49+16 = c+65$. Since the radius is $9$, $c+65=81$, so $c=16$. Check: $(x-7)^2+(y+4)^2=81$ expands to $x^2+y^2-14x+8y+65=81$, or $x^2+y^2-14x+8y=16$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-56$): uses the radius itself where $r^2$ belongs, solving $c+65=9$ to get $-56$.\n* Choice C ($48$): completes the square on the $y$-terms but carries the correction as $-16$ on the wrong side, solving $c+49-16=81$.\n* Choice D ($146$): moves the $65$ the wrong way, computing $c=81+65$ instead of $c=81-65$.\n\n**Test Day Takeaway:** Completing the square always ADDS $\\left(\\frac{b}{2}\\right)^2$ to both sides, so the general-form constant is $r^2$ minus the total of those additions. Square the radius before you compare — the un-squared radius is the most common trap in this family.\n",
  skills: ["circle-equation"]
}
      ]
    }
  ]
};

export default practiceTest7;
