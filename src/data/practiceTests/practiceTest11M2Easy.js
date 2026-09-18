// Practice Test 11 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Official-calibration recreation (2026-09-01): fresh content authored per
// docs/TEST_RECREATION_SPEC.md against the CB Educator QBank register.
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen. 4 diagram
// items (triangle, bar graph, line graph, right triangle). Numeric MC
// choices sorted ascending. Palette: ropes courses, vending machines,
// camera-equipment rental, seed-drill calibration, hotel linen laundry,
// elevator load limits.

export const practiceTest11M2Easy = {
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
      question: "A shear produces scrap at the rate $d(x) = 2(x - 3)^2 + 1$ kilograms per hour when it runs at $x$ strokes per second, as the graph shows. Which expression is equivalent to $d(x)$?",
      diagram: { type: "parabola", params: { vertex: { h: 3, k: 1 }, a: 2, xRange: [1, 5], yRange: [0, 10], xTickInterval: 1, yTickInterval: 2, gridInterval: 1, showVertex: false } },
      choices: [
        // distractor: keeps +1 as the entire constant term, dropping the 2 times 9 = 18 produced by squaring (x - 3)
        { id: "A", text: "$2x^2 - 12x + 1$" },
        // distractor: adds 9 + 1 = 10 without first multiplying the 9 by 2
        { id: "B", text: "$2x^2 - 12x + 10$" },
        // distractor: distributes the 2 to the squared and constant terms only, leaving the middle term at -6x
        { id: "C", text: "$2x^2 - 6x + 19$" },
        { id: "D", text: "$2x^2 - 12x + 19$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** Square the binomial and distribute the $2$: $2(x^2 - 6x + 9) + 1$ becomes $2x^2 - 12x + 18 + 1$.\n\n**The Full Solution:**\nStep 1: Expand the squared binomial: $(x - 3)^2 = x^2 - 6x + 9$.\nStep 2: Multiply every term of that trinomial by $2$: $2x^2 - 12x + 18$.\nStep 3: Add the outside constant: $2x^2 - 12x + 18 + 1 = 2x^2 - 12x + 19$. Check at $x = 5$: the given form gives $2(2)^2 + 1 = 9$ and the answer gives $2(25) - 12(5) + 19 = 9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x^2 - 12x + 1$): keeps $+1$ as the whole constant term and throws away the $2 \\cdot 9 = 18$ that the square produces; at $x = 5$ this gives $-9$, not $9$.\n* Choice B ($2x^2 - 12x + 10$): adds $9 + 1 = 10$ before multiplying the $9$ by $2$, so the constant is short by $9$.\n* Choice C ($2x^2 - 6x + 19$): distributes the $2$ to $x^2$ and to the constant but not to $-6x$, leaving a middle term half as large as it should be.\n\n**Test Day Takeaway:** Expand the square first, then multiply the whole trinomial by the leading coefficient — every term inside the parentheses gets it, not just the ones that are easy to see.",
      skills: ["distributive-property", "converting-quadratic-forms"]
    },
    {
      id: 2,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "Three steel disks and two brass disks have a combined mass of $1{,}260$ grams, and three steel disks and five brass disks have a combined mass of $1{,}710$ grams. All steel disks have the same mass, and all brass disks have the same mass. What is the mass, in grams, of one brass disk?",
      choices: [
        { id: "A", text: "$150$" },
        // distractor: divides the 450-gram difference by 2, the number of brass disks in the first weighing, instead of by the 3 brass disks the difference represents
        { id: "B", text: "$225$" },
        // distractor: solves for the mass of one steel disk instead of one brass disk
        { id: "C", text: "$320$" },
        // distractor: stops at 3b = 450 and never divides by 3
        { id: "D", text: "$450$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Both weighings contain three steel disks, so subtracting them cancels the steel: $3$ extra brass disks account for $1{,}710 - 1{,}260 = 450$ grams, or $150$ grams each.\n\n**The Full Solution:**\nStep 1: Let $s$ be the mass of one steel disk and $b$ the mass of one brass disk: $3s + 2b = 1{,}260$ and $3s + 5b = 1{,}710$.\nStep 2: Subtract the first equation from the second. The $3s$ terms cancel, leaving $3b = 450$, so $b = 150$.\nStep 3: Back-substitute: $3s + 2(150) = 1{,}260$ gives $3s = 960$ and $s = 320$. Check the second weighing: $3(320) + 5(150) = 960 + 750 = 1{,}710$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($225$): divides the $450$-gram difference by $2$ instead of $3$; the difference between the weighings is three brass disks, not two.\n* Choice C ($320$): this is the mass of one steel disk — the value you get after back-substituting, not the value the question asks for.\n* Choice D ($450$): stops at $3b = 450$, reporting the mass of all three extra brass disks.\n\n**Test Day Takeaway:** When two equations share an identical term, subtract them on sight — elimination is faster than substitution, and the leftover coefficient tells you what to divide by.",
      skills: ["elimination-method", "setting-up-systems"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A triangular brace is cut from flat stock so that its two perpendicular edges measure $a$ inches and $a\\sqrt{3}$ inches, where $a > 0$. Which expression gives the area of the brace, in square inches?",
      choices: [
        // distractor: halves one edge before substituting it into the area formula, so the factor one-half is applied twice
        { id: "A", text: "$\\dfrac{a^2\\sqrt{3}}{4}$" },
        { id: "B", text: "$\\dfrac{a^2\\sqrt{3}}{2}$" },
        // distractor: replaces the radical with 3, squaring the square root instead of carrying it
        { id: "C", text: "$\\dfrac{3a^2}{2}$" },
        // distractor: multiplies the two perpendicular edges but omits the one-half in the triangle area formula
        { id: "D", text: "$a^2\\sqrt{3}$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The two perpendicular edges are the legs, so the area is $\\frac{1}{2}(a)(a\\sqrt{3}) = \\frac{a^2\\sqrt{3}}{2}$.\n\n**The Full Solution:**\nStep 1: Perpendicular edges of a triangle are its base and height, so area $= \\frac{1}{2}(\\text{base})(\\text{height})$.\nStep 2: Substitute the given lengths: $\\frac{1}{2}(a)(a\\sqrt{3})$.\nStep 3: Multiply the coefficients and keep the radical intact: $\\frac{a^2\\sqrt{3}}{2}$. Check with $a = 2$: the legs are $2$ and $2\\sqrt{3} \\approx 3.46$, giving an area of about $3.46$, and $\\frac{4\\sqrt{3}}{2} \\approx 3.46$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{a^2\\sqrt{3}}{4}$): halves one leg before substituting it and then halves again in the formula, so the factor $\\frac{1}{2}$ is applied twice; with $a = 2$ it gives about $1.73$, exactly half the true area.\n* Choice C ($\\frac{3a^2}{2}$): turns $\\sqrt{3}$ into $3$; a square root is only squared when it is multiplied by itself, and here it is multiplied by $a$.\n* Choice D ($a^2\\sqrt{3}$): this is the area of the rectangle with those two edges — twice the triangle.\n\n**Test Day Takeaway:** A radical in a leg length changes nothing about the method: multiply the coefficients, leave the radical alone, and keep the one-half.",
      skills: ["triangle-area"]
    },
    // ============================================================
    // Q4-Q16: Medium core (band 4-5)
    // ============================================================
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A monthly budget assigns $x$ dollars to transit and $3x$ dollars to rent, and those two categories together account for $\\$1{,}596$ of the month's spending. What is the value of $x$?",
      choices: [
        { id: "A", text: "$399$" },
        // distractor: divides the total by 3, using only the coefficient of the rent term
        { id: "B", text: "$532$" },
        // distractor: divides the total by 2, treating the two categories as equal amounts
        { id: "C", text: "$798$" },
        // distractor: reports the rent, 3x, instead of the value of x
        { id: "D", text: "$1{,}197$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The two categories are $x + 3x = 4x$ dollars, so $4x = 1{,}596$ and $x = 399$.\n\n**The Full Solution:**\nStep 1: Translate the sentence: transit plus rent is $x + 3x$, and that total is $1{,}596$.\nStep 2: Combine like terms on the left: $4x = 1{,}596$.\nStep 3: Divide both sides by $4$: $x = 399$. Check: transit is $\\$399$, rent is $3(399) = \\$1{,}197$, and $399 + 1{,}197 = 1{,}596$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($532$): divides $1{,}596$ by $3$, using the rent coefficient alone and ignoring the transit dollar.\n* Choice C ($798$): divides by $2$ because there are two categories, which would be right only if the categories were equal.\n* Choice D ($1{,}197$): this is the rent, $3x$ — the largest piece of the total, but not what the question defines as $x$.\n\n**Test Day Takeaway:** Combine the like terms before dividing; the number you divide by is the total count of $x$'s, not the count of categories.",
      skills: ["combining-like-terms"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The resistance of a sensing element changes linearly with temperature: it measures $4{,}120$ ohms at $15$ degrees Celsius and $3{,}040$ ohms at $42$ degrees Celsius. Which equation gives the resistance $R$, in ohms, at a temperature of $t$ degrees Celsius?",
      choices: [
        // distractor: subtracts 40 times 15 from 4,120 instead of adding it back when solving for the intercept
        { id: "A", text: "$R = -40t + 3{,}520$" },
        // distractor: uses the resistance measured at 15 degrees as the value at 0 degrees
        { id: "B", text: "$R = -40t + 4{,}120$" },
        { id: "C", text: "$R = -40t + 4{,}720$" },
        // distractor: reverses the order of the points in the slope quotient, getting +40, and then solves for the intercept
        { id: "D", text: "$R = 40t + 3{,}520$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The resistance falls $1{,}080$ ohms over $27$ degrees, so the slope is $-40$; running back the $15$ degrees to $t = 0$ adds $600$ ohms, giving $R = -40t + 4{,}720$.\n\n**The Full Solution:**\nStep 1: Treat the measurements as points $(15,\\ 4{,}120)$ and $(42,\\ 3{,}040)$ and compute the slope: $\\frac{3{,}040 - 4{,}120}{42 - 15} = \\frac{-1{,}080}{27} = -40$.\nStep 2: Substitute one point into $R = -40t + b$: $4{,}120 = -40(15) + b$, so $b = 4{,}120 + 600 = 4{,}720$.\nStep 3: Write the equation: $R = -40t + 4{,}720$. Check the second measurement: $-40(42) + 4{,}720 = -1{,}680 + 4{,}720 = 3{,}040$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($R = -40t + 3{,}520$): subtracts $600$ from $4{,}120$ instead of adding it; moving backward along a falling line raises the value.\n* Choice B ($R = -40t + 4{,}120$): treats the $15$-degree reading as the reading at $0$ degrees, so the whole line sits $600$ ohms too low.\n* Choice D ($R = 40t + 3{,}520$): computes the slope as $\\frac{4{,}120 - 3{,}040}{42 - 15} = 40$, which makes resistance rise with temperature — the opposite of the data.\n\n**Test Day Takeaway:** Keep the two points in the same order top and bottom of the slope fraction, then solve for the intercept with a point rather than assuming the first measurement happens at zero.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A coil of steel strip holds enough material for several stamped parts, and the table lists the length remaining, in meters, after four different numbers of parts. The remaining length is the linear function $f$ of the number of parts stamped, $x$. What is $f(16)$?",
      diagram: { type: "dataTable", params: { headers: ["Parts stamped, x", "Length remaining (meters)"], rows: [["2", "47"], ["5", "38"], ["8", "29"], ["11", "20"]] } },
      correctAnswer: "5",
      explanation: "**SAT Pattern: Function Evaluation**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~25s):** Each row advances $3$ parts and drops $9$ meters, so each part uses $3$ meters; from $20$ meters at $11$ parts, five more parts remove $15$ meters, leaving $5$.\n\n**The Full Solution:**\nStep 1: Find the rate: between $x = 2$ and $x = 5$ the length falls from $47$ to $38$, a drop of $9$ meters over $3$ parts, so the slope is $-3$ meters per part.\nStep 2: Write the rule: $f(x) = -3x + b$, and $47 = -3(2) + b$ gives $b = 53$, so $f(x) = -3x + 53$.\nStep 3: Evaluate at $x = 16$: $f(16) = -3(16) + 53 = -48 + 53 = 5$. Check the rule against a listed row: $f(8) = -24 + 53 = 29$ ✓\n\n**Common Mistakes:**\n* $-79$: using the $9$-meter drop between rows as the drop per part, which gives $f(x) = -9x + 65$ and $f(16) = -79$; the rows step by $3$ parts, not $1$.\n* $11$: evaluating $f(14)$ — one more table row past $11$ — instead of $f(16)$.\n* $-1$: taking $47$ as the starting length at $x = 0$ and writing $f(x) = -3x + 47$; the $47$ belongs to $x = 2$.\n\n**Test Day Takeaway:** With a table, get the rate from the change in outputs divided by the change in inputs, then anchor the rule on one row before evaluating anywhere else.",
      skills: ["function-evaluation"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A shipment contains $24$ crates of machined pins, each crate holding either $18$ pins or $30$ pins, and the shipment holds $552$ pins in all. How many of the crates hold $30$ pins?",
      choices: [
        // distractor: divides the 120-pin excess by 30 instead of by the 12-pin difference between the two crate sizes
        { id: "A", text: "$4$" },
        { id: "B", text: "$10$" },
        // distractor: answers the number of 18-pin crates instead of the number of 30-pin crates
        { id: "C", text: "$14$" },
        // distractor: divides 552 pins by 24 crates and reports the 23-pin average as a count of crates
        { id: "D", text: "$23$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** If all $24$ crates held $18$ pins the shipment would have $432$ pins; the extra $120$ pins come from swapping in $30$-pin crates, each swap adding $12$ pins, so $120 \\div 12 = 10$ crates.\n\n**The Full Solution:**\nStep 1: Let $x$ be the number of $18$-pin crates and $y$ the number of $30$-pin crates: $x + y = 24$ and $18x + 30y = 552$.\nStep 2: Substitute $x = 24 - y$ into the second equation: $18(24 - y) + 30y = 552$, or $432 + 12y = 552$.\nStep 3: Solve: $12y = 120$, so $y = 10$ and $x = 14$. Check: $14(18) + 10(30) = 252 + 300 = 552$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): divides the $120$-pin excess by $30$ rather than by $12$; the excess is created $12$ pins at a time, not $30$.\n* Choice C ($14$): the number of $18$-pin crates, the other variable in the system.\n* Choice D ($23$): $552 \\div 24 = 23$ is the average number of pins per crate, a pin count rather than a crate count.\n\n**Test Day Takeaway:** For a two-size counting problem, assume every item is the smaller size first; the leftover divided by the size difference is the count of larger items.",
      skills: ["word-problem-to-equation", "setting-up-systems"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Two hairline scribes on a layout plate meet at a right angle. One scribe lies along $y = \\frac{3}{4}x + 2$, and the other passes through a punch mark at $(6, 5)$. Which equation represents the second scribe?",
      choices: [
        // distractor: reuses the slope 3/4, giving a scribe parallel to the first rather than perpendicular to it
        { id: "A", text: "$y = \\frac{3}{4}x + \\frac{1}{2}$" },
        // distractor: inverts the slope to 4/3 but never negates it
        { id: "B", text: "$y = \\frac{4}{3}x - 3$" },
        // distractor: negates the slope to -3/4 but never inverts it
        { id: "C", text: "$y = -\\frac{3}{4}x + \\frac{19}{2}$" },
        { id: "D", text: "$y = -\\frac{4}{3}x + 13$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Perpendicular means the negative reciprocal of $\\frac{3}{4}$, which is $-\\frac{4}{3}$; through $(6, 5)$ the intercept is $5 + 8 = 13$.\n\n**The Full Solution:**\nStep 1: The first scribe has slope $\\frac{3}{4}$, so the perpendicular scribe has slope $-\\frac{4}{3}$ — flip the fraction and change the sign.\nStep 2: Substitute the point into $y = -\\frac{4}{3}x + b$: $5 = -\\frac{4}{3}(6) + b = -8 + b$.\nStep 3: Solve for the intercept: $b = 13$, so $y = -\\frac{4}{3}x + 13$. Check at $x = 6$: $-8 + 13 = 5$ ✓, and $\\frac{3}{4} \\cdot \\left(-\\frac{4}{3}\\right) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = \\frac{3}{4}x + \\frac{1}{2}$): keeps the slope $\\frac{3}{4}$, which describes a scribe parallel to the first, so the two would never meet.\n* Choice B ($y = \\frac{4}{3}x - 3$): flips the fraction but leaves it positive; the product of the slopes is $+1$, not $-1$.\n* Choice C ($y = -\\frac{3}{4}x + \\frac{19}{2}$): changes the sign but not the fraction, giving a slope product of $-\\frac{9}{16}$.\n\n**Test Day Takeaway:** Perpendicular slopes need both moves — flip and negate — and only then do you substitute the point to find the intercept.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 9,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The model $\\hat{P} = 0.85m + 14.2$ estimates the chamber pressure, in kilopascals, from the mass flow rate $m$, in grams per second. At $m = 26$ the pressure measured in the chamber was $37.7$ kilopascals. Which statement describes the model's estimate at $m = 26$?",
      choices: [
        // distractor: subtracts in the wrong order, predicted minus measured, reversing the direction of the miss
        { id: "A", text: "The model overestimates the measured pressure by $1.4$ kilopascals." },
        { id: "B", text: "The model underestimates the measured pressure by $1.4$ kilopascals." },
        // distractor: leaves out the constant 14.2, predicting 22.1 instead of 36.3
        { id: "C", text: "The model underestimates the measured pressure by $15.6$ kilopascals." },
        // distractor: uses only the constant 14.2 as the prediction, ignoring the 0.85m term
        { id: "D", text: "The model underestimates the measured pressure by $23.5$ kilopascals." }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Residual**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The model predicts $0.85(26) + 14.2 = 36.3$, and the chamber actually read $37.7$, so the measurement sits $1.4$ above the model.\n\n**The Full Solution:**\nStep 1: Evaluate the model at $m = 26$: $0.85(26) = 22.1$, and $22.1 + 14.2 = 36.3$ kilopascals.\nStep 2: Compare measured with predicted: $37.7 - 36.3 = 1.4$ kilopascals, a positive difference.\nStep 3: Interpret the sign. A positive measured-minus-predicted difference means the model's value is too small, so the model underestimates by $1.4$. Check: $36.3 + 1.4 = 37.7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (overestimates by $1.4$): the size is right but the direction is backwards; subtract measured minus predicted, not predicted minus measured.\n* Choice C (underestimates by $15.6$): drops the constant and predicts $22.1$, giving $37.7 - 22.1 = 15.6$.\n* Choice D (underestimates by $23.5$): uses $14.2$ alone as the prediction, giving $37.7 - 14.2 = 23.5$.\n\n**Test Day Takeaway:** Always compute measured minus predicted, in that order — the sign of that difference is what tells you whether the model runs low or high.",
      skills: ["calculate-mean", "slope-intercept-form"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A redesign that switched the alloy reduced the mass of a cast bracket used on an assembly arm from $2{,}500$ grams to $1{,}900$ grams. Which statement correctly describes the change in the bracket's mass?",
      choices: [
        // distractor: moves the decimal point one place when converting the ratio 0.24 to a percent
        { id: "A", text: "The mass decreased by about $2.4\\%$." },
        { id: "B", text: "The mass decreased by about $24\\%$." },
        // distractor: divides the 600-gram decrease by the new mass, 1,900, instead of by the original 2,500
        { id: "C", text: "The mass decreased by about $32\\%$." },
        // distractor: reports the percent of the original mass that remains rather than the percent removed
        { id: "D", text: "The mass decreased by about $76\\%$." }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The drop is $600$ grams out of the original $2{,}500$, and $\\frac{600}{2{,}500} = 0.24$, or $24\\%$.\n\n**The Full Solution:**\nStep 1: Find the amount of change: $2{,}500 - 1{,}900 = 600$ grams.\nStep 2: Divide by the ORIGINAL amount, because percent change is always measured against where you started: $\\frac{600}{2{,}500} = 0.24$.\nStep 3: Convert to a percent: $0.24 = 24\\%$. Check: $2{,}500 - 0.24(2{,}500) = 2{,}500 - 600 = 1{,}900$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.4\\%$): the ratio $0.24$ becomes $24\\%$, not $2.4\\%$; a $2.4\\%$ cut would remove only $60$ grams.\n* Choice C ($32\\%$): divides $600$ by the new mass $1{,}900$; that ratio answers \"the old mass is what percent more than the new,\" a different question.\n* Choice D ($76\\%$): $\\frac{1{,}900}{2{,}500} = 76\\%$ is the share of the mass that is still there, not the share that was removed.\n\n**Test Day Takeaway:** Percent change is change over the ORIGINAL value; check your answer by applying the percent back to the starting number.",
      skills: ["percent-change"]
    },
    {
      id: 11,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The table gives the number of relays built on each of two assembly lines, classified by whether the relay passed a continuity check. Two of the rejected relays are chosen at random, one after the other, without replacement. What is the probability that both were built on Line 1?",
      diagram: { type: "twoWayTable", params: { headers: ["", "Passed", "Rejected", "Total"], rows: [["Line 1", "18", "6", "24"], ["Line 2", "10", "6", "16"], ["Total", "28", "12", "40"]] } },
      correctAnswer: "5/22",
      explanation: "**SAT Pattern: Probability Without Replacement**\n\n**The correct answer is $\\frac{5}{22}$.**\n\n**The Fast Way (~30s):** Only the $12$ rejected relays are in play, $6$ of them from Line 1: $\\frac{6}{12} \\cdot \\frac{5}{11} = \\frac{5}{22}$.\n\n**The Full Solution:**\nStep 1: Restrict to the group the question names. The rejected column totals $12$ relays, of which $6$ came from Line 1.\nStep 2: First draw: $\\frac{6}{12} = \\frac{1}{2}$.\nStep 3: Second draw, with the first relay gone: $5$ Line 1 relays remain among $11$ rejected relays, so $\\frac{5}{11}$. Multiply: $\\frac{1}{2} \\cdot \\frac{5}{11} = \\frac{5}{22}$. Check: $\\frac{5}{22} \\approx 0.227$, a little below the $0.25$ you would get if the relay were replaced ✓\n\n**Common Mistakes:**\n* $\\frac{1}{4}$: multiplying $\\frac{6}{12} \\cdot \\frac{6}{12}$, which is the with-replacement probability; the first relay is not put back.\n* $\\frac{1}{52}$: using all $40$ relays as the pool, $\\frac{6}{40} \\cdot \\frac{5}{39}$, instead of only the $12$ rejected ones.\n* $\\frac{21}{22}$: adding $\\frac{6}{12} + \\frac{5}{11}$; \"both\" events call for multiplication, not addition.\n\n**Test Day Takeaway:** Read the conditioning phrase first — it fixes the pool — then drop the numerator and the denominator by one for the second draw.",
      skills: ["probability-basics"]
    },
    {
      id: 12,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "An equipment loan is repaid on a schedule for which the amount still owed, in dollars, after $m$ months equals $9{,}250 - 385m$. Which of the following describes the meaning of $385$ in that expression?",
      choices: [
        // distractor: mistakes the coefficient of m for the constant term 9,250
        { id: "A", text: "The amount, in dollars, owed when the loan began." },
        // distractor: ignores the minus sign in front of 385 and reads the balance as growing
        { id: "B", text: "The amount, in dollars, by which the amount owed increases each month." },
        // distractor: reads 385 as a count of months rather than a rate in dollars per month; the balance actually reaches zero after about 24 months
        { id: "C", text: "The number of months needed to repay the loan." },
        { id: "D", text: "The amount, in dollars, by which the amount owed decreases each month." }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $385$ multiplies $m$ and carries a minus sign, so it is the dollars removed from the balance per month.\n\n**The Full Solution:**\nStep 1: Match the expression to $y = b + mx$ form: the constant $9{,}250$ is the starting balance and $-385$ is the rate of change per month.\nStep 2: Read the units of the rate: dollars per month, since $385$ multiplies a number of months and the result is in dollars.\nStep 3: Read the sign: the term is subtracted, so each additional month lowers the balance by $\\$385$. Check: after $1$ month the balance is $9{,}250 - 385 = \\$8{,}865$, exactly $\\$385$ less ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: the amount owed at the start is the constant $9{,}250$, the value of the expression when $m = 0$.\n* Choice B: the sign is part of the meaning; because $385m$ is subtracted, the balance falls rather than rises.\n* Choice C: $385$ counts dollars, not months; the balance hits zero near $m = 24$, since $9{,}250 \\div 385 \\approx 24$.\n\n**Test Day Takeaway:** The number attached to the variable is a rate — say it with its units and its sign, and the correct interpretation writes itself.",
      skills: ["slope-intercept-form"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The energy a furnace uses per firing cycle rose from $65$ kilowatt-hours to $91$ kilowatt-hours after a larger crucible was installed in it. Which statement correctly compares the energy used per cycle before and after the change?",
      choices: [
        // distractor: reports the raw difference of 26 kilowatt-hours as if it were a percent
        { id: "A", text: "$91$ is $26\\%$ greater than $65$." },
        // distractor: divides the 26-unit increase by the new amount, 91, instead of by the original 65
        { id: "B", text: "$91$ is $29\\%$ greater than $65$." },
        { id: "C", text: "$91$ is $40\\%$ greater than $65$." },
        // distractor: reports the ratio 91/65 = 140% without subtracting the original 100%
        { id: "D", text: "$91$ is $140\\%$ greater than $65$." }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Percent Increase**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The rise is $26$ kilowatt-hours on a base of $65$, and $\\frac{26}{65} = 0.4$, so the new figure is $40\\%$ greater.\n\n**The Full Solution:**\nStep 1: Find the increase: $91 - 65 = 26$ kilowatt-hours.\nStep 2: Divide by the original amount: $\\frac{26}{65} = 0.40$.\nStep 3: Convert to a percent: $0.40 = 40\\%$. Check: $65 + 0.40(65) = 65 + 26 = 91$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($26\\%$): uses the difference itself as a percent; $26\\%$ of $65$ is only about $16.9$ kilowatt-hours.\n* Choice B ($29\\%$): divides $26$ by the new value $91$; percent increase is always measured against the starting value.\n* Choice D ($140\\%$): $\\frac{91}{65} = 1.40$ says $91$ is $140\\%$ OF $65$, which is $40\\%$ GREATER than $65$.\n\n**Test Day Takeaway:** \"Percent of\" and \"percent greater than\" differ by exactly $100\\%$ — decide which phrase the question uses before you divide.",
      skills: ["percent-of-value", "percent-change"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "During a calibration run at the meter's outlet, a flow meter's reading $q$, in liters per second, satisfies $7q + 23 = 100$. What is the value of the expression $7q - 9$?",
      choices: [
        { id: "A", text: "$68$" },
        // distractor: stops at 7q = 77 and never subtracts the 9
        { id: "B", text: "$77$" },
        // distractor: adds 9 to 77 instead of subtracting it
        { id: "C", text: "$86$" },
        // distractor: subtracts 9 from the total 100 instead of from 7q
        { id: "D", text: "$91$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Shifted Output**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The expression asked for is $32$ less than the given left side, so subtract $32$ from $100$: $7q - 9 = 68$.\n\n**The Full Solution:**\nStep 1: Isolate the shared piece rather than the variable: $7q + 23 = 100$ gives $7q = 77$.\nStep 2: Build the requested expression from it: $7q - 9 = 77 - 9$.\nStep 3: Evaluate: $7q - 9 = 68$. Check by solving outright: $q = 11$, so $7(11) - 9 = 77 - 9 = 68$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($77$): the value of $7q$ itself; the question shifts that value down by $9$.\n* Choice C ($86$): adds the $9$ instead of subtracting it, moving in the wrong direction.\n* Choice D ($91$): subtracts $9$ from $100$, but the $100$ still contains the $+23$ that has to come off first.\n\n**Test Day Takeaway:** When the question asks for an expression rather than the variable, isolate that whole expression — solving for $q$ is legal but slower.",
      skills: ["solving-equations", "ratios"]
    },
    {
      id: 15,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A triangular gusset with sides of $9$ centimeters and $15$ centimeters is enlarged to a similar gusset whose side corresponding to the $9$-centimeter side measures $24$ centimeters. How long, in centimeters, is the enlarged gusset's side corresponding to the $15$-centimeter side?",
      correctAnswer: "40",
      explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is $40$.**\n\n**The Fast Way (~25s):** The enlargement multiplies every side by $\\frac{24}{9} = \\frac{8}{3}$, so $15 \\cdot \\frac{8}{3} = 40$.\n\n**The Full Solution:**\nStep 1: Similar figures have proportional corresponding sides, so $\\frac{9}{24} = \\frac{15}{w}$, where $w$ is the length asked for.\nStep 2: Cross-multiply: $9w = 15 \\cdot 24 = 360$.\nStep 3: Solve: $w = 40$ centimeters. Check the two ratios: $\\frac{24}{9} \\approx 2.67$ and $\\frac{40}{15} \\approx 2.67$ ✓\n\n**Common Mistakes:**\n* $30$: adding the $15$-centimeter growth of the first side to the second side; similarity scales by multiplication, not by a constant addition.\n* $5.625$: setting up the proportion upside down as $\\frac{9}{24} = \\frac{w}{15}$, which shrinks the figure instead of enlarging it.\n* $14.4$: pairing the $24$-centimeter side with the $15$-centimeter side, so the $24$ is matched to the wrong original side.\n\n**Test Day Takeaway:** Write the proportion with matching triangles on matching sides of the equation, then sanity-check the scale factor: an enlargement must make every side longer.",
      skills: ["similar-triangles"]
    },
    {
      id: 16,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The table lists four readings of a load cell, with the reading $g(x)$, in millivolts, linear in the applied mass $x$, in kilograms. The reading can be written as $g(x) = a(x - 5) + b$ for constants $a$ and $b$. What is the value of $a + b$?",
      diagram: { type: "dataTable", params: { headers: ["Applied mass x (kilograms)", "Reading g(x) (millivolts)"], rows: [["0", "3"], ["1", "7"], ["2", "11"], ["3", "15"]] } },
      choices: [
        // distractor: expands a(x - 5) + b as ax + b + 5a, so the constant equation becomes b + 20 = 3 and b = -17
        { id: "A", text: "$-13$" },
        // distractor: takes b to be the reading at x = 0, which is 3, instead of the reading at x = 5
        { id: "B", text: "$7$" },
        // distractor: takes b to be the reading in the last row, at x = 3, instead of the reading at x = 5
        { id: "C", text: "$19$" },
        { id: "D", text: "$27$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Each kilogram adds $4$ millivolts, so $a = 4$; the form $a(x - 5) + b$ makes $b$ the reading at $x = 5$, which is $4(5) + 3 = 23$, and $4 + 23 = 27$.\n\n**The Full Solution:**\nStep 1: The readings rise $4$ millivolts per kilogram and start at $3$, so $g(x) = 4x + 3$.\nStep 2: Expand the target form and match coefficients: $a(x - 5) + b = ax + (b - 5a)$, so $a = 4$ and $b - 5(4) = 3$.\nStep 3: Solve the constant equation: $b = 23$, so $a + b = 27$. Check: $4(x - 5) + 23 = 4x - 20 + 23 = 4x + 3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-13$): distributes $a$ over $x - 5$ as $ax + 5a$, dropping the minus sign, which gives $b = -17$.\n* Choice B ($7$): reads $b$ off the table as the value at $x = 0$; in this form the constant is the output at $x = 5$, not at $x = 0$.\n* Choice C ($19$): uses the last listed reading, $15$, as $b$; the table stops at $x = 3$, so $b$ has to be extended, not read.\n\n**Test Day Takeaway:** Expand the shifted form, line up the $x$ coefficients and the constants separately, and remember that $a(x - h) + b$ makes $b$ the output at $x = h$.",
      skills: ["distributive-property"]
    },
    // ============================================================
    // Q17-Q22: Medium-hard ceiling (band 6-7)
    // ============================================================
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A family phone plan's monthly rate was reduced by $12\\%$, and a fixed $\\$9.50$ device-support fee was then added to the reduced rate, giving a monthly charge of $\\$255.90$ for the first full month at the new rate. Which expression gives the plan's monthly rate, in dollars, before the reduction?",
      choices: [
        // distractor: divides by 1.12, as if the reduced rate were 12 percent above the original rather than 12 percent below it
        { id: "A", text: "$\\dfrac{255.90 - 9.50}{1.12}$" },
        // distractor: undoes a 12 percent decrease by applying a 12 percent increase, which lands 1.44 percent short
        { id: "B", text: "$1.12(255.90 - 9.50)$" },
        { id: "C", text: "$\\dfrac{255.90 - 9.50}{0.88}$" },
        // distractor: adds the 9.50 fee back instead of removing it before undoing the reduction
        { id: "D", text: "$\\dfrac{255.90 + 9.50}{0.88}$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Strip the fee first, leaving $255.90 - 9.50$, which is $88\\%$ of the original rate, so divide by $0.88$.\n\n**The Full Solution:**\nStep 1: Undo the last step first. The fee was added at the end, so the reduced rate is $255.90 - 9.50 = 246.40$ dollars.\nStep 2: A $12\\%$ reduction leaves $100\\% - 12\\% = 88\\%$ of the original, so if $r$ is the original rate, $0.88r = 246.40$.\nStep 3: Solve: $r = \\frac{246.40}{0.88} = \\frac{255.90 - 9.50}{0.88} = 280$. Check forward: $0.88(280) = 246.40$, and $246.40 + 9.50 = 255.90$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($220$): divides by $1.12$, the multiplier for a $12\\%$ increase; here the rate went down, so the multiplier is $0.88$.\n* Choice B ($275.97$): multiplies by $1.12$ to reverse a $12\\%$ cut, but percent changes are not undone by the same percent — $0.88 \\times 1.12 = 0.9856$, not $1$.\n* Choice D ($301.59$): adds the $\\$9.50$ fee instead of subtracting it, so the percent step is applied to a charge that is $\\$19$ too large.\n\n**Test Day Takeaway:** Undo the steps in reverse order, and reverse a percent change by DIVIDING by its multiplier — never by applying the same percent the other way.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 18,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "On a coating line, one applicator uses $0.6$ gram of primer per part plus $45$ grams for setup, and a second applicator uses $0.85$ gram per part with no setup. The two applicators use the same total mass of primer for a run of $n$ parts. What is that total mass, in grams?",
      choices: [
        // distractor: divides the 45-gram setup by 0.6 instead of by the 0.25-gram-per-part difference, getting 75 parts, then adds the setup
        { id: "A", text: "$90$" },
        // distractor: multiplies the correct run of 180 parts by 0.6 but leaves out the 45-gram setup mass
        { id: "B", text: "$108$" },
        { id: "C", text: "$153$" },
        // distractor: reports the number of parts in the run instead of the mass of primer
        { id: "D", text: "$180$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The second applicator gains $0.25$ gram per part on the first, so it needs $45 \\div 0.25 = 180$ parts to make up the setup; $0.85(180) = 153$ grams.\n\n**The Full Solution:**\nStep 1: Write both totals for a run of $n$ parts: $0.6n + 45$ grams and $0.85n$ grams.\nStep 2: Set them equal and solve: $0.6n + 45 = 0.85n$, so $45 = 0.25n$ and $n = 180$ parts.\nStep 3: The question asks for the mass, not the run: $0.6(180) + 45 = 108 + 45 = 153$ grams. Check the other applicator: $0.85(180) = 153$ grams ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($90$): divides $45$ by $0.6$ to get $75$ parts; the setup is made up at the RATE DIFFERENCE of $0.25$ gram per part, not at one applicator's rate.\n* Choice B ($108$): computes $0.6(180)$ and forgets the $45$ grams of setup that are part of the first applicator's total.\n* Choice D ($180$): the number of parts in the run — the value of $n$, which is the step before the answer.\n\n**Test Day Takeaway:** After solving an equal-cost equation, reread the question: the variable you solved for is usually not the quantity being asked for.",
      skills: ["solving-equations"]
    },
    {
      id: 19,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "A drilled pilot hole at $(5, -2)$ lies halfway along the segment joining an anchor bolt at $(a, 7)$ to an anchor bolt at $(12, b)$, where every position is measured in centimeters on a survey grid. What is the value of $a + b$?",
      correctAnswer: "-13",
      explanation: "**SAT Pattern: Midpoint Formula**\n\n**The correct answer is $-13$.**\n\n**The Fast Way (~30s):** Each midpoint coordinate is the average of the endpoints, so $a = 2(5) - 12 = -2$ and $b = 2(-2) - 7 = -11$, giving $-13$.\n\n**The Full Solution:**\nStep 1: Write the midpoint conditions: $\\frac{a + 12}{2} = 5$ and $\\frac{7 + b}{2} = -2$.\nStep 2: Clear each denominator: $a + 12 = 10$ and $7 + b = -4$.\nStep 3: Solve: $a = -2$ and $b = -11$, so $a + b = -13$. Check the midpoint of $(-2, 7)$ and $(12, -11)$: $\\left(\\frac{-2 + 12}{2}, \\frac{7 - 11}{2}\\right) = (5, -2)$ ✓\n\n**Common Mistakes:**\n* $11$: averaging the numbers that are already given, $\\frac{5 + 12}{2}$ and $\\frac{-2 + 7}{2}$, instead of solving backward for the missing coordinates.\n* $-16$: subtracting without doubling, using $a = 5 - 12$ and $b = -2 - 7$; the midpoint equals the SUM of the endpoints divided by two, so the sum is twice the midpoint.\n* $1$: sign-slipping on the $y$ equation to $b = 2(-2) + 7 = 3$, which places the midpoint at $y = 5$ instead of $y = -2$.\n\n**Test Day Takeaway:** Read the midpoint formula backward as \"endpoint $=$ twice the midpoint minus the other endpoint,\" and always verify by re-averaging the two endpoints you end up with.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "Of the $900$ measurements logged by a torque sensor, the probability that a randomly selected measurement is within tolerance is $0.86$, and the probability that a randomly selected measurement is both within tolerance and from the night shift is $0.22$. Which statement must be true?",
      choices: [
        // distractor: uses 1 - 0.86 = 0.14, the probability of being out of tolerance, in place of the 0.22 joint probability
        { id: "A", text: "Exactly $126$ of the measurements were within tolerance and from the night shift." },
        { id: "B", text: "Exactly $198$ of the measurements were within tolerance and from the night shift." },
        // distractor: subtracts 0.22 from 0.86 and reads the result as the night-shift share; that 0.64 counts the in-tolerance measurements NOT from the night shift
        { id: "C", text: "Exactly $576$ of the measurements were from the night shift." },
        // distractor: applies the 0.86 within-tolerance probability to the joint event
        { id: "D", text: "Exactly $774$ of the measurements were within tolerance and from the night shift." }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Basic Probability**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** A probability times the group size is a count: $0.22 \\times 900 = 198$ measurements are both within tolerance and from the night shift.\n\n**The Full Solution:**\nStep 1: Identify what each probability counts. The $0.86$ describes one event, within tolerance; the $0.22$ describes the overlap of two events, within tolerance AND night shift.\nStep 2: Convert the overlap probability to a count: $0.22(900) = 198$.\nStep 3: Test the other statements. The night-shift total is unknown, because nothing is given about night-shift measurements that fall outside tolerance, so only the overlap count is forced. Check: $0.86(900) = 774$ measurements are within tolerance, and $198$ of those $774$ are from the night shift, which is consistent ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($126$): uses $1 - 0.86 = 0.14$; that fraction counts measurements OUT of tolerance, not the overlap.\n* Choice C ($576$): comes from $(0.86 - 0.22)(900)$, which counts measurements within tolerance that are NOT from the night shift; the night-shift total cannot be determined from what is given.\n* Choice D ($774$): applies the within-tolerance probability to the two-event overlap, counting every in-tolerance measurement as a night-shift measurement.\n\n**Test Day Takeaway:** On a must-be-true probability question, name the event each number belongs to before multiplying by the total — a joint probability never describes either event on its own.",
      skills: ["probability-basics"]
    },
    {
      id: 21,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "The table lists four deviations of a ground surface from a reference plane, in micrometers, measured at positions $x$ centimeters from a reference mark on the surface. The deviations satisfy $f(x) = 3x^2 + bx + c$ for constants $b$ and $c$. What is the value of $b + c$?",
      diagram: { type: "dataTable", params: { headers: ["Position x (centimeters)", "Deviation f(x) (micrometers)"], rows: [["1", "0"], ["2", "-6"], ["3", "-6"], ["4", "0"]] } },
      choices: [
        // distractor: takes c to be the product of the zeros, 4, instead of 3 times that product, 12
        { id: "A", text: "$-11$" },
        { id: "B", text: "$-3$" },
        // distractor: takes b to be the negative of the sum of the zeros, -5, instead of -3 times the sum
        { id: "C", text: "$7$" },
        // distractor: reverses the sign relating the sum of the zeros to b, using b = +15
        { id: "D", text: "$27$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The deviation is $0$ at $x = 1$ and $x = 4$, so for $3x^2 + bx + c$ the zeros sum to $-\\frac{b}{3} = 5$ and multiply to $\\frac{c}{3} = 4$, giving $b = -15$, $c = 12$, and $b + c = -3$.\n\n**The Full Solution:**\nStep 1: Read the zeros from the table: $f(1) = 0$ and $f(4) = 0$, so $1$ and $4$ are the solutions of $3x^2 + bx + c = 0$.\nStep 2: Apply the sum and product relationships for $ax^2 + bx + c$ with $a = 3$: the sum of the solutions is $-\\frac{b}{3}$, so $1 + 4 = -\\frac{b}{3}$ and $b = -15$; the product is $\\frac{c}{3}$, so $1 \\cdot 4 = \\frac{c}{3}$ and $c = 12$.\nStep 3: Add: $b + c = -15 + 12 = -3$. Check against a row the zeros did not supply: $f(2) = 3(4) - 15(2) + 12 = 12 - 30 + 12 = -6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-11$): sets $c$ equal to the product of the zeros, $4$; the product equals $\\frac{c}{a}$, so $c$ is $3$ times as large.\n* Choice C ($7$): sets $b$ equal to $-(1 + 4) = -5$; the sum equals $-\\frac{b}{a}$, so $b$ is $3$ times as large in magnitude.\n* Choice D ($27$): uses $b = +15$, which would put the zeros at negative positions and make $f(2)$ positive instead of $-6$.\n\n**Test Day Takeaway:** Vieta's relationships carry the leading coefficient: the sum of the roots is $-\\frac{b}{a}$ and the product is $\\frac{c}{a}$, so never read $b$ and $c$ straight off the roots when $a \\ne 1$.",
      skills: ["quadratic-factoring"]
    },
    {
      id: 22,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "Two reference marks on a cable profile sit at $(-2, 17)$ and $(k, 5)$, with both coordinates measured in millimeters, and between the marks the profile drops $4$ millimeters for every $7$ millimeters of horizontal travel. What is the value of $k$?",
      correctAnswer: "19",
      explanation: "**SAT Pattern: Slope from Two Points**\n\n**The correct answer is $19$.**\n\n**The Fast Way (~30s):** The profile falls $12$ millimeters between the marks, and at $4$ down per $7$ across that takes $21$ millimeters of run, so $k = -2 + 21 = 19$.\n\n**The Full Solution:**\nStep 1: Turn the description into a slope: dropping $4$ for every $7$ across means slope $-\\frac{4}{7}$.\nStep 2: Set up the slope from the two marks: $\\frac{5 - 17}{k - (-2)} = -\\frac{4}{7}$, or $\\frac{-12}{k + 2} = -\\frac{4}{7}$.\nStep 3: Cross-multiply: $-12(7) = -4(k + 2)$, so $-84 = -4k - 8$, $-76 = -4k$, and $k = 19$. Check: from $(-2, 17)$ to $(19, 5)$ the run is $21$ and the fall is $12$, and $\\frac{-12}{21} = -\\frac{4}{7}$ ✓\n\n**Common Mistakes:**\n* $21$: reporting the horizontal run instead of the coordinate; the run has to be added to the starting $x$-value of $-2$.\n* $10$: adding the vertical drop of $12$ to $-2$ rather than the horizontal run of $21$.\n* $-23$: subtracting the run from $-2$; the second mark is lower and farther right, so $k$ must be greater than $-2$.\n\n**Test Day Takeaway:** A described rate (\"drops $4$ for every $7$\") is a slope with a sign; solve the slope equation for the missing coordinate, then confirm the direction of the point makes sense.",
      skills: ["slope-from-points"]
    }
  ]
};

export default practiceTest11M2Easy;
