// Practice Test 8 — Math Module 2 Easy variant (22 questions)
// v2 freshness rebuild (2026-09-07): every slot re-patterned and re-authored against the seen-corpus gate — docs/TEST_RECREATION_V2_SPEC.md
// For students routed to easier path after Module 1 (~<60% correct).
// Distribution: 3E / 13M / 6H. Q1-3 easy openers. Max-score ceiling: ~650.
// Domain mix: 7 Algebra / 6 Advanced Math / 5 Problem-Solving / 4 Geometry & Trig.
// Official-calibration recreation (2026-09-01): all content re-authored;
// slot metadata (id/type/difficulty/band/skills/pattern) frozen. Carries
// 4 diagram items (dot plots at Q3/Q7, similar triangles at Q18,
// scatterplot at Q22) per the ~20% official figure-density target.

export const practiceTest8M2Easy = {
  id: "module-2-easy",
  title: "Module 2 (Easy)",
  variant: "easy",
  timeLimit: 35,
  questions: [
    {
      id: 1,
      type: "fill-in",
      difficulty: "easy",
      band: 2,
      question: "The table shows visitors surveyed at each entrance of a national park. Of the visitors surveyed at the East entrance, $45\\%$ stayed overnight in the park. How many East entrance visitors did not stay overnight?",
      questionTable: { headers: ["Entrance", "Visitors surveyed"], rows: [["North", "$260$"], ["East", "$180$"], ["South", "$160$"]] },
      correctAnswer: "99",
      explanation: "**SAT Pattern: Percent Complement**\n\n**The correct answer is $99$.**\n\n**The Fast Way (~15s):** The complement of $45\\%$ is $55\\%$, and $0.55(180) = 99$.\n\n**The Full Solution:**\nStep 1: The percent statement applies only to the East entrance row, so the group being described has $180$ visitors, not the $600$ surveyed in all.\nStep 2: Staying overnight and not staying overnight are complementary outcomes, so the percent who did not stay overnight is $100\\% - 45\\% = 55\\%$.\nStep 3: Take $55\\%$ of the East entrance total: $0.55(180) = 99$ visitors. Check: $0.45(180) = 81$ visitors did stay overnight, and $81 + 99 = 180$, the full East entrance group. ✓\n\n**Common Mistakes:**\n* $81$: computes $0.45(180)$, the number who DID stay overnight, instead of the complement the question asks for.\n* $55$: reports the leftover percent itself as though it were a count of visitors.\n* $330$: applies $55\\%$ to all $600$ surveyed visitors instead of to the $180$ from the East entrance.\n\n**Test Day Takeaway:** A complement question has two moves: subtract the percent from $100\\%$, then apply the result to the exact group the sentence names — which in a table is one row, not the total.",
      skills: ["percent-of-value"]
    },
    {
      id: 2,
      type: "multiple-choice",
      difficulty: "easy",
      band: 2,
      question: "A clinic computes an antibiotic dose in milligrams as $d = 7w + 15$, where $w$ is a patient's mass in kilograms. Which expression gives the dose for a patient whose mass is $4$ kilograms greater than $w$?",
      choices: [
        // distractor: adds 4 to the constant term instead of to the mass, giving 15 + 4 = 19
        { id: "A", text: "$7w + 19$" },
        // distractor: replaces the constant with 7(4) = 28 and drops the original 15
        { id: "B", text: "$7w + 28$" },
        { id: "C", text: "$7w + 43$" },
        // distractor: multiplies the constant by 4 instead of adding 4 to the mass, giving 15(4) = 60
        { id: "D", text: "$7w + 60$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Shifted Output**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Substitute $w + 4$ for $w$: $7(w + 4) + 15 = 7w + 28 + 15 = 7w + 43$.\n\n**The Full Solution:**\nStep 1: The rule takes a mass and returns a dose, so a patient $4$ kilograms heavier has mass $w + 4$, and that whole quantity goes where $w$ goes.\nStep 2: $d = 7(w + 4) + 15$. Distribute the $7$ across both terms inside the parentheses: $7w + 28 + 15$.\nStep 3: Combine the constants: $7w + 43$. Check with $w = 10$: the original rule gives $7(10) + 15 = 85$, and a $14$-kilogram patient gets $7(14) + 15 = 113$, which matches $7(10) + 43 = 113$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7w + 19$): adds the $4$ to the constant term, $15 + 4 = 19$, but the extra mass enters the rule before the multiplication by $7$, not after.\n* Choice B ($7w + 28$): multiplies the $4$ by $7$ correctly but then drops the original $15$, which every dose still includes.\n* Choice D ($7w + 60$): multiplies the constant by $4$, giving $15(4) = 60$, treating the shift as a scaling of the whole rule.\n\n**Test Day Takeaway:** A shifted input goes inside the parentheses. Write $f(w + 4)$ first, then distribute — the coefficient multiplies the shift, so a $4$-unit increase in mass raises the dose by $7(4) = 28$.",
      skills: ["solving-equations", "ratios"]
    },
    {
      id: 3,
      type: "multiple-choice",
      difficulty: "easy",
      band: 3,
      question: "A pattern enlargement multiplies each of $30$ recorded thread lengths by $1.5$. The original lengths have a median of $62$ centimeters and a standard deviation of $8$ centimeters. Which statement describes the enlarged lengths?",
      choices: [
        // distractor: adds 1.5 to each statistic instead of multiplying, giving 62 + 1.5 = 63.5 and 8 + 1.5 = 9.5
        { id: "A", text: "Median $63.5$ centimeters and standard deviation $9.5$ centimeters" },
        // distractor: scales the median to 93 but leaves the standard deviation at 8, as if spread were unaffected by scaling
        { id: "B", text: "Median $93$ centimeters and standard deviation $8$ centimeters" },
        { id: "C", text: "Median $93$ centimeters and standard deviation $12$ centimeters" },
        // distractor: applies the factor twice, multiplying by 2.25 to get 139.5 and 18
        { id: "D", text: "Median $139.5$ centimeters and standard deviation $18$ centimeters" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Scaling a Data Set by a Constant**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Multiplying every value by $1.5$ multiplies both the median and the standard deviation by $1.5$: $62(1.5) = 93$ and $8(1.5) = 12$.\n\n**The Full Solution:**\nStep 1: Multiplying every value by a positive constant stretches the whole distribution by that constant. The value sitting in the middle before the stretch is still in the middle after it, so the median is multiplied by $1.5$.\nStep 2: The median becomes $62(1.5) = 93$ centimeters.\nStep 3: Standard deviation measures typical distance from the mean, and every distance is stretched by the same factor, so it becomes $8(1.5) = 12$ centimeters. Check with two values $8$ apart, say $58$ and $66$: after scaling they are $87$ and $99$, still $12$ apart. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (median $63.5$, standard deviation $9.5$): adds $1.5$ to each statistic. Adding a constant to every value would shift the median and leave the spread alone; it is not what multiplying does.\n* Choice B (median $93$, standard deviation $8$): scales the center but freezes the spread. That is the rule for ADDING a constant, not for multiplying by one.\n* Choice D (median $139.5$, standard deviation $18$): multiplies by $2.25$, applying the factor $1.5$ a second time.\n\n**Test Day Takeaway:** Adding a constant moves center and leaves spread; multiplying by a constant scales center AND spread by the same factor.",
      skills: ["data-analysis"]
    },
    {
      id: 4,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "A harbor logged $12$, $14$, $14$, $17$, $20$, $23$, and $k$ ferry crossings on seven consecutive days. The median of the seven values is $14$. Which of the following must be true about $k$?",
      choices: [
        { id: "A", text: "$k \\le 14$" },
        // distractor: assumes the unknown value must equal the median itself, though any k at or below 14 works
        { id: "B", text: "$k = 14$" },
        // distractor: reverses the direction of the inequality, but k = 20 pushes the fourth value up to 17
        { id: "C", text: "$k \\ge 14$" },
        // distractor: treats 17, the fourth number in the printed list, as the median and forces k above it
        { id: "D", text: "$k \\ge 17$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Median Calculation**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** With seven values the median is the $4$th in order. The six known values put $17$ in the $4$th spot, so $k$ must slide in below $14$ to push $14$ into that spot: $k \\le 14$.\n\n**The Full Solution:**\nStep 1: Order the six known values: $12$, $14$, $14$, $17$, $20$, $23$. Adding $k$ makes seven values, and the median of seven values is the fourth one from the bottom.\nStep 2: If $k > 14$, then $12$, $14$, $14$ are still the three smallest and the fourth value is $\\min(k, 17) > 14$ — too big. So $k$ cannot exceed $14$.\nStep 3: If $k \\le 14$, the ordered list starts $k$, $12$, $14$, $14$ or $12$, $k$, $14$, $14$ or $12$, $14$, $14$, $14$, and in every case the fourth value is $14$. Check the boundary: $k = 14$ gives $12, 14, 14, 14, 17, 20, 23$ with median $14$, while $k = 15$ gives $12, 14, 14, 15, 17, 20, 23$ with median $15$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($k = 14$): one value that works, but it is not the only one — $k = 9$ also leaves the median at $14$, so this is not what must be true.\n* Choice C ($k \\ge 14$): the right boundary with the inequality flipped. Testing $k = 20$ gives the list $12, 14, 14, 17, 20, 20, 23$, whose median is $17$, not $14$.\n* Choice D ($k \\ge 17$): reads $17$ as the median because it is the fourth number printed, but the median is defined by the SORTED position of all seven values.\n\n**Test Day Takeaway:** For a median question with an unknown, sort what you know, find which position the median occupies, and test the boundary value on each side — one test kills the reversed inequality.",
      skills: ["find-median"]
    },
    {
      id: 5,
      type: "fill-in",
      difficulty: "medium",
      band: 4,
      question: "A loom setup relates cotton spools $x$ and linen spools $y$ by $7x + 4y = 84$. A second setup uses $12$ cotton spools and $9$ linen spools, and its graph is parallel to the first. Its equation is $7x + 4y = c$. What is the value of $c$?",
      correctAnswer: "120",
      explanation: "**SAT Pattern: Parallel Lines and Standard Form**\n\n**The correct answer is $120$.**\n\n**The Fast Way (~20s):** Parallel lines in standard form share the left side, so substitute the point: $7(12) + 4(9) = 84 + 36 = 120$.\n\n**The Full Solution:**\nStep 1: Two lines written as $Ax + By = C$ are parallel exactly when they share the same $A$ and $B$ (same slope $-A/B$) but differ in $C$. That is why the second setup is given as $7x + 4y = c$.\nStep 2: The second setup uses $12$ cotton spools and $9$ linen spools, so the point $(12, 9)$ lies on its graph and must satisfy its equation.\nStep 3: Substitute: $c = 7(12) + 4(9) = 84 + 36 = 120$. Check the slope is unchanged: solving $7x + 4y = 120$ for $y$ gives $y = -\\frac{7}{4}x + 30$, and the first setup gives $y = -\\frac{7}{4}x + 21$ — same slope, different intercept. ✓\n\n**Common Mistakes:**\n* $84$: keeps the original constant, which would make the two setups the SAME line rather than two parallel ones.\n* $111$: swaps the coefficients when substituting, computing $4(12) + 7(9) = 48 + 63$.\n* $-15$: uses a perpendicular left side, $4x - 7y$, computing $4(12) - 7(9) = 48 - 63$.\n\n**Test Day Takeaway:** Parallel in standard form means copy $A$ and $B$ exactly, then let the given point decide the constant — no slope-intercept detour needed.",
      skills: ["writing-parallel-equation"]
    },
    {
      id: 6,
      type: "multiple-choice",
      difficulty: "medium",
      band: 4,
      question: "The figure gives the angle measures, in degrees, where two straight stitch lines cross on a fabric panel. What is the value of $y$?",
      diagram: { type: "intersectingLines", params: { angles: ["(3x + 10)°", "y°", "(5x - 26)°", ""], figureNote: true } },
      choices: [
        // distractor: stops at x = 18 instead of substituting it back and taking the supplement
        { id: "A", text: "$18$" },
        // distractor: reports 3(18) + 10 = 64, the measure of the vertical pair, rather than the angle marked y
        { id: "B", text: "$64$" },
        // distractor: assumes the two stitch lines are perpendicular, so every angle is 90
        { id: "C", text: "$90$" },
        { id: "D", text: "$116$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The two expression-marked angles are vertical, so $3x + 10 = 5x - 26$ gives $x = 18$ and an angle of $64$; $y$ sits next to it, so $y = 180 - 64 = 116$.\n\n**The Full Solution:**\nStep 1: The angles marked $(3x + 10)^\\circ$ and $(5x - 26)^\\circ$ are on opposite sides of the crossing point, so they are vertical angles and have equal measures: $3x + 10 = 5x - 26$.\nStep 2: Solve: $36 = 2x$, so $x = 18$, and each of those angles measures $3(18) + 10 = 64$ degrees.\nStep 3: The angle marked $y^\\circ$ shares a ray with the $64^\\circ$ angle and their outer rays form a straight line, so they are supplementary: $y = 180 - 64 = 116$. Check: $5(18) - 26 = 64$ as well, and the four angles total $64 + 116 + 64 + 116 = 360$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): reports $x$, which is only the middle of the problem — the question asks for an angle measure.\n* Choice B ($64$): gives the measure of the vertical pair. The angle marked $y^\\circ$ is next to those angles, not across from them.\n* Choice C ($90$): assumes the crossing lines are perpendicular. Nothing in the figure says so, and the solved measures $64$ and $116$ show they are not.\n\n**Test Day Takeaway:** At a crossing there are only two distinct measures. Solve the vertical pair for $x$, then decide whether the angle you want is the same measure (across) or its supplement (next to).",
      skills: ["angles"]
    },
    {
      id: 7,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "An oral suspension contains $240$ milligrams of active drug in every $4$ milliliters. A pharmacist measures out $6$ milliliters of the suspension, which contains $k$ milligrams of the drug. What is the value of $k$?",
      choices: [
        // distractor: inverts the proportion, computing 240(4)/6 = 160 milligrams
        { id: "A", text: "$160$" },
        { id: "B", text: "$360$" },
        // distractor: scales by the 2-milliliter difference instead of the ratio, computing 240(2) = 480
        { id: "C", text: "$480$" },
        // distractor: multiplies 240 by 6 without dividing by the 4 milliliters the 240 milligrams belongs to
        { id: "D", text: "$1{,}440$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Proportion Solving**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The concentration is $240 \\div 4 = 60$ milligrams per milliliter, so $6$ milliliters carry $60(6) = 360$ milligrams.\n\n**The Full Solution:**\nStep 1: Milligrams and milliliters are proportional, so $\\frac{240}{4} = \\frac{k}{6}$, with milligrams on top in both ratios.\nStep 2: Cross multiply: $4k = 240(6) = 1{,}440$, so $k = \\frac{1{,}440}{4} = 360$.\nStep 3: Confirm with the unit rate: each milliliter carries $60$ milligrams, and $6$ milliliters carry $6(60) = 360$ milligrams. Check the direction: $6$ milliliters is more than $4$, and $360 > 240$, so the answer grew as it should. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($160$): sets up the proportion upside down, computing $\\frac{240(4)}{6}$. That would answer how much drug is in a volume SMALLER than $4$ milliliters.\n* Choice C ($480$): scales by the difference $6 - 4 = 2$ instead of the ratio $\\frac{6}{4}$, computing $240(2)$. Proportions multiply by ratios, not by gaps.\n* Choice D ($1{,}440$): stops after cross multiplying and never divides by $4$.\n\n**Test Day Takeaway:** Convert the given pair to a unit rate first. One number — milligrams per milliliter — turns every follow-up volume into a single multiplication and makes an upside-down setup obvious.",
      skills: ["unit-conversion"]
    },
    {
      id: 8,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "Two dye batches are recorded as $4x + 6y = 14$ and $ax + 15y = 35$, where $x$ is grams of pigment, $y$ is grams of binder, and $a$ is a constant. Any mixture meeting the first record automatically meets the second. What is the value of $a$?",
      choices: [
        // distractor: divides 4 by the scale factor 2.5 instead of multiplying, giving 1.6
        { id: "A", text: "$1.6$" },
        { id: "B", text: "$10$" },
        // distractor: adds the difference of the y-coefficients, 15 - 6 = 9, to 4 instead of scaling
        { id: "C", text: "$13$" },
        // distractor: uses the difference of the constants, 35 - 14 = 21, as the coefficient
        { id: "D", text: "$21$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Same Line (Infinitely Many Solutions)**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The second record must be a multiple of the first. Since $\\frac{15}{6} = 2.5$, the whole equation is scaled by $2.5$, so $a = 4(2.5) = 10$.\n\n**The Full Solution:**\nStep 1: If every mixture satisfying the first equation also satisfies the second, the two equations describe the same line, so one is a constant multiple of the other.\nStep 2: Find the multiplier from a pair of terms that are both known. The $y$-terms give $\\frac{15}{6} = 2.5$, and the constants agree: $\\frac{35}{14} = 2.5$.\nStep 3: The same multiplier must apply to the $x$-terms, so $a = 4(2.5) = 10$. Check: multiplying $4x + 6y = 14$ by $2.5$ gives exactly $10x + 15y = 35$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.6$): divides by the multiplier instead of multiplying, computing $\\frac{4}{2.5}$. That would shrink the first equation, not stretch it into the second.\n* Choice C ($13$): adds the gap between the $y$-coefficients, $15 - 6 = 9$, to $4$. Same-line means every term is multiplied by one number, not increased by one number.\n* Choice D ($21$): uses $35 - 14$, the gap between the constants, as the coefficient — again treating a scaling as a difference.\n\n**Test Day Takeaway:** Infinitely many solutions means one equation is a scalar multiple of the other. Compute the multiplier from the two terms you fully know, verify it on the constants, then apply it to the unknown coefficient.",
      skills: ["system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 9,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "Five airport shuttles carried a mean of $16$ passengers. A sixth shuttle carried $n$ passengers, which raised the mean for all six shuttles to $17$. What is the value of $n$?",
      correctAnswer: "22",
      explanation: "**SAT Pattern: Mean from List**\n\n**The correct answer is $22$.**\n\n**The Fast Way (~25s):** Six shuttles at a mean of $17$ need $102$ passengers, and the first five carried $5(16) = 80$, so $n = 22$.\n\n**The Full Solution:**\nStep 1: A mean is a total divided by a count, so the five shuttles carried $5(16) = 80$ passengers in all.\nStep 2: With the sixth shuttle included, the mean is $17$ over six shuttles, so the six of them carried $6(17) = 102$ passengers.\nStep 3: The sixth shuttle accounts for the difference: $n = 102 - 80 = 22$ passengers. Check: $\\frac{80 + 22}{6} = \\frac{102}{6} = 17$. ✓\n\n**Common Mistakes:**\n* $16$: assumes the sixth shuttle matched the earlier mean, but a value equal to the old mean leaves the mean at $16$ instead of raising it.\n* $17$: assumes the sixth value must equal the new mean. That happens only when the mean does not change, and here it moved.\n* $80$: reports the five-shuttle total instead of the sixth shuttle's passengers.\n\n**Test Day Takeaway:** Convert every mean into a total before comparing. Two totals — before and after — turn a shifting-mean question into one subtraction.",
      skills: ["calculate-mean"]
    },
    {
      id: 10,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "An infusion pump has delivered $v = 8t + 16$ milliliters of fluid after running for $t$ minutes. For how many minutes has the pump run when it has delivered $96$ milliliters?",
      choices: [
        // distractor: divides 96 by the constant 16 instead of by the rate 8
        { id: "A", text: "$6$" },
        { id: "B", text: "$10$" },
        // distractor: divides 96 by 8 and ignores the 16 milliliters already in the line
        { id: "C", text: "$12$" },
        // distractor: adds 16 instead of subtracting it before dividing, computing (96 + 16)/8 = 14
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: One-Step Linear Equation**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Set $8t + 16 = 96$. Subtract $16$ to get $8t = 80$, so $t = 10$ minutes.\n\n**The Full Solution:**\nStep 1: The question gives the output and asks for the input, so substitute $96$ for $v$: $8t + 16 = 96$.\nStep 2: Undo the addition first. Subtracting $16$ from both sides leaves $8t = 80$, which strips off the $16$ milliliters the pump delivers before the per-minute rate starts counting.\nStep 3: Undo the multiplication: $t = \\frac{80}{8} = 10$ minutes. Check: $8(10) + 16 = 80 + 16 = 96$ milliliters. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): divides $96$ by $16$, the constant term, rather than by $8$, the per-minute rate.\n* Choice C ($12$): computes $\\frac{96}{8}$ and never removes the $16$ milliliters, so it credits the rate for fluid the pump did not deliver over time.\n* Choice D ($14$): adds the $16$ before dividing, computing $\\frac{112}{8}$, which reverses the sign of the step that undoes $+16$.\n\n**Test Day Takeaway:** Working backward through a linear rule reverses the order of operations: undo the addition first, then the multiplication.",
      skills: ["combining-like-terms"]
    },
    {
      id: 11,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A gusset is cut from denim in the shape shown, with the two marked lengths in centimeters and $\\theta$ at the upper corner. What is the value of $\\tan \\theta$?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 8]], sideLabels: ["", "8", "17"], labels: ["", "", "θ"], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: divides the two marked lengths, 8 over 17, which is cosine of theta rather than tangent
        { id: "A", text: "$\\frac{8}{17}$" },
        // distractor: inverts the tangent ratio, putting the adjacent leg 8 over the opposite leg 15
        { id: "B", text: "$\\frac{8}{15}$" },
        // distractor: gives sine of theta, 15 over the hypotenuse 17, instead of 15 over the adjacent leg
        { id: "C", text: "$\\frac{15}{17}$" },
        { id: "D", text: "$\\frac{15}{8}$" }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The missing leg is $\\sqrt{17^2 - 8^2} = 15$, and from $\\theta$ that leg is opposite while $8$ is adjacent, so $\\tan \\theta = \\frac{15}{8}$.\n\n**The Full Solution:**\nStep 1: The figure marks one leg as $8$ and the hypotenuse as $17$ (the side opposite the right angle). Tangent needs both legs, so find the missing one with the Pythagorean theorem: $8^2 + b^2 = 17^2$, so $b^2 = 289 - 64 = 225$ and $b = 15$.\nStep 2: Locate the legs relative to $\\theta$, the angle at the upper corner. The leg of length $15$ lies across the triangle from $\\theta$, so it is opposite; the leg of length $8$ runs from $\\theta$ to the right angle, so it is adjacent.\nStep 3: $\\tan \\theta = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{15}{8}$. Check: $8$-$15$-$17$ is a Pythagorean triple, and since the side opposite $\\theta$ is longer than the side adjacent to it, $\\tan \\theta$ must exceed $1$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{8}{17}$): divides the two numbers that are printed on the figure. That ratio is $\\cos \\theta$ — adjacent over hypotenuse — and the hypotenuse never appears in a tangent.\n* Choice B ($\\frac{8}{15}$): uses both legs but in the wrong order, giving adjacent over opposite. Its value is less than $1$, which cannot be right for an angle whose opposite leg is the longer one.\n* Choice C ($\\frac{15}{17}$): computes $\\sin \\theta$, pairing the opposite leg with the hypotenuse instead of with the adjacent leg.\n\n**Test Day Takeaway:** When a figure gives one leg and the hypotenuse but the question asks for tangent, the Pythagorean theorem is step one — then label opposite and adjacent from the marked angle before writing the ratio.",
      skills: ["soh-cah-toa", "pythagorean-theorem"]
    },
    {
      id: 12,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "A sterilizer divides a bacterial count by $25$ every hour, so the fraction surviving after $x$ hours is $\\left(\\dfrac{1}{25}\\right)^{x}$. A technician rewrites that fraction as $5^{kx}$, an equation that holds for every value of $x$. What is the value of the constant $k$?",
      choices: [
        { id: "A", text: "$-2$" },
        // distractor: keeps the negative from the reciprocal but inverts the exponent, using 25 = 5^(1/2) instead of 5^2
        { id: "B", text: "$-\\dfrac{1}{2}$" },
        // distractor: inverts the exponent and drops the negative, reading the reciprocal as a fractional exponent
        { id: "C", text: "$\\dfrac{1}{2}$" },
        // distractor: rewrites 25 as 5 squared but ignores the reciprocal, leaving the exponent positive
        { id: "D", text: "$2$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Exponential Equation with Common Base**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** $\\frac{1}{25} = 5^{-2}$, so $\\left(\\frac{1}{25}\\right)^{x} = 5^{-2x}$ and $k = -2$.\n\n**The Full Solution:**\nStep 1: Write both sides with the same base. Since $25 = 5^2$, the reciprocal is $\\frac{1}{25} = 5^{-2}$.\nStep 2: Raise that to the $x$: $\\left(5^{-2}\\right)^{x} = 5^{-2x}$, using the rule that a power of a power multiplies the exponents.\nStep 3: The equation $5^{-2x} = 5^{kx}$ holds for every $x$ only if the exponents match, so $kx = -2x$ and $k = -2$. Check at $x = 3$: $\\left(\\frac{1}{25}\\right)^{3} = \\frac{1}{15{,}625}$ and $5^{-6} = \\frac{1}{15{,}625}$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-\\frac{1}{2}$): keeps the negative sign that the reciprocal creates but inverts the exponent, as if $25 = 5^{1/2}$. In fact $5^{1/2} = \\sqrt{5}$, not $25$.\n* Choice C ($\\frac{1}{2}$): makes the same exponent slip and also drops the negative, so the surviving fraction would GROW with time.\n* Choice D ($2$): rewrites $25$ as $5^2$ correctly but forgets the reciprocal. That would say the count multiplies by $25$ each hour instead of dividing by it.\n\n**Test Day Takeaway:** A reciprocal is a negative exponent. Rewrite the base first ($\\frac{1}{25} = 5^{-2}$), then multiply exponents — and sanity check the sign against whether the quantity should grow or shrink.",
      skills: ["exponential-functions"]
    },
    {
      id: 13,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "A hotel car service charges a fare that is a linear function of trip distance: a $12$-kilometer trip costs $27$ dollars and a $20$-kilometer trip costs $39$ dollars. What is the fare, in dollars, for a $30$-kilometer trip?",
      correctAnswer: "54",
      explanation: "**SAT Pattern: Line from Two Points**\n\n**The correct answer is $54$.**\n\n**The Fast Way (~30s):** The rate is $\\frac{39 - 27}{20 - 12} = 1.5$ dollars per kilometer, so the fare climbs $1.5(10) = 15$ dollars from $20$ to $30$ kilometers: $39 + 15 = 54$.\n\n**The Full Solution:**\nStep 1: Treat distance as $x$ and fare as $y$. The two given trips are the points $(12, 27)$ and $(20, 39)$.\nStep 2: The slope is $\\frac{39 - 27}{20 - 12} = \\frac{12}{8} = 1.5$ dollars per kilometer. Using the point $(12, 27)$, the base charge is $27 - 1.5(12) = 27 - 18 = 9$ dollars, so the fare is $y = 1.5x + 9$.\nStep 3: For a $30$-kilometer trip, $y = 1.5(30) + 9 = 45 + 9 = 54$ dollars. Check the other given point: $1.5(20) + 9 = 39$. ✓\n\n**Common Mistakes:**\n* $45$: computes $1.5(30)$ and forgets the $9$-dollar base charge that every fare includes.\n* $51$: adds the $12$-dollar jump again ($39 + 12$), treating $20$ to $30$ kilometers as another $8$-kilometer step when it is a $10$-kilometer step.\n* $67.5$: assumes the fare is proportional to distance, using $\\frac{27}{12} = 2.25$ dollars per kilometer times $30$. A nonzero base charge makes the relationship linear but not proportional.\n\n**Test Day Takeaway:** Two points give the rate; one point then gives the base. Never divide a single fare by a single distance unless you have checked that the line passes through the origin.",
      skills: ["linear-functions", "slope", "coordinate-geometry"]
    },
    {
      id: 14,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "The quadratic function $f(x) = x^2 + bx + 36$ has two zeros, both positive, and the larger zero is $9$ times the smaller zero. What is the value of the constant $b$?",
      choices: [
        // distractor: uses the factor pair 1 and 36, whose sum is 37, ignoring that the larger zero must be 9 times the smaller
        { id: "A", text: "$-37$" },
        { id: "B", text: "$-20$" },
        // distractor: uses the factor pair 4 and 9 because a 9 appears in the condition, giving a sum of 13
        { id: "C", text: "$-13$" },
        // distractor: reports the sum of the zeros, 20, instead of its opposite
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Quadratic — Vieta's Sum/Product**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The zeros multiply to $36$, so with zeros $r$ and $9r$, $9r^2 = 36$ gives $r = 2$. The zeros are $2$ and $18$, and $b$ is the opposite of their sum: $b = -20$.\n\n**The Full Solution:**\nStep 1: For $x^2 + bx + c$, the two zeros multiply to $c$ and add to $-b$. Here the product is $36$.\nStep 2: Write the zeros as $r$ and $9r$ with $r > 0$. Their product is $9r^2 = 36$, so $r^2 = 4$ and $r = 2$, making the zeros $2$ and $18$.\nStep 3: Their sum is $20$, and the sum equals $-b$, so $b = -20$. Check by factoring: $x^2 - 20x + 36 = (x - 2)(x - 18)$, whose zeros are $2$ and $18$, and $18 = 9(2)$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-37$): takes the factor pair $1$ and $36$. Those multiply to $36$, but $36$ is $36$ times $1$, not $9$ times it.\n* Choice C ($-13$): grabs the pair $4$ and $9$ because a $9$ appears in the condition. Their product is $36$, but $9$ is not $9$ times $4$.\n* Choice D ($20$): finds the correct zeros and reports their sum. The coefficient $b$ is the OPPOSITE of the sum, which the factored form $(x - 2)(x - 18)$ makes visible.\n\n**Test Day Takeaway:** Use the product first when the constant term is given and the zeros are related by a ratio — it pins the zeros in one step, and the sum then gives $b$ with a sign flip.",
      skills: ["quadratic-factoring"]
    },
    {
      id: 15,
      type: "multiple-choice",
      difficulty: "medium",
      band: 5,
      question: "In a random sample of $180$ patients at a surgical center, the mean recovery time after a procedure was $11.4$ days, with an associated margin of error of $0.8$ day. Which conclusion is most appropriate?",
      choices: [
        // distractor: ignores the margin of error and treats the sample mean 11.4 as the exact population mean
        { id: "A", text: "The mean recovery time for all patients at the surgical center is exactly $11.4$ days." },
        // distractor: applies the interval to individual patients rather than to the mean recovery time
        { id: "B", text: "The recovery time of every patient in the sample was between $10.6$ and $12.2$ days." },
        // distractor: adds the margin of error but never subtracts it, using only 11.4 to 12.2
        { id: "C", text: "It is plausible that the mean recovery time for all patients at the surgical center is between $11.4$ and $12.2$ days." },
        { id: "D", text: "It is plausible that the mean recovery time for all patients at the surgical center is between $10.6$ and $12.2$ days." }
      ],
      correctAnswer: "D",
      explanation: "**SAT Pattern: Margin of Error**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The plausible interval for the population mean is $11.4 \\pm 0.8$, or $10.6$ to $12.2$ days.\n\n**The Full Solution:**\nStep 1: A margin of error is attached to the sample MEAN and describes the population MEAN. It says nothing about how any single patient's recovery time behaves.\nStep 2: Build the interval by subtracting and adding the margin: $11.4 - 0.8 = 10.6$ days and $11.4 + 0.8 = 12.2$ days.\nStep 3: The appropriate conclusion is that the mean recovery time for all patients at the surgical center is plausibly between $10.6$ and $12.2$ days. Check the width: the interval is centered on $11.4$ and is $1.6$ days wide, which is twice the margin, as it must be. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($11.4$ exactly): drops the margin of error entirely. A sample estimates the population mean; it does not pin it down.\n* Choice B: uses the right two endpoints but applies them to individual patients. Individual recovery times vary far more widely than the mean does.\n* Choice C ($11.4$ to $12.2$): adds the margin without subtracting it, so the interval is half as wide and is not centered on the estimate.\n\n**Test Day Takeaway:** A margin of error always builds a two-sided interval around the sample statistic, and the claim it supports is about the population MEAN — never about every individual.",
      skills: ["margin-of-error"]
    },
    {
      id: 16,
      type: "fill-in",
      difficulty: "medium",
      band: 5,
      question: "The table shows the number of units of each fabric a mill shipped in April. For denim, April's shipment was $130\\%$ of March's shipment, and March's shipment was $75\\%$ of February's shipment. How many units of denim did the mill ship in February?",
      questionTable: { headers: ["Fabric", "Units shipped in April"], rows: [["Denim", "$195$"], ["Twill", "$168$"], ["Canvas", "$143$"]] },
      correctAnswer: "200",
      explanation: "**SAT Pattern: Reverse-Percent Multi-Step**\n\n**The correct answer is $200$.**\n\n**The Fast Way (~40s):** Work backward twice: $\\frac{195}{1.3} = 150$ units in March, then $\\frac{150}{0.75} = 200$ units in February.\n\n**The Full Solution:**\nStep 1: The table gives April's denim shipment as $195$ units. \"April was $130\\%$ of March\" means $195 = 1.3(\\text{March})$, so March is found by DIVIDING: $\\frac{195}{1.3} = 150$ units.\nStep 2: \"March was $75\\%$ of February\" means $150 = 0.75(\\text{February})$, so February $= \\frac{150}{0.75} = 200$ units.\nStep 3: Check forward: $75\\%$ of $200$ is $150$, and $130\\%$ of $150$ is $195$, the April figure in the table. ✓\n\n**Common Mistakes:**\n* $150$: stops after undoing the first percent and reports March's shipment instead of February's.\n* $253.5$: multiplies by $1.3$ instead of dividing, computing $195(1.3)$, which finds a month AFTER April rather than before it.\n* $260$: undoes only the $75\\%$ step, computing $\\frac{195}{0.75}$ and skipping the March-to-April relationship entirely.\n\n**Test Day Takeaway:** \"A is $p\\%$ of B\" means $A = \\frac{p}{100} \\cdot B$. Going backward to $B$ divides, and with two links you divide twice — then run it forward once to confirm.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 17,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A pharmacy's filling machine flags a vial when $|2x + a| = 14$, where $x$ is the vial's fill volume in milliliters and $a$ is a constant. The machine flags vials with fill volumes of $4$ milliliters and $18$ milliliters. What is the value of $a$?",
      choices: [
        { id: "A", text: "$-22$" },
        // distractor: uses the midpoint 11 of the two flagged volumes in 2x + a = 14, giving a = -8
        { id: "B", text: "$-8$" },
        // distractor: solves only the positive branch at x = 4, giving 8 + a = 14 and a = 6, which fails at x = 18
        { id: "C", text: "$6$" },
        // distractor: uses the sum of the two flagged volumes, 4 + 18, without the negative sign
        { id: "D", text: "$22$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Absolute Value Equation**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The two flagged volumes sit on opposite branches, so $2(4) + a = -14$ and $2(18) + a = 14$. Either one gives $a = -22$.\n\n**The Full Solution:**\nStep 1: An absolute-value equation $|2x + a| = 14$ has two solutions because the inside expression can equal $14$ or $-14$. The two flagged volumes are those two solutions, so one uses each branch.\nStep 2: The smaller volume goes with the negative branch: $2(4) + a = -14$, so $8 + a = -14$ and $a = -22$.\nStep 3: The larger volume must satisfy the other branch with the same constant: $2(18) - 22 = 36 - 22 = 14$. ✓ Check both at once: $|2(4) - 22| = |-14| = 14$ and $|2(18) - 22| = |14| = 14$, so both listed volumes are flagged and no others are.\n\n**Why the wrong answers are tempting:**\n* Choice B ($-8$): averages the two flagged volumes to $11$ and substitutes that into $2x + a = 14$. The midpoint is where the inside expression is $0$, not where it equals $14$ — with $a = -8$ the machine would flag $11$ and $-3$ milliliters.\n* Choice C ($6$): solves only the positive branch at $x = 4$. It makes that vial flag, but then $|2(18) + 6| = 42$, so the $18$-milliliter vial would not be flagged.\n* Choice D ($22$): gets the size right from $4 + 18$ but keeps it positive. With $a = 22$ the flagged volumes are $-4$ and $-18$ milliliters, which are not possible fill volumes.\n\n**Test Day Takeaway:** Two given solutions of one absolute-value equation always split across the two branches. Write one equation from each branch, solve, and then substitute back into BOTH — a constant that satisfies only one branch is a trap.",
      skills: ["combining-like-terms"]
    },
    {
      id: 18,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "On a hiking trail map with coordinates given in kilometers, three markers are at $(0, 0)$, $(p, 0)$, and $(q, r)$, where $p$, $q$, and $r$ are positive constants. Which expression gives the area, in square kilometers, of the triangle formed by the three markers?",
      choices: [
        // distractor: uses q, the third marker's horizontal coordinate, as the height instead of its vertical coordinate r
        { id: "A", text: "$\\frac{1}{2}pq$" },
        // distractor: uses q as the base instead of p, the length of the side lying on the horizontal axis
        { id: "B", text: "$\\frac{1}{2}qr$" },
        { id: "C", text: "$\\frac{1}{2}pr$" },
        // distractor: adds the two horizontal coordinates to form the base, as if the figure were a trapezoid
        { id: "D", text: "$\\frac{1}{2}(p + q)r$" }
      ],
      correctAnswer: "C",
      explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The side from $(0, 0)$ to $(p, 0)$ lies along the horizontal axis, so the base is $p$ and the height is the third marker's vertical distance from that axis, $r$: area $= \\frac{1}{2}pr$.\n\n**The Full Solution:**\nStep 1: Choose the side that is easiest to measure. The markers $(0, 0)$ and $(p, 0)$ both have vertical coordinate $0$, so the segment joining them is horizontal with length $p$. Take that as the base.\nStep 2: The height is the perpendicular distance from the third marker to the line containing the base. That line is the horizontal axis, so the distance is the third marker's vertical coordinate, $r$. Its horizontal coordinate $q$ only slides the marker along, which does not change the height.\nStep 3: Area $= \\frac{1}{2}(\\text{base})(\\text{height}) = \\frac{1}{2}pr$. Check with numbers: for $p = 6$, $q = 5$, $r = 4$ the triangle has vertices $(0,0)$, $(6,0)$, $(5,4)$ and area $\\frac{1}{2}(6)(4) = 12$, which does not depend on $q$ at all. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{1}{2}pq$): keeps the correct base but uses $q$ as the height. $q$ measures sideways motion, and sliding the top marker sideways leaves the area unchanged.\n* Choice B ($\\frac{1}{2}qr$): pairs the correct height with the wrong base, using the third marker's horizontal coordinate instead of the length $p$ of the side on the axis.\n* Choice D ($\\frac{1}{2}(p + q)r$): adds the two horizontal coordinates, which is the trapezoid rule $\\frac{1}{2}(b_1 + b_2)h$ applied to a triangle.\n\n**Test Day Takeaway:** With one side on an axis, the area needs only two numbers: the length of that side and the perpendicular coordinate of the opposite vertex. Any coordinate that slides a vertex parallel to the base is irrelevant.",
      skills: ["triangle-area"]
    },
    {
      id: 19,
      type: "fill-in",
      difficulty: "hard",
      band: 6,
      question: "A workshop cut $24$ garments, jackets and vests only, from $6.2$ bolts of fabric, each bolt holding $10$ meters. Each jacket used $3.5$ meters of fabric and each vest used $1.5$ meters. How many of the $24$ garments were vests?",
      correctAnswer: "11",
      explanation: "**SAT Pattern: System of Equations — Substitution**\n\n**The correct answer is $11$.**\n\n**The Fast Way (~50s):** The bolts hold $62$ meters. If all $24$ were vests they would use $36$ meters; each jacket adds $2$ meters, so $\\frac{62 - 36}{2} = 13$ jackets and $24 - 13 = 11$ vests.\n\n**The Full Solution:**\nStep 1: Convert the fabric to meters first: $6.2$ bolts at $10$ meters each is $62$ meters. Let $j$ be the number of jackets and $v$ the number of vests, so $j + v = 24$ and $3.5j + 1.5v = 62$.\nStep 2: Substitute $j = 24 - v$ into the fabric equation: $3.5(24 - v) + 1.5v = 62$, which becomes $84 - 3.5v + 1.5v = 62$, or $84 - 2v = 62$.\nStep 3: Solve: $2v = 22$, so $v = 11$ vests and $j = 13$ jackets. Check both conditions: $13 + 11 = 24$ garments, and $3.5(13) + 1.5(11) = 45.5 + 16.5 = 62$ meters. ✓\n\n**Common Mistakes:**\n* $13$: solves the system correctly but reports the number of jackets, the variable that was substituted out, instead of the vests.\n* $12$: assumes the $24$ garments split evenly. An even split would use $3.5(12) + 1.5(12) = 60$ meters, two meters short of the $62$ available.\n* $41.3$: divides all $62$ meters by the $1.5$ meters a vest uses, ignoring that jackets consumed fabric too.\n\n**Test Day Takeaway:** Convert every quantity to one unit before writing the equations — a total given in bolts and a rate given in meters is the trap. Then substitute the count equation into the amount equation and finish by answering the variable actually asked for.",
      skills: ["substitution-method"]
    },
    {
      id: 20,
      type: "multiple-choice",
      difficulty: "hard",
      band: 6,
      question: "A transit kiosk sells single-ride tickets and day passes. Three single-ride tickets and five day passes cost $44$ dollars, five single-ride tickets and three day passes cost $c$ dollars, and one ticket plus one pass costs $10$ dollars. What is the value of $c$?",
      choices: [
        { id: "A", text: "$36$" },
        // distractor: assumes both items cost 5 dollars each, computing 5(5) + 3(5) = 40
        { id: "B", text: "$40$" },
        // distractor: assumes the mirrored purchase must cost the same as the first, 44 dollars
        { id: "C", text: "$44$" },
        // distractor: uses 8(x + y) = 80 as c and forgets to subtract the 44 from the first purchase
        { id: "D", text: "$80$" }
      ],
      correctAnswer: "A",
      explanation: "**SAT Pattern: Solve for a Combination**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** Adding the two purchases gives $8x + 8y = 44 + c$. Since $x + y = 10$, the left side is $80$, so $c = 80 - 44 = 36$.\n\n**The Full Solution:**\nStep 1: Let $x$ be the price of a single-ride ticket and $y$ the price of a day pass. The three facts are $3x + 5y = 44$, $5x + 3y = c$, and $x + y = 10$.\nStep 2: Add the first two equations. The $x$-terms give $3x + 5x = 8x$ and the $y$-terms give $5y + 3y = 8y$, so $8x + 8y = 44 + c$, which is $8(x + y) = 44 + c$.\nStep 3: Substitute $x + y = 10$: $80 = 44 + c$, so $c = 36$. Check by finding the prices: subtracting the equations gives $2y - 2x = 44 - 36 = 8$, so $y - x = 4$; with $x + y = 10$ that means $x = 3$ and $y = 7$, and indeed $3(3) + 5(7) = 44$ and $5(3) + 3(7) = 36$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($40$): reads $x + y = 10$ as $x = y = 5$. The prices sum to $10$ but are not equal — they are $3$ and $7$ — and $5(5) + 3(5) = 40$.\n* Choice C ($44$): assumes swapping the counts cannot change the total. It changes the total whenever the two prices differ, and here the cheaper item is bought more often, so $c < 44$.\n* Choice D ($80$): computes $8(x + y) = 80$ but reports it as $c$ instead of subtracting the $44$ that the first purchase already accounts for.\n\n**Test Day Takeaway:** When a system's coefficients are mirrored, add the equations. The sum collapses to a multiple of $x + y$, and a given combination finishes the problem without ever solving for $x$ and $y$ separately.",
      skills: ["elimination-method"]
    },
    {
      id: 21,
      type: "multiple-choice",
      difficulty: "hard",
      band: 7,
      question: "A single dose gives a plasma concentration, in milligrams per liter, of $c(t) = -3t^2 + 30t$ at $t$ hours, as graphed. The dose treats an infection only while that concentration stays at or above $48$ milligrams per liter. For how many minutes does it treat the infection?",
      diagram: { type: "parabola", params: { vertex: { h: 5, k: 75 }, a: -3, xRange: [0, 10], yRange: [0, 80], xTickInterval: 1, yTickInterval: 25, gridInterval: 5, showVertex: false } },
      choices: [
        // distractor: converts only t = 2, the time the concentration first reaches 48, giving 120 minutes
        { id: "A", text: "$120$" },
        { id: "B", text: "$360$" },
        // distractor: converts t = 8, the later time the concentration equals 48, instead of the length of the interval
        { id: "C", text: "$480$" },
        // distractor: uses the full 10 hours during which the concentration is positive, giving 600 minutes
        { id: "D", text: "$600$" }
      ],
      correctAnswer: "B",
      explanation: "**SAT Pattern: Quadratic Inequality from Context**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** Solve $-3t^2 + 30t \\ge 48$: dividing by $-3$ flips it to $t^2 - 10t + 16 \\le 0$, or $(t - 2)(t - 8) \\le 0$, so $2 \\le t \\le 8$ — six hours, or $360$ minutes.\n\n**The Full Solution:**\nStep 1: The condition is $-3t^2 + 30t \\ge 48$. Move everything to one side: $-3t^2 + 30t - 48 \\ge 0$, and divide by $-3$, reversing the inequality: $t^2 - 10t + 16 \\le 0$.\nStep 2: Factor: $(t - 2)(t - 8) \\le 0$. A product of two factors is negative or zero only between the roots, so $2 \\le t \\le 8$ — exactly the stretch where the graph sits at or above the $48$ level.\nStep 3: The interval lasts $8 - 2 = 6$ hours, which is $6(60) = 360$ minutes. Check the endpoints and the middle: $c(2) = -12 + 60 = 48$, $c(8) = -192 + 240 = 48$, and $c(5) = -75 + 150 = 75 \\ge 48$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($120$): converts $t = 2$, the moment the drug first becomes effective. That is when the window opens, not how long it lasts.\n* Choice C ($480$): converts $t = 8$, the moment the window closes. Subtracting the two crossing times is the step that turns endpoints into a duration.\n* Choice D ($600$): uses all $10$ hours the concentration is above zero, ignoring the $48$ milligrams-per-liter threshold entirely.\n\n**Test Day Takeaway:** A \"how long\" question wants the DIFFERENCE of the two crossing times, not either crossing time — and when you divide an inequality by a negative number, the sign flips.",
      skills: ["quadratics"]
    },
    {
      id: 22,
      type: "fill-in",
      difficulty: "hard",
      band: 7,
      question: "On a nautical chart marked in kilometers, a marina is at $(2, 1)$ and an island dock is at $(k, 7)$. The straight-line distance from the marina to the dock is $10$ kilometers. What is the least possible value of $k$?",
      correctAnswer: "-6",
      explanation: "**SAT Pattern: Distance Formula**\n\n**The correct answer is $-6$.**\n\n**The Fast Way (~45s):** The vertical gap is $6$, so $(k - 2)^2 = 100 - 36 = 64$ and $k - 2 = \\pm 8$; the smaller coordinate is $k = 2 - 8 = -6$.\n\n**The Full Solution:**\nStep 1: Apply the distance formula to $(2, 1)$ and $(k, 7)$: $\\sqrt{(k - 2)^2 + (7 - 1)^2} = 10$. Squaring both sides gives $(k - 2)^2 + 36 = 100$.\nStep 2: Isolate the square: $(k - 2)^2 = 64$, so $k - 2 = 8$ or $k - 2 = -8$, giving $k = 10$ or $k = -6$. Both put the dock exactly $10$ kilometers from the marina — one on each side of it.\nStep 3: The question asks for the least of those values, so $k = -6$. Check: from $(2, 1)$ to $(-6, 7)$ the legs are $8$ and $6$, and $\\sqrt{64 + 36} = \\sqrt{100} = 10$ kilometers. ✓\n\n**Common Mistakes:**\n* $10$: keeps only the positive square root. That value does place the dock $10$ kilometers away, but it is the GREATEST possible value of $k$, not the least.\n* $-8$: solves $k - 2 = -8$ and then reports the horizontal gap instead of the coordinate $k$ itself.\n* $-2$: subtracts the vertical gap from the distance, computing $10 - 6 = 4$ and then $2 - 4$, as if the two legs added to the hypotenuse.\n\n**Test Day Takeaway:** Squaring an equation produces two roots, and a phrase like \"least possible value\" is the signal that the negative branch is the one being asked for — then turn the gap back into a coordinate.",
      skills: ["coordinate-geometry"]
    }
  ]
};

export default practiceTest8M2Easy;
