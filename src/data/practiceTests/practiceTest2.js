// Practice Test 2 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-08-31): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// round-7 blueprint: M1 5E/9M/8H, domains 7/6/5/4. M2 3E/7M/12H.
// Figure density lifted to official ~20%: M1 carries 5 diagram items
// (Q6 two-way table, Q7 right triangle, Q9 scatterplot, Q13 data table,
// Q16 right triangle), M2 carries 4 (Q3 data table, Q4 similar triangles,
// Q11 right triangle, Q12 dot plot). Numeric MC choices sorted ascending.

export const practiceTest2 = {
  id: "practice-test-2",
  title: "Practice Test 2",
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
  question: "An observatory logged the number of meteors captured by its all-sky camera during each of eight consecutive nights, and the results appear in the dot plot. What is the mean nightly count for these eight nights?",
  diagram: { type: "dotPlot", params: { data: [{ value: 39, count: 1 }, { value: 44, count: 1 }, { value: 46, count: 1 }, { value: 47, count: 1 }, { value: 48, count: 2 }, { value: 49, count: 1 }, { value: 51, count: 1 }], xMin: 38, xMax: 52, xLabel: "Meteors recorded" } },
  choices: [
    // distractor: reports the range of the eight counts, 51-39=12, instead of their mean
    { id: "A", text: "$12$" },
    { id: "B", text: "$46.5$" },
    // distractor: reports the median, the average of the fourth and fifth counts (47+48)/2=47.5
    { id: "C", text: "$47.5$" },
    // distractor: reports the mode, the only count that appears twice (48)
    { id: "D", text: "$48$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Mean from List**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** One dot is one night: $39, 44, 46, 47, 48, 48, 49, 51$. The eight counts total $372$, so the mean is $\\frac{372}{8} = 46.5$.\n\n**The Full Solution:**\nStep 1: Read one value per dot, including the repeat. The stack of two dots above $48$ means two of the nights had $48$ meteors, so the eight counts are $39, 44, 46, 47, 48, 48, 49, 51$.\nStep 2: Add them: $39 + 44 + 46 + 47 + 48 + 48 + 49 + 51 = 372$.\nStep 3: The mean is the total divided by the number of nights: $\\frac{372}{8} = 46.5$ meteors per night. Check: $8 \\times 46.5 = 372$, the total read from the plot ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): reports the range, $51 - 39 = 12$. The range measures spread, not center, so it answers a different question entirely.\n* Choice C ($47.5$): reports the median. With eight values the median is the average of the fourth and fifth, $\\frac{47 + 48}{2} = 47.5$, which is close to the mean here but is not it.\n* Choice D ($48$): reports the mode, the one value that appears twice. A repeated value pulls the mean toward itself but does not become the mean.\n\n**Test Day Takeaway:** On a dot plot, count dots, not tick marks: every dot in a stack is a separate data value that must appear in the sum and in the divisor.",
  skills: ["calculate-mean"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A random sample of trucks at a highway toll plaza gave an estimated mean idling time of $47.0$ seconds, and plausible values for the mean idling time of all trucks at the plaza run from $43.4$ to $50.6$ seconds. What is the margin of error for this estimate?",
  choices: [
    // distractor: halves the margin a second time, dividing the full interval width 7.2 by 4 instead of by 2
    { id: "A", text: "$1.8$" },
    { id: "B", text: "$3.6$" },
    // distractor: reports the full width of the plausible-value interval, 50.6-43.4=7.2, instead of half of it
    { id: "C", text: "$7.2$" },
    // distractor: reports the lower endpoint of the interval, 43.4, rather than the distance from the estimate to that endpoint
    { id: "D", text: "$43.4$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Margin of Error**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The margin of error is the distance from the estimate to either endpoint: $47.0 - 43.4 = 3.6$.\n\n**The Full Solution:**\nStep 1: A margin of error $E$ turns an estimate into the interval from estimate $-\\,E$ to estimate $+\\,E$. Here the estimate is $47.0$ seconds and the interval runs from $43.4$ to $50.6$ seconds.\nStep 2: Subtract to find $E$ from the lower endpoint: $47.0 - 43.4 = 3.6$ seconds.\nStep 3: Confirm with the upper endpoint: $47.0 + 3.6 = 50.6$ seconds, which matches the stated interval ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.8$): halves the width once too often. The full interval is $7.2$ seconds wide; halving gives the margin $3.6$, but halving again gives $1.8$.\n* Choice C ($7.2$): reports the entire width of the interval, $50.6 - 43.4 = 7.2$. The margin of error is only the half-width, the reach on each side of the estimate.\n* Choice D ($43.4$): reports the lower endpoint itself. An endpoint is a plausible mean idling time, not a distance.\n\n**Test Day Takeaway:** Margin of error is a radius, not a diameter: it is the distance from the point estimate to an endpoint, so it is always half the width of the plausible-value interval.",
  skills: ["margin-of-error"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A dehydrator removes water from a tray of sliced apples, and the equation $M = 320 - 7.5t$ relates the mass of water $M$, in grams, to the drying time $t$, in minutes. Which statement is the best interpretation of $7.5$?",
  choices: [
    { id: "A", text: "The mass of water in the tray decreases by $7.5$ grams each minute." },
    // distractor: drops the minus sign in front of 7.5 and reads a decrease as an increase
    { id: "B", text: "The mass of water in the tray increases by $7.5$ grams each minute." },
    // distractor: interprets 7.5 as the initial mass, which is the constant term 320, not the coefficient of t
    { id: "C", text: "The tray holds $7.5$ grams of water when drying begins." },
    // distractor: inverts the rate, reading 7.5 as minutes per gram instead of grams per minute
    { id: "D", text: "The tray loses $1$ gram of water every $7.5$ minutes." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** The coefficient of $t$ is $-7.5$, so $M$ falls by $7.5$ grams for each additional minute of drying.\n\n**The Full Solution:**\nStep 1: Write the equation in slope-intercept form: $M = -7.5t + 320$. The slope is $-7.5$ and the $M$-intercept is $320$.\nStep 2: Slope is the change in the output for a one-unit change in the input, so each additional minute changes $M$ by $-7.5$ grams, a loss of $7.5$ grams per minute.\nStep 3: Test it: at $t = 0$, $M = 320$ grams; at $t = 1$, $M = 320 - 7.5 = 312.5$ grams. The drop is $7.5$ grams in one minute ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (an increase of $7.5$ grams per minute): keeps the magnitude but drops the minus sign in $-7.5t$. Substituting $t = 1$ gives $312.5$ grams, less than the starting $320$ grams, so the mass is falling.\n* Choice C (a starting mass of $7.5$ grams): assigns $7.5$ the role of the starting amount. The mass at $t = 0$ is the constant term, $320$ grams, not $7.5$ grams.\n* Choice D ($1$ gram every $7.5$ minutes): flips the units. Losing $1$ gram every $7.5$ minutes is a rate of about $0.13$ gram per minute, not $7.5$ grams per minute.\n\n**Test Day Takeaway:** Read the slope with its units attached, output units per input unit, and let the sign tell you the direction; the constant term, never the slope, is the starting value.",
  skills: ["slope-intercept-form"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A loaded pallet holds $n$ identical crates. The equation $12n + 6n + 45 = 315$ relates $n$ to the total mass of the loaded pallet, in kilograms. What is the value of $n$?",
  choices: [
    // distractor: folds the constant 45 in with the coefficients, solving 63n=315 to get 5
    { id: "A", text: "$5$" },
    { id: "B", text: "$15$" },
    // distractor: divides 315 by 18 without first subtracting the constant 45, giving 17.5
    { id: "C", text: "$17.5$" },
    // distractor: adds 45 to both sides instead of subtracting it, solving 18n=360 to get 20
    { id: "D", text: "$20$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Combine the like terms to get $18n + 45 = 315$, so $18n = 270$ and $n = 15$.\n\n**The Full Solution:**\nStep 1: Combine the two terms that contain $n$: $12n + 6n = 18n$, so the equation becomes $18n + 45 = 315$.\nStep 2: Subtract $45$ from both sides to isolate the variable term: $18n = 270$.\nStep 3: Divide both sides by $18$: $n = 15$. Check: $12(15) + 6(15) + 45 = 180 + 90 + 45 = 315$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): treats $45$ as another coefficient of $n$, solving $63n = 315$ to get $5$. The $45$ has no $n$ attached, so it cannot join $12n$ and $6n$.\n* Choice C ($17.5$): combines the like terms correctly but divides before subtracting, computing $\\frac{315}{18} = 17.5$ and leaving the $45$ unaccounted for.\n* Choice D ($20$): moves the $45$ to the other side with the wrong sign, solving $18n = 315 + 45 = 360$ to get $20$.\n\n**Test Day Takeaway:** Only terms carrying the same variable combine; strip the lone constant off with the opposite operation before you divide by the coefficient.",
  skills: ["combining-like-terms"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Translating the graph of $6x - 5y = 40$ downward by $7$ units in the xy-plane produces the graph of a second equation written in the same form. Which equation is it?",
  choices: [
    // distractor: translates upward instead of downward, replacing y with y-7 and getting 6x-5y=5
    { id: "A", text: "$6x - 5y = 5$" },
    // distractor: subtracts 7 from the constant on the right side, giving 40-7=33
    { id: "B", text: "$6x - 5y = 33$" },
    // distractor: adds 7 to the constant on the right side, giving 40+7=47
    { id: "C", text: "$6x - 5y = 47$" },
    { id: "D", text: "$6x - 5y = 75$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** A vertical shift keeps the slope, so the left side stays $6x - 5y$. The point $(0, -8)$ on the original line moves to $(0, -15)$, and $6(0) - 5(-15) = 75$.\n\n**The Full Solution:**\nStep 1: Translating a graph down $7$ units sends each point $(x, y)$ to $(x, y - 7)$, so the image is the set of points satisfying $6x - 5(y + 7) = 40$.\nStep 2: Expand and simplify: $6x - 5y - 35 = 40$, so $6x - 5y = 75$. The coefficients of $x$ and $y$ are unchanged, which is exactly what makes the image parallel to the original.\nStep 3: Check with a point. On the original line, $x = 0$ gives $-5y = 40$, so $y = -8$; shifting down $7$ gives $(0, -15)$, and $6(0) - 5(-15) = 75$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6x - 5y = 5$): substitutes $y - 7$ for $y$, which shifts the line up rather than down, and produces $6x - 5y = 5$. Shifting down requires $y + 7$.\n* Choice B ($6x - 5y = 33$): treats the shift as a change to the constant on the right, computing $40 - 7 = 33$. The $-5$ multiplying $y$ scales the shift, so the constant cannot move by only $7$.\n* Choice C ($6x - 5y = 47$): makes the same mistake with the other sign, computing $40 + 7 = 47$ instead of $40 + 5(7) = 75$.\n\n**Test Day Takeaway:** To translate a line written in standard form, substitute for the variable rather than nudging the constant: down $k$ units means replacing $y$ with $y + k$, then simplify.",
  skills: ["writing-parallel-equation"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The table gives the loading rate, in crates per minute, of each of three conveyors at a freight terminal. Conveyor B operates at the rate shown for $3.5$ hours without stopping. How many crates does conveyor B load during that time?",
  questionTable: { headers: ["Conveyor", "Loading rate (crates per minute)"], rows: [["A", "30"], ["B", "24"], ["C", "18"]] },
  choices: [
    // distractor: multiplies the per-minute rate by 3.5 without converting hours to minutes, giving 24(3.5)=84
    { id: "A", text: "$84$" },
    // distractor: converts only one hour, computing 24(60)=1440 and ignoring the remaining 2.5 hours
    { id: "B", text: "$1{,}440$" },
    { id: "C", text: "$5{,}040$" },
    // distractor: reads conveyor A's rate of 30 crates per minute instead of conveyor B's, giving 30(210)=6300
    { id: "D", text: "$6{,}300$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $3.5$ hours is $3.5(60) = 210$ minutes, and conveyor B loads $24$ crates per minute, so $24(210) = 5{,}040$ crates.\n\n**The Full Solution:**\nStep 1: The rate is given per minute, so convert the running time to minutes: $3.5 \\text{ hours} \\times \\frac{60 \\text{ minutes}}{1 \\text{ hour}} = 210$ minutes.\nStep 2: Read conveyor B's row: $24$ crates per minute. Set up the proportion $\\frac{24 \\text{ crates}}{1 \\text{ minute}} = \\frac{c \\text{ crates}}{210 \\text{ minutes}}$.\nStep 3: Solve: $c = 24(210) = 5{,}040$ crates. Check the units: $\\frac{\\text{crates}}{\\text{minute}} \\times \\text{minutes} = \\text{crates}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($84$): multiplies $24$ by $3.5$ directly, mixing a per-minute rate with a time in hours. That product, $84$, is the number of crates loaded in $3.5$ minutes.\n* Choice B ($1{,}440$): converts one hour only, computing $24(60) = 1{,}440$, and never accounts for the other $2.5$ hours.\n* Choice D ($6{,}300$): uses the rate in conveyor A's row, $30$ crates per minute, giving $30(210) = 6{,}300$ crates.\n\n**Test Day Takeaway:** Make the time units match the rate's units before multiplying, and confirm you pulled the row the question actually names.",
  skills: ["unit-conversion"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A triangular solar array at a research station is bounded by three mounting posts located at $(-4, 1)$, $(-4, 13)$, and $(6, 7)$ in a coordinate plane, where each unit represents one meter. How many square meters of ground does the array cover?",
  choices: [
    // distractor: uses the rise 6 and run 10 between (-4,1) and (6,7) as the base and height, giving (1/2)(10)(6)=30
    { id: "A", text: "$30$" },
    // distractor: uses the y-coordinate 7 of the third post as the height instead of the horizontal distance 10, giving (1/2)(12)(7)=42
    { id: "B", text: "$42$" },
    { id: "C", text: "$60$" },
    // distractor: multiplies base by height without the factor of one half, giving 12(10)=120
    { id: "D", text: "$120$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The two posts at $x = -4$ give a vertical base of length $13 - 1 = 12$, and the third post is $6 - (-4) = 10$ units away horizontally, so the area is $\\frac{1}{2}(12)(10) = 60$.\n\n**The Full Solution:**\nStep 1: The posts $(-4, 1)$ and $(-4, 13)$ share the $x$-coordinate $-4$, so the segment joining them is vertical with length $13 - 1 = 12$ meters. Use that segment as the base.\nStep 2: The height is the perpendicular distance from the third post $(6, 7)$ to the vertical line $x = -4$, which is the horizontal distance $6 - (-4) = 10$ meters.\nStep 3: Apply the area formula: $\\frac{1}{2}(12)(10) = 60$ square meters. Check with the shoelace formula: $\\frac{1}{2}\\left| -4(13 - 7) + (-4)(7 - 1) + 6(1 - 13) \\right| = \\frac{1}{2}\\left| -24 - 24 - 72 \\right| = 60$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($30$): uses the horizontal and vertical gaps between $(-4, 1)$ and $(6, 7)$ as a base and height, computing $\\frac{1}{2}(10)(6) = 30$. Those two numbers describe one slanted side, not a base with its own perpendicular height.\n* Choice B ($42$): takes the height to be the third post's $y$-coordinate, $7$, giving $\\frac{1}{2}(12)(7) = 42$. Height is measured from the base line $x = -4$, not from the $x$-axis.\n* Choice D ($120$): computes $12(10) = 120$, the area of the rectangle built on that base and height, forgetting the factor of $\\frac{1}{2}$.\n\n**Test Day Takeaway:** When two vertices share a coordinate, use that side as the base; the height is then just the distance from the third vertex to that vertical or horizontal line.",
  skills: ["triangle-area"]
},
{
  id: 8,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The function $g$, defined by $g(x) = \\dfrac{3x + 17}{4}$, converts a spectrometer's raw signal $x$ into a calibrated reading. For what raw signal is the calibrated reading equal to $14$?",
  correctAnswer: "13",
  explanation: "**SAT Pattern: Function Evaluation**\n\n**The correct answer is $13$.**\n\n**The Fast Way (~20s):** Set $\\frac{3x + 17}{4} = 14$, so $3x + 17 = 56$, $3x = 39$, and $x = 13$.\n\n**The Full Solution:**\nStep 1: A calibrated reading of $14$ means $g(x) = 14$, so write $\\frac{3x + 17}{4} = 14$.\nStep 2: Clear the denominator by multiplying both sides by $4$: $3x + 17 = 56$. Subtract $17$ from both sides: $3x = 39$.\nStep 3: Divide by $3$: $x = 13$. Check: $g(13) = \\frac{3(13) + 17}{4} = \\frac{39 + 17}{4} = \\frac{56}{4} = 14$ ✓\n\n**Common Mistakes:** Entering $-1$ (solving $3x + 17 = 14$, forgetting to multiply both sides by the denominator $4$ first); entering $14.75$ (evaluating $g(14) = \\frac{59}{4}$ instead of solving $g(x) = 14$, which answers the reverse question); entering $-4.5$ (dividing $14$ by $4$ instead of multiplying, then solving $3x + 17 = 3.5$).\n\n**Test Day Takeaway:** When a function's output is given, work the operations backward in reverse order: undo the division first, then the addition, then the multiplication.",
  skills: ["function-evaluation"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In a lot of seeds, $60\\%$ are variety R and the remaining seeds are variety S. Of the variety R seeds $85\\%$ germinate, and of the variety S seeds $60\\%$ germinate. A seed selected at random from this lot germinated. What is the probability that the seed is variety S?",
  choices: [
    // distractor: reports the joint percent 0.40(0.60)=24%, the share of the whole lot that is variety S and germinates, without dividing by the germinating share
    { id: "A", text: "$24\\%$" },
    { id: "B", text: "$32\\%$" },
    // distractor: reports the prior 40%, the share of the lot that is variety S, ignoring the information that the seed germinated
    { id: "C", text: "$40\\%$" },
    // distractor: reverses the condition and reports 60%, the germination rate among variety S seeds
    { id: "D", text: "$60\\%$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Out of $100$ seeds, $51$ are variety R that germinate and $24$ are variety S that germinate, so $\\frac{24}{75} = 0.32$.\n\n**The Full Solution:**\nStep 1: Take a lot of $100$ seeds. Variety R accounts for $60$ of them and variety S for the other $40$.\nStep 2: Count the germinating seeds in each group: $0.85(60) = 51$ from variety R and $0.60(40) = 24$ from variety S, for $51 + 24 = 75$ germinating seeds in all.\nStep 3: The condition restricts attention to those $75$ seeds, so the probability is $\\frac{24}{75} = 0.32$, or $32\\%$. Check: the variety R share of germinating seeds is $\\frac{51}{75} = 0.68$, and $0.32 + 0.68 = 1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($24\\%$): reports $0.40(0.60) = 24\\%$, the share of the entire lot that is both variety S and germinating. That is the joint probability; the condition shrinks the denominator from $100$ to $75$.\n* Choice C ($40\\%$): reports the share of the lot that is variety S before any germination is observed. Learning that the seed germinated is evidence that shifts this number, because variety R germinates more often.\n* Choice D ($60\\%$): reports the germination rate within variety S, which is the probability of germinating given variety S, the reverse of what is asked.\n\n**Test Day Takeaway:** A conditional probability divides by the size of the group named after the word \"given\" or by the outcome already known to have happened, not by the size of the whole population.",
  skills: ["conditional-probability"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Cutting a rectangular aluminum sheet $6\\sqrt{5}$ centimeters wide and $10\\sqrt{5}$ centimeters long along one of its diagonals yields two congruent right triangular brackets. How many square centimeters does one bracket cover?",
  correctAnswer: "150",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**The correct answer is $150$.**\n\n**The Fast Way (~25s):** The diagonal halves the rectangle, so each bracket has area $\\frac{1}{2}(6\\sqrt{5})(10\\sqrt{5}) = \\frac{1}{2}(60)(5) = 150$.\n\n**The Full Solution:**\nStep 1: A diagonal of a rectangle cuts it into two congruent right triangles whose legs are the rectangle's sides, $6\\sqrt{5}$ centimeters and $10\\sqrt{5}$ centimeters.\nStep 2: Apply the right-triangle area formula with those legs: $\\frac{1}{2}(6\\sqrt{5})(10\\sqrt{5})$. Multiply the coefficients and the radicals separately: $6(10) = 60$ and $\\sqrt{5} \\cdot \\sqrt{5} = 5$, giving $\\frac{1}{2}(60)(5)$.\nStep 3: Evaluate: $\\frac{1}{2}(300) = 150$ square centimeters. Check: the whole rectangle measures $(6\\sqrt{5})(10\\sqrt{5}) = 300$ square centimeters, and $2(150) = 300$ ✓\n\n**Common Mistakes:** Entering $300$ (the area of the entire rectangle, forgetting that the diagonal splits it into two brackets); entering $30$ (multiplying only the coefficients, $\\frac{1}{2}(6)(10)$, and dropping the two radical factors entirely); entering $67.1$ (treating $\\sqrt{5} \\cdot \\sqrt{5}$ as $\\sqrt{5}$, which gives $\\frac{1}{2}(60\\sqrt{5}) = 30\\sqrt{5} \\approx 67.1$).\n\n**Test Day Takeaway:** Multiply surd side lengths in two pieces, coefficients times coefficients and radicals times radicals; $\\sqrt{k} \\cdot \\sqrt{k} = k$ is what clears the radical from an area.",
  skills: ["triangle-area"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A wheel of cheese is cooled, and its internal temperature is a linear function of the elapsed time. Four temperature readings, in degrees Celsius, and the elapsed times at which they were taken, in hours, appear in the table. What is the slope of the graph of this function?",
  questionTable: { headers: ["Elapsed time (hours)", "Internal temperature (degrees Celsius)"], rows: [["2", "51"], ["5", "42"], ["9", "30"], ["14", "15"]] },
  choices: [
    { id: "A", text: "$-3$" },
    // distractor: inverts the ratio, dividing the change in time by the change in temperature to get 3/(-9)=-1/3
    { id: "B", text: "$-\\frac{1}{3}$" },
    // distractor: inverts the ratio and drops the sign, reporting 1/3
    { id: "C", text: "$\\frac{1}{3}$" },
    // distractor: subtracts the coordinates in opposite orders, computing (51-42)/(5-2)=3 instead of (42-51)/(5-2)
    { id: "D", text: "$3$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** From $(2, 51)$ to $(5, 42)$ the temperature falls $9$ degrees in $3$ hours, so the slope is $\\frac{-9}{3} = -3$.\n\n**The Full Solution:**\nStep 1: Read two pairs from the table as points, with time as the input: $(2, 51)$ and $(5, 42)$.\nStep 2: Apply the slope formula $\\frac{y_2 - y_1}{x_2 - x_1} = \\frac{42 - 51}{5 - 2} = \\frac{-9}{3} = -3$.\nStep 3: Confirm the function really is linear by testing another pair: from $(9, 30)$ to $(14, 15)$, $\\frac{15 - 30}{14 - 9} = \\frac{-15}{5} = -3$, the same slope ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-\\frac{1}{3}$): divides the change in time by the change in temperature, $\\frac{3}{-9}$, reversing the roles of the two axes.\n* Choice C ($\\frac{1}{3}$): makes that same inversion and then reports it as positive, losing the fact that the temperature is falling.\n* Choice D ($3$): subtracts in inconsistent order, computing $\\frac{51 - 42}{5 - 2} = 3$. Both differences must run in the same direction, or the sign flips.\n\n**Test Day Takeaway:** Subtract the two points in the same order top and bottom, and sanity-check the sign against the story: a quantity that is falling has a negative slope.",
  skills: ["slope-from-points"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A telescope's observing night lasts $476$ minutes, of which $18$ minutes are reserved for calibration. Each imaging exposure occupies $9$ minutes and each spectroscopic exposure occupies $23$ minutes. Which equation relates the number of imaging exposures $x$ and the number of spectroscopic exposures $y$ that exactly fill the remaining time?",
  choices: [
    // distractor: attaches 23 minutes to the imaging count and 9 minutes to the spectroscopic count, swapping the two rates
    { id: "A", text: "$23x + 9y = 458$" },
    // distractor: adds the two durations into a single 32-minute rate applied to every exposure, which is only right if the two counts are equal
    { id: "B", text: "$32(x + y) = 458$" },
    // distractor: uses the full 476 minutes and never removes the 18 minutes of calibration
    { id: "C", text: "$9x + 23y = 476$" },
    { id: "D", text: "$9x + 23y = 458$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Observing time is $476 - 18 = 458$ minutes, and $x$ imaging exposures plus $y$ spectroscopic exposures use $9x + 23y$ minutes, so $9x + 23y = 458$.\n\n**The Full Solution:**\nStep 1: Remove the time that is not available for exposures: $476 - 18 = 458$ minutes remain.\nStep 2: Translate each count into minutes. Each imaging exposure takes $9$ minutes, so $x$ of them take $9x$ minutes; each spectroscopic exposure takes $23$ minutes, so $y$ of them take $23y$ minutes.\nStep 3: \"Exactly fill the remaining time\" means the two amounts sum to $458$: $9x + 23y = 458$. Check with a pair that fills the night exactly: $x = 33$ and $y = 7$ give $297 + 161 = 458$ minutes ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($23x + 9y = 458$): pairs each variable with the other exposure's duration. The coefficient must be the minutes per exposure for the count it multiplies.\n* Choice B ($32(x + y) = 458$): merges the two rates into $9 + 23 = 32$ minutes and charges that to every exposure, which triples the cost of an imaging exposure.\n* Choice C ($9x + 23y = 476$): sets the exposures equal to the whole night, spending the $18$ calibration minutes twice.\n\n**Test Day Takeaway:** Translate one phrase at a time: adjust the total first for anything reserved, then attach each rate to the count it actually describes.",
  skills: ["word-problem-to-equation"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A crate holds $15$ mangoes, $9$ of which are ripe. A grader removes one mango at random, sets it aside, and then removes a second mango at random. What is the probability that both removed mangoes are ripe?",
  correctAnswer: "12/35",
  explanation: "**SAT Pattern: Probability Without Replacement**\n\n**The correct answer is $\\frac{12}{35}$.**\n\n**The Fast Way (~30s):** $\\frac{9}{15} \\cdot \\frac{8}{14} = \\frac{72}{210} = \\frac{12}{35}$.\n\n**The Full Solution:**\nStep 1: The first removal is from all $15$ mangoes, $9$ of which are ripe, so the probability the first is ripe is $\\frac{9}{15} = \\frac{3}{5}$.\nStep 2: Because the first mango is set aside, the second removal is from $14$ mangoes, of which $8$ are now ripe, so the probability the second is ripe is $\\frac{8}{14} = \\frac{4}{7}$.\nStep 3: Multiply the two: $\\frac{3}{5} \\cdot \\frac{4}{7} = \\frac{12}{35}$. Check by counting pairs instead: $\\frac{9 \\cdot 8}{15 \\cdot 14} = \\frac{72}{210} = \\frac{12}{35}$ ✓\n\n**Common Mistakes:** Entering $\\frac{9}{25}$ (using $\\frac{9}{15}$ twice, as if the first mango were returned to the crate); entering $\\frac{8}{25}$ (reducing the ripe count to $8$ but leaving the total at $15$, so only one of the two numbers is updated); entering $\\frac{3}{5}$ (stopping after the first removal and reporting the probability for one mango only).\n\n**Test Day Takeaway:** Without replacement, both the favorable count and the total count drop by one before the second draw; update numerator and denominator together, then multiply.",
  skills: ["probability-basics"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In the xy-plane, segment $AB$ has endpoints $(-2, 9)$ and $(5, 5)$, and segment $BC$ meets segment $AB$ at a right angle at $B$. What is the slope of segment $BC$?",
  choices: [
    // distractor: takes the reciprocal of -4/7 but keeps the negative sign instead of changing it, giving -7/4
    { id: "A", text: "$-\\frac{7}{4}$" },
    // distractor: reports the slope of segment AB itself, -4/7, without any perpendicular adjustment
    { id: "B", text: "$-\\frac{4}{7}$" },
    // distractor: changes the sign of AB's slope without taking the reciprocal, giving 4/7
    { id: "C", text: "$\\frac{4}{7}$" },
    { id: "D", text: "$\\frac{7}{4}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The slope of $AB$ is $\\frac{5 - 9}{5 - (-2)} = -\\frac{4}{7}$, and the negative reciprocal of $-\\frac{4}{7}$ is $\\frac{7}{4}$.\n\n**The Full Solution:**\nStep 1: Find the slope of segment $AB$ from its endpoints: $\\frac{5 - 9}{5 - (-2)} = \\frac{-4}{7} = -\\frac{4}{7}$.\nStep 2: Perpendicular slopes multiply to $-1$, so the slope $m$ of segment $BC$ satisfies $-\\frac{4}{7}m = -1$.\nStep 3: Solve: $m = \\frac{7}{4}$. Check: $-\\frac{4}{7} \\cdot \\frac{7}{4} = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\frac{7}{4}$): flips $-\\frac{4}{7}$ but leaves it negative. The product $-\\frac{4}{7} \\cdot \\left(-\\frac{7}{4}\\right) = 1$, not $-1$, so those two lines are not perpendicular.\n* Choice B ($-\\frac{4}{7}$): reports the slope of $AB$ itself. A segment perpendicular to $AB$ cannot share its slope; equal slopes mean parallel.\n* Choice C ($\\frac{4}{7}$): changes the sign but skips the reciprocal. Here $-\\frac{4}{7} \\cdot \\frac{4}{7} = -\\frac{16}{49}$, which is not $-1$.\n\n**Test Day Takeaway:** Perpendicular means both moves at once, flip the fraction and change the sign, then verify by multiplying the two slopes to confirm you get exactly $-1$.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Exactly two lines through the point $(0, -6)$ in the xy-plane are tangent to the graph of $y = x^2 + 4x + 3$, touching it at exactly one point each. One of these two lines touches the graph at a point whose $x$-coordinate is positive. What is the slope of that line?",
  choices: [
    // distractor: reports the slope of the other tangent line, -2, which touches the graph at x=-3, where the x-coordinate is negative
    { id: "A", text: "$-2$" },
    // distractor: sets only the linear coefficient to zero, solving 4-m=0, and never uses the -4ac part of the discriminant
    { id: "B", text: "$4$" },
    // distractor: drops the factor of 4 in the discriminant, solving (4-m)^2=9 instead of (4-m)^2=36, and reports the larger root 7
    { id: "C", text: "$7$" },
    { id: "D", text: "$10$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Setting $mx - 6 = x^2 + 4x + 3$ gives $x^2 + (4 - m)x + 9 = 0$; tangency needs $(4 - m)^2 = 36$, so $m = -2$ or $m = 10$, and the double root $x = \\frac{m - 4}{2}$ is positive only for $m = 10$.\n\n**The Full Solution:**\nStep 1: A line through $(0, -6)$ has equation $y = mx - 6$. Setting the two expressions for $y$ equal gives $mx - 6 = x^2 + 4x + 3$, or $x^2 + (4 - m)x + 9 = 0$.\nStep 2: Tangency means this quadratic has exactly one real solution, so its discriminant is $0$: $(4 - m)^2 - 4(1)(9) = 0$, which gives $(4 - m)^2 = 36$ and $4 - m = \\pm 6$, so $m = -2$ or $m = 10$.\nStep 3: A one-solution quadratic has its double root at $x = \\frac{m - 4}{2}$, so $m = -2$ touches at $x = -3$ and $m = 10$ touches at $x = 3$. The positive $x$-coordinate belongs to $m = 10$. Check: with $m = 10$ the quadratic becomes $x^2 - 6x + 9 = (x - 3)^2 = 0$, and at $x = 3$ both graphs give $y = 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$): is the slope of the other tangent line. It satisfies the discriminant condition, but it touches the graph at $x = -3$, and the question names the line whose point of contact has a positive $x$-coordinate.\n* Choice B ($4$): comes from setting the middle coefficient $4 - m$ to zero. A zero middle coefficient makes $x^2 + 9 = 0$, which has no real solution at all, so that line misses the parabola entirely.\n* Choice C ($7$): drops the factor of $4$ in $b^2 - 4ac$, solving $(4 - m)^2 = 9$ and getting $m = 1$ or $m = 7$. The discriminant needs $4ac = 4(1)(9) = 36$, not $9$.\n\n**Test Day Takeaway:** Tangent to a parabola means the substituted equation has a double root: set the discriminant to zero, then read the double root $x = -\\frac{b}{2a}$ to tell the two tangent lines apart.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "Right triangles $ABC$ and $ADE$ in the figure share the vertex $A$, with right angles at $C$ and at $E$. Point $B$ lies on segment $AD$ and point $C$ lies on segment $AE$. If triangle $ABC$ covers $48$ square units, how many square units does quadrilateral $BCED$ cover?",
  diagram: { type: "nestedRightTriangles", params: { labels: { A: "A", B: "B", C: "C", D: "D", E: "E" }, sideLabels: { AC: "6", CE: "9" }, figureNote: true } },
  correctAnswer: "252",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**The correct answer is $252$.**\n\n**The Fast Way (~45s):** $AE = 6 + 9 = 15$, so the similarity ratio is $\\frac{15}{6} = \\frac{5}{2}$ and triangle $ADE$ has area $48 \\cdot \\frac{25}{4} = 300$. The quadrilateral is $300 - 48 = 252$.\n\n**The Full Solution:**\nStep 1: Triangles $ABC$ and $ADE$ share $\\angle A$ and each has a right angle ($\\angle ACB$ and $\\angle AED$), so they are similar. The corresponding sides along the shared ray are $AC = 6$ and $AE = 6 + 9 = 15$.\nStep 2: Areas of similar figures scale as the square of the linear ratio: $\\left(\\frac{15}{6}\\right)^2 = \\frac{25}{4}$. So triangle $ADE$ has area $48 \\cdot \\frac{25}{4} = 300$ square units.\nStep 3: Quadrilateral $BCED$ is what is left when the small triangle is removed from the large one: $300 - 48 = 252$ square units. Check: the removed piece is $\\frac{48}{300} = \\frac{4}{25}$ of the whole, exactly the square of $\\frac{2}{5}$ ✓\n\n**Common Mistakes:** Entering $300$ (the area of triangle $ADE$, forgetting to remove the small triangle that the quadrilateral excludes); entering $120$ (scaling the area by the linear ratio $\\frac{5}{2}$ instead of its square, $48 \\cdot \\frac{5}{2} = 120$); entering $72$ (making that same linear-ratio error and then subtracting, $120 - 48 = 72$).\n\n**Test Day Takeaway:** Areas of similar figures scale by the square of the side ratio; for the region between two nested similar figures, compute both areas first and subtract only at the end.",
  skills: ["similar-triangles"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In a greenhouse trial, the model $q(n) = -4n^2 + 24n + c$ predicts the yield of a tomato plot, in kilograms per square meter, when $n$ units of nitrogen per square meter are added, where $c$ is a constant. The greatest yield the model predicts is $41$ kilograms per square meter. What yield does the model predict when no nitrogen is added?",
  choices: [
    { id: "A", text: "$5$" },
    // distractor: completes the square without factoring -4 out of the n-terms, solving 9+c=41 to get c=32 instead of c=5
    { id: "B", text: "$32$" },
    // distractor: reports the greatest yield, 41, as the yield at n=0, treating the maximum as the constant term
    { id: "C", text: "$41$" },
    // distractor: places the vertex at n=-3 by using b/(2a) with the wrong sign, solving -36-72+c=41 to get c=149
    { id: "D", text: "$149$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The model peaks at $n = \\frac{-24}{2(-4)} = 3$, where $q(3) = 36 + c$. Then $36 + c = 41$ gives $c = 5$, and the yield with no nitrogen is $q(0) = c = 5$.\n\n**The Full Solution:**\nStep 1: The coefficient of $n^2$ is $-4$, so the graph opens downward and the greatest predicted yield occurs at the vertex, $n = \\frac{-24}{2(-4)} = 3$ units of nitrogen.\nStep 2: Evaluate there in terms of $c$: $q(3) = -4(9) + 24(3) + c = -36 + 72 + c = 36 + c$. The greatest yield is $41$ kilograms per square meter, so $36 + c = 41$ and $c = 5$.\nStep 3: No nitrogen added means $n = 0$, and $q(0) = -4(0)^2 + 24(0) + 5 = 5$ kilograms per square meter. Check by completing the square: $q(n) = -4(n - 3)^2 + 41$, which expands to $-4n^2 + 24n - 36 + 41 = -4n^2 + 24n + 5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($32$): completes the square without factoring the $-4$ out of the $n$-terms, writing $-4(n - 3)^2 + 9 + c$ and solving $9 + c = 41$. The compensation is $+36$, not $+9$, because the $9$ inside the parentheses is multiplied by $-4$ on the way out.\n* Choice C ($41$): reports the greatest yield itself. That value is reached at $n = 3$ units of nitrogen, not at $n = 0$, so it cannot also be the yield with none added.\n* Choice D ($149$): puts the vertex at $n = -3$ by reading $\\frac{b}{2a}$ without the leading minus sign, then solves $-36 - 72 + c = 41$.\n\n**Test Day Takeaway:** A downward parabola takes its greatest value at $n = -\\frac{b}{2a}$: find that input, set the value there equal to the stated maximum to pin the unknown constant, and only then evaluate at the input the question actually names.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Let $q(n) = n^2 - 6n + 1$ for every number $n$, and let $r$ be the function defined by $r(n) = q(n + 4)$. In the coordinate plane, the graph of $r$ is a parabola whose lowest point is $(a, b)$. What is the value of $a + b$?",
  choices: [
    { id: "A", text: "$-9$" },
    // distractor: never applies the shift and uses q's own vertex (3,-8), giving 3+(-8)=-5
    { id: "B", text: "$-5$" },
    // distractor: shifts the vertex 4 units right instead of left, to (7,-8), giving 7+(-8)=-1
    { id: "C", text: "$-1$" },
    // distractor: locates q's vertex at n=-3 by using b/(2a) with the wrong sign, then shifts to (-7,28), giving 21
    { id: "D", text: "$21$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Function Transformation**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** $q$ has its vertex at $n = 3$ with $q(3) = -8$. Replacing $n$ with $n + 4$ slides the graph $4$ units left, so $r$ bottoms out at $(-1, -8)$ and $a + b = -9$.\n\n**The Full Solution:**\nStep 1: Find the vertex of $q$: $n = \\frac{-(-6)}{2(1)} = 3$, and $q(3) = 9 - 18 + 1 = -8$. So $q$ has its least value at $(3, -8)$.\nStep 2: $r(n) = q(n + 4)$ means $r$ delivers at input $n$ whatever $q$ delivers at input $n + 4$, so every point of $q$'s graph moves $4$ units to the left. The lowest point moves from $(3, -8)$ to $(3 - 4, -8) = (-1, -8)$.\nStep 3: Therefore $a = -1$, $b = -8$, and $a + b = -9$. Check directly: $r(-1) = q(3) = -8$, while $r(0) = q(4) = 16 - 24 + 1 = -7$, which is higher ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-5$): uses $q$'s vertex $(3, -8)$ and never applies the transformation, giving $3 + (-8) = -5$.\n* Choice C ($-1$): moves the vertex to $(7, -8)$ because the $+4$ inside looks like a rightward shift. Inside the parentheses the shift runs opposite to the sign, so $+4$ moves the graph left.\n* Choice D ($21$): places $q$'s vertex at $n = -3$ by using $\\frac{b}{2a}$ without the leading minus sign, then shifts to $(-7, 28)$ and adds to get $21$.\n\n**Test Day Takeaway:** A change inside the function's parentheses moves the graph horizontally opposite to the sign; find the original vertex first, then slide it.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Three straight rows enclose a triangular section of an orchard. The interior angles at two corners measure $3x^\\circ$ and $(2x + 10)^\\circ$, and at the third corner the angle between one row and the extension of another beyond that corner measures $(4x + 30)^\\circ$. What is the measure, in degrees, of the interior angle at the third corner?",
  choices: [
    // distractor: stops at the value of x, 20, instead of substituting it back to find an angle measure
    { id: "A", text: "$20$" },
    // distractor: reports the first interior angle, 3(20)=60 degrees, rather than the angle at the third corner
    { id: "B", text: "$60$" },
    { id: "C", text: "$70$" },
    // distractor: reports the exterior angle 4(20)+30=110 degrees instead of the interior angle supplementary to it
    { id: "D", text: "$110$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** An exterior angle equals the sum of the two remote interior angles, so $4x + 30 = 3x + 2x + 10$ gives $x = 20$; the exterior angle is $110^\\circ$ and the interior angle is $180 - 110 = 70^\\circ$.\n\n**The Full Solution:**\nStep 1: The angle described at the third corner lies between one side and the extension of another, so it is that corner's exterior angle and is supplementary to the interior angle there.\nStep 2: Because the three interior angles sum to $180^\\circ$, an exterior angle equals the sum of the two nonadjacent interior angles: $4x + 30 = 3x + (2x + 10)$, which simplifies to $4x + 30 = 5x + 10$, so $x = 20$.\nStep 3: The two given interior angles are $3(20) = 60^\\circ$ and $2(20) + 10 = 50^\\circ$, so the third interior angle is $180 - 60 - 50 = 70^\\circ$. Check: the exterior angle is $4(20) + 30 = 110^\\circ$, and $70 + 110 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): reports $x$ itself. Solving for $x$ is only the first move; the angle asked for is $70^\\circ$.\n* Choice B ($60$): reports $3x = 60$, the interior angle at the first corner, not the one at the corner the question names.\n* Choice D ($110$): reports the exterior angle $4(20) + 30 = 110^\\circ$. The interior angle at that corner is its supplement, $180 - 110 = 70^\\circ$.\n\n**Test Day Takeaway:** An exterior angle equals the sum of the two remote interior angles and is supplementary to its own interior angle; solve for the parameter first, then check which angle the question actually wants.",
  skills: ["triangle-angle-sum"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The expression $2x^3 + ax^2 - 29x + 30$, where $a$ is a constant, can be written as the product of $x - 2$ and a quadratic expression with integer coefficients. That quadratic expression has two distinct real zeros, and exactly one of them is positive. What is the greater of the two zeros?",
  correctAnswer: "3/2",
  explanation: "**SAT Pattern: Polynomial Factoring with Given Factor**\n\n**The correct answer is $\\frac{3}{2}$.**\n\n**The Fast Way (~50s):** Because $x - 2$ is a factor, $2(8) + 4a - 58 + 30 = 0$, so $a = 3$. Then $2x^3 + 3x^2 - 29x + 30 = (x - 2)(2x - 3)(x + 5)$, and the quadratic factor's zeros are $\\frac{3}{2}$ and $-5$.\n\n**The Full Solution:**\nStep 1: If $x - 2$ is a factor, substituting $x = 2$ must give $0$: $2(2)^3 + a(2)^2 - 29(2) + 30 = 16 + 4a - 58 + 30 = 4a - 12$. Setting $4a - 12 = 0$ gives $a = 3$.\nStep 2: Divide $2x^3 + 3x^2 - 29x + 30$ by $x - 2$. The quotient is $2x^2 + 7x - 15$, since $(x - 2)(2x^2 + 7x - 15) = 2x^3 + 7x^2 - 15x - 4x^2 - 14x + 30 = 2x^3 + 3x^2 - 29x + 30$.\nStep 3: Factor the quotient: $2x^2 + 7x - 15 = (2x - 3)(x + 5)$, so its zeros are $x = \\frac{3}{2}$ and $x = -5$, and the greater is $\\frac{3}{2}$. Check: $2\\left(\\frac{3}{2}\\right)^2 + 7\\left(\\frac{3}{2}\\right) - 15 = 4.5 + 10.5 - 15 = 0$ ✓\n\n**Common Mistakes:** Entering $3$ (the value of the constant $a$, which is only an intermediate result); entering $-5$ (the other zero of the quadratic factor, which is the lesser one); entering $2/3$ (inverting the zero of $2x - 3$, which is $\\frac{3}{2}$, not $\\frac{2}{3}$).\n\n**Test Day Takeaway:** A given linear factor pins down a missing coefficient by substitution; only once the polynomial is fully known do you divide, and the quotient's factors carry the remaining zeros.",
  skills: ["finding-roots-factoring"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A quadratic function $f$ produces the four outputs listed in the table for the four inputs beside them. Two different inputs produce an output of $-22$. What is the product of those two inputs?",
  questionTable: { headers: ["x", "f(x)"], rows: [["1", "-16"], ["3", "-40"], ["5", "-40"], ["7", "-16"]] },
  choices: [
    // distractor: applies Vieta to f(x)=0 instead of f(x)=-22, reporting 5/3 as the product
    { id: "A", text: "$\\frac{5}{3}$" },
    // distractor: reports the sum of the two inputs, 24/3=8, instead of their product
    { id: "B", text: "$8$" },
    { id: "C", text: "$9$" },
    // distractor: reads the product off 3x^2-24x+27=0 as the constant 27, forgetting to divide by the leading coefficient 3
    { id: "D", text: "$27$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** The table's symmetry gives $f(x) = 3(x - 4)^2 - 43$, so $f(x) = -22$ becomes $3x^2 - 24x + 27 = 0$ and the product of the roots is $\\frac{27}{3} = 9$.\n\n**The Full Solution:**\nStep 1: The table pairs $f(3) = f(5) = -40$ and $f(1) = f(7) = -16$, so the axis of symmetry is $x = 4$ and $f(x) = a(x - 4)^2 + c$. From $f(3) = a + c = -40$ and $f(1) = 9a + c = -16$, subtracting gives $8a = 24$, so $a = 3$ and $c = -43$.\nStep 2: Expand: $f(x) = 3(x - 4)^2 - 43 = 3x^2 - 24x + 5$. Setting $f(x) = -22$ gives $3x^2 - 24x + 5 = -22$, or $3x^2 - 24x + 27 = 0$.\nStep 3: For $ax^2 + bx + c = 0$ the product of the roots is $\\frac{c}{a} = \\frac{27}{3} = 9$. Check: dividing through by $3$ gives $x^2 - 8x + 9 = 0$, whose discriminant $64 - 36 = 28$ is positive, so two distinct inputs really do exist and their product is $9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{5}{3}$): applies the product rule to $f(x) = 0$, whose constant term is $5$. Moving the $-22$ across changes the constant to $27$, and only that equation describes the two inputs in question.\n* Choice B ($8$): reports the sum of the roots, $\\frac{-(-24)}{3} = 8$. Sum uses $-\\frac{b}{a}$; product uses $\\frac{c}{a}$.\n* Choice D ($27$): reads the constant term $27$ as the product directly, skipping the division by the leading coefficient $3$.\n\n**Test Day Takeaway:** Matching outputs in a table locate the axis of symmetry, which is enough to rebuild the quadratic; once the equation is written equal to zero, the sum of the roots is $-\\frac{b}{a}$ and the product is $\\frac{c}{a}$.",
  skills: ["quadratic-factoring"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "During a launch, the height above the pad of a sounding rocket, in meters, is $h(t) = -5t^2 + 180t$ at $t$ seconds after liftoff. An onboard camera runs whenever that height is $1{,}375$ meters or more. For how many seconds does the camera run?",
  correctAnswer: "14",
  explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**The correct answer is $14$.**\n\n**The Fast Way (~50s):** Solving $-5t^2 + 180t = 1{,}375$ reduces to $t^2 - 36t + 275 = 0$, whose roots are $t = 11$ and $t = 25$, so the camera runs for $25 - 11 = 14$ seconds.\n\n**The Full Solution:**\nStep 1: The camera runs while $-5t^2 + 180t \\ge 1{,}375$, so find the boundary times by solving the equation $-5t^2 + 180t = 1{,}375$.\nStep 2: Rearrange to $5t^2 - 180t + 1{,}375 = 0$ and divide every term by $5$: $t^2 - 36t + 275 = 0$. Factoring gives $(t - 11)(t - 25) = 0$, so $t = 11$ and $t = 25$.\nStep 3: The parabola opens downward, so the height is at or above $1{,}375$ meters exactly between those two times, an interval $25 - 11 = 14$ seconds long. Check: $h(11) = -605 + 1{,}980 = 1{,}375$ and $h(18) = -1{,}620 + 3{,}240 = 1{,}620$, above the threshold, so the interior of the interval does qualify ✓\n\n**Common Mistakes:** Entering $11$ (the moment the camera switches on, not how long it runs); entering $25$ (the moment it switches off, again a time rather than a duration); entering $36$ (the sum of the two boundary times, $11 + 25$, instead of their difference).\n\n**Test Day Takeaway:** A \"for how long\" question about a downward-opening quadratic asks for the width of the interval between the two boundary solutions, so solve the equality first and then subtract.",
  skills: ["quadratics"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 2 — Math Module 2 (22 questions)
// Flow: E at 1,2,12 · M at 3,4,6,7,10,14,16 ·
// H at 5,8,9,11,13,15,17,18,19,20,21,22. Breather easy at Q12 (range).
// Official-calibration recreation 2026-08-31: fresh scenarios throughout;
// warm-ups Q1-5 all carry a trap or 2+ steps (percent-of-previous growth,
// first-visit pricing, added-value mean shift, perimeter scaling, radian sum).
// Diagrams at Q3 (data table), Q4 (similar triangles), Q11 (right triangle),
// Q12 (dot plot).

{
  id: 1,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Two book-drop kiosks on a college campus are located at the plotted points on the coordinate grid shown, where each grid unit represents $20$ meters. What is the straight-line distance, in meters, between the two kiosks?",
  diagram: { type: "coordinatePoints", params: { points: [[-3, -2], [5, 4]], xMin: -6, xMax: 8, yMin: -5, yMax: 7 } },
  choices: [
    // distractor: leaves the answer in grid units, reporting the distance 10 without multiplying by the 20 meters each unit represents
    { id: "A", text: "$10$" },
    // distractor: uses only the horizontal separation of 8 units, giving 8(20) = 160 meters
    { id: "B", text: "$160$" },
    { id: "C", text: "$200$" },
    // distractor: adds the horizontal and vertical separations, 8 + 6 = 14 units, instead of using the Pythagorean relationship, giving 14(20) = 280 meters
    { id: "D", text: "$280$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Distance Formula**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The kiosks sit $8$ units apart horizontally and $6$ units apart vertically, a $6$-$8$-$10$ right triangle, so they are $10$ units apart. Each unit is $20$ meters, so the distance is $10(20) = 200$ meters.\n\n**The Full Solution:**\nStep 1: Read the two plotted points from the grid: $(-3, -2)$ and $(5, 4)$. The horizontal separation is $5 - (-3) = 8$ units and the vertical separation is $4 - (-2) = 6$ units.\nStep 2: Apply the distance formula: $d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ units.\nStep 3: Convert to meters using the scale: $10(20) = 200$ meters. Check: a right triangle with legs $8(20) = 160$ and $6(20) = 120$ meters has hypotenuse $\\sqrt{160^2 + 120^2} = \\sqrt{40000} = 200$ meters ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): stops at the distance in grid units. The grid legend says each unit stands for $20$ meters, so $10$ units is $200$ meters, not $10$.\n* Choice B ($160$): uses only the horizontal separation, $8$ units, and converts it to $8(20) = 160$ meters. That is one leg of the right triangle, not the straight-line distance.\n* Choice D ($280$): adds the two separations, $8 + 6 = 14$ units, and converts to $280$ meters. Adding the legs measures the path along the grid lines, which is always longer than the direct route.\n\n**Test Day Takeaway:** When a coordinate figure carries a scale, find the distance in grid units first and convert once at the end; converting each coordinate difference separately invites arithmetic slips.",
  skills: ["coordinate-geometry"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A bicycle shop sold $58$ helmets and tire tubes combined in one week and took in $\\$1{,}040$ from these sales. Each helmet sold for $\\$32$ and each tire tube sold for $\\$8$. How many helmets did the shop sell that week?",
  choices: [
    // distractor: divides the leftover money by the helmet price instead of by the price difference: (1040 - 464)/32 = 18
    { id: "A", text: "$18$" },
    { id: "B", text: "$24$" },
    // distractor: treats every sale as one helmet paired with one tube, computing 1040/(32 + 8) = 26
    { id: "C", text: "$26$" },
    // distractor: solves the system correctly but reports 34, the number of tire tubes, instead of the number of helmets
    { id: "D", text: "$34$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** If all $58$ items were tubes the shop would have taken in $8(58) = 464$ dollars. Each helmet adds $32 - 8 = 24$ dollars, so there are $\\frac{1040 - 464}{24} = 24$ helmets.\n\n**The Full Solution:**\nStep 1: Let $h$ be the number of helmets and $t$ the number of tire tubes. The count gives $h + t = 58$ and the revenue gives $32h + 8t = 1040$.\nStep 2: Substitute $t = 58 - h$ into the revenue equation: $32h + 8(58 - h) = 1040$, so $32h + 464 - 8h = 1040$ and $24h = 576$.\nStep 3: Divide: $h = 24$. Check: $t = 58 - 24 = 34$, and $32(24) + 8(34) = 768 + 272 = 1040$ dollars ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): subtracts the all-tubes revenue correctly but then divides by the helmet price, $\\frac{1040 - 464}{32} = 18$. The leftover money is the *extra* each helmet brings in, so it must be divided by the $\\$24$ difference in price.\n* Choice C ($26$): assumes each sale was a helmet-and-tube pair costing $\\$40$, giving $\\frac{1040}{40} = 26$. Nothing in the problem pairs the two items.\n* Choice D ($34$): the correct value of the *other* variable. Substituting for $h$ instead of $t$ lands on the tube count, so the answer must be checked against the question's wording.\n\n**Test Day Takeaway:** In a count-plus-value system, price every item at the cheaper rate first; the money left over, divided by the difference in price, counts the expensive items directly.",
  skills: ["word-problem-to-equation", "setting-up-systems"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A total of $250$ items are classified in the table by group and by type. If one of the items is chosen at random, what is the probability that its type is II, given that its group is not A?",
  questionTable: { headers: ["Group", "Type I", "Type II", "Type III", "Total"], rows: [["A", "$18$", "$24$", "$33$", "$75$"], ["B", "$25$", "$40$", "$43$", "$108$"], ["C", "$15$", "$30$", "$22$", "$67$"], ["Total", "$58$", "$94$", "$98$", "$250$"]] },
  choices: [
    // distractor: counts only group B in the numerator, using 40/175 = 8/35 and leaving out group C's 30 type-II items
    { id: "A", text: "$\\frac{8}{35}$" },
    // distractor: uses the correct numerator 70 but divides by the grand total 250 instead of the 175 items outside group A, giving 7/25
    { id: "B", text: "$\\frac{7}{25}$" },
    // distractor: ignores the condition entirely and computes 94/250 = 47/125, the probability of type II among all 250 items
    { id: "C", text: "$\\frac{47}{125}$" },
    { id: "D", text: "$\\frac{2}{5}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The condition restricts the pool to groups B and C, which hold $108 + 67 = 175$ items, and $40 + 30 = 70$ of those are type II. So the probability is $\\frac{70}{175} = \\frac{2}{5}$.\n\n**The Full Solution:**\nStep 1: The phrase \"given that its group is not A\" replaces the sample space: only groups B and C count, so the denominator is $108 + 67 = 175$, not $250$.\nStep 2: Inside that restricted pool, count the type-II items: $40$ from group B and $30$ from group C, for $70$ items.\nStep 3: Divide: $\\frac{70}{175} = \\frac{2}{5}$. Check: the type-II items outside group A are $94 - 24 = 70$, matching Step 2 ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{8}{35}$): uses the right denominator, $175$, but counts only group B's $40$ type-II items. \"Not group A\" covers both remaining groups, so group C's $30$ belong in the numerator too.\n* Choice B ($\\frac{7}{25}$): counts the numerator correctly as $70$ but divides by the grand total $250$. A conditional probability shrinks the denominator to the items that satisfy the condition.\n* Choice C ($\\frac{47}{125}$): computes $\\frac{94}{250}$, the unconditional probability of type II. This answer ignores the condition on both the top and the bottom of the fraction.\n\n**Test Day Takeaway:** In a conditional probability, write the denominator first — it is the total of the row, column, or union named after \"given that\" — and only then count the part of that pool the question asks about.",
  skills: ["conditional-probability", "two-way-table"]
},
{
  id: 4,
  type: "fill-in",
  difficulty: "easy",
  band: 2,
  question: "A maintenance path runs $28$ meters east from a pump house and then $45$ meters north to a valve. How much shorter, in meters, is the straight-line route from the pump house to the valve than the maintenance path?",
  correctAnswer: "20",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is 20.**\n\n**The Fast Way (~25s):** The two legs $28$ and $45$ give a hypotenuse of $\\sqrt{28^2 + 45^2} = 53$, and the path itself is $28 + 45 = 73$, so the straight route saves $73 - 53 = 20$ meters.\n\n**The Full Solution:**\nStep 1: The eastward leg and the northward leg meet at a right angle, so the straight-line route is the hypotenuse of a right triangle with legs $28$ and $45$ meters.\nStep 2: Apply the Pythagorean theorem: $28^2 + 45^2 = 784 + 2025 = 2809$, and $\\sqrt{2809} = 53$ meters.\nStep 3: The path along the two legs is $28 + 45 = 73$ meters, so the straight route is $73 - 53 = 20$ meters shorter. Check: $53 + 20 = 73$, the full path length ✓\n\n**Common Mistakes:**\n* $53$: stops at the hypotenuse. That is the length of the straight-line route, not the amount by which it is shorter than the path.\n* $73$: reports the length of the maintenance path itself, $28 + 45$, without comparing it to the direct route.\n* $17$: subtracts the two legs, $45 - 28 = 17$, instead of subtracting the hypotenuse from the sum of the legs.\n\n**Test Day Takeaway:** A \"how much shorter\" question needs two lengths, so compute the hypotenuse and the traveled path separately and subtract; the hypotenuse alone never answers a comparison question.",
  skills: ["pythagorean-theorem"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 2,
  question: "A pair of straight pipe runs at a water-treatment plant meet so that the four angles at their meeting point measure $a^{\\circ}$, $b^{\\circ}$, $a^{\\circ}$, and $b^{\\circ}$ in order around the point. If $b$ is $46$ more than $a$, what is the value of $b$?",
  choices: [
    // distractor: reports the given difference of 46 between the two angle measures as though it were the measure of b
    { id: "A", text: "$46$" },
    // distractor: solves correctly but reports a = 67, the measure of the other pair of angles
    { id: "B", text: "$67$" },
    { id: "C", text: "$113$" },
    // distractor: computes 180 - 46 = 134 and stops, never splitting the remaining 134 degrees between a and b
    { id: "D", text: "$134$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Neighboring angles form a straight line, so $a + b = 180$. With $b = a + 46$, that gives $2a + 46 = 180$, so $a = 67$ and $b = 113$.\n\n**The Full Solution:**\nStep 1: Going around the point the measures alternate $a$, $b$, $a$, $b$, so the equal measures are opposite each other — they are the two pairs of vertical angles — and any two neighboring angles form a linear pair: $a + b = 180$.\nStep 2: Translate the second sentence: $b = a + 46$. Substituting gives $a + (a + 46) = 180$, so $2a = 134$ and $a = 67$.\nStep 3: Then $b = 67 + 46 = 113$. Check: the four measures $67$, $113$, $67$, $113$ sum to $360$ degrees, as the angles around a point must ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($46$): treats the difference between the two angle measures as one of the measures. The $46$ is a gap, not an angle.\n* Choice B ($67$): the value of $a$. Both variables come out of the same equation, so the last step is checking which one the question asked for.\n* Choice D ($134$): computes $180 - 46 = 134$ and stops. That is the amount left to split between $a$ and $b$ after the difference is set aside, not $b$ itself.\n\n**Test Day Takeaway:** Two lines crossing create two vertical pairs whose neighbors are supplementary; writing $a + b = 180$ turns any relationship between the pairs into a single one-variable equation.",
  skills: ["angles"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A utility's billing software converts a meter reading $x$ into kilowatt-hours using the function $g$, then converts kilowatt-hours into a dollar charge using the function $f$. The table gives values of $f$ and $g$. What is the charge, in dollars, for a meter reading of $6$?",
  questionTable: { headers: ["$x$", "$f(x)$", "$g(x)$"], rows: [["$2$", "$15$", "$8$"], ["$4$", "$33$", "$2$"], ["$6$", "$21$", "$4$"], ["$8$", "$27$", "$6$"]] },
  choices: [
    // distractor: stops at g(6) = 4, reporting kilowatt-hours instead of running that output through f
    { id: "A", text: "$4$" },
    // distractor: applies f directly to the meter reading, reading f(6) = 21 and skipping the conversion g
    { id: "B", text: "$21$" },
    // distractor: adds the two table entries in the row x = 6, computing 21 + 4 = 25 instead of composing the functions
    { id: "C", text: "$25$" },
    { id: "D", text: "$33$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The charge is $f(g(6))$. From the table $g(6) = 4$, and $f(4) = 33$ dollars.\n\n**The Full Solution:**\nStep 1: The software runs $g$ first and then $f$, so the charge for a reading of $6$ is the composite $f(g(6))$ — the inner function is evaluated first.\nStep 2: Read the row $x = 6$ in the $g$ column: $g(6) = 4$ kilowatt-hours.\nStep 3: Now evaluate $f$ at that output, using the row $x = 4$: $f(4) = 33$ dollars. Check: the input $6$ never appears again after Step 2, and the value $4$ is looked up in the $f$ column, not the $g$ column ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): the value of $g(6)$. That is the kilowatt-hour reading, one conversion short of the dollar charge the question asks for.\n* Choice B ($21$): reads $f(6) = 21$, applying $f$ straight to the meter reading. The reading has to pass through $g$ first — $f$ only accepts kilowatt-hours.\n* Choice C ($25$): adds the two values in the row $x = 6$, $21 + 4 = 25$. Composition feeds one output into the other function; it never adds them.\n\n**Test Day Takeaway:** In a composite, the inner function's output becomes the outer function's input, so the second lookup uses a different row of the table than the first.",
  skills: ["function-composition"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A print shop's first order of $4$ reams of paper and $9$ toner cartridges cost $\\$674.50$, and a second order of $9$ reams and $4$ toner cartridges cost $\\$339.50$. Each ream costs the same amount in both orders, and so does each toner cartridge. What is the total cost, in dollars, of one ream and one toner cartridge?",
  correctAnswer: "78",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**The correct answer is 78.**\n\n**The Fast Way (~30s):** Adding the two orders gives $13$ reams and $13$ toner cartridges for $674.50 + 339.50 = 1{,}014$ dollars, so one of each costs $\\frac{1014}{13} = 78$ dollars.\n\n**The Full Solution:**\nStep 1: Let $r$ be the cost of one ream and $t$ the cost of one toner cartridge. The two orders give $4r + 9t = 674.50$ and $9r + 4t = 339.50$.\nStep 2: Add the equations. The left side becomes $13r + 13t = 13(r + t)$ and the right side becomes $1{,}014$.\nStep 3: Divide by $13$: $r + t = 78$ dollars. Check: $r = 5.50$ and $t = 72.50$ satisfy both orders, since $4(5.50) + 9(72.50) = 674.50$ and $9(5.50) + 4(72.50) = 339.50$, and $5.50 + 72.50 = 78$ ✓\n\n**Common Mistakes:**\n* $1014$: adds the two order totals and stops. That is the cost of $13$ reams and $13$ cartridges, so it still has to be divided by $13$.\n* $39$: divides the combined total by $26$, the number of individual items in the two orders, instead of by the $13$ ream-and-cartridge pairs.\n* $67$: subtracts the orders instead of adding them, giving $5(t - r) = 335$ and $t - r = 67$. That is the difference between the two unit prices, not their sum.\n\n**Test Day Takeaway:** When a system's two equations have their coefficients swapped, adding them produces a multiple of the sum of the variables — the question's target — so neither variable ever has to be found alone.",
  skills: ["elimination-method"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For a constant $k$, the product of $\\sqrt[3]{8^{2x}}$ and $4^{x-3}$ equals $2^{kx-6}$ at every value of $x$. What is the value of $k$?",
  choices: [
    // distractor: divides the two powers instead of multiplying them, getting 2x - (2x - 6) = 6, an exponent with no x-term, so k = 0
    { id: "A", text: "$0$" },
    // distractor: rewrites 4 as 2 to the first power, getting 2x + (x - 3) = 3x - 3 and reading k = 3
    { id: "B", text: "$3$" },
    { id: "C", text: "$4$" },
    // distractor: drops the cube root, getting 6x + (2x - 6) = 8x - 6 and reading k = 8
    { id: "D", text: "$8$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Common-Base Exponent Simplification**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** $\\sqrt[3]{8^{2x}} = \\sqrt[3]{2^{6x}} = 2^{2x}$ and $4^{x-3} = 2^{2x-6}$, so the product is $2^{4x-6}$ and $k = 4$.\n\n**The Full Solution:**\nStep 1: Put the first factor in base $2$: $8^{2x} = (2^3)^{2x} = 2^{6x}$, and a cube root divides the exponent by $3$, so $\\sqrt[3]{2^{6x}} = 2^{2x}$.\nStep 2: Put the second factor in base $2$: $4^{x-3} = (2^2)^{x-3} = 2^{2x-6}$.\nStep 3: Multiplying powers of the same base adds exponents: $2^{2x} \\cdot 2^{2x-6} = 2^{4x-6}$. Matching this with $2^{kx-6}$ gives $k = 4$. Check at $x = 3$: $\\sqrt[3]{8^6} \\cdot 4^0 = 8^2 = 64 = 2^6$, and $4(3) - 6 = 6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): subtracts the second exponent instead of adding it, giving $2x - (2x - 6) = 6$. The two factors are multiplied, so their exponents add.\n* Choice B ($3$): treats $4$ as $2^1$, giving $2x + (x - 3) = 3x - 3$. Since $4 = 2^2$, the exponent $x - 3$ doubles to $2x - 6$ — which is exactly the constant $-6$ the target form shows.\n* Choice D ($8$): converts $8$ to $2^3$ but never applies the cube root, leaving $6x + (2x - 6) = 8x - 6$. A cube root is the exponent $\\frac{1}{3}$, so it divides $6x$ by $3$.\n\n**Test Day Takeaway:** Convert radicals to fractional exponents and every base to a single common base before combining; when the target form already shows the constant term, use it to confirm the conversion was done right.",
  skills: ["exponent-laws"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A service road at a solar farm follows the line $3x + 2y = 19$ in the $xy$-plane. A cable trench meets that road at a right angle and contains the point $(12, 5)$. At what $y$-value does the trench cross the $y$-axis?",
  choices: [
    // distractor: uses the negative of the road's slope, 3/2, instead of the negative reciprocal, giving 5 - (3/2)(12) = -13
    { id: "A", text: "$-13$" },
    { id: "B", text: "$-3$" },
    // distractor: uses the reciprocal -2/3 without flipping the sign, giving 5 - (-2/3)(12) = 13
    { id: "C", text: "$13$" },
    // distractor: uses the road's own slope -3/2, drawing a parallel line instead of a perpendicular one, giving 5 + 18 = 23
    { id: "D", text: "$23$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The road has slope $-\\frac{3}{2}$, so the trench has slope $\\frac{2}{3}$. Its $y$-intercept is $5 - \\frac{2}{3}(12) = 5 - 8 = -3$.\n\n**The Full Solution:**\nStep 1: Put the road in slope-intercept form: $3x + 2y = 19$ gives $y = -\\frac{3}{2}x + \\frac{19}{2}$, so the road's slope is $-\\frac{3}{2}$.\nStep 2: Perpendicular slopes are negative reciprocals, so the trench has slope $\\frac{2}{3}$ — flip the fraction and change the sign.\nStep 3: Use the point $(12, 5)$ in $y = \\frac{2}{3}x + b$: $5 = \\frac{2}{3}(12) + b = 8 + b$, so $b = -3$. Check: $\\left(-\\frac{3}{2}\\right)\\left(\\frac{2}{3}\\right) = -1$, the test for perpendicular slopes ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-13$): changes the sign of the road's slope but never flips the fraction, using $\\frac{3}{2}$ and getting $5 - \\frac{3}{2}(12) = -13$. A negative reciprocal requires both moves.\n* Choice C ($13$): flips the fraction but keeps the negative sign, using $-\\frac{2}{3}$ and getting $5 + 8 = 13$.\n* Choice D ($23$): reuses the road's slope $-\\frac{3}{2}$, which produces a line parallel to the road rather than perpendicular to it, giving $5 + 18 = 23$.\n\n**Test Day Takeaway:** Read the slope out of standard form as $-\\frac{A}{B}$, then flip and negate it in one deliberate step; substituting the given point last keeps the sign work isolated.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A technician models a converter's efficiency index by $E(x) = \\frac{4x^2 - 81}{2x^2 - 5x - 63}$, where $x$ is the input voltage in volts and $x > 7$. Which of the following expressions is equal to $E(x)$ at every voltage in that range?",
  choices: [
    // distractor: misfactors the denominator as (2x+9)(x+7), a sign slip in the linear factor, then cancels 2x+9 and is left with x+7 on the bottom
    { id: "A", text: "$\\frac{2x - 9}{x + 7}$" },
    { id: "B", text: "$\\frac{2x - 9}{x - 7}$" },
    // distractor: cancels the wrong factor of the numerator, keeping 2x+9 rather than the factor 2x-9 that survives
    { id: "C", text: "$\\frac{2x + 9}{x - 7}$" },
    // distractor: misfactors the denominator as (2x-9)(x+7) and cancels 2x-9, keeping 2x+9 over x+7
    { id: "D", text: "$\\frac{2x + 9}{x + 7}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Rational Expression Simplification**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The numerator is a difference of squares, $(2x - 9)(2x + 9)$, and the denominator factors as $(2x + 9)(x - 7)$. Cancelling $2x + 9$ leaves $\\frac{2x - 9}{x - 7}$.\n\n**The Full Solution:**\nStep 1: Factor the numerator: $4x^2 - 81 = (2x)^2 - 9^2 = (2x - 9)(2x + 9)$.\nStep 2: Factor the denominator. Two numbers multiplying to $2(-63) = -126$ and adding to $-5$ are $9$ and $-14$, so $2x^2 - 5x - 63 = 2x^2 + 9x - 14x - 63 = x(2x + 9) - 7(2x + 9) = (2x + 9)(x - 7)$.\nStep 3: The shared factor $2x + 9$ divides out, leaving $\\frac{2x - 9}{x - 7}$. Check at $x = 9$: $E(9) = \\frac{324 - 81}{162 - 45 - 63} = \\frac{243}{54} = 4.5$, and $\\frac{2(9) - 9}{9 - 7} = \\frac{9}{2} = 4.5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{2x - 9}{x + 7}$): factors the denominator as $(2x + 9)(x + 7)$, which expands to $2x^2 + 23x + 63$, not the given denominator. Cancelling the shared $2x + 9$ then leaves $x + 7$ on the bottom instead of $x - 7$.\n* Choice C ($\\frac{2x + 9}{x - 7}$): factors correctly but cancels $2x - 9$ instead of $2x + 9$. Only the factor that appears in both the numerator and the denominator can be divided out, and $2x - 9$ appears only on top.\n* Choice D ($\\frac{2x + 9}{x + 7}$): factors the denominator as $(2x - 9)(x + 7)$, which expands to $2x^2 + 5x - 63$, and cancels that factor instead. A quick check at $x = 9$ gives $\\frac{27}{16}$, far from the true value $4.5$.\n\n**Test Day Takeaway:** Factor top and bottom completely before cancelling, and confirm a candidate factorization by expanding it; a single sign slip changes which factor survives.",
  skills: ["simplifying-rational-expressions", "difference-of-squares"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The triangular support shown holds a photovoltaic module. Its right angle is at $Q$, its perimeter measures $80$ centimeters, and $\\tan P = \\frac{8}{15}$. How long, in centimeters, is $\\overline{QR}$?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 8]], labels: ["P", "Q", "R"], sideLabels: ["", "", ""], rightAngleVertex: 1 } },
  choices: [
    // distractor: reads 8 straight off the ratio, using the 8-15-17 triangle without scaling it to a perimeter of 80
    { id: "A", text: "$8$" },
    { id: "B", text: "$16$" },
    // distractor: reports PQ, the leg adjacent to angle P, which is 30 centimeters
    { id: "C", text: "$30$" },
    // distractor: reports PR, the hypotenuse, which is 34 centimeters
    { id: "D", text: "$34$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $\\tan P = \\frac{8}{15}$ makes the sides $8k$, $15k$, $17k$, so the perimeter is $40k = 80$ and $k = 2$. Then $QR = 8(2) = 16$ centimeters.\n\n**The Full Solution:**\nStep 1: With the right angle at $Q$, the tangent of $P$ is the leg opposite $P$ over the leg adjacent to $P$, so $\\frac{QR}{PQ} = \\frac{8}{15}$. Write $QR = 8k$ and $PQ = 15k$.\nStep 2: The hypotenuse follows from the Pythagorean theorem: $PR = \\sqrt{(8k)^2 + (15k)^2} = \\sqrt{289k^2} = 17k$, the familiar $8$-$15$-$17$ triple.\nStep 3: The perimeter gives $8k + 15k + 17k = 40k = 80$, so $k = 2$ and $QR = 16$ centimeters. Check: $16 + 30 + 34 = 80$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): treats the tangent ratio as the actual side lengths. The ratio only fixes the shape; the perimeter fixes the size, and here every side doubles.\n* Choice C ($30$): the length of $\\overline{PQ}$, the leg adjacent to $P$. Tangent puts the opposite leg on top, so $\\overline{QR}$ is the $8k$ side.\n* Choice D ($34$): the hypotenuse $\\overline{PR}$. It is the longest side and never sits opposite an acute angle.\n\n**Test Day Takeaway:** Turn a trig ratio into side expressions with a single scale factor $k$, then let the perimeter solve for $k$; the triangle's shape and its size are two separate pieces of information.",
  skills: ["soh-cah-toa"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The linear model that best fits a collection of paired measurements passes through $(4, 23)$ and $(16, 59)$. The measurement $(10, k)$ sits as far above that model as the measurement $(22, 68)$ sits below it. What is the value of $k$?",
  choices: [
    // distractor: subtracts the 9-unit gap from the prediction at x = 10, placing the measurement below the model instead of above it: 41 - 9 = 32
    { id: "A", text: "$32$" },
    // distractor: reports the model's predicted value at x = 10, 41, never applying the 9-unit gap
    { id: "B", text: "$41$" },
    { id: "C", text: "$50$" },
    // distractor: reads 'as far above ... as ... below' as meaning the two measurements share a value, copying 68
    { id: "D", text: "$68$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Scatterplot Line of Best Fit**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The model is $\\hat{y} = 3x + 11$, so $(22, 68)$ sits $77 - 68 = 9$ below it. At $x = 10$ the model gives $41$, so the measurement $9$ above it has $k = 50$.\n\n**The Full Solution:**\nStep 1: Build the model. Its slope is $\\frac{59 - 23}{16 - 4} = 3$, and $23 = 3(4) + b$ gives $b = 11$, so $\\hat{y} = 3x + 11$.\nStep 2: Measure the known gap. At $x = 22$ the model predicts $3(22) + 11 = 77$, and the measurement's value is $68$, so that measurement sits $77 - 68 = 9$ below the model.\nStep 3: Apply the same gap in the other direction. At $x = 10$ the model predicts $3(10) + 11 = 41$, and $(10, k)$ sits $9$ above it, so $k = 41 + 9 = 50$. Check: $50 - 41 = 9$ and $77 - 68 = 9$, equal gaps on opposite sides of the model ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): computes $41 - 9$, placing $(10, k)$ below the model. The question puts $(10, k)$ above the model and $(22, 68)$ below it, so the two gaps carry opposite signs.\n* Choice B ($41$): reports the model's prediction at $x = 10$ and stops. That is where the measurement would sit if its gap were zero.\n* Choice D ($68$): copies the other measurement's value, reading \"as far above the model as the other sits below it\" as \"equal to it.\" The two measurements match in distance from the model, not in value.\n\n**Test Day Takeaway:** A measurement's gap from a model is the predicted value minus the observed value, so compute the gap you are given first, then add or subtract it in the direction the question names.",
  skills: ["scatterplots", "linear-functions"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A pricing tool computes a per-unit discount of $\\frac{p^2 - 64}{p - 8}$ dollars for a supplier's list price of $p$ dollars. For how many list prices does the tool compute a discount of $\\$16$?",
  choices: [
    { id: "A", text: "Zero" },
    // distractor: simplifies to p + 8 = 16 and accepts p = 8 without checking that p = 8 makes the denominator zero
    { id: "B", text: "Exactly one" },
    // distractor: clears the denominator to p^2 - 16p + 64 = 0 and assumes a quadratic must have two solutions, missing the repeated root at the excluded value
    { id: "C", text: "Exactly two" },
    // distractor: reads the numerator's factorization as an identity and concludes the tool returns 16 for every list price
    { id: "D", text: "Infinitely many" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** For $p \\ne 8$ the expression simplifies to $p + 8$, so a discount of $16$ requires $p + 8 = 16$, or $p = 8$ — the one price the expression forbids. No list price works.\n\n**The Full Solution:**\nStep 1: Note the restriction first: the denominator $p - 8$ cannot be zero, so $p = 8$ is not allowed.\nStep 2: Factor the numerator as a difference of squares: $p^2 - 64 = (p - 8)(p + 8)$. Cancelling $p - 8$ is legal for every allowed $p$, so $\\frac{p^2 - 64}{p - 8} = 16$ reduces to $p + 8 = 16$, giving $p = 8$.\nStep 3: The only candidate is excluded by Step 1, so no list price produces a $\\$16$ discount. Check by clearing the denominator directly: $p^2 - 64 = 16p - 128$ gives $p^2 - 16p + 64 = (p - 8)^2 = 0$, whose only root is the excluded $p = 8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (Exactly one): cancels correctly, solves $p + 8 = 16$, and reports $p = 8$. A value that makes an original denominator zero is never a solution, no matter how clean the algebra looks.\n* Choice C (Exactly two): assumes the quadratic $p^2 - 16p + 64 = 0$ must have two roots. It is a perfect square with a single repeated root, and that root is excluded.\n* Choice D (Infinitely many): treats $\\frac{p^2 - 64}{p - 8} = p + 8$ as though it made the whole equation an identity. That identity only rewrites the left side; the right side is still the fixed number $16$.\n\n**Test Day Takeaway:** Write the excluded values before solving a rational equation; when the only candidate solution is an excluded value, the answer is no solution.",
  skills: ["rational-expressions"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "One number is $150$ percent of $m$ and, at the same time, $60$ percent of $n$, where $m$ and $n$ are positive numbers. The value of $m$ is what percent of the value of $n$?",
  choices: [
    { id: "A", text: "$40\\%$" },
    // distractor: reads the second condition as saying m itself is 60 percent of n, reporting 60 without using the 150 percent relationship
    { id: "B", text: "$60\\%$" },
    // distractor: multiplies the two given factors, 1.5 and 0.6, to get 0.9 and reports 90 percent
    { id: "C", text: "$90\\%$" },
    // distractor: answers the reversed question, computing n as a percent of m: 1.5/0.6 = 2.5, or 250 percent
    { id: "D", text: "$250\\%$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Reverse-Percent**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Setting the two descriptions of the same number equal gives $1.5m = 0.6n$, so $m = 0.4n$, which is $40\\%$ of $n$.\n\n**The Full Solution:**\nStep 1: Call the number $N$. \"$150$ percent of $m$\" means $N = 1.5m$, and \"$60$ percent of $n$\" means $N = 0.6n$.\nStep 2: Because both expressions equal the same $N$, set them equal: $1.5m = 0.6n$.\nStep 3: Solve for $m$: $m = \\frac{0.6}{1.5}n = 0.4n$, so $m$ is $40\\%$ of $n$. Check with $n = 100$: then $N = 60$ and $m = \\frac{60}{1.5} = 40$, which is $40\\%$ of $100$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($60\\%$): assigns the $60$ percent directly to $m$. The $60$ percent describes the unnamed number $N$, not $m$, and $N$ is larger than $m$ because $N$ is $150\\%$ of $m$.\n* Choice C ($90\\%$): multiplies $1.5$ by $0.6$. The two percents describe the same number from two directions, so one must be divided by the other, not multiplied.\n* Choice D ($250\\%$): computes $\\frac{1.5}{0.6} = 2.5$, which tells what percent of $m$ the value $n$ is. The question asks the comparison in the other order.\n\n**Test Day Takeaway:** When two percent statements describe the same quantity, write both as equations for that quantity and set them equal; the ratio you form last must match the order the question names.",
  skills: ["percent-word-problems", "percent-of-value"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 6,
  question: "A rectangular carton face has an area of $1{,}350$ square centimeters, and its longer side is $1.5$ times its shorter side. A triangular label on that face has its base along the longer side and a height equal to two-fifths of the shorter side. What is the area, in square centimeters, of the part of the face the label does not cover?",
  choices: [
    // distractor: omits the one-half in the triangle's area, subtracting 45(12) = 540 from 1350
    { id: "A", text: "$810$" },
    // distractor: uses two-fifths of the longer side, 18, as the height, subtracting (1/2)(45)(18) = 405 from 1350
    { id: "B", text: "$945$" },
    { id: "C", text: "$1{,}080$" },
    // distractor: puts the base along the shorter side, subtracting (1/2)(30)(12) = 180 from 1350
    { id: "D", text: "$1{,}170$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The sides are $30$ and $45$ since $1.5s^2 = 1350$. The label's area is $\\frac{1}{2}(45)\\left(\\frac{2}{5} \\cdot 30\\right) = \\frac{1}{2}(45)(12) = 270$, so $1350 - 270 = 1080$ square centimeters remain.\n\n**The Full Solution:**\nStep 1: Let $s$ be the shorter side, so the longer side is $1.5s$ and the area is $1.5s^2 = 1350$. Then $s^2 = 900$ and $s = 30$ centimeters, making the longer side $45$ centimeters.\nStep 2: The label's base is the longer side, $45$ centimeters, and its height is $\\frac{2}{5}(30) = 12$ centimeters, so its area is $\\frac{1}{2}(45)(12) = 270$ square centimeters.\nStep 3: Subtract: $1350 - 270 = 1080$ square centimeters are not covered. Check: $270$ is exactly one-fifth of $1350$, and $\\frac{4}{5}(1350) = 1080$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($810$): computes the label's area as $45(12) = 540$, treating it as a rectangle. A triangle on the same base and height covers half that.\n* Choice B ($945$): takes two-fifths of $45$ instead of two-fifths of $30$, giving a height of $18$ and a label area of $405$. The height is measured against the shorter side.\n* Choice D ($1{,}170$): places the base on the shorter side, giving $\\frac{1}{2}(30)(12) = 180$. The problem fixes the base along the longer side.\n\n**Test Day Takeaway:** Solve for the rectangle's actual side lengths before touching the inscribed figure; then read the problem's own words for which side is the base and which length is the height.",
  skills: ["triangle-area"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Last month a library branch checked out items in four categories, and the counts appear in the table. What percent of last month's checkouts were graphic novels?",
  questionTable: { headers: ["Category", "Items checked out"], rows: [["Fiction", "$480$"], ["Nonfiction", "$360$"], ["Audiobooks", "$216$"], ["Graphic novels", "$144$"]] },
  choices: [
    { id: "A", text: "$12\\%$" },
    // distractor: reads the audiobooks row instead, computing 216/1200 = 18 percent
    { id: "B", text: "$18\\%$" },
    // distractor: divides the graphic-novel count by the fiction count, 144/480 = 30 percent, instead of by the month's total
    { id: "C", text: "$30\\%$" },
    // distractor: reports the percent of checkouts that were not graphic novels, (1200 - 144)/1200 = 88 percent
    { id: "D", text: "$88\\%$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The four categories total $1{,}200$ items, and $\\frac{144}{1200} = 0.12$, or $12\\%$.\n\n**The Full Solution:**\nStep 1: The table lists no total, so build one: $480 + 360 + 216 + 144 = 1{,}200$ items checked out.\nStep 2: Form the part-over-whole ratio with the graphic-novel count on top: $\\frac{144}{1200}$.\nStep 3: Convert to a percent: $\\frac{144}{1200} = 0.12 = 12\\%$. Check: $12\\%$ of $1{,}200$ is $144$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($18\\%$): uses the audiobooks count, $\\frac{216}{1200} = 18\\%$. The two smaller categories sit next to each other in the table, so the row has to be read carefully.\n* Choice C ($30\\%$): divides by the fiction count, $\\frac{144}{480} = 30\\%$. The whole is every item checked out, not the largest single category.\n* Choice D ($88\\%$): reports the complement, $\\frac{1056}{1200} = 88\\%$, the percent of checkouts that were something other than graphic novels.\n\n**Test Day Takeaway:** When a table gives categories but no total, the first move is always to add the categories — the denominator of a percent-of-a-whole question is that sum.",
  skills: ["percent-of-value"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "At a substation, Panel A has $3t$ switches with $4$ positions each, giving $4^{3t}$ possible settings, and Panel B has $t + 10$ switches with $8$ positions each, giving $8^{t+10}$ possible settings. For what value of $t$ do the two panels have the same number of possible settings?",
  choices: [
    // distractor: sets 3t = t + 10 without converting to a common base, giving t = 5
    { id: "A", text: "$5$" },
    { id: "B", text: "$10$" },
    // distractor: rewrites 8 as 2 to the fourth power, solving 6t = 4t + 40 to get t = 20
    { id: "C", text: "$20$" },
    // distractor: stops at 3t = 30 and reports 30, the number of switches on Panel A, instead of t
    { id: "D", text: "$30$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** In base $2$ the two counts are $2^{6t}$ and $2^{3t+30}$, so $6t = 3t + 30$ and $t = 10$.\n\n**The Full Solution:**\nStep 1: Write both bases as powers of $2$: $4^{3t} = (2^2)^{3t} = 2^{6t}$ and $8^{t+10} = (2^3)^{t+10} = 2^{3t+30}$.\nStep 2: Equal powers of the same base have equal exponents, so $6t = 3t + 30$.\nStep 3: Solve: $3t = 30$, so $t = 10$. Check: Panel A then has $30$ switches and $4^{30} = 2^{60}$ settings, while Panel B has $20$ switches and $8^{20} = 2^{60}$ settings ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): equates the exponents while the bases are still $4$ and $8$, solving $3t = t + 10$. Exponents may be equated only after both sides share a base.\n* Choice C ($20$): converts $8$ to $2^4$ rather than $2^3$, producing $6t = 4t + 40$. Only $16$ is $2^4$.\n* Choice D ($30$): solves the equation down to $3t = 30$ and reports the $30$, which counts Panel A's switches rather than the value of $t$.\n\n**Test Day Takeaway:** Rewrite both sides over the smallest shared base before comparing exponents, then finish the one-variable equation — the number that appears just before the last division is a favorite wrong answer.",
  skills: ["exponential-functions"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The function $f$ is defined by $f(x) = 3x + 6$. For a particular value $a$, increasing the input from $a$ to $a + 4$ makes the output $\\frac{7}{3}$ times as large as the output at $a$. What is the value of $a$?",
  choices: [
    // distractor: inverts the ratio, solving 7(3a + 18) = 3(3a + 6) to get a = -9
    { id: "A", text: "$-9$" },
    // distractor: treats f(a + 4) as f(a) + 4, solving 3(3a + 10) = 7(3a + 6) to get a = -1
    { id: "B", text: "$-1$" },
    { id: "C", text: "$1$" },
    // distractor: solves correctly for a but reports the shifted input a + 4 = 5
    { id: "D", text: "$5$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Shifted Output**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** $f(a + 4) = 3a + 18$ and $f(a) = 3a + 6$, so $3(3a + 18) = 7(3a + 6)$ gives $9a + 54 = 21a + 42$ and $a = 1$.\n\n**The Full Solution:**\nStep 1: Evaluate the shifted output by substituting $a + 4$ for $x$: $f(a + 4) = 3(a + 4) + 6 = 3a + 18$. The $3$ multiplies the whole input, so the shift of $4$ raises the output by $12$, not by $4$.\nStep 2: Translate the ratio $\\frac{f(a+4)}{f(a)} = \\frac{7}{3}$ into $3(3a + 18) = 7(3a + 6)$ by cross-multiplying.\nStep 3: Expand and solve: $9a + 54 = 21a + 42$, so $12 = 12a$ and $a = 1$. Check: $f(5) = 21$ and $f(1) = 9$, and $\\frac{21}{9} = \\frac{7}{3}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-9$): cross-multiplies in the wrong direction, pairing the $7$ with the smaller output. That gives $7(3a + 18) = 3(3a + 6)$ and $a = -9$, where $f(-9) = -21$ and $f(-5) = -9$ — a ratio of $\\frac{7}{3}$ only if the two outputs trade places.\n* Choice B ($-1$): computes $f(a + 4)$ as $f(a) + 4 = 3a + 10$, adding the shift to the output instead of to the input. Solving $3(3a + 10) = 7(3a + 6)$ gives $a = -1$.\n* Choice D ($5$): finds $a = 1$ correctly and then reports $a + 4$, the shifted input, rather than $a$ itself.\n\n**Test Day Takeaway:** Substitute a shifted input into the rule before doing anything else — for a linear function the output changes by the slope times the shift, never by the shift itself.",
  skills: ["solving-equations", "ratios"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A science museum runs two workshop series, each scheduled over $n$ weeks. Series A holds $3n - 7$ sessions and admits $4$ visitors to each session, and Series B admits $11n + 6$ visitors in all. The two series admit the same total number of visitors. How many sessions does Series A hold?",
  choices: [
    // distractor: distributes 4 over -7 as +28, solving 12n + 28 = 11n + 6 to get n = -22 and 3n - 7 = -73
    { id: "A", text: "$-73$" },
    // distractor: multiplies only the 3n by 4, solving 12n - 7 = 11n + 6 to get n = 13 and 3n - 7 = 32
    { id: "B", text: "$32$" },
    // distractor: solves correctly for n = 34 but reports n, the number of weeks, instead of the number of sessions, 3n - 7
    { id: "C", text: "$34$" },
    { id: "D", text: "$95$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Equal totals give $4(3n - 7) = 11n + 6$, so $12n - 28 = 11n + 6$ and $n = 34$. The number of sessions is $3(34) - 7 = 95$.\n\n**The Full Solution:**\nStep 1: Series A admits $4$ visitors in each of its $3n - 7$ sessions, or $4(3n - 7)$ visitors in all. Setting that equal to Series B's total gives $4(3n - 7) = 11n + 6$.\nStep 2: Distribute and collect like terms: $12n - 28 = 11n + 6$, so $12n - 11n = 6 + 28$ and $n = 34$.\nStep 3: The question asks for sessions, not $n$: $3(34) - 7 = 95$ sessions. Check: $4(95) = 380$ visitors, and $11(34) + 6 = 380$ visitors ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-73$): distributes the $4$ as $12n + 28$, flipping the sign of the constant. That yields $n = -22$ and $3n - 7 = -73$, a negative count of sessions — a signal to recheck the distribution.\n* Choice B ($32$): multiplies only the first term inside the parentheses, leaving $12n - 7 = 11n + 6$ and $n = 13$. The factor outside must reach every term inside.\n* Choice C ($34$): the correct value of $n$, the number of weeks each series runs. The sessions are $3n - 7$, not $n$.\n\n**Test Day Takeaway:** Distribute across every term, combine like terms once, and then reread the question — when the variable appears inside a larger expression, that expression is usually what is being asked for.",
  skills: ["combining-like-terms"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A rainwater tank at a community center holds $1{,}450$ liters. Each day the center draws $38$ liters from the tank, and daily collection adds $12$ liters to it. What is the least number of whole days after which the tank holds fewer than $900$ liters?",
  choices: [
    { id: "A", text: "$22$" },
    // distractor: solves 26d > 900, treating 900 as the volume that must be removed rather than the volume remaining, giving 34.6 and rounding up to 35
    { id: "B", text: "$35$" },
    // distractor: divides the full 1450 by the 38-liter draw, ignoring the daily collection and the 900-liter level, giving 38.2 and rounding up to 39
    { id: "C", text: "$39$" },
    // distractor: finds the day the tank would empty, 1450/26 = 55.8, rounding up to 56
    { id: "D", text: "$56$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The tank loses $38 - 12 = 26$ liters a day, so $1450 - 26d < 900$ gives $26d > 550$ and $d > 21.15$. The least whole number of days is $22$.\n\n**The Full Solution:**\nStep 1: Combine the two daily changes into one net rate: the tank falls by $38 - 12 = 26$ liters each day, so after $d$ days it holds $1450 - 26d$ liters.\nStep 2: Set up the inequality the question describes: $1450 - 26d < 900$, which rearranges to $550 < 26d$, so $d > \\frac{550}{26} \\approx 21.15$.\nStep 3: The least whole number greater than $21.15$ is $22$. Check: after $21$ days the tank holds $1450 - 546 = 904$ liters, still above $900$; after $22$ days it holds $1450 - 572 = 878$ liters ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($35$): solves $26d > 900$, as if $900$ liters had to be drained. The $900$ is the level that must remain, so the amount removed is $1450 - 900 = 550$ liters.\n* Choice C ($39$): divides $1450$ by $38$, using only the draw and ignoring both the $12$ liters added each day and the $900$-liter threshold.\n* Choice D ($56$): finds when the tank would run dry at $26$ liters a day. The question asks when the level first drops below $900$, not when it reaches $0$.\n\n**Test Day Takeaway:** Net out opposing daily rates into a single coefficient before writing the inequality, then remember that \"fewer than\" a remaining amount converts to an amount removed.",
  skills: ["inequalities"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A library endowment compounds interest quarterly, and the table gives the account's balance at the end of each of its first four quarters. If $B$ is the balance in dollars after $t$ years, which equation is true for every whole number $t$?",
  questionTable: { headers: ["Quarter", "Balance (dollars)"], rows: [["$1$", "$8{,}120.00$"], ["$2$", "$8{,}241.80$"], ["$3$", "$8{,}365.43$"], ["$4$", "$8{,}490.91$"]] },
  choices: [
    // distractor: uses the quarterly factor 1.015 but counts one compounding period per year instead of four
    { id: "A", text: "$B = 8000(1.015)^{t}$" },
    // distractor: compounds the 6 percent annual rate once a year, which is not what the quarterly balances in the table show
    { id: "B", text: "$B = 8000(1.06)^{t}$" },
    // distractor: applies the annual factor 1.06 once in each of the 4t quarters, compounding 6 percent four times a year
    { id: "C", text: "$B = 8000(1.06)^{4t}$" },
    { id: "D", text: "$B = 8000(1.015)^{4t}$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Compound Interest**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** Each quarter multiplies the balance by $\\frac{8241.80}{8120} = 1.015$, and the opening balance was $\\frac{8120}{1.015} = 8000$. In $t$ years there are $4t$ quarters, so $B = 8000(1.015)^{4t}$.\n\n**The Full Solution:**\nStep 1: Find the quarterly growth factor from consecutive table rows: $\\frac{8241.80}{8120} = 1.015$, and $\\frac{8365.43}{8241.80} = 1.015$ as well, so the balance is multiplied by $1.015$ each quarter.\nStep 2: Work backwards to the opening balance: $\\frac{8120}{1.015} = 8000$ dollars, the principal before any interest was credited.\nStep 3: Count the periods. Quarterly compounding gives $4$ periods per year, so after $t$ years the balance is $B = 8000(1.015)^{4t}$. Check at $t = 1$: $8000(1.015)^4 = 8490.91$, matching the fourth quarter in the table ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($B = 8000(1.015)^{t}$): pairs the quarterly factor with a count of years, applying the growth once a year. At $t = 1$ it gives $8{,}120$, the balance after one quarter, not one year.\n* Choice B ($B = 8000(1.06)^{t}$): compounds the $6\\%$ annual rate a single time per year, giving $8{,}480$ after one year — close to the table's $8{,}490.91$ but not equal, because quarterly compounding earns slightly more.\n* Choice C ($B = 8000(1.06)^{4t}$): applies the full annual factor in every quarter, which would give $8000(1.06)^4 \\approx 10{,}099$ after one year, far above the table.\n\n**Test Day Takeaway:** Read the growth factor straight from the ratio of consecutive table entries, then match the exponent to the number of those periods in the time unit the question uses.",
  skills: ["exponential-functions"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The annual output of a solar array, in megawatt-hours, is predicted by $E(m) = 540(1.25)^{\\frac{m}{4}}$, where $m$ is the number of months since the array was expanded and $540$ is the output at the time of the expansion. Which statement about the predicted output is true?",
  choices: [
    { id: "A", text: "The output increases by $25\\%$ every $4$ months." },
    // distractor: ignores the division by 4 in the exponent and attaches the 25 percent increase to a single month
    { id: "B", text: "The output increases by $25\\%$ each month." },
    // distractor: reads the 4 in the exponent as a number of years rather than the number of months in one growth period
    { id: "C", text: "The output increases by $25\\%$ each year." },
    // distractor: reads the factor 1.25 itself as the percent increase instead of subtracting 1 to get 25 percent
    { id: "D", text: "The output increases by $125\\%$ every $4$ months." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The exponent $\\frac{m}{4}$ increases by $1$ each time $m$ increases by $4$, and each such step multiplies the output by $1.25$ — a $25\\%$ increase every $4$ months.\n\n**The Full Solution:**\nStep 1: In $a(b)^{x}$ the output is multiplied by $b$ each time $x$ increases by $1$. Here the exponent is $\\frac{m}{4}$, not $m$.\nStep 2: The exponent rises by $1$ when $m$ rises by $4$, so one full growth period is $4$ months long.\nStep 3: Over that period the output is multiplied by $1.25$, which is an increase of $1.25 - 1 = 0.25$, or $25\\%$. Check: $E(0) = 540$ and $E(4) = 540(1.25) = 675$, and $\\frac{675 - 540}{540} = 0.25$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: attaches the $25\\%$ to one month. The monthly factor is $1.25^{1/4} \\approx 1.057$, about a $5.7\\%$ monthly increase, so $E(1) \\approx 571$, not $675$.\n* Choice C: reads the $4$ as years. The problem states $m$ counts months, so the $4$ in the denominator counts months as well.\n* Choice D: reports the growth factor $1.25$ as a percent increase. A factor of $1.25$ means the new value is $125\\%$ of the old one, which is a $25\\%$ increase, not a $125\\%$ increase.\n\n**Test Day Takeaway:** A divisor inside the exponent stretches the growth period — read $b^{m/k}$ as \"multiplied by $b$ every $k$ units\" — and always subtract $1$ from the factor before calling it a percent increase.",
  skills: ["exponential-growth-decay"]
}
      ]
    }
  ]
};

export default practiceTest2;
