// Practice Test 1 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-08-31): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the
// round-7 blueprint: M1 5E/9M/8H, domains 7/6/5/4. M2 3E/8M/11H.
// Figure density lifted to official ~20%: M1 carries 4 diagram items,
// M2 carries 6. Numeric MC choices sorted ascending (official convention).

export const practiceTest1 = {
  id: "practice-test-1",
  title: "Practice Test 1 — Math",
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
  question: "A materials laboratory analyzed a $400$-gram sample of a bronze alloy. The table gives the percent of the sample's total mass contributed by each of three metals in the sample, and the remainder of the mass is zinc. What is the mass, in grams, of the zinc in this sample?",
  questionTable: { headers: ["Metal", "Percent of sample mass"], rows: [["Copper", "62%"], ["Tin", "3%"], ["Lead", "5%"]] },
  choices: [
    // distractor: reports the leftover percent (30) as a number of grams instead of taking 30% of 400
    { id: "A", text: "$30$" },
    { id: "B", text: "$120$" },
    // distractor: omits lead from the sum of listed percents, using 100-62-3=35 and computing 0.35(400)=140
    { id: "C", text: "$140$" },
    // distractor: finds the combined mass of the three listed metals, 0.70(400)=280, instead of the remainder
    { id: "D", text: "$280$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Percent Complement**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The three listed metals account for $62 + 3 + 5 = 70$ percent of the mass, so zinc is the complement, $30\\%$. Then $0.30(400) = 120$ grams.\n\n**The Full Solution:**\nStep 1: Add the listed percents: copper, tin, and lead together make up $62\\% + 3\\% + 5\\% = 70\\%$ of the sample's mass.\nStep 2: Everything that is not one of those three metals is zinc, so zinc makes up $100\\% - 70\\% = 30\\%$ of the mass.\nStep 3: Take $30\\%$ of the $400$-gram sample: $0.30(400) = 120$ grams. Check: $120 + 0.70(400) = 120 + 280 = 400$ grams, the whole sample ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($30$): reports the leftover percent, $30$, as though it were a mass. The percent still has to be applied to the $400$-gram total, and $30\\%$ of $400$ is $120$, not $30$.\n* Choice C ($140$): leaves lead out of the sum, using $100\\% - 62\\% - 3\\% = 35\\%$ and computing $0.35(400) = 140$ grams.\n* Choice D ($280$): finds the combined mass of the three metals the table lists, $0.70(400) = 280$ grams, which is the part the question does not ask for.\n\n**Test Day Takeaway:** When a table lists parts of a whole and one part is described only as the remainder, subtract the listed percents from $100\\%$ first, then apply that percent to the total.",
  skills: ["percent-of-value"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The quantity $q$ is a measurement given in kilowatt-hours. One kilowatt-hour is equal to $3.6$ megajoules, and one megajoule is equal to $1{,}000$ kilojoules. Which of the following expressions gives the value of this measurement in kilojoules?",
  choices: [
    // distractor: stops after the first conversion and reports megajoules (3.6q) rather than kilojoules
    { id: "A", text: "$3.6q$" },
    // distractor: uses 100 kilojoules per megajoule instead of 1,000, giving 3.6(100)=360
    { id: "B", text: "$360q$" },
    { id: "C", text: "$3{,}600q$" },
    // distractor: applies the factor 1,000 twice, as if kilowatt-hours converted to megajoules by multiplying by 1,000
    { id: "D", text: "$3{,}600{,}000q$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Chain the two factors: one kilowatt-hour is $3.6$ megajoules, which is $3.6(1{,}000) = 3{,}600$ kilojoules, so $q$ kilowatt-hours is $3{,}600q$ kilojoules.\n\n**The Full Solution:**\nStep 1: Convert kilowatt-hours to megajoules. One kilowatt-hour is $3.6$ megajoules, so $q$ kilowatt-hours is $3.6q$ megajoules.\nStep 2: Convert megajoules to kilojoules. One megajoule is $1{,}000$ kilojoules, so $3.6q$ megajoules is $(3.6q)(1{,}000)$ kilojoules.\nStep 3: Multiply the two factors: $3.6(1{,}000) = 3{,}600$, so the measurement is $3{,}600q$ kilojoules. Check with $q = 2$: two kilowatt-hours is $7.2$ megajoules, or $7{,}200$ kilojoules, and $3{,}600(2) = 7{,}200$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.6q$): stops after the first conversion. This is the measurement in megajoules, not in kilojoules.\n* Choice B ($360q$): uses $100$ kilojoules per megajoule instead of $1{,}000$, giving $3.6(100) = 360$.\n* Choice D ($3{,}600{,}000q$): multiplies by $1{,}000$ twice, treating the kilowatt-hour to megajoule step as a factor of $1{,}000$ as well: $3.6(1{,}000)(1{,}000)$.\n\n**Test Day Takeaway:** Convert one unit at a time and write each conversion as a fraction whose unwanted unit cancels; the answer is the product of the factors, so a stray power of $10$ cannot slip in unnoticed.",
  skills: ["unit-conversion"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A household budget allots a total of $540$ dollars each month to two categories, groceries and transportation. The amount allotted to groceries is $120$ dollars more than twice the amount allotted to transportation. How many dollars does the budget allot to transportation?",
  choices: [
    { id: "A", text: "$140$" },
    // distractor: divides the total by 3 without removing the extra 120, computing 540/3 = 180
    { id: "B", text: "$180$" },
    // distractor: reads '120 more than twice' as '120 less than twice', solving 3t - 120 = 540 to get 220
    { id: "C", text: "$220$" },
    // distractor: solves the system correctly but reports the grocery amount, 400, instead of the transportation amount
    { id: "D", text: "$400$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** With $t$ for transportation, the two categories give $(2t + 120) + t = 540$, so $3t = 420$ and $t = 140$.\n\n**The Full Solution:**\nStep 1: Let $g$ be the grocery amount and $t$ the transportation amount. The total gives $g + t = 540$, and \"$120$ more than twice\" gives $g = 2t + 120$.\nStep 2: Substitute the second equation into the first: $(2t + 120) + t = 540$, which simplifies to $3t + 120 = 540$.\nStep 3: Subtract $120$ and divide by $3$: $3t = 420$, so $t = 140$. Check: groceries would be $2(140) + 120 = 400$, and $400 + 140 = 540$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($180$): divides the total by $3$ and stops, computing $540 \\div 3 = 180$. That would be right only if groceries were exactly twice transportation, with no extra $120$.\n* Choice C ($220$): reverses the comparison, treating groceries as $120$ less than twice transportation. That gives $3t - 120 = 540$ and $t = 220$.\n* Choice D ($400$): solves the system correctly but reports the grocery amount. The question asks for transportation.\n\n**Test Day Takeaway:** Name both unknowns, write one equation per sentence, and substitute; the constant in \"more than twice\" belongs in the equation, not in the final division.",
  skills: ["word-problem-to-equation", "setting-up-systems"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Triangle $PQR$ has vertices $P(1, 2)$, $Q(1, 9)$, and $R(25, 2)$ in the $xy$-plane. Because $P$ and $Q$ have the same $x$-coordinate and $P$ and $R$ have the same $y$-coordinate, the angle at $P$ is a right angle. What is the length of $\\overline{QR}$?",
  choices: [
    // distractor: gives the vertical leg PQ, 9 - 2 = 7, instead of the segment joining Q and R
    { id: "A", text: "$7$" },
    // distractor: subtracts the two leg lengths, 24 - 7 = 17, instead of using the Pythagorean relationship
    { id: "B", text: "$17$" },
    // distractor: gives the horizontal leg PR, 25 - 1 = 24, instead of the segment joining Q and R
    { id: "C", text: "$24$" },
    { id: "D", text: "$25$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Distance Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The legs measure $9 - 2 = 7$ and $25 - 1 = 24$, a $7$-$24$-$25$ right triangle, so $QR = 25$.\n\n**The Full Solution:**\nStep 1: Find the vertical change from $Q(1, 9)$ to $R(25, 2)$: $9 - 2 = 7$.\nStep 2: Find the horizontal change: $25 - 1 = 24$.\nStep 3: Apply the distance formula: $\\sqrt{24^{2} + 7^{2}} = \\sqrt{576 + 49} = \\sqrt{625} = 25$. Check: $7^{2} + 24^{2} = 625 = 25^{2}$, so the three lengths do satisfy the Pythagorean theorem ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): reports the vertical leg $PQ$. That is one side of the right angle, not the side opposite it.\n* Choice B ($17$): subtracts the changes, $24 - 7 = 17$. A distance is never the difference of the horizontal and vertical changes.\n* Choice C ($24$): reports the horizontal leg $PR$, the longer leg, instead of the hypotenuse.\n\n**Test Day Takeaway:** The distance between two points is the hypotenuse of the right triangle built from the horizontal and vertical changes, so it must exceed both of them — an instant check against answering with a leg.",
  skills: ["coordinate-geometry"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The inequality $7x - 12 > 3x + 41$ is true for infinitely many values of $x$, and $x$ represents an integer. What is the smallest possible value of $x$ for which the inequality is true?",
  choices: [
    // distractor: moves -12 to the right side without changing its sign, solving 4x > 41-12 = 29 and rounding 7.25 up to 8
    { id: "A", text: "$8$" },
    // distractor: rounds 13.25 down to 13, which does not satisfy the strict inequality
    { id: "B", text: "$13$" },
    { id: "C", text: "$14$" },
    // distractor: rounds 13.25 up to 14 and then adds one more, as if 14 itself failed
    { id: "D", text: "$15$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Smallest Integer in an Inequality**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Collecting terms gives $4x > 53$, so $x > 13.25$, and the smallest integer greater than $13.25$ is $14$.\n\n**The Full Solution:**\nStep 1: Subtract $3x$ from both sides: $4x - 12 > 41$.\nStep 2: Add $12$ to both sides: $4x > 53$, so $x > \\frac{53}{4} = 13.25$.\nStep 3: The inequality is strict, so $x$ must be greater than $13.25$; the least integer that qualifies is $14$. Check: $7(14) - 12 = 86$ and $3(14) + 41 = 83$, and $86 > 83$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): moves the $-12$ to the right side without changing its sign, solving $4x > 41 - 12 = 29$, then rounds $7.25$ up to $8$.\n* Choice B ($13$): rounds $13.25$ down. Testing it fails: $7(13) - 12 = 79$ is not greater than $3(13) + 41 = 80$.\n* Choice D ($15$): rounds $13.25$ up to $14$ and then steps up once more, as if the strict inequality ruled out $14$ as well.\n\n**Test Day Takeaway:** Solve first, then round in the direction the inequality points; with a strict $>$, round a non-integer boundary up, and always test the integer you choose in the original inequality.",
  skills: ["inequalities"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 4,
  question: "The bar graph shows the number of hours of sunshine recorded at a climate station during each of five consecutive months. June and July together account for what percent of the total number of sunshine hours recorded during these five months?",
  diagram: { type: "barChart", params: { data: [{ label: "Mar", value: 150 }, { label: "Apr", value: 200 }, { label: "May", value: 300 }, { label: "Jun", value: 250 }, { label: "Jul", value: 350 }], xAxisLabel: "Month", yAxisLabel: "Hours of sunshine", yMax: 400, yStep: 50 } },
  choices: [
    // distractor: uses the June bar alone, 250/1250 = 20%
    { id: "A", text: "$20\\%$" },
    // distractor: uses the July bar alone, 350/1250 = 28%
    { id: "B", text: "$28\\%$" },
    { id: "C", text: "$48\\%$" },
    // distractor: gives the percent contributed by the other three months, the complement of 48%
    { id: "D", text: "$52\\%$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Percent of a Whole**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The five bars total $1{,}250$ hours, and June plus July is $250 + 350 = 600$ hours, so the share is $\\frac{600}{1{,}250} = 48\\%$.\n\n**The Full Solution:**\nStep 1: Read the five bar heights against the gridlines: $150$, $200$, $300$, $250$, and $350$ hours.\nStep 2: Find the whole and the part. The five-month total is $150 + 200 + 300 + 250 + 350 = 1{,}250$ hours, and the part in question is $250 + 350 = 600$ hours.\nStep 3: Divide and convert: $\\frac{600}{1{,}250} = 0.48 = 48\\%$. Check: $48\\%$ of $1{,}250$ is $600$, which matches the two bars ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20\\%$): uses the June bar alone, $\\frac{250}{1{,}250} = 20\\%$, and ignores July.\n* Choice B ($28\\%$): uses the July bar alone, $\\frac{350}{1{,}250} = 28\\%$, and ignores June.\n* Choice D ($52\\%$): gives the share of the remaining three months, $\\frac{650}{1{,}250} = 52\\%$, the complement of the requested percent.\n\n**Test Day Takeaway:** When a question asks about two categories combined, add the parts before dividing; the denominator is still every bar in the display.",
  skills: ["percent-of-value"]
},
{
  id: 7,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A shop drawing of a triangular gusset plate is similar to the finished plate, where vertex $A$ on the drawing corresponds to vertex $R$ on the plate and vertex $B$ corresponds to vertex $S$. The drawing has a perimeter of $63$ centimeters, the finished plate has a perimeter of $84$ centimeters, and edge $\\overline{AB}$ of the drawing measures $18$ centimeters. What is the length, in centimeters, of edge $\\overline{RS}$ of the finished plate?",
  correctAnswer: "24",
  explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is 24.**\n\n**The Fast Way (~30s):** Perimeters of similar figures scale by the same factor as their sides, so the factor is $\\frac{84}{63} = \\frac{4}{3}$ and $RS = 18 \\cdot \\frac{4}{3} = 24$ centimeters.\n\n**The Full Solution:**\nStep 1: In similar triangles every one-dimensional measurement, the perimeter included, is multiplied by the same scale factor $k$, so $k = \\frac{\\text{perimeter of the plate}}{\\text{perimeter of the drawing}}$.\nStep 2: Compute the factor: $k = \\frac{84}{63} = \\frac{4}{3}$.\nStep 3: Apply it to the corresponding edge: $RS = \\frac{4}{3}(18) = 24$ centimeters. Check: $\\frac{24}{18} = \\frac{4}{3}$, the same ratio as $\\frac{84}{63}$ ✓\n\n**Common Mistakes:**\n* $13.5$: inverts the scale factor, computing $18 \\cdot \\frac{63}{84} = 13.5$. That shrinks the edge even though the plate is the larger figure.\n* $39$: adds the difference of the perimeters, computing $18 + (84 - 63) = 39$. Similar figures are related by a multiplier, never by a constant difference.\n* $1.33$: stops after finding the scale factor $\\frac{4}{3}$ and never multiplies it by the length of $\\overline{AB}$.\n\n**Test Day Takeaway:** A ratio of perimeters is the same as the ratio of any pair of corresponding sides, so a perimeter pair can stand in for a side pair without finding a single other length.",
  skills: ["similar-triangles"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A utility company sets aside $8{,}000$ dollars in a fund that grows by one-fourth of $4\\%$ at the close of each quarter, with the growth applied to the fund's current amount. Which of the following expressions gives the amount in the fund, in dollars, $t$ years after the money was set aside?",
  choices: [
    // distractor: divides the annual rate by 4 but leaves the exponent as t, counting only one growth period per year
    { id: "A", text: "$8{,}000(1.01)^{t}$" },
    { id: "B", text: "$8{,}000(1.01)^{4t}$" },
    // distractor: multiplies the exponent by 4 but never divides the 4% annual rate by 4, applying a full 4% four times a year
    { id: "C", text: "$8{,}000(1.04)^{4t}$" },
    // distractor: divides the exponent by 4 instead of multiplying it, and leaves the annual rate undivided
    { id: "D", text: "$8{,}000(1.04)^{\\frac{t}{4}}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Compound Interest**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Each quarter the fund is multiplied by $1 + \\frac{0.04}{4} = 1.01$, and there are $4t$ quarters in $t$ years, so the amount is $8{,}000(1.01)^{4t}$.\n\n**The Full Solution:**\nStep 1: Find the growth per period. One-fourth of $4\\%$ is $1\\%$, so at the close of each quarter the fund is multiplied by $1.01$.\nStep 2: Count the periods. There are four quarters in a year, so in $t$ years the multiplier $1.01$ is applied $4t$ times.\nStep 3: Combine with the starting amount: the fund holds $8{,}000(1.01)^{4t}$ dollars. Check with $t = 1$: $8{,}000(1.01)^{4} \\approx 8{,}324.83$, a little more than the $8{,}320$ that a single yearly application of $4\\%$ would give, which is what growing four times a year should do ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8{,}000(1.01)^{t}$): uses the quarterly multiplier but only $t$ periods, so the fund grows once a year at the quarterly rate.\n* Choice C ($8{,}000(1.04)^{4t}$): counts $4t$ periods but applies the full annual $4\\%$ each time, which is four times too much growth.\n* Choice D ($8{,}000(1.04)^{\\frac{t}{4}}$): divides the exponent by $4$ rather than multiplying, which would model growth once every four years.\n\n**Test Day Takeaway:** When growth is applied $n$ times a year, divide the annual rate by $n$ and multiply the number of years by $n$; the two adjustments always move in opposite directions.",
  skills: ["exponential-functions"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The number of turbine blades a plant assembled in June was $25\\%$ greater than the number it assembled in May. If the plant assembled $300$ turbine blades in June, how many turbine blades did it assemble in May?",
  choices: [
    // distractor: takes 25% off the June figure, computing 0.75(300) = 225, instead of dividing by 1.25
    { id: "A", text: "$225$" },
    { id: "B", text: "$240$" },
    // distractor: subtracts 25 units from 300 rather than 25 percent of the May figure
    { id: "C", text: "$275$" },
    // distractor: increases the June figure by 25% instead of reversing the increase, computing 1.25(300) = 375
    { id: "D", text: "$375$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Percent Increase**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** June is $1.25$ times May, so May is $\\frac{300}{1.25} = 240$.\n\n**The Full Solution:**\nStep 1: Let $m$ be the number assembled in May. A $25\\%$ increase means June equals $m + 0.25m = 1.25m$.\nStep 2: Substitute the known June total: $1.25m = 300$.\nStep 3: Divide: $m = \\frac{300}{1.25} = 240$. Check: $25\\%$ of $240$ is $60$, and $240 + 60 = 300$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($225$): removes $25\\%$ of the June total, computing $0.75(300) = 225$. The $25\\%$ was taken of the smaller May figure, so it cannot be undone by subtracting $25\\%$ of June.\n* Choice C ($275$): subtracts $25$ units instead of a percent, computing $300 - 25 = 275$.\n* Choice D ($375$): applies the increase again, computing $1.25(300) = 375$, which moves in the wrong direction.\n\n**Test Day Takeaway:** To undo a percent increase, divide by the growth multiplier; subtracting the same percent from the larger number always overshoots, because the percent was based on the smaller one.",
  skills: ["percent-of-value", "percent-change"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A machinist marks two positions on a number line, one at $x = -3$ and one at $x = 15$, and both positions satisfy the equation $|2x - c| = 18$ for a single constant $c$. What is the value of $c$?",
  choices: [
    // distractor: pairs the position at -3 with the positive case, solving 2(-3) - c = 18 to get -24
    { id: "A", text: "$-24$" },
    // distractor: reverses the subtraction at the last step, computing 18 - 30 instead of 30 - 18
    { id: "B", text: "$-12$" },
    { id: "C", text: "$12$" },
    // distractor: pairs the position at 15 with the negative case, solving 2(15) - c = -18 to get 48
    { id: "D", text: "$48$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The two positions are $18$ apart in the expression $2x$, so use the larger one: $2(15) - c = 18$ gives $c = 12$.\n\n**The Full Solution:**\nStep 1: The equation $|2x - c| = 18$ splits into $2x - c = 18$ and $2x - c = -18$. Since $2x$ grows as $x$ grows, the larger position goes with the positive case.\nStep 2: Substitute $x = 15$ into the positive case: $2(15) - c = 18$, so $30 - c = 18$ and $c = 12$.\nStep 3: Confirm with the other position: $2(-3) - 12 = -6 - 12 = -18$, and $|-18| = 18$, so both marks satisfy the equation ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-24$): pairs the position at $-3$ with the positive case, solving $-6 - c = 18$. Testing it at $x = 15$ gives $|30 + 24| = 54$, not $18$.\n* Choice B ($-12$): reverses the final subtraction, computing $18 - 30$ instead of $30 - 18$.\n* Choice D ($48$): pairs the position at $15$ with the negative case, solving $30 - c = -18$. Testing it at $x = -3$ gives $|-6 - 48| = 54$, not $18$.\n\n**Test Day Takeaway:** With a constant hidden inside absolute value bars, substitute one known solution, then verify the constant against the other solution — only one of the two cases will satisfy both.",
  skills: ["combining-like-terms"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "The figure shows a triangular steel bracket $ABC$ whose corner at $C$ is a right angle. The three edges of the bracket have a combined length of $36$ centimeters, and the length of edge $\\overline{BC}$ is marked in the figure. What is the value of $\\sin A$?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 9]], labels: ["A", "C", "B"], sideLabels: ["", "9 cm", ""], rightAngleVertex: 1 } },
  choices: [
    // distractor: divides BC by 27, the combined length of the other two sides, instead of by the hypotenuse 15
    { id: "A", text: "$\\frac{1}{3}$" },
    { id: "B", text: "$\\frac{3}{5}$" },
    // distractor: computes tan A = 9/12 (opposite over adjacent) instead of sin A
    { id: "C", text: "$\\frac{3}{4}$" },
    // distractor: computes cos A = 12/15 (adjacent over hypotenuse) instead of sin A
    { id: "D", text: "$\\frac{4}{5}$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The other two sides total $36 - 9 = 27$, and the only right triangle with a leg of $9$ and the remaining two sides summing to $27$ is the $9$-$12$-$15$ triangle, so $\\sin A = \\frac{9}{15} = \\frac{3}{5}$.\n\n**The Full Solution:**\nStep 1: Let $b = AC$ and $c = AB$. The perimeter gives $9 + b + c = 36$, so $b + c = 27$.\nStep 2: The Pythagorean theorem gives $c^{2} - b^{2} = 9^{2} = 81$. Factoring, $(c - b)(c + b) = 81$, and since $c + b = 27$, it follows that $c - b = 3$.\nStep 3: Solving $c + b = 27$ and $c - b = 3$ gives $c = 15$ and $b = 12$, so $\\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{9}{15} = \\frac{3}{5}$. Check: $9 + 12 + 15 = 36$ and $9^{2} + 12^{2} = 225 = 15^{2}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{1}{3}$): divides the leg $9$ by $27$, the combined length of the two unknown sides, rather than by the hypotenuse $15$.\n* Choice C ($\\frac{3}{4}$): computes $\\tan A = \\frac{9}{12}$, opposite over adjacent, instead of opposite over hypotenuse.\n* Choice D ($\\frac{4}{5}$): computes $\\cos A = \\frac{12}{15}$, adjacent over hypotenuse, which is the ratio for the other acute angle's sine.\n\n**Test Day Takeaway:** When a perimeter is given with one leg, use $(c - b)(c + b) = a^{2}$ to split the remaining length into the two sides; then label opposite, adjacent, and hypotenuse relative to the named angle before writing the ratio.",
  skills: ["soh-cah-toa"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "An engineer models the pressure inside a sealed tank with the function $P(x) = mx + 96$, where $x$ is the elapsed time in minutes, $P(x)$ is the pressure in kilopascals, and $m$ is a constant. Twelve minutes after the model starts, it reports a pressure of $60$ kilopascals. What is the value of $m$?",
  correctAnswer: "-3",
  explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**The correct answer is -3.**\n\n**The Fast Way (~25s):** The pressure falls from $96$ to $60$ over $12$ minutes, so $m = \\frac{60 - 96}{12} = -3$.\n\n**The Full Solution:**\nStep 1: In the form $P(x) = mx + 96$, the constant $96$ is the pressure at $x = 0$ and $m$ is the change in pressure per minute.\nStep 2: The model reports $P(12) = 60$. Substitute: $12m + 96 = 60$.\nStep 3: Subtract $96$ and divide by $12$: $12m = -36$, so $m = -3$. Check: $P(12) = -3(12) + 96 = -36 + 96 = 60$ kilopascals, as reported ✓\n\n**Common Mistakes:**\n* $3$: reverses the subtraction, computing $\\frac{96 - 60}{12} = 3$. The pressure drops, so the rate must be negative.\n* $-36$: stops at the step $12m = -36$ and reports that value instead of dividing by $12$.\n* $13$: adds $96$ instead of subtracting it, computing $\\frac{60 + 96}{12} = 13$.\n\n**Test Day Takeaway:** In $mx + b$ form the constant term is the value at $x = 0$, so substitute the one other known point and solve for $m$; the sign of $m$ must match the direction the quantity moves.",
  skills: ["slope-intercept-form"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "On a wiring diagram drawn on a coordinate grid, one conduit runs along the line through $(-4, 1)$ and $(8, 10)$, and a second conduit meets it at a right angle while running through $(3, -2)$. Which of the following equations describes the second conduit?",
  choices: [
    // distractor: takes the reciprocal of the slope 3/4 without changing its sign, using 4/3
    { id: "A", text: "$y = \\frac{4}{3}x - 6$" },
    // distractor: keeps the slope 3/4 of the first conduit, producing a parallel line rather than a perpendicular one
    { id: "B", text: "$y = \\frac{3}{4}x - \\frac{17}{4}$" },
    // distractor: changes the sign of the slope without taking the reciprocal, using -3/4
    { id: "C", text: "$y = -\\frac{3}{4}x + \\frac{1}{4}$" },
    { id: "D", text: "$y = -\\frac{4}{3}x + 2$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Perpendicular Line Through Point**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The first conduit has slope $\\frac{10 - 1}{8 - (-4)} = \\frac{3}{4}$, so the second has slope $-\\frac{4}{3}$; through $(3, -2)$ that gives $y = -\\frac{4}{3}x + 2$.\n\n**The Full Solution:**\nStep 1: Find the slope of the first conduit from its two points: $\\frac{10 - 1}{8 - (-4)} = \\frac{9}{12} = \\frac{3}{4}$.\nStep 2: Meeting at a right angle means the slopes are negative reciprocals, so the second conduit has slope $-\\frac{4}{3}$.\nStep 3: Substitute the point $(3, -2)$ into $y = -\\frac{4}{3}x + b$: $-2 = -4 + b$, so $b = 2$ and the equation is $y = -\\frac{4}{3}x + 2$. Check: $\\frac{3}{4} \\cdot \\left(-\\frac{4}{3}\\right) = -1$, the test for perpendicular lines ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = \\frac{4}{3}x - 6$): flips the fraction but keeps it positive. The product of the slopes is then $1$, not $-1$.\n* Choice B ($y = \\frac{3}{4}x - \\frac{17}{4}$): reuses the slope of the first conduit, which produces a parallel line through $(3, -2)$ instead of a perpendicular one.\n* Choice C ($y = -\\frac{3}{4}x + \\frac{1}{4}$): changes only the sign and skips the reciprocal, so the product of the slopes is $-\\frac{9}{16}$.\n\n**Test Day Takeaway:** Perpendicular means flip the fraction and change the sign; multiply the two slopes as a check, since only a product of exactly $-1$ confirms a right angle.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Two constraint equations, $ay + 6x = 15$ and $12y - 9x = -4$, are plotted on the same coordinate grid, and the resulting lines never cross at any point. If $a$ is a constant, what is the value of $a$?",
  correctAnswer: "-8",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**The correct answer is -8.**\n\n**The Fast Way (~35s):** No common solution means equal slopes: $-\\frac{6}{a} = \\frac{3}{4}$, so $a = -8$.\n\n**The Full Solution:**\nStep 1: Two lines share no point exactly when they are parallel and distinct, which means their slopes are equal.\nStep 2: Write each slope. From $ay + 6x = 15$, $y = -\\frac{6}{a}x + \\frac{15}{a}$, so the slope is $-\\frac{6}{a}$. From $12y - 9x = -4$, $y = \\frac{9}{12}x - \\frac{4}{12}$, so the slope is $\\frac{3}{4}$.\nStep 3: Set them equal: $-\\frac{6}{a} = \\frac{3}{4}$, so $3a = -24$ and $a = -8$. Check: the first equation becomes $-8y + 6x = 15$, or $y = \\frac{3}{4}x - \\frac{15}{8}$, which has the same slope as $y = \\frac{3}{4}x - \\frac{1}{3}$ but a different intercept, so the two lines never meet ✓\n\n**Common Mistakes:**\n* $8$: drops the negative sign produced by moving $6x$ across the equals sign, solving $\\frac{6}{a} = \\frac{3}{4}$.\n* $-4.5$: matches the slope to its reciprocal, solving $-\\frac{6}{a} = \\frac{4}{3}$.\n* $-18$: sets the coefficient proportion up across the wrong variables, solving $\\frac{6}{-9} = \\frac{12}{a}$.\n\n**Test Day Takeaway:** No solution means equal slopes with different intercepts; solve for the constant from the slopes, then confirm the constant terms are not in the same ratio, which would make the system have infinitely many solutions instead.",
  skills: ["system-solution-types"]
},
{
  id: 15,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "An expense log records $40$ weekly charges whose mean is $88$ dollars and whose standard deviation is $12$ dollars. Every charge is then increased by $25\\%$, and a flat fee of $15$ dollars is subtracted from each increased charge. What is the standard deviation, in dollars, of the $40$ adjusted charges?",
  correctAnswer: "15",
  explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**The correct answer is 15.**\n\n**The Fast Way (~30s):** Multiplying every value by $1.25$ multiplies the standard deviation by $1.25$, and subtracting the same amount from every value leaves it unchanged, so the new standard deviation is $1.25(12) = 15$.\n\n**The Full Solution:**\nStep 1: Write the adjustment as a rule. If $v$ is an original charge, the adjusted charge is $1.25v - 15$.\nStep 2: Handle the two operations separately. Multiplying every value by a constant stretches the spread by that same constant, so the standard deviation becomes $1.25(12) = 15$ dollars. Subtracting $15$ from every value slides the whole data set down without changing how far apart the values are, so it does not change the standard deviation.\nStep 3: The standard deviation of the adjusted charges is therefore $15$ dollars. Check: two charges $20$ dollars apart become $1.25(20) = 25$ dollars apart after the increase and stay $25$ dollars apart after the flat subtraction, which is exactly the $1.25$ stretch and no shift effect ✓\n\n**Common Mistakes:**\n* $0$: subtracts the flat charge from the standard deviation as well, computing $1.25(12) - 15 = 0$. A shift moves the center, not the spread.\n* $12$: assumes no adjustment changes the standard deviation. The multiplication by $1.25$ does change it.\n* $95$: reports the adjusted mean, $1.25(88) - 15 = 95$ dollars, instead of the adjusted standard deviation.\n\n**Test Day Takeaway:** Adding or subtracting a constant shifts the mean and leaves the standard deviation alone; multiplying by a constant scales both. Apply each operation to the right statistic separately.",
  skills: ["data-analysis"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A surveyor marks three stakes on a site plan and records their positions on a coordinate grid as $(-3, 1)$, $(5, -3)$, and $(4, 6)$, with distances measured in meters. The three stakes are shown, and they bound a triangular plot. What is the area, in square meters, of the plot?",
  diagram: { type: "coordinatePoints", params: { points: [[-3, 1], [5, -3], [4, 6]], xMin: -5, xMax: 7, yMin: -5, yMax: 8 } },
  choices: [
    // distractor: divides by 2 a second time, halving the correct area of 34
    { id: "A", text: "$17$" },
    { id: "B", text: "$34$" },
    // distractor: omits the factor of 1/2, reporting the 68 produced before the final halving
    { id: "C", text: "$68$" },
    // distractor: gives the area of the smallest grid rectangle containing the three stakes, 8 by 9 = 72
    { id: "D", text: "$72$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** Enclose the stakes in the rectangle from $x = -3$ to $x = 5$ and $y = -3$ to $y = 6$, area $8(9) = 72$, then remove the three corner right triangles of areas $17.5$, $4.5$, and $16$: $72 - 38 = 34$ square meters.\n\n**The Full Solution:**\nStep 1: Draw the smallest rectangle with horizontal and vertical sides that contains all three stakes. Its corners are at $x = -3$ and $x = 5$ and at $y = -3$ and $y = 6$, so its area is $8 \\times 9 = 72$ square meters.\nStep 2: The rectangle minus the triangle leaves three right triangles at the corners. Their legs are $7$ and $5$, giving $17.5$; $1$ and $9$, giving $4.5$; and $8$ and $4$, giving $16$. Together they cover $17.5 + 4.5 + 16 = 38$ square meters.\nStep 3: Subtract: $72 - 38 = 34$ square meters. Check with the coordinate formula $\\frac{1}{2}\\left|x_{1}(y_{2} - y_{3}) + x_{2}(y_{3} - y_{1}) + x_{3}(y_{1} - y_{2})\\right| = \\frac{1}{2}|27 + 25 + 16| = 34$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($17$): halves the area twice, dividing $34$ by $2$ once more than the formula calls for.\n* Choice C ($68$): stops at the absolute value $|27 + 25 + 16| = 68$ and never applies the factor $\\frac{1}{2}$.\n* Choice D ($72$): gives the area of the enclosing rectangle rather than the triangle inside it.\n\n**Test Day Takeaway:** When no side of a coordinate triangle is horizontal or vertical, box it in and subtract the corner right triangles; the boxed rectangle is always an upper bound, so an answer equal to it is wrong by construction.",
  skills: ["triangle-area"]
},
{
  id: 17,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The rate at which a reservoir gains water, in liters per minute, is modeled by $-3x^{2} + kx - 27$, where $x$ is the valve setting and $k$ is a positive constant. Under this model the greatest gain is $0$ liters per minute, reached at exactly one valve setting. What is the value of $k$?",
  correctAnswer: "18",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**The correct answer is 18.**\n\n**The Fast Way (~40s):** A greatest value of $0$ reached at exactly one setting means $-3x^{2} + kx - 27 = 0$ has one repeated solution, so $k^{2} - 4(-3)(-27) = 0$ and $k = 18$.\n\n**The Full Solution:**\nStep 1: The model is a downward-opening quadratic, so its greatest value is at the vertex. If that greatest value is $0$ and it occurs at exactly one setting, the expression equals $0$ for exactly one value of $x$.\nStep 2: A quadratic $ax^{2} + bx + c$ has exactly one real zero when $b^{2} - 4ac = 0$. Here $a = -3$, $b = k$, and $c = -27$, so $k^{2} - 4(-3)(-27) = 0$, which gives $k^{2} = 324$.\nStep 3: Since $k$ is positive, $k = \\sqrt{324} = 18$. Check: $-3x^{2} + 18x - 27 = -3(x^{2} - 6x + 9) = -3(x - 3)^{2}$, which equals $0$ only at $x = 3$ and is negative everywhere else ✓\n\n**Common Mistakes:**\n* $324$: stops after solving $k^{2} = 324$ and reports $k^{2}$ instead of $k$.\n* $9$: leaves out the factor of $4$ in the discriminant, solving $k^{2} = 3(27) = 81$.\n* $-18$: takes the negative square root of $324$ even though the problem states that $k$ is positive.\n\n**Test Day Takeaway:** \"Exactly one solution\" for a quadratic always means $b^{2} - 4ac = 0$; write the discriminant with signs intact, and finish by taking the square root the sign condition allows.",
  skills: ["discriminant-analysis"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "One spreadsheet column computes $9^{2x - 1}$ for each input $x$ while a second column computes $27^{x + 4}$ for the same input. The two columns return equal numbers at exactly one input. What is the value of that input?",
  choices: [
    // distractor: rewrites only 27 as a power of 3, solving 2x - 1 = 3(x + 4) to get -13
    { id: "A", text: "$-13$" },
    // distractor: rewrites only 9 as a power of 3, solving 2(2x - 1) = x + 4 to get 2
    { id: "B", text: "$2$" },
    // distractor: sets the exponents equal without rewriting either side with base 3, solving 2x - 1 = x + 4
    { id: "C", text: "$5$" },
    { id: "D", text: "$14$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Writing both sides with base $3$ gives $3^{2(2x-1)} = 3^{3(x+4)}$, so $4x - 2 = 3x + 12$ and $x = 14$.\n\n**The Full Solution:**\nStep 1: Set the two column values equal, which gives $9^{2x - 1} = 27^{x + 4}$, then express both bases as powers of $3$: $9 = 3^{2}$ and $27 = 3^{3}$. The equation becomes $\\left(3^{2}\\right)^{2x-1} = \\left(3^{3}\\right)^{x+4}$.\nStep 2: Multiply the exponents on each side: $3^{4x - 2} = 3^{3x + 12}$. Equal powers of the same base force equal exponents, so $4x - 2 = 3x + 12$.\nStep 3: Solve: $x = 14$. Check: the left exponent is $4(14) - 2 = 54$ and the right exponent is $3(14) + 12 = 54$, so both columns equal $3^{54}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-13$): rewrites only the right side, using $2x - 1 = 3(x + 4)$. The exponent on the left still needs its factor of $2$.\n* Choice B ($2$): rewrites only the left side, using $2(2x - 1) = x + 4$.\n* Choice C ($5$): sets $2x - 1 = x + 4$ directly. Exponents may be equated only after both sides share the same base, and $9 \\ne 27$.\n\n**Test Day Takeaway:** Rewrite both sides over the same base before equating exponents, and distribute the outer exponent across the whole inner expression on each side — skipping one side is the error all three distractors encode.",
  skills: ["exponential-functions"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An engineer needs the graph of $y = x^{2} + bx + 36$ to meet the horizontal axis at two separate points, and the constant $b$ must be a positive integer. What is the smallest positive integer value of $b$ that meets both requirements?",
  choices: [
    // distractor: omits the factor of 4 in the discriminant, solving b^2 > 36 and taking the least integer above 6
    { id: "A", text: "$7$" },
    // distractor: reverses the inequality to b^2 < 144 and reports the greatest b for which the graph misses the axis
    { id: "B", text: "$11$" },
    // distractor: uses b^2 - 4ac >= 0, which allows b = 12 and the single repeated point of contact
    { id: "C", text: "$12$" },
    { id: "D", text: "$13$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Discriminant with Integer Bound**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Two separate crossings require $b^{2} - 4(1)(36) > 0$, so $b^{2} > 144$ and $b > 12$; the least positive integer is $13$.\n\n**The Full Solution:**\nStep 1: The graph meets the horizontal axis where $x^{2} + bx + 36 = 0$, so two separate points of contact means this equation has two distinct real solutions.\nStep 2: That happens exactly when the discriminant is positive: $b^{2} - 4(1)(36) > 0$, so $b^{2} > 144$.\nStep 3: With $b$ positive, $b > 12$, and the least positive integer greater than $12$ is $13$. Check: $b = 13$ gives $169 - 144 = 25 > 0$, two distinct solutions, while $b = 12$ gives $144 - 144 = 0$, a single point of contact ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): drops the factor of $4$, solving $b^{2} > 36$ and taking the least integer above $6$. At $b = 7$ the discriminant is $49 - 144 = -95$, so the graph misses the axis entirely.\n* Choice B ($11$): reverses the inequality to $b^{2} < 144$, which describes the values of $b$ for which the graph never meets the axis.\n* Choice C ($12$): allows the discriminant to equal $0$. That gives one repeated solution and a single point of contact, not two separate points.\n\n**Test Day Takeaway:** Translate the geometry into a discriminant inequality first, then round toward the side the inequality allows; a strict inequality never permits the boundary value itself.",
  skills: ["discriminant-analysis"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "An assembly line's scrap rate, in parts per thousand, is modeled by $3x^{2} - 30x + 82$, where $x$ is the line speed in meters per minute. Written as $a(x - h)^{2} + k$, the model shows the speed $h$ that minimizes the scrap rate and the minimum rate $k$. What is the value of $h + k$?",
  choices: [
    // distractor: reports h alone, the speed that minimizes the rate, without adding the minimum rate k
    { id: "A", text: "$5$" },
    // distractor: reports k alone, the minimum scrap rate, without adding the speed h
    { id: "B", text: "$7$" },
    { id: "C", text: "$12$" },
    // distractor: subtracts 25 rather than 3(25) = 75 when completing the square, producing k = 57 and h + k = 62
    { id: "D", text: "$62$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Factoring $3$ from the first two terms gives $3(x^{2} - 10x) + 82 = 3(x - 5)^{2} - 75 + 82 = 3(x - 5)^{2} + 7$, so $h = 5$, $k = 7$, and $h + k = 12$.\n\n**The Full Solution:**\nStep 1: Factor the leading coefficient out of the variable terms only: $3x^{2} - 30x + 82 = 3\\left(x^{2} - 10x\\right) + 82$.\nStep 2: Complete the square inside the parentheses. Half of $-10$ is $-5$, and $(-5)^{2} = 25$, so $x^{2} - 10x = (x - 5)^{2} - 25$. Substituting gives $3\\left[(x - 5)^{2} - 25\\right] + 82 = 3(x - 5)^{2} - 75 + 82$.\nStep 3: Combine the constants: $3(x - 5)^{2} + 7$, so $h = 5$ and $k = 7$, and $h + k = 12$. Check at $x = 0$: the original gives $82$, and $3(0 - 5)^{2} + 7 = 75 + 7 = 82$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): reports $h$ alone. That is the line speed with the least scrap, but the question asks for the sum.\n* Choice B ($7$): reports $k$ alone, the minimum scrap rate itself.\n* Choice D ($62$): subtracts only $25$ instead of $3(25) = 75$, giving $k = 57$ and $h + k = 62$. The $25$ sits inside the parentheses, so it is multiplied by the $3$ on the way out.\n\n**Test Day Takeaway:** When the leading coefficient is not $1$, the constant you add and subtract while completing the square must be multiplied by that coefficient before it leaves the parentheses; check the finished form at $x = 0$ to confirm.",
  skills: ["quadratics"]
},
{
  id: 21,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The table lists four inputs and the corresponding outputs of a quadratic function $f$. For some constants $a$, $h$, and $k$, the equation $f(x) = a(x - h)^{2} + k$ holds for every real number $x$. What is the value of $f(9)$?",
  questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$0$", "$7$"], ["$2$", "$-5$"], ["$6$", "$-5$"], ["$8$", "$7$"]] },
  correctAnswer: "16",
  explanation: "**SAT Pattern: Vertex Form from Two Conditions**\n\n**The correct answer is 16.**\n\n**The Fast Way (~50s):** The equal outputs at $x = 2$ and $x = 6$ put the axis of symmetry at $h = 4$; then $4a + k = -5$ and $16a + k = 7$ give $a = 1$ and $k = -9$, so $f(9) = 25 - 9 = 16$.\n\n**The Full Solution:**\nStep 1: Find $h$. A quadratic takes equal values at inputs equally far from the axis of symmetry. Since $f(2) = f(6) = -5$, the axis is halfway between them: $h = \\frac{2 + 6}{2} = 4$.\nStep 2: Find $a$ and $k$. Substituting $x = 2$ gives $a(2 - 4)^{2} + k = -5$, or $4a + k = -5$. Substituting $x = 0$ gives $a(0 - 4)^{2} + k = 7$, or $16a + k = 7$. Subtracting, $12a = 12$, so $a = 1$ and then $k = -5 - 4 = -9$.\nStep 3: Evaluate: $f(x) = (x - 4)^{2} - 9$, so $f(9) = (9 - 4)^{2} - 9 = 25 - 9 = 16$. Check against the table: $f(8) = (8 - 4)^{2} - 9 = 16 - 9 = 7$, which matches ✓\n\n**Common Mistakes:**\n* $44$: takes the axis of symmetry to be $x = 2$ because $-5$ is the smallest tabulated output, computing $(9 - 2)^{2} - 5 = 44$. The smallest listed output is not necessarily the minimum.\n* $20$: locates the axis at $x = 4$ correctly but keeps $k = -5$ from the table instead of solving for the true minimum $-9$, computing $25 - 5 = 20$.\n* $-4$: forgets to square the difference, computing $(9 - 4) + (-9) = -4$.\n\n**Test Day Takeaway:** Two inputs with the same output hand you the axis of symmetry for free; average them to get $h$, then use any two table rows to solve for $a$ and $k$ before evaluating anywhere else.",
  skills: ["vertex-form", "function-evaluation"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A machinist cuts a wedge whose cross section is a right triangle. The longest side of that cross section measures $12$ millimeters, and the shortest side measures $6$ millimeters. What is the area, in square millimeters, of the cross section?",
  choices: [
    { id: "A", text: "$18\\sqrt{3}$" },
    // distractor: uses the hypotenuse 12 as the second leg, computing (1/2)(6)(12) = 36
    { id: "B", text: "$36$" },
    // distractor: finds the second leg 6*sqrt(3) correctly but omits the factor of 1/2, giving 36*sqrt(3)
    { id: "C", text: "$36\\sqrt{3}$" },
    // distractor: makes both errors at once, multiplying the two given sides without halving: (6)(12) = 72
    { id: "D", text: "$72$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** The missing leg is $\\sqrt{12^{2} - 6^{2}} = \\sqrt{108} = 6\\sqrt{3}$, so the area is $\\frac{1}{2}(6)\\left(6\\sqrt{3}\\right) = 18\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: In a right triangle the longest side is the hypotenuse, so the hypotenuse is $12$ and one leg is $6$.\nStep 2: Find the other leg with the Pythagorean theorem: $6^{2} + b^{2} = 12^{2}$, so $b^{2} = 144 - 36 = 108$ and $b = \\sqrt{108} = \\sqrt{36 \\cdot 3} = 6\\sqrt{3}$.\nStep 3: The two legs form the right angle, so the area is $\\frac{1}{2}\\left(6\\right)\\left(6\\sqrt{3}\\right) = 18\\sqrt{3}$ square millimeters. Check numerically: $18\\sqrt{3} \\approx 31.2$, which is less than the $36$ that a $6$ by $12$ right triangle would give, as it must be since $6\\sqrt{3} < 12$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($36$): multiplies the two given lengths and halves them, $\\frac{1}{2}(6)(12) = 36$, but $12$ is the hypotenuse, not a leg, so it is not one of the sides forming the right angle.\n* Choice C ($36\\sqrt{3}$): finds the missing leg correctly but leaves out the factor $\\frac{1}{2}$, reporting the product of the legs instead of half of it.\n* Choice D ($72$): makes both errors, using the hypotenuse as a leg and skipping the $\\frac{1}{2}$: $(6)(12) = 72$.\n\n**Test Day Takeaway:** The area formula uses the two legs, never the hypotenuse; find the missing leg first, simplify the radical, and sanity-check that the area is smaller than half the product of the two given lengths.",
  skills: ["triangle-area"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 1 — Math Module 2 (22 questions)
// Flow: E at 1,5,17 · M at 2,3,4,6,9,11,13,19 ·
// H at 7,8,10,12,14,15,16,18,20,21,22. Breather easy at Q17 (range).
// Official-calibration recreation 2026-08-31: fresh scenarios throughout;
// diagrams at Q3 (parallel lines), Q6 (scatterplot residual), Q7 (table),
// Q10 (two-way table), Q14 (nested triangles), Q22 (frequency table).

{
  id: 1,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In the figure shown, two straight lines cross at a single point. The measure of one of the four angles formed is $(5x - 12)$ degrees, the measure of the angle opposite it is $(3x + 28)$ degrees, and the measure of an angle adjacent to both of these is $y$ degrees. What is the value of $y$?",
  diagram: { type: "intersectingLines", params: { angles: ["(5x - 12)°", "y°", "(3x + 28)°"], lineLabels: ["l", "m"] } },
  choices: [
    // distractor: reports x = 20 instead of the angle measure the question asks for
    { id: "A", text: "$20$" },
    // distractor: gives the opposite angle itself, 5(20) - 12 = 88, rather than its supplement y
    { id: "B", text: "$88$" },
    { id: "C", text: "$92$" },
    // distractor: solves 5x - 12 = 3x + 28 as 2x = 28 - 12 = 16, so x = 8, the angle is 28, and y = 152
    { id: "D", text: "$152$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Opposite angles at a crossing are equal, so $5x - 12 = 3x + 28$ gives $x = 20$ and an angle of $88^\\circ$. The adjacent angle $y$ is its supplement: $180 - 88 = 92$.\n\n**The Full Solution:**\nStep 1: The angles measuring $(5x - 12)^\\circ$ and $(3x + 28)^\\circ$ lie on opposite sides of the crossing point, so they are vertical angles and therefore congruent: $5x - 12 = 3x + 28$.\nStep 2: Subtract $3x$ from both sides to get $2x - 12 = 28$, then add $12$ to get $2x = 40$, so $x = 20$. Substituting back, that angle measures $5(20) - 12 = 88$ degrees.\nStep 3: The angle measuring $y$ degrees shares a side with the $88^\\circ$ angle and the two together form a straight line, so $y + 88 = 180$ and $y = 92$. Check: the four angles are $88$, $92$, $88$, and $92$, and they total $360$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): this is $x$, the value of the variable, not an angle measure. Solving the equation is only the first of two steps.\n* Choice B ($88$): this is the measure of the two vertical angles themselves. The angle marked $y$ degrees is adjacent to them, so it is the supplement, not the equal partner.\n* Choice D ($152$): comes from moving the $-12$ the wrong way and solving $2x = 28 - 12 = 16$. That gives $x = 8$, an angle of $28^\\circ$, and $y = 180 - 28 = 152$.\n\n**Test Day Takeaway:** At a crossing of two lines, mark which pair is vertical (equal measures) and which pair is linear (measures summing to $180^\\circ$) before writing any equation. Most misses on this pattern land exactly one supplement away from the answer.",
  skills: ["angles"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Two equations in $x$ and $y$ are called equivalent when every ordered pair that satisfies one of them also satisfies the other. In the xy-plane, equivalent equations have identical graphs. Which of the following is equivalent to $\\frac{5}{2}x = \\frac{3}{4}y + 6$?",
  choices: [
    // distractor: clears each fraction with its own denominator, multiplying 5/2 x by 2 and 3/4 y by 4, and leaves the 6 unscaled
    { id: "A", text: "$5x - 3y = 6$" },
    // distractor: multiplies both variable terms by 4 but leaves the constant as 6 instead of 24
    { id: "B", text: "$10x - 3y = 6$" },
    { id: "C", text: "$10x - 3y = 24$" },
    // distractor: moves the 3y term to the left side without changing its sign
    { id: "D", text: "$10x + 3y = 24$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Multiply every term by $4$ to clear both denominators: $10x = 3y + 24$. Subtracting $3y$ from both sides gives $10x - 3y = 24$.\n\n**The Full Solution:**\nStep 1: Two linear equations have exactly the same solutions when one is a nonzero constant multiple of the other. The denominators here are $2$ and $4$, so multiplying the whole equation by $4$ clears both at once.\nStep 2: Multiply each of the three terms by $4$: $4 \\cdot \\frac{5}{2}x = 10x$, $4 \\cdot \\frac{3}{4}y = 3y$, and $4 \\cdot 6 = 24$. The equation becomes $10x = 3y + 24$.\nStep 3: The choices carry both variables on the left, so subtract $3y$ from both sides: $10x - 3y = 24$. Check with a point: setting $y = 0$ in the given equation gives $\\frac{5}{2}x = 6$, so $x = \\frac{12}{5}$, and $10\\left(\\frac{12}{5}\\right) - 3(0) = 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5x - 3y = 6$): clears each fraction with its own denominator, multiplying $\\frac{5}{2}x$ by $2$ and $\\frac{3}{4}y$ by $4$ while leaving the $6$ alone. Three different factors on three terms produce a different line.\n* Choice B ($10x - 3y = 6$): scales both variable terms by $4$ but leaves the constant at $6$. Scaling must reach every term, including the one carrying no variable.\n* Choice D ($10x + 3y = 24$): scales correctly but moves $3y$ across the equals sign without changing its sign. The result has slope $-\\frac{10}{3}$ instead of $\\frac{10}{3}$, so it is a different line.\n\n**Test Day Takeaway:** Equivalence is one factor applied to the whole equation, constant included. Clear the fractions with a single common multiple, rearrange into the form the choices use, then confirm with one easy solution point.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 3,
  type: "fill-in",
  difficulty: "easy",
  band: 3,
  question: "A surveyor marks the three corners of a triangular stormwater retention pond as $A$, $B$, and $C$. The angle at corner $A$ measures $48$ degrees, and the angle at corner $B$ is twice as large as the angle at corner $C$. What is the measure, in degrees, of the angle at corner $B$?",
  correctAnswer: "88",
  explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $88$.**\n\n**The Fast Way (~25s):** The two unknown corners absorb $180 - 48 = 132$ degrees in a $2 : 1$ split, so corner $C$ is $44$ and corner $B$ is $88$.\n\n**The Full Solution:**\nStep 1: Let $c$ be the measure, in degrees, of the angle at corner $C$. Then the angle at corner $B$ measures $2c$ degrees.\nStep 2: The three interior angles of a triangle sum to $180$ degrees, so $48 + 2c + c = 180$, which gives $3c = 132$ and $c = 44$.\nStep 3: The angle at corner $B$ measures $2(44) = 88$ degrees. Check: $48 + 88 + 44 = 180$ ✓\n\n**Common Mistakes:**\n* $44$: solves for $c$ correctly but grids the angle at corner $C$ instead of the angle at corner $B$ that the question asks for.\n* $132$: stops after subtracting $48$ from $180$ and grids the combined measure of the two remaining corners.\n* $66$: splits the remaining $132$ degrees evenly between the two corners instead of in the $2 : 1$ ratio the stem gives.\n\n**Test Day Takeaway:** Name the smaller quantity as the variable so the multiple stays a clean product, subtract the known angle from $180$ first, then check that you grid the corner the question named.",
  skills: ["triangle-angle-sum"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In the xy-plane, a straight section of water main is represented by the segment with endpoints $(-7, 4)$ and $(3, -12)$, and a shutoff valve is placed at the point of that segment that is the same distance from each endpoint. What is the product of the two coordinates of the valve?",
  choices: [
    // distractor: drops the negative on -12 and averages 4 and 12 to get 8, giving (-2)(8) = -16
    { id: "A", text: "$-16$" },
    // distractor: reports the y-coordinate of the midpoint instead of the product of the coordinates
    { id: "B", text: "$-4$" },
    // distractor: reports the x-coordinate of the midpoint instead of the product of the coordinates
    { id: "C", text: "$-2$" },
    { id: "D", text: "$8$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The point equidistant from both endpoints is the midpoint: $\\left(\\frac{-7 + 3}{2}, \\frac{4 + (-12)}{2}\\right) = (-2, -4)$. The product is $(-2)(-4) = 8$.\n\n**The Full Solution:**\nStep 1: A point on a segment that is the same distance from each endpoint is the midpoint of that segment, so apply the midpoint formula $\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$.\nStep 2: The x-coordinate is $\\frac{-7 + 3}{2} = \\frac{-4}{2} = -2$, and the y-coordinate is $\\frac{4 + (-12)}{2} = \\frac{-8}{2} = -4$. The valve sits at $(-2, -4)$.\nStep 3: The product of the two coordinates is $(-2)(-4) = 8$. Check: $(-2, -4)$ is $\\sqrt{(-2 - (-7))^2 + (-4 - 4)^2} = \\sqrt{25 + 64} = \\sqrt{89}$ from one endpoint and $\\sqrt{(3 - (-2))^2 + (-12 - (-4))^2} = \\sqrt{89}$ from the other ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-16$): drops the negative sign on $-12$ and averages $4$ and $12$ to get $8$, then multiplies $(-2)(8)$. A single sign slip inside the average flips the product.\n* Choice B ($-4$): this is the y-coordinate of the valve, not the product. The last multiplication never happens.\n* Choice C ($-2$): this is the x-coordinate of the valve, again reported before the final step.\n\n**Test Day Takeaway:** \"Same distance from each endpoint\" is midpoint language. Average each coordinate separately, keeping the signs, then reread the final question — these items almost always ask for something built from the midpoint rather than the midpoint itself.",
  skills: ["coordinate-geometry"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "At a community health screening, $45\\%$ of the participants were over age $50$, and $30\\%$ of the participants over age $50$ had elevated blood pressure. If one of the participants is selected at random, what is the probability that the selected participant is over age $50$ and has elevated blood pressure?",
  choices: [
    { id: "A", text: "$13.5\\%$" },
    // distractor: subtracts the two percents, 45 - 30 = 15, instead of multiplying them
    { id: "B", text: "$15\\%$" },
    // distractor: reports the conditional probability given over age 50 rather than the probability of both conditions
    { id: "C", text: "$30\\%$" },
    // distractor: adds the two percents, 45 + 30 = 75
    { id: "D", text: "$75\\%$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The $30\\%$ applies only inside the over-$50$ group, so multiply: $0.45 \\times 0.30 = 0.135$, which is $13.5\\%$.\n\n**The Full Solution:**\nStep 1: Suppose there are $1{,}000$ participants. Then $45\\%$ of them, or $450$, are over age $50$.\nStep 2: The $30\\%$ is a rate within that group, not within the whole screening, so the number who are over $50$ and have elevated blood pressure is $0.30 \\times 450 = 135$.\nStep 3: The probability that a randomly selected participant falls in both categories is $\\frac{135}{1{,}000} = 0.135$, or $13.5\\%$. Check: $13.5\\%$ must be smaller than both $45\\%$ and $30\\%$, since it counts only the overlap ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($15\\%$): subtracts, $45 - 30$. Subtraction would answer \"how many more,\" not \"how many are in both.\"\n* Choice C ($30\\%$): this is the probability of elevated blood pressure given that the participant is over $50$ — the conditional probability the stem hands you, not the one it asks for.\n* Choice D ($75\\%$): adds the two percents. Adding would count participants who satisfy either condition, and it is impossible here since only $45\\%$ of participants are even eligible.\n\n**Test Day Takeaway:** A percent stated \"of\" a subgroup is a rate inside that subgroup. To get the share of the whole population, multiply the two rates — and sanity-check that your answer is smaller than either one.",
  skills: ["conditional-probability"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table shows the percent decrease from the previous year in a city's average daily water loss from its distribution mains. The average daily water loss in $2020$ was greater than $0$. What was the percent decrease in the average daily water loss from $2020$ to $2023$?",
  diagram: { type: "dataTable", params: { headers: ["Year", "Percent decrease from previous year"], rows: [["2021", "10%"], ["2022", "25%"], ["2023", "20%"]] } },
  choices: [
    // distractor: adds the three yearly decreases to 55 and then reports what is left, 100 - 55 = 45
    { id: "A", text: "$45\\%$" },
    { id: "B", text: "$46\\%$" },
    // distractor: computes the surviving fraction 0.90(0.75)(0.80) = 0.54 and reports 54 percent as the decrease instead of what remains
    { id: "C", text: "$54\\%$" },
    // distractor: adds the three yearly percent decreases: 10 + 25 + 20 = 55
    { id: "D", text: "$55\\%$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** Multiply the surviving fractions: $0.90 \\times 0.75 \\times 0.80 = 0.54$. If $54\\%$ remains, the decrease is $100\\% - 54\\% = 46\\%$.\n\n**The Full Solution:**\nStep 1: Let $L$ be the average daily water loss in $2020$. A $10\\%$ decrease leaves $90\\%$, so the $2021$ loss is $0.90L$.\nStep 2: A further $25\\%$ decrease leaves $75\\%$ of that, so the $2022$ loss is $0.75(0.90L) = 0.675L$. A further $20\\%$ decrease leaves $80\\%$ of that, so the $2023$ loss is $0.80(0.675L) = 0.54L$.\nStep 3: The loss fell from $L$ to $0.54L$, a drop of $0.46L$. As a percent of the $2020$ value that is $\\frac{0.46L}{L} = 46\\%$. Check with $L = 1{,}200$: the values are $1{,}080$, $810$, and $648$, and $\\frac{1{,}200 - 648}{1{,}200} = 0.46$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($45\\%$): adds the three decreases to get $55\\%$ and then reports the leftover $100 - 55 = 45$. Two errors that partly cancel still land on a listed choice.\n* Choice C ($54\\%$): this is the fraction of the $2020$ loss that survives, not the fraction lost. The multiplication is right; the last subtraction never happens.\n* Choice D ($55\\%$): adds $10 + 25 + 20$. Percent changes only add when they are taken on the same base, and each of these is taken on a smaller base than the one before.\n\n**Test Day Takeaway:** Chained percent changes multiply, never add. Track what survives — $0.90$, $0.75$, $0.80$ — then subtract the product from $1$ at the very end.",
  skills: ["percent-change"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A traffic study models the number of vehicles crossing a bridge during hour $x$ by the expression $9(x - 2) - 3x$ for northbound vehicles and by the expression $2(x + 8) - 6$ for southbound vehicles. For what value of $x$ do the two expressions give equal numbers of vehicles?",
  choices: [
    // distractor: moves the constant the wrong way: from 6x - 18 = 2x + 10 writes 4x = 10 - 18 = -8, so x = -2
    { id: "A", text: "$-2$" },
    // distractor: multiplies the 9 by x only, so the northbound expression becomes 6x - 2 and the equation gives x = 3
    { id: "B", text: "$3$" },
    // distractor: multiplies the 2 by x only, so the southbound expression becomes 2x + 2 and the equation gives x = 5
    { id: "C", text: "$5$" },
    { id: "D", text: "$7$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Two-Step Linear Equation**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Simplify each side first: the northbound expression is $6x - 18$ and the southbound expression is $2x + 10$. Then $4x = 28$, so $x = 7$.\n\n**The Full Solution:**\nStep 1: Distribute in the northbound expression: $9(x - 2) - 3x = 9x - 18 - 3x = 6x - 18$.\nStep 2: Distribute in the southbound expression: $2(x + 8) - 6 = 2x + 16 - 6 = 2x + 10$.\nStep 3: Set the simplified expressions equal: $6x - 18 = 2x + 10$. Subtract $2x$ to get $4x - 18 = 10$, add $18$ to get $4x = 28$, so $x = 7$. Check: $6(7) - 18 = 24$ and $2(7) + 10 = 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$): comes from $4x = 10 - 18$, subtracting the $18$ instead of adding it when moving the constant across the equals sign.\n* Choice B ($3$): multiplies $9$ by $x$ but not by $-2$, so the northbound side becomes $6x - 2$ and the equation gives $x = 3$.\n* Choice C ($5$): multiplies $2$ by $x$ but not by $8$, so the southbound side becomes $2x + 2$ and the equation gives $x = 5$.\n\n**Test Day Takeaway:** Simplify each side completely before you move anything across the equals sign. Both classic misses here are half-finished distributions, and both produce answers that sit right next to the real one.",
  skills: ["combining-like-terms"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "After a single dose of a medication is given, the amount remaining in a patient's bloodstream is cut in half every $4$ hours. Exactly $6$ hours after the dose, $320$ micrograms remain. How many micrograms remain exactly $18$ hours after the dose?",
  choices: [
    // distractor: counts four halvings instead of three by counting the times 6, 10, 14, and 18 hours rather than the three gaps between them, so it divides 320 by 2 to the fourth power
    { id: "A", text: "$20$" },
    { id: "B", text: "$40$" },
    // distractor: divides 320 by 4, the number of hours in one halving interval, instead of by 2 cubed
    { id: "C", text: "$80$" },
    // distractor: halves only once, treating the entire 12-hour gap as a single halving interval
    { id: "D", text: "$160$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Growth/Decay**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** From $6$ hours to $18$ hours is $12$ hours, which is three halving intervals, so divide by $2^3 = 8$: $\\frac{320}{8} = 40$.\n\n**The Full Solution:**\nStep 1: The gap between the two times given is $18 - 6 = 12$ hours. Since the amount halves every $4$ hours, this gap contains $\\frac{12}{4} = 3$ halving intervals.\nStep 2: Three halvings multiply the amount by $\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$, so the amount at $18$ hours is $320 \\cdot \\frac{1}{8}$.\nStep 3: $\\frac{320}{8} = 40$ micrograms. Check by stepping forward: $320$ at $6$ hours, $160$ at $10$ hours, $80$ at $14$ hours, $40$ at $18$ hours ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): counts four halvings instead of three. The times $6$, $10$, $14$, and $18$ hours are four labels but only three gaps apart, and $\\frac{320}{2^4} = 20$. The exponent counts intervals, not time stamps.\n* Choice C ($80$): divides $320$ by $4$, using the number of hours per halving as the divisor. The $4$ sets how often the halving happens; the divisor is $2$ raised to the number of halvings.\n* Choice D ($160$): halves once, treating the whole $12$-hour gap as a single interval. That is the answer for $10$ hours after the dose.\n\n**Test Day Takeaway:** For a half-life problem, count intervals first, then raise $\\frac{1}{2}$ to that count. Stepping the values forward one interval at a time takes ten seconds and catches every miscount.",
  skills: ["exponential-growth-decay"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A pair of values $x$ and $y$ satisfies both $y = 2x + 3$ and $4x - y = 9$, and no other pair of values satisfies both. What is the value of $x + y$ for that pair?",
  choices: [
    // distractor: drops the minus sign and solves 4x + y = 9, giving (1, 5) and a sum of 6
    { id: "A", text: "$6$" },
    // distractor: subtracts only the 2x when substituting, using 4x - 2x + 3 = 9, which gives (3, 9) and a sum of 12
    { id: "B", text: "$12$" },
    // distractor: solves the system correctly but reports y alone instead of x + y
    { id: "C", text: "$15$" },
    { id: "D", text: "$21$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Substitute $2x + 3$ for $y$ in the second equation: $4x - (2x + 3) = 9$ gives $2x = 12$, so $x = 6$, $y = 15$, and $x + y = 21$.\n\n**The Full Solution:**\nStep 1: The first equation already gives $y$ in terms of $x$, so replace $y$ in the second equation: $4x - (2x + 3) = 9$.\nStep 2: Distribute the subtraction across both terms in the parentheses: $4x - 2x - 3 = 9$, so $2x - 3 = 9$, $2x = 12$, and $x = 6$.\nStep 3: Substitute back: $y = 2(6) + 3 = 15$, so $x + y = 6 + 15 = 21$. Check: $4(6) - 15 = 24 - 15 = 9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): comes from reading the second equation as $4x + y = 9$. That system solves to $(1, 5)$, whose coordinates sum to $6$ — and $6$ is also the correct value of $x$, which makes it doubly attractive.\n* Choice B ($12$): comes from writing $4x - 2x + 3 = 9$, distributing the minus sign to only the first term inside the parentheses. That gives $(3, 9)$ and a sum of $12$.\n* Choice C ($15$): this is $y$. The system is solved correctly, but only half of the requested sum is reported.\n\n**Test Day Takeaway:** When you substitute a two-term expression into a subtraction, wrap it in parentheses first. Then reread the question — these items usually ask for a combination, not for one variable.",
  skills: ["substitution-method"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "At a regional track meet, $600$ athletes competed. Of these athletes, $35\\%$ competed in the distance events, and $\\frac{2}{5}$ of the distance athletes set a personal best. Among the athletes who did not compete in the distance events, $150$ set a personal best. If one of the $600$ athletes is selected at random, what is the probability that the selected athlete set a personal best?",
  choices: [
    // distractor: counts only the 84 distance athletes who set a personal best, giving 84/600
    { id: "A", text: "$0.14$" },
    // distractor: counts only the 150 non-distance athletes who set a personal best, giving 150/600
    { id: "B", text: "$0.25$" },
    { id: "C", text: "$0.39$" },
    // distractor: adds the two rates 0.35 and 0.25 instead of building the total count first
    { id: "D", text: "$0.60$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Distance athletes: $0.35(600) = 210$, of whom $\\frac{2}{5}(210) = 84$ set a personal best. Add the $150$ others: $\\frac{84 + 150}{600} = 0.39$.\n\n**The Full Solution:**\nStep 1: The number of distance athletes is $35\\%$ of $600$, which is $0.35(600) = 210$. The remaining $600 - 210 = 390$ athletes did not compete in the distance events.\nStep 2: Of the $210$ distance athletes, $\\frac{2}{5}$ set a personal best, so $\\frac{2}{5}(210) = 84$ did. Among the other $390$ athletes, $150$ set a personal best. In total, $84 + 150 = 234$ athletes set a personal best.\nStep 3: A marginal probability divides the total in the category by the overall total: $\\frac{234}{600} = 0.39$. Check: $234$ is less than $600$ and more than either group alone, so a value between $0.25$ and $0.60$ is expected ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.14$): uses $\\frac{84}{600}$, the joint probability of being a distance athlete and setting a personal best. It ignores the $150$ athletes from the other group.\n* Choice B ($0.25$): uses $\\frac{150}{600}$, counting only the non-distance athletes who set a personal best. It ignores the $84$.\n* Choice D ($0.60$): adds $0.35$ and $0.25$. Those two rates are taken over different groups, so adding them does not produce a probability for the whole meet.\n\n**Test Day Takeaway:** A marginal probability needs one complete count across every subgroup. Build the count group by group, add, and only then divide by the overall total.",
  skills: ["probability-basics"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Each row of the table pairs an input with the output that $f$ produces and the output that $g$ produces, and the two functions are defined only at these five inputs. Exactly one input $a$ shown satisfies $g(f(a)) = 5$. For that same input, what is the value of $f(g(a))$?",
  questionTable: { headers: ["$x$", "$f(x)$", "$g(x)$"], rows: [["$1$", "$4$", "$3$"], ["$2$", "$1$", "$5$"], ["$3$", "$5$", "$2$"], ["$4$", "$3$", "$1$"], ["$5$", "$2$", "$4$"]] },
  choices: [
    // distractor: stops at f(a) = 2, the inner output found on the way to identifying a
    { id: "A", text: "$2$" },
    { id: "B", text: "$3$" },
    // distractor: reports g(a) = 4 without applying f to it
    { id: "C", text: "$4$" },
    // distractor: reports the input a = 5 itself instead of the requested value f(g(a))
    { id: "D", text: "$5$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Function Composition**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** $g(t) = 5$ only when $t = 2$, and $f(a) = 2$ only when $a = 5$. Then $g(5) = 4$ and $f(4) = 3$.\n\n**The Full Solution:**\nStep 1: Work $g(f(a)) = 5$ from the outside in. Reading the $g(x)$ column, the only input whose $g$-output is $5$ is $x = 2$, so $f(a)$ must equal $2$.\nStep 2: Reading the $f(x)$ column, the only input whose $f$-output is $2$ is $x = 5$, so $a = 5$.\nStep 3: Now evaluate $f(g(a)) = f(g(5))$. From the table, $g(5) = 4$, and $f(4) = 3$. Check the chain forward: $f(5) = 2$ and $g(2) = 5$, confirming $a = 5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): this is $f(a)$, the inner value you find while identifying $a$. It answers the first half of the work, not the question.\n* Choice C ($4$): this is $g(a) = g(5)$. The inner function of the requested composition is evaluated, but $f$ is never applied to the result.\n* Choice D ($5$): this is $a$ itself, and it is also the value on the right side of the given equation, which makes it feel like a natural stopping point.\n\n**Test Day Takeaway:** Composition read from a table is a two-column lookup in a fixed order: inside first, then outside. Write down each intermediate value with a label so you never hand in $f(a)$ or $g(a)$ when the question asked for the full composition.",
  skills: ["function-composition"]
},
{
  id: 12,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A model estimates that the number of migrating shorebirds at a coastal refuge, in hundreds above the season baseline, is $f(x) = -x^2 + 14x - 40$, where $x$ is the number of days after August 1. For what greatest integer value of $x$ does the model estimate a count above the season baseline?",
  correctAnswer: "9",
  explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~40s):** Factor: $-x^2 + 14x - 40 = -(x - 4)(x - 10)$, which is positive only between $4$ and $10$. The greatest integer strictly below $10$ is $9$.\n\n**The Full Solution:**\nStep 1: A count above the baseline means $f(x) > 0$, so solve $-x^2 + 14x - 40 > 0$. Multiplying by $-1$ and reversing the inequality gives $x^2 - 14x + 40 < 0$.\nStep 2: Factor the left side: $x^2 - 14x + 40 = (x - 4)(x - 10)$. The product of the two factors is negative exactly when $x$ lies strictly between the zeros, so $4 < x < 10$.\nStep 3: The greatest integer strictly less than $10$ is $9$. Check: $f(9) = -81 + 126 - 40 = 5$, which is positive, while $f(10) = -100 + 140 - 40 = 0$, which is not above the baseline ✓\n\n**Common Mistakes:**\n* $10$: grids the larger zero. At $x = 10$ the model gives exactly the baseline, and the question asks for a count above it.\n* $4$: grids the smaller zero, which is the start of the interval rather than its greatest integer.\n* $7$: grids the $x$-value of the vertex, where the count is largest, instead of the last $x$-value that still clears the baseline.\n\n**Test Day Takeaway:** For a downward-opening quadratic, \"positive\" means strictly between the zeros. Find the zeros, decide whether the endpoints are included, then step one unit inside the interval.",
  skills: ["quadratics"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "At a training facility, $5$ sprint sessions and $3$ recovery sessions take a total of $44$ minutes, and $3$ sprint sessions and $5$ recovery sessions take a total of $52$ minutes. How many minutes do one sprint session and one recovery session take together?",
  choices: [
    // distractor: adds the equations to 8x + 8y = 96 but divides by 16 instead of by 8
    { id: "A", text: "$6$" },
    // distractor: solves the system fully and reports the recovery session length alone
    { id: "B", text: "$8$" },
    { id: "C", text: "$12$" },
    // distractor: adds the two given totals and stops, reporting 44 + 52 without dividing by 8
    { id: "D", text: "$96$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Let $x$ and $y$ be the two session lengths. Adding $5x + 3y = 44$ and $3x + 5y = 52$ gives $8x + 8y = 96$, so $x + y = 12$.\n\n**The Full Solution:**\nStep 1: Let $x$ be the number of minutes for one sprint session and $y$ the number for one recovery session. The two statements give $5x + 3y = 44$ and $3x + 5y = 52$.\nStep 2: The coefficients are mirror images, so adding the equations collapses them: $(5x + 3x) + (3y + 5y) = 44 + 52$, which is $8x + 8y = 96$.\nStep 3: Factor and divide: $8(x + y) = 96$, so $x + y = 12$ minutes. Check by solving fully: $x = 4$ and $y = 8$, and $5(4) + 3(8) = 44$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): divides $96$ by $16$ instead of by $8$, doubling the count of terms on the left side.\n* Choice B ($8$): this is $y$, the length of one recovery session. Solving the system all the way is more work than needed, and it invites reporting a single variable.\n* Choice D ($96$): reports $44 + 52$, the sum of the two equations' right sides, without dividing by the common factor of $8$.\n\n**Test Day Takeaway:** When the two equations have mirrored coefficients, add or subtract them and read the combination directly. Solving for each variable separately costs time and creates a chance to hand in the wrong one.",
  skills: ["elimination-method"]
},
{
  id: 14,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "Ecologists mark a circular study plot on a map so that its boundary is the graph of $x^2 + y^2 + 12x - 8y + c = 0$, where each unit on the map represents one meter and $c$ is a constant. The plot has a radius of $10$ meters. What is the value of $c$?",
  correctAnswer: "-48",
  explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $-48$.**\n\n**The Fast Way (~45s):** Completing both squares moves $36$ and $16$ to the right: $52 - c = r^2 = 100$, so $c = -48$.\n\n**The Full Solution:**\nStep 1: Group the terms and complete the square in $x$: $x^2 + 12x = (x + 6)^2 - 36$. Complete the square in $y$: $y^2 - 8y = (y - 4)^2 - 16$.\nStep 2: The equation becomes $(x + 6)^2 - 36 + (y - 4)^2 - 16 + c = 0$, so $(x + 6)^2 + (y - 4)^2 = 52 - c$. The right side is $r^2$.\nStep 3: The radius is $10$ meters, so $52 - c = 10^2 = 100$, which gives $c = 52 - 100 = -48$. Check: with $c = -48$ the equation is $(x + 6)^2 + (y - 4)^2 = 100$, a circle centered at $(-6, 4)$ with radius $10$ ✓\n\n**Common Mistakes:**\n* $48$: solves $52 - c = 100$ as $c = 100 - 52$, flipping the sign when isolating $c$.\n* $42$: sets $52 - c$ equal to the radius $10$ rather than to the radius squared, giving $c = 42$.\n* $-64$: completes the square in $x$ only, using $36 - c = 100$ and never accounting for the $-8y$ term.\n\n**Test Day Takeaway:** Completing the square always sends a positive number to the other side, one for each variable. Set the collected right side equal to $r^2$, not to $r$, and solve for the constant last.",
  skills: ["circle-equation"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A student rewrites the left side of the equation $\\frac{x^2 - 9}{x - 3} = 6$ as a linear expression and then solves the resulting linear equation. Which of the following statements about the original equation is true?",
  choices: [
    { id: "A", text: "The equation has no solution." },
    // distractor: solves x + 3 = 6 to get x = 3 and never checks that x = 3 makes the denominator zero
    { id: "B", text: "The equation has exactly one solution, $x = 3$." },
    // distractor: adds 3 to 6 instead of subtracting, reporting x = 9
    { id: "C", text: "The equation has exactly one solution, $x = 9$." },
    // distractor: sets the numerator x squared minus 9 equal to zero and reports both of its zeros
    { id: "D", text: "The equation has exactly two solutions, $x = 3$ and $x = -3$." }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Rational Equation with No Solution**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The left side simplifies to $x + 3$ for every $x$ except $3$, and $x + 3 = 6$ gives exactly $x = 3$ — the one value the original equation forbids.\n\n**The Full Solution:**\nStep 1: Factor the numerator: $x^2 - 9 = (x - 3)(x + 3)$. So $\\frac{x^2 - 9}{x - 3} = \\frac{(x - 3)(x + 3)}{x - 3} = x + 3$, valid for every $x$ except $x = 3$, where the denominator is $0$.\nStep 2: Solve the simplified equation: $x + 3 = 6$, so $x = 3$.\nStep 3: Test $x = 3$ in the original equation. The denominator becomes $3 - 3 = 0$, so the left side is undefined and $x = 3$ is extraneous. No other candidate exists, so the equation has no solution. Check: any $x \\neq 3$ gives a left side of $x + 3 \\neq 6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($x = 3$): this is exactly what the simplified linear equation produces. Cancelling the common factor is legal only where that factor is nonzero, so this candidate must be tested and rejected.\n* Choice C ($x = 9$): comes from solving $x + 3 = 6$ by adding $3$ to both sides instead of subtracting it.\n* Choice D ($x = 3$ and $x = -3$): sets the numerator equal to $0$ and lists its zeros. That answers \"when is the fraction zero,\" not \"when does the fraction equal $6$.\"\n\n**Test Day Takeaway:** After cancelling a factor from a rational equation, every candidate solution must be checked against the original denominator. When the only candidate is the excluded value, the honest answer is that the equation has no solution.",
  skills: ["rational-expressions"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table gives the value of a quadratic function $f$ at three inputs. Exactly two values of $x$, not necessarily shown in the table, make the output of $f$ equal to zero. What is the positive difference between those two values?",
  questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$0$", "$-7$"], ["$2$", "$-15$"], ["$6$", "$-7$"]] },
  choices: [
    // distractor: adds the two zeros, -1 and 7, instead of subtracting them
    { id: "A", text: "$6$" },
    // distractor: reports the larger zero, 7, rather than the difference between the two zeros
    { id: "B", text: "$7$" },
    { id: "C", text: "$8$" },
    // distractor: reports the discriminant b squared minus 4ac = 64 instead of its square root
    { id: "D", text: "$64$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** $f(0) = f(6) = -7$, so the axis of symmetry is $x = 3$. Using $f(2) = -15$ gives $f(x) = (x - 3)^2 - 16$, whose zeros are $3 \\pm 4$, a difference of $8$.\n\n**The Full Solution:**\nStep 1: Write $f(x) = a(x - h)^2 + k$. Since $f(0)$ and $f(6)$ are equal, the inputs $0$ and $6$ are the same distance from the axis of symmetry, so $h = 3$.\nStep 2: Substitute the two remaining points. From $f(2) = -15$: $a(2 - 3)^2 + k = a + k = -15$. From $f(0) = -7$: $a(0 - 3)^2 + k = 9a + k = -7$. Subtracting gives $8a = 8$, so $a = 1$ and $k = -16$. Thus $f(x) = (x - 3)^2 - 16$.\nStep 3: Set $f(x) = 0$: $(x - 3)^2 = 16$, so $x - 3 = \\pm 4$ and $x = -1$ or $x = 7$. The positive difference is $7 - (-1) = 8$. Check in standard form, $f(x) = x^2 - 6x - 7 = (x - 7)(x + 1)$, which has the same two zeros ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): adds the zeros, $-1 + 7$. The sum of the zeros is $-\\frac{b}{a} = 6$, a real feature of this quadratic, but distance is a difference.\n* Choice B ($7$): reports the larger zero itself. It is the last number written down before the subtraction step.\n* Choice D ($64$): reports $b^2 - 4ac = 36 + 28 = 64$. The distance between the zeros is $\\frac{\\sqrt{b^2 - 4ac}}{|a|}$, so the square root is still owed.\n\n**Test Day Takeaway:** Two equal outputs pin the axis of symmetry halfway between their inputs. Once you have the vertex form, the zeros sit symmetrically on either side and their distance is twice the horizontal shift.",
  skills: ["quadratics"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A hatchery holding tank contains $18$ trout, and $6$ of them carry a tag. Two trout will be netted one after the other, and the first is not returned to the tank before the second is netted. What is the probability that exactly one of the two netted trout carries a tag?",
  choices: [
    // distractor: counts only the tagged-then-untagged order and never doubles for the untagged-then-tagged order
    { id: "A", text: "$\\frac{4}{17}$" },
    // distractor: reports 6/18, the probability that a single netted trout carries a tag
    { id: "B", text: "$\\frac{1}{3}$" },
    { id: "C", text: "$\\frac{8}{17}$" },
    // distractor: reports 12/18, the probability that a single netted trout does not carry a tag
    { id: "D", text: "$\\frac{2}{3}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Probability Without Replacement**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** Exactly one tagged happens in two orders, each with probability $\\frac{6}{18} \\cdot \\frac{12}{17} = \\frac{4}{17}$. Doubling gives $\\frac{8}{17}$.\n\n**The Full Solution:**\nStep 1: Because the first trout is not returned, the second draw comes from $17$ trout. Consider the order tagged first, untagged second: the probability is $\\frac{6}{18} \\cdot \\frac{12}{17} = \\frac{1}{3} \\cdot \\frac{12}{17} = \\frac{4}{17}$.\nStep 2: Now the order untagged first, tagged second: the probability is $\\frac{12}{18} \\cdot \\frac{6}{17} = \\frac{2}{3} \\cdot \\frac{6}{17} = \\frac{4}{17}$. The two orders give the same value, which is typical for exactly-one problems.\nStep 3: The two orders are mutually exclusive, so add them: $\\frac{4}{17} + \\frac{4}{17} = \\frac{8}{17}$. Check with counts: the number of ordered pairs with exactly one tagged is $6 \\cdot 12 + 12 \\cdot 6 = 144$, out of $18 \\cdot 17 = 306$ ordered pairs, and $\\frac{144}{306} = \\frac{8}{17}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{4}{17}$): the arithmetic for one order is done correctly, but \"exactly one\" allows two arrangements. This is the single most common miss on this pattern.\n* Choice B ($\\frac{1}{3}$): this is $\\frac{6}{18}$, the probability that one trout selected at random carries a tag. It answers a one-draw question.\n* Choice D ($\\frac{2}{3}$): this is $\\frac{12}{18}$, the probability that one trout selected at random does not carry a tag — the complement of choice B, not a two-draw probability.\n\n**Test Day Takeaway:** Without replacement, the second denominator drops by one. When the question says \"exactly one,\" count the arrangements before you commit to an answer — one order is only half the story.",
  skills: ["probability-basics"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In the xy-plane, line $\\ell$ has the equation $2y = 5x - 8$ and line $n$ has the equation $ky = 15x + m$, where $k$ and $m$ are constants. Every point that lies on line $\\ell$ also lies on line $n$. What is the value of $k + m$?",
  choices: [
    // distractor: finds m = -24 correctly but reports m alone instead of k + m
    { id: "A", text: "$-24$" },
    // distractor: scales the right side by 3 to get m = -24 but leaves k at 2, giving 2 + (-24) = -22
    { id: "B", text: "$-22$" },
    { id: "C", text: "$-18$" },
    // distractor: finds k = 6 correctly but reports k alone instead of k + m
    { id: "D", text: "$6$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Matching $5x$ to $15x$ means the whole equation was multiplied by $3$: $6y = 15x - 24$. So $k = 6$, $m = -24$, and $k + m = -18$.\n\n**The Full Solution:**\nStep 1: If every point of line $\\ell$ lies on line $n$, the two lines are identical, so one equation is a nonzero constant multiple of the other.\nStep 2: The $x$-term goes from $5x$ to $15x$, so the multiplier is $3$. Multiplying every term of $2y = 5x - 8$ by $3$ gives $6y = 15x - 24$, so $k = 6$ and $m = -24$.\nStep 3: Therefore $k + m = 6 + (-24) = -18$. Check by slope: $2y = 5x - 8$ gives $y = \\frac{5}{2}x - 4$, and $6y = 15x - 24$ gives $y = \\frac{5}{2}x - 4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-24$): this is $m$. Both constants are found correctly, but only one is reported.\n* Choice B ($-22$): applies the multiplier of $3$ to the right side but leaves the left side as $2y$, so $k$ stays $2$. Scaling must reach every term.\n* Choice D ($6$): this is $k$, the other half of the requested sum.\n\n**Test Day Takeaway:** Identical lines means one equation is the other times a single constant. Find the multiplier from the term you can compare, apply it to every term, and then reread which combination the question wants.",
  skills: ["system-solution-types", "infinite-solutions-condition"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A public health model estimates the number of reported cases of a tick-borne illness in a county as $P(t) = 1{,}450(1.06)^t$, where $t$ is the number of years after $2016$. Which of the following best describes what the value $1.06$ indicates about the estimated number of reported cases?",
  choices: [
    // distractor: reads the growth factor as a fixed number of cases added each year, which would make the model linear
    { id: "A", text: "The estimated number of reported cases increases by $1.06$ each year." },
    { id: "B", text: "The estimated number of reported cases increases by $6\\%$ each year." },
    // distractor: converts the factor 1.06 into 106 percent growth instead of recognizing 1.06 as 100 percent plus 6 percent
    { id: "C", text: "The estimated number of reported cases increases by $106\\%$ each year." },
    // distractor: describes a value of the model at t = 1 and misstates the 2016 value, which is 1,450 because 1.06 to the zero power is 1
    { id: "D", text: "The estimated number of reported cases in $2016$ is $1.06$ times $1{,}450$." }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Exponential Growth Interpretation**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** In $a \\cdot b^t$, the base $b$ is the yearly multiplier. Here $b = 1.06 = 1 + 0.06$, so the count grows by $6\\%$ per year.\n\n**The Full Solution:**\nStep 1: The model has the form $P(t) = a \\cdot b^t$ with $a = 1{,}450$ and $b = 1.06$. The value $a$ is the count when $t = 0$, and $b$ is the factor by which the count is multiplied for each increase of $1$ in $t$.\nStep 2: Increasing $t$ by $1$ multiplies $P$ by $1.06$. Writing $1.06$ as $1 + 0.06$ separates the part that is kept, $100\\%$, from the part that is added, $6\\%$.\nStep 3: So each year the estimated number of cases is $6\\%$ greater than the year before. Check: $P(0) = 1{,}450$ and $P(1) = 1{,}537$, and $\\frac{1{,}537 - 1{,}450}{1{,}450} = 0.06$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (increases by $1.06$ each year): reads $1.06$ as an amount added rather than a factor multiplied. A fixed yearly increase would make the model linear, of the form $1{,}450 + 1.06t$.\n* Choice C (increases by $106\\%$ each year): reports the whole factor as the growth. A $106\\%$ increase would more than double the count each year, which corresponds to a base of $2.06$.\n* Choice D ($2016$ value is $1.06$ times $1{,}450$): describes one multiplication rather than the yearly rate, and it misstates the $2016$ value: at $t = 0$ the model gives $1{,}450(1.06)^0 = 1{,}450$.\n\n**Test Day Takeaway:** Split the base into $1 + r$ for growth or $1 - r$ for decay. The percent in the answer is $r$, never the whole base, and the coefficient in front is the starting value.",
  skills: ["exponential-growth-decay"]
},
{
  id: 20,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A rectangular solar panel is mounted on a flat roof so that its shorter side measures $x$ inches and its longer side measures $x + 7$ inches. A brace runs straight along a diagonal of the panel and measures $17$ inches. What is the value of $x$?",
  choices: [
    // distractor: adds the two sides and sets the sum equal to the diagonal: x + (x + 7) = 17 gives x = 5
    { id: "A", text: "$5$" },
    { id: "B", text: "$8$" },
    // distractor: subtracts 7 from 17, treating the diagonal and the sides as if they lay along one line
    { id: "C", text: "$10$" },
    // distractor: solves correctly for x = 8 but reports the longer side x + 7 = 15
    { id: "D", text: "$15$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The diagonal splits the rectangle into a right triangle with legs $x$ and $x + 7$, so $x^2 + (x + 7)^2 = 17^2$. That reduces to $(x + 15)(x - 8) = 0$, and a length must be positive, so $x = 8$.\n\n**The Full Solution:**\nStep 1: A diagonal of a rectangle is the hypotenuse of a right triangle whose legs are the two sides. So $x^2 + (x + 7)^2 = 17^2 = 289$.\nStep 2: Expand and collect: $x^2 + x^2 + 14x + 49 = 289$, so $2x^2 + 14x - 240 = 0$. Divide by $2$: $x^2 + 7x - 120 = 0$.\nStep 3: Factor: $(x + 15)(x - 8) = 0$, so $x = -15$ or $x = 8$. A side length cannot be negative, so $x = 8$. Check: the sides are $8$ and $15$, and $8^2 + 15^2 = 64 + 225 = 289 = 17^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): comes from $x + (x + 7) = 17$, adding the two sides instead of using the Pythagorean theorem. The two legs of a right triangle always sum to more than the hypotenuse.\n* Choice C ($10$): comes from $17 - 7$, subtracting the difference in side lengths from the diagonal as though all three lengths lay along one line.\n* Choice D ($15$): this is the longer side, $x + 7$. The equation is solved correctly, but the question asks for $x$.\n\n**Test Day Takeaway:** When both legs carry the same variable, the Pythagorean theorem produces a quadratic. Expect two roots, discard the negative one because it is a length, and confirm which side the question named.",
  skills: ["pythagorean-theorem"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Right triangle $PQR$ is shown, with the right angle at vertex $Q$ and with the side from $P$ to $Q$ measuring $24$ units. The lengths of the other two sides are not marked in the figure. Given that $\\tan(P) = \\frac{3}{4}$, what is the length, in units, of the side from $P$ to $R$?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 18]], labels: ["P", "Q", "R"], sideLabels: ["24", "", ""], rightAngleVertex: 1 } },
  choices: [
    // distractor: reports QR, the side opposite angle P, instead of the hypotenuse PR
    { id: "A", text: "$18$" },
    { id: "B", text: "$30$" },
    // distractor: scales the 3-4-5 triple from the wrong leg, dividing 24 by 3 and multiplying by 5
    { id: "C", text: "$40$" },
    // distractor: adds the two legs, 24 + 18, instead of applying the Pythagorean theorem
    { id: "D", text: "$42$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\tan(P) = \\frac{QR}{PQ} = \\frac{3}{4}$ with $PQ = 24$ gives $QR = 18$. The legs $18$ and $24$ are a $3$-$4$-$5$ triple scaled by $6$, so $PR = 30$.\n\n**The Full Solution:**\nStep 1: The right angle is at $Q$, so from angle $P$ the opposite side is $\\overline{QR}$ and the adjacent side is $\\overline{PQ}$. Therefore $\\tan(P) = \\frac{QR}{PQ}$.\nStep 2: Substitute the given values: $\\frac{QR}{24} = \\frac{3}{4}$, so $QR = 24 \\cdot \\frac{3}{4} = 18$.\nStep 3: The side from $P$ to $R$ is the hypotenuse, so $PR = \\sqrt{24^2 + 18^2} = \\sqrt{576 + 324} = \\sqrt{900} = 30$. Check: $18$, $24$, $30$ is the $3$-$4$-$5$ triple scaled by $6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): this is $QR$, the leg found in the middle step. It is the side opposite angle $P$, not the side from $P$ to $R$.\n* Choice C ($40$): scales the $3$-$4$-$5$ triple using the wrong leg, matching $24$ to the $3$ instead of the $4$: $24 \\div 3 = 8$ and $8 \\times 5 = 40$.\n* Choice D ($42$): adds the legs, $24 + 18$. The hypotenuse is always shorter than the sum of the legs, so this value can be ruled out on sight.\n\n**Test Day Takeaway:** Name the sides relative to the angle in the ratio before you compute — opposite over adjacent for tangent. Then check whether the question wants a leg or the hypotenuse, and look for a familiar triple to skip the arithmetic.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "For each of the $26$ games a soccer team played last season, the table records how many goals the team scored and how many games ended with that number of goals. What is the median number of goals per game for the season?",
  diagram: { type: "dataTable", params: { headers: ["Goals scored", "Number of games"], rows: [["1", "5"], ["2", "8"], ["3", "4"], ["4", "6"], ["5", "3"]] } },
  choices: [
    // distractor: reports the mode, the goal total with the greatest number of games, instead of the median
    { id: "A", text: "$2$" },
    { id: "B", text: "$2.5$" },
    // distractor: uses only the 14th value and skips averaging it with the 13th
    { id: "C", text: "$3$" },
    // distractor: finds the median of the frequency column 3, 4, 5, 6, 8 instead of the median of the data
    { id: "D", text: "$5$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Median Calculation**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** With $26$ games the median averages the $13$th and $14$th values. Running totals $5$, $13$, $17$ put the $13$th at $2$ goals and the $14$th at $3$ goals, so the median is $2.5$.\n\n**The Full Solution:**\nStep 1: The table describes $26$ values in order, since each row lists a goal total and how many games had it. For an even count of $26$, the median is the average of the $13$th and $14$th values.\nStep 2: Build running totals from the top: games with $1$ goal occupy positions $1$ through $5$; games with $2$ goals occupy positions $6$ through $13$; games with $3$ goals occupy positions $14$ through $17$.\nStep 3: The $13$th value is $2$ and the $14$th value is $3$, so the median is $\\frac{2 + 3}{2} = 2.5$. Check: the frequencies $5 + 8 + 4 + 6 + 3 = 26$, and $13$ values sit at or below $2$ goals while $13$ sit at or above $3$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): this is the mode, the goal total that occurred in the most games. With $8$ games it dominates the table visually, but the median depends on position, not on frequency.\n* Choice C ($3$): takes the $14$th value alone. With an even number of data values the two middle values must be averaged, and here they differ.\n* Choice D ($5$): finds the median of the second column, $3$, $4$, $5$, $6$, $8$. The frequencies count the data; they are not the data.\n\n**Test Day Takeaway:** For a frequency table, write running totals down the rows and find which row contains the middle position. With an even total, locate both middle positions before averaging — they often land in different rows.",
  skills: ["find-median"]
}
      ]
    }
  ]
};

export default practiceTest1;
