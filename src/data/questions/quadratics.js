// Practice questions for Quadratics module
// Questions are organized by SECTION (question type)

export const quadraticsQuestions = {
  // Section: Overview
  "Overview": [
    {
      id: 1,
      difficulty: "easy",
      question: "Each of the following defines a function $f$ of the variable $x$. For which definition is $f$ a quadratic function?",
      choices: [
        // distractor: degree 1
        { id: "A", text: "$f(x) = 5x - 9$" },
        // distractor: degree 3
        { id: "B", text: "$f(x) = 4x^3 - x$" },
        { id: "C", text: "$f(x) = 7 - 2x^2$" },
        // distractor: variable in the denominator gives exponent -2
        { id: "D", text: "$f(x) = \\dfrac{6}{x^2}$" }
      ],
      correctAnswer: "C",
      hint: "Look for a highest power of exactly $2$, with the variable in the numerator.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** Only $7 - 2x^2$ has a highest power of $2$ with a nonzero coefficient.\n\n**The Full Solution:**\nStep 1: A quadratic function can be written as $f(x) = ax^2 + bx + c$ with $a \\neq 0$.\nStep 2: Rewriting choice C in that order gives $f(x) = -2x^2 + 0x + 7$, so $a = -2$, $b = 0$, and $c = 7$.\nStep 3: Since $a \\neq 0$ and no higher power appears, $f$ is quadratic. Check the shape: its graph is a parabola opening downward. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: the highest power of $x$ is $1$, so this is a linear function.\n* Choice B: the highest power is $3$, making this a cubic function even though a lower-degree term is present.\n* Choice D: the variable sits in the denominator, so the exponent is $-2$; this is a rational function, not a quadratic one.\n\n**Test Day Takeaway:** Degree is decided by the HIGHEST power of the variable, and a variable in a denominator carries a negative exponent.",
      skills: ["identify-quadratic"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The quadratic function $g$ is defined by $g(x) = 9 - 5x + 6x^2$. When $g(x)$ is written in the form $ax^2 + bx + c$, what is the value of $b$?",
      choices: [
        { id: "A", text: "$-5$" },
        // distractor: drops the sign
        { id: "B", text: "$5$" },
        // distractor: reports a
        { id: "C", text: "$6$" },
        // distractor: reports c
        { id: "D", text: "$9$" }
      ],
      correctAnswer: "A",
      hint: "Reorder the terms by descending power first, and carry each sign with its coefficient.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~10s):** Reordered, $g(x) = 6x^2 - 5x + 9$, so $b = -5$.\n\n**The Full Solution:**\nStep 1: The form $ax^2 + bx + c$ lists the terms from the highest power down, so rewrite $g(x) = 9 - 5x + 6x^2$ as $g(x) = 6x^2 - 5x + 9$.\nStep 2: Match term by term: $a = 6$, $b = -5$, and $c = 9$.\nStep 3: The coefficient of $x$ is $b = -5$. Check by evaluating both forms at $x = 1$: $9 - 5 + 6 = 10$ and $6 - 5 + 9 = 10$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($5$): reads the coefficient of $x$ but drops the minus sign that belongs to it.\n* Choice C ($6$): reports $a$, the coefficient of $x^2$.\n* Choice D ($9$): reports $c$, the constant term, which happens to be written first here.\n\n**Test Day Takeaway:** A coefficient always travels with the sign in front of it, and the order the terms happen to be printed in is not the standard-form order.",
      skills: ["identify-quadratic"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "In the $xy$-plane, the graph of the quadratic function $f$ is shown. Which of the following statements about $f$ must be true?",
      diagram: { type: "quadraticVertex", params: { vertex: [3, 6], a: -1, showVertex: true } },
      choices: [
        // distractor: describes an upward-opening graph
        { id: "A", text: "The coefficient of $x^2$ in $f(x)$ is positive, and $f$ has a minimum value." },
        // distractor: positive a cannot give a maximum
        { id: "B", text: "The coefficient of $x^2$ in $f(x)$ is positive, and $f$ has a maximum value." },
        // distractor: right sign, wrong extreme
        { id: "C", text: "The coefficient of $x^2$ in $f(x)$ is negative, and $f$ has a minimum value." },
        { id: "D", text: "The coefficient of $x^2$ in $f(x)$ is negative, and $f$ has a maximum value." }
      ],
      correctAnswer: "D",
      hint: "The direction the arms point decides the sign of the leading coefficient, and that sign decides which extreme value exists.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** The parabola opens downward, so the leading coefficient is negative and the vertex is the highest point.\n\n**The Full Solution:**\nStep 1: The graph is a parabola whose arms point downward, away from the vertex at the top.\nStep 2: For $f(x) = ax^2 + bx + c$, the parabola opens downward exactly when $a < 0$, so the coefficient of $x^2$ is negative.\nStep 3: When the arms fall away from the vertex, no output is larger than the vertex's output, so $f$ has a maximum value and no minimum. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: describes an upward-opening parabola, which is the graph you would see if $a$ were positive.\n* Choice B: pairs a positive leading coefficient with a maximum, but a positive coefficient forces a minimum.\n* Choice C: reads the sign of the coefficient correctly but then names the wrong extreme value.\n\n**Test Day Takeaway:** Sign of $a$ and type of extreme value are locked together: $a > 0$ opens upward with a minimum, $a < 0$ opens downward with a maximum.",
      skills: ["identify-quadratic", "parabola-direction"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A parabola in the $xy$-plane is the graph of $y = px^2 + qx + r$, where $p$, $q$, and $r$ are constants with $p < 0$. Which of the following must be true about this parabola?",
      choices: [
        { id: "A", text: "It opens downward, and its vertex is its highest point." },
        // distractor: downward curves have no lowest point
        { id: "B", text: "It opens downward, and its vertex is its lowest point." },
        // distractor: impossible pairing
        { id: "C", text: "It opens upward, and its vertex is its highest point." },
        // distractor: describes the case p > 0
        { id: "D", text: "It opens upward, and its vertex is its lowest point." }
      ],
      correctAnswer: "A",
      hint: "Only the sign of the squared term's coefficient matters here; the other two constants slide the curve but never flip it over.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** A negative leading coefficient turns the arms downward, so the vertex sits above every other point.\n\n**The Full Solution:**\nStep 1: Completing the square rewrites the equation as $y = p(x - h)^2 + k$ with the same leading constant $p$, since that step never changes it.\nStep 2: The squared quantity $(x - h)^2$ is never negative, so with $p < 0$ the product $p(x - h)^2$ is never positive, and therefore $y \\leq k$ for every $x$.\nStep 3: Equality holds only at $x = h$, so the vertex $(h, k)$ is the highest point on the curve and both arms fall away from it. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: reads the direction correctly but then calls the vertex the lowest point; a downward-opening curve has no lowest point.\n* Choice C: pairs an upward opening with a highest point, a combination no parabola can have.\n* Choice D: describes what happens when $p > 0$, the opposite of the stated condition.\n\n**Test Day Takeaway:** The constants $q$ and $r$ slide a parabola around the plane, but only the sign of the squared term's coefficient decides maximum versus minimum.",
      skills: ["parabola-direction"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The function $f$ is defined by $f(x) = (x + 4)^3 - x^3$, where $x$ is a real number. The function can be written in the form $f(x) = ax^2 + bx + c$, where $a$, $b$, and $c$ are constants. What is the value of $a + b + c$?",
      choices: [
        // distractor: subtracts inside the cube, reading it as (x + 4 - x)^3
        { id: "A", text: "$64$" },
        // distractor: omits the binomial coefficients of 3 when expanding the cube
        { id: "B", text: "$84$" },
        { id: "C", text: "$124$" },
        // distractor: never subtracts x^3 and sums all four cube coefficients
        { id: "D", text: "$125$" }
      ],
      correctAnswer: "C",
      hint: "Expand $(x + 4)^3$ completely before you subtract — the exponent does not distribute over a sum.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $a + b + c$ is the value of the polynomial at $x = 1$, and $f(1) = 5^3 - 1^3 = 124$.\n\n**The Full Solution:**\nStep 1: Expand the cube term by term: $(x + 4)^3 = x^3 + 3(4)x^2 + 3(16)x + 64 = x^3 + 12x^2 + 48x + 64$.\nStep 2: Subtract $x^3$. The two cubic terms cancel, leaving $f(x) = 12x^2 + 48x + 64$, so $a = 12$, $b = 48$, and $c = 64$.\nStep 3: Add the three coefficients: $12 + 48 + 64 = 124$. Check against the original definition at $x = 1$: $(1 + 4)^3 - 1^3 = 125 - 1 = 124$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($64$): subtracts inside the cube, reading the expression as $(x + 4 - x)^3 = 4^3$.\n* Choice B ($84$): expands the cube as $x^3 + 4x^2 + 16x + 64$, leaving out the binomial coefficients of $3$, and then adds $4 + 16 + 64$.\n* Choice D ($125$): never subtracts $x^3$, so all four coefficients of the cube get added: $1 + 12 + 48 + 64$.\n\n**Test Day Takeaway:** The sum of a polynomial's coefficients is its value at $x = 1$, so substitute $1$ into the ORIGINAL expression instead of expanding.",
      skills: ["identify-quadratic"]
    }
  ],

  // Section: Roots
  "Roots": [
    {
      id: 1,
      difficulty: "easy",
      question: "A community clinic models its weekly surplus of test kits by $s(w) = w^2 - 11w + 24$, where $w$ is the number of weeks after a shipment arrives. For which values of $w$ is the modeled surplus equal to $0$?",
      choices: [
        // distractor: factors as (w + 3)(w + 8), which would give a middle term of +11w rather than -11w
        { id: "A", text: "$w = -8$ and $w = -3$" },
        // distractor: picks factors of 24 that add to 10, not 11
        { id: "B", text: "$w = -6$ and $w = -4$" },
        { id: "C", text: "$w = 3$ and $w = 8$" },
        // distractor: picks factors of 24 that add to 10 with the correct signs but the wrong pair
        { id: "D", text: "$w = 4$ and $w = 6$" }
      ],
      correctAnswer: "C",
      hint: "Factor the expression and read the values that make each factor zero.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** $w^2 - 11w + 24 = (w - 3)(w - 8)$, so the surplus is $0$ in week $3$ and week $8$.\n\n**The Full Solution:**\nStep 1: Factor. Two numbers multiply to $24$ and add to $-11$: they are $-3$ and $-8$, so $s(w) = (w - 3)(w - 8)$.\nStep 2: Set each factor to zero. $w - 3 = 0$ gives $w = 3$, and $w - 8 = 0$ gives $w = 8$.\nStep 3: Check one. $s(3) = 9 - 33 + 24 = 0$, and $s(8) = 64 - 88 + 24 = 0$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($w = -8$ and $w = -3$): comes from $(w + 3)(w + 8)$, which expands with a middle term of $+11w$, not $-11w$.\n* Choice B ($w = -6$ and $w = -4$): uses $6$ and $4$, which multiply to $24$ but add to $10$, and with the wrong signs besides.\n* Choice D ($w = 4$ and $w = 6$): uses $4$ and $6$: their product is $24$ but their sum is $10$, not $11$.\n\n**Test Day Takeaway:** Factor pairs must match BOTH the product and the sum. Check the sum before committing to a pair.",
      skills: ["finding-roots-factoring"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "One solution to the equation $x^2 - 9x + k = 0$ is $x = 2$, where $k$ is a constant. What is the value of $k$?",
      choices: [
        // distractor: sign error isolating k
        { id: "A", text: "$-14$" },
        // distractor: subtracts the root from the coefficient
        { id: "B", text: "$7$" },
        { id: "C", text: "$14$" },
        // distractor: ignores the squared term
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "C",
      hint: "A solution makes the equation true, so substitute it and solve for the unknown constant.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** $4 - 18 + k = 0$ gives $k = 14$.\n\n**The Full Solution:**\nStep 1: Because $x = 2$ is a solution, substituting $2$ must make the equation true: $2^2 - 9(2) + k = 0$.\nStep 2: Simplify the numbers: $4 - 18 + k = 0$, so $-14 + k = 0$.\nStep 3: Add $14$ to both sides: $k = 14$. Check by factoring: $x^2 - 9x + 14 = (x - 2)(x - 7)$, whose solutions are $2$ and $7$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-14$): solves $-14 + k = 0$ as $k = -14$, moving the term across without changing its sign.\n* Choice B ($7$): subtracts the solution from the middle coefficient, computing $9 - 2$.\n* Choice D ($18$): uses only the product $9(2) = 18$ and never accounts for the $x^2$ term.\n\n**Test Day Takeaway:** Substituting a known solution turns a quadratic with an unknown coefficient into a one-step linear equation.",
      skills: ["roots-from-factors", "finding-roots-factoring"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A kiln operator's model gives the two times, in hours from a set point, at which the chamber temperature returns to its target as the solutions of $9x^2 - c = 0$, where $c$ is a positive constant. Those two times differ by $\\frac{8}{3}$ hours. What is the value of $c$?",
      choices: [
        // distractor: solves x^2 = c, ignoring the coefficient 9, which gives 2 sqrt(c) = 8/3 and c = 16/9
        { id: "A", text: "$\\frac{16}{9}$" },
        // distractor: stops at sqrt(c) = 4 and reports that instead of c
        { id: "B", text: "$4$" },
        { id: "C", text: "$16$" },
        // distractor: sets one solution equal to the full gap 8/3 instead of half of it, giving c = 9(64/9) = 64
        { id: "D", text: "$64$" }
      ],
      correctAnswer: "C",
      hint: "Write the two solutions in terms of c before you use the gap between them.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** The solutions are $\\pm\\frac{\\sqrt{c}}{3}$, so the gap is $\\frac{2\\sqrt{c}}{3} = \\frac{8}{3}$, giving $\\sqrt{c} = 4$ and $c = 16$.\n\n**The Full Solution:**\nStep 1: Solve for the two times. $9x^2 = c$ gives $x^2 = \\frac{c}{9}$, so $x = \\pm\\frac{\\sqrt{c}}{3}$.\nStep 2: Use the gap. The two solutions differ by $\\frac{\\sqrt{c}}{3} - \\left(-\\frac{\\sqrt{c}}{3}\\right) = \\frac{2\\sqrt{c}}{3}$, and that equals $\\frac{8}{3}$, so $\\sqrt{c} = 4$.\nStep 3: Square and check. $c = 16$, so $9x^2 = 16$ gives $x = \\pm\\frac{4}{3}$, and $\\frac{4}{3} - \\left(-\\frac{4}{3}\\right) = \\frac{8}{3}$ hours. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{16}{9}$): drops the coefficient $9$ and solves $x^2 = c$, so the gap becomes $2\\sqrt{c}$.\n* Choice B ($4$): is $\\sqrt{c}$, one step short of the requested $c$.\n* Choice D ($64$): sets one solution equal to the whole gap $\\frac{8}{3}$ rather than half of it.\n\n**Test Day Takeaway:** For $ax^2 = c$ the two solutions are symmetric about $0$, so their difference is TWICE the positive one — halve the gap before squaring.",
      skills: ["difference-of-squares", "finding-roots-factoring"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The graph of $y = f(x)$ shown gives a county's weekly count of confirmed influenza cases minus its outbreak threshold, $x$ weeks after a school term begins. Which of the following could define $f$?",
      diagram: { type: "parabola", params: { vertex: { h: 4, k: -9 }, a: 1, xRange: [0, 8], yRange: [-10, 8], showVertex: false, xTickInterval: 1, yTickInterval: 2, gridInterval: 1 } },
      choices: [
        // distractor: places both zeros at negative weeks, x = -7 and x = -1, before the term begins
        { id: "A", text: "$f(x) = (x + 1)(x + 7)$" },
        // distractor: keeps the crossing at x = 1 but reflects the later one, putting a zero at x = -7
        { id: "B", text: "$f(x) = (x - 1)(x + 7)$" },
        // distractor: keeps the crossing at x = 7 but reflects the earlier one, putting a zero at x = -1
        { id: "C", text: "$f(x) = (x - 7)(x + 1)$" },
        { id: "D", text: "$f(x) = (x - 1)(x - 7)$" }
      ],
      correctAnswer: "D",
      hint: "Each factor vanishes at one of the weeks where the curve meets the threshold.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~20s):** The curve meets the threshold at $x = 1$ and $x = 7$, so $f(x) = (x - 1)(x - 7)$.\n\n**The Full Solution:**\nStep 1: Read the crossings. The weekly count equals the outbreak threshold at $x = 1$ week and $x = 7$ weeks, so $f(1) = 0$ and $f(7) = 0$.\nStep 2: Build the factors. A zero at $x = 1$ needs the factor $(x - 1)$; a zero at $x = 7$ needs $(x - 7)$.\nStep 3: Check the low point. The graph bottoms out at $(4, -9)$, and $(4 - 1)(4 - 7) = (3)(-3) = -9$ cases below the threshold. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(x + 1)(x + 7)$): has zeros at $-1$ and $-7$, both before the term begins; the graph never meets the threshold at a negative week.\n* Choice B ($(x - 1)(x + 7)$): keeps the crossing at $x = 1$ but puts the second one at $x = -7$ instead of $x = 7$.\n* Choice C ($(x - 7)(x + 1)$): keeps the crossing at $x = 7$ but puts the first one at $x = -1$ instead of $x = 1$.\n\n**Test Day Takeaway:** A zero at $x = r$ comes from the factor $(x - r)$ — the sign inside the parenthesis is the OPPOSITE of the crossing value.",
      skills: ["roots-from-factors"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A lighting technician finds that the two dimmer settings at which a fixture's measured illuminance equals its target are the two solutions of $x^2 + bx + 45 = 0$, where $b$ is a constant. Both solutions are positive and they differ by $4$. What is the value of $b$?",
      choices: [
        { id: "A", text: "$-14$" },
        // distractor: negates the larger solution, 9, instead of negating the sum of the two solutions
        { id: "B", text: "$-9$" },
        // distractor: reports the larger solution, 9, rather than a value of b
        { id: "C", text: "$9$" },
        // distractor: reports the sum of the solutions, 14, without the minus sign that b carries
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "A",
      hint: "The two solutions multiply to 45 and their sum is tied to b.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** The two settings multiply to $45$ and differ by $4$, so they are $5$ and $9$; their sum is $14$, and $b = -14$.\n\n**The Full Solution:**\nStep 1: Use the product. For $x^2 + bx + 45 = 0$, the two solutions multiply to $45$. Positive pairs are $1$ and $45$, $3$ and $15$, $5$ and $9$.\nStep 2: Use the gap. Only $5$ and $9$ differ by $4$.\nStep 3: Convert the sum to $b$ and check. The solutions sum to $-b$, so $5 + 9 = 14$ gives $b = -14$. Then $x^2 - 14x + 45 = (x - 5)(x - 9)$, with solutions $5$ and $9$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-9$): negates the larger solution instead of the sum of the two.\n* Choice C ($9$): is the larger dimmer setting, not the coefficient $b$.\n* Choice D ($14$): is the sum of the two solutions. For $x^2 + bx + c$ the sum equals $-b$, so the sign flips.\n\n**Test Day Takeaway:** For $x^2 + bx + c = 0$: the solutions multiply to $c$ and sum to $-b$. Two positive solutions force $b$ to be negative.",
      skills: ["finding-roots-factoring"]
    }
  ],

  // Section: Vertex
  "Vertex": [
    {
      id: 1,
      difficulty: "easy",
      question: "In the $xy$-plane, the graph of $f(x) = x^2 - 10x + 21$ is shown, with its two $x$-intercepts marked. What is the $x$-coordinate of the vertex of this graph?",
      diagram: { type: "quadraticVertex", params: { vertex: [5, -4], a: 1, showVertex: false, showPoints: [[3, 0], [7, 0]] } },
      choices: [
        // distractor: reports b
        { id: "A", text: "$-10$" },
        // distractor: drops the leading negative sign
        { id: "B", text: "$-5$" },
        { id: "C", text: "$5$" },
        // distractor: reports the constant term
        { id: "D", text: "$21$" }
      ],
      correctAnswer: "C",
      hint: "The vertex sits halfway between the two $x$-intercepts, and $x = -\\frac{b}{2a}$ says the same thing.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** $x = -\\frac{b}{2a} = -\\frac{-10}{2(1)} = 5$.\n\n**The Full Solution:**\nStep 1: Identify the coefficients: $a = 1$, $b = -10$, and $c = 21$.\nStep 2: The vertex of $y = ax^2 + bx + c$ has $x = -\\frac{b}{2a}$, so $x = -\\frac{-10}{2} = 5$.\nStep 3: Confirm with the marked intercepts. Factoring gives $(x - 3)(x - 7)$, so the intercepts are $3$ and $7$, whose midpoint is $\\frac{3 + 7}{2} = 5$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$): reports $b$ itself instead of $-\\frac{b}{2a}$.\n* Choice B ($-5$): computes $\\frac{b}{2a}$ and forgets the leading negative sign in the formula.\n* Choice D ($21$): reports the constant term $c$, which is the $y$-intercept rather than anything about the vertex.\n\n**Test Day Takeaway:** Two routes give the same vertex $x$-value: $-\\frac{b}{2a}$, or the midpoint of the two $x$-intercepts when they exist.",
      skills: ["vertex-formula"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A dialysis unit's water use per treatment, in liters, is modeled by $W(s) = 0.5(s - 40)^2 + 12$, where $s$ is the flow setting on the machine. Which statement correctly describes the water use predicted by this model?",
      choices: [
        { id: "A", text: "The minimum water use is $12$ liters, at a flow setting of $40$." },
        // distractor: swaps the roles of 40 and 12, reading the setting as the water use
        { id: "B", text: "The minimum water use is $40$ liters, at a flow setting of $12$." },
        // distractor: calls the turning point a maximum, but the positive coefficient 0.5 opens the curve upward
        { id: "C", text: "The maximum water use is $12$ liters, at a flow setting of $40$." },
        // distractor: reads the setting as -40; the expression (s - 40)^2 is zero at s = +40
        { id: "D", text: "The minimum water use is $12$ liters, at a flow setting of $-40$." }
      ],
      correctAnswer: "A",
      hint: "A squared quantity is never negative, so ask when it is zero.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $0.5(s - 40)^2$ is never negative and equals $0$ at $s = 40$, so the least water use is $12$ liters there.\n\n**The Full Solution:**\nStep 1: Look at the squared term. $(s - 40)^2 \\ge 0$ for every setting, and $0.5$ is positive, so $0.5(s - 40)^2 \\ge 0$.\nStep 2: Find where it vanishes. The squared term is $0$ only at $s = 40$, and there $W(40) = 0 + 12 = 12$ liters.\nStep 3: Confirm it is a minimum. Any other setting adds a positive amount to $12$; for example $W(42) = 0.5(4) + 12 = 14$ liters. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (minimum $40$ at setting $12$): swaps the two numbers. In $a(s - h)^2 + k$, $h$ is the setting and $k$ is the output.\n* Choice C (maximum $12$ at setting $40$): calls the turning point a maximum. A positive coefficient opens the curve upward, so the turning point is the lowest value.\n* Choice D (minimum $12$ at setting $-40$): reads the sign inside the parentheses literally. $(s - 40)^2$ is zero at $s = 40$.\n\n**Test Day Takeaway:** In $a(x - h)^2 + k$, the turning point is at $x = h$ with value $k$, and the sign of $a$ decides whether $k$ is a minimum or a maximum.",
      skills: ["vertex-form"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The height, in meters, of a drone above its launch pad $t$ seconds after takeoff is modeled by $h(t) = -2t^2 + 12t$, and the graph of this model is shown. What is the maximum height, in meters, that the drone reaches?",
      diagram: { type: "parabola", params: { vertex: { h: 3, k: 18 }, a: -2, xRange: [0, 7], yRange: [0, 20], xTickInterval: 1, yTickInterval: 4, gridInterval: 2, showVertex: false } },
      choices: [
        // distractor: reports the time, not the height
        { id: "A", text: "$3$" },
        // distractor: reports the landing time
        { id: "B", text: "$6$" },
        // distractor: reports the coefficient of t
        { id: "C", text: "$12$" },
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "D",
      hint: "A negative leading coefficient means the vertex is the highest point, so find the time first and then the height.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** The vertex is at $t = -\\frac{12}{2(-2)} = 3$, and $h(3) = -18 + 36 = 18$.\n\n**The Full Solution:**\nStep 1: The leading coefficient $-2$ is negative, so the parabola opens downward and the vertex gives the maximum height.\nStep 2: The vertex occurs at $t = -\\frac{b}{2a} = -\\frac{12}{2(-2)} = 3$ seconds.\nStep 3: Evaluate the model there: $h(3) = -2(3)^2 + 12(3) = -18 + 36 = 18$ meters. Check the symmetry: $h(0) = 0$ and $h(6) = -72 + 72 = 0$, and $3$ is the midpoint of $0$ and $6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): reports the TIME at which the maximum occurs rather than the height.\n* Choice B ($6$): reports the time at which the drone returns to the launch pad's height.\n* Choice C ($12$): reports the coefficient of $t$ instead of evaluating the model at the vertex.\n\n**Test Day Takeaway:** A maximum-value question has two steps: find the input at the vertex, then substitute it back to get the output the question actually asks for.",
      skills: ["parabola-direction", "vertex-formula"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A laboratory models its daily assay throughput, in completed assays, by $Q(x) = -2x^2 + kx + 90$, where $x$ is the centrifuge speed setting and $k$ is a constant. The modeled throughput is greatest when $x = 9$. What is the value of $k$?",
      choices: [
        // distractor: uses x = k / (2a) with a = -2, giving 9 = k / -4 and k = -36, dropping the minus in the formula
        { id: "A", text: "$-36$" },
        // distractor: uses x = -k / 2, ignoring the leading coefficient, which gives k = -18
        { id: "B", text: "$-18$" },
        // distractor: uses x = -k / a instead of x = -k / (2a), which gives k = 18
        { id: "C", text: "$18$" },
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "D",
      hint: "The peak of a parabola sits at the axis of symmetry.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~20s):** The peak is at $x = -\\frac{k}{2(-2)} = \\frac{k}{4}$, so $\\frac{k}{4} = 9$ and $k = 36$.\n\n**The Full Solution:**\nStep 1: Locate the peak. For $Q(x) = ax^2 + bx + c$ the turning point sits at $x = -\\frac{b}{2a}$; here $a = -2$ and $b = k$, so $x = -\\frac{k}{-4} = \\frac{k}{4}$.\nStep 2: Set that equal to the given setting. $\\frac{k}{4} = 9$, so $k = 36$.\nStep 3: Check. $Q(x) = -2x^2 + 36x + 90$ peaks at $x = -\\frac{36}{-4} = 9$, and $Q(9) = -162 + 324 + 90 = 252$, higher than $Q(8) = 250$ and $Q(10) = 250$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-36$): uses $x = \\frac{k}{2a}$ and drops the minus sign in front of $b$.\n* Choice B ($-18$): uses $x = -\\frac{k}{2}$, leaving the leading coefficient out of the denominator.\n* Choice C ($18$): uses $x = -\\frac{k}{a}$, missing the factor of $2$ in $2a$.\n\n**Test Day Takeaway:** The axis of symmetry is $x = -\\frac{b}{2a}$. Both the minus sign and the $2$ matter, and a negative $a$ makes sign slips especially easy.",
      skills: ["vertex-formula"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A projection technician models image brightness, in lumens per square meter above a baseline, by $h(x) = -2x^2 + 24x - 55$, where $x$ is the lens position, in centimeters. Which equivalent form of $h(x)$ displays the maximum brightness as a constant or coefficient?",
      choices: [
        { id: "A", text: "$h(x) = -2(x - 6)^2 + 17$" },
        // distractor: keeps the original constant -55 outside the square instead of adjusting it by +72
        { id: "B", text: "$h(x) = -2(x - 6)^2 - 55$" },
        // distractor: factors to (x + 6)^2, which puts the peak at x = -6 rather than x = 6
        { id: "C", text: "$h(x) = -2(x + 6)^2 + 17$" },
        // distractor: halves nothing and uses 12 inside the square, placing the peak at x = 12
        { id: "D", text: "$h(x) = -2(x - 12)^2 + 17$" }
      ],
      correctAnswer: "A",
      hint: "Factor the -2 out of the first two terms before completing the square.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** $-2(x^2 - 12x) - 55 = -2(x - 6)^2 + 72 - 55 = -2(x - 6)^2 + 17$, so the maximum brightness is $17$.\n\n**The Full Solution:**\nStep 1: Factor $-2$ from the variable terms. $h(x) = -2(x^2 - 12x) - 55$.\nStep 2: Complete the square inside. $x^2 - 12x = (x - 6)^2 - 36$, so $h(x) = -2\\left[(x - 6)^2 - 36\\right] - 55 = -2(x - 6)^2 + 72 - 55$.\nStep 3: Combine and check. $h(x) = -2(x - 6)^2 + 17$. At $x = 6$ the original gives $-72 + 144 - 55 = 17$, and the squared term is never positive, so $17$ is the maximum. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-2(x - 6)^2 - 55$): keeps the original constant. Completing the square inside the bracket changes what must be added outside.\n* Choice C ($-2(x + 6)^2 + 17$): places the peak at $x = -6$; expanding it gives $-2x^2 - 24x - 55$, the wrong middle term.\n* Choice D ($-2(x - 12)^2 + 17$): uses $12$ instead of half of $12$ inside the square.\n\n**Test Day Takeaway:** When $a \\ne 1$, factor $a$ out of the first two terms FIRST; the number you add inside the bracket is multiplied by $a$ on its way out.",
      skills: ["vertex-formula"]
    }
  ],

  // Section: Discriminant
  "Discriminant": [
    {
      id: 1,
      difficulty: "easy",
      question: "In the quadratic equation $2x^2 + 7x + 3 = 0$, the coefficients are $a = 2$, $b = 7$, and $c = 3$. What is the value of the discriminant $b^2 - 4ac$?",
      choices: [
        // distractor: reverses the subtraction
        { id: "A", text: "$-25$" },
        { id: "B", text: "$25$" },
        // distractor: omits a from 4ac
        { id: "C", text: "$37$" },
        // distractor: adds instead of subtracting
        { id: "D", text: "$73$" }
      ],
      correctAnswer: "B",
      hint: "Substitute all three coefficients, and perform the subtraction last.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** $7^2 - 4(2)(3) = 49 - 24 = 25$.\n\n**The Full Solution:**\nStep 1: Square the middle coefficient: $b^2 = 7^2 = 49$.\nStep 2: Multiply the other three factors: $4ac = 4(2)(3) = 24$.\nStep 3: Subtract in the order the formula gives: $49 - 24 = 25$. Check: $25$ is a perfect square, and indeed $2x^2 + 7x + 3 = (2x + 1)(x + 3)$ has two rational solutions. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-25$): reverses the subtraction, computing $4ac - b^2 = 24 - 49$.\n* Choice C ($37$): leaves $a$ out of the product, computing $49 - 4(3) = 49 - 12$.\n* Choice D ($73$): adds the two pieces instead of subtracting, computing $49 + 24$.\n\n**Test Day Takeaway:** The discriminant is $b^2$ MINUS $4ac$, and $4ac$ uses all three coefficients — dropping one is the most common slip.",
      skills: ["discriminant-analysis"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "For a quadratic equation of the form $ax^2 + bx + c = 0$ with real coefficients and $a \\neq 0$, the value of $b^2 - 4ac$ is $0$. How many distinct real solutions does this equation have?",
      choices: [
        // distractor: the negative-discriminant case
        { id: "A", text: "Zero" },
        { id: "B", text: "Exactly one" },
        // distractor: the positive-discriminant case
        { id: "C", text: "Exactly two" },
        // distractor: impossible for a quadratic
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "B",
      hint: "The discriminant sits under the square root in the quadratic formula.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The quadratic formula becomes $x = \\frac{-b \\pm 0}{2a}$, a single value.\n\n**The Full Solution:**\nStep 1: The quadratic formula gives $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$, and the discriminant is what sits under the radical.\nStep 2: With $b^2 - 4ac = 0$, the radical contributes $\\sqrt{0} = 0$, so the plus and the minus produce the same number.\nStep 3: Both branches collapse to $x = \\frac{-b}{2a}$, so there is exactly one distinct real solution. Check the geometry: the parabola touches the $x$-axis at its vertex and does not cross. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: describes a NEGATIVE discriminant, where the radical has no real value.\n* Choice C: describes a POSITIVE discriminant, where the plus and the minus give different numbers.\n* Choice D: no quadratic equation with $a \\neq 0$ can have infinitely many solutions, since a parabola meets a line at most twice.\n\n**Test Day Takeaway:** Sign of the discriminant, not its size, sets the count: negative gives none, zero gives one, positive gives two.",
      skills: ["discriminant-analysis"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The height, in feet, of the water in a plaza fountain jet is modeled by $h(x) = -0.5x^2 + 6x - 10$, where $x$ is the horizontal distance, in feet, from the plaza's pump housing and $2 \\le x \\le 10$. For how many distinct values of $x$ in this interval does $h(x) = 8$?",
      choices: [
        // distractor: concludes the jet never reaches 8 feet, but the resulting discriminant is 0, not negative
        { id: "A", text: "Zero" },
        { id: "B", text: "Exactly one" },
        // distractor: assumes any horizontal line meets a parabola twice, which fails at the turning point
        { id: "C", text: "Exactly two" },
        // distractor: treats the model as though the jet oscillates, which a single parabola never does
        { id: "D", text: "More than two" }
      ],
      correctAnswer: "B",
      hint: "Move the 8 across and look at what kind of quadratic is left.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** Setting $-0.5x^2 + 6x - 10 = 8$ gives $x^2 - 12x + 36 = 0$, whose discriminant is $0$: one solution, $x = 6$.\n\n**The Full Solution:**\nStep 1: Set the model equal to $8$. $-0.5x^2 + 6x - 10 = 8$, so $-0.5x^2 + 6x - 18 = 0$.\nStep 2: Clear the fraction and test the discriminant. Multiplying by $-2$ gives $x^2 - 12x + 36 = 0$, so $b^2 - 4ac = 144 - 144 = 0$ — exactly one real solution.\nStep 3: Find it and confirm it is in range. $x^2 - 12x + 36 = (x - 6)^2$, so $x = 6$, which lies between $2$ and $10$. Height there: $-0.5(36) + 36 - 10 = 8$ feet. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (Zero): would need a negative discriminant. Here it is exactly $0$, so the jet does touch $8$ feet — at its peak.\n* Choice C (Exactly two): is the usual case for a horizontal line through a parabola, but $8$ feet is the maximum height, met at a single point.\n* Choice D (More than two): cannot happen: a quadratic equation has at most two real solutions.\n\n**Test Day Takeaway:** A discriminant of $0$ is the signal that the horizontal line is tangent — it touches the parabola at its turning point and nowhere else.",
      skills: ["discriminant-analysis"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A signal-timing study finds that the clearance intervals, in seconds, meeting a design constraint are exactly the solutions of $2x^2 - kx + 18 = 0$ for a positive constant $k$. The study finds exactly one such interval. What is the value of $k$?",
      choices: [
        // distractor: takes the square root of ac = 36 instead of 4ac = 144
        { id: "A", text: "$6$" },
        // distractor: divides the constant by the leading coefficient, 18 / 2 = 9, which is not the discriminant condition
        { id: "B", text: "$9$" },
        { id: "C", text: "$12$" },
        // distractor: reports k squared, 144, instead of k
        { id: "D", text: "$144$" }
      ],
      correctAnswer: "C",
      hint: "One solution means the two square-root branches collapse into each other.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Exactly one solution means $k^2 - 4(2)(18) = 0$, so $k^2 = 144$ and, since $k > 0$, $k = 12$.\n\n**The Full Solution:**\nStep 1: Write the discriminant. For $2x^2 - kx + 18 = 0$ the discriminant is $(-k)^2 - 4(2)(18) = k^2 - 144$.\nStep 2: Set it to zero. Exactly one solution requires $k^2 - 144 = 0$, so $k^2 = 144$ and $k = \\pm 12$. The problem states $k$ is positive, so $k = 12$.\nStep 3: Check. $2x^2 - 12x + 18 = 2(x - 3)^2$, which is zero only at $x = 3$ — one clearance interval. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): is $\\sqrt{2 \\times 18} = \\sqrt{36}$, using $ac$ instead of $4ac$ in the discriminant.\n* Choice B ($9$): is $\\frac{18}{2}$, dividing the constant by the leading coefficient. That is not what the discriminant tests.\n* Choice D ($144$): is $k^2$. The question asks for $k$ itself.\n\n**Test Day Takeaway:** Exactly one real solution means discriminant $= 0$. Solve $b^2 = 4ac$, then take the root the problem allows.",
      skills: ["discriminant-analysis"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A bridge inspector sets a whole-number damping parameter $n$ between $1$ and $20$, and the deck response for that setting is graphed as $y = 2x^2 + 9x + n$. The inspector issues a warning for any setting whose graph crosses the horizontal axis at two points. For how many settings is a warning issued?",
      choices: [
        // distractor: uses 81 - 16n > 0, squaring the leading coefficient inside 4ac, and stops at n = 5
        { id: "A", text: "$5$" },
        { id: "B", text: "$10$" },
        // distractor: includes n = 11, where 81 - 88 = -7 and the graph misses the axis entirely
        { id: "C", text: "$11$" },
        // distractor: counts all 20 settings, assuming every upward parabola crosses the axis twice
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "B",
      hint: "A setting earns a warning only while the discriminant stays above zero.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Two crossings need $81 - 8n > 0$, so $n < 10.125$ and the whole numbers $1$ through $10$ qualify — $10$ settings.\n\n**The Full Solution:**\nStep 1: Translate \"crosses the axis at two points.\" The graph of $y = 2x^2 + 9x + n$ meets $y = 0$ twice exactly when $9^2 - 4(2)(n) > 0$.\nStep 2: Solve the inequality. $81 - 8n > 0$ gives $8n < 81$, so $n < 10.125$.\nStep 3: Count the allowed whole numbers and check the boundary. From $1$ through $20$, the values $1, 2, \\ldots, 10$ satisfy $n < 10.125$ — that is $10$ settings. At $n = 10$ the discriminant is $81 - 80 = 1 > 0$; at $n = 11$ it is $-7$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): uses $81 - 16n > 0$, doubling the $2$ a second time inside $4ac$, and stops at $n = 5$.\n* Choice C ($11$): includes $n = 11$, where the discriminant is $-7$ and the parabola stays above the axis.\n* Choice D ($20$): counts every setting. An upward parabola can sit entirely above the axis.\n\n**Test Day Takeaway:** Turn \"two crossings\" into $b^2 - 4ac > 0$, solve for the parameter, then count the integers — and always test the boundary value.",
      skills: ["discriminant-analysis"]
    }
  ],

  // Section: Deriving Standard Form
  "Deriving Standard Form": [
    {
      id: 1,
      difficulty: "easy",
      question: "A booster pumping station holds a discharge pressure of $p$ bars, and its daily operating cost, in dollars, is $C(p) = 3(p - 8)^2 + 55$. An engineer needs this cost written as a polynomial in standard form. Which polynomial is equal to $C(p)$ for every value of $p$?",
      choices: [
        // distractor: drops the 3(64) = 192 term entirely, keeping only the 55
        { id: "A", text: "$3p^2 - 48p + 55$" },
        // distractor: adds 64 to 55 without tripling it: 55 + 64 = 119, so the 3 never reaches the constant
        { id: "B", text: "$3p^2 - 48p + 119$" },
        { id: "C", text: "$3p^2 - 48p + 247$" },
        // distractor: expands (p - 8)^2 as p^2 + 16p + 64, losing the minus sign on the middle term
        { id: "D", text: "$3p^2 + 48p + 247$" }
      ],
      correctAnswer: "C",
      hint: "Square the binomial completely before you distribute the 3.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** $(p - 8)^2 = p^2 - 16p + 64$, so $3(p^2 - 16p + 64) + 55 = 3p^2 - 48p + 192 + 55$.\n\n**The Full Solution:**\nStep 1: Square the binomial. $(p - 8)^2 = p^2 - 16p + 64$.\nStep 2: Distribute the $3$. $3(p^2 - 16p + 64) = 3p^2 - 48p + 192$.\nStep 3: Combine the constants and check. $192 + 55 = 247$, so $C(p) = 3p^2 - 48p + 247$. At $p = 8$ the original gives $55$, and $3(64) - 48(8) + 247 = 192 - 384 + 247 = 55$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3p^2 - 48p + 55$): never multiplies the $64$ by $3$, so the $192$ is missing from the constant term.\n* Choice B ($3p^2 - 48p + 119$): adds $64$ to $55$ without tripling it, giving $119$ instead of $247$.\n* Choice D ($3p^2 + 48p + 247$): expands $(p - 8)^2$ with a plus sign on the middle term. Squaring $p - 8$ gives $-16p$.\n\n**Test Day Takeaway:** Expand the square first, then distribute, then combine. The constant outside the square never reaches the middle term.",
      skills: ["converting-quadratic-forms", "vertex-form"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The parabola drawn here models the bed elevation $y$, in meters relative to grade, of a drainage channel at a horizontal distance of $x$ meters from a survey stake. Which of the following equations relates $y$ to $x$ for this channel bed?",
      diagram: { type: "parabola", params: { vertex: { h: 3, k: -4 }, a: 1, xRange: [0, 6], yRange: [-6, 6], showVertex: false, xTickInterval: 1, yTickInterval: 2, gridInterval: 1 } },
      choices: [
        // distractor: uses the vertex depth -4 as the constant term, which would put the crossing at x = 0 at y = -4 rather than y = 5
        { id: "A", text: "$y = x^2 - 6x - 4$" },
        { id: "B", text: "$y = x^2 - 6x + 5$" },
        // distractor: expands (x - 3)^2 + 4 instead of (x - 3)^2 - 4, flipping the sign of the vertex depth
        { id: "C", text: "$y = x^2 - 6x + 13$" },
        // distractor: expands (x + 3)^2 - 4, placing the vertex at x = -3 instead of x = 3
        { id: "D", text: "$y = x^2 + 6x + 5$" }
      ],
      correctAnswer: "B",
      hint: "Read the two horizontal-axis crossings straight off the grid.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The curve crosses at $x = 1$ and $x = 5$, so $y = (x - 1)(x - 5) = x^2 - 6x + 5$.\n\n**The Full Solution:**\nStep 1: Read the crossings. The bed reaches grade at $x = 1$ and $x = 5$ meters, so the factored form is $y = a(x - 1)(x - 5)$.\nStep 2: Pin the leading coefficient. The lowest point sits at $(3, -4)$, and $a(3 - 1)(3 - 5) = -4a$, so $-4a = -4$ and $a = 1$.\nStep 3: Expand and check. $y = (x - 1)(x - 5) = x^2 - 6x + 5$. At the stake, $x = 0$, the graph shows $y = 5$, and $0 - 0 + 5 = 5$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = x^2 - 6x - 4$): carries the vertex depth $-4$ into the constant term; at $x = 0$ it gives $-4$, but the graph shows $5$.\n* Choice C ($y = x^2 - 6x + 13$): comes from $(x - 3)^2 + 4$, a curve whose lowest point is $4$ meters ABOVE grade and never reaches it.\n* Choice D ($y = x^2 + 6x + 5$): comes from $(x + 3)^2 - 4$, putting the low point at $x = -3$, off the left of the graph.\n\n**Test Day Takeaway:** Crossings give the factors; one more point — the vertex or the intercept — fixes the leading coefficient. Then expand.",
      skills: ["vertex-form"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A print studio models the net revenue, in hundreds of dollars, from an edition priced $x$ dollars above its base price by $R(x) = -2(x + 7)(x - 3)$. Which of the following is an equivalent form of $R(x)$?",
      choices: [
        // distractor: multiplies -2 by -21 as -42 instead of +42, dropping the sign of the product of the constants
        { id: "A", text: "$-2x^2 - 8x - 42$" },
        { id: "B", text: "$-2x^2 - 8x + 42$" },
        // distractor: expands (x + 7)(x - 3) as x^2 - 4x - 21, reversing the sign of the middle term
        { id: "C", text: "$-2x^2 + 8x + 42$" },
        // distractor: leaves the constant term at 21, never multiplying it by the -2 outside
        { id: "D", text: "$-2x^2 - 8x + 21$" }
      ],
      correctAnswer: "B",
      hint: "Multiply the two binomials first, then hand the -2 to every term.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $(x + 7)(x - 3) = x^2 + 4x - 21$, and multiplying by $-2$ gives $-2x^2 - 8x + 42$.\n\n**The Full Solution:**\nStep 1: Multiply the binomials. $(x + 7)(x - 3) = x^2 - 3x + 7x - 21 = x^2 + 4x - 21$.\nStep 2: Distribute the $-2$ to all three terms. $-2(x^2) = -2x^2$, $-2(4x) = -8x$, and $-2(-21) = +42$.\nStep 3: Check one value. At $x = 0$ the original gives $-2(7)(-3) = 42$, and the expanded form gives $42$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2x^2 - 8x - 42$): signs the constant as $-42$; two negatives, $-2$ and $-21$, multiply to a positive.\n* Choice C ($-2x^2 + 8x + 42$): expands the binomials to $x^2 - 4x - 21$, reversing the middle term. The $+7$ outweighs the $-3$.\n* Choice D ($-2x^2 - 8x + 21$): leaves $21$ untouched. Every term inside the parentheses gets the $-2$.\n\n**Test Day Takeaway:** Multiply the binomials completely, then distribute the outside factor to all three terms — the constant included.",
      skills: ["roots-from-factors", "converting-quadratic-forms"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A rectangular clinic waiting area is $x$ meters wide and $x + 6$ meters long, and a walkway $2$ meters wide runs inside all four edges of it. Which expression gives the area, in square meters, of the seating region enclosed by the walkway?",
      choices: [
        { id: "A", text: "$x^2 - 2x - 8$" },
        // distractor: keeps the correct factors (x - 4)(x + 2) but records (-4)(+2) as +8, a sign slip on the constant term
        { id: "B", text: "$x^2 - 2x + 8$" },
        // distractor: expands (x + 4)(x - 2), adding the walkway to the width rather than removing it
        { id: "C", text: "$x^2 + 2x - 8$" },
        // distractor: subtracts 8 from the product x(x + 6) instead of shrinking each dimension first
        { id: "D", text: "$x^2 + 6x - 8$" }
      ],
      correctAnswer: "A",
      hint: "The walkway eats 2 meters at each end of both dimensions.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** The seating region is $(x - 4)$ by $(x + 2)$ meters, and that product is $x^2 - 2x - 8$.\n\n**The Full Solution:**\nStep 1: Shrink each dimension twice. The walkway is $2$ meters wide on both sides, so the width drops by $4$ to $x - 4$ and the length drops by $4$ to $(x + 6) - 4 = x + 2$.\nStep 2: Multiply. $(x - 4)(x + 2) = x^2 + 2x - 4x - 8 = x^2 - 2x - 8$ square meters.\nStep 3: Check with a number. If $x = 10$, the room is $10$ by $16$ and the seating region is $6$ by $12$, or $72$ square meters; the expression gives $100 - 20 - 8 = 72$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($x^2 - 2x + 8$): uses the right factors, $(x - 4)(x + 2)$, but signs the constant as $+8$. The product $(-4)(+2)$ is $-8$.\n* Choice C ($x^2 + 2x - 8$): comes from $(x + 4)(x - 2)$, adding the walkway to the width instead of removing it.\n* Choice D ($x^2 + 6x - 8$): subtracts $8$ from the whole room area $x(x + 6)$, but a border removes a frame, not a fixed $8$ square meters.\n\n**Test Day Takeaway:** A uniform border of width $w$ removes $2w$ from EACH dimension. Shrink both dimensions, then multiply.",
      skills: ["roots-from-factors", "converting-quadratic-forms"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The function $f$ is defined by $f(x) = -3(x - 4)^2 + 27$. This function can also be written as $f(x) = a(x - r)(x - s)$, where $a$, $r$, and $s$ are constants and $r < s$. What is the value of $r + s$?",
      choices: [
        // distractor: attaches the sign of a to the sum
        { id: "A", text: "$-8$" },
        // distractor: reports the axis of symmetry
        { id: "B", text: "$4$" },
        // distractor: reports the distance between the zeros
        { id: "C", text: "$6$" },
        { id: "D", text: "$8$" }
      ],
      correctAnswer: "D",
      hint: "The constants $r$ and $s$ are the zeros of the function, so set the vertex form equal to zero.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~35s):** $-3(x - 4)^2 + 27 = 0$ gives $(x - 4)^2 = 9$, so the zeros are $1$ and $7$ and their sum is $8$.\n\n**The Full Solution:**\nStep 1: In the form $a(x - r)(x - s)$ the constants $r$ and $s$ are the zeros of $f$, so solve $f(x) = 0$.\nStep 2: From $-3(x - 4)^2 + 27 = 0$, isolate the square: $(x - 4)^2 = 9$, so $x - 4 = \\pm 3$ and $x = 1$ or $x = 7$.\nStep 3: With $r = 1$ and $s = 7$, the sum is $r + s = 8$. Check: $-3(x - 1)(x - 7) = -3(x^2 - 8x + 7) = -3x^2 + 24x - 21$, and expanding the vertex form gives the same. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): attaches the sign of $a = -3$ to the sum, but the leading coefficient does not affect where the zeros are.\n* Choice B ($4$): reports the axis of symmetry, which is the AVERAGE of the two zeros rather than their sum.\n* Choice C ($6$): reports $7 - 1$, the distance between the zeros, instead of their sum.\n\n**Test Day Takeaway:** Vertex form converts to factored form through the zeros; the vertex's $x$-coordinate is always the midpoint of those zeros, never their sum.",
      skills: ["converting-quadratic-forms", "vertex-form"]
    }
  ]
};
