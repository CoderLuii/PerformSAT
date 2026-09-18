// Practice questions for Functions module
// Questions are organized by SECTION (question type)

export const functionsQuestions = {
  // Section: Fundamentals
  "Fundamentals": [
    {
      id: 1,
      difficulty: "easy",
      question: "A machine's total setup time, in minutes, for $x$ parts is given by $g(x) = 8x + 13$. What is the value of $g(6)$?",
      choices: [
        // distractor: subtracts the constant instead of adding it
        { id: "A", text: "$35$" },
        { id: "B", text: "$61$" },
        // distractor: multiplies 13 by 8 and adds the input
        { id: "C", text: "$110$" },
        // distractor: adds before multiplying
        { id: "D", text: "$152$" }
      ],
      correctAnswer: "B",
      hint: "Replace every $x$ in the rule with $6$, then multiply before you add.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** Substitute $6$ for $x$: $8(6) + 13 = 48 + 13 = 61$.\n\n**The Full Solution:**\nStep 1: The notation $g(6)$ asks for the output of $g$ when the input is $6$, so replace $x$ with $6$ in $g(x) = 8x + 13$.\nStep 2: Multiply first: $8(6) = 48$.\nStep 3: Add the constant: $48 + 13 = 61$. Check by reversing the steps: $61 - 13 = 48$, and $48 \\div 8 = 6$, the input. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($35$): subtracts the constant instead of adding it, giving $48 - 13$.\n* Choice C ($110$): multiplies the constant by $8$ and then adds the input, giving $8(13) + 6$.\n* Choice D ($152$): adds inside the parentheses first, giving $8(6 + 13)$, which ignores order of operations.\n\n**Test Day Takeaway:** $g(6)$ means substitute $6$ for the variable everywhere it appears, then follow order of operations — multiplication before addition.",
      skills: ["function-evaluation", "function-notation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A cannery charges $C(w) = 4w + 12$ dollars to process a delivery of $w$ kilograms of fruit, where the fixed part of the charge covers setup. What is the value of $C(9)$?",
      choices: [
        // distractor: adds 9 + 12 and never multiplies by 4
        { id: "A", text: "$21$" },
        // distractor: computes 4(9) and drops the 12
        { id: "B", text: "$36$" },
        { id: "C", text: "$48$" },
        // distractor: multiplies the whole expression, computing (4 + 12)(9)
        { id: "D", text: "$144$" }
      ],
      correctAnswer: "C",
      hint: "The number in parentheses takes the place of $w$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** $C(9) = 4(9) + 12 = 48$.\n\n**The Full Solution:**\nStep 1: $C(9)$ means substitute $w = 9$ into $4w + 12$.\nStep 2: Multiply first: $4(9) = 36$.\nStep 3: Add the fixed charge: $36 + 12 = 48$ dollars. Check: nine kilograms at \\$4 each is \\$36, plus the \\$12 base ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($21$): adds $9 + 12$ and skips the rate entirely.\n* Choice B ($36$): computes $4(9)$ and forgets the $12$.\n* Choice D ($144$): multiplies the entire expression by $9$, as if the $12$ were also charged per kilogram.\n\n**Test Day Takeaway:** Function notation is a substitution instruction: replace the variable, then follow the order of operations.",
      skills: ["function-evaluation", "function-notation"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A calibration line is $f(x) = kx - 7$ for a constant $k$, and the reading at $x = 4$ equals $13$. What is the reading at $x = 1$?",
      choices: [
        // distractor: reports f(0) = -7 instead of f(1)
        { id: "A", text: "$-7$" },
        { id: "B", text: "$-2$" },
        // distractor: reports the constant k = 5 rather than a reading
        { id: "C", text: "$5$" },
        // distractor: repeats the given reading 13
        { id: "D", text: "$13$" }
      ],
      correctAnswer: "B",
      hint: "Find $k$ from the reading you are given before doing anything else.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** $4k - 7 = 13$ gives $k = 5$, so $f(1) = 5 - 7 = -2$.\n\n**The Full Solution:**\nStep 1: Substitute the known reading: $f(4) = 4k - 7 = 13$.\nStep 2: Solve for the constant: $4k = 20$, so $k = 5$.\nStep 3: Evaluate at the new input: $f(1) = 5(1) - 7 = -2$. Check: $f(4) = 5(4) - 7 = 13$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): evaluates at $x = 0$, which returns the constant term instead of $f(1)$.\n* Choice C ($5$): reports $k$, the slope, rather than a reading.\n* Choice D ($13$): repeats the reading that was given at $x = 4$.\n\n**Test Day Takeaway:** One known input-output pair pins down an unknown coefficient; only then can another input be evaluated.",
      skills: ["function-evaluation", "function-notation", "finding-function-from-conditions"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The depth of brine in a curing tank, in centimeters, $t$ minutes after a drain valve opens is modeled by $h(t) = 40 - 8t$. Which statement is the best interpretation of $h(3) = 16$?",
      choices: [
        { id: "A", text: "The depth is $16$ centimeters $3$ minutes after the valve opens." },
        // distractor: reads the output as the change in depth, which is actually 24 centimeters
        { id: "B", text: "The depth falls $16$ centimeters during the first $3$ minutes." },
        // distractor: swaps the input and the output
        { id: "C", text: "The depth is $3$ centimeters $16$ minutes after the valve opens." },
        // distractor: reads the input 3 as the rate, which is really 8 centimeters per minute
        { id: "D", text: "The depth falls $3$ centimeters each minute." }
      ],
      correctAnswer: "A",
      hint: "Which number is the minute count and which is the depth?",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** The input $3$ is a time and the output $16$ is a depth, so at $3$ minutes the depth is $16$ centimeters.\n\n**The Full Solution:**\nStep 1: In $h(t)$ the input $t$ is the number of minutes since the valve opened.\nStep 2: The output $h(t)$ is the depth in centimeters at that moment.\nStep 3: So $h(3) = 16$ says the depth is $16$ centimeters at $t = 3$. Check: $40 - 8(3) = 16$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: reads the output as a drop, but the depth has fallen $40 - 16 = 24$ centimeters by then.\n* Choice C: swaps the input and output, reading $3$ as a depth and $16$ as a time.\n* Choice D: treats the input as a rate; the rate is the coefficient $8$ centimeters per minute.\n\n**Test Day Takeaway:** Attach the units to the input and the output first, and the interpretation writes itself.",
      skills: ["function-notation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A wind tunnel's pressure-difference model $P(t) = \\dfrac{600}{t^2 - 9t}$ gives the difference, in pascals, between two ports $t$ seconds after a fan step change. For which values of $t$ is $P$ undefined?",
      choices: [
        // distractor: solves only the factor t = 0 and stops
        { id: "A", text: "$0$ only" },
        // distractor: reads the denominator as t^2 - 9 instead of t^2 - 9t
        { id: "B", text: "$3$ and $-3$" },
        { id: "C", text: "$0$ and $9$" },
        // distractor: solves only the factor t - 9 = 0
        { id: "D", text: "$9$ only" }
      ],
      correctAnswer: "C",
      hint: "Where can a quotient fail to have a value at all?",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $t^2 - 9t = t(t - 9)$, which is zero at $t = 0$ and $t = 9$.\n\n**The Full Solution:**\nStep 1: A quotient is undefined exactly where its denominator equals zero.\nStep 2: Factor the denominator: $t^2 - 9t = t(t - 9)$.\nStep 3: A product is zero when either factor is, so $t = 0$ or $t = 9$. Check: $0^2 - 9(0) = 0$ and $9^2 - 9(9) = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$ only): stops after the first factor and misses $t - 9$.\n* Choice B ($3$ and $-3$): treats the denominator as the difference of squares $t^2 - 9$.\n* Choice D ($9$ only): solves the second factor and overlooks that $t$ itself can be zero.\n\n**Test Day Takeaway:** Factor the denominator completely — every factor that can vanish removes a value from the domain.",
      skills: ["domain-restrictions", "function-notation"]
    }
  ],

  // Section: Simple Function Problems
  "Simple Function Problems": [
    {
      id: 1,
      difficulty: "easy",
      question: "A district media center models weekly audiobook holds by $h(w)=45+8w$ and staff shelving time in minutes by $m(h)=3h+20$, where $w$ is the number of weeks since a new catalog launched. What is the value of $m(h(4))$?",
      choices: [
        // distractor: evaluates the outer function at 4, giving m(4)=32
        { id: "A", text: "$32$" },
        // distractor: stops at the inner value h(4)=77
        { id: "B", text: "$77$" },
        { id: "C", text: "$251$" },
        // distractor: composes in the wrong order, h(m(4))=h(32)=301
        { id: "D", text: "$301$" }
      ],
      correctAnswer: "C",
      hint: "Work from the inside out: the output of $h$ is the input of $m$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $h(4)=45+32=77$, and $m(77)=3(77)+20=251$.\n\n**The Full Solution:**\n\nStep 1: Evaluate the inner function. $h(4)=45+8(4)=45+32=77$ holds.\n\nStep 2: Feed that output into $m$. $m(77)=3(77)+20=231+20=251$ minutes.\n\nStep 3: Confirm the order. $m(h(4))$ means \"apply $h$, then $m$,\" so $251$ is the shelving time.\n\nCheck: $251$ minutes for $77$ holds is $3$ minutes each plus a fixed $20$, which matches $m$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($32$): evaluates the outer function at $4$, giving $m(4)=3(4)+20=32$, and never uses $h$.\n* Choice B ($77$): stops at the inner value $h(4)=77$ instead of substituting it into $m$.\n* Choice D ($301$): composes in the wrong order, computing $h(m(4))=h(32)=45+8(32)=301$.\n\n**Test Day Takeaway:** In $m(h(4))$, the inner function runs first; its output becomes the input of the outer function.",
      skills: ["function-composition", "function-evaluation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The function $k$ is defined by $k(x) = 6x + 5$, where $x$ is a real number. Which of the following is equivalent to $k(x - 2)$?",
      choices: [
        // distractor: drops the constant +5
        { id: "A", text: "$6x - 12$" },
        { id: "B", text: "$6x - 7$" },
        // distractor: subtracts 2 from the constant instead of substituting
        { id: "C", text: "$6x + 3$" },
        // distractor: flips the sign inside the input
        { id: "D", text: "$6x + 17$" }
      ],
      correctAnswer: "B",
      hint: "Substitute the whole quantity $x - 2$ wherever $x$ appears, then distribute before combining constants.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** $k(x - 2) = 6(x - 2) + 5 = 6x - 12 + 5 = 6x - 7$.\n\n**The Full Solution:**\nStep 1: The input of $k$ is now the expression $x - 2$, so write $k(x - 2) = 6(x - 2) + 5$.\nStep 2: Distribute the $6$ across both terms: $6(x - 2) = 6x - 12$.\nStep 3: Combine the constants: $6x - 12 + 5 = 6x - 7$. Check at $x = 3$: $k(1) = 6(1) + 5 = 11$, and $6(3) - 7 = 11$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6x - 12$): distributes correctly but drops the $+5$ from the original rule.\n* Choice C ($6x + 3$): subtracts $2$ from the constant term instead of substituting, giving $5 - 2 = 3$.\n* Choice D ($6x + 17$): substitutes $x + 2$, flipping the sign inside the input, and gets $6x + 12 + 5$.\n\n**Test Day Takeaway:** When the input is an expression, put it in parentheses and distribute; only the variable is replaced, never the constant term.",
      skills: ["function-evaluation", "function-transformations"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The table gives the values of the linear functions $f$ and $g$ at three values of $x$. Which expression is equivalent to $f(x) + g(x)$?",
      diagram: { type: "dataTable", params: { headers: ["x", "f(x)", "g(x)"], rows: [["1", "7", "8"], ["2", "10", "7"], ["3", "13", "6"]] } },
      choices: [
        // distractor: keeps only f's intercept
        { id: "A", text: "$2x + 4$" },
        { id: "B", text: "$2x + 13$" },
        // distractor: uses the value at x = 1 as the intercept
        { id: "C", text: "$2x + 15$" },
        // distractor: adds slope magnitudes, ignoring g's sign
        { id: "D", text: "$4x + 13$" }
      ],
      correctAnswer: "B",
      hint: "Add the two outputs at each $x$ first, then find the line that fits those three sums.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The sums are $15$, $17$, $19$ — a rise of $2$ per step — so the sum is $2x + 13$.\n\n**The Full Solution:**\nStep 1: Add the two table values at each input: $7 + 8 = 15$, $10 + 7 = 17$, and $13 + 6 = 19$.\nStep 2: The inputs go up by $1$ and the sums go up by $2$, so the sum function is linear with slope $2$.\nStep 3: Back up one step from $x = 1$: at $x = 0$ the sum would be $15 - 2 = 13$, so $f(x) + g(x) = 2x + 13$. Check at $x = 3$: $2(3) + 13 = 19$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x + 4$): finds the slope of the sum correctly but keeps only $f$'s $y$-intercept of $4$.\n* Choice C ($2x + 15$): uses the sum at $x = 1$ as the $y$-intercept without backing up to $x = 0$.\n* Choice D ($4x + 13$): adds the sizes of the two slopes, $3$ and $1$, ignoring that $g$ decreases.\n\n**Test Day Takeaway:** To add two linear functions, add their outputs column by column; the slopes add with their signs and so do the intercepts.",
      skills: ["function-evaluation", "function-notation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A print shop bills $c(n)=0.35n+k$ dollars for a batch of $n$ price labels, where the constant $k$ covers plate setup. Batches of $120$ labels are billed at $\\$61$. How many dollars does a batch of $500$ labels cost?",
      choices: [
        // distractor: sign slip: k = 42 - 61 = -19, giving 175 - 19 = 156
        { id: "A", text: "$156$" },
        // distractor: drops the setup fee and reports only 0.35(500) = 175
        { id: "B", text: "$175$" },
        { id: "C", text: "$194$" },
        // distractor: treats the given 61 as the setup fee, giving 175 + 61 = 236
        { id: "D", text: "$236$" }
      ],
      correctAnswer: "C",
      hint: "Use the one known batch to pin down $k$ before you evaluate anything else.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $k=61-0.35(120)=19$, so $c(500)=0.35(500)+19=194$.\n\n**The Full Solution:**\n\nStep 1: Substitute the known batch. $c(120)=0.35(120)+k=42+k$, and this equals $61$.\n\nStep 2: Solve for the setup fee. $42+k=61$ gives $k=19$ dollars.\n\nStep 3: Evaluate at $n=500$. $c(500)=0.35(500)+19=175+19=194$ dollars.\n\nCheck: $c(120)=42+19=61$, matching the given billing.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($156$): subtracts in the wrong direction, taking $k=42-61=-19$ and reporting $175-19=156$.\n* Choice B ($175$): computes only the per-label part, $0.35(500)=175$, and drops the setup fee.\n* Choice D ($236$): treats the given $\\$61$ itself as the setup fee, giving $175+61=236$.\n\n**Test Day Takeaway:** When a model carries an unknown constant, one supplied input-output pair is exactly what determines it.",
      skills: ["function-evaluation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The charge stored in a home battery, in kilowatt-hours, is modeled by $q(t)=at^{2}+bt+9$, where $t$ is the number of hours after midnight and $a$ and $b$ are constants. The battery holds $21$ kilowatt-hours at $t=2$ and $25$ kilowatt-hours at $t=4$. What is the value of $q(6)$?",
      choices: [
        // distractor: drops the constant term 9, reporting -36 + 48 = 12
        { id: "A", text: "$12$" },
        { id: "B", text: "$21$" },
        // distractor: evaluates at t = 5 instead of t = 6, giving 24
        { id: "C", text: "$24$" },
        // distractor: continues the arithmetic pattern 21, 25, 29 instead of using the model
        { id: "D", text: "$29$" }
      ],
      correctAnswer: "B",
      hint: "Two supplied readings give two equations in $a$ and $b$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~55s):** The two readings give $2a+b=6$ and $4a+b=4$, so $a=-1$ and $b=8$; then $q(6)=-36+48+9=21$.\n\n**The Full Solution:**\n\nStep 1: Substitute $t=2$. $4a+2b+9=21$, so $4a+2b=12$ and $2a+b=6$.\n\nStep 2: Substitute $t=4$. $16a+4b+9=25$, so $16a+4b=16$ and $4a+b=4$.\n\nStep 3: Subtract the first result from the second. $2a=-2$, so $a=-1$ and $b=6-2(-1)=8$. Then $q(6)=-1(36)+8(6)+9=-36+48+9=21$.\n\nCheck: $q(2)=-4+16+9=21$ and $q(4)=-16+32+9=25$, both as given.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($12$): finds $a=-1$ and $b=8$ but drops the constant term, reporting $-36+48=12$.\n* Choice C ($24$): evaluates the model at $t=5$ rather than $t=6$, giving $-25+40+9=24$.\n* Choice D ($29$): reads $21$ and $25$ as an arithmetic pattern and extends it to $29$, ignoring the quadratic model.\n\n**Test Day Takeaway:** Two input-output pairs pin down the two unknown coefficients; solve the system before evaluating anywhere else.",
      skills: ["function-evaluation", "finding-function-from-conditions"]
    }
  ],

  // Section: Complex Function Problems
  "Complex Function Problems": [
    {
      id: 1,
      difficulty: "easy",
      question: "The table shows the value of the function $f$ at four inputs. What is the value of $f(f(3))$?",
      diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["1", "3"], ["2", "5"], ["3", "4"], ["4", "1"]] } },
      choices: [
        { id: "A", text: "$1$" },
        // distractor: starts from x = 4 instead of x = 3
        { id: "B", text: "$3$" },
        // distractor: stops at the inner value f(3)
        { id: "C", text: "$4$" },
        // distractor: adds f(3) and f(4)
        { id: "D", text: "$5$" }
      ],
      correctAnswer: "A",
      hint: "Look up the inner output in the table first, then treat that number as a new input.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $f(3) = 4$, and the row for $4$ gives $f(4) = 1$.\n\n**The Full Solution:**\nStep 1: Read the inner value. The row with $x = 3$ shows $f(3) = 4$.\nStep 2: Replace the inside: $f(f(3)) = f(4)$.\nStep 3: Read $f(4)$ from the row with $x = 4$: $f(4) = 1$. Check the order — applying $f$ twice starting at $3$ gives $3 \\to 4 \\to 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($3$): starts from the wrong input and computes $f(f(4)) = f(1) = 3$.\n* Choice C ($4$): stops after the inner step and reports $f(3)$.\n* Choice D ($5$): adds the two table values $f(3) + f(4) = 4 + 1$ instead of composing them.\n\n**Test Day Takeaway:** With a table, composition is two lookups: find the inner output, then find that number in the input column.",
      skills: ["function-composition", "function-evaluation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A sensor adds $4$ to its input and then triples that sum before subtracting $1$. Which expression gives the sensor's output for an input of $x$?",
      choices: [
        // distractor: triples only the input, then adds 4 and subtracts 1
        { id: "A", text: "$3x + 3$" },
        // distractor: subtracts the 1 before tripling, giving 3(x + 3)
        { id: "B", text: "$3x + 9$" },
        { id: "C", text: "$3x + 11$" },
        // distractor: triples the sum but never subtracts the 1
        { id: "D", text: "$3x + 12$" }
      ],
      correctAnswer: "C",
      hint: "Follow the operations in the order the sensor performs them.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** The output is $3(x + 4) - 1 = 3x + 12 - 1 = 3x + 11$.\n\n**The Full Solution:**\nStep 1: Adding $4$ to the input gives $x + 4$.\nStep 2: Tripling that sum gives $3(x + 4) = 3x + 12$.\nStep 3: Subtracting $1$ leaves $3x + 11$. Check with an input of $2$: $2 + 4 = 6$, $3(6) = 18$, $18 - 1 = 17$, and $3(2) + 11 = 17$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3x + 3$): triples only the input and then adds $4$ and subtracts $1$, so the $4$ is never tripled.\n* Choice B ($3x + 9$): subtracts the $1$ before tripling, computing $3(x + 3)$.\n* Choice D ($3x + 12$): stops after tripling and never subtracts the $1$.\n\n**Test Day Takeaway:** In a chain of operations the later step applies to everything produced so far, so keep the parentheses until the end.",
      skills: ["function-composition"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A control unit applies $f(x) = 2x + 5$ to the output of an unknown function $g$, and the combined result is $6x - 1$ for every $x$. Which expression defines $g$?",
      choices: [
        { id: "A", text: "$3x - 3$" },
        // distractor: adds 5 instead of subtracting it before halving, giving (6x + 4)/2
        { id: "B", text: "$3x + 2$" },
        // distractor: subtracts the 5 but never divides by 2
        { id: "C", text: "$6x - 6$" },
        // distractor: divides only the constant term by 2
        { id: "D", text: "$6x - 3$" }
      ],
      correctAnswer: "A",
      hint: "Undo what $f$ does, one step at a time.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** $2g(x) + 5 = 6x - 1$ gives $2g(x) = 6x - 6$, so $g(x) = 3x - 3$.\n\n**The Full Solution:**\nStep 1: Applying $f$ to $g(x)$ means $2g(x) + 5$, and that equals $6x - 1$.\nStep 2: Subtract $5$ from both sides: $2g(x) = 6x - 6$.\nStep 3: Divide by $2$: $g(x) = 3x - 3$. Check at $x = 2$: $g(2) = 3$ and $f(3) = 11$, matching $6(2) - 1 = 11$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($3x + 2$): adds the $5$ instead of subtracting it, producing $\\dfrac{6x + 4}{2}$.\n* Choice C ($6x - 6$): removes the $5$ correctly but never divides by the coefficient $2$.\n* Choice D ($6x - 3$): divides only the constant by $2$ and leaves the $x$-term untouched.\n\n**Test Day Takeaway:** To recover the inner function, undo the outer function's operations in reverse order.",
      skills: ["function-composition", "finding-function-from-conditions"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The graph shown gives a gauge reading $h(x)$. A shifted reading is defined by $p(x) = h(x + 3)$. What is the value of $p(1)$?",
      diagram: { type: "linearGraph", params: { slope: -1, yIntercept: 5, xRange: [-3, 8], yRange: [-4, 8], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, showPoints: [[0, 5], [5, 0]], label: "y = h(x)" } },
      choices: [
        // distractor: evaluates h(7), adding the shift to the input twice
        { id: "A", text: "$-2$" },
        { id: "B", text: "$1$" },
        // distractor: evaluates h(1), ignoring the shift entirely
        { id: "C", text: "$4$" },
        // distractor: evaluates h(-2), subtracting the shift instead of adding it
        { id: "D", text: "$7$" }
      ],
      correctAnswer: "B",
      hint: "Decide which input of $h$ the value $p(1)$ actually asks for.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $p(1) = h(1 + 3) = h(4)$, and the graph gives $h(4) = 1$.\n\n**The Full Solution:**\nStep 1: From the graph, $h$ passes through $(0, 5)$ and $(5, 0)$, so $h(x) = -x + 5$.\nStep 2: The definition $p(x) = h(x + 3)$ means the input handed to $h$ is $1 + 3 = 4$.\nStep 3: Read or compute $h(4) = -4 + 5 = 1$, so $p(1) = 1$. Check: the graph passes through $(4, 1)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$): uses $h(7)$, adding the $3$ a second time.\n* Choice C ($4$): reads $h(1)$ straight off the graph and ignores the shift.\n* Choice D ($7$): uses $h(-2)$, subtracting the $3$ instead of adding it.\n\n**Test Day Takeaway:** $h(x + 3)$ asks $h$ about a larger input even though the graph moves to the left.",
      skills: ["function-transformations", "function-evaluation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A bacterial colony's population, in thousands of cells, is $f(x)$ after $x$ hours in an incubator, where $f(x + 1) = 2f(x)$ for every $x$ and $f(3) = 5$. Which expression is equal to $f(6)$?",
      choices: [
        // distractor: counts two steps from x = 3 to x = 6 instead of three
        { id: "A", text: "$5(2)^{2}$" },
        { id: "B", text: "$5(2)^{3}$" },
        // distractor: uses the step count as the base and the base as the exponent
        { id: "C", text: "$5(3)^{2}$" },
        // distractor: uses the input 6 as the number of doublings
        { id: "D", text: "$5(2)^{6}$" }
      ],
      correctAnswer: "B",
      hint: "Count how many single steps separate $x = 3$ from $x = 6$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Going from $x = 3$ to $x = 6$ takes three doublings, so $f(6) = 5(2)^{3}$.\n\n**The Full Solution:**\nStep 1: The rule doubles the value each time the input rises by $1$.\nStep 2: From $3$ to $6$ the input rises by $1$ three times, so the value doubles three times.\nStep 3: Therefore $f(6) = 5 \\cdot 2 \\cdot 2 \\cdot 2 = 5(2)^{3}$. Check step by step: $f(4) = 10$, $f(5) = 20$, $f(6) = 40$, and $5(2)^3 = 40$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5(2)^{2}$): counts only two doublings, which lands on $f(5) = 20$.\n* Choice C ($5(3)^{2}$): swaps the roles of the doubling factor and the step count.\n* Choice D ($5(2)^{6}$): uses the input $6$ as the number of doublings, ignoring that the count starts at $x = 3$.\n\n**Test Day Takeaway:** A recursive rule multiplies once per step, so count the steps between inputs, not the inputs themselves.",
      skills: ["function-evaluation", "finding-function-from-conditions"]
    }
  ]
};
