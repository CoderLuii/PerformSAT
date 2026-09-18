// Practice questions for Radians & Degrees module
// Questions are organized by SECTION (question type)

export const radiansDegreesQuestions = {
  // Section: Converting Angles
  "Converting Angles": [
    {
      id: 1,
      difficulty: "easy",
      question: "A canal lock's mitre gate swings through an angle of $135$ degrees as it opens, and the lock's control system logs every gate position in radians. What measure, in radians, does the control system log for this swing?",
      choices: [
        // distractor: divides by 360 instead of 180: 135 pi / 360 = 3 pi / 8
        { id: "A", text: "$\\frac{3\\pi}{8}$" },
        { id: "B", text: "$\\frac{3\\pi}{4}$" },
        // distractor: inverts the fraction, computing 180 pi / 135 = 4 pi / 3
        { id: "C", text: "$\\frac{4\\pi}{3}$" },
        // distractor: divides by 90 instead of 180: 135 pi / 90 = 3 pi / 2
        { id: "D", text: "$\\frac{3\\pi}{2}$" }
      ],
      correctAnswer: "B",
      hint: "A straight angle is 180 degrees and also pi radians.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** Multiply by $\\frac{\\pi}{180}$: $135 \\cdot \\frac{\\pi}{180} = \\frac{3\\pi}{4}$.\n\n**The Full Solution:**\nStep 1: Set the conversion factor. Since $180$ degrees $= \\pi$ radians, multiply a degree measure by $\\frac{\\pi}{180}$.\nStep 2: Multiply and reduce. $135 \\cdot \\frac{\\pi}{180} = \\frac{135\\pi}{180}$, and dividing top and bottom by $45$ gives $\\frac{3\\pi}{4}$.\nStep 3: Check the size. $\\frac{3\\pi}{4}$ is three quarters of $\\pi$, and $135$ degrees is three quarters of $180$ degrees. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3\\pi}{8}$): divides by $360$, the measure of a full turn, instead of by $180$.\n* Choice C ($\\frac{4\\pi}{3}$): flips the conversion factor to $\\frac{180}{\\pi}$, which converts the wrong way.\n* Choice D ($\\frac{3\\pi}{2}$): divides by $90$; that would make a right angle equal to $\\pi$ radians.\n\n**Test Day Takeaway:** Degrees to radians multiplies by $\\frac{\\pi}{180}$; radians to degrees multiplies by $\\frac{180}{\\pi}$. Check the size of the answer against a half turn.",
      skills: ["degrees-to-radians"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A theater's revolving stage completes a scene change by turning through $\\frac{7\\pi}{6}$ radians, and the stage manager's cue sheet lists every rotation in degrees. What measure, in degrees, belongs on the cue sheet for this rotation?",
      choices: [
        // distractor: uses 90 degrees in place of pi: 7(90)/6 = 105
        { id: "A", text: "$105$" },
        { id: "B", text: "$210$" },
        // distractor: uses 360 degrees in place of pi: 7(360)/6 = 420
        { id: "C", text: "$420$" },
        // distractor: divides by 2 instead of 6: 7(180)/2 = 630
        { id: "D", text: "$630$" }
      ],
      correctAnswer: "B",
      hint: "Trade the pi for 180 degrees and simplify.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** Replace $\\pi$ with $180$ degrees: $\\frac{7(180)}{6} = 210$ degrees.\n\n**The Full Solution:**\nStep 1: Set the conversion factor. Multiply a radian measure by $\\frac{180}{\\pi}$ to get degrees.\nStep 2: Multiply and cancel. $\\frac{7\\pi}{6} \\cdot \\frac{180}{\\pi} = \\frac{7 \\cdot 180}{6} = 7 \\cdot 30 = 210$ degrees.\nStep 3: Check the size. $\\frac{7\\pi}{6}$ is a little more than $\\pi$, and $210$ degrees is a little more than $180$ degrees. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($105$): uses $90$ degrees in place of $\\pi$: $\\frac{7(90)}{6} = 105$. A half turn is $180$ degrees, not $90$.\n* Choice C ($420$): uses $360$ degrees in place of $\\pi$, doubling the conversion.\n* Choice D ($630$): divides by $2$ rather than by the denominator $6$.\n\n**Test Day Takeaway:** Substitute $180$ degrees for $\\pi$ and simplify. A radian measure just past $\\pi$ must land just past $180$ degrees.",
      skills: ["radians-to-degrees"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "In the circle shown, central angle $AOB$ measures $135^{\\circ}$ and the radius of the circle is $8$ centimeters. What is the length, in centimeters, of arc $AB$?",
      diagram: { type: "circleWithSector", params: { centralAngle: 135, radius: 8, showRadiusLabel: true, labelCenter: "O", labelPoint1: "A", labelPoint2: "B" } },
      choices: [
        { id: "A", text: "$\\frac{3\\pi}{4}$" },
        { id: "B", text: "$6\\pi$" },
        { id: "C", text: "$12\\pi$" },
        { id: "D", text: "$24\\pi$" }
      ],
      correctAnswer: "B",
      hint: "The arc-length relationship $s = r\\theta$ only works when $\\theta$ is measured in radians.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $135^{\\circ}=\\frac{3\\pi}{4}$ radians, and $s = r\\theta = 8\\left(\\frac{3\\pi}{4}\\right)=6\\pi$ — choice B.\n\n**The Full Solution:**\nStep 1: Convert the central angle: $135\\cdot\\frac{\\pi}{180}=\\frac{3\\pi}{4}$ radians.\nStep 2: Apply the arc-length relationship with the radian measure: $s = r\\theta = 8\\left(\\frac{3\\pi}{4}\\right)=6\\pi$ centimeters.\nStep 3: Check with the fraction of the circle: the sector is $\\frac{135}{360}=\\frac{3}{8}$ of the circle, and $\\frac{3}{8}$ of the circumference $2\\pi(8)=16\\pi$ is $6\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{3\\pi}{4}$): converts the angle correctly but stops there, reporting the radian measure instead of multiplying by the radius.\n* Choice C ($12\\pi$): uses the diameter, $16$, in place of the radius: $16\\left(\\frac{3\\pi}{4}\\right)=12\\pi$.\n* Choice D ($24\\pi$): computes the sector's area, $\\frac{1}{2}r^{2}\\theta=\\frac{1}{2}(64)\\left(\\frac{3\\pi}{4}\\right)=24\\pi$, rather than the arc's length.\n\n**Test Day Takeaway:** Arc length is $r\\theta$ and sector area is $\\frac{1}{2}r^{2}\\theta$ — both demand radians. Convert first, then decide which of the two the question asked for.",
      skills: ["radian-measure-understanding", "degrees-to-radians"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A turnstile at a transit station advances $\\frac{2\\pi}{9}$ radians each time a rider passes through it. A counter records that $n$ riders passed through and that the turnstile rotated a total of $320$ degrees. What is the value of $n$?",
      choices: [
        // distractor: converts one advance to 80 degrees by using 360 in place of pi, then divides 320 by 80
        { id: "A", text: "$4$" },
        { id: "B", text: "$8$" },
        // distractor: converts one advance to 20 degrees by using 90 in place of pi, then divides 320 by 20
        { id: "C", text: "$16$" },
        // distractor: reports the degree measure of a single advance, 40, instead of the number of riders
        { id: "D", text: "$40$" }
      ],
      correctAnswer: "B",
      hint: "Find what one rider is worth in degrees before dividing.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** One advance is $\\frac{2\\pi}{9} \\cdot \\frac{180}{\\pi} = 40$ degrees, and $\\frac{320}{40} = 8$ riders.\n\n**The Full Solution:**\nStep 1: Convert one advance to degrees. $\\frac{2\\pi}{9} \\cdot \\frac{180}{\\pi} = \\frac{2 \\cdot 180}{9} = 40$ degrees.\nStep 2: Divide the total by the per-rider amount. $n = \\frac{320}{40} = 8$ riders.\nStep 3: Check. Eight advances of $40$ degrees total $320$ degrees, which is $8 \\cdot \\frac{2\\pi}{9} = \\frac{16\\pi}{9}$ radians. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): converts one advance to $80$ degrees by putting $360$ where $\\pi$ belongs, then divides $320$ by $80$.\n* Choice C ($16$): converts one advance to $20$ degrees by putting $90$ where $\\pi$ belongs.\n* Choice D ($40$): is the degree measure of ONE advance, not the number of riders.\n\n**Test Day Takeaway:** Put both quantities in the same unit before dividing, then check the units of what the question actually asks for.",
      skills: ["degrees-to-radians"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A circle has a radius of $r$, where $r > 0$. An arc of this circle has a length of $\\frac{7\\pi r}{10}$. What is the degree measure of the central angle that bounds this arc?",
      choices: [
        { id: "A", text: "$\\frac{7\\pi}{10}$" },
        { id: "B", text: "$63^{\\circ}$" },
        { id: "C", text: "$126^{\\circ}$" },
        { id: "D", text: "$252^{\\circ}$" }
      ],
      correctAnswer: "C",
      hint: "Solve $s = r\\theta$ for $\\theta$ before you convert anything — watch what happens to $r$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $\\theta=\\frac{s}{r}=\\frac{7\\pi}{10}$ radians once $r$ cancels; multiplying by $\\frac{180}{\\pi}$ gives $126$ degrees — choice C.\n\n**The Full Solution:**\nStep 1: Arc length satisfies $s = r\\theta$ with $\\theta$ in radians, so $\\theta = \\frac{s}{r} = \\frac{7\\pi r}{10r} = \\frac{7\\pi}{10}$. The radius cancels, so the angle does not depend on the size of the circle.\nStep 2: Convert that radian measure to degrees: $\\frac{7\\pi}{10}\\cdot\\frac{180}{\\pi}=\\frac{7(180)}{10}=126$ degrees.\nStep 3: Check by fractions of a turn: $126^{\\circ}$ is $\\frac{126}{360}=\\frac{7}{20}$ of the circle, and $\\frac{7}{20}$ of the circumference $2\\pi r$ is $\\frac{7\\pi r}{10}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{7\\pi}{10}$): is the correct radian measure, but the question asks for the degree measure — the conversion step is missing.\n* Choice B ($63^{\\circ}$): multiplies by $\\frac{90}{\\pi}$ instead of $\\frac{180}{\\pi}$, pairing $\\pi$ radians with a right angle: $\\frac{7(90)}{10}=63$.\n* Choice D ($252^{\\circ}$): multiplies by $\\frac{360}{\\pi}$, pairing $\\pi$ radians with a full rotation: $\\frac{7(360)}{10}=252$, which is twice too large.\n\n**Test Day Takeaway:** An arc length written as a multiple of $r$ pins the central angle by itself — divide out the radius, then convert. Read the last four words of the stem to see which unit the answer needs.",
      skills: ["radians-to-degrees"]
    }
  ]
};
