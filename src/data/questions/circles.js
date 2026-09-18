// Practice questions for Circles module
// Questions are organized by SECTION (question type)

export const circlesQuestions = {
  // Section: Circle Fundamentals
  "Circle Fundamentals": [
    {
      id: 1,
      difficulty: "easy",
      question: "A circle has a diameter of $34$ millimeters. What is the length, in millimeters, of a radius of this circle?",
      choices: [
        // distractor: halves the diameter twice
        { id: "A", text: "$8.5$" },
        { id: "B", text: "$17$" },
        // distractor: reports the diameter unchanged
        { id: "C", text: "$34$" },
        // distractor: doubles instead of halving
        { id: "D", text: "$68$" }
      ],
      correctAnswer: "B",
      hint: "The two lengths differ by a single factor of $2$ — decide which one of the pair is longer.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** A radius is half a diameter, so $r = \\frac{34}{2} = 17$ millimeters.\n\n**The Full Solution:**\nStep 1: For every circle, $d = 2r$, so $r = \\frac{d}{2}$.\nStep 2: Substitute $d = 34$: $r = \\frac{34}{2} = 17$ millimeters.\nStep 3: Check by reversing the step: two radii of $17$ millimeters laid end to end span $34$ millimeters, the given diameter.\n\n**Why the wrong answers are tempting:**\n* Choice A ($8.5$): halves the diameter a second time, reporting $\\frac{34}{4}$.\n* Choice C ($34$): reports the diameter without converting it.\n* Choice D ($68$): doubles the diameter, applying $d = 2r$ in the wrong direction.\n\n**Test Day Takeaway:** Radius and diameter are one factor of $2$ apart. Name which one the question handed you before you multiply or divide.",
      skills: ["circle-parts"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A clock face is a circle with a radius of $11$ inches. What is the length, in inches, of a diameter of the clock face?",
      choices: [
        // distractor: halves the radius
        { id: "A", text: "$5.5$" },
        // distractor: reports the radius
        { id: "B", text: "$11$" },
        { id: "C", text: "$22$" },
        // distractor: squares the radius
        { id: "D", text: "$121$" }
      ],
      correctAnswer: "C",
      hint: "Cross the circle straight through its center and count how many radii you travel.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** A diameter is twice a radius, so $d = 2(11) = 22$ inches.\n\n**The Full Solution:**\nStep 1: A diameter runs from one side of the circle to the other through the center, so it is made of two radii: $d = 2r$.\nStep 2: Substitute $r = 11$: $d = 2(11) = 22$ inches.\nStep 3: Check: half of $22$ is $11$, the given radius.\n\n**Why the wrong answers are tempting:**\n* Choice A ($5.5$): halves the radius instead of doubling it.\n* Choice B ($11$): repeats the radius, treating the two words as interchangeable.\n* Choice D ($121$): squares the radius, a habit borrowed from the area formula $A = \\pi r^2$.\n\n**Test Day Takeaway:** Doubling is the only operation that turns a radius into a diameter. Squaring belongs to area, never to a length.",
      skills: ["circle-parts"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "Point $M$ is the center of a circle, and point $N$ lies on that circle. If $MN = 9.5$, what is the length of a diameter of the circle?",
      choices: [
        // distractor: treats MN as a diameter
        { id: "A", text: "$4.75$" },
        // distractor: reports the radius
        { id: "B", text: "$9.5$" },
        { id: "C", text: "$19$" },
        // distractor: squares MN
        { id: "D", text: "$90.25$" }
      ],
      correctAnswer: "C",
      hint: "Decide what kind of segment $\\overline{MN}$ is before you convert anything.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** $\\overline{MN}$ runs from the center to a point on the circle, so it is a radius; the diameter is $2(9.5) = 19$.\n\n**The Full Solution:**\nStep 1: A radius is a segment from the center to any point on the circle, so $MN = 9.5$ is a radius.\nStep 2: A diameter is twice a radius: $d = 2r = 2(9.5)$.\nStep 3: $d = 19$. Check: $\\frac{19}{2} = 9.5$, which matches $MN$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.75$): halves $MN$, treating the given segment as a diameter rather than a radius.\n* Choice B ($9.5$): reports the radius itself and skips the conversion the question asks for.\n* Choice D ($90.25$): squares $9.5$, importing the $r^2$ from the area formula into a length question.\n\n**Test Day Takeaway:** Center-to-circle is always a radius. Classify the segment first; the arithmetic afterwards is one step.",
      skills: ["circle-parts"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A pivot arm sweeps from $A$ to $B$ in the circle shown with center $O$, where angle $AOB$ measures $110^\\circ$. What is the measure, in degrees, of angle $OAB$?",
      diagram: { type: "circleWithSector", params: { centralAngle: 110, angleLabel: "110°", labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showAngleLabel: true, figureNote: true } },
      choices: [
        { id: "A", text: "$35$" },
        // distractor: halves the central angle, treating OAB as an inscribed angle
        { id: "B", text: "$55$" },
        // distractor: computes 180 - 110 = 70 and never splits it between the two base angles
        { id: "C", text: "$70$" },
        // distractor: repeats the central angle 110
        { id: "D", text: "$110$" }
      ],
      correctAnswer: "A",
      hint: "What do the two segments drawn from $O$ have in common?",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** Triangle $AOB$ is isosceles, so the two base angles share $180 - 110 = 70$ degrees, giving $35$ each.\n\n**The Full Solution:**\nStep 1: $OA$ and $OB$ are both radii, so triangle $AOB$ is isosceles with $OA = OB$.\nStep 2: Angles $OAB$ and $OBA$ are the base angles opposite those equal sides, so they are equal.\nStep 3: The angles of the triangle total $180$, so $2(\\text{angle } OAB) = 180 - 110 = 70$ and angle $OAB = 35$. Check: $35 + 35 + 110 = 180$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($55$): halves the central angle, which is the rule for an inscribed angle, not a base angle.\n* Choice C ($70$): stops at $180 - 110 = 70$, the total of the two base angles.\n* Choice D ($110$): repeats the central angle instead of finding a base angle.\n\n**Test Day Takeaway:** Any triangle with two radii as sides is isosceles, so its base angles are equal.",
      skills: ["circle-parts"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the figure, $\\overline{PQ}$ is a diameter of a circle with center $W$, and point $R$ lies on the circle. If $PQ = 10$ and $PR = 6$, what is the length of $\\overline{QR}$?",
      diagram: { type: "circleWithInscribedTriangle", params: { labels: { A: "P", B: "Q", C: "R", O: "W" }, angleAtAValue: 53, showDiameter: true, showCenter: true, showRightAngleAtC: false, figureNote: true } },
      choices: [
        // distractor: subtracts the two given lengths
        { id: "A", text: "$4$" },
        // distractor: assumes the triangle is isosceles
        { id: "B", text: "$6$" },
        { id: "C", text: "$8$" },
        // distractor: reports the diameter
        { id: "D", text: "$10$" }
      ],
      correctAnswer: "C",
      hint: "Ask what the diameter $\\overline{PQ}$ forces the angle at $R$ to be.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** An angle inscribed in a semicircle is a right angle, so triangle $PRQ$ is right with hypotenuse $10$; $QR = \\sqrt{10^2 - 6^2} = 8$.\n\n**The Full Solution:**\nStep 1: $R$ lies on the circle and $\\overline{PQ}$ is a diameter, so $\\angle PRQ$ is inscribed in a semicircle and measures $90^{\\circ}$.\nStep 2: In right triangle $PRQ$, the diameter is the hypotenuse: $PR^2 + QR^2 = PQ^2$, so $36 + QR^2 = 100$.\nStep 3: $QR^2 = 64$, so $QR = 8$. Check: $6$-$8$-$10$ is the $3$-$4$-$5$ triple scaled by $2$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): subtracts the given lengths, $10 - 6$, as if $P$, $R$, and $Q$ were collinear.\n* Choice B ($6$): copies $PR$, assuming the triangle is isosceles when nothing in the figure forces that.\n* Choice D ($10$): reports the diameter, the length already given.\n\n**Test Day Takeaway:** A diameter plus a third point on the circle is a right triangle every time, with the diameter as the hypotenuse.",
      skills: ["circle-parts"]
    }
  ],

  // Section: Area Problems
  "Area Problems": [
    {
      id: 1,
      difficulty: "easy",
      question: "A rotating sprinkler waters a circular region with a radius of $7$ feet. What is the area, in square feet, of the region it waters?",
      choices: [
        // distractor: uses pi times r
        { id: "A", text: "$7\\pi$" },
        // distractor: computes the circumference
        { id: "B", text: "$14\\pi$" },
        { id: "C", text: "$49\\pi$" },
        // distractor: cubes the radius
        { id: "D", text: "$343\\pi$" }
      ],
      correctAnswer: "C",
      hint: "Only one of the two circle formulas squares the radius.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** $A = \\pi r^2 = \\pi(7)^2 = 49\\pi$ square feet.\n\n**The Full Solution:**\nStep 1: The watered region is a full circle, so its area is $A = \\pi r^2$.\nStep 2: The radius is $7$ feet, so $A = \\pi(7)^2$.\nStep 3: $7^2 = 49$, giving $A = 49\\pi$ square feet. Check: doubling the radius to $14$ feet would give $196\\pi$, four times as much — the quadrupling that only an area does.\n\n**Why the wrong answers are tempting:**\n* Choice A ($7\\pi$): uses $\\pi r$ and never squares the radius.\n* Choice B ($14\\pi$): computes the circumference $2\\pi r$, a length rather than an area.\n* Choice D ($343\\pi$): cubes the radius, which is the shape of a volume formula.\n\n**Test Day Takeaway:** Area squares the radius; circumference doubles it. Let the units decide — square feet calls for the squared radius.",
      skills: ["circle-area"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A circular serving tray has a diameter of $18$ inches. What is the area, in square inches, of the tray?",
      choices: [
        // distractor: computes the circumference
        { id: "A", text: "$18\\pi$" },
        { id: "B", text: "$81\\pi$" },
        // distractor: doubles the correct area
        { id: "C", text: "$162\\pi$" },
        // distractor: uses the diameter as the radius
        { id: "D", text: "$324\\pi$" }
      ],
      correctAnswer: "B",
      hint: "Convert before you square, not after.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The radius is $\\frac{18}{2} = 9$, so $A = \\pi(9)^2 = 81\\pi$ square inches.\n\n**The Full Solution:**\nStep 1: The area formula needs a radius: $r = \\frac{d}{2} = \\frac{18}{2} = 9$ inches.\nStep 2: Substitute into $A = \\pi r^2$: $A = \\pi(9)^2$.\nStep 3: $A = 81\\pi$ square inches. Check: a $9$-inch radius gives a circumference of $18\\pi$, a different quantity with different units.\n\n**Why the wrong answers are tempting:**\n* Choice A ($18\\pi$): computes $2\\pi r = 18\\pi$, the distance around the tray rather than the surface it covers.\n* Choice C ($162\\pi$): doubles the correct area, as if doubling a radius doubled the area it encloses.\n* Choice D ($324\\pi$): substitutes the diameter for the radius, computing $\\pi(18)^2$.\n\n**Test Day Takeaway:** When a circle question hands you a diameter, halve it in the first line of work — before any squaring happens.",
      skills: ["circle-area"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A square baking tray with $6$-inch sides is inscribed in the circular oven plate shown, which is centered at $O$. What is the area, in square inches, of the oven plate?",
      diagram: { type: "circleWithSquare", params: { labels: { A: "A", B: "B", C: "C", D: "D", O: "O" }, showDiagonals: true, figureNote: true } },
      choices: [
        // distractor: takes the radius to be half the side, 3
        { id: "A", text: "$9\\pi$" },
        { id: "B", text: "$18\\pi$" },
        // distractor: uses the side length 6 as the radius
        { id: "C", text: "$36\\pi$" },
        // distractor: uses the full diagonal as the radius
        { id: "D", text: "$72\\pi$" }
      ],
      correctAnswer: "B",
      hint: "Which segment of the square stretches all the way across the plate?",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The tray's diagonal $6\\sqrt{2}$ is a diameter, so the radius is $3\\sqrt{2}$ and the area is $\\pi(3\\sqrt{2})^2 = 18\\pi$.\n\n**The Full Solution:**\nStep 1: The four corners of the tray touch the plate, so the tray's diagonal is a diameter of the plate.\nStep 2: For a square of side $6$, the diagonal is $6\\sqrt{2}$, making the radius $3\\sqrt{2}$.\nStep 3: The area is $\\pi r^2 = \\pi(3\\sqrt{2})^2 = 18\\pi$ square inches. Check: $(3\\sqrt{2})^2 = 9 \\cdot 2 = 18$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9\\pi$): uses half the side, $3$, as the radius, which is the distance to a side rather than to a corner.\n* Choice C ($36\\pi$): uses the side length $6$ as the radius.\n* Choice D ($72\\pi$): uses the diagonal $6\\sqrt{2}$ as the radius instead of as the diameter.\n\n**Test Day Takeaway:** When a square is inscribed in a circle, the square's diagonal — not its side — is the circle's diameter.",
      skills: ["circle-area"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives the radius, in centimeters, of each of three circular mirrors. The area of mirror $C$ is how many times the area of mirror $A$?",
      diagram: { type: "dataTable", params: { headers: ["Mirror", "Radius (centimeters)"], rows: [["A", "3"], ["B", "5"], ["C", "12"]] } },
      choices: [
        // distractor: compares the radii
        { id: "A", text: "$4$" },
        { id: "B", text: "$16$" },
        // distractor: subtracts the areas
        { id: "C", text: "$135$" },
        // distractor: never divides by mirror A
        { id: "D", text: "$144$" }
      ],
      correctAnswer: "B",
      hint: "Scaling a radius does not scale an area by the same factor.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** Areas scale as the square of the radius, and the radii are in the ratio $\\frac{12}{3} = 4$, so the areas are in the ratio $4^2 = 16$.\n\n**The Full Solution:**\nStep 1: Mirror $A$ has area $\\pi(3)^2 = 9\\pi$ square centimeters.\nStep 2: Mirror $C$ has area $\\pi(12)^2 = 144\\pi$ square centimeters.\nStep 3: The ratio is $\\frac{144\\pi}{9\\pi} = 16$. Check: $16 = 4^2$, the square of the radius ratio, as expected.\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): compares the radii, $\\frac{12}{3}$, and stops before squaring.\n* Choice C ($135$): subtracts the areas, $144\\pi - 9\\pi$, and reports the coefficient of $\\pi$ instead of dividing.\n* Choice D ($144$): reports mirror $C$'s area divided by $\\pi$ and never divides by mirror $A$'s area.\n\n**Test Day Takeaway:** Multiply a radius by $k$ and the area is multiplied by $k^2$. The comparison question is always about the squared factor.",
      skills: ["circle-area"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the figure, square $ABCD$ is inscribed in a circle with center $O$. If the area of square $ABCD$ is $72$ square centimeters, what is the area, in square centimeters, of the circle?",
      diagram: { type: "circleWithSquare", params: { labels: { A: "A", B: "B", C: "C", D: "D", O: "O" }, showDiagonals: false, figureNote: true } },
      choices: [
        // distractor: uses half a side as the radius
        { id: "A", text: "$18\\pi$" },
        { id: "B", text: "$36\\pi$" },
        // distractor: uses the square area as r squared
        { id: "C", text: "$72\\pi$" },
        // distractor: uses the diagonal as the radius
        { id: "D", text: "$144\\pi$" }
      ],
      correctAnswer: "B",
      hint: "A diameter of the circle is hiding inside the square.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** The square's side is $\\sqrt{72} = 6\\sqrt{2}$, so its diagonal is $6\\sqrt{2} \\cdot \\sqrt{2} = 12$. That diagonal is a diameter, so $r = 6$ and the circle's area is $36\\pi$.\n\n**The Full Solution:**\nStep 1: From $s^2 = 72$, the side length is $s = 6\\sqrt{2}$ centimeters.\nStep 2: A square's diagonal is $s\\sqrt{2}$, so the diagonal is $6\\sqrt{2} \\cdot \\sqrt{2} = 12$ centimeters. Because all four vertices lie on the circle, this diagonal passes through $O$ and is a diameter.\nStep 3: The radius is $\\frac{12}{2} = 6$, so the area is $\\pi(6)^2 = 36\\pi$ square centimeters. Check: $r^2 = 36$ is half of $72$, which matches the fact that the square's area is $2r^2$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($18\\pi$): uses half a side, $3\\sqrt{2}$, as the radius, which reaches only the midpoint of a side, not a vertex.\n* Choice C ($72\\pi$): treats the square's area as $r^2$ and multiplies it by $\\pi$.\n* Choice D ($144\\pi$): uses the whole diagonal $12$ as the radius instead of as the diameter.\n\n**Test Day Takeaway:** For a square inscribed in a circle, the square's diagonal is the circle's diameter. Convert side to diagonal with the factor $\\sqrt{2}$.",
      skills: ["circle-area"]
    }
  ],

  // Section: Circumference & Arc Length
  "Circumference & Arc Length": [
    {
      id: 1,
      difficulty: "easy",
      question: "A grain-bin lid has a rubber seal running around its rim, and the lid is a circle of diameter $2.8$ meters. What is the length, in meters, of the seal?",
      choices: [
        // distractor: multiplies pi by the radius 1.4 instead of the diameter
        { id: "A", text: "$1.4\\pi$" },
        // distractor: computes the area pi(1.4)^2 = 1.96pi
        { id: "B", text: "$1.96\\pi$" },
        { id: "C", text: "$2.8\\pi$" },
        // distractor: doubles the diameter before multiplying by pi
        { id: "D", text: "$5.6\\pi$" }
      ],
      correctAnswer: "C",
      hint: "The seal follows the rim, not the surface.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** Circumference is $\\pi d$, so the seal is $\\pi(2.8) = 2.8\\pi$ meters.\n\n**The Full Solution:**\nStep 1: The seal runs around the rim, so its length is the circumference of the lid.\nStep 2: With the diameter given, use $C = \\pi d$ rather than $C = 2\\pi r$.\nStep 3: Substitute: $C = \\pi(2.8) = 2.8\\pi$ meters. Check: the radius is $1.4$, and $2\\pi(1.4) = 2.8\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.4\\pi$): multiplies $\\pi$ by the radius $1.4$, which is only half the rim.\n* Choice B ($1.96\\pi$): computes the area $\\pi(1.4)^2 = 1.96\\pi$, which measures the lid's surface, not its rim.\n* Choice D ($5.6\\pi$): doubles the diameter as if the given number were the radius.\n\n**Test Day Takeaway:** Check whether the number given is a radius or a diameter before choosing between $2\\pi r$ and $\\pi d$.",
      skills: ["circumference"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A circular tabletop has a circumference of $50\\pi$ centimeters. What is the length, in centimeters, of a diameter of the tabletop?",
      choices: [
        // distractor: reports the radius
        { id: "A", text: "$25$" },
        { id: "B", text: "$50$" },
        // distractor: doubles the diameter
        { id: "C", text: "$100$" },
        // distractor: computes the area
        { id: "D", text: "$625\\pi$" }
      ],
      correctAnswer: "B",
      hint: "Match the quantity you were given to the formula that already contains it.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** $C = \\pi d$, so $d = \\frac{50\\pi}{\\pi} = 50$ centimeters.\n\n**The Full Solution:**\nStep 1: Circumference in terms of the diameter is $C = \\pi d$.\nStep 2: Substitute $C = 50\\pi$: $50\\pi = \\pi d$.\nStep 3: Divide both sides by $\\pi$: $d = 50$ centimeters. Check: with $r = 25$, $2\\pi(25) = 50\\pi$, the given circumference.\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): divides by $2\\pi$ and reports the radius, not the diameter the question asked for.\n* Choice C ($100$): doubles the diameter, treating $C = \\pi d$ as if it were $C = 2\\pi d$.\n* Choice D ($625\\pi$): computes the area $\\pi(25)^2$, an area where a length was requested.\n\n**Test Day Takeaway:** Writing $C = \\pi d$ instead of $C = 2\\pi r$ removes a conversion step whenever the diameter is what you want.",
      skills: ["circumference"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "In the figure, a conveyor turn runs along minor arc $AB$; the wheel radius is $15$ and the turn subtends $72^\\circ$ at center $O$. How long is the turn?",
      diagram: { type: "circleWithSector", params: { centralAngle: 72, angleLabel: "72°", radius: 15, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
      choices: [
        // distractor: uses pi*r instead of 2*pi*r for the whole rim
        { id: "A", text: "$3\\pi$" },
        { id: "B", text: "$6\\pi$" },
        // distractor: uses the diameter 30 in place of the radius
        { id: "C", text: "$12\\pi$" },
        // distractor: reports the whole circumference 30pi
        { id: "D", text: "$30\\pi$" }
      ],
      correctAnswer: "B",
      hint: "Compare the given angle with a full turn of $360^\\circ$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $72^\\circ$ is one fifth of a full turn, and one fifth of $2\\pi(15) = 30\\pi$ is $6\\pi$.\n\n**The Full Solution:**\nStep 1: The whole rim measures $2\\pi r = 2\\pi(15) = 30\\pi$.\nStep 2: The turn covers $\\dfrac{72}{360} = \\dfrac{1}{5}$ of the rim.\nStep 3: Multiply: $\\dfrac{1}{5}(30\\pi) = 6\\pi$. Check: five such turns would total $30\\pi$, the whole rim ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3\\pi$): uses $\\pi r = 15\\pi$ as the circumference, half of the true value.\n* Choice C ($12\\pi$): uses the diameter $30$ where the radius belongs, doubling the answer.\n* Choice D ($30\\pi$): reports the entire circumference instead of the fifth of it that the turn covers.\n\n**Test Day Takeaway:** An arc is the same fraction of the circumference as its central angle is of $360^\\circ$.",
      skills: ["arc-length"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The circle shown has center $O$ and radius $12$. A ferry sails along minor arc $AB$, a distance of $10\\pi$. Through how many degrees does angle $AOB$ turn?",
      diagram: { type: "circleWithSector", params: { centralAngle: 150, showAngleLabel: false, radius: 12, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
      choices: [
        // distractor: uses 4*pi*r = 48pi as the circumference, halving the fraction
        { id: "A", text: "$75$" },
        { id: "B", text: "$150$" },
        // distractor: reports the major arc's angle, 360 - 150
        { id: "C", text: "$210$" },
        // distractor: uses pi*r = 12pi as the circumference
        { id: "D", text: "$300$" }
      ],
      correctAnswer: "B",
      hint: "First ask what fraction of the whole rim the ferry covered.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The rim is $24\\pi$, and $\\dfrac{10\\pi}{24\\pi} = \\dfrac{5}{12}$ of $360$ is $150$.\n\n**The Full Solution:**\nStep 1: The circumference is $2\\pi(12) = 24\\pi$.\nStep 2: The ferry covers $\\dfrac{10\\pi}{24\\pi} = \\dfrac{5}{12}$ of the rim.\nStep 3: The central angle is that same fraction of $360$: $\\dfrac{5}{12}(360) = 150$ degrees. Check: $\\dfrac{150}{360}(24\\pi) = 10\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($75$): uses $48\\pi$ as the circumference, doubling the true rim and halving the angle.\n* Choice C ($210$): gives the reflex angle $360 - 150$, which belongs to the major arc.\n* Choice D ($300$): uses $\\pi r = 12\\pi$ as the circumference, so the fraction doubles.\n\n**Test Day Takeaway:** Turn an arc length into a fraction of the circumference first; that fraction is also the fraction of $360^\\circ$.",
      skills: ["arc-length"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the figure, points $A$ and $B$ divide the circle into a minor arc of length $6\\pi$ and a major arc of length $18\\pi$. What is the radius of the circle?",
      diagram: { type: "circleWithSector", params: { centralAngle: 90, showAngleLabel: false, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
      choices: [
        // distractor: treats the minor arc as the whole circumference
        { id: "A", text: "$3$" },
        // distractor: treats the major arc as the whole circumference
        { id: "B", text: "$9$" },
        { id: "C", text: "$12$" },
        // distractor: divides by pi instead of 2 pi
        { id: "D", text: "$24$" }
      ],
      correctAnswer: "C",
      hint: "Together, the two arcs account for one full trip around the circle.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** The two arcs make up the whole circumference: $6\\pi + 18\\pi = 24\\pi = 2\\pi r$, so $r = 12$.\n\n**The Full Solution:**\nStep 1: Two points split a circle into two arcs whose lengths add to the circumference: $C = 6\\pi + 18\\pi = 24\\pi$.\nStep 2: Set $2\\pi r = 24\\pi$.\nStep 3: Divide by $2\\pi$: $r = 12$. Check: the minor arc is $\\frac{6\\pi}{24\\pi} = \\frac{1}{4}$ of the circle, a $90^{\\circ}$ central angle, which is consistent with a major arc three times as long.\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): treats the minor arc alone as the circumference, solving $2\\pi r = 6\\pi$.\n* Choice B ($9$): treats the major arc alone as the circumference, solving $2\\pi r = 18\\pi$.\n* Choice D ($24$): divides the circumference by $\\pi$ rather than by $2\\pi$, reporting the diameter's value as a radius.\n\n**Test Day Takeaway:** Minor arc plus major arc is always the full circumference. Adding them first turns a two-arc problem into a one-step equation.",
      skills: ["arc-length"]
    }
  ],

  // Section: Sector Area
  "Sector Area": [
    {
      id: 1,
      difficulty: "easy",
      question: "A pizza stone is cut into wedges like the one in the figure, with radius $6$ inches and a $60^\\circ$ tip angle at center $O$. What is the wedge's area, in square inches?",
      diagram: { type: "circleWithSector", params: { centralAngle: 60, angleLabel: "60°", radius: 6, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", showRadiusLabel: true, figureNote: true } },
      choices: [
        // distractor: computes the arc length (1/6)(12pi) = 2pi
        { id: "A", text: "$2\\pi$" },
        { id: "B", text: "$6\\pi$" },
        // distractor: reports the whole circumference 12pi
        { id: "C", text: "$12\\pi$" },
        // distractor: reports the whole stone's area 36pi
        { id: "D", text: "$36\\pi$" }
      ],
      correctAnswer: "B",
      hint: "How many identical wedges make up the whole stone?",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** One sixth of the stone's area $36\\pi$ is $6\\pi$.\n\n**The Full Solution:**\nStep 1: The whole stone has area $\\pi r^2 = \\pi(6)^2 = 36\\pi$.\nStep 2: A $60^\\circ$ tip covers $\\dfrac{60}{360} = \\dfrac{1}{6}$ of the stone.\nStep 3: Multiply: $\\dfrac{1}{6}(36\\pi) = 6\\pi$ square inches. Check: six identical wedges give $6(6\\pi) = 36\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2\\pi$): computes the arc along the crust, $\\dfrac{1}{6}(12\\pi)$, which is a length rather than an area.\n* Choice C ($12\\pi$): reports the whole circumference.\n* Choice D ($36\\pi$): reports the area of the entire stone rather than one wedge.\n\n**Test Day Takeaway:** A sector's area is the same fraction of $\\pi r^2$ as its angle is of $360^\\circ$.",
      skills: ["sector-area"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A circular stained-glass window has a radius of $10$ inches. One pane of the window is a sector with a central angle of $72^{\\circ}$. What is the area, in square inches, of that pane?",
      choices: [
        // distractor: computes the arc length
        { id: "A", text: "$4\\pi$" },
        { id: "B", text: "$20\\pi$" },
        // distractor: doubles the area formula
        { id: "C", text: "$40\\pi$" },
        // distractor: reports the whole window
        { id: "D", text: "$100\\pi$" }
      ],
      correctAnswer: "B",
      hint: "$72^{\\circ}$ is a friendly fraction of $360^{\\circ}$ — simplify it before multiplying.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $\\frac{72}{360} = \\frac{1}{5}$, and the window's area is $100\\pi$, so the pane covers $20\\pi$ square inches.\n\n**The Full Solution:**\nStep 1: The window's area is $\\pi(10)^2 = 100\\pi$ square inches.\nStep 2: The pane's central angle is $\\frac{72}{360} = \\frac{1}{5}$ of a full turn.\nStep 3: The pane's area is $\\frac{1}{5}(100\\pi) = 20\\pi$ square inches. Check: five congruent panes of $20\\pi$ each rebuild the $100\\pi$ window.\n\n**Why the wrong answers are tempting:**\n* Choice A ($4\\pi$): takes $\\frac{1}{5}$ of the circumference $20\\pi$, producing a length instead of an area.\n* Choice C ($40\\pi$): uses $2\\pi r^2$ for the circle's area, importing the $2$ from the circumference formula.\n* Choice D ($100\\pi$): reports the area of the whole window rather than of one pane.\n\n**Test Day Takeaway:** Reduce the angle fraction before you multiply; $\\frac{72}{360} = \\frac{1}{5}$ turns the arithmetic into a single step.",
      skills: ["sector-area"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A radar sweep covers the quarter-circle sector shown, whose area is $16\\pi$ square kilometers. How long, in kilometers, is the radius?",
      diagram: { type: "circleWithSector", params: { centralAngle: 90, angleLabel: "90°", showRadiusLabel: false, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
      choices: [
        // distractor: solves pi*r^2 = 16pi and forgets the quarter
        { id: "A", text: "$4$" },
        { id: "B", text: "$8$" },
        // distractor: reports the coefficient 16 from the given area
        { id: "C", text: "$16$" },
        // distractor: reports r^2 = 64 instead of r
        { id: "D", text: "$64$" }
      ],
      correctAnswer: "B",
      hint: "The area you are given belongs to only part of the circle.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** A quarter of $\\pi r^2$ equals $16\\pi$, so $\\pi r^2 = 64\\pi$ and $r = 8$.\n\n**The Full Solution:**\nStep 1: A $90^\\circ$ sector is $\\dfrac{1}{4}$ of the circle, so $\\dfrac{1}{4}\\pi r^2 = 16\\pi$.\nStep 2: Multiply both sides by $4$: $\\pi r^2 = 64\\pi$, so $r^2 = 64$.\nStep 3: Take the positive root: $r = 8$ kilometers. Check: $\\dfrac{1}{4}\\pi(8)^2 = 16\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): solves $\\pi r^2 = 16\\pi$, treating the sector's area as the whole circle's.\n* Choice C ($16$): reports the number multiplying $\\pi$ in the given area.\n* Choice D ($64$): reports $r^2$ and skips the square root.\n\n**Test Day Takeaway:** Undo the fraction of the circle first; only then take the square root.",
      skills: ["sector-area"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "In a circle of radius $5$, a sector has an area of $5\\pi$ square units. What is the measure, in degrees, of the sector's central angle?",
      choices: [
        // distractor: uses 180 degrees for a full turn
        { id: "A", text: "$36$" },
        { id: "B", text: "$72$" },
        // distractor: compares against the circumference
        { id: "C", text: "$180$" },
        // distractor: divides by pi r instead of pi r squared
        { id: "D", text: "$360$" }
      ],
      correctAnswer: "B",
      hint: "Find the whole circle's area first; the sector's share of it sets the angle.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The circle's area is $25\\pi$, so the sector is $\\frac{5\\pi}{25\\pi} = \\frac{1}{5}$ of it, and $\\frac{1}{5}(360^{\\circ}) = 72^{\\circ}$.\n\n**The Full Solution:**\nStep 1: The circle's area is $\\pi(5)^2 = 25\\pi$ square units.\nStep 2: The sector's share of the area is $\\frac{5\\pi}{25\\pi} = \\frac{1}{5}$.\nStep 3: That same share of a full turn is $\\frac{1}{5}(360^{\\circ}) = 72^{\\circ}$. Check: $\\frac{72}{360}(25\\pi) = 5\\pi$, the given sector area.\n\n**Why the wrong answers are tempting:**\n* Choice A ($36$): applies the correct fraction $\\frac{1}{5}$ to $180^{\\circ}$ instead of to a full $360^{\\circ}$ turn.\n* Choice C ($180$): divides the sector's area by the circumference $10\\pi$, getting $\\frac{1}{2}$ of a turn.\n* Choice D ($360$): divides by $\\pi r = 5\\pi$ instead of $\\pi r^2$, which makes the sector look like the whole circle.\n\n**Test Day Takeaway:** Compare like with like: an area against an area. Mixing a sector area with a circumference is what produces the half-turn trap.",
      skills: ["sector-area"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the figure, $O$ is the center of the circle and the measure of $\\angle AOB$ is $135^{\\circ}$. If the area of sector $AOB$ is $54\\pi$, what is the length of minor arc $AB$?",
      diagram: { type: "circleWithSector", params: { centralAngle: 135, showAngleLabel: true, labelCenter: "O", labelPoint1: "A", labelPoint2: "B", figureNote: true } },
      choices: [
        // distractor: uses pi r for the circumference
        { id: "A", text: "$\\frac{9\\pi}{2}$" },
        { id: "B", text: "$9\\pi$" },
        // distractor: reports the full circumference
        { id: "C", text: "$24\\pi$" },
        // distractor: never takes the square root
        { id: "D", text: "$108\\pi$" }
      ],
      correctAnswer: "B",
      hint: "One radius unlocks both formulas — get it out of the area before you touch the arc.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~50s):** $\\frac{135}{360} = \\frac{3}{8}$, so $\\frac{3}{8}\\pi r^2 = 54\\pi$ gives $r = 12$; the arc is then $\\frac{3}{8}(24\\pi) = 9\\pi$.\n\n**The Full Solution:**\nStep 1: The sector is $\\frac{135}{360} = \\frac{3}{8}$ of the circle, so $\\frac{3}{8}\\pi r^2 = 54\\pi$.\nStep 2: Multiply by $\\frac{8}{3}$: $\\pi r^2 = 144\\pi$, so $r^2 = 144$ and $r = 12$.\nStep 3: The circumference is $2\\pi(12) = 24\\pi$, and the arc is $\\frac{3}{8}(24\\pi) = 9\\pi$. Check: the shortcut $A = \\frac{1}{2}sr$ gives $\\frac{1}{2}(9\\pi)(12) = 54\\pi$, the given area.\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{9\\pi}{2}$): uses $\\pi r = 12\\pi$ as the circumference, halving the arc.\n* Choice C ($24\\pi$): reports the full circumference instead of the $\\frac{3}{8}$ of it that the angle cuts off.\n* Choice D ($108\\pi$): uses $r = 144$ without taking the square root: $\\frac{3}{8}(2\\pi \\cdot 144)$.\n\n**Test Day Takeaway:** The same angle fraction serves area and arc. Solve for $r$ once, then reuse it.",
      skills: ["sector-area"]
    }
  ],

  // Section: Equation of a Circle
  "Equation of a Circle": [
    {
      id: 1,
      difficulty: "easy",
      question: "A harbor beacon at $(-6, 8)$ can be seen from every point within $10$ kilometers. Which equation describes the outer edge of the region where the beacon is visible?",
      choices: [
        // distractor: copies the center's coordinates with their own signs
        { id: "A", text: "$(x - 6)^2 + (y + 8)^2 = 100$" },
        // distractor: puts the radius 10 on the right instead of 100
        { id: "B", text: "$(x + 6)^2 + (y - 8)^2 = 10$" },
        { id: "C", text: "$(x + 6)^2 + (y - 8)^2 = 100$" },
        // distractor: keeps the +8 sign for the y-coordinate of the center
        { id: "D", text: "$(x + 6)^2 + (y + 8)^2 = 100$" }
      ],
      correctAnswer: "C",
      hint: "Write the center first, then decide what number belongs on the right side.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** Center $(-6, 8)$ and radius $10$ give $(x + 6)^2 + (y - 8)^2 = 100$.\n\n**The Full Solution:**\nStep 1: The outer edge is the set of points exactly $10$ kilometers from $(-6, 8)$, which is a circle.\nStep 2: Standard form is $(x - h)^2 + (y - k)^2 = r^2$ with $h = -6$ and $k = 8$, so the binomials are $x + 6$ and $y - 8$.\nStep 3: Square the radius: $r^2 = 100$, giving $(x + 6)^2 + (y - 8)^2 = 100$. Check: the point $(4, 8)$ is $10$ units away and satisfies $100 + 0 = 100$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: copies the coordinates $-6$ and $8$ directly into the binomials, describing a circle centered at $(6, -8)$.\n* Choice B: writes the radius $10$ on the right side instead of $r^2 = 100$.\n* Choice D: keeps the sign of the $y$-coordinate, placing the center at $(-6, -8)$.\n\n**Test Day Takeaway:** Each binomial holds the opposite of a center coordinate, and the right side is always the square of the radius.",
      skills: ["circle-equation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "An orchard sprinkler wets the ground inside the circle $(x - 9)^2 + (y + 4)^2 = 144$, where one unit represents one meter. How many meters is the sprinkler's reach?",
      choices: [
        { id: "A", text: "$12$" },
        // distractor: doubles 12 and reports the diameter
        { id: "B", text: "$24$" },
        // distractor: halves 144
        { id: "C", text: "$72$" },
        // distractor: reports 144, which is the square of the reach
        { id: "D", text: "$144$" }
      ],
      correctAnswer: "A",
      hint: "The number on the right side is not the reach itself.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~10s):** The right side is $r^2 = 144$, so the reach is $\\sqrt{144} = 12$ meters.\n\n**The Full Solution:**\nStep 1: Compare with $(x - h)^2 + (y - k)^2 = r^2$; here $r^2 = 144$.\nStep 2: Take the positive square root: $r = 12$.\nStep 3: One unit is one meter, so the sprinkler reaches $12$ meters. Check: the point $(21, -4)$ is $12$ meters from the center $(9, -4)$ and satisfies $144 + 0 = 144$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($24$): doubles the radius and reports the diameter.\n* Choice C ($72$): halves $144$ instead of taking its square root.\n* Choice D ($144$): reports $r^2$ straight from the equation.\n\n**Test Day Takeaway:** The right side of the standard form is the square of the radius, so one square root is always owed.",
      skills: ["circle-equation"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A weather balloon's circular path is $(x - 2)^2 + (y + 7)^2 = 64$, and the balloon reaches the point $(2, t)$ with $t$ positive. What is the value of $t$?",
      choices: [
        // distractor: takes the negative square root, which the condition t > 0 rules out
        { id: "A", text: "$-15$" },
        { id: "B", text: "$1$" },
        // distractor: reports the radius 8
        { id: "C", text: "$8$" },
        // distractor: solves t + 7 = 64 without taking a square root
        { id: "D", text: "$57$" }
      ],
      correctAnswer: "B",
      hint: "What happens to the first square when $x$ equals $2$?",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** At $x = 2$ the first square vanishes, so $(t + 7)^2 = 64$ and the positive choice is $t = 1$.\n\n**The Full Solution:**\nStep 1: Substitute $x = 2$: $(2 - 2)^2 + (t + 7)^2 = 64$, so $(t + 7)^2 = 64$.\nStep 2: Take both square roots: $t + 7 = 8$ or $t + 7 = -8$, giving $t = 1$ or $t = -15$.\nStep 3: The problem states $t$ is positive, so $t = 1$. Check: $(2 - 2)^2 + (1 + 7)^2 = 64$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-15$): the other square root, ruled out because $t$ must be positive.\n* Choice C ($8$): reports the radius instead of the coordinate.\n* Choice D ($57$): solves $t + 7 = 64$, skipping the square root entirely.\n\n**Test Day Takeaway:** Substituting a coordinate that matches the center kills one square and leaves a simple equation to solve.",
      skills: ["circle-equation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A telescope's field of view is bounded by $(x + 5)^2 + (y - 3)^2 = 49$ in the $xy$-plane. Which of the following statements about that boundary is true?",
      choices: [
        // distractor: assumes the origin is one radius away, though its distance is the square root of 34
        { id: "A", text: "The boundary passes through the origin." },
        // distractor: compares the radius 7 with the center's height 3
        { id: "B", text: "The boundary is tangent to the $x$-axis." },
        { id: "C", text: "The point $(2, 3)$ lies on the boundary." },
        // distractor: reads the center as (-5, -3)
        { id: "D", text: "The center of the boundary lies in Quadrant III." }
      ],
      correctAnswer: "C",
      hint: "Start by writing down the center and the radius.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** The center is $(-5, 3)$ with radius $7$, and $(2, 3)$ sits exactly $7$ units to its right.\n\n**The Full Solution:**\nStep 1: Standard form gives center $(-5, 3)$ and $r = \\sqrt{49} = 7$.\nStep 2: Test the point: $(2 + 5)^2 + (3 - 3)^2 = 49 + 0 = 49$, which matches the right side.\nStep 3: So $(2, 3)$ lies on the boundary. Check: the horizontal distance from $-5$ to $2$ is $7$, exactly the radius ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: the origin is $\\sqrt{25 + 9} = \\sqrt{34} \\approx 5.83$ units from the center, not $7$.\n* Choice B: tangency to the $x$-axis would need the center's height $3$ to equal the radius $7$.\n* Choice D: reads the center as $(-5, -3)$; the actual center $(-5, 3)$ lies in Quadrant II.\n\n**Test Day Takeaway:** Extract the center and radius first, then every statement about a circle becomes a one-line check.",
      skills: ["circle-equation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A circular runway apron is centered at $(6, k)$, has radius $10$, and passes through the origin, where $k$ is a constant. What are all possible values of $k$?",
      choices: [
        // distractor: keeps only the negative square root
        { id: "A", text: "$-8$ only" },
        // distractor: subtracts 6 from 10 instead of using the distance formula
        { id: "B", text: "$4$ only" },
        // distractor: keeps only the positive square root
        { id: "C", text: "$8$ only" },
        { id: "D", text: "$-8$ and $8$" }
      ],
      correctAnswer: "D",
      hint: "How far is $(6, k)$ from the origin?",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~40s):** The origin is on the apron, so $6^2 + k^2 = 10^2$, giving $k^2 = 64$ and $k = \\pm 8$.\n\n**The Full Solution:**\nStep 1: The apron is $(x - 6)^2 + (y - k)^2 = 100$.\nStep 2: Substituting $(0, 0)$ gives $36 + k^2 = 100$, so $k^2 = 64$.\nStep 3: Both square roots satisfy every condition, so $k = -8$ or $k = 8$. Check: centers $(6, 8)$ and $(6, -8)$ are each $\\sqrt{36 + 64} = 10$ units from the origin ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-8$ only): keeps just the negative root, though nothing rules out the positive one.\n* Choice B ($4$ only): subtracts $6$ from $10$ as if the distances added along a line.\n* Choice C ($8$ only): keeps just the positive root.\n\n**Test Day Takeaway:** When a squared unknown is left, report both roots unless the problem rules one out.",
      skills: ["circle-equation"]
    }
  ],

  // Section: Circle Transformations
  "Circle Transformations": [
    {
      id: 1,
      difficulty: "easy",
      question: "In the $xy$-plane, the circle $x^2 + y^2 = 49$ is translated $5$ units to the left. Which equation defines the image of the circle?",
      choices: [
        { id: "A", text: "$(x + 5)^2 + y^2 = 49$" },
        // distractor: shifts right
        { id: "B", text: "$(x - 5)^2 + y^2 = 49$" },
        // distractor: shifts vertically
        { id: "C", text: "$x^2 + (y + 5)^2 = 49$" },
        // distractor: changes the size too
        { id: "D", text: "$(x + 5)^2 + y^2 = 54$" }
      ],
      correctAnswer: "A",
      hint: "Ask what happens to the center, and only to the center.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The center moves from $(0, 0)$ to $(-5, 0)$ and the radius is unchanged, so the equation is $(x + 5)^2 + y^2 = 49$.\n\n**The Full Solution:**\nStep 1: The original circle has center $(0, 0)$ and radius $7$.\nStep 2: Moving $5$ units left subtracts $5$ from the $x$-coordinate, so the new center is $(-5, 0)$.\nStep 3: With $h = -5$ and $k = 0$, the equation is $(x + 5)^2 + y^2 = 49$. Check: the leftmost point moves from $(-7, 0)$ to $(-12, 0)$, exactly $5$ units left.\n\n**Why the wrong answers are tempting:**\n* Choice B ($(x - 5)^2 + y^2 = 49$): $(x - 5)^2$ puts the center at $(5, 0)$, a shift to the right.\n* Choice C ($x^2 + (y + 5)^2 = 49$): moves the circle down instead of left, changing the wrong coordinate.\n* Choice D ($(x + 5)^2 + y^2 = 54$): adds the translation distance to $r^2$, resizing a circle that should only have moved.\n\n**Test Day Takeaway:** A translation touches $h$ and $k$ and never touches $r^2$. Inside the parentheses, the sign is the opposite of the direction of travel.",
      skills: ["circle-equation", "function-transformations"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The circle $(x - 1)^2 + (y + 6)^2 = 16$ is translated in the $xy$-plane so that its center moves to $(4, -2)$. Which equation defines the translated circle?",
      choices: [
        { id: "A", text: "$(x - 4)^2 + (y + 2)^2 = 16$" },
        // distractor: flips the signs of the new center
        { id: "B", text: "$(x + 4)^2 + (y - 2)^2 = 16$" },
        // distractor: replaces r squared with r
        { id: "C", text: "$(x - 4)^2 + (y + 2)^2 = 4$" },
        // distractor: applies the shift twice
        { id: "D", text: "$(x - 7)^2 + (y - 2)^2 = 16$" }
      ],
      correctAnswer: "A",
      hint: "Only one part of the equation is allowed to change here.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The new center is $(4, -2)$ and the radius still satisfies $r^2 = 16$, so the equation is $(x - 4)^2 + (y + 2)^2 = 16$.\n\n**The Full Solution:**\nStep 1: A translation moves the center but preserves the radius, so $r^2 = 16$ carries over unchanged.\nStep 2: Substitute $h = 4$ and $k = -2$ into $(x - h)^2 + (y - k)^2 = r^2$.\nStep 3: The equation is $(x - 4)^2 + (y + 2)^2 = 16$. Check: the center moved from $(1, -6)$ to $(4, -2)$, a shift of $3$ right and $4$ up, which is a rigid motion.\n\n**Why the wrong answers are tempting:**\n* Choice B ($(x + 4)^2 + (y - 2)^2 = 16$): flips both signs, placing the center at $(-4, 2)$.\n* Choice C ($(x - 4)^2 + (y + 2)^2 = 4$): replaces $r^2 = 16$ with the radius $4$.\n* Choice D ($(x - 7)^2 + (y - 2)^2 = 16$): computes the shift $(3, 4)$ and applies it a second time, landing the center at $(7, 2)$.\n\n**Test Day Takeaway:** When the destination center is handed to you, write it straight into standard form. Recomputing the shift only creates a chance to apply it twice.",
      skills: ["circle-equation", "function-transformations"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "In the $xy$-plane, a circle with center at the origin and radius $4$ is dilated about the origin by a scale factor of $3$. Which equation defines the image?",
      choices: [
        // distractor: substitutes 3x and 3y
        { id: "A", text: "$x^2 + y^2 = \\frac{16}{9}$" },
        // distractor: writes r where r squared belongs
        { id: "B", text: "$x^2 + y^2 = 12$" },
        // distractor: scales r squared only once
        { id: "C", text: "$x^2 + y^2 = 48$" },
        { id: "D", text: "$x^2 + y^2 = 144$" }
      ],
      correctAnswer: "D",
      hint: "A dilation scales the radius, but the equation stores the radius squared.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** The radius becomes $3(4) = 12$, so $r^2 = 144$ and the image is $x^2 + y^2 = 144$.\n\n**The Full Solution:**\nStep 1: A dilation centered at the origin with scale factor $3$ multiplies every distance from the origin by $3$, so the radius becomes $12$.\nStep 2: The center stays at the origin, so the equation is $x^2 + y^2 = r^2$ with $r = 12$.\nStep 3: $x^2 + y^2 = 144$. Check: the point $(4, 0)$ maps to $(12, 0)$, and $12^2 + 0 = 144$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($x^2 + y^2 = \\frac{16}{9}$): substitutes $3x$ and $3y$ into the original equation, which shrinks the circle by a factor of $3$ instead of enlarging it.\n* Choice B ($x^2 + y^2 = 12$): writes the new radius $12$ on the right side where $r^2$ belongs.\n* Choice C ($x^2 + y^2 = 48$): multiplies $r^2 = 16$ by the scale factor once, giving $48$, instead of by the scale factor squared.\n\n**Test Day Takeaway:** Scale the radius, then square it. Multiplying $r^2$ by $k$ instead of $k^2$ is the classic dilation slip.",
      skills: ["circle-equation", "function-transformations"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives the center and radius of circle $A$ in the $xy$-plane. Circle $B$ is the image of circle $A$ after a translation $5$ units right and $2$ units down. Which equation defines circle $B$?",
      questionTable: { headers: ["Circle", "Center", "Radius"], rows: [["$A$", "$(-3, 6)$", "$4$"]] },
      choices: [
        // distractor: writes the radius 4 on the right instead of its square
        { id: "A", text: "$(x - 2)^2 + (y - 4)^2 = 4$" },
        // distractor: reverses the signs of the new center, using (-2, -4)
        { id: "B", text: "$(x + 2)^2 + (y + 4)^2 = 16$" },
        { id: "C", text: "$(x - 2)^2 + (y - 4)^2 = 16$" },
        // distractor: translates 5 left and 2 up, landing the center at (-8, 8)
        { id: "D", text: "$(x + 8)^2 + (y - 8)^2 = 16$" }
      ],
      correctAnswer: "C",
      hint: "Ask what the translation changes and what it leaves alone.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** The center moves from $(-3, 6)$ to $(2, 4)$ and the radius stays $4$, so the equation is $(x - 2)^2 + (y - 4)^2 = 16$.\n\n**The Full Solution:**\nStep 1: Moving $5$ units right adds $5$ to the $x$-coordinate: $-3 + 5 = 2$.\nStep 2: Moving $2$ units down subtracts $2$ from the $y$-coordinate: $6 - 2 = 4$.\nStep 3: A translation does not resize a circle, so the radius is still $4$ and the equation is $(x - 2)^2 + (y - 4)^2 = 4^2 = 16$. Check: the center $(2, 4)$ satisfies $x - 2 = 0$ and $y - 4 = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($= 4$): puts the radius on the right side instead of the radius squared, $16$.\n* Choice B: reverses the signs inside the squares, which describes a circle centered at $(-2, -4)$.\n* Choice D: translates the center the wrong way, to $(-8, 8)$.\n\n**Test Day Takeaway:** In standard form the numbers inside the parentheses are the opposite of the center's coordinates, and the right side is always the square of the radius.",
      skills: ["circle-equation", "function-transformations"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A circle in the $xy$-plane is translated $6$ units up with no change in its size. The image of the translated circle has equation $(x + 1)^2 + (y - 2)^2 = 49$. Which equation defines the original circle?",
      choices: [
        // distractor: translates up a second time
        { id: "A", text: "$(x + 1)^2 + (y - 8)^2 = 49$" },
        { id: "B", text: "$(x + 1)^2 + (y + 4)^2 = 49$" },
        // distractor: undoes the shift horizontally
        { id: "C", text: "$(x + 7)^2 + (y - 2)^2 = 49$" },
        // distractor: changes the radius instead of the center
        { id: "D", text: "$(x + 1)^2 + (y - 2)^2 = 43$" }
      ],
      correctAnswer: "B",
      hint: "You are being handed the destination, so run the translation backwards.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The image's center is $(-1, 2)$; undoing a $6$-unit rise puts the original center at $(-1, -4)$, so the original equation is $(x + 1)^2 + (y + 4)^2 = 49$.\n\n**The Full Solution:**\nStep 1: Read the image's center from its equation: $(-1, 2)$, with $r^2 = 49$.\nStep 2: The translation added $6$ to the original $y$-coordinate, so the original $y$-coordinate is $2 - 6 = -4$; the $x$-coordinate is unchanged.\nStep 3: The original circle is $(x + 1)^2 + (y + 4)^2 = 49$. Check: translating $(-1, -4)$ up $6$ units returns $(-1, 2)$, the image's center.\n\n**Why the wrong answers are tempting:**\n* Choice A ($(x + 1)^2 + (y - 8)^2 = 49$): translates up again instead of undoing the move, placing the center at $(-1, 8)$.\n* Choice C ($(x + 7)^2 + (y - 2)^2 = 49$): undoes the shift along the $x$-axis, moving the center to $(-7, 2)$.\n* Choice D ($(x + 1)^2 + (y - 2)^2 = 43$): subtracts $6$ from $r^2$, changing the circle's size rather than its position.\n\n**Test Day Takeaway:** When a question gives you the image, reverse the transformation. Up $6$ is undone by down $6$, and the radius never enters the arithmetic.",
      skills: ["circle-equation", "function-transformations"]
    }
  ],

  // Section: Domain, Range & Intersections
  "Domain, Range & Intersections": [
    {
      id: 1,
      difficulty: "easy",
      question: "In the $xy$-plane, the graph of $(x + 3)^2 + (y - 1)^2 = 16$ is a circle. What is the least possible value of $x$ for a point $(x, y)$ on this circle?",
      choices: [
        // distractor: subtracts r squared
        { id: "A", text: "$-19$" },
        { id: "B", text: "$-7$" },
        // distractor: reports the center
        { id: "C", text: "$-3$" },
        // distractor: adds the radius instead
        { id: "D", text: "$1$" }
      ],
      correctAnswer: "B",
      hint: "Picture the leftmost point of the circle relative to its center.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The center is $(-3, 1)$ and the radius is $4$, so the smallest $x$-value is $-3 - 4 = -7$.\n\n**The Full Solution:**\nStep 1: In standard form the center is $(-3, 1)$ and $r^2 = 16$, so $r = 4$.\nStep 2: Horizontally the circle reaches $4$ units on either side of the center, so $x$ ranges from $-3 - 4$ to $-3 + 4$.\nStep 3: The least value is $-7$. Check: at $x = -7$, the equation gives $16 + (y - 1)^2 = 16$, so $y = 1$ and the point $(-7, 1)$ is on the circle.\n\n**Why the wrong answers are tempting:**\n* Choice A ($-19$): subtracts $r^2 = 16$ from the center's $x$-coordinate instead of the radius.\n* Choice C ($-3$): reports the center's $x$-coordinate, which is the middle of the range rather than its edge.\n* Choice D ($1$): adds the radius, giving the greatest $x$-value instead of the least.\n\n**Test Day Takeaway:** A circle's $x$-values run from $h - r$ to $h + r$. Take the square root of the constant before you go anywhere near the center.",
      skills: ["circle-equation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "As a rotating antenna turns, its tip traces the circle $(x - 4)^2 + (y + 1)^2 = 9$, where one unit represents one meter. Which inequality gives exactly the $x$-coordinates the tip reaches?",
      choices: [
        // distractor: reads the center's x-coordinate as -4
        { id: "A", text: "$-7 \\le x \\le -1$" },
        // distractor: uses 9 as the radius instead of 3
        { id: "B", text: "$-5 \\le x \\le 13$" },
        // distractor: centers the interval at the origin instead of at x = 4
        { id: "C", text: "$-3 \\le x \\le 3$" },
        { id: "D", text: "$1 \\le x \\le 7$" }
      ],
      correctAnswer: "D",
      hint: "How far left and right of the center can the tip reach?",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~20s):** The center is at $x = 4$ and the radius is $3$, so $x$ runs from $1$ to $7$.\n\n**The Full Solution:**\nStep 1: Compare with $(x - h)^2 + (y - k)^2 = r^2$: the center is $(4, -1)$ and $r^2 = 9$, so $r = 3$.\nStep 2: The tip never gets farther than $3$ units from the center in any direction, so its $x$-coordinates satisfy $4 - 3 \\le x \\le 4 + 3$.\nStep 3: That is $1 \\le x \\le 7$. Check: the points $(1, -1)$ and $(7, -1)$ both satisfy the equation ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7 \\le x \\le -1$): reads the center's $x$-coordinate as $-4$ instead of $4$.\n* Choice B ($-5 \\le x \\le 13$): uses $9$ as the radius rather than as $r^2$.\n* Choice C ($-3 \\le x \\le 3$): centers the interval at the origin and ignores the shift to $x = 4$.\n\n**Test Day Takeaway:** A circle's $x$-values span one radius on each side of the center's $x$-coordinate.",
      skills: ["circle-equation"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "For which constant $k$ does a drone's path $(x - 5)^2 + (y - k)^2 = 16$ sit entirely above the $x$-axis except for one point of contact?",
      choices: [
        // distractor: places the path below the axis, where its points have negative y
        { id: "A", text: "$-4$" },
        { id: "B", text: "$4$" },
        // distractor: uses the diameter 8 as the distance from the center to the axis
        { id: "C", text: "$8$" },
        // distractor: uses r^2 = 16 as the radius
        { id: "D", text: "$16$" }
      ],
      correctAnswer: "B",
      hint: "How far from the $x$-axis must the center sit for exactly one contact point?",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The radius is $4$, so a path above and tangent to the $x$-axis has its center $4$ units up: $k = 4$.\n\n**The Full Solution:**\nStep 1: From $r^2 = 16$, the radius is $4$.\nStep 2: Touching a line at exactly one point means the distance from the center $(5, k)$ to the $x$-axis equals the radius, so $|k| = 4$.\nStep 3: The path lies above the axis, so $k = 4$. Check: the lowest point of the path is $(5, 0)$, and every other point has $y > 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-4$): satisfies $|k| = 4$ but puts the path below the axis, contradicting the given condition.\n* Choice C ($8$): uses the diameter as the distance to the axis, which would leave a gap of $4$.\n* Choice D ($16$): uses $r^2$ as the radius.\n\n**Test Day Takeaway:** A circle is tangent to a line exactly when the distance from its center to that line equals its radius.",
      skills: ["circle-equation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A survey marker's range boundary is the circle $(x - 5)^2 + (y + 2)^2 = 25$, where each unit is one kilometer and the $y$-axis represents a straight highway. How many points does the boundary share with that highway?",
      choices: [
        // distractor: compares r^2 = 25 with the distance 5 and concludes the axis is out of reach
        { id: "A", text: "None" },
        { id: "B", text: "Exactly one" },
        // distractor: compares the radius with the center's y-coordinate, 2, instead of its x-coordinate
        { id: "C", text: "Exactly two" },
        // distractor: treats the equation as describing the axis itself rather than a circle
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "B",
      hint: "How far does the center sit from the $y$-axis?",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The center $(5, -2)$ sits $5$ units from the $y$-axis, exactly one radius, so the axis touches the boundary once.\n\n**The Full Solution:**\nStep 1: The equation gives center $(5, -2)$ and $r = \\sqrt{25} = 5$.\nStep 2: The distance from $(5, -2)$ to the $y$-axis is the $x$-coordinate, $5$.\nStep 3: Distance equals radius, so there is exactly one shared point. Check: setting $x = 0$ gives $25 + (y + 2)^2 = 25$, whose only solution is $y = -2$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (None): compares the distance $5$ with $r^2 = 25$ and concludes the axis is out of reach.\n* Choice C (Exactly two): compares the radius with the center's $y$-coordinate, $2$, which measures the distance to the wrong axis.\n* Choice D (Infinitely many): would require the boundary to be the axis itself rather than a circle.\n\n**Test Day Takeaway:** Compare the distance from the center to a line with the radius: less gives two points, equal gives one, greater gives none.",
      skills: ["circle-equation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the $xy$-plane, the graph of $x^2 + y^2 = 8$ is a circle centered at the origin, and the line $y = x + 4$ is graphed in the same plane. At how many points do the line and the circle intersect?",
      choices: [
        // distractor: misreads the constant as no solution
        { id: "A", text: "Zero" },
        { id: "B", text: "Exactly one" },
        // distractor: assumes a line always cuts twice
        { id: "C", text: "Exactly two" },
        // distractor: confuses tangency with coincidence
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "B",
      hint: "How far is the line from the center compared with the radius?",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~40s):** Substituting gives $x^2 + (x + 4)^2 = 8$, which simplifies to $(x + 2)^2 = 0$ — a repeated root, so the line is tangent and meets the circle once.\n\n**The Full Solution:**\nStep 1: Substitute $y = x + 4$ into the circle: $x^2 + (x + 4)^2 = 8$.\nStep 2: Expand and collect: $2x^2 + 8x + 16 = 8$, so $2x^2 + 8x + 8 = 0$ and $x^2 + 4x + 4 = 0$.\nStep 3: This factors as $(x + 2)^2 = 0$, whose only solution is $x = -2$, giving the single point $(-2, 2)$. Check: the discriminant $4^2 - 4(1)(4) = 0$, the signature of tangency.\n\n**Why the wrong answers are tempting:**\n* Choice A (Zero): stops at $2x^2 + 8x + 8 = 0$ and reads the positive constant as evidence of no solution.\n* Choice C (Exactly two): assumes a line that reaches the circle must cross it twice; here the distance from the origin to the line is $2\\sqrt{2}$, exactly the radius.\n* Choice D (Infinitely many): treats a tangent line as if it lay along the circle.\n\n**Test Day Takeaway:** Substitute, collect into a quadratic, and read the discriminant: positive gives two points, zero gives one, negative gives none.",
      skills: ["circle-equation"]
    }
  ],

  // Section: Converting to Standard Form
  "Converting to Standard Form": [
    {
      id: 1,
      difficulty: "easy",
      question: "A circle in the $xy$-plane is defined by the equation $x^2 + y^2 - 6x + 20y + 84 = 0$. What are the coordinates of the center of this circle?",
      choices: [
        // distractor: reads the coefficients off with their signs
        { id: "A", text: "$(-6, 20)$" },
        // distractor: halves but keeps the signs
        { id: "B", text: "$(-3, 10)$" },
        { id: "C", text: "$(3, -10)$" },
        // distractor: negates without halving
        { id: "D", text: "$(6, -20)$" }
      ],
      correctAnswer: "C",
      hint: "Completing the square needs only half of each linear coefficient.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** Half of $-6$ is $-3$ and half of $20$ is $10$, so the completed squares are $(x - 3)^2$ and $(y + 10)^2$, putting the center at $(3, -10)$.\n\n**The Full Solution:**\nStep 1: Send the constant across and group like variables: $\\left(x^2 - 6x\\right) + \\left(y^2 + 20y\\right) = -84$.\nStep 2: Add $\\left(\\frac{-6}{2}\\right)^2 = 9$ and $\\left(\\frac{20}{2}\\right)^2 = 100$ to both sides: $(x - 3)^2 + (y + 10)^2 = -84 + 9 + 100$.\nStep 3: The right side is $25$, so the circle is $(x - 3)^2 + (y + 10)^2 = 25$, centered at $(3, -10)$ with radius $5$. Check: expanding that form returns $x^2 + y^2 - 6x + 20y + 84 = 0$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-6, 20)$): reads the linear coefficients straight off the equation, with no halving and no sign change.\n* Choice B ($(-3, 10)$): halves both coefficients but keeps their signs, forgetting that standard form subtracts the center.\n* Choice D ($(6, -20)$): flips the signs of the full coefficients without halving them.\n\n**Test Day Takeaway:** Halve the linear coefficient, then flip its sign. Those two moves take you from general form to the center in one pass.",
      skills: ["completing-square-circles", "circle-equation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A tracking dish's boundary in the $xy$-plane satisfies $x^2 + y^2 + Dx + Ey + F = 0$, with the three constants listed in the table. What is the radius of that boundary?",
      questionTable: { headers: ["Constant", "Value"], rows: [["$D$", "$-14$"], ["$E$", "$8$"], ["$F$", "$40$"]] },
      choices: [
        { id: "A", text: "$5$" },
        // distractor: reports 25, which is the square of the radius
        { id: "B", text: "$25$" },
        // distractor: reports the constant F = 40
        { id: "C", text: "$40$" },
        // distractor: computes 49 + 16 = 65 and never subtracts 40
        { id: "D", text: "$65$" }
      ],
      correctAnswer: "A",
      hint: "The constants tell you the radius only after the $x$-terms and $y$-terms are grouped.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** Completing both squares gives $(x - 7)^2 + (y + 4)^2 = 49 + 16 - 40 = 25$, so the radius is $5$.\n\n**The Full Solution:**\nStep 1: Substitute the constants: $x^2 + y^2 - 14x + 8y + 40 = 0$, then group as $(x^2 - 14x) + (y^2 + 8y) = -40$.\nStep 2: Complete each square by adding $49$ and $16$ to both sides: $(x - 7)^2 + (y + 4)^2 = -40 + 49 + 16$.\nStep 3: The right side is $25$, so $r^2 = 25$ and $r = 5$. Check: the point $(12, -4)$ satisfies $25 + 0 = 25$ and sits $5$ units from $(7, -4)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($25$): reports $r^2$ rather than $r$.\n* Choice C ($40$): reports the constant $F$ straight from the table.\n* Choice D ($65$): adds $49 + 16$ and forgets to move the $40$ across.\n\n**Test Day Takeaway:** After completing both squares the right side is $r^2$, so one square root still remains.",
      skills: ["completing-square-circles", "circle-equation"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The table gives equations for two circular grazing plots in the $xy$-plane. How far apart are the centers of plot $P$ and plot $Q$?",
      questionTable: { headers: ["Plot", "Equation"], rows: [["$P$", "$x^2 + y^2 - 12x + 4y + 15 = 0$"], ["$Q$", "$x^2 + y^2 + 4x - 8y + 11 = 0$"]] },
      choices: [
        // distractor: reports only the vertical separation, 6
        { id: "A", text: "$6$" },
        // distractor: reports only the horizontal separation, 8
        { id: "B", text: "$8$" },
        { id: "C", text: "$10$" },
        // distractor: adds 8 + 6 instead of using the Pythagorean theorem
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "C",
      hint: "Only the centers matter here, not the sizes of the plots.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** The centers are $(6, -2)$ and $(-2, 4)$, and the $8$-$6$-$10$ right triangle gives a distance of $10$.\n\n**The Full Solution:**\nStep 1: For plot $P$, half of $-12$ is $-6$ and half of $4$ is $2$, so its center is $(6, -2)$.\nStep 2: For plot $Q$, half of $4$ is $2$ and half of $-8$ is $-4$, so its center is $(-2, 4)$.\nStep 3: The separations are $6 - (-2) = 8$ and $-2 - 4 = -6$, so the distance is $\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$. Check: $64 + 36 = 100$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): reports only the vertical separation of the centers.\n* Choice B ($8$): reports only the horizontal separation.\n* Choice D ($14$): adds the two separations, $8 + 6$, instead of combining them with the Pythagorean theorem.\n\n**Test Day Takeaway:** The center of $x^2 + y^2 + Dx + Ey + F = 0$ is $\\left(-\\dfrac{D}{2}, -\\dfrac{E}{2}\\right)$ — no completing the square is needed just to locate it.",
      skills: ["completing-square-circles", "circle-equation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "Two circular irrigation zones have the equations listed in the table. Among all points of zone $K$, what is the largest $y$-coordinate?",
      questionTable: { headers: ["Zone", "Equation"], rows: [["$K$", "$x^2 + y^2 + 6x - 16y + 48 = 0$"], ["$L$", "$x^2 + y^2 - 10x + 2y + 10 = 0$"]] },
      choices: [
        // distractor: reports the radius 5
        { id: "A", text: "$5$" },
        // distractor: reports the y-coordinate of the center
        { id: "B", text: "$8$" },
        { id: "C", text: "$13$" },
        // distractor: adds r^2 = 25 to the center height instead of r = 5
        { id: "D", text: "$33$" }
      ],
      correctAnswer: "C",
      hint: "Where on a circle is the $y$-coordinate largest?",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** Zone $K$ is centered at $(-3, 8)$ with radius $5$, so its highest point is at $y = 8 + 5 = 13$.\n\n**The Full Solution:**\nStep 1: Group zone $K$'s equation: $(x^2 + 6x) + (y^2 - 16y) = -48$.\nStep 2: Complete both squares: $(x + 3)^2 + (y - 8)^2 = -48 + 9 + 64 = 25$, so the center is $(-3, 8)$ and the radius is $5$.\nStep 3: Every point lies within $5$ units of the center, so the greatest $y$-coordinate is $8 + 5 = 13$. Check: $(-3, 13)$ gives $0 + 25 = 25$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): reports the radius rather than a coordinate on the zone.\n* Choice B ($8$): reports the center's height, which is the middle of the zone, not its top.\n* Choice D ($33$): adds $r^2 = 25$ to the center's height instead of the radius $5$.\n\n**Test Day Takeaway:** The extreme $y$-values on a circle are the center's $y$-coordinate plus and minus the radius.",
      skills: ["completing-square-circles", "circle-equation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A dockside crane's counterweight traces the graph of $x^2 + y^2 - 8x + 10y + c = 0$, where one unit is one meter and $c$ is a constant. For that trace to be a circle of positive radius, which condition must $c$ satisfy?",
      choices: [
        { id: "A", text: "$c < 41$" },
        // distractor: moves 41 to the wrong side, requiring c < -41
        { id: "B", text: "$c < -41$" },
        // distractor: solves 41 + c > 0 instead of 41 - c > 0
        { id: "C", text: "$c > -41$" },
        // distractor: reverses the inequality after finding 41
        { id: "D", text: "$c > 41$" }
      ],
      correctAnswer: "A",
      hint: "After both squares are completed, what has to be true of the number left on the right?",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~40s):** Completing the squares gives $r^2 = 41 - c$, and $41 - c > 0$ means $c < 41$.\n\n**The Full Solution:**\nStep 1: Group the terms: $(x^2 - 8x) + (y^2 + 10y) = -c$.\nStep 2: Complete both squares by adding $16$ and $25$: $(x - 4)^2 + (y + 5)^2 = 16 + 25 - c = 41 - c$.\nStep 3: A circle with positive radius needs $41 - c > 0$, so $c < 41$. Check: $c = 40$ gives $r^2 = 1$, a genuine circle, while $c = 41$ collapses the graph to the single point $(4, -5)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($c < -41$): moves $41$ to the wrong side of the inequality.\n* Choice C ($c > -41$): treats the constant as $41 + c$ rather than $41 - c$.\n* Choice D ($c > 41$): finds $41$ correctly but reverses the direction, which makes the right side negative.\n\n**Test Day Takeaway:** A general-form equation is a real circle only while the completed-square right side stays strictly positive.",
      skills: ["completing-square-circles", "circle-equation"]
    }
  ],

  // Section: Tangent Lines
  "Tangent Lines": [
    {
      id: 1,
      difficulty: "easy",
      question: "A line is tangent to a circle at point $T$, and $O$ is the center of the circle. Which of the following must be true about the tangent line and $\\overline{OT}$?",
      choices: [
        // distractor: parallel lines would never touch the radius
        { id: "A", text: "The tangent line is parallel to $\\overline{OT}$." },
        { id: "B", text: "The tangent line is perpendicular to $\\overline{OT}$." },
        // distractor: a line through the center is a secant
        { id: "C", text: "The tangent line contains $\\overline{OT}$." },
        // distractor: bisecting would send the line through the interior
        { id: "D", text: "The tangent line bisects $\\overline{OT}$." }
      ],
      correctAnswer: "B",
      hint: "A tangent touches at exactly one point, so think about the shortest path from the center to that line.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The radius drawn to the point of tangency is the shortest segment from the center to the line, and the shortest such segment is always perpendicular to the line.\n\n**The Full Solution:**\nStep 1: A tangent line meets the circle only at $T$, so every other point of the line lies outside the circle.\nStep 2: That makes $OT$ the shortest distance from $O$ to the line, since any other point of the line is farther than one radius from $O$.\nStep 3: The shortest segment from a point to a line is perpendicular to it, so the tangent line is perpendicular to $\\overline{OT}$. Check: every point $P$ on the tangent line other than $T$ lies outside the circle, so $OP > OT$, which is exactly what makes $T$ the foot of the perpendicular.\n\n**Why the wrong answers are tempting:**\n* Choice A: a line parallel to $\\overline{OT}$ could never meet it, yet the tangent line passes through $T$, an endpoint of that radius.\n* Choice C: a line through the center cuts the circle at two points, making it a secant rather than a tangent.\n* Choice D: bisecting $\\overline{OT}$ would force the line through the interior of the circle, producing two intersection points.\n\n**Test Day Takeaway:** Radius drawn to the point of tangency, right angle guaranteed. That right angle is what turns most tangent problems into right-triangle problems.",
      skills: ["tangent-lines"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A cyclist on a circular track centered at the origin releases at $(3, 4)$ and continues along the tangent line there. What is that line's slope?",
      choices: [
        // distractor: negates the radius slope without inverting it
        { id: "A", text: "$-\\dfrac{4}{3}$" },
        { id: "B", text: "$-\\dfrac{3}{4}$" },
        // distractor: inverts the radius slope but keeps it positive
        { id: "C", text: "$\\dfrac{3}{4}$" },
        // distractor: reports the radius slope itself
        { id: "D", text: "$\\dfrac{4}{3}$" }
      ],
      correctAnswer: "B",
      hint: "Draw the radius from the center to the release point first.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The radius to $(3, 4)$ has slope $\\dfrac{4}{3}$, so the tangent's slope is $-\\dfrac{3}{4}$.\n\n**The Full Solution:**\nStep 1: The radius runs from $(0, 0)$ to $(3, 4)$, so its slope is $\\dfrac{4 - 0}{3 - 0} = \\dfrac{4}{3}$.\nStep 2: A tangent line is perpendicular to the radius at the point of contact.\nStep 3: The perpendicular slope is the negative reciprocal, $-\\dfrac{3}{4}$. Check: $\\dfrac{4}{3} \\cdot \\left(-\\dfrac{3}{4}\\right) = -1$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-\\dfrac{4}{3}$): negates the radius slope without flipping it.\n* Choice C ($\\dfrac{3}{4}$): flips the radius slope but leaves it positive.\n* Choice D ($\\dfrac{4}{3}$): reports the slope of the radius itself.\n\n**Test Day Takeaway:** Tangent and radius meet at a right angle, so their slopes are negative reciprocals.",
      skills: ["tangent-lines", "perpendicular-negative-reciprocal"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "From a point $P$ outside a circle, tangent segments $\\overline{PA}$ and $\\overline{PB}$ are drawn, touching the circle at $A$ and $B$. If $PA = 4x - 5$ and $PB = 2x + 7$, what is the length of $\\overline{PA}$?",
      choices: [
        // distractor: reports x
        { id: "A", text: "$6$" },
        { id: "B", text: "$19$" },
        // distractor: drops the constant term
        { id: "C", text: "$24$" },
        // distractor: adds both segments
        { id: "D", text: "$38$" }
      ],
      correctAnswer: "B",
      hint: "Two tangent segments drawn from the same external point are related in a way that gives you an equation.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** Tangent segments from a common external point are congruent, so $4x - 5 = 2x + 7$ gives $x = 6$ and $PA = 4(6) - 5 = 19$.\n\n**The Full Solution:**\nStep 1: $\\overline{PA}$ and $\\overline{PB}$ are tangent to the same circle from the same external point, so $PA = PB$.\nStep 2: Solve $4x - 5 = 2x + 7$: subtracting $2x$ gives $2x - 5 = 7$, so $2x = 12$ and $x = 6$.\nStep 3: $PA = 4(6) - 5 = 19$. Check: $PB = 2(6) + 7 = 19$, the same length.\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): reports the value of $x$ instead of substituting it back into the expression for the length.\n* Choice C ($24$): evaluates $4x$ at $x = 6$ but drops the $-5$.\n* Choice D ($38$): adds $PA$ and $PB$, reporting the combined length of both tangent segments.\n\n**Test Day Takeaway:** Solving for $x$ is the middle of the problem, not the end. Substitute back into whatever expression the question actually names.",
      skills: ["tangent-lines"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A line is tangent to a circle of radius $9$ at point $T$, and point $P$ lies on that tangent line with $PT = 12$. What is the distance from the center of the circle to $P$?",
      choices: [
        // distractor: subtracts the lengths
        { id: "A", text: "$3$" },
        { id: "B", text: "$15$" },
        // distractor: adds the lengths
        { id: "C", text: "$21$" },
        // distractor: reports the square
        { id: "D", text: "$225$" }
      ],
      correctAnswer: "B",
      hint: "The radius drawn to the point of tangency meets the tangent line at a right angle.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The radius and the tangent form a right angle at $T$, so $OP = \\sqrt{9^2 + 12^2} = 15$.\n\n**The Full Solution:**\nStep 1: Let $O$ be the center. Because the tangent line is perpendicular to $\\overline{OT}$, triangle $OTP$ has a right angle at $T$.\nStep 2: The legs are $OT = 9$ and $TP = 12$, and $\\overline{OP}$ is the hypotenuse: $OP^2 = 81 + 144 = 225$.\nStep 3: $OP = 15$. Check: $9$-$12$-$15$ is the $3$-$4$-$5$ triple scaled by $3$.\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): subtracts the two lengths, $12 - 9$, as though the three points were collinear.\n* Choice C ($21$): adds the two lengths, which would be the path from $O$ to $T$ to $P$, not the straight-line distance.\n* Choice D ($225$): reports $OP^2$ without taking the square root.\n\n**Test Day Takeaway:** Draw the radius to the point of tangency and a right triangle appears. Almost every tangent-length question is the Pythagorean theorem in disguise.",
      skills: ["tangent-lines"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the $xy$-plane, a circle with center $(3, 5)$ passes through the point $(7, 2)$. Which of the following equations defines the line that is tangent to this circle at $(7, 2)$?",
      choices: [
        // distractor: inverts without changing the sign
        { id: "A", text: "$y = -\\frac{4}{3}x + \\frac{34}{3}$" },
        // distractor: uses the radius slope
        { id: "B", text: "$y = -\\frac{3}{4}x + \\frac{29}{4}$" },
        // distractor: changes the sign without inverting
        { id: "C", text: "$y = \\frac{3}{4}x - \\frac{13}{4}$" },
        { id: "D", text: "$y = \\frac{4}{3}x - \\frac{22}{3}$" }
      ],
      correctAnswer: "D",
      hint: "Find the radius's slope first; the tangent line is perpendicular to it at the point where they meet.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~60s):** The radius has slope $\\frac{2 - 5}{7 - 3} = -\\frac{3}{4}$, so the tangent's slope is $\\frac{4}{3}$; through $(7, 2)$ that is $y = \\frac{4}{3}x - \\frac{22}{3}$.\n\n**The Full Solution:**\nStep 1: The radius joins $(3, 5)$ and $(7, 2)$, so its slope is $\\frac{2 - 5}{7 - 3} = -\\frac{3}{4}$.\nStep 2: The tangent line is perpendicular to that radius, so its slope is the negative reciprocal, $\\frac{4}{3}$.\nStep 3: Point-slope form gives $y - 2 = \\frac{4}{3}(x - 7)$, so $y = \\frac{4}{3}x - \\frac{28}{3} + 2 = \\frac{4}{3}x - \\frac{22}{3}$. Check: at $x = 7$, $y = \\frac{28 - 22}{3} = 2$, the point of tangency.\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -\\frac{4}{3}x + \\frac{34}{3}$): inverts the radius's slope but keeps it negative, so the line is not perpendicular.\n* Choice B ($y = -\\frac{3}{4}x + \\frac{29}{4}$): uses the radius's own slope $-\\frac{3}{4}$ for the tangent line.\n* Choice C ($y = \\frac{3}{4}x - \\frac{13}{4}$): changes the sign of the radius's slope without inverting it.\n\n**Test Day Takeaway:** Perpendicular means flip and negate, both moves. Every choice here passes through the point of tangency, so only the slope separates them.",
      skills: ["tangent-lines", "perpendicular-negative-reciprocal"]
    }
  ]
};
