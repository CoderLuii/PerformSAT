export const geometryBank = [
  // ── EASY (18 questions) ────────────────────────────────────────────

  {
    id: "bank-geo-001",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A canvas awning is held open by the triangular brace shown, whose three angle measures are marked in degrees. What is the value of $x$?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["52°", "61°", "x°"], figureNote: true } },
    choices: [
      { id: "A", text: "$67$" },
      // distractor: adds the two known angles, 52 + 61 = 113, instead of subtracting their sum from 180
      { id: "B", text: "$113$" },
      // distractor: subtracts only 61 from 180
      { id: "C", text: "$119$" },
      // distractor: subtracts only 52 from 180
      { id: "D", text: "$128$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** $180-52-61=67$, so $x=67$.\n\n**The Full Solution:**\n\nStep 1 — The three angle measures of a triangle add to $180$ degrees, so $52+61+x=180$.\n\nStep 2 — Combine the known angles: $52+61=113$.\n\nStep 3 — Subtract: $x=180-113=67$. Check: $52+61+67=180$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($113$): this is the sum of the two given angles, the amount to remove from $180$, not the answer.\n* Choice C ($119$): this subtracts only $61$ from $180$.\n* Choice D ($128$): this subtracts only $52$ from $180$.\n\n**Test Day Takeaway:** Add the known angles first, then subtract once from $180$ — two separate subtractions is where the slip happens.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-computation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-002",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Solar cells are cut from round silicon wafers. One wafer measures $16$ centimeters from its center to its rim. How much wafer surface, in square centimeters, is available for cells?",
    choices: [
      // distractor: multiplies pi by the radius instead of the radius squared
      { id: "A", text: "$16\\pi$" },
      // distractor: gives the circumference 2 pi r = 32 pi
      { id: "B", text: "$32\\pi$" },
      // distractor: halves the area, as though the wafer were a semicircle
      { id: "C", text: "$128\\pi$" },
      { id: "D", text: "$256\\pi$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle Area from Radius**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** Center to rim is the radius, so $A=\\pi(16)^{2}=256\\pi$ square centimeters.\n\n**The Full Solution:**\n\nStep 1: Name the given. The distance from the center to the rim is the radius, $r=16$ cm.\n\nStep 2: Apply the area formula. $A=\\pi r^{2}$.\n\nStep 3: Substitute. $A=\\pi(16)^{2}=256\\pi$ square centimeters, about $804$ square centimeters.\n\nCheck: the wafer is $32$ cm across, so it fits inside a $32$-by-$32$ square of area $1024$, and $804$ is a sensible fraction of that.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($16\\pi$): multiplies $\\pi$ by the radius instead of by the radius squared.\n* Choice B ($32\\pi$): gives the circumference $2\\pi r$, a length rather than an area.\n* Choice C ($128\\pi$): halves the area, as though only a semicircular half of the wafer were usable.\n\n**Test Day Takeaway:** \"Center to rim\" is the radius; square it once and the answer follows directly from $\\pi r^{2}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-003",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A gable-end tie rod $17$ feet long runs from the ridge to the eave of a wall $8$ feet high. What is the horizontal run, in feet, of the rod?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 8]], sideLabels: ["", "8 ft", "17 ft"], rightAngleVertex: 1 } },
    choices: [
      // distractor: subtracts the lengths instead of the squares: 17 - 8
      { id: "A", text: "$9$" },
      { id: "B", text: "$15$" },
      // distractor: adds the two given lengths: 17 + 8
      { id: "C", text: "$25$" },
      // distractor: computes the triangle's area, one half times 8 times 15, instead of a side length
      { id: "D", text: "$60$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Pythagorean Theorem**\n\n**Choice B is correct.** The horizontal run is $\\sqrt{17^2 - 8^2} = \\sqrt{225} = 15$ feet.\n\n**The Fast Way (~20s):** $8$-$15$-$17$ is a Pythagorean triple, so the missing leg is $15$.\n\n**The Full Solution:**\n\nStep 1: The rod is the hypotenuse of a right triangle whose vertical leg is the $8$-foot wall height.\n\nStep 2: Apply $a^2 + b^2 = c^2$ with $b = 8$ and $c = 17$: $a^2 = 289 - 64 = 225$.\n\nStep 3: Take the positive square root: $a = 15$ feet. Check: $8^2 + 15^2 = 64 + 225 = 289 = 17^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($9$): subtracts the lengths, $17 - 8$, instead of subtracting their squares.\n* Choice C ($25$): adds the two given lengths, which would make the hypotenuse the shortest side.\n* Choice D ($60$): computes the triangle's area, $\\frac{1}{2}(8)(15)$, instead of the requested length.\n\n**Test Day Takeaway:** Squares subtract, lengths do not — and a hypotenuse is always the longest side, which rules out any answer larger than it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-computation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-004",
    domain: "geometry",
    skills: ["circumference"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A drill core barrel has an outer diameter of $d$ centimeters. Which expression gives the distance, in centimeters, around the outside of the barrel?",
    choices: [
      // distractor: uses pi times the radius d/2, which is half the circumference
      { id: "A", text: "$\\frac{\\pi d}{2}$" },
      { id: "B", text: "$\\pi d$" },
      // distractor: substitutes the diameter into 2 pi r, doubling the circumference
      { id: "C", text: "$2\\pi d$" },
      // distractor: uses an area-style formula, squaring the diameter
      { id: "D", text: "$\\pi d^2$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circumference from Diameter**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** Circumference is $2\\pi r$, and $r = \\frac{d}{2}$, so $C = 2\\pi\\left(\\frac{d}{2}\\right) = \\pi d$.\n\n**The Full Solution:**\nStep 1: The distance around a circle is its circumference, $C = 2\\pi r$.\nStep 2: The barrel's radius is half its diameter: $r = \\frac{d}{2}$ centimeters.\nStep 3: Substitute: $C = 2\\pi \\cdot \\frac{d}{2} = \\pi d$ centimeters. Check: a barrel with $d = 10$ has $r = 5$ and $C = 2\\pi(5) = 10\\pi = \\pi d$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{\\pi d}{2}$): computes $\\pi r$, which is only half the way around.\n* Choice C ($2\\pi d$): plugs the diameter in where the radius belongs, doubling the true distance.\n* Choice D ($\\pi d^2$): squares the diameter, which produces an area, not a length.\n\n**Test Day Takeaway:** $C = 2\\pi r = \\pi d$ — when a problem hands you a diameter, the factor of $2$ is already spent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-005",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A rectangular solvent storage cabinet is $x$ centimeters wide, twice as deep as it is wide, and $40$ centimeters tall. Which expression gives its volume, in cubic centimeters?",
    choices: [
      // distractor: multiplies 2 times 40 times x, using only one of the two horizontal dimensions
      { id: "A", text: "$80x$" },
      // distractor: forgets to double the depth, multiplying x times x times 40
      { id: "B", text: "$40x^2$" },
      { id: "C", text: "$80x^2$" },
      // distractor: treats the 40-centimeter height as a third factor of x as well
      { id: "D", text: "$80x^3$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rectangular Prism Volume**\n\n**Choice C is correct.** The three dimensions are $x$, $2x$, and $40$, so the volume is $x \\cdot 2x \\cdot 40 = 80x^2$.\n\n**The Fast Way (~15s):** $x \\cdot 2x \\cdot 40 = 80x^2$.\n\n**The Full Solution:**\n\nStep 1: The width is $x$, the depth is twice the width, or $2x$, and the height is $40$ centimeters.\n\nStep 2: Volume of a rectangular prism is the product of the three dimensions: $x(2x)(40)$.\n\nStep 3: Multiply: $2 \\cdot 40 = 80$ and $x \\cdot x = x^2$, giving $80x^2$. Check with $x = 3$: the cabinet is $3$ by $6$ by $40$, volume $720$, and $80(3)^2 = 720$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($80x$): uses only one of the two horizontal dimensions, giving $2 \\cdot 40 \\cdot x$.\n* Choice B ($40x^2$): forgets that the depth is doubled.\n* Choice D ($80x^3$): treats the fixed $40$-centimeter height as another factor of $x$.\n\n**Test Day Takeaway:** Write all three dimensions in terms of the same variable before multiplying; the degree of the answer tells you how many of them actually depended on $x$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-006",
    domain: "geometry",
    skills: ["degrees-to-radians"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A bathymetric survey vessel maps a seamount by running a series of straight legs, and at the end of one leg the vessel turns through an angle of $216$ degrees before beginning the next leg. The navigation log records every course change as a radian measure rather than a degree measure. What measure, in radians, does the log record for this turn?",
    choices: [
      // distractor: divides by 360 instead of 180
      { id: "A", text: "$\\frac{3\\pi}{5}$" },
      // distractor: inverts the conversion fraction, computing 180 over 216 times pi
      { id: "B", text: "$\\frac{5\\pi}{6}$" },
      { id: "C", text: "$\\frac{6\\pi}{5}$" },
      // distractor: multiplies by 2 pi and divides by 180, doubling the measure
      { id: "D", text: "$\\frac{12\\pi}{5}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Degrees to Radians**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Multiply by $\\frac{\\pi}{180}$: $216 \\cdot \\frac{\\pi}{180} = \\frac{6\\pi}{5}$ radians.\n\n**The Full Solution:**\nStep 1: Degrees convert to radians through $180$ degrees $= \\pi$ radians, so multiply the degree measure by $\\frac{\\pi}{180}$.\nStep 2: The log entry is $\\frac{216\\pi}{180}$ radians, and both numbers are divisible by $36$: $\\frac{216}{180} = \\frac{6}{5}$.\nStep 3: The turn is $\\frac{6\\pi}{5}$ radians. Check: $\\frac{6\\pi}{5} \\approx 3.77$, just past $\\pi \\approx 3.14$, matching a turn a little past half a circle ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3\\pi}{5}$): divides by $360$, the degrees in a full turn, instead of by $180$.\n* Choice B ($\\frac{5\\pi}{6}$): flips the conversion fraction and multiplies by $\\frac{180}{216}$.\n* Choice D ($\\frac{12\\pi}{5}$): multiplies by $2\\pi$ and divides by $180$, doubling the correct measure.\n\n**Test Day Takeaway:** Degrees to radians is one multiplication by $\\frac{\\pi}{180}$ — and any angle past $180$ degrees must come out larger than $\\pi$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "unit-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-007",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "fill-in",
    question: "A lakeside lodge terrace is covered by a triangular shade canopy whose edge along the building wall measures $18$ meters and whose far corner stands $7$ meters out from that wall. What is the area, in square meters, of the canopy?",
    correctAnswer: "63",
    explanation: "**SAT Pattern: Triangle Area**\n\n**The correct answer is $63$.**\n\n**The Fast Way (~15s):** $A=\\frac{1}{2}(18)(7)=63$ square meters.\n\n**The Full Solution:**\n\nStep 1 — Identify the base and height. The edge along the wall, $18$ meters, is the base, and the perpendicular distance from the wall to the far corner, $7$ meters, is the height.\n\nStep 2 — Apply the triangle area formula: $A=\\frac{1}{2}bh=\\frac{1}{2}(18)(7)$.\n\nStep 3 — Compute: $\\frac{1}{2}(126)=63$ square meters. Check: a rectangle $18$ by $7$ covers $126$, and the triangle is exactly half of it.\n\n**Common Mistakes:** Answering $126$ omits the factor $\\frac{1}{2}$. Answering $25$ adds the two lengths instead of multiplying them. Answering $50$ treats $18$ and $7$ as two sides of a rectangle's perimeter, $2(18)+2(7)$.\n\n**Test Day Takeaway:** The height is the perpendicular distance from the base to the opposite corner — not a slanted edge of the triangle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-008",
    domain: "geometry",
    skills: ["radians-to-degrees"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A tape-library robot arm pivots about a post at the center of a circular carousel of cartridge slots. Starting from the slot directly in front of the post, the arm swings counterclockwise through $\\frac{5\\pi}{6}$ radians and stops in front of a second slot on the same carousel. Which of the following statements about the size of that swing is true?",
    choices: [
      // distractor: converts with 90 degrees per pi radians, giving 75 degrees
      { id: "A", text: "The swing is less than $90^\\circ$." },
      { id: "B", text: "The swing is between $90^\\circ$ and $180^\\circ$." },
      // distractor: reads 5 pi over 6 as pi, the radian measure of a straight angle
      { id: "C", text: "The swing is exactly $180^\\circ$." },
      // distractor: converts with 360 degrees per pi radians, giving 300 degrees
      { id: "D", text: "The swing is greater than $180^\\circ$." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Radians to Degrees**\n\n**Choice B is correct.** $\\frac{5\\pi}{6} \\cdot \\frac{180}{\\pi} = 150^\\circ$, which lies between $90^\\circ$ and $180^\\circ$.\n\n**The Fast Way (~15s):** $\\frac{5}{6}$ of a straight angle is $\\frac{5}{6}(180) = 150^\\circ$.\n\n**The Full Solution:**\n\nStep 1: Radians convert to degrees by multiplying by $\\frac{180}{\\pi}$.\n\nStep 2: $\\frac{5\\pi}{6} \\cdot \\frac{180}{\\pi} = \\frac{900}{6} = 150^\\circ$.\n\nStep 3: Since $90 < 150 < 180$, the swing is more than a quarter revolution but less than a half revolution. Check: $150^\\circ \\cdot \\frac{\\pi}{180} = \\frac{5\\pi}{6}$, the original measure.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: uses $90^\\circ$ per $\\pi$ radians and lands on $75^\\circ$.\n* Choice C: reads $\\frac{5\\pi}{6}$ as $\\pi$, the measure of a straight angle.\n* Choice D: uses $360^\\circ$ per $\\pi$ radians and lands on $300^\\circ$.\n\n**Test Day Takeaway:** Any radian measure written as a fraction of $\\pi$ is that same fraction of $180^\\circ$ — no calculator needed to place it on the circle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "unit-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-009",
    domain: "geometry",
    skills: ["triangle-types"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A fabricator joins three titanium spars measuring $14$ centimeters, $14$ centimeters, and $22$ centimeters into a closed triangular frame. Which of the following best describes the triangle that the three spars form?",
    choices: [
      // distractor: requires all three sides equal, but 22 differs from 14
      { id: "A", text: "Equilateral" },
      { id: "B", text: "Isosceles but not equilateral" },
      // distractor: requires all three sides different, but two spars share the length 14
      { id: "C", text: "Scalene" },
      // distractor: assumes the longest side is a hypotenuse without testing 14^2 + 14^2 against 22^2
      { id: "D", text: "Right" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangle Classification by Sides**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Exactly two of the three lengths are equal, so the frame is isosceles but not equilateral.\n\n**The Full Solution:**\nStep 1: The three spars measure $14$, $14$, and $22$ centimeters, and $14 + 14 = 28 > 22$, so they do close into a triangle.\nStep 2: A triangle with exactly two equal sides is isosceles; with all three equal it would be equilateral. Here two sides measure $14$ and the third measures $22$.\nStep 3: Therefore the frame is isosceles but not equilateral.\n\nCheck: $14^2 + 14^2 = 392$, while $22^2 = 484$, so the triangle is not right either. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (equilateral): would require all three spars to measure the same, but $22 \\ne 14$.\n* Choice C (scalene): would require all three lengths to differ, yet two spars both measure $14$ centimeters.\n* Choice D (right): assumes the longest side must be a hypotenuse; testing gives $392 \\ne 484$, so no right angle exists.\n\n**Test Day Takeaway:** Classify by sides first by counting equal lengths, then test $a^2 + b^2 = c^2$ only if the question asks about angles.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "classification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-010",
    domain: "geometry",
    skills: ["special-right-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A tile showroom displays a square sample cut along its diagonal, forming the right triangle shown with lengths in centimeters. What is the length of each leg of the sample?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [11.314, 0], [11.314, 11.314]], rightAngleVertex: 1, labels: ["45°", "", ""], sideLabels: ["", "", "16"], figureNote: true } },
    choices: [
      // distractor: halves the hypotenuse and then divides by root 2, giving 4 root 2
      { id: "A", text: "$4\\sqrt{2}$" },
      // distractor: halves the hypotenuse as if the triangle were 30-60-90
      { id: "B", text: "$8$" },
      { id: "C", text: "$8\\sqrt{2}$" },
      // distractor: restates the given hypotenuse, 16
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** In a $45$-$45$-$90$ triangle the hypotenuse is a leg times $\\sqrt{2}$, so each leg is $\\frac{16}{\\sqrt{2}}=8\\sqrt{2}$ cm.\n\n**The Full Solution:**\n\nStep 1: Name the ratio. The sides of a $45$-$45$-$90$ triangle are $x$, $x$, and $x\\sqrt{2}$.\n\nStep 2: Set the hypotenuse equal to the given value. $x\\sqrt{2}=16$, so $x=\\frac{16}{\\sqrt{2}}$.\n\nStep 3: Rationalize. $x=\\frac{16\\sqrt{2}}{2}=8\\sqrt{2}$ cm, about $11.3$ cm.\n\nCheck: $(8\\sqrt{2})^{2}+(8\\sqrt{2})^{2}=128+128=256=16^{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4\\sqrt{2}$): halves the hypotenuse first and then divides by $\\sqrt{2}$, applying two reductions.\n* Choice B ($8$): halves the hypotenuse, which is the $30$-$60$-$90$ relationship, not this one.\n* Choice D ($16$): restates the hypotenuse shown in the figure rather than a leg.\n\n**Test Day Takeaway:** Going from hypotenuse to leg in a $45$-$45$-$90$ triangle means dividing by $\\sqrt{2}$, never by $2$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "special-triangle-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-011",
    domain: "geometry",
    skills: ["circle-parts"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A segment has one endpoint at the center of a circle and its other endpoint on the circle. Which term describes this segment?",
    choices: [
      // distractor: a chord has both endpoints on the circle
      { id: "A", text: "A chord" },
      // distractor: a diameter passes through the center with both endpoints on the circle
      { id: "B", text: "A diameter" },
      { id: "C", text: "A radius" },
      // distractor: a tangent touches the circle at one point and is a line, not a segment to the center
      { id: "D", text: "A tangent" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle Vocabulary**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** A segment from the center to a point on the circle is a radius, by definition.\n\n**The Full Solution:**\nStep 1: Every point of a circle is the same distance from the center, and that distance is the radius.\nStep 2: The described segment joins the center to one point of the circle, so its length is exactly that fixed distance.\nStep 3: The segment is therefore a radius.\n\nVerification: two radii drawn in opposite directions from the center form a diameter, which is twice as long, so the described segment cannot be the diameter. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (A chord): a chord has both endpoints on the circle, not one at the center.\n* Choice B (A diameter): a diameter is a chord through the center; it has length $2r$, twice the described segment.\n* Choice D (A tangent): a tangent is a line that meets the circle at exactly one point and does not pass through the center.\n\n**Test Day Takeaway:** Sort circle terms by where the endpoints sit: center to circle is a radius, circle to circle is a chord, and a chord through the center is a diameter.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "definition-recall",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-012",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A boarding ramp at an airport gate has the cross-section shown, a right triangle with lengths given in feet. What is the value of $\\sin(\\angle A)$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 8]], labels: ["A", "B", "C"], sideLabels: ["15", "8", "17"], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$\\frac{8}{17}$" },
      // distractor: gives tan(A) = opposite/adjacent = 8/15
      { id: "B", text: "$\\frac{8}{15}$" },
      // distractor: gives cos(A) = adjacent/hypotenuse = 15/17
      { id: "C", text: "$\\frac{15}{17}$" },
      // distractor: inverts cos(A), dividing the hypotenuse by the adjacent leg
      { id: "D", text: "$\\frac{17}{15}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: SOH-CAH-TOA**\n\n**Choice A is correct.**\n\n**The Fast Way (~15s):** Sine is opposite over hypotenuse; the leg opposite $\\angle A$ is $\\overline{BC}=8$ and the hypotenuse is $\\overline{CA}=17$, so $\\sin(\\angle A)=\\frac{8}{17}$.\n\n**The Full Solution:**\n\nStep 1 — Locate the right angle. The marker sits at $B$, so $\\overline{CA}$, the side across from it, is the hypotenuse: $17$ feet.\n\nStep 2 — Find the leg opposite $\\angle A$. Moving across the triangle from $A$ lands on $\\overline{BC}=8$ feet.\n\nStep 3 — Apply SOH: $\\sin(\\angle A)=\\frac{\\text{opposite}}{\\text{hypotenuse}}=\\frac{8}{17}$. Check: $8^2+15^2=64+225=289=17^2$, so the labels are consistent.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($\\frac{8}{15}$): this is $\\tan(\\angle A)$, opposite over adjacent.\n* Choice C ($\\frac{15}{17}$): this is $\\cos(\\angle A)$, using the adjacent leg instead of the opposite one.\n* Choice D ($\\frac{17}{15}$): this flips $\\cos(\\angle A)$, putting the hypotenuse on top.\n\n**Test Day Takeaway:** The hypotenuse is always across from the right angle — identify it first, then decide which leg is opposite the named angle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-trig-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-013",
    domain: "geometry",
    skills: ["triangle-inequality"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A machinist has brass rods cut to the lengths listed in each choice, in centimeters. Which set of three lengths can be joined end to end to form a triangle?",
    choices: [
      // distractor: 4 + 6 = 10, which is less than 11, so the two shorter rods cannot reach
      { id: "A", text: "$4$, $6$, and $11$" },
      // distractor: 5 + 9 = 14 exactly, so the three rods lie flat instead of enclosing a region
      { id: "B", text: "$5$, $9$, and $14$" },
      // distractor: 6 + 8 = 14, which is less than 15, so the frame cannot close
      { id: "C", text: "$6$, $8$, and $15$" },
      { id: "D", text: "$7$, $10$, and $16$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Triangle Inequality**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Only in choice D do the two shorter rods beat the longest: $7 + 10 = 17 > 16$.\n\n**The Full Solution:**\nStep 1: Three lengths form a triangle exactly when the sum of the two shorter lengths is greater than the longest length.\nStep 2: Test each set: $4 + 6 = 10 < 11$; $5 + 9 = 14 = 14$; $6 + 8 = 14 < 15$; $7 + 10 = 17 > 16$.\nStep 3: Only the last set satisfies the strict inequality, so $7$, $10$, and $16$ centimeters can close into a triangle.\n\nCheck: The other two inequalities also hold for choice D, since $7 + 16 = 23 > 10$ and $10 + 16 = 26 > 7$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$, $6$, $11$): $4 + 6 = 10$ falls short of $11$, so the two shorter rods never meet.\n* Choice B ($5$, $9$, $14$): $5 + 9 = 14$ exactly, so the rods lie flat along the longest one and enclose no area.\n* Choice C ($6$, $8$, $15$): $6 + 8 = 14$ is less than $15$, leaving a one-centimeter gap.\n\n**Test Day Takeaway:** Add the two smallest lengths and compare with the largest; equality is a straight line, not a triangle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "constraint-check",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-014",
    domain: "geometry",
    skills: ["volume-sphere"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A seaside inn's lobby window displays a decorative spherical glass float, a souvenir of the harbor's fishing fleet, whose radius measures $6$ inches. What is the volume, in cubic inches, of the float?",
    choices: [
      // distractor: computes the surface area 4 pi r^2 = 144 pi instead of the volume
      { id: "A", text: "$144\\pi$" },
      { id: "B", text: "$288\\pi$" },
      // distractor: drops the factor 1/3, computing 4 pi r^3 = 864 pi
      { id: "C", text: "$864\\pi$" },
      // distractor: uses the diameter 12 in place of the radius: (4/3) pi (12)^3 = 2304 pi
      { id: "D", text: "$2304\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sphere Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $V=\\frac{4}{3}\\pi r^3=\\frac{4}{3}\\pi(6)^3=\\frac{4}{3}\\pi(216)=288\\pi$ cubic inches.\n\n**The Full Solution:**\n\nStep 1 — Recall the formula for the volume of a sphere: $V=\\frac{4}{3}\\pi r^3$.\n\nStep 2 — Cube the radius: $6^3=216$.\n\nStep 3 — Multiply: $\\frac{4}{3}(216)=288$, so $V=288\\pi$ cubic inches. Check: $288\\pi$ is about $905$ cubic inches, a reasonable size for a $12$-inch-wide float.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($144\\pi$): this is the surface area $4\\pi r^2=4\\pi(36)$, a two-dimensional measure.\n* Choice C ($864\\pi$): this drops the $\\frac{1}{3}$, computing $4\\pi(216)$.\n* Choice D ($2304\\pi$): this cubes the diameter $12$ instead of the radius, giving $\\frac{4}{3}\\pi(1728)$.\n\n**Test Day Takeaway:** The sphere formula uses the radius, cubed, with a $\\frac{4}{3}$ out front — check each of those three details before choosing.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-015",
    domain: "geometry",
    skills: ["radian-measure-understanding"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "During a calibration run, a benchtop centrifuge holds a rotor whose sample tubes all start from marked positions on the rim. The operator spins the rotor and stops it at the first moment when every tube is back in the position from which it started. Which expression gives the measure, in radians, of the angle each tube has turned through?",
    choices: [
      // distractor: gives a quarter revolution, the radian measure of 90 degrees
      { id: "A", text: "$\\frac{\\pi}{2}$" },
      // distractor: gives a half revolution, the radian measure of 180 degrees
      { id: "B", text: "$\\pi$" },
      { id: "C", text: "$2\\pi$" },
      // distractor: gives two complete revolutions rather than one
      { id: "D", text: "$4\\pi$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Radian Measure of a Full Circle**\n\n**Choice C is correct.** One complete revolution is $2\\pi$ radians.\n\n**The Fast Way (~10s):** A full turn around a circle is $2\\pi$ radians.\n\n**The Full Solution:**\n\nStep 1: A tube returns to its starting position for the first time exactly when the rotor has made one complete revolution.\n\nStep 2: Radian measure is arc length divided by radius. Going once around a circle of radius $r$ traces an arc of length $2\\pi r$.\n\nStep 3: So the angle is $\\frac{2\\pi r}{r} = 2\\pi$ radians. Check: $2\\pi$ radians converts to $2\\pi \\cdot \\frac{180}{\\pi} = 360^\\circ$, one full turn.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{\\pi}{2}$): a quarter revolution, or $90^\\circ$.\n* Choice B ($\\pi$): a half revolution, or $180^\\circ$ — the value students reach for when they recall \"$\\pi$ is a circle.\"\n* Choice D ($4\\pi$): two complete revolutions, or $720^\\circ$.\n\n**Test Day Takeaway:** Anchor every radian question to $2\\pi = $ one full turn; halves, quarters, and thirds of a revolution all follow from it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "definition-recall",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-016",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A campus map shows a circular quiet zone centered at $(-6,4)$ with a radius of $9$ units. Which equation represents the boundary of that quiet zone?",
    choices: [
      // distractor: copies the center's coordinates without reversing their signs and uses r instead of r squared
      { id: "A", text: "$(x-6)^{2}+(y+4)^{2}=9$" },
      // distractor: copies the center's coordinates without reversing their signs
      { id: "B", text: "$(x-6)^{2}+(y+4)^{2}=81$" },
      // distractor: uses the radius 9 where the square of the radius, 81, belongs
      { id: "C", text: "$(x+6)^{2}+(y-4)^{2}=9$" },
      { id: "D", text: "$(x+6)^{2}+(y-4)^{2}=81$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle Equation Standard Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** Standard form is $(x-h)^{2}+(y-k)^{2}=r^{2}$, so a center of $(-6,4)$ and radius $9$ give $(x+6)^{2}+(y-4)^{2}=81$.\n\n**The Full Solution:**\n\nStep 1: Recall the form. A circle with center $(h,k)$ and radius $r$ is $(x-h)^{2}+(y-k)^{2}=r^{2}$.\n\nStep 2: Substitute the center. With $h=-6$, $x-h$ becomes $x-(-6)=x+6$; with $k=4$, $y-k$ becomes $y-4$.\n\nStep 3: Substitute the radius. $r=9$, so the right side is $9^{2}=81$.\n\nCheck: the point $(-6,13)$ is $9$ units above the center, and $(-6+6)^{2}+(13-4)^{2}=0+81=81$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: copies the center's coordinates without reversing their signs and also uses $9$ instead of $81$.\n* Choice B: copies the center's coordinates without reversing their signs.\n* Choice C: places the radius $9$ where $r^{2}=81$ belongs.\n\n**Test Day Takeaway:** The signs inside the parentheses are the opposites of the center's coordinates, and the right side is always the radius squared.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "standard-form-identification",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-017",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "At a rail yard, a straight track touches a circular turntable at exactly one point $T$, and $O$ is the center of the turntable. Which of the following must be true?",
    choices: [
      { id: "A", text: "$\\overline{OT}$ is perpendicular to the track." },
      // distractor: a radius parallel to the tangent would never reach the point of contact
      { id: "B", text: "$\\overline{OT}$ is parallel to the track." },
      // distractor: a line through the center is a secant and crosses the circle at two points, not one
      { id: "C", text: "The track passes through $O$." },
      // distractor: a radius is exactly half the diameter, so it is always shorter
      { id: "D", text: "$\\overline{OT}$ is longer than the turntable's diameter." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Tangent-Radius Perpendicularity**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** A line touching a circle at exactly one point is tangent, and a radius drawn to the point of tangency is perpendicular to that tangent.\n\n**The Full Solution:**\n\nStep 1 — Touching a circle at exactly one point is the definition of a tangent line, so the track is tangent to the turntable at $T$.\n\nStep 2 — $\\overline{OT}$ joins the center to the point of tangency, so it is a radius.\n\nStep 3 — The tangent-radius theorem states that the radius to the point of tangency meets the tangent at a right angle, so $\\overline{OT}$ is perpendicular to the track. Check: any other line from $O$ to the track would be longer than $OT$, which is exactly what perpendicularity guarantees.\n\n**Why the wrong answers are tempting:**\n\n* Choice B: a radius parallel to the track could never meet it at $T$.\n* Choice C: a line through the center is a secant and crosses the circle twice.\n* Choice D: a radius is half a diameter, so it is always the shorter of the two.\n\n**Test Day Takeaway:** \"Touches at exactly one point\" is the signal to draw the radius to that point and mark a right angle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "definition-recall",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-018",
    domain: "geometry",
    skills: ["volume-pyramid-cone"],
    difficulty: "easy",
    type: "fill-in",
    question: "A cinder-cone model on a geology display stands $14$ centimeters tall on a circular base of radius $6$ centimeters. Rounded to the nearest cubic centimeter, how much space does the model occupy?",
    correctAnswer: "528",
    explanation: "**SAT Pattern: Cone Volume**\n\n**The correct answer is $528$.**\n\n**The Fast Way (~20s):** $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(36)(14) = 168\\pi \\approx 528$ cubic centimeters.\n\n**The Full Solution:**\nStep 1: The model is a cone with $r = 6$ centimeters and $h = 14$ centimeters.\nStep 2: Apply $V = \\frac{1}{3}\\pi r^2 h$: $V = \\frac{1}{3}\\pi(6)^2(14) = \\frac{1}{3}\\pi(504) = 168\\pi$ cubic centimeters.\nStep 3: Evaluate and round: $168\\pi \\approx 527.79$, which rounds to $528$. Check: a cylinder of the same base and height would hold $504\\pi \\approx 1583$, exactly three times as much ✓\n\n**Common Mistakes:**\n* $1583$ — omits the $\\frac{1}{3}$ and computes the cylinder $504\\pi$.\n* $88$ — forgets to square the radius, computing $\\frac{1}{3}\\pi(6)(14) = 28\\pi$.\n* $2111$ — uses the diameter $12$ in place of the radius, giving $672\\pi$.\n\n**Test Day Takeaway:** Cone volume is one third of the matching cylinder — square the radius, then divide by $3$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── MEDIUM (27 questions) ──────────────────────────────────────────

  {
    id: "bank-geo-019",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A scaffold brace $26$ feet long leans against a $30$-foot loading-dock wall with its foot $10$ feet from the wall. How many feet below the top of the wall does the brace meet the wall?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [10, 0], [10, 24]], sideLabels: ["10 ft", "", "26 ft"], rightAngleVertex: 1 } },
    choices: [
      // distractor: subtracts the brace length from the wall height: 30 - 26
      { id: "A", text: "$4$" },
      { id: "B", text: "$6$" },
      // distractor: subtracts the distance from the wall instead of the height reached: 30 - 10
      { id: "C", text: "$20$" },
      // distractor: reports the height the brace reaches, 24, without comparing it to the 30-foot wall
      { id: "D", text: "$24$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Ladder Pythagorean**\n\n**Choice B is correct.** The brace reaches $\\sqrt{26^2 - 10^2} = 24$ feet up the wall, which is $30 - 24 = 6$ feet below the top.\n\n**The Fast Way (~30s):** $10$-$24$-$26$ is a $5$-$12$-$13$ triple doubled, so the brace reaches $24$ feet; $30 - 24 = 6$.\n\n**The Full Solution:**\n\nStep 1: The wall, the ground, and the brace form a right triangle with hypotenuse $26$ and one leg $10$.\n\nStep 2: The vertical leg is $\\sqrt{26^2 - 10^2} = \\sqrt{676 - 100} = \\sqrt{576} = 24$ feet.\n\nStep 3: The wall is $30$ feet tall, so the top of the brace sits $30 - 24 = 6$ feet below the top of the wall. Check: $10^2 + 24^2 = 100 + 576 = 676 = 26^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4$): subtracts the brace's length from the wall height, $30 - 26$, treating the slanted brace as if it stood vertically.\n* Choice C ($20$): subtracts the $10$-foot ground distance from the wall height instead of the height actually reached.\n* Choice D ($24$): stops at the height the brace reaches and never compares it with the $30$-foot wall.\n\n**Test Day Takeaway:** Finish the sentence the question asked — a leaning-object problem usually needs one more subtraction after the Pythagorean step.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "real-world-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-020",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A ferry terminal posts two similar triangular route markers, shown with lengths in centimeters and with $PQR$ corresponding to $STU$. What is the length, in centimeters, of side $\\overline{TU}$?",
    diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[0.75, 11.98], [0, 0], [18, 0]], labels: ["P", "Q", "R"], sideLabels: ["12", "18", "21"] }, triangle2: { vertices: [[1.25, 19.96], [0, 0], [30, 0]], labels: ["S", "T", "U"], sideLabels: ["20", "", ""] }, figureNote: true } },
    choices: [
      // distractor: inverts the scale factor: 18 x (12/20) = 10.8
      { id: "A", text: "$10.8$" },
      // distractor: adds the difference 20 - 12 = 8 to 18 instead of scaling
      { id: "B", text: "$26$" },
      { id: "C", text: "$30$" },
      // distractor: squares the scale factor as if scaling an area: 18 x (5/3)^2 = 50
      { id: "D", text: "$50$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $\\overline{ST}$ matches $\\overline{PQ}$, so the scale factor is $\\frac{20}{12}=\\frac{5}{3}$, and $\\overline{TU}=18\\left(\\frac{5}{3}\\right)=30$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — Match the sides. Vertex order $PQR \\to STU$ pairs $\\overline{PQ}$ with $\\overline{ST}$ and $\\overline{QR}$ with $\\overline{TU}$.\n\nStep 2 — Set the proportion: $\\frac{ST}{PQ}=\\frac{TU}{QR}$, so $\\frac{20}{12}=\\frac{TU}{18}$.\n\nStep 3 — Solve: $TU=18\\left(\\frac{20}{12}\\right)=18\\left(\\frac{5}{3}\\right)=30$ centimeters. Check: $\\frac{30}{18}=\\frac{5}{3}$ and $\\frac{20}{12}=\\frac{5}{3}$, so the two ratios agree.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($10.8$): this flips the scale factor, computing $18\\left(\\frac{12}{20}\\right)$ and shrinking the larger marker.\n* Choice B ($26$): this adds the difference $20-12=8$ to $18$; similar figures scale by multiplication, not by a constant addition.\n* Choice D ($50$): this squares the scale factor, $18\\left(\\frac{5}{3}\\right)^2$, which is how areas scale, not sides.\n\n**Test Day Takeaway:** Build the proportion from the vertex order, then check that both fractions reduce to the same scale factor.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "proportion-setup",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-021",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "From a mezzanine rail in a university reading room, the angle of depression to a study carrel on the floor below is $28°$, as drawn, with distances in meters. To the nearest meter, how far is the carrel from the rail itself?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15.046, 0], [0, 8]], rightAngleVertex: 0, labels: ["", "28°", ""], sideLabels: ["", "", "8"], figureNote: true } },
    choices: [
      // distractor: multiplies by the tangent instead of dividing, giving 8 tan 28 about 4.3
      { id: "A", text: "$4$" },
      // distractor: reports the 8-meter vertical drop
      { id: "B", text: "$8$" },
      // distractor: gives the horizontal distance, 8 / tan 28 about 15.0
      { id: "C", text: "$15$" },
      { id: "D", text: "$17$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Angle of Depression**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** The $8$ m drop is opposite the $28°$ angle, so the straight-line distance is $\\frac{8}{\\sin 28°}\\approx17$ meters.\n\n**The Full Solution:**\n\nStep 1: Transfer the angle. The angle of depression from the rail equals the angle of elevation at the carrel, so the marked $28°$ sits at the carrel.\n\nStep 2: Choose the ratio. The $8$ m vertical drop is opposite that angle and the requested distance is the hypotenuse, so $\\sin 28°=\\frac{8}{d}$.\n\nStep 3: Solve. $d=\\frac{8}{\\sin 28°}=\\frac{8}{0.4695}\\approx17.0$, so $d\\approx17$ meters.\n\nCheck: the horizontal leg is $\\frac{8}{\\tan 28°}\\approx15.0$, and $15.0^{2}+8^{2}\\approx289\\approx17^{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4$): multiplies by the tangent instead of dividing, giving $8\\tan 28°\\approx4.3$.\n* Choice B ($8$): reports the vertical drop already marked in the figure.\n* Choice C ($15$): gives the horizontal distance $\\frac{8}{\\tan 28°}\\approx15.0$ from the carrel to the point directly below the rail.\n\n**Test Day Takeaway:** An angle of depression from a high point equals the angle of elevation from the low point; then match the requested side to sine, cosine, or tangent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "angle-of-elevation-depression",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-022",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A bakery's round display case has a curved glass front. The glass spans arc $AB$ in the circle drawn below, where lengths are in inches. What is the length of the glass?",
    diagram: { type: "circleWithSector", params: { centralAngle: 80, angleLabel: "80°", radius: 27, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
    choices: [
      // distractor: uses pi r instead of 2 pi r for the circumference, giving 6 pi
      { id: "A", text: "$6\\pi$" },
      { id: "B", text: "$12\\pi$" },
      // distractor: gives the full circumference 2 pi (27) = 54 pi
      { id: "C", text: "$54\\pi$" },
      // distractor: computes the sector's area, (2/9) pi (27 squared) = 162 pi
      { id: "D", text: "$162\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $\\frac{80}{360}=\\frac{2}{9}$ of the circumference $54\\pi$ is $12\\pi$ inches.\n\n**The Full Solution:**\n\nStep 1: Find the circumference. $C=2\\pi r=2\\pi(27)=54\\pi$ inches.\n\nStep 2: Find the fraction of the circle. The central angle is $80°$, and $\\frac{80}{360}=\\frac{2}{9}$.\n\nStep 3: Multiply. Arc $AB=\\frac{2}{9}(54\\pi)=12\\pi$ inches.\n\nCheck: nine such arcs would total $108\\pi$, which is twice the circumference — consistent, since $9(80°)=720°$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($6\\pi$): uses $\\pi r$ instead of $2\\pi r$ for the circumference, halving the arc.\n* Choice C ($54\\pi$): gives the whole circumference instead of the $80°$ portion of it.\n* Choice D ($162\\pi$): computes the sector's area, $\\frac{2}{9}\\pi(27)^{2}$, rather than its arc length.\n\n**Test Day Takeaway:** Arc length is a fraction of the circumference; sector area is that same fraction of the area — check which one the units call for.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "arc-sector-computation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-023",
    domain: "geometry",
    skills: ["sector-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A circular garden bed with a radius of $12$ feet is divided into $6$ congruent sectors by paths that meet at the center. What is the area, in square feet, of one sector?",
    choices: [
      // distractor: divides the circumference by 6, which gives an arc length
      { id: "A", text: "$4\\pi$" },
      { id: "B", text: "$24\\pi$" },
      // distractor: uses the diameter as the radius
      { id: "C", text: "$96\\pi$" },
      // distractor: reports the area of the entire circle
      { id: "D", text: "$144\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sector Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The whole bed has area $\\pi(12)^2 = 144\\pi$, and one of six congruent sectors is $\\frac{144\\pi}{6} = 24\\pi$ square feet.\n\n**The Full Solution:**\nStep 1: The area of the full circle is $A = \\pi r^2 = \\pi(12)^2 = 144\\pi$ square feet.\nStep 2: Six congruent sectors each take an equal share, so each covers $\\frac{1}{6}$ of the circle. (Each central angle measures $\\frac{360}{6} = 60°$.)\nStep 3: One sector has area $\\frac{1}{6}(144\\pi) = 24\\pi$ square feet.\n\nVerification: $6(24\\pi) = 144\\pi$, the full area. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4\\pi$): divides the circumference $24\\pi$ by $6$, which gives the curved edge of a sector, not its area.\n* Choice C ($96\\pi$): uses the diameter $24$ as the radius, computing $\\frac{576\\pi}{6}$.\n* Choice D ($144\\pi$): reports the area of the entire bed and never divides by $6$.\n\n**Test Day Takeaway:** Congruent sectors split both the area and the $360°$ of central angle equally. Find the whole first, then take your share.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "real-world-sector",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-024",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "A tower crane's ground exclusion zone is modeled in the $xy$-plane, in meters, by $(x - 7)^2 + (y + 4)^2 = 9k$, and the zone has a radius of $12$ meters. What is the value of $k$?",
    correctAnswer: "16",
    explanation: "**SAT Pattern: Read Radius from Circle Equation**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~25s):** The right side equals $r^2$, so $9k = 12^2 = 144$ and $k = 16$.\n\n**The Full Solution:**\n\nStep 1: In the standard form $(x - h)^2 + (y - v)^2 = r^2$, the number on the right is the SQUARE of the radius.\n\nStep 2: The radius is $12$ meters, so $9k = 12^2 = 144$.\n\nStep 3: Divide: $k = \\frac{144}{9} = 16$. Check: with $k = 16$ the equation reads $(x-7)^2 + (y+4)^2 = 144$, whose radius is $\\sqrt{144} = 12$.\n\n**Common Mistakes:**\n\n* $144$ — stopping at $r^2$ and never dividing by the coefficient $9$.\n* $1.33$ — dividing the radius itself by $9$ instead of the squared radius.\n* $4$ — treating $9k$ as $(3\\sqrt{k})^2$, solving $3\\sqrt{k} = 12$, and reporting $\\sqrt{k}$ instead of $k$.\n\n**Test Day Takeaway:** The right-hand side of a circle equation is $r^2$, not $r$ — square the radius before you solve for anything multiplying it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "extract-from-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-025",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An aluminum channel is extruded $45$ centimeters long with a uniform cross section, and that cross section is a right triangle whose legs measure $6$ centimeters and $8$ centimeters. How many cubic centimeters of aluminum does one channel contain?",
    choices: [
      // distractor: halves the product a second time, once for the triangle and once again for the prism
      { id: "A", text: "$540$" },
      { id: "B", text: "$1{,}080$" },
      // distractor: uses the hypotenuse 10 in place of the leg 6: (1/2)(8)(10)(45) = 1800
      { id: "C", text: "$1{,}800$" },
      // distractor: multiplies the two legs by the length without halving: 6*8*45 = 2160
      { id: "D", text: "$2{,}160$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangular Prism Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The cross section has area $\\frac{1}{2}(6)(8) = 24$, so the volume is $24(45) = 1{,}080$.\n\n**The Full Solution:**\nStep 1: The legs of a right triangle are perpendicular, so the cross-sectional area is $\\frac{1}{2}(6)(8) = 24$ square centimeters.\nStep 2: A prism's volume is the area of its cross section times its length: $V = 24(45)$.\nStep 3: $24(45) = 1{,}080$ cubic centimeters.\n\nCheck: A rectangular bar with a $6$ by $8$ cross section and the same length would hold $2{,}160$ cubic centimeters, exactly twice as much. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($540$): halves the product twice, once for the triangle and once more out of habit.\n* Choice C ($1{,}800$): uses the hypotenuse $10$ instead of the leg $6$, giving $\\frac{1}{2}(8)(10)(45)$.\n* Choice D ($2{,}160$): multiplies both legs by the length without ever applying the factor $\\frac{1}{2}$.\n\n**Test Day Takeaway:** For any prism, find the cross-sectional area first, then multiply by the length exactly once.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "composite-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-026",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A pattern maker drafts a triangular gore for a skirt panel, and its three angle measures, in degrees, are $x$, $3x$, and $x-20$. What is the value of $x$?",
    choices: [
      // distractor: uses 90 for the angle sum: 5x - 20 = 90 gives x = 22
      { id: "A", text: "$22$" },
      // distractor: adds 20 instead of subtracting it: 5x + 20 = 180 gives x = 32
      { id: "B", text: "$32$" },
      // distractor: drops the -20 entirely: 5x = 180 gives x = 36
      { id: "C", text: "$36$" },
      { id: "D", text: "$40$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Translate to Equation**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The three angles sum to $180$, so $x+3x+(x-20)=180$, giving $5x=200$ and $x=40$.\n\n**The Full Solution:**\n\nStep 1 — The angle measures of any triangle add to $180$ degrees, so $x+3x+(x-20)=180$.\n\nStep 2 — Combine like terms: $5x-20=180$.\n\nStep 3 — Add $20$ and divide: $5x=200$, so $x=40$. Check: the angles are $40$, $120$, and $20$ degrees, and $40+120+20=180$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($22$): this sets the sum to $90$ instead of $180$.\n* Choice B ($32$): this moves the $-20$ to the left as $+20$, solving $5x+20=180$.\n* Choice C ($36$): this drops the $-20$ entirely and solves $5x=180$.\n\n**Test Day Takeaway:** Translate every phrase into one equation, combine like terms, and let the constant move once — the arithmetic is where these are lost.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "equation-from-geometry",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-027",
    domain: "geometry",
    skills: ["completing-square-circles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Mapped in meters, a brine pool's edge satisfies $x^2 + y^2 + 10x - 24y + c = 0$ for some constant $c$. Which inequality describes every value of $c$ for which this equation has a circle as its graph?",
    choices: [
      // distractor: subtracts the completed-square constants, using 144 - 25 = 119
      { id: "A", text: "$c < 119$" },
      // distractor: moves c to the wrong side, requiring 25 + 144 + c > 0
      { id: "B", text: "$c > -169$" },
      // distractor: reverses the inequality after finding the boundary value 169
      { id: "C", text: "$c > 169$" },
      { id: "D", text: "$c < 169$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Complete the Square for Circle**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** Completing the square gives $(x + 5)^2 + (y - 12)^2 = 169 - c$, and a circle needs $169 - c > 0$, so $c < 169$.\n\n**The Full Solution:**\nStep 1: Group the terms: $(x^2 + 10x) + (y^2 - 24y) = -c$.\nStep 2: Complete each square by adding $25$ and $144$ to both sides: $(x + 5)^2 + (y - 12)^2 = 169 - c$.\nStep 3: The right side plays the role of $r^2$, so the graph is a circle exactly when $169 - c > 0$, that is $c < 169$. Check: $c = 0$ gives radius $13$, while $c = 200$ would need $r^2 = -31$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($c < 119$): subtracts the two completing constants, $144 - 25$, instead of adding them.\n* Choice B ($c > -169$): moves $c$ across with the wrong sign, as if the equation ended in $-c$.\n* Choice C ($c > 169$): finds the right boundary but keeps the inequality pointing the wrong way, which forces a negative $r^2$.\n\n**Test Day Takeaway:** After completing the square the right side must be strictly positive to be a radius squared — that single condition sets the range of the constant.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complete-the-square",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-028",
    domain: "geometry",
    skills: ["special-right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A hardware shop sells the steel shelf bracket drawn below; its dimensions are marked in centimeters. How long is the sloped edge that runs from the wall anchor to the shelf tip?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [18, 0], [18, 10.392]], rightAngleVertex: 1, labels: ["30°", "", ""], sideLabels: ["18", "", ""], figureNote: true } },
    choices: [
      // distractor: reports the short leg opposite the 30 degree angle instead of the hypotenuse
      { id: "A", text: "$6\\sqrt{3}$" },
      // distractor: treats 18 as the hypotenuse, halving to 9 and multiplying by root 3
      { id: "B", text: "$9\\sqrt{3}$" },
      { id: "C", text: "$12\\sqrt{3}$" },
      // distractor: doubles 18 first and then multiplies by root 3
      { id: "D", text: "$36\\sqrt{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The $18$ cm leg is the long leg, so the short leg is $\\frac{18}{\\sqrt{3}}=6\\sqrt{3}$ and the hypotenuse is $12\\sqrt{3}$ cm.\n\n**The Full Solution:**\n\nStep 1: Identify the sides. In a $30$-$60$-$90$ triangle the sides are $x$, $x\\sqrt{3}$, $2x$, and the leg adjacent to the $30°$ angle is the long leg $x\\sqrt{3}$.\n\nStep 2: Solve for $x$. $x\\sqrt{3}=18$ gives $x=\\frac{18}{\\sqrt{3}}=6\\sqrt{3}$ cm.\n\nStep 3: The hypotenuse is $2x=12\\sqrt{3}$ cm, about $20.8$ cm.\n\nCheck: $(6\\sqrt{3})^{2}+18^{2}=108+324=432=(12\\sqrt{3})^{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($6\\sqrt{3}$): reports the short leg opposite the $30°$ angle rather than the sloped edge.\n* Choice B ($9\\sqrt{3}$): treats $18$ as the hypotenuse, halving it to $9$ and then multiplying by $\\sqrt{3}$.\n* Choice D ($36\\sqrt{3}$): doubles $18$ to $36$ and then multiplies by $\\sqrt{3}$, applying both ratios to the same side.\n\n**Test Day Takeaway:** Name each given side before using the ratio: the leg touching the $30°$ angle is the long leg, not the hypotenuse.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "special-triangle-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-029",
    domain: "geometry",
    skills: ["pythagorean-theorem", "triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "A crystallization bench's triangular back panel has two equal slanted edges of $25$ centimeters and stands $24$ centimeters tall at its midline. What is the panel's area, in square centimeters?",
    correctAnswer: "168",
    explanation: "**SAT Pattern: Isosceles Triangle Area**\n\n**The correct answer is $168$.**\n\n**The Fast Way (~35s):** The midline splits the panel into two right triangles with legs $24$ and $\\sqrt{25^2 - 24^2} = 7$, so the base is $14$ and the area is $\\frac{1}{2}(14)(24) = 168$.\n\n**The Full Solution:**\n\nStep 1: The height drawn to the base of an isosceles triangle meets the base at its midpoint, creating two congruent right triangles with hypotenuse $25$ and one leg $24$.\n\nStep 2: The other leg is $\\sqrt{625 - 576} = \\sqrt{49} = 7$, so half the base is $7$ and the full base is $14$ centimeters.\n\nStep 3: Area $= \\frac{1}{2}(\\text{base})(\\text{height}) = \\frac{1}{2}(14)(24) = 168$ square centimeters. Check: the $7$-$24$-$25$ right triangle is a valid triple, so the dimensions are consistent.\n\n**Common Mistakes:**\n\n* $300$ — using a $25$-centimeter slanted edge as the base: $\\frac{1}{2}(25)(24)$.\n* $336$ — finding the base correctly but forgetting the factor $\\frac{1}{2}$: $14 \\times 24$.\n* $84$ — using half the base, $7$, as the whole base: $\\frac{1}{2}(7)(24)$.\n\n**Test Day Takeaway:** In an isosceles triangle the height to the unequal side bisects it — the Pythagorean step gives HALF the base, so double it before computing area.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "multi-step-geometry",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-030",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In right triangle $DEF$, the right angle is at $E$. The length of $\\overline{DE}$ is $9$ and the length of $\\overline{DF}$ is $41$. What is the value of $\\cos(D)$?",
    diagram: { type: "rightTriangle", params: { labels: ["D", "E", "F"], sideLabels: ["9", "", "41"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      { id: "A", text: "$\\frac{9}{41}$" },
      // distractor: uses the other leg 40 in place of the hypotenuse
      { id: "B", text: "$\\frac{9}{40}$" },
      // distractor: gives the sine of D
      { id: "C", text: "$\\frac{40}{41}$" },
      // distractor: inverts the ratio
      { id: "D", text: "$\\frac{41}{9}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Cosine in a Right Triangle**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** Angle $D$ has adjacent leg $\\overline{DE} = 9$ and hypotenuse $\\overline{DF} = 41$, so $\\cos(D) = \\frac{9}{41}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $E$, so the hypotenuse is the side opposite $E$, namely $\\overline{DF} = 41$.\nStep 2: CAH means cosine equals the adjacent side over the hypotenuse. The leg adjacent to angle $D$ is $\\overline{DE} = 9$.\nStep 3: $\\cos(D) = \\frac{9}{41}$, already in lowest terms.\n\nVerification: the third side is $\\sqrt{41^2 - 9^2} = \\sqrt{1600} = 40$, and $\\left(\\frac{9}{41}\\right)^2 + \\left(\\frac{40}{41}\\right)^2 = \\frac{81 + 1600}{1681} = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{9}{40}$): divides the adjacent leg by the other leg $40$ instead of by the hypotenuse; that ratio is $\\frac{1}{\\tan(D)}$, not a cosine.\n* Choice C ($\\frac{40}{41}$): uses the opposite leg over the hypotenuse, which is $\\sin(D)$.\n* Choice D ($\\frac{41}{9}$): inverts the ratio; a cosine of an acute angle can never exceed $1$.\n\n**Test Day Takeaway:** Find the hypotenuse first by locating the right angle, then label the remaining legs as opposite or adjacent to the angle named in the question.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-trig-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-031",
    domain: "geometry",
    skills: ["volume-scaling"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A prototype resin casting has a volume of $96$ cubic centimeters. Each linear dimension of the production casting is $2.5$ times the corresponding dimension of the prototype. What is the volume, in cubic centimeters, of the production casting?",
    choices: [
      // distractor: scales the volume by 2.5 once, as if volume grew like a length
      { id: "A", text: "$240$" },
      // distractor: scales the volume by 2.5 squared, the factor that applies to area
      { id: "B", text: "$600$" },
      { id: "C", text: "$1{,}500$" },
      // distractor: applies the factor 2.5 a fourth time, multiplying the correct volume by 2.5 again
      { id: "D", text: "$3{,}750$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Volume Scaling by Cube of Linear Factor**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** Volume scales by the cube of the linear factor: $96(2.5)^3 = 96(15.625) = 1{,}500$.\n\n**The Full Solution:**\nStep 1: Every length is multiplied by $2.5$, so each of the three dimensions of the casting grows by that factor.\nStep 2: Volume is a product of three lengths, so it is multiplied by $(2.5)^3 = 15.625$.\nStep 3: $96 \\times 15.625 = 1{,}500$ cubic centimeters.\n\nCheck: A prototype shaped as a $4$ by $4$ by $6$ block has volume $96$; scaled it becomes $10$ by $10$ by $15$, with volume $1{,}500$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($240$): multiplies by $2.5$ once, the factor that applies to a single length.\n* Choice B ($600$): multiplies by $2.5^2 = 6.25$, the factor that applies to surface area.\n* Choice D ($3{,}750$): applies the factor a fourth time, multiplying the correct volume by $2.5$ again.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^2$, and volumes by $k^3$; count the dimensions before choosing the exponent.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "scaling-factor",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-032",
    domain: "geometry",
    skills: ["circle-area", "sector-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rotating security camera monitors a sector of a circle with a radius of $24$ meters and a central angle of $45°$. What is the area, in square meters, of the region the camera monitors?",
    choices: [
      // distractor: computes the arc length instead of the area
      { id: "A", text: "$6\\pi$" },
      { id: "B", text: "$72\\pi$" },
      // distractor: divides the central angle by 180 instead of 360
      { id: "C", text: "$144\\pi$" },
      // distractor: reports the area of the full circle
      { id: "D", text: "$576\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sector Area from Central Angle**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The sector is $\\frac{45}{360} = \\frac{1}{8}$ of a circle of area $\\pi(24)^2 = 576\\pi$, so it covers $72\\pi$ square meters.\n\n**The Full Solution:**\nStep 1: A sector's area is the same fraction of the circle's area that its central angle is of $360°$.\nStep 2: The fraction is $\\frac{45}{360} = \\frac{1}{8}$, and the full circle has area $\\pi r^2 = \\pi(24)^2 = 576\\pi$ square meters.\nStep 3: The sector covers $\\frac{1}{8}(576\\pi) = 72\\pi$ square meters.\n\nVerification: eight such sectors would tile the circle: $8(72\\pi) = 576\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6\\pi$): takes $\\frac{1}{8}$ of the circumference $48\\pi$, giving the curved edge rather than the area.\n* Choice C ($144\\pi$): divides the angle by $180$ instead of $360$, doubling the fraction of the circle.\n* Choice D ($576\\pi$): reports the area of the whole circle and never applies the fraction.\n\n**Test Day Takeaway:** Sector area is $\\frac{\\theta}{360} \\cdot \\pi r^2$. Reducing $\\frac{\\theta}{360}$ to a simple fraction first keeps the arithmetic light.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "real-world-sector",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-033",
    domain: "geometry",
    skills: ["degrees-to-radians"],
    difficulty: "medium",
    type: "fill-in",
    question: "A rotary control on a mixing console sweeps through an angle of $255$ degrees from its minimum setting to its maximum setting. The console's firmware stores that sweep as a radian measure written in the form $\\frac{k\\pi}{12}$, where $k$ is a constant. What value does the firmware store for $k$?",
    correctAnswer: "17",
    explanation: "**SAT Pattern: Degrees to Radians with Reduction**\n\n**The correct answer is $17$.**\n\n**The Fast Way (~20s):** $255 \\cdot \\frac{\\pi}{180} = \\frac{255\\pi}{180} = \\frac{17\\pi}{12}$, so $k = 17$.\n\n**The Full Solution:**\nStep 1: Convert the sweep with the factor $\\frac{\\pi}{180}$: the measure is $\\frac{255\\pi}{180}$ radians.\nStep 2: Reduce so the denominator is $12$. Both $255$ and $180$ are divisible by $15$: $\\frac{255}{15} = 17$ and $\\frac{180}{15} = 12$.\nStep 3: The stored measure is $\\frac{17\\pi}{12}$ radians, so $k = 17$. Check: $\\frac{17\\pi}{12} \\approx 4.45$ radians, and $255$ degrees sits between $\\pi \\approx 3.14$ and $\\frac{3\\pi}{2} \\approx 4.71$ ✓\n\n**Common Mistakes:**\n* $255$ — reports the degree measure without converting at all.\n* $12$ — reports the denominator of the reduced fraction instead of the numerator.\n* $85$ — reduces only by $3$, reaching $\\frac{85\\pi}{60}$, which does not have the required denominator $12$.\n\n**Test Day Takeaway:** Convert first, then reduce to exactly the denominator the question names — the numerator you report depends on that reduction.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "unit-conversion-variant",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-034",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "At a certain time of day, a street sign $4$ meters tall casts a shadow $3$ meters long, and a nearby transmission tower casts a shadow $42$ meters long. What is the height, in meters, of the tower?",
    choices: [
      // distractor: inverts the proportion
      { id: "A", text: "$31.5$" },
      // distractor: adds the one-meter difference to the tower shadow
      { id: "B", text: "$43$" },
      { id: "C", text: "$56$" },
      // distractor: multiplies without dividing by the sign shadow
      { id: "D", text: "$168$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Shadow Similar Triangles**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The sign is $\\frac{4}{3}$ as tall as its shadow, and the same ratio holds for the tower: $h = \\frac{4}{3}(42) = 56$ meters.\n\n**The Full Solution:**\nStep 1: The sun's rays strike both objects at the same angle, so the two object-and-shadow right triangles are similar.\nStep 2: Corresponding sides are proportional: $\\frac{4}{3} = \\frac{h}{42}$.\nStep 3: Cross multiply: $3h = 168$, so $h = 56$ meters.\n\nVerification: $\\frac{56}{42} = \\frac{4}{3}$, the same height-to-shadow ratio as the sign. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($31.5$): inverts the proportion, computing $\\frac{3}{4}(42)$; that would make the tower shorter than its shadow while the sign is taller than its own.\n* Choice B ($43$): adds the $1$-meter gap between the sign's height and shadow to $42$; similar triangles scale by multiplication, not by a constant difference.\n* Choice D ($168$): multiplies $4 \\cdot 42$ and never divides by $3$.\n\n**Test Day Takeaway:** Set the proportion up as height over shadow for both objects. Check the direction with a quick sanity test: if one object is taller than its shadow, so is the other.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "real-world-similar-triangles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-035",
    domain: "geometry",
    skills: ["volume-pyramid-cone"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A museum gift shop sells solid paperweights shaped like square pyramids; each has a square base covering $81$ square centimeters and stands $14$ centimeters tall. What is the volume, in cubic centimeters, of one paperweight?",
    choices: [
      { id: "A", text: "$378$" },
      // distractor: uses 1/2 in place of 1/3: (1/2)(81)(14) = 567
      { id: "B", text: "$567$" },
      // distractor: omits the 1/3 entirely: 81 x 14 = 1134
      { id: "C", text: "$1{,}134$" },
      // distractor: multiplies by 3 instead of dividing by 3: 3 x 81 x 14 = 3402
      { id: "D", text: "$3{,}402$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Square Pyramid Volume**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** $V=\\frac{1}{3}Bh=\\frac{1}{3}(81)(14)=27(14)=378$ cubic centimeters.\n\n**The Full Solution:**\n\nStep 1 — A pyramid's volume is $\\frac{1}{3}Bh$, where $B$ is the base area. Here $B=81$ square centimeters is given directly.\n\nStep 2 — Divide first: $\\frac{1}{3}(81)=27$.\n\nStep 3 — Multiply by the height: $27(14)=378$ cubic centimeters. Check: a prism on the same base and height would hold $81(14)=1{,}134$, and a pyramid holds one third of that, $378$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($567$): this uses $\\frac{1}{2}$, the factor for a triangle's area, instead of $\\frac{1}{3}$.\n* Choice C ($1{,}134$): this is the matching prism, with the $\\frac{1}{3}$ dropped.\n* Choice D ($3{,}402$): this multiplies by $3$ rather than dividing by $3$.\n\n**Test Day Takeaway:** A pyramid is one third of the prism that shares its base and height — divide, never multiply, by $3$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-036",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "On an irrigation field map, a circular sprinkler zone has a diameter with endpoints $(-1,5)$ and $(11,-3)$, and its boundary is $(x-h)^{2}+(y-k)^{2}=r^{2}$, with coordinates in meters. What is the value of $r^{2}$?",
    choices: [
      // distractor: divides the squared diameter by 16, halving the radius one extra time
      { id: "A", text: "$13$" },
      // distractor: halves r squared instead of halving the diameter before squaring
      { id: "B", text: "$26$" },
      { id: "C", text: "$52$" },
      // distractor: uses the full squared diameter 208 as r squared
      { id: "D", text: "$208$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle from Diameter Endpoints**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** The squared diameter is $12^{2}+8^{2}=208$, and $r^{2}=\\frac{208}{4}=52$.\n\n**The Full Solution:**\n\nStep 1: Find the squared diameter. The horizontal change is $11-(-1)=12$ and the vertical change is $-3-5=-8$, so $d^{2}=12^{2}+(-8)^{2}=144+64=208$.\n\nStep 2: Halve the length, not the square. $r=\\frac{d}{2}$, so $r^{2}=\\frac{d^{2}}{4}=\\frac{208}{4}=52$.\n\nStep 3: Confirm with the center. The center is the midpoint $(5,1)$, and the distance from $(5,1)$ to $(-1,5)$ satisfies $6^{2}+4^{2}=52$.\n\nCheck: $(-1-5)^{2}+(5-1)^{2}=36+16=52$, so the endpoint lies on the circle.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($13$): divides the squared diameter by $16$, halving the radius one extra time.\n* Choice B ($26$): halves $r^{2}$ itself instead of halving the diameter before squaring.\n* Choice D ($208$): uses the squared diameter as $r^{2}$, skipping the halving entirely.\n\n**Test Day Takeaway:** Halving happens to the length, so the square gets divided by $4$ — never by $2$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "multi-step-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-037",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A circular reflecting pool has center $O$ and radius $r$ meters, and a straight boardwalk from a viewing post $P$ touches the pool at exactly one point $T$, with $OP=3r$ meters. The length of $\\overline{PT}$ is $kr$ meters. What is the value of $k$?",
    choices: [
      { id: "A", text: "$2\\sqrt{2}$" },
      // distractor: reports OP = 3r instead of the tangent length PT
      { id: "B", text: "$3$" },
      // distractor: adds the squares instead of subtracting: sqrt(9 + 1) = sqrt(10)
      { id: "C", text: "$\\sqrt{10}$" },
      // distractor: adds the radius to OP, treating the distances as collinear lengths
      { id: "D", text: "$4$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Tangent from External Point**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** A tangent meets the radius at a right angle, so $PT=\\sqrt{(3r)^2-r^2}=\\sqrt{8r^2}=2\\sqrt{2}\\,r$ and $k=2\\sqrt{2}$.\n\n**The Full Solution:**\n\nStep 1 — Because the boardwalk meets the pool at exactly one point, $\\overline{PT}$ is tangent to the circle, so $\\overline{OT}\\perp\\overline{PT}$ and triangle $OTP$ has a right angle at $T$.\n\nStep 2 — Apply the Pythagorean theorem with hypotenuse $OP=3r$ and leg $OT=r$: $PT^2=(3r)^2-r^2=9r^2-r^2=8r^2$.\n\nStep 3 — Take the positive root: $PT=\\sqrt{8r^2}=2\\sqrt{2}\\,r$, so $k=2\\sqrt{2}$. Check: $2\\sqrt{2}\\approx 2.83$, less than $3$, as a leg must be shorter than the hypotenuse.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($3$): this reports $OP$ itself, the distance to the center rather than to the point of tangency.\n* Choice C ($\\sqrt{10}$): this adds the squares, $9r^2+r^2$, treating $OP$ as a leg instead of the hypotenuse.\n* Choice D ($4$): this adds the radius to $OP$ as though the three points were collinear.\n\n**Test Day Takeaway:** The radius to the point of tangency is perpendicular to the tangent line, and the distance to the center is always the hypotenuse.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "tangent-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-038",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "fill-in",
    question: "A circular saw blade has a radius of $20$ centimeters. A point on the edge of the blade sweeps through a central angle of $\\frac{3\\pi}{8}$ radians. The distance that point travels is $k\\pi$ centimeters. What is the value of $k$?",
    correctAnswer: "7.5",
    explanation: "**SAT Pattern: Arc Length in Radians**\n\n**The correct answer is $7.5$.**\n\n**The Fast Way (~20s):** $s = r\\theta = 20 \\cdot \\frac{3\\pi}{8} = \\frac{60\\pi}{8} = 7.5\\pi$, so $k = 7.5$.\n\n**The Full Solution:**\nStep 1: When the central angle is measured in radians, arc length is $s = r\\theta$. No degree conversion is needed.\nStep 2: Substitute $r = 20$ and $\\theta = \\frac{3\\pi}{8}$: $s = 20 \\cdot \\frac{3\\pi}{8} = \\frac{60\\pi}{8}$.\nStep 3: $\\frac{60}{8} = 7.5$, so $s = 7.5\\pi$ centimeters and $k = 7.5$.\n\nVerification: the full circumference is $2\\pi(20) = 40\\pi$, and $\\frac{3\\pi/8}{2\\pi} = \\frac{3}{16}$ of it is $\\frac{3}{16}(40\\pi) = 7.5\\pi$. $\\checkmark$\n\n**Common Mistakes:** Using the sector-area formula $\\frac{1}{2}r^2\\theta$ gives $\\frac{1}{2}(400)\\left(\\frac{3}{8}\\right) = 75$, ten times too large and in square centimeters. Converting the angle to $67.5$ degrees first and then multiplying by the radius gives $1{,}350$, because the degree measure is not a valid multiplier in $s = r\\theta$.\n\n**Test Day Takeaway:** $s = r\\theta$ works only in radians, and it is the reason radian measure exists. If the angle arrives in degrees, convert before multiplying.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "radian-arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-039",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The four edges of a wall-mount network enclosure's rectangular door total $206$ centimeters, and its longer edge is $55$ centimeters. How long, in centimeters, is the door's diagonal?",
    choices: [
      // distractor: subtracts the two side lengths, 55 - 48, instead of combining their squares
      { id: "A", text: "$7$" },
      // distractor: reports the shorter edge and stops before the diagonal
      { id: "B", text: "$48$" },
      { id: "C", text: "$73$" },
      // distractor: adds the two side lengths, 55 + 48, instead of using the Pythagorean theorem
      { id: "D", text: "$103$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rectangle Diagonal**\n\n**Choice C is correct.** The shorter edge is $\\frac{206 - 2(55)}{2} = 48$, so the diagonal is $\\sqrt{55^2 + 48^2} = \\sqrt{5329} = 73$ centimeters.\n\n**The Fast Way (~35s):** Half the perimeter is $103$, so the shorter edge is $103 - 55 = 48$; then $48$-$55$-$73$ gives the diagonal.\n\n**The Full Solution:**\n\nStep 1: A rectangle's perimeter is $2(\\ell + w)$, so $\\ell + w = \\frac{206}{2} = 103$ centimeters.\n\nStep 2: With $\\ell = 55$, the shorter edge is $w = 103 - 55 = 48$ centimeters.\n\nStep 3: The diagonal splits the rectangle into right triangles, so it measures $\\sqrt{55^2 + 48^2} = \\sqrt{3025 + 2304} = \\sqrt{5329} = 73$ centimeters. Check: $73^2 = 5329$, and $2(55 + 48) = 206$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($7$): subtracts the side lengths rather than combining their squares.\n* Choice B ($48$): finds the missing edge and stops there.\n* Choice D ($103$): adds the two edges, which is half the perimeter, not the diagonal.\n\n**Test Day Takeaway:** Halve the perimeter first — $\\ell + w$ is one subtraction away from the missing side, and only then does the Pythagorean step apply.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "real-world-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-040",
    domain: "geometry",
    skills: ["volume-sphere"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A spherical steel bearing has a diameter of $2.4$ centimeters. Which of the following is closest to the volume, in cubic centimeters, of the bearing?",
    choices: [
      // distractor: squares the radius instead of cubing it
      { id: "A", text: "$6.0$" },
      { id: "B", text: "$7.2$" },
      // distractor: computes the surface area
      { id: "C", text: "$18.1$" },
      // distractor: uses the diameter as the radius
      { id: "D", text: "$57.9$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sphere Volume Approximation**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The radius is $1.2$, so $V = \\frac{4}{3}\\pi(1.2)^3 = \\frac{4}{3}\\pi(1.728) \\approx 7.2$ cubic centimeters.\n\n**The Full Solution:**\nStep 1: Convert the diameter to a radius: $r = \\frac{2.4}{2} = 1.2$ centimeters.\nStep 2: Cube the radius: $1.2^3 = 1.728$.\nStep 3: $V = \\frac{4}{3}\\pi(1.728) = 2.304\\pi \\approx 7.24$, so about $7.2$ cubic centimeters.\n\nVerification: the bearing sits inside a cube of edge $2.4$, whose volume is $13.824$; a sphere fills about $52\\%$ of its bounding cube, and $\\frac{7.24}{13.824} \\approx 0.52$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6.0$): squares the radius instead of cubing it, computing $\\frac{4}{3}\\pi(1.44)$.\n* Choice C ($18.1$): computes the surface area $4\\pi r^2 = 4\\pi(1.44)$, a square-unit quantity.\n* Choice D ($57.9$): uses the diameter $2.4$ as the radius, inflating the volume by a factor of $8$.\n\n**Test Day Takeaway:** Halve the diameter before any sphere calculation. Because the radius is cubed, forgetting to halve multiplies the answer by $8$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "real-world-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-041",
    domain: "geometry",
    skills: ["triangle-types", "pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A triangular zoning parcel has the side lengths, in meters, shown in the figure. Which statement about the parcel's largest angle is true?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [21, 0], [13.167, 9.091]], sideLabels: ["21", "12", "16"], showRightAngle: false, rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: computes 144 + 256 = 400 but compares it as larger than 441
      { id: "A", text: "$12^2 + 16^2 > 21^2$, so the largest angle is acute." },
      // distractor: assumes the parcel must be a right triangle
      { id: "B", text: "$12^2 + 16^2 = 21^2$, so the largest angle is a right angle." },
      { id: "C", text: "$12^2 + 16^2 < 21^2$, so the largest angle is obtuse." },
      // distractor: tests the shortest and longest sides against the middle side, comparing 12 squared + 21 squared with 16 squared
      { id: "D", text: "$12^2 + 21^2 > 16^2$, so the largest angle is acute." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Classify Triangle by Pythagorean Test**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Compare the squares of the two shorter sides with the square of the longest: $144 + 256 = 400 < 441$, so the largest angle is obtuse.\n\n**The Full Solution:**\nStep 1: The largest angle lies opposite the longest side, $21$ meters.\nStep 2: The Pythagorean test compares $a^2 + b^2$ with $c^2$ for the two shorter sides $a, b$ and the longest side $c$: $12^2 + 16^2 = 144 + 256 = 400$ and $21^2 = 441$.\nStep 3: Since $400 < 441$, the angle opposite the $21$-meter side is obtuse. Check: $12 + 16 = 28 > 21$, so these three lengths do form a triangle ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: gets $400$ and $441$ but reverses the comparison, which would make the angle acute.\n* Choice B: assumes a right triangle; that would require $400 = 441$.\n* Choice D: squares $12$ and $21$, the shortest and the longest side, against the middle one — the test must put the two SHORTEST sides against the longest.\n\n**Test Day Takeaway:** $a^2 + b^2$ versus $c^2$ classifies the angle opposite $c$: greater means acute, equal means right, less means obtuse.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "classification-via-computation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-042",
    domain: "geometry",
    skills: ["radian-measure-understanding"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A goniometer stage on an X-ray diffractometer records the orientation of a sample as a positive number $d$ of degrees, but the control software that drives the stage's motor accepts only radian measures. Which expression gives the measure, in radians, of a rotation the stage records as $d$ degrees?",
    choices: [
      // distractor: uses the reciprocal factor 180 over pi, which converts radians into degrees
      { id: "A", text: "$\\frac{180d}{\\pi}$" },
      // distractor: divides by 180 pi instead of multiplying by pi over 180
      { id: "B", text: "$\\frac{d}{180\\pi}$" },
      // distractor: multiplies by 180 pi, scaling the measure up by a factor of about 565 instead of down
      { id: "C", text: "$180\\pi d$" },
      { id: "D", text: "$\\frac{\\pi d}{180}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Radian-Degree Conversion Factor**\n\n**Choice D is correct.** Since $180^\\circ = \\pi$ radians, each degree is $\\frac{\\pi}{180}$ radians, so $d$ degrees is $\\frac{\\pi d}{180}$ radians.\n\n**The Fast Way (~20s):** Multiply degrees by $\\frac{\\pi}{180}$: the answer is $\\frac{\\pi d}{180}$.\n\n**The Full Solution:**\n\nStep 1: A straight angle measures $180^\\circ$ and also $\\pi$ radians, so $\\frac{\\pi \\text{ radians}}{180 \\text{ degrees}} = 1$.\n\nStep 2: Multiplying $d$ degrees by that conversion factor cancels degrees: $d \\cdot \\frac{\\pi}{180} = \\frac{\\pi d}{180}$ radians.\n\nStep 3: Check with a value you know: $d = 90$ gives $\\frac{90\\pi}{180} = \\frac{\\pi}{2}$ radians, the correct measure of a right angle.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{180d}{\\pi}$): the reciprocal factor, which converts radians into degrees instead.\n* Choice B ($\\frac{d}{180\\pi}$): divides by $180\\pi$ rather than multiplying by $\\frac{\\pi}{180}$; testing $d = 90$ gives about $0.159$, far too small.\n* Choice C ($180\\pi d$): multiplies by $180\\pi$, scaling the measure up instead of down.\n\n**Test Day Takeaway:** Build the factor from $180^\\circ = \\pi$ radians and put the unit you want on top — degrees to radians means $\\frac{\\pi}{180}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "conceptual-understanding",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-043",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A circular water tank of radius $r$ feet stands at the center of a circular concrete collar of radius $r+3$ feet, and the exposed collar covers $57\\pi$ square feet. What is the value of $r$?",
    choices: [
      // distractor: subtracts the 3-foot collar width from the correct radius, giving 8 - 3 = 5
      { id: "A", text: "$5$" },
      { id: "B", text: "$8$" },
      // distractor: reports the outer radius r + 3 = 11 instead of r
      { id: "C", text: "$11$" },
      // distractor: sets 3r = 57, treating the ring's area as 3 pi r
      { id: "D", text: "$19$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Annulus (Ring) Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The ring's area is $\\pi[(r+3)^{2}-r^{2}]=\\pi(6r+9)$, so $6r+9=57$ and $r=8$.\n\n**The Full Solution:**\n\nStep 1: Subtract areas. The exposed collar is the outer circle minus the tank: $\\pi(r+3)^{2}-\\pi r^{2}$.\n\nStep 2: Expand. $(r+3)^{2}-r^{2}=r^{2}+6r+9-r^{2}=6r+9$, so the collar covers $\\pi(6r+9)$ square feet.\n\nStep 3: Solve. $6r+9=57$ gives $6r=48$ and $r=8$ feet.\n\nCheck: the outer radius is $11$, and $\\pi(121)-\\pi(64)=57\\pi$ square feet.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($5$): solves correctly and then subtracts the $3$-foot collar width, reporting $8-3$.\n* Choice C ($11$): reports the outer radius $r+3$ rather than the tank's radius.\n* Choice D ($19$): sets $3r=57$, treating the ring's area as $3\\pi r$ instead of subtracting squares.\n\n**Test Day Takeaway:** A ring's area is the difference of two circle areas; expanding $(r+w)^{2}-r^{2}$ collapses it to a linear expression in $r$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "annulus-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-044",
    domain: "geometry",
    skills: ["triangle-inequality"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Two cable stays on a mast measure $26$ meters and $41$ meters, and together with a segment of the deck they form a triangle. Which of the following could be the length, in meters, of that deck segment?",
    choices: [
      // distractor: falls below the lower bound 41 - 26 = 15
      { id: "A", text: "$12$" },
      // distractor: equals the difference 41 - 26 exactly, which gives a flat degenerate triangle
      { id: "B", text: "$15$" },
      { id: "C", text: "$40$" },
      // distractor: exceeds the upper bound 41 + 26 = 67
      { id: "D", text: "$70$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Triangle Inequality Range**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The third side must lie strictly between $41 - 26 = 15$ and $41 + 26 = 67$, and only $40$ does.\n\n**The Full Solution:**\nStep 1: Let $x$ be the deck segment. The triangle inequality requires $26 + x > 41$, so $x > 15$.\nStep 2: It also requires $26 + 41 > x$, so $x < 67$.\nStep 3: The deck segment must satisfy $15 < x < 67$, and among the choices only $40$ lies in that interval.\n\nCheck: With $x = 40$, the three sums $26 + 40 = 66 > 41$, $26 + 41 = 67 > 40$, and $40 + 41 = 81 > 26$ all hold. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): sits below the lower bound of $15$, so the two stays cannot reach across it.\n* Choice B ($15$): equals the difference $41 - 26$ exactly, which forces the three sides to lie flat.\n* Choice D ($70$): exceeds the upper bound of $67$, so the two stays are too short to close the frame.\n\n**Test Day Takeaway:** The third side of a triangle always lies strictly between the difference and the sum of the other two.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "constraint-check",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-045",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "fill-in",
    question: "Drillers cut a glacier ice core in the shape of a cylinder whose height is five times its radius. The core's volume measures $320\\pi$ cubic centimeters. How many centimeters long is the core's radius?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~30s):** With $h = 5r$ the volume is $\\pi r^2(5r) = 5\\pi r^3$, so $5r^3 = 320$, $r^3 = 64$, and $r = 4$.\n\n**The Full Solution:**\nStep 1: Write the height in terms of the radius: $h = 5r$ centimeters.\nStep 2: Substitute into $V = \\pi r^2 h$: $\\pi r^2 (5r) = 5\\pi r^3 = 320\\pi$.\nStep 3: Divide by $5\\pi$ to get $r^3 = 64$, so $r = 4$ centimeters. Check: $h = 20$ and $\\pi(16)(20) = 320\\pi$ ✓\n\n**Common Mistakes:**\n* $64$ — stops at $r^3$ without taking the cube root.\n* $8$ — treats the equation as $5r^2 = 320$, losing one factor of $r$ from $r^2 \\cdot r$.\n* $20$ — reports the height $5r$ instead of the radius.\n\n**Test Day Takeaway:** When the height is a multiple of the radius, $\\pi r^2 h$ collapses to a cube — solve for $r^3$, then take the cube root.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "direct-formula",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // ── HARD (15 questions) ────────────────────────────────────────────

  {
    id: "bank-geo-046",
    domain: "geometry",
    skills: ["completing-square-circles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A furniture retailer's floor plan represents a circular display zone by $x^{2}+y^{2}-14x+8y+16=0$, with coordinates in feet. What is the area, in square feet, of the display zone?",
    choices: [
      // distractor: gives the circumference 2 pi r = 14 pi instead of the area
      { id: "A", text: "$14\\pi$" },
      { id: "B", text: "$49\\pi$" },
      // distractor: forgets to subtract the constant 16, using r squared = 49 + 16 = 65
      { id: "C", text: "$65\\pi$" },
      // distractor: uses the diameter 14 as the radius, giving pi (14 squared) = 196 pi
      { id: "D", text: "$196\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle Equation to Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~55s):** Completing the square gives $(x-7)^{2}+(y+4)^{2}=49$, so $r=7$ and the area is $49\\pi$.\n\n**The Full Solution:**\n\nStep 1: Group and complete the square. $x^{2}-14x$ needs $49$, and $y^{2}+8y$ needs $16$.\n\nStep 2: Balance the equation. $(x-7)^{2}+(y+4)^{2}=-16+49+16=49$.\n\nStep 3: Read the radius and compute. $r^{2}=49$, so $r=7$ feet and the area is $\\pi r^{2}=49\\pi$ square feet.\n\nCheck: expanding $(x-7)^{2}+(y+4)^{2}=49$ returns $x^{2}+y^{2}-14x+8y+16=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($14\\pi$): gives the circumference $2\\pi r$ rather than the area.\n* Choice C ($65\\pi$): forgets to move the constant $16$ across, using $r^{2}=49+16$.\n* Choice D ($196\\pi$): treats the diameter $14$ as the radius.\n\n**Test Day Takeaway:** Complete the square on both variables, then move every constant to the right — the leftover number is $r^{2}$, not the area.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complete-square-then-compute",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-047",
    domain: "geometry",
    skills: ["soh-cah-toa", "pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A loading ramp makes an angle $\\theta$ with the level ground, where $\\sin(\\theta) = \\dfrac{3}{5}$. The ramp covers a horizontal distance of $36$ feet. What is the vertical rise, in feet, of the ramp?",
    diagram: { type: "rightTriangle", params: { labels: ["θ", "", ""], sideLabels: ["36", "", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: multiplies the horizontal distance by sine
      { id: "A", text: "$21.6$" },
      { id: "B", text: "$27$" },
      // distractor: multiplies the horizontal distance by cosine
      { id: "C", text: "$28.8$" },
      // distractor: computes the ramp length instead of the rise
      { id: "D", text: "$45$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Recover Tangent from Sine (3-4-5 Triple)**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $\\sin(\\theta) = \\frac{3}{5}$ is the $3$-$4$-$5$ triangle, so $\\tan(\\theta) = \\frac{3}{4}$ and the rise is $36 \\cdot \\frac{3}{4} = 27$ feet.\n\n**The Full Solution:**\nStep 1: $\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{3}{5}$. The missing leg satisfies $a^2 + 3^2 = 5^2$, so $a = 4$: the $3$-$4$-$5$ triangle.\nStep 2: The horizontal distance is the adjacent leg, so the ratio that connects it to the rise is $\\tan(\\theta) = \\frac{3}{4}$.\nStep 3: rise $= 36 \\cdot \\tan(\\theta) = 36 \\cdot \\frac{3}{4} = 27$ feet.\n\nVerification: with legs $36$ and $27$, the ramp itself is $\\sqrt{36^2 + 27^2} = \\sqrt{1296 + 729} = \\sqrt{2025} = 45$, and $\\frac{27}{45} = \\frac{3}{5} = \\sin(\\theta)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($21.6$): multiplies the horizontal distance by $\\sin(\\theta) = \\frac{3}{5}$; sine pairs the rise with the ramp length, not with the horizontal run.\n* Choice C ($28.8$): multiplies by $\\cos(\\theta) = \\frac{4}{5}$, which relates the run to the ramp length.\n* Choice D ($45$): gives the length of the ramp itself, $36 \\cdot \\frac{5}{4}$, rather than its vertical rise.\n\n**Test Day Takeaway:** When a problem gives one ratio and asks about the other two sides, rebuild the whole triangle from the triple first. Horizontal run plus vertical rise always means tangent.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "double-angle-elevation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-048",
    domain: "geometry",
    skills: ["similar-triangles", "triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A fabric shop hangs the two similar triangular bunting flags drawn below, with corresponding edges marked in inches. The smaller flag covers $16$ square inches. How many square inches does the larger flag cover?",
    diagram: { type: "similarTriangles", params: { triangle1: { labels: ["P", "Q", "R"], sideLabels: ["10", "", ""] }, triangle2: { labels: ["S", "T", "U"], sideLabels: ["25", "", ""] }, figureNote: true } },
    choices: [
      // distractor: scales the area by the side ratio 5/2 instead of its square
      { id: "A", text: "$40$" },
      { id: "B", text: "$100$" },
      // distractor: cubes the side ratio, giving 16 times 125/8 = 250
      { id: "C", text: "$250$" },
      // distractor: multiplies the small area by 25, the larger side length itself
      { id: "D", text: "$400$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Area Scaling by Square of Linear Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The side ratio is $\\frac{25}{10}=\\frac{5}{2}$, so areas scale by $\\left(\\frac{5}{2}\\right)^{2}=\\frac{25}{4}$, and $16\\cdot\\frac{25}{4}=100$.\n\n**The Full Solution:**\n\nStep 1: Find the linear ratio. Corresponding edges measure $10$ and $25$ inches, so the scale factor from small to large is $\\frac{25}{10}=\\frac{5}{2}$.\n\nStep 2: Square it for area. Similar figures have areas in the ratio of the square of the scale factor, $\\left(\\frac{5}{2}\\right)^{2}=\\frac{25}{4}$.\n\nStep 3: Scale the area. $16\\cdot\\frac{25}{4}=100$ square inches.\n\nCheck: $\\frac{100}{16}=6.25$, and $\\left(\\frac{5}{2}\\right)^{2}=6.25$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($40$): scales the area by the side ratio $\\frac{5}{2}$ instead of by its square.\n* Choice C ($250$): cubes the ratio, which is how volumes scale, not areas.\n* Choice D ($400$): multiplies the small area by $25$, the larger edge length itself.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^{2}$, volumes by $k^{3}$ — pick the exponent from the units being asked for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-scaling",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-049",
    domain: "geometry",
    skills: ["volume-scaling"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Two similar right circular cones have base radii in the ratio $3$ to $5$. The volume of the smaller cone is $54$ cubic centimeters. What is the volume, in cubic centimeters, of the larger cone?",
    choices: [
      // distractor: scales by the linear ratio
      { id: "A", text: "$90$" },
      // distractor: scales by the square of the ratio
      { id: "B", text: "$150$" },
      { id: "C", text: "$250$" },
      // distractor: multiplies by 5 and ignores the 3
      { id: "D", text: "$270$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Volume Scaling by Cube of Linear Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Volumes scale by the cube of the linear ratio: $54 \\cdot \\left(\\frac{5}{3}\\right)^3 = 54 \\cdot \\frac{125}{27} = 250$ cubic centimeters.\n\n**The Full Solution:**\nStep 1: The cones are similar, so every corresponding length is in the ratio $\\frac{5}{3}$ from smaller to larger.\nStep 2: Volume is a three-dimensional measure, so the volume ratio is $\\left(\\frac{5}{3}\\right)^3 = \\frac{125}{27}$.\nStep 3: $54 \\cdot \\frac{125}{27} = 2 \\cdot 125 = 250$ cubic centimeters.\n\nVerification: $\\frac{250}{54} = \\frac{125}{27}$, which is exactly $\\left(\\frac{5}{3}\\right)^3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($90$): scales by $\\frac{5}{3}$ once, the factor for a single length.\n* Choice B ($150$): scales by $\\frac{25}{9}$, the factor that governs surface areas.\n* Choice D ($270$): multiplies by $5$ and never divides by $3$, misreading the ratio as a whole-number factor.\n\n**Test Day Takeaway:** A ratio of any corresponding lengths, radii, heights, or slant heights, is the same $k$. Cube it for volume and square it for surface area.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "volume-scaling-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-050",
    domain: "geometry",
    skills: ["circle-equation", "tangent-lines"],
    difficulty: "hard",
    type: "fill-in",
    question: "A circular ferry-boarding pontoon is centered at $(3,-1)$ in the $xy$-plane, with coordinates in meters, and a straight gangway is tangent to the pontoon at $(7,2)$. The gangway lies on the line $y=mx+b$. What is the value of $m$?",
    correctAnswer: "-4/3",
    explanation: "**SAT Pattern: Tangent Slope from Perpendicular Radius**\n\n**The correct answer is $-4/3$.**\n\n**The Fast Way (~35s):** The radius to $(7,2)$ has slope $\\frac{2-(-1)}{7-3}=\\frac{3}{4}$, and the tangent is perpendicular to it, so $m=-\\frac{4}{3}$.\n\n**The Full Solution:**\n\nStep 1 — Find the slope of the radius from the center $(3,-1)$ to the point of tangency $(7,2)$: $\\frac{2-(-1)}{7-3}=\\frac{3}{4}$.\n\nStep 2 — A tangent line is perpendicular to the radius drawn to the point of tangency, so its slope is the negative reciprocal of $\\frac{3}{4}$.\n\nStep 3 — Therefore $m=-\\frac{4}{3}$. Check: the product of the two slopes is $\\frac{3}{4}\\left(-\\frac{4}{3}\\right)=-1$, confirming perpendicularity.\n\n**Common Mistakes:** Answering $3/4$ reports the radius's slope instead of the tangent's. Answering $4/3$ takes the reciprocal but drops the negative sign. Answering $-3/4$ negates without reciprocating.\n\n**Test Day Takeaway:** Tangent slope equals the negative reciprocal of the radius slope — flip the fraction and change the sign, both steps every time.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "tangent-slope-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-051",
    domain: "geometry",
    skills: ["special-right-triangles", "soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A regular hexagonal glovebox port cover measures $24$ centimeters from one corner to the opposite corner. What is the cover's area, in square centimeters?",
    choices: [
      // distractor: gives the area of a single equilateral triangle of side 12 and stops
      { id: "A", text: "$36\\sqrt{3}$" },
      // distractor: counts only three of the six equilateral triangles
      { id: "B", text: "$108\\sqrt{3}$" },
      { id: "C", text: "$216\\sqrt{3}$" },
      // distractor: uses one half s squared times root 3 for each triangle, doubling every triangle's area
      { id: "D", text: "$432\\sqrt{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Regular Hexagon Area via Equilateral Triangles**\n\n**Choice C is correct.** The long diagonal is twice a side, so $s = 12$, and the area is $6 \\cdot \\frac{\\sqrt{3}}{4}(12)^2 = 216\\sqrt{3}$ square centimeters.\n\n**The Fast Way (~40s):** $s = \\frac{24}{2} = 12$; each of the six equilateral triangles has area $\\frac{\\sqrt{3}}{4}(144) = 36\\sqrt{3}$, so the total is $216\\sqrt{3}$.\n\n**The Full Solution:**\n\nStep 1: A regular hexagon's longest diagonal passes through the center and equals two side lengths, so $2s = 24$ and $s = 12$ centimeters.\n\nStep 2: Segments from the center to the six vertices cut the hexagon into six equilateral triangles of side $12$; each has area $\\frac{\\sqrt{3}}{4}s^2 = \\frac{\\sqrt{3}}{4}(144) = 36\\sqrt{3}$.\n\nStep 3: Six of them give $6(36\\sqrt{3}) = 216\\sqrt{3}$ square centimeters. Check with the direct formula: $\\frac{3\\sqrt{3}}{2}s^2 = \\frac{3\\sqrt{3}}{2}(144) = 216\\sqrt{3} \\approx 374.1$ square centimeters.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($36\\sqrt{3}$): the area of one equilateral triangle, not the whole cover.\n* Choice B ($108\\sqrt{3}$): counts three triangles, covering only half the hexagon.\n* Choice D ($432\\sqrt{3}$): uses $\\frac{\\sqrt{3}}{2}s^2$ per triangle, doubling each piece.\n\n**Test Day Takeaway:** In a regular hexagon the center-to-vertex distance equals the side, so the long diagonal is $2s$ — that single fact unlocks the six-triangle decomposition.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "composite-geometry",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-052",
    domain: "geometry",
    skills: ["sector-area", "arc-length"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A harbor tour operator paints a wedge-shaped landing zone on a pier as a sector of a circle centered at the mooring post. The curved edge of the zone measures $24$ meters, and the complete boundary of the zone measures $64$ meters. What is the area, in square meters, of the landing zone?",
    choices: [
      // distractor: halves the whole boundary before subtracting the arc, getting r = 8, then (1/2)(24)(8) = 96
      { id: "A", text: "$96$" },
      { id: "B", text: "$240$" },
      // distractor: finds r = 20 but drops the factor 1/2 from A = (1/2)sr, giving 24 x 20 = 480
      { id: "C", text: "$480$" },
      // distractor: uses the whole boundary 64 as the arc length: (1/2)(64)(20) = 640
      { id: "D", text: "$640$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sector Area from Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The boundary is two radii plus the arc, so $2r=64-24=40$ and $r=20$. Then $A=\\frac{1}{2}sr=\\frac{1}{2}(24)(20)=240$ square meters.\n\n**The Full Solution:**\n\nStep 1 — Separate the boundary. A sector's boundary is arc $+$ two radii, so $2r+24=64$, giving $2r=40$ and $r=20$ meters.\n\nStep 2 — Use the arc-length form of sector area. Because $s=r\\theta$ and $A=\\frac{1}{2}r^2\\theta$, substituting gives $A=\\frac{1}{2}sr$.\n\nStep 3 — Evaluate: $A=\\frac{1}{2}(24)(20)=240$ square meters. Check with the central angle: $\\theta=\\frac{s}{r}=\\frac{24}{20}=1.2$ radians, and $\\frac{1}{2}(20)^2(1.2)=240$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($96$): halving the whole boundary before removing the arc gives $r=32-24=8$ and $\\frac{1}{2}(24)(8)=96$.\n* Choice C ($480$): this finds $r=20$ but drops the factor $\\frac{1}{2}$, computing $24(20)=480$.\n* Choice D ($640$): this treats the entire $64$-meter boundary as the arc, giving $\\frac{1}{2}(64)(20)=640$.\n\n**Test Day Takeaway:** The perimeter of a sector is arc plus **two** radii — peel off the radii first, then use $A=\\frac{1}{2}sr$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "multi-step-sector",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-053",
    domain: "geometry",
    skills: ["volume-pyramid-cone", "volume-prism"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A civic monument rests on a square stone block $9$ meters on a side and $4$ meters tall, and a stone pyramid on the same square base caps it. Each triangular face of the pyramid has a slant height of $7.5$ meters. How many cubic meters of stone does the monument contain?",
    choices: [
      // distractor: reports only the pyramid's volume, 162
      { id: "A", text: "$162$" },
      // distractor: applies the one-third factor to the whole solid, computing (324 + 486)/3
      { id: "B", text: "$270$" },
      { id: "C", text: "$486$" },
      // distractor: omits the one-third in the pyramid's volume, adding 324 + 486
      { id: "D", text: "$810$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Composite Solid Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** The slant height $7.5$ over the half-edge $4.5$ gives a pyramid height of $6$, so the stone is $81(4) + \\frac{1}{3}(81)(6) = 486$ cubic meters.\n\n**The Full Solution:**\nStep 1: The block is a rectangular prism with base area $9 \\times 9 = 81$ square meters and height $4$ meters, so its volume is $81(4) = 324$ cubic meters.\nStep 2: A face's slant height runs from the apex to the midpoint of a base edge, a point $4.5$ meters from the center of the base, so the pyramid's height is $\\sqrt{7.5^2 - 4.5^2} = \\sqrt{56.25 - 20.25} = \\sqrt{36} = 6$ meters.\nStep 3: The cap then holds $\\frac{1}{3}(81)(6) = 162$ cubic meters, and the monument contains $324 + 162 = 486$ cubic meters. Check: the pyramid must be smaller than a prism of the same base and height, and $162 < 81(6) = 486$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($162$): stops after the pyramid and forgets the block underneath.\n* Choice B ($270$): applies $\\frac{1}{3}$ to the entire monument instead of only to the pyramid.\n* Choice D ($810$): leaves the $\\frac{1}{3}$ off the pyramid, treating the cap as a second prism.\n\n**Test Day Takeaway:** A slant height is a hypotenuse, never the height — convert it first, and give the $\\frac{1}{3}$ only to the pyramid piece.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "composite-solid",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-054",
    domain: "geometry",
    skills: ["pythagorean-theorem", "volume-pyramid-cone"],
    difficulty: "hard",
    type: "fill-in",
    question: "A public-address horn's conical flare has a mouth that measures $18\\pi$ centimeters around and a slanted side $15$ centimeters long. How many cubic centimeters does the flare enclose? Round to the nearest whole number.",
    correctAnswer: "1018",
    explanation: "**SAT Pattern: Cone Volume from Slant Height**\n\n**The correct answer is $1018$.**\n\n**The Fast Way (~45s):** The mouth gives $r = 9$, the slant gives $h = \\sqrt{15^2 - 9^2} = 12$, and $V = \\frac{1}{3}\\pi(81)(12) = 324\\pi \\approx 1018$.\n\n**The Full Solution:**\nStep 1: From $2\\pi r = 18\\pi$, the mouth's radius is $r = 9$ centimeters.\nStep 2: The radius, the height, and the slanted side form a right triangle, so $h = \\sqrt{15^2 - 9^2} = \\sqrt{225 - 81} = \\sqrt{144} = 12$ centimeters.\nStep 3: Apply the cone formula: $V = \\frac{1}{3}\\pi(9)^2(12) = 324\\pi \\approx 1017.88$, which rounds to $1018$ cubic centimeters. Check: $9$, $12$, $15$ is a right triangle, so the slanted side is indeed the longest of the three ✓\n\n**Common Mistakes:**\n* $1272$ — uses the slanted side $15$ as the height, giving $405\\pi$.\n* $3054$ — omits the $\\frac{1}{3}$, computing $972\\pi$.\n* $113$ — forgets to square the radius, computing $\\frac{1}{3}\\pi(9)(12) = 36\\pi$.\n\n**Test Day Takeaway:** The slanted side is a hypotenuse, never the height — solve the right triangle before touching the volume formula.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "multi-step-solid",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-055",
    domain: "geometry",
    skills: ["completing-square-circles", "circle-area"],
    difficulty: "hard",
    type: "fill-in",
    question: "A wireless access point's coverage boundary in a warehouse is modeled in the $xy$-plane, in meters, by $2x^2 + 2y^2 - 12x - 20y - 382 = 0$. What is the greatest $y$-coordinate of any point on that boundary?",
    correctAnswer: "20",
    explanation: "**SAT Pattern: Normalize Circle Equation Before Completing**\n\n**The correct answer is $20$.**\n\n**The Fast Way (~45s):** Divide the whole equation by $2$ first, complete both squares to get $(x - 3)^2 + (y - 5)^2 = 225$, then add the radius to the center's $y$: $5 + 15 = 20$.\n\n**The Full Solution:**\n\nStep 1: The squared terms carry a coefficient of $2$, so divide every term by $2$: $x^2 + y^2 - 6x - 10y - 191 = 0$.\n\nStep 2: Complete the square in each variable: $(x^2 - 6x + 9) + (y^2 - 10y + 25) = 191 + 9 + 25$, so $(x - 3)^2 + (y - 5)^2 = 225$. The center is $(3, 5)$ and the radius is $\\sqrt{225} = 15$ meters.\n\nStep 3: The highest point of a circle sits directly above the center, at $y = 5 + 15 = 20$. Check: $(3, 20)$ satisfies the equation, since $(3-3)^2 + (20-5)^2 = 225$.\n\n**Common Mistakes:**\n\n* $15$ — reporting the radius instead of a coordinate on the boundary.\n* $5$ — reporting the center's $y$-coordinate and forgetting to move up by the radius.\n* $230$ — adding $r^2 = 225$ to the center's $y$-coordinate instead of $r = 15$.\n\n**Test Day Takeaway:** A circle equation is not ready to complete until the $x^2$ and $y^2$ coefficients are $1$ — divide first, or every constant you generate will be wrong.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "non-standard-circle-equation",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-056",
    domain: "geometry",
    skills: ["triangle-angle-sum", "soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A loudspeaker's aiming line, a stage truss, and a vertical support form the right triangle in the figure, whose acute angles are marked $\\theta$ and $\\phi$. Given that $\\sin\\theta = \\frac{20}{29}$, what is $\\tan\\phi$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [21, 0], [21, 20]], labels: ["θ", "", "φ"], sideLabels: ["", "", "29"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports sin theta unchanged, 20/29
      { id: "A", text: "$\\frac{20}{29}$" },
      // distractor: reports cos theta, which equals sin phi rather than tan phi
      { id: "B", text: "$\\frac{21}{29}$" },
      // distractor: reports tan theta, 20/21, instead of tan phi
      { id: "C", text: "$\\frac{20}{21}$" },
      { id: "D", text: "$\\frac{21}{20}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Cofunction Identity**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The acute angles are complementary, so $\\tan\\phi = \\frac{1}{\\tan\\theta}$; with legs $20$ and $21$ against hypotenuse $29$, $\\tan\\phi = \\frac{21}{20}$.\n\n**The Full Solution:**\nStep 1: $\\sin\\theta = \\frac{20}{29}$ means the leg opposite $\\theta$ is $20$ and the hypotenuse is $29$, so the remaining leg is $\\sqrt{29^2 - 20^2} = \\sqrt{441} = 21$.\nStep 2: Because $\\theta + \\phi = 90^{\\circ}$, the leg opposite $\\theta$ is adjacent to $\\phi$ and vice versa: $\\cos\\phi = \\sin\\theta = \\frac{20}{29}$ and $\\sin\\phi = \\cos\\theta = \\frac{21}{29}$.\nStep 3: Therefore $\\tan\\phi = \\frac{\\sin\\phi}{\\cos\\phi} = \\frac{21/29}{20/29} = \\frac{21}{20}$. Check: $\\tan\\theta = \\frac{20}{21}$, and the two tangents multiply to $1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{20}{29}$): copies $\\sin\\theta$, which equals $\\cos\\phi$, not $\\tan\\phi$.\n* Choice B ($\\frac{21}{29}$): gives $\\cos\\theta$, the same as $\\sin\\phi$ — still a sine or cosine, not a tangent.\n* Choice C ($\\frac{20}{21}$): reports $\\tan\\theta$, the reciprocal of what was asked.\n\n**Test Day Takeaway:** Complementary acute angles swap opposite and adjacent, so their sines and cosines trade places and their tangents are reciprocals.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "complementary-angle-identity",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-057",
    domain: "geometry",
    skills: ["volume-sphere", "volume-scaling"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A right circular cylinder has a radius of $r$ and a height of $h$. A second right circular cylinder has a radius of $3r$ and a height of $3h$. The volume of the second cylinder is how many times the volume of the first cylinder?",
    choices: [
      // distractor: reports the linear factor only
      { id: "A", text: "$3$" },
      // distractor: multiplies the two factors of 3 without squaring the radius
      { id: "B", text: "$9$" },
      { id: "C", text: "$27$" },
      // distractor: squares the height factor as well as the radius factor
      { id: "D", text: "$81$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Pure Volume Scaling**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** $V = \\pi r^2 h$, so tripling both $r$ and $h$ multiplies the volume by $3^2 \\cdot 3 = 27$.\n\n**The Full Solution:**\nStep 1: The first cylinder has volume $V_1 = \\pi r^2 h$.\nStep 2: The second has volume $V_2 = \\pi(3r)^2(3h) = \\pi(9r^2)(3h) = 27\\pi r^2 h$.\nStep 3: Divide: $\\frac{V_2}{V_1} = \\frac{27\\pi r^2 h}{\\pi r^2 h} = 27$.\n\nVerification: the two cylinders are similar with linear factor $3$, and volumes of similar solids scale by $3^3 = 27$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): reports the linear factor, which scales a single length, not a volume.\n* Choice B ($9$): multiplies $3 \\cdot 3$ for the two changed dimensions but never squares the radius.\n* Choice D ($81$): squares the height factor along with the radius factor, using $3^2 \\cdot 3^2$.\n\n**Test Day Takeaway:** Substitute the scaled quantities into the formula and simplify. The exponent on each variable tells you how its factor compounds.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "scaling-conceptual",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-058",
    domain: "geometry",
    skills: ["radians-to-degrees", "sector-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The tension plate of a circular knitting loom is the circle shown with center $P$, and a metal guard occupies sector $XPY$, whose central angle is given in radians. What is the area, in square millimeters, of the part of the plate outside the guard?",
    diagram: { type: "circleWithSector", params: { centralAngle: 150, angleLabel: "5π/6", radius: "18 mm", showRadiusLabel: true, labelCenter: "P", labelPoint1: "X", labelPoint2: "Y" } },
    choices: [
      // distractor: drops the factor 1/2 from A = (1/2)r^2 theta, making the guard 270 pi and the remainder 54 pi
      { id: "A", text: "$54\\pi$" },
      // distractor: gives the guard's own area instead of the region outside it
      { id: "B", text: "$135\\pi$" },
      { id: "C", text: "$189\\pi$" },
      // distractor: gives the area of the whole plate, never subtracting the guard
      { id: "D", text: "$324\\pi$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Sector Area in Radians**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The guard covers $\\frac{5\\pi/6}{2\\pi}=\\frac{5}{12}$ of the plate, so the rest is $\\frac{7}{12}$ of $\\pi(18)^2=324\\pi$, which is $189\\pi$ square millimeters.\n\n**The Full Solution:**\n\nStep 1 — Read the figure: radius $18$ millimeters and central angle $\\frac{5\\pi}{6}$ radians.\n\nStep 2 — Find the guard's area with $A=\\frac{1}{2}r^2\\theta=\\frac{1}{2}(18)^2\\left(\\frac{5\\pi}{6}\\right)=\\frac{1}{2}(324)\\left(\\frac{5\\pi}{6}\\right)=135\\pi$ square millimeters.\n\nStep 3 — Subtract from the whole plate: $\\pi(18)^2-135\\pi=324\\pi-135\\pi=189\\pi$ square millimeters. Check: the leftover angle is $2\\pi-\\frac{5\\pi}{6}=\\frac{7\\pi}{6}$, and $\\frac{1}{2}(324)\\left(\\frac{7\\pi}{6}\\right)=189\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($54\\pi$): dropping the $\\frac{1}{2}$ makes the guard $324\\left(\\frac{5\\pi}{6}\\right)=270\\pi$, leaving $324\\pi-270\\pi=54\\pi$.\n* Choice B ($135\\pi$): this is the guard's own area, not the region outside it.\n* Choice D ($324\\pi$): this is the whole plate, with the guard never subtracted.\n\n**Test Day Takeaway:** In radians the sector formula is $A=\\frac{1}{2}r^2\\theta$ with no $360$ anywhere — and read carefully whether the question wants the sector or what is left of the circle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "radian-sector-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-059",
    domain: "geometry",
    skills: ["similar-triangles", "pythagorean-theorem"],
    difficulty: "hard",
    type: "fill-in",
    question: "The steel truss shown for a wind-turbine service platform has a right angle at $M$, and brace $\\overline{MP}$ meets hypotenuse $\\overline{LN}$ at a right angle. With lengths in feet, what is the perimeter of triangle $LMN$?",
    diagram: { type: "rightTriangleWithAltitude", params: { vertexLabels: ["L", "M", "N", "P"], sideLengths: { PM: "12", PN: "16" }, figureNote: true } },
    correctAnswer: "60",
    explanation: "**SAT Pattern: Altitude to Hypotenuse**\n\n**The correct answer is $60$.**\n\n**The Fast Way (~60s):** $LP=\\frac{12^{2}}{16}=9$, so $LN=25$, and the legs are $15$ and $20$, giving $15+20+25=60$ feet.\n\n**The Full Solution:**\n\nStep 1: Use the altitude relation. The altitude to the hypotenuse satisfies $MP^{2}=LP\\cdot PN$, so $144=LP\\cdot16$ and $LP=9$ feet.\n\nStep 2: Build the hypotenuse. $LN=LP+PN=9+16=25$ feet.\n\nStep 3: Use the leg relations. $LM^{2}=LP\\cdot LN=9\\cdot25=225$ gives $LM=15$, and $MN^{2}=PN\\cdot LN=16\\cdot25=400$ gives $MN=20$. The perimeter is $15+20+25=60$ feet.\n\nCheck: $15^{2}+20^{2}=225+400=625=25^{2}$, so triangle $LMN$ is right-angled at $M$ as stated.\n\n**Common Mistakes:**\n\n* $25$: reports the hypotenuse $LN$ alone instead of the sum of all three sides.\n* $47$: adds the altitude $MP=12$ in place of the hypotenuse, giving $15+20+12$.\n* $72$: adds all four marked segments, $15+20+25+12$, counting the interior altitude as a side.\n\n**Test Day Takeaway:** The altitude to a hypotenuse creates three similar triangles; each leg is the geometric mean of the whole hypotenuse and the segment beneath it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "altitude-to-hypotenuse",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },
  {
    id: "bank-geo-060",
    domain: "geometry",
    skills: ["circle-parts", "arc-length", "sector-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A bike path of length $30\\pi$ meters encircles a pocket park. Groundskeepers will reseed the wedge of lawn shown, whose central angle measures $144^{\\circ}$. What is the wedge's area, in square meters?",
    diagram: { type: "circleWithSector", params: { centralAngle: 144, angleLabel: "144°", radius: "r", labelCenter: "O", showRadiusLabel: true, figureNote: true } },
    choices: [
      // distractor: computes the wedge's arc length, (144/360)(30 pi) = 12 pi, instead of its area
      { id: "A", text: "$12\\pi$" },
      { id: "B", text: "$90\\pi$" },
      // distractor: uses the fraction 144/180 instead of 144/360, giving 0.8 times 225 pi
      { id: "C", text: "$180\\pi$" },
      // distractor: reports the area of the entire park, pi times 15 squared
      { id: "D", text: "$225\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circumference → Radius → Sector**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** From $2\\pi r = 30\\pi$ the radius is $15$, and $\\frac{144}{360} = \\frac{2}{5}$ of the park's $225\\pi$ square meters is $90\\pi$.\n\n**The Full Solution:**\nStep 1: The bike path is the circumference: $2\\pi r = 30\\pi$, so $r = 15$ meters.\nStep 2: The full park has area $\\pi r^2 = 225\\pi$ square meters.\nStep 3: A $144^{\\circ}$ wedge is $\\frac{144}{360} = \\frac{2}{5}$ of the circle, so its area is $\\frac{2}{5}(225\\pi) = 90\\pi$ square meters. Check: $\\frac{2}{5}$ of the full area should be less than half of $225\\pi$, and $90\\pi < 112.5\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($12\\pi$): applies $\\frac{2}{5}$ to the circumference, producing the wedge's arc length rather than its area.\n* Choice C ($180\\pi$): divides the central angle by $180$ instead of $360$, doubling the correct fraction.\n* Choice D ($225\\pi$): reports the whole park's area and never takes the fraction.\n\n**Test Day Takeaway:** Circumference gives the radius; the same angle fraction scales arc length off $2\\pi r$ and sector area off $\\pi r^2$ — pick the one the question asks for.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "multi-step-track-problem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-02-28"
  },

  // === RIGHT-TRIANGLE TRIG RATIOS (8 questions) — Phase 2 priority pattern ===
  // 17x in 12 tests = 3.2% of test items. Covers: SOHCAHTOA from given sides,
  // side-from-ratio scaling, identity-based ratio composition, real-world angle.
  // Pythagorean triples used: 5-12-13, 8-15-17, 7-24-25, 3-4-5.
  {
    id: "bank-geo-061",
    domain: "geometry",
    skills: ["soh-cah-toa", "pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A curtain-wall bracing plate has the shape of right triangle $FGH$ shown, with side lengths in centimeters. What is the value of $\\cos F$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 9]], labels: ["F", "G", "H"], sideLabels: ["12", "9", "15"], rightAngleVertex: 1 } },
    choices: [
      // distractor: gives sin F, the side opposite F over the hypotenuse, 9 over 15
      { id: "A", text: "$\\frac{3}{5}$" },
      // distractor: gives tan F, opposite over adjacent, 9 over 12
      { id: "B", text: "$\\frac{3}{4}$" },
      { id: "C", text: "$\\frac{4}{5}$" },
      // distractor: inverts the tangent, adjacent over opposite, 12 over 9
      { id: "D", text: "$\\frac{4}{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice C is correct.** $\\cos F = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{FG}{FH} = \\frac{12}{15} = \\frac{4}{5}$.\n\n**The Fast Way (~15s):** The side adjacent to $F$ is $12$ and the hypotenuse is $15$, so $\\cos F = \\frac{12}{15} = \\frac{4}{5}$.\n\n**The Full Solution:**\n\nStep 1: The right angle is at $G$, so the hypotenuse is $\\overline{FH} = 15$.\n\nStep 2: The leg adjacent to angle $F$ is $\\overline{FG} = 12$; the leg opposite $F$ is $\\overline{GH} = 9$.\n\nStep 3: Cosine is adjacent over hypotenuse: $\\frac{12}{15} = \\frac{4}{5}$. Check: $\\left(\\frac{3}{5}\\right)^2 + \\left(\\frac{4}{5}\\right)^2 = 1$, so the sine and cosine are consistent.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{3}{5}$): that is $\\sin F$, opposite over hypotenuse.\n* Choice B ($\\frac{3}{4}$): that is $\\tan F$, opposite over adjacent.\n* Choice D ($\\frac{4}{3}$): inverts the tangent, adjacent over opposite.\n\n**Test Day Takeaway:** Label the hypotenuse first — it is always opposite the right angle — and the adjacent and opposite legs sort themselves out from the named angle.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-062",
    domain: "geometry",
    skills: ["soh-cah-toa", "pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A disk-shelf mounting bracket is cut as right triangle $JKL$, whose right angle is at $J$ and whose edges measure $8$, $15$, and $17$ centimeters. What is the value of $\\tan K$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [0, 8]], labels: ["J", "K", "L"], sideLabels: ["15", "17", "8"], rightAngleVertex: 0 } },
    choices: [
      // distractor: gives sin K, opposite over hypotenuse, 8 over 17
      { id: "A", text: "$\\frac{8}{17}$" },
      { id: "B", text: "$\\frac{8}{15}$" },
      // distractor: gives cos K, adjacent over hypotenuse, 15 over 17
      { id: "C", text: "$\\frac{15}{17}$" },
      // distractor: inverts the tangent, adjacent over opposite, 15 over 8
      { id: "D", text: "$\\frac{15}{8}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice B is correct.** $\\tan K = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{JL}{JK} = \\frac{8}{15}$.\n\n**The Fast Way (~15s):** From $K$, the opposite leg is $8$ and the adjacent leg is $15$, so $\\tan K = \\frac{8}{15}$.\n\n**The Full Solution:**\n\nStep 1: The right angle is at $J$, so $\\overline{KL} = 17$ is the hypotenuse and the legs are $\\overline{JK} = 15$ and $\\overline{JL} = 8$.\n\nStep 2: Angle $K$ sits at one end of leg $\\overline{JK}$, so $\\overline{JK}$ is adjacent to $K$ and $\\overline{JL}$ is opposite it.\n\nStep 3: Tangent is opposite over adjacent: $\\tan K = \\frac{8}{15}$. Check: $\\frac{\\sin K}{\\cos K} = \\frac{8/17}{15/17} = \\frac{8}{15}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{8}{17}$): that is $\\sin K$, which uses the hypotenuse.\n* Choice C ($\\frac{15}{17}$): that is $\\cos K$.\n* Choice D ($\\frac{15}{8}$): inverts the tangent by writing adjacent over opposite.\n\n**Test Day Takeaway:** Tangent is the only one of the three basic ratios that never touches the hypotenuse — if a $17$ appears in your answer, you used the wrong ratio.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-063",
    domain: "geometry",
    skills: ["soh-cah-toa", "pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "For the acute angle $P$ marked on the condenser support arm shown, $\\sin P = \\frac{5}{13}$, and the arm's sloped edge is $26$ centimeters. How long, in centimeters, is the edge opposite $P$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 10]], labels: ["P", "", ""], sideLabels: ["", "", "26 cm"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reads the numerator of the ratio as a length instead of scaling it
      { id: "A", text: "$5$" },
      { id: "B", text: "$10$" },
      // distractor: reports the edge adjacent to P rather than the one opposite it
      { id: "C", text: "$24$" },
      // distractor: inverts the ratio, computing 26 times 13 over 5
      { id: "D", text: "$67.6$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice B is correct.** $\\sin P = \\frac{\\text{opposite}}{\\text{hypotenuse}}$, so the opposite edge is $26 \\cdot \\frac{5}{13} = 10$ centimeters.\n\n**The Fast Way (~20s):** $\\frac{5}{13}$ of $26$ is $10$.\n\n**The Full Solution:**\n\nStep 1: The sloped edge is the hypotenuse, so $\\sin P = \\frac{\\text{opposite}}{26} = \\frac{5}{13}$.\n\nStep 2: Cross-multiply: $13 \\cdot \\text{opposite} = 5 \\cdot 26 = 130$.\n\nStep 3: So the opposite edge is $10$ centimeters. Check: the third side is $\\sqrt{26^2 - 10^2} = 24$, and $10$-$24$-$26$ is a valid right triangle with $\\sin P = \\frac{10}{26} = \\frac{5}{13}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($5$): reads the ratio's numerator as a length instead of scaling it to the $26$-centimeter hypotenuse.\n* Choice C ($24$): gives the edge adjacent to $P$, not the one opposite.\n* Choice D ($67.6$): inverts the ratio, computing $26 \\cdot \\frac{13}{5}$, which exceeds the hypotenuse and cannot be a side.\n\n**Test Day Takeaway:** A trig ratio is a scale factor: multiply the hypotenuse by $\\sin$ to get the opposite leg, and sanity-check that no leg exceeds the hypotenuse.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-064",
    domain: "geometry",
    skills: ["soh-cah-toa", "special-right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The sloped edge of the cantilever bracket shown measures $18$ centimeters and meets the horizontal edge at $30^\\circ$. How long, in centimeters, is that horizontal edge?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15.5885, 0], [15.5885, 9]], labels: ["30°", "", ""], sideLabels: ["", "", "18 cm"], rightAngleVertex: 1 } },
    choices: [
      // distractor: gives the vertical edge, the side opposite the 30 degree angle
      { id: "A", text: "$9$" },
      // distractor: uses the 45-45-90 ratio, multiplying 18 by one over root 2
      { id: "B", text: "$9\\sqrt{2}$" },
      { id: "C", text: "$9\\sqrt{3}$" },
      // distractor: multiplies the hypotenuse by root 3 instead of by root 3 over 2
      { id: "D", text: "$18\\sqrt{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice C is correct.** The horizontal edge is adjacent to the $30^\\circ$ angle, so it equals $18\\cos 30^\\circ = 18 \\cdot \\frac{\\sqrt{3}}{2} = 9\\sqrt{3}$ centimeters.\n\n**The Fast Way (~20s):** In a $30$-$60$-$90$ triangle the sides are $x$, $x\\sqrt{3}$, $2x$; here $2x = 18$, so $x = 9$ and the longer leg is $9\\sqrt{3}$.\n\n**The Full Solution:**\n\nStep 1: The $18$-centimeter sloped edge is the hypotenuse, and the horizontal edge is adjacent to the $30^\\circ$ angle.\n\nStep 2: $\\cos 30^\\circ = \\frac{\\text{adjacent}}{18}$, and $\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$.\n\nStep 3: So the adjacent edge is $18 \\cdot \\frac{\\sqrt{3}}{2} = 9\\sqrt{3} \\approx 15.6$ centimeters. Check: the opposite edge is $18\\sin 30^\\circ = 9$, and $9^2 + (9\\sqrt{3})^2 = 81 + 243 = 324 = 18^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($9$): gives the vertical edge, the side opposite the $30^\\circ$ angle.\n* Choice B ($9\\sqrt{2}$): applies the $45$-$45$-$90$ ratio to a $30$-$60$-$90$ triangle.\n* Choice D ($18\\sqrt{3}$): multiplies the hypotenuse by $\\sqrt{3}$ instead of $\\frac{\\sqrt{3}}{2}$, producing a leg longer than the hypotenuse.\n\n**Test Day Takeaway:** In a $30$-$60$-$90$ triangle the hypotenuse is twice the short leg; halve it first and the other two sides follow without a calculator.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-065",
    domain: "geometry",
    skills: ["soh-cah-toa", "special-right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A base strut runs from a microwave-link mast to the roof deck, meeting the deck at the angle $A$ shown, where $\\tan A = \\frac{7}{24}$. At what height, in centimeters, does the strut meet the mast?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [96, 0], [96, 28]], labels: ["A", "", ""], sideLabels: ["", "", "100 cm"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reads the tangent's numerator as a length rather than scaling the 7-24-25 triple
      { id: "A", text: "$7$" },
      { id: "B", text: "$28$" },
      // distractor: reports the horizontal distance from the mast to the anchor instead of the height
      { id: "C", text: "$96$" },
      // distractor: reports the strut's own length, which is the hypotenuse
      { id: "D", text: "$100$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice B is correct.** $\\tan A = \\frac{7}{24}$ makes the sides $7k$, $24k$, $25k$; with $25k = 100$, $k = 4$ and the height is $7(4) = 28$ centimeters.\n\n**The Fast Way (~30s):** $7$-$24$-$25$ scaled by $4$ gives $28$-$96$-$100$, so the height is $28$.\n\n**The Full Solution:**\n\nStep 1: $\\tan A = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{7}{24}$, so the legs can be written $7k$ and $24k$ for some positive $k$.\n\nStep 2: The hypotenuse is $\\sqrt{(7k)^2 + (24k)^2} = 25k$, and the strut is the hypotenuse, so $25k = 100$ and $k = 4$.\n\nStep 3: The vertical leg, which is the height on the mast, is $7(4) = 28$ centimeters. Check: $28^2 + 96^2 = 784 + 9216 = 10000 = 100^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($7$): reads the tangent's numerator as an actual length.\n* Choice C ($96$): gives the horizontal distance from the mast to the anchor.\n* Choice D ($100$): reports the strut itself, the hypotenuse.\n\n**Test Day Takeaway:** A tangent value hands you the leg RATIO; find the scale factor from the hypotenuse before reporting any single side.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-066",
    domain: "geometry",
    skills: ["soh-cah-toa", "triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A guy wire $175$ feet long runs from the top of a vertical antenna to an anchor point on level ground, making an angle of $\\theta$ with the ground, where $\\sin\\theta = 0.28$. What is the area, in square feet, of the right triangle formed by the wire, the antenna, and the ground?",
    diagram: { type: "rightTriangle", params: { labels: ["θ", "", ""], sideLabels: ["", "", "175"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      { id: "A", text: "$49$" },
      { id: "B", text: "$168$" },
      { id: "C", text: "$4{,}116$" },
      { id: "D", text: "$8{,}232$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The antenna is $175(0.28) = 49$ feet and the ground leg is $175(0.96) = 168$ feet, so the area is $\\frac{1}{2}(49)(168) = 4{,}116$ square feet.\n\n**The Full Solution:**\nStep 1: The wire is the hypotenuse. The antenna is the leg opposite $\\theta$, so $\\sin\\theta = \\frac{\\text{antenna}}{175} = 0.28$ gives an antenna height of $175(0.28) = 49$ feet.\nStep 2: $\\cos\\theta = \\sqrt{1 - 0.28^2} = \\sqrt{0.9216} = 0.96$, so the ground leg is $175(0.96) = 168$ feet.\nStep 3: The legs of a right triangle are its base and height, so the area is $\\frac{1}{2}(49)(168) = 4{,}116$ square feet.\n\nCheck: $49^2 + 168^2 = 2{,}401 + 28{,}224 = 30{,}625 = 175^2$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($49$): stops at the height of the antenna instead of computing an area.\n* Choice B ($168$): stops at the distance along the ground.\n* Choice D ($8{,}232$): multiplies the two legs but forgets the factor of $\\frac{1}{2}$ in the triangle-area formula.\n\n**Test Day Takeaway:** In a right triangle the two legs are already a base and a height — find both legs, then halve their product.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-067",
    domain: "geometry",
    skills: ["soh-cah-toa", "pythagorean-theorem", "special-right-triangles"],
    difficulty: "hard",
    type: "fill-in",
    question: "The vacuum-oven door stay shown has a $40$-centimeter sloped edge, and the cosine of its marked acute angle equals $\\frac{3}{5}$. How many square centimeters does the stay's triangle cover?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 32]], labels: ["θ", "", ""], sideLabels: ["", "", "40 cm"], rightAngleVertex: 1 } },
    correctAnswer: "384",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**The correct answer is $384$.**\n\n**The Fast Way (~45s):** $\\cos\\theta = \\frac{3}{5}$ with hypotenuse $40$ gives legs $24$ and $32$, so the area is $\\frac{1}{2}(24)(32) = 384$.\n\n**The Full Solution:**\n\nStep 1: The sloped edge is the hypotenuse, so the adjacent leg is $40\\cos\\theta = 40 \\cdot \\frac{3}{5} = 24$ centimeters.\n\nStep 2: Since $\\cos\\theta = \\frac{3}{5}$, the triangle is a $3$-$4$-$5$ family triangle and $\\sin\\theta = \\frac{4}{5}$, so the opposite leg is $40 \\cdot \\frac{4}{5} = 32$ centimeters.\n\nStep 3: Area $= \\frac{1}{2}(24)(32) = 384$ square centimeters. Check: $24^2 + 32^2 = 576 + 1024 = 1600 = 40^2$.\n\n**Common Mistakes:**\n\n* $480$ — using the $40$-centimeter hypotenuse as the height: $\\frac{1}{2}(24)(40)$.\n* $768$ — finding both legs but omitting the factor $\\frac{1}{2}$.\n* $32$ — stopping at the second leg instead of computing the area.\n\n**Test Day Takeaway:** One trig ratio plus the hypotenuse gives BOTH legs, because the Pythagorean identity fixes the other ratio immediately.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-068",
    domain: "geometry",
    skills: ["soh-cah-toa", "pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A rafter tie meets a rafter and a post at a right angle; the two legs measure $b$ and $b + 7$ inches, and the tangent of the smaller acute angle is $\\frac{8}{15}$. What is the length, in inches, of the hypotenuse?",
    choices: [
      // distractor: reports the shorter leg b = 8 instead of the hypotenuse
      { id: "A", text: "$8$" },
      // distractor: reports the longer leg b + 7 = 15
      { id: "B", text: "$15$" },
      { id: "C", text: "$17$" },
      // distractor: adds the two legs, 8 + 15, instead of applying the Pythagorean theorem
      { id: "D", text: "$23$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Right Triangle — Trig Ratios**\n\n**Choice C is correct.** The smaller acute angle faces the shorter leg, so $\\frac{b}{b + 7} = \\frac{8}{15}$ gives $b = 8$, and the hypotenuse is $\\sqrt{8^2 + 15^2} = 17$ inches.\n\n**The Fast Way (~40s):** $15b = 8b + 56$ gives $b = 8$; the legs are $8$ and $15$, so the hypotenuse is $17$.\n\n**The Full Solution:**\n\nStep 1: The smaller acute angle lies opposite the shorter leg, so its tangent is $\\frac{b}{b + 7}$.\n\nStep 2: Set $\\frac{b}{b + 7} = \\frac{8}{15}$ and cross-multiply: $15b = 8b + 56$, so $7b = 56$ and $b = 8$ inches.\n\nStep 3: The legs are $8$ and $15$, so the hypotenuse is $\\sqrt{64 + 225} = \\sqrt{289} = 17$ inches. Check: $15 - 8 = 7$, matching the stated difference, and $\\tan = \\frac{8}{15}$ as given.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($8$): reports the shorter leg $b$.\n* Choice B ($15$): reports the longer leg $b + 7$.\n* Choice D ($23$): adds the legs instead of using the Pythagorean theorem.\n\n**Test Day Takeaway:** Which angle a ratio belongs to decides which leg goes on top — the smaller acute angle always faces the shorter leg.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trig-ratios",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },

  // === CIRCLE IN GENERAL FORM (8 questions) — Phase 2 batch 4 priority pattern ===
  // 8x in 12 tests. Covers: center, radius, h+k+r, area, max-x, find missing
  // parameter, r². Requires completing the square on both x and y groupings.
  // SAT Pattern kebab matches: 'circle-in-general-form'.
  {
    id: "bank-geo-069",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The area reached by a campus Wi-Fi antenna is bounded by $x^{2}+y^{2}-10x-24y=0$, with coordinates in meters. Which of the following describes that circle?",
    choices: [
      // distractor: keeps the signs of -10 and -24 instead of reversing them for the center
      { id: "A", text: "Center $(-5,-12)$ and radius $13$" },
      // distractor: reports r squared = 169 as the radius
      { id: "B", text: "Center $(5,12)$ and radius $169$" },
      // distractor: uses the full coefficients 10 and 24 rather than half of each
      { id: "C", text: "Center $(10,24)$ and radius $13$" },
      { id: "D", text: "Center $(5,12)$ and radius $13$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Half of $10$ and half of $24$ give the center $(5,12)$, and $r^{2}=25+144=169$, so $r=13$.\n\n**The Full Solution:**\n\nStep 1: Complete the square in $x$. $x^{2}-10x$ becomes $(x-5)^{2}-25$.\n\nStep 2: Complete the square in $y$. $y^{2}-24y$ becomes $(y-12)^{2}-144$.\n\nStep 3: Rewrite. $(x-5)^{2}+(y-12)^{2}=169$, so the center is $(5,12)$ meters and the radius is $\\sqrt{169}=13$ meters.\n\nCheck: the origin satisfies the original equation, and its distance to $(5,12)$ is $\\sqrt{25+144}=13$, the radius.\n\n**Why the wrong answers are tempting:**\n\n* Choice A: keeps the signs of $-10$ and $-24$ instead of reversing them for the center.\n* Choice B: reports $r^{2}=169$ as the radius rather than taking the square root.\n* Choice C: uses the full coefficients $10$ and $24$ instead of half of each.\n\n**Test Day Takeaway:** Halve each linear coefficient and flip its sign for the center; the completed constants add to give $r^{2}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-070",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "easy",
    type: "fill-in",
    question: "Sensors at a pharmacy watch a circular zone whose boundary satisfies $x^{2}+y^{2}+16x-12y+51=0$ on a plan measured in feet. How many feet is the radius of that zone?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~35s):** $r^{2}=8^{2}+6^{2}-51=49$, so $r=7$ feet.\n\n**The Full Solution:**\n\nStep 1: Complete the square in $x$. $x^{2}+16x$ becomes $(x+8)^{2}-64$.\n\nStep 2: Complete the square in $y$. $y^{2}-12y$ becomes $(y-6)^{2}-36$.\n\nStep 3: Collect constants. $(x+8)^{2}+(y-6)^{2}=64+36-51=49$, so $r=\\sqrt{49}=7$ feet.\n\nCheck: expanding $(x+8)^{2}+(y-6)^{2}=49$ gives $x^{2}+y^{2}+16x-12y+51=0$.\n\n**Common Mistakes:**\n\n* $49$: reports $r^{2}$ instead of taking the square root.\n* $10$: omits the constant $51$, using $r^{2}=64+36=100$.\n* $51$: reports the equation's constant term as though it were the radius.\n\n**Test Day Takeaway:** The constant already in the equation must be subtracted from the two completed squares — it never disappears.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-071",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A gas-detection perimeter around a compressor station is the circle $x^{2}+y^{2}+ax-18y+45=0$, whose center is $(7,9)$, with coordinates in meters. What is the value of $a$?",
    choices: [
      { id: "A", text: "$-14$" },
      // distractor: reverses the sign but forgets to double, reporting a = -7
      { id: "B", text: "$-7$" },
      // distractor: forgets both the sign reversal and the doubling
      { id: "C", text: "$7$" },
      // distractor: forgets the sign reversal, solving a/2 = 7
      { id: "D", text: "$14$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~40s):** The $x$-coordinate of the center is $-\\frac{a}{2}$, so $-\\frac{a}{2}=7$ and $a=-14$.\n\n**The Full Solution:**\n\nStep 1: Relate the coefficient to the center. Completing the square on $x^{2}+ax$ gives $\\left(x+\\frac{a}{2}\\right)^{2}$, so the center's $x$-coordinate is $-\\frac{a}{2}$.\n\nStep 2: Set it equal to the given value. $-\\frac{a}{2}=7$.\n\nStep 3: Solve. Multiplying both sides by $-2$ gives $a=-14$.\n\nCheck: with $a=-14$ the equation becomes $(x-7)^{2}+(y-9)^{2}=49+81-45=85$, a real circle centered at $(7,9)$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($-7$): reverses the sign but forgets to double, reporting $-7$.\n* Choice C ($7$): copies the center's coordinate directly, skipping both the sign reversal and the doubling.\n* Choice D ($14$): doubles correctly but keeps the sign, solving $\\frac{a}{2}=7$.\n\n**Test Day Takeaway:** In general form the linear coefficient is $-2$ times the center coordinate; running that backwards requires both operations.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-072",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "fill-in",
    question: "An auditorium ceiling speaker covers the region bounded by $x^{2}+y^{2}-6x+20y+9=0$, with coordinates in feet. What is the sum of the coordinates of the center of that region?",
    correctAnswer: "-7",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $-7$.**\n\n**The Fast Way (~35s):** The center is $(3,-10)$, and $3+(-10)=-7$.\n\n**The Full Solution:**\n\nStep 1: Halve and reverse the $x$-coefficient. $-6$ gives $h=3$.\n\nStep 2: Halve and reverse the $y$-coefficient. $20$ gives $k=-10$.\n\nStep 3: Add. The sum of the center's coordinates is $3+(-10)=-7$.\n\nCheck: $(x-3)^{2}+(y+10)^{2}=9+100-9=100$ expands back to the given equation, so the center is indeed $(3,-10)$.\n\n**Common Mistakes:**\n\n* $7$: reverses only one of the two signs, reporting $-3+10$.\n* $-14$: uses the full coefficients $-6$ and $20$ instead of half of each, giving $6+(-20)$.\n* $10$: reports the radius $10$ rather than the sum of the coordinates.\n\n**Test Day Takeaway:** Each center coordinate is half of its linear coefficient with the sign flipped — do both variables before adding.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-073",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles", "circle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A supermarket marks a circular clearance zone around a produce island by $x^{2}+y^{2}-4x+10y+k=0$, with coordinates in feet. That zone covers $16\\pi$ square feet. What is the value of $k$?",
    choices: [
      // distractor: writes r squared = 4 + 25 + k, slipping the sign of the constant
      { id: "A", text: "$-13$" },
      // distractor: reports the radius 4 as the value of k
      { id: "B", text: "$4$" },
      { id: "C", text: "$13$" },
      // distractor: reports 4 + 25, forgetting to subtract r squared
      { id: "D", text: "$29$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** Area $16\\pi$ means $r^{2}=16$, and $r^{2}=4+25-k$, so $29-k=16$ and $k=13$.\n\n**The Full Solution:**\n\nStep 1: Turn the area into $r^{2}$. $\\pi r^{2}=16\\pi$ gives $r^{2}=16$ square feet.\n\nStep 2: Complete the square. $(x-2)^{2}+(y+5)^{2}=4+25-k=29-k$.\n\nStep 3: Match and solve. $29-k=16$, so $k=13$.\n\nCheck: with $k=13$ the circle is $(x-2)^{2}+(y+5)^{2}=16$, radius $4$, area $16\\pi$ square feet.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-13$): writes $r^{2}=4+25+k$, slipping the sign of the constant term.\n* Choice B ($4$): reports the radius $4$ instead of the constant $k$.\n* Choice D ($29$): reports $4+25$, forgetting to subtract $r^{2}$ from it.\n\n**Test Day Takeaway:** Convert a given area to $r^{2}$ first; the completed-square constant then becomes a one-step equation in the unknown coefficient.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-074",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "fill-in",
    question: "A wellhead protection area is bounded by $x^{2}+y^{2}+12x+by-20=0$, with coordinates in meters, and the boundary is a circle of radius $9$. What is the value of $b$, given that $b>0$?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~55s):** $r^{2}=36+\\frac{b^{2}}{4}+20=81$ gives $\\frac{b^{2}}{4}=25$, so $b=10$.\n\n**The Full Solution:**\n\nStep 1: Complete the square in $x$. $x^{2}+12x$ contributes $36$ to the right side.\n\nStep 2: Complete the square in $y$. $y^{2}+by$ contributes $\\left(\\frac{b}{2}\\right)^{2}=\\frac{b^{2}}{4}$.\n\nStep 3: Solve using the radius. $36+\\frac{b^{2}}{4}+20=9^{2}=81$, so $\\frac{b^{2}}{4}=25$, $b^{2}=100$, and $b=10$ because $b>0$.\n\nCheck: with $b=10$ the circle is $(x+6)^{2}+(y+5)^{2}=36+25+20=81$, radius $9$ meters.\n\n**Common Mistakes:**\n\n* $5$: stops at $\\frac{b}{2}=5$ and reports half of $b$.\n* $-10$: takes the negative square root, which the condition $b>0$ rules out.\n* $20$: doubles the correct value, applying the halving step in the wrong direction.\n\n**Test Day Takeaway:** Working backwards from a radius, remember the completed square contributes $\\left(\\frac{b}{2}\\right)^{2}$ — take the square root before undoing the halving.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-075",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "fill-in",
    question: "A school observatory's map represents a light-free zone by $x^{2}+y^{2}-8x+6y+c=0$, with coordinates in hundreds of meters. For what value of $c$ is the zone's boundary tangent to the $x$-axis?",
    correctAnswer: "16",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**The correct answer is $16$.**\n\n**The Fast Way (~65s):** The center is $(4,-3)$, so tangency to the $x$-axis needs $r=3$; then $25-c=9$ and $c=16$.\n\n**The Full Solution:**\n\nStep 1: Find the center and $r^{2}$. Completing both squares gives $(x-4)^{2}+(y+3)^{2}=16+9-c=25-c$, so the center is $(4,-3)$.\n\nStep 2: Translate tangency into a radius. A circle is tangent to the $x$-axis exactly when its radius equals the distance from its center to that axis, which is $|-3|=3$.\n\nStep 3: Solve. $25-c=3^{2}=9$, so $c=16$.\n\nCheck: $(x-4)^{2}+(y+3)^{2}=9$ has its lowest point at $(4,0)$, which lies on the $x$-axis and is the only such point.\n\n**Common Mistakes:**\n\n* $9$: reports $r^{2}=9$ rather than the constant $c$ that produces it.\n* $25$: sets $r=0$, the condition for a single point instead of tangency.\n* $0$: assumes tangency to the $x$-axis means the circle passes through the origin.\n\n**Test Day Takeaway:** Tangent to the $x$-axis means the radius equals $|k|$, the center's distance from that axis — convert the condition into a radius before solving.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-076",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A water utility's pressure zone is bounded by $x^{2}+y^{2}+12x-16y+75=0$, with coordinates in kilometers. What is the greatest distance, in kilometers, from the origin to a point on that boundary?",
    choices: [
      // distractor: reports the radius, 5, instead of a distance from the origin
      { id: "A", text: "$5$" },
      // distractor: reports the distance from the origin to the center, 10
      { id: "B", text: "$10$" },
      { id: "C", text: "$15$" },
      // distractor: adds the diameter 10 to the center distance instead of the radius
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~65s):** The center is $(-6,8)$, which is $10$ from the origin, and the radius is $5$, so the farthest point is $10+5=15$ kilometers away.\n\n**The Full Solution:**\n\nStep 1: Complete the square. $(x+6)^{2}+(y-8)^{2}=36+64-75=25$, so the center is $(-6,8)$ and $r=5$ kilometers.\n\nStep 2: Measure the center from the origin. $\\sqrt{(-6)^{2}+8^{2}}=\\sqrt{100}=10$ kilometers.\n\nStep 3: Push out along that line. The farthest boundary point lies on the ray from the origin through the center, one radius beyond it: $10+5=15$ kilometers.\n\nCheck: the nearest boundary point is $10-5=5$ kilometers away, and the two distances average to $10$, the center's distance, as they must.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($5$): reports the radius instead of a distance measured from the origin.\n* Choice B ($10$): reports the distance from the origin to the center, stopping before the boundary.\n* Choice D ($20$): adds the diameter $10$ rather than the radius $5$ to the center distance.\n\n**Test Day Takeaway:** For an external point, the farthest point of a circle is center-distance plus radius and the nearest is center-distance minus radius.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 5/3: right-triangle-pythagorean (8 items) =====
  // Test bundles use this 7x across PT3, PT7, PT9. The title in test explanations is
  // 'Right Triangle — Pythagorean' with em-dash (U+2014); kebab slug is
  // 'right-triangle-pythagorean'. Items lean on the canonical Pythagorean triples
  // (3-4-5, 5-12-13, 7-24-25, 8-15-17, 9-40-41) and their multiples.
  {
    id: "bank-geo-077",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "How many feet of lumber does one shed-roof rafter require if it must span a $40$-foot horizontal run and a $9$-foot rise?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [40, 0], [40, 9]], sideLabels: ["40 ft", "9 ft", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: subtracts the two given lengths, 40 - 9, instead of combining their squares
      { id: "A", text: "$31$" },
      { id: "B", text: "$41$" },
      // distractor: adds the run and the rise, 40 + 9, giving the two-leg path rather than the rafter
      { id: "C", text: "$49$" },
      // distractor: computes the area, one half times 9 times 40, instead of a length
      { id: "D", text: "$180$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice B is correct.** The rafter is the hypotenuse: $\\sqrt{9^2 + 40^2} = \\sqrt{1681} = 41$ feet.\n\n**The Fast Way (~20s):** $9$-$40$-$41$ is a Pythagorean triple, so the rafter is $41$ feet.\n\n**The Full Solution:**\n\nStep 1: The run and the rise meet at a right angle, so they are the legs of a right triangle whose hypotenuse is the rafter.\n\nStep 2: $9^2 + 40^2 = 81 + 1600 = 1681$.\n\nStep 3: The rafter measures $\\sqrt{1681} = 41$ feet. Check: $41 > 40$, as a hypotenuse must exceed each leg, and $41 < 49$, the two-leg path.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($31$): subtracts the lengths instead of combining their squares.\n* Choice C ($49$): adds the run and the rise, which is the path along both legs.\n* Choice D ($180$): computes the area $\\frac{1}{2}(9)(40)$ rather than a length.\n\n**Test Day Takeaway:** A hypotenuse always lands strictly between the longer leg and the sum of the legs — use that band to eliminate two choices before computing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-078",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "fill-in",
    question: "A plenum return duct crosses $60$ centimeters horizontally while dropping $11$ centimeters. What is the length, in centimeters, of the duct's straight run?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 11], [60, 11], [60, 0]], sideLabels: ["60 cm", "11 cm", ""], rightAngleVertex: 1 } },
    correctAnswer: "61",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $61$.**\n\n**The Fast Way (~20s):** $11$-$60$-$61$ is a Pythagorean triple, so the straight run is $61$ centimeters.\n\n**The Full Solution:**\n\nStep 1: The horizontal crossing and the vertical drop meet at a right angle, so the duct's straight run is the hypotenuse.\n\nStep 2: $11^2 + 60^2 = 121 + 3600 = 3721$.\n\nStep 3: The run is $\\sqrt{3721} = 61$ centimeters. Check: $61^2 = 3721$, and $61$ lies between $60$ and $71$, as a hypotenuse must.\n\n**Common Mistakes:**\n\n* $71$ — adding the two legs, $60 + 11$, which measures the bent path rather than the straight one.\n* $49$ — subtracting the legs, $60 - 11$, instead of working with their squares.\n* $330$ — computing the area $\\frac{1}{2}(11)(60)$ rather than a length.\n\n**Test Day Takeaway:** A drop and a horizontal run form legs, never a hypotenuse — the direct distance is always the square-root combination.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-079",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The guard panel of a rotary evaporator is the right triangle shown, with legs of $10$ centimeters and $24$ centimeters. By how many centimeters does the longest edge exceed the longer leg?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 10]], sideLabels: ["24 cm", "10 cm", ""], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$2$" },
      // distractor: subtracts the two legs, 24 - 10, instead of comparing the hypotenuse with the longer leg
      { id: "B", text: "$14$" },
      // distractor: subtracts the shorter leg from the hypotenuse, 26 - 10
      { id: "C", text: "$16$" },
      // distractor: reports the hypotenuse itself and never forms the difference
      { id: "D", text: "$26$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice A is correct.** The hypotenuse is $\\sqrt{10^2 + 24^2} = 26$, so it exceeds the $24$-centimeter leg by $2$ centimeters.\n\n**The Fast Way (~25s):** $10$-$24$-$26$ is $5$-$12$-$13$ doubled; $26 - 24 = 2$.\n\n**The Full Solution:**\n\nStep 1: The two given sides meet at the right angle, so they are the legs.\n\nStep 2: The hypotenuse is $\\sqrt{100 + 576} = \\sqrt{676} = 26$ centimeters.\n\nStep 3: The longer leg is $24$, so the difference is $26 - 24 = 2$ centimeters. Check: $10^2 + 24^2 = 676 = 26^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($14$): subtracts the two legs instead of comparing the hypotenuse with the longer leg.\n* Choice C ($16$): subtracts the shorter leg from the hypotenuse.\n* Choice D ($26$): reports the hypotenuse and never takes the difference.\n\n**Test Day Takeaway:** Compute the missing side first, then reread which two lengths the question wants compared — the subtraction is the easy part to misaim.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-080",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "fill-in",
    question: "A rectangular garden plot measures $24$ meters by $45$ meters. A straight gravel path is laid from one corner of the plot to the opposite corner. What is the length, in meters, of the path?",
    correctAnswer: "51",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $51$.**\n\n**The Fast Way (~30s):** The path is the diagonal of the rectangle, so its length is $\\sqrt{24^2 + 45^2} = \\sqrt{2{,}601} = 51$ meters.\n\n**The Full Solution:**\nStep 1: The two sides of the plot and the path form a right triangle, because the corners of a rectangle are right angles.\nStep 2: The sides $24$ and $45$ are the legs, so the path length $d$ satisfies $24^2 + 45^2 = d^2$, that is $576 + 2{,}025 = 2{,}601$.\nStep 3: $d = \\sqrt{2{,}601} = 51$ meters.\n\n```seva-figure\n{\"type\": \"rightTriangle\", \"params\": {\"vertices\": [[0, 0], [45, 0], [45, 24]], \"sideLabels\": [\"45\", \"24\", \"51\"], \"rightAngleVertex\": 1}, \"caption\": \"The path closes a 24-45-51 right triangle inside the plot.\"}\n```\n\nCheck: $24$, $45$, $51$ is the $8$-$15$-$17$ triple scaled by $3$.\n\n**Common Mistakes:**\n* Adding the sides and answering $69$, which is the distance along two edges rather than across.\n* Answering $21$ by subtracting $24$ from $45$.\n* Answering $1{,}080$, the area of the plot, instead of a length.\n\n**Test Day Takeaway:** Any rectangle diagonal is the hypotenuse of a right triangle whose legs are the two side lengths.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-081",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A canopy tie-back forms the right triangle shown; the tie-back itself is the $25$-foot hypotenuse and the post is the $15$-foot vertical leg. What is the perimeter, in feet, of the triangle?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [20, 0], [20, 15]], sideLabels: ["", "15 ft", "25 ft"], rightAngleVertex: 1 } },
    choices: [
      // distractor: adds only the two given lengths, 15 + 25, and never finds the third side
      { id: "A", text: "$40$" },
      { id: "B", text: "$60$" },
      // distractor: counts the 25-foot hypotenuse twice, adding 15 + 25 + 25
      { id: "C", text: "$65$" },
      // distractor: computes the area, one half times 15 times 20, instead of the perimeter
      { id: "D", text: "$150$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice B is correct.** The third side is $\\sqrt{25^2 - 15^2} = 20$, so the perimeter is $15 + 20 + 25 = 60$ feet.\n\n**The Fast Way (~25s):** $15$-$20$-$25$ is the $3$-$4$-$5$ triple times $5$; the perimeter is $60$.\n\n**The Full Solution:**\n\nStep 1: The tie-back is the hypotenuse, so the horizontal leg satisfies $b^2 = 625 - 225 = 400$.\n\nStep 2: Therefore $b = 20$ feet.\n\nStep 3: Perimeter $= 15 + 20 + 25 = 60$ feet. Check: $15^2 + 20^2 = 225 + 400 = 625 = 25^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($40$): adds only the two lengths given and never finds the third side.\n* Choice C ($65$): counts the $25$-foot hypotenuse twice.\n* Choice D ($150$): computes the area $\\frac{1}{2}(15)(20)$ instead of the distance around.\n\n**Test Day Takeaway:** Perimeter needs all three sides, so a hypotenuse-and-one-leg figure always costs you one Pythagorean step before you can add.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-082",
    domain: "geometry",
    skills: ["pythagorean-theorem", "triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "One blade-chassis stiffener is stamped in the shape shown: a right triangle with a $48$-millimeter base and a $50$-millimeter sloped edge. How much sheet metal, in square millimeters, does each stiffener use?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [48, 0], [48, 14]], sideLabels: ["48 mm", "", "50 mm"], rightAngleVertex: 1 } },
    correctAnswer: "336",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $336$.**\n\n**The Fast Way (~30s):** The vertical edge is $\\sqrt{50^2 - 48^2} = 14$, so the area is $\\frac{1}{2}(48)(14) = 336$.\n\n**The Full Solution:**\n\nStep 1: The $50$-millimeter sloped edge is the hypotenuse, so the vertical edge satisfies $b^2 = 2500 - 2304 = 196$.\n\nStep 2: Therefore $b = 14$ millimeters, and the two legs are $48$ and $14$.\n\nStep 3: Area $= \\frac{1}{2}(48)(14) = 336$ square millimeters. Check: $48^2 + 14^2 = 2304 + 196 = 2500 = 50^2$.\n\n**Common Mistakes:**\n\n* $1200$ — using the sloped edge as the height: $\\frac{1}{2}(48)(50)$.\n* $672$ — finding both legs but omitting the factor $\\frac{1}{2}$.\n* $14$ — stopping at the missing edge instead of computing the area.\n\n**Test Day Takeaway:** $\\frac{1}{2}bh$ for a right triangle uses the two legs; the hypotenuse only ever enters through the Pythagorean step.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-083",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The two legs of the bridge truss diagonal shown differ in length by $17$ meters, and the member's longest edge is $25$ meters. What area, in square meters, does the member enclose?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 7]], sideLabels: ["x + 17", "x", "25 m"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: stops at the longer leg, x + 17 = 24, instead of computing an area
      { id: "A", text: "$24$" },
      { id: "B", text: "$84$" },
      // distractor: uses the 25-meter hypotenuse as a leg: one half times 7 times 25
      { id: "C", text: "$87.5$" },
      // distractor: multiplies the two legs, 7 times 24, but omits the factor one half
      { id: "D", text: "$168$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**Choice B is correct.** Solving $x^2 + (x + 17)^2 = 25^2$ gives $x = 7$, so the legs are $7$ and $24$ and the area is $\\frac{1}{2}(7)(24) = 84$ square meters.\n\n**The Fast Way (~50s):** The only triple whose legs differ by $17$ with hypotenuse $25$ is $7$-$24$-$25$; the area is $\\frac{1}{2}(7)(24) = 84$.\n\n**The Full Solution:**\n\nStep 1: Let the shorter leg be $x$; the longer is $x + 17$, and the Pythagorean theorem gives $x^2 + (x + 17)^2 = 625$.\n\nStep 2: Expand: $2x^2 + 34x + 289 = 625$, so $2x^2 + 34x - 336 = 0$, or $x^2 + 17x - 168 = 0$, which factors as $(x + 24)(x - 7) = 0$.\n\nStep 3: A length must be positive, so $x = 7$ and the legs are $7$ and $24$ meters; the area is $\\frac{1}{2}(7)(24) = 84$ square meters. Check: $24 - 7 = 17$ and $7^2 + 24^2 = 625 = 25^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($24$): stops at the longer leg instead of computing an area.\n* Choice C ($87.5$): uses the $25$-meter hypotenuse as the second leg.\n* Choice D ($168$): multiplies the legs but forgets the factor $\\frac{1}{2}$.\n\n**Test Day Takeaway:** When a hypotenuse and a difference between legs are given, set up one quadratic in the shorter leg — the negative root is always the one to discard.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-084",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "hard",
    type: "fill-in",
    question: "In the burette stand shown, a diagonal stay reaches $2$ centimeters farther than the vertical post it braces, and the horizontal base measures $12$ centimeters. How many centimeters of tubing make up the triangle?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 35]], sideLabels: ["12 cm", "b", "b + 2"], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "84",
    explanation: "**SAT Pattern: Right Triangle — Pythagorean**\n\n**The correct answer is $84$.**\n\n**The Fast Way (~50s):** $12^2 + b^2 = (b + 2)^2$ collapses to $144 = 4b + 4$, so $b = 35$, the stay is $37$, and $12 + 35 + 37 = 84$.\n\n**The Full Solution:**\n\nStep 1: Let the post be $b$ centimeters; the stay is $b + 2$ and is the hypotenuse, so $12^2 + b^2 = (b + 2)^2$.\n\nStep 2: Expand the right side: $144 + b^2 = b^2 + 4b + 4$. The $b^2$ terms cancel, leaving $140 = 4b$, so $b = 35$ centimeters and the stay is $37$ centimeters.\n\nStep 3: The tubing follows all three sides: $12 + 35 + 37 = 84$ centimeters. Check: $12^2 + 35^2 = 144 + 1225 = 1369 = 37^2$.\n\n**Common Mistakes:**\n\n* $47$ — adding only the base and the post, $12 + 35$, and leaving out the stay.\n* $35$ — stopping at the post's length.\n* $210$ — computing the area $\\frac{1}{2}(12)(35)$ instead of the perimeter.\n\n**Test Day Takeaway:** When the hypotenuse is written as a leg plus a constant, the squared terms cancel and the Pythagorean equation becomes linear.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 6/3: cylinder-volume (7 items) =====
  // Bank already has bank-geo-035 (or thereabouts) for this pattern (1 item).
  // Adding 7 more for total of 8 (Tier 1 threshold).
  // Pattern: apply $V = \\pi r^2 h$ in forward, reverse, ratio, and rate
  // scenarios. 9 test occurrences across PT3, PT5, PT8, PT12 and friends.
  // SAT Pattern title (verbatim): 'Cylinder Volume' → 'cylinder-volume'.
  {
    id: "bank-geo-085",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A storm drain pipe of length $L$ meters has an inside diameter of $d$ meters. Which expression gives the number of cubic meters the pipe's interior holds?",
    choices: [
      { id: "A", text: "$\\frac{\\pi d^2 L}{4}$" },
      // distractor: squares d but halves only once, so the denominator is 2 instead of 4
      { id: "B", text: "$\\frac{\\pi d^2 L}{2}$" },
      // distractor: uses the diameter where the radius belongs
      { id: "C", text: "$\\pi d^2 L$" },
      // distractor: uses the lateral surface formula 2 pi r L with d in place of r
      { id: "D", text: "$2\\pi d L$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** With $r = \\frac{d}{2}$, $V = \\pi r^2 L = \\pi\\frac{d^2}{4}L = \\frac{\\pi d^2 L}{4}$.\n\n**The Full Solution:**\nStep 1: The pipe is a cylinder whose length $L$ plays the role of the height.\nStep 2: Its radius is half the inside diameter: $r = \\frac{d}{2}$ meters.\nStep 3: Substitute into $V = \\pi r^2 h$: $V = \\pi\\left(\\frac{d}{2}\\right)^2 L = \\frac{\\pi d^2 L}{4}$ cubic meters. Check: with $d = 2$ and $L = 5$ this gives $5\\pi$, matching $\\pi(1)^2(5)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: squares the $d$ but not the $2$, halving the denominator that should be $4$.\n* Choice C: substitutes the diameter directly for the radius, inflating the volume fourfold.\n* Choice D: uses $2\\pi r L$, which measures the pipe's curved surface, not the space inside it.\n\n**Test Day Takeaway:** Halving the diameter happens BEFORE squaring, so the $2$ becomes a $4$ in the denominator.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-086",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "fill-in",
    question: "A snare drum's shell is $6$ inches deep and $14$ inches across on the inside. The air it encloses occupies $k\\pi$ cubic inches. What is the value of $k$?",
    correctAnswer: "294",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $294$.**\n\n**The Fast Way (~20s):** The radius is $7$ inches, so $V = \\pi(7)^2(6) = 294\\pi$ and $k = 294$.\n\n**The Full Solution:**\nStep 1: The shell is $14$ inches across, so its inside radius is $r = 7$ inches, and the depth is the height, $h = 6$ inches.\nStep 2: Apply $V = \\pi r^2 h$: $V = \\pi(49)(6)$.\nStep 3: Multiply: $V = 294\\pi$ cubic inches, so $k = 294$. Check: $49 \\times 6 = 294$ ✓\n\n**Common Mistakes:**\n* $1176$ — uses the $14$-inch width as the radius, giving $196(6)$.\n* $84$ — computes the curved surface $2\\pi r h$ instead of the volume.\n* $98$ — applies the cone formula $\\frac{1}{3}\\pi r^2 h$ to a cylinder.\n\n**Test Day Takeaway:** \"Across\" means diameter — halve it before squaring, and keep the depth as the height.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-087",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cylindrical section of a lava tube has a radius of $r$ meters, a length of $h$ meters, and a volume of $V$ cubic meters. Which expression gives the volume of a section whose radius is $3r$ and whose length is $\\frac{h}{2}$?",
    choices: [
      // distractor: applies the factor 3 without squaring it, then halves
      { id: "A", text: "$\\frac{3V}{2}$" },
      // distractor: scales by the radius factor 3 only and ignores the halved length
      { id: "B", text: "$3V$" },
      { id: "C", text: "$\\frac{9V}{2}$" },
      // distractor: squares the radius factor but ignores the halved length
      { id: "D", text: "$9V$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Volume scales as radius squared times length, so the factor is $3^2 \\cdot \\frac{1}{2} = \\frac{9}{2}$.\n\n**The Full Solution:**\nStep 1: The original section has $V = \\pi r^2 h$.\nStep 2: The new section has volume $\\pi(3r)^2\\left(\\frac{h}{2}\\right) = \\pi \\cdot 9r^2 \\cdot \\frac{h}{2}$.\nStep 3: Factor out the original: $\\frac{9}{2}\\pi r^2 h = \\frac{9V}{2}$. Check: with $r = 1$, $h = 2$, $V = 2\\pi$, and the new section is $\\pi(9)(1) = 9\\pi = \\frac{9}{2}(2\\pi)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3V}{2}$): multiplies by $3$ rather than $3^2$, forgetting that the radius is squared.\n* Choice B ($3V$): scales only by the radius factor and never applies the halved length.\n* Choice D ($9V$): squares the radius factor correctly but leaves the length unchanged.\n\n**Test Day Takeaway:** In $\\pi r^2 h$ a radius factor enters squared and a height factor enters once — multiply the two effects.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-088",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "fill-in",
    question: "A cylindrical grain bin has a volume of $320\\pi$ cubic feet and a height of $5$ feet. What is the radius, in feet, of the bin?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~25s):** $320\\pi = \\pi r^2(5)$ gives $r^2 = 64$, so $r = 8$ feet.\n\n**The Full Solution:**\nStep 1: Substitute into $V = \\pi r^2 h$: $320\\pi = \\pi r^2 (5)$.\nStep 2: Divide both sides by $5\\pi$: $r^2 = \\frac{320}{5} = 64$.\nStep 3: $r = \\sqrt{64} = 8$ feet.\n\nCheck: $\\pi(8)^2(5) = 320\\pi$ cubic feet.\n\n**Common Mistakes:**\n* Answering $64$, which is $r^2$, by skipping the square root.\n* Answering $16$ by reporting the diameter instead of the radius.\n* Dividing $320$ by $5$ and then by $2$ to get $32$, treating $r^2$ as $2r$.\n\n**Test Day Takeaway:** Isolate $r^2$ first; only after the height and $\\pi$ are gone should you take the square root.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-089",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Right circular cylinders $A$ and $B$ have equal volumes. The radius of cylinder $A$ is $5$ inches and its height is $12$ inches. If the radius of cylinder $B$ is $10$ inches, what is its height, in inches?",
    choices: [
      { id: "A", text: "$3$" },
      { id: "B", text: "$6$" },
      { id: "C", text: "$24$" },
      { id: "D", text: "$48$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Cylinder $A$ holds $\\pi(5)^2(12) = 300\\pi$ cubic inches, so cylinder $B$ must satisfy $\\pi(10)^2 h = 300\\pi$, giving $h = 3$ inches.\n\n**The Full Solution:**\nStep 1: The volume of cylinder $A$ is $V = \\pi r^2 h = \\pi(5)^2(12) = 300\\pi$ cubic inches.\nStep 2: Cylinder $B$ has the same volume, so $\\pi(10)^2 h = 300\\pi$, which reduces to $100h = 300$.\nStep 3: $h = \\frac{300}{100} = 3$ inches.\n\nCheck: $\\pi(10)^2(3) = 300\\pi$ cubic inches, the same volume as cylinder $A$.\n\n**Why the wrong answers are tempting:**\n* Choice B ($6$): halves the height because the radius doubled, treating the volume as proportional to $r$ instead of to $r^2$.\n* Choice C ($24$): doubles the height along with the radius, scaling in the wrong direction.\n* Choice D ($48$): multiplies the height by $2^2 = 4$, applying the squared factor in the wrong direction.\n\n**Test Day Takeaway:** The radius enters a cylinder's volume squared, so doubling it forces the height down by a factor of $4$ — not $2$ — to keep the volume unchanged.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-090",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Two cylindrical columns in a parking structure have equal volumes. The first has radius $r$ and height $h$, and the second has radius $\\frac{2r}{3}$. Which expression gives the height of the second column?",
    choices: [
      // distractor: inverts the relationship, multiplying the height by 4/9 instead of 9/4
      { id: "A", text: "$\\frac{4h}{9}$" },
      // distractor: scales the height by the radius factor 2/3
      { id: "B", text: "$\\frac{2h}{3}$" },
      // distractor: uses the reciprocal factor 3/2 without squaring it
      { id: "C", text: "$\\frac{3h}{2}$" },
      { id: "D", text: "$\\frac{9h}{4}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** Equal volumes force $r^2 h$ to be constant, and the radius shrank by $\\frac{2}{3}$, so the height grows by $\\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4}$.\n\n**The Full Solution:**\nStep 1: Set the volumes equal: $\\pi r^2 h = \\pi\\left(\\frac{2r}{3}\\right)^2 H$, where $H$ is the second column's height.\nStep 2: Simplify the right side: $\\left(\\frac{2r}{3}\\right)^2 = \\frac{4r^2}{9}$, so $r^2 h = \\frac{4r^2}{9}H$.\nStep 3: Divide by $r^2$ and solve: $H = \\frac{9h}{4}$. Check: with $r = 3$ and $h = 4$ the first holds $36\\pi$, and the second has radius $2$ and height $9$, holding $36\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{4h}{9}$): multiplies by the radius-squared factor instead of dividing by it, shrinking a column that must grow.\n* Choice B ($\\frac{2h}{3}$): copies the radius factor onto the height and moves it the wrong way.\n* Choice C ($\\frac{3h}{2}$): inverts the factor but forgets that the radius appears squared.\n\n**Test Day Takeaway:** Constant volume means $r^2h$ is fixed — shrinking the radius by a factor multiplies the height by the SQUARE of its reciprocal.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-091",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "hard",
    type: "fill-in",
    question: "Sediment accumulates in a cylindrical trap of radius $6$ centimeters at a constant rate of $54\\pi$ cubic centimeters per week. The trap already holds a sediment column $3$ centimeters deep. After how many more weeks will the column stand $12$ centimeters deep?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~40s):** The column must rise $9$ centimeters, which takes $\\pi(36)(9) = 324\\pi$ cubic centimeters, and $\\frac{324\\pi}{54\\pi} = 6$ weeks.\n\n**The Full Solution:**\nStep 1: The depth must increase from $3$ centimeters to $12$ centimeters, a rise of $9$ centimeters.\nStep 2: That rise takes $V = \\pi r^2 \\Delta h = \\pi(6)^2(9) = 324\\pi$ cubic centimeters of sediment.\nStep 3: At $54\\pi$ cubic centimeters per week the wait is $\\frac{324\\pi}{54\\pi} = 6$ weeks. Check: $6$ weeks deliver $324\\pi$, which spread over the $36\\pi$-square-centimeter base adds exactly $9$ centimeters ✓\n\n**Common Mistakes:**\n* $8$ — ignores the sediment already present and fills the full $12$-centimeter column, $\\frac{432\\pi}{54\\pi}$.\n* $24$ — uses the diameter $12$ as the radius, computing $\\frac{1{,}296\\pi}{54\\pi}$.\n* $9$ — reports the rise in centimeters rather than the number of weeks.\n\n**Test Day Takeaway:** A rate question about a cylinder is about the CHANGE in volume — multiply the base area by the change in depth, not by the final depth.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 9/1: triangle-angle-sum (7 items) =====
  // Bank already has 2 items (bank-geo-001 easy, bank-geo-026 medium).
  // Adding 7 reaches 9 — clear of TIER1_PATTERN_THRESHOLD = 8.
  // 5 test occurrences across M2Easy variants.
  {
    id: "bank-geo-092",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The window of a sleeper cabin is the triangle in the figure, where the degree measure at each corner is given. What is the value of $x$?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["x°", "(x+20)°", "(2x-40)°"], figureNote: true } },
    choices: [
      // distractor: uses 120 for the angle sum, solving 4x - 20 = 120
      { id: "A", text: "$35$" },
      // distractor: moves the -20 to the left as +20, solving 4x + 20 = 180
      { id: "B", text: "$40$" },
      // distractor: drops the constants entirely, solving 4x = 180
      { id: "C", text: "$45$" },
      { id: "D", text: "$50$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** $x+(x+20)+(2x-40)=4x-20=180$, so $x=50$.\n\n**The Full Solution:**\n\nStep 1 — Set the sum of the three marked measures equal to $180$: $x+(x+20)+(2x-40)=180$.\n\nStep 2 — Combine like terms: $4x-20=180$.\n\nStep 3 — Add $20$ and divide by $4$: $4x=200$, so $x=50$. Check: the three angles measure $50$, $70$, and $60$ degrees, and $50+70+60=180$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($35$): this uses $120$ as the angle sum instead of $180$.\n* Choice B ($40$): this solves $4x+20=180$, flipping the sign of the constant.\n* Choice C ($45$): this drops both constants and solves $4x=180$.\n\n**Test Day Takeaway:** Collect every constant on the left before moving anything — the $+20$ and $-40$ combine to a single $-20$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-093",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "easy",
    type: "fill-in",
    question: "A tailor cuts the sleeve dart drawn in the figure, and the dart's three corners carry the degree measures shown. What is the value of $y$?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["(3y)°", "(y+12)°", "(2y-30)°"], figureNote: true } },
    correctAnswer: "33",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $33$.**\n\n**The Fast Way (~25s):** $3y+(y+12)+(2y-30)=6y-18=180$, so $y=33$.\n\n**The Full Solution:**\n\nStep 1 — The three corner measures add to $180$ degrees: $3y+(y+12)+(2y-30)=180$.\n\nStep 2 — Combine like terms: $6y-18=180$.\n\nStep 3 — Add $18$ and divide by $6$: $6y=198$, so $y=33$. Check: the angles measure $99$, $45$, and $36$ degrees, and $99+45+36=180$.\n\n**Common Mistakes:** Solving $6y=180$ ignores the constants and gives $30$. Solving $6y+18=180$ flips the sign and gives $27$. Answering $99$ reports the largest angle rather than $y$.\n\n**Test Day Takeaway:** Combine the variable terms and the constants separately, then perform one addition and one division.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-094",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A vial label is cut in the triangular shape shown, with each angle measure in degrees. How many degrees are in the label's largest angle?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["(4t)°", "(t+15)°", "(2t+25)°"], figureNote: true } },
    choices: [
      // distractor: reports t itself instead of an angle measure
      { id: "A", text: "$20$" },
      // distractor: gives t + 15 = 35, the smallest of the three angles
      { id: "B", text: "$35$" },
      // distractor: gives 2t + 25 = 65, the middle angle
      { id: "C", text: "$65$" },
      { id: "D", text: "$80$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** $4t+(t+15)+(2t+25)=7t+40=180$, so $t=20$ and the largest angle is $4t=80$ degrees.\n\n**The Full Solution:**\n\nStep 1 — Add the three marked measures and set the total to $180$: $4t+(t+15)+(2t+25)=180$.\n\nStep 2 — Combine like terms: $7t+40=180$, so $7t=140$ and $t=20$.\n\nStep 3 — Evaluate each angle: $4t=80$, $t+15=35$, and $2t+25=65$ degrees. The largest is $80$ degrees. Check: $80+35+65=180$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($20$): this reports $t$, which is not an angle measure here.\n* Choice B ($35$): this is $t+15$, the smallest angle.\n* Choice C ($65$): this is $2t+25$, the middle angle.\n\n**Test Day Takeaway:** Solving for the variable is only half the work — evaluate every expression and reread which angle the question wants.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-095",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "fill-in",
    question: "In right triangle $DEF$ shown, angle $E$ is the right angle and the measure of angle $D$ is $4$ times the measure of angle $F$. What is the measure, in degrees, of angle $F$?",
    diagram: { type: "rightTriangle", params: { labels: ["D", "E", "F"], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "18",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $18$.**\n\n**The Fast Way (~30s):** The two acute angles sum to $90°$, so $4f + f = 90$ gives $f = 18$ degrees.\n\n**The Full Solution:**\nStep 1: Angle $E$ measures $90°$, so angles $D$ and $F$ together measure $180 - 90 = 90$ degrees.\nStep 2: Let angle $F$ measure $f$ degrees; then angle $D$ measures $4f$ degrees, and $4f + f = 90$.\nStep 3: $5f = 90$, so $f = 18$ degrees.\n\nCheck: angle $D$ measures $72°$, and $90 + 72 + 18 = 180$.\n\n**Common Mistakes:**\n* Using $180$ instead of $90$ for the two acute angles, which gives $5f = 180$ and $f = 36$.\n* Answering $72$, the measure of angle $D$, instead of angle $F$.\n* Splitting the $90°$ evenly and answering $45$, which ignores the $4$-to-$1$ relationship.\n\n**Test Day Takeaway:** In a right triangle the two acute angles are complementary, so set their expressions equal to $90°$, not $180°$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-096",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A quilter drafts the triangular block shown, whose three angle measures in degrees form an arithmetic sequence with a positive common difference $d$. What is the measure, in degrees, of the block's middle angle?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["x°", "(x+d)°", "(x+2d)°"], figureNote: true } },
    choices: [
      // distractor: divides 180 by 4 rather than by the three angles present
      { id: "A", text: "$45$" },
      { id: "B", text: "$60$" },
      // distractor: assumes the middle angle of such a block must be a right angle
      { id: "C", text: "$90$" },
      // distractor: divides 360 by 3, using the sum of a quadrilateral's angles
      { id: "D", text: "$120$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The three measures sum to $3x+3d=180$, so $x+d=60$, and $x+d$ is the middle angle.\n\n**The Full Solution:**\n\nStep 1 — Write the sum: $x+(x+d)+(x+2d)=3x+3d=180$.\n\nStep 2 — Divide by $3$: $x+d=60$.\n\nStep 3 — Because the three terms increase by $d$ each time, the middle term is $x+d$, so the middle angle measures $60$ degrees regardless of $d$. Check with $d=10$: the angles are $50$, $60$, and $70$, summing to $180$; with $d=25$ they are $15$, $60$, and $105$, also summing to $180$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($45$): this divides $180$ by $4$, counting a fourth angle that does not exist.\n* Choice C ($90$): this assumes the middle angle must be a right angle, which the arithmetic sequence never requires.\n* Choice D ($120$): this divides $360$, the angle sum of a quadrilateral, by $3$.\n\n**Test Day Takeaway:** In any three-term arithmetic sequence the middle term equals the average — here the average of the three angles is always $60$ degrees.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-097",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A footbridge bracket plate has the shape drawn in the figure, with each corner's measure in degrees. Which of the following correctly orders the lengths of the plate's three sides?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["(x+10)°", "(2x)°", "(3x-40)°"], vertexLabels: ["A", "B", "C"], figureNote: true } },
    choices: [
      { id: "A", text: "$BC < AB < CA$" },
      // distractor: swaps the two shortest sides, pairing angle B with side AB
      { id: "B", text: "$AB < BC < CA$" },
      // distractor: swaps the two longest sides, pairing angle C with side CA
      { id: "C", text: "$BC < CA < AB$" },
      // distractor: reverses the whole order, matching the largest angle to the shortest side
      { id: "D", text: "$CA < AB < BC$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**Choice A is correct.**\n\n**The Fast Way (~50s):** $(x+10)+2x+(3x-40)=6x-30=180$ gives $x=35$, so the angles are $A=45^\\circ$, $B=70^\\circ$, $C=65^\\circ$; the sides opposite them rank $BC<AB<CA$.\n\n**The Full Solution:**\n\nStep 1 — Find $x$: $(x+10)+2x+(3x-40)=6x-30=180$, so $6x=210$ and $x=35$.\n\nStep 2 — Evaluate the angles: $\\angle A=35+10=45^\\circ$, $\\angle B=2(35)=70^\\circ$, and $\\angle C=3(35)-40=65^\\circ$. Check: $45+70+65=180$.\n\nStep 3 — In any triangle the longest side lies opposite the largest angle. Side $\\overline{BC}$ is opposite $\\angle A$, side $\\overline{CA}$ is opposite $\\angle B$, and side $\\overline{AB}$ is opposite $\\angle C$. Ordering the angles $45<65<70$ gives $BC<AB<CA$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($AB<BC<CA$): this pairs $\\angle B$ with side $\\overline{AB}$ instead of the side across from it.\n* Choice C ($BC<CA<AB$): this swaps the two longest sides, matching $\\angle C$ with $\\overline{CA}$.\n* Choice D ($CA<AB<BC$): this reverses the rule, putting the shortest side opposite the largest angle.\n\n**Test Day Takeaway:** Each side is named by the two letters that are not its opposite angle — write those pairings down before ranking anything.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-098",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "hard",
    type: "fill-in",
    question: "In isosceles triangle $JKL$, side $\\overline{JK}$ is congruent to side $\\overline{JL}$, and the measure of angle $K$ is twice the measure of angle $J$. What is the measure, in degrees, of angle $J$?",
    correctAnswer: "36",
    explanation: "**SAT Pattern: Triangle Angle Sum**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~50s):** Because $\\overline{JK} \\cong \\overline{JL}$, angles $K$ and $L$ are the congruent base angles, each twice angle $J$. Then $j + 2j + 2j = 180$, so $j = 36$ degrees.\n\n**The Full Solution:**\nStep 1: In a triangle, congruent sides are opposite congruent angles. Sides $\\overline{JK}$ and $\\overline{JL}$ are opposite angles $L$ and $K$, so angle $K$ and angle $L$ have equal measure.\nStep 2: Let angle $J$ measure $j$ degrees. Angle $K$ measures $2j$, and angle $L$ also measures $2j$.\nStep 3: $j + 2j + 2j = 5j = 180$, so $j = 36$ degrees.\n\n```seva-figure\n{\"type\": \"triangleWithAngles\", \"params\": {\"vertexLabels\": [\"J\", \"K\", \"L\"], \"angleLabels\": [\"36°\", \"72°\", \"72°\"], \"figureNote\": true}, \"caption\": \"Angle J is 36 degrees and each base angle is 72 degrees.\"}\n```\n\nCheck: $36 + 72 + 72 = 180$, and the two base angles are equal as required.\n\n**Common Mistakes:**\n* Treating angle $K$ as the vertex angle and angles $J$ and $L$ as the base pair, which gives $j + j + 2j = 180$ and the answer $45$.\n* Answering $72$, the measure of a base angle, instead of angle $J$.\n* Dividing $180$ by $3$ and answering $60$, which would require an equilateral triangle.\n\n**Test Day Takeaway:** In an isosceles triangle, find the congruent angles from the congruent SIDES first — they sit opposite those sides, not next to them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-angle-sum",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 10/6: circle-in-standard-form (8 items) =====
  // 5 test occurrences. Title verbatim: 'Circle in Standard Form'.
  {
    id: "bank-geo-099",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The table gives equations modeling the edge of the head of four timpani in the $xy$-plane, where $x$ and $y$ are in centimeters. What is the radius, in centimeters, of the head of drum $T_2$?",
    questionTable: { headers: ["Drum", "Equation of the head's edge"], rows: [["$T_1$", "$(x - 4)^2 + (y + 7)^2 = 81$"], ["$T_2$", "$(x + 5)^2 + (y - 2)^2 = 64$"], ["$T_3$", "$(x - 1)^2 + (y + 3)^2 = 100$"], ["$T_4$", "$(x + 6)^2 + (y + 1)^2 = 49$"]] },
    choices: [
      // distractor: reads the 5 inside (x + 5) squared as the radius
      { id: "A", text: "$5$" },
      { id: "B", text: "$8$" },
      // distractor: reports the diameter, 2 times 8
      { id: "C", text: "$16$" },
      // distractor: reports r squared, 64, without taking the square root
      { id: "D", text: "$64$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** In $(x - h)^2 + (y - k)^2 = r^2$ the right side is $r^2$, so drum $T_2$ has $r = \\sqrt{64} = 8$ centimeters.\n\n**The Full Solution:**\nStep 1: Read the row for $T_2$: $(x + 5)^2 + (y - 2)^2 = 64$.\nStep 2: Match it to $(x - h)^2 + (y - k)^2 = r^2$, so $h = -5$, $k = 2$, and $r^2 = 64$.\nStep 3: Take the positive square root: $r = 8$ centimeters. Check: the point $(3, 2)$ satisfies $(3 + 5)^2 + 0 = 64$, and it is $8$ centimeters from the center $(-5, 2)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): grabs the $5$ inside the parentheses, which locates the center, not the rim.\n* Choice C ($16$): reports the diameter, $2r$, instead of the radius.\n* Choice D ($64$): reports $r^2$ directly off the right side of the equation.\n\n**Test Day Takeaway:** Numbers inside the parentheses set the center; the number alone on the right is $r^2$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-100",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "fill-in",
    question: "Charted in meters, a reef flat fills the disk bounded by $(x - 12)^2 + (y + 5)^2 = 196$. A survey line crosses the reef flat from west to east through its center. What length, in meters, of the survey line lies over the reef flat?",
    correctAnswer: "28",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $28$.**\n\n**The Fast Way (~15s):** The right side is $r^2 = 196$, so $r = 14$; a line through the center cuts a diameter, $2(14) = 28$ meters.\n\n**The Full Solution:**\nStep 1: Compare $(x - 12)^2 + (y + 5)^2 = 196$ with $(x - h)^2 + (y - k)^2 = r^2$: the center is $(12, -5)$ and $r^2 = 196$.\nStep 2: Take the square root: $r = 14$ meters.\nStep 3: The longest chord of a circle is the one through the center, so the survey line covers a diameter of $2(14) = 28$ meters. Check: the line $y = -5$ meets the boundary where $(x - 12)^2 = 196$, at $x = -2$ and $x = 26$, and $26 - (-2) = 28$ ✓\n\n**Common Mistakes:**\n* $14$ — reports the radius instead of the full chord through the center.\n* $196$ — uses $r^2$ as though it were the radius.\n* $7$ — halves the radius, treating $14$ as the diameter.\n\n**Test Day Takeaway:** A chord through the center is a diameter; convert $r^2$ to $r$ first, then double it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-101",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A surveyor records the center of a roundabout and one point on its curb, as listed in the table, where coordinates are in meters. Which equation models the curb in the $xy$-plane?",
    questionTable: { headers: ["Location", "Coordinates"], rows: [["Center of roundabout", "$(6, -2)$"], ["Point on curb", "$(6, 7)$"]] },
    choices: [
      // distractor: puts the radius 9 on the right side instead of r squared = 81
      { id: "A", text: "$(x - 6)^2 + (y + 2)^2 = 9$" },
      // distractor: flips the sign of the center's x-coordinate, writing (x + 6) squared
      { id: "B", text: "$(x + 6)^2 + (y + 2)^2 = 81$" },
      { id: "C", text: "$(x - 6)^2 + (y + 2)^2 = 81$" },
      // distractor: flips the sign of the center's y-coordinate, writing (y - 2) squared
      { id: "D", text: "$(x - 6)^2 + (y - 2)^2 = 81$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The two points share $x = 6$, so $r = 7 - (-2) = 9$; with center $(6, -2)$ the curb is $(x - 6)^2 + (y + 2)^2 = 81$.\n\n**The Full Solution:**\nStep 1: The radius is the distance from the center to any curb point: $\\sqrt{(6 - 6)^2 + (7 - (-2))^2} = \\sqrt{81} = 9$ meters.\nStep 2: Standard form is $(x - h)^2 + (y - k)^2 = r^2$ with $(h, k) = (6, -2)$, so the parentheses read $(x - 6)^2$ and $(y + 2)^2$.\nStep 3: The right side is $r^2 = 9^2 = 81$, giving $(x - 6)^2 + (y + 2)^2 = 81$. Check: substituting $(6, 7)$ gives $0 + 81 = 81$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: places $r = 9$ on the right side; standard form needs $r^2 = 81$.\n* Choice B: writes $(x + 6)^2$, which would put the center at $x = -6$.\n* Choice D: writes $(y - 2)^2$, which would put the center at $y = 2$ instead of $y = -2$.\n\n**Test Day Takeaway:** Subtract the center's coordinates inside the parentheses — a negative coordinate becomes a plus sign — and square the radius on the right.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-102",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "A circle in the $xy$-plane has the equation $(x + 3)^2 + (y - 10)^2 = 121$. What is the difference when the radius of the circle is subtracted from the $y$-coordinate of its center?",
    correctAnswer: "-1",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $-1$.**\n\n**The Fast Way (~30s):** The center is $(-3, 10)$ and the radius is $\\sqrt{121} = 11$, so the requested difference is $10 - 11 = -1$.\n\n**The Full Solution:**\nStep 1: Match the equation to $(x - h)^2 + (y - k)^2 = r^2$. From $(y - 10)^2$, the center's $y$-coordinate is $k = 10$.\nStep 2: The right side gives $r^2 = 121$, so $r = 11$.\nStep 3: Subtract the radius from $k$: $10 - 11 = -1$.\n\nCheck: the lowest point of this circle is at $y = 10 - 11 = -1$, which is exactly the value computed.\n\n**Common Mistakes:**\n* Using $r^2 = 121$ instead of $r = 11$, which gives $10 - 121 = -111$.\n* Subtracting in the other order and answering $1$.\n* Using the $x$-coordinate $-3$ of the center, which gives $-3 - 11 = -14$.\n\n**Test Day Takeaway:** Extract $h$, $k$, and $r$ separately before combining them, and take the square root of the right side exactly once.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-103",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A sinkhole's rim is modeled in the $xy$-plane by $(x - 9)^2 + (y - 4)^2 = r^2$, and the figure shows the horizontal and vertical offsets, in meters, from the sinkhole's center to a monitoring post on the rim. What is the value of $r^2$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [8, 0], [8, 6]], sideLabels: ["8", "6", "r"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports r = 10 instead of r squared
      { id: "A", text: "$10$" },
      // distractor: adds the two offsets, 8 + 6 = 14, instead of using the Pythagorean theorem
      { id: "B", text: "$14$" },
      { id: "C", text: "$100$" },
      // distractor: squares the sum of the offsets, (8 + 6) squared = 196
      { id: "D", text: "$196$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The radius is the hypotenuse of the offset triangle, so $r^2 = 8^2 + 6^2 = 100$.\n\n**The Full Solution:**\nStep 1: The monitoring post sits $8$ meters horizontally and $6$ meters vertically from the center $(9, 4)$, so it is at $(17, 10)$.\nStep 2: In standard form the right side is $r^2$, and $r^2$ equals the squared distance from the center to any rim point: $(17 - 9)^2 + (10 - 4)^2$.\nStep 3: Evaluate: $64 + 36 = 100$, so $r^2 = 100$ and the rim's radius is $10$ meters. Check: $(x - 9)^2 + (y - 4)^2 = 100$ does contain $(17, 10)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): computes the radius correctly but reports $r$ when the question asks for $r^2$.\n* Choice B ($14$): adds the legs, $8 + 6$, treating the offsets as if they lay along one line.\n* Choice D ($196$): squares the sum of the legs, $(8 + 6)^2$, instead of summing the squares.\n\n**Test Day Takeaway:** The right side of standard form is the squared distance from the center — sum the squared offsets, and read the question to see whether it wants $r$ or $r^2$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-104",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "The groove boundary of a lacquer master disc is modeled in the $xy$-plane by $(x - 7)^2 + (y + a)^2 = 169$, where $a$ is a constant and units are centimeters. The lowest point of the boundary is at $y = -21$. What is the value of $a$?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~25s):** The center sits at $(7, -a)$ with radius $13$, and the lowest point is $13$ below the center: $-a - 13 = -21$, so $a = 8$.\n\n**The Full Solution:**\nStep 1: Match $(x - 7)^2 + (y + a)^2 = 169$ to standard form. The center is $(7, -a)$ and $r = \\sqrt{169} = 13$ centimeters.\nStep 2: The lowest point of a circle lies directly below the center, at $y = -a - 13$. Setting this equal to $-21$ gives $-a - 13 = -21$.\nStep 3: Solve: $-a = -8$, so $a = 8$. Check: with $a = 8$ the center is $(7, -8)$ and the lowest point is $-8 - 13 = -21$ ✓\n\n**Common Mistakes:**\n* $34$ — adds the radius instead of subtracting, solving $-a + 13 = -21$.\n* $-8$ — reads the center's $y$-coordinate as $a$ rather than $-a$.\n* $21$ — ignores the radius and sets $-a = -21$, which locates the center rather than the lowest point.\n\n**Test Day Takeaway:** In $(y + a)^2$ the center's $y$-coordinate is $-a$; extreme points sit exactly one radius above or below that value.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-105",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The rim of a plaza fountain is modeled in the $xy$-plane by $(x - 5)^2 + (y + 9)^2 = 128$, with units in feet, and square planter $ABCD$ is inscribed in the rim as shown. What is the area, in square feet, of the planter?",
    diagram: { type: "circleWithSquare", params: { labels: { A: "A", B: "B", C: "C", D: "D", O: "O" }, showDiagonals: true } },
    choices: [
      // distractor: reports the planter's perimeter, 4 times 16, instead of its area
      { id: "A", text: "$64$" },
      // distractor: uses the radius as the side length, giving r squared = 128
      { id: "B", text: "$128$" },
      { id: "C", text: "$256$" },
      // distractor: uses the diameter as the side length, giving (2r) squared = 512
      { id: "D", text: "$512$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** A square inscribed in a circle has diagonal $2r$, so its area is $\\frac{(2r)^2}{2} = 2r^2 = 2(128) = 256$ square feet.\n\n**The Full Solution:**\nStep 1: The right side of standard form is $r^2$, so $r^2 = 128$ and $r = 8\\sqrt{2}$ feet.\nStep 2: The planter's diagonal is a diameter, $2r = 16\\sqrt{2}$ feet, so its side is $\\frac{16\\sqrt{2}}{\\sqrt{2}} = 16$ feet.\nStep 3: The area is $16^2 = 256$ square feet. Check: a $16$-foot square has diagonal $16\\sqrt{2} \\approx 22.6$ feet, and $2r = 2\\sqrt{128} \\approx 22.6$ feet ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($64$): computes the perimeter $4(16)$ and reports it as an area.\n* Choice B ($128$): uses the radius as the side of the square, so the area comes out as $r^2$.\n* Choice D ($512$): uses the diameter as the side, giving $(2r)^2 = 4r^2$ — that square would not fit inside the rim.\n\n**Test Day Takeaway:** For a square inscribed in a circle the diameter is the DIAGONAL, not the side; divide by $\\sqrt{2}$ before squaring.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-106",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "fill-in",
    question: "A hydrothermal vent field is mapped in the $xy$-plane by $(x + 6)^2 + (y - 8)^2 = 400$, where coordinates give meters east and north of a fixed marker at the origin. What is the greatest distance, in meters, from the marker to a point of the field?",
    correctAnswer: "30",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~30s):** The marker is $\\sqrt{(-6)^2 + 8^2} = 10$ meters from the center, and the field has radius $20$, so the far edge is $10 + 20 = 30$ meters away.\n\n**The Full Solution:**\nStep 1: Standard form gives center $(-6, 8)$ and $r = \\sqrt{400} = 20$ meters.\nStep 2: The distance from the origin to the center is $\\sqrt{36 + 64} = \\sqrt{100} = 10$ meters, so the marker lies inside the field.\nStep 3: The farthest point of a disk from any interior point lies on the ray through the center, at distance $10 + 20 = 30$ meters. Check: that point is $(-6, 8)$ pushed $20$ meters farther along the same ray, at $(-18, 24)$, and $\\sqrt{324 + 576} = 30$ ✓\n\n**Common Mistakes:**\n* $20$ — reports the radius, which measures from the center rather than from the marker.\n* $10$ — reports the shortest distance, $20 - 10$, instead of the greatest.\n* $400$ — uses $r^2$ in place of $r$.\n\n**Test Day Takeaway:** Measure from the reference point to the center first — the farthest point of the disk is that distance plus the radius, and the nearest is the difference between them.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 13/1: soh-cah-toa-in-a-3-4-5-triangle (8 items) =====
  {
    id: "bank-geo-107",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A syringe stand's brace is right triangle $XYZ$ shown, with the right angle at $Y$ and every length in centimeters. What is the value of $\\cos(\\angle X)$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 9]], labels: ["X", "Y", "Z"], sideLabels: ["12", "9", "15"], rightAngleVertex: 1 } },
    choices: [
      // distractor: gives sin(X) = 9/15 = 3/5, using the opposite leg
      { id: "A", text: "$\\frac{3}{5}$" },
      // distractor: gives tan(X) = 9/12 = 3/4
      { id: "B", text: "$\\frac{3}{4}$" },
      { id: "C", text: "$\\frac{4}{5}$" },
      // distractor: inverts tan(X), dividing the adjacent leg by the opposite leg
      { id: "D", text: "$\\frac{4}{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The sides $9$, $12$, $15$ are a $3$-$4$-$5$ triangle tripled; cosine is adjacent over hypotenuse, so $\\cos(\\angle X)=\\frac{12}{15}=\\frac{4}{5}$.\n\n**The Full Solution:**\n\nStep 1 — The right angle sits at $Y$, so $\\overline{ZX}=15$ centimeters is the hypotenuse.\n\nStep 2 — The leg adjacent to $\\angle X$ is $\\overline{XY}=12$ centimeters, and the leg opposite is $\\overline{YZ}=9$ centimeters.\n\nStep 3 — Apply CAH: $\\cos(\\angle X)=\\frac{12}{15}=\\frac{4}{5}$. Check: $9^2+12^2=81+144=225=15^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{3}{5}$): this is $\\sin(\\angle X)=\\frac{9}{15}$, built from the opposite leg.\n* Choice B ($\\frac{3}{4}$): this is $\\tan(\\angle X)=\\frac{9}{12}$, leaving the hypotenuse out entirely.\n* Choice D ($\\frac{4}{3}$): this flips $\\tan(\\angle X)$, dividing $12$ by $9$.\n\n**Test Day Takeaway:** In any $3$-$4$-$5$ triangle the three ratios are $\\frac{3}{5}$, $\\frac{4}{5}$, and $\\frac{3}{4}$ — knowing which is which saves the whole computation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-108",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "easy",
    type: "fill-in",
    question: "A quilter's set square appears in the figure as right triangle $TUV$; the two legs are labeled in inches and the sloped edge is not. What is the value of $\\sin(\\angle T)$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [20, 0], [20, 15]], labels: ["T", "U", "V"], sideLabels: ["20", "15", ""], rightAngleVertex: 1 } },
    correctAnswer: "0.6",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**The correct answer is $0.6$.**\n\n**The Fast Way (~20s):** Legs $15$ and $20$ are a $3$-$4$-$5$ triangle scaled by $5$, so the hypotenuse is $25$ and $\\sin(\\angle T)=\\frac{15}{25}=0.6$.\n\n**The Full Solution:**\n\nStep 1 — Find the hypotenuse. With the right angle at $U$, $TV=\\sqrt{20^2+15^2}=\\sqrt{400+225}=\\sqrt{625}=25$ inches.\n\nStep 2 — Identify the opposite leg. Across the triangle from $\\angle T$ lies $\\overline{UV}=15$ inches.\n\nStep 3 — Apply SOH: $\\sin(\\angle T)=\\frac{15}{25}=\\frac{3}{5}=0.6$. Check: $\\cos(\\angle T)=\\frac{20}{25}=0.8$, and $0.6^2+0.8^2=1$.\n\n**Common Mistakes:** Answering $0.8$ uses the adjacent leg and gives the cosine. Answering $0.75$ divides leg by leg and gives the tangent. Treating the labeled $20$ as the hypotenuse gives $\\frac{15}{20}=0.75$ as well, which is why finding the hypotenuse first matters.\n\n**Test Day Takeaway:** When two legs are given, compute the hypotenuse before choosing a ratio — a $15$-$20$-$25$ triangle is just $3$-$4$-$5$ in disguise.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-109",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The figure gives two of the three sides, in centimeters, of right triangular window frame $ABC$ from a funicular car. What is the value of $\\tan(\\angle A)$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [32, 0], [32, 24]], labels: ["A", "B", "C"], sideLabels: ["", "24", "40"], rightAngleVertex: 1 } },
    choices: [
      // distractor: gives sin(A) = 24/40 = 3/5 instead of the tangent
      { id: "A", text: "$\\frac{3}{5}$" },
      { id: "B", text: "$\\frac{3}{4}$" },
      // distractor: gives cos(A) = 32/40 = 4/5
      { id: "C", text: "$\\frac{4}{5}$" },
      // distractor: gives tan(C) = 32/24 = 4/3, the tangent of the other acute angle
      { id: "D", text: "$\\frac{4}{3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The missing leg is $\\sqrt{40^2-24^2}=32$, so $\\tan(\\angle A)=\\frac{24}{32}=\\frac{3}{4}$.\n\n**The Full Solution:**\n\nStep 1 — The right angle is at $B$, so $\\overline{CA}=40$ centimeters is the hypotenuse and $\\overline{AB}$ is the unlabeled leg.\n\nStep 2 — Find it: $AB=\\sqrt{40^2-24^2}=\\sqrt{1600-576}=\\sqrt{1024}=32$ centimeters. The sides $24$-$32$-$40$ are a $3$-$4$-$5$ triangle scaled by $8$.\n\nStep 3 — Apply TOA: $\\tan(\\angle A)=\\frac{\\text{opposite}}{\\text{adjacent}}=\\frac{24}{32}=\\frac{3}{4}$. Check: $24^2+32^2=576+1024=1600=40^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{3}{5}$): this is $\\sin(\\angle A)=\\frac{24}{40}$, which uses the hypotenuse instead of the adjacent leg.\n* Choice C ($\\frac{4}{5}$): this is $\\cos(\\angle A)=\\frac{32}{40}$.\n* Choice D ($\\frac{4}{3}$): this is $\\tan(\\angle C)$, the tangent of the other acute angle.\n\n**Test Day Takeaway:** Tangent never touches the hypotenuse — if the hypotenuse appears in your fraction, you have picked the wrong ratio.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-110",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "fill-in",
    question: "In right triangle $PQR$ shown, angle $Q$ is the right angle, $PQ = 45$, and $QR = 60$. What is the value of $\\tan P$? Express your answer as a fraction.",
    diagram: { type: "rightTriangle", params: { labels: ["P", "Q", "R"], sideLabels: ["45", "60", ""], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "4/3",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**The correct answer is $\\frac{4}{3}$.**\n\n**The Fast Way (~25s):** Tangent uses only the legs: opposite angle $P$ is $QR = 60$ and adjacent is $PQ = 45$, so $\\tan P = \\frac{60}{45} = \\frac{4}{3}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $Q$, so $\\overline{PQ}$ and $\\overline{QR}$ are the legs.\nStep 2: Relative to angle $P$, the opposite leg is $\\overline{QR} = 60$ and the adjacent leg is $\\overline{PQ} = 45$.\nStep 3: $\\tan P = \\frac{60}{45} = \\frac{4}{3}$.\n\nCheck: the hypotenuse is $\\sqrt{45^2 + 60^2} = \\sqrt{5{,}625} = 75$, so the sides are the $3$-$4$-$5$ triple scaled by $15$.\n\n**Common Mistakes:**\n* Answering $\\frac{3}{4}$ by dividing adjacent by opposite, which gives the tangent of the other acute angle.\n* Answering $\\frac{4}{5}$ by computing $\\frac{60}{75}$, the sine of angle $P$.\n* Computing the hypotenuse and using it in the tangent, which the tangent ratio never involves.\n\n**Test Day Takeaway:** If a right-triangle question asks only for a tangent, you never need the hypotenuse — stop after the two legs.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-111",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A pharmacy technician cuts a triangular splash guard in the shape of right triangle $RST$ with the right angle at $S$. The horizontal edge $\\overline{RS}$ measures $24$ centimeters, the vertical edge $\\overline{ST}$ measures $18$ centimeters, and the guard's sloped edge runs from $R$ to $T$. Which expression is equal to $\\cos(\\angle R)$?",
    choices: [
      // distractor: sin(R) = 18/30 = 3/5, not 4/5; sine and cosine of the same angle are not equal here
      { id: "A", text: "$\\sin(\\angle R)$" },
      { id: "B", text: "$\\sin(\\angle T)$" },
      // distractor: tan(R) = 18/24 = 3/4, which drops the hypotenuse from the ratio
      { id: "C", text: "$\\tan(\\angle R)$" },
      // distractor: tan(T) = 24/18 = 4/3, a value greater than 1 and therefore never a cosine
      { id: "D", text: "$\\tan(\\angle T)$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** $\\angle R$ and $\\angle T$ are complementary, and the cosine of an angle equals the sine of its complement, so $\\cos(\\angle R)=\\sin(\\angle T)$.\n\n**The Full Solution:**\n\nStep 1 — Find the hypotenuse: $RT=\\sqrt{24^2+18^2}=\\sqrt{576+324}=\\sqrt{900}=30$ centimeters, a $3$-$4$-$5$ triangle scaled by $6$.\n\nStep 2 — Evaluate the target: $\\cos(\\angle R)=\\frac{RS}{RT}=\\frac{24}{30}=\\frac{4}{5}$.\n\nStep 3 — Test the choices: $\\sin(\\angle T)=\\frac{RS}{RT}=\\frac{24}{30}=\\frac{4}{5}$, the same value. Check: $\\angle R+\\angle T=90^\\circ$, so the complement relationship holds for every right triangle, not just this one.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\sin(\\angle R)$): this equals $\\frac{18}{30}=\\frac{3}{5}$, the ratio built from the opposite leg.\n* Choice C ($\\tan(\\angle R)$): this equals $\\frac{18}{24}=\\frac{3}{4}$ and leaves the hypotenuse out of the ratio.\n* Choice D ($\\tan(\\angle T)$): this equals $\\frac{24}{18}=\\frac{4}{3}$, larger than $1$ and so never equal to a cosine.\n\n**Test Day Takeaway:** In a right triangle the two acute angles are complements, so $\\cos$ of one always equals $\\sin$ of the other.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-112",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "fill-in",
    question: "A right triangle has side lengths $15$, $20$, and $25$, as shown. What is the cosine of the angle opposite the side of length $15$? Express your answer as a fraction.",
    diagram: { type: "rightTriangle", params: { sideLabels: ["20", "15", "25"], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "4/5",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**The correct answer is $\\frac{4}{5}$.**\n\n**The Fast Way (~25s):** The hypotenuse is $25$, so the angle opposite $15$ has adjacent leg $20$, and its cosine is $\\frac{20}{25} = \\frac{4}{5}$.\n\n**The Full Solution:**\nStep 1: The longest side, $25$, is the hypotenuse, and $15$ and $20$ are the legs.\nStep 2: The angle opposite the leg of length $15$ has the other leg, $20$, adjacent to it.\nStep 3: $\\cos = \\frac{20}{25} = \\frac{4}{5}$.\n\nCheck: $15^2 + 20^2 = 225 + 400 = 625 = 25^2$, and $15$, $20$, $25$ is the $3$-$4$-$5$ triple scaled by $5$.\n\n**Common Mistakes:**\n* Answering $\\frac{3}{5}$ by using $\\frac{15}{25}$, which is the sine of that angle.\n* Answering $\\frac{3}{4}$ by dividing the legs, which produces a tangent.\n* Treating $20$ as the hypotenuse and answering $\\frac{15}{20}$; the hypotenuse is always the longest side.\n\n**Test Day Takeaway:** Identify the hypotenuse before choosing a ratio; in a scaled $3$-$4$-$5$ triangle every answer reduces to fifths or fourths.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-113",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A pharmacy label printer cuts right triangular tabs whose hypotenuse measures $5w$ millimeters and whose shorter leg measures $3w$ millimeters, where $w$ is a positive constant. Which expression gives the length, in millimeters, of the leg adjacent to the acute angle whose sine is $\\frac{3}{5}$?",
    choices: [
      // distractor: subtracts the given lengths, 5w - 3w = 2w, instead of subtracting their squares
      { id: "A", text: "$2w$" },
      // distractor: misreads sine as adjacent over hypotenuse, so the given 3w leg is reported as the adjacent side
      { id: "B", text: "$3w$" },
      { id: "C", text: "$4w$" },
      // distractor: names the hypotenuse 5w, which is adjacent to neither acute angle in the ratio sense
      { id: "D", text: "$5w$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Sine $\\frac{3}{5}$ marks the angle opposite the $3w$ leg, so the leg adjacent to it is the other leg, $\\sqrt{(5w)^2-(3w)^2}=4w$.\n\n**The Full Solution:**\n\nStep 1 — Locate the angle. Sine is opposite over hypotenuse, and $\\frac{3w}{5w}=\\frac{3}{5}$, so the angle in question sits across from the $3w$ leg.\n\nStep 2 — Find the missing leg: $\\sqrt{(5w)^2-(3w)^2}=\\sqrt{25w^2-9w^2}=\\sqrt{16w^2}=4w$ millimeters, since $w>0$.\n\nStep 3 — The leg adjacent to that angle is the leg that is not opposite it and is not the hypotenuse, so it is $4w$ millimeters. Check: $\\cos$ of the angle is $\\frac{4w}{5w}=\\frac{4}{5}$, and $\\left(\\frac{3}{5}\\right)^2+\\left(\\frac{4}{5}\\right)^2=1$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($2w$): this subtracts side lengths, $5w-3w$, rather than subtracting their squares.\n* Choice B ($3w$): this reads sine as adjacent over hypotenuse and hands back the given $3w$ leg, which is opposite the angle, not adjacent to it.\n* Choice D ($5w$): this names the hypotenuse; the adjacent side of an acute angle is always a leg.\n\n**Test Day Takeaway:** A given sine tells you which leg is opposite — identify that leg first, and the adjacent leg is whatever remains after the hypotenuse.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-114",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "fill-in",
    question: "A tailor marks a right triangular guide on a bolt of denim; the tangent of one acute angle of the guide is $\\frac{3}{4}$, and the guide encloses $54$ square inches. What is the length, in inches, of the guide's hypotenuse?",
    correctAnswer: "15",
    explanation: "**SAT Pattern: SOH-CAH-TOA in a 3-4-5 Triangle**\n\n**The correct answer is $15$.**\n\n**The Fast Way (~45s):** Legs $3t$ and $4t$ give area $6t^2=54$, so $t=3$, the legs are $9$ and $12$, and the hypotenuse is $15$ inches.\n\n**The Full Solution:**\n\nStep 1 — Translate the tangent. Tangent is opposite over adjacent, so the two legs can be written as $3t$ and $4t$ for some $t>0$.\n\nStep 2 — Use the area: $\\frac{1}{2}(3t)(4t)=6t^2$, and $6t^2=54$ gives $t^2=9$ and $t=3$. The legs are $9$ and $12$ inches.\n\nStep 3 — Find the hypotenuse: $\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}=15$ inches. Check: $\\frac{1}{2}(9)(12)=54$ and $\\frac{9}{12}=\\frac{3}{4}$, so both conditions hold.\n\n**Common Mistakes:** Answering $9$ or $12$ reports a leg instead of the hypotenuse. Reading $54$ as the perimeter gives $12t=54$, so $t=4.5$ and a hypotenuse of $22.5$. Setting $\\frac{1}{2}(3t)(4t)=54$ but solving $12t^2=54$ gives $t=2.12$ and a hypotenuse near $10.6$.\n\n**Test Day Takeaway:** A tangent of $\\frac{3}{4}$ never fixes the size — introduce a scale factor $t$, then let the second condition pin it down.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "soh-cah-toa-in-a-3-4-5-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 13/2: rectangle-area (8 items) =====
  {
    id: "bank-geo-115",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A rectangular tabletop is $14$ inches wide and $22$ inches long. What is the area, in square inches, of the tabletop?",
    choices: [
      { id: "A", text: "$36$" },
      { id: "B", text: "$72$" },
      { id: "C", text: "$308$" },
      { id: "D", text: "$616$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~10s):** The area of a rectangle is length times width: $22 \\cdot 14 = 308$ square inches.\n\n**The Full Solution:**\nStep 1: For a rectangle, $A = \\ell w$.\nStep 2: Substitute $\\ell = 22$ and $w = 14$: $A = 22 \\cdot 14$.\nStep 3: $22 \\cdot 14 = 308$ square inches.\n\nCheck: $22 \\cdot 14 = 22 \\cdot 10 + 22 \\cdot 4 = 220 + 88 = 308$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($36$): adds the two dimensions instead of multiplying them.\n* Choice B ($72$): computes the perimeter, $2(22 + 14)$.\n* Choice D ($616$): doubles the area, as if the formula were $2\\ell w$.\n\n**Test Day Takeaway:** Area multiplies and comes out in square units; perimeter adds and comes out in linear units — the unit in the question tells you which.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-116",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "fill-in",
    question: "A rectangular shipping label has an area of $91$ square centimeters and a width of $7$ centimeters. What is the length, in centimeters, of the label?",
    correctAnswer: "13",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $13$.**\n\n**The Fast Way (~10s):** $\\ell = \\frac{A}{w} = \\frac{91}{7} = 13$ centimeters.\n\n**The Full Solution:**\nStep 1: Start from $A = \\ell w$ with $A = 91$ and $w = 7$.\nStep 2: Divide both sides by the width: $\\ell = \\frac{91}{7}$.\nStep 3: $\\ell = 13$ centimeters.\n\nCheck: $13 \\cdot 7 = 91$ square centimeters.\n\n**Common Mistakes:**\n* Answering $84$ by subtracting the width from the area, which mixes square units with linear units.\n* Answering $637$ by multiplying $91$ by $7$ instead of dividing.\n* Answering $38.5$ by treating $91$ as a perimeter, using $\\frac{91}{2} - 7$.\n\n**Test Day Takeaway:** An area divided by one side always returns the other side, and the units confirm it: square centimeters over centimeters is centimeters.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-117",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rectangular photograph has a perimeter of $54$ inches and a length of $17$ inches. What is the area, in square inches, of the photograph?",
    choices: [
      { id: "A", text: "$170$" },
      { id: "B", text: "$340$" },
      { id: "C", text: "$459$" },
      { id: "D", text: "$629$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** Half the perimeter is $27$, so the width is $27 - 17 = 10$ and the area is $17 \\cdot 10 = 170$ square inches.\n\n**The Full Solution:**\nStep 1: The perimeter of a rectangle is $P = 2(\\ell + w)$, so $54 = 2(17 + w)$.\nStep 2: Divide by $2$: $27 = 17 + w$, so $w = 10$ inches.\nStep 3: The area is $A = \\ell w = 17 \\cdot 10 = 170$ square inches.\n\nCheck: $2(17 + 10) = 54$ inches, matching the given perimeter.\n\n**Why the wrong answers are tempting:**\n* Choice B ($340$): uses $w = 54 - 2(17) = 20$, forgetting to divide the leftover perimeter by $2$.\n* Choice C ($459$): uses half the perimeter, $27$, as the width instead of subtracting the length from it.\n* Choice D ($629$): uses $54 - 17 = 37$ as the width, subtracting the length from the whole perimeter.\n\n**Test Day Takeaway:** Halve the perimeter first — that single number is $\\ell + w$, and the missing side is one subtraction away.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-118",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "The length of a rectangle is $4$ times its width, and the area of the rectangle is $324$ square units. What is the width of the rectangle?",
    correctAnswer: "9",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $9$.**\n\n**The Fast Way (~30s):** With width $w$ and length $4w$, the area is $4w^2 = 324$, so $w^2 = 81$ and $w = 9$.\n\n**The Full Solution:**\nStep 1: Let the width be $w$; then the length is $4w$.\nStep 2: The area is $A = (4w)(w) = 4w^2$, so $4w^2 = 324$.\nStep 3: $w^2 = 81$, and since a width is positive, $w = 9$.\n\nCheck: the length is $36$, and $36 \\cdot 9 = 324$ square units.\n\n**Common Mistakes:**\n* Answering $36$, the length, instead of the width.\n* Answering $81$ by stopping at $w^2$ without taking the square root.\n* Dividing $324$ by $4$ and then by $2$ to get $40.5$, treating $w^2$ as $2w$.\n\n**Test Day Takeaway:** Name the smaller quantity with the variable; the area then becomes a single-variable equation instead of a system.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-119",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rectangular heat-sink base measures $k$ millimeters by $(k + 5)$ millimeters and covers an area of $84$ square millimeters. What is the value of $k$?",
    choices: [
      { id: "A", text: "$7$" },
      // distractor: uses the rejected root k = -12 of the factored equation and drops the negative sign
      { id: "B", text: "$12$" },
      // distractor: treats 84 as the perimeter, solving 2(k + k + 5) = 84
      { id: "C", text: "$18.5$" },
      // distractor: subtracts 5 from 84 instead of factoring the quadratic
      { id: "D", text: "$79$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice A is correct.** $k(k + 5) = 84$ gives $k^2 + 5k - 84 = 0$, which factors as $(k + 12)(k - 7) = 0$, so $k = 7$.\n\n**The Fast Way (~30s):** Two factors of $84$ that differ by $5$ are $7$ and $12$, so $k = 7$.\n\n**The Full Solution:**\n\nStep 1: Area of a rectangle is length times width: $k(k + 5) = 84$.\n\nStep 2: Expand and set equal to zero: $k^2 + 5k - 84 = 0$, which factors as $(k + 12)(k - 7) = 0$.\n\nStep 3: The roots are $k = -12$ and $k = 7$; a side length must be positive, so $k = 7$. Check: $7 \\times 12 = 84$ square millimeters.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($12$): takes the rejected root $k = -12$ and drops the sign.\n* Choice C ($18.5$): treats $84$ as the perimeter, solving $4k + 10 = 84$.\n* Choice D ($79$): subtracts $5$ from $84$ as if the two dimensions added to $84$.\n\n**Test Day Takeaway:** A rectangle-area equation with a variable side is a quadratic — factor it, then throw away the negative root before answering.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-120",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "The length of a rectangular patio is $6$ meters less than twice its width. If the area of the patio is $80$ square meters, what is the width, in meters, of the patio?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~45s):** With width $w$ and length $2w - 6$, the area gives $2w^2 - 6w - 80 = 0$, or $w^2 - 3w - 40 = 0$, which factors to $(w - 8)(w + 5) = 0$, so $w = 8$ meters.\n\n**The Full Solution:**\nStep 1: Let the width be $w$ meters; then the length is $2w - 6$ meters.\nStep 2: The area gives $w(2w - 6) = 80$, so $2w^2 - 6w - 80 = 0$, and dividing by $2$ gives $w^2 - 3w - 40 = 0$.\nStep 3: Factor: $(w - 8)(w + 5) = 0$, so $w = 8$ or $w = -5$. A width is positive, so $w = 8$ meters.\n\nCheck: the length is $2(8) - 6 = 10$ meters, and $8 \\cdot 10 = 80$ square meters.\n\n**Common Mistakes:**\n* Answering $10$, the length, instead of the width.\n* Answering $5$ by taking the rejected root without the negative sign.\n* Setting up a perimeter equation, $w + (2w - 6) = 80$, which gives the non-integer width $\\frac{86}{3} \\approx 28.7$.\n\n**Test Day Takeaway:** Less than reverses the order of subtraction: twice the width less $6$ is $2w - 6$, never $6 - 2w$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-121",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The length of a rectangle is increased by $30\\%$, and the width of the rectangle is decreased by $p\\%$. The area of the resulting rectangle is $4\\%$ greater than the area of the original rectangle. What is the value of $p$?",
    choices: [
      // distractor: reports the percent change in area as the percent change in width
      { id: "A", text: "$4$" },
      { id: "B", text: "$20$" },
      // distractor: subtracts the percents, 30 - 4, instead of dividing the multipliers
      { id: "C", text: "$26$" },
      // distractor: reports the surviving multiplier 0.80 as a percent decrease
      { id: "D", text: "$80$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Area scales by the product of the two multipliers: $1.30 \\times m = 1.04$, so $m = 0.80$ and the width drops by $20\\%$.\n\n**The Full Solution:**\nStep 1: Let the original length be $L$ and the original width be $W$, so the original area is $LW$. The new length is $1.30L$ and the new width is $mW$, where $m$ is the width multiplier.\nStep 2: The new area is $(1.30L)(mW) = 1.30m \\cdot LW$, and this equals $1.04LW$, so $1.30m = 1.04$ and $m = \\frac{1.04}{1.30} = 0.80$.\nStep 3: A multiplier of $0.80$ is a decrease of $1 - 0.80 = 0.20$, or $20\\%$, so $p = 20$. Check: $1.30 \\times 0.80 = 1.04$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): copies the $4\\%$ change in area into the answer, but the area change is the result of the two side changes, not the width change itself.\n* Choice C ($26$): subtracts the percents, $30 - 4 = 26$, treating percent changes as additive when area multiplies them.\n* Choice D ($80$): reports the multiplier $0.80$ as if it were the percent decrease; $0.80$ means $80\\%$ of the original, a $20\\%$ decrease.\n\n**Test Day Takeaway:** Percent changes on a product multiply. Convert each change to a multiplier, set the product equal to the target multiplier, and solve.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-122",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "fill-in",
    question: "A drainage swale is graphed as the line $y = kx + 18$, where $k$ is a negative constant and the axes are marked in meters. The line and the two coordinate axes enclose a triangular region of area $108$ square meters. What is the value of $-k$?",
    correctAnswer: "1.5",
    explanation: "**SAT Pattern: Triangle Area with a Line Constraint**\n\n**The correct answer is $1.5$.**\n\n**The Fast Way (~50s):** The legs of the region are the intercepts $18$ and $-\\frac{18}{k}$, so $\\frac{1}{2}(18)\\left(\\frac{18}{-k}\\right) = 108$ gives $-k = 1.5$.\n\n**The Full Solution:**\nStep 1: The line meets the $y$-axis at $(0, 18)$ and meets the $x$-axis where $kx + 18 = 0$, that is at $\\left(-\\frac{18}{k},\\, 0\\right)$. Because $k$ is negative, $-\\frac{18}{k}$ is positive.\nStep 2: The two axes are perpendicular, so the enclosed triangle has legs $18$ and $\\frac{18}{-k}$, and its area is $\\frac{1}{2}(18)\\left(\\frac{18}{-k}\\right) = \\frac{162}{-k}$.\nStep 3: Setting $\\frac{162}{-k} = 108$ gives $-k = \\frac{162}{108} = 1.5$.\n\nCheck: With $k = -1.5$ the $x$-intercept is $12$, and $\\frac{1}{2}(12)(18) = 108$. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $3$ by dropping the factor $\\frac{1}{2}$ and solving $\\frac{324}{-k} = 108$.\n* Answering $12$ by reporting the $x$-intercept, which is a length rather than the slope's magnitude.\n* Answering $6$ by using $\\frac{108}{18}$, which divides the area by only one leg.\n\n**Test Day Takeaway:** A line and the two axes always bound a right triangle whose legs are the intercepts, so the area is half their product.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-123",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The figure shows right triangle $DEF$, in which angle $E$ is a right angle, $DE = 16$, and $EF = 12$. What is the length of $DF$?",
    diagram: { type: "rightTriangle", params: { labels: ["D", "E", "F"], sideLabels: ["16", "12", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: averages the two legs instead of using the Pythagorean theorem
      { id: "A", text: "$14$" },
      { id: "B", text: "$20$" },
      // distractor: adds the legs, treating the hypotenuse as the sum of the other sides
      { id: "C", text: "$28$" },
      // distractor: stops at the square of the hypotenuse
      { id: "D", text: "$400$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** $12$ and $16$ are $4$ times $3$ and $4$, so $DF = 4 \\times 5 = 20$.\n\n**The Full Solution:**\nStep 1: Angle $E$ is the right angle, so $DE$ and $EF$ are the legs and $DF$ is the hypotenuse: $DE^2 + EF^2 = DF^2$.\nStep 2: $16^2 + 12^2 = 256 + 144 = 400$, so $DF^2 = 400$.\nStep 3: $DF = \\sqrt{400} = 20$. Check: $12$-$16$-$20$ is the $3$-$4$-$5$ triple scaled by $4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($14$): averages the two legs, $\\frac{12 + 16}{2}$, which ignores the theorem and lands below the longer leg.\n* Choice C ($28$): adds the legs, $12 + 16$; the hypotenuse is always shorter than the sum of the legs.\n* Choice D ($400$): stops at $DF^2$ without taking the square root.\n\n**Test Day Takeaway:** The side opposite the right angle is the hypotenuse, whatever the vertices are called. Legs in the ratio $3 : 4$ make the hypotenuse $5$ parts long.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-124",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "fill-in",
    question: "A guy wire runs from the top of a vertical utility pole to a point on level ground $18$ feet from the base of the pole. The pole is $24$ feet tall. What is the length, in feet, of the guy wire?",
    diagram: { type: "rightTriangle", params: { sideLabels: ["18", "24", ""], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "30",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~10s):** The legs $18$ and $24$ are $6$ times $3$ and $4$, so the wire is $6 \\times 5 = 30$ feet.\n\n**The Full Solution:**\nStep 1: The pole, the ground, and the wire form a right triangle with the right angle at the base of the pole. The wire is the hypotenuse.\nStep 2: $18^2 + 24^2 = 324 + 576 = 900$.\nStep 3: The wire has length $\\sqrt{900} = 30$ feet. Check: $18$-$24$-$30$ is $3$-$4$-$5$ scaled by $6$. $\\checkmark$\n\n**Common Mistakes:**\n* Subtracting instead of squaring: $24 - 18 = 6$, which is far shorter than either leg and cannot be a hypotenuse.\n* Adding the legs: $18 + 24 = 42$, which overshoots because the hypotenuse is always less than the sum of the legs.\n* Stopping at $900$, the value of the square of the wire's length, without taking the square root.\n\n**Test Day Takeaway:** A vertical object and its distance along the ground are the two legs; the slanted wire or ladder is always the hypotenuse.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-125",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cable ladder rises $30$ centimeters over a $40$-centimeter run behind a server rack. How many centimeters of grounding strap trace the outline of the triangle it forms?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [40, 0], [40, 30]], sideLabels: ["40 cm", "30 cm", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports the hypotenuse, 50, and stops before adding the other two sides
      { id: "A", text: "$50$" },
      // distractor: adds only the two given legs, 30 + 40, and omits the hypotenuse
      { id: "B", text: "$70$" },
      { id: "C", text: "$120$" },
      // distractor: computes the area, one half times 30 times 40, instead of the perimeter
      { id: "D", text: "$600$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**Choice C is correct.** The hypotenuse is $\\sqrt{30^2 + 40^2} = 50$, so the outline measures $30 + 40 + 50 = 120$ centimeters.\n\n**The Fast Way (~25s):** $30$-$40$-$50$ is the $3$-$4$-$5$ triple scaled by $10$; the perimeter is $30 + 40 + 50 = 120$.\n\n**The Full Solution:**\n\nStep 1: The rise and run are the legs of a right triangle, so the diagonal is $\\sqrt{30^2 + 40^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50$ centimeters.\n\nStep 2: The strap follows all three sides, so add them: $30 + 40 + 50$.\n\nStep 3: The total is $120$ centimeters. Check: $30^2 + 40^2 = 2500 = 50^2$, so the triple is consistent.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($50$): reports the diagonal alone and never adds the other two sides.\n* Choice B ($70$): adds only the two given legs, leaving out the diagonal the strap must also cover.\n* Choice D ($600$): computes the enclosed area, $\\frac{1}{2}(30)(40)$, rather than the distance around.\n\n**Test Day Takeaway:** Recognizing a scaled $3$-$4$-$5$ triple turns the Pythagorean step into mental arithmetic, but read carefully whether the question wants a side, the perimeter, or the area.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-126",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "fill-in",
    question: "The triangular formwork infill panel shown covers $294$ square centimeters, and its edge lengths are marked in centimeters, where $k$ is a positive constant. How long, in centimeters, is the panel's longest edge?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [28, 0], [28, 21]], sideLabels: ["4k", "3k", ""], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "35",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**The correct answer is $35$.**\n\n**The Fast Way (~40s):** $\\frac{1}{2}(3k)(4k) = 6k^2 = 294$ gives $k = 7$, and the hypotenuse of a $3k$-$4k$ right triangle is $5k = 35$.\n\n**The Full Solution:**\n\nStep 1: The two edges at the right angle are the legs, so the area is $\\frac{1}{2}(3k)(4k) = 6k^2$.\n\nStep 2: Set $6k^2 = 294$, so $k^2 = 49$ and $k = 7$ (only the positive value makes sense for a length).\n\nStep 3: The legs are $21$ and $28$ centimeters, so the hypotenuse is $\\sqrt{21^2 + 28^2} = \\sqrt{441 + 784} = \\sqrt{1225} = 35$ centimeters. Check: $\\frac{1}{2}(21)(28) = 294$, matching the given area.\n\n**Common Mistakes:**\n\n* $7$ — reporting $k$ instead of the length the question asks for.\n* $28$ — reporting $4k$, the longer leg, rather than the longest edge.\n* $49$ — stopping at $k^2 = 49$ without taking the square root.\n\n**Test Day Takeaway:** When both legs are multiples of the same constant, the area gives $k$ in one step and the $3$-$4$-$5$ ratio hands you the hypotenuse as $5k$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-127",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The side lengths of a right triangle are in the ratio $3 : 4 : 5$, and the perimeter of the triangle is $84$. What is the length of the longest side of the triangle?",
    choices: [
      // distractor: reports the scale factor instead of a side length
      { id: "A", text: "$7$" },
      // distractor: gives the shortest side rather than the longest
      { id: "B", text: "$21$" },
      // distractor: gives the middle side rather than the longest
      { id: "C", text: "$28$" },
      { id: "D", text: "$35$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** The ratio parts total $12$, so each part is $\\frac{84}{12} = 7$ and the longest side is $5(7) = 35$.\n\n**The Full Solution:**\nStep 1: Write the sides as $3k$, $4k$, and $5k$ for some positive constant $k$.\nStep 2: The perimeter gives $3k + 4k + 5k = 12k = 84$, so $k = 7$.\nStep 3: The longest side is $5k = 5(7) = 35$. Check: the sides are $21$, $28$, and $35$, and $21 + 28 + 35 = 84$, with $21^2 + 28^2 = 1{,}225 = 35^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): reports $k$, the value of one ratio part, instead of $5k$.\n* Choice B ($21$): gives $3k$, the shortest side.\n* Choice C ($28$): gives $4k$, the middle side.\n\n**Test Day Takeaway:** Turn a ratio into $3k$, $4k$, $5k$, solve for $k$ from the given total, then read off the side the question actually asks for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-128",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "fill-in",
    question: "A chromatography plate is cut in the shape of the right triangle shown. What is the area, in square millimeters, of the plate?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [60, 0], [60, 45]], sideLabels: ["", "45 mm", "75 mm"], rightAngleVertex: 1 } },
    correctAnswer: "1350",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**The correct answer is $1350$.**\n\n**The Fast Way (~35s):** $45$-$60$-$75$ is the $3$-$4$-$5$ triple scaled by $15$, so the missing leg is $60$ and the area is $\\frac{1}{2}(45)(60) = 1350$.\n\n**The Full Solution:**\n\nStep 1: The $75$-millimeter edge is the hypotenuse, so the missing leg satisfies $b^2 = 75^2 - 45^2 = 5625 - 2025 = 3600$.\n\nStep 2: Therefore $b = 60$ millimeters, and the two legs are $45$ and $60$.\n\nStep 3: Area $= \\frac{1}{2}(45)(60) = 1350$ square millimeters. Check: $45^2 + 60^2 = 2025 + 3600 = 5625 = 75^2$.\n\n**Common Mistakes:**\n\n* $1687.5$ — using the hypotenuse as a leg: $\\frac{1}{2}(45)(75)$.\n* $2700$ — finding the legs correctly but omitting the factor $\\frac{1}{2}$.\n* $60$ — stopping at the missing leg instead of computing the area.\n\n**Test Day Takeaway:** The area formula uses the two LEGS; the hypotenuse never belongs in $\\frac{1}{2}bh$ for a right triangle.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-129",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the hip-roof rafter bracket shown, the sloped edge runs $6$ centimeters longer than the longer of the two edges that meet at the right angle. What is the perimeter, in centimeters, of the bracket?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 18]], sideLabels: ["4x", "3x", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: reports the shorter leg 3x = 18 instead of the perimeter
      { id: "A", text: "$18$" },
      // distractor: reports the sloped edge 5x = 30 and stops
      { id: "B", text: "$30$" },
      // distractor: adds only the two legs, 18 + 24, and leaves out the sloped edge
      { id: "C", text: "$42$" },
      { id: "D", text: "$72$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**Choice D is correct.** With legs $3x$ and $4x$ the hypotenuse is $5x$, so $5x = 4x + 6$ gives $x = 6$ and the perimeter is $18 + 24 + 30 = 72$.\n\n**The Fast Way (~40s):** $5x - 4x = 6$, so $x = 6$; the sides are $18$, $24$, $30$ and their sum is $72$.\n\n**The Full Solution:**\n\nStep 1: The legs are $3x$ and $4x$, so the hypotenuse is $\\sqrt{(3x)^2 + (4x)^2} = 5x$.\n\nStep 2: The sloped edge exceeds the longer leg by $6$: $5x = 4x + 6$, so $x = 6$.\n\nStep 3: The sides are $3(6) = 18$, $4(6) = 24$, and $5(6) = 30$ centimeters, giving a perimeter of $72$ centimeters. Check: $30 - 24 = 6$, as stated, and $18^2 + 24^2 = 900 = 30^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($18$): reports the shorter leg $3x$ instead of the distance around the bracket.\n* Choice B ($30$): reports the sloped edge $5x$ and stops.\n* Choice C ($42$): adds only the two legs and omits the sloped edge.\n\n**Test Day Takeaway:** In a $3x$-$4x$-$5x$ triangle every side is a multiple of the same $x$, so one comparison between sides pins $x$ immediately.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-130",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "hard",
    type: "fill-in",
    question: "The two legs of a right triangle have lengths in the ratio $5$ to $12$, and the area of the triangle is $750$ square inches. What is the length, in inches, of the hypotenuse?",
    correctAnswer: "65",
    explanation: "**SAT Pattern: Pythagorean Theorem (3-4-5 Family)**\n\n**The correct answer is $65$.**\n\n**The Fast Way (~30s):** With legs $5k$ and $12k$, the area is $30k^2 = 750$, so $k = 5$ and the hypotenuse is $13(5) = 65$.\n\n**The Full Solution:**\nStep 1: Write the legs as $5k$ and $12k$. The area of a right triangle is half the product of its legs: $\\frac{1}{2}(5k)(12k) = 30k^2$.\nStep 2: $30k^2 = 750$ gives $k^2 = 25$ and $k = 5$, so the legs are $25$ and $60$.\nStep 3: Legs in the ratio $5 : 12$ give a hypotenuse of $13k = 65$. Check: $25^2 + 60^2 = 625 + 3{,}600 = 4{,}225 = 65^2$. $\\checkmark$\n\n**Common Mistakes:**\n* Forgetting the factor $\\frac{1}{2}$: $60k^2 = 750$ gives $k \\approx 3.54$, a non-integer that signals the halving was skipped.\n* Adding the legs, $25 + 60 = 85$, instead of using the Pythagorean theorem.\n* Gridding a leg ($60$) or the scale factor ($5$) instead of the hypotenuse.\n\n**Test Day Takeaway:** Ratio plus area is a two-step: build the sides as multiples of $k$, use the area to pin $k$, then apply the triple.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-theorem-3-4-5-family",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 13/4: distance-from-center-as-radius (8 items) =====
  {
    id: "bank-geo-131",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the $xy$-plane, the point $(-20, 21)$ lies on a circle whose center is the origin. What is the length of a radius of this circle?",
    choices: [
      // distractor: subtracts the coordinates instead of combining their squares
      { id: "A", text: "$1$" },
      // distractor: averages the two coordinates
      { id: "B", text: "$20.5$" },
      { id: "C", text: "$29$" },
      // distractor: adds the coordinates, measuring the path along the axes
      { id: "D", text: "$41$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** A radius reaches from the origin to the point, so its length is $\\sqrt{400 + 441} = \\sqrt{841} = 29$.\n\n**The Full Solution:**\nStep 1: Every radius runs from the center to a point on the circle, so its length is the distance from $(0, 0)$ to $(-20, 21)$.\nStep 2: $(-20)^2 + 21^2 = 400 + 441 = 841$.\nStep 3: The radius is $\\sqrt{841} = 29$. Check: $20$-$21$-$29$ satisfies $400 + 441 = 841$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): subtracts $21 - 20$, as though the two displacements lay along the same line.\n* Choice B ($20.5$): averages $20$ and $21$, which has no geometric meaning for a distance.\n* Choice D ($41$): adds $20 + 21$, the distance walked along the two axes rather than the straight-line distance.\n\n**Test Day Takeaway:** A radius is a distance. Square each displacement, add, then take the square root - never add or subtract the displacements themselves.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-132",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "fill-in",
    question: "A seismograph station at $(3, -4)$ records a tremor whose epicenter is at $(-5, 2)$, where coordinates are in kilometers. A circle centered at the station passes through the epicenter. What is the radius, in kilometers, of that circle?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~20s):** The radius is the distance from the center to a point on the circle: $\\sqrt{8^2 + 6^2} = 10$ kilometers.\n\n**The Full Solution:**\nStep 1: The circle is centered at the station $(3, -4)$ and passes through the epicenter $(-5, 2)$, so its radius is the distance between those points.\nStep 2: The horizontal difference is $3 - (-5) = 8$ and the vertical difference is $-4 - 2 = -6$.\nStep 3: Apply the distance formula: $\\sqrt{8^2 + (-6)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$ kilometers. Check: $(-5, 2)$ satisfies $(x - 3)^2 + (y + 4)^2 = 100$ ✓\n\n**Common Mistakes:**\n* $100$ — stops at the squared distance, which is $r^2$, not $r$.\n* $14$ — adds the coordinate differences, $8 + 6$, instead of using the Pythagorean sum.\n* $2$ — subtracts the differences, $8 - 6$.\n\n**Test Day Takeaway:** Any point on a circle is exactly one radius from the center — the distance formula is the whole method.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-133",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the $xy$-plane, a circle has its center at $(1, -3)$, and the point $(9, 3)$ lies on the circle. What is the circumference of the circle, in terms of $\\pi$?",
    choices: [
      // distractor: multiplies pi by the radius instead of by the diameter
      { id: "A", text: "$10\\pi$" },
      { id: "B", text: "$20\\pi$" },
      // distractor: computes the area instead of the circumference
      { id: "C", text: "$100\\pi$" },
      // distractor: doubles the area instead of doubling the radius
      { id: "D", text: "$200\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The displacements $8$ and $6$ give $r = 10$, so the circumference is $2\\pi(10) = 20\\pi$.\n\n**The Full Solution:**\nStep 1: The radius is the distance from the center to the given point: $r = \\sqrt{(9 - 1)^2 + (3 - (-3))^2}$.\nStep 2: $8^2 + 6^2 = 64 + 36 = 100$, so $r = 10$.\nStep 3: The circumference is $2\\pi r = 2\\pi(10) = 20\\pi$. Check: $6$-$8$-$10$ is the $3$-$4$-$5$ triple doubled. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($10\\pi$): multiplies $\\pi$ by the radius; the circumference is $\\pi$ times the diameter.\n* Choice C ($100\\pi$): computes $\\pi r^2$, the area, which is measured in square units.\n* Choice D ($200\\pi$): doubles the area rather than using $2\\pi r$.\n\n**Test Day Takeaway:** Get $r$ from the distance formula, then apply the right formula: $2\\pi r$ measures around the circle, $\\pi r^2$ measures inside it.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-134",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "A wreck marker at $(-2, 3)$ lies exactly at the edge of the $17$-meter detection circle of a sonar buoy positioned at $(6, k)$, where $k > 0$ and coordinates are in meters. What is the value of $k$?",
    correctAnswer: "18",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**The correct answer is $18$.**\n\n**The Fast Way (~35s):** The marker is one radius from the buoy: $8^2 + (k - 3)^2 = 17^2$, so $(k - 3)^2 = 225$ and $k = 3 + 15 = 18$.\n\n**The Full Solution:**\nStep 1: A point on the edge is exactly $17$ meters from the center, so $(6 - (-2))^2 + (k - 3)^2 = 17^2$.\nStep 2: Simplify: $64 + (k - 3)^2 = 289$, so $(k - 3)^2 = 225$ and $k - 3 = \\pm 15$.\nStep 3: That gives $k = 18$ or $k = -12$; since $k > 0$, $k = 18$. Check: the distance from $(6, 18)$ to $(-2, 3)$ is $\\sqrt{64 + 225} = 17$ ✓\n\n**Common Mistakes:**\n* $-12$ — takes the negative root and ignores the condition $k > 0$.\n* $15$ — reports $k - 3$ instead of solving for $k$ itself.\n* $12$ — subtracts $3$ from $15$ rather than adding it.\n\n**Test Day Takeaway:** \"On the edge\" means the distance equals the radius exactly — square both sides, then check the stated sign condition before choosing a root.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-135",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A bike-share dock at $(-3, 5)$ in the $xy$-plane serves every rack within $13$ units of the dock. Which statement about the rack at $(2, -7)$ is true?",
    choices: [
      { id: "A", text: "The rack is on the boundary of the service area, since its distance from the dock is exactly $13$ units." },
      // distractor: uses only the horizontal difference of 5 units
      { id: "B", text: "The rack is inside the service area, since its horizontal distance from the dock is only $5$ units." },
      // distractor: adds the coordinate differences, 5 + 12 = 17, instead of using the distance formula
      { id: "C", text: "The rack is outside the service area, since the coordinate differences sum to $17$ units." },
      // distractor: stops at the squared distance 169 and compares it with 13
      { id: "D", text: "The rack is outside the service area, since its distance from the dock is $169$ units." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The differences are $5$ and $12$, so the distance is $\\sqrt{25 + 144} = 13$ — exactly the service radius.\n\n**The Full Solution:**\nStep 1: The service area is the disk of radius $13$ centered at the dock $(-3, 5)$.\nStep 2: The rack's coordinate differences are $2 - (-3) = 5$ and $-7 - 5 = -12$.\nStep 3: The distance is $\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ units, equal to the radius, so the rack sits on the boundary. Check: $(2, -7)$ satisfies $(x + 3)^2 + (y - 5)^2 = 169$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: uses only the horizontal gap of $5$ units and ignores the $12$-unit vertical gap.\n* Choice C: adds the two gaps, $5 + 12 = 17$, which is always at least the true distance.\n* Choice D: reports the squared distance, $169$, and compares that number with the radius $13$.\n\n**Test Day Takeaway:** Inside, outside, or on the boundary is decided by comparing the actual distance with the radius — take the square root before comparing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-136",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "In the $xy$-plane, a circle has its center at $(-6, 2)$ and passes through the point $(0, 10)$. The equation of the circle can be written as $(x + 6)^2 + (y - 2)^2 = k$, where $k$ is a constant. What is the value of $k$?",
    correctAnswer: "100",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**The correct answer is $100$.**\n\n**The Fast Way (~15s):** $k = r^2$, and the gaps are $6$ and $8$, so $k = 36 + 64 = 100$.\n\n**The Full Solution:**\nStep 1: In the form $(x - h)^2 + (y - k)^2 = r^2$, the constant on the right is the square of the radius, so $k = r^2$ here.\nStep 2: The horizontal gap from $(-6, 2)$ to $(0, 10)$ is $0 - (-6) = 6$ and the vertical gap is $10 - 2 = 8$.\nStep 3: $k = 6^2 + 8^2 = 36 + 64 = 100$. Check: substituting $(0, 10)$ gives $(0 + 6)^2 + (10 - 2)^2 = 36 + 64 = 100$. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $10$, the radius, when the constant on the right side is $r^2$.\n* Using $0 - 6 = -6$ and $10 - 2 = 8$ but then adding rather than squaring, giving $2$.\n* Reading the center as $(6, 2)$ from $(x + 6)^2$; the sign inside the parentheses is opposite the coordinate.\n\n**Test Day Takeaway:** Substituting the given point directly into the equation is the fastest check - both sides must agree.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-137",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Two circles share the survey monument at $(4, -1)$ as their center. The smaller passes through $(-4, 5)$ and the larger through $(9, 11)$. What is the area, in square units, of the ring between them?",
    choices: [
      // distractor: squares the difference of the radii, (13 - 10) squared
      { id: "A", text: "$9\\pi$" },
      { id: "B", text: "$69\\pi$" },
      // distractor: reports the area of the larger circle only
      { id: "C", text: "$169\\pi$" },
      // distractor: adds the two squared radii, 169 + 100
      { id: "D", text: "$269\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The radii are $\\sqrt{64 + 36} = 10$ and $\\sqrt{25 + 144} = 13$, so the ring is $\\pi(169 - 100) = 69\\pi$.\n\n**The Full Solution:**\nStep 1: The smaller radius is the distance from $(4, -1)$ to $(-4, 5)$: $\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$.\nStep 2: The larger radius is the distance from $(4, -1)$ to $(9, 11)$: $\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$.\nStep 3: The ring's area is $\\pi(13^2) - \\pi(10^2) = \\pi(169 - 100) = 69\\pi$ square units. Check: $69\\pi$ is less than the larger circle's $169\\pi$, as a ring must be ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9\\pi$): squares the difference of the radii; $(13 - 10)^2$ is not $13^2 - 10^2$.\n* Choice C ($169\\pi$): gives the whole larger circle and never removes the smaller one.\n* Choice D ($269\\pi$): adds the squared radii instead of subtracting them.\n\n**Test Day Takeaway:** A ring is a difference of areas, so subtract the SQUARES of the radii — never square the difference.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  {
    id: "bank-geo-138",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "fill-in",
    question: "A hydrophone at $(a, 6)$ in the $xy$-plane is equidistant from seabed markers at $(1, 2)$ and $(9, 14)$, both of which lie on the hydrophone's detection circle. What is the value of $a$?",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~45s):** Equal radii give $(a - 1)^2 + 16 = (a - 9)^2 + 64$; expanding and cancelling $a^2$ leaves $16a = 128$, so $a = 8$.\n\n**The Full Solution:**\nStep 1: Both markers lie on the circle, so each is one radius from the center: $(a - 1)^2 + (6 - 2)^2 = (a - 9)^2 + (6 - 14)^2$.\nStep 2: Substitute the squares: $(a - 1)^2 + 16 = (a - 9)^2 + 64$, which expands to $a^2 - 2a + 17 = a^2 - 18a + 145$.\nStep 3: Cancel $a^2$ and solve: $16a = 128$, so $a = 8$. Check: from $(8, 6)$ the distance to $(1, 2)$ is $\\sqrt{49 + 16} = \\sqrt{65}$ and to $(9, 14)$ is $\\sqrt{1 + 64} = \\sqrt{65}$ ✓\n\n**Common Mistakes:**\n* $5$ — averages the markers' $x$-coordinates, which locates the midpoint rather than the center.\n* $4$ — drops the $(6 - 14)^2 = 64$ term and solves $16a = 64$.\n* $-8$ — moves the terms across with the wrong sign, solving $16a = -128$.\n\n**Test Day Takeaway:** Two points on one circle are equidistant from the center — set the two squared distances equal and the $a^2$ terms cancel.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-11"
  },
  // ===== Phase 2 batch 16: volume-of-a-rectangular-prism (8 items) =====
  // Now serves 5 test items after alias map collapsed three variant titles.
  {
    id: "bank-geo-139",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "How many cubic centimeters of space does a battery module occupy if it is a rectangular block $24$ centimeters long, $15$ centimeters wide, and $8$ centimeters deep?",
    choices: [
      // distractor: adds the three dimensions, 24 + 15 + 8, which gives a length rather than a volume
      { id: "A", text: "$47$" },
      // distractor: multiplies only the length and the width, 24 * 15, giving one face's area
      { id: "B", text: "$360$" },
      // distractor: halves the product, as if the block had a triangular cross section
      { id: "C", text: "$1{,}440$" },
      { id: "D", text: "$2{,}880$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Volume of a Rectangular Prism**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** Multiply all three dimensions: $24 \\times 15 \\times 8 = 2{,}880$.\n\n**The Full Solution:**\nStep 1: A rectangular block's volume is the product of its length, width, and depth: $V = lwd$.\nStep 2: Substituting gives $V = 24 \\times 15 \\times 8$.\nStep 3: $24 \\times 15 = 360$, and $360 \\times 8 = 2{,}880$ cubic centimeters.\n\nCheck: The block is eight layers, each a $24$ by $15$ sheet of $360$ cubic centimeters, and $8 \\times 360 = 2{,}880$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($47$): adds the three dimensions instead of multiplying, producing a length rather than a volume.\n* Choice B ($360$): multiplies only the length and the width, which is the area of one face.\n* Choice C ($1{,}440$): halves the product, a step that belongs to a prism with a triangular cross section.\n\n**Test Day Takeaway:** A rectangular prism's volume is the plain product of all three dimensions, with no factor attached.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-140",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "fill-in",
    question: "The basin of a paint tray is a rectangular prism; its rectangular floor measures $18$ centimeters by $25$ centimeters, and the walls stand $4$ centimeters high. How many cubic centimeters does the basin hold?",
    correctAnswer: "1800",
    explanation: "**SAT Pattern: Volume of a Rectangular Prism**\n\n**The correct answer is $1800$.**\n\n**The Fast Way (~15s):** The floor covers $18 \\times 25 = 450$ square centimeters, and $450 \\times 4 = 1{,}800$.\n\n**The Full Solution:**\nStep 1: The floor is a rectangle of area $18 \\times 25 = 450$ square centimeters.\nStep 2: The basin is a prism on that floor, so its volume is the floor area times the wall height: $450 \\times 4$.\nStep 3: $450 \\times 4 = 1{,}800$ cubic centimeters.\n\nCheck: Multiplying in a different order gives the same result: $18 \\times 4 = 72$ and $72 \\times 25 = 1{,}800$. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $450$ by stopping at the floor area and never multiplying by the height.\n* Answering $47$ by adding the three dimensions instead of multiplying them.\n* Answering $900$ by halving the product, a step that belongs to a triangular prism.\n\n**Test Day Takeaway:** Volume of any prism is base area times height; find the base area first and the rest is one multiplication.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-141",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The firing chamber of a ceramic kiln is a rectangular prism measuring $k$ meters by $k + 3$ meters by $8$ meters, and it encloses $320$ cubic meters. How many square meters of sheet steel line its six faces?",
    choices: [
      // distractor: adds the three distinct face areas 40 + 40 + 64 without doubling them
      { id: "A", text: "$144$" },
      // distractor: doubles only two of the three distinct face areas, 2(40 + 64)
      { id: "B", text: "$208$" },
      { id: "C", text: "$288$" },
      // distractor: reports the volume, 320, as though cubic and square units were interchangeable
      { id: "D", text: "$320$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Volume → Missing Dimension → Surface Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~60s):** From $8k(k+3) = 320$ we get $k = 5$, so the chamber is $5$ by $8$ by $8$ and its surface area is $2(40 + 40 + 64) = 288$.\n\n**The Full Solution:**\nStep 1: Volume is the product of the three dimensions: $k(k+3)(8) = 320$, so $k^2 + 3k = 40$ and $k^2 + 3k - 40 = 0$.\nStep 2: Factoring gives $(k+8)(k-5) = 0$, and a length must be positive, so $k = 5$ meters and the dimensions are $5$, $8$, and $8$ meters.\nStep 3: Surface area is $2(lw + lh + wh) = 2\\big(5 \\cdot 8 + 5 \\cdot 8 + 8 \\cdot 8\\big) = 2(40 + 40 + 64) = 288$ square meters.\n\nCheck: $5 \\times 8 \\times 8 = 320$ cubic meters, matching the given volume. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($144$): adds the three distinct face areas $40$, $40$, and $64$ but never doubles for the opposite faces.\n* Choice B ($208$): doubles only two of the three distinct face areas, computing $2(40 + 64)$.\n* Choice D ($320$): reports the volume, which is measured in cubic meters, not square meters.\n\n**Test Day Takeaway:** Solve for the missing dimension first; a prism has three distinct face areas and each one appears twice.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-142",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "fill-in",
    question: "A straight cooling duct of uniform rectangular bore encloses $6{,}048$ cubic centimeters of air. The bore measures $14$ centimeters across and $12$ centimeters high, and the duct's sheet-metal thickness is small enough to ignore. How long, in centimeters, is the duct?",
    correctAnswer: "36",
    explanation: "**SAT Pattern: Volume of a Rectangular Prism**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~30s):** The bore's area is $14 \\times 12 = 168$, and $6{,}048 \\div 168 = 36$.\n\n**The Full Solution:**\nStep 1: The duct is a rectangular prism, so its volume equals the cross-sectional area times the length: $V = A\\ell$.\nStep 2: The bore has area $14 \\times 12 = 168$ square centimeters, so $6{,}048 = 168\\ell$.\nStep 3: Dividing gives $\\ell = \\frac{6{,}048}{168} = 36$ centimeters.\n\nCheck: $168 \\times 36 = 6{,}048$, the stated volume. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $432$ by dividing by only the width, $6{,}048 \\div 14$.\n* Answering $504$ by dividing by only the height, $6{,}048 \\div 12$.\n* Answering $26$ by adding the two bore dimensions instead of multiplying them.\n\n**Test Day Takeaway:** To recover a missing dimension, divide the volume by the product of the two you already know.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-143",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A concrete footing is poured as a rectangular prism measuring $1.5$ meters by $0.8$ meters by $0.4$ meters, and the concrete costs \\$250 per cubic meter. What is the cost of the concrete used for one footing?",
    choices: [
      // distractor: halves the volume to 0.24 cubic meter, as if the footing were a wedge, giving 60 dollars
      { id: "A", text: "\\$60" },
      { id: "B", text: "\\$120" },
      // distractor: drops the 0.8 factor and prices 1.5 * 0.4 = 0.6 cubic meter
      { id: "C", text: "\\$150" },
      // distractor: adds the three dimensions to get 2.7 and prices that as a volume
      { id: "D", text: "\\$675" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Volume of a Rectangular Prism**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The footing holds $1.5(0.8)(0.4) = 0.48$ cubic meter, and $0.48 \\times 250 = 120$.\n\n**The Full Solution:**\nStep 1: The volume of a rectangular prism is the product of its three dimensions: $1.5 \\times 0.8 \\times 0.4$.\nStep 2: $1.5 \\times 0.8 = 1.2$, and $1.2 \\times 0.4 = 0.48$ cubic meter.\nStep 3: At \\$250 per cubic meter the cost is $0.48 \\times 250 = 120$ dollars.\n\nCheck: A full cubic meter would cost \\$250, and $0.48$ is just under half of that. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (\\$60): halves the volume to $0.24$ cubic meter, a step that belongs to a wedge, not a rectangular prism.\n* Choice C (\\$150): drops the $0.8$ factor and prices $1.5 \\times 0.4 = 0.6$ cubic meter.\n* Choice D (\\$675): adds the three dimensions to get $2.7$ and treats that sum as a volume.\n\n**Test Day Takeaway:** Compute the volume completely before applying a unit rate; a dropped factor changes the price, not the units.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-144",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "fill-in",
    question: "A filing cabinet's storage compartment is a rectangular prism $60$ centimeters deep, and its interior height is exactly twice its interior width. Filled to the top, the compartment holds $108{,}000$ cubic centimeters. How many centimeters wide is the compartment?",
    correctAnswer: "30",
    explanation: "**SAT Pattern: Volume of a Rectangular Prism**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~45s):** With width $w$ the volume is $w(2w)(60) = 120w^2 = 108{,}000$, so $w^2 = 900$ and $w = 30$.\n\n**The Full Solution:**\nStep 1: Let the width be $w$ centimeters. The height is $2w$ centimeters and the depth is $60$ centimeters.\nStep 2: The volume is the product of the three dimensions: $w(2w)(60) = 120w^2$, and this equals $108{,}000$.\nStep 3: Dividing gives $w^2 = 900$, so $w = 30$ centimeters, since a width must be positive.\n\nCheck: The compartment is $30$ by $60$ by $60$ centimeters, and $30 \\times 60 \\times 60 = 108{,}000$. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $60$ by reporting the height $2w$ instead of the width.\n* Answering $1800$ by dividing $108{,}000$ by $60$ and stopping at $w(2w)$.\n* Answering $15$ by halving the correct width, as though the doubling applied to $w$ itself.\n\n**Test Day Takeaway:** Name the smallest quantity as the variable, write every other dimension in terms of it, then solve one equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-145",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A furnace maker retools a rectangular annealing chamber so that its length increases by $20\\%$ and its width decreases by $25\\%$ while its height is unchanged; the retooled chamber holds $1{,}350$ cubic centimeters. What was the volume, in cubic centimeters, of the original chamber?",
    choices: [
      // distractor: divides by the 1.2 growth factor only and ignores the width shrink: 1350 / 1.2
      { id: "A", text: "$1{,}125$" },
      // distractor: swaps which dimension grows and which shrinks, so the factor becomes 0.80 x 1.25 = 1.00 and nothing changes
      { id: "B", text: "$1{,}350$" },
      { id: "C", text: "$1{,}500$" },
      // distractor: divides by the 0.75 shrink factor only and ignores the length growth: 1350 / 0.75
      { id: "D", text: "$1{,}800$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Inverse Multi-Percent Change (Volume)**\n\n**Choice C is correct.** The volume is multiplied by $1.20 \\times 0.75 = 0.90$, so the original volume is $\\frac{1350}{0.90} = 1500$ cubic centimeters.\n\n**The Fast Way (~30s):** One net factor: $1.2 \\times 0.75 = 0.9$. Undo it by dividing: $1350 \\div 0.9 = 1500$.\n\n**The Full Solution:**\n\nStep 1: Volume is length times width times height. Multiplying the length by $1.20$ and the width by $0.75$ multiplies the volume by $1.20 \\times 0.75 = 0.90$.\n\nStep 2: If $V$ is the original volume, then $0.90V = 1350$, so $V = \\frac{1350}{0.90} = 1500$.\n\nStep 3: Check. Raising $1500$ by $20\\%$ gives $1800$; cutting that by $25\\%$ gives $1800 \\times 0.75 = 1350$, the stated retooled volume.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($1{,}125$): divides by $1.2$ only, forgetting that the width also changed.\n* Choice B ($1{,}350$): swaps the two percents, using $0.80 \\times 1.25 = 1.00$, which leaves the volume unchanged.\n* Choice D ($1{,}800$): divides by $0.75$ only, forgetting the length increase.\n\n**Test Day Takeaway:** Successive percent changes multiply into ONE factor; to run the change backward, divide by that single factor rather than adding or subtracting percents.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-146",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "hard",
    type: "fill-in",
    question: "A cube has the same volume as a rectangular prism whose dimensions are $8$ centimeters, $12$ centimeters, and $18$ centimeters. What is the surface area, in square centimeters, of the cube?",
    correctAnswer: "864",
    explanation: "**SAT Pattern: Volume of a Rectangular Prism**\n\n**The correct answer is $864$.**\n\n**The Fast Way (~40s):** The prism's volume is $1{,}728$, so the cube's edge is $\\sqrt[3]{1{,}728} = 12$ and its surface area is $6(12^2) = 864$.\n\n**The Full Solution:**\nStep 1: The volume of the prism is $(8)(12)(18) = 1{,}728$ cubic centimeters, so the cube also has volume $1{,}728$.\nStep 2: For a cube, $s^3 = 1{,}728$, so $s = 12$ centimeters.\nStep 3: The surface area is $6s^2 = 6(144) = 864$ square centimeters. Check: $12^3 = 1{,}728$ matches the prism's volume. $\\checkmark$\n\n**Common Mistakes:**\n* Computing the prism's surface area, $2(96 + 144 + 216) = 912$; the two solids share a volume, not a surface area.\n* Gridding the edge length $12$ or the volume $1{,}728$ instead of the surface area.\n* Using $6s$ rather than $6s^2$, giving $72$.\n\n**Test Day Takeaway:** Equal-volume problems route through the shared volume: compute it once, solve for the new solid's dimension, then answer in the requested units.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "volume-of-a-rectangular-prism",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  // ===== Phase 2 batch 17/1: area-of-a-circle (8 items) =====
  {
    id: "bank-geo-147",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Story-time rugs for a children's library are circles $10$ feet across. In square feet, how much floor does one rug cover?",
    choices: [
      // distractor: multiplies pi by the radius instead of the radius squared
      { id: "A", text: "$5\\pi$" },
      // distractor: gives the circumference pi d = 10 pi
      { id: "B", text: "$10\\pi$" },
      { id: "C", text: "$25\\pi$" },
      // distractor: squares the diameter instead of the radius, giving 100 pi
      { id: "D", text: "$100\\pi$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The radius is $5$ feet, so the area is $\\pi(5)^{2}=25\\pi$ square feet.\n\n**The Full Solution:**\n\nStep 1: Convert across to radius. \"$10$ feet across\" is the diameter, so $r=\\frac{10}{2}=5$ feet.\n\nStep 2: Apply the area formula. $A=\\pi r^{2}$.\n\nStep 3: Substitute. $A=\\pi(5)^{2}=25\\pi$ square feet, about $78.5$ square feet.\n\nCheck: a $10$-by-$10$ square would cover $100$ square feet, and a circle inscribed in it covers about $78.5$ — consistent.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($5\\pi$): multiplies $\\pi$ by the radius instead of by the radius squared.\n* Choice B ($10\\pi$): gives the circumference $\\pi d$, a length rather than an area.\n* Choice D ($100\\pi$): squares the diameter instead of the radius.\n\n**Test Day Takeaway:** Halve any \"across\" measurement before squaring — the area formula takes the radius, never the diameter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-148",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "fill-in",
    question: "A round wall mirror sold by a bath shop has a radius of $9$ inches, and its face covers $k\\pi$ square inches. What is the value of $k$?",
    correctAnswer: "81",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**The correct answer is $81$.**\n\n**The Fast Way (~15s):** $A=\\pi r^{2}=\\pi(9)^{2}=81\\pi$, so $k=81$.\n\n**The Full Solution:**\n\nStep 1: Write the formula. The area of a circle is $A=\\pi r^{2}$.\n\nStep 2: Substitute the radius. $A=\\pi(9)^{2}=81\\pi$ square inches.\n\nStep 3: Match the given form. Comparing $81\\pi$ with $k\\pi$ gives $k=81$.\n\nCheck: $81\\pi\\approx254$ square inches, a sensible face for an $18$-inch-wide mirror.\n\n**Common Mistakes:**\n\n* $18$: reports the coefficient of the circumference, $2r$, instead of $r^{2}$.\n* $9$: repeats the radius without squaring it.\n* $324$: squares the diameter $18$ rather than the radius.\n\n**Test Day Takeaway:** When an area is written as $k\\pi$, $k$ is just $r^{2}$ — read the coefficient, not the whole expression.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-149",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a university dining hall, the circular lid on a serving kettle covers $225\\pi$ square inches of the kettle's opening. How many inches across is the lid?",
    choices: [
      // distractor: reports the radius, 15, instead of the distance across
      { id: "A", text: "$15$" },
      { id: "B", text: "$30$" },
      // distractor: halves the area's coefficient instead of taking its square root
      { id: "C", text: "$112.5$" },
      // distractor: reports the area's coefficient, 225, without any square root
      { id: "D", text: "$225$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Area of a Circle (Reverse from Given Area)**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $\\pi r^{2}=225\\pi$ gives $r=15$, so the lid is $30$ inches across.\n\n**The Full Solution:**\n\nStep 1: Set up the equation. $\\pi r^{2}=225\\pi$ square inches.\n\nStep 2: Solve for the radius. Dividing by $\\pi$ gives $r^{2}=225$, so $r=15$ inches.\n\nStep 3: Answer the question asked. \"Across\" means the diameter, which is $2r=30$ inches.\n\nCheck: $\\pi(15)^{2}=225\\pi$, matching the covered area.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($15$): reports the radius rather than the distance across the lid.\n* Choice C ($112.5$): halves the area's coefficient instead of taking its square root.\n* Choice D ($225$): reports the coefficient $225$ itself, skipping the square root entirely.\n\n**Test Day Takeaway:** Working backwards from an area gives the radius; the word \"across\" always costs you one more doubling.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-150",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "The rim of a circular solar collector is $44\\pi$ feet around, and the collector's face covers $k\\pi$ square feet. What is the value of $k$?",
    correctAnswer: "484",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**The correct answer is $484$.**\n\n**The Fast Way (~30s):** $2\\pi r=44\\pi$ gives $r=22$, so the area is $\\pi(22)^{2}=484\\pi$ and $k=484$.\n\n**The Full Solution:**\n\nStep 1: Use the circumference. $C=2\\pi r=44\\pi$ feet.\n\nStep 2: Solve for the radius. Dividing both sides by $2\\pi$ gives $r=22$ feet.\n\nStep 3: Compute the area. $A=\\pi(22)^{2}=484\\pi$ square feet, so $k=484$.\n\nCheck: $2\\pi(22)=44\\pi$, matching the given rim length.\n\n**Common Mistakes:**\n\n* $22$: stops at the radius instead of squaring it for the area.\n* $44$: uses the coefficient of the circumference as the radius, reporting the diameter.\n* $1936$: squares the diameter $44$ rather than the radius $22$.\n\n**Test Day Takeaway:** A circumference given as a multiple of $\\pi$ hands you $2r$ directly — halve it before squaring.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-151",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The radius of circle $B$ is $3$ times the radius of circle $A$. The area of circle $B$ is $k$ times the area of circle $A$. What is the value of $k$?",
    choices: [
      // distractor: reports the linear scale factor as the area factor
      { id: "A", text: "$3$" },
      // distractor: doubles the scale factor instead of squaring it
      { id: "B", text: "$6$" },
      { id: "C", text: "$9$" },
      // distractor: cubes the scale factor, as if scaling a volume
      { id: "D", text: "$27$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Area depends on $r^2$, so tripling the radius multiplies the area by $3^2 = 9$.\n\n**The Full Solution:**\nStep 1: Let circle $A$ have radius $a$, so its area is $\\pi a^2$. Circle $B$ then has radius $3a$.\nStep 2: The area of circle $B$ is $\\pi(3a)^2 = 9\\pi a^2$.\nStep 3: $9\\pi a^2 = 9(\\pi a^2)$, so $k = 9$. Check: with $a = 1$ the areas are $\\pi$ and $9\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): reports the radius factor; lengths scale by $3$ but areas do not.\n* Choice B ($6$): doubles the factor instead of squaring it, confusing $2 \\cdot 3$ with $3^2$.\n* Choice D ($27$): cubes the factor, which is how volume scales, not area.\n\n**Test Day Takeaway:** Scale a length by $n$ and area scales by $n^2$, volume by $n^3$. The exponent matches the number of dimensions.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-152",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "fill-in",
    question: "Each round tabletop in a university study commons covers $169\\pi$ square inches of surface. What is the diameter, in inches, of one tabletop?",
    correctAnswer: "26",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**The correct answer is $26$.**\n\n**The Fast Way (~25s):** $\\pi r^{2}=169\\pi$ gives $r=13$, so the diameter is $26$ inches.\n\n**The Full Solution:**\n\nStep 1: Set up the area equation. $\\pi r^{2}=169\\pi$.\n\nStep 2: Solve for the radius. Dividing by $\\pi$ gives $r^{2}=169$, so $r=13$ inches.\n\nStep 3: Double it. The diameter is $2r=26$ inches.\n\nCheck: $\\pi(13)^{2}=169\\pi$, matching the stated surface.\n\n**Common Mistakes:**\n\n* $13$: stops at the radius instead of doubling it for the diameter.\n* $169$: reports the area's coefficient without taking a square root.\n* $6.5$: halves the radius rather than doubling it.\n\n**Test Day Takeaway:** Take the square root to reach the radius, then read the question again — diameter means one more doubling.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-153",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the $xy$-plane, the graph of $x^2 + y^2 - 10x + 24y = 0$ is a circle. The area of this circle can be written as $k\\pi$, where $k$ is a constant. What is the value of $k$?",
    choices: [
      // distractor: reports the radius instead of the coefficient of pi in the area
      { id: "A", text: "$13$" },
      // distractor: reports the diameter instead of r squared
      { id: "B", text: "$26$" },
      { id: "C", text: "$169$" },
      // distractor: doubles r squared, as if the area were 2 pi r squared
      { id: "D", text: "$338$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Completing both squares gives $(x - 5)^2 + (y + 12)^2 = 169$, so $r^2 = 169$ and the area is $169\\pi$.\n\n**The Full Solution:**\nStep 1: Group the variables: $(x^2 - 10x) + (y^2 + 24y) = 0$.\nStep 2: Complete each square. Half of $-10$ is $-5$, and half of $24$ is $12$, so add $25$ and $144$ to both sides: $(x - 5)^2 + (y + 12)^2 = 169$.\nStep 3: The right side is $r^2 = 169$, so the area is $\\pi r^2 = 169\\pi$ and $k = 169$. Check: $r = 13$, and the origin satisfies the original equation, so it lies on the circle - its distance from $(5, -12)$ is indeed $13$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($13$): reports the radius rather than the coefficient of $\\pi$ in the area.\n* Choice B ($26$): reports the diameter, which would be the circumference coefficient, not the area coefficient.\n* Choice D ($338$): doubles $r^2$, as though the area were $2\\pi r^2$.\n\n**Test Day Takeaway:** A circle equation with $x$ and $y$ terms is not ready to read. Complete both squares first; whatever lands on the right side is $r^2$, which is exactly the coefficient the area needs.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-154",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "fill-in",
    question: "A sign maker cuts a circular aluminum blank of radius $r$ inches whose face covers as much area as two blanks of radii $20$ inches and $21$ inches combined. What is the value of $r$?",
    correctAnswer: "29",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**The correct answer is $29$.**\n\n**The Fast Way (~45s):** $r^{2}=20^{2}+21^{2}=841$, so $r=29$ inches.\n\n**The Full Solution:**\n\nStep 1: Add the two areas. $\\pi(20)^{2}+\\pi(21)^{2}=400\\pi+441\\pi=841\\pi$ square inches.\n\nStep 2: Set the new blank equal to that total. $\\pi r^{2}=841\\pi$, so $r^{2}=841$.\n\nStep 3: Take the positive root. $r=29$ inches, since a radius must be positive.\n\nCheck: $\\pi(29)^{2}=841\\pi$, exactly the combined area.\n\n**Common Mistakes:**\n\n* $41$: adds the radii, $20+21$, as though areas scaled linearly with radius.\n* $841$: reports $r^{2}$ instead of $r$.\n* $20.5$: averages the two radii rather than combining areas.\n\n**Test Day Takeaway:** Areas add, radii do not — combine the squares first, then take one square root at the end.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  // ===== Phase 2 batch 17/2: square-perimeter (8 items) =====
  {
    id: "bank-geo-155",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A textile finisher lines the floor of a square pressing tray with adhesive tape along all four edges, and the tray floor covers $196$ square inches. What is the total length, in inches, of tape needed?",
    choices: [
      // distractor: stops at the side length 14 and never multiplies by 4
      { id: "A", text: "$14$" },
      // distractor: doubles the side instead of quadrupling it: 2 x 14 = 28
      { id: "B", text: "$28$" },
      // distractor: divides the area by 4 without taking a square root: 196/4 = 49
      { id: "C", text: "$49$" },
      { id: "D", text: "$56$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $\\sqrt{196}=14$, so each edge is $14$ inches and the four edges total $4(14)=56$ inches.\n\n**The Full Solution:**\n\nStep 1 — A square of side $s$ has area $s^2$, so $s^2=196$.\n\nStep 2 — Solve: $s=\\sqrt{196}=14$ inches, taking the positive root because $s$ is a length.\n\nStep 3 — The tape runs along all four edges, a total of $4s=4(14)=56$ inches. Check: a $14$-by-$14$ square does have area $196$ and perimeter $56$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($14$): this is one edge, not the whole border.\n* Choice B ($28$): this covers two edges, doubling instead of quadrupling.\n* Choice C ($49$): this divides the area by $4$ without ever taking a square root.\n\n**Test Day Takeaway:** Move from area to side with a square root first; only then multiply by $4$ for the border.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-156",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "fill-in",
    question: "An autoclave door carries a square inspection window framed by a rubber gasket that runs $72$ centimeters around the window's edge. What is the area, in square centimeters, of the window?",
    correctAnswer: "324",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**The correct answer is $324$.**\n\n**The Fast Way (~15s):** $\\frac{72}{4}=18$ centimeters per side, so the area is $18^2=324$ square centimeters.\n\n**The Full Solution:**\n\nStep 1 — The gasket traces the perimeter, so $4s=72$ where $s$ is the side length.\n\nStep 2 — Solve: $s=\\frac{72}{4}=18$ centimeters.\n\nStep 3 — Square it: $A=s^2=18^2=324$ square centimeters. Check: an $18$-centimeter square has perimeter $4(18)=72$, matching the gasket.\n\n**Common Mistakes:** Answering $18$ stops at the side length. Answering $5{,}184$ squares the perimeter instead of the side, $72^2$. Halving the perimeter instead of quartering it gives a side of $36$ and an area of $36^2=1{,}296$.\n\n**Test Day Takeaway:** Perimeter divides by $4$ to give a side; only a side gets squared for area.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-157",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An airport kiosk uses square floor mats, and one mat covers $A$ square inches. Which expression gives the perimeter, in inches, of that mat?",
    choices: [
      // distractor: divides the area by 4 without taking a square root first
      { id: "A", text: "$\\frac{A}{4}$" },
      // distractor: gives the side length rather than the perimeter
      { id: "B", text: "$\\sqrt{A}$" },
      // distractor: totals only two of the mat's four edges
      { id: "C", text: "$2\\sqrt{A}$" },
      { id: "D", text: "$4\\sqrt{A}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** A square of area $A$ has side $\\sqrt{A}$, so its perimeter is $4\\sqrt{A}$.\n\n**The Full Solution:**\n\nStep 1 — Let $s$ be the side length of the mat, so $s^2=A$.\n\nStep 2 — Solve for the side: $s=\\sqrt{A}$, the positive root, since $s$ is a length.\n\nStep 3 — The perimeter of a square is $4s$, so it equals $4\\sqrt{A}$ inches. Check: a mat with $A=100$ has side $10$ and perimeter $40$, and $4\\sqrt{100}=40$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{A}{4}$): this divides the area by $4$; with $A=100$ it gives $25$, not $40$.\n* Choice B ($\\sqrt{A}$): this is one side, not the border around all four.\n* Choice C ($2\\sqrt{A}$): this adds only two edges.\n\n**Test Day Takeaway:** Test a friendly value such as $A=100$ against every expression when the answer choices are symbolic.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-158",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "A square hotel courtyard covers $2{,}025$ square meters, and fencing along its edge costs $\\$18$ per meter. What is the total cost, in dollars, of fencing the courtyard's edge?",
    correctAnswer: "3240",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**The correct answer is $3240$.**\n\n**The Fast Way (~30s):** $\\sqrt{2{,}025}=45$, so the perimeter is $4(45)=180$ meters and the cost is $180(18)=3{,}240$ dollars.\n\n**The Full Solution:**\n\nStep 1 — Find the side: $s^2=2{,}025$, so $s=\\sqrt{2{,}025}=45$ meters.\n\nStep 2 — Find the perimeter: $4s=4(45)=180$ meters of fencing.\n\nStep 3 — Multiply by the unit price: $180(18)=3{,}240$ dollars. Check: $45^2=2{,}025$ confirms the side, and $180$ meters at $18$ dollars each is $3{,}240$.\n\n**Common Mistakes:** Pricing the side alone gives $45(18)=810$. Pricing the area gives $2{,}025(18)=36{,}450$. Stopping at the perimeter reports $180$, a length rather than a cost.\n\n**Test Day Takeaway:** Fencing is priced per unit of length, so convert area to side to perimeter before any money enters the arithmetic.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-159",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A workshop cuts square felt tiles in two sizes, and the perimeter of a large tile is $3$ times the perimeter of a small tile. The area of a large tile is $k$ times the area of a small tile. What is the value of $k$?",
    choices: [
      // distractor: square-roots the perimeter ratio instead of squaring it
      { id: "A", text: "$\\sqrt{3}$" },
      // distractor: reports the perimeter ratio 3 as though area scaled the same way
      { id: "B", text: "$3$" },
      { id: "C", text: "$9$" },
      // distractor: cubes the ratio, 3^3, as if comparing volumes
      { id: "D", text: "$27$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Square Perimeter and Area Scaling**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Perimeter scales like a side, so the sides are in the ratio $3$, and areas scale by $3^2=9$.\n\n**The Full Solution:**\n\nStep 1 — Let the small tile have side $s$, so its perimeter is $4s$ and its area is $s^2$.\n\nStep 2 — The large perimeter is $3(4s)=12s$, so the large side is $\\frac{12s}{4}=3s$.\n\nStep 3 — The large area is $(3s)^2=9s^2$, which is $9$ times $s^2$, so $k=9$. Check: with $s=2$, the tiles have perimeters $8$ and $24$ and areas $4$ and $36$, and $\\frac{36}{4}=9$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\sqrt{3}$): this takes a square root when the step from length to area calls for a square.\n* Choice B ($3$): this reuses the perimeter ratio, which governs lengths, not areas.\n* Choice D ($27$): this cubes the ratio, the rule for volumes of similar solids.\n\n**Test Day Takeaway:** Perimeter and side length scale by $k$; area scales by $k^2$ — pick the exponent from the dimension being compared.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-160",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "A weaver stretches linen over a square frame; each side of the frame measures $3k$ centimeters for a positive constant $k$, and $84$ centimeters of binding tape wraps the frame exactly once. What is the area, in square centimeters, of the frame?",
    correctAnswer: "441",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**The correct answer is $441$.**\n\n**The Fast Way (~30s):** The perimeter is $4(3k)=12k=84$, so $k=7$, each side is $21$ centimeters, and the area is $21^2=441$.\n\n**The Full Solution:**\n\nStep 1 — Write the perimeter in terms of $k$: four sides of $3k$ give $12k$ centimeters.\n\nStep 2 — The tape wraps the frame exactly once, so $12k=84$ and $k=7$. Each side is $3(7)=21$ centimeters.\n\nStep 3 — Square the side: $A=21^2=441$ square centimeters. Check: $4(21)=84$, matching the tape.\n\n**Common Mistakes:** Answering $7$ reports $k$ instead of the area. Answering $21$ reports the side length. Solving $3k=84$ gives $k=28$, a side of $84$, and an area of $7{,}056$.\n\n**Test Day Takeaway:** When a side is written as a multiple of a constant, build the perimeter symbolically first — the constant falls out in one division.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-161",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A square has a side length of $3x - 7$, and a second square has a side length of $2x + 1$. The perimeter of the first square is $8$ greater than the perimeter of the second square. What is the value of $x$?",
    choices: [
      // distractor: adds the 8 to the first perimeter instead of the second
      { id: "A", text: "$6$" },
      // distractor: drops the 8 and sets the two perimeters equal
      { id: "B", text: "$8$" },
      { id: "C", text: "$10$" },
      // distractor: compares the side lengths instead of the perimeters
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The perimeters are $12x - 28$ and $8x + 4$, so $12x - 28 = (8x + 4) + 8$ gives $4x = 40$ and $x = 10$.\n\n**The Full Solution:**\nStep 1: Each perimeter is four times its side length: the first square has perimeter $4(3x - 7) = 12x - 28$, and the second has perimeter $4(2x + 1) = 8x + 4$.\nStep 2: The comparison is between the two perimeters, so the larger one is the second plus $8$: $12x - 28 = (8x + 4) + 8$, which is $12x - 28 = 8x + 12$.\nStep 3: Subtract $8x$ and add $28$: $4x = 40$, so $x = 10$. Check: the sides are $23$ and $21$, the perimeters are $92$ and $84$, and $92 - 84 = 8$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): attaches the $8$ to the first square, solving $(12x - 28) + 8 = 8x + 4$; the first perimeter is the larger one, so the $8$ belongs on the other side.\n* Choice B ($8$): drops the $8$ and sets the perimeters equal, $12x - 28 = 8x + 4$.\n* Choice D ($16$): compares the side lengths instead of the perimeters, solving $3x - 7 = (2x + 1) + 8$.\n\n**Test Day Takeaway:** A comparison sentence applies to the quantity it names. Write both perimeters in full, then add the difference to the smaller side of the equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-162",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "fill-in",
    question: "A rectangle has a length that is $3$ times its width and an area of $108$ square centimeters. A square has the same perimeter as this rectangle. What is the area, in square centimeters, of the square?",
    correctAnswer: "144",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**The correct answer is $144$.**\n\n**The Fast Way (~50s):** $3w^2 = 108$ gives $w = 6$ and $\\ell = 18$, so the shared perimeter is $48$, the square's side is $12$, and its area is $144$.\n\n**The Full Solution:**\nStep 1: Let the width be $w$, so the length is $3w$ and the area is $3w^2 = 108$. Then $w^2 = 36$ and $w = 6$ centimeters, so the length is $18$ centimeters.\nStep 2: The rectangle's perimeter is $2(6 + 18) = 48$ centimeters, and the square has the same perimeter, so its side is $\\frac{48}{4} = 12$ centimeters.\nStep 3: The square's area is $12^2 = 144$ square centimeters. Check: the square and the rectangle both have perimeter $48$, and the square encloses more area, as it must. $\\checkmark$\n\n**Common Mistakes:**\n* Matching the areas instead of the perimeters, which would give $108$.\n* Gridding the shared perimeter $48$ or the square's side $12$ instead of the area.\n* Solving $3w = 108$ for the width, giving $w = 36$, which treats the area as a length.\n\n**Test Day Takeaway:** Two-figure problems hinge on the shared quantity. Find it explicitly, carry it to the second figure, then answer in the requested units.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  // ===== Phase 2 batch 17/3: angles-with-parallel-lines-and-transversals (8 items) =====
  {
    id: "bank-geo-163",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In a bookstore display, a straight diagonal strap is fastened across two parallel shelf rails. At the upper rail the strap forms an angle measuring $(4x+10)°$ above the rail and to the right of the strap, and at the lower rail the angle in that same position measures $(6x-20)°$. What is the value of $x$?",
    choices: [
      { id: "A", text: "$15$" },
      // distractor: treats the corresponding angles as supplementary, solving 10x - 10 = 180
      { id: "B", text: "$19$" },
      // distractor: solves 2x = 30 and reports 2x instead of x
      { id: "C", text: "$30$" },
      // distractor: reports the angle measure 4(15) + 10 = 70 instead of x
      { id: "D", text: "$70$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Angles with Parallel Lines and Transversals**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Corresponding angles at parallel rails are equal, so $4x+10=6x-20$ and $x=15$.\n\n**The Full Solution:**\n\nStep 1: Classify the pair. Both angles sit above their rail on the same side of the strap, so they are corresponding angles and are congruent.\n\nStep 2: Set them equal. $4x+10=6x-20$.\n\nStep 3: Solve. $30=2x$, so $x=15$.\n\nCheck: $4(15)+10=70$ and $6(15)-20=70$, the same measure.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($19$): treats the corresponding angles as supplementary, solving $(4x+10)+(6x-20)=180$.\n* Choice C ($30$): solves correctly down to $2x=30$ but reports $2x$ rather than $x$.\n* Choice D ($70$): reports the angle's measure, $70°$, instead of the value of $x$.\n\n**Test Day Takeaway:** Corresponding angles at parallel lines are equal — set the expressions equal, and then answer the variable actually requested.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-164",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "easy",
    type: "fill-in",
    question: "Two parallel irrigation laterals run across a field, and a straight supply pipe crosses both of them. Between the two laterals, the angle the pipe makes on the left side at the first crossing measures $(5y-8)°$, and the angle it makes on the right side at the second crossing measures $(3y+26)°$. What is the value of $y$?",
    correctAnswer: "17",
    explanation: "**SAT Pattern: Angles with Parallel Lines and Transversals**\n\n**The correct answer is $17$.**\n\n**The Fast Way (~30s):** Alternate interior angles at parallel lines are equal, so $5y-8=3y+26$ and $y=17$.\n\n**The Full Solution:**\n\nStep 1: Classify the pair. Both angles lie between the laterals and on opposite sides of the pipe, so they are alternate interior angles, which a transversal cutting parallel lines makes congruent.\n\nStep 2: Set the expressions equal. $5y-8=3y+26$.\n\nStep 3: Solve. $2y=34$, so $y=17$.\n\nCheck: $5(17)-8=77$ and $3(17)+26=77$, so both angles measure $77°$.\n\n**Common Mistakes:**\n\n* $9$: moves the $-8$ to the right with the wrong sign, solving $2y=26-8$.\n* $34$: solves down to $2y=34$ but reports $2y$ instead of $y$.\n* $77$: reports the shared angle measure rather than the value of $y$.\n\n**Test Day Takeaway:** Alternate interior angles are congruent, not supplementary — read which pair the problem names before writing the equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-165",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the figure, lines $\\ell$ and $m$ are parallel and are cut by transversal $t$. What is the value of $x$?",
    diagram: { type: "parallelLines", params: { angles: { top: ["54°", ""], bottom: ["", "x°"] }, lineLabels: ["ℓ", "m", "t"], figureNote: true } },
    choices: [
      // distractor: takes the complement of the marked angle
      { id: "A", text: "$36°$" },
      // distractor: treats the two marked angles as a congruent pair
      { id: "B", text: "$54°$" },
      { id: "C", text: "$126°$" },
      // distractor: adds 90 to the marked angle
      { id: "D", text: "$144°$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Angles with Parallel Lines and Transversals**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The $54°$ angle corresponds to the angle on the far side of the $x°$ angle at line $m$, and those two form a linear pair, so $x = 180 - 54 = 126$.\n\n**The Full Solution:**\nStep 1: At line $m$, the angle that corresponds to the $54°$ angle sits in the matching position, on the same side of the transversal, so it also measures $54°$.\nStep 2: That $54°$ angle and the angle marked $x°$ lie on opposite sides of the transversal along line $m$, so they form a linear pair and their measures sum to $180$.\nStep 3: $x = 180 - 54 = 126$. Check: $126 + 54 = 180$, and the obtuse marked angle is on the opposite side of the transversal from the acute $54°$ angle, as the figure shows. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($36°$): takes the complement, $90 - 54$, a relationship that does not apply to a linear pair.\n* Choice B ($54°$): assumes the two marked angles are a congruent pair, but they sit on opposite sides of the transversal at different lines.\n* Choice D ($144°$): adds $90$ to $54$, as if the transversal met the parallel lines at a right angle.\n\n**Test Day Takeaway:** Slide the known angle down to the second parallel line first (corresponding angles are equal), and only then use the linear pair at that intersection.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-166",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "fill-in",
    question: "Parallel lines $p$ and $q$ are crossed by transversal $r$, forming the two marked angles shown in the figure. What is the value of $x$?",
    diagram: { type: "parallelLines", params: { angles: { top: ["(5x - 4)°", ""], bottom: ["", "(3x + 24)°"] }, lineLabels: ["p", "q", "r"], figureNote: true } },
    correctAnswer: "20",
    explanation: "**SAT Pattern: Angles with Parallel Lines and Transversals**\n\n**The correct answer is $20$.**\n\n**The Fast Way (~30s):** The two marked angles are supplementary, so $(5x - 4) + (3x + 24) = 180$, giving $x = 20$.\n\n**The Full Solution:**\nStep 1: The angle marked $(5x - 4)°$ at line $p$ corresponds to the angle in the matching position at line $q$, so that angle also measures $(5x - 4)°$.\nStep 2: That angle and the angle marked $(3x + 24)°$ form a linear pair at line $q$, so $(5x - 4) + (3x + 24) = 180$, which is $8x + 20 = 180$.\nStep 3: $8x = 160$, so $x = 20$. Check: the angles measure $5(20) - 4 = 96$ and $3(20) + 24 = 84$ degrees, and $96 + 84 = 180$. $\\checkmark$\n\n**Common Mistakes:**\n* Setting the two expressions equal, which gives $2x = 28$ and $x = 14$; that rule fits corresponding or alternate angles, not this pair.\n* Gridding an angle measure ($96$ or $84$) instead of the value of $x$.\n* Setting the sum to $90$, which gives $8x + 20 = 90$ and the non-integer $x = 8.75$.\n\n**Test Day Takeaway:** Two marked angles at parallel lines are either equal or supplementary. Check whether they sit on the same side of the transversal before choosing the equation.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-167",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A laser alignment beam crosses a granite straightedge. The two angles lying above that crossing point have the degree measures marked in the figure. What is the measure, in degrees, of the smaller of those two angles?",
    diagram: { type: "intersectingLines", params: { angles: ["(3x + 12)°", "(5x - 8)°", "", ""], figureNote: true } },
    choices: [
      // distractor: stops at x = 22 instead of substituting to get an angle measure
      { id: "A", text: "$22$" },
      // distractor: treats the two marked angles as vertical angles, solving 5x - 8 = 3x + 12 to get x = 10 and an angle of 42
      { id: "B", text: "$42$" },
      { id: "C", text: "$78$" },
      // distractor: reports the larger marked angle, 5(22) - 8 = 102
      { id: "D", text: "$102$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertical and Linear-Pair Angles**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The two marked angles form a linear pair, so $(5x-8) + (3x+12) = 180$ gives $x = 22$, and the smaller angle is $3(22)+12 = 78$.\n\n**The Full Solution:**\nStep 1: The two marked angles sit side by side above the crossing point, so together they form a straight angle: $(5x - 8) + (3x + 12) = 180$.\nStep 2: Combining like terms gives $8x + 4 = 180$, so $8x = 176$ and $x = 22$.\nStep 3: The two measures are $5(22) - 8 = 102$ degrees and $3(22) + 12 = 78$ degrees, so the smaller one measures $78$ degrees.\n\nCheck: $102 + 78 = 180$, as a linear pair must. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($22$): reports $x$ itself instead of substituting it back into an angle expression.\n* Choice B ($42$): treats the two marked angles as vertical angles, solving $5x - 8 = 3x + 12$ for $x = 10$ and reporting $42$.\n* Choice D ($102$): finds $x$ correctly but reports the larger of the two angles.\n\n**Test Day Takeaway:** Adjacent angles on a line sum to $180^\\circ$; only angles across the vertex from each other are equal.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-168",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "fill-in",
    question: "In the figure, transversal $n$ intersects parallel lines $j$ and $k$. What is the measure, in degrees, of the angle marked $(6y - 15)°$?",
    diagram: { type: "parallelLines", params: { angles: { top: ["(6y - 15)°", ""], bottom: ["(4y + 9)°", ""] }, lineLabels: ["j", "k", "n"], figureNote: true } },
    correctAnswer: "57",
    explanation: "**SAT Pattern: Angles with Parallel Lines and Transversals**\n\n**The correct answer is $57$.**\n\n**The Fast Way (~25s):** The marked angles correspond, so $6y - 15 = 4y + 9$ gives $y = 12$ and $6(12) - 15 = 57$.\n\n**The Full Solution:**\nStep 1: The two marked angles occupy matching positions at the two parallel lines, so they are corresponding angles and are congruent: $6y - 15 = 4y + 9$.\nStep 2: Subtract $4y$ and add $15$: $2y = 24$, so $y = 12$.\nStep 3: The requested measure is $6(12) - 15 = 57$ degrees. Check: $4(12) + 9 = 57$ as well, so the two corresponding angles agree. $\\checkmark$\n\n**Common Mistakes:**\n* Gridding $y = 12$ instead of the angle measure the question asks for.\n* Setting the sum equal to $180$: $10y - 6 = 180$ gives $y = 18.6$, a non-integer that signals the wrong angle relationship.\n* Reporting the supplement, $180 - 57 = 123$, which is the adjacent angle rather than the marked one.\n\n**Test Day Takeaway:** Corresponding angles are equal, so set the expressions equal - then finish the job by substituting back for the measure.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-169",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A straight service road crosses two parallel rows of solar panels as drawn, where $a$ and $b$ are constants. What is the measure, in degrees, of the angle marked $(2a+2b)°$?",
    diagram: { type: "parallelLines", params: { angles: { top: ["(7a - 2b)°", "(2a + 2b)°"], bottom: ["(3a + 2b)°", ""] }, lineLabels: ["ℓ", "m", "t"], figureNote: true } },
    choices: [
      // distractor: reports the constant b = 20 rather than an angle measure
      { id: "A", text: "$20$" },
      // distractor: reports a + b = 40 rather than an angle measure
      { id: "B", text: "$40$" },
      { id: "C", text: "$80$" },
      // distractor: gives the supplementary angle marked (7a - 2b) degrees, which is 100
      { id: "D", text: "$100$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Angles with Parallel Lines (System of Two Conditions)**\n\n**Choice C is correct.**\n\n**The Fast Way (~55s):** The two top angles are a linear pair, so $9a=180$ and $a=20$; corresponding angles then give $b=20$, so $(2a+2b)°=80°$.\n\n**The Full Solution:**\n\nStep 1: Use the linear pair on the upper row. $(7a-2b)+(2a+2b)=180$ simplifies to $9a=180$, so $a=20$.\n\nStep 2: Use corresponding angles. The angle $(7a-2b)°$ on the upper row corresponds to $(3a+2b)°$ on the lower row, so $7a-2b=3a+2b$, giving $4a=4b$ and $b=a=20$.\n\nStep 3: Evaluate the requested angle. $(2a+2b)°=(40+40)°=80°$.\n\nCheck: the angles become $100°$, $80°$, and $100°$; the first two sum to $180°$ and the first and third are equal, as parallel lines require.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($20$): reports the constant $b$ instead of the angle it helps produce.\n* Choice B ($40$): reports $a+b$, stopping one substitution short of the angle measure.\n* Choice D ($100$): gives the angle marked $(7a-2b)°$, the supplement of the one asked for.\n\n**Test Day Takeaway:** Two labeled angles at one intersection plus one corresponding angle across the transversal give two equations — solve the system before evaluating.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-170",
    domain: "geometry",
    skills: ["triangle-angle-sum"],
    difficulty: "hard",
    type: "fill-in",
    question: "A stair stringer runs straight across two parallel handrails in a school stairwell. On one side of the stringer, the interior angle it makes with the upper handrail is $(9x-4k)°$ and the interior angle it makes with the lower handrail is $(11x+4k)°$, where $k$ is a constant. The second of these is $123°$. What is the value of $k$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Angles with Parallel Lines and Transversals**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~60s):** Same-side interior angles at parallel lines are supplementary, so $20x=180$ and $x=9$; then $11(9)+4k=123$ gives $k=6$.\n\n**The Full Solution:**\n\nStep 1: Use the parallel handrails. The two marked angles lie between the handrails on the same side of the stringer, so they are supplementary: $(9x-4k)+(11x+4k)=180$, and the $k$ terms cancel, leaving $20x=180$.\n\nStep 2: Solve for $x$. $x=9$.\n\nStep 3: Substitute into the second angle. $11(9)+4k=123$ becomes $99+4k=123$, so $4k=24$ and $k=6$.\n\nCheck: the first angle is $9(9)-4(6)=57$, and $57+123=180$, as two same-side interior angles must.\n\n**Common Mistakes:**\n\n* $24$: stops at $4k=24$ and reports $4k$ instead of $k$.\n* $9$: reports $x$, the value found in the first step, rather than the constant asked for.\n* $-10.5$: assigns $123°$ to the upper-handrail expression, solving $81-4k=123$.\n\n**Test Day Takeaway:** Same-side interior angles at parallel lines add to $180°$ — add the two expressions first, and a parameter that cancels hands you the other variable for free.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "angles-with-parallel-lines-and-transversals",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  // ─── TRIG RATIO FROM PERIMETER (bank-geo-171..178) ───────────────────────
  // Granularity principle: when only the perimeter is given (one constraint),
  // student must first solve for the sides before taking the trig ratio.
  // Different setup from "given sides, find ratio" (right-triangle-trig-ratios).
  {
    id: "bank-geo-171",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The skylight-well brace shown has a right angle at $B$, and $\\sin A = \\frac{12}{13}$. If $90$ centimeters of steel angle forms the brace's three edges, how long is $\\overline{BC}$, in centimeters?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 36]], labels: ["A", "B", "C"], sideLabels: ["", "", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: stops at the scale factor k = 3 instead of evaluating 12k
      { id: "A", text: "$3$" },
      // distractor: reports the leg adjacent to A, 5k = 15
      { id: "B", text: "$15$" },
      { id: "C", text: "$36$" },
      // distractor: reports the hypotenuse, 13k = 39
      { id: "D", text: "$39$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice C is correct.** $\\sin A = \\frac{12}{13}$ makes the sides $5k$, $12k$, $13k$; the perimeter $30k = 90$ gives $k = 3$, so $BC = 12k = 36$ centimeters.\n\n**The Fast Way (~40s):** $5$-$12$-$13$ scaled to a perimeter of $90$ means $k = 3$, so $BC = 36$.\n\n**The Full Solution:**\n\nStep 1: The right angle is at $B$, so $\\overline{AC}$ is the hypotenuse and $\\sin A = \\frac{BC}{AC} = \\frac{12}{13}$.\n\nStep 2: Write $BC = 12k$ and $AC = 13k$; then $AB = \\sqrt{169k^2 - 144k^2} = 5k$, so the perimeter is $30k$.\n\nStep 3: From $30k = 90$, $k = 3$, so $BC = 12(3) = 36$ centimeters. Check: the sides are $15$, $36$, $39$; they sum to $90$ and $15^2 + 36^2 = 1521 = 39^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($3$): stops at the scale factor $k$.\n* Choice B ($15$): reports $\\overline{AB}$, the leg adjacent to $A$.\n* Choice D ($39$): reports the hypotenuse $\\overline{AC}$.\n\n**Test Day Takeaway:** A sine value fixes the RATIO of the sides; a perimeter fixes their SIZE — combine the two and every side falls out at once.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-172",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "fill-in",
    question: "A handrail bracket is a right triangle whose legs measure $5m$ and $12m$ millimeters for a positive constant $m$, and whose perimeter is $120$ millimeters. What is the value of $m$?",
    correctAnswer: "4",
    explanation: "**SAT Pattern: Right Triangle Trig — Perimeter Constraint to Sides**\n\n**The correct answer is $4$.**\n\n**The Fast Way (~30s):** Legs $5m$ and $12m$ give hypotenuse $13m$, so $30m = 120$ and $m = 4$.\n\n**The Full Solution:**\n\nStep 1: With legs $5m$ and $12m$, the hypotenuse is $\\sqrt{25m^2 + 144m^2} = \\sqrt{169m^2} = 13m$.\n\nStep 2: The perimeter is $5m + 12m + 13m = 30m$, and this equals $120$ millimeters.\n\nStep 3: So $m = \\frac{120}{30} = 4$. Check: the sides are $20$, $48$, and $52$ millimeters, $20 + 48 + 52 = 120$, and $20^2 + 48^2 = 400 + 2304 = 2704 = 52^2$.\n\n**Common Mistakes:**\n\n* $20$ — reporting the shorter leg $5m$ instead of the constant $m$.\n* $48$ — reporting the longer leg $12m$.\n* $7.06$ — leaving the hypotenuse out of the perimeter and solving $17m = 120$.\n\n**Test Day Takeaway:** When both legs share a constant factor, the hypotenuse carries the same factor — write the perimeter as a single multiple of that constant before dividing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },
  {
    id: "bank-geo-173",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The sunshade fin shown is a right triangle whose leg lengths, in centimeters, are given in terms of a positive constant $t$. If $120$ centimeters of aluminum trim exactly wraps the fin, how long, in centimeters, is its longest edge?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [45, 0], [45, 24]], sideLabels: ["15t", "8t", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: reports the shorter leg, 8t = 24, instead of the longest edge
      { id: "A", text: "$24$" },
      // distractor: reports the longer leg, 15t = 45
      { id: "B", text: "$45$" },
      { id: "C", text: "$51$" },
      // distractor: reports the perimeter, 120, rather than a single edge
      { id: "D", text: "$120$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice C is correct.** The hypotenuse is $17t$, so the perimeter $40t = 120$ gives $t = 3$ and the longest edge is $17(3) = 51$ centimeters.\n\n**The Fast Way (~35s):** $8$-$15$-$17$ scaled so the perimeter is $120$ means $t = 3$; the longest edge is $51$.\n\n**The Full Solution:**\n\nStep 1: With legs $8t$ and $15t$, the hypotenuse is $\\sqrt{64t^2 + 225t^2} = \\sqrt{289t^2} = 17t$.\n\nStep 2: The trim covers all three edges: $8t + 15t + 17t = 40t = 120$, so $t = 3$.\n\nStep 3: The longest edge is the hypotenuse, $17(3) = 51$ centimeters. Check: the sides are $24$, $45$, $51$; they sum to $120$ and $24^2 + 45^2 = 576 + 2025 = 2601 = 51^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($24$): reports the shorter leg $8t$.\n* Choice B ($45$): reports the longer leg $15t$.\n* Choice D ($120$): reports the perimeter instead of a single edge.\n\n**Test Day Takeaway:** Turn the perimeter into one equation in the shared constant; the hypotenuse of an $8t$-$15t$ right triangle is always $17t$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-174",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "fill-in",
    question: "For the acute angle $\\theta$ marked on the gas-manifold mounting plate shown, $\\tan\\theta = \\frac{7}{24}$, and the plate's longest edge is $25$ centimeters. What is the plate's perimeter, in centimeters?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 7]], labels: ["θ", "", ""], sideLabels: ["", "", "25 cm"], rightAngleVertex: 1 } },
    correctAnswer: "56",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**The correct answer is $56$.**\n\n**The Fast Way (~30s):** $\\tan\\theta = \\frac{7}{24}$ with hypotenuse $25$ is the $7$-$24$-$25$ triple exactly, so the perimeter is $7 + 24 + 25 = 56$.\n\n**The Full Solution:**\n\nStep 1: $\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{7}{24}$, so the legs are $7k$ and $24k$ for some positive $k$.\n\nStep 2: The hypotenuse is then $25k$, and the plate's longest edge is $25$ centimeters, so $k = 1$ and the legs are $7$ and $24$ centimeters.\n\nStep 3: The perimeter is $7 + 24 + 25 = 56$ centimeters. Check: $7^2 + 24^2 = 49 + 576 = 625 = 25^2$.\n\n**Common Mistakes:**\n\n* $31$ — adding only the two legs and leaving out the $25$-centimeter edge.\n* $84$ — computing the area $\\frac{1}{2}(7)(24)$ instead of the perimeter.\n* $25$ — reporting the longest edge alone.\n\n**Test Day Takeaway:** A tangent ratio names the legs up to a scale factor; one given side pins the factor, and then every side is available.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-175",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A clerestory truss panel is shaped as a right triangle whose hypotenuse measures $h$ meters and whose smaller acute angle measures $\\theta$. Which expression gives the perimeter, in meters, of the panel?",
    choices: [
      // distractor: adds the two legs but leaves out the hypotenuse itself
      { id: "A", text: "$h(\\sin\\theta + \\cos\\theta)$" },
      // distractor: uses the tangent, which compares the legs to each other rather than to the hypotenuse, and counts only one leg
      { id: "B", text: "$h(1 + \\tan\\theta)$" },
      // distractor: multiplies the two leg ratios instead of adding them
      { id: "C", text: "$h(\\sin\\theta\\cos\\theta + 1)$" },
      { id: "D", text: "$h(1 + \\sin\\theta + \\cos\\theta)$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice D is correct.** The legs are $h\\sin\\theta$ and $h\\cos\\theta$, so the perimeter is $h + h\\sin\\theta + h\\cos\\theta = h(1 + \\sin\\theta + \\cos\\theta)$.\n\n**The Fast Way (~30s):** Legs are $h\\sin\\theta$ and $h\\cos\\theta$; add the hypotenuse $h$ and factor.\n\n**The Full Solution:**\n\nStep 1: For the acute angle $\\theta$, the opposite leg is $h\\sin\\theta$ and the adjacent leg is $h\\cos\\theta$, since each ratio is a leg over the hypotenuse.\n\nStep 2: The perimeter adds all three sides: $h + h\\sin\\theta + h\\cos\\theta$.\n\nStep 3: Factor out $h$: $h(1 + \\sin\\theta + \\cos\\theta)$. Check with $\\theta = 30^\\circ$ and $h = 2$: the legs are $1$ and $\\sqrt{3}$, the perimeter is $3 + \\sqrt{3} \\approx 4.73$, and $2\\left(1 + \\frac{1}{2} + \\frac{\\sqrt{3}}{2}\\right) = 3 + \\sqrt{3}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($h(\\sin\\theta + \\cos\\theta)$): adds the two legs but omits the hypotenuse.\n* Choice B ($h(1 + \\tan\\theta)$): the tangent compares the legs with each other, not with $h$, so $h\\tan\\theta$ is not a side here.\n* Choice C ($h(\\sin\\theta\\cos\\theta + 1)$): multiplies the two leg ratios instead of adding them.\n\n**Test Day Takeaway:** Sine and cosine convert a hypotenuse into both legs; a perimeter in terms of $h$ and $\\theta$ always factors as $h(1 + \\sin\\theta + \\cos\\theta)$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-176",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "fill-in",
    question: "A right triangle has a perimeter of $30$ and an area of $30$. What is the value of $\\sin\\theta$, where $\\theta$ is the smallest angle of the triangle? Express your answer as a fraction.",
    correctAnswer: "5/13",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**The correct answer is $\\frac{5}{13}$.**\n\n**The Fast Way (~60s):** From $a + b = 30 - c$ and $ab = 60$, squaring gives $(30 - c)^2 = c^2 + 120$, so $c = 13$ and the legs are $5$ and $12$. Then $\\sin\\theta = \\frac{5}{13}$.\n\n**The Full Solution:**\nStep 1: Let the legs be $a$ and $b$ and the hypotenuse be $c$. The area gives $\\frac{1}{2}ab = 30$, so $ab = 60$, and the perimeter gives $a + b = 30 - c$.\nStep 2: Square the perimeter relation: $(a + b)^2 = a^2 + b^2 + 2ab = c^2 + 120$. So $(30 - c)^2 = c^2 + 120$, which expands to $900 - 60c = 120$, giving $c = 13$.\nStep 3: Then $a + b = 17$ and $ab = 60$, so the legs solve $t^2 - 17t + 60 = 0$, giving $t = 5$ and $t = 12$. The smallest angle is opposite the shortest side, so $\\sin\\theta = \\frac{5}{13}$. Check: $5 + 12 + 13 = 30$ and $\\frac{1}{2}(5)(12) = 30$. $\\checkmark$\n\n**Common Mistakes:**\n* Pairing $\\theta$ with the longer leg, which gives $\\frac{12}{13}$ - but the smallest angle always faces the shortest side.\n* Using $ab = 30$ instead of $ab = 60$ by forgetting the factor $\\frac{1}{2}$ in the area formula.\n* Gridding the side length $5$ or the hypotenuse $13$ instead of the ratio.\n\n**Test Day Takeaway:** Perimeter and area together determine a right triangle. Square the sum of the legs so that $a^2 + b^2$ becomes $c^2$, and the hypotenuse falls out in one line.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-177",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the right triangle shown, the hypotenuse has a length of $37$ and one leg has a length of $35$. If the perimeter of the triangle is $84$, which of the following is closest to the value of $\\tan\\theta$?",
    diagram: { type: "rightTriangle", params: { labels: ["θ", "", ""], sideLabels: ["35", "", "37"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: gives sin of theta instead of tan
      { id: "A", text: "$0.32$" },
      { id: "B", text: "$0.34$" },
      // distractor: gives cos of theta instead of tan
      { id: "C", text: "$0.95$" },
      // distractor: inverts the tangent ratio, adjacent over opposite
      { id: "D", text: "$2.92$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The missing leg is $84 - 37 - 35 = 12$, and $\\theta$ is opposite it, so $\\tan\\theta = \\frac{12}{35} \\approx 0.34$.\n\n**The Full Solution:**\nStep 1: The three sides sum to the perimeter, so the unlabeled leg is $84 - 35 - 37 = 12$.\nStep 2: In the figure, $\\theta$ is opposite the leg of length $12$ and adjacent to the leg of length $35$.\nStep 3: $\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{12}{35} \\approx 0.343$, which is closest to $0.34$. Check: $12^2 + 35^2 = 144 + 1{,}225 = 1{,}369 = 37^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.32$): this is $\\frac{12}{37} \\approx 0.324$, which is $\\sin\\theta$, using the hypotenuse instead of the adjacent leg.\n* Choice C ($0.95$): this is $\\frac{35}{37} \\approx 0.946$, which is $\\cos\\theta$.\n* Choice D ($2.92$): this is $\\frac{35}{12} \\approx 2.917$, the tangent of the other acute angle.\n\n**Test Day Takeaway:** When the perimeter and two sides are given, subtract to get the third side before touching any ratio. Then let SOH-CAH-TOA pick the two sides the ratio needs.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-178",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "fill-in",
    question: "A luggage-carousel ramp rests on a right triangular bracket whose legs measure $9c$ and $12c$ centimeters for some positive constant $c$, and the bracket's perimeter is $108$ centimeters. What is the length, in centimeters, of the leg opposite the acute angle whose tangent is $\\frac{3}{4}$?",
    correctAnswer: "27",
    explanation: "**SAT Pattern: Right Triangle Trigonometry with Perimeter**\n\n**The correct answer is $27$.**\n\n**The Fast Way (~35s):** Legs $9c$ and $12c$ force a hypotenuse of $15c$, so the perimeter $36c=108$ gives $c=3$ and legs $27$ and $36$. Tangent $\\frac{3}{4}=\\frac{27}{36}$, so the opposite leg is $27$.\n\n**The Full Solution:**\n\nStep 1 — Find the hypotenuse in terms of $c$. Since $(9c)^2+(12c)^2=81c^2+144c^2=225c^2$, the hypotenuse is $\\sqrt{225c^2}=15c$.\n\nStep 2 — Use the perimeter. $9c+12c+15c=36c$, and $36c=108$, so $c=3$. The sides are $27$, $36$, and $45$ centimeters.\n\nStep 3 — Identify the angle. Tangent is opposite over adjacent, and $\\frac{27}{36}=\\frac{3}{4}$, so the angle with tangent $\\frac{3}{4}$ has the $27$-centimeter leg opposite it. Check: $27+36+45=108$, matching the given perimeter.\n\n**Common Mistakes:** Reporting $36$ reads the tangent upside down and names the adjacent leg. Reporting $45$ names the hypotenuse instead of a leg. Leaving the hypotenuse out of the perimeter gives $21c=108$, so $c=\\frac{36}{7}$ and a leg near $46.3$ centimeters.\n\n**Test Day Takeaway:** When legs are given as multiples of one constant, the hypotenuse is that same multiple of a whole number — find the constant from the perimeter before touching the trigonometry.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "right-triangle-trigonometry-with-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  // ─── LINE TANGENT TO CIRCLE (bank-geo-179..186) ──────────────────────────
  // Granularity principle: line tangent to circle uses distance-from-center =
  // radius OR substitute-into-circle-equation paths. Distinct from line
  // tangent to parabola (which sets discriminant = 0 on a single quadratic
  // in x). Different geometric setup.
  {
    id: "bank-geo-179",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A conveyor belt in a textile mill runs along the line $y=2x+c$ and just grazes a circular drum modeled by $x^2+y^2=20$, with units in meters. If $c>0$, what is the value of $c$?",
    choices: [
      // distractor: reports the drum's radius sqrt(20) = 2 sqrt(5) as the intercept
      { id: "A", text: "$2\\sqrt{5}$" },
      // distractor: divides the correct intercept by the slope 2
      { id: "B", text: "$5$" },
      { id: "C", text: "$10$" },
      // distractor: uses r^2 = 20 in place of the radius when scaling
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** Substituting gives $5x^2+4cx+c^2-20=0$; tangency forces the discriminant to zero, $16c^2-20(c^2-20)=0$, so $c^2=100$ and $c=10$.\n\n**The Full Solution:**\n\nStep 1 — Substitute $y=2x+c$ into $x^2+y^2=20$: $x^2+(2x+c)^2=20$, which expands to $5x^2+4cx+c^2-20=0$.\n\nStep 2 — One intersection point means one solution, so the discriminant is zero: $(4c)^2-4(5)(c^2-20)=16c^2-20c^2+400=-4c^2+400=0$.\n\nStep 3 — Solve: $c^2=100$, so $c=10$ since $c>0$. Check: with $c=10$ the equation becomes $5x^2+40x+80=0$, or $5(x+4)^2=0$, whose only root is $x=-4$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($2\\sqrt{5}$): this is the drum's radius $\\sqrt{20}$, not the intercept of the tangent line.\n* Choice B ($5$): this divides the correct intercept by the slope $2$.\n* Choice D ($20$): this uses $r^2=20$ where the radius itself belongs.\n\n**Test Day Takeaway:** Substitute, collect into one quadratic, and set the discriminant to zero — tangency always means exactly one root.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-180",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "medium",
    type: "fill-in",
    question: "A circular hedge maze at a garden attraction is modeled by $x^2+y^2=r^2$ in the $xy$-plane, with units in meters, and a straight hedge row is tangent to the maze at the point $(6,8)$. What is the value of $r$?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~25s):** The point of tangency lies on the circle, so $6^2+8^2=r^2$, giving $r^2=100$ and $r=10$ meters.\n\n**The Full Solution:**\n\nStep 1 — A tangent line meets the circle at exactly one point, and that point is on the circle, so $(6,8)$ satisfies $x^2+y^2=r^2$.\n\nStep 2 — Substitute: $6^2+8^2=36+64=100=r^2$.\n\nStep 3 — Take the positive root: $r=10$ meters, since a radius is a length. Check: $(6,8)$ is exactly $10$ units from the origin, so the circle of radius $10$ passes through it.\n\n**Common Mistakes:** Answering $100$ reports $r^2$ rather than $r$. Adding the coordinates gives $14$, treating the distance as $6+8$. Answering $14.14$ uses $10\\sqrt{2}$, the diagonal of a $10$-by-$10$ square instead of the distance to $(6,8)$.\n\n**Test Day Takeaway:** The point of tangency is still a point on the circle — plug it in before doing anything harder.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-181",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A drainage channel at a campground follows a straight line that meets a circular retention pond at exactly one point. Substituting the line's equation into the pond's equation gives $5x^2-20x+k=0$. Which of the following must be true?",
    choices: [
      { id: "A", text: "$k=20$" },
      // distractor: describes a positive discriminant, which gives two intersection points, not one
      { id: "B", text: "$k<20$" },
      // distractor: describes a negative discriminant, which gives no intersection points
      { id: "C", text: "$k>20$" },
      // distractor: sets the constant term to zero instead of the discriminant
      { id: "D", text: "$k=0$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** Exactly one intersection means one root, so $(-20)^2-4(5)(k)=0$, giving $400=20k$ and $k=20$.\n\n**The Full Solution:**\n\nStep 1 — The substitution has produced a quadratic in $x$; each of its real roots is an intersection point of the line and the circle.\n\nStep 2 — Exactly one intersection point means exactly one real root, which happens when the discriminant equals zero: $b^2-4ac=(-20)^2-4(5)(k)=400-20k$.\n\nStep 3 — Set it to zero: $400-20k=0$, so $k=20$. Check: with $k=20$ the quadratic is $5x^2-20x+20=5(x-2)^2$, whose only root is $x=2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($k<20$): this makes the discriminant positive, giving two intersection points.\n* Choice C ($k>20$): this makes the discriminant negative, giving no intersection at all.\n* Choice D ($k=0$): this zeroes the constant term rather than the discriminant, and $5x^2-20x=0$ has two roots.\n\n**Test Day Takeaway:** Tangency is a statement about root count — translate it to \"discriminant equals zero\" before touching the algebra.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-182",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "hard",
    type: "fill-in",
    question: "A monorail track at a transit hub runs along the line $y=x+8$ and touches a circular plaza modeled by $x^2+y^2=r^2$ at exactly one point, where coordinates are measured in meters. What is the value of $r^2$?",
    correctAnswer: "32",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**The correct answer is $32$.**\n\n**The Fast Way (~45s):** Substituting gives $2x^2+16x+64-r^2=0$, and one point of contact forces the discriminant to zero: $256-8(64-r^2)=0$, so $r^2=32$.\n\n**The Full Solution:**\n\nStep 1 — Substitute $y=x+8$ into $x^2+y^2=r^2$: $x^2+(x+8)^2=r^2$, which expands to $2x^2+16x+64-r^2=0$.\n\nStep 2 — Touching at exactly one point means this quadratic has exactly one real root, so its discriminant vanishes: $16^2-4(2)(64-r^2)=256-512+8r^2=8r^2-256=0$.\n\nStep 3 — Solve: $8r^2=256$, so $r^2=32$ square meters. Check: with $r^2=32$ the quadratic is $2x^2+16x+32=2(x+4)^2$, whose only root is $x=-4$, giving the single point $(-4,4)$.\n\n**Common Mistakes:** Answering $4\\sqrt{2}$, about $5.66$, reports the radius $r$ rather than $r^2$. Setting the constant term $64-r^2$ to zero instead of the discriminant gives $64$. Reading the $8$ in the line's equation as the distance from the center to the track also gives $r^2=64$.\n\n**Test Day Takeaway:** Substitute, collect one quadratic, set the discriminant to zero — and reread whether the question wants $r$ or $r^2$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-183",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A lint-collection roller sweeps the circular region modeled by $(x+5)^2+(y-4)^2=9$, with units in centimeters. A horizontal guide rail lies along the line $y=k$ and meets that region at exactly one point. What is the greatest possible value of $k$?",
    choices: [
      // distractor: gives the lower tangent y = 4 - 3 = 1 rather than the greatest value
      { id: "A", text: "$1$" },
      // distractor: reports the radius 3 instead of a y-value
      { id: "B", text: "$3$" },
      // distractor: reports the center's y-coordinate, a line that crosses the region twice
      { id: "C", text: "$4$" },
      { id: "D", text: "$7$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The region is centered at $(-5,4)$ with radius $3$, so horizontal tangents are $y=4\\pm 3$, and the greatest is $y=7$.\n\n**The Full Solution:**\n\nStep 1 — Read the standard form: center $(-5,4)$ and radius $\\sqrt{9}=3$ centimeters.\n\nStep 2 — A horizontal line $y=k$ meets the circle once exactly when its distance from the center equals the radius, so $|k-4|=3$.\n\nStep 3 — Solve: $k=7$ or $k=1$, and the greater is $k=7$. Check: substituting $y=7$ gives $(x+5)^2+9=9$, so $x=-5$ is the only solution.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($1$): this is the lower tangent line, not the greatest value.\n* Choice B ($3$): this is the radius, not a location on the $y$-axis.\n* Choice C ($4$): this is the center's height, and $y=4$ crosses the region at two points.\n\n**Test Day Takeaway:** Horizontal tangents sit one radius above and below the center — the question's word \"greatest\" picks which one.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-184",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A survey sightline from a lookout at the origin follows $y=kx$ and grazes a circular fog bank modeled by $(x-5)^2+y^2=9$, with units in kilometers. If $k>0$, what is the value of $k$?",
    choices: [
      // distractor: squares the ratio radius/center-distance, (3/5)^2 = 9/25
      { id: "A", text: "$\\frac{9}{25}$" },
      // distractor: stops at k^2 = 9/16 and never takes the square root
      { id: "B", text: "$\\frac{9}{16}$" },
      // distractor: uses radius over distance-to-center, 3/5, as the slope
      { id: "C", text: "$\\frac{3}{5}$" },
      { id: "D", text: "$\\frac{3}{4}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**Choice D is correct.**\n\n**The Fast Way (~50s):** The distance from $(5,0)$ to $kx-y=0$ must equal $3$, so $\\frac{5k}{\\sqrt{k^2+1}}=3$, giving $25k^2=9k^2+9$ and $k=\\frac{3}{4}$.\n\n**The Full Solution:**\n\nStep 1 — Write the line as $kx-y=0$. The fog bank has center $(5,0)$ and radius $3$.\n\nStep 2 — Grazing means the distance from the center to the line equals the radius: $\\frac{|5k-0|}{\\sqrt{k^2+1}}=3$. Squaring gives $25k^2=9(k^2+1)$.\n\nStep 3 — Solve: $16k^2=9$, so $k^2=\\frac{9}{16}$ and $k=\\frac{3}{4}$ since $k>0$. Check: substituting $y=\\frac{3}{4}x$ into the circle gives $\\frac{25}{16}x^2-10x+16=0$, whose discriminant is $100-4\\left(\\frac{25}{16}\\right)(16)=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{9}{25}$): this squares $\\frac{3}{5}$, compounding two separate errors.\n* Choice B ($\\frac{9}{16}$): this stops at $k^2$ and never takes the square root.\n* Choice C ($\\frac{3}{5}$): this uses radius over distance-to-center, which is a sine, not a slope.\n\n**Test Day Takeaway:** Distance from a point to a line equals the radius is the fastest tangency test — and the final answer needs the square root.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-185",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "hard",
    type: "fill-in",
    question: "An ultrasound probe sweeps a circular field modeled by $(x-2)^2+(y-1)^2=8$ in the $xy$-plane, with units in centimeters, and the line $y=-x+c$ meets that field at exactly one point. What is the greatest value of $c$?",
    correctAnswer: "7",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**The correct answer is $7$.**\n\n**The Fast Way (~50s):** The distance from $(2,1)$ to $x+y-c=0$ must equal $\\sqrt{8}=2\\sqrt{2}$, so $\\frac{|3-c|}{\\sqrt{2}}=2\\sqrt{2}$, giving $|3-c|=4$ and $c=7$ or $c=-1$.\n\n**The Full Solution:**\n\nStep 1 — Read the circle: center $(2,1)$, radius $\\sqrt{8}=2\\sqrt{2}$ centimeters. Rewrite the line as $x+y-c=0$.\n\nStep 2 — Tangency means the distance from the center to the line equals the radius: $\\frac{|2+1-c|}{\\sqrt{1^2+1^2}}=2\\sqrt{2}$, so $|3-c|=2\\sqrt{2}\\cdot\\sqrt{2}=4$.\n\nStep 3 — Solve: $3-c=4$ gives $c=-1$, and $3-c=-4$ gives $c=7$. The greatest value is $7$. Check: with $c=7$, substituting $y=-x+7$ gives $2x^2-12x+18=2(x-3)^2$, whose only root is $x=3$.\n\n**Common Mistakes:** Answering $-1$ takes the smaller solution. Answering $3$ stops at the center's $x+y$ value. Dropping the $\\sqrt{2}$ in the denominator gives $|3-c|=2\\sqrt{2}$ and $c\\approx 5.83$.\n\n**Test Day Takeaway:** With a slanted line, divide by $\\sqrt{a^2+b^2}$ — forgetting that denominator is the single most common slip in tangency problems.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  {
    id: "bank-geo-186",
    domain: "geometry",
    skills: ["tangent-lines"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A sedimentation tank's rim is modeled by $x^2+y^2=36$ with units in meters, and an overflow channel lies along the line $y=\\frac{3}{4}x+b$, meeting the rim at exactly one point. If $b>0$, what is the value of $b$?",
    choices: [
      // distractor: multiplies the radius by 3/5 instead of 5/4
      { id: "A", text: "$3.6$" },
      // distractor: multiplies the radius by 4/5, the reciprocal of the correct factor 5/4
      { id: "B", text: "$4.8$" },
      // distractor: reports the radius 6 as the intercept
      { id: "C", text: "$6$" },
      { id: "D", text: "$7.5$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Tangent Line to Circle (Discriminant = 0)**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Write the line as $3x-4y+4b=0$; the distance from the origin is $\\frac{|4b|}{5}$, and setting it equal to the radius $6$ gives $b=7.5$.\n\n**The Full Solution:**\n\nStep 1 — The rim has center $(0,0)$ and radius $\\sqrt{36}=6$ meters. Clearing fractions in $y=\\frac{3}{4}x+b$ gives $3x-4y+4b=0$.\n\nStep 2 — Meeting at exactly one point means the distance from the center to the line equals the radius: $\\frac{|3(0)-4(0)+4b|}{\\sqrt{3^2+(-4)^2}}=\\frac{4b}{5}=6$.\n\nStep 3 — Solve: $4b=30$, so $b=7.5$ meters since $b>0$. Check: substituting $y=\\frac{3}{4}x+7.5$ into $x^2+y^2=36$ gives $\\frac{25}{16}x^2+\\frac{45}{4}x+20.25=0$, whose discriminant is $\\left(\\frac{45}{4}\\right)^2-4\\left(\\frac{25}{16}\\right)(20.25)=0$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($3.6$): this scales the radius by $\\frac{3}{5}$, reading the slope's numerator against the hypotenuse.\n* Choice B ($4.8$): this scales by $\\frac{4}{5}$, the reciprocal of the factor $\\frac{5}{4}$ the algebra produces.\n* Choice C ($6$): this reports the radius itself as the intercept.\n\n**Test Day Takeaway:** Clear the fraction from the slope first; the $3$-$4$-$5$ pattern in $\\sqrt{3^2+4^2}$ then makes the distance formula arithmetic trivial.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-12"
  },

  // ─── SYMBOLIC AREA OR VOLUME (bank-geo-187..194) ──────────────────────────
  // Area/volume/surface area expressed in terms of a variable (in terms of t,
  // x, etc.) — mixes Equivalent-Expressions skill into Geometry stems. CB
  // precedent: PT11-M1-Q26. See audit §B6.
  {
    id: "bank-geo-187",
    domain: "geometry",
    skills: ["volume-prism", "algebraic-expressions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A sterilizer basket has a square bottom measuring $x$ centimeters on a side and walls $x-3$ centimeters high. How many cubic centimeters does the basket hold?",
    choices: [
      // distractor: multiplies one side by the height and forgets the second base dimension
      { id: "A", text: "$x^2-3x$" },
      // distractor: fails to distribute x^2 across the -3, leaving a bare constant
      { id: "B", text: "$x^3-3$" },
      { id: "C", text: "$x^3-3x^2$" },
      // distractor: slips the sign, adding 3 to the height instead of subtracting
      { id: "D", text: "$x^3+3x^2$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The capacity is (base area)(height) $=x^2(x-3)=x^3-3x^2$ cubic centimeters.\n\n**The Full Solution:**\n\nStep 1 — The bottom is a square of side $x$, so the base area is $x\\cdot x=x^2$ square centimeters.\n\nStep 2 — The height is $x-3$ centimeters, so the volume is $x^2(x-3)$.\n\nStep 3 — Distribute: $x^2(x)-x^2(3)=x^3-3x^2$ cubic centimeters. Check with $x=5$: the basket is $5$ by $5$ by $2$, holding $50$, and $5^3-3(5)^2=125-75=50$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($x^2-3x$): this multiplies only one side by the height, dropping a dimension.\n* Choice B ($x^3-3$): this multiplies $x^2$ by $x$ but not by $3$.\n* Choice D ($x^3+3x^2$): this adds $3$ to the height instead of subtracting it.\n\n**Test Day Takeaway:** Substituting a friendly number such as $x=5$ into the setup and into each choice settles symbolic volume questions fast.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-188",
    domain: "geometry",
    skills: ["triangle-area", "algebraic-expressions"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A rectangular plot of land is $(x + 7)$ meters long and $(x + 2)$ meters wide. Which expression gives the area, in square meters, of the plot?",
    choices: [
      // distractor: multiplies first and last terms only
      { id: "A", text: "$x^2 + 14$" },
      // distractor: adds 7 and 2 for the constant term
      { id: "B", text: "$x^2 + 9x + 9$" },
      { id: "C", text: "$x^2 + 9x + 14$" },
      // distractor: multiplies 7 and 2 for the middle coefficient
      { id: "D", text: "$x^2 + 14x + 14$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Area $= (x + 7)(x + 2) = x^2 + (7 + 2)x + (7)(2) = x^2 + 9x + 14$.\n\n**The Full Solution:**\nStep 1: The area of a rectangle is length times width, so the area is $(x + 7)(x + 2)$.\nStep 2: Expand: $x \\cdot x + x \\cdot 2 + 7 \\cdot x + 7 \\cdot 2 = x^2 + 2x + 7x + 14$.\nStep 3: Combine like terms: $x^2 + 9x + 14$.\n\nVerification: at $x = 3$ the plot is $10$ by $5$, area $50$, and $3^2 + 9(3) + 14 = 9 + 27 + 14 = 50$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($x^2 + 14$): multiplies only the first terms and only the last terms, skipping the two cross products.\n* Choice B ($x^2 + 9x + 9$): adds $7 + 2$ for the constant term instead of multiplying them.\n* Choice D ($x^2 + 14x + 14$): multiplies $7 \\cdot 2$ for the coefficient of $x$ instead of adding them.\n\n**Test Day Takeaway:** In $(x + a)(x + b)$ the middle coefficient is $a + b$ and the constant is $ab$. Testing one convenient value of $x$ eliminates the swapped versions in seconds.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-189",
    domain: "geometry",
    skills: ["volume-prism", "algebraic-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cutting mat is a rectangle $6m$ centimeters long and $4m$ centimeters wide, and a square opening of side $m$ centimeters is cut from its center. Which expression gives the area, in square centimeters, of the mat that remains?",
    choices: [
      // distractor: uses 2m for the opening's side, removing 4m^2 instead of m^2
      { id: "A", text: "$20m^2$" },
      { id: "B", text: "$23m^2$" },
      // distractor: forgets to remove the opening at all
      { id: "C", text: "$24m^2$" },
      // distractor: doubles the rectangle's area, as though length times width were counted twice
      { id: "D", text: "$48m^2$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The rectangle covers $6m(4m)=24m^2$ and the opening removes $m^2$, leaving $23m^2$ square centimeters.\n\n**The Full Solution:**\n\nStep 1 — Find the full rectangle's area: $(6m)(4m)=24m^2$ square centimeters.\n\nStep 2 — Find the opening's area: a square of side $m$ covers $m^2$ square centimeters.\n\nStep 3 — Subtract: $24m^2-m^2=23m^2$ square centimeters. Check with $m=2$: the mat is $12$ by $8$, or $96$, minus a $2$-by-$2$ hole of $4$, leaving $92$, and $23(2)^2=92$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($20m^2$): this removes $4m^2$, the area of a square with side $2m$ rather than $m$.\n* Choice C ($24m^2$): this is the mat before the opening is cut.\n* Choice D ($48m^2$): this doubles the rectangle's area.\n\n**Test Day Takeaway:** For a shape with a piece removed, compute the whole and the hole separately, then subtract once.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-190",
    domain: "geometry",
    skills: ["triangle-area", "algebraic-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A banner shop cuts a triangular bunting flag whose area, in square centimeters, is $6x^2+15x$ and whose hanging edge measures $3x$ centimeters. Which expression gives the flag's height, in centimeters, measured perpendicular to that edge?",
    choices: [
      // distractor: divides the area by the base but never doubles, giving A/b instead of 2A/b
      { id: "A", text: "$2x+5$" },
      { id: "B", text: "$4x+10$" },
      // distractor: doubles the correct height a second time
      { id: "C", text: "$8x+20$" },
      // distractor: doubles the area and divides by x alone, dropping the factor of 3 in the base
      { id: "D", text: "$12x+30$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** From $A=\\frac{1}{2}bh$, $h=\\frac{2A}{b}=\\frac{2(6x^2+15x)}{3x}=\\frac{12x^2+30x}{3x}=4x+10$.\n\n**The Full Solution:**\n\nStep 1 — Start from the triangle area formula $A=\\frac{1}{2}bh$ and solve for the height: $h=\\frac{2A}{b}$.\n\nStep 2 — Substitute: $h=\\frac{2(6x^2+15x)}{3x}=\\frac{12x^2+30x}{3x}$.\n\nStep 3 — Divide term by term: $\\frac{12x^2}{3x}+\\frac{30x}{3x}=4x+10$ centimeters. Check with $x=1$: the area is $21$, the base is $3$, and $\\frac{1}{2}(3)(14)=21$ with $h=4(1)+10=14$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($2x+5$): this computes $\\frac{A}{b}$ and never doubles, so it is exactly half the height.\n* Choice C ($8x+20$): this doubles the height a second time.\n* Choice D ($12x+30$): this divides $2A$ by $x$ instead of by $3x$.\n\n**Test Day Takeaway:** Solving $A=\\frac{1}{2}bh$ for a side always brings a factor of $2$ upstairs — write $h=\\frac{2A}{b}$ before substituting.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-191",
    domain: "geometry",
    skills: ["volume-prism", "algebraic-expressions"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A finishing rinse basin is a rectangular tank $8p$ centimeters long, $5p$ centimeters wide, and $q$ centimeters deep, and it is filled to within $2$ centimeters of its rim. Which expression represents the number of cubic centimeters of rinse water in the basin?",
    choices: [
      { id: "A", text: "$40p^2q-80p^2$" },
      // distractor: subtracts 2 from the finished volume instead of 2 centimeters from the depth
      { id: "B", text: "$40p^2q-2$" },
      // distractor: fills the basin to the rim, ignoring the 2-centimeter gap
      { id: "C", text: "$40p^2q$" },
      // distractor: adds the length and width, 8p + 5p, instead of multiplying them
      { id: "D", text: "$13pq-26p$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The water is $q-2$ centimeters deep over a base of $8p(5p)=40p^2$, so the volume is $40p^2(q-2)=40p^2q-80p^2$.\n\n**The Full Solution:**\n\nStep 1 — Find the base area: $(8p)(5p)=40p^2$ square centimeters.\n\nStep 2 — Find the depth of the water. The basin is $q$ centimeters deep and the water stops $2$ centimeters short, so the water is $q-2$ centimeters deep.\n\nStep 3 — Multiply and distribute: $40p^2(q-2)=40p^2q-80p^2$ cubic centimeters. Check with $p=1$ and $q=5$: the base is $40$, the water is $3$ deep, giving $120$, and $40(5)-80=120$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($40p^2q-2$): this subtracts $2$ cubic centimeters rather than shortening the depth by $2$ centimeters.\n* Choice C ($40p^2q$): this fills the basin to the rim and ignores the gap.\n* Choice D ($13pq-26p$): this adds $8p$ and $5p$ instead of multiplying them.\n\n**Test Day Takeaway:** Adjust the dimension the sentence adjusts — a shorter depth changes a length before any multiplication happens.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-192",
    domain: "geometry",
    skills: ["volume-prism", "algebraic-expressions"],
    difficulty: "medium",
    type: "fill-in",
    question: "The luggage bay of a tour bus is a rectangular prism of volume $6w^3+30w^2$ cubic feet, with a width of $3w$ feet and a height of $w$ feet. Its length is $2w+n$ feet. What is the value of $n$?",
    correctAnswer: "10",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**The correct answer is $10$.**\n\n**The Fast Way (~35s):** Dividing the volume by $w(3w)=3w^2$ gives $\\frac{6w^3+30w^2}{3w^2}=2w+10$, so $n=10$.\n\n**The Full Solution:**\n\nStep 1 — Volume equals length times width times height, so length $=\\frac{6w^3+30w^2}{w(3w)}$.\n\nStep 2 — Simplify the denominator to $3w^2$ and divide term by term: $\\frac{6w^3}{3w^2}=2w$ and $\\frac{30w^2}{3w^2}=10$, so the length is $2w+10$ feet.\n\nStep 3 — Match to $2w+n$: the constants must agree, so $n=10$. Check with $w=2$: the volume is $6(8)+30(4)=168$, and $2(6)(14)=168$.\n\n**Common Mistakes:** Dividing by $w$ alone gives $6w^2+30w$ and no match. Dividing by $3w$ gives $2w^2+10w$, whose constant is $0$. Reading the coefficient of $w$ instead of the constant reports $2$.\n\n**Test Day Takeaway:** When a dimension is given in the form $2w+n$, divide the volume by the other two dimensions and read the constant term.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-193",
    domain: "geometry",
    skills: ["volume-prism", "algebraic-expressions"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A square-based tin for bandage rolls stands $x$ centimeters tall on a base edge of $x+4$ centimeters, and its four side panels together cover $4x^2+kx$ square centimeters. What is the value of $k$?",
    choices: [
      // distractor: copies the constant 4 from the base edge without multiplying by the four panels
      { id: "A", text: "$4$" },
      // distractor: counts only two panels: 2(x+4)x = 2x^2 + 8x
      { id: "B", text: "$8$" },
      { id: "C", text: "$16$" },
      // distractor: counts eight panels, doubling the correct 16
      { id: "D", text: "$32$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** Each side panel is $(x+4)$ by $x$, so four of them cover $4x(x+4)=4x^2+16x$, giving $k=16$.\n\n**The Full Solution:**\n\nStep 1 — The base is a square of edge $x+4$, so every side panel is a rectangle $x+4$ centimeters wide and $x$ centimeters tall.\n\nStep 2 — One panel covers $x(x+4)=x^2+4x$ square centimeters, and there are four panels: $4(x^2+4x)=4x^2+16x$.\n\nStep 3 — Match coefficients with $4x^2+kx$: the $x^2$ terms already agree, so $k=16$. Check with $x=2$: each panel is $6$ by $2$, or $12$, and four panels give $48$, while $4(4)+16(2)=48$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4$): this reports the constant from the base edge without multiplying by the four panels.\n* Choice B ($8$): this counts only two panels, giving $2x^2+8x$.\n* Choice D ($32$): this counts eight panels, doubling the correct coefficient.\n\n**Test Day Takeaway:** Expand fully, then match coefficients term by term — the $x^2$ terms agreeing is your signal that the setup is right.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-194",
    domain: "geometry",
    skills: ["volume-prism", "algebraic-expressions"],
    difficulty: "hard",
    type: "fill-in",
    question: "Two right rectangular prisms are similar. Each edge of the second prism is $\\frac{3}{2}$ times the length of the corresponding edge of the first prism. The volume of the second prism is $540$ cubic centimeters. What is the volume, in cubic centimeters, of the first prism?",
    correctAnswer: "160",
    explanation: "**SAT Pattern: Symbolic Area or Volume**\n\n**The correct answer is $160$.**\n\n**The Fast Way (~30s):** Volumes scale by the cube of the linear factor: $\\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$. So the first volume is $540 \\div \\frac{27}{8} = 540 \\cdot \\frac{8}{27} = 160$.\n\n**The Full Solution:**\nStep 1: If every edge is multiplied by $k$, each of the three dimensions in the volume product is multiplied by $k$, so the volume is multiplied by $k^3$.\nStep 2: Here $k = \\frac{3}{2}$, so $k^3 = \\frac{27}{8}$ and $V_2 = \\frac{27}{8}V_1$.\nStep 3: Solve for $V_1$: $540 = \\frac{27}{8}V_1$, so $V_1 = 540 \\cdot \\frac{8}{27} = 20 \\cdot 8 = 160$.\n\nVerification: $160 \\cdot \\frac{27}{8} = 20 \\cdot 27 = 540$. $\\checkmark$\n\n**Common Mistakes:** Dividing by the linear factor only, $540 \\div \\frac{3}{2} = 360$. Using the area factor $\\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4}$ and getting $540 \\div \\frac{9}{4} = 240$. Multiplying instead of dividing, $540 \\cdot \\frac{27}{8} = 1822.5$, which makes the smaller prism larger than the bigger one.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^2$, volumes by $k^3$. When the known quantity belongs to the larger figure, divide by the factor rather than multiplying.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "symbolic-area-or-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── SIMILAR FIGURES AREA RATIO (bank-geo-195..202) ──────────────────────
  // When linear dimensions scale by factor k, area scales by k^2, volume by k^3.
  // Distinct from generic Pythagorean / area formulas — focuses on the scaling rule.
  {
    id: "bank-geo-195",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Two regular hexagons are similar. The ratio of the side length of the smaller hexagon to the side length of the larger hexagon is $3:4$. What is the ratio of the area of the smaller hexagon to the area of the larger hexagon?",
    choices: [
      // distractor: reports the linear ratio unsquared
      { id: "A", text: "$3:4$" },
      { id: "B", text: "$9:16$" },
      // distractor: squares but reverses the order
      { id: "C", text: "$16:9$" },
      // distractor: cubes the ratio, which is the volume ratio
      { id: "D", text: "$27:64$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** Areas of similar figures scale by the square of the linear ratio: $\\left(\\frac{3}{4}\\right)^2 = \\frac{9}{16}$.\n\n**The Full Solution:**\nStep 1: A regular hexagon of side $s$ has area $\\frac{3\\sqrt{3}}{2}s^2$, so area is proportional to $s^2$.\nStep 2: If the sides are in the ratio $3:4$, write them as $3t$ and $4t$. The areas are proportional to $(3t)^2 = 9t^2$ and $(4t)^2 = 16t^2$.\nStep 3: The area ratio is $9t^2 : 16t^2 = 9:16$.\n\nVerification: sides $3$ and $4$ give areas $\\frac{3\\sqrt{3}}{2}(9)$ and $\\frac{3\\sqrt{3}}{2}(16)$, a ratio of $9:16$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3:4$): reports the side ratio itself; that is the ratio of lengths, not of areas.\n* Choice C ($16:9$): squares correctly but reverses the order, giving larger to smaller.\n* Choice D ($27:64$): cubes the ratio; $k^3$ is the volume ratio for similar solids, not the area ratio for plane figures.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^2$, volumes by $k^3$. Read which quantity the question asks for before choosing the power.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-196",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Two circles are similar. The ratio of the circumference of the first circle to the circumference of the second circle is $5:2$. What is the ratio of the area of the first circle to the area of the second circle?",
    choices: [
      // distractor: squares but inverts the order
      { id: "A", text: "$4:25$" },
      // distractor: reports the linear ratio unsquared
      { id: "B", text: "$5:2$" },
      { id: "C", text: "$25:4$" },
      // distractor: cubes the ratio
      { id: "D", text: "$125:8$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Circumference is proportional to radius, so the radii are also in the ratio $5:2$, and the areas are in the ratio $5^2 : 2^2 = 25:4$.\n\n**The Full Solution:**\nStep 1: $C = 2\\pi r$ is linear in $r$, so a circumference ratio of $5:2$ is also a radius ratio of $5:2$.\nStep 2: Write the radii as $5t$ and $2t$. Then the areas are $\\pi(5t)^2 = 25\\pi t^2$ and $\\pi(2t)^2 = 4\\pi t^2$.\nStep 3: The ratio of the areas is $25\\pi t^2 : 4\\pi t^2 = 25:4$.\n\nVerification: radii $5$ and $2$ give circumferences $10\\pi$ and $4\\pi$ (ratio $5:2$) and areas $25\\pi$ and $4\\pi$ (ratio $25:4$). $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4:25$): squares correctly but reports second circle to first, reversing the order the question asks for.\n* Choice B ($5:2$): reuses the circumference ratio; circumference is a length, area is not.\n* Choice D ($125:8$): cubes the ratio, which would apply to the volumes of similar solids.\n\n**Test Day Takeaway:** Circumference, diameter, and radius all scale together at $k$; area scales at $k^2$. Any linear measurement can serve as the starting ratio.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-197",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Two similar pentagons have perimeters of $30$ centimeters and $42$ centimeters. What is the ratio of the area of the smaller pentagon to the area of the larger pentagon?",
    choices: [
      // distractor: reports the perimeter ratio unsquared
      { id: "A", text: "$5:7$" },
      { id: "B", text: "$25:49$" },
      // distractor: squares but reverses the order
      { id: "C", text: "$49:25$" },
      // distractor: cubes the linear ratio
      { id: "D", text: "$125:343$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Perimeter is a length, so the linear ratio is $\\frac{30}{42} = \\frac{5}{7}$. Areas scale by the square: $\\frac{25}{49}$.\n\n**The Full Solution:**\nStep 1: For similar figures, corresponding sides and perimeters share the same ratio, so $k = \\frac{30}{42}$.\nStep 2: Reduce: $\\frac{30}{42} = \\frac{5}{7}$.\nStep 3: Square it for the area ratio: $\\left(\\frac{5}{7}\\right)^2 = \\frac{25}{49}$, or $25:49$.\n\nVerification: if a side of the smaller pentagon is $5u$, the corresponding side of the larger is $7u$, and the areas are proportional to $25u^2$ and $49u^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5:7$): stops at the reduced perimeter ratio instead of squaring it.\n* Choice C ($49:25$): squares correctly but reports larger to smaller.\n* Choice D ($125:343$): cubes the ratio, the scaling law for volume rather than area.\n\n**Test Day Takeaway:** Reduce the linear ratio before squaring — $\\frac{30}{42}$ squared is awkward, but $\\frac{5}{7}$ squared is immediate.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-198",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "fill-in",
    question: "A pharmacy prints its dosing warnings on two similar hexagonal labels cut from the same sheet stock, and the larger label covers $6.25$ times the area of the smaller one. The perimeter of the larger label is $k$ times the perimeter of the smaller label. What is the value of $k$?",
    correctAnswer: "2.5",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**The correct answer is $2.5$.**\n\n**The Fast Way (~20s):** Areas of similar figures scale by the square of the length ratio, so $k^2=6.25$ and $k=\\sqrt{6.25}=2.5$.\n\n**The Full Solution:**\n\nStep 1 — Name the ratio. Let $k$ be the factor relating every length of the larger label to the matching length of the smaller one; perimeter is a sum of lengths, so it scales by $k$.\n\nStep 2 — Relate lengths to area. For similar figures the area ratio is the square of the length ratio, so $k^2=6.25$.\n\nStep 3 — Solve: $k=\\sqrt{6.25}=2.5$, taking the positive root because $k$ is a ratio of lengths. Check: a label with $2.5$ times each length covers $2.5^2=6.25$ times the area, matching the stated coverage.\n\n**Common Mistakes:** Answering $6.25$ reports the area ratio itself as the length ratio. Squaring instead of taking the square root gives $6.25^2=39.0625$. Halving the area ratio gives $3.125$, which would make the area ratio $9.765625$, not $6.25$.\n\n**Test Day Takeaway:** Lengths scale by $k$, areas by $k^2$, volumes by $k^3$ — decide which one the question hands you before doing any arithmetic.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-199",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A blueprint of a rectangular courtyard is redrawn so that every length in the drawing is multiplied by $1.5$. The area of the redrawn courtyard is how many times the area of the original drawing?",
    choices: [
      // distractor: reports the linear factor
      { id: "A", text: "$1.5$" },
      { id: "B", text: "$2.25$" },
      // distractor: doubles the linear factor instead of squaring it
      { id: "C", text: "$3$" },
      // distractor: cubes the linear factor
      { id: "D", text: "$3.375$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** Area scales by the square of the linear factor: $1.5^2 = 2.25$.\n\n**The Full Solution:**\nStep 1: Let the original rectangle have length $L$ and width $W$, so its area is $LW$.\nStep 2: The redrawn rectangle has length $1.5L$ and width $1.5W$, so its area is $(1.5L)(1.5W) = 2.25LW$.\nStep 3: The area is therefore $2.25$ times the original.\n\nVerification: a $4$ by $6$ rectangle has area $24$; scaled to $6$ by $9$ it has area $54$, and $\\frac{54}{24} = 2.25$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.5$): reports the scale factor itself, which applies to lengths, not areas.\n* Choice C ($3$): doubles $1.5$ instead of squaring it, confusing \"two dimensions\" with \"times two.\"\n* Choice D ($3.375$): cubes the factor; that is how volume would scale, not area.\n\n**Test Day Takeaway:** Both dimensions grow, so the factor appears twice: $k \\cdot k = k^2$. That is why $1.5$ becomes $2.25$, not $3$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-200",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A tour operator enlarges a triangular pennant so that the new pennant is similar to the original and uses $2.25$ times as much cloth. The original pennant's longest edge measures $24$ centimeters. What is the length, in centimeters, of the longest edge of the new pennant?",
    choices: [
      // distractor: divides by the scale factor 1.5 instead of multiplying: 24 / 1.5 = 16
      { id: "A", text: "$16$" },
      // distractor: halves the area ratio to get 1.125 rather than taking its square root: 24 x 1.125 = 27
      { id: "B", text: "$27$" },
      { id: "C", text: "$36$" },
      // distractor: applies the area ratio 2.25 directly to the edge: 24 x 2.25 = 54
      { id: "D", text: "$54$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** Cloth is area, so the length ratio is $\\sqrt{2.25}=1.5$, and $24(1.5)=36$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — Identify what $2.25$ measures. Cloth used is an area, so $2.25$ is the ratio of areas, not of lengths.\n\nStep 2 — Convert to a length ratio. For similar figures, area ratio $=$ (length ratio)$^2$, so the length ratio is $\\sqrt{2.25}=1.5$.\n\nStep 3 — Scale the edge: $24(1.5)=36$ centimeters. Check: an edge $1.5$ times as long comes with $1.5^2=2.25$ times the area, exactly the cloth stated.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($16$): this divides by $1.5$ instead of multiplying, shrinking the pennant the question enlarged.\n* Choice B ($27$): halving $2.25$ gives $1.125$, but the length ratio comes from a square root, not from halving.\n* Choice D ($54$): this uses the area ratio $2.25$ as though it scaled lengths, giving $24(2.25)=54$.\n\n**Test Day Takeaway:** Going from an area comparison back to a length takes a square root — the same relationship run in reverse.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-201",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Triangle $R$ and triangle $S$ are similar. The perimeter of triangle $R$ is $30$ centimeters and the perimeter of triangle $S$ is $75$ centimeters. If the area of triangle $R$ is $36$ square centimeters, what is the area, in square centimeters, of triangle $S$?",
    choices: [
      // distractor: scales by the linear ratio instead of its square
      { id: "A", text: "$90$" },
      // distractor: multiplies by 4 instead of by 25/4
      { id: "B", text: "$144$" },
      { id: "C", text: "$225$" },
      // distractor: cubes the linear ratio
      { id: "D", text: "$562.5$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The linear ratio is $\\frac{75}{30} = \\frac{5}{2}$, so the area ratio is $\\frac{25}{4}$ and the area of triangle $S$ is $36 \\cdot \\frac{25}{4} = 225$.\n\n**The Full Solution:**\nStep 1: Perimeters of similar triangles are in the same ratio as corresponding sides, so $k = \\frac{75}{30} = \\frac{5}{2}$.\nStep 2: Areas scale by $k^2 = \\left(\\frac{5}{2}\\right)^2 = \\frac{25}{4}$.\nStep 3: Area of $S$ $= 36 \\cdot \\frac{25}{4} = 9 \\cdot 25 = 225$ square centimeters.\n\nVerification: $\\frac{225}{36} = 6.25 = \\left(\\frac{5}{2}\\right)^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($90$): multiplies the area by the linear ratio $\\frac{5}{2}$, skipping the square.\n* Choice B ($144$): multiplies by $4$, the square of the smaller term of the ratio, instead of by $\\frac{25}{4}$.\n* Choice D ($562.5$): cubes the ratio, $36 \\cdot \\frac{125}{8}$, applying a volume rule to a plane figure.\n\n**Test Day Takeaway:** Convert any given linear ratio — sides, perimeters, heights — into $k$, then square it once for area. Ratios greater than $1$ must make the area grow.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-202",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "hard",
    type: "fill-in",
    question: "Two similar triangles have areas of $28$ square centimeters and $175$ square centimeters. The longest side of the smaller triangle is $12$ centimeters. What is the length, in centimeters, of the longest side of the larger triangle?",
    correctAnswer: "30",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~30s):** $\\frac{28}{175} = \\frac{4}{25}$, so the linear ratio is $\\frac{2}{5}$ and the longest side of the larger triangle is $12 \\cdot \\frac{5}{2} = 30$.\n\n**The Full Solution:**\nStep 1: For similar figures, the ratio of areas is the square of the ratio of corresponding lengths.\nStep 2: Reduce the area ratio by $7$: $\\frac{28}{175} = \\frac{4}{25}$. Taking the square root gives a linear ratio of $\\frac{2}{5}$.\nStep 3: The longest sides correspond, so $\\frac{12}{L} = \\frac{2}{5}$ and $L = \\frac{12 \\cdot 5}{2} = 30$ centimeters.\n\nVerification: $\\left(\\frac{12}{30}\\right)^2 = \\left(\\frac{2}{5}\\right)^2 = \\frac{4}{25} = \\frac{28}{175}$. $\\checkmark$\n\n**Common Mistakes:** Scaling the side by the area ratio, $12 \\cdot \\frac{175}{28} = 75$. Applying the ratio the wrong way, $12 \\cdot \\frac{2}{5} = 4.8$, which shrinks the side of the larger triangle. Failing to reduce $\\frac{28}{175}$ first and abandoning the square root because $28$ and $175$ are not perfect squares.\n\n**Test Day Takeaway:** When an area ratio does not look like a perfect-square fraction, reduce it. Dividing by the common factor $7$ turns $\\frac{28}{175}$ into $\\frac{4}{25}$, whose square root is immediate.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── AREA OF TRIANGLE FROM COORDINATES (bank-geo-203..210) ────────────────
  // Two methods: (1) base-height when sides align with axes; (2) shoelace
  // formula for arbitrary triangles. SAT staple.
  {
    id: "bank-geo-203",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "On a school playground plan, a triangular sandbox has corners at $(0,0)$, $(b,0)$, and $(0,h)$, where $b>0$, $h>0$, and units are meters. Which expression gives the sandbox's area, in square meters?",
    choices: [
      { id: "A", text: "$\\dfrac{bh}{2}$" },
      // distractor: averages the two legs instead of halving their product
      { id: "B", text: "$\\dfrac{b+h}{2}$" },
      // distractor: adds the two legs, which is part of the perimeter, not the area
      { id: "C", text: "$b+h$" },
      // distractor: gives the area of the surrounding rectangle, omitting the factor one half
      { id: "D", text: "$bh$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The legs along the axes are $b$ and $h$, so the area is $\\frac{1}{2}bh$.\n\n**The Full Solution:**\n\nStep 1: Locate the legs. From $(0,0)$ to $(b,0)$ is a horizontal segment of length $b$; from $(0,0)$ to $(0,h)$ is a vertical segment of length $h$.\n\nStep 2: Note the right angle. Those two segments meet at the origin at a right angle, so they serve as base and height.\n\nStep 3: Apply the formula. Area $=\\frac{1}{2}(b)(h)=\\frac{bh}{2}$ square meters.\n\nCheck: with $b=6$ and $h=4$ the triangle is half of a $6$-by-$4$ rectangle, area $12$, and $\\frac{(6)(4)}{2}=12$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($\\frac{b+h}{2}$): averages the two legs instead of halving their product.\n* Choice C ($b+h$): adds the legs, which measures distance, not area.\n* Choice D ($bh$): gives the area of the surrounding rectangle, omitting the factor $\\frac{1}{2}$.\n\n**Test Day Takeaway:** When two vertices share an axis with the origin, the legs are the coordinates themselves — no distance formula needed.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-204",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Stall 14 of a farmers market holds a triangular sample table whose corners fall at $(0,0)$, $(10,0)$, and $(4,k)$ on the site grid, where $k>0$ and one unit is a foot. Which expression gives its area in square feet?",
    choices: [
      // distractor: uses 4, the third vertex's x-coordinate, as the base, giving 2k
      { id: "A", text: "$2k$" },
      { id: "B", text: "$5k$" },
      // distractor: omits the factor one half, giving the rectangle's area 10k
      { id: "C", text: "$10k$" },
      // distractor: doubles the base-height product instead of halving it
      { id: "D", text: "$20k$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The base on the $x$-axis is $10$ and the height is $k$, so the area is $\\frac{1}{2}(10)(k)=5k$.\n\n**The Full Solution:**\n\nStep 1: Choose the base. The points $(0,0)$ and $(10,0)$ both lie on the $x$-axis, so that side has length $10$ feet.\n\nStep 2: Read the height. The height is the perpendicular distance from $(4,k)$ to the $x$-axis, which is $k$ feet.\n\nStep 3: Apply the formula. Area $=\\frac{1}{2}(10)(k)=5k$ square feet.\n\nCheck: with $k=6$ the area is $30$, and the triangle is half of a $10$-by-$6$ rectangle.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($2k$): uses $4$, the third vertex's $x$-coordinate, as the base.\n* Choice C ($10k$): omits the factor $\\frac{1}{2}$ and reports the rectangle's area.\n* Choice D ($20k$): doubles the base-height product instead of halving it.\n\n**Test Day Takeaway:** The apex's $x$-coordinate never affects the area — only its distance from the line containing the base does.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-205",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In a solar field survey, corner stakes for a triangular plot sit at $(-3,2)$, $(5,2)$, and $(1,y)$, with $y>2$ and every unit equal to one meter. Which expression represents how many square meters the plot covers?",
    choices: [
      { id: "A", text: "$4y-8$" },
      // distractor: uses y itself as the height instead of the distance y - 2
      { id: "B", text: "$4y$" },
      // distractor: omits the factor one half, giving the rectangle's area 8(y - 2)
      { id: "C", text: "$8y-16$" },
      // distractor: omits the one half and uses y as the height, making both errors
      { id: "D", text: "$8y$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The horizontal base runs from $-3$ to $5$, a length of $8$; the height is $y-2$, so the area is $\\frac{1}{2}(8)(y-2)=4y-8$.\n\n**The Full Solution:**\n\nStep 1: Find the base. $(-3,2)$ and $(5,2)$ share the height $y=2$, so the base has length $5-(-3)=8$ meters.\n\nStep 2: Find the height. The third corner sits at height $y$, and the base line is at height $2$, so the perpendicular height is $y-2$ meters.\n\nStep 3: Apply the formula. Area $=\\frac{1}{2}(8)(y-2)=4(y-2)=4y-8$ square meters.\n\nCheck: with $y=7$ the height is $5$ and the area is $\\frac{1}{2}(8)(5)=20$, and $4(7)-8=20$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($4y$): uses $y$ itself as the height instead of the distance $y-2$ above the base.\n* Choice C ($8y-16$): omits the factor $\\frac{1}{2}$ and reports the surrounding rectangle's area.\n* Choice D ($8y$): drops the $\\frac{1}{2}$ and uses $y$ as the height, combining both errors.\n\n**Test Day Takeaway:** A height is a distance between two $y$-values, not a single coordinate — subtract the base's height first.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-206",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "On a utility easement map, a triangular gravel pad has corners $(1,2)$, $(9,2)$, and $(4,11)$, with units in meters. How many square meters does the pad cover?",
    correctAnswer: "36",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $36$.**\n\n**The Fast Way (~30s):** The base runs from $1$ to $9$ at height $2$, so it is $8$; the apex is $9$ above it, giving $\\frac{1}{2}(8)(9)=36$.\n\n**The Full Solution:**\n\nStep 1: Find the base. $(1,2)$ and $(9,2)$ lie on the same horizontal line, so the base is $9-1=8$ meters.\n\nStep 2: Find the height. The apex $(4,11)$ sits $11-2=9$ meters above that line.\n\nStep 3: Apply the formula. Area $=\\frac{1}{2}(8)(9)=36$ square meters.\n\nCheck: the pad is half of an $8$-by-$9$ rectangle, whose area is $72$.\n\n**Common Mistakes:**\n\n* $72$: omits the factor $\\frac{1}{2}$ and reports the surrounding rectangle's area.\n* $44$: uses the apex's $y$-coordinate $11$ as the height instead of the difference $11-2$.\n* $18$: applies the factor $\\frac{1}{2}$ twice, halving the correct area.\n\n**Test Day Takeaway:** Two vertices sharing a $y$-value hand you the base immediately; the height is the third vertex's vertical distance from that line.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-207",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Surveyors for a school district staked a triangular athletic-field parcel at $(-4,-1)$, $(-4,8)$, and $(6,2)$, one unit per yard. How many square yards lie inside the stakes?",
    choices: [
      { id: "A", text: "$45$" },
      // distractor: uses 8 - (-4) = 12 as the base, mixing an x-coordinate into the vertical length
      { id: "B", text: "$60$" },
      // distractor: omits the factor one half, giving the rectangle area 9 times 10
      { id: "C", text: "$90$" },
      // distractor: omits the one half and uses the length 12, combining both errors
      { id: "D", text: "$120$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The vertical base runs from $-1$ to $8$, a length of $9$, and the apex sits $10$ yards from that line, so the area is $\\frac{1}{2}(9)(10)=45$.\n\n**The Full Solution:**\n\nStep 1: Identify the base. $(-4,-1)$ and $(-4,8)$ share the $x$-value $-4$, so they lie on the vertical line $x=-4$ and the base is $8-(-1)=9$ yards long.\n\nStep 2: Identify the height. The apex $(6,2)$ lies $6-(-4)=10$ yards from that line, measured perpendicular to it.\n\nStep 3: Compute. Area $=\\frac{1}{2}(9)(10)=45$ square yards.\n\nCheck: a $9$-by-$10$ rectangle covers $90$ square yards, and the triangle is exactly half of it.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($60$): uses $8-(-4)=12$ as the base, subtracting an $x$-coordinate from a $y$-coordinate.\n* Choice C ($90$): omits the factor $\\frac{1}{2}$ and reports the surrounding rectangle's area.\n* Choice D ($120$): drops the $\\frac{1}{2}$ and uses the length $12$, combining both errors.\n\n**Test Day Takeaway:** A vertical base is a difference of $y$-values and its height a difference of $x$-values; a length that mixes the two is always a wrong turn.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-208",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A wind-farm site plan shows a triangular buffer zone with corners $(0,0)$, $(14,0)$, and $(0,k)$, where $k>0$ and units are hundreds of feet. That zone covers $63$ square units. What is the value of $k$?",
    choices: [
      // distractor: omits the factor one half, solving 14k = 63
      { id: "A", text: "$4.5$" },
      // distractor: reports half the base, 7, instead of k
      { id: "B", text: "$7$" },
      { id: "C", text: "$9$" },
      // distractor: divides the area by 2 rather than by half the base, giving 31.5
      { id: "D", text: "$31.5$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** $\\frac{1}{2}(14)(k)=63$ gives $7k=63$, so $k=9$.\n\n**The Full Solution:**\n\nStep 1: Identify the legs. The side from $(0,0)$ to $(14,0)$ lies on the $x$-axis with length $14$; the side from $(0,0)$ to $(0,k)$ lies on the $y$-axis with length $k$.\n\nStep 2: Write the area. These legs meet at a right angle, so the area is $\\frac{1}{2}(14)(k)=7k$ square units.\n\nStep 3: Solve. $7k=63$ gives $k=9$.\n\nCheck: $\\frac{1}{2}(14)(9)=63$ square units, as given.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4.5$): omits the factor $\\frac{1}{2}$ and solves $14k=63$.\n* Choice B ($7$): reports half the base rather than the unknown $k$.\n* Choice D ($31.5$): divides the area by $2$ instead of by half the base.\n\n**Test Day Takeaway:** When both legs sit on the axes, the area is half their product — solve for the missing leg, not for half the base.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-209",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A warehouse plan puts a triangular loading bay at $(1,3)$, $(9,3)$, and $(x,11)$, where $x$ is any real number and units are meters. Which statement about the bay's area must be true?",
    choices: [
      { id: "A", text: "The area is $32$ square meters for every value of $x$." },
      // distractor: assumes only the apex directly above the midpoint gives that area
      { id: "B", text: "The area is $32$ square meters only when $x=5$." },
      // distractor: treats a horizontal shift of the apex as if it changed the height
      { id: "C", text: "The area increases as $x$ increases." },
      // distractor: assumes the area is minimized when the triangle is isosceles
      { id: "D", text: "The area is least when $x=5$." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** The base is fixed at $8$ and the apex always sits $8$ above it, so the area is $\\frac{1}{2}(8)(8)=32$ no matter what $x$ is.\n\n**The Full Solution:**\n\nStep 1: Fix the base. $(1,3)$ and $(9,3)$ lie on the horizontal line $y=3$, so the base is $9-1=8$ meters and does not depend on $x$.\n\nStep 2: Fix the height. The apex has $y$-coordinate $11$, so its perpendicular distance to $y=3$ is $11-3=8$ meters, again independent of $x$.\n\nStep 3: Compute once. Area $=\\frac{1}{2}(8)(8)=32$ square meters for every real $x$.\n\nCheck: at $x=0$ the apex is $(0,11)$ and at $x=20$ it is $(20,11)$; both triangles share the same base and height, so both cover $32$ square meters.\n\n**Why the wrong answers are tempting:**\n\n* Choice B: assumes the area is special only when the apex sits above the base's midpoint at $x=5$.\n* Choice C: treats sliding the apex sideways as if it lengthened the height.\n* Choice D: assumes the isosceles case at $x=5$ minimizes area, confusing area with perimeter, which does depend on $x$.\n\n**Test Day Takeaway:** Sliding a vertex parallel to the base changes the shape but never the area — base and height are both unchanged.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-210",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "fill-in",
    question: "Roof drawings place a triangular photovoltaic panel with corners $(0,0)$, $(a,0)$, and $(a,3a)$, where $a>0$ and each unit stands for one foot. If that panel covers $96$ square feet, find $a$.",
    correctAnswer: "8",
    explanation: "**SAT Pattern: Area of Triangle from Coordinates**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~50s):** The legs are $a$ and $3a$, so $\\frac{1}{2}(a)(3a)=1.5a^{2}=96$, giving $a^{2}=64$ and $a=8$.\n\n**The Full Solution:**\n\nStep 1: Identify the legs. From $(0,0)$ to $(a,0)$ is a horizontal segment of length $a$; from $(a,0)$ to $(a,3a)$ is a vertical segment of length $3a$.\n\nStep 2: Write the area. Those legs meet at a right angle at $(a,0)$, so the area is $\\frac{1}{2}(a)(3a)=\\frac{3a^{2}}{2}$ square feet.\n\nStep 3: Solve. $\\frac{3a^{2}}{2}=96$ gives $3a^{2}=192$, $a^{2}=64$, and $a=8$ since $a>0$.\n\nCheck: with $a=8$ the legs are $8$ and $24$, and $\\frac{1}{2}(8)(24)=96$ square feet.\n\n**Common Mistakes:**\n\n* $64$: reports $a^{2}$ instead of $a$, stopping one step early.\n* $5.66$: drops the factor $\\frac{1}{2}$, solving $3a^{2}=96$ and getting $a=4\\sqrt{2}$.\n* $192$: doubles the area but never divides by $3$ or takes a square root.\n\n**Test Day Takeaway:** When both legs are multiples of the same parameter, the area is quadratic in it — expect one square root at the end.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-triangle-from-coordinates",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── S.B. EXTERIOR ANGLE THEOREM (bank-geo-211..218) ─────────────────────
  // Exterior angle of a triangle = sum of the two non-adjacent interior angles.
  {
    id: "bank-geo-211",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "On a triangular traffic island, the curb of one adjoining street runs straight past a corner of the island and forms an exterior angle at that corner. The island's other two corners have interior angles of $x^{\\circ}$ and $y^{\\circ}$, and that exterior angle measures $z^{\\circ}$. Which equation must be true?",
    choices: [
      { id: "A", text: "$z = x + y$" },
      // distractor: gives the interior angle at that corner rather than the exterior angle
      { id: "B", text: "$z = 180 - x - y$" },
      // distractor: subtracts 180 after adding the two remote interior angles
      { id: "C", text: "$z = x + y - 180$" },
      // distractor: subtracts one remote interior angle and adds the other
      { id: "D", text: "$z = 180 - x + y$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** An exterior angle of a triangle equals the sum of the two remote interior angles, so $z = x + y$.\n\n**The Full Solution:**\nStep 1: Let the interior angle at the corner in question be $w^{\\circ}$. The three interior angles satisfy $w + x + y = 180$.\nStep 2: The exterior angle is the supplement of that interior angle: $z = 180 - w$.\nStep 3: Substituting $w = 180 - x - y$ gives $z = 180 - (180 - x - y) = x + y$. Check: with $x = 50$ and $y = 60$ the interior angle is $70^{\\circ}$ and the exterior angle is $110^{\\circ} = 50 + 60$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: computes $180 - x - y$, which is the INTERIOR angle at that corner, not the exterior one.\n* Choice C: adds the two remote angles and then subtracts $180$, which would make $z$ negative for a valid triangle.\n* Choice D: mixes the supplement with only one remote interior angle.\n\n**Test Day Takeaway:** An exterior angle equals the two non-adjacent interior angles added together — no $180$ is left over once the substitution is done.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-212",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "At a triangular survey traverse, straight sight lines connect buoys $A$, $B$, and $C$, and the line from $B$ through $C$ continues past $C$ to form an exterior angle of $118^{\\circ}$ there. The interior angle at buoy $A$ measures $47^{\\circ}$. Which statement about the interior angle at buoy $B$ is true?",
    choices: [
      // distractor: computes the interior angle at buoy C, the supplement of the exterior angle
      { id: "A", text: "It measures $62^{\\circ}$, since $180 - 118 = 62$." },
      { id: "B", text: "It measures $71^{\\circ}$, since $118 - 47 = 71$." },
      // distractor: treats the angles at A and B as supplementary
      { id: "C", text: "It measures $133^{\\circ}$, since $180 - 47 = 133$." },
      // distractor: adds the exterior angle to the angle at A instead of subtracting
      { id: "D", text: "It measures $165^{\\circ}$, since $118 + 47 = 165$." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The exterior angle at $C$ equals the sum of the remote interior angles at $A$ and $B$, so the angle at $B$ is $118 - 47 = 71$ degrees.\n\n**The Full Solution:**\nStep 1: The exterior angle at buoy $C$ is remote from the interior angles at $A$ and $B$, so $118 = 47 + m\\angle B$.\nStep 2: Solve: $m\\angle B = 118 - 47 = 71$ degrees.\nStep 3: Confirm with the angle sum: the interior angle at $C$ is $180 - 118 = 62$ degrees, and $47 + 71 + 62 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($62^{\\circ}$): finds the interior angle at buoy $C$ rather than at buoy $B$.\n* Choice C ($133^{\\circ}$): treats the angles at $A$ and $B$ as supplementary, which holds only for angles on a straight line.\n* Choice D ($165^{\\circ}$): adds the exterior angle to the remote angle instead of subtracting, giving a value larger than the whole triangle allows.\n\n**Test Day Takeaway:** The exterior angle equals the SUM of the two remote interior angles — subtract the known one to find the other, then confirm with the $180$-degree total.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-213",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "On a roof truss, a gusset plate joins three members at joint $B$. The exterior angle formed where the bottom chord is extended past $B$ measures $133^\\circ$, and the two interior angles at the other joints measure $40^\\circ$ and $(4x + 9)^\\circ$. What is the value of $x$?",
    choices: [
      { id: "A", text: "$21$" },
      // distractor: sets 4x + 9 = 133, using the whole exterior angle for one remote angle and ignoring the 40 degree angle
      { id: "B", text: "$31$" },
      // distractor: adds the known remote angle instead of subtracting it: 4x + 9 = 173
      { id: "C", text: "$41$" },
      // distractor: stops at 4x = 84 and reports 4x instead of x
      { id: "D", text: "$84$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**Choice A is correct.** The exterior angle equals the sum of the two remote interior angles, so $4x + 9 = 133 - 40 = 93$ and $x = 21$.\n\n**The Fast Way (~25s):** Strip the known remote angle off the exterior angle: $133 - 40 = 93$. Then $4x + 9 = 93$, so $x = 21$.\n\n**The Full Solution:**\n\nStep 1: At joint $B$, the exterior angle equals the sum of the two nonadjacent interior angles: $40 + (4x + 9) = 133$.\n\nStep 2: Combine like terms and solve: $4x + 49 = 133$, so $4x = 84$ and $x = 21$.\n\nStep 3: Check. With $x = 21$ the second remote angle is $4(21) + 9 = 93$, and $40^\\circ + 93^\\circ = 133^\\circ$. The interior angle at $B$ is $180^\\circ - 133^\\circ = 47^\\circ$, and $40 + 93 + 47 = 180$, so the triangle closes.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($31$): sets $4x + 9 = 133$, handing the whole exterior angle to one remote angle and ignoring the $40^\\circ$ angle.\n* Choice C ($41$): adds instead of subtracting, solving $4x + 9 = 133 + 40 = 173$.\n* Choice D ($84$): stops at $4x = 84$ and reports $4x$ rather than $x$.\n\n**Test Day Takeaway:** An exterior angle equals the SUM of the two nonadjacent interior angles, so subtract the known remote angle from it, never the supplement.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-214",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "medium",
    type: "fill-in",
    question: "A glassware drying rack is supported by a triangular brace $ABC$. Extending side $\\overline{AC}$ beyond joint $C$ forms a $126^\\circ$ angle with side $\\overline{BC}$, and the brace's two remaining interior angles satisfy $m\\angle B = m\\angle A + 24^\\circ$. What is the measure, in degrees, of $\\angle A$?",
    correctAnswer: "51",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**The correct answer is $51$.**\n\n**The Fast Way (~30s):** The two remote angles add to $126$, and they differ by $24$, so the smaller is $\\frac{126 - 24}{2} = 51$.\n\n**The Full Solution:**\n\nStep 1: The exterior angle at $C$ equals the sum of the two remote interior angles: $m\\angle A + m\\angle B = 126^\\circ$.\n\nStep 2: Substitute $m\\angle B = m\\angle A + 24^\\circ$: $m\\angle A + (m\\angle A + 24) = 126$, so $2\\,m\\angle A = 102$ and $m\\angle A = 51^\\circ$.\n\nStep 3: Check. Then $m\\angle B = 75^\\circ$ and $51 + 75 = 126$, matching the exterior angle. The interior angle at $C$ is $180^\\circ - 126^\\circ = 54^\\circ$, and $51 + 75 + 54 = 180$.\n\n**Common Mistakes:**\n\n* $63$ — splitting $126$ evenly and ignoring the $24^\\circ$ gap between the two angles.\n* $75$ — solving correctly but reporting $\\angle B$, the larger remote angle.\n* $15$ — using the interior angle $54^\\circ$ at $C$ as the sum, giving $\\frac{54 - 24}{2}$.\n\n**Test Day Takeaway:** Translate a stated difference into one variable before using the exterior-angle sum; the exterior angle, not its supplement, is what the two remote angles add to.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-215",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A cable-tray hanger's triangular frame has interior angles of $(3n)^\\circ$ and $(7n)^\\circ$ at two of its corners. Extending one side past the third corner creates a $140^\\circ$ angle. How many degrees does the larger of the two labeled angles measure?",
    choices: [
      // distractor: stops at n = 14 instead of evaluating 7n
      { id: "A", text: "$14$" },
      // distractor: reports the interior angle at the third corner, 180 - 140 = 40
      { id: "B", text: "$40$" },
      // distractor: reports 3n = 42, the smaller of the two labeled angles
      { id: "C", text: "$42$" },
      { id: "D", text: "$98$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**Choice D is correct.** The $140^\\circ$ angle is exterior at the third corner, so $3n + 7n = 140$, giving $n = 14$ and $7n = 98$.\n\n**The Fast Way (~35s):** $10n = 140$, so $n = 14$; the larger labeled angle is $7(14) = 98$.\n\n**The Full Solution:**\n\nStep 1: Extending a side past a vertex produces the exterior angle there, which equals the sum of the two nonadjacent interior angles: $(3n) + (7n) = 140$.\n\nStep 2: Solve: $10n = 140$, so $n = 14$. The two labeled angles are $3(14) = 42^\\circ$ and $7(14) = 98^\\circ$.\n\nStep 3: Check. The interior angle at the third corner is $180^\\circ - 140^\\circ = 40^\\circ$, and $42 + 98 + 40 = 180$, so the frame closes. The larger labeled angle is $98^\\circ$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($14$): stops at the scale factor $n$ instead of evaluating $7n$.\n* Choice B ($40$): reports the interior angle at the third corner, $180 - 140$, rather than a labeled angle.\n* Choice C ($42$): evaluates $3n$, the smaller of the two labeled angles.\n\n**Test Day Takeaway:** Solve for the letter, then finish the job the question actually asked for — the value of the expression, not the letter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-216",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A stair-stringer bracket has the shape of a triangle. At vertex $R$ the angle between one side and the extension of the other measures $(4k)^\\circ$, while the bracket's interior angles at the remaining two vertices measure $(k + 22)^\\circ$ and $38^\\circ$. For what value of $k$ is this bracket possible?",
    choices: [
      // distractor: drops the k inside (k + 22), solving 4k = 22 + 38 = 60
      { id: "A", text: "$15$" },
      { id: "B", text: "$20$" },
      // distractor: treats (4k) degrees as the interior angle at R, solving 4k + (k + 22) + 38 = 180
      { id: "C", text: "$24$" },
      // distractor: reports the remote angle k + 22 = 42 instead of k
      { id: "D", text: "$42$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**Choice B is correct.** Setting the exterior angle equal to the sum of the two nonadjacent interior angles gives $4k = (k + 22) + 38$, so $3k = 60$ and $k = 20$.\n\n**The Fast Way (~30s):** $4k = k + 60$, so $3k = 60$ and $k = 20$.\n\n**The Full Solution:**\n\nStep 1: The exterior angle at $R$ equals the sum of the two interior angles at the other vertices: $4k = (k + 22) + 38$.\n\nStep 2: Simplify the right side to $k + 60$, subtract $k$ from both sides to get $3k = 60$, and divide: $k = 20$.\n\nStep 3: Check. The exterior angle is $4(20) = 80^\\circ$ and the remote angles are $42^\\circ$ and $38^\\circ$, which sum to $80^\\circ$. The interior angle at $R$ is $180^\\circ - 80^\\circ = 100^\\circ$, and $42 + 38 + 100 = 180$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($15$): drops the $k$ inside $(k + 22)$ and solves $4k = 22 + 38 = 60$.\n* Choice C ($24$): treats $(4k)^\\circ$ as the interior angle at $R$ and solves $4k + (k + 22) + 38 = 180$.\n* Choice D ($42$): solves correctly for $k$ but reports the remote angle $k + 22$ instead.\n\n**Test Day Takeaway:** When the exterior angle itself carries the variable, the same rule still applies — set it equal to the two remote angles, not to $180^\\circ$ minus them.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-217",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In triangle $ABC$, the exterior angle at vertex $C$ measures $(3y + 10)°$, and the two remote interior angles measure $(y + 25)°$ and $(y + 5)°$. What is the measure of the interior angle at vertex $C$?",
    diagram: { type: "triangleWithAngles", params: { vertexLabels: ["A", "B", "C"], angleLabels: ["(y + 25)°", "(y + 5)°", ""], figureNote: true } },
    choices: [
      // distractor: reports y instead of an angle measure
      { id: "A", text: "$20°$" },
      // distractor: reports the larger remote interior angle
      { id: "B", text: "$45°$" },
      // distractor: reports the exterior angle instead of the interior one
      { id: "C", text: "$70°$" },
      { id: "D", text: "$110°$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** $3y + 10 = (y + 25) + (y + 5)$ gives $y = 20$, so the exterior angle is $70°$ and the interior angle at $C$ is $180 - 70 = 110$ degrees.\n\n**The Full Solution:**\nStep 1: The exterior angle at $C$ equals the sum of the remote interior angles at $A$ and $B$: $3y + 10 = (y + 25) + (y + 5)$.\nStep 2: Simplify the right side to $2y + 30$ and solve: $3y + 10 = 2y + 30$, so $y = 20$.\nStep 3: The exterior angle is $3(20) + 10 = 70°$. The interior angle at $C$ is its supplement: $180 - 70 = 110$ degrees.\n\nVerification: the remote angles are $45°$ and $25°$, and $45 + 25 + 110 = 180$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20°$): reports $y$, the parameter, instead of an angle measure.\n* Choice B ($45°$): reports the larger remote interior angle, $(y + 25)°$.\n* Choice C ($70°$): reports the exterior angle; the question asks for the interior angle at the same vertex, which is its supplement.\n\n**Test Day Takeaway:** Solving for the parameter is the middle of the problem, not the end. Track whether the question wants $y$, the exterior angle, or its supplement.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-218",
    domain: "geometry",
    skills: ["triangles"],
    difficulty: "hard",
    type: "fill-in",
    question: "A fume-hood sash brace forms triangle $PQR$ in which the exterior angle at $P$ measures $(7t - 5)^\\circ$, the interior angle at $Q$ measures $(2t + 9)^\\circ$, and the interior angle at $R$ measures $(3t + 14)^\\circ$. What is the measure, in degrees, of the interior angle at $P$?",
    correctAnswer: "87",
    explanation: "**SAT Pattern: Exterior Angle Theorem**\n\n**The correct answer is $87$.**\n\n**The Fast Way (~45s):** $7t - 5 = (2t + 9) + (3t + 14)$ gives $t = 14$, so the exterior angle is $93^\\circ$ and the interior angle at $P$ is $180 - 93 = 87$.\n\n**The Full Solution:**\n\nStep 1: The exterior angle at $P$ equals the sum of the interior angles at $Q$ and $R$: $7t - 5 = (2t + 9) + (3t + 14)$.\n\nStep 2: The right side is $5t + 23$, so $7t - 5 = 5t + 23$, giving $2t = 28$ and $t = 14$.\n\nStep 3: The exterior angle at $P$ is $7(14) - 5 = 93^\\circ$, so the interior angle at $P$ is its supplement, $180^\\circ - 93^\\circ = 87^\\circ$. Check: $\\angle Q = 37^\\circ$, $\\angle R = 56^\\circ$, and $87 + 37 + 56 = 180$.\n\n**Common Mistakes:**\n\n* $93$ — stopping at the exterior angle, which the question does not ask for.\n* $14$ — reporting the value of $t$ rather than an angle measure.\n* $56$ — reporting $\\angle R$, the larger of the two given interior angles.\n\n**Test Day Takeaway:** An exterior angle and its interior angle are supplements; when a problem hands you one and asks for the other, the last step is always $180^\\circ$ minus what you found.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "exterior-angle-theorem",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── S.B. SIMILAR TRIANGLES PROPORTION (bank-geo-219..226) ───────────────
  // Corresponding sides of similar triangles are proportional. Set up a proportion.
  {
    id: "bank-geo-219",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An embroidery kit pairs a small applique with a larger one cut to the same shape. The figure gives the measurements of both pieces in centimeters, with vertex $J$ matching $M$, vertex $K$ matching $N$, and vertex $L$ matching $P$. How long, in centimeters, is $\\overline{NP}$?",
    diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[0.71, 4.95], [0, 0], [7, 0]], labels: ["J", "K", "L"], sideLabels: ["5", "7", "8"] }, triangle2: { vertices: [[1.43, 9.9], [0, 0], [14, 0]], labels: ["M", "N", "P"], sideLabels: ["10", "", ""] }, figureNote: true } },
    choices: [
      // distractor: divides by the scale factor instead of multiplying: 7 / 2 = 3.5
      { id: "A", text: "$3.5$" },
      // distractor: reports KL unchanged, treating the two pieces as congruent rather than similar
      { id: "B", text: "$7$" },
      // distractor: adds the difference 10 - 5 = 5 to 7 instead of scaling by 2
      { id: "C", text: "$12$" },
      { id: "D", text: "$14$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice D is correct.**\n\n**The Fast Way (~15s):** $\\overline{MN}$ matches $\\overline{JK}$, so the scale factor is $\\frac{10}{5}=2$, and $\\overline{NP}=2(7)=14$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — Match the sides. The order $JKL \\to MNP$ pairs $\\overline{JK}$ with $\\overline{MN}$ and $\\overline{KL}$ with $\\overline{NP}$.\n\nStep 2 — Find the scale factor: $\\frac{MN}{JK}=\\frac{10}{5}=2$.\n\nStep 3 — Apply it: $NP=2(KL)=2(7)=14$ centimeters. Check: $\\frac{14}{7}=2$, the same factor that took $5$ to $10$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($3.5$): this divides by $2$ instead of multiplying, shrinking the larger piece.\n* Choice B ($7$): this copies $\\overline{KL}$ unchanged, which would make the pieces congruent rather than similar.\n* Choice C ($12$): this adds $10-5=5$ to $7$; similar figures scale by a factor, not by a fixed increase.\n\n**Test Day Takeaway:** Find the scale factor from the one pair of sides you know, then multiply — every side of the larger figure uses that same factor.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-220",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A cable-car station displays a triangular safety placard similar to the smaller card handed to riders. The card has a base of $8$ centimeters and a height of $5$ centimeters, and the placard has a base of $40$ centimeters. What is the height, in centimeters, of the placard?",
    choices: [
      { id: "A", text: "$25$" },
      // distractor: adds the base difference 40 - 8 = 32 to the height instead of scaling: 5 + 32 = 37
      { id: "B", text: "$37$" },
      // distractor: builds the factor from a base over a height, 40/5 = 8, then multiplies: 5 x 8 = 40
      { id: "C", text: "$40$" },
      // distractor: multiplies the height by the placard's base: 5 x 40 = 200
      { id: "D", text: "$200$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The bases give a scale factor of $\\frac{40}{8}=5$, so the height is $5(5)=25$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — Pair the matching parts. Base pairs with base and height pairs with height, so $\\frac{40}{8}=\\frac{h}{5}$.\n\nStep 2 — Find the scale factor: $\\frac{40}{8}=5$.\n\nStep 3 — Solve for the height: $h=5(5)=25$ centimeters. Check: $\\frac{25}{5}=5$, the same factor the bases show.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($37$): this adds the base difference $40-8=32$ to the height; similar figures scale by multiplication.\n* Choice C ($40$): this builds the factor from a base and a height, $\\frac{40}{5}=8$, mixing parts that do not correspond.\n* Choice D ($200$): this multiplies the height by the placard's base rather than by the scale factor.\n\n**Test Day Takeaway:** A scale factor must come from two corresponding parts — base with base, height with height.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-221",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the figure, triangle $ABC$ is similar to triangle $DEF$, with $A$, $B$, and $C$ corresponding to $D$, $E$, and $F$, respectively. The ratio of the perimeter of triangle $ABC$ to the perimeter of triangle $DEF$ is $2:5$. If $BC = 6$, what is the length of $EF$?",
    diagram: { type: "similarTriangles", params: { triangle1: { labels: ["A", "B", "C"], sideLabels: ["", "BC = 6", ""] }, triangle2: { labels: ["D", "E", "F"], sideLabels: ["", "EF = ?", ""] }, figureNote: true } },
    choices: [
      // distractor: inverts the ratio
      { id: "A", text: "$2.4$" },
      // distractor: adds the difference of the ratio terms
      { id: "B", text: "$9$" },
      { id: "C", text: "$15$" },
      // distractor: multiplies by 5 instead of by 5/2
      { id: "D", text: "$30$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The perimeter ratio equals the side ratio, so $EF = 6 \\cdot \\frac{5}{2} = 15$.\n\n**The Full Solution:**\nStep 1: In similar triangles, the ratio of perimeters equals the ratio of any pair of corresponding sides. Here that common ratio is $\\frac{2}{5}$.\nStep 2: $\\overline{BC}$ corresponds to $\\overline{EF}$, so $\\frac{BC}{EF} = \\frac{2}{5}$, that is $\\frac{6}{EF} = \\frac{2}{5}$.\nStep 3: Cross-multiply: $2 \\cdot EF = 30$, so $EF = 15$.\n\nVerification: $\\frac{6}{15} = \\frac{2}{5}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.4$): applies the ratio backwards, $6 \\cdot \\frac{2}{5}$, shrinking a side of the larger triangle.\n* Choice B ($9$): adds the difference of the ratio terms, $6 + (5 - 2)$, treating the ratio as an additive gap.\n* Choice D ($30$): multiplies by $5$ instead of by $\\frac{5}{2}$.\n\n**Test Day Takeaway:** Perimeter ratio, side ratio, and altitude ratio are all the same number in similar figures. Only areas change the exponent.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-222",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "fill-in",
    question: "A dressmaking pattern book shows two similar triangular yoke pieces, drawn with lengths in centimeters, in which $FGH$ corresponds to $RST$. What is the length, in centimeters, of the side of piece $RST$ that corresponds to the shortest side of piece $FGH$?",
    diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[0, 9], [0, 0], [12, 0]], labels: ["F", "G", "H"], sideLabels: ["9", "12", "15"] }, triangle2: { vertices: [[0, 15], [0, 0], [20, 0]], labels: ["R", "S", "T"], sideLabels: ["", "20", ""] }, figureNote: true } },
    correctAnswer: "15",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is $15$.**\n\n**The Fast Way (~30s):** $\\overline{ST}$ matches $\\overline{GH}=12$, so the scale factor is $\\frac{20}{12}=\\frac{5}{3}$; the shortest side of $FGH$ is $\\overline{FG}=9$, so its partner is $9\\left(\\frac{5}{3}\\right)=15$.\n\n**The Full Solution:**\n\nStep 1 — Match the sides. The order $FGH \\to RST$ pairs $\\overline{GH}$ with $\\overline{ST}$ and $\\overline{FG}$ with $\\overline{RS}$.\n\nStep 2 — Find the scale factor from the known pair: $\\frac{ST}{GH}=\\frac{20}{12}=\\frac{5}{3}$.\n\nStep 3 — The shortest side of $FGH$ is $\\overline{FG}=9$ centimeters, so $RS=9\\left(\\frac{5}{3}\\right)=15$ centimeters. Check: the third side becomes $15\\left(\\frac{5}{3}\\right)=25$, and $15$-$20$-$25$ is a scaled copy of $9$-$12$-$15$.\n\n**Common Mistakes:** Answering $9$ copies the shortest side unchanged, treating similar pieces as congruent. Using $\\frac{20}{9}$ as the scale factor pairs $\\overline{ST}$ with the wrong side and gives $20$. Dividing instead of multiplying gives $9\\div\\frac{5}{3}=5.4$.\n\n**Test Day Takeaway:** Identify which side of the second figure is labeled, match it by vertex order, and only then decide which side you are scaling.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-223",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In the figure, $\\overline{MN}$ is parallel to $\\overline{QR}$ in triangle $PQR$, with $M$ on $\\overline{PQ}$ and $N$ on $\\overline{PR}$. If $PM = 8$, $MQ = 4$, and $QR = 21$, what is the length of $MN$?",
    diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[0, 0], [105, 0], [52, 140]], labels: ["Q", "R", "P"], sideLabels: ["QR = 21", "", ""] }, triangle2: { vertices: [[0, 0], [70, 0], [35, 93]], labels: ["M", "N", "P"], sideLabels: ["MN = ?", "", ""] }, figureNote: true } },
    choices: [
      // distractor: uses MQ over PQ instead of PM over PQ
      { id: "A", text: "$7$" },
      { id: "B", text: "$14$" },
      // distractor: copies QR
      { id: "C", text: "$21$" },
      // distractor: uses PM over MQ as the scale factor
      { id: "D", text: "$42$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $PQ = 8 + 4 = 12$, so triangle $PMN$ is triangle $PQR$ scaled by $\\frac{8}{12} = \\frac{2}{3}$. Then $MN = 21 \\cdot \\frac{2}{3} = 14$.\n\n**The Full Solution:**\nStep 1: A segment parallel to one side of a triangle cuts off a smaller triangle similar to the whole: $PMN \\sim PQR$, with $P$ the shared vertex.\nStep 2: The scale factor is the ratio of the sides along the same ray from $P$: $\\frac{PM}{PQ} = \\frac{8}{8 + 4} = \\frac{8}{12} = \\frac{2}{3}$.\nStep 3: $\\overline{MN}$ corresponds to $\\overline{QR}$, so $MN = 21 \\cdot \\frac{2}{3} = 14$.\n\nVerification: $\\frac{MN}{QR} = \\frac{14}{21} = \\frac{2}{3} = \\frac{PM}{PQ}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): uses $\\frac{MQ}{PQ} = \\frac{4}{12}$, the leftover piece instead of the piece attached to $P$.\n* Choice C ($21$): copies $QR$, as if the parallel segment were congruent to the base.\n* Choice D ($42$): uses $\\frac{PM}{MQ} = \\frac{8}{4} = 2$ as the scale factor; the denominator must be the whole side $PQ$, not the remaining piece.\n\n**Test Day Takeaway:** The denominator of the scale factor is the full side from the shared vertex, so add the two pieces before dividing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-224",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A garment factory cuts triangular collar interfacings in two similar sizes, and each side of the larger size is $k$ times the matching side of the smaller size. The three sides of the smaller size total $45$ centimeters, and the three sides of the larger size total $72$ centimeters. What is the value of $k$?",
    choices: [
      // distractor: inverts the ratio, computing 45/72 = 0.625
      { id: "A", text: "$0.625$" },
      { id: "B", text: "$1.6$" },
      // distractor: squares the ratio as if comparing areas: 1.6^2 = 2.56
      { id: "C", text: "$2.56$" },
      // distractor: cubes the ratio as if comparing volumes: 1.6^3 = 4.096
      { id: "D", text: "$4.096$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Perimeters of similar figures scale exactly as sides do, so $k=\\frac{72}{45}=1.6$.\n\n**The Full Solution:**\n\nStep 1 — Name the sides. Let the smaller interfacing have sides $a$, $b$, and $c$, so the larger has sides $ka$, $kb$, and $kc$.\n\nStep 2 — Add them: the larger perimeter is $ka+kb+kc=k(a+b+c)$, so $72=k(45)$.\n\nStep 3 — Solve: $k=\\frac{72}{45}=\\frac{8}{5}=1.6$. Check: $1.6(45)=72$, the stated total.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($0.625$): this computes $\\frac{45}{72}$, the factor that shrinks the larger size to the smaller one.\n* Choice C ($2.56$): this squares the ratio, $1.6^2$, which compares areas rather than lengths.\n* Choice D ($4.096$): this cubes the ratio, $1.6^3$, which compares volumes.\n\n**Test Day Takeaway:** Perimeter is a sum of lengths, so it scales by the same factor $k$ as any single side — no squaring, no cubing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-225",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A hotel's wayfinding kit contains two similar triangular floor decals, shown with lengths in centimeters, and the side marked $15$ on the smaller decal corresponds to the side marked $20$ on the larger decal. What is the length, in centimeters, of the longest side of the smaller decal?",
    diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[-1, 19.97], [0, 0], [24, 0]], sideLabels: ["20", "24", "32"] }, triangle2: { vertices: [[-0.75, 14.98], [0, 0], [18, 0]], sideLabels: ["15", "", ""] }, figureNote: true } },
    choices: [
      // distractor: applies the factor 0.75 to the already-scaled side: 15 x 0.75 = 11.25
      { id: "A", text: "$11.25$" },
      // distractor: reports the labeled side 15 itself rather than the longest side
      { id: "B", text: "$15$" },
      // distractor: scales the middle side 24 instead of the longest side 32: 24 x 0.75 = 18
      { id: "C", text: "$18$" },
      { id: "D", text: "$24$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**Choice D is correct.**\n\n**The Fast Way (~40s):** The scale factor is $\\frac{15}{20}=0.75$, and the longest side of the larger decal is $32$, so the smaller decal's longest side is $32(0.75)=24$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — Find the factor from the stated pair: $\\frac{15}{20}=\\frac{3}{4}=0.75$, so the smaller decal is a $0.75$ copy of the larger.\n\nStep 2 — Identify the target. Among $20$, $24$, and $32$, the longest side of the larger decal is $32$ centimeters.\n\nStep 3 — Scale it: $32(0.75)=24$ centimeters. Check: the smaller decal's three sides are $15$, $18$, and $24$, whose ratios to $20$, $24$, and $32$ are all $0.75$, and $15+18>24$, so the triangle is valid.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($11.25$): this multiplies the already-scaled $15$ by $0.75$ a second time.\n* Choice B ($15$): this reports the side the question used to build the factor, not the longest side.\n* Choice C ($18$): this scales the middle side $24$ instead of the longest side $32$.\n\n**Test Day Takeaway:** The number $24$ can belong to both figures — track which triangle a length lives in before you answer.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-226",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "hard",
    type: "fill-in",
    question: "A clinic stocks triangular arm slings in two sizes; the adult sling is a scale copy of the child sling enlarged by a factor of $\\frac{5}{3}$. Sewing the binding around an adult sling takes $28$ centimeters more tape than sewing the binding around a child sling. What is the perimeter, in centimeters, of a child sling?",
    correctAnswer: "42",
    explanation: "**SAT Pattern: Similar Triangles Proportion**\n\n**The correct answer is $42$.**\n\n**The Fast Way (~35s):** The adult binding runs $\\frac{5}{3}P$, so the extra tape is $\\frac{5}{3}P-P=\\frac{2}{3}P=28$, giving $P=42$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — Let $P$ be the child sling's perimeter. Because every length scales by $\\frac{5}{3}$, the sum of the three sides scales by $\\frac{5}{3}$ as well, so the adult sling's perimeter is $\\frac{5}{3}P$.\n\nStep 2 — Translate the tape comparison: $\\frac{5}{3}P-P=28$, which simplifies to $\\frac{2}{3}P=28$.\n\nStep 3 — Solve: $P=28\\left(\\frac{3}{2}\\right)=42$ centimeters. Check: the adult perimeter is $\\frac{5}{3}(42)=70$, and $70-42=28$ centimeters of extra tape.\n\n**Common Mistakes:** Answering $70$ gives the adult sling's perimeter instead of the child's. Multiplying $28$ by $\\frac{5}{3}$ gives $46\\frac{2}{3}$, treating $28$ as the child perimeter rather than the difference. Squaring the scale factor first, $\\frac{25}{9}P-P=28$, gives $P=15.75$ and wrongly compares areas.\n\n**Test Day Takeaway:** When a problem hands you a difference rather than a total, set up $kP-P=(k-1)P$ and divide once.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-triangles-proportion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── S.D. ARC LENGTH (bank-geo-227..230) ──────────────────────────────────
  // Arc length = (central angle / 360) × circumference, or = r·θ (radians).
  {
    id: "bank-geo-227",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In the circle shown, the central angle measures $120°$ and the radius is $9$. What is the length of the arc intercepted by that central angle?",
    diagram: { type: "circleWithSector", params: { centralAngle: 120, angleLabel: "120°", radius: 9, labelCenter: "O", showRadiusLabel: true, figureNote: true } },
    choices: [
      // distractor: uses pi r instead of 2 pi r
      { id: "A", text: "$3\\pi$" },
      { id: "B", text: "$6\\pi$" },
      // distractor: uses the diameter as the radius
      { id: "C", text: "$12\\pi$" },
      // distractor: gives the full circumference
      { id: "D", text: "$18\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $120°$ is $\\frac{1}{3}$ of the circle, so the arc is $\\frac{1}{3}$ of the circumference: $\\frac{1}{3} \\cdot 2\\pi(9) = 6\\pi$.\n\n**The Full Solution:**\nStep 1: Arc length $= \\frac{\\theta}{360°} \\cdot 2\\pi r$.\nStep 2: Substitute $\\theta = 120$ and $r = 9$: $\\frac{120}{360} \\cdot 2\\pi(9) = \\frac{1}{3} \\cdot 18\\pi$.\nStep 3: Simplify: $\\frac{18\\pi}{3} = 6\\pi$.\n\nVerification: three such arcs would tile the circle, and $3(6\\pi) = 18\\pi = 2\\pi(9)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3\\pi$): uses $\\pi r$ instead of $2\\pi r$ for the circumference, halving the answer.\n* Choice C ($12\\pi$): uses the diameter $18$ in place of the radius, computing $\\frac{1}{3} \\cdot 2\\pi(18)$.\n* Choice D ($18\\pi$): reports the full circumference and never applies the $\\frac{120}{360}$ fraction.\n\n**Test Day Takeaway:** Turn the central angle into a fraction of $360°$ first. A third of the circle means a third of the circumference, nothing more.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-228",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Seats in a lecture hall's first row are set along arc $AB$ of the circle drawn below. Lengths are given in feet. How long is that row of seats?",
    diagram: { type: "circleWithSector", params: { centralAngle: 45, angleLabel: "45°", radius: 24, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
    choices: [
      { id: "A", text: "$6\\pi$" },
      // distractor: divides the central angle by 180 instead of 360, doubling the arc to 12 pi
      { id: "B", text: "$12\\pi$" },
      // distractor: gives the full circumference 2 pi (24) = 48 pi
      { id: "C", text: "$48\\pi$" },
      // distractor: computes the sector's area, (1/8) pi (24 squared) = 72 pi
      { id: "D", text: "$72\\pi$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** A $45°$ arc is $\\frac{1}{8}$ of the circle, and $\\frac{1}{8}(48\\pi)=6\\pi$ feet.\n\n**The Full Solution:**\n\nStep 1: Compute the circumference. $C=2\\pi(24)=48\\pi$ feet.\n\nStep 2: Convert the angle to a fraction. $\\frac{45}{360}=\\frac{1}{8}$ of the full turn.\n\nStep 3: Multiply. Arc $AB=\\frac{1}{8}(48\\pi)=6\\pi$ feet, about $18.8$ feet.\n\nCheck: eight congruent $45°$ arcs would rebuild the whole circle, and $8(6\\pi)=48\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($12\\pi$): divides the central angle by $180$ instead of $360$, doubling the arc.\n* Choice C ($48\\pi$): reports the full circumference rather than the $45°$ piece of it.\n* Choice D ($72\\pi$): computes the sector's area, $\\frac{1}{8}\\pi(24)^{2}$, instead of the arc length.\n\n**Test Day Takeaway:** Always convert the central angle to a fraction of $360°$ — that fraction is what multiplies the circumference.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-229",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "fill-in",
    question: "A long-radius bend in a water main follows a circular arc of radius $54$ feet, and the pipe along that bend measures $12\\pi$ feet. Through how many degrees does the bend turn?",
    correctAnswer: "40",
    explanation: "**SAT Pattern: Arc Length**\n\n**The correct answer is $40$.**\n\n**The Fast Way (~35s):** The circumference is $108\\pi$, and $\\frac{12\\pi}{108\\pi}=\\frac{1}{9}$ of a full turn, which is $40°$.\n\n**The Full Solution:**\n\nStep 1: Find the circumference. $C=2\\pi(54)=108\\pi$ feet.\n\nStep 2: Compare the arc to the whole. $\\frac{12\\pi}{108\\pi}=\\frac{1}{9}$.\n\nStep 3: Convert to degrees. $\\frac{1}{9}(360°)=40°$.\n\nCheck: $\\frac{40}{360}(108\\pi)=12\\pi$ feet, the given bend length.\n\n**Common Mistakes:**\n\n* $20$: uses the diameter $108$ in place of the radius, halving the resulting angle.\n* $80$: uses $\\pi r=54\\pi$ as the circumference instead of $2\\pi r$.\n* $12$: reports the coefficient of $\\pi$ in the arc length rather than converting to degrees.\n\n**Test Day Takeaway:** The ratio of arc length to circumference equals the ratio of the central angle to $360°$ — set that proportion and solve.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  {
    id: "bank-geo-230",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Stone edging runs along arc $AB$ of a campus reflecting pool, as drawn, and the straight distance from $A$ to $B$ is $24$ feet. What is the length, in feet, of the edging?",
    diagram: { type: "circleWithSector", params: { centralAngle: 60, angleLabel: "60°", labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
    choices: [
      // distractor: treats the 24-foot chord as the diameter, using r = 12
      { id: "A", text: "$4\\pi$" },
      { id: "B", text: "$8\\pi$" },
      // distractor: divides the central angle by 180 instead of 360, giving 16 pi
      { id: "C", text: "$16\\pi$" },
      // distractor: reports the full circumference 2 pi (24) = 48 pi
      { id: "D", text: "$48\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~55s):** A $60°$ central angle makes triangle $OAB$ equilateral, so $r=24$; the arc is $\\frac{1}{6}(48\\pi)=8\\pi$ feet.\n\n**The Full Solution:**\n\nStep 1: Use the central angle. $\\overline{OA}$ and $\\overline{OB}$ are radii, so triangle $OAB$ is isosceles, and a $60°$ vertex angle forces the base angles to be $60°$ as well.\n\nStep 2: Read off the radius. An equilateral triangle makes $OA=OB=AB=24$ feet, so $r=24$ and $C=2\\pi(24)=48\\pi$ feet.\n\nStep 3: Take the fraction. $\\frac{60}{360}=\\frac{1}{6}$, so arc $AB=\\frac{1}{6}(48\\pi)=8\\pi$ feet.\n\nCheck: six $60°$ arcs rebuild the circle, and $6(8\\pi)=48\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4\\pi$): treats the $24$-foot chord as a diameter, using $r=12$.\n* Choice C ($16\\pi$): divides the central angle by $180$ instead of $360$, tripling the fraction to $\\frac{1}{3}$.\n* Choice D ($48\\pi$): reports the entire circumference instead of the $60°$ portion.\n\n**Test Day Takeaway:** A $60°$ central angle makes the chord equal to the radius — that is how a chord length hands you $r$ without any trigonometry.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-16"
  },

  // ─── S.A. TRIANGLE AREA (bank-geo-231..235) — top-up to ≥8 ────────────────
  // Existing items (Triangle Area, Isosceles Triangle Area, Triangle Area with
  // Line Constraint, Right Triangle Area, Right Triangle Area with Surds)
  // alias-route here. Adding 5 more.
  {
    id: "bank-geo-231",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Each hangtag a mill prints is a triangle whose base measures $b$ centimeters and whose height is $4$ centimeters shorter than the base. Which expression represents the number of square centimeters of card stock in one hangtag?",
    choices: [
      { id: "A", text: "$\\frac{b^2-4b}{2}$" },
      // distractor: fails to distribute b across the -4, leaving a bare constant
      { id: "B", text: "$\\frac{b^2-4}{2}$" },
      // distractor: halves the height and never multiplies by the base
      { id: "C", text: "$\\frac{b-4}{2}$" },
      // distractor: omits the factor 1/2 and gives the area of a rectangle instead
      { id: "D", text: "$b^2-4b$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The height is $b-4$, so $A=\\frac{1}{2}b(b-4)=\\frac{b^2-4b}{2}$.\n\n**The Full Solution:**\n\nStep 1 — Write the height in terms of the base: it is $4$ centimeters shorter, so the height is $b-4$ centimeters.\n\nStep 2 — Apply the area formula: $A=\\frac{1}{2}bh=\\frac{1}{2}b(b-4)$.\n\nStep 3 — Distribute: $\\frac{1}{2}(b^2-4b)=\\frac{b^2-4b}{2}$ square centimeters. Check with $b=10$: the triangle is $10$ by $6$, giving $30$, and $\\frac{100-40}{2}=30$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($\\frac{b^2-4}{2}$): this multiplies $b$ by $b$ but not by $4$; at $b=10$ it gives $48$, not $30$.\n* Choice C ($\\frac{b-4}{2}$): this halves the height and never multiplies by the base.\n* Choice D ($b^2-4b$): this omits the factor $\\frac{1}{2}$, giving the rectangle's area.\n\n**Test Day Takeaway:** Translate the comparison into an expression first, substitute into $\\frac{1}{2}bh$, and test one friendly value against every choice.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-232",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "fill-in",
    question: "The gusset plate shown is cut for a bridge truss, and its two legs are measured in centimeters. How many square centimeters of steel does the plate contain?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [21, 0], [21, 16]], sideLabels: ["21", "16", ""], rightAngleVertex: 1 } },
    correctAnswer: "168",
    explanation: "**SAT Pattern: Triangle Area**\n\n**The correct answer is $168$.**\n\n**The Fast Way (~20s):** The two legs meet at the right angle, so they are the base and the height: $\\frac{1}{2}(21)(16) = 168$.\n\n**The Full Solution:**\nStep 1: The right-angle mark sits between the legs of length $21$ centimeters and $16$ centimeters, so those two segments are perpendicular.\nStep 2: In a right triangle the two legs serve as base and height, so the area is $\\frac{1}{2}(21)(16)$.\nStep 3: $\\frac{1}{2}(21)(16) = \\frac{336}{2} = 168$ square centimeters.\n\nCheck: The plate sits inside a $21$ by $16$ rectangle of area $336$, and it fills exactly half of it. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $336$ by multiplying the legs and forgetting the factor $\\frac{1}{2}$.\n* Answering $37$ by adding the two leg lengths instead of multiplying them.\n* Answering $18.5$ by halving the sum $21 + 16$ rather than halving the product.\n\n**Test Day Takeaway:** In a right triangle the two legs are already a base and its height, so no extra altitude is needed.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-233",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The area of a triangle is $54$ square inches, and the height drawn to one of its sides is $12$ inches. What is the length, in inches, of that side?",
    choices: [
      // distractor: divides the area by the height without doubling
      { id: "A", text: "$4.5$" },
      { id: "B", text: "$9$" },
      // distractor: subtracts the height from the area
      { id: "C", text: "$42$" },
      // distractor: doubles the area but never divides
      { id: "D", text: "$108$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** From $\\frac{1}{2}bh = 54$ with $h = 12$: $b = \\frac{2(54)}{12} = \\frac{108}{12} = 9$ inches.\n\n**The Full Solution:**\nStep 1: Start from the area formula $A = \\frac{1}{2}bh$ and substitute what is known: $54 = \\frac{1}{2}b(12) = 6b$.\nStep 2: Solve for $b$: $b = \\frac{54}{6} = 9$.\nStep 3: The side that the height is drawn to measures $9$ inches.\n\nVerification: $\\frac{1}{2}(9)(12) = 54$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.5$): divides $54$ by $12$ without first doubling the area, effectively solving $bh = 54$.\n* Choice C ($42$): subtracts $54 - 12$, treating the relationship as additive.\n* Choice D ($108$): doubles the area to $108$ but never divides by the height.\n\n**Test Day Takeaway:** Clear the fraction first: $bh = 2A$. Working with $108 = 12b$ is cleaner than juggling a $\\frac{1}{2}$ mid-solve.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-234",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An optical prism is ground so that its end face is the triangle shown, with all three angles marked and each edge measuring $12$ millimeters. What is the area, in square millimeters, of that end face?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["60°", "60°", "60°"], figureNote: true } },
    choices: [
      // distractor: reports the triangle's height, 6*sqrt(3), instead of its area
      { id: "A", text: "$6\\sqrt{3}$" },
      { id: "B", text: "$36\\sqrt{3}$" },
      // distractor: multiplies base by height without halving: 12*6sqrt(3) = 72sqrt(3)
      { id: "C", text: "$72\\sqrt{3}$" },
      // distractor: uses s^2*sqrt(3) instead of (sqrt(3)/4)s^2, four times too large
      { id: "D", text: "$144\\sqrt{3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** All three angles are $60^\\circ$, so the end face is equilateral with side $12$, and its area is $\\frac{\\sqrt{3}}{4}(12)^2 = 36\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: Each marked angle is $60^\\circ$, so the triangle is equilateral and every side is $12$ millimeters.\nStep 2: The altitude to any side splits the triangle into two $30$-$60$-$90$ triangles with hypotenuse $12$ and short leg $6$, so the height is $6\\sqrt{3}$ millimeters.\nStep 3: The area is $\\frac{1}{2}(12)(6\\sqrt{3}) = 36\\sqrt{3}$ square millimeters.\n\nCheck: $36\\sqrt{3} \\approx 62.4$, less than the $72$ square millimeters of a right triangle with legs $12$ and $12$, as it must be. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6\\sqrt{3}$): stops at the height of the triangle and reports it as the area.\n* Choice C ($72\\sqrt{3}$): multiplies the base $12$ by the height $6\\sqrt{3}$ but never halves the product.\n* Choice D ($144\\sqrt{3}$): uses $s^2\\sqrt{3}$ in place of $\\frac{\\sqrt{3}}{4}s^2$, which is four times too large.\n\n**Test Day Takeaway:** Three $60^\\circ$ angles mean equilateral; drop one altitude and the $30$-$60$-$90$ ratios hand you the height.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-235",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A spectrometer's quartz wedge is ground so that face $JKL$ carries the three angle measures shown, each written in terms of $x$. Edge $\\overline{JL}$ spans $12$ millimeters, while neither of the other two edges is given a length. How many square millimeters does that face cover?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["x°", "3x°", "2x°"], vertexLabels: ["J", "K", "L"], figureNote: true } },
    choices: [
      { id: "A", text: "$18\\sqrt{3}$" },
      // distractor: treats the 12 as the longer leg, giving a short leg of 4sqrt(3) and area 24sqrt(3)
      { id: "B", text: "$24\\sqrt{3}$" },
      // distractor: multiplies the two legs 6 and 6sqrt(3) without halving
      { id: "C", text: "$36\\sqrt{3}$" },
      // distractor: treats the 12 as the shorter leg, giving a longer leg of 12sqrt(3) and area 72sqrt(3)
      { id: "D", text: "$72\\sqrt{3}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice A is correct.**\n\n**The Fast Way (~50s):** From $x + 3x + 2x = 180$ the angles are $30^\\circ$, $90^\\circ$, and $60^\\circ$, so the labeled $12$ is the hypotenuse, the legs are $6$ and $6\\sqrt{3}$, and the area is $18\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: The three angle measures sum to $180^\\circ$: $x + 3x + 2x = 6x = 180$, so $x = 30$ and the angles at $J$, $K$, and $L$ are $30^\\circ$, $90^\\circ$, and $60^\\circ$.\nStep 2: Edge $\\overline{JL}$ lies opposite the $90^\\circ$ angle at $K$, so the $12$ millimeters is the hypotenuse. In a $30$-$60$-$90$ triangle the side opposite $30^\\circ$ is half the hypotenuse, $6$, and the side opposite $60^\\circ$ is $6\\sqrt{3}$.\nStep 3: The two legs are perpendicular, so the area is $\\frac{1}{2}(6)(6\\sqrt{3}) = 18\\sqrt{3}$ square millimeters.\n\nCheck: $18\\sqrt{3} \\approx 31.2$, and the triangle fits inside a $6$ by $6\\sqrt{3}$ rectangle of area about $62.4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($24\\sqrt{3}$): treats the $12$ as the longer leg, making the short leg $4\\sqrt{3}$ and the area $\\frac{1}{2}(4\\sqrt{3})(12) = 24\\sqrt{3}$.\n* Choice C ($36\\sqrt{3}$): finds the legs $6$ and $6\\sqrt{3}$ correctly but multiplies them without halving.\n* Choice D ($72\\sqrt{3}$): treats the $12$ as the shorter leg, making the longer leg $12\\sqrt{3}$ and the area $\\frac{1}{2}(12)(12\\sqrt{3}) = 72\\sqrt{3}$.\n\n**Test Day Takeaway:** Solve for the angles before you touch a side length; the hypotenuse is always the side facing the right angle.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── S.A. CIRCUMFERENCE OF A CIRCLE (bank-geo-236..242) — top-up to ≥8 ────
  {
    id: "bank-geo-236",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A crash cymbal measures $19$ centimeters from its center bell to its rim. What is the distance, in centimeters, around the rim?",
    choices: [
      // distractor: uses pi times r, which is half the circumference
      { id: "A", text: "$19\\pi$" },
      { id: "B", text: "$38\\pi$" },
      // distractor: uses the area formula pi r squared, giving 361 pi
      { id: "C", text: "$361\\pi$" },
      // distractor: uses 2 pi r squared, mixing the circumference and area formulas
      { id: "D", text: "$722\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** The distance from the center to the rim is the radius, so $C = 2\\pi(19) = 38\\pi$ centimeters.\n\n**The Full Solution:**\nStep 1: Center-to-rim is the radius: $r = 19$ centimeters.\nStep 2: The distance around a circle is $C = 2\\pi r$.\nStep 3: Substitute: $C = 2\\pi(19) = 38\\pi$ centimeters. Check: the diameter is $38$ centimeters, and $C = \\pi d = 38\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($19\\pi$): computes $\\pi r$, the length of half the rim.\n* Choice C ($361\\pi$): uses $\\pi r^2$, which measures the surface the cymbal covers, not its rim.\n* Choice D ($722\\pi$): doubles the area expression, combining both formulas incorrectly.\n\n**Test Day Takeaway:** Squaring the radius always signals area — a distance around uses $2\\pi r$ with the radius to the first power.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-237",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "easy",
    type: "fill-in",
    question: "A parks department measures the lip of a circular skate bowl and records a circumference of $44\\pi$ feet. What is the diameter, in feet, of the lip?",
    correctAnswer: "44",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**The correct answer is $44$.**\n\n**The Fast Way (~10s):** Since $C = \\pi d$, dividing $44\\pi$ by $\\pi$ gives $d = 44$ feet.\n\n**The Full Solution:**\nStep 1: Circumference in terms of diameter is $C = \\pi d$.\nStep 2: Set $\\pi d = 44\\pi$.\nStep 3: Divide both sides by $\\pi$: $d = 44$ feet. Check: with $d = 44$ the radius is $22$, and $2\\pi(22) = 44\\pi$ ✓\n\n**Common Mistakes:**\n* $22$ — reports the radius, $\\frac{C}{2\\pi}$, instead of the diameter.\n* $88$ — doubles again, as if $44\\pi$ were already the radius.\n* $14$ — divides $44$ by $\\pi \\approx 3.14$ after the $\\pi$ has already cancelled.\n\n**Test Day Takeaway:** When the circumference is written as a multiple of $\\pi$, the $\\pi$ cancels once — $C = \\pi d$ makes the diameter the coefficient itself.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-238",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A plankton net's circular mouth measures $C$ centimeters around. Which expression gives the number of square centimeters the mouth encloses?",
    choices: [
      { id: "A", text: "$\\frac{C^2}{4\\pi}$" },
      // distractor: squares only C, leaving pi times C squared over 2 pi squared
      { id: "B", text: "$\\frac{C^2}{2\\pi}$" },
      // distractor: uses C = pi r, so r = C over pi and the area becomes C squared over pi
      { id: "C", text: "$\\frac{C^2}{\\pi}$" },
      // distractor: uses r = C/2, confusing the circumference with the diameter
      { id: "D", text: "$\\frac{\\pi C^2}{4}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** From $C = 2\\pi r$ the radius is $\\frac{C}{2\\pi}$, so the area is $\\pi\\left(\\frac{C}{2\\pi}\\right)^2 = \\frac{C^2}{4\\pi}$.\n\n**The Full Solution:**\nStep 1: Solve the circumference formula for the radius: $r = \\frac{C}{2\\pi}$.\nStep 2: Substitute into the area formula: $A = \\pi r^2 = \\pi \\cdot \\frac{C^2}{4\\pi^2}$.\nStep 3: Cancel one factor of $\\pi$: $A = \\frac{C^2}{4\\pi}$ square centimeters. Check: if $r = 3$ then $C = 6\\pi$ and $\\frac{(6\\pi)^2}{4\\pi} = \\frac{36\\pi^2}{4\\pi} = 9\\pi = \\pi r^2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{C^2}{2\\pi}$): squares the numerator but not the $2$ in the denominator, losing a factor of $2$.\n* Choice C ($\\frac{C^2}{\\pi}$): starts from $C = \\pi r$, which is the diameter form, so the radius comes out twice too large.\n* Choice D ($\\frac{\\pi C^2}{4}$): treats $C$ as the diameter and uses $r = \\frac{C}{2}$.\n\n**Test Day Takeaway:** To link circumference and area, solve for $r$ first and square the WHOLE fraction — denominator included.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-239",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A circular garden bed has a diameter of $16$ feet. A wooden border is installed around the entire edge of the bed. To the nearest foot, what is the length of the border? (Use $\\pi \\approx 3.14$.)",
    choices: [
      // distractor: uses pi r instead of pi d
      { id: "A", text: "$25$" },
      { id: "B", text: "$50$" },
      // distractor: doubles the diameter before multiplying
      { id: "C", text: "$100$" },
      // distractor: computes the area
      { id: "D", text: "$201$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The border runs along the circumference: $C = \\pi d \\approx 3.14(16) = 50.24$, which rounds to $50$ feet.\n\n**The Full Solution:**\nStep 1: A border around the edge of a circular bed has the length of the circle's circumference.\nStep 2: With the diameter given, use $C = \\pi d = 3.14(16)$.\nStep 3: $3.14(16) = 50.24$, which to the nearest foot is $50$ feet.\n\nVerification: the radius is $8$, and $2(3.14)(8) = 50.24$ as well. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): uses $\\pi r = 3.14(8) = 25.12$, half the circumference.\n* Choice C ($100$): doubles the diameter first, computing $3.14(32) = 100.48$ — a second doubling that the formula $\\pi d$ has already accounted for.\n* Choice D ($201$): computes the area $\\pi r^2 = 3.14(64) = 200.96$; area is measured in square feet, not feet.\n\n**Test Day Takeaway:** Check the units the question asks for. A border is a length, so the circumference — not the area — is the quantity to compute.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-240",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "A studio cable spool's flange measures $96\\pi$ centimeters around. A larger spool's flange has a radius $7$ centimeters greater than the smaller flange's radius. The larger flange measures $k\\pi$ centimeters around. What is $k$?",
    correctAnswer: "110",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**The correct answer is $110$.**\n\n**The Fast Way (~30s):** The smaller radius is $\\frac{96\\pi}{2\\pi} = 48$, so the larger is $55$ and its circumference is $2\\pi(55) = 110\\pi$.\n\n**The Full Solution:**\nStep 1: From $2\\pi r = 96\\pi$, the smaller flange has radius $r = 48$ centimeters.\nStep 2: The larger flange's radius is $48 + 7 = 55$ centimeters.\nStep 3: Its circumference is $2\\pi(55) = 110\\pi$ centimeters, so $k = 110$. Check: increasing a radius by $7$ increases the circumference by $2\\pi(7) = 14\\pi$, and $96 + 14 = 110$ ✓\n\n**Common Mistakes:**\n* $55$ — reports the larger radius instead of its circumference.\n* $103$ — adds the $7$ directly to $96$, as if the coefficient were a radius.\n* $206$ — treats $96$ as the smaller radius and computes $2(96 + 7)$.\n\n**Test Day Takeaway:** A change in radius scales into circumference by $2\\pi$ — convert to a radius, adjust, then convert back.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-241",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Circle $A$ has a circumference of $26\\pi$ centimeters. The radius of circle $B$ is $5$ centimeters greater than the radius of circle $A$. What is the area, in square centimeters, of circle $B$?",
    choices: [
      // distractor: reports the circumference of circle B
      { id: "A", text: "$36\\pi$" },
      // distractor: reports the area of circle A
      { id: "B", text: "$169\\pi$" },
      { id: "C", text: "$324\\pi$" },
      // distractor: treats 26 as the radius of circle A
      { id: "D", text: "$961\\pi$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $C = 2\\pi r$, so $26\\pi = 2\\pi r$ gives $r_A = 13$. Then $r_B = 18$ and the area is $\\pi(18)^2 = 324\\pi$.\n\n**The Full Solution:**\nStep 1: Use the circumference formula to recover the radius of circle $A$: $2\\pi r_A = 26\\pi$, so $r_A = 13$ centimeters.\nStep 2: The radius of circle $B$ is $5$ centimeters larger: $r_B = 13 + 5 = 18$ centimeters.\nStep 3: Apply the area formula: $A = \\pi r_B^2 = \\pi(18)^2 = 324\\pi$. Check: circle $B$'s circumference would be $2\\pi(18) = 36\\pi$, which is larger than $26\\pi$, as expected.\n\n**Why the wrong answers are tempting:**\n* Choice A ($36\\pi$): this is the circumference of circle $B$, not its area.\n* Choice B ($169\\pi$): the area of circle $A$ — the $5$-centimeter increase was never applied.\n* Choice D ($961\\pi$): treats $26$ as the radius of circle $A$, giving $r_B = 31$ and $\\pi(31)^2 = 961\\pi$.\n\n**Test Day Takeaway:** When a circle is described by its circumference, divide by $2\\pi$ first. The coefficient of $\\pi$ in a circumference is the diameter, never the radius.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-242",
    domain: "geometry",
    skills: ["circle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The circular outcrop of a salt dome has a radius of $r$ meters. Increasing the radius by $k$ meters increases the circumference by $12\\pi$ meters and the area by $156\\pi$ square meters. What is the value of $r$?",
    choices: [
      // distractor: reports k, the increase in the radius, instead of r
      { id: "A", text: "$6$" },
      { id: "B", text: "$10$" },
      // distractor: drops the k squared term and solves 12r = 156
      { id: "C", text: "$13$" },
      // distractor: reports the enlarged radius r + k = 16
      { id: "D", text: "$16$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circumference of a Circle**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** The circumference change gives $2\\pi k = 12\\pi$, so $k = 6$; then $\\pi(12r + 36) = 156\\pi$ gives $r = 10$.\n\n**The Full Solution:**\nStep 1: The circumference grows by $2\\pi(r + k) - 2\\pi r = 2\\pi k$. Setting $2\\pi k = 12\\pi$ gives $k = 6$ meters.\nStep 2: The area grows by $\\pi(r + 6)^2 - \\pi r^2 = \\pi(12r + 36)$. Setting that equal to $156\\pi$ gives $12r + 36 = 156$.\nStep 3: Solve: $12r = 120$, so $r = 10$ meters. Check: the outcrop grows from radius $10$ to $16$, and $\\pi(256 - 100) = 156\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): reports $k$, the amount the radius grew, rather than the original radius.\n* Choice C ($13$): expands $(r + 6)^2$ as $r^2 + 12r$ and drops the $36$, solving $12r = 156$.\n* Choice D ($16$): reports the enlarged radius $r + k$ instead of the original.\n\n**Test Day Takeaway:** Circumference changes linearly with the radius, so it pins the increase first; the area equation then has only one unknown left.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circumference-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── S.D. SECTOR AREA (bank-geo-243..245) — top-up to ≥8 ──────────────────
  {
    id: "bank-geo-243",
    domain: "geometry",
    skills: ["sector-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The face of a medication timer is the circle shown with center $C$, and sector $MCN$ marks the hours remaining before the next dose. What is the area, in square centimeters, of sector $MCN$?",
    diagram: { type: "circleWithSector", params: { centralAngle: 120, angleLabel: "120°", radius: "6 cm", showRadiusLabel: true, labelCenter: "C", labelPoint1: "M", labelPoint2: "N" } },
    choices: [
      // distractor: computes the arc length (120/360)(2 pi)(6) = 4 pi instead of the area
      { id: "A", text: "$4\\pi$" },
      { id: "B", text: "$12\\pi$" },
      // distractor: gives the area of the whole circle, ignoring the 120-degree restriction
      { id: "C", text: "$36\\pi$" },
      // distractor: uses the diameter 12 in place of the radius: (1/3) pi (12)^2 = 48 pi
      { id: "D", text: "$48\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Sector Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The sector is $\\frac{120}{360}=\\frac{1}{3}$ of the circle, and the whole circle has area $\\pi(6)^2=36\\pi$, so the sector has area $\\frac{1}{3}(36\\pi)=12\\pi$.\n\n**The Full Solution:**\n\nStep 1 — Read the figure. The radius is $6$ centimeters and the central angle of sector $MCN$ is $120^\\circ$.\n\nStep 2 — Find the whole circle's area: $A=\\pi r^2=\\pi(6)^2=36\\pi$ square centimeters.\n\nStep 3 — Take the sector's share: $\\frac{120}{360}(36\\pi)=12\\pi$ square centimeters. Check: three such sectors would tile the full circle, and $3(12\\pi)=36\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($4\\pi$): this is the arc length $\\frac{120}{360}(2\\pi)(6)=4\\pi$ centimeters, a length rather than an area.\n* Choice C ($36\\pi$): this is the area of the entire circle, ignoring the $120^\\circ$ restriction.\n* Choice D ($48\\pi$): this squares the diameter $12$ instead of the radius, giving $\\frac{1}{3}\\pi(12)^2=48\\pi$.\n\n**Test Day Takeaway:** A sector's area is the circle's area times the angle's share of $360^\\circ$ — square the radius, never the diameter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "sector-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-244",
    domain: "geometry",
    skills: ["sector-area"],
    difficulty: "medium",
    type: "fill-in",
    question: "A circular dye vat lid is shown with center $O$, and the removable inspection panel is sector $AOB$. The area of that panel is $k\\pi$ square inches. What is the value of $k$?",
    diagram: { type: "circleWithSector", params: { centralAngle: 150, angleLabel: "150°", radius: "12 in", showRadiusLabel: true, labelCenter: "O", labelPoint1: "A", labelPoint2: "B" } },
    correctAnswer: "60",
    explanation: "**SAT Pattern: Sector Area**\n\n**The correct answer is $60$.**\n\n**The Fast Way (~25s):** The panel is $\\frac{150}{360}=\\frac{5}{12}$ of a circle of area $144\\pi$, and $\\frac{5}{12}(144\\pi)=60\\pi$, so $k=60$.\n\n**The Full Solution:**\n\nStep 1 — Read the figure: radius $12$ inches, central angle $150^\\circ$.\n\nStep 2 — Compute the full area: $A=\\pi(12)^2=144\\pi$ square inches.\n\nStep 3 — Scale by the angle's share: $\\frac{150}{360}(144\\pi)=\\frac{5}{12}(144\\pi)=60\\pi$. Matching $60\\pi=k\\pi$ gives $k=60$. Check: $\\frac{5}{12}$ of the lid is a little under half of it, and $60$ is a little under half of $144$.\n\n**Common Mistakes:** Using the arc length $\\frac{150}{360}(24\\pi)=10\\pi$ gives $k=10$, a length instead of an area. Forgetting to scale by the angle gives $k=144$. Squaring the diameter $24$ instead of the radius gives $\\frac{5}{12}(576\\pi)=240\\pi$, so $k=240$.\n\n**Test Day Takeaway:** When an answer is reported as $k\\pi$, carry $\\pi$ symbolically to the end and read $k$ off the coefficient.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "sector-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-245",
    domain: "geometry",
    skills: ["sector-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the circle with center $O$ shown, the area of the entire circle is $80\\pi$ and the area of sector $AOB$ is $30\\pi$. What is the value of $\\theta$?",
    diagram: { type: "circleWithSector", params: { centralAngle: 135, angleLabel: "θ°", labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
    choices: [
      // distractor: scales 180 degrees instead of 360 degrees
      { id: "A", text: "$67.5°$" },
      // distractor: mis-reduces 30/80 to 3/10
      { id: "B", text: "$108°$" },
      { id: "C", text: "$135°$" },
      // distractor: uses the region outside the sector
      { id: "D", text: "$225°$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Sector Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** The sector is $\\frac{30\\pi}{80\\pi} = \\frac{3}{8}$ of the circle, so $\\theta = \\frac{3}{8}(360^\\circ) = 135^\\circ$.\n\n**The Full Solution:**\nStep 1: The share of the circle a sector occupies equals its area divided by the circle's area: $\\frac{30\\pi}{80\\pi} = \\frac{3}{8}$.\nStep 2: A central angle takes the same share of the full $360^\\circ$ turn: $\\theta = \\frac{3}{8}(360^\\circ)$.\nStep 3: $\\frac{3}{8}(360) = 135$, so $\\theta = 135^\\circ$. Check: the remaining region has area $50\\pi$ and central angle $225^\\circ$, and $135 + 225 = 360$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($67.5^\\circ$): applies the correct fraction to $180^\\circ$ instead of to a full $360^\\circ$ turn.\n* Choice B ($108^\\circ$): mis-reduces $\\frac{30}{80}$ to $\\frac{3}{10}$ and computes $\\frac{3}{10}(360^\\circ)$.\n* Choice D ($225^\\circ$): finds the central angle of the region outside sector $AOB$, using $\\frac{50\\pi}{80\\pi}$.\n\n**Test Day Takeaway:** The radius never has to be found here. Area ratio, arc ratio, and angle ratio are all the same fraction of the circle.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "sector-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── S.C. RADIANS ↔ DEGREES (bank-geo-246..248) — top-up to ≥8 ────────────
  {
    id: "bank-geo-246",
    domain: "geometry",
    skills: ["trigonometry"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A rack-mounted cooling louver swings open through the angle shown. Which expression gives the measure of that angle in radians?",
    diagram: { type: "circleWithSector", params: { centralAngle: 135, angleLabel: "135°", showAngleLabel: true, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
    choices: [
      // distractor: multiplies by pi over 360 instead of pi over 180, halving the correct measure
      { id: "A", text: "$\\frac{3\\pi}{8}$" },
      { id: "B", text: "$\\frac{3\\pi}{4}$" },
      // distractor: inverts the fraction to 4 over 3, which is the radian measure of 240 degrees
      { id: "C", text: "$\\frac{4\\pi}{3}$" },
      // distractor: doubles the correct measure, giving the radian measure of 270 degrees
      { id: "D", text: "$\\frac{3\\pi}{2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Radians ↔ Degrees Conversion**\n\n**Choice B is correct.** $135 \\cdot \\frac{\\pi}{180} = \\frac{135\\pi}{180} = \\frac{3\\pi}{4}$ radians.\n\n**The Fast Way (~15s):** $135^\\circ$ is $\\frac{3}{4}$ of $180^\\circ$, so it is $\\frac{3}{4}$ of $\\pi$ radians.\n\n**The Full Solution:**\n\nStep 1: Degrees convert to radians by multiplying by $\\frac{\\pi}{180}$.\n\nStep 2: $135 \\cdot \\frac{\\pi}{180} = \\frac{135\\pi}{180}$, and dividing numerator and denominator by $45$ gives $\\frac{3\\pi}{4}$.\n\nStep 3: Check by converting back: $\\frac{3\\pi}{4} \\cdot \\frac{180}{\\pi} = \\frac{540}{4} = 135^\\circ$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{3\\pi}{8}$): multiplies by $\\frac{\\pi}{360}$ instead of $\\frac{\\pi}{180}$, halving the measure.\n* Choice C ($\\frac{4\\pi}{3}$): flips $\\frac{3}{4}$ to $\\frac{4}{3}$, which is $240^\\circ$.\n* Choice D ($\\frac{3\\pi}{2}$): doubles the correct value, which is $270^\\circ$.\n\n**Test Day Takeaway:** Compare the angle to $180^\\circ$ — whatever fraction of $180^\\circ$ it is, it is that same fraction of $\\pi$ radians.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radians-degrees-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-247",
    domain: "geometry",
    skills: ["trigonometry"],
    difficulty: "medium",
    type: "fill-in",
    question: "A stepper motor on an automated titration rig advances the burette carriage by $\\frac{k\\pi}{45}$ radians on each step, where $k$ is a positive constant and every step turns the carriage through the same angle. Nine consecutive steps rotate the carriage through a total of $216^\\circ$. What is the value of $k$?",
    correctAnswer: "6",
    explanation: "**SAT Pattern: Radians ↔ Degrees Conversion**\n\n**The correct answer is $6$.**\n\n**The Fast Way (~40s):** Each step is $\\frac{216}{9} = 24^\\circ$, and $\\frac{k\\pi}{45}$ radians is $4k$ degrees, so $4k = 24$ and $k = 6$.\n\n**The Full Solution:**\n\nStep 1: Nine equal steps cover $216^\\circ$, so one step turns the carriage $\\frac{216}{9} = 24^\\circ$.\n\nStep 2: Convert the step size to degrees: $\\frac{k\\pi}{45} \\cdot \\frac{180}{\\pi} = \\frac{180k}{45} = 4k$ degrees.\n\nStep 3: Set $4k = 24$, so $k = 6$. Check: each step is $\\frac{6\\pi}{45} = \\frac{2\\pi}{15}$ radians, which is $24^\\circ$, and nine of them give $216^\\circ$.\n\n**Common Mistakes:**\n\n* $54$ — solving $4k = 216$ and forgetting that the $216^\\circ$ covers nine steps.\n* $24$ — reporting the degrees per step rather than the constant $k$.\n* $2$ — misreading the step as $\\frac{k\\pi}{15}$ radians, which is $12k$ degrees, and solving $12k = 24$.\n\n**Test Day Takeaway:** Convert first, then divide by the count — mixing the two orders is what turns a one-line conversion into a wrong answer.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radians-degrees-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-248",
    domain: "geometry",
    skills: ["trigonometry"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The measure of angle $A$ is $\\frac{7\\pi}{10}$ radians. The measure of angle $B$ is $18°$ less than the measure of angle $A$. What is the measure, in degrees, of angle $B$?",
    choices: [
      { id: "A", text: "$108$" },
      // distractor: reports angle A instead of angle B
      { id: "B", text: "$126$" },
      // distractor: adds 18 instead of subtracting
      { id: "C", text: "$144$" },
      // distractor: converts with 360 over pi, doubling the degree measure
      { id: "D", text: "$234$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Radians ↔ Degrees Conversion**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** $\\frac{7\\pi}{10} \\cdot \\frac{180}{\\pi} = 126$ degrees, and $126 - 18 = 108$.\n\n**The Full Solution:**\nStep 1: Convert angle $A$ to degrees by multiplying by $\\frac{180}{\\pi}$, so that the $\\pi$ cancels: $\\frac{7\\pi}{10} \\cdot \\frac{180}{\\pi} = \\frac{7 \\cdot 180}{10}$.\nStep 2: $\\frac{1260}{10} = 126$, so angle $A$ measures $126^\\circ$.\nStep 3: Angle $B$ is $18^\\circ$ smaller: $126 - 18 = 108$ degrees. Check: $108^\\circ$ converts back to $\\frac{108\\pi}{180} = \\frac{3\\pi}{5}$ radians, which is less than $\\frac{7\\pi}{10}$, as it must be.\n\n**Why the wrong answers are tempting:**\n* Choice B ($126$): converts angle $A$ correctly but reports that angle instead of angle $B$.\n* Choice C ($144$): adds $18^\\circ$ to angle $A$, reading \"less than\" backwards.\n* Choice D ($234$): converts with $\\frac{360}{\\pi}$, turning $\\frac{7\\pi}{10}$ into $252^\\circ$, then subtracts $18$.\n\n**Test Day Takeaway:** Convert first, then apply the relationship. Radians become degrees through $\\frac{180}{\\pi}$ — a half turn, never a full one.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radians-degrees-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── S.C. 30-60-90 TRIANGLE (bank-geo-249..255) — top-up to ≥8 ────────────
  {
    id: "bank-geo-249",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A rooftop solar array rests on triangular mounting wedges like the one drawn below, marked in inches. How long is the wedge edge that lies opposite its $30°$ corner?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [20.785, 0], [20.785, 12]], rightAngleVertex: 1, labels: ["30°", "", ""], sideLabels: ["", "", "24"], figureNote: true } },
    choices: [
      { id: "A", text: "$12$" },
      // distractor: takes two-thirds of the hypotenuse, 16, instead of half
      { id: "B", text: "$16$" },
      // distractor: restates the given hypotenuse, 24
      { id: "C", text: "$24$" },
      // distractor: doubles the hypotenuse instead of halving it
      { id: "D", text: "$48$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The side opposite the $30°$ angle is half the hypotenuse, so it is $\\frac{24}{2}=12$ inches.\n\n**The Full Solution:**\n\nStep 1: Label the ratio. A $30$-$60$-$90$ triangle has sides $x$, $x\\sqrt{3}$, and $2x$, with $x$ opposite the $30°$ angle.\n\nStep 2: Match the given. The hypotenuse is $2x=24$, so $x=12$ inches.\n\nStep 3: The requested edge is the one opposite $30°$, which is $x=12$ inches.\n\nCheck: the other leg is $12\\sqrt{3}\\approx20.8$, and $12^{2}+(12\\sqrt{3})^{2}=144+432=576=24^{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($16$): takes two-thirds of the hypotenuse instead of half.\n* Choice C ($24$): restates the hypotenuse shown in the figure rather than the side opposite $30°$.\n* Choice D ($48$): doubles the hypotenuse instead of halving it, reversing the $2x$ relationship.\n\n**Test Day Takeaway:** In a $30$-$60$-$90$ triangle the shortest side always sits opposite the $30°$ angle and equals half the hypotenuse.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-250",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "easy",
    type: "fill-in",
    question: "A wheelchair ramp rises at a $30°$ angle. The sloped surface of the ramp is the hypotenuse of the right triangle shown and is $16$ feet long. What is the vertical rise, in feet, of the ramp?",
    diagram: { type: "rightTriangle", params: { labels: ["30°", "", "60°"], sideLabels: ["", "", "16"], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "8",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**The correct answer is $8$.**\n\n**The Fast Way (~10s):** The vertical rise faces the $30^\\circ$ angle, so it is half the hypotenuse: $\\frac{16}{2} = 8$ feet.\n\n**The Full Solution:**\nStep 1: The ramp, its shadow on the ground, and the vertical rise form a $30$-$60$-$90$ triangle with sides in the ratio $1 : \\sqrt{3} : 2$.\nStep 2: The hypotenuse corresponds to the $2$, so the scale factor is $\\frac{16}{2} = 8$.\nStep 3: The vertical rise is opposite the $30^\\circ$ angle, so it corresponds to the $1$ and measures $8$ feet. Check: the horizontal run is $8\\sqrt{3} \\approx 13.9$ feet, and $8^2 + (8\\sqrt{3})^2 = 64 + 192 = 256 = 16^2$.\n\n**Common Mistakes:** Reporting $32$ by doubling the hypotenuse instead of halving it; or reporting the horizontal run $8\\sqrt{3}$, the side opposite the $60^\\circ$ angle, which is not what the question asks for.\n\n**Test Day Takeaway:** Identify which angle a side faces before scaling. The side opposite $30^\\circ$ is always half the hypotenuse.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-251",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In triangle $PQR$ shown, $\\angle P$ measures $30°$, $\\angle Q$ measures $90°$, and $PQ = 15\\sqrt{3}$. What is the length of $PR$?",
    diagram: { type: "rightTriangle", params: { labels: ["P", "Q", "R"], sideLabels: ["15√3", "", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: stops at the short leg
      { id: "A", text: "$15$" },
      { id: "B", text: "$30$" },
      // distractor: uses a 1:2:3 ratio
      { id: "C", text: "$45$" },
      // distractor: doubles the long leg
      { id: "D", text: "$30\\sqrt{3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** $PQ$ faces the $60^\\circ$ angle, so $PQ = s\\sqrt{3}$ gives $s = 15$; the hypotenuse $PR$ is $2s = 30$.\n\n**The Full Solution:**\nStep 1: Since $\\angle P = 30^\\circ$ and $\\angle Q = 90^\\circ$, the remaining angle $\\angle R = 60^\\circ$, and $PQ$ is the side opposite $\\angle R$.\nStep 2: In the ratio $1 : \\sqrt{3} : 2$, the side opposite $60^\\circ$ is $s\\sqrt{3}$. So $s\\sqrt{3} = 15\\sqrt{3}$ and $s = 15$.\nStep 3: $PR$ is the hypotenuse, opposite the right angle, so $PR = 2s = 30$. Check: $15^2 + (15\\sqrt{3})^2 = 225 + 675 = 900 = 30^2$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): stops at the short leg $QR$ instead of continuing to the hypotenuse.\n* Choice C ($45$): triples the short leg, using an invented $1 : 2 : 3$ ratio.\n* Choice D ($30\\sqrt{3}$): doubles the given side $15\\sqrt{3}$, treating the long leg as if it were the short leg.\n\n**Test Day Takeaway:** Strip the $\\sqrt{3}$ off the long leg to recover the short leg, then double it. Never double the long leg directly.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-252",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A shade sail stretched over a campus courtyard has the shape of a right triangle in which one acute angle measures $30°$ and the other measures $60°$. The shortest side of the sail measures $s$ meters, and rope trim runs along all three sides. Which expression represents the total length, in meters, of the trim?",
    choices: [
      // distractor: adds only the two legs and omits the hypotenuse 2s
      { id: "A", text: "$(1+\\sqrt{3})s$" },
      // distractor: adds the hypotenuse and long leg but omits the shortest side
      { id: "B", text: "$(2+\\sqrt{3})s$" },
      { id: "C", text: "$(3+\\sqrt{3})s$" },
      // distractor: uses 2s times root 3 for the side opposite the 60 degree angle
      { id: "D", text: "$(3+2\\sqrt{3})s$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**Choice C is correct.**\n\n**The Fast Way (~30s):** The three sides are $s$, $s\\sqrt{3}$, and $2s$, and $s+s\\sqrt{3}+2s=(3+\\sqrt{3})s$.\n\n**The Full Solution:**\n\nStep 1: Write the sides in terms of the shortest one. With shortest side $s$, the long leg is $s\\sqrt{3}$ and the hypotenuse is $2s$.\n\nStep 2: Add all three. $s+s\\sqrt{3}+2s$.\n\nStep 3: Combine like terms. The rational terms give $3s$, so the perimeter is $(3+\\sqrt{3})s$ meters.\n\nCheck: with $s=2$ the sides are $2$, $2\\sqrt{3}\\approx3.46$, and $4$, summing to about $9.46$, and $(3+\\sqrt{3})(2)\\approx9.46$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($(1+\\sqrt{3})s$): adds only the two legs and leaves the hypotenuse $2s$ out of the perimeter.\n* Choice B ($(2+\\sqrt{3})s$): adds the hypotenuse and the long leg but omits the shortest side.\n* Choice D ($(3+2\\sqrt{3})s$): uses $2s\\sqrt{3}$ for the side opposite the $60°$ angle, doubling the long leg.\n\n**Test Day Takeaway:** Express every side in terms of the shortest one first; the perimeter is then a single sum of like terms.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-253",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "fill-in",
    question: "A guy brace for a utility pole appears in the figure below, with measurements in feet. What is the distance from the ground anchor up to the point where the brace meets the pole?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [41.569, 0], [41.569, 24]], rightAngleVertex: 1, labels: ["30°", "", ""], sideLabels: ["24√3", "", ""], figureNote: true } },
    correctAnswer: "48",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**The correct answer is $48$.**\n\n**The Fast Way (~35s):** The $24\\sqrt{3}$ feet side is the long leg, so the short leg is $24$ and the hypotenuse is $48$ feet.\n\n**The Full Solution:**\n\nStep 1: Identify the ratio. The sides are $x$, $x\\sqrt{3}$, and $2x$, with $x\\sqrt{3}$ adjacent to the $30°$ angle.\n\nStep 2: Solve for $x$. $x\\sqrt{3}=24\\sqrt{3}$ gives $x=24$ feet.\n\nStep 3: The sloped brace is the hypotenuse, $2x=48$ feet.\n\nCheck: $24^{2}+(24\\sqrt{3})^{2}=576+1728=2304=48^{2}$.\n\n**Common Mistakes:**\n\n* $24$: stops at the short leg $x$ instead of doubling it for the hypotenuse.\n* $72$: multiplies the given $24\\sqrt{3}$ by $\\sqrt{3}$, treating it as the short leg rather than the long leg.\n* $12$: halves $24$ after finding the short leg, reversing the $2x$ relationship.\n\n**Test Day Takeaway:** A length already carrying $\\sqrt{3}$ is almost always the long leg; divide by $\\sqrt{3}$ to reach the short leg first.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-254",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The right triangle shown has an acute angle of $30°$ and an area of $50\\sqrt{3}$ square units. What is the length of the hypotenuse?",
    diagram: { type: "rightTriangle", params: { labels: ["30°", "", "60°"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: stops at the short leg
      { id: "A", text: "$10$" },
      { id: "B", text: "$20$" },
      // distractor: uses a 1:2:3 ratio
      { id: "C", text: "$30$" },
      // distractor: reports the square of the short leg
      { id: "D", text: "$100$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** With legs $s$ and $s\\sqrt{3}$, the area is $\\frac{s^2\\sqrt{3}}{2} = 50\\sqrt{3}$, so $s^2 = 100$, $s = 10$, and the hypotenuse is $20$.\n\n**The Full Solution:**\nStep 1: Call the short leg $s$. In a $30$-$60$-$90$ triangle the other leg is $s\\sqrt{3}$, and the legs are perpendicular, so they serve as base and height.\nStep 2: Area $= \\frac{1}{2}(s)(s\\sqrt{3}) = \\frac{s^2\\sqrt{3}}{2}$. Setting this equal to $50\\sqrt{3}$ and dividing both sides by $\\sqrt{3}$ gives $\\frac{s^2}{2} = 50$, so $s^2 = 100$ and $s = 10$.\nStep 3: The hypotenuse is $2s = 20$. Check: the legs are $10$ and $10\\sqrt{3}$, and $\\frac{1}{2}(10)(10\\sqrt{3}) = 50\\sqrt{3}$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($10$): finds the short leg and stops one step early.\n* Choice C ($30$): triples the short leg, using an invented $1 : 2 : 3$ ratio instead of $1 : \\sqrt{3} : 2$.\n* Choice D ($100$): reports $s^2$ without taking the square root.\n\n**Test Day Takeaway:** When only an area is given, name the short leg $s$, write both legs in terms of $s$, and let the $\\sqrt{3}$ cancel.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-255",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In triangle $ABC$ shown, $\\angle C$ is a right angle and $AB = 12$. What is the area of triangle $ABC$?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["30°", "60°", "90°"], vertexLabels: ["A", "B", "C"], figureNote: true } },
    choices: [
      // distractor: applies the one-half a second time
      { id: "A", text: "$9\\sqrt{3}$" },
      { id: "B", text: "$18\\sqrt{3}$" },
      // distractor: omits the one-half
      { id: "C", text: "$36\\sqrt{3}$" },
      // distractor: uses the hypotenuse as the short leg
      { id: "D", text: "$72\\sqrt{3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: 30-60-90 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** The hypotenuse $12$ gives legs $6$ and $6\\sqrt{3}$, so the area is $\\frac{1}{2}(6)(6\\sqrt{3}) = 18\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: The angles are $30^\\circ$ at $A$, $60^\\circ$ at $B$, and $90^\\circ$ at $C$, so the sides are in the ratio $1 : \\sqrt{3} : 2$ and $AB = 12$ is the hypotenuse.\nStep 2: The scale factor is $\\frac{12}{2} = 6$, so $BC = 6$ (opposite $30^\\circ$) and $AC = 6\\sqrt{3}$ (opposite $60^\\circ$).\nStep 3: The legs meet at the right angle, so area $= \\frac{1}{2}(6)(6\\sqrt{3}) = 18\\sqrt{3}$. Check: $6^2 + (6\\sqrt{3})^2 = 36 + 108 = 144 = 12^2$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($9\\sqrt{3}$): applies the factor $\\frac{1}{2}$ a second time after the area is already computed.\n* Choice C ($36\\sqrt{3}$): multiplies the two legs but omits the $\\frac{1}{2}$.\n* Choice D ($72\\sqrt{3}$): treats $12$ as the short leg, giving legs $12$ and $12\\sqrt{3}$.\n\n**Test Day Takeaway:** In a right triangle the two legs are the base and height. Scale down from the hypotenuse before multiplying.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── S.C. 45-45-90 TRIANGLE (bank-geo-256..262) — top-up to ≥8 ────────────
  {
    id: "bank-geo-256",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The triangular corner shelf shown has two legs of equal length meeting at a right angle, with lengths in inches. What is the length of the shelf's front edge?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [14.142, 0], [14.142, 14.142]], rightAngleVertex: 1, labels: ["", "", ""], sideLabels: ["10√2", "10√2", ""], figureNote: true } },
    choices: [
      // distractor: halves a leg instead of scaling it up to the hypotenuse
      { id: "A", text: "$5\\sqrt{2}$" },
      // distractor: divides the leg by root 2 instead of multiplying
      { id: "B", text: "$10$" },
      // distractor: restates a leg length rather than the front edge
      { id: "C", text: "$10\\sqrt{2}$" },
      { id: "D", text: "$20$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** The front edge is a leg times $\\sqrt{2}$, so it is $10\\sqrt{2}\\cdot\\sqrt{2}=20$ inches.\n\n**The Full Solution:**\n\nStep 1: Classify the triangle. Two equal legs meeting at a right angle make a $45$-$45$-$90$ triangle with sides $x$, $x$, $x\\sqrt{2}$.\n\nStep 2: Identify $x$. Each leg is $10\\sqrt{2}$ inches, so $x=10\\sqrt{2}$.\n\nStep 3: Compute the hypotenuse. $x\\sqrt{2}=10\\sqrt{2}\\cdot\\sqrt{2}=10\\cdot2=20$ inches.\n\nCheck: $(10\\sqrt{2})^{2}+(10\\sqrt{2})^{2}=200+200=400=20^{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($5\\sqrt{2}$): halves a leg instead of scaling it up to the hypotenuse.\n* Choice B ($10$): divides the leg by $\\sqrt{2}$ instead of multiplying by it.\n* Choice C ($10\\sqrt{2}$): restates the leg length already marked in the figure.\n\n**Test Day Takeaway:** A leg already written as $a\\sqrt{2}$ makes the hypotenuse fall out as $2a$ — the radicals cancel.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-257",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "easy",
    type: "fill-in",
    question: "A square access panel on an electrical substation cabinet is bolted at each of its four corners, and each side of the panel measures $15\\sqrt{2}$ inches. To keep the panel from flexing, a crew welds one straight steel rod between the bolt at a corner and the bolt at the corner diagonally across from it. What is the length, in inches, of that rod?",
    correctAnswer: "30",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**The correct answer is $30$.**\n\n**The Fast Way (~25s):** A square's diagonal is a side times $\\sqrt{2}$, so the rod is $15\\sqrt{2}\\cdot\\sqrt{2}=30$ inches.\n\n**The Full Solution:**\n\nStep 1: See the triangle. The rod cuts the square into two $45$-$45$-$90$ triangles whose legs are the sides of the square.\n\nStep 2: Apply the ratio. With leg $x=15\\sqrt{2}$, the hypotenuse is $x\\sqrt{2}$.\n\nStep 3: Multiply. $15\\sqrt{2}\\cdot\\sqrt{2}=15\\cdot2=30$ inches.\n\nCheck: $(15\\sqrt{2})^{2}+(15\\sqrt{2})^{2}=450+450=900=30^{2}$.\n\n**Common Mistakes:**\n\n* $15$: divides the side by $\\sqrt{2}$ instead of multiplying, reversing the leg-to-hypotenuse direction.\n* $60$: doubles the correct diagonal, applying the $30$-$60$-$90$ doubling on top of the $\\sqrt{2}$ ratio.\n* $30\\sqrt{2}$: multiplies by $\\sqrt{2}$ twice, treating the given side as though it were already a leg-times-$\\sqrt{2}$ value.\n\n**Test Day Takeaway:** The diagonal of a square is always its side times $\\sqrt{2}$; when the side already carries $\\sqrt{2}$, the answer is a clean integer.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-258",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The isosceles right triangle shown has a hypotenuse of length $16$. What is the area of the triangle?",
    diagram: { type: "rightTriangle", params: { labels: ["45°", "", "45°"], sideLabels: ["", "", "16"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: uses legs of 8
      { id: "A", text: "$32$" },
      { id: "B", text: "$64$" },
      // distractor: omits the one-half
      { id: "C", text: "$128$" },
      // distractor: squares the hypotenuse
      { id: "D", text: "$256$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** Each leg is $\\frac{16}{\\sqrt{2}} = 8\\sqrt{2}$, so the area is $\\frac{1}{2}(8\\sqrt{2})^2 = \\frac{1}{2}(128) = 64$.\n\n**The Full Solution:**\nStep 1: In a $45$-$45$-$90$ triangle the hypotenuse is a leg times $\\sqrt{2}$, so $s\\sqrt{2} = 16$ and $s = \\frac{16}{\\sqrt{2}} = 8\\sqrt{2}$.\nStep 2: The two legs are perpendicular, so they are the base and the height: area $= \\frac{1}{2}(8\\sqrt{2})(8\\sqrt{2})$.\nStep 3: $(8\\sqrt{2})^2 = 64 \\cdot 2 = 128$, so the area is $\\frac{1}{2}(128) = 64$. Check: $128 + 128 = 256 = 16^2$, confirming the leg length.\n\n**Why the wrong answers are tempting:**\n* Choice A ($32$): halves the hypotenuse to get legs of $8$, then computes $\\frac{1}{2}(8)(8)$.\n* Choice C ($128$): multiplies the two legs but omits the factor $\\frac{1}{2}$.\n* Choice D ($256$): squares the hypotenuse, which gives the sum of the squares of the legs, not an area.\n\n**Test Day Takeaway:** Divide the hypotenuse by $\\sqrt{2}$, never by $2$. The leg of a $45$-$45$-$90$ triangle is about $71\\%$ of the hypotenuse, not half.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-259",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "fill-in",
    question: "A square concrete pad supports a utility transformer, and a buried conduit runs in a straight line from one corner of the pad to the corner diagonally opposite. That conduit measures $26\\sqrt{2}$ feet, and a chain-link fence is to be installed along all four edges of the pad. How many feet of fencing are needed?",
    correctAnswer: "104",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**The correct answer is $104$.**\n\n**The Fast Way (~35s):** The diagonal is a side times $\\sqrt{2}$, so the side is $26$ feet and the perimeter is $4(26)=104$ feet.\n\n**The Full Solution:**\n\nStep 1: Relate diagonal to side. The conduit is the hypotenuse of a $45$-$45$-$90$ triangle whose legs are sides of the square, so the diagonal is $s\\sqrt{2}$.\n\nStep 2: Solve for the side. $s\\sqrt{2}=26\\sqrt{2}$ gives $s=26$ feet.\n\nStep 3: Fence all four edges. $4s=4(26)=104$ feet.\n\nCheck: $26^{2}+26^{2}=1352$, and $(26\\sqrt{2})^{2}=676\\cdot2=1352$.\n\n**Common Mistakes:**\n\n* $26$: stops at the side length and never multiplies by the four edges.\n* $52$: doubles the side, fencing only two edges of the pad.\n* $676$: computes the pad's area, $26^{2}$, instead of its perimeter.\n\n**Test Day Takeaway:** Strip the $\\sqrt{2}$ off the diagonal to get the side, then answer the question actually asked — here, perimeter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-260",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Triangle $DEF$ shown is an isosceles right triangle with a right angle at $F$ and an area of $50$ square units. What is the length of $DE$?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["45°", "45°", "90°"], vertexLabels: ["D", "E", "F"], figureNote: true } },
    choices: [
      // distractor: drops the one-half and reports the leg
      { id: "A", text: "$5\\sqrt{2}$" },
      { id: "B", text: "$10\\sqrt{2}$" },
      // distractor: uses the area as a leg
      { id: "C", text: "$50\\sqrt{2}$" },
      // distractor: uses the square of the leg as a leg
      { id: "D", text: "$100\\sqrt{2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**Choice B is correct.**\n\n**The Fast Way (~25s):** $\\frac{1}{2}s^2 = 50$ gives $s = 10$, and $DE$ is the hypotenuse, so $DE = 10\\sqrt{2}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $F$, so $DF$ and $EF$ are the legs; being isosceles, they are equal. Call each one $s$.\nStep 2: Area $= \\frac{1}{2}s \\cdot s = \\frac{s^2}{2} = 50$, so $s^2 = 100$ and $s = 10$.\nStep 3: $DE$ is opposite the right angle, so $DE = s\\sqrt{2} = 10\\sqrt{2}$. Check: $10^2 + 10^2 = 200 = (10\\sqrt{2})^2$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($5\\sqrt{2}$): solves $s^2 = 50$ by dropping the $\\frac{1}{2}$, getting $s = 5\\sqrt{2}$, and reports that leg as the hypotenuse.\n* Choice C ($50\\sqrt{2}$): treats the area $50$ itself as a leg length.\n* Choice D ($100\\sqrt{2}$): uses $s^2 = 100$ as the leg length without taking the square root.\n\n**Test Day Takeaway:** For an isosceles right triangle, area $= \\frac{s^2}{2}$. Solve for the leg, then attach $\\sqrt{2}$ only at the end.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-261",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the isosceles right triangle shown, each leg has length $s$ and the hypotenuse is $6$ units longer than a leg. What is the value of $s$?",
    diagram: { type: "rightTriangle", params: { labels: ["45°", "", "45°"], sideLabels: ["s", "s", "s + 6"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: multiplies by root 2 minus 1 instead of dividing
      { id: "A", text: "$6\\sqrt{2} - 6$" },
      // distractor: uses a denominator of 2 when rationalizing
      { id: "B", text: "$3 + 3\\sqrt{2}$" },
      { id: "C", text: "$6 + 6\\sqrt{2}$" },
      // distractor: reports the hypotenuse
      { id: "D", text: "$12 + 6\\sqrt{2}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**Choice C is correct.**\n\n**The Fast Way (~45s):** $s\\sqrt{2} = s + 6$ gives $s(\\sqrt{2} - 1) = 6$, so $s = \\frac{6}{\\sqrt{2} - 1} = 6(\\sqrt{2} + 1) = 6 + 6\\sqrt{2}$.\n\n**The Full Solution:**\nStep 1: In a $45$-$45$-$90$ triangle the hypotenuse is $s\\sqrt{2}$. The condition in the figure says $s\\sqrt{2} = s + 6$.\nStep 2: Collect the $s$ terms: $s\\sqrt{2} - s = 6$, so $s(\\sqrt{2} - 1) = 6$ and $s = \\frac{6}{\\sqrt{2} - 1}$.\nStep 3: Rationalize by multiplying numerator and denominator by $\\sqrt{2} + 1$. The denominator becomes $(\\sqrt{2})^2 - 1^2 = 1$, so $s = 6(\\sqrt{2} + 1) = 6 + 6\\sqrt{2}$. Check: $s \\approx 14.49$ and $s\\sqrt{2} \\approx 20.49$, a difference of $6$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($6\\sqrt{2} - 6$): multiplies by $\\sqrt{2} - 1$ instead of dividing by it.\n* Choice B ($3 + 3\\sqrt{2}$): rationalizes but records the denominator $(\\sqrt{2} - 1)(\\sqrt{2} + 1)$ as $2$ rather than $1$.\n* Choice D ($12 + 6\\sqrt{2}$): solves for $s$ correctly but reports the hypotenuse $s + 6$.\n\n**Test Day Takeaway:** When a side is described relative to another side, set up one equation in one variable and rationalize carefully: $(\\sqrt{2} - 1)(\\sqrt{2} + 1) = 1$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-262",
    domain: "geometry",
    skills: ["right-triangles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The gable bracket above a shop's window display is the isosceles right triangle shown, with angle measures in degrees. What is the value of $y$?",
    diagram: { type: "triangleWithAngles", params: { angleLabels: ["(2y - 5)°", "(y + 20)°", "90°"], vertexLabels: ["P", "Q", "R"], figureNote: true } },
    choices: [
      { id: "A", text: "$25$" },
      // distractor: sets 2y - 5 equal to 90, giving y = 47.5
      { id: "B", text: "$47.5$" },
      // distractor: omits the right angle from the sum, solving 3y + 15 = 180
      { id: "C", text: "$55$" },
      // distractor: sets y + 20 equal to 90, giving y = 70
      { id: "D", text: "$70$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: 45-45-90 Triangle**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The three angles sum to $180°$: $(2y-5)+(y+20)+90=180$ gives $3y=75$, so $y=25$.\n\n**The Full Solution:**\n\nStep 1: Write the angle sum. $(2y-5)+(y+20)+90=180$.\n\nStep 2: Combine like terms. $3y+105=180$, so $3y=75$ and $y=25$.\n\nStep 3: Confirm the shape. The acute angles become $2(25)-5=45$ and $25+20=45$, the equal base angles of a $45$-$45$-$90$ triangle.\n\nCheck: $45+45+90=180$, and the two base angles match, as an isosceles right triangle requires.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($47.5$): sets $2y-5=90$, assigning the right angle to the wrong vertex.\n* Choice C ($55$): leaves the $90°$ angle out of the sum, solving $3y+15=180$.\n* Choice D ($70$): sets $y+20=90$, again placing the right angle at a labeled acute vertex.\n\n**Test Day Takeaway:** With one right angle marked, the two remaining expressions must add to $90°$ — and in an isosceles right triangle they must also be equal.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // ─── S.B. VERTICAL ANGLES (bank-geo-263..270) — new canonical ─────────────
  {
    id: "bank-geo-263",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Inside a junction box two fiber-optic runs cross at a splice. The figure marks two of the four angles formed, in degrees, and $x$ appears in one of those two expressions. What is the value of $x$?",
    diagram: { type: "intersectingLines", params: { angles: ["(x + 26)°", "", "94°", ""], figureNote: true } },
    choices: [
      // distractor: treats the two marked angles as a linear pair, using 180 - 94 = 86 and then 86 - 26 = 60
      { id: "A", text: "$60$" },
      { id: "B", text: "$68$" },
      // distractor: reports the angle measure 94 rather than the value of x
      { id: "C", text: "$94$" },
      // distractor: adds 26 to 94 instead of subtracting it
      { id: "D", text: "$120$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The two marked angles are vertical angles, so $x + 26 = 94$ and $x = 68$.\n\n**The Full Solution:**\nStep 1: The two marked angles sit across the crossing point from each other, so they are vertical angles and have equal measures.\nStep 2: That gives the equation $x + 26 = 94$.\nStep 3: Subtracting $26$ from both sides gives $x = 68$.\n\nCheck: $68 + 26 = 94$, matching the marked angle. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($60$): treats the pair as supplementary, using $180 - 94 = 86$ and then $86 - 26$.\n* Choice C ($94$): reports the angle's measure rather than the value of $x$.\n* Choice D ($120$): adds $26$ to $94$ instead of subtracting it.\n\n**Test Day Takeaway:** Vertical angles are equal; set the two expressions equal before solving for the variable.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-264",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "easy",
    type: "fill-in",
    question: "The figure shows two intersecting lines. The angles marked $124°$ and $y°$ are adjacent, and together they form a straight line. What is the value of $y$?",
    diagram: { type: "intersectingLines", params: { angles: ["", "124°", "y°", ""], figureNote: true } },
    correctAnswer: "56",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**The correct answer is $56$.**\n\n**The Fast Way (~5s):** Adjacent angles on a line are supplementary: $y = 180 - 124 = 56$.\n\n**The Full Solution:**\nStep 1: The two marked angles share a ray and their outer rays form a straight line, so they are a linear pair.\nStep 2: A linear pair sums to $180^\\circ$: $124 + y = 180$.\nStep 3: $y = 56$. Check: the angle vertical to the $124^\\circ$ angle also measures $124^\\circ$, and the four angles total $124 + 56 + 124 + 56 = 360$.\n\n**Common Mistakes:** Reporting $124$ by treating the marked angles as a vertical pair rather than an adjacent pair; or reporting $236$ by subtracting from $360$ instead of $180$.\n\n**Test Day Takeaway:** At a crossing, only two numbers exist. Find the pair that lies on a straight line and subtract from $180^\\circ$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-265",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Above a transformer yard, two guy wires cross at a spreader. The figure gives the degree measures of two angles that share a side, each written in terms of $x$. How many degrees are in the angle opposite the one marked $(2x + 11)^\\circ$?",
    diagram: { type: "intersectingLines", params: { angles: ["(2x + 11)°", "(3x + 4)°", "", ""], figureNote: true } },
    choices: [
      // distractor: treats the two adjacent angles as vertical angles, solving 2x + 11 = 3x + 4 for x = 7 and reporting 25
      { id: "A", text: "$25$" },
      // distractor: stops at x = 33 instead of substituting to get an angle measure
      { id: "B", text: "$33$" },
      { id: "C", text: "$77$" },
      // distractor: reports the measure of the other marked angle, 3(33) + 4 = 103
      { id: "D", text: "$103$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** The two marked angles form a linear pair, so $5x + 15 = 180$ and $x = 33$; the angle vertical to $(2x+11)^\\circ$ has the same measure, $77$ degrees.\n\n**The Full Solution:**\nStep 1: The marked angles are adjacent along a straight wire, so $(2x + 11) + (3x + 4) = 180$.\nStep 2: That simplifies to $5x + 15 = 180$, so $5x = 165$ and $x = 33$.\nStep 3: The angle marked $(2x+11)^\\circ$ measures $2(33) + 11 = 77$ degrees, and its vertical angle has the same measure, $77$ degrees.\n\nCheck: The other marked angle measures $3(33) + 4 = 103$ degrees, and $77 + 103 = 180$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): treats the adjacent pair as vertical angles, solving $2x + 11 = 3x + 4$ for $x = 7$.\n* Choice B ($33$): reports $x$ rather than an angle measure.\n* Choice D ($103$): substitutes correctly but into the other marked expression.\n\n**Test Day Takeaway:** Vertical angles copy a measure; adjacent angles on a line complete it to $180^\\circ$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-266",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Two steel reinforcing bars cross inside a precast mold. The degree measures of two of the resulting angles appear in the figure, and each of those measures is written in terms of the constant $m$. Which equation can be used to find the value of $m$?",
    diagram: { type: "intersectingLines", params: { angles: ["(m + 24)°", "", "(2m - 16)°", ""], figureNote: true } },
    choices: [
      { id: "A", text: "$m + 24 = 2m - 16$" },
      // distractor: treats vertical angles as complementary
      { id: "B", text: "$(m + 24) + (2m - 16) = 90$" },
      // distractor: treats vertical angles as supplementary, which is true only for adjacent angles
      { id: "C", text: "$(m + 24) + (2m - 16) = 180$" },
      // distractor: doubles one expression instead of setting the two equal
      { id: "D", text: "$2(m + 24) = 2m - 16$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** The two marked angles lie across the crossing point from each other, so they are vertical angles and their measures are equal.\n\n**The Full Solution:**\nStep 1: The angle marked $(m + 24)^\\circ$ and the angle marked $(2m - 16)^\\circ$ are on opposite sides of the point where the bars cross.\nStep 2: Angles in that position are vertical angles, and vertical angles are congruent.\nStep 3: Setting the measures equal gives $m + 24 = 2m - 16$.\n\nCheck: That equation gives $m = 40$, so each marked angle measures $64$ degrees, a legitimate pair of vertical angles. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: treats the two angles as complementary; a sum of $90$ degrees would force $m = \\frac{82}{3}$ and two unequal vertical angles.\n* Choice C: treats them as supplementary, which is the rule for adjacent angles, not opposite ones.\n* Choice D: doubles one expression rather than setting the two equal, which no angle relationship supports.\n\n**Test Day Takeaway:** Decide adjacent or opposite first; opposite means set equal, adjacent means sum to $180^\\circ$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-267",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "medium",
    type: "fill-in",
    question: "Two roadway centerlines meet at a highway intersection. Expressions in $x$ label two of the four angles that the crossing produces, as shown. What is the measure, in degrees, of the angle labeled $(4x + 27)^\\circ$?",
    diagram: { type: "intersectingLines", params: { angles: ["(4x + 27)°", "", "(7x - 12)°", ""], figureNote: true } },
    correctAnswer: "79",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**The correct answer is $79$.**\n\n**The Fast Way (~35s):** Opposite angles are equal, so $4x + 27 = 7x - 12$ gives $x = 13$ and each angle measures $4(13) + 27 = 79$ degrees.\n\n**The Full Solution:**\nStep 1: The two labeled angles sit across the intersection from each other, so they are vertical angles and their measures are equal.\nStep 2: Setting the expressions equal gives $4x + 27 = 7x - 12$, so $39 = 3x$ and $x = 13$.\nStep 3: Substituting gives $4(13) + 27 = 79$ degrees.\n\nCheck: The other expression gives $7(13) - 12 = 79$ degrees as well. $\\checkmark$\n\n**Common Mistakes:**\n* Answering $13$ by stopping at $x$ instead of substituting it back into an angle expression.\n* Answering $87$ by treating the two angles as a linear pair, solving $11x + 15 = 180$ for $x = 15$ and then evaluating $4(15) + 27$.\n* Answering $101$ by reporting the supplement of $79$ rather than the labeled angle itself.\n\n**Test Day Takeaway:** Solving for the variable is the middle of the problem; the question almost always wants the measure.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-268",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "On a schematic two hydraulic hoses cross at a manifold, and one angle formed is three times the measure of an adjacent angle, as the figure marks. The angle marked $z$ degrees lies opposite the smaller of those two. What is the value of $z$?",
    diagram: { type: "intersectingLines", params: { angles: ["a°", "3a°", "z°", ""], figureNote: true } },
    choices: [
      { id: "A", text: "$45$" },
      // distractor: solves 3a = 180 instead of a + 3a = 180, giving a = 60
      { id: "B", text: "$60$" },
      // distractor: assumes the two adjacent angles are equal, so each measures 90 degrees
      { id: "C", text: "$90$" },
      // distractor: reports the larger angle 3a = 135 instead of the angle vertical to a
      { id: "D", text: "$135$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The adjacent angles give $a + 3a = 180$, so $a = 45$, and $z$ marks the angle vertical to $a^\\circ$.\n\n**The Full Solution:**\nStep 1: The angles marked $3a^\\circ$ and $a^\\circ$ lie side by side along one hose, so they form a linear pair: $3a + a = 180$.\nStep 2: That gives $4a = 180$, so $a = 45$ and the two angles measure $135$ degrees and $45$ degrees.\nStep 3: The angle marked $z^\\circ$ is directly opposite the angle marked $a^\\circ$, so $z = a = 45$.\n\nCheck: The four angles around the crossing measure $135$, $45$, $135$, and $45$ degrees, which total $360$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($60$): solves $3a = 180$, using only the larger angle instead of the pair.\n* Choice C ($90$): assumes the two adjacent angles must be equal, which would make the hoses perpendicular.\n* Choice D ($135$): reports the larger angle rather than the one opposite $a^\\circ$.\n\n**Test Day Takeaway:** Write the linear-pair equation first, then trace the vertical angle to the measure the question names.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-269",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A control monument sits where two survey traverse lines meet. Three of the angles there carry the degree expressions marked, each involving the positive constants $x$ and $y$, and the fourth angle is left unmarked. What is the value of $x$?",
    diagram: { type: "intersectingLines", params: { angles: ["(2x + y)°", "5y°", "(3x - 10)°", ""], figureNote: true } },
    choices: [
      // distractor: reports y = 20 rather than x
      { id: "A", text: "$20$" },
      { id: "B", text: "$30$" },
      // distractor: reports the sum x + y = 50
      { id: "C", text: "$50$" },
      // distractor: reports the angle measure 3(30) - 10 = 80 instead of x
      { id: "D", text: "$80$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice B is correct.**\n\n**The Fast Way (~70s):** Vertical angles give $2x + y = 3x - 10$, and the linear pair gives $5y + (3x - 10) = 180$; solving together yields $x = 30$.\n\n**The Full Solution:**\nStep 1: The angles marked $(2x+y)^\\circ$ and $(3x-10)^\\circ$ are opposite each other, so $2x + y = 3x - 10$, which rearranges to $x = y + 10$.\nStep 2: The angles marked $5y^\\circ$ and $(3x-10)^\\circ$ are adjacent along one traverse line, so $5y + 3x - 10 = 180$.\nStep 3: Substituting $x = y + 10$ gives $5y + 3(y + 10) - 10 = 180$, so $8y + 20 = 180$, $y = 20$, and $x = 30$.\n\nCheck: The three angles measure $2(30)+20 = 80$, $5(20) = 100$, and $3(30)-10 = 80$ degrees; the opposite pair matches and $80 + 100 = 180$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20$): solves the system correctly but reports $y$ instead of $x$.\n* Choice C ($50$): reports the sum $x + y$ rather than $x$ alone.\n* Choice D ($80$): reports the angle measure $3x - 10$ instead of the value of $x$.\n\n**Test Day Takeaway:** Two intersecting lines give one equality and one supplement; that is exactly enough for two unknowns.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  {
    id: "bank-geo-270",
    domain: "geometry",
    skills: ["angles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A machine layout shows two belt drives crossing. One of the marked angles is labeled $3x$ degrees, and the angle beside it carries the measure shown. What is the value of $x$?",
    diagram: { type: "intersectingLines", params: { angles: ["3x°", "132°", "", ""], figureNote: true } },
    choices: [
      { id: "A", text: "$16$" },
      // distractor: treats the two marked angles as vertical angles, solving 3x = 132
      { id: "B", text: "$44$" },
      // distractor: reports the angle measure 3x = 48 rather than the value of x
      { id: "C", text: "$48$" },
      // distractor: divides 180 by 3 and ignores the 132 degree angle
      { id: "D", text: "$60$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Vertical Angles**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The two marked angles are adjacent on a straight belt, so $3x + 132 = 180$ and $x = 16$.\n\n**The Full Solution:**\nStep 1: The angle marked $3x$ degrees and the $132$-degree angle sit side by side along one belt, so they form a linear pair.\nStep 2: Their measures sum to $180$: $3x + 132 = 180$, so $3x = 48$.\nStep 3: Dividing by $3$ gives $x = 16$.\n\nCheck: $3(16) + 132 = 48 + 132 = 180$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($44$): treats the pair as vertical angles and solves $3x = 132$.\n* Choice C ($48$): finds the angle measure $3x$ but never divides by $3$ to reach $x$.\n* Choice D ($60$): divides $180$ by $3$ and ignores the $132$-degree angle entirely.\n\n**Test Day Takeaway:** Angles that share a ray and lie on one line are supplementary; only angles across the vertex are equal.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "vertical-angles",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-18"
  },

  // === TIER 0 BANK GROWTH (2026-05-21): 2 geometry patterns @ 3 items → @ 5 items ===

  {
    id: "bank-geo-271",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A circular reservoir cover has a radius of $r$ meters. Which expression gives the area, in square meters, of a cover made for a reservoir whose radius is $3$ meters greater?",
    choices: [
      // distractor: adds 3 to the area instead of to the radius
      { id: "A", text: "$\\pi r^{2}+3$" },
      // distractor: adds the area of a separate circle of radius 3 rather than enlarging the radius
      { id: "B", text: "$\\pi r^{2}+9\\pi$" },
      // distractor: adds 3 to pi r and then squares the whole expression
      { id: "C", text: "$(\\pi r+3)^{2}$" },
      { id: "D", text: "$\\pi(r+3)^{2}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**Choice D is correct.**\n\n**The Fast Way (~25s):** The new radius is $r+3$, and $A=\\pi r^{2}$ becomes $\\pi(r+3)^{2}$.\n\n**The Full Solution:**\n\nStep 1: Update the radius. A reservoir whose radius is $3$ meters greater needs a cover of radius $r+3$ meters.\n\nStep 2: Apply the area formula to the new radius. $A=\\pi(\\text{radius})^{2}=\\pi(r+3)^{2}$.\n\nStep 3: Confirm the structure. The $3$ belongs inside the square, because it changes the radius before squaring.\n\nCheck: with $r=5$, the new cover has radius $8$ and area $64\\pi$, and $\\pi(5+3)^{2}=64\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\pi r^{2}+3$): adds $3$ to the area instead of to the radius.\n* Choice B ($\\pi r^{2}+9\\pi$): adds the area of a separate radius-$3$ circle, which is not how enlarging a radius works.\n* Choice C ($(\\pi r+3)^{2}$): adds $3$ to $\\pi r$ and then squares, putting $\\pi$ inside the square.\n\n**Test Day Takeaway:** A change to the radius happens before the squaring — keep it inside the parentheses.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-272",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A bronze medallion set into a library floor is a circle measuring $C$ inches around. Which expression gives the medallion's area, in square inches?",
    choices: [
      // distractor: stops at r squared and never multiplies by pi
      { id: "A", text: "$\\dfrac{C^{2}}{4\\pi^{2}}$" },
      { id: "B", text: "$\\dfrac{C^{2}}{4\\pi}$" },
      // distractor: uses r = C / (2 pi) but writes the area as 2 pi r squared
      { id: "C", text: "$\\dfrac{C^{2}}{2\\pi}$" },
      // distractor: solves C = pi r for the radius, giving pi (C/pi) squared
      { id: "D", text: "$\\dfrac{C^{2}}{\\pi}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Area of a Circle**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** $C=2\\pi r$ gives $r=\\frac{C}{2\\pi}$, so $A=\\pi r^{2}=\\frac{C^{2}}{4\\pi}$.\n\n**The Full Solution:**\n\nStep 1: Solve the circumference formula for the radius. $C=2\\pi r$, so $r=\\frac{C}{2\\pi}$ inches.\n\nStep 2: Substitute into the area formula. $A=\\pi\\left(\\frac{C}{2\\pi}\\right)^{2}=\\pi\\cdot\\frac{C^{2}}{4\\pi^{2}}$.\n\nStep 3: Simplify. One factor of $\\pi$ cancels, leaving $A=\\frac{C^{2}}{4\\pi}$ square inches.\n\nCheck: with $r=3$, $C=6\\pi$ and $\\frac{(6\\pi)^{2}}{4\\pi}=\\frac{36\\pi^{2}}{4\\pi}=9\\pi$, which is $\\pi(3)^{2}$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($\\frac{C^{2}}{4\\pi^{2}}$): stops at $r^{2}$ and never multiplies by $\\pi$.\n* Choice C ($\\frac{C^{2}}{2\\pi}$): uses the right radius but writes the area as $2\\pi r^{2}$.\n* Choice D ($\\frac{C^{2}}{\\pi}$): solves $C=\\pi r$ for the radius, using the diameter formula in place of the circumference.\n\n**Test Day Takeaway:** Convert the given measurement to a radius first; substituting into $\\pi r^{2}$ then cancels one power of $\\pi$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "area-of-a-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-273",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A dining car aboard a scenic railway trims each square napkin with piping that runs $88$ centimeters around the napkin's four edges. How long, in centimeters, is one edge of a napkin?",
    choices: [
      { id: "A", text: "$22$" },
      // distractor: divides the perimeter by 2 instead of by 4: 88/2 = 44
      { id: "B", text: "$44$" },
      // distractor: reports the perimeter itself rather than one edge
      { id: "C", text: "$88$" },
      // distractor: squares the correct side to give the area 22^2 = 484 instead of a length
      { id: "D", text: "$484$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**Choice A is correct.**\n\n**The Fast Way (~10s):** A square has four equal edges, so one edge is $\\frac{88}{4}=22$ centimeters.\n\n**The Full Solution:**\n\nStep 1 — The piping traces the perimeter, so $4s=88$ where $s$ is one edge.\n\nStep 2 — Divide by $4$: $s=\\frac{88}{4}=22$ centimeters.\n\nStep 3 — Confirm the fit: four edges of $22$ centimeters total $4(22)=88$ centimeters, exactly the piping used.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($44$): this divides by $2$, the count of edges in a rectangle's length-plus-width, not the four edges of a square.\n* Choice C ($88$): this repeats the perimeter instead of one edge.\n* Choice D ($484$): this squares $22$, producing the napkin's area in square centimeters rather than a length.\n\n**Test Day Takeaway:** Read the unit the question asks for — centimeters means a length, square centimeters means an area.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-274",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Square $A$ has a perimeter of $60$ centimeters. Square $B$ has an area equal to $\\frac{1}{4}$ of the area of square $A$. What is the perimeter, in centimeters, of square $B$?",
    choices: [
      // distractor: applies the area ratio to the perimeter
      { id: "A", text: "$15$" },
      { id: "B", text: "$30$" },
      // distractor: reports the area of square B
      { id: "C", text: "$56.25$" },
      // distractor: doubles instead of halving
      { id: "D", text: "$120$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Square Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Areas in the ratio $1 : 4$ mean sides in the ratio $1 : 2$, so square $B$'s perimeter is half of $60$, or $30$ centimeters.\n\n**The Full Solution:**\nStep 1: Square $A$ has side $\\frac{60}{4} = 15$ centimeters and area $15^2 = 225$ square centimeters.\nStep 2: Square $B$ has area $\\frac{225}{4} = 56.25$, so its side is $\\sqrt{56.25} = 7.5$ centimeters.\nStep 3: Its perimeter is $4(7.5) = 30$ centimeters. Check: halving every side halves the perimeter and quarters the area, exactly as described.\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): divides the perimeter by $4$, applying the area ratio directly to the perimeter.\n* Choice C ($56.25$): reports the area of square $B$ instead of its perimeter.\n* Choice D ($120$): doubles the perimeter instead of halving it.\n\n**Test Day Takeaway:** Lengths scale by $k$ and areas scale by $k^2$. A quarter of the area means half the side and half the perimeter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "square-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // === TIER 1 BANK GROWTH (2026-05-21): geometry patterns @ 4 items → @ 10 items ===

  // --- arc-length (4 → 10) ---
  {
    id: "bank-geo-275",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A circular running track has a radius of $15$ meters. A runner travels along the track through a central angle of $72°$, as shown. How many meters does the runner travel?",
    diagram: { type: "circleWithSector", params: { centralAngle: 72, angleLabel: "72°", radius: 15, labelCenter: "O", showRadiusLabel: true, figureNote: true } },
    choices: [
      // distractor: uses pi r for the circumference
      { id: "A", text: "$3\\pi$" },
      { id: "B", text: "$6\\pi$" },
      // distractor: gives the full circumference
      { id: "C", text: "$30\\pi$" },
      // distractor: gives the sector area
      { id: "D", text: "$45\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** $72^\\circ$ is $\\frac{1}{5}$ of a turn, and the full circumference is $30\\pi$, so the arc is $\\frac{1}{5}(30\\pi) = 6\\pi$ meters.\n\n**The Full Solution:**\nStep 1: The circumference of the track is $C = 2\\pi r = 2\\pi(15) = 30\\pi$ meters.\nStep 2: The runner covers $\\frac{72}{360} = \\frac{1}{5}$ of the circle.\nStep 3: Arc length $= \\frac{1}{5}(30\\pi) = 6\\pi$ meters. Check: five such runs would complete one lap, and $5(6\\pi) = 30\\pi$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($3\\pi$): uses $C = \\pi r$ instead of $2\\pi r$, halving the answer.\n* Choice C ($30\\pi$): reports the whole circumference, ignoring the $72^\\circ$ restriction.\n* Choice D ($45\\pi$): computes the sector's area $\\frac{1}{5}\\pi(15)^2$, which is an area, not a distance.\n\n**Test Day Takeaway:** Arc length uses the circumference $2\\pi r$; sector area uses $\\pi r^2$. The same fraction multiplies both.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-276",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A school library added a quarter-round reading bench whose curved face is arc $AB$ in the figure below. Distances are in feet. How long is the curved face?",
    diagram: { type: "circleWithSector", params: { centralAngle: 90, angleLabel: "90°", radius: 14, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
    choices: [
      // distractor: uses pi r instead of 2 pi r, halving the arc to 3.5 pi
      { id: "A", text: "$3.5\\pi$" },
      { id: "B", text: "$7\\pi$" },
      // distractor: gives half the circumference, the arc of a semicircle
      { id: "C", text: "$14\\pi$" },
      // distractor: gives the full circumference 2 pi (14) = 28 pi
      { id: "D", text: "$28\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** A $90°$ arc is one quarter of the circumference $28\\pi$, which is $7\\pi$ feet.\n\n**The Full Solution:**\n\nStep 1: Find the circumference. $C=2\\pi(14)=28\\pi$ feet.\n\nStep 2: Convert the angle. $\\frac{90}{360}=\\frac{1}{4}$ of the circle.\n\nStep 3: Multiply. Arc $AB=\\frac{1}{4}(28\\pi)=7\\pi$ feet, about $22$ feet.\n\nCheck: four quarter-arcs rebuild the circle, and $4(7\\pi)=28\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($3.5\\pi$): uses $\\pi r$ rather than $2\\pi r$ for the circumference.\n* Choice C ($14\\pi$): gives half the circumference, the arc of a semicircle rather than a quarter circle.\n* Choice D ($28\\pi$): reports the whole circumference.\n\n**Test Day Takeaway:** A quarter circle is exactly one fourth of $2\\pi r$; write the circumference first, then scale it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-277",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "One side of a shoe shop's display platform bows outward as arc $AB$ in the figure below, marked in inches. Find the length of that curved side.",
    diagram: { type: "circleWithSector", params: { centralAngle: 120, angleLabel: "120°", radius: 21, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
    choices: [
      { id: "A", text: "$14\\pi$" },
      // distractor: divides the central angle by 180 instead of 360, giving 28 pi
      { id: "B", text: "$28\\pi$" },
      // distractor: reports the full circumference 2 pi (21) = 42 pi
      { id: "C", text: "$42\\pi$" },
      // distractor: computes the sector's area, (1/3) pi (21 squared) = 147 pi
      { id: "D", text: "$147\\pi$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** $\\frac{120}{360}=\\frac{1}{3}$, and one third of the circumference $42\\pi$ is $14\\pi$ inches.\n\n**The Full Solution:**\n\nStep 1: Find the circumference. $C=2\\pi(21)=42\\pi$ inches.\n\nStep 2: Convert the central angle to a fraction. $\\frac{120}{360}=\\frac{1}{3}$.\n\nStep 3: Multiply. Arc $AB=\\frac{1}{3}(42\\pi)=14\\pi$ inches.\n\nCheck: three $120°$ arcs complete the circle, and $3(14\\pi)=42\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($28\\pi$): divides the central angle by $180$ instead of $360$, doubling the arc.\n* Choice C ($42\\pi$): reports the full circumference rather than the $120°$ portion.\n* Choice D ($147\\pi$): computes the sector's area, $\\frac{1}{3}\\pi(21)^{2}$, instead of the arc length.\n\n**Test Day Takeaway:** Reduce the angle fraction first — $\\frac{120}{360}=\\frac{1}{3}$ turns the whole computation into one division.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-278",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A solar tracker rotates a panel, and its outer corner traces arc $AB$ in the figure below, marked in feet. How far does the corner travel?",
    diagram: { type: "circleWithSector", params: { centralAngle: 150, angleLabel: "5π/6", radius: 12, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
    choices: [
      // distractor: applies the sector-area coefficient one half to the arc, giving 5 pi
      { id: "A", text: "$5\\pi$" },
      { id: "B", text: "$10\\pi$" },
      // distractor: uses the diameter 24 in place of the radius, giving 20 pi
      { id: "C", text: "$20\\pi$" },
      // distractor: computes the sector's area, one half r squared theta = 60 pi
      { id: "D", text: "$60\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** With the angle already in radians, arc $=r\\theta=12\\cdot\\frac{5\\pi}{6}=10\\pi$ feet.\n\n**The Full Solution:**\n\nStep 1: Recognize the angle's units. The label $\\frac{5\\pi}{6}$ is a radian measure, equal to $150°$.\n\nStep 2: Apply the radian arc formula. Arc length $=r\\theta$ when $\\theta$ is in radians.\n\nStep 3: Substitute. $12\\cdot\\frac{5\\pi}{6}=\\frac{60\\pi}{6}=10\\pi$ feet.\n\nCheck: in degrees, $\\frac{150}{360}(2\\pi\\cdot12)=\\frac{5}{12}(24\\pi)=10\\pi$, the same value.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($5\\pi$): applies the sector-area coefficient $\\frac{1}{2}$ to the arc formula.\n* Choice C ($20\\pi$): uses the diameter $24$ in place of the radius in $r\\theta$.\n* Choice D ($60\\pi$): computes the sector's area, $\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}(144)\\left(\\frac{5\\pi}{6}\\right)$.\n\n**Test Day Takeaway:** A central angle written with $\\pi$ is in radians, and then arc length is simply $r\\theta$ — no $360$ anywhere.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-279",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A garden center lays a curved paver border along arc $AB$ of the circle drawn below, and the border measures $14\\pi$ feet. What is the radius, in feet, of that circle?",
    diagram: { type: "circleWithSector", params: { centralAngle: 40, angleLabel: "40°", labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
    choices: [
      // distractor: treats the arc as the whole circumference, solving 2 pi r = 14 pi
      { id: "A", text: "$7$" },
      // distractor: divides the central angle by 180 instead of 360, giving r = 31.5
      { id: "B", text: "$31.5$" },
      { id: "C", text: "$63$" },
      // distractor: uses pi r instead of 2 pi r, which produces the diameter 126
      { id: "D", text: "$126$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** A $40°$ arc is $\\frac{1}{9}$ of the circle, so the circumference is $9(14\\pi)=126\\pi$ and $r=63$ feet.\n\n**The Full Solution:**\n\nStep 1: Convert the angle. $\\frac{40}{360}=\\frac{1}{9}$ of the full circle.\n\nStep 2: Recover the circumference. If $\\frac{1}{9}C=14\\pi$, then $C=126\\pi$ feet.\n\nStep 3: Solve for the radius. $2\\pi r=126\\pi$ gives $r=63$ feet.\n\nCheck: $\\frac{40}{360}\\left(2\\pi\\cdot63\\right)=\\frac{1}{9}(126\\pi)=14\\pi$, the border length.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($7$): treats the arc as the entire circumference, solving $2\\pi r=14\\pi$.\n* Choice B ($31.5$): divides the central angle by $180$ instead of $360$, halving the radius.\n* Choice D ($126$): uses $\\pi r$ in place of $2\\pi r$, which produces the diameter rather than the radius.\n\n**Test Day Takeaway:** Running the arc-length proportion backwards recovers the circumference first; only then divide by $2\\pi$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-280",
    domain: "geometry",
    skills: ["arc-length"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In the circle with center $O$ shown, sector $AOB$ has a central angle of $\\dfrac{5\\pi}{6}$ radians and an arc length of $35\\pi$ centimeters. What is the area, in square centimeters, of sector $AOB$?",
    diagram: { type: "circleWithSector", params: { centralAngle: 150, angleLabel: "5π/6", labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
    choices: [
      // distractor: uses half r theta as the area
      { id: "A", text: "$17.5\\pi$" },
      { id: "B", text: "$735\\pi$" },
      // distractor: omits the one-half
      { id: "C", text: "$1470\\pi$" },
      // distractor: gives the whole circle's area
      { id: "D", text: "$1764\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Arc Length**\n\n**Choice B is correct.**\n\n**The Fast Way (~45s):** $r = \\frac{s}{\\theta} = \\frac{35\\pi}{5\\pi/6} = 42$, and sector area $= \\frac{1}{2}rs = \\frac{1}{2}(42)(35\\pi) = 735\\pi$.\n\n**The Full Solution:**\nStep 1: For a radian angle, $s = r\\theta$. Solve for the radius: $r = \\frac{35\\pi}{\\frac{5\\pi}{6}} = 35\\pi \\cdot \\frac{6}{5\\pi} = 42$ centimeters.\nStep 2: The area of a sector with a radian angle is $A = \\frac{1}{2}r^2\\theta$, which is the same as $\\frac{1}{2}rs$.\nStep 3: $A = \\frac{1}{2}(42)^2\\left(\\frac{5\\pi}{6}\\right) = \\frac{1}{2}(1764)\\left(\\frac{5\\pi}{6}\\right) = 735\\pi$ square centimeters. Check: $\\frac{5\\pi}{6}$ is $\\frac{5}{12}$ of a full turn, and $\\frac{5}{12}$ of the circle's area $1764\\pi$ is $735\\pi$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($17.5\\pi$): computes $\\frac{1}{2}r\\theta$, using the angle where the arc length belongs.\n* Choice C ($1470\\pi$): uses $r^2\\theta$ without the factor $\\frac{1}{2}$.\n* Choice D ($1764\\pi$): reports $\\pi r^2$, the area of the entire circle rather than the sector.\n\n**Test Day Takeaway:** Arc length recovers the radius; the radius unlocks the area. Keep the two radian formulas paired: $s = r\\theta$ and $A = \\frac{1}{2}r^2\\theta$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "arc-length",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- circle-in-general-form (4 → 10) ---
  {
    id: "bank-geo-281",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "On a mall's planning grid, marked in feet, a proposed kiosk boundary is drawn from $x^{2}+y^{2}+6x-2y+t=0$, where $t$ is a constant. For what value of $t$ does that graph consist of exactly one point?",
    choices: [
      // distractor: solves 9 + 1 + t = 0, slipping the sign of the constant
      { id: "A", text: "$-10$" },
      // distractor: squares half the y-coefficient only, ignoring the x terms
      { id: "B", text: "$1$" },
      // distractor: squares half the x-coefficient only, ignoring the y terms
      { id: "C", text: "$9$" },
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** The graph is a single point when $r^{2}=0$, and $r^{2}=9+1-t$, so $t=10$.\n\n**The Full Solution:**\n\nStep 1: Complete both squares. $x^{2}+6x$ contributes $9$ and $y^{2}-2y$ contributes $1$, giving $(x+3)^{2}+(y-1)^{2}=9+1-t$.\n\nStep 2: Interpret the degenerate case. A sum of two squares equals zero only at the single point where both are zero, so the graph is one point exactly when $9+1-t=0$.\n\nStep 3: Solve. $t=10$.\n\nCheck: with $t=10$ the equation is $(x+3)^{2}+(y-1)^{2}=0$, satisfied only by $(-3,1)$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-10$): solves $9+1+t=0$, slipping the sign of the constant when moving it across.\n* Choice B ($1$): squares half the $y$-coefficient only and ignores the $x$ terms.\n* Choice C ($9$): squares half the $x$-coefficient only and ignores the $y$ terms.\n\n**Test Day Takeaway:** A general-form equation degenerates to one point when the completed right side hits zero, and has no graph at all once it goes negative.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-282",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "On a solar farm's site grid, marked in hundreds of meters, the glare-exclusion boundary $x^{2}+y^{2}-4x+14y+m=0$ passes through $(6,-7)$. Find the value of $m$.",
    choices: [
      // distractor: solves for m with the sign reversed, reporting -37
      { id: "A", text: "$-37$" },
      // distractor: drops the -4x term when substituting, solving 36 + 49 - 98 + m = 0
      { id: "B", text: "$13$" },
      // distractor: reports r squared = 16 instead of the constant m
      { id: "C", text: "$16$" },
      { id: "D", text: "$37$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~45s):** Substituting $(6,-7)$ gives $36+49-24-98+m=0$, so $m=37$.\n\n**The Full Solution:**\n\nStep 1: Substitute the point. $6^{2}+(-7)^{2}-4(6)+14(-7)+m=0$.\n\nStep 2: Evaluate each term. $36+49-24-98+m=0$, which simplifies to $-37+m=0$.\n\nStep 3: Solve. $m=37$.\n\nCheck: with $m=37$ the circle is $(x-2)^{2}+(y+7)^{2}=4+49-37=16$, center $(2,-7)$ and radius $4$; the point $(6,-7)$ is exactly $4$ units from that center.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-37$): solves for $m$ with the sign reversed after collecting the numeric terms.\n* Choice B ($13$): drops the $-4x$ term while substituting, solving $36+49-98+m=0$.\n* Choice C ($16$): reports $r^{2}=16$ instead of the constant $m$ the question asks for.\n\n**Test Day Takeaway:** A point on a circle satisfies its equation — substitute the coordinates and the unknown constant falls out in one line.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-283",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "City engineers model the rim of a stormwater basin in the $xy$-plane by $x^2 + y^2 + Dx + Ey + F = 0$, where the table gives the constants and coordinates are in meters. What are the coordinates $(x, y)$ of the basin's center?",
    questionTable: { headers: ["Constant", "Value"], rows: [["$D$", "$-18$"], ["$E$", "$24$"], ["$F$", "$56$"]] },
    choices: [
      // distractor: halves D and E but does not negate them, giving (-9, 12)
      { id: "A", text: "$(-9, 12)$" },
      // distractor: negates D but not E, giving (9, 12)
      { id: "B", text: "$(9, 12)$" },
      // distractor: negates D and E but forgets to halve them, giving (18, -24)
      { id: "C", text: "$(18, -24)$" },
      { id: "D", text: "$(9, -12)$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~20s):** For $x^2 + y^2 + Dx + Ey + F = 0$ the center is $\\left(-\\frac{D}{2}, -\\frac{E}{2}\\right)$, so the center is $\\left(-\\frac{-18}{2}, -\\frac{24}{2}\\right) = (9, -12)$.\n\n**The Full Solution:**\nStep 1: Substitute the table values: $x^2 + y^2 - 18x + 24y + 56 = 0$.\nStep 2: Complete the square in each variable. $x^2 - 18x = (x - 9)^2 - 81$ and $y^2 + 24y = (y + 12)^2 - 144$, so the equation becomes $(x - 9)^2 + (y + 12)^2 = 81 + 144 - 56 = 169$.\nStep 3: Standard form $(x - h)^2 + (y - k)^2 = r^2$ gives center $(9, -12)$ and radius $13$; the rim point $(22, -12)$ sits $13$ meters from that center, and substituting it into the original equation gives $484 + 144 - 396 - 288 + 56 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-9, 12)$): halves $D$ and $E$ but skips the sign change, reporting $\\left(\\frac{D}{2}, \\frac{E}{2}\\right)$.\n* Choice B ($(9, 12)$): negates $D$ but leaves $E$ positive, so the $y$-coordinate keeps the wrong sign.\n* Choice C ($(18, -24)$): negates both coefficients but forgets the factor of $\\frac{1}{2}$, giving $(-D, -E)$.\n\n**Test Day Takeaway:** In general form the center is half the linear coefficients with both signs flipped — halve first, then negate, and check by substituting the point back in.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-284",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The rims of two adjacent calderas are modeled in the $xy$-plane by the equations in the table, where coordinates are in kilometers. How far apart, in kilometers, are the centers of the two rims?",
    questionTable: { headers: ["Caldera", "Equation of the rim"], rows: [["$A$", "$x^2 + y^2 - 8x + 6y + 16 = 0$"], ["$B$", "$x^2 + y^2 + 8x - 6y + 21 = 0$"]] },
    choices: [
      // distractor: reports caldera B's radius, 2, instead of the distance between centers
      { id: "A", text: "$2$" },
      // distractor: adds the two radii, 3 + 2 = 5
      { id: "B", text: "$5$" },
      // distractor: uses only the difference of the x-coordinates, 4 - (-4) = 8
      { id: "C", text: "$8$" },
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The centers are $\\left(-\\frac{D}{2}, -\\frac{E}{2}\\right)$: caldera $A$ is centered at $(4, -3)$ and caldera $B$ at $(-4, 3)$, so the separation is $\\sqrt{8^2 + 6^2} = 10$.\n\n**The Full Solution:**\nStep 1: Complete the square for caldera $A$: $(x - 4)^2 + (y + 3)^2 = 16 + 9 - 16 = 9$, so its center is $(4, -3)$.\nStep 2: Complete the square for caldera $B$: $(x + 4)^2 + (y - 3)^2 = 16 + 9 - 21 = 4$, so its center is $(-4, 3)$.\nStep 3: Apply the distance formula: $\\sqrt{(4 - (-4))^2 + (-3 - 3)^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$. The radii are $3$ and $2$, and $3 + 2 = 5 < 10$, so the rims do not overlap ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): reads off caldera $B$'s radius, $\\sqrt{4} = 2$, rather than the distance between the centers.\n* Choice B ($5$): adds the two radii, $3 + 2$, instead of measuring from center to center.\n* Choice C ($8$): uses only the horizontal separation, $4 - (-4) = 8$, ignoring the $6$-kilometer vertical offset.\n\n**Test Day Takeaway:** Two general-form circles become comparable only after both are completed to standard form; get both centers first, then use the distance formula.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-285",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The circular stage of a bandshell is modeled in the $xy$-plane by $x^2 + y^2 - 12x + 16y + 51 = 0$, with units in meters, and triangular riser $ABC$ has $\\overline{AB}$ as a diameter of the stage. What is the length, in meters, of $\\overline{AB}$?",
    diagram: { type: "circleWithInscribedTriangle", params: { labels: { A: "A", B: "B", C: "C", O: "O" }, angleAtA: "35°", angleAtAValue: 35, showDiameter: true, showCenter: true, showRightAngleAtC: true } },
    choices: [
      // distractor: reports the radius 7 instead of the diameter
      { id: "A", text: "$7$" },
      { id: "B", text: "$14$" },
      // distractor: doubles the diameter, reporting 28
      { id: "C", text: "$28$" },
      // distractor: reports r squared, 49, instead of taking the square root
      { id: "D", text: "$49$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** Completing the square gives $(x - 6)^2 + (y + 8)^2 = 36 + 64 - 51 = 49$, so $r = 7$ and the diameter $\\overline{AB}$ is $14$.\n\n**The Full Solution:**\nStep 1: Group and complete the square: $x^2 - 12x = (x - 6)^2 - 36$ and $y^2 + 16y = (y + 8)^2 - 64$.\nStep 2: The equation becomes $(x - 6)^2 + (y + 8)^2 = 36 + 64 - 51 = 49$, so the stage has center $(6, -8)$ and radius $\\sqrt{49} = 7$ meters.\nStep 3: $\\overline{AB}$ is a diameter, so its length is $2r = 14$ meters; the point $(13, -8)$ on the stage is exactly $7$ meters from the center ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): stops at the radius; the segment asked about spans the whole stage.\n* Choice C ($28$): doubles the diameter, applying the factor of $2$ twice.\n* Choice D ($49$): reports $r^2$ straight from the right side without taking the square root.\n\n**Test Day Takeaway:** After completing the square the right side is $r^2$, never $r$ — and a diameter is twice that square root.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-286",
    domain: "geometry",
    skills: ["circle-equation", "completing-square-circles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A tsunami buoy drifts along the curve $x^2 + y^2 - 16x + 2cy + 39 = 0$ for some positive constant $c$, with $x$ and $y$ measured in kilometers east and north of a seafloor anchor. The figure shows this curve and its radius. What is $c$?",
    diagram: { type: "circleWithSector", params: { centralAngle: 55, showAngleLabel: false, showAngleArc: false, radius: "13", showRadiusLabel: true, labelCenter: "O", labelPoint1: "P", labelPoint2: "Q" } },
    choices: [
      // distractor: treats the center as (8, -2c), solving 4c squared + 25 = 169 to get c = 6
      { id: "A", text: "$6$" },
      { id: "B", text: "$12$" },
      // distractor: reports 2c, the coefficient printed in the equation, instead of c
      { id: "C", text: "$24$" },
      // distractor: stops at c squared = 144 without taking the square root
      { id: "D", text: "$144$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle in General Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Completing the square gives $r^2 = 8^2 + c^2 - 39 = c^2 + 25$. Setting $c^2 + 25 = 13^2$ gives $c^2 = 144$, so $c = 12$.\n\n**The Full Solution:**\nStep 1: Complete the square: $x^2 - 16x = (x - 8)^2 - 64$ and $y^2 + 2cy = (y + c)^2 - c^2$, so the curve is $(x - 8)^2 + (y + c)^2 = 64 + c^2 - 39$.\nStep 2: The figure gives the radius as $13$ kilometers, so $c^2 + 25 = 169$ and $c^2 = 144$.\nStep 3: Since $c$ is positive, $c = 12$. Check: with $c = 12$ the curve is $(x - 8)^2 + (y + 12)^2 = 64 + 144 - 39 = 169$, a circle of radius $13$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): never halves the linear coefficient, treating the center as $(8, -2c)$ and solving $4c^2 + 25 = 169$.\n* Choice C ($24$): reports $2c$, the number that appears in the equation, rather than $c$ itself.\n* Choice D ($144$): stops at $c^2$ and never takes the square root.\n\n**Test Day Takeaway:** When a linear coefficient carries a letter, halve it before squaring — $2cy$ contributes $c^2$, not $4c^2$, to the radius.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-general-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- circle-in-standard-form (4 → 10) ---
  {
    id: "bank-geo-287",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A cul-de-sac curb is modeled in the $xy$-plane by $(x - 3)^2 + (y + 4)^2 = 25$, where $x$ and $y$ are in meters, and the table lists four utility covers. Which cover lies on the curb?",
    questionTable: { headers: ["Utility cover", "Coordinates"], rows: [["$W$", "$(3, 1)$"], ["$X$", "$(10, 20)$"], ["$Y$", "$(3, -4)$"], ["$Z$", "$(1, 7)$"]] },
    choices: [
      { id: "A", text: "$W$" },
      // distractor: treats 25 as the radius, so it looks for the cover 25 meters from the center
      { id: "B", text: "$X$" },
      // distractor: picks the center of the curb rather than a point on it
      { id: "C", text: "$Y$" },
      // distractor: flips the signs of the center's coordinates to (-3, 4) before testing
      { id: "D", text: "$Z$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The curb is centered at $(3, -4)$ with $r^2 = 25$; cover $W$ at $(3, 1)$ gives $0 + 25 = 25$, so it sits on the curb.\n\n**The Full Solution:**\nStep 1: Read the center and radius: $(h, k) = (3, -4)$ and $r = \\sqrt{25} = 5$ meters.\nStep 2: A point is on the curb exactly when $(x - 3)^2 + (y + 4)^2 = 25$. Test $W(3, 1)$: $(3 - 3)^2 + (1 + 4)^2 = 0 + 25 = 25$ ✓\nStep 3: The others miss: $X(10, 20)$ gives $49 + 576 = 625$, $Y(3, -4)$ gives $0$, and $Z(1, 7)$ gives $4 + 121 = 125$. Only $W$ is exactly $5$ meters from the center ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($X$): sits $25$ meters from the center, which is what you get by treating the right side as $r$ instead of $r^2$.\n* Choice C ($Y$): is the center itself, a distance of $0$ from the center rather than $5$.\n* Choice D ($Z$): satisfies $(x + 3)^2 + (y - 4)^2 = 25$, the equation you get by flipping the center's signs.\n\n**Test Day Takeaway:** Testing membership is one substitution — but the right side is $r^2$, so compare with $25$, not with $5$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-288",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The floor of a circular reverb chamber is modeled in the $xy$-plane by $(x - 2)^2 + (y - 11)^2 = 144$, where $x$ and $y$ are in meters, and the figure shows the floor with center $O$ and radius $r$. What is the value of $r$?",
    diagram: { type: "circleWithSector", params: { centralAngle: 70, showAngleLabel: false, showAngleArc: false, radius: "r", showRadiusLabel: true, labelCenter: "O", labelPoint1: "P", labelPoint2: "Q" } },
    choices: [
      // distractor: halves the radius, treating 12 as a diameter
      { id: "A", text: "$6$" },
      { id: "B", text: "$12$" },
      // distractor: reports the diameter, 2 times 12
      { id: "C", text: "$24$" },
      // distractor: reports r squared without taking the square root
      { id: "D", text: "$144$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** The right side of standard form is $r^2$, so $r = \\sqrt{144} = 12$ meters.\n\n**The Full Solution:**\nStep 1: Compare $(x - 2)^2 + (y - 11)^2 = 144$ with $(x - h)^2 + (y - k)^2 = r^2$.\nStep 2: The center is $O = (2, 11)$ and $r^2 = 144$.\nStep 3: Take the positive square root: $r = 12$ meters. Check: the point $(14, 11)$ satisfies $144 + 0 = 144$ and lies $12$ meters from $O$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): halves $12$, as if the equation had given a diameter.\n* Choice C ($24$): doubles the radius, reporting the diameter instead.\n* Choice D ($144$): copies $r^2$ off the right side without taking a square root.\n\n**Test Day Takeaway:** The lone number on the right of standard form is always $r^2$ — one square root separates it from the radius.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-289",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An atoll lagoon's shoreline is modeled in the $xy$-plane by $(x + 4)^2 + (y - 3)^2 = 169$, with coordinates in kilometers, and the figure plots the shoreline's center together with a survey marker on the shoreline. What is the horizontal distance, in kilometers, between them?",
    diagram: { type: "coordinatePoints", params: { points: [[-4, 3], [8, 8]], xMin: -6, xMax: 10, yMin: -2, yMax: 10 } },
    choices: [
      // distractor: reports the vertical distance, 8 - 3 = 5
      { id: "A", text: "$5$" },
      { id: "B", text: "$12$" },
      // distractor: reports the straight-line distance, which is the radius 13
      { id: "C", text: "$13$" },
      // distractor: adds the horizontal and vertical distances, 12 + 5
      { id: "D", text: "$17$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The center is $(-4, 3)$ and the plotted marker is $(8, 8)$, so the horizontal gap is $8 - (-4) = 12$ kilometers.\n\n**The Full Solution:**\nStep 1: Standard form gives center $(-4, 3)$ and $r = \\sqrt{169} = 13$ kilometers, so the lower-left plotted point is the center.\nStep 2: Read the other plotted point from the grid: $(8, 8)$. It is on the shoreline because $(8 + 4)^2 + (8 - 3)^2 = 144 + 25 = 169$ ✓\nStep 3: Horizontal distance means the difference in $x$-coordinates: $8 - (-4) = 12$ kilometers.\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): gives the vertical difference $8 - 3$ instead of the horizontal one.\n* Choice C ($13$): gives the straight-line distance, which is the radius, not the horizontal offset.\n* Choice D ($17$): adds the horizontal and vertical gaps, $12 + 5$, instead of reporting just one.\n\n**Test Day Takeaway:** Standard form hands you the center for free; read the second point off the grid and subtract only the coordinate the question names.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-290",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The table gives the endpoints of a diameter of the circular catwalk around a water tower, where coordinates are in meters. Which equation models the catwalk in the $xy$-plane?",
    diagram: { type: "dataTable", params: { headers: ["Endpoint", "x (meters)", "y (meters)"], rows: [["P", "-5", "4"], ["Q", "7", "-12"]] } },
    choices: [
      // distractor: flips the signs of the center's coordinates, centering the circle at (-1, 4)
      { id: "A", text: "$(x + 1)^2 + (y - 4)^2 = 100$" },
      // distractor: uses the diameter 20 as the radius, so the right side becomes 400
      { id: "B", text: "$(x - 1)^2 + (y + 4)^2 = 400$" },
      // distractor: adds the endpoint coordinates without halving, centering the circle at (2, -8)
      { id: "C", text: "$(x - 2)^2 + (y + 8)^2 = 100$" },
      { id: "D", text: "$(x - 1)^2 + (y + 4)^2 = 100$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The center is the midpoint $\\left(\\frac{-5 + 7}{2}, \\frac{4 - 12}{2}\\right) = (1, -4)$, and the diameter is $\\sqrt{12^2 + 16^2} = 20$, so $r = 10$ and $r^2 = 100$.\n\n**The Full Solution:**\nStep 1: The center of a circle is the midpoint of any diameter: $(1, -4)$.\nStep 2: The diameter's length is $\\sqrt{(7 - (-5))^2 + (-12 - 4)^2} = \\sqrt{144 + 256} = \\sqrt{400} = 20$ meters, so $r = 10$ meters.\nStep 3: Standard form gives $(x - 1)^2 + (y + 4)^2 = 100$. Check: substituting $P(-5, 4)$ gives $36 + 64 = 100$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: writes $(x + 1)^2 + (y - 4)^2$, which centers the catwalk at $(-1, 4)$ instead of $(1, -4)$.\n* Choice B: keeps the diameter $20$ as the radius, so the right side is $400$ rather than $100$.\n* Choice C: adds the endpoint coordinates without dividing by $2$, placing the center at $(2, -8)$.\n\n**Test Day Takeaway:** Endpoints of a diameter give the center by midpoint and the radius by half the distance — halve before squaring.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-291",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Volcanologists model the outer edge of an ash-fall ring by $(x - 16)^2 + (y + 12)^2 = 900$, where $x$ and $y$ are kilometers east and north of a vent at the origin. What is the shortest distance, in kilometers, from the vent to the outer edge?",
    choices: [
      { id: "A", text: "$10$" },
      // distractor: reports the distance from the vent to the ring's center, 20
      { id: "B", text: "$20$" },
      // distractor: reports the ring's radius, 30
      { id: "C", text: "$30$" },
      // distractor: adds the radius to the center distance, giving the greatest distance 50
      { id: "D", text: "$50$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice A is correct.**\n\n**The Fast Way (~30s):** The vent is $\\sqrt{16^2 + 12^2} = 20$ kilometers from the center and the radius is $30$, so the vent is inside and the nearest edge point is $30 - 20 = 10$ kilometers away.\n\n**The Full Solution:**\nStep 1: Standard form gives center $(16, -12)$ and $r = \\sqrt{900} = 30$ kilometers.\nStep 2: The vent at the origin is $\\sqrt{256 + 144} = \\sqrt{400} = 20$ kilometers from the center, and $20 < 30$, so the vent lies inside the ring.\nStep 3: From an interior point the nearest edge point is $r$ minus the center distance: $30 - 20 = 10$ kilometers. Check: heading away from the center from the origin reaches the edge at $10$ kilometers and heading toward it reaches the far edge at $50$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($20$): stops at the distance from the vent to the center of the ring.\n* Choice C ($30$): reports the radius, which measures from the center, not from the vent.\n* Choice D ($50$): adds instead of subtracting, giving the greatest distance rather than the shortest.\n\n**Test Day Takeaway:** Compare the center distance with the radius first: inside means nearest $= r - d$, farthest $= r + d$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-292",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Sound from a stage monitor reaches every point of the region $(x - 6)^2 + (y + 15)^2 \\le k$ in the $xy$-plane, for some positive constant $k$, with distances measured in meters. The region meets the balcony rail, which lies along the line $y = -7$, at exactly one point. What is the value of $k$?",
    choices: [
      // distractor: reports the coverage radius 8 instead of k, which equals r squared
      { id: "A", text: "$8$" },
      // distractor: reports the diameter, 2 times 8, instead of squaring the radius
      { id: "B", text: "$16$" },
      { id: "C", text: "$64$" },
      // distractor: measures from the center down to the x-axis and uses 15 as the radius instead of the 8-meter gap up to the rail
      { id: "D", text: "$225$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Circle in Standard Form**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** One point of contact with the horizontal rail puts the rail at the top of the region, so the radius is $-7 - (-15) = 8$ and $k = 8^2 = 64$.\n\n**The Full Solution:**\nStep 1: The boundary of the region is the circle $(x - 6)^2 + (y + 15)^2 = k$, centered at $(6, -15)$ with radius $\\sqrt{k}$.\nStep 2: A horizontal line meets a circle exactly once only at the circle's top or bottom point, so the rail sits one radius above the center: $\\sqrt{k} = -7 - (-15) = 8$ meters.\nStep 3: Square both sides: $k = 64$. Check: with $k = 64$, setting $y = -7$ leaves $(x - 6)^2 = 0$, so $x = 6$ is the only solution — exactly one point of contact ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): reports the coverage radius; the constant $k$ sits where $r^2$ belongs.\n* Choice B ($16$): doubles the radius into a diameter instead of squaring it.\n* Choice D ($225$): measures from the center to the $x$-axis and treats $15$ as the radius, ignoring that the rail is only $8$ meters above the center.\n\n**Test Day Takeaway:** Touching a horizontal line at exactly one point means that line is one radius above or below the center — read the gap, then square it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- cylinder-volume (4 → 10) ---
  {
    id: "bank-geo-293",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "An organ pipe is a cylinder holding a column of air. If the pipe's radius is doubled and its height is unchanged, which statement describes the effect on the volume of the air column?",
    choices: [
      // distractor: uses the scale factor 2 without squaring it
      { id: "A", text: "It is multiplied by $2$." },
      { id: "B", text: "It is multiplied by $4$." },
      // distractor: cubes the factor, as if all three dimensions had doubled
      { id: "C", text: "It is multiplied by $8$." },
      // distractor: squares the factor twice, giving 2 to the fourth power
      { id: "D", text: "It is multiplied by $16$." }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** In $\\pi r^2 h$ the radius is squared, so doubling it multiplies the volume by $2^2 = 4$.\n\n**The Full Solution:**\nStep 1: The original air column has volume $V = \\pi r^2 h$.\nStep 2: Replacing $r$ with $2r$ gives $\\pi(2r)^2 h = \\pi \\cdot 4r^2 \\cdot h$.\nStep 3: That is $4V$, so the volume is multiplied by $4$. Check: a pipe with $r = 1$, $h = 10$ holds $10\\pi$; with $r = 2$, $h = 10$ it holds $40\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: applies the factor $2$ directly, ignoring the square on the radius.\n* Choice C: uses $2^3$, which would apply if the height had doubled as well as both cross-sectional dimensions.\n* Choice D: squares $4$ instead of squaring $2$.\n\n**Test Day Takeaway:** A linear factor on a squared variable enters squared — doubling a radius quadruples a cylinder's volume.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-294",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A cylindrical concrete bollard is $10$ centimeters across at its base and rises $90$ centimeters above the sidewalk. How many cubic centimeters of concrete does it contain?",
    choices: [
      // distractor: multiplies the radius by the height without squaring, 5 times 90
      { id: "A", text: "$450\\pi$" },
      // distractor: uses the curved surface formula 2 pi r h, 2 times 5 times 90
      { id: "B", text: "$900\\pi$" },
      { id: "C", text: "$2250\\pi$" },
      // distractor: uses the 10-centimeter width as the radius, 100 times 90
      { id: "D", text: "$9000\\pi$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** The radius is $5$ centimeters, so $V = \\pi(5)^2(90) = 2250\\pi$ cubic centimeters.\n\n**The Full Solution:**\nStep 1: \"Across\" gives the diameter, so the radius is $\\frac{10}{2} = 5$ centimeters and the height is $90$ centimeters.\nStep 2: Apply $V = \\pi r^2 h$: $V = \\pi(25)(90)$.\nStep 3: Multiply: $V = 2250\\pi$ cubic centimeters. Check: the base area is $25\\pi$ square centimeters, and stacking it $90$ centimeters high gives $2250\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($450\\pi$): multiplies $r$ by $h$ and forgets to square the radius.\n* Choice B ($900\\pi$): computes $2\\pi r h$, the curved surface area, instead of the volume.\n* Choice D ($9000\\pi$): treats the $10$-centimeter width as the radius, quadrupling the base area.\n\n**Test Day Takeaway:** Convert \"across\" to a radius first; $\\pi r^2 h$ punishes a diameter substitution by a factor of $4$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-295",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The stilling well of a tide gauge is a cylinder with an inside diameter of $24$ centimeters. When the water inside rises $15$ centimeters, by how many cubic centimeters does the volume of water increase?",
    choices: [
      // distractor: multiplies the radius by the rise without squaring, 12 times 15
      { id: "A", text: "$180\\pi$" },
      // distractor: applies the cone factor of one third, giving 144 times 15 divided by 3
      { id: "B", text: "$720\\pi$" },
      { id: "C", text: "$2160\\pi$" },
      // distractor: uses the 24-centimeter diameter as the radius, 576 times 15
      { id: "D", text: "$8640\\pi$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The radius is $12$ centimeters, so a $15$-centimeter rise adds $\\pi(144)(15) = 2160\\pi$ cubic centimeters.\n\n**The Full Solution:**\nStep 1: The inside diameter is $24$ centimeters, so the radius is $r = 12$ centimeters.\nStep 2: The added water is a cylinder of the same radius whose height is the $15$-centimeter rise.\nStep 3: Its volume is $\\pi(12)^2(15) = \\pi(144)(15) = 2160\\pi$ cubic centimeters. Check: the cross-section is $144\\pi$ square centimeters, and $144\\pi \\times 15 = 2160\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($180\\pi$): multiplies the radius by the rise without squaring the radius.\n* Choice B ($720\\pi$): divides by $3$, applying the cone formula to a cylinder of water.\n* Choice D ($8640\\pi$): uses the diameter as the radius, quadrupling the cross-section.\n\n**Test Day Takeaway:** A rise in a cylinder adds a cylinder — same radius, height equal to the rise.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-296",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Water in a community garden's cylindrical rain barrel stands $24$ inches deep and takes up $1{,}176\\pi$ cubic inches. What is the barrel's inside radius, in inches?",
    choices: [
      { id: "A", text: "$7$" },
      // distractor: reports the diameter, 2 times 7
      { id: "B", text: "$14$" },
      // distractor: divides 1176 by 2 times 24 instead of by 24, using a surface-area setup
      { id: "C", text: "$24.5$" },
      // distractor: stops at r squared = 49 without taking the square root
      { id: "D", text: "$49$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** From $\\pi r^2(24) = 1{,}176\\pi$, $r^2 = \\frac{1{,}176}{24} = 49$, so $r = 7$ inches.\n\n**The Full Solution:**\nStep 1: The water forms a cylinder of height $24$ inches and volume $1{,}176\\pi$ cubic inches, so $\\pi r^2(24) = 1{,}176\\pi$.\nStep 2: Divide both sides by $24\\pi$: $r^2 = 49$.\nStep 3: Take the positive square root: $r = 7$ inches. Check: $\\pi(49)(24) = 1{,}176\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($14$): reports the diameter after correctly finding the radius.\n* Choice C ($24.5$): divides by $2h = 48$ instead of by $h = 24$, a surface-area style setup.\n* Choice D ($49$): stops at $r^2$ and never takes the square root.\n\n**Test Day Takeaway:** Running $\\pi r^2 h$ backwards means dividing by $\\pi h$ and then taking a square root — two undo steps, not one.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-297",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "Two cylindrical bass-port tubes enclose equal volumes, and tube $A$ has twice the radius of tube $B$. Which statement about the lengths of the tubes must be true?",
    choices: [
      { id: "A", text: "Tube $A$ is one-fourth as long as tube $B$." },
      // distractor: scales the length by the radius factor 2 instead of its square
      { id: "B", text: "Tube $A$ is half as long as tube $B$." },
      // distractor: reverses the relationship, making the wider tube longer
      { id: "C", text: "Tube $A$ is twice as long as tube $B$." },
      // distractor: reverses the relationship and uses the squared factor
      { id: "D", text: "Tube $A$ is four times as long as tube $B$." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice A is correct.**\n\n**The Fast Way (~25s):** Equal volumes keep $r^2 L$ constant; doubling the radius multiplies $r^2$ by $4$, so the length must be divided by $4$.\n\n**The Full Solution:**\nStep 1: Let tube $B$ have radius $r$ and length $L_B$, so tube $A$ has radius $2r$ and length $L_A$.\nStep 2: Equal volumes give $\\pi(2r)^2 L_A = \\pi r^2 L_B$, that is $4r^2 L_A = r^2 L_B$.\nStep 3: Divide by $4r^2$: $L_A = \\frac{L_B}{4}$, so tube $A$ is one-fourth as long. Check: with $r = 1$ and $L_B = 8$, tube $B$ holds $8\\pi$ and tube $A$ has radius $2$ and length $2$, holding $8\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: divides the length by $2$, using the radius factor instead of its square.\n* Choice C: makes the wider tube longer, which would give it far more volume, not the same.\n* Choice D: uses the right factor of $4$ but in the wrong direction.\n\n**Test Day Takeaway:** With volume fixed, radius and length trade off through the SQUARE of the radius factor — and the wider shape is always the shorter one.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-298",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A subway ventilation shaft is a cylinder $40$ meters deep with a radius of $3$ meters, and a concrete lining $0.5$ meter thick is poured against the shaft wall for the full depth. What is the volume, in cubic meters, of the lining?",
    choices: [
      // distractor: squares the thickness, computing pi times 0.5 squared times 40
      { id: "A", text: "$10\\pi$" },
      { id: "B", text: "$110\\pi$" },
      // distractor: multiplies the curved surface 2 pi r h by the thickness
      { id: "C", text: "$120\\pi$" },
      // distractor: reports the volume of the entire shaft, pi times 9 times 40
      { id: "D", text: "$360\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Cylinder Volume**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** The lining is the difference of two cylinders: $\\pi(3^2 - 2.5^2)(40) = \\pi(2.75)(40) = 110\\pi$ cubic meters.\n\n**The Full Solution:**\nStep 1: The shaft wall has radius $3$ meters, and a $0.5$-meter lining poured against it leaves an open radius of $3 - 0.5 = 2.5$ meters.\nStep 2: The lining is the region between the two circles, with cross-sectional area $\\pi(3^2) - \\pi(2.5^2) = \\pi(9 - 6.25) = 2.75\\pi$ square meters.\nStep 3: Multiply by the $40$-meter depth: $2.75\\pi(40) = 110\\pi$ cubic meters. Check: the lining must be less than the whole shaft's $360\\pi$, and $110\\pi$ is ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($10\\pi$): squares the thickness itself, as if the lining were a $0.5$-meter-radius cylinder.\n* Choice C ($120\\pi$): multiplies the shaft's curved surface by the thickness, which overstates the ring because the inner circle is smaller.\n* Choice D ($360\\pi$): gives the entire shaft's volume and ignores the open space inside the lining.\n\n**Test Day Takeaway:** A lining or pipe wall is a difference of squares of radii — subtract the areas first, then multiply by the length.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "cylinder-volume",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- distance-from-center-as-radius (4 → 10) ---
  {
    id: "bank-geo-299",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A streetlight at $(6, 8)$ in the $xy$-plane lights every point within $10$ units of its base. Which point lies exactly on the edge of the lit region?",
    choices: [
      { id: "A", text: "$(0, 0)$" },
      // distractor: moves only horizontally to the y-axis, landing 6 units from the base
      { id: "B", text: "$(0, 8)$" },
      // distractor: moves only vertically to the x-axis, landing 8 units from the base
      { id: "C", text: "$(6, 0)$" },
      // distractor: reads the radius 10 as an x-coordinate, landing 4 units from the base
      { id: "D", text: "$(10, 8)$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The edge is $10$ units from $(6, 8)$, and $(0, 0)$ is $\\sqrt{36 + 64} = 10$ units away.\n\n**The Full Solution:**\nStep 1: The lit region is the disk of radius $10$ centered at $(6, 8)$, so its edge is the set of points exactly $10$ units from the base.\nStep 2: Test $(0, 0)$: the differences are $6$ and $8$, so the distance is $\\sqrt{36 + 64} = \\sqrt{100} = 10$ ✓\nStep 3: The others fall short: $(0, 8)$ is $6$ units away, $(6, 0)$ is $8$ units away, and $(10, 8)$ is $4$ units away, so all three lie inside the lit region.\n\n**Why the wrong answers are tempting:**\n* Choice B ($(0, 8)$): shares the streetlight's $y$-coordinate, so only the $6$-unit horizontal gap counts.\n* Choice C ($(6, 0)$): shares the $x$-coordinate, so only the $8$-unit vertical gap counts.\n* Choice D ($(10, 8)$): borrows the radius $10$ as a coordinate, which lands just $4$ units from the base.\n\n**Test Day Takeaway:** \"On the edge\" is a distance test — compute the distance to each candidate and compare it with the radius.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-300",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A glacier terminus at $(-2, 9)$ is ringed by ice-margin stakes that all lie on one circle, and a monitoring camera at $(10, 0)$ sits on that ring, with coordinates in kilometers. How wide, in kilometers, is the ring measured across its center?",
    choices: [
      // distractor: reports the radius 15 instead of the width across the center
      { id: "A", text: "$15$" },
      // distractor: adds the coordinate gaps, 12 + 9, instead of using the Pythagorean sum
      { id: "B", text: "$21$" },
      { id: "C", text: "$30$" },
      // distractor: doubles the width a second time, reporting 4 times the radius
      { id: "D", text: "$60$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** The radius is $\\sqrt{12^2 + 9^2} = 15$ kilometers, and the width across the center is $2(15) = 30$.\n\n**The Full Solution:**\nStep 1: The ring is centered at the terminus $(-2, 9)$ and passes through the camera $(10, 0)$, so its radius is the distance between them.\nStep 2: The gaps are $10 - (-2) = 12$ and $0 - 9 = -9$, so $r = \\sqrt{144 + 81} = \\sqrt{225} = 15$ kilometers.\nStep 3: A width measured straight across through the center is a diameter: $2r = 30$ kilometers. Check: a stake directly opposite the camera would sit $30$ kilometers from it ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): stops at the radius, which reaches only halfway across.\n* Choice B ($21$): adds the coordinate gaps $12 + 9$ instead of taking the Pythagorean sum.\n* Choice D ($60$): doubles the diameter, applying the factor of $2$ twice.\n\n**Test Day Takeaway:** A distance from the center to a point on a circle is the radius — double it only when the question asks for a width across the center.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-301",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A carillon bell tower at $(-4, -3)$ in the $xy$-plane is heard out to a bench at $(8, 2)$, where coordinates are in meters. Which equation describes the edge of the region in which the carillon is heard?",
    choices: [
      // distractor: puts the radius 13 on the right side instead of r squared
      { id: "A", text: "$(x + 4)^2 + (y + 3)^2 = 13$" },
      // distractor: flips the signs of the tower's coordinates inside the parentheses
      { id: "B", text: "$(x - 4)^2 + (y - 3)^2 = 169$" },
      // distractor: centers the region at the bench instead of at the tower
      { id: "C", text: "$(x - 8)^2 + (y - 2)^2 = 169$" },
      { id: "D", text: "$(x + 4)^2 + (y + 3)^2 = 169$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice D is correct.**\n\n**The Fast Way (~30s):** The radius is $\\sqrt{12^2 + 5^2} = 13$ meters, so the edge is $(x + 4)^2 + (y + 3)^2 = 169$.\n\n**The Full Solution:**\nStep 1: The edge is a circle centered at the tower $(-4, -3)$, so the parentheses read $(x + 4)^2$ and $(y + 3)^2$.\nStep 2: The radius reaches the bench: $\\sqrt{(8 - (-4))^2 + (2 - (-3))^2} = \\sqrt{144 + 25} = 13$ meters.\nStep 3: The right side is $r^2 = 169$, giving $(x + 4)^2 + (y + 3)^2 = 169$. Check: substituting $(8, 2)$ gives $144 + 25 = 169$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: uses the radius $13$ where $r^2$ belongs, shrinking the region drastically.\n* Choice B: writes $(x - 4)^2 + (y - 3)^2$, which centers the region at $(4, 3)$.\n* Choice C: centers the region at the bench, the point on the edge rather than the source.\n\n**Test Day Takeaway:** The center goes inside the parentheses with flipped signs, and the distance to a known edge point gets SQUARED on the right.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-302",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Segment $\\overline{CD}$ is a radius of a circle in the $xy$-plane. The center of the circle is $C(-8,\\,1)$, and the other endpoint of the radius is $D(-4,\\,-2)$. What is the length of $\\overline{CD}$?",
    choices: [
      // distractor: uses only the vertical change
      { id: "A", text: "$3$" },
      { id: "B", text: "$5$" },
      // distractor: adds the two coordinate changes
      { id: "C", text: "$7$" },
      // distractor: reports the diameter
      { id: "D", text: "$10$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** From $C$ to $D$ the coordinates change by $4$ and $3$, and $3$, $4$, $5$ is a Pythagorean triple, so $CD=5$.\n\n**The Full Solution:**\nStep 1: A radius runs from the center to a point on the circle, so its length is the distance between $C(-8,\\,1)$ and $D(-4,\\,-2)$.\nStep 2: The horizontal change is $-4-(-8)=4$ and the vertical change is $-2-1=-3$, so $CD=\\sqrt{4^2+(-3)^2}=\\sqrt{16+9}=\\sqrt{25}$.\nStep 3: $CD=\\sqrt{25}=5$.\n\nCheck: $3^2+4^2=9+16=25=5^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): used only the vertical change, $|1-(-2)|=3$, as though $\\overline{CD}$ were a vertical segment. That single subtraction works only when the two endpoints share an $x$-coordinate, and here they do not.\n* Choice C ($7$): added the horizontal and vertical changes, $4+3$, instead of combining them with the distance formula.\n* Choice D ($10$): found the radius correctly and then doubled it, reporting the diameter of the circle.\n\n**Test Day Takeaway:** Check whether the two endpoints share a coordinate before reaching for a single subtraction. When both coordinates change, only the distance formula gives the length.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-303",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rotating traffic camera at $(7, -6)$ in the $xy$-plane covers a circular region whose edge passes through a signal at $(2, 6)$, where coordinates are in meters. What is the circumference, in meters, of the edge of the covered region?",
    choices: [
      // distractor: uses pi r, which is half the circumference
      { id: "A", text: "$13\\pi$" },
      { id: "B", text: "$26\\pi$" },
      // distractor: uses the area formula pi r squared
      { id: "C", text: "$169\\pi$" },
      // distractor: uses 2 pi r squared, mixing the circumference and area formulas
      { id: "D", text: "$338\\pi$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The radius is $\\sqrt{5^2 + 12^2} = 13$ meters, so the circumference is $2\\pi(13) = 26\\pi$.\n\n**The Full Solution:**\nStep 1: The radius is the distance from the camera to the signal on the edge: the differences are $7 - 2 = 5$ and $-6 - 6 = -12$.\nStep 2: So $r = \\sqrt{25 + 144} = \\sqrt{169} = 13$ meters.\nStep 3: The circumference is $C = 2\\pi r = 26\\pi$ meters. Check: the diameter is $26$ meters, and $C = \\pi d = 26\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($13\\pi$): computes $\\pi r$, which is only half the way around.\n* Choice C ($169\\pi$): uses $\\pi r^2$, the area of the covered region rather than its perimeter.\n* Choice D ($338\\pi$): doubles the area expression, combining both formulas.\n\n**Test Day Takeaway:** Two steps here — distance formula for the radius, then $2\\pi r$; squaring the radius would answer a different question.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-304",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A gravimeter at $(-9, 4)$ in the $xy$-plane detects mass changes within $r$ units, and a source at $(-1, -2)$ lies exactly on the edge of its range. A second gravimeter with the same range is at $(6, k)$ and has a source at $(6, -6)$ on its edge. What are the possible values of $k$?",
    choices: [
      // distractor: adds the coordinate differences to get r = 14, then computes -6 plus or minus 14
      { id: "A", text: "$-20$ and $8$" },
      // distractor: uses only the vertical difference, r = 6, then computes -6 plus or minus 6
      { id: "B", text: "$-12$ and $0$" },
      { id: "C", text: "$-16$ and $4$" },
      // distractor: solves k - 6 = plus or minus 10, adding 6 instead of subtracting
      { id: "D", text: "$-4$ and $16$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Distance from Center as Radius**\n\n**Choice C is correct.**\n\n**The Fast Way (~50s):** The first pair gives $r = \\sqrt{8^2 + 6^2} = 10$; the second source is directly below, so $|k + 6| = 10$ and $k = 4$ or $k = -16$.\n\n**The Full Solution:**\nStep 1: The source $(-1, -2)$ is one range from $(-9, 4)$, so $r = \\sqrt{(-1 + 9)^2 + (-2 - 4)^2} = \\sqrt{64 + 36} = 10$ units.\nStep 2: The second gravimeter at $(6, k)$ and its source $(6, -6)$ share an $x$-coordinate, so their distance is $|k - (-6)| = |k + 6|$.\nStep 3: Setting $|k + 6| = 10$ gives $k + 6 = 10$ or $k + 6 = -10$, so $k = 4$ or $k = -16$. Check: from $(6, 4)$ to $(6, -6)$ is $10$ units, and from $(6, -16)$ to $(6, -6)$ is also $10$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: adds the coordinate gaps $8 + 6$ to get $r = 14$ instead of using the Pythagorean sum.\n* Choice B: uses only the vertical gap of $6$ as the range.\n* Choice D: solves $k - 6 = \\pm 10$, subtracting the source's $y$-coordinate instead of adding it.\n\n**Test Day Takeaway:** Work the given edge point backwards to the radius first, then let the shared coordinate turn the second condition into a simple absolute-value equation with two roots.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "distance-from-center-as-radius",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- pythagorean-triple-recognition (4 → 10) ---
  {
    id: "bank-geo-305",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The steel awning strut shown reaches $12$ feet outward and $5$ feet upward from its wall bracket. How long, in feet, is the strut?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 5]], sideLabels: ["12 ft", "5 ft", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: subtracts the legs, 12 - 5, instead of combining their squares
      { id: "A", text: "$7$" },
      { id: "B", text: "$13$" },
      // distractor: adds the legs, 12 + 5, which would make the hypotenuse equal to the two-leg path
      { id: "C", text: "$17$" },
      // distractor: computes the area, one half times 5 times 12, instead of a length
      { id: "D", text: "$30$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Pythagorean Triple Recognition**\n\n**Choice B is correct.** The strut is the hypotenuse: $\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ feet.\n\n**The Fast Way (~15s):** $5$-$12$-$13$ is a Pythagorean triple, so the strut is $13$ feet.\n\n**The Full Solution:**\n\nStep 1: The horizontal reach and the vertical rise are perpendicular, so they are the legs of a right triangle whose hypotenuse is the strut.\n\nStep 2: Apply $a^2 + b^2 = c^2$: $5^2 + 12^2 = 25 + 144 = 169$.\n\nStep 3: So $c = \\sqrt{169} = 13$ feet. Check: $13$ is longer than either leg but shorter than $5 + 12 = 17$, exactly as a hypotenuse must be.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($7$): subtracts the legs instead of combining their squares.\n* Choice C ($17$): adds the legs, which is the distance along the two-leg path, not the straight strut.\n* Choice D ($30$): computes the area $\\frac{1}{2}(5)(12)$ instead of a length.\n\n**Test Day Takeaway:** Memorize $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, and $7$-$24$-$25$; spotting one turns a calculation into recall.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-triple-recognition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-306",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "In triangle $PQR$, angle $Q$ is a right angle, $PQ=7$, and $QR=24$. What is the length of $\\overline{PR}$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 7]], labels: ["R", "Q", "P"], sideLabels: ["24", "7", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: doubles the shorter leg as in a 30-60-90 triangle
      { id: "A", text: "$14$" },
      // distractor: subtracts the legs
      { id: "B", text: "$17$" },
      { id: "C", text: "$25$" },
      // distractor: adds the legs
      { id: "D", text: "$31$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Pythagorean Triple Recognition**\n\n**Choice C is correct.**\n\n**The Fast Way (~5s):** The right angle at $Q$ makes $\\overline{PR}$ the hypotenuse, and $7$, $24$, $25$ is a Pythagorean triple, so $PR=25$.\n\n**The Full Solution:**\nStep 1: The side opposite the right angle is the hypotenuse, so $PQ$ and $QR$ are the legs and $PR$ is the hypotenuse.\nStep 2: $PR^2=7^2+24^2=49+576=625$.\nStep 3: $PR=\\sqrt{625}=25$.\n\nCheck: $25^2=625=49+576$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($14$): doubled the shorter leg, applying the $30$-$60$-$90$ rule that the hypotenuse is twice the short leg. That rule needs a $30^\\circ$ angle, which is not given here.\n* Choice B ($17$): subtracted the legs, $24-7$, instead of combining their squares.\n* Choice D ($31$): added the legs, $7+24$.\n\n**Test Day Takeaway:** Identify the hypotenuse first: it is always the side opposite the right angle, never one of the two sides that form it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-triple-recognition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-307",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A fiber-optic riser panel is stamped as the right triangle shown, whose longest edge is $53$ centimeters and whose vertical edge is $28$ centimeters. How many square centimeters of laminate cover one panel?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [45, 0], [45, 28]], sideLabels: ["", "28 cm", "53 cm"], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$630$" },
      // distractor: uses the 53 cm hypotenuse as a leg: one half times 28 times 53
      { id: "B", text: "$742$" },
      // distractor: finds both legs but omits the factor one half: 28 times 45
      { id: "C", text: "$1{,}260$" },
      // distractor: multiplies the two given lengths, 28 times 53, with no halving and no missing leg
      { id: "D", text: "$1{,}484$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Pythagorean Triple Recognition**\n\n**Choice A is correct.** The missing leg is $\\sqrt{53^2 - 28^2} = 45$, so the area is $\\frac{1}{2}(28)(45) = 630$ square centimeters.\n\n**The Fast Way (~25s):** $28$-$45$-$53$ is a triple, so the legs are $28$ and $45$ and the area is $\\frac{1}{2}(28)(45) = 630$.\n\n**The Full Solution:**\n\nStep 1: The $53$-centimeter edge is the hypotenuse, so the horizontal leg satisfies $b^2 = 2809 - 784 = 2025$.\n\nStep 2: Therefore $b = 45$ centimeters.\n\nStep 3: Area $= \\frac{1}{2}(28)(45) = 630$ square centimeters. Check: $28^2 + 45^2 = 784 + 2025 = 2809 = 53^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($742$): treats the $53$-centimeter hypotenuse as the second leg, giving $\\frac{1}{2}(28)(53)$.\n* Choice C ($1{,}260$): finds the legs correctly but forgets the factor $\\frac{1}{2}$.\n* Choice D ($1{,}484$): multiplies the two lengths printed on the figure with neither correction.\n\n**Test Day Takeaway:** When a figure gives a hypotenuse and one leg, the triple gives you the other leg faster than the calculator does.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-triple-recognition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-308",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A spectrometer's optical-bench brace is the right triangle shown; its longest edge is $29$ centimeters and one of the other two edges is $21$ centimeters. How many centimeters of edging trim wrap the entire brace?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [21, 0], [21, 20]], sideLabels: ["21 cm", "", "29 cm"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports the longest edge alone instead of the distance around
      { id: "A", text: "$29$" },
      // distractor: adds only the two legs, 21 + 20, and omits the 29 cm edge
      { id: "B", text: "$41$" },
      // distractor: adds the two edges printed on the figure, 21 + 29, and never finds the third
      { id: "C", text: "$50$" },
      { id: "D", text: "$70$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Pythagorean Triple Recognition**\n\n**Choice D is correct.** The third edge is $\\sqrt{29^2 - 21^2} = 20$, so the trim measures $21 + 20 + 29 = 70$ centimeters.\n\n**The Fast Way (~30s):** $20$-$21$-$29$ is a Pythagorean triple, so the missing edge is $20$ and the perimeter is $70$.\n\n**The Full Solution:**\n\nStep 1: The $29$-centimeter edge is the hypotenuse, so the missing leg satisfies $b^2 = 841 - 441 = 400$.\n\nStep 2: Therefore $b = 20$ centimeters.\n\nStep 3: The trim follows all three edges: $21 + 20 + 29 = 70$ centimeters. Check: $20^2 + 21^2 = 400 + 441 = 841 = 29^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($29$): reports the longest edge alone rather than the distance around the brace.\n* Choice B ($41$): adds only the two legs and leaves the $29$-centimeter edge uncovered.\n* Choice C ($50$): adds the two lengths printed on the figure without ever finding the third.\n\n**Test Day Takeaway:** $20$-$21$-$29$ is a less familiar triple, so verify with $a^2 + b^2 = c^2$ and then answer the question actually asked — here, a perimeter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-triple-recognition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-309",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A rectangular access hatch is cut in half by the diagonal shown, forming a right triangle with a $37$-inch hypotenuse and a $12$-inch short leg. What is the area, in square inches, of the hatch?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [35, 0], [35, 12]], sideLabels: ["", "12 in", "37 in"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports the area of the half-hatch triangle, one half times 12 times 35
      { id: "A", text: "$210$" },
      // distractor: uses the 37-inch diagonal as a side of the triangle: one half times 12 times 37
      { id: "B", text: "$222$" },
      { id: "C", text: "$420$" },
      // distractor: multiplies 12 by the 37-inch diagonal instead of by the 35-inch side
      { id: "D", text: "$444$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Pythagorean Triple Recognition**\n\n**Choice C is correct.** The other leg is $\\sqrt{37^2 - 12^2} = 35$, so the hatch measures $12 \\times 35 = 420$ square inches.\n\n**The Fast Way (~30s):** $12$-$35$-$37$ is a triple, so the rectangle is $12$ by $35$ and its area is $420$.\n\n**The Full Solution:**\n\nStep 1: The diagonal of the rectangle is the hypotenuse of the right triangle, so the missing side satisfies $b^2 = 1369 - 144 = 1225$.\n\nStep 2: Therefore $b = 35$ inches, and the hatch is a $12$-by-$35$ rectangle.\n\nStep 3: Area $= 12 \\times 35 = 420$ square inches. Check: $12^2 + 35^2 = 144 + 1225 = 1369 = 37^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($210$): gives the area of the triangular half, $\\frac{1}{2}(12)(35)$, instead of the whole hatch.\n* Choice B ($222$): uses the diagonal as a side of the right triangle: $\\frac{1}{2}(12)(37)$.\n* Choice D ($444$): multiplies $12$ by the diagonal $37$ rather than by the side $35$.\n\n**Test Day Takeaway:** A rectangle's diagonal is the hypotenuse of two congruent right triangles — find the missing SIDE first, then answer for the shape the question names.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-triple-recognition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-310",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "In right triangle $JKL$, angle $K$ is a right angle, $JK=12$, and $JL=37$. What is the perimeter of triangle $JKL$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 35]], labels: ["J", "K", "L"], sideLabels: ["12", "", "37"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: adds only the two given sides
      { id: "A", text: "$49$" },
      // distractor: uses 12 for the missing leg
      { id: "B", text: "$61$" },
      { id: "C", text: "$84$" },
      // distractor: reports the area instead of the perimeter
      { id: "D", text: "$210$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Pythagorean Triple Recognition**\n\n**Choice C is correct.**\n\n**The Fast Way (~25s):** $\\overline{JL}$ is the hypotenuse, and $12$, $35$, $37$ is a Pythagorean triple, so $KL=35$ and the perimeter is $12+35+37=84$.\n\n**The Full Solution:**\nStep 1: The right angle sits at $K$, so $\\overline{JL}=37$ is the hypotenuse and $\\overline{JK}=12$ and $\\overline{KL}$ are the legs.\nStep 2: $KL^2=37^2-12^2=1369-144=1225$, so $KL=\\sqrt{1225}=35$.\nStep 3: The perimeter is the sum of all three sides: $12+35+37=84$.\n\nCheck: $12^2+35^2=144+1225=1369=37^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($49$): added only the two sides named in the question, $12+37$, and never found the third side.\n* Choice B ($61$): assumed the triangle was isosceles and reused $12$ for the missing leg, giving $12+12+37$.\n* Choice D ($210$): computed the area, $\\frac{1}{2}(12)(35)$, instead of the perimeter.\n\n**Test Day Takeaway:** When a question asks for a perimeter, the Pythagorean step is only the setup. Find the missing side, then answer the question that was actually asked.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "pythagorean-triple-recognition",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- rectangle-area (4 → 10) ---
  {
    id: "bank-geo-311",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A raised-floor tile in a data hall is $w$ centimeters wide and $3$ centimeters longer than it is wide. Which expression gives the tile's area, in square centimeters?",
    choices: [
      // distractor: gives the tile's length rather than its area
      { id: "A", text: "$w + 3$" },
      // distractor: gives half the perimeter, w + (w + 3), instead of the product
      { id: "B", text: "$2w + 3$" },
      // distractor: multiplies w by w but adds the 3 instead of distributing it
      { id: "C", text: "$w^2 + 3$" },
      { id: "D", text: "$w^2 + 3w$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice D is correct.** The length is $w + 3$, so the area is $w(w + 3) = w^2 + 3w$.\n\n**The Fast Way (~15s):** Area is width times length: $w(w + 3) = w^2 + 3w$.\n\n**The Full Solution:**\n\nStep 1: The width is $w$ and the length is $3$ more than the width, or $w + 3$.\n\nStep 2: Area of a rectangle is the product of the two dimensions: $w(w + 3)$.\n\nStep 3: Distribute: $w^2 + 3w$. Check with $w = 4$: the tile is $4$ by $7$, area $28$, and $4^2 + 3(4) = 16 + 12 = 28$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($w + 3$): gives the length, not the area.\n* Choice B ($2w + 3$): adds the two dimensions instead of multiplying them.\n* Choice C ($w^2 + 3$): multiplies $w$ by $w$ but forgets to distribute $w$ across the $3$.\n\n**Test Day Takeaway:** Translate \"longer than\" into $w + 3$ first, then multiply — and sanity-check the expression with one convenient number.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-312",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A precast stair landing is $4$ feet longer than it is wide and rests on $96$ square feet of ground. How wide, in feet, is the landing?",
    choices: [
      { id: "A", text: "$8$" },
      // distractor: reports the length, w + 4 = 12, instead of the width
      { id: "B", text: "$12$" },
      // distractor: treats 96 as the perimeter, solving 4w + 8 = 96
      { id: "C", text: "$22$" },
      // distractor: divides the area by the 4-foot difference: 96 divided by 4
      { id: "D", text: "$24$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice A is correct.** With width $w$, $w(w + 4) = 96$ gives $(w + 12)(w - 8) = 0$, so $w = 8$ feet.\n\n**The Fast Way (~25s):** Two factors of $96$ that differ by $4$ are $8$ and $12$, so the width is $8$.\n\n**The Full Solution:**\n\nStep 1: Let $w$ be the width in feet; the length is $w + 4$.\n\nStep 2: Area gives $w(w + 4) = 96$, so $w^2 + 4w - 96 = 0$ and $(w + 12)(w - 8) = 0$.\n\nStep 3: A width must be positive, so $w = 8$ feet. Check: $8 \\times 12 = 96$ square feet, and $12 - 8 = 4$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($12$): solves correctly but reports the length instead of the width.\n* Choice C ($22$): treats $96$ as the perimeter, solving $2(w + w + 4) = 96$.\n* Choice D ($24$): divides the area by the $4$-foot difference, an operation with no meaning here.\n\n**Test Day Takeaway:** After factoring, reread which dimension the question wants — the two roots and the two dimensions are different lists.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-313",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A reagent bottle label measures $6.5$ centimeters along its top edge and $4$ centimeters along its side. How many square centimeters of paper does one label use?",
    choices: [
      // distractor: adds the two dimensions, 6.5 + 4, instead of multiplying them
      { id: "A", text: "$10.5$" },
      // distractor: halves the product as if the label were a triangle
      { id: "B", text: "$13$" },
      // distractor: computes the perimeter, 2 times the sum of 6.5 and 4
      { id: "C", text: "$21$" },
      { id: "D", text: "$26$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice D is correct.** The label is a rectangle, so its area is $6.5 \\times 4 = 26$ square centimeters.\n\n**The Fast Way (~10s):** $6.5 \\times 4 = 26$.\n\n**The Full Solution:**\n\nStep 1: Adjacent edges of a rectangle are its length and width, here $6.5$ and $4$ centimeters.\n\nStep 2: Area of a rectangle is length times width: $6.5 \\times 4$.\n\nStep 3: That product is $26$ square centimeters. Check: $6 \\times 4 = 24$ and $0.5 \\times 4 = 2$, and $24 + 2 = 26$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($10.5$): adds the two dimensions instead of multiplying them.\n* Choice B ($13$): halves the product, which would be the area of a triangle with those legs.\n* Choice C ($21$): computes the perimeter, $2(6.5 + 4)$, rather than the area.\n\n**Test Day Takeaway:** Area multiplies and perimeter adds — check the units the question asks for, since square units always signal a product.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-314",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The rectangular face of a server-room air baffle covers $216$ square centimeters; it is $3k$ centimeters long and $(k + 6)$ centimeters wide for some positive constant $k$. How long, in centimeters, is that face?",
    choices: [
      // distractor: stops at k = 6 instead of evaluating the length 3k
      { id: "A", text: "$6$" },
      // distractor: reports the width, k + 6 = 12, rather than the length
      { id: "B", text: "$12$" },
      { id: "C", text: "$18$" },
      // distractor: drops the factor 3, solving k(k + 6) = 216 to get k = 12 and then 3k = 36
      { id: "D", text: "$36$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice C is correct.** $3k(k + 6) = 216$ gives $k^2 + 6k - 72 = 0$, so $k = 6$ and the length is $3k = 18$ centimeters.\n\n**The Fast Way (~35s):** Divide by $3$ first: $k(k + 6) = 72$, so $k = 6$ and $3k = 18$.\n\n**The Full Solution:**\n\nStep 1: Area is length times width: $3k(k + 6) = 216$.\n\nStep 2: Divide both sides by $3$ and expand: $k^2 + 6k = 72$, so $k^2 + 6k - 72 = 0$, which factors as $(k + 12)(k - 6) = 0$.\n\nStep 3: Only $k = 6$ is positive, so the length is $3(6) = 18$ centimeters. Check: the width is $6 + 6 = 12$, and $18 \\times 12 = 216$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($6$): stops at $k$ instead of evaluating the length $3k$.\n* Choice B ($12$): reports the width $k + 6$ rather than the length.\n* Choice D ($36$): drops the coefficient $3$, solving $k(k + 6) = 216$ to get $k = 12$, then triples it.\n\n**Test Day Takeaway:** Keep every coefficient attached when you set up the area equation, and finish by evaluating the expression the question names, not the letter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-315",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An equipment pad's rectangular footprint measures $(2k - 3)$ meters by $(k + 1)$ meters, and its area is $9$ square meters greater than that of a square with side $k$ meters. What is the value of $k$?",
    choices: [
      // distractor: reports the rejected root k = -3 with its sign dropped
      { id: "A", text: "$3$" },
      { id: "B", text: "$4$" },
      // distractor: reports a footprint dimension, 2k - 3 = 5, instead of k
      { id: "C", text: "$5$" },
      // distractor: reads the constant term of k squared minus k minus 12 as a root
      { id: "D", text: "$12$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice B is correct.** $(2k - 3)(k + 1) = k^2 + 9$ reduces to $k^2 - k - 12 = 0$, so $k = 4$.\n\n**The Fast Way (~40s):** Expand to $2k^2 - k - 3 = k^2 + 9$, subtract $k^2$, and factor: $(k - 4)(k + 3) = 0$, so $k = 4$.\n\n**The Full Solution:**\n\nStep 1: The footprint's area is $(2k - 3)(k + 1) = 2k^2 - k - 3$, and the square's area is $k^2$.\n\nStep 2: \"Greater by $9$\" means $2k^2 - k - 3 = k^2 + 9$, so $k^2 - k - 12 = 0$.\n\nStep 3: Factor: $(k - 4)(k + 3) = 0$, and only $k = 4$ keeps both dimensions positive. Check: the pad is $5$ by $5$, area $25$; the square has area $16$; and $25 - 16 = 9$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($3$): takes the rejected root $k = -3$ and drops the sign.\n* Choice C ($5$): reports the footprint dimension $2k - 3$ instead of $k$.\n* Choice D ($12$): reads the constant $-12$ in $k^2 - k - 12 = 0$ as a solution.\n\n**Test Day Takeaway:** \"Greater by\" sets up a subtraction between two areas; collect everything on one side before factoring, and discard roots that make a length negative.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-316",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The length of a rectangular garden plot is $5$ feet more than its width, and the plot has an area of $84$ square feet. What is the perimeter, in feet, of the plot?",
    choices: [
      // distractor: adds length and width without doubling
      { id: "A", text: "$19$" },
      { id: "B", text: "$38$" },
      // distractor: uses the magnitude of the rejected root
      { id: "C", text: "$58$" },
      // distractor: applies the factor of 2 twice
      { id: "D", text: "$76$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Rectangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Two numbers $5$ apart with product $84$ are $7$ and $12$, so the perimeter is $2(7+12)=38$ feet.\n\n**The Full Solution:**\nStep 1: Let $w$ be the width. Then the length is $w+5$ and $w(w+5)=84$.\nStep 2: $w^2+5w-84=0$ factors as $(w+12)(w-7)=0$, so $w=-12$ or $w=7$. A width must be positive, so $w=7$ and the length is $12$.\nStep 3: The perimeter is $2(7+12)=2(19)=38$ feet.\n\nCheck: $(7)(12)=84$ square feet, and $12$ is indeed $5$ more than $7$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($19$): added the length and width and stopped, skipping the factor of $2$ in the perimeter.\n* Choice C ($58$): used $12$ as the width by taking the magnitude of the rejected root $-12$, which makes the length $17$ and the perimeter $2(12+17)$.\n* Choice D ($76$): doubled $2(\\ell+w)$ a second time, applying the factor of $2$ twice.\n\n**Test Day Takeaway:** A quadratic from an area setup usually has one negative root that the geometry rejects. Discard it, then reread the question to see which quantity is wanted.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "rectangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- right-triangle-pythagorean (4 → 10) ---
  {
    id: "bank-geo-317",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A diagonal stiffener spans a spandrel panel from corner to corner, cutting off the right triangle shown with $33$-inch and $56$-inch legs. How long, in inches, is the stiffener?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [56, 0], [56, 33]], sideLabels: ["56 in", "33 in", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: subtracts the legs, 56 - 33, instead of combining their squares
      { id: "A", text: "$23$" },
      { id: "B", text: "$65$" },
      // distractor: adds the legs, 56 + 33, giving the path along two sides rather than the diagonal
      { id: "C", text: "$89$" },
      // distractor: computes the area, one half times 33 times 56, instead of a length
      { id: "D", text: "$924$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle Pythagorean**\n\n**Choice B is correct.** The stiffener is the hypotenuse: $\\sqrt{33^2 + 56^2} = \\sqrt{4225} = 65$ inches.\n\n**The Fast Way (~25s):** $33$-$56$-$65$ is a Pythagorean triple, so the stiffener is $65$ inches.\n\n**The Full Solution:**\n\nStep 1: The two legs meet at a right angle at a corner of the panel, and the stiffener joins their far ends, so it is the hypotenuse.\n\nStep 2: $33^2 + 56^2 = 1089 + 3136 = 4225$.\n\nStep 3: The stiffener measures $\\sqrt{4225} = 65$ inches. Check: $65 > 56$ and $65 < 89$, the band any hypotenuse must fall in.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($23$): subtracts the legs instead of combining their squares.\n* Choice C ($89$): adds the legs, which measures the path along two sides.\n* Choice D ($924$): computes the triangle's area rather than a length.\n\n**Test Day Takeaway:** Add the squares, then take one square root — subtracting or adding raw lengths is the single most common Pythagorean slip.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-318",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Right triangle $DEF$ has a right angle at $E$. If $DE=5$ and $DF=13$, what is the length of $\\overline{EF}$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [5, 0], [5, 12]], labels: ["D", "E", "F"], sideLabels: ["5", "", "13"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: subtracts the given lengths
      { id: "A", text: "$8$" },
      { id: "B", text: "$12$" },
      // distractor: adds the given lengths
      { id: "C", text: "$18$" },
      // distractor: omits the square root
      { id: "D", text: "$144$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle Pythagorean**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** The right angle at $E$ makes $\\overline{DF}=13$ the hypotenuse, and $5$, $12$, $13$ is a triple, so $EF=12$.\n\n**The Full Solution:**\nStep 1: The hypotenuse lies opposite the right angle, so $\\overline{DF}$ is the hypotenuse and $\\overline{DE}$ and $\\overline{EF}$ are the legs.\nStep 2: $5^2+EF^2=13^2$, so $EF^2=169-25=144$.\nStep 3: $EF=\\sqrt{144}=12$.\n\nCheck: $5^2+12^2=25+144=169=13^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): subtracted the given lengths, $13-5$, rather than subtracting their squares.\n* Choice C ($18$): added the given lengths; a leg cannot exceed the hypotenuse.\n* Choice D ($144$): stopped at $EF^2$ without taking the square root.\n\n**Test Day Takeaway:** Locate the right angle first. The side that does not touch it is the hypotenuse, and only the hypotenuse sits alone on one side of $a^2+b^2=c^2$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-319",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "An elevator-shaft guide bracket is the right triangle shown; its sloped edge is $39$ centimeters and its horizontal edge is $15$ centimeters. How many centimeters of weld run around the bracket?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [15, 0], [15, 36]], sideLabels: ["15 cm", "", "39 cm"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports the missing vertical edge, 36, instead of the distance around
      { id: "A", text: "$36$" },
      // distractor: adds only the two legs, 15 + 36, and omits the sloped edge
      { id: "B", text: "$51$" },
      // distractor: adds the two lengths printed on the figure, 15 + 39, without finding the third
      { id: "C", text: "$54$" },
      { id: "D", text: "$90$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Right Triangle Pythagorean**\n\n**Choice D is correct.** The vertical edge is $\\sqrt{39^2 - 15^2} = 36$, so the weld runs $15 + 36 + 39 = 90$ centimeters.\n\n**The Fast Way (~30s):** $15$-$36$-$39$ is the $5$-$12$-$13$ triple tripled; the perimeter is $90$.\n\n**The Full Solution:**\n\nStep 1: The $39$-centimeter sloped edge is the hypotenuse, so the vertical edge satisfies $b^2 = 1521 - 225 = 1296$.\n\nStep 2: Therefore $b = 36$ centimeters.\n\nStep 3: The weld follows all three edges: $15 + 36 + 39 = 90$ centimeters. Check: $15^2 + 36^2 = 225 + 1296 = 1521 = 39^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($36$): reports the edge just computed instead of the distance around.\n* Choice B ($51$): adds only the two legs and leaves the sloped edge unwelded.\n* Choice C ($54$): adds the two lengths printed on the figure without finding the third.\n\n**Test Day Takeaway:** After the Pythagorean step, count the sides the question actually covers — a weld or trim question is always a perimeter.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-320",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A jumper cable can run $1.4$ meters across a cold aisle and then $4.8$ meters along it, or take the straight diagonal shown. How many meters does the diagonal save?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [4.8, 0], [4.8, 1.4]], sideLabels: ["4.8 m", "1.4 m", ""], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$1.2$" },
      // distractor: subtracts the two legs, 4.8 - 1.4, instead of comparing the bent path with the diagonal
      { id: "B", text: "$3.4$" },
      // distractor: reports the diagonal itself rather than the saving
      { id: "C", text: "$5$" },
      // distractor: reports the two-leg path, 1.4 + 4.8, rather than the difference
      { id: "D", text: "$6.2$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Right Triangle Pythagorean**\n\n**Choice A is correct.** The diagonal is $\\sqrt{1.4^2 + 4.8^2} = 5$ meters, and the bent path is $1.4 + 4.8 = 6.2$, so the saving is $6.2 - 5 = 1.2$ meters.\n\n**The Fast Way (~30s):** $1.4$-$4.8$-$5$ is the $7$-$24$-$25$ triple scaled by $0.2$; $6.2 - 5 = 1.2$.\n\n**The Full Solution:**\n\nStep 1: The two legs of the bent route meet at a right angle, so the direct route is the hypotenuse.\n\nStep 2: $1.4^2 + 4.8^2 = 1.96 + 23.04 = 25$, so the diagonal is $\\sqrt{25} = 5$ meters.\n\nStep 3: The bent route measures $1.4 + 4.8 = 6.2$ meters, so the diagonal saves $6.2 - 5 = 1.2$ meters. Check: $5 < 6.2$, so a saving is expected.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($3.4$): subtracts the legs instead of comparing the two routes.\n* Choice C ($5$): reports the diagonal itself rather than how much shorter it is.\n* Choice D ($6.2$): reports the bent route.\n\n**Test Day Takeaway:** \"How much shorter\" is always two computations — find both routes, then subtract; decimals do not stop a triple from applying.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-321",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The cross section of a gravel conveyor's support frame, shown, rises $2.5$ meters over a $6$-meter run. What is the total length, in meters, of the cross section's three sides?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [6, 0], [6, 2.5]], sideLabels: ["6 m", "2.5 m", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports the sloped side alone, 6.5, instead of the total of all three sides
      { id: "A", text: "$6.5$" },
      // distractor: computes the area, one half times 2.5 times 6, instead of a length
      { id: "B", text: "$7.5$" },
      // distractor: adds only the rise and the run, 2.5 + 6, and omits the sloped side
      { id: "C", text: "$8.5$" },
      { id: "D", text: "$15$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Right Triangle Pythagorean**\n\n**Choice D is correct.** The sloped side is $\\sqrt{2.5^2 + 6^2} = 6.5$, so the three sides total $2.5 + 6 + 6.5 = 15$ meters.\n\n**The Fast Way (~25s):** $2.5$-$6$-$6.5$ is the $5$-$12$-$13$ triple halved; $2.5 + 6 + 6.5 = 15$.\n\n**The Full Solution:**\n\nStep 1: The rise and the run are perpendicular, so the sloping frame member is the hypotenuse of the cross section.\n\nStep 2: $2.5^2 + 6^2 = 6.25 + 36 = 42.25$, so the sloped side is $\\sqrt{42.25} = 6.5$ meters.\n\nStep 3: Adding all three sides gives $2.5 + 6 + 6.5 = 15$ meters. Check: $6.5^2 = 42.25$, matching Step 2.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($6.5$): reports the sloped side alone.\n* Choice B ($7.5$): computes the enclosed area $\\frac{1}{2}(2.5)(6)$ instead of a length.\n* Choice C ($8.5$): adds only the rise and the run.\n\n**Test Day Takeaway:** Scaled triples work with decimals too — halving $5$-$12$-$13$ gives $2.5$-$6$-$6.5$ and removes the calculator step entirely.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-322",
    domain: "geometry",
    skills: ["pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "An autoclave's inner cavity is a rectangular prism with edges of $12$, $16$, and $21$ centimeters. What is the greatest length, in centimeters, of a straight glass rod that can lie entirely inside the cavity?",
    choices: [
      // distractor: uses only the 12 by 16 face diagonal and never accounts for the 21-centimeter edge
      { id: "A", text: "$20$" },
      { id: "B", text: "$29$" },
      // distractor: adds the two largest edges, 16 + 21, instead of using the Pythagorean theorem
      { id: "C", text: "$37$" },
      // distractor: adds all three edges, 12 + 16 + 21, which traces a bent path along three edges
      { id: "D", text: "$49$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle Pythagorean**\n\n**Choice B is correct.** The longest rod lies along the space diagonal: $\\sqrt{12^2 + 16^2 + 21^2} = \\sqrt{841} = 29$ centimeters.\n\n**The Fast Way (~35s):** $144 + 256 + 441 = 841$, so the space diagonal is $29$.\n\n**The Full Solution:**\n\nStep 1: A face diagonal across the $12$-by-$16$ face measures $\\sqrt{144 + 256} = \\sqrt{400} = 20$ centimeters.\n\nStep 2: That face diagonal and the remaining $21$-centimeter edge meet at a right angle, so they are the legs of a right triangle whose hypotenuse is the space diagonal.\n\nStep 3: The space diagonal is $\\sqrt{20^2 + 21^2} = \\sqrt{400 + 441} = \\sqrt{841} = 29$ centimeters. Check: $29$ exceeds every edge and every face diagonal, as the longest interior segment must.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($20$): stops at the face diagonal and ignores the $21$-centimeter edge.\n* Choice C ($37$): adds the two largest edges instead of using the Pythagorean theorem.\n* Choice D ($49$): adds all three edges, tracing a bent path rather than a straight rod.\n\n**Test Day Takeaway:** A box's longest interior segment needs the Pythagorean theorem twice — face diagonal first, then the perpendicular edge.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "right-triangle-pythagorean",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- triangle-area (4 → 10) ---
  {
    id: "bank-geo-323",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "After a rip cut, a triangular plywood offcut remains; it measures $34$ inches along its base and stands $15$ inches tall. How many square inches of surface does the offcut have?",
    choices: [
      // distractor: halves the sum of base and height, (34+15)/2 = 24.5
      { id: "A", text: "$24.5$" },
      // distractor: adds the base and the height instead of multiplying, 34+15 = 49
      { id: "B", text: "$49$" },
      { id: "C", text: "$255$" },
      // distractor: multiplies base by height without the factor 1/2, 34*15 = 510
      { id: "D", text: "$510$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~15s):** Area is half of base times height: $\\frac{1}{2}(34)(15) = 255$.\n\n**The Full Solution:**\nStep 1: The offcut is a triangle with base $34$ inches and height $15$ inches.\nStep 2: A triangle's area is $A = \\frac{1}{2}bh$, so $A = \\frac{1}{2}(34)(15)$.\nStep 3: $(34)(15) = 510$, and half of that is $255$ square inches.\n\nCheck: A $34$ by $15$ rectangle covers $510$ square inches, and the triangle covers exactly half. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($24.5$): halves the sum $34 + 15$ instead of halving the product.\n* Choice B ($49$): adds the base and the height, which gives a length, not an area.\n* Choice D ($510$): multiplies base by height but never applies the factor $\\frac{1}{2}$.\n\n**Test Day Takeaway:** The $\\frac{1}{2}$ in $A = \\frac{1}{2}bh$ multiplies the product, never the sum.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-324",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A solar reflector is fabricated as a triangle whose height, in meters, is $3$ less than its base $b$. Which of the following expressions represents the reflector's area, in square meters?",
    choices: [
      // distractor: adds 3 to the base instead of subtracting it
      { id: "A", text: "$\\frac{b(b+3)}{2}$" },
      { id: "B", text: "$\\frac{b(b-3)}{2}$" },
      // distractor: omits the factor 1/2 from the triangle area formula
      { id: "C", text: "$b(b-3)$" },
      // distractor: reverses the subtraction, writing 3-b instead of b-3
      { id: "D", text: "$\\frac{b(3-b)}{2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The height is $b - 3$, so the area is $\\frac{1}{2}b(b-3) = \\frac{b(b-3)}{2}$.\n\n**The Full Solution:**\nStep 1: The base is $b$ meters, and \"$3$ less than the base\" means the height is $b - 3$ meters.\nStep 2: A triangle's area is $\\frac{1}{2}bh$, so substituting gives $\\frac{1}{2}\\,b\\,(b-3)$.\nStep 3: Written as a single fraction, that is $\\frac{b(b-3)}{2}$.\n\nCheck: With $b = 11$ the height is $8$ and the area is $44$; the expression gives $\\frac{11(8)}{2} = 44$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{b(b+3)}{2}$): adds $3$ to the base instead of subtracting it, so it models a height of $b + 3$.\n* Choice C ($b(b-3)$): uses the right base and height but omits the factor $\\frac{1}{2}$, giving the rectangle's area.\n* Choice D ($\\frac{b(3-b)}{2}$): reverses the subtraction; for any base over $3$ meters this expression is negative.\n\n**Test Day Takeaway:** Translate \"$k$ less than $x$\" as $x - k$, in that order, before substituting into a formula.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-325",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Two triangular countertop templates are cut to the same height, and the base of the second template is twice the base of the first. Which statement comparing the areas of the two templates is true?",
    choices: [
      // distractor: inverts the relationship, treating the doubled base as a halved area
      { id: "A", text: "The area of the second template is half the area of the first." },
      // distractor: assumes only the height controls the area
      { id: "B", text: "The area of the second template is equal to the area of the first." },
      { id: "C", text: "The area of the second template is twice the area of the first." },
      // distractor: squares the scale factor, which applies when both dimensions are doubled
      { id: "D", text: "The area of the second template is four times the area of the first." }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~20s):** Area is $\\frac{1}{2}bh$, so with $h$ fixed and $b$ doubled the area doubles.\n\n**The Full Solution:**\nStep 1: Let the first template have base $b$ and height $h$, so its area is $\\frac{1}{2}bh$.\nStep 2: The second template has the same height $h$ and base $2b$, so its area is $\\frac{1}{2}(2b)(h) = bh$.\nStep 3: Comparing, $bh$ is exactly $2$ times $\\frac{1}{2}bh$, so the second area is twice the first.\n\nCheck: With $b = 10$ and $h = 6$ the areas are $30$ and $60$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (half the area): inverts the relationship, as though a longer base produced a smaller triangle.\n* Choice B (equal areas): treats the height as the only factor and ignores the base entirely.\n* Choice D (four times the area): squares the scale factor, which is what happens only when both the base and the height double.\n\n**Test Day Takeaway:** Area scales by the product of the factors applied to base and height; one doubled dimension doubles the area.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-326",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A load-cell shim is machined in the right-triangular shape shown, with the hypotenuse and one leg labeled in millimeters and the right angle at the vertex between the two legs. What is the area, in square millimeters, of one shim?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 7]], sideLabels: ["", "7", "25"], rightAngleVertex: 1 } },
    choices: [
      // distractor: subtracts 25-7 = 18 for the missing leg instead of using the Pythagorean theorem, giving (1/2)(18)(7) = 63
      { id: "A", text: "$63$" },
      { id: "B", text: "$84$" },
      // distractor: uses the hypotenuse 25 as the second leg: (1/2)(7)(25) = 87.5
      { id: "C", text: "$87.5$" },
      // distractor: multiplies the legs 7 and 24 without halving
      { id: "D", text: "$168$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The missing leg completes the $7$-$24$-$25$ triple, so the area is $\\frac{1}{2}(7)(24) = 84$.\n\n**The Full Solution:**\nStep 1: The right angle sits between the two legs, one of which measures $7$ millimeters; the side labeled $25$ is the hypotenuse.\nStep 2: By the Pythagorean theorem the other leg is $\\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24$ millimeters.\nStep 3: The legs are perpendicular, so the area is $\\frac{1}{2}(7)(24) = 84$ square millimeters.\n\nCheck: $7$-$24$-$25$ is a Pythagorean triple, and $7^2 + 24^2 = 49 + 576 = 625 = 25^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($63$): subtracts $25 - 7 = 18$ for the missing leg, then computes $\\frac{1}{2}(18)(7) = 63$; side lengths do not subtract that way.\n* Choice C ($87.5$): uses the hypotenuse $25$ as if it were the second leg, giving $\\frac{1}{2}(7)(25)$.\n* Choice D ($168$): finds both legs correctly but multiplies them without the factor $\\frac{1}{2}$.\n\n**Test Day Takeaway:** Only the two legs form the base-height pair; the hypotenuse never plays that role.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-327",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A triangular gasket covers $96$ square centimeters and stands $16$ centimeters high. A second gasket covers the same area, but its base is $k$ times as long as the first gasket's base. Which expression gives the height, in centimeters, of the second gasket?",
    choices: [
      // distractor: subtracts the scale factor from the height instead of dividing by it
      { id: "A", text: "$16-k$" },
      // distractor: inverts the relationship, dividing k by the height
      { id: "B", text: "$\\frac{k}{16}$" },
      { id: "C", text: "$\\frac{16}{k}$" },
      // distractor: multiplies the height by k, which would multiply the area by k^2
      { id: "D", text: "$16k$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** With the area fixed, base and height are inversely related, so multiplying the base by $k$ divides the height by $k$: $\\frac{16}{k}$.\n\n**The Full Solution:**\nStep 1: From $96 = \\frac{1}{2}b(16)$ the first gasket's base is $b = 12$ centimeters.\nStep 2: The second gasket has base $12k$ and the same area, so $96 = \\frac{1}{2}(12k)H$, that is $96 = 6kH$.\nStep 3: Solving gives $H = \\frac{96}{6k} = \\frac{16}{k}$ centimeters.\n\nCheck: With $k = 2$ the base is $24$ and the height is $8$, and $\\frac{1}{2}(24)(8) = 96$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($16-k$): subtracts the scale factor from the height, mixing a multiplier with a length.\n* Choice B ($\\frac{k}{16}$): inverts the relationship; at $k = 2$ it gives a height of $0.125$ centimeter, far too small.\n* Choice D ($16k$): multiplies the height by $k$ as well, which would multiply the area by $k^2$ instead of keeping it fixed.\n\n**Test Day Takeaway:** When an area is held constant, base and height move in opposite directions by the same factor.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-328",
    domain: "geometry",
    skills: ["triangle-area"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A triangular damping vane has an area of $84$ square centimeters. In a revised design the base is increased by $25$ percent and the height is decreased by $25$ percent. Which of the following statements about the area of the revised vane is true?",
    choices: [
      { id: "A", text: "It is $6.25\\%$ less than $84$ square centimeters." },
      // distractor: gets the size of the change right but reverses its direction
      { id: "B", text: "It is $6.25\\%$ greater than $84$ square centimeters." },
      // distractor: assumes the equal percent increase and decrease cancel
      { id: "C", text: "It is equal to $84$ square centimeters." },
      // distractor: applies only the 25 percent decrease and ignores the increase
      { id: "D", text: "It is $25\\%$ less than $84$ square centimeters." }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Triangle Area**\n\n**Choice A is correct.**\n\n**The Fast Way (~45s):** The area is multiplied by $(1.25)(0.75) = 0.9375$, a decrease of $6.25\\%$.\n\n**The Full Solution:**\nStep 1: Write the original area as $84 = \\frac{1}{2}bh$.\nStep 2: The revised vane has base $1.25b$ and height $0.75h$, so its area is $\\frac{1}{2}(1.25b)(0.75h) = 0.9375 \\cdot \\frac{1}{2}bh$.\nStep 3: The factor $0.9375$ means the revised area is $93.75\\%$ of the original, a decrease of $6.25\\%$.\n\nCheck: $0.9375(84) = 78.75$, and $\\frac{84 - 78.75}{84} = 0.0625$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($6.25\\%$ greater): finds the right size of the change but flips its direction; the factor $0.9375$ is below $1$.\n* Choice C (equal areas): assumes a $25\\%$ rise and a $25\\%$ drop cancel, but $1.25 \\times 0.75 = 0.9375$, not $1$.\n* Choice D ($25\\%$ less): applies only the decrease and ignores the base increase, giving $63$ square centimeters.\n\n**Test Day Takeaway:** Percent changes compose by multiplying factors, not by adding or subtracting percents.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "triangle-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- trig-ratio-from-perimeter (4 → 10) ---
  {
    id: "bank-geo-329",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The spacer shown is cut on a CNC router, and its three edges, in millimeters, total $36$. Angle $A$ is one of the two acute angles of the spacer. What is the value of $\\sin A$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [9, 0], [9, 12]], labels: ["A", "B", "C"], sideLabels: ["9", "", "15"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports cos A = 9/15 = 3/5, adjacent over hypotenuse
      { id: "A", text: "$\\frac{3}{5}$" },
      // distractor: reports 9/12 = 3/4, adjacent over opposite
      { id: "B", text: "$\\frac{3}{4}$" },
      { id: "C", text: "$\\frac{4}{5}$" },
      // distractor: reports tan A = 12/9 = 4/3, opposite over adjacent
      { id: "D", text: "$\\frac{4}{3}$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Trig Ratio from Perimeter**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The unlabeled leg is $36 - 9 - 15 = 12$, and $\\sin A = \\frac{12}{15} = \\frac{4}{5}$.\n\n**The Full Solution:**\nStep 1: The three edges total $36$ millimeters, and two of them measure $9$ and $15$, so $\\overline{BC} = 36 - 9 - 15 = 12$ millimeters.\nStep 2: The right angle is at $B$, so $\\overline{CA} = 15$ is the hypotenuse and $\\overline{BC} = 12$ is the leg opposite angle $A$.\nStep 3: $\\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{12}{15} = \\frac{4}{5}$.\n\nCheck: $9^2 + 12^2 = 81 + 144 = 225 = 15^2$, so the sides are consistent. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3}{5}$): uses $\\frac{9}{15}$, which is $\\cos A$ rather than $\\sin A$.\n* Choice B ($\\frac{3}{4}$): uses $\\frac{9}{12}$, adjacent over opposite, and never involves the hypotenuse.\n* Choice D ($\\frac{4}{3}$): uses $\\frac{12}{9}$, which is $\\tan A$.\n\n**Test Day Takeaway:** A perimeter plus two sides hands you the third side in one subtraction; then label opposite, adjacent, and hypotenuse before choosing a ratio.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-from-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-330",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "In triangle $ABC$, the angle at $C$ measures $90^\\circ$, the perimeter of the triangle is $30$, and $AB=13$. Given that $BC<AC$, what is the value of $\\tan A$?",
    diagram: { type: "rightTriangle", params: { labels: ["A", "C", "B"], sideLabels: ["", "", "13"], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: uses the hypotenuse in the denominator
      { id: "A", text: "$\\frac{5}{13}$" },
      { id: "B", text: "$\\frac{5}{12}$" },
      // distractor: gives cosine instead of tangent
      { id: "C", text: "$\\frac{12}{13}$" },
      // distractor: swaps opposite and adjacent
      { id: "D", text: "$\\frac{12}{5}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Trig Ratio from Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** The legs sum to $30-13=17$ with squares summing to $169$, so they are $5$ and $12$. With $BC<AC$, $BC=5$ and $AC=12$, giving $\\tan A=\\frac{5}{12}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $C$, so $\\overline{AB}=13$ is the hypotenuse and $\\overline{BC}$ and $\\overline{AC}$ are the legs.\nStep 2: The legs sum to $30-13=17$ and satisfy $BC^2+AC^2=169$. The pair is $5$ and $12$, since $5+12=17$ and $25+144=169$. The condition $BC<AC$ makes $BC=5$ and $AC=12$.\nStep 3: For angle $A$, the opposite leg is $\\overline{BC}=5$ and the adjacent leg is $\\overline{AC}=12$, so $\\tan A=\\frac{5}{12}$.\n\nCheck: $5+12+13=30$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{5}{13}$): divided by the hypotenuse, which produces $\\sin A$, not $\\tan A$.\n* Choice C ($\\frac{12}{13}$): used adjacent over hypotenuse, which is $\\cos A$.\n* Choice D ($\\frac{12}{5}$): swapped opposite and adjacent, giving the tangent of the other acute angle.\n\n**Test Day Takeaway:** Tangent uses only the two legs. Once the legs are known, the inequality in the problem tells you which leg faces the named angle.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-from-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-331",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A thermocouple mounting tab, drawn here, is a right triangle whose three edges total $154$ millimeters. The right angle of the tab is at vertex $B$, and only two of its three edges carry a labeled length. What is the value of $\\sin C$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [33, 0], [33, 56]], labels: ["A", "B", "C"], sideLabels: ["", "56", "65"], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$\\frac{33}{65}$" },
      // distractor: reports tan C = 33/56, opposite over adjacent
      { id: "B", text: "$\\frac{33}{56}$" },
      // distractor: reports cos C = 56/65, adjacent over hypotenuse
      { id: "C", text: "$\\frac{56}{65}$" },
      // distractor: inverts cos C, giving hypotenuse over adjacent
      { id: "D", text: "$\\frac{65}{56}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Trig Ratio from Perimeter**\n\n**Choice A is correct.**\n\n**The Fast Way (~35s):** The unlabeled edge is $154 - 56 - 65 = 33$, and it lies opposite angle $C$, so $\\sin C = \\frac{33}{65}$.\n\n**The Full Solution:**\nStep 1: Two edges are labeled $56$ and $65$ millimeters, so the third is $154 - 56 - 65 = 33$ millimeters.\nStep 2: The right angle is at $B$, so $\\overline{CA} = 65$ is the hypotenuse, $\\overline{AB} = 33$ is opposite angle $C$, and $\\overline{BC} = 56$ is adjacent to angle $C$.\nStep 3: $\\sin C = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{33}{65}$.\n\nCheck: $33^2 + 56^2 = 1{,}089 + 3{,}136 = 4{,}225 = 65^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{33}{56}$): divides the opposite leg by the adjacent leg, which is $\\tan C$.\n* Choice C ($\\frac{56}{65}$): uses the adjacent leg over the hypotenuse, which is $\\cos C$.\n* Choice D ($\\frac{65}{56}$): inverts $\\cos C$; a sine can never exceed $1$.\n\n**Test Day Takeaway:** Sine and cosine both sit over the hypotenuse, so the only decision left is which leg faces the angle.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-from-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-332",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The tile shown is trimmed to a right triangle whose edges, measured in inches, add to $40$. The right angle falls at vertex $B$, and angle $A$ is acute. What is the value of $\\tan A$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [8, 0], [8, 15]], labels: ["A", "B", "C"], sideLabels: ["8", "", "17"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports cos A = 8/17, adjacent over hypotenuse
      { id: "A", text: "$\\frac{8}{17}$" },
      // distractor: inverts the tangent, giving adjacent over opposite
      { id: "B", text: "$\\frac{8}{15}$" },
      // distractor: reports sin A = 15/17, opposite over hypotenuse
      { id: "C", text: "$\\frac{15}{17}$" },
      { id: "D", text: "$\\frac{15}{8}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Trig Ratio from Perimeter**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The unlabeled leg is $40 - 8 - 17 = 15$, so $\\tan A = \\frac{15}{8}$.\n\n**The Full Solution:**\nStep 1: The perimeter is $40$ inches and two edges measure $8$ and $17$, so $\\overline{BC} = 40 - 8 - 17 = 15$ inches.\nStep 2: With the right angle at $B$, the hypotenuse is $\\overline{CA} = 17$; relative to angle $A$ the opposite leg is $\\overline{BC} = 15$ and the adjacent leg is $\\overline{AB} = 8$.\nStep 3: $\\tan A = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{15}{8}$.\n\nCheck: $8^2 + 15^2 = 64 + 225 = 289 = 17^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{8}{17}$): uses the hypotenuse, giving $\\cos A$ instead of a tangent.\n* Choice B ($\\frac{8}{15}$): inverts the ratio, dividing adjacent by opposite.\n* Choice C ($\\frac{15}{17}$): uses the hypotenuse in the denominator, giving $\\sin A$.\n\n**Test Day Takeaway:** Tangent is the only basic ratio that never touches the hypotenuse.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-from-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-333",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A sheet-metal bracket is cut to the right-triangular outline shown, where each leg is labeled in terms of $x$ centimeters, the hypotenuse carries no label, and the outline's three edges total $30$ centimeters. The right angle lies at vertex $B$. What is the value of $\\tan A$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [12, 0], [12, 5]], labels: ["A", "B", "C"], sideLabels: ["x + 7", "x", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: reports sin A = 5/13, opposite over hypotenuse
      { id: "A", text: "$\\frac{5}{13}$" },
      { id: "B", text: "$\\frac{5}{12}$" },
      // distractor: reports cos A = 12/13, adjacent over hypotenuse
      { id: "C", text: "$\\frac{12}{13}$" },
      // distractor: inverts the tangent, dividing the adjacent leg by the opposite leg
      { id: "D", text: "$\\frac{12}{5}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Trig Ratio from Perimeter**\n\n**Choice B is correct.**\n\n**The Fast Way (~60s):** The legs $x$ and $x + 7$ with perimeter $30$ force the $5$-$12$-$13$ triple, so $\\tan A = \\frac{5}{12}$.\n\n**The Full Solution:**\nStep 1: The legs are $x$ and $x + 7$, so the hypotenuse is $30 - x - (x + 7) = 23 - 2x$.\nStep 2: The Pythagorean theorem gives $x^2 + (x+7)^2 = (23-2x)^2$, that is $2x^2 + 14x + 49 = 4x^2 - 92x + 529$, so $2x^2 - 106x + 480 = 0$ and $x^2 - 53x + 240 = 0$. Factoring gives $(x-5)(x-48) = 0$, and $x = 48$ is impossible in a perimeter of $30$, so $x = 5$.\nStep 3: The legs are $5$ and $12$ and the hypotenuse is $13$. Angle $A$ faces $\\overline{BC} = x = 5$ and sits beside $\\overline{AB} = x + 7 = 12$, so $\\tan A = \\frac{5}{12}$.\n\nCheck: $5 + 12 + 13 = 30$ and $5^2 + 12^2 = 169 = 13^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{5}{13}$): divides the opposite leg by the hypotenuse, which is $\\sin A$.\n* Choice C ($\\frac{12}{13}$): divides the adjacent leg by the hypotenuse, which is $\\cos A$.\n* Choice D ($\\frac{12}{5}$): inverts the tangent by putting the adjacent leg on top.\n\n**Test Day Takeaway:** When both legs carry the same variable, write the hypotenuse from the perimeter and let the Pythagorean theorem finish the job.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-from-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-334",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The splitter plate in a wind tunnel has the right-triangular face drawn here, with the right angle at $Q$ and the hypotenuse marked in centimeters. The three edges of the face total $56$ centimeters, and neither leg is labeled. What is the value of $\\cos R$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [24, 0], [24, 7]], labels: ["P", "Q", "R"], sideLabels: ["", "", "25"], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$\\frac{7}{25}$" },
      // distractor: reports tan R = 7/24, opposite over adjacent for the wrong pairing
      { id: "B", text: "$\\frac{7}{24}$" },
      // distractor: reports sin R = 24/25, the leg opposite R over the hypotenuse
      { id: "C", text: "$\\frac{24}{25}$" },
      // distractor: inverts cos R, giving hypotenuse over adjacent
      { id: "D", text: "$\\frac{25}{7}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Trig Ratio from Perimeter**\n\n**Choice A is correct.**\n\n**The Fast Way (~60s):** The legs sum to $31$ and their squares sum to $625$, so their product is $\\frac{31^2 - 625}{2} = 168$, giving legs $7$ and $24$ and $\\cos R = \\frac{7}{25}$.\n\n**The Full Solution:**\nStep 1: Call the legs $a$ and $b$. The perimeter gives $a + b = 56 - 25 = 31$, and the Pythagorean theorem gives $a^2 + b^2 = 25^2 = 625$.\nStep 2: Since $(a+b)^2 = a^2 + 2ab + b^2$, we get $961 = 625 + 2ab$, so $ab = 168$. The legs are the solutions of $t^2 - 31t + 168 = 0$, which factors as $(t-7)(t-24) = 0$, so the legs are $7$ and $24$ centimeters.\nStep 3: Angle $R$ sits between $\\overline{QR}$ and the hypotenuse $\\overline{RP} = 25$. The figure shows $\\overline{QR}$ as the shorter leg, $7$, so $\\cos R = \\frac{7}{25}$.\n\nCheck: $7 + 24 + 25 = 56$ and $7^2 + 24^2 = 49 + 576 = 625$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{7}{24}$): divides the two legs, which gives $\\tan R$ rather than a cosine.\n* Choice C ($\\frac{24}{25}$): uses the leg opposite $R$ over the hypotenuse, which is $\\sin R$.\n* Choice D ($\\frac{25}{7}$): inverts the ratio; a cosine can never exceed $1$.\n\n**Test Day Takeaway:** With a perimeter and a hypotenuse, $(a+b)^2 = a^2 + 2ab + b^2$ turns two facts into both legs.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-from-perimeter",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // --- trig-ratio-with-known-triple (4 → 10) ---
  {
    id: "bank-geo-335",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "A copper heat-sink fin is stamped in the profile drawn here, with all three edge lengths given in millimeters and the right angle at vertex $B$. What is the value of $\\cos A$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [21, 0], [21, 20]], labels: ["A", "B", "C"], sideLabels: ["21", "20", "29"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports sin A = 20/29, opposite over hypotenuse
      { id: "A", text: "$\\frac{20}{29}$" },
      { id: "B", text: "$\\frac{21}{29}$" },
      // distractor: reports tan A = 20/21, opposite over adjacent
      { id: "C", text: "$\\frac{20}{21}$" },
      // distractor: inverts cos A, giving hypotenuse over adjacent
      { id: "D", text: "$\\frac{29}{21}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Trig Ratio with Known Triple**\n\n**Choice B is correct.**\n\n**The Fast Way (~20s):** The leg beside angle $A$ is $21$ and the hypotenuse is $29$, so $\\cos A = \\frac{21}{29}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $B$, so the side opposite it, $\\overline{CA} = 29$, is the hypotenuse.\nStep 2: Angle $A$ lies between $\\overline{AB} = 21$ and the hypotenuse, so $21$ is the adjacent leg and $20$ is the opposite leg.\nStep 3: $\\cos A = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{21}{29}$.\n\nCheck: $20^2 + 21^2 = 400 + 441 = 841 = 29^2$, so $20$-$21$-$29$ is a Pythagorean triple. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{20}{29}$): uses the opposite leg over the hypotenuse, which is $\\sin A$.\n* Choice C ($\\frac{20}{21}$): divides the two legs, which is $\\tan A$.\n* Choice D ($\\frac{29}{21}$): inverts the ratio; a cosine is never greater than $1$.\n\n**Test Day Takeaway:** Find the hypotenuse first by locating the right angle, then read adjacent and opposite from the angle named.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-with-known-triple",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-336",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "The carbide insert drawn here has three labeled edges, each given in millimeters, and its right angle falls at vertex $B$. What is the value of $\\sin A$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [35, 0], [35, 12]], labels: ["A", "B", "C"], sideLabels: ["35", "12", "37"], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$\\frac{12}{37}$" },
      // distractor: reports tan A = 12/35, opposite over adjacent
      { id: "B", text: "$\\frac{12}{35}$" },
      // distractor: reports cos A = 35/37, adjacent over hypotenuse
      { id: "C", text: "$\\frac{35}{37}$" },
      // distractor: inverts sin A, giving hypotenuse over opposite
      { id: "D", text: "$\\frac{37}{12}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Trig Ratio with Known Triple**\n\n**Choice A is correct.**\n\n**The Fast Way (~20s):** The leg facing angle $A$ is $12$ and the hypotenuse is $37$, so $\\sin A = \\frac{12}{37}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $B$, so $\\overline{CA} = 37$ is the hypotenuse.\nStep 2: The leg opposite angle $A$ is $\\overline{BC} = 12$, and the leg adjacent to angle $A$ is $\\overline{AB} = 35$.\nStep 3: $\\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{12}{37}$.\n\nCheck: $12^2 + 35^2 = 144 + 1{,}225 = 1{,}369 = 37^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{12}{35}$): divides the two legs, which gives $\\tan A$.\n* Choice C ($\\frac{35}{37}$): uses the adjacent leg over the hypotenuse, which is $\\cos A$.\n* Choice D ($\\frac{37}{12}$): inverts the ratio; a sine is never greater than $1$.\n\n**Test Day Takeaway:** Opposite means across the triangle from the named angle, not merely the nearest labeled side.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-with-known-triple",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-337",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "easy",
    type: "multiple-choice",
    question: "Triangle $RST$ has a right angle at $T$, with $RT=4$ and $ST=3$. What is the value of $\\tan R$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [4, 0], [4, 3]], labels: ["R", "T", "S"], sideLabels: ["4", "3", ""], rightAngleVertex: 1, figureNote: true } },
    choices: [
      // distractor: gives sine instead of tangent
      { id: "A", text: "$\\frac{3}{5}$" },
      { id: "B", text: "$\\frac{3}{4}$" },
      // distractor: gives cosine instead of tangent
      { id: "C", text: "$\\frac{4}{5}$" },
      // distractor: swaps opposite and adjacent
      { id: "D", text: "$\\frac{4}{3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Trig Ratio with Known Triple**\n\n**Choice B is correct.**\n\n**The Fast Way (~10s):** For angle $R$, the opposite leg is $\\overline{ST}=3$ and the adjacent leg is $\\overline{RT}=4$, so $\\tan R=\\frac{3}{4}$.\n\n**The Full Solution:**\nStep 1: The right angle sits at $T$, so $\\overline{RT}$ and $\\overline{ST}$ are the legs and $\\overline{RS}$ is the hypotenuse.\nStep 2: Angle $R$ touches $\\overline{RT}$ and $\\overline{RS}$, so the leg opposite it is $\\overline{ST}=3$ and the leg adjacent to it is $\\overline{RT}=4$.\nStep 3: Tangent is opposite over adjacent: $\\tan R=\\frac{3}{4}$.\n\nCheck: the hypotenuse is $\\sqrt{3^2+4^2}=5$, the familiar $3$, $4$, $5$ triple. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3}{5}$): divided the opposite leg by the hypotenuse, which is $\\sin R$.\n* Choice C ($\\frac{4}{5}$): divided the adjacent leg by the hypotenuse, which is $\\cos R$.\n* Choice D ($\\frac{4}{3}$): swapped opposite and adjacent, giving $\\tan S$ instead.\n\n**Test Day Takeaway:** Tangent needs no hypotenuse. When both legs are given and a tangent is asked for, there is nothing left to compute.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-with-known-triple",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-338",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "A composite shear web is trimmed to the outline drawn here, in which only two of the three edges carry a length in centimeters. The right angle of the outline is at vertex $Q$. What is the value of $\\tan P$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [28, 0], [28, 45]], labels: ["P", "Q", "R"], sideLabels: ["", "45", "53"], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports cos P = 28/53, adjacent over hypotenuse
      { id: "A", text: "$\\frac{28}{53}$" },
      // distractor: inverts the tangent, dividing the adjacent leg by the opposite leg
      { id: "B", text: "$\\frac{28}{45}$" },
      // distractor: reports sin P = 45/53, opposite over hypotenuse
      { id: "C", text: "$\\frac{45}{53}$" },
      { id: "D", text: "$\\frac{45}{28}$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Trig Ratio with Known Triple**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The missing leg is $\\sqrt{53^2 - 45^2} = 28$, so $\\tan P = \\frac{45}{28}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $Q$, so $\\overline{RP} = 53$ is the hypotenuse and $\\overline{QR} = 45$ is a leg.\nStep 2: The unlabeled leg is $\\overline{PQ} = \\sqrt{53^2 - 45^2} = \\sqrt{2{,}809 - 2{,}025} = \\sqrt{784} = 28$ centimeters.\nStep 3: Relative to angle $P$ the opposite leg is $45$ and the adjacent leg is $28$, so $\\tan P = \\frac{45}{28}$.\n\nCheck: $28^2 + 45^2 = 784 + 2{,}025 = 2{,}809 = 53^2$, so $28$-$45$-$53$ is a Pythagorean triple. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{28}{53}$): uses the hypotenuse in the denominator, giving $\\cos P$.\n* Choice B ($\\frac{28}{45}$): inverts the tangent by dividing adjacent by opposite.\n* Choice C ($\\frac{45}{53}$): uses the hypotenuse in the denominator, giving $\\sin P$.\n\n**Test Day Takeaway:** Recover the missing side before choosing a ratio; a tangent needs both legs and neither is optional.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-with-known-triple",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-339",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "medium",
    type: "multiple-choice",
    question: "The ground cross section of a rolled-steel chock appears here; both of its legs are labeled in centimeters, vertex $Y$ holds the right angle, and the hypotenuse carries no label. What is the value of $\\sin X$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [48, 0], [48, 55]], labels: ["X", "Y", "Z"], sideLabels: ["48", "55", ""], rightAngleVertex: 1 } },
    choices: [
      // distractor: reports cos X = 48/73, adjacent over hypotenuse
      { id: "A", text: "$\\frac{48}{73}$" },
      { id: "B", text: "$\\frac{55}{73}$" },
      // distractor: divides the adjacent leg by the opposite leg, the reciprocal of tan X
      { id: "C", text: "$\\frac{48}{55}$" },
      // distractor: inverts sin X, giving hypotenuse over opposite
      { id: "D", text: "$\\frac{73}{55}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Trig Ratio with Known Triple**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** The hypotenuse is $\\sqrt{48^2 + 55^2} = 73$, so $\\sin X = \\frac{55}{73}$.\n\n**The Full Solution:**\nStep 1: The legs $\\overline{XY} = 48$ and $\\overline{YZ} = 55$ meet at the right angle at $Y$.\nStep 2: The hypotenuse is $\\overline{ZX} = \\sqrt{48^2 + 55^2} = \\sqrt{2{,}304 + 3{,}025} = \\sqrt{5{,}329} = 73$ centimeters.\nStep 3: The leg opposite angle $X$ is $\\overline{YZ} = 55$, so $\\sin X = \\frac{55}{73}$.\n\nCheck: $\\frac{55}{73} \\approx 0.753$, and since angle $X$ faces the longer leg its sine should exceed $\\frac{\\sqrt{2}}{2} \\approx 0.707$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{48}{73}$): uses the adjacent leg over the hypotenuse, which is $\\cos X$.\n* Choice C ($\\frac{48}{55}$): divides the two legs, and in the wrong order at that.\n* Choice D ($\\frac{73}{55}$): inverts the ratio; a sine is never greater than $1$.\n\n**Test Day Takeaway:** When only the legs are given, build the hypotenuse first; sine and cosine both require it.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-with-known-triple",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  {
    id: "bank-geo-340",
    domain: "geometry",
    skills: ["soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A conveyor guard panel is cut to the outline drawn here, with the hypotenuse marked in millimeters, both legs unlabeled, and the right angle at vertex $Y$. Leg $\\overline{XY}$ runs $41$ millimeters longer than leg $\\overline{YZ}$. What is the value of $\\cos Z$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [77, 0], [77, 36]], labels: ["X", "Y", "Z"], sideLabels: ["", "", "85"], rightAngleVertex: 1 } },
    choices: [
      { id: "A", text: "$\\frac{36}{85}$" },
      // distractor: reports tan Z = 36/77, the two legs divided rather than a cosine
      { id: "B", text: "$\\frac{36}{77}$" },
      // distractor: reports sin Z = 77/85, the leg opposite Z over the hypotenuse
      { id: "C", text: "$\\frac{77}{85}$" },
      // distractor: inverts cos Z, giving hypotenuse over adjacent
      { id: "D", text: "$\\frac{85}{36}$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Trig Ratio with Known Triple**\n\n**Choice A is correct.**\n\n**The Fast Way (~60s):** Solving $a^2 + (a+41)^2 = 85^2$ gives legs $36$ and $77$, and the leg beside angle $Z$ is $36$, so $\\cos Z = \\frac{36}{85}$.\n\n**The Full Solution:**\nStep 1: Let $\\overline{YZ} = a$, so $\\overline{XY} = a + 41$ and the hypotenuse $\\overline{ZX} = 85$.\nStep 2: The Pythagorean theorem gives $a^2 + (a+41)^2 = 7{,}225$, so $2a^2 + 82a + 1{,}681 = 7{,}225$, that is $a^2 + 41a - 2{,}772 = 0$. Factoring gives $(a - 36)(a + 77) = 0$, and a length must be positive, so $a = 36$ and the other leg is $77$ millimeters.\nStep 3: Angle $Z$ lies between $\\overline{YZ} = 36$ and the hypotenuse $85$, so $\\cos Z = \\frac{36}{85}$.\n\nCheck: $36^2 + 77^2 = 1{,}296 + 5{,}929 = 7{,}225 = 85^2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{36}{77}$): divides the two legs, which gives $\\tan Z$.\n* Choice C ($\\frac{77}{85}$): uses the leg opposite $Z$ over the hypotenuse, which is $\\sin Z$ and belongs to the other acute angle's cosine.\n* Choice D ($\\frac{85}{36}$): inverts the ratio; a cosine can never exceed $1$.\n\n**Test Day Takeaway:** A stated difference between two legs plus the hypotenuse is a quadratic in disguise; solve it before touching any ratio.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "trig-ratio-with-known-triple",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-21"
  },

  // === DIFFICULT-QUESTIONS PDF BATCH (2026-05-22) — 14 geometry items reskinned ===

  {
    id: "bank-geo-341",
    domain: "geometry",
    skills: ["circle-area", "volume-scaling"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Two similar cylindrical carding drums stand in a finishing room, and the area of the larger drum's circular base is $\\frac{9}{4}$ times the area of the smaller drum's base. The larger drum's volume is $n$ times the smaller drum's volume. What is the value of $n$?",
    choices: [
      // distractor: reports the linear ratio 3/2 instead of the volume ratio
      { id: "A", text: "$1.5$" },
      // distractor: reports the base-area ratio 9/4 as though volume scaled like area
      { id: "B", text: "$2.25$" },
      { id: "C", text: "$3.375$" },
      // distractor: squares the area ratio, 2.25^2 = 5.0625, instead of cubing the linear ratio
      { id: "D", text: "$5.0625$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Similar-Figures Area Ratio**\n\n**Choice C is correct.**\n\n**The Fast Way (~40s):** Base areas give a linear ratio of $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$, so volumes are in the ratio $\\left(\\frac{3}{2}\\right)^3=\\frac{27}{8}=3.375$.\n\n**The Full Solution:**\n\nStep 1 — Move from areas to lengths. Base area is $\\pi r^2$, so $\\frac{\\pi R^2}{\\pi r^2}=\\frac{9}{4}$ gives $\\frac{R}{r}=\\frac{3}{2}$.\n\nStep 2 — Because the drums are similar, every length, including the height, scales by $\\frac{3}{2}$.\n\nStep 3 — Volume is a product of three lengths, so it scales by $\\left(\\frac{3}{2}\\right)^3=\\frac{27}{8}=3.375$, and $n=3.375$. Check: with $r=2$, $h=2$ and $R=3$, $H=3$, the volumes are $8\\pi$ and $27\\pi$, whose ratio is $3.375$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($1.5$): this stops at the linear ratio $\\frac{3}{2}$ and never raises it to the third power.\n* Choice B ($2.25$): this reuses the base-area ratio, which scales two dimensions, not three.\n* Choice D ($5.0625$): this squares the area ratio, $2.25^2$, mixing a fourth power into a three-dimensional comparison.\n\n**Test Day Takeaway:** Convert any given ratio back to a length ratio first; from there areas take the square and volumes the cube.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-figures-area-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-342",
    domain: "geometry",
    skills: ["radians-to-degrees", "radian-measure-understanding"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A robotic pipetting arm turns through $\\frac{5\\pi}{12}$ radians and then through $\\frac{7\\pi}{18}$ radians in the same direction. Through how many more degrees must it turn to complete a half revolution?",
    choices: [
      { id: "A", text: "$35$" },
      // distractor: converts only the first turn and subtracts it: 180 - 75
      { id: "B", text: "$105$" },
      // distractor: reports the total turn already made, 75 + 70, instead of what remains
      { id: "C", text: "$145$" },
      // distractor: measures the remainder against a full revolution: 360 - 145
      { id: "D", text: "$215$" }
    ],
    correctAnswer: "A",
    explanation: "**SAT Pattern: Radian Sum to Degrees**\n\n**Choice A is correct.** The two turns are $75^\\circ$ and $70^\\circ$, totaling $145^\\circ$, so $180 - 145 = 35$ degrees remain.\n\n**The Fast Way (~35s):** $\\frac{5\\pi}{12} \\to 75^\\circ$ and $\\frac{7\\pi}{18} \\to 70^\\circ$; a half revolution is $180^\\circ$, so $180 - 145 = 35$.\n\n**The Full Solution:**\n\nStep 1: Convert with $\\frac{180}{\\pi}$ degrees per radian: $\\frac{5\\pi}{12} \\cdot \\frac{180}{\\pi} = \\frac{900}{12} = 75^\\circ$.\n\nStep 2: Likewise $\\frac{7\\pi}{18} \\cdot \\frac{180}{\\pi} = \\frac{1260}{18} = 70^\\circ$, so the arm has turned $75 + 70 = 145^\\circ$.\n\nStep 3: A half revolution is $180^\\circ$, so the arm still needs $180 - 145 = 35$ degrees. Check: $145^\\circ + 35^\\circ = 180^\\circ$, and in radians $\\frac{5\\pi}{12} + \\frac{7\\pi}{18} = \\frac{15\\pi + 14\\pi}{36} = \\frac{29\\pi}{36}$, which is just under $\\pi$.\n\n**Why the wrong answers are tempting:**\n\n* Choice B ($105$): converts only the first turn and subtracts, $180 - 75$.\n* Choice C ($145$): reports the total already turned rather than what is left.\n* Choice D ($215$): measures the remainder against a full revolution, $360 - 145$, not a half one.\n\n**Test Day Takeaway:** Convert every radian measure to degrees first, add, and then answer the comparison the question sets — \"how much more\" is a subtraction, not the sum.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "radians-degrees-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-343",
    domain: "geometry",
    skills: ["volume-sphere", "volume-prism"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A spherical cavity inside a cube of basalt just touches each of the cube's six faces. If the cube's edge measures $s$ centimeters, which expression gives the number of cubic centimeters of basalt in the block?",
    choices: [
      // distractor: takes the sphere's radius as s/4 instead of s/2
      { id: "A", text: "$s^3\\left(1 - \\frac{\\pi}{48}\\right)$" },
      // distractor: drops the 4/3 from the sphere formula, computing pi times (s/2) cubed
      { id: "B", text: "$s^3\\left(1 - \\frac{\\pi}{8}\\right)$" },
      { id: "C", text: "$s^3\\left(1 - \\frac{\\pi}{6}\\right)$" },
      // distractor: uses the cube's full edge s as the sphere's radius
      { id: "D", text: "$s^3\\left(1 - \\frac{4\\pi}{3}\\right)$" }
    ],
    correctAnswer: "C",
    explanation: "**SAT Pattern: Composite Solid — Cube Minus Inscribed Sphere**\n\n**Choice C is correct.**\n\n**The Fast Way (~35s):** The sphere has radius $\\frac{s}{2}$, so its volume is $\\frac{4}{3}\\pi\\frac{s^3}{8} = \\frac{\\pi s^3}{6}$, leaving $s^3 - \\frac{\\pi s^3}{6}$.\n\n**The Full Solution:**\nStep 1: The cube's volume is $s^3$ cubic centimeters.\nStep 2: A sphere tangent to all six faces has diameter $s$, so its radius is $\\frac{s}{2}$ and its volume is $\\frac{4}{3}\\pi\\left(\\frac{s}{2}\\right)^3 = \\frac{4\\pi s^3}{24} = \\frac{\\pi s^3}{6}$.\nStep 3: Subtract: $s^3 - \\frac{\\pi s^3}{6} = s^3\\left(1 - \\frac{\\pi}{6}\\right)$. Check: $\\frac{\\pi}{6} \\approx 0.524$, so about $48\\%$ of the block remains — a positive amount, as it must be ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: halves the edge twice, using $r = \\frac{s}{4}$ and shrinking the cavity by a factor of $8$.\n* Choice B: drops the $\\frac{4}{3}$ and computes the cavity as $\\pi\\left(\\frac{s}{2}\\right)^3 = \\frac{\\pi s^3}{8}$.\n* Choice D: uses $r = s$; that sphere would not fit inside the cube at all, and the expression even turns negative.\n\n**Test Day Takeaway:** A sphere inscribed in a cube has DIAMETER equal to the edge — cube the whole fraction $\\frac{s}{2}$, denominator included.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "composite-solid",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-344",
    domain: "geometry",
    skills: ["function-transformations"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A rational function $p$ is defined by $p(x)=\\dfrac{c}{x-3}$ for some constant $c$. Its graph in the $xy$-plane contains the point $(7,\\,15)$. If the graph of $y=q(x)$ is the image of the graph of $y=p(x)$ under a translation $11$ units to the left, which equation defines $q$?",
    choices: [
      // distractor: translates right instead of left
      { id: "A", text: "$q(x)=\\dfrac{60}{x-14}$" },
      { id: "B", text: "$q(x)=\\dfrac{60}{x+8}$" },
      // distractor: replaces the original constant with the shift
      { id: "C", text: "$q(x)=\\dfrac{60}{x+11}$" },
      // distractor: adds the shift to the numerator
      { id: "D", text: "$q(x)=\\dfrac{71}{x-3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Horizontal Shift of a Rational Function**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** From $\\frac{c}{7-3}=15$, $c=60$. Translating left $11$ replaces $x$ with $x+11$, so the denominator becomes $(x+11)-3=x+8$ and $q(x)=\\frac{60}{x+8}$.\n\n**The Full Solution:**\nStep 1: The point $(7,\\,15)$ is on the graph of $p$, so $p(7)=15$. Substituting gives $\\frac{c}{7-3}=15$, that is $\\frac{c}{4}=15$, so $c=60$ and $p(x)=\\frac{60}{x-3}$.\nStep 2: A translation of $11$ units to the left sends the graph of $y=p(x)$ to the graph of $y=p(x+11)$.\nStep 3: $q(x)=p(x+11)=\\frac{60}{(x+11)-3}=\\frac{60}{x+8}$.\n\nCheck: the point $(7,\\,15)$ moves to $(-4,\\,15)$, and $q(-4)=\\frac{60}{-4+8}=\\frac{60}{4}=15$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($q(x)=\\frac{60}{x-14}$): replaced $x$ with $x-11$, which translates the graph $11$ units to the right instead of left.\n* Choice C ($q(x)=\\frac{60}{x+11}$): dropped the original $-3$ and used the shift alone as the constant in the denominator.\n* Choice D ($q(x)=\\frac{71}{x-3}$): added $11$ to the numerator, which stretches the graph vertically rather than sliding it sideways.\n\n**Test Day Takeaway:** A horizontal shift acts on the input, so substitute $x+11$ for every $x$ and then simplify. The constants combine; the earlier one does not disappear.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-shifted-graph",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-345",
    domain: "geometry",
    skills: ["special-right-triangles", "pythagorean-theorem"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The trim around a triangular bulletin board in a school hallway totals $24+24\\sqrt{2}$ inches, and the board's two congruent sides meet at a right angle. How many inches long is each congruent side?",
    choices: [
      // distractor: halves the rational part 24 of the perimeter
      { id: "A", text: "$12$" },
      { id: "B", text: "$12\\sqrt{2}$" },
      // distractor: takes the rational part 24, which is the hypotenuse, as a leg
      { id: "C", text: "$24$" },
      // distractor: takes the whole irrational part 24 root 2 as one leg
      { id: "D", text: "$24\\sqrt{2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: 45-45-90 Triangle — Perimeter to Leg**\n\n**Choice B is correct.**\n\n**The Fast Way (~50s):** With leg $L$ the perimeter is $2L+L\\sqrt{2}$; matching $2L=24\\sqrt{2}$ gives $L=12\\sqrt{2}$, and then $L\\sqrt{2}=24$ matches the rational part.\n\n**The Full Solution:**\n\nStep 1: Write the perimeter. Two congruent legs $L$ and hypotenuse $L\\sqrt{2}$ give $P=2L+L\\sqrt{2}$.\n\nStep 2: Set up the equation. $L(2+\\sqrt{2})=24+24\\sqrt{2}$, so $L=\\frac{24+24\\sqrt{2}}{2+\\sqrt{2}}$.\n\nStep 3: Rationalize. Multiplying numerator and denominator by $2-\\sqrt{2}$ gives $L=\\frac{(24+24\\sqrt{2})(2-\\sqrt{2})}{2}=\\frac{24\\sqrt{2}}{2}=12\\sqrt{2}$ inches.\n\nCheck: $2(12\\sqrt{2})+12\\sqrt{2}\\cdot\\sqrt{2}=24\\sqrt{2}+24$, exactly the given trim length.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($12$): halves the rational part $24$ of the perimeter and calls that a leg.\n* Choice C ($24$): reads the rational part $24$ as a leg, but $24$ is the hypotenuse of this triangle.\n* Choice D ($24\\sqrt{2}$): hands the entire irrational part of the perimeter to a single side instead of splitting it between the two legs.\n\n**Test Day Takeaway:** In a $45$-$45$-$90$ perimeter, the two legs carry the $\\sqrt{2}$ term and the hypotenuse carries the rational term — match the parts instead of guessing.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-346",
    domain: "geometry",
    skills: ["volume-prism"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A packaging line at a fabric mill glues two identical cubical shipping cartons of edge $n$ centimeters face to face to form a single rectangular box. Which expression gives the surface area, in square centimeters, of that box?",
    choices: [
      // distractor: removes four faces at the joint instead of the two that actually disappear
      { id: "A", text: "$8n^2$" },
      { id: "B", text: "$10n^2$" },
      // distractor: removes only one of the two faces hidden by the glued joint
      { id: "C", text: "$11n^2$" },
      // distractor: adds the two cubes' surface areas and never removes the glued faces
      { id: "D", text: "$12n^2$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Surface Area of Glued Prisms**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Two cubes show $12n^2$ of face area, and gluing hides one face on each cube, so the box shows $12n^2-2n^2=10n^2$ square centimeters.\n\n**The Full Solution:**\n\nStep 1 — One cube of edge $n$ has surface area $6n^2$, so two separate cubes have $12n^2$.\n\nStep 2 — Gluing them face to face buries exactly two faces, one from each cube, removing $2n^2$ from the visible area.\n\nStep 3 — The box's surface area is $12n^2-2n^2=10n^2$ square centimeters. Check directly: the box is $n$ by $n$ by $2n$, with surface area $2(n\\cdot n)+4(n\\cdot 2n)=2n^2+8n^2=10n^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($8n^2$): this removes four faces, as if both faces on each cube vanished.\n* Choice C ($11n^2$): this removes only one face, forgetting that each cube gives up one.\n* Choice D ($12n^2$): this adds the two cubes' surface areas and ignores the joint entirely.\n\n**Test Day Takeaway:** Every glued joint hides two faces, one on each solid — subtract twice the contact area, not once.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "composite-solid",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-347",
    domain: "geometry",
    skills: ["radian-measure-understanding", "soh-cah-toa"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A harbor radar antenna turns counterclockwise through an angle of $\\frac{29\\pi}{6}$ radians from its rest position. What is the value of the tangent of that angle?",
    choices: [
      // distractor: reports the reciprocal, the tangent of 2 pi over 3
      { id: "A", text: "$-\\sqrt{3}$" },
      { id: "B", text: "$-\\frac{\\sqrt{3}}{3}$" },
      // distractor: drops the negative sign, treating 5 pi over 6 as a first-quadrant angle
      { id: "C", text: "$\\frac{\\sqrt{3}}{3}$" },
      // distractor: uses pi over 3 as the reference angle instead of pi over 6
      { id: "D", text: "$\\sqrt{3}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Coterminal-Angle Reduction for Tangent**\n\n**Choice B is correct.**\n\n**The Fast Way (~30s):** Subtract $4\\pi = \\frac{24\\pi}{6}$ to land at $\\frac{5\\pi}{6}$, a second-quadrant angle with reference $\\frac{\\pi}{6}$, so the tangent is $-\\frac{\\sqrt{3}}{3}$.\n\n**The Full Solution:**\nStep 1: Angles that differ by a whole number of full turns share the same tangent, so subtract $4\\pi$: $\\frac{29\\pi}{6} - \\frac{24\\pi}{6} = \\frac{5\\pi}{6}$.\nStep 2: $\\frac{5\\pi}{6}$ lies in the second quadrant, where tangent is negative, and its reference angle is $\\pi - \\frac{5\\pi}{6} = \\frac{\\pi}{6}$.\nStep 3: Since $\\tan\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{3}$, the answer is $-\\frac{\\sqrt{3}}{3}$. Check: $\\frac{5\\pi}{6} = 150^{\\circ}$, and $\\tan 150^{\\circ} \\approx -0.577$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\sqrt{3}$): has the right sign but the reciprocal size; it is $\\tan\\frac{2\\pi}{3}$, not $\\tan\\frac{5\\pi}{6}$.\n* Choice C ($\\frac{\\sqrt{3}}{3}$): finds the reference value but ignores that the second quadrant makes tangent negative.\n* Choice D ($\\sqrt{3}$): uses $\\frac{\\pi}{3}$ as the reference angle and keeps it positive.\n\n**Test Day Takeaway:** Strip whole turns first, then name the quadrant and the reference angle — the quadrant fixes the sign, the reference angle fixes the size.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "radians-degrees-conversion",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-348",
    domain: "geometry",
    skills: ["soh-cah-toa", "triangle-types"],
    difficulty: "hard",
    type: "fill-in",
    question: "In right triangle $LMN$, the right angle is at $N$, $LM=40$, and $MN=24$. What is the value of $\\tan L$?",
    diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [32, 0], [32, 24]], labels: ["L", "N", "M"], sideLabels: ["", "24", "40"], rightAngleVertex: 1, figureNote: true } },
    correctAnswer: "3/4",
    explanation: "**SAT Pattern: Direct Trig Ratio**\n\n**The correct answer is $\\frac{3}{4}$.**\n\n**The Fast Way (~30s):** $\\overline{LM}=40$ is the hypotenuse, so $LN=\\sqrt{40^2-24^2}=32$. For angle $L$, opposite is $24$ and adjacent is $32$, giving $\\tan L=\\frac{24}{32}=\\frac{3}{4}$.\n\n**The Full Solution:**\nStep 1: The right angle is at $N$, so $\\overline{LM}$ is the hypotenuse and $\\overline{MN}$ and $\\overline{LN}$ are the legs.\nStep 2: Tangent needs both legs, and only one is given, so find the other: $LN^2=40^2-24^2=1{,}600-576=1{,}024$, so $LN=32$.\nStep 3: Angle $L$ touches $\\overline{LN}$ and $\\overline{LM}$, so the leg opposite $L$ is $\\overline{MN}=24$ and the leg adjacent to $L$ is $\\overline{LN}=32$. Then $\\tan L=\\frac{24}{32}=\\frac{3}{4}$.\n\nCheck: $24$, $32$, $40$ is the $3$, $4$, $5$ triple scaled by $8$. $\\checkmark$\n\n**Common Mistakes:** Reporting $\\frac{3}{5}$ by dividing the opposite leg by the hypotenuse, $\\frac{24}{40}$, which is $\\sin L$ rather than $\\tan L$; reporting $\\frac{4}{3}$ by inverting the ratio, $\\frac{32}{24}$, which is the tangent of angle $M$; reporting $\\frac{4}{5}$ by using $\\frac{32}{40}$, which is $\\cos L$.\n\n**Test Day Takeaway:** Tangent needs the two legs, so when a hypotenuse is given instead, spend one Pythagorean step to recover the missing leg before writing the ratio.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "direct-trig-ratio",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-349",
    domain: "geometry",
    skills: ["circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "The edge of a tidal mudflat is modeled in the $xy$-plane by $(x + 9)^2 + (y - 4)^2 = 625$, where $x$ and $y$ are in meters, and a dredged channel follows the line $y = 28$. What is the greatest value of $x$ for a point lying on both the edge and the channel?",
    choices: [
      // distractor: reports the smaller of the two solutions, -16, instead of the greater
      { id: "A", text: "$-16$" },
      { id: "B", text: "$-2$" },
      // distractor: solves for x + 9 = 7 and reports 7 without subtracting 9
      { id: "C", text: "$7$" },
      // distractor: reports the radius 25 of the mudflat edge
      { id: "D", text: "$25$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Circle in Standard Form — $x$-range**\n\n**Choice B is correct.**\n\n**The Fast Way (~35s):** Substituting $y = 28$ gives $(x + 9)^2 = 625 - 576 = 49$, so $x + 9 = \\pm 7$ and the greater value is $x = -2$.\n\n**The Full Solution:**\nStep 1: The edge has center $(-9, 4)$ and radius $\\sqrt{625} = 25$ meters, so its points satisfy $-34 \\le x \\le 16$.\nStep 2: Set $y = 28$: $(x + 9)^2 + (28 - 4)^2 = 625$, so $(x + 9)^2 + 576 = 625$ and $(x + 9)^2 = 49$.\nStep 3: Then $x + 9 = 7$ or $x + 9 = -7$, giving $x = -2$ or $x = -16$; the greater is $-2$. Check: $(-2 + 9)^2 + 24^2 = 49 + 576 = 625$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-16$): takes the negative square root and reports the smaller crossing point.\n* Choice C ($7$): stops at $x + 9 = 7$ and never subtracts the $9$.\n* Choice D ($25$): reports the radius, which is the greatest possible value of $x$ only for a circle centered on the $y$-axis.\n\n**Test Day Takeaway:** Fixing $y$ turns a circle into a quadratic in $x$ with two roots — solve for the binomial, then undo the shift and pick the root the question asks for.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "circle-in-standard-form",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-350",
    domain: "geometry",
    skills: ["function-evaluation", "roots-from-factors"],
    difficulty: "hard",
    type: "fill-in",
    question: "A storage array's net annual cost change, in thousands of dollars, when $x$ drives are added is modeled by $C(x) = 2x^2 + bx - 30$, where $b$ is a constant, and the change is $0$ when $x = 3$. What is the value of $C(5)$?",
    correctAnswer: "40",
    explanation: "**SAT Pattern: Recover Parameter from Known Root, then Evaluate**\n\n**The correct answer is $40$.**\n\n**The Fast Way (~40s):** $C(3) = 0$ gives $18 + 3b - 30 = 0$, so $b = 4$; then $C(5) = 50 + 20 - 30 = 40$.\n\n**The Full Solution:**\n\nStep 1: Substitute the known zero: $C(3) = 2(3)^2 + 3b - 30 = 18 + 3b - 30 = 3b - 12$.\n\nStep 2: Set $3b - 12 = 0$, so $b = 4$ and $C(x) = 2x^2 + 4x - 30$.\n\nStep 3: Evaluate at $x = 5$: $2(25) + 4(5) - 30 = 50 + 20 - 30 = 40$. Check: $C(3) = 18 + 12 - 30 = 0$, as given.\n\n**Common Mistakes:**\n\n* $0$ — a sign slip that yields $b = -4$, making $C(5) = 50 - 20 - 30 = 0$.\n* $55$ — dropping the leading coefficient $2$ when solving for $b$, which gives $b = 7$ and $C(5) = 50 + 35 - 30 = 55$.\n* $4$ — reporting the recovered constant $b$ instead of evaluating the model.\n\n**Test Day Takeaway:** A known zero is one equation in one unknown constant — solve it first, rewrite the whole function, and only then evaluate where the question points.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "function-from-conditions",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-351",
    domain: "geometry",
    skills: ["special-right-triangles", "circle-area", "rectangle-area"],
    difficulty: "hard",
    type: "fill-in",
    question: "A rectangular library atrium has a diagonal twice as long as its shorter side, and a circular skylight of area $36\\pi$ square feet is set into its ceiling. The atrium's shorter side is $4$ times the skylight's radius, and the atrium's floor area is $k\\sqrt{3}$ square feet. What is the value of $k$?",
    correctAnswer: "576",
    explanation: "**SAT Pattern: 30-60-90 from Diagonal-to-Side Ratio**\n\n**The correct answer is $576$.**\n\n**The Fast Way (~60s):** The skylight radius is $6$, so the shorter side is $24$; a diagonal of $2\\times$ the shorter side makes a $30$-$60$-$90$ triangle, so the longer side is $24\\sqrt{3}$ and the area is $576\\sqrt{3}$.\n\n**The Full Solution:**\n\nStep 1: Find the skylight radius. $\\pi r^{2}=36\\pi$ gives $r^{2}=36$ and $r=6$ feet.\n\nStep 2: Find the atrium's shorter side. It is $4r=4(6)=24$ feet, and the diagonal is $2(24)=48$ feet.\n\nStep 3: A rectangle whose diagonal is twice a side splits into $30$-$60$-$90$ triangles, so the longer side is $24\\sqrt{3}$ feet. The floor area is $24 \\cdot 24\\sqrt{3}=576\\sqrt{3}$, so $k=576$.\n\nCheck: $24^{2}+(24\\sqrt{3})^{2}=576+1728=2304=48^{2}$, so the diagonal is indeed $48$.\n\n**Common Mistakes:**\n\n* $144$: uses the skylight's diameter, $12$, as the atrium's shorter side, giving $12 \\cdot 12\\sqrt{3}=144\\sqrt{3}$.\n* $192$: inverts the ratio and takes the longer side as $\\frac{24}{\\sqrt{3}}=8\\sqrt{3}$, giving $24 \\cdot 8\\sqrt{3}=192\\sqrt{3}$.\n* $36$: forgets the factor of $4$ and uses the radius $6$ itself as the shorter side.\n\n**Test Day Takeaway:** A diagonal exactly twice a side is the signature of a $30$-$60$-$90$ triangle: the other side is that short side times $\\sqrt{3}$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-352",
    domain: "geometry",
    skills: ["tangent-lines", "circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A drone's circular no-fly zone above a resort is modeled in the $xy$-plane by $(x-3)^2+(y+2)^2=25$, with coordinates in kilometers. A straight service road follows the line $x=k$ and meets the zone at exactly one point. If $k>0$, what is the value of $k$?",
    choices: [
      // distractor: gives the other vertical tangent, x = 3 - 5 = -2, ignoring the condition k > 0
      { id: "A", text: "$-2$" },
      // distractor: reports the center's x-coordinate rather than a tangent line
      { id: "B", text: "$3$" },
      // distractor: reports the radius 5 instead of the tangent line's x-value
      { id: "C", text: "$5$" },
      { id: "D", text: "$8$" }
    ],
    correctAnswer: "D",
    explanation: "**SAT Pattern: Tangent Line to a Circle**\n\n**Choice D is correct.**\n\n**The Fast Way (~35s):** The circle is centered at $(3,-2)$ with radius $5$, so the vertical tangents are $x=3\\pm 5$, and the positive one is $x=8$.\n\n**The Full Solution:**\n\nStep 1 — Read the circle: $(x-3)^2+(y+2)^2=25$ has center $(3,-2)$ and radius $\\sqrt{25}=5$.\n\nStep 2 — A vertical line $x=k$ touches the circle at exactly one point when its distance from the center equals the radius, so $|k-3|=5$.\n\nStep 3 — Solve: $k-3=5$ or $k-3=-5$, giving $k=8$ or $k=-2$. Since $k>0$, $k=8$. Check: substituting $x=8$ gives $25+(y+2)^2=25$, so $y=-2$ is the only solution — exactly one point.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($-2$): this is the other vertical tangent and violates $k>0$.\n* Choice B ($3$): this is the center's $x$-coordinate, a line that cuts the circle in two points.\n* Choice C ($5$): this reports the radius rather than a location.\n\n**Test Day Takeaway:** A vertical tangent sits one radius left or right of the center — read the center and radius straight off the standard form.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "tangent-line-to-circle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-353",
    domain: "geometry",
    skills: ["special-right-triangles", "circle-equation"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "Two perpendicular guide rails run from the center of a circular sample turntable to its rim, and the quarter region between them has area $20.25\\pi$ square centimeters. What is the straight-line distance, in centimeters, between the rails' outer ends?",
    diagram: { type: "circleWithSector", params: { centralAngle: 90, angleLabel: "90°", showAngleLabel: true, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
    choices: [
      // distractor: reports the radius and stops before crossing the right triangle at the center
      { id: "A", text: "$9$" },
      { id: "B", text: "$9\\sqrt{2}$" },
      // distractor: reports the diameter, twice the radius, instead of the chord
      { id: "C", text: "$18$" },
      // distractor: doubles the chord by using 18 as the radius
      { id: "D", text: "$18\\sqrt{2}$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Right Triangle at Center — Chord Length**\n\n**Choice B is correct.** A quarter of the disk has area $\\frac{\\pi r^2}{4} = 20.25\\pi$, so $r = 9$, and the chord joining the two rail ends is $9\\sqrt{2}$ centimeters.\n\n**The Fast Way (~40s):** $r^2 = 81$ gives $r = 9$; the two radii and the chord form a $45$-$45$-$90$ triangle, so the chord is $9\\sqrt{2}$.\n\n**The Full Solution:**\n\nStep 1: The rails are perpendicular, so the region between them is a quarter of the disk: $\\frac{1}{4}\\pi r^2 = 20.25\\pi$.\n\nStep 2: Divide by $\\pi$ and multiply by $4$: $r^2 = 81$, so $r = 9$ centimeters.\n\nStep 3: The two radii and the segment joining their outer ends form an isosceles right triangle with legs $9$, so the segment is $9\\sqrt{2}$ centimeters. Check: $9^2 + 9^2 = 162 = (9\\sqrt{2})^2$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($9$): reports the radius rather than the distance across the opening.\n* Choice C ($18$): reports the diameter, which is the distance between opposite rim points, not perpendicular ones.\n* Choice D ($18\\sqrt{2}$): uses $18$ as the radius, doubling the chord.\n\n**Test Day Takeaway:** Two radii and a chord always form an isosceles triangle; when the central angle is $90^\\circ$ that triangle is $45$-$45$-$90$ and the chord is $r\\sqrt{2}$.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "45-45-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-354",
    domain: "geometry",
    skills: ["special-right-triangles", "circle-equation"],
    difficulty: "hard",
    type: "fill-in",
    question: "Three tiltmeters form an equilateral array, and one circle of area $48\\pi$ square meters passes through all three. Each side of the array is $k$ meters long. What is the value of $k$?",
    correctAnswer: "12",
    explanation: "**SAT Pattern: Equilateral Triangle — Circumradius**\n\n**The correct answer is $12$.**\n\n**The Fast Way (~45s):** The circle has $R = \\sqrt{48} = 4\\sqrt{3}$, and an equilateral triangle satisfies $s = R\\sqrt{3}$, so $s = 4\\sqrt{3} \\cdot \\sqrt{3} = 12$.\n\n**The Full Solution:**\nStep 1: From $\\pi R^2 = 48\\pi$, the circumscribed circle has $R^2 = 48$, so $R = 4\\sqrt{3}$ meters.\nStep 2: In an equilateral triangle the circumradius satisfies $R = \\frac{s}{2\\sin 60^{\\circ}} = \\frac{s}{\\sqrt{3}}$, so $s = R\\sqrt{3}$.\nStep 3: Substitute: $s = 4\\sqrt{3} \\cdot \\sqrt{3} = 4(3) = 12$ meters, so $k = 12$. Check: a side of $12$ gives $R = \\frac{12}{\\sqrt{3}} = 4\\sqrt{3} \\approx 6.93$, and $\\pi(6.93)^2 \\approx 48\\pi$ ✓\n\n**Common Mistakes:**\n* About $6.9$ — reports the circumradius $4\\sqrt{3}$ instead of the side length.\n* $24$ — uses the inradius relation $s = 2\\sqrt{3}\\,r$ with $R$ substituted for the inradius.\n* About $13.9$ — treats the side as a diameter, $2R = 8\\sqrt{3}$, which only works for a right triangle's hypotenuse.\n\n**Test Day Takeaway:** For an equilateral triangle the circumradius is $\\frac{s}{\\sqrt{3}}$ — get $R$ from the circle first, then scale up by $\\sqrt{3}$.",
    calculatorAllowed: true,
    tags: [],
    sourceStyleRef: "30-60-90-triangle",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-05-22"
  },

  {
    id: "bank-geo-355",
    domain: "geometry",
    skills: ["similar-triangles"],
    difficulty: "hard",
    type: "multiple-choice",
    question: "A supply catalog lists two similar triangular gauze panels, shown with corresponding vertices $ABC$ and $DEF$ and with lengths given in inches. Panel $ABC$ has an area of $24$ square inches. What is the area, in square inches, of panel $DEF$?",
    diagram: { type: "similarTriangles", params: { triangle1: { vertices: [[0, 6], [0, 0], [8, 0]], labels: ["A", "B", "C"], sideLabels: ["6", "8", "10"] }, triangle2: { vertices: [[0, 9], [0, 0], [12, 0]], labels: ["D", "E", "F"], sideLabels: ["", "12", ""] }, figureNote: true } },
    choices: [
      // distractor: scales the area by the length ratio 1.5 without squaring it: 24 x 1.5 = 36
      { id: "A", text: "$36$" },
      { id: "B", text: "$54$" },
      // distractor: cubes the length ratio as if scaling a volume: 24 x 1.5^3 = 81
      { id: "C", text: "$81$" },
      // distractor: pairs the 12 with AB = 6 instead of BC = 8, giving ratio 2 and 24 x 2^2 = 96
      { id: "D", text: "$96$" }
    ],
    correctAnswer: "B",
    explanation: "**SAT Pattern: Similar Figures Area Ratio**\n\n**Choice B is correct.**\n\n**The Fast Way (~40s):** $\\overline{EF}$ corresponds to $\\overline{BC}$, so the length ratio is $\\frac{12}{8}=1.5$ and the area ratio is $1.5^2=2.25$; then $24(2.25)=54$ square inches.\n\n**The Full Solution:**\n\nStep 1 — Match the sides. The vertex order $ABC \\to DEF$ pairs $B$ with $E$ and $C$ with $F$, so the labeled side $\\overline{EF}=12$ corresponds to $\\overline{BC}=8$, not to $\\overline{AB}=6$.\n\nStep 2 — Find the ratios. Length ratio $=\\frac{12}{8}=\\frac{3}{2}$, so area ratio $=\\left(\\frac{3}{2}\\right)^2=\\frac{9}{4}$.\n\nStep 3 — Scale the area: $24\\left(\\frac{9}{4}\\right)=54$ square inches. Check: panel $ABC$ is a $6$-$8$-$10$ right triangle of area $\\frac{1}{2}(6)(8)=24$, and $DEF$ is $9$-$12$-$15$ with area $\\frac{1}{2}(9)(12)=54$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($36$): this scales the area by $1.5$ instead of by $1.5^2$.\n* Choice C ($81$): this cubes the ratio, $24(1.5)^3=81$, which is how volumes scale, not areas.\n* Choice D ($96$): pairing $12$ with $\\overline{AB}=6$ gives ratio $2$ and $24(2)^2=96$.\n\n**Test Day Takeaway:** Read the correspondence from the vertex order before dividing — a mismatched pair poisons every step that follows.",
    calculatorAllowed: false,
    tags: [],
    sourceStyleRef: "similar-area-ratio-chain",
    sourceRef: "pilot-m2-similar-area",
    authoredBy: "seva-bank-recreation",
    createdAt: "2026-08-13"
  }
];
