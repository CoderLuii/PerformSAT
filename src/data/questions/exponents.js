// Practice questions for Exponents module
// Questions are organized by SECTION (question type)

export const exponentsQuestions = {
  // Section: Laws of Exponents
  "Laws of Exponents": [
    {
      id: 1,
      difficulty: "easy",
      question: "An oak cask's volume model, in liters, includes the expression $(5m^2)^3$, where $m$ is the stave width in centimeters. Which of the following is equivalent to $(5m^2)^3$?",
      choices: [
        // distractor: raises only the variable, leaving the coefficient 5 untouched
        { id: "A", text: "$5m^{6}$" },
        // distractor: multiplies 5 by 3 instead of cubing it
        { id: "B", text: "$15m^{6}$" },
        // distractor: adds the exponents 2 + 3 instead of multiplying them
        { id: "C", text: "$125m^{5}$" },
        { id: "D", text: "$125m^{6}$" }
      ],
      correctAnswer: "D",
      hint: "Two things sit inside those parentheses.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** Cube the coefficient and multiply the exponents: $5^3 = 125$ and $m^{2 \\cdot 3} = m^6$.\n\n**The Full Solution:**\nStep 1: A power of a product raises each factor: $(5m^2)^3 = 5^3 \\cdot (m^2)^3$.\nStep 2: Cube the coefficient: $5^3 = 125$.\nStep 3: Multiply the exponents: $(m^2)^3 = m^6$, so the expression equals $125m^6$. Check at $m = 1$: $(5)^3 = 125$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5m^6$): raises only the variable and leaves the coefficient alone.\n* Choice B ($15m^6$): multiplies $5$ by the exponent $3$ instead of cubing it.\n* Choice C ($125m^5$): adds $2 + 3$, which is the rule for multiplying powers, not for a power of a power.\n\n**Test Day Takeaway:** An exponent outside parentheses hits every factor inside, coefficients included.",
      skills: ["exponent-laws"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A greenhouse's heat-loss model contains the product $x^{5} \\cdot x^{-2}$, where the pane thickness $x$ is measured in millimeters and is positive. Which expression is equivalent to that product?",
      choices: [
        // distractor: multiplies the exponents and keeps the negative sign
        { id: "A", text: "$x^{-10}$" },
        { id: "B", text: "$x^{3}$" },
        // distractor: subtracts the exponents, 5 - (-2), instead of adding them
        { id: "C", text: "$x^{7}$" },
        // distractor: multiplies the exponents and drops the negative sign
        { id: "D", text: "$x^{10}$" }
      ],
      correctAnswer: "B",
      hint: "Multiplying powers of one base keeps that base.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** Add the exponents: $5 + (-2) = 3$, so the product is $x^3$.\n\n**The Full Solution:**\nStep 1: Multiplying powers of the same base adds the exponents.\nStep 2: Add: $5 + (-2) = 3$.\nStep 3: The product is $x^3$. Check at $x = 2$: $32 \\cdot \\dfrac14 = 8 = 2^3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($x^{-10}$): multiplies the exponents, which is the rule for a power of a power.\n* Choice C ($x^{7}$): subtracts the exponents, the rule for division rather than multiplication.\n* Choice D ($x^{10}$): multiplies the exponents and also loses the negative sign.\n\n**Test Day Takeaway:** Multiply powers, add exponents — a negative exponent just makes that sum smaller.",
      skills: ["exponent-laws"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A gearbox reduction is $\\dfrac{(2a^3)^4}{8a^7}$, where $a$ is the input shaft radius in centimeters and is therefore positive. Which expression is equivalent to that reduction?",
      choices: [
        // distractor: treats 2^4 as 8, so the coefficients cancel to 1
        { id: "A", text: "$a^{5}$" },
        { id: "B", text: "$2a^{5}$" },
        // distractor: never divides the coefficient 16 by 8
        { id: "C", text: "$16a^{5}$" },
        // distractor: forgets to subtract the denominator's exponent 7
        { id: "D", text: "$2a^{12}$" }
      ],
      correctAnswer: "B",
      hint: "The numerator's coefficient is not $2$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The numerator is $16a^{12}$, and dividing by $8a^7$ leaves $2a^5$.\n\n**The Full Solution:**\nStep 1: Raise the numerator: $(2a^3)^4 = 2^4 \\cdot a^{12} = 16a^{12}$.\nStep 2: Divide the coefficients: $\\dfrac{16}{8} = 2$.\nStep 3: Subtract the exponents: $a^{12 - 7} = a^5$, so the reduction is $2a^5$. Check at $a = 1$: $\\dfrac{16}{8} = 2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($a^5$): reads $2^4$ as $8$, so the coefficients appear to cancel.\n* Choice C ($16a^5$): handles the variable correctly but never divides $16$ by $8$.\n* Choice D ($2a^{12}$): divides the coefficients but forgets to subtract the exponent $7$.\n\n**Test Day Takeaway:** Expand any parenthesised power first; only then divide coefficients and subtract exponents.",
      skills: ["exponent-laws"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A soil-moisture decay model multiplies its baseline reading by $\\left(\\dfrac{2}{5}\\right)^{-3}$ to estimate the moisture a test plot held three days earlier. What value does that multiplier have?",
      choices: [
        // distractor: flips the fraction and then also negates the result
        { id: "A", text: "$-\\dfrac{125}{8}$" },
        // distractor: reads the negative exponent as making the value negative
        { id: "B", text: "$-\\dfrac{8}{125}$" },
        // distractor: cubes the fraction without flipping it
        { id: "C", text: "$\\dfrac{8}{125}$" },
        { id: "D", text: "$\\dfrac{125}{8}$" }
      ],
      correctAnswer: "D",
      hint: "Decide what a negative exponent does to a fraction — and what it leaves alone.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** The negative exponent flips the fraction: $\\left(\\dfrac{5}{2}\\right)^{3} = \\dfrac{125}{8}$.\n\n**The Full Solution:**\nStep 1: A negative exponent means the reciprocal: $\\left(\\dfrac{2}{5}\\right)^{-3} = \\left(\\dfrac{5}{2}\\right)^{3}$.\nStep 2: Cube the numerator and the denominator: $\\dfrac{5^3}{2^3}$.\nStep 3: Evaluate: $\\dfrac{125}{8}$. Check: $\\dfrac{125}{8} \\cdot \\left(\\dfrac{2}{5}\\right)^{3} = \\dfrac{125}{8} \\cdot \\dfrac{8}{125} = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\dfrac{125}{8}$): flips the fraction correctly but then also makes it negative.\n* Choice B ($-\\dfrac{8}{125}$): treats the exponent's sign as the value's sign and skips the reciprocal.\n* Choice C ($\\dfrac{8}{125}$): cubes $\\dfrac25$ directly, ignoring the negative exponent.\n\n**Test Day Takeaway:** A negative exponent moves a factor across the fraction bar; the sign of the value never changes.",
      skills: ["zero-negative-exponents"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The gain of a star tracker's amplifier is $\\dfrac{\\sqrt{x^{9}}}{x^{-3/2}}$, where the aperture setting $x$ is a positive number of millimeters. Which expression is equivalent to that gain?",
      choices: [
        // distractor: subtracts 3/2 instead of adding it
        { id: "A", text: "$x^{3}$" },
        { id: "B", text: "$x^{6}$" },
        // distractor: reads the denominator's exponent as -3 rather than -3/2
        { id: "C", text: "$x^{15/2}$" },
        // distractor: drops the square root and uses x^9 in the numerator
        { id: "D", text: "$x^{21/2}$" }
      ],
      correctAnswer: "B",
      hint: "Both parts of the quotient can be written as powers of $x$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** $\\sqrt{x^{9}} = x^{9/2}$, and dividing by $x^{-3/2}$ adds $\\dfrac32$, giving $x^{6}$.\n\n**The Full Solution:**\nStep 1: Rewrite the root as a fractional exponent: $\\sqrt{x^{9}} = x^{9/2}$.\nStep 2: Dividing by a power subtracts its exponent: $x^{9/2 - (-3/2)}$.\nStep 3: Simplify: $\\dfrac92 + \\dfrac32 = 6$, so the gain is $x^{6}$. Check at $x = 4$: $\\sqrt{4^{9}} = 2^{9} = 512$ and $4^{-3/2} = \\dfrac18$, so the quotient is $4096 = 4^{6}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($x^{3}$): subtracts $\\dfrac32$ instead of adding it, ignoring the minus sign already in the denominator.\n* Choice C ($x^{15/2}$): reads the denominator's exponent as $-3$, giving $\\dfrac92 + 3$.\n* Choice D ($x^{21/2}$): leaves the numerator as $x^{9}$, forgetting the square root, and adds $\\dfrac32$.\n\n**Test Day Takeaway:** Turn every root into a fractional exponent first; then one subtraction finishes the problem.",
      skills: ["exponent-laws"]
    }
  ],

  // Section: Comparing Exponential Expressions
  "Comparing Exponential Expressions": [
    {
      id: 1,
      difficulty: "easy",
      question: "Each of the following expressions is a power of a positive integer. Which of these expressions has the greatest value?",
      choices: [
        // distractor: picks the largest exponent
        { id: "A", text: "$2^5$" },
        { id: "B", text: "$3^4$" },
        // distractor: assumes a larger base wins
        { id: "C", text: "$4^3$" },
        // distractor: compares base times exponent
        { id: "D", text: "$7^2$" }
      ],
      correctAnswer: "B",
      hint: "None of these is hard to evaluate — evaluate all four before choosing.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $2^5 = 32$, $3^4 = 81$, $4^3 = 64$, and $7^2 = 49$, so $3^4$ is the largest.\n\n**The Full Solution:**\nStep 1: Evaluate each power: $2^5 = 32$ and $3^4 = 81$.\nStep 2: Evaluate the rest: $4^3 = 64$ and $7^2 = 49$.\nStep 3: Compare $32$, $81$, $64$, and $49$; the greatest is $81$, so the answer is $3^4$. Check: $81 > 64$, the nearest competitor.\n\n**Why the wrong answers are tempting:**\n* Choice A ($2^5 = 32$): picks the expression with the largest exponent, but the smallest base holds it back.\n* Choice C ($4^3 = 64$): assumes a larger base beats a larger exponent and stops before checking $3^4$.\n* Choice D ($7^2 = 49$): compares $b \\times n$ instead of $b^n$; $7 \\times 2 = 14$ is the largest such product, but the value is not.\n\n**Test Day Takeaway:** Neither the base nor the exponent alone decides the size of a power. When the numbers are small, just compute all four.",
      skills: ["comparing-exponentials"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A star's brightness measures $2^{12}$ units at one wavelength and $8^{3}$ units at another. Which expression is equivalent to the quotient $\\dfrac{2^{12}}{8^{3}}$ of those two measurements?",
      choices: [
        { id: "A", text: "$2^{3}$" },
        // distractor: computes 12 - 8, using the base 8 as though it were an exponent
        { id: "B", text: "$2^{4}$" },
        // distractor: reports the rewritten denominator 2^9
        { id: "C", text: "$2^{9}$" },
        // distractor: multiplies 12 by 3 instead of subtracting the exponents
        { id: "D", text: "$2^{36}$" }
      ],
      correctAnswer: "A",
      hint: "The two bases are not the same yet.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $8^3 = 2^9$, so the quotient is $2^{12 - 9} = 2^3$.\n\n**The Full Solution:**\nStep 1: Write the denominator with base $2$: $8 = 2^3$, so $8^3 = (2^3)^3 = 2^9$.\nStep 2: The quotient is now $\\dfrac{2^{12}}{2^{9}}$.\nStep 3: Subtract the exponents: $2^{12 - 9} = 2^3$. Check: $\\dfrac{4096}{512} = 8 = 2^3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($2^4$): subtracts $12 - 8$, treating the base $8$ as an exponent.\n* Choice C ($2^9$): reports the rewritten denominator instead of the quotient.\n* Choice D ($2^{36}$): multiplies $12$ by $3$, the rule for a power of a power, not for division.\n\n**Test Day Takeaway:** Matching bases comes before any exponent rule can be applied.",
      skills: ["comparing-exponentials", "exponent-laws"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A relay's transmitted pulse attenuates by the factor $\\left(\\dfrac{1}{8}\\right)^{x}$ after crossing $x$ shielding layers, and that factor equals $2^{k}$ for every $x$. Which expression gives $k$?",
      choices: [
        { id: "A", text: "$-3x$" },
        // distractor: writes 1/8 as 2 to the power -1/3
        { id: "B", text: "$-\\dfrac{x}{3}$" },
        // distractor: writes 1/8 as 2 to the power 1/3, losing the negative sign
        { id: "C", text: "$\\dfrac{x}{3}$" },
        // distractor: ignores that the base is a reciprocal
        { id: "D", text: "$3x$" }
      ],
      correctAnswer: "A",
      hint: "A reciprocal can be carried in the exponent.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** $\\dfrac{1}{8} = 2^{-3}$, so the factor is $\\left(2^{-3}\\right)^{x} = 2^{-3x}$ and $k = -3x$.\n\n**The Full Solution:**\nStep 1: Write the base as a power of $2$: $\\dfrac{1}{8} = \\dfrac{1}{2^3} = 2^{-3}$.\nStep 2: Raise it to the $x$: $\\left(2^{-3}\\right)^{x} = 2^{-3x}$.\nStep 3: Matching exponents gives $k = -3x$. Check at $x = 1$: $\\dfrac18 = 2^{-3}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-\\dfrac{x}{3}$): writes $\\dfrac18$ as $2^{-1/3}$, confusing a cube root with a cube.\n* Choice C ($\\dfrac{x}{3}$): makes the same root error and also loses the negative sign.\n* Choice D ($3x$): treats the base as $8$ rather than $\\dfrac18$, dropping the reciprocal.\n\n**Test Day Takeaway:** A reciprocal base becomes a negative exponent, and the outer exponent then multiplies it.",
      skills: ["comparing-exponentials"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "An observatory logs $2^{30}$ frames on one night and $4^{16}$ frames on another. Which statement correctly compares the two totals?",
      choices: [
        // distractor: compares the exponents 30 and 16 directly without matching bases
        { id: "A", text: "$2^{30}$ is greater than $4^{16}$." },
        // distractor: reads the exponent gap 32 - 30 = 2 as the ratio
        { id: "B", text: "$4^{16}$ is twice as large as $2^{30}$." },
        { id: "C", text: "$4^{16}$ is four times as large as $2^{30}$." },
        // distractor: assumes doubling the base exactly offsets halving the exponent
        { id: "D", text: "The two expressions are equal." }
      ],
      correctAnswer: "C",
      hint: "The bases $2$ and $4$ are not independent of each other.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $4^{16} = 2^{32}$, and $2^{32} = 2^2 \\cdot 2^{30} = 4 \\cdot 2^{30}$.\n\n**The Full Solution:**\nStep 1: Write both with base $2$: $4 = 2^2$, so $4^{16} = (2^2)^{16} = 2^{32}$.\nStep 2: Compare $2^{32}$ with $2^{30}$ by dividing: $\\dfrac{2^{32}}{2^{30}} = 2^{2} = 4$.\nStep 3: So $4^{16}$ is four times $2^{30}$. Check: $2^{30} = 1{,}073{,}741{,}824$ and $4 \\times$ that is $4^{16}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: compares $30$ with $16$ directly, which is only valid when the bases match.\n* Choice B: reports the exponent gap $32 - 30 = 2$ as if it were the ratio.\n* Choice D: assumes squaring the base cancels halving the exponent, which would require $4^{15}$.\n\n**Test Day Takeaway:** Rewrite to a common base, then the exponents alone decide the comparison.",
      skills: ["comparing-exponentials", "exponent-laws"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A photon counter shows $9^{9}$ counts at station $M$ and $3^{14}$ counts at station $N$. Station $M$'s count is how many times station $N$'s count?",
      choices: [
        // distractor: divides station N's count by station M's, inverting the ratio
        { id: "A", text: "$\\dfrac{1}{81}$" },
        // distractor: reports the exponent difference 18 - 14 = 4 rather than 3 to that power
        { id: "B", text: "$4$" },
        { id: "C", text: "$81$" },
        // distractor: computes 9^4 instead of 3^4
        { id: "D", text: "$6561$" }
      ],
      correctAnswer: "C",
      hint: "Look for a base that both counts share.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** $9^{9} = 3^{18}$, so the ratio is $3^{18 - 14} = 3^{4} = 81$.\n\n**The Full Solution:**\nStep 1: Write station $M$'s count with base $3$: $9 = 3^2$, so $9^{9} = 3^{18}$.\nStep 2: Divide by station $N$'s count: $\\dfrac{3^{18}}{3^{14}} = 3^{18 - 14} = 3^{4}$.\nStep 3: Evaluate: $3^4 = 81$. Check: $81 \\cdot 3^{14} = 3^{18} = 9^{9}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\dfrac{1}{81}$): divides $N$ by $M$, answering the reverse comparison.\n* Choice B ($4$): reports the exponent difference instead of $3$ raised to it.\n* Choice D ($6561$): raises $9$ to the fourth power, using the original base instead of the shared base $3$.\n\n**Test Day Takeaway:** Convert to one base before dividing; the exponent difference is a power, not the answer itself.",
      skills: ["comparing-exponentials", "exponent-laws"]
    }
  ],

  // Section: Exponential Functions
  "Exponential Functions": [
    {
      id: 1,
      difficulty: "easy",
      question: "The table lists a yeast culture's mass $f(x)$, in grams, after $x$ hours. Which equation defines $f$?",
      questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$0$", "$5$"], ["$1$", "$15$"], ["$2$", "$45$"], ["$3$", "$135$"]] },
      choices: [
        { id: "A", text: "$f(x) = 5(3)^x$" },
        // distractor: uses the difference 15 - 5 = 10 as the growth factor
        { id: "B", text: "$f(x) = 5(10)^x$" },
        // distractor: swaps the starting mass and the growth factor
        { id: "C", text: "$f(x) = 3(5)^x$" },
        // distractor: uses the mass at x = 1 as the starting mass
        { id: "D", text: "$f(x) = 15(3)^x$" }
      ],
      correctAnswer: "A",
      hint: "Look at what each mass is multiplied by to reach the next one.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The mass starts at $5$ and triples each hour, so $f(x) = 5(3)^x$.\n\n**The Full Solution:**\nStep 1: At $x = 0$ the mass is $5$ grams, so the coefficient in front is $5$.\nStep 2: Each hour the mass multiplies by the same factor: $\\dfrac{15}{5} = 3$, $\\dfrac{45}{15} = 3$, $\\dfrac{135}{45} = 3$.\nStep 3: An exponential with start $5$ and factor $3$ is $f(x) = 5(3)^x$. Check at $x = 3$: $5(27) = 135$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($5(10)^x$): uses the first difference $15 - 5 = 10$ as the factor, which would give $50$ at $x = 1$.\n* Choice C ($3(5)^x$): swaps the starting mass and the growth factor, giving $3$ grams at $x = 0$.\n* Choice D ($15(3)^x$): starts from the mass at $x = 1$, so every value is three times too large.\n\n**Test Day Takeaway:** In a table with equal time steps, divide consecutive outputs — a constant quotient means exponential.",
      skills: ["exponential-growth-decay"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The table gives the number of cells in a laboratory culture at three times, where $t$ is the number of hours since the culture was prepared. The number of cells triples every hour. How many cells are in the culture when $t = 5$?",
      diagram: { type: "table", params: { xHeader: "t (hours)", yHeader: "Number of cells", rows: [["0", "40"], ["1", "120"], ["2", "360"]] } },
      choices: [
        // distractor: treats the growth as linear
        { id: "A", text: "$600$" },
        // distractor: uses four triplings
        { id: "B", text: "$3{,}240$" },
        { id: "C", text: "$9{,}720$" },
        // distractor: uses six triplings
        { id: "D", text: "$29{,}160$" }
      ],
      correctAnswer: "C",
      hint: "Count how many triplings separate $t = 0$ from $t = 5$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** Five triplings from $40$ give $40 \\cdot 3^5 = 40(243) = 9{,}720$ cells.\n\n**The Full Solution:**\nStep 1: The table starts at $40$ cells when $t = 0$, and each hour multiplies the count by $3$.\nStep 2: After $t$ hours the count is $40(3)^t$; the table confirms this, since $40(3)^2 = 360$.\nStep 3: At $t = 5$: $40(3)^5 = 40(243) = 9{,}720$ cells. Check: continuing the table gives $1{,}080$, then $3{,}240$, then $9{,}720$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($600$): multiplies $40$ by $3$ and then by the $5$ hours, treating tripling as a constant hourly increase.\n* Choice B ($3{,}240$): uses four triplings, $40(3)^4$, stopping one hour early.\n* Choice D ($29{,}160$): uses six triplings, $40(3)^6$, counting one hour too many.\n\n**Test Day Takeaway:** In exponential growth the exponent counts the periods, not the total. Anchor at $t = 0$ and count the steps.",
      skills: ["exponential-growth-decay"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The table gives the value $v$, in dollars, of a printing machine $t$ years after it was purchased. Which of the following equations gives the relationship between $v$ and $t$?",
      diagram: { type: "dataTable", params: { headers: ["Years after purchase, t", "Value v (dollars)"], rows: [["0", "6,400"], ["1", "4,800"], ["2", "3,600"], ["3", "2,700"]] } },
      choices: [
        // distractor: uses the first drop as a constant rate
        { id: "A", text: "$v = 6{,}400 - 1{,}600t$" },
        // distractor: uses the percent lost as the multiplier
        { id: "B", text: "$v = 6{,}400(0.25)^t$" },
        { id: "C", text: "$v = 6{,}400(0.75)^t$" },
        // distractor: models growth instead of decay
        { id: "D", text: "$v = 6{,}400(1.25)^t$" }
      ],
      correctAnswer: "C",
      hint: "Check whether the values fall by a fixed amount each year or by a fixed factor.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** Each value is $0.75$ times the one before it and the starting value is $6{,}400$, so $v = 6{,}400(0.75)^t$.\n\n**The Full Solution:**\nStep 1: The drops are $1{,}600$, then $1{,}200$, then $900$ — not constant, so the relationship is not linear.\nStep 2: The ratios are $\\frac{4{,}800}{6{,}400} = 0.75$, $\\frac{3{,}600}{4{,}800} = 0.75$, and $\\frac{2{,}700}{3{,}600} = 0.75$, a constant decay factor.\nStep 3: With $v = 6{,}400$ at $t = 0$, the model is $v = 6{,}400(0.75)^t$. Check at $t = 3$: $6{,}400(0.75)^3 = 6{,}400(0.421875) = 2{,}700$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($v = 6{,}400 - 1{,}600t$): uses the first year's drop of $1{,}600$ as a constant rate, but the second year's drop is $1{,}200$.\n* Choice B ($v = 6{,}400(0.25)^t$): uses the $25\\%$ lost each year as the multiplier instead of the $75\\%$ that remains, which would leave $1{,}600$ after one year.\n* Choice D ($v = 6{,}400(1.25)^t$): adds the $25\\%$ change instead of subtracting it, which would make the machine gain value.\n\n**Test Day Takeaway:** Test differences and ratios before choosing a model, and remember that the base of a decay model is what remains, not what is lost.",
      skills: ["exponential-growth-decay"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The function $g$ is exponential, $g(2) = 45$, and the value of $g$ is multiplied by $3$ for every increase of $1$ in $x$. What is the $y$-intercept of the graph of $y = g(x)$ in the $xy$-plane?",
      choices: [
        { id: "A", text: "$(0, 5)$" },
        // distractor: divides by 3 only once
        { id: "B", text: "$(0, 15)$" },
        // distractor: subtracts 3 instead of dividing
        { id: "C", text: "$(0, 42)$" },
        // distractor: reports g of 2
        { id: "D", text: "$(0, 45)$" }
      ],
      correctAnswer: "A",
      hint: "Walk backwards from $x = 2$ to $x = 0$, one step at a time.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** Going backwards divides by $3$ each step: $g(1) = 15$ and $g(0) = 5$, so the $y$-intercept is $(0, 5)$.\n\n**The Full Solution:**\nStep 1: The $y$-intercept is the point where $x = 0$, so the question asks for $g(0)$.\nStep 2: Each increase of $1$ in $x$ multiplies the value by $3$, so each decrease of $1$ divides it by $3$: $g(1) = \\frac{45}{3} = 15$.\nStep 3: One more step back gives $g(0) = \\frac{15}{3} = 5$, so the $y$-intercept is $(0, 5)$. Check: $g(x) = 5(3)^x$ gives $g(2) = 5(9) = 45$.\n\n**Why the wrong answers are tempting:**\n* Choice B ($(0, 15)$): divides by $3$ once and reports $g(1)$ instead of $g(0)$.\n* Choice C ($(0, 42)$): subtracts $3$ from $45$, treating the growth as additive rather than multiplicative.\n* Choice D ($(0, 45)$): reports the given value $g(2)$ as if it were the intercept.\n\n**Test Day Takeaway:** The $y$-intercept of an exponential function is its value at $x = 0$. Step backwards by dividing by the growth factor once per unit.",
      skills: ["exponential-y-intercept"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A sample of a radioactive material loses $12\\%$ of its mass every $6$ years. If the sample has a mass of $500$ grams today, which of the following expressions gives its mass, in grams, $t$ years from now?",
      choices: [
        // distractor: uses the percent lost as the factor
        { id: "A", text: "$500(0.12)^{\\frac{t}{6}}$" },
        // distractor: multiplies the time by 6
        { id: "B", text: "$500(0.88)^{6t}$" },
        { id: "C", text: "$500(0.88)^{\\frac{t}{6}}$" },
        // distractor: ignores the 6-year period
        { id: "D", text: "$500(0.88)^t$" }
      ],
      correctAnswer: "C",
      hint: "The exponent has to count how many $6$-year periods have gone by.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~45s):** Losing $12\\%$ leaves $88\\%$, and $t$ years contain $\\frac{t}{6}$ six-year periods, so the mass is $500(0.88)^{\\frac{t}{6}}$.\n\n**The Full Solution:**\nStep 1: After one $6$-year period, $100\\% - 12\\% = 88\\%$ of the mass remains, so the decay factor per period is $0.88$.\nStep 2: In $t$ years the number of complete $6$-year periods is $\\frac{t}{6}$, and that count is the exponent.\nStep 3: The mass is $500(0.88)^{\\frac{t}{6}}$ grams. Check at $t = 6$: the expression gives $500(0.88)^1 = 440$ grams, which is $12\\%$ less than $500$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($500(0.12)^{\\frac{t}{6}}$): uses the $12\\%$ lost as the decay factor, which would erase almost the entire sample in a single period.\n* Choice B ($500(0.88)^{6t}$): multiplies the time by $6$, packing six periods of decay into every year.\n* Choice D ($500(0.88)^t$): ignores the $6$-year period and applies the $12\\%$ loss once per year.\n\n**Test Day Takeaway:** In an exponential model the base is what remains after one period, and the exponent is time divided by the length of that period.",
      skills: ["exponential-growth-decay"]
    }
  ]
};
