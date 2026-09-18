// Practice Test 3 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-08-31): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// 2026-06 blueprint: M1 5E/9M/8H. M2 keeps this test's wavy hard-track shape
// 3E/7M/12H (easy at Q1, Q3, Q19 breather; hard closers Q21-22; Q1-5 warm-ups
// are 2+ steps or carry a trap). Figure density at official ~20%: M1 carries
// 5 diagram items, M2 carries 4. Numeric MC choices sorted ascending.

export const practiceTest3 = {
  id: "practice-test-3",
  title: "Practice Test 3",
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
  question: "The table shows the two charges a cloud archive service bills a research group each month. Which equation gives the total monthly cost $C$, in dollars, when the group stores $g$ gigabytes?",
  questionTable: { headers: ["Charge", "Amount (dollars)"], rows: [["Monthly account fee", "24"], ["Cost per gigabyte stored", "0.15"]] },
  choices: [
    // distractor: applies the per-gigabyte rate to the account fee as well, charging 0.15 times 24 instead of adding the fee once
    { id: "A", text: "$C = 0.15(g + 24)$" },
    // distractor: swaps the two roles, charging 24 dollars per gigabyte and adding a flat 0.15
    { id: "B", text: "$C = 24g + 0.15$" },
    { id: "C", text: "$C = 0.15g + 24$" },
    // distractor: adds the fee to the rate first (24 + 0.15 = 24.15) and multiplies the sum by g, so the fee is charged once per gigabyte
    { id: "D", text: "$C = 24.15g$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The $24$ fee is billed once no matter how much is stored, so it is the constant term; the $0.15$ is billed per gigabyte, so it multiplies $g$. That gives $C = 0.15g + 24$.\n\n**The Full Solution:**\nStep 1: Separate the charge that does not depend on $g$. The monthly account fee is $\\$24$ whether the group stores $1$ gigabyte or $1{,}000$, so it enters the equation as a constant.\nStep 2: Write the charge that does depend on $g$. Storage costs $\\$0.15$ for each gigabyte, so $g$ gigabytes cost $0.15g$ dollars.\nStep 3: Add the two pieces: $C = 0.15g + 24$. Check with $g = 100$: the model gives $0.15(100) + 24 = 15 + 24 = 39$ dollars, which is $\\$15$ of storage plus the $\\$24$ fee ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($C = 0.15(g + 24)$): multiplies the account fee by the per-gigabyte rate. At $g = 100$ this bills $0.15(124) = 18.60$ dollars, which never collects the $\\$24$ fee at all.\n* Choice B ($C = 24g + 0.15$): swaps the two numbers, billing $\\$24$ for every gigabyte and adding a single $\\$0.15$. At $g = 100$ that is $\\$2{,}400.15$.\n* Choice D ($C = 24.15g$): adds $24$ and $0.15$ before multiplying, which charges the account fee once for every gigabyte stored rather than once for the month.\n\n**Test Day Takeaway:** In a two-charge table, ask of each row \"does this repeat with the variable?\" A one-time charge is the constant term; a per-unit charge is the coefficient.",
  skills: ["word-problem-to-equation"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A titration was repeated nine times on one acid sample. The drop counts recorded were $13$, $22$, $13$, $19$, $16$, $13$, $24$, $18$, and $21$. Which drop count occurred most often?",
  choices: [
    // distractor: reports the range, 24 - 13 = 11, instead of the most frequent value
    { id: "A", text: "$11$" },
    { id: "B", text: "$13$" },
    // distractor: reports the median, the fifth value of the ordered list, instead of the mode
    { id: "C", text: "$18$" },
    // distractor: reports the largest value in the data set instead of the most frequent one
    { id: "D", text: "$24$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Scan for a repeat. Only $13$ appears more than once, and it appears three times, so the mode is $13$.\n\n**The Full Solution:**\nStep 1: The mode of a data set is the value that occurs most often, so tally how many times each value appears.\nStep 2: The tallies are $13$ three times and $16$, $18$, $19$, $21$, $22$, and $24$ once each.\nStep 3: Three is the largest tally, so the mode is $13$. Check: the nine trials account for $3 + 1 + 1 + 1 + 1 + 1 + 1 = 9$ readings, and no other value repeats ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($11$): this is the range, $24 - 13 = 11$. The range measures spread; the mode is an actual data value.\n* Choice C ($18$): ordering the trials gives $13$, $13$, $13$, $16$, $18$, $19$, $21$, $22$, $24$, whose middle value is $18$. That is the median, not the mode.\n* Choice D ($24$): this is the maximum reading. The largest value and the most frequent value are different statistics, and here they are different numbers.\n\n**Test Day Takeaway:** Mode means \"most often,\" so count repeats before you order or average anything — ordering the list is what leads students into the median by mistake.",
  skills: ["find-mode"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Of the $240$ support tickets a campus network team closed in March, $96$ concerned wireless access points. One of those $240$ tickets will be chosen at random for an audit. What is the probability that the chosen ticket concerned a wireless access point?",
  choices: [
    { id: "A", text: "$\\frac{2}{5}$" },
    // distractor: divides the 96 wireless tickets by the 144 other tickets instead of by the 240 total
    { id: "B", text: "$\\frac{2}{3}$" },
    // distractor: forms the ratio of the 144 other tickets to the 96 wireless tickets
    { id: "C", text: "$\\frac{3}{2}$" },
    // distractor: inverts the probability, dividing the 240 total by the 96 wireless tickets
    { id: "D", text: "$\\frac{5}{2}$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Probability is the favorable count over the total count: $\\frac{96}{240} = \\frac{2}{5}$.\n\n**The Full Solution:**\nStep 1: Every one of the $240$ closed tickets is equally likely to be audited, so the total number of outcomes is $240$.\nStep 2: The outcomes that count as favorable are the $96$ tickets about wireless access points.\nStep 3: The probability is $\\frac{96}{240}$, and dividing numerator and denominator by $48$ gives $\\frac{2}{5}$. Check: $\\frac{2}{5}$ of $240$ is $96$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{2}{3}$): this is $\\frac{96}{144}$, wireless tickets compared with the $240 - 96 = 144$ other tickets. That is a part-to-part ratio, not a probability.\n* Choice C ($\\frac{3}{2}$): this is $\\frac{144}{96}$, the other tickets compared with the wireless ones. A probability can never exceed $1$.\n* Choice D ($\\frac{5}{2}$): this is $\\frac{240}{96}$, the total divided by the favorable count. The total belongs in the denominator.\n\n**Test Day Takeaway:** A probability is always part over whole, so the total goes underneath — any answer greater than $1$ is a signal that the fraction was flipped.",
  skills: ["probability-basics"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "An electrical contractor installed $50$ conduit brackets, each rated at either $200$ pounds or $500$ pounds, and the installed brackets have a combined rated capacity of $16{,}000$ pounds. How many of the brackets are rated at $500$ pounds?",
  choices: [
    // distractor: divides the extra capacity 6,000 by 500 instead of by the 300-pound difference between the two ratings
    { id: "A", text: "$12$" },
    { id: "B", text: "$20$" },
    // distractor: solves correctly but reports the number of 200-pound brackets rather than the 500-pound ones
    { id: "C", text: "$30$" },
    // distractor: divides the total capacity 16,000 by 500, ignoring the 200-pound brackets entirely
    { id: "D", text: "$32$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** If all $50$ brackets were the $200$-pound kind the capacity would be $10{,}000$ pounds. The extra $6{,}000$ pounds comes from swapping in $500$-pound brackets, each swap adding $300$ pounds, so $6{,}000 \\div 300 = 20$ brackets.\n\n**The Full Solution:**\nStep 1: Let $x$ be the number of $200$-pound brackets and $y$ the number of $500$-pound brackets. The two facts give $x + y = 50$ and $200x + 500y = 16{,}000$.\nStep 2: Solve the first equation for $x$, giving $x = 50 - y$, and substitute into the second: $200(50 - y) + 500y = 16{,}000$, so $10{,}000 + 300y = 16{,}000$.\nStep 3: Then $300y = 6{,}000$, so $y = 20$. Check: $x = 30$, and $200(30) + 500(20) = 6{,}000 + 10{,}000 = 16{,}000$ pounds ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): divides the extra $6{,}000$ pounds by $500$ instead of by $300$. Each swap does not add a full $500$ pounds; it adds $500 - 200 = 300$.\n* Choice C ($30$): this is $x$, the number of $200$-pound brackets. The substitution finds $y$ first, and the question asks for the $500$-pound count.\n* Choice D ($32$): comes from $16{,}000 \\div 500$, as if every pound of capacity came from a $500$-pound bracket. That answer also ignores the $50$-bracket total.\n\n**Test Day Takeaway:** With two counts and two totals, substitute the count equation into the value equation — then reread the question to see which of the two unknowns it actually wants.",
  skills: ["substitution-method"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A survey drawing places a drainage channel along the line $6y = 15 - 4x$. A retaining wall crosses the channel at a right angle. What is the slope of the retaining wall?",
  choices: [
    // distractor: takes the reciprocal of the channel's slope but keeps the negative sign
    { id: "A", text: "$-\\frac{3}{2}$" },
    // distractor: reports the channel's own slope instead of the slope of a line perpendicular to it
    { id: "B", text: "$-\\frac{2}{3}$" },
    // distractor: changes the sign of the channel's slope without taking the reciprocal
    { id: "C", text: "$\\frac{2}{3}$" },
    { id: "D", text: "$\\frac{3}{2}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The channel's slope is $-\\frac{4}{6} = -\\frac{2}{3}$, and a perpendicular line has the negative reciprocal, $\\frac{3}{2}$.\n\n**The Full Solution:**\nStep 1: Put the channel's equation in slope-intercept form. Dividing both sides of $6y = 15 - 4x$ by $6$ gives $y = -\\frac{2}{3}x + \\frac{5}{2}$.\nStep 2: The channel therefore has slope $-\\frac{2}{3}$. Two lines meet at a right angle exactly when their slopes are negative reciprocals, so multiply the slopes to $-1$.\nStep 3: The negative reciprocal of $-\\frac{2}{3}$ is $\\frac{3}{2}$. Check: $\\left(-\\frac{2}{3}\\right)\\left(\\frac{3}{2}\\right) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{3}{2}$): flips $-\\frac{2}{3}$ but leaves the minus sign in place. The product of the slopes would then be $+1$, not $-1$.\n* Choice B ($-\\frac{2}{3}$): this is the channel's own slope. A wall with that slope would run parallel to the channel, never crossing it.\n* Choice C ($\\frac{2}{3}$): changes the sign only. Flipping the sign without inverting the fraction gives a line that crosses the channel, but not at $90^\\circ$.\n\n**Test Day Takeaway:** Perpendicular means two changes, not one: flip the fraction and change the sign. Multiplying your answer by the original slope should give exactly $-1$.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In the figure, the lowest point of a parabola in the $xy$-plane is marked. Sliding that parabola $5$ units to the left and then $2$ units up produces a new parabola. What are the coordinates of the lowest point of the new parabola?",
  diagram: { type: "quadraticVertex", params: { vertex: [2, -3], a: 0.5, showVertex: true } },
  choices: [
    { id: "A", text: "$(-3, -1)$" },
    // distractor: moves left correctly but subtracts 2 from the y-coordinate instead of adding it
    { id: "B", text: "$(-3, -5)$" },
    // distractor: adds 5 to the x-coordinate, sliding the parabola right instead of left
    { id: "C", text: "$(7, -1)$" },
    // distractor: reverses both shifts, sliding 5 units right and 2 units down
    { id: "D", text: "$(7, -5)$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Function Transformation**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The marked lowest point is $(2, -3)$. Left $5$ and up $2$ sends it to $(2 - 5,\\ -3 + 2) = (-3, -1)$.\n\n**The Full Solution:**\nStep 1: Read the marked point on the graph. The lowest point of the given parabola is its vertex, at $(2, -3)$.\nStep 2: A slide moves every point of the curve by the same amounts, so the image of the lowest point is the lowest point of the new parabola. Sliding left $5$ units subtracts $5$ from the $x$-coordinate; sliding up $2$ units adds $2$ to the $y$-coordinate.\nStep 3: The new lowest point is $(2 - 5,\\ -3 + 2) = (-3, -1)$. Check the two coordinate changes separately: $-3 - 2 = -5$ horizontally and $-1 - (-3) = 2$ vertically ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($(-3, -5)$): moves the $x$-coordinate correctly but treats \"up $2$\" as a subtraction, giving $-3 - 2 = -5$ for the height.\n* Choice C ($(7, -1)$): adds $5$ to the $x$-coordinate. Sliding left decreases $x$, so $2 + 5 = 7$ puts the new vertex on the wrong side of the $y$-axis.\n* Choice D ($(7, -5)$): reverses both directions, sliding right $5$ and down $2$. That is the slide that would undo the one described.\n\n**Test Day Takeaway:** Translate the marked point, not the whole curve: apply the horizontal shift to $x$ and the vertical shift to $y$ one at a time, and remember that \"left\" subtracts.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A chemist models a circular reagent film on a chromatography plate with the equation $2x^2 + 2y^2 - 24x + 16y + 54 = 0$, taking one coordinate unit as one centimeter. How many centimeters long is the radius of the film?",
  correctAnswer: "5",
  explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~35s):** Divide the equation by $2$ to get $x^2 + y^2 - 12x + 8y + 27 = 0$, then complete both squares: $(x - 6)^2 + (y + 4)^2 = 25$, so $r = 5$.\n\n**The Full Solution:**\nStep 1: The standard form of a circle requires the $x^2$ and $y^2$ terms to have coefficient $1$. Dividing every term of $2x^2 + 2y^2 - 24x + 16y + 54 = 0$ by $2$ gives $x^2 + y^2 - 12x + 8y + 27 = 0$.\nStep 2: Group and move the constant: $(x^2 - 12x) + (y^2 + 8y) = -27$. Half of $-12$ is $-6$ and $(-6)^2 = 36$; half of $8$ is $4$ and $4^2 = 16$. Adding $36$ and $16$ to both sides gives $(x - 6)^2 + (y + 4)^2 = -27 + 36 + 16 = 25$.\nStep 3: In $(x - h)^2 + (y - k)^2 = r^2$, the right side is $r^2$, so $r^2 = 25$ and $r = 5$ centimeters. Check: the point $(11, -4)$ is $5$ units from the center $(6, -4)$, and $2(121) + 2(16) - 24(11) + 16(-4) + 54 = 242 + 32 - 264 - 64 + 54 = 0$ ✓\n\n**Common Mistakes:**\n* Answering $25$: that is $r^2$, the number on the right side of the completed form. The radius is its square root.\n* Answering about $12.41$: completing the square without first dividing by $2$ gives $(x - 12)^2 + (y + 8)^2 = 154$, so every center coordinate and the radius come out doubled or worse.\n* Answering about $8.89$: moving the $+27$ to the right side as $+27$ instead of $-27$ gives $r^2 = 36 + 16 + 27 = 79$. The constant changes sign when it crosses the equal sign.\n\n**Test Day Takeaway:** Before completing the square, make the coefficient of $x^2$ and $y^2$ equal to $1$ — a leading $2$ silently ruins every later step.",
  skills: ["circle-equation", "completing-square-circles"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A buffer is mixed from $4$ acid portions and $3$ base portions, each of volume $x$ milliliters, together with $26$ milliliters of water, and the mixture exactly fills a $145$-milliliter flask. What is the value of $x$?",
  correctAnswer: "17",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**The correct answer is $17$.**\n\n**The Fast Way (~20s):** The seven equal portions occupy $145 - 26 = 119$ milliliters, so each is $119 \\div 7 = 17$ milliliters.\n\n**The Full Solution:**\nStep 1: Every acid portion and every base portion has the same volume $x$, so the $4 + 3 = 7$ portions contribute $4x + 3x = 7x$ milliliters. Combining like terms gives the equation $7x + 26 = 145$.\nStep 2: Subtract the water, which is the only volume that does not depend on $x$: $7x = 145 - 26 = 119$.\nStep 3: Divide by $7$: $x = 17$. Check: $4(17) + 3(17) + 26 = 68 + 51 + 26 = 145$ milliliters ✓\n\n**Common Mistakes:**\n* Answering $119$: this is the combined volume of all seven portions. It still has to be split among the $7$ portions.\n* Answering about $24.43$: adding the $26$ milliliters instead of subtracting gives $7x = 171$ and $x \\approx 24.43$. The water is part of the $145$, so it comes off the total.\n* Answering $29.75$: dividing $119$ by $4$ counts only the acid portions. All seven portions have volume $x$.\n\n**Test Day Takeaway:** Collect every term carrying the variable into one coefficient first; the count you divide by at the end is that combined coefficient, not the count of one ingredient.",
  skills: ["combining-like-terms"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A technician writes the constraint on a storage plan twice, once as $10x + 4y = 26$ and once as $15x + cy = 39$. Every pair $(x, y)$ that satisfies one equation satisfies the other. What is the value of the constant $c$?",
  choices: [
    // distractor: reports the scale factor 15/10 = 1.5 itself instead of applying it to the coefficient 4
    { id: "A", text: "$1.5$" },
    // distractor: assumes the two equations must have identical y-coefficients rather than proportional ones
    { id: "B", text: "$4$" },
    { id: "C", text: "$6$" },
    // distractor: adds the difference 15 - 10 = 5 to 4 instead of multiplying 4 by the factor 1.5
    { id: "D", text: "$9$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The second equation must be the first multiplied by a constant. Since $15 \\div 10 = 1.5$ and $39 \\div 26 = 1.5$, the multiplier is $1.5$, so $c = 1.5(4) = 6$.\n\n**The Full Solution:**\nStep 1: Two linear equations are satisfied by exactly the same pairs $(x, y)$ only when one is a nonzero multiple of the other. So there is a constant $k$ with $15 = 10k$, $c = 4k$, and $39 = 26k$.\nStep 2: From $15 = 10k$, $k = 1.5$; the constant terms agree with this, since $26(1.5) = 39$.\nStep 3: Then $c = 4(1.5) = 6$. Check: multiplying $10x + 4y = 26$ by $1.5$ gives $15x + 6y = 39$, which is exactly the second equation ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.5$): this is the multiplier $k$, not the coefficient. The multiplier still has to be applied to the $4$.\n* Choice B ($4$): assumes both equations must show the same coefficient of $y$. They must be proportional, not identical — with $c = 4$ the second equation would be $15x + 4y = 39$, which the pair $(1, 6)$ satisfies while the first equation does not.\n* Choice D ($9$): adds $15 - 10 = 5$ to $4$. Equivalence comes from multiplying every term by the same factor, not from adding the same amount to every term.\n\n**Test Day Takeaway:** For \"same solutions\" systems, find the multiplier from a pair of coefficients you already know, then verify it on the constants before you use it on the unknown one.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "On a floor plan, one walkway edge lies on the line $3x - 4y = 20$. The opposite edge stays the same distance from it everywhere and contains the point $(6, -2)$. If the opposite edge has equation $3x - 4y = c$, what is the value of $c$?",
  correctAnswer: "26",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**The correct answer is $26$.**\n\n**The Fast Way (~20s):** Two lines in the form $3x - 4y = c$ are always parallel, so only $c$ changes. Substitute $(6, -2)$: $3(6) - 4(-2) = 18 + 8 = 26$.\n\n**The Full Solution:**\nStep 1: An edge that stays the same distance from $3x - 4y = 20$ everywhere is parallel to it, so it has the same slope, $\\frac{3}{4}$. Keeping the left side $3x - 4y$ guarantees that slope, which is why the problem writes the second edge as $3x - 4y = c$.\nStep 2: The point $(6, -2)$ lies on that edge, so its coordinates must satisfy the equation: $3(6) - 4(-2) = c$.\nStep 3: Evaluate: $18 - (-8) = 18 + 8 = 26$, so $c = 26$. Check: $3x - 4y = 26$ has slope $\\frac{3}{4}$ and passes through $(6, -2)$, and $26 \\ne 20$, so it is a different line ✓\n\n**Common Mistakes:**\n* Answering $10$: computing $3(6) - 4(2) = 10$ drops the negative sign on the $y$-coordinate. Subtracting $-2$ adds $8$.\n* Answering $20$: keeping the original constant makes the two edges the same line, so the walkway would have no width.\n* Answering $-30$: substituting the coordinates in the wrong order gives $3(-2) - 4(6) = -30$. The first number in an ordered pair is always $x$.\n\n**Test Day Takeaway:** Parallel in standard form means copy the entire left side and recompute only the constant by plugging in the given point — watch the sign when the coordinate is negative.",
  skills: ["writing-parallel-equation"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table lists three unit equivalences. A backup link moves $320$ megabits of data each second at a constant rate. Using the equivalences in the table, how much data, in gigabytes, does the link move in one hour?",
  questionTable: { headers: ["Quantity", "Equivalent"], rows: [["1 byte", "8 bits"], ["1 gigabyte", "1,000 megabytes"], ["1 hour", "3,600 seconds"]] },
  choices: [
    // distractor: stops after converting megabits per second to megabytes per second and never multiplies by 3,600
    { id: "A", text: "$40$" },
    { id: "B", text: "$144$" },
    // distractor: multiplies by 8 instead of dividing, treating 1 megabit as 8 megabytes
    { id: "C", text: "$9{,}216$" },
    // distractor: carries the conversion through in megabytes and never divides by 1,000 to reach gigabytes
    { id: "D", text: "$144{,}000$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $320 \\div 8 = 40$ megabytes per second; $40 \\times 3{,}600 = 144{,}000$ megabytes per hour; $144{,}000 \\div 1{,}000 = 144$ gigabytes.\n\n**The Full Solution:**\nStep 1: Convert bits to bytes. Because $1$ byte is $8$ bits, $320$ megabits is $\\frac{320}{8} = 40$ megabytes, so the link moves $40$ megabytes each second.\nStep 2: Convert seconds to hours. In $3{,}600$ seconds the link moves $40 \\times 3{,}600 = 144{,}000$ megabytes.\nStep 3: Convert megabytes to gigabytes: $\\frac{144{,}000}{1{,}000} = 144$ gigabytes. Check the chain of units: $\\frac{\\text{megabits}}{\\text{second}} \\times \\frac{\\text{byte}}{8\\ \\text{bits}} \\times \\frac{3{,}600\\ \\text{s}}{\\text{hour}} \\times \\frac{\\text{gigabyte}}{1{,}000\\ \\text{megabytes}}$ leaves gigabytes per hour ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($40$): this is the rate in megabytes per second, the result after only the first conversion. It is neither an hour's worth nor measured in gigabytes.\n* Choice C ($9{,}216$): multiplying by $8$ instead of dividing gives $2{,}560$ megabytes per second and $9{,}216$ gigabytes per hour. A byte is bigger than a bit, so the count of bytes must be smaller.\n* Choice D ($144{,}000$): this is the correct number of megabytes per hour. The question asks for gigabytes, which requires one more division by $1{,}000$.\n\n**Test Day Takeaway:** Write the conversion as a chain of fractions and cancel units as you go; the unit that survives should be the one the question names.",
  skills: ["unit-conversion"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A crucible residue is heated in a furnace, and the equation $m = 62 - 1.4t$ gives its mass $m$, in grams, after $t$ minutes of heating, for $0 \\le t \\le 40$. What does the number $1.4$ tell a chemist about the residue?",
  choices: [
    // distractor: reads 1.4 as a starting value, which is the role of the constant 62, not of the coefficient of t
    { id: "A", text: "The residue has a mass of $1.4$ grams when heating begins." },
    // distractor: keeps the size of the rate but drops the minus sign in front of 1.4, reversing the direction of change
    { id: "B", text: "The mass of the residue increases by $1.4$ grams each minute of heating." },
    // distractor: treats the per-minute rate as a single total change over the entire heating
    { id: "C", text: "The residue loses a total of $1.4$ grams over the whole heating." },
    { id: "D", text: "The mass of the residue decreases by $1.4$ grams each minute of heating." }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** In $m = 62 - 1.4t$ the coefficient of $t$ is $-1.4$, so each additional minute changes the mass by $-1.4$ grams — a loss of $1.4$ grams per minute.\n\n**The Full Solution:**\nStep 1: The model is linear in $t$, written as $m = b + at$ with $b = 62$ grams and $a = -1.4$ grams per minute. The constant $b$ is the mass at $t = 0$; the coefficient $a$ is the rate of change.\nStep 2: A rate of change is a per-unit quantity: $-1.4$ means the mass changes by $-1.4$ grams for each one-minute increase in $t$.\nStep 3: Because the change is negative, the residue loses $1.4$ grams per minute. Check: $m(0) = 62$ and $m(1) = 62 - 1.4 = 60.6$, a drop of exactly $1.4$ grams in one minute ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: the mass at the start is $m(0) = 62$ grams, the constant term. The number $1.4$ is attached to $t$, so it describes change, not a starting amount.\n* Choice B: the size $1.4$ is right, but the model subtracts $1.4t$. A minus sign in front of the rate means the quantity is falling, not rising.\n* Choice C: a slope is a change per minute, not a change over the whole heating. After $10$ minutes the residue has lost $14$ grams, not $1.4$.\n\n**Test Day Takeaway:** The coefficient of the variable is always a rate — read its sign for direction and attach the phrase \"per unit of the variable\" to its size.",
  skills: ["slope-intercept-form"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 4,
  question: "A monitoring script reports the value of $4n + 9$, where $n$ is the number of active sessions on a server. At noon the script reports $61$. If the script is changed to report $12n + 27$ instead, what value will it report at noon?",
  choices: [
    // distractor: reports 3n = 39, tripling the session count instead of the reported value
    { id: "A", text: "$39$" },
    // distractor: assumes the reported number cannot change when the expression changes
    { id: "B", text: "$61$" },
    // distractor: triples only the variable term, computing 12(13) + 9 = 165 with the old constant
    { id: "C", text: "$165$" },
    { id: "D", text: "$183$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Shifted Output**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** $12n + 27 = 3(4n + 9)$, so the new report is exactly three times the old one: $3(61) = 183$.\n\n**The Full Solution:**\nStep 1: Factor the new expression to compare it with the old one: $12n + 27 = 3(4n + 9)$. Both the coefficient and the constant are tripled, which is what makes the whole expression triple.\nStep 2: The old expression is worth $61$ at noon, so at that same moment $3(4n + 9) = 3(61) = 183$.\nStep 3: Confirm with the session count: $4n + 9 = 61$ gives $4n = 52$ and $n = 13$. Check: $12(13) + 27 = 156 + 27 = 183$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($39$): this is $3n = 3(13)$. Tripling the number of sessions is not the same as tripling the reported value, which also includes the constant.\n* Choice B ($61$): the reported value does depend on the expression. With $n = 13$ fixed, changing the formula changes the output.\n* Choice C ($165$): computes $12(13) + 9$, tripling the coefficient but leaving the constant at $9$. The new script adds $27$, not $9$.\n\n**Test Day Takeaway:** When a second expression is a constant multiple of the first, multiply the known value directly — you rarely need to solve for the variable at all.",
  skills: ["solving-equations", "ratios"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A quality check on a batch of $750$ network cables found that $6\\%$ of the cables failed a continuity test and $4\\%$ failed a shielding test, and no cable failed both tests. How many of the cables passed both tests?",
  choices: [
    // distractor: reports the 45 cables that failed the continuity test rather than the cables that passed both
    { id: "A", text: "$45$" },
    // distractor: reports the total number of failures, 10% of 750, instead of the number of passing cables
    { id: "B", text: "$75$" },
    { id: "C", text: "$675$" },
    // distractor: subtracts only the continuity failures, computing 750 - 45 and ignoring the shielding failures
    { id: "D", text: "$705$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Percent Complement**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Failures account for $6\\% + 4\\% = 10\\%$ of the batch, so $90\\%$ passed both: $0.90(750) = 675$.\n\n**The Full Solution:**\nStep 1: Because no cable failed both tests, the failing cables are two separate groups and their percents add: $6\\% + 4\\% = 10\\%$ of the batch failed at least one test.\nStep 2: A cable passes both tests exactly when it fails neither, so the passing cables are the complement: $100\\% - 10\\% = 90\\%$ of the batch.\nStep 3: Apply that percent to the batch size: $0.90(750) = 675$ cables. Check: $0.06(750) = 45$ and $0.04(750) = 30$, and $675 + 45 + 30 = 750$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($45$): this is $6\\%$ of $750$, the continuity failures. It answers how many failed one test, not how many passed both.\n* Choice B ($75$): this is $10\\%$ of $750$, the total number of failures. The question asks for the cables left over after those are removed.\n* Choice D ($705$): subtracts only the $45$ continuity failures. The $30$ shielding failures also did not pass both tests.\n\n**Test Day Takeaway:** \"Passed both\" is the complement of \"failed at least one,\" so add the disjoint failure percents first and subtract from $100\\%$ before touching the total.",
  skills: ["percent-of-value"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A laboratory model predicts that the number of minutes $t$ a reaction needs to reach equilibrium, measured from the moment the reagents are mixed, is the solution of the equation $\\sqrt{3t + 40} = t$. According to this model, how many minutes does the reaction need to reach equilibrium?",
  correctAnswer: "8",
  explanation: "**SAT Pattern: Radical Equation**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~35s):** Squaring gives $3t + 40 = t^2$, so $t^2 - 3t - 40 = 0$ and $(t - 8)(t + 5) = 0$. Substituting back, only $t = 8$ satisfies the original equation.\n\n**The Full Solution:**\nStep 1: Square both sides of $\\sqrt{3t + 40} = t$ to clear the radical: $3t + 40 = t^2$.\nStep 2: Write the quadratic in standard form, $t^2 - 3t - 40 = 0$, and factor. Two numbers whose product is $-40$ and whose sum is $-3$ are $-8$ and $5$, so $(t - 8)(t + 5) = 0$ and $t = 8$ or $t = -5$.\nStep 3: Squaring can introduce roots the original equation does not have, so test both. For $t = 8$: $\\sqrt{3(8) + 40} = \\sqrt{64} = 8$ ✓. For $t = -5$: $\\sqrt{3(-5) + 40} = \\sqrt{25} = 5$, which is not $-5$, so that root is extraneous.\n\n**Common Mistakes:**\n* Answering $-5$: this root satisfies the squared equation but not the original one, because a square root is never negative. It is also not a possible number of minutes.\n* Answering $5$: factoring $t^2 - 3t - 40$ as $(t - 5)(t + 8)$ reverses the signs. That product expands to $t^2 + 3t - 40$, which is a different quadratic.\n* Answering $64$: this is $3t + 40$, the quantity under the radical at the solution. The equation asks for $t$, not for the radicand.\n\n**Test Day Takeaway:** Squaring is a one-way move: it can create solutions. Always substitute each root back into the original radical equation before choosing one.",
  skills: ["radical-equations"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A distributed cache grows exponentially, and the table lists how many entries the cache held at four recorded times, measured in hours after the cache was started. According to this growth pattern, how many entries will the cache hold $12$ hours after it was started?",
  questionTable: { headers: ["Time (hours)", "Entries"], rows: [["0", "64"], ["2", "96"], ["4", "144"], ["6", "216"]] },
  correctAnswer: "729",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $729$.**\n\n**The Fast Way (~40s):** Each $2$-hour step multiplies the count by $1.5$. From hour $6$ to hour $12$ there are three more steps, so the count is $216(1.5)^3 = 216(3.375) = 729$.\n\n**The Full Solution:**\nStep 1: Test for a constant ratio between consecutive table entries: $\\frac{96}{64} = 1.5$, $\\frac{144}{96} = 1.5$, and $\\frac{216}{144} = 1.5$. The count is multiplied by $1.5$ every $2$ hours, which confirms exponential growth.\nStep 2: Write the model with the time step built in: $E(t) = 64(1.5)^{t/2}$, where $t$ is in hours. Check it on the table: $E(4) = 64(1.5)^2 = 64(2.25) = 144$ ✓\nStep 3: Evaluate at $t = 12$: $E(12) = 64(1.5)^{6} = 64(11.390625) = 729$. Check by stepping: $216 \\to 324 \\to 486 \\to 729$ covers hours $8$, $10$, and $12$ ✓\n\n**Common Mistakes:**\n* Answering about $8{,}304$: using $64(1.5)^{12}$ treats $1.5$ as an hourly factor. The table shows the factor applies once per $2$ hours, so the exponent is $\\frac{12}{2} = 6$.\n* Answering $432$: adding the last difference repeatedly, $216 + 72 + 72 + 72$, models linear growth. Exponential growth has a constant ratio, not a constant difference.\n* Answering $324$: this is the count at hour $8$, one step past the table. Reaching hour $12$ takes three more steps, not one.\n\n**Test Day Takeaway:** When a table's ratio is constant over an interval longer than one unit, put that interval in the exponent as $t/\\text{interval}$ — that division is where most exponential items are lost.",
  skills: ["exponential-growth-decay"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A fabricator cuts a gusset plate in the shape of a right triangle whose acute angle $P$ satisfies $\\tan P = \\frac{12}{5}$. The perimeter of the finished plate is $k$ inches. Which expression gives the length, in inches, of the longer leg of the plate?",
  choices: [
    // distractor: gives the shorter leg, 5m out of a perimeter of 30m, instead of the longer leg
    { id: "A", text: "$\\frac{k}{6}$" },
    { id: "B", text: "$\\frac{2k}{5}$" },
    // distractor: gives the hypotenuse, 13m out of a perimeter of 30m
    { id: "C", text: "$\\frac{13k}{30}$" },
    // distractor: treats k as the hypotenuse and takes 12/13 of it, ignoring that k is the perimeter
    { id: "D", text: "$\\frac{12k}{13}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $\\tan P = \\frac{12}{5}$ makes the legs $12m$ and $5m$ and the hypotenuse $13m$, so the perimeter is $30m = k$. The longer leg is $12m = \\frac{12k}{30} = \\frac{2k}{5}$.\n\n**The Full Solution:**\nStep 1: Tangent is the opposite leg over the adjacent leg, so for some positive $m$ the leg opposite $P$ is $12m$ and the leg adjacent to $P$ is $5m$.\nStep 2: The Pythagorean theorem gives the hypotenuse: $\\sqrt{(12m)^2 + (5m)^2} = \\sqrt{169m^2} = 13m$. The three sides are therefore $5m$, $12m$, and $13m$, and the perimeter is $5m + 12m + 13m = 30m$.\nStep 3: Since the perimeter is $k$, $30m = k$ and $m = \\frac{k}{30}$. The longer leg is $12m = \\frac{12k}{30} = \\frac{2k}{5}$. Check with $k = 60$: the sides are $10$, $24$, and $26$, which sum to $60$, and $\\frac{2(60)}{5} = 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{k}{6}$): this is $5m = \\frac{5k}{30}$, the shorter leg. With $\\tan P = \\frac{12}{5}$, the leg opposite $P$ is the longer one.\n* Choice C ($\\frac{13k}{30}$): this is the hypotenuse $13m$. The hypotenuse is not a leg.\n* Choice D ($\\frac{12k}{13}$): applies the ratio $\\frac{12}{13}$ to $k$ as though $k$ were the hypotenuse. Here $k$ is the whole perimeter, so it must be split into $30$ parts, not $13$.\n\n**Test Day Takeaway:** Turn a trigonometric ratio into a scaled side triple, add the sides to get the perimeter in terms of the scale factor, then solve for that factor before answering.",
  skills: ["soh-cah-toa"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The figure shows two diagonal braces of a scaffold panel crossing at one point, with three of the four angles formed there marked in degrees. The constants $x$ and $y$ appear in those markings. What is the value of $y$?",
  diagram: { type: "intersectingLines", params: { angles: ["(7x + 12)°", "(5x + 24)°", "y°", ""], lineLabels: [] } },
  choices: [
    // distractor: reports x = 12 instead of the angle measure y
    { id: "A", text: "$12$" },
    // distractor: sets the two labeled expressions equal, treating adjacent angles as vertical angles, and gets 54
    { id: "B", text: "$54$" },
    // distractor: reports the measure of the (5x + 24) degree angle, which is adjacent to y rather than equal to it
    { id: "C", text: "$84$" },
    { id: "D", text: "$96$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The two labeled expressions sit side by side along one straight brace, so $(7x + 12) + (5x + 24) = 180$, giving $x = 12$. Then $y$ is vertical to the $(7x + 12)^\\circ$ angle, so $y = 7(12) + 12 = 96$.\n\n**The Full Solution:**\nStep 1: The $(7x + 12)^\\circ$ and $(5x + 24)^\\circ$ angles are adjacent angles along one of the braces, so together they form a straight angle: $(7x + 12) + (5x + 24) = 180$.\nStep 2: Combine and solve: $12x + 36 = 180$, so $12x = 144$ and $x = 12$. The two angles then measure $7(12) + 12 = 96$ degrees and $5(12) + 24 = 84$ degrees, and $96 + 84 = 180$ ✓\nStep 3: The angle marked $y^\\circ$ is across the crossing point from the $(7x + 12)^\\circ$ angle, so the two are vertical angles and have equal measures: $y = 96$. Check: the four angles are $96$, $84$, $96$, and $84$, and they total $360$ degrees ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): this is $x$, the value found in the middle of the work. The question asks for the angle measure $y$, which still requires substituting.\n* Choice B ($54$): setting $7x + 12 = 5x + 24$ treats the two labeled angles as vertical angles. They share a side, so they are supplementary instead, and this shortcut gives $x = 6$ and $54$ degrees.\n* Choice C ($84$): this is the measure of the $(5x + 24)^\\circ$ angle. That angle is adjacent to $y^\\circ$, so the two add to $180$ rather than being equal.\n\n**Test Day Takeaway:** At a crossing, first decide whether the two labeled angles share a side or sit across from each other — that choice decides between summing to $180$ and setting equal.",
  skills: ["angles"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The cross section of a parabolic trough reflector has height $h$, in centimeters, at horizontal distance $d$ centimeters from its left edge, where $h = d^2 - 8d + 22$. A straight support bar lies along the line $h = 2d + c$, where $c$ is a constant, and the bar touches the cross section at exactly one point. What is the value of $c$?",
  choices: [
    { id: "A", text: "$-3$" },
    // distractor: forces the support bar through the lowest point (4, 6) of the cross section instead of imposing a single point of contact
    { id: "B", text: "$-2$" },
    // distractor: leaves 2d on the right side, using the discriminant of d^2 - 8d + (22 - c) and getting c = 6
    { id: "C", text: "$6$" },
    // distractor: reads c off the constant term of the reflector's equation instead of solving for it
    { id: "D", text: "$22$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** Setting the two heights equal gives $d^2 - 10d + (22 - c) = 0$. One point of contact means the discriminant is $0$: $100 - 4(22 - c) = 0$, so $c = -3$.\n\n**The Full Solution:**\nStep 1: The bar touches the cross section where the two heights agree, so $d^2 - 8d + 22 = 2d + c$. Move every term to one side: $d^2 - 10d + (22 - c) = 0$.\nStep 2: A quadratic has exactly one real solution precisely when its discriminant $b^2 - 4ac$ equals $0$. Here $a = 1$, $b = -10$, and the constant is $22 - c$, so $(-10)^2 - 4(1)(22 - c) = 0$.\nStep 3: Expand: $100 - 88 + 4c = 0$, so $4c = -12$ and $c = -3$. Check: with $c = -3$ the equation becomes $d^2 - 10d + 25 = 0$, or $(d - 5)^2 = 0$, a single contact at $d = 5$, where the reflector height is $25 - 40 + 22 = 7$ and the bar height is $2(5) - 3 = 7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-2$): puts the bar through the lowest point of the cross section, $(4, 6)$, since $6 = 2(4) - 2$. A line of slope $2$ through that point actually crosses the curve twice, not once.\n* Choice C ($6$): forgets to bring $2d$ across, applying the discriminant to $d^2 - 8d + (22 - c)$ and getting $64 - 4(22 - c) = 0$. The linear term must be combined before the discriminant is used.\n* Choice D ($22$): copies the constant term of the reflector's equation. That number is the height of the cross section at $d = 0$, not the bar's intercept.\n\n**Test Day Takeaway:** \"Touches at exactly one point\" is a discriminant instruction: set the curves equal, collect every term on one side, and set $b^2 - 4ac = 0$.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A benchmark reports that a routine performs $\\frac{4^{3n} \\cdot 8^{n + 2}}{16^{n}}$ elementary operations when it is run on an input of size $n$, where $n$ is a positive integer. Which of the following expressions is equivalent to the number of elementary operations the routine performs?",
  choices: [
    // distractor: rewrites 4^(3n) as 2^(3n) instead of 2^(6n), forgetting that 4 = 2^2 doubles the exponent
    { id: "A", text: "$2^{2n + 6}$" },
    // distractor: rewrites 8^(n+2) as 2^(3n+2), distributing the 3 to n only and not to the 2
    { id: "B", text: "$2^{5n + 2}$" },
    { id: "C", text: "$2^{5n + 6}$" },
    // distractor: adds the denominator's exponent 4n instead of subtracting it
    { id: "D", text: "$2^{13n + 6}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Write everything in base $2$: $4^{3n} = 2^{6n}$, $8^{n+2} = 2^{3n+6}$, $16^{n} = 2^{4n}$. Then $6n + (3n + 6) - 4n = 5n + 6$, so the expression is $2^{5n + 6}$.\n\n**The Full Solution:**\nStep 1: Rewrite each base as a power of $2$ using $(b^{p})^{q} = b^{pq}$. Since $4 = 2^2$, $4^{3n} = 2^{6n}$. Since $8 = 2^3$, $8^{n+2} = 2^{3(n+2)} = 2^{3n+6}$. Since $16 = 2^4$, $16^{n} = 2^{4n}$.\nStep 2: Multiply in the numerator by adding exponents: $2^{6n} \\cdot 2^{3n+6} = 2^{9n+6}$.\nStep 3: Divide by subtracting exponents: $\\frac{2^{9n+6}}{2^{4n}} = 2^{5n+6}$. Check with $n = 1$: the original is $\\frac{4^{3} \\cdot 8^{3}}{16} = \\frac{64 \\cdot 512}{16} = 2048$, and $2^{5(1)+6} = 2^{11} = 2048$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2^{2n + 6}$): treats $4^{3n}$ as $2^{3n}$, keeping the exponent instead of doubling it. Because $4 = 2^2$, changing the base to $2$ multiplies the exponent by $2$.\n* Choice B ($2^{5n + 2}$): rewrites $8^{n+2}$ as $2^{3n+2}$, multiplying only the $n$ by $3$. The exponent $3$ distributes across the whole sum, giving $3n + 6$.\n* Choice D ($2^{13n + 6}$): adds $4n$ instead of subtracting it. Division of like bases subtracts exponents.\n\n**Test Day Takeaway:** Convert every base to the same prime first, then let the exponent rules do the work — and distribute an outer exponent across every term inside the parentheses.",
  skills: ["exponent-laws"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A chemist models the yield $y$, in grams, of a reaction run at temperature $T$, in degrees Celsius, by $y = -0.4T^2 + 32T - 340$, and the table lists four measured yields that are consistent with this model. According to the model, what is the greatest yield, in grams, the reaction can produce?",
  questionTable: { headers: ["Temperature (degrees Celsius)", "Yield (grams)"], rows: [["20", "140"], ["30", "260"], ["50", "260"], ["60", "140"]] },
  choices: [
    // distractor: reports the temperature 40 at which the maximum occurs instead of the yield there
    { id: "A", text: "$40$" },
    // distractor: reports the largest yield listed in the table, but the table skips the temperature where the yield peaks
    { id: "B", text: "$260$" },
    { id: "C", text: "$300$" },
    // distractor: reads the constant term 340 as the peak yield, ignoring its minus sign and its role in the model
    { id: "D", text: "$340$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The table is symmetric about $T = 40$, which is the axis of symmetry. Substituting gives $y = -0.4(1600) + 32(40) - 340 = -640 + 1280 - 340 = 300$ grams.\n\n**The Full Solution:**\nStep 1: The coefficient of $T^2$ is $-0.4$, which is negative, so the graph of the model is a downward parabola and its vertex gives the greatest yield.\nStep 2: Complete the square to reach vertex form: $y = -0.4(T^2 - 80T) - 340 = -0.4\\left[(T - 40)^2 - 1600\\right] - 340 = -0.4(T - 40)^2 + 640 - 340$, so $y = -0.4(T - 40)^2 + 300$.\nStep 3: The squared term is never negative, so $y$ is largest when $T = 40$, where $y = 300$ grams. Check against the table: $30$ and $50$ are each $10$ degrees from $40$ and both give $260$ grams, which is $0.4(10)^2 = 40$ grams below the peak ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($40$): this is the temperature at which the peak occurs, in degrees Celsius. The question asks for the yield at that temperature.\n* Choice B ($260$): this is the largest yield in the table, but the table lists no measurement at $40$ degrees. A table can miss the vertex entirely.\n* Choice D ($340$): the model's constant term is $-340$, the yield at $T = 0$, not a maximum. Every yield in the table is already larger than that.\n\n**Test Day Takeaway:** For a downward parabola, the maximum is the vertex's output — find the axis of symmetry (from $-\\frac{b}{2a}$ or from a symmetric pair of table values), then substitute to get the value itself.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A roof truss has the shape of triangle $ABC$. A horizontal tie $DE$ runs parallel to the base $BC$, with $D$ on side $AB$ and $E$ on side $AC$, and it divides side $AB$ so that $AD = 12$ feet and $DB = 8$ feet. If side $BC$ has length $m$ feet, what is the length of the tie, in feet?",
  choices: [
    // distractor: uses DB/AB = 8/20 = 2/5, scaling by the lower piece of AB instead of the piece from the apex
    { id: "A", text: "$\\frac{2m}{5}$" },
    { id: "B", text: "$\\frac{3m}{5}$" },
    // distractor: uses AD/DB = 12/8 = 3/2, comparing the two pieces of AB rather than a piece to the whole side
    { id: "C", text: "$\\frac{3m}{2}$" },
    // distractor: inverts the scale factor, using AB/AD = 20/12 = 5/3 and making the tie longer than the base
    { id: "D", text: "$\\frac{5m}{3}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\overline{DE} \\parallel \\overline{BC}$ makes triangle $ADE$ similar to triangle $ABC$, and $AB = 12 + 8 = 20$, so every side of $ADE$ is $\\frac{12}{20} = \\frac{3}{5}$ of the matching side of $ABC$. Therefore $DE = \\frac{3m}{5}$.\n\n**The Full Solution:**\nStep 1: Because $\\overline{DE}$ is parallel to $\\overline{BC}$, angle $ADE$ and angle $ABC$ are corresponding angles and are congruent, and the two triangles share angle $A$. By angle-angle similarity, triangle $ADE$ is similar to triangle $ABC$, with $D$ corresponding to $B$ and $E$ to $C$.\nStep 2: In similar triangles the ratio of any pair of corresponding sides is the same. The side $AD$ corresponds to the whole side $AB$, and $AB = AD + DB = 12 + 8 = 20$ feet, so the ratio of similarity is $\\frac{AD}{AB} = \\frac{12}{20} = \\frac{3}{5}$.\nStep 3: The tie $DE$ corresponds to the base $BC$, so $\\frac{DE}{BC} = \\frac{3}{5}$ and $DE = \\frac{3}{5}m = \\frac{3m}{5}$. Check with $m = 20$: the tie would be $12$ feet, shorter than the base, as a tie above the base must be ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{2m}{5}$): uses $\\frac{DB}{AB} = \\frac{8}{20}$. The triangle cut off at the apex is scaled by the piece next to the apex, $AD$, not by the piece next to the base.\n* Choice C ($\\frac{3m}{2}$): uses $\\frac{AD}{DB} = \\frac{12}{8}$, a ratio of the two pieces of $AB$. Similarity compares a side of the small triangle to the whole matching side of the large one.\n* Choice D ($\\frac{5m}{3}$): flips the ratio to $\\frac{AB}{AD} = \\frac{20}{12}$, which would make the tie longer than the base it sits above.\n\n**Test Day Takeaway:** With a parallel cut, write the ratio as small-triangle side over the whole corresponding side — and sanity-check that a segment nearer the apex comes out shorter than the base.",
  skills: ["similar-triangles"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 3 — Math Module 2 (22 questions), hard track.
// Official-calibration recreation (2026-08-31). Wavy shape kept from the
// blueprint: easy at Q1, Q3, Q19 (mid/late breather); medium at Q2, Q4, Q5,
// Q7, Q10, Q11, Q12; hard everywhere else, Q21/Q22 hard closers.
// Q1-5 warm-ups are 2+ steps or carry a trap (no one-formula plug-ins):
// Q1 missing-LEG Pythagorean with the add-squares trap + surd simplification,
// Q2 map-scale proportion + km conversion, Q3 inequality with a sign flip,
// Q4 mean read off a bar graph, Q5 unequal-denominator fraction equation.
// Diagram items: Q4 barChart, Q10 quadraticVertex, Q13 table, Q20 rightTriangle.
{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Reinforcement patches $ABC$ and $DEF$ are cut to the same shape at two different sizes for a garment seam, with $AB$ corresponding to $DE$. If patch $DEF$ covers $81$ square centimeters of fabric, how many square centimeters does patch $ABC$ cover?",
  diagram: { type: "similarTriangles", params: { triangle1: { labels: ["A", "B", "C"], sideLabels: ["12", "", ""] }, triangle2: { labels: ["D", "E", "F"], sideLabels: ["18", "", ""] }, figureNote: true } },
  choices: [
    { id: "A", text: "$36$" },
    // distractor: applies the side ratio 2/3 to the area instead of squaring it: 81 x 2/3 = 54
    { id: "B", text: "$54$" },
    // distractor: uses the scale factor upside down and unsquared: 81 x 3/2 = 121.5
    { id: "C", text: "$121.5$" },
    // distractor: squares the scale factor but inverts it: 81 x 9/4 = 182.25
    { id: "D", text: "$182.25$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Corresponding sides are $12$ and $18$, a ratio of $\\frac{2}{3}$, so the areas are in the ratio $\\frac{4}{9}$: $81 \\cdot \\frac{4}{9} = 36$.\n\n**The Full Solution:**\nStep 1: The patches are the same shape at different sizes, so the triangles are similar. The corresponding sides $AB = 12$ and $DE = 18$ give the scale factor $\\frac{AB}{DE} = \\frac{12}{18} = \\frac{2}{3}$.\nStep 2: For similar figures, the ratio of the areas is the SQUARE of the ratio of corresponding sides: $\\left(\\frac{2}{3}\\right)^{2} = \\frac{4}{9}$.\nStep 3: The area of $ABC$ is $\\frac{4}{9}(81) = 36$ square centimeters. Check: scaling $36$ back up by $\\frac{9}{4}$ returns $81$, the area of $DEF$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($54$): applies the side ratio $\\frac{2}{3}$ directly to the area, $81 \\cdot \\frac{2}{3} = 54$, forgetting that area scales by the square of the ratio.\n* Choice C ($121.5$): flips the scale factor to $\\frac{3}{2}$ and applies it unsquared, $81 \\cdot \\frac{3}{2} = 121.5$, enlarging the patch that should be smaller.\n* Choice D ($182.25$): squares the scale factor but inverts it, $81 \\cdot \\frac{9}{4} = 182.25$.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^{2}$, volumes by $k^{3}$. Write the ratio smaller-over-larger the same way the question asks, then square it once — before touching the arithmetic.",
  skills: ["similar-triangles"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A national park's visitor center recorded $6{,}000$ shuttle boardings in June and $4{,}800$ in July. If the percent decrease from July to August equals the percent decrease from June to July, how many shuttle boardings are projected for August?",
  choices: [
    // distractor: reports the size of the July-to-August decrease, 0.20 x 4800 = 960, not the August total
    { id: "A", text: "$960$" },
    // distractor: subtracts the same number of boardings (1,200) instead of the same percent: 4800 - 1200 = 3600
    { id: "B", text: "$3{,}600$" },
    { id: "C", text: "$3{,}840$" },
    // distractor: increases July by 20% instead of decreasing it: 4800 x 1.20 = 5760
    { id: "D", text: "$5{,}760$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** July is $\\frac{4800}{6000} = 0.8$ of June, so August is $0.8$ of July: $4800(0.8) = 3840$.\n\n**The Full Solution:**\nStep 1: The June-to-July decrease is $6000 - 4800 = 1200$ boardings, so the percent decrease is $\\frac{1200}{6000} = 0.20$, or $20\\%$.\nStep 2: A $20\\%$ decrease multiplies a value by $1 - 0.20 = 0.80$. Applying that same percent to July gives $4800(0.80)$.\nStep 3: $4800(0.80) = 3840$ boardings. Check: $4800 - 3840 = 960$, and $\\frac{960}{4800} = 0.20$, the required $20\\%$ decrease. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($960$): this is the decrease itself, $0.20(4800) = 960$, not the number of boardings left in August.\n* Choice B ($3{,}600$): repeats the drop of $1{,}200$ boardings rather than the drop of $20\\%$, giving $4800 - 1200 = 3600$. Equal percents are not equal amounts once the base shrinks.\n* Choice D ($5{,}760$): multiplies by $1.20$ instead of $0.80$, turning the decrease into an increase.\n\n**Test Day Takeaway:** Convert a percent change into a single multiplier ($0.80$ here) before you use it twice. Repeating an amount and repeating a percent give different answers, and the SAT always builds a choice from the wrong one.",
  skills: ["percent-change"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A pharmacist starts with $900$ milliliters of a stock solution, prepares $n$ identical $15$-milliliter doses from it, and discards $45$ milliliters of residue, leaving $180$ milliliters of the stock solution. What is the value of $n$?",
  choices: [
    { id: "A", text: "$45$" },
    // distractor: ignores the 45 mL of discarded residue: (900 - 180)/15 = 48
    { id: "B", text: "$48$" },
    // distractor: adds the discarded residue instead of subtracting it: (900 + 45 - 180)/15 = 51
    { id: "C", text: "$51$" },
    // distractor: forgets the 180 mL still left in the container: (900 - 45)/15 = 57
    { id: "D", text: "$57$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The doses account for $900 - 45 - 180 = 675$ milliliters, and $\\frac{675}{15} = 45$.\n\n**The Full Solution:**\nStep 1: Every milliliter of the original $900$ ends up in one of three places: the doses ($15n$), the residue ($45$), or what is left ($180$). That gives $15n + 45 + 180 = 900$.\nStep 2: Combine the constants and isolate the variable term: $15n + 225 = 900$, so $15n = 675$.\nStep 3: Divide: $n = \\frac{675}{15} = 45$. Check: $15(45) + 45 + 180 = 675 + 225 = 900$ milliliters. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($48$): drops the $45$ milliliters of residue from the accounting, solving $15n + 180 = 900$.\n* Choice C ($51$): treats the residue as something added to the supply rather than taken from it, solving $15n + 180 = 945$.\n* Choice D ($57$): forgets that $180$ milliliters is still in the container, solving $15n + 45 = 900$.\n\n**Test Day Takeaway:** In a multi-step linear setup, write one equation that accounts for the whole starting amount before you solve. Every number in the stem should appear once in that equation — if one is missing, the answer is one of the traps.",
  skills: ["solving-equations"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A finishing line's daily log lists the number of fabric defects recorded on eight consecutive shifts as $38$, $41$, $43$, $44$, $46$, $47$, $49$, and $152$. For this list of eight counts, the mean is greater than the median. By how much is it greater?",
  choices: [
    // distractor: leaves 152 out of the mean, comparing 308/7 = 44 with the median 45
    { id: "A", text: "$1$" },
    { id: "B", text: "$12.5$" },
    // distractor: uses the fourth value, 44, as the median instead of averaging the two middle values: 57.5 - 44 = 13.5
    { id: "C", text: "$13.5$" },
    // distractor: compares the outlier with the median instead of the mean: 152 - 45 = 107
    { id: "D", text: "$107$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Outlier Effect**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The eight values total $460$, so the mean is $57.5$; the two middle values are $44$ and $46$, so the median is $45$. The gap is $57.5 - 45 = 12.5$.\n\n**The Full Solution:**\nStep 1: Add the counts: $38 + 41 + 43 + 44 + 46 + 47 + 49 + 152 = 460$. With $8$ values, the mean is $\\frac{460}{8} = 57.5$.\nStep 2: The list is already in increasing order and has an even number of values, so the median is the average of the fourth and fifth values: $\\frac{44 + 46}{2} = 45$.\nStep 3: The mean exceeds the median by $57.5 - 45 = 12.5$. Check: seven of the eight counts sit below $57.5$, which is exactly what a single large outlier does to a mean. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): computes the mean of only the seven ordinary counts, $\\frac{308}{7} = 44$, and compares it with $45$. The question asks about the mean of all eight values.\n* Choice C ($13.5$): treats the fourth value, $44$, as the median. With an even count you must average the two middle values.\n* Choice D ($107$): measures how far the outlier sits above the median, $152 - 45$, rather than comparing the two measures of center.\n\n**Test Day Takeaway:** One extreme value drags the mean toward it and leaves the median almost untouched. When a list has an obvious outlier, compute the median from position and the mean from the total — never estimate either.",
  skills: ["calculate-mean", "find-median"]
},
{
  id: 5,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A pump empties an intravenous bag at a constant rate. The bag holds $840$ milliliters $20$ minutes after the infusion starts and $600$ milliliters $40$ minutes after that. How many minutes after the infusion starts does the bag hold exactly $300$ milliliters?",
  correctAnswer: "110",
  explanation: "**SAT Pattern: Line from Two Points**\n\n**The correct answer is $110$.**\n\n**The Fast Way (~30s):** The two readings are $(20, 840)$ and $(60, 600)$, a rate of $-6$ milliliters per minute. Dropping from $840$ to $300$ takes $\\frac{540}{6} = 90$ more minutes, so $t = 20 + 90 = 110$.\n\n**The Full Solution:**\nStep 1: Put both readings on the same clock. The second reading is $40$ minutes after the first, so it happens at $20 + 40 = 60$ minutes: the points are $(20, 840)$ and $(60, 600)$.\nStep 2: The rate is the slope, $\\frac{600 - 840}{60 - 20} = \\frac{-240}{40} = -6$ milliliters per minute, so $V = 840 - 6(t - 20)$.\nStep 3: Set $V = 300$: $840 - 6(t - 20) = 300$, so $6(t - 20) = 540$ and $t - 20 = 90$, giving $t = 110$. Check: $840 - 6(90) = 300$ milliliters. ✓\n\n**Common Mistakes:**\n* $65$: reads $40$ minutes after that as $40$ minutes after the start, which turns the rate into $\\frac{600 - 840}{40 - 20} = -12$ milliliters per minute and gives $t = 65$.\n* $90$: stops at the elapsed time measured from the first reading. The question counts from the moment the infusion starts, which is $20$ minutes earlier.\n* $160$: finds when the bag is empty rather than when it holds $300$ milliliters: $\\frac{600}{6} = 100$ more minutes after $t = 60$.\n\n**Test Day Takeaway:** When a second measurement is described as so many minutes after that, convert it to the same time origin before you compute a slope. Mislabeling one coordinate changes the rate and every answer built on it.",
  skills: ["linear-functions", "slope", "coordinate-geometry"]
},
{
  id: 6,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The table gives the volume of fuel, in liters, remaining in a tour boat's tank after $x$ minutes of cruising, where the volume is a linear function $L$ of $x$. For what value of $t$ is $L(t)$ equal to half of $L(4)$?",
  diagram: { type: "dataTable", params: { headers: ["Minutes cruising, x", "Fuel remaining, L(x) (liters)"], rows: [["5", "210"], ["12", "168"], ["25", "90"]] } },
  correctAnswer: "22",
  explanation: "**SAT Pattern: Function Evaluation**\n\n**The correct answer is $22$.**\n\n**The Fast Way (~40s):** From $(5, 210)$ to $(12, 168)$ the volume falls $6$ liters per minute, so $L(x) = 240 - 6x$. Then $L(4) = 216$, half of which is $108$, and $240 - 6t = 108$ gives $t = 22$.\n\n**The Full Solution:**\nStep 1: Find the rate. Between the first two rows the fuel drops $210 - 168 = 42$ liters over $12 - 5 = 7$ minutes, a rate of $-6$ liters per minute. The third row confirms it: $168 - 90 = 78$ over $25 - 12 = 13$ minutes is also $-6$.\nStep 2: Build the rule. Using $(5, 210)$: $L(x) = 210 - 6(x - 5) = 240 - 6x$. So $L(4) = 240 - 24 = 216$ liters, and half of that is $108$ liters.\nStep 3: Solve $240 - 6t = 108$: $6t = 132$, so $t = 22$. Check: $L(22) = 240 - 132 = 108$, exactly half of $L(4) = 216$. ✓\n\n**Common Mistakes:**\n* $108$: reports the fuel volume the question describes instead of the time $t$ at which the tank holds it.\n* $18$: divides $108$ by the rate of $6$ liters per minute and forgets the $240$-liter starting volume, solving $6t = 108$ instead of $240 - 6t = 108$.\n* $2$: halves the input, answering $\\frac{4}{2}$, rather than halving the output $L(4)$.\n\n**Test Day Takeaway:** Half of $L(4)$ means half of the OUTPUT. Turn the table into a rule first, evaluate at the named input, and only then apply the words half, twice, or three times to that value.",
  skills: ["function-evaluation"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A linear model predicts the number of hotel room-nights booked in a resort town during a week, $\\hat{y}$, from the number of inbound flights that week, $x$, by $\\hat{y} = 30x + 210$. In one week the observed number of room-nights was $2{,}460$, which was $150$ greater than the number the model predicts. How many inbound flights were there that week?",
  choices: [
    { id: "A", text: "$70$" },
    // distractor: ignores the 150-room-night gap and solves 30x + 210 = 2460
    { id: "B", text: "$75$" },
    // distractor: subtracts the gap but drops the constant 210, solving 30x = 2310
    { id: "C", text: "$77$" },
    // distractor: adds the gap to the observed value instead of subtracting it, solving 30x + 210 = 2610
    { id: "D", text: "$80$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Residual**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The model predicted $2460 - 150 = 2310$ room-nights, so $30x + 210 = 2310$ and $x = 70$.\n\n**The Full Solution:**\nStep 1: The difference between an observed value and the value the model predicts is the residual. Here that difference is $+150$, so observed $=$ predicted $+ \\, 150$.\nStep 2: Solve for the predicted value: $2460 = \\hat{y} + 150$, so $\\hat{y} = 2310$ room-nights.\nStep 3: Put the predicted value into the model: $30x + 210 = 2310$, so $30x = 2100$ and $x = 70$ inbound flights. Check: $30(70) + 210 = 2310$, and $2460 - 2310 = 150$ as stated. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($75$): substitutes the OBSERVED value into the model, solving $30x + 210 = 2460$, which ignores the $150$-room-night gap the stem gives you.\n* Choice C ($77$): subtracts the gap correctly but then drops the constant $210$, solving $30x = 2310$.\n* Choice D ($80$): adds the $150$ to the observed value instead of subtracting it, solving $30x + 210 = 2610$ and moving in the wrong direction.\n\n**Test Day Takeaway:** Residual $=$ observed $-$ predicted. When the stem tells you the observed value is a stated amount ABOVE the prediction, subtract that amount first, then feed the prediction into the model — the model equation never takes the observed value directly.",
  skills: ["calculate-mean", "slope-intercept-form"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A drug's blood concentration, in milligrams per liter, is modeled by $-2t^{2} + 16t$ for $0 \\le t \\le 8$, where $t$ is the number of hours since the dose was given. What is the greatest integer concentration level that the model reaches at two different times?",
  choices: [
    // distractor: reports the hour at which the maximum occurs, t = 4, instead of a concentration level
    { id: "A", text: "$4$" },
    { id: "B", text: "$31$" },
    // distractor: gives the maximum concentration 32, which the model reaches at exactly one time, not two
    { id: "C", text: "$32$" },
    // distractor: drops the leading coefficient -2 from 4ac, solving 256 - 4k > 0 to get k < 64
    { id: "D", text: "$63$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Setting $-2t^{2} + 16t = k$ gives $2t^{2} - 16t + k = 0$, whose discriminant $256 - 8k$ must be positive, so $k < 32$ and the greatest integer is $31$.\n\n**The Full Solution:**\nStep 1: A level $k$ is reached at two different times exactly when $-2t^{2} + 16t = k$ has two distinct real solutions. Rewrite it in standard form: $2t^{2} - 16t + k = 0$.\nStep 2: Two distinct real solutions require a strictly positive discriminant: $b^{2} - 4ac = (-16)^{2} - 4(2)(k) = 256 - 8k > 0$, so $8k < 256$ and $k < 32$.\nStep 3: The greatest integer less than $32$ is $31$. Check: at $k = 31$ the discriminant is $256 - 248 = 8 > 0$, and the two solutions $t = \\frac{16 \\pm \\sqrt{8}}{4}$ are about $3.3$ and $4.7$ hours, both inside $0 \\le t \\le 8$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): this is the time at which the concentration peaks, not a concentration. The question asks for a level on the vertical axis.\n* Choice C ($32$): the peak concentration. At $k = 32$ the discriminant is $0$, so the model reaches that level at exactly one time — one time, not two.\n* Choice D ($63$): computes the discriminant as $256 - 4k$, forgetting the leading coefficient $2$ inside $4ac$, and lands on $k < 64$.\n\n**Test Day Takeaway:** Two solutions means discriminant $> 0$, not $\\ge 0$; the equality case is the single-touch value the SAT reserves for a distractor. Convert the strict inequality to a bound, then take the integer just inside it.",
  skills: ["discriminant-analysis"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Two weaving schedules are described by $4x - ky = 18$ and $6x - 15y = 30$, where $x$ is the number of hours on loom A, $y$ is the number of hours on loom B, and $k$ is a constant. No pair $(x, y)$ satisfies both equations. What is the value of $k$?",
  choices: [
    { id: "A", text: "$10$" },
    // distractor: copies the coefficient of y from the second equation without scaling it by 4/6
    { id: "B", text: "$15$" },
    // distractor: inverts the scale factor, computing 15 x 6/4 = 22.5
    { id: "C", text: "$22.5$" },
    // distractor: scales by the ratio of the constant terms, 15 x 30/18 = 25
    { id: "D", text: "$25$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: No-Solution Condition**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** No solution means the lines are parallel, so the $x$- and $y$-coefficients must scale together: $\\frac{4}{6} = \\frac{k}{15}$, giving $k = 10$.\n\n**The Full Solution:**\nStep 1: A system of two linear equations has no solution when the two lines are parallel and distinct — the coefficients of $x$ and of $y$ are in the same ratio, but the constants are not.\nStep 2: Match the coefficients: $\\frac{4}{6} = \\frac{k}{15}$. Cross-multiplying gives $6k = 60$, so $k = 10$.\nStep 3: Confirm the lines are distinct rather than identical. With $k = 10$ the first equation halves to $2x - 5y = 9$ and the second thirds to $2x - 5y = 10$. Same left side, different right side, so no pair $(x, y)$ works. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($15$): copies the $-15$ from the second equation, as if parallel lines needed identical coefficients rather than proportional ones.\n* Choice C ($22.5$): uses the scale factor upside down, $15 \\cdot \\frac{6}{4}$, instead of $15 \\cdot \\frac{4}{6}$.\n* Choice D ($25$): scales by the ratio of the constants, $15 \\cdot \\frac{30}{18}$. Matching the constants is what produces infinitely many solutions, which is the opposite of what the stem describes.\n\n**Test Day Takeaway:** Parallel means the coefficient ratios agree and the constant ratio does not. Set up the coefficient proportion first, then verify the constants break it — the value that makes the constants match too is always one of the choices.",
  skills: ["system-solution-types"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A quality-control formula sets $\\frac{x^{2} - 9}{x - 3}$ equal to a constant $k$. Exactly one value of $k$ makes it impossible for any real number $x$ to satisfy that equation. What is that value of $k$?",
  choices: [
    // distractor: takes the negative solution of x^2 - 9 = 0 instead of finding k
    { id: "A", text: "$-3$" },
    // distractor: factors x^2 - 9 as (x - 3)^2, cancels to x - 3, and evaluates it at x = 3 to get 0
    { id: "B", text: "$0$" },
    // distractor: reports the excluded value of x rather than the value of k
    { id: "C", text: "$3$" },
    { id: "D", text: "$6$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The expression simplifies to $x + 3$ for every $x \\neq 3$, so it takes every value except the one at $x = 3$, namely $6$.\n\n**The Full Solution:**\nStep 1: Factor the numerator: $x^{2} - 9 = (x + 3)(x - 3)$. Cancelling the common factor gives $\\frac{(x + 3)(x - 3)}{x - 3} = x + 3$, valid for every $x$ except $x = 3$, where the original expression is undefined.\nStep 2: Solve $x + 3 = k$: the only candidate is $x = k - 3$.\nStep 3: That candidate fails only when it lands on the excluded value: $k - 3 = 3$, so $k = 6$. For every other $k$ the equation has the solution $x = k - 3$. Check: with $k = 6$, $x + 3 = 6$ forces $x = 3$, which makes the denominator $0$ — no real $x$ works. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): solves $x^{2} - 9 = 0$ and reports the negative root. That is a value of $x$, and it makes the whole expression $0$, not undefined.\n* Choice B ($0$): factors $x^{2} - 9$ as $(x - 3)^{2}$, which is wrong, and then evaluates the cancelled expression $x - 3$ at $x = 3$.\n* Choice C ($3$): reports the excluded $x$-value. The question asks for the constant $k$ that this exclusion kills, which is the value the simplified expression would take there.\n\n**Test Day Takeaway:** Cancel the common factor, note which $x$ is banned, and then ask what value the SIMPLIFIED expression would have taken at that banned $x$. That value is the one constant the equation can never equal.",
  skills: ["rational-expressions"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The graph shows the length $y$, in meters, of fabric remaining on a bolt after $x$ garment panels have been cut from it. A second bolt starts with $60$ meters and loses fabric at the same rate per panel. Which equation gives the length $y$ remaining on the second bolt after $x$ panels?",
  diagram: { type: "linearGraph", params: { slope: -4, yIntercept: 24, xRange: [0, 6], yRange: [0, 24], xTickInterval: 1, yTickInterval: 4, gridInterval: 2, showPoints: [[0, 24], [6, 0]] } },
  choices: [
    // distractor: uses the graph's x-intercept, 6 panels, as the rate instead of the 4 meters lost per panel
    { id: "A", text: "$y = -6x + 60$" },
    // distractor: keeps the graphed bolt's starting length of 24 meters instead of the second bolt's 60
    { id: "B", text: "$y = -4x + 24$" },
    { id: "C", text: "$y = -4x + 60$" },
    // distractor: drops the negative sign, describing fabric that grows as panels are cut
    { id: "D", text: "$y = 4x + 60$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The graph falls from $24$ meters at $x = 0$ to $0$ at $x = 6$, a rate of $-4$ meters per panel; keep that slope and swap the intercept to $60$.\n\n**The Full Solution:**\nStep 1: Read the slope from the graph. The line passes through $(0, 24)$ and $(6, 0)$, so the slope is $\\frac{0 - 24}{6 - 0} = -4$ meters of fabric per panel cut.\nStep 2: In $y = mx + b$, the slope $m$ is the rate per panel and the intercept $b$ is the length the bolt starts with. The second bolt is cut at the same rate, so $m = -4$ again, but it starts with $60$ meters, so $b = 60$.\nStep 3: The equation is $y = -4x + 60$. Check: at $x = 0$ the bolt holds $60$ meters, and after $15$ panels $y = -4(15) + 60 = 0$, which is $2.5$ times the $6$ panels the shorter bolt supplied — exactly what $2.5$ times the length should give. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -6x + 60$): takes $6$, the number of panels the graphed bolt supplied, as the rate. That $6$ is an $x$-intercept, not a slope.\n* Choice B ($y = -4x + 24$): reads the correct slope but copies the graphed bolt's starting length of $24$ meters instead of the $60$ meters the question specifies.\n* Choice D ($y = 4x + 60$): drops the negative sign, giving a bolt that gains fabric as panels are cut.\n\n**Test Day Takeaway:** A rate read from a graph travels to a new scenario; the intercept usually does not. Change only the quantity the new sentence changes, and check the sign against whether the quantity is growing or shrinking.",
  skills: ["slope-intercept-form"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A clinical study assigned $240$ participants to one of two doses of a medication and recorded whether each participant's symptoms improved. Of the participants who received Dose B, what fraction had symptoms that improved?",
  diagram: { type: "twoWayTable", params: { headers: ["", "Improved", "Did not improve", "Total"], rows: [["Dose A", "84", "36", "120"], ["Dose B", "66", "54", "120"], ["Total", "150", "90", "240"]] } },
  choices: [
    // distractor: divides by all 240 participants instead of the 120 who received Dose B: 66/240
    { id: "A", text: "$\\frac{11}{40}$" },
    // distractor: divides by the 150 participants who improved, reversing the condition: 66/150
    { id: "B", text: "$\\frac{11}{25}$" },
    // distractor: uses the 54 Dose B participants whose symptoms did not improve: 54/120
    { id: "C", text: "$\\frac{9}{20}$" },
    { id: "D", text: "$\\frac{11}{20}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The condition is Dose B, so the denominator is that row's total, $120$: $\\frac{66}{120} = \\frac{11}{20}$.\n\n**The Full Solution:**\nStep 1: Identify the group the question restricts you to. Of the participants who received Dose B names the Dose B row, whose total is $120$ participants.\nStep 2: Inside that row, count the participants the question asks about — those who improved: $66$.\nStep 3: The fraction is $\\frac{66}{120} = \\frac{11}{20}$. Check: the other $54$ Dose B participants give $\\frac{54}{120} = \\frac{9}{20}$, and $\\frac{11}{20} + \\frac{9}{20} = 1$, as the two outcomes must. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{11}{40}$): divides by the study total of $240$, which answers what fraction of ALL participants received Dose B and improved.\n* Choice B ($\\frac{11}{25}$): divides by the $150$ participants who improved. That reverses the condition and answers what fraction of those who improved had Dose B.\n* Choice C ($\\frac{9}{20}$): stays in the right row but counts the $54$ participants whose symptoms did not improve.\n\n**Test Day Takeaway:** In a two-way table the words after of set the denominator. Circle that row or column total before you look for the numerator, and the reversed-condition trap disappears.",
  skills: ["conditional-probability", "two-way-table"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A funicular railway climbs at a constant rate. A carriage is $86$ meters above the base station $30$ seconds after departure and $284$ meters above the base station $2.5$ minutes after departure. What is the carriage's rate of climb, in meters per minute?",
  choices: [
    // distractor: leaves both times in seconds, giving 198/120 = 1.65 meters per second
    { id: "A", text: "$1.65$" },
    { id: "B", text: "$99$" },
    // distractor: divides the later height by the later time, 284/2.5, ignoring the first reading
    { id: "C", text: "$113.6$" },
    // distractor: divides the later height rather than the change in height by the elapsed 2 minutes
    { id: "D", text: "$142$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** In minutes the readings are $(0.5, 86)$ and $(2.5, 284)$, so the rate is $\\frac{284 - 86}{2.5 - 0.5} = \\frac{198}{2} = 99$.\n\n**The Full Solution:**\nStep 1: Put both times in the unit the answer asks for. $30$ seconds is $0.5$ minute, so the two readings are the points $(0.5, 86)$ and $(2.5, 284)$.\nStep 2: A constant rate of climb is the slope between those points: $\\frac{\\text{change in height}}{\\text{change in time}} = \\frac{284 - 86}{2.5 - 0.5}$.\nStep 3: That is $\\frac{198}{2} = 99$ meters per minute. Check: starting from $86$ meters at $0.5$ minute, two more minutes at $99$ meters per minute adds $198$ meters, reaching $284$ meters. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.65$): keeps both times in seconds, computing $\\frac{198}{120}$. That is the rate in meters per SECOND, and the question asks for meters per minute.\n* Choice C ($113.6$): divides the later height by the later time, $\\frac{284}{2.5}$, treating the carriage as if it had started at the base station at time $0$.\n* Choice D ($142$): subtracts the times correctly but forgets to subtract the heights, computing $\\frac{284}{2}$.\n\n**Test Day Takeaway:** Convert every time to the unit named in the question BEFORE you subtract, and make sure both subtractions actually happen — a slope needs a change on top and a change on the bottom.",
  skills: ["slope-from-points"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A yarn's stiffness index is computed as $\\frac{\\sqrt[3]{d^{7}}}{d^{k}}$, where $d > 0$ is the denier of the yarn and $k$ is a constant. For every positive value of $d$, this index is equal to $\\sqrt{d^{3}}$. What is the value of $k$?",
  correctAnswer: "5/6",
  explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $\\frac{5}{6}$.**\n\n**The Fast Way (~35s):** Write both sides as powers of $d$: $d^{\\frac{7}{3} - k} = d^{\\frac{3}{2}}$, so $k = \\frac{7}{3} - \\frac{3}{2} = \\frac{5}{6}$.\n\n**The Full Solution:**\nStep 1: Convert each radical to a fractional exponent. A cube root is the power $\\frac{1}{3}$, so $\\sqrt[3]{d^{7}} = d^{\\frac{7}{3}}$; a square root is the power $\\frac{1}{2}$, so $\\sqrt{d^{3}} = d^{\\frac{3}{2}}$.\nStep 2: Dividing powers of the same base subtracts exponents: $\\frac{d^{\\frac{7}{3}}}{d^{k}} = d^{\\frac{7}{3} - k}$. Since the two expressions agree for every $d > 0$, the exponents must be equal: $\\frac{7}{3} - k = \\frac{3}{2}$.\nStep 3: Solve with a common denominator of $6$: $k = \\frac{7}{3} - \\frac{3}{2} = \\frac{14}{6} - \\frac{9}{6} = \\frac{5}{6}$. Check: $\\frac{7}{3} - \\frac{5}{6} = \\frac{14 - 5}{6} = \\frac{9}{6} = \\frac{3}{2}$. ✓\n\n**Common Mistakes:**\n* $\\frac{23}{6}$: adds the exponents instead of subtracting, computing $\\frac{7}{3} + \\frac{3}{2}$. The $d^{k}$ sits in the denominator, so its exponent is subtracted.\n* $-\\frac{5}{6}$: subtracts in the wrong order, computing $\\frac{3}{2} - \\frac{7}{3}$.\n* $\\frac{5}{3}$: reads $\\sqrt{d^{3}}$ as $d^{\\frac{2}{3}}$, flipping the index and the power, and then computes $\\frac{7}{3} - \\frac{2}{3}$.\n\n**Test Day Takeaway:** Turn every radical into a fractional exponent — index on the bottom, power on top — before you do anything else. Once both sides are a single power of the same base, the whole problem is one subtraction of fractions.",
  skills: ["exponent-rules", "radical-expressions"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "At a campground, the daily profit in dollars from renting $x$ tent sites is $-3x^{2} + 90x - c$, where $c$ is a positive constant equal to the daily fixed cost. Exactly one number of rented sites makes the profit $0$ dollars. What is the value of $c$?",
  correctAnswer: "675",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is $675$.**\n\n**The Fast Way (~40s):** One and only one solution means the discriminant is zero: $90^{2} - 4(3)(c) = 0$, so $12c = 8100$ and $c = 675$.\n\n**The Full Solution:**\nStep 1: Set the profit expression equal to $0$ and write it in standard form: $-3x^{2} + 90x - c = 0$, or equivalently $3x^{2} - 90x + c = 0$, with $a = 3$, $b = -90$, and $C = c$.\nStep 2: A quadratic equation has exactly one real solution when its discriminant is zero: $b^{2} - 4aC = (-90)^{2} - 4(3)(c) = 8100 - 12c = 0$.\nStep 3: Solve: $12c = 8100$, so $c = 675$. Check: $3x^{2} - 90x + 675 = 3(x^{2} - 30x + 225) = 3(x - 15)^{2}$, which is zero only at $x = 15$ — exactly one number of rented sites. ✓\n\n**Common Mistakes:**\n* $2025$: drops the leading coefficient inside $4aC$, solving $8100 - 4c = 0$ instead of $8100 - 12c = 0$.\n* $8100$: stops after computing $b^{2}$ and never divides by $4a$.\n* $15$: reports the number of tent sites at which the single break-even occurs rather than the fixed cost $c$ the question asks for.\n\n**Test Day Takeaway:** Exactly one solution is a discriminant statement, not a plug-in. Put the quadratic in standard form first so you can read $a$, $b$, and the constant correctly — the leading coefficient is the piece students drop most often.",
  skills: ["discriminant-analysis"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "For each fabric grade, the loom tension model $T(x) = ax^{2} + bx + c$ uses the constants $a$, $b$, and $c$ given in the table, where $x$ is the loom speed in meters per minute. For Grade 2, the equation $T(x) = 0$ has two solutions. What is the sum of those two solutions?",
  diagram: { type: "dataTable", params: { headers: ["Fabric grade", "a", "b", "c"], rows: [["Grade 1", "2", "-18", "36"], ["Grade 2", "3", "-24", "36"], ["Grade 3", "5", "-35", "60"]] } },
  correctAnswer: "8",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~20s):** For $ax^{2} + bx + c = 0$ the solutions sum to $-\\frac{b}{a}$. Grade 2 gives $-\\frac{-24}{3} = 8$.\n\n**The Full Solution:**\nStep 1: Read the Grade 2 row: $a = 3$, $b = -24$, $c = 36$, so the equation is $3x^{2} - 24x + 36 = 0$.\nStep 2: Write the quadratic as $a(x - r_{1})(x - r_{2}) = 0$ and expand: the coefficient of $x$ is $-a(r_{1} + r_{2})$, so $r_{1} + r_{2} = -\\frac{b}{a} = -\\frac{-24}{3} = 8$.\nStep 3: Confirm by factoring: $3x^{2} - 24x + 36 = 3(x^{2} - 8x + 12) = 3(x - 2)(x - 6)$, whose solutions are $2$ and $6$. Their sum is $8$. ✓\n\n**Common Mistakes:**\n* $12$: computes $\\frac{c}{a} = \\frac{36}{3}$, which is the PRODUCT of the two solutions, not the sum.\n* $-8$: uses $\\frac{b}{a}$ and forgets the minus sign in $-\\frac{b}{a}$.\n* $9$: reads the Grade 1 row instead of Grade 2, giving $-\\frac{-18}{2}$.\n\n**Test Day Takeaway:** Sum of solutions is $-\\frac{b}{a}$ and product is $\\frac{c}{a}$ — no factoring, no quadratic formula. The two traps are dropping the leading minus sign and reaching for the wrong one of the pair.",
  skills: ["quadratic-factoring"]
},
{
  id: 17,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A dye bath of $30$ liters contains $k$ grams of dye per liter. After $12$ liters of plain water is stirred in and $6$ liters of the diluted bath is then drained, $180$ grams of dye remain. What is the value of $k$?",
  correctAnswer: "7",
  explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~40s):** Draining $6$ of the $42$ diluted liters removes $\\frac{1}{7}$ of the dye, so $\\frac{6}{7}(30k) = 180$, giving $30k = 210$ and $k = 7$.\n\n**The Full Solution:**\nStep 1: Translate the starting condition. A bath of $30$ liters at $k$ grams per liter holds $30k$ grams of dye. Adding plain water changes the volume but not the amount of dye, so after stirring there are still $30k$ grams — now spread through $30 + 12 = 42$ liters.\nStep 2: Translate the draining. Removing $6$ of those $42$ liters removes $\\frac{6}{42} = \\frac{1}{7}$ of the dye, so $\\frac{6}{7}$ of it stays: $\\frac{6}{7}(30k) = 180$.\nStep 3: Solve: $30k = 180 \\cdot \\frac{7}{6} = 210$, so $k = 7$. Check: $30(7) = 210$ grams in $42$ liters is $5$ grams per liter, and draining $6$ liters removes $30$ grams, leaving $210 - 30 = 180$ grams. ✓\n\n**Common Mistakes:**\n* $5$: divides the $180$ grams left by the final $36$ liters. That is the concentration AFTER dilution, not the original $k$.\n* $6$: ignores the draining step and solves $30k = 180$.\n* $7.5$: subtracts the drained $6$ liters from the original $30$ instead of from the diluted $42$, computing $\\frac{180}{24}$.\n\n**Test Day Takeaway:** Track the AMOUNT of the substance, not its concentration. Adding solvent leaves the amount unchanged; removing mixture takes away the same fraction of the amount as of the volume.",
  skills: ["word-problem-to-equation"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A resort's site plan places its north gate at $(-6, 11)$ and its south gate at $(14, -3)$. An information kiosk is planned for the point halfway between the two gates. Which ordered pair locates the kiosk?",
  choices: [
    // distractor: halves the differences of the coordinates instead of their sums: ((-6-14)/2, (11+3)/2)
    { id: "A", text: "$(-10, 7)$" },
    { id: "B", text: "$(4, 4)$" },
    // distractor: adds the coordinates but forgets to divide each sum by 2
    { id: "C", text: "$(8, 8)$" },
    // distractor: subtracts the coordinates, giving the change from one gate to the other rather than a location
    { id: "D", text: "$(20, -14)$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Average each coordinate: $\\frac{-6 + 14}{2} = 4$ and $\\frac{11 + (-3)}{2} = 4$, so the kiosk is at $(4, 4)$.\n\n**The Full Solution:**\nStep 1: The midpoint of the segment joining $(x_{1}, y_{1})$ and $(x_{2}, y_{2})$ is $\\left(\\frac{x_{1} + x_{2}}{2}, \\frac{y_{1} + y_{2}}{2}\\right)$ — the average of the $x$-coordinates paired with the average of the $y$-coordinates.\nStep 2: Average the $x$-coordinates: $\\frac{-6 + 14}{2} = \\frac{8}{2} = 4$.\nStep 3: Average the $y$-coordinates: $\\frac{11 + (-3)}{2} = \\frac{8}{2} = 4$, so the kiosk sits at $(4, 4)$. Check: from $(-6, 11)$ to $(4, 4)$ is a move of $10$ right and $7$ down, and from $(4, 4)$ to $(14, -3)$ is the same move. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-10, 7)$): halves the DIFFERENCES rather than the sums. Half a difference measures how far apart the gates are, not where the point between them is.\n* Choice C ($(8, 8)$): adds the coordinates correctly but never divides by $2$, landing outside the segment entirely.\n* Choice D ($(20, -14)$): subtracts one point from the other, which describes the trip from one gate to the other rather than a location on the map.\n\n**Test Day Takeaway:** A midpoint is an average, so the answer must land BETWEEN the two given points in both coordinates. Glance at your answer against the endpoints before you bubble — three of the four choices here fail that check instantly.",
  skills: ["coordinate-geometry"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A textile lab logged six tensile-strength readings, in newtons, for yarn drawn from one spool. Four of the readings were $34$, $41$, $52$, and $47$; the remaining two were $x$ and $2x$. The mean of the six readings is $45$ newtons. What is the greatest of the six readings, in newtons?",
  choices: [
    // distractor: solves for x correctly but reports x rather than the larger reading 2x
    { id: "A", text: "$32$" },
    // distractor: names the largest of the four numbered readings without solving for x at all
    { id: "B", text: "$52$" },
    { id: "C", text: "$64$" },
    // distractor: reports 3x = 96, the combined value of the two unknown readings, not a single reading
    { id: "D", text: "$96$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Mean from List**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The six readings must total $6(45) = 270$. The four numbered ones total $174$, so $3x = 96$, $x = 32$, and the largest reading is $2x = 64$.\n\n**The Full Solution:**\nStep 1: Turn the mean into a total. Six readings with a mean of $45$ newtons sum to $6(45) = 270$ newtons.\nStep 2: Add the four known readings: $34 + 41 + 52 + 47 = 174$. The two unknown readings, $x$ and $2x$, must make up the rest: $174 + x + 2x = 270$, so $3x = 96$ and $x = 32$.\nStep 3: The six readings are $34$, $41$, $52$, $47$, $32$, and $64$, so the greatest is $64$ newtons. Check: their sum is $270$, and $\\frac{270}{6} = 45$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): solves for $x$ and stops. The list contains $2x$ as well, and $64$ is larger than every numbered reading.\n* Choice B ($52$): picks the largest value printed in the stem without using the mean at all, assuming the unknown readings are smaller.\n* Choice D ($96$): reports $3x$, the combined value of the two unknown readings, rather than the single largest reading.\n\n**Test Day Takeaway:** Convert a mean into a total before anything else — mean times count is the one line that makes a list with unknowns solvable. Then reread what the question wants: the variable, an expression in it, or the largest value.",
  skills: ["calculate-mean"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "On a cutting table, a triangular gusset is marked out with interior angle measures $(2k)^{\\circ}$, $(3k)^{\\circ}$, and $(5k)^{\\circ}$ for some positive constant $k$. In degrees, how large is the gusset's largest interior angle?",
  correctAnswer: "90",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $90$.**\n\n**The Fast Way (~20s):** The three measures add to $180$: $2k + 3k + 5k = 10k = 180$, so $k = 18$ and the largest angle is $5(18) = 90$ degrees.\n\n**The Full Solution:**\nStep 1: The interior angles of any triangle sum to $180^{\\circ}$, so $(2k) + (3k) + (5k) = 180$.\nStep 2: Combine like terms and solve for the constant: $10k = 180$, so $k = 18$.\nStep 3: The largest measure carries the largest coefficient, $5k$, so the largest angle is $5(18) = 90$ degrees. Check: the three angles are $36^{\\circ}$, $54^{\\circ}$, and $90^{\\circ}$, which sum to $180^{\\circ}$. ✓\n\n**Common Mistakes:**\n* $18$: stops at the value of $k$. The question asks for an angle measure, and $k$ is only the building block.\n* $36$: evaluates $2k$, the SMALLEST angle, instead of the largest.\n* $54$: evaluates $3k$, the middle angle.\n\n**Test Day Takeaway:** When angle measures are multiples of one constant, solve for the constant in a single line, then reread which angle the question names. The value of $k$ itself is almost never the answer.",
  skills: ["triangle-angle-sum"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A cave tour operator sells adult and child tickets at fixed prices. The table gives the number of tickets of each type and the total cost for two group bookings. What is the total cost, in dollars, of $5$ adult tickets and $4$ child tickets?",
  diagram: { type: "dataTable", params: { headers: ["Booking", "Adult tickets", "Child tickets", "Total cost (dollars)"], rows: [["Group 1", "14", "9", "915"], ["Group 2", "8", "15", "789"]] } },
  choices: [
    // distractor: prices only the 5 adult tickets, 5 x 48, and never adds the 4 child tickets
    { id: "A", text: "$240$" },
    // distractor: swaps the two prices, computing 5 x 27 + 4 x 48 = 327
    { id: "B", text: "$327$" },
    { id: "C", text: "$348$" },
    // distractor: multiplies all 9 tickets by the combined price 48 + 27 = 75
    { id: "D", text: "$675$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** The bookings give $14a + 9c = 915$ and $8a + 15c = 789$; solving gives $a = 48$ and $c = 27$, so $5(48) + 4(27) = 348$.\n\n**The Full Solution:**\nStep 1: Let $a$ be the price of an adult ticket and $c$ the price of a child ticket, both in dollars. Each row of the table is one equation: $14a + 9c = 915$ and $8a + 15c = 789$.\nStep 2: Eliminate $c$. Multiply the first equation by $5$ and the second by $3$: $70a + 45c = 4575$ and $24a + 45c = 2367$. Subtracting gives $46a = 2208$, so $a = 48$. Substituting into $14(48) + 9c = 915$ gives $9c = 243$, so $c = 27$.\nStep 3: Price the requested combination: $5(48) + 4(27) = 240 + 108 = 348$ dollars. Check the prices against the second booking: $8(48) + 15(27) = 384 + 405 = 789$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($240$): stops after pricing the $5$ adult tickets and never adds the $4$ child tickets.\n* Choice B ($327$): swaps the two prices, computing $5(27) + 4(48)$. Check which variable each column of the table belongs to before substituting.\n* Choice D ($675$): treats all $9$ tickets as costing the same $48 + 27 = 75$ dollars, which double-counts every ticket.\n\n**Test Day Takeaway:** Define both variables in writing, turn each row of the table into one equation, then reread the final sentence. The system is rarely the last step — the question usually asks you to price a NEW combination.",
  skills: ["word-problem-to-equation", "setting-up-systems"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A mill's annual output of woven fabric, in meters, is modeled by $M(t) = 9{,}500(1.44)^{t}$, where $t$ is the number of years since 2020. The same output can be modeled by $M(t) = 9{,}500\\left(1 + \\frac{k}{100}\\right)^{2t}$, where $k$ is a constant. What is the value of $k$?",
  correctAnswer: "20",
  explanation: "**SAT Pattern: Compound Interest**\n\n**The correct answer is $20$.**\n\n**The Fast Way (~35s):** The two models agree when $\\left(1 + \\frac{k}{100}\\right)^{2} = 1.44$, and $\\sqrt{1.44} = 1.2$, so $\\frac{k}{100} = 0.2$ and $k = 20$.\n\n**The Full Solution:**\nStep 1: Both models start from the same $9{,}500$ meters, so the growth factors must match for every $t$: $\\left(1 + \\frac{k}{100}\\right)^{2t} = (1.44)^{t}$.\nStep 2: Rewrite the left side as $\\left[\\left(1 + \\frac{k}{100}\\right)^{2}\\right]^{t}$. Two exponential expressions with the same exponent $t$ are equal for all $t$ only when their bases are equal, so $\\left(1 + \\frac{k}{100}\\right)^{2} = 1.44$.\nStep 3: Take the positive square root: $1 + \\frac{k}{100} = 1.2$, so $\\frac{k}{100} = 0.2$ and $k = 20$. Check: $(1.2)^{2} = 1.44$, so a $20\\%$ increase applied twice a year reproduces the $44\\%$ annual growth. ✓\n\n**Common Mistakes:**\n* $44$: reads the annual growth rate of $44\\%$ straight off $1.44$ and ignores that the second model compounds twice as often.\n* $22$: halves the annual rate of $44\\%$. Growth rates compound, so the half-period rate comes from a square root, not from dividing by $2$.\n* $120$: reaches $1 + \\frac{k}{100} = 1.2$ and then reports the base $1.2$ as $120$ instead of solving for $k$.\n\n**Test Day Takeaway:** When the same model is rewritten with a different exponent, set the bases equal after matching the exponents: $b^{2t}$ versus $B^{t}$ means $b^{2} = B$. Halving a percent is never the same as halving the compounding period.",
  skills: ["exponential-functions"]
}
      ]
    }
  ]
};

export default practiceTest3;
