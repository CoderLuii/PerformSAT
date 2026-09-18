export const advancedMathBank = [
  // ── identify-quadratic (4 questions) ──────────────────────────────
  {
    id: "bank-am-001",
    domain: "advanced-math",
    skills: ["identify-quadratic"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A quadratic equation in one variable can be written in the form $ax^2 + bx + c = 0$, where $a$, $b$, and $c$ are constants and $a \\neq 0$. Which of the following is a quadratic equation in $x$?",
    choices: [
      // distractor: degree 1 — a linear equation
      { id: "A", text: "$13x - 26 = 0$" },
      // distractor: variable in a denominator — not a polynomial equation at all
      { id: "B", text: "$\\dfrac{6}{x} + 4 = 0$" },
      { id: "C", text: "$2x^2 - 5x + 3 = 0$" },
      // distractor: degree 3 — a cubic equation
      { id: "D", text: "$x^3 - 8x = 0$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Identify Quadratic Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** Look for a highest power of exactly $2$ with the variable in the numerator. Only $2x^2 - 5x + 3 = 0$ qualifies.\n\n**The Full Solution:**\nStep 1: A quadratic equation in $x$ has a term with $x^2$ and no higher power of $x$, and every power of $x$ must be a whole number in the numerator.\nStep 2: Test each equation. $13x - 26 = 0$ has highest power $1$. $\\dfrac{6}{x} + 4 = 0$ has $x$ in a denominator, which is the power $x^{-1}$. $x^3 - 8x = 0$ has highest power $3$.\nStep 3: $2x^2 - 5x + 3 = 0$ matches $ax^2 + bx + c = 0$ with $a = 2$, $b = -5$, $c = 3$, and $a \\neq 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($13x - 26 = 0$): the largest power of $x$ is $1$, so this is linear, not quadratic.\n* Choice B ($\\dfrac{6}{x} + 4 = 0$): the variable sits in a denominator, so the equation is rational, not polynomial.\n* Choice D ($x^3 - 8x = 0$): the largest power of $x$ is $3$, so this is cubic.\n\n**Test Day Takeaway:** Classify by the HIGHEST power of the variable, and check that the variable never appears in a denominator or under a radical.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "concept-identification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-002",
    domain: "advanced-math",
    skills: ["identify-quadratic"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A concert hall models its ticket revenue as $R(p) = p(900 - 15p)$ dollars, where $p$ is the ticket price in dollars. The table gives $R(p)$ for three ticket prices. Which of the following best describes $R$ as a function of $p$?",
    diagram: { type: "dataTable", params: { headers: ["Ticket price p (dollars)", "Revenue R(p) (dollars)"], rows: [["10", "7,500"], ["20", "12,000"], ["30", "13,500"]] } },
    choices: [
      // distractor: treats "increasing" as proof of linearity; the differences 4,500 and 1,500 are not constant
      { id: "A", text: "Linear, because $R(p)$ increases as $p$ increases." },
      // distractor: classifies one factor instead of the product
      { id: "B", text: "Linear, because the factor $900 - 15p$ is linear in $p$." },
      { id: "C", text: "Quadratic, because expanding gives $R(p) = -15p^2 + 900p$." },
      // distractor: claims a constant ratio; the ratios are 1.6 then 1.125
      { id: "D", text: "Exponential, because $R(p)$ grows by a constant factor." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Classify Model by Expanding**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Distribute: $p(900 - 15p) = 900p - 15p^2$. A $p^2$ term with a nonzero coefficient makes $R$ quadratic.\n\n**The Full Solution:**\nStep 1: Expand the product. $R(p) = p(900) - p(15p) = 900p - 15p^2$, or $R(p) = -15p^2 + 900p$.\nStep 2: The highest power of $p$ is $2$ and its coefficient $-15$ is not zero, so $R$ is a quadratic function of $p$.\nStep 3: Check against the table. From $p = 10$ to $p = 20$ revenue rises by $12{,}000 - 7{,}500 = 4{,}500$; from $p = 20$ to $p = 30$ it rises by only $13{,}500 - 12{,}000 = 1{,}500$. Unequal increases over equal steps rule out a linear model, and the ratios $\\frac{12{,}000}{7{,}500} = 1.6$ and $\\frac{13{,}500}{12{,}000} = 1.125$ rule out an exponential one. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: \"increasing\" is not the same as \"linear\" — the table's increases are $4{,}500$ then $1{,}500$, not equal.\n* Choice B: $900 - 15p$ is linear by itself, but multiplying it by $p$ raises the degree to $2$.\n* Choice D: an exponential model needs a constant ratio between outputs at equally spaced inputs; here the ratios are $1.6$ and $1.125$.\n\n**Test Day Takeaway:** Classify a model only after expanding it. A product of two linear factors is quadratic, no matter how linear each factor looks.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-003",
    domain: "advanced-math",
    skills: ["identify-quadratic"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Three expressions in $m$ are given below.\n\nI. $(m + 6)^2 - m^2$\nII. $(3m - 2)(m + 5)$\nIII. $\\dfrac{m^4 - m^2}{m^2}$, where $m \\neq 0$\n\nAfter simplification, which of the expressions are quadratic in $m$?",
    choices: [
      // distractor: assumes squaring a binomial always leaves an $m^2$ term
      { id: "A", text: "I only" },
      // distractor: stops before reducing III, which becomes $m^2 - 1$
      { id: "B", text: "II only" },
      { id: "C", text: "II and III only" },
      // distractor: counts I, whose $m^2$ terms cancel
      { id: "D", text: "I, II, and III" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Classify After Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** I collapses to $12m + 36$ (linear). II expands to $3m^2 + 13m - 10$ and III reduces to $m^2 - 1$, both quadratic.\n\n**The Full Solution:**\nStep 1: Expression I: $(m + 6)^2 - m^2 = m^2 + 12m + 36 - m^2 = 12m + 36$. The $m^2$ terms cancel, so I is linear.\nStep 2: Expression II: $(3m - 2)(m + 5) = 3m^2 + 15m - 2m - 10 = 3m^2 + 13m - 10$, which is quadratic.\nStep 3: Expression III: $\\dfrac{m^4 - m^2}{m^2} = \\dfrac{m^2(m^2 - 1)}{m^2} = m^2 - 1$ for $m \\neq 0$, which is quadratic. So II and III only. Check at $m = 2$: I gives $60 = 12(2) + 36$, II gives $(4)(7) = 28 = 3(4) + 26 - 10$, III gives $\\frac{16 - 4}{4} = 3 = 2^2 - 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: expanding $(m + 6)^2$ does produce an $m^2$ term, but subtracting $m^2$ removes it — I is linear.\n* Choice B: III looks like a fourth-degree expression until the common factor $m^2$ is divided out.\n* Choice D: includes I, which loses its quadratic term in the subtraction.\n\n**Test Day Takeaway:** Degree is a property of the SIMPLIFIED expression. Expand and reduce first, then read the highest surviving power.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "classify-after-simplify",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-004",
    domain: "advanced-math",
    skills: ["identify-quadratic"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The height above the nozzle, in feet, of a stream of water $x$ feet horizontally from a fountain nozzle is modeled by $h(x) = -0.5x^2 + 4x$. The graph of $y = h(x)$ is shown. Which statement about this model is true?",
    diagram: { type: "parabola", params: { vertex: { h: 4, k: 8 }, a: -0.5, xRange: [0, 10], yRange: [0, 10], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showVertex: false } },
    choices: [
      // distractor: calls a curved graph linear
      { id: "A", text: "The model is linear, because the height changes at a constant rate." },
      // distractor: labels any rise-then-fall shape exponential
      { id: "B", text: "The model is exponential, because the height falls off after its peak." },
      { id: "C", text: "The model is quadratic, and the stream rises to a greatest height of $8$ feet." },
      // distractor: reports the vertex's $x$-coordinate as the maximum height
      { id: "D", text: "The model is quadratic, and the stream rises to a greatest height of $4$ feet." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Classify Physical Motion Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The $x^2$ term makes $h$ quadratic, and its vertex is at $x = -\\dfrac{4}{2(-0.5)} = 4$, where $h(4) = -8 + 16 = 8$ feet.\n\n**The Full Solution:**\nStep 1: $h(x) = -0.5x^2 + 4x$ has degree $2$, so the model is quadratic and its graph is a parabola. Because $-0.5 < 0$, the parabola opens downward and has a maximum.\nStep 2: The maximum occurs at the vertex, $x = -\\dfrac{b}{2a} = -\\dfrac{4}{2(-0.5)} = 4$ feet from the nozzle.\nStep 3: The greatest height is $h(4) = -0.5(16) + 4(4) = -8 + 16 = 8$ feet. Check with the symmetric points: $h(0) = 0$ and $h(8) = -32 + 32 = 0$, and $4$ is halfway between them. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: the graph is curved, so the height does not change at a constant rate.\n* Choice B: exponential models never come back down to a previous value the way this stream does at $x = 0$ and $x = 8$.\n* Choice D ($4$ feet): $4$ is the horizontal distance at which the peak occurs, not the peak height.\n\n**Test Day Takeaway:** In a quadratic model the vertex has two numbers with two different jobs: the input tells you WHERE the extreme happens, the output tells you WHAT it is.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── parabola-direction (4 questions) ──────────────────────────────
  {
    id: "bank-am-005",
    domain: "advanced-math",
    skills: ["parabola-direction"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = -\\dfrac{1}{4}x^2 + 6x - 11$ is a parabola. Which of the following correctly describes the direction in which the parabola opens, and why?",
    choices: [
      // distractor: reads the coefficient of $x$ instead of the coefficient of $x^2$
      { id: "A", text: "Upward, because the coefficient of $x$ is positive." },
      // distractor: reads the constant term instead of the leading coefficient
      { id: "B", text: "Upward, because the constant term is negative." },
      { id: "C", text: "Downward, because the coefficient of $x^2$ is negative." },
      // distractor: reaches the right direction from the wrong coefficient
      { id: "D", text: "Downward, because the constant term is negative." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Parabola Direction**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** Only the coefficient of $x^2$ controls direction. Here it is $-\\dfrac{1}{4} < 0$, so the parabola opens downward.\n\n**The Full Solution:**\nStep 1: Write the equation as $y = ax^2 + bx + c$ with $a = -\\dfrac{1}{4}$, $b = 6$, and $c = -11$.\nStep 2: A parabola opens upward when $a > 0$ and downward when $a < 0$. Neither $b$ nor $c$ affects the direction.\nStep 3: Since $a = -\\dfrac{1}{4} < 0$, the parabola opens downward. Check with two far-out inputs: $y(100) = -2500 + 600 - 11 < 0$ and $y(-100) = -2500 - 600 - 11 < 0$, so both arms fall. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: $b = 6$ is positive, but $b$ shifts the vertex sideways; it never flips the parabola.\n* Choice B: $c = -11$ is the $y$-intercept, not the leading coefficient.\n* Choice D: the direction is right but the reason is wrong — the constant term does not determine which way a parabola opens.\n\n**Test Day Takeaway:** Direction is decided by one number: the sign of the coefficient on $x^2$. Ignore everything else.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "parabola-orientation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-006",
    domain: "advanced-math",
    skills: ["parabola-direction"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A vehicle's fuel efficiency $E$, in miles per gallon, at a speed of $v$ miles per hour is modeled by $E(v) = -0.02v^2 + 2v + 6$. The graph of $E$ is shown. Does $E$ have a maximum value or a minimum value, and why?",
    diagram: { type: "parabola", params: { vertex: { h: 50, k: 56 }, a: -0.02, xRange: [0, 80], yRange: [0, 60], xTickInterval: 20, yTickInterval: 10, gridInterval: 10, showVertex: true } },
    choices: [
      { id: "A", text: "A maximum, because the coefficient of $v^2$ is negative." },
      // distractor: credits the constant term for the shape of the graph
      { id: "B", text: "A maximum, because the constant term $6$ is positive." },
      // distractor: reads the coefficient of $v$ and inverts the conclusion
      { id: "C", text: "A minimum, because the coefficient of $v$ is positive." },
      // distractor: treats the vertex's position as evidence of a minimum
      { id: "D", text: "A minimum, because the vertex lies to the right of the $E$-axis." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Max vs Min Reasoning**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The coefficient of $v^2$ is $-0.02 < 0$, so the parabola opens downward and its vertex is the highest point — a maximum.\n\n**The Full Solution:**\nStep 1: In $E(v) = -0.02v^2 + 2v + 6$, the leading coefficient is $a = -0.02$.\nStep 2: When $a < 0$ a parabola opens downward, so the vertex is the highest point of the graph and the function has a maximum value (and no minimum).\nStep 3: Locate it: $v = -\\dfrac{2}{2(-0.02)} = 50$ miles per hour, and $E(50) = -0.02(2500) + 100 + 6 = 56$ miles per gallon. Check a nearby speed: $E(40) = -32 + 80 + 6 = 54 < 56$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: the verdict is right, but $6$ is only $E(0)$ — the constant term never decides which way a parabola opens.\n* Choice C: $b = 2$ is positive, yet $b$ only slides the vertex; the sign of $a$ is what matters.\n* Choice D: the vertex does sit to the right of the vertical axis, but a downward parabola with a right-of-center vertex still has a maximum.\n\n**Test Day Takeaway:** Downward-opening ($a < 0$) means maximum; upward-opening ($a > 0$) means minimum. The verdict and the reason must both come from $a$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "max-min-reasoning",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-007",
    domain: "advanced-math",
    skills: ["parabola-direction"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = (5 - k)x^2 + 8x + 3$ opens downward, where $k$ is a constant. Which of the following describes all possible values of $k$?",
    choices: [
      // distractor: solves the condition for opening UPWARD
      { id: "A", text: "$k < 5$" },
      { id: "B", text: "$k > 5$" },
      // distractor: moves $k$ across the inequality without changing its sign correctly
      { id: "C", text: "$k < -5$" },
      // distractor: only rules out the case where the graph stops being a parabola
      { id: "D", text: "$k \\neq 5$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Parameter Constraint on Leading Coefficient**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Downward means the leading coefficient is negative: $5 - k < 0$, so $k > 5$.\n\n**The Full Solution:**\nStep 1: The leading coefficient of $y = (5 - k)x^2 + 8x + 3$ is $5 - k$.\nStep 2: A parabola opens downward exactly when its leading coefficient is negative, so $5 - k < 0$.\nStep 3: Add $k$ to both sides: $5 < k$, that is, $k > 5$. Check with $k = 9$: the coefficient is $5 - 9 = -4 < 0$, and the graph opens downward. Check with $k = 1$: the coefficient is $4 > 0$, and it opens upward. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($k < 5$): this makes $5 - k > 0$, which is the upward-opening case.\n* Choice C ($k < -5$): this comes from solving $5 - k < 0$ as $-k < -5$ and then dropping the sign flip.\n* Choice D ($k \\neq 5$): $k = 5$ does have to be excluded — at $k = 5$ the graph is a line, not a parabola — but that alone allows values like $k = 1$, which open upward.\n\n**Test Day Takeaway:** When a parameter sits in the leading coefficient, translate the picture into one inequality about that whole coefficient, then solve it like any linear inequality.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "parameter-constraint",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-008",
    domain: "advanced-math",
    skills: ["parabola-direction", "vertex-form"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The function $C$ defined by $C(x) = 0.5(x - 6)^2 + 4$ gives the production cost, in dollars per unit, when $x$ thousand units are made. The graph of $y = C(x)$ is shown. Which of the following must be true?",
    diagram: { type: "parabola", params: { vertex: { h: 6, k: 4 }, a: 0.5, xRange: [0, 12], yRange: [0, 24], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showVertex: true } },
    choices: [
      // distractor: swaps the two vertex coordinates
      { id: "A", text: "The least cost per unit is $\\$6$, and it occurs when $x = 4$." },
      { id: "B", text: "The cost per unit is the same when $x = 2$ as it is when $x = 10$." },
      // distractor: reads the vertex output as the value at $x = 0$
      { id: "C", text: "The cost per unit is $\\$4$ when $x = 0$." },
      // distractor: assumes the curve keeps falling past the vertex
      { id: "D", text: "The cost per unit decreases as $x$ increases, for every $x > 0$." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Interpret Vertex Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The vertex is at $x = 6$, and $2$ and $10$ are each $4$ units from $6$. Equal distances from the axis of symmetry give equal outputs.\n\n**The Full Solution:**\nStep 1: In $C(x) = 0.5(x - 6)^2 + 4$ the vertex is $(6, 4)$, so the axis of symmetry is the vertical line $x = 6$ and the least cost per unit is $\\$4$ at $x = 6$.\nStep 2: A parabola takes the same value at inputs that are the same distance from its axis of symmetry. Since $6 - 2 = 4$ and $10 - 6 = 4$, the inputs $x = 2$ and $x = 10$ are a matched pair.\nStep 3: Confirm by computing: $C(2) = 0.5(-4)^2 + 4 = 8 + 4 = 12$ and $C(10) = 0.5(4)^2 + 4 = 8 + 4 = 12$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: it reverses the vertex — the minimum VALUE is $4$ dollars and it happens AT $x = 6$, not the other way around.\n* Choice C: $4$ is the minimum, not $C(0)$; in fact $C(0) = 0.5(36) + 4 = 22$ dollars per unit.\n* Choice D: the cost falls only until $x = 6$; past the vertex it rises again, as $C(10) = 12 > C(6) = 4$ shows.\n\n**Test Day Takeaway:** Vertex form hands you the axis of symmetry for free. Two inputs equally far from it always produce the same output — that is the fastest \"must be true\" to verify.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── finding-roots-factoring (5 questions) ─────────────────────────
  {
    id: "bank-am-009",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the equation $x^2 - 13x + 30 = 0$, the left side is the product of two binomials with integer constants. What are all solutions to this equation?",
    choices: [
      // distractor: keeps the signs of the numbers inside the factors instead of solving
      { id: "A", text: "$x = -10$ and $x = -3$" },
      // distractor: flips the sign of only one factor
      { id: "B", text: "$x = -3$ and $x = 10$" },
      { id: "C", text: "$x = 3$ and $x = 10$" },
      // distractor: pairs one true root with the constant term
      { id: "D", text: "$x = 3$ and $x = 30$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Factor and Solve**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Two numbers multiply to $30$ and add to $-13$: $-3$ and $-10$. So $(x - 3)(x - 10) = 0$ and $x = 3$ or $x = 10$.\n\n**The Full Solution:**\nStep 1: Factor $x^2 - 13x + 30$. The constant is positive and the middle coefficient is negative, so both numbers are negative: $(-3)(-10) = 30$ and $-3 + (-10) = -13$.\nStep 2: Write $(x - 3)(x - 10) = 0$.\nStep 3: Set each factor to zero: $x - 3 = 0$ gives $x = 3$, and $x - 10 = 0$ gives $x = 10$. Check $x = 3$: $9 - 39 + 30 = 0$. Check $x = 10$: $100 - 130 + 30 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$ and $-3$): reports the numbers that appear inside the factors instead of the values that make each factor zero.\n* Choice B ($-3$ and $10$): flips the sign of one root only; then the product of the roots would be $-30$, not $30$.\n* Choice D ($3$ and $30$): keeps one correct root and grabs the constant term $30$ for the other.\n\n**Test Day Takeaway:** After factoring, the roots are the values that make each factor zero — the OPPOSITES of the numbers you see inside the parentheses.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "factor-and-solve",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-010",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "easy",
    type: "fill-in",
    question: "The two times at which a squall's modeled crosswind returns to zero are the solutions of $x^2 + 3x - 40 = 0$, where $x$ is the number of hours after the forecast was issued. What is the positive solution?",
    correctAnswer: "5",
    explanation: "**SAT Pattern: Factor and Solve (Fill-in)**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~15s):** $x^2 + 3x - 40 = (x + 8)(x - 5)$, whose zeros are $-8$ and $5$; the positive one is $5$.\n\n**The Full Solution:**\nStep 1: Look for two numbers whose product is $-40$ and whose sum is $3$: those are $8$ and $-5$.\nStep 2: The equation therefore factors as $(x + 8)(x - 5) = 0$.\nStep 3: The zero-product property gives $x = -8$ or $x = 5$, and only $5$ is positive. Check: $5^2 + 3(5) - 40 = 25 + 15 - 40 = 0$ ✓\n\n**Common Mistakes:**\n* $8$ — reading the $8$ straight out of the factor $x + 8$ instead of solving $x + 8 = 0$.\n* $40$ — quoting the constant term, which is the product of the solutions, not a solution.\n\n**Test Day Takeaway:** The number inside a factor is the OPPOSITE of the solution it produces — set each factor to zero before reading anything off.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "factor-and-solve",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-011",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Net biomass in a survey plot, in kilograms, is modeled by $6x^2 + 11x - 35$, where $x$ is the plot's width in meters and that width is greater than $2$ meters, so the biomass is positive. Factoring the model gives which of the following products?",
    choices: [
      // distractor: swaps which binomial carries the $3$, expanding to $6x^2 - x - 35$
      { id: "A", text: "$(2x - 5)(3x + 7)$" },
      // distractor: attaches the signs to the wrong constants, expanding to $6x^2 - 11x - 35$
      { id: "B", text: "$(3x + 5)(2x - 7)$" },
      { id: "C", text: "$(3x - 5)(2x + 7)$" },
      // distractor: puts all of the $6$ in one factor, expanding to $6x^2 + 37x - 35$
      { id: "D", text: "$(6x - 5)(x + 7)$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Factor with Leading Coefficient ≠ 1**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Split $11x$ using $21x$ and $-10x$, since $21 \\cdot (-10) = -210 = 6 \\cdot (-35)$: $(3x - 5)(2x + 7)$.\n\n**The Full Solution:**\nStep 1: Multiply the outer coefficients: $6 \\cdot (-35) = -210$, and look for two numbers with product $-210$ and sum $11$. Those are $21$ and $-10$.\nStep 2: Rewrite the middle term: $6x^2 + 21x - 10x - 35$, then group: $3x(2x + 7) - 5(2x + 7)$.\nStep 3: The shared binomial gives $(3x - 5)(2x + 7)$. Check: expanding gives $6x^2 + 21x - 10x - 35 = 6x^2 + 11x - 35$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(2x - 5)(3x + 7)$): the $-5$ and $+7$ are paired with the wrong coefficients, giving a middle term of $-x$.\n* Choice B ($(3x + 5)(2x - 7)$): the signs are swapped, so the middle term becomes $-11x$.\n* Choice D ($(6x - 5)(x + 7)$): a valid pair of factors of $6$ and $-35$, but the cross products give $37x$.\n\n**Test Day Takeaway:** With a leading coefficient above $1$, split the middle term using $a \\cdot c$ before grouping — guessing at binomials is where the sign errors live.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "factor-and-solve",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-012",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "medium",
    type: "fill-in",
    question: "A rectangular gasket measures $9$ inches by $12$ inches, and a uniform border of width $w$ inches is added on all four sides. The bordered gasket has an area of $208$ square inches. What is the value of $w$?",
    correctAnswer: "2",
    explanation: "**SAT Pattern: Area Equation to Quadratic**\n\n**The correct answer is $2$.**\n\n**The Fast Way (~25s):** The bordered gasket is $(9+2w)$ by $(12+2w)$, so $4w^{2}+42w+108=208$, which reduces to $2w^{2}+21w-50=0$ and factors to $(2w+25)(w-2)=0$.\n\n**The Full Solution:**\nStep 1: The border adds $w$ to each side of both dimensions, so the outer dimensions are $9+2w$ and $12+2w$.\nStep 2: Set the area equal to $208$: $(9+2w)(12+2w)=4w^{2}+42w+108=208$, so $4w^{2}+42w-100=0$, or $2w^{2}+21w-50=0$.\nStep 3: Factor: $(2w+25)(w-2)=0$, so $w=-12.5$ or $w=2$. A width must be positive, so $w=2$. Check: $(9+4)(12+4)=13\\cdot 16=208$ ✓\n\n**Common Mistakes:**\n* $4$: added $w$ rather than $2w$ to each dimension, solving $(9+w)(12+w)=208$.\n* $-12.5$: kept the negative solution of the quadratic, which cannot be a width.\n* $100$: stopped at the constant term of $4w^{2}+42w-100=0$ instead of solving.\n\n**Test Day Takeaway:** A border of width $w$ adds $2w$ to each full dimension — write the outer dimensions first, then set the product equal to the given area.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "area-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-013",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A shop's weekly earnings, in hundreds of dollars, from producing $x$ dozen brass hinges are given by $E(x)=-2x^{2}+kx-36$, where $k$ is a constant, and the table gives $E(x)$ at four production levels. The shop breaks even, with $E(x)=0$, when $x=3$. For what other value of $x$ does $E(x)=0$?",
    questionTable: { headers: ["$x$", "$E(x)$"], rows: [["$1$", "$-20$"], ["$2$", "$-8$"], ["$4$", "$4$"], ["$5$", "$4$"]] },
    choices: [
      // distractor: repeated the break-even value already given in the stem
      { id: "A", text: "$3$" },
      { id: "B", text: "$6$" },
      // distractor: reported the sum of the two solutions, 18/2 = 9
      { id: "C", text: "$9$" },
      // distractor: used 36 as the product of the solutions instead of 36/2 = 18, then divided by 3
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Back-Solve Parameter, Then Find Other Root**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The table shows $E(4)=E(5)$, so the axis of symmetry is $x=4.5$ and the two break-even values are the same distance from it: $4.5+(4.5-3)=6$.\n\n**The Full Solution:**\nStep 1: Substitute the known break-even value: $E(3)=-18+3k-36=0$, so $3k=54$ and $k=18$.\nStep 2: Solve $-2x^{2}+18x-36=0$. Dividing by $-2$ gives $x^{2}-9x+18=0$.\nStep 3: Factor: $(x-3)(x-6)=0$, so the other break-even value is $x=6$. Check: $E(6)=-72+108-36=0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): repeats the break-even value already given in the stem.\n* Choice C ($9$): reports the sum of the two solutions, $-b/a=18/2=9$, instead of the second solution.\n* Choice D ($12$): treats $36$ as the product of the solutions instead of $36/2=18$, then divides by $3$.\n\n**Test Day Takeaway:** Once one root is known, the product or the sum of the roots delivers the other in one step.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "back-solve-parameter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── roots-from-factors (4 questions) ──────────────────────────────
  {
    id: "bank-am-014",
    domain: "advanced-math",
    skills: ["roots-from-factors"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = (x + 9)(x - 4)$ crosses the $x$-axis at two points. What are the $x$-coordinates of those two points?",
    choices: [
      // distractor: keeps the sign of $-4$ instead of solving $x - 4 = 0$
      { id: "A", text: "$-9$ and $-4$" },
      { id: "B", text: "$-9$ and $4$" },
      // distractor: flips the sign of both numbers
      { id: "C", text: "$-4$ and $9$" },
      // distractor: reads the numbers inside the parentheses as the roots
      { id: "D", text: "$4$ and $9$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Zero Product Property**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** The graph meets the $x$-axis where $y = 0$, so $(x + 9)(x - 4) = 0$ and $x = -9$ or $x = 4$.\n\n**The Full Solution:**\nStep 1: A point on the $x$-axis has $y = 0$, so set $(x + 9)(x - 4) = 0$.\nStep 2: A product is zero only when a factor is zero: $x + 9 = 0$ or $x - 4 = 0$.\nStep 3: Solving gives $x = -9$ and $x = 4$. Check $x = -9$: $(0)(-13) = 0$. Check $x = 4$: $(13)(0) = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9$ and $-4$): solves the first factor correctly but copies the $-4$ straight out of the second.\n* Choice C ($-4$ and $9$): flips both signs, which would come from the factors $(x + 4)(x - 9)$.\n* Choice D ($4$ and $9$): reads $9$ and $4$ off the parentheses without changing signs.\n\n**Test Day Takeaway:** Each factor contributes one root, and that root is the value that makes the factor zero — so the sign always flips.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "zero-product-property",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-015",
    domain: "advanced-math",
    skills: ["roots-from-factors"],
    difficulty: "easy",
    type: "fill-in",
    question: "The number of interlibrary loan requests a branch receives above its baseline is modeled by $r(t)=(t-3)(t-11)$, where $t$ is the number of weeks after a new catalog launched. What is the sum of the values of $t$ for which $r(t)=0$?",
    correctAnswer: "14",
    explanation: "**SAT Pattern: Sum of Roots from Factors**\n\n**The correct answer is $14$.**\n\n**The Fast Way (~10s):** A product is $0$ only when a factor is $0$, so the zeros are $t=3$ and $t=11$; their sum is $14$.\n\n**The Full Solution:**\nStep 1: Set each factor equal to $0$: $t-3=0$ and $t-11=0$.\nStep 2: Solve to get $t=3$ and $t=11$.\nStep 3: Add them: $3+11=14$. Check: $r(3)=(0)(-8)=0$ and $r(11)=(8)(0)=0$, so both are zeros ✓\n\n**Common Mistakes:**\n* $33$: multiplies the two zeros instead of adding them.\n* $11$: reports only the larger zero rather than the sum.\n* $-14$: reads the factors $(t-3)$ and $(t-11)$ as giving zeros $-3$ and $-11$.\n\n**Test Day Takeaway:** In factored form the zeros are the numbers that make each factor vanish — read them off with the opposite sign of the constant inside.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "zero-product-property",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-016",
    domain: "advanced-math",
    skills: ["roots-from-factors"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cheese-vat controller's error signal is modeled by $(3x-4)(x+m)$, where $m$ is a constant and $x$ is the temperature offset in degrees Celsius. The error signal is zero at two offsets whose product is $-8$. What is the value of $m$?",
    choices: [
      // distractor: reports the given product -8 as the value of m
      { id: "A", text: "$-8$" },
      // distractor: sign slip: solves 4m/3 = -8 instead of -4m/3 = -8, giving -6
      { id: "B", text: "$-6$" },
      // distractor: drops the leading coefficient 3 and uses zeros 4 and -m, so -4m = -8 gives 2
      { id: "C", text: "$2$" },
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Product of Roots from Factors**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The zeros are $\\frac{4}{3}$ and $-m$, so their product is $-\\frac{4m}{3}=-8$, giving $m=6$.\n\n**The Full Solution:**\n\nStep 1: Set each factor to zero. From $3x-4=0$ the first offset is $x=\\frac{4}{3}$; from $x+m=0$ the second is $x=-m$.\n\nStep 2: Multiply the two zeros: $\\frac{4}{3}\\cdot(-m)=-\\frac{4m}{3}$.\n\nStep 3: Set that equal to the given product: $-\\frac{4m}{3}=-8$, so $4m=24$ and $m=6$. Check: the zeros are $\\frac{4}{3}$ and $-6$, and $\\frac{4}{3}\\cdot(-6)=-8$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-8$): copies the given product straight into the answer instead of solving for $m$.\n* Choice B ($-6$): loses the negative on $-m$ and solves $\\frac{4m}{3}=-8$.\n* Choice C ($2$): ignores the coefficient $3$, treating the zeros as $4$ and $-m$, so $-4m=-8$.\n\n**Test Day Takeaway:** Read the zeros off the factors before multiplying; a leading coefficient changes a zero, not just the sign.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "root-product",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-017",
    domain: "advanced-math",
    skills: ["roots-from-factors"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The expression $10x^2 + 11x - 6$ can be written as the product of two binomials, one of which is $(5x - 2)$. What is the other binomial factor, and what is the sum of the solutions to $10x^2 + 11x - 6 = 0$?",
    choices: [
      { id: "A", text: "$(2x + 3)$ and $-\\dfrac{11}{10}$" },
      // distractor: flips the sign inside the second factor, which changes the constant term to $+6$
      { id: "B", text: "$(2x - 3)$ and $-\\dfrac{11}{10}$" },
      // distractor: drops the negative sign in $-\frac{b}{a}$
      { id: "C", text: "$(2x + 3)$ and $\\dfrac{11}{10}$" },
      // distractor: reports $\frac{c}{a}$, the product of the roots, instead of the sum
      { id: "D", text: "$(2x + 3)$ and $-\\dfrac{3}{5}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Factor Division + Vieta's**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The leading terms force $5x \\cdot 2x = 10x^2$ and the constants force $(-2)(3) = -6$, so the other factor is $(2x + 3)$. The sum of the roots is $-\\dfrac{b}{a} = -\\dfrac{11}{10}$.\n\n**The Full Solution:**\nStep 1: Write $10x^2 + 11x - 6 = (5x - 2)(px + q)$. Matching the $x^2$ terms gives $5p = 10$, so $p = 2$; matching the constants gives $-2q = -6$, so $q = 3$.\nStep 2: Check the middle term: $(5x - 2)(2x + 3) = 10x^2 + 15x - 4x - 6 = 10x^2 + 11x - 6$. $\\checkmark$\nStep 3: The roots are $x = \\dfrac{2}{5}$ and $x = -\\dfrac{3}{2}$, and their sum is $\\dfrac{4}{10} - \\dfrac{15}{10} = -\\dfrac{11}{10}$, which matches $-\\dfrac{b}{a} = -\\dfrac{11}{10}$.\n\n**Why the wrong answers are tempting:**\n* Choice B: with $(2x - 3)$ the constant term would be $(-2)(-3) = +6$, not $-6$.\n* Choice C: the factor is right, but the sum of the roots is $-\\dfrac{b}{a}$, and $b = 11$ is positive, so the sum is negative.\n* Choice D ($-\\dfrac{3}{5}$): this is $\\dfrac{c}{a} = \\dfrac{-6}{10}$, the product of the roots, not the sum.\n\n**Test Day Takeaway:** Recover a missing factor by matching the leading and constant terms, then verify with the middle term. For the sum of the roots, $-\\dfrac{b}{a}$ beats solving.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "factor-division-vieta",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── vertex-formula (5 questions) ──────────────────────────────────
  {
    id: "bank-am-018",
    domain: "advanced-math",
    skills: ["vertex-formula"],
    difficulty: "easy",
    type: "fill-in",
    question: "An irrigation canal's discharge above its scheduled rate, in liters per second, is modeled by $f(x)=2x^2-28x+5$, where $x$ is the hour after 6 a.m. At what value of $x$ is the discharge least?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Vertex x-coordinate Formula**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~15s):** The least value of an upward parabola sits at $x=-\\frac{b}{2a}=-\\frac{-28}{4}=7$.\n\n**The Full Solution:**\nStep 1: Identify $a=2$ and $b=-28$; since $a>0$ the graph opens upward and the vertex is the lowest point.\nStep 2: The vertex's input is $x=-\\frac{b}{2a}=-\\frac{-28}{2(2)}$.\nStep 3: Simplify: $x=\\frac{28}{4}=7$. Check: $f(6)=72-168+5=-91$ and $f(8)=128-224+5=-91$, equal outputs on either side of $7$ ✓\n\n**Common Mistakes:**\n* $-7$: uses $\\frac{b}{2a}$ and keeps the sign of $b$ instead of negating it.\n* $14$: divides by $a$ rather than by $2a$.\n* $5$: reports the constant term, which is $f(0)$, not the vertex's input.\n\n**Test Day Takeaway:** The vertex input is $-\\frac{b}{2a}$ — the $2$ in the denominator is the step students skip most often.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-coordinate",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-019",
    domain: "advanced-math",
    skills: ["vertex-formula"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A campus writing center's average wait, in minutes, during week $x$ is given by a quadratic function $f$, and the table lists $f(x)$ for five consecutive weeks. Which ordered pair gives the coordinates of the lowest point on the graph of $y=f(x)$?",
    diagram: { type: "dataTable", params: { headers: ["Week (x)", "Average wait, f(x)"], rows: [["1", "13"], ["2", "7"], ["3", "5"], ["4", "7"], ["5", "13"]] } },
    choices: [
      // distractor: reports the first row of the table rather than the smallest output
      { id: "A", text: "$(1,13)$" },
      // distractor: reports the second-smallest output instead of the smallest
      { id: "B", text: "$(2,7)$" },
      { id: "C", text: "$(3,5)$" },
      // distractor: swaps the coordinates of the vertex
      { id: "D", text: "$(5,3)$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Coordinates**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The outputs fall to $5$ at $x=3$ and rise symmetrically on either side, so the lowest point is $(3,5)$.\n\n**The Full Solution:**\nStep 1: Scan the outputs: $13$, $7$, $5$, $7$, $13$. The smallest is $5$.\nStep 2: That value occurs at $x=3$, and the equal outputs at $x=2$ and $x=4$ confirm $x=3$ is the axis of symmetry.\nStep 3: The lowest point is therefore $(3,5)$. Check: $f(x)=2(x-3)^2+5$ reproduces every row of the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(1,13)$): reports the first row of the table rather than the smallest output.\n* Choice B ($(2,7)$): reports the second-smallest output instead of the smallest.\n* Choice D ($(5,3)$): swaps the two coordinates of the vertex.\n\n**Test Day Takeaway:** In a symmetric table the vertex sits at the input where the outputs turn around — read the pair in the order (input, output).",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-coordinate",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-020",
    domain: "advanced-math",
    skills: ["vertex-formula"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The height, in feet, of a model rocket $t$ seconds after launch is $h(t) = -16t^2 + 96t + 5$. The table gives the rocket's height at four times. At what time, in seconds, does the rocket reach its greatest height?",
    diagram: { type: "dataTable", params: { headers: ["Time t (seconds)", "Height h(t) (feet)"], rows: [["1", "85"], ["2", "133"], ["4", "133"], ["5", "85"]] } },
    choices: [
      // distractor: picks the earlier of the two tied rows instead of the midpoint
      { id: "A", text: "$2$" },
      { id: "B", text: "$3$" },
      // distractor: picks the later of the two tied rows instead of the midpoint
      { id: "C", text: "$4$" },
      // distractor: computes $-\frac{b}{a} = \frac{96}{16}$, dropping the $2$
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Time for Projectile Motion**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $t = -\\dfrac{b}{2a} = -\\dfrac{96}{2(-16)} = 3$ seconds — also the midpoint of the tied heights at $t = 2$ and $t = 4$.\n\n**The Full Solution:**\nStep 1: The model is quadratic with $a = -16 < 0$, so the graph is a downward parabola and the greatest height occurs at the vertex.\nStep 2: The vertex time is $t = -\\dfrac{b}{2a} = -\\dfrac{96}{-32} = 3$ seconds.\nStep 3: The table confirms it: $h(2) = h(4) = 133$ feet, and equal heights sit at equal distances from the axis of symmetry, so the axis is at $t = \\dfrac{2 + 4}{2} = 3$. Check: $h(3) = -144 + 288 + 5 = 149 > 133$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): the greatest height IN THE TABLE is tied at $t = 2$ and $t = 4$; picking the first of them misses the true peak between them.\n* Choice C ($4$): same trap from the other end of the tie.\n* Choice D ($6$): uses $\\dfrac{96}{16}$, forgetting the $2$ in $-\\dfrac{b}{2a}$ — that is when the rocket returns near its launch height, not its peak.\n\n**Test Day Takeaway:** Two equal outputs bracket the vertex; the vertex time is their average, which must agree with $-\\dfrac{b}{2a}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-application",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-021",
    domain: "advanced-math",
    skills: ["vertex-formula"],
    difficulty: "medium",
    type: "fill-in",
    question: "A workshop's weekly profit, in dollars, is modeled by $P(n) = -3n^2 + 72n - 180$, where $n$ is the number of chairs built that week. What is the greatest weekly profit, in dollars, this model predicts?",
    correctAnswer: "252",
    explanation: "**SAT Pattern: Max Profit via Vertex**\n\n**The correct answer is $252$.**\n\n**The Fast Way (~25s):** The peak is at $n = -\\dfrac{72}{2(-3)} = 12$, and $P(12) = -432 + 864 - 180 = 252$ dollars.\n\n**The Full Solution:**\nStep 1: The leading coefficient $-3$ is negative, so the parabola opens downward and the vertex gives the greatest profit.\nStep 2: The vertex input is $n = -\\dfrac{b}{2a} = -\\dfrac{72}{-6} = 12$ chairs.\nStep 3: Evaluate: $P(12) = -3(144) + 72(12) - 180 = -432 + 864 - 180 = 252$. Check a neighbor: $P(11) = -363 + 792 - 180 = 249 < 252$. $\\checkmark$\n\n**Common Mistakes:** Reporting $12$, the number of chairs at which the maximum occurs, instead of the profit itself. Losing the sign in $-\\frac{b}{2a}$ and evaluating $P(-12) = -432 - 864 - 180 = -1{,}476$.\n\n**Test Day Takeaway:** \"How much\" wants the vertex's OUTPUT, so finding $-\\dfrac{b}{2a}$ is only half the work — substitute it back in.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-application",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-022",
    domain: "advanced-math",
    skills: ["vertex-formula"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the $xy$-plane, the vertex of the graph of $y = 2x^2 + bx + 50$ lies on the $x$-axis, where $b$ is a constant. Which of the following could be the value of $b$?",
    choices: [
      // distractor: sets the vertex's $x$-coordinate to zero instead of its $y$-coordinate
      { id: "A", text: "$0$" },
      // distractor: uses $b^2 = ac$, dropping the factor of $4$
      { id: "B", text: "$10$" },
      { id: "C", text: "$20$" },
      // distractor: finds $4ac = 400$ but never takes the square root
      { id: "D", text: "$400$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Constraint via Discriminant**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** A vertex on the $x$-axis means one repeated root, so $b^2 - 4ac = 0$: $b^2 = 4(2)(50) = 400$ and $b = 20$ (or $-20$).\n\n**The Full Solution:**\nStep 1: The vertex lies on the $x$-axis exactly when the parabola touches the axis at a single point, so $2x^2 + bx + 50 = 0$ has exactly one real solution.\nStep 2: One real solution means the discriminant is zero: $b^2 - 4(2)(50) = 0$, so $b^2 = 400$.\nStep 3: Then $b = 20$ or $b = -20$; of these, $20$ appears among the choices. Check: $2x^2 + 20x + 50 = 2(x + 5)^2$, whose only zero is $x = -5$, and the vertex $(-5, 0)$ is on the $x$-axis. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): $b = 0$ puts the vertex ON the $y$-axis at $(0, 50)$, which is nowhere near the $x$-axis.\n* Choice B ($10$): comes from $b^2 = ac = 2(50) = 100$, which drops the $4$ in $b^2 = 4ac$.\n* Choice D ($400$): this is $4ac$ itself; the square root step is missing.\n\n**Test Day Takeaway:** \"Vertex on the $x$-axis\", \"exactly one solution\", and \"perfect square trinomial\" are three names for $b^2 - 4ac = 0$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-constraint",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── vertex-form (4 questions) ─────────────────────────────────────
  {
    id: "bank-am-023",
    domain: "advanced-math",
    skills: ["vertex-form"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $g$ is defined by $g(x) = -4(x + 7)^2 + 11$. In the $xy$-plane, what is the vertex of the graph of $y = g(x)$?",
    choices: [
      { id: "A", text: "$(-7, 11)$" },
      // distractor: flips the sign of $k$
      { id: "B", text: "$(-7, -11)$" },
      // distractor: reads $x + 7$ as $h = 7$ instead of $h = -7$
      { id: "C", text: "$(7, 11)$" },
      // distractor: reverses the two coordinates
      { id: "D", text: "$(11, -7)$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Read Vertex Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** Vertex form $a(x - h)^2 + k$ has vertex $(h, k)$. Here $x + 7 = x - (-7)$, so the vertex is $(-7, 11)$.\n\n**The Full Solution:**\nStep 1: Match $g(x) = -4(x + 7)^2 + 11$ to $a(x - h)^2 + k$. Rewrite $x + 7$ as $x - (-7)$, so $h = -7$ and $k = 11$.\nStep 2: The vertex is $(h, k) = (-7, 11)$.\nStep 3: Check: $g(-7) = -4(0)^2 + 11 = 11$, and since $a = -4 < 0$ every other input gives a smaller output, for example $g(-6) = -4 + 11 = 7$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($(-7, -11)$): negates $k$; the $+11$ is added, not subtracted.\n* Choice C ($(7, 11)$): reads the $7$ straight out of $(x + 7)$ without flipping its sign.\n* Choice D ($(11, -7)$): swaps the coordinates, reporting the output first.\n\n**Test Day Takeaway:** In $a(x - h)^2 + k$ the $h$ flips sign and the $k$ does not — $(x + 7)$ means the vertex sits at $x = -7$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "read-vertex-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-024",
    domain: "advanced-math",
    skills: ["vertex-form"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The parabola shown in the $xy$-plane is the graph of the function $f$. Its vertex is $(2, -9)$, and it passes through the point $(5, 0)$. Which equation defines $f$?",
    diagram: { type: "quadraticVertex", params: { vertex: [2, -9], a: 1, showPoints: [[5, 0], [-1, 0]], showVertex: true } },
    choices: [
      { id: "A", text: "$f(x) = (x - 2)^2 - 9$" },
      // distractor: flips the sign of $h$, moving the vertex to $x = -2$
      { id: "B", text: "$f(x) = (x + 2)^2 - 9$" },
      // distractor: flips the sign of $k$, moving the vertex above the $x$-axis
      { id: "C", text: "$f(x) = (x - 2)^2 + 9$" },
      // distractor: divides $9$ by $5 - 2 = 3$ instead of by $(5 - 2)^2 = 9$
      { id: "D", text: "$f(x) = 3(x - 2)^2 - 9$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Construct Vertex Form from Conditions**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Vertex $(2, -9)$ gives $f(x) = a(x - 2)^2 - 9$. Substituting $(5, 0)$: $0 = 9a - 9$, so $a = 1$.\n\n**The Full Solution:**\nStep 1: Vertex form is $f(x) = a(x - h)^2 + k$ with vertex $(h, k)$. The graphed vertex is $(2, -9)$, so $f(x) = a(x - 2)^2 - 9$.\nStep 2: Use the second marked point to pin down $a$: $0 = a(5 - 2)^2 - 9 = 9a - 9$, so $a = 1$.\nStep 3: Therefore $f(x) = (x - 2)^2 - 9$. Check the other marked point: $f(-1) = (-3)^2 - 9 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: $(x + 2)^2$ places the vertex at $x = -2$, but the graph turns at $x = 2$.\n* Choice C: $+9$ raises the vertex to $(2, 9)$, a graph that never reaches the $x$-axis.\n* Choice D: solves $9 = a(5 - 2)$ instead of $9 = a(5 - 2)^2$, forgetting to square the horizontal difference.\n\n**Test Day Takeaway:** Read $h$ and $k$ from the vertex first, then force the curve through one more point — and remember to square the horizontal difference before dividing.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "construct-vertex-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-025",
    domain: "advanced-math",
    skills: ["vertex-form", "converting-quadratic-forms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A quadratic function $q$ is given by $q(x)=x^{2}-8x+11$, and the table shows $q(x)$ at four values of $x$. Over all real numbers $x$, what is the least value of $q(x)$?",
    questionTable: { headers: ["$x$", "$q(x)$"], rows: [["$1$", "$4$"], ["$3$", "$-4$"], ["$5$", "$-4$"], ["$7$", "$4$"]] },
    choices: [
      { id: "A", text: "$-5$" },
      // distractor: read the smallest value listed in the table as the least value of q
      { id: "B", text: "$-4$" },
      // distractor: reported the input x = 4 at which the least value occurs instead of the output
      { id: "C", text: "$4$" },
      // distractor: took the constant term of q(x) as its least value
      { id: "D", text: "$11$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Complete the Square (Vertex Form)**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The table shows $q(3)=q(5)$, so the vertex sits at $x=4$, and $q(4)=16-32+11=-5$.\n\n**The Full Solution:**\nStep 1: Complete the square: $q(x)=x^{2}-8x+16-16+11=(x-4)^{2}-5$.\nStep 2: Since $(x-4)^{2}\\ge 0$ for every real $x$, the smallest possible value of $q(x)$ is $-5$, reached at $x=4$.\nStep 3: The table is consistent with this: $x=3$ and $x=5$ are each one unit from $4$ and give the same output $-4$. Check: $q(4)=16-32+11=-5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-4$): the smallest value that appears in the table, but the table skips $x=4$.\n* Choice C ($4$): reports the input at which the minimum occurs instead of the output.\n* Choice D ($11$): takes the constant term of $q(x)$ as the minimum.\n\n**Test Day Takeaway:** A table of a quadratic rarely contains the vertex — use the symmetry of two equal outputs to find it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complete-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-026",
    domain: "advanced-math",
    skills: ["vertex-form"],
    difficulty: "hard",
    type: "fill-in",
    question: "An adaptive-optics mirror's wavefront error, in nanometers, is modeled by $f(x)=2(x-h)^{2}+k$, where $h$ and $k$ are constants and $x$ is the actuator offset in micrometers. The model gives equal errors at offsets $3$ and $9$ micrometers, and gives $6$ nanometers at an offset of $5$ micrometers. What is the least error the model gives?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Read Minimum from Vertex Form**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~50s):** Equal errors at $3$ and $9$ put the vertex halfway between them at $h=6$, and then $f(5)=2+k=6$ gives $k=4$, the least value.\n\n**The Full Solution:**\n\nStep 1: A parabola takes equal values at inputs equally far from its vertex, so $h$ is the midpoint of $3$ and $9$: $h=\\frac{3+9}{2}=6$.\n\nStep 2: Use the remaining condition: $f(5)=2(5-6)^{2}+k=2+k$, and that equals $6$, so $k=4$.\n\nStep 3: In $f(x)=2(x-6)^{2}+4$ the squared term is never negative, so the least value of $f$ is the constant $4$, reached at $x=6$. Check: $f(3)=2(9)+4=22$ and $f(9)=2(9)+4=22$ are equal, and $f(5)=2(1)+4=6$, exactly as the model requires.\n\n**Common Mistakes:**\n\n* Reporting $6$, the offset at which the least error occurs, instead of the error itself.\n* Substituting the offset $3$ in place of $5$, solving $2(3-6)^{2}+k=6$, gives the wrong value $k=-12$.\n\n**Test Day Takeaway:** In $a(x-h)^{2}+k$ with $a>0$ the constant $k$ is the minimum itself; pin down the axis from a pair of equal outputs first, then let one data point hand you $k$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── discriminant-analysis (5 questions) ───────────────────────────
  {
    id: "bank-am-027",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The height above a launch pad, in meters, of a drone $t$ seconds after takeoff is modeled by $h(t)=-4.9t^{2}+12t+1.5$, and the table gives that height, to the nearest tenth of a meter, at four times. How many times does the drone reach a height of exactly $10$ meters?",
    questionTable: { headers: ["Time, $t$ (seconds)", "Height (meters)"], rows: [["$0$", "$1.5$"], ["$0.5$", "$6.3$"], ["$2$", "$5.9$"], ["$2.5$", "$0.9$"]] },
    choices: [
      { id: "A", text: "Zero" },
      // distractor: treated the drone's maximum height of about 8.8 meters as if it were 10 meters
      { id: "B", text: "Exactly one" },
      // distractor: assumed a parabolic path crosses every horizontal line twice
      { id: "C", text: "Exactly two" },
      // distractor: treated h(t) = 10 as an identity satisfied at every time
      { id: "D", text: "Infinitely many" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Count Real Solutions via Discriminant**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** $h(t)=10$ becomes $-4.9t^{2}+12t-8.5=0$, whose discriminant is $144-4(4.9)(8.5)=-22.6$, so there are no real times.\n\n**The Full Solution:**\nStep 1: Set the model equal to $10$: $-4.9t^{2}+12t+1.5=10$, so $-4.9t^{2}+12t-8.5=0$.\nStep 2: With $a=-4.9$, $b=12$, and $c=-8.5$, the discriminant is $12^{2}-4(-4.9)(-8.5)=144-166.6=-22.6$.\nStep 3: A negative discriminant means no real solutions, so the drone never reaches $10$ meters. Check: the greatest height is $1.5+\\dfrac{144}{19.6}\\approx 8.8$ meters, consistent with the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (Exactly one): treats the maximum height of about $8.8$ meters as though it were $10$ meters.\n* Choice C (Exactly two): assumes a parabolic path crosses every horizontal line twice.\n* Choice D (Infinitely many): treats $h(t)=10$ as an identity.\n\n**Test Day Takeaway:** Move everything to one side before computing a discriminant, and keep the signs of $a$ and $c$ — two negatives make $4ac$ positive.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-count",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-028",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A quality-control model uses the equation $2x^{2}+kx+5=0$, where $k$ is a constant. Which of the following expressions is equal to $b^{2}-4ac$ for this equation?",
    choices: [
      { id: "A", text: "$k^{2}-40$" },
      // distractor: used 4ac as 4 times 5, omitting the leading coefficient 2
      { id: "B", text: "$k^{2}-20$" },
      // distractor: used 2 times 5 for 4ac
      { id: "C", text: "$k^{2}-10$" },
      // distractor: added 4ac instead of subtracting it
      { id: "D", text: "$k^{2}+40$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Compute Discriminant**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** With $a=2$, $b=k$, and $c=5$, the discriminant is $k^{2}-4(2)(5)=k^{2}-40$.\n\n**The Full Solution:**\nStep 1: Identify the coefficients of $2x^{2}+kx+5=0$: $a=2$, $b=k$, $c=5$.\nStep 2: The discriminant is $b^{2}-4ac$, so substitute: $k^{2}-4(2)(5)$.\nStep 3: Simplify: $k^{2}-40$. Check with $k=10$: $2x^{2}+10x+5=0$ has discriminant $100-40=60$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($k^{2}-20$): uses $4c$ only, omitting the leading coefficient $2$.\n* Choice C ($k^{2}-10$): uses $2\\cdot 5$ in place of $4ac$.\n* Choice D ($k^{2}+40$): adds $4ac$ instead of subtracting it.\n\n**Test Day Takeaway:** All three coefficients enter the discriminant — $a$ is easy to drop when the leading term is not $x^{2}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-compute",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-029",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the equation $x^2 - 14x + c = 0$, $c$ is a constant. In the $xy$-plane, the graph of $y = x^2 - 14x + c$ intersects the $x$-axis at exactly one point. What is the value of $c$?",
    choices: [
      // distractor: reports $-\frac{b}{2} = 7$, the $x$-coordinate of the single intersection point
      { id: "A", text: "$7$" },
      // distractor: reports $|b|$ without using the discriminant
      { id: "B", text: "$14$" },
      { id: "C", text: "$49$" },
      // distractor: sets $c = b^2$, dropping the factor of $4a$
      { id: "D", text: "$196$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Parameter for Discriminant = 0**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** One intersection point means one repeated root, so $b^2 - 4ac = 0$: $196 - 4c = 0$ and $c = 49$.\n\n**The Full Solution:**\nStep 1: The graph meets the $x$-axis where $y = 0$, so the number of intersection points equals the number of real solutions of $x^2 - 14x + c = 0$. Here $a = 1$ and $b = -14$.\nStep 2: One intersection point means one repeated real solution, which happens exactly when the discriminant is zero: $(-14)^2 - 4(1)c = 0$, so $196 - 4c = 0$.\nStep 3: Solve: $4c = 196$, so $c = 49$. Check: $x^2 - 14x + 49 = (x - 7)^2$, whose only zero is $x = 7$, so the graph touches the axis at the single point $(7, 0)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): $7$ is where the graph touches the axis, not the constant term that puts it there.\n* Choice B ($14$): copies the size of $b$ instead of using the discriminant.\n* Choice D ($196$): stops at $b^2$ and never divides by $4a$.\n\n**Test Day Takeaway:** A graph that touches the $x$-axis once is a perfect square, so with $a = 1$ the constant must be $\\left(\\dfrac{b}{2}\\right)^2$ — exactly what $b^2 - 4ac = 0$ gives.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-parameter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-030",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In a control system, two different real values of $x$ satisfy $2x^{2}+kx+8=0$, where the damping constant $k$ is nonzero. Which of the following must be true?",
    choices: [
      // distractor: states the condition for no real solutions
      { id: "A", text: "$|k|<8$" },
      // distractor: allows values that give no real solutions or exactly one
      { id: "B", text: "$|k|\\le 8$" },
      { id: "C", text: "$|k|>8$" },
      // distractor: includes |k| = 8, which gives exactly one solution rather than two
      { id: "D", text: "$|k|\\ge 8$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant Inequality**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Two distinct real solutions require $k^{2}-64>0$, that is $|k|>8$.\n\n**The Full Solution:**\nStep 1: With $a=2$, $b=k$, and $c=8$, the discriminant is $k^{2}-4(2)(8)=k^{2}-64$.\nStep 2: Two different real solutions require $k^{2}-64>0$, so $k^{2}>64$.\nStep 3: Taking square roots gives $|k|>8$. Check with $k=9$: $81-64=17>0$, and with $k=8$: $64-64=0$, only one solution ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($|k|<8$): states the condition for no real solutions.\n* Choice B ($|k|\\le 8$): allows values giving no real solutions or exactly one.\n* Choice D ($|k|\\ge 8$): includes $|k|=8$, which gives exactly one solution.\n\n**Test Day Takeaway:** $k^{2}>64$ means $|k|>8$, not $k>8$ — and the boundary belongs to the one-solution case, so the inequality stays strict.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-inequality",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-031",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The cross section of a parabolic solar reflector is modeled by $y=2x^2+5x+4$, and a straight support strut by $y=-3x+p$, where $p$ is a constant. The strut touches the reflector at exactly one point. What is the value of $p$?",
    choices: [
      { id: "A", text: "$-4$" },
      // distractor: solves 4 - p = 8 but reports p as positive 4
      { id: "B", text: "$4$" },
      // distractor: reports 4 - p = 8 instead of solving for p
      { id: "C", text: "$8$" },
      // distractor: takes 4 - p = -8, the wrong sign of the square root of 64
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Tangent Line to Parabola (Discriminant Method)**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Equating gives $2x^2+8x+(4-p)=0$; tangency forces $64-8(4-p)=0$, so $4-p=8$ and $p=-4$.\n\n**The Full Solution:**\nStep 1: Set $2x^2+5x+4=-3x+p$, which rearranges to $2x^2+8x+(4-p)=0$.\nStep 2: One contact point means $8^2-4(2)(4-p)=0$, that is $64-8(4-p)=0$.\nStep 3: So $4-p=8$ and $p=-4$. Check: $2x^2+8x+8=2(x+2)^2=0$ has the single solution $x=-2$, where both graphs give $y=2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($4$): reaches $4-p=8$ but reports $p$ without the sign change.\n* Choice C ($8$): reports the value of $4-p$ rather than $p$.\n* Choice D ($12$): uses $4-p=-8$, the wrong sign of $\\sqrt{64}$.\n\n**Test Day Takeaway:** With a leading coefficient other than $1$, keep the $4a$ in $b^2-4ac$ — dropping it changes the answer entirely.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "system-tangency",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── converting-quadratic-forms (4 questions) ──────────────────────
  {
    id: "bank-am-032",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = (x - 7)^2 + 4$ is a parabola. Which of the following equations, written in the form $y = ax^2 + bx + c$, defines the same parabola?",
    choices: [
      { id: "A", text: "$y = x^2 - 14x + 53$" },
      // distractor: subtracts the $4$ instead of adding it
      { id: "B", text: "$y = x^2 - 14x + 45$" },
      // distractor: loses the negative sign on the middle term
      { id: "C", text: "$y = x^2 + 14x + 53$" },
      // distractor: squares term by term, treating $(x - 7)^2$ as $x^2 + 49$ with no middle term
      { id: "D", text: "$y = x^2 + 53$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertex to Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** $(x - 7)^2 = x^2 - 14x + 49$, and adding $4$ gives $x^2 - 14x + 53$.\n\n**The Full Solution:**\nStep 1: Expand the square: $(x - 7)^2 = (x - 7)(x - 7) = x^2 - 7x - 7x + 49 = x^2 - 14x + 49$.\nStep 2: Add the constant outside the square: $x^2 - 14x + 49 + 4 = x^2 - 14x + 53$.\nStep 3: Check at $x = 7$: the vertex form gives $0 + 4 = 4$, and the expanded form gives $49 - 98 + 53 = 4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: uses $49 - 4$; the $+4$ sits outside the square and is added.\n* Choice C: writes $+14x$, which would come from $(x + 7)^2$ and move the vertex to $x = -7$.\n* Choice D: squares each term separately, dropping the middle term $-14x$ entirely.\n\n**Test Day Takeaway:** $(x - h)^2$ always contributes three terms, not two — the middle term $-2hx$ is where expansions go wrong.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-to-standard",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-033",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A load expression $2x^{2}+20x+37$ is rewritten as $2(x+5)^{2}+n$, where $n$ is a constant, so that the expression's least value is displayed as a constant. What is the value of $n$?",
    choices: [
      { id: "A", text: "$-13$" },
      // distractor: subtracted 25 instead of 2 times 25, ignoring the leading coefficient
      { id: "B", text: "$12$" },
      // distractor: copied the original constant term 37 without adjusting it
      { id: "C", text: "$37$" },
      // distractor: added 50 instead of subtracting it
      { id: "D", text: "$87$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Complete the Square with Leading Coefficient**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $2(x+5)^{2}=2x^{2}+20x+50$, which is $50$, not $37$, so $n=37-50=-13$.\n\n**The Full Solution:**\nStep 1: Expand the target form: $2(x+5)^{2}+n=2x^{2}+20x+50+n$.\nStep 2: Match constant terms with $2x^{2}+20x+37$: $50+n=37$.\nStep 3: Solve: $n=-13$. Check at $x=0$: $2(25)-13=37$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($12$): subtracts $25$ instead of $2\\cdot 25=50$, ignoring the leading coefficient.\n* Choice C ($37$): copies the original constant term without adjusting it.\n* Choice D ($87$): adds $50$ instead of subtracting it.\n\n**Test Day Takeaway:** With a leading coefficient, the completed square carries that factor too — expand the target form and match constants.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complete-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-034",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A cookware retailer's monthly cast-iron skillet sales relative to forecast are modeled by the quadratic function $f$ whose graph is shown with its vertex and both $x$-intercepts marked. If $f(x)=ax^2+bx+c$, what is the value of $b$?",
    diagram: { type: "quadraticVertex", params: { vertex: [2, -8], a: 0.5, showVertex: true, showPoints: [[-2, 0], [6, 0]] } },
    choices: [
      // distractor: reports the constant term c instead of b
      { id: "A", text: "$-6$" },
      { id: "B", text: "$-2$" },
      // distractor: reports the leading coefficient a instead of b
      { id: "C", text: "$0.5$" },
      // distractor: drops the negative sign when expanding -2ah
      { id: "D", text: "$2$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form from Vertex + Intercepts**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The intercepts $-2$ and $6$ with vertex $(2,-8)$ give $a=\\frac{1}{2}$; expanding $\\frac{1}{2}(x-2)^2-8$ gives $b=-2$.\n\n**The Full Solution:**\nStep 1: The marked $x$-intercepts are $-2$ and $6$, so $f(x)=a(x+2)(x-6)$, and the vertex sits halfway between them at $x=2$.\nStep 2: The vertex output is $-8$: $a(2+2)(2-6)=-16a=-8$, so $a=\\frac{1}{2}$.\nStep 3: Expand $\\frac{1}{2}(x+2)(x-6)=\\frac{1}{2}(x^2-4x-12)=\\frac{1}{2}x^2-2x-6$, so $b=-2$. Check: $-\\frac{b}{2a}=-\\frac{-2}{1}=2$, matching the vertex's $x$-coordinate ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): reports the constant term $c$ instead of $b$.\n* Choice C ($0.5$): reports the leading coefficient $a$ instead of $b$.\n* Choice D ($2$): drops the negative sign when expanding, since $-4a=-2$, not $2$.\n\n**Test Day Takeaway:** Intercepts give the factored form and the vertex gives the stretch — expand once and read off whichever coefficient is asked for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factored-to-standard",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-035",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "fill-in",
    question: "A greenhouse control model gives the energy use, in kilowatt-hours, as $E(x)=x^{2}-14x+58$, where $x$ is the vent opening in centimeters. When $E(x)$ is written in the form $(x-h)^{2}+k$, what is the value of $k$?",
    correctAnswer: "9",
    explanation: "**SAT Pattern: Standard to Vertex (k value)**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~30s):** Half of $14$ is $7$, and $7^{2}=49$, so $E(x)=(x-7)^{2}+58-49=(x-7)^{2}+9$.\n\n**The Full Solution:**\n\nStep 1: Take half the coefficient of $x$: $\\frac{-14}{2}=-7$, so the completed square is $(x-7)^{2}$.\n\nStep 2: Expanding $(x-7)^{2}$ gives $x^{2}-14x+49$, which is $49$ instead of the actual constant $58$.\n\nStep 3: Add the difference back: $k=58-49=9$, so $E(x)=(x-7)^{2}+9$. Check: at $x=7$ the model gives $49-98+58=9$, matching the value of $k$.\n\n**Common Mistakes:**\n\n* Reporting $7$, the value of $h$, instead of $k$.\n* Subtracting $14$ rather than $\\left(\\frac{14}{2}\\right)^{2}=49$ gives $58-14=44$.\n\n**Test Day Takeaway:** Completing the square subtracts the square of half the linear coefficient from the constant; $k$ is what is left over, and it equals the function's value at $x=h$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "standard-to-vertex",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── exponent-laws (5 questions) ───────────────────────────────────
  {
    id: "bank-am-036",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A spacecraft power bus stores $6x^{9}$ joules of energy and discharges it over $2x^{4}$ seconds, where $x>0$. Which expression gives the average power, in watts, of the discharge?",
    choices: [
      { id: "A", text: "$3x^{5}$" },
      // distractor: adds the exponents, 9 + 4 = 13, instead of subtracting them
      { id: "B", text: "$3x^{13}$" },
      // distractor: subtracts the coefficients, 6 - 2 = 4, instead of dividing them
      { id: "C", text: "$4x^{5}$" },
      // distractor: multiplies the coefficients, 6 times 2 = 12, instead of dividing them
      { id: "D", text: "$12x^{5}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Quotient Rule of Exponents**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Average power is energy divided by time: $\\frac{6x^{9}}{2x^{4}}=3x^{5}$.\n\n**The Full Solution:**\n\nStep 1: Average power is the stored energy divided by the discharge time, so the expression is $\\frac{6x^{9}}{2x^{4}}$.\n\nStep 2: Divide the numerical parts: $6\\div2=3$.\n\nStep 3: For like bases, subtract the exponents: $x^{9-4}=x^{5}$, giving $3x^{5}$. Check with $x=2$: the energy is $6(512)=3{,}072$ and the time is $2(16)=32$, and $3{,}072\\div32=96=3(2)^{5}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($3x^{13}$): adds the exponents instead of subtracting them.\n* Choice C ($4x^{5}$): subtracts the coefficients rather than dividing them.\n* Choice D ($12x^{5}$): multiplies the coefficients rather than dividing them.\n\n**Test Day Takeaway:** In a quotient, coefficients divide and exponents on a common base subtract — two different operations in the same step.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-simplify",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-037",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In a logistics model the number of possible pallet arrangements is $(2p^{3})^{4}$, where $p$ is a positive integer. Which expression is equivalent to $(2p^{3})^{4}$?",
    choices: [
      // distractor: multiplies the base 2 by the exponent 4 instead of raising it, giving 8 instead of 16
      { id: "A", text: "$8p^{12}$" },
      // distractor: adds the exponents 3 and 4 instead of multiplying them, giving p to the 7th
      { id: "B", text: "$16p^{7}$" },
      { id: "C", text: "$16p^{12}$" },
      // distractor: raises the exponent 3 to the fourth power instead of multiplying it by 4, giving p to the 81st
      { id: "D", text: "$16p^{81}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Power of a Product**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Raise each factor: $2^{4}=16$ and $(p^{3})^{4}=p^{12}$, so the expression is $16p^{12}$.\n\n**The Full Solution:**\n\nStep 1: A power of a product distributes over the factors: $(2p^{3})^{4}=2^{4}\\cdot(p^{3})^{4}$.\n\nStep 2: Evaluate the numerical factor: $2^{4}=16$.\n\nStep 3: For a power of a power, multiply the exponents: $(p^{3})^{4}=p^{3\\cdot4}=p^{12}$, giving $16p^{12}$. Check with $p=1$: $(2\\cdot1)^{4}=16$ and $16\\cdot1^{12}=16$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($8p^{12}$): multiplies the base $2$ by the exponent $4$ instead of raising it, producing $8$.\n* Choice B ($16p^{7}$): adds the exponents $3$ and $4$ instead of multiplying them.\n* Choice D ($16p^{81}$): raises $3$ to the fourth power rather than multiplying $3$ by $4$.\n\n**Test Day Takeaway:** Every factor inside the parentheses takes the outside exponent, and stacked exponents multiply.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "power-of-product",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-038",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A particle sensor's calibration constant $n$ satisfies the equation $(2^3)(2^n) = 2^{5n - 9}$, where each side of that equation counts the particles the sensor detects per liter of air during one sampling minute. What is the value of $n$?",
    choices: [
      // distractor: reads the right side as $2^{5n + 9}$, solving $3 + n = 5n + 9$
      { id: "A", text: "$-1.5$" },
      // distractor: divides the powers on the left instead of multiplying, solving $n - 3 = 5n - 9$
      { id: "B", text: "$1.5$" },
      { id: "C", text: "$3$" },
      // distractor: multiplies the exponents on the left instead of adding them, solving $3n = 5n - 9$
      { id: "D", text: "$4.5$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponent Equation (Combine then Solve)**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The left side is $2^{3 + n}$, so $3 + n = 5n - 9$, giving $4n = 12$ and $n = 3$.\n\n**The Full Solution:**\nStep 1: Multiplying powers of the same base adds the exponents: $(2^3)(2^n) = 2^{3 + n}$.\nStep 2: With equal bases the exponents must match, so $3 + n = 5n - 9$.\nStep 3: Subtract $n$ and add $9$ to get $12 = 4n$, so $n = 3$. Check: the left side is $2^{6} = 64$ and the right side is $2^{15 - 9} = 2^6 = 64$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1.5$): flips the sign of the $-9$, turning the equation into $3 + n = 5n + 9$.\n* Choice B ($1.5$): divides the two powers on the left instead of multiplying them, solving $n - 3 = 5n - 9$.\n* Choice D ($4.5$): multiplies the exponents on the left, producing $3n = 5n - 9$.\n\n**Test Day Takeaway:** Collapse each side to a single power of the shared base first; only then may you set the exponents equal.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-039",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "fill-in",
    question: "A glacier-mass model requires the quantity $y^{5k}$ divided by $y^{k+4}$ to equal $y^{20}$ at every positive value of $y$, where $y$ is an ice-density ratio and $k$ is a constant chosen once for the whole model. What is the value of $k$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Exponent Laws — Quotient Rule + Solve**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~20s):** Dividing subtracts exponents: $5k - (k + 4) = 4k - 4$, so $4k - 4 = 20$ and $k = 6$.\n\n**The Full Solution:**\nStep 1: The quotient rule gives $\\dfrac{y^{5k}}{y^{k+4}} = y^{5k - (k + 4)}$.\nStep 2: Simplify the exponent: $5k - k - 4 = 4k - 4$, so the equation of exponents is $4k - 4 = 20$.\nStep 3: Adding $4$ gives $4k = 24$, so $k = 6$. Check: the exponents become $30$ and $10$, and $30 - 10 = 20$ ✓\n\n**Common Mistakes:**\n* $4$ — subtracting only the first term of the denominator's exponent, which leaves $4k + 4 = 20$.\n* $5$ — dividing $20$ by $4$ before adding the $4$ back, which solves $4k = 20$ instead of $4k - 4 = 20$.\n\n**Test Day Takeaway:** Wrap the whole denominator exponent in parentheses before subtracting — the minus sign has to reach every term inside it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponent-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-040",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A scaling ratio equals $\\frac{24m^{-4}n^{6}}{6m^{3}n^{-1}}$ for positive $m$ and $n$, and it can be written as $\\frac{an^{c}}{m^{d}}$, where $a$, $c$, and $d$ are positive constants. What is the value of $a+c+d$?",
    choices: [
      // distractor: makes both exponent slips, taking d = 1 from -4 + 3 and c = 5 from 6 - 1: 4 + 5 + 1 = 10
      { id: "A", text: "$10$" },
      // distractor: adds the m exponents instead of subtracting, giving d = 1: 4 + 7 + 1 = 12
      { id: "B", text: "$12$" },
      // distractor: subtracts the n exponents as 6 - 1 = 5 instead of 6 - (-1): 4 + 5 + 7 = 16
      { id: "C", text: "$16$" },
      { id: "D", text: "$18$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Match Coefficients After Exponent Simplification**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** $\\frac{24}{6}=4$, the $m$ exponent is $-4-3=-7$, and the $n$ exponent is $6-(-1)=7$, so $a=4$, $c=7$, $d=7$ and the sum is 18.\n\n**The Full Solution:**\nStep 1: Divide the numerical parts: $\\frac{24}{6}=4$, so $a=4$.\nStep 2: Subtract exponents for each base: $m^{-4-3}=m^{-7}$ and $n^{6-(-1)}=n^{7}$.\nStep 3: Writing $4m^{-7}n^{7}$ as $\\frac{4n^{7}}{m^{7}}$ gives $c=7$ and $d=7$, so $a+c+d=18$. Check: at $m=n=2$ the original is $\\frac{24(2^{-4})(2^{6})}{6(2^{3})(2^{-1})}=\\frac{24(4)}{6(4)}=4$, and $\\frac{4(2^{7})}{2^{7}}=4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): mishandles both bases, using $-4+3$ and $6-1$.\n* Choice B ($12$): adds the $m$ exponents instead of subtracting, giving $d=1$.\n* Choice C ($16$): treats the denominator's $n^{-1}$ as $n^{1}$, giving $c=5$.\n\n**Test Day Takeaway:** Subtracting a negative exponent adds — write the subtraction with parentheses before simplifying.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "simplify-exponent-quotient",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-041",
    domain: "advanced-math",
    skills: ["zero-negative-exponents"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the expression $3^{0} + 3^{-2}$, one term has an exponent of zero and one has a negative exponent. What is the value of the expression?",
    choices: [
      // distractor: reads $3^{-2}$ as $-9$
      { id: "A", text: "$-8$" },
      // distractor: sets $3^{0} = 0$ instead of $1$
      { id: "B", text: "$\\dfrac{1}{9}$" },
      { id: "C", text: "$\\dfrac{10}{9}$" },
      // distractor: reads $3^{-2}$ as $9$
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Zero and Negative Exponent Evaluation**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** $3^{0} = 1$ and $3^{-2} = \\dfrac{1}{9}$, so the sum is $1 + \\dfrac{1}{9} = \\dfrac{10}{9}$.\n\n**The Full Solution:**\nStep 1: Any nonzero number raised to the power $0$ equals $1$, so $3^{0} = 1$.\nStep 2: A negative exponent means a reciprocal: $3^{-2} = \\dfrac{1}{3^{2}} = \\dfrac{1}{9}$.\nStep 3: Add: $1 + \\dfrac{1}{9} = \\dfrac{9}{9} + \\dfrac{1}{9} = \\dfrac{10}{9}$. Check as a decimal: $1 + 0.111\\ldots \\approx 1.11$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): treats $3^{-2}$ as $-3^{2} = -9$, giving $1 - 9$; a negative exponent never makes the value negative.\n* Choice B ($\\dfrac{1}{9}$): sets $3^{0} = 0$; the zero exponent gives $1$, not $0$.\n* Choice D ($10$): treats $3^{-2}$ as $9$, dropping the reciprocal.\n\n**Test Day Takeaway:** A negative exponent flips the base into a denominator; it never changes the sign of the value.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "zero-neg-exponent-eval",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-042",
    domain: "advanced-math",
    skills: ["zero-negative-exponents"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A comet dust collector's capture rate is proportional to $\\dfrac{3}{x^{2}\\sqrt{x}}$ for $x>0$, and that expression equals $3x^{k}$ for a constant $k$. What is the value of $k$?",
    choices: [
      { id: "A", text: "$-\\frac{5}{2}$" },
      // distractor: subtracts the radical's exponent instead of adding it, using -(2 - 1/2) = -3/2
      { id: "B", text: "$-\\frac{3}{2}$" },
      // distractor: makes the same subtraction error and then drops the negative sign
      { id: "C", text: "$\\frac{3}{2}$" },
      // distractor: forgets that a factor in the denominator produces a negative exponent
      { id: "D", text: "$\\frac{5}{2}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Reciprocal as Negative Exponent**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The denominator is $x^{2}\\cdot x^{1/2}=x^{5/2}$, and moving it up flips the sign: $3x^{-5/2}$.\n\n**The Full Solution:**\n\nStep 1: Write the radical as a power: $\\sqrt{x}=x^{1/2}$.\n\nStep 2: Combine the denominator's factors by adding exponents: $x^{2}\\cdot x^{1/2}=x^{2+\\frac{1}{2}}=x^{5/2}$.\n\nStep 3: A factor in the denominator becomes a negative exponent in the numerator, so $\\frac{3}{x^{5/2}}=3x^{-5/2}$ and $k=-\\frac{5}{2}$. Check at $x=4$: $\\frac{3}{16\\cdot2}=\\frac{3}{32}$, and $3\\cdot4^{-5/2}=\\frac{3}{32}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($-\\frac{3}{2}$): subtracts the radical's exponent instead of adding it.\n* Choice C ($\\frac{3}{2}$): makes that same subtraction and then loses the negative sign.\n* Choice D ($\\frac{5}{2}$): combines the denominator correctly but forgets that moving it up negates the exponent.\n\n**Test Day Takeaway:** Add exponents to combine a denominator into one power, then negate that exponent once when you lift it into the numerator.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "negative-exponent-rewrite",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-043",
    domain: "advanced-math",
    skills: ["zero-negative-exponents"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A gain factor in a filter design is the product $\\left(2a^{-3}b^{2}\\right)\\left(\\frac{b^{3}}{8a^{2}}\\right)$, where $a$ and $b$ are positive constants. Which expression is equivalent to this gain factor?",
    choices: [
      // distractor: inverts the numerical factor, using 8/2 instead of 2/8
      { id: "A", text: "$\\frac{4b^{5}}{a^{5}}$" },
      { id: "B", text: "$\\frac{b^{5}}{4a^{5}}$" },
      // distractor: combines the a exponents as -3 + 2 = -1 instead of -3 - 2 = -5
      { id: "C", text: "$\\frac{b^{5}}{4a}$" },
      // distractor: swaps which variable lands in the denominator
      { id: "D", text: "$\\frac{a^{5}}{4b^{5}}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Negative Exponent Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $\\frac{2}{8}=\\frac{1}{4}$, the $a$ exponents give $-3-2=-5$, and the $b$ exponents give $2+3=5$, so the product is $\\frac{b^{5}}{4a^{5}}$.\n\n**The Full Solution:**\nStep 1: Multiply the numerical factors: $2\\cdot\\frac{1}{8}=\\frac{1}{4}$.\nStep 2: The factor $\\frac{1}{a^{2}}$ is $a^{-2}$, so $a^{-3}\\cdot a^{-2}=a^{-5}$.\nStep 3: For $b$, $b^{2}\\cdot b^{3}=b^{5}$, giving $\\frac{1}{4}a^{-5}b^{5}=\\frac{b^{5}}{4a^{5}}$. Check: at $a=b=2$ the original is $\\left(2\\cdot\\frac{1}{8}\\cdot 4\\right)\\left(\\frac{8}{32}\\right)=1\\cdot\\frac{1}{4}=\\frac{1}{4}$, and $\\frac{32}{4(32)}=\\frac{1}{4}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{4b^{5}}{a^{5}}$): flips the numerical factor to 4.\n* Choice C ($\\frac{b^{5}}{4a}$): adds $-3$ and $+2$, treating the denominator's $a^{2}$ as a positive exponent to combine.\n* Choice D ($\\frac{a^{5}}{4b^{5}}$): puts $a$ on top and $b$ underneath, reversing both exponents.\n\n**Test Day Takeaway:** Rewrite every denominator factor as a negative exponent first; then all the exponent work is addition.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "negative-exponent-simplify",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-044",
    domain: "advanced-math",
    skills: ["zero-negative-exponents"],
    difficulty: "hard",
    type: "fill-in",
    question: "While setting up a spectrometer, a technician finds that the calibration constant $n$ satisfies $8^{\\,n}=\\left(\\frac{1}{4}\\right)^{\\,n-10}$, and the two sides are equal for exactly one value of $n$. What is that value?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Negative Exponent Equation**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~35s):** Write both sides base 2: $2^{3n}=2^{-2(n-10)}$, so $3n=-2n+20$ and $n=4$.\n\n**The Full Solution:**\nStep 1: $8=2^{3}$ and $\\frac{1}{4}=2^{-2}$, so the equation becomes $2^{3n}=2^{-2(n-10)}$.\nStep 2: Equal powers of the same base force equal exponents: $3n=-2n+20$.\nStep 3: Adding $2n$ gives $5n=20$, so $n=4$. Check: $8^{4}=4{,}096$ and $\\left(\\frac{1}{4}\\right)^{-6}=4^{6}=4{,}096$ ✓\n\n**Common Mistakes:** Reading $\\frac{1}{4}$ as $2^{2}$ drops the reciprocal and gives $3n=2n-20$, so $n=-20$. Writing $8$ as $2^{4}$ gives $4n=-2n+20$ and the non-integer $\\frac{10}{3}$. Distributing $-2$ over $n-10$ as $-2n-20$ gives $5n=-20$ and $n=-4$.\n\n**Test Day Takeaway:** A reciprocal base is a negative exponent — convert both sides to one base before matching exponents.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "negative-exponent-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── comparing-exponentials (3 questions) ──────────────────────────
  {
    id: "bank-am-045",
    domain: "advanced-math",
    skills: ["comparing-exponentials"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A biologist records the cell count of two cultures, $P$ and $Q$, every $3$ hours. The table gives the counts. Each culture grows exponentially. Which of the following statements comparing the cultures is true?",
    diagram: { type: "dataTable", params: { headers: ["Time (hours)", "Culture P", "Culture Q"], rows: [["0", "250", "640"], ["3", "500", "960"], ["6", "1,000", "1,440"]] } },
    choices: [
      // distractor: misreads the hour-$0$ row
      { id: "A", text: "Culture $P$ has the larger count at hour $0$, and $P$ grows by the larger constant factor." },
      { id: "B", text: "Culture $Q$ has the larger count at hour $0$, and $P$ grows by the larger constant factor." },
      // distractor: compares the size of the first increase ($320$ vs $250$) instead of the ratio
      { id: "C", text: "Culture $Q$ has the larger count at hour $0$, and $Q$ grows by the larger constant factor." },
      // distractor: assumes both columns double
      { id: "D", text: "Both cultures grow by the same constant factor every $3$ hours." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compare Exponential Growth Models**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** At hour $0$, $640 > 250$, so $Q$ starts larger. The ratios are $\\dfrac{500}{250} = 2$ for $P$ and $\\dfrac{960}{640} = 1.5$ for $Q$, so $P$ grows faster.\n\n**The Full Solution:**\nStep 1: Read the hour-$0$ row: $P$ has $250$ cells and $Q$ has $640$, so $Q$ starts with more cells.\nStep 2: For an exponential model, divide consecutive counts. Culture $P$: $\\dfrac{500}{250} = 2$ and $\\dfrac{1000}{500} = 2$. Culture $Q$: $\\dfrac{960}{640} = 1.5$ and $\\dfrac{1440}{960} = 1.5$.\nStep 3: $P$ multiplies by $2$ every $3$ hours while $Q$ multiplies by $1.5$, so $P$ has the larger growth factor even though it starts smaller. Check: continuing the pattern, $P$ reaches $4{,}000$ at hour $12$ while $Q$ reaches only $3{,}240$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: reverses the hour-$0$ comparison; $250 < 640$.\n* Choice C: compares the raw increases over the first interval, $320$ for $Q$ against $250$ for $P$; exponential growth is compared by RATIOS, not differences.\n* Choice D: the factors are $2$ and $1.5$, not equal.\n\n**Test Day Takeaway:** Compare exponential models by dividing consecutive outputs, and keep the starting value and the growth factor as two separate comparisons.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "compare-growth-models",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-046",
    domain: "advanced-math",
    skills: ["comparing-exponentials"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Account $J$ has a value of $2{,}000(1.05)^{t}$ dollars $t$ years after it was opened, and Account $K$ has a value of $2{,}000(1.09)^{t}$ dollars $t$ years after it was opened. To the nearest dollar, how much greater is the value of Account $K$ than the value of Account $J$ after $10$ years?",
    choices: [
      // distractor: uses simple interest instead of compounding
      { id: "A", text: "$800$" },
      { id: "B", text: "$1{,}477$" },
      // distractor: reports Account $J$'s value rather than the difference
      { id: "C", text: "$3{,}258$" },
      // distractor: reports Account $K$'s value rather than the difference
      { id: "D", text: "$4{,}735$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compare Compound Interest**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $2{,}000(1.09)^{10} \\approx 4{,}734.73$ and $2{,}000(1.05)^{10} \\approx 3{,}257.79$; the difference is about $1{,}477$ dollars.\n\n**The Full Solution:**\nStep 1: Evaluate each model at $t = 10$. Account $K$: $2{,}000(1.09)^{10} \\approx 2{,}000(2.36736) \\approx 4{,}734.73$ dollars.\nStep 2: Account $J$: $2{,}000(1.05)^{10} \\approx 2{,}000(1.62889) \\approx 3{,}257.79$ dollars.\nStep 3: Subtract: $4{,}734.73 - 3{,}257.79 \\approx 1{,}476.94$, which rounds to $1{,}477$ dollars. Check the sizes: $K$ is roughly $45\\%$ larger than $J$, and $\\dfrac{1{,}477}{3{,}258} \\approx 0.45$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($800$): treats the growth as simple interest, computing $2{,}000(0.09)(10) - 2{,}000(0.05)(10) = 1{,}800 - 1{,}000$.\n* Choice C ($3{,}258$): stops after evaluating Account $J$.\n* Choice D ($4{,}735$): stops after evaluating Account $K$ and never subtracts.\n\n**Test Day Takeaway:** \"How much greater\" always ends in a subtraction. Evaluate both exponential models fully before comparing — the gap grows much faster than the rate difference suggests.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-comparison",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-047",
    domain: "advanced-math",
    skills: ["comparing-exponentials"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the purchase price and the annual percent decrease in value of two machines. The value of each machine decreases exponentially from its purchase price at the given annual rate. Which of the following statements comparing the two machines is true?",
    diagram: { type: "dataTable", params: { headers: ["Machine", "Purchase price (dollars)", "Annual percent decrease"], rows: [["R", "36,000", "20%"], ["S", "24,000", "10%"]] } },
    choices: [
      { id: "A", text: "Machine $R$ loses a greater percent of its value each year, and Machine $R$ is worth more than Machine $S$ at the end of year $3$." },
      // distractor: true through year 3 but false from year 4 on, when Machine $S$ is worth more
      { id: "B", text: "Machine $R$ loses a greater percent of its value each year, and Machine $R$ is worth more than Machine $S$ at the end of every year." },
      // distractor: confuses percent rate with dollar loss: $S$ loses $2{,}400$ and $R$ loses $7{,}200$ in year 1
      { id: "C", text: "Machine $S$ loses a greater dollar amount during the first year, because its value decreases more slowly." },
      // distractor: the year-2 values are $23{,}040$ and $19{,}440$, not equal
      { id: "D", text: "The two machines are worth the same amount at the end of year $2$." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Compare Depreciation Models**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** The models are $36{,}000(0.80)^{t}$ and $24{,}000(0.90)^{t}$. At $t = 3$: $18{,}432$ versus $17{,}496$, so $R$ is still worth more — but only just.\n\n**The Full Solution:**\nStep 1: A $20\\%$ annual decrease multiplies the value by $0.80$ each year, and a $10\\%$ decrease multiplies it by $0.90$. So $V_R(t) = 36{,}000(0.80)^{t}$ and $V_S(t) = 24{,}000(0.90)^{t}$.\nStep 2: Machine $R$ loses the greater PERCENT each year, since $20\\% > 10\\%$.\nStep 3: Compare at $t = 3$: $V_R(3) = 36{,}000(0.512) = 18{,}432$ dollars and $V_S(3) = 24{,}000(0.729) = 17{,}496$ dollars, so $R$ is worth more. Check the next year: $V_R(4) = 14{,}745.60$ and $V_S(4) = 15{,}746.40$, so the ranking flips after year $3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: correct through year $3$, but at $t = 4$ Machine $S$ is worth $15{,}746.40$ against Machine $R$'s $14{,}745.60$ — \"every year\" is too strong.\n* Choice C: reverses the dollar comparison. In year $1$, $S$ loses $2{,}400$ dollars while $R$ loses $7{,}200$ dollars.\n* Choice D: at $t = 2$ the values are $23{,}040$ and $19{,}440$ dollars, which are not equal.\n\n**Test Day Takeaway:** A larger percent decrease does not mean a smaller value right away — the starting amount can keep the faster-depreciating item ahead for several years. Test the specific year the choice names.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "depreciation-comparison",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── exponential-growth-decay (5 questions) ────────────────────────
  {
    id: "bank-am-048",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A colony of algae doubles in size every $6$ hours. The colony contains $150$ cells at time $t = 0$. Which of the following functions models the number of cells in the colony $t$ hours after $t = 0$?",
    choices: [
      // distractor: swaps the starting amount and the growth factor
      { id: "A", text: "$f(t) = 2(150)^{t/6}$" },
      // distractor: multiplies $t$ by the doubling time instead of dividing
      { id: "B", text: "$f(t) = 150(2)^{6t}$" },
      { id: "C", text: "$f(t) = 150(2)^{t/6}$" },
      // distractor: swaps the growth factor and the doubling time
      { id: "D", text: "$f(t) = 150(6)^{t/2}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Model from Doubling Time**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Start at $150$, multiply by $2$ once per $6$ hours: $f(t) = 150(2)^{t/6}$.\n\n**The Full Solution:**\nStep 1: An exponential model has the form (starting amount)(growth factor) raised to (number of growth periods). The starting amount is $150$ and the growth factor is $2$.\nStep 2: One doubling period is $6$ hours, so in $t$ hours the number of periods is $\\dfrac{t}{6}$.\nStep 3: The model is $f(t) = 150(2)^{t/6}$. Check: $f(0) = 150(2)^{0} = 150$, and $f(6) = 150(2)^{1} = 300$, exactly double. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: puts $150$ in the base, so $f(0) = 2$ — the colony would start with $2$ cells.\n* Choice B: $f(6) = 150(2)^{36}$, an absurd jump; multiplying by $6$ counts $6$ doublings per hour.\n* Choice D: uses $6$ as the growth factor, so $f(2) = 150(6) = 900$, which is six times the start after only $2$ hours.\n\n**Test Day Takeaway:** The doubling time belongs in the DENOMINATOR of the exponent — it converts elapsed time into a count of growth periods.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-model-setup",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-049",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A machine shop's lathe loses $15\\%$ of its value during each year of ownership. The table gives the lathe's value, in dollars, at purchase and after each of the next three years. Which of the following functions $V$ models the lathe's value, in dollars, in terms of the number of years $t$ since purchase?",
    questionTable: { headers: ["Years since purchase, $t$", "Value (dollars)"], rows: [["$0$", "$24{,}000$"], ["$1$", "$20{,}400$"], ["$2$", "$17{,}340$"], ["$3$", "$14{,}739$"]] },
    choices: [
      // distractor: used the loss rate 0.15 as the growth factor instead of 1 - 0.15
      { id: "A", text: "$V(t)=24000(0.15)^{t}$" },
      { id: "B", text: "$V(t)=24000(0.85)^{t}$" },
      // distractor: used 1.15, which increases the value by 15% each year
      { id: "C", text: "$V(t)=24000(1.15)^{t}$" },
      // distractor: used the year-1 value 20,400 as the value at t = 0
      { id: "D", text: "$V(t)=20400(0.85)^{t}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compound Depreciation Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Losing $15\\%$ keeps $85\\%$, and the value at $t=0$ is $\\$24{,}000$, so $V(t)=24000(0.85)^{t}$.\n\n**The Full Solution:**\nStep 1: The table confirms a constant ratio: $20{,}400/24{,}000=0.85$ and $17{,}340/20{,}400=0.85$.\nStep 2: An exponential decay model is $V(t)=V_{0}(1-r)^{t}$ with $V_{0}=24{,}000$ and $r=0.15$.\nStep 3: So $V(t)=24000(0.85)^{t}$. Check at $t=3$: $24000(0.85)^{3}=14{,}739$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($V(t)=24000(0.15)^{t}$): uses the loss rate as the growth factor, giving $\\$3{,}600$ after one year.\n* Choice C ($V(t)=24000(1.15)^{t}$): increases the value by $15\\%$ each year instead of decreasing it.\n* Choice D ($V(t)=20400(0.85)^{t}$): uses the year-$1$ value as the value at $t=0$.\n\n**Test Day Takeaway:** A percent decrease becomes the factor $1-r$; the initial amount is the value when $t=0$, not the first row after it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "decay-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-050",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "fill-in",
    question: "The table gives the mass, in grams, of a sample of a radioactive isotope at two times after the sample was first measured. The mass of the sample decreases exponentially. What is the mass of the sample, in grams, $72$ hours after it was first measured?",
    diagram: { type: "dataTable", params: { headers: ["Time (hours)", "Mass (grams)"], rows: [["0", "1,920"], ["12", "960"]] } },
    correctAnswer: "30",
    explanation: "**SAT Pattern: Half-Life Evaluation**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~35s):** The mass halves in $12$ hours, and $72$ hours is $6$ half-lives: $\\dfrac{1{,}920}{2^{6}} = \\dfrac{1{,}920}{64} = 30$ grams.\n\n**The Full Solution:**\nStep 1: From the table, the mass falls from $1{,}920$ grams to $960$ grams in $12$ hours, and $\\dfrac{960}{1{,}920} = \\dfrac{1}{2}$, so the half-life is $12$ hours.\nStep 2: The model is $A(t) = 1{,}920\\left(\\dfrac{1}{2}\\right)^{t/12}$, where $t$ is in hours.\nStep 3: At $t = 72$, the exponent is $\\dfrac{72}{12} = 6$, so $A(72) = 1{,}920\\left(\\dfrac{1}{2}\\right)^{6} = \\dfrac{1{,}920}{64} = 30$ grams. Check by halving six times: $1{,}920 \\to 960 \\to 480 \\to 240 \\to 120 \\to 60 \\to 30$. $\\checkmark$\n\n**Common Mistakes:** Dividing by $6$ instead of halving six times, which gives $320$ grams. Counting only five half-lives and answering $60$ grams.\n\n**Test Day Takeaway:** Convert the elapsed time into a COUNT of half-lives first, then halve that many times — the count is the exponent, not the divisor.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "half-life-evaluation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-051",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A savings deposit of $\\$2{,}500$ grows by $8\\%$ each year, with no withdrawals. The table gives the deposit's balance, in dollars, at the end of each of its first three years. After how many whole years is the balance first greater than $\\$4{,}000$?",
    questionTable: { headers: ["Year", "Balance (dollars)"], rows: [["$1$", "$2{,}700.00$"], ["$2$", "$2{,}916.00$"], ["$3$", "$3{,}149.28$"]] },
    choices: [
      // distractor: stopped at year 6, whose balance 3,967.19 is still below 4,000
      { id: "A", text: "$6$" },
      { id: "B", text: "$7$" },
      // distractor: treated the growth as simple interest of 200 dollars per year, solving 200t > 1500
      { id: "C", text: "$8$" },
      // distractor: divided the required growth factor 1.6 by the rate 0.08
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compound Growth Threshold**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Continue multiplying by $1.08$: year $6$ gives $\\$3{,}967.19$ and year $7$ gives $\\$4{,}284.56$, the first balance above $\\$4{,}000$.\n\n**The Full Solution:**\nStep 1: The balance after $t$ years is $2500(1.08)^{t}$, which matches the table: $2500(1.08)^{3}=3{,}149.28$.\nStep 2: Solve $2500(1.08)^{t}>4000$, or $(1.08)^{t}>1.6$.\nStep 3: Testing whole years, $(1.08)^{6}=1.5869$ and $(1.08)^{7}=1.7138$, so the first year that works is $t=7$. Check: $2500(1.08)^{7}=4{,}284.56>4{,}000$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): stops at year $6$, whose balance $\\$3{,}967.19$ is still below $\\$4{,}000$.\n* Choice C ($8$): treats the growth as simple interest of $\\$200$ per year, solving $200t>1500$.\n* Choice D ($20$): divides the required factor $1.6$ by the rate $0.08$.\n\n**Test Day Takeaway:** Threshold questions want the first whole year past the line — check the year before it as well as the year you land on.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "growth-threshold",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-052",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The number of deer in a preserve $t$ years after monitoring began is modeled by $D(t) = \\dfrac{5{,}400}{3 + 24e^{-0.4t}}$. As $t$ increases without bound, the value of $D(t)$ gets closer and closer to which of the following?",
    choices: [
      // distractor: reports $D(0) = 200$, the herd size when monitoring began
      { id: "A", text: "$200$" },
      // distractor: reports half the ceiling, the size at the model's steepest point
      { id: "B", text: "$900$" },
      { id: "C", text: "$1{,}800$" },
      // distractor: quotes the numerator, assuming the denominator's constant is $1$ rather than $3$
      { id: "D", text: "$5{,}400$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Logistic Carrying Capacity**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** As $t \\to \\infty$, $e^{-0.4t} \\to 0$, so the denominator approaches $3$, not $1$. The value approaches $\\dfrac{5{,}400}{3} = 1{,}800$ deer.\n\n**The Full Solution:**\nStep 1: The only place $t$ appears is in $e^{-0.4t}$. Because the exponent $-0.4t$ becomes large and negative as $t$ grows, $e^{-0.4t}$ shrinks toward $0$.\nStep 2: The denominator $3 + 24e^{-0.4t}$ therefore approaches $3 + 24(0) = 3$. The constant term of the denominator survives, and here that constant is $3$ rather than the $1$ of the textbook form.\nStep 3: So $D(t)$ approaches $\\dfrac{5{,}400}{3} = 1{,}800$ deer, the largest population the model allows. Check the trend: $D(0) = \\dfrac{5{,}400}{27} = 200$, $D(10) \\approx 1{,}570$, and $D(20) \\approx 1{,}795$ — rising toward $1{,}800$ but never reaching it. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($200$): this is $D(0) = \\dfrac{5{,}400}{3 + 24}$, the starting herd size, not the long-run size.\n* Choice B ($900$): half of $1{,}800$ is the population at the model's steepest point, not its ceiling.\n* Choice D ($5{,}400$): quotes the numerator, which is the ceiling only when the denominator's constant term is $1$; here it is $3$.\n\n**Test Day Takeaway:** In $\\dfrac{N}{c + Ae^{-kt}}$ with $k > 0$ the decaying term dies out, so the long-run value is $\\dfrac{N}{c}$ — read the denominator's constant before quoting the numerator.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "logistic-carrying-capacity",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── exponential-y-intercept (3 questions) ─────────────────────────
  {
    id: "bank-am-053",
    domain: "advanced-math",
    skills: ["exponential-y-intercept"],
    difficulty: "easy",
    type: "fill-in",
    question: "The table shows the value of the exponential function $f$ at three values of $x$. In the $xy$-plane, the graph of $y = f(x)$ intersects the $y$-axis at the point $(0, k)$. What is the value of $k$?",
    diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["0", "400"], ["1", "600"], ["2", "900"]] } },
    correctAnswer: "400",
    explanation: "**SAT Pattern: y-intercept of Exponential**\n\n**The correct answer is $400$.**\n\n**The Fast Way (~10s):** The $y$-intercept is the output at $x = 0$, and the table gives $f(0) = 400$.\n\n**The Full Solution:**\nStep 1: A graph crosses the $y$-axis where $x = 0$, so $k = f(0)$.\nStep 2: The first row of the table gives $f(0) = 400$.\nStep 3: So the graph passes through $(0, 400)$ and $k = 400$. Check that the table really is exponential: $\\dfrac{600}{400} = 1.5$ and $\\dfrac{900}{600} = 1.5$, a constant ratio, so $f(x) = 400(1.5)^{x}$ and $f(0) = 400$. $\\checkmark$\n\n**Common Mistakes:** Reporting $600$, the value at $x = 1$ rather than at $x = 0$. Reporting $1.5$, the growth factor, which is the base rather than the initial value.\n\n**Test Day Takeaway:** For $f(x) = ab^{x}$ the $y$-intercept is always $a$, the value at $x = 0$ — the growth factor never appears in it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "y-intercept-eval",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-054",
    domain: "advanced-math",
    skills: ["exponential-y-intercept"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $M$ defined by $M(t) = 320(1.15)^{t}$ models the number of members of a hiking club $t$ years after the club was founded. Which of the following is the best interpretation of $320$ in this context?",
    choices: [
      { id: "A", text: "The club had $320$ members when it was founded." },
      // distractor: reads the initial value as a constant yearly increase
      { id: "B", text: "The club gains $320$ members each year." },
      // distractor: confuses the initial value with the growth rate
      { id: "C", text: "The number of members increases by $320\\%$ each year." },
      // distractor: evaluates at $t = 1$ instead of $t = 0$
      { id: "D", text: "The club had $320$ members one year after it was founded." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Interpret Initial Value in Context**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** $M(0) = 320(1.15)^{0} = 320$, so $320$ is the membership at the founding.\n\n**The Full Solution:**\nStep 1: In $M(t) = ab^{t}$, the constant $a$ is the output when the exponent is $0$.\nStep 2: Substituting $t = 0$ gives $M(0) = 320(1.15)^{0} = 320(1) = 320$.\nStep 3: Since $t$ counts years since the club was founded, $t = 0$ is the founding, so the club began with $320$ members. Check the other constant: $1.15$ means membership grows by $15\\%$ per year. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: a fixed yearly gain would be a linear model like $320 + ct$; here the yearly gain grows every year.\n* Choice C: the growth rate is $15\\%$, carried by the base $1.15$, not by $320$.\n* Choice D: after one year the club has $M(1) = 320(1.15) = 368$ members, not $320$.\n\n**Test Day Takeaway:** In an exponential model the coefficient out front is the value at time zero; the base carries the rate. Read each constant's job before interpreting.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "interpret-initial-value",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-055",
    domain: "advanced-math",
    skills: ["exponential-y-intercept"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The value of a rare coin, in dollars, $t$ years after it was appraised is modeled by $V(t) = a \\cdot b^{t}$, where $a$ and $b$ are constants. The table gives the coin's value at two times. What is the value of $b$?",
    diagram: { type: "dataTable", params: { headers: ["Time t (years)", "Value (dollars)"], rows: [["0", "400"], ["2", "576"]] } },
    choices: [
      // distractor: divides the two-year ratio by $2$ instead of taking its square root
      { id: "A", text: "$0.72$" },
      { id: "B", text: "$1.2$" },
      // distractor: reports the two-year growth factor as the annual factor
      { id: "C", text: "$1.44$" },
      // distractor: subtracts the square roots instead of dividing them
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Find Base from Two Points**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $\\dfrac{V(2)}{V(0)} = \\dfrac{576}{400} = 1.44 = b^{2}$, so $b = \\sqrt{1.44} = 1.2$.\n\n**The Full Solution:**\nStep 1: At $t = 0$, $V(0) = a \\cdot b^{0} = a$, and the table gives $V(0) = 400$, so $a = 400$.\nStep 2: At $t = 2$, $400b^{2} = 576$, so $b^{2} = \\dfrac{576}{400} = 1.44$.\nStep 3: Since a growth factor is positive, $b = \\sqrt{1.44} = 1.2$. Check: $400(1.2)^{2} = 400(1.44) = 576$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.72$): divides $1.44$ by $2$; two years of growth compound, so the ratio is a square, not a doubling.\n* Choice C ($1.44$): this is the factor over TWO years, not one.\n* Choice D ($4$): computes $\\sqrt{576} - \\sqrt{400} = 24 - 20$ instead of $\\dfrac{\\sqrt{576}}{\\sqrt{400}}$.\n\n**Test Day Takeaway:** Two points that are $n$ periods apart give $b^{n}$, so take the $n$th root — dividing by $n$ is the linear reflex and is always wrong here.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "find-base-from-points",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── distributive-property (4 questions) ───────────────────────────
  {
    id: "bank-am-056",
    domain: "advanced-math",
    skills: ["distributive-property"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A humidity index $r$ enters a forecaster's overnight temperature correction, in degrees Celsius, as $-4(2r - 7) + 3r$, a form the forecaster wants rewritten with a single $r$ term. Which of the following is equivalent to that correction?",
    choices: [
      // distractor: subtracts the $3r$ instead of adding it, giving $-8r - 3r = -11r$
      { id: "A", text: "$-11r + 28$" },
      // distractor: multiplies $-4$ by $-7$ but keeps the result negative, giving $-28$
      { id: "B", text: "$-5r - 28$" },
      { id: "C", text: "$-5r + 28$" },
      // distractor: distributes $+4$ instead of $-4$, giving $8r - 28 + 3r$
      { id: "D", text: "$11r - 28$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Distribute a Negative**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Distributing gives $-8r + 28$, and adding the trailing $3r$ leaves $-5r + 28$.\n\n**The Full Solution:**\nStep 1: Multiply each term inside the parentheses by $-4$: $-4(2r) = -8r$ and $-4(-7) = +28$.\nStep 2: The expression becomes $-8r + 28 + 3r$.\nStep 3: Combine the like terms $-8r$ and $3r$ to get $-5r + 28$. Check: at $r = 1$ the original is $-4(-5) + 3 = 23$, and $-5(1) + 28 = 23$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-11r + 28$): treats the $+3r$ as a subtraction, combining $-8r$ and $-3r$.\n* Choice B ($-5r - 28$): forgets that a negative times a negative is positive, so $-4(-7)$ is recorded as $-28$.\n* Choice D ($11r - 28$): drops the minus sign from the $-4$ before distributing, flipping both signs.\n\n**Test Day Takeaway:** Attach the minus sign to the factor before distributing, then combine like terms — checking one value of the variable catches a stray sign instantly.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "distribute-monomial",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-057",
    domain: "advanced-math",
    skills: ["distributive-property"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Expanding the product $(5x + c)(2x - 3)$ gives $10x^2 + 11x - 39$ for exactly one constant $c$, which a coach reads as a hurdle spacing in meters before laying out a lane on the track. What is the value of that constant?",
    choices: [
      // distractor: solves $-3c = 39$, flipping the sign of the constant term
      { id: "A", text: "$-13$" },
      // distractor: quotes the $3$ inside $2x - 3$ instead of solving for $c$
      { id: "B", text: "$3$" },
      // distractor: reports the middle coefficient $11$ rather than the constant $c$
      { id: "C", text: "$11$" },
      { id: "D", text: "$13$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: FOIL Two Binomials**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The constant term of the product is $c(-3) = -39$, so $c = 13$.\n\n**The Full Solution:**\nStep 1: Expand: $(5x + c)(2x - 3) = 10x^2 - 15x + 2cx - 3c$.\nStep 2: The constant term is $-3c$, and it must equal $-39$, so $c = 13$.\nStep 3: Confirm with the middle term: $-15 + 2(13) = 11$, matching $11x$. Check: $(5x + 13)(2x - 3) = 10x^2 + 11x - 39$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-13$): loses a negative sign, since $-3c = -39$ gives a positive $c$.\n* Choice B ($3$): copies a number out of the given binomial.\n* Choice C ($11$): reads off the coefficient of $x$, which is $-15 + 2c$, not $c$.\n\n**Test Day Takeaway:** The constant term of a product comes only from the two constants — solve there first, then use the middle term as a check.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "foil-binomials",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-058",
    domain: "advanced-math",
    skills: ["distributive-property"],
    difficulty: "medium",
    type: "fill-in",
    question: "The polynomial $p$ is defined by $p(x)=(2x-5)(x+k)$, where $k$ is a constant. When $p(x)$ is expanded, its constant term is $-35$. What is the coefficient of $x$ in the expanded form of $p(x)$?",
    correctAnswer: "9",
    explanation: "**SAT Pattern: Constant Term from Factored Form**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~25s):** The constant term is $-5k=-35$, so $k=7$, and the $x$-coefficient is $2k-5=9$.\n\n**The Full Solution:**\nStep 1: Expand: $(2x-5)(x+k)=2x^{2}+2kx-5x-5k=2x^{2}+(2k-5)x-5k$.\nStep 2: Set the constant term equal to $-35$: $-5k=-35$, so $k=7$.\nStep 3: The coefficient of $x$ is $2k-5=14-5=9$. Check: $(2x-5)(x+7)=2x^{2}+9x-35$ ✓\n\n**Common Mistakes:**\n* $7$: reported $k$ instead of the coefficient of $x$.\n* $19$: used $2k+5$ instead of $2k-5$, dropping the sign of the $-5$.\n* $-35$: reported the constant term already given in the question.\n\n**Test Day Takeaway:** The constant term of a product of binomials is the product of their constants — solve for the parameter there first, then read off the middle coefficient.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "foil-identify-constant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-059",
    domain: "advanced-math",
    skills: ["distributive-property"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A design constant $k$ satisfies the following condition: when the product $(x^{2}+kx-4)(2x-5)$ is expanded, the sum of its coefficients of even powers of $x$ minus the sum of its coefficients of odd powers of $x$ equals $63$. What is the value of $k$?",
    choices: [
      // distractor: used f(1), the plain sum of all coefficients, solving -3k+9=63
      { id: "A", text: "$-18$" },
      // distractor: reversed the two sums, solving -(7k+21)=63
      { id: "B", text: "$-12$" },
      // distractor: substituted x=-1 but wrote k(-1) as +k, solving -7k+21=63
      { id: "C", text: "$-6$" },
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Alternating-Sign Coefficient Sum via $f(-1)$**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The even-power coefficients minus the odd-power coefficients is exactly $f(-1)$. Substituting $x=-1$ gives $(1-k-4)(-2-5)=7k+21$, so $7k+21=63$ and $k=6$.\n\n**The Full Solution:**\nStep 1: Expand the product: $(x^{2}+kx-4)(2x-5)=2x^{3}+(2k-5)x^{2}+(-5k-8)x+20$.\nStep 2: The even-power coefficients are $2k-5$ and $20$; the odd-power coefficients are $2$ and $-5k-8$. Their difference is $(2k-5+20)-(2-5k-8)=7k+21$.\nStep 3: Solve $7k+21=63$, so $7k=42$ and $k=6$. Check: with $k=6$ the expansion is $2x^{3}+7x^{2}-38x+20$, and $(7+20)-(2-38)=27+36=63$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-18$): used $f(1)$, the plain sum of all coefficients, solving $-3k+9=63$.\n* Choice B ($-12$): reversed the two sums, solving $-(7k+21)=63$.\n* Choice C ($-6$): substituted $x=-1$ but wrote $k(-1)$ as $+k$, solving $-7k+21=63$.\n\n**Test Day Takeaway:** An alternating sum of coefficients is the polynomial evaluated at $x=-1$; substitute rather than expand.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cube-of-binomial",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-060",
    domain: "advanced-math",
    skills: ["combining-like-terms"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives the mass, in grams, of the resin and of the hardener in a two-part epoxy batch for three values of $a$. The batch's total mass is $(7a^{2}-3a+6)+(2a^{2}+8a-11)$ grams. Which expression is equivalent to the total mass, in grams?",
    questionTable: { headers: ["$a$", "Resin (grams)", "Hardener (grams)"], rows: [["$2$", "$28$", "$13$"], ["$3$", "$60$", "$31$"], ["$4$", "$106$", "$53$"]] },
    choices: [
      // distractor: combined -3a and 8a as 8 - 3 = 5 but kept the sign of the first term, giving -5a
      { id: "A", text: "$9a^{2}-5a-5$" },
      { id: "B", text: "$9a^{2}+5a-5$" },
      // distractor: computed the constants as 6 - (-11) = 17 instead of 6 + (-11) = -5
      { id: "C", text: "$9a^{2}+5a+17$" },
      // distractor: added the exponents of the two a-squared terms instead of adding their coefficients
      { id: "D", text: "$9a^{4}+5a-5$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Combine Like Terms**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Add matching terms: $7a^{2}+2a^{2}=9a^{2}$, $-3a+8a=5a$, $6-11=-5$.\n\n**The Full Solution:**\nStep 1: Group like terms: $(7a^{2}+2a^{2})+(-3a+8a)+(6-11)$.\nStep 2: Combine each group: $9a^{2}$, $5a$, and $-5$.\nStep 3: The total mass is $9a^{2}+5a-5$ grams. Check at $a=3$: $81+15-5=91=60+31$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9a^{2}-5a-5$): combines $-3a$ and $8a$ as $8-3=5$ but keeps the sign of the first term, giving $-5a$.\n* Choice C ($9a^{2}+5a+17$): computes the constants as $6-(-11)=17$.\n* Choice D ($9a^{4}+5a-5$): adds the exponents of the two $a^{2}$ terms instead of their coefficients.\n\n**Test Day Takeaway:** Adding polynomials only ever changes coefficients — the exponents stay exactly where they were.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "combine-polynomial",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-061",
    domain: "advanced-math",
    skills: ["combining-like-terms"],
    difficulty: "easy",
    type: "fill-in",
    question: "The expression $7m + 4n - 3m + 9n$ is equivalent to $am + bn$, where $a$ and $b$ are constants. What is the value of $b$?",
    correctAnswer: "13",
    explanation: "**SAT Pattern: Coefficient After Combining**\n\n**The correct answer is $13$.**\n\n**The Fast Way (~10s):** Only the $n$-terms decide $b$: $4n + 9n = 13n$, so $b = 13$.\n\n**The Full Solution:**\nStep 1: Group the like terms: $(7m - 3m) + (4n + 9n)$.\nStep 2: Combine each group separately: $7m - 3m = 4m$, and $4n + 9n = 13n$, so the expression equals $4m + 13n$.\nStep 3: Matching $4m + 13n$ with $am + bn$ gives $a = 4$ and $b = 13$. Check with $m = 1$ and $n = 1$: the original is $7 + 4 - 3 + 9 = 17$, and $4(1) + 13(1) = 17$. $\\checkmark$\n\n**Common Mistakes:** Reporting $4$, the coefficient of $m$, when the question asks for the coefficient of $n$; adding every coefficient in sight, $7 + 4 - 3 + 9 = 17$; letting the minus sign in front of $3m$ leak into the $n$-terms and computing $9 - 4 = 5$.\n\n**Test Day Takeaway:** Combining like terms is two independent sums, one per variable. Decide which coefficient the question wants before you simplify.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "combine-terms",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-062",
    domain: "advanced-math",
    skills: ["combining-like-terms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An observatory models its total power draw as $5x^{2}-3x+8$ kilowatts and its dome-drive draw as $2x^{2}+7x-4$ kilowatts, where $x\\ge1$ is the number of active instruments. Which expression models the remaining power draw?",
    choices: [
      // distractor: subtracts the leading terms but adds the other two, using -3 + 7 = 4 and 8 + (-4) = 4
      { id: "A", text: "$3x^{2}+4x+4$" },
      // distractor: stops distributing the minus sign after the middle term, using 8 - 4 = 4 for the constant
      { id: "B", text: "$3x^{2}-10x+4$" },
      // distractor: adds the two polynomials outright instead of subtracting
      { id: "C", text: "$7x^{2}+4x+4$" },
      { id: "D", text: "$3x^{2}-10x+12$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Subtract Polynomials**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $(5x^{2}-3x+8)-(2x^{2}+7x-4)=3x^{2}-10x+12$ once the minus sign reaches all three terms.\n\n**The Full Solution:**\n\nStep 1: The remaining draw is the total minus the dome drive: $(5x^{2}-3x+8)-(2x^{2}+7x-4)$.\n\nStep 2: Distribute the minus sign across every term of the second polynomial: $5x^{2}-3x+8-2x^{2}-7x+4$.\n\nStep 3: Combine like terms: $5x^{2}-2x^{2}=3x^{2}$, $-3x-7x=-10x$, and $8+4=12$, giving $3x^{2}-10x+12$. Check at $x=2$: the total is $22$, the dome drive is $18$, and $3(4)-20+12=4=22-18$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($3x^{2}+4x+4$): subtracts only the leading terms and adds the other two.\n* Choice B ($3x^{2}-10x+4$): stops distributing the minus sign before the constant, using $8-4$.\n* Choice C ($7x^{2}+4x+4$): adds the polynomials instead of subtracting.\n\n**Test Day Takeaway:** The minus sign in front of a parenthesis belongs to every term inside it, the constant included.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "subtract-polynomials",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-063",
    domain: "advanced-math",
    skills: ["combining-like-terms", "distributive-property"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A rectangular backdrop panel for a stage set has area $(3x-4)(2x+k)$ square feet, where $k$ is a constant and $x>2$. If that area equals $6x^{2}+bx-28$ for every value of $x$, what is the value of $b$?",
    choices: [
      // distractor: solves -4k = -28 as k = -7, then reports 3(-7) - 8 = -29
      { id: "A", text: "$-29$" },
      // distractor: reverses the signs when collecting the middle terms, computing 8x - 21x
      { id: "B", text: "$-13$" },
      { id: "C", text: "$13$" },
      // distractor: reports only the 3k term, dropping the -8x from the product
      { id: "D", text: "$21$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Match Coefficients of Equivalent Polynomials**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The constant term gives $-4k=-28$, so $k=7$, and the middle coefficient is $3(7)-8=13$.\n\n**The Full Solution:**\nStep 1: Expanding gives $(3x-4)(2x+k)=6x^{2}+3kx-8x-4k$.\nStep 2: Matching constant terms: $-4k=-28$, so $k=7$.\nStep 3: Matching the $x$ terms: $b=3k-8=21-8=13$. Check: $(3x-4)(2x+7)=6x^{2}+21x-8x-28=6x^{2}+13x-28$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-29$): solves $-4k=-28$ as $k=-7$, which expands to $6x^{2}-29x+28$ and does not match the constant.\n* Choice B ($-13$): flips the signs of both middle terms, computing $8x-21x$.\n* Choice D ($21$): stops at $3k$ and never subtracts the $8x$ from $-4$ times $2x$.\n\n**Test Day Takeaway:** Read the constant term first to pin the unknown, then collect both middle terms with their signs.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "multi-distribute-combine",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-064",
    domain: "advanced-math",
    skills: ["difference-of-squares"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A steel shim's face area, in square millimeters, is given by $9x^{2}-49$. Which of the following expressions is equivalent to that area?",
    choices: [
      // distractor: treated the expression as a perfect square trinomial instead of a difference of squares
      { id: "A", text: "$(3x-7)^{2}$" },
      // distractor: did not take the square root of 49, using 49 in place of 7
      { id: "B", text: "$(3x-49)(3x+49)$" },
      { id: "C", text: "$(3x-7)(3x+7)$" },
      // distractor: did not take the square root of 9x squared, using 9x in place of 3x
      { id: "D", text: "$(9x-7)(9x+7)$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Difference of Squares**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** $9x^{2}=(3x)^{2}$ and $49=7^{2}$, so the area factors as $(3x-7)(3x+7)$.\n\n**The Full Solution:**\nStep 1: Recognize the form $A^{2}-B^{2}$ with $A=3x$ and $B=7$.\nStep 2: The difference of squares factors as $(A-B)(A+B)$.\nStep 3: So $9x^{2}-49=(3x-7)(3x+7)$. Check by expanding: $9x^{2}+21x-21x-49=9x^{2}-49$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(3x-7)^{2}$): expands to $9x^{2}-42x+49$, a perfect square rather than a difference.\n* Choice B ($(3x-49)(3x+49)$): does not take the square root of $49$.\n* Choice D ($(9x-7)(9x+7)$): does not take the square root of $9x^{2}$.\n\n**Test Day Takeaway:** Factor a difference of squares by square-rooting each term — the middle terms cancel, which is why no $x$-term appears.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "difference-of-squares",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-065",
    domain: "advanced-math",
    skills: ["difference-of-squares"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the expression $16x^4-k^4$, which appears in a manufacturer's pricing formula for stainless steel travel mugs, $k$ is a positive constant. Which of the following is equivalent to that expression?",
    choices: [
      // distractor: takes the square root of 16x^4 as 4x instead of 4x^2
      { id: "A", text: "$(4x-k^2)(4x+k^2)$" },
      // distractor: treats the expression as the perfect square (4x^2 - k^2)^2
      { id: "B", text: "$(2x-k)^2(2x+k)^2$" },
      // distractor: halves the leading coefficient of the sum-of-squares factor
      { id: "C", text: "$(2x-k)(2x+k)(2x^2+k^2)$" },
      { id: "D", text: "$(2x-k)(2x+k)(4x^2+k^2)$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Two-Step Difference of Squares**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $16x^4-k^4=(4x^2)^2-(k^2)^2=(4x^2-k^2)(4x^2+k^2)$, and $4x^2-k^2$ splits again into $(2x-k)(2x+k)$.\n\n**The Full Solution:**\nStep 1: Write the expression as a difference of two squares: $16x^4-k^4=(4x^2)^2-(k^2)^2$.\nStep 2: Factor once: $(4x^2-k^2)(4x^2+k^2)$. The second factor is a sum of squares and does not factor further over the real numbers.\nStep 3: Factor $4x^2-k^2=(2x)^2-k^2=(2x-k)(2x+k)$, giving $(2x-k)(2x+k)(4x^2+k^2)$. Check: $(2x-k)(2x+k)=4x^2-k^2$, and $(4x^2-k^2)(4x^2+k^2)=16x^4-k^4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(4x-k^2)(4x+k^2)$): reads $\\sqrt{16x^4}$ as $4x$ rather than $4x^2$, so the product is $16x^2-k^4$.\n* Choice B ($(2x-k)^2(2x+k)^2$): treats the expression as $(4x^2-k^2)^2$, which expands to $16x^4-8x^2k^2+k^4$.\n* Choice C ($(2x-k)(2x+k)(2x^2+k^2)$): halves the leading coefficient of the sum-of-squares factor, giving $8x^4+\\ldots$ instead of $16x^4$.\n\n**Test Day Takeaway:** Difference of squares can fire twice: check whether the first factor is itself a difference of squares before stopping.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "difference-of-squares",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-066",
    domain: "advanced-math",
    skills: ["difference-of-squares"],
    difficulty: "medium",
    type: "fill-in",
    question: "The table gives the side lengths of two square dies. How much greater, in square millimeters, is the face area of the larger die than the face area of the smaller die?",
    questionTable: { headers: ["Die", "Side length (millimeters)"], rows: [["Larger", "$53$"], ["Smaller", "$47$"]] },
    correctAnswer: "600",
    explanation: "**SAT Pattern: Difference of Squares Application**\n\n**The correct answer is $600$.**\n\n**The Fast Way (~15s):** $53^{2}-47^{2}=(53-47)(53+47)=6\\cdot 100=600$.\n\n**The Full Solution:**\nStep 1: Each face area is the square of a side, so the difference is $53^{2}-47^{2}$.\nStep 2: Factor as a difference of squares: $(53-47)(53+47)$.\nStep 3: Evaluate: $6\\cdot 100=600$ square millimeters. Check directly: $2809-2209=600$ ✓\n\n**Common Mistakes:**\n* $6$: subtracted the side lengths instead of the areas.\n* $36$: squared the difference of the sides, computing $(53-47)^{2}$.\n* $100$: reported the sum of the side lengths, stopping halfway through the factoring.\n\n**Test Day Takeaway:** A difference of two squares of nearby numbers is fastest as (difference)(sum) — no squaring required.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "difference-of-squares-application",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-067",
    domain: "advanced-math",
    skills: ["difference-of-squares"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "An irrigation canal is $x^{2}-9$ meters deep and $x^{2}+9$ meters wide, and a straight reach of it runs $x^{4}+81$ meters, where $x>3$. Which expression gives the volume of water, in cubic meters, that the reach holds when full?",
    choices: [
      { id: "A", text: "$x^{8}-6{,}561$" },
      // distractor: squares x^4 but leaves 81 unsquared in the second step
      { id: "B", text: "$x^{8}-81$" },
      // distractor: uses a plus sign, as if (a - b)(a + b) gave a^2 + b^2
      { id: "C", text: "$x^{8}+6{,}561$" },
      // distractor: multiplies the exponents, treating x^4 times x^4 as x^16
      { id: "D", text: "$x^{16}-6{,}561$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Nested Difference of Squares**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** $(x^{2}-9)(x^{2}+9)=x^{4}-81$, and $(x^{4}-81)(x^{4}+81)=x^{8}-6{,}561$.\n\n**The Full Solution:**\nStep 1: The depth and the width form a difference of squares: $(x^{2})^{2}-9^{2}=x^{4}-81$.\nStep 2: That result pairs with the length as a second difference of squares: $(x^{4})^{2}-81^{2}$.\nStep 3: Since $(x^{4})^{2}=x^{8}$ and $81^{2}=6{,}561$, the volume is $x^{8}-6{,}561$ cubic meters. Check: at $x=4$ the three measurements are 7, 25, and 337 meters, and $7(25)(337)=58{,}975$, while $4^{8}-6{,}561=65{,}536-6{,}561=58{,}975$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($x^{8}-81$): squares the variable part but not the 81 in the second step.\n* Choice C ($x^{8}+6{,}561$): reverses the sign; a difference of squares never produces a sum.\n* Choice D ($x^{16}-6{,}561$): multiplies the exponents instead of adding them.\n\n**Test Day Takeaway:** Each difference-of-squares step squares BOTH pieces — the variable power and the constant.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "nested-difference-of-squares",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── perfect-square-trinomial (4 questions) ────────────────────────
  {
    id: "bank-am-068",
    domain: "advanced-math",
    skills: ["perfect-square-trinomial"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Beside a track, a square warm-up grid has sides of length $3w + 5$ meters, where $w$ counts the extra lane widths added to it. In square meters, the area of the grid is equivalent to which expression?",
    choices: [
      // distractor: doubles $3w$ instead of squaring it, giving $6w^2$ for the leading term
      { id: "A", text: "$6w^2 + 30w + 25$" },
      // distractor: squares each term separately and omits the cross term entirely
      { id: "B", text: "$9w^2 + 25$" },
      // distractor: uses one copy of the cross product, $3w \cdot 5 = 15w$, instead of two
      { id: "C", text: "$9w^2 + 15w + 25$" },
      { id: "D", text: "$9w^2 + 30w + 25$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Expand Perfect Square**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $(3w + 5)^2 = (3w)^2 + 2(3w)(5) + 5^2 = 9w^2 + 30w + 25$.\n\n**The Full Solution:**\nStep 1: The area of a square is the side length squared, so the area is $(3w + 5)^2$.\nStep 2: Apply $(a + b)^2 = a^2 + 2ab + b^2$ with $a = 3w$ and $b = 5$: the terms are $9w^2$, $2(3w)(5) = 30w$, and $25$.\nStep 3: The area is $9w^2 + 30w + 25$ square meters. Check: at $w = 1$ the side is $8$ meters and the area is $64$, while $9 + 30 + 25 = 64$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6w^2 + 30w + 25$): squaring $3w$ gives $9w^2$, not $6w^2$; the coefficient is squared along with the variable.\n* Choice B ($9w^2 + 25$): squares each term and forgets the middle term, which is the most common error with a squared binomial.\n* Choice C ($9w^2 + 15w + 25$): writes the cross product once instead of twice, so the middle coefficient is half of what it should be.\n\n**Test Day Takeaway:** A squared binomial always has three terms, and the middle one carries a factor of $2$ — test $w = 1$ to confirm.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "expand-perfect-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-069",
    domain: "advanced-math",
    skills: ["perfect-square-trinomial"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A roof's snow load, in kilopascals, is given by $49t^2 - 56t + 16$ at temperature index $t$, and an engineer needs that load rewritten as a squared binomial before checking it against a code limit. Which of the following is that form?",
    choices: [
      // distractor: uses the constant term $16$ itself instead of its square root $4$
      { id: "A", text: "$(7t - 16)^2$" },
      // distractor: gives a middle term of $+56t$, the wrong sign
      { id: "B", text: "$(7t + 4)^2$" },
      // distractor: is a difference of squares, which has no middle term at all
      { id: "C", text: "$(7t - 4)(7t + 4)$" },
      { id: "D", text: "$(7t - 4)^2$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Factor Perfect Square Trinomial**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** $\\sqrt{49t^2} = 7t$, $\\sqrt{16} = 4$, and $2(7t)(4) = 56t$ matches the middle term, so the load is $(7t - 4)^2$.\n\n**The Full Solution:**\nStep 1: The first and last terms are perfect squares: $49t^2 = (7t)^2$ and $16 = 4^2$.\nStep 2: For a perfect square trinomial the middle term must be $2(7t)(4) = 56t$, and here it appears as $-56t$, so the binomial carries a minus sign.\nStep 3: The load is $(7t - 4)^2$. Check: $(7t - 4)^2 = 49t^2 - 56t + 16$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(7t - 16)^2$): squares to $49t^2 - 224t + 256$, since $16$ was never square-rooted.\n* Choice B ($(7t + 4)^2$): squares to $49t^2 + 56t + 16$, with the middle sign reversed.\n* Choice C ($(7t - 4)(7t + 4)$): expands to $49t^2 - 16$, losing the middle term entirely.\n\n**Test Day Takeaway:** Take the square roots of the outer terms, double their product, and compare with the middle term — the middle term's sign is the binomial's sign.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "factor-perfect-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-070",
    domain: "advanced-math",
    skills: ["perfect-square-trinomial"],
    difficulty: "medium",
    type: "fill-in",
    question: "In the expression $x^2 - 18x + c$, $c$ is a constant. If the expression can be written in the form $(x - d)^2$, where $d$ is a constant, what is the value of $c$?",
    correctAnswer: "81",
    explanation: "**SAT Pattern: Complete the Square (Find Constant)**\n\n**The correct answer is $81$.**\n\n**The Fast Way (~15s):** Half of $18$ is $9$, and $9^2 = 81$, so $c = 81$ and the expression is $(x - 9)^2$.\n\n**The Full Solution:**\nStep 1: Expand the target form: $(x - d)^2 = x^2 - 2dx + d^2$.\nStep 2: Match the $x$-coefficients: $-2d = -18$, so $d = 9$.\nStep 3: Match the constants: $c = d^2 = 81$. Check: $(x - 9)^2 = x^2 - 18x + 81$. $\\checkmark$\n\n**Common Mistakes:** Reporting $9$, the value of $d$, instead of $d^2$; squaring the whole coefficient without halving it first, $18^2 = 324$; or writing $c = -81$ because the middle term is negative, even though a square is never negative.\n\n**Test Day Takeaway:** To complete the square on $x^2 + bx$, add $\\left(\\frac{b}{2}\\right)^2$. Halve first, then square — the order matters.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complete-perfect-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-071",
    domain: "advanced-math",
    skills: ["perfect-square-trinomial"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Drop-tower data give $y$ as a maple samara's descent speed in meters per second, and for exactly two constants $c$ the expression $9y^2 + cy + 64$ is the square of a binomial with integer coefficients. Which of the following lists both of those constants?",
    choices: [
      { id: "A", text: "$-48$ and $48$" },
      // distractor: uses $\sqrt{9 \cdot 64} = 24$, omitting the factor of $2$ in $2ab$
      { id: "B", text: "$-24$ and $24$" },
      // distractor: keeps only the positive constant and misses the square $(3y - 8)^2$
      { id: "C", text: "$48$ only" },
      // distractor: reports $9 \cdot 64 = 576$ without taking a square root at all
      { id: "D", text: "$-576$ and $576$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Find k for Perfect Square Trinomial (Both Signs)**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The square roots of the outer terms are $3y$ and $8$, and the middle term must be $\\pm 2(3y)(8) = \\pm 48y$, so $c = \\pm 48$.\n\n**The Full Solution:**\nStep 1: For $(ay + b)^2 = a^2y^2 + 2aby + b^2$, match $a^2 = 9$ and $b^2 = 64$, so $a = 3$ and $b = \\pm 8$.\nStep 2: The middle coefficient is $2ab$, which is $2(3)(8) = 48$ when $b = 8$ and $2(3)(-8) = -48$ when $b = -8$.\nStep 3: So $c = 48$ or $c = -48$. Check: $(3y + 8)^2 = 9y^2 + 48y + 64$ and $(3y - 8)^2 = 9y^2 - 48y + 64$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\pm 24$): forgets that the middle term is TWICE the product of the two square roots.\n* Choice C ($48$ only): a negative constant term inside the binomial squares to $64$ just as well, so the negative case is equally valid.\n* Choice D ($\\pm 576$): multiplies the outer coefficients without square-rooting, so the size is off by a factor of $12$.\n\n**Test Day Takeaway:** Both signs of the square root of the constant work, so a middle-coefficient question of this type always has two answers.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "pst-parameter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── simplifying-rational-expressions (4 questions) ────────────────
  {
    id: "bank-am-072",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A radio telescope's total integration time, in seconds, for a night of observing is $6x^{2}+15x$, and the night contains $3x$ scans, where $x>0$. Which expression gives the mean integration time per scan?",
    choices: [
      // distractor: divides 15x by x alone instead of by 3x, leaving 15 in place of 5
      { id: "A", text: "$2x+15$" },
      // distractor: divides 6x squared by 3 alone instead of by 3x, leaving 2x squared in place of 2x
      { id: "B", text: "$2x^{2}+5$" },
      // distractor: divides 6x squared by x alone instead of by 3x, leaving 6x in place of 2x
      { id: "C", text: "$6x+5$" },
      { id: "D", text: "$2x+5$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Simplify Rational Expression (Cancel Common Factor)**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $\\frac{6x^{2}+15x}{3x}=\\frac{3x(2x+5)}{3x}=2x+5$.\n\n**The Full Solution:**\n\nStep 1: The mean per scan is the total time divided by the number of scans: $\\frac{6x^{2}+15x}{3x}$.\n\nStep 2: Factor the common $3x$ out of the numerator: $6x^{2}+15x=3x(2x+5)$.\n\nStep 3: Since $x>0$, the factor $3x$ is nonzero and cancels, leaving $2x+5$. Check at $x=2$: the total is $24+30=54$ over $6$ scans, and $54\\div6=9=2(2)+5$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($2x+15$): divides the second term by $x$ only, keeping $15$ instead of $5$.\n* Choice B ($2x^{2}+5$): divides the first term by $3$ only, keeping $2x^{2}$ instead of $2x$.\n* Choice C ($6x+5$): divides the first term by $x$ only, keeping $6x$ instead of $2x$.\n\n**Test Day Takeaway:** Factor the common monomial out of the whole numerator first; every term has to be divided by all of $3x$, not part of it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "simplify-rational",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-073",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A physiologist compares two recovery scores whose ratio is $\\dfrac{8kx + 24k}{12x + 36}$, where $k$ is a nonzero constant fixed by the athlete, $x$ is the week number of the season, and $x \\neq -3$. That ratio simplifies to which of the following?",
    choices: [
      // distractor: factors the numerator as $4k(2x + 6)$ and cancels $2x + 6$ against $x + 3$ as though they were equal, leaving $\frac{4k}{12}$
      { id: "A", text: "$\\dfrac{k}{3}$" },
      // distractor: reduces $\frac{8k}{12}$ to $\frac{2}{3}$ and then writes the surviving $k$ in the denominator
      { id: "B", text: "$\\dfrac{2}{3k}$" },
      // distractor: inverts the surviving coefficient fraction, reporting $\frac{3}{2}$ of $k$ instead of $\frac{2}{3}$
      { id: "C", text: "$\\dfrac{3k}{2}$" },
      { id: "D", text: "$\\dfrac{2k}{3}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Factor Out GCF then Cancel**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The numerator is $8k(x + 3)$ and the denominator is $12(x + 3)$, so the ratio is $\\frac{8k}{12} = \\frac{2k}{3}$.\n\n**The Full Solution:**\nStep 1: Factor the numerator completely: $8kx + 24k = 8k(x + 3)$.\nStep 2: Factor the denominator completely: $12x + 36 = 12(x + 3)$.\nStep 3: Since $x \\neq -3$, the identical factor $x + 3$ cancels, leaving $\\frac{8k}{12} = \\frac{2k}{3}$. Check: at $x = 1$ and $k = 3$ the original is $\\frac{24 + 72}{12 + 36} = \\frac{96}{48} = 2$, and $\\frac{2(3)}{3} = 2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{k}{3}$): pulls out only $4k$ upstairs, then cancels $2x + 6$ against $x + 3$, which are not the same factor.\n* Choice B ($\\frac{2}{3k}$): reduces the coefficients correctly but strands $k$ below the bar; $k$ was a factor of the numerator.\n* Choice C ($\\frac{3k}{2}$): inverts the coefficient fraction, using $\\frac{12}{8} = \\frac{3}{2}$ in place of $\\frac{8}{12} = \\frac{2}{3}$.\n\n**Test Day Takeaway:** Only IDENTICAL factors cancel — pull the greatest common factor out of each part first so the leftover binomials can be compared term by term.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "simplify-rational",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-074",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In a pharmacy protocol, the dose-adjustment factor for a patient whose weight index is $x$, where $x>2$, is the product $\\frac{2x^{2}-8}{x^{2}+5x+6} \\cdot \\frac{x^{2}+6x+9}{4x-8}$. Which expression is equivalent to that product?",
    choices: [
      // distractor: factors x^2 + 6x + 9 as (x + 3)(x - 3) instead of (x + 3)^2
      { id: "A", text: "$\\frac{x-3}{2}$" },
      { id: "B", text: "$\\frac{x+3}{2}$" },
      // distractor: cancels the unlike factors (x + 3) and (x + 2), keeping (x + 2)
      { id: "C", text: "$\\frac{x+2}{2}$" },
      // distractor: drops the leading 2 when factoring 2x^2 - 8, leaving 2/4 as 1/4
      { id: "D", text: "$\\frac{x+3}{4}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Multiply Rational Expressions (Factor + Cancel)**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** Factor everything: $\\frac{2(x-2)(x+2)}{(x+2)(x+3)}\\cdot\\frac{(x+3)^{2}}{4(x-2)}$, and cancelling leaves $\\frac{2(x+3)}{4}=\\frac{x+3}{2}$.\n\n**The Full Solution:**\nStep 1: Factor each part: $2x^{2}-8=2(x-2)(x+2)$, $x^{2}+5x+6=(x+2)(x+3)$, $x^{2}+6x+9=(x+3)^{2}$, and $4x-8=4(x-2)$.\nStep 2: Multiply and cancel the common factors $(x-2)$, $(x+2)$, and one $(x+3)$.\nStep 3: What remains is $\\frac{2(x+3)}{4}=\\frac{x+3}{2}$. Check: at $x=3$ the original is $\\frac{10}{30}\\cdot\\frac{36}{4}=3$, and $\\frac{3+3}{2}=3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{x-3}{2}$): factors $x^{2}+6x+9$ as $(x+3)(x-3)$, so $(x-3)$ survives the cancellation.\n* Choice C ($\\frac{x+2}{2}$): cancels $(x+3)$ against $(x+2)$, which are not the same factor.\n* Choice D ($\\frac{x+3}{4}$): forgets the 2 factored out of $2x^{2}-8$, so the constants reduce to $\\frac{1}{4}$.\n\n**Test Day Takeaway:** Factor every numerator and denominator completely, numerical factors included, before a single cancellation.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "multiply-rational",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-am-075",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In a lens calculation, $x$ and $k$ are positive constants and the quantity $\\dfrac{\\frac{1}{x}-\\frac{1}{k}}{\\frac{1}{x}+\\frac{1}{k}}$ appears in a correction term. Which of the following is equivalent to that quantity?",
    choices: [
      // distractor: inverted the simplified result, swapping numerator and denominator
      { id: "A", text: "$\\dfrac{k+x}{k-x}$" },
      // distractor: subtracted in the wrong order after clearing the small fractions, writing x - k over kx
      { id: "B", text: "$\\dfrac{x-k}{x+k}$" },
      // distractor: treated 1/x - 1/k as 1/(x-k) and 1/x + 1/k as 1/(x+k)
      { id: "C", text: "$\\dfrac{x+k}{x-k}$" },
      { id: "D", text: "$\\dfrac{k-x}{k+x}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Complex Fraction Simplification**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Multiply the numerator and the denominator by $kx$: the quantity becomes $\\dfrac{k-x}{k+x}$.\n\n**The Full Solution:**\nStep 1: The least common denominator of the four small fractions is $kx$.\nStep 2: Multiply top and bottom by $kx$: the top becomes $kx\\left(\\dfrac{1}{x}-\\dfrac{1}{k}\\right)=k-x$, and the bottom becomes $kx\\left(\\dfrac{1}{x}+\\dfrac{1}{k}\\right)=k+x$.\nStep 3: So the quantity equals $\\dfrac{k-x}{k+x}$. Check at $x=1$, $k=3$: $\\dfrac{1-\\frac{1}{3}}{1+\\frac{1}{3}}=\\dfrac{2/3}{4/3}=\\dfrac{1}{2}=\\dfrac{3-1}{3+1}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\dfrac{k+x}{k-x}$): inverts the simplified result.\n* Choice B ($\\dfrac{x-k}{x+k}$): subtracts in the wrong order after clearing the small fractions.\n* Choice C ($\\dfrac{x+k}{x-k}$): treats $\\dfrac{1}{x}-\\dfrac{1}{k}$ as $\\dfrac{1}{x-k}$ and $\\dfrac{1}{x}+\\dfrac{1}{k}$ as $\\dfrac{1}{x+k}$.\n\n**Test Day Takeaway:** Clear a complex fraction by multiplying top and bottom by the common denominator — never by combining the reciprocals term by term.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complex-fraction",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // === EXPONENTIAL GROWTH/DECAY (8 questions) — Phase 2 priority pattern ===
  // 19x in 12 tests = 3.6% of test items. Covers: model construction from
  // doubling/halving language, factor interpretation, percent-change extraction,
  // period mismatch, and compounded-to-annual rate conversion.
  {
    id: "bank-am-076",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives the mass, in grams, of a yeast culture at three times during an experiment, and the mass grows exponentially with time. Which function $m$ gives the mass, in grams, $t$ hours after the experiment began?",
    questionTable: { headers: ["Time t (hours)", "Mass (grams)"], rows: [["0", "40"], ["1", "120"], ["2", "360"]] },
    choices: [
      { id: "A", text: "$m(t) = 40(3)^t$" },
      // distractor: swaps the initial amount and the growth factor
      { id: "B", text: "$m(t) = 3(40)^t$" },
      // distractor: multiplies by $3t$ instead of raising $3$ to the power $t$
      { id: "C", text: "$m(t) = 40(3t)$" },
      // distractor: uses the mass at $t = 1$ as the initial amount
      { id: "D", text: "$m(t) = 120(3)^t$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The mass triples each hour ($40 \\to 120 \\to 360$) and starts at $40$ grams, so $m(t) = 40(3)^t$.\n\n**The Full Solution:**\nStep 1: An exponential model has the form $m(t) = m_0(b)^t$, where $m_0$ is the value at $t = 0$ and $b$ is the factor per hour.\nStep 2: The table gives $m_0 = 40$ grams, and each step multiplies the mass by $\\frac{120}{40} = 3$, so $b = 3$.\nStep 3: The model is $m(t) = 40(3)^t$. Check at $t = 2$: $40(3)^2 = 40(9) = 360$ grams, matching the table. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($m(t) = 3(40)^t$): puts the growth factor in front and the initial mass in the exponent's base; at $t = 0$ this gives $3$ grams, not $40$.\n* Choice C ($m(t) = 40(3t)$): multiplies by $3t$ instead of raising $3$ to the $t$, which describes a linear pattern; at $t = 2$ it gives $240$ grams.\n* Choice D ($m(t) = 120(3)^t$): reads the initial amount from the $t = 1$ row instead of the $t = 0$ row.\n\n**Test Day Takeaway:** In $m_0(b)^t$, the coefficient is the value at $t = 0$ and the base is the constant multiplier per unit of time. Get both from the table before you look at the choices.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-077",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A honeybee hive holds $3{,}500$ workers today, and a beekeeper's model raises the count by $8\\%$ each week for the rest of the season. Which function gives the number of workers in the hive $w$ weeks from now?",
    choices: [
      // distractor: uses the growth rate $0.08$ alone as the multiplier, which would shrink the hive by $92\%$ a week
      { id: "A", text: "$h(w) = 3{,}500(0.08)^{w}$" },
      // distractor: models an $8\%$ decrease instead of an increase
      { id: "B", text: "$h(w) = 3{,}500(0.92)^{w}$" },
      { id: "C", text: "$h(w) = 3{,}500(1.08)^{w}$" },
      // distractor: misplaces the decimal in $1 + 0.08$, producing an $80\%$ weekly rise
      { id: "D", text: "$h(w) = 3{,}500(1.8)^{w}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Growth of $8\\%$ per week multiplies by $1 + 0.08 = 1.08$ each week, so $h(w) = 3{,}500(1.08)^{w}$.\n\n**The Full Solution:**\nStep 1: The starting count is $3{,}500$, so that is the value at $w = 0$.\nStep 2: An $8\\%$ weekly increase means each week's count is $108\\%$ of the previous week's, a multiplier of $1.08$.\nStep 3: Repeating that multiplier $w$ times gives $h(w) = 3{,}500(1.08)^{w}$. Check: $h(1) = 3{,}780$, which is $280$ more than $3{,}500$, and $280$ is $8\\%$ of $3{,}500$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.08$): uses the rate as the whole multiplier, so the hive would lose almost all its workers each week.\n* Choice B ($0.92$): the multiplier for an $8\\%$ decrease, not an increase.\n* Choice D ($1.8$): reads $8\\%$ as $0.8$ rather than $0.08$.\n\n**Test Day Takeaway:** A percent increase always becomes $1 + r$ with $r$ written as a decimal — count the decimal places before you commit.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-078",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "percent-change"],
    difficulty: "medium",
    type: "fill-in",
    question: "A frog-egg count in a vernal pool is modeled by $F(t) = 90(1.44)^{t}$, with $t$ measured in years since the pool was surveyed, and the same model can be written as $F(t) = 90b^{2t}$ for a positive constant $b$. What is the value of $b$?",
    correctAnswer: "1.2",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**The correct answer is $1.2$.**\n\n**The Fast Way (~25s):** Matching $b^{2t}$ with $(1.44)^{t}$ gives $b^{2} = 1.44$, so $b = 1.2$.\n\n**The Full Solution:**\nStep 1: Write $b^{2t}$ as $\\left(b^{2}\\right)^{t}$, so the two models agree exactly when $b^{2} = 1.44$.\nStep 2: Since $b$ is positive, take the positive square root: $b = \\sqrt{1.44} = 1.2$.\nStep 3: The second form is $90(1.2)^{2t}$. Check: at $t = 1$, $90(1.2)^{2} = 90(1.44) = 129.6$, the same as $90(1.44)^{1}$ ✓\n\n**Common Mistakes:**\n* $0.72$ — halving $1.44$ instead of taking its square root, which is what a doubled exponent requires.\n* $2.88$ — doubling $1.44$, reversing the direction of the correction entirely.\n\n**Test Day Takeaway:** Doubling the exponent squares the base, so undoing it means a square root, never a division by $2$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-079",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A sample of a compound has a mass of $180$ milligrams, and the mass is reduced by half every $12$ minutes. Which function $M$ gives the mass, in milligrams, $t$ minutes after the sample was measured?",
    choices: [
      // distractor: halves the initial mass instead of using it as the coefficient
      { id: "A", text: "$M(t) = 90\\left(\\frac{1}{2}\\right)^{\\frac{t}{12}}$" },
      // distractor: multiplies $t$ by $12$ instead of dividing, so the mass halves every minute twelve times over
      { id: "B", text: "$M(t) = 180\\left(\\frac{1}{2}\\right)^{12t}$" },
      { id: "C", text: "$M(t) = 180\\left(\\frac{1}{2}\\right)^{\\frac{t}{12}}$" },
      // distractor: uses a base of $2$, which doubles the mass instead of halving it
      { id: "D", text: "$M(t) = 180(2)^{\\frac{t}{12}}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Start at $180$, multiply by $\\frac{1}{2}$, and let the exponent count $12$-minute periods: $M(t) = 180\\left(\\frac{1}{2}\\right)^{\\frac{t}{12}}$.\n\n**The Full Solution:**\nStep 1: The model is $M(t) = M_0(b)^{\\frac{t}{p}}$, where $M_0$ is the initial mass, $b$ is the factor per period, and $p$ is the length of one period.\nStep 2: Here $M_0 = 180$ milligrams, $b = \\frac{1}{2}$ because the mass halves, and $p = 12$ minutes.\nStep 3: So $M(t) = 180\\left(\\frac{1}{2}\\right)^{\\frac{t}{12}}$. Check at $t = 12$: $180\\left(\\frac{1}{2}\\right)^1 = 90$ milligrams, exactly half the starting mass. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: uses $90$ as the coefficient, which is the mass after one half-life, not at $t = 0$.\n* Choice B: writes the exponent as $12t$, so at $t = 12$ the mass would be halved $144$ times.\n* Choice D: keeps the right period but uses base $2$, which models doubling; at $t = 12$ it gives $360$ milligrams.\n\n**Test Day Takeaway:** Divide the time variable by the length of one period. If a period is $p$ units long, the exponent is $\\frac{t}{p}$ — never $pt$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-080",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The number of subscribers to a streaming service increases by $8\\%$ every $6$ months. The service had $45{,}000$ subscribers on January 1, 2022. Which expression gives the number of subscribers $y$ years after January 1, 2022?",
    choices: [
      { id: "A", text: "$45{,}000(1.08)^{2y}$" },
      // distractor: divides by $2$ instead of multiplying, giving one increase every two years
      { id: "B", text: "$45{,}000(1.08)^{\\frac{y}{2}}$" },
      // distractor: uses the $6$ from "6 months" as the number of periods per year
      { id: "C", text: "$45{,}000(1.08)^{6y}$" },
      // distractor: doubles the rate instead of doubling the number of periods
      { id: "D", text: "$45{,}000(1.16)^{y}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** There are $2$ six-month periods per year, so the factor $1.08$ is applied $2y$ times: $45{,}000(1.08)^{2y}$.\n\n**The Full Solution:**\nStep 1: An $8\\%$ increase multiplies the count by $1 + 0.08 = 1.08$ once per six-month period.\nStep 2: In $y$ years there are $2y$ six-month periods, so the factor $1.08$ is applied $2y$ times.\nStep 3: The expression is $45{,}000(1.08)^{2y}$. Check at $y = 1$: $45{,}000(1.08)^2 = 52{,}488$, which is $45{,}000$ increased by $8\\%$ twice. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($45{,}000(1.08)^{\\frac{y}{2}}$): divides instead of multiplying, modeling one $8\\%$ increase every two years.\n* Choice C ($45{,}000(1.08)^{6y}$): reads \"$6$ months\" as six periods per year, applying the increase six times a year.\n* Choice D ($45{,}000(1.16)^y$): doubles the rate to $16\\%$ per year; compounding twice gives $16.64\\%$, not $16\\%$.\n\n**Test Day Takeaway:** When the period is shorter than the time unit, multiply the exponent by how many periods fit in one unit. Two half-years per year means an exponent of $2y$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-081",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Ash concentration downwind of an eruption starts at $4{,}800$ micrograms per cubic meter and halves every $5$ days for as long as the plume lasts. Which equation gives the concentration $y$, in micrograms per cubic meter, after $t$ days?",
    choices: [
      // distractor: multiplies $t$ by $5$ instead of dividing, so the concentration halves every fifth of a day
      { id: "A", text: "$y = 4{,}800(0.5)^{5t}$" },
      // distractor: reads "halves every $5$ days" as a multiplier of $\frac{1}{5}$
      { id: "B", text: "$y = 4{,}800(0.2)^{t/5}$" },
      { id: "C", text: "$y = 4{,}800(0.5)^{t/5}$" },
      // distractor: uses the reciprocal multiplier, which doubles the concentration every $5$ days
      { id: "D", text: "$y = 4{,}800(2)^{t/5}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** One halving per $5$ days means the exponent counts halvings, $\\frac{t}{5}$, so $y = 4{,}800(0.5)^{t/5}$.\n\n**The Full Solution:**\nStep 1: The concentration at $t = 0$ is $4{,}800$, so that is the coefficient.\nStep 2: Each complete $5$-day period multiplies the concentration by $0.5$, and $t$ days contain $\\frac{t}{5}$ such periods.\nStep 3: So $y = 4{,}800(0.5)^{t/5}$. Check: at $t = 5$ the exponent is $1$ and $y = 2{,}400$; at $t = 10$ it is $2$ and $y = 1{,}200$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.5^{5t}$): at $t = 5$ this gives $4{,}800(0.5)^{25}$, essentially zero.\n* Choice B ($0.2^{t/5}$): confuses the halving with a drop to one-fifth; at $t = 5$ it gives $960$.\n* Choice D ($2^{t/5}$): grows instead of decaying, giving $9{,}600$ after $5$ days.\n\n**Test Day Takeaway:** The exponent counts how many full periods have passed, so a period of length $p$ puts $\\frac{t}{p}$ upstairs.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-082",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "percent-change"],
    difficulty: "hard",
    type: "fill-in",
    question: "A reef-fish census falls by $27.1\\%$ every three years, and biologists want a version of the model that steps one year at a time. If the count is modeled by $N(t) = N_0 k^{t}$ with $t$ measured in years, what is the value of $k$?",
    correctAnswer: "0.9",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**The correct answer is $0.9$.**\n\n**The Fast Way (~35s):** Three years multiply the count by $1 - 0.271 = 0.729$, and $\\sqrt[3]{0.729} = 0.9$.\n\n**The Full Solution:**\nStep 1: A $27.1\\%$ decrease leaves $72.9\\%$, so three years multiply the count by $0.729$.\nStep 2: Three years of the annual model multiply by $k^{3}$, so $k^{3} = 0.729$.\nStep 3: Taking the cube root gives $k = 0.9$. Check: $0.9^{3} = 0.729$, a drop of $27.1\\%$ ✓\n\n**Common Mistakes:**\n* $0.729$ — using the three-year multiplier as the annual one, which would shrink the count far too fast.\n* $0.91$ — spreading the $27.1\\%$ evenly as about $9\\%$ per year, which treats compounding as if it were addition.\n\n**Test Day Takeaway:** A multiplier stated over $n$ periods is the $n$th POWER of the per-period multiplier — undo it with an $n$th root, not by dividing.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-083",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "percent-change"],
    difficulty: "hard",
    type: "fill-in",
    question: "Two coaches model a rowing club's weekly kilometers differently: one uses $4(3)^{t}$ and the other uses $972(3)^{-t}$, where $t$ is the number of weeks from now and both models stay in use all season. At what value of $t$ do the two models agree?",
    correctAnswer: "2.5",
    explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**The correct answer is $2.5$.**\n\n**The Fast Way (~35s):** Setting them equal gives $3^{2t} = \\frac{972}{4} = 243 = 3^{5}$, so $2t = 5$ and $t = 2.5$.\n\n**The Full Solution:**\nStep 1: Set the models equal: $4(3)^{t} = 972(3)^{-t}$.\nStep 2: Divide both sides by $4$ and multiply by $3^{t}$: $3^{t} \\cdot 3^{t} = 243$, so $3^{2t} = 243$.\nStep 3: Since $243 = 3^{5}$, equal bases force $2t = 5$, so $t = 2.5$. Check: $4(3)^{2.5} \\approx 62.35$ and $972(3)^{-2.5} \\approx 62.35$ ✓\n\n**Common Mistakes:**\n* $5$ — stopping at $2t = 5$ and reporting the exponent instead of $t$.\n* $243$ — reporting the power of $3$ that the two sides share rather than solving for the week.\n\n**Test Day Takeaway:** A negative exponent on the far side becomes a positive one when you multiply across — that is what collects both copies of the variable into $3^{2t}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-decay",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // === EXPONENT RULES WITH RADICALS (8 questions) — Phase 2 priority pattern ===
  // 15x in 12 tests = 2.8% of test items. Covers: multiply same-base radicals,
  // divide same-base radicals, nested radical with outer power, negative
  // exponent, p+q from rational form, identity-based value computation.
  {
    id: "bank-am-084",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "fill-in",
    question: "Hailstone diameter $d$, in millimeters, is positive, and a growth study replaces the quantity $\\sqrt[4]{d^{12}}$ with a single power $d^{n}$ so that later steps carry only one exponent. What number does $n$ have to be?",
    correctAnswer: "3",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $3$.**\n\n**The Fast Way (~10s):** A fourth root divides the exponent by $4$, and $\\frac{12}{4} = 3$.\n\n**The Full Solution:**\nStep 1: Write the radical as a fractional exponent: $\\sqrt[4]{d^{12}} = d^{12/4}$.\nStep 2: Simplify the fraction: $\\frac{12}{4} = 3$, so the quantity is $d^{3}$.\nStep 3: Matching $d^{n}$ to $d^{3}$ gives $n = 3$. Check: at $d = 2$, $\\sqrt[4]{2^{12}} = \\sqrt[4]{4096} = 8 = 2^{3}$ ✓\n\n**Common Mistakes:**\n* $48$ — multiplying $12$ by the index $4$ instead of dividing by it.\n* $8$ — subtracting the index from the exponent, $12 - 4$, which is not what a root does.\n\n**Test Day Takeaway:** An $N$th root is the exponent $\\frac{1}{N}$, so it divides an exponent — never subtracts from it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-085",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "fill-in",
    question: "Whenever a swimmer's speed $v$, in meters per second, is positive, a coaching drag table lists the quantity $\\sqrt{v^{5}}$ under the single heading $v^{n}$, where $n$ is the same constant in every row. What number is $n$?",
    correctAnswer: "2.5",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $2.5$.**\n\n**The Fast Way (~10s):** A square root halves the exponent, so $\\sqrt{v^{5}} = v^{5/2} = v^{2.5}$.\n\n**The Full Solution:**\nStep 1: Rewrite the radical with a fractional exponent: $\\sqrt{v^{5}} = \\left(v^{5}\\right)^{1/2}$.\nStep 2: A power raised to a power multiplies exponents: $5 \\cdot \\frac{1}{2} = \\frac{5}{2}$.\nStep 3: So $v^{n} = v^{5/2}$ and $n = 2.5$. Check: at $v = 4$, $\\sqrt{4^{5}} = \\sqrt{1024} = 32 = 4^{2.5}$ ✓\n\n**Common Mistakes:**\n* $10$ — multiplying the exponent by $2$ instead of dividing by it.\n* $2$ — keeping only the whole-number part of $\\frac{5}{2}$ and discarding the leftover half power.\n\n**Test Day Takeaway:** An odd exponent under a square root always leaves a half in the answer; a fractional exponent is a legal final form.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-086",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Let $a$ be the constant for which the spore-count relation $\\sqrt{x^{a}} \\cdot x^{3} = x^{10}$ holds at every positive humidity ratio $x$ recorded in a bracket-fungus study. What is the value of $a$?",
    choices: [
      // distractor: reads the radical as a square, solving $2a + 3 = 10$
      { id: "A", text: "$3.5$" },
      { id: "B", text: "$14$" },
      // distractor: ignores the factor $x^{3}$, solving $\frac{a}{2} = 10$
      { id: "C", text: "$20$" },
      // distractor: adds $3$ to $10$ instead of subtracting, solving $\frac{a}{2} = 13$
      { id: "D", text: "$26$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The left side is $x^{a/2 + 3}$, so $\\frac{a}{2} + 3 = 10$, giving $\\frac{a}{2} = 7$ and $a = 14$.\n\n**The Full Solution:**\nStep 1: Write the radical as a power: $\\sqrt{x^{a}} = x^{a/2}$.\nStep 2: Multiplying by $x^{3}$ adds exponents, so the left side is $x^{a/2 + 3}$; equal bases force $\\frac{a}{2} + 3 = 10$.\nStep 3: Subtracting $3$ gives $\\frac{a}{2} = 7$, so $a = 14$. Check: $\\sqrt{x^{14}} \\cdot x^{3} = x^{7} \\cdot x^{3} = x^{10}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.5$): squares instead of halving, turning the left exponent into $2a + 3$.\n* Choice C ($20$): drops the $x^{3}$ factor, so the equation becomes $\\frac{a}{2} = 10$.\n* Choice D ($26$): moves the $3$ to the wrong side, giving $\\frac{a}{2} = 13$.\n\n**Test Day Takeaway:** Convert every radical to a fractional exponent first; then the whole problem is one linear equation in the unknown exponent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-087",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "fill-in",
    question: "Rainfall intensity at a gauge is reported as $\\left(\\sqrt{q}\\right)^{5}$ divided by $q$, an amount that equals $q^{n}$ whenever the gauge reading $q$ is positive, where $n$ is a constant used on every gauge in the network. What is the value of $n$?",
    correctAnswer: "1.5",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $1.5$.**\n\n**The Fast Way (~20s):** $\\left(\\sqrt{q}\\right)^{5} = q^{5/2}$, and dividing by $q$ subtracts $1$: $\\frac{5}{2} - 1 = \\frac{3}{2}$.\n\n**The Full Solution:**\nStep 1: Since $\\sqrt{q} = q^{1/2}$, raising it to the fifth power multiplies exponents: $q^{5/2}$.\nStep 2: Dividing by $q = q^{1}$ subtracts exponents: $\\frac{5}{2} - 1 = \\frac{3}{2}$.\nStep 3: So $q^{n} = q^{3/2}$ and $n = 1.5$. Check: at $q = 4$, $\\left(\\sqrt{4}\\right)^{5} \\div 4 = 32 \\div 4 = 8 = 4^{1.5}$ ✓\n\n**Common Mistakes:**\n* $2.5$ — stopping after the fifth power and never dividing by $q$.\n* $3.5$ — adding $1$ to $\\frac{5}{2}$ instead of subtracting, as if the two quantities were multiplied.\n\n**Test Day Takeaway:** Division by the base itself costs exactly one from the exponent — write the divisor as $q^{1}$ so the subtraction is visible.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-088",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "fill-in",
    question: "In a kelp bed monitored all summer, the equality $\\sqrt[3]{x^{k}} = x^{2}\\sqrt[3]{x}$ holds whenever the light-attenuation ratio $x$ is positive, and the constant $k$ never changes between readings. Determine the value of $k$.",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~25s):** The right side is $x^{2 + 1/3} = x^{7/3}$, so $\\frac{k}{3} = \\frac{7}{3}$ and $k = 7$.\n\n**The Full Solution:**\nStep 1: The left side is $x^{k/3}$, since a cube root divides the exponent by $3$.\nStep 2: The right side is $x^{2} \\cdot x^{1/3} = x^{2 + 1/3} = x^{7/3}$.\nStep 3: Equal bases force $\\frac{k}{3} = \\frac{7}{3}$, so $k = 7$. Check: $\\sqrt[3]{x^{7}} = x^{7/3} = x^{2}\\sqrt[3]{x}$ ✓\n\n**Common Mistakes:**\n* $6$ — ignoring the $\\sqrt[3]{x}$ on the right and solving $\\frac{k}{3} = 2$.\n* $\\frac{7}{3}$ — reporting the exponent of the right-hand side rather than $k$ itself.\n\n**Test Day Takeaway:** Turn both sides into a single power of the base before matching; a stray root on the far side is worth exactly one extra fractional unit.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-089",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "fill-in",
    question: "At every positive value of $x$, the two quantities $\\sqrt{c\\,x^{6}}$ and $9x^{3}$ record the same discus range in meters, and the constant $c$ is positive and does not change between throws. What is the value of $c$?",
    correctAnswer: "81",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $81$.**\n\n**The Fast Way (~20s):** $\\sqrt{c\\,x^{6}} = \\sqrt{c} \\cdot x^{3}$, so $\\sqrt{c} = 9$ and $c = 81$.\n\n**The Full Solution:**\nStep 1: A square root distributes over a product: $\\sqrt{c\\,x^{6}} = \\sqrt{c} \\cdot \\sqrt{x^{6}}$.\nStep 2: Since $x$ is positive, $\\sqrt{x^{6}} = x^{3}$, so the left side is $\\sqrt{c}\\,x^{3}$.\nStep 3: Matching coefficients of $x^{3}$ gives $\\sqrt{c} = 9$, so $c = 81$. Check: $\\sqrt{81x^{6}} = 9x^{3}$ ✓\n\n**Common Mistakes:**\n* $9$ — reporting $\\sqrt{c}$ instead of $c$, stopping one step early.\n* $3$ — taking a square root of $9$ as well, as though the radical applied twice.\n\n**Test Day Takeaway:** Split the radical over the product, match the variable parts, and remember the coefficient you find is the ROOT of the constant, not the constant.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-090",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Aquifer-pressure readings involve the quantity $\\dfrac{\\sqrt[3]{m^{7}p^{2}}}{m\\sqrt{p}}$, taken at positive values of the mass $m$ and the pressure $p$, and a technician wants that quantity rewritten with a single power of each variable before entering it in a log. Which of the following is an equivalent form?",
    choices: [
      { id: "A", text: "$m^{4/3}p^{1/6}$" },
      // distractor: adds the $p$ exponents, $\frac{2}{3} + \frac{1}{2} = \frac{7}{6}$, instead of subtracting them
      { id: "B", text: "$m^{4/3}p^{7/6}$" },
      // distractor: never divides by the $m$ in the denominator, leaving the exponent at $\frac{7}{3}$
      { id: "C", text: "$m^{7/3}p^{1/6}$" },
      // distractor: adds the $m$ exponents, $\frac{7}{3} + 1 = \frac{10}{3}$, instead of subtracting them
      { id: "D", text: "$m^{10/3}p^{1/6}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The numerator is $m^{7/3}p^{2/3}$ and the denominator is $m^{1}p^{1/2}$, so subtract: $m^{7/3 - 1}p^{2/3 - 1/2} = m^{4/3}p^{1/6}$.\n\n**The Full Solution:**\nStep 1: A cube root gives each exponent a factor of $\\frac{1}{3}$, so $\\sqrt[3]{m^{7}p^{2}} = m^{7/3}p^{2/3}$.\nStep 2: The denominator is $m^{1}p^{1/2}$, so dividing subtracts exponents on each base separately.\nStep 3: For $m$: $\\frac{7}{3} - 1 = \\frac{4}{3}$. For $p$: $\\frac{2}{3} - \\frac{1}{2} = \\frac{4}{6} - \\frac{3}{6} = \\frac{1}{6}$. The quantity is $m^{4/3}p^{1/6}$. Check: at $m = 1$ and $p = 64$ the original is $\\dfrac{\\sqrt[3]{4096}}{8} = \\dfrac{16}{8} = 2$, and $1^{4/3} \\cdot 64^{1/6} = 2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($m^{4/3}p^{7/6}$): adds $\\frac{2}{3}$ and $\\frac{1}{2}$, the error of treating a quotient as a product on the $p$ factor.\n* Choice C ($m^{7/3}p^{1/6}$): handles $p$ correctly but forgets the lone $m$ in the denominator.\n* Choice D ($m^{10/3}p^{1/6}$): adds the $m$ exponents, $\\frac{7}{3} + 1 = \\frac{10}{3}$.\n\n**Test Day Takeaway:** Convert every root to a fractional exponent, then handle one base at a time — mixing the bases is what produces all three wrong forms.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-091",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "hard",
    type: "fill-in",
    question: "Two ways of recording a kayak paddle rate agree at every positive value of $x$: one logbook stores $\\left(\\sqrt[5]{x^{n}}\\right)^{3}$ and the other stores $x^{6}\\sqrt[5]{x^{3}}$, where $x$ is a stroke ratio and $n$ is a constant. What is the value of $n$?",
    correctAnswer: "11",
    explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**The correct answer is $11$.**\n\n**The Fast Way (~35s):** The left side is $x^{3n/5}$ and the right side is $x^{33/5}$, so $3n = 33$ and $n = 11$.\n\n**The Full Solution:**\nStep 1: $\\sqrt[5]{x^{n}} = x^{n/5}$, and raising that to the third power multiplies exponents: $x^{3n/5}$.\nStep 2: On the right, $x^{6}\\sqrt[5]{x^{3}} = x^{6} \\cdot x^{3/5} = x^{6 + 3/5} = x^{33/5}$.\nStep 3: Equal bases force $\\frac{3n}{5} = \\frac{33}{5}$, so $3n = 33$ and $n = 11$. Check: $\\left(\\sqrt[5]{x^{11}}\\right)^{3} = x^{33/5}$ ✓\n\n**Common Mistakes:**\n* $10$ — dropping the $\\sqrt[5]{x^{3}}$ factor and solving $\\frac{3n}{5} = 6$.\n* $33$ — cancelling the fifths but forgetting to divide by the outer power of $3$.\n\n**Test Day Takeaway:** Give both sides the same denominator in the exponent; once the fifths match, only the whole-number equation is left.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // === VERTEX FORM FROM TWO CONDITIONS (8 questions) — Phase 2 batch 2 ===
  // 12x in 12 tests. Covers: solve-for-a from vertex+point, h+k/h-k/a+k
  // recovery from given form, y-intercept from vertex+point, function shift +
  // minimum, minimum-condition + point. SAT Pattern kebab matches:
  // 'vertex-form-from-two-conditions'.
  {
    id: "bank-am-092",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "easy",
    type: "fill-in",
    question: "An engineer models a fuel cell stack's heat loss with the quadratic function $f$ whose graph is shown, and the point $(3,10)$ lies on that graph. If $f(x)=a(x+1)^2+2$ for a constant $a$, what is the value of $a$?",
    diagram: { type: "quadraticVertex", params: { vertex: [-1, 2], a: 0.5, showVertex: true, showPoints: [[3, 10]] } },
    correctAnswer: "0.5",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $0.5$.**\n\n**The Fast Way (~20s):** Substituting $(3,10)$ gives $10=a(4)^2+2$, so $16a=8$ and $a=0.5$.\n\n**The Full Solution:**\nStep 1: Put $x=3$ and $f(x)=10$ into $f(x)=a(x+1)^2+2$: $10=a(3+1)^2+2$.\nStep 2: Simplify the square and subtract: $16a=8$.\nStep 3: Divide: $a=0.5$. Check: $f(3)=0.5(16)+2=10$, and the vertex $(-1,2)$ matches the graph ✓\n\n**Common Mistakes:**\n* $2$: divides the wrong way, computing $\\frac{16}{8}$.\n* $8$: reports $10-2=8$ and never divides by $16$.\n* $0.625$: divides $10$ by $16$ without first subtracting the $2$.\n\n**Test Day Takeaway:** With the vertex already in the formula, one extra point is one equation in one unknown — subtract the vertex output before dividing.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-093",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A charging network's sessions above its daily average are given by the quadratic function $f$; on the graph shown, the curve's lowest point and the point $(8,5)$ are both marked. What is the value of $f(-2)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [4, -3], a: 0.5, showVertex: true, showPoints: [[8, 5]] } },
    choices: [
      // distractor: reports the minimum value of f instead of f(-2)
      { id: "A", text: "$-3$" },
      // distractor: pairs -2 with 8 by symmetry, though -2 pairs with 10
      { id: "B", text: "$5$" },
      { id: "C", text: "$15$" },
      // distractor: adds 3 instead of subtracting it, giving 18 + 3
      { id: "D", text: "$21$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The vertex is $(4,-3)$ and $(8,5)$ gives $a=0.5$, so $f(-2)=0.5(36)-3=15$.\n\n**The Full Solution:**\nStep 1: Read the vertex $(4,-3)$ from the graph, so $f(x)=a(x-4)^2-3$.\nStep 2: Use the marked point: $5=a(8-4)^2-3$, so $16a=8$ and $a=0.5$.\nStep 3: Evaluate: $f(-2)=0.5(-2-4)^2-3=0.5(36)-3=15$. Check: $-2$ is $6$ units left of the axis $x=4$, and so is $x=10$; $f(10)=0.5(36)-3=15$ as well ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): reports the minimum value of $f$ rather than $f(-2)$.\n* Choice B ($5$): pairs $-2$ with $8$ by symmetry, but the partner of $-2$ about $x=4$ is $10$.\n* Choice D ($21$): computes $0.5(36)=18$ and then adds $3$ instead of subtracting it.\n\n**Test Day Takeaway:** Two conditions — the vertex and one point — pin the whole function; find $a$ first, then evaluate anywhere.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-094",
    domain: "advanced-math",
    skills: ["vertex-form"],
    difficulty: "medium",
    type: "fill-in",
    question: "A garden center models weekly sales of bird feeders above its seasonal baseline with the quadratic function $g$ whose graph is shown, and the marked point lies on that graph. If $g(x)=ax^2+bx+c$, what is the value of $c$?",
    diagram: { type: "quadraticVertex", params: { vertex: [-2, 6], a: -0.5, showVertex: true, showPoints: [[2, -2]] } },
    correctAnswer: "4",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~30s):** The vertex $(-2,6)$ and the marked point $(2,-2)$ give $g(x)=-\\frac{1}{2}(x+2)^2+6$, whose constant term is $g(0)=4$.\n\n**The Full Solution:**\nStep 1: Read the vertex $(-2,6)$, so $g(x)=a(x+2)^2+6$.\nStep 2: Use the marked point $(2,-2)$: $-2=a(4)^2+6$, so $16a=-8$ and $a=-\\frac{1}{2}$.\nStep 3: The constant term of $ax^2+bx+c$ is $g(0)=-\\frac{1}{2}(2)^2+6=-2+6=4$. Check: expanding gives $g(x)=-\\frac{1}{2}x^2-2x+4$, so $c=4$ ✓\n\n**Common Mistakes:**\n* $6$: reports the vertex's $y$-coordinate, which is $g(-2)$, not $g(0)$.\n* $8$: expands $-\\frac{1}{2}(x+2)^2$ but adds the $2$ instead of subtracting it.\n* $-2$: reports the marked point's $y$-coordinate.\n\n**Test Day Takeaway:** In $ax^2+bx+c$ the constant $c$ is always the output at $x=0$ — evaluate rather than expand when only $c$ is wanted.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-095",
    domain: "advanced-math",
    skills: ["vertex-form"],
    difficulty: "medium",
    type: "fill-in",
    question: "A store's daily count of reusable produce bags returned is modeled by a quadratic function $h$ of the day number $d$, where $h(3)=h(11)=20$ and the least value of $h$ is $4$. What is the value of $h(5)$?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~30s):** Equal outputs at $3$ and $11$ put the axis at $d=7$; then $16a+4=20$ gives $a=1$, and $h(5)=4+4=8$.\n\n**The Full Solution:**\nStep 1: Because $h(3)=h(11)$, the axis of symmetry is halfway between them: $d=\\frac{3+11}{2}=7$. The least value $4$ occurs there, so $h(d)=a(d-7)^2+4$.\nStep 2: Use $h(3)=20$: $a(3-7)^2+4=20$, so $16a=16$ and $a=1$.\nStep 3: Evaluate: $h(5)=(5-7)^2+4=4+4=8$. Check: $h(11)=(4)^2+4=20$ as required ✓\n\n**Common Mistakes:**\n* $4$: reports the least value of $h$ rather than $h(5)$.\n* $20$: assumes $d=5$ is a symmetric partner of $d=3$; the partner of $5$ is $9$.\n* $24$: adds the least value $4$ to the given output $20$.\n\n**Test Day Takeaway:** Two equal outputs locate the axis; the stated minimum supplies the vertex — together they are the two conditions you need.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-096",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A workshop tracks leather journal covers finished per hour above its target with the quadratic function $p$ graphed in the $xy$-plane. If $p(x)=(x-3)^2+k$ for a constant $k$, what is the value of $p(-1)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, -4], a: 1, showVertex: true } },
    choices: [
      // distractor: reports the constant k instead of p(-1)
      { id: "A", text: "$-4$" },
      // distractor: evaluates x - 3 as -4 and reports its absolute value
      { id: "B", text: "$4$" },
      { id: "C", text: "$12$" },
      // distractor: computes (-1-3)^2 = 16 and forgets to add k
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The graph's lowest point is $(3,-4)$, so $k=-4$ and $p(-1)=(-4)^2-4=12$.\n\n**The Full Solution:**\nStep 1: The form $p(x)=(x-3)^2+k$ puts the vertex at $(3,k)$; the graph shows the lowest point at $(3,-4)$, so $k=-4$.\nStep 2: Substitute $x=-1$: $p(-1)=(-1-3)^2-4$.\nStep 3: Compute: $16-4=12$. Check: $x=-1$ is $4$ units left of the axis $x=3$, and $p(7)=(4)^2-4=12$ matches ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): reports the constant $k$ instead of the requested output.\n* Choice B ($4$): evaluates $x-3=-4$ and reports its absolute value without squaring.\n* Choice D ($16$): computes $(-1-3)^2=16$ and forgets to add $k=-4$.\n\n**Test Day Takeaway:** Reading one number off a graph can finish a vertex-form item — identify which constant the picture actually supplies.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-097",
    domain: "advanced-math",
    skills: ["vertex-form", "function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An art supplier's price per acrylic paint tube, in cents above its wholesale rate, is modeled by $f(x)=a(x-4)^2+k$, where $a$ and $k$ are constants. If $f(4)=-7$ and $f(1)=11$, what is the value of $a$?",
    choices: [
      // distractor: inverts the division, computing 9 divided by 18
      { id: "A", text: "$0.5$" },
      { id: "B", text: "$2$" },
      // distractor: divides 18 by 3 instead of by (1-4)^2 = 9
      { id: "C", text: "$6$" },
      // distractor: reports the difference f(1) - f(4) = 18 without dividing
      { id: "D", text: "$18$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $f(4)=-7$ makes $k=-7$; then $f(1)=9a-7=11$ gives $9a=18$ and $a=2$.\n\n**The Full Solution:**\nStep 1: Substituting $x=4$ collapses the squared term: $f(4)=a(0)^2+k=k$, so $k=-7$.\nStep 2: Substituting $x=1$ gives $a(1-4)^2+(-7)=11$, that is $9a-7=11$.\nStep 3: So $9a=18$ and $a=2$. Check: $f(x)=2(x-4)^2-7$ gives $f(1)=2(9)-7=11$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.5$): inverts the last division, computing $\\frac{9}{18}$.\n* Choice C ($6$): divides $18$ by $|1-4|=3$ instead of by $(1-4)^2=9$.\n* Choice D ($18$): reports $f(1)-f(4)=18$ without dividing by $9$.\n\n**Test Day Takeaway:** Feeding the vertex's input into vertex form isolates the constant instantly — always use that condition first.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-098",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "hard",
    type: "fill-in",
    question: "A university's dissertation deposits above its five-year average are modeled by $q(x)=a(x-5)^2+k$, where $a$ and $k$ are constants. Given that $q(1)=0$ and $q(8)=-21$, what is the value of $a+k$?",
    correctAnswer: "-45",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is $-45$.**\n\n**The Fast Way (~40s):** The two conditions give $16a+k=0$ and $9a+k=-21$; subtracting yields $7a=21$, so $a=3$, $k=-48$, and $a+k=-45$.\n\n**The Full Solution:**\nStep 1: Substitute $x=1$: $a(1-5)^2+k=0$, so $16a+k=0$.\nStep 2: Substitute $x=8$: $a(8-5)^2+k=-21$, so $9a+k=-21$. Subtracting the second equation from the first gives $7a=21$, so $a=3$.\nStep 3: Then $k=-16a=-48$, and $a+k=3+(-48)=-45$. Check: $q(x)=3(x-5)^2-48$ gives $q(1)=48-48=0$ and $q(8)=27-48=-21$ ✓\n\n**Common Mistakes:**\n* $3$: solves for $a$ and stops without finding $k$.\n* $-48$: reports $k$ alone instead of the requested sum.\n* $51$: adds $48$ instead of $-48$, dropping the sign of $k$.\n\n**Test Day Takeaway:** Two points and a known vertex input give a two-by-two linear system in $a$ and $k$ — eliminate $k$ by subtracting.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-099",
    domain: "advanced-math",
    skills: ["vertex-form"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The graph shown gives braille volume transcriptions above a library's monthly quota as the quadratic function $f$. The quadratic function $g$ has the same vertex as $f$, and $g(5)=25$. What is the value of $g(-2)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [1, 9], a: -1, showVertex: true } },
    choices: [
      // distractor: assumes g equals f and reports the shared vertex value
      { id: "A", text: "$9$" },
      // distractor: adds 3 to 9 instead of adding b times (-3)^2
      { id: "B", text: "$12$" },
      { id: "C", text: "$18$" },
      // distractor: treats -2 and 5 as symmetric about the axis x = 1
      { id: "D", text: "$25$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The shared vertex is $(1,9)$, so $g(x)=b(x-1)^2+9$; $g(5)=16b+9=25$ gives $b=1$, and $g(-2)=9+9=18$.\n\n**The Full Solution:**\nStep 1: Read the vertex of $f$ from the graph: $(1,9)$. Since $g$ has the same vertex, $g(x)=b(x-1)^2+9$ for some constant $b$.\nStep 2: Use $g(5)=25$: $b(5-1)^2+9=25$, so $16b=16$ and $b=1$. Note $b$ is positive even though $f$ opens downward — sharing a vertex does not mean sharing a leading coefficient.\nStep 3: Evaluate: $g(-2)=(-2-1)^2+9=9+9=18$. Check: $g(4)=(3)^2+9=18$ too, and $4$ is the mirror of $-2$ about $x=1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): assumes $g$ is the same function as $f$ and reports the shared vertex value.\n* Choice B ($12$): adds $3$ to $9$ instead of $b(-3)^2=9$.\n* Choice D ($25$): treats $-2$ and $5$ as symmetric about $x=1$; the mirror of $5$ is $-3$.\n\n**Test Day Takeaway:** A shared vertex fixes only $h$ and $k$ — the leading coefficient still has to come from the second condition, sign and all.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // === RATIONAL EXPRESSION SIMPLIFICATION (8 questions) — Phase 2 batch 3 ===
  // 10x in 12 tests. Covers: simplify single fraction by factoring,
  // multiply two rationals, add rationals, solve rational equation,
  // identify equivalent factored form.
  // SAT Pattern kebab matches test bundle: 'rational-expression-simplification'.
  {
    id: "bank-am-100",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions", "difference-of-squares"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A milling model gives the ratio $\\dfrac{x^{2}-49}{x+7}$, where $x>7$ is the roller gap in millimeters. Which expression is equivalent to this ratio?",
    choices: [
      { id: "A", text: "$x-7$" },
      // distractor: cancels the factor x - 7 instead of the factor x + 7
      { id: "B", text: "$x+7$" },
      // distractor: cancels x squared against x as if they were factors and subtracts 49 from x
      { id: "C", text: "$x-49$" },
      // distractor: divides only the constant 49 by 7 and leaves x squared untouched
      { id: "D", text: "$x^{2}-7$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $x^{2}-49=(x-7)(x+7)$, and the $x+7$ cancels, leaving $x-7$.\n\n**The Full Solution:**\n\nStep 1: Recognize the numerator as a difference of squares: $x^{2}-49=(x-7)(x+7)$.\n\nStep 2: The ratio becomes $\\frac{(x-7)(x+7)}{x+7}$.\n\nStep 3: Since $x>7$, the factor $x+7$ is nonzero and cancels, leaving $x-7$. Check with $x=10$: $\\frac{100-49}{17}=\\frac{51}{17}=3$, and $10-7=3$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($x+7$): cancels the wrong factor, keeping $x+7$ instead of $x-7$.\n* Choice C ($x-49$): treats $x^{2}$ and $x$ as cancelling terms rather than factoring first.\n* Choice D ($x^{2}-7$): divides only the constant by $7$ and leaves $x^{2}$ alone.\n\n**Test Day Takeaway:** Factor before cancelling; only whole factors cancel, never individual terms.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-101",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions", "difference-of-squares"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A meteor camera's duty-cycle formula $\\dfrac{x^{2}-x-6}{x^{2}-9}$ was rewritten as $\\dfrac{x+2}{x+3}$. Which values of $x$ are excluded from the domain of the original formula?",
    choices: [
      { id: "A", text: "$x=-3$ and $x=3$" },
      // distractor: keeps only the zero of the simplified denominator and forgets the cancelled factor x - 3
      { id: "B", text: "$x=-3$ only" },
      // distractor: keeps only the cancelled factor's zero and forgets that x + 3 is also a denominator factor
      { id: "C", text: "$x=3$ only" },
      // distractor: uses the numerator's zero -2 in place of the denominator's zero -3
      { id: "D", text: "$x=-2$ and $x=3$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The original denominator is $x^{2}-9=(x-3)(x+3)$, which is zero at $x=3$ and $x=-3$.\n\n**The Full Solution:**\n\nStep 1: Factor both parts: $x^{2}-x-6=(x-3)(x+2)$ and $x^{2}-9=(x-3)(x+3)$.\n\nStep 2: The original formula is undefined wherever its denominator is zero, and $(x-3)(x+3)=0$ at $x=3$ and $x=-3$.\n\nStep 3: Cancelling $x-3$ produces $\\frac{x+2}{x+3}$, which is defined at $x=3$, so the exclusion at $x=3$ belongs to the original only. Check: at $x=3$ the original is $\\frac{0}{0}$, undefined, while the rewritten form gives $\\frac{5}{6}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B: keeps only the zero of the simplified denominator and drops the cancelled factor.\n* Choice C: keeps only the cancelled factor's zero and drops $x=-3$.\n* Choice D: reads $-2$, a zero of the numerator, as an exclusion.\n\n**Test Day Takeaway:** Domain exclusions come from the denominator you started with, including any factor you later cancel.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-102",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions", "perfect-square-trinomial", "difference-of-squares"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a barge-draft model the expression $\\dfrac{P(x)}{x^{2}-25}$ is equivalent to $\\dfrac{x+5}{x-5}$ for every $x>5$, where $P$ is a polynomial. Which of the following could be $P(x)$?",
    choices: [
      // distractor: expands (x + 5) squared with a sign error, producing x squared minus 10x plus 25
      { id: "A", text: "$x^{2}-10x+25$" },
      { id: "B", text: "$x^{2}+10x+25$" },
      // distractor: squares x and 5 separately and drops the 10x cross term
      { id: "C", text: "$x^{2}+25$" },
      // distractor: multiplies x by (x + 5) instead of multiplying (x + 5) by itself
      { id: "D", text: "$x^{2}+5x$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $P(x)=\\frac{x+5}{x-5}\\cdot(x^{2}-25)=(x+5)(x+5)=x^{2}+10x+25$.\n\n**The Full Solution:**\n\nStep 1: Factor the given denominator: $x^{2}-25=(x-5)(x+5)$.\n\nStep 2: Multiply the target by that denominator: $P(x)=\\frac{x+5}{x-5}\\cdot(x-5)(x+5)$, and the $x-5$ cancels.\n\nStep 3: What remains is $(x+5)^{2}=x^{2}+10x+25$. Check at $x=6$: $\\frac{36+60+25}{36-25}=\\frac{121}{11}=11$, and $\\frac{6+5}{6-5}=11$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($x^{2}-10x+25$): expands $(x+5)^{2}$ with the wrong sign on the middle term.\n* Choice C ($x^{2}+25$): squares each term separately and loses the cross term.\n* Choice D ($x^{2}+5x$): multiplies $x$ by $x+5$ instead of $x+5$ by itself.\n\n**Test Day Takeaway:** To recover a missing numerator, multiply the simplified form by the full factored denominator and cancel what matches.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-103",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions", "difference-of-squares"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A star tracker's noise ratio is given by $\\dfrac{4x^{2}-9}{2x^{2}+x-3}$, where $x$ is the frame index. Which expression is equivalent to this ratio for every $x$ in its domain?",
    choices: [
      // distractor: cancels the factor 2x - 3 instead of the factor 2x + 3
      { id: "A", text: "$\\dfrac{2x+3}{x-1}$" },
      // distractor: factors the denominator as (2x + 3)(x + 1), a sign slip that changes the remaining factor
      { id: "B", text: "$\\dfrac{2x-3}{x+1}$" },
      // distractor: cancels the x squared terms and the x term instead of factoring either part
      { id: "C", text: "$\\dfrac{4x-9}{2x-3}$" },
      { id: "D", text: "$\\dfrac{2x-3}{x-1}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** $\\frac{(2x-3)(2x+3)}{(2x+3)(x-1)}$ cancels the $2x+3$, leaving $\\frac{2x-3}{x-1}$.\n\n**The Full Solution:**\n\nStep 1: The numerator is a difference of squares: $4x^{2}-9=(2x-3)(2x+3)$.\n\nStep 2: Factor the denominator: $2x^{2}+x-3=(2x+3)(x-1)$, since $(2x+3)(x-1)=2x^{2}-2x+3x-3$.\n\nStep 3: Cancel the shared factor $2x+3$, leaving $\\frac{2x-3}{x-1}$. Check at $x=2$: $\\frac{16-9}{8+2-3}=\\frac{7}{7}=1$, and $\\frac{4-3}{2-1}=1$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: cancels $2x-3$ rather than the factor the two parts actually share.\n* Choice B: factors the denominator as $(2x+3)(x+1)$, which expands to $2x^{2}+5x+3$.\n* Choice C: cancels the $x^{2}$ terms and the $x$ term instead of factoring.\n\n**Test Day Takeaway:** Factor both parts completely, then cancel only the factor that literally appears in both.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-104",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions", "difference-of-squares"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A hydroponic trough's nutrient concentration, in grams per liter, is modeled by $\\dfrac{3x^{2}-12}{x^{2}+2x}$, where $x>2$ is the flow rate in liters per minute. Which of the following is equivalent to the model?",
    choices: [
      { id: "A", text: "$\\dfrac{3(x-2)}{x}$" },
      // distractor: cancels the factor x - 2 instead of the factor x + 2
      { id: "B", text: "$\\dfrac{3(x+2)}{x}$" },
      // distractor: divides only the leading terms by x and leaves 3x - 12 over x
      { id: "C", text: "$\\dfrac{3x-12}{x}$" },
      // distractor: drops the factor 3 when factoring 3x squared minus 12
      { id: "D", text: "$\\dfrac{x-2}{x}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** $\\frac{3(x-2)(x+2)}{x(x+2)}$ cancels the $x+2$, leaving $\\frac{3(x-2)}{x}$.\n\n**The Full Solution:**\n\nStep 1: Factor the numerator in two stages: $3x^{2}-12=3(x^{2}-4)=3(x-2)(x+2)$.\n\nStep 2: Factor the denominator: $x^{2}+2x=x(x+2)$.\n\nStep 3: Since $x>2$, the factor $x+2$ is nonzero and cancels, leaving $\\frac{3(x-2)}{x}$. Check at $x=4$: $\\frac{48-12}{16+8}=\\frac{36}{24}=1.5$, and $\\frac{3(2)}{4}=1.5$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B: cancels $x-2$, a factor the denominator does not contain.\n* Choice C: divides only the leading terms by $x$ instead of factoring.\n* Choice D: loses the common factor $3$ pulled out of the numerator.\n\n**Test Day Takeaway:** Pull out a numerical common factor first; the difference of squares is easier to spot once the coefficient is outside.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-105",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An olive press's yield expression has numerator $x^{2}-16$ and an unknown denominator $Q(x)$, and it simplifies to $\\dfrac{x+4}{2}$ whenever $x>4$. Which of the following is $Q(x)$?",
    choices: [
      // distractor: drops the factor 2 coming from the denominator of the target form
      { id: "A", text: "$x-4$" },
      { id: "B", text: "$2x-8$" },
      // distractor: cancels x - 4 instead of x + 4, leaving 2(x + 4) as the denominator
      { id: "C", text: "$2x+8$" },
      // distractor: multiplies by 4, the constant inside x + 4, instead of by the denominator 2
      { id: "D", text: "$4x-16$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $Q(x)=\\frac{2(x^{2}-16)}{x+4}=2(x-4)=2x-8$.\n\n**The Full Solution:**\n\nStep 1: Cross multiply the equivalence: $2(x^{2}-16)=(x+4)Q(x)$.\n\nStep 2: Factor the left side: $2(x-4)(x+4)=(x+4)Q(x)$.\n\nStep 3: Since $x>4$, divide both sides by $x+4$ to get $Q(x)=2(x-4)=2x-8$. Check at $x=6$: $\\frac{36-16}{12-8}=\\frac{20}{4}=5$, and $\\frac{6+4}{2}=5$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($x-4$): forgets the factor $2$ from the target's denominator.\n* Choice C ($2x+8$): cancels $x-4$ rather than $x+4$.\n* Choice D ($4x-16$): multiplies by $4$ instead of by $2$.\n\n**Test Day Takeaway:** Cross multiply first; the unknown polynomial then sits alone next to a factor you can cancel.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-106",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In a solar-sail deployment model the expression $\\dfrac{2x^{2}+kx-30}{x^{2}-25}$, where $k$ is a constant and $x>5$ is the mast extension in meters, has the same value as $\\dfrac{2x+6}{x+5}$ at every such $x$. What is the value of $k$?",
    choices: [
      // distractor: keeps only the -10x from 2x times -5 and ignores the +6x from 6 times x
      { id: "A", text: "$-10$" },
      { id: "B", text: "$-4$" },
      // distractor: reports the size of the coefficient without its negative sign
      { id: "C", text: "$4$" },
      // distractor: copies the constant 6 from the numerator of the simplified form
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The numerator must be $(2x+6)(x-5)=2x^{2}-4x-30$, so $k=-4$.\n\n**The Full Solution:**\n\nStep 1: Factor the denominator: $x^{2}-25=(x+5)(x-5)$, so the simplified form comes from cancelling $x+5$.\n\nStep 2: Undo that cancellation: $\\frac{2x+6}{x+5}=\\frac{(2x+6)(x-5)}{(x+5)(x-5)}$, so the original numerator equals $(2x+6)(x-5)$.\n\nStep 3: Expand: $(2x+6)(x-5)=2x^{2}-10x+6x-30=2x^{2}-4x-30$. Matching gives $k=-4$, and the constant $-30$ matches as well. Check at $x=6$: $\\frac{2(36)-24-30}{36-25}=\\frac{18}{11}$, and the simplified form gives $\\frac{12+6}{11}=\\frac{18}{11}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-10$): keeps only the $-10x$ term and drops the $+6x$.\n* Choice C ($4$): reports the magnitude and loses the negative sign.\n* Choice D ($6$): copies the constant from the simplified numerator.\n\n**Test Day Takeaway:** To recover a hidden coefficient, multiply the simplified form back by the cancelled factor and match terms.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-107",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions", "finding-roots-factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The average handling cost, in dollars per kilogram, at an air-freight hub is modeled by $\\dfrac{x^{3}-4x}{x^{2}+4x+4}$, where $x>2$ is the load in tonnes. Which of the following gives the same cost for every such load?",
    choices: [
      // distractor: cancels the factor x - 2 instead of one copy of x + 2
      { id: "A", text: "$\\dfrac{x(x+2)}{x-2}$" },
      // distractor: drops the factor x pulled out of the numerator
      { id: "B", text: "$\\dfrac{x^{2}-4}{x+2}$" },
      // distractor: cancels nothing from the squared denominator and leaves (x + 2) squared
      { id: "C", text: "$\\dfrac{x(x-2)}{(x+2)^{2}}$" },
      { id: "D", text: "$\\dfrac{x(x-2)}{x+2}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** $\\frac{x(x-2)(x+2)}{(x+2)^{2}}$ cancels one $x+2$, leaving $\\frac{x(x-2)}{x+2}$.\n\n**The Full Solution:**\n\nStep 1: Factor the numerator: $x^{3}-4x=x(x^{2}-4)=x(x-2)(x+2)$.\n\nStep 2: Factor the denominator as a perfect square: $x^{2}+4x+4=(x+2)^{2}$.\n\nStep 3: One factor of $x+2$ cancels, leaving $\\frac{x(x-2)}{x+2}$. Check at $x=3$: $\\frac{27-12}{9+12+4}=\\frac{15}{25}=0.6$, and $\\frac{3(1)}{5}=0.6$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: cancels $x-2$, which the denominator does not contain.\n* Choice B: drops the factor $x$ taken out of the numerator.\n* Choice C: cancels nothing and keeps the full squared denominator.\n\n**Test Day Takeaway:** A squared factor in the denominator cancels only once — count the copies on each side before writing the answer.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rational-expression-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // === FUNCTION TRANSFORMATION (8 questions) — Phase 2 batch 3 priority pattern ===
  // 10x in 12 tests. Covers: horizontal shift, vertical shift, evaluate
  // transformed function, find x of min after shift, find min value after
  // shift, combined shifts, reflection + scaling.
  // SAT Pattern kebab matches test bundle: 'function-transformation'.
  {
    id: "bank-am-108",
    domain: "advanced-math",
    skills: ["function-transformations", "function-evaluation"],
    difficulty: "easy",
    type: "fill-in",
    question: "A ventilation survey lists four measured values of $f$ in the table, and each measured value is corrected by subtracting 6, giving the corrected function $g(x)=f(x)-6$. What is the corrected reading $g(2)$?",
    diagram: { type: "table", params: { xHeader: "x", yHeader: "f(x)", rows: [["0", "5"], ["2", "1"], ["4", "-3"], ["6", "9"]] } },
    correctAnswer: "-5",
    explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $-5$.**\n\n**The Fast Way (~15s):** The table gives $f(2)=1$, so $g(2)=1-6=-5$.\n\n**The Full Solution:**\nStep 1: Subtracting 6 changes only the output, so read $f$ at the same input: the row $x=2$ gives $f(2)=1$.\nStep 2: Apply the correction: $g(2)=f(2)-6=1-6$.\nStep 3: $1-6=-5$. Check: every corrected reading sits 6 below its measured value, and $-5$ is 6 below 1 ✓\n\n**Common Mistakes:** Subtracting 6 from the input and reading $f(-4)$ leaves the table with no matching row. Reading the row $x=6$ instead of $x=2$ gives $9-6=3$. Adding 6 rather than subtracting gives 7.\n\n**Test Day Takeaway:** A constant subtracted outside the function changes outputs only — the input you look up never moves.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-109",
    domain: "advanced-math",
    skills: ["function-transformations", "function-evaluation"],
    difficulty: "easy",
    type: "fill-in",
    question: "For a mural, the function $w$ gives the width, in centimeters, of a stencil at height $x$, where $w(x)=0.5x+14$. An enlarged stencil has width $W(x)=3w(x)$. What is the value of $W(20)$?",
    correctAnswer: "72",
    explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $72$.**\n\n**The Fast Way (~15s):** $w(20)=24$ centimeters, and tripling gives $3(24)=72$ centimeters.\n\n**The Full Solution:**\nStep 1: Evaluate the original width: $w(20)=0.5(20)+14=10+14=24$.\nStep 2: The enlargement multiplies every width by 3: $W(20)=3w(20)$.\nStep 3: $3(24)=72$ centimeters. Check: $W(x)=1.5x+42$, and $1.5(20)+42=72$ ✓\n\n**Common Mistakes:** Tripling only the variable term gives $1.5(20)+14=44$. Tripling the input instead of the output gives $w(60)=44$. Adding 3 rather than multiplying gives 27.\n\n**Test Day Takeaway:** A vertical stretch multiplies the entire output, constant term included.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-110",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "medium",
    type: "fill-in",
    question: "A stress model $f$ has the graph drawn in the figure, and after a design change the adjusted model is $g(x)=f(x+3)$. What is the value of $g(-2)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [1, -4], a: 1, showPoints: [[-1, 0], [3, 0]], showVertex: true } },
    correctAnswer: "-4",
    explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $-4$.**\n\n**The Fast Way (~20s):** $g(-2)=f(-2+3)=f(1)$, and the graph's turning point shows $f(1)=-4$.\n\n**The Full Solution:**\nStep 1: The rule $g(x)=f(x+3)$ says to add 3 to the input before using the graph.\nStep 2: For $x=-2$ the inner input is $-2+3=1$.\nStep 3: The graph's lowest point is $(1,-4)$, so $f(1)=-4$ and $g(-2)=-4$. Check: the graph is $f(x)=(x-1)^{2}-4$, and $g(-2)=(-2+3-1)^{2}-4=-4$ ✓\n\n**Common Mistakes:** Subtracting 3 gives $f(-5)$, far off the drawn curve. Reading $f(-2)$ directly ignores the shift and gives 5. Treating the rule as $f(x)+3$ adds the 3 to the output instead, giving $5+3=8$.\n\n**Test Day Takeaway:** With $f(x+3)$, do the addition inside first and then read the graph at that input.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-111",
    domain: "advanced-math",
    skills: ["function-transformations", "function-evaluation"],
    difficulty: "medium",
    type: "fill-in",
    question: "A rigging chart lists the trim height $d(x)$, in centimeters relative to the set line, of a batten at five positions $x$, in meters, from the proscenium, as shown in the table. The function $e$ is defined by $e(x)=-d(x)$. For what value of $x$ is $e(x)=7$?",
    diagram: { type: "table", params: { xHeader: "Position x (m)", yHeader: "Trim height d(x) (cm)", rows: [["0", "9"], ["2", "5"], ["4", "1"], ["6", "-3"], ["8", "-7"]] } },
    correctAnswer: "8",
    explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~20s):** $e(x)=7$ means $-d(x)=7$, so $d(x)=-7$, which the table gives at $x=8$.\n\n**The Full Solution:**\nStep 1: The rule $e(x)=-d(x)$ reflects every trim height across the horizontal axis.\nStep 2: An output of 7 for $e$ therefore requires $d(x)=-7$ centimeters.\nStep 3: The table lists $-7$ in the row $x=8$, so $x=8$ meters. Check: $e(8)=-(-7)=7$ ✓\n\n**Common Mistakes:** Looking for the trim height $7$ itself finds no row. Reading the row where $d(x)=9$ and negating gives $x=0$, whose $e$-value is $-9$. Negating the input instead of the output gives $x=-8$, which is not in the table.\n\n**Test Day Takeaway:** A leading negative sign reflects outputs, so search the table for the opposite of the value you want.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-112",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A dose-response curve $f$ is drawn in the figure, and a second preparation is modeled by $g(x)=2f(x)$. What is the $y$-coordinate of the highest point on the graph of $y=g(x)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [2, 6], a: -1, showPoints: [[0, 2], [4, 2]], showVertex: true } },
    choices: [
      // distractor: divides the maximum by 2 instead of multiplying: 6/2 = 3
      { id: "A", text: "$3$" },
      // distractor: leaves the maximum unchanged, treating the stretch as horizontal
      { id: "B", text: "$6$" },
      // distractor: adds 2 to the maximum instead of multiplying: 6 + 2 = 8
      { id: "C", text: "$8$" },
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The drawn curve peaks at $y=6$, and doubling every output doubles that peak to 12.\n\n**The Full Solution:**\nStep 1: The highest point of the drawn graph is $(2,6)$, so the greatest value of $f$ is 6.\nStep 2: The rule $g(x)=2f(x)$ multiplies every output by 2 and leaves inputs alone, so $g$ peaks at the same input.\nStep 3: The peak value is $2(6)=12$. Check: $f(0)=2$ from the graph, and $g(0)=4$, still below 12 ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): divides by 2, the effect of $\\frac{1}{2}f(x)$ rather than $2f(x)$.\n* Choice B ($6$): keeps the original maximum, as if the 2 acted on the input.\n* Choice C ($8$): adds 2 to the maximum instead of multiplying by 2.\n\n**Test Day Takeaway:** A coefficient outside the function scales outputs — the location of the peak stays put while its height multiplies.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-113",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The graph of the quadratic function $f$ is shown in the $xy$-plane, where $f$ has vertex $(2, -3)$ and passes through the marked point $(0, 1)$. The function $h$ is defined by $h(x) = f(x) + 7$. What is the $y$-coordinate of the $y$-intercept of the graph of $h$?",
    diagram: { type: "quadraticVertex", params: { vertex: [2, -3], a: 1, showPoints: [[0, 1]], showVertex: true } },
    choices: [
      // distractor: reports $f(0)$ and forgets the shift
      { id: "A", text: "$1$" },
      // distractor: reports the minimum value of $h$, $-3 + 7$, instead of its $y$-intercept
      { id: "B", text: "$4$" },
      // distractor: reports the size of the shift
      { id: "C", text: "$7$" },
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The graph gives $f(0) = 1$, and $h$ raises every output by $7$: $h(0) = 1 + 7 = 8$.\n\n**The Full Solution:**\nStep 1: A $y$-intercept is the value of the function at $x = 0$, so the question asks for $h(0)$.\nStep 2: The marked point shows $f(0) = 1$.\nStep 3: Since $h(x) = f(x) + 7$, $h(0) = 1 + 7 = 8$. Check with a formula: the vertex form is $f(x) = (x - 2)^2 - 3$, so $f(0) = 4 - 3 = 1$ and $h(0) = 8$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): reads $f(0)$ off the graph and never applies the $+7$.\n* Choice B ($4$): shifts the vertex value instead, $-3 + 7$, which is the minimum of $h$, not its $y$-intercept.\n* Choice C ($7$): reports the shift amount by itself, as if $f(0)$ were $0$.\n\n**Test Day Takeaway:** A vertical shift moves the $y$-intercept by exactly the shift amount. Locate $f(0)$ first, then add.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-114",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The graph of the function $f$ is shown in the $xy$-plane, and the vertex of the graph is $(4, 1)$. The function $g$ is defined by $g(x) = 3f(x + 2) - 5$. Which of the following is the vertex of the graph of $y = g(x)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [4, 1], a: 1, showVertex: true } },
    choices: [
      // distractor: reads the $+2$ inside the parentheses as the new $x$-coordinate
      { id: "A", text: "$(-2, -2)$" },
      { id: "B", text: "$(2, -2)$" },
      // distractor: applies the $-5$ but not the factor $3$, computing $1 - 5$
      { id: "C", text: "$(2, -4)$" },
      // distractor: shifts right by $2$ instead of left
      { id: "D", text: "$(6, -2)$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The vertex moves when $x + 2 = 4$, so $x = 2$; its height becomes $3(1) - 5 = -2$. The vertex of $g$ is $(2, -2)$.\n\n**The Full Solution:**\nStep 1: The graph shows the vertex of $f$ at $(4, 1)$, so $f(4) = 1$ is the extreme output.\nStep 2: In $g(x) = 3f(x + 2) - 5$, the extreme output occurs when the inside matches $4$: $x + 2 = 4$, so $x = 2$.\nStep 3: The output is scaled by $3$ and then lowered by $5$: $g(2) = 3f(4) - 5 = 3(1) - 5 = -2$. The vertex is $(2, -2)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-2, -2)$): reads the \"$+2$\" as the new $x$-coordinate instead of solving $x + 2 = 4$.\n* Choice C ($(2, -4)$): finds the correct $x$ but applies only the $-5$, forgetting that the output is first tripled.\n* Choice D ($(6, -2)$): computes $4 + 2$, shifting the graph right; $f(x + 2)$ shifts it left.\n\n**Test Day Takeaway:** Transform the input and the output separately: solve the inside for the new $x$, then run the old $y$-value through the outside operations in order.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-115",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The function $f$ gives a magnetometer's drift, in millivolts, at a coil current of $x$ milliamps, and $f(x)=0$ for exactly one current, $x=6$. A technician sets the current to $2c+8$ milliamps and records zero drift. What is the value of $c$?",
    choices: [
      // distractor: subtracts 8 but never divides by 2: 6 - 8 = -2
      { id: "A", text: "$-2$" },
      { id: "B", text: "$-1$" },
      // distractor: adds 8 instead of subtracting before halving: (6 + 8)/2 = 7
      { id: "C", text: "$7$" },
      // distractor: substitutes 6 into 2c + 8 instead of setting it equal to 6: 2(6) + 8 = 20
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The drift is zero only at a current of 6, so $2c+8=6$ and $c=-1$.\n\n**The Full Solution:**\nStep 1: The technician's reading is zero exactly when the current sent into $f$ equals the one current that makes $f$ zero.\nStep 2: Set $2c+8=6$, so $2c=-2$.\nStep 3: Divide by 2: $c=-1$. Check: $2(-1)+8=6$ milliamps, and $f(6)=0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$): subtracts 8 from 6 but forgets to divide by the coefficient 2.\n* Choice C ($7$): adds 8 rather than subtracting it before halving.\n* Choice D ($20$): substitutes 6 into the expression $2c+8$ instead of setting that expression equal to 6.\n\n**Test Day Takeaway:** Inside a composition, set the whole inner expression equal to the known input and solve, coefficient included.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // === COMMON-BASE EXPONENT SIMPLIFICATION (8 questions) — Phase 2 batch 4 ===
  // 8x in 12 tests. Covers: rewrite-to-common-base equations, simplify
  // monomial division (subtract exponents), cross-base (e.g., 9 vs 27),
  // multi-variable monomials with negative exponents.
  // SAT Pattern uses hyphen in "Common-Base": kebab is
  // 'common-base-exponent-simplification'.
  {
    id: "bank-am-116",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "fill-in",
    question: "During calibration, a pressure sensor's reading is multiplied by $2^{9}$ and then divided by $2^{5}$. The final reading is $2^{n}$ times the original reading. What is the value of $n$?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~10s):** Same base, so subtract the exponents: $9-5=4$.\n\n**The Full Solution:**\nStep 1: The two operations multiply the reading by $\\dfrac{2^{9}}{2^{5}}$.\nStep 2: For a common base, $\\dfrac{2^{9}}{2^{5}}=2^{9-5}=2^{4}$.\nStep 3: Therefore $n=4$. Check: $2^{9}=512$ and $2^{5}=32$, and $512/32=16=2^{4}$ ✓\n\n**Common Mistakes:**\n* $45$: multiplied the exponents instead of subtracting them.\n* $14$: added the exponents because two operations were performed.\n* $16$: reported the value $2^{4}$ rather than the exponent $n$.\n\n**Test Day Takeaway:** Dividing powers of the same base subtracts exponents; the answer they want is usually the exponent, not the power.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-117",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "fill-in",
    question: "A materials lab prepares $5$ identical batches, and each batch contains $5^{6}$ granules of powder. The total number of granules in the batches is $5^{m}$. What is the value of $m$?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~10s):** $5\\cdot 5^{6}=5^{1}\\cdot 5^{6}=5^{7}$, so $m=7$.\n\n**The Full Solution:**\nStep 1: The total is $5$ groups of $5^{6}$ granules, or $5\\cdot 5^{6}$.\nStep 2: Write the factor $5$ as $5^{1}$, so the product is $5^{1}\\cdot 5^{6}$.\nStep 3: Multiplying powers of the same base adds exponents: $5^{1+6}=5^{7}$, so $m=7$. Check: $5\\cdot 15{,}625=78{,}125=5^{7}$ ✓\n\n**Common Mistakes:**\n* $6$: ignored the factor of $5$ batches and reported the exponent in one batch.\n* $30$: multiplied the exponents, treating $5\\cdot 5^{6}$ as $(5^{6})^{5}$.\n* $11$: added $5$ to the exponent instead of adding $1$.\n\n**Test Day Takeaway:** A lone base is a power with exponent $1$ — write it that way before combining.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-118",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "fill-in",
    question: "A memory array holds $\\dfrac{4^{x}}{2^{7}}$ addressable cells, and that count equals $2^{9}$ cells. What is the value of $x$?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~20s):** Rewrite $4^{x}$ as $2^{2x}$: $2^{2x-7}=2^{9}$, so $2x=16$ and $x=8$.\n\n**The Full Solution:**\nStep 1: Since $4=2^{2}$, $4^{x}=(2^{2})^{x}=2^{2x}$.\nStep 2: The left side becomes $\\dfrac{2^{2x}}{2^{7}}=2^{2x-7}$, so $2x-7=9$.\nStep 3: Solve: $2x=16$, so $x=8$. Check: $4^{8}=65{,}536$ and $65{,}536/128=512=2^{9}$ ✓\n\n**Common Mistakes:**\n* $16$: solved $2x=16$ but reported $2x$ instead of $x$.\n* $-1$: subtracted in the wrong order, solving $7-2x=9$.\n* $4.5$: divided $9$ by $2$ without first adding back the $7$, solving $2x=9$.\n\n**Test Day Takeaway:** Put both sides on one base before matching exponents; $4$, $8$, and $16$ are all powers of $2$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-119",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The volume of a machined part is modeled by $\\dfrac{(3x^{4})^{3}}{9x^{5}}$ cubic centimeters, where $x>0$. Which expression is equivalent to this volume, in cubic centimeters?",
    choices: [
      // distractor: did not cube the coefficient 3, leaving 3/9 = 1/3
      { id: "A", text: "$\\dfrac{1}{3}x^{7}$" },
      { id: "B", text: "$3x^{7}$" },
      // distractor: subtracted the exponents in the wrong order, computing 5 - 12
      { id: "C", text: "$3x^{-7}$" },
      // distractor: cubed the coefficient but never divided by 9
      { id: "D", text: "$27x^{7}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $(3x^{4})^{3}=27x^{12}$, and $\\dfrac{27x^{12}}{9x^{5}}=3x^{7}$.\n\n**The Full Solution:**\nStep 1: Raise both factors to the third power: $(3x^{4})^{3}=3^{3}x^{12}=27x^{12}$.\nStep 2: Divide the coefficients: $27/9=3$.\nStep 3: Subtract the exponents: $x^{12-5}=x^{7}$, so the volume is $3x^{7}$. Check at $x=1$: $\\dfrac{27}{9}=3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\dfrac{1}{3}x^{7}$): leaves the coefficient uncubed, giving $3/9$.\n* Choice C ($3x^{-7}$): subtracts the exponents in the wrong order, $5-12$.\n* Choice D ($27x^{7}$): cubes the coefficient but never divides by $9$.\n\n**Test Day Takeaway:** An outer exponent hits the coefficient too — cube the $3$ before touching the variable.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-120",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "fill-in",
    question: "The constant $x$ used in a sampling routine satisfies the equation $125^{x}=25^{x+1}\\cdot 5^{4}$, where each base is a power of $5$. What is the value of $x$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~25s):** Write every base as a power of $5$: $5^{3x}=5^{2x+2}\\cdot 5^{4}=5^{2x+6}$, so $3x=2x+6$ and $x=6$.\n\n**The Full Solution:**\nStep 1: Since $125=5^{3}$ and $25=5^{2}$, the equation becomes $(5^{3})^{x}=(5^{2})^{x+1}\\cdot 5^{4}$.\nStep 2: Simplify each side: $5^{3x}=5^{2x+2+4}=5^{2x+6}$.\nStep 3: Equal powers of the same base have equal exponents, so $3x=2x+6$ and $x=6$. Check: $125^{6}=5^{18}$ and $25^{7}\\cdot 5^{4}=5^{14}\\cdot 5^{4}=5^{18}$ ✓\n\n**Common Mistakes:**\n* $5$: did not distribute the $2$ over $x+1$, solving $3x=2x+1+4$.\n* $-2$: subtracted the $4$ instead of adding it, solving $3x=2x+2-4$.\n* $18$: reported the exponent $3x$ instead of $x$.\n\n**Test Day Takeaway:** Rewrite every base as a power of the smallest base first; only then may you compare exponents.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-121",
    domain: "advanced-math",
    skills: ["exponent-laws", "simplifying-rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A scale factor used in a casting model is $(5x^{b})^{2}$, which is equivalent to $25x^{18}$ for every $x>0$. What is the value of the constant $b$?",
    choices: [
      { id: "A", text: "$9$" },
      // distractor: subtracted 2 from 18 instead of dividing by 2
      { id: "B", text: "$16$" },
      // distractor: added 2 to 18 instead of dividing by 2
      { id: "C", text: "$20$" },
      // distractor: multiplied 18 by 2 instead of dividing by 2
      { id: "D", text: "$36$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Squaring multiplies the exponent by $2$, so $2b=18$ and $b=9$.\n\n**The Full Solution:**\nStep 1: Expand the left side: $(5x^{b})^{2}=5^{2}x^{2b}=25x^{2b}$.\nStep 2: The two expressions are equivalent for every $x>0$, so their exponents match: $2b=18$.\nStep 3: Divide: $b=9$. Check: $(5x^{9})^{2}=25x^{18}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($16$): subtracts $2$ from $18$ instead of dividing.\n* Choice C ($20$): adds $2$ to $18$ instead of dividing.\n* Choice D ($36$): multiplies $18$ by $2$ instead of dividing.\n\n**Test Day Takeaway:** A power raised to a power multiplies exponents, so working backwards divides.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-122",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "hard",
    type: "fill-in",
    question: "A thermal model uses the constant $k$ that satisfies $\\dfrac{3^{2k}\\cdot 9^{k+1}}{27^{k-1}}=3^{11}$, where the bases are written as powers of $3$. What is the value of $k$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~30s):** In base $3$ the exponent is $2k+(2k+2)-(3k-3)=k+5$, so $k+5=11$ and $k=6$.\n\n**The Full Solution:**\nStep 1: Rewrite each base: $9^{k+1}=3^{2k+2}$ and $27^{k-1}=3^{3k-3}$.\nStep 2: Combine: $\\dfrac{3^{2k}\\cdot 3^{2k+2}}{3^{3k-3}}=3^{(2k)+(2k+2)-(3k-3)}=3^{k+5}$.\nStep 3: Set $k+5=11$, so $k=6$. Check: $3^{12}\\cdot 3^{14}=3^{26}$ and $3^{26}/3^{15}=3^{11}$ ✓\n\n**Common Mistakes:**\n* $4.5$: left $9$ and $27$ as they were, using the exponent $2k+(k+1)-(k-1)=2k+2$.\n* $7$: wrote $9^{k+1}$ as $3^{2k+1}$, doubling the $k$ but not the $1$.\n* $9$: wrote $27^{k-1}$ as $3^{3k}$, dropping the $-1$ from its exponent.\n\n**Test Day Takeaway:** Convert every base to the common base before combining, and distribute the new exponent across the whole exponent, not just its variable.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-123",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A stress calculation contains the quantity $\\left(\\dfrac{m^{4}n^{-2}}{m^{-1}n^{3}}\\right)^{-2}$, where $m$ and $n$ are positive constants. Which of the following gives that quantity in the form $m^{p}n^{q}$?",
    choices: [
      // distractor: added the denominator exponents instead of subtracting, reducing the inside to m^3 n
      { id: "A", text: "$m^{-6}n^{-2}$" },
      // distractor: added the outer exponent -2 to each exponent instead of multiplying
      { id: "B", text: "$m^{3}n^{-7}$" },
      // distractor: applied the outer exponent as 2 rather than -2
      { id: "C", text: "$m^{10}n^{-10}$" },
      { id: "D", text: "$m^{-10}n^{10}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Inside, $m^{4-(-1)}n^{-2-3}=m^{5}n^{-5}$; raising to the $-2$ power gives $m^{-10}n^{10}$.\n\n**The Full Solution:**\nStep 1: Subtract exponents inside the parentheses: $m^{4-(-1)}=m^{5}$ and $n^{-2-3}=n^{-5}$.\nStep 2: The inside simplifies to $m^{5}n^{-5}$.\nStep 3: Multiply each exponent by $-2$: $m^{5(-2)}n^{-5(-2)}=m^{-10}n^{10}$. Check at $m=n=2$: the inside is $2^{5}\\cdot 2^{-5}=1$, and $1^{-2}=1=2^{-10}\\cdot 2^{10}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($m^{-6}n^{-2}$): adds the denominator's exponents instead of subtracting, reducing the inside to $m^{3}n$.\n* Choice B ($m^{3}n^{-7}$): adds the outer $-2$ to each exponent instead of multiplying.\n* Choice C ($m^{10}n^{-10}$): applies the outer exponent as $2$ rather than $-2$.\n\n**Test Day Takeaway:** Simplify inside the parentheses first, then multiply — never add — by the outer exponent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 5/2: tangent-line-and-discriminant (8 items) =====
  // Pattern: line tangent to parabola ⟺ system has exactly one solution ⟺ discriminant = 0.
  // Test bundles use this 7x across PT7, PT8, PT9. SAT Pattern title (verbatim from explanations):
  // 'Tangent Line and Discriminant' → kebab 'tangent-line-and-discriminant'.
  {
    id: "bank-am-124",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The figure shows the graph of $y=g(x)$ for a quadratic function $g$. A horizontal line is tangent to the graph of $y=g(x)+4$ at a single point. What is the $y$-coordinate of that point?",
    diagram: { type: "quadraticVertex", params: { vertex: [2, -5], a: 0.5, showVertex: true } },
    choices: [
      // distractor: shifts the minimum down by 4 instead of up, giving -9
      { id: "A", text: "$-9$" },
      // distractor: reports the minimum of g and never applies the +4 shift
      { id: "B", text: "$-5$" },
      { id: "C", text: "$-1$" },
      // distractor: reports the x-coordinate of the vertex instead of a y-coordinate
      { id: "D", text: "$2$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** A horizontal line meets a parabola once only at the vertex; the graph's minimum is $-5$, and adding $4$ raises it to $-1$.\n\n**The Full Solution:**\nStep 1: Read the vertex of $y=g(x)$ from the figure: $(2,-5)$, so the least value of $g$ is $-5$.\nStep 2: The graph of $y=g(x)+4$ is the same parabola raised $4$ units, so its least value is $-5+4=-1$.\nStep 3: A horizontal line touches an upward parabola at exactly one point only at that lowest point, so the $y$-coordinate is $-1$. Check: $y=-1$ meets $y=g(x)+4$ only where $g(x)=-5$, which happens at the single input $x=2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9$): shifts the minimum down by $4$ instead of up.\n* Choice B ($-5$): reports the minimum of $g$ itself and never applies the $+4$.\n* Choice D ($2$): reports the vertex's $x$-coordinate instead of a $y$-coordinate.\n\n**Test Day Takeaway:** A horizontal line is tangent to a parabola only at the vertex — so the tangency height is the maximum or minimum value.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-125",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "easy",
    type: "fill-in",
    question: "A shop's daily sales of bicycle inner tubes above its weekly baseline are modeled by $y=x^2-8x+c$, where $x$ is the day number and $c$ is a constant. The horizontal line $y=12$ touches this graph at exactly one point. What is the value of $c$?",
    correctAnswer: "28",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $28$.**\n\n**The Fast Way (~20s):** Setting $x^2-8x+c=12$ gives $x^2-8x+(c-12)=0$; one solution means the discriminant $64-4(c-12)$ is $0$, so $c=28$.\n\n**The Full Solution:**\nStep 1: Set the two expressions equal: $x^2-8x+c=12$, so $x^2-8x+(c-12)=0$.\nStep 2: Exactly one intersection means the discriminant is $0$: $(-8)^2-4(1)(c-12)=0$, or $64-4(c-12)=0$.\nStep 3: Solve: $c-12=16$, so $c=28$. Check: $x^2-8x+28=12$ becomes $x^2-8x+16=(x-4)^2=0$, a single solution $x=4$ ✓\n\n**Common Mistakes:**\n* $16$: drops the $-12$ and solves $64-4c=0$.\n* $12$: assumes $c$ equals the height of the horizontal line.\n* $-4$: solves $c-12=-16$, using the wrong sign after dividing by $-4$.\n\n**Test Day Takeaway:** One shared point means discriminant zero — subtract the line from the curve first, then set $b^2-4ac=0$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-126",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A supplier's unit cost for fountain pen ink bottles is modeled by $y=x^2+3x+9$ and its shipping charge by $y=mx+5$, where $m$ is a positive constant. If the two graphs meet at exactly one point, what is the value of $m$?",
    choices: [
      // distractor: takes 3 - m = 4, the root ruled out by m > 0
      { id: "A", text: "$-1$" },
      // distractor: uses c = 4 instead of 4ac = 16, getting 3 - m = 2
      { id: "B", text: "$1$" },
      // distractor: reports the square root 4 without solving 3 - m = -4
      { id: "C", text: "$4$" },
      { id: "D", text: "$7$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Equating gives $x^2+(3-m)x+4=0$; one solution forces $(3-m)^2=16$, so $m=-1$ or $7$, and $m>0$ leaves $7$.\n\n**The Full Solution:**\nStep 1: Set $x^2+3x+9=mx+5$, which rearranges to $x^2+(3-m)x+4=0$.\nStep 2: Exactly one shared point means $(3-m)^2-4(1)(4)=0$, so $(3-m)^2=16$ and $3-m=\\pm4$.\nStep 3: That gives $m=-1$ or $m=7$; since $m$ is positive, $m=7$. Check: with $m=7$ the equation is $x^2-4x+4=(x-2)^2=0$, a single solution ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1$): takes $3-m=4$, the root the condition $m>0$ rules out.\n* Choice B ($1$): uses $c=4$ in place of $4ac=16$, getting $3-m=\\pm2$.\n* Choice C ($4$): reports $\\sqrt{16}=4$ without solving $3-m=-4$ for $m$.\n\n**Test Day Takeaway:** A squared quantity gives two values — read the stated restriction on the constant to pick the one the item wants.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-127",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "A cafe's monthly orders of espresso machine descaling kits above its contract minimum are modeled by $y=x^2+2x+k$, where $k$ is a constant, and the line $y=6x-11$ touches this graph at exactly one point. What is the $x$-coordinate of that point?",
    correctAnswer: "2",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $2$.**\n\n**The Fast Way (~25s):** Equating gives $x^2-4x+(k+11)=0$; a single solution is the double root $x=-\\frac{-4}{2}=2$, whatever $k$ is.\n\n**The Full Solution:**\nStep 1: Set $x^2+2x+k=6x-11$, which rearranges to $x^2-4x+(k+11)=0$.\nStep 2: A single shared point means this quadratic has a double root, and a double root sits at $x=-\\frac{b}{2a}$.\nStep 3: Compute $x=-\\frac{-4}{2(1)}=2$. Check: a double root at $2$ means the quadratic is $(x-2)^2=x^2-4x+4$, so $k+11=4$ and $k=-7$; then $x^2+2x-7=6x-11$ does reduce to $(x-2)^2=0$ ✓\n\n**Common Mistakes:**\n* $-2$: uses $\\frac{b}{2a}$ and keeps the sign of $b$ instead of negating it.\n* $4$: uses $-b$ and forgets to divide by $2a$.\n* $6$: reports the slope of the line instead of an $x$-coordinate.\n\n**Test Day Takeaway:** The point of tangency is always the vertex of the difference quadratic, so $x=-\\frac{b}{2a}$ answers it even when a constant is unknown.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-128",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A distributor's daily orders of wool sock bundles above its standing order follow the quadratic function $f$ graphed in the $xy$-plane. Which of the lines below meets the graph of $f$ at exactly one point?",
    diagram: { type: "quadraticVertex", params: { vertex: [-2, 1], a: 1, showVertex: true, showPoints: [[0, 5]] } },
    choices: [
      // distractor: x^2+6x+7=0 has discriminant 8, so this line crosses the graph twice
      { id: "A", text: "$y=-2x-2$" },
      { id: "B", text: "$y=2x+4$" },
      // distractor: x^2+2x-1=0 has discriminant 8, so this line also crosses twice
      { id: "C", text: "$y=2x+6$" },
      // distractor: x^2+4=0 has discriminant -16, so this line misses the graph entirely
      { id: "D", text: "$y=4x+1$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The graph is $f(x)=(x+2)^2+1=x^2+4x+5$; only $y=2x+4$ gives $x^2+2x+1=0$, a perfect square with one root.\n\n**The Full Solution:**\nStep 1: Read the vertex $(-2,1)$ and the point $(0,5)$ from the figure, so $f(x)=(x+2)^2+1=x^2+4x+5$.\nStep 2: Setting $f(x)$ equal to a line $y=mx+b$ gives $x^2+(4-m)x+(5-b)=0$; exactly one shared point means $(4-m)^2-4(5-b)=0$.\nStep 3: For $y=2x+4$: $(4-2)^2-4(5-4)=4-4=0$, so this line is the tangent one. Check: $x^2+2x+1=(x+1)^2=0$ has the single solution $x=-1$, and $f(-1)=2=2(-1)+4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y=-2x-2$): gives $x^2+6x+7=0$, whose discriminant is $8$, so this line crosses the graph twice.\n* Choice C ($y=2x+6$): gives $x^2+2x-1=0$, whose discriminant is also $8$ — two crossings, not one.\n* Choice D ($y=4x+1$): gives $x^2+4=0$, whose discriminant is $-16$, so this line misses the graph entirely.\n\n**Test Day Takeaway:** Test candidate lines by the sign of the discriminant: negative misses, zero touches once, positive crosses twice.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-129",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "A campsite's weekly rentals of camping lanterns above its off-season rate are modeled by $y=x^2-6x+k$, where $k$ is a constant. The line $y=-2x+3$ meets this graph at exactly one point. What is the value of $k$?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~25s):** Equating gives $x^2-4x+(k-3)=0$, and one shared point forces $16-4(k-3)=0$, so $k=7$.\n\n**The Full Solution:**\nStep 1: Set $x^2-6x+k=-2x+3$, which rearranges to $x^2-4x+(k-3)=0$.\nStep 2: One shared point means the discriminant is $0$: $(-4)^2-4(1)(k-3)=0$, or $16-4(k-3)=0$.\nStep 3: So $k-3=4$ and $k=7$. Check: with $k=7$, $x^2-4x+4=(x-2)^2=0$ has the single solution $x=2$, and both graphs pass through $(2,-1)$ ✓\n\n**Common Mistakes:**\n* $3$: sets $k-3=0$ instead of $k-3=4$.\n* $4$: stops at $k-3=4$ and reports that value as $k$.\n* $-1$: solves $k-3=-4$, using the wrong sign when dividing by $-4$.\n\n**Test Day Takeaway:** Move the line to the other side before touching the discriminant — the constant term becomes a difference, not the original constant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-130",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the $xy$-plane, a transformer's cooling curve $y=x^2+10x+30$ and a load line $y=4x+t$ are graphed, where $t$ is a constant. The two graphs have no point in common. Which of the following describes every possible value of $t$?",
    choices: [
      { id: "A", text: "$t<21$" },
      // distractor: solves 4t - 84 < 0 without dividing the 84 by 4
      { id: "B", text: "$t<84$" },
      // distractor: uses discriminant > 0, the condition for two shared points
      { id: "C", text: "$t>21$" },
      // distractor: reverses the inequality and skips the division by 4
      { id: "D", text: "$t>84$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** Equating gives $x^2+6x+(30-t)=0$ with discriminant $4t-84$; no shared point means $4t-84<0$, so $t<21$.\n\n**The Full Solution:**\nStep 1: Set $x^2+10x+30=4x+t$, which rearranges to $x^2+6x+(30-t)=0$.\nStep 2: The discriminant is $6^2-4(1)(30-t)=36-120+4t=4t-84$.\nStep 3: No shared point means no real solution, so $4t-84<0$ and $t<21$. Check: at $t=21$ the equation is $x^2+6x+9=(x+3)^2=0$, a single touch, so values below $21$ give no contact at all ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($t<84$): solves $4t-84<0$ but never divides the $84$ by $4$.\n* Choice C ($t>21$): uses $b^2-4ac>0$, which is the condition for two shared points, not none.\n* Choice D ($t>84$): reverses the inequality and also skips dividing by $4$.\n\n**Test Day Takeaway:** Fewest solutions goes with the smallest discriminant: negative for no contact, zero for tangency, positive for two crossings.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-131",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "hard",
    type: "fill-in",
    question: "A utility models a battery cell's charge curve by $y=x^2+5$ and its drain line by $y=kx-4$, where $k$ is a negative constant. The two graphs touch at exactly one point. What is the value of $k$?",
    correctAnswer: "-6",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $-6$.**\n\n**The Fast Way (~30s):** Equating gives $x^2-kx+9=0$, so $k^2-36=0$ and $k=\\pm6$; $k$ is negative, so $k=-6$.\n\n**The Full Solution:**\nStep 1: Set $x^2+5=kx-4$, which rearranges to $x^2-kx+9=0$.\nStep 2: One shared point means $(-k)^2-4(1)(9)=0$, so $k^2=36$ and $k=6$ or $k=-6$.\nStep 3: The problem states $k$ is negative, so $k=-6$. Check: $x^2+6x+9=(x+3)^2=0$ has the single solution $x=-3$, where both graphs give $y=14$ ✓\n\n**Common Mistakes:**\n* $6$: solves $k^2=36$ correctly but ignores that $k$ must be negative.\n* $-2$: writes the constant term as $5-4=1$ instead of $5+4=9$, giving $k^2=4$.\n* $36$: reports $k^2$ rather than $k$.\n\n**Test Day Takeaway:** Squaring loses a sign — always re-read the restriction on the constant before choosing a root.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 5/5: discriminant-analysis (8 items) =====
  // Pattern: classify the number of real solutions of a quadratic by the sign of the
  // discriminant b² - 4ac. Δ > 0 (two real), Δ = 0 (one real), Δ < 0 (no real).
  // 7 test occurrences across PT8, PT12 and friends. SAT Pattern title (verbatim):
  // 'Discriminant Analysis' → kebab 'discriminant-analysis'.
  // Distinct from tangent-line-and-discriminant: this pattern is on a STANDALONE
  // quadratic, not a system between a line and a parabola.
  {
    id: "bank-am-132",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The discriminant of the quadratic equation $ax^{2}+bx+c=0$ is negative. Which of the following must be true about the graph of $y=ax^{2}+bx+c$ in the $xy$-plane?",
    choices: [
      // distractor: describes a discriminant equal to 0, not a negative one
      { id: "A", text: "The graph has exactly one $x$-intercept." },
      // distractor: describes a positive discriminant
      { id: "B", text: "The graph has exactly two $x$-intercepts." },
      // distractor: confuses x-intercepts with the y-intercept, which every such graph has at (0, c)
      { id: "C", text: "The graph has no $y$-intercept." },
      { id: "D", text: "The graph has no $x$-intercepts." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** A negative discriminant means no real solutions of $ax^{2}+bx+c=0$, so the graph never meets the $x$-axis.\n\n**The Full Solution:**\nStep 1: The $x$-intercepts of $y=ax^{2}+bx+c$ are the real solutions of $ax^{2}+bx+c=0$.\nStep 2: The number of real solutions is determined by the discriminant: positive gives two, zero gives one, negative gives none.\nStep 3: Since the discriminant is negative, the graph has no $x$-intercepts. Check with $y=x^{2}+x+1$, whose discriminant is $-3$ and whose graph stays above the $x$-axis ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: describes a discriminant equal to $0$.\n* Choice B: describes a positive discriminant.\n* Choice C: confuses the $x$-intercepts with the $y$-intercept, which is always at $(0,c)$.\n\n**Test Day Takeaway:** Discriminant sign and $x$-intercept count are the same fact told two ways.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-133",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "fill-in",
    question: "A truss analysis produces the equation $4x^{2}+7=12x$. After this equation is written in standard form, what is the value of its discriminant?",
    correctAnswer: "32",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is $32$.**\n\n**The Fast Way (~15s):** In standard form the equation is $4x^{2}-12x+7=0$, so the discriminant is $144-112=32$.\n\n**The Full Solution:**\nStep 1: Move every term to one side: $4x^{2}-12x+7=0$.\nStep 2: Read the coefficients: $a=4$, $b=-12$, $c=7$.\nStep 3: Compute $b^{2}-4ac=144-4(4)(7)=144-112=32$. Check: the solutions are $\\dfrac{12\\pm\\sqrt{32}}{8}$, which are real and distinct ✓\n\n**Common Mistakes:**\n* $-112$: left $12x$ on the right side and used $b=0$.\n* $256$: moved the terms the wrong way, using $c=-7$.\n* $144$: computed $b^{2}$ only and never subtracted $4ac$.\n\n**Test Day Takeaway:** The discriminant formula assumes standard form — rearrange first, then read $a$, $b$, and $c$ with their signs.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-134",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An engineer keeps only the candidate equations that are satisfied by two different real numbers. Which of the following equations should the engineer keep?",
    choices: [
      // distractor: discriminant is 0, so this equation has exactly one real solution
      { id: "A", text: "$x^{2}+4x+4=0$" },
      // distractor: discriminant is -16, so this equation has no real solutions
      { id: "B", text: "$x^{2}+2x+5=0$" },
      { id: "C", text: "$2x^{2}-7x+3=0$" },
      // distractor: discriminant is -12, so this equation has no real solutions
      { id: "D", text: "$3x^{2}-6x+4=0$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Only $2x^{2}-7x+3=0$ has a positive discriminant: $49-24=25$.\n\n**The Full Solution:**\nStep 1: Two different real solutions require $b^{2}-4ac>0$.\nStep 2: Compute each discriminant: $16-16=0$, $4-20=-16$, $49-24=25$, and $36-48=-12$.\nStep 3: Only $25$ is positive, so choice C is the equation to keep. Check: $2x^{2}-7x+3=(2x-1)(x-3)$, with solutions $\\dfrac{1}{2}$ and $3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($x^{2}+4x+4=0$): discriminant $0$, so exactly one real solution.\n* Choice B ($x^{2}+2x+5=0$): discriminant $-16$, so no real solutions.\n* Choice D ($3x^{2}-6x+4=0$): discriminant $-12$, so no real solutions.\n\n**Test Day Takeaway:** Screening several equations is fastest with the discriminant alone — never solve them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-135",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "A nozzle's flow model requires that $ax^{2}-12x+3=0$ be satisfied by exactly one real value of $x$, where $a$ is a positive constant. What is the value of $a$?",
    correctAnswer: "12",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~20s):** Exactly one real solution means $b^{2}-4ac=0$, so $144=12a$ and $a=12$.\n\n**The Full Solution:**\nStep 1: With $b=-12$ and $c=3$, the discriminant is $(-12)^{2}-4(a)(3)=144-12a$.\nStep 2: Exactly one real solution requires the discriminant to equal $0$: $144-12a=0$.\nStep 3: So $a=12$. Check: $12x^{2}-12x+3=3(2x-1)^{2}$, whose only solution is $x=\\dfrac{1}{2}$ ✓\n\n**Common Mistakes:**\n* $48$: used $b^{2}=3a$, omitting the factor $4$ in $4ac$.\n* $1$: used $b=12$ in place of $b^{2}$, solving $12-12a=0$.\n* $-12$: wrote $(-12)^{2}$ as $-144$, solving $-144-12a=0$.\n\n**Test Day Takeaway:** Exactly one real solution is the equation $b^{2}=4ac$ — set it up before touching the algebra.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-136",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A vibration study produces the equation $2x^{2}-12x+c=0$, and two different real values of $x$ satisfy it. Which of the following could be the value of the constant $c$?",
    choices: [
      { id: "A", text: "$12$" },
      // distractor: the boundary value, which makes the discriminant 0 and gives exactly one solution
      { id: "B", text: "$18$" },
      // distractor: used c < b squared over 4 = 36, omitting the leading coefficient 2
      { id: "C", text: "$36$" },
      // distractor: used c < b squared over 2 = 72
      { id: "D", text: "$72$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Two distinct real solutions require $144-8c>0$, so $c<18$; only $12$ qualifies.\n\n**The Full Solution:**\nStep 1: With $a=2$, $b=-12$, and constant $c$, the discriminant is $144-8c$.\nStep 2: Two different real solutions require $144-8c>0$, so $8c<144$ and $c<18$.\nStep 3: Of the four values, only $12$ is less than $18$. Check: $2x^{2}-12x+12=0$ has discriminant $144-96=48>0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($18$): the boundary value, which makes the discriminant $0$ and gives exactly one solution.\n* Choice C ($36$): uses $c<\\dfrac{b^{2}}{4}$, omitting the leading coefficient.\n* Choice D ($72$): uses $c<\\dfrac{b^{2}}{2}$.\n\n**Test Day Takeaway:** Solve the discriminant inequality once, then test the choices — and remember the boundary value is excluded.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-137",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "For the equation $2x^{2}+bx+5=0$, the value of the discriminant $b^{2}-4ac$ is $9$, and the constant $b$ is positive. What is the value of $b$?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~15s):** $b^{2}-40=9$, so $b^{2}=49$ and $b=7$.\n\n**The Full Solution:**\nStep 1: With $a=2$ and $c=5$, the discriminant is $b^{2}-4(2)(5)=b^{2}-40$.\nStep 2: Set it equal to $9$: $b^{2}-40=9$, so $b^{2}=49$.\nStep 3: Since $b$ is positive, $b=7$. Check: $2x^{2}+7x+5=0$ has discriminant $49-40=9$ ✓\n\n**Common Mistakes:**\n* $49$: reported $b^{2}$ instead of $b$.\n* $-7$: took the negative square root although $b$ is given as positive.\n* $5.39$: used $4c=20$ for $4ac$, omitting the leading coefficient, and solved $b^{2}=29$.\n\n**Test Day Takeaway:** Running the discriminant backwards is one equation in $b^{2}$ — the sign condition then picks the root.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-138",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "For the equation $x^{2}+bx+c=0$, the sum of the two real solutions is $4$ and the positive difference between them is $6$. What is the value of $c$?",
    choices: [
      { id: "A", text: "$-5$" },
      // distractor: reported b instead of c
      { id: "B", text: "$-4$" },
      // distractor: reported the sum of the two solutions instead of their product
      { id: "C", text: "$4$" },
      // distractor: multiplied the sum 4 by the difference 6
      { id: "D", text: "$24$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The squared difference of the solutions equals the discriminant: $36=b^{2}-4c$. With $b=-4$, $36=16-4c$, so $c=-5$.\n\n**The Full Solution:**\nStep 1: The sum of the solutions is $-b$, so $-b=4$ and $b=-4$.\nStep 2: For $x^{2}+bx+c=0$ the solutions are $\\dfrac{-b\\pm\\sqrt{b^{2}-4c}}{2}$, so their positive difference is $\\sqrt{b^{2}-4c}$. Setting $\\sqrt{16-4c}=6$ gives $16-4c=36$.\nStep 3: So $-4c=20$ and $c=-5$. Check: $x^{2}-4x-5=(x-5)(x+1)$, whose solutions $5$ and $-1$ have sum $4$ and difference $6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-4$): reports $b$ instead of $c$.\n* Choice C ($4$): reports the sum of the solutions.\n* Choice D ($24$): multiplies the sum by the difference.\n\n**Test Day Takeaway:** The gap between the two solutions is $\\sqrt{b^{2}-4ac}$ divided by $a$ — a difference of roots is a discriminant question in disguise.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-139",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "fill-in",
    question: "An extruder controller is tuned by choosing the positive constant $k$ for which the equation $kx^{2}+20x+k=0$ has a repeated solution rather than two distinct solutions. What is the value of $k$?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~20s):** A repeated solution means the discriminant is $0$; here $a=c=k$, so $400-4k^{2}=0$, $k^{2}=100$, and $k=10$.\n\n**The Full Solution:**\nStep 1: The coefficients are $a=k$, $b=20$, and $c=k$, so the discriminant is $20^{2}-4(k)(k)=400-4k^{2}$.\nStep 2: One repeated solution instead of two distinct ones means the discriminant equals $0$: $4k^{2}=400$, so $k^{2}=100$.\nStep 3: Since $k$ is positive, $k=10$. Check: $10x^{2}+20x+10=10(x+1)^{2}$, whose only solution is $x=-1$ ✓\n\n**Common Mistakes:**\n* $100$: solved $400=4k$, treating the two appearances of $k$ as one.\n* $-10$: took the negative square root although $k$ is given as positive.\n* $5$: divided $400$ by $4$ and then by $20$ instead of taking a square root.\n\n**Test Day Takeaway:** When the same parameter sits in two coefficients, $4ac$ becomes a square — expect a square root, not a linear solve.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 7/4: quadratic-via-factoring (8 items) =====
  // Pattern: solve x^2 + bx + c = 0 by finding two numbers with product c and
  // sum b. 7 test occurrences across PT1/2/3 M2Easy variants. SAT Pattern
  // title (verbatim): 'Quadratic via Factoring' → 'quadratic-via-factoring'.
  {
    id: "bank-am-140",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A model gives the vertical offset, in centimeters, of a ferry ramp relative to its dock as $x^{2}-9x+18$, where $x$ is the tide height in decimeters. What is the lesser of the two tide heights at which the offset is $0$ centimeters?",
    choices: [
      // distractor: factors as (x + 3)(x + 6) with both signs flipped and takes the lesser value -6
      { id: "A", text: "$-6$" },
      { id: "B", text: "$3$" },
      // distractor: reports 9/2, the tide height halfway between the two zeros
      { id: "C", text: "$4.5$" },
      // distractor: reports the greater of the two tide heights instead of the lesser
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $x^{2}-9x+18=(x-3)(x-6)$, so the offset is $0$ at $x=3$ and $x=6$; the lesser height is $3$.\n\n**The Full Solution:**\n\nStep 1: Set the model equal to zero: $x^{2}-9x+18=0$.\n\nStep 2: Find two numbers with product $18$ and sum $-9$: they are $-3$ and $-6$, so the expression factors as $(x-3)(x-6)$.\n\nStep 3: Each factor gives a tide height: $x=3$ or $x=6$, and the question asks for the lesser, $3$. Check: $3^{2}-9(3)+18=9-27+18=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-6$): factors as $(x+3)(x+6)$, flipping both signs, and reports the lesser negative value.\n* Choice C ($4.5$): reports $\\frac{9}{2}$, the height midway between the two zeros.\n* Choice D ($6$): solves correctly but reports the greater of the two tide heights.\n\n**Test Day Takeaway:** After factoring, reread which of the two solutions the question actually wants.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-141",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "easy",
    type: "fill-in",
    question: "The equation $(x + 7)(x - 3) = 0$ has two solutions, one positive and one negative. What is the value of the negative solution?",
    correctAnswer: "-7",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**The correct answer is $-7$.**\n\n**The Fast Way (~15s):** A product is zero when a factor is zero, so $x = -7$ or $x = 3$; the negative one is $-7$.\n\n**The Full Solution:**\nStep 1: The zero-product property says that if a product of two factors is $0$, at least one factor is $0$. So $x + 7 = 0$ or $x - 3 = 0$.\nStep 2: Solving each gives $x = -7$ and $x = 3$.\nStep 3: The negative solution is $-7$. Check: $(-7 + 7)(-7 - 3) = (0)(-10) = 0$. $\\checkmark$\n\n**Common Mistakes:**\n* Picking the factor that already contains a minus sign, $(x - 3)$, and answering $-3$; that factor's solution is $+3$.\n* Expanding to $x^2 + 4x - 21 = 0$ and then re-factoring, which wastes time on an equation that is already factored.\n* Reporting $3$, the positive solution, when the question asks for the negative one.\n\n**Test Day Takeaway:** A factored equation is already solved: set each factor to zero and flip the sign of the constant inside it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-142",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A tugboat's net thrust, in kilonewtons, is modeled by $x^{2}+bx-24$, where $b$ is a constant and $x$ is the propeller pitch setting. The net thrust is zero at $x=-8$ and at one positive integer setting. What is the value of $b$?",
    choices: [
      // distractor: sets b equal to the sum of the zeros, -8 + 3 = -5, instead of its opposite
      { id: "A", text: "$-5$" },
      // distractor: reports the opposite of the second zero, -3
      { id: "B", text: "$-3$" },
      // distractor: reports the second zero, 3, instead of b
      { id: "C", text: "$3$" },
      { id: "D", text: "$5$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The zeros multiply to $-24$, so the second zero is $-24\\div(-8)=3$; the factorization $(x+8)(x-3)=x^{2}+5x-24$ gives $b=5$.\n\n**The Full Solution:**\n\nStep 1: Because $x=-8$ makes the model zero, $x+8$ is a factor, so $x^{2}+bx-24=(x+8)(x-r)$ for the second zero $r$.\n\nStep 2: Matching constants gives $-8r=-24$, so $r=3$, the positive integer setting the stem promises.\n\nStep 3: Expand: $(x+8)(x-3)=x^{2}+5x-24$, so $b=5$. Check: substituting $x=-8$ into $x^{2}+5x-24$ gives $64-40-24=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-5$): reports the sum of the zeros, $-8+3=-5$, forgetting that $b$ is the opposite of that sum.\n* Choice B ($-3$): reports the opposite of the second zero.\n* Choice C ($3$): stops at the second zero and never returns to $b$.\n\n**Test Day Takeaway:** A known zero hands you a factor; match the constant term first, then read the middle coefficient off the expansion.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-143",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "medium",
    type: "fill-in",
    question: "A maple evaporator's sap-level deviation, in centimeters, is modeled by $x^{2}-11x+c$, where $c$ is a constant and $x$ is the number of hours since firing. The deviation is zero at two hour values that are positive integers three hours apart. What is the value of $c$?",
    correctAnswer: "28",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**The correct answer is $28$.**\n\n**The Fast Way (~40s):** Two zeros three apart that sum to $11$ are $4$ and $7$, and $c$ is their product, $28$.\n\n**The Full Solution:**\n\nStep 1: Write the zeros as $r$ and $r+3$. For $x^{2}-11x+c$ the sum of the zeros is $11$, so $r+(r+3)=11$.\n\nStep 2: Solve: $2r+3=11$, so $r=4$ and the zeros are $4$ and $7$.\n\nStep 3: The constant term is the product of the zeros, so $c=4\\cdot7=28$. Check: $x^{2}-11x+28=(x-4)(x-7)$, and $4$ and $7$ are positive integers three hours apart.\n\n**Common Mistakes:**\n\n* Treating the given gap $3$ as one of the zeros and pairing it with $11-3=8$ gives $c=24$.\n* Reporting the sum of the zeros, $11$, instead of their product.\n\n**Test Day Takeaway:** For $x^{2}+bx+c$ the zeros sum to $-b$ and multiply to $c$; a stated gap between them turns that pair of facts into one linear equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-144",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The graph shows a monorail bogie's vertical displacement $y$, in millimeters, at time $x$, in seconds, after it crosses a rail joint. The curve is the graph of $y=2(x-r)(x-s)$ for constants $r$ and $s$. What is the value of $rs$?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, -8], a: 2, showPoints: [[1, 0], [5, 0]], showVertex: true } },
    choices: [
      // distractor: keeps a negative sign, as if the zeros were -1 and 5, giving -5
      { id: "A", text: "$-5$" },
      { id: "B", text: "$5$" },
      // distractor: reports r + s = 1 + 5 = 6 instead of the product
      { id: "C", text: "$6$" },
      // distractor: reports the depth of the lowest point, 8, instead of the product of the zeros
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The curve meets the horizontal axis at $x=1$ and $x=5$, so $r=1$ and $s=5$ and $rs=5$.\n\n**The Full Solution:**\n\nStep 1: In the form $y=2(x-r)(x-s)$, the graph is zero exactly at $x=r$ and $x=s$.\n\nStep 2: The graph crosses the horizontal axis at the marked points $(1,0)$ and $(5,0)$, so the two constants are $1$ and $5$.\n\nStep 3: Multiply: $rs=1\\cdot5=5$. Check: $y=2(x-1)(x-5)$ has its lowest point at $x=3$, where $y=2(2)(-2)=-8$, matching the marked turning point.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-5$): treats the left intercept as $-1$ rather than $1$, producing a negative product.\n* Choice C ($6$): adds the two intercepts instead of multiplying them.\n* Choice D ($8$): reads the depth of the turning point, $8$ millimeters, as the answer.\n\n**Test Day Takeaway:** In a factored form, each $(x-k)$ names an intercept directly — read the intercepts off the graph and do only the arithmetic the question asks for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-145",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "medium",
    type: "fill-in",
    question: "The function $f$ defined by $f(x)=x^{2}-4x-21$ gives the net lift, in newtons, of a cargo drone rotor at throttle index $x$, for $x\\ge 7$. At what throttle index is the net lift $39$ newtons?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~35s):** Setting $x^{2}-4x-21=39$ gives $x^{2}-4x-60=0$, which factors as $(x-10)(x+6)$; only $x=10$ lies in the stated domain.\n\n**The Full Solution:**\n\nStep 1: Set the model equal to the given lift: $x^{2}-4x-21=39$.\n\nStep 2: Move everything to one side: $x^{2}-4x-60=0$. Two numbers with product $-60$ and sum $-4$ are $-10$ and $6$, so the equation is $(x-10)(x+6)=0$.\n\nStep 3: The solutions are $x=10$ and $x=-6$; the domain is $x\\ge7$, so the throttle index is $10$. Check: $10^{2}-4(10)-21=100-40-21=39$.\n\n**Common Mistakes:**\n\n* Setting the expression to $0$ instead of $39$ gives $x=7$, the index where the lift vanishes.\n* Reporting $-6$, the solution the stated domain $x\\ge7$ rules out.\n\n**Test Day Takeaway:** Move the given output across the equals sign before factoring, then check each solution against the stated domain.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-146",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In a chairlift tension model, the function $g$ defined by $g(x)=ax^{2}-5x-12$ has $4$ as one of its two zeros, where $a$ is a positive constant. What is the sum of the two zeros of $g$?",
    choices: [
      // distractor: multiplies the two zeros, 4 times -3/2 = -6, instead of adding them
      { id: "A", text: "$-6$" },
      // distractor: reports only the second zero, -3/2
      { id: "B", text: "$-\\frac{3}{2}$" },
      { id: "C", text: "$\\frac{5}{2}$" },
      // distractor: skips solving for a and uses -b/a with a = 1, giving 5
      { id: "D", text: "$5$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** $g(4)=0$ forces $16a=32$, so $a=2$; then $2x^{2}-5x-12=(2x+3)(x-4)$ and the zeros $4$ and $-\\frac{3}{2}$ sum to $\\frac{5}{2}$.\n\n**The Full Solution:**\n\nStep 1: Because $4$ is a zero, $g(4)=16a-20-12=0$, so $16a=32$ and $a=2$.\n\nStep 2: The function is $g(x)=2x^{2}-5x-12$, which factors as $(2x+3)(x-4)$, giving zeros $x=-\\frac{3}{2}$ and $x=4$.\n\nStep 3: Add them: $4+\\left(-\\frac{3}{2}\\right)=\\frac{5}{2}$. Check: for $2x^{2}-5x-12$ the sum of the zeros is $-\\frac{-5}{2}=\\frac{5}{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-6$): multiplies the zeros, $4\\cdot\\left(-\\frac{3}{2}\\right)=-6$, instead of adding them.\n* Choice B ($-\\frac{3}{2}$): stops at the second zero.\n* Choice D ($5$): never solves for $a$ and uses $-\\frac{b}{a}$ with $a=1$.\n\n**Test Day Takeaway:** A known zero pins down an unknown leading coefficient; recover it first, because every later shortcut depends on it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-147",
    domain: "advanced-math",
    skills: ["finding-roots-factoring"],
    difficulty: "hard",
    type: "fill-in",
    question: "The hourly throughput of a produce packhouse, in crates, is modeled by $2w^{2}+3w$, where $w$ is the number of sorting lanes running. For how many sorting lanes is the throughput $90$ crates per hour?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Quadratic via Factoring**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~40s):** $2w^{2}+3w=90$ becomes $2w^{2}+3w-90=0$, which factors as $(2w+15)(w-6)$; a lane count must be positive, so $w=6$.\n\n**The Full Solution:**\n\nStep 1: Set the model equal to the target: $2w^{2}+3w=90$, so $2w^{2}+3w-90=0$.\n\nStep 2: Factor. The product $2\\cdot(-90)=-180$ needs two numbers summing to $3$: they are $15$ and $-12$, giving $2w^{2}+15w-12w-90=(2w+15)(w-6)$.\n\nStep 3: The factors give $w=-\\frac{15}{2}$ or $w=6$; only $6$ can be a number of lanes. Check: $2(6)^{2}+3(6)=72+18=90$.\n\n**Common Mistakes:**\n\n* Dividing $90$ by the sum of the coefficients, $2+3=5$, gives $18$.\n* Reporting $-\\frac{15}{2}$, the solution from the factor $2w+15$, which cannot count lanes.\n\n**Test Day Takeaway:** With a leading coefficient other than $1$, split the middle term using the product $ac$; then discard any solution the context forbids.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-via-factoring",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 8/3: function-evaluation-with-negative-input (8 items) =====
  // Pattern: f(x) defined; evaluate at NEGATIVE input. 7 test occurrences across
  // M2Easy variants. Title verbatim: 'Function Evaluation with Negative Input'.
  {
    id: "bank-am-148",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $h$ gives the expansion, in millimeters, of a bridge joint at a deck temperature of $t$ degrees Celsius, where $h(t)=1.2t+30$. What is the expansion when the deck temperature is $-15$ degrees Celsius?",
    choices: [
      // distractor: reports only the product 1.2(-15) = -18, dropping the constant 30
      { id: "A", text: "$-18$" },
      { id: "B", text: "$12$" },
      // distractor: evaluates at t = 0 instead of t = -15
      { id: "C", text: "$30$" },
      // distractor: substitutes t = 15, ignoring the negative sign: 1.2(15) + 30 = 48
      { id: "D", text: "$48$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $1.2(-15)=-18$, and $-18+30=12$ millimeters.\n\n**The Full Solution:**\nStep 1: Substitute $-15$ for $t$: $h(-15)=1.2(-15)+30$.\nStep 2: A positive rate times a negative temperature is negative: $1.2(-15)=-18$.\nStep 3: Add the constant: $-18+30=12$ millimeters. Check: at $0$ degrees the joint reads 30 mm, and cooling by 15 degrees removes 18 mm, leaving 12 ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-18$): stops at $1.2(-15)$ and never adds the constant 30.\n* Choice C ($30$): evaluates the model at $t=0$ rather than at $t=-15$.\n* Choice D ($48$): drops the negative sign and substitutes $t=15$.\n\n**Test Day Takeaway:** Substitute the negative input inside parentheses so the sign travels through the multiplication before the constant is added.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-149",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "easy",
    type: "fill-in",
    question: "A hearing-screening booth reports its excess noise level, in decibels above the booth's rated limit, as $L(x)=x^{2}-6x+1$, where $x$ is the door-seal offset, in centimeters, from the position at which the booth was calibrated. What is the value of $L(-4)$?",
    correctAnswer: "41",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**The correct answer is $41$.**\n\n**The Fast Way (~20s):** $(-4)^{2}=16$ and $-6(-4)=24$, so $L(-4)=16+24+1=41$.\n\n**The Full Solution:**\nStep 1: Substitute $-4$ for $x$: $L(-4)=(-4)^{2}-6(-4)+1$.\nStep 2: Square first: $(-4)^{2}=16$. Then $-6(-4)=24$, a positive term.\nStep 3: Combine: $16+24+1=41$ decibels above the rated limit. Check: $16+24=40$, and adding 1 gives 41 ✓\n\n**Common Mistakes:** Writing $(-4)^{2}$ as $-16$ gives $-16+24+1=9$. Treating $-6(-4)$ as $-24$ gives $16-24+1=-7$. Forgetting the constant term gives 40.\n\n**Test Day Takeaway:** Two sign flips hide in a quadratic at a negative input: the square is positive, and a negative coefficient times a negative input is positive.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-150",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives the horizontal deflection $D(x)$, in millimeters, of a retaining wall at five elevations $x$, in meters, relative to the ground surface. What is the value of $D(-3)-D(-6)$?",
    diagram: { type: "dataTable", params: { headers: ["Elevation x (m)", "Deflection D(x) (mm)"], rows: [["-12", "-20"], ["-9", "-17"], ["-6", "-14"], ["-3", "-8"], ["0", "-2"]] } },
    choices: [
      // distractor: adds the two readings instead of subtracting: -8 + (-14) = -22
      { id: "A", text: "$-22$" },
      // distractor: subtracts in the reverse order: D(-6) - D(-3) = -14 + 8 = -6
      { id: "B", text: "$-6$" },
      { id: "C", text: "$6$" },
      // distractor: ignores both negative signs and computes 8 + 14 = 22
      { id: "D", text: "$22$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Read $D(-3)=-8$ and $D(-6)=-14$; subtracting gives $-8-(-14)=6$.\n\n**The Full Solution:**\nStep 1: Locate the row for the elevation $-3$: the deflection is $-8$ millimeters.\nStep 2: Locate the row for the elevation $-6$: the deflection is $-14$ millimeters.\nStep 3: Subtract in the order asked: $-8-(-14)=-8+14=6$ millimeters. Check: the wall deflects 6 mm less at $-3$ m than at $-6$ m, and the table's values do rise moving upward ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-22$): adds the two readings, $-8+(-14)$, instead of subtracting.\n* Choice B ($-6$): subtracts in the reverse order, $D(-6)-D(-3)$.\n* Choice D ($22$): drops both negative signs and adds $8+14$.\n\n**Test Day Takeaway:** Subtracting a negative table value adds its magnitude — write the parentheses before you compute.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-151",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "fill-in",
    question: "A projection engineer models the focus error, in millimeters, produced when a lens is offset by $x$ millimeters from its seat, using $E(x)=\\frac{x^{2}+8}{x-1}$. What is the value of $E(-5)$?",
    correctAnswer: "-5.5",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**The correct answer is $-5.5$.**\n\n**The Fast Way (~25s):** The numerator is $25+8=33$ and the denominator is $-5-1=-6$, so $E(-5)=\\frac{33}{-6}=-5.5$.\n\n**The Full Solution:**\nStep 1: Substitute $-5$ into the numerator: $(-5)^{2}+8=25+8=33$.\nStep 2: Substitute $-5$ into the denominator: $-5-1=-6$.\nStep 3: Divide: $\\frac{33}{-6}=-5.5$ millimeters. Check: $-5.5 \\times (-6)=33$, the numerator ✓\n\n**Common Mistakes:** Writing $(-5)^{2}$ as $-25$ gives $\\frac{-17}{-6}$, about $2.83$. Reading the denominator as $-5+1=-4$ gives $-8.25$. Dropping the sign of the denominator gives $5.5$.\n\n**Test Day Takeaway:** A negative input changes the numerator and the denominator separately — evaluate each fully before dividing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-152",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A soil-compaction index at a borehole is modeled by $f(x)=x^{2}+kx-6$ for a constant $k$, and the index recorded at $x=-3$ is $12$. What is the value of $k$?",
    choices: [
      // distractor: reads (-3)^2 as -9, giving -9 - 3k - 6 = 12 and k = -9
      { id: "A", text: "$-9$" },
      { id: "B", text: "$-3$" },
      // distractor: drops the constant -6, giving 9 - 3k = 12 and k = -1
      { id: "C", text: "$-1$" },
      // distractor: uses +3k instead of -3k, giving 9 + 3k - 6 = 12 and k = 3
      { id: "D", text: "$3$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $9-3k-6=12$, so $-3k=9$ and $k=-3$.\n\n**The Full Solution:**\nStep 1: Substitute $x=-3$: $f(-3)=(-3)^{2}+k(-3)-6=9-3k-6$.\nStep 2: Simplify and set equal to 12: $3-3k=12$.\nStep 3: Subtract 3 and divide by $-3$: $-3k=9$, so $k=-3$. Check: $9-3(-3)-6=9+9-6=12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9$): treats $(-3)^{2}$ as $-9$, which turns the equation into $-3k=27$.\n* Choice C ($-1$): drops the constant $-6$, leaving $9-3k=12$.\n* Choice D ($3$): writes the middle term as $+3k$, reversing the sign the negative input produces.\n\n**Test Day Takeaway:** With a negative input, the term $kx$ becomes $-3k$; keep that sign attached before you isolate the constant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-153",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "fill-in",
    question: "A ceramics kiln's cooling model gives the rate $g(x)=4-x^{3}$, in degrees Celsius per minute, at a damper offset of $x$ units from the neutral position. At one setting the rate is $68$ degrees Celsius per minute. What is that offset?",
    correctAnswer: "-4",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**The correct answer is $-4$.**\n\n**The Fast Way (~25s):** $4-x^{3}=68$ gives $x^{3}=-64$, so $x=-4$.\n\n**The Full Solution:**\nStep 1: Set the model equal to the given rate: $4-x^{3}=68$.\nStep 2: Subtract 4 from both sides: $-x^{3}=64$, so $x^{3}=-64$.\nStep 3: A cube root keeps the sign of its input, so $x=-4$. Check: $4-(-4)^{3}=4+64=68$ ✓\n\n**Common Mistakes:** Taking the cube root of $64$ and reporting $4$ ignores the sign; $4-4^{3}=-60$, not 68. Adding 4 instead of subtracting gives $x^{3}=-72$ and a non-integer setting. Reading $4-x^{3}$ as $(4-x)^{3}$ gives $(4-x)^{3}=68$, which has no integer solution.\n\n**Test Day Takeaway:** Unlike a square, a cube preserves sign — a negative output of $x^{3}$ means a negative input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-154",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "During a load test, a crew recorded the five readings shown in the table, one at each marked position along a beam, and a quadratic function $f$ fits all five readings exactly. What is the value of $f(-6)$?",
    diagram: { type: "dataTable", params: { headers: ["Position x (m)", "Reading f(x)"], rows: [["-4", "21"], ["-2", "5"], ["0", "-3"], ["2", "-3"], ["4", "5"]] } },
    choices: [
      // distractor: sign slip on the linear term: computes 36 - 12 - 3 = 21 instead of 36 + 12 - 3
      { id: "A", text: "$21$" },
      // distractor: extends the constant first difference 16 backwards from 21 instead of the growing differences
      { id: "B", text: "$37$" },
      { id: "C", text: "$45$" },
      // distractor: drops the constant term -3, computing 36 + 12 = 48
      { id: "D", text: "$48$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The equal readings at $x=0$ and $x=2$ put the vertex at $x=1$, and $f(x)=x^{2}-2x-3$ fits the table, so $f(-6)=36+12-3=45$.\n\n**The Full Solution:**\nStep 1: The readings at $x=0$ and $x=2$ are both $-3$, so the axis of symmetry is $x=1$ and $f(x)=a(x-1)^{2}+k$.\nStep 2: From $f(0)=-3$, $a+k=-3$; from $f(4)=5$, $9a+k=5$. Subtracting gives $8a=8$, so $a=1$ and $k=-4$, which means $f(x)=x^{2}-2x-3$.\nStep 3: Evaluate at the negative input: $f(-6)=36-2(-6)-3=36+12-3=45$. Check: $f(-4)=16+8-3=21$, matching the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($21$): computes $36-12-3$, dropping the sign change that $-2(-6)$ produces.\n* Choice B ($37$): continues the first difference of $16$ one more step, $21+16$, as if the readings were linear.\n* Choice D ($48$): stops at $36+12$ and never subtracts the constant 3.\n\n**Test Day Takeaway:** Two equal outputs locate the axis of symmetry; once the rule is known, a negative input is a straight substitution.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-155",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "hard",
    type: "fill-in",
    question: "A wind-tunnel run models the net side force, in newtons, on a scale model of a stadium canopy at a yaw offset of $x$ degrees by $f(x)=2x^{2}+12x+7$. Exactly one yaw offset other than $-8$ degrees produces the same net side force that $-8$ degrees produces. What is that offset?",
    correctAnswer: "2",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**The correct answer is $2$.**\n\n**The Fast Way (~30s):** The axis of symmetry is $x=-\\frac{12}{4}=-3$, and $-8$ is 5 units to its left, so its partner is 5 units to its right, at $x=2$.\n\n**The Full Solution:**\nStep 1: For $f(x)=ax^{2}+bx+c$ the axis of symmetry is $x=-\\frac{b}{2a}=-\\frac{12}{2(2)}=-3$ degrees.\nStep 2: Two inputs with equal outputs are mirror images across that line, so the partner of $x=-8$ is $x=2(-3)-(-8)$.\nStep 3: $2(-3)+8=2$ degrees. Check: $2(-8)^{2}+12(-8)+7=39$ and $2(2)^{2}+12(2)+7=39$, the same side force ✓\n\n**Common Mistakes:** Using $-\\frac{b}{a}=-6$ as the axis gives the partner $2(-6)+8=-4$. Reporting the opposite of $-8$ gives 8, which assumes the axis is the vertical axis. Substituting $-8$ and reporting the side force 39 answers a different question.\n\n**Test Day Takeaway:** Equal outputs on a parabola sit symmetrically about $x=-\\frac{b}{2a}$; the two inputs average to that value.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 8/4: discriminant-with-integer-bound (8 items) =====
  // Pattern: solve b² − 4ac < 0 (or > 0) and find the greatest/least integer
  // satisfying the bound. 7 test occurrences across PT2/3 + M2Easy. Title:
  // 'Discriminant with Integer Bound'.
  {
    id: "bank-am-156",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An engineer needs the equation $x^{2}+14x+k=0$ to have two different real solutions, where $k$ is an integer chosen as large as possible. Which value of $k$ should the engineer choose?",
    choices: [
      // distractor: used k < b/2 = 7 instead of the discriminant condition
      { id: "A", text: "$7$" },
      { id: "B", text: "$48$" },
      // distractor: the boundary value, which makes the discriminant 0 and gives exactly one solution
      { id: "C", text: "$49$" },
      // distractor: used k < b squared over 2 = 98
      { id: "D", text: "$98$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $196-4k>0$ gives $k<49$, so the largest integer is $48$.\n\n**The Full Solution:**\nStep 1: The discriminant is $14^{2}-4(1)(k)=196-4k$.\nStep 2: Two different real solutions require $196-4k>0$, so $4k<196$ and $k<49$.\nStep 3: The largest integer less than $49$ is $48$. Check: $k=48$ gives a discriminant of $196-192=4>0$, while $k=49$ gives $0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): uses $k<\\dfrac{b}{2}$ instead of the discriminant condition.\n* Choice C ($49$): the boundary value, which gives exactly one solution.\n* Choice D ($98$): uses $k<\\dfrac{b^{2}}{2}$.\n\n**Test Day Takeaway:** Solve the inequality first, then step one integer inside the boundary — the boundary itself always fails a strict inequality.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-157",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "fill-in",
    question: "A heat exchanger is stable when the equation $x^{2}-6x+k=0$ has no real solution. What is the least integer $k$ that makes the exchanger stable?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~20s):** $36-4k<0$ gives $k>9$, so the smallest integer is $10$.\n\n**The Full Solution:**\nStep 1: The discriminant is $(-6)^{2}-4(1)(k)=36-4k$.\nStep 2: No real solutions requires $36-4k<0$, so $4k>36$ and $k>9$.\nStep 3: The smallest integer greater than $9$ is $10$. Check: $k=10$ gives $36-40=-4<0$, while $k=9$ gives $0$, which is one solution ✓\n\n**Common Mistakes:**\n* $9$: the boundary value, which gives exactly one real solution rather than none.\n* $3$: used $k>\\dfrac{b}{2}$ instead of the discriminant condition.\n* $6$: used the coefficient $6$ from the equation without computing the discriminant.\n\n**Test Day Takeaway:** No real solutions is a strict inequality, so the boundary integer is one step too small.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-158",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = 2x^2 - bx + 50$ has no $x$-intercepts, where $b$ is a positive integer. What is the greatest possible value of $b$?",
    choices: [
      // distractor: drops the factor of $4$, using $b^2 < ac = 100$ and stopping one integer below $10$
      { id: "A", text: "$9$" },
      { id: "B", text: "$19$" },
      // distractor: stops at the boundary $b = 20$, where the graph touches the $x$-axis at exactly one point
      { id: "C", text: "$20$" },
      // distractor: uses $b < 4\sqrt{ac} = 40$ instead of $b < 2\sqrt{ac} = 20$
      { id: "D", text: "$39$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** No $x$-intercepts means $b^2 < 4(2)(50) = 400$, so $b < 20$ and the greatest integer is $19$.\n\n**The Full Solution:**\nStep 1: The graph crosses the $x$-axis where $2x^2 - bx + 50 = 0$, so having no $x$-intercepts means that equation has no real solutions.\nStep 2: With $a = 2$ and $c = 50$, the discriminant is $(-b)^2 - 4(2)(50) = b^2 - 400$, and no real solutions requires $b^2 < 400$, so for positive $b$, $b < 20$.\nStep 3: The greatest integer strictly less than $20$ is $19$. Check: $19^2 = 361 < 400$, while $20^2 = 400$ makes the discriminant zero. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): dropping the $4$ gives $b^2 < 100$ and $b < 10$.\n* Choice C ($20$): at $b = 20$ the discriminant is exactly $0$, so the graph touches the $x$-axis once rather than missing it.\n* Choice D ($39$): using $4\\sqrt{ac} = 40$ in place of $2\\sqrt{ac} = 20$ doubles the bound.\n\n**Test Day Takeaway:** A parabola misses the $x$-axis exactly when the discriminant is negative; compute $4ac$ in full, then step one integer inside the boundary.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-159",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "In the equation $ax^{2}+14x+6=0$, two different real values of $x$ satisfy the equation for every positive integer $a$ from $1$ through $n$, but not for $a=n+1$. What is the value of $n$?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~25s):** $196-24a>0$ gives $a<8.17$, so the last positive integer that works is $8$.\n\n**The Full Solution:**\nStep 1: The discriminant is $14^{2}-4(a)(6)=196-24a$.\nStep 2: Two different real solutions require $196-24a>0$, so $a<\\dfrac{196}{24}\\approx 8.17$.\nStep 3: Every positive integer through $8$ works and $9$ does not, so $n=8$. Check: $a=8$ gives $196-192=4>0$, and $a=9$ gives $196-216=-20<0$ ✓\n\n**Common Mistakes:**\n* $9$: rounded $8.17$ up instead of taking the integer below it.\n* $4$: divided $196$ by $48$ instead of by $24$.\n* $8.17$: reported the boundary rather than the largest integer below it.\n\n**Test Day Takeaway:** When the parameter is the leading coefficient, it enters through $4ac$ — the bound is a division, and only the integers strictly below it survive.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-160",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the equation $x^2 + bx + 4 = 0$, $b$ is a constant and the equation has no real solutions. Which of the following describes all possible values of $b$?",
    choices: [
      { id: "A", text: "$-4 < b < 4$" },
      // distractor: uses $\sqrt{c} = 2$ as the bound instead of $2\sqrt{c} = 4$
      { id: "B", text: "$-2 < b < 2$" },
      // distractor: keeps only the positive half of the interval and reverses its direction
      { id: "C", text: "$b > 4$" },
      // distractor: solves $b^2 > 16$, the condition for two distinct real solutions
      { id: "D", text: "$b < -4$ or $b > 4$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** No real solutions means $b^2 < 4(1)(4) = 16$, which is $-4 < b < 4$.\n\n**The Full Solution:**\nStep 1: The discriminant is $b^2 - 4(1)(4) = b^2 - 16$.\nStep 2: No real solutions means $b^2 - 16 < 0$, so $b^2 < 16$.\nStep 3: Taking square roots of $b^2 < 16$ gives $|b| < 4$, which is the interval $-4 < b < 4$. Check: $b = 3$ gives $9 - 16 = -7 < 0$, and $b = -5$ gives $25 - 16 = 9 > 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: the bound $2$ comes from $\\sqrt{4}$; the discriminant needs $\\sqrt{4ac} = \\sqrt{16} = 4$.\n* Choice C: this keeps only values above $4$, which actually give two real solutions.\n* Choice D: this is the solution set of $b^2 > 16$, the two-solution case, not the no-solution case.\n\n**Test Day Takeaway:** $b^2 < k$ becomes a single interval around zero; $b^2 > k$ becomes two rays. Match the shape to the condition asked.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-161",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "A suspension cable's profile is modeled by $y=x^{2}+kx+40$, whose graph does not intersect the $x$-axis, where $k$ is an integer. What is the least possible value of $k$?",
    correctAnswer: "-12",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**The correct answer is $-12$.**\n\n**The Fast Way (~25s):** $k^{2}-160<0$ gives $|k|<12.65$, so $k$ runs from $-12$ to $12$ and the least is $-12$.\n\n**The Full Solution:**\nStep 1: No $x$-intercepts means $x^{2}+kx+40=0$ has no real solutions, so $k^{2}-4(1)(40)<0$.\nStep 2: That is $k^{2}<160$, so $|k|<\\sqrt{160}\\approx 12.65$.\nStep 3: The integers satisfying this run from $-12$ to $12$, so the least is $-12$. Check: $k=-12$ gives $144-160=-16<0$, while $k=-13$ gives $169-160=9>0$ ✓\n\n**Common Mistakes:**\n* $-13$: rounded $\\sqrt{160}\\approx 12.65$ up instead of staying strictly inside the bound.\n* $12$: reported the greatest integer value rather than the least.\n* $0$: assumed a negative $k$ was impossible for a graph above the $x$-axis.\n\n**Test Day Takeaway:** $k^{2}<160$ bounds $k$ on both sides — the least value is the negative end, not $0$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-162",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A tuning parameter $k$ must be an integer for which no real value of $x$ satisfies $x^{2}+kx+30=0$. How many values of $k$ meet this requirement?",
    choices: [
      // distractor: counted only the positive values of k
      { id: "A", text: "$10$" },
      // distractor: counted k = 0 through k = 10 and ignored the negative values
      { id: "B", text: "$11$" },
      // distractor: counted -10 through 10 but omitted k = 0
      { id: "C", text: "$20$" },
      { id: "D", text: "$21$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** $k^{2}<120$ means $|k|\\le 10$, and the integers from $-10$ to $10$ number $21$.\n\n**The Full Solution:**\nStep 1: No real solutions requires $k^{2}-4(1)(30)<0$, so $k^{2}<120$.\nStep 2: Since $10^{2}=100<120$ and $11^{2}=121>120$, the integers satisfying this are $-10$ through $10$.\nStep 3: Count them: $10$ negative, $10$ positive, and $0$, for $21$ values. Check: $k=10$ gives $100-120=-20<0$, and $k=11$ gives $121-120=1>0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): counts only the positive values of $k$.\n* Choice B ($11$): counts $k=0$ through $k=10$ and ignores the negatives.\n* Choice C ($20$): counts $-10$ through $10$ but omits $k=0$.\n\n**Test Day Takeaway:** Counting integers in a symmetric range means twice the positive count plus one for $0$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-163",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "fill-in",
    question: "As the integer $c$ increases, the equation $4x^{2}+20x+c=0$ stops having two different real solutions. What is the greatest integer $c$ for which it still has two different real solutions?",
    correctAnswer: "24",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**The correct answer is $24$.**\n\n**The Fast Way (~25s):** $400-16c>0$ gives $c<25$, so the largest integer is $24$.\n\n**The Full Solution:**\nStep 1: With $a=4$ and $b=20$, the discriminant is $400-4(4)(c)=400-16c$.\nStep 2: Two different real solutions require $400-16c>0$, so $16c<400$ and $c<25$.\nStep 3: The largest integer less than $25$ is $24$. Check: $c=24$ gives $400-384=16>0$, while $c=25$ gives $0$ ✓\n\n**Common Mistakes:**\n* $25$: the boundary value, which makes the discriminant $0$ and gives exactly one solution.\n* $100$: used $c<\\dfrac{b^{2}}{4}=100$, omitting the leading coefficient $4$.\n* $5$: used $c<\\dfrac{b}{4}$ instead of the discriminant condition.\n\n**Test Day Takeaway:** The leading coefficient multiplies $c$ by $4a$, not by $4$; dropping it inflates the bound fourfold.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 8/5: vertex-form-maximum (8 items) =====
  // Pattern: find the maximum/minimum value (or x-coordinate of vertex) of a
  // quadratic by completing the square or using x = -b/(2a). 6 test occurrences
  // across PT3, PT7 etc. Title: 'Vertex Form Maximum'.
  {
    id: "bank-am-164",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The graph of the quadratic function $f$ is shown in the $xy$-plane, and its minimum occurs at the marked point. If $f(x) = (x - h)^2 + k$, where $h$ and $k$ are constants, what is the value of $h + k$?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, -5], a: 1, showVertex: true } },
    choices: [
      // distractor: reads $h$ as $-3$ from the $(x - h)$ form, giving $-3 + (-5)$
      { id: "A", text: "$-8$" },
      // distractor: reports $k$ alone rather than the requested sum
      { id: "B", text: "$-5$" },
      { id: "C", text: "$-2$" },
      // distractor: computes $h - k$ instead of $h + k$
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The minimum sits at $(3, -5)$, so $h = 3$ and $k = -5$, and $h + k = -2$.\n\n**The Full Solution:**\nStep 1: In vertex form $f(x) = (x - h)^2 + k$, the vertex is the point $(h, k)$, and for an upward-opening parabola that vertex is the minimum.\nStep 2: The marked minimum on the graph is $(3, -5)$, so $h = 3$ and $k = -5$.\nStep 3: Then $h + k = 3 + (-5) = -2$. Check: $f(x) = (x - 3)^2 - 5$ gives $f(3) = -5$, and $f(0) = 9 - 5 = 4$, matching the graph's $y$-intercept. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): the sign in $(x - h)$ is misread, making $h = -3$.\n* Choice B ($-5$): this is $k$, the minimum value, reported without adding $h$.\n* Choice D ($8$): subtracting instead of adding gives $3 - (-5)$.\n\n**Test Day Takeaway:** In $(x - h)^2 + k$ the vertex is $(h, k)$ with the sign of $h$ already flipped; read both coordinates before combining them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-165",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "easy",
    type: "fill-in",
    question: "The function $V$ defined by $V(t)=-2(t-6)^2+96$ gives the volume, in liters, of water held in a greywater recycling tank $t$ hours after a rinse cycle begins, for $0\\le t\\le 12$. What is the greatest volume, in liters, the tank holds?",
    correctAnswer: "96",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**The correct answer is $96$.**\n\n**The Fast Way (~10s):** The squared term is subtracted, so $V$ is largest when $(t-6)^2=0$, leaving $V=96$.\n\n**The Full Solution:**\nStep 1: The expression is in vertex form with $a=-2$, $h=6$, and $k=96$.\nStep 2: Since $-2(t-6)^2$ is never positive, $V(t)$ is largest when that term is $0$, which happens at $t=6$.\nStep 3: Then $V(6)=96$ liters. Check: $V(5)=-2+96=94$ and $V(7)=94$, both below $96$ ✓\n\n**Common Mistakes:**\n* $6$: reports the time at which the greatest volume occurs, not the volume.\n* $94$: subtracts the coefficient $2$ from $96$.\n* $98$: adds $2$ to $96$ instead of recognizing that the squared term contributes nothing at the vertex.\n\n**Test Day Takeaway:** Vertex form hands you the extreme value directly: it is $k$, and the sign of $a$ says whether it is a maximum or a minimum.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-166",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A utility charts natural gas meter readings above a building's baseline with the quadratic function $f$ graphed in the $xy$-plane. If $f(x)=-\\frac{1}{2}x^2+bx+c$, where $b$ and $c$ are constants, what is the value of $c$?",
    diagram: { type: "quadraticVertex", params: { vertex: [-1, 8], a: -0.5, showVertex: true } },
    choices: [
      // distractor: reports the x-coordinate of the vertex
      { id: "A", text: "$-1$" },
      { id: "B", text: "$7.5$" },
      // distractor: reports the maximum value as c
      { id: "C", text: "$8$" },
      // distractor: adds 0.5 to 8 instead of subtracting it
      { id: "D", text: "$8.5$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The vertex is $(-1,8)$, so $f(x)=-\\frac{1}{2}(x+1)^2+8$; the constant term is $f(0)=-\\frac{1}{2}+8=7.5$.\n\n**The Full Solution:**\nStep 1: Read the highest point of the graph: $(-1,8)$, so $f(x)=-\\frac{1}{2}(x+1)^2+8$.\nStep 2: In $-\\frac{1}{2}x^2+bx+c$ the constant $c$ equals $f(0)$.\nStep 3: Compute $f(0)=-\\frac{1}{2}(0+1)^2+8=-\\frac{1}{2}+8=7.5$. Check: expanding gives $-\\frac{1}{2}x^2-x+7.5$, whose constant term is $7.5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1$): reports the vertex's $x$-coordinate instead of the constant term.\n* Choice C ($8$): reports the maximum value, which is $f(-1)$, not $f(0)$.\n* Choice D ($8.5$): adds $\\frac{1}{2}$ to $8$ instead of subtracting it.\n\n**Test Day Takeaway:** Convert a graphed vertex into vertex form, then evaluate at $x=0$ — that single substitution is the constant term.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-167",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "fill-in",
    question: "A reservoir's level above its winter minimum, in centimeters, during week $x$ is modeled by $f(x)=-4x^2+kx+5$, where $k$ is a positive constant. If the greatest level this model gives is $41$ centimeters, what is the value of $k$?",
    correctAnswer: "24",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**The correct answer is $24$.**\n\n**The Fast Way (~35s):** The maximum of $-4x^2+kx+5$ is $5-\\frac{k^2}{4(-4)}=5+\\frac{k^2}{16}$; setting it to $41$ gives $k^2=576$ and $k=24$.\n\n**The Full Solution:**\nStep 1: The maximum occurs at $x=-\\frac{k}{2(-4)}=\\frac{k}{8}$.\nStep 2: Substitute: $f\\left(\\frac{k}{8}\\right)=-4\\cdot\\frac{k^2}{64}+\\frac{k^2}{8}+5=\\frac{k^2}{16}+5$. Setting that equal to $41$ gives $\\frac{k^2}{16}=36$, so $k^2=576$.\nStep 3: Since $k$ is positive, $k=24$. Check: $f(x)=-4x^2+24x+5$ peaks at $x=3$, where $f(3)=-36+72+5=41$ ✓\n\n**Common Mistakes:**\n* $-24$: takes the negative square root, ignoring that $k$ is positive.\n* $3$: reports the week at which the maximum occurs rather than $k$.\n* $36$: reports $\\frac{k^2}{16}=36$ without solving for $k$.\n\n**Test Day Takeaway:** When the unknown sits in the linear coefficient, express the maximum as $c-\\frac{b^2}{4a}$ and solve that equation.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-168",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A geothermal well's flow above its permitted minimum is modeled by the quadratic function $f$ whose graph is shown. A revised schedule delays the flow by two weeks, giving $h(x)=f(x-2)$. What is the maximum value of $h$?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, 8], a: -0.5, showVertex: true } },
    choices: [
      // distractor: reports the shifted axis of symmetry 3 + 2 = 5 instead of a maximum value
      { id: "A", text: "$5$" },
      // distractor: subtracts 2 from the maximum, treating the shift as vertical
      { id: "B", text: "$6$" },
      { id: "C", text: "$8$" },
      // distractor: adds 2 to the maximum, treating the shift as vertical
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Replacing $x$ by $x-2$ slides the graph right without moving it up or down, so the maximum value stays $8$.\n\n**The Full Solution:**\nStep 1: The graph of $f$ peaks at $(3,8)$, so the maximum value of $f$ is $8$.\nStep 2: The rule $h(x)=f(x-2)$ shifts every point $2$ units to the right; heights are unchanged.\nStep 3: So $h$ peaks at $(5,8)$ and its maximum value is $8$. Check: $f(x)=-\\frac{1}{2}(x-3)^2+8$ gives $h(x)=-\\frac{1}{2}(x-5)^2+8$, whose greatest value is $8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): reports the shifted axis of symmetry rather than the maximum value.\n* Choice B ($6$): subtracts $2$ from the maximum, treating a horizontal shift as vertical.\n* Choice D ($10$): adds $2$ to the maximum, making the same mistake in the other direction.\n\n**Test Day Takeaway:** A change inside the function moves the graph sideways; only a change outside it moves the extreme value.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-169",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "fill-in",
    question: "A retrofit program models streetlight fixture wattage saved by $f(x)=-2(x-c)^2+40$, where $c$ is a positive constant and $x$ is the fixture number. If $f(0)=8$, what is the value of $c$?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~25s):** $f(0)=-2c^2+40=8$ gives $c^2=16$, and $c$ is positive, so $c=4$.\n\n**The Full Solution:**\nStep 1: Substitute $x=0$: $-2(0-c)^2+40=8$, so $-2c^2+40=8$.\nStep 2: Rearrange: $2c^2=32$, so $c^2=16$ and $c=\\pm4$.\nStep 3: The constant is positive, so $c=4$. Check: $f(x)=-2(x-4)^2+40$ gives $f(0)=-32+40=8$ ✓\n\n**Common Mistakes:**\n* $-4$: keeps the negative square root even though $c$ is stated to be positive.\n* $16$: reports $c^2$ instead of $c$.\n* $32$: reports $40-8=32$ without dividing by $2$ or taking a square root.\n\n**Test Day Takeaway:** Substituting one point into vertex form leaves a squared unknown — solve it, then apply the stated sign restriction.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-170",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A city models water main pressure above its overnight floor by $f(x)=ax^2+12x+7$, where $a$ is a negative constant and $x$ is the hour after midnight. The greatest value of $f$ is $25$. What is the value of $a$?",
    choices: [
      // distractor: uses 2a instead of 4a in c - b^2/(4a)
      { id: "A", text: "$-4$" },
      { id: "B", text: "$-2$" },
      // distractor: inverts the final division, computing -18/36
      { id: "C", text: "$-0.5$" },
      // distractor: drops the negative sign required by a < 0
      { id: "D", text: "$2$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The greatest value is $7-\\frac{12^2}{4a}=25$, so $-\\frac{36}{a}=18$ and $a=-2$.\n\n**The Full Solution:**\nStep 1: For $ax^2+bx+c$ with $a<0$, the greatest value is $c-\\frac{b^2}{4a}=7-\\frac{144}{4a}=7-\\frac{36}{a}$.\nStep 2: Set that equal to $25$: $-\\frac{36}{a}=18$.\nStep 3: So $a=-\\frac{36}{18}=-2$. Check: $f(x)=-2x^2+12x+7$ peaks at $x=3$, where $f(3)=-18+36+7=25$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): uses $2a$ in place of $4a$ in $c-\\frac{b^2}{4a}$.\n* Choice C ($-0.5$): inverts the last division, computing $\\frac{-18}{36}$.\n* Choice D ($2$): finds the magnitude but drops the negative sign the condition $a<0$ requires.\n\n**Test Day Takeaway:** The extreme value of $ax^2+bx+c$ is $c-\\frac{b^2}{4a}$ — keep the $4$ and keep the sign of $a$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-171",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "hard",
    type: "fill-in",
    question: "A biogas digester's daily methane yield, in cubic meters, is modeled by $M(t)=-\\frac{1}{2}t^2+14t+60$, where $t$ is the number of days after startup. By how many cubic meters does the greatest daily yield exceed the yield on the startup day?",
    correctAnswer: "98",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**The correct answer is $98$.**\n\n**The Fast Way (~40s):** The peak is at $t=-\\frac{14}{2(-1/2)}=14$, where $M=158$; the startup yield is $M(0)=60$, so the excess is $98$.\n\n**The Full Solution:**\nStep 1: The maximum occurs at $t=-\\frac{b}{2a}=-\\frac{14}{2(-\\frac{1}{2})}=14$ days.\nStep 2: Evaluate there: $M(14)=-\\frac{1}{2}(196)+14(14)+60=-98+196+60=158$.\nStep 3: The startup yield is $M(0)=60$, so the excess is $158-60=98$ cubic meters. Check: $M(13)=-84.5+182+60=157.5$ and $M(15)=157.5$, both below $158$ ✓\n\n**Common Mistakes:**\n* $158$: reports the greatest daily yield itself instead of how much it exceeds the startup yield.\n* $14$: reports the day on which the greatest yield occurs.\n* $60$: reports the startup yield rather than the difference.\n\n**Test Day Takeaway:** Two-part questions end with a subtraction — compute the vertex value, then answer the comparison actually asked.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 9/2: function-composition (8 items) =====
  // 6 test occurrences. Title verbatim: 'Function Composition'.
  {
    id: "bank-am-172",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "For the two functions tabulated below, $g$ assigns a code to each raw field observation and $f$ assigns a rating to each code, so an observation is converted in two stages. Using the table, what is the value of $f(g(2))$?",
    diagram: { type: "dataTable", params: { headers: ["x", "f(x)", "g(x)"], rows: [["1", "5", "3"], ["2", "8", "1"], ["3", "2", "4"], ["4", "7", "2"]] } },
    choices: [
      // distractor: stops at the inner value $g(2) = 1$ without applying $f$
      { id: "A", text: "$1$" },
      { id: "B", text: "$5$" },
      // distractor: reports $f(4)$, using the input whose $g$-value is $2$ instead of $g(2)$
      { id: "C", text: "$7$" },
      // distractor: reports $f(2)$, applying $f$ to the original input and skipping $g$ entirely
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The table gives $g(2) = 1$, and then $f(1) = 5$.\n\n**The Full Solution:**\nStep 1: Work from the inside out, so evaluate $g$ first.\nStep 2: In the row $x = 2$, the $g$ column reads $1$, so $g(2) = 1$.\nStep 3: Now read $f$ at that output: in the row $x = 1$, the $f$ column reads $5$, so $f(g(2)) = 5$. Check: the two lookups use different rows, $x = 2$ then $x = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): that is $g(2)$, the halfway result, not the final rating.\n* Choice C ($7$): reverses the lookup, searching the $g$ column for the value $2$ instead of using $x = 2$.\n* Choice D ($8$): reads $f$ in the row $x = 2$, which ignores the inner function.\n\n**Test Day Takeaway:** Evaluate the inner function first and carry its OUTPUT into the next lookup — the second row you use is almost never the first.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-173",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "easy",
    type: "fill-in",
    question: "A judging rule converts a raw score by applying $h(x) = x^2 - 1$ first and then applying $f(x) = 3x + 2$ to the result of that first step. When the raw score is $3$, what number does the rule report?",
    correctAnswer: "26",
    explanation: "**SAT Pattern: Function Composition**\n\n**The correct answer is $26$.**\n\n**The Fast Way (~15s):** $h(3) = 8$, and then $f(8) = 3(8) + 2 = 26$.\n\n**The Full Solution:**\nStep 1: Apply $h$ to the input: $h(3) = 3^2 - 1 = 8$.\nStep 2: Feed that output into $f$: $f(8) = 3(8) + 2$.\nStep 3: That equals $24 + 2 = 26$. Check: reversing the order would give $h(f(3)) = h(11) = 120$, a different number, so the order matters ✓\n\n**Common Mistakes:**\n* $11$ — computing $f(3)$ and stopping, which applies only the outer rule.\n* $120$ — applying the two rules in the reverse order, $h(f(3))$.\n\n**Test Day Takeaway:** The function named first in \"apply $h$ first\" is the INNER one; composition is not commutative, so the order is the whole question.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-174",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the table below, the functions $p$ and $q$ are each defined at the four inputs $0$, $1$, $2$, and $3$, and no other values of either function are known. Using only the tabulated values, compute $q(p(3)) + p(q(2))$.",
    diagram: { type: "dataTable", params: { headers: ["x", "p(x)", "q(x)"], rows: [["0", "3", "6"], ["1", "0", "2"], ["2", "5", "0"], ["3", "1", "5"]] } },
    choices: [
      // distractor: reports only the first term, $q(p(3)) = 2$
      { id: "A", text: "$2$" },
      // distractor: reports only the second term, $p(q(2)) = 3$
      { id: "B", text: "$3$" },
      { id: "C", text: "$5$" },
      // distractor: computes $q(3) + p(2) = 5 + 5$, applying each outer function to the original input
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** $p(3) = 1$ so $q(1) = 2$; $q(2) = 0$ so $p(0) = 3$; the sum is $2 + 3 = 5$.\n\n**The Full Solution:**\nStep 1: For the first term, read $p(3) = 1$ from the row $x = 3$, then read $q(1) = 2$ from the row $x = 1$.\nStep 2: For the second term, read $q(2) = 0$ from the row $x = 2$, then read $p(0) = 3$ from the row $x = 0$.\nStep 3: Add the two results: $2 + 3 = 5$. Check: each term used two different rows, and neither used the row of the original input twice ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): the first composite alone, with the second term dropped.\n* Choice B ($3$): the second composite alone.\n* Choice D ($10$): skips the inner functions and adds $q(3)$ and $p(2)$ directly.\n\n**Test Day Takeaway:** In a sum of composites, finish one composite completely before starting the other — mixing the two is what produces the too-large answer.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-175",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "fill-in",
    question: "A two-stage conversion first adds a constant $k$ to its input, using $g(x) = x + k$, and then applies $f(x) = 4x - 7$ to that result. The conversion turns an input of $3$ into an output of $21$. What is the value of $k$?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Function Composition**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~25s):** $f(g(3)) = 4(3 + k) - 7 = 21$, so $4(3 + k) = 28$, $3 + k = 7$, and $k = 4$.\n\n**The Full Solution:**\nStep 1: The inner value is $g(3) = 3 + k$.\nStep 2: Applying $f$ gives $4(3 + k) - 7 = 21$, so $4(3 + k) = 28$.\nStep 3: Dividing by $4$ gives $3 + k = 7$, so $k = 4$. Check: $g(3) = 7$ and $f(7) = 28 - 7 = 21$ ✓\n\n**Common Mistakes:**\n* $18$ — setting $3 + k = 21$, which applies only $g$ and never undoes $f$.\n* $0.5$ — subtracting the $7$ instead of adding it, which gives $4(3 + k) = 14$.\n\n**Test Day Takeaway:** Undo the OUTER function first — add back its constant, then divide — before touching the inner expression.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-176",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the figure, the parabola $y = f(x)$ carries marks at its vertex and at both of its $x$-intercepts, and no other point on the graph is labeled. Taking $g(x) = 2x - 6$ for every real $x$, what is the value of $f(g(5))$?",
    diagram: { type: "quadraticVertex", params: { vertex: [1, -4], a: 1, showPoints: [[-1, 0], [3, 0]], showVertex: true } },
    choices: [
      // distractor: reports the minimum value of $f$, read off the marked vertex, instead of $f(4)$
      { id: "A", text: "$-4$" },
      // distractor: reports the $x$-coordinate of the vertex rather than a value of $f$
      { id: "B", text: "$1$" },
      // distractor: stops at the inner value $g(5) = 4$ without applying $f$
      { id: "C", text: "$4$" },
      { id: "D", text: "$5$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** $g(5) = 4$, and the graph gives $f(x) = (x - 1)^2 - 4$, so $f(4) = 9 - 4 = 5$.\n\n**The Full Solution:**\nStep 1: Evaluate the inner function: $g(5) = 2(5) - 6 = 4$.\nStep 2: The marked vertex is $(1, -4)$ and the marked intercepts are $(-1, 0)$ and $(3, 0)$, which fit $f(x) = (x - 1)^2 - 4$.\nStep 3: Then $f(4) = (4 - 1)^2 - 4 = 9 - 4 = 5$. Check: the intercepts confirm the rule, since $f(3) = 4 - 4 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): the lowest value the graph reaches, which is $f(1)$, not $f(4)$.\n* Choice B ($1$): the input at which the minimum occurs, a coordinate of the wrong axis.\n* Choice C ($4$): the output of $g$, the halfway result.\n\n**Test Day Takeaway:** Read a parabola's rule from its marked vertex and one other marked point, then substitute the inner function's output — not the original input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-177",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "fill-in",
    question: "A treatment plant's dosing line adds chlorine according to $c(V)=0.4V+15$, where $c(V)$ is the mass, in milligrams, added to $V$ liters of water, and the volume treated after $t$ minutes is $V(t)=25t$. What is the value of $c(V(6))$?",
    correctAnswer: "75",
    explanation: "**SAT Pattern: Function Composition**\n\n**The correct answer is $75$.**\n\n**The Fast Way (~20s):** Work from the inside out: $V(6)=150$ liters, and $0.4(150)+15=75$ milligrams.\n\n**The Full Solution:**\nStep 1: The inner function gives the volume treated in six minutes: $V(6)=25(6)=150$ liters.\nStep 2: That volume is the input of $c$, so $c(150)=0.4(150)+15$.\nStep 3: $0.4(150)=60$, so $c(150)=60+15=75$ milligrams. Check: 60 milligrams for the volume plus the fixed 15 milligrams is 75 ✓\n\n**Common Mistakes:** Substituting $t=6$ directly into $c$ gives $0.4(6)+15=17.4$, the mass for 6 liters rather than for 6 minutes. Composing in the opposite order gives $V(c(6))=25(17.4)=435$. Dropping the constant term gives only $0.4(150)=60$.\n\n**Test Day Takeaway:** In a composition the inner function's output is the outer function's input, so evaluate the inside first and carry its units forward.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-178",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A quality lab applies two correction routines, $u$ and $w$, to the inputs $1$ through $5$, and the table lists the output each routine returns for each input. For how many of these five inputs $n$ is $u(w(n))$ equal to $w(u(n))$?",
    diagram: { type: "dataTable", params: { headers: ["n", "u(n)", "w(n)"], rows: [["1", "4", "4"], ["2", "2", "3"], ["3", "1", "3"], ["4", "4", "2"], ["5", "3", "5"]] } },
    choices: [
      // distractor: counts the inputs where u(w(n)) returns to n itself (none), a different condition
      { id: "A", text: "$0$" },
      // distractor: counts the inputs where u(n) and w(n) are equal (only n = 1)
      { id: "B", text: "$1$" },
      { id: "C", text: "$2$" },
      // distractor: compares u(w(n)) with u(n) instead of with w(u(n)), which matches for three inputs
      { id: "D", text: "$3$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Build both columns from the table: $u(w(n))$ gives $4, 1, 1, 2, 3$ and $w(u(n))$ gives $2, 3, 4, 2, 3$. They agree at $n=4$ and $n=5$ only.\n\n**The Full Solution:**\nStep 1: For each input, read $w(n)$ first, then feed it to $u$: $u(w(1))=u(4)=4$, $u(w(2))=u(3)=1$, $u(w(3))=u(3)=1$, $u(w(4))=u(2)=2$, $u(w(5))=u(5)=3$.\nStep 2: Reverse the order: $w(u(1))=w(4)=2$, $w(u(2))=w(2)=3$, $w(u(3))=w(1)=4$, $w(u(4))=w(4)=2$, $w(u(5))=w(3)=3$.\nStep 3: Compare the two lists entry by entry: they match only at $n=4$ ($2=2$) and $n=5$ ($3=3$), so the count is $2$. Check: at $n=1$ the values are $4$ and $2$, so composition order does matter here ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): counts the inputs with $u(w(n))=n$; no input satisfies that, but it is not the condition asked for.\n* Choice B ($1$): counts the inputs where $u(n)$ and $w(n)$ themselves are equal, which happens only at $n=1$.\n* Choice D ($3$): compares $u(w(n))$ with $u(n)$ instead of with $w(u(n))$; those agree at $n=1$, $3$, and $5$.\n\n**Test Day Takeaway:** Composition is not commutative — build both columns from the table before comparing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-179",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "hard",
    type: "fill-in",
    question: "A film-scanner control applies $j(x)=x^{2}-k$ to a gate setting and then applies $h(x)=2x+k$ to that result, where $k$ is a constant. A gate setting of $4$ produces a final output of $25$. What is the value of $k$?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Function Composition**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~25s):** $h(j(4))=2(16-k)+k=32-k$, so $32-k=25$ and $k=7$.\n\n**The Full Solution:**\nStep 1: The inner step gives $j(4)=4^{2}-k=16-k$.\nStep 2: The outer step doubles that and adds $k$: $h(16-k)=2(16-k)+k=32-2k+k=32-k$.\nStep 3: Setting $32-k=25$ gives $k=7$. Check: $j(4)=16-7=9$ and $h(9)=2(9)+7=25$ ✓\n\n**Common Mistakes:** Reversing the order produces $j(h(4))=(8+k)^{2}-k$, an equation with no integer solution. Dropping the $+k$ from the outer step gives $32-2k=25$ and the non-integer value $3.5$. Squaring after subtracting gives $(4-k)^{2}$ instead of $4^{2}-k$.\n\n**Test Day Takeaway:** When the same constant appears in both functions, simplify the whole composition symbolically before setting it equal to the given output.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 13/5: exponential-growth-model (8 items) =====
  {
    id: "bank-am-180",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A culture of protozoa triples in number every $4$ hours, and the table lists the number of protozoa at three times after the culture was started. How many protozoa are in the culture $16$ hours after it was started?",
    diagram: { type: "dataTable", params: { headers: ["Hours after start", "Number of protozoa"], rows: [["0", "20"], ["4", "60"], ["8", "180"]] } },
    choices: [
      // distractor: multiplies the starting count by the number of periods, $20 \times 4$, instead of applying the growth factor
      { id: "A", text: "$80$" },
      // distractor: uses three tripling periods instead of four, which lands at $12$ hours
      { id: "B", text: "$540$" },
      { id: "C", text: "$1{,}620$" },
      // distractor: uses five tripling periods, which lands at $20$ hours
      { id: "D", text: "$4{,}860$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** In $16$ hours there are $16 \\div 4 = 4$ tripling periods, so the count is $20 \\times 3^4 = 1{,}620$.\n\n**The Full Solution:**\nStep 1: The table shows $20$ protozoa at the start, $60$ after $4$ hours, and $180$ after $8$ hours, confirming a growth factor of $3$ per $4$-hour period.\nStep 2: The number after $t$ hours is $20 \\cdot 3^{t/4}$. At $t = 16$ that exponent is $\\dfrac{16}{4} = 4$.\nStep 3: So the count is $20 \\cdot 3^4 = 20 \\cdot 81 = 1{,}620$. Check by extending the table: $180$ at $8$ hours, $540$ at $12$ hours, $1{,}620$ at $16$ hours. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($80$): multiplying $20$ by the number of periods treats the growth as linear.\n* Choice B ($540$): three triplings reach only $12$ hours.\n* Choice D ($4{,}860$): five triplings overshoot to $20$ hours.\n\n**Test Day Takeaway:** Count how many whole growth periods fit in the elapsed time, then raise the growth factor to that count; never multiply by the count itself.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-am-181",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "fill-in",
    question: "A digital archive currently holds $6$ terabytes of data, and the amount of data it holds triples each year. The function $A$ gives the amount of data, in terabytes, the archive holds $d$ years from now. What is the value of $A(3)$?",
    correctAnswer: "162",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $162$.**\n\n**The Fast Way (~15s):** Tripling three times multiplies the starting amount by $3^3 = 27$, and $6 \\cdot 27 = 162$.\n\n**The Full Solution:**\nStep 1: \"Triples each year\" means the growth factor is $3$ per year, so $A(d) = 6 \\cdot 3^d$.\nStep 2: Substituting $d = 3$ gives $A(3) = 6 \\cdot 3^3 = 6 \\cdot 27$.\nStep 3: $6 \\cdot 27 = 162$ terabytes. Check year by year: $6 \\to 18 \\to 54 \\to 162$. $\\checkmark$\n\n**Common Mistakes:** Tripling only once and answering $18$, or stopping a year early at $54$. Adding $3$ terabytes each year gives $6 + 3(3) = 15$, which models constant growth instead of tripling.\n\n**Test Day Takeaway:** A phrase like \"triples each year\" names a growth FACTOR, so the number belongs in the base of an exponent, never as a term added each year.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-182",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In $2015$, a coastal ferry carried $4{,}800$ riders each week. The weekly ridership decreased by $6\\%$ each year after $2015$. Which function $R$ models the weekly ridership $t$ years after $2015$?",
    choices: [
      // distractor: uses the rate itself as the multiplier (a 94% drop per year)
      { id: "A", text: "$R(t) = 4{,}800(0.06)^t$" },
      { id: "B", text: "$R(t) = 4{,}800(0.94)^t$" },
      // distractor: grows by 6% instead of decreasing
      { id: "C", text: "$R(t) = 4{,}800(1.06)^t$" },
      // distractor: subtracts 6% of the ORIGINAL ridership each year (linear decrease)
      { id: "D", text: "$R(t) = 4{,}800 - 288t$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** A $6\\%$ decrease leaves $94\\%$, so the yearly multiplier is $0.94$ and the model is $4{,}800(0.94)^t$.\n\n**The Full Solution:**\nStep 1: An exponential model has the form $R(t) = R_0 b^t$, where $R_0$ is the value at $t = 0$. Here $R_0 = 4{,}800$.\nStep 2: Decreasing by $6\\%$ multiplies the previous year's ridership by $1 - 0.06 = 0.94$, so $b = 0.94$.\nStep 3: $R(t) = 4{,}800(0.94)^t$. Check at $t = 1$: $4{,}800(0.94) = 4{,}512$, which is $4{,}800 - 288$, a $6\\%$ drop. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4{,}800(0.06)^t$): puts the rate in the base instead of $1 - $ the rate; after one year it predicts $288$ riders, a $94\\%$ collapse.\n* Choice C ($4{,}800(1.06)^t$): the multiplier for a $6\\%$ INCREASE; the stem says the ridership decreased.\n* Choice D ($4{,}800 - 288t$): subtracts $6\\%$ of the original $4{,}800$ every year, which is constant (linear) loss, not a constant percent loss.\n\n**Test Day Takeaway:** For a constant percent change, the base is $1 + r$ for growth and $1 - r$ for decay — the rate alone is never the base.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-183",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "fill-in",
    question: "A collector bought a coin for $\\$3{,}000$. The value of the coin increases by $10\\%$ each year after the purchase. What is the value of the coin, in dollars, $2$ years after the purchase?",
    correctAnswer: "3630",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $3630$.**\n\n**The Fast Way (~20s):** Two $10\\%$ increases multiply by $(1.1)^2 = 1.21$, and $3{,}000(1.21) = 3{,}630$.\n\n**The Full Solution:**\nStep 1: A $10\\%$ increase multiplies the value by $1.1$, so $V(t) = 3{,}000(1.1)^t$ dollars after $t$ years.\nStep 2: Substituting $t = 2$ gives $V(2) = 3{,}000(1.1)^2 = 3{,}000(1.21)$.\nStep 3: $3{,}000(1.21) = 3{,}630$. Check one year at a time: $3{,}000 \\to 3{,}300 \\to 3{,}630$. $\\checkmark$\n\n**Common Mistakes:** Adding $10\\%$ of the ORIGINAL price twice gives $3{,}000 + 300 + 300 = 3{,}600$; it misses the $\\$30$ earned on the first year's $\\$300$ increase. Applying the increase only once gives $3{,}300$.\n\n**Test Day Takeaway:** Percent growth compounds — the second year's increase is computed on the NEW value, so multiply by $1.1$ twice rather than adding the same dollar amount twice.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-184",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "For the exponential function $g$, the table lists the value of $g(x)$ at three values of $x$. Which equation defines $g$?",
    diagram: { type: "dataTable", params: { headers: ["x", "g(x)"], rows: [["1", "12"], ["2", "48"], ["3", "192"]] } },
    choices: [
      // distractor: uses the first listed output as the growth factor
      { id: "A", text: "$g(x) = 3(12)^x$" },
      { id: "B", text: "$g(x) = 3(4)^x$" },
      // distractor: swaps the roles of the growth factor and the first listed output
      { id: "C", text: "$g(x) = 4(12)^x$" },
      // distractor: treats $g(1) = 12$ as the value at $x = 0$
      { id: "D", text: "$g(x) = 12(4)^x$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Each step in $x$ multiplies $g$ by $48 \\div 12 = 4$, so $b = 4$; backing up from $g(1) = 12$ gives $g(0) = 3$, and $g(x) = 3(4)^x$.\n\n**The Full Solution:**\nStep 1: For $g(x) = ab^x$, the ratio of consecutive outputs is the growth factor: $\\dfrac{48}{12} = 4$ and $\\dfrac{192}{48} = 4$, so $b = 4$.\nStep 2: The value $a$ is $g(0)$, one step BELOW the first row, so $a = 12 \\div 4 = 3$.\nStep 3: $g(x) = 3(4)^x$. Check every row: $g(1) = 12$, $g(2) = 48$, $g(3) = 192$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3(12)^x$): takes $12$, the first output, as the growth factor; it gives $g(1) = 36$.\n* Choice C ($4(12)^x$): reverses the two constants, using the growth factor $4$ as the initial value and the first output $12$ as the base; it gives $g(1) = 48$, which is the $x = 2$ value, not the $x = 1$ value.\n* Choice D ($12(4)^x$): uses $g(1) = 12$ as the initial value $a$; every output is then four times too large.\n\n**Test Day Takeaway:** In $ab^x$, $a$ is the output at $x = 0$. When the table starts at $x = 1$, divide by the growth factor once to step back to $a$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-185",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "fill-in",
    question: "A machine shop pays $\\$8{,}000$ this year for its equipment insurance. The premium is projected to rise by $5\\%$ each year. What will the premium be, in dollars, $3$ years from now?",
    correctAnswer: "9261",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $9261$.**\n\n**The Fast Way (~25s):** Three $5\\%$ increases multiply by $(1.05)^3$, and $8{,}000(1.05)^3 = 9{,}261$.\n\n**The Full Solution:**\nStep 1: A $5\\%$ increase multiplies the premium by $1.05$, so $P(t) = 8{,}000(1.05)^t$ dollars $t$ years from now.\nStep 2: Substituting $t = 3$ gives $P(3) = 8{,}000(1.05)^3$.\nStep 3: Year by year: $8{,}000 \\to 8{,}400 \\to 8{,}820 \\to 9{,}261$. $\\checkmark$\n\n**Common Mistakes:** Adding $5\\%$ of the current $\\$8{,}000$ three times gives $8{,}000 + 3(400) = 9{,}200$, which ignores the compounding. Stopping after two increases gives $8{,}820$.\n\n**Test Day Takeaway:** Repeated percent change is repeated MULTIPLICATION; count the number of increases carefully and raise the multiplier to that power.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-186",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The function $f$ is defined by $f(x) = ab^x$, where $a$ and $b$ are positive constants. The table gives the value of $f$ at two values of $x$. What is the value of $f(2)$?",
    diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["0", "5"], ["3", "320"]] } },
    choices: [
      // distractor: evaluates $f(1)$ instead of $f(2)$
      { id: "A", text: "$20$" },
      { id: "B", text: "$80$" },
      // distractor: treats the change from $5$ to $320$ as constant addition
      { id: "C", text: "$215$" },
      // distractor: evaluates $f(4)$, multiplying by $b$ twice too often
      { id: "D", text: "$1{,}280$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $f(0) = a = 5$, so $5b^3 = 320$ gives $b^3 = 64$ and $b = 4$; then $f(2) = 5(4)^2 = 80$.\n\n**The Full Solution:**\nStep 1: Substituting $x = 0$ gives $f(0) = ab^0 = a$, and the table gives $f(0) = 5$, so $a = 5$.\nStep 2: Substituting $x = 3$ gives $5b^3 = 320$, so $b^3 = 64$ and $b = 4$ (the positive cube root).\nStep 3: $f(2) = 5(4)^2 = 5(16) = 80$. Check the chain: $5 \\to 20 \\to 80 \\to 320$, four times at each step. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): this is $f(1) = 5(4)$, one factor short.\n* Choice C ($215$): treats the model as linear — the total increase is $315$ over $3$ units, so $5 + 2(105) = 215$. But $f$ multiplies, it does not add.\n* Choice D ($1{,}280$): this is $f(4) = 5(4)^4$, one factor past the requested input.\n\n**Test Day Takeaway:** Two points determine $ab^x$: read $a$ off the $x = 0$ row, then take the appropriate root of the ratio to get $b$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-am-187",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "hard",
    type: "fill-in",
    question: "The biomass of an algae culture, in milligrams, is modeled by $M(d) = 6 \\cdot 2^{d/3}$, where $d$ is the number of days since the culture was started. Over how many days does the biomass increase from $24$ milligrams to $384$ milligrams?",
    correctAnswer: "12",
    explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~35s):** $384 \\div 24 = 16 = 2^4$, so four doublings are needed, and each doubling takes $3$ days: $4(3) = 12$ days.\n\n**The Full Solution:**\nStep 1: Solve $6 \\cdot 2^{d/3} = 24$. Dividing by $6$ gives $2^{d/3} = 4 = 2^2$, so $\\dfrac{d}{3} = 2$ and $d = 6$.\nStep 2: Solve $6 \\cdot 2^{d/3} = 384$. Dividing by $6$ gives $2^{d/3} = 64 = 2^6$, so $\\dfrac{d}{3} = 6$ and $d = 18$.\nStep 3: The elapsed time is $18 - 6 = 12$ days. Check: $24 \\to 48 \\to 96 \\to 192 \\to 384$ is four doublings at $3$ days each. $\\checkmark$\n\n**Common Mistakes:** Answering $18$, the day the biomass REACHES $384$ mg, instead of the time since it was $24$ mg. Answering $4$, the number of doublings, without multiplying by the $3$-day doubling period.\n\n**Test Day Takeaway:** When an exponent is $\\frac{d}{k}$, the quantity multiplies by the base once every $k$ units — count the multiplications first, then scale by $k$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // ─── VIETA'S SUM/PRODUCT OF ROOTS (bank-am-188..195) ──────────────────────
  // Granularity principle (2026-05-12): Vieta's (sum=-b/a, product=c/a) is a
  // DISTINCT method from factoring. Items pin direct-Vieta's approach.
  {
    id: "bank-am-188",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A branch library's audiobook checkouts return to their January level in the two months given by the solutions of $2x^2-26x+72=0$. What is the sum of those two solutions?",
    choices: [
      // distractor: uses b/a instead of -b/a, giving -13
      { id: "A", text: "$-13$" },
      { id: "B", text: "$13$" },
      // distractor: uses -b and never divides by a = 2, giving 26
      { id: "C", text: "$26$" },
      // distractor: reports the product c/a = 36 instead of the sum
      { id: "D", text: "$36$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** For $ax^2+bx+c=0$ the solutions add to $-\\frac{b}{a}=-\\frac{-26}{2}=13$.\n\n**The Full Solution:**\nStep 1: Identify $a=2$, $b=-26$, $c=72$.\nStep 2: The sum of the solutions is $-\\frac{b}{a}=-\\frac{-26}{2}$.\nStep 3: Simplify to $13$. Check: the equation factors as $2(x-4)(x-9)=0$, and $4+9=13$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-13$): uses $\\frac{b}{a}$ instead of $-\\frac{b}{a}$, producing $-13$.\n* Choice C ($26$): uses $-b=26$ and forgets to divide by $a=2$.\n* Choice D ($36$): computes the product $\\frac{c}{a}=\\frac{72}{2}=36$ rather than the sum.\n\n**Test Day Takeaway:** Sum of solutions is $-\\frac{b}{a}$ and product is $\\frac{c}{a}$ — the leading coefficient divides both.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-189",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "easy",
    type: "fill-in",
    question: "For a summer reading program, the two week numbers with sign-ups equal to the yearly average are the solutions of $3x^2-21x+30=0$. What is the product of these two week numbers?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~10s):** The product of the solutions of $ax^2+bx+c=0$ is $\\frac{c}{a}=\\frac{30}{3}=10$.\n\n**The Full Solution:**\nStep 1: Read off $a=3$, $b=-21$, $c=30$.\nStep 2: The product of the solutions is $\\frac{c}{a}=\\frac{30}{3}$.\nStep 3: Simplify to $10$. Check: $3x^2-21x+30=3(x-2)(x-5)$, and $2\\cdot5=10$ ✓\n\n**Common Mistakes:**\n* $30$: uses $c$ alone and forgets to divide by $a=3$.\n* $7$: reports the sum $-\\frac{b}{a}=7$ instead of the product.\n* $-10$: attaches a negative sign that belongs only to the sum formula.\n\n**Test Day Takeaway:** Product is $\\frac{c}{a}$ with no sign change; only the sum carries the minus.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-190",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A microfilm scanner's cost per reel matches its budgeted rate at the two distinct settings that satisfy $7x^2+cx+63=0$, where $c$ is a nonzero constant. Which expression is equal to the sum of the two settings?",
    choices: [
      // distractor: inverts the ratio and drops the negative sign
      { id: "A", text: "$\\frac{7}{c}$" },
      // distractor: inverts -b/a into -a/b
      { id: "B", text: "$-\\frac{7}{c}$" },
      // distractor: uses b/a and drops the negative sign
      { id: "C", text: "$\\frac{c}{7}$" },
      { id: "D", text: "$-\\frac{c}{7}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** With $a=7$ and $b=c$, the two solutions add to $-\\frac{b}{a}=-\\frac{c}{7}$.\n\n**The Full Solution:**\nStep 1: Match $7x^2+cx+63=0$ to $ax^2+bx+c_0=0$, so $a=7$ and the linear coefficient is $c$.\nStep 2: The sum of the solutions is $-\\frac{\\text{linear coefficient}}{a}$.\nStep 3: Substitute to get $-\\frac{c}{7}$. Check: with $c=-70$ the equation is $7x^2-70x+63=0$, which factors as $7(x-1)(x-9)=0$; its solutions $1$ and $9$ add to $10=-\\frac{-70}{7}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{7}{c}$): inverts the ratio and also drops the negative sign.\n* Choice B ($-\\frac{7}{c}$): keeps the sign but inverts $-\\frac{b}{a}$ into $-\\frac{a}{b}$.\n* Choice C ($\\frac{c}{7}$): uses $\\frac{b}{a}$ and omits the negative sign.\n\n**Test Day Takeaway:** Vieta's sum works with letters exactly as with numbers: divide the linear coefficient by the leading one, then negate.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-191",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "fill-in",
    question: "The two week numbers at which study-room reservations reach capacity are the solutions of $x^2+(k-3)x+18=0$, where $k$ is a constant. If those two week numbers have a sum of $11$, what is the value of $k$?",
    correctAnswer: "-8",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**The correct answer is $-8$.**\n\n**The Fast Way (~20s):** The sum of the solutions is $-(k-3)$, so $-(k-3)=11$ gives $k-3=-11$ and $k=-8$.\n\n**The Full Solution:**\nStep 1: With $a=1$, the sum of the solutions is $-\\frac{b}{a}=-(k-3)$.\nStep 2: Set $-(k-3)=11$, so $k-3=-11$.\nStep 3: Add $3$ to both sides: $k=-8$. Check: $k=-8$ gives $x^2-11x+18=0$, whose solutions $2$ and $9$ add to $11$ ✓\n\n**Common Mistakes:**\n* $14$: sets $k-3=11$ and skips the negative sign in $-\\frac{b}{a}$.\n* $8$: solves correctly to $k=-8$ but reports the value without its negative sign.\n* $-11$: stops at $k-3=-11$ and reports that instead of $k$.\n\n**Test Day Takeaway:** Write the sum as $-\\frac{b}{a}$ first, then solve for the constant — the minus sign is where these items are won or lost.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-192",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An e-book platform's license renewals match the prior year's count in the two months $p$ and $q$, which are the solutions of $x^2-13x+30=0$. What is the value of $p^2+q^2$?",
    choices: [
      { id: "A", text: "$109$" },
      // distractor: subtracts pq = 30 once instead of 2pq = 60, giving 139
      { id: "B", text: "$139$" },
      // distractor: reports (p+q)^2 = 169 and never subtracts 2pq
      { id: "C", text: "$169$" },
      // distractor: adds 2pq instead of subtracting it, giving 229
      { id: "D", text: "$229$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** $p+q=13$ and $pq=30$, so $p^2+q^2=(p+q)^2-2pq=169-60=109$.\n\n**The Full Solution:**\nStep 1: By Vieta's, $p+q=-\\frac{-13}{1}=13$ and $pq=\\frac{30}{1}=30$.\nStep 2: Use the identity $p^2+q^2=(p+q)^2-2pq$.\nStep 3: Substitute: $13^2-2(30)=169-60=109$. Check: the solutions are $3$ and $10$, and $9+100=109$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($139$): subtracts $pq=30$ once instead of $2pq=60$.\n* Choice C ($169$): reports $(p+q)^2=169$ and never subtracts the $2pq$ term.\n* Choice D ($229$): adds $2pq=60$ to $169$ instead of subtracting it.\n\n**Test Day Takeaway:** Any symmetric expression in the two solutions can be rebuilt from their sum and product — no need to solve the quadratic.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-193",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "fill-in",
    question: "A periodicals budget balances in the two quarters $a$ and $b$ given by the solutions of $5x^2-40x+35=0$. What is the value of $\\frac{1}{a}+\\frac{1}{b}$?",
    correctAnswer: "8/7",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**The correct answer is $\\frac{8}{7}$.**\n\n**The Fast Way (~25s):** $\\frac{1}{a}+\\frac{1}{b}=\\frac{a+b}{ab}$, and Vieta's gives $a+b=8$ and $ab=7$, so the value is $\\frac{8}{7}$.\n\n**The Full Solution:**\nStep 1: From $5x^2-40x+35=0$, the sum is $-\\frac{-40}{5}=8$ and the product is $\\frac{35}{5}=7$.\nStep 2: Combine the reciprocals over a common denominator: $\\frac{1}{a}+\\frac{1}{b}=\\frac{a+b}{ab}$.\nStep 3: Substitute: $\\frac{8}{7}$. Check: the solutions are $1$ and $7$, and $\\frac{1}{1}+\\frac{1}{7}=\\frac{8}{7}$ ✓\n\n**Common Mistakes:**\n* $\\frac{7}{8}$: writes $\\frac{ab}{a+b}$, inverting the combined fraction.\n* $8$: reports the sum $a+b$ and never divides by the product.\n* $7$: reports the product $ab$ instead of the combined reciprocal.\n\n**Test Day Takeaway:** Rewrite a reciprocal sum as $\\frac{\\text{sum}}{\\text{product}}$ — both pieces come straight from the coefficients.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-194",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In a digitization lab's cost model $x^2+bx+48=0$, $b$ is a negative constant and one solution is three times the other. What is the value of $b$?",
    choices: [
      { id: "A", text: "$-16$" },
      // distractor: adds the solutions as 2r instead of 4r, giving -8
      { id: "B", text: "$-8$" },
      // distractor: makes the 2r slip and also drops the sign, giving 8
      { id: "C", text: "$8$" },
      // distractor: takes r = -4 and ignores that b must be negative, giving 16
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Let the solutions be $r$ and $3r$: their product $3r^2=48$ gives $r=\\pm4$, and their sum $4r=-b$; $b<0$ forces $r=4$, so $b=-16$.\n\n**The Full Solution:**\nStep 1: Name the solutions $r$ and $3r$. Their product is $\\frac{c}{a}=48$, so $3r^2=48$ and $r^2=16$, giving $r=4$ or $r=-4$.\nStep 2: Their sum is $r+3r=4r$, and Vieta's says that sum equals $-\\frac{b}{1}=-b$.\nStep 3: $b<0$ means $-b>0$, so $4r>0$ and $r=4$; then $-b=16$ and $b=-16$. Check: $x^2-16x+48=(x-4)(x-12)$, and $12=3\\cdot4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-8$): adds the solutions as $r+r=2r$ instead of $r+3r=4r$.\n* Choice C ($8$): makes that same $2r$ slip and then drops the negative sign.\n* Choice D ($16$): takes $r=-4$ and ignores the requirement that $b$ be negative.\n\n**Test Day Takeaway:** When one solution is a multiple of the other, name them $r$ and $mr$ — the product pins $r$ and the sum pins the coefficient.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-195",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "hard",
    type: "fill-in",
    question: "A library sets its overdue-notice fee schedule with the equation $4x^2-28x+c=0$, in which $c$ is a constant. The two solutions of this equation differ by $5$. What is the value of $c$?",
    correctAnswer: "24",
    explanation: "**SAT Pattern: Sum/Product of Roots — Vieta's**\n\n**The correct answer is $24$.**\n\n**The Fast Way (~35s):** The solutions add to $-\\frac{-28}{4}=7$ and differ by $5$, so they are $6$ and $1$; their product $6$ equals $\\frac{c}{4}$, giving $c=24$.\n\n**The Full Solution:**\nStep 1: Vieta's gives the sum $-\\frac{-28}{4}=7$, so the two solutions satisfy $x_1+x_2=7$ and $x_1-x_2=5$.\nStep 2: Adding the two equations gives $2x_1=12$, so $x_1=6$ and $x_2=1$.\nStep 3: The product is $\\frac{c}{4}$, so $6\\cdot1=\\frac{c}{4}$ and $c=24$. Check: $4x^2-28x+24=4(x-1)(x-6)$, and $6-1=5$ ✓\n\n**Common Mistakes:**\n* $6$: reports the product $\\frac{c}{4}=6$ instead of solving for $c$.\n* $96$: uses $x_1=7+5=12$ and $x_2=7-5=2$ without halving, giving a product of $24$ and $c=96$.\n* $-24$: attaches a negative sign that the product formula $\\frac{c}{a}$ does not carry.\n\n**Test Day Takeaway:** A sum-and-difference pair is a two-line system: add to get one solution, subtract to get the other, then use the product for the missing coefficient.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  // ─── INTERPRET EXPONENTIAL PARAMETERS (bank-am-196..203) ──────────────────
  // Granularity principle: interpreting a, b, exponent-denominator in
  // a·b^(t/k) is a DISTINCT method from building the model from words.
  {
    id: "bank-am-196",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives three values of the exponential function $R$, where $R(t)$ is the water stored in a reservoir, in millions of liters, $t$ years after 2018. Which statement best describes how $R$ behaves?",
    diagram: { type: "dataTable", params: { headers: ["Years after 2018", "Storage (millions of liters)"], rows: [["0", "8"], ["1", "10"], ["2", "12.5"]] } },
    choices: [
      // distractor: reads the first gap, $10 - 8 = 2$, as a constant yearly increase, but the next gap is $2.5$
      { id: "A", text: "Storage increases by $2$ million liters each year." },
      { id: "B", text: "Storage increases by $25\\%$ each year." },
      // distractor: reports the multiplier $1.25$ as a percent increase instead of the extra $0.25$
      { id: "C", text: "Storage increases by $125\\%$ each year." },
      // distractor: divides the increase by the LATER value, $\frac{2}{10}$, instead of by the earlier one
      { id: "D", text: "Storage increases by $20\\%$ each year." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $\\frac{10}{8} = \\frac{12.5}{10} = 1.25$, a constant multiplier, so storage rises $25\\%$ each year.\n\n**The Full Solution:**\nStep 1: For an exponential function, consecutive values have a constant ratio, so divide: $10 \\div 8 = 1.25$.\nStep 2: The next ratio confirms it: $12.5 \\div 10 = 1.25$.\nStep 3: A multiplier of $1.25$ is an increase of $0.25$, or $25\\%$, per year. Check: $8(1.25)^{2} = 12.5$, matching the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$ million liters each year): the gaps are $2$ and then $2.5$, so no constant amount is added.\n* Choice C ($125\\%$): confuses the whole multiplier with the part that is added; a $125\\%$ increase would more than double the storage.\n* Choice D ($20\\%$): divides the $2$ million increase by $10$ rather than by the starting value $8$.\n\n**Test Day Takeaway:** Percent change always divides by the EARLIER value, and the multiplier is $1$ plus that percent.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-197",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "fill-in",
    question: "The function $v$ defined by $v(t) = 18{,}000(0.86)^t$ gives the estimated value, in dollars, of a delivery van $t$ years after it was purchased. By what percent does the estimated value of the van decrease each year?",
    correctAnswer: "14",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**The correct answer is $14$.**\n\n**The Fast Way (~15s):** The base $0.86$ keeps $86\\%$ of the value, so $100\\% - 86\\% = 14\\%$ is lost each year.\n\n**The Full Solution:**\nStep 1: Each year the value is multiplied by $b = 0.86$.\nStep 2: For decay, $b = 1 - r$, so $0.86=1-r$ and $r = 0.14$.\nStep 3: As a percent, $r = 14\\%$. Check: $v(0) = 18{,}000$ and $v(1) = 15{,}480$, a drop of $2{,}520$, and $\\dfrac{2{,}520}{18{,}000} = 0.14$. $\\checkmark$\n\n**Common Mistakes:** Answering $86$, which is the percent of the value that REMAINS, not the percent lost. Answering $0.14$ — the question asks for a percent, so the decimal must be converted.\n\n**Test Day Takeaway:** With a base below $1$, the percent decrease is $1 - b$ written as a percent; the base itself always reports what is left over.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-198",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $N$ defined by $N(t) = 4{,}500(0.6)^{t/8}$ models the number of harbor seals counted at a monitoring site $t$ years after $2000$. Which statement best describes how the estimated number of seals changes over time?",
    choices: [
      // distractor: splits the 40% decrease evenly across the 8 years
      { id: "A", text: "It decreases by $5\\%$ each year." },
      // distractor: ignores the $8$ in the exponent
      { id: "B", text: "It decreases by $40\\%$ each year." },
      { id: "C", text: "It decreases by $40\\%$ every $8$ years." },
      // distractor: reads the base $0.6$ as the percent decrease
      { id: "D", text: "It decreases by $60\\%$ every $8$ years." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The exponent advances by $1$ when $t$ advances by $8$, so every $8$ years the count is multiplied by $0.6$ — a $40\\%$ decrease.\n\n**The Full Solution:**\nStep 1: In $N(t) = 4{,}500(0.6)^{t/8}$, replacing $t$ with $t + 8$ raises the exponent by exactly $1$.\nStep 2: So $N(t + 8) = 0.6 \\cdot N(t)$: each $8$-year span multiplies the count by $0.6$.\nStep 3: Multiplying by $0.6$ keeps $60\\%$ and loses $40\\%$. Check: $N(0) = 4{,}500$ and $N(8) = 2{,}700$, and $\\dfrac{4{,}500 - 2{,}700}{4{,}500} = 0.40$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5\\%$ per year): divides the $40\\%$ by $8$; percent decay does not split evenly across a period.\n* Choice B ($40\\%$ per year): correct percent, wrong time frame — it ignores the $8$ in the denominator of the exponent.\n* Choice D ($60\\%$ every $8$ years): reports the base as the loss; $0.6$ is the fraction that REMAINS.\n\n**Test Day Takeaway:** In $b^{t/k}$, the quantity is multiplied by $b$ once every $k$ units of $t$ — name the period before naming the percent.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-199",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "fill-in",
    question: "The area covered by a patch of lichen, in square centimeters, is modeled by $A(t) = 60(2.25)^{t/2}$, where $t$ is the number of weeks since the patch was first measured. By what percent does the area increase each week?",
    correctAnswer: "50",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**The correct answer is $50$.**\n\n**The Fast Way (~30s):** One week raises the exponent by $\\frac{1}{2}$, so the weekly factor is $\\sqrt{2.25} = 1.5$, a $50\\%$ increase.\n\n**The Full Solution:**\nStep 1: Replacing $t$ with $t + 1$ multiplies the area by $(2.25)^{1/2}$.\nStep 2: $(2.25)^{1/2} = 1.5$, because $1.5^2 = 2.25$.\nStep 3: A factor of $1.5$ means $1.5 - 1 = 0.5$, or a $50\\%$ increase each week. Check: $60 \\to 90 \\to 135$, and $135 = 60(2.25)$, the two-week factor. $\\checkmark$\n\n**Common Mistakes:** Answering $125$, the percent increase over $2$ weeks (the factor $2.25$), not over $1$ week. Answering $62.5$, which splits that $125\\%$ evenly between the two weeks; percent growth compounds, so the weekly factor is the SQUARE ROOT of the two-week factor, not half of it.\n\n**Test Day Takeaway:** To move from a period factor to a one-unit factor, take a root — never divide the percent.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-200",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Otter counts recorded three years apart after a reintroduction appear in the table below, and biologists expect the same pattern of change to hold for another decade. Which statement best describes how the otter population changes over time?",
    diagram: { type: "dataTable", params: { headers: ["Years after reintroduction", "Otters counted"], rows: [["0", "40"], ["3", "120"], ["6", "360"]] } },
    choices: [
      // distractor: attaches the multiplier of $3$ to one year rather than to the three-year interval in the table
      { id: "A", text: "The population triples each year." },
      // distractor: spreads the first jump of $80$ otters evenly, but the next jump is $240$, not $80$
      { id: "B", text: "The population increases by $80$ otters each year." },
      // distractor: turns a multiplier of $3$ into a $300\%$ increase, which would multiply the count by $4$
      { id: "C", text: "The population increases by $300\\%$ every three years." },
      { id: "D", text: "The population triples every three years." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $\\frac{120}{40} = \\frac{360}{120} = 3$, and each step in the table covers three years, so the count triples every three years.\n\n**The Full Solution:**\nStep 1: Divide consecutive counts: $120 \\div 40 = 3$ and $360 \\div 120 = 3$, a constant ratio.\nStep 2: The inputs advance by $3$ years between rows, so the multiplier of $3$ belongs to a three-year span.\nStep 3: Therefore the population triples every three years. Check: after six years the count is $40 \\cdot 3 \\cdot 3 = 360$, matching the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (triples each year): would give $40 \\cdot 3^{3} = 1{,}080$ otters at year $3$, far above the recorded $120$.\n* Choice B ($80$ otters each year): the increases are $80$ then $240$, so the growth is not a fixed amount.\n* Choice C ($300\\%$ every three years): a $300\\%$ increase means multiplying by $4$, which would give $160$ at year $3$.\n\n**Test Day Takeaway:** Read the ratio AND the input step together — a constant ratio describes the interval between rows, not automatically one unit.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-201",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "fill-in",
    question: "The function $B$ defined by $B(t) = a(1.04)^t$ models the balance, in dollars, of an account $t$ years after it was opened, where $a$ is a constant. The balance was $\\$1{,}352$ two years after the account was opened. What is the value of $a$?",
    correctAnswer: "1250",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**The correct answer is $1250$.**\n\n**The Fast Way (~30s):** $a(1.04)^2 = 1{,}352$, so $a = \\dfrac{1{,}352}{1.0816} = 1{,}250$.\n\n**The Full Solution:**\nStep 1: The constant $a$ is $B(0)$, the balance when the account was opened.\nStep 2: Two years of growth give $B(2) = a(1.04)^2 = 1.0816a$, and the stem gives $B(2) = 1{,}352$.\nStep 3: $a = \\dfrac{1{,}352}{1.0816} = 1{,}250$. Check forward: $1{,}250 \\to 1{,}300 \\to 1{,}352$. $\\checkmark$\n\n**Common Mistakes:** Answering $1{,}352$, treating the balance after two years as the starting balance. Answering $1{,}300$, which undoes only one year of growth.\n\n**Test Day Takeaway:** The coefficient in $a(b)^t$ is the value at $t = 0$; when a later value is given, divide by the growth factor once for each elapsed unit.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-202",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The population of a town is modeled by $P(t) = a(1.02)^t$, where $a$ is a constant and $t$ is the number of years after $2010$. According to the model, the population in $2015$ was $k$. Which expression represents the population the model predicts for $2020$?",
    choices: [
      // distractor: moves 5 years backward instead of forward
      { id: "A", text: "$\\dfrac{k}{(1.02)^5}$" },
      { id: "B", text: "$k(1.02)^5$" },
      // distractor: counts the years from 2010 rather than from 2015
      { id: "C", text: "$k(1.02)^{10}$" },
      // distractor: adds the 2% rate five times into a single 10% increase
      { id: "D", text: "$k(1.10)$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** From $2015$ to $2020$ is $5$ years, and each year multiplies by $1.02$, so the population is $k(1.02)^5$.\n\n**The Full Solution:**\nStep 1: The year $2015$ is $t = 5$, so $P(5) = a(1.02)^5 = k$.\nStep 2: The year $2020$ is $t = 10$, so $P(10) = a(1.02)^{10} = a(1.02)^5 \\cdot (1.02)^5$.\nStep 3: Replacing $a(1.02)^5$ with $k$ gives $P(10) = k(1.02)^5$. Check with $a = 100$: $k = 100(1.02)^5 \\approx 110.41$, and $100(1.02)^{10} \\approx 121.90 = k(1.02)^5$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{k}{(1.02)^5}$): this is the population in $2010$ — dividing runs the model backward.\n* Choice C ($k(1.02)^{10}$): applies ten years of growth to a population that is already five years in.\n* Choice D ($k(1.10)$): treats five years of $2\\%$ growth as a flat $10\\%$; compounding makes the true factor slightly larger.\n\n**Test Day Takeaway:** When a model's value at one time is named, measure the exponent from THAT time — the constant $a$ never has to be found.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-am-203",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "hard",
    type: "fill-in",
    question: "The number of connected devices in a sensor network is modeled by $D(t) = 24 \\cdot 9^{t/6}$, where $t$ is the number of hours after the network is switched on. By what factor does the number of devices grow over a period of $15$ hours?",
    correctAnswer: "243",
    explanation: "**SAT Pattern: Exponential Growth Factor over a Period**\n\n**The correct answer is $243$.**\n\n**The Fast Way (~30s):** Over $15$ hours the exponent rises by $\\frac{15}{6} = \\frac{5}{2}$, so the factor is $9^{5/2} = 3^5 = 243$.\n\n**The Full Solution:**\nStep 1: The factor over any span of $15$ hours is $\\dfrac{D(t + 15)}{D(t)} = 9^{(t+15)/6 - t/6} = 9^{15/6}$.\nStep 2: $\\dfrac{15}{6} = \\dfrac{5}{2}$, so the factor is $9^{5/2} = \\left(9^{1/2}\\right)^5 = 3^5$.\nStep 3: $3^5 = 243$. Check from $t = 0$: $D(0) = 24$ and $D(15) = 24 \\cdot 243 = 5{,}832$. $\\checkmark$\n\n**Common Mistakes:** Answering $81$, which rounds the exponent $\\frac{5}{2}$ down to $2$. Answering $22.5$, which multiplies $9$ by $\\frac{15}{6}$ instead of raising $9$ to that power.\n\n**Test Day Takeaway:** The growth factor over a span depends only on how much the exponent changes — subtract exponents, and rewrite a half-power as a square root to keep the arithmetic exact.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-growth-interpretation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  // ── classify-physical-motion-model (5 questions, batch 2026-05-13) ────────
  // Pattern: given a verbal description of how something changes over time,
  // identify whether the relationship is linear, exponential, or quadratic.
  // Aligns to Bluebook M2-Hard Q1 (airplane descending at constant rate).
  {
    id: "bank-am-204",
    domain: "advanced-math",
    skills: ["function-interpretation", "linear-functions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A copy center charges a flat fee of $\\$12$ for each order plus $\\$0.06$ for each page printed. Which type of function best models the total charge for an order as a function of the number of pages printed?",
    choices: [
      // distractor: the charge rises with each page, and the change is not a constant percent
      { id: "A", text: "Decreasing exponential" },
      // distractor: the charge rises rather than falls
      { id: "B", text: "Decreasing linear" },
      // distractor: treats a fixed charge per page as a constant percent increase
      { id: "C", text: "Increasing exponential" },
      { id: "D", text: "Increasing linear" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Classify Physical Motion Model**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Each page adds the same $\\$0.06$, so the total rises by a constant amount per page — increasing linear.\n\n**The Full Solution:**\nStep 1: Let $p$ be the number of pages. The total charge is $12 + 0.06p$ dollars.\nStep 2: A function of the form $mx + b$ is linear, and here $m = 0.06 > 0$, so the total charge increases.\nStep 3: The charge is therefore modeled by an increasing linear function. Check: $100$ pages cost $\\$18$ and $200$ pages cost $\\$24$ — each extra $100$ pages adds the same $\\$6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (decreasing exponential): would require the total to fall toward a floor as pages are added.\n* Choice B (decreasing linear): the constant $\\$0.06$ per page is added, not subtracted.\n* Choice C (increasing exponential): would require each page to multiply the total by a fixed factor, so page $200$ would cost far more than page $2$.\n\n**Test Day Takeaway:** Constant amount per unit means linear; constant PERCENT per unit means exponential.",
    calculatorAllowed: true,
    tags: ["model-classification"],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-205",
    domain: "advanced-math",
    skills: ["function-interpretation", "exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The area of a pond's surface covered by duckweed doubles every $4$ days. Which type of function best models the covered area as a function of the number of days since the duckweed was first observed?",
    choices: [
      // distractor: the right family, but a decreasing model needs a factor below 1
      { id: "A", text: "Decreasing exponential" },
      // distractor: the covered area is growing, not shrinking
      { id: "B", text: "Decreasing linear" },
      { id: "C", text: "Increasing exponential" },
      // distractor: treats doubling as adding the same area every 4 days
      { id: "D", text: "Increasing linear" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Classify Physical Motion Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Doubling is multiplication by a constant factor over equal time spans — the signature of exponential growth.\n\n**The Full Solution:**\nStep 1: Let $a$ be the area first observed. After $4$ days the area is $2a$, after $8$ days $4a$, after $12$ days $8a$.\nStep 2: Equal time steps multiply the area by $2$ rather than adding a fixed area, so the model is exponential, not linear.\nStep 3: Because the factor $2$ is greater than $1$, the function increases. Check the differences: $a$, then $2a$, then $4a$ — the increases ($a$, $2a$) are not constant, so no line fits. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (decreasing exponential): the correct family, but the area grows; a decreasing model needs a factor between $0$ and $1$.\n* Choice B (decreasing linear): the area is increasing.\n* Choice D (increasing linear): a line would add the same area every $4$ days; doubling adds more and more each period.\n\n**Test Day Takeaway:** \"Doubles / halves / triples every $k$ units\" always signals an exponential model — the direction comes from whether the factor exceeds $1$.",
    calculatorAllowed: true,
    tags: ["model-classification"],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-206",
    domain: "advanced-math",
    skills: ["function-interpretation", "exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A worker unloads boxes from a pallet at a steady rate. The table gives the number of boxes remaining on the pallet after $0$, $2$, and $4$ hours of work. Which type of function best models the number of boxes remaining as a function of the number of hours worked?",
    diagram: { type: "dataTable", params: { headers: ["Hours worked", "Boxes remaining"], rows: [["0", "480"], ["2", "432"], ["4", "384"]] } },
    choices: [
      // distractor: the successive DIFFERENCES are constant, not the ratios
      { id: "A", text: "Decreasing exponential" },
      { id: "B", text: "Decreasing linear" },
      // distractor: the count is falling, and the ratios are not constant
      { id: "C", text: "Increasing exponential" },
      // distractor: the count is falling
      { id: "D", text: "Increasing linear" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Classify Physical Motion Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The count drops by the same $48$ boxes every $2$ hours, a constant rate — decreasing linear.\n\n**The Full Solution:**\nStep 1: From the table, $480 \\to 432 \\to 384$: each $2$-hour step subtracts $48$ boxes.\nStep 2: Constant differences over equal steps define a linear function, with slope $\\dfrac{-48}{2} = -24$ boxes per hour.\nStep 3: The slope is negative, so the model is decreasing linear: $b(h) = 480 - 24h$. Check: $b(4) = 480 - 96 = 384$, matching the table. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (decreasing exponential): the ratios $\\frac{432}{480} = 0.9$ and $\\frac{384}{432} \\approx 0.889$ are NOT equal, so no constant factor exists.\n* Choice C (increasing exponential): the number of boxes is falling.\n* Choice D (increasing linear): the slope is negative, since boxes are being removed.\n\n**Test Day Takeaway:** Test a table both ways — equal differences mean linear, equal ratios mean exponential.",
    calculatorAllowed: true,
    tags: ["model-classification"],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-207",
    domain: "advanced-math",
    skills: ["function-interpretation", "identify-quadratic"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rectangular pen will be enclosed with $120$ meters of fencing, so the width $w$ and the length of the pen add to $60$ meters. The table gives the area of the pen, in square meters, for three values of $w$. Which type of function best models the area of the pen as a function of $w$?",
    diagram: { type: "dataTable", params: { headers: ["w (meters)", "Area (square meters)"], rows: [["10", "500"], ["30", "900"], ["50", "500"]] } },
    choices: [
      // distractor: the area rises before it falls
      { id: "A", text: "Decreasing linear" },
      // distractor: the area falls after $w = 30$
      { id: "B", text: "Increasing linear" },
      // distractor: an exponential function never turns around
      { id: "C", text: "Increasing exponential" },
      { id: "D", text: "Quadratic" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Classify Physical Motion Model**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The length is $60 - w$, so the area is $w(60 - w) = 60w - w^2$ — a squared term, so the model is quadratic.\n\n**The Full Solution:**\nStep 1: Since $w + \\text{length} = 60$, the length is $60 - w$ and the area is $A(w) = w(60 - w)$.\nStep 2: Expanding gives $A(w) = 60w - w^2$, a degree-$2$ polynomial, so $A$ is quadratic.\nStep 3: The table confirms the shape: the area rises from $500$ to $900$, then falls back to $500$. Check: $A(10) = 10(50) = 500$, $A(30) = 30(30) = 900$, $A(50) = 50(10) = 500$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (decreasing linear): matches only the second half of the table; the area increases from $w = 10$ to $w = 30$.\n* Choice B (increasing linear): matches only the first half; the area decreases after $w = 30$.\n* Choice C (increasing exponential): an exponential model rises without ever turning around, and equal steps in $w$ here do not give equal ratios.\n\n**Test Day Takeaway:** A quantity that rises to a maximum and then falls symmetrically is quadratic — a product of two expressions that move in opposite directions is the usual source.",
    calculatorAllowed: true,
    tags: ["model-classification"],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-208",
    domain: "advanced-math",
    skills: ["function-interpretation", "exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The concentration of chlorine in a sample of cooling water falls by half every $3$ days. Which type of function best models the chlorine concentration as a function of the number of days since the sample was collected?",
    choices: [
      { id: "A", text: "Decreasing exponential" },
      // distractor: halving removes a smaller amount each period, so the rate is not constant
      { id: "B", text: "Decreasing linear" },
      // distractor: the concentration falls, so the factor is less than 1
      { id: "C", text: "Increasing exponential" },
      // distractor: the concentration falls
      { id: "D", text: "Increasing linear" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Classify Physical Motion Model**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Halving over equal time spans multiplies by the constant factor $\\frac{1}{2}$, which is exponential decay.\n\n**The Full Solution:**\nStep 1: Let $c$ be the concentration when the sample was collected. After $3$ days it is $\\frac{1}{2}c$, after $6$ days $\\frac{1}{4}c$, after $9$ days $\\frac{1}{8}c$.\nStep 2: Equal time steps multiply by $\\frac{1}{2}$, so the model is exponential with base $\\frac{1}{2}$.\nStep 3: A base between $0$ and $1$ makes the function decreasing. Check the drops: $\\frac{1}{2}c$, then $\\frac{1}{4}c$, then $\\frac{1}{8}c$ — the amount lost shrinks each period, so no line fits. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (decreasing linear): a line would remove the SAME amount every $3$ days; halving removes less and less.\n* Choice C (increasing exponential): the right family, but a factor of $\\frac{1}{2}$ makes it decrease.\n* Choice D (increasing linear): the concentration is falling.\n\n**Test Day Takeaway:** Half-life language always means exponential decay; the tell for linear decay is a constant amount removed per unit of time.",
    calculatorAllowed: true,
    tags: ["model-classification"],
    sourceStyleRef: "model-classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  // ── interpret-initial-value-in-context (5 questions, batch 2026-05-13) ────
  // Pattern: given f(x) modeling a real scenario, interpret the y-intercept
  // (or initial value) in plain language. Aligns to Bluebook M2-Hard Q3
  // (popsicles, juice remaining y-intercept).
  {
    id: "bank-am-209",
    domain: "advanced-math",
    skills: ["function-interpretation", "linear-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A plant nursery gave away seedling flats at a steady rate during a spring event. The function $s$ defined by $s(w) = -6w + 48$ gives the number of flats remaining $w$ weeks into the event, and the graph of $y = s(w)$ is shown. Which statement is the best interpretation of the $y$-intercept of the graph in this context?",
    diagram: { type: "linearGraph", params: { slope: -6, yIntercept: 48, xRange: [0, 10], yRange: [0, 50], xTickInterval: 5, yTickInterval: 10, gridInterval: 5, showPoints: [[0, 48], [8, 0]] } },
    choices: [
      // distractor: interprets the slope instead of the $y$-intercept
      { id: "A", text: "The nursery gave away $6$ flats each week." },
      { id: "B", text: "The nursery had $48$ flats when the event began." },
      // distractor: reads the intercept as a total given away rather than a starting stock
      { id: "C", text: "The nursery had given away $48$ flats when the event ended." },
      // distractor: reads the intercept as a number of weeks
      { id: "D", text: "The event lasted $48$ weeks." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Interpret Initial Value in Context**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The $y$-intercept is $s(0) = 48$, the number of flats remaining after $0$ weeks — the stock the nursery started with.\n\n**The Full Solution:**\nStep 1: The $y$-intercept of the graph is the point where $w = 0$.\nStep 2: $s(0) = -6(0) + 48 = 48$, so the graph passes through $(0, 48)$.\nStep 3: Since $s(w)$ counts flats remaining, $48$ flats remained at the moment the event began. Check the other constant: $-6$ is the weekly change, and the graph reaches $s(8) = 0$, so the flats ran out after $8$ weeks. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$ flats per week): interprets $-6$, the slope, not the intercept.\n* Choice C ($48$ given away by the end): $48$ is the count at the START; by the end the count is $0$.\n* Choice D ($48$ weeks): $48$ is measured on the vertical axis, in flats; the graph reaches zero at $w = 8$ weeks.\n\n**Test Day Takeaway:** The $y$-intercept always answers \"what was the output when the input was $0$?\" — state it in the units of the output.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-y-intercept",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-210",
    domain: "advanced-math",
    skills: ["function-interpretation", "linear-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A charity's campaign opened with money already pledged and then raised money at a steady rate. The function $F$ defined by $F(d) = 250d + 3{,}000$ gives the total amount raised, in dollars, $d$ days after the campaign opened. Which statement is the best interpretation of the $y$-intercept of the graph of $y = F(d)$ in the $xy$-plane?",
    choices: [
      // distractor: reports the slope as the starting amount
      { id: "A", text: "The campaign had raised $\\$250$ when it opened." },
      // distractor: reads the intercept as a daily rate
      { id: "B", text: "The campaign raised $\\$3{,}000$ on each day it was open." },
      { id: "C", text: "The campaign had raised $\\$3{,}000$ when it opened." },
      // distractor: reads the intercept as a number of days
      { id: "D", text: "The campaign raised money for $3{,}000$ days." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Interpret Initial Value in Context**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The $y$-intercept is $F(0) = 3{,}000$, the amount already raised on day $0$.\n\n**The Full Solution:**\nStep 1: The $y$-intercept of $y = F(d)$ occurs at $d = 0$, the day the campaign opened.\nStep 2: $F(0) = 250(0) + 3{,}000 = 3{,}000$, so the graph passes through $(0, 3{,}000)$.\nStep 3: In context, $\\$3{,}000$ had already been raised when the campaign opened. Check the slope: $F(1) - F(0) = 250$, the amount raised per day. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\$250$ at opening): swaps the two constants; $250$ is the daily rate.\n* Choice B ($\\$3{,}000$ per day): assigns the intercept the slope's job; the campaign raised $\\$250$ per day.\n* Choice D ($3{,}000$ days): $3{,}000$ is measured in dollars on the vertical axis, not in days.\n\n**Test Day Takeaway:** Attach units before choosing: the intercept carries the OUTPUT units (dollars), and the slope carries output-per-input units (dollars per day).",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-y-intercept",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-211",
    domain: "advanced-math",
    skills: ["function-interpretation", "exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A district models the number of unvaccinated children by $P(t)=18{,}000(0.94)^{t}$, where $t$ is the number of years after 2015. What does the coefficient $18{,}000$ represent in this model?",
    choices: [
      // distractor: treats the coefficient as a total decrease rather than a starting level
      { id: "A", text: "The number of unvaccinated children fell by 18,000 after 2015." },
      // distractor: treats the coefficient as a yearly decrease; the yearly change is 6% of the current level
      { id: "B", text: "The number of unvaccinated children falls by 18,000 each year." },
      // distractor: reads t = 1 as the starting year; the model gives 16,920 for 2016
      { id: "C", text: "The number of unvaccinated children in 2016 was 18,000." },
      { id: "D", text: "The estimated number of unvaccinated children in 2015 was 18,000." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Interpret Initial Value in Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** At $t=0$ the power equals 1, so $P(0)=18{,}000$, the estimate for 2015.\n\n**The Full Solution:**\nStep 1: The variable $t$ counts years after 2015, so 2015 corresponds to $t=0$.\nStep 2: $(0.94)^{0}=1$, so $P(0)=18{,}000(1)=18{,}000$.\nStep 3: The coefficient is therefore the estimated count in 2015. Check: $P(1)=16{,}920$, which is 6% below 18,000, as the base requires ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: reads the coefficient as a change; it is a level.\n* Choice B: reads it as a yearly drop; the model's drop is a percent of the current count, not a fixed 18,000.\n* Choice C: shifts the start by one year, reading $t=1$ as 2015; the model gives $16{,}920$ for 2016.\n\n**Test Day Takeaway:** Evaluate the model at the input that means 'the start' — the coefficient is what survives when the power equals 1.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-y-intercept",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-212",
    domain: "advanced-math",
    skills: ["function-interpretation", "linear-functions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A lighting crew charges each production for load-in labor using the model $C(h)=45+38h$, which gives the cost, in dollars, of a call that lasts $h$ hours. What does the term $45$ represent?",
    choices: [
      { id: "A", text: "The cost, in dollars, charged before any hours are billed." },
      // distractor: reads the constant as the hourly rate; the hourly rate is 38
      { id: "B", text: "The cost, in dollars, of each hour of labor." },
      // distractor: reads a dollar amount as a number of hours
      { id: "C", text: "The number of hours included at no charge." },
      // distractor: pairs the constant with the coefficient instead of reading it at h = 0; a 38-hour call costs 45 + 1,444 = 1,489 dollars
      { id: "D", text: "The cost, in dollars, of 38 hours of labor." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Interpret Initial Value in Context**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** At $h=0$ the model gives $C(0)=45$, the charge before any hours are worked.\n\n**The Full Solution:**\nStep 1: Substituting $h=0$ removes the hourly term, leaving $C(0)=45$.\nStep 2: Zero hours means no labor has been billed, so 45 dollars is a fixed starting charge.\nStep 3: The term 45 is therefore the cost before any hours are billed. Check: $C(2)=45+76=121$, which is the fixed 45 plus two hours at 38 dollars ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: names 45 as the hourly rate, but that role belongs to 38.\n* Choice C: converts dollars into hours.\n* Choice D: pairs the constant with the coefficient; a 38-hour call costs $45+38(38)=1{,}489$ dollars, not 45.\n\n**Test Day Takeaway:** The constant term is the output when the input is zero — say what zero input means in the situation.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-y-intercept",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-213",
    domain: "advanced-math",
    skills: ["function-interpretation", "exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A monitoring log models the mass of a decaying tracer by $h(t)=a(0.5)^{t}$, in grams, where $t$ is the number of hours after monitoring began and $a$ is a constant. The log records $h(3)=289$ grams. Which statement best interprets $a$?",
    choices: [
      { id: "A", text: "The tracer's mass when monitoring began was 2,312 grams." },
      // distractor: multiplies by 0.5 cubed instead of dividing: 289(0.125) = 36.125
      { id: "B", text: "The tracer's mass when monitoring began was about 36 grams." },
      // distractor: attaches the starting value to t = 3 rather than t = 0
      { id: "C", text: "The tracer's mass 3 hours after monitoring began was 2,312 grams." },
      // distractor: reads the starting mass as the amount lost; the loss is 2,312 - 289 = 2,023 grams
      { id: "D", text: "The tracer lost 2,312 grams during the first 3 hours." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Interpret Initial Value in Context**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** $a(0.5)^{3}=289$ gives $\\frac{a}{8}=289$, so $a=2{,}312$, the mass at $t=0$.\n\n**The Full Solution:**\nStep 1: The constant $a$ is the output at $t=0$, since $(0.5)^{0}=1$.\nStep 2: Substituting $t=3$ gives $a(0.5)^{3}=a\\left(\\frac{1}{8}\\right)=289$.\nStep 3: Multiplying by 8 gives $a=2{,}312$ grams, the mass when monitoring began. Check: $2{,}312\\left(\\frac{1}{8}\\right)=289$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (about 36 grams): multiplies 289 by $\\frac{1}{8}$ instead of dividing, running the model forward.\n* Choice C: keeps the right number but attaches it to $t=3$, where the mass is 289 grams.\n* Choice D: reports the starting mass as a loss; the loss over three hours is 2,023 grams.\n\n**Test Day Takeaway:** To recover a starting value from a later reading, divide by the growth factor raised to the elapsed time.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-y-intercept",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  // ── interpret-vertex-form (5 questions, batch 2026-05-13) ─────────────────
  // Pattern: given a quadratic in vertex form modeling a scenario, interpret
  // the vertex (h, k) as a real-world max/min and its time. Aligns to Bluebook
  // M2-Hard Q4 (toy rocket vertex interpretation).
  {
    id: "bank-am-214",
    domain: "advanced-math",
    skills: ["function-interpretation", "quadratic-equations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A drone rises and then descends during a test flight. Its altitude above the ground, in meters, $t$ seconds after takeoff is modeled by $a(t) = -0.05(t - 30)^2 + 45$, and the graph of $y = a(t)$ is shown. Which of the following is the best interpretation of the vertex of the graph in this context?",
    diagram: { type: "parabola", params: { vertex: { h: 30, k: 45 }, a: -0.05, xRange: [0, 60], yRange: [0, 50], xTickInterval: 10, yTickInterval: 10, gridInterval: 10, showVertex: true } },
    choices: [
      { id: "A", text: "The drone reaches its greatest altitude, $45$ meters, $30$ seconds after takeoff." },
      // distractor: swaps the two coordinates of the vertex
      { id: "B", text: "The drone reaches its greatest altitude, $30$ meters, $45$ seconds after takeoff." },
      // distractor: reads the maximum as the starting altitude
      { id: "C", text: "The drone's altitude was $45$ meters at takeoff." },
      // distractor: reads the maximum altitude as a time
      { id: "D", text: "The drone lands $45$ seconds after takeoff." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Interpret Vertex Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** In $a(t - h)^2 + k$ the vertex is $(h, k) = (30, 45)$, and $a = -0.05 < 0$ makes it a maximum: $45$ meters at $t = 30$ seconds.\n\n**The Full Solution:**\nStep 1: The model is in vertex form, so the vertex of the graph is $(30, 45)$.\nStep 2: The leading coefficient $-0.05$ is negative, so the parabola opens downward and the vertex is the highest point.\nStep 3: The input $30$ is seconds after takeoff and the output $45$ is meters of altitude, so the drone peaks at $45$ meters, $30$ seconds after takeoff. Check: $a(0) = -0.05(900) + 45 = 0$, so the flight starts at ground level, and $a(60) = 0$ is the landing. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($30$ meters at $45$ seconds): reverses the vertex coordinates; $h$ is a time and $k$ is an altitude.\n* Choice C ($45$ meters at takeoff): takeoff is $t = 0$, where the altitude is $0$.\n* Choice D (lands after $45$ seconds): uses the altitude as a time; the model returns to $0$ at $t = 60$.\n\n**Test Day Takeaway:** Read the vertex as an ordered pair with units — \"$h$ input-units gives the extreme output $k$\" — and let the sign of the leading coefficient decide maximum versus minimum.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-vertex",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-215",
    domain: "advanced-math",
    skills: ["function-interpretation", "quadratic-equations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A signal-timing model gives throughput $T(x)=-3(x-24)^{2}+k$, in vehicles per hour, for a green interval of $x$ seconds, where $k$ is a constant, and the greatest throughput the model gives is $1{,}900$ vehicles per hour. What is the best interpretation of $k$?",
    choices: [
      // distractor: reports the vertex's x-coordinate, 24, as the constant k
      { id: "A", text: "$k$ is 24, the green interval, in seconds, that produces the greatest throughput." },
      // distractor: pairs the right number with the wrong quantity, calling 1,900 a time
      { id: "B", text: "$k$ is 1,900, the green interval, in seconds, that produces the greatest throughput." },
      { id: "C", text: "$k$ is 1,900, the greatest throughput, in vehicles per hour, the model gives." },
      // distractor: pairs the wrong number with the right quantity, calling 24 a throughput
      { id: "D", text: "$k$ is 24, the greatest throughput, in vehicles per hour, the model gives." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Interpret Vertex Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The squared term is never positive, so $T$ is largest when $x=24$, and there $T=k$; the greatest throughput is 1,900, so $k=1{,}900$.\n\n**The Full Solution:**\nStep 1: Because $-3(x-24)^{2}\\le 0$, the model's output never exceeds $k$.\nStep 2: The output equals $k$ exactly when $x=24$ seconds.\nStep 3: The greatest throughput is 1,900 vehicles per hour, so $k=1{,}900$ and it measures throughput. Check: $T(24)=0+1{,}900$, and $T(20)=-48+1{,}900=1{,}852$, which is smaller ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: names the green interval 24 as $k$; 24 sits inside the squared term.\n* Choice B: keeps 1,900 but calls it a time in seconds.\n* Choice D: keeps the throughput label but attaches the number 24.\n\n**Test Day Takeaway:** In $a(x-h)^{2}+k$ with $a<0$, $h$ is the input that maximizes and $k$ is the maximum output — check the units of each.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-vertex",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-216",
    domain: "advanced-math",
    skills: ["function-interpretation", "quadratic-equations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The function $k$ defined by $k(u) = 0.04(u - 45)^2 + 7$ gives the handling cost, in dollars, per package when $u$ packages are loaded on a pallet, where $u > 0$. Which of the following statements is true?",
    choices: [
      { id: "A", text: "The handling cost per package is the same when $40$ packages are loaded as when $50$ packages are loaded." },
      // distractor: reads only the left branch of the parabola
      { id: "B", text: "The handling cost per package decreases as $u$ increases, for every $u > 0$." },
      // distractor: swaps the vertex coordinates, using $k$ as the input
      { id: "C", text: "The least handling cost per package occurs when $7$ packages are loaded." },
      // distractor: treats the constant $7$ as the value at the smallest input
      { id: "D", text: "The handling cost per package is $\\$7$ when $1$ package is loaded." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Interpret Vertex Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** $40$ and $50$ are each $5$ units from the vertex input $45$, and $(u - 45)^2$ depends only on that distance, so both give the same cost.\n\n**The Full Solution:**\nStep 1: The vertex of $k$ is $(45, 7)$, so the graph is symmetric about the vertical line $u = 45$.\nStep 2: $40$ and $50$ are the same distance from $45$: $(40 - 45)^2 = (50 - 45)^2 = 25$.\nStep 3: Therefore $k(40) = 0.04(25) + 7 = 8$ and $k(50) = 0.04(25) + 7 = 8$ — equal, as choice A states. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (always decreasing): true only for $u < 45$; past the vertex the cost rises again, reaching $k(90) = 88$.\n* Choice C (least cost at $7$ packages): reverses the vertex; the least cost, $\\$7$, occurs at $u = 45$, and $k(7) \\approx 64.76$.\n* Choice D ($\\$7$ at one package): $k(1) = 0.04(1{,}936) + 7 \\approx 84.44$, nowhere near $\\$7$.\n\n**Test Day Takeaway:** Two inputs equidistant from $h$ always give the same output — symmetry answers \"which must be true\" questions without any computation.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-vertex",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-217",
    domain: "advanced-math",
    skills: ["function-interpretation", "quadratic-equations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cable is strung between two poles. The height of the cable above the ground, in feet, at a horizontal distance $x$ feet from the first pole is modeled by $y = 0.05(x - 30)^2 + 14$, and the graph of this model is shown. Which of the following is the best interpretation of the vertex of the graph in this context?",
    diagram: { type: "parabola", params: { vertex: { h: 30, k: 14 }, a: 0.05, xRange: [0, 60], yRange: [0, 60], xTickInterval: 10, yTickInterval: 10, gridInterval: 10, showVertex: true } },
    choices: [
      // distractor: reads the minimum height as the height at $x = 0$
      { id: "A", text: "The cable is attached to the first pole $14$ feet above the ground." },
      // distractor: swaps the two coordinates of the vertex
      { id: "B", text: "The cable's lowest point is $30$ feet above the ground, $14$ feet from the first pole." },
      { id: "C", text: "The cable's lowest point is $14$ feet above the ground, $30$ feet from the first pole." },
      // distractor: reads a height as a horizontal distance
      { id: "D", text: "The two poles stand $14$ feet apart." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Interpret Vertex Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The vertex is $(30, 14)$ and $0.05>0$, so the cable dips to its lowest height, $14$ feet, at a horizontal distance of $30$ feet.\n\n**The Full Solution:**\nStep 1: The equation is in vertex form $a(x - h)^2 + k$ with $h = 30$ and $k = 14$, so the vertex is $(30, 14)$.\nStep 2: The leading coefficient $0.05$ is positive, so the parabola opens upward and the vertex is the lowest point.\nStep 3: The input is a horizontal distance in feet and the output is a height in feet: the cable's lowest point is $14$ feet up, $30$ feet from the first pole. Check the attachment height: at $x = 0$, $y = 0.05(900) + 14 = 59$ feet. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($14$ feet at the pole): at the pole $x = 0$, where the model gives $59$ feet.\n* Choice B ($30$ feet high, $14$ feet along): reverses the coordinates of the vertex.\n* Choice D (poles $14$ feet apart): $14$ is a height; the graph shows the second pole at $x = 60$ feet.\n\n**Test Day Takeaway:** With a positive leading coefficient the vertex is a MINIMUM — for hanging cables, costs, and fuel use, that lowest point is usually what the question is after.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-vertex",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  {
    id: "bank-am-218",
    domain: "advanced-math",
    skills: ["function-interpretation", "quadratic-equations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A bus route's average fuel use, in gallons per $100$ miles, at a steady speed of $v$ miles per hour is modeled by $F(v) = 0.006(v - 55)^2 + 9$, where $v > 0$. At which of the following speeds does the model predict the same average fuel use as at $40$ miles per hour?",
    choices: [
      // distractor: subtracts $40$ from the vertex speed $55$
      { id: "A", text: "$15$" },
      // distractor: names the vertex speed itself
      { id: "B", text: "$55$" },
      { id: "C", text: "$70$" },
      // distractor: adds $40$ to the vertex speed $55$
      { id: "D", text: "$95$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Interpret Vertex Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The graph is symmetric about $v = 55$, and $40$ is $15$ below it, so the matching speed is $55 + 15 = 70$.\n\n**The Full Solution:**\nStep 1: $F$ is in vertex form with vertex $(55, 9)$, so its graph is symmetric about the line $v = 55$.\nStep 2: Two speeds give the same fuel use exactly when they are equidistant from $55$: $55 - 40 = 15$, so the partner speed is $55 + 15 = 70$.\nStep 3: Check both: $F(40) = 0.006(225) + 9 = 10.35$ and $F(70) = 0.006(225) + 9 = 10.35$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): that is the DISTANCE from $40$ to the vertex speed, not a speed. $F(15) = 0.006(1{,}600) + 9 = 18.6$.\n* Choice B ($55$): the vertex speed, where fuel use is least ($9$ gallons per $100$ miles), not equal to the value at $40$.\n* Choice D ($95$): adds $40$ to $55$ instead of adding the distance $15$; $F(95) = 0.006(1{,}600) + 9 = 18.6$.\n\n**Test Day Takeaway:** Equal outputs on a parabola sit at equal distances from $h$ — find that distance, then reflect it to the other side.",
    calculatorAllowed: true,
    tags: ["interpret-parameter"],
    sourceStyleRef: "interpret-vertex",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-13"
  },

  // ─── REVERSE EXPONENTIAL BACK IN TIME (bank-am-219..226) ──────────────────
  // Given current value + growth/decay rate, find a PAST value (divide by b^n,
  // not multiply). Distinct from forward `build-exponential-model`. See
  // audit §B4. CB precedent: PT11-M1-Q14, PT11-M2-Q11.
  {
    id: "bank-am-219",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The number of ants in a colony triples every $2$ weeks. The colony contains $1{,}080$ ants today. How many ants did the colony contain $2$ weeks ago?",
    choices: [
      // distractor: divides by $9$, stepping back two periods instead of one
      { id: "A", text: "$120$" },
      { id: "B", text: "$360$" },
      // distractor: halves the count instead of dividing by the growth factor $3$
      { id: "C", text: "$540$" },
      // distractor: multiplies by $3$, moving forward in time
      { id: "D", text: "$3{,}240$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Going back one $2$-week period undoes one tripling: $1{,}080 \\div 3 = 360$.\n\n**The Full Solution:**\nStep 1: Each $2$-week period multiplies the colony by $3$, so the count $2$ weeks ago, call it $c$, satisfies $3c = 1{,}080$.\nStep 2: Dividing both sides by $3$ gives $c = 360$.\nStep 3: Check forward: $360 \\cdot 3 = 1{,}080$ ants today. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($120$): divides by $3$ twice, which reaches $4$ weeks ago.\n* Choice C ($540$): halves the current count; the growth factor is $3$, not $2$.\n* Choice D ($3{,}240$): multiplies instead of divides, giving the count $2$ weeks from now.\n\n**Test Day Takeaway:** Going backward in time DIVIDES by the growth factor once per period — count the periods before touching the arithmetic.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-220",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The amount of material collected each year by a town's recycling program increases by $25\\%$ each year. The program collected $900$ tons this year. How many tons did it collect last year?",
    choices: [
      // distractor: subtracts 25% of this year's total
      { id: "A", text: "$675$" },
      { id: "B", text: "$720$" },
      // distractor: increases this year's total by 25%
      { id: "C", text: "$1{,}125$" },
      // distractor: divides by the rate $0.25$ instead of by $1.25$
      { id: "D", text: "$3{,}600$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Last year's total times $1.25$ is $900$, so last year's total is $900 \\div 1.25 = 720$ tons.\n\n**The Full Solution:**\nStep 1: A $25\\%$ increase multiplies by $1.25$, so if $L$ is last year's total, $1.25L = 900$.\nStep 2: Dividing both sides by $1.25$ gives $L = \\dfrac{900}{1.25} = 720$.\nStep 3: Check forward: $720 + 0.25(720) = 720 + 180 = 900$ tons. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($675$): computes $900 - 0.25(900)$; the $25\\%$ increase was applied to LAST year's total, not this year's.\n* Choice C ($1{,}125$): increases $900$ by $25\\%$, which projects forward to next year.\n* Choice D ($3{,}600$): divides by $0.25$; the multiplier for growth is $1 + 0.25$.\n\n**Test Day Takeaway:** Undo a percent increase by DIVIDING by $1 + r$ — subtracting the same percent from the new value always overshoots.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-221",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The value of an investment fund has grown by $20\\%$ each year for the past two years, and the fund is now worth $\\$7{,}200$. What was the value of the fund, in dollars, two years ago?",
    choices: [
      // distractor: subtracts 40% from the current value
      { id: "A", text: "$4{,}320$" },
      { id: "B", text: "$5{,}000$" },
      // distractor: undoes only one year of growth
      { id: "C", text: "$6{,}000$" },
      // distractor: applies two more years of growth instead of undoing them
      { id: "D", text: "$10{,}368$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Two years of $20\\%$ growth multiply by $1.2^2 = 1.44$, so the original value is $7{,}200 \\div 1.44 = 5{,}000$.\n\n**The Full Solution:**\nStep 1: If $V$ is the value two years ago, then $V(1.2)^2 = 7{,}200$.\nStep 2: $(1.2)^2 = 1.44$, so $1.44V = 7{,}200$ and $V = \\dfrac{7{,}200}{1.44}$.\nStep 3: $V = 5{,}000$ dollars. Check forward: $5{,}000 \\to 6{,}000 \\to 7{,}200$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4{,}320$): computes $7{,}200(0.6)$, subtracting two $20\\%$ shares of the CURRENT value.\n* Choice C ($6{,}000$): divides by $1.2$ only once, landing one year ago.\n* Choice D ($10{,}368$): multiplies by $1.44$, projecting two years into the future.\n\n**Test Day Takeaway:** Each year backward divides by $1 + r$ once; raise the multiplier to the number of years and divide a single time.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-222",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "medium",
    type: "fill-in",
    question: "The number of viable yeast cells in a starter culture, in millions, is modeled by $P(t)=k(2)^{t/5}$, where $t$ is the number of hours after mixing and $k$ is a constant. The table gives $P(t)$ at three times. What is the value of $k$?",
    diagram: { type: "table", params: { xHeader: "t (hours)", yHeader: "P(t)", rows: [["5", "24"], ["10", "48"], ["15", "96"]] } },
    correctAnswer: "12",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~30s):** $k=P(0)$, and the count doubles every $5$ hours, so stepping back from $P(5)=24$ gives $k=12$.\n\n**The Full Solution:**\n\nStep 1: Substituting $t=0$ gives $P(0)=k(2)^{0}=k$, so $k$ is the count at the moment of mixing.\n\nStep 2: The exponent $\\frac{t}{5}$ increases by $1$ every $5$ hours, so each $5$-hour step multiplies the count by $2$; the table confirms this with $24$, $48$, $96$.\n\nStep 3: Stepping back one $5$-hour interval from $P(5)=24$ halves the count: $k=\\frac{24}{2}=12$. Check: $P(15)=12(2)^{3}=12\\cdot8=96$, matching the last row.\n\n**Common Mistakes:**\n\n* Reading $k$ as the first tabulated value $24$, which is $P(5)$ and not $P(0)$.\n* Dividing $96$ by $3$ instead of by $2^{3}=8$ gives $32$.\n\n**Test Day Takeaway:** In $k\\cdot b^{t/n}$ the constant $k$ is the value at $t=0$; walk backwards one full period at a time rather than dividing by the number of periods.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-223",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives the concentration $C$, in micrograms per kilogram, of a fumigant residue on stored almonds $t$ days after the first measurement, and $C$ decays exponentially with $t$. According to this model, what was the concentration $3$ days before the first measurement?",
    diagram: { type: "dataTable", params: { headers: ["Days t", "Concentration C"], rows: [["0", "320"], ["3", "160"], ["6", "80"], ["9", "40"]] } },
    choices: [
      // distractor: steps forward in time instead of backward, reporting the concentration 3 days after the first measurement
      { id: "A", text: "$160$" },
      // distractor: extrapolates linearly, adding the first difference 320 - 160 = 160 to 320
      { id: "B", text: "$480$" },
      { id: "C", text: "$640$" },
      // distractor: steps back 6 days instead of 3, doubling twice to reach 1,280
      { id: "D", text: "$1{,}280$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The concentration halves every $3$ days, so going back $3$ days doubles it: $2\\times320=640$.\n\n**The Full Solution:**\n\nStep 1: Divide consecutive entries: $\\frac{160}{320}=\\frac{1}{2}$, $\\frac{80}{160}=\\frac{1}{2}$, and $\\frac{40}{80}=\\frac{1}{2}$, so each $3$-day step multiplies the concentration by $\\frac{1}{2}$.\n\nStep 2: Moving backwards in time reverses that step, multiplying by $2$.\n\nStep 3: Three days before the first measurement the concentration was $320\\times2=640$ micrograms per kilogram. Check: halving $640$ once gives $320$, the entry at $t=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($160$): moves forward $3$ days instead of backward.\n* Choice B ($480$): treats the decay as linear and adds the difference $160$ to $320$.\n* Choice D ($1{,}280$): goes back two steps, a total of $6$ days.\n\n**Test Day Takeaway:** Going backwards through exponential data means dividing by the growth factor — here, multiplying by $2$ — exactly once per period.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-224",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The number of registered users of a scheduling app is an exponential function of time. The table gives the number of registered users $t$ years from now for three values of $t$. How many registered users did the app have two years ago?",
    diagram: { type: "dataTable", params: { headers: ["t (years from now)", "Registered users"], rows: [["0", "200"], ["1", "400"], ["2", "800"]] } },
    choices: [
      // distractor: steps back three years instead of two
      { id: "A", text: "$25$" },
      { id: "B", text: "$50$" },
      // distractor: steps back only one year
      { id: "C", text: "$100$" },
      // distractor: moves one year forward instead of two years back
      { id: "D", text: "$400$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The table doubles each year, so two years back halves twice: $200 \\to 100 \\to 50$.\n\n**The Full Solution:**\nStep 1: From the table, $\\dfrac{400}{200} = 2$ and $\\dfrac{800}{400} = 2$, so the number of users doubles each year and the model is $U(t) = 200(2)^t$.\nStep 2: Two years ago is $t = -2$, so $U(-2) = 200(2)^{-2} = \\dfrac{200}{4}$.\nStep 3: $U(-2) = 50$ users. Check forward: $50 \\to 100 \\to 200$, matching the $t = 0$ row. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): divides by $2$ three times, reaching three years ago.\n* Choice C ($100$): divides by $2$ once, reaching one year ago.\n* Choice D ($400$): reads the $t = 1$ row, moving forward in time.\n\n**Test Day Takeaway:** A negative input is just the model run backward — divide by the growth factor once for each unit before $t = 0$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-225",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The number of active listings on an online marketplace has increased by $50\\%$ every $2$ years, and there are $6{,}750$ active listings today. How many active listings were there $6$ years ago?",
    choices: [
      { id: "A", text: "$2{,}000$" },
      // distractor: undoes only two of the three growth periods
      { id: "B", text: "$3{,}000$" },
      // distractor: subtracts 50% of today's count
      { id: "C", text: "$3{,}375$" },
      // distractor: undoes only one growth period
      { id: "D", text: "$4{,}500$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Six years hold three $2$-year periods, so divide by $1.5$ three times: $6{,}750 \\div 3.375 = 2{,}000$.\n\n**The Full Solution:**\nStep 1: A $50\\%$ increase multiplies by $1.5$, and $6 \\div 2 = 3$ periods have passed.\nStep 2: If $L$ is the count $6$ years ago, then $L(1.5)^3 = 6{,}750$, and $(1.5)^3 = 3.375$.\nStep 3: $L = \\dfrac{6{,}750}{3.375} = 2{,}000$ listings. Check forward: $2{,}000 \\to 3{,}000 \\to 4{,}500 \\to 6{,}750$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($3{,}000$): divides by $1.5$ twice, reaching only $4$ years ago.\n* Choice C ($3{,}375$): halves today's count, treating \"increased by $50\\%$\" as \"doubled.\"\n* Choice D ($4{,}500$): divides by $1.5$ once, reaching $2$ years ago.\n\n**Test Day Takeaway:** When the growth period is not one year, convert the elapsed time into periods FIRST — here $6$ years is three periods, so the multiplier is $(1.5)^3$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-226",
    domain: "advanced-math",
    skills: ["exponential-functions", "exponential-growth-decay"],
    difficulty: "hard",
    type: "fill-in",
    question: "The activity of a radioactive tracer decays exponentially with a half-life of $12$ hours. The activity of the tracer is now $5$ units. How many hours ago was the activity of the tracer $320$ units?",
    correctAnswer: "72",
    explanation: "**SAT Pattern: Reverse Exponential Back in Time**\n\n**The correct answer is $72$.**\n\n**The Fast Way (~30s):** $320 \\div 5 = 64 = 2^6$, so six half-lives have passed: $6 \\cdot 12 = 72$ hours.\n\n**The Full Solution:**\nStep 1: Each half-life divides the activity by $2$, so the number of half-lives $n$ satisfies $320 \\cdot \\left(\\frac{1}{2}\\right)^n = 5$.\nStep 2: Rearranging gives $2^n = \\dfrac{320}{5} = 64$, so $n = 6$.\nStep 3: Six half-lives of $12$ hours each is $6 \\cdot 12 = 72$ hours. Check: $320 \\to 160 \\to 80 \\to 40 \\to 20 \\to 10 \\to 5$, six halvings. $\\checkmark$\n\n**Common Mistakes:** Answering $6$, the number of half-lives, without multiplying by the $12$-hour period. Answering $64$, the factor by which the activity fell, as if it were a time.\n\n**Test Day Takeaway:** Turn the ratio into a power of the decay factor, read the exponent as a COUNT of periods, then multiply by the length of one period.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reverse-exponential-back-in-time",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── FUNCTION FROM SHIFTED GRAPH (bank-am-227..234) ───────────────────────
  // Reverse direction of `function-transformation`: given a description of
  // y = f(x + h) or y = f(x) + k, recover f. CB precedent: PT11-M1-Q23.
  // See audit §B5.
  {
    id: "bank-am-227",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A reservoir's level, in centimeters relative to the spillway lip, is graphed against the number of hours $x$ since a release ended. The graphed line is $y=f(x)+k$, where $f(x)=2x$ and $k$ is a constant. Which equation gives the graphed line?",
    diagram: { type: "linearGraph", params: { slope: 2, yIntercept: -6, xRange: [0, 10], yRange: [-8, 14], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showPoints: [[0, -6], [3, 0]] } },
    choices: [
      // distractor: shifts the input instead of the output, giving the line y = 2x - 12
      { id: "A", text: "$y=2(x-6)$" },
      // distractor: negates the slope as well as the constant
      { id: "B", text: "$y=6-2x$" },
      // distractor: shifts the parent line up 6 instead of down 6
      { id: "C", text: "$y=2x+6$" },
      { id: "D", text: "$y=2x-6$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Adding $k$ to $f(x)=2x$ only moves the line vertically; the graph crosses the vertical axis at $-6$, so $k=-6$ and the line is $y=2x-6$.\n\n**The Full Solution:**\nStep 1: The graph of $y=f(x)+k$ is the graph of $y=2x$ translated $k$ units vertically, so the slope stays 2.\nStep 2: The parent line $y=2x$ passes through the origin, while the graphed line meets the vertical axis at $-6$, so $k=-6$.\nStep 3: The equation is $y=2x-6$. Check: at $x=3$ the equation gives $0$, and the graph crosses the horizontal axis at $x=3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y=2(x-6)$): subtracts 6 from the input, which puts the vertical intercept at $-12$.\n* Choice B ($y=6-2x$): reverses the slope, giving a line that falls instead of rises.\n* Choice C ($y=2x+6$): translates up 6 rather than down 6.\n\n**Test Day Takeaway:** Adding a constant to a function moves its graph vertically only — read the new vertical intercept to get the constant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-228",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The figure shows a parabola in the $xy$-plane whose equation has the form $y=(x-h)^{2}+k$, where $h$ and $k$ are constants and the curve opens upward. Which equation gives that parabola?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, -4], a: 1, showPoints: [[1, 0], [5, 0]], showVertex: true } },
    choices: [
      { id: "A", text: "$y=(x-3)^{2}-4$" },
      // distractor: reads the vertex's x-coordinate as -3, putting the vertex at (-3, -4)
      { id: "B", text: "$y=(x+3)^{2}-4$" },
      // distractor: reads the vertex's y-coordinate as +4 instead of -4
      { id: "C", text: "$y=(x-3)^{2}+4$" },
      // distractor: swaps h and k, placing the vertex at (4, -3)
      { id: "D", text: "$y=(x-4)^{2}-3$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The lowest point sits at $(3,-4)$, so $h=3$ and $k=-4$, giving $y=(x-3)^{2}+(-4)$.\n\n**The Full Solution:**\nStep 1: In $y=(x-h)^{2}+k$ the vertex is $(h,k)$, the point where the curve turns.\nStep 2: The drawn curve turns at $(3,-4)$, so $h=3$ and $k=-4$.\nStep 3: Substituting gives $y=(x-3)^{2}-4$. Check: at $x=1$ this gives $4-4=0$, matching the marked point $(1,0)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($y=(x+3)^{2}-4$): flips the sign inside the parentheses, moving the vertex to $x=-3$.\n* Choice C ($y=(x-3)^{2}+4$): flips the sign of the vertical shift, lifting the vertex above the horizontal axis.\n* Choice D ($y=(x-4)^{2}-3$): swaps the two constants, placing the vertex at $(4,-3)$.\n\n**Test Day Takeaway:** In vertex form the number subtracted from $x$ is the vertex's horizontal coordinate — the sign you see is the opposite of the shift.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-229",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An engineer translates the graph of $y=f(x)$ six units right; the translated curve reaches its minimum at $(10,-3)$. Before the translation, at what value of $x$ did the curve reach its minimum?",
    choices: [
      // distractor: reports the y-coordinate of the minimum instead of the x-coordinate
      { id: "A", text: "$-3$" },
      { id: "B", text: "$4$" },
      // distractor: reports the translated minimum's x-coordinate, ignoring the shift
      { id: "C", text: "$10$" },
      // distractor: adds 6 instead of subtracting, translating right a second time
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** A right shift of 6 moved the minimum to $x=10$, so before the shift it sat at $10-6=4$.\n\n**The Full Solution:**\nStep 1: Translating a graph six units right replaces each point $(p,q)$ with $(p+6,q)$.\nStep 2: The image of the minimum is $(10,-3)$, so its preimage satisfies $p+6=10$.\nStep 3: Therefore $p=4$. Check: shifting $(4,-3)$ six units right does land on $(10,-3)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): gives the minimum's $y$-coordinate, which a horizontal shift never changes.\n* Choice C ($10$): reports the position after the translation rather than before it.\n* Choice D ($16$): shifts right again instead of undoing the shift.\n\n**Test Day Takeaway:** To undo a horizontal translation, move the given point back by the same amount — vertical coordinates are untouched.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-230",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A storm-drain gate is recalibrated so that its flow model $g$ reaches every flow value exactly 3 hours later than the original model $f$ does. Which equation relates $g$ and $f$?",
    choices: [
      // distractor: raises every flow value by 3 instead of delaying the model by 3 hours
      { id: "A", text: "$g(t)=f(t)+3$" },
      // distractor: lowers every flow value by 3, a vertical change rather than a delay
      { id: "B", text: "$g(t)=f(t)-3$" },
      // distractor: moves the model 3 hours earlier instead of 3 hours later
      { id: "C", text: "$g(t)=f(t+3)$" },
      { id: "D", text: "$g(t)=f(t-3)$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** A delay moves the graph right, and a right shift of 3 replaces $t$ with $t-3$.\n\n**The Full Solution:**\nStep 1: 'Three hours later' means the flow that $f$ reaches at time $t$ is the flow $g$ reaches at time $t+3$.\nStep 2: So $g(t+3)=f(t)$; replacing $t$ with $t-3$ gives $g(t)=f(t-3)$.\nStep 3: The relation is $g(t)=f(t-3)$. Check: if $f$ peaks at $t=2$, then $g(5)=f(2)$, so $g$ peaks three hours later ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($g(t)=f(t)+3$): adds 3 to the flow, a vertical shift, not a delay.\n* Choice B ($g(t)=f(t)-3$): lowers the flow by 3 instead of moving the model in time.\n* Choice C ($g(t)=f(t+3)$): shifts the graph left, making the model run three hours early.\n\n**Test Day Takeaway:** A later event shifts a graph right, and a right shift always subtracts inside the function.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-231",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The figure shows the graph of $y=f(x)$, and a firmware update raises every output by 5, producing the function $g$ with $g(x)=f(x)+5$. Which equation defines $g$?",
    diagram: { type: "absoluteValue", params: { vertex: [2, -3], slope: 1, showPoints: [[-1, 0], [5, 0]] } },
    choices: [
      // distractor: flips the sign inside the absolute value, moving the vertex to x = -2
      { id: "A", text: "$g(x)=|x+2|+2$" },
      { id: "B", text: "$g(x)=|x-2|+2$" },
      // distractor: subtracts 5 from f instead of adding it, giving a vertex at (2, -8)
      { id: "C", text: "$g(x)=|x-2|-8$" },
      // distractor: applies the 5 to the input instead of the output: f(x + 5) = |x + 3| - 3
      { id: "D", text: "$g(x)=|x+3|-3$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The drawn graph is $f(x)=|x-2|-3$, so adding 5 raises the vertex to $(2,2)$: $g(x)=|x-2|+2$.\n\n**The Full Solution:**\nStep 1: The graph has a V with its corner at $(2,-3)$ and arms of slope $\\pm 1$, so $f(x)=|x-2|-3$.\nStep 2: Adding 5 to every output raises the whole graph 5 units: $g(x)=|x-2|-3+5$.\nStep 3: Simplifying gives $g(x)=|x-2|+2$. Check: $f(5)=0$ from the graph, and $g(5)=3=0+5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($g(x)=|x+2|+2$): reads the corner at $x=-2$, reversing the sign inside the bars.\n* Choice C ($g(x)=|x-2|-8$): subtracts 5 instead of adding it.\n* Choice D ($g(x)=|x+3|-3$): adds the 5 inside the function, computing $f(x+5)$ instead of $f(x)+5$.\n\n**Test Day Takeaway:** Adding a constant to a function moves the whole graph up; the horizontal position of the corner does not change.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-232",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "medium",
    type: "fill-in",
    question: "The function $R$ gives ticket revenue, in dollars, for a show with $x$ seats sold, and $R(150)=3{,}200$. A second show's revenue function $S$ satisfies $S(x)=R(x-40)+500$. What is the value of $S(190)$?",
    correctAnswer: "3700",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**The correct answer is $3700$.**\n\n**The Fast Way (~20s):** $S(190)=R(190-40)+500=R(150)+500=3{,}200+500=3{,}700$.\n\n**The Full Solution:**\nStep 1: The rule shifts the input by 40, so $S(190)=R(150)+500$.\nStep 2: The given value $R(150)=3{,}200$ is exactly the revenue needed.\nStep 3: Add the vertical shift: $3{,}200+500=3{,}700$ dollars. Check: the second show sells 40 more seats to earn the first show's revenue, plus a flat 500 dollars ✓\n\n**Common Mistakes:** Adding 40 to the input gives $R(230)$, a value the problem never supplies. Dropping the constant leaves 3,200. Applying the 40 to the revenue instead of the seat count gives $3{,}200-40+500=3{,}660$.\n\n**Test Day Takeaway:** In $f(x-h)+k$ the shift $h$ acts on the input before the function runs, and $k$ acts on the output afterward.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-233",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The V-shaped graph of $y = f(x)$ in the $xy$-plane is shown. The function $g$ is defined so that the graph of $y = g(x)$ is the graph of $y = f(x)$ shifted $4$ units left and $1$ unit up. Which of the following defines $g$?",
    diagram: { type: "absoluteValue", params: { vertex: [2, -3], slope: 1 } },
    choices: [
      // distractor: shifts $4$ units right instead of left
      { id: "A", text: "$g(x) = |x - 6| - 2$" },
      // distractor: shifts $1$ unit down instead of up
      { id: "B", text: "$g(x) = |x + 2| - 4$" },
      { id: "C", text: "$g(x) = |x + 2| - 2$" },
      // distractor: puts the shift $4$ inside the bars instead of combining it with the original $-2$
      { id: "D", text: "$g(x) = |x + 4| - 2$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The graph gives $f(x) = |x - 2| - 3$; moving left $4$ and up $1$ sends the vertex $(2, -3)$ to $(-2, -2)$, so $g(x) = |x + 2| - 2$.\n\n**The Full Solution:**\nStep 1: The graph is a V with vertex $(2, -3)$ and sides of slope $1$ and $-1$, so $f(x) = |x - 2| - 3$.\nStep 2: Shifting left $4$ units replaces $x$ with $x + 4$: $f(x + 4) = |x + 4 - 2| - 3 = |x + 2| - 3$.\nStep 3: Shifting up $1$ unit adds $1$: $g(x) = |x + 2| - 3 + 1 = |x + 2| - 2$. Check the vertex: $g(-2) = 0 - 2 = -2$, and $(-2, -2)$ is $(2, -3)$ moved left $4$ and up $1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($|x - 6| - 2$): vertex $(6, -2)$ — the horizontal shift went right.\n* Choice B ($|x + 2| - 4$): vertex $(-2, -4)$ — the vertical shift went down.\n* Choice D ($|x + 4| - 2$): vertex $(-4, -2)$ — it writes the shift $4$ inside the bars instead of applying it to the vertex's $x$-coordinate of $2$.\n\n**Test Day Takeaway:** Write the parent equation from the vertex first, then substitute — combining $x + 4$ with the existing $-2$ is what turns $|x - 2|$ into $|x + 2|$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-234",
    domain: "advanced-math",
    skills: ["function-transformations", "function-interpretation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The functions $f$ and $g$ are defined for every real number $x$, and they are related by $g(x)=f(x+7)-4$. The greatest value taken by $f$ is $M$, and $f$ attains it when $x=a$. Which statement about $g$ must be true?",
    choices: [
      // distractor: shifts the input right instead of left, reading x + 7 as a delay
      { id: "A", text: "The greatest value of $g$ is $M-4$, and it occurs when $x=a+7$." },
      // distractor: applies the horizontal shift but ignores the 4 subtracted from every output
      { id: "B", text: "The greatest value of $g$ is $M$, and it occurs when $x=a-7$." },
      { id: "C", text: "The greatest value of $g$ is $M-4$, and it occurs when $x=a-7$." },
      // distractor: subtracts both 7 and 4 from the maximum value, treating the horizontal shift as vertical
      { id: "D", text: "The greatest value of $g$ is $M-11$, and it occurs when $x=a-7$." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function from Shifted Graph**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** $g$ is greatest when its inner input equals $a$, so $x+7=a$ and $x=a-7$; the output there is $M-4$.\n\n**The Full Solution:**\nStep 1: The outputs of $g$ are outputs of $f$ lowered by 4, so the greatest value of $g$ is $M-4$.\nStep 2: That greatest value occurs where $f$ is evaluated at $a$, that is, where $x+7=a$.\nStep 3: Solving gives $x=a-7$, so the maximum of $g$ is $M-4$ at $x=a-7$. Check: with $f(x)=-x^{2}$, $M=0$ at $a=0$, and $g(x)=-(x+7)^{2}-4$ peaks at $-4$ when $x=-7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: reads $x+7$ as a shift to the right; adding inside the function moves the graph left.\n* Choice B: tracks the horizontal shift but leaves the maximum value unchanged.\n* Choice D: subtracts the horizontal shift from the maximum value as well, giving $M-11$.\n\n**Test Day Takeaway:** Inside the function, changes move the graph horizontally and in the opposite direction; outside, they move it vertically in the direction written.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── TANGENT LINE WITH PARAMETER — FIND X (bank-am-235..238) ──────────────
  // CB PT4-M1-Q24 variant: asks for the x-COORDINATE at the tangent point
  // (not the parameter). Same SAT Pattern as `tangent-line-and-discriminant`,
  // adding 4 items to ensure both directions of the question are covered.
  // See audit §B7.
  {
    id: "bank-am-235",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "medium",
    type: "fill-in",
    question: "A flooring supplier's weekly shipments of hardwood sample tiles follow $y=x^2+2x+c$ for a constant $c$, and the line $y=4x+1$ shares a single point with that graph. What is the $y$-coordinate of the shared point?",
    correctAnswer: "5",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~30s):** Equating gives $x^2-2x+(c-1)=0$, whose double root is $x=1$; substituting into $y=4x+1$ gives $y=5$.\n\n**The Full Solution:**\nStep 1: Set $x^2+2x+c=4x+1$, which rearranges to $x^2-2x+(c-1)=0$.\nStep 2: A single shared point is a double root, located at $x=-\\frac{-2}{2(1)}=1$.\nStep 3: Put $x=1$ into the line: $y=4(1)+1=5$. Check: a double root at $1$ makes the quadratic $(x-1)^2$, so $c-1=1$ and $c=2$; then $y=1+2+2=5$ on the curve as well ✓\n\n**Common Mistakes:**\n* $1$: reports the $x$-coordinate of the shared point instead of the $y$-coordinate.\n* $4$: reports the slope of the line.\n* $3$: substitutes $x=1$ into $y=2x+1$, mixing the curve's linear term with the line.\n\n**Test Day Takeaway:** Find the tangency input from $-\\frac{b}{2a}$ of the difference quadratic, then read the output off the line — it is the easier of the two equations.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-236",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A pottery studio's weekly output of ceramic planters above its minimum run is modeled by the quadratic function $f$ whose graph is shown. The line $y=2x-7$ touches that graph at exactly one point. What is the $x$-coordinate of the point of contact?",
    diagram: { type: "parabola", params: { vertex: { h: 1, k: -4 }, a: 1, xRange: [-6, 8], yRange: [-6, 10], showVertex: false, highlightPoints: [[-1, 0], [1, -4], [3, 0]], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, label: "y = f(x)" } },
    choices: [
      // distractor: reports the y-intercept of the parabola
      { id: "A", text: "$-3$" },
      // distractor: reports the axis of symmetry of f
      { id: "B", text: "$1$" },
      { id: "C", text: "$2$" },
      // distractor: uses -b instead of -b/(2a) in x^2 - 4x + 4 = 0
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The graph is $f(x)=(x-1)^2-4=x^2-2x-3$; setting it equal to $2x-7$ gives $(x-2)^2=0$, so $x=2$.\n\n**The Full Solution:**\nStep 1: Read the vertex $(1,-4)$ and the $x$-intercepts $-1$ and $3$ from the figure, so $f(x)=(x-1)^2-4=x^2-2x-3$.\nStep 2: Set $x^2-2x-3=2x-7$, which rearranges to $x^2-4x+4=0$.\nStep 3: Factor: $(x-2)^2=0$, so $x=2$. Check: $f(2)=4-4-3=-3$ and $2(2)-7=-3$, the same point ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): reports the parabola's $y$-intercept instead of an $x$-coordinate.\n* Choice B ($1$): reports the axis of symmetry of $f$, not of the difference quadratic.\n* Choice D ($4$): uses $-b=4$ instead of $-\\frac{b}{2a}=2$ in $x^2-4x+4=0$.\n\n**Test Day Takeaway:** The contact point belongs to the difference quadratic, whose axis of symmetry is generally not the original parabola's.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-237",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A wind farm's cost curve is modeled by $y=ax^2+2x+3$ for a nonzero constant $a$, and its revenue line by $y=10x-1$. The line is tangent to the curve. What is the value of $a$?",
    choices: [
      // distractor: solves 64 + 16a = 0 after mis-signing the constant term
      { id: "A", text: "$-4$" },
      { id: "B", text: "$4$" },
      // distractor: computes the constant term as 3 - 1 = 2, giving 64 - 8a = 0
      { id: "C", text: "$8$" },
      // distractor: uses ac instead of 4ac, solving 64 = 4a
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Equating gives $ax^2-8x+4=0$; tangency forces $64-16a=0$, so $a=4$.\n\n**The Full Solution:**\nStep 1: Set $ax^2+2x+3=10x-1$, which rearranges to $ax^2-8x+4=0$ since $3-(-1)=4$.\nStep 2: Tangency means the discriminant is $0$: $(-8)^2-4(a)(4)=0$, or $64-16a=0$.\nStep 3: Solve: $a=4$. Check: $4x^2-8x+4=4(x-1)^2=0$ has the single solution $x=1$, where both graphs give $y=9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): mis-signs the constant term and solves $64+16a=0$.\n* Choice C ($8$): computes the constant as $3-1=2$, producing $64-8a=0$.\n* Choice D ($16$): uses $ac$ in place of $4ac$, solving $64=4a$.\n\n**Test Day Takeaway:** Subtracting a line changes only the linear and constant terms — recheck the constant's sign before applying $b^2-4ac=0$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-238",
    domain: "advanced-math",
    skills: ["tangent-lines", "discriminant-analysis"],
    difficulty: "hard",
    type: "fill-in",
    question: "A desalination plant's brine concentration is modeled by $y=x^2-6x+11$ and its permitted ceiling by the line $y=kx+2$, where $k$ is a constant. The line is tangent to the curve for exactly two values of $k$. What is the sum of those two values?",
    correctAnswer: "-12",
    explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $-12$.**\n\n**The Fast Way (~40s):** Equating gives $x^2-(6+k)x+9=0$, so $(6+k)^2=36$ and $k=0$ or $k=-12$; the sum is $-12$.\n\n**The Full Solution:**\nStep 1: Set $x^2-6x+11=kx+2$, which rearranges to $x^2-(6+k)x+9=0$.\nStep 2: Tangency means $(6+k)^2-4(1)(9)=0$, so $(6+k)^2=36$ and $6+k=\\pm6$.\nStep 3: That gives $k=0$ and $k=-12$, whose sum is $-12$. Check: $k=0$ makes $x^2-6x+9=(x-3)^2=0$, and $k=-12$ makes $x^2+6x+9=(x+3)^2=0$ — both single solutions ✓\n\n**Common Mistakes:**\n* $0$: finds $k=0$ first and reports it, missing the second value.\n* $12$: solves $6+k=\\pm6$ but reads the roots as $0$ and $12$.\n* $-6$: sets $(6+k)^2=0$ rather than $(6+k)^2=36$.\n\n**Test Day Takeaway:** \"Exactly two values of the constant\" is the signal that the discriminant equation is itself a square — expect a $\\pm$ and answer for both.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-and-discriminant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── VERTICAL SHIFT (bank-am-239..246) ───────────────────────────────────
  // y = f(x) + k shifts vertically. Distinct from horizontal shift,
  // reflection, and vertical stretch in METHOD (you add/subtract k from y).
  {
    id: "bank-am-239",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A media services office recorded $f(x)$, the number of lecture-capture video views above a course average, on four class days. Adding a caption track raised every one of these counts by $6$, giving $g(x)=f(x)+6$. What is the value of $g(2)$?",
    diagram: { type: "dataTable", params: { headers: ["Class day (x)", "f(x)"], rows: [["0", "7"], ["1", "3"], ["2", "-2"], ["3", "6"]] } },
    choices: [
      // distractor: subtracts 6 instead of adding it
      { id: "A", text: "$-8$" },
      // distractor: reports f(2) without applying the shift
      { id: "B", text: "$-2$" },
      { id: "C", text: "$4$" },
      // distractor: applies the shift to the x = 0 row instead of the x = 2 row
      { id: "D", text: "$13$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** The table gives $f(2)=-2$, so $g(2)=-2+6=4$.\n\n**The Full Solution:**\nStep 1: Find the row with $x=2$ in the table: $f(2)=-2$.\nStep 2: Apply the rule $g(x)=f(x)+6$ at $x=2$: $g(2)=f(2)+6$.\nStep 3: Compute: $-2+6=4$. Check: every output rises by $6$, so the four values of $g$ are $13$, $9$, $4$, and $12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): subtracts $6$ instead of adding it.\n* Choice B ($-2$): reports $f(2)$ and never applies the shift.\n* Choice D ($13$): applies the shift to the $x=0$ row instead of the $x=2$ row.\n\n**Test Day Takeaway:** Adding a constant outside the function changes only the outputs — locate the right row first, then shift.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-240",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $f$ gives the indoor temperature, in degrees Fahrenheit, at a smart thermostat $t$ hours after midnight. A new setpoint raises every one of these temperatures by $3$ degrees. Which function gives the new temperature $t$ hours after midnight?",
    choices: [
      // distractor: multiplies each temperature by 3 rather than adding 3
      { id: "A", text: "$g(t)=3f(t)$" },
      // distractor: lowers each temperature by 3 instead of raising it
      { id: "B", text: "$g(t)=f(t)-3$" },
      // distractor: shifts the time by 3 hours instead of the temperature
      { id: "C", text: "$g(t)=f(t+3)$" },
      { id: "D", text: "$g(t)=f(t)+3$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** Raising every output by $3$ adds $3$ outside the function: $g(t)=f(t)+3$.\n\n**The Full Solution:**\nStep 1: The outputs of $f$ are temperatures; the new setpoint changes those outputs, not the times.\nStep 2: Adding a constant outside the function raises every output by that constant.\nStep 3: So $g(t)=f(t)+3$. Check: if the temperature at $t=6$ was $68$, the new one is $71=f(6)+3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($g(t)=3f(t)$): multiplies each temperature by $3$ instead of adding $3$.\n* Choice B ($g(t)=f(t)-3$): lowers each temperature by $3$.\n* Choice C ($g(t)=f(t+3)$): shifts the clock by $3$ hours instead of changing the temperature.\n\n**Test Day Takeaway:** Changes to outputs live outside the parentheses; changes to inputs live inside them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-241",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives $f(x)$, the number of laboratory notebook pages filed above a lab's weekly quota, for four weeks $x$. The function $h$ is defined by $h(x)=f(x)+k$ for a constant $k$, and $h(2)=-6$. What is the value of $h(4)$?",
    diagram: { type: "dataTable", params: { headers: ["Week (x)", "f(x)"], rows: [["1", "9"], ["2", "1"], ["3", "-3"], ["4", "5"]] } },
    choices: [
      // distractor: applies k to f(3) = -3 instead of f(4) = 5
      { id: "A", text: "$-10$" },
      { id: "B", text: "$-2$" },
      // distractor: uses k = -6 straight from h(2) = -6 without subtracting f(2)
      { id: "C", text: "$-1$" },
      // distractor: reports f(4) without applying k
      { id: "D", text: "$5$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $h(2)=f(2)+k=1+k=-6$ gives $k=-7$, so $h(4)=5-7=-2$.\n\n**The Full Solution:**\nStep 1: The table gives $f(2)=1$, and $h(2)=f(2)+k$, so $1+k=-6$.\nStep 2: Solve: $k=-7$.\nStep 3: Then $h(4)=f(4)+k=5+(-7)=-2$. Check: the same shift sends $f(1)=9$ to $h(1)=2$ and $f(3)=-3$ to $h(3)=-10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$): applies the shift to $f(3)=-3$ instead of $f(4)=5$.\n* Choice C ($-1$): takes $k=-6$ straight from $h(2)=-6$ without subtracting $f(2)=1$.\n* Choice D ($5$): reports $f(4)$ without applying the shift at all.\n\n**Test Day Takeaway:** One known output pins the shift constant; after that every other output moves by the same amount.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-242",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "fill-in",
    question: "The function $f$ is defined by $f(x)=x^2-6x+2$, and a cataloguer models map-collection entries above an annual target by $g(x)=f(x)+k$ for a constant $k$. Given that the smallest value of $g$ is $5$, what is the value of $k$?",
    correctAnswer: "12",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~30s):** The least value of $f$ is $f(3)=-7$; a vertical shift moves it to $-7+k=5$, so $k=12$.\n\n**The Full Solution:**\nStep 1: The vertex of $f$ is at $x=-\\frac{-6}{2}=3$, and $f(3)=9-18+2=-7$, so the least value of $f$ is $-7$.\nStep 2: Adding $k$ raises every output by $k$, so the least value of $g$ is $-7+k$.\nStep 3: Set $-7+k=5$, giving $k=12$. Check: $g(x)=x^2-6x+14$ has $g(3)=9-18+14=5$ ✓\n\n**Common Mistakes:**\n* $3$: treats the constant term $2$ as the least value of $f$, giving $k=3$.\n* $-12$: reverses the subtraction, solving $-7-k=5$.\n* $2$: reports $f$'s constant term instead of the shift.\n\n**Test Day Takeaway:** Find the original extreme value first — a vertical shift moves it by exactly the added constant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-243",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $q$ is defined by $q(x) = x^3 - 2x$. In the $xy$-plane, the graph of which function is the graph of $y = q(x)$ shifted down $8$ units?",
    choices: [
      // distractor: replaces $x$ with $x + 8$, a shift left
      { id: "A", text: "$y = (x + 8)^3 - 2(x + 8)$" },
      // distractor: adds $8$, a shift up
      { id: "B", text: "$y = x^3 - 2x + 8$" },
      { id: "C", text: "$y = x^3 - 2x - 8$" },
      // distractor: replaces $x$ with $x - 8$, a shift right
      { id: "D", text: "$y = (x - 8)^3 - 2(x - 8)$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Down $8$ means subtract $8$ from the whole output: $q(x) - 8 = x^3 - 2x - 8$.\n\n**The Full Solution:**\nStep 1: A shift down by $k$ units replaces $y = q(x)$ with $y = q(x) - k$. Here $k = 8$.\nStep 2: Substituting the rule for $q$ gives $y = (x^3 - 2x) - 8$, or $y = x^3 - 2x - 8$.\nStep 3: Check with a point. $q(0) = 0$, so $(0, 0)$ is on the original graph; the shifted graph should contain $(0, -8)$, and $0^3 - 2(0) - 8 = -8$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = (x + 8)^3 - 2(x + 8)$): changing the INPUT to $x + 8$ shifts the graph $8$ units left, not down.\n* Choice B ($y = x^3 - 2x + 8$): the sign is reversed; $+8$ raises the graph $8$ units.\n* Choice D ($y = (x - 8)^3 - 2(x - 8)$): changing the input to $x - 8$ shifts the graph $8$ units right.\n\n**Test Day Takeaway:** Outside the function means vertical; inside the function means horizontal. Down $8$ is the outside operation $-8$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-244",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $C$ gives the daily cost, in dollars, of running a district heating loop when the outdoor temperature is $x$ degrees Celsius, and the graph of $y=C(x)$ passes through $(12,95)$. The function $D$ is defined by $D(x)=C(x)-18$. Which point must lie on the graph of $y=D(x)$?",
    choices: [
      // distractor: shifts the x-coordinate left by 18 instead of shifting the output down
      { id: "A", text: "$(-6,95)$" },
      { id: "B", text: "$(12,77)$" },
      // distractor: adds 18 to the output instead of subtracting it
      { id: "C", text: "$(12,113)$" },
      // distractor: shifts the x-coordinate right by 18 instead of shifting the output down
      { id: "D", text: "$(30,95)$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Subtracting $18$ outside the function lowers every output by $18$, so $(12,95)$ becomes $(12,77)$.\n\n**The Full Solution:**\nStep 1: $C(12)=95$ because $(12,95)$ is on the graph of $y=C(x)$.\nStep 2: The rule $D(x)=C(x)-18$ subtracts $18$ from each output while leaving the input unchanged.\nStep 3: So $D(12)=95-18=77$, and $(12,77)$ is on the graph of $y=D(x)$. Check: reversing the shift gives $D(12)+18=95=C(12)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-6,95)$): shifts the input left by $18$ instead of lowering the output.\n* Choice C ($(12,113)$): adds $18$ to the output instead of subtracting it.\n* Choice D ($(30,95)$): shifts the input right by $18$.\n\n**Test Day Takeaway:** A constant subtracted outside the function moves points straight down — the $x$-coordinate never changes.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-245",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A tidal barrage generator's output above its rated minimum is modeled by the quadratic function $f$ whose graph is shown. The function $g$ is defined by $g(x)=f(x)+c$ for a constant $c$. For what value of $c$ does the graph of $y=g(x)$ touch the $x$-axis at exactly one point?",
    diagram: { type: "quadraticVertex", params: { vertex: [-2, -4], a: 1, showVertex: true, showPoints: [[-4, 0], [0, 0]] } },
    choices: [
      // distractor: lowers the vertex to -8 instead of raising it to 0
      { id: "A", text: "$-4$" },
      // distractor: assumes the graph already meets the axis once, though it crosses twice
      { id: "B", text: "$0$" },
      // distractor: halves the depth of the vertex below the axis
      { id: "C", text: "$2$" },
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The vertex sits at $(-2,-4)$; a graph touches the $x$-axis once only when its vertex is on the axis, so $c$ must raise $-4$ to $0$, giving $c=4$.\n\n**The Full Solution:**\nStep 1: Read the vertex of $f$ from the graph: $(-2,-4)$, and note the parabola opens upward.\nStep 2: Adding $c$ moves the vertex to $(-2,-4+c)$ without changing its shape. An upward parabola meets the $x$-axis exactly once only when its vertex lies on that axis.\nStep 3: Set $-4+c=0$, so $c=4$. Check: $f(x)=(x+2)^2-4$ gives $g(x)=(x+2)^2$, whose only zero is $x=-2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): lowers the vertex to $-8$, leaving two $x$-intercepts.\n* Choice B ($0$): assumes the graph already meets the axis once, but as drawn it crosses at $-4$ and $0$.\n* Choice C ($2$): raises the vertex only halfway, to $-2$, so the graph still crosses twice.\n\n**Test Day Takeaway:** Exactly one $x$-intercept means the vertex is on the axis — set the shifted vertex output to zero.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-246",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "fill-in",
    question: "The minimum value of the function $p$ is $-4$, and $p(5) = 12$. The function $q$ is defined by $q(x) = p(x) + n$, where $n$ is a constant, and the minimum value of $q$ is $9$. What is the value of $q(5)$?",
    correctAnswer: "25",
    explanation: "**SAT Pattern: Vertical Shift**\n\n**The correct answer is $25$.**\n\n**The Fast Way (~30s):** The minimum climbed from $-4$ to $9$, so $n = 13$; every output rises by $13$, and $q(5) = 12 + 13 = 25$.\n\n**The Full Solution:**\nStep 1: Adding the constant $n$ to every output raises the minimum value by exactly $n$, so the minimum of $q$ is $-4 + n$.\nStep 2: Setting $-4 + n = 9$ gives $n = 13$.\nStep 3: Then $q(5) = p(5) + 13 = 12 + 13 = 25$. Check: with $n = 13$ the lowest output of $q$ is $-4 + 13 = 9$, matching the given minimum. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $21$ uses $n = 9$, treating the new minimum as the size of the shift instead of solving $-4 + n = 9$.\n* Answering $13$ stops at the shift $n$ and never evaluates $q$ at $x = 5$.\n* Answering $17$ comes from $n = 9 - 4 = 5$: the shift is $9 - (-4) = 13$, and subtracting a negative ADDS.\n\n**Test Day Takeaway:** A vertical shift changes every output by the same constant, so one known pair of minima pins the shift — then apply that same shift to any other point.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── HORIZONTAL SHIFT (bank-am-247..254) ─────────────────────────────────
  // y = f(x ± h). Counter-intuitive sign: f(x - h) shifts RIGHT, f(x + h) LEFT.
  {
    id: "bank-am-247",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A transit agency models weekday ridership with $f$, where $f(t)$ is the number of riders $t$ hours after midnight, and defines a second model by $g(t)=f(t-8)$. Which statement best compares $g$ with $f$?",
    choices: [
      { id: "A", text: "$g$ reaches each ridership level 8 hours later than $f$ does." },
      // distractor: reads the subtraction inside the function as a shift to the left, that is, earlier
      { id: "B", text: "$g$ reaches each ridership level 8 hours earlier than $f$ does." },
      // distractor: treats the 8 as added to the ridership rather than to the time
      { id: "C", text: "$g$ predicts 8 more riders than $f$ at every hour." },
      // distractor: treats the 8 as subtracted from the ridership rather than from the time
      { id: "D", text: "$g$ predicts 8 fewer riders than $f$ at every hour." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Subtracting inside the function moves the graph right, so every feature of $f$ appears in $g$ eight hours later.\n\n**The Full Solution:**\nStep 1: The rule $g(t)=f(t-8)$ evaluates $f$ at a time eight hours earlier than the time fed to $g$.\nStep 2: So the ridership $f$ shows at time $t$ is the ridership $g$ shows at time $t+8$.\nStep 3: Every ridership level therefore occurs eight hours later under $g$. Check: if $f$ peaks at 8 a.m., then $g(16)=f(8)$, a 4 p.m. peak ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: reads $t-8$ as a shift to the left, which would come from $f(t+8)$.\n* Choice C: attaches the 8 to the output, a vertical shift up.\n* Choice D: attaches the 8 to the output, a vertical shift down.\n\n**Test Day Takeaway:** A subtraction inside the parentheses delays the graph; the sign you see is the opposite of the direction you might expect.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-248",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The graph of $y = f(x)$ in the $xy$-plane has exactly one $x$-intercept, at $x = 4$. The function $g$ is defined by $g(x) = f(x + 7)$. At what value of $x$ does the graph of $y = g(x)$ have its $x$-intercept?",
    choices: [
      // distractor: sets the inside expression equal to $0$, solving $x + 7 = 0$
      { id: "A", text: "$-7$" },
      { id: "B", text: "$-3$" },
      // distractor: copies the intercept of $f$, assuming a horizontal shift leaves it in place
      { id: "C", text: "$4$" },
      // distractor: computes $4 + 7$, shifting right by following the plus sign
      { id: "D", text: "$11$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $g(x) = 0$ when the number handed to $f$ is $4$, so $x + 7 = 4$ and $x = -3$.\n\n**The Full Solution:**\nStep 1: An $x$-intercept of $y = g(x)$ is a value of $x$ with $g(x) = 0$, and $g(x) = f(x + 7)$, so the condition is $f(x + 7) = 0$.\nStep 2: The only input that makes $f$ equal $0$ is $4$, so $x + 7 = 4$, giving $x = -3$.\nStep 3: The graph of $y = g(x)$ has its only $x$-intercept at $x = -3$. Check: $g(-3) = f(-3 + 7) = f(4) = 0$, and the intercept sits $7$ units left of $f$'s, which is what a $+7$ inside the function does. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): this solves $x + 7 = 0$; the inside expression must equal $4$, the input where $f$ is zero, not $0$ itself.\n* Choice C ($4$): this copies $f$'s intercept unchanged, but a constant inside the function moves every input, intercepts included.\n* Choice D ($11$): this computes $4 + 7 = 11$, following the plus sign; a $+7$ inside the parentheses moves the graph LEFT.\n\n**Test Day Takeaway:** Zeros are inputs. Set the inside expression equal to the old zero and solve — that one equation fixes both the direction and the size of the shift.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-249",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An acoustic panel's profile curve is shifted 6 units to the left, and the shifted curve is the graph of $y=(x+2)^{2}$. Which equation defines the profile before the shift?",
    choices: [
      { id: "A", text: "$y=(x-4)^{2}$" },
      // distractor: shifts left again instead of undoing the shift, giving (x + 6 + 2)^2
      { id: "B", text: "$y=(x+8)^{2}$" },
      // distractor: ignores the +2 in the shifted equation and uses the shift alone
      { id: "C", text: "$y=(x-6)^{2}$" },
      // distractor: undoes the shift vertically instead of horizontally
      { id: "D", text: "$y=(x+2)^{2}-6$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Undo a left shift by moving right: replace $x$ with $x-6$ in $(x+2)^{2}$ to get $(x-4)^{2}$.\n\n**The Full Solution:**\nStep 1: Shifting a graph 6 units left replaces $x$ with $x+6$, so the shifted curve is $f(x+6)=(x+2)^{2}$.\nStep 2: Substitute $x-6$ for $x$ on both sides: $f(x)=((x-6)+2)^{2}$.\nStep 3: Simplify: $f(x)=(x-4)^{2}$. Check: shifting $(x-4)^{2}$ left 6 gives $(x+6-4)^{2}=(x+2)^{2}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($y=(x+8)^{2}$): shifts left a second time instead of reversing the shift.\n* Choice C ($y=(x-6)^{2}$): uses the shift amount as the vertex and drops the $+2$.\n* Choice D ($y=(x+2)^{2}-6$): moves the curve down 6 rather than right 6.\n\n**Test Day Takeaway:** To undo a horizontal shift, substitute the opposite shift into the given equation and simplify.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-250",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "fill-in",
    question: "The figure graphs the floor elevation $f$, in centimeters above a benchmark, of a culvert at a distance $x$, in meters, from a reference marker. If $h(x)=f(x+3)$, what is the $x$-coordinate of the vertex of the graph of $y=h(x)$?",
    diagram: { type: "parabola", params: { vertex: { h: -4, k: 1 }, a: 0.5, xRange: [-9, 1], yRange: [0, 14], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showVertex: false } },
    correctAnswer: "-7",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**The correct answer is $-7$.**\n\n**The Fast Way (~20s):** The drawn low point is at $x=-4$; adding 3 inside shifts the graph 3 units left, to $x=-7$.\n\n**The Full Solution:**\nStep 1: The figure shows the turning point of $f$ at $x=-4$.\nStep 2: The vertex of $h$ occurs where the inner input equals $-4$, that is, where $x+3=-4$.\nStep 3: Solving gives $x=-7$ meters. Check: $h(-7)=f(-7+3)=f(-4)$, the low point ✓\n\n**Common Mistakes:** Adding 3 to the vertex gives $-1$, the shift in the wrong direction. Reporting the vertex's height, 1, answers a different question. Leaving the vertex at $-4$ ignores the shift entirely.\n\n**Test Day Takeaway:** Set the expression inside the function equal to the original input, then solve — that is where the transformed feature lands.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-251",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Every input that makes the function $f$ zero is equal to 12, and the function $h$ is defined by $h(x)=f(x+5)$. Which statement about the zeros of $h$ must be true?",
    choices: [
      { id: "A", text: "The only zero of $h$ is $7$." },
      // distractor: shifts the zero right by 5 instead of left
      { id: "B", text: "The only zero of $h$ is $17$." },
      // distractor: leaves the zero unchanged, treating x + 5 as a vertical shift
      { id: "C", text: "The only zero of $h$ is $12$." },
      // distractor: reports the opposite of the shift amount instead of solving x + 5 = 12
      { id: "D", text: "The only zero of $h$ is $-5$." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $h(x)=0$ requires $x+5=12$, so $x=7$.\n\n**The Full Solution:**\nStep 1: The function $f$ is zero only when its input is 12.\nStep 2: $h(x)=f(x+5)$ is zero exactly when the inner input $x+5$ equals 12.\nStep 3: Solving $x+5=12$ gives $x=7$, and no other input works. Check: $h(7)=f(12)=0$, while $h(12)=f(17)\\ne 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($17$): adds 5 to the zero instead of subtracting, shifting the graph the wrong way.\n* Choice C ($12$): keeps the zero unchanged, as if the 5 acted on the output.\n* Choice D ($-5$): reports the shift amount's opposite rather than solving for the input.\n\n**Test Day Takeaway:** Adding inside the function moves every zero left by that amount.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-252",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $f$ gives the number of vehicles queued at a toll plaza $t$ minutes after 6:00 a.m., and a second plaza's queue is $q(t)=f(t-25)$. Given that $f(40)=180$, for what value of $t$ does $q(t)=180$?",
    choices: [
      // distractor: subtracts 25 from 40 instead of adding, shifting the model earlier
      { id: "A", text: "$15$" },
      // distractor: ignores the shift and reports the input used for f
      { id: "B", text: "$40$" },
      { id: "C", text: "$65$" },
      // distractor: adds 25 to the output 180 instead of to the input 40
      { id: "D", text: "$205$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** $q(t)=f(t-25)$ equals 180 when $t-25=40$, so $t=65$.\n\n**The Full Solution:**\nStep 1: The second plaza's queue at time $t$ equals the first plaza's queue 25 minutes earlier.\nStep 2: The first plaza has 180 vehicles at $t=40$, so set $t-25=40$.\nStep 3: Solving gives $t=65$ minutes after 6:00 a.m. Check: $q(65)=f(40)=180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): subtracts 25 from 40, moving the queue 25 minutes early.\n* Choice B ($40$): uses the input for $f$ without applying the delay.\n* Choice D ($205$): adds 25 to the number of vehicles instead of to the time.\n\n**Test Day Takeaway:** A delayed model reaches the same output later — set the inner expression equal to the known input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-253",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The graph of $y = g(x)$ is shown in the $xy$-plane, where $g(x) = f(x + 5)$ for some function $f$. At what value of $x$ does $f$ attain its minimum value?",
    diagram: { type: "quadraticVertex", params: { vertex: [-1, -7], a: 0.6, showVertex: true } },
    choices: [
      // distractor: reports the minimum value instead of where it occurs
      { id: "A", text: "$-7$" },
      // distractor: shifts the wrong way, computing $-1 - 5$
      { id: "B", text: "$-6$" },
      // distractor: reports where $g$ is smallest without undoing the shift
      { id: "C", text: "$-1$" },
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** $g$ bottoms out at $x = -1$, and $g(-1) = f(-1 + 5) = f(4)$, so $f$ bottoms out at $x = 4$.\n\n**The Full Solution:**\nStep 1: From the graph, the lowest point of $y = g(x)$ is $(-1, -7)$, so the smallest output of $g$ is $-7$, produced at $x = -1$.\nStep 2: Since $g(x) = f(x + 5)$, that smallest output is $g(-1) = f(-1 + 5) = f(4)$. The functions $f$ and $g$ take exactly the same set of outputs, so $-7$ is also the smallest output of $f$.\nStep 3: $f$ attains it at the input $4$. Check: $g(-1) = f(4) = -7$, and the graph of $g$ is the graph of $f$ slid $5$ units LEFT, so $f$'s low point sits $5$ units right of $-1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): that is the minimum VALUE read off the graph, not the input that produces it.\n* Choice B ($-6$): this shifts left again ($-1 - 5$); going from $g$ back to $f$ reverses the direction.\n* Choice C ($-1$): this is where $g$ is smallest; the question asks about $f$.\n\n**Test Day Takeaway:** When the shifted function is the one you can see, run the substitution backwards: set the inside expression equal to the unknown input and solve.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-254",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "fill-in",
    question: "The zeros of the function $f$ are $x = -4$ and $x = 10$, and $f$ has no other zeros. The function $h$ is defined by $h(x) = f(x - 3)$. What is the sum of the zeros of $h$?",
    correctAnswer: "12",
    explanation: "**SAT Pattern: Horizontal Shift**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~25s):** Each zero moves $3$ units right: $-4 \\to -1$ and $10 \\to 13$, and $-1 + 13 = 12$.\n\n**The Full Solution:**\nStep 1: $h(x) = 0$ exactly when $f(x - 3) = 0$, which happens exactly when $x - 3$ is a zero of $f$.\nStep 2: Setting $x - 3 = -4$ gives $x = -1$; setting $x - 3 = 10$ gives $x = 13$. Since $f$ has no other zeros, these are the only zeros of $h$.\nStep 3: Their sum is $-1 + 13 = 12$. Check: the original zeros sum to $-4 + 10 = 6$, and shifting two zeros right by $3$ each adds $2(3) = 6$, giving $6 + 6 = 12$. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $0$ shifts the zeros LEFT, to $-7$ and $7$, whose sum is $0$.\n* Answering $6$ leaves the zeros unmoved; a horizontal shift does move them.\n* Answering $13$ shifts only the larger zero and forgets the smaller one.\n\n**Test Day Takeaway:** Zeros are inputs, so a horizontal shift moves every one of them — set the inside expression equal to each old zero and solve.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "horizontal-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── REFLECTION OF GRAPH (bank-am-255..262) ──────────────────────────────
  // y = -f(x) reflects over x-axis. y = f(-x) reflects over y-axis. EVEN
  // functions are unchanged by f(-x); ODD functions become -f(x).
  {
    id: "bank-am-255",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives four values of the function $f$, which records a baggage carousel's belt offset in millimeters. A second function $g$ assigns to each input the opposite of the value that $f$ assigns to it. What is $g(0)$?",
    diagram: { type: "table", params: { xHeader: "x", yHeader: "f(x)", rows: [["-2", "7"], ["0", "3"], ["1", "-1"], ["4", "5"]] } },
    choices: [
      // distractor: negates f(-2) = 7 instead of f(0) = 3, giving -7
      { id: "A", text: "$-7$" },
      { id: "B", text: "$-3$" },
      // distractor: reports f(0) = 3 without applying the sign change
      { id: "C", text: "$3$" },
      // distractor: reads the wrong row and reports f(-2) = 7
      { id: "D", text: "$7$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $g$ negates every output of $f$, and the table gives $f(0)=3$, so $g(0)=-3$.\n\n**The Full Solution:**\n\nStep 1: The description says $g(x)=-f(x)$: the input stays the same and only the sign of the output changes.\n\nStep 2: Read the row with $x=0$: the table gives $f(0)=3$.\n\nStep 3: Apply the sign change: $g(0)=-3$. Check: reflecting a point $(0,3)$ across the horizontal axis lands on $(0,-3)$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-7$): negates $f(-2)=7$ instead of $f(0)$.\n* Choice C ($3$): reports the table value without the sign change.\n* Choice D ($7$): reads the wrong row entirely.\n\n**Test Day Takeaway:** Negating the output moves a point vertically only; the input you look up never changes.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-256",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The line shown in the $xy$-plane is the graph of $f$, a model of a taxiway lighting circuit's voltage drop. Reflecting that line over the vertical axis produces the graph of $g$. What is the value of $g(2)$?",
    diagram: { type: "linearGraph", params: { slope: 2, yIntercept: -1, xRange: [-5, 5], yRange: [-12, 10], xTickInterval: 1, yTickInterval: 2, gridInterval: 1, showPoints: [[0, -1], [3, 5]] } },
    choices: [
      { id: "A", text: "$-5$" },
      // distractor: reflects over the horizontal axis instead, computing -f(2) = -3
      { id: "B", text: "$-3$" },
      // distractor: reports f(2) = 3 without reflecting at all
      { id: "C", text: "$3$" },
      // distractor: reflects the input correctly but then also negates the output, giving 5
      { id: "D", text: "$5$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Reflecting over the vertical axis gives $g(x)=f(-x)$, so $g(2)=f(-2)$, and the line $y=2x-1$ gives $f(-2)=-5$.\n\n**The Full Solution:**\n\nStep 1: Read the line from the marked points $(0,-1)$ and $(3,5)$: the slope is $\\frac{5-(-1)}{3-0}=2$ and the intercept is $-1$, so $f(x)=2x-1$.\n\nStep 2: A reflection over the vertical axis replaces the input by its opposite: $g(x)=f(-x)$.\n\nStep 3: Evaluate: $g(2)=f(-2)=2(-2)-1=-5$. Check: the point $(-2,-5)$ lies on the original line, and reflecting it over the vertical axis gives $(2,-5)$, a point on the graph of $g$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($-3$): reflects over the horizontal axis instead, computing $-f(2)=-3$.\n* Choice C ($3$): reports $f(2)$ and never reflects.\n* Choice D ($5$): reflects the input but also flips the sign of the output.\n\n**Test Day Takeaway:** A reflection over the vertical axis changes the input's sign, not the output's — look up the opposite $x$ and read straight off the graph.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-257",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives values of the functions $f$ and $g$ at four inputs, where $f$ records a heliostat's tilt error and $g$ records its mirrored counterpart. Which equation relates $g$ to $f$ at every input shown?",
    diagram: { type: "dataTable", params: { headers: ["x", "f(x)", "g(x)"], rows: [["-1", "1", "-1"], ["0", "-2", "2"], ["1", "-3", "3"], ["2", "4", "-4"]] } },
    choices: [
      // distractor: at x = 1 this predicts g(1) = f(-1) = 1, but the table shows g(1) = 3
      { id: "A", text: "$g(x)=f(-x)$" },
      // distractor: matches only the x = 0 row, where the values differ by 4; at x = 1 it predicts 1, not 3
      { id: "B", text: "$g(x)=f(x)+4$" },
      // distractor: at x = 1 this predicts -f(-1) = -1, but the table shows g(1) = 3
      { id: "C", text: "$g(x)=-f(-x)$" },
      { id: "D", text: "$g(x)=-f(x)$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** In every row the two outputs are opposites — $1$ and $-1$, $-2$ and $2$, $-3$ and $3$, $4$ and $-4$ — so $g(x)=-f(x)$.\n\n**The Full Solution:**\n\nStep 1: Compare the two output columns row by row: each pair sums to $0$.\n\nStep 2: Since the input is unchanged and only the sign of the output flips, the relationship is a reflection over the horizontal axis, $g(x)=-f(x)$.\n\nStep 3: Test the remaining candidates on one row. At $x=1$, $f(-1)=1$ and $-f(-1)=-1$, but $g(1)=3$, so neither input-reflection rule works. Check: $-f(2)=-4=g(2)$, and $-f(-1)=-1=g(-1)$, so choice D holds on every row.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: predicts $g(1)=f(-1)=1$, but the table shows $3$.\n* Choice B: fits only the $x=0$ row, where the outputs happen to differ by $4$.\n* Choice C: predicts $g(1)=-f(-1)=-1$, again contradicting the table.\n\n**Test Day Takeaway:** Test a candidate rule against a row where the inputs $x$ and $-x$ both appear; that row separates the two kinds of reflection.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-258",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A launch tower elevator's sway is modeled by the quadratic function $f$, whose parabola appears in the $xy$-plane. Turning that parabola upside down about the horizontal axis gives the graph of $g$. Which equation defines $g$?",
    diagram: { type: "quadraticVertex", params: { vertex: [-1, -4], a: 1, showPoints: [[-3, 0], [1, 0]], showVertex: true } },
    choices: [
      // distractor: reflects over the vertical axis instead, moving the turning point from x = -1 to x = 1
      { id: "A", text: "$g(x)=(x-1)^{2}-4$" },
      // distractor: negates the squared term but leaves the constant at -4, putting the turning point at (-1, -4) again
      { id: "B", text: "$g(x)=-(x+1)^{2}-4$" },
      // distractor: negates only the constant and leaves the parabola opening upward
      { id: "C", text: "$g(x)=(x+1)^{2}+4$" },
      { id: "D", text: "$g(x)=-(x+1)^{2}+4$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The graph has its turning point at $(-1,-4)$, so $f(x)=(x+1)^{2}-4$; flipping over the horizontal axis gives $g(x)=-f(x)=-(x+1)^{2}+4$.\n\n**The Full Solution:**\n\nStep 1: Read the turning point $(-1,-4)$ and the intercepts $(-3,0)$ and $(1,0)$ from the graph, so $f(x)=(x+1)^{2}-4$.\n\nStep 2: Flipping over the horizontal axis negates every output: $g(x)=-f(x)$.\n\nStep 3: Distribute the negative across the whole expression: $g(x)=-\\left[(x+1)^{2}-4\\right]=-(x+1)^{2}+4$. Check: $g(-3)=-(4)+4=0$ and $g(-1)=4$, so the intercepts stay put while the turning point moves from $-4$ to $4$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: reflects over the vertical axis, moving the turning point to $x=1$.\n* Choice B: negates the squared term but forgets the constant, leaving the turning point at $-4$.\n* Choice C: negates only the constant and keeps the parabola opening upward.\n\n**Test Day Takeaway:** Negating a function negates every term, so distribute the minus sign across the constant as well as the squared term.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-259",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "fill-in",
    question: "The parabola shown is the graph of $f$, which models a propellant tank's ullage pressure deviation in kilopascals. A backup channel records $g(x)=-f(x)$ instead. What is the greatest value of $g$?",
    diagram: { type: "parabola", params: { vertex: { h: 2, k: -6 }, a: 1, xRange: [-1, 5], yRange: [-8, 4], xTickInterval: 1, yTickInterval: 2, gridInterval: 1, showVertex: false } },
    correctAnswer: "6",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~25s):** The lowest point of the parabola is $-6$, and negating every output turns that minimum into the maximum $6$.\n\n**The Full Solution:**\n\nStep 1: Read the turning point from the graph: the curve bottoms out at $(2,-6)$, so the least value of $f$ is $-6$.\n\nStep 2: Because $g(x)=-f(x)$, the graph of $g$ is the graph of $f$ flipped over the horizontal axis, so $g$ opens downward and has a greatest value.\n\nStep 3: That greatest value is the opposite of the least value of $f$: $-(-6)=6$. Check: at $x=2$, $g(2)=-f(2)=-(-6)=6$, and at $x=0$, $f(0)=-2$ so $g(0)=2$, which is smaller.\n\n**Common Mistakes:**\n\n* Reporting $-6$, the least value of $f$, without applying the sign change.\n* Reporting $2$, the input at which the extreme occurs, instead of the value.\n\n**Test Day Takeaway:** Negating a function swaps minimum for maximum at the same input; read the extreme value, then flip its sign.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-260",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An absolute value function $f$ has the V-shaped graph shown in the $xy$-plane, where it models a gantry crane hoist's lateral drift in centimeters. The graph of $g$ is the mirror image of that graph across the vertical axis. Which equation defines $g$?",
    diagram: { type: "absoluteValue", params: { vertex: [3, -2], slope: 1, showPoints: [[1, 0], [5, 0]] } },
    choices: [
      // distractor: negates the constant instead of the input, moving the corner up to (3, 2)
      { id: "A", text: "$g(x)=|x-3|+2$" },
      // distractor: reflects over the horizontal axis, turning the V upside down at (3, 2)
      { id: "B", text: "$g(x)=-|x-3|+2$" },
      // distractor: reflects the input correctly but also negates the constant, putting the corner at (-3, 2)
      { id: "C", text: "$g(x)=|x+3|+2$" },
      { id: "D", text: "$g(x)=|x+3|-2$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The corner sits at $(3,-2)$, so $f(x)=|x-3|-2$; replacing $x$ by $-x$ gives $|-x-3|-2=|x+3|-2$.\n\n**The Full Solution:**\n\nStep 1: The V has its corner at $(3,-2)$ and passes through $(1,0)$ and $(5,0)$, so $f(x)=|x-3|-2$.\n\nStep 2: Reflecting over the vertical axis replaces the input by its opposite: $g(x)=f(-x)=|-x-3|-2$.\n\nStep 3: Since $|-x-3|=|x+3|$, the equation is $g(x)=|x+3|-2$. Check: the corner of $g$ is at $(-3,-2)$, the mirror image of $(3,-2)$, and $g(-1)=|2|-2=0$ mirrors $f(1)=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: negates the constant instead of the input, lifting the corner to $(3,2)$.\n* Choice B: flips the V upside down, a reflection over the horizontal axis.\n* Choice C: reflects the input but also changes the constant, moving the corner to $(-3,2)$.\n\n**Test Day Takeaway:** A reflection over the vertical axis changes only what is inside the function; the constant added outside is untouched.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-261",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives five values of the function $f$, which records a cold-storage bay's temperature deviation in degrees Celsius. A related function is given by $h(x)=-f(x-2)$. At what input does $h$ equal $1$?",
    diagram: { type: "table", params: { xHeader: "x", yHeader: "f(x)", rows: [["-2", "3"], ["0", "-1"], ["2", "5"], ["4", "1"], ["6", "-4"]] } },
    choices: [
      // distractor: shifts the wrong way, solving -f(x + 2) = 1 to get x = -2
      { id: "A", text: "$-2$" },
      // distractor: reports the input 0 where f itself equals -1, without undoing the shift
      { id: "B", text: "$0$" },
      { id: "C", text: "$2$" },
      // distractor: ignores the negative sign and solves f(x - 2) = 1, giving x - 2 = 4 and x = 6
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** $h(x)=1$ means $f(x-2)=-1$, and the table gives $f(0)=-1$, so $x-2=0$ and $x=2$.\n\n**The Full Solution:**\n\nStep 1: Set the rule equal to the target: $-f(x-2)=1$, so $f(x-2)=-1$.\n\nStep 2: Find the input where $f$ takes the value $-1$: the table shows $f(0)=-1$.\n\nStep 3: Solve the inside: $x-2=0$, so $x=2$. Check: $h(2)=-f(2-2)=-f(0)=-(-1)=1$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-2$): shifts in the wrong direction, solving $-f(x+2)=1$.\n* Choice B ($0$): reports the input where $f$ equals $-1$ without undoing the shift.\n* Choice D ($6$): drops the negative sign and solves $f(x-2)=1$, which the table satisfies at $x-2=4$.\n\n**Test Day Takeaway:** Undo the transformations from the outside in: strip the sign first, look up the value, then solve the shifted input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-262",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "fill-in",
    question: "A sun-shield layer's thermal offset is modeled by $f(x)=x^{2}+bx+9$, where $b$ is a negative constant, and a second layer's offset is $g(x)=-f(x)$. The greatest value of $g$ is $-5$. What is the value of $b$?",
    correctAnswer: "-4",
    explanation: "**SAT Pattern: Reflection of Graph**\n\n**The correct answer is $-4$.**\n\n**The Fast Way (~50s):** The greatest value of $g$ is the opposite of the least value of $f$, so $-\\left(9-\\frac{b^{2}}{4}\\right)=-5$, giving $b^{2}=16$ and $b=-4$.\n\n**The Full Solution:**\n\nStep 1: The least value of $f(x)=x^{2}+bx+9$ occurs at $x=-\\frac{b}{2}$ and equals $9-\\frac{b^{2}}{4}$.\n\nStep 2: Negating $f$ turns that minimum into the maximum of $g$: the greatest value of $g$ is $\\frac{b^{2}}{4}-9$.\n\nStep 3: Set it equal to $-5$: $\\frac{b^{2}}{4}=4$, so $b^{2}=16$ and, since $b$ is negative, $b=-4$. Check: $f(x)=x^{2}-4x+9=(x-2)^{2}+5$, whose least value is $5$, and $g$ then has greatest value $-5$.\n\n**Common Mistakes:**\n\n* Reporting $4$, the positive square root of $16$, which the stated sign of $b$ rules out.\n* Setting the least value of $f$ itself equal to $-5$, solving $9-\\frac{b^{2}}{4}=-5$, gives $b^{2}=56$ and the non-integer value $-2\\sqrt{14}$.\n\n**Test Day Takeaway:** Reflecting across the horizontal axis swaps minimum and maximum and negates the extreme value; solve for the original extreme first.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "reflection-of-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── VERTICAL STRETCH (bank-am-263..270) ─────────────────────────────────
  // y = a·f(x) stretches vertically by factor a. a > 1: stretch; 0 < a < 1:
  // compression. Negative a combines reflection over x-axis.
  {
    id: "bank-am-263",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A registrar recorded $f(x)$, the count of student ID card replacements above a daily norm, on four days. A new campus policy tripled each of these counts, so that $g(x)=3f(x)$. What is the value of $g(2)$?",
    diagram: { type: "dataTable", params: { headers: ["Day (x)", "f(x)"], rows: [["1", "6"], ["2", "-3"], ["3", "0"], ["4", "9"]] } },
    choices: [
      { id: "A", text: "$-9$" },
      // distractor: subtracts 3 instead of multiplying by 3
      { id: "B", text: "$-6$" },
      // distractor: divides by 3 instead of multiplying by 3
      { id: "C", text: "$-1$" },
      // distractor: reads the x = 3 row instead of the x = 2 row
      { id: "D", text: "$0$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** The table gives $f(2)=-3$, so $g(2)=3(-3)=-9$.\n\n**The Full Solution:**\nStep 1: Locate $x=2$ in the table: $f(2)=-3$.\nStep 2: Apply the rule $g(x)=3f(x)$ at $x=2$: $g(2)=3\\cdot f(2)$.\nStep 3: Compute: $3(-3)=-9$. Check: the four values of $g$ are $18$, $-9$, $0$, and $27$ — each exactly triple the matching value of $f$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-6$): subtracts $3$ from $-3$ instead of multiplying by $3$.\n* Choice C ($-1$): divides by $3$ instead of multiplying.\n* Choice D ($0$): reads the $x=3$ row instead of the $x=2$ row.\n\n**Test Day Takeaway:** Multiplying a function by a constant scales every output, sign included — a negative output gets more negative.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-264",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $f$ gives the number of literacy workshop attendees on day $x$ of a program, and the function $g$ is defined by $g(x)=4f(x)$. Which statement best describes the relationship between the two functions?",
    choices: [
      // distractor: reads the multiplier as an addition
      { id: "A", text: "Each output of $g$ is $4$ more than the corresponding output of $f$." },
      // distractor: inverts the factor of 4
      { id: "B", text: "Each output of $g$ is one fourth of the corresponding output of $f$." },
      // distractor: applies the factor to the input rather than the output
      { id: "C", text: "Each input of $g$ is $4$ times the corresponding input of $f$." },
      { id: "D", text: "Each output of $g$ is $4$ times the corresponding output of $f$." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** The factor $4$ sits outside $f$, so it multiplies every output: $g(x)=4f(x)$.\n\n**The Full Solution:**\nStep 1: The rule $g(x)=4f(x)$ evaluates $f$ at the same input $x$ and then multiplies the result.\nStep 2: Because the $4$ is applied after $f$, it scales outputs, not inputs.\nStep 3: So each output of $g$ is $4$ times the matching output of $f$. Check: if $f(5)=30$ attendees, then $g(5)=120$, four times as many on the same day ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: reads the multiplier as an addition, which would be $g(x)=f(x)+4$.\n* Choice B: inverts the factor, which would be $g(x)=\\frac{1}{4}f(x)$.\n* Choice C: applies the $4$ to the input, which would be $g(x)=f(4x)$.\n\n**Test Day Takeaway:** A constant multiplying the whole function stretches outputs vertically; the inputs are untouched.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-265",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $f$ is defined by $f(x) = \\sqrt{x} + 2$. The graph of which function is the graph of $y = f(x)$ stretched vertically by a factor of $4$?",
    choices: [
      // distractor: multiplies only the radical term and leaves the constant alone
      { id: "A", text: "$y = 4\\sqrt{x} + 2$" },
      { id: "B", text: "$y = 4\\sqrt{x} + 8$" },
      // distractor: multiplies the input, which compresses the graph horizontally
      { id: "C", text: "$y = \\sqrt{4x} + 2$" },
      // distractor: multiplies only the constant term
      { id: "D", text: "$y = \\sqrt{x} + 8$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Multiply the WHOLE output by $4$: $4(\\sqrt{x} + 2) = 4\\sqrt{x} + 8$.\n\n**The Full Solution:**\nStep 1: A vertical stretch by a factor of $4$ replaces $y = f(x)$ with $y = 4f(x)$.\nStep 2: Distribute: $4f(x) = 4(\\sqrt{x} + 2) = 4\\sqrt{x} + 8$.\nStep 3: Check one point. $f(9) = 3 + 2 = 5$, so the stretched graph should contain $(9, 20)$, and $4\\sqrt{9} + 8 = 12 + 8 = 20$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = 4\\sqrt{x} + 2$): the $4$ was applied to only one term; at $x = 9$ this gives $14$, not $20$.\n* Choice C ($y = \\sqrt{4x} + 2$): the $4$ went inside the radical, which is a horizontal change; at $x = 9$ this gives $8$.\n* Choice D ($y = \\sqrt{x} + 8$): only the constant was multiplied; at $x = 9$ this gives $11$.\n\n**Test Day Takeaway:** A vertical stretch multiplies the entire function rule — distribute the factor over every term before comparing choices.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-266",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "fill-in",
    question: "A campus tutoring center models appointments above its daily minimum by $f(x)=2x^2-5x+1$, and the function $g$ is defined by $g(x)=kf(x)$ for a constant $k$. If $g(3)=24$, what is the value of $k$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~25s):** $f(3)=18-15+1=4$, so $g(3)=4k=24$ and $k=6$.\n\n**The Full Solution:**\nStep 1: Evaluate the inner function: $f(3)=2(9)-5(3)+1=18-15+1=4$.\nStep 2: The rule gives $g(3)=k\\cdot f(3)=4k$, and that equals $24$.\nStep 3: Divide: $k=6$. Check: $g(x)=6(2x^2-5x+1)$ gives $g(3)=6(4)=24$ ✓\n\n**Common Mistakes:**\n* $4$: reports $f(3)$ instead of the stretch factor.\n* $20$: computes $24-4$, treating the stretch as an addition.\n* $8$: drops the constant $+1$, reading $f(3)$ as $18-15=3$, and then computes $\\frac{24}{3}=8$.\n\n**Test Day Takeaway:** Evaluate the inner function before solving for the multiplier — the factor is the ratio of the two outputs.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-267",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An acoustic panel's edge profile is modeled by the function $f$, whose graph is shown. The function $g$ satisfies $g(x) = 4f(x)$ for every $x$. Which ordered pair is the vertex of the graph of $y = g(x)$?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, -2], a: 1, showPoints: [[1, 2], [5, 2]], showVertex: true } },
    choices: [
      // distractor: reports the vertex of f and never applies the factor 4
      { id: "A", text: "$(3, -2)$" },
      // distractor: multiplies the x-coordinate by 4 instead of the output
      { id: "B", text: "$(12, -2)$" },
      { id: "C", text: "$(3, -8)$" },
      // distractor: multiplies both coordinates by 4
      { id: "D", text: "$(12, -8)$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Multiplying a function by $4$ scales every output and leaves every input alone, so the vertex $(3, -2)$ moves to $(3, -8)$.\n\n**The Full Solution:**\nStep 1: The graph shows that the vertex of $y = f(x)$ is $(3, -2)$, so $f(3) = -2$ and no other output of $f$ is smaller.\nStep 2: Because $g(x) = 4f(x)$, the input that produces the extreme output does not change: $g(3) = 4f(3) = 4(-2) = -8$.\nStep 3: For every other $x$, $f(x) > -2$, so $g(x) = 4f(x) > -8$, and the vertex of $y = g(x)$ is $(3, -8)$. Check: the graph passes through $(1, 2)$, and $g(1) = 4(2) = 8$, which is above $-8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(3, -2)$): reports the vertex of $f$ itself and never applies the factor $4$.\n* Choice B ($(12, -2)$): multiplies the $x$-coordinate by $4$; that is what a horizontal change would do, not a vertical one.\n* Choice D ($(12, -8)$): multiplies both coordinates by $4$ instead of only the output.\n\n**Test Day Takeaway:** A vertical stretch scales outputs only — the $x$-coordinates of maxima, minima, and $x$-intercepts never move.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-268",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A resonance model uses the rule $h(x) = c \\cdot f(x)$, where $f(x) = x^2 - 6x + 5$, $c$ is a positive constant, and $x$ is the driving frequency in hertz. The least value the model takes is $-20$. What is the value of $c$?",
    choices: [
      // distractor: reports the size of f's minimum, 4, instead of the stretch factor
      { id: "A", text: "$4$" },
      { id: "B", text: "$5$" },
      // distractor: subtracts, -20 - (-4) = -16, and drops the sign
      { id: "C", text: "$16$" },
      // distractor: reports the size of h's minimum, 20
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The minimum of $f$ is $f(3) = -4$, and stretching multiplies it by $c$, so $-4c = -20$ and $c = 5$.\n\n**The Full Solution:**\nStep 1: The graph of $f$ is a parabola opening upward with its vertex at $x = -\\frac{-6}{2(1)} = 3$, so the least value of $f$ is $f(3) = 9 - 18 + 5 = -4$.\nStep 2: Multiplying by a positive constant preserves which input gives the least output, so the least value of $h$ is $h(3) = c \\cdot (-4) = -4c$.\nStep 3: Setting $-4c = -20$ gives $c = 5$. Check: $h(x) = 5x^2 - 30x + 25$, and $h(3) = 45 - 90 + 25 = -20$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reports the size of the minimum of $f$, which is $4$, rather than the stretch factor.\n* Choice C ($16$): subtracts instead of dividing: $-20 - (-4) = -16$, then drops the sign.\n* Choice D ($20$): reports the size of the minimum of $h$, which the question already gives.\n\n**Test Day Takeaway:** For $h = c \\cdot f$ with $c > 0$, the extreme value scales by $c$ while the input that produces it stays put.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-269",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the reading $f(x)$, in microstrain, recorded by a strain gauge at each of four settings $x$. A rescaled reading is given by $g(x) = k \\cdot f(x)$, where $k$ is a constant, and the rescaled reading at the setting $x = -2$ is $45$. What is the value of $g(4)$?",
    questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$-2$", "$-9$"], ["$0$", "$3$"], ["$2$", "$7$"], ["$4$", "$6$"]] },
    choices: [
      { id: "A", text: "$-30$" },
      // distractor: uses k = -1, treating the rescaling as only a sign flip
      { id: "B", text: "$-6$" },
      // distractor: reports f(4) = 6 without applying k
      { id: "C", text: "$6$" },
      // distractor: gets k = 5 by ignoring the negative sign of f(-2) = -9
      { id: "D", text: "$30$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** From the table $f(-2) = -9$, so $-9k = 45$ and $k = -5$; then $g(4) = -5(6) = -30$.\n\n**The Full Solution:**\nStep 1: The table gives $f(-2) = -9$, and the rescaling gives $g(-2) = k \\cdot f(-2) = -9k$.\nStep 2: Since $g(-2) = 45$, solve $-9k = 45$ to get $k = -5$; the stretch factor is negative, so $g$ also reflects across the $x$-axis.\nStep 3: The table gives $f(4) = 6$, so $g(4) = -5(6) = -30$. Check: $g(0) = -5(3) = -15$, and $\\frac{-15}{3} = -5$, the same factor ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-6$): uses $k = -1$, treating the rescaling as only a reflection and never solving for the factor.\n* Choice C ($6$): reports $f(4)$ straight from the table without applying $k$.\n* Choice D ($30$): solves $9k = 45$ instead, ignoring the negative sign of $f(-2) = -9$.\n\n**Test Day Takeaway:** Solve for the stretch factor at the one input you are given, then apply that same factor at the input you are asked about.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-270",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "fill-in",
    question: "A rescaled bathymetric profile satisfies $E(x) = k \\cdot D(x)$ for a constant $k$, where $D$ is the function defined by $D(x) = -0.5x^2 + 6x$ and $D(x)$ gives the depth deviation, in meters, at a horizontal distance of $x$ meters. Given that $E(2) = -30$, what is the value of $E(8)$?",
    correctAnswer: "-48",
    explanation: "**SAT Pattern: Vertical Stretch**\n\n**The correct answer is $-48$.**\n\n**The Fast Way (~30s):** $D(2) = 10$ forces $k = -3$, and $D(8) = 16$, so $E(8) = -3(16) = -48$.\n\n**The Full Solution:**\nStep 1: Evaluate the base profile at the input that is given: $D(2) = -0.5(4) + 12 = -2 + 12 = 10$.\nStep 2: Since $E(2) = k \\cdot D(2) = 10k$ and $E(2) = -30$, the constant is $k = \\frac{-30}{10} = -3$.\nStep 3: Evaluate at $x = 8$: $D(8) = -0.5(64) + 48 = -32 + 48 = 16$, so $E(8) = -3(16) = -48$. Check: $\\frac{E(2)}{D(2)} = \\frac{-30}{10} = -3$ and $\\frac{-48}{16} = -3$, the same factor ✓\n\n**Common Mistakes:** Reporting $16$ skips the factor entirely; reporting $48$ finds $k = 3$ by dropping the negative sign; reporting $-120$ scales the given value $-30$ by $\\frac{8}{2}$, treating $E$ as proportional to $x$.\n\n**Test Day Takeaway:** One known input-output pair pins the stretch factor; after that the factor applies unchanged at every other input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-stretch",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── COMPOUND INTEREST (bank-am-271..278) ────────────────────────────────
  // Formula: A = P(1 + r/n)^(nt). SAT typically uses annual compounding (n=1).
  // Distinct from generic exponential growth via the financial framing and
  // standard $A = P(1+r)^t$ form.
  {
    id: "bank-am-271",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The value of a certificate of deposit increases by the same percentage each year. The table gives the value, in dollars, at the time of purchase and at the end of each of the first three years. By what percentage does the value increase each year?",
    questionTable: { headers: ["Years after purchase", "Value (dollars)"], rows: [["$0$", "$8{,}000$"], ["$1$", "$8{,}400$"], ["$2$", "$8{,}820$"], ["$3$", "$9{,}261$"]] },
    choices: [
      // distractor: divided the first year increase of 400 by the end-of-year value 8,400 instead of by 8,000
      { id: "A", text: "$4.8\\%$" },
      { id: "B", text: "$5\\%$" },
      // distractor: used the two-year increase of 820 over 8,000
      { id: "C", text: "$10.3\\%$" },
      // distractor: used the three-year increase of 1,261 over 8,000
      { id: "D", text: "$15.8\\%$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compound Interest**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $8{,}400/8{,}000=1.05$, an increase of $5\\%$ per year.\n\n**The Full Solution:**\nStep 1: A constant percentage increase means a constant ratio between consecutive values.\nStep 2: Compute the ratios: $8400/8000=1.05$, $8820/8400=1.05$, and $9261/8820=1.05$.\nStep 3: A factor of $1.05$ is an increase of $5\\%$ each year. Check: $8000(1.05)^{3}=9{,}261$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.8\\%$): divides the first year's increase of $\\$400$ by the end-of-year value $\\$8{,}400$.\n* Choice C ($10.3\\%$): uses the two-year increase, $\\$820$ over $\\$8{,}000$.\n* Choice D ($15.8\\%$): uses the three-year increase, $\\$1{,}261$ over $\\$8{,}000$.\n\n**Test Day Takeaway:** Percent change always divides by the earlier value — the ratio of consecutive rows is the growth factor.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-272",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives the balance of a college fund at the end of each of the first three years after it was opened. The fund earns $4\\%$ interest compounded annually. What will the fund's balance be at the end of the fourth year?",
    questionTable: { headers: ["Year", "Balance (dollars)"], rows: [["$1$", "$5{,}200.00$"], ["$2$", "$5{,}408.00$"], ["$3$", "$5{,}624.32$"]] },
    choices: [
      // distractor: added 4 percent of the year-1 balance, 208 dollars, instead of 4 percent of the year-3 balance
      { id: "A", text: "$\\$5{,}832.32$" },
      // distractor: added the year-3 interest of 216.32 again instead of taking 4 percent of the new balance
      { id: "B", text: "$\\$5{,}840.64$" },
      { id: "C", text: "$\\$5{,}849.29$" },
      // distractor: applied the 4 percent increase twice, giving the balance at the end of year 5
      { id: "D", text: "$\\$6{,}083.26$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Compound Interest**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Multiply the year-$3$ balance by $1.04$: $5624.32\\cdot 1.04=5{,}849.29$.\n\n**The Full Solution:**\nStep 1: Compounding annually at $4\\%$ multiplies each year's balance by $1.04$, which the table confirms: $5408.00\\cdot 1.04=5{,}624.32$.\nStep 2: Apply the same factor once more: $5624.32\\cdot 1.04$.\nStep 3: The year-$4$ balance is $\\$5{,}849.29$. Check: the interest earned is $\\$224.97$, which is $4\\%$ of $\\$5{,}624.32$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\$5{,}832.32$): adds $4\\%$ of the year-$1$ balance, $\\$208$, instead of $4\\%$ of the year-$3$ balance.\n* Choice B ($\\$5{,}840.64$): adds the year-$3$ interest of $\\$216.32$ again.\n* Choice D ($\\$6{,}083.26$): applies the increase twice, giving the year-$5$ balance.\n\n**Test Day Takeaway:** Compound interest is a percent of the newest balance, so the yearly interest grows — never reuse an earlier year's dollar amount.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-273",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A student loan of $\\$12{,}000$ accrues $4\\%$ annual interest, compounded semiannually. The table gives the amount owed, in dollars, after each of the first three six-month periods. Which equation gives the amount owed, $B$ dollars, $t$ years after the loan was issued?",
    questionTable: { headers: ["Six-month periods", "Amount owed (dollars)"], rows: [["$1$", "$12{,}240.00$"], ["$2$", "$12{,}484.80$"], ["$3$", "$12{,}734.50$"]] },
    choices: [
      // distractor: applied the semiannual factor once per year instead of twice
      { id: "A", text: "$B=12000(1.02)^{t}$" },
      { id: "B", text: "$B=12000(1.02)^{2t}$" },
      // distractor: divided the exponent by 2 instead of multiplying, and used the annual factor
      { id: "C", text: "$B=12000(1.04)^{t/2}$" },
      // distractor: used the annual factor 1.04 for each six-month period
      { id: "D", text: "$B=12000(1.04)^{2t}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compound Interest**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Semiannual compounding uses half the rate, $2\\%$, twice a year, so $B=12000(1.02)^{2t}$.\n\n**The Full Solution:**\nStep 1: The periodic rate is $\\dfrac{0.04}{2}=0.02$, so each six-month period multiplies the balance by $1.02$, matching the table: $12000\\cdot 1.02=12{,}240$.\nStep 2: In $t$ years there are $2t$ six-month periods.\nStep 3: So $B=12000(1.02)^{2t}$. Check at $t=1.5$, three periods: $12000(1.02)^{3}=12{,}734.50$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($B=12000(1.02)^{t}$): applies the semiannual factor once per year.\n* Choice C ($B=12000(1.04)^{t/2}$): divides the exponent by $2$ instead of multiplying and keeps the annual rate.\n* Choice D ($B=12000(1.04)^{2t}$): uses the full annual rate for each six-month period.\n\n**Test Day Takeaway:** Divide the rate by the number of periods per year and multiply the exponent by that same number.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-274",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "fill-in",
    question: "A credit union pays interest compounded annually at an annual rate of $r$ percent, so a $\\$3{,}200$ deposit is worth $3200\\left(1+\\frac{r}{100}\\right)^{2}$ dollars two years later. That deposit is worth $\\$3{,}528$ after two years. What is the value of $r$?",
    correctAnswer: "5",
    explanation: "**SAT Pattern: Compound Interest**\n\n**The correct answer is $5$.**\n\n**The Fast Way (~25s):** $3528/3200=1.1025$, and $\\sqrt{1.1025}=1.05$, so $r=5$.\n\n**The Full Solution:**\nStep 1: Divide both sides by $3200$: $\\left(1+\\dfrac{r}{100}\\right)^{2}=\\dfrac{3528}{3200}=1.1025$.\nStep 2: Take the positive square root: $1+\\dfrac{r}{100}=1.05$.\nStep 3: So $\\dfrac{r}{100}=0.05$ and $r=5$. Check: $3200(1.05)^{2}=3200(1.1025)=3{,}528$ ✓\n\n**Common Mistakes:**\n* $10.25$: used the two-year growth of $10.25\\%$ as the annual rate, skipping the square root.\n* $1.05$: reported the annual growth factor instead of the percent rate.\n* $328$: reported the total interest earned rather than the rate.\n\n**Test Day Takeaway:** Two years of compounding is the annual factor squared — undo it with a square root, not by halving.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-275",
    domain: "advanced-math",
    skills: ["exponential-functions", "function-interpretation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Interest on a $\\$2{,}400$ store-card balance is charged at $6\\%$ per year, compounded monthly. The first three monthly balances appear in the table. To the nearest dollar, what will the balance be one year after the charge?",
    questionTable: { headers: ["Months", "Balance (dollars)"], rows: [["$1$", "$2{,}412.00$"], ["$2$", "$2{,}424.06$"], ["$3$", "$2{,}436.18$"]] },
    choices: [
      // distractor: reported the last value in the table, the balance after 3 months
      { id: "A", text: "$\\$2{,}436$" },
      // distractor: applied the annual rate once, computing 2400 times 1.06
      { id: "B", text: "$\\$2{,}544$" },
      { id: "C", text: "$\\$2{,}548$" },
      // distractor: used 6 percent as the monthly rate, computing 2400 times 1.06 to the twelfth power
      { id: "D", text: "$\\$4{,}829$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Compound Interest**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The monthly factor is $1.005$, so after $12$ months the balance is $2400(1.005)^{12}\\approx \\$2{,}548$.\n\n**The Full Solution:**\nStep 1: The monthly rate is $\\dfrac{0.06}{12}=0.005$, matching the table: $2400\\cdot 1.005=2{,}412.00$.\nStep 2: After $12$ months the balance is $2400(1.005)^{12}$.\nStep 3: Since $(1.005)^{12}=1.06168$, the balance is $\\$2{,}548.03$, or $\\$2{,}548$ to the nearest dollar. Check: this is slightly more than $6\\%$ of $\\$2{,}400$ added on, as compounding requires ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\$2{,}436$): reports the last value in the table, the balance after $3$ months.\n* Choice B ($\\$2{,}544$): applies the annual rate once, computing $2400(1.06)$.\n* Choice D ($\\$4{,}829$): uses $6\\%$ as the monthly rate, computing $2400(1.06)^{12}$.\n\n**Test Day Takeaway:** Monthly compounding divides the annual rate by $12$ and raises to the number of months — the two must change together.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-276",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A money-market account earns interest at a constant annual rate, compounded annually. The table gives the balance in the account at the end of each of the first two years. What is the annual interest rate?",
    diagram: { type: "dataTable", params: { headers: ["End of year", "Balance (dollars)"], rows: [["1", "5,400"], ["2", "5,832"]] } },
    choices: [
      // distractor: splits the one-year increase across two years
      { id: "A", text: "$4\\%$" },
      // distractor: divides the increase by the later balance instead of the earlier one
      { id: "B", text: "$7.4\\%$" },
      { id: "C", text: "$8\\%$" },
      // distractor: doubles the annual rate, as if the table spanned two years of growth
      { id: "D", text: "$16\\%$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Compound Interest**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $\\dfrac{5{,}832}{5{,}400} = 1.08$, so the balance grows by $8\\%$ in one year.\n\n**The Full Solution:**\nStep 1: Consecutive balances differ by exactly one year of compounding, so their ratio is the growth multiplier $1 + r$.\nStep 2: $\\dfrac{5{,}832}{5{,}400} = 1.08$, so $1 + r = 1.08$ and $r = 0.08$.\nStep 3: As a percent, the annual rate is $8\\%$. Check: the increase is $5{,}832 - 5{,}400 = 432$, and $\\dfrac{432}{5{,}400} = 0.08$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4\\%$): this halves the $\\$432$ increase, as if it had accumulated over two years; the table already shows a single year of growth.\n* Choice B ($7.4\\%$): this computes $\\dfrac{432}{5{,}832} \\approx 0.074$, dividing by the ending balance instead of the starting one.\n* Choice D ($16\\%$): this doubles the correct rate, treating the two listed balances as two years of growth from the original deposit.\n\n**Test Day Takeaway:** For a constant compound rate, divide any balance by the one from the period before; percent change is always measured against the EARLIER amount.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-277",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A trust account earns $9\\%$ interest, compounded annually, and no deposits or withdrawals are made. Which of the following is closest to the number of years required for the value of the account to triple?",
    choices: [
      // distractor: finds the time to double rather than to triple
      { id: "A", text: "$8$" },
      { id: "B", text: "$13$" },
      // distractor: computes $\dfrac{200}{9}$, treating the growth as simple interest
      { id: "C", text: "$22$" },
      // distractor: computes $\dfrac{300}{9}$, dividing the target percent by the rate
      { id: "D", text: "$33$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Compound Interest**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Solve $(1.09)^t = 3$. Since $(1.09)^{12} \\approx 2.81$ and $(1.09)^{13} \\approx 3.07$, the value first reaches triple near $t = 13$.\n\n**The Full Solution:**\nStep 1: Let $P$ be the starting value. After $t$ years the account holds $P(1.09)^t$, and tripling means $P(1.09)^t = 3P$, so $(1.09)^t = 3$.\nStep 2: Test values: $(1.09)^{10} \\approx 2.37$, $(1.09)^{12} \\approx 2.81$, $(1.09)^{13} \\approx 3.07$.\nStep 3: The multiplier passes $3$ between $t = 12$ and $t = 13$, and $3.07$ is closer to $3$ than $2.81$ is, so $13$ years is closest. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): $(1.09)^8 \\approx 1.99$ — that is the doubling time, not the tripling time.\n* Choice C ($22$): this divides $200$ by $9$, which would be right only for simple interest on the original $200\\%$ gain.\n* Choice D ($33$): this divides $300$ by $9$, mistaking the target multiple for a percent to be divided by the rate.\n\n**Test Day Takeaway:** \"Doubles/triples\" means the MULTIPLIER hits $2$ or $3$; set $(1 + r)^t$ equal to that number and test exponents rather than dividing percents.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-278",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "hard",
    type: "fill-in",
    question: "An investor's account pays $4\\%$ annual interest compounded semiannually. Exactly two years after the account was opened, it holds $\\$8{,}659.46$. How many dollars were originally deposited?",
    correctAnswer: "8000",
    explanation: "**SAT Pattern: Compound Interest**\n\n**The correct answer is $8000$.**\n\n**The Fast Way (~30s):** Two years is four periods at $2\\%$, so divide: $8659.46/(1.02)^{4}=8659.46/1.08243216=8{,}000$.\n\n**The Full Solution:**\nStep 1: Semiannual compounding at $4\\%$ per year uses a periodic rate of $2\\%$, so the factor per period is $1.02$.\nStep 2: Two years contain $4$ periods, so the account value is $P(1.02)^{4}$, where $P$ is the deposit.\nStep 3: Solve $P(1.08243216)=8659.46$, giving $P=8{,}000$. Check: $8000\\cdot 1.02=8160$, then $8323.20$, then $8489.66$, then $\\$8{,}659.46$ ✓\n\n**Common Mistakes:**\n* $8006$: divided by $(1.04)^{2}$, compounding once a year instead of twice.\n* $8323$: divided by $(1.02)^{2}$, using two periods instead of four.\n* $9373$: multiplied by $(1.02)^{4}$ instead of dividing.\n\n**Test Day Takeaway:** Working backwards from a future value divides by the growth factor — and the number of periods, not the number of years, is the exponent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "compound-interest",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── RATIONAL EQUATION WITH EXTRANEOUS SOLUTION (bank-am-279..286) ───────
  // Solving a rational equation can produce candidates that fail the original
  // (denominator-zero). The pattern: solve, check, identify extraneous roots.
  {
    id: "bank-am-279",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A feed mixer's blend condition is $\\dfrac{3}{x-5}=\\dfrac{x}{x-5}$, where $x$ is the additive mass in kilograms. Which of the following describes the values of $x$ that satisfy this condition?",
    choices: [
      { id: "A", text: "Only $x=3$" },
      // distractor: takes x = 5, the value that makes both denominators zero, as a solution
      { id: "B", text: "Only $x=5$" },
      // distractor: lists the excluded value 5 alongside the genuine solution 3
      { id: "C", text: "Both $x=3$ and $x=5$" },
      // distractor: assumes the shared denominator makes the equation unsolvable
      { id: "D", text: "There is no such value of $x$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Equal denominators force equal numerators, so $x=3$; the value $x=5$ is barred because it makes the denominators $0$.\n\n**The Full Solution:**\n\nStep 1: Both sides share the denominator $x-5$, which cannot be $0$, so $x\\neq5$ from the start.\n\nStep 2: For $x\\neq5$, multiplying both sides by $x-5$ leaves $3=x$.\n\nStep 3: The single candidate $x=3$ is allowed, since $3-5=-2\\neq0$. Check: at $x=3$ both sides equal $\\frac{3}{-2}=-\\frac{3}{2}$, while at $x=5$ neither side is defined.\n\n**Why the wrong answers are tempting:**\n\n* Choice B: reports $x=5$, the value that makes both denominators $0$ and is therefore excluded.\n* Choice C: keeps the excluded value $5$ next to the genuine solution $3$.\n* Choice D: assumes the matching denominators make the equation impossible to satisfy.\n\n**Test Day Takeaway:** List the excluded inputs before solving; the value that kills a denominator can never be reported as a solution.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-280",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An apiary scale's calibration note claims that $\\dfrac{x^{2}-16}{x-4}$ and $x+4$ give the same value for every input $x$. For which values of $x$ is that claim correct?",
    choices: [
      // distractor: cancels the common factor without excluding x = 4, where the original denominator is 0
      { id: "A", text: "All real numbers" },
      { id: "B", text: "All real numbers except $x=4$" },
      // distractor: excludes -4, the zero of the factor x + 4, instead of the zero of the denominator
      { id: "C", text: "All real numbers except $x=-4$" },
      // distractor: treats the excluded input 4 as the only place the two expressions agree
      { id: "D", text: "Only $x=4$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $\\frac{x^{2}-16}{x-4}=\\frac{(x-4)(x+4)}{x-4}=x+4$ for every $x$ except $x=4$, where the left side is undefined.\n\n**The Full Solution:**\n\nStep 1: Factor the numerator as a difference of squares: $x^{2}-16=(x-4)(x+4)$.\n\nStep 2: Cancel the common factor $x-4$, which is legitimate only when $x-4\\neq0$.\n\nStep 3: So the two expressions agree for every real $x$ except $x=4$, where the first expression has no value at all. Check: at $x=5$ both give $9$; at $x=4$ the first is $\\frac{0}{0}$, which is undefined, while the second is $8$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: cancels the factor without noticing that $x=4$ makes the original denominator $0$.\n* Choice C: excludes $-4$, the zero of the other factor, rather than the zero of the denominator.\n* Choice D: reverses the exclusion and keeps only the one input that must be removed.\n\n**Test Day Takeaway:** Cancelling a factor changes the domain; the excluded input comes from the original denominator, not from the simplified form.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-281",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A tram catenary's tension index is modeled by $f(x)=\\dfrac{12}{x-2}$, where $x>2$ is the span in hundreds of meters. For what span is the tension index $\\dfrac{3}{2}$?",
    choices: [
      // distractor: divides 12 by the numerator 3 only, getting x - 2 = 4 and x = 6
      { id: "A", text: "$6$" },
      // distractor: stops at x - 2 = 8 and reports 8 instead of x
      { id: "B", text: "$8$" },
      { id: "C", text: "$10$" },
      // distractor: multiplies 12 by 3/2 instead of dividing, reporting 18
      { id: "D", text: "$18$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $\\frac{12}{x-2}=\\frac{3}{2}$ gives $x-2=12\\div\\frac{3}{2}=8$, so $x=10$.\n\n**The Full Solution:**\n\nStep 1: Set the model equal to the target: $\\frac{12}{x-2}=\\frac{3}{2}$.\n\nStep 2: Cross multiply: $2\\cdot12=3(x-2)$, so $24=3x-6$.\n\nStep 3: Solve: $3x=30$ and $x=10$, which satisfies $x>2$. Check: $\\frac{12}{10-2}=\\frac{12}{8}=\\frac{3}{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($6$): divides $12$ by the numerator $3$ alone, getting $x-2=4$.\n* Choice B ($8$): stops at $x-2=8$ and reports that value as the span.\n* Choice D ($18$): multiplies $12$ by $\\frac{3}{2}$ instead of dividing by it.\n\n**Test Day Takeaway:** Cross multiplying turns a rational equation into a linear one in a single step — then finish solving for $x$, not for the denominator.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-282",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A canning retort's pressure condition reduces to $\\dfrac{x^{2}}{x-2}=\\dfrac{4}{x-2}$. One value of $x$ satisfies the equation left after the denominators are cleared but not the original condition. What is that value?",
    choices: [
      // distractor: reports -2, the value that does satisfy the original condition, instead of the one that fails
      { id: "A", text: "$-2$" },
      // distractor: reads the numerator x squared equal to 0 as the excluded input
      { id: "B", text: "$0$" },
      { id: "C", text: "$2$" },
      // distractor: reports 4, the value of x squared, instead of a value of x
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Clearing the denominator leaves $x^{2}=4$, so $x=2$ or $x=-2$; the value $x=2$ makes $x-2$ equal $0$, so it fails in the original.\n\n**The Full Solution:**\n\nStep 1: Multiplying both sides by $x-2$ gives $x^{2}=4$, whose solutions are $x=2$ and $x=-2$.\n\nStep 2: The original condition has $x-2$ in both denominators, so $x=2$ is outside its domain.\n\nStep 3: Therefore $x=2$ satisfies the cleared equation but not the original one, while $x=-2$ satisfies both. Check: at $x=-2$, $\\frac{4}{-4}=-1$ and $\\frac{4}{-4}=-1$; at $x=2$ both sides are undefined.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-2$): names the value that does satisfy the original condition.\n* Choice B ($0$): reads the numerator $x^{2}=0$ as the excluded input.\n* Choice D ($4$): reports $x^{2}$ rather than $x$.\n\n**Test Day Takeaway:** Clearing denominators can manufacture a solution; compare every root against the inputs the original equation forbids.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-283",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "medium",
    type: "fill-in",
    question: "A seed drill sets its row width $x$, in centimeters, so that $\\dfrac{x+k}{x-2}=3$ for some constant $k$, and $x=5$ is the one width that works. What is the value of $k$?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~25s):** At $x=5$ the model reads $\\frac{5+k}{3}=3$, so $5+k=9$ and $k=4$.\n\n**The Full Solution:**\n\nStep 1: Substitute the given width: $\\frac{5+k}{5-2}=3$, and the denominator is $3$.\n\nStep 2: Multiply both sides by $3$: $5+k=9$.\n\nStep 3: Solve: $k=4$. Check: with $k=4$ the model is $\\frac{x+4}{x-2}=3$, which gives $x+4=3x-6$ and $x=5$, the stated width.\n\n**Common Mistakes:**\n\n* Multiplying by $x$ instead of $x-2$ gives $5+k=15$ and the wrong value $k=10$.\n* Failing to distribute the $3$, using $3x-2=13$, gives $k=8$.\n\n**Test Day Takeaway:** A stated solution turns a rational equation into arithmetic; substitute before you clear anything.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-284",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A toll gantry's throughput ratio is modeled by $g(x)=\\dfrac{x+3}{2x-1}$, where $x>\\frac{1}{2}$ is the lane-count index. For what value of the index is the throughput ratio equal to $2$?",
    choices: [
      // distractor: multiplies only the 2x term by 2, solving x + 3 = 4x - 1 to get 4/3
      { id: "A", text: "$\\frac{4}{3}$" },
      // distractor: sets the denominator equal to 2, solving 2x - 1 = 2 to get 3/2
      { id: "B", text: "$\\frac{3}{2}$" },
      { id: "C", text: "$\\frac{5}{3}$" },
      // distractor: expands 2(2x - 1) as 4x - 4, solving x + 3 = 4x - 4 to get 7/3
      { id: "D", text: "$\\frac{7}{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** $\\frac{x+3}{2x-1}=2$ gives $x+3=4x-2$, so $3x=5$ and $x=\\frac{5}{3}$.\n\n**The Full Solution:**\n\nStep 1: Multiply both sides by $2x-1$, which is nonzero because $x>\\frac{1}{2}$: $x+3=2(2x-1)$.\n\nStep 2: Distribute on the right: $x+3=4x-2$.\n\nStep 3: Solve: $5=3x$, so $x=\\frac{5}{3}$, which is greater than $\\frac{1}{2}$. Check: $\\frac{\\frac{5}{3}+3}{2\\cdot\\frac{5}{3}-1}=\\frac{\\frac{14}{3}}{\\frac{7}{3}}=2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{4}{3}$): multiplies only the $2x$ term by $2$, solving $x+3=4x-1$.\n* Choice B ($\\frac{3}{2}$): sets the denominator itself equal to $2$.\n* Choice D ($\\frac{7}{3}$): expands $2(2x-1)$ as $4x-4$.\n\n**Test Day Takeaway:** Distribute across the whole denominator when you clear it; both terms get multiplied, not just the one with the variable.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-285",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A magnetometer boom's balance condition is $\\dfrac{x+a}{x-3}=\\dfrac{6}{x-3}$, where $a$ is a constant and $x$ is the boom offset in centimeters. For which value of $a$ does the condition have no solution?",
    choices: [
      // distractor: solves 6 + a = 3 instead of 6 - a = 3, giving -3
      { id: "A", text: "$-3$" },
      // distractor: assumes no solution requires the numerator x + a to equal x, so a = 0
      { id: "B", text: "$0$" },
      { id: "C", text: "$3$" },
      // distractor: copies the constant 6 from the right-hand numerator
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Equal denominators force $x+a=6$, so $x=6-a$; the condition fails only when that candidate is the barred value $3$, which happens at $a=3$.\n\n**The Full Solution:**\n\nStep 1: Both sides have denominator $x-3$, so $x\\neq3$, and for every other $x$ the equation reduces to $x+a=6$.\n\nStep 2: The reduced equation always has exactly one candidate, $x=6-a$.\n\nStep 3: That candidate is unusable precisely when $6-a=3$, that is, when $a=3$. Check: with $a=3$ the condition is $\\frac{x+3}{x-3}=\\frac{6}{x-3}$, whose only candidate is $x=3$, an excluded input, so there is no solution.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-3$): solves $6+a=3$ rather than $6-a=3$.\n* Choice B ($0$): assumes no solution requires the two numerators to be identical.\n* Choice D ($6$): copies the constant from the right-hand numerator.\n\n**Test Day Takeaway:** A rational equation has no solution exactly when its only candidate is an input the denominators forbid.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-286",
    domain: "advanced-math",
    skills: ["rational-expressions"],
    difficulty: "hard",
    type: "fill-in",
    question: "A rover wheel's slip ratio is modeled by $h(x)=\\dfrac{3x}{x-4}$, where $x\\neq 4$ is the drive current in amperes. At one current the slip ratio is $4$ greater than its value at $x=2$. What is that current?",
    correctAnswer: "-2",
    explanation: "**SAT Pattern: Rational Equation with Extraneous Solution**\n\n**The correct answer is $-2$.**\n\n**The Fast Way (~45s):** $h(2)=\\frac{6}{-2}=-3$, so the target is $1$; solving $\\frac{3x}{x-4}=1$ gives $3x=x-4$ and $x=-2$.\n\n**The Full Solution:**\n\nStep 1: Evaluate the reference value: $h(2)=\\frac{3(2)}{2-4}=\\frac{6}{-2}=-3$, so $h(2)+4=1$.\n\nStep 2: Set the model equal to that target: $\\frac{3x}{x-4}=1$, and multiply by $x-4$ to get $3x=x-4$.\n\nStep 3: Solve: $2x=-4$, so $x=-2$, which is allowed since $-2\\neq4$. Check: $h(-2)=\\frac{-6}{-6}=1$, exactly $h(2)+4$.\n\n**Common Mistakes:**\n\n* Solving $h(x)=-3$ instead of $h(x)=1$ returns the given input $x=2$.\n* Reading $h(2)+4$ as $h(6)$ gives the target $9$ and the wrong current $x=6$.\n\n**Test Day Takeaway:** Compute the numerical target completely before setting the function equal to it; the $+4$ shifts the value, not the input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── P.A. FACTOR BY GROUPING (bank-am-287..290) ──────────────────────────
  // Group terms to extract common factors; technique for factoring polynomials
  // that have no overall GCF.
  {
    id: "bank-am-287",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "When a fog collector is set to depth $x$ centimeters, it holds $10x^3 + 15x^2 + 8x + 12$ cubic centimeters of water. Which expression below is equivalent to that volume?",
    choices: [
      { id: "A", text: "$(5x^2 + 4)(2x + 3)$" },
      // distractor: regroups as $3$ and $4$, which expands to $10x^3 + 20x^2 + 6x + 12$
      { id: "B", text: "$(5x^2 + 3)(2x + 4)$" },
      // distractor: flips the sign of the $4$, which expands to $10x^3 + 15x^2 - 8x - 12$
      { id: "C", text: "$(5x^2 - 4)(2x + 3)$" },
      // distractor: flips the sign of the $3$, which expands to $10x^3 - 15x^2 + 8x - 12$
      { id: "D", text: "$(5x^2 + 4)(2x - 3)$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Group in pairs: $5x^2(2x + 3) + 4(2x + 3) = (5x^2 + 4)(2x + 3)$.\n\n**The Full Solution:**\nStep 1: Split the four terms into two pairs: $(10x^3 + 15x^2) + (8x + 12)$.\nStep 2: Factor each pair: the first gives $5x^2(2x + 3)$ and the second gives $4(2x + 3)$.\nStep 3: Both pairs share $(2x + 3)$, so the volume is $(5x^2 + 4)(2x + 3)$. Check: expanding gives $10x^3 + 15x^2 + 8x + 12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($(5x^2 + 3)(2x + 4)$): swaps which constant goes where; expanding gives a middle term of $20x^2$.\n* Choice C ($(5x^2 - 4)(2x + 3)$): a sign slip on the second pair, producing $-8x - 12$.\n* Choice D ($(5x^2 + 4)(2x - 3)$): a sign slip inside the shared binomial, producing $-15x^2$.\n\n**Test Day Takeaway:** After factoring each pair, the two leftover binomials must be IDENTICAL — if they are not, regroup or recheck a sign.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-288",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A stadium-lighting model uses the polynomial $12x^3 + 8x^2 + 15x + k$, where $x$ is the mast height in meters and $k$ is a constant set by the number of fixtures on the mast. If $3x + 2$ divides that polynomial evenly, what number is $k$?",
    choices: [
      // distractor: reports the $5$ from the other factor rather than the product $5 \cdot 2$
      { id: "A", text: "$5$" },
      { id: "B", text: "$10$" },
      // distractor: quotes the coefficient of $x$ instead of the constant term
      { id: "C", text: "$15$" },
      // distractor: pairs $15$ with the $2$ from $3x + 2$, multiplying where it should divide
      { id: "D", text: "$30$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $12x^3 + 8x^2 = 4x^2(3x + 2)$, so the last pair must be $5(3x + 2) = 15x + 10$, giving $k = 10$.\n\n**The Full Solution:**\nStep 1: Factor the first pair: $12x^3 + 8x^2 = 4x^2(3x + 2)$.\nStep 2: For $3x + 2$ to divide the whole polynomial, the second pair must also be a multiple of $3x + 2$. Since the $x$-term is $15x$, that multiple is $5(3x + 2)$.\nStep 3: Then $5(3x + 2) = 15x + 10$, so $k = 10$. Check: $(4x^2 + 5)(3x + 2) = 12x^3 + 8x^2 + 15x + 10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): that is the multiplier in front of $3x + 2$, not the constant it produces.\n* Choice C ($15$): the coefficient of $x$ in the same pair, one column too far left.\n* Choice D ($30$): multiplies $15$ by $2$ instead of matching $15x$ to $5(3x)$.\n\n**Test Day Takeaway:** Factor the pair you can, then force the remaining pair to carry the SAME binomial — the constant falls out of that match.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-289",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A burrow holds $9x^3 + 6x^2 + 12x + 8$ cubic meters of air when its entrance measures $x$ meters across, and a surveyor wants that volume expression written as a product of two binomials. Which binomial divides it evenly?",
    choices: [
      // distractor: pairs the $4$ from the quadratic factor with the $3x$ from the binomial
      { id: "A", text: "$3x + 4$" },
      // distractor: reports the quadratic factor with the wrong constant; the true one is $3x^2 + 4$
      { id: "B", text: "$3x^2 + 2$" },
      { id: "C", text: "$3x + 2$" },
      // distractor: keeps the constant but drops the coefficient $3$ from the shared binomial
      { id: "D", text: "$x + 2$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $3x^2(3x + 2) + 4(3x + 2) = (3x^2 + 4)(3x + 2)$, so $3x + 2$ is a factor.\n\n**The Full Solution:**\nStep 1: Pair the terms: $(9x^3 + 6x^2) + (12x + 8)$.\nStep 2: Factor each pair: $3x^2(3x + 2)$ and $4(3x + 2)$.\nStep 3: The shared binomial is $3x + 2$, and the full factorization is $(3x^2 + 4)(3x + 2)$. Check: expanding gives $9x^3 + 6x^2 + 12x + 8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3x + 4$): mixes the $3x$ of one factor with the $4$ of the other.\n* Choice B ($3x^2 + 2$): the quadratic factor is $3x^2 + 4$; the $2$ belongs to the binomial.\n* Choice D ($x + 2$): dividing by $x + 2$ leaves a remainder, since the pairs share $3x + 2$, not $x + 2$.\n\n**Test Day Takeaway:** Grouping hands you BOTH factors at once — check a candidate by seeing whether it is the binomial the two pairs share.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-am-290",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Wind load on a panel, in newtons, is modeled by $p(x) = 4x^3 - 6x^2 + 10x - 15$, where $x$ is the gust speed in meters per second, and engineers report that the load is zero at exactly one real value of $x$ in the tested range. What is that value?",
    choices: [
      { id: "A", text: "$1.5$" },
      // distractor: solves $2x - 5 = 0$, pairing the $5$ with the $2x$ of the wrong factor
      { id: "B", text: "$2.5$" },
      // distractor: reads the constant inside $2x - 3$ as the solution instead of solving for $x$
      { id: "C", text: "$3$" },
      // distractor: reads the $5$ from the factor $2x^2 + 5$, which has no real zero at all
      { id: "D", text: "$5$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** $p(x) = 2x^2(2x - 3) + 5(2x - 3) = (2x^2 + 5)(2x - 3)$, and only $2x - 3 = 0$ has a real solution: $x = 1.5$.\n\n**The Full Solution:**\nStep 1: Group the terms: $(4x^3 - 6x^2) + (10x - 15)$, which factor as $2x^2(2x - 3)$ and $5(2x - 3)$.\nStep 2: So $p(x) = (2x^2 + 5)(2x - 3)$.\nStep 3: Setting $2x^2 + 5 = 0$ gives $x^2 = -2.5$, impossible for real $x$, so the only real zero comes from $2x - 3 = 0$, that is $x = 1.5$. Check: $p(1.5) = 13.5 - 13.5 + 15 - 15 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($2.5$): builds the factor $2x - 5$, mixing the $2$ of one pair with the $5$ of the other.\n* Choice C ($3$): quotes the constant in $2x - 3$ without dividing by $2$.\n* Choice D ($5$): treats $2x^2 + 5$ as if it contributed a real zero, which it cannot since it is always positive.\n\n**Test Day Takeaway:** After grouping, test each factor separately — a quadratic factor with a positive constant and a positive leading coefficient contributes no real solutions.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── P.A. COMPLETING THE SQUARE (bank-am-291..298) — new canonical ────────
  // Forward direction: ax² + bx + c → a(x − h)² + k. Distinct from
  // vertex-form-to-standard-form (reverse direction; we already have that).
  {
    id: "bank-am-291",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $f$ is defined by $f(x) = x^2 + 10x + 18$. Which of the following equivalent forms of $f(x)$ displays the minimum value of $f$ as a constant?",
    choices: [
      { id: "A", text: "$(x + 5)^2 - 7$" },
      // distractor: adds the leftover $7$ instead of subtracting it
      { id: "B", text: "$(x + 5)^2 + 7$" },
      // distractor: keeps the original constant and never subtracts the $25$
      { id: "C", text: "$(x + 5)^2 + 18$" },
      // distractor: uses $b$ instead of $\dfrac{b}{2}$ inside the square
      { id: "D", text: "$(x + 10)^2 - 82$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Completing the Square**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Half of $10$ is $5$, and $(x + 5)^2 = x^2 + 10x + 25$, which is $7$ too big — so $f(x) = (x + 5)^2 - 7$.\n\n**The Full Solution:**\nStep 1: To complete the square on $x^2 + 10x$, take half the coefficient of $x$: $\\dfrac{10}{2} = 5$, and note $(x + 5)^2 = x^2 + 10x + 25$.\nStep 2: Rewrite: $f(x) = (x^2 + 10x + 25) - 25 + 18 = (x + 5)^2 - 7$.\nStep 3: Since $(x + 5)^2 \\ge 0$, the smallest value of $f$ is $-7$, displayed as the constant. Check: $f(-5) = 25 - 50 + 18 = -7$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($(x + 5)^2 + 7$): expanding gives $x^2 + 10x + 32$; the $25$ must be SUBTRACTED after it is added.\n* Choice C ($(x + 5)^2 + 18$): the original constant was carried along untouched, giving $x^2 + 10x + 43$.\n* Choice D ($(x + 10)^2 - 82$): this squares $b$ itself instead of $\\dfrac{b}{2}$, giving $x^2 + 20x + 18$.\n\n**Test Day Takeaway:** Halve the $x$-coefficient, square it, add and subtract it. Expanding your answer takes five seconds and catches every version of this slip.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-292",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The graph of $y = x^2 - 6x + 2$ is shown in the $xy$-plane. Which of the following equivalent forms of the equation displays the coordinates of the vertex as constants?",
    diagram: { type: "quadraticVertex", params: { vertex: [3, -7], a: 1, showVertex: true } },
    choices: [
      { id: "A", text: "$y = (x - 3)^2 - 7$" },
      // distractor: keeps the original constant term
      { id: "B", text: "$y = (x - 3)^2 + 2$" },
      // distractor: adds $9$ instead of subtracting it
      { id: "C", text: "$y = (x - 3)^2 + 11$" },
      // distractor: uses $b = -6$ in place of $\dfrac{b}{2} = -3$
      { id: "D", text: "$y = (x - 6)^2 - 34$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Completing the Square**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Half of $-6$ is $-3$, and $(x - 3)^2 = x^2 - 6x + 9$, which is $7$ too big — so $y = (x - 3)^2 - 7$, matching the low point $(3, -7)$ on the graph.\n\n**The Full Solution:**\nStep 1: Complete the square on $x^2 - 6x$: half of $-6$ is $-3$, and $(x - 3)^2 = x^2 - 6x + 9$.\nStep 2: Rewrite: $y = (x^2 - 6x + 9) - 9 + 2 = (x - 3)^2 - 7$.\nStep 3: In the form $y = (x - h)^2 + k$, the vertex is $(h, k) = (3, -7)$, which is exactly the lowest point shown on the graph. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($y = (x - 3)^2 + 2$): the constant $2$ was carried over unchanged; this expands to $x^2 - 6x + 11$ and puts the vertex at $(3, 2)$, above the $x$-axis.\n* Choice C ($y = (x - 3)^2 + 11$): the $9$ was added instead of subtracted.\n* Choice D ($y = (x - 6)^2 - 34$): the full coefficient $-6$ was used inside the square, giving a vertex at $(6, -34)$, far below the graph shown.\n\n**Test Day Takeaway:** Vertex form reads the vertex straight off. When a graph is given, match your $(h, k)$ to the picture before choosing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-293",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "fill-in",
    question: "A tension expression $x^{2}+14x+22$ is rewritten as $(x+h)^{2}+k$ so that its minimum is displayed. What is the value of $h+k$?",
    correctAnswer: "-20",
    explanation: "**SAT Pattern: Completing the Square**\n\n**The correct answer is $-20$.**\n\n**The Fast Way (~20s):** Half of $14$ is $7$, so $h=7$ and $k=22-49=-27$, giving $h+k=-20$.\n\n**The Full Solution:**\nStep 1: Complete the square: $x^{2}+14x=(x+7)^{2}-49$.\nStep 2: So $x^{2}+14x+22=(x+7)^{2}-49+22=(x+7)^{2}-27$, giving $h=7$ and $k=-27$.\nStep 3: Then $h+k=7+(-27)=-20$. Check at $x=0$: $(0+7)^{2}-27=49-27=22$ ✓\n\n**Common Mistakes:**\n* $22$: used $k=22-7=15$, subtracting $h$ instead of $h^{2}$.\n* $34$: dropped the sign of $k$ and computed $7+27$.\n* $-27$: reported $k$ alone instead of $h+k$.\n\n**Test Day Takeaway:** Completing the square subtracts the square of half the linear coefficient — that square is what changes the constant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-294",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The two forms of a pump's flow expression satisfy $x^{2}+kx+40=(x+h)^{2}+4$ for all values of $x$, where $h$ and $k$ are positive constants. What is the value of $h+k$?",
    choices: [
      // distractor: reported h alone instead of h + k
      { id: "A", text: "$6$" },
      // distractor: reported k alone instead of h + k
      { id: "B", text: "$12$" },
      { id: "C", text: "$18$" },
      // distractor: added h to the constant term 40 instead of to k
      { id: "D", text: "$46$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Completing the Square**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Constants give $h^{2}+4=40$, so $h=6$; then $k=2h=12$ and $h+k=18$.\n\n**The Full Solution:**\nStep 1: Expand the right side: $(x+h)^{2}+4=x^{2}+2hx+h^{2}+4$.\nStep 2: Match constants: $h^{2}+4=40$, so $h^{2}=36$ and $h=6$ because $h$ is positive.\nStep 3: Match the $x$-terms: $k=2h=12$, so $h+k=18$. Check: $(x+6)^{2}+4=x^{2}+12x+40$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): reports $h$ alone.\n* Choice B ($12$): reports $k$ alone.\n* Choice D ($46$): adds $h$ to the constant term $40$ instead of to $k$.\n\n**Test Day Takeaway:** Matching two forms means matching every coefficient — the constants pin down $h$, and the $x$-terms then pin down $k$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-295",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An alloy's shrinkage is modeled by $g(x)=(x-5)^{2}-31$. Written as $g(x)=x^{2}+bx+c$, with $b$ and $c$ constants, what is the value of $c-b$?",
    choices: [
      // distractor: forgot the +25 from expanding the square, using c = -31
      { id: "A", text: "$-21$" },
      // distractor: sign slip, using b = 10 instead of b = -10
      { id: "B", text: "$-16$" },
      // distractor: computed b - c instead of c - b
      { id: "C", text: "$-4$" },
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Completing the Square**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Expanding gives $x^{2}-10x-6$, so $c-b=-6-(-10)=4$.\n\n**The Full Solution:**\nStep 1: Expand: $(x-5)^{2}-31=x^{2}-10x+25-31$.\nStep 2: Combine constants: $g(x)=x^{2}-10x-6$, so $b=-10$ and $c=-6$.\nStep 3: Then $c-b=-6+10=4$. Check at $x=0$: $g(0)=25-31=-6$, matching $c=-6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-21$): forgets the $+25$ from expanding the square, using $c=-31$.\n* Choice B ($-16$): sign slip, using $b=10$ instead of $-10$.\n* Choice C ($-4$): computes $b-c$ instead of $c-b$.\n\n**Test Day Takeaway:** Expanding vertex form always leaves a leftover square — that $+25$ is what makes $c$ different from the vertex's $y$-value.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-296",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "fill-in",
    question: "A welding head's clearance above the workpiece, in millimeters, is $x^{2}-kx+45$, where $x$ is the time in seconds since the pass began and $k$ is a positive constant. The least clearance during the pass is $9$ millimeters. What is the value of $k$?",
    correctAnswer: "12",
    explanation: "**SAT Pattern: Completing the Square**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~25s):** The least value of $x^{2}-kx+45$ is $45-\\dfrac{k^{2}}{4}$, so $\\dfrac{k^{2}}{4}=36$, $k^{2}=144$, and $k=12$.\n\n**The Full Solution:**\nStep 1: Complete the square: $x^{2}-kx+45=\\left(x-\\dfrac{k}{2}\\right)^{2}+45-\\dfrac{k^{2}}{4}$.\nStep 2: The squared term is never negative, so the least clearance is $45-\\dfrac{k^{2}}{4}$ millimeters. Set it equal to $9$: $\\dfrac{k^{2}}{4}=36$.\nStep 3: So $k^{2}=144$ and $k=12$, since $k$ is positive. Check: $x^{2}-12x+45=(x-6)^{2}+9$, whose least value is $9$, reached $6$ seconds into the pass ✓\n\n**Common Mistakes:**\n* $6$: solved $45-k^{2}=9$, forgetting to divide $k^{2}$ by $4$.\n* $36$: reported $\\dfrac{k^{2}}{4}$ instead of $k$.\n* $-12$: took the negative square root although $k$ is given as positive.\n\n**Test Day Takeaway:** For $x^{2}-kx+c$, the least value is $c-\\dfrac{k^{2}}{4}$ — memorize it and the parameter falls out in one line.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-297",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A coolant loop's temperature rise, in degrees Celsius, is $3x^{2}+12x+c$ when the control valve sits $x$ turns from its nominal position, and the least possible temperature rise is $0$ degrees Celsius. What is the value of $c$?",
    choices: [
      // distractor: squared the vertex input b/(2a) = 2 instead of computing b^2/(4a)
      { id: "A", text: "$4$" },
      { id: "B", text: "$12$" },
      // distractor: used b^2/4 = 36, omitting the factor a in the denominator
      { id: "C", text: "$36$" },
      // distractor: multiplied b^2/4 = 36 by a = 3 instead of dividing by a
      { id: "D", text: "$108$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Completing the Square**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The least value of $ax^{2}+bx+c$ is $c-\\dfrac{b^{2}}{4a}$, so $c-\\dfrac{144}{12}=0$ and $c=12$.\n\n**The Full Solution:**\nStep 1: Factor the leading coefficient: $3x^{2}+12x+c=3(x^{2}+4x)+c$.\nStep 2: Complete the square inside: $3\\left[(x+2)^{2}-4\\right]+c=3(x+2)^{2}-12+c$.\nStep 3: The least value is $c-12$, so $c-12=0$ and $c=12$. Check: $3x^{2}+12x+12=3(x+2)^{2}$, whose least value is $0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): squares the vertex input $\\dfrac{b}{2a}=2$ instead of computing $\\dfrac{b^{2}}{4a}$.\n* Choice C ($36$): uses $\\dfrac{b^{2}}{4}=36$, omitting the factor $a$ in the denominator.\n* Choice D ($108$): multiplies $36$ by $a=3$ instead of dividing.\n\n**Test Day Takeaway:** Factor the leading coefficient out of the $x$-terms first; forgetting it is the whole trap in this item.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-298",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = x^2 + bx + c$ is shown, where $b$ and $c$ are constants and the vertex of the graph is the marked point. What is the value of $b + c$?",
    diagram: { type: "quadraticVertex", params: { vertex: [-3, -4], a: 1, showVertex: true } },
    choices: [
      // distractor: uses $c = k - \dfrac{b^2}{4}$ instead of $c = k + \dfrac{b^2}{4}$, giving $c = -13$
      { id: "A", text: "$-7$" },
      // distractor: reads $b = 2h = -6$, dropping the negative sign in $x = -\dfrac{b}{2}$
      { id: "B", text: "$-1$" },
      // distractor: reports the vertex's $y$-coordinate as $c$ instead of the $y$-intercept
      { id: "C", text: "$2$" },
      { id: "D", text: "$11$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Completing the Square**\n\n**Choice D is correct.**\n\n**The Fast Way (~50s):** The marked vertex $(-3, -4)$ and a leading coefficient of $1$ give $y = (x + 3)^2 - 4 = x^2 + 6x + 5$, so $b + c = 6 + 5 = 11$.\n\n**The Full Solution:**\nStep 1: From the graph the vertex is the marked point $(-3, -4)$, and the coefficient of $x^2$ is $1$, so the vertex form of the equation is $y = (x + 3)^2 - 4$.\nStep 2: Expand to return to standard form: $(x + 3)^2 - 4 = x^2 + 6x + 9 - 4 = x^2 + 6x + 5$. Matching coefficients with $y = x^2 + bx + c$ gives $b = 6$ and $c = 5$.\nStep 3: Therefore $b + c = 6 + 5 = 11$. Check: completing the square on $x^2 + 6x + 5$ returns $(x + 3)^2 - 4$, and the graph does cross the $y$-axis at $(0, 5)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): this takes $c = k - \\dfrac{b^2}{4} = -4 - 9 = -13$ and adds $6$; the $9$ that completing the square subtracts must be added BACK on the way to standard form.\n* Choice B ($-1$): this reads $b = 2(-3) = -6$ from the vertex, dropping the negative sign in $x = -\\dfrac{b}{2}$, then adds the correct $c = 5$.\n* Choice C ($2$): this uses $c = -4$, the $y$-coordinate of the vertex; $c$ is the $y$-intercept of the graph, which the figure puts at $(0, 5)$.\n\n**Test Day Takeaway:** Read the vertex form straight off the marked point, then expand. The constant term $c$ is the $y$-intercept, never the height of the vertex.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "completing-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── P.B. POLYNOMIAL REMAINDER THEOREM (bank-am-299..306) — new canonical ─
  // p(a) = remainder when p(x) is divided by (x − a).
  {
    id: "bank-am-299",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives values of a polynomial function $p$ that models a spectrograph's wavelength offset, in nanometers, at grating index $x$. For some polynomial $q$ and some constant $r$, $p(x)=(x-3)q(x)+r$ for every $x$. What is the value of $r$?",
    diagram: { type: "table", params: { xHeader: "x", yHeader: "p(x)", rows: [["-1", "12"], ["0", "-4"], ["2", "6"], ["3", "9"], ["5", "40"]] } },
    choices: [
      // distractor: substitutes x = 0 instead of x = 3 and reports p(0) = -4
      { id: "A", text: "$-4$" },
      // distractor: substitutes x = 2, the row above the needed one, and reports p(2) = 6
      { id: "B", text: "$6$" },
      { id: "C", text: "$9$" },
      // distractor: substitutes x = 5 and reports p(5) = 40
      { id: "D", text: "$40$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Substituting $x=3$ kills the $(x-3)q(x)$ term, so $r=p(3)=9$.\n\n**The Full Solution:**\n\nStep 1: The identity $p(x)=(x-3)q(x)+r$ holds for every $x$, so it holds at $x=3$.\n\nStep 2: At $x=3$ the first term is $(3-3)q(3)=0$, leaving $p(3)=r$.\n\nStep 3: The table gives $p(3)=9$, so $r=9$. Check: with $r=9$ the identity reads $p(3)=0+9=9$, which matches the table entry exactly.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-4$): substitutes $x=0$ instead of $x=3$ and reports $p(0)=-4$.\n* Choice B ($6$): reads the row above the needed one and reports $p(2)=6$.\n* Choice D ($40$): reads the last row and reports $p(5)=40$.\n\n**Test Day Takeaway:** A constant remainder on division by $x-a$ is just the function value at $x=a$; find the row where the divisor vanishes.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-300",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "easy",
    type: "fill-in",
    question: "The height, in millimeters, of dough in a proofing tray $x$ hours after mixing is modeled by $h(x)=x^{3}-6x^{2}+11x+7$. When $h(x)$ is divided by $x-4$, the quotient is a polynomial and the remainder is a constant. What is that constant?",
    correctAnswer: "19",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**The correct answer is $19$.**\n\n**The Fast Way (~20s):** The constant remainder on division by $x-4$ equals $h(4)$, and $h(4)=64-96+44+7=19$.\n\n**The Full Solution:**\n\nStep 1: Write $h(x)=(x-4)q(x)+r$, where $q$ is a polynomial and $r$ is the constant remainder.\n\nStep 2: Substitute $x=4$. The product $(4-4)q(4)$ is $0$, so $r=h(4)$.\n\nStep 3: Evaluate: $4^{3}=64$, $-6(4)^{2}=-96$, $11(4)=44$, and the constant is $7$, so $h(4)=64-96+44+7=19$. Check: $64+44+7=115$ and $115-96=19$.\n\n**Common Mistakes:**\n\n* Substituting $x=-4$, the constant seen inside the divisor, gives $-64-96-44+7=-197$.\n* Dropping the constant term $+7$ gives $64-96+44=12$.\n\n**Test Day Takeaway:** Match the divisor $x-a$ to the input $x=a$; the remainder is one substitution away, never a long division.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-301",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The polynomial function $p$ is defined by $p(x) = 2x^3 - 7x^2 + cx - 9$, where $c$ is a constant. If $x - 3$ is a factor of $p(x)$, what is the value of $c$?",
    choices: [
      // distractor: treats the constant term as +9
      { id: "A", text: "$0$" },
      // distractor: drops the constant term
      { id: "B", text: "$3$" },
      { id: "C", text: "$6$" },
      // distractor: forgets the factor of 3 on cx
      { id: "D", text: "$18$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** If $x - 3$ is a factor, then $p(3) = 0$. Substituting gives $54 - 63 + 3c - 9 = 0$, so $3c = 18$ and $c = 6$.\n\n**The Full Solution:**\nStep 1: The factor theorem says $x - 3$ is a factor of $p(x)$ exactly when $p(3) = 0$.\nStep 2: $p(3) = 2(27) - 7(9) + c(3) - 9 = 54 - 63 + 3c - 9 = 3c - 18$.\nStep 3: Setting $3c - 18 = 0$ gives $c = 6$. Check: with $c = 6$, $p(3) = 54 - 63 + 18 - 9 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): treats the constant term as $+9$, solving $54 - 63 + 3c + 9 = 0$.\n* Choice B ($3$): drops the constant term $-9$ entirely, solving $54 - 63 + 3c = 0$.\n* Choice D ($18$): substitutes $x = 3$ into every term except $cx$, solving $54 - 63 + c - 9 = 0$.\n\n**Test Day Takeaway:** A factor $x - r$ means the polynomial is zero at $x = r$ — substitute $r$, keep every term, and solve the resulting linear equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-302",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Selected values of the polynomial function $q$ are given in the table, where $q(x) = x^3 + mx^2 + nx - 4$ and $m$ and $n$ are constants. Which equation relating $m$ and $n$ must be true?",
    diagram: { type: "dataTable", params: { headers: ["x", "q(x)"], rows: [["0", "-4"], ["2", "10"]] } },
    choices: [
      // distractor: substitutes x = -2
      { id: "A", text: "$2m - n = 11$" },
      // distractor: sets q(2) = 0
      { id: "B", text: "$2m + n = -2$" },
      // distractor: drops the constant term
      { id: "C", text: "$2m + n = 1$" },
      { id: "D", text: "$2m + n = 3$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The table gives $q(2) = 10$. Substituting $x = 2$ gives $8 + 4m + 2n - 4 = 10$, which reduces to $2m + n = 3$.\n\n**The Full Solution:**\nStep 1: The second row of the table says $q(2) = 10$, so substitute $x = 2$ into the definition of $q$.\nStep 2: $q(2) = 8 + 4m + 2n - 4 = 4m + 2n + 4$, so $4m + 2n + 4 = 10$.\nStep 3: Subtracting $4$ gives $4m + 2n = 6$, and dividing by $2$ gives $2m + n = 3$. Check: $m = 1$ and $n = 1$ satisfy this, and $q(x) = x^3 + x^2 + x - 4$ does give $q(2) = 8 + 4 + 2 - 4 = 10$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2m - n = 11$): substitutes $x = -2$ instead of $x = 2$, giving $-8 + 4m - 2n - 4 = 10$.\n* Choice B ($2m + n = -2$): sets $q(2) = 0$ instead of the listed value $10$.\n* Choice C ($2m + n = 1$): drops the constant term $-4$ when substituting, solving $8 + 4m + 2n = 10$.\n\n**Test Day Takeaway:** A table entry is an instruction to substitute: put the listed $x$ into the expression and set it equal to the listed output.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-303",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "medium",
    type: "fill-in",
    question: "The tension, in newtons, in a conveyor belt at a point $x$ meters from its drive pulley is modeled by $T(x)=(x+3)(2x^{2}-x+4)-5x$. What is the remainder when $T(x)$ is divided by $x-2$?",
    correctAnswer: "40",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**The correct answer is $40$.**\n\n**The Fast Way (~25s):** The remainder equals $T(2)=(5)(8-2+4)-10=50-10=40$; the factored form never has to be expanded.\n\n**The Full Solution:**\n\nStep 1: Division by $x-2$ leaves a constant remainder $r$ with $T(x)=(x-2)q(x)+r$, so $r=T(2)$.\n\nStep 2: Evaluate the first factor at $x=2$: $2+3=5$. Evaluate the second: $2(2)^{2}-2+4=8-2+4=10$.\n\nStep 3: Combine: $T(2)=5\\cdot10-5(2)=50-10=40$. Check: expanding gives $T(x)=2x^{3}+5x^{2}-4x+12$, and $2(8)+5(4)-4(2)+12=16+20-8+12=40$.\n\n**Common Mistakes:**\n\n* Substituting $x=-2$ gives $(1)(8+2+4)+10=24$, the remainder for the divisor $x+2$ instead.\n* Forgetting the trailing $-5x$ gives $5\\cdot10=50$.\n\n**Test Day Takeaway:** Evaluate the polynomial exactly as it is written; a factored form is faster to plug into than to expand.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-304",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the value of the polynomial function $p$ at three values of $x$. The function $q$ is defined by $q(x) = p(x) - 2x + 1$. What is the remainder when $q(x)$ is divided by $x - 3$?",
    diagram: { type: "dataTable", params: { headers: ["x", "p(x)"], rows: [["-1", "8"], ["1", "-4"], ["3", "5"]] } },
    choices: [
      // distractor: evaluates q at x = 1
      { id: "A", text: "$-5$" },
      { id: "B", text: "$0$" },
      // distractor: assumes the subtraction leaves the remainder unchanged
      { id: "C", text: "$5$" },
      // distractor: evaluates q at x = -1
      { id: "D", text: "$11$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The remainder is $q(3) = p(3) - 2(3) + 1$. The table gives $p(3) = 5$, so $q(3) = 5 - 6 + 1 = 0$.\n\n**The Full Solution:**\nStep 1: By the remainder theorem, dividing $q(x)$ by $x - 3$ leaves the remainder $q(3)$.\nStep 2: $q(3) = p(3) - 2(3) + 1 = p(3) - 5$.\nStep 3: The table's third row gives $p(3) = 5$, so $q(3) = 5 - 5 = 0$. Check: a remainder of $0$ means $x - 3$ divides $q(x)$ exactly, which is consistent with $q(3) = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): evaluates $q$ at $x = 1$ instead of $x = 3$: $-4 - 2 + 1 = -5$.\n* Choice C ($5$): reports $p(3)$, assuming that subtracting $2x - 1$ leaves the remainder unchanged.\n* Choice D ($11$): evaluates $q$ at $x = -1$, using the sign of the divisor's constant: $8 + 2 + 1 = 11$.\n\n**Test Day Takeaway:** Dividing by $x - 3$ always asks for the value at $x = 3$ — pick the row the divisor names, then apply the rest of the definition.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-305",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives four values of the polynomial function $f$, which models the thrust imbalance, in newtons, of a satellite thruster at calibration index $x$. Which of the following must be true?",
    diagram: { type: "table", params: { xHeader: "x", yHeader: "f(x)", rows: [["-6", "30"], ["-1", "8"], ["0", "-6"], ["3", "0"]] } },
    choices: [
      // distractor: a factor x + 1 requires f(-1) = 0, but the table gives f(-1) = 8
      { id: "A", text: "$x+1$ is a factor of $f(x)$." },
      { id: "B", text: "$x-3$ is a factor of $f(x)$." },
      // distractor: reads the value f(0) = -6 as the constant in a factor; x + 6 would require f(-6) = 0, and the table gives f(-6) = 30
      { id: "C", text: "$x+6$ is a factor of $f(x)$." },
      // distractor: treats the input 0 in the table as a zero of f, but the table gives f(0) = -6
      { id: "D", text: "$x$ is a factor of $f(x)$." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** A linear expression $x-a$ divides $f(x)$ exactly when $f(a)=0$, and the only listed value of $f$ that is $0$ is $f(3)=0$.\n\n**The Full Solution:**\n\nStep 1: Dividing $f(x)$ by $x-a$ leaves the remainder $f(a)$, so $x-a$ is a factor precisely when $f(a)=0$.\n\nStep 2: Match each candidate to the input that makes it zero: $x+1$ needs $f(-1)$, $x-3$ needs $f(3)$, $x+6$ needs $f(-6)$, and $x$ needs $f(0)$.\n\nStep 3: Read the table: $f(-1)=8$, $f(3)=0$, $f(-6)=30$, $f(0)=-6$. Only $f(3)$ is zero, so $x-3$ is a factor. Check: writing $f(x)=(x-3)q(x)$ gives $f(3)=0\\cdot q(3)=0$, consistent with the table.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: a factor $x+1$ would force $f(-1)=0$, but the table gives $f(-1)=8$.\n* Choice C: borrows the $6$ from $f(0)=-6$; a factor $x+6$ would force $f(-6)=0$, but the table gives $f(-6)=30$.\n* Choice D: treats the listed input $0$ as a zero of $f$, but the table gives $f(0)=-6$.\n\n**Test Day Takeaway:** Convert every factor claim into the single function value it predicts, then look that value up.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-306",
    domain: "advanced-math",
    skills: ["polynomials"],
    difficulty: "hard",
    type: "fill-in",
    question: "A combine harvester's header-height error, in millimeters, at ground speed $x$ kilometers per hour is modeled by $p(x)=x^{3}+kx^{2}-2x+5$, where $k$ is a constant. Dividing $p(x)$ by $x-4$ leaves a remainder $5$ times as large as the remainder left by dividing $p(x)$ by $x+2$. What is the value of $k$?",
    correctAnswer: "14",
    explanation: "**SAT Pattern: Polynomial Remainder Theorem**\n\n**The correct answer is $14$.**\n\n**The Fast Way (~45s):** The two remainders are $p(4)=61+16k$ and $p(-2)=1+4k$; setting $61+16k=5(1+4k)$ gives $56=4k$, so $k=14$.\n\n**The Full Solution:**\n\nStep 1: The remainder on division by $x-4$ is $p(4)=64+16k-8+5=61+16k$.\n\nStep 2: The remainder on division by $x+2$ is $p(-2)=-8+4k+4+5=1+4k$.\n\nStep 3: Translate the sentence into $61+16k=5(1+4k)$, so $61+16k=5+20k$ and $56=4k$, giving $k=14$. Check: $p(4)=61+224=285$, $p(-2)=1+56=57$, and $5\\cdot57=285$.\n\n**Common Mistakes:**\n\n* Reading the divisors' constants as the inputs, using $x=-4$ and $x=2$, gives $16k-51=5(4k+9)$ and the wrong value $k=-24$.\n* Attaching the factor $5$ to the wrong remainder, $5p(4)=p(-2)$, gives $305+80k=1+4k$ and the wrong value $k=-4$.\n\n**Test Day Takeaway:** Write both remainders as expressions in the unknown constant first; the comparison sentence then becomes a one-line linear equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── P.B. QUADRATIC INEQUALITY FROM CONTEXT (bank-am-307..314) ─────────────
  // From a real-world story → set up ax² + bx + c ≷ 0 → solve.
  {
    id: "bank-am-307",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The cross section of a tunnel is modeled by $y = -\\dfrac{1}{4}x^2 + 9$, where $x$ is the horizontal distance in meters from the center of the tunnel and $y$ is the height in meters above the road. The graph of this model is shown. For which values of $x$ is the tunnel more than $5$ meters high?",
    diagram: { type: "parabola", params: { vertex: { h: 0, k: 9 }, a: -0.25, xRange: [-8, 8], yRange: [-2, 10], xTickInterval: 2, yTickInterval: 2, gridInterval: 2, showVertex: true } },
    choices: [
      // distractor: solves y > 0, the road-level width
      { id: "A", text: "$-6 < x < 6$" },
      // distractor: fails to reverse the inequality
      { id: "B", text: "$x < -4$ or $x > 4$" },
      { id: "C", text: "$-4 < x < 4$" },
      // distractor: keeps only the right half
      { id: "D", text: "$0 < x < 4$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Solve $-\\dfrac{1}{4}x^2 + 9 > 5$. Then $\\dfrac{1}{4}x^2 < 4$, so $x^2 < 16$ and $-4 < x < 4$.\n\n**The Full Solution:**\nStep 1: \"More than $5$ meters high\" means $-\\dfrac{1}{4}x^2 + 9 > 5$.\nStep 2: Subtracting $9$ gives $-\\dfrac{1}{4}x^2 > -4$. Multiplying by $-4$ reverses the inequality: $x^2 < 16$.\nStep 3: $x^2 < 16$ means $|x| < 4$, so $-4 < x < 4$. Check: at $x = 0$ the height is $9$, which is more than $5$; at $x = 5$ the height is $-6.25 + 9 = 2.75$, which is not. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6 < x < 6$): solves $y > 0$ instead of $y > 5$, giving the tunnel's full width at road level.\n* Choice B ($x < -4$ or $x > 4$): forgets to reverse the inequality when multiplying by $-4$.\n* Choice D ($0 < x < 4$): keeps only the right half of the tunnel and drops the negative distances.\n\n**Test Day Takeaway:** Multiplying an inequality by a negative number flips it, and $x^2 < k$ always produces a two-sided interval around $0$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-308",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rectangular solar panel is $3$ feet longer than it is wide. If the width of the panel is $w$ feet, for which values of $w$ is the area of the panel less than $54$ square feet?",
    choices: [
      // distractor: keeps widths that cannot exist
      { id: "A", text: "$-9 < w < 6$" },
      // distractor: uses 9 as the upper bound
      { id: "B", text: "$0 < w < 9$" },
      // distractor: reverses the inequality
      { id: "C", text: "$w > 6$" },
      { id: "D", text: "$0 < w < 6$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** $w(w + 3) < 54$ becomes $(w + 9)(w - 6) < 0$, so $-9 < w < 6$. A width must be positive, leaving $0 < w < 6$.\n\n**The Full Solution:**\nStep 1: The length is $w + 3$, so the area is $w(w + 3)$ and the condition is $w(w + 3) < 54$.\nStep 2: Expanding and collecting gives $w^2 + 3w - 54 < 0$, which factors as $(w + 9)(w - 6) < 0$. The product is negative between the critical values, so $-9 < w < 6$.\nStep 3: A physical width satisfies $w > 0$, so the answer is $0 < w < 6$. Check: $w = 5$ gives an area of $5(8) = 40 < 54$, and $w = 6$ gives exactly $54$, which is not less. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9 < w < 6$): solves the inequality correctly but keeps negative widths the context forbids.\n* Choice B ($0 < w < 9$): uses $9$, the size of the negative critical value, as the upper bound.\n* Choice C ($w > 6$): reverses the inequality and describes the widths for which the area exceeds $54$.\n\n**Test Day Takeaway:** Solve the quadratic inequality first, then intersect the solution set with the values the context allows.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-309",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "fill-in",
    question: "The daily profit, in dollars, of a print shop that sells $n$ posters is modeled by $P(n) = -n^2 + 34n - 168$. What is the least number of posters the shop must sell for its daily profit to be positive?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~45s):** $-n^2 + 34n - 168 > 0$ becomes $(n - 6)(n - 28) < 0$, so $6 < n < 28$. The least whole number in that interval is $7$.\n\n**The Full Solution:**\nStep 1: Positive profit means $-n^2 + 34n - 168 > 0$. Multiplying by $-1$ reverses the inequality: $n^2 - 34n + 168 < 0$.\nStep 2: $n^2 - 34n + 168 = (n - 6)(n - 28)$, and this product is negative exactly when $6 < n < 28$.\nStep 3: $n$ counts posters, so the least whole number strictly greater than $6$ is $7$. Check: $P(6) = -36 + 204 - 168 = 0$, which is not positive, and $P(7) = -49 + 238 - 168 = 21$, which is. $\\checkmark$\n\n**Common Mistakes:** Answering $6$ uses the break-even count, where the profit is exactly $\\$0$ rather than positive. Answering $28$ gives the largest profitable count instead of the least. Forgetting to reverse the inequality when multiplying by $-1$ makes the solution set look like $n < 6$ or $n > 28$, which points to $n = 1$.\n\n**Test Day Takeaway:** \"Positive\" is strict — the boundary value breaks even, so step one past it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-310",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cable is suspended between two towers. Its height above the roadway, in meters, at a horizontal distance of $x$ meters from the left tower is modeled by $y = \\dfrac{1}{2}x^2 - 4x + 12$ for $0 \\le x \\le 8$. The graph of this model is shown. For which values of $x$ is the cable less than $6$ meters above the roadway?",
    diagram: { type: "parabola", params: { vertex: { h: 4, k: 4 }, a: 0.5, xRange: [0, 8], yRange: [0, 14], xTickInterval: 2, yTickInterval: 2, gridInterval: 2, showVertex: true } },
    choices: [
      // distractor: takes the stretch before the first crossing
      { id: "A", text: "$0 \\le x < 2$" },
      { id: "B", text: "$2 < x < 6$" },
      // distractor: uses the domain endpoint as the second crossing
      { id: "C", text: "$2 < x \\le 8$" },
      // distractor: solves the reversed inequality
      { id: "D", text: "$x < 2$ or $x > 6$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\dfrac{1}{2}x^2 - 4x + 12 < 6$ doubles to $x^2 - 8x + 12 < 0$, which factors as $(x - 2)(x - 6) < 0$, so $2 < x < 6$.\n\n**The Full Solution:**\nStep 1: The condition is $\\dfrac{1}{2}x^2 - 4x + 12 < 6$. Multiplying by $2$ gives $x^2 - 8x + 24 < 12$, or $x^2 - 8x + 12 < 0$.\nStep 2: $x^2 - 8x + 12 = (x - 2)(x - 6)$, and an upward parabola is below the axis strictly between its zeros, so $2 < x < 6$.\nStep 3: Both critical values lie inside the stated domain $0 \\le x \\le 8$, so no trimming is needed. Check: at $x = 4$ the height is $8 - 16 + 12 = 4$, which is less than $6$; at $x = 2$ it is $2 - 8 + 12 = 6$ exactly. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0 \\le x < 2$): takes the stretch before the first crossing, where the cable is still higher than $6$ meters.\n* Choice C ($2 < x \\le 8$): replaces the second crossing with the right end of the domain.\n* Choice D ($x < 2$ or $x > 6$): solves $y > 6$, the outside interval, instead of $y < 6$.\n\n**Test Day Takeaway:** An upward parabola sits below a horizontal level between its two crossings and above it outside them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-311",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A rectangular courtyard is enclosed by $48$ meters of fencing along its four sides. If the width of the courtyard is $w$ meters, for which values of $w$ is the enclosed area at least $140$ square meters?",
    choices: [
      // distractor: stops at the first critical value
      { id: "A", text: "$0 < w \\le 10$" },
      // distractor: does not reverse the inequality
      { id: "B", text: "$w \\le 10$ or $w \\ge 14$" },
      { id: "C", text: "$10 \\le w \\le 14$" },
      // distractor: uses the semiperimeter as the upper bound
      { id: "D", text: "$10 \\le w \\le 24$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** The perimeter forces length $= 24 - w$, so $w(24 - w) \\ge 140$ becomes $(w - 10)(w - 14) \\le 0$, giving $10 \\le w \\le 14$.\n\n**The Full Solution:**\nStep 1: A perimeter of $48$ means width plus length is $24$, so the length is $24 - w$ and the area is $w(24 - w)$.\nStep 2: $w(24 - w) \\ge 140$ gives $24w - w^2 \\ge 140$; moving everything to one side gives $w^2 - 24w + 140 \\le 0$.\nStep 3: $w^2 - 24w + 140 = (w - 10)(w - 14)$, which is at most $0$ exactly when $10 \\le w \\le 14$. Check: $w = 12$ gives $12(12) = 144 \\ge 140$, and $w = 9$ gives $9(15) = 135$, which falls short. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0 < w \\le 10$): stops at the first critical value instead of using the interval between the two.\n* Choice B ($w \\le 10$ or $w \\ge 14$): keeps the original direction after multiplying through by $-1$.\n* Choice D ($10 \\le w \\le 24$): replaces the second critical value with $24$, the sum of the width and length.\n\n**Test Day Takeaway:** When a perimeter is given, halve it first: the two adjacent sides sum to $\\dfrac{P}{2}$, not $P$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-312",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A firework is launched from the ground, and its height above the ground, in feet, $t$ seconds after launch is $h(t) = -16t^2 + 128t$. The firework is designed to explode while it is at least $240$ feet above the ground. What is the greatest whole number of seconds after launch at which it can explode?",
    choices: [
      // distractor: reports the first time the height reaches 240
      { id: "A", text: "$3$" },
      // distractor: reports the time of maximum height
      { id: "B", text: "$4$" },
      { id: "C", text: "$5$" },
      // distractor: reports the time the firework returns to the ground
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** $-16t^2 + 128t \\ge 240$ divides to $t^2 - 8t + 15 \\le 0$, or $(t - 3)(t - 5) \\le 0$, so $3 \\le t \\le 5$ and the greatest whole second is $5$.\n\n**The Full Solution:**\nStep 1: The condition is $-16t^2 + 128t \\ge 240$. Dividing by $-16$ reverses the inequality: $t^2 - 8t \\le -15$, or $t^2 - 8t + 15 \\le 0$.\nStep 2: $t^2 - 8t + 15 = (t - 3)(t - 5)$, so the height is at least $240$ feet exactly when $3 \\le t \\le 5$.\nStep 3: The greatest whole number of seconds in that window is $5$. Check: $h(5) = -400 + 640 = 240$, exactly at the limit, and $h(6) = -576 + 768 = 192$, which is too low. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): reports the first time the firework reaches $240$ feet rather than the last.\n* Choice B ($4$): reports the time of maximum height, $t = \\dfrac{-128}{2(-16)} = 4$.\n* Choice D ($8$): reports the time the firework returns to the ground, where $h(t) = 0$.\n\n**Test Day Takeaway:** \"At least\" includes the boundary — solve for the whole interval, then read off the end the question asks for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-313",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The concentration of a chemical in a tank, in milligrams per liter, $x$ hours after treatment is modeled by $C(x) = x^2 - 18x + 90$ for $0 \\le x \\le 9$. For which values of $x$ is the concentration less than $25$ milligrams per liter?",
    choices: [
      // distractor: takes the hours before the first crossing
      { id: "A", text: "$0 \\le x < 5$" },
      // distractor: solves the reversed inequality
      { id: "B", text: "$x < 5$ or $x > 13$" },
      // distractor: ignores the stated domain
      { id: "C", text: "$5 < x < 13$" },
      { id: "D", text: "$5 < x \\le 9$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~50s):** $x^2 - 18x + 90 < 25$ gives $(x - 5)(x - 13) < 0$, so $5 < x < 13$; the model only runs to $x = 9$, leaving $5 < x \\le 9$.\n\n**The Full Solution:**\nStep 1: The condition is $x^2 - 18x + 90 < 25$, or $x^2 - 18x + 65 < 0$.\nStep 2: $x^2 - 18x + 65 = (x - 5)(x - 13)$, which is negative exactly when $5 < x < 13$.\nStep 3: The model is defined only for $0 \\le x \\le 9$, so intersect: $5 < x \\le 9$. Check: $C(5) = 25 - 90 + 90 = 25$, which is not less than $25$, and $C(9) = 81 - 162 + 90 = 9$, which is. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0 \\le x < 5$): takes the hours before the first crossing, where the concentration is still above $25$.\n* Choice B ($x < 5$ or $x > 13$): solves $C(x) > 25$ instead of $C(x) < 25$.\n* Choice C ($5 < x < 13$): solves the inequality correctly but ignores the stated domain $0 \\le x \\le 9$.\n\n**Test Day Takeaway:** A model's domain is part of the answer — trim the solution set to the values the model actually covers.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-314",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "fill-in",
    question: "A rectangular photograph is $x$ inches wide and $x + 4$ inches tall, where $x$ is a positive integer. For how many values of $x$ is the area of the photograph greater than $45$ square inches and less than $140$ square inches?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~50s):** The area is $x(x + 4)$. Since $5(9) = 45$ and $10(14) = 140$, the strict inequalities leave $x = 6$, $7$, $8$, and $9$ — four values.\n\n**The Full Solution:**\nStep 1: The area condition is $45 < x(x + 4) < 140$, so solve the two inequalities separately.\nStep 2: $x^2 + 4x - 45 > 0$ factors as $(x + 9)(x - 5) > 0$, which for positive $x$ means $x > 5$; $x^2 + 4x - 140 < 0$ factors as $(x + 14)(x - 10) < 0$, which means $x < 10$.\nStep 3: So $5 < x < 10$, and the integer widths are $6$, $7$, $8$, $9$, a count of $4$. Check: $6(10) = 60$ and $9(13) = 117$, both strictly between $45$ and $140$. $\\checkmark$\n\n**Common Mistakes:** Counting $x = 5$ and $x = 10$ as well gives $6$; those widths give areas of exactly $45$ and exactly $140$, which the strict inequalities exclude. Answering $9$ reports the largest width instead of how many widths work. Solving only the lower bound gives $5$.\n\n**Test Day Takeaway:** When the question asks \"how many values,\" finish by listing the integers — the count, not an endpoint, is the answer.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "quadratic-inequality-from-context",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── P.B. RADICAL EQUATION (bank-am-315..322) — sqrt(...) = x ──────────────
  // Isolate the radical, square, check for extraneous solutions.
  {
    id: "bank-am-315",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The equation $\\sqrt{2x - 6} = 4$ has exactly one solution, and that solution is a positive integer. What is the value of $x$?",
    choices: [
      // distractor: never squares
      { id: "A", text: "$5$" },
      // distractor: doubles 4 instead of squaring it
      { id: "B", text: "$7$" },
      { id: "C", text: "$11$" },
      // distractor: squares term by term inside the radical
      { id: "D", text: "$26$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Radical Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Square both sides: $2x - 6 = 16$, so $2x = 22$ and $x = 11$.\n\n**The Full Solution:**\nStep 1: The radical already stands alone, so squaring both sides is legal: $\\left(\\sqrt{2x - 6}\\right)^2 = 4^2$ gives $2x - 6 = 16$.\nStep 2: Adding $6$ to each side gives $2x = 22$.\nStep 3: Dividing by $2$ gives $x = 11$. Check: $\\sqrt{2(11) - 6} = \\sqrt{16} = 4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): never squares, solving $2x - 6 = 4$.\n* Choice B ($7$): doubles the $4$ instead of squaring it, solving $2x - 6 = 8$.\n* Choice D ($26$): squares the radicand term by term, solving $2x - 36 = 16$.\n\n**Test Day Takeaway:** Squaring undoes a square root only when the radical stands alone, and it applies to the whole side at once — never term by term.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-316",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "easy",
    type: "fill-in",
    question: "The settling time, in seconds, of a silo discharge gate is modeled by $\\sqrt{3x+4}$, where $x$ is the gate load in tonnes. For what load is the settling time $7$ seconds?",
    correctAnswer: "15",
    explanation: "**SAT Pattern: Radical Equation**\n\n**The correct answer is $15$.**\n\n**The Fast Way (~20s):** From $\\sqrt{3x+4}=7$, square to get $3x+4=49$, so $3x=45$ and $x=15$.\n\n**The Full Solution:**\n\nStep 1: Set the model equal to the given time: $\\sqrt{3x+4}=7$.\n\nStep 2: Square both sides. The radical disappears and $3x+4=49$.\n\nStep 3: Solve the linear equation: $3x=45$, so $x=15$. Check: $3(15)+4=49$ and $\\sqrt{49}=7$, the stated settling time.\n\n**Common Mistakes:**\n\n* Solving $3x+4=7$ without squaring gives $x=1$.\n* Stopping at $3x=45$ and reporting $45$ instead of dividing by $3$.\n\n**Test Day Takeaway:** Isolate the radical, square once, and finish the linear equation — then substitute back to confirm the radical is nonnegative.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-317",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "For a photometer, the signal-to-noise ratio is modeled by $R(t)=\\sqrt{4t+12}$, where $t$ is the exposure time in seconds. For what exposure time is the ratio equal to $10$?",
    choices: [
      { id: "A", text: "$22$" },
      // distractor: drops the constant 12 and solves 4t = 100, giving 25
      { id: "B", text: "$25$" },
      // distractor: adds instead of subtracting, solving 4t = 100 + 12, giving 28
      { id: "C", text: "$28$" },
      // distractor: forgets to divide by 4 and reports 100 - 12 = 88
      { id: "D", text: "$88$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Radical Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** $\\sqrt{4t+12}=10$ squares to $4t+12=100$, so $4t=88$ and $t=22$.\n\n**The Full Solution:**\n\nStep 1: Set the model equal to the target ratio: $\\sqrt{4t+12}=10$.\n\nStep 2: Square both sides: $4t+12=100$.\n\nStep 3: Subtract, then divide: $4t=88$ and $t=22$. Check: $4(22)+12=100$ and $\\sqrt{100}=10$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($25$): ignores the $+12$ and solves $4t=100$.\n* Choice C ($28$): adds $12$ to $100$ instead of subtracting it.\n* Choice D ($88$): stops at $4t=88$ and reports $88$ without dividing by $4$.\n\n**Test Day Takeaway:** After squaring, undo the constant before the coefficient; skipping either step lands on a listed answer.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-318",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A pipeline-inspection routine must replace the radical equation $\\sqrt{x+5}=x-1$ with a polynomial equation whose solutions include every solution of the original. Which of the following equations has that property?",
    choices: [
      { id: "A", text: "$x+5=x^{2}-2x+1$" },
      // distractor: expands (x - 1) squared as a difference of squares, giving x squared minus 1
      { id: "B", text: "$x+5=x^{2}-1$" },
      // distractor: squares x and -1 separately, giving x squared plus 1 and dropping the -2x term
      { id: "C", text: "$x+5=x^{2}+1$" },
      // distractor: squares only the x inside the radical, leaving x squared plus 5 on the left
      { id: "D", text: "$x^{2}+5=x^{2}-2x+1$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Radical Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Squaring both sides replaces the left side by $x+5$ and the right side by $(x-1)^{2}=x^{2}-2x+1$.\n\n**The Full Solution:**\n\nStep 1: If a number satisfies $\\sqrt{x+5}=x-1$, then the squares of the two sides are equal as well.\n\nStep 2: The left side squares to $x+5$, because $\\left(\\sqrt{x+5}\\right)^{2}=x+5$ whenever the radicand is nonnegative.\n\nStep 3: The right side squares to $(x-1)^{2}=x^{2}-2x+1$, so every solution satisfies $x+5=x^{2}-2x+1$. Check: that equation is $x^{2}-3x-4=0$, with solutions $4$ and $-1$; $x=4$ satisfies the original equation, and the polynomial equation does contain it.\n\n**Why the wrong answers are tempting:**\n\n* Choice B: expands $(x-1)^{2}$ as $x^{2}-1$, a difference-of-squares pattern that does not apply.\n* Choice C: squares $x$ and $-1$ separately and loses the $-2x$ cross term.\n* Choice D: squares only the $x$ inside the radical instead of the whole radicand.\n\n**Test Day Takeaway:** Squaring acts on each entire side, so a binomial side must be expanded with the cross term intact.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-319",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "medium",
    type: "fill-in",
    question: "A brine tank's discharge model requires $\\sqrt{x+k}=x-3$ to hold, where $k$ is a constant and $x$ is the brine depth in centimeters. The only depth that satisfies the model is $x=7$. What is the value of $k$?",
    correctAnswer: "9",
    explanation: "**SAT Pattern: Radical Equation**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~30s):** At $x=7$ the right side is $4$, so $\\sqrt{7+k}=4$, giving $7+k=16$ and $k=9$.\n\n**The Full Solution:**\n\nStep 1: Substitute the given depth: $\\sqrt{7+k}=7-3=4$.\n\nStep 2: Square both sides: $7+k=16$.\n\nStep 3: Solve: $k=9$. Check: with $k=9$ the model reads $\\sqrt{x+9}=x-3$, and at $x=7$ both sides equal $4$.\n\n**Common Mistakes:**\n\n* Failing to square the right side, so $7+k=4$ and $k=-3$.\n* Squaring $x-3$ as $x^{2}-9$, so $7+k=49-9=40$ and $k=33$.\n\n**Test Day Takeaway:** When a solution is handed to you, substitute first — the radical becomes a number and the unknown constant falls out in one line.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-320",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In an orchard sprayer's nozzle calibration, the difference $\\sqrt{x+c}-\\sqrt{x}$ equals $1$ at a line pressure of $x=16$ bars, where $c$ is a positive constant. What is the value of $c$?",
    choices: [
      // distractor: never squares, solving 16 + c = 5, which gives -11
      { id: "A", text: "$-11$" },
      // distractor: squares term by term, using 16 + c = 1 + 16 = 17, which gives 1
      { id: "B", text: "$1$" },
      { id: "C", text: "$9$" },
      // distractor: reports 25, the value of 16 + c, instead of c itself
      { id: "D", text: "$25$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Radical Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** At $x=16$ the equation becomes $\\sqrt{16+c}=1+\\sqrt{16}=5$, so $16+c=25$ and $c=9$.\n\n**The Full Solution:**\n\nStep 1: Substitute $x=16$: $\\sqrt{16+c}-\\sqrt{16}=1$, and $\\sqrt{16}=4$.\n\nStep 2: Isolate the remaining radical: $\\sqrt{16+c}=1+4=5$.\n\nStep 3: Square and solve: $16+c=25$, so $c=9$. Check: $\\sqrt{16+9}-\\sqrt{16}=5-4=1$, and $c=9$ is positive as required.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-11$): drops the squaring step and solves $16+c=5$.\n* Choice B ($1$): squares each term on its own, using $16+c=1^{2}+4^{2}=17$.\n* Choice D ($25$): reports the value of $16+c$ instead of the constant $c$.\n\n**Test Day Takeaway:** With two radicals, move one across first so the squaring step has a single radical to remove.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-321",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A coffee roaster's drum-charge model gives $\\sqrt{x+5}+\\sqrt{x}=5$, where $x$ is the charge mass in kilograms and $x+5$ is the mass after a top-up. Exactly one value of $x$ satisfies this equation. What is that value?",
    choices: [
      // distractor: reports the square root of x, which is 2, instead of x itself
      { id: "A", text: "$2$" },
      { id: "B", text: "$4$" },
      // distractor: squares each term separately, solving x + 5 + x = 25, which gives 10
      { id: "C", text: "$10$" },
      // distractor: drops the second radical and solves the square root of x + 5 equal to 5, which gives 20
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Radical Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** Moving $\\sqrt{x}$ across and squaring gives $x+5=25-10\\sqrt{x}+x$, so $10\\sqrt{x}=20$, $\\sqrt{x}=2$, and $x=4$.\n\n**The Full Solution:**\n\nStep 1: Isolate one radical: $\\sqrt{x+5}=5-\\sqrt{x}$.\n\nStep 2: Square both sides, keeping the cross term: $x+5=25-10\\sqrt{x}+x$, which reduces to $10\\sqrt{x}=20$.\n\nStep 3: So $\\sqrt{x}=2$ and $x=4$. Check: $\\sqrt{4+5}+\\sqrt{4}=3+2=5$, matching the model.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($2$): stops at $\\sqrt{x}=2$ and reports the root rather than $x$.\n* Choice C ($10$): squares each term on its own, solving $x+5+x=25$.\n* Choice D ($20$): ignores $\\sqrt{x}$ and solves $\\sqrt{x+5}=5$.\n\n**Test Day Takeaway:** Two radicals means separating them before squaring, and the square of a binomial always keeps its middle term.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-322",
    domain: "advanced-math",
    skills: ["radical-equations"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An irrigation controller stores the four square-root equations listed below, each a setpoint condition on the valve offset $x$ in millimeters. Which of the four equations has no real solution?",
    choices: [
      // distractor: assumes a principal square root cannot equal 0, but x = -3 makes the radicand 0 and the equation true
      { id: "A", text: "$\\sqrt{x+3}=0$" },
      // distractor: assumes the radicand x - 3 is always negative, but x = 7 makes it 4
      { id: "B", text: "$\\sqrt{x-3}=2$" },
      // distractor: assumes 3 - x is always negative, but x = -22 makes it 25
      { id: "C", text: "$\\sqrt{3-x}=5$" },
      { id: "D", text: "$\\sqrt{x+3}=-2$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Radical Equation**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** A principal square root is never negative, so no real $x$ can make $\\sqrt{x+3}$ equal $-2$.\n\n**The Full Solution:**\n\nStep 1: For every real number in the domain of a square root, the output of $\\sqrt{\\ }$ is greater than or equal to $0$.\n\nStep 2: In choice D the right side is $-2$, which is less than $0$, so no input can produce it.\n\nStep 3: Each other equation does have a solution: $x=-3$ solves choice A, $x=7$ solves choice B, and $x=-22$ solves choice C. Check: $\\sqrt{-3+3}=0$, $\\sqrt{7-3}=2$, and $\\sqrt{3-(-22)}=\\sqrt{25}=5$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: assumes a square root cannot equal $0$; it does, at $x=-3$.\n* Choice B: assumes $x-3$ must be negative; at $x=7$ it is $4$.\n* Choice C: assumes $3-x$ must be negative; at $x=-22$ it is $25$.\n\n**Test Day Takeaway:** Check the sign of the isolated side before doing any algebra — a negative value on the far side of a principal square root ends the question.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radical-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── P.B. EXPONENTIAL EQ WITH COMMON BASE (bank-am-323..330) ──────────────
  // Rewrite both sides as same base, set exponents equal.
  {
    id: "bank-am-323",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives three values of the exponential function $C$, where $C(t)$ is the number of algal colonies in a tide pool $t$ weeks after monitoring began. For what value of $t$ does the model give $4^{6}$ colonies?",
    diagram: { type: "dataTable", params: { headers: ["Week t", "Colonies C(t)"], rows: [["0", "4"], ["1", "16"], ["2", "64"]] } },
    choices: [
      // distractor: halves the target exponent, as if the count doubled rather than quadrupled each week
      { id: "A", text: "$3$" },
      // distractor: shifts by $2$ instead of $1$, using $C(t) = 4^{t+2}$
      { id: "B", text: "$4$" },
      { id: "C", text: "$5$" },
      // distractor: reads the exponent $6$ as $t$, ignoring the count of $4$ already present at $t = 0$
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The table's counts are $4^{1}$, $4^{2}$, $4^{3}$, so $C(t) = 4^{t+1}$; setting $t + 1 = 6$ gives $t = 5$.\n\n**The Full Solution:**\nStep 1: Rewrite each table entry as a power of $4$: $4 = 4^{1}$, $16 = 4^{2}$, and $64 = 4^{3}$.\nStep 2: The exponent is one more than $t$ in every row, so $C(t) = 4^{t+1}$.\nStep 3: With equal bases, $4^{t+1} = 4^{6}$ forces $t + 1 = 6$, so $t = 5$. Check: $C(5) = 4^{6} = 4096$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): halves $6$, which would be right only if each week multiplied the count by $2$.\n* Choice B ($4$): uses the rule $C(t) = 4^{t+2}$, off by one row.\n* Choice D ($6$): treats the exponent on the right as $t$ itself, forgetting that week $0$ already holds $4^{1}$ colonies.\n\n**Test Day Takeaway:** Write every table value as a power of the same base first; the rule then reads straight off the exponents.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-324",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "easy",
    type: "fill-in",
    question: "An ant supercolony on a coastal heath holds $27^{4}$ ants in total, and a monitoring app displays that same count in the compact form $9^{x}$ ants for the field crew. What is the value of $x$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~15s):** Both sides are powers of $3$: $3^{2x} = 3^{12}$, so $2x = 12$ and $x = 6$.\n\n**The Full Solution:**\nStep 1: Write each base as a power of $3$: $9 = 3^{2}$ and $27 = 3^{3}$.\nStep 2: Then $9^{x} = 3^{2x}$ and $27^{4} = 3^{12}$.\nStep 3: Equal bases force $2x = 12$, so $x = 6$. Check: $9^{6} = 531{,}441$ and $27^{4} = 531{,}441$ ✓\n\n**Common Mistakes:**\n* $12$ — matching $x$ to the exponent $12$ without dividing by the $2$ that came from $9 = 3^{2}$.\n* $8$ — multiplying the exponents $4$ and $2$ on the wrong side, as if $27^{4}$ were $3^{4 \\cdot 2}$.\n\n**Test Day Takeaway:** Rewrite both sides over the smallest shared base; only then are the exponents safe to equate.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-325",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Lichen patches on a boulder are modeled by the exponential function $P$, three of whose values appear in the table, where $t$ counts days since the first census. At what value of $t$ does the model predict $81^{3}$ patches?",
    diagram: { type: "dataTable", params: { headers: ["Day t", "Patches P(t)"], rows: [["0", "3"], ["2", "27"], ["4", "243"]] } },
    choices: [
      // distractor: reads $81^{3}$ as $3^{4+3} = 3^{7}$, solving $t + 1 = 7$
      { id: "A", text: "$6$" },
      { id: "B", text: "$11$" },
      // distractor: ignores the three patches already present at $t = 0$, setting $t$ equal to the exponent $12$
      { id: "C", text: "$12$" },
      // distractor: adds $1$ instead of subtracting when isolating $t$ in $t + 1 = 12$
      { id: "D", text: "$13$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The table gives $P(t) = 3^{t+1}$, and $81^{3} = 3^{12}$, so $t + 1 = 12$ and $t = 11$.\n\n**The Full Solution:**\nStep 1: Each listed value is a power of $3$: $3 = 3^{1}$ at $t = 0$, $27 = 3^{3}$ at $t = 2$, and $243 = 3^{5}$ at $t = 4$.\nStep 2: The exponent runs one ahead of $t$, so $P(t) = 3^{t+1}$. Also $81 = 3^{4}$, so $81^{3} = 3^{12}$.\nStep 3: Equal bases force $t + 1 = 12$, so $t = 11$. Check: $P(11) = 3^{12} = 531{,}441$, which equals $81^{3}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): adds the exponents in $81^{3}$ instead of multiplying, turning $3^{12}$ into $3^{7}$.\n* Choice C ($12$): matches $t$ directly to the exponent, missing the shift the table shows at $t = 0$.\n* Choice D ($13$): solves $t + 1 = 12$ in the wrong direction.\n\n**Test Day Takeaway:** A power of a power multiplies exponents — convert both the model and the target to one base before comparing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-326",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table lists the mass, in grams, of tracer dye remaining in a stream on each of the first four days after release, measured at the same gauge. If the pattern continues, on which day is the remaining mass $\\frac{1}{25}$ gram?",
    diagram: { type: "dataTable", params: { headers: ["Day d", "Mass (grams)"], rows: [["0", "625"], ["1", "125"], ["2", "25"], ["3", "5"]] } },
    choices: [
      // distractor: solves $4 - d = -2$ as $d = -2 - 4$, moving the terms in the wrong direction
      { id: "A", text: "$-6$" },
      // distractor: reads $\frac{1}{25}$ as $5^{2}$ and solves $4 - d = 2$
      { id: "B", text: "$2$" },
      // distractor: reports the exponent in $5^{4}$, which is the day-$0$ mass rather than the day asked for
      { id: "C", text: "$4$" },
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The masses are $5^{4}, 5^{3}, 5^{2}, 5^{1}$, so the mass on day $d$ is $5^{4-d}$; setting $4 - d = -2$ gives $d = 6$.\n\n**The Full Solution:**\nStep 1: Rewrite the table entries as powers of $5$: $625 = 5^{4}$, $125 = 5^{3}$, $25 = 5^{2}$, and $5 = 5^{1}$.\nStep 2: The exponent drops by one each day, so the mass on day $d$ is $5^{4-d}$, and $\\frac{1}{25} = 5^{-2}$.\nStep 3: Equal bases force $4 - d = -2$, so $d = 6$. Check: on day $6$ the mass is $5^{-2} = \\frac{1}{25}$ gram, and day $4$ would give $1$ gram, day $5$ would give $\\frac{1}{5}$ gram ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): flips the sign while isolating $d$; a negative day is also impossible here.\n* Choice B ($2$): drops the negative sign on the exponent of $\\frac{1}{25}$.\n* Choice C ($4$): quotes the starting exponent instead of solving for the day.\n\n**Test Day Takeaway:** A reciprocal is a negative exponent — write $\\frac{1}{b^{n}}$ as $b^{-n}$ before matching exponents.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-327",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "fill-in",
    question: "A team's training app reports a session's load index as $25^{3x}$, while the season summary sheet gives the same index as $5^{kx}$; the two agree at every positive value of $x$. What constant must $k$ be?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~20s):** $25^{3x} = 5^{6x}$, so matching with $5^{kx}$ gives $k = 6$.\n\n**The Full Solution:**\nStep 1: Write the left base over the shared base $5$: $25 = 5^{2}$, so $25^{3x} = \\left(5^{2}\\right)^{3x}$.\nStep 2: A power of a power multiplies exponents: $\\left(5^{2}\\right)^{3x} = 5^{6x}$.\nStep 3: Since $5^{6x} = 5^{kx}$ for every positive $x$, the exponents match and $k = 6$. Check: at $x = 2$, $25^{6} = 244{,}140{,}625$ and $5^{12} = 244{,}140{,}625$ ✓\n\n**Common Mistakes:**\n* $3$ — leaving the exponent as it stands and never converting $25$ to $5^{2}$.\n* $15$ — multiplying $5$ by $3$, using the base as though it were an exponent.\n\n**Test Day Takeaway:** Converting a base to a power of a smaller base multiplies the exponent by that power — here every exponent doubles.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-328",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table lists $g(1)$, $g(2)$, and $g(3)$ for an exponential function $g$ used in a sediment-load model, where $g(n)$ is the load, in kilograms, carried past a gauge during month $n$. Find the value of $n$ that satisfies $g(3n) = 9\\,g(n + 6)$.",
    questionTable: { headers: ["$n$", "$g(n)$"], rows: [["$1$", "$3$"], ["$2$", "$9$"], ["$3$", "$27$"]] },
    choices: [
      // distractor: drops the factor of $9$, solving $3n = n + 6$
      { id: "A", text: "$3$" },
      { id: "B", text: "$4$" },
      // distractor: converts the factor $9$ to $3^{9}$ instead of $3^{2}$, solving $3n = n + 15$
      { id: "C", text: "$7.5$" },
      // distractor: multiplies the exponents when combining $9 \cdot 3^{\,n+6}$, solving $3n = 2n + 12$
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The table gives $g(n) = 3^{n}$, so the equation is $3^{3n} = 3^{2} \\cdot 3^{\\,n+6} = 3^{\\,n+8}$, and $3n = n + 8$ gives $n = 4$.\n\n**The Full Solution:**\nStep 1: The listed values $3$, $9$, $27$ are $3^{1}$, $3^{2}$, $3^{3}$, so $g(n) = 3^{n}$.\nStep 2: Then $g(3n) = 3^{3n}$, and $9\\,g(n + 6) = 3^{2} \\cdot 3^{\\,n+6} = 3^{\\,n+8}$.\nStep 3: Equal bases force $3n = n + 8$, so $2n = 8$ and $n = 4$. Check: $g(12) = 3^{12} = 531{,}441$ and $9\\,g(10) = 9 \\cdot 3^{10} = 531{,}441$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): ignores the coefficient $9$, which is worth two extra factors of $3$.\n* Choice C ($7.5$): converts the factor $9$ to $3^{9}$ rather than $3^{2}$, solving $3n = n + 15$.\n* Choice D ($12$): treats $9 \\cdot 3^{\\,n+6}$ as $3^{2(n+6)}$, multiplying the exponent instead of adding to it.\n\n**Test Day Takeaway:** A numerical coefficient in front of a power is itself a power of the same base — fold it in by ADDING to the exponent.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-329",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives values of the exponential function $h$, which models the airborne pollen count, in grains per cubic meter, on day $x$ after one grass species reaches its seasonal peak. For what value of $x$ is $h(x) \\cdot 4^{3x} = 4^{16}$?",
    diagram: { type: "dataTable", params: { headers: ["Day x", "h(x)"], rows: [["0", "256"], ["1", "64"], ["2", "16"], ["3", "4"]] } },
    choices: [
      // distractor: quotes the exponent of $h(0) = 4^{4}$ instead of solving for $x$
      { id: "A", text: "$4$" },
      // distractor: uses $h(x) = 4^{\,x-4}$, reversing the sign of the exponent and solving $4x - 4 = 16$
      { id: "B", text: "$5$" },
      { id: "C", text: "$6$" },
      // distractor: drops the constant $4$ from the exponent of $h$, solving $2x = 16$
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The table gives $h(x) = 4^{\\,4-x}$, so the left side is $4^{\\,4-x+3x} = 4^{\\,4+2x}$; setting $4 + 2x = 16$ gives $x = 6$.\n\n**The Full Solution:**\nStep 1: Written as powers of $4$, the table reads $256 = 4^{4}$, $64 = 4^{3}$, $16 = 4^{2}$, $4 = 4^{1}$, so $h(x) = 4^{\\,4-x}$.\nStep 2: Multiplying by $4^{3x}$ adds exponents: $4^{\\,4-x} \\cdot 4^{3x} = 4^{\\,4+2x}$.\nStep 3: Equal bases force $4 + 2x = 16$, so $2x = 12$ and $x = 6$. Check: $h(6) = 4^{-2}$ and $4^{-2} \\cdot 4^{18} = 4^{16}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reports the exponent at day $0$, which is a value of the function, not a solution.\n* Choice B ($5$): reads the decay as $4^{\\,x-4}$, so the exponent sum becomes $4x - 4$.\n* Choice D ($8$): forgets the leading $4$ in $4 + 2x$, solving $2x = 16$.\n\n**Test Day Takeaway:** Convert the table to a single power first, then add the exponents — a decaying table means the exponent counts DOWN as the input rises.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-330",
    domain: "advanced-math",
    skills: ["exponential-functions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A sprint-timing rig produces the readings $R(k)$ listed in the table on trials $1$, $2$, and $3$, and $R$ is an exponential function of the trial number. For what value of $k$ does the rig read $2^{15}$?",
    questionTable: { headers: ["Trial $k$", "Reading $R(k)$"], rows: [["$1$", "$32$"], ["$2$", "$128$"], ["$3$", "$512$"]] },
    choices: [
      // distractor: divides $15$ by $2$ before subtracting the $3$, reversing the order of operations
      { id: "A", text: "$4.5$" },
      { id: "B", text: "$6$" },
      // distractor: ignores the constant $3$ in the exponent, solving $2k = 15$
      { id: "C", text: "$7.5$" },
      // distractor: subtracts $3$ from $15$ but never divides by the $2$
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The readings are $2^{5}$, $2^{7}$, $2^{9}$, so $R(k) = 2^{\\,2k+3}$; setting $2k + 3 = 15$ gives $k = 6$.\n\n**The Full Solution:**\nStep 1: Write each reading as a power of $2$: $32 = 2^{5}$, $128 = 2^{7}$, and $512 = 2^{9}$.\nStep 2: The exponent climbs by $2$ per trial and equals $5$ at $k = 1$, so $R(k) = 2^{\\,2k+3}$.\nStep 3: Equal bases force $2k + 3 = 15$, so $2k = 12$ and $k = 6$. Check: $R(6) = 2^{15} = 32{,}768$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.5$): halves before undoing the $+3$, so the two inverse steps are applied in the wrong order.\n* Choice C ($7.5$): leaves out the $+3$, which is what the first trial's exponent of $5$ pins down.\n* Choice D ($12$): undoes the $+3$ but not the coefficient $2$.\n\n**Test Day Takeaway:** From a table, read the exponent's step and its value at one input — that gives the linear rule inside the exponent in one line.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-equation-with-common-base",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── P.B. DISTANCE BETWEEN X-INTERCEPTS (bank-am-331..338) ─────────────────
  // |root_a − root_b| for a parabola. Often via Vieta's: |a − b| = √((a+b)² − 4ab).
  {
    id: "bank-am-331",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The parabola shown models the cross section of a wind-scoured gully, where $y$ is floor elevation in centimeters relative to the surrounding flat and $x$ is horizontal distance in meters. Its lowest point is marked. How wide is the gully at the level of the flat?",
    diagram: { type: "parabola", params: { vertex: { h: 5, k: -9 }, a: 1, xRange: [0, 10], yRange: [-12, 10], xTickInterval: 1, yTickInterval: 3, gridInterval: 1, showVertex: true } },
    choices: [
      // distractor: measures only from the axis of symmetry out to one wall, half of the full width
      { id: "A", text: "$3$" },
      { id: "B", text: "$6$" },
      // distractor: reports the larger $x$-intercept, $x = 8$, instead of the distance between the two
      { id: "C", text: "$8$" },
      // distractor: adds the two $x$-intercepts, $2 + 8$, instead of subtracting them
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The curve meets $y = 0$ at $x = 2$ and $x = 8$, so the gully is $8 - 2 = 6$ meters wide.\n\n**The Full Solution:**\nStep 1: The level of the surrounding flat is $y = 0$, so the gully's edges are the $x$-intercepts of the parabola.\nStep 2: The marked lowest point is $(5, -9)$, and the graph crosses the horizontal axis at $x = 2$ and at $x = 8$.\nStep 3: The width is the distance between those crossings: $8 - 2 = 6$ meters. Check: the two edges sit $3$ meters on either side of the axis of symmetry $x = 5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): the half-width, measured from the low point out to one wall only.\n* Choice C ($8$): the coordinate of the right-hand edge, not the separation between edges.\n* Choice D ($10$): adds the two intercepts instead of subtracting, which measures nothing on the figure.\n\n**Test Day Takeaway:** A distance between intercepts is always a subtraction, and the axis of symmetry sits exactly halfway between them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-332",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "easy",
    type: "fill-in",
    question: "A wetland study models the gap $g(x) = x^2 - 10x + 21$, in centimeters, between the waterline and a mangrove seedling's root collar $x$ days after planting. How many days pass between the two times the gap is zero?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~15s):** $x^2 - 10x + 21 = (x - 3)(x - 7)$, so the gap is zero on day $3$ and day $7$ — $4$ days apart.\n\n**The Full Solution:**\nStep 1: The gap is zero when $g(x) = 0$, so solve $x^2 - 10x + 21 = 0$.\nStep 2: Two numbers with product $21$ and sum $-10$ are $-3$ and $-7$, so the equation factors as $(x - 3)(x - 7) = 0$.\nStep 3: The zeros are $x = 3$ and $x = 7$, and $7 - 3 = 4$ days separate them. Check: $g(3) = 9 - 30 + 21 = 0$ and $g(7) = 49 - 70 + 21 = 0$ ✓\n\n**Common Mistakes:**\n* $2$ — the distance from the axis of symmetry $x = 5$ out to one zero, which is only half the separation.\n* $7$ — the later day itself rather than the number of days between the two.\n* $10$ — the sum of the two zeros, which is the opposite of the linear coefficient, not a separation.\n\n**Test Day Takeaway:** Factor first, then subtract the zeros; the separation is the difference between them, never one of them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-333",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The graph of the quadratic function $g$, where $g(x) = x^2 + 4x - 21$, is shown in the $xy$-plane. The graph intersects the $x$-axis at two points. What is the distance between those two points?",
    diagram: { type: "parabola", params: { vertex: { h: -2, k: -25 }, a: 1, xRange: [-9, 5], yRange: [-28, 8], xTickInterval: 2, yTickInterval: 4, gridInterval: 2, showVertex: true } },
    choices: [
      // distractor: uses the sum of the zeros
      { id: "A", text: "$4$" },
      // distractor: reports half the distance
      { id: "B", text: "$5$" },
      { id: "C", text: "$10$" },
      // distractor: uses the constant term
      { id: "D", text: "$21$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** $x^2 + 4x - 21 = (x + 7)(x - 3)$, so the zeros are $-7$ and $3$ and the distance is $3 - (-7) = 10$.\n\n**The Full Solution:**\nStep 1: The intercepts satisfy $g(x) = 0$, so factor: $x^2 + 4x - 21 = (x + 7)(x - 3)$.\nStep 2: The zeros are $x = -7$ and $x = 3$, the two crossings visible on the graph.\nStep 3: The distance between $(-7, 0)$ and $(3, 0)$ is $|3 - (-7)| = 10$. Check: the vertex sits at $x = -2$, which is $5$ units from each intercept. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): uses $|-7 + 3| = 4$, adding the zeros instead of subtracting them.\n* Choice B ($5$): reports the distance from the axis of symmetry to one intercept, which is half the answer.\n* Choice D ($21$): reads the constant term as a length.\n\n**Test Day Takeaway:** Factor, list the zeros, subtract — and remember the vertex is the midpoint, so half-distances are a common trap.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-334",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $h$ is defined by $h(x) = 3x^2 + 6x - 45$. In the $xy$-plane, the graph of $y = h(x)$ intersects the $x$-axis at points $M$ and $N$. What is the length of $\\overline{MN}$?",
    choices: [
      // distractor: uses the sum of the zeros
      { id: "A", text: "$2$" },
      // distractor: reports only the positive zero
      { id: "B", text: "$3$" },
      // distractor: reports half the distance
      { id: "C", text: "$4$" },
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Factor out $3$: $3(x^2 + 2x - 15) = 3(x + 5)(x - 3)$, so the zeros are $-5$ and $3$ and $MN = 8$.\n\n**The Full Solution:**\nStep 1: Set $h(x) = 0$ and factor out the common factor: $3\\left(x^2 + 2x - 15\\right) = 0$.\nStep 2: $x^2 + 2x - 15 = (x + 5)(x - 3)$, so the zeros are $x = -5$ and $x = 3$; dividing by $3$ does not change where the graph crosses.\nStep 3: $MN = |3 - (-5)| = 8$. Check: $h(-5) = 75 - 30 - 45 = 0$ and $h(3) = 27 + 18 - 45 = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): uses $|-5 + 3| = 2$, adding the zeros instead of subtracting.\n* Choice B ($3$): reports only the positive zero.\n* Choice C ($4$): reports the distance from the axis of symmetry $x = -1$ to one intercept, which is half of $MN$.\n\n**Test Day Takeaway:** Divide out the leading coefficient before factoring — it changes the shape of the parabola but not its $x$-intercepts.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-335",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "fill-in",
    question: "A coach models a cyclist's power deficit, in watts, by $h(t) = 5t^2 - 40t + 35$, where $t$ is the number of minutes into a time trial and the deficit is negative in between those two times. How many minutes separate the two times at which the deficit is zero?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~25s):** Factoring out $5$ leaves $t^2 - 8t + 7 = (t - 1)(t - 7)$, so the zeros are $1$ and $7$, which are $6$ minutes apart.\n\n**The Full Solution:**\nStep 1: Set the deficit to zero: $5t^2 - 40t + 35 = 0$.\nStep 2: Every coefficient is divisible by $5$, so divide through to get $t^2 - 8t + 7 = 0$, which factors as $(t - 1)(t - 7) = 0$.\nStep 3: The zeros are $t = 1$ and $t = 7$, so the times are $7 - 1 = 6$ minutes apart. Check: $h(1) = 5 - 40 + 35 = 0$ and $h(7) = 245 - 280 + 35 = 0$ ✓\n\n**Common Mistakes:**\n* $3$ — half the separation, measured from the axis of symmetry $t = 4$ to one zero.\n* $7$ — the later zero itself instead of the gap between the two zeros.\n* $8$ — the sum of the zeros, which comes from ignoring the minus sign in $-8t$ and reading off a total instead of a difference.\n\n**Test Day Takeaway:** Divide out the common factor before factoring — the leading coefficient never changes where a quadratic crosses zero.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-336",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The parabola drawn in the $xy$-plane is $y = f(x)$, and its lowest point is labeled on the grid. A second function $g$ returns, for each input, a value exactly $7$ above the value returned by $f$. How far apart are the two $x$-intercepts of the graph of $g$?",
    diagram: { type: "parabola", params: { vertex: { h: 3, k: -16 }, a: 1, xRange: [-3, 9], yRange: [-18, 7], xTickInterval: 2, yTickInterval: 4, gridInterval: 1, showVertex: true } },
    choices: [
      { id: "A", text: "$6$" },
      // distractor: answers for $f$ itself, ignoring the vertical shift of $7$
      { id: "B", text: "$8$" },
      // distractor: reports $|{-9}|$, the depth of the vertex of $g$, as though it were a width
      { id: "C", text: "$9$" },
      // distractor: reports $|{-16}|$, the depth of the labeled minimum of $f$, as though it were a width
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The labeled minimum gives $f(x) = (x - 3)^2 - 16$, so $g(x) = (x - 3)^2 - 9$, whose zeros are $3 \\pm 3$ — a separation of $6$.\n\n**The Full Solution:**\nStep 1: The parabola has minimum $(3, -16)$ and passes through $(-1, 0)$, so $f(x) = (x - 3)^2 - 16$.\nStep 2: Adding $7$ to every output gives $g(x) = (x - 3)^2 - 16 + 7 = (x - 3)^2 - 9$.\nStep 3: Setting $g(x) = 0$ gives $(x - 3)^2 = 9$, so $x = 0$ and $x = 6$, a distance of $6 - 0 = 6$. Check: both zeros sit $3$ units from the axis of symmetry $x = 3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($8$): the distance between the $x$-intercepts of $f$, read straight off the figure without applying the shift.\n* Choice C ($9$): the size of the new constant term, which is a vertical depth, not a horizontal width.\n* Choice D ($16$): the depth of the labeled minimum of $f$, again a vertical measurement.\n\n**Test Day Takeaway:** Raising a parabola shrinks the gap between its $x$-intercepts — rewrite in vertex form and take twice the square root of the new depth.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-337",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The labeled point is the minimum of the parabola $y = f(x)$ shown in the $xy$-plane, and the curve crosses the horizontal axis at two points visible on the grid. Each output of $h$ equals the output of $f$ at twice the input, so $h(x) = f(2x)$. How far apart are the $x$-intercepts of the graph of $h$?",
    diagram: { type: "parabola", params: { vertex: { h: 2, k: -18 }, a: 2, xRange: [-3, 7], yRange: [-20, 5], xTickInterval: 2, yTickInterval: 4, gridInterval: 1, showVertex: true } },
    choices: [
      // distractor: halves the separation twice, once for each intercept
      { id: "A", text: "$1.5$" },
      { id: "B", text: "$3$" },
      // distractor: answers for $f$ itself, ignoring the substitution $2x$
      { id: "C", text: "$6$" },
      // distractor: multiplies the separation by $2$ instead of dividing by $2$
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $f$ crosses at $x = -1$ and $x = 5$, and $h(x) = f(2x)$ is zero when $2x$ is $-1$ or $5$, so $h$ crosses at $x = -0.5$ and $x = 2.5$: a distance of $3$.\n\n**The Full Solution:**\nStep 1: The minimum is $(2, -18)$ and the curve meets the horizontal axis at $x = -1$ and $x = 5$, so $f(x) = 2(x - 2)^2 - 18$.\nStep 2: Then $h(x) = f(2x) = 2(2x - 2)^2 - 18$, and $h(x) = 0$ requires $(2x - 2)^2 = 9$, so $2x - 2 = \\pm 3$.\nStep 3: That gives $x = -0.5$ and $x = 2.5$, so the intercepts are $3$ units apart. Check: replacing $x$ by $2x$ compresses the graph horizontally by a factor of $2$, halving the original separation of $6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.5$): applies the factor $\\frac{1}{2}$ to an already-halved distance.\n* Choice C ($6$): the separation for $f$, as if $h$ and $f$ had the same intercepts.\n* Choice D ($12$): treats $f(2x)$ as a horizontal stretch and doubles the separation.\n\n**Test Day Takeaway:** Replacing $x$ with $2x$ compresses every horizontal measurement by a factor of $2$, so widths are halved, not doubled.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-am-338",
    domain: "advanced-math",
    skills: ["quadratics"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of a quadratic function has its axis of symmetry at $x = -1$, and one of its $x$-intercepts is $(5, 0)$. What are the coordinates of the other $x$-intercept?",
    choices: [
      { id: "A", text: "$(-7, 0)$" },
      // distractor: computes -1 - 5 instead of reflecting
      { id: "B", text: "$(-6, 0)$" },
      // distractor: reflects across the y-axis
      { id: "C", text: "$(-5, 0)$" },
      // distractor: reports a point on the axis of symmetry
      { id: "D", text: "$(-1, 0)$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The intercept $x = 5$ lies $6$ units right of the axis $x = -1$, so the other lies $6$ units left, at $x = -1 - 6 = -7$.\n\n**The Full Solution:**\nStep 1: A parabola is symmetric about its axis, so the axis is the midpoint of the two $x$-intercepts.\nStep 2: The known intercept is $5 - (-1) = 6$ units to the right of $x = -1$.\nStep 3: The other intercept is $6$ units to the left: $x = -7$, so the point is $(-7, 0)$. Check: the midpoint of $-7$ and $5$ is $\\dfrac{-7 + 5}{2} = -1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($(-6, 0)$): computes $-1 - 5 = -6$, subtracting the intercept's coordinate from the axis instead of reflecting across it.\n* Choice C ($(-5, 0)$): reflects across the $y$-axis rather than across the axis of symmetry.\n* Choice D ($(-1, 0)$): reports a point on the axis of symmetry, which is not an intercept here.\n\n**Test Day Takeaway:** Reflect across the axis by matching distances: axis minus (intercept minus axis).",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-between-x-intercepts",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // === TIER 0 BANK GROWTH (2026-05-21): common-base-exponent-simplification 3 → 5 items ===

  {
    id: "bank-am-339",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A conveyor's throughput, in trays per hour, is $\\dfrac{w^{9}\\cdot w^{2}}{w^{4}}$, where $w>0$. Which of the following is equivalent to the throughput, in trays per hour?",
    choices: [
      // distractor: ignored the factor w^2 and computed w^(9-4)
      { id: "A", text: "$w^{5}$" },
      { id: "B", text: "$w^{7}$" },
      // distractor: multiplied the numerator exponents 9 and 2 instead of adding them
      { id: "C", text: "$w^{14}$" },
      // distractor: added all three exponents, 9 + 2 + 4
      { id: "D", text: "$w^{15}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** Add the exponents on top, then subtract the one below: $9+2-4=7$.\n\n**The Full Solution:**\nStep 1: Multiply in the numerator: $w^{9}\\cdot w^{2}=w^{11}$.\nStep 2: Divide by $w^{4}$: $w^{11-4}$.\nStep 3: The throughput is $w^{7}$ trays per hour. Check at $w=2$: $\\dfrac{512\\cdot 4}{16}=128=2^{7}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($w^{5}$): ignores the factor $w^{2}$ and computes $w^{9-4}$.\n* Choice C ($w^{14}$): multiplies the numerator's exponents, $9\\cdot 2$, then subtracts $4$.\n* Choice D ($w^{15}$): adds all three exponents, $9+2+4$.\n\n**Test Day Takeaway:** Multiplication adds exponents and division subtracts them — do the numerator completely before dividing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-340",
    domain: "advanced-math",
    skills: ["exponent-laws"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A counter's reading after $n$ cycles is $\\dfrac{9^{n+3}}{3^{2n}}$, and this reading equals $3^{k}$ for every positive integer $n$. What is the value of the constant $k$?",
    choices: [
      // distractor: subtracted in the wrong order, computing 2n - (2n + 6)
      { id: "A", text: "$-6$" },
      // distractor: rewrote 9^(n+3) as 3^(2n+3), doubling only the n
      { id: "B", text: "$3$" },
      { id: "C", text: "$6$" },
      // distractor: cancelled to 9^3 correctly but doubled the exponent twice when converting to base 3, going 3 to 6 to 12
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** $9^{n+3}=3^{2n+6}$, so the quotient is $3^{(2n+6)-2n}=3^{6}$ and $k=6$.\n\n**The Full Solution:**\nStep 1: Write $9$ as $3^{2}$: $9^{n+3}=(3^{2})^{n+3}=3^{2n+6}$.\nStep 2: Divide by $3^{2n}$: $3^{(2n+6)-2n}=3^{6}$.\nStep 3: The $n$ terms cancel for every $n$, so $k=6$. Check at $n=1$: $\\dfrac{9^{4}}{3^{2}}=\\dfrac{6561}{9}=729=3^{6}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): subtracts in the wrong order, computing $2n-(2n+6)$.\n* Choice B ($3$): rewrites $9^{n+3}$ as $3^{2n+3}$, doubling only the $n$.\n* Choice D ($12$): cancels to $9^{3}$ but doubles the exponent twice when converting to base $3$, going $3\\to 6\\to 12$.\n\n**Test Day Takeaway:** When a quotient must be constant for every $n$, the variable parts of the exponents have to cancel — that is your check.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "common-base-exponent-simplification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // === TIER 1 BANK GROWTH (2026-05-21): advanced math patterns @ 4 items → @ 10 items ===

  // --- build-exponential-model (4 → 10) ---
  {
    id: "bank-am-341",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives the number of yeast cells in a culture at three times after the culture was prepared. The number of cells grows exponentially. Which function $N$ gives the number of yeast cells $t$ hours after the culture was prepared?",
    diagram: { type: "dataTable", params: { headers: ["Time t (hours)", "Number of yeast cells"], rows: [["0", "40"], ["1", "120"], ["2", "360"]] } },
    choices: [
      // distractor: swaps the initial value and the growth factor
      { id: "A", text: "$N(t) = 3(40)^t$" },
      // distractor: uses a power function
      { id: "B", text: "$N(t) = 40t^3$" },
      // distractor: models a constant increase
      { id: "C", text: "$N(t) = 40 + 80t$" },
      { id: "D", text: "$N(t) = 40(3)^t$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Build Exponential Model**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The count starts at $40$ and triples each hour ($40 \\to 120 \\to 360$), so $N(t) = 40(3)^t$.\n\n**The Full Solution:**\nStep 1: An exponential model has the form $N(t) = N_0(b)^t$, where $N_0$ is the value at $t = 0$. The table gives $N_0 = 40$.\nStep 2: The growth factor is the ratio of consecutive values: $\\dfrac{120}{40} = 3$ and $\\dfrac{360}{120} = 3$, so $b = 3$.\nStep 3: $N(t) = 40(3)^t$. Check: $N(2) = 40(9) = 360$, matching the table. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($N(t) = 3(40)^t$): swaps the initial value and the growth factor, giving $N(0) = 3$.\n* Choice B ($N(t) = 40t^3$): uses a power function instead of an exponential one, giving $N(0) = 0$.\n* Choice C ($N(t) = 40 + 80t$): models the first change, $120 - 40 = 80$, as a constant hourly increase, which fails at $t = 2$.\n\n**Test Day Takeaway:** Divide consecutive outputs, not subtract them — a constant RATIO means exponential, a constant DIFFERENCE means linear.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-342",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A crystal grown in a furnace doubles in mass during each hour of growth. The table gives the mass of the crystal, in milligrams, after $t$ hours. What will the mass of the crystal be after $5$ hours?",
    questionTable: { headers: ["Time, $t$ (hours)", "Mass (milligrams)"], rows: [["$0$", "$6$"], ["$1$", "$12$"], ["$2$", "$24$"], ["$3$", "$48$"]] },
    choices: [
      // distractor: stopped one hour early, giving the mass at t = 4
      { id: "A", text: "$96$ milligrams" },
      // distractor: added 48 milligrams for each remaining hour, treating the growth as linear
      { id: "B", text: "$144$ milligrams" },
      { id: "C", text: "$192$ milligrams" },
      // distractor: multiplied the 3-hour mass 48 by 5 instead of doubling twice
      { id: "D", text: "$240$ milligrams" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Build Exponential Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Double the $3$-hour mass twice: $48\\rightarrow 96\\rightarrow 192$ milligrams.\n\n**The Full Solution:**\nStep 1: The table confirms the doubling: $12/6=2$, $24/12=2$, $48/24=2$.\nStep 2: The model is mass $=6(2)^{t}$ milligrams.\nStep 3: At $t=5$, mass $=6(2)^{5}=6\\cdot 32=192$ milligrams. Check: $48\\cdot 2\\cdot 2=192$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($96$ milligrams): stops one hour early, at $t=4$.\n* Choice B ($144$ milligrams): adds $48$ milligrams for each of the two remaining hours, treating doubling as a constant increase.\n* Choice D ($240$ milligrams): multiplies the $3$-hour mass by $5$ instead of doubling twice.\n\n**Test Day Takeaway:** Doubling multiplies, so extend a table by multiplying — never by adding the last increase again.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-343",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A tractor purchased for $\\$36{,}000$ loses $15\\%$ of its value each year. The table gives the tractor's value at purchase and at the end of each of the first two years. Which function $V$ gives the tractor's value, in dollars, $t$ years after it was purchased?",
    diagram: { type: "dataTable", params: { headers: ["Years after purchase", "Value (dollars)"], rows: [["0", "36,000"], ["1", "30,600"], ["2", "26,010"]] } },
    choices: [
      { id: "A", text: "$V(t) = 36{,}000(0.85)^t$" },
      // distractor: uses the percent lost as the factor
      { id: "B", text: "$V(t) = 36{,}000(0.15)^t$" },
      // distractor: adds the rate instead of subtracting
      { id: "C", text: "$V(t) = 36{,}000(1.15)^t$" },
      // distractor: subtracts a constant each year
      { id: "D", text: "$V(t) = 36{,}000 - 5{,}400t$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Build Exponential Model**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Losing $15\\%$ leaves $85\\%$, so the factor is $0.85$ and $V(t) = 36{,}000(0.85)^t$.\n\n**The Full Solution:**\nStep 1: The model is $V(t) = V_0(b)^t$ with $V_0 = 36{,}000$, the purchase price.\nStep 2: A $15\\%$ loss leaves $100\\% - 15\\% = 85\\%$ of the previous value, so $b = 0.85$.\nStep 3: $V(t) = 36{,}000(0.85)^t$. Check: $36{,}000(0.85) = 30{,}600$ and $30{,}600(0.85) = 26{,}010$, matching the last two table rows. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($V(t) = 36{,}000(0.15)^t$): uses the percent lost as the factor, which would leave only $\\$5{,}400$ after one year.\n* Choice C ($V(t) = 36{,}000(1.15)^t$): adds the rate instead of subtracting it, modeling growth rather than depreciation.\n* Choice D ($V(t) = 36{,}000 - 5{,}400t$): subtracts a fixed $\\$5{,}400$ each year, which would give $\\$25{,}200$ at $t = 2$ instead of $\\$26{,}010$.\n\n**Test Day Takeaway:** A percent DECREASE gives the factor $1 - r$; the table's second row is the fastest way to confirm you chose it correctly.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-344",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A sample of a radioactive isotope has a mass of $96$ milligrams, and the isotope has a half-life of $8$ days. The table gives the mass remaining at the time of measurement and at two later times. Which function $m$ gives the mass, in milligrams, remaining $t$ days after the sample was measured?",
    diagram: { type: "dataTable", params: { headers: ["Time (days)", "Mass remaining (milligrams)"], rows: [["0", "96"], ["8", "48"], ["16", "24"]] } },
    choices: [
      // distractor: multiplies by the half-life instead of dividing
      { id: "A", text: "$m(t) = 96\\left(\\dfrac{1}{2}\\right)^{8t}$" },
      { id: "B", text: "$m(t) = 96\\left(\\dfrac{1}{2}\\right)^{t/8}$" },
      // distractor: treats the half-life as one day
      { id: "C", text: "$m(t) = 96\\left(\\dfrac{1}{2}\\right)^{t}$" },
      // distractor: models a constant loss per day
      { id: "D", text: "$m(t) = 96 - 6t$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Build Exponential Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The mass halves once per $8$ days, so the number of halvings is $\\dfrac{t}{8}$ and $m(t) = 96\\left(\\dfrac{1}{2}\\right)^{t/8}$.\n\n**The Full Solution:**\nStep 1: Half-life decay has the form $m(t) = m_0\\left(\\dfrac{1}{2}\\right)^{t/H}$, where $H$ is the half-life and $m_0$ is the starting mass.\nStep 2: Here $m_0 = 96$ and $H = 8$, so the exponent is $\\dfrac{t}{8}$.\nStep 3: $m(t) = 96\\left(\\dfrac{1}{2}\\right)^{t/8}$. Check: at $t = 8$ the exponent is $1$, giving $48$; at $t = 16$ it is $2$, giving $24$ — the last two table rows. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($m(t) = 96\\left(\\dfrac{1}{2}\\right)^{8t}$): multiplies by the half-life instead of dividing, which would leave far less than $48$ milligrams at $t = 8$.\n* Choice C ($m(t) = 96\\left(\\dfrac{1}{2}\\right)^{t}$): treats the half-life as one day, halving the mass every day.\n* Choice D ($m(t) = 96 - 6t$): treats the first $48$-milligram drop as a constant $6$ milligrams per day, which would reach $0$ at $t = 16$.\n\n**Test Day Takeaway:** The exponent counts how many half-lives have passed, so divide the elapsed time by the half-life.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-345",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives the area covered by algae in a lake at the start of each of three consecutive years. The area covered grows exponentially. Which function $A$ gives the area covered, in square meters, $t$ years after 2018?",
    diagram: { type: "dataTable", params: { headers: ["Year", "Area covered (square meters)"], rows: [["2018", "250"], ["2019", "300"], ["2020", "360"]] } },
    choices: [
      // distractor: models a constant yearly increase
      { id: "A", text: "$A(t) = 250 + 55t$" },
      // distractor: uses the two-year factor as the yearly factor
      { id: "B", text: "$A(t) = 250(1.44)^t$" },
      { id: "C", text: "$A(t) = 250(1.2)^t$" },
      // distractor: doubles the exponent
      { id: "D", text: "$A(t) = 250(1.2)^{2t}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Build Exponential Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Consecutive years give $\\dfrac{300}{250} = 1.2$ and $\\dfrac{360}{300} = 1.2$, so $A(t) = 250(1.2)^t$ with $t$ measured from 2018.\n\n**The Full Solution:**\nStep 1: Measure $t$ from 2018, so the initial area is $A(0) = 250$ square meters.\nStep 2: The ratio of each year's area to the previous year's is $1.2$ in both cases, so the yearly growth factor is $1.2$.\nStep 3: $A(t) = 250(1.2)^t$. Check: $A(2) = 250(1.44) = 360$, matching the 2020 row. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($A(t) = 250 + 55t$): uses the average yearly increase of $\\dfrac{360 - 250}{2} = 55$ square meters, treating the growth as linear.\n* Choice B ($A(t) = 250(1.44)^t$): uses the two-year factor $\\dfrac{360}{250} = 1.44$ as if it applied every year.\n* Choice D ($A(t) = 250(1.2)^{2t}$): doubles the exponent, applying two years of growth in each single year.\n\n**Test Day Takeaway:** Match the growth factor to the time step of the exponent — a factor measured over two years belongs with an exponent of $\\dfrac{t}{2}$, not $t$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-346",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the balance of an account when it was opened and at the end of each of the first two months. The balance grows exponentially. Which function $B$ gives the balance, in dollars, $t$ years after the account was opened?",
    diagram: { type: "dataTable", params: { headers: ["Months after opening", "Balance (dollars)"], rows: [["0", "500"], ["1", "550"], ["2", "605"]] } },
    choices: [
      // distractor: leaves the exponent in months
      { id: "A", text: "$B(t) = 500(1.1)^{t}$" },
      // distractor: divides by 12 instead of multiplying
      { id: "B", text: "$B(t) = 500(1.1)^{t/12}$" },
      { id: "C", text: "$B(t) = 500(1.1)^{12t}$" },
      // distractor: scales the initial deposit by 12
      { id: "D", text: "$B(t) = 6{,}000(1.1)^{12t}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Build Exponential Model**\n\n**Choice C is correct.**\n\n**The Fast Way (~60s):** The balance multiplies by $1.1$ each MONTH, and a year holds $12$ months, so after $t$ years the factor has been applied $12t$ times: $B(t) = 500(1.1)^{12t}$.\n\n**The Full Solution:**\nStep 1: The table gives $\\dfrac{550}{500} = 1.1$ and $\\dfrac{605}{550} = 1.1$, so the monthly growth factor is $1.1$ and the opening balance is $500$.\nStep 2: In months the model is $500(1.1)^{\\text{months}}$. The question asks for $t$ in YEARS, and $t$ years is $12t$ months.\nStep 3: Substituting gives $B(t) = 500(1.1)^{12t}$. Check: at $t = \\dfrac{1}{6}$ (two months) the exponent is $2$, giving $500(1.21) = 605$, the third table row. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($B(t) = 500(1.1)^{t}$): leaves the exponent in months, so one year of growth is counted as one month.\n* Choice B ($B(t) = 500(1.1)^{t/12}$): divides by $12$ instead of multiplying, which is the conversion for going from years to months in the wrong direction.\n* Choice D ($B(t) = 6{,}000(1.1)^{12t}$): multiplies the opening balance by $12$ rather than the exponent.\n\n**Test Day Takeaway:** Convert the TIME UNIT inside the exponent, never the initial amount — $t$ years is $12t$ compounding periods when the period is a month.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- discriminant-analysis (4 → 10) ---
  {
    id: "bank-am-347",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In a filter design, the resonant constant $x$ satisfies $5x^{2}-6x+2=0$. For this equation, what is the value of $b^{2}-4ac$?",
    choices: [
      { id: "A", text: "$-4$" },
      // distractor: subtracted in the wrong order, computing 4ac - b squared
      { id: "B", text: "$4$" },
      // distractor: computed b squared only and never subtracted 4ac
      { id: "C", text: "$36$" },
      // distractor: added 4ac instead of subtracting it
      { id: "D", text: "$76$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** $(-6)^{2}-4(5)(2)=36-40=-4$.\n\n**The Full Solution:**\nStep 1: Read the coefficients: $a=5$, $b=-6$, $c=2$.\nStep 2: Square $b$: $(-6)^{2}=36$, and compute $4ac=4(5)(2)=40$.\nStep 3: Subtract: $36-40=-4$. Check: the equation has no real solutions, which a negative discriminant predicts ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($4$): subtracts in the wrong order, computing $4ac-b^{2}$.\n* Choice C ($36$): stops at $b^{2}$.\n* Choice D ($76$): adds $4ac$ instead of subtracting it.\n\n**Test Day Takeaway:** A negative discriminant is a legitimate answer — do not flip the subtraction to avoid it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-348",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A test rig's output at setting $x$ is $f(x)=3x^{2}-9x+5$, and the table gives the output at four settings. How many real settings $x$ produce an output of $0$?",
    questionTable: { headers: ["Setting, $x$", "Output, $f(x)$"], rows: [["$0$", "$5$"], ["$1$", "$-1$"], ["$2$", "$-1$"], ["$3$", "$5$"]] },
    choices: [
      // distractor: concluded that because no listed output is 0, no setting gives 0
      { id: "A", text: "Zero" },
      // distractor: counted only the sign change between x = 0 and x = 1
      { id: "B", text: "Exactly one" },
      { id: "C", text: "Exactly two" },
      // distractor: a quadratic model cannot have more than two real solutions
      { id: "D", text: "More than two" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The discriminant of $3x^{2}-9x+5$ is $(-9)^{2}-4(3)(5)=81-60=21$, which is positive, so the output is $0$ at two settings.\n\n**The Full Solution:**\nStep 1: An output of $0$ means $3x^{2}-9x+5=0$, so the count asked for is the number of real solutions of that equation.\nStep 2: With $a=3$, $b=-9$, and $c=5$, the discriminant is $(-9)^{2}-4(3)(5)=81-60=21$.\nStep 3: A positive discriminant gives two different real solutions, so exactly two settings produce an output of $0$. Check: the table agrees, falling from $5$ to $-1$ between $x=0$ and $x=1$ and rising from $-1$ back to $5$ between $x=2$ and $x=3$ — one crossing each ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (Zero): concludes that because no listed output is $0$, no setting gives $0$.\n* Choice B (Exactly one): counts only the sign change between $x=0$ and $x=1$.\n* Choice D (More than two): a quadratic model cannot have more than two real solutions.\n\n**Test Day Takeaway:** The discriminant counts the real solutions; a table's sign changes confirm the count but never replace it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-349",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The parabola shown is the graph of $y=2x^{2}+bx+5$ in the $xy$-plane, where $b$ is a constant. Which of the following must be true about $b^{2}-40$?",
    diagram: { type: "parabola", params: { vertex: { h: -1, k: 3 }, a: 2, xRange: [-6, 4], yRange: [-2, 18], showVertex: false, gridInterval: 2, xTickInterval: 2, yTickInterval: 2, label: "y = 2x^2 + bx + 5" } },
    choices: [
      { id: "A", text: "$b^{2}-40<0$" },
      // distractor: would mean the parabola touches the x-axis at exactly one point
      { id: "B", text: "$b^{2}-40=0$" },
      // distractor: would mean the parabola crosses the x-axis twice
      { id: "C", text: "$b^{2}-40>0$" },
      // distractor: used 4ac = 4 times 5 = 20, omitting the leading coefficient 2
      { id: "D", text: "$b^{2}-20<0$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The parabola never meets the $x$-axis, so its discriminant $b^{2}-4(2)(5)=b^{2}-40$ must be negative.\n\n**The Full Solution:**\nStep 1: The $x$-intercepts of the graph are the real solutions of $2x^{2}+bx+5=0$.\nStep 2: The graph lies entirely above the $x$-axis, so that equation has no real solutions.\nStep 3: No real solutions means a negative discriminant, and here $b^{2}-4ac=b^{2}-40$, so $b^{2}-40<0$. Check: the drawn parabola is $y=2x^{2}+4x+5$, and $16-40=-24<0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($b^{2}-40=0$): would mean the parabola touches the $x$-axis at exactly one point.\n* Choice C ($b^{2}-40>0$): would mean the parabola crosses the $x$-axis twice.\n* Choice D ($b^{2}-20<0$): uses $4c=20$ for $4ac$, omitting the leading coefficient $2$.\n\n**Test Day Takeaway:** Read the number of $x$-intercepts off the picture, then translate it straight into the sign of $b^{2}-4ac$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-350",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The equation $px^{2}+qx+r=0$, where $p$, $q$, and $r$ are nonzero constants, has exactly one real solution. Which of the following expressions is equal to that solution?",
    choices: [
      // distractor: omitted the 2 in the denominator of -b/(2a)
      { id: "A", text: "$-\\dfrac{q}{p}$" },
      // distractor: dropped the negative sign of -b/(2a)
      { id: "B", text: "$\\dfrac{q}{2p}$" },
      { id: "C", text: "$-\\dfrac{q}{2p}$" },
      // distractor: gave the product of the two solutions, r/p, instead of the solution itself
      { id: "D", text: "$\\dfrac{r}{p}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** One real solution means the radical vanishes, leaving $x=-\\dfrac{q}{2p}$.\n\n**The Full Solution:**\nStep 1: The quadratic formula gives $x=\\dfrac{-q\\pm\\sqrt{q^{2}-4pr}}{2p}$.\nStep 2: Exactly one real solution means $q^{2}-4pr=0$, so the square root term is $0$.\nStep 3: The formula collapses to $x=\\dfrac{-q}{2p}$. Check with $x^{2}+6x+9=0$: $p=1$, $q=6$, and the only solution is $-3=-\\dfrac{6}{2}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\dfrac{q}{p}$): omits the $2$ in the denominator.\n* Choice B ($\\dfrac{q}{2p}$): drops the negative sign.\n* Choice D ($\\dfrac{r}{p}$): gives the product of the two solutions rather than the solution.\n\n**Test Day Takeaway:** A zero discriminant means the double root sits exactly at the vertex, $x=-\\dfrac{b}{2a}$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-351",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "For exactly two constants $b$, the graph of $y=3x^{2}+bx+27$ has a single point in common with the $x$-axis. What is the sum of those two constants?",
    choices: [
      // distractor: gave only the negative value of b
      { id: "A", text: "$-18$" },
      { id: "B", text: "$0$" },
      // distractor: gave only the positive value of b
      { id: "C", text: "$18$" },
      // distractor: added the absolute values of the two solutions instead of the solutions themselves
      { id: "D", text: "$36$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** One point in common means the discriminant is $0$, so $b^{2}=4(3)(27)=324$, $b=\\pm 18$, and the sum is $0$.\n\n**The Full Solution:**\nStep 1: The graph meets the $x$-axis where $3x^{2}+bx+27=0$, and a single point of contact means that equation has exactly one real solution.\nStep 2: Exactly one real solution requires $b^{2}-4(3)(27)=0$, so $b^{2}=324$ and $b=18$ or $b=-18$.\nStep 3: Their sum is $18+(-18)=0$. Check: $3x^{2}+18x+27=3(x+3)^{2}$ and $3x^{2}-18x+27=3(x-3)^{2}$, each touching the $x$-axis once ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-18$): gives only the negative value of $b$.\n* Choice C ($18$): gives only the positive value of $b$.\n* Choice D ($36$): adds the absolute values instead of the values themselves.\n\n**Test Day Takeaway:** A squared parameter always yields a matched pair $\\pm v$, so their sum is $0$ — check whether the question wants one value or both.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-352",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the equation $ax^{2}+20x+c=0$, the constants $a$ and $c$ are positive integers, the discriminant equals $0$, and $a$ exceeds $c$ by $21$. What is the value of $a$?",
    choices: [
      // distractor: reported c instead of a
      { id: "A", text: "$4$" },
      // distractor: assumed a = c and solved a squared = 100, ignoring the difference of 21
      { id: "B", text: "$10$" },
      { id: "C", text: "$25$" },
      // distractor: reported the product ac instead of a
      { id: "D", text: "$100$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** A zero discriminant gives $4ac=400$, so $ac=100$; the factor pair differing by $21$ is $25$ and $4$.\n\n**The Full Solution:**\nStep 1: The discriminant is $20^{2}-4ac=400-4ac$, and setting it equal to $0$ gives $ac=100$.\nStep 2: Also $a-c=21$, so $a=c+21$ and $c(c+21)=100$, or $c^{2}+21c-100=0$.\nStep 3: Factoring gives $(c+25)(c-4)=0$, so $c=4$ and $a=25$. Check: $25x^{2}+20x+4=(5x+2)^{2}$, whose discriminant is $400-400=0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reports $c$ instead of $a$.\n* Choice B ($10$): assumes $a=c$ and solves $a^{2}=100$, ignoring the difference of $21$.\n* Choice D ($100$): reports the product $ac$.\n\n**Test Day Takeaway:** A zero discriminant fixes the product $ac$; a second condition then picks the pair — list factor pairs before reaching for the quadratic formula.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- discriminant-with-integer-bound (4 → 10) ---
  {
    id: "bank-am-353",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "As the positive integer $b$ increases from $1$, the equation $x^{2}+bx+45=0$ first gains two different real solutions at one value of $b$. What is that value?",
    choices: [
      // distractor: used b > square root of 45, omitting the factor 4 in 4ac
      { id: "A", text: "$7$" },
      // distractor: rounded the square root of 180, about 13.42, down instead of up
      { id: "B", text: "$13$" },
      { id: "C", text: "$14$" },
      // distractor: used b > 2c = 90
      { id: "D", text: "$90$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $b^{2}>180$ and $13^{2}=169$ is too small, so the smallest integer is $14$.\n\n**The Full Solution:**\nStep 1: The discriminant is $b^{2}-4(1)(45)=b^{2}-180$.\nStep 2: Two different real solutions require $b^{2}>180$, so $b>\\sqrt{180}\\approx 13.42$.\nStep 3: The smallest positive integer greater than $13.42$ is $14$. Check: $b=14$ gives $196-180=16>0$, while $b=13$ gives $169-180=-11<0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): uses $b>\\sqrt{45}$, omitting the factor $4$ in $4ac$.\n* Choice B ($13$): rounds $\\sqrt{180}\\approx 13.42$ down instead of up.\n* Choice D ($90$): uses $b>2c$.\n\n**Test Day Takeaway:** When the bound is an irrational square root, test the two neighboring integers rather than rounding by habit.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-354",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A climate model gives $s^2 - 22s + c = 0$, where $c$ is a constant and each solution $s$ is a year, counted from 2000, in which predicted sea-ice extent equals its long-term average. What is the greatest integer $c$ for which two such years exist?",
    choices: [
      { id: "A", text: "$120$" },
      // distractor: allows the discriminant to equal zero, which gives one repeated year rather than two
      { id: "B", text: "$121$" },
      // distractor: replaces $4ac$ with $2ac$, giving $484 - 2c > 0$ and $c < 242$
      { id: "C", text: "$241$" },
      // distractor: drops the factor of $4$ altogether, giving $484 - c > 0$ and $c < 484$
      { id: "D", text: "$483$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Two distinct real solutions require $b^2 - 4ac > 0$, so $484 - 4c > 0$ and $c < 121$. The greatest integer strictly below $121$ is $120$.\n\n**The Full Solution:**\nStep 1: In $s^2 - 22s + c = 0$ the coefficients are $a = 1$ and $b = -22$, and the constant term is $c$.\nStep 2: Two distinct years means two distinct real solutions, which happens exactly when the discriminant is positive: $(-22)^2 - 4(1)(c) > 0$, or $484 - 4c > 0$.\nStep 3: Solving gives $4c < 484$, so $c < 121$, and the greatest integer satisfying that is $120$. Check: at $c = 120$ the discriminant is $484 - 480 = 4 > 0$, and the years are $s = 10$ and $s = 12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($121$): treats the condition as $b^2 - 4ac \\ge 0$; at $c = 121$ the discriminant is $0$, so the model gives one year, not two.\n* Choice C ($241$): uses $2ac$ in place of $4ac$, so the bound becomes $c < 242$.\n* Choice D ($483$): forgets the factor of $4$ entirely and solves $484 - c > 0$.\n\n**Test Day Takeaway:** \"Two distinct solutions\" is a strict inequality, so an integer bound always lands one unit inside the boundary value.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-355",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Two pacing models for a distance runner agree at every pace $p$, in minutes per kilometer, that satisfies $2p^2 + k = 18p - 5$, where $k$ is a constant set by the runner's most recent lab test. What is the least integer $k$ for which the models never agree?",
    choices: [
      // distractor: takes the greatest integer below $35.5$ instead of the least integer above it
      { id: "A", text: "$35$" },
      { id: "B", text: "$36$" },
      // distractor: leaves the $-5$ on the right side, solving $324 - 8k < 0$ and getting $k > 40.5$
      { id: "C", text: "$41$" },
      // distractor: uses $2ac$ instead of $4ac$, solving $324 - 4(k + 5) < 0$ and getting $k > 76$
      { id: "D", text: "$77$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Standard form is $2p^2 - 18p + (k + 5) = 0$, so the discriminant is $324 - 8(k + 5) = 284 - 8k$. No agreement means $284 - 8k < 0$, or $k > 35.5$, whose least integer is $36$.\n\n**The Full Solution:**\nStep 1: Move every term to one side: $2p^2 - 18p + k + 5 = 0$, so $a = 2$, $b = -18$, and the constant term is $k + 5$.\nStep 2: The models never agree exactly when the equation has no real solution, that is, when $(-18)^2 - 4(2)(k + 5) < 0$, or $324 - 8k - 40 < 0$.\nStep 3: That simplifies to $284 < 8k$, so $k > 35.5$ and the least integer is $36$. Check: at $k = 36$ the discriminant is $284 - 288 = -4 < 0$, while at $k = 35$ it is $4 > 0$ and the paces $4$ and $5$ minutes per kilometer both work ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($35$): rounds $35.5$ down; at $k = 35$ the models still agree twice.\n* Choice C ($41$): never moves the $-5$ across, so the constant term is read as $k$ and the bound becomes $k > 40.5$.\n* Choice D ($77$): halves the $4$ in $4ac$, turning the condition into $324 - 4(k + 5) < 0$.\n\n**Test Day Takeaway:** Put the quadratic in standard form before reading $a$, $b$, and $c$ — a constant hiding on the far side changes the discriminant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-356",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A forestry model gives $9m^2 + km + 16 = 0$, where $k$ is a negative constant and each solution $m$ is a sapling height, in meters, at which two canopy-cover estimates coincide. If exactly one such height exists, what is the value of $k$?",
    choices: [
      // distractor: reports $-4ac = -576$ itself instead of taking its square root
      { id: "A", text: "$-576$" },
      // distractor: adds the outer coefficients, $-(9 + 16)$, instead of using the discriminant
      { id: "B", text: "$-25$" },
      { id: "C", text: "$-24$" },
      // distractor: drops the factor of $4$ and computes $-\sqrt{9 \cdot 16} = -12$
      { id: "D", text: "$-12$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Exactly one solution means $k^2 = 4ac = 4(9)(16) = 576$, so $k = \\pm 24$; the negative value is $-24$.\n\n**The Full Solution:**\nStep 1: Here $a = 9$, $b = k$, and $c = 16$.\nStep 2: A quadratic has exactly one real solution when its discriminant is zero: $k^2 - 4(9)(16) = 0$, so $k^2 = 576$.\nStep 3: Then $k = 24$ or $k = -24$, and the problem states $k$ is negative, so $k = -24$. Check: $9m^2 - 24m + 16 = (3m - 4)^2$, which is zero only at the single height $m = \\frac{4}{3}$ meters ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-576$): stops at $4ac$ and attaches the minus sign without taking a square root.\n* Choice B ($-25$): adds $9$ and $16$, a sum that has nothing to do with the discriminant.\n* Choice D ($-12$): uses $\\sqrt{ac}$ rather than $\\sqrt{4ac}$, halving the correct magnitude.\n\n**Test Day Takeaway:** A one-solution condition sets the discriminant to zero, and solving for a middle coefficient always leaves two signs — read the stem to choose between them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-357",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a coastal forecast the wave heights $v$, in meters, predicted by two models satisfy $v^2 - 6v + c = 0$, where the constant $c$ depends on the offshore fetch. If no such wave height exists, which statement must be true?",
    choices: [
      // distractor: divides $-4c < -36$ by $-4$ without reversing the inequality sign
      { id: "A", text: "$c < 9$" },
      // distractor: reverses the inequality and keeps the boundary, but at $c = 9$ the height $v = 3$ meters does satisfy the equation
      { id: "B", text: "$c \\le 9$" },
      { id: "C", text: "$c > 9$" },
      // distractor: drops the factor of $4$, solving $36 - c < 0$
      { id: "D", text: "$c > 36$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** No real solution means $b^2 - 4ac < 0$, so $36 - 4c < 0$ and $c > 9$.\n\n**The Full Solution:**\nStep 1: Read off $a = 1$, $b = -6$, and the constant term $c$.\nStep 2: The equation has no real solution exactly when the discriminant is negative: $(-6)^2 - 4(1)(c) < 0$, or $36 - 4c < 0$.\nStep 3: Adding $4c$ to both sides gives $36 < 4c$, so $c > 9$. Check: at $c = 10$ the discriminant is $36 - 40 = -4 < 0$, while at $c = 9$ the single height $v = 3$ satisfies the equation ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($c < 9$): divides by $-4$ without reversing the inequality sign.\n* Choice B ($c \\le 9$): reverses the inequality and includes $c = 9$, where a wave height of $3$ meters does satisfy the equation.\n* Choice D ($c > 36$): treats the discriminant as $36 - c$, ignoring the coefficient $4$.\n\n**Test Day Takeaway:** Move the variable term to the positive side before dividing — that keeps the inequality pointing the right way.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-358",
    domain: "advanced-math",
    skills: ["discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A population model produces the equation $2x^2 - bx + 2b = 0$, where $b$ is a constant fixed by the habitat and $x$ is the number of years after a survey at which two predicted ground-beetle densities are equal. For which values of $b$ are the two predictions never equal?",
    choices: [
      { id: "A", text: "$0 < b < 16$" },
      // distractor: includes the endpoints $b = 0$ and $b = 16$, where the discriminant is zero and the densities do meet once
      { id: "B", text: "$0 \\le b \\le 16$" },
      // distractor: solves $b^2 - 16b > 0$, the condition for two crossing times rather than none
      { id: "C", text: "$b < 0$ or $b > 16$" },
      // distractor: keeps only the upper bound and loses the requirement that $b$ be positive
      { id: "D", text: "$b < 16$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** No real solution means $b^2 - 4(2)(2b) < 0$, so $b(b - 16) < 0$, which holds exactly on $0 < b < 16$.\n\n**The Full Solution:**\nStep 1: With $a = 2$ and constant term $2b$, the discriminant is $(-b)^2 - 4(2)(2b) = b^2 - 16b$.\nStep 2: The densities are never equal when that discriminant is negative: $b^2 - 16b < 0$, which factors as $b(b - 16) < 0$.\nStep 3: A product of two factors is negative only between their zeros, so $0 < b < 16$. Check: at $b = 8$ the discriminant is $64 - 128 = -64 < 0$, and at $b = 20$ it is $400 - 320 = 80 > 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($0 \\le b \\le 16$): at both endpoints the discriminant equals $0$, so the two predictions do meet, at a single time.\n* Choice C ($b < 0$ or $b > 16$): this is where $b^2 - 16b > 0$, the case with two crossing times.\n* Choice D ($b < 16$): reads only one factor of $b(b - 16) < 0$ and forgets that $b$ must also exceed $0$.\n\n**Test Day Takeaway:** When the discriminant itself is quadratic in the parameter, factor it and read the sign chart — a negative product lives strictly between the zeros.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-with-integer-bound",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- factor-by-grouping (4 → 10) ---
  {
    id: "bank-am-359",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Migration counts along a flyway are modeled by the expression $15x^3 + 10x^2 + 3kx + 2k$, in which $x$ is the week number and $k$ denotes a constant. Written as a product of two factors, that model becomes which of the following?",
    choices: [
      { id: "A", text: "$(5x^2 + k)(3x + 2)$" },
      // distractor: splits the constant as $2k$ and $1$, which expands to $15x^3 + 5x^2 + 6kx + 2k$
      { id: "B", text: "$(5x^2 + 2k)(3x + 1)$" },
      // distractor: flips the sign of the $2$, which turns the $10x^2$ term into $-10x^2$
      { id: "C", text: "$(5x^2 + k)(3x - 2)$" },
      // distractor: puts the squared variable in the wrong factor, giving $15x^3 + 10x + 3kx^2 + 2k$
      { id: "D", text: "$(5x + k)(3x^2 + 2)$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** $5x^2(3x + 2) + k(3x + 2) = (5x^2 + k)(3x + 2)$.\n\n**The Full Solution:**\nStep 1: Pair the terms: $(15x^3 + 10x^2) + (3kx + 2k)$.\nStep 2: The first pair has common factor $5x^2$, giving $5x^2(3x + 2)$; the second has common factor $k$, giving $k(3x + 2)$.\nStep 3: The shared binomial is $3x + 2$, so the model is $(5x^2 + k)(3x + 2)$. Check: expanding gives $15x^3 + 10x^2 + 3kx + 2k$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($(5x^2 + 2k)(3x + 1)$): the middle terms come out as $5x^2$ and $6kx$, neither of which matches.\n* Choice C ($(5x^2 + k)(3x - 2)$): a single sign flip changes $+10x^2$ to $-10x^2$.\n* Choice D ($(5x + k)(3x^2 + 2)$): the squared variable sits in the wrong factor, so the expansion is $15x^3 + 10x + 3kx^2 + 2k$, with $10$ and $3k$ on the wrong terms.\n\n**Test Day Takeaway:** A letter constant groups exactly like a number — pull it out of its pair and look for the same binomial on both sides.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-360",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a trail-run elevation model, the polynomial $21x^3 - 14x^2 + 3mx - 10$ describes the climb after $x$ kilometers, with the course profile setting the constant $m$. For which value of $m$ does $3x - 2$ divide that polynomial with no remainder?",
    choices: [
      // distractor: quotes the $2$ inside $3x - 2$ instead of solving for $m$
      { id: "A", text: "$2$" },
      { id: "B", text: "$5$" },
      // distractor: uses the constant term $-10$ directly, skipping the division by $-2$
      { id: "C", text: "$10$" },
      // distractor: reports $3m$, the coefficient of $x$, rather than $m$ itself
      { id: "D", text: "$15$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $21x^3 - 14x^2 = 7x^2(3x - 2)$, so the second pair must be $5(3x - 2) = 15x - 10$; matching $3mx = 15x$ gives $m = 5$.\n\n**The Full Solution:**\nStep 1: Factor the first pair: $21x^3 - 14x^2 = 7x^2(3x - 2)$.\nStep 2: The second pair, $3mx - 10$, must be a multiple of $3x - 2$. Since the constant is $-10$, that multiple is $5(3x - 2)$.\nStep 3: Then $5(3x - 2) = 15x - 10$, so $3m = 15$ and $m = 5$. Check: $(7x^2 + 5)(3x - 2) = 21x^3 - 14x^2 + 15x - 10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): reads a number out of the given binomial instead of computing $m$.\n* Choice C ($10$): stops at the constant term, which is $-2$ times the multiplier.\n* Choice D ($15$): reports the whole coefficient $3m$, forgetting to divide by $3$.\n\n**Test Day Takeaway:** Match the constant first to find the multiplier, then use the $x$-term to solve for the parameter — the two must agree.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-361",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The expression $8x^2 + 12x - 14x - 21$ can be written as the product of two binomials. Which of the following is that product?",
    choices: [
      // distractor: flips the sign inside each factor
      { id: "A", text: "$(2x - 3)(4x + 7)$" },
      { id: "B", text: "$(2x + 3)(4x - 7)$" },
      // distractor: pairs 4x with 3 and 2x with 7
      { id: "C", text: "$(4x + 3)(2x - 7)$" },
      // distractor: swaps the constants 3 and 7
      { id: "D", text: "$(2x + 7)(4x - 3)$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Group in pairs: $4x(2x + 3) - 7(2x + 3) = (2x + 3)(4x - 7)$.\n\n**The Full Solution:**\nStep 1: Split the four terms into two pairs: $(8x^2 + 12x) + (-14x - 21)$.\nStep 2: Factor each pair. The first pair gives $4x(2x + 3)$; the second gives $-7(2x + 3)$. Both pairs now share the binomial $2x + 3$.\nStep 3: Factor out that shared binomial: $(2x + 3)(4x - 7)$. Check by expanding: $8x^2 - 14x + 12x - 21$, which matches the original. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(2x - 3)(4x + 7)$): flips the sign inside each factor and expands to $8x^2 + 2x - 21$.\n* Choice C ($(4x + 3)(2x - 7)$): pairs the $4x$ with the $3$ instead of with the $-7$, giving $8x^2 - 22x - 21$.\n* Choice D ($(2x + 7)(4x - 3)$): swaps the constants $3$ and $7$, giving $8x^2 + 22x - 21$.\n\n**Test Day Takeaway:** After factoring each pair, the two leftover binomials must be IDENTICAL; if they are not, regroup or change the sign you pull out.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-362",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Expanding the seed-dispersal product $(4x^2 + 7)(5x - 3)$, in which $x$ is the release height in meters, produces the polynomial $20x^3 + ax^2 + 35x - 21$, where $a$ is a constant the modelers record separately for each field. What number is $a$?",
    choices: [
      { id: "A", text: "$-12$" },
      // distractor: quotes the $7$ from the first factor instead of forming a product
      { id: "B", text: "$7$" },
      // distractor: drops the negative sign from $4x^2 \cdot (-3)$
      { id: "C", text: "$12$" },
      // distractor: reports the coefficient of $x$, which comes from $7 \cdot 5x$
      { id: "D", text: "$35$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The only $x^2$ term comes from $4x^2 \\cdot (-3) = -12x^2$, so $a = -12$.\n\n**The Full Solution:**\nStep 1: Distribute: $4x^2(5x) = 20x^3$ and $4x^2(-3) = -12x^2$.\nStep 2: Then $7(5x) = 35x$ and $7(-3) = -21$.\nStep 3: Collecting terms gives $20x^3 - 12x^2 + 35x - 21$, so $a = -12$. Check: at $x = 1$ the product is $(11)(2) = 22$, and $20 - 12 + 35 - 21 = 22$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($7$): copies a constant out of a factor instead of multiplying.\n* Choice C ($12$): correct in size but wrong in sign, since one factor contributes $-3$.\n* Choice D ($35$): the coefficient one degree lower, from $7 \\cdot 5x$.\n\n**Test Day Takeaway:** To get one coefficient, find only the products that land in that degree — here just $4x^2$ times $-3$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-363",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The mass of a soil core, in grams, is $14y^3 + 21y^2 + 6y + 9$ for a core of radius $y$ centimeters, and that mass factors as a product of two binomials with integer coefficients. Which product is it?",
    choices: [
      // distractor: puts the square in the wrong factor, giving $14y^3 + 21y + 6y^2 + 9$
      { id: "A", text: "$(7y + 3)(2y^2 + 3)$" },
      // distractor: regroups the constants as $9$ and $1$, which expands to $14y^3 + 7y^2 + 18y + 9$
      { id: "B", text: "$(7y^2 + 9)(2y + 1)$" },
      // distractor: flips the sign inside the binomial, turning $+21y^2$ into $-21y^2$
      { id: "C", text: "$(7y^2 + 3)(2y - 3)$" },
      { id: "D", text: "$(7y^2 + 3)(2y + 3)$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $7y^2(2y + 3) + 3(2y + 3) = (7y^2 + 3)(2y + 3)$.\n\n**The Full Solution:**\nStep 1: Pair the terms: $(14y^3 + 21y^2) + (6y + 9)$.\nStep 2: Factor each pair: $7y^2(2y + 3)$ and $3(2y + 3)$.\nStep 3: Both share $2y + 3$, so the mass is $(7y^2 + 3)(2y + 3)$. Check: expanding gives $14y^3 + 21y^2 + 6y + 9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(7y + 3)(2y^2 + 3)$): the square sits in the wrong factor, so the expansion is $14y^3 + 21y + 6y^2 + 9$, which puts $21$ on the $y$ term.\n* Choice B ($(7y^2 + 9)(2y + 1)$): a mis-split of the constants; the middle term becomes $7y^2$.\n* Choice C ($(7y^2 + 3)(2y - 3)$): one sign flip reverses the $21y^2$ term.\n\n**Test Day Takeaway:** Check a factored answer by multiplying the two OUTER terms and the two INNER constants — those reproduce the cubic and constant terms instantly.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-364",
    domain: "advanced-math",
    skills: ["factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A dune-profile study uses the expression $x^3 + 3x^2 + nx + 3n$, where $x$ is a horizontal distance in meters and $n$ is a constant that changes from dune to dune along the coast. Which of the following must be true for every value of $n$?",
    choices: [
      { id: "A", text: "$x + 3$ is a factor for every value of $n$." },
      // distractor: assumes the leftover factor $x^2 + n$ must itself factor, which the question never requires
      { id: "B", text: "$x + 3$ is a factor only when $n$ is a perfect square." },
      // distractor: reads the pulled-out constant $n$ as part of the shared binomial
      { id: "C", text: "$x + n$ is a factor for every value of $n$." },
      // distractor: pairs the $3$ with $x^2$; the quadratic factor is $x^2 + n$, not $x^2 + 3$
      { id: "D", text: "$x^2 + 3$ is a factor for every value of $n$." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Factor by Grouping**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** $x^2(x + 3) + n(x + 3) = (x^2 + n)(x + 3)$, and that grouping never used the value of $n$.\n\n**The Full Solution:**\nStep 1: Pair the terms: $(x^3 + 3x^2) + (nx + 3n)$.\nStep 2: Factor each pair: $x^2(x + 3)$ and $n(x + 3)$.\nStep 3: Both pairs carry $x + 3$, so the expression equals $(x^2 + n)(x + 3)$ for every $n$. Check: with $n = 7$, $(x^2 + 7)(x + 3) = x^3 + 3x^2 + 7x + 21$, matching the given form ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (only when $n$ is a perfect square): the grouping works regardless of $n$; whether $x^2 + n$ factors further is a separate question.\n* Choice C ($x + n$): $n$ is the constant left behind by the second pair, not part of the shared binomial.\n* Choice D ($x^2 + 3$): swaps the two constants; the quadratic factor is $x^2 + n$.\n\n**Test Day Takeaway:** When a parameter appears in exactly two terms, group those two together — the parameter then factors out and the shared binomial is parameter-free.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "factor-by-grouping",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- function-composition (4 → 10) ---
  {
    id: "bank-am-365",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A dimmer board converts a fader setting $s$ to an output voltage $v(s)=3s+20$, and the lamp it drives produces a brightness, in lumens, of $L(v)=8v$. What is the value of $L(v(10))$?",
    choices: [
      // distractor: applies only L to the setting 10, skipping the voltage step: 8(10) = 80
      { id: "A", text: "$80$" },
      // distractor: drops the constant 20 from the voltage: 8(3 x 10) = 240
      { id: "B", text: "$240$" },
      // distractor: composes in the reverse order: v(L(10)) = 3(80) + 20 = 260
      { id: "C", text: "$260$" },
      { id: "D", text: "$400$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $v(10)=50$ volts, and $L(50)=8(50)=400$ lumens.\n\n**The Full Solution:**\nStep 1: The inner function converts the fader setting: $v(10)=3(10)+20=50$.\nStep 2: That voltage is the input of $L$: $L(50)=8(50)$.\nStep 3: $8(50)=400$ lumens. Check: doubling the fader's contribution $3(10)=30$ to $50$ volts and scaling by 8 gives 400 ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($80$): applies $L$ to the fader setting itself, $8(10)$, skipping the voltage conversion.\n* Choice B ($240$): drops the constant $20$, computing $8(30)$ instead of $8(50)$.\n* Choice C ($260$): composes in the reverse order, $v(L(10))=3(80)+20$.\n\n**Test Day Takeaway:** Read $L(v(10))$ right to left: the fader setting enters $v$, and only $v$'s output enters $L$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-366",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An inspection log records the corrosion depth $f(x)$, in millimeters, at five marked pipe joints $x$. A field crew numbers the same joints using $g(x)=2x-1$. What is the value of $f(g(3))$?",
    diagram: { type: "dataTable", params: { headers: ["Joint x", "Corrosion depth f(x) (mm)"], rows: [["1", "12"], ["3", "20"], ["5", "26"], ["7", "31"], ["9", "33"]] } },
    choices: [
      // distractor: reads f at 3 without applying g first
      { id: "A", text: "$20$" },
      { id: "B", text: "$26$" },
      // distractor: uses g(x) = 2x + 1, landing on joint 7
      { id: "C", text: "$31$" },
      // distractor: treats the output 5 as a row position and reads the fifth row, joint 9
      { id: "D", text: "$33$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $g(3)=5$, and the row for joint $5$ gives $f(5)=26$ millimeters.\n\n**The Full Solution:**\nStep 1: Evaluate the inner function: $g(3)=2(3)-1=5$.\nStep 2: The composition asks for $f$ at that joint number, so read the table at $x=5$.\nStep 3: The table gives $f(5)=26$ millimeters. Check: the crew's joint 3 is the log's joint 5, whose recorded depth is 26 ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): reads $f(3)=20$, skipping the conversion $g$ entirely.\n* Choice C ($31$): uses $g(x)=2x+1$, which lands on joint 7.\n* Choice D ($33$): treats the output $5$ as a row number and reads the fifth row, joint 9.\n\n**Test Day Takeaway:** When one function is a table and the other is a rule, evaluate the rule first and use its output as the table's input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-367",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rehearsal-hall timer applies $v(x)=x-6$ to an entered value $x$ and then applies $u(x)=\\frac{x}{4}$ to that result. If the timer's output is $-3$, what value was entered?",
    choices: [
      // distractor: subtracts 6 instead of adding it when undoing the first step: 4(-3) - 6 = -18
      { id: "A", text: "$-18$" },
      // distractor: reports the value after the subtraction step, -12, rather than the entered value
      { id: "B", text: "$-12$" },
      { id: "C", text: "$-6$" },
      // distractor: adds 6 before multiplying by 4, reversing the order of the undo steps: (-3 + 6)(4) = 12
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Undo the outer step first: $u$'s input was $4(-3)=-12$, so $x-6=-12$ and $x=-6$.\n\n**The Full Solution:**\nStep 1: The composition is $u(v(x))=\\frac{x-6}{4}$, and this equals $-3$.\nStep 2: Multiply both sides by 4: $x-6=-12$.\nStep 3: Add 6 to both sides: $x=-6$. Check: $v(-6)=-12$ and $u(-12)=\\frac{-12}{4}=-3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-18$): subtracts 6 instead of adding it, giving $4(-3)-6$.\n* Choice B ($-12$): stops at the intermediate value $x-6=-12$ instead of solving for $x$.\n* Choice D ($12$): adds 6 before multiplying by 4, undoing the two steps in the wrong order.\n\n**Test Day Takeaway:** To reverse a composition, undo the outermost operation first and work inward.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-368",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "For a gallery exhibition, the function $C$ gives the framing cost, in dollars, for $n$ prints, and the function $p$ gives the number of prints produced in $w$ weeks. Which expression gives the framing cost for the prints produced in $w$ weeks?",
    choices: [
      { id: "A", text: "$C(p(w))$" },
      // distractor: adds a cost to a count of prints, two quantities in different units
      { id: "B", text: "$C(w)+p(w)$" },
      // distractor: multiplies a cost by a count, charging each print the full order cost
      { id: "C", text: "$C(w) \\cdot p(w)$" },
      // distractor: reverses the roles, feeding a dollar amount into the print-count function
      { id: "D", text: "$p(C(w))$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Weeks enter $p$, and $p$'s output (a number of prints) is exactly what $C$ takes, so the cost is $C(p(w))$.\n\n**The Full Solution:**\nStep 1: Identify the inputs and outputs: $p$ takes weeks and returns prints; $C$ takes prints and returns dollars.\nStep 2: To go from weeks to dollars, the output of $p$ must be the input of $C$.\nStep 3: That chain is written $C(p(w))$. Check: if $p(4)=90$ prints and $C(90)=1{,}260$ dollars, then $C(p(4))=1{,}260$ dollars ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($C(w)+p(w)$): adds dollars to a number of prints and also treats $w$ as a print count.\n* Choice C ($C(w) \\cdot p(w)$): multiplies a cost by a count, charging the full order cost once per print.\n* Choice D ($p(C(w))$): reverses the chain, feeding a dollar amount into the function that counts prints.\n\n**Test Day Takeaway:** Match units at the seam: the inner function's output units must be the outer function's input units.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-369",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A study models the antibody level, in units, $d$ days after a booster by $A(d)=2d+5$, and models the protection score by $P(A)=A^{2}-9$. Which expression gives the protection score $d$ days after the booster?",
    choices: [
      // distractor: composes in the reverse order: A(P(d)) = 2(d^2 - 9) + 5 = 2d^2 - 13
      { id: "A", text: "$2d^{2}-13$" },
      // distractor: squares each term separately: (2d)^2 + 5^2 - 9 = 4d^2 + 16
      { id: "B", text: "$4d^{2}+16$" },
      { id: "C", text: "$4d^{2}+20d+16$" },
      // distractor: adds 9 instead of subtracting it: (2d + 5)^2 + 9 = 4d^2 + 20d + 34
      { id: "D", text: "$4d^{2}+20d+34$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Substitute $2d+5$ for $A$: $(2d+5)^{2}-9=4d^{2}+20d+25-9=4d^{2}+20d+16$.\n\n**The Full Solution:**\nStep 1: The antibody level after $d$ days is $A(d)=2d+5$, so the protection score is $P(2d+5)$.\nStep 2: Expand the square: $(2d+5)^{2}=4d^{2}+20d+25$.\nStep 3: Subtract 9: $4d^{2}+20d+25-9=4d^{2}+20d+16$. Check at $d=1$: $A(1)=7$ and $P(7)=49-9=40$, and $4+20+16=40$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2d^{2}-13$): composes in the reverse order, $A(P(d))=2(d^{2}-9)+5$.\n* Choice B ($4d^{2}+16$): squares each term separately, $(2d)^{2}+5^{2}-9$, losing the middle term $20d$.\n* Choice D ($4d^{2}+20d+34$): adds 9 rather than subtracting it.\n\n**Test Day Takeaway:** Substituting a binomial into a square always leaves a middle term — expand, never square term by term.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-370",
    domain: "advanced-math",
    skills: ["function-composition"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "An audio chain sends every input $x$ first through the preamplifier stage $g$, defined by $g(x)=x+4$, and then through a second stage $f$, and the chain's overall output is $3x+2$. Which equation defines $f$?",
    choices: [
      // distractor: distributes the 3 over x - 4 but drops the constant +2: 3(x - 4) = 3x - 12
      { id: "A", text: "$f(x)=3x-12$" },
      { id: "B", text: "$f(x)=3x-10$" },
      // distractor: subtracts 4 from the output instead of from the input: 3x + 2 - 4 = 3x - 2
      { id: "C", text: "$f(x)=3x-2$" },
      // distractor: replaces x with x + 4 instead of x - 4: 3(x + 4) + 2 = 3x + 14
      { id: "D", text: "$f(x)=3x+14$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Composition**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $f(x+4)=3x+2$; replacing $x$ with $x-4$ gives $f(x)=3(x-4)+2=3x-10$.\n\n**The Full Solution:**\nStep 1: The chain says $f(g(x))=f(x+4)=3x+2$ for every $x$.\nStep 2: Let $t=x+4$, so $x=t-4$ and $f(t)=3(t-4)+2$.\nStep 3: Simplify: $f(t)=3t-12+2=3t-10$, so $f(x)=3x-10$. Check: $f(g(1))=f(5)=15-10=5$, and $3(1)+2=5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($f(x)=3x-12$): distributes the 3 over $x-4$ but drops the $+2$.\n* Choice C ($f(x)=3x-2$): subtracts 4 from the output instead of from the input.\n* Choice D ($f(x)=3x+14$): substitutes $x+4$ where $x-4$ belongs, shifting the wrong way.\n\n**Test Day Takeaway:** To recover the outer function, rename the inner expression as a single variable and solve for the original input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-composition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- function-evaluation-with-negative-input (4 → 10) ---
  {
    id: "bank-am-371",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A county health department reports the number of new cases per 100,000 residents with the model $c(w)=-8w+120$, where $w$ is the number of weeks after a district's peak. What is the value of $c(-5)$?",
    choices: [
      // distractor: keeps only -8(-5) = 40 and drops the constant 120
      { id: "A", text: "$40$" },
      // distractor: substitutes w = 5 instead of w = -5: -40 + 120 = 80
      { id: "B", text: "$80$" },
      // distractor: evaluates at w = 0, the peak itself
      { id: "C", text: "$120$" },
      { id: "D", text: "$160$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $-8(-5)=40$, and $40+120=160$ cases per 100,000 residents.\n\n**The Full Solution:**\nStep 1: Substitute $-5$ for $w$: $c(-5)=-8(-5)+120$.\nStep 2: A negative rate times a negative input is positive: $-8(-5)=40$.\nStep 3: Add the constant: $40+120=160$. Check: five weeks before the peak the model is above the peak value of 120, as a declining model going backwards should be ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($40$): reports only the product $-8(-5)$ and never adds 120.\n* Choice B ($80$): substitutes $w=5$, five weeks after the peak instead of before it.\n* Choice C ($120$): evaluates at $w=0$, the value at the peak itself.\n\n**Test Day Takeaway:** A negative time input runs the model backwards; two negatives in the rate term make the result larger, not smaller.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-372",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A water main's gauge pressure, in pounds per square inch above the district's baseline, at a point $x$ kilometers east of the pump station is modeled by $f(x)=4x+9$. What is the value of $f(-6)$?",
    choices: [
      // distractor: reports only 4(-6) = -24, dropping the constant 9
      { id: "A", text: "$-24$" },
      { id: "B", text: "$-15$" },
      // distractor: evaluates at x = 0, the pump station itself
      { id: "C", text: "$9$" },
      // distractor: substitutes x = 6 instead of x = -6: 24 + 9 = 33
      { id: "D", text: "$33$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $4(-6)=-24$, and $-24+9=-15$ pounds per square inch.\n\n**The Full Solution:**\nStep 1: Substitute $-6$ for $x$: $f(-6)=4(-6)+9$.\nStep 2: Multiply first: $4(-6)=-24$.\nStep 3: Add the constant: $-24+9=-15$ pounds per square inch. Check: 6 kilometers west of the pump station the pressure sits 24 units below the station's reading of 9, which is $-15$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-24$): stops at $4(-6)$ without adding the pressure at the pump station.\n* Choice C ($9$): evaluates at $x=0$ rather than at $x=-6$.\n* Choice D ($33$): treats the point as 6 kilometers east instead of 6 kilometers west.\n\n**Test Day Takeaway:** A negative input means the opposite direction; substitute it in parentheses and let the sign carry through.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-373",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An epidemiologist tracks a ward's inpatient occupancy with $b(t)=240+15t$, where $b(t)$ is the number of occupied beds $t$ months after March. Which statement best interprets the equation $b(-4)=180$?",
    choices: [
      { id: "A", text: "Four months before March, 180 beds were occupied." },
      // distractor: reads the negative input as months after March instead of before it
      { id: "B", text: "Four months after March, 180 beds were occupied." },
      // distractor: treats the output 180 as a change in occupancy rather than a level
      { id: "C", text: "In March, 180 fewer beds were occupied than four months earlier." },
      // distractor: reads the input -4 as a monthly rate of change instead of a time
      { id: "D", text: "Occupancy fell by 4 beds per month in the months before March." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The input $-4$ is four months before March, and the output 180 is a bed count, so 180 beds were occupied four months before March.\n\n**The Full Solution:**\nStep 1: The variable $t$ counts months after March, so $t=-4$ names the month four months earlier.\nStep 2: The output of $b$ is the number of occupied beds, not a change in that number.\nStep 3: Therefore $b(-4)=180$ says 180 beds were occupied four months before March. Check: $240+15(-4)=240-60=180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: reads $-4$ as four months after March, reversing the direction of time.\n* Choice C: turns the output into a difference; 180 is a level, and the actual drop from March is 60 beds.\n* Choice D: reads the input $-4$ as a rate; the rate here is the coefficient 15.\n\n**Test Day Takeaway:** In an interpretation question, name the input's units and the output's units before reading the choices.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-374",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A highway model predicts an average speed of $s(x)=52-0.8x$ miles per hour when the flow is $x$ vehicles per lane per minute above 20. Which statement best interprets $s(-10)=60$?",
    choices: [
      { id: "A", text: "At a flow 10 vehicles per lane per minute below 20, the predicted average speed is 60 miles per hour." },
      // distractor: reads the negative input as a flow above 20, reversing the direction
      { id: "B", text: "At a flow 10 vehicles per lane per minute above 20, the predicted average speed is 60 miles per hour." },
      // distractor: treats the input -10 as a change in speed rather than a change in flow
      { id: "C", text: "At a flow of 20 vehicles per lane per minute, the predicted average speed is 10 miles per hour below 60." },
      // distractor: reads the input -10 as a rate of change; the rate is the coefficient 0.8
      { id: "D", text: "Each vehicle per lane per minute below 20 raises the predicted average speed by 10 miles per hour." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The input counts vehicles above 20, so $x=-10$ is a flow 10 below 20, and the output 60 is a predicted speed.\n\n**The Full Solution:**\nStep 1: The variable $x$ measures how far the flow is above 20 vehicles per lane per minute, so $x=-10$ means 10 below 20.\nStep 2: The output of $s$ is an average speed in miles per hour, not a change in speed.\nStep 3: So $s(-10)=60$ says that at a flow 10 below 20 the model predicts 60 miles per hour. Check: $52-0.8(-10)=52+8=60$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: reads $-10$ as 10 above 20, which the model would send to $52-8=44$ miles per hour.\n* Choice C: converts the input into a speed difference; the actual gap from the flow of 20 is 8 miles per hour.\n* Choice D: reads the input as the rate of change; the rate is 0.8 mile per hour per vehicle.\n\n**Test Day Takeaway:** When an input is measured from a baseline, a negative value sits below that baseline — say so before checking the output.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-375",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An archivist models a film vault's relative humidity by $H(d)=38-1.5d$, in percent, where $d$ is the number of days after a dehumidifier was switched on. What is the value of $H(-8)$?",
    choices: [
      // distractor: reports only -1.5(-8) = 12 and drops the constant 38
      { id: "A", text: "$12$" },
      // distractor: substitutes d = 8 instead of d = -8: 38 - 12 = 26
      { id: "B", text: "$26$" },
      // distractor: evaluates at d = 0, the day the dehumidifier was switched on
      { id: "C", text: "$38$" },
      { id: "D", text: "$50$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $-1.5(-8)=12$, and $38+12=50$ percent.\n\n**The Full Solution:**\nStep 1: Substitute $-8$ for $d$: $H(-8)=38-1.5(-8)$.\nStep 2: Subtracting a negative adds: $-1.5(-8)=12$.\nStep 3: $38+12=50$ percent. Check: eight days before the dehumidifier ran, the vault was more humid than the 38 percent at start-up ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): reports only the product $-1.5(-8)$ without the constant.\n* Choice B ($26$): substitutes $d=8$, eight days after start-up rather than before.\n* Choice C ($38$): evaluates at $d=0$, the start-up reading.\n\n**Test Day Takeaway:** Running a decreasing model backwards raises its value — the double negative is the whole question.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-376",
    domain: "advanced-math",
    skills: ["function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives the height $L(t)$ of a stage lift, in centimeters relative to the deck, at four times $t$, in minutes, relative to a cue. The height changes at a constant rate. What is the value of $L(-9)$?",
    diagram: { type: "dataTable", params: { headers: ["Time t (min)", "Height L(t) (cm)"], rows: [["-5", "22"], ["-1", "10"], ["3", "-2"], ["7", "-14"]] } },
    choices: [
      // distractor: steps in the wrong direction from t = -5, computing 22 - 12 = 10
      { id: "A", text: "$10$" },
      // distractor: treats the rate as 3 cm per table row instead of 3 cm per minute: 22 + 3 = 25
      { id: "B", text: "$25$" },
      { id: "C", text: "$34$" },
      // distractor: steps two rows back instead of one, computing 22 + 24 = 46
      { id: "D", text: "$46$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Evaluation with Negative Input**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The height drops 12 cm every 4 minutes, so going 4 minutes earlier than $t=-5$ adds 12: $22+12=34$ centimeters.\n\n**The Full Solution:**\nStep 1: Consecutive rows are 4 minutes apart and drop 12 centimeters, so the rate is $-3$ centimeters per minute.\nStep 2: The time $-9$ is 4 minutes before $-5$, so the height there is $22-(-3)(4)$.\nStep 3: $22+12=34$ centimeters. Check: from $t=-9$ to $t=7$ is 16 minutes, and $34-3(16)=-14$, the last row ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): moves one row in the wrong direction, giving the height already listed at $t=-1$.\n* Choice B ($25$): applies 3 centimeters per row instead of 3 centimeters per minute.\n* Choice D ($46$): steps two rows back from $t=-5$ instead of one.\n\n**Test Day Takeaway:** Extrapolating to a negative input reverses the sign of the change — multiply the rate by the signed gap in the input.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-evaluation-with-negative-input",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- function-transformation (4 → 10) ---
  {
    id: "bank-am-377",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A dance company replaces the fog-machine model $b$, which gives the fog output, in grams per minute, at a dial setting of $x$, with a model that returns half of $b$'s value at every setting. Which function models the new output?",
    choices: [
      // distractor: halves the dial setting rather than the fog output
      { id: "A", text: "$b(0.5x)$" },
      { id: "B", text: "$0.5b(x)$" },
      // distractor: subtracts 0.5 gram per minute from the output instead of halving it
      { id: "C", text: "$b(x)-0.5$" },
      // distractor: shifts the dial setting by 0.5 instead of scaling the output
      { id: "D", text: "$b(x-0.5)$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Half of the output means the whole function value is multiplied by $0.5$, giving $0.5b(x)$.\n\n**The Full Solution:**\nStep 1: The new model changes the fog output, which is the output, not the dial setting, which is the input.\nStep 2: A change to every output is written outside the function.\nStep 3: Multiplying the output by $0.5$ gives $0.5b(x)$. Check: if $b(4)=120$ grams per minute, the new model gives 60 grams per minute at the same setting ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($b(0.5x)$): halves the dial setting, which changes which output is read, not the output itself.\n* Choice C ($b(x)-0.5$): subtracts half a gram per minute instead of halving the value.\n* Choice D ($b(x-0.5)$): shifts the dial setting rather than scaling the output.\n\n**Test Day Takeaway:** Ask which quantity changed — outputs are altered outside the parentheses, inputs inside.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-378",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A clinic's daily visit model $v$ gives the number of patient visits on day $d$, and after a second nurse is hired the clinic expects 18 more visits on every day. Which function models the new count?",
    choices: [
      { id: "A", text: "$v(d)+18$" },
      // distractor: shifts the day rather than the visit count, reading 18 days ahead
      { id: "B", text: "$v(d+18)$" },
      // distractor: multiplies the day number by 18 instead of adding to the output
      { id: "C", text: "$v(18d)$" },
      // distractor: multiplies the visit count by 18 instead of adding 18
      { id: "D", text: "$18v(d)$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** More visits on the same day is an increase in the output, so add 18 outside: $v(d)+18$.\n\n**The Full Solution:**\nStep 1: The day $d$ is unchanged; only the predicted number of visits rises.\nStep 2: The number of visits is the output of $v$, so the 18 attaches outside the function.\nStep 3: The new model is $v(d)+18$. Check: if $v(5)=140$, the new model predicts 158 visits on day 5 ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($v(d+18)$): reads the count 18 days later instead of raising each day's count.\n* Choice C ($v(18d)$): rescales the day number, a horizontal change.\n* Choice D ($18v(d)$): multiplies the count by 18 rather than adding 18 to it.\n\n**Test Day Takeaway:** 'More of the output' adds outside the function; 'later in time' changes the input inside it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-379",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A sound designer subtracts 9 from every output of the level function $f$, defining a new function $h$ by $h(x)=f(x)-9$. How does the graph of $h$ compare with the graph of $f$?",
    choices: [
      { id: "A", text: "It is the graph of $f$ shifted down 9 units." },
      // distractor: reverses the direction of the vertical shift
      { id: "B", text: "It is the graph of $f$ shifted up 9 units." },
      // distractor: reads the subtraction as a horizontal shift, the effect of f(x + 9)
      { id: "C", text: "It is the graph of $f$ shifted left 9 units." },
      // distractor: reads the subtraction as the horizontal shift produced by f(x - 9)
      { id: "D", text: "It is the graph of $f$ shifted right 9 units." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Subtracting 9 outside the function lowers every point 9 units.\n\n**The Full Solution:**\nStep 1: The rule changes outputs, not inputs, so the motion is vertical.\nStep 2: Subtracting makes each output smaller, so the motion is downward.\nStep 3: The graph of $h$ is the graph of $f$ shifted down 9 units. Check: if $(4,20)$ is on the graph of $f$, then $(4,11)$ is on the graph of $h$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: moves the graph up, the effect of $f(x)+9$.\n* Choice C: reads the change as horizontal; a left shift comes from $f(x+9)$.\n* Choice D: also horizontal; a right shift comes from $f(x-9)$.\n\n**Test Day Takeaway:** Outside the parentheses the graph moves vertically in the direction the sign suggests; inside, it moves horizontally the opposite way.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-380",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The curve in the figure crosses the horizontal axis three times and is the graph of the function $f$. What are the $x$-intercepts of the graph of $y=f(x-4)$?",
    diagram: { type: "cubicGraph", params: { a: 0.3, roots: [-3, 0, 2], xRange: [-4, 3], yRange: [-8, 6], label: "y = f(x)" } },
    choices: [
      { id: "A", text: "$1$, $4$, and $6$" },
      // distractor: shifts left 4 instead of right 4, subtracting from each root
      { id: "B", text: "$-7$, $-4$, and $-2$" },
      // distractor: leaves the intercepts unchanged, treating x - 4 as a vertical shift
      { id: "C", text: "$-3$, $0$, and $2$" },
      // distractor: multiplies each root by 4 instead of adding 4
      { id: "D", text: "$-12$, $0$, and $8$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The drawn curve crosses at $-3$, $0$, and $2$; replacing $x$ with $x-4$ moves each crossing 4 units right, to $1$, $4$, and $6$.\n\n**The Full Solution:**\nStep 1: Read the three crossings from the figure: $x=-3$, $x=0$, and $x=2$.\nStep 2: The graph of $y=f(x-4)$ is zero when $x-4$ equals one of those values.\nStep 3: Solving $x-4=-3$, $x-4=0$, and $x-4=2$ gives $x=1$, $x=4$, and $x=6$. Check: the three new crossings keep the same spacing, 3 and 2 units apart ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-7$, $-4$, and $-2$): subtracts 4 from each root, shifting the curve left.\n* Choice C ($-3$, $0$, and $2$): leaves the crossings alone, as if $-4$ acted on the output.\n* Choice D ($-12$, $0$, and $8$): multiplies each root by 4 instead of translating.\n\n**Test Day Takeaway:** Replacing $x$ with $x-h$ adds $h$ to every $x$-intercept — set the inner expression equal to each original root.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-381",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of the quadratic function $f$ is shown, and the two points where it meets the $x$-axis are marked. What are the $x$-intercepts of the graph of $y = f(x + 3)$?",
    diagram: { type: "quadraticIntercepts", params: { intercepts: [-2, 6] } },
    choices: [
      // distractor: applies no shift at all
      { id: "A", text: "$-2$ and $6$" },
      { id: "B", text: "$-5$ and $3$" },
      // distractor: moves the two intercepts in opposite directions
      { id: "C", text: "$-5$ and $9$" },
      // distractor: shifts right instead of left
      { id: "D", text: "$1$ and $9$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $f(x + 3)$ slides the graph left $3$, so $-2$ and $6$ become $-5$ and $3$.\n\n**The Full Solution:**\nStep 1: The marked points show that $f(-2) = 0$ and $f(6) = 0$.\nStep 2: $y = f(x + 3)$ is zero exactly when the inside expression equals a zero of $f$: $x + 3 = -2$ or $x + 3 = 6$.\nStep 3: Solving gives $x = -5$ and $x = 3$. Check: $f(-5 + 3) = f(-2) = 0$ and $f(3 + 3) = f(6) = 0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$ and $6$): copies the original intercepts, applying no shift at all.\n* Choice C ($-5$ and $9$): moves one intercept left and the other right; a translation moves every point the same way.\n* Choice D ($1$ and $9$): adds $3$ to each intercept, shifting right — but $f(x + 3)$ shifts left.\n\n**Test Day Takeaway:** Set the inside expression equal to each known zero and solve; that mechanical step never gets the direction backward.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-382",
    domain: "advanced-math",
    skills: ["function-transformations", "vertex-form"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A designer stretches the graph of $y=f(x)$ vertically by a factor of 3 and then translates the result 6 units down, and the curve produced is the graph of $y=3x^{2}+18x+3$. Which equation defines $f$?",
    choices: [
      // distractor: subtracts 6 before dividing by 3: (3x^2 + 18x - 3)/3 = x^2 + 6x - 1
      { id: "A", text: "$f(x)=x^{2}+6x-1$" },
      // distractor: divides by 3 without undoing the 6-unit drop: (3x^2 + 18x + 3)/3 = x^2 + 6x + 1
      { id: "B", text: "$f(x)=x^{2}+6x+1$" },
      { id: "C", text: "$f(x)=x^{2}+6x+3$" },
      // distractor: divides only the variable terms by 3, leaving the constant 3 + 6 = 9
      { id: "D", text: "$f(x)=x^{2}+6x+9$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Function Transformation**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Undo the drop first, then the stretch: $\\frac{3x^{2}+18x+3+6}{3}=x^{2}+6x+3$.\n\n**The Full Solution:**\nStep 1: The two transformations give $3f(x)-6=3x^{2}+18x+3$.\nStep 2: Add 6 to both sides: $3f(x)=3x^{2}+18x+9$.\nStep 3: Divide every term by 3: $f(x)=x^{2}+6x+3$. Check: $3(x^{2}+6x+3)-6=3x^{2}+18x+9-6=3x^{2}+18x+3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($f(x)=x^{2}+6x-1$): subtracts the 6 instead of adding it back.\n* Choice B ($f(x)=x^{2}+6x+1$): divides by 3 but never undoes the vertical drop.\n* Choice D ($f(x)=x^{2}+6x+9$): divides only the variable terms, leaving the constant untouched.\n\n**Test Day Takeaway:** Undo a chain of transformations in reverse order — the last one applied is the first one removed.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-transformation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- interpret-exponential-parameters (4 → 10) ---
  {
    id: "bank-am-383",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A regional health agency models new tuberculosis cases by $N(t)=4{,}800(0.86)^{t}$, where $t$ is the number of years after screening began. What does the base $0.86$ indicate about the yearly case count?",
    choices: [
      // distractor: reads the base itself as the percent removed each year
      { id: "A", text: "It decreases by 86% each year." },
      // distractor: reads the base as a number of cases rather than a multiplier
      { id: "B", text: "It decreases by 0.86 case each year." },
      // distractor: reads a base below 1 as growth
      { id: "C", text: "It increases by 86% each year." },
      { id: "D", text: "It decreases by 14% each year." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Interpret Exponential Parameters**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** A base of $0.86$ keeps 86% of the previous year's count, so 14% is lost each year.\n\n**The Full Solution:**\nStep 1: In $N(t)=N_{0}(b)^{t}$ the base $b$ multiplies the count once per year.\nStep 2: Multiplying by $0.86$ leaves 86% of the previous value, so the change is $0.86-1=-0.14$.\nStep 3: That is a 14% decrease each year. Check: $4{,}800(0.86)=4{,}128$, which is 672 fewer, and $\\frac{672}{4{,}800}=0.14$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: treats the base as the fraction removed rather than the fraction kept.\n* Choice B: reads $0.86$ as a count of cases instead of a multiplier.\n* Choice C: calls a base below 1 growth; only bases above 1 grow.\n\n**Test Day Takeaway:** Compare the base with 1 — the difference, as a percent, is the change per period.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-384",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A chemist models the mass of a sample, in grams, by $M(d) = 240(0.75)^d$, where $d$ is the number of days since the sample was prepared. The table shows the mass for the first three days. Which of the following is the best interpretation of $0.75$ in this model?",
    diagram: { type: "dataTable", params: { headers: ["Days, d", "Mass (grams)"], rows: [["0", "240"], ["1", "180"], ["2", "135"]] } },
    choices: [
      // distractor: reads the decay factor as the percent lost
      { id: "A", text: "Each day, the mass of the sample is $75\\%$ less than the mass on the previous day." },
      // distractor: reads a multiplier as a constant amount
      { id: "B", text: "Each day, the mass of the sample decreases by $0.75$ gram." },
      { id: "C", text: "Each day, the mass of the sample is $75\\%$ of the mass on the previous day." },
      // distractor: turns the percent lost into a fixed amount
      { id: "D", text: "Each day, the mass of the sample decreases by $25$ grams." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Interpret Exponential Parameters**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** A base of $0.75$ means each day's mass is $0.75$ times, or $75\\%$ of, the previous day's mass.\n\n**The Full Solution:**\nStep 1: The model is $M(d) = a(b)^d$ with $a = 240$ grams and $b = 0.75$.\nStep 2: Increasing $d$ by $1$ multiplies the mass by $0.75$. The table shows this: $240 \\to 180 \\to 135$, and $\\frac{180}{240} = 0.75$.\nStep 3: So each day's mass is $75\\%$ of the day before, which is a $25\\%$ decrease. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: reads $0.75$ as the fraction LOST; losing $75\\%$ would leave a base of $0.25$.\n* Choice B: reads the multiplier as an amount in grams, which would describe a linear model.\n* Choice D: converts the $25\\%$ loss into a fixed $25$ grams; the actual drops are $60$ grams and then $45$ grams.\n\n**Test Day Takeaway:** For $0 < b < 1$, the base is the fraction that REMAINS; the percent lost is $(1 - b) \\times 100\\%$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-385",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives an exhibit's attendance for five consecutive weeks, and the attendance grows by the same factor each week. Which statement best describes the weekly change in attendance?",
    diagram: { type: "dataTable", params: { headers: ["Week w", "Attendance"], rows: [["0", "625"], ["1", "750"], ["2", "900"], ["3", "1,080"], ["4", "1,296"]] } },
    choices: [
      // distractor: reads the growth factor 1.2 as a 120% increase
      { id: "A", text: "The attendance increases by 120% each week." },
      { id: "B", text: "The attendance increases by 20% each week." },
      // distractor: uses the first week's difference of 125 as a constant increase
      { id: "C", text: "The attendance increases by 125 people each week." },
      // distractor: reads the 20% growth as an increase of 20 people
      { id: "D", text: "The attendance increases by 20 people each week." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Interpret Exponential Parameters**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Each attendance is 1.2 times the previous one, and a factor of 1.2 is a 20% increase.\n\n**The Full Solution:**\nStep 1: Divide consecutive entries: $\\frac{750}{625}=1.2$ and $\\frac{900}{750}=1.2$.\nStep 2: The same factor appears throughout, so the growth is exponential with base 1.2.\nStep 3: A base of 1.2 adds 20% of the previous week's attendance. Check: $\\frac{1{,}296}{1{,}080}=1.2$, so the last step follows the same rule ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: reports the factor 1.2 as the percent increase.\n* Choice C: uses the difference $750-625=125$ as if the growth were linear; the next difference is 150.\n* Choice D: turns the 20% into 20 people.\n\n**Test Day Takeaway:** Divide consecutive values to test for exponential growth; the base minus 1 is the percent change.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-386",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The amount of a radioactive substance remaining in a sealed container, in milligrams, is modeled by $A(t) = 168\\left(\\dfrac{1}{2}\\right)^{t/24}$, where $t$ is the number of days since the container was sealed. What is the half-life, in days, of the substance?",
    choices: [
      // distractor: halves the divisor in the exponent
      { id: "A", text: "$12$" },
      { id: "B", text: "$24$" },
      // distractor: doubles the divisor in the exponent
      { id: "C", text: "$48$" },
      // distractor: halves the initial amount and reports milligrams as days
      { id: "D", text: "$84$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Interpret Exponential Parameters**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The exponent $\\frac{t}{24}$ equals $1$ when $t = 24$, and one factor of $\\frac{1}{2}$ is one half-life.\n\n**The Full Solution:**\nStep 1: The half-life is the time it takes for the amount to be multiplied by $\\frac{1}{2}$ exactly once.\nStep 2: That happens when the exponent $\\frac{t}{24}$ equals $1$.\nStep 3: $\\frac{t}{24} = 1$ gives $t = 24$ days. Check: $A(24) = 168\\left(\\frac{1}{2}\\right)^1 = 84$, which is half of $168$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): halves the divisor, as if the exponent had to reach $2$ for one halving.\n* Choice C ($48$): doubles the divisor, confusing the half-life with the time for two halvings.\n* Choice D ($84$): reports the amount remaining after one half-life, in milligrams, instead of the time in days.\n\n**Test Day Takeaway:** Solve \"exponent $= 1$\" to read a half-life or doubling time straight out of the model.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-387",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A public-health laboratory models the bacterial colony count in a wastewater sample by $q(h)=72(3)^{h/4}$, where $q(h)$ is the number of colonies on a plate $h$ hours after the sample was collected. Which statement best interprets this model?",
    choices: [
      // distractor: ignores the divisor 4 in the exponent
      { id: "A", text: "The count triples every hour." },
      // distractor: reads the base 3 as a number of colonies added
      { id: "B", text: "The count increases by 3 colonies every 4 hours." },
      { id: "C", text: "The count triples every 4 hours." },
      // distractor: swaps the base and the divisor in the exponent
      { id: "D", text: "The count quadruples every 3 hours." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Interpret Exponential Parameters**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The exponent reaches 1 when $h=4$, so the factor 3 applies once every 4 hours.\n\n**The Full Solution:**\nStep 1: The base 3 multiplies the count each time the exponent $\\frac{h}{4}$ increases by 1.\nStep 2: The exponent increases by 1 when $h$ increases by 4 hours.\nStep 3: So the count is multiplied by 3 every 4 hours. Check: $q(0)=72$ and $q(4)=72(3)=216$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: drops the divisor, which would require the model $72(3)^{h}$.\n* Choice B: treats the base as an amount added rather than a multiplier.\n* Choice D: swaps 3 and 4, describing $72(4)^{h/3}$.\n\n**Test Day Takeaway:** A divided exponent stretches the doubling or tripling time — the divisor is the length of one period.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-388",
    domain: "advanced-math",
    skills: ["exponential-growth-decay"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A streaming service had $6{,}000$ active accounts at the end of year $0$, and the number of active accounts grows by $15\\%$ each year. The table gives the number of active accounts at the end of years $0$, $1$, and $2$. Which of the following functions models the number of active accounts at the end of year $t$?",
    diagram: { type: "dataTable", params: { headers: ["Year, t", "Active accounts"], rows: [["0", "6,000"], ["1", "6,900"], ["2", "7,935"]] } },
    choices: [
      // distractor: uses the growth rate itself as the base
      { id: "A", text: "$A(t) = 6{,}000(0.15)^t$" },
      { id: "B", text: "$A(t) = 6{,}000(1.15)^t$" },
      // distractor: drops the percent sign, using 15 as the base
      { id: "C", text: "$A(t) = 6{,}000(15)^t$" },
      // distractor: models the change as a constant yearly amount
      { id: "D", text: "$A(t) = 6{,}000 + 900t$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Interpret Exponential Parameters**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Growth of $15\\%$ per year means multiply by $1.15$ each year: $A(t) = 6{,}000(1.15)^t$.\n\n**The Full Solution:**\nStep 1: A constant percent change each year is exponential, of the form $A(t) = a(b)^t$ with $a$ the starting amount, so $a = 6{,}000$.\nStep 2: Growing by $15\\%$ leaves $100\\% + 15\\% = 115\\%$ of the previous year, so $b = 1.15$.\nStep 3: $A(t) = 6{,}000(1.15)^t$. Check against the table: $A(1) = 6{,}900$ and $A(2) = 7{,}935$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: uses the rate $0.15$ as the base, which would shrink the count to $15\\%$ of its size each year.\n* Choice C: drops the percent sign entirely, multiplying by $15$ each year.\n* Choice D: adds the first year's increase of $900$ forever; the table shows the second increase is $1{,}035$, not $900$.\n\n**Test Day Takeaway:** A percent GROWTH rate becomes the base $1 + r$; only the amount above $1$ is the percent itself.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- vertex-form-from-two-conditions (4 → 10) ---
  {
    id: "bank-am-389",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A mobile library records route stops above its monthly minimum with the quadratic function $f$; the graph shown includes the vertex and one additional marked point. If $f(x)=a(x+3)^2+k$ for constants $a$ and $k$, what is the value of $a+k$?",
    diagram: { type: "quadraticVertex", params: { vertex: [-3, -5], a: 0.5, showVertex: true, showPoints: [[1, 3]] } },
    choices: [
      // distractor: reports k alone
      { id: "A", text: "$-5$" },
      { id: "B", text: "$-4.5$" },
      // distractor: multiplies a and k instead of adding them
      { id: "C", text: "$-2.5$" },
      // distractor: reports a alone
      { id: "D", text: "$0.5$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The vertex $(-3,-5)$ gives $k=-5$, and the marked point $(1,3)$ gives $16a-5=3$, so $a=0.5$ and $a+k=-4.5$.\n\n**The Full Solution:**\nStep 1: In $f(x)=a(x+3)^2+k$ the vertex is $(-3,k)$; the graph shows the vertex at $(-3,-5)$, so $k=-5$.\nStep 2: The marked point is $(1,3)$, so $a(1+3)^2-5=3$, that is $16a=8$ and $a=0.5$.\nStep 3: Add: $a+k=0.5+(-5)=-4.5$. Check: $f(x)=0.5(x+3)^2-5$ gives $f(1)=8-5=3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): reports $k$ alone and never finds $a$.\n* Choice C ($-2.5$): multiplies $a$ and $k$ instead of adding them.\n* Choice D ($0.5$): reports $a$ alone.\n\n**Test Day Takeaway:** Read the vertex for one constant, use the extra point for the other, and re-read what combination the question asks for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-390",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A library's course-reserve holds above its term average are modeled by $f(x)=-2(x-c)^2+d$, where $c$ and $d$ are constants. If $f(1)=f(9)$ and the greatest value of $f$ is $32$, what is the value of $f(3)$?",
    choices: [
      { id: "A", text: "$24$" },
      // distractor: forgets to square, computing -2(2) + 32
      { id: "B", text: "$28$" },
      // distractor: subtracts the coefficient 2 from 32
      { id: "C", text: "$30$" },
      // distractor: reports the greatest value instead of f(3)
      { id: "D", text: "$32$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** $f(1)=f(9)$ puts $c=5$, and the greatest value $32$ makes $d=32$; then $f(3)=-2(4)+32=24$.\n\n**The Full Solution:**\nStep 1: Equal outputs at $1$ and $9$ mean the axis of symmetry is $x=\\frac{1+9}{2}=5$, so $c=5$.\nStep 2: The leading coefficient $-2$ is negative, so the graph opens downward and $d$ is the greatest value: $d=32$.\nStep 3: Evaluate: $f(3)=-2(3-5)^2+32=-2(4)+32=24$. Check: $f(7)=-2(4)+32=24$ as well, and $7$ mirrors $3$ about $x=5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($28$): forgets to square, computing $-2(2)+32$.\n* Choice C ($30$): subtracts the coefficient $2$ from $32$ rather than $2(3-5)^2$.\n* Choice D ($32$): reports the greatest value, which occurs at $x=5$, not at $x=3$.\n\n**Test Day Takeaway:** Two equal outputs give the axis, and a negative leading coefficient makes the vertex output the maximum — that is both constants.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-391",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $f$ defined by $f(x)=3(x-4)^2+7$ gives a shop's cost, in dollars, of producing one herbal tea tin in month $x$ of a contract. Which statement best interprets the number $7$ in this context?",
    choices: [
      // distractor: treats 7 as f(0), which is 55, not 7
      { id: "A", text: "The cost per tin is \\$7 in month $0$ of the contract." },
      // distractor: reads the positive leading coefficient 3 as opening downward
      { id: "B", text: "The cost per tin reaches a maximum of \\$7, in month $4$." },
      // distractor: swaps the roles of the 4 and the 7 in vertex form
      { id: "C", text: "The cost per tin is \\$4 at its lowest, in month $7$." },
      { id: "D", text: "The cost per tin reaches a minimum of \\$7, in month $4$." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** In $a(x-h)^2+k$ with $a=3>0$, the value $k=7$ is the least output, reached at $x=h=4$.\n\n**The Full Solution:**\nStep 1: The expression is in vertex form $a(x-h)^2+k$ with $a=3$, $h=4$, and $k=7$.\nStep 2: Because $a$ is positive, $3(x-4)^2$ is never negative and is $0$ only at $x=4$, so the smallest possible cost is $7$.\nStep 3: That smallest cost happens in month $4$. Check: $f(4)=7$, while $f(3)=10$ and $f(5)=10$ are both larger ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: treats $7$ as the month-$0$ cost, but $f(0)=3(16)+7=55$.\n* Choice B: reads the positive leading coefficient $3$ as though the graph opened downward.\n* Choice C: swaps the roles of $4$ and $7$, reporting the input as the cost.\n\n**Test Day Takeaway:** In vertex form $k$ is the extreme output and $h$ is where it happens — the sign of $a$ decides which extreme.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-392",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The function $q$ is defined by $q(x) = a(x + 2)^2 + 9$, where $a$ is a constant. In the $xy$-plane, the graph of $y = q(x)$ has an $x$-intercept at $(1, 0)$. What is the value of $a$?",
    choices: [
      // distractor: uses $(x - 2)^2$, placing the vertex at $x = 2$
      { id: "A", text: "$-9$" },
      // distractor: divides by $3$ instead of $3^2$
      { id: "B", text: "$-3$" },
      { id: "C", text: "$-1$" },
      // distractor: drops the negative sign
      { id: "D", text: "$1$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** $q(1) = 0$ gives $a(1 + 2)^2 + 9 = 0$, so $9a = -9$ and $a = -1$.\n\n**The Full Solution:**\nStep 1: An $x$-intercept at $(1, 0)$ means $q(1) = 0$, so $a(1 + 2)^2 + 9 = 0$.\nStep 2: $(1 + 2)^2 = 9$, so the equation becomes $9a + 9 = 0$ and $9a = -9$.\nStep 3: $a = -1$. Check: $q(x) = -(x + 2)^2 + 9$ gives $q(1) = -9 + 9 = 0$, and the highest point is $q(-2) = 9$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9$): uses $(1 - 2)^2 = 1$, as if the squared term were $(x - 2)^2$.\n* Choice B ($-3$): divides $-9$ by the horizontal distance $3$ instead of by $3^2 = 9$.\n* Choice D ($1$): finds the right size but keeps the sign positive, which would give $q(1) = 18$, not $0$.\n\n**Test Day Takeaway:** An $x$-intercept is just a second condition in disguise — set the output to $0$ and solve for the remaining constant.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-393",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $y = 2(x - h)^2 - 18$ crosses the $x$-axis at $x = -9$ and $x = -3$, where $h$ is a constant. What is the value of $h$?",
    choices: [
      // distractor: adds the two intercepts instead of averaging them
      { id: "A", text: "$-12$" },
      { id: "B", text: "$-6$" },
      // distractor: reports the larger intercept
      { id: "C", text: "$-3$" },
      // distractor: flips the sign of $h$
      { id: "D", text: "$6$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The vertex sits midway between the intercepts, so $h = \\dfrac{-9 + (-3)}{2} = -6$.\n\n**The Full Solution:**\nStep 1: A parabola is symmetric about its vertical axis, and that axis is $x = h$ for $y = 2(x - h)^2 - 18$.\nStep 2: The axis passes through the midpoint of the two $x$-intercepts: $\\dfrac{-9 + (-3)}{2} = \\dfrac{-12}{2} = -6$.\nStep 3: $h = -6$. Check: $y = 2(x + 6)^2 - 18$ gives $2(9) - 18 = 0$ at $x = -9$ and $2(9) - 18 = 0$ at $x = -3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-12$): adds the intercepts but forgets to divide by $2$.\n* Choice C ($-3$): reports one of the intercepts rather than the value halfway between them.\n* Choice D ($6$): finds the correct distance but flips the sign, reading $(x - h)$ as $(x + h)$.\n\n**Test Day Takeaway:** The axis of symmetry is the AVERAGE of the two $x$-intercepts, and that average is exactly $h$ in vertex form.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-394",
    domain: "advanced-math",
    skills: ["vertex-form", "function-evaluation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The graph shown in the $xy$-plane is the parabola $y = a(x - h)^2 + k$, where $a$, $h$, and $k$ are constants. The vertex and one other point on the curve are marked. What is the value of $a + h + k$?",
    diagram: { type: "quadraticVertex", params: { vertex: [2, -6], a: 0.5, showPoints: [[6, 2]], showVertex: true } },
    choices: [
      // distractor: takes $h = -2$, flipping the sign of the vertex $x$-coordinate
      { id: "A", text: "$-\\dfrac{15}{2}$" },
      { id: "B", text: "$-\\dfrac{7}{2}$" },
      // distractor: divides by $6 - 2$ instead of its square
      { id: "C", text: "$-2$" },
      // distractor: takes $k = 6$, flipping the sign of the vertex $y$-coordinate
      { id: "D", text: "$\\dfrac{17}{2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Vertex $(2, -6)$ gives $h = 2$, $k = -6$; the point $(6, 2)$ gives $16a - 6 = 2$, so $a = \\dfrac{1}{2}$ and the sum is $-\\dfrac{7}{2}$.\n\n**The Full Solution:**\nStep 1: Read the vertex from the graph: $(2, -6)$. In $y = a(x - h)^2 + k$ that means $h = 2$ and $k = -6$.\nStep 2: The second marked point is $(6, 2)$. Substitute: $2 = a(6 - 2)^2 - 6 = 16a - 6$, so $16a = 8$ and $a = \\dfrac{1}{2}$.\nStep 3: $a + h + k = \\dfrac{1}{2} + 2 - 6 = -\\dfrac{7}{2}$. Check: $y = \\dfrac{1}{2}(x - 2)^2 - 6$ gives $y = -6$ at $x = 2$ and $y = 8 - 6 = 2$ at $x = 6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\dfrac{15}{2}$): takes $h = -2$; vertex form SUBTRACTS $h$, so a vertex at $x = 2$ gives $h = +2$.\n* Choice C ($-2$): divides $8$ by $6 - 2 = 4$ instead of by $(6 - 2)^2 = 16$, producing $a = 2$.\n* Choice D ($\\dfrac{17}{2}$): takes $k = 6$ instead of $-6$, reading the vertex height with the wrong sign.\n\n**Test Day Takeaway:** Read $h$ and $k$ straight off the vertex with their own signs, then use the second point only to solve for $a$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- vertex-form-maximum (4 → 10) ---
  {
    id: "bank-am-395",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of the quadratic function $g$ is shown, with its vertex marked. What is the maximum value of $g(x)$?",
    diagram: { type: "parabola", params: { vertex: { h: 4, k: 7 }, a: -1, xRange: [-4, 10], yRange: [-10, 10], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showVertex: true } },
    choices: [
      // distractor: reports the leading coefficient
      { id: "A", text: "$-1$" },
      // distractor: reports the $x$-coordinate of the vertex
      { id: "B", text: "$4$" },
      { id: "C", text: "$7$" },
      // distractor: adds the two vertex coordinates
      { id: "D", text: "$11$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** The parabola opens downward, so its highest point is the vertex $(4, 7)$; the maximum value is $7$.\n\n**The Full Solution:**\nStep 1: The graph opens downward, so $g$ has a maximum and it occurs at the vertex.\nStep 2: The marked vertex is at $(4, 7)$.\nStep 3: The MAXIMUM VALUE is the output there, the $y$-coordinate $7$; the $x$-coordinate $4$ tells you only where the maximum happens. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1$): reports the leading coefficient of the curve rather than a function value.\n* Choice B ($4$): reports where the maximum occurs instead of the maximum value itself.\n* Choice D ($11$): adds the two vertex coordinates, $4 + 7$.\n\n**Test Day Takeaway:** \"Maximum value\" always means the $y$-coordinate of the vertex; \"at what value of $x$\" asks for the other coordinate.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-396",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The function $P$ defined by $P(x)=-5(x-12)^2+900$ gives a game shop's daily profit, in dollars, from selling $x$ jigsaw puzzle boxes. Which statement best interprets the ordered pair $(12,900)$ in this context?",
    choices: [
      // distractor: treats 900 as P(0), which is 180
      { id: "A", text: "The daily profit is \\$900 when no jigsaw puzzle boxes are sold." },
      // distractor: reads 900 as a rate of change rather than a value
      { id: "B", text: "The daily profit rises by \\$900 for each additional box sold." },
      // distractor: swaps the two coordinates of the vertex
      { id: "C", text: "The greatest daily profit, \\$12, comes from selling $900$ boxes." },
      { id: "D", text: "The greatest daily profit, \\$900, comes from selling $12$ boxes." }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** With $a=-5<0$ the vertex $(12,900)$ is the highest point, so \\$900 is the greatest profit and it comes at $x=12$ boxes.\n\n**The Full Solution:**\nStep 1: The function is in vertex form $a(x-h)^2+k$ with $a=-5$, $h=12$, and $k=900$.\nStep 2: Because $a$ is negative, $-5(x-12)^2$ is never positive, so $P(x)$ is largest when $x=12$.\nStep 3: That largest value is $P(12)=900$ dollars. Check: $P(11)=895$ and $P(13)=895$, both under $900$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: treats $900$ as the profit at $x=0$, but $P(0)=-5(144)+900=180$.\n* Choice B: reads $900$ as a rate of change; a quadratic has no constant rate.\n* Choice C: swaps the coordinates, reporting the input as a dollar amount.\n\n**Test Day Takeaway:** In an ordered pair from vertex form the first number is the input that produces the extreme, and the second is the extreme itself.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-397",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The quadratic function $f$ satisfies the three input-output pairs listed in the table. What is the maximum value of $f(x)$?",
    diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["0", "1"], ["1", "10"], ["4", "1"]] } },
    choices: [
      // distractor: reports the repeated output value
      { id: "A", text: "$1$" },
      // distractor: reports the $x$-value of the vertex
      { id: "B", text: "$2$" },
      // distractor: assumes the largest listed output is the maximum
      { id: "C", text: "$10$" },
      { id: "D", text: "$13$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** $f(0) = f(4)$ puts the vertex at $x = 2$; writing $f(x) = a(x - 2)^2 + k$ and using two rows gives $a = -3$, $k = 13$.\n\n**The Full Solution:**\nStep 1: The outputs at $x = 0$ and $x = 4$ are equal, so by symmetry the axis of the parabola is $x = \\dfrac{0 + 4}{2} = 2$ and $f(x) = a(x - 2)^2 + k$.\nStep 2: Substitute two rows. From $x = 0$: $4a + k = 1$. From $x = 1$: $a + k = 10$.\nStep 3: Subtracting gives $3a = -9$, so $a = -3$ and $k = 13$. Since $a < 0$ the vertex is a maximum, so the maximum value is $13$. Check: $f(0) = -3(4) + 13 = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): reports the repeated output, which locates the axis but is not the peak.\n* Choice B ($2$): reports the $x$-value of the vertex instead of the value of $f$ there.\n* Choice C ($10$): assumes the largest number in the table must be the maximum; the vertex sits between the listed inputs.\n\n**Test Day Takeaway:** Two equal outputs pin the axis of symmetry halfway between them — the maximum lives there, usually at an $x$ the table never lists.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-398",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A framing shop sells picture frame mats in widths from $2$ to $16$ centimeters. The shop's daily revenue from the mats, in dollars, is modeled by $A(w)=-(w-9)^{2}+150$, where $w$ is the mat width, in centimeters. At what mat width, in centimeters, is the daily revenue greatest?",
    choices: [
      { id: "A", text: "$9$" },
      // distractor: reports 9 squared instead of 9
      { id: "B", text: "$81$" },
      // distractor: reports 150 - 9 instead of the width
      { id: "C", text: "$141$" },
      // distractor: reports the greatest revenue instead of the width
      { id: "D", text: "$150$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** $-(w-9)^2$ is largest when it is $0$, which happens at $w=9$.\n\n**The Full Solution:**\nStep 1: The squared term $-(w-9)^2$ is never positive.\nStep 2: It equals $0$ exactly when $w-9=0$, that is $w=9$.\nStep 3: So the revenue peaks at a width of $9$ centimeters. Check: $A(9)=150$, while $A(8)=149$ and $A(10)=149$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($81$): squares the $9$ from $(w-9)^2$ instead of reporting the width.\n* Choice C ($141$): computes $150-9$, mixing the two constants in vertex form.\n* Choice D ($150$): reports the greatest revenue instead of the width that produces it.\n\n**Test Day Takeaway:** Read the question's units: vertex form gives both the input $h$ and the output $k$, and only one of them answers a \"at what width\" prompt.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-399",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A mill's weekly output of wool blanket throws above its contract level is modeled by $f(x)=-3(x-b)^2+54$, where $b$ is a constant greater than $2$. If $f(2)=27$, what is the value of $b$?",
    choices: [
      // distractor: takes the root ruled out by the condition b > 2
      { id: "A", text: "$-1$" },
      // distractor: reports the absolute difference 2 - b = 3 instead of b
      { id: "B", text: "$3$" },
      { id: "C", text: "$5$" },
      // distractor: reports (2 - b)^2 = 9 instead of b
      { id: "D", text: "$9$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** $f(2)=27$ gives $-3(2-b)^2=-27$, so $(2-b)^2=9$ and $b=-1$ or $5$; $b>2$ leaves $5$.\n\n**The Full Solution:**\nStep 1: Substitute $x=2$: $-3(2-b)^2+54=27$, so $-3(2-b)^2=-27$.\nStep 2: Divide by $-3$: $(2-b)^2=9$, so $2-b=3$ or $2-b=-3$, giving $b=-1$ or $b=5$.\nStep 3: The condition $b>2$ selects $b=5$. Check: $f(x)=-3(x-5)^2+54$ gives $f(2)=-27+54=27$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1$): takes the root the condition $b>2$ rules out.\n* Choice B ($3$): reports $|2-b|=3$ rather than $b$ itself.\n* Choice D ($9$): reports $(2-b)^2=9$ without taking the square root.\n\n**Test Day Takeaway:** Working backwards from an output leaves a squared binomial — solve for both roots, then let the stated restriction choose.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-400",
    domain: "advanced-math",
    skills: ["converting-quadratic-forms"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The energy stored in a compressed-air cavern, in megawatt-hours, is modeled by $E(t)=-4t^2+48t+20$, where $t$ is the number of hours after charging begins. For which interval of $t$ is the stored energy greater than its value at $t=2$?",
    choices: [
      // distractor: uses the interval from the start of charging to the peak at t = 6
      { id: "A", text: "$0<t<6$" },
      { id: "B", text: "$2<t<10$" },
      // distractor: stops at the peak t = 6 instead of the second solution t = 10
      { id: "C", text: "$2<t<6$" },
      // distractor: mirrors the peak to t = 12 instead of solving the inequality
      { id: "D", text: "$6<t<12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** $E(2)=100$, and $E(t)>100$ reduces to $t^2-12t+20<0$, that is $(t-2)(t-10)<0$, so $2<t<10$.\n\n**The Full Solution:**\nStep 1: Compute the reference value: $E(2)=-16+96+20=100$.\nStep 2: Solve $-4t^2+48t+20>100$. Subtracting $100$ and dividing by $-4$ (which reverses the inequality) gives $t^2-12t+20<0$.\nStep 3: Factor: $(t-2)(t-10)<0$, which holds exactly for $2<t<10$. Check: $E(6)=164>100$, while $E(1)=64$ and $E(11)=64$ are both below $100$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0<t<6$): uses the stretch from the start of charging to the peak at $t=6$ instead of solving the inequality.\n* Choice C ($2<t<6$): stops at the peak $t=6$ rather than at the second solution $t=10$.\n* Choice D ($6<t<12$): mirrors the peak to $t=12$ instead of using the two values where $E$ equals $100$.\n\n**Test Day Takeaway:** A \"greater than the value at\" question is a quadratic inequality: the two boundary times are symmetric about the vertex.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- vieta-sum-product-of-roots (4 → 10) ---
  {
    id: "bank-am-401",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Two elevations, in meters relative to sea level, at which a modeled rock layer meets a fault plane are the solutions $p$ and $q$ of the equation $3x^2 + 21x + 30 = 0$. Which of the following statements about $p$ and $q$ is true?",
    choices: [
      { id: "A", text: "$p + q = -7$ and $pq = 10$" },
      // distractor: uses the constant term 30 as the product without dividing by the leading coefficient 3
      { id: "B", text: "$p + q = -7$ and $pq = 30$" },
      // distractor: drops the negative sign on the sum -b/a
      { id: "C", text: "$p + q = 7$ and $pq = 10$" },
      // distractor: reads b = 21 and c = 30 as the sum and product, skipping the division by a = 3
      { id: "D", text: "$p + q = 21$ and $pq = 30$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vieta Sum & Product of Roots**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** For $ax^2 + bx + c = 0$ the solutions sum to $-\\frac{b}{a} = -\\frac{21}{3} = -7$ and multiply to $\\frac{c}{a} = \\frac{30}{3} = 10$.\n\n**The Full Solution:**\nStep 1: Read off $a = 3$, $b = 21$, and $c = 30$ from $3x^2 + 21x + 30 = 0$.\nStep 2: The sum of the solutions is $-\\frac{b}{a} = -\\frac{21}{3} = -7$, and the product is $\\frac{c}{a} = \\frac{30}{3} = 10$.\nStep 3: So $p + q = -7$ and $pq = 10$. Check: dividing by $3$ gives $x^2 + 7x + 10 = 0$, which factors as $(x + 2)(x + 5) = 0$, so the elevations are $-2$ and $-5$; they add to $-7$ and multiply to $10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($pq = 30$): uses the constant term $30$ as the product without dividing by the leading coefficient $3$.\n* Choice C ($p + q = 7$): drops the negative sign in $-\\frac{b}{a}$.\n* Choice D ($p + q = 21$): reads $b$ and $c$ as the sum and product directly, skipping the division by $a = 3$.\n\n**Test Day Takeaway:** Sum and product of the solutions are $-\\frac{b}{a}$ and $\\frac{c}{a}$ — the leading coefficient divides both.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-402",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In a terrain model, two horizontal offsets, in meters, have a sum of $6$ and a product of $-16$. Which equation has exactly those two offsets as its solutions?",
    choices: [
      // distractor: keeps the sum's sign instead of negating it in the x-coefficient
      { id: "A", text: "$x^2 + 6x - 16 = 0$" },
      { id: "B", text: "$x^2 - 6x - 16 = 0$" },
      // distractor: negates neither the sum nor the product
      { id: "C", text: "$x^2 + 6x + 16 = 0$" },
      // distractor: negates the sum correctly but also flips the sign of the product
      { id: "D", text: "$x^2 - 6x + 16 = 0$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vieta Sum & Product of Roots**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** A monic quadratic with solution sum $S$ and product $P$ is $x^2 - Sx + P = 0$, so $x^2 - 6x - 16 = 0$.\n\n**The Full Solution:**\nStep 1: A quadratic with leading coefficient $1$ can be written $x^2 - Sx + P = 0$, where $S$ is the sum of the solutions and $P$ is their product.\nStep 2: Here $S = 6$ and $P = -16$, so the equation is $x^2 - 6x + (-16) = 0$, that is, $x^2 - 6x - 16 = 0$.\nStep 3: Check: $x^2 - 6x - 16 = (x - 8)(x + 2)$, so the offsets are $8$ and $-2$; they add to $6$ and multiply to $-16$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($x^2 + 6x - 16 = 0$): keeps the sum's sign in the $x$-coefficient; its solutions add to $-6$.\n* Choice C ($x^2 + 6x + 16 = 0$): negates neither the sum nor the product, and in fact has no real solutions.\n* Choice D ($x^2 - 6x + 16 = 0$): handles the sum correctly but flips the sign of the product, leaving no real solutions.\n\n**Test Day Takeaway:** Build a monic quadratic straight from its roots: subtract the sum, add the product.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-403",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The graph of $y = g(x)$ is shown in the $xy$-plane, where $g$ is a quadratic function whose two zeros are marked. The function is defined by $g(x) = ax^2 + bx + c$, where $a$, $b$, and $c$ are nonzero constants. What is the value of $\\dfrac{b}{a}$?",
    diagram: { type: "quadraticIntercepts", params: { intercepts: [-7, 3] } },
    choices: [
      // distractor: reports $\frac{c}{a}$, the product of the zeros
      { id: "A", text: "$-21$" },
      // distractor: reports the sum of the zeros without the sign change
      { id: "B", text: "$-4$" },
      { id: "C", text: "$4$" },
      // distractor: reports the product of the zeros with the sign dropped
      { id: "D", text: "$21$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vieta Sum & Product of Roots**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The zeros are $-7$ and $3$, so $-\\dfrac{b}{a} = -7 + 3 = -4$ and $\\dfrac{b}{a} = 4$.\n\n**The Full Solution:**\nStep 1: The marked points show the zeros of $g$ are $x = -7$ and $x = 3$.\nStep 2: For $ax^2 + bx + c = 0$ the sum of the solutions is $-\\dfrac{b}{a}$. Here that sum is $-7 + 3 = -4$.\nStep 3: So $-\\dfrac{b}{a} = -4$, giving $\\dfrac{b}{a} = 4$. Check with a concrete case: $a = 1$ gives $g(x) = (x + 7)(x - 3) = x^2 + 4x - 21$, and $\\dfrac{4}{1} = 4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-21$): reports $\\dfrac{c}{a}$, the PRODUCT of the zeros, instead of the ratio asked for.\n* Choice B ($-4$): reports the sum of the zeros itself, forgetting that the sum equals $-\\dfrac{b}{a}$, not $\\dfrac{b}{a}$.\n* Choice D ($21$): takes the product of the zeros and drops its negative sign.\n\n**Test Day Takeaway:** The sum and product rules work for any leading coefficient once you divide by it: sum $= -\\dfrac{b}{a}$ and product $= \\dfrac{c}{a}$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-404",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a crossover filter model, the two gain settings $m$ and $n$ are the two solutions of the equation $x^2 - kx + 18 = 0$, where $k$ is a constant and both settings are positive. Which of the following expressions is equivalent to $\\frac{1}{m} + \\frac{1}{n}$?",
    choices: [
      // distractor: inverts the ratio, dividing the product by the sum
      { id: "A", text: "$\\frac{18}{k}$" },
      // distractor: takes reciprocals of the sum and the product separately instead of combining the fractions
      { id: "B", text: "$\\frac{1}{k} + \\frac{1}{18}$" },
      // distractor: reads the sum as -k, double-counting the minus already written in the equation
      { id: "C", text: "$-\\frac{k}{18}$" },
      { id: "D", text: "$\\frac{k}{18}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Vieta Sum & Product of Roots**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Combine the fractions: $\\frac{1}{m} + \\frac{1}{n} = \\frac{m + n}{mn}$, and $m + n = k$ while $mn = 18$.\n\n**The Full Solution:**\nStep 1: For $x^2 - kx + 18 = 0$, the sum of the solutions is $-\\frac{-k}{1} = k$ and the product is $\\frac{18}{1} = 18$.\nStep 2: Write the requested expression over a common denominator: $\\frac{1}{m} + \\frac{1}{n} = \\frac{n + m}{mn}$.\nStep 3: Substituting gives $\\frac{k}{18}$. Check: if $k = 9$, the equation $x^2 - 9x + 18 = 0$ has solutions $3$ and $6$, and $\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2} = \\frac{9}{18}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{18}{k}$): inverts the ratio, dividing the product by the sum.\n* Choice B ($\\frac{1}{k} + \\frac{1}{18}$): takes the reciprocal of the sum and of the product separately instead of combining the two fractions.\n* Choice C ($-\\frac{k}{18}$): treats the sum as $-k$, double-counting the minus sign already written in the equation.\n\n**Test Day Takeaway:** Any symmetric combination of the roots — $\\frac{1}{m} + \\frac{1}{n}$, $m^2 + n^2$, $(m - n)^2$ — rewrites in terms of the sum and the product.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-405",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a lake-temperature model, the two depths, in meters, at which the modeled profile crosses a reference temperature are the two solutions of the equation $4x^2 - 28x + 33 = 0$. What is the product of the two depths?",
    choices: [
      // distractor: uses -c/a for the product instead of c/a
      { id: "A", text: "$-8.25$" },
      // distractor: reports the sum of the depths, 28/4
      { id: "B", text: "$7$" },
      { id: "C", text: "$8.25$" },
      // distractor: uses the constant term 33 without dividing by the leading coefficient 4
      { id: "D", text: "$33$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vieta Sum & Product of Roots**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The product of the solutions is $\\frac{c}{a} = \\frac{33}{4} = 8.25$.\n\n**The Full Solution:**\nStep 1: Identify $a = 4$, $b = -28$, and $c = 33$ in $4x^2 - 28x + 33 = 0$.\nStep 2: The product of the two solutions of a quadratic equation is $\\frac{c}{a}$, so the product of the depths is $\\frac{33}{4}$.\nStep 3: As a decimal, $\\frac{33}{4} = 8.25$. Check: the equation factors as $(2x - 3)(2x - 11) = 0$, giving depths $1.5$ and $5.5$ meters, and $1.5 \\times 5.5 = 8.25$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8.25$): uses $-\\frac{c}{a}$; the minus belongs to the sum formula, not the product formula.\n* Choice B ($7$): reports the sum $\\frac{28}{4} = 7$ rather than the product.\n* Choice D ($33$): uses the constant term alone, skipping the division by the leading coefficient $4$.\n\n**Test Day Takeaway:** Product of the roots is $\\frac{c}{a}$ and sum is $-\\frac{b}{a}$ — only the sum carries the minus sign.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-am-406",
    domain: "advanced-math",
    skills: ["quadratic-factoring"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A drill log meets a basalt contact at two depths, in meters, that are the solutions of $x^2 - 16x + k = 0$ for some constant $k$, and one of those depths is triple the other. What is the greater of the two depths, in meters?",
    choices: [
      // distractor: reports the shallower depth
      { id: "A", text: "$4$" },
      // distractor: halves the sum, treating the two depths as equal
      { id: "B", text: "$8$" },
      { id: "C", text: "$12$" },
      // distractor: reports the constant k, which is the product of the depths
      { id: "D", text: "$48$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vieta Sum & Product of Roots**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The depths sum to $16$, so writing them as $r$ and $3r$ gives $4r = 16$, $r = 4$, and the greater depth is $12$.\n\n**The Full Solution:**\nStep 1: For $x^2 - 16x + k = 0$, the two solutions add to $-\\frac{-16}{1} = 16$.\nStep 2: Name the shallower depth $r$; the other is $3r$, so $r + 3r = 16$, which gives $4r = 16$ and $r = 4$.\nStep 3: The greater depth is $3r = 12$ meters. Check: $4 + 12 = 16$ and $4 \\times 12 = 48$, so $k = 48$ and $x^2 - 16x + 48 = (x - 4)(x - 12)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reports the shallower depth instead of the greater one.\n* Choice B ($8$): halves the sum, which would be right only if the two depths were equal.\n* Choice D ($48$): reports $k$, the product of the two depths, rather than a depth.\n\n**Test Day Takeaway:** When roots are in a stated ratio, name them $r$ and $mr$ and feed that into the sum $-\\frac{b}{a}$ before touching the product.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vieta-sum-product-of-roots",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // === DIFFICULT-QUESTIONS PDF BATCH (2026-05-22) — 18 advanced-math items reskinned ===

  {
    id: "bank-am-407",
    domain: "advanced-math",
    skills: ["vertex-form", "discriminant-analysis"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A camera shutter admits light according to $g(x)=-2x^{2}+kx+11$, where $x$ is the blade offset in millimeters and $k$ is a positive constant, and the largest output this model produces is $19$. What is the value of $k$?",
    choices: [
      // distractor: takes the negative square root of 64 and ignores that k is positive
      { id: "A", text: "$-8$" },
      // distractor: uses k^2/2 instead of k^2/8 for the rise above 11, giving k^2 = 16
      { id: "B", text: "$4$" },
      { id: "C", text: "$8$" },
      // distractor: assumes the maximum occurs at x = 1 and solves -2 + k + 11 = 19
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Horizontal Tangent to a Parabola (Max/Min)**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The maximum of $-2x^{2}+kx+11$ is $11+\\frac{k^{2}}{8}$; setting that equal to 19 gives $k^{2}=64$ and $k=8$.\n\n**The Full Solution:**\nStep 1: The graph opens downward, so its greatest value occurs at $x=-\\frac{k}{2(-2)}=\\frac{k}{4}$.\nStep 2: Substituting gives $-2\\left(\\frac{k}{4}\\right)^{2}+k\\left(\\frac{k}{4}\\right)+11=-\\frac{k^{2}}{8}+\\frac{k^{2}}{4}+11=\\frac{k^{2}}{8}+11$.\nStep 3: Setting $\\frac{k^{2}}{8}+11=19$ gives $k^{2}=64$, and $k$ is positive, so $k=8$. Check: with $k=8$ the vertex is at $x=2$, where $-2(4)+16+11=19$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): solves $k^{2}=64$ but keeps the negative root, which the condition on $k$ rules out.\n* Choice B ($4$): uses $\\frac{k^{2}}{2}$ for the rise above 11, giving $k^{2}=16$.\n* Choice D ($10$): assumes the peak sits at $x=1$ and solves $-2+k+11=19$.\n\n**Test Day Takeaway:** For $y=ax^{2}+bx+c$ the extreme value is the output at $x=-\\frac{b}{2a}$ — build that expression in terms of the constant before solving.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-maximum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-408",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "exponential-y-intercept"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "An amplifier increases a signal's intensity by the same factor at every stage. The table gives the measured intensity $I$, in microwatts, after $n$ stages. Which equation gives the intensity after $n$ stages of amplification?",
    questionTable: { headers: ["Stages, $n$", "Intensity, $I$ (microwatts)"], rows: [["$0$", "$7$"], ["$2$", "$21$"], ["$4$", "$63$"], ["$6$", "$189$"]] },
    choices: [
      // distractor: treated 3 as the per-stage factor although the table steps by 2 stages
      { id: "A", text: "$I=7(3)^{n}$" },
      { id: "B", text: "$I=7(3)^{n/2}$" },
      // distractor: multiplied n by 2 instead of dividing by 2
      { id: "C", text: "$I=7(3)^{2n}$" },
      // distractor: used the second table entry 21 as the intensity at n = 0
      { id: "D", text: "$I=21(3)^{n/2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Build Exponential Growth Model**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The intensity triples every $2$ stages and starts at $7$, so the exponent must be $n/2$: $I=7(3)^{n/2}$.\n\n**The Full Solution:**\nStep 1: The table entries are $2$ stages apart, and $21/7=3$, $63/21=3$, $189/63=3$, so the factor is $3$ per $2$ stages.\nStep 2: An exponential model has the form $I=I_{0}(\\text{factor})^{n/\\text{gap}}$, with $I_{0}=7$ at $n=0$ and gap $2$.\nStep 3: So $I=7(3)^{n/2}$. Check at $n=6$: $7(3)^{3}=7\\cdot 27=189$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($I=7(3)^{n}$): treats $3$ as the per-stage factor, giving $7(3)^{6}=5{,}103$ at $n=6$.\n* Choice C ($I=7(3)^{2n}$): multiplies $n$ by the gap instead of dividing, giving $7(3)^{12}$ at $n=6$.\n* Choice D ($I=21(3)^{n/2}$): uses the second table entry $21$ as the intensity at $n=0$.\n\n**Test Day Takeaway:** When the table steps by more than one unit, divide the exponent by that step before trusting the growth factor.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-409",
    domain: "advanced-math",
    skills: ["discriminant-analysis", "identify-quadratic"],
    difficulty: "hard",
    type: "fill-in",
    question: "The daily energy cost, in dollars, of running a mixer at setting $x$ is modeled by $C(x)=2x^{2}-16x+35$. The horizontal line $y=k$ meets the graph of $y=C(x)$ at exactly one point. What is the value of $k$?",
    correctAnswer: "3",
    explanation: "**SAT Pattern: Discriminant Equals Zero (System of Quadratic and Horizontal Line)**\n\n**The correct answer is $3$.**\n\n**The Fast Way (~25s):** One intersection means the line passes through the vertex, and $C(x)=2(x-4)^{2}+3$, so $k=3$.\n\n**The Full Solution:**\nStep 1: Setting $C(x)=k$ gives $2x^{2}-16x+35-k=0$, which must have exactly one real solution.\nStep 2: Its discriminant must be $0$: $(-16)^{2}-4(2)(35-k)=256-280+8k=8k-24=0$.\nStep 3: So $k=3$. Check: $2x^{2}-16x+32=2(x-4)^{2}=0$ has the single solution $x=4$ ✓\n\n**Common Mistakes:**\n* $35$: used the constant term of $C(x)$, which is $C(0)$, not the minimum.\n* $4$: reported the setting $x=4$ at which the single intersection occurs.\n* $-3$: solved $8k+24=0$, mishandling the sign when distributing $-4(2)(35-k)$.\n\n**Test Day Takeaway:** A horizontal line meets a parabola once only at the vertex — either complete the square or set the discriminant to $0$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-analysis",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-410",
    domain: "advanced-math",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The function $f$ is defined by $f(x) = (x + 9)(x - 2)(x + 4)$. In the $xy$-plane, the graph of $y = f(x) - 6$ passes through the points $(-9, y_1)$, $(-4, y_2)$, and $(2, y_3)$. Which of the following must be true?",
    choices: [
      // distractor: forgets the vertical shift
      { id: "A", text: "$y_1 = y_2 = y_3 = 0$" },
      { id: "B", text: "$y_1 = y_2 = y_3 = -6$" },
      // distractor: shifts up instead of down
      { id: "C", text: "$y_1 = y_2 = y_3 = 6$" },
      // distractor: assumes the three outputs must differ
      { id: "D", text: "$y_1$, $y_2$, and $y_3$ are three distinct negative numbers" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Shift of a Polynomial**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Each listed input is a zero of $f$, so $f(x) = 0$ there and $y = 0 - 6 = -6$ at all three.\n\n**The Full Solution:**\nStep 1: $f$ is written in factored form, so it is zero exactly where one factor is zero: $x = -9$, $x = 2$, and $x = -4$.\nStep 2: The three given inputs are precisely those zeros, so $f(-9) = f(-4) = f(2) = 0$.\nStep 3: Subtracting $6$ lowers every output by $6$: $y_1 = y_2 = y_3 = 0 - 6 = -6$. Check one directly: $f(-4) = (5)(-6)(0) = 0$, so the shifted value is $-6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: evaluates $f$ at its zeros but forgets that the graph is $y = f(x) - 6$, not $y = f(x)$.\n* Choice C: shifts the graph up instead of down, treating $-6$ as $+6$.\n* Choice D: assumes three different inputs must give three different outputs; here all three are zeros, so the shifted values coincide.\n\n**Test Day Takeaway:** A vertical shift moves every point by the same amount, so inputs that shared an output before still share one after.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-shift",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-411",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "exponential-y-intercept"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Nesting pairs on a seabird island were counted every two years, giving the three totals in the table, and the counts follow the same pattern in the years between counts. Which function models the number of nesting pairs on the island $t$ years after the first count?",
    diagram: { type: "dataTable", params: { headers: ["Years after first count", "Nesting pairs"], rows: [["0", "1,250"], ["2", "800"], ["4", "512"]] } },
    choices: [
      // distractor: subtracts the two-year ratio from $1$ and uses $0.36$ as the multiplier
      { id: "A", text: "$f(t) = 1{,}250(0.36)^{t/2}$" },
      // distractor: uses the two-year multiplier $0.64$ as if it applied every single year
      { id: "B", text: "$f(t) = 1{,}250(0.64)^{t}$" },
      // distractor: doubles the exponent instead of taking the square root of the two-year multiplier
      { id: "C", text: "$f(t) = 1{,}250(0.8)^{2t}$" },
      { id: "D", text: "$f(t) = 1{,}250(0.8)^{t}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Exponential Decay — Standard Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** Every two years the count is multiplied by $\\frac{800}{1{,}250} = 0.64$, and $\\sqrt{0.64} = 0.8$ is the annual multiplier, so $f(t) = 1{,}250(0.8)^{t}$.\n\n**The Full Solution:**\nStep 1: The counts fall from $1{,}250$ to $800$ to $512$, and $\\frac{800}{1{,}250} = \\frac{512}{800} = 0.64$, so the data are exponential with a two-year multiplier of $0.64$.\nStep 2: If the annual multiplier is $b$, then two years give $b^{2} = 0.64$, so $b = 0.8$.\nStep 3: With $f(0) = 1{,}250$, the model is $f(t) = 1{,}250(0.8)^{t}$. Check: $f(2) = 1{,}250(0.64) = 800$ and $f(4) = 1{,}250(0.4096) = 512$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1{,}250(0.36)^{t/2}$): reads the $36\\%$ drop over two years as the multiplier itself; at $t = 2$ it gives $450$, not $800$.\n* Choice B ($1{,}250(0.64)^{t}$): applies the two-year multiplier once per year; at $t = 2$ it gives $512$, the four-year value.\n* Choice C ($1{,}250(0.8)^{2t}$): squares the exponent's rate instead of halving it, giving $512$ at $t = 2$.\n\n**Test Day Takeaway:** When a table steps by two units, the listed ratio is a SQUARED multiplier — take its square root before writing a per-unit model.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exponential-decay-expression",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-412",
    domain: "advanced-math",
    skills: ["exponent-laws", "zero-negative-exponents"],
    difficulty: "hard",
    type: "fill-in",
    question: "An interferometer's baseline-correction model contains the factor $\\dfrac{\\sqrt[4]{x^{7}}}{x^{1/2}\\sqrt[3]{x}}$, where $x>0$ is the fringe spacing in micrometers. That factor is equal to $x^{k}$ for some constant $k$. What is the value of $k$?",
    correctAnswer: "11/12",
    explanation: "**SAT Pattern: Radical with Rational Exponents**\n\n**The correct answer is $\\frac{11}{12}$.**\n\n**The Fast Way (~45s):** Rewrite every piece as a power of $x$: $\\frac{x^{7/4}}{x^{1/2}\\cdot x^{1/3}}=x^{7/4-1/2-1/3}=x^{11/12}$.\n\n**The Full Solution:**\n\nStep 1: Convert the radicals: $\\sqrt[4]{x^{7}}=x^{7/4}$ and $\\sqrt[3]{x}=x^{1/3}$.\n\nStep 2: Combine the two factors in the denominator by adding exponents: $x^{1/2}\\cdot x^{1/3}=x^{5/6}$.\n\nStep 3: Divide by subtracting exponents: $k=\\frac{7}{4}-\\frac{5}{6}=\\frac{21}{12}-\\frac{10}{12}=\\frac{11}{12}$. Check: $\\frac{11}{12}+\\frac{5}{6}=\\frac{11}{12}+\\frac{10}{12}=\\frac{21}{12}=\\frac{7}{4}$, the numerator's exponent.\n\n**Common Mistakes:**\n\n* Adding all three exponents instead of subtracting the denominator's gives $\\frac{7}{4}+\\frac{1}{2}+\\frac{1}{3}=\\frac{31}{12}$.\n* Reading $\\sqrt[4]{x^{7}}$ as $x^{4/7}$ gives $\\frac{4}{7}-\\frac{1}{2}-\\frac{1}{3}=-\\frac{11}{42}$.\n\n**Test Day Takeaway:** Turn every radical into a fractional exponent before touching the fraction; the index becomes the denominator, never the numerator.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "exponent-rules-with-radicals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-413",
    domain: "advanced-math",
    skills: ["vertex-form", "parabola-direction"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The deviation of a lithium battery pack's temperature from its target, in degrees Celsius, is a quadratic function $T$ of $t$, the number of hours after 9 a.m. The deviation reaches its greatest value, $12$, at $t=3$, and $T(7)=-4$. What is the value of $T(-1)$?",
    choices: [
      // distractor: negates the maximum value instead of using symmetry
      { id: "A", text: "$-12$" },
      { id: "B", text: "$-4$" },
      // distractor: drops the negative sign from the given value T(7) = -4
      { id: "C", text: "$4$" },
      // distractor: reports the maximum value, which occurs at t = 3 rather than t = -1
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertex + Sign-of-Coefficient Reasoning**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The maximum at $t=3$ puts the axis of symmetry there, and $-1$ and $7$ are both $4$ units from $3$, so $T(-1)=T(7)=-4$.\n\n**The Full Solution:**\nStep 1: A quadratic with a greatest value opens downward, and its axis of symmetry passes through the maximum, so the axis is $t=3$.\nStep 2: Inputs equally far from the axis give equal outputs: $7-3=4$ and $3-(-1)=4$.\nStep 3: Therefore $T(-1)=T(7)=-4$. Check: $T(t)=-(t-3)^2+12$ fits both facts, and $T(-1)=-16+12=-4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-12$): negates the maximum value instead of using symmetry.\n* Choice C ($4$): drops the negative sign from the given output $T(7)=-4$.\n* Choice D ($12$): reports the maximum value, which occurs at $t=3$, not at $t=-1$.\n\n**Test Day Takeaway:** A stated maximum hands you the axis of symmetry for free — pair inputs across it instead of solving for the coefficients.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-application",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-414",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "exponential-y-intercept"],
    difficulty: "hard",
    type: "fill-in",
    question: "A snowmelt-runoff model has the form $f(x) = 5b^{\\,x-2}$, where $x$ is the number of days since the thaw began and $b$ is a positive constant. Measurements at the valley gauge give $f(5) = 320$ cubic meters per second. What is the value of $b$?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Exponential Shifted Form — Recover Base**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~30s):** $f(5) = 5b^{3} = 320$, so $b^{3} = 64$ and $b = 4$.\n\n**The Full Solution:**\nStep 1: Substitute $x = 5$: the exponent is $5 - 2 = 3$, so $f(5) = 5b^{3}$.\nStep 2: Set that equal to $320$ and divide by $5$: $b^{3} = 64$.\nStep 3: Taking the cube root gives $b = 4$. Check: $f(5) = 5(4)^{3} = 5(64) = 320$ ✓\n\n**Common Mistakes:**\n* $64$ — stopping at $b^{3} = 64$ and reporting the cube rather than the base.\n* $8$ — taking a square root of $64$ instead of a cube root, ignoring the exponent $5 - 2 = 3$.\n\n**Test Day Takeaway:** Evaluate the shifted exponent FIRST; the shift is what decides whether you undo a square, a cube, or something else.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-415",
    domain: "advanced-math",
    skills: ["finding-roots-factoring", "roots-from-factors"],
    difficulty: "hard",
    type: "fill-in",
    question: "The function $q$ defined by $q(t)=t^2-11t+24$ models a reference desk's questions per hour above its overnight rate, where $t$ is the number of hours after opening. The function $w$ is defined by $w(t)=q(2t-5)$. What is the sum of the solutions to $w(t)=0$?",
    correctAnswer: "10.5",
    explanation: "**SAT Pattern: Sum of Roots via Input Shift**\n\n**The correct answer is $10.5$.**\n\n**The Fast Way (~30s):** The zeros of $q$ are $3$ and $8$, so $2t-5=3$ or $2t-5=8$; solving gives $t=4$ and $t=6.5$, whose sum is $10.5$.\n\n**The Full Solution:**\nStep 1: Factor $q(t)=t^2-11t+24=(t-3)(t-8)$, so $q$ is zero at $3$ and $8$.\nStep 2: $w(t)=0$ means $q(2t-5)=0$, so the inner expression must equal $3$ or $8$: $2t-5=3$ gives $t=4$, and $2t-5=8$ gives $t=6.5$.\nStep 3: Add: $4+6.5=10.5$. Check: $w(4)=q(3)=0$ and $w(6.5)=q(8)=0$ ✓\n\n**Common Mistakes:**\n* $11$: reports the sum of the zeros of $q$ and never undoes the inner map $2t-5$.\n* $5.5$: divides the sum $11$ by $2$ but never adds back the $5$ from $2t-5$.\n* $21$: adds $5$ to each zero of $q$ but forgets to divide each result by $2$.\n\n**Test Day Takeaway:** When the input is replaced by a linear expression, solve that expression equal to each original zero — the zeros move, and so does their sum.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "roots-from-factors",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-416",
    domain: "advanced-math",
    skills: ["percent-change", "percent-word-problems"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the number of loaded railcars dispatched from three rail yards in 2024. At each yard the 2024 total was $24\\%$ greater than that yard's 2023 total. How many loaded railcars did Yard B dispatch in 2023?",
    diagram: { type: "dataTable", params: { headers: ["Rail yard", "Loaded railcars in 2024"], rows: [["A", "2,604"], ["B", "3,038"], ["C", "3,906"]] } },
    choices: [
      // distractor: takes 24% of the 2024 total: 3,038 times 0.24 = 729.12, about 729
      { id: "A", text: "$729$" },
      // distractor: subtracts 24% of the 2024 total: 3,038 times 0.76 = 2,308.88, about 2,309
      { id: "B", text: "$2{,}309$" },
      { id: "C", text: "$2{,}450$" },
      // distractor: multiplies by 1.24 instead of dividing: 3,038 times 1.24 = 3,767.12, about 3,767
      { id: "D", text: "$3{,}767$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Reverse Percent Increase**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The 2024 total is $1.24$ times the 2023 total, so the 2023 total is $3{,}038\\div1.24=2{,}450$.\n\n**The Full Solution:**\n\nStep 1: Let $n$ be Yard B's 2023 total. A $24\\%$ increase multiplies it by $1.24$, so $1.24n=3{,}038$.\n\nStep 2: Solve for $n$: $n=\\frac{3{,}038}{1.24}$.\n\nStep 3: Divide: $n=2{,}450$. Check: $2{,}450\\times0.24=588$, and $2{,}450+588=3{,}038$, the table entry for Yard B.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($729$): computes $24\\%$ of the 2024 total, $3{,}038\\times0.24=729.12$.\n* Choice B ($2{,}309$): subtracts $24\\%$ of the 2024 total, $3{,}038\\times0.76=2{,}308.88$.\n* Choice D ($3{,}767$): multiplies by $1.24$ instead of dividing, $3{,}038\\times1.24=3{,}767.12$.\n\n**Test Day Takeaway:** An increase of $p\\%$ is a multiplication by $1+\\frac{p}{100}$; to undo it, divide by that factor rather than subtracting the percent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "reverse-percent",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-417",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "exponent-laws"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the number of catalogued near-Earth asteroids $N$ recorded by a sky survey $t$ years after the survey began, and $N$ increases exponentially with $t$. Based on this model, the number of catalogued asteroids increases by $50\\%$ every how many months?",
    diagram: { type: "dataTable", params: { headers: ["Years t", "Catalogued asteroids N"], rows: [["0", "1,240"], ["2", "1,860"], ["4", "2,790"], ["6", "4,185"]] } },
    choices: [
      // distractor: divides the 12 months of a year by the 2-year row spacing instead of multiplying, giving 6
      { id: "A", text: "$6$" },
      // distractor: treats consecutive rows as one year apart and reports 12 months
      { id: "B", text: "$12$" },
      { id: "C", text: "$24$" },
      // distractor: multiplies the growth factor 1.5 by 24 months to get 36
      { id: "D", text: "$36$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Period of Exponential Growth — Months Interpretation**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Consecutive rows are $2$ years apart and each count is $1.5$ times the one above it, so the total grows by $50\\%$ every $2$ years, which is $24$ months.\n\n**The Full Solution:**\n\nStep 1: Divide consecutive counts: $1{,}860\\div1{,}240=1.5$, $2{,}790\\div1{,}860=1.5$, and $4{,}185\\div2{,}790=1.5$. The same factor appears each time, confirming exponential growth.\n\nStep 2: A factor of $1.5$ is an increase of $50\\%$, and each factor spans the $2$-year gap between consecutive rows.\n\nStep 3: Convert the period to months: $2\\times12=24$ months. Check: starting from $2{,}790$ and applying one more $50\\%$ increase gives $1.5\\times2{,}790=4{,}185$, exactly the entry $24$ months later.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($6$): divides $12$ by the $2$-year spacing instead of multiplying, giving $6$ months.\n* Choice B ($12$): reads consecutive rows as one year apart and reports $12$ months.\n* Choice D ($36$): multiplies the growth factor $1.5$ by $24$ months to get $36$.\n\n**Test Day Takeaway:** Get the growth factor from consecutive rows first, then convert the spacing between those rows into the units the question asks for.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-418",
    domain: "advanced-math",
    skills: ["vertex-form", "converting-quadratic-forms"],
    difficulty: "hard",
    type: "fill-in",
    question: "A vendor's price for climbing chalk blocks, in cents above its yearly average, is modeled by $f(x)=-3(x+5)^2+11$, where $x$ is the month index. Writing $f(x)=ax^2+bx+c$, what is the value of $b-c$?",
    correctAnswer: "34",
    explanation: "**SAT Pattern: Vertex Form to Standard Form — Recover Coefficients**\n\n**The correct answer is $34$.**\n\n**The Fast Way (~40s):** Expanding gives $-3x^2-30x-64$, so $b=-30$, $c=-64$, and $b-c=-30+64=34$.\n\n**The Full Solution:**\nStep 1: Expand the square: $(x+5)^2=x^2+10x+25$.\nStep 2: Multiply by $-3$ and add $11$: $-3x^2-30x-75+11=-3x^2-30x-64$.\nStep 3: So $b=-30$ and $c=-64$, and $b-c=-30-(-64)=34$. Check: $f(0)=-3(25)+11=-64$, which matches $c$ ✓\n\n**Common Mistakes:**\n* $45$: uses $c=-75$, forgetting to add the $+11$ before reading the constant term.\n* $-94$: computes $b+c$ instead of $b-c$.\n* $54$: forgets to distribute the $-3$ across the $10x$ term, using $b=-10$.\n\n**Test Day Takeaway:** Expand fully before reading coefficients, and mind that subtracting a negative constant adds.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertex-form-to-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-419",
    domain: "advanced-math",
    skills: ["exponential-growth-decay", "exponential-y-intercept"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "When a video was first posted, it had $125$ saves. An exponential model estimates that at the end of each hour after it was posted, the number of saves was $120\\%$ more than the number at the end of the previous hour. Which equation gives the estimated number of saves, $S$, $h$ hours after the video was posted?",
    choices: [
      // distractor: uses only the decimal part of the percent
      { id: "A", text: "$S = 125(0.2)^h$" },
      // distractor: reads "120% more" as a factor of 1.2
      { id: "B", text: "$S = 125(1.2)^h$" },
      { id: "C", text: "$S = 125(2.2)^h$" },
      // distractor: adds the first hour's increase forever
      { id: "D", text: "$S = 125 + 150h$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Build Exponential Growth — \"$p\\%$ More\" Trap**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** \"$120\\%$ more\" makes each hour $220\\%$ of the hour before, a factor of $2.2$, so $S = 125(2.2)^h$.\n\n**The Full Solution:**\nStep 1: The starting count is $125$ at $h = 0$, so the model has the form $S = 125(b)^h$.\nStep 2: Being $120\\%$ MORE than the previous hour means the new count is $100\\% + 120\\% = 220\\%$ of the old one, so $b = 2.2$.\nStep 3: $S = 125(2.2)^h$. Check: after one hour, $125(2.2) = 275$, and $275 - 125 = 150$, which is $120\\%$ of $125$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: uses $0.2$, the decimal left after discarding the $100\\%$, which would shrink the count each hour.\n* Choice B: reads \"$120\\%$ more\" as a factor of $1.2$; that factor describes a $20\\%$ increase, not a $120\\%$ one.\n* Choice D: adds the first hour's increase of $150$ every hour, which is linear rather than exponential.\n\n**Test Day Takeaway:** \"$p\\%$ MORE than\" always gives the factor $1 + \\dfrac{p}{100}$ — when $p$ exceeds $100$, that factor is greater than $2$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "build-exponential-model",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-420",
    domain: "advanced-math",
    skills: ["exponent-laws", "exponential-growth-decay"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The table gives the number of electric delivery vans $N$ in a courier fleet $t$ years after the fleet was introduced, and $N$ grows exponentially with $t$. Which of the following is closest to the percent increase in $N$ every $3$ months?",
    diagram: { type: "dataTable", params: { headers: ["Years t", "Vans N"], rows: [["0", "500"], ["1", "600"], ["2", "720"], ["3", "864"]] } },
    choices: [
      { id: "A", text: "$4.7\\%$" },
      // distractor: divides the annual 20% by the 4 quarters in a year instead of taking a fourth root
      { id: "B", text: "$5\\%$" },
      // distractor: reports the annual increase of 20% as though it were the quarterly increase
      { id: "C", text: "$20\\%$" },
      // distractor: multiplies the annual 20% by the 3 months in a quarter, giving 60%
      { id: "D", text: "$60\\%$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rewriting Exponential Form — Equivalent Rate**\n\n**Choice A is correct.**\n\n**The Fast Way (~50s):** The fleet grows by a factor of $1.2$ per year, and $3$ months is a quarter of a year, so the quarterly factor is $1.2^{1/4}\\approx1.047$, an increase of about $4.7\\%$.\n\n**The Full Solution:**\n\nStep 1: Divide consecutive entries: $\\frac{600}{500}=1.2$, $\\frac{720}{600}=1.2$, and $\\frac{864}{720}=1.2$, so $N=500(1.2)^{t}$ with $t$ in years.\n\nStep 2: Three months is $\\frac{1}{4}$ of a year, so rewrite the model as $N=500\\left(1.2^{1/4}\\right)^{4t}$, where the base $1.2^{1/4}$ is the quarterly factor.\n\nStep 3: Compute $1.2^{1/4}\\approx1.0466$, an increase of about $4.7\\%$ per quarter. Check: raising $1.0466$ to the fourth power returns about $1.200$, the annual factor.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($5\\%$): divides the annual $20\\%$ by $4$ instead of taking a fourth root.\n* Choice C ($20\\%$): reports the annual increase as if it were quarterly.\n* Choice D ($60\\%$): multiplies the annual $20\\%$ by the $3$ months in a quarter.\n\n**Test Day Takeaway:** Changing the time unit of an exponential model takes a root of the growth factor, never a division of the percent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "interpret-exponential-parameters",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-421",
    domain: "advanced-math",
    skills: ["discriminant-analysis", "identify-quadratic"],
    difficulty: "hard",
    type: "fill-in",
    question: "A funicular's brake curve is calibrated with the equation $kx^{2}+(k+8)x+9=0$, where $k$ is a positive constant. Exactly two positive values of $k$ give the equation a repeated real solution. What is the greater of those values?",
    correctAnswer: "16",
    explanation: "**SAT Pattern: Quadratic Formula — Discriminant Recovery**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~45s):** A repeated solution means $(k+8)^{2}-4(k)(9)=0$, which simplifies to $k^{2}-20k+64=0$, so $k=4$ or $k=16$; the greater is $16$.\n\n**The Full Solution:**\n\nStep 1: With $a=k$, $b=k+8$, and $c=9$, the discriminant is $(k+8)^{2}-4(k)(9)$.\n\nStep 2: Expand and collect: $k^{2}+16k+64-36k=k^{2}-20k+64$.\n\nStep 3: Set the discriminant to zero and factor: $k^{2}-20k+64=(k-4)(k-16)=0$, so $k=4$ or $k=16$, and the greater value is $16$. Check: at $k=16$ the equation is $16x^{2}+24x+9=0$, which is $(4x+3)^{2}=0$ and has the single solution $x=-\\frac{3}{4}$.\n\n**Common Mistakes:**\n\n* Reporting $4$, the smaller of the two values that make the discriminant zero.\n* Using $b=k$ instead of $b=k+8$ gives $k^{2}-36k=0$ and the wrong value $36$.\n\n**Test Day Takeaway:** When the same letter sits in more than one coefficient, the discriminant becomes its own quadratic — expand fully before setting it to zero.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "discriminant-compute",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-422",
    domain: "advanced-math",
    skills: ["simplifying-rational-expressions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A reefer container's defrost model requires $\\sqrt{x+b}=x-6$, where $b$ is a constant and $x$ is the cabinet temperature in degrees Celsius. For which value of $b$ does the model have two distinct real solutions?",
    choices: [
      // distractor: squaring gives x squared minus 13x plus 44 = 0, whose discriminant -7 is negative, so there are no real solutions at all
      { id: "A", text: "$-8$" },
      { id: "B", text: "$-6$" },
      // distractor: squaring gives solutions 9 and 4, but 4 makes x - 6 negative and is extraneous, leaving one solution
      { id: "C", text: "$0$" },
      // distractor: squaring gives solutions 11 and 2, and 2 is extraneous, leaving one solution
      { id: "D", text: "$14$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Radical Equation — Extraneous Filter**\n\n**Choice B is correct.**\n\n**The Fast Way (~60s):** Squaring gives $x^{2}-13x+(36-b)=0$, and a solution counts only when $x\\ge6$; with $b=-6$ the roots are $7$ and $6$, and both pass.\n\n**The Full Solution:**\n\nStep 1: Squaring $\\sqrt{x+b}=x-6$ gives $x+b=x^{2}-12x+36$, so $x^{2}-13x+(36-b)=0$.\n\nStep 2: Because the left side of the original equation is never negative, a root counts only if $x-6\\ge0$, that is $x\\ge6$.\n\nStep 3: With $b=-6$ the quadratic is $x^{2}-13x+42=(x-6)(x-7)$, giving $x=6$ and $x=7$, both at least $6$. Check: $\\sqrt{6-6}=0=6-6$ and $\\sqrt{7-6}=1=7-6$, so both are genuine solutions.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-8$): the quadratic becomes $x^{2}-13x+44=0$, whose discriminant is $169-176=-7$, so there are no real solutions.\n* Choice C ($0$): the roots are $9$ and $4$, but $x=4$ makes $x-6=-2$ and is extraneous, leaving one solution.\n* Choice D ($14$): the roots are $11$ and $2$, and $x=2$ is extraneous for the same reason, leaving one solution.\n\n**Test Day Takeaway:** Squaring can only add solutions, never lose them, so every root has to be tested against the sign the original equation forces.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rational-equation-with-extraneous-solution",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-423",
    domain: "advanced-math",
    skills: ["finding-roots-factoring", "roots-from-factors"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A javelin-flight study uses the expression $x^2 + bx - 24$, where $x$ is a release angle in degrees and the integer $b$ is chosen so that the expression is a product of two binomials with integer coefficients. What is the greatest possible value of $b$?",
    choices: [
      // distractor: stops at the pair $6$ and $-4$, a legal factorization but far from the largest sum
      { id: "A", text: "$2$" },
      // distractor: stops at the pair $8$ and $-3$, again legal but not maximal
      { id: "B", text: "$5$" },
      // distractor: stops at the pair $12$ and $-2$, one step short of the extreme pair
      { id: "C", text: "$10$" },
      { id: "D", text: "$23$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Factor with Parameter — Integer Constraint**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** $b$ is the sum of a factor pair of $-24$, and the sum is largest when the pair is farthest apart: $24 + (-1) = 23$.\n\n**The Full Solution:**\nStep 1: If $x^2 + bx - 24 = (x + p)(x + q)$ with integers $p$ and $q$, then $pq = -24$ and $p + q = b$.\nStep 2: The integer pairs with product $-24$ are $(1, -24)$, $(2, -12)$, $(3, -8)$, $(4, -6)$ and their reverses, giving sums $-23$, $-10$, $-5$, $-2$, $2$, $5$, $10$, $23$.\nStep 3: The greatest of those sums is $23$. Check: $(x + 24)(x - 1) = x^2 + 23x - 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): comes from $(x + 6)(x - 4)$, a real factorization but a small sum.\n* Choice B ($5$): comes from $(x + 8)(x - 3)$.\n* Choice C ($10$): comes from $(x + 12)(x - 2)$, the second-largest sum.\n\n**Test Day Takeaway:** For a negative constant term, the widest factor pair — the one using $1$ — produces the extreme values of the middle coefficient.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "polynomial-remainder-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-424",
    domain: "advanced-math",
    skills: ["vertex-form", "finding-function-from-conditions"],
    difficulty: "hard",
    type: "fill-in",
    question: "The graph shown models the height above the deck, in inches, of the water stream from a fountain nozzle at a horizontal distance of $x$ inches from the nozzle. The stream reaches its greatest height, $45$ inches, at $x = 20$, and it meets the deck at $x = 50$. What height above the deck, in inches, does the model give at $x = 8$?",
    diagram: { type: "parabola", params: { vertex: { h: 20, k: 45 }, a: -0.05, xRange: [0, 50], yRange: [0, 50], xTickInterval: 10, yTickInterval: 10, gridInterval: 5, showVertex: true } },
    correctAnswer: "37.8",
    explanation: "**SAT Pattern: Quadratic Model from Vertex + Zero**\n\n**The correct answer is $37.8$.**\n\n**The Fast Way (~30s):** Vertex form gives $h(x) = a(x - 20)^2 + 45$; the deck crossing $h(50) = 0$ forces $a = -0.05$, so $h(8) = -0.05(144) + 45 = 37.8$.\n\n**The Full Solution:**\nStep 1: The greatest height occurs at $x = 20$, so the vertex is $(20, 45)$ and $h(x) = a(x - 20)^2 + 45$ for some constant $a$.\nStep 2: The stream meets the deck at $x = 50$, so $h(50) = 0$: $a(50 - 20)^2 + 45 = 0$, which gives $900a = -45$ and $a = -0.05$.\nStep 3: Evaluate at $x = 8$: $h(8) = -0.05(8 - 20)^2 + 45 = -0.05(144) + 45 = -7.2 + 45 = 37.8$ inches. Check with symmetry: $x = 8$ is $12$ units left of the vertex and $x = 32$ is $12$ units right of it, and $h(32) = -0.05(144) + 45 = 37.8$ as well. $\\checkmark$\n\n**Common Mistakes:** Dividing by the horizontal distance instead of its square, $a = -\\dfrac{45}{30} = -1.5$, which gives $h(8) = -1.5(144) + 45 = -171$, a height below the deck. Multiplying $a$ by $12$ rather than by $12^2$, which gives $-0.05(12) + 45 = 44.4$. Answering $45$, the greatest height, instead of the height at $x = 8$.\n\n**Test Day Takeaway:** Vertex plus one more point pins a quadratic model completely. Write $a(x - h)^2 + k$ first, solve for $a$ with the extra point, and square the horizontal difference before multiplying.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "vertex-form-from-two-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-am-425",
    domain: "advanced-math",
    skills: ["roots-from-factors", "vertex-formula"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The graph shows $y=g(x)$, where the quadratic function $g$ models a docking radar's range error, in centimeters, at approach angle $x$ degrees. Which of the following must be true?\n\nI. $x+5$ is a factor of $g(x)$.\nII. $g(x)$ decreases as $x$ increases for $x<-2$.\nIII. The maximum value of $g$ is $-9$.",
    diagram: { type: "parabola", params: { vertex: { h: -2, k: -9 }, a: 1, xRange: [-6, 2], yRange: [-10, 8], xTickInterval: 1, yTickInterval: 2, gridInterval: 1, showVertex: false } },
    choices: [
      // distractor: accepts the factor from the intercept at x = -5 but reads the branch left of the vertex as rising, rejecting II
      { id: "A", text: "I only" },
      { id: "B", text: "I and II only" },
      // distractor: accepts III by reading the lowest point -9 as a maximum, and drops I after missing the intercept at x = -5
      { id: "C", text: "II and III only" },
      // distractor: accepts all three, including the false claim that the upward-opening parabola has a maximum of -9
      { id: "D", text: "I, II, and III" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Quadratic Must-Be-True Statements**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** The curve crosses the $x$-axis at $-5$ and $1$ and turns upward at $(-2,-9)$, so I and II hold while III names a minimum as a maximum.\n\n**The Full Solution:**\n\nStep 1: Statement I. The graph meets the $x$-axis at $x=-5$, so $g(-5)=0$ and $x-(-5)=x+5$ is a factor. I is true.\n\nStep 2: Statement II. The turning point sits at $x=-2$ and the parabola opens upward, so on the whole interval $x<-2$ the curve falls as $x$ increases. II is true.\n\nStep 3: Statement III. An upward-opening parabola has no maximum; $-9$ is the smallest value of $g$, not the largest. III is false, so exactly I and II must be true. Check: reading $x=-6$ and $x=2$ off the graph gives $g=7$ at both, values larger than $-9$, so $-9$ cannot be a maximum.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: keeps I but rejects II by reading the left branch as rising instead of falling.\n* Choice C: keeps the false statement III by calling the lowest point a maximum, and overlooks the intercept at $x=-5$ that makes I true.\n* Choice D: accepts every statement, including the claim that an upward-opening parabola has a maximum.\n\n**Test Day Takeaway:** On a must-be-true graph item, test each statement against a specific feature — an intercept, the turning point, the direction of opening — rather than against the picture as a whole.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "roman-numeral-must-be-true",
    sourceRef: "pilot-m3-roman-quadratic",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-08-13"
  }
];
