// Practice questions for Triangles module
// Questions are organized by SECTION (question type)

export const trianglesQuestions = {
  // Section: Triangle Fundamentals
  "Triangle Fundamentals": [
    {
      id: 1,
      difficulty: "easy",
      question: "In triangle $JKL$, the measures of angles $J$, $K$, and $L$ are $x°$, $y°$, and $z°$, respectively. What is the value of $x + y + z$?",
      choices: [
        // distractor: the measure of a single right angle, not the total of all three angles
        { id: "A", text: "$90$" },
        { id: "B", text: "$180$" },
        // distractor: adds an extra $90$ to the correct total, as if a right angle were counted separately
        { id: "C", text: "$270$" },
        // distractor: the interior-angle sum of a quadrilateral, not of a triangle
        { id: "D", text: "$360$" }
      ],
      correctAnswer: "B",
      hint: "Draw any triangle you like and add its three angle measures — the total never changes.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** The interior angles of any triangle add to $180°$, so $x + y + z = 180$.\n\n**The Full Solution:**\nStep 1: The Triangle Angle Sum Theorem states that the three interior angles of every triangle have measures totaling $180°$.\nStep 2: Here those measures are $x°$, $y°$, and $z°$, so $x° + y° + z° = 180°$.\nStep 3: Reading off the numerical values gives $x + y + z = 180$.\n\nVerification: An equilateral triangle has angles $60°$, $60°$, and $60°$, and $60 + 60 + 60 = 180$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($90$): the measure of a single right angle, not the total of all three angles.\n* Choice C ($270$): adds an extra $90$ to the correct total, as if a right angle were counted separately.\n* Choice D ($360$): the interior-angle sum of a quadrilateral, not of a triangle.\n\n**Test Day Takeaway:** Every triangle carries exactly $180°$ of interior angle and every quadrilateral carries $360°$. Fixing those two numbers turns most angle questions into one subtraction.",
      skills: ["triangle-angle-sum"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The side lengths of a triangle are $11$, $11$, and $17$. Which of the following best describes this triangle?",
      choices: [
        // distractor: requires all three side lengths to be equal, but $17 \neq 11$
        { id: "A", text: "Equilateral" },
        { id: "B", text: "Isosceles" },
        // distractor: would require $11^2 + 11^2 = 17^2$, and $242 \neq 289$
        { id: "C", text: "Right" },
        // distractor: requires no two sides to be equal, but two sides here measure $11$
        { id: "D", text: "Scalene" }
      ],
      correctAnswer: "B",
      hint: "Count how many of the three lengths are equal to each other.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** Exactly two of the three side lengths are equal, so the triangle is isosceles.\n\n**The Full Solution:**\nStep 1: Classify by sides: equilateral means all three lengths equal, isosceles means exactly two equal, and scalene means no two equal.\nStep 2: Compare the given lengths: $11 = 11$, while $11 \\neq 17$.\nStep 3: Exactly two sides match, so the triangle is isosceles.\n\nVerification: The two equal sides force two equal angles, which is exactly what an isosceles triangle has. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (Equilateral): requires all three side lengths to be equal, but $17 \\neq 11$.\n* Choice C (Right): would require $11^2 + 11^2 = 17^2$, and $242 \\neq 289$.\n* Choice D (Scalene): requires no two sides to be equal, but two sides here measure $11$.\n\n**Test Day Takeaway:** Classify by counting how many side lengths match — three, two, or none — before testing anything else.",
      skills: ["triangle-types"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A solar sail's triangular gore has a right angle at one corner, and its other two angles measure $(4k + 6)$ degrees and $(2k - 6)$ degrees. What is the value of $k$?",
      choices: [
        { id: "A", text: "$15$" },
        // distractor: reports the angle (2k - 6) rather than k
        { id: "B", text: "$24$" },
        // distractor: sets the two acute angles equal to 180 instead of 90
        { id: "C", text: "$30$" },
        // distractor: reports the angle (4k + 6) rather than k
        { id: "D", text: "$66$" }
      ],
      correctAnswer: "A",
      hint: "One of the three angles is already known, though the stem gives no number for it.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** The two acute angles of a right triangle total $90$ degrees, so $6k = 90$ and $k = 15$.\n\n**The Full Solution:**\nStep 1: Because one angle is a right angle, the other two must total $180 - 90 = 90$ degrees.\nStep 2: So $(4k + 6) + (2k - 6) = 90$, which simplifies to $6k = 90$.\nStep 3: Therefore $k = 15$. Check: the angles are $4(15) + 6 = 66$ and $2(15) - 6 = 24$, and $66 + 24 + 90 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($24$): reporting the angle $(2k - 6)$ instead of the constant $k$.\n* Choice C ($30$): setting the two acute angles equal to $180$ degrees, which double-counts the right angle.\n* Choice D ($66$): reporting the angle $(4k + 6)$ instead of the constant $k$.\n\n**Test Day Takeaway:** A right angle uses $90$ of the $180$ degrees, so the remaining two angles share exactly $90$.",
      skills: ["triangle-angle-sum", "triangle-types"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The triangular brace of a star-tracker tripod has two struts of lengths $11$ centimeters and $26$ centimeters. If the third strut must also be a whole number of centimeters long, how many different lengths could it have?",
      choices: [
        // distractor: reports the difference 26 - 11 instead of counting lengths
        { id: "A", text: "$15$" },
        // distractor: computes 36 - 16 and omits one endpoint
        { id: "B", text: "$20$" },
        { id: "C", text: "$21$" },
        // distractor: reports the sum 26 + 11 instead of counting lengths
        { id: "D", text: "$37$" }
      ],
      correctAnswer: "C",
      hint: "A count of whole numbers between two bounds is not the difference of those bounds.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** The third strut must satisfy $15 < s < 37$, so $s$ runs from $16$ to $36$: that is $21$ lengths.\n\n**The Full Solution:**\nStep 1: For three lengths to close into a triangle, the third strut must be longer than the difference of the other two and shorter than their sum: $26 - 11 < s < 26 + 11$, or $15 < s < 37$.\nStep 2: The whole numbers strictly between $15$ and $37$ run from $16$ through $36$.\nStep 3: That is $36 - 16 + 1 = 21$ lengths. Check: $16 + 11 = 27 > 26$ and $36 < 37$, so both endpoints work ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): reporting the difference $26 - 11$, which is a boundary length, not a count.\n* Choice B ($20$): computing $36 - 16$ and forgetting that both endpoints count.\n* Choice D ($37$): reporting the sum $26 + 11$, again a boundary rather than a count.\n\n**Test Day Takeaway:** Set the strict bounds first, then count inclusively: last minus first, plus one.",
      skills: ["triangle-inequality"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In triangle $ABC$, $AB = AC$ and the measure of angle $A$ is $x°$. If triangle $ABC$ is an obtuse triangle, which of the following gives all possible values of $x$?",
      choices: [
        // distractor: describes the vertex angles for which angle $A$ is the smallest angle, not the obtuse cases
        { id: "A", text: "$0 < x < 60$" },
        // distractor: the range that keeps angle $A$ acute, which leaves the triangle acute rather than obtuse
        { id: "B", text: "$0 < x < 90$" },
        // distractor: makes angle $A$ the largest angle but still less than $90°$, so no angle is obtuse
        { id: "C", text: "$60 < x < 90$" },
        { id: "D", text: "$90 < x < 180$" }
      ],
      correctAnswer: "D",
      hint: "Only one angle in a triangle can be larger than $90°$ — decide which one it has to be here.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~45s):** The two base angles are equal, so only the vertex angle can exceed $90°$: $90 < x < 180$.\n\n**The Full Solution:**\nStep 1: Since $AB = AC$, angles $B$ and $C$ are equal; call each $y°$, so $x + 2y = 180$.\nStep 2: If a base angle were obtuse then $y > 90$, so $2y > 180$, which is impossible. The obtuse angle must therefore be angle $A$.\nStep 3: Angle $A$ is obtuse exactly when $x > 90$, and $x < 180$ is needed to leave positive base angles, so $90 < x < 180$.\n\nVerification: $x = 100$ leaves base angles of $40°$ each and an obtuse triangle, while $x = 80$ leaves base angles of $50°$ and an acute triangle. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0 < x < 60$): describes the vertex angles for which angle $A$ is the smallest angle, not the obtuse cases.\n* Choice B ($0 < x < 90$): the range that keeps angle $A$ acute, which leaves the triangle acute rather than obtuse.\n* Choice C ($60 < x < 90$): makes angle $A$ the largest angle but still less than $90°$, so no angle is obtuse.\n\n**Test Day Takeaway:** A triangle has at most one non-acute angle. In an isosceles triangle that angle can only be the one between the two equal sides.",
      skills: ["triangle-types"]
    }
  ],

  // Section: Angles of a Triangle
  "Angles of a Triangle": [
    {
      id: 1,
      difficulty: "easy",
      question: "The roof truss shown spans a packing shed. Rafter $AB$ meets the tie beam at $52$ degrees, and rafter $CB$ meets the same beam at $71$ degrees. What is the measure, in degrees, of the angle at the peak $B$?",
      diagram: { type: "triangleWithAngles", params: { angleLabels: ["52°", "71°", "x°"], vertexLabels: ["A", "C", "B"], figureNote: true } },
      choices: [
        { id: "A", text: "$57$" },
        // distractor: subtracts only the 71-degree angle from 180
        { id: "B", text: "$109$" },
        // distractor: adds the two given angles instead of subtracting their sum from 180
        { id: "C", text: "$123$" },
        // distractor: subtracts only the 52-degree angle from 180
        { id: "D", text: "$128$" }
      ],
      correctAnswer: "A",
      hint: "The two rafter angles and the peak angle all belong to the same triangle.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~10s):** The three interior angles total $180$ degrees, so the peak measures $180 - 52 - 71 = 57$ degrees.\n\n**The Full Solution:**\nStep 1: The truss is a triangle, so its three interior angles sum to $180$ degrees.\nStep 2: Two of them measure $52$ and $71$ degrees, a total of $123$ degrees.\nStep 3: The peak angle is $180 - 123 = 57$ degrees. Check: $52 + 71 + 57 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($109$): subtracting only the $71$-degree angle from $180$ and forgetting the other rafter.\n* Choice C ($123$): reporting the sum of the two given angles instead of what is left of $180$.\n* Choice D ($128$): subtracting only the $52$-degree angle from $180$.\n\n**Test Day Takeaway:** Add the known angles first, then take that total away from $180$ once.",
      skills: ["triangle-angle-sum"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "An exterior angle at vertex $C$ of triangle $ABC$ has a measure of $142°$. What is the sum, in degrees, of the measures of angles $A$ and $B$?",
      choices: [
        // distractor: gives the interior angle at $C$, the supplement, rather than the sum of the other two angles
        { id: "A", text: "$38$" },
        // distractor: halves the exterior angle, assuming angles $A$ and $B$ are equal
        { id: "B", text: "$71$" },
        { id: "C", text: "$142$" },
        // distractor: subtracts the exterior angle from $360$ instead of using the exterior angle relationship
        { id: "D", text: "$218$" }
      ],
      correctAnswer: "C",
      hint: "Find the interior angle at $C$ first, then use the $180°$ total.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** An exterior angle equals the sum of the two remote interior angles, so $m\\angle A + m\\angle B = 142$.\n\n**The Full Solution:**\nStep 1: The interior angle at $C$ is the supplement of the exterior angle: $180 - 142 = 38$.\nStep 2: The three interior angles total $180$: $m\\angle A + m\\angle B + 38 = 180$.\nStep 3: So $m\\angle A + m\\angle B = 142$, the measure of the exterior angle itself.\n\nVerification: $142 + 38 = 180$, so the exterior and interior angles at $C$ are supplementary. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($38$): gives the interior angle at $C$, the supplement, rather than the sum of the other two angles.\n* Choice B ($71$): halves the exterior angle, assuming angles $A$ and $B$ are equal.\n* Choice D ($218$): subtracts the exterior angle from $360$ instead of using the exterior angle relationship.\n\n**Test Day Takeaway:** An exterior angle of a triangle equals the sum of the two interior angles it does not touch.",
      skills: ["triangle-angle-sum"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A container-yard gantry rests on the triangular support shown, whose three interior angle measures, in degrees, are $(x + 12)$, $(2x)$, and $(x - 8)$. Which of the following is the largest of the three measures?",
      diagram: { type: "triangleWithAngles", params: { angleLabels: ["(x + 12)°", "(2x)°", "(x - 8)°"], figureNote: true } },
      choices: [
        // distractor: reports the smallest angle, (x - 8)
        { id: "A", text: "$36$" },
        // distractor: reports the value of x rather than an angle measure
        { id: "B", text: "$44$" },
        // distractor: reports the angle (x + 12) instead of the largest
        { id: "C", text: "$56$" },
        { id: "D", text: "$88$" }
      ],
      correctAnswer: "D",
      hint: "Which expression is largest is not settled until $x$ has a value.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** $(x + 12) + 2x + (x - 8) = 180$ gives $x = 44$, so the angles are $56$, $88$, and $36$ degrees.\n\n**The Full Solution:**\nStep 1: Set the sum of the three measures equal to $180$: $(x + 12) + 2x + (x - 8) = 180$, which simplifies to $4x + 4 = 180$.\nStep 2: Solving gives $4x = 176$, so $x = 44$.\nStep 3: The three angles are $44 + 12 = 56$, $2(44) = 88$, and $44 - 8 = 36$ degrees, so the largest is $88$. Check: $56 + 88 + 36 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($36$): reporting the smallest angle, $(x - 8)$, instead of the largest.\n* Choice B ($44$): reporting the value of $x$; $x$ is not itself an angle measure here.\n* Choice C ($56$): reporting $(x + 12)$, which is larger than $(x - 8)$ but smaller than $2x$.\n\n**Test Day Takeaway:** Solve for the variable, then evaluate every expression before deciding which one the question wants.",
      skills: ["triangle-angle-sum"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The spreader brace of a picking ladder forms the isosceles triangle shown, in which the two base angles each measure $z$ degrees. What is the value of $z$?",
      diagram: { type: "triangleWithAngles", params: { angleLabels: ["z°", "z°", "48°"], figureNote: true } },
      choices: [
        // distractor: computes 90 - 48, treating the base angles as complementary to the apex
        { id: "A", text: "$42$" },
        { id: "B", text: "$66$" },
        // distractor: doubles the apex angle
        { id: "C", text: "$96$" },
        // distractor: stops at 180 - 48 without halving
        { id: "D", text: "$132$" }
      ],
      correctAnswer: "B",
      hint: "The apex angle is the only one of the three that is not $z$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The two base angles share what is left of $180$ after the $48$-degree apex: $\\frac{132}{2} = 66$.\n\n**The Full Solution:**\nStep 1: The three interior angles sum to $180$ degrees, so $z + z + 48 = 180$.\nStep 2: Combine and subtract: $2z = 132$.\nStep 3: Divide by $2$: $z = 66$. Check: $66 + 66 + 48 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($42$): computing $90 - 48$, which would apply only if the base angles were complementary to the apex.\n* Choice C ($96$): doubling the apex angle instead of sharing the remaining $132$ degrees.\n* Choice D ($132$): stopping at $180 - 48$ without splitting that total between the two equal angles.\n\n**Test Day Takeaway:** In an isosceles triangle, subtract the odd angle from $180$ and split what remains in half.",
      skills: ["triangle-angle-sum"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A telescope pier is braced by the triangle shown, whose interior angle measures are given in degrees. No interior angle of the brace is supposed to reach $100$ degrees. By how many degrees does the largest angle overshoot that limit?",
      diagram: { type: "triangleWithAngles", params: { angleLabels: ["(x + 9)°", "(4x)°", "(x + 3)°"], figureNote: true } },
      choices: [
        { id: "A", text: "$12$" },
        // distractor: reports the value of x rather than the overshoot
        { id: "B", text: "$28$" },
        // distractor: reports the angle (x + 9) instead of the largest angle
        { id: "C", text: "$37$" },
        // distractor: reports the largest angle without subtracting the 100-degree limit
        { id: "D", text: "$112$" }
      ],
      correctAnswer: "A",
      hint: "The question asks for a difference, not for an angle.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~45s):** $6x + 12 = 180$ gives $x = 28$, so the largest angle is $4(28) = 112$ degrees, which is $12$ past the limit.\n\n**The Full Solution:**\nStep 1: Add the three measures: $(x + 9) + 4x + (x + 3) = 180$, which simplifies to $6x + 12 = 180$.\nStep 2: Solving gives $6x = 168$, so $x = 28$, and the angles are $37$, $112$, and $31$ degrees.\nStep 3: The largest is $112$ degrees, which exceeds $100$ by $112 - 100 = 12$ degrees. Check: $37 + 112 + 31 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($28$): reporting the value of $x$; the question asks how far the largest angle passes the limit.\n* Choice C ($37$): reporting $(x + 9)$, which is not the largest of the three measures.\n* Choice D ($112$): reporting the largest angle itself without subtracting the $100$-degree limit.\n\n**Test Day Takeaway:** Evaluate every expression before choosing one, then answer the exact question — here, a difference, not an angle.",
      skills: ["triangle-angle-sum"]
    }
  ],

  // Section: Area of a Triangle
  "Area of a Triangle": [
    {
      id: 1,
      difficulty: "easy",
      question: "A snowplow blade carries the triangular reflective panel shown, with its three side lengths marked in centimeters. Reflective film covers both faces of the panel. How many square centimeters of film does the panel take?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 8]], sideLabels: ["15", "8", "17"], rightAngleVertex: 1 } },
      choices: [
        // distractor: covers one face only
        { id: "A", text: "$60$" },
        { id: "B", text: "$120$" },
        // distractor: uses the 17-centimeter hypotenuse as a height, giving 2 times 68
        { id: "C", text: "$136$" },
        // distractor: skips the one-half in the area formula, giving 2 times 120
        { id: "D", text: "$240$" }
      ],
      correctAnswer: "B",
      hint: "Count how many surfaces the film has to cover.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** One face is $\\frac{1}{2}(15)(8) = 60$ square centimeters, and both faces take $120$.\n\n**The Full Solution:**\nStep 1: The panel is a right triangle, so its two legs, $15$ and $8$ centimeters, are its base and height.\nStep 2: One face has area $\\frac{1}{2}(15)(8) = 60$ square centimeters.\nStep 3: Film covers both faces, so the total is $2(60) = 120$ square centimeters. Check: $15$, $8$, $17$ satisfies $15^2 + 8^2 = 225 + 64 = 289 = 17^2$, confirming the right angle ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($60$): covering one face only, when the film covers both.\n* Choice C ($136$): using the $17$-centimeter hypotenuse as a height, giving $2 \\cdot \\frac{1}{2}(8)(17)$.\n* Choice D ($240$): skipping the $\\frac{1}{2}$ in the area formula, giving $2(15)(8)$.\n\n**Test Day Takeaway:** In a right triangle the two legs are the base and height; the hypotenuse never is.",
      skills: ["triangle-area"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "In triangle $MNP$, the altitude drawn to side $\\overline{MN}$ has length $16$ centimeters. If the area of triangle $MNP$ is $176$ square centimeters, what is the length, in centimeters, of $\\overline{MN}$?",
      choices: [
        // distractor: divides the area by the altitude without doubling it first, effectively solving $bh = 176$
        { id: "A", text: "$11$" },
        { id: "B", text: "$22$" },
        // distractor: halves the area and stops, never bringing the altitude into the calculation
        { id: "C", text: "$88$" },
        // distractor: reports $2A = 352$, stopping just before the division by the altitude
        { id: "D", text: "$352$" }
      ],
      correctAnswer: "B",
      hint: "Put what you know into the area formula and solve for the one missing factor.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $MN = \\frac{2A}{h} = \\frac{352}{16} = 22$.\n\n**The Full Solution:**\nStep 1: The altitude to $\\overline{MN}$ is the height that pairs with base $MN$, so $A = \\frac{1}{2}(MN)(16)$.\nStep 2: Substitute the area: $176 = 8(MN)$.\nStep 3: Divide by $8$: $MN = 22$ centimeters.\n\nVerification: $\\frac{1}{2}(22)(16) = 176$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($11$): divides the area by the altitude without doubling it first, effectively solving $bh = 176$.\n* Choice C ($88$): halves the area and stops, never bringing the altitude into the calculation.\n* Choice D ($352$): reports $2A = 352$, stopping just before the division by the altitude.\n\n**Test Day Takeaway:** A base and the altitude drawn to it are the only pair the area formula accepts — clear the $\\frac{1}{2}$ into $2A = bh$ and the rest is one division.",
      skills: ["triangle-area"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The base of a triangle is multiplied by $3$ and its height is multiplied by $\\frac{1}{2}$. The area of the resulting triangle is $k$ times the area of the original triangle. What is the value of $k$?",
      choices: [
        // distractor: inverts both factors, using $\frac{1}{3}$ and $2$
        { id: "A", text: "$\\frac{2}{3}$" },
        { id: "B", text: "$\\frac{3}{2}$" },
        // distractor: applies only the change to the base and ignores the height
        { id: "C", text: "$3$" },
        // distractor: adds the two factors, $3 + \frac{1}{2}$, instead of multiplying them
        { id: "D", text: "$\\frac{7}{2}$" }
      ],
      correctAnswer: "B",
      hint: "Write the new base and new height into the area formula and compare with the original.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Area scales by the product of the two factors: $3 \\cdot \\frac{1}{2} = \\frac{3}{2}$.\n\n**The Full Solution:**\nStep 1: The original area is $A = \\frac{1}{2}bh$.\nStep 2: The new base is $3b$ and the new height is $\\frac{1}{2}h$, so $A^{\\prime} = \\frac{1}{2}(3b)\\left(\\frac{1}{2}h\\right) = \\frac{3}{2}\\left(\\frac{1}{2}bh\\right)$.\nStep 3: Therefore $A^{\\prime} = \\frac{3}{2}A$, so $k = \\frac{3}{2}$.\n\nVerification: A triangle with $b = 4$ and $h = 6$ has area $12$; the new one has $b = 12$ and $h = 3$, area $18$, and $\\frac{18}{12} = \\frac{3}{2}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{2}{3}$): inverts both factors, using $\\frac{1}{3}$ and $2$.\n* Choice C ($3$): applies only the change to the base and ignores the height.\n* Choice D ($\\frac{7}{2}$): adds the two factors, $3 + \\frac{1}{2}$, instead of multiplying them.\n\n**Test Day Takeaway:** Scaling a base and a height multiplies the area by the product of the two scale factors, never by their sum.",
      skills: ["triangle-area"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A right triangle has a hypotenuse of length $17$ centimeters and one leg of length $8$ centimeters. What is the area, in square centimeters, of the triangle?",
      diagram: { type: "rightTriangle", params: { sideLabels: ["8", "", "17"], rightAngleVertex: 1, figureNote: true } },
      choices: [
        { id: "A", text: "$60$" },
        // distractor: uses the hypotenuse as the second leg, computing $\frac{1}{2}(8)(17)$
        { id: "B", text: "$68$" },
        // distractor: finds the missing leg correctly but omits the factor $\frac{1}{2}$
        { id: "C", text: "$120$" },
        // distractor: multiplies the leg by the hypotenuse and also omits the $\frac{1}{2}$
        { id: "D", text: "$136$" }
      ],
      correctAnswer: "A",
      hint: "The two perpendicular sides are the base and the height, and only one of them is given.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** The missing leg is $\\sqrt{17^2 - 8^2} = 15$, so the area is $\\frac{1}{2}(8)(15) = 60$.\n\n**The Full Solution:**\nStep 1: The legs of a right triangle are perpendicular, so they serve as base and height; find the second leg first.\nStep 2: By the Pythagorean theorem, $8^2 + b^2 = 17^2$, so $b^2 = 289 - 64 = 225$ and $b = 15$.\nStep 3: Area $= \\frac{1}{2}(8)(15) = 60$ square centimeters.\n\nVerification: $8^2 + 15^2 = 64 + 225 = 289 = 17^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($68$): uses the hypotenuse as the second leg, computing $\\frac{1}{2}(8)(17)$.\n* Choice C ($120$): finds the missing leg correctly but omits the factor $\\frac{1}{2}$.\n* Choice D ($136$): multiplies the leg by the hypotenuse and also omits the $\\frac{1}{2}$.\n\n**Test Day Takeaway:** The legs of a right triangle are its base and height — the hypotenuse is never a height.",
      skills: ["triangle-area"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A triangular hail-netting panel over a cherry block is shown, with two of its side lengths given in meters. What is the area, in square meters, of the panel?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [10.392, 0], [10.392, 6]], sideLabels: ["", "6", "12"], rightAngleVertex: 1 } },
      choices: [
        // distractor: uses the 6-meter side as both legs
        { id: "A", text: "$18$" },
        { id: "B", text: "$18\\sqrt{3}$" },
        // distractor: uses the 12-meter hypotenuse as the height
        { id: "C", text: "$36$" },
        // distractor: finds the missing leg correctly but skips the one-half
        { id: "D", text: "$36\\sqrt{3}$" }
      ],
      correctAnswer: "B",
      hint: "An area needs two legs, and the figure marks only one of them.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** A leg half the hypotenuse marks a $30$-$60$-$90$ triangle, so the other leg is $6\\sqrt{3}$ and the area is $18\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: The given leg, $6$ meters, is exactly half the $12$-meter hypotenuse, so the triangle is a $30$-$60$-$90$ triangle.\nStep 2: In such a triangle the longer leg is $\\sqrt{3}$ times the shorter leg, so it measures $6\\sqrt{3}$ meters.\nStep 3: The area is $\\frac{1}{2}(6)(6\\sqrt{3}) = 18\\sqrt{3}$ square meters. Check: $6^2 + (6\\sqrt{3})^2 = 36 + 108 = 144 = 12^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): using the $6$-meter side as both legs, computing $\\frac{1}{2}(6)(6)$.\n* Choice C ($36$): using the $12$-meter hypotenuse as the height, computing $\\frac{1}{2}(6)(12)$.\n* Choice D ($36\\sqrt{3}$): finding the missing leg correctly but leaving out the $\\frac{1}{2}$.\n\n**Test Day Takeaway:** A leg that is half the hypotenuse identifies a $30$-$60$-$90$ triangle and hands you the third side.",
      skills: ["triangle-area", "special-right-triangles"]
    }
  ],

  // Section: Similar Triangles
  "Similar Triangles": [
    {
      id: 1,
      difficulty: "easy",
      question: "Triangle $PQR$ is similar to triangle $STU$, where $P$, $Q$, and $R$ correspond to $S$, $T$, and $U$, respectively. If $PQ = 10$, $QR = 14$, and $ST = 25$, what is the length of $\\overline{TU}$?",
      diagram: { type: "similarTriangles", params: { triangle1: { labels: ["P", "Q", "R"], sideLabels: ["10", "14", ""] }, triangle2: { labels: ["S", "T", "U"], sideLabels: ["25", "", ""] }, figureNote: true } },
      choices: [
        // distractor: divides by the scale factor instead of multiplying by it
        { id: "A", text: "$5.6$" },
        // distractor: adds the difference $25 - 10$ to $14$ rather than scaling
        { id: "B", text: "$29$" },
        { id: "C", text: "$35$" },
        // distractor: multiplies $14$ by $25$ without dividing by $10$
        { id: "D", text: "$350$" }
      ],
      correctAnswer: "C",
      hint: "Compare the two corresponding sides you know to get a single ratio.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** The scale factor is $\\frac{25}{10} = 2.5$, so $TU = 2.5(14) = 35$.\n\n**The Full Solution:**\nStep 1: Corresponding sides of similar triangles are proportional: $\\frac{ST}{PQ} = \\frac{TU}{QR}$.\nStep 2: Substitute the given lengths: $\\frac{25}{10} = \\frac{TU}{14}$.\nStep 3: Cross multiply: $10 \\cdot TU = 350$, so $TU = 35$.\n\nVerification: $\\frac{25}{10} = 2.5$ and $\\frac{35}{14} = 2.5$, the same factor. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5.6$): divides by the scale factor instead of multiplying by it.\n* Choice B ($29$): adds the difference $25 - 10$ to $14$ rather than scaling.\n* Choice D ($350$): multiplies $14$ by $25$ without dividing by $10$.\n\n**Test Day Takeaway:** Build the proportion with both numerators from the same triangle; one factor governs every pair of corresponding sides.",
      skills: ["similar-triangles"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A drying barn has a triangular gable vent with a $20$-centimeter base and two $15$-centimeter sides meeting at the apex. A louver parallel to the base crosses each slanted side at a point $6$ centimeters from the apex. How wide, in centimeters, is the louver?",
      choices: [
        { id: "A", text: "$8$" },
        // distractor: subtracts 9 from the base width instead of scaling
        { id: "B", text: "$11$" },
        // distractor: uses the lower 9 centimeters of each side, giving 20 times 9/15
        { id: "C", text: "$12$" },
        // distractor: inverts the ratio, giving 20 times 15/6
        { id: "D", text: "$50$" }
      ],
      correctAnswer: "A",
      hint: "A parallel cut scales lengths; it does not shorten them by a fixed number of centimeters.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** The triangle above the louver is similar to the whole vent at a ratio of $\\frac{6}{15}$, so the louver is $\\frac{2}{5}(20) = 8$ centimeters.\n\n**The Full Solution:**\nStep 1: Because the louver is parallel to the base, the triangle above it is similar to the whole gable triangle.\nStep 2: The $6$ centimeters above the louver and the full $15$-centimeter side are corresponding sides, so the scale factor is $\\frac{6}{15} = \\frac{2}{5}$.\nStep 3: The louver is therefore $\\frac{2}{5}(20) = 8$ centimeters wide. Check: $\\frac{8}{20} = \\frac{2}{5} = \\frac{6}{15}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($11$): subtracting $9$ from the base width, which treats the change as a fixed amount rather than a ratio.\n* Choice C ($12$): using the lower $9$ centimeters of each slanted side, computing $20 \\cdot \\frac{9}{15}$; the similar triangle is the one containing the apex.\n* Choice D ($50$): inverting the ratio, computing $20 \\cdot \\frac{15}{6}$, which makes the louver wider than the base.\n\n**Test Day Takeaway:** A line parallel to one side cuts off a similar triangle; scale by the ratio of corresponding sides, never by a difference.",
      skills: ["similar-triangles"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A spectrograph's two triangular light baffles are similar, with edge $AB$ of the smaller baffle corresponding to edge $DE$ of the larger one. If $AB = 14$ centimeters, $DE = 21$ centimeters, and $EF = 18$ centimeters, what is the length, in centimeters, of $BC$?",
      choices: [
        // distractor: subtracts the 7-centimeter difference between the corresponding edges
        { id: "A", text: "$11$" },
        { id: "B", text: "$12$" },
        // distractor: copies the given edge DE
        { id: "C", text: "$21$" },
        // distractor: multiplies by 3/2 instead of dividing, scaling the wrong direction
        { id: "D", text: "$27$" }
      ],
      correctAnswer: "B",
      hint: "$BC$ belongs to the smaller baffle, so it has to come out smaller than $EF$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The smaller baffle is $\\frac{14}{21} = \\frac{2}{3}$ of the larger, so $BC = \\frac{2}{3}(18) = 12$ centimeters.\n\n**The Full Solution:**\nStep 1: Corresponding edges give the scale factor from larger to smaller: $\\frac{AB}{DE} = \\frac{14}{21} = \\frac{2}{3}$.\nStep 2: Since $BC$ corresponds to $EF$, $\\frac{BC}{EF} = \\frac{2}{3}$.\nStep 3: So $BC = \\frac{2}{3}(18) = 12$ centimeters. Check: $\\frac{12}{18} = \\frac{2}{3} = \\frac{14}{21}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($11$): subtracting the $7$-centimeter difference between the corresponding edges; similar figures scale by a ratio, not a difference.\n* Choice C ($21$): copying the given edge $DE$ instead of computing the matching edge of the smaller baffle.\n* Choice D ($27$): multiplying by $\\frac{3}{2}$ instead of $\\frac{2}{3}$, which enlarges rather than reduces.\n\n**Test Day Takeaway:** Write the scale factor in the direction the question needs before you multiply.",
      skills: ["similar-triangles"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "Triangle $ABC$ is similar to triangle $DEF$, and each side length of triangle $DEF$ is $\\frac{2}{3}$ times the corresponding side length of triangle $ABC$. If the area of triangle $ABC$ is $90$ square units, what is the area, in square units, of triangle $DEF$?",
      choices: [
        { id: "A", text: "$40$" },
        // distractor: multiplies by $\frac{2}{3}$ once instead of squaring the scale factor
        { id: "B", text: "$60$" },
        // distractor: inverts the ratio and uses $\frac{3}{2}$ once
        { id: "C", text: "$135$" },
        // distractor: inverts the ratio and squares it, using $\frac{9}{4}$
        { id: "D", text: "$202.5$" }
      ],
      correctAnswer: "A",
      hint: "The factor that applies to area is not the same as the one that applies to length.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** Area scales by $\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$, so the area is $90 \\cdot \\frac{4}{9} = 40$.\n\n**The Full Solution:**\nStep 1: Corresponding lengths scale by $\\frac{2}{3}$, so areas scale by $\\left(\\frac{2}{3}\\right)^2$.\nStep 2: $\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$.\nStep 3: The area of triangle $DEF$ is $90 \\cdot \\frac{4}{9} = 40$ square units.\n\nVerification: $\\frac{40}{90} = \\frac{4}{9} = \\left(\\frac{2}{3}\\right)^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($60$): multiplies by $\\frac{2}{3}$ once instead of squaring the scale factor.\n* Choice C ($135$): inverts the ratio and uses $\\frac{3}{2}$ once.\n* Choice D ($202.5$): inverts the ratio and squares it, using $\\frac{9}{4}$.\n\n**Test Day Takeaway:** Shrink every length by a factor and the area shrinks by that factor squared.",
      skills: ["similar-triangles"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In triangle $ABC$, point $D$ lies on $\\overline{AB}$ and point $E$ lies on $\\overline{AC}$ so that $\\overline{DE}$ is parallel to $\\overline{BC}$. If $AD = 6$, $DB = 4$, and $BC = 20$, what is the length of $\\overline{DE}$?",
      choices: [
        // distractor: uses $\frac{DB}{AB} = \frac{4}{10}$ instead of $\frac{AD}{AB}$
        { id: "A", text: "$8$" },
        { id: "B", text: "$12$" },
        // distractor: subtracts $AD$ from $BC$ rather than scaling
        { id: "C", text: "$14$" },
        // distractor: uses $\frac{AD}{DB} = \frac{6}{4}$, comparing the two pieces of $\overline{AB}$ instead of a piece to the whole
        { id: "D", text: "$30$" }
      ],
      correctAnswer: "B",
      hint: "The whole side $\\overline{AB}$, not the piece $\\overline{DB}$, is what $\\overline{AD}$ should be compared with.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~50s):** $AB = 6 + 4 = 10$, so $DE = 20 \\cdot \\frac{6}{10} = 12$.\n\n**The Full Solution:**\nStep 1: Because $\\overline{DE}$ is parallel to $\\overline{BC}$, triangles $ADE$ and $ABC$ have congruent corresponding angles and are similar.\nStep 2: The scale factor compares a side of $ADE$ to the whole corresponding side: $\\frac{AD}{AB} = \\frac{6}{6 + 4} = \\frac{3}{5}$.\nStep 3: So $DE = \\frac{3}{5}(20) = 12$.\n\nVerification: $\\frac{12}{20} = \\frac{3}{5} = \\frac{6}{10}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): uses $\\frac{DB}{AB} = \\frac{4}{10}$ instead of $\\frac{AD}{AB}$.\n* Choice C ($14$): subtracts $AD$ from $BC$ rather than scaling.\n* Choice D ($30$): uses $\\frac{AD}{DB} = \\frac{6}{4}$, comparing the two pieces of $\\overline{AB}$ instead of a piece to the whole.\n\n**Test Day Takeaway:** When a parallel segment cuts a triangle, compare a piece to the whole side, never a piece to the other piece.",
      skills: ["similar-triangles"]
    }
  ],

  // Section: Right Triangles & Pythagorean Theorem
  "Right Triangles & Pythagorean Theorem": [
    {
      id: 1,
      difficulty: "easy",
      question: "The diagonal brace of a barge loading ramp forms the right triangle shown, with two side lengths given in feet. What is the length, in feet, of the brace?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [21, 0], [21, 20]], sideLabels: ["21", "20", ""], rightAngleVertex: 1 } },
      choices: [
        // distractor: subtracts the squares, 441 - 400 = 41
        { id: "A", text: "$\\sqrt{41}$" },
        { id: "B", text: "$29$" },
        // distractor: adds the two legs instead of their squares
        { id: "C", text: "$41$" },
        // distractor: stops at 29 squared without taking the square root
        { id: "D", text: "$841$" }
      ],
      correctAnswer: "B",
      hint: "The brace is the side opposite the right angle.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** $21^2 + 20^2 = 441 + 400 = 841$, and $\\sqrt{841} = 29$ feet.\n\n**The Full Solution:**\nStep 1: The brace is the hypotenuse, so $21^2 + 20^2 = c^2$.\nStep 2: That gives $441 + 400 = 841$.\nStep 3: Taking the square root, $c = 29$ feet. Check: $29^2 = 841 = 441 + 400$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\sqrt{41}$): subtracting the squares, $441 - 400$, which finds a leg rather than the hypotenuse.\n* Choice C ($41$): adding the two legs directly; the theorem adds their squares.\n* Choice D ($841$): stopping at $c^2$ and never taking the square root.\n\n**Test Day Takeaway:** Add the squares of the legs to get the square of the hypotenuse, then take the root.",
      skills: ["pythagorean-theorem"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A hop trellis pole rises from level ground, and an anchor cable ties its top to a point on the ground, as the figure shows with lengths in feet. How tall, in feet, is the pole?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [7, 0], [7, 24]], sideLabels: ["7", "", "25"], rightAngleVertex: 1 } },
      choices: [
        // distractor: subtracts the lengths, 25 - 7, instead of their squares
        { id: "A", text: "$18$" },
        { id: "B", text: "$24$" },
        // distractor: adds the squares instead of subtracting them
        { id: "C", text: "$26$" },
        // distractor: adds the two given lengths
        { id: "D", text: "$32$" }
      ],
      correctAnswer: "B",
      hint: "The longest side of this triangle is already known.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** $25^2 - 7^2 = 625 - 49 = 576$, and $\\sqrt{576} = 24$ feet.\n\n**The Full Solution:**\nStep 1: The $25$-foot cable is the hypotenuse and the $7$-foot ground distance is one leg, so the pole's height $h$ satisfies $7^2 + h^2 = 25^2$.\nStep 2: That gives $h^2 = 625 - 49 = 576$.\nStep 3: Taking the square root, $h = 24$ feet. Check: $7^2 + 24^2 = 49 + 576 = 625 = 25^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($18$): subtracting the lengths, $25 - 7$, instead of subtracting their squares.\n* Choice C ($26$): adding the squares, $\\sqrt{625 + 49} \\approx 26$, which would make the pole longer than the cable.\n* Choice D ($32$): adding the two given lengths.\n\n**Test Day Takeaway:** When the hypotenuse is known, subtract the squares; when it is not, add them.",
      skills: ["pythagorean-theorem"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The triangular platform brace of a launch tower is shown, with two of its side lengths in meters. Steel bar for the brace costs \\$14 per meter. What is the total cost, in dollars, of the bar needed for all three sides?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 10]], sideLabels: ["", "10", "26"], rightAngleVertex: 1 } },
      choices: [
        // distractor: uses 10 + 24 = 34 meters and leaves out the hypotenuse
        { id: "A", text: "$476$" },
        // distractor: uses only the two given sides, 10 + 26 = 36 meters
        { id: "B", text: "$504$" },
        { id: "C", text: "$840$" },
        // distractor: doubles the perimeter before multiplying
        { id: "D", text: "$1{,}680$" }
      ],
      correctAnswer: "C",
      hint: "The figure prints only two of the three lengths the price applies to.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** The missing leg is $24$ meters, so the perimeter is $60$ meters and the bar costs $60(14) = 840$ dollars.\n\n**The Full Solution:**\nStep 1: The $26$-meter side is the hypotenuse, so the missing leg satisfies $10^2 + b^2 = 26^2$, giving $b^2 = 676 - 100 = 576$ and $b = 24$ meters.\nStep 2: The perimeter is $10 + 24 + 26 = 60$ meters.\nStep 3: At $14$ dollars per meter the cost is $60(14) = 840$ dollars. Check: $10^2 + 24^2 = 100 + 576 = 676 = 26^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($476$): using $10 + 24 = 34$ meters and leaving the hypotenuse out of the perimeter.\n* Choice B ($504$): using only the two side lengths printed in the figure, $10 + 26 = 36$ meters.\n* Choice D ($1{,}680$): doubling the perimeter to $120$ meters before multiplying by the price.\n\n**Test Day Takeaway:** Recover the missing side first, then add all three lengths before applying any rate.",
      skills: ["pythagorean-theorem"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "In right triangle $XYZ$, angle $Y$ is a right angle, the hypotenuse $\\overline{XZ}$ has length $26$, and leg $\\overline{XY}$ has length $24$. What is the length of $\\overline{YZ}$?",
      diagram: { type: "rightTriangle", params: { labels: ["X", "Y", "Z"], sideLabels: ["24", "", "26"], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: subtracts the two given lengths instead of their squares
        { id: "A", text: "$2$" },
        { id: "B", text: "$10$" },
        // distractor: averages the hypotenuse and the given leg
        { id: "C", text: "$25$" },
        // distractor: adds the two given lengths
        { id: "D", text: "$50$" }
      ],
      correctAnswer: "B",
      hint: "The hypotenuse is the one given, so the missing side comes out of a subtraction.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $YZ = \\sqrt{26^2 - 24^2} = \\sqrt{100} = 10$.\n\n**The Full Solution:**\nStep 1: Angle $Y$ is the right angle, so $\\overline{XZ}$ is the hypotenuse and $\\overline{XY}$ and $\\overline{YZ}$ are the legs.\nStep 2: $24^2 + YZ^2 = 26^2$, so $YZ^2 = 676 - 576 = 100$.\nStep 3: $YZ = \\sqrt{100} = 10$.\n\nVerification: $24^2 + 10^2 = 576 + 100 = 676 = 26^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): subtracts the two given lengths instead of their squares.\n* Choice C ($25$): averages the hypotenuse and the given leg.\n* Choice D ($50$): adds the two given lengths.\n\n**Test Day Takeaway:** Solving for a leg subtracts squares, not lengths: square first, subtract, then take the root.",
      skills: ["pythagorean-theorem"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In right triangle $ABC$, angle $C$ is a right angle. The legs have lengths $AC = x$ and $BC = x + 7$, and the hypotenuse has length $AB = 17$. What is the value of $x$?",
      choices: [
        // distractor: solves $x + (x + 7) = 17$, adding the legs to reach the hypotenuse
        { id: "A", text: "$5$" },
        { id: "B", text: "$8$" },
        // distractor: subtracts $7$ from the hypotenuse
        { id: "C", text: "$10$" },
        // distractor: gives $BC = x + 7$ instead of $x$ itself
        { id: "D", text: "$15$" }
      ],
      correctAnswer: "B",
      hint: "Write the theorem with the expressions in place, then expand before solving.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~60s):** $x^2 + (x + 7)^2 = 289$ reduces to $x^2 + 7x - 120 = 0$, so $x = 8$.\n\n**The Full Solution:**\nStep 1: The legs are $x$ and $x + 7$ and the hypotenuse is $17$, so $x^2 + (x + 7)^2 = 17^2$.\nStep 2: Expand: $x^2 + x^2 + 14x + 49 = 289$, so $2x^2 + 14x - 240 = 0$, or $x^2 + 7x - 120 = 0$.\nStep 3: Factor: $(x + 15)(x - 8) = 0$. A length must be positive, so $x = 8$.\n\nVerification: The legs are $8$ and $15$, and $8^2 + 15^2 = 64 + 225 = 289 = 17^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): solves $x + (x + 7) = 17$, adding the legs to reach the hypotenuse.\n* Choice C ($10$): subtracts $7$ from the hypotenuse.\n* Choice D ($15$): gives $BC = x + 7$ instead of $x$ itself.\n\n**Test Day Takeaway:** When the legs are expressions, square them into a quadratic and throw out the negative root.",
      skills: ["pythagorean-theorem"]
    }
  ],

  // Section: Trigonometric Ratios
  "Trigonometric Ratios": [
    {
      id: 1,
      difficulty: "easy",
      question: "In right triangle $KLM$, angle $L$ is a right angle, $KL = 24$, $LM = 7$, and $KM = 25$. What is the value of $\\sin K$?",
      diagram: { type: "rightTriangle", params: { labels: ["K", "L", "M"], sideLabels: ["24", "7", "25"], rightAngleVertex: 1, figureNote: true } },
      choices: [
        { id: "A", text: "$\\frac{7}{25}$" },
        // distractor: the value of $\tan K$, using the adjacent leg in the denominator instead of the hypotenuse
        { id: "B", text: "$\\frac{7}{24}$" },
        // distractor: the value of $\cos K$, using the adjacent leg in the numerator
        { id: "C", text: "$\\frac{24}{25}$" },
        // distractor: the reciprocal of $\tan K$, swapping the opposite and adjacent legs
        { id: "D", text: "$\\frac{24}{7}$" }
      ],
      correctAnswer: "A",
      hint: "Sine pairs the side across from the angle with the longest side of the triangle.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** $\\sin K$ is opposite over hypotenuse: $\\frac{LM}{KM} = \\frac{7}{25}$.\n\n**The Full Solution:**\nStep 1: Angle $L$ is the right angle, so $\\overline{KM}$ is the hypotenuse.\nStep 2: The leg opposite angle $K$ is $\\overline{LM}$, of length $7$.\nStep 3: Therefore $\\sin K = \\frac{7}{25}$.\n\nVerification: $\\left(\\frac{7}{25}\\right)^2 + \\left(\\frac{24}{25}\\right)^2 = \\frac{49 + 576}{625} = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{7}{24}$): the value of $\\tan K$, using the adjacent leg in the denominator instead of the hypotenuse.\n* Choice C ($\\frac{24}{25}$): the value of $\\cos K$, using the adjacent leg in the numerator.\n* Choice D ($\\frac{24}{7}$): the reciprocal of $\\tan K$, swapping the opposite and adjacent legs.\n\n**Test Day Takeaway:** Locate the hypotenuse first, then read opposite and adjacent from the angle actually named in the ratio.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A milking-parlor rail bracket forms right triangle $LMN$, with its right angle at $M$, $LM = 9$ centimeters, and $MN = 40$ centimeters. Which expression is equal to $\\tan L$?",
      choices: [
        // distractor: gives cosine of L, adjacent over hypotenuse
        { id: "A", text: "$\\frac{9}{41}$" },
        // distractor: inverts the tangent, adjacent over opposite
        { id: "B", text: "$\\frac{9}{40}$" },
        // distractor: gives sine of L, opposite over hypotenuse
        { id: "C", text: "$\\frac{40}{41}$" },
        { id: "D", text: "$\\frac{40}{9}$" }
      ],
      correctAnswer: "D",
      hint: "Only two of the three sides are given, and this question does not need the third.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** From angle $L$, the opposite leg is $MN = 40$ and the adjacent leg is $LM = 9$, so $\\tan L = \\frac{40}{9}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $M$, so the two legs are $LM$ and $MN$ and the hypotenuse is $LN$.\nStep 2: Viewed from angle $L$, the leg $MN = 40$ is opposite and the leg $LM = 9$ is adjacent.\nStep 3: Tangent is opposite over adjacent, so $\\tan L = \\frac{40}{9}$. Check: $LN = \\sqrt{9^2 + 40^2} = \\sqrt{1681} = 41$, and $\\frac{\\sin L}{\\cos L} = \\frac{40/41}{9/41} = \\frac{40}{9}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{9}{41}$): this is $\\cos L$, adjacent over hypotenuse.\n* Choice B ($\\frac{9}{40}$): this inverts the tangent, giving adjacent over opposite.\n* Choice C ($\\frac{40}{41}$): this is $\\sin L$, opposite over hypotenuse.\n\n**Test Day Takeaway:** Tangent never uses the hypotenuse; name the opposite and adjacent legs from the angle in question first.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "An almond huller's grading chute forms right triangle $PQR$, with its right angle at $Q$. If $\\sin R = \\frac{5}{13}$ and $PR = 39$ centimeters, what is the length, in centimeters, of $PQ$?",
      choices: [
        // distractor: reports the numerator of the ratio as a length
        { id: "A", text: "$5$" },
        // distractor: reports the denominator of the ratio as a length
        { id: "B", text: "$13$" },
        { id: "C", text: "$15$" },
        // distractor: finds QR, the other leg, instead of PQ
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "C",
      hint: "A ratio of $\\frac{5}{13}$ does not make any side $5$ or $13$ centimeters long.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $\\sin R = \\frac{PQ}{PR}$, so $\\frac{PQ}{39} = \\frac{5}{13}$ and $PQ = 15$ centimeters.\n\n**The Full Solution:**\nStep 1: With the right angle at $Q$, the hypotenuse is $PR$ and the leg opposite angle $R$ is $PQ$.\nStep 2: So $\\sin R = \\frac{PQ}{PR} = \\frac{PQ}{39} = \\frac{5}{13}$.\nStep 3: Multiplying gives $PQ = \\frac{5}{13}(39) = 15$ centimeters. Check: $QR = \\sqrt{39^2 - 15^2} = \\sqrt{1296} = 36$, and $\\frac{15}{39} = \\frac{5}{13}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): reporting the numerator of the ratio as though it were the length itself.\n* Choice B ($13$): reporting the denominator of the ratio as though it were the length itself.\n* Choice D ($36$): computing $QR$, the leg adjacent to angle $R$, instead of the requested $PQ$.\n\n**Test Day Takeaway:** A ratio scales: multiply the hypotenuse by the sine to get the opposite leg, and name the sides before substituting.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "In a dockside crane, the jib $ST$, the mast $TU$, and the tie $SU$ meet so that the right angle falls at $U$. The tie is $42$ meters long and $\\tan S = \\frac{20}{21}$. How long, in meters, is the jib?",
      choices: [
        // distractor: reports the mast TU instead of the jib
        { id: "A", text: "$40$" },
        { id: "B", text: "$58$" },
        // distractor: adds the two legs, 42 + 40
        { id: "C", text: "$82$" },
        // distractor: doubles the tie, as though the hypotenuse were twice the adjacent leg
        { id: "D", text: "$84$" }
      ],
      correctAnswer: "B",
      hint: "The jib is the one side that the tangent of $S$ never touches.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\tan S = \\frac{TU}{42} = \\frac{20}{21}$ gives $TU = 40$, and $\\sqrt{42^2 + 40^2} = 58$ meters.\n\n**The Full Solution:**\nStep 1: The right angle is at $U$, so from angle $S$ the mast $TU$ is opposite and the tie $SU$ is adjacent: $\\tan S = \\frac{TU}{42} = \\frac{20}{21}$.\nStep 2: Solving gives $TU = \\frac{20}{21}(42) = 40$ meters.\nStep 3: The jib $ST$ is the hypotenuse: $ST = \\sqrt{42^2 + 40^2} = \\sqrt{1764 + 1600} = \\sqrt{3364} = 58$ meters. Check: $\\frac{40}{42} = \\frac{20}{21}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($40$): reporting the mast $TU$, the leg the tangent produces, instead of the jib.\n* Choice C ($82$): adding the two legs, $42 + 40$, instead of using the Pythagorean theorem.\n* Choice D ($84$): doubling the tie, which assumes a $30$-$60$-$90$ relationship that does not hold here.\n\n**Test Day Takeaway:** Tangent hands you the second leg; the hypotenuse still needs the Pythagorean theorem.",
      skills: ["soh-cah-toa"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A taxiway wind-fence panel is a right triangle whose two acute angles measure $x^\\circ$ and $y^\\circ$. If $\\sin(x^\\circ) = \\frac{20}{29}$, what is the value of $\\cos(y^\\circ)$?",
      choices: [
        { id: "A", text: "$\\frac{20}{29}$" },
        // distractor: computes the cosine of x using the third side 21
        { id: "B", text: "$\\frac{21}{29}$" },
        // distractor: computes the tangent of x
        { id: "C", text: "$\\frac{20}{21}$" },
        // distractor: inverts the ratio
        { id: "D", text: "$\\frac{29}{20}$" }
      ],
      correctAnswer: "A",
      hint: "No side length is needed to answer this.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The two acute angles are complementary, and the cosine of an angle equals the sine of its complement, so $\\cos(y^\\circ) = \\frac{20}{29}$.\n\n**The Full Solution:**\nStep 1: In a right triangle the two acute angles satisfy $x + y = 90$, so they are complementary.\nStep 2: The side opposite $x^\\circ$ is the side adjacent to $y^\\circ$, and both ratios are taken over the same hypotenuse.\nStep 3: Therefore $\\cos(y^\\circ) = \\sin(x^\\circ) = \\frac{20}{29}$. Check: with legs $20$ and $21$ and hypotenuse $29$, $\\cos(y^\\circ) = \\frac{20}{29}$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{21}{29}$): computing $\\cos(x^\\circ)$ with the third side $21$; the complement swaps which leg is adjacent.\n* Choice C ($\\frac{20}{21}$): computing $\\tan(x^\\circ)$, a ratio of the two legs rather than a leg over the hypotenuse.\n* Choice D ($\\frac{29}{20}$): inverting the ratio, which no sine or cosine of an acute angle can exceed $1$.\n\n**Test Day Takeaway:** Complementary angles trade sine for cosine — no side lengths are needed at all.",
      skills: ["soh-cah-toa"]
    }
  ],

  // Section: Special Right Triangles
  "Special Right Triangles": [
    {
      id: 1,
      difficulty: "easy",
      question: "A $45°$-$45°$-$90°$ triangle has legs of length $11$ centimeters. What is the length, in centimeters, of its hypotenuse?",
      diagram: { type: "rightTriangle", params: { labels: ["45°", "", "45°"], sideLabels: ["11", "11", ""], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: adds the legs and then takes a square root, instead of adding their squares
        { id: "A", text: "$\\sqrt{22}$" },
        { id: "B", text: "$11\\sqrt{2}$" },
        // distractor: uses $\sqrt{3}$, which belongs to the $30°$-$60°$-$90°$ ratios
        { id: "C", text: "$11\\sqrt{3}$" },
        // distractor: doubles a leg, which is the $30°$-$60°$-$90°$ hypotenuse rule
        { id: "D", text: "$22$" }
      ],
      correctAnswer: "B",
      hint: "The two legs are equal, so the Pythagorean theorem gives twice one square.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** In a $45°$-$45°$-$90°$ triangle the hypotenuse is $\\sqrt{2}$ times a leg, so it is $11\\sqrt{2}$.\n\n**The Full Solution:**\nStep 1: The two legs are equal, so the sides are in the ratio $1 : 1 : \\sqrt{2}$.\nStep 2: With each leg $11$, the hypotenuse is $11\\sqrt{2}$ centimeters.\nStep 3: Check with the Pythagorean theorem: $11^2 + 11^2 = 242$ and $(11\\sqrt{2})^2 = 121(2) = 242$.\n\nVerification: $11\\sqrt{2} \\approx 15.6$, longer than either leg and shorter than their sum of $22$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\sqrt{22}$): adds the legs and then takes a square root, instead of adding their squares.\n* Choice C ($11\\sqrt{3}$): uses $\\sqrt{3}$, which belongs to the $30°$-$60°$-$90°$ ratios.\n* Choice D ($22$): doubles a leg, which is the $30°$-$60°$-$90°$ hypotenuse rule.\n\n**Test Day Takeaway:** Leg to hypotenuse in a $45°$-$45°$-$90°$ triangle multiplies by $\\sqrt{2}$; going the other way divides.",
      skills: ["special-right-triangles"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "In a $30°$-$60°$-$90°$ triangle, the side opposite the $30°$ angle has length $9$. What is the length of the side opposite the $90°$ angle?",
      diagram: { type: "rightTriangle", params: { labels: ["30°", "", "60°"], sideLabels: ["", "9", ""], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: uses $\sqrt{2}$, which belongs to the $45°$-$45°$-$90°$ ratios
        { id: "A", text: "$9\\sqrt{2}$" },
        // distractor: gives the side opposite the $60°$ angle
        { id: "B", text: "$9\\sqrt{3}$" },
        { id: "C", text: "$18$" },
        // distractor: triples the shorter leg instead of doubling it
        { id: "D", text: "$27$" }
      ],
      correctAnswer: "C",
      hint: "The side opposite the largest angle is the hypotenuse — compare it with the shortest side.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** The hypotenuse is twice the side opposite the $30°$ angle: $2(9) = 18$.\n\n**The Full Solution:**\nStep 1: The side opposite the $90°$ angle is the hypotenuse.\nStep 2: In a $30°$-$60°$-$90°$ triangle the sides are in the ratio $1 : \\sqrt{3} : 2$, shortest to longest.\nStep 3: The shorter leg is $9$, so the hypotenuse is $2(9) = 18$.\n\nVerification: $9^2 + (9\\sqrt{3})^2 = 81 + 243 = 324 = 18^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($9\\sqrt{2}$): uses $\\sqrt{2}$, which belongs to the $45°$-$45°$-$90°$ ratios.\n* Choice B ($9\\sqrt{3}$): gives the side opposite the $60°$ angle.\n* Choice D ($27$): triples the shorter leg instead of doubling it.\n\n**Test Day Takeaway:** The shorter leg of a $30°$-$60°$-$90°$ triangle is exactly half the hypotenuse.",
      skills: ["special-right-triangles"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A dome shutter's diagonal stay makes a $45^\\circ$ angle with the horizontal rail beneath it. If the stay spans $9$ meters horizontally, how long is the stay, in meters?",
      choices: [
        // distractor: divides by the square root of 2 instead of multiplying
        { id: "A", text: "$\\frac{9\\sqrt{2}}{2}$" },
        { id: "B", text: "$9\\sqrt{2}$" },
        // distractor: uses the 30-60-90 ratio of the square root of 3
        { id: "C", text: "$9\\sqrt{3}$" },
        // distractor: doubles the run, as though the hypotenuse were twice a leg
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "B",
      hint: "A $45^\\circ$ angle with the rail settles the third angle as well.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** A $45^\\circ$ stay makes a $45$-$45$-$90$ triangle, whose hypotenuse is $\\sqrt{2}$ times a leg: $9\\sqrt{2}$.\n\n**The Full Solution:**\nStep 1: The stay, the horizontal run, and the vertical rise form a right triangle with a $45^\\circ$ angle, so the third angle is also $45^\\circ$.\nStep 2: In a $45$-$45$-$90$ triangle the two legs are equal and the hypotenuse is $\\sqrt{2}$ times a leg.\nStep 3: The stay is the hypotenuse, so it measures $9\\sqrt{2}$ meters. Check: $9^2 + 9^2 = 162 = (9\\sqrt{2})^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{9\\sqrt{2}}{2}$): dividing the leg by $\\sqrt{2}$ instead of multiplying, which makes the hypotenuse shorter than a leg.\n* Choice C ($9\\sqrt{3}$): using the $30$-$60$-$90$ ratio $\\sqrt{3}$, which belongs to a different special triangle.\n* Choice D ($18$): doubling the run; only in a $30$-$60$-$90$ triangle is the hypotenuse twice a side, and then twice the shorter leg.\n\n**Test Day Takeaway:** Identify which special triangle the given angle creates before reaching for a ratio.",
      skills: ["special-right-triangles"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "In right triangle $ABC$, the measure of angle $A$ is $30°$, the measure of angle $B$ is $60°$, and $AB = 22$. What is the length of $\\overline{AC}$?",
      choices: [
        // distractor: gives $BC$, the side opposite the $30°$ angle
        { id: "A", text: "$11$" },
        // distractor: uses the $45°$-$45°$-$90°$ ratio
        { id: "B", text: "$11\\sqrt{2}$" },
        { id: "C", text: "$11\\sqrt{3}$" },
        // distractor: multiplies the hypotenuse by $\sqrt{3}$ without halving it first
        { id: "D", text: "$22\\sqrt{3}$" }
      ],
      correctAnswer: "C",
      hint: "Work through the shortest side before reaching for $\\sqrt{3}$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $\\overline{AB}$ is the hypotenuse, so $BC = 11$ and $AC = 11\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: Angle $C$ measures $180 - 30 - 60 = 90°$, so $\\overline{AB}$ is the hypotenuse.\nStep 2: The side opposite the $30°$ angle is $\\overline{BC}$, half the hypotenuse: $BC = 11$.\nStep 3: The side opposite the $60°$ angle is $\\overline{AC}$, which is $\\sqrt{3}$ times the shorter leg: $AC = 11\\sqrt{3}$.\n\nVerification: $11^2 + (11\\sqrt{3})^2 = 121 + 363 = 484 = 22^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($11$): gives $BC$, the side opposite the $30°$ angle.\n* Choice B ($11\\sqrt{2}$): uses the $45°$-$45°$-$90°$ ratio.\n* Choice D ($22\\sqrt{3}$): multiplies the hypotenuse by $\\sqrt{3}$ without halving it first.\n\n**Test Day Takeaway:** Build a $30°$-$60°$-$90°$ triangle from its shortest side: halve the hypotenuse, then multiply by $\\sqrt{3}$.",
      skills: ["special-right-triangles"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A beet-loading conveyor rises from the field to a trailer at an angle of $30^\\circ$ with the level ground, and its horizontal run measures $4\\sqrt{3}$ meters. What is the length, in meters, of the conveyor?",
      choices: [
        // distractor: reports the vertical rise instead of the conveyor's length
        { id: "A", text: "$4$" },
        // distractor: repeats the given horizontal run
        { id: "B", text: "$4\\sqrt{3}$" },
        { id: "C", text: "$8$" },
        // distractor: doubles the run instead of the rise
        { id: "D", text: "$8\\sqrt{3}$" }
      ],
      correctAnswer: "C",
      hint: "The run is not the side opposite the $30^\\circ$ angle.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** The run is the longer leg, $4\\sqrt{3}$, so the shorter leg is $4$ and the conveyor, the hypotenuse, is $8$ meters.\n\n**The Full Solution:**\nStep 1: The conveyor, its horizontal run, and its vertical rise form a $30$-$60$-$90$ triangle, and the run lies opposite the $60^\\circ$ angle, so it is the longer leg.\nStep 2: The longer leg is $\\sqrt{3}$ times the shorter leg, so the rise is $\\frac{4\\sqrt{3}}{\\sqrt{3}} = 4$ meters.\nStep 3: The hypotenuse is twice the shorter leg, so the conveyor is $8$ meters long. Check: $4^2 + (4\\sqrt{3})^2 = 16 + 48 = 64 = 8^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reporting the vertical rise, the shorter leg, instead of the conveyor itself.\n* Choice B ($4\\sqrt{3}$): repeating the horizontal run that the question already gave.\n* Choice D ($8\\sqrt{3}$): doubling the run; the hypotenuse is twice the SHORTER leg, not twice the longer one.\n\n**Test Day Takeaway:** In a $30$-$60$-$90$ triangle, find the shorter leg first — every other length is measured from it.",
      skills: ["special-right-triangles"]
    }
  ]
};
