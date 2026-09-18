// Practice Test 5 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Official-calibration recreation (2026-09-01): fresh content on the frozen
// slot skeleton (docs/TEST_RECREATION_SPEC.md). Diagrams at Q6 (right
// triangle), Q7 (data table), Q21 (scatterplot), Q22 (two-way table).
// Scenario palette shared with the main test 5 files: aquatic center /
// pool chemistry, theater props/stage crew, harbor ferry.

export const practiceTest5M2Easy = {
  id: "module-2-easy",
  title: "Module 2 (Easy)",
  variant: "easy",
  timeLimit: 35,
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      difficulty: "easy",
      band: 2,
      question: "A glazing crew charges a one-time setup fee plus a fixed amount for each panel it installs. The table gives the crew's total charge for three different panel counts. Which equation gives the total charge $C$, in dollars, for $p$ panels?",
      questionTable: { headers: ["Panels installed", "Total charge (dollars)"], rows: [["$4$", "$440$"], ["$7$", "$635$"], ["$12$", "$960$"]] },
      choices: [
        // distractor: finds the per-panel rate but drops the one-time setup fee
        { id: "A", text: "$C = 65p$" },
        // distractor: divides one total by its panel count (440/4 = 110) and treats the whole charge as per-panel
        { id: "B", text: "$C = 110p$" },
        { id: "C", text: "$C = 65p + 180$" },
        // distractor: swaps the two constants, charging 180 dollars per panel and 65 dollars once
        { id: "D", text: "$C = 180p + 65$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Linear Cost Setup**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Three more panels raise the charge by $\\$195$, so the rate is $\\$65$ per panel, and $440 - 4(65) = 180$ is the setup fee.\n\n**The Full Solution:**\nStep 1: A setup fee plus a per-panel amount is linear: $C = rp + f$, where $r$ is the rate per panel and $f$ is the fee charged once.\nStep 2: The first two rows give $r = \\frac{635 - 440}{7 - 4} = \\frac{195}{3} = 65$ dollars per panel.\nStep 3: Substituting the first row, $440 = 65(4) + f$, so $f = 180$; check the third row: $65(12) + 180 = 780 + 180 = 960$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($C = 65p$): reads the rate correctly but forgets the fee, predicting $65(4) = 260$ dollars for $4$ panels instead of $440$.\n* Choice B ($C = 110p$): divides a single total by its panel count, $440 \\div 4 = 110$, folding the one-time fee into the rate; at $7$ panels it predicts $770$ dollars, not $635$.\n* Choice D ($C = 180p + 65$): swaps the roles of the two constants and predicts $180(4) + 65 = 785$ dollars for $4$ panels.\n\n**Test Day Takeaway:** In a linear cost table the per-unit rate is the change in cost divided by the change in units; the fixed fee is whatever is left after the rate is paid for.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 2,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "A chemistry stockroom stores acetone in cylindrical drums. Each drum is $4$ decimeters across the base, and the acetone stands $9$ decimeters deep. Each drum holds $k\\pi$ cubic decimeters of acetone. What is the value of $k$?",
      correctAnswer: "36",
      explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~15s):** Half of $4$ is a radius of $2$, and $V = \\pi r^2 h = \\pi(2)^2(9) = 36\\pi$.\n\n**The Full Solution:**\nStep 1: \"Across the base\" is the diameter, so the radius is $r = \\frac{4}{2} = 2$ decimeters, and the depth of the liquid is the height, $h = 9$ decimeters.\nStep 2: The volume of a cylinder is $V = \\pi r^2 h = \\pi (2)^2 (9)$.\nStep 3: $(2)^2 (9) = 4 \\cdot 9 = 36$, so $V = 36\\pi$ and $k = 36$; check by units: a squared length times a length gives cubic decimeters ✓\n\n**Common Mistakes:**\n* Using the given $4$ as the radius gives $4^2 \\cdot 9 = 144$, four times too large, because doubling a radius quadruples the volume.\n* Stopping at the base area gives $2^2 = 4$ and forgets the $9$-decimeter depth entirely.\n* Multiplying the radius by the height without squaring gives $2 \\cdot 9 = 18$, exactly half the correct value.\n\n**Test Day Takeaway:** Read the given length before you use it — \"across\" is a diameter, and the radius that goes into $\\pi r^2 h$ is half of it.",
      skills: ["volume-prism"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A lab technician models the temperature deviation, in degrees Celsius, of a heated bath by $d(t) = 2(t - 4)^2 - 7$, where $t$ is the time in minutes since heating began. Which expression is equivalent to $d(t)$?",
      choices: [
        { id: "A", text: "$2t^2 - 16t + 25$" },
        // distractor: distributes the 2 across the t-terms but not across the 16, leaving 16 - 7 = 9
        { id: "B", text: "$2t^2 - 16t + 9$" },
        // distractor: doubles the squared term but copies the cross term -8t without doubling it
        { id: "C", text: "$2t^2 - 8t + 25$" },
        // distractor: expands (t - 4)^2 as t^2 + 8t + 16, flipping the sign of the middle term
        { id: "D", text: "$2t^2 + 16t + 25$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Vertex Form to Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $(t-4)^2 = t^2 - 8t + 16$; doubling gives $2t^2 - 16t + 32$, and $32 - 7 = 25$.\n\n**The Full Solution:**\nStep 1: Square the binomial first: $(t - 4)^2 = t^2 - 8t + 16$.\nStep 2: Multiply every term by $2$: $2(t^2 - 8t + 16) = 2t^2 - 16t + 32$.\nStep 3: Subtract $7$: $2t^2 - 16t + 32 - 7 = 2t^2 - 16t + 25$; check at $t = 0$, where the original gives $2(16) - 7 = 25$ and the answer gives $25$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($2t^2 - 16t + 9$): distributes the $2$ to $t^2$ and to $-8t$ but not to the $16$, so the constant comes out $16 - 7 = 9$; at $t = 0$ that is $9$, not $25$.\n* Choice C ($2t^2 - 8t + 25$): doubles the squared term and the constant but carries the cross term $-8t$ over unchanged, when it must become $-16t$.\n* Choice D ($2t^2 + 16t + 25$): expands $(t - 4)^2$ as $t^2 + 8t + 16$; squaring a difference makes the middle term negative, so the sign is wrong.\n\n**Test Day Takeaway:** Convert vertex form in the fixed order — square the binomial, distribute the leading coefficient to all three terms, then combine the constants.",
      skills: ["distributive-property", "converting-quadratic-forms"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A concrete mix combines cement, sand, and gravel in the ratio $2 : 3 : k$ by volume. A batch that contains $18$ cubic feet of cement has a total volume of $99$ cubic feet. What is the value of $k$?",
      choices: [
        // distractor: confuses the scale factor 9 with the number of parts, solving 2 + 3 + k = 9
        { id: "A", text: "$4$" },
        { id: "B", text: "$6$" },
        // distractor: treats the remaining 99 - 18 = 81 cubic feet as gravel alone, giving 81/9 = 9 parts
        { id: "C", text: "$9$" },
        // distractor: reports the total number of parts, 99/9 = 11, instead of k
        { id: "D", text: "$11$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Sum of Parts Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Cement is $2$ parts $= 18$, so one part is $9$ cubic feet; $99 \\div 9 = 11$ parts total, and $11 - 2 - 3 = 6$.\n\n**The Full Solution:**\nStep 1: The three quantities are $2x$, $3x$, and $kx$ cubic feet for one common part size $x$. Cement gives $2x = 18$, so $x = 9$ cubic feet per part.\nStep 2: The batch total is $(2 + 3 + k)x = 99$, so $2 + 3 + k = \\frac{99}{9} = 11$.\nStep 3: Therefore $k = 11 - 5 = 6$; check: $2(9) + 3(9) + 6(9) = 18 + 27 + 54 = 99$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): uses the part size $9$ as though it were the number of parts and solves $2 + 3 + k = 9$, which gives $4$ but produces a batch of only $81$ cubic feet.\n* Choice C ($9$): subtracts the cement, $99 - 18 = 81$, and assigns all of it to gravel, giving $81 \\div 9 = 9$ parts and leaving no sand in the mix.\n* Choice D ($11$): stops one step early and reports the total number of parts, $99 \\div 9 = 11$, rather than the gravel part $k$.\n\n**Test Day Takeaway:** In a sum-of-parts ratio, first convert one known amount into the size of a single part, then divide the total by that size to get the total number of parts.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 5,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "On a campus fiber map, a switch sits at the point $(-6, 10)$ and a splice enclosure sits at $(4, 4)$, the midpoint of the cable run joining that switch to a second switch. What are the coordinates of the second switch?",
      choices: [
        // distractor: steps from the first switch away from the enclosure, computing 2A - M instead of 2M - A
        { id: "A", text: "$(-16, 16)$" },
        // distractor: averages the two given points, which returns the midpoint of the switch and the enclosure
        { id: "B", text: "$(-1, 7)$" },
        // distractor: reports the change from the switch to the enclosure, (10, -6), instead of the endpoint
        { id: "C", text: "$(10, -6)$" },
        { id: "D", text: "$(14, -2)$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Midpoint Formula**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The run goes $+10$ in $x$ and $-6$ in $y$ to reach the midpoint, so repeat that step: $(4 + 10,\\ 4 - 6) = (14, -2)$.\n\n**The Full Solution:**\nStep 1: If the second switch is $(x, y)$, the midpoint formula gives $\\frac{-6 + x}{2} = 4$ and $\\frac{10 + y}{2} = 4$.\nStep 2: Multiply each equation by $2$: $-6 + x = 8$ and $10 + y = 8$.\nStep 3: So $x = 14$ and $y = -2$; check the midpoint of $(-6, 10)$ and $(14, -2)$: $\\left(\\frac{-6 + 14}{2}, \\frac{10 - 2}{2}\\right) = (4, 4)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-16, 16)$): steps the same distance from the switch in the wrong direction, computing $2(-6) - 4 = -16$ and $2(10) - 4 = 16$; that puts the enclosure at an end of the run, not its middle.\n* Choice B ($(-1, 7)$): averages the two points that were given, $\\left(\\frac{-6 + 4}{2}, \\frac{10 + 4}{2}\\right)$, which finds a new midpoint rather than the missing endpoint.\n* Choice C ($(10, -6)$): reports the displacement from the switch to the enclosure, $4 - (-6) = 10$ and $4 - 10 = -6$, which is a change in position, not a position.\n\n**Test Day Takeaway:** When one endpoint and the midpoint are given, double the midpoint and subtract the known endpoint: $B = 2M - A$.",
      skills: ["coordinate-geometry"]
    },
    {
      id: 6,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "Triangular gable truss $PQR$ is similar to truss $STU$, with side $PQ$ corresponding to side $ST$. Truss $PQR$ has $PQ = 6$ feet and encloses $24$ square feet of wall, and $ST = 15$ feet. How many square feet of wall does truss $STU$ enclose?",
      diagram: { type: "similarTriangles", params: { triangle1: { labels: ["P", "Q", "R"], sideLabels: ["6", "", ""] }, triangle2: { labels: ["S", "T", "U"], sideLabels: ["15", "", ""] }, figureNote: true } },
      correctAnswer: "150",
      explanation: "**SAT Pattern: Similar Triangles and Area Ratio**\n\n**The correct answer is $150$.**\n\n**The Fast Way (~20s):** The sides scale by $\\frac{15}{6} = 2.5$, so the areas scale by $2.5^2 = 6.25$, and $24(6.25) = 150$.\n\n**The Full Solution:**\nStep 1: Corresponding sides give the scale factor $\\frac{ST}{PQ} = \\frac{15}{6} = \\frac{5}{2}$.\nStep 2: In similar figures every length is multiplied by $\\frac{5}{2}$, so every area is multiplied by $\\left(\\frac{5}{2}\\right)^2 = \\frac{25}{4}$.\nStep 3: The larger truss encloses $24 \\cdot \\frac{25}{4} = 150$ square feet; check the ratio: $\\frac{150}{24} = 6.25 = 2.5^2$ ✓\n\n**Common Mistakes:**\n* Scaling the area by the side ratio alone gives $24 \\cdot \\frac{5}{2} = 60$, which would be right for a length, not an area.\n* Cubing the ratio gives $24 \\cdot \\frac{125}{8} = 375$; the cube of a scale factor governs volume, not area.\n* Inverting the ratio gives $24 \\cdot \\frac{4}{25} = 3.84$, shrinking the larger truss instead of enlarging it.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^2$, volumes by $k^3$ — decide which one the question asks for before you multiply.",
      skills: ["similar-triangles"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A chemistry lab's quality log shows that $60\\%$ of the recorded samples came from batch $X$ and that $42\\%$ of all recorded samples came from batch $X$ and met the purity standard. Which expression gives the probability that a randomly selected batch $X$ sample met the standard?",
      choices: [
        // distractor: inverts the conditional probability, dividing the condition by the joint percent
        { id: "A", text: "$\\frac{0.60}{0.42}$" },
        // distractor: multiplies the two percents as if the events were independent
        { id: "B", text: "$0.60 \\times 0.42$" },
        { id: "C", text: "$\\frac{0.42}{0.60}$" },
        // distractor: subtracts to find the batch X samples that failed, 18% of all samples
        { id: "D", text: "$0.60 - 0.42$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Conditional Probability with Percent**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** A conditional probability is the overlap divided by the condition: $\\frac{0.42}{0.60}$.\n\n**The Full Solution:**\nStep 1: Let $X$ be the event that a sample came from batch $X$ and $M$ the event that it met the standard. The log gives $P(X) = 0.60$ and $P(X \\text{ and } M) = 0.42$.\nStep 2: The question restricts attention to batch $X$ samples, so the probability wanted is $P(M \\mid X) = \\frac{P(X \\text{ and } M)}{P(X)}$.\nStep 3: That is $\\frac{0.42}{0.60}$; check with counts for $1{,}000$ samples: $600$ came from batch $X$ and $420$ of them met the standard, and $\\frac{420}{600} = \\frac{0.42}{0.60} = 0.7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{0.60}{0.42}$): flips the conditional and gives about $1.43$, which cannot be a probability.\n* Choice B ($0.60 \\times 0.42$): multiplies as if the two percents were independent pieces; that produces $0.252$, the share of all samples that would satisfy both conditions only if $0.42$ were already a within-batch rate.\n* Choice D ($0.60 - 0.42$): subtracts to get $0.18$, the share of all samples that came from batch $X$ and failed the standard.\n\n**Test Day Takeaway:** \"Given that\" resets the denominator — divide the overlap by the group you are told the item came from, never by the whole.",
      skills: ["conditional-probability"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The replacement cost of a building's roofing system rises by $4.5\\%$ each year, and the cost is $\\$26{,}000$ this year. Which expression gives the replacement cost, in dollars, $t$ years from now?",
      choices: [
        // distractor: uses the growth rate alone as the base instead of 1 plus the rate
        { id: "A", text: "$26{,}000(0.045)^t$" },
        // distractor: models the increase as simple, adding 4.5% of the original cost each year
        { id: "B", text: "$26{,}000(1 + 0.045t)$" },
        // distractor: misplaces the decimal, treating 4.5% as 0.45 and growing 45% per year
        { id: "C", text: "$26{,}000(1.45)^t$" },
        { id: "D", text: "$26{,}000(1.045)^t$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Compound Interest**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** Repeated percent growth multiplies by $1 + 0.045 = 1.045$ once per year, so the cost is $26{,}000(1.045)^t$.\n\n**The Full Solution:**\nStep 1: A $4.5\\%$ increase multiplies a cost by $1 + 0.045 = 1.045$.\nStep 2: The increase happens once per year and applies to the new cost each time, so after $t$ years the original cost has been multiplied by $1.045$ a total of $t$ times.\nStep 3: The cost is $26{,}000(1.045)^t$; check $t = 2$: $26{,}000(1.045)^2 = 28{,}392.65$, which is $27{,}170$ raised by another $4.5\\%$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($26{,}000(0.045)^t$): uses the rate itself as the multiplier, so after one year the cost would fall to $26{,}000(0.045) = 1{,}170$ dollars.\n* Choice B ($26{,}000(1 + 0.045t)$): adds a flat $4.5\\%$ of the original cost every year; at $t = 2$ it gives $28{,}340$ dollars instead of $28{,}392.65$, because it never charges growth on growth.\n* Choice C ($26{,}000(1.45)^t$): reads $4.5\\%$ as $0.45$, producing $45\\%$ growth and a first-year cost of $37{,}700$ dollars.\n\n**Test Day Takeaway:** Percent growth compounds through the base $(1 + r)$ raised to the number of periods; a rate multiplied by time is simple growth, a different model.",
      skills: ["exponential-functions"]
    },
    {
      id: 9,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A network team sorted last quarter's logged incidents by category and by whether an on-site visit was required. If one hardware incident is selected at random, what is the probability that it required an on-site visit?",
      questionTable: { headers: ["Category", "On-site visit", "No on-site visit", "Total"], rows: [["Hardware", "$27$", "$63$", "$90$"], ["Software", "$18$", "$72$", "$90$"], ["Total", "$45$", "$135$", "$180$"]] },
      correctAnswer: "0.3",
      explanation: "**SAT Pattern: Conditional Probability from Two-Way Table**\n\n**The correct answer is $0.3$.**\n\n**The Fast Way (~15s):** Stay in the hardware row: $\\frac{27}{90} = 0.3$.\n\n**The Full Solution:**\nStep 1: The selection is made from hardware incidents only, so the denominator is the hardware row total, $90$.\nStep 2: Of those $90$ incidents, $27$ required an on-site visit, so the probability is $\\frac{27}{90}$.\nStep 3: $\\frac{27}{90} = \\frac{3}{10} = 0.3$; check: the other $63$ hardware incidents give $\\frac{63}{90} = 0.7$, and $0.3 + 0.7 = 1$ ✓\n\n**Common Mistakes:**\n* Dividing by the on-site column total gives $\\frac{27}{45} = 0.6$, which answers a different question: the probability that an on-site visit was for a hardware incident.\n* Dividing by the grand total gives $\\frac{27}{180} = 0.15$, the probability that an incident is both hardware and on-site, with no condition applied.\n* Using the column total over the grand total gives $\\frac{45}{180} = 0.25$, the overall on-site rate, which ignores the hardware restriction.\n\n**Test Day Takeaway:** The phrase that names the group you are choosing from sets the denominator — here \"one hardware incident,\" so the row total $90$.",
      skills: ["conditional-probability", "two-way-table"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A capacity planner writes two equations relating the bandwidth $x$, in gigabits per second, reserved for streaming and the bandwidth $y$ reserved for backups on a shared link: $4x + 10y = 76$ and $6x + 15y = 114$. Which statement about this system is true?",
      choices: [
        // distractor: sees different coefficients and calls the lines parallel without comparing 4/6, 10/15, and 76/114
        { id: "A", text: "There is no solution, because the two lines are parallel and distinct." },
        // distractor: sets y = 0, verifies the pair (19, 0) in both equations, and calls it the only solution
        { id: "B", text: "There is exactly one solution, $(19, 0)$." },
        { id: "C", text: "There are infinitely many solutions, because each equation is a multiple of the other." },
        // distractor: verifies the pair (4, 6) in both equations and calls it the only solution
        { id: "D", text: "There is exactly one solution, $(4, 6)$." }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: System Equivalence Check**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** $\\frac{6}{4} = \\frac{15}{10} = \\frac{114}{76} = 1.5$, so the second equation is $1.5$ times the first — one line, infinitely many solutions.\n\n**The Full Solution:**\nStep 1: Compare the two equations term by term: $\\frac{6}{4} = 1.5$ and $\\frac{15}{10} = 1.5$, so the left sides are proportional.\nStep 2: Check the constants with the same factor: $1.5 \\times 76 = 114$, which matches the second equation exactly.\nStep 3: Multiplying the first equation by $1.5$ reproduces the second, so the two equations describe the same line and every point on it is a solution; check two of them: $(4, 6)$ gives $16 + 60 = 76$ and $24 + 90 = 114$, and $(19, 0)$ gives $76$ and $114$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: notices that the coefficients differ and jumps to \"parallel,\" but parallel and distinct requires the coefficient ratios to match while the constant ratio does not — here all three ratios equal $1.5$.\n* Choice B ($(19, 0)$): setting $y = 0$ gives $4x = 76$, so $x = 19$, and the pair does satisfy both equations — but so do infinitely many others, so it is not the only solution.\n* Choice D ($(4, 6)$): substitution lands on this pair, which also checks out in both equations; finding one solution never proves the solution is unique.\n\n**Test Day Takeaway:** Before solving a two-equation system, compare all three ratios — coefficients and constants. All equal means one line; coefficients equal but constants not means no solution.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The mass of dissolved salt in a saline stock solution is proportional to the volume of solution drawn. The table gives the mass measured for three sample volumes. How many grams of dissolved salt are in $250$ milliliters of the stock solution?",
      diagram: { type: "dataTable", params: { headers: ["Sample volume (mL)", "Dissolved salt (mg)"], rows: [["20", "34"], ["50", "85"], ["80", "136"]] } },
      choices: [
        // distractor: divides the 425 mg by 10,000 instead of by 1,000
        { id: "A", text: "$0.0425$" },
        { id: "B", text: "$0.425$" },
        // distractor: divides the 425 mg by 100 instead of by 1,000
        { id: "C", text: "$4.25$" },
        // distractor: reports the mass in milligrams without converting to grams
        { id: "D", text: "$425$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $\\frac{34}{20} = 1.7$ mg per mL, so $250$ mL holds $425$ mg, and $425 \\div 1000 = 0.425$ gram.\n\n**The Full Solution:**\nStep 1: The relationship is proportional, so the mass per milliliter is constant: $\\frac{34}{20} = \\frac{85}{50} = \\frac{136}{80} = 1.7$ milligrams per milliliter.\nStep 2: For $250$ milliliters the mass is $1.7 \\times 250 = 425$ milligrams.\nStep 3: Since $1$ gram is $1{,}000$ milligrams, $425$ milligrams $= \\frac{425}{1000} = 0.425$ gram; check by scaling the third row: $250$ mL is $3.125$ times $80$ mL, and $136 \\times 3.125 = 425$ mg ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.0425$): divides by $10{,}000$, shifting the decimal one place too far; that would make a gram equal to $10{,}000$ milligrams.\n* Choice C ($4.25$): divides by $100$, the centi- conversion, instead of the $1{,}000$ that separates milligrams from grams.\n* Choice D ($425$): computes the mass correctly but leaves it in milligrams, ignoring the \"grams\" the question asks for.\n\n**Test Day Takeaway:** Find the unit rate from any row, scale it, and convert only at the end — then reread the question to confirm which unit the answer must be in.",
      skills: ["unit-conversion"]
    },
    {
      id: 12,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "An architect's floor plan places three anchor holes of a triangular bracket at $(1, 4)$, $(1, 14)$, and $(c, 4)$, with $c > 1$ and one unit representing one inch. The bracket encloses $45$ square inches. What is the value of $c$?",
      correctAnswer: "10",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~25s):** The legs are $10$ and $c - 1$, so $\\frac{1}{2}(10)(c - 1) = 45$ gives $c - 1 = 9$ and $c = 10$.\n\n**The Full Solution:**\nStep 1: The corners $(1, 4)$ and $(1, 14)$ share the $x$-value $1$, so that side is vertical with length $14 - 4 = 10$ inches. The corners $(1, 4)$ and $(c, 4)$ share the $y$-value $4$, so that side is horizontal with length $c - 1$ inches.\nStep 2: The two sides meet at $(1, 4)$ at a right angle, so the area is $\\frac{1}{2}(10)(c - 1) = 45$.\nStep 3: Then $5(c - 1) = 45$, so $c - 1 = 9$ and $c = 10$; check: $\\frac{1}{2}(10)(9) = 45$ square inches ✓\n\n**Common Mistakes:**\n* Solving for the horizontal leg and stopping gives $9$, the length of the side, not the $x$-coordinate of the corner, which sits $1$ unit farther right.\n* Omitting the factor $\\frac{1}{2}$ gives $10(c - 1) = 45$, so $c - 1 = 4.5$ and $c = 5.5$, half the area's worth of width.\n* Using the $y$-coordinate $14$ as the height instead of the distance $14 - 4 = 10$ gives $\\frac{1}{2}(14)(c - 1) = 45$ and $c \\approx 7.4$.\n\n**Test Day Takeaway:** With two sides parallel to the axes, the legs are coordinate differences — subtract, then remember that a leg length and a coordinate are not the same number.",
      skills: ["triangle-area"]
    },
    {
      id: 13,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A storage rack holds $34$ drives, each with a capacity of either $4$ terabytes or $12$ terabytes, and the drives have a combined capacity of $264$ terabytes. How many of the drives have a capacity of $12$ terabytes?",
      choices: [
        { id: "A", text: "$16$" },
        // distractor: solves the system correctly but reports the number of 4-terabyte drives
        { id: "B", text: "$18$" },
        // distractor: divides the total capacity by 12, assuming every drive is a 12-terabyte drive
        { id: "C", text: "$22$" },
        // distractor: divides the extra capacity 128 by 4 instead of by the 8-terabyte difference
        { id: "D", text: "$32$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Two-Equation System from a Word Problem**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** If all $34$ drives held $4$ TB the rack would hold $136$ TB; each swap to a $12$ TB drive adds $8$ TB, and $\\frac{264 - 136}{8} = 16$.\n\n**The Full Solution:**\nStep 1: Let $s$ be the number of $4$-terabyte drives and $\\ell$ the number of $12$-terabyte drives. The count gives $s + \\ell = 34$ and the capacity gives $4s + 12\\ell = 264$.\nStep 2: Substitute $s = 34 - \\ell$ into the capacity equation: $4(34 - \\ell) + 12\\ell = 264$, so $136 + 8\\ell = 264$.\nStep 3: Then $8\\ell = 128$ and $\\ell = 16$; check: $s = 18$, and $4(18) + 12(16) = 72 + 192 = 264$ terabytes ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($18$): this is $s$, the number of $4$-terabyte drives, found correctly and then reported for the wrong variable.\n* Choice C ($22$): computes $264 \\div 12 = 22$, which would be the count only if every drive were a $12$-terabyte drive — but then the rack would hold $22$ drives, not $34$.\n* Choice D ($32$): divides the extra capacity $264 - 136 = 128$ by $4$ rather than by the $8$-terabyte gap between the two drive sizes; $32$ large drives and $2$ small ones would give $4(2) + 12(32) = 392$ terabytes, far past the $264$ stated.\n\n**Test Day Takeaway:** Name both unknowns, write the count equation and the total equation, and check at the end which unknown the question actually asked for.",
      skills: ["word-problem-to-equation", "setting-up-systems"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A reaction model gives the impurity level $p(x) = x^2 - 14x + 58$, where $x$ is the reagent concentration in millimoles per liter. Which expression is equivalent to $p(x)$ and shows the concentration at which the impurity level is least?",
      choices: [
        // distractor: computes 49 - 58 = -9 instead of 58 - 49 = 9
        { id: "A", text: "$(x - 7)^2 - 9$" },
        { id: "B", text: "$(x - 7)^2 + 9$" },
        // distractor: forgets to subtract the 49 that completing the square introduces
        { id: "C", text: "$(x - 7)^2 + 58$" },
        // distractor: uses +7 inside the square, which reproduces +14x rather than -14x
        { id: "D", text: "$(x + 7)^2 + 9$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Quadratic — Completing the Square**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Half of $-14$ is $-7$, and $(x - 7)^2$ carries an extra $+49$, so $p(x) = (x - 7)^2 + 58 - 49 = (x - 7)^2 + 9$.\n\n**The Full Solution:**\nStep 1: Take half the coefficient of $x$: $\\frac{-14}{2} = -7$, so the square to build is $(x - 7)^2 = x^2 - 14x + 49$.\nStep 2: That square supplies $49$, but the model has only $58$; write $p(x) = (x^2 - 14x + 49) + (58 - 49)$.\nStep 3: So $p(x) = (x - 7)^2 + 9$, least when the square is $0$, at $x = 7$; check at $x = 7$: the original gives $49 - 98 + 58 = 9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(x - 7)^2 - 9$): subtracts in the wrong order, $49 - 58 = -9$, and would make the least impurity level $-9$, which the original never reaches.\n* Choice C ($(x - 7)^2 + 58$): keeps the original constant and never removes the $49$ the square introduces; at $x = 7$ it gives $58$, not $9$.\n* Choice D ($(x + 7)^2 + 9$): expands to $x^2 + 14x + 58$, which has the wrong sign on the middle term and is least at $x = -7$.\n\n**Test Day Takeaway:** Completing the square adds the square of half the linear coefficient — subtract that same amount back so the expression stays equal to the original.",
      skills: ["quadratics"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A vertical post $4$ feet tall stands beneath a straight roof rafter that rises from the wall plate. The rafter reaches a height of $10$ feet at a horizontal distance of $35$ feet from the wall plate. How far, in feet, from the wall plate does the post meet the rafter?",
      choices: [
        // distractor: copies the post height as the horizontal distance
        { id: "A", text: "$4$" },
        { id: "B", text: "$14$" },
        // distractor: measures 35 - 14 = 21 back from the far end of the rafter instead of from the wall plate
        { id: "C", text: "$21$" },
        // distractor: inverts the proportion, computing 35 times 10/4
        { id: "D", text: "$87.5$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The post is $\\frac{4}{10}$ of the rafter's full rise, so it stands $\\frac{4}{10}(35) = 14$ feet from the wall plate.\n\n**The Full Solution:**\nStep 1: The rafter, the ground, and any vertical post form two right triangles that share the angle at the wall plate, so the triangles are similar.\nStep 2: Corresponding sides are proportional: $\\frac{\\text{post height}}{\\text{full rise}} = \\frac{\\text{distance to post}}{\\text{full run}}$, that is $\\frac{4}{10} = \\frac{d}{35}$.\nStep 3: Cross multiplying gives $10d = 140$, so $d = 14$ feet; check the rafter's slope: $\\frac{10}{35} = \\frac{2}{7}$, and $\\frac{2}{7}(14) = 4$ feet of height at $d = 14$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reuses the post's height as its distance, which would only be right if the rafter rose at exactly $45^\\circ$.\n* Choice C ($21$): computes $35 - 14 = 21$, measuring back from the tall end of the rafter rather than from the wall plate the question names.\n* Choice D ($87.5$): sets up the proportion upside down as $\\frac{10}{4} = \\frac{d}{35}$, placing the post more than twice as far out as the rafter's whole $35$-foot run.\n\n**Test Day Takeaway:** Write the proportion with matching parts on matching sides — heights over heights, distances over distances — before you cross multiply.",
      skills: ["similar-triangles"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The bar chart gives the total data transferred, in terabytes, by a data center in each of four quarters of one year. What was the percent decrease in data transferred from quarter 2 to quarter 3?",
      diagram: { type: "barChart", params: { data: [{ label: "Q1", value: 240 }, { label: "Q2", value: 300 }, { label: "Q3", value: 180 }, { label: "Q4", value: 210 }], xAxisLabel: "Quarter", yAxisLabel: "Data transferred (TB)", yMax: 330, yStep: 30 } },
      correctAnswer: "40",
      explanation: "**SAT Pattern: Percent Decrease**\n\n**The correct answer is $40$.**\n\n**The Fast Way (~20s):** The drop is $300 - 180 = 120$, and $\\frac{120}{300} = 0.4$, or $40\\%$.\n\n**The Full Solution:**\nStep 1: Read the two bars: quarter 2 is $300$ terabytes and quarter 3 is $180$ terabytes.\nStep 2: The decrease is $300 - 180 = 120$ terabytes.\nStep 3: Percent decrease divides the change by the original amount: $\\frac{120}{300} = 0.4 = 40\\%$; check: $300$ reduced by $40\\%$ is $300 - 0.4(300) = 180$ ✓\n\n**Common Mistakes:**\n* Dividing by the new value gives $\\frac{120}{180} \\approx 66.7$, which answers how much quarter 3 would have to grow to reach quarter 2.\n* Reporting the share that remains gives $\\frac{180}{300} = 60$, the percent kept rather than the percent lost.\n* Reporting the raw drop gives $120$, a count of terabytes rather than a percent.\n\n**Test Day Takeaway:** Percent change always divides by the starting value — the quantity you are moving away from, never the one you land on.",
      skills: ["percent-change"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A chemist starts with $m$ milliliters of stock solution, transfers $\\frac{2}{5}$ of it to flask A, then transfers $30$ milliliters of what remains to flask B, and finally discards half of what is still in the original container. Which expression gives the number of milliliters left in the original container?",
      choices: [
        { id: "A", text: "$\\frac{3}{10}m - 15$" },
        // distractor: halves only the m term and carries the 30 through unhalved
        { id: "B", text: "$\\frac{3}{10}m - 30$" },
        // distractor: halves the 2/5 that went to flask A instead of the 3/5 that stayed behind
        { id: "C", text: "$\\frac{1}{5}m - 15$" },
        // distractor: stops after the transfer to flask B and never discards half
        { id: "D", text: "$\\frac{3}{5}m - 30$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Word-to-Expression Translation**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** After flask A, $\\frac{3}{5}m$ remains; after flask B, $\\frac{3}{5}m - 30$; halving that gives $\\frac{3}{10}m - 15$.\n\n**The Full Solution:**\nStep 1: Transferring $\\frac{2}{5}$ of the stock leaves $1 - \\frac{2}{5} = \\frac{3}{5}$ of it, so $\\frac{3}{5}m$ milliliters stay in the container.\nStep 2: Removing $30$ milliliters more leaves $\\frac{3}{5}m - 30$.\nStep 3: Discarding half leaves half of that: $\\frac{1}{2}\\left(\\frac{3}{5}m - 30\\right) = \\frac{3}{10}m - 15$; check with $m = 100$: $60$ remain, then $30$, then $15$, and $\\frac{3}{10}(100) - 15 = 15$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{3}{10}m - 30$): halves the fraction but forgets that the $30$ milliliters already removed is inside the parentheses too; at $m = 100$ it gives $0$ instead of $15$.\n* Choice C ($\\frac{1}{5}m - 15$): halves $\\frac{2}{5}m$, the amount that left for flask A, rather than the $\\frac{3}{5}m$ that stayed; at $m = 100$ it gives $5$.\n* Choice D ($\\frac{3}{5}m - 30$): tracks the first two transfers correctly and then stops, ignoring the final instruction to discard half; at $m = 100$ it gives $30$.\n\n**Test Day Takeaway:** Translate one clause at a time, keeping a running expression for what is left — and when a fraction acts on everything so far, put the whole expression in parentheses first.",
      skills: ["word-problem-to-equation"]
    },
    {
      id: 18,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "In an office floor plan, the points within range of a wireless access point satisfy $2x^2 + 2y^2 - 24x + 16y - 24 = 0$, where each unit is one meter. What is the greatest distance, in meters, from the access point at which a device stays in range?",
      correctAnswer: "8",
      explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~40s):** Divide by $2$ to get $x^2 + y^2 - 12x + 8y - 12 = 0$; completing both squares gives $(x - 6)^2 + (y + 4)^2 = 64$, so the radius is $8$.\n\n**The Full Solution:**\nStep 1: The $x^2$ and $y^2$ terms must have coefficient $1$ before the squares can be completed, so divide every term by $2$: $x^2 + y^2 - 12x + 8y - 12 = 0$.\nStep 2: Group and complete: $x^2 - 12x$ needs $36$, and $y^2 + 8y$ needs $16$. Adding both to each side gives $(x - 6)^2 + (y + 4)^2 = 12 + 36 + 16 = 64$.\nStep 3: The equation is now in the form $(x - h)^2 + (y - k)^2 = r^2$, so $r^2 = 64$ and $r = 8$ meters; check the point $(14, -4)$, which is $8$ meters from the centre $(6, -4)$: $2(196) + 2(16) - 24(14) + 16(-4) - 24 = 392 + 32 - 336 - 64 - 24 = 0$ ✓\n\n**Common Mistakes:**\n* Completing the square without dividing by $2$ first gives $(x - 12)^2 + (y + 8)^2 = 232$ and a radius of about $15.2$ meters, because the halves of $-24$ and $16$ were taken from the wrong equation.\n* Reporting $r^2$ instead of $r$ gives $64$, the squared radius rather than the distance.\n* Leaving the $-12$ on the left when moving the constant gives $(x - 6)^2 + (y + 4)^2 = 40$ and a radius of about $6.3$ meters.\n\n**Test Day Takeaway:** General form only becomes a circle after the squared terms have coefficient $1$ — divide first, complete both squares second, and take the square root last.",
      skills: ["circle-equation", "completing-square-circles"]
    },
    {
      id: 19,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A titration controller reports a target reading $k$ for each delivered volume $v$, in milliliters, and over the controller's working range the two satisfy the equation $7v - 4 = k$. In terms of $k$, which expression is equal to $21v + 5$?",
      choices: [
        // distractor: adds 12 and 5 correctly but never triples k, treating 21v as k + 12
        { id: "A", text: "$k + 17$" },
        // distractor: triples k but not the 4, writing 21v as 3k + 4 before adding 5
        { id: "B", text: "$3k + 9$" },
        // distractor: stops at 21v = 3k + 12 and forgets to add the 5
        { id: "C", text: "$3k + 12$" },
        { id: "D", text: "$3k + 17$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Shifted Output**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** $7v = k + 4$, so $21v = 3k + 12$ and $21v + 5 = 3k + 17$.\n\n**The Full Solution:**\nStep 1: Solve the given equation for the whole quantity $7v$ rather than for $v$: adding $4$ to both sides gives $7v = k + 4$.\nStep 2: The target expression contains $21v = 3(7v)$, so multiply both sides by $3$: $21v = 3(k + 4) = 3k + 12$.\nStep 3: Add $5$: $21v + 5 = 3k + 17$; check with $v = 2$, where $k = 7(2) - 4 = 10$: $21(2) + 5 = 47$ and $3(10) + 17 = 47$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($k + 17$): adds $12$ and $5$ but leaves $k$ untripled; at $v = 2$, $k = 10$, this gives $27$ instead of $47$.\n* Choice B ($3k + 9$): distributes the $3$ to $k$ only, writing $21v = 3k + 4$, then adds $5$; at $v = 2$ it gives $39$.\n* Choice C ($3k + 12$): scales correctly to $21v$ but never adds the $+5$ the expression carries; at $v = 2$ it gives $42$.\n\n**Test Day Takeaway:** Do not solve for the variable — solve for the block the question needs, then scale and shift the whole equation in one move.",
      skills: ["solving-equations", "ratios"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "An engineer models a server room's cooling load $L$, in kilowatts, as $L(n) = 145 + 0.8n$, where $n$ is the number of thousands of requests per second the room's servers process during a monitoring window. Which statement best describes the meaning of $0.8$ in this model?",
      choices: [
        // distractor: reads 0.8 as the starting value, which is the constant 145
        { id: "A", text: "The cooling load is $0.8$ kilowatt when the servers process no requests." },
        // distractor: ignores that n counts thousands of requests, so the rate is 0.8 kW per thousand, not per request
        { id: "B", text: "The cooling load increases by $0.8$ kilowatt for each additional request per second." },
        // distractor: inverts the rate, describing requests per kilowatt instead of kilowatts per thousand requests
        { id: "C", text: "The servers process $0.8$ thousand additional requests per second for each additional kilowatt of cooling load." },
        { id: "D", text: "The cooling load increases by $0.8$ kilowatt for each additional thousand requests per second." }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Interpret Slope in Context**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The slope is kilowatts per unit of $n$, and one unit of $n$ is one thousand requests per second.\n\n**The Full Solution:**\nStep 1: In $L(n) = 145 + 0.8n$ the number $0.8$ multiplies $n$, so it is the slope: the change in $L$ per one-unit change in $n$.\nStep 2: The units follow the variables. $L$ is measured in kilowatts and $n$ in thousands of requests per second, so $0.8$ is $0.8$ kilowatt per thousand requests per second.\nStep 3: Test it: $L(10) = 145 + 8 = 153$ and $L(11) = 145 + 8.8 = 153.8$, a rise of $0.8$ kilowatt when $n$ goes up by $1$, that is, by one thousand requests per second ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: describes a starting value, but the load when $n = 0$ is $L(0) = 145$ kilowatts, not $0.8$.\n* Choice B: attaches the rate to a single request; since $n$ counts thousands, the per-request rate is $0.8 \\div 1000 = 0.0008$ kilowatt.\n* Choice C: reverses the ratio and would make the rate $\\frac{1}{0.8} = 1.25$ thousand requests per second per kilowatt.\n\n**Test Day Takeaway:** Read the slope's units straight off the variable definitions — output unit per input unit — and check whether the input is counted in singles, thousands, or some other block.",
      skills: ["slope-intercept-form"]
    },
    {
      id: 21,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "A research group's document archive grows at a constant rate as files are ingested. The table gives the archive's stored volume, in gigabytes, on three days of its first month of operation. What was the stored volume, in gigabytes, on day $0$, when ingestion began?",
      diagram: { type: "dataTable", params: { headers: ["Day", "Stored volume (GB)"], rows: [["6", "214"], ["14", "302"], ["22", "390"]] } },
      correctAnswer: "148",
      explanation: "**SAT Pattern: Slope from Two Points**\n\n**The correct answer is $148$.**\n\n**The Fast Way (~35s):** The rate is $\\frac{302 - 214}{14 - 6} = 11$ GB per day, so day $0$ holds $214 - 6(11) = 148$ GB.\n\n**The Full Solution:**\nStep 1: Constant growth means the volume is a linear function of the day. Use two rows to find the rate: $\\frac{302 - 214}{14 - 6} = \\frac{88}{8} = 11$ gigabytes per day.\nStep 2: Day $0$ is $6$ days before the first row, so subtract $6$ days of growth from that row: $214 - 6(11) = 214 - 66 = 148$.\nStep 3: Check the third row from this start: $148 + 22(11) = 148 + 242 = 390$ gigabytes ✓\n\n**Common Mistakes:**\n* Subtracting a single day's growth gives $214 - 11 = 203$, which is the volume on day $5$, not day $0$.\n* Reporting the first listed value gives $214$, treating day $6$ as though it were the start of the record.\n* Dividing the $88$-gigabyte rise by $4$ instead of by the $8$ days between the rows gives a rate of $22$ and a start of $214 - 132 = 82$.\n\n**Test Day Takeaway:** With a constant rate, find the change per single unit first, then count how many units separate the row you have from the one you want.",
      skills: ["slope-from-points"]
    },
    {
      id: 22,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "A chemistry lab models the mass of precipitate, in grams, by $\\hat{y} = 1.8x + 22.5$, where $x$ is the reagent volume in milliliters. At $x = 25$, three trials produced masses of $62.7$, $64.5$, and $64.5$ grams. Which statement best compares the model's prediction at $x = 25$ with the mean measured mass?",
      choices: [
        // distractor: uses the middle trial value 64.5 as the centre instead of the mean 63.9
        { id: "A", text: "The model overestimates the mean measured mass by $3.0$ grams." },
        { id: "B", text: "The model overestimates the mean measured mass by $3.6$ grams." },
        // distractor: compares the prediction with the smallest trial, 62.7, instead of the mean
        { id: "C", text: "The model overestimates the mean measured mass by $4.8$ grams." },
        // distractor: reverses the comparison, subtracting the prediction from the measurement
        { id: "D", text: "The model underestimates the mean measured mass by $3.6$ grams." }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Residual**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The model predicts $1.8(25) + 22.5 = 67.5$ grams; the trials average $63.9$ grams, and $67.5 - 63.9 = 3.6$ above.\n\n**The Full Solution:**\nStep 1: Evaluate the model at $x = 25$: $\\hat{y} = 1.8(25) + 22.5 = 45 + 22.5 = 67.5$ grams.\nStep 2: Average the three trials: $\\frac{62.7 + 64.5 + 64.5}{3} = \\frac{191.7}{3} = 63.9$ grams.\nStep 3: The prediction exceeds the measured mean by $67.5 - 63.9 = 3.6$ grams, so the model overestimates; check the direction: $63.9 + 3.6 = 67.5$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.0$ grams): uses $64.5$, the value two of the three trials share, as the centre, giving $67.5 - 64.5 = 3.0$; the question asks for the mean, which the low trial pulls down to $63.9$.\n* Choice C ($4.8$ grams): compares the prediction with the smallest trial alone, $67.5 - 62.7 = 4.8$, instead of with the average of all three.\n* Choice D (underestimates by $3.6$ grams): gets the size right but the direction backwards; the prediction $67.5$ is larger than the measured $63.9$, so the model runs high.\n\n**Test Day Takeaway:** Compare prediction with measurement in that order — predicted minus measured positive means the model runs high — and average every trial the question lists before comparing.",
      skills: ["calculate-mean", "slope-intercept-form"]
    }
  ]
};

export default practiceTest5M2Easy;
