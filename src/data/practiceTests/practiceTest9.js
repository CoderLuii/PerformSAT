// Practice Test 9 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the prior
// blueprint: M1 5E/10M/7H; M2 wavy hard track (easy {1,3,14}, medium
// {2,5,6,8,10,17,19}, hard {4,7,9,11,12,13,15,16,18,20,21,22}).
// Figure density lifted toward official ~20%: M1 carries 5 visual items
// (2 scatterplots, 2 two-way tables, 1 right triangle), M2 carries 4
// (2 data tables, 1 dot plot, 1 triangle). Numeric MC choices sorted ascending.
// Scenario families: granola production, batting cages, street-sweeper routes,
// drone photography, mural coverage, print-shop poster runs, climbing walls,
// observatory dome rotation.

export const practiceTest9 = {
  id: "practice-test-9",
  title: "Practice Test 9",
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
  question: "A foundry weighs each metal in a 250-gram sample of an alloy and records the results in the table. Nickel accounts for what percent of the mass of the sample?",
  questionTable: { headers: ["Metal", "Mass (grams)"], rows: [["Copper", "150"], ["Zinc", "55"], ["Nickel", "30"], ["Tin", "15"]] },
  choices: [
    { id: "A", text: "$12\\%$" },
    // distractor: divides the nickel mass by the copper mass (30/150) instead of by the 250-gram total
    { id: "B", text: "$20\\%$" },
    // distractor: reads the zinc row instead of the nickel row (55/250)
    { id: "C", text: "$22\\%$" },
    // distractor: copies the nickel mass, 30 grams, straight into a percent
    { id: "D", text: "$30\\%$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Nickel is $30$ of the $250$ grams, and $\\frac{30}{250}=\\frac{12}{100}$, so nickel is $12\\%$ of the sample.\n\n**The Full Solution:**\nStep 1: The part is the nickel row of the table, $30$ grams. The whole is the mass of the entire sample, $250$ grams (and the four rows do sum to $250$: $150+55+30+15=250$).\nStep 2: A percent of a whole is $\\frac{\\text{part}}{\\text{whole}}\\times 100\\%$, so evaluate $\\frac{30}{250}\\times 100\\%$.\nStep 3: $\\frac{30}{250}=0.12$, so the nickel content is $12\\%$. Check by running it forward: $0.12(250)=30$ grams, which is exactly the nickel row ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($20\\%$): divides by the copper mass instead of the sample mass, $\\frac{30}{150}=0.20$. Copper is the largest row, not the whole.\n* Choice C ($22\\%$): uses the zinc row by mistake, $\\frac{55}{250}=0.22$.\n* Choice D ($30\\%$): reports the $30$ grams of nickel as $30\\%$, treating a mass as a percent.\n\n**Test Day Takeaway:** Percent of a whole is always part over the TOTAL, times $100$. Before dividing, name the whole out loud — here it is the $250$-gram sample, not the biggest row in the table.",
  skills: ["percent-of-value"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Three type-A sensors and two type-B sensors draw a total of 39 milliamperes, and three type-A sensors and six type-B sensors draw a total of 63 milliamperes. Sensors of the same type draw the same current. What is the current, in milliamperes, drawn by one type-B sensor?",
  choices: [
    // distractor: divides the 24-milliampere difference by 8, the sum of the two type-B counts, instead of by their difference
    { id: "A", text: "$3$" },
    // distractor: divides the 24-milliampere difference by 6, the type-B count in the second reading, instead of by the difference 4
    { id: "B", text: "$4$" },
    { id: "C", text: "$6$" },
    // distractor: solves for the wrong variable and gives the current drawn by one type-A sensor
    { id: "D", text: "$9$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Both readings include the same $3$ type-A sensors, so the extra $4$ type-B sensors account for the extra $63-39=24$ milliamperes: $b=\\frac{24}{4}=6$.\n\n**The Full Solution:**\nStep 1: Let $a$ be the current drawn by one type-A sensor and $b$ the current drawn by one type-B sensor, in milliamperes. The two readings give $3a+2b=39$ and $3a+6b=63$.\nStep 2: The $a$-terms already match, so subtract the first equation from the second: $(3a+6b)-(3a+2b)=63-39$, which is $4b=24$.\nStep 3: Divide by $4$: $b=6$. Check: $4b=24$ leaves $3a=39-2(6)=27$, so $a=9$, and $3(9)+6(6)=27+36=63$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): divides the $24$-milliampere difference by $2+6=8$, the total number of type-B sensors in both readings, rather than by the $4$ extra sensors.\n* Choice B ($4$): divides $24$ by $6$, the type-B count in the second reading, instead of by the difference $6-2=4$.\n* Choice D ($9$): this is $a$, the current drawn by one type-A sensor — the right work stopped on the wrong variable.\n\n**Test Day Takeaway:** When one variable appears with the SAME coefficient in both equations, subtract immediately: the difference in the totals belongs entirely to the difference in the other variable's count.",
  skills: ["elimination-method", "setting-up-systems"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The equations $4x+6y=30$ and $10x+15y=c$ constrain the numbers of liters $x$ and $y$ of two solvents in a blend, and every blend allowed by one equation is allowed by the other. What is the value of $c$?",
  choices: [
    // distractor: divides 30 by the multiplier 2.5 instead of multiplying
    { id: "A", text: "$12$" },
    // distractor: assumes equivalent equations must carry the same constant
    { id: "B", text: "$30$" },
    // distractor: adds the difference of the x-coefficients (10 - 4 = 6) to 30
    { id: "C", text: "$36$" },
    { id: "D", text: "$75$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** $10x+15y$ is $2.5$ times $4x+6y$, so the constant must be scaled the same way: $c=2.5(30)=75$.\n\n**The Full Solution:**\nStep 1: Two linear equations have exactly the same solutions only when one is a nonzero multiple of the other, so every coefficient must be scaled by one common factor $k$.\nStep 2: Find $k$ from the $x$-terms: $10=k(4)$ gives $k=2.5$. Confirm with the $y$-terms: $2.5(6)=15$ ✓, so the left sides really are proportional.\nStep 3: Apply the same $k$ to the constant: $c=2.5(30)=75$. Check: dividing $10x+15y=75$ by $2.5$ returns $4x+6y=30$, the original equation ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): divides by the multiplier, $\\frac{30}{2.5}=12$, scaling the constant the wrong direction.\n* Choice B ($30$): assumes equivalent equations must show the same constant, but the whole equation was multiplied by $2.5$.\n* Choice C ($36$): adds the coefficient gap $10-4=6$ to $30$ instead of multiplying by the common ratio.\n\n**Test Day Takeaway:** Same-solution systems are proportional lines. Find the multiplier from one pair of coefficients, verify it on the second pair, then apply that SAME multiplier to the constant.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A casting measured 512 degrees Celsius 4 minutes after pouring and 272 degrees Celsius 24 minutes after pouring. Over this interval, what was the average rate of change of the casting temperature, in degrees Celsius per minute?",
  choices: [
    { id: "A", text: "$-12$" },
    // distractor: divides the 240-degree drop by the final time 24 instead of by the 20-minute interval
    { id: "B", text: "$-10$" },
    // distractor: divides by the final time 24 and also drops the negative sign
    { id: "C", text: "$10$" },
    // distractor: right size but positive: subtracts the temperatures in the reverse order from the times
    { id: "D", text: "$12$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The temperature falls $240$ degrees over $20$ minutes, so the rate is $-\\frac{240}{20}=-12$ degrees Celsius per minute.\n\n**The Full Solution:**\nStep 1: Write the two measurements as points (time, temperature): $(4,\\,512)$ and $(24,\\,272)$.\nStep 2: Average rate of change is the slope, $\\frac{y_2-y_1}{x_2-x_1}=\\frac{272-512}{24-4}=\\frac{-240}{20}$.\nStep 3: $\\frac{-240}{20}=-12$ degrees Celsius per minute. Check: $512+(-12)(20)=512-240=272$, the reading at $24$ minutes ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-10$): divides the $240$-degree drop by the clock reading $24$ instead of by the elapsed time $24-4=20$.\n* Choice C ($10$): the same wrong denominator, with the sign of a decrease dropped as well.\n* Choice D ($12$): the right magnitude but positive — the temperatures were subtracted in one order and the times in the other. A cooling casting must give a negative rate.\n\n**Test Day Takeaway:** Slope uses CHANGES, not readings: subtract both coordinates in the same order, and sanity-check the sign against the story — falling quantity, negative rate.",
  skills: ["slope-from-points"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Two anchor bolts on an engineering site plan sit at $(-6,\\,11)$ and $(14,\\,1)$ in the xy-plane, with coordinates measured in meters. A third bolt is placed halfway between them. What are the coordinates of the third bolt?",
  choices: [
    // distractor: averages the x-coordinates but halves the DIFFERENCE of the y-coordinates
    { id: "A", text: "$(4,\\,-5)$" },
    { id: "B", text: "$(4,\\,6)$" },
    // distractor: adds the coordinates without dividing either sum by 2
    { id: "C", text: "$(8,\\,12)$" },
    // distractor: halves the differences instead of the sums in both coordinates
    { id: "D", text: "$(10,\\,-5)$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Average each coordinate: $\\frac{-6+14}{2}=4$ and $\\frac{11+1}{2}=6$, so the bolt goes at $(4,\\,6)$.\n\n**The Full Solution:**\nStep 1: A point halfway between two points is their midpoint, $\\left(\\frac{x_1+x_2}{2},\\ \\frac{y_1+y_2}{2}\\right)$.\nStep 2: Substitute $(-6,\\,11)$ and $(14,\\,1)$: the $x$-coordinate is $\\frac{-6+14}{2}=\\frac{8}{2}=4$.\nStep 3: The $y$-coordinate is $\\frac{11+1}{2}=\\frac{12}{2}=6$, so the third bolt is at $(4,\\,6)$. Check: from $(-6,\\,11)$ to $(4,\\,6)$ is $10$ right and $5$ down, and from $(4,\\,6)$ to $(14,\\,1)$ is also $10$ right and $5$ down ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(4,\\,-5)$): the $x$-coordinate is averaged correctly, but the $y$-coordinate uses $\\frac{1-11}{2}=-5$, a half-difference instead of a half-sum.\n* Choice C ($(8,\\,12)$): adds the coordinates, $(-6+14,\\ 11+1)$, and forgets to divide by $2$.\n* Choice D ($(10,\\,-5)$): halves both differences, $\\left(\\frac{14-(-6)}{2},\\ \\frac{1-11}{2}\\right)$ — that is half the displacement between the bolts, not the point between them.\n\n**Test Day Takeaway:** Midpoint = AVERAGE, so add then halve. If a coordinate of your answer falls outside the two given values, you subtracted where you should have added.",
  skills: ["coordinate-geometry"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A two-stage converter accepts only the five inputs listed in the table, which also gives the output of each of its two conversion functions, $f$ and $g$, at those inputs. What is the value of $f(g(2))$?",
  questionTable: { headers: ["$x$", "$f(x)$", "$g(x)$"], rows: [["1", "7", "4"], ["2", "3", "5"], ["3", "5", "1"], ["4", "2", "3"], ["5", "9", "2"]] },
  choices: [
    // distractor: composes in the wrong order and computes g(f(2)) = g(3) = 1
    { id: "A", text: "$1$" },
    // distractor: reads f(2) = 3 and stops, never applying g first
    { id: "B", text: "$3$" },
    // distractor: stops at the inner value g(2) = 5 without applying f
    { id: "C", text: "$5$" },
    { id: "D", text: "$9$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** Inside first: $g(2)=5$, then $f(5)=9$.\n\n**The Full Solution:**\nStep 1: $f(g(2))$ means evaluate $g$ at $2$ first, then feed that OUTPUT into $f$ — the parentheses fix the order.\nStep 2: In the row $x=2$, the $g(x)$ column gives $g(2)=5$.\nStep 3: Now evaluate $f$ at $5$: in the row $x=5$, the $f(x)$ column gives $f(5)=9$, so $f(g(2))=9$. Check the order the other way: $g(f(2))=g(3)=1$, a different value, so the order genuinely matters ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): composes backwards, computing $g(f(2))=g(3)=1$.\n* Choice B ($3$): reads $f(2)=3$ from the table and stops, skipping stage $g$ entirely.\n* Choice C ($5$): stops at the inner value $g(2)=5$ without sending it through $f$.\n\n**Test Day Takeaway:** Work composition from the inside out and label the intermediate value before you look anything else up: $g(2)=5$ first, and $5$ becomes the new input.",
  skills: ["function-composition"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 4,
  question: "A calibration step multiplies every reading from a thickness gauge by one positive constant. Before calibration the readings have a mean of $8.4$ and a standard deviation of $1.2$; after calibration the standard deviation is $4.2$. What is the mean of the calibrated readings?",
  choices: [
    // distractor: inverts the scale factor and multiplies the mean by 1.2/4.2 instead of 4.2/1.2
    { id: "A", text: "$2.4$" },
    // distractor: adds the change of 3 in the standard deviation to the mean instead of scaling
    { id: "B", text: "$11.4$" },
    // distractor: uses the difference 4.2 - 1.2 = 3 as the constant instead of the ratio 3.5
    { id: "C", text: "$25.2$" },
    { id: "D", text: "$29.4$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Multiplying every value by $c$ multiplies both the mean and the standard deviation by $c$, so $c=\\frac{4.2}{1.2}=3.5$ and the new mean is $3.5(8.4)=29.4$.\n\n**The Full Solution:**\nStep 1: Let $c$ be the calibration constant. Scaling every reading by $c$ scales the standard deviation by $c$ as well, since every deviation from the mean is stretched by the same factor.\nStep 2: The standard deviation ran from $1.2$ to $4.2$, so $1.2c=4.2$, which gives $c=3.5$.\nStep 3: The mean scales by the same $c$: $8.4(3.5)=29.4$. Check the ratio both ways: $\\frac{29.4}{8.4}=3.5$ and $\\frac{4.2}{1.2}=3.5$, the same constant ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.4$): uses $\\frac{1.2}{4.2}$ as the constant, $8.4\\left(\\frac{1.2}{4.2}\\right)=2.4$ — the scale factor is upside down, and a spread that grew cannot shrink the mean.\n* Choice B ($11.4$): adds the change in spread, $8.4+(4.2-1.2)=11.4$, treating a multiplication as a shift.\n* Choice C ($25.2$): uses the difference $4.2-1.2=3$ as the multiplier, $8.4(3)=25.2$, instead of the ratio $3.5$.\n\n**Test Day Takeaway:** Multiplying a data set by $c$ multiplies mean, median, and standard deviation by $c$; ADDING a constant moves the mean but leaves the standard deviation alone. Recover $c$ from whichever statistic the problem gives you, then apply it once.",
  skills: ["data-analysis"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "In triangles ABC and DEF, angle A is congruent to angle D and angle B is congruent to angle E. Side AB has length 12, side BC has length 18, side DE has length 30, and side EF has length 5k, where k is a positive constant. What is the value of k?",
  correctAnswer: "9",
  explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is 9.**\n\n**The Fast Way (~25s):** Two pairs of congruent angles make the triangles similar, and $DE$ is $2.5$ times $AB$, so $EF=2.5(18)=45$ and $5k=45$ gives $k=9$.\n\n**The Full Solution:**\nStep 1: Angle $A\\cong$ angle $D$ and angle $B\\cong$ angle $E$, so triangle $ABC$ is similar to triangle $DEF$ by AA. The correspondence $A\\to D$, $B\\to E$, $C\\to F$ pairs $AB$ with $DE$ and $BC$ with $EF$.\nStep 2: Corresponding sides are proportional: $\\frac{AB}{DE}=\\frac{BC}{EF}$, so $\\frac{12}{30}=\\frac{18}{5k}$.\nStep 3: Cross-multiply: $12(5k)=18(30)$, so $60k=540$ and $k=9$. Check: $k=9$ makes $EF=5(9)=45$, and $\\frac{12}{30}=0.4=\\frac{18}{45}$ ✓\n\n**Common Mistakes:**\n* $1.44$: writes the proportion upside down on one side, $\\frac{30}{12}=\\frac{18}{5k}$, which gives $5k=7.2$ and $k=1.44$.\n* $45$: solves correctly for the LENGTH $EF=45$ but forgets that the question asks for $k$, where $EF=5k$.\n* $7.2$: matches the triangles by adding instead of scaling, using $EF=18+(30-12)=36$, so $5k=36$ and $k=7.2$.\n\n**Test Day Takeaway:** Write the correspondence from the ANGLE statement first, then build the proportion side-by-side in that order. When a side is given as an expression like $5k$, solve for the side, then finish the last step and solve for the letter.",
  skills: ["similar-triangles"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A CNC router cuts a closed path whose equation in the xy-plane is $x^2+y^2-14x+8y+16=0$, where distances are measured in centimeters. Which of the following statements about the cut path is true?",
  choices: [
    // distractor: reads the center straight off the signs in the equation, giving (-7, 4) instead of (7, -4)
    { id: "A", text: "It is a circle with center $(-7,\\,4)$ and radius $7$." },
    // distractor: completes the square on x only and forgets to add 16 back for the y-terms, leaving 33
    { id: "B", text: "It is a circle with center $(7,\\,-4)$ and radius $\\sqrt{33}$." },
    { id: "C", text: "It is a circle with center $(7,\\,-4)$ and radius $7$." },
    // distractor: moves the constant 16 to the right side as +16 instead of -16, giving 81
    { id: "D", text: "It is a circle with center $(7,\\,-4)$ and radius $9$." }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Half of $-14$ is $-7$ and half of $8$ is $4$, so the center is $(7,\\,-4)$ and the radius satisfies $r^2=(-7)^2+4^2-16=49$, giving $r=7$.\n\n**The Full Solution:**\nStep 1: Group and move the constant: $x^2-14x+y^2+8y=-16$.\nStep 2: Complete both squares. For $x$: half of $-14$ is $-7$, and $(-7)^2=49$. For $y$: half of $8$ is $4$, and $4^2=16$. Add BOTH to each side: $(x-7)^2+(y+4)^2=-16+49+16$.\nStep 3: The right side is $49$, so $(x-7)^2+(y+4)^2=49$: center $(7,\\,-4)$, radius $\\sqrt{49}=7$ centimeters. Check a point that should be $7$ centimeters right of the center, $(14,\\,-4)$, in the original equation: $196+16-196-32+16=0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: copies the signs out of the equation, reporting $(-7,\\,4)$. Standard form is $(x-h)^2+(y-k)^2$, so $(x-7)^2$ means $h=+7$.\n* Choice B: adds $49$ to the right side but not the $16$ from the $y$-terms, leaving $r^2=33$.\n* Choice D: carries the $+16$ across as $+16$ instead of $-16$, giving $r^2=81$ and $r=9$.\n\n**Test Day Takeaway:** Complete the square on both variables and add BOTH new constants to the right side. The center's signs are the opposite of what you see inside the parentheses, and the radius is the square root of the right side, not the right side itself.",
  skills: ["circle-equation"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An extruder deposits polymer at a constant rate of 45 grams per minute. Running without interruption at that rate, it deposited 32.4 kilograms of polymer. For how many hours did the extruder run?",
  choices: [
    // distractor: divides by 60 twice, converting minutes to hours a second time
    { id: "A", text: "$0.2$" },
    // distractor: uses 1 kilogram = 100 grams, so 3,240 grams instead of 32,400
    { id: "B", text: "$1.2$" },
    { id: "C", text: "$12$" },
    // distractor: stops at 720 minutes and reports the minutes as hours
    { id: "D", text: "$720$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** $32.4$ kilograms is $32{,}400$ grams, and $\\frac{32{,}400}{45}=720$ minutes, which is $\\frac{720}{60}=12$ hours.\n\n**The Full Solution:**\nStep 1: Put the total and the rate in the same unit of mass: $32.4$ kilograms $\\times\\ 1{,}000$ grams per kilogram $=32{,}400$ grams.\nStep 2: Set up the proportion $\\frac{45\\text{ grams}}{1\\text{ minute}}=\\frac{32{,}400\\text{ grams}}{t\\text{ minutes}}$, so $45t=32{,}400$ and $t=720$ minutes.\nStep 3: Convert to hours: $\\frac{720}{60}=12$ hours. Check forward: $45$ grams per minute $\\times\\ 60=2{,}700$ grams per hour, and $2{,}700(12)=32{,}400$ grams $=32.4$ kilograms ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.2$): divides by $60$ a second time, $\\frac{12}{60}=0.2$, converting to hours twice.\n* Choice B ($1.2$): uses $1$ kilogram $=100$ grams, so $\\frac{3{,}240}{45}=72$ minutes $=1.2$ hours.\n* Choice D ($720$): the correct time in MINUTES, reported as hours. A machine running $720$ hours is a month of nonstop operation.\n\n**Test Day Takeaway:** Fix the units before you divide, and finish by rereading the unit the question asks for. Two conversions (grams and minutes) means two places to lose a factor.",
  skills: ["unit-conversion"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table gives the electricity cost for a household for four consecutive months. What was the percent decrease in this cost from March to June?",
  questionTable: { headers: ["Month", "Electricity cost (dollars)"], rows: [["March", "184"], ["April", "161"], ["May", "150"], ["June", "138"]] },
  choices: [
    // distractor: measures the decrease from April instead of March: 23/161
    { id: "A", text: "$14.3\\%$" },
    { id: "B", text: "$25\\%$" },
    // distractor: divides the 46-dollar drop by the NEW cost 138 instead of the original 184
    { id: "C", text: "$33.3\\%$" },
    // distractor: reports the ratio 138/184 of the new cost to the old, not the percent decrease
    { id: "D", text: "$75\\%$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The cost dropped $184-138=46$ dollars from an original $184$, and $\\frac{46}{184}=\\frac{1}{4}$, so the decrease is $25\\%$.\n\n**The Full Solution:**\nStep 1: Read the two months the question names: March is $184$ dollars (the ORIGINAL) and June is $138$ dollars (the new amount).\nStep 2: Percent decrease is $\\frac{\\text{original}-\\text{new}}{\\text{original}}\\times 100\\%=\\frac{184-138}{184}\\times 100\\%$.\nStep 3: $\\frac{46}{184}=0.25$, so the cost fell $25\\%$. Check: $184(1-0.25)=184(0.75)=138$, the June cost ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($14.3\\%$): uses the April cost as the starting point, $\\frac{161-138}{161}\\approx 0.143$ — the wrong row.\n* Choice C ($33.3\\%$): divides the $46$-dollar drop by the NEW cost, $\\frac{46}{138}\\approx 0.333$. Percent change always divides by the ORIGINAL.\n* Choice D ($75\\%$): computes $\\frac{138}{184}=0.75$, the fraction of the cost that REMAINS, not the fraction lost.\n\n**Test Day Takeaway:** Percent decrease $=\\frac{\\text{drop}}{\\text{original}}$. If your answer is the leftover share instead of the change, subtract it from $100\\%$ — and always confirm which two rows the question names.",
  skills: ["percent-change"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A bin holds 5 titanium washers and n steel washers. An inspector reaches in and pulls out two washers at the same time, and the probability that both are titanium is $\\frac{5}{33}$. What is the value of n?",
  choices: [
    { id: "A", text: "$7$" },
    // distractor: matches 132 = 12 x 11 to the wrong factor, setting n + 4 = 12 instead of n + 5 = 12
    { id: "B", text: "$8$" },
    // distractor: reports the total number of washers, 12, rather than the number of steel washers
    { id: "C", text: "$12$" },
    // distractor: treats 5/33 as a one-draw probability and solves 5/(5 + n) = 5/33
    { id: "D", text: "$28$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Probability Without Replacement**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** With $T=n+5$ washers, $\\frac{5}{T}\\cdot\\frac{4}{T-1}=\\frac{5}{33}$ forces $T(T-1)=132=12\\cdot 11$, so $T=12$ and $n=7$.\n\n**The Full Solution:**\nStep 1: Let $T=n+5$ be the total number of washers. Pulling two at once is the same as drawing two without replacement: the first is titanium with probability $\\frac{5}{T}$, and then only $4$ titanium washers remain among $T-1$.\nStep 2: So $\\frac{5}{T}\\cdot\\frac{4}{T-1}=\\frac{20}{T(T-1)}=\\frac{5}{33}$. Cross-multiplying gives $5T(T-1)=660$, so $T(T-1)=132$.\nStep 3: $132=12\\cdot 11$, so $T=12$ and $n=12-5=7$. Check: $\\frac{5}{12}\\cdot\\frac{4}{11}=\\frac{20}{132}=\\frac{5}{33}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($8$): finds $T(T-1)=132$ correctly but sets $n+4=12$, matching the total to the SECOND factor instead of the first.\n* Choice C ($12$): this is $T$, the total number of washers; the question asks only for the steel ones.\n* Choice D ($28$): treats $\\frac{5}{33}$ as the chance of one titanium washer, solving $\\frac{5}{5+n}=\\frac{5}{33}$ to get $n=28$.\n\n**Test Day Takeaway:** Without replacement, the second fraction loses one from BOTH the numerator and the denominator. Reduce the equation to $T(T-1)=\\text{integer}$ and factor it as two consecutive integers — then answer the quantity actually asked for.",
  skills: ["probability-basics"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A plating run has two costing formulas, $a(2x+5)-3(x-4)$ and $7x+b$, that give the same result for every value of $x$. Here $a$ and $b$ are constants. What is the value of $b$?",
  choices: [
    // distractor: stops after finding a = 5 and reports a instead of b
    { id: "A", text: "$5$" },
    // distractor: distributes -3(x - 4) as -3x - 12, so the constant becomes 25 - 12 = 13
    { id: "B", text: "$13$" },
    { id: "C", text: "$37$" },
    // distractor: reports a + b = 5 + 37 instead of b alone
    { id: "D", text: "$42$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Matching Coefficients**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Expanding gives $(2a-3)x+(5a+12)$, so $2a-3=7$ makes $a=5$, and then $b=5(5)+12=37$.\n\n**The Full Solution:**\nStep 1: Expand the left formula: $a(2x+5)-3(x-4)=2ax+5a-3x+12$, which groups as $(2a-3)x+(5a+12)$.\nStep 2: Two formulas that agree for EVERY $x$ must match term by term. The $x$-terms give $2a-3=7$, so $2a=10$ and $a=5$.\nStep 3: The constant terms give $b=5a+12=5(5)+12=37$. Check at $x=1$: the left side is $5(7)-3(-3)=35+9=44$, and the right side is $7+37=44$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): this is $a$, found on the way to $b$ — the question asks for the constant term.\n* Choice B ($13$): distributes $-3(x-4)$ as $-3x-12$, so the constant reads $25-12=13$. Subtracting a negative adds $+12$.\n* Choice D ($42$): adds $a$ and $b$ together, $5+37=42$, instead of reporting $b$.\n\n**Test Day Takeaway:** “True for every value of $x$” means the coefficients match one axis at a time: solve the $x$-coefficient equation first, substitute that value into the constant equation, then check which letter the question wants.",
  skills: ["distributive-property"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A workshop membership costs $\\$338$ for the month plus $\\$26$ for each hour of shop time used. A member was billed $\\$1{,}378$ for the month. How many hours of shop time did the member use?",
  choices: [
    // distractor: swaps the roles of the two given amounts, computing (1,378 - 26)/338
    { id: "A", text: "$4$" },
    { id: "B", text: "$40$" },
    // distractor: ignores the 338-dollar monthly charge and divides 1,378 by 26
    { id: "C", text: "$53$" },
    // distractor: adds the monthly charge instead of subtracting it, computing (1,378 + 338)/26
    { id: "D", text: "$66$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Strip the fixed charge first: $1{,}378-338=1{,}040$, and $\\frac{1{,}040}{26}=40$ hours.\n\n**The Full Solution:**\nStep 1: Let $h$ be the number of hours of shop time. The bill is a fixed charge plus a per-hour charge, so $338+26h=1{,}378$.\nStep 2: Subtract the fixed charge from both sides: $26h=1{,}378-338=1{,}040$.\nStep 3: Divide by the hourly rate: $h=\\frac{1{,}040}{26}=40$ hours. Check: $338+26(40)=338+1{,}040=1{,}378$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): treats $\\$26$ as the fixed charge and $\\$338$ as the hourly rate, computing $\\frac{1{,}378-26}{338}=4$.\n* Choice C ($53$): divides the whole bill by the hourly rate, $\\frac{1{,}378}{26}=53$, charging the member for the $\\$338$ at the hourly rate too.\n* Choice D ($66$): adds the monthly charge instead of removing it, $\\frac{1{,}378+338}{26}=66$.\n\n**Test Day Takeaway:** A one-time amount and a per-unit amount play different roles: subtract the one-time charge FIRST, then divide by the rate. Ask which number is attached to the word “each.”",
  skills: ["word-problem-to-equation"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A saver deposits a total of $\\$8{,}000$, splitting it between an account paying 3 percent simple interest per year and an account paying 5 percent simple interest per year, and earns $\\$340$ in interest in one year. How many dollars were deposited in the 5 percent account?",
  correctAnswer: "5000",
  explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**The correct answer is 5000.**\n\n**The Fast Way (~40s):** If all $\\$8{,}000$ earned $3\\%$, the interest would be $\\$240$; each dollar moved to the $5\\%$ account adds $\\$0.02$, and $\\frac{340-240}{0.02}=5{,}000$.\n\n**The Full Solution:**\nStep 1: Let $x$ be the dollars in the $3\\%$ account and $y$ the dollars in the $5\\%$ account. The deposits give $x+y=8{,}000$, and the one-year interest gives $0.03x+0.05y=340$.\nStep 2: Substitute $x=8{,}000-y$ into the interest equation: $0.03(8{,}000-y)+0.05y=340$, which is $240-0.03y+0.05y=340$, or $0.02y=100$.\nStep 3: Divide by $0.02$: $y=5{,}000$ dollars. Check: $x=3{,}000$, and $0.03(3{,}000)+0.05(5{,}000)=90+250=340$ ✓\n\n**Common Mistakes:**\n* $3000$: solves the system correctly but reports $x$, the amount in the $3\\%$ account.\n* $6800$: divides the whole interest by the higher rate, $\\frac{340}{0.05}=6{,}800$, as though only one account existed.\n* $4000$: assumes the money splits evenly because $340$ sits between the two extremes, but $4\\%$ of $\\$8{,}000$ is $\\$320$, not $\\$340$.\n\n**Test Day Takeaway:** Two unknowns need two equations: one counting the dollars deposited, one counting the dollars earned. Substituting the total equation into the money equation turns it into a single equation in the variable you actually want.",
  skills: ["word-problem-to-equation", "setting-up-systems"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A signal profiler stores the function $f$ as the four input-output pairs listed in the table and then shifts it, producing the function $h$ with $h(x)=f(x-c)$ for a constant $c$. Given that $h(9)=12$, what is the value of $c$?",
  questionTable: { headers: ["$x$", "$f(x)$"], rows: [["1", "12"], ["4", "3"], ["7", "9"], ["10", "5"]] },
  choices: [
    // distractor: shifts the wrong way, solving 9 + c = 1
    { id: "A", text: "$-8$" },
    // distractor: sets the input 9 - c equal to the OUTPUT 12 rather than to the input 1
    { id: "B", text: "$-3$" },
    // distractor: matches the output 9 in the table instead of the output 12, solving 9 - c = 7
    { id: "C", text: "$2$" },
    { id: "D", text: "$8$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Transformation**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** $h(9)=f(9-c)$, and the only input with output $12$ is $x=1$, so $9-c=1$ and $c=8$.\n\n**The Full Solution:**\nStep 1: The rule $h(x)=f(x-c)$ says: to evaluate $h$ at $9$, evaluate $f$ at $9-c$. So $h(9)=f(9-c)=12$.\nStep 2: Scan the $f(x)$ column for the output $12$. It appears once, in the row $x=1$, so the input to $f$ must be $1$: $9-c=1$.\nStep 3: Solve: $c=9-1=8$. Check: with $c=8$, $h(9)=f(9-8)=f(1)=12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$): solves $9+c=1$, shifting the graph the wrong direction. In $f(x-c)$ the input is REDUCED by $c$.\n* Choice B ($-3$): sets $9-c=12$, matching the number $12$ to an input when $12$ is an output.\n* Choice C ($2$): uses the row $x=7$ because $9$ appears in the $f(x)$ column there, solving $9-c=7$. The $9$ in $h(9)$ is an input, not an output.\n\n**Test Day Takeaway:** Translate $h(9)=f(9-c)$ before you look at anything else, then hunt the TABLE for the row whose OUTPUT matches. Keeping inputs and outputs in separate columns of your scratch work kills both traps here.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In a tolerance study the constant $k$ ranges over the even positive integers, and the study keeps exactly those values of $k$ for which $3x^2+kx+12=0$ has no real solution. How many values does it keep?",
  choices: [
    // distractor: drops the leading coefficient and uses k^2 < 48 instead of k^2 < 144, leaving the even values 2, 4, 6
    { id: "A", text: "$3$" },
    { id: "B", text: "$5$" },
    // distractor: includes k = 12, where the discriminant is 0 and there is one repeated real solution
    { id: "C", text: "$6$" },
    // distractor: counts every positive integer from 1 to 11 and ignores the restriction to even values
    { id: "D", text: "$11$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** No real solution means $k^2-4(3)(12)<0$, so $k^2<144$ and $0<k<12$; the even values in that range are $2,4,6,8,10$ — five of them.\n\n**The Full Solution:**\nStep 1: For $ax^2+bx+c=0$, the equation has no real solution exactly when the discriminant $b^2-4ac$ is negative. Here $a=3$, $b=k$, $c=12$, so the condition is $k^2-4(3)(12)<0$, that is $k^2<144$.\nStep 2: $k^2<144$ gives $-12<k<12$, and $k$ is positive, so $0<k<12$.\nStep 3: Now apply the second restriction: $k$ must be EVEN, so $k\\in\\{2,4,6,8,10\\}$, which is $5$ values. Check the endpoint: $k=10$ gives $100-144=-44<0$ (no real solution), while $k=12$ gives $144-144=0$, a repeated real solution, so $12$ is not kept ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): uses $k^2<4(12)=48$, dropping the leading coefficient $3$ out of $4ac$; that keeps only $2,4,6$.\n* Choice C ($6$): counts $k=12$ as well, but a zero discriminant gives one repeated REAL solution, so it does not qualify.\n* Choice D ($11$): counts every integer $1$ through $11$, ignoring the restriction that $k$ is even.\n\n**Test Day Takeaway:** Turn the wording into a discriminant inequality first ($<0$ none, $=0$ one, $>0$ two), solve for the bound, then filter by EVERY restriction the problem places on the constant — and test the endpoint before you count it.",
  skills: ["discriminant-analysis"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An engineer must report the constants $h$ and $k$ for which the load expression $4x^2-40x+118$ equals $4(x-h)^2+k$ at every value of $x$. What is the value of $h+k$?",
  choices: [
    // distractor: adds the leading coefficient 4 to h = 5 instead of adding h and k
    { id: "A", text: "$9$" },
    // distractor: takes h = -5, reading the sign of the -40x term straight into h
    { id: "B", text: "$13$" },
    { id: "C", text: "$23$" },
    // distractor: subtracts 25 rather than 4(25) = 100, so k comes out as 93
    { id: "D", text: "$98$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Factor the $4$ out of the first two terms: $4(x^2-10x)+118=4(x-5)^2-100+118=4(x-5)^2+18$, so $h+k=5+18=23$.\n\n**The Full Solution:**\nStep 1: Factor $4$ from the $x$-terms only: $4x^2-40x+118=4(x^2-10x)+118$.\nStep 2: Complete the square inside the parentheses. Half of $-10$ is $-5$, and $(-5)^2=25$, so $x^2-10x=(x-5)^2-25$. Substituting gives $4\\left[(x-5)^2-25\\right]+118=4(x-5)^2-100+118$.\nStep 3: Combine the constants: $4(x-5)^2+18$, so $h=5$, $k=18$, and $h+k=23$. Check by expanding: $4(x-5)^2+18=4x^2-40x+100+18=4x^2-40x+118$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): adds the leading coefficient to $h$, $4+5$, instead of adding $h$ and $k$.\n* Choice B ($13$): sets $h=-5$ from the $-40x$ term, then reports $-5+18=13$. In $(x-h)^2$ the constant inside is $-h$, so $x-5$ means $h=+5$.\n* Choice D ($98$): subtracts only $25$ rather than $4(25)=100$, giving $k=93$ and $5+93=98$. The $25$ sits inside the parentheses, so it is multiplied by the $4$ outside.\n\n**Test Day Takeaway:** Factor the leading coefficient out FIRST, complete the square inside, and remember that whatever you subtract inside the parentheses gets multiplied by that coefficient on the way out. Expanding your answer takes ten seconds and catches all three traps.",
  skills: ["quadratics"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A triangular sheet-metal blank has angles measuring $30^\\circ$, $60^\\circ$, and $90^\\circ$, and its edge opposite the $60^\\circ$ angle is $12\\sqrt{3}$ centimeters long. In square centimeters, the blank's area equals which expression?",
  choices: [
    // distractor: treats the given 12 root 3 as the hypotenuse, making the legs 6 root 3 and 18
    { id: "A", text: "$54\\sqrt{3}$" },
    { id: "B", text: "$72\\sqrt{3}$" },
    // distractor: multiplies the two legs but omits the factor of one half
    { id: "C", text: "$144\\sqrt{3}$" },
    // distractor: treats the given 12 root 3 as the side opposite the 30 degree angle, making the other leg 36
    { id: "D", text: "$216\\sqrt{3}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** In a $30^\\circ$-$60^\\circ$-$90^\\circ$ triangle the side opposite $60^\\circ$ is $\\sqrt{3}$ times the side opposite $30^\\circ$, so that shorter leg is $12$ and the area is $\\frac{1}{2}(12)\\left(12\\sqrt{3}\\right)=72\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: The angles $30^\\circ$, $60^\\circ$, $90^\\circ$ put the sides in the ratio $1:\\sqrt{3}:2$, opposite those angles in that order. The given edge faces the $60^\\circ$ angle, so it is the $\\sqrt{3}$ part — the LONGER LEG, not the hypotenuse.\nStep 2: Set $s\\sqrt{3}=12\\sqrt{3}$, so $s=12$: the leg opposite $30^\\circ$ is $12$ centimeters and the hypotenuse is $24$ centimeters. Both legs meet at the right angle, so they are the base and the height.\nStep 3: Area $=\\frac{1}{2}(12)\\left(12\\sqrt{3}\\right)=72\\sqrt{3}$ square centimeters. Check with the Pythagorean theorem: $12^2+\\left(12\\sqrt{3}\\right)^2=144+432=576=24^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($54\\sqrt{3}$): reads $12\\sqrt{3}$ as the hypotenuse, so the legs become $6\\sqrt{3}$ and $18$ and the area becomes $\\frac{1}{2}\\left(6\\sqrt{3}\\right)(18)=54\\sqrt{3}$. The hypotenuse faces the $90^\\circ$ angle, not the $60^\\circ$ one.\n* Choice C ($144\\sqrt{3}$): multiplies the two legs, $(12)\\left(12\\sqrt{3}\\right)=144\\sqrt{3}$, but that product is the area of the RECTANGLE the legs span, twice the triangle.\n* Choice D ($216\\sqrt{3}$): reads $12\\sqrt{3}$ as the side opposite the $30^\\circ$ angle, making the other leg $12\\sqrt{3}\\cdot\\sqrt{3}=36$ and the area $\\frac{1}{2}\\left(12\\sqrt{3}\\right)(36)=216\\sqrt{3}$.\n\n**Test Day Takeaway:** In a special right triangle, first decide WHICH side you were handed: match the given side to the angle it faces before you scale $1:\\sqrt{3}:2$. Then the area is half the product of the two LEGS, never the hypotenuse.",
  skills: ["triangle-area"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A truss panel is modeled by right triangle $JKL$, where the right angle is at $K$ and $\\tan J=\\frac{2}{5}$. Which expression is equivalent to $\\cos L$?",
  choices: [
    { id: "A", text: "$\\frac{2}{\\sqrt{29}}$" },
    // distractor: gives sin L: uses the leg opposite angle L instead of the leg adjacent to it
    { id: "B", text: "$\\frac{5}{\\sqrt{29}}$" },
    // distractor: gives tan L, the ratio of the two legs, rather than a cosine
    { id: "C", text: "$\\frac{5}{2}$" },
    // distractor: inverts the cosine, writing hypotenuse over the adjacent leg
    { id: "D", text: "$\\frac{\\sqrt{29}}{2}$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** $\\tan J=\\frac{2}{5}$ makes the legs $2$ and $5$ and the hypotenuse $\\sqrt{29}$; for angle $L$ the adjacent leg is the $2$, so $\\cos L=\\frac{2}{\\sqrt{29}}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $K$, so the legs are $JK$ and $KL$ and the hypotenuse is $JL$. From $\\tan J=\\frac{\\text{opposite}}{\\text{adjacent}}=\\frac{KL}{JK}=\\frac{2}{5}$, take $KL=2t$ and $JK=5t$ for some $t>0$.\nStep 2: By the Pythagorean theorem, $JL=\\sqrt{(2t)^2+(5t)^2}=\\sqrt{29t^2}=t\\sqrt{29}$.\nStep 3: Angle $L$ sits between side $KL$ and the hypotenuse, so $\\cos L=\\frac{KL}{JL}=\\frac{2t}{t\\sqrt{29}}=\\frac{2}{\\sqrt{29}}$. Check with the complementary-angle identity: $J$ and $L$ are complementary, and $\\sin J=\\frac{2}{\\sqrt{29}}$ as well ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{5}{\\sqrt{29}}$): this is $\\sin L$ (equivalently $\\cos J$) — it uses $JK$, the leg OPPOSITE angle $L$.\n* Choice C ($\\frac{5}{2}$): this is $\\tan L$, leg over leg; a cosine must involve the hypotenuse.\n* Choice D ($\\frac{\\sqrt{29}}{2}$): flips the cosine upside down, hypotenuse over adjacent leg, which is $\\sec L$. Any cosine is at most $1$.\n\n**Test Day Takeaway:** Label the two legs from the given tangent, build the hypotenuse once with the Pythagorean theorem, then read the requested ratio from the OTHER angle's point of view — what is adjacent to $J$ is opposite $L$.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "Three values of a quadratic function $f$ appear in the table. There is exactly one constant $k$ for which the equation $f(x)=k$ has only one solution for $x$. What is that constant?",
  questionTable: { headers: ["$x$", "$f(x)$"], rows: [["0", "25"], ["1", "15"], ["5", "15"]] },
  correctAnswer: "7",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is 7.**\n\n**The Fast Way (~45s):** $f(1)=f(5)$ puts the vertex at $x=3$, and fitting $f(x)=2x^2-12x+25$ gives $f(3)=7$: only the line $y=7$ touches the parabola once.\n\n**The Full Solution:**\nStep 1: Write $f(x)=ax^2+bx+c$. From $f(0)=25$, $c=25$. From $f(1)=15$: $a+b+25=15$, so $a+b=-10$. From $f(5)=15$: $25a+5b+25=15$, so $5a+b=-2$.\nStep 2: Subtracting gives $4a=8$, so $a=2$ and $b=-12$: $f(x)=2x^2-12x+25$.\nStep 3: $f(x)=k$ becomes $2x^2-12x+(25-k)=0$, which has exactly one solution when its discriminant is $0$: $(-12)^2-4(2)(25-k)=0$, so $144-200+8k=0$ and $k=7$. Check: $2x^2-12x+18=2(x-3)^2$, a perfect square with the single solution $x=3$ ✓\n\n**Common Mistakes:**\n* $15$: reads the repeated table value $15$ as the smallest output. Equal outputs at $x=1$ and $x=5$ mean those points are the same height on OPPOSITE sides of the vertex, so the vertex is lower.\n* $25$: takes $f(0)=25$, the value at the left end of the table, as the extreme value.\n* $3$: reports the $x$-coordinate of the vertex instead of the output $k$ that the horizontal line must have.\n\n**Test Day Takeaway:** One solution means discriminant zero. Two equal outputs hand you the axis of symmetry for free — average their inputs — and the vertex value is exactly the $k$ that a horizontal line can touch only once.",
  skills: ["discriminant-analysis"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cubic polynomial is given by $p(x)=2x^3+kx^2-23x+12$, where $k$ is a constant chosen so that $4$ is a zero of $p$. What is the sum of the remaining two zeros of $p$?",
  correctAnswer: "-2.5",
  explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**The correct answer is -2.5.**\n\n**The Fast Way (~50s):** $p(4)=0$ gives $16k+48=0$, so $k=-3$; dividing $2x^3-3x^2-23x+12$ by $x-4$ leaves $2x^2+5x-3$, whose roots sum to $-\\frac{5}{2}=-2.5$.\n\n**The Full Solution:**\nStep 1: A zero at $x=4$ means $p(4)=0$: $2(64)+16k-23(4)+12=128+16k-92+12=16k+48=0$, so $k=-3$ and $p(x)=2x^3-3x^2-23x+12$.\nStep 2: Since $4$ is a zero, $x-4$ is a factor. Dividing gives $p(x)=(x-4)\\left(2x^2+5x-3\\right)$.\nStep 3: The remaining zeros are the roots of $2x^2+5x-3=0$, and their sum is $-\\frac{b}{a}=-\\frac{5}{2}=-2.5$. Check by factoring: $2x^2+5x-3=(2x-1)(x+3)$, with roots $\\frac{1}{2}$ and $-3$, and $\\frac{1}{2}+(-3)=-2.5$ ✓\n\n**Common Mistakes:**\n* $-3$: reports the value of $k$, or stops at the single visible root $-3$ of the quadratic factor and forgets the root $\\frac{1}{2}$.\n* $1.5$: adds all THREE zeros, $4+\\frac{1}{2}+(-3)=1.5$, instead of only the two other than $4$.\n* $-1.5$: multiplies the remaining zeros, $\\frac{1}{2}(-3)=-1.5$, giving their product rather than their sum.\n\n**Test Day Takeaway:** A given zero is a plug-in: $p(4)=0$ pins the unknown coefficient. After dividing out the known factor, read the sum of the leftover roots straight off the quadratic as $-\\frac{b}{a}$ — no need to solve it.",
  skills: ["finding-roots-factoring"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 9 — Math Module 2 (22 questions, hard track)
// Frozen wavy flow: easy {1(b2),3(b3),14(b3)}, medium {2,5,6,8,10,17,19},
// hard {4,7,9,11,12,13,15,16,18,20,21,22}. Q14 is the designated breather.
// Q1-5 warm-up bar: every opener is 2+ steps or carries a trap (table-read
// linear-vs-exponential, x-intercept anchor, distribute-then-match no-solution,
// tangent-perpendicular, ratio "how many more").
{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 2,
  question: "A mountain station records the snowpack depth $D(t)$, in centimeters, $t$ hours after midnight; the recorded values appear in the table and $D$ is a linear function. For what value of $t$ does the model give $D(t) = 52$?",
  diagram: { type: "dataTable", params: { headers: ["Time t (hours after midnight)", "Depth D(t) (centimeters)"], rows: [["0", "100"], ["3", "94"], ["6", "88"], ["9", "82"]] } },
  choices: [
    // distractor: uses the 6-centimeter drop between consecutive rows as the hourly rate: 48/6 = 8
    { id: "A", text: "$8$" },
    // distractor: measures only from the last tabulated row, (82-52)/2 = 15, and forgets the 9 hours already elapsed
    { id: "B", text: "$15$" },
    { id: "C", text: "$24$" },
    // distractor: divides the target depth by the rate, 52/2 = 26, ignoring the 100-centimeter starting depth
    { id: "D", text: "$26$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Solve $f(a) = c$**\n\n**Choice C is correct.** The depth falls $6$ centimeters every $3$ hours, so the rate is $2$ centimeters per hour and $D(t) = 100 - 2t$. Setting $100 - 2t = 52$ gives $t = 24$.\n\n**The Fast Way (~20s):** The depth must fall $100 - 52 = 48$ centimeters at $2$ centimeters per hour, so $t = 48 \\div 2 = 24$.\n\n**The Full Solution:**\nStep 1: Rate $= \\frac{94 - 100}{3 - 0} = -2$ centimeters per hour, and the table gives $D(0) = 100$, so $D(t) = 100 - 2t$.\nStep 2: Solve $100 - 2t = 52$, so $2t = 48$ and $t = 24$.\nStep 3: Check with the true solution: $D(24) = 100 - 2(24) = 100 - 48 = 52$, matching the required output.\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): treats the $6$-centimeter drop between adjacent rows as the drop per hour, giving $48 \\div 6 = 8$. The rows are $3$ hours apart, so the hourly rate is $2$, not $6$.\n* Choice B ($15$): starts from the last row, $\\frac{82 - 52}{2} = 15$, which is the additional time after $t = 9$, and forgets to add those $9$ hours back.\n* Choice D ($26$): divides the target depth by the rate, $52 \\div 2 = 26$, which ignores the $100$-centimeter starting depth entirely.\n\n**Test Day Takeaway:** In a table of a linear function, the rate is the change in output divided by the change in input, not the change between adjacent rows, unless the inputs step by $1$.",
  skills: ["function-notation"]
},
{
  id: 2,
  type: "fill-in",
  difficulty: "easy",
  band: 3,
  question: "Two survey formulas for a reef transect relate the urchin count $u$ and the abalone count $a$ by $3u + 5a = 210$ and by $9u + ka = 400$, with $k$ constant. No pair of values $(u, a)$ satisfies both formulas. What is the value of $k$?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: No-Solution Condition**\n\n**The correct answer is $15$.** Two linear equations share no solution exactly when one left side is a multiple of the other while the constants do not follow that same multiple. Scaling $3u + 5a$ by $3$ produces $9u + 15a$, so $k = 15$.\n\n**The Fast Way (~15s):** $9 \\div 3 = 3$, so $k = 3 \\cdot 5 = 15$.\n\n**The Full Solution:**\nStep 1: For no solution the coefficients must be proportional, so $\\frac{9}{3} = \\frac{k}{5}$.\nStep 2: $\\frac{9}{3} = 3$, therefore $k = 3 \\cdot 5 = 15$.\nStep 3: Check with the true value: multiplying the first formula by $3$ gives $9u + 15a = 630$, while the second reads $9u + 15a = 400$. Since $630 \\neq 400$, no pair $(u, a)$ can satisfy both.\n\n**Common Mistakes:**\n* $5$: copies the coefficient of $a$ straight from the first formula without applying the scale factor $3$.\n* $45$: multiplies $5$ by $9$ instead of by the scale factor $\\frac{9}{3} = 3$.\n* $\\frac{5}{3}$: divides $5$ by $3$, inverting the scale factor.\n\n**Test Day Takeaway:** No solution means the two left sides are proportional and the constants are not. Read the scale factor off a coefficient you can see, then apply it to the unknown one.",
  skills: ["system-solution-types"]
},
{
  id: 3,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cross-country coach converts a runner's fitness index $r$ into a race score $s$ using the model $s = 124 - \\frac{4}{3}r$. One runner's race score is $52$. What race score does the model give for a runner whose fitness index is $12$ less than that runner's?",
  correctAnswer: "68",
  explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**The correct answer is $68$.** Solving $52 = 124 - \\frac{4}{3}r$ gives $r = 54$, so the second runner has index $42$ and score $124 - \\frac{4}{3}(42) = 68$.\n\n**The Fast Way (~20s):** The coefficient is negative, so lowering the index by $12$ raises the score by $\\frac{4}{3}(12) = 16$: $52 + 16 = 68$.\n\n**The Full Solution:**\nStep 1: Substitute the known score: $52 = 124 - \\frac{4}{3}r$, so $\\frac{4}{3}r = 72$.\nStep 2: Multiply by $\\frac{3}{4}$: $r = 54$. The second runner's index is $54 - 12 = 42$.\nStep 3: Check with the true value: $s = 124 - \\frac{4}{3}(42) = 124 - 56 = 68$, which is $16$ points above $52$, as the negative coefficient requires.\n\n**Common Mistakes:**\n* $40$: subtracts $12$ from the score itself, treating a change in index as an equal change in score.\n* $36$: computes the correct $\\frac{4}{3}(12) = 16$ but subtracts it, missing that the coefficient of $r$ is negative.\n* $54$: stops after solving for the fitness index and reports $r$ instead of the score.\n\n**Test Day Takeaway:** When a model has a negative coefficient, a decrease in the input produces an increase in the output, and the size of that increase is the coefficient times the change.",
  skills: ["combining-like-terms"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A weather radar's coverage region is bounded in the $xy$-plane by $x^2 + y^2 - 10x + 24y + 120 = 0$, one unit representing one kilometer. The antenna occupies the center of that region. Which of the following pairs the antenna's coordinates with the coverage radius, in kilometers?",
  choices: [
    { id: "A", text: "Center $(5, -12)$, radius $7$" },
    // distractor: adds the constant 120 instead of subtracting it, getting 25 + 144 + 120 = 289 and radius 17
    { id: "B", text: "Center $(5, -12)$, radius $17$" },
    // distractor: reports r squared, 49, as the radius
    { id: "C", text: "Center $(5, -12)$, radius $49$" },
    // distractor: reads the center straight off the signs printed in the equation, giving (-5, 12)
    { id: "D", text: "Center $(-5, 12)$, radius $7$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice A is correct.** Completing the square turns the equation into $(x - 5)^2 + (y + 12)^2 = 49$, so the center is $(5, -12)$ and the radius is $7$.\n\n**The Fast Way (~25s):** Halve and negate the linear coefficients for the center, $(5, -12)$, then $r^2 = 5^2 + 12^2 - 120 = 49$, so $r = 7$.\n\n**The Full Solution:**\nStep 1: Group and complete the square: $x^2 - 10x$ needs $25$, and $y^2 + 24y$ needs $144$.\nStep 2: $(x - 5)^2 - 25 + (y + 12)^2 - 144 + 120 = 0$, so $(x - 5)^2 + (y + 12)^2 = 49$.\nStep 3: Check with the true center and radius: expanding $(x - 5)^2 + (y + 12)^2 = 49$ gives $x^2 - 10x + 25 + y^2 + 24y + 144 - 49 = 0$, and $25 + 144 - 49 = 120$, matching the original constant.\n\n**Why the wrong answers are tempting:**\n* Choice B (radius $17$): moves the $+120$ to the right side without changing its sign, computing $25 + 144 + 120 = 289$ and $r = 17$.\n* Choice C (radius $49$): completes the square correctly but reports $r^2 = 49$ as the radius instead of taking the square root.\n* Choice D (center $(-5, 12)$): reads the center off the signs that appear in the general form rather than from the $(x - h)$ and $(y - k)$ factors, flipping both coordinates.\n\n**Test Day Takeaway:** In standard form the center is $(h, k)$ from $(x - h)^2 + (y - k)^2 = r^2$, so a $+24y$ term means $k = -12$, and the number on the right is $r^2$, never $r$.",
  skills: ["circle-equation", "completing-square-circles"]
},
{
  id: 5,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A gull's flight track on a monitoring grid follows the line through $(-4, 9)$ and $(6, -3)$, and a second gull holds a track that never crosses it, along the graph of $kx + 30y = 17$. What is the value of the constant $k$?",
  correctAnswer: "36",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**The correct answer is $36$.** The first track has slope $\\frac{-3 - 9}{6 - (-4)} = -\\frac{6}{5}$, and $kx + 30y = 17$ has slope $-\\frac{k}{30}$. Tracks that never cross are parallel, so $-\\frac{k}{30} = -\\frac{6}{5}$ and $k = 36$.\n\n**The Fast Way (~25s):** Slope $= -\\frac{12}{10} = -\\frac{6}{5}$, and $k = 30 \\cdot \\frac{6}{5} = 36$.\n\n**The Full Solution:**\nStep 1: Slope of the first track $= \\frac{-3 - 9}{6 + 4} = \\frac{-12}{10} = -\\frac{6}{5}$.\nStep 2: Solve $30y = -kx + 17$ for $y$: $y = -\\frac{k}{30}x + \\frac{17}{30}$, so the second slope is $-\\frac{k}{30}$.\nStep 3: Check with the true value: setting $-\\frac{k}{30} = -\\frac{6}{5}$ gives $k = 36$, and $36x + 30y = 17$ becomes $y = -\\frac{6}{5}x + \\frac{17}{30}$. Its slope matches while its intercept does not, so the tracks are parallel and distinct.\n\n**Common Mistakes:**\n* $-36$: drops the negative sign produced by moving $kx$ across, and matches $\\frac{k}{30}$ to $-\\frac{6}{5}$.\n* $25$: inverts the slope to $-\\frac{5}{6}$ and solves $\\frac{k}{30} = \\frac{5}{6}$.\n* $6$: multiplies the slope $\\frac{6}{5}$ by $5$ rather than by the coefficient $30$ that sits with $y$.\n\n**Test Day Takeaway:** For $Ax + By = C$ the slope is $-\\frac{A}{B}$. Convert once, match slopes, and confirm the constants differ so the lines really are parallel rather than identical.",
  skills: ["writing-parallel-equation"]
},
{
  id: 6,
  type: "fill-in",
  difficulty: "medium",
  band: 4,
  question: "The table gives the $2026$ count of each of three marsh bird species at a coastal wetland and the change in that species' count since $2021$. What was the $2021$ count of soras?",
  diagram: { type: "dataTable", params: { headers: ["Species", "2026 count", "Change since 2021"], rows: [["Marsh wren", "900", "25% increase"], ["Sora", "432", "28% decrease"], ["American bittern", "286", "45% decrease"]] } },
  correctAnswer: "600",
  explanation: "**SAT Pattern: Reverse-Percent**\n\n**The correct answer is $600$.** A $28\\%$ decrease leaves $72\\%$ of the $2021$ count, so $0.72 \\cdot (\\text{2021 count}) = 432$ and the $2021$ count is $\\frac{432}{0.72} = 600$.\n\n**The Fast Way (~20s):** $432$ is $72\\%$ of the original, so divide: $432 \\div 0.72 = 600$.\n\n**The Full Solution:**\nStep 1: A $28\\%$ decrease multiplies the original by $1 - 0.28 = 0.72$.\nStep 2: Let $n$ be the $2021$ count. Then $0.72n = 432$, so $n = \\frac{432}{0.72} = 600$.\nStep 3: Check with the true value: $28\\%$ of $600$ is $168$, and $600 - 168 = 432$, the count listed for soras.\n\n**Common Mistakes:**\n* $311.04$: applies the $28\\%$ decrease to $432$ itself, computing $432 \\cdot 0.72$, which runs the change forward instead of backward.\n* $552.96$: increases $432$ by $28\\%$, computing $432 \\cdot 1.28$, which undoes a decrease by adding the same percent to the smaller number.\n* $1{,}542.86$: divides by $0.28$ rather than by the $0.72$ that remains after the decrease.\n\n**Test Day Takeaway:** To reverse a percent change, divide by the multiplier that produced it. A $28\\%$ decrease means dividing by $0.72$, never multiplying by $0.72$ or dividing by $0.28$.",
  skills: ["percent-word-problems", "percent-of-value"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A tide pool's water temperature $t$ hours after 8 a.m. is $-0.75t^2 + 6t + c$ degrees Fahrenheit, where $c$ is a constant. No temperature this model gives exceeds $79$ degrees Fahrenheit. What is the value of $c$?",
  choices: [
    // distractor: reports -0.75(4)^2 + 6(4) = 12, the non-constant part at the vertex, instead of solving 12 + c = 79
    { id: "A", text: "$12$" },
    { id: "B", text: "$67$" },
    // distractor: uses t = -b/a = 8, where the squared and linear terms cancel, so the maximum is read as c itself
    { id: "C", text: "$79$" },
    // distractor: adds 12 to 79 instead of subtracting it
    { id: "D", text: "$91$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice B is correct.** The maximum occurs at $t = -\\frac{6}{2(-0.75)} = 4$, where the model gives $-0.75(16) + 6(4) + c = 12 + c$. Setting $12 + c = 79$ gives $c = 67$.\n\n**The Fast Way (~25s):** The vertex is at $t = 4$, the non-constant part contributes $12$ there, so $c = 79 - 12 = 67$.\n\n**The Full Solution:**\nStep 1: The parabola opens downward, so its greatest value sits at $t = -\\frac{b}{2a} = -\\frac{6}{2(-0.75)} = 4$.\nStep 2: Evaluate: $-0.75(4)^2 + 6(4) + c = -12 + 24 + c = 12 + c$.\nStep 3: Check with the true value: $12 + c = 79$ gives $c = 67$, and the model $-0.75t^2 + 6t + 67$ returns $67$ degrees at 8 a.m. and $79$ degrees at noon, its highest value.\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): computes the vertex value of the non-constant part, $-0.75(4)^2 + 6(4) = 12$, and reports it as $c$ instead of subtracting it from $79$.\n* Choice C ($79$): uses $t = -\\frac{b}{a} = 8$ rather than $-\\frac{b}{2a}$. At $t = 8$ the squared and linear terms cancel, so the model returns $c$, and the maximum is mistaken for $c$.\n* Choice D ($91$): isolates $c$ with the wrong sign, computing $79 + 12$ instead of $79 - 12$.\n\n**Test Day Takeaway:** For $at^2 + bt + c$ the extreme value sits at $t = -\\frac{b}{2a}$, and the constant $c$ is what remains after the rest of the expression is evaluated there.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The quotient $\\frac{12x^2 + kx - 35}{2x + 5}$ reduces to a linear polynomial for every $x$ except $-\\frac{5}{2}$, where $k$ is a constant. What must the value of $k$ be?",
  choices: [
    // distractor: computes 2(-7) - 5(6) = -44, subtracting the outer product instead of adding it
    { id: "A", text: "$-44$" },
    // distractor: factors as (2x - 5)(6x + 7), flipping both signs inside the factors, which gives 14 - 30 = -16
    { id: "B", text: "$-16$" },
    // distractor: keeps only the inner product 2(-7) = -14 and drops the 5(6) term
    { id: "C", text: "$-14$" },
    { id: "D", text: "$16$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice D is correct.** The quotient is linear only when $2x + 5$ divides the numerator, so $12x^2 + kx - 35 = (2x + 5)(6x - 7)$. Expanding gives $k = 2(-7) + 5(6) = 16$.\n\n**The Fast Way (~30s):** The other factor must be $6x - 7$ since $2x \\cdot 6x = 12x^2$ and $5(-7) = -35$; the middle term is then $-14x + 30x = 16x$.\n\n**The Full Solution:**\nStep 1: For the quotient to be a polynomial, $2x + 5$ must be a factor of $12x^2 + kx - 35$, so write $12x^2 + kx - 35 = (2x + 5)(ax + b)$.\nStep 2: Matching the ends, $2a = 12$ gives $a = 6$, and $5b = -35$ gives $b = -7$.\nStep 3: Check with the true value: $(2x + 5)(6x - 7) = 12x^2 - 14x + 30x - 35 = 12x^2 + 16x - 35$, so $k = 16$ and the quotient is $6x - 7$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($-44$): builds the middle term as $2(-7) - 5(6) = -44$, subtracting one cross product instead of adding both.\n* Choice B ($-16$): writes the factorization as $(2x - 5)(6x + 7)$, flipping the signs even though the given factor is $2x + 5$; that pairing gives $14 - 30 = -16$.\n* Choice C ($-14$): stops after the first cross product, $2 \\cdot (-7) = -14$, and never adds $5 \\cdot 6 = 30$.\n\n**Test Day Takeaway:** When a rational expression is said to reduce, the denominator is a factor of the numerator. Build the missing factor from the leading and constant terms, then read the middle coefficient off both cross products.",
  skills: ["simplifying-rational-expressions", "difference-of-squares"]
},
{
  id: 9,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "Above a rising ridge modeled by $y = 4x - 19$, a cableway sags along $y = 2x^2 - 12x + c$, with $c$ constant and both coordinates in meters. The cable grazes the ridge at a single point. What is the value of $c$?",
  correctAnswer: "13",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**The correct answer is $13$.** Setting the two models equal gives $2x^2 - 16x + (c + 19) = 0$. One shared point means the discriminant is zero: $(-16)^2 - 4(2)(c + 19) = 0$, so $c + 19 = 32$ and $c = 13$.\n\n**The Fast Way (~30s):** After moving everything to one side, $256 = 8(c + 19)$, so $c + 19 = 32$ and $c = 13$.\n\n**The Full Solution:**\nStep 1: Set the expressions equal: $2x^2 - 12x + c = 4x - 19$, which rearranges to $2x^2 - 16x + (c + 19) = 0$.\nStep 2: A single point of contact requires $b^2 - 4ac = 0$: $256 - 8(c + 19) = 0$, so $8(c + 19) = 256$ and $c + 19 = 32$.\nStep 3: Check with the true value: $c = 13$ makes the equation $2x^2 - 16x + 32 = 2(x - 4)^2 = 0$, whose only solution is $x = 4$. There the cable is at $2(16) - 48 + 13 = -3$ and the ridge is at $4(4) - 19 = -3$.\n\n**Common Mistakes:**\n* $-1$: never moves $4x$ to the left, so the middle coefficient is taken as $-12$ and $144 = 8(c + 19)$ is solved instead.\n* $45$: divides $256$ by $4$ rather than by $4a = 8$, giving $c + 19 = 64$.\n* $51$: reaches $c + 19 = 32$ but adds $19$ instead of subtracting it.\n\n**Test Day Takeaway:** One intersection point means one solution, so combine the equations into $ax^2 + bx + c = 0$ first, then set $b^2 - 4ac = 0$ using the combined coefficients, not the original ones.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In a bird-banding sample of $n$ birds, each bird is an adult, a juvenile, or a nestling. The ratio of the number of adults to the number of juveniles is $3$ to $2$, and the ratio of the number of juveniles to the number of nestlings is $8$ to $5$. Which expression represents how many more adults than nestlings the sample contains?",
  choices: [
    // distractor: uses the unscaled parts 3, 2, and 5 out of a total of 10, giving a difference of 2n/10 = n/5
    { id: "A", text: "$\\frac{n}{5}$" },
    { id: "B", text: "$\\frac{7n}{25}$" },
    // distractor: divides the 7-part difference by 12 + 5 = 17, the two named groups, instead of the 25-part total
    { id: "C", text: "$\\frac{7n}{17}$" },
    // distractor: reports the number of adults, 12n/25, rather than the difference
    { id: "D", text: "$\\frac{12n}{25}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**Choice B is correct.** Rescaling so juveniles match in both ratios gives adults : juveniles : nestlings $= 12 : 8 : 5$, a total of $25$ parts. Adults exceed nestlings by $12 - 5 = 7$ parts, or $\\frac{7n}{25}$.\n\n**The Fast Way (~35s):** Scale $3 : 2$ up to $12 : 8$ so the juveniles agree, giving $12 : 8 : 5$ and a difference of $\\frac{7}{25}$ of the sample.\n\n**The Full Solution:**\nStep 1: The juvenile count appears as $2$ in one ratio and $8$ in the other, so multiply the first ratio by $4$: adults : juveniles $= 12 : 8$.\nStep 2: Combine: adults : juveniles : nestlings $= 12 : 8 : 5$, so the sample has $12 + 8 + 5 = 25$ equal parts and each part is $\\frac{n}{25}$.\nStep 3: Check with the true expression: with $n = 25$ the sample holds $12$ adults, $8$ juveniles, and $5$ nestlings; the ratios are $12 : 8 = 3 : 2$ and $8 : 5$, and $12 - 5 = 7 = \\frac{7(25)}{25}$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{n}{5}$): combines $3$, $2$, and $5$ without rescaling, treating the total as $10$ parts and the difference as $2$ parts.\n* Choice C ($\\frac{7n}{17}$): finds the $7$-part difference correctly but divides by $12 + 5 = 17$, the two groups named in the question, rather than by the $25$-part whole.\n* Choice D ($\\frac{12n}{25}$): stops at the number of adults instead of subtracting the nestlings.\n\n**Test Day Takeaway:** Two ratios link only through the quantity they share. Scale one ratio until that shared quantity matches, then every part refers to the same unit and the total is the sum of all three.",
  skills: ["word-problem-to-equation"]
},
{
  id: 11,
  type: "fill-in",
  difficulty: "easy",
  band: 3,
  question: "The graph shows a cyclist's power output, in watts, as a linear function $P$ of pedaling cadence $c$, in revolutions per minute. What is the value of $P(95)$?",
  diagram: { type: "linearGraph", params: { slope: 2, yIntercept: 40, xRange: [0, 90], yRange: [0, 240], xTickInterval: 20, yTickInterval: 40, gridInterval: 20, showPoints: [[60, 160], [80, 200]], label: "P" } },
  correctAnswer: "230",
  explanation: "**SAT Pattern: Function Evaluation**\n\n**The correct answer is $230$.** The plotted points $(60, 160)$ and $(80, 200)$ give a rate of $\\frac{200 - 160}{80 - 60} = 2$ watts per revolution per minute, so $P(c) = 2c + 40$ and $P(95) = 230$.\n\n**The Fast Way (~25s):** From $(80, 200)$, going up $15$ rpm adds $2(15) = 30$ watts: $200 + 30 = 230$.\n\n**The Full Solution:**\nStep 1: Slope $= \\frac{200 - 160}{80 - 60} = \\frac{40}{20} = 2$ watts per revolution per minute.\nStep 2: Using $(60, 160)$: $160 = 2(60) + b$, so $b = 40$ and $P(c) = 2c + 40$.\nStep 3: Check with the true rule: $P(95) = 2(95) + 40 = 190 + 40 = 230$, and $P(80) = 160 + 40 = 200$, matching the second plotted point.\n\n**Common Mistakes:**\n* $190$: applies the correct rate of $2$ to the $15$-rpm gap but starts from $160$, the power at the first plotted point rather than the second.\n* $240$: adds a full $40$-watt block, the rise across a $20$-rpm span, for a gap of only $15$ rpm.\n* $270$: finds the rate correctly but pairs the first cadence with the second power when solving for the constant, getting $b = 200 - 2(60) = 80$.\n\n**Test Day Takeaway:** Read two clean lattice points off the line, turn them into a rate, and extend from the nearer point. The rate applies to the actual gap, not to a whole grid block.",
  skills: ["function-evaluation"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A gauge on a glacier's outflow stream records $3(x - 8)^2 + 45$ cubic meters of water per minute in week $x$ of the year, where $8 \\le x \\le 20$. The same quantity equals $3x^2 + bx + c$ for constants $b$ and $c$. What is the value of $b + c$?",
  correctAnswer: "189",
  explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**The correct answer is $189$.** Expanding gives $3(x^2 - 16x + 64) + 45 = 3x^2 - 48x + 237$, so $b = -48$, $c = 237$, and $b + c = 189$.\n\n**The Fast Way (~30s):** $b = 3 \\cdot (-16) = -48$ and $c = 3 \\cdot 64 + 45 = 237$, so $b + c = 189$.\n\n**The Full Solution:**\nStep 1: Square the binomial first: $(x - 8)^2 = x^2 - 16x + 64$.\nStep 2: Multiply every term by $3$ and add $45$: $3x^2 - 48x + 192 + 45 = 3x^2 - 48x + 237$.\nStep 3: Check with the true constants: at $x = 8$ the original expression is $3(0) + 45 = 45$, and $3(64) - 48(8) + 237 = 192 - 384 + 237 = 45$; at $x = 10$ the original gives $3(4) + 45 = 57$ and the standard form gives $300 - 480 + 237 = 57$. So $b + c = -48 + 237 = 189$.\n\n**Common Mistakes:**\n* $237$: reports the constant term $c$ alone and never adds $b$.\n* $-48$: reports the coefficient $b$ alone.\n* $61$: distributes the $3$ to $x^2$ and $-16x$ but not to the $64$, giving $c = 64 + 45 = 109$ and $b + c = 61$.\n\n**Test Day Takeaway:** Expand the square before distributing. The outside factor multiplies all three terms of the expanded square, including the constant, and only then does the trailing number get added.",
  skills: ["distributive-property", "converting-quadratic-forms"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A meet-scoring model sets a team's points per event $p$ by $4(p - a) + 7p = 3(p + 12)$, with $a$ constant, and the model returns $p = 5$. What is the value of $a$?",
  choices: [
    // distractor: moves 4a across with the wrong sign, solving 55 + 4a = 51
    { id: "A", text: "$-1$" },
    { id: "B", text: "$1$" },
    // distractor: distributes the 4 only to p, solving 20 + 35 - a = 51
    { id: "C", text: "$4$" },
    // distractor: distributes the 3 only to p, solving 55 - 4a = 15 + 12 = 27
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**Choice B is correct.** Substituting $p = 5$ gives $4(5 - a) + 35 = 51$, so $55 - 4a = 51$ and $a = 1$.\n\n**The Fast Way (~25s):** At $p = 5$ the left side is $20 - 4a + 35$ and the right side is $51$, so $4a = 4$ and $a = 1$.\n\n**The Full Solution:**\nStep 1: Substitute $p = 5$: $4(5 - a) + 7(5) = 3(5 + 12)$.\nStep 2: Expand both sides: $20 - 4a + 35 = 51$, which is $55 - 4a = 51$.\nStep 3: Check with the true value: $4a = 4$ gives $a = 1$, and then $4(5 - 1) + 35 = 16 + 35 = 51$, matching $3(17) = 51$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1$): moves the $-4a$ term across the equal sign without changing its sign, solving $55 + 4a = 51$.\n* Choice C ($4$): distributes the $4$ to $p$ but not to $a$, turning the left side into $4p - a + 7p = 55 - a$ and solving $55 - a = 51$.\n* Choice D ($7$): distributes the $3$ to $p$ but not to $12$, so the right side becomes $15 + 12 = 27$ and the equation reads $55 - 4a = 27$.\n\n**Test Day Takeaway:** When a solution is handed to you, substitute it first. The equation collapses to one unknown, and the only remaining risk is distributing a factor across every term inside its parentheses.",
  skills: ["solving-equations"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A refuge survey classified each of $240$ nest boxes as occupied or empty and as standing in an oak stand or a pine stand. Of the $150$ boxes in oak stands, $102$ were occupied, and $54$ of the boxes in pine stands were empty. If one of the $240$ boxes is selected at random, what is the probability that the box selected was occupied?",
  correctAnswer: "0.575",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**The correct answer is $0.575$.** The pine stands hold $240 - 150 = 90$ boxes, of which $90 - 54 = 36$ were occupied. Occupied boxes total $102 + 36 = 138$, so the probability is $\\frac{138}{240} = 0.575$.\n\n**The Fast Way (~35s):** Occupied $= 102 + (90 - 54) = 138$, and $\\frac{138}{240} = 0.575$.\n\n**The Full Solution:**\nStep 1: Pine boxes $= 240 - 150 = 90$.\nStep 2: Occupied pine boxes $= 90 - 54 = 36$, so occupied boxes overall $= 102 + 36 = 138$.\nStep 3: Check with the true count: $\\frac{138}{240} = 0.575$, and the empty boxes number $240 - 138 = 102$, which is $48$ empty oak boxes plus the $54$ empty pine boxes.\n\n**Common Mistakes:**\n* $0.425$: computes $\\frac{102}{240}$, the probability that the box was empty, and reports the complement of what was asked.\n* $0.4$: uses $\\frac{36}{90}$, restricting to the pine stands instead of to all $240$ boxes.\n* $0.68$: uses $\\frac{102}{150}$, restricting to the oak stands instead of to all $240$ boxes.\n\n**Test Day Takeaway:** A marginal probability divides by the whole group, so rebuild the missing cells first; the phrase \"one of the $240$\" fixes the denominator before any arithmetic starts.",
  skills: ["probability-basics"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A lake's zebra mussel population $t$ months after a survey begins is modeled by $N(t) = a(1.2)^t$, where $a$ is a constant. The model gives a population of $8{,}640$ mussels $3$ months after the survey begins. What is the value of $a$?",
  correctAnswer: "5000",
  explanation: "**SAT Pattern: Exponential Growth Model**\n\n**The correct answer is $5{,}000$.** Substituting $t = 3$ gives $a(1.2)^3 = 8{,}640$. Since $(1.2)^3 = 1.728$, $a = \\frac{8{,}640}{1.728} = 5{,}000$.\n\n**The Fast Way (~25s):** $(1.2)^3 = 1.728$, and $8{,}640 \\div 1.728 = 5{,}000$.\n\n**The Full Solution:**\nStep 1: The constant $a$ is the population at $t = 0$, and the model gives $N(3) = a(1.2)^3$.\nStep 2: $(1.2)^3 = 1.728$, so $1.728a = 8{,}640$ and $a = \\frac{8{,}640}{1.728} = 5{,}000$.\nStep 3: Check with the true value: $5{,}000(1.2) = 6{,}000$, $6{,}000(1.2) = 7{,}200$, and $7{,}200(1.2) = 8{,}640$, the population after three months.\n\n**Common Mistakes:**\n* $7{,}200$: divides by $1.2$ once instead of three times, undoing a single month of growth.\n* $2{,}400$: multiplies the growth factor by the exponent, dividing by $1.2 \\cdot 3 = 3.6$ rather than by $1.2^3$.\n* $14{,}929.92$: multiplies by $1.728$ instead of dividing, running the growth forward from the later figure.\n\n**Test Day Takeaway:** In $a \\cdot b^t$ the constant $a$ is the starting amount, so a later reading is undone by dividing by $b^t$, and the exponent never multiplies the base.",
  skills: ["exponential-growth-decay"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The graph of $N(w) = -w^2 + 14w + 15$ models the number of tadpoles, in hundreds, in a vernal pool $w$ weeks after the pool fills. For which values of $w$ does the model give at least $5{,}500$ tadpoles?",
  diagram: { type: "parabola", params: { vertex: { h: 7, k: 64 }, a: -1, xRange: [0, 15], yRange: [0, 70], xTickInterval: 5, yTickInterval: 20, gridInterval: 5, showVertex: false, label: "N(w)" } },
  choices: [
    // distractor: solves N(w) >= 0 instead of N(w) >= 55, returning the zeros -1 and 15
    { id: "A", text: "$-1 \\le w \\le 15$" },
    // distractor: stops at the vertex w = 7 rather than continuing to the second solution w = 10
    { id: "B", text: "$4 \\le w \\le 7$" },
    { id: "C", text: "$4 \\le w \\le 10$" },
    // distractor: takes the stretch from the larger solution to the larger zero, where the model is below 5,500
    { id: "D", text: "$10 \\le w \\le 15$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice C is correct.** Since $N$ counts hundreds, $5{,}500$ tadpoles means $N(w) \\ge 55$. Solving $-w^2 + 14w + 15 \\ge 55$ gives $w^2 - 14w + 40 \\le 0$, or $(w - 4)(w - 10) \\le 0$, so $4 \\le w \\le 10$.\n\n**The Fast Way (~35s):** $N(w) \\ge 55$ factors to $(w - 4)(w - 10) \\le 0$, and a downward parabola sits above a level between its two crossings.\n\n**The Full Solution:**\nStep 1: Convert the count: $5{,}500$ tadpoles is $55$ hundreds, so the condition is $-w^2 + 14w + 15 \\ge 55$.\nStep 2: Rearrange to $0 \\ge w^2 - 14w + 40$ and factor: $(w - 4)(w - 10) \\le 0$, which holds between the roots.\nStep 3: Check with the true endpoints: $N(4) = -16 + 56 + 15 = 55$ and $N(10) = -100 + 140 + 15 = 55$, while $N(3) = 48$ falls short and $N(7) = 64$ clears the bar.\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1 \\le w \\le 15$): solves $N(w) \\ge 0$ and reports the interval between the zeros of the model, ignoring the $55$ threshold. It even includes a negative week.\n* Choice B ($4 \\le w \\le 7$): finds the first crossing and then stops at $w = 7$, the vertex, treating the peak as the end of the interval instead of the middle of it.\n* Choice D ($10 \\le w \\le 15$): keeps the stretch beyond the second crossing, where the model has already fallen below $55$.\n\n**Test Day Takeaway:** Match units before solving, then remember that a downward parabola clears a horizontal level between its two crossings, so the answer is a single closed interval, not the outside of one.",
  skills: ["quadratics"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "During one season a goalkeeper saved $80\\%$ of the shots she faced, and $24$ of the shots she faced resulted in goals. How many shots did she face during the season?",
  choices: [
    // distractor: inverts the ratio of saves to goals, computing 24 times 20/80 = 6
    { id: "A", text: "$6$" },
    // distractor: divides by 0.80, the save rate, instead of by the 0.20 that were not saved
    { id: "B", text: "$30$" },
    // distractor: finds the number of shots saved, 24 times 80/20 = 96, rather than the total faced
    { id: "C", text: "$96$" },
    { id: "D", text: "$120$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Complement**\n\n**Choice D is correct.** If $80\\%$ were saved, the $24$ goals are the other $20\\%$. So $0.20s = 24$ and $s = \\frac{24}{0.20} = 120$.\n\n**The Fast Way (~20s):** $24$ is one fifth of the shots, so the total is $24 \\cdot 5 = 120$.\n\n**The Full Solution:**\nStep 1: Saves and goals account for all shots, so goals make up $100\\% - 80\\% = 20\\%$ of the shots faced.\nStep 2: Let $s$ be the number of shots faced. Then $0.20s = 24$, so $s = \\frac{24}{0.20} = 120$.\nStep 3: Check with the true total: $80\\%$ of $120$ is $96$ saves, and $120 - 96 = 24$ goals, matching the season figure.\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): inverts the relationship between saves and goals, computing $24 \\cdot \\frac{20}{80} = 6$ instead of scaling up.\n* Choice B ($30$): divides $24$ by $0.80$, applying the save rate to the goals rather than the $20\\%$ that the goals actually represent.\n* Choice C ($96$): computes $24 \\cdot \\frac{80}{20} = 96$, the number of shots saved, and stops before adding the $24$ goals.\n\n**Test Day Takeaway:** Percent-complement items give you one percent and a count belonging to the other. Convert to the percent that matches the count, then divide.",
  skills: ["percent-of-value"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "On an orienteering course map marked in meters, the first leg runs straight from $(-8, 14)$ to $(4, 6)$. The second leg begins at $(4, 6)$, runs perpendicular to the first leg, and ends on the line $y = 21$. What is the $x$-coordinate of the second leg's endpoint?",
  correctAnswer: "14",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**The correct answer is $14$.** The first leg has slope $\\frac{6 - 14}{4 + 8} = -\\frac{2}{3}$, so the second leg has slope $\\frac{3}{2}$. From $(4, 6)$, reaching $y = 21$ requires $21 - 6 = \\frac{3}{2}(x - 4)$, giving $x = 14$.\n\n**The Fast Way (~30s):** Perpendicular slope $\\frac{3}{2}$ means a rise of $15$ needs a run of $10$, so $x = 4 + 10 = 14$.\n\n**The Full Solution:**\nStep 1: Slope of the first leg $= \\frac{6 - 14}{4 - (-8)} = \\frac{-8}{12} = -\\frac{2}{3}$.\nStep 2: The perpendicular slope is the negative reciprocal, $\\frac{3}{2}$, so the second leg is $y - 6 = \\frac{3}{2}(x - 4)$.\nStep 3: Check with the true endpoint: setting $y = 21$ gives $15 = \\frac{3}{2}(x - 4)$, so $x - 4 = 10$ and $x = 14$. At $x = 14$ the second leg is at $6 + \\frac{3}{2}(10) = 21$.\n\n**Common Mistakes:**\n* $-6$: takes the reciprocal $\\frac{3}{2}$ but keeps the original negative sign, solving $15 = -\\frac{3}{2}(x - 4)$.\n* $10$: solves $\\frac{3}{2}x = 15$ and forgets that the run of $10$ starts from $x = 4$, not from the origin.\n* $-18.5$: reuses the first leg's own slope $-\\frac{2}{3}$ instead of the perpendicular one.\n\n**Test Day Takeaway:** A negative reciprocal flips the fraction and the sign. After that, work in rise and run from the given point so the starting coordinate is never dropped.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A linear model relates a swimmer's weekly training volume $v$, in kilometers, to her predicted $200$-meter time $T$, in seconds. The model predicts $136$ seconds at a volume of $0$ kilometers, and each additional $5$ kilometers of weekly volume lowers the predicted time by $1.8$ seconds. Which equation represents the model?",
  choices: [
    // distractor: multiplies 1.8 by 5 instead of dividing, giving a rate of 9 seconds per kilometer
    { id: "A", text: "$T = 136 - 9v$" },
    // distractor: uses the 5-kilometer interval itself as the per-kilometer rate
    { id: "B", text: "$T = 136 - 5v$" },
    { id: "C", text: "$T = 136 - 0.36v$" },
    // distractor: gets the size of the rate right but adds it, turning a predicted decrease into an increase
    { id: "D", text: "$T = 136 + 0.36v$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice C is correct.** The slope is the change in predicted time per kilometer: $\\frac{-1.8}{5} = -0.36$ second per kilometer. With a predicted $136$ seconds at $v = 0$, the model is $T = 136 - 0.36v$.\n\n**The Fast Way (~20s):** Slope $= -1.8 \\div 5 = -0.36$, intercept $= 136$.\n\n**The Full Solution:**\nStep 1: The value at $v = 0$ is the intercept, so the constant term is $136$.\nStep 2: The stated change is $-1.8$ seconds for every $5$ kilometers, so per kilometer the change is $\\frac{-1.8}{5} = -0.36$.\nStep 3: Check with the true model: $T = 136 - 0.36v$ gives $T = 136$ at $v = 0$ and $T = 136 - 0.36(5) = 134.2$ at $v = 5$, which is $1.8$ seconds faster, exactly as described.\n\n**Why the wrong answers are tempting:**\n* Choice A ($T = 136 - 9v$): multiplies $1.8$ by $5$ instead of dividing, so the model loses $9$ seconds per kilometer and $45$ seconds over the first $5$ kilometers.\n* Choice B ($T = 136 - 5v$): puts the $5$-kilometer interval into the slope position, reading the width of the step as the size of the drop.\n* Choice D ($T = 136 + 0.36v$): finds the right rate but adds it, so the model predicts a slower time as training volume grows.\n\n**Test Day Takeaway:** A slope is always a per-one-unit rate, so a change stated over $5$ units must be divided by $5$, and a described decrease keeps a negative sign.",
  skills: ["slope-intercept-form"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For $x > 0$, the product $\\sqrt[3]{x^7} \\cdot \\sqrt{x^5} \\cdot x^{-2}$ is rewritten as a single sixth root $\\sqrt[6]{x^n}$ with $n$ a positive integer. What must the value of $n$ be?",
  choices: [
    { id: "A", text: "$17$" },
    // distractor: multiplies the fractional exponents, 7/3 times 5/2 = 35/6, then subtracts 2 to get 23/6
    { id: "B", text: "$23$" },
    // distractor: adds 7/3 and 5/2 correctly but drops the x^-2 factor, leaving 29/6
    { id: "C", text: "$29$" },
    // distractor: treats x^-2 as x^2 and adds it, giving 29/6 + 2 = 41/6
    { id: "D", text: "$41$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice A is correct.** The three exponents are $\\frac{7}{3}$, $\\frac{5}{2}$, and $-2$. Their sum is $\\frac{14}{6} + \\frac{15}{6} - \\frac{12}{6} = \\frac{17}{6}$, and $x^{17/6} = \\sqrt[6]{x^{17}}$, so $n = 17$.\n\n**The Fast Way (~30s):** Put everything over $6$: $\\frac{14 + 15 - 12}{6} = \\frac{17}{6}$, so $n = 17$.\n\n**The Full Solution:**\nStep 1: Rewrite each radical as a power: $\\sqrt[3]{x^7} = x^{7/3}$ and $\\sqrt{x^5} = x^{5/2}$.\nStep 2: Multiplying powers of the same base adds exponents: $\\frac{7}{3} + \\frac{5}{2} - 2 = \\frac{14}{6} + \\frac{15}{6} - \\frac{12}{6} = \\frac{17}{6}$.\nStep 3: Check with the true exponent: $x^{17/6} = \\sqrt[6]{x^{17}}$, and cubing the whole product would give $x^{17/2}$, matching $\\left(x^{7/3}\\right)^3 \\left(x^{5/2}\\right)^3 \\left(x^{-2}\\right)^3 = x^{7} x^{15/2} x^{-6}$.\n\n**Why the wrong answers are tempting:**\n* Choice B ($23$): multiplies $\\frac{7}{3}$ by $\\frac{5}{2}$ instead of adding them, then subtracts $2$ to reach $\\frac{23}{6}$. Exponents multiply only when a power is raised to a power.\n* Choice C ($29$): adds the two radical exponents correctly but never applies the $x^{-2}$ factor, stopping at $\\frac{29}{6}$.\n* Choice D ($41$): reads $x^{-2}$ as $x^{2}$ and adds $2$, producing $\\frac{29}{6} + \\frac{12}{6} = \\frac{41}{6}$.\n\n**Test Day Takeaway:** Convert every radical to a fractional exponent first, put all the exponents over one common denominator, then add. The denominator you choose is the index of the single radical the answer wants.",
  skills: ["exponent-rules", "radical-expressions"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The figure shows two similar triangular pennants at a stadium entrance, with $AB$ and $DE$ corresponding sides measured in inches. Pennant $DEF$ encloses $112$ square inches more than pennant $ABC$. What is the area, in square inches, enclosed by pennant $ABC$?",
  diagram: { type: "similarTriangles", params: { triangle1: { labels: ["A", "B", "C"], sideLabels: ["15", "", ""] }, triangle2: { labels: ["D", "E", "F"], sideLabels: ["25", "", ""] }, figureNote: true } },
  correctAnswer: "63",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**The correct answer is $63$.** The sides are in the ratio $15 : 25 = 3 : 5$, so the areas are in the ratio $9 : 25$. Writing the areas as $9k$ and $25k$, the difference $16k = 112$ gives $k = 7$ and area $ABC = 63$.\n\n**The Fast Way (~35s):** Areas scale as $3^2 : 5^2 = 9 : 25$, a gap of $16$ parts. $112 \\div 16 = 7$ per part, so $ABC = 9(7) = 63$.\n\n**The Full Solution:**\nStep 1: The similarity ratio is $\\frac{15}{25} = \\frac{3}{5}$, so the ratio of areas is $\\left(\\frac{3}{5}\\right)^2 = \\frac{9}{25}$.\nStep 2: Let the areas be $9k$ and $25k$. Then $25k - 9k = 16k = 112$, so $k = 7$.\nStep 3: Check with the true areas: $ABC = 9(7) = 63$ and $DEF = 25(7) = 175$. Their difference is $175 - 63 = 112$, and $\\frac{63}{175} = \\frac{9}{25}$.\n\n**Common Mistakes:**\n* $168$: scales the areas by the side ratio $\\frac{5}{3}$ instead of its square, solving $\\frac{5}{3}A - A = 112$.\n* $175$: finds the correct pair of areas but reports the larger pennant $DEF$ rather than $ABC$.\n* $7$: stops at the value of one area part, $k$, without multiplying by the $9$ parts that make up $ABC$.\n\n**Test Day Takeaway:** Lengths scale by $r$ and areas scale by $r^2$. Turn the area ratio into parts, let the given difference fix the size of one part, then build the requested area from its own number of parts.",
  skills: ["similar-triangles"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An ecologist rates two replanting schedules for a burned hillside, assigning the index values $25^{2x + 1}$ and $125^{x - c}$ after $x$ growing seasons, where $c$ is a constant. The two schedules receive equal index values only when $x = 7$. What is the value of $c$?",
  choices: [
    // distractor: rewrites only the left side in base 5, solving 4x + 2 = x - c at x = 7
    { id: "A", text: "$-23$" },
    // distractor: equates the printed exponents without rewriting either side in base 5, solving 2x + 1 = x - c
    { id: "B", text: "$-8$" },
    { id: "C", text: "$-3$" },
    // distractor: drops the negative when isolating c in 30 = 21 - 3c
    { id: "D", text: "$3$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice C is correct.** Writing both sides in base $5$ gives $5^{4x + 2} = 5^{3x - 3c}$, so $4x + 2 = 3x - 3c$. At $x = 7$, $30 = 21 - 3c$, so $c = -3$.\n\n**The Fast Way (~30s):** $4(7) + 2 = 30$ and $3(7 - c) = 30$ gives $7 - c = 10$, so $c = -3$.\n\n**The Full Solution:**\nStep 1: $25 = 5^2$ and $125 = 5^3$, so the two index values are $5^{2(2x + 1)} = 5^{4x + 2}$ and $5^{3(x - c)} = 5^{3x - 3c}$.\nStep 2: Equal powers of the same base force equal exponents: $4x + 2 = 3x - 3c$. Substituting $x = 7$ gives $30 = 21 - 3c$, so $-3c = 9$ and $c = -3$.\nStep 3: Check with the true value: with $c = -3$ the second index value is $125^{x + 3}$, and at $x = 7$ that is $125^{10} = 5^{30}$, while $25^{15} = 5^{30}$ as well.\n\n**Why the wrong answers are tempting:**\n* Choice A ($-23$): converts only $25$ to base $5$ and leaves $125$ alone, solving $4x + 2 = x - c$, which gives $30 = 7 - c$.\n* Choice B ($-8$): sets the printed exponents equal without any base conversion, solving $2x + 1 = x - c$, which gives $15 = 7 - c$.\n* Choice D ($3$): reaches $30 = 21 - 3c$ correctly but divides $9$ by $3$ without carrying the negative sign.\n\n**Test Day Takeaway:** Rewrite both sides over the same base before touching the exponents, and remember that the outer exponent multiplies everything inside the parentheses, including a constant.",
  skills: ["exponential-functions"]
}
      ]
    }
  ]
};
