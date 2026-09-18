// Practice Test 4 - SAT Math
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// 2 Modules, 22 questions each (44 total)
// Official-calibration recreation (2026-09-01): every item re-authored against
// the CB Educator Question Bank register (docs/TEST_RECREATION_SPEC.md).
// Slot metadata (id/type/difficulty/band/skills/pattern) frozen from the prior
// blueprint: M1 5E/9M/8H, domains 7/6/5/4. M2 3E/6M/13H with the wavy flow —
// easies at Q2/Q6/Q15 (Q15 the mid-module breather), mediums at
// Q1/Q3/Q4/Q8/Q9/Q13, hards at Q5/Q7/Q10-12/Q14/Q16-22.
// Figure density lifted to official ~20%: M1 carries 4 diagram items
// (Q8 scatterplot, Q12/Q22 two-way tables, Q14 data table); M2 carries 4
// (Q1 table of values, Q15 dot plot, Q16 histogram, Q17 right triangle).
// Numeric MC choices sorted ascending (official convention).

export const practiceTest4 = {
  id: "practice-test-4",
  title: "Practice Test 4",
  description: "Full-length SAT Math practice test with 2 modules",
  totalQuestions: 44,
  timePerModule: 35,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      timeLimit: 35,
      questions: [
// Practice Test 4 — Math Module 1 (22 questions)
// Domain mix: 7 Algebra / 6 AdvMath / 5 PSDA / 4 Geo-Trig.

// ===== EASY (Q1–Q5) =====

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A gauge at a weather station collected rainfall at a constant rate during a storm, as shown in the table. At that rate, what was the total accumulation, in millimeters, after $12$ hours?",
  diagram: { type: "dataTable", params: { headers: ["Time (hours)", "Accumulation (centimeters)"], rows: [["2", "1.4"], ["5", "3.5"], ["8", "5.6"]] } },
  choices: [
    // distractor: stops at 8.4 centimeters and never converts to millimeters
    { id: "A", text: "$8.4$" },
    // distractor: converts the 8-hour reading of 5.6 cm to 56 mm and ignores the 12-hour requirement
    { id: "B", text: "$56$" },
    { id: "C", text: "$84$" },
    // distractor: converts centimeters to millimeters with a factor of 100 instead of 10
    { id: "D", text: "$840$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Every row gives $0.7$ cm per hour, so $12$ hours yields $8.4$ cm, and $8.4 \\times 10 = 84$ mm.\n\n**The Full Solution:**\nStep 1: The accumulation is proportional to time, so the constant rate is $\\dfrac{1.4}{2} = 0.7$ centimeter per hour. The other rows agree: $\\dfrac{3.5}{5} = 0.7$ and $\\dfrac{5.6}{8} = 0.7$.\nStep 2: After $12$ hours the gauge holds $0.7 \\times 12 = 8.4$ centimeters.\nStep 3: One centimeter is $10$ millimeters, so $8.4$ cm $= 8.4 \\times 10 = 84$ millimeters.\nCheck: $\\dfrac{84 \\text{ mm}}{12 \\text{ h}} = 7$ mm per hour, and $7$ mm is $0.7$ cm. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8.4$): the correct accumulation, but left in centimeters — the question asks for millimeters.\n* Choice B ($56$): converts the last row of the table, $5.6$ cm, to $56$ mm and never extends the rate to $12$ hours.\n* Choice D ($840$): multiplies $8.4$ by $100$, the centimeter-to-millimeter factor confused with the meter-to-centimeter factor.\n\n**Test Day Takeaway:** Finish the proportion first, then convert once — and check the unit named in the last five words of the question.",
  skills: ["unit-conversion"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A limnologist's linear model gives the depth of a lake's oxygen-poor layer as $3.2$ meters in week $5$ and $9.6$ meters in week $13$. What is the slope of this model, in meters per week?",
  choices: [
    // distractor: subtracts the depths in the reverse order while keeping the weeks in order: (3.2 - 9.6)/(13 - 5) = -0.8
    { id: "A", text: "$-0.8$" },
    { id: "B", text: "$0.8$" },
    // distractor: inverts the ratio, computing (13 - 5)/(9.6 - 3.2) = 1.25
    { id: "C", text: "$1.25$" },
    // distractor: reports the change in depth, 9.6 - 3.2 = 6.4, without dividing by the 8 weeks
    { id: "D", text: "$6.4$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Slope from Two Points**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** The depth climbs $6.4$ meters across $8$ weeks, and $\\dfrac{6.4}{8} = 0.8$.\n\n**The Full Solution:**\nStep 1: The two measurements are the points $(5, 3.2)$ and $(13, 9.6)$, with the week as the input.\nStep 2: Slope is $\\dfrac{y_2 - y_1}{x_2 - x_1} = \\dfrac{9.6 - 3.2}{13 - 5} = \\dfrac{6.4}{8}$.\nStep 3: $\\dfrac{6.4}{8} = 0.8$ meter per week.\nCheck: starting at $3.2$ m in week $5$ and adding $0.8$ m for each of $8$ weeks gives $3.2 + 6.4 = 9.6$ m in week $13$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-0.8$): subtracts the depths in one order and the weeks in the other, $\\dfrac{3.2 - 9.6}{13 - 5}$; the layer is deepening, so a negative slope contradicts the data.\n* Choice C ($1.25$): inverts the ratio to $\\dfrac{13 - 5}{9.6 - 3.2}$, which measures weeks per meter, not meters per week.\n* Choice D ($6.4$): reports only the change in depth and forgets to divide by the $8$ weeks it took.\n\n**Test Day Takeaway:** Keep the same point first in both subtractions, and let the requested units tell you which difference belongs on top.",
  skills: ["slope-from-points"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "An alpine station recorded $38$ days above freezing in 2019 and $46$ such days in 2024. Which expression gives the percent increase in the number of days above freezing?",
  choices: [
    // distractor: reports the 2019 count as a percent of the 2024 count (82.6), not an increase
    { id: "A", text: "$\\frac{38}{46} \\cdot 100$" },
    // distractor: reports the 2024 count as a percent of the 2019 count (121.1); the increase is that minus 100
    { id: "B", text: "$\\frac{46}{38} \\cdot 100$" },
    // distractor: divides the 8-day increase by the new count instead of the original, giving 17.4 rather than 21.1
    { id: "C", text: "$\\frac{46 - 38}{46} \\cdot 100$" },
    { id: "D", text: "$\\frac{46 - 38}{38} \\cdot 100$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Increase**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** Percent increase is $\\dfrac{\\text{increase}}{\\text{original}} \\cdot 100$, and the original year is 2019.\n\n**The Full Solution:**\nStep 1: The increase is $46 - 38 = 8$ days.\nStep 2: Percent increase compares that increase to the starting count, so the denominator is the 2019 count, $38$.\nStep 3: The expression is $\\dfrac{46 - 38}{38} \\cdot 100$, which evaluates to about $21.1$ percent.\nCheck: raising $38$ by $21.1$ percent gives $38 \\cdot 1.211 \\approx 46$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{38}{46} \\cdot 100$): about $82.6$; this says the 2019 count was $82.6$ percent of the 2024 count, which is a comparison, not an increase.\n* Choice B ($\\frac{46}{38} \\cdot 100$): about $121.1$; the new count is $121.1$ percent of the old, so the increase is $21.1$ percent, not $121.1$.\n* Choice C ($\\frac{46 - 38}{46} \\cdot 100$): about $17.4$; it divides by the new count, which answers percent decrease from 2024 back to 2019.\n\n**Test Day Takeaway:** The denominator of a percent change is always the amount you started with — read the sentence for the earlier year.",
  skills: ["percent-of-value", "percent-change"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The total distance $D$, in kilometers, a cyclist has logged after $w$ weeks of a training block is modeled by $D = 185w + 640$. How many kilometers had the cyclist logged when the block began?",
  choices: [
    // distractor: reports the weekly rate 185 instead of the starting total
    { id: "A", text: "$185$" },
    // distractor: subtracts one week of riding from the starting total: 640 - 185 = 455
    { id: "B", text: "$455$" },
    { id: "C", text: "$640$" },
    // distractor: evaluates the model at w = 1 instead of w = 0: 185 + 640 = 825
    { id: "D", text: "$825$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Slope-Intercept Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** The block begins at $w = 0$, and $D = 185(0) + 640 = 640$.\n\n**The Full Solution:**\nStep 1: In $D = 185w + 640$, the variable $w$ counts weeks since the block began, so the beginning is $w = 0$.\nStep 2: Substituting gives $D = 185(0) + 640 = 640$ kilometers.\nStep 3: In slope-intercept form the constant term is the value of the output when the input is zero, so $640$ is the distance already logged.\nCheck: after $2$ weeks the model gives $185(2) + 640 = 1{,}010$, which is $640$ plus two weeks of riding. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($185$): this is the slope, the kilometers added each week, not the amount already logged.\n* Choice B ($455$): subtracts one week of riding from $640$, as if the block began at $w = -1$.\n* Choice D ($825$): evaluates the model at $w = 1$, one week into the block rather than at its start.\n\n**Test Day Takeaway:** \"At the start\" always means substitute zero — the constant term is the answer before you write anything down.",
  skills: ["slope-intercept-form"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "Wildlife officers model a beaver colony's population by $P(t) = -3(t - 8)^2 + 240$, with $t$ measured in years after 2010. Which of the following is equivalent to $P(t)$?",
  choices: [
    { id: "A", text: "$-3t^2 + 48t + 48$" },
    // distractor: distributes -3 across -16t as -48t, flipping the sign of the middle term
    { id: "B", text: "$-3t^2 - 48t + 48$" },
    // distractor: subtracts only 64 from 240 instead of 3(64) = 192, giving 176
    { id: "C", text: "$-3t^2 + 48t + 176$" },
    // distractor: adds 192 to 240 instead of subtracting it, giving 432
    { id: "D", text: "$-3t^2 + 48t + 432$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $(t - 8)^2 = t^2 - 16t + 64$, and $-3$ times that is $-3t^2 + 48t - 192$; adding $240$ leaves $+48$.\n\n**The Full Solution:**\nStep 1: Square the binomial: $(t - 8)^2 = t^2 - 16t + 64$.\nStep 2: Distribute the $-3$ to all three terms: $-3t^2 + 48t - 192$.\nStep 3: Add the constant $240$: $-3t^2 + 48t - 192 + 240 = -3t^2 + 48t + 48$.\nCheck: at $t = 8$ the original gives $240$, and $-3(64) + 48(8) + 48 = -192 + 384 + 48 = 240$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-3t^2 - 48t + 48$): keeps the middle term negative, forgetting that $-3$ times $-16t$ is $+48t$.\n* Choice C ($-3t^2 + 48t + 176$): distributes the $-3$ to the first two terms only, subtracting $64$ instead of $192$ from $240$.\n* Choice D ($-3t^2 + 48t + 432$): adds $192$ to $240$ instead of subtracting, mishandling the sign of the distributed constant.\n\n**Test Day Takeaway:** Expand the square before you distribute, and test one input value in both forms — a single substitution kills every sign error.",
  skills: ["distributive-property", "converting-quadratic-forms"]
},

// ===== MEDIUM (Q6–Q14) =====

{
  id: 6,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "Field ecologists marked a right triangular sampling plot inside a wildlife corridor; both leg lengths appear in the figure, in meters. What is the plot's area, in square meters?",
  diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [5, 0], [5, 7]], sideLabels: ["5√2", "7√2", ""], rightAngleVertex: 1, figureNote: true } },
  correctAnswer: "35",
  explanation: "**SAT Pattern: Right Triangle Area with Surds**\n\n**The correct answer is $35$.**\n\n**The Fast Way (~15s):** $\\dfrac{1}{2}(5\\sqrt{2})(7\\sqrt{2}) = \\dfrac{1}{2}(35)(2) = 35$.\n\n**The Full Solution:**\nStep 1: The two labeled sides meet at the right angle, so they are the base and the height: $5\\sqrt{2}$ and $7\\sqrt{2}$ meters.\nStep 2: Multiply them, keeping the radicals together: $(5\\sqrt{2})(7\\sqrt{2}) = 35 \\cdot (\\sqrt{2})^2 = 35 \\cdot 2 = 70$.\nStep 3: Half of that product is the area: $\\dfrac{70}{2} = 35$ square meters.\nCheck: $5\\sqrt{2} \\approx 7.07$ and $7\\sqrt{2} \\approx 9.90$, and $\\dfrac{1}{2}(7.07)(9.90) \\approx 35$. $\\checkmark$\n\n**Common Mistakes:** Multiplying $5 \\cdot 7$ and halving while dropping $\\sqrt{2} \\cdot \\sqrt{2} = 2$ gives $17.5$; multiplying the legs but forgetting the factor of $\\dfrac{1}{2}$ gives $70$; carrying one radical through and reporting $35\\sqrt{2} \\approx 49.5$.\n\n**Test Day Takeaway:** When both legs carry the same radical, multiply the radicals first — $\\sqrt{2} \\cdot \\sqrt{2} = 2$ turns a messy product into a whole number.",
  skills: ["triangle-area"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A decathlete's first five discus throws measured $41.2$, $44.8$, $39.6$, $46.0$, and $43.4$ meters. How long must the sixth throw be for the mean of all six throws to be $44.0$ meters?",
  choices: [
    // distractor: assumes the missing value must equal the target mean of 44.0
    { id: "A", text: "$44.0$" },
    // distractor: adds the 1.0-meter shortfall once (44.0 + 1.0) instead of covering all five recorded throws
    { id: "B", text: "$45.0$" },
    { id: "C", text: "$49.0$" },
    // distractor: multiplies the 1.0-meter shortfall by all six throws (44.0 + 6.0) instead of the five already recorded
    { id: "D", text: "$50.0$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Mean from List**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Six throws averaging $44.0$ need a total of $264.0$ m; the first five total $215.0$ m, so the sixth is $49.0$ m.\n\n**The Full Solution:**\nStep 1: A mean of $44.0$ across six throws requires a total of $6 \\times 44.0 = 264.0$ meters.\nStep 2: The five recorded throws total $41.2 + 44.8 + 39.6 + 46.0 + 43.4 = 215.0$ meters.\nStep 3: The sixth throw must supply the rest: $264.0 - 215.0 = 49.0$ meters.\nCheck: $\\dfrac{215.0 + 49.0}{6} = \\dfrac{264.0}{6} = 44.0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($44.0$): assumes a value equal to the target mean keeps the mean unchanged, but the first five average only $43.0$, so the mean would stay below $44.0$.\n* Choice B ($45.0$): the five throws fall $1.0$ meter per throw short of $44.0$; this adds that shortfall once instead of five times.\n* Choice D ($50.0$): multiplies the $1.0$-meter shortfall by six throws, but only the five recorded throws are short.\n\n**Test Day Takeaway:** Turn a mean into a total before you do anything else — mean questions are addition problems in disguise.",
  skills: ["calculate-mean"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Netting from two ponds produced the $250$ fish summarized in the table. If a fish drawn at random from these $250$ has probability $0.28$ of being tagged, how many Pond B fish were tagged?",
  diagram: { type: "twoWayTable", params: { headers: ["", "Tagged", "Not tagged", "Total"], rows: [["Pond A", "32", "118", "150"], ["Pond B", "?", "?", "100"], ["Total", "?", "?", "250"]] } },
  choices: [
    // distractor: applies 0.28 to Pond B's 100 fish instead of the whole sample: 0.28(100) = 28
    { id: "A", text: "$28$" },
    { id: "B", text: "$38$" },
    // distractor: applies 0.28 to Pond A's 150 fish: 0.28(150) = 42
    { id: "C", text: "$42$" },
    // distractor: reports the tagged total for both ponds, 0.28(250) = 70, instead of the Pond B share
    { id: "D", text: "$70$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Marginal Probability**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $0.28(250) = 70$ tagged fish in all, and $70 - 32 = 38$ of them came from Pond B.\n\n**The Full Solution:**\nStep 1: A marginal probability uses the grand total as its denominator, so the number of tagged fish is $0.28 \\times 250 = 70$.\nStep 2: The table reports $32$ tagged fish from Pond A.\nStep 3: The Tagged column must total $70$, so Pond B contributed $70 - 32 = 38$ tagged fish.\nCheck: $\\dfrac{32 + 38}{250} = \\dfrac{70}{250} = 0.28$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($28$): multiplies $0.28$ by Pond B's $100$ fish; the stated probability describes the whole sample, not one pond.\n* Choice C ($42$): multiplies $0.28$ by Pond A's $150$ fish, which would be the tagged count for the wrong pond.\n* Choice D ($70$): this is the tagged total for both ponds combined, one subtraction short of the answer.\n\n**Test Day Takeaway:** A probability given \"for the sample\" is a column total over the grand total — recover the column total first, then split it.",
  skills: ["probability-basics"]
},
{
  id: 9,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A survey drone's first pass is flown along $ax + 6y = 18$, and its second pass runs perpendicular to the first with slope $\\frac{3}{4}$. What is the value of the constant $a$?",
  correctAnswer: "8",
  explanation: "**SAT Pattern: Perpendicular Slope**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~25s):** The first pass must have slope $-\\dfrac{4}{3}$, and $-\\dfrac{a}{6} = -\\dfrac{4}{3}$ gives $a = 8$.\n\n**The Full Solution:**\nStep 1: Solve $ax + 6y = 18$ for $y$: $y = -\\dfrac{a}{6}x + 3$, so the first pass has slope $-\\dfrac{a}{6}$.\nStep 2: Perpendicular slopes are negative reciprocals. Since the second pass has slope $\\dfrac{3}{4}$, the first pass has slope $-\\dfrac{4}{3}$.\nStep 3: Set $-\\dfrac{a}{6} = -\\dfrac{4}{3}$, so $a = 6 \\cdot \\dfrac{4}{3} = 8$.\nCheck: with $a = 8$ the first line is $8x + 6y = 18$, slope $-\\dfrac{8}{6} = -\\dfrac{4}{3}$, and $-\\dfrac{4}{3} \\cdot \\dfrac{3}{4} = -1$. $\\checkmark$\n\n**Common Mistakes:** Reading the first slope as $\\dfrac{a}{6}$ instead of $-\\dfrac{a}{6}$ gives $a = -8$; using the same slope rather than the negative reciprocal, $-\\dfrac{a}{6} = \\dfrac{3}{4}$, gives $a = -4.5$; negating without inverting, $-\\dfrac{a}{6} = -\\dfrac{3}{4}$, gives $a = 4.5$.\n\n**Test Day Takeaway:** Put the given line in $y = mx + b$ form first; the sign that trips people is the one hiding in front of the $x$-coefficient.",
  skills: ["perpendicular-negative-reciprocal"]
},
{
  id: 10,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "A nest-box survey counts $y$ occupied boxes, where $y$ satisfies $9y - 4y + c = 45$ for some constant $c$. The survey found $7$ occupied boxes. What is the value of $c$?",
  correctAnswer: "10",
  explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~15s):** $9y - 4y = 5y$, and $5(7) = 35$, so $c = 45 - 35 = 10$.\n\n**The Full Solution:**\nStep 1: Combine the like terms on the left: $9y - 4y = 5y$, so the equation is $5y + c = 45$.\nStep 2: The survey gives $y = 7$. Substituting, $5(7) + c = 45$, or $35 + c = 45$.\nStep 3: Subtract $35$ from both sides: $c = 10$.\nCheck: $9(7) - 4(7) + 10 = 63 - 28 + 10 = 45$. $\\checkmark$\n\n**Common Mistakes:** Adding the like terms as $13y$ gives $91 + c = 45$ and $c = -46$; substituting $y = 7$ into a single term and computing $45 - 7$ gives $38$; moving $35$ across without changing its sign gives $c = -10$.\n\n**Test Day Takeaway:** Combine like terms before substituting — one clean coefficient turns a two-step problem into a one-step problem.",
  skills: ["combining-like-terms"]
},
{
  id: 11,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "At a track meet an athlete earned points for each scoring finish according to the table. The athlete recorded $24$ scoring finishes worth a total of $100$ points. How many of those finishes were in track events?",
  questionTable: { headers: ["Event type", "Points per scoring finish"], rows: [["Field", "$3$"], ["Track", "$5$"]] },
  choices: [
    // distractor: solves the system correctly but reports the 10 field-event finishes instead of the track finishes
    { id: "A", text: "$10$" },
    { id: "B", text: "$14$" },
    // distractor: divides all 100 points by 5, ignoring the points earned in field events
    { id: "C", text: "$20$" },
    // distractor: subtracts 3(24) = 72 from 100 and reports the remainder 28 without dividing by the 2-point difference
    { id: "D", text: "$28$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** If all $24$ finishes were field events they would be worth $72$ points; each track finish adds $2$ more, and $\\dfrac{100 - 72}{2} = 14$.\n\n**The Full Solution:**\nStep 1: Let $f$ be the field-event finishes and $t$ the track-event finishes. Then $f + t = 24$ and $3f + 5t = 100$.\nStep 2: Substitute $f = 24 - t$ into the points equation: $3(24 - t) + 5t = 100$, or $72 + 2t = 100$.\nStep 3: Solve: $2t = 28$, so $t = 14$ track finishes (and $f = 10$).\nCheck: $3(10) + 5(14) = 30 + 70 = 100$ points from $10 + 14 = 24$ finishes. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): the system is solved correctly, but $10$ is $f$, the field-event count; the question asks for track events.\n* Choice C ($20$): divides all $100$ points by $5$, as if every point came from a track finish, which contradicts the $24$-finish total.\n* Choice D ($28$): stops at $100 - 72 = 28$, the extra points, without dividing by the $2$-point gap between the two event types.\n\n**Test Day Takeaway:** Substitute the count equation into the value equation, then reread which variable the question actually wants.",
  skills: ["substitution-method"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A streamside survey recorded frogs, newts, and salamanders in the ratio $5 : 3 : k$, where $k$ is a positive constant. The survey recorded $448$ amphibians in all, $160$ of them frogs. What is the value of $k$?",
  choices: [
    // distractor: copies the newt term of the ratio instead of solving for the salamander term
    { id: "A", text: "$3$" },
    { id: "B", text: "$6$" },
    // distractor: computes (448 - 160)/32 = 9, the newt-and-salamander parts together, and forgets to remove the 3 newt parts
    { id: "C", text: "$9$" },
    // distractor: reports the total number of parts, 448/32 = 14, instead of the salamander part k
    { id: "D", text: "$14$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** One part is $\\dfrac{160}{5} = 32$ amphibians, the survey holds $\\dfrac{448}{32} = 14$ parts, and $14 - 5 - 3 = 6$.\n\n**The Full Solution:**\nStep 1: The ratio $5 : 3 : k$ means the counts are $5p$, $3p$, and $kp$ for one common part size $p$. The frogs give $5p = 160$, so $p = 32$.\nStep 2: The total count is $(5 + 3 + k)p = 448$, so $5 + 3 + k = \\dfrac{448}{32} = 14$.\nStep 3: Therefore $k = 14 - 8 = 6$.\nCheck: the counts are $5(32) = 160$ frogs, $3(32) = 96$ newts, and $6(32) = 192$ salamanders, and $160 + 96 + 192 = 448$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): copies the newt term straight out of the ratio; the salamander term is what the question asks for.\n* Choice C ($9$): divides the $288$ non-frog amphibians by $32$ to get $9$ parts, which still includes the $3$ newt parts.\n* Choice D ($14$): this is the total number of parts in the ratio, not the salamander share of them.\n\n**Test Day Takeaway:** Find the size of one part first; every other quantity in a ratio problem is then a multiplication or a subtraction away.",
  skills: ["word-problem-to-equation"]
},
{
  id: 13,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "Meteorologists need a radar's coverage disk, given by $x^2 + y^2 - 12x + 10y + c = 0$ with kilometers on both axes, to enclose an area of $64\\pi$ square kilometers. What value must the constant $c$ have?",
  choices: [
    { id: "A", text: "$-3$" },
    // distractor: solves 61 - c = 64 correctly but reports the opposite sign, 3 instead of -3
    { id: "B", text: "$3$" },
    // distractor: takes the radius 8 from the area and sets 61 - c = 8 instead of 61 - c = 64
    { id: "C", text: "$53$" },
    // distractor: moves c to the wrong side, computing 61 + 64 = 125
    { id: "D", text: "$125$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Area $64\\pi$ means $r^2 = 64$, and completing both squares gives $61 - c = 64$, so $c = -3$.\n\n**The Full Solution:**\nStep 1: The area of a circle is $\\pi r^2$, so $\\pi r^2 = 64\\pi$ and $r^2 = 64$.\nStep 2: Group and complete the square in each variable: $x^2 - 12x$ needs $36$ and $y^2 + 10y$ needs $25$, giving $(x - 6)^2 + (y + 5)^2 = 36 + 25 - c = 61 - c$.\nStep 3: Set the right side equal to $r^2$: $61 - c = 64$, so $c = -3$.\nCheck: with $c = -3$ the equation is $(x - 6)^2 + (y + 5)^2 = 64$, a circle of radius $8$ and area $64\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($3$): the arithmetic $61 - c = 64$ is right, but the sign is dropped when solving; $c = 3$ would leave $r^2 = 58$.\n* Choice C ($53$): finds the radius $8$ and sets $61 - c = 8$, matching the radius instead of its square.\n* Choice D ($125$): adds $64$ to $61$, as though $c$ moved to the right side without a sign change.\n\n**Test Day Takeaway:** In general form, the completed-square constant equals $r^2$ — convert an area or a circumference to $r^2$ before you compare.",
  skills: ["circle-equation", "completing-square-circles"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A hydrologist's two snowmelt curves cross exactly once during a thaw, which makes $2x^2 + bx + 50 = 0$ have a single repeated real root. Given that the constant $b$ is positive, what is its value?",
  choices: [
    // distractor: divides the constant by the leading coefficient before taking the root, computing the square root of 50/2 = 25
    { id: "A", text: "$5$" },
    // distractor: computes the square root of ac = 100 and omits the factor of 2 in b = 2 times the square root of ac
    { id: "B", text: "$10$" },
    { id: "C", text: "$20$" },
    // distractor: stops at b squared = 4ac = 400 and never takes the square root
    { id: "D", text: "$400$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Discriminant Analysis**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** One repeated root means $b^2 = 4ac = 4(2)(50) = 400$, so the positive $b$ is $20$.\n\n**The Full Solution:**\nStep 1: A quadratic equation has exactly one real solution when its discriminant $b^2 - 4ac$ equals $0$.\nStep 2: Here $a = 2$ and $c = 50$, so $b^2 - 4(2)(50) = 0$, or $b^2 = 400$.\nStep 3: The two roots of $b^2 = 400$ are $20$ and $-20$; the problem states $b$ is positive, so $b = 20$.\nCheck: $2x^2 + 20x + 50 = 2(x + 5)^2$, which is zero only at $x = -5$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): divides $50$ by $2$ first and takes $\\sqrt{25}$, mixing up the roles of $a$ and $c$ in the discriminant.\n* Choice B ($10$): computes $\\sqrt{ac} = \\sqrt{100} = 10$ but drops the factor of $2$ in $b = 2\\sqrt{ac}$.\n* Choice D ($400$): this is $b^2$, not $b$ — the last square root never gets taken.\n\n**Test Day Takeaway:** \"Exactly one solution\" is always $b^2 = 4ac$; write that equation before touching the numbers, then finish with the square root.",
  skills: ["discriminant-analysis"]
},

// ===== HARD (Q15–Q22) =====

{
  id: 15,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A station's daily temperature departure from normal is modeled by $y = 2x^2 - 12x + c$, where $x$ is the day of a cold spell and $c$ is a constant. The model's two zeros, $r$ and $s$, satisfy $r - s = 4$. What is the value of $c$?",
  correctAnswer: "10",
  explanation: "**SAT Pattern: Distance Between x-Intercepts**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~35s):** The zeros are $3 \\pm 2$, so $y = 2(x - 1)(x - 5)$ and the constant term is $2(1)(5) = 10$.\n\n**The Full Solution:**\nStep 1: The zeros of $y = 2x^2 - 12x + c$ are symmetric about the axis of symmetry $x = \\dfrac{12}{2(2)} = 3$.\nStep 2: Zeros $4$ units apart sit $2$ units on either side of $3$, so $r = 5$ and $s = 1$.\nStep 3: Then $y = 2(x - 5)(x - 1) = 2x^2 - 12x + 10$, so $c = 10$.\nCheck: the quadratic formula gives $x = \\dfrac{12 \\pm \\sqrt{144 - 80}}{4} = \\dfrac{12 \\pm 8}{4}$, which is $5$ and $1$, and $5 - 1 = 4$. $\\checkmark$\n\n**Common Mistakes:** Ignoring the leading coefficient and factoring as $(x - 4)(x - 8)$ around a vertex at $x = 6$ gives $c = 32$; using the whole separation of $4$ as the distance from the axis, so the zeros are $-1$ and $7$, gives $c = 2(-1)(7) = -14$; setting the discriminant itself equal to $4$ rather than its square root gives $144 - 8c = 4$ and $c = 17.5$.\n\n**Test Day Takeaway:** The zeros of a parabola straddle the axis of symmetry — half the gap on each side turns a distance clue into two exact roots.",
  skills: ["quadratics"]
},
{
  id: 16,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The bar graph gives a rower's fatigue index on four days of a seven-day training block. The index on day $x$ is modeled by $y = 6x^2 - 48x + 102$. What is the minimum index value this model predicts during the block?",
  diagram: { type: "barChart", params: { data: [{ label: "Day 1", value: 60 }, { label: "Day 2", value: 30 }, { label: "Day 6", value: 30 }, { label: "Day 7", value: 60 }], xAxisLabel: "Training day", yAxisLabel: "Fatigue index", yMax: 70, yStep: 10 } },
  choices: [
    // distractor: reports the day the minimum occurs, x = 4, instead of the index value there
    { id: "A", text: "$4$" },
    { id: "B", text: "$6$" },
    // distractor: reads the shortest bar in the graph, 30, instead of the model's minimum
    { id: "C", text: "$30$" },
    // distractor: reads the constant term 102 of the standard form as the minimum
    { id: "D", text: "$102$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $6x^2 - 48x + 102 = 6(x - 4)^2 + 6$, so the least value the model takes is $6$.\n\n**The Full Solution:**\nStep 1: Factor $6$ out of the variable terms: $6(x^2 - 8x) + 102$.\nStep 2: Complete the square inside: $x^2 - 8x = (x - 4)^2 - 16$, so the model is $6[(x - 4)^2 - 16] + 102 = 6(x - 4)^2 - 96 + 102$.\nStep 3: That simplifies to $6(x - 4)^2 + 6$. Since $6(x - 4)^2$ is never negative, the smallest value of $y$ is $6$, reached on day $4$.\nCheck: substituting $x = 4$ into the original gives $6(16) - 48(4) + 102 = 96 - 192 + 102 = 6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): this is the day on which the minimum occurs, the $x$-coordinate of the vertex, not the index value.\n* Choice C ($30$): the lowest bar shown, but days $3$ through $5$ are not charted, and the model dips well below $30$ there.\n* Choice D ($102$): the constant term is the value at day $0$, before the block began, not the minimum.\n\n**Test Day Takeaway:** Factor the leading coefficient out of the $x$ terms only — the number left outside the square is the minimum, and the number inside is where it happens.",
  skills: ["quadratics"]
},
{
  id: 17,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "Sliding the graph of $y = -(x - 5)^2 + 12$ left by $a$ units and down by $3$ units produces the graph of $g$, whose peak lies on the line $y = x + 13$. What is the value of $a$?",
  correctAnswer: "9",
  explanation: "**SAT Pattern: Function Transformation**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~30s):** The peak of $g$ is $(5 - a, 9)$, and $9 = (5 - a) + 13$ gives $a = 9$.\n\n**The Full Solution:**\nStep 1: In vertex form $y = -(x - 5)^2 + 12$, the graph peaks at $(5, 12)$. Sliding it down $3$ units lowers that peak to height $12 - 3 = 9$.\nStep 2: A translation $a$ units to the left replaces $x$ with $x + a$, so $g(x) = -(x + a - 5)^2 + 9$ and its peak sits where $x + a = 5$, at the point $(5 - a, 9)$.\nStep 3: That point lies on $y = x + 13$, so $9 = (5 - a) + 13 = 18 - a$, and $a = 9$.\nCheck: with $a = 9$, $g(x) = -(x + 4)^2 + 9$, whose peak $(-4, 9)$ satisfies $9 = -4 + 13$. $\\checkmark$\n\n**Common Mistakes:** Writing the leftward shift as $x - a$ puts the peak at $5 + a$ and turns the condition into $9 = 5 + a + 13$, giving $a = -9$; forgetting the downward shift and leaving the peak at height $12$ gives $12 = 18 - a$ and $a = 6$; solving correctly but reporting the peak's $x$-coordinate, $5 - 9 = -4$, instead of $a$.\n\n**Test Day Takeaway:** Write the shifted vertex as a point — height first, then $x$ — before you use any condition the vertex has to satisfy.",
  skills: ["function-transformations", "vertex-form"]
},
{
  id: 18,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The three sides of a right-triangular cross-country loop total $90$ meters, and the sine of the loop's smallest angle is $\\frac{5}{13}$. Which of the following expressions gives the length, in meters, of the side opposite that angle?",
  choices: [
    // distractor: uses the tangent ratio 5/12 and applies it to the perimeter, giving 37.5
    { id: "A", text: "$\\frac{5}{12} \\cdot 90$" },
    // distractor: applies the sine ratio to the perimeter as if the perimeter were the hypotenuse, giving about 34.6
    { id: "B", text: "$\\frac{5}{13} \\cdot 90$" },
    // distractor: gives the hypotenuse's share of the perimeter, 39, instead of the opposite side
    { id: "C", text: "$\\frac{13}{30} \\cdot 90$" },
    { id: "D", text: "$\\frac{5}{30} \\cdot 90$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Sine $\\frac{5}{13}$ makes the sides $5k$, $12k$, $13k$, a total of $30k$; the opposite side is $\\frac{5}{30}$ of the perimeter.\n\n**The Full Solution:**\nStep 1: Sine is opposite over hypotenuse, so the opposite side is $5k$ and the hypotenuse is $13k$ for some positive $k$.\nStep 2: The third side follows from the Pythagorean theorem: $\\sqrt{(13k)^2 - (5k)^2} = 12k$. The three sides are $5k$, $12k$, and $13k$, so the perimeter is $30k$.\nStep 3: The opposite side is therefore $\\dfrac{5k}{30k}$ of the perimeter, or $\\dfrac{5}{30} \\cdot 90 = 15$ meters.\nCheck: $k = 3$ makes the sides $15$, $36$, and $39$, which total $90$, and $\\dfrac{15}{39} = \\dfrac{5}{13}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{5}{12} \\cdot 90 = 37.5$): uses the tangent ratio, and applies it to the perimeter rather than to the adjacent side.\n* Choice B ($\\frac{5}{13} \\cdot 90 \\approx 34.6$): treats the $90$-meter perimeter as the hypotenuse; the hypotenuse is only $39$ meters.\n* Choice C ($\\frac{13}{30} \\cdot 90 = 39$): correctly splits the perimeter into $30$ parts but returns the hypotenuse instead of the opposite side.\n\n**Test Day Takeaway:** A trig ratio fixes the whole side triple up to a scale factor — add the parts, match the sum to the perimeter, and every side follows.",
  skills: ["soh-cah-toa"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The right-triangular mainsail of a racing yacht encloses $756$ square feet of cloth, and the tangent of the angle at its head equals $\\frac{7}{24}$. How long, in feet, is the longest edge of the sail?",
  choices: [
    // distractor: reports the shorter leg, 7k = 21, the side opposite the head angle
    { id: "A", text: "$21$" },
    // distractor: reports the hypotenuse of the basic 7-24-25 triangle without applying the scale factor k = 3
    { id: "B", text: "$25$" },
    // distractor: reports the longer leg, 24k = 72, instead of the hypotenuse
    { id: "C", text: "$72$" },
    { id: "D", text: "$75$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** Legs $7k$ and $24k$ give area $84k^2 = 756$, so $k = 3$ and the hypotenuse is $25(3) = 75$.\n\n**The Full Solution:**\nStep 1: Tangent is opposite over adjacent, so the two legs are $7k$ and $24k$ for some positive $k$.\nStep 2: The legs of a right triangle are its base and height, so the area is $\\dfrac{1}{2}(7k)(24k) = 84k^2$. Setting $84k^2 = 756$ gives $k^2 = 9$ and $k = 3$.\nStep 3: The legs are $21$ and $72$ feet, and $7$-$24$-$25$ is a Pythagorean triple, so the hypotenuse — the longest edge — is $25(3) = 75$ feet.\nCheck: $21^2 + 72^2 = 441 + 5{,}184 = 5{,}625 = 75^2$, and $\\dfrac{1}{2}(21)(72) = 756$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($21$): the leg opposite the head angle, $7k$; it is the shortest edge, not the longest.\n* Choice B ($25$): the hypotenuse of the unscaled $7$-$24$-$25$ triangle, which has area $84$, not $756$.\n* Choice C ($72$): the longer leg, $24k$; the hypotenuse of a right triangle is always longer than either leg.\n\n**Test Day Takeaway:** A tangent value fixes the legs up to one scale factor — use the area to pin that factor down, then read off whichever side is asked for.",
  skills: ["soh-cah-toa", "pythagorean-theorem"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A survey crew's total cost is a fixed permit fee plus the same charge for each transect walked. A twelve-transect survey cost $\\$1{,}320$ and a thirty-transect survey of the same wetland cost $\\$2{,}940$. What is the permit fee, in dollars?",
  correctAnswer: "240",
  explanation: "**SAT Pattern: Linear Cost Setup**\n\n**The correct answer is $240$.**\n\n**The Fast Way (~40s):** Eighteen extra transects cost $\\$1{,}620$, so each is $\\$90$; then $1{,}320 - 12(90) = 240$.\n\n**The Full Solution:**\nStep 1: Model the cost as $C = rt + f$, where $r$ is the charge per transect, $t$ is the number of transects, and $f$ is the permit fee.\nStep 2: Subtract the two conditions: $2{,}940 - 1{,}320 = 1{,}620$ covers $30 - 12 = 18$ extra transects, so $r = \\dfrac{1{,}620}{18} = 90$ dollars per transect.\nStep 3: Substitute into the first condition: $1{,}320 = 90(12) + f = 1{,}080 + f$, so $f = 240$ dollars.\nCheck: thirty transects would cost $90(30) + 240 = 2{,}700 + 240 = 2{,}940$. $\\checkmark$\n\n**Common Mistakes:** Reporting the per-transect charge $90$ instead of the fee; treating $\\dfrac{1{,}320}{12} = 110$ as the per-transect charge, which leaves a fee of $0$; dividing the $\\$1{,}620$ difference by $12$ instead of $18$, which gives $r = 135$ and a fee of $-300$.\n\n**Test Day Takeaway:** Two cost points give the rate by subtraction first — the fixed fee is whatever is left over once the rate is paid for.",
  skills: ["word-problem-to-equation"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "The table gives measured snow depths at a station, and the model $S(d) = -2d^2 + 44d - 150$ fits them, where $S$ is the depth in centimeters on day $d$ of the season. On how many days does the model give a depth of at least $90$ centimeters?",
  diagram: { type: "dataTable", params: { headers: ["Day d", "Measured depth (cm)"], rows: [["5", "20"], ["8", "74"], ["14", "74"], ["17", "20"]] } },
  choices: [
    // distractor: solves S(d) = 90 and counts its two solutions, d = 10 and d = 12, instead of the days between them
    { id: "A", text: "$2$" },
    { id: "B", text: "$3$" },
    // distractor: divides by -2 without reversing the inequality, gets d at most 10 or d at least 12, and counts the 12 whole days there with positive depth
    { id: "C", text: "$12$" },
    // distractor: drops the 90 and solves S(d) at least 0, counting days 5 through 17
    { id: "D", text: "$13$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** $S(d) \\ge 90$ reduces to $(d - 10)(d - 12) \\le 0$, so $10 \\le d \\le 12$ — three days.\n\n**The Full Solution:**\nStep 1: Write the condition: $-2d^2 + 44d - 150 \\ge 90$, so $-2d^2 + 44d - 240 \\ge 0$.\nStep 2: Divide by $-2$ and reverse the inequality: $d^2 - 22d + 120 \\le 0$, which factors as $(d - 10)(d - 12) \\le 0$.\nStep 3: A product of two factors is at most zero between the roots, so $10 \\le d \\le 12$. The whole days are $10$, $11$, and $12$ — three of them.\nCheck: $S(10) = -200 + 440 - 150 = 90$, $S(11) = -242 + 484 - 150 = 92$, and $S(13) = -338 + 572 - 150 = 84$, which is below $90$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): solves the equation $S(d) = 90$ and counts its two roots, $d = 10$ and $d = 12$; the question asks for every day in between as well.\n* Choice C ($12$): divides by $-2$ without flipping the inequality sign, which reverses the solution set to $d \\le 10$ or $d \\ge 12$ and counts the $12$ days from $5$ to $17$ outside the true window.\n* Choice D ($13$): ignores the $90$-centimeter threshold and counts every day the model keeps the depth positive, days $5$ through $17$.\n\n**Test Day Takeaway:** Move everything to one side, then divide by the negative leading coefficient and flip the sign — the flip is the whole question.",
  skills: ["quadratics"]
},
{
  id: 22,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A swimmer's pace over an entire open-water race was $1$ minute $15$ seconds for every $100$ meters swum. At that pace, what was the swimmer's speed, in kilometers per hour?",
  choices: [
    { id: "A", text: "$4.8$" },
    // distractor: reads the 75-second split as the time for a whole kilometer: 3,600/75 = 48
    { id: "B", text: "$48$" },
    // distractor: computes meters per minute, 100/1.25 = 80, and never converts to kilometers per hour
    { id: "C", text: "$80$" },
    // distractor: computes meters per hour, (100/75)(3,600) = 4,800, and stops before converting meters to kilometers
    { id: "D", text: "$4{,}800$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Unit Conversion**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** $100$ meters every $75$ seconds is $1$ kilometer every $750$ seconds, and $\\dfrac{3{,}600}{750} = 4.8$.\n\n**The Full Solution:**\nStep 1: Write the pace in a single unit of time: $1$ minute $15$ seconds is $75$ seconds per $100$ meters.\nStep 2: A kilometer is $1{,}000$ meters, which is ten of those $100$-meter lengths, so a kilometer takes $10 \\times 75 = 750$ seconds.\nStep 3: An hour is $3{,}600$ seconds, so the swimmer covers $\\dfrac{3{,}600}{750} = 4.8$ kilometers in an hour.\nCheck: $4.8$ kilometers is $4{,}800$ meters in $3{,}600$ seconds, which is $100$ meters every $75$ seconds. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($48$): reads the $75$-second split as the time for a whole kilometer, giving $\\dfrac{3{,}600}{75} = 48$ — ten times too fast.\n* Choice C ($80$): computes $\\dfrac{100}{1.25} = 80$, the right arithmetic in the wrong units; that is meters per minute.\n* Choice D ($4{,}800$): computes $\\dfrac{100}{75} \\cdot 3{,}600 = 4{,}800$ meters per hour and stops one conversion short.\n\n**Test Day Takeaway:** Convert a pace to the time for one whole unit of distance before inverting it — a rate quoted per $100$ meters hides a factor of ten from every step that follows.",
  skills: ["unit-conversion"]
}
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 35,
      questions: [
// Practice Test 4 — Math Module 2 (22 questions)
// Distribution: 3E / 6M / 13H. Calibrated to Bluebook Module 2 Hard.
//   Easy (band 3):   Q2 (margin of error), Q6 (percent of a total), Q15 (range breather).
//   Medium (band 4-5): Q1, Q3, Q4, Q8, Q9, Q13.
//   Hard (band 6-7): Q5, Q7, Q10, Q11, Q12, Q14, Q16, Q17, Q18, Q19, Q20, Q21, Q22.
// Q1-5 warm-up bar: every opener needs 2+ steps or a trap (no one-formula plug-ins,
// no Pythagorean-variant traps — tests 1 and 3 own those).
// Diagrams: Q1 (table of values), Q15 (dot plot), Q16 (histogram), Q17 (right triangle).

{
  id: 1,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A water utility's turbidity specification is $|t - c| = d$, where $c$ and $d$ are positive constants and $t$ is a reading in NTU. The two readings in the table are the only readings that satisfy the specification. What is the value of $cd$?",
  questionTable: { headers: ["Reading", "Turbidity (NTU)"], rows: [["Lower", "$1.4$"], ["Upper", "$4.6$"]] },
  choices: [
    // distractor: reports d alone, the half-spread, instead of the product cd
    { id: "A", text: "$1.6$" },
    // distractor: reports c alone, the midpoint of the two readings, instead of the product cd
    { id: "B", text: "$3$" },
    { id: "C", text: "$4.8$" },
    // distractor: uses the full spread 3.2 as d instead of half of it, giving 3 x 3.2 = 9.6
    { id: "D", text: "$9.6$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The two solutions of $|t - c| = d$ sit $d$ above and $d$ below $c$, so $c$ is the midpoint $3$ and $d$ is the half-spread $1.6$. Then $cd = 4.8$.\n\n**The Full Solution:**\nStep 1: $|t - c| = d$ splits into $t = c + d$ and $t = c - d$. The table's two readings are those solutions, so $c + d = 4.6$ and $c - d = 1.4$.\nStep 2: Add the two equations: $2c = 6$, so $c = 3$. Subtract them: $2d = 3.2$, so $d = 1.6$.\nStep 3: $cd = 3 \\times 1.6 = 4.8$. Check: $|1.4 - 3| = 1.6$ and $|4.6 - 3| = 1.6$, so both readings satisfy the specification. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.6$): this is $d$ by itself. Finding the half-spread is the middle of the problem, not the answer the question asks for.\n* Choice B ($3$): this is $c$ by itself, the midpoint of the two readings, with the multiplication never carried out.\n* Choice D ($9.6$): this uses the full spread $4.6 - 1.4 = 3.2$ as $d$ instead of half of it, giving $3 \\times 3.2 = 9.6$. The distance from the center to each edge is half the total width.\n\n**Test Day Takeaway:** An absolute value equation always describes a center and a radius. Average the two solutions to get the center; halve their difference to get the radius.",
  skills: ["combining-like-terms"]
},
{
  id: 2,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A county reported $x$ cases of pertussis in 2022. Reported cases fell by $20\\%$ in 2023 and by another $25\\%$ in 2024, ending at $2{,}100$ cases. What is the value of $x$?",
  choices: [
    // distractor: divides 2,100 by 0.8 only, reversing the first decrease and ignoring the second
    { id: "A", text: "$2{,}625$" },
    // distractor: divides 2,100 by 0.75 only, reversing the second decrease and ignoring the first
    { id: "B", text: "$2{,}800$" },
    // distractor: adds the two percents to 45% and raises 2,100 by that instead of reversing two separate decreases
    { id: "C", text: "$3{,}045$" },
    { id: "D", text: "$3{,}500$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Decrease**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Two decreases multiply: $0.8 \\times 0.75 = 0.6$. Working backward, $x = \\frac{2100}{0.6} = 3500$.\n\n**The Full Solution:**\nStep 1: A $20\\%$ decrease multiplies by $1 - 0.20 = 0.8$; a $25\\%$ decrease multiplies by $1 - 0.25 = 0.75$.\nStep 2: The two years compose, so $0.75(0.8x) = 2100$, which is $0.6x = 2100$.\nStep 3: $x = \\frac{2100}{0.6} = 3500$. Check: $3500 \\times 0.8 = 2800$ in 2023, and $2800 \\times 0.75 = 2100$ in 2024. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2{,}625$): this is $\\frac{2100}{0.8}$, undoing only the $20\\%$ drop. The $25\\%$ drop is never reversed.\n* Choice B ($2{,}800$): this is $\\frac{2100}{0.75}$, the 2023 count, not the 2022 count. It is a real quantity in the problem, which is exactly why it is tempting.\n* Choice C ($3{,}045$): this adds the percents to $45\\%$ and computes $2100 \\times 1.45$. Percent changes multiply, and raising a number by $45\\%$ does not undo a $45\\%$ cut.\n\n**Test Day Takeaway:** Successive percent changes multiply their factors. To run them backward, divide by the product of the factors, never by their sum.",
  skills: ["percent-change"]
},
{
  id: 3,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "The length $L$, in millimeters, that a steel bridge span expands is modeled by $L = 0.5T - 4$, where $T$ is the deck temperature in degrees Celsius. For what value of $T$ is $L$ equal to $21$ millimeters more than its value when $T = 18$?",
  choices: [
    // distractor: reports the target length 26 mm instead of the temperature that produces it
    { id: "A", text: "$26$" },
    // distractor: adds 21 to the temperature 18 instead of to the length
    { id: "B", text: "$39$" },
    // distractor: solves 0.5T - 4 = 21, treating 21 as the length itself rather than the increase
    { id: "C", text: "$50$" },
    { id: "D", text: "$60$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Shifted Output**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $L(18) = 5$, so the target is $L = 26$. Then $0.5T = 30$ and $T = 60$.\n\n**The Full Solution:**\nStep 1: Evaluate the model at the reference temperature: $L = 0.5(18) - 4 = 9 - 4 = 5$ millimeters.\nStep 2: \"$21$ millimeters more\" shifts the output, not the input: the target is $L = 5 + 21 = 26$.\nStep 3: Solve $0.5T - 4 = 26$: $0.5T = 30$, so $T = 60$. Check: $0.5(60) - 4 = 26$, and $26 - 5 = 21$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($26$): this is the target length in millimeters, not the temperature. The question asks for $T$, and $26$ is the value of $L$.\n* Choice B ($39$): this adds $21$ to $18$, shifting the input. The phrase \"more than its value\" describes the output $L$.\n* Choice C ($50$): this solves $0.5T - 4 = 21$, using $21$ as the length rather than the increase in length. The reference value of $5$ is dropped.\n\n**Test Day Takeaway:** \"More than its value at ...\" always shifts the output. Evaluate the model at the reference input first, then add the shift, then solve.",
  skills: ["solving-equations", "ratios"]
},
{
  id: 4,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "An arch is graphed as $y = 2x^2 - 8x + k$, and a tie rod bolted across it is graphed as $y = 4x - 13$. The rod is tangent to the arch. What is $k$?",
  choices: [
    // distractor: uses b^2 + 4ac = 0 instead of b^2 - 4ac = 0, giving 144 + 8(k + 13) = 0 and k = -31
    { id: "A", text: "$-31$" },
    { id: "B", text: "$5$" },
    // distractor: never moves the -13 across, setting the discriminant of 2x^2 - 12x + k to zero and getting k = 18
    { id: "C", text: "$18$" },
    // distractor: drops the leading 2 from the discriminant, using 144 - 4(k + 13) = 0 and getting k = 23
    { id: "D", text: "$23$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Tangent Line and Discriminant**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Setting the two expressions equal gives $2x^2 - 12x + (k + 13) = 0$. Tangency means one repeated root, so $144 - 8(k + 13) = 0$ and $k = 5$.\n\n**The Full Solution:**\nStep 1: A tangent line meets the curve exactly once, so $2x^2 - 8x + k = 4x - 13$ has exactly one solution.\nStep 2: Collect every term on one side: $2x^2 - 12x + (k + 13) = 0$. Here $a = 2$, $b = -12$, and the constant is $k + 13$.\nStep 3: One repeated root means the discriminant is $0$: $(-12)^2 - 4(2)(k + 13) = 0$, so $144 - 8k - 104 = 0$ and $k = 5$. Check: with $k = 5$ the equation is $2x^2 - 12x + 18 = 2(x - 3)^2 = 0$, a single root at $x = 3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-31$): this comes from $144 + 8(k + 13) = 0$, a sign slip in the discriminant. The formula subtracts $4ac$; it never adds it.\n* Choice C ($18$): this sets the discriminant of $2x^2 - 12x + k$ to zero, forgetting to bring the $-13$ across with the rest of the line.\n* Choice D ($23$): this uses $144 - 4(k + 13) = 0$, dropping the leading coefficient $2$ from $4ac$. The $a$ in the discriminant is the coefficient after the equation is collected on one side.\n\n**Test Day Takeaway:** \"Tangent\" is a discriminant instruction. Move everything to one side, then set $b^2 - 4ac = 0$ using the collected coefficients.",
  skills: ["tangent-lines", "discriminant-analysis"]
},
{
  id: 5,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A rehearsal-scheduling model yields $ax^2 + bx + 24 = 0$ for constants $a$ and $b$. The two solutions add to $5$ and multiply to $4$. What is $b$?",
  choices: [
    { id: "A", text: "$-30$" },
    // distractor: uses r + s = -b, ignoring the leading coefficient a, and reports -5
    { id: "B", text: "$-5$" },
    // distractor: reports the value of a, which is 6, rather than b
    { id: "C", text: "$6$" },
    // distractor: drops the negative sign in r + s = -b/a and reports 30
    { id: "D", text: "$30$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The product $\\frac{24}{a} = 4$ gives $a = 6$; then the sum $-\\frac{b}{6} = 5$ gives $b = -30$.\n\n**The Full Solution:**\nStep 1: For $ax^2 + bx + c = 0$ with solutions $r$ and $s$, $r + s = -\\frac{b}{a}$ and $rs = \\frac{c}{a}$. Here $c = 24$.\nStep 2: The product comes first because it involves only one unknown: $\\frac{24}{a} = 4$, so $a = 6$.\nStep 3: Now the sum: $-\\frac{b}{6} = 5$, so $b = -30$. Check: $6x^2 - 30x + 24 = 6(x - 1)(x - 4)$, whose solutions $1$ and $4$ add to $5$ and multiply to $4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-5$): this uses $r + s = -b$, which is only true when $a = 1$. The leading coefficient is $6$ here, and it divides the sum.\n* Choice C ($6$): this is the value of $a$, found correctly in the first step and then reported in place of $b$.\n* Choice D ($30$): this drops the minus sign, using $r + s = \\frac{b}{a}$. Vieta's sum carries a negative; the product does not.\n\n**Test Day Takeaway:** When both the sum and the product are given but the leading coefficient is not, start with the product. It carries no sign change and often pins $a$ in one step.",
  skills: ["quadratic-factoring"]
},
{
  id: 6,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "A city recorded the number of water-main breaks per $100$ miles of pipe for each of $10$ years, and the graph shows those readings with the model $\\hat{y} = 46 - 1.8x$, where $x$ is years since the last network survey. At the marked point, the recorded number of breaks exceeds the number the model predicts by how much?",
  diagram: { type: "scatterplot", params: { points: [[1, 46], [3, 40], [5, 37], [7, 31], [9, 30], [11, 24], [13, 22], [15, 26], [17, 14], [19, 11]], xMin: 0, xMax: 20, yMin: 0, yMax: 50, xGridStep: 2, yGridStep: 5, xLabelStep: 4, yLabelStep: 10, xLabel: "Years since survey", yLabel: "Breaks per 100 miles", bestFitLine: { slope: -1.8, intercept: 46 }, highlightPoint: [15, 26], highlightLabel: "(15, 26)", showResidual: true } },
  choices: [
    // distractor: subtracts in the wrong order, computing predicted minus recorded, 19 - 26 = -7
    { id: "A", text: "$-7$" },
    { id: "B", text: "$7$" },
    // distractor: reports 19, the value the model predicts at x = 15, instead of the gap
    { id: "C", text: "$19$" },
    // distractor: reports 26, the recorded value at x = 15, instead of the gap
    { id: "D", text: "$26$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Residual**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The model predicts $46 - 1.8(15) = 19$; the marked point sits at $26$. The gap is $26 - 19 = 7$.\n\n**The Full Solution:**\nStep 1: Read the marked point from the graph: at $x = 15$ years, the recorded rate is $26$ breaks per $100$ miles.\nStep 2: Evaluate the model at the same $x$: $\\hat{y} = 46 - 1.8(15) = 46 - 27 = 19$.\nStep 3: \"Exceeds by\" means recorded minus predicted: $26 - 19 = 7$. Check: adding $7$ to the predicted $19$ returns the recorded $26$, and the marked point lies above the model line, so the gap must be positive. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): this subtracts in the wrong order, $19 - 26$. A point above the line has a positive gap; a negative answer contradicts the picture.\n* Choice C ($19$): this is the value the model predicts. It is one of the two numbers you need, not the difference between them.\n* Choice D ($26$): this is the recorded value read straight off the graph, with the model never evaluated.\n\n**Test Day Takeaway:** Observed minus predicted, always in that order. Then sanity-check the sign against the picture: above the line is positive, below is negative.",
  skills: ["calculate-mean", "slope-intercept-form"]
},
{
  id: 7,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A stage floor plan places one cable run along the segment joining $(2, -7)$ and $(10, 3)$. A second run, parallel to the first, passes through the point $(6, 1)$, and its graph is described by $ax - 4y = c$ for constants $a$ and $c$. What is the sum $a + c$?",
  choices: [
    // distractor: reports a alone, stopping once the slope has been matched
    { id: "A", text: "$5$" },
    // distractor: reports c alone, stopping once the point has been substituted
    { id: "B", text: "$26$" },
    { id: "C", text: "$31$" },
    // distractor: substitutes the endpoint (2, -7) instead of the given point (6, 1), giving c = 38 and a + c = 43
    { id: "D", text: "$43$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The first run has slope $\\frac{10}{8} = \\frac{5}{4}$, and $ax - 4y = c$ has slope $\\frac{a}{4}$, so $a = 5$. Then $5(6) - 4(1) = 26 = c$, and $a + c = 31$.\n\n**The Full Solution:**\nStep 1: Slope of the first run: $\\frac{3 - (-7)}{10 - 2} = \\frac{10}{8} = \\frac{5}{4}$.\nStep 2: Rewrite $ax - 4y = c$ as $y = \\frac{a}{4}x - \\frac{c}{4}$. Parallel lines share a slope, so $\\frac{a}{4} = \\frac{5}{4}$ and $a = 5$.\nStep 3: The second run passes through $(6, 1)$, so $5(6) - 4(1) = c$, giving $c = 26$. Then $a + c = 5 + 26 = 31$. Check: $5x - 4y = 26$ has slope $\\frac{5}{4}$ and contains $(6, 1)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): this is $a$ alone. Matching the slope is only the first of the two constants the question asks about.\n* Choice B ($26$): this is $c$ alone. Both constants are needed, and the question asks for their sum.\n* Choice D ($43$): this substitutes $(2, -7)$, an endpoint of the *first* run, giving $c = 10 + 28 = 38$. Only $(6, 1)$ is stated to lie on the second run.\n\n**Test Day Takeaway:** In $Ax + By = C$ the slope is $-\\frac{A}{B}$, so a parallel condition fixes $A$ and $B$ before any point is used. Substitute the point last, and only a point on the new line.",
  skills: ["writing-parallel-equation"]
},
{
  id: 8,
  type: "multiple-choice",
  difficulty: "easy",
  band: 3,
  question: "A bridge inspection team logged $50$ defects, each rated minor or major. Each minor defect adds $2$ deduction points to the span's rating and each major defect adds $8$, for a total of $232$ deduction points. How many of the defects were rated major?",
  choices: [
    { id: "A", text: "$22$" },
    // distractor: splits the 50 defects evenly, assuming half of each rating without using the 232 points
    { id: "B", text: "$25$" },
    // distractor: solves the system correctly but reports 28, the number of minor defects
    { id: "C", text: "$28$" },
    // distractor: divides 232 by 8, treating every point as coming from a major defect
    { id: "D", text: "$29$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: System of Equations — Elimination**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** If all $50$ were minor the score would be $100$. Each swap to major adds $6$, and $\\frac{232 - 100}{6} = 22$.\n\n**The Full Solution:**\nStep 1: Let $m$ be the number of minor defects and $j$ the number of major ones. Then $m + j = 50$ and $2m + 8j = 232$.\nStep 2: Multiply the first equation by $2$ to line up the $m$ terms: $2m + 2j = 100$. Subtract it from the second: $6j = 132$.\nStep 3: $j = 22$, so $m = 28$. Check: $2(28) + 8(22) = 56 + 176 = 232$, and $28 + 22 = 50$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($25$): this splits $50$ in half. An even split gives $2(25) + 8(25) = 250$ points, not $232$, so it fails the second equation.\n* Choice C ($28$): this is $m$, the number of minor defects. Both counts fall out of the same system, so the last step is deciding which one the question named.\n* Choice D ($29$): this is $\\frac{232}{8}$, which credits every point to a major defect. That ignores the $2$ points each minor defect contributes.\n\n**Test Day Takeaway:** Multiply the count equation by the smaller point value and subtract. Elimination hands you one variable in a single line, but check which variable the question actually wants.",
  skills: ["elimination-method", "setting-up-systems"]
},
{
  id: 9,
  type: "multiple-choice",
  difficulty: "medium",
  band: 4,
  question: "In a sound-attenuation model, the quantity $\\frac{x^{5}\\sqrt[3]{x^{4}}}{\\sqrt{x^{6}}}$ is evaluated for values of $x$ greater than $0$. The quantity is equal to $x^{m}$ for some constant $m$. What is the value of $m$?",
  choices: [
    // distractor: treats the square root of x^6 as x^6 rather than x^3, giving 5 + 4/3 - 6 = 1/3
    { id: "A", text: "$\\frac{1}{3}$" },
    // distractor: reads the cube root of x^4 as x^(3/4) instead of x^(4/3), giving 5 + 3/4 - 3 = 11/4
    { id: "B", text: "$\\frac{11}{4}$" },
    { id: "C", text: "$\\frac{10}{3}$" },
    // distractor: adds the denominator's exponent instead of subtracting it, giving 5 + 4/3 + 3 = 28/3
    { id: "D", text: "$\\frac{28}{3}$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Exponent Rules with Radicals**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Rewrite each radical as a power: $x^{5} \\cdot x^{4/3} \\div x^{3} = x^{5 + \\frac{4}{3} - 3} = x^{10/3}$.\n\n**The Full Solution:**\nStep 1: $\\sqrt[3]{x^{4}} = x^{4/3}$, because a root of index $n$ divides the exponent by $n$.\nStep 2: $\\sqrt{x^{6}} = x^{6/2} = x^{3}$. The square root cuts the exponent in half; it does not leave it alone.\nStep 3: Multiplying adds exponents and dividing subtracts them: $5 + \\frac{4}{3} - 3 = \\frac{15 + 4 - 9}{3} = \\frac{10}{3}$. Check: at $x = 8$, $\\frac{8^{5} \\cdot 16}{512} = 1024 = 8^{10/3}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{1}{3}$): this leaves $\\sqrt{x^{6}}$ as $x^{6}$, giving $5 + \\frac{4}{3} - 6$. The radical must be converted before the exponents are combined.\n* Choice B ($\\frac{11}{4}$): this reads $\\sqrt[3]{x^{4}}$ as $x^{3/4}$, flipping the index and the exponent. The index is the denominator.\n* Choice D ($\\frac{28}{3}$): this adds $3$ instead of subtracting it. Everything below the bar is subtracted once it becomes an exponent.\n\n**Test Day Takeaway:** Convert every radical to a fractional exponent first, then combine. Index goes on the bottom, and a denominator's exponent is subtracted.",
  skills: ["exponent-rules", "radical-expressions"]
},
{
  id: 10,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Water leaves a storage tank at a constant rate. The tank held $9{,}400$ gallons when a drain valve opened and $7{,}000$ gallons $5$ hours later. The volume remaining is modeled by $g(t) = 9400 - kt$, where $t$ is the number of minutes since the valve opened. What is the value of $k$?",
  choices: [
    { id: "A", text: "$8$" },
    // distractor: divides the 2,400-gallon drop by 60 instead of by the 300 minutes elapsed
    { id: "B", text: "$40$" },
    // distractor: computes the rate per hour, 2,400 / 5 = 480, and never converts to minutes
    { id: "C", text: "$480$" },
    // distractor: reports the total volume lost, 2,400 gallons, rather than the rate
    { id: "D", text: "$2{,}400$" }
  ],
  correctAnswer: "A",
  explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The tank loses $2400$ gallons in $300$ minutes, so $k = \\frac{2400}{300} = 8$ gallons per minute.\n\n**The Full Solution:**\nStep 1: The volume drops from $9400$ to $7000$, a loss of $2400$ gallons.\nStep 2: In $g(t) = 9400 - kt$, the variable $t$ counts minutes, so the elapsed time must be in minutes: $5$ hours is $5 \\times 60 = 300$ minutes.\nStep 3: $k$ is the loss per minute: $k = \\frac{2400}{300} = 8$. Check: $g(300) = 9400 - 8(300) = 9400 - 2400 = 7000$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($40$): this divides $2400$ by $60$, dividing by the conversion factor instead of by the $300$ minutes that actually elapsed.\n* Choice C ($480$): this is the rate per hour, $\\frac{2400}{5}$. The model's $t$ is in minutes, and a rate is only meaningful in the model's own unit.\n* Choice D ($2{,}400$): this is the total volume lost over the whole interval, not the amount lost each minute.\n\n**Test Day Takeaway:** A slope carries the units of the model, not the units of the sentence. Convert the elapsed time into the model's variable before dividing.",
  skills: ["slope-intercept-form"]
},
{
  id: 11,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "The table shows, for each of two highway corridors, the number of days on which the given number of lanes was closed for repairs. For the $60$ corridor-days represented in the table, what is the mode of the number of lanes closed?",
  questionTable: { headers: ["Lanes closed", "Corridor P (days)", "Corridor Q (days)"], rows: [["$1$", "$4$", "$3$"], ["$2$", "$11$", "$5$"], ["$3$", "$9$", "$10$"], ["$4$", "$6$", "$12$"]] },
  correctAnswer: "3",
  explanation: "**SAT Pattern: Mode of a Data Set**\n\n**The correct answer is $3$.**\n\n**The Fast Way (~30s):** Add the two columns row by row: $7$, $16$, $19$, $18$. The largest total, $19$, sits beside $3$ lanes.\n\n**The Full Solution:**\nStep 1: The mode of the combined data is the value that occurs on the most corridor-days, so the two columns must be added before anything is compared.\nStep 2: Row totals: $1$ lane occurs $4 + 3 = 7$ times; $2$ lanes, $11 + 5 = 16$; $3$ lanes, $9 + 10 = 19$; $4$ lanes, $6 + 12 = 18$.\nStep 3: The greatest frequency is $19$, which belongs to $3$ lanes closed, so the mode is $3$. Check: $7 + 16 + 19 + 18 = 60$, matching the $60$ corridor-days stated. $\\checkmark$\n\n**Common Mistakes:** Gridding $2$, which is the mode of Corridor P alone ($11$ days) but loses to $3$ once Corridor Q is included; gridding $4$, the mode of Corridor Q alone ($12$ days), for the same reason; gridding $19$, the frequency of the mode rather than the value that occurs most often.\n\n**Test Day Takeaway:** A mode over combined groups is never the winner of either group by default. Add the frequencies first, then read off the value beside the largest total.",
  skills: ["find-mode"]
},
{
  id: 12,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A scenic backdrop is a triangle, and a scaled copy of it is painted for a smaller stage. The area of the copy is $\\frac{4}{9}$ the area of the original, and the perimeter of the copy is $P$ meters. Which expression gives the perimeter, in meters, of the original backdrop?",
  choices: [
    // distractor: applies the area ratio 4/9 directly to the perimeter, skipping the square root
    { id: "A", text: "$\\frac{4}{9}P$" },
    // distractor: takes the square root correctly but keeps the copy-to-original direction, shrinking the original instead of enlarging it
    { id: "B", text: "$\\frac{2}{3}P$" },
    { id: "C", text: "$\\frac{3}{2}P$" },
    // distractor: inverts the area ratio to 9/4 but never takes the square root
    { id: "D", text: "$\\frac{9}{4}P$" }
  ],
  correctAnswer: "C",
  explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Areas scale by the square of the length ratio, so the copy's lengths are $\\sqrt{\\frac{4}{9}} = \\frac{2}{3}$ of the original's. Reversing that, the original's perimeter is $\\frac{3}{2}P$.\n\n**The Full Solution:**\nStep 1: For similar figures with length ratio $r$, the area ratio is $r^2$. Here $r^2 = \\frac{4}{9}$.\nStep 2: So $r = \\frac{2}{3}$: every length in the copy, including its perimeter, is $\\frac{2}{3}$ of the matching length in the original.\nStep 3: That means $P = \\frac{2}{3} \\times (\\text{original perimeter})$, so the original perimeter is $\\frac{3}{2}P$. Check: if the original perimeter were $30$, the copy's would be $20$, and $\\frac{3}{2}(20) = 30$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{4}{9}P$): this uses the area ratio as if it were a length ratio. Perimeter is a length, so it scales by $r$, not by $r^2$.\n* Choice B ($\\frac{2}{3}P$): this is the correct ratio pointed the wrong way. It shrinks $P$ again, when the original must be the larger of the two.\n* Choice D ($\\frac{9}{4}P$): this flips the ratio to original-over-copy but never takes the square root, so it scales the perimeter by an area factor.\n\n**Test Day Takeaway:** Length ratio $r$, area ratio $r^2$. Take the square root before touching any perimeter, and check at the end which figure the answer should make larger.",
  skills: ["similar-triangles"]
},
{
  id: 13,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A survey crew marks two access shafts on a grid measured in meters: shaft $P$ at $(-3, 8)$ and shaft $Q$ at $(9, b)$, where $b > 8$. The shafts are $20$ meters apart. What is the value of $b$?",
  correctAnswer: "24",
  explanation: "**SAT Pattern: Distance Formula**\n\n**The correct answer is $24$.**\n\n**The Fast Way (~40s):** The horizontal leg is $12$, so the vertical leg satisfies $12^2 + (b - 8)^2 = 20^2$. That is the $12$-$16$-$20$ triple, so $b - 8 = 16$ and $b = 24$.\n\n**The Full Solution:**\nStep 1: The distance formula gives $\\sqrt{(9 - (-3))^2 + (b - 8)^2} = 20$, so $\\sqrt{144 + (b - 8)^2} = 20$.\nStep 2: Square both sides: $144 + (b - 8)^2 = 400$, so $(b - 8)^2 = 256$ and $b - 8 = \\pm 16$.\nStep 3: The condition $b > 8$ forces $b - 8 = 16$, so $b = 24$. Check: $\\sqrt{12^2 + 16^2} = \\sqrt{144 + 256} = \\sqrt{400} = 20$. $\\checkmark$\n\n**Common Mistakes:** Gridding $16$, which is $b - 8$, the vertical leg, rather than the coordinate itself; gridding $12$, the horizontal leg read straight off the $x$-coordinates; gridding $28$, from treating the $20$ meters as the vertical distance and computing $8 + 20$ instead of using the Pythagorean relationship.\n\n**Test Day Takeaway:** A distance with one unknown coordinate is a right triangle with one unknown leg. Solve for the leg, then add the base coordinate back, and use the stated inequality to pick the sign.",
  skills: ["coordinate-geometry"]
},
{
  id: 14,
  type: "multiple-choice",
  difficulty: "medium",
  band: 5,
  question: "In a traffic study, $g(x) = 2x^2 - 12x + k$ models the change, in seconds, in the average delay at an intersection $x$ hours after a signal retiming, where $k$ is a constant. The minimum value of $g$ is $-7$. What is the value of $k$?",
  choices: [
    // distractor: computes k = -7 - 18 instead of k = -7 + 18 when moving the -18 across
    { id: "A", text: "$-25$" },
    // distractor: uses x = -b/2 = 6 for the vertex, dividing by 2 instead of 2a; at x = 6 the x terms cancel and g(6) = k, so the minimum itself is reported as k
    { id: "B", text: "$-7$" },
    // distractor: completes the square as 2(x - 3)^2 - 9 + k, forgetting to multiply the 9 by the leading 2
    { id: "C", text: "$2$" },
    { id: "D", text: "$11$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Vertex Form Maximum**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The vertex is at $x = \\frac{12}{4} = 3$, and $g(3) = 18 - 36 + k = k - 18$. Setting $k - 18 = -7$ gives $k = 11$.\n\n**The Full Solution:**\nStep 1: The parabola opens upward ($a = 2 > 0$), so the minimum sits at the vertex, $x = -\\frac{b}{2a} = \\frac{12}{4} = 3$.\nStep 2: Evaluate: $g(3) = 2(9) - 12(3) + k = 18 - 36 + k = k - 18$.\nStep 3: The minimum is $-7$, so $k - 18 = -7$ and $k = 11$. Check: $2x^2 - 12x + 11 = 2(x - 3)^2 - 7$, whose minimum is $-7$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-25$): this subtracts the $18$ instead of adding it, solving $k = -7 - 18$. Moving $-18$ across an equals sign makes it $+18$.\n* Choice B ($-7$): this uses $x = -\\frac{b}{2} = 6$ for the vertex, dividing by $2$ instead of $2a$. At $x = 6$ the two $x$ terms cancel and $g(6) = k$, so the minimum gets copied straight into $k$.\n* Choice C ($2$): this completes the square as $2(x - 3)^2 - 9 + k$, forgetting that the $-9$ inside the bracket is doubled to $-18$ when the $2$ is distributed.\n\n**Test Day Takeaway:** A stated maximum or minimum is the vertex's $y$-value. Find $x = -\\frac{b}{2a}$, substitute, and set the result equal to that value.",
  skills: ["converting-quadratic-forms"]
},
{
  id: 15,
  type: "multiple-choice",
  difficulty: "hard",
  band: 6,
  question: "At a vaccination clinic, $60\\%$ of the doses administered went to adults. Of the doses that did not go to adults, $45\\%$ went to children under $5$ years old. If $216$ doses went to children under $5$, how many doses were administered in all?",
  choices: [
    // distractor: divides 216 by 0.6, using the adult share as though the 216 doses were 60% of the total
    { id: "A", text: "$360$" },
    // distractor: divides 216 by 0.45 only, treating the 216 doses as 45% of the whole clinic rather than of the non-adult group
    { id: "B", text: "$480$" },
    // distractor: divides 216 by 0.4, skipping the 45% step entirely
    { id: "C", text: "$540$" },
    { id: "D", text: "$1{,}200$" }
  ],
  correctAnswer: "D",
  explanation: "**SAT Pattern: Percent Complement**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** Non-adults are $40\\%$ of the total, and children under $5$ are $45\\%$ of those: $0.40 \\times 0.45 = 0.18$. So $0.18T = 216$ and $T = 1200$.\n\n**The Full Solution:**\nStep 1: If $60\\%$ of doses went to adults, the complement, $100\\% - 60\\% = 40\\%$, went to everyone else.\nStep 2: The $45\\%$ applies to that complement, not to the whole clinic, so children under $5$ received $0.45 \\times 0.40 = 0.18$ of all doses.\nStep 3: $0.18T = 216$, so $T = \\frac{216}{0.18} = 1200$. Check: $40\\%$ of $1200$ is $480$ non-adult doses, and $45\\%$ of $480$ is $216$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($360$): this is $\\frac{216}{0.6}$, applying the adult percentage to a group of children. The $60\\%$ describes the doses the $216$ are not part of.\n* Choice B ($480$): this is $\\frac{216}{0.45}$, the number of non-adult doses. It is a real quantity in the problem, but it is the subgroup, not the whole.\n* Choice C ($540$): this is $\\frac{216}{0.4}$, which uses the complement but never applies the $45\\%$, so one of the two nested percentages is missing.\n\n**Test Day Takeaway:** \"Of the ones that did not ...\" resets the base to the complement. Multiply the two fractions to get a single share of the whole, then divide once.",
  skills: ["percent-of-value"]
},
{
  id: 16,
  type: "fill-in",
  difficulty: "medium",
  band: 5,
  question: "The dot plot shows the number of costumes built by each of $11$ wardrobe shops for a festival. The mean of all $11$ values is how much greater than the mean of the $10$ values other than $34$?",
  diagram: { type: "dotPlot", params: { data: [{ value: 6, count: 1 }, { value: 9, count: 2 }, { value: 12, count: 4 }, { value: 15, count: 2 }, { value: 18, count: 1 }, { value: 34, count: 1 }], xMin: 0, xMax: 36, xLabel: "Costumes built" } },
  correctAnswer: "2",
  explanation: "**SAT Pattern: Outlier Effect**\n\n**The correct answer is $2$.**\n\n**The Fast Way (~40s):** The ten ordinary values total $120$, so their mean is $12$. Adding the $34$ makes the total $154$ over $11$ shops, a mean of $14$. The difference is $2$.\n\n**The Full Solution:**\nStep 1: Read the dots other than the outlier: $6, 9, 9, 12, 12, 12, 12, 15, 15, 18$. Their sum is $120$, so their mean is $\\frac{120}{10} = 12$.\nStep 2: Include the outlier: the sum becomes $120 + 34 = 154$ over $11$ values, so that mean is $\\frac{154}{11} = 14$.\nStep 3: $14 - 12 = 2$. Check: the outlier sits $34 - 12 = 22$ above the smaller mean, and spreading that excess over $11$ values raises the mean by $\\frac{22}{11} = 2$. $\\checkmark$\n\n**Common Mistakes:** Gridding $14$ or $12$, one of the two means rather than the gap between them; gridding $22$, the outlier's distance above the smaller mean, without dividing it among the $11$ values; gridding $15.4$, from dividing the full sum $154$ by $10$ instead of $11$.\n\n**Test Day Takeaway:** One extreme value moves the mean by its distance from the old mean divided by the new count. That shortcut also checks the long calculation in a single line.",
  skills: ["calculate-mean", "find-median"]
},
{
  id: 17,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "Water in a cylindrical sedimentation basin stands $24$ feet deep and amounts to $21{,}600\\pi$ cubic feet. Filling the basin to its interior height of $40$ feet adds how many cubic feet, in terms of $\\pi$?",
  choices: [
    // distractor: scales the given volume by 16/40 instead of by 16/24, giving 8,640 pi
    { id: "A", text: "$8{,}640\\pi$" },
    { id: "B", text: "$14{,}400\\pi$" },
    // distractor: reports the water already in the basin rather than the amount still needed
    { id: "C", text: "$21{,}600\\pi$" },
    // distractor: reports the basin's full capacity, forgetting to subtract the water already there
    { id: "D", text: "$36{,}000\\pi$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\pi r^2(24) = 21600\\pi$ gives $r^2 = 900$. The remaining $16$ feet hold $900\\pi(16) = 14400\\pi$ cubic feet.\n\n**The Full Solution:**\nStep 1: Use $V = \\pi r^2 h$ on the water already present: $\\pi r^2 (24) = 21600\\pi$, so $r^2 = \\frac{21600}{24} = 900$.\nStep 2: The water must rise from $24$ feet to $40$ feet, a gain of $16$ feet, and the cross section never changes.\nStep 3: The added volume is $\\pi r^2(16) = 900\\pi(16) = 14400\\pi$ cubic feet. Check: full capacity is $900\\pi(40) = 36000\\pi$, and $36000\\pi - 21600\\pi = 14400\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8{,}640\\pi$): this scales $21600\\pi$ by $\\frac{16}{40}$. Volume is proportional to depth, so the correct comparison is $16$ feet against the $24$ feet the given volume describes.\n* Choice C ($21{,}600\\pi$): this is the water already in the basin. It is the number handed to you, not the number still needed.\n* Choice D ($36{,}000\\pi$): this is the basin filled to $40$ feet, with the $21600\\pi$ already present never subtracted.\n\n**Test Day Takeaway:** In a cylinder the cross section is fixed, so volume rises in direct proportion to depth. Extract $r^2$ once, then multiply by whichever height the question is really asking about.",
  skills: ["volume-prism"]
},
{
  id: 18,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "A cue-timing model requires that $\\frac{2x + c}{5} - \\frac{x - 3}{2} = 4$, where $c$ is a constant, be satisfied when $x = 7$. What is the value of $c$?",
  correctAnswer: "16",
  explanation: "**SAT Pattern: Multi-Step Linear Equation**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~40s):** At $x = 7$ the second fraction is $\\frac{4}{2} = 2$, so $\\frac{14 + c}{5} = 6$, giving $14 + c = 30$ and $c = 16$.\n\n**The Full Solution:**\nStep 1: Substitute $x = 7$: $\\frac{2(7) + c}{5} - \\frac{7 - 3}{2} = 4$, which is $\\frac{14 + c}{5} - \\frac{4}{2} = 4$.\nStep 2: The second fraction is a number, $2$. Add it to both sides: $\\frac{14 + c}{5} = 6$.\nStep 3: Multiply both sides by $5$: $14 + c = 30$, so $c = 16$. Check: $\\frac{14 + 16}{5} - 2 = 6 - 2 = 4$. $\\checkmark$\n\n**Common Mistakes:** Gridding $6$, from solving $\\frac{14 + c}{5} = 4$ and dropping the $\\frac{x - 3}{2}$ term altogether; gridding $-4$, from moving the $2$ to the wrong side and solving $\\frac{14 + c}{5} = 2$; gridding $30$, which is $2x + c$, the whole numerator, rather than the constant $c$ by itself.\n\n**Test Day Takeaway:** Substitute the given value before doing any algebra. Every term that no longer contains the variable collapses to a number, and a two-fraction equation becomes a one-step solve.",
  skills: ["solving-equations"]
},
{
  id: 19,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "A traffic engineer graphs two lane-flow constraints as the lines $6x - 4y = 14$ and $ax + 10y = b$, where $a$ and $b$ are constants. The two lines never meet. Which statement about $a$ and $b$ is true?",
  choices: [
    // distractor: b = -35 makes the two equations the same line, which meets everywhere rather than never
    { id: "A", text: "$a = -15$ and $b = -35$" },
    { id: "B", text: "$a = -15$ and $b \\neq -35$" },
    // distractor: sets a/10 = 3/2 instead of -a/10 = 3/2, so a = 15; the intercept condition b != -35 is unchanged
    { id: "C", text: "$a = 15$ and $b \\neq -35$" },
    // distractor: omits the b restriction, allowing b = -35, the one value that makes the lines coincide
    { id: "D", text: "$a = -15$, and $b$ can be any constant" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Parallel Lines (No Solution)**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** Both lines in slope-intercept form: $y = \\frac{3}{2}x - \\frac{7}{2}$ and $y = -\\frac{a}{10}x + \\frac{b}{10}$. Never meeting means equal slopes but different intercepts, so $a = -15$ and $\\frac{b}{10} \\neq -\\frac{7}{2}$.\n\n**The Full Solution:**\nStep 1: Solve the first equation for $y$: $-4y = -6x + 14$, so $y = \\frac{3}{2}x - \\frac{7}{2}$.\nStep 2: Solve the second for $y$: $10y = -ax + b$, so $y = -\\frac{a}{10}x + \\frac{b}{10}$. Parallel lines need $-\\frac{a}{10} = \\frac{3}{2}$, which gives $a = -15$.\nStep 3: Lines that never meet must also be distinct, so the intercepts differ: $\\frac{b}{10} \\neq -\\frac{7}{2}$, that is, $b \\neq -35$. Check: with $a = -15$ and $b = 0$ the second line is $y = \\frac{3}{2}x$, parallel to the first and never touching it. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($a = -15$ and $b = -35$): this is the one forbidden value of $b$. It turns the second equation into a multiple of the first, so the lines coincide and share infinitely many points.\n* Choice C ($a = 15$ and $b \\neq -35$): this matches the slope with the wrong sign. In $ax + 10y = b$ the slope is $-\\frac{a}{10}$, so a positive slope of $\\frac{3}{2}$ forces $a$ to be negative.\n* Choice D ($a = -15$, and $b$ can be any constant): this gets the slope right but drops the second condition. \"No solution\" needs equal slopes *and* different intercepts.\n\n**Test Day Takeaway:** No solution is two conditions, not one: the slopes match and the intercepts do not. Whenever a choice omits the second half, it quietly allows the same-line case.",
  skills: ["system-solution-types"]
},
{
  id: 20,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "On a stage lighting board, a dimmer setting satisfies $16^{\\,3x-4} = 4^{\\,ax+k}$ no matter which real number $x$ is used, where $a$ and $k$ are constants. What is the value of $a + k$?",
  correctAnswer: "-2",
  explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**The correct answer is $-2$.**\n\n**The Fast Way (~45s):** Write both sides base $2$: $2^{12x - 16} = 2^{2ax + 2k}$. Matching coefficients gives $2a = 12$ and $2k = -16$, so $a = 6$, $k = -8$, and $a + k = -2$.\n\n**The Full Solution:**\nStep 1: $16 = 2^4$ and $4 = 2^2$, so the equation becomes $2^{4(3x - 4)} = 2^{2(ax + k)}$, that is, $2^{12x - 16} = 2^{2ax + 2k}$.\nStep 2: Two powers of the same base are equal for every $x$ only when the exponents are the same linear expression, so $12x - 16 = 2ax + 2k$ term by term.\nStep 3: $2a = 12$ gives $a = 6$, and $2k = -16$ gives $k = -8$, so $a + k = -2$. Check: $4^{6x - 8} = (4^2)^{3x - 4} = 16^{3x - 4}$. $\\checkmark$\n\n**Common Mistakes:** Gridding $-4$, from setting $4(3x - 4) = ax + k$ and forgetting that the right side's base $4$ also contributes a factor of $2$ to its exponent; gridding $6$ or $-8$, one of the two constants rather than their sum; converting only one side to base $2$ and leaving the other in its original base.\n\n**Test Day Takeaway:** \"True for every $x$\" turns an exponential equation into matching coefficients. Rewrite both sides on the smallest common base first, then equate the $x$ terms and the constants separately.",
  skills: ["exponential-functions"]
},
{
  id: 21,
  type: "multiple-choice",
  difficulty: "hard",
  band: 7,
  question: "In the figure, two spotlight beams cross above the stage. Three of the four angles at the crossing are marked. What is the value of $y$?",
  diagram: { type: "intersectingLines", params: { angles: ["(6x - 43)°", "(4x + 3)°", "y°", ""], figureNote: true } },
  choices: [
    // distractor: reports x = 22, the value found in the middle of the problem, instead of an angle measure
    { id: "A", text: "$22$" },
    { id: "B", text: "$89$" },
    // distractor: reports 91, the measure of the (4x + 3) angle, which is adjacent to the y angle rather than vertical to it
    { id: "C", text: "$91$" },
    // distractor: sets the two marked expressions equal as if they were vertical angles, getting x = 23 and 95
    { id: "D", text: "$95$" }
  ],
  correctAnswer: "B",
  explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The two labeled angles form a straight line: $(6x - 43) + (4x + 3) = 180$ gives $x = 22$. The $y$ angle is vertical to the $(6x - 43)$ angle, so $y = 6(22) - 43 = 89$.\n\n**The Full Solution:**\nStep 1: The $(6x - 43)^\\circ$ and $(4x + 3)^\\circ$ angles sit side by side along one of the beams, so they are a linear pair and sum to $180^\\circ$.\nStep 2: $10x - 40 = 180$, so $10x = 220$ and $x = 22$.\nStep 3: The $y^\\circ$ angle is directly across the crossing from the $(6x - 43)^\\circ$ angle, so the two are vertical angles and equal: $y = 6(22) - 43 = 89$. Check: the four angles are $89, 91, 89, 91$, which total $360$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($22$): this is $x$, not an angle measure. Solving for $x$ is the middle of the work; the expression still has to be evaluated.\n* Choice C ($91$): this is $(4x + 3)^\\circ$, the angle adjacent to $y$. Adjacent angles at a crossing are supplementary, not equal.\n* Choice D ($95$): this sets $6x - 43 = 4x + 3$, treating the two labeled angles as a vertical pair. They share a ray, so they are supplementary instead.\n\n**Test Day Takeaway:** At a crossing there are only two angle measures, and every angle is either equal to a given one or its supplement. Decide which of the two an angle is before doing any arithmetic.",
  skills: ["angles"]
},
{
  id: 22,
  type: "fill-in",
  difficulty: "hard",
  band: 7,
  question: "In a pump-curve calculation, the only real number satisfying $\\sqrt{cx - 3} + 3 = x$ is $12$, and $c$ is a positive constant. What is $c$?",
  correctAnswer: "7",
  explanation: "**SAT Pattern: Radical Equation**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~40s):** At $x = 12$ the radical must equal $12 - 3 = 9$, so $12c - 3 = 81$ and $c = 7$.\n\n**The Full Solution:**\nStep 1: Put $x = 12$ into both sides: $\\sqrt{12c - 3} + 3 = 12$.\nStep 2: Move the $3$ across before squaring, since squaring a sum term by term is not legal: $\\sqrt{12c - 3} = 9$, so $12c - 3 = 81$.\nStep 3: $12c = 84$, so $c = 7$. Check: with $c = 7$ the equation becomes $\\sqrt{7x - 3} = x - 3$, which squares to $x^2 - 13x + 12 = 0$, whose roots are $1$ and $12$. At $x = 1$ the left side is $\\sqrt{4} = 2$ while $x - 3 = -2$, so $1$ is extraneous and $12$ really is the only solution. $\\checkmark$\n\n**Common Mistakes:** Gridding $11.5$, from squaring both sides before isolating and writing $12c - 3 + 9 = 144$; gridding $9$, the value of the radical rather than the constant inside it; gridding $84$, which is $12c$, stopping one division short.\n\n**Test Day Takeaway:** A term added outside a radical must be moved before squaring, even when the solution is handed to you. Squaring a sum term by term is the mistake this pattern is built to catch.",
  skills: ["radical-equations"]
}
      ]
    }
  ]
};

export default practiceTest4;
