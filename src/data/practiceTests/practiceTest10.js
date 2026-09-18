// Practice Test 10 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) FROZEN from the prior
// build: M1 5E/9M/8H; M2 wavy flow — easy at 1,4,20; medium at 2,3,6,7,12,15,16;
// hard at 5,8,9,10,11,13,14,17,18,19,21,22 (3E/7M/12H, band-6/7 ceilings).
// Figure density at official ~20%: M1 carries 4 diagram items (Q5 dotPlot,
// Q6 twoWayTable, Q9 rightTriangle, Q13 scatterplot), M2 carries 4 (Q2
// twoWayTable, Q3 scatterplot, Q9 rationalFunction, Q13 quadraticVertex).
// Numeric MC choices sorted ascending (official convention). Scenario palette:
// commercial bakery ovens, county road-salt supplies, movie-theater concessions,
// hardware-fastener inventory, laser-tag arenas, wheelchair/loading ramps,
// soccer-field irrigation, campus shuttle routes, cider pressing,
// plant-nursery seedling trays.

export const practiceTest10 = {
  id: "practice-test-10",
  title: "Practice Test 10",
  description: "Full-length SAT Math practice test with 2 modules",
  totalQuestions: 44,
  timePerModule: 35,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      timeLimit: 35,
      questions: [
// Practice Test 10 — Math Module 1
// 22 questions: Easy (1-5), Medium (6-14), Hard (15-22)

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A survey drone's outbound leg is graphed as line $t$ in the xy-plane, where coordinates are given in kilometers. At the point $(4, 9)$ the drone turns and flies a second leg perpendicular to line $t$. Which equation defines the second leg?",
  diagram: { type: "linearGraph", params: { slope: 2, yIntercept: 1, xRange: [-5, 5], yRange: [-9, 11], xTickInterval: 1, yTickInterval: 2, gridInterval: 1, showPoints: [[0, 1], [4, 9]], label: "t" } },
  choices: [
    // distractor: negates the slope of line t but does not take the reciprocal, giving slope -2
    { id: "A", text: "$y = -2x + 17$" },
    { id: "B", text: "$y = -\\frac{1}{2}x + 11$" },
    // distractor: takes the reciprocal of 2 but keeps the sign positive, giving slope 1/2
    { id: "C", text: "$y = \\frac{1}{2}x + 7$" },
    // distractor: reuses line t's own slope of 2, so the leg is parallel rather than perpendicular
    { id: "D", text: "$y = 2x + 1$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice B is correct.** Line $t$ rises $2$ units for every $1$ unit to the right, so its slope is $2$. A perpendicular line has the negative reciprocal slope, $-\\frac{1}{2}$, and it must pass through $(4, 9)$.\n\n**The Fast Way (~20s):** Flip and negate the slope of $t$ to get $-\\frac{1}{2}$, then test the choices at $x = 4$: only $-\\frac{1}{2}(4) + 11 = 9$ works.\n\n**The Full Solution:**\nStep 1: Read two lattice points on line $t$ from the graph, $(0, 1)$ and $(4, 9)$. The slope is $\\frac{9 - 1}{4 - 0} = 2$.\nStep 2: Perpendicular slopes multiply to $-1$, so the second leg has slope $-\\frac{1}{2}$. Write $y = -\\frac{1}{2}x + b$.\nStep 3: Substitute the turning point $(4, 9)$: $9 = -\\frac{1}{2}(4) + b = -2 + b$, so $b = 11$ and the equation is $y = -\\frac{1}{2}x + 11$. Check: at $x = 4$, $-\\frac{1}{2}(4) + 11 = 9$, and $\\left(-\\frac{1}{2}\\right)(2) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -2x + 17$): negates the slope but forgets the reciprocal, so the slope is $-2$; $(-2)(2) = -4$, not $-1$.\n* Choice C ($y = \\frac{1}{2}x + 7$): takes the reciprocal but keeps it positive, so the slope is $\\frac{1}{2}$; $\\left(\\frac{1}{2}\\right)(2) = 1$, not $-1$.\n* Choice D ($y = 2x + 1$): this is line $t$ itself — the same slope $2$ makes the leg parallel, not perpendicular.\n\n**Test Day Takeaway:** Perpendicular means flip AND negate. Do both moves, then force the point into $y = mx + b$ to find the intercept.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "An observatory books $x$ hours of imaging time and $y$ hours of spectroscopy time, and its two scheduling rules give $5x + 3y = 7k$ and $3x + 5y = 9k$ for a positive constant $k$. Which expression gives the total booked hours $x + y$?",
  choices: [
    // distractor: subtracts the two equations instead of adding, which gives x - y = -k
    { id: "A", text: "$-k$" },
    // distractor: adds correctly to 8x + 8y = 16k but divides 16k by 16 instead of by 8
    { id: "B", text: "$k$" },
    { id: "C", text: "$2k$" },
    // distractor: adds correctly to 8x + 8y = 16k but divides by 2 instead of by 8
    { id: "D", text: "$8k$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice C is correct.** Adding the two equations collapses them into a single statement about $x + y$, with no need to find $x$ and $y$ separately.\n\n**The Fast Way (~15s):** Add: $8x + 8y = 16k$. Divide by $8$: $x + y = 2k$.\n\n**The Full Solution:**\nStep 1: Line the equations up and add them: $(5x + 3y) + (3x + 5y) = 7k + 9k$, so $8x + 8y = 16k$.\nStep 2: Factor the left side: $8(x + y) = 16k$.\nStep 3: Divide both sides by $8$ to get $x + y = 2k$. Check: solving the system gives $x = 0.5k$ and $y = 1.5k$; then $5(0.5k) + 3(1.5k) = 7k$ ✓ and $0.5k + 1.5k = 2k$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-k$): subtracts the equations instead of adding, producing $2x - 2y = -2k$, that is, $x - y = -k$ — the difference, not the sum.\n* Choice B ($k$): reaches $8x + 8y = 16k$ but divides $16k$ by $16$ rather than by the coefficient $8$.\n* Choice D ($8k$): reaches $8x + 8y = 16k$ and divides by $2$, leaving $8k$ instead of dividing by $8$.\n\n**Test Day Takeaway:** When a question asks for a combination such as $x + y$, add or subtract the equations first — solving for each variable is almost always the slow road.",
  skills: ["elimination-method"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A packing charge, in dollars, for $x$ crates equals $4(3x - 5)$. Rewriting that charge without parentheses gives the form $ax + b$. Which of the following gives $a$ and $b$?",
  choices: [
    // distractor: swaps the coefficient and the constant, reporting a = -20 and b = 12
    { id: "A", text: "$a = -20$ and $b = 12$" },
    // distractor: copies 3 and -5 straight out of the parentheses without multiplying by 4
    { id: "B", text: "$a = 3$ and $b = -5$" },
    // distractor: multiplies 4 by 3x but leaves the -5 untouched, giving b = -5
    { id: "C", text: "$a = 12$ and $b = -5$" },
    { id: "D", text: "$a = 12$ and $b = -20$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice D is correct.** The $4$ multiplies both terms inside the parentheses, so $4(3x - 5) = 12x - 20$. Matching this to $ax + b$ gives $a = 12$ and $b = -20$.\n\n**The Fast Way (~10s):** $4 \\cdot 3 = 12$ and $4 \\cdot (-5) = -20$, so $a = 12$ and $b = -20$.\n\n**The Full Solution:**\nStep 1: Distribute the $4$ across the first term: $4 \\cdot 3x = 12x$.\nStep 2: Distribute the $4$ across the second term: $4 \\cdot (-5) = -20$, so the charge is $12x - 20$ dollars.\nStep 3: Compare $12x - 20$ with $ax + b$ term by term: $a = 12$ and $b = -20$. Check with $x = 3$: $4(9 - 5) = 16$ and $12(3) - 20 = 16$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($a = -20$ and $b = 12$): distributes correctly but reports the numbers in the wrong roles — $-20$ is the constant, not the coefficient of $x$.\n* Choice B ($a = 3$ and $b = -5$): reads $3$ and $-5$ straight out of the parentheses and never multiplies by $4$.\n* Choice C ($a = 12$ and $b = -5$): multiplies the $3x$ by $4$ but leaves the $-5$ alone, so the constant is off by a factor of $4$.\n\n**Test Day Takeaway:** Distribution touches every term inside the parentheses. Multiply the constant too, then match term by term.",
  skills: ["distributive-property"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A plant breeder counted the seeds in 11 harvested pea pods and recorded 4, 5, 7, 7, 7, 8, 9, 11, 13, 14, and 14. What is the mode of the 11 counts?",
  choices: [
    { id: "A", text: "$7$" },
    // distractor: reports the median, the 6th value of the ordered list, which is 8
    { id: "B", text: "$8$" },
    // distractor: reports the mean, 99 divided by 11, which is 9
    { id: "C", text: "$9$" },
    // distractor: reports the range, 14 minus 4, which is 10
    { id: "D", text: "$10$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**Choice A is correct.** The mode is the value that appears most often. The count $7$ appears three times; $14$ appears twice; every other count appears once.\n\n**The Fast Way (~10s):** Scan for repeats: $7, 7, 7$ beats $14, 14$. The mode is $7$.\n\n**The Full Solution:**\nStep 1: Tally the counts: $4$ once, $5$ once, $7$ three times, $8$ once, $9$ once, $11$ once, $13$ once, $14$ twice.\nStep 2: The largest tally is $3$, belonging to the count $7$.\nStep 3: The mode is therefore $7$. Check: no other value reaches three appearances, so the mode is unique ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($8$): this is the median — with $11$ ordered values the middle one is the 6th, which is $8$. The question asks for the most frequent value, not the middle one.\n* Choice C ($9$): this is the mean, $\\frac{99}{11} = 9$. Mean and mode are different centers.\n* Choice D ($10$): this is the range, $14 - 4 = 10$, a measure of spread rather than a data value.\n\n**Test Day Takeaway:** Mode = most often. Before computing anything, reread which measure the question named — mean, median, mode, and range rarely agree.",
  skills: ["find-mode"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A 4,800-kilogram shipment is packed into two shipping containers whose masses are in the ratio 3 to 5. What is the mass, in kilograms, of the lighter container?",
  choices: [
    // distractor: stops at the value of one part, 4800 divided by 8, without multiplying by 3
    { id: "A", text: "$600$" },
    { id: "B", text: "$1{,}800$" },
    // distractor: splits the shipment evenly, 4800 divided by 2, ignoring the 3 to 5 ratio
    { id: "C", text: "$2{,}400$" },
    // distractor: gives the heavier container, 5 parts, instead of the lighter one
    { id: "D", text: "$3{,}000$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**Choice B is correct.** The ratio $3$ to $5$ splits the shipment into $3 + 5 = 8$ equal parts. Each part is $\\frac{4{,}800}{8} = 600$ kilograms, and the lighter container holds $3$ parts.\n\n**The Fast Way (~15s):** $\\frac{3}{8}$ of $4{,}800$ is $1{,}800$ kilograms.\n\n**The Full Solution:**\nStep 1: Add the ratio numbers to find the total number of parts: $3 + 5 = 8$.\nStep 2: Divide the total mass by the number of parts: $\\frac{4{,}800}{8} = 600$ kilograms per part.\nStep 3: The lighter container holds $3$ parts: $3(600) = 1{,}800$ kilograms. Check: the other container holds $5(600) = 3{,}000$, and $1{,}800 + 3{,}000 = 4{,}800$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($600$): this is one part, $\\frac{4{,}800}{8}$, reported before multiplying by the $3$ in the ratio.\n* Choice C ($2{,}400$): this splits the shipment in half, which would require a $1$ to $1$ ratio, not $3$ to $5$.\n* Choice D ($3{,}000$): this is $5$ parts — the heavier container. The question asked for the lighter one.\n\n**Test Day Takeaway:** In a part-to-part ratio, first add the parts to get the whole, then divide once. The per-part value does the rest.",
  skills: ["word-problem-to-equation"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Four automated sky cameras logged the meteor counts given in the table during a single night. What percent of that night's logged meteors did Camera D log?",
  questionTable: { headers: ["Camera", "Meteors logged"], rows: [["A", "78"], ["B", "90"], ["C", "72"], ["D", "60"]] },
  choices: [
    { id: "A", text: "$20\\%$" },
    // distractor: divides 60 by the other three cameras' 240 instead of by the 300 total
    { id: "B", text: "$25\\%$" },
    // distractor: uses Camera B's count of 90 over the 300 total
    { id: "C", text: "$30\\%$" },
    // distractor: gives the complement, the 240 meteors the other three cameras logged, over 300
    { id: "D", text: "$80\\%$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**Choice A is correct.** The whole is every meteor logged that night, $78 + 90 + 72 + 60 = 300$. Camera D logged $60$ of them, and $\\frac{60}{300} = 0.20$.\n\n**The Fast Way (~20s):** The four counts total $300$, and $60$ is one fifth of $300$, so $20\\%$.\n\n**The Full Solution:**\nStep 1: Add all four counts to get the whole: $78 + 90 + 72 + 60 = 300$ meteors.\nStep 2: Form the part-to-whole ratio for Camera D: $\\frac{60}{300}$.\nStep 3: Convert to a percent: $\\frac{60}{300} = 0.2 = 20\\%$. Check: $20\\%$ of $300$ is $60$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($25\\%$): divides $60$ by $240$, the other three cameras' total. That is a part-to-rest ratio, not part-to-whole.\n* Choice C ($30\\%$): computes $\\frac{90}{300}$ — Camera B's share, read off the wrong row.\n* Choice D ($80\\%$): computes $\\frac{240}{300}$, the percent logged by every camera except D.\n\n**Test Day Takeaway:** \"Percent of\" needs the whole in the denominator. When a table lists categories, sum every row before dividing.",
  skills: ["percent-of-value"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A conveyor's power draw, in kilowatts, at belt speed $x$ meters per second is written as $2x^2 + 12x + c$ and also as $2(x + 3)^2 - 5$, where $c$ is a constant. What is the value of $c$?",
  choices: [
    // distractor: copies the -5 from the second form as if it were the constant term of the first
    { id: "A", text: "$-5$" },
    // distractor: computes 9 - 5 = 4, forgetting to multiply the 9 by the leading 2
    { id: "B", text: "$4$" },
    { id: "C", text: "$13$" },
    // distractor: computes 2 times 9 = 18 but never subtracts the 5
    { id: "D", text: "$18$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice C is correct.** Expanding the second form gives $2(x + 3)^2 - 5 = 2x^2 + 12x + 18 - 5 = 2x^2 + 12x + 13$, so $c = 13$.\n\n**The Fast Way (~20s):** The constant of $2(x + 3)^2 - 5$ is $2(9) - 5 = 13$.\n\n**The Full Solution:**\nStep 1: Square the binomial: $(x + 3)^2 = x^2 + 6x + 9$.\nStep 2: Multiply through by $2$: $2x^2 + 12x + 18$. Then subtract $5$: $2x^2 + 12x + 13$.\nStep 3: Match constants with $2x^2 + 12x + c$, so $c = 13$. Check at $x = 1$: $2(1) + 12 + 13 = 27$ and $2(4)^2 - 5 = 32 - 5 = 27$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): copies the $-5$ straight out of the second form. That number is the constant only after the $2(x+3)^2$ term has been expanded and folded in.\n* Choice B ($4$): computes $9 - 5 = 4$, skipping the leading coefficient $2$ that multiplies the $9$.\n* Choice D ($18$): computes $2(9) = 18$ and stops, never subtracting the $-5$.\n\n**Test Day Takeaway:** To compare two forms of a quadratic, expand the vertex form completely. The leading coefficient multiplies the squared constant before anything is added.",
  skills: ["quadratics"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A creamery's pasteurizer costs $4(x - 3)^2 + k$ dollars an hour to run at a throughput of $x$ hundred liters per hour, and $k$ is a positive constant. Expanding that expression gives $4x^2 - 24x + 47$ dollars an hour. What is the value of $k$?",
  correctAnswer: "11",
  explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**The correct answer is $11$.** Expanding $4(x - 3)^2 + k$ gives $4x^2 - 24x + 36 + k$. Matching the constant term to $47$ gives $36 + k = 47$, so $k = 11$.\n\n**The Fast Way (~20s):** Expanding contributes $4(9) = 36$ to the constant, so $k = 47 - 36 = 11$.\n\n**The Full Solution:**\nStep 1: Square the binomial: $(x - 3)^2 = x^2 - 6x + 9$.\nStep 2: Multiply by $4$ and add $k$: $4x^2 - 24x + 36 + k$.\nStep 3: The $x^2$ and $x$ terms already match $4x^2 - 24x + 47$, so set the constants equal: $36 + k = 47$, giving $k = 11$. Check at $x = 0$: $4(9) + 11 = 47$ and $4(0) - 0 + 47 = 47$ ✓\n\n**Common Mistakes:**\n* $47$: reads the constant of the standard form as $k$ itself, ignoring the $36$ that expanding contributes.\n* $83$: adds instead of subtracting, $47 + 36 = 83$.\n* $-11$: solves $36 + k = 47$ with a sign slip and reports $-11$.\n\n**Test Day Takeaway:** Expand the vertex form first, then equate constants. The squared term always leaves a leftover constant that the outside number must absorb.",
  skills: ["distributive-property", "converting-quadratic-forms"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "At a research farm, one triangular seedbed covers 225 square meters and a second seedbed of the same shape has sides 50 meters long where the first has sides 30 meters long. How many square meters does the second seedbed cover?",
  choices: [
    // distractor: squares the ratio but applies it upside down, multiplying 225 by 9/25
    { id: "A", text: "$81$" },
    // distractor: uses the side ratio upside down and does not square it, multiplying 225 by 3/5
    { id: "B", text: "$135$" },
    // distractor: uses the side ratio 5/3 without squaring it, multiplying 225 by 5/3
    { id: "C", text: "$375$" },
    { id: "D", text: "$625$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**Choice D is correct.** For similar figures, areas scale by the SQUARE of the side ratio. The sides scale by $\\frac{50}{30} = \\frac{5}{3}$, so the areas scale by $\\left(\\frac{5}{3}\\right)^2 = \\frac{25}{9}$, giving $225 \\cdot \\frac{25}{9} = 625$ square meters.\n\n**The Fast Way (~25s):** $\\frac{225}{9} = 25$, and $25 \\cdot 25 = 625$.\n\n**The Full Solution:**\nStep 1: Find the scale factor from the corresponding sides: $\\frac{50}{30} = \\frac{5}{3}$.\nStep 2: Square it for the area ratio: $\\left(\\frac{5}{3}\\right)^2 = \\frac{25}{9}$.\nStep 3: Multiply the known area: $225 \\cdot \\frac{25}{9} = 625$ square meters. Check: a $30$-meter base with height $15$ gives $225$; scaling both by $\\frac{5}{3}$ gives base $50$ and height $25$, and $\\frac{1}{2}(50)(25) = 625$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($81$): squares the ratio but inverts it, computing $225 \\cdot \\frac{9}{25}$. That shrinks the larger bed.\n* Choice B ($135$): uses $\\frac{3}{5}$ — inverted and unsquared — giving $225 \\cdot \\frac{3}{5}$.\n* Choice C ($375$): uses the side ratio $\\frac{5}{3}$ directly, $225 \\cdot \\frac{5}{3}$, forgetting that area scales by the square.\n\n**Test Day Takeaway:** Lengths scale by $r$, areas by $r^2$, volumes by $r^3$. Check the direction too: the bigger figure must end up with the bigger number.",
  skills: ["similar-triangles"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A steel gusset on a trailer frame is a right triangle whose hypotenuse measures 24 inches and whose shorter leg measures 12 inches. How many square inches does the gusset cover?",
  choices: [
    // distractor: divides 12 by the square root of 3 instead of multiplying, taking the second leg as 4 times the square root of 3
    { id: "A", text: "$24\\sqrt{3}$" },
    { id: "B", text: "$72\\sqrt{3}$" },
    // distractor: adds the squares instead of subtracting, taking the second leg as the square root of 720
    { id: "C", text: "$72\\sqrt{5}$" },
    // distractor: multiplies the two legs but omits the factor of one half
    { id: "D", text: "$144\\sqrt{3}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.** The missing leg is $\\sqrt{24^2 - 12^2} = \\sqrt{432} = 12\\sqrt{3}$ inches, so the area is $\\frac{1}{2}(12)(12\\sqrt{3}) = 72\\sqrt{3}$ square inches.\n\n**The Fast Way (~30s):** A leg that is half the hypotenuse makes a $30$-$60$-$90$ triangle, so the other leg is $12\\sqrt{3}$ and the area is $\\frac{1}{2}(12)(12\\sqrt{3}) = 72\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: Call the missing leg $b$. The Pythagorean theorem gives $12^2 + b^2 = 24^2$, so $b^2 = 576 - 144 = 432$.\nStep 2: Simplify: $b = \\sqrt{432} = \\sqrt{144 \\cdot 3} = 12\\sqrt{3}$ inches.\nStep 3: The legs are perpendicular, so the area is $\\frac{1}{2}(12)(12\\sqrt{3}) = 72\\sqrt{3}$ square inches. Check: $12^2 + (12\\sqrt{3})^2 = 144 + 432 = 576 = 24^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($24\\sqrt{3}$): takes the second leg as $\\frac{12}{\\sqrt{3}} = 4\\sqrt{3}$, dividing by $\\sqrt{3}$ where the ratio calls for multiplying, and gets $\\frac{1}{2}(12)(4\\sqrt{3})$.\n* Choice C ($72\\sqrt{5}$): adds instead of subtracting inside the radical, $\\sqrt{576 + 144} = 12\\sqrt{5}$. The hypotenuse is the longest side, so the missing leg must be shorter than $24$.\n* Choice D ($144\\sqrt{3}$): multiplies the two legs, $12 \\cdot 12\\sqrt{3}$, and forgets the $\\frac{1}{2}$ in the triangle-area formula.\n\n**Test Day Takeaway:** In a right triangle the two legs ARE the base and height. Solve for the missing leg by subtracting inside the radical, then halve the product.",
  skills: ["triangle-area"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "For a freight train, the table pairs the time since departure with the distance still to be covered. What is the slope, in miles per hour, of the linear relationship between those two quantities?",
  questionTable: { headers: ["Time since departure (hours)", "Distance remaining (miles)"], rows: [["2", "318"], ["4", "246"], ["7", "138"]] },
  choices: [
    // distractor: subtracts the distances but never divides by the change in time
    { id: "A", text: "$-180$" },
    { id: "B", text: "$-36$" },
    // distractor: divides the change in distance by 7 + 2 = 9 instead of 7 - 2 = 5
    { id: "C", text: "$-20$" },
    // distractor: subtracts the distances in one order and the times in the other, flipping the sign
    { id: "D", text: "$36$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice B is correct.** Using the first and last rows, $(2, 318)$ and $(7, 138)$, the slope is $\\frac{138 - 318}{7 - 2} = \\frac{-180}{5} = -36$ miles per hour.\n\n**The Fast Way (~20s):** From hour $2$ to hour $7$ the distance drops $180$ miles in $5$ hours, so the slope is $-36$.\n\n**The Full Solution:**\nStep 1: Choose two rows as ordered pairs: $(2, 318)$ and $(7, 138)$.\nStep 2: Apply $\\frac{y_2 - y_1}{x_2 - x_1} = \\frac{138 - 318}{7 - 2} = \\frac{-180}{5}$.\nStep 3: Simplify to $-36$ miles per hour. Check with the middle row: $(4, 246)$ and $(2, 318)$ give $\\frac{246 - 318}{4 - 2} = \\frac{-72}{2} = -36$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-180$): stops at the change in distance, $138 - 318$, and never divides by the $5$-hour change in time.\n* Choice C ($-20$): divides $-180$ by $7 + 2 = 9$. Slope uses the DIFFERENCE of the times, not their sum.\n* Choice D ($36$): subtracts the distances as $318 - 138$ while subtracting the times as $7 - 2$, mixing orders and flipping the sign. Distance remaining falls, so the slope must be negative.\n\n**Test Day Takeaway:** Subtract in the same order top and bottom. A quantity that decreases over time always has a negative slope — use that as a sign check.",
  skills: ["slope-from-points"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A grain silo holds $f(x) = 5x + k$ tonnes of wheat after $x$ days of harvest, where $k$ is a constant, and the silo held 41 tonnes after 6 days. After how many days does the model give 86 tonnes?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**The correct answer is $15$.** From $f(6) = 41$, $5(6) + k = 41$, so $k = 11$ and $f(x) = 5x + 11$. Setting $5x + 11 = 86$ gives $x = 15$ days.\n\n**The Fast Way (~25s):** $k = 41 - 30 = 11$; then $86 - 11 = 75$ and $\\frac{75}{5} = 15$.\n\n**The Full Solution:**\nStep 1: Substitute the known point into the rule: $f(6) = 5(6) + k = 30 + k$, and this equals $41$, so $k = 11$.\nStep 2: The completed model is $f(x) = 5x + 11$.\nStep 3: Solve $5x + 11 = 86$: subtract $11$ to get $5x = 75$, then divide by $5$ to get $x = 15$. Check: $f(15) = 5(15) + 11 = 86$ ✓\n\n**Common Mistakes:**\n* $11$: finds the constant $k$ and stops there instead of solving for the day.\n* $17.2$: ignores $k$ entirely and computes $\\frac{86}{5}$.\n* $19.4$: adds $k$ instead of subtracting it, computing $\\frac{86 + 11}{5}$.\n\n**Test Day Takeaway:** When a rule carries an unknown constant, one given point pins it down. Finish the model first, then answer the question that was actually asked.",
  skills: ["function-notation"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "At a farm weigh-in, 8 pumpkins average 34 kilograms each. Weighing one more pumpkin brings the average of all 9 to 39 kilograms. How many kilograms does the added pumpkin weigh?",
  choices: [
    // distractor: reports the 5-kilogram rise in the average rather than the pumpkin's mass
    { id: "A", text: "$5$" },
    // distractor: assumes the added pumpkin weighs the new average, 39 kilograms
    { id: "B", text: "$39$" },
    // distractor: multiplies the new average by 8 instead of 9, computing 312 - 272
    { id: "C", text: "$40$" },
    { id: "D", text: "$79$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Outlier Effect**\n\n**Choice D is correct.** Averages come from totals. The first $8$ pumpkins total $8(34) = 272$ kilograms; all $9$ total $9(39) = 351$ kilograms. The added pumpkin is $351 - 272 = 79$ kilograms.\n\n**The Fast Way (~25s):** The new pumpkin must supply its own $39$ plus $5$ extra kilograms for each of the other $8$: $39 + 8(5) = 79$.\n\n**The Full Solution:**\nStep 1: Convert the first average to a total: $8 \\times 34 = 272$ kilograms.\nStep 2: Convert the new average to a total: $9 \\times 39 = 351$ kilograms.\nStep 3: The difference is the added pumpkin: $351 - 272 = 79$ kilograms. Check: $\\frac{272 + 79}{9} = \\frac{351}{9} = 39$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): this is how much the average moved, $39 - 34$, not how heavy the new pumpkin is.\n* Choice B ($39$): assumes the new value equals the new average. A value equal to the mean would leave the mean unchanged at $34$.\n* Choice C ($40$): computes $8(39) - 272 = 40$, using $8$ for the new count when the group now holds $9$ pumpkins.\n\n**Test Day Takeaway:** Turn every average into a total before comparing. One unusually large value has to carry the shortfall for every other member of the set.",
  skills: ["calculate-mean", "find-median"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "On an airport map scaled in hundreds of meters, a taxiway runs from $(-5, 8)$ to $(a, -2)$ and is bisected at $(4, 3)$, where $a$ is a constant. What is the value of $a$?",
  correctAnswer: "13",
  explanation: "**SAT Pattern: Midpoint Formula**\n\n**The correct answer is $13$.** The midpoint's $x$-coordinate is the average of the endpoints' $x$-coordinates, so $\\frac{-5 + a}{2} = 4$, giving $a = 13$.\n\n**The Fast Way (~20s):** From $-5$ to $4$ is $9$ units, so the far endpoint sits $9$ more units along: $4 + 9 = 13$.\n\n**The Full Solution:**\nStep 1: Write the midpoint condition for the $x$-coordinates: $\\frac{-5 + a}{2} = 4$.\nStep 2: Multiply both sides by $2$: $-5 + a = 8$.\nStep 3: Add $5$ to both sides: $a = 13$. Check: the midpoint of $(-5, 8)$ and $(13, -2)$ is $\\left(\\frac{-5 + 13}{2}, \\frac{8 + (-2)}{2}\\right) = (4, 3)$ ✓\n\n**Common Mistakes:**\n* $8$: doubles the midpoint's $x$-coordinate to get $8$ but never undoes the $-5$.\n* $3$: reaches $-5 + a = 8$ and then subtracts $5$ instead of adding it.\n* $-0.5$: averages the known endpoint with the midpoint, $\\frac{-5 + 4}{2}$, instead of solving for the missing endpoint.\n\n**Test Day Takeaway:** A midpoint is an average, so recovering a missing endpoint means doubling the midpoint and subtracting the endpoint you already have.",
  skills: ["coordinate-geometry"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A parcel carrier's weekly profit, in thousands of dollars, at a fare of $p$ dollars is modeled by $-3p^2 + kp - 24$. The profit is zero at two positive fares, and the larger fare is twice the smaller. What is the value of the constant $k$?",
  choices: [
    // distractor: applies the sum-of-roots formula with a = 3 instead of a = -3, flipping the sign of k
    { id: "A", text: "$-18$" },
    // distractor: finds the sum of the two fares, 6, but never multiplies it by 3
    { id: "B", text: "$6$" },
    { id: "C", text: "$18$" },
    // distractor: treats -24 divided by -3, which is 8, as the SUM of the fares rather than their product, giving 3 times 8
    { id: "D", text: "$24$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice C is correct.** Write the fares as $r$ and $2r$. For $-3p^2 + kp - 24 = 0$, the product of the roots is $\\frac{-24}{-3} = 8$, so $r(2r) = 8$, $r^2 = 4$, and $r = 2$. The fares are $2$ and $4$, their sum is $6$, and the sum of the roots equals $\\frac{-k}{-3} = \\frac{k}{3}$, so $k = 18$.\n\n**The Fast Way (~40s):** Product of roots $= 8 = 2r^2$ gives roots $2$ and $4$; their sum $6$ equals $\\frac{k}{3}$, so $k = 18$.\n\n**The Full Solution:**\nStep 1: For $ap^2 + bp + c = 0$, the roots multiply to $\\frac{c}{a}$. Here $\\frac{c}{a} = \\frac{-24}{-3} = 8$, so $r \\cdot 2r = 2r^2 = 8$ and $r^2 = 4$.\nStep 2: The fares are positive, so $r = 2$ and the fares are $2$ and $4$ dollars.\nStep 3: The roots add to $\\frac{-b}{a} = \\frac{-k}{-3} = \\frac{k}{3}$, and $2 + 4 = 6$, so $\\frac{k}{3} = 6$ and $k = 18$. Check: $-3(2)^2 + 18(2) - 24 = -12 + 36 - 24 = 0$ and $-3(4)^2 + 18(4) - 24 = -48 + 72 - 24 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-18$): uses $\\frac{-k}{3}$ for the sum, as though the leading coefficient were $+3$, and lands on the right size with the wrong sign.\n* Choice B ($6$): stops at the sum of the two fares, $2 + 4 = 6$, without multiplying by the leading coefficient's magnitude.\n* Choice D ($24$): treats $\\frac{-24}{-3} = 8$ as the SUM of the fares instead of their product, then reports $3(8) = 24$.\n\n**Test Day Takeaway:** When roots are related (one is twice, three times, or the negative of the other), the PRODUCT relation usually pins the roots down in one step; then the sum relation delivers the missing coefficient.",
  skills: ["quadratic-factoring"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A radio antenna receives power $P(t) = -3t^2 + 24t + c$ microwatts when tilted $t$ degrees above a reference position, where $c$ is a constant. The table gives three tilts and the power measured at each. What is the greatest power, in microwatts, this model predicts?",
  questionTable: { headers: ["Tilt (degrees)", "Power (microwatts)"], rows: [["2", "49"], ["6", "49"], ["8", "13"]] },
  choices: [
    // distractor: reports the tilt at which the maximum occurs, 4 degrees, rather than the power there
    { id: "A", text: "$4$" },
    // distractor: reports the constant c = 13, which is the power at a tilt of 0 degrees
    { id: "B", text: "$13$" },
    // distractor: reads the largest power listed in the table instead of the model's peak
    { id: "C", text: "$49$" },
    { id: "D", text: "$61$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice D is correct.** Any row pins down $c$: from $t = 2$, $-3(4) + 24(2) + c = 49$, so $c = 13$. The parabola opens downward with vertex at $t = \\frac{-24}{2(-3)} = 4$, and $P(4) = -48 + 96 + 13 = 61$ microwatts.\n\n**The Fast Way (~35s):** The table's equal powers at $t = 2$ and $t = 6$ put the peak halfway between, at $t = 4$; with $c = 13$, $P(4) = 61$.\n\n**The Full Solution:**\nStep 1: Substitute a table row to find $c$: $P(2) = -3(2)^2 + 24(2) + c = -12 + 48 + c = 49$, so $c = 13$.\nStep 2: Locate the vertex. For $P(t) = -3t^2 + 24t + 13$, the axis of symmetry is $t = \\frac{-24}{2(-3)} = 4$ degrees; the leading coefficient is negative, so this is a maximum.\nStep 3: Evaluate there: $P(4) = -3(16) + 24(4) + 13 = -48 + 96 + 13 = 61$ microwatts. Check the third row: $P(8) = -3(64) + 24(8) + 13 = -192 + 192 + 13 = 13$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): this is the tilt at which the peak occurs, not the power at that tilt.\n* Choice B ($13$): this is $c$, the power at a tilt of $0$ degrees — the model's value at the reference position, not its maximum.\n* Choice C ($49$): the biggest number printed in the table. The table samples the model; the true peak sits between $t = 2$ and $t = 6$.\n\n**Test Day Takeaway:** A maximum has two coordinates. Find the input with $t = \\frac{-b}{2a}$ or by symmetry, then substitute to get the output the question asked for.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Exactly two numbers satisfy $\\sqrt{3x + a} = x - 5$ for a particular constant $a$, and one of them is 7. What is the other number that satisfies the equation?",
  choices: [
    // distractor: reports the constant a = -17 instead of the second solution
    { id: "A", text: "$-17$" },
    { id: "B", text: "$6$" },
    // distractor: reports 13, the sum of the two solutions of the squared equation
    { id: "C", text: "$13$" },
    // distractor: reports 42, the product of the two solutions of the squared equation
    { id: "D", text: "$42$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Radical Equation**\n\n**Choice B is correct.** Substituting $x = 7$ gives $\\sqrt{21 + a} = 2$, so $a = -17$. The equation $\\sqrt{3x - 17} = x - 5$ squares to $x^2 - 13x + 42 = 0$, whose solutions are $6$ and $7$.\n\n**The Fast Way (~40s):** $a = -17$ from $x = 7$; the squared equation $x^2 - 13x + 42 = 0$ factors as $(x - 6)(x - 7)$, so the partner root is $6$.\n\n**The Full Solution:**\nStep 1: Put $x = 7$ into the equation: $\\sqrt{3(7) + a} = 7 - 5$, so $\\sqrt{21 + a} = 2$ and $21 + a = 4$, giving $a = -17$.\nStep 2: With $a = -17$, square both sides: $3x - 17 = (x - 5)^2 = x^2 - 10x + 25$, which rearranges to $x^2 - 13x + 42 = 0$.\nStep 3: Factor: $(x - 6)(x - 7) = 0$, so $x = 6$ or $x = 7$. Since $7$ is the given solution, the other is $6$. Check: $\\sqrt{3(6) - 17} = \\sqrt{1} = 1$ and $6 - 5 = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-17$): this is the constant $a$, found on the way to the answer but not itself a solution of the equation.\n* Choice C ($13$): this is the sum of the two solutions, $6 + 7$, read off the middle coefficient of $x^2 - 13x + 42$.\n* Choice D ($42$): this is the product of the two solutions, $6 \\cdot 7$, read off the constant term.\n\n**Test Day Takeaway:** A given solution pins down the unknown constant. Once the equation is fully specified, square it, factor, and always substitute each root back — a root that fails the sign test is extraneous.",
  skills: ["radical-equations"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Shifting the parabola $y = f(x)$ left 6 units and down 4 units gives a parabola with vertex $(-4, -9)$. The vertex of $y = f(x)$ is $(a, b)$. What is the value of $a - b$?",
  choices: [
    // distractor: undoes the vertical shift but moves the x-coordinate the same way as the shift, using the vertex (-10, -5)
    { id: "A", text: "$-5$" },
    // distractor: reverses neither shift, using the vertex (-10, -13)
    { id: "B", text: "$3$" },
    { id: "C", text: "$7$" },
    // distractor: undoes the horizontal shift but applies the vertical shift a second time, using the vertex (2, -13)
    { id: "D", text: "$15$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Function Transformation**\n\n**Choice C is correct.** The shifted parabola's vertex is $(-4, -9)$. To recover the original vertex, undo the moves: go right $6$ and up $4$, landing at $(2, -5)$. Then $a - b = 2 - (-5) = 7$.\n\n**The Fast Way (~30s):** Undo the shift: $(-4 + 6,\\ -9 + 4) = (2, -5)$, so $a - b = 2 + 5 = 7$.\n\n**The Full Solution:**\nStep 1: The shifted parabola is $y = f(x + 6) - 4$; its vertex is given as $(-4, -9)$.\nStep 2: A left shift of $6$ subtracts $6$ from the $x$-coordinate, so the original $x$-coordinate is $-4 + 6 = 2$. A down shift of $4$ subtracts $4$ from the $y$-coordinate, so the original $y$-coordinate is $-9 + 4 = -5$. Thus $(a, b) = (2, -5)$.\nStep 3: Compute $a - b = 2 - (-5) = 7$. Check by shifting forward: $(2 - 6,\\ -5 - 4) = (-4, -9)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): undoes the vertical shift correctly but moves the $x$-coordinate left again, using $(-10, -5)$ and getting $-10 - (-5)$.\n* Choice B ($3$): reverses neither shift, treating $(-10, -13)$ as the original vertex.\n* Choice D ($15$): undoes the horizontal shift but applies the vertical one a second time, using $(2, -13)$.\n\n**Test Day Takeaway:** Going backward through a transformation reverses every move. Confirm by pushing your answer forward through the stated shifts and landing on the given point.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A photometer converts a raw count $x$ to $g(x) = 2x + k$ for a negative constant $k$, and a calibration step then applies $f(u) = u^2 - 3$. The calibrated value of a raw count of 1 is 46. What is the value of $k$?",
  choices: [
    { id: "A", text: "$-9$" },
    // distractor: solves 2 + k = -7 and then reports -7 instead of subtracting 2 to get k
    { id: "B", text: "$-7$" },
    // distractor: takes only the positive square root, 2 + k = 7, ignoring that k is negative
    { id: "C", text: "$5$" },
    // distractor: applies the two functions in the wrong order, solving g(f(1)) = 46
    { id: "D", text: "$50$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice A is correct.** The calibrated value is $f(g(1))$. Since $g(1) = 2 + k$, the equation is $(2 + k)^2 - 3 = 46$, so $(2 + k)^2 = 49$ and $2 + k = \\pm 7$. Because $k$ is negative, $2 + k = -7$ and $k = -9$.\n\n**The Fast Way (~35s):** $(2 + k)^2 = 49$ gives $k = 5$ or $k = -9$; only $-9$ is negative.\n\n**The Full Solution:**\nStep 1: Evaluate the inner function at the raw count: $g(1) = 2(1) + k = 2 + k$.\nStep 2: Feed that into the outer function and set it equal to $46$: $(2 + k)^2 - 3 = 46$, so $(2 + k)^2 = 49$.\nStep 3: Take both square roots: $2 + k = 7$ gives $k = 5$, and $2 + k = -7$ gives $k = -9$. The constant is negative, so $k = -9$. Check: $g(1) = 2 - 9 = -7$ and $f(-7) = 49 - 3 = 46$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-7$): solves $2 + k = -7$ correctly but reports $-7$, which is the value of $g(1)$, not of $k$.\n* Choice C ($5$): keeps only the positive square root. It satisfies the equation, but the problem states that $k$ is negative.\n* Choice D ($50$): composes in the wrong order, computing $g(f(1))$: $f(1) = -2$, then $-4 + k = 46$ gives $k = 50$.\n\n**Test Day Takeaway:** Squaring produces two branches — list both, then let the stated restriction on the constant choose between them.",
  skills: ["function-composition"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A telescope's detector records a star image whose diameter, in micrometers, is a quadratic function of the focus position $x$, in millimeters. The diameter is smallest at $x = 12$, where it is 5 micrometers, and it is 21 micrometers at $x = 4$. What diameter does the function give at $x = 18$?",
  correctAnswer: "14",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $14$.** The minimum at $(12, 5)$ makes the function $S(x) = a(x - 12)^2 + 5$. The point $(4, 21)$ gives $64a + 5 = 21$, so $a = 0.25$, and $S(18) = 0.25(36) + 5 = 14$ micrometers.\n\n**The Fast Way (~40s):** $a = \\frac{21 - 5}{(4 - 12)^2} = \\frac{16}{64} = 0.25$; then $S(18) = 0.25(6)^2 + 5 = 14$.\n\n**The Full Solution:**\nStep 1: The smallest value sits at the vertex, so write $S(x) = a(x - 12)^2 + 5$ with $a > 0$.\nStep 2: Use the second condition: $S(4) = a(4 - 12)^2 + 5 = 64a + 5 = 21$, so $64a = 16$ and $a = 0.25$.\nStep 3: Evaluate at the requested position: $S(18) = 0.25(18 - 12)^2 + 5 = 0.25(36) + 5 = 9 + 5 = 14$ micrometers. Check: $S(6) = 0.25(36) + 5 = 14$, matching the symmetry of $6$ and $18$ about $x = 12$ ✓\n\n**Common Mistakes:**\n* $21$: assumes $x = 18$ mirrors $x = 4$. The mirror of $4$ is $20$, not $18$, because both must be the same distance from $x = 12$.\n* $9$: computes $0.25(36)$ and forgets to add the minimum value of $5$.\n* $77$: divides $16$ by the distance $8$ instead of by its square $64$, taking $a = 2$ and computing $2(36) + 5$.\n\n**Test Day Takeaway:** A stated minimum or maximum hands you the vertex for free. Write vertex form immediately, use the second point to find $a$, then evaluate.",
  skills: ["vertex-form", "function-evaluation"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The figure shows the right triangle that one diagonal cuts off from a rectangular cargo-bay hatch on a delivery van. The perimeter of the hatch is 170 inches. How many square inches does the hatch cover?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [45, 0], [45, 30]], sideLabels: ["", "", "65 in"], rightAngleVertex: 1, figureNote: true } },
  correctAnswer: "1500",
  explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $1500$.** Let the hatch measure $\\ell$ by $w$. The perimeter gives $\\ell + w = 85$, and the diagonal gives $\\ell^2 + w^2 = 65^2 = 4225$. Since $(\\ell + w)^2 = \\ell^2 + w^2 + 2\\ell w$, we get $7225 = 4225 + 2\\ell w$, so $\\ell w = 1500$ square inches.\n\n**The Fast Way (~45s):** $85^2 - 65^2 = 7225 - 4225 = 3000 = 2\\ell w$, so the area is $1500$.\n\n**The Full Solution:**\nStep 1: The perimeter is $2(\\ell + w) = 170$, so $\\ell + w = 85$ inches.\nStep 2: The diagonal is the hypotenuse of the right triangle shown, so $\\ell^2 + w^2 = 65^2 = 4225$.\nStep 3: Square the sum: $(\\ell + w)^2 = 85^2 = 7225$, and $7225 = \\ell^2 + w^2 + 2\\ell w = 4225 + 2\\ell w$. Then $2\\ell w = 3000$ and the area $\\ell w = 1500$ square inches. Check: the sides are $60$ and $25$, since $60 + 25 = 85$ and $60^2 + 25^2 = 3600 + 625 = 4225$; their product is $1500$ ✓\n\n**Common Mistakes:**\n* $3000$: stops at $2\\ell w$ without halving it.\n* $85$: reports the half-perimeter $\\ell + w$ rather than the product $\\ell w$.\n* $5525$: multiplies the half-perimeter by the diagonal, $85 \\times 65$, as though those were the side lengths.\n\n**Test Day Takeaway:** When a problem gives a sum and a sum of squares, expand $(\\ell + w)^2$ — the cross term $2\\ell w$ is the area, and you never need the individual sides.",
  skills: ["triangle-area"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Sliced mango loses 25 percent of its mass in a first drying pass, then reabsorbs moisture equal to 20 percent of its dried mass while conditioning. A conditioned batch has a mass of 630 grams. What was the batch's mass, in grams, before drying?",
  choices: [
    // distractor: undoes only the 20 percent moisture gain, computing 630 divided by 1.2
    { id: "A", text: "$525$" },
    // distractor: multiplies 630 by 0.9 instead of dividing by 0.9
    { id: "B", text: "$567$" },
    { id: "C", text: "$700$" },
    // distractor: undoes only the 25 percent loss, computing 630 divided by 0.75
    { id: "D", text: "$840$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice C is correct.** Losing $25\\%$ multiplies the mass by $0.75$, and reabsorbing $20\\%$ of that dried mass multiplies by $1.20$. Together the mass is multiplied by $0.75 \\times 1.20 = 0.90$, so the original mass is $\\frac{630}{0.90} = 700$ grams.\n\n**The Fast Way (~30s):** The two steps combine to a single factor of $0.9$, and $\\frac{630}{0.9} = 700$ grams.\n\n**The Full Solution:**\nStep 1: Let $m$ be the mass before drying. Drying leaves $75\\%$ of it: $0.75m$ grams.\nStep 2: Conditioning adds moisture equal to $20\\%$ of the dried mass, multiplying by $1.20$: $0.75m \\times 1.20 = 0.90m$ grams.\nStep 3: Set $0.90m = 630$ and divide: $m = \\frac{630}{0.90} = 700$ grams. Check: $700 \\times 0.75 = 525$, and $525 \\times 1.20 = 630$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($525$): computes $\\frac{630}{1.2}$, undoing only the conditioning gain. That is the dried mass, one step short of the answer.\n* Choice B ($567$): multiplies by $0.9$ instead of dividing, moving forward through the process rather than backward.\n* Choice D ($840$): computes $\\frac{630}{0.75}$, undoing only the drying loss and ignoring the $20\\%$ gain.\n\n**Test Day Takeaway:** Chain percent changes into one multiplier, then divide to run the chain backward. A $25\\%$ drop followed by a $20\\%$ rise is a net $10\\%$ drop, not a wash.",
  skills: ["percent-word-problems", "percent-of-value"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 10 — Math Module 2 (22 questions)
// Distribution: 3E / 7M / 12H (frozen). Wavy flow: easy at 1,4,20; medium at
// 2,3,6,7,12,15,16; hard at 5,8,9,10,11,13,14,17,18,19,21,22.
// Recreation notes (2026-09-01): Q1-5 warm-ups all carry 2+ steps or a trap
// under their frozen patterns — Q1 missing-LEG with the add-squares trap plus
// radical simplification (never hypotenuse-from-legs), Q4 difference-driven
// reverse percent, Q5 vertex-sign bound on a+b+c with a DOWNWARD orientation,
// Q7 rational equation whose lone root is EXCLUDED (0 solutions).
// Palette: loading ramp, laser-tag arenas, cider pressing, seedling trays,
// movie-theater concessions, soccer-field irrigation.

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Two triangular braces for a rooftop solar collector are shown, where brace $ABC$ is similar to brace $DEF$. Aluminum edging runs all the way around brace $DEF$. How many centimeters of edging does brace $DEF$ require?",
  diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[0, 0], [15, 0], [0, 8]], labels: ["A", "B", "C"], sideLabels: ["15 cm", "17 cm", "8 cm"] }, triangle2: { vertices: [[0, 0], [45, 0], [0, 24]], labels: ["D", "E", "F"], sideLabels: ["45 cm", "", ""] }, figureNote: true } },
  choices: [
    // distractor: keeps EF and FD at the small brace's 17 cm and 8 cm and scales only AB, giving 45 + 17 + 8 = 70
    { id: "A", text: "$70$" },
    // distractor: scales the two legs by 3 but leaves the hypotenuse at 17, giving 45 + 24 + 17 = 86
    { id: "B", text: "$86$" },
    { id: "C", text: "$120$" },
    // distractor: matches the 45 cm side to the 8 cm side, so the scale factor becomes 45/8 = 5.625 and the perimeter becomes 40 x 5.625 = 225
    { id: "D", text: "$225$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $\\overline{DE}$ corresponds to $\\overline{AB}$, so the scale factor is $45 \\div 15 = 3$. Perimeters scale by the same factor, so the answer is $3(8 + 15 + 17) = 120$.\n\n**The Full Solution:**\nStep 1: Brace $ABC$ is similar to brace $DEF$, so $A$, $B$, $C$ correspond to $D$, $E$, $F$ in that order. That makes $\\overline{AB}$ correspond to $\\overline{DE}$. The figure gives $AB = 15$ centimeters and $DE = 45$ centimeters, so the scale factor from $ABC$ to $DEF$ is $\\frac{45}{15} = 3$.\nStep 2: In similar figures every length is multiplied by the same factor, so the perimeter is multiplied by that factor too. The perimeter of brace $ABC$ is $8 + 15 + 17 = 40$ centimeters.\nStep 3: The perimeter of brace $DEF$ is $3(40) = 120$ centimeters. Check: scaling the sides one at a time gives $3(8) = 24$, $3(15) = 45$, and $3(17) = 51$, and $24 + 45 + 51 = 120$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($70$): replaces only $\\overline{AB}$ with $45$ and leaves the other two sides at $17$ and $8$, giving $45 + 17 + 8 = 70$. Every side of the larger brace grows, not just one.\n* Choice B ($86$): scales the two legs to $24$ and $45$ but forgets to scale the hypotenuse, giving $45 + 24 + 17 = 86$.\n* Choice D ($225$): pairs the $45$ centimeter side with the $8$ centimeter side, producing a scale factor of $\\frac{45}{8} = 5.625$ and a perimeter of $40 \\times 5.625 = 225$. Correspondence follows the letter order, not the picture.\n\n**Test Day Takeaway:** Once you have the scale factor between similar figures, apply it to the whole perimeter at once instead of rebuilding side by side — and read correspondence off the letter order in the similarity statement.",
  skills: ["similar-triangles"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "At a set of campus libraries, the average number of weekday visitors, $v$, is related to the number of study carrels, $c$, by the model $v = 25c + 175$. One library is predicted to draw $700$ weekday visitors and another is predicted to draw $450$. According to the model, how many more study carrels does the first library have than the second?",
  choices: [
    // distractor: subtracts the constant 175 from the visitor difference before dividing: (700 - 450 - 175)/25 = 3
    { id: "A", text: "$3$" },
    { id: "B", text: "$10$" },
    // distractor: reports only the first library's carrel count, (700 - 175)/25 = 21, instead of the difference
    { id: "C", text: "$21$" },
    // distractor: adds the two carrel counts instead of subtracting: 21 + 11 = 32
    { id: "D", text: "$32$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The constant $175$ cancels in a difference, so only the slope matters: $\\frac{700 - 450}{25} = 10$.\n\n**The Full Solution:**\nStep 1: Solve the model for $c$. From $v = 25c + 175$, subtract $175$ and divide by $25$ to get $c = \\frac{v - 175}{25}$.\nStep 2: For the first library, $c = \\frac{700 - 175}{25} = \\frac{525}{25} = 21$ carrels. For the second, $c = \\frac{450 - 175}{25} = \\frac{275}{25} = 11$ carrels.\nStep 3: The first library has $21 - 11 = 10$ more carrels. Check: substituting back, $25(21) + 175 = 700$ and $25(11) + 175 = 450$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): subtracts $175$ from the visitor difference before dividing, giving $\\frac{700 - 450 - 175}{25} = 3$. The constant already cancels once you take a difference; removing it a second time is a double subtraction.\n* Choice C ($21$): stops at the first library's carrel count, $\\frac{700 - 175}{25} = 21$, and never subtracts the second.\n* Choice D ($32$): adds the two carrel counts, $21 + 11 = 32$, instead of subtracting them.\n\n**Test Day Takeaway:** When a linear model is used twice and the question asks for a difference, the intercept drops out — divide the difference in outputs by the slope and you are done in one step.",
  skills: ["scatterplots", "linear-functions"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Of the $4{,}200$ students who registered for a district robotics competition, $r$ percent did not submit a project by the deadline. Of the students who did submit a project by the deadline, $40\\%$ submitted it during the first week. Which expression represents the number of students who submitted a project by the deadline but not during the first week?",
  choices: [
    // distractor: makes both slips at once: uses r as the percent who submitted and keeps the 40% first-week group, giving 4200(r/100)(0.40) = 16.8r
    { id: "A", text: "$16.8r$" },
    // distractor: keeps the correct 100 - r but counts the 40% who submitted during the first week instead of the 60% who did not, giving 16.8(100 - r)
    { id: "B", text: "$16.8(100 - r)$" },
    // distractor: uses the correct 60% but treats r as the percent who did submit rather than the percent who did not, giving 25.2r
    { id: "C", text: "$25.2r$" },
    { id: "D", text: "$25.2(100 - r)$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Complement**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Two complements stack: $(100 - r)$ percent submitted, and $60\\%$ of those missed the first week, so the count is $4{,}200 \\cdot \\frac{100 - r}{100} \\cdot 0.60 = 25.2(100 - r)$.\n\n**The Full Solution:**\nStep 1: If $r$ percent did **not** submit, then $100 - r$ percent did. The number who submitted is $4{,}200 \\cdot \\frac{100 - r}{100} = 42(100 - r)$.\nStep 2: Among those submitters, $40\\%$ turned the project in during the first week, so $100\\% - 40\\% = 60\\%$ did not. Take $60\\%$ of the Step 1 count: $0.60 \\cdot 42(100 - r) = 25.2(100 - r)$.\nStep 3: The expression is $25.2(100 - r)$. Check with a concrete value: if $r = 30$, then $70\\%$ of $4{,}200$, or $2{,}940$, submitted, and $60\\%$ of $2{,}940$ is $1{,}764$; the expression gives $25.2(100 - 30) = 25.2(70) = 1{,}764$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($16.8r$): takes $r$ percent of $4{,}200$ and then $40\\%$ of that, $4{,}200 \\cdot \\frac{r}{100} \\cdot 0.40 = 16.8r$. Both percentages are the ones the question does **not** ask about.\n* Choice B ($16.8(100 - r)$): starts the second stage from the $40\\%$ who did submit during the first week, giving $42(100 - r)(0.40) = 16.8(100 - r)$, the complement of what is wanted.\n* Choice C ($25.2r$): reads $r$ as the percent who submitted, giving $4{,}200 \\cdot \\frac{r}{100} \\cdot 0.60 = 25.2r$. The stem says $r$ percent did **not** submit.\n\n**Test Day Takeaway:** When a percent problem chains two stages, write each stage as a decimal multiplier and check which side of each \"not\" you are on before you multiply.",
  skills: ["percent-of-value"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A registrar's office projects transcript requests with $\\hat{y} = 34x + 96$, where $x$ is the number of years since $2016$. The office received $312$ requests in $2022$. By how much did the actual count exceed the projected count?",
  choices: [
    { id: "A", text: "$12$" },
    // distractor: uses x = 7 instead of x = 6, projecting 34(7) + 96 = 334 and reporting the gap of 22
    { id: "B", text: "$22$" },
    // distractor: reports the model's yearly increase, 34, instead of the gap between actual and projected
    { id: "C", text: "$34$" },
    // distractor: drops the constant 96, projecting 34(6) = 204 and reporting 312 - 204 = 108
    { id: "D", text: "$108$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Residual**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $2022$ is $6$ years after $2016$, so the projection is $34(6) + 96 = 300$, and $312 - 300 = 12$.\n\n**The Full Solution:**\nStep 1: Convert the year to the model's input. Since $x$ counts years since $2016$, the year $2022$ gives $x = 2022 - 2016 = 6$.\nStep 2: Evaluate the model at $x = 6$: $\\hat{y} = 34(6) + 96 = 204 + 96 = 300$ projected requests.\nStep 3: The actual count exceeds the projection by $312 - 300 = 12$. Check: adding the gap back to the projection returns the actual count, $300 + 12 = 312$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($22$): counts $2016$ itself as year $1$ and uses $x = 7$, projecting $34(7) + 96 = 334$ and reporting a gap of $22$. \"Years since $2016$\" makes $2016$ itself $x = 0$.\n* Choice C ($34$): reports the slope, which is how much the projection rises per year, not how far the actual count sits from the projection.\n* Choice D ($108$): uses only $34(6) = 204$ and forgets the constant $96$, giving $312 - 204 = 108$.\n\n**Test Day Takeaway:** With a \"years since\" model, first translate the calendar year into $x$, then subtract predicted from actual in the order the question names them.",
  skills: ["calculate-mean", "slope-intercept-form"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A stationery wholesaler writes every packing charge as $\\frac{c - 36x^2}{11 - 6x}$ dollars, with $x$ the order size in pallets and $c$ a fixed constant. Each of these charges reduces to the form $6x + 11$. What is $c$?",
  choices: [
    // distractor: reports the constant 11 from the denominator instead of its square
    { id: "A", text: "$11$" },
    { id: "B", text: "$121$" },
    // distractor: multiplies the coefficient 36 by 11 instead of squaring 11, giving 396
    { id: "C", text: "$396$" },
    // distractor: squares the coefficient 36 instead of the constant 11, giving 1296
    { id: "D", text: "$1{,}296$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** For the fraction to reduce to $6x + 11$, the numerator must be $(11 - 6x)(11 + 6x) = 121 - 36x^2$, so $c = 121$.\n\n**The Full Solution:**\nStep 1: If the quotient equals $6x + 11$, then multiplying back gives $c - 36x^2 = (11 - 6x)(6x + 11)$.\nStep 2: Expand the right side. Since $(11 - 6x)(11 + 6x)$ is a difference of squares, it equals $11^2 - (6x)^2 = 121 - 36x^2$.\nStep 3: Matching $c - 36x^2$ to $121 - 36x^2$ gives $c = 121$. Check at $x = 3$: the numerator is $121 - 36(9) = 121 - 324 = -203$, the denominator is $11 - 18 = -7$, and $\\frac{-203}{-7} = 29 = 6(3) + 11$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($11$): copies the constant out of the denominator. The numerator needs $11^2$, not $11$.\n* Choice C ($396$): multiplies the two visible coefficients, $36 \\times 11 = 396$, instead of squaring the constant term.\n* Choice D ($1{,}296$): squares the wrong number, $36^2 = 1{,}296$. The $36$ is already $(6)^2$ from the $x^2$ term.\n\n**Test Day Takeaway:** When a rational expression cancels to a clean binomial, the numerator is the product of the denominator and that binomial — and a sum-times-difference pairing means a difference of squares.",
  skills: ["simplifying-rational-expressions", "difference-of-squares"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table gives the monthly cost of residential electricity plan A at three usage levels, where $x$ is usage in hundreds of kilowatt-hours and $y$ is cost in dollars. Plan B's monthly cost satisfies $cx - 4y = 30$, where $c$ is a constant. For what value of $c$ do the two plans never cost the same amount?",
  questionTable: { headers: ["$x$ (hundreds of kilowatt-hours)", "$y$ (dollars)"], rows: [["$2$", "$34$"], ["$5$", "$55$"], ["$8$", "$76$"]] },
  choices: [
    // distractor: forms the proportion as 7/c = -1/4 instead of -1/-4, giving c = -28
    { id: "A", text: "$-28$" },
    // distractor: divides plan A's x-coefficient 7 by 4 instead of multiplying, giving 1.75
    { id: "B", text: "$1.75$" },
    // distractor: copies plan A's x-coefficient 7 and never accounts for the -4y term in plan B
    { id: "C", text: "$7$" },
    { id: "D", text: "$28$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** The table gives plan A a slope of $7$, so $7x - y = -20$. Parallel lines need $7(-4) = c(-1)$, so $c = 28$.\n\n**The Full Solution:**\nStep 1: Find plan A's equation from the table. The slope is $\\frac{55 - 34}{5 - 2} = \\frac{21}{3} = 7$, and $34 = 7(2) + b$ gives $b = 20$. So plan A is $y = 7x + 20$, or in standard form $7x - y = -20$. The third row checks: $7(8) + 20 = 76$.\nStep 2: Two lines $a_1x + b_1y = k_1$ and $a_2x + b_2y = k_2$ never meet exactly when $a_1b_2 = a_2b_1$ while the equations are not multiples of each other. Here $7(-4) = c(-1)$, so $-28 = -c$ and $c = 28$.\nStep 3: Confirm the lines are distinct, not identical. Multiplying $7x - y = -20$ by $4$ gives $28x - 4y = -80$, while plan B is $28x - 4y = 30$. Same left side, different right side, so the costs are never equal ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-28$): sets up the proportion as $\\frac{7}{c} = \\frac{-1}{4}$, losing the negative on the $-4y$ term, and lands on $c = -28$. With $c = -28$ the two lines have opposite slopes and do cross.\n* Choice B ($1.75$): divides $7$ by $4$ instead of multiplying, giving $1.75$. The $y$-coefficients scale by $4$, so the $x$-coefficients must scale by $4$ as well.\n* Choice C ($7$): copies plan A's $x$-coefficient straight across, which would make plan B $7x - 4y = 30$ — a line with slope $1.75$ that crosses plan A.\n\n**Test Day Takeaway:** \"Never equal\" means parallel and distinct: match the coefficient ratios, then verify the constants do **not** match, or you have described the same line instead.",
  skills: ["system-solution-types"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A pottery studio breaks even on ceramic planters at exactly two order sizes, and those two order sizes differ by $10$. Daily profit, in dollars, from $x$ planters is $-x^2 + 26x - k$, where $k$ is a positive constant. What is $k$?",
  choices: [
    { id: "A", text: "$144$" },
    // distractor: uses 13^2 = 169 as the product of the roots and never subtracts 5^2
    { id: "B", text: "$169$" },
    // distractor: multiplies the sum-related value 26 by the gap 10, giving 260
    { id: "C", text: "$260$" },
    // distractor: squares 26, giving 676
    { id: "D", text: "$676$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The break-even values are symmetric about $x = \\frac{26}{2} = 13$ and are $10$ apart, so they are $8$ and $18$; their product is $k = 144$.\n\n**The Full Solution:**\nStep 1: Break-even means profit $0$, so the two order sizes are the solutions of $-x^2 + 26x - k = 0$, or equivalently $x^2 - 26x + k = 0$. The two solutions sum to $26$ and multiply to $k$.\nStep 2: Two numbers that sum to $26$ are symmetric about $13$, so write them as $13 - d$ and $13 + d$. They differ by $2d = 10$, so $d = 5$ and the order sizes are $8$ and $18$.\nStep 3: The product of the solutions is $k = 8 \\times 18 = 144$. Check: $-x^2 + 26x - 144 = -(x - 8)(x - 18)$, which is $0$ at $x = 8$ and $x = 18$, and $18 - 8 = 10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($169$): uses $13^2 = 169$, the product you would get if the two order sizes were both $13$. That happens only when the gap is $0$; here you must subtract $5^2$, since $(13 - 5)(13 + 5) = 169 - 25 = 144$.\n* Choice C ($260$): multiplies $26$ by the gap $10$. The gap controls how far the roots sit from $13$, not a factor of $k$.\n* Choice D ($676$): squares $26$. That is the square of the sum of the roots, not their product.\n\n**Test Day Takeaway:** Two roots a fixed distance apart are $\\frac{-b}{2a} \\pm \\frac{d}{2}$; multiply them with the difference-of-squares shortcut instead of running the quadratic formula.",
  skills: ["quadratics"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A county had $512$ public charging ports in 2020, and the count $t$ years later is $512(1.44)^{t/2}$. Each year the count is $p$ percent greater than it was one year earlier. What is the value of $p$?",
  correctAnswer: "20",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**The correct answer is $20$.**\n\n**The Fast Way (~35s):** $1.44$ is the two-year factor, so the one-year factor is $\\sqrt{1.44} = 1.2$, an increase of $20\\%$.\n\n**The Full Solution:**\nStep 1: Rewrite the model so the exponent is $t$ rather than $\\frac{t}{2}$. Using $b^{t/2} = \\left(b^{1/2}\\right)^{t}$, the count is $512\\left(1.44^{1/2}\\right)^{t}$.\nStep 2: Evaluate the yearly factor: $1.44^{1/2} = \\sqrt{1.44} = 1.2$, so the model is $512(1.2)^{t}$.\nStep 3: A yearly factor of $1.2$ means each year's count is $120\\%$ of the previous year's, an increase of $20\\%$, so $p = 20$. Check: after two years the count is $512(1.2)^2 = 512(1.44) = 737.28$, which is exactly what the original model gives at $t = 2$ ✓\n\n**Common Mistakes:**\n* $44$: reads $1.44$ as the yearly percent increase. That $44\\%$ is the growth over **two** years, because the exponent is $\\frac{t}{2}$.\n* $22$: halves the $44$, as if percent growth added the way linear growth does. Growth factors are split by taking a square root, not by halving.\n* $1.2$: reports the yearly growth **factor** instead of the percent increase; the percent is $(1.2 - 1) \\times 100$.\n\n**Test Day Takeaway:** A divided exponent hides the real period — rewrite $b^{t/n}$ as $\\left(b^{1/n}\\right)^{t}$ before you read any rate off the base.",
  skills: ["exponential-growth-decay"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A campus workshop costs $\\$60$ for materials plus $\\$4.50$ for each attendee, and at least one person attends. The organizers need the average cost per attendee to stay below $\\$7.20$. Which statement about the number of attendees, $n$, is true?",
  choices: [
    // distractor: solves n > 22.2 correctly but rounds down to 22; at n = 22 the cost per attendee is about $7.23, still above the $7.20 ceiling
    { id: "A", text: "The least possible value of $n$ is $22$." },
    { id: "B", text: "The least possible value of $n$ is $23$." },
    // distractor: reverses the inequality to n < 22.2 and reports 22 as a maximum
    { id: "C", text: "The greatest possible value of $n$ is $22$." },
    // distractor: reverses the inequality and then rounds up, reporting 23 as a maximum
    { id: "D", text: "The greatest possible value of $n$ is $23$." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\frac{60 + 4.5n}{n} < 7.2$ becomes $60 < 2.7n$, so $n > 22.\\overline{2}$ and the first whole number that works is $23$.\n\n**The Full Solution:**\nStep 1: The total cost of the workshop is $60 + 4.5n$ dollars, so the cost per attendee is $\\frac{60 + 4.5n}{n}$, and the requirement is $\\frac{60 + 4.5n}{n} < 7.2$.\nStep 2: Because at least one person attends, $n$ is positive, so multiplying both sides by $n$ keeps the direction: $60 + 4.5n < 7.2n$. Subtracting $4.5n$ gives $60 < 2.7n$, and dividing by $2.7$ gives $n > 22.\\overline{2}$.\nStep 3: The smallest integer greater than $22.\\overline{2}$ is $23$, and there is no upper limit, since more attendees only spread the $\\$60$ further. Check: at $n = 23$ the cost per attendee is $\\frac{60 + 103.50}{23} = \\frac{163.50}{23} \\approx \\$7.11$, which is below $\\$7.20$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($22$ as a least value): rounds $22.\\overline{2}$ down. At $n = 22$ the cost per attendee is $\\frac{60 + 99}{22} \\approx \\$7.23$, which is above the ceiling, so $22$ does not satisfy the condition.\n* Choice C ($22$ as a greatest value): reads the inequality backwards as $n < 22.\\overline{2}$. Multiplying by a positive $n$ never flips the sign.\n* Choice D ($23$ as a greatest value): reverses the direction and then rounds up, pairing the right number with the wrong word. Adding attendees drives the per-person cost down, so there is no maximum.\n\n**Test Day Takeaway:** After you isolate the variable, say the inequality out loud before rounding — \"greater than $22.2$\" rounds **up** to $23$, and only a negative multiplier flips the sign.",
  skills: ["inequalities"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A supplier's spreadsheet assigns each batch of $n$ canvas totes the handling value $k = \\frac{n^2 - 19n + 84}{n - 12}$, where the batch size $n$ is an integer that is at least $8$ and is not equal to $12$. Which of the following statements about $k$ is true?",
  choices: [
    { id: "A", text: "No batch size produces $k = 5$." },
    // distractor: reports the zero of the surviving factor n - 7 instead of the value k takes at the excluded batch size; k = 7 does occur, at n = 14
    { id: "B", text: "No batch size produces $k = 7$." },
    // distractor: reports the excluded batch size 12 itself rather than the k it would have produced; k = 12 does occur, at n = 19
    { id: "C", text: "No batch size produces $k = 12$." },
    // distractor: reports the constant term 84 from the numerator; k = 84 does occur, at n = 91
    { id: "D", text: "No batch size produces $k = 84$." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The numerator factors as $(n - 12)(n - 7)$, so $k = n - 7$ for every allowed $n$. The one output that is out of reach is the one at the banned $n = 12$, namely $k = 5$.\n\n**The Full Solution:**\nStep 1: Factor the numerator. Two numbers multiplying to $84$ and adding to $-19$ are $-12$ and $-7$, so $n^2 - 19n + 84 = (n - 12)(n - 7)$.\nStep 2: Cancel the common factor: $\\frac{(n - 12)(n - 7)}{n - 12} = n - 7$ for every $n \\neq 12$. So the equation is really $k = n - 7$, but with $n = 12$ removed from the domain.\nStep 3: The value $k$ would take at the missing input is $12 - 7 = 5$, so $k = 5$ has no allowed batch size behind it. Every other value is reachable, since $k = n - 7$ can be solved for $n = k + 7$. Check: $k = 5$ forces $n = 12$, which the stem excludes ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($k = 7$): grabs the $7$ out of the surviving factor $n - 7$. That $7$ is a value of $n$, not of $k$; setting $n = 14$ gives $k = 7$, so this value is perfectly reachable.\n* Choice C ($k = 12$): reports the excluded input instead of the output it would have produced. Setting $n = 19$ gives $k = 12$.\n* Choice D ($k = 84$): copies the constant term of the numerator. Setting $n = 91$ gives $k = 84$.\n\n**Test Day Takeaway:** After a factor cancels, the simplified equation is still missing one input — the unreachable output is what the simplified form returns at the value the domain forbids.",
  skills: ["rational-expressions"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A utility crew mapped two straight water mains that cross at point $T$ and recorded three of the angle measures, in degrees, at that crossing. What is the sum $x + y$?",
  diagram: { type: "intersectingLines", params: { angles: ["(4x + 5)°", "(2y + 7)°", "(6x - 15)°", ""], figureNote: true } },
  choices: [
    // distractor: solves x = 10 correctly but treats (2y + 7) as vertical to (4x + 5), getting 2y + 7 = 45 and y = 19, for 10 + 19 = 29
    { id: "A", text: "$29$" },
    // distractor: makes both slips: treats the vertical pair as supplementary (x = 19) and the supplementary pair as vertical (y = 19), for 19 + 19 = 38
    { id: "B", text: "$38$" },
    { id: "C", text: "$74$" },
    // distractor: treats (4x + 5) and (6x - 15) as supplementary instead of vertical, getting 10x - 10 = 180 and x = 19, for 19 + 64 = 83
    { id: "D", text: "$83$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The two opposite angles are equal, so $4x + 5 = 6x - 15$ gives $x = 10$ and an angle of $45^\\circ$; the adjacent angle is $135^\\circ$, so $2y + 7 = 135$ and $y = 64$. The sum is $74$.\n\n**The Full Solution:**\nStep 1: The $(4x + 5)^\\circ$ angle and the $(6x - 15)^\\circ$ angle sit opposite each other at $T$, so they are vertical angles and are equal: $4x + 5 = 6x - 15$. Subtracting $4x$ and adding $15$ gives $20 = 2x$, so $x = 10$.\nStep 2: That angle measures $4(10) + 5 = 45^\\circ$, and the check on the other expression agrees: $6(10) - 15 = 45^\\circ$.\nStep 3: The $(2y + 7)^\\circ$ angle is adjacent to the $45^\\circ$ angle along a straight main, so the two are supplementary: $2y + 7 = 180 - 45 = 135$, giving $2y = 128$ and $y = 64$. Then $x + y = 10 + 64 = 74$. Check: the four angles are $45^\\circ$, $135^\\circ$, $45^\\circ$, and $135^\\circ$, which total $360^\\circ$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($29$): finds $x = 10$ but then treats the $(2y + 7)^\\circ$ angle as equal to the $45^\\circ$ angle, giving $y = 19$ and $10 + 19 = 29$. Angles on the same side of a line add to $180^\\circ$; only opposite angles are equal.\n* Choice B ($38$): swaps both relationships, solving $4x + 5 + 6x - 15 = 180$ for $x = 19$ and $2y + 7 = 45$ for $y = 19$, giving $38$.\n* Choice D ($83$): treats the opposite pair as supplementary, $10x - 10 = 180$, so $x = 19$, then keeps the correct $y = 64$ for $19 + 64 = 83$.\n\n**Test Day Takeaway:** At a crossing, opposite angles are equal and neighbouring angles add to $180^\\circ$ — decide which pair you are looking at before writing the equation, since the figure is not drawn to scale.",
  skills: ["angles"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Minutes spent in a language lab last week were recorded for a random sample of $180$ enrolled students at a college. The sample mean was $47$ minutes and the margin of error was $6$ minutes. Which statement about the mean for all enrolled students is most plausible?",
  choices: [
    // distractor: subtracts the margin of error but never adds it, giving 41 to 47
    { id: "A", text: "It is between $41$ and $47$ minutes." },
    { id: "B", text: "It is between $41$ and $53$ minutes." },
    // distractor: uses half the margin of error, 3, giving 44 to 50
    { id: "C", text: "It is between $44$ and $50$ minutes." },
    // distractor: adds the margin of error but never subtracts it, giving 47 to 53
    { id: "D", text: "It is between $47$ and $53$ minutes." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Margin of Error**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Plausible values run from $47 - 6$ to $47 + 6$, that is, $41$ to $53$ minutes.\n\n**The Full Solution:**\nStep 1: A margin of error surrounds the sample mean on both sides, so the plausible interval for the population mean is (sample mean) $-$ (margin) to (sample mean) $+$ (margin).\nStep 2: Here the sample mean is $47$ minutes and the margin is $6$ minutes, so the lower bound is $47 - 6 = 41$ and the upper bound is $47 + 6 = 53$.\nStep 3: The plausible interval is $41$ to $53$ minutes. Check: the interval is centred on $47$ and is $12$ minutes wide, which is twice the $6$-minute margin ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($41$ to $47$): subtracts the margin but stops the interval at the sample mean, using only half the range.\n* Choice C ($44$ to $50$): applies $3$ minutes on each side, as if the margin of error had to be split in half. The stated margin already applies to each side.\n* Choice D ($47$ to $53$): adds the margin but never subtracts it, again keeping only half the interval.\n\n**Test Day Takeaway:** A margin of error is a radius, not a diameter — subtract it once and add it once, and the interval always ends up centred on the sample statistic.",
  skills: ["margin-of-error"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A rural electric co-op's equipment reserve grows by $5\\%$ of its value each year, with no deposits or withdrawals, and it held $\\$8{,}000$ at the start of 2024. How many dollars larger is the reserve at the start of 2027 than at the start of 2026?",
  correctAnswer: "441",
  explanation: "**SAT Pattern: Compound Interest**\n\n**The correct answer is $441$.**\n\n**The Fast Way (~35s):** The 2026 balance is $8000(1.05)^2 = 8820$, and one more year adds $5\\%$ of that: $0.05(8820) = 441$.\n\n**The Full Solution:**\nStep 1: Growing by $5\\%$ each year multiplies the reserve by $1.05$ annually, so the balance $t$ years after the start of 2024 is $8000(1.05)^{t}$.\nStep 2: The start of 2026 is $t = 2$: $8000(1.05)^2 = 8000(1.1025) = \\$8{,}820$. The start of 2027 is $t = 3$: $8000(1.05)^3 = 8000(1.157625) = \\$9{,}261$.\nStep 3: The difference is $9261 - 8820 = \\$441$. Check: that year's growth should be $5\\%$ of the 2026 balance, and $0.05(8820) = 441$ ✓\n\n**Common Mistakes:**\n* $400$: takes $5\\%$ of the original $\\$8{,}000$. That is the growth in the **first** year; each later year grows on a larger balance.\n* $1{,}261$: reports the total growth from 2024 to 2027, $9261 - 8000$, instead of the growth in the single year the question names.\n* $420$: takes $5\\%$ of the 2025 balance $\\$8{,}400$, which is the growth during 2025 rather than during 2026.\n\n**Test Day Takeaway:** With compound growth, a \"how much did it grow this year\" question is the rate times the balance at the **start** of that year — count the exponents carefully before you subtract.",
  skills: ["exponential-functions"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A town counted $160$ household battery systems in 2019 and $810$ of them in 2023. If the count grew exponentially at a constant rate over those years, how many household battery systems did the town count in 2021?",
  correctAnswer: "360",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $360$.**\n\n**The Fast Way (~40s):** Four years multiplies the count by $\\frac{810}{160} = 5.0625$, so two years multiplies it by $\\sqrt{5.0625} = 2.25$, and $160(2.25) = 360$.\n\n**The Full Solution:**\nStep 1: Exponential growth multiplies by the same factor over equal time spans. Let $R$ be the factor for a two-year span. From 2019 to 2023 is two such spans, so $160R^2 = 810$.\nStep 2: Then $R^2 = \\frac{810}{160} = 5.0625$, so $R = \\sqrt{5.0625} = 2.25$.\nStep 3: 2021 is one two-year span after 2019, so the count is $160(2.25) = 360$. Check: applying the same factor once more gives $360(2.25) = 810$, the 2023 count ✓\n\n**Common Mistakes:**\n* $485$: averages the two counts, $\\frac{160 + 810}{2}$. Averaging places the middle value halfway by subtraction, but an exponential model spaces values by multiplication.\n* $405$: halves the 2023 count, as if the count doubled every two years. The two-year factor here is $2.25$, not $2$.\n* $240$: finds the yearly factor $\\sqrt{2.25} = 1.5$ but applies it only once, landing on 2020.\n\n**Test Day Takeaway:** To land in the middle of an exponential span, take the square root of the overall factor — halving the endpoint or averaging the two counts is linear thinking and always lands too high.",
  skills: ["exponential-growth-decay"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An adviser converts a student's raw score $t$ into a placement index $I$ using $I = \\frac{4t + 9}{5}$. Which expression is equal to $8t + 18$?",
  choices: [
    // distractor: substitutes I for 4t + 9 and forgets that I is that quantity divided by 5, giving 2I
    { id: "A", text: "$2I$" },
    // distractor: gets 5I = 4t + 9 but then adds 9 to reach 8t + 18 instead of doubling, giving 5I + 9
    { id: "B", text: "$5I + 9$" },
    // distractor: solves t = (5I - 9)/4 and substitutes but drops the +18 at the end, giving 10I - 18
    { id: "C", text: "$10I - 18$" },
    { id: "D", text: "$10I$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Shifted Output**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** $8t + 18 = 2(4t + 9)$, and $4t + 9 = 5I$, so the expression is $2(5I) = 10I$.\n\n**The Full Solution:**\nStep 1: Notice that the target expression is a multiple of the numerator in the definition: $8t + 18 = 2(4t + 9)$.\nStep 2: Clear the denominator in the definition. Multiplying $I = \\frac{4t + 9}{5}$ by $5$ gives $4t + 9 = 5I$.\nStep 3: Substitute: $8t + 18 = 2(4t + 9) = 2(5I) = 10I$. Check with a value: if $t = 4$, then $I = \\frac{16 + 9}{5} = 5$, and $8(4) + 18 = 50 = 10(5)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2I$): replaces $4t + 9$ with $I$ rather than with $5I$, throwing away the division by $5$. At $t = 4$ this gives $10$, not $50$.\n* Choice B ($5I + 9$): reaches $4t + 9 = 5I$ and then adds another $9$, as if $8t + 18$ came from adding to $4t + 9$ instead of doubling it. At $t = 4$ this gives $34$.\n* Choice C ($10I - 18$): solves for $t = \\frac{5I - 9}{4}$, computes $8t = 10I - 18$, and then forgets the $+18$ still waiting in the expression. At $t = 4$ this gives $32$.\n\n**Test Day Takeaway:** Before solving for the variable, ask whether the target expression is just a multiple of the one you already have — spotting $8t + 18 = 2(4t + 9)$ turns three lines of algebra into one.",
  skills: ["solving-equations", "ratios"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table gives four values of the quadratic function $p$, which has a leading coefficient of $2$ and models a distributor's weekly margin, in hundreds of dollars, on $x$ pallets of bottled olive oil. If $x - 2$ is a factor of $p(x)$, which of the following is also a factor of $p(x)$?",
  questionTable: { headers: ["$x$", "$p(x)$"], rows: [["$0$", "$24$"], ["$1$", "$10$"], ["$2$", "$0$"], ["$4$", "$-8$"]] },
  choices: [
    // distractor: reads the table value p(0) = 24 as a zero of p and writes x - 24
    { id: "A", text: "$x - 24$" },
    // distractor: solves (0 - 2)(0 - r) = 24 without the leading coefficient 2, getting r = 12
    { id: "B", text: "$x - 12$" },
    { id: "C", text: "$x - 6$" },
    // distractor: finds r = 6 but writes the factor with the wrong sign, x + 6
    { id: "D", text: "$x + 6$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Write $p(x) = 2(x - 2)(x - r)$. The table gives $p(0) = 24$, so $2(-2)(-r) = 4r = 24$ and $r = 6$; the other factor is $x - 6$.\n\n**The Full Solution:**\nStep 1: A quadratic with leading coefficient $2$ and a factor of $x - 2$ can be written $p(x) = 2(x - 2)(x - r)$, where $r$ is the second zero.\nStep 2: Use a value from the table that is easy to substitute. At $x = 0$ the table gives $p(0) = 24$, so $2(0 - 2)(0 - r) = 24$, which is $2(-2)(-r) = 4r = 24$, so $r = 6$.\nStep 3: The second factor is $x - 6$. Check the rest of the table with $p(x) = 2(x - 2)(x - 6) = 2x^2 - 16x + 24$: $p(1) = 2 - 16 + 24 = 10$, $p(2) = 8 - 32 + 24 = 0$, and $p(4) = 32 - 64 + 24 = -8$, all matching ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($x - 24$): treats the output $24$ as an input where $p$ is zero. The table shows $p(0) = 24$, which says the graph passes through $(0, 24)$, not that $24$ is a zero.\n* Choice B ($x - 12$): leaves out the leading coefficient, solving $(0 - 2)(0 - r) = 24$ to get $r = 12$. Substituting $x = 0$ into $2(x - 2)(x - 12)$ gives $48$, not $24$.\n* Choice D ($x + 6$): gets the right zero but flips the sign. A zero at $x = 6$ corresponds to the factor $x - 6$; $x + 6$ would put a zero at $x = -6$, where $2(-6-2)(-6-6) = 192 \\neq 0$ compared with the table.\n\n**Test Day Takeaway:** Build the factored form with the leading coefficient in front, then plug in the single easiest table value — $x = 0$ usually turns the whole equation into one multiplication.",
  skills: ["finding-roots-factoring"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "During a drought, the volume of water stored in a reservoir $m$ months after the drought began is modeled by $V(m) = 74{,}000(0.8)^{m/5}$, where $V(m)$ is measured in acre-feet. Which statement best describes how the stored volume changes?",
  choices: [
    { id: "A", text: "Every $5$ months, the stored volume is $80\\%$ of what it was $5$ months earlier." },
    // distractor: reads the base 0.8 as the fraction lost rather than the fraction kept; an 80% decrease would leave 20% and require a base of 0.2
    { id: "B", text: "Every $5$ months, the stored volume decreases by $80\\%$." },
    // distractor: ignores the division by 5 in the exponent and applies the factor 0.8 every single month
    { id: "C", text: "Each month, the stored volume is $80\\%$ of what it was the previous month." },
    // distractor: swaps the roles of the base and the 5 in the exponent, reporting a 5% monthly decrease
    { id: "D", text: "Each month, the stored volume decreases by $5\\%$." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The exponent $\\frac{m}{5}$ increases by $1$ every $5$ months, and each time it does the volume is multiplied by the base $0.8$ — that is, it becomes $80\\%$ of what it was.\n\n**The Full Solution:**\nStep 1: In a model of the form $a \\cdot b^{m/n}$, the base $b$ is the factor applied once every $n$ units of $m$. Here $b = 0.8$ and $n = 5$, so the factor $0.8$ applies once every $5$ months.\nStep 2: Multiplying by $0.8$ means the new volume is $80\\%$ of the old volume, which is the same as a $20\\%$ decrease — not an $80\\%$ decrease.\nStep 3: So every $5$ months the reservoir holds $80\\%$ of what it held $5$ months earlier. Check: $V(0) = 74{,}000$ and $V(5) = 74{,}000(0.8)^{1} = 59{,}200$, and $\\frac{59{,}200}{74{,}000} = 0.8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (decreases by $80\\%$ every $5$ months): mistakes the multiplier for the loss. A drop of $80\\%$ would leave only $20\\%$, which would need a base of $0.2$; here $V(5) = 59{,}200$, a loss of $20\\%$.\n* Choice C ($80\\%$ each month): drops the $\\div 5$ in the exponent. That model would give $V(5) = 74{,}000(0.8)^5 \\approx 24{,}248$, far below the actual $59{,}200$.\n* Choice D (decreases by $5\\%$ each month): pulls the $5$ out of the exponent and reads it as a percent. The $5$ is a length of time, not a rate.\n\n**Test Day Takeaway:** In $a \\cdot b^{m/n}$, the base tells you the fraction that **remains** and the denominator tells you how long it takes — \"is $80\\%$ of\" and \"decreases by $80\\%$\" are opposite readings of the same number.",
  skills: ["exponential-growth-decay"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For each of two electives at a high school, the table gives the number of eleventh graders and the number of twelfth graders enrolled. One student will be chosen at random from those enrolled in debate, and the probability that this student is an eleventh grader is $0.6$. What is the value of $n$?",
  questionTable: { headers: ["", "Photography", "Debate"], rows: [["Eleventh grade", "$44$", "$n$"], ["Twelfth grade", "$35$", "$48$"]] },
  choices: [
    // distractor: uses the complement 0.4 in place of 0.6, solving n/(n + 48) = 0.4 to get 32
    { id: "A", text: "$32$" },
    // distractor: computes the probability that an eleventh grader is enrolled in debate, solving n/(44 + n) = 0.6 to get 66
    { id: "B", text: "$66$" },
    { id: "C", text: "$72$" },
    // distractor: solves n = 0.6n + 48, forgetting to multiply the 48 by 0.6, and gets 120
    { id: "D", text: "$120$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The condition restricts us to the debate column, so $\\frac{n}{n + 48} = 0.6$; cross-multiplying gives $0.4n = 28.8$ and $n = 72$.\n\n**The Full Solution:**\nStep 1: \"Given that the student is enrolled in debate\" makes the debate column the whole sample space. That column holds $n$ eleventh graders and $48$ twelfth graders, so it has $n + 48$ students. The photography column plays no part.\nStep 2: The probability that the chosen debate student is an eleventh grader is $\\frac{n}{n + 48}$, and the stem sets this equal to $0.6$. Multiplying both sides by $n + 48$ gives $n = 0.6n + 28.8$.\nStep 3: Subtracting $0.6n$ leaves $0.4n = 28.8$, so $n = 72$. Check: the debate column would then hold $72 + 48 = 120$ students, and $\\frac{72}{120} = 0.6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): solves with $0.4$, the probability of the twelfth-grade outcome, giving $\\frac{n}{n + 48} = 0.4$ and $n = 32$. Then $\\frac{32}{80} = 0.4$, the complement of what was asked.\n* Choice B ($66$): reverses the condition and asks what fraction of eleventh graders chose debate, solving $\\frac{n}{44 + n} = 0.6$ for $n = 66$. That uses the eleventh-grade **row**, not the debate column.\n* Choice D ($120$): multiplies $0.6$ by $n$ but not by $48$, solving $n = 0.6n + 48$ for $n = 120$. That value is the size of the whole debate column, not the eleventh-grade part of it.\n\n**Test Day Takeaway:** A conditional probability lives entirely inside one row or one column — circle that line of the table first, and the numbers outside it stop being distractions.",
  skills: ["conditional-probability", "two-way-table"]
},
{
  id: 19,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A city models the gap, in millions of gallons, between its projected water supply and its projected water demand $x$ months from now as $3x^2 - kx + 27$, where $k$ is a positive constant. The projected gap equals zero for exactly one value of $x$. What is the value of $k$?",
  correctAnswer: "18",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is $18$.**\n\n**The Fast Way (~35s):** One real solution means the discriminant is zero: $k^2 - 4(3)(27) = 0$, so $k^2 = 324$ and, since $k$ is positive, $k = 18$.\n\n**The Full Solution:**\nStep 1: Setting the gap to zero gives the quadratic equation $3x^2 - kx + 27 = 0$, with $a = 3$, $b = -k$, and $c = 27$.\nStep 2: A quadratic has exactly one real solution precisely when its discriminant $b^2 - 4ac$ equals $0$. Here $(-k)^2 - 4(3)(27) = k^2 - 324 = 0$, so $k^2 = 324$ and $k = \\pm 18$.\nStep 3: The stem says $k$ is positive, so $k = 18$. Check: $3x^2 - 18x + 27 = 3(x^2 - 6x + 9) = 3(x - 3)^2$, which is zero only at $x = 3$ ✓\n\n**Common Mistakes:**\n* $324$: stops at $k^2 = 324$ and reports the square rather than taking the square root.\n* $9$: leaves the factor $4$ out of $b^2 - 4ac$, solving $k^2 = 3 \\times 27 = 81$ and getting $k = 9$. With $k = 9$ the discriminant is $81 - 324 = -243$, so the gap is never zero.\n* $-18$: takes the negative square root and ignores the stem's condition that $k$ is positive.\n\n**Test Day Takeaway:** \"Exactly one solution\" is the discriminant-equals-zero signal — write $b^2 - 4ac = 0$ immediately, then let any sign condition in the stem pick between the two roots.",
  skills: ["discriminant-analysis"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A kitchen-supply store's cast-iron skillet now sells for $\\$67.10$, which is $22\\%$ more than it sold for last season. To the nearest cent, what was last season's selling price, in dollars?",
  choices: [
    // distractor: reads a 22% increase as multiplying by 2.2 and divides 67.10 by 2.2, getting 30.50
    { id: "A", text: "$30.50$" },
    // distractor: subtracts $22 instead of 22 percent, giving 67.10 - 22 = 45.10
    { id: "B", text: "$45.10$" },
    // distractor: takes 78% of 67.10 instead of dividing by 1.22, giving 52.34
    { id: "C", text: "$52.34$" },
    { id: "D", text: "$55.00$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Increase**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The new price is $122\\%$ of the old one, so divide: $\\frac{67.10}{1.22} = 55.00$.\n\n**The Full Solution:**\nStep 1: Let $P$ be last season's price. A $22\\%$ increase multiplies $P$ by $1 + 0.22 = 1.22$, so $1.22P = 67.10$.\nStep 2: Divide both sides by $1.22$: $P = \\frac{67.10}{1.22} = 55.00$.\nStep 3: Last season's price was $\\$55.00$. Check: $22\\%$ of $55$ is $12.10$, and $55.00 + 12.10 = 67.10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($30.50$): treats \"$22\\%$ more\" as \"$2.2$ times as much\" and divides by $2.2$. A $22\\%$ increase is a factor of $1.22$; $2.2$ would be a $120\\%$ increase.\n* Choice B ($45.10$): subtracts $\\$22$ rather than $22\\%$. The percent applies to the old price, not to a fixed number of dollars.\n* Choice C ($52.34$): takes $78\\%$ of the new price. Reversing a $22\\%$ increase means dividing by $1.22$, not subtracting $22\\%$ of the larger amount; $52.34$ increased by $22\\%$ comes to about $\\$63.85$.\n\n**Test Day Takeaway:** To undo a percent increase you divide by the growth factor — subtracting the same percent from the new amount always overshoots, because the percent was taken of the smaller original.",
  skills: ["percent-of-value", "percent-change"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The figure shows the cross section of a parabolic solar reflector, modeled by $y = x^2 - 8x + 24$. A rod running along $y = 2x + c$ just grazes that cross section, meeting it once and never crossing it. What is the value of $c$?",
  diagram: { type: "parabola", params: { vertex: { h: 4, k: 8 }, a: 1, xRange: [-1, 9], yRange: [0, 28], showVertex: false, gridInterval: 2, xTickInterval: 2, yTickInterval: 4 } },
  correctAnswer: "-1",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $-1$.**\n\n**The Fast Way (~40s):** Setting the two expressions equal gives $x^2 - 10x + (24 - c) = 0$; one intersection means the discriminant is zero, so $100 - 4(24 - c) = 0$ and $c = -1$.\n\n**The Full Solution:**\nStep 1: The rod meets the cross section where $x^2 - 8x + 24 = 2x + c$. Bringing everything to one side gives $x^2 - 10x + (24 - c) = 0$.\nStep 2: \"Meets it once and never crosses it\" means this quadratic has exactly one real solution, so its discriminant is zero: $(-10)^2 - 4(1)(24 - c) = 0$, that is, $100 - 96 + 4c = 0$.\nStep 3: Solving $4 + 4c = 0$ gives $4c = -4$ and $c = -1$. Check: with $c = -1$ the equation becomes $x^2 - 10x + 25 = (x - 5)^2 = 0$, a single solution at $x = 5$, where the parabola gives $25 - 40 + 24 = 9$ and the rod gives $2(5) - 1 = 9$ — the same point ✓\n\n**Common Mistakes:**\n* $1$: reaches $4c = -4$ but reports the value without its negative sign.\n* $9$: reports the $y$-coordinate of the point where the rod touches the reflector, $(5, 9)$, instead of where the rod's line crosses the $y$-axis.\n* $24$: copies the constant term from the reflector's equation. That is where the **parabola** meets the $y$-axis, not the rod.\n\n**Test Day Takeaway:** A line that touches a curve exactly once turns into a quadratic with a zero discriminant — set the two expressions equal, collect terms, and solve $b^2 - 4ac = 0$ for the unknown constant.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A smart meter's firmware computes $\\frac{4^{x+3}}{8^{x-1}} \\cdot 2^{x}$ to size a log buffer, where $x$ is the whole number of days the log covers. The result equals $2^m$ for a constant $m$ and for every value of $x$. What is the value of $m$?",
  correctAnswer: "9",
  explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~40s):** Rewrite everything in base $2$: $\\frac{2^{2x+6}}{2^{3x-3}} \\cdot 2^{x} = 2^{(2x+6)-(3x-3)+x} = 2^{9}$.\n\n**The Full Solution:**\nStep 1: Convert each factor to base $2$. Since $4 = 2^2$, $4^{x+3} = 2^{2(x+3)} = 2^{2x+6}$. Since $8 = 2^3$, $8^{x-1} = 2^{3(x-1)} = 2^{3x-3}$.\nStep 2: Dividing subtracts exponents and multiplying adds them, so the whole expression is $2^{(2x+6) - (3x-3) + x}$.\nStep 3: Simplify the exponent: $(2x + 6) - (3x - 3) + x = 2x + 6 - 3x + 3 + x = 9$, so the result is $2^{9}$ and $m = 9$. Check at $x = 1$: $\\frac{4^{4}}{8^{0}} \\cdot 2^{1} = 256 \\cdot 2 = 512 = 2^{9}$ ✓\n\n**Common Mistakes:**\n* $3$: writes $8^{x-1}$ as $2^{3x-3}$ but subtracts it as $3x + 3$, leaving $2^{-x+3} \\cdot 2^{x} = 2^{3}$. Subtracting a difference flips both signs.\n* $6$: writes $4^{x+3}$ as $2^{2x+3}$, multiplying only the $x$ by $2$ and leaving the $3$ alone, which gives an exponent of $6$.\n* $7$: writes $8^{x-1}$ as $2^{3x-1}$, multiplying only the $x$ by $3$, which gives an exponent of $7$.\n\n**Test Day Takeaway:** Put every term over the same base before touching the exponents, then distribute carefully — if the $x$ terms cancel, the expression was designed to be constant.",
  skills: ["exponent-laws"]
}
      ]
    }
  ]
};

export default practiceTest10;
