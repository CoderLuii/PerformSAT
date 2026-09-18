// Practice questions for Linear Equations module
// Questions are organized by SECTION (question type), not individual lessons

export const linearEquationsQuestions = {
  // Section: Deriving Equations (covers videos 7-11)
  // Types: From Context, From Graph (scatterplot), From Graph (line), From Table, From Function Notation
  "Deriving Equations": [
    // === FROM CONTEXT (slope and point given in words) ===
    {
      id: 1,
      difficulty: "easy",
      question: "A gym charges a one-time registration fee of \\$40 plus \\$18 for each month of membership. Which equation gives the total amount $A$, in dollars, paid for $m$ months of membership?",
      choices: [
        { id: "A", text: "$A = 18m + 40$" },
        { id: "B", text: "$A = 40m + 18$" },
        { id: "C", text: "$A = 58m$" },
        { id: "D", text: "$A = 18m - 40$" }
      ],
      correctAnswer: "A",
      hint: "One of the two amounts is charged again every month and the other is charged only once — that decides which one multiplies $m$.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** The \\$18 recurs, so it multiplies $m$; the \\$40 is paid once, so it is the constant: $A = 18m + 40$ — choice A.\n\n**The Full Solution:**\nStep 1: The membership charge is \\$18 for each month, so $m$ months contribute $18m$ dollars.\nStep 2: The registration fee is paid once no matter how long the membership lasts, so it is the constant term, $40$.\nStep 3: Combine the two: $A = 18m + 40$. Check $m = 3$: $18(3)+40 = 94$, which is the \\$40 fee plus three monthly charges of \\$18. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($A = 40m + 18$): swaps the two amounts, charging \\$40 every month and \\$18 only once.\n* Choice C ($A = 58m$): adds the two amounts before multiplying, so the \\$40 fee is charged every month along with the \\$18.\n* Choice D ($A = 18m - 40$): subtracts the registration fee; a fee raises the total paid, so it must be added.\n\n**Test Day Takeaway:** In a linear model the per-unit amount is the slope and the one-time amount is the constant. Substitute a small value like $m = 3$ and count the charges by hand to confirm you have not swapped them.",
      skills: ["word-problem-to-equation", "slope-intercept-form"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A seedling is $5$ centimeters tall when it is first measured, and it grows $2$ centimeters each week after that. Which equation gives the height $h$, in centimeters, of the seedling $w$ weeks after it is first measured?",
      choices: [
        { id: "A", text: "$h = 2w$" },
        { id: "B", text: "$h = 2w + 5$" },
        { id: "C", text: "$h = 5 - 2w$" },
        { id: "D", text: "$h = 5w + 2$" }
      ],
      correctAnswer: "B",
      hint: "At $w = 0$ the seedling already has a height — the equation has to produce that value.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** Growth of $2$ centimeters per week gives $2w$, and the seedling starts at $5$: $h = 2w + 5$ — choice B.\n\n**The Full Solution:**\nStep 1: The height at the first measurement corresponds to $w = 0$, so the constant term is $5$.\nStep 2: The seedling gains $2$ centimeters each week, so $w$ weeks add $2w$ centimeters.\nStep 3: Combine: $h = 2w + 5$. Check $w = 4$: $2(4)+5 = 13$ centimeters, which is $5$ plus four weeks of $2$-centimeter growth. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($h = 2w$): ignores the height at the first measurement, so the model starts the seedling at $0$ centimeters.\n* Choice C ($h = 5 - 2w$): subtracts the weekly growth, which would make the seedling shrink over time.\n* Choice D ($h = 5w + 2$): swaps the two numbers, treating $5$ centimeters as the weekly growth and $2$ centimeters as the starting height.\n\n**Test Day Takeaway:** Evaluate a candidate equation at the input $0$: whatever it returns should be the quantity described as the starting amount.",
      skills: ["word-problem-to-equation", "slope-intercept-form"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A delivery drone begins a flight with its battery at $96$ percent charge, and the charge decreases by $1.5$ percentage points for each minute of flight. Which equation gives the battery charge $c$, as a percent, after $t$ minutes of flight?",
      choices: [
        { id: "A", text: "$c = 96 - 1.5t$" },
        { id: "B", text: "$c = 96 - 15t$" },
        { id: "C", text: "$c = 1.5t + 96$" },
        { id: "D", text: "$c = 1.5t - 96$" }
      ],
      correctAnswer: "A",
      hint: "A quantity that falls at a steady rate has a negative rate of change; the starting value stays positive.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The charge starts at $96$ and falls $1.5$ points per minute: $c = 96 - 1.5t$ — choice A.\n\n**The Full Solution:**\nStep 1: At $t = 0$ the charge is $96$ percent, so the constant term is $96$.\nStep 2: The charge decreases, so the rate of change is negative: $-1.5$ percentage points per minute, contributing $-1.5t$.\nStep 3: Combine: $c = 96 - 1.5t$. Check $t = 10$: $96 - 15 = 81$ percent, a drop of $15$ points across $10$ minutes at $1.5$ points per minute. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($c = 96 - 15t$): reads the rate as $15$ percentage points per minute; the battery would then be empty after $6.4$ minutes.\n* Choice C ($c = 1.5t + 96$): uses the right numbers but adds, so the battery would gain charge during the flight.\n* Choice D ($c = 1.5t - 96$): reverses both roles, starting the battery at $-96$ percent and raising it.\n\n**Test Day Takeaway:** Read the direction of change before the size of it. A decreasing quantity forces a negative coefficient on the variable, never on the starting value.",
      skills: ["word-problem-to-equation", "slope-intercept-form"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "In a linear relationship between $x$ and $y$, each increase of $4$ in the value of $x$ corresponds to a decrease of $10$ in the value of $y$. When the value of $x$ is $6$, the value of $y$ is $1$. Which equation represents this relationship?",
      choices: [
        { id: "A", text: "$y = -10x + 61$" },
        { id: "B", text: "$y = -2.5x + 1$" },
        { id: "C", text: "$y = -2.5x + 16$" },
        { id: "D", text: "$y = 2.5x - 14$" }
      ],
      correctAnswer: "C",
      hint: "A drop of $10$ across a run of $4$ is not a rate of change until you divide.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $m = \\frac{-10}{4} = -2.5$, and $1 = -2.5(6)+b$ gives $b = 16$: $y = -2.5x + 16$ — choice C.\n\n**The Full Solution:**\nStep 1: The rate of change is the change in $y$ divided by the change in $x$: $m = \\frac{-10}{4} = -2.5$.\nStep 2: Substitute the given pair $(6, 1)$ into $y = -2.5x + b$: $1 = -15 + b$, so $b = 16$.\nStep 3: The equation is $y = -2.5x + 16$. Check by stepping $4$ units right from $x = 6$: at $x = 10$, $y = -25+16 = -9$, which is $10$ less than $1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -10x + 61$): uses the $10$-unit drop as the rate of change without dividing by the $4$-unit run; then $1 = -10(6)+b$ forces $b = 61$.\n* Choice B ($y = -2.5x + 1$): has the correct rate of change but treats the given value $y = 1$ as the value at $x = 0$; it occurs at $x = 6$.\n* Choice D ($y = 2.5x - 14$): makes the rate of change positive, so $y$ would rise as $x$ rises; then $1 = 2.5(6)+b$ forces $b = -14$.\n\n**Test Day Takeaway:** The phrase '$y$ drops $10$ for every $4$ that $x$ rises' describes a ratio, not a slope — divide first, then anchor the line with the given point.",
      skills: ["word-problem-to-equation", "slope-intercept-form"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A cable is wound onto a drum at a constant rate. After $4$ minutes of winding, $118$ meters of cable remain on the ground, and after $9$ minutes, $63$ meters remain. Which equation gives the number of meters $L$ of cable remaining on the ground after $t$ minutes of winding?",
      choices: [
        { id: "A", text: "$L = 118 - 11t$" },
        { id: "B", text: "$L = 162 - 55t$" },
        { id: "C", text: "$L = 162 - 11t$" },
        { id: "D", text: "$L = 162 + 11t$" }
      ],
      correctAnswer: "C",
      hint: "Neither reading happens at $t = 0$, so the constant term has to be recovered rather than read off.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** $55$ meters disappear over $5$ minutes, so the rate is $-11$; backing up $4$ minutes from $118$ gives $118 + 44 = 162$ at $t = 0$ — choice C.\n\n**The Full Solution:**\nStep 1: Rate of change: $\\frac{63 - 118}{9 - 4} = \\frac{-55}{5} = -11$ meters per minute.\nStep 2: Find the amount at $t = 0$ by substituting the first reading: $118 = -11(4)+b$, so $b = 118 + 44 = 162$ meters.\nStep 3: The equation is $L = 162 - 11t$. Check the second reading: $162 - 11(9) = 162 - 99 = 63$ meters. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($L = 118 - 11t$): finds the rate correctly but uses the $4$-minute reading, $118$, as the amount at $t = 0$.\n* Choice B ($L = 162 - 55t$): uses the total drop between the two readings, $55$ meters, as the per-minute rate instead of dividing by the $5$ elapsed minutes.\n* Choice D ($L = 162 + 11t$): uses a positive rate, which would pile cable onto the ground while the drum winds it up.\n\n**Test Day Takeaway:** Two readings at nonzero times give the rate directly, but the constant term still has to be back-solved. Verify with the reading you did not use to find it.",
      skills: ["word-problem-to-equation", "slope-intercept-form"]
    },

    // === FROM GRAPH (Scatterplot - find best-fit model) ===
    {
      id: 6,
      difficulty: "easy",
      question: "For each of six trials, a technician recorded the value of $x$ and the corresponding value of $y$. The scatterplot shows the results. Which equation is the most appropriate linear model for these data?",
      diagram: { type: "scatterplot", params: { points: [[1, 7], [2, 12], [3, 16], [4, 23], [5, 27], [6, 32]], xMin: 0, xMax: 7, yMin: 0, yMax: 35, xGridStep: 1, yGridStep: 5, yLabelStep: 10 } },
      choices: [
        { id: "A", text: "$y = 2x + 5$" },
        { id: "B", text: "$y = 5x + 2$" },
        { id: "C", text: "$y = 5x - 2$" },
        { id: "D", text: "$y = -5x + 2$" }
      ],
      correctAnswer: "B",
      hint: "Fix the sign of the rate of change from the direction of the trend, then read where the pattern would meet the vertical axis.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The points climb about $5$ units per step and, traced back to $x = 0$, land near $2$: $y = 5x + 2$ — choice B.\n\n**The Full Solution:**\nStep 1: The values rise as $x$ rises, so the rate of change is positive, which rules out the negative-slope choice.\nStep 2: Estimate the rate from the two end points, $(1, 7)$ and $(6, 32)$: $\\frac{32-7}{6-1} = \\frac{25}{5} = 5$.\nStep 3: Estimate the starting value: at $x = 1$ the data are near $7$, so at $x = 0$ they would be near $7 - 5 = 2$, a positive number.\nStep 4: That gives $y = 5x + 2$, which lands within a unit or two of every plotted point. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = 2x + 5$): swaps the rate of change and the starting value; at $x = 6$ it predicts $17$, while the data are near $32$.\n* Choice C ($y = 5x - 2$): has the right rate of change but a negative starting value; the trend traced back to $x = 0$ sits above the axis, not below it.\n* Choice D ($y = -5x + 2$): uses a negative rate of change, but the plotted values increase as $x$ increases.\n\n**Test Day Takeaway:** For a scatterplot model, settle the sign of the slope and the sign of the intercept first — that alone usually eliminates three of the four choices.",
      skills: ["graph-to-equation", "slope-from-points", "best-fit-line"]
    },
    {
      id: 7,
      difficulty: "medium",
      question: "The scatterplot shows the age, in years, and the resale value, in thousands of dollars, of each of eight delivery vans. Which equation is the most appropriate linear model for these data?",
      diagram: { type: "scatterplot", params: { points: [[1, 21], [2, 19], [3, 18], [4, 16], [5, 15], [6, 12], [7, 12], [8, 10]], xMin: 0, xMax: 9, yMin: 0, yMax: 24, xGridStep: 1, yGridStep: 2, yLabelStep: 4, xLabel: "Age (years)", yLabel: "Resale value (thousands of dollars)" } },
      choices: [
        { id: "A", text: "$y = -22x + 1.5$" },
        { id: "B", text: "$y = -1.5x - 22$" },
        { id: "C", text: "$y = -1.5x + 22$" },
        { id: "D", text: "$y = 1.5x + 10$" }
      ],
      correctAnswer: "C",
      hint: "Estimate the drop per year from the two ends of the trend, then ask what value the trend points to for a brand-new van.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** Value falls about $1.5$ thousand dollars per year and the trend reaches about $22$ at age $0$: $y = -1.5x + 22$ — choice C.\n\n**The Full Solution:**\nStep 1: Resale value falls as age rises, so the rate of change is negative.\nStep 2: Estimate it from the ends, $(1, 21)$ and $(8, 10)$: $\\frac{10-21}{8-1} = \\frac{-11}{7} \\approx -1.6$, close to $-1.5$.\nStep 3: At $x = 1$ the value is about $21$, so at $x = 0$ it would be about $21 + 1.5 = 22.5$, near $22$.\nStep 4: The model $y = -1.5x + 22$ predicts $10$ thousand dollars at age $8$, matching the plotted point. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -22x + 1.5$): swaps the rate of change and the starting value, so the model would lose $22$ thousand dollars of value each year.\n* Choice B ($y = -1.5x - 22$): has the right rate of change but a negative starting value; at age $1$ it predicts $-23.5$ thousand dollars.\n* Choice D ($y = 1.5x + 10$): uses a positive rate of change, which would mean older vans resell for more.\n\n**Test Day Takeaway:** Read the intercept as the value the model assigns at input $0$ — here, a brand-new van — and reject any model whose prediction there is impossible.",
      skills: ["graph-to-equation", "best-fit-line"]
    },
    {
      id: 8,
      difficulty: "hard",
      question: "The scatterplot shows the depth, in meters, and the water temperature, in degrees Celsius, at each of ten sampling sites in a lake, along with the line of best fit for the data. The line of best fit passes through the points $(5, 22)$ and $(20, 10)$. Which equation represents the line of best fit?",
      diagram: { type: "scatterplot", params: { points: [[2, 25], [4, 23], [6, 20], [8, 21], [10, 18], [13, 15], [16, 14], [19, 10], [22, 9], [24, 6]], xMin: 0, xMax: 25, yMin: 0, yMax: 28, xGridStep: 5, yGridStep: 4, xLabelStep: 5, yLabelStep: 8, xLabel: "Depth (meters)", yLabel: "Temperature (degrees Celsius)", bestFitLine: { slope: -0.8, intercept: 26 } } },
      choices: [
        { id: "A", text: "$y = -1.25x + 28.25$" },
        { id: "B", text: "$y = -0.8x + 22$" },
        { id: "C", text: "$y = -0.8x + 26$" },
        { id: "D", text: "$y = 0.8x + 18$" }
      ],
      correctAnswer: "C",
      hint: "Two points determine the line exactly — no estimating is needed once you use them both.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $m = \\frac{10-22}{20-5} = -0.8$, and $22 = -0.8(5)+b$ gives $b = 26$: $y = -0.8x + 26$ — choice C.\n\n**The Full Solution:**\nStep 1: Rate of change from the two given points: $m = \\frac{10-22}{20-5} = \\frac{-12}{15} = -0.8$ degree Celsius per meter.\nStep 2: Substitute $(5, 22)$ into $y = -0.8x + b$: $22 = -4 + b$, so $b = 26$.\nStep 3: The equation is $y = -0.8x + 26$. Check the second point: $-0.8(20)+26 = -16+26 = 10$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -1.25x + 28.25$): inverts the rate of change, computing $\\frac{20-5}{10-22} = -1.25$; anchoring that at $(5, 22)$ then forces $b = 28.25$.\n* Choice B ($y = -0.8x + 22$): has the correct rate of change but takes $22$, the temperature at a depth of $5$ meters, as the value at depth $0$.\n* Choice D ($y = 0.8x + 18$): drops the negative sign on the rate of change, which would make deeper water warmer; anchoring $+0.8$ at $(5, 22)$ gives $b = 18$.\n\n**Test Day Takeaway:** When a stem hands you two points on the line, compute the slope from them and back-solve the intercept — then confirm with the point you did not use.",
      skills: ["graph-to-equation", "slope-from-points", "best-fit-line"]
    },

    // === FROM GRAPH (Line with intercepts) ===
    {
      id: 9,
      difficulty: "easy",
      question: "The graph of a line in the $xy$-plane is shown. Which equation represents this line?",
      diagram: { type: "simpleLine", params: { points: [[0, 3], [4, 11]], xMax: 6, yMax: 14 } },
      choices: [
        { id: "A", text: "$y = 0.5x + 3$" },
        { id: "B", text: "$y = 2x + 3$" },
        { id: "C", text: "$y = 2x + 11$" },
        { id: "D", text: "$y = 3x + 2$" }
      ],
      correctAnswer: "B",
      hint: "The line crosses the vertical axis at a grid point, so one of the two constants can simply be read off.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The line crosses the vertical axis at $3$ and rises $8$ over a run of $4$, so the slope is $2$: $y = 2x + 3$ — choice B.\n\n**The Full Solution:**\nStep 1: Read the $y$-intercept: the line passes through $(0, 3)$, so $b = 3$.\nStep 2: Compute the slope from $(0, 3)$ and $(4, 11)$: $m = \\frac{11-3}{4-0} = \\frac{8}{4} = 2$.\nStep 3: The equation is $y = 2x + 3$. Check the second point: $2(4)+3 = 11$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = 0.5x + 3$): inverts the slope, dividing the run by the rise, $\\frac{4}{8}$, instead of the rise by the run.\n* Choice C ($y = 2x + 11$): uses $11$, the height of the line at $x = 4$, as the $y$-intercept; the intercept is the height at $x = 0$.\n* Choice D ($y = 3x + 2$): swaps the slope and the $y$-intercept.\n\n**Test Day Takeaway:** When the graph crosses the vertical axis at a lattice point, read $b$ for free and spend your time only on the slope.",
      skills: ["slope-from-points", "slope-intercept-form", "graph-to-equation"]
    },
    {
      id: 10,
      difficulty: "medium",
      question: "In the $xy$-plane, the graph shown models the combinations of $x$ small crates and $y$ large crates that exactly fill one delivery truck. Which equation could represent this relationship?",
      diagram: { type: "linearLine", params: { points: [[0, 15], [20, 0]], xRange: [0, 24], yRange: [0, 20] } },
      choices: [
        { id: "A", text: "$4x + 3y = 60$" },
        { id: "B", text: "$3x + 4y = 20$" },
        { id: "C", text: "$3x + 4y = 60$" },
        { id: "D", text: "$20x + 15y = 60$" }
      ],
      correctAnswer: "C",
      hint: "Both intercepts are visible on the graph; the correct equation has to be satisfied by each of them.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** The line hits $(20, 0)$ and $(0, 15)$; only $3x + 4y = 60$ gives $60$ at both — choice C.\n\n**The Full Solution:**\nStep 1: Read the intercepts from the graph: the line passes through $(20, 0)$ and $(0, 15)$.\nStep 2: Substitute $(20, 0)$ into $3x + 4y = 60$: $3(20)+4(0) = 60$. $\\checkmark$\nStep 3: Substitute $(0, 15)$ into the same equation: $3(0)+4(15) = 60$. $\\checkmark$ Both intercepts satisfy it, so it represents the graph.\n\n**Why the wrong answers are tempting:**\n* Choice A ($4x + 3y = 60$): swaps the coefficients, which places the intercepts at $(15, 0)$ and $(0, 20)$ instead.\n* Choice B ($3x + 4y = 20$): keeps the correct coefficients but uses an intercept value, $20$, as the constant; at $(20, 0)$ the left side is $60$, not $20$.\n* Choice D ($20x + 15y = 60$): uses the intercepts themselves as the coefficients; at $(20, 0)$ the left side is $400$, not $60$.\n\n**Test Day Takeaway:** With a line in standard form, test the two intercepts rather than converting to slope-intercept form — two substitutions settle it.",
      skills: ["graph-to-equation", "slope-from-points", "standard-form"]
    },
    {
      id: 11,
      difficulty: "hard",
      question: "In the $xy$-plane, line $\\ell$ passes through the two points plotted in the figure shown. The equation of line $\\ell$ can be written in the form $y = mx + b$, where $m$ and $b$ are constants. Which equation represents line $\\ell$?",
      diagram: { type: "coordinatePoints", params: { points: [[-6, 9], [3, -3]], xMin: -10, xMax: 10, yMin: -10, yMax: 10 } },
      choices: [
        { id: "A", text: "$y = -\\frac{4}{3}x + 1$" },
        { id: "B", text: "$y = -\\frac{4}{3}x + 9$" },
        { id: "C", text: "$y = -\\frac{3}{4}x + \\frac{9}{2}$" },
        { id: "D", text: "$y = \\frac{4}{3}x + 17$" }
      ],
      correctAnswer: "A",
      hint: "Subtracting a negative coordinate lengthens the run — write the subtraction out rather than doing it in your head.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** $m = \\frac{-3-9}{3-(-6)} = -\\frac{4}{3}$, and $-3 = -\\frac{4}{3}(3)+b$ gives $b = 1$ — choice A.\n\n**The Full Solution:**\nStep 1: Compute the slope: $m = \\frac{-3-9}{3-(-6)} = \\frac{-12}{9} = -\\frac{4}{3}$. The run is $3-(-6) = 9$, not $3$.\nStep 2: Substitute $(3, -3)$ into $y = -\\frac{4}{3}x + b$: $-3 = -4 + b$, so $b = 1$.\nStep 3: The equation is $y = -\\frac{4}{3}x + 1$. Check the other point: $-\\frac{4}{3}(-6)+1 = 8+1 = 9$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($y = -\\frac{4}{3}x + 9$): takes $9$, the second coordinate of the left-hand point, as the $y$-intercept; that height occurs at $x = -6$.\n* Choice C ($y = -\\frac{3}{4}x + \\frac{9}{2}$): inverts the slope to $\\frac{3-(-6)}{-3-9} = -\\frac{3}{4}$, which then forces $b = \\frac{9}{2}$.\n* Choice D ($y = \\frac{4}{3}x + 17$): drops a negative sign in the run, computing $\\frac{-12}{-9}$; anchoring $+\\frac{4}{3}$ at $(-6, 9)$ gives $b = 17$.\n\n**Test Day Takeaway:** With negative coordinates the run is where slopes go wrong: $3 - (-6) = 9$. Compute it explicitly, then confirm the finished equation on the point you did not use.",
      skills: ["slope-from-points", "slope-intercept-form", "graph-to-equation"]
    },

    // === FROM TABLE ===
    {
      id: 12,
      difficulty: "easy",
      question: "Three ordered pairs that satisfy the linear function $f$ are recorded in the table. Which equation defines $f$?",
      diagram: { type: "table", params: { rows: [[0, 17], [1, 22], [2, 27]], xHeader: "x", yHeader: "f(x)" } },
      choices: [
        { id: "A", text: "$f(x) = 5x + 17$" },
        { id: "B", text: "$f(x) = 5x + 22$" },
        { id: "C", text: "$f(x) = 17x + 5$" },
        { id: "D", text: "$f(x) = 22x + 17$" }
      ],
      correctAnswer: "A",
      hint: "One row of the table hands you the value of the function at an input of $0$.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $f(0) = 17$ gives the constant, and one step of $x$ raises the output by $5$: $f(x) = 5x + 17$ — choice A.\n\n**The Full Solution:**\nStep 1: The table includes $x = 0$, so the constant term is read directly: $f(0) = 17$.\nStep 2: From $x = 0$ to $x = 1$ the output rises from $17$ to $22$, so the rate of change is $\\frac{22-17}{1-0} = 5$.\nStep 3: The equation is $f(x) = 5x + 17$. Check the last row: $5(2)+17 = 27$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($f(x) = 5x + 22$): uses the correct rate of change but takes $22$, the output at $x = 1$, as the constant term.\n* Choice C ($f(x) = 17x + 5$): finds both numbers correctly but puts them in the wrong slots, using $17$ as the rate of change and $5$ as the constant term.\n* Choice D ($f(x) = 22x + 17$): treats the output $22$ as a rate of change instead of computing the change in output over the change in input.\n\n**Test Day Takeaway:** A table row with $x = 0$ hands you the constant term for free; spend the effort on the rate of change and then verify on a row you did not use.",
      skills: ["table-to-equation", "slope-from-points"]
    },
    {
      id: 13,
      difficulty: "medium",
      question: "During calibration a pressure sensor produced the four output voltages listed in the table for the applied pressures shown. Which equation gives the output $V$, in volts, at an applied pressure of $p$ kilopascals?",
      diagram: { type: "table", params: { xHeader: "Applied pressure (kPa)", yHeader: "Output (V)", rows: [["10", "1.4"], ["20", "2.0"], ["30", "2.6"], ["40", "3.2"]] } },
      choices: [
        // distractor: uses 0.6, the rise per table row, as the rise per kilopascal
        { id: "A", text: "$V = 0.6p + 0.8$" },
        // distractor: swaps the rate and the value at zero pressure
        { id: "B", text: "$V = 0.8p + 0.06$" },
        // distractor: uses the first listed output, 1.4, as the value at zero pressure
        { id: "C", text: "$V = 0.06p + 1.4$" },
        { id: "D", text: "$V = 0.06p + 0.8$" }
      ],
      correctAnswer: "D",
      hint: "The pressure values step up by equal amounts, so watch what one step does to the output.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~40s):** Each $10$-kilopascal step raises the output by $0.6$ volt, so the rate is $0.06$ volt per kilopascal, and backing up from $(10,\\ 1.4)$ gives $0.8$ volt at $p = 0$.\n\n**The Full Solution:**\nStep 1: The outputs rise by $0.6$ volt for every $10$-kilopascal increase, so the relationship is linear with slope $\\frac{0.6}{10} = 0.06$ volt per kilopascal.\nStep 2: Write $V = 0.06p + b$ and substitute the first row: $1.4 = 0.06(10) + b = 0.6 + b$, so $b = 0.8$.\nStep 3: The equation is $V = 0.06p + 0.8$.\n\nCheck: At $p = 40$ the equation gives $0.06(40) + 0.8 = 2.4 + 0.8 = 3.2$ volts, matching the last row. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($V = 0.6p + 0.8$): treats the $0.6$-volt jump between rows as the change per kilopascal; at $p = 40$ it predicts $24.8$ volts.\n* Choice B ($V = 0.8p + 0.06$): swaps the rate and the value at zero pressure.\n* Choice C ($V = 0.06p + 1.4$): uses the first recorded output as the value at $p = 0$, ignoring that the first row is at $10$ kilopascals.\n\n**Test Day Takeaway:** Divide the change in output by the change in input, not by the number of rows.",
      skills: ["table-to-equation", "slope-from-points"]
    },
    {
      id: 14,
      difficulty: "medium",
      question: "A membership statement lists the total monthly charge for several numbers of guest passes, as shown in the table, and the charge rises at a constant rate for each additional pass. Which equation gives the total charge $C$, in dollars, for $n$ guest passes?",
      diagram: { type: "table", params: { xHeader: "Guest passes", yHeader: "Total charge (dollars)", rows: [["2", "34"], ["5", "55"], ["9", "83"], ["14", "118"]] } },
      choices: [
        // distractor: divides the first total by the first pass count, 34/2 = 17, as though there were no fixed charge
        { id: "A", text: "$C = 17n$" },
        // distractor: swaps the per-pass rate and the fixed monthly charge
        { id: "B", text: "$C = 20n + 7$" },
        // distractor: uses the correct per-pass rate but drops the fixed monthly charge
        { id: "C", text: "$C = 7n$" },
        { id: "D", text: "$C = 7n + 20$" }
      ],
      correctAnswer: "D",
      hint: "Two rows are enough to find what one additional guest pass costs.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~45s):** From $(2,\\ 34)$ to $(5,\\ 55)$ the charge rises \\$21 over $3$ passes, so each pass costs \\$7, and $34 - 7(2) = 20$ is the fixed charge.\n\n**The Full Solution:**\nStep 1: The pass counts are not evenly spaced, so use two rows: the rate is $\\frac{55 - 34}{5 - 2} = \\frac{21}{3} = 7$ dollars per pass.\nStep 2: Write $C = 7n + b$ and substitute $(2,\\ 34)$: $34 = 14 + b$, so $b = 20$ dollars.\nStep 3: The equation is $C = 7n + 20$.\n\nCheck: At $n = 14$ the equation gives $7(14) + 20 = 98 + 20 = 118$ dollars, matching the last row. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($C = 17n$): divides the first total by the first pass count, which folds the fixed charge into the rate; at $n = 14$ it predicts \\$238.\n* Choice B ($C = 20n + 7$): swaps the per-pass rate and the fixed charge.\n* Choice C ($C = 7n$): has the right rate but leaves out the \\$20 charged regardless of passes.\n\n**Test Day Takeaway:** With unevenly spaced inputs, compute the rate from two rows before hunting for the constant term.",
      skills: ["table-to-equation", "slope-from-points"]
    },
    {
      id: 15,
      difficulty: "hard",
      question: "For the linear function $f$, the table records three inputs and their corresponding outputs. If $f$ is defined by $f(x) = mx + b$, where $m$ and $b$ are constants, which equation defines $f$?",
      diagram: { type: "table", params: { rows: [["−6", 20], ["−2", 14], [6, 2]], xHeader: "x", yHeader: "f(x)" } },
      choices: [
        { id: "A", text: "$f(x) = -6x + 2$" },
        { id: "B", text: "$f(x) = -\\frac{3}{2}x + 11$" },
        { id: "C", text: "$f(x) = -\\frac{3}{2}x + 14$" },
        { id: "D", text: "$f(x) = \\frac{3}{2}x + 11$" }
      ],
      correctAnswer: "B",
      hint: "The inputs are unevenly spaced, so pick a pair and divide — do not read the drop between rows as the rate.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** $m = \\frac{14-20}{-2-(-6)} = -\\frac{3}{2}$, and $14 = -\\frac{3}{2}(-2)+b$ gives $b = 11$ — choice B.\n\n**The Full Solution:**\nStep 1: Rate of change from the first two rows: $m = \\frac{14-20}{-2-(-6)} = \\frac{-6}{4} = -\\frac{3}{2}$.\nStep 2: Substitute $(-2, 14)$: $14 = -\\frac{3}{2}(-2)+b = 3+b$, so $b = 11$.\nStep 3: The equation is $f(x) = -\\frac{3}{2}x + 11$. Check the last row: $-\\frac{3}{2}(6)+11 = -9+11 = 2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($f(x) = -6x + 2$): uses the $-6$ change in output between the first two rows as the rate of change; anchoring that at $(-2, 14)$ gives $2$ as the constant.\n* Choice C ($f(x) = -\\frac{3}{2}x + 14$): has the correct rate of change but takes $14$, the output at $x = -2$, as the value at $x = 0$.\n* Choice D ($f(x) = \\frac{3}{2}x + 11$): drops the negative sign on the rate of change even though the outputs fall as the inputs rise.\n\n**Test Day Takeaway:** Unevenly spaced inputs are the trap: the difference between consecutive outputs is a rate only after you divide by the difference between the inputs.",
      skills: ["table-to-equation", "slope-from-points"]
    },

    // === FROM FUNCTION NOTATION ===
    {
      id: 16,
      difficulty: "easy",
      question: "A cutting-fluid reservoir holds $40$ liters at the start of a shift and loses $2.5$ liters for each hour of machining. Which function gives the volume $V(h)$, in liters, remaining after $h$ hours?",
      choices: [
        // distractor: swaps the roles, using 2.5 as the starting amount and 40 as the hourly change
        { id: "A", text: "$V(h) = 2.5h - 40$" },
        // distractor: adds the hourly loss instead of subtracting it
        { id: "B", text: "$V(h) = 2.5h + 40$" },
        { id: "C", text: "$V(h) = 40 - 2.5h$" },
        // distractor: uses the starting volume 40 as the hourly rate
        { id: "D", text: "$V(h) = 40h - 2.5$" }
      ],
      correctAnswer: "C",
      hint: "One of the two numbers is the amount present when $h = 0$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Start at $40$ liters and remove $2.5$ liters each hour: $V(h) = 40 - 2.5h$.\n\n**The Full Solution:**\nStep 1: At $h = 0$ the reservoir holds $40$ liters, so the constant term is $40$.\nStep 2: The fluid decreases at a steady $2.5$ liters per hour, so the rate of change is $-2.5$ liters per hour.\nStep 3: A linear model is (constant term) plus (rate)(input): $V(h) = 40 - 2.5h$.\n\nCheck: After $4$ hours the model gives $40 - 10 = 30$ liters, a loss of $10$ liters over $4$ hours. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.5h - 40$): swaps the two numbers, and it reports a negative volume for every hour before hour $16$.\n* Choice B ($2.5h + 40$): adds the hourly amount, so the reservoir would gain fluid while machining.\n* Choice D ($40h - 2.5$): uses the starting volume as the hourly rate, predicting $37.5$ liters after one hour and $797.5$ liters after twenty.\n\n**Test Day Takeaway:** The number attached to the variable is a rate; the number standing alone is the value at input zero.",
      skills: ["function-notation-to-equation", "slope-from-points"]
    },
    {
      id: 17,
      difficulty: "medium",
      question: "Groundwater temperature, in degrees Celsius, at a depth of $d$ meters below the surface is modeled by $T(d) = 15 + 0.028d$ for depths up to $600$ meters. Going $50$ meters deeper raises the modeled temperature by how many degrees Celsius?",
      choices: [
        // distractor: reports the rise for one additional meter rather than for fifty
        { id: "A", text: "$0.028$" },
        { id: "B", text: "$1.4$" },
        // distractor: multiplies the rate by 500 instead of by 50
        { id: "C", text: "$14$" },
        // distractor: reports the depth step itself rather than the temperature change it produces
        { id: "D", text: "$50$" }
      ],
      correctAnswer: "B",
      hint: "Ask what the model does across a fifty-meter step, not a one-meter step.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The model rises $0.028$ degree per meter, so $50$ meters raise it by $0.028(50) = 1.4$ degrees.\n\n**The Full Solution:**\nStep 1: In $T(d) = 15 + 0.028d$ the coefficient $0.028$ is the change in modeled temperature for each additional meter of depth.\nStep 2: Over a $50$-meter increase the change is $0.028 \\times 50$.\nStep 3: $0.028 \\times 50 = 1.4$ degrees Celsius.\n\nCheck: $T(100) - T(50) = (15 + 2.8) - (15 + 1.4) = 1.4$ degrees. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.028$): reports the rise for a single meter and never scales it to fifty.\n* Choice C ($14$): multiplies the rate by $500$ instead of $50$, a factor-of-ten slip.\n* Choice D ($50$): reports the depth step itself rather than the temperature change it causes.\n\n**Test Day Takeaway:** The coefficient of the input is a rate per one unit; multiply it by the size of the step you are asked about.",
      skills: ["function-notation-to-equation", "slope-from-points", "slope-intercept-form"]
    },
    {
      id: 18,
      difficulty: "medium",
      question: "After $4$ months a payroll deduction plan has set aside \\$860, and after $9$ months it has set aside \\$1,785. Which function gives the amount $S(m)$, in dollars, set aside after $m$ months at a constant monthly rate?",
      choices: [
        // distractor: swaps the monthly amount and the constant term
        { id: "A", text: "$S(m) = 120m + 185$" },
        // distractor: uses the correct monthly amount but drops the 120 dollar constant term
        { id: "B", text: "$S(m) = 185m$" },
        // distractor: divides 860 by 4 to get 215, folding the constant term into the rate
        { id: "C", text: "$S(m) = 215m$" },
        { id: "D", text: "$S(m) = 185m + 120$" }
      ],
      correctAnswer: "D",
      hint: "The two months given are five months apart.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~45s):** The plan gains $\\frac{1785 - 860}{9 - 4} = 185$ dollars a month, and $860 - 4(185) = 120$ is the amount already in place at month zero.\n\n**The Full Solution:**\nStep 1: The two data points are $(4,\\ 860)$ and $(9,\\ 1785)$, so the monthly rate is $\\frac{1{,}785 - 860}{9 - 4} = \\frac{925}{5} = 185$ dollars per month.\nStep 2: Write $S(m) = 185m + b$ and substitute $(4,\\ 860)$: $860 = 740 + b$, so $b = 120$ dollars.\nStep 3: The function is $S(m) = 185m + 120$.\n\nCheck: $S(9) = 185(9) + 120 = 1{,}665 + 120 = 1{,}785$ dollars. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($120m + 185$): swaps the monthly amount and the constant term; it gives \\$665 at month four.\n* Choice B ($185m$): has the right rate but assumes nothing was set aside before the plan's monthly transfers began.\n* Choice C ($215m$): divides \\$860 by four months, which folds the constant term into the rate; it gives \\$1,935 at month nine.\n\n**Test Day Takeaway:** Two points give the rate first; only then substitute one of them to recover the constant term.",
      skills: ["function-notation-to-equation", "slope-from-points"]
    },
    {
      id: 19,
      difficulty: "hard",
      question: "A linear model $M(t) = at + b$ gives the mass, in grams, of nickel deposited on a part after $t$ seconds in an electroplating bath. The model gives $32$ grams at $5$ seconds and $72$ grams at $15$ seconds. For what value of $t$ does the model give $100$ grams?",
      choices: [
        // distractor: takes b = 32, the mass at 5 seconds, as the value at t = 0 and solves 4t + 32 = 100
        { id: "A", text: "$17$" },
        { id: "B", text: "$22$" },
        // distractor: drops the constant term and solves 4t = 100
        { id: "C", text: "$25$" },
        // distractor: adds the constant term instead of subtracting it, computing (100 + 12)/4
        { id: "D", text: "$28$" }
      ],
      correctAnswer: "B",
      hint: "Two points determine both $a$ and $b$ before you solve for $t$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~60s):** The rate is $\\frac{72-32}{15-5} = 4$ grams per second and $b = 32 - 4(5) = 12$, so $4t + 12 = 100$ gives $t = 22$.\n\n**The Full Solution:**\nStep 1: The two given points are $(5,\\ 32)$ and $(15,\\ 72)$, so $a = \\frac{72 - 32}{15 - 5} = \\frac{40}{10} = 4$ grams per second.\nStep 2: Substituting $(5,\\ 32)$ into $M(t) = 4t + b$ gives $32 = 20 + b$, so $b = 12$ grams.\nStep 3: Setting $4t + 12 = 100$ gives $4t = 88$, so $t = 22$ seconds.\n\nCheck: $M(22) = 4(22) + 12 = 88 + 12 = 100$ grams. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($17$): treats the $32$ grams at $5$ seconds as the value at $t = 0$ and solves $4t + 32 = 100$.\n* Choice C ($25$): drops the constant term entirely and solves $4t = 100$.\n* Choice D ($28$): adds the constant term instead of subtracting it, computing $\\frac{100 + 12}{4}$.\n\n**Test Day Takeaway:** Build the whole model before you invert it; a missing constant term shifts every answer.",
      skills: ["function-notation-to-equation", "slope-from-points", "solving-linear-equations"]
    },
    {
      id: 20,
      difficulty: "hard",
      question: "The function $F(m) = 1{,}860 - 124m$ models the balance, in dollars, of a tuition escrow account after $m$ monthly payments of equal size. According to the model, after how many monthly payments does the account balance equal one third of its starting balance?",
      choices: [
        // distractor: reduces the balance BY one third, leaving 1240 dollars, and solves for that instead
        { id: "A", text: "$5$" },
        { id: "B", text: "$10$" },
        // distractor: solves for the balance reaching zero, 1860/124 = 15
        { id: "C", text: "$15$" },
        // distractor: halves the monthly payment to 62 dollars and solves 1240 = 62m
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "B",
      hint: "One third of the starting balance is what remains, not what is gone.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** One third of \\$1,860 is \\$620, and $1{,}860 - 124m = 620$ gives $m = 10$.\n\n**The Full Solution:**\nStep 1: At $m = 0$ the model gives $F(0) = 1{,}860$ dollars, so the starting balance is \\$1,860 and one third of it is $\\frac{1{,}860}{3} = 620$ dollars.\nStep 2: Set the model equal to that target: $1{,}860 - 124m = 620$, so $124m = 1{,}240$.\nStep 3: Dividing gives $m = 10$ monthly payments.\n\nCheck: $F(10) = 1{,}860 - 1{,}240 = 620$, which is exactly one third of $1{,}860$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): reduces the balance *by* one third instead of *to* one third, solving $1{,}860 - 124m = 1{,}240$.\n* Choice C ($15$): solves for the balance reaching zero, $\\frac{1{,}860}{124} = 15$.\n* Choice D ($20$): halves the monthly payment to \\$62 and then solves $1{,}240 = 62m$.\n\n**Test Day Takeaway:** Read whether a fraction describes what remains or what was removed before writing the equation.",
      skills: ["function-notation-to-equation", "slope-from-points", "slope-intercept-form"]
    }
  ],

  // Section: Parallel Lines (covers videos 13-21)
  // Types: Find slope of parallel line, Write equation through point, No solution systems, Find constant for no solution
  "Parallel Lines": [
    // === TYPE 1: Find slope of parallel line (SAT style) ===
    {
      id: 1,
      difficulty: "easy",
      question: "$f(x) = 6x - 11$\n\nThe function $f$ is defined by the given equation. In the $xy$-plane, the graph of $y = f(x)$ is a line, and line $p$ is parallel to that line. What is the slope of line $p$?",
      choices: [
        { id: "A", text: "$-11$" },
        { id: "B", text: "$-6$" },
        { id: "C", text: "$-\\frac{1}{6}$" },
        { id: "D", text: "$6$" }
      ],
      correctAnswer: "D",
      hint: "The equation is already solved for the output, so no rearranging is needed before you read the rate of change.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~10s):** The graph of $y = 6x - 11$ has slope $6$, and parallel lines have equal slopes — choice D.\n\n**The Full Solution:**\nStep 1: The equation $y = 6x - 11$ is in slope-intercept form, so the graph of $y = f(x)$ has slope $6$ and $y$-intercept $-11$.\nStep 2: Two distinct lines in the $xy$-plane are parallel exactly when their slopes are equal.\nStep 3: Therefore line $p$ has slope $6$. Check: any other slope would eventually meet the graph of $f$, so the lines could not be parallel. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-11$): reports $-11$, the $y$-intercept of the graph of $f$, rather than its slope.\n* Choice B ($-6$): negates the slope; parallel lines have equal slopes, not opposite ones.\n* Choice C ($-\\frac{1}{6}$): gives the negative reciprocal, which is the slope of a line perpendicular to the graph of $f$.\n\n**Test Day Takeaway:** Parallel means equal slopes — nothing is flipped and nothing changes sign. Confirm which number in $y = mx + b$ is the slope before you answer.",
      skills: ["parallel-line-slope"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "In the $xy$-plane, the graph of $g(x) = -\\frac{3}{4}x + 5$ is a line. Line $k$ is parallel to this line. What is the slope of line $k$?",
      choices: [
        { id: "A", text: "$-\\frac{4}{3}$" },
        { id: "B", text: "$-\\frac{3}{4}$" },
        { id: "C", text: "$\\frac{3}{4}$" },
        { id: "D", text: "$\\frac{4}{3}$" }
      ],
      correctAnswer: "B",
      hint: "Copy the coefficient of $x$ exactly as it stands — sign included.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** Parallel lines share a slope, and the coefficient of $x$ here is $-\\frac{3}{4}$ — choice B.\n\n**The Full Solution:**\nStep 1: The equation is already in slope-intercept form, so the slope of the graph of $g$ is $-\\frac{3}{4}$.\nStep 2: Parallel lines have equal slopes.\nStep 3: Line $k$ therefore has slope $-\\frac{3}{4}$. Check the direction: a negative slope falls left to right, and any parallel line must fall at the same steepness. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{4}{3}$): flips the fraction while keeping the sign; parallel lines require no flip at all.\n* Choice C ($\\frac{3}{4}$): keeps the fraction but drops the negative sign, describing a line that rises rather than falls.\n* Choice D ($\\frac{4}{3}$): gives the negative reciprocal, the slope of a perpendicular line.\n\n**Test Day Takeaway:** Fraction slopes invite two reflexes that do not belong here — flipping and negating. Parallel means copy the coefficient exactly.",
      skills: ["parallel-line-slope"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "On a framing plan marked in meters, a roof rafter follows the line $3x + 5y = 45$, and a second rafter is drawn parallel to the first. Which of the following must be the slope of the second rafter?",
      choices: [
        // distractor: inverts the slope, reading the coefficients in the wrong order
        { id: "A", text: "$-\\frac{5}{3}$" },
        { id: "B", text: "$-\\frac{3}{5}$" },
        // distractor: drops the negative sign that appears when 3x moves across the equal sign
        { id: "C", text: "$\\frac{3}{5}$" },
        // distractor: gives the negative reciprocal, the slope of a perpendicular rafter
        { id: "D", text: "$\\frac{5}{3}$" }
      ],
      correctAnswer: "B",
      hint: "Rewrite the equation so the coefficient of $y$ is $1$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** Solving $3x + 5y = 45$ for $y$ gives $y = -\\frac{3}{5}x + 9$, and a parallel line shares that slope.\n\n**The Full Solution:**\nStep 1: Subtract $3x$ from both sides: $5y = -3x + 45$.\nStep 2: Divide by $5$: $y = -\\frac{3}{5}x + 9$, so the first rafter has slope $-\\frac{3}{5}$.\nStep 3: Parallel lines have equal slopes, so the second rafter must also have slope $-\\frac{3}{5}$.\n\nCheck: The points $(0,\\ 9)$ and $(5,\\ 6)$ both satisfy $3x + 5y = 45$, and $\\frac{6-9}{5-0} = -\\frac{3}{5}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{5}{3}$): inverts the ratio, reading the coefficients in the wrong order.\n* Choice C ($\\frac{3}{5}$): drops the negative sign that appears when $3x$ crosses the equal sign.\n* Choice D ($\\frac{5}{3}$): gives the negative reciprocal, which belongs to a perpendicular rafter.\n\n**Test Day Takeaway:** From $Ax + By = C$ the slope is $-\\frac{A}{B}$; the sign is part of the answer.",
      skills: ["parallel-line-slope"]
    },

    // === TYPE 2: Write equation through point parallel to given line ===
    {
      id: 4,
      difficulty: "easy",
      question: "A boundary baseline appears on a plan as the graph of $y = -\\frac{2}{3}x + 7$, with distances in meters. A lot edge parallel to that baseline contains $(6, 1)$. Which of the following is an equation of the lot edge?",
      choices: [
        // distractor: substitutes with the sign of the slope term reversed, computing 1 - 4 instead of 1 + 4
        { id: "A", text: "$y = -\\frac{2}{3}x - 3$" },
        { id: "B", text: "$y = -\\frac{2}{3}x + 5$" },
        // distractor: reuses the baseline's own constant term, which describes the baseline itself rather than a separate edge
        { id: "C", text: "$y = -\\frac{2}{3}x + 7$" },
        // distractor: uses the negative reciprocal slope, which makes the edge perpendicular to the baseline
        { id: "D", text: "$y = \\frac{3}{2}x - 8$" }
      ],
      correctAnswer: "B",
      hint: "Parallel lines share a slope; only the constant term is left to find.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The edge has slope $-\\frac{2}{3}$, and $1 = -\\frac{2}{3}(6) + b$ gives $b = 5$.\n\n**The Full Solution:**\nStep 1: Parallel lines have equal slopes, so the lot edge has slope $-\\frac{2}{3}$ and takes the form $y = -\\frac{2}{3}x + b$.\nStep 2: Substituting the point $(6,\\ 1)$ gives $1 = -\\frac{2}{3}(6) + b = -4 + b$.\nStep 3: Adding $4$ to both sides gives $b = 5$, so the edge is $y = -\\frac{2}{3}x + 5$.\n\nCheck: At $x = 6$ the equation gives $-4 + 5 = 1$, so the point lies on the edge. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($b = -3$): reverses the sign when solving, computing $1 - 4$ instead of $1 + 4$.\n* Choice C ($b = 7$): keeps the baseline's own constant term, so it describes the baseline rather than a separate edge; $(6, 1)$ does not lie on it.\n* Choice D (slope $\\frac{3}{2}$): uses the negative reciprocal, which makes the edge perpendicular to the baseline.\n\n**Test Day Takeaway:** Copy the slope, then let the given point decide the constant term.",
      skills: ["parallel-line-slope", "writing-parallel-equation"]
    },
    {
      id: 5,
      difficulty: "medium",
      question: "On a packaging line the guide rail satisfies $ax + 9y = 45$ for some constant $a$. The line $2x + 3y = 24$ marks a hazard boundary, and no point of the rail lies on it. What is the value of $a$?",
      choices: [
        // distractor: drops the negative that appears in the slope formula on one side only, matching a/9 to -2/3
        { id: "A", text: "$-6$" },
        { id: "B", text: "$6$" },
        // distractor: inverts the slope ratio, solving a/9 = 3/2
        { id: "C", text: "$13.5$" },
        // distractor: scales the second equation by 9, the coefficient of y, instead of by 3
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "B",
      hint: "Two lines that never meet must rise at the same rate.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~40s):** No shared point means parallel, so $-\\frac{a}{9} = -\\frac{2}{3}$ and $a = 6$.\n\n**The Full Solution:**\nStep 1: Two distinct lines have no point in common exactly when they are parallel, so their slopes must be equal.\nStep 2: From $Ax + By = C$ the slope is $-\\frac{A}{B}$, so the rail has slope $-\\frac{a}{9}$ and the second line has slope $-\\frac{2}{3}$. Setting them equal gives $\\frac{a}{9} = \\frac{2}{3}$, so $a = 6$.\nStep 3: With $a = 6$ the rail is $6x + 9y = 45$, which reduces to $2x + 3y = 15$; since $15 \\ne 24$, the two lines are parallel and distinct, so they really do share no point.\n\nCheck: Multiplying $2x + 3y = 24$ by $3$ gives $6x + 9y = 72$, the same left side as the rail with a different constant. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): loses the negative sign on one side of the slope equation, matching $\\frac{a}{9}$ to $-\\frac{2}{3}$.\n* Choice C ($13.5$): inverts the ratio and solves $\\frac{a}{9} = \\frac{3}{2}$.\n* Choice D ($18$): scales the second equation by $9$, the coefficient of $y$, instead of by the $3$ that turns $3y$ into $9y$.\n\n**Test Day Takeaway:** Match the whole left side by a single scale factor; then check the constants differ so the lines are parallel, not identical.",
      skills: ["parallel-line-slope", "writing-parallel-equation"]
    },
    {
      id: 6,
      difficulty: "medium",
      question: "Two repayment plans for the same purchase are modeled by $y = 0.4x + 90$ and $y = 0.4x + 145$, where $y$ is the amount owed, in dollars, after $x$ equal payments have been made. Which statement about the two amounts owed is true?",
      choices: [
        // distractor: assumes any two lines must cross somewhere, which fails when the slopes match
        { id: "A", text: "The two amounts are equal for exactly one value of $x$." },
        // distractor: treats equal slopes as making the two models identical
        { id: "B", text: "The two amounts are equal for every value of $x$." },
        { id: "C", text: "The two amounts differ by \\$55 for every value of $x$." },
        // distractor: assumes the gap closes as x grows, but the 0.4x terms cancel exactly
        { id: "D", text: "The two amounts differ by \\$55 only when $x = 0$." }
      ],
      correctAnswer: "C",
      hint: "Compare the two constant terms once you notice the coefficients of $x$ match.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** Subtracting the models gives $(0.4x + 145) - (0.4x + 90) = 55$, a constant gap.\n\n**The Full Solution:**\nStep 1: Both models change by \\$0.40 per payment, so their graphs are parallel lines.\nStep 2: Subtract one from the other: $(0.4x + 145) - (0.4x + 90) = 55$. The $0.4x$ terms cancel, so the difference does not depend on $x$.\nStep 3: The second plan therefore owes \\$55 more than the first after every number of payments, and the two amounts are never equal.\n\nCheck: At $x = 0$ the amounts are \\$90 and \\$145; at $x = 100$ they are \\$130 and \\$185. Both gaps are \\$55. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (equal at one value): assumes two lines always cross, but parallel lines with different constant terms never do.\n* Choice B (equal everywhere): treats matching rates as making the plans identical, ignoring the \\$55 difference in starting amounts.\n* Choice D (gap only at $x = 0$): assumes the gap shrinks as payments accumulate, but the $0.4x$ terms cancel for every $x$.\n\n**Test Day Takeaway:** Equal slopes mean the vertical gap between two lines is the same constant everywhere.",
      skills: ["parallel-line-slope", "writing-parallel-equation"]
    },

    // === TYPE 3: System with no solution - identify parallel equation ===
    {
      id: 7,
      difficulty: "medium",
      question: "In a blending model for a glaze recipe, the equation $4x + 6y = 15$ constrains the masses, in kilograms, of two ingredients. Which of the following, used as a second constraint, would give a system with no solution?",
      choices: [
        // distractor: is the first equation divided by 2, so the two constraints describe the same line and share infinitely many solutions
        { id: "A", text: "$2x + 3y = 7.5$" },
        { id: "B", text: "$2x + 3y = 11$" },
        // distractor: swaps the coefficients, giving slope -3/2 instead of -2/3, so the lines cross once
        { id: "C", text: "$6x + 4y = 15$" },
        // distractor: flips the sign of the y-term, giving slope 2/3, so the lines cross once
        { id: "D", text: "$4x - 6y = 15$" }
      ],
      correctAnswer: "B",
      hint: "Scaling the first equation changes both sides; check whether the constant keeps up.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** Halving the first constraint gives $2x + 3y = 7.5$; a same left side with a different constant, $11$, is parallel and unreachable.\n\n**The Full Solution:**\nStep 1: A system of two linear equations has no solution exactly when the lines are parallel and distinct, that is when one equation's variable terms are a multiple of the other's but its constant is not.\nStep 2: Dividing $4x + 6y = 15$ by $2$ gives $2x + 3y = 7.5$, so any constraint with left side $2x + 3y$ is parallel to it.\nStep 3: Choice B has left side $2x + 3y$ with constant $11 \\ne 7.5$, so the two lines are parallel and distinct and no pair of masses satisfies both.\n\nCheck: Both lines have slope $-\\frac{2}{3}$ but $y$-intercepts $2.5$ and $\\frac{11}{3} \\approx 3.67$, so they never meet. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2x + 3y = 7.5$): is exactly half of the first constraint, so the two describe the same line and share infinitely many solutions.\n* Choice C ($6x + 4y = 15$): swaps the coefficients, giving slope $-\\frac{3}{2}$, so the lines cross at one point.\n* Choice D ($4x - 6y = 15$): flips the sign of the $y$-term, giving slope $\\frac{2}{3}$, so the lines cross at one point.\n\n**Test Day Takeaway:** No solution needs matching variable terms and a mismatched constant; matching both gives infinitely many instead.",
      skills: ["parallel-line-slope", "system-no-solution"]
    },
    {
      id: 8,
      difficulty: "medium",
      question: "On a plan marked in meters, a ramp centerline joins the points $(2, 9)$ and $(7, 24)$. A utility trench graphed as $y = px + 4$ runs parallel to that centerline, where $p$ is a constant. Which of the following expressions is equal to $p$?",
      choices: [
        // distractor: reverses the order in the numerator only, flipping the sign of the slope to -3
        { id: "A", text: "$\\frac{9 - 24}{7 - 2}$" },
        // distractor: inverts the ratio, dividing the run by the rise to get 1/3
        { id: "B", text: "$\\frac{7 - 2}{24 - 9}$" },
        { id: "C", text: "$\\frac{24 - 9}{7 - 2}$" },
        // distractor: adds the coordinates instead of subtracting them, giving 33/9
        { id: "D", text: "$\\frac{24 + 9}{7 + 2}$" }
      ],
      correctAnswer: "C",
      hint: "Slope is a difference of $y$-values over the matching difference of $x$-values.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** Parallel means equal slopes, and the centerline's slope is $\\frac{24 - 9}{7 - 2}$.\n\n**The Full Solution:**\nStep 1: The slope through $(x_1, y_1)$ and $(x_2, y_2)$ is $\\frac{y_2 - y_1}{x_2 - x_1}$, so the centerline's slope is $\\frac{24 - 9}{7 - 2}$.\nStep 2: The utility trench is parallel to the centerline, so $p$ equals that same slope.\nStep 3: Therefore $p = \\frac{24 - 9}{7 - 2}$, which evaluates to $\\frac{15}{5} = 3$.\n\nCheck: With $p = 3$ the trench is $y = 3x + 4$, which rises $15$ meters as $x$ moves from $2$ to $7$, exactly as the centerline does. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-3$): reverses the order in the numerator only, producing a line that falls instead of rises.\n* Choice B ($\\frac{1}{3}$): divides the run by the rise rather than the rise by the run.\n* Choice D ($\\frac{33}{9}$): adds the coordinates instead of subtracting them.\n\n**Test Day Takeaway:** Subtract the coordinates in the same order top and bottom, or the sign of the slope flips.",
      skills: ["parallel-line-slope", "system-no-solution"]
    },

    // === TYPE 4: Find constant p for no solution (single equation) ===
    {
      id: 9,
      difficulty: "hard",
      question: "A rental agreement's cost-balance model sets $5(2x - 3) + k = 4(kx + 1) - 7$, where $x$ counts months of occupancy and $k$ is a constant. For which value of $k$ is there no value of $x$ that satisfies this equation?",
      choices: [
        // distractor: matches the coefficients but drops the sign, reporting -2.5 instead of 2.5
        { id: "A", text: "$-2.5$" },
        // distractor: divides the coefficient 10 by the 5 outside the left parentheses instead of by the 4 on the right
        { id: "B", text: "$2$" },
        { id: "C", text: "$2.5$" },
        // distractor: reports the left side's coefficient of x, 10, without dividing by 4
        { id: "D", text: "$10$" }
      ],
      correctAnswer: "C",
      hint: "No solution means the variable terms match while the constants do not.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~50s):** Expanding gives $10x + (k - 15) = 4kx - 3$; matching the $x$-terms forces $4k = 10$, so $k = 2.5$, and the constants then disagree.\n\n**The Full Solution:**\nStep 1: Expand both sides: the left becomes $10x - 15 + k$ and the right becomes $4kx + 4 - 7 = 4kx - 3$.\nStep 2: A linear equation has no solution when the $x$-terms are identical but the constant terms are not, so set $10 = 4k$, giving $k = 2.5$.\nStep 3: With $k = 2.5$ the constants are $-15 + 2.5 = -12.5$ on the left and $-3$ on the right. They differ, so no value of $x$ works.\n\nCheck: Substituting $k = 2.5$ gives $10x - 12.5 = 10x - 3$, which reduces to $-12.5 = -3$, a false statement. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2.5$): matches the coefficients but attaches the wrong sign; $4(-2.5) = -10$, not $10$.\n* Choice B ($2$): divides $10$ by the $5$ outside the left parentheses rather than by the $4$ on the right.\n* Choice D ($10$): reports the left side's coefficient of $x$ without dividing by $4$.\n\n**Test Day Takeaway:** Expand fully first; no solution needs equal $x$-coefficients and unequal constants, and both halves must be checked.",
      skills: ["parallel-line-slope", "no-solution-equation"]
    },
    {
      id: 10,
      difficulty: "hard",
      question: "On a process chart a solder line and a flux line are graphed as $y = \\frac{a}{6}x + 4$ and $y = \\frac{3}{2}x - 2$, where $a$ is a constant and both graphs extend without bound. The two graphs never cross. What is the value of $a$?",
      choices: [
        // distractor: inverts the target slope, solving a/6 = 2/3
        { id: "A", text: "$4$" },
        { id: "B", text: "$9$" },
        // distractor: multiplies 6 by the denominator 2 instead of by the fraction 3/2
        { id: "C", text: "$12$" },
        // distractor: multiplies 6 by the numerator 3 and never divides by 2
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "B",
      hint: "Two graphs that never cross rise at the same rate.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** Never crossing means equal slopes, so $\\frac{a}{6} = \\frac{3}{2}$ and $a = 9$.\n\n**The Full Solution:**\nStep 1: Two lines in the plane fail to cross exactly when they are parallel and distinct, so their slopes must be equal.\nStep 2: The slopes are $\\frac{a}{6}$ and $\\frac{3}{2}$, so $\\frac{a}{6} = \\frac{3}{2}$ and $2a = 18$, giving $a = 9$.\nStep 3: With $a = 9$ the solder line is $y = \\frac{3}{2}x + 4$; its constant term $4$ differs from $-2$, so the lines are parallel and distinct and indeed never cross.\n\nCheck: At $x = 4$ the two lines give $10$ and $4$; at $x = 10$ they give $19$ and $13$. The gap stays $6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): inverts the target slope and solves $\\frac{a}{6} = \\frac{2}{3}$.\n* Choice C ($12$): multiplies $6$ by the denominator $2$ instead of by the whole fraction $\\frac{3}{2}$.\n* Choice D ($18$): multiplies $6$ by the numerator $3$ and forgets to divide by $2$.\n\n**Test Day Takeaway:** Equal slopes alone give parallel; confirm the constant terms differ before claiming the graphs never meet.",
      skills: ["parallel-line-slope", "no-solution-equation"]
    },

    // === TYPE 5: Find constant for no solution in system (advanced) ===
    {
      id: 11,
      difficulty: "hard",
      question: "A guy-wire profile on a grid marked in meters runs parallel to $y = -\\frac{3}{8}x + 2$. The profile contains the points $(-16, r)$ and $(8, 1)$, and $r$ is a constant. What is the value of $r$?",
      choices: [
        // distractor: adds the y-values in the numerator, solving (1 + r)/24 = -3/8
        { id: "A", text: "$-10$" },
        // distractor: drops the negative sign of the slope, solving (1 - r)/24 = 3/8
        { id: "B", text: "$-8$" },
        // distractor: uses 8 as the horizontal change instead of the full 24 meters
        { id: "C", text: "$4$" },
        { id: "D", text: "$10$" }
      ],
      correctAnswer: "D",
      hint: "The two given points must produce the stated slope.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~45s):** The run is $8 - (-16) = 24$, so $\\frac{1 - r}{24} = -\\frac{3}{8}$ gives $1 - r = -9$ and $r = 10$.\n\n**The Full Solution:**\nStep 1: Parallel lines have equal slopes, so the profile has slope $-\\frac{3}{8}$.\nStep 2: The slope through the two points is $\\frac{1 - r}{8 - (-16)} = \\frac{1 - r}{24}$, so $\\frac{1 - r}{24} = -\\frac{3}{8}$.\nStep 3: Multiplying both sides by $24$ gives $1 - r = -9$, so $r = 10$.\n\nCheck: From $(-16,\\ 10)$ to $(8,\\ 1)$ the drop is $9$ meters over a run of $24$ meters, and $-\\frac{9}{24} = -\\frac{3}{8}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$): adds the $y$-values in the numerator, solving $\\frac{1 + r}{24} = -\\frac{3}{8}$.\n* Choice B ($-8$): drops the negative sign on the slope and solves $\\frac{1 - r}{24} = \\frac{3}{8}$.\n* Choice C ($4$): uses $8$ as the horizontal change instead of the full $24$ meters between the two $x$-values.\n\n**Test Day Takeaway:** Compute the run as a difference, including the sign of a negative coordinate, before setting up the slope equation.",
      skills: ["parallel-line-slope", "system-no-solution", "algebraic-manipulation"]
    },
    {
      id: 12,
      difficulty: "hard",
      question: "Two accounting rules for a grant budget, in thousands of dollars, are written as $4x - 6y = 14$ and $-6x + 9y = c$, where $c$ is a constant. For what value of $c$ does every pair $(x, y)$ satisfying one rule also satisfy the other?",
      choices: [
        { id: "A", text: "$-21$" },
        // distractor: copies the first rule's constant and only negates it, skipping the factor 3/2
        { id: "B", text: "$-14$" },
        // distractor: copies the first rule's constant unchanged, applying no scale factor at all
        { id: "C", text: "$14$" },
        // distractor: applies the factor 3/2 but keeps the result positive, ignoring the sign of the multiplier
        { id: "D", text: "$21$" }
      ],
      correctAnswer: "A",
      hint: "One equation should be a multiple of the other, constants included.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~45s):** Multiplying $4x - 6y = 14$ by $-\\frac{3}{2}$ gives $-6x + 9y = -21$, so $c = -21$.\n\n**The Full Solution:**\nStep 1: Two linear equations describe the same set of points exactly when one is a nonzero multiple of the other, coefficients and constant alike.\nStep 2: To turn $4x$ into $-6x$ the multiplier must be $-\\frac{6}{4} = -\\frac{3}{2}$. That same multiplier sends $-6y$ to $9y$, which matches the second rule.\nStep 3: Applying the multiplier to the constant gives $-\\frac{3}{2}(14) = -21$, so $c = -21$.\n\nCheck: Dividing $-6x + 9y = -21$ by $-\\frac{3}{2}$ returns $4x - 6y = 14$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-14$): negates the first constant without applying the factor $\\frac{3}{2}$.\n* Choice C ($14$): copies the first constant unchanged, applying no scale factor at all.\n* Choice D ($21$): applies the factor $\\frac{3}{2}$ but keeps the result positive, ignoring that the multiplier is negative.\n\n**Test Day Takeaway:** The scale factor that matches the coefficients must be applied to the constant too, sign and all.",
      skills: ["parallel-line-slope", "system-no-solution", "algebraic-manipulation"]
    }
  ],

  // Section: Perpendicular Lines (covers videos 23-24)
  "Perpendicular Lines": [
    {
      id: 1,
      difficulty: "easy",
      question: "The retaining wall on a site plan runs at a right angle to a drain line graphed as $5x - 2y = 16$, with distances in meters. What slope does the retaining wall have?",
      choices: [
        // distractor: negates the drain line's slope without inverting it
        { id: "A", text: "$-\\frac{5}{2}$" },
        { id: "B", text: "$-\\frac{2}{5}$" },
        // distractor: inverts the drain line's slope without negating it
        { id: "C", text: "$\\frac{2}{5}$" },
        // distractor: repeats the drain line's own slope instead of the perpendicular one
        { id: "D", text: "$\\frac{5}{2}$" }
      ],
      correctAnswer: "B",
      hint: "Put the drain line in slope-intercept form before comparing slopes.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The drain line has slope $\\frac{5}{2}$, so a perpendicular line has slope $-\\frac{2}{5}$.\n\n**The Full Solution:**\nStep 1: Solve $5x - 2y = 16$ for $y$: $-2y = -5x + 16$, so $y = \\frac{5}{2}x - 8$ and the drain line has slope $\\frac{5}{2}$.\nStep 2: Perpendicular slopes are negative reciprocals: invert $\\frac{5}{2}$ to get $\\frac{2}{5}$, then change the sign.\nStep 3: The retaining wall has slope $-\\frac{2}{5}$.\n\nCheck: $\\frac{5}{2} \\times \\left(-\\frac{2}{5}\\right) = -1$, which is the test for perpendicular slopes. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{5}{2}$): negates the drain line's slope but never inverts it, so the product is $-\\frac{25}{4}$, not $-1$.\n* Choice C ($\\frac{2}{5}$): inverts the slope but leaves it positive, giving a product of $1$.\n* Choice D ($\\frac{5}{2}$): repeats the drain line's own slope, which describes a parallel wall.\n\n**Test Day Takeaway:** Perpendicular means flip the fraction and flip the sign; doing only one of the two is the classic miss.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A ceiling plan marked in feet routes a busway along $4x + y = 11$. A sprinkler branch is drawn perpendicular to that busway. Which of the following could be an equation of the sprinkler branch?",
      choices: [
        { id: "A", text: "$y = \\frac{1}{4}x + 3$" },
        // distractor: inverts the busway's slope but keeps the negative sign, so the product of slopes is 1 rather than -1
        { id: "B", text: "$y = -\\frac{1}{4}x + 3$" },
        // distractor: negates the busway's slope without inverting it
        { id: "C", text: "$y = 4x + 3$" },
        // distractor: repeats the busway's own slope, which describes a parallel branch
        { id: "D", text: "$y = -4x + 3$" }
      ],
      correctAnswer: "A",
      hint: "Perpendicular slopes multiply to $-1$.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** The busway has slope $-4$, so the branch must have slope $\\frac{1}{4}$.\n\n**The Full Solution:**\nStep 1: Solve $4x + y = 11$ for $y$: $y = -4x + 11$, so the busway has slope $-4$.\nStep 2: A perpendicular line has the negative reciprocal slope: the reciprocal of $-4$ is $-\\frac{1}{4}$, and changing the sign gives $\\frac{1}{4}$.\nStep 3: Among the choices, only $y = \\frac{1}{4}x + 3$ has slope $\\frac{1}{4}$.\n\nCheck: $-4 \\times \\frac{1}{4} = -1$, the condition for perpendicular lines. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (slope $-\\frac{1}{4}$): inverts the busway's slope but keeps the sign negative, so the slopes multiply to $1$.\n* Choice C (slope $4$): changes only the sign, so the slopes multiply to $-16$.\n* Choice D (slope $-4$): repeats the busway's own slope, describing a branch parallel to it.\n\n**Test Day Takeaway:** Read the slope only after isolating $y$; a standard-form equation hides the sign.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "Every line perpendicular to a conduit run has slope $-\\frac{3}{7}$, and the run itself contains the point $(21, 5)$ on a plan marked in feet. Which of the following is an equation of the conduit run?",
      choices: [
        // distractor: inverts the given slope but negates it a second time, giving -7/3
        { id: "A", text: "$y = -\\frac{7}{3}x + 54$" },
        // distractor: reuses the given perpendicular slope for the run itself
        { id: "B", text: "$y = -\\frac{3}{7}x + 14$" },
        // distractor: negates the given slope without inverting it, giving 3/7
        { id: "C", text: "$y = \\frac{3}{7}x - 4$" },
        { id: "D", text: "$y = \\frac{7}{3}x - 44$" }
      ],
      correctAnswer: "D",
      hint: "Work backward from the perpendicular slope to the run's own slope.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~45s):** The run's slope is the negative reciprocal of $-\\frac{3}{7}$, namely $\\frac{7}{3}$, and $5 = \\frac{7}{3}(21) + b$ gives $b = -44$.\n\n**The Full Solution:**\nStep 1: If a perpendicular line has slope $-\\frac{3}{7}$, the conduit run's slope is the negative reciprocal: flip to $-\\frac{7}{3}$ and change the sign, giving $\\frac{7}{3}$.\nStep 2: Write $y = \\frac{7}{3}x + b$ and substitute $(21,\\ 5)$: $5 = \\frac{7}{3}(21) + b = 49 + b$.\nStep 3: Solving gives $b = -44$, so the run is $y = \\frac{7}{3}x - 44$.\n\nCheck: $\\frac{7}{3} \\times \\left(-\\frac{3}{7}\\right) = -1$, and at $x = 21$ the equation gives $49 - 44 = 5$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (slope $-\\frac{7}{3}$): inverts the given slope but negates it a second time, so it is perpendicular to the wrong line.\n* Choice B (slope $-\\frac{3}{7}$): reuses the perpendicular slope for the run itself.\n* Choice C (slope $\\frac{3}{7}$): keeps the given fraction and only changes its sign, skipping the inversion.\n\n**Test Day Takeaway:** The negative-reciprocal relationship runs both directions, so you can invert from either line to the other.",
      skills: ["perpendicular-negative-reciprocal", "writing-perpendicular-equation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "On a plot plan marked in feet, a fence line joins the points $(-3, 8)$ and $(5, 2)$, and a gate post line meets that fence line at a right angle. What is the slope of the gate post line?",
      choices: [
        // distractor: inverts the fence line's slope but keeps the negative sign
        { id: "A", text: "$-\\frac{4}{3}$" },
        // distractor: repeats the fence line's own slope instead of the perpendicular one
        { id: "B", text: "$-\\frac{3}{4}$" },
        // distractor: negates the fence line's slope without inverting it
        { id: "C", text: "$\\frac{3}{4}$" },
        { id: "D", text: "$\\frac{4}{3}$" }
      ],
      correctAnswer: "D",
      hint: "Find the fence line's slope from its two points first.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~35s):** The fence line's slope is $\\frac{2-8}{5-(-3)} = -\\frac{3}{4}$, so the gate post line has slope $\\frac{4}{3}$.\n\n**The Full Solution:**\nStep 1: The slope through $(-3,\\ 8)$ and $(5,\\ 2)$ is $\\frac{2 - 8}{5 - (-3)} = \\frac{-6}{8} = -\\frac{3}{4}$.\nStep 2: A perpendicular line has the negative reciprocal slope: invert $-\\frac{3}{4}$ to get $-\\frac{4}{3}$, then change the sign.\nStep 3: The gate post line has slope $\\frac{4}{3}$.\n\nCheck: $-\\frac{3}{4} \\times \\frac{4}{3} = -1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{4}{3}$): inverts the fence line's slope but leaves the sign negative, so the slopes multiply to $1$.\n* Choice B ($-\\frac{3}{4}$): repeats the fence line's own slope, which describes a parallel line.\n* Choice C ($\\frac{3}{4}$): only changes the sign, so the slopes multiply to $-\\frac{9}{16}$.\n\n**Test Day Takeaway:** Two points give a slope; perpendicularity then asks for both a flip and a sign change.",
      skills: ["perpendicular-negative-reciprocal"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "On a race committee's chart of a sailing course, distances are marked in hundreds of meters. The starting line has equation $5x - 2y = 14$, and the finish line, which is perpendicular to the starting line, contains the points $(11, k)$ and $(1, 11)$. What is the value of $k$?",
      choices: [
        // distractor: negates the starting line's slope without inverting it, using $-\frac{5}{2}$ and getting $k=-14$
        { id: "A", text: "$-14$" },
        { id: "B", text: "$7$" },
        // distractor: inverts the slope but keeps the sign, using $\frac{2}{5}$ and getting $k=15$
        { id: "C", text: "$15$" },
        // distractor: uses the starting line's own slope $\frac{5}{2}$ for the finish line and gets $k=36$
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "B",
      hint: "Perpendicular lines have slopes whose product is $-1$.",
      explanation: "**Choice B is correct.** The finish line's slope must be $-\\frac{2}{5}$, and forcing the two given points to produce that slope gives $k = 7$.\n\n**The Fast Way (~45s):** Solving $5x - 2y = 14$ for $y$ gives slope $\\frac{5}{2}$, so the perpendicular slope is $-\\frac{2}{5}$. Then $\\frac{11 - k}{1 - 11} = -\\frac{2}{5}$ gives $11 - k = 4$, so $k = 7$.\n\n**The Full Solution:**\n\nStep 1: Put the starting line in slope-intercept form. From $5x - 2y = 14$, $-2y = -5x + 14$, so $y = \\frac{5}{2}x - 7$ and the starting line's slope is $\\frac{5}{2}$.\n\nStep 2: Take the negative reciprocal. A line perpendicular to a line of slope $\\frac{5}{2}$ has slope $-\\frac{2}{5}$.\n\nStep 3: Write the slope of the finish line from its two points and set it equal to $-\\frac{2}{5}$: $\\frac{11 - k}{1 - 11} = \\frac{11 - k}{-10} = -\\frac{2}{5}$. Multiplying both sides by $-10$ gives $11 - k = 4$, so $k = 7$. Check: the finish line then joins $(11, 7)$ and $(1, 11)$, whose slope is $\\frac{11 - 7}{1 - 11} = \\frac{4}{-10} = -\\frac{2}{5}$, and $\\frac{5}{2} \\cdot \\left(-\\frac{2}{5}\\right) = -1$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-14$): changes the sign of $\\frac{5}{2}$ without inverting it. Solving $\\frac{11 - k}{-10} = -\\frac{5}{2}$ gives $11 - k = 25$, so $k = -14$.\n* Choice C ($15$): inverts the slope but keeps it positive. Solving $\\frac{11 - k}{-10} = \\frac{2}{5}$ gives $11 - k = -4$, so $k = 15$.\n* Choice D ($36$): treats the finish line as parallel to the starting line. Solving $\\frac{11 - k}{-10} = \\frac{5}{2}$ gives $11 - k = -25$, so $k = 36$.\n\n**Test Day Takeaway:** Perpendicular means flip AND change the sign; do both steps out loud before you touch the second pair of points.",
      skills: ["slope-from-points", "perpendicular-negative-reciprocal", "writing-perpendicular-equation"]
    }
  ]
};
