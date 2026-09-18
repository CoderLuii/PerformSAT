// Practice questions for Transformations module
// Questions are organized by SECTION (question type)

export const transformationsQuestions = {
  // Section: Fundamentals
  "Fundamentals": [
    {
      id: 1,
      difficulty: "easy",
      question: "The function $p$ is defined by $p(x)=x^{2}$. In the $xy$-plane, the graph of $y=p(x)-6$ is the graph of $y=p(x)$ shifted in which of the following ways?",
      choices: [
        { id: "A", text: "Down $6$ units" },
        // distractor: reads the outside -6 as a horizontal move
        { id: "B", text: "Left $6$ units" },
        // distractor: reads the outside -6 as a shift right
        { id: "C", text: "Right $6$ units" },
        // distractor: reverses the sign of an outside constant
        { id: "D", text: "Up $6$ units" }
      ],
      correctAnswer: "A",
      hint: "Decide first whether the $-6$ acts on the input of $p$ or on its output.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** The $-6$ sits outside $p$, so it lowers every output by $6$: the graph slides down $6$.\n\n**The Full Solution:**\nStep 1: In $p(x)-6$ the subtraction happens after $p$ has produced its output, so only $y$-values change.\nStep 2: A point $(a,b)$ on $y=p(x)$ becomes $(a,\\,b-6)$ on $y=p(x)-6$; the $x$-coordinate never moves.\nStep 3: Check with the lowest point: $(0,0)$ on $y=p(x)$ becomes $(0,-6)$, exactly $6$ units lower. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (Left $6$ units): a horizontal move requires a change inside $p$, such as $p(x+6)$; here the $6$ is outside.\n* Choice C (Right $6$ units): right $6$ would be $p(x-6)$ — the subtraction would have to be attached to $x$, not to the output.\n* Choice D (Up $6$ units): the sign is read backwards; outside constants move the graph in the direction of their own sign, so $-6$ means down.\n\n**Test Day Takeaway:** Outside the function, constants act on $y$ and read straight: $+k$ raises the graph, $-k$ lowers it.",
      skills: ["function-transformations"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The function $q$ is defined by $q(x)=\\sqrt{x}$, and the leftmost point of the graph of $y=q(x)$ in the $xy$-plane is the origin. What is the leftmost point of the graph of $y=q(x-9)$?",
      choices: [
        // distractor: moves the endpoint left instead of right
        { id: "A", text: "$(-9,0)$" },
        // distractor: applies the shift to the y-coordinate
        { id: "B", text: "$(0,-9)$" },
        // distractor: applies the shift to the y-coordinate with the wrong sign
        { id: "C", text: "$(0,9)$" },
        { id: "D", text: "$(9,0)$" }
      ],
      correctAnswer: "D",
      hint: "Ask which input makes the quantity under the radical equal to $0$.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~20s):** The radical starts where $x-9=0$, so the endpoint moves from $x=0$ to $x=9$ and stays on the $x$-axis.\n\n**The Full Solution:**\nStep 1: $q(x-9)=\\sqrt{x-9}$, which is defined only when $x-9\\ge 0$, that is, when $x\\ge 9$.\nStep 2: At the smallest allowed input, $x=9$, the output is $\\sqrt{9-9}=\\sqrt{0}=0$.\nStep 3: So the leftmost point is $(9,0)$ — the origin translated $9$ units right, with no vertical movement. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-9,0)$): treats $x-9$ as a shift left; inside the function the graph moves opposite to the sign.\n* Choice B ($(0,-9)$): applies the $9$ to the output, which would require $q(x)-9$.\n* Choice C ($(0,9)$): applies the $9$ to the output and reverses its sign as well.\n\n**Test Day Takeaway:** For a change inside the function, set the inside expression equal to the old input value and solve for the new $x$.",
      skills: ["function-transformations"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "For a function $m$, the graph of $y=-m(x)$ in the $xy$-plane can be obtained by reflecting the graph of $y=m(x)$ across which of the following lines?",
      choices: [
        // distractor: reflects through the origin instead of the x-axis
        { id: "A", text: "The line $y=-x$" },
        // distractor: confuses a sign change with taking the inverse
        { id: "B", text: "The line $y=x$" },
        { id: "C", text: "The $x$-axis" },
        // distractor: confuses -m(x) with m(-x)
        { id: "D", text: "The $y$-axis" }
      ],
      correctAnswer: "C",
      hint: "Track what the negative sign does to a single point $(a,b)$ on the graph of $m$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Negating the output sends $(a,b)$ to $(a,-b)$ — the $x$-coordinate is fixed and the height flips, which is a mirror in the $x$-axis.\n\n**The Full Solution:**\nStep 1: The negative sign is applied after $m$ evaluates, so it multiplies every output by $-1$.\nStep 2: A point $(a,b)$ on $y=m(x)$ therefore corresponds to $(a,-b)$ on $y=-m(x)$: same horizontal position, opposite height.\nStep 3: Points above the $x$-axis land the same distance below it, and points on the axis stay put — the definition of a reflection across the $x$-axis. Check: if $m(4)=7$, then $-m(4)=-7$, and $(4,7)$ and $(4,-7)$ are mirror images in the $x$-axis. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (the line $y=-x$): reflecting across $y=-x$ sends $(a,b)$ to $(-b,-a)$, which mixes the coordinates; only the output changed here.\n* Choice B (the line $y=x$): reflecting across $y=x$ swaps the coordinates and produces the inverse relation, not a sign change.\n* Choice D (the $y$-axis): that reflection is $m(-x)$, with the negative sign attached to the input rather than to the output.\n\n**Test Day Takeaway:** A negative outside the function flips $y$ (reflection in the $x$-axis); a negative inside flips $x$ (reflection in the $y$-axis).",
      skills: ["function-transformations"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A creamery logs the acidity, in degrees, of vat one as $v(t)$ at hour $t$ and of vat two, filled later, as $w(t) = v(t - 5) - 7$. Vat one reads $26$ degrees only at hour $12$, and $w(a) = 19$. What is the value of $a$?",
      choices: [
        // distractor: shifts the wrong way, computing 12 - 5 = 7
        { id: "A", text: "$7$" },
        // distractor: reports vat one's hour rather than vat two's
        { id: "B", text: "$12$" },
        { id: "C", text: "$17$" },
        // distractor: reports vat one's acidity reading instead of an hour
        { id: "D", text: "$26$" }
      ],
      correctAnswer: "C",
      hint: "The only acidity reading you are handed belongs to vat one.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $w(a) = 19$ forces $v(a - 5) = 26$, and $v$ reads $26$ at hour $12$, so $a - 5 = 12$ and $a = 17$.\n\n**The Full Solution:**\nStep 1: Undo the outside operation: $w(a) = v(a - 5) - 7 = 19$, so $v(a - 5) = 26$.\nStep 2: Vat one reads $26$ degrees only at hour $12$, so $a - 5 = 12$.\nStep 3: Therefore $a = 17$. Check: $w(17) = v(17 - 5) - 7 = v(12) - 7 = 26 - 7 = 19$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): computing $12 - 5$; the shift must be undone in the other direction, since the input to $v$ is $a - 5$.\n* Choice B ($12$): reporting the hour at which vat one reads $26$ degrees rather than the hour asked about for vat two.\n* Choice D ($26$): reporting an acidity reading where the question asks for an hour.\n\n**Test Day Takeaway:** Strip the outside operation first, then match the inside expression to the input you were given.",
      skills: ["function-transformations"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the $xy$-plane, a function $d$ is defined for every $x>0$, and its graph lies entirely in quadrants I and IV. The graph of $y=d(-x)$ lies entirely in which quadrants?",
      choices: [
        // distractor: keeps the original quadrants and adds the mirror image
        { id: "A", text: "Quadrants I and II" },
        // distractor: treats d(-x) as leaving the graph unchanged
        { id: "B", text: "Quadrants I and IV" },
        { id: "C", text: "Quadrants II and III" },
        // distractor: reflects across the x-axis instead of the y-axis
        { id: "D", text: "Quadrants III and IV" }
      ],
      correctAnswer: "C",
      hint: "Follow one point $(a,b)$ with $a>0$ through the substitution and watch only the sign of its first coordinate.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** Replacing $x$ with $-x$ sends $(a,b)$ to $(-a,b)$, so every point keeps its height but crosses to the left half-plane: I becomes II and IV becomes III.\n\n**The Full Solution:**\nStep 1: If $(a,b)$ is on the graph of $y=d(x)$, then $d(a)=b$. For $y=d(-x)$, the input $-a$ gives $d(-(-a))=d(a)=b$, so $(-a,b)$ is on the new graph.\nStep 2: Because $d$ is defined only for $x>0$, every original point has $a>0$, so every new point has first coordinate $-a<0$: the entire graph sits left of the $y$-axis.\nStep 3: Heights are unchanged, so points that were in quadrant I ($b>0$) move to quadrant II, and points that were in quadrant IV ($b<0$) move to quadrant III. Check: $(2,5)\\to(-2,5)$ and $(2,-5)\\to(-2,-5)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (quadrants I and II): keeps a copy of the original graph; a reflection relocates the points rather than duplicating them.\n* Choice B (quadrants I and IV): assumes $d(-x)$ leaves the graph in place, which would require $d$ to satisfy $d(-x)=d(x)$.\n* Choice D (quadrants III and IV): flips the heights instead of the inputs — that is the effect of $-d(x)$.\n\n**Test Day Takeaway:** A negative inside the function reflects across the $y$-axis: first coordinates change sign, second coordinates do not.",
      skills: ["function-transformations"]
    },
    {
      id: 6,
      difficulty: "easy",
      question: "The function $r$ is defined by $r(x)=4x-9$. In the $xy$-plane, the graph of $y=r(x)+5$ is a translation of the graph of $y=r(x)$. Which translation is it?",
      choices: [
        // distractor: reverses the sign of an outside constant
        { id: "A", text: "$5$ units down" },
        // distractor: treats the outside +5 as an inside change
        { id: "B", text: "$5$ units left" },
        // distractor: treats the outside +5 as a horizontal shift
        { id: "C", text: "$5$ units right" },
        { id: "D", text: "$5$ units up" }
      ],
      correctAnswer: "D",
      hint: "Compare the two outputs at the same input and see which one is larger.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** Adding $5$ after $r$ evaluates raises every output by $5$, a translation up $5$ units.\n\n**The Full Solution:**\nStep 1: $r(x)+5=(4x-9)+5=4x-4$, a line with the same slope $4$ but a $y$-intercept $5$ units higher.\nStep 2: Equal slopes mean the lines are parallel, so the change must be a pure vertical translation.\nStep 3: Check at $x=0$: $r(0)=-9$ and $r(0)+5=-4$, and $-4$ is $5$ units above $-9$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$ units down): reverses the sign; the output grows by $5$, so the graph rises.\n* Choice B ($5$ units left): a left shift comes from $r(x+5)$, where the $5$ is attached to the input.\n* Choice C ($5$ units right): a right shift comes from $r(x-5)$; no change was made inside the function.\n\n**Test Day Takeaway:** For a line, adding a constant outside changes only the $y$-intercept — same slope, whole graph lifted.",
      skills: ["function-transformations"]
    },
    {
      id: 7,
      difficulty: "easy",
      question: "The function $t$ is defined by $t(x)=|x|$. In the $xy$-plane, the graph of $y=t(x+8)$ can be produced by moving the graph of $y=t(x)$ how far and in which direction?",
      choices: [
        // distractor: treats the inside +8 as a vertical shift down
        { id: "A", text: "$8$ units down" },
        { id: "B", text: "$8$ units left" },
        // distractor: moves the graph in the direction of the sign
        { id: "C", text: "$8$ units right" },
        // distractor: treats the inside +8 as a vertical shift up
        { id: "D", text: "$8$ units up" }
      ],
      correctAnswer: "B",
      hint: "Find the input that now produces the corner of the V.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The corner occurs where the inside expression is $0$: $x+8=0$ gives $x=-8$, so the graph slid $8$ units left.\n\n**The Full Solution:**\nStep 1: $t(x+8)=|x+8|$, and the vertex of an absolute value graph sits where the expression inside the bars equals $0$.\nStep 2: Solving $x+8=0$ gives $x=-8$, so the vertex has moved from $(0,0)$ to $(-8,0)$.\nStep 3: Every other point moves with it: the point $(3,3)$ on $y=t(x)$ corresponds to $(-5,3)$ on $y=t(x+8)$, again $8$ units left. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$ units down): a downward move needs $t(x)-8$, with the constant outside the absolute value.\n* Choice C ($8$ units right): the classic reversal: inside the function, $+8$ moves the graph in the negative direction.\n* Choice D ($8$ units up): an upward move needs $t(x)+8$; here the $8$ is inside the bars, so the change is horizontal.\n\n**Test Day Takeaway:** Inside the function the graph moves opposite to the sign: $+8$ inside means $8$ units left.",
      skills: ["function-transformations"]
    },
    {
      id: 8,
      difficulty: "medium",
      question: "A meteor camera records background brightness $c(x)$, in counts, $x$ minutes after twilight. After the sensor is recalibrated the recorded brightness follows $y = c(x + 4) - 6$. How does the new graph compare with the graph of $y = c(x)$?",
      choices: [
        { id: "A", text: "It is shifted $4$ units left and $6$ units down." },
        // distractor: reads the -6 outside the function as an upward move
        { id: "B", text: "It is shifted $4$ units left and $6$ units up." },
        // distractor: reads x + 4 inside the function as a move to the right
        { id: "C", text: "It is shifted $4$ units right and $6$ units down." },
        // distractor: reverses both directions
        { id: "D", text: "It is shifted $4$ units right and $6$ units up." }
      ],
      correctAnswer: "A",
      hint: "Decide separately what the change inside the parentheses does and what the change outside it does.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** Adding $4$ inside moves the graph $4$ to the left; subtracting $6$ outside moves it $6$ down.\n\n**The Full Solution:**\nStep 1: The change $x + 4$ sits inside the function, so it acts on inputs. The new graph reaches at $x$ whatever the old graph reached at $x + 4$, which is a shift of $4$ units to the left.\nStep 2: The $-6$ sits outside the function, so it acts on outputs, lowering every value by $6$.\nStep 3: The graph is therefore $4$ units left and $6$ units down. Check: the old point $(10, 30)$ becomes $(6, 24)$, since $c(6 + 4) - 6 = 30 - 6 = 24$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B (left $4$, up $6$): treating the $-6$ outside the function as an upward move; subtracting lowers every output.\n* Choice C (right $4$, down $6$): reading $x + 4$ as a move to the right; a change inside the function moves the graph the opposite way.\n* Choice D (right $4$, up $6$): reversing both directions at once.\n\n**Test Day Takeaway:** Inside the function acts on $x$ and reverses; outside the function acts on $y$ and reads straight.",
      skills: ["function-transformations"]
    },
    {
      id: 9,
      difficulty: "medium",
      question: "A parcel sorting line scans $n(t)$ cartons in the first $t$ minutes of a shift. After a second scanner is installed the count follows $u(t) = 2n(t - 10)$. If $u(35) = 176$, what is the value of $n(25)$?",
      choices: [
        // distractor: halves 176 correctly but then subtracts the 10-minute shift from the count
        { id: "A", text: "$78$" },
        { id: "B", text: "$88$" },
        // distractor: reports u(35) itself, skipping the factor of 2
        { id: "C", text: "$176$" },
        // distractor: doubles 176 instead of halving it
        { id: "D", text: "$352$" }
      ],
      correctAnswer: "B",
      hint: "Work out which value of $n$ the expression $u(35)$ actually contains.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $u(35) = 2n(25)$, so $n(25) = \\frac{176}{2} = 88$.\n\n**The Full Solution:**\nStep 1: Match the inputs: $u(35) = 2n(35 - 10) = 2n(25)$.\nStep 2: So $2n(25) = 176$.\nStep 3: Divide by $2$: $n(25) = 88$. Check: $2n(25) = 2(88) = 176 = u(35)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($78$): halving correctly and then subtracting the $10$-minute shift from the count; the shift moves inputs, not outputs.\n* Choice C ($176$): reporting $u(35)$ itself and ignoring the factor of $2$ in front of $n$.\n* Choice D ($352$): doubling $176$ instead of halving it, applying the rule forward when it needs to be undone.\n\n**Test Day Takeaway:** Substitute the input into the rule first; the resulting equation tells you which operation to undo.",
      skills: ["function-transformations"]
    },
    {
      id: 10,
      difficulty: "hard",
      question: "A ridge tram's height above its base station, in meters, is $E(d)$ after $d$ meters along the cable, and a second tram satisfies $F(d) = E(d - 40) + 12$ for every $d$. The greatest value of $E$ is $86$ meters, reached at $d = 300$. Which of the following must be true of $F$?",
      choices: [
        // distractor: shifts the peak the wrong way and drops the +12 entirely
        { id: "A", text: "Its greatest value is $86$ meters, reached at $d = 260$." },
        // distractor: locates the peak correctly but leaves out the 12-meter lift
        { id: "B", text: "Its greatest value is $86$ meters, reached at $d = 340$." },
        // distractor: adds the 12 meters but shifts the peak the wrong way
        { id: "C", text: "Its greatest value is $98$ meters, reached at $d = 260$." },
        { id: "D", text: "Its greatest value is $98$ meters, reached at $d = 340$." }
      ],
      correctAnswer: "D",
      hint: "The rule changes both where the greatest value occurs and how large it is.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** $F$ repeats $E$ forty meters later and twelve meters higher, so its peak is $86 + 12 = 98$ meters at $d = 300 + 40 = 340$.\n\n**The Full Solution:**\nStep 1: $F(d)$ uses the reading $E(d - 40)$, so $F$ takes its greatest value when $d - 40 = 300$, that is, at $d = 340$.\nStep 2: At that point $F(340) = E(300) + 12 = 86 + 12 = 98$ meters.\nStep 3: Because $E$ never exceeds $86$, $F$ never exceeds $98$, so $98$ meters at $d = 340$ is the maximum. Check: $F(340) = E(340 - 40) + 12 = E(300) + 12 = 98$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($86$ m at $d = 260$): subtracting $40$ from the peak location and ignoring the $+12$; both parts of the rule act.\n* Choice B ($86$ m at $d = 340$): locating the peak correctly but leaving the $12$-meter lift out of the height.\n* Choice C ($98$ m at $d = 260$): adding the $12$ meters but moving the peak backward; $d - 40 = 300$ gives $d = 340$.\n\n**Test Day Takeaway:** Set the inside expression equal to the input that produced the known extreme, then apply the outside shift to the value.",
      skills: ["function-transformations"]
    }
  ],

  // Section: Transformations from Graph
  "Transformations from Graph": [
    {
      id: 1,
      difficulty: "easy",
      question: "In the $xy$-plane, the graph of $y=x^{2}$ is translated so that its lowest point is $(5,-3)$. Which equation could define the translated graph?",
      choices: [
        // distractor: swaps the coordinates of the vertex
        { id: "A", text: "$y=(x-3)^{2}-5$" },
        { id: "B", text: "$y=(x-5)^{2}-3$" },
        // distractor: reverses the sign of the vertical coordinate
        { id: "C", text: "$y=(x-5)^{2}+3$" },
        // distractor: copies the sign of h into the parentheses
        { id: "D", text: "$y=(x+5)^{2}-3$" }
      ],
      correctAnswer: "B",
      hint: "In vertex form, the number paired with $x$ inside the parentheses appears with the opposite sign of the horizontal position.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** Vertex form is $y=(x-h)^{2}+k$ with vertex $(h,k)$, so $(5,-3)$ gives $y=(x-5)^{2}-3$.\n\n**The Full Solution:**\nStep 1: Translating $y=x^{2}$ without changing its shape produces an equation of the form $y=(x-h)^{2}+k$, whose lowest point is $(h,k)$.\nStep 2: Matching $(h,k)$ to the required lowest point gives $h=5$ and $k=-3$.\nStep 3: Substituting yields $y=(x-5)^{2}-3$. Check: at $x=5$, $y=0-3=-3$, and every other $x$ makes $(x-5)^{2}>0$, so $(5,-3)$ is indeed the lowest point. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y=(x-3)^{2}-5$): uses $3$ as the horizontal position and $-5$ as the height, swapping the two coordinates of the vertex.\n* Choice C ($y=(x-5)^{2}+3$): gets the horizontal move right but places the vertex $3$ units above the axis instead of below it.\n* Choice D ($y=(x+5)^{2}-3$): reads the $5$ directly into the parentheses; a vertex at $x=5$ requires the factor $x-5$.\n\n**Test Day Takeaway:** Read a translated parabola straight off vertex form: $(x-h)$ inside means the vertex is at $x=h$, and $+k$ outside means it is at height $k$.",
      skills: ["function-transformations"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A planetarium projector's lamp output, in hundreds of lumens, after $x$ hundred hours of use is $h(x)$, and the graph of $y = h(x)$ passes through $(3, 14)$. Through which point does the graph of $y = h(x) + 6$ pass?",
      choices: [
        // distractor: subtracts 6 from the output instead of adding it
        { id: "A", text: "$(3, 8)$" },
        // distractor: subtracts 6 from the input
        { id: "B", text: "$(-3, 14)$" },
        // distractor: adds 6 to the input instead of the output
        { id: "C", text: "$(9, 14)$" },
        { id: "D", text: "$(3, 20)$" }
      ],
      correctAnswer: "D",
      hint: "Ask which of the point's two coordinates the rule is able to touch.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~10s):** Adding $6$ outside the function raises the height of every point, so $(3, 14)$ becomes $(3, 20)$.\n\n**The Full Solution:**\nStep 1: The point $(3, 14)$ means $h(3) = 14$.\nStep 2: For the new graph, the height at $x = 3$ is $h(3) + 6 = 14 + 6 = 20$.\nStep 3: So the new graph passes through $(3, 20)$. Check: substituting $x = 3$ into $y = h(x) + 6$ gives $y = 20$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(3, 8)$): subtracting the $6$ from the output instead of adding it.\n* Choice B ($(-3, 14)$): subtracting the $6$ from the input, which moves the point sideways.\n* Choice C ($(9, 14)$): adding the $6$ to the input; a constant outside the function never moves a point sideways.\n\n**Test Day Takeaway:** A constant added outside the function changes only the second coordinate of every point.",
      skills: ["function-transformations"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The graph of $y=f(x)$ is shown in the $xy$-plane. The function $g$ is defined by $g(x)=f(x-2)-6$. The graph of $y=g(x)$ attains its maximum value at which point?",
      diagram: { type: "quadraticVertex", params: { vertex: [-3, 5], a: -0.5, showVertex: true } },
      choices: [
        // distractor: shifts left instead of right
        { id: "A", text: "$(-5,-1)$" },
        // distractor: reverses the direction of both shifts
        { id: "B", text: "$(-5,11)$" },
        { id: "C", text: "$(-1,-1)$" },
        // distractor: adds 6 instead of subtracting
        { id: "D", text: "$(-1,11)$" }
      ],
      correctAnswer: "C",
      hint: "Read the highest point of the graph shown, then move it once horizontally and once vertically.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** The peak of $f$ is at $(-3,5)$; moving right $2$ and down $6$ puts the peak of $g$ at $(-1,-1)$.\n\n**The Full Solution:**\nStep 1: From the graph, the greatest value of $f$ is $5$, attained at $x=-3$, so the high point is $(-3,5)$.\nStep 2: The inside change $x-2$ shifts the graph right $2$ units: $-3+2=-1$.\nStep 3: The outside $-6$ lowers every output: $5-6=-1$. The maximum of $g$ occurs at $(-1,-1)$. Check: $g(-1)=f(-1-2)-6=f(-3)-6=5-6=-1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-5,-1)$): shifts left instead of right; $f(x-2)$ moves the graph in the positive direction.\n* Choice B ($(-5,11)$): reverses both changes at once — left instead of right and up instead of down.\n* Choice D ($(-1,11)$): adds $6$ to the height instead of subtracting it.\n\n**Test Day Takeaway:** Extreme points travel with the graph: apply the horizontal rule to the $x$-coordinate and the vertical rule to the $y$-coordinate.",
      skills: ["function-transformations"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The graph of $y = f(x)$ is shown, where $f(x)$ is the temperature error, in degrees Celsius, $x$ minutes into a chocolate tempering cycle. After the thermocouple is recalibrated the error follows $y = f(x) + 5$. What are the coordinates of the lowest point on the recalibrated graph?",
      diagram: { type: "absoluteValue", params: { vertex: [2, -3], slope: 1 } },
      choices: [
        { id: "A", text: "$(2, 2)$" },
        // distractor: subtracts 5 from the lowest error instead of adding it
        { id: "B", text: "$(2, -8)$" },
        // distractor: reports the lowest point of the original graph, ignoring the recalibration
        { id: "C", text: "$(2, -3)$" },
        // distractor: shifts the graph 5 units to the right
        { id: "D", text: "$(7, -3)$" }
      ],
      correctAnswer: "A",
      hint: "The recalibration changes what the thermocouple reads, not when it reads it.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The lowest point of the shown graph is $(2, -3)$; adding $5$ lifts it to $(2, 2)$.\n\n**The Full Solution:**\nStep 1: Read the lowest point of the graph of $y = f(x)$: it sits at $(2, -3)$, an error of $-3$ degrees at minute $2$.\nStep 2: Adding $5$ outside the function raises every point by $5$ degrees and leaves the minute unchanged.\nStep 3: The lowest point becomes $(2, -3 + 5) = (2, 2)$. Check: the recalibrated error at minute $2$ is $-3 + 5 = 2$, and every other point is higher ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($(2, -8)$): subtracting the $5$ from the lowest error instead of adding it.\n* Choice C ($(2, -3)$): reporting the lowest point of the original graph and ignoring the recalibration.\n* Choice D ($(7, -3)$): shifting the graph $5$ units to the right, which a constant outside the function never does.\n\n**Test Day Takeaway:** A vertical shift moves the extreme point straight up or down; its input never changes.",
      skills: ["function-transformations"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A refrigerated container's interior temperature, in degrees Celsius, $t$ hours after the doors are sealed is $f(t)$, where $f(0) = 12$ and $f$ decreases over the first day. A container sealed five hours later has temperature $g(t) = f(t - 5)$. Which of the following must be true?",
      choices: [
        // distractor: ignores the five-hour delay entirely
        { id: "A", text: "$g(0) = 12$" },
        // distractor: applies the delay in the wrong direction
        { id: "B", text: "$g(-5) = 12$" },
        // distractor: swaps the input and the output
        { id: "C", text: "$g(12) = 5$" },
        { id: "D", text: "$g(5) = 12$" }
      ],
      correctAnswer: "D",
      hint: "Only one reading of the first container is given; find the statement that uses it.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** $g(t) = f(t - 5)$ repeats each reading five hours later, so $g(5) = f(0) = 12$ degrees.\n\n**The Full Solution:**\nStep 1: Substituting $t = 5$ gives $g(5) = f(5 - 5) = f(0)$.\nStep 2: The first container's temperature at $t = 0$ is $12$ degrees, so $g(5) = 12$.\nStep 3: That statement follows from the rule alone. Check: the later container is sealed five hours after the first, so its temperature at hour $5$ matches the first container's at hour $0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($g(0) = 12$): ignoring the delay; at $t = 0$ the second container has not yet been sealed, so $g(0) = f(-5)$.\n* Choice B ($g(-5) = 12$): applying the delay in the wrong direction; $g(-5) = f(-10)$, which the given information does not fix.\n* Choice C ($g(12) = 5$): swapping the input and the output; $12$ is a temperature, not an hour.\n\n**Test Day Takeaway:** Substitute the input that makes the inside expression equal the one value you were handed.",
      skills: ["function-transformations"]
    },
    {
      id: 6,
      difficulty: "easy",
      question: "The graph shown in the $xy$-plane is the image of the graph of $y=x^{2}$ after a single translation. Which translation was applied?",
      diagram: { type: "quadraticVertex", params: { vertex: [-4, 0], a: 1, showVertex: true } },
      choices: [
        // distractor: attaches the -4 to the height instead of to the input
        { id: "A", text: "$4$ units down" },
        { id: "B", text: "$4$ units left" },
        // distractor: moves the vertex in the wrong direction
        { id: "C", text: "$4$ units right" },
        // distractor: reads the size of the move but assigns it to the height, ignoring the sign
        { id: "D", text: "$4$ units up" }
      ],
      correctAnswer: "B",
      hint: "Compare the lowest point of the curve drawn with the lowest point of $y=x^{2}$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The low point has moved from $(0,0)$ to $(-4,0)$ — same height, $4$ units in the negative direction.\n\n**The Full Solution:**\nStep 1: The graph of $y=x^{2}$ has its lowest point at the origin.\nStep 2: The curve drawn has the same shape with its lowest point at $(-4,0)$.\nStep 3: Only the first coordinate changed, and it decreased by $4$, so the translation is $4$ units left. Check: $y=(x+4)^{2}$ has its minimum where $x+4=0$, at $x=-4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$ units down): the lowest point is still on the $x$-axis, so no vertical movement occurred.\n* Choice C ($4$ units right): a right translation would put the low point at $(4,0)$, on the other side of the $y$-axis.\n* Choice D ($4$ units up): an upward translation would lift the low point off the $x$-axis to $(0,4)$.\n\n**Test Day Takeaway:** Identify a translation by tracking one recognizable point — for a parabola, the vertex is the easiest one.",
      skills: ["function-transformations"]
    },
    {
      id: 7,
      difficulty: "easy",
      question: "The graph of $y=f(x)$ in the $xy$-plane passes through the point $(0,7)$. Which point must lie on the graph of $y=f(x-5)$?",
      choices: [
        // distractor: shifts left instead of right
        { id: "A", text: "$(-5,7)$" },
        // distractor: applies the shift to the output
        { id: "B", text: "$(0,2)$" },
        // distractor: applies the shift to the output with the wrong sign
        { id: "C", text: "$(0,12)$" },
        { id: "D", text: "$(5,7)$" }
      ],
      correctAnswer: "D",
      hint: "Find the value of $x$ that makes $x-5$ equal to the input you already know.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** Setting $x-5=0$ gives $x=5$, and the output there is $f(0)=7$, so $(5,7)$ is on the new graph.\n\n**The Full Solution:**\nStep 1: The given point says $f(0)=7$.\nStep 2: For $y=f(x-5)$ to use that known output, the inside expression must equal $0$: $x-5=0$, so $x=5$.\nStep 3: At $x=5$ the value is $f(5-5)=f(0)=7$, giving the point $(5,7)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-5,7)$): moves left; inside the function, subtracting $5$ shifts the graph right.\n* Choice B ($(0,2)$): subtracts $5$ from the output, which would require $f(x)-5$.\n* Choice C ($(0,12)$): adds $5$ to the output, again treating an inside change as a vertical one.\n\n**Test Day Takeaway:** For $f(x-c)$, add $c$ to the $x$-coordinate of every known point and leave the height alone.",
      skills: ["function-transformations"]
    },
    {
      id: 8,
      difficulty: "medium",
      question: "The parabola shown in the $xy$-plane is the graph of $y=f(x)$. If $g(x)=f(x+6)+5$, what are the coordinates of the lowest point of the graph of $y=g(x)$?",
      diagram: { type: "quadraticVertex", params: { vertex: [2, -7], a: 1, showVertex: true } },
      choices: [
        // distractor: subtracts the outside constant
        { id: "A", text: "$(-4,-12)$" },
        { id: "B", text: "$(-4,-2)$" },
        // distractor: shifts right instead of left
        { id: "C", text: "$(8,-2)$" },
        // distractor: reverses both constants
        { id: "D", text: "$(8,-12)$" }
      ],
      correctAnswer: "B",
      hint: "Locate the vertex on the figure first; the two constants then act on separate coordinates.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The vertex shown is $(2,-7)$; $x+6$ moves it $6$ left and $+5$ lifts it $5$, giving $(-4,-2)$.\n\n**The Full Solution:**\nStep 1: The parabola opens upward with its lowest point at $(2,-7)$, so $f(2)=-7$ is the minimum value of $f$.\nStep 2: Inside the function, $x+6$ shifts the graph $6$ units left: $2-6=-4$.\nStep 3: Outside, $+5$ raises every output: $-7+5=-2$. The lowest point of $g$ is $(-4,-2)$. Check: $g(-4)=f(-4+6)+5=f(2)+5=-7+5=-2$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-4,-12)$): subtracts $5$ from the minimum instead of adding it.\n* Choice C ($(8,-2)$): shifts right; a $+6$ inside the function moves the graph left.\n* Choice D ($(8,-12)$): reverses the direction of both constants.\n\n**Test Day Takeaway:** Split the work: inside constants move $x$ against their sign, outside constants move $y$ with their sign.",
      skills: ["function-transformations"]
    },
    {
      id: 9,
      difficulty: "medium",
      question: "In the $xy$-plane, the graph of $y=f(x)$ is reflected across the $y$-axis, and the resulting graph is then translated right $3$ units. Which equation defines the final graph?",
      choices: [
        // distractor: reflects across the wrong axis
        { id: "A", text: "$y=-f(x-3)$" },
        // distractor: translates up instead of right
        { id: "B", text: "$y=f(-x)+3$" },
        // distractor: translates the reflected graph left
        { id: "C", text: "$y=f(-x-3)$" },
        { id: "D", text: "$y=f(3-x)$" }
      ],
      correctAnswer: "D",
      hint: "Perform the reflection first, then substitute $x-3$ everywhere the input appears in that result.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** The reflection gives $f(-x)$; translating right $3$ replaces $x$ with $x-3$, producing $f(-(x-3))=f(3-x)$.\n\n**The Full Solution:**\nStep 1: Reflecting across the $y$-axis negates the input, so the intermediate equation is $y=f(-x)$.\nStep 2: A translation right $3$ units replaces every $x$ in that equation with $x-3$: $y=f(-(x-3))$.\nStep 3: Simplifying the input gives $y=f(3-x)$. Check: if $f(0)=1$, then the original point $(0,1)$ is unmoved by the reflection and lands at $(3,1)$; the formula gives $f(3-3)=f(0)=1$ at $x=3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($y=-f(x-3)$): negates the output, which reflects across the $x$-axis instead of the $y$-axis.\n* Choice B ($y=f(-x)+3$): adds $3$ outside, translating the reflected graph up rather than right.\n* Choice C ($y=f(-x-3)$): equals $f(-(x+3))$, which translates the reflected graph $3$ units left.\n\n**Test Day Takeaway:** After a reflection, substitute the horizontal shift into the whole input expression — do not just append it.",
      skills: ["function-transformations"]
    },
    {
      id: 10,
      difficulty: "hard",
      question: "In the $xy$-plane, the graph of $y=f(x)$ crosses the $x$-axis at exactly two points, where $x=-6$ and $x=2$. At what values of $x$ does the graph of $y=f(x+4)$ cross the $x$-axis?",
      choices: [
        // distractor: multiplies the zeros by 4
        { id: "A", text: "$x=-24$ and $x=8$" },
        { id: "B", text: "$x=-10$ and $x=-2$" },
        // distractor: leaves the zeros unchanged
        { id: "C", text: "$x=-6$ and $x=2$" },
        // distractor: shifts the zeros right
        { id: "D", text: "$x=-2$ and $x=6$" }
      ],
      correctAnswer: "B",
      hint: "Each crossing happens when the expression inside $f$ equals a value that already made $f$ zero.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Solve $x+4=-6$ and $x+4=2$ to get $x=-10$ and $x=-2$: the whole picture slides $4$ units left.\n\n**The Full Solution:**\nStep 1: The crossings of $f$ tell you that $f(-6)=0$ and $f(2)=0$, and that $f$ has no other zeros.\nStep 2: For $y=f(x+4)$ to equal $0$, the input $x+4$ must be one of those two numbers.\nStep 3: $x+4=-6$ gives $x=-10$, and $x+4=2$ gives $x=-2$. Check: $f(-10+4)=f(-6)=0$ and $f(-2+4)=f(2)=0$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($x=-24$ and $x=8$): multiplies the crossings by $4$; the $4$ is added inside, not multiplied.\n* Choice C ($x=-6$ and $x=2$): assumes the crossings are unchanged, which holds for a vertical stretch but not for a horizontal shift.\n* Choice D ($x=-2$ and $x=6$): moves the crossings $4$ units right; a $+4$ inside the function moves the graph left.\n\n**Test Day Takeaway:** To relocate a zero after an inside change, set the inside expression equal to the old zero and solve.",
      skills: ["function-transformations"]
    },
    {
      id: 11,
      difficulty: "hard",
      question: "A monorail platform's arrival deviation, in minutes, is $A(x)$ for a train scheduled at minute $x$, and the deviation is zero only at $x = -6$ and $x = 8$. A second platform's deviation is $y = A(2x + 4)$. At which values of $x$ is the second platform's deviation zero?",
      choices: [
        // distractor: subtracts the 4 but never divides by 2
        { id: "A", text: "At $x = -10$ and $x = 4$." },
        { id: "B", text: "At $x = -5$ and $x = 2$." },
        // distractor: divides by 2 but leaves the +4 out
        { id: "C", text: "At $x = -3$ and $x = 4$." },
        // distractor: reads the inside expression as 2x - 4
        { id: "D", text: "At $x = -1$ and $x = 6$." }
      ],
      correctAnswer: "B",
      hint: "Two operations sit inside the function, and both have to be undone.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~40s):** $A(2x + 4) = 0$ needs $2x + 4$ to equal $-6$ or $8$, giving $x = -5$ and $x = 2$.\n\n**The Full Solution:**\nStep 1: The second platform's deviation is zero exactly when the inside expression lands on an input where $A$ is zero, so $2x + 4 = -6$ or $2x + 4 = 8$.\nStep 2: From $2x + 4 = -6$: $2x = -10$, so $x = -5$. From $2x + 4 = 8$: $2x = 4$, so $x = 2$.\nStep 3: The zeros are at $x = -5$ and $x = 2$. Check: $2(-5) + 4 = -6$ and $2(2) + 4 = 8$, both inputs where $A$ is zero ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$ and $4$): subtracting the $4$ but never dividing by $2$.\n* Choice C ($-3$ and $4$): dividing by $2$ and leaving the $+4$ out of the equation.\n* Choice D ($-1$ and $6$): reading the inside expression as $2x - 4$ and adding the $4$ instead of subtracting it.\n\n**Test Day Takeaway:** Set the whole inside expression equal to each known input, then solve; undo the addition before the multiplication.",
      skills: ["function-transformations"]
    },
    {
      id: 12,
      difficulty: "hard",
      question: "The graph of $y=f(x)$ in the $xy$-plane is a parabola with vertex $(-3,6)$. The function $g$ is defined by $g(x)=2f(x+5)-9$. What is the vertex of the graph of $y=g(x)$?",
      choices: [
        // distractor: applies the vertical shift before the stretch
        { id: "A", text: "$(-8,-6)$" },
        { id: "B", text: "$(-8,3)$" },
        // distractor: omits the vertical shift
        { id: "C", text: "$(-8,12)$" },
        // distractor: shifts right instead of left
        { id: "D", text: "$(2,3)$" }
      ],
      correctAnswer: "B",
      hint: "Three things happen to the vertex, and only one of them changes its first coordinate.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** $x+5$ moves the vertex to $x=-8$; the height becomes $2(6)-9=3$, so the vertex is $(-8,3)$.\n\n**The Full Solution:**\nStep 1: Inside the function, $x+5$ shifts the graph $5$ units left, so the vertex moves from $x=-3$ to $x=-3-5=-8$.\nStep 2: The factor $2$ multiplies the output first: $2(6)=12$. Then the $-9$ lowers it: $12-9=3$.\nStep 3: The vertex of $g$ is $(-8,3)$. Check: $g(-8)=2f(-8+5)-9=2f(-3)-9=2(6)-9=3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-8,-6)$): subtracts $9$ before doubling: $2(6-9)=-6$, but the $-9$ is applied after the stretch.\n* Choice C ($(-8,12)$): stretches the height but never applies the $-9$.\n* Choice D ($(2,3)$): shifts right; a $+5$ inside the function moves the graph left.\n\n**Test Day Takeaway:** Outside operations act in written order: multiply the height first, then add or subtract.",
      skills: ["function-transformations"]
    }
  ],

  // Section: Transformations from Table
  "Transformations from Table": [
    {
      id: 1,
      difficulty: "easy",
      question: "The table gives the sap flow $f(d)$ from one tap and the flow $g(d)$ from a second tap, both in liters, on day $d$ of a maple run. Which equation relates $g$ to $f$ on the days listed?",
      questionTable: { headers: ["$d$", "$f(d)$", "$g(d)$"], rows: [["$1$", "$18$", "$26$"], ["$2$", "$23$", "$31$"], ["$3$", "$31$", "$39$"], ["$4$", "$40$", "$48$"]] },
      choices: [
        { id: "A", text: "$g(d) = f(d) + 8$" },
        // distractor: reverses the direction of the shift
        { id: "B", text: "$g(d) = f(d) - 8$" },
        // distractor: multiplies by 8 instead of adding it
        { id: "C", text: "$g(d) = 8f(d)$" },
        // distractor: places the 8 inside the function, shifting the day rather than the flow
        { id: "D", text: "$g(d) = f(d + 8)$" }
      ],
      correctAnswer: "A",
      hint: "Read across each row before you read down any column.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** Every listed day shows $g$ exactly $8$ liters above $f$, so $g(d) = f(d) + 8$.\n\n**The Full Solution:**\nStep 1: Subtract the two flows day by day: $26 - 18 = 8$, $31 - 23 = 8$, $39 - 31 = 8$, and $48 - 40 = 8$.\nStep 2: The difference is the same constant every day, so the second tap's flow is the first tap's flow plus $8$ liters.\nStep 3: That relationship is $g(d) = f(d) + 8$. Check: on day $3$, $f(3) + 8 = 31 + 8 = 39 = g(3)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($f(d) - 8$): reversing the direction; the second tap runs higher, not lower.\n* Choice C ($8f(d)$): multiplying by $8$, which would give $8(18) = 144$ liters on day $1$, not $26$.\n* Choice D ($f(d + 8)$): placing the $8$ inside the function, which shifts the day rather than the flow.\n\n**Test Day Takeaway:** A constant difference in every row means a vertical shift; a constant ratio would mean a stretch.",
      skills: ["function-transformations"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A canning retort's core temperature, in degrees Celsius, at minute $m$ of a cook is $f(m)$, with $f(5) = 62$, $f(10) = 88$, and $f(15) = 104$. A second retort runs a cook modeled by $g(m) = f(m) + 6$. What is the value of $g(10)$?",
      choices: [
        // distractor: subtracts 6 instead of adding it
        { id: "A", text: "$82$" },
        // distractor: reports f(10) unchanged
        { id: "B", text: "$88$" },
        { id: "C", text: "$94$" },
        // distractor: adds 6 to f(15) instead of f(10)
        { id: "D", text: "$110$" }
      ],
      correctAnswer: "C",
      hint: "Only one of the three readings given is the one this question needs.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** $g(10) = f(10) + 6 = 88 + 6 = 94$ degrees Celsius.\n\n**The Full Solution:**\nStep 1: The rule adds $6$ degrees to the first retort's temperature at the same minute.\nStep 2: At minute $10$ the first retort reads $f(10) = 88$ degrees.\nStep 3: So $g(10) = 88 + 6 = 94$ degrees Celsius. Check: $94 - 6 = 88 = f(10)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($82$): subtracting the $6$ instead of adding it.\n* Choice B ($88$): reporting the first retort's reading and leaving the $+6$ out.\n* Choice D ($110$): adding the $6$ to $f(15) = 104$, the reading at the wrong minute.\n\n**Test Day Takeaway:** A constant outside the function applies at the same input; read the matching row before you shift.",
      skills: ["function-transformations"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "For the function $f$, the table shows the value of $f(x)$ at four values of $x$. The function $g$ is defined by $g(x)=-f(x)$. What is the value of $g(3)$?",
      diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["0", "5"], ["3", "8"], ["6", "-2"], ["9", "11"]] } },
      choices: [
        { id: "A", text: "$-8$" },
        // distractor: reads the wrong row
        { id: "B", text: "$-5$" },
        // distractor: negates the value at x = 6
        { id: "C", text: "$2$" },
        // distractor: omits the negative sign
        { id: "D", text: "$8$" }
      ],
      correctAnswer: "A",
      hint: "Read the row for the input you need, then decide what the negative sign changes.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** The table gives $f(3)=8$, and $g(3)=-f(3)=-8$.\n\n**The Full Solution:**\nStep 1: Locate $x=3$ in the table; the corresponding output is $f(3)=8$.\nStep 2: The definition $g(x)=-f(x)$ multiplies that output by $-1$.\nStep 3: So $g(3)=-8$. Check: the graph of $g$ is the graph of $f$ reflected across the $x$-axis, so a height of $8$ becomes a height of $-8$ at the same input. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-5$): negates the output in the row $x=0$ instead of the row $x=3$.\n* Choice C ($2$): negates the output in the row $x=6$: $-(-2)=2$.\n* Choice D ($8$): reports $f(3)$ itself and never applies the negative sign.\n\n**Test Day Takeaway:** A negative outside the function changes the sign of the output and nothing else.",
      skills: ["function-transformations"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives an adaptive-optics loop's wavefront error $f(n)$, in nanometers, on correction cycle $n$, together with a second loop's error $g(n)$ on the same cycles. Which equation relates $g$ to $f$?",
      questionTable: { headers: ["$n$", "$f(n)$", "$g(n)$"], rows: [["$1$", "$12$", "$4$"], ["$2$", "$17$", "$7$"], ["$3$", "$24$", "$12$"], ["$4$", "$33$", "$19$"]] },
      choices: [
        // distractor: subtracts 5 without the one-cycle lag
        { id: "A", text: "$g(n) = f(n) - 5$" },
        // distractor: lags the wrong way, reading ahead one cycle
        { id: "B", text: "$g(n) = f(n + 1) - 5$" },
        // distractor: has the lag right but adds 5 instead of subtracting
        { id: "C", text: "$g(n) = f(n - 1) + 5$" },
        { id: "D", text: "$g(n) = f(n - 1) - 5$" }
      ],
      correctAnswer: "D",
      hint: "No single row of the table settles which rule is right.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** Each $g$ value is $5$ nanometers below the $f$ value one cycle earlier: $g(n) = f(n - 1) - 5$.\n\n**The Full Solution:**\nStep 1: Compare $g$ with the $f$ value in the row above it: $g(2) = 7$ and $f(1) = 12$; $g(3) = 12$ and $f(2) = 17$; $g(4) = 19$ and $f(3) = 24$.\nStep 2: In every case $g$ is $5$ nanometers less than the previous cycle's $f$, so the second loop lags one cycle and runs $5$ nanometers lower.\nStep 3: That is $g(n) = f(n - 1) - 5$. Check: $f(3) - 5 = 24 - 5 = 19 = g(4)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($f(n) - 5$): matching the same row, which gives $f(2) - 5 = 12$ instead of the listed $g(2) = 7$.\n* Choice B ($f(n + 1) - 5$): lagging the wrong way, which gives $f(3) - 5 = 19$ instead of the listed $g(2) = 7$.\n* Choice C ($f(n - 1) + 5$): using the right cycle but adding, which gives $f(1) + 5 = 17$ instead of the listed $g(2) = 7$.\n\n**Test Day Takeaway:** Check a candidate rule against a row you have not used yet; a rule that survives every row is the one.",
      skills: ["function-transformations"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The table gives an orchard frost sensor's nightly temperature margin $f(x)$, in degrees Celsius, on night $x$. The block's risk index is $g(x) = -f(x) + 10$. What is the greatest value of $g(x)$ among the nights listed?",
      questionTable: { headers: ["Night $x$", "$f(x)$"], rows: [["$1$", "$6$"], ["$2$", "$-2$"], ["$3$", "$4$"], ["$4$", "$-7$"], ["$5$", "$3$"]] },
      choices: [
        // distractor: uses the greatest margin 6, computing -6 + 10 = 4
        { id: "A", text: "$4$" },
        // distractor: stops at the first negative margin -2, computing 12
        { id: "B", text: "$12$" },
        // distractor: drops the negative sign, computing 6 + 10 = 16
        { id: "C", text: "$16$" },
        { id: "D", text: "$17$" }
      ],
      correctAnswer: "D",
      hint: "The greatest index need not come from the greatest margin.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** The reflection makes the most negative margin the largest index: $-(-7) + 10 = 17$.\n\n**The Full Solution:**\nStep 1: Because of the minus sign, $g$ is largest where $f$ is smallest.\nStep 2: The smallest margin listed is $-7$ degrees, on night $4$.\nStep 3: So the greatest risk index is $g(4) = -(-7) + 10 = 7 + 10 = 17$. Check: the other nights give $4$, $12$, $6$, and $7$, all below $17$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): using the greatest margin, $6$, and computing $-6 + 10$; the reflection sends the largest margin to the smallest index.\n* Choice B ($12$): stopping at the first negative margin, $-2$, instead of the most negative one.\n* Choice C ($16$): dropping the minus sign and computing $6 + 10$.\n\n**Test Day Takeaway:** A negative coefficient reverses which input gives the extreme value — scan for the smallest, not the largest.",
      skills: ["function-transformations"]
    },
    {
      id: 6,
      difficulty: "easy",
      question: "A kelp farm's first raft yields $f(w)$ kilograms of blades in week $w$, and $f(6) = 240$. A neighboring raft is thinned so that it yields three quarters as much each week, or $g(w) = 0.75f(w)$. What is the value of $g(6)$?",
      choices: [
        // distractor: takes one quarter of the yield instead of three quarters
        { id: "A", text: "$60$" },
        { id: "B", text: "$180$" },
        // distractor: reports the first raft's yield unchanged
        { id: "C", text: "$240$" },
        // distractor: divides by 0.75 instead of multiplying
        { id: "D", text: "$320$" }
      ],
      correctAnswer: "B",
      hint: "Thinning the raft cannot raise its yield.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** Three quarters of $240$ kilograms is $180$ kilograms.\n\n**The Full Solution:**\nStep 1: The rule multiplies the first raft's yield by $0.75$ in every week.\nStep 2: In week $6$ the first raft yields $f(6) = 240$ kilograms.\nStep 3: So $g(6) = 0.75(240) = 180$ kilograms. Check: $180$ is $\\frac{3}{4}$ of $240$, and $240 - 180 = 60$ is the quarter removed ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($60$): taking one quarter of the yield instead of three quarters.\n* Choice C ($240$): reporting the first raft's yield and ignoring the thinning.\n* Choice D ($320$): dividing by $0.75$ instead of multiplying, which makes the thinned raft yield more.\n\n**Test Day Takeaway:** A factor outside the function scales every output; multiply, and check the direction of the change.",
      skills: ["function-transformations"]
    },
    {
      id: 7,
      difficulty: "easy",
      question: "The function $f$ is defined only at the five inputs listed in the table. If $k(x)=f(x+2)$, what is the value of $k(0)$?",
      diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["-4", "9"], ["-2", "5"], ["0", "1"], ["2", "-3"], ["4", "-7"]] } },
      choices: [
        // distractor: applies the shift twice
        { id: "A", text: "$-7$" },
        { id: "B", text: "$-3$" },
        // distractor: omits the shift
        { id: "C", text: "$1$" },
        // distractor: shifts the input in the wrong direction
        { id: "D", text: "$5$" }
      ],
      correctAnswer: "B",
      hint: "Simplify $x+2$ at the given input, then find that number in the left column.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** $k(0)=f(0+2)=f(2)=-3$.\n\n**The Full Solution:**\nStep 1: The rule for $k$ adds $2$ to the input before $f$ is applied, so $k(0)=f(2)$.\nStep 2: The row with $x=2$ in the table gives $f(2)=-3$.\nStep 3: Therefore $k(0)=-3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): uses the row $x=4$, adding the shift twice.\n* Choice C ($1$): uses the row $x=0$ and never applies the shift.\n* Choice D ($5$): uses the row $x=-2$, subtracting $2$ from the input instead of adding it.\n\n**Test Day Takeaway:** With $f(x+c)$, compute the new input first; the table lookup happens after the arithmetic, not before.",
      skills: ["function-transformations"]
    },
    {
      id: 8,
      difficulty: "medium",
      question: "The table gives a sky survey's star count $f(x)$, in thousands, for field $x$. A deeper survey counts $g(x) = f(x) + k$ stars for a constant $k$, and $g(4) = 31$ thousand. What is the value of $g(7)$?",
      questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$1$", "$8$"], ["$4$", "$19$"], ["$7$", "$26$"], ["$10$", "$33$"]] },
      choices: [
        // distractor: reports f(7) without adding the constant
        { id: "A", text: "$26$" },
        // distractor: repeats the given value g(4)
        { id: "B", text: "$31$" },
        { id: "C", text: "$38$" },
        // distractor: adds the constant to f(10) instead of f(7)
        { id: "D", text: "$45$" }
      ],
      correctAnswer: "C",
      hint: "One field appears both in the table and in the deeper survey's given count.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $k = 31 - 19 = 12$, so $g(7) = 26 + 12 = 38$ thousand.\n\n**The Full Solution:**\nStep 1: The table gives $f(4) = 19$ thousand, and $g(4) = f(4) + k = 31$ thousand, so $k = 12$ thousand.\nStep 2: The same constant applies to every field, so $g(7) = f(7) + 12$.\nStep 3: Since $f(7) = 26$, $g(7) = 26 + 12 = 38$ thousand. Check: $g(4) = 19 + 12 = 31$ thousand, matching the given value ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($26$): reporting $f(7)$ without adding the constant.\n* Choice B ($31$): repeating the value given for field $4$.\n* Choice D ($45$): adding the constant to $f(10) = 33$, the count for the wrong field.\n\n**Test Day Takeaway:** Find the constant from the one input where both counts are known, then apply it to the input asked for.",
      skills: ["function-transformations"]
    },
    {
      id: 9,
      difficulty: "medium",
      question: "The functions $f$ and $g$ satisfy $g(x)=f(x)+6$ for every $x$. The table shows four values of $g$. What is the value of $f(3)$?",
      diagram: { type: "dataTable", params: { headers: ["x", "g(x)"], rows: [["1", "20"], ["2", "13"], ["3", "8"], ["4", "5"]] } },
      choices: [
        { id: "A", text: "$2$" },
        // distractor: omits the shift
        { id: "B", text: "$8$" },
        // distractor: adds instead of subtracts
        { id: "C", text: "$14$" },
        // distractor: reads the wrong row
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "A",
      hint: "The relationship is stated in terms of $g$; rearrange it so that $f$ stands alone.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** From $g(x)=f(x)+6$, $f(x)=g(x)-6$, and the table gives $g(3)=8$, so $f(3)=2$.\n\n**The Full Solution:**\nStep 1: Solving $g(x)=f(x)+6$ for $f$ gives $f(x)=g(x)-6$.\nStep 2: The row $x=3$ of the table gives $g(3)=8$.\nStep 3: Therefore $f(3)=8-6=2$. Check: $f(3)+6=2+6=8=g(3)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($8$): reports $g(3)$ and never undoes the shift.\n* Choice C ($14$): adds $6$ instead of subtracting: the table already contains the raised values.\n* Choice D ($20$): reads the row $x=1$ rather than the row $x=3$.\n\n**Test Day Takeaway:** When the table lists the transformed function, run the transformation backwards to recover the original.",
      skills: ["function-transformations"]
    },
    {
      id: 10,
      difficulty: "medium",
      question: "The table gives a cubesat's battery charge $f(n)$, in watt-hours, at the end of orbit $n$. A second cubesat launched four orbits later has charge $g(n) = f(n - 4)$. If $g(a) = 27$ watt-hours, what is the value of $a$?",
      questionTable: { headers: ["$n$", "$f(n)$"], rows: [["$1$", "$9$"], ["$2$", "$15$"], ["$3$", "$27$"], ["$4$", "$44$"]] },
      choices: [
        // distractor: computes 3 - 4 instead of 3 + 4
        { id: "A", text: "$-1$" },
        // distractor: reports the orbit at which the first cubesat reached 27 watt-hours
        { id: "B", text: "$3$" },
        { id: "C", text: "$7$" },
        // distractor: adds 4 to the charge 27 rather than to the orbit number
        { id: "D", text: "$31$" }
      ],
      correctAnswer: "C",
      hint: "The second cubesat repeats the first cubesat's charges, but not on the same orbit.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** $g(a) = f(a - 4) = 27$, and the table shows $f(3) = 27$, so $a - 4 = 3$ and $a = 7$.\n\n**The Full Solution:**\nStep 1: Write the condition in terms of $f$: $g(a) = f(a - 4) = 27$ watt-hours.\nStep 2: The table shows $f(3) = 27$, so $a - 4 = 3$.\nStep 3: Therefore $a = 7$. Check: $g(7) = f(7 - 4) = f(3) = 27$ watt-hours ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-1$): computing $3 - 4$; the second cubesat lags, so its orbit number is larger.\n* Choice B ($3$): reporting the first cubesat's orbit rather than the second cubesat's.\n* Choice D ($31$): adding the $4$ to the charge $27$ instead of to the orbit number.\n\n**Test Day Takeaway:** Rewrite the transformed value as a value of the original function, then match it to the table.",
      skills: ["function-transformations"]
    },
    {
      id: 11,
      difficulty: "medium",
      question: "A vineyard probe reports the soil tension above target, in kilopascals, at position $x$ meters from the row's midpoint, so that $f(-2) = 5$, $f(0) = -1$, and $f(3) = 8$. A second probe reports $h(x) = f(-x) + 2$. Which of the following must be true?",
      choices: [
        // distractor: pairs the correct output with the un-reflected input
        { id: "A", text: "$h(-2) = 7$" },
        // distractor: subtracts the 2 instead of adding it
        { id: "B", text: "$h(2) = 3$" },
        // distractor: reads f(3) directly and skips the sign reversal on the input
        { id: "C", text: "$h(3) = 10$" },
        { id: "D", text: "$h(2) = 7$" }
      ],
      correctAnswer: "D",
      hint: "Only three readings of the first probe are given; the true statement has to use one of them.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** $h(2) = f(-2) + 2 = 5 + 2 = 7$ kilopascals.\n\n**The Full Solution:**\nStep 1: To evaluate $h$ at an input $x$, the probe reading needed is $f(-x)$.\nStep 2: Choosing $x = 2$ gives $h(2) = f(-2) + 2$, and $f(-2) = 5$ is one of the given readings.\nStep 3: So $h(2) = 5 + 2 = 7$. Check: no other listed reading pairs with a known input, since $h(-2) = f(2) + 2$ and $f(2)$ is not given ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($h(-2) = 7$): pairing the correct output with the un-reflected input; $h(-2)$ needs $f(2)$, which is not given.\n* Choice B ($h(2) = 3$): subtracting the $2$ instead of adding it, giving $5 - 2$.\n* Choice C ($h(3) = 10$): reading $f(3) = 8$ directly and skipping the sign reversal; $h(3)$ needs $f(-3)$.\n\n**Test Day Takeaway:** With $f(-x)$, first ask which input makes $-x$ a value you were actually given.",
      skills: ["function-transformations"]
    },
    {
      id: 12,
      difficulty: "hard",
      question: "The table gives a radiometer's calibrated counts $f(x)$ at selected filter positions $x$. A second radiometer's counts follow $g(x) = 2f(x - 1) - 3$, and $g(c) = 21$. What is the value of $c$?",
      questionTable: { headers: ["$x$", "$f(x)$"], rows: [["$2$", "$5$"], ["$4$", "$12$"], ["$6$", "$19$"], ["$8$", "$30$"]] },
      choices: [
        // distractor: computes 4 - 1 instead of 4 + 1
        { id: "A", text: "$3$" },
        { id: "B", text: "$5$" },
        // distractor: reports the count 12 rather than the filter position
        { id: "C", text: "$12$" },
        // distractor: adds 1 to the count 12 instead of to the position 4
        { id: "D", text: "$13$" }
      ],
      correctAnswer: "B",
      hint: "Work back to a value of $f$ before you look at the table.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** $21 = 2f(c - 1) - 3$ gives $f(c - 1) = 12$, and the table shows $f(4) = 12$, so $c = 5$.\n\n**The Full Solution:**\nStep 1: Undo the outside operations: $2f(c - 1) - 3 = 21$ gives $2f(c - 1) = 24$, so $f(c - 1) = 12$.\nStep 2: The table shows that $f$ equals $12$ at $x = 4$, so $c - 1 = 4$.\nStep 3: Therefore $c = 5$. Check: $g(5) = 2f(4) - 3 = 2(12) - 3 = 21$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): computing $4 - 1$; the inside expression is $c - 1$, so $c$ is one more than $4$.\n* Choice C ($12$): reporting the count $f(4) = 12$ rather than the filter position the question asks for.\n* Choice D ($13$): adding the $1$ to the count $12$ instead of to the position $4$.\n\n**Test Day Takeaway:** Peel off the outside operations first; what remains is a value of the original function you can look up.",
      skills: ["function-transformations"]
    },
    {
      id: 13,
      difficulty: "hard",
      question: "The function $h$ is defined by $h(x)=3f(x)-8$, where the values of $f$ are given in the table. What is the greatest of the four values of $h(x)$ determined by the table?",
      diagram: { type: "dataTable", params: { headers: ["x", "f(x)"], rows: [["1", "2"], ["3", "-4"], ["5", "6"], ["7", "5"]] } },
      choices: [
        // distractor: subtracts before multiplying
        { id: "A", text: "$-6$" },
        // distractor: uses the largest input instead of the largest output
        { id: "B", text: "$7$" },
        { id: "C", text: "$10$" },
        // distractor: omits the constant term
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "C",
      hint: "Decide which row of the table gives the largest value of $h$ before doing any arithmetic.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** The largest output in the table is $f(5)=6$, and $3(6)-8=10$.\n\n**The Full Solution:**\nStep 1: Tripling and then subtracting $8$ is an increasing operation, so the greatest value of $h$ occurs at the input with the greatest value of $f$.\nStep 2: The table's outputs are $2$, $-4$, $6$, and $5$; the greatest is $6$, at $x=5$.\nStep 3: So the greatest value is $h(5)=3(6)-8=18-8=10$. Check the runner-up: $h(7)=3(5)-8=7<10$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$): subtracts $8$ before tripling: $3(6-8)=-6$.\n* Choice B ($7$): evaluates $h$ only at the largest value of $x$: $3(5)-8=7$, but the largest input is not the largest output.\n* Choice D ($18$): triples the largest output and forgets the $-8$.\n\n**Test Day Takeaway:** When a transformation is increasing, the extreme value of the new function sits above the extreme value of the old one.",
      skills: ["function-transformations"]
    },
    {
      id: 14,
      difficulty: "hard",
      question: "A rail signal log shows that the block-occupancy index $f(x)$ equals $7$ at minute $3$ and at minute $8$, and at no other minute. A parallel line's index is $g(x) = f(x + k)$ for a constant $k$, and $g(-2) = 7$ and $g(3) = 7$. What is the value of $k$?",
      choices: [
        // distractor: subtracts in the wrong order, computing -2 - 3
        { id: "A", text: "$-5$" },
        // distractor: uses only the second condition, matching 3 + k = 3
        { id: "B", text: "$0$" },
        { id: "C", text: "$5$" },
        // distractor: uses only the first condition, matching -2 + k = 8
        { id: "D", text: "$10$" }
      ],
      correctAnswer: "C",
      hint: "Each condition on its own allows more than one value of $k$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** $-2 + k$ and $3 + k$ must both be $3$ or $8$; only $k = 5$ does both.\n\n**The Full Solution:**\nStep 1: From $g(-2) = 7$: the input $-2 + k$ must be a minute where $f$ equals $7$, so $-2 + k = 3$ or $-2 + k = 8$, giving $k = 5$ or $k = 10$.\nStep 2: From $g(3) = 7$: the input $3 + k$ must also be $3$ or $8$, giving $k = 0$ or $k = 5$.\nStep 3: The only value in both lists is $k = 5$. Check: $g(-2) = f(3) = 7$ and $g(3) = f(8) = 7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): subtracting in the wrong order, computing $-2 - 3$.\n* Choice B ($0$): using only the second condition, where $3 + k = 3$; that choice fails $g(-2) = 7$, since $f(-2)$ is not $7$.\n* Choice D ($10$): using only the first condition, where $-2 + k = 8$; that choice fails $g(3) = 7$, since $f(13)$ is not $7$.\n\n**Test Day Takeaway:** When two conditions constrain one constant, list every value each allows and take the value they share.",
      skills: ["function-transformations"]
    }
  ],

  // Section: Transformations from Expression
  "Transformations from Expression": [
    {
      id: 1,
      difficulty: "easy",
      question: "A coffee roaster's bean temperature, in degrees Celsius, $m$ minutes into a roast is $T(m)$. On a cooler morning the same roast follows $y = T(m) - 12$ over the whole interval. How does that graph compare with the graph of $y = T(m)$?",
      choices: [
        // distractor: reads a change outside the function as a horizontal move
        { id: "A", text: "It is shifted $12$ units left." },
        // distractor: reads the minus sign as a move to the right
        { id: "B", text: "It is shifted $12$ units right." },
        // distractor: reverses the direction of the vertical shift
        { id: "C", text: "It is shifted $12$ units up." },
        { id: "D", text: "It is shifted $12$ units down." }
      ],
      correctAnswer: "D",
      hint: "Compare the two roasts at the same minute mark.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~10s):** Subtracting $12$ after the function lowers every temperature by $12$, so the graph drops $12$ units.\n\n**The Full Solution:**\nStep 1: The $-12$ is applied to the output of $T$, not to the input $m$.\nStep 2: Every point $(m, T(m))$ therefore becomes $(m, T(m) - 12)$: the horizontal position is unchanged and the height falls by $12$.\nStep 3: The graph is shifted $12$ units down. Check: if $T(6) = 140$, the cooler morning gives $140 - 12 = 128$ at the same minute $6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (left $12$): treating an outside change as a horizontal move; only changes to the input shift a graph sideways.\n* Choice B (right $12$): reading the minus sign as a rightward move, which would require $T(m - 12)$.\n* Choice C (up $12$): reversing the direction; subtracting lowers each output.\n\n**Test Day Takeaway:** Outside the function means vertical, and the sign reads straight: subtract to move down.",
      skills: ["function-transformations"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "An apiary's hive scale reports the day's nectar gain, in grams, as $R(t)$ at $t$ hours after sunrise. After a second super is added, the scale reports $R(t) + 180$ instead. If $R(4) = 520$, what does the scale report four hours after sunrise with the second super in place?",
      choices: [
        // distractor: subtracts 180 instead of adding it
        { id: "A", text: "$340$" },
        // distractor: reports R(4) unchanged, ignoring the added super
        { id: "B", text: "$520$" },
        { id: "C", text: "$700$" },
        // distractor: adds 180 twice
        { id: "D", text: "$880$" }
      ],
      correctAnswer: "C",
      hint: "The added super changes the reading, not the hour it is taken.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** The rule adds $180$ grams to every reading, so the scale reports $520 + 180 = 700$ grams.\n\n**The Full Solution:**\nStep 1: The new reading at hour $t$ is $R(t) + 180$.\nStep 2: At $t = 4$ this is $R(4) + 180$.\nStep 3: Since $R(4) = 520$, the scale reports $520 + 180 = 700$ grams. Check: $700 - 180 = 520$, the original reading ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($340$): subtracting $180$ instead of adding it; a super adds mass to the hive.\n* Choice B ($520$): reporting the original reading and ignoring the added super.\n* Choice D ($880$): adding $180$ twice, once to $R(4)$ and once again to the result.\n\n**Test Day Takeaway:** A constant added outside the function changes every output by that constant and leaves the input alone.",
      skills: ["function-transformations"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A pipeline's line pressure, in bars, at pumping station $x$ is $p(x)$, and a parallel pipeline's pressure is $y = p(x - b)$ for a constant $b$. The parallel line reads $30$ bars at station $11$, and the first pipeline reads $30$ bars only at station $4$. What is the value of $b$?",
      choices: [
        // distractor: solves 4 - 11 instead of 11 - 4
        { id: "A", text: "$-7$" },
        // distractor: reports the station where the first pipeline reads 30 bars
        { id: "B", text: "$4$" },
        { id: "C", text: "$7$" },
        // distractor: adds the two station numbers, 11 + 4
        { id: "D", text: "$15$" }
      ],
      correctAnswer: "C",
      hint: "The parallel line's reading at station $11$ is one the first line took somewhere else.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** The parallel line at station $11$ repeats $p(11 - b)$, and that must be $p(4)$, so $b = 7$.\n\n**The Full Solution:**\nStep 1: The parallel line's reading at station $11$ is $p(11 - b)$, and it equals $30$ bars.\nStep 2: The first pipeline reads $30$ bars only at station $4$, so $11 - b = 4$.\nStep 3: Solving gives $b = 7$. Check: $p(11 - 7) = p(4) = 30$ bars ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): computing $4 - 11$; the expression to set equal to $4$ is $11 - b$.\n* Choice B ($4$): reporting the station where the first pipeline reads $30$ bars rather than the offset between the lines.\n* Choice D ($15$): adding the two station numbers instead of subtracting them.\n\n**Test Day Takeaway:** Set the expression inside the function equal to the input whose output you already know.",
      skills: ["function-transformations"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The function $f$ is defined by $f(x)=x^{3}+2x$, and the function $u$ is defined by $u(x)=f(-x)$. Which of the following expressions is equivalent to $u(x)$?",
      choices: [
        { id: "A", text: "$-x^{3}-2x$" },
        // distractor: misses the sign on the linear term
        { id: "B", text: "$-x^{3}+2x$" },
        // distractor: misses the sign on the cubic term
        { id: "C", text: "$x^{3}-2x$" },
        // distractor: treats the function as unchanged
        { id: "D", text: "$x^{3}+2x$" }
      ],
      correctAnswer: "A",
      hint: "Replace every $x$ with $-x$ and simplify each power separately.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** $(-x)^{3}=-x^{3}$ and $2(-x)=-2x$, so $u(x)=-x^{3}-2x$.\n\n**The Full Solution:**\nStep 1: Substituting gives $f(-x)=(-x)^{3}+2(-x)$.\nStep 2: An odd power keeps the negative sign: $(-x)^{3}=-x^{3}$. The linear term becomes $-2x$.\nStep 3: So $u(x)=-x^{3}-2x$. Check at $x=1$: $u(1)=f(-1)=-1-2=-3$, and $-1^{3}-2(1)=-3$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-x^{3}+2x$): negates the cubic term but forgets that $2(-x)=-2x$.\n* Choice C ($x^{3}-2x$): negates the linear term only; $(-x)^{3}$ is negative too.\n* Choice D ($x^{3}+2x$): assumes the substitution changes nothing, which is true only for even-power terms.\n\n**Test Day Takeaway:** Under $x\\to -x$, odd-power terms flip sign and even-power terms do not.",
      skills: ["function-transformations"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A wind-tunnel probe records the pressure difference $f(x)$, in pascals, at distance $x$ centimeters from a model's nose, and $f$ equals $0$ only at $x = -8$ and $x = 12$. A second probe records $y = f(2x)$. At which values of $x$ does the second probe record $0$ pascals?",
      choices: [
        // distractor: multiplies each distance by 2 instead of dividing
        { id: "A", text: "At $x = -16$ and $x = 24$." },
        // distractor: subtracts 2 from each distance
        { id: "B", text: "At $x = -10$ and $x = 10$." },
        // distractor: adds 2 to each distance
        { id: "C", text: "At $x = -6$ and $x = 14$." },
        { id: "D", text: "At $x = -4$ and $x = 6$." }
      ],
      correctAnswer: "D",
      hint: "The second probe reaches the same two readings, just not at the same distances.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** $f(2x) = 0$ requires $2x$ to be $-8$ or $12$, so $x$ is $-4$ or $6$.\n\n**The Full Solution:**\nStep 1: The second probe reads zero exactly when $f(2x) = 0$, that is, when $2x$ is one of the two distances where $f$ is zero.\nStep 2: So $2x = -8$ or $2x = 12$.\nStep 3: Dividing each by $2$ gives $x = -4$ and $x = 6$. Check: $f(2(-4)) = f(-8) = 0$ and $f(2(6)) = f(12) = 0$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-16$ and $24$): multiplying each distance by $2$; the doubling happens to the input, so it must be undone by dividing.\n* Choice B ($-10$ and $10$): subtracting $2$ from each distance, treating a factor as a shift.\n* Choice C ($-6$ and $14$): adding $2$ to each distance, again treating a factor as a shift.\n\n**Test Day Takeaway:** A factor inside the function compresses the graph horizontally; solve for the input that reproduces the known value.",
      skills: ["function-transformations"]
    },
    {
      id: 6,
      difficulty: "easy",
      question: "A cargo bike's load sensor reads $W(t)$ kilograms $t$ minutes into a route, and a duplicate log records $y = W(t) - 15$. The duplicate log reads $62$ kilograms at $t = 20$. What did the load sensor read at $t = 20$?",
      choices: [
        // distractor: reports the size of the adjustment rather than a load
        { id: "A", text: "$15$" },
        // distractor: subtracts 15 again instead of adding it back
        { id: "B", text: "$47$" },
        // distractor: reports the duplicate log's reading unchanged
        { id: "C", text: "$62$" },
        { id: "D", text: "$77$" }
      ],
      correctAnswer: "D",
      hint: "The number you are given is the duplicate log's reading, not the sensor's.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~10s):** The duplicate reads $15$ kilograms low, so the sensor read $62 + 15 = 77$ kilograms.\n\n**The Full Solution:**\nStep 1: The duplicate's reading at minute $20$ is $W(20) - 15$.\nStep 2: Set that equal to the recorded value: $W(20) - 15 = 62$.\nStep 3: Add $15$ to both sides: $W(20) = 77$ kilograms. Check: $77 - 15 = 62$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): reporting the size of the adjustment instead of a load.\n* Choice B ($47$): subtracting $15$ again; the rule has already subtracted it once, so it must be added back.\n* Choice C ($62$): reporting the duplicate log's value, which is what the question asks you to correct.\n\n**Test Day Takeaway:** To recover the original output, undo the outside operation rather than repeating it.",
      skills: ["function-transformations"]
    },
    {
      id: 7,
      difficulty: "easy",
      question: "A seed tray's sprout count on day $d$ is $N(d)$, and a tray sown three days later has count $M(d) = N(d - 3)$. The first tray holds $140$ sprouts on day $9$ and on no other day. On which day does the later tray hold $140$ sprouts?",
      choices: [
        // distractor: reports the length of the delay rather than a day
        { id: "A", text: "$3$" },
        // distractor: computes 9 - 3 instead of 9 + 3
        { id: "B", text: "$6$" },
        { id: "C", text: "$12$" },
        // distractor: multiplies 9 by 3
        { id: "D", text: "$27$" }
      ],
      correctAnswer: "C",
      hint: "Decide which of the two trays reaches a given count first.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** The later tray repeats each count three days later, so it reaches $140$ sprouts on day $9 + 3 = 12$.\n\n**The Full Solution:**\nStep 1: The later tray's count on day $d$ is $N(d - 3)$, so it holds $140$ sprouts when $N(d - 3) = 140$.\nStep 2: The first tray holds $140$ sprouts on day $9$ and on no other day, so $d - 3 = 9$.\nStep 3: Therefore $d = 12$. Check: $M(12) = N(12 - 3) = N(9) = 140$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): reporting the length of the delay instead of the day asked for.\n* Choice B ($6$): computing $9 - 3$; the later tray lags, so its day is larger, not smaller.\n* Choice D ($27$): multiplying $9$ by $3$, treating the delay as a scaling.\n\n**Test Day Takeaway:** Subtracting inside the function delays the graph: solve the inside expression for the known input.",
      skills: ["function-transformations"]
    },
    {
      id: 8,
      difficulty: "medium",
      question: "A ripening room's ethylene concentration, in parts per million, is $f(t)$ at minute $t$ of a treatment run, and a backup analyzer reports $g(t) = f(t + 7) - 4$. The graph of $y = g(t)$ has a $y$-intercept of $11$. What is the value of $f(7)$?",
      choices: [
        // distractor: reports the horizontal shift 7 rather than a concentration
        { id: "A", text: "$7$" },
        // distractor: reports g's intercept, forgetting the -4
        { id: "B", text: "$11$" },
        { id: "C", text: "$15$" },
        // distractor: adds the horizontal shift 7 to 11 instead of adding 4
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "C",
      hint: "The graph's intercept is a value of $g$, not of $f$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** A $y$-intercept of $11$ means $g(0) = f(7) - 4 = 11$, so $f(7) = 15$ parts per million.\n\n**The Full Solution:**\nStep 1: A $y$-intercept occurs at $t = 0$, so $g(0) = 11$.\nStep 2: Substituting into the rule gives $g(0) = f(0 + 7) - 4 = f(7) - 4$, so $f(7) - 4 = 11$.\nStep 3: Add $4$: $f(7) = 15$ parts per million. Check: $g(0) = 15 - 4 = 11$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): reporting the horizontal shift instead of a concentration.\n* Choice B ($11$): reporting the backup analyzer's intercept and leaving the $-4$ unaccounted for.\n* Choice D ($18$): adding the horizontal shift $7$ to $11$; the number that must be added back is the $4$.\n\n**Test Day Takeaway:** Evaluate the transformed rule at the input the question describes, then undo the outside operation.",
      skills: ["function-transformations"]
    },
    {
      id: 9,
      difficulty: "medium",
      question: "A cranberry bog's water depth, in meters, is $f(x)$ at a point $x$ meters east of the center dike. A second survey counts distance west of the dike as positive and references a datum $5$ meters lower. Which expression models the second survey's depth?",
      choices: [
        // distractor: negates the depth instead of the distance and raises the datum
        { id: "A", text: "$-f(x) + 5$" },
        // distractor: negates the depth rather than the distance
        { id: "B", text: "$-f(x) - 5$" },
        // distractor: reflects the distance correctly but raises the datum instead of lowering it
        { id: "C", text: "$f(-x) + 5$" },
        { id: "D", text: "$f(-x) - 5$" }
      ],
      correctAnswer: "D",
      hint: "One of the two changes renames the positions and the other renames the levels.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** Reversing which direction counts as positive replaces $x$ with $-x$, and a datum $5$ meters lower subtracts $5$ from every depth.\n\n**The Full Solution:**\nStep 1: A point $x$ meters east of the dike is $-x$ meters west of it, so the second survey records at $x$ what the first survey recorded at $-x$: the expression begins $f(-x)$.\nStep 2: A datum $5$ meters lower reduces every recorded depth by $5$, which is an operation on the output.\nStep 3: Combining them gives $f(-x) - 5$. Check: a point $3$ meters east with depth $2$ meters is listed by the second survey at $x = -3$ with depth $2 - 5 = -3$ meters ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-f(x) + 5$): negating the depth instead of the distance, and raising the datum instead of lowering it.\n* Choice B ($-f(x) - 5$): negating the depth rather than the distance; the reversed measuring direction acts on the input.\n* Choice C ($f(-x) + 5$): reflecting the distance correctly but adding $5$; a lower datum subtracts.\n\n**Test Day Takeaway:** Reversing the measuring direction acts inside the function; changing the reference level acts outside it.",
      skills: ["function-transformations"]
    },
    {
      id: 10,
      difficulty: "medium",
      question: "An olive mill's oil yield, in kilograms, from $p$ tonnes of fruit is $q(p)$. A larger mill sets aside the first $6$ tonnes of every delivery for curing and yields four times as much oil per tonne of the fruit it presses. Which equation defines the larger mill's yield $g$?",
      choices: [
        // distractor: shifts the tonnage the wrong way, adding 6 instead of removing it
        { id: "A", text: "$g(p) = 4q(p + 6)$" },
        // distractor: multiplies the tonnage by 4 rather than the yield
        { id: "B", text: "$g(p) = q(4p - 6)$" },
        // distractor: subtracts 6 kilograms of oil instead of removing 6 tonnes of fruit
        { id: "C", text: "$g(p) = 4q(p) - 6$" },
        { id: "D", text: "$g(p) = 4q(p - 6)$" }
      ],
      correctAnswer: "D",
      hint: "Decide whether the $6$ tonnes changes what the press receives or what it produces.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** Only $p - 6$ tonnes reach the press, and each pressed tonne yields four times as much, so $g(p) = 4q(p - 6)$.\n\n**The Full Solution:**\nStep 1: Setting aside the first $6$ tonnes means the press receives $p - 6$ tonnes, so the input to $q$ is $p - 6$.\nStep 2: Yielding four times as much oil multiplies the output of $q$, so the whole value is multiplied by $4$.\nStep 3: Together these give $g(p) = 4q(p - 6)$. Check: a $26$-tonne delivery presses $20$ tonnes, so $g(26) = 4q(20)$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4q(p + 6)$): adding the $6$ tonnes to the delivery instead of removing them.\n* Choice B ($q(4p - 6)$): multiplying the tonnage by $4$; the four-fold gain is in oil produced, which is the output.\n* Choice C ($4q(p) - 6$): subtracting $6$ kilograms of oil at the end rather than removing $6$ tonnes of fruit at the start.\n\n**Test Day Takeaway:** Decide first whether each number changes what goes in or what comes out, then place it inside or outside the function.",
      skills: ["function-transformations"]
    },
    {
      id: 11,
      difficulty: "hard",
      question: "A cryocooler's temperature offset, in kelvins, $x$ hours into a cooldown is $f(x)$, whose least value is $-2$, at $x = 4$. A second unit satisfies $h(x) = a\\,f(x - 3) + 5$ for a positive constant $a$, and the least value of $h$ is $-9$. What is the value of $a$?",
      choices: [
        // distractor: drops the negative on f's least value, solving 2a + 5 = -9
        { id: "A", text: "$-7$" },
        // distractor: adds the 5 instead of subtracting it, solving -2a = -4
        { id: "B", text: "$2$" },
        { id: "C", text: "$7$" },
        // distractor: stops at -2a = -14 and reports 14 without dividing
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "C",
      hint: "The sign of $a$ decides which reading of $f$ produces the least value of $h$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** A positive $a$ keeps $-2$ the least value, so $-2a + 5 = -9$ and $a = 7$.\n\n**The Full Solution:**\nStep 1: Because $a$ is positive, $a\\,f(x - 3)$ is least exactly where $f$ is least, so the least value of $h$ is $a(-2) + 5$.\nStep 2: Set that equal to the stated minimum: $-2a + 5 = -9$, so $-2a = -14$.\nStep 3: Divide by $-2$: $a = 7$. Check: $7(-2) + 5 = -14 + 5 = -9$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-7$): dropping the negative on $f$'s least value and solving $2a + 5 = -9$.\n* Choice B ($2$): adding the $5$ to $-9$ instead of subtracting it, which gives $-2a = -4$.\n* Choice D ($14$): stopping at $-2a = -14$ and reporting $14$ without dividing by $-2$.\n\n**Test Day Takeaway:** A positive multiplier preserves which input gives the extreme value; only the value itself is scaled and shifted.",
      skills: ["function-transformations"]
    },
    {
      id: 12,
      difficulty: "hard",
      question: "A fermentation tank's temperature deviation from its set point is $f(t)$ degrees Celsius at $t$ hours after inoculation, with greatest value $5$, at $t = 1$, and least value $-3$, at $t = 6$. A monitoring channel logs $y = -2f(t)$. Which of the following must be true of that log?",
      choices: [
        // distractor: multiplies -3 by -2 but keeps the result negative
        { id: "A", text: "Its greatest value is $-6$, reached at $t = 6$." },
        // distractor: pairs the correct value with the hour of f's maximum
        { id: "B", text: "Its greatest value is $6$, reached at $t = 1$." },
        // distractor: scales f's greatest value 5 by 2 and ignores the reflection
        { id: "C", text: "Its greatest value is $10$, reached at $t = 1$." },
        { id: "D", text: "Its greatest value is $6$, reached at $t = 6$." }
      ],
      correctAnswer: "D",
      hint: "The log's largest reading need not come from the tank's largest deviation.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~30s):** Multiplying by $-2$ turns the least deviation, $-3$, into the greatest logged value, $6$, at $t = 6$.\n\n**The Full Solution:**\nStep 1: Multiplying by a negative number reverses order: the input that made $f$ least makes $-2f$ greatest.\nStep 2: The least value of $f$ is $-3$, at $t = 6$, so the greatest value of $-2f(t)$ is $-2(-3) = 6$, at $t = 6$.\nStep 3: No other input can beat it, since $f(t) \\ge -3$ gives $-2f(t) \\le 6$ for every $t$. Check: at $t = 1$ the log reads $-2(5) = -10$, the least logged value ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6$ at $t = 6$): multiplying $-3$ by $-2$ but keeping the answer negative; two negatives give $+6$.\n* Choice B ($6$ at $t = 1$): pairing the correct value with the hour of $f$'s maximum instead of its minimum.\n* Choice C ($10$ at $t = 1$): scaling $f$'s greatest value $5$ by $2$ and ignoring the reflection, which sends $5$ to $-10$.\n\n**Test Day Takeaway:** A negative multiplier swaps maximum and minimum — find the extreme value first, then check which input produces it.",
      skills: ["function-transformations"]
    }
  ],

  // Section: Difficult Transformations
  // Based on "System of Equations Method" and "Answer Choice Method" from videos
  "Difficult Transformations": [
    {
      id: 1,
      difficulty: "hard",
      question: "The graph of $y = f(x)$ is shown, where $f(x)$ is the recorded signal strength, in decibels above baseline, of a tracking dish pointed $x$ degrees from a satellite's true bearing. For what value of $c$ does the graph of $y = f(x) + c$ have exactly one point in common with the $x$-axis?",
      diagram: { type: "parabola", params: { vertex: { h: 3, k: 4 }, a: -1, xRange: [-2, 8], yRange: [-8, 6], showVertex: false, xTickInterval: 2, yTickInterval: 2, gridInterval: 1, xLabel: "Pointing offset (degrees)", yLabel: "Signal strength (dB)" } },
      choices: [
        { id: "A", text: "$-4$" },
        // distractor: negates the vertex's x-coordinate, 3, instead of its y-coordinate
        { id: "B", text: "$-3$" },
        // distractor: reports the offset 3 at which the peak occurs
        { id: "C", text: "$3$" },
        // distractor: reports the peak value 4 without negating it
        { id: "D", text: "$4$" }
      ],
      correctAnswer: "A",
      hint: "The curve shown crosses the axis twice; $c$ decides how many crossings survive.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** The peak sits $4$ decibels above the axis, so every point must drop by $4$: $c = -4$.\n\n**The Full Solution:**\nStep 1: The highest point of the graph is $(3, 4)$, so the greatest value of $f$ is $4$ decibels.\nStep 2: Adding $c$ raises every point of the graph by $c$, so the greatest value of $f(x) + c$ is $4 + c$.\nStep 3: A downward-opening curve meets the $x$-axis exactly once only when its highest point lies on that axis, so $4 + c = 0$ and $c = -4$. Check: $f(x) - 4$ peaks at $(3, 0)$ and is negative for every other $x$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($-3$): negating the offset $3$ at which the peak occurs instead of the peak's height.\n* Choice C ($3$): reporting the pointing offset of the peak rather than the vertical shift.\n* Choice D ($4$): reporting the peak height without the negative sign; adding $4$ lifts the curve further from the axis.\n\n**Test Day Takeaway:** Exactly one point in common with the $x$-axis means the extreme value lands on zero — set the shifted maximum equal to $0$.",
      skills: ["function-transformations", "system-of-equations"]
    },
    {
      id: 2,
      difficulty: "hard",
      question: "The curve shown in the $xy$-plane is the graph of $y=f(x)$, where $f(x)=\\dfrac{a}{x+b}$ for constants $a$ and $b$. The function $h$ is defined by $h(x)=f(x-2)$. What is an equation of the vertical asymptote of the graph of $y=h(x)$?",
      diagram: { type: "rationalFunction", params: { a: 10, b: -4, showPoints: [[6, 5], [9, 2]] } },
      choices: [
        // distractor: negates the shifted constant a second time
        { id: "A", text: "$x=-6$" },
        // distractor: shifts the asymptote in the wrong direction
        { id: "B", text: "$x=2$" },
        // distractor: never applies the shift
        { id: "C", text: "$x=4$" },
        { id: "D", text: "$x=6$" }
      ],
      correctAnswer: "D",
      hint: "The dashed line locates the input that $f$ cannot accept; ask which input $h$ cannot accept.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~40s):** $f$ blows up at $x=4$, and $h(x)=f(x-2)$ blows up where $x-2=4$, that is, at $x=6$.\n\n**The Full Solution:**\nStep 1: The graph shows a vertical asymptote at $x=4$, so the denominator $x+b$ is zero there, meaning $b=-4$ and $f(x)=\\dfrac{a}{x-4}$.\nStep 2: Then $h(x)=f(x-2)=\\dfrac{a}{(x-2)-4}=\\dfrac{a}{x-6}$.\nStep 3: The denominator is zero when $x=6$, so the asymptote of $h$ is $x=6$ — the original asymptote moved right $2$ units. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($x=-6$): applies the sign-reversal rule a second time, reading $\\dfrac{a}{x-6}$ as having asymptote $x=-6$.\n* Choice B ($x=2$): moves the asymptote left; $f(x-2)$ shifts the graph, asymptote included, to the right.\n* Choice C ($x=4$): reports the asymptote of $f$ and never applies the shift.\n\n**Test Day Takeaway:** An asymptote is part of the graph: shift it exactly as you shift every point.",
      skills: ["function-transformations", "system-of-equations"]
    },
    {
      id: 3,
      difficulty: "hard",
      question: "The function $f$ is defined by $f(x)=(x-h)^{2}+k$, where $h$ and $k$ are constants, and the graph of $y=f(x)$ is shown in the $xy$-plane. The function $g$ is defined by $g(x)=f(x+6)$. If $g(x)=(x-p)^{2}+q$, where $p$ and $q$ are constants, what is the value of $p+q$?",
      diagram: { type: "quadraticVertex", params: { vertex: [4, -5], a: 1, showVertex: true } },
      choices: [
        { id: "A", text: "$-7$" },
        // distractor: reads p with the wrong sign
        { id: "B", text: "$-3$" },
        // distractor: ignores the shift
        { id: "C", text: "$-1$" },
        // distractor: shifts right instead of left
        { id: "D", text: "$5$" }
      ],
      correctAnswer: "A",
      hint: "Write $g$ in the same vertex form as $f$ and read $p$ off with its sign, not its size.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~45s):** The graph gives $f(x)=(x-4)^{2}-5$, so $g(x)=(x+2)^{2}-5$, meaning $p=-2$, $q=-5$, and $p+q=-7$.\n\n**The Full Solution:**\nStep 1: The vertex shown is $(4,-5)$, so $h=4$ and $k=-5$, giving $f(x)=(x-4)^{2}-5$.\nStep 2: Substituting, $g(x)=f(x+6)=\\left((x+6)-4\\right)^{2}-5=(x+2)^{2}-5$.\nStep 3: To match the form $(x-p)^{2}+q$, write $(x+2)^{2}$ as $\\left(x-(-2)\\right)^{2}$, so $p=-2$ and $q=-5$, and $p+q=-7$. Check: the vertex of $g$ is $(-2,-5)$, which is the vertex of $f$ moved $6$ units left. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-3$): reads $p$ as $2$ from $(x+2)^{2}$; the form requires $x-p$, so $p=-2$.\n* Choice C ($-1$): uses the vertex of $f$ itself: $4+(-5)=-1$, ignoring the shift.\n* Choice D ($5$): shifts right instead of left: $10+(-5)=5$.\n\n**Test Day Takeaway:** In $(x-p)^{2}+q$ the constant $p$ carries the opposite sign of what appears inside the parentheses.",
      skills: ["function-transformations", "vertex-form"]
    },
    {
      id: 4,
      difficulty: "hard",
      question: "The graph of $y=f(x)$ is shown in the $xy$-plane, where $f(x)=|x-c|+d$ and $c$ and $d$ are constants. The function $g$ is defined by $g(x)=-f(x+3)+4$. What is the maximum value of $g$?",
      diagram: { type: "absoluteValue", params: { vertex: [-1, 6], slope: 1 } },
      choices: [
        // distractor: adds the constant before reflecting
        { id: "A", text: "$-10$" },
        // distractor: omits the vertical shift
        { id: "B", text: "$-6$" },
        { id: "C", text: "$-2$" },
        // distractor: omits the reflection
        { id: "D", text: "$10$" }
      ],
      correctAnswer: "C",
      hint: "A horizontal shift cannot change how high or low a graph reaches — concentrate on what the other two operations do to the extreme value.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~45s):** The least value of $f$ is $6$; negating makes it the greatest value $-6$, and adding $4$ gives $-2$.\n\n**The Full Solution:**\nStep 1: The V shown has its corner at $(-1,6)$, so the smallest value of $f$ is $6$.\nStep 2: The inside $x+3$ slides the graph left but leaves every output unchanged, so $f(x+3)$ still has least value $6$.\nStep 3: Negating turns that least value into the greatest value of $-f(x+3)$, namely $-6$; adding $4$ raises it to $-6+4=-2$. Check: at $x=-4$, $g(-4)=-f(-1)+4=-6+4=-2$, and every other input gives a smaller value. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-10$): adds $4$ before reflecting: $-(6+4)=-10$, but the $+4$ is applied after the negation.\n* Choice B ($-6$): reflects correctly but never adds the $4$.\n* Choice D ($10$): ignores the reflection and computes $6+4$, which would be the maximum only if the graph still opened upward.\n\n**Test Day Takeaway:** Reflection converts a minimum into a maximum; apply the outside constant to the reflected value, not before it.",
      skills: ["function-transformations", "combined-transformations"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The graph shown gives a grain-silo probe's moisture reading $m(x)$, in percent, at depth $x$ meters. Exactly one depth satisfies $m(x) = 14 - m(x)$. At what depth, in meters, does that occur?",
      diagram: { type: "piecewiseLinear", params: { points: [[0, 1], [3, 10], [7, 8], [12, 11]], xRange: [0, 12], yRange: [0, 12], xTickInterval: 2, yTickInterval: 2, gridInterval: 1, xLabel: "Depth (m)", yLabel: "Moisture (%)" } },
      choices: [
        // distractor: solves m(x) = -7 and reads the depth of the lowest reading
        { id: "A", text: "$0$" },
        { id: "B", text: "$2$" },
        // distractor: reports the moisture value 7 instead of the depth
        { id: "C", text: "$7$" },
        // distractor: solves m(x) = 14 and picks the deepest point on the graph
        { id: "D", text: "$12$" }
      ],
      correctAnswer: "B",
      hint: "Nothing on the graph reads $14$, so the equation has to be simplified first.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** $m(x) = 14 - m(x)$ gives $2m(x) = 14$, so $m(x) = 7$, and the graph reaches $7$ percent only at $x = 2$.\n\n**The Full Solution:**\nStep 1: Add $m(x)$ to both sides: $2m(x) = 14$, so $m(x) = 7$.\nStep 2: Read across the graph at a height of $7$ percent. The curve rises from $(0, 1)$ to $(3, 10)$, crossing $7$ once, and it never returns to $7$ afterward because it stays at or above $8$ percent from $x = 3$ on.\nStep 3: That single crossing is at $x = 2$. Check: the segment from $(0, 1)$ to $(3, 10)$ rises $3$ percent per meter, so at $x = 2$ the reading is $1 + 3(2) = 7$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): solving $m(x) = -7$ after moving the term the wrong way, then reading the depth of the lowest point.\n* Choice C ($7$): reporting the moisture reading $7$ instead of the depth the question asks for.\n* Choice D ($12$): solving $2m(x) = 14$ as $m(x) = 14$ and picking the deepest point, where the reading is greatest.\n\n**Test Day Takeaway:** Collect the function on one side before you read the graph; only then does the picture answer the question.",
      skills: ["function-transformations", "system-of-equations"]
    },
    {
      id: 6,
      difficulty: "hard",
      question: "The four points shown are the only points on the graph of $y = f(x)$, where $f(x)$ is the magnetic deflection, in microteslas, recorded by a boom-mounted magnetometer at offset $x$ meters from the spacecraft body. Which point must lie on the graph of $y = -f(x + 3) + 1$?",
      diagram: { type: "coordinatePoints", params: { points: [[-4, 3], [-1, -2], [2, 5], [5, 1]], xMin: -8, xMax: 8, yMin: -8, yMax: 8 } },
      choices: [
        // distractor: negates the +1 as well, computing -(f(2) + 1) = -6
        { id: "A", text: "$(-1, -6)$" },
        // distractor: treats f(x + 3) as a shift to the right, sending the input 2 to 5
        { id: "B", text: "$(5, -4)$" },
        // distractor: skips the reflection and computes f(2) + 1 = 6
        { id: "C", text: "$(-1, 6)$" },
        { id: "D", text: "$(-1, -4)$" }
      ],
      correctAnswer: "D",
      hint: "Ask which recorded reading each candidate point would have to come from.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~35s):** Take the point $(2, 5)$: the input satisfies $x + 3 = 2$ at $x = -1$, and the output becomes $-5 + 1 = -4$.\n\n**The Full Solution:**\nStep 1: The four recorded points are $(-4, 3)$, $(-1, -2)$, $(2, 5)$, and $(5, 1)$.\nStep 2: For $y = -f(x + 3) + 1$ to use the reading $f(2) = 5$, the input must satisfy $x + 3 = 2$, so $x = -1$.\nStep 3: The output is $-f(2) + 1 = -5 + 1 = -4$, so $(-1, -4)$ lies on the new graph. Check: substituting $x = -1$ gives $-f(-1 + 3) + 1 = -f(2) + 1 = -4$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-1, -6)$): applying the negative to the $+1$ as well, computing $-(5 + 1) = -6$; only the function value is reflected.\n* Choice B ($(5, -4)$): reading $f(x + 3)$ as a shift to the right and sending the input $2$ to $5$; adding inside the function moves inputs the other way.\n* Choice C ($(-1, 6)$): dropping the reflection and computing $5 + 1 = 6$.\n\n**Test Day Takeaway:** Handle the inside first — solve for the $x$ that feeds the known reading — then apply the outside operations in order.",
      skills: ["function-transformations", "combined-transformations"]
    },
    {
      id: 7,
      difficulty: "hard",
      question: "The graph of $y=f(x)$ is shown in the $xy$-plane, and its $x$-intercepts are $(-4,0)$ and $(2,0)$. The function $g$ is defined by $g(x)=f(x-5)$. What is the distance between the two $x$-intercepts of the graph of $y=g(x)$?",
      diagram: { type: "quadraticIntercepts", params: { intercepts: [-4, 2] } },
      choices: [
        // distractor: subtracts the shift from the distance
        { id: "A", text: "$1$" },
        // distractor: reports the shift itself
        { id: "B", text: "$5$" },
        { id: "C", text: "$6$" },
        // distractor: adds the shift to the distance
        { id: "D", text: "$11$" }
      ],
      correctAnswer: "C",
      hint: "Locate both new intercepts before measuring, and notice what a translation does to distances.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** Both intercepts move right $5$, to $x=1$ and $x=7$, so the distance is still $7-1=6$.\n\n**The Full Solution:**\nStep 1: $f(-4)=0$ and $f(2)=0$, so $g(x)=f(x-5)$ is zero when $x-5=-4$ or $x-5=2$.\nStep 2: Solving gives $x=1$ and $x=7$: the intercepts are $(1,0)$ and $(7,0)$.\nStep 3: The distance between them is $7-1=6$, the same as the original distance $2-(-4)=6$, because a translation moves both points equally. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): subtracts the shift from the distance: $6-5=1$.\n* Choice B ($5$): reports the size of the shift rather than the separation of the intercepts.\n* Choice D ($11$): adds the shift to the distance: $6+5=11$.\n\n**Test Day Takeaway:** A horizontal translation relocates every point by the same amount, so distances between features are unchanged.",
      skills: ["function-transformations", "x-intercepts"]
    },
    {
      id: 8,
      difficulty: "hard",
      question: "For constants $a$ and $b$, the function $f$ satisfies $f(x)=\\dfrac{a}{x+b}$, and the curve drawn in the $xy$-plane is its graph, with marked points $(0,5)$ and $(2,3)$. The graph of $y=p(x)$ is the graph of $y=f(x)$ raised $4$ units. Which of the following defines $p$?",
      diagram: { type: "rationalFunction", params: { a: 15, b: 3, showPoints: [[0, 5], [2, 3]] } },
      choices: [
        // distractor: lowers instead of raising the graph
        { id: "A", text: "$p(x)=\\dfrac{15}{x+3}-4$" },
        { id: "B", text: "$p(x)=\\dfrac{15}{x+3}+4$" },
        // distractor: moves the constant into the denominator
        { id: "C", text: "$p(x)=\\dfrac{15}{x+7}$" },
        // distractor: adds the constant to the numerator
        { id: "D", text: "$p(x)=\\dfrac{19}{x+3}$" }
      ],
      correctAnswer: "B",
      hint: "Test the choices against a height you can compute: raising a graph adds to the finished output.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** The marked points give $f(x)=\\dfrac{15}{x+3}$, and raising the graph $4$ units adds $4$ to the whole output.\n\n**The Full Solution:**\nStep 1: From $(0,5)$: $\\dfrac{a}{b}=5$, so $a=5b$. From $(2,3)$: $\\dfrac{a}{2+b}=3$, so $a=6+3b$.\nStep 2: Setting these equal gives $5b=6+3b$, so $b=3$ and $a=15$, and $f(x)=\\dfrac{15}{x+3}$.\nStep 3: Raising the graph $4$ units means $p(x)=f(x)+4=\\dfrac{15}{x+3}+4$. Check against the choices at $x=0$: $p(0)$ must be $5+4=9$, and only this equation gives $\\dfrac{15}{3}+4=9$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\dfrac{15}{x+3}-4$): lowers the graph instead of raising it.\n* Choice C ($\\dfrac{15}{x+7}$): puts the $4$ into the denominator, which would shift the graph horizontally.\n* Choice D ($\\dfrac{19}{x+3}$): adds $4$ to the numerator; that changes the shape of the curve rather than lifting it.\n\n**Test Day Takeaway:** An outside constant is added to the entire fraction — it never migrates into the numerator or the denominator.",
      skills: ["function-transformations", "answer-choice-method"]
    },
    {
      id: 9,
      difficulty: "hard",
      question: "The three plotted points lie on the graph of $y=f(x)$ in the $xy$-plane, and the function $g$ is defined by $g(x)=-2f(x)+1$. What is the largest value that $g$ takes at those three inputs?",
      diagram: { type: "coordinatePoints", params: { points: [[-2, 3], [2, -4], [6, 1]] } },
      choices: [
        // distractor: uses the largest value of f, ignoring the sign reversal
        { id: "A", text: "$-5$" },
        // distractor: uses the largest input instead of comparing outputs
        { id: "B", text: "$-1$" },
        // distractor: omits the constant
        { id: "C", text: "$8$" },
        { id: "D", text: "$9$" }
      ],
      correctAnswer: "D",
      hint: "Apply the rule at each plotted point before deciding which one wins.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~40s):** A negative multiplier reverses the ranking, so the least output of $f$ wins: $g(2)=-2(-4)+1=9$.\n\n**The Full Solution:**\nStep 1: The plotted points give $f(-2)=3$, $f(2)=-4$, and $f(6)=1$.\nStep 2: Applying the rule at each input: $g(-2)=-2(3)+1=-5$, $g(2)=-2(-4)+1=9$, and $g(6)=-2(1)+1=-1$.\nStep 3: Comparing $-5$, $9$, and $-1$, the largest value is $9$. Check: multiplying by $-2$ reverses order, so the smallest value of $f$, namely $-4$, produces the largest value of $g$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-5$): starts from the greatest value of $f$, $f(-2)=3$, and computes $-2(3)+1=-5$; the negative factor changes which point wins.\n* Choice B ($-1$): evaluates at the greatest input, $x=6$, rather than comparing the three outputs: $-2(1)+1=-1$.\n* Choice C ($8$): picks the right point but stops after multiplying: $-2(-4)=8$, with the $+1$ never applied.\n\n**Test Day Takeaway:** A negative vertical stretch flips the ranking of outputs, so the minimum of $f$ becomes the maximum of the transformed function.",
      skills: ["function-transformations", "combined-transformations"]
    }
  ]
};
