// Practice questions for Systems module
// Questions are organized by SECTION (question type)

export const systemsQuestions = {
  // Section: Introduction
  "Introduction": [
    {
      id: 1,
      difficulty: "easy",
      question: "The system of equations $y = 3x - 4$ and $y = -x + 8$ is graphed in the $xy$-plane. How many solutions $(x, y)$ does this system have?",
      choices: [
        // distractor: zero solutions requires parallel, distinct lines, but the slopes $3$ and $-1$ are not equal.
        { id: "A", text: "Zero" },
        { id: "B", text: "Exactly one" },
        // distractor: two distinct lines meet at most once, so a system of two linear equations can never have exactly two solutions.
        { id: "C", text: "Exactly two" },
        // distractor: infinitely many solutions requires the two equations to describe the same line, which would force equal slopes and equal $y$-intercepts.
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "B",
      hint: "Compare the slopes of the two lines before counting anything.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The slopes $3$ and $-1$ are different, so the lines cross exactly once and the system has one solution.\n\n**The Full Solution:**\nStep 1: Both equations are in slope-intercept form, with slopes $3$ and $-1$.\nStep 2: Two lines with different slopes are not parallel, so they intersect at exactly one point in the $xy$-plane.\nStep 3: That single intersection point is the one ordered pair satisfying both equations, so the system has exactly one solution. Check: $3x - 4 = -x + 8$ gives $4x = 12$, so $x = 3$ and $y = 5$, a single ordered pair. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: zero solutions requires parallel, distinct lines, but the slopes $3$ and $-1$ are not equal.\n* Choice C: two distinct lines meet at most once, so a system of two linear equations can never have exactly two solutions.\n* Choice D: infinitely many solutions requires the two equations to describe the same line, which would force equal slopes and equal $y$-intercepts.\n\n**Test Day Takeaway:** Count solutions from the slopes first: different slopes give one solution, equal slopes give either none or infinitely many.",
      skills: ["system-solution-types"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The graph of a system of two linear equations is shown in the $xy$-plane. Which ordered pair is the solution to this system?",
      diagram: { type: "twoLineGraph", params: { intersection: { x: 2, y: -1 }, slope1: 1, slope2: -2, xRange: [-6, 6], yRange: [-6, 6], showIntersection: false } },
      choices: [
        // distractor: pairs the two $y$-intercepts, $-3$ and $3$, as if they formed a solution.
        { id: "A", text: "$(-3, 3)$" },
        // distractor: reverses the coordinates of the intersection point.
        { id: "B", text: "$(-1, 2)$" },
        { id: "C", text: "$(2, -1)$" },
        // distractor: reads the $x$-coordinate correctly but drops the negative sign on the $y$-coordinate.
        { id: "D", text: "$(2, 1)$" }
      ],
      correctAnswer: "C",
      hint: "The solution is the one point that lies on both lines at once.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** The two lines cross at $(2, -1)$, which is the only point on both graphs.\n\n**The Full Solution:**\nStep 1: An ordered pair solves a system of two linear equations exactly when it lies on both graphs.\nStep 2: The only point shared by the two lines is their point of intersection.\nStep 3: Reading across and up from that point gives $x = 2$ and $y = -1$, so the solution is $(2, -1)$. Check: the lines shown are $y = x - 3$ and $y = -2x + 3$, and $2 - 3 = -1$ while $-2(2) + 3 = -1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($(-3, 3)$): pairs the two $y$-intercepts, $-3$ and $3$, as if they formed a solution.\n* Choice B ($(-1, 2)$): reverses the coordinates of the intersection point.\n* Choice D ($(2, 1)$): reads the $x$-coordinate correctly but drops the negative sign on the $y$-coordinate.\n\n**Test Day Takeaway:** On a graphed system, the solution is the intersection point, read as $(x, y)$ in that order. Intercepts are not solutions.",
      skills: ["system-solution-types"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "One equation in a system of two linear equations is $6x - 4y = 10$. The system has no solution. Which of the following could be the other equation in this system?",
      choices: [
        // distractor: this is the given equation divided by $2$, so the two equations describe the same line and the system has infinitely many solutions.
        { id: "A", text: "$3x - 2y = 5$" },
        { id: "B", text: "$3x - 2y = 8$" },
        // distractor: the sign of the $y$-coefficient changes, so the slopes differ and the lines meet at exactly one point.
        { id: "C", text: "$3x + 2y = 8$" },
        // distractor: the coefficients are swapped, which again changes the slope and gives exactly one solution.
        { id: "D", text: "$2x - 3y = 8$" }
      ],
      correctAnswer: "B",
      hint: "A system has no solution when the two lines are parallel but not identical.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** Dividing the given equation by $2$ gives $3x - 2y = 5$. Keeping those coefficients but changing the constant to $8$ produces a parallel, distinct line.\n\n**The Full Solution:**\nStep 1: A system of two linear equations has no solution exactly when its graphs are parallel and distinct.\nStep 2: Two equations in the form $ax + by = c$ are parallel when their $x$- and $y$-coefficients are proportional. Halving the given equation gives $3x - 2y = 5$, so the second equation must have coefficients proportional to $3$ and $-2$.\nStep 3: The equation $3x - 2y = 8$ has exactly those coefficients but a different constant, so the lines are parallel and distinct and the system has no solution. Check: subtracting the two equations gives $0 = -3$, which is never true. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3x - 2y = 5$): this is the given equation divided by $2$, so the two equations describe the same line and the system has infinitely many solutions.\n* Choice C ($3x + 2y = 8$): the sign of the $y$-coefficient changes, so the slopes differ and the lines meet at exactly one point.\n* Choice D ($2x - 3y = 8$): the coefficients are swapped, which again changes the slope and gives exactly one solution.\n\n**Test Day Takeaway:** For no solution, match the coefficient ratio and break the constant. Matching everything gives infinitely many solutions instead.",
      skills: ["system-solution-types", "parallel-line-slope"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives the initial fee and the hourly rate charged by each of two equipment rental companies. For each company, the total cost, in dollars, of renting for $h$ hours is modeled by a linear equation. In the $xy$-plane, the graphs of these two equations intersect at the point $(6, 102)$. What does $102$ represent in this context?",
      diagram: { type: "dataTable", params: { headers: ["Company", "Initial fee (dollars)", "Hourly rate (dollars)"], rows: [["P", "30", "12"], ["Q", "54", "8"]] } },
      choices: [
        // distractor: describes the first coordinate, $6$, which is the number of hours, not the cost.
        { id: "A", text: "The number of hours for which the two companies charge the same total cost" },
        { id: "B", text: "The total cost, in dollars, of renting from either company for $6$ hours" },
        // distractor: at the intersection the two costs are equal, so their difference is $\$0$, not $\$102$.
        { id: "C", text: "The difference, in dollars, between the two total costs after $6$ hours" },
        // distractor: the hourly rates are $\$12$ and $\$8$ and they are not equal; $102$ is a total, not a rate.
        { id: "D", text: "The hourly rate, in dollars, charged by each company" }
      ],
      correctAnswer: "B",
      hint: "Decide what each axis measures before interpreting either coordinate.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~40s):** At the intersection the two costs are equal, so $102$ is the shared total cost after $6$ hours.\n\n**The Full Solution:**\nStep 1: The two cost equations are $y = 30 + 12h$ for company P and $y = 54 + 8h$ for company Q, where $h$ is hours and $y$ is total cost in dollars.\nStep 2: The intersection point satisfies both equations, so at $h = 6$ hours the two companies charge the same amount.\nStep 3: The second coordinate of the point is that shared cost, $\\$102$. Check: $30 + 12(6) = 102$ and $54 + 8(6) = 102$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: describes the first coordinate, $6$, which is the number of hours, not the cost.\n* Choice C: at the intersection the two costs are equal, so their difference is $\\$0$, not $\\$102$.\n* Choice D: the hourly rates are $\\$12$ and $\\$8$ and they are not equal; $102$ is a total, not a rate.\n\n**Test Day Takeaway:** The solution of a system in context is a pair of measurements. Name the units of each coordinate before choosing an interpretation.",
      skills: ["system-solution-types"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "An air-cargo hub charges \\$0.42 per kilogram for standard freight and \\$0.75 per kilogram for refrigerated freight. On one shift the hub moved $8{,}400$ kilograms, and had it shifted $500$ kilograms from standard to refrigerated, the charges would have totaled \\$4{,}485. How many more kilograms of standard freight than refrigerated freight did the hub move?",
      choices: [
        // distractor: reports the refrigerated mass 2400 alone instead of the difference
        { id: "A", text: "$2{,}400$" },
        // distractor: treats 4485 as the actual charge, giving 5500 - 2900 = 2600
        { id: "B", text: "$2{,}600$" },
        { id: "C", text: "$3{,}600$" },
        // distractor: reports the standard mass 6000 alone instead of the difference
        { id: "D", text: "$6{,}000$" }
      ],
      correctAnswer: "C",
      hint: "The stated total prices a shipment the hub did not actually move.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~45s):** The hypothetical shift adds $500(0.75 - 0.42) = 165$ dollars, so the real charge was $\\$4{,}320$; solving with the $8{,}400$-kilogram total gives $6{,}000$ and $2{,}400$.\n\n**The Full Solution:**\nStep 1: Moving $500$ kilograms from standard to refrigerated raises the charge by $500(0.75 - 0.42) = 165$ dollars, so the actual charge was $4485 - 165 = 4320$ dollars.\nStep 2: Let $s$ and $r$ be the standard and refrigerated masses: $s + r = 8400$ and $0.42s + 0.75r = 4320$. Substituting $s = 8400 - r$ gives $3528 + 0.33r = 4320$, so $r = 2400$.\nStep 3: Then $s = 8400 - 2400 = 6000$, and $s - r = 3600$. Check: $0.42(6000) + 0.75(2400) = 2520 + 1800 = 4320$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2{,}400$): reporting the refrigerated mass alone; the question asks for the excess of standard over refrigerated.\n* Choice B ($2{,}600$): using $\\$4{,}485$ as the actual charge, which yields $r = 2{,}900$ and $s = 5{,}500$ and a difference of $2{,}600$.\n* Choice D ($6{,}000$): reporting the standard mass alone rather than the difference.\n\n**Test Day Takeaway:** When a stem prices a hypothetical rearrangement, convert it back to the real total before writing the system.",
      skills: ["system-solution-types", "substitution-method"]
    }
  ],

  // Section: Setting Up Systems
  "Setting Up Systems": [
    {
      id: 1,
      difficulty: "easy",
      question: "A theater sold $240$ tickets for a concert and collected $\\$4{,}500$ from these tickets. The table gives the price of each type of ticket. Which system of equations, where $x$ is the number of balcony tickets sold and $y$ is the number of floor tickets sold, represents this situation?",
      diagram: { type: "dataTable", params: { headers: ["Ticket type", "Price (dollars)"], rows: [["Balcony", "15"], ["Floor", "24"]] } },
      choices: [
        { id: "A", text: "$x + y = 240$ and $15x + 24y = 4500$" },
        // distractor: assigns the dollar total to the count equation and the ticket total to the revenue equation, swapping the two constants.
        { id: "B", text: "$x + y = 4500$ and $15x + 24y = 240$" },
        // distractor: attaches each price to the wrong variable, charging $\$24$ for balcony tickets and $\$15$ for floor tickets.
        { id: "C", text: "$x + y = 240$ and $24x + 15y = 4500$" },
        // distractor: adds the two prices and applies the sum to every ticket, which would be correct only if each buyer bought one of each type.
        { id: "D", text: "$x + y = 240$ and $39(x + y) = 4500$" }
      ],
      correctAnswer: "A",
      hint: "One equation should count tickets and the other should total dollars.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** Tickets give $x + y = 240$; dollars give $15x + 24y = 4500$, since each balcony ticket brings $\\$15$ and each floor ticket $\\$24$.\n\n**The Full Solution:**\nStep 1: The number of tickets sold is $x + y$, and that total is $240$, so $x + y = 240$.\nStep 2: Balcony tickets bring in $15x$ dollars and floor tickets bring in $24y$ dollars.\nStep 3: The revenue equation is therefore $15x + 24y = 4500$. Check: $x = 140$ and $y = 100$ satisfy both equations, since $140 + 100 = 240$ and $15(140) + 24(100) = 2100 + 2400 = 4500$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: assigns the dollar total to the count equation and the ticket total to the revenue equation, swapping the two constants.\n* Choice C: attaches each price to the wrong variable, charging $\\$24$ for balcony tickets and $\\$15$ for floor tickets.\n* Choice D: adds the two prices and applies the sum to every ticket, which would be correct only if each buyer bought one of each type.\n\n**Test Day Takeaway:** Build one equation per quantity being totaled: a count equation and a money equation. Keep each price attached to its own variable.",
      skills: ["setting-up-systems", "word-problem-to-equation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A shipping center packs items into small cartons that each hold $4$ items and large cartons that each hold $9$ items. The center filled $32$ cartons completely and packed $218$ items in all. Which system of equations, where $s$ is the number of small cartons and $l$ is the number of large cartons, represents this situation?",
      choices: [
        // distractor: swaps the two totals, using $218$ as the number of cartons and $32$ as the number of items.
        { id: "A", text: "$s + l = 218$ and $4s + 9l = 32$" },
        { id: "B", text: "$s + l = 32$ and $4s + 9l = 218$" },
        // distractor: attaches each capacity to the wrong carton size.
        { id: "C", text: "$s + l = 32$ and $9s + 4l = 218$" },
        // distractor: adds the two capacities and applies the sum to every carton, which assumes each carton holds $13$ items.
        { id: "D", text: "$s + l = 32$ and $13(s + l) = 218$" }
      ],
      correctAnswer: "B",
      hint: "Decide which total counts containers and which total counts contents.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** Cartons give $s + l = 32$; items give $4s + 9l = 218$.\n\n**The Full Solution:**\nStep 1: The center filled $32$ cartons altogether, so $s + l = 32$.\nStep 2: The small cartons hold $4s$ items and the large cartons hold $9l$ items.\nStep 3: Since $218$ items were packed, $4s + 9l = 218$. Check: $s = 14$ and $l = 18$ satisfy both, since $14 + 18 = 32$ and $4(14) + 9(18) = 56 + 162 = 218$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: swaps the two totals, using $218$ as the number of cartons and $32$ as the number of items.\n* Choice C: attaches each capacity to the wrong carton size.\n* Choice D: adds the two capacities and applies the sum to every carton, which assumes each carton holds $13$ items.\n\n**Test Day Takeaway:** In a two-container word problem, one equation counts the containers and the other counts what is inside them. Match each capacity to its own variable.",
      skills: ["setting-up-systems", "word-problem-to-equation"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "At a botanical garden, the number of orchids is $14$ more than $3$ times the number of ferns, and there are $178$ orchids and ferns altogether. Which system of equations, where $f$ is the number of ferns and $r$ is the number of orchids, represents this situation?",
      choices: [
        { id: "A", text: "$r = 3f + 14$ and $r + f = 178$" },
        // distractor: reverses the comparison, making the ferns $14$ more than $3$ times the orchids.
        { id: "B", text: "$f = 3r + 14$ and $r + f = 178$" },
        // distractor: multiplies after adding, $3(f + 14)$, which triples the $14$ as well.
        { id: "C", text: "$r = 3(f + 14)$ and $r + f = 178$" },
        // distractor: subtracts $14$ instead of adding it, making the orchids fewer than $3$ times the ferns.
        { id: "D", text: "$r = 3f - 14$ and $r + f = 178$" }
      ],
      correctAnswer: "A",
      hint: "Translate \"more than\" one phrase at a time, and check which quantity is being multiplied.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** \"Orchids is $14$ more than $3$ times ferns\" is $r = 3f + 14$, and the total gives $r + f = 178$.\n\n**The Full Solution:**\nStep 1: The phrase \"$3$ times the number of ferns\" is $3f$, and \"$14$ more than\" that quantity adds $14$, giving $r = 3f + 14$.\nStep 2: The two kinds of plants together number $178$, so $r + f = 178$.\nStep 3: These two equations form the system. Check: $f = 41$ and $r = 137$ satisfy both, since $3(41) + 14 = 137$ and $137 + 41 = 178$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: reverses the comparison, making the ferns $14$ more than $3$ times the orchids.\n* Choice C: multiplies after adding, $3(f + 14)$, which triples the $14$ as well.\n* Choice D: subtracts $14$ instead of adding it, making the orchids fewer than $3$ times the ferns.\n\n**Test Day Takeaway:** Translate a comparison left to right, and keep the added constant outside the multiplication unless the sentence groups it inside.",
      skills: ["setting-up-systems", "word-problem-to-equation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A cyclist rides $66$ kilometers with the wind in $2$ hours and $42$ kilometers against the wind in $2$ hours. Let $c$ be the cyclist’s speed in still air and let $w$ be the speed of the wind, both in kilometers per hour. Which system of equations represents this situation?",
      choices: [
        { id: "A", text: "$2(c + w) = 66$ and $2(c - w) = 42$" },
        // distractor: assigns the longer distance to the trip against the wind, which would make the wind slow the cyclist down over the greater distance.
        { id: "B", text: "$2(c + w) = 42$ and $2(c - w) = 66$" },
        // distractor: omits the $2$ hours, equating a speed with a distance.
        { id: "C", text: "$c + w = 66$ and $c - w = 42$" },
        // distractor: multiplies only the cyclist’s speed by the time, leaving the wind term untimed.
        { id: "D", text: "$2c + w = 66$ and $2c - w = 42$" }
      ],
      correctAnswer: "A",
      hint: "Wind adds to the cyclist’s speed one way and subtracts from it the other way; distance is speed times time.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** With the wind the speed is $c + w$ and with $2$ hours of riding the distance is $2(c + w) = 66$; against the wind it is $2(c - w) = 42$.\n\n**The Full Solution:**\nStep 1: Riding with the wind, the cyclist’s effective speed is $c + w$; riding against it, the effective speed is $c - w$.\nStep 2: Distance equals speed times time, and each ride lasts $2$ hours, so the distances are $2(c + w)$ and $2(c - w)$.\nStep 3: Setting those equal to the given distances yields $2(c + w) = 66$ and $2(c - w) = 42$. Check: $c = 27$ and $w = 6$ give $2(33) = 66$ and $2(21) = 42$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: assigns the longer distance to the trip against the wind, which would make the wind slow the cyclist down over the greater distance.\n* Choice C: omits the $2$ hours, equating a speed with a distance.\n* Choice D: multiplies only the cyclist’s speed by the time, leaving the wind term untimed.\n\n**Test Day Takeaway:** For with-and-against problems, write the two combined speeds first, then multiply each by its own time before setting it equal to a distance.",
      skills: ["setting-up-systems", "word-problem-to-equation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A chemist will combine two saline solutions to obtain $40$ liters of a mixture that is $24$ percent salt by volume. The table gives the concentration of each solution. Which system of equations, where $x$ and $y$ are the numbers of liters of solution A and solution B used, represents this situation?",
      diagram: { type: "dataTable", params: { headers: ["Solution", "Concentration (percent salt by volume)"], rows: [["A", "15"], ["B", "30"]] } },
      choices: [
        { id: "A", text: "$x + y = 40$ and $0.15x + 0.30y = 9.6$" },
        // distractor: sets the salt equation equal to the percent, $24$, instead of the $9.6$ liters of salt that percent represents.
        { id: "B", text: "$x + y = 40$ and $0.15x + 0.30y = 24$" },
        // distractor: writes the concentrations as whole percents on the left while keeping liters on the right, mixing two different units.
        { id: "C", text: "$x + y = 40$ and $15x + 30y = 9.6$" },
        // distractor: swaps the two totals, using the liters of salt as the total volume and the total volume as the amount of salt.
        { id: "D", text: "$x + y = 9.6$ and $0.15x + 0.30y = 40$" }
      ],
      correctAnswer: "A",
      hint: "One equation tracks liters of liquid; the other tracks liters of salt.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~50s):** Volume gives $x + y = 40$. The mixture holds $0.24(40) = 9.6$ liters of salt, so $0.15x + 0.30y = 9.6$.\n\n**The Full Solution:**\nStep 1: The two solutions together make $40$ liters, so $x + y = 40$.\nStep 2: Solution A contributes $0.15x$ liters of salt and solution B contributes $0.30y$ liters of salt.\nStep 3: The mixture is $24$ percent salt, so it contains $0.24(40) = 9.6$ liters of salt, giving $0.15x + 0.30y = 9.6$. Check: $x = 16$ and $y = 24$ satisfy both, since $16 + 24 = 40$ and $0.15(16) + 0.30(24) = 2.4 + 7.2 = 9.6$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: sets the salt equation equal to the percent, $24$, instead of the $9.6$ liters of salt that percent represents.\n* Choice C: writes the concentrations as whole percents on the left while keeping liters on the right, mixing two different units.\n* Choice D: swaps the two totals, using the liters of salt as the total volume and the total volume as the amount of salt.\n\n**Test Day Takeaway:** In a mixture problem the second equation must balance the same substance on both sides. Convert the target percent into an actual amount before writing it.",
      skills: ["setting-up-systems", "word-problem-to-equation"]
    }
  ],

  // Section: Substitution Method
  "Substitution Method": [
    {
      id: 1,
      difficulty: "easy",
      question: "A campus observatory schedules $x$ hours of visual observing and $y$ hours of spectroscopy each week, where $y = 24 - 3x$ and $5x + 2y = 44$. Substituting the first equation into the second gives which equation in $x$ alone?",
      choices: [
        // distractor: drops the 5x term while distributing
        { id: "A", text: "$-6x + 48 = 44$" },
        // distractor: multiplies only the -3x by 2 and leaves the 24 unchanged
        { id: "B", text: "$-x + 24 = 44$" },
        { id: "C", text: "$-x + 48 = 44$" },
        // distractor: adds 6x instead of subtracting it
        { id: "D", text: "$11x + 48 = 44$" }
      ],
      correctAnswer: "C",
      hint: "Every term inside the parentheses meets the $2$, and the $5x$ outside them does not go away.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** Replacing $y$ with $24 - 3x$ gives $5x + 48 - 6x$, which collapses to $-x + 48$.\n\n**The Full Solution:**\nStep 1: Substitute $24 - 3x$ for $y$ in the second equation: $5x + 2(24 - 3x) = 44$.\nStep 2: Distribute the $2$ across both terms: $5x + 48 - 6x = 44$.\nStep 3: Combine the $x$-terms: $-x + 48 = 44$. Check: this gives $x = 4$, so $y = 24 - 12 = 12$, and $5(4) + 2(12) = 44$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-6x + 48 = 44$): dropping the $5x$ that was already in the equation before the substitution.\n* Choice B ($-x + 24 = 44$): multiplying only the $-3x$ by $2$ and leaving the $24$ unscaled.\n* Choice D ($11x + 48 = 44$): adding $6x$ instead of subtracting it, which ignores the minus sign inside the parentheses.\n\n**Test Day Takeaway:** Substitute the whole expression in parentheses, then distribute to every term inside before combining.",
      skills: ["substitution-method"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "Over one season a field team counted $h$ hawks and $e$ eagles, where $h = 4e - 30$ and $h + e = 280$. What is the value of $e$?",
      choices: [
        // distractor: flips the sign of the $30$, substituting $4e + 30$ and solving $5e + 30 = 280$.
        { id: "A", text: "$50$" },
        // distractor: drops the $-30$ when substituting, solving $4e + e = 280$.
        { id: "B", text: "$56$" },
        { id: "C", text: "$62$" },
        // distractor: solves the system correctly but reports $h$, the number of hawks.
        { id: "D", text: "$218$" }
      ],
      correctAnswer: "C",
      hint: "Replace $h$ in the total with the expression the first equation gives for it.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Substituting $4e - 30$ for $h$ gives $(4e - 30) + e = 280$, so $5e = 310$ and $e = 62$.\n\n**The Full Solution:**\nStep 1: The first equation gives $h$ in terms of $e$, so replace $h$ in the second equation: $(4e - 30) + e = 280$.\nStep 2: Combine like terms: $5e - 30 = 280$, so $5e = 310$.\nStep 3: Divide by $5$ to get $e = 62$ eagles. Check: $h = 4(62) - 30 = 218$, and $218 + 62 = 280$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($50$): flips the sign of the $30$, substituting $4e + 30$ and solving $5e + 30 = 280$.\n* Choice B ($56$): drops the $-30$ when substituting, solving $4e + e = 280$.\n* Choice D ($218$): solves the system correctly but reports $h$, the number of hawks.\n\n**Test Day Takeaway:** Substitute the whole expression, sign and constant included, then reread which of the two quantities the question named.",
      skills: ["substitution-method"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A stone mill blends $x$ kilograms of rye flour with $y$ kilograms of barley flour in each batch, where $y = 3x - 3$. The ingredient cost of a batch, in dollars, is given by $4x + cy = 42$, where $c$ is a constant. If a batch uses $3$ kilograms of rye flour, what is the value of $c$?",
      choices: [
        { id: "A", text: "$5$" },
        // distractor: divides 42 by the 6 kilograms of barley without removing the 12 dollars of rye
        { id: "B", text: "$7$" },
        // distractor: adds the rye cost instead of subtracting it: (42 + 12)/6 = 9
        { id: "C", text: "$9$" },
        // distractor: divides by the rye mass 3 instead of the barley mass 6: (42 - 12)/3 = 10
        { id: "D", text: "$10$" }
      ],
      correctAnswer: "A",
      hint: "One rule fixes both masses in the batch before any cost is computed.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** A $3$-kilogram rye batch carries $y = 3(3) - 3 = 6$ kilograms of barley, so $12 + 6c = 42$ and $c = 5$.\n\n**The Full Solution:**\nStep 1: Find the barley mass: $y = 3(3) - 3 = 6$ kilograms.\nStep 2: Substitute $x = 3$ and $y = 6$ into the cost equation: $4(3) + c(6) = 42$, or $12 + 6c = 42$.\nStep 3: Subtract $12$ and divide by $6$: $6c = 30$, so $c = 5$. Check: $4(3) + 5(6) = 12 + 30 = 42$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($7$): dividing $42$ by the $6$ kilograms of barley without first removing the $\\$12$ spent on rye.\n* Choice C ($9$): adding the rye cost instead of subtracting it, computing $\\frac{42 + 12}{6}$.\n* Choice D ($10$): dividing by the rye mass rather than the barley mass, computing $\\frac{42 - 12}{3}$.\n\n**Test Day Takeaway:** Reduce to one unknown before touching the constant: compute the second quantity, then solve the linear equation that remains.",
      skills: ["substitution-method"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A harbor ferry made $x$ weekday crossings and $y$ weekend crossings last month. Its logs give $y = 4x + 6$ and $3x + y = 48$. If the ferry made $30$ weekend crossings, how many weekday crossings did it make?",
      choices: [
        { id: "A", text: "$6$" },
        // distractor: solves 30 = 4x + 6 as 4x = 36, adding 6 instead of subtracting
        { id: "B", text: "$9$" },
        // distractor: divides 48 by 3 without removing the 30 weekend crossings
        { id: "C", text: "$16$" },
        // distractor: subtracts 30 from 48 but never divides by 3
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "A",
      hint: "Not every equation the logs give is needed.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** Putting $y = 30$ into $3x + y = 48$ leaves $3x = 18$, so $x = 6$.\n\n**The Full Solution:**\nStep 1: Substitute the known weekend count into the equation that still contains both variables: $3x + 30 = 48$.\nStep 2: Subtract $30$ from both sides: $3x = 18$, so $x = 6$.\nStep 3: Confirm with the other log: $4(6) + 6 = 30$ weekend crossings ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($9$): solving $30 = 4x + 6$ as $4x = 36$, adding the $6$ instead of subtracting it.\n* Choice C ($16$): dividing $48$ by $3$ without first removing the $30$ weekend crossings.\n* Choice D ($18$): stopping at $3x = 18$ and reporting $18$ instead of dividing by $3$.\n\n**Test Day Takeaway:** When one value is handed to you, substitute it into whichever equation is left with a single unknown.",
      skills: ["substitution-method"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "For the system of equations $2x - y = 7$ and $6x + ky = 5$, where $k$ is a constant, there is exactly one solution for every value of $k$ except one. What is that value of $k$?",
      choices: [
        // distractor: inverts the slope comparison, setting $-\frac{k}{6} = 2$.
        { id: "A", text: "$-12$" },
        { id: "B", text: "$-3$" },
        // distractor: drops the negative sign when reading the slope of $6x + ky = 5$, setting $\frac{6}{k} = 2$.
        { id: "C", text: "$3$" },
        // distractor: both inverts the ratio and drops the sign, setting $\frac{k}{6} = 2$.
        { id: "D", text: "$12$" }
      ],
      correctAnswer: "B",
      hint: "The exceptional value is the one that makes substitution eliminate $x$ as well as $y$.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~55s):** Substituting $y = 2x - 7$ into the second equation gives $(6 + 2k)x = 5 + 7k$. The $x$ term vanishes when $6 + 2k = 0$, so $k = -3$.\n\n**The Full Solution:**\nStep 1: Solve the first equation for $y$: $y = 2x - 7$.\nStep 2: Substitute into the second equation: $6x + k(2x - 7) = 5$, which becomes $(6 + 2k)x = 5 + 7k$.\nStep 3: This has exactly one solution for $x$ whenever $6 + 2k \\ne 0$. The single exception is $6 + 2k = 0$, so $k = -3$. Check: with $k = -3$ the second equation is $6x - 3y = 5$, or $2x - y = \\frac{5}{3}$, which is parallel to and distinct from $2x - y = 7$, so the system has no solution. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-12$): inverts the slope comparison, setting $-\\frac{k}{6} = 2$.\n* Choice C ($3$): drops the negative sign when reading the slope of $6x + ky = 5$, setting $\\frac{6}{k} = 2$.\n* Choice D ($12$): both inverts the ratio and drops the sign, setting $\\frac{k}{6} = 2$.\n\n**Test Day Takeaway:** Carry the parameter through the substitution and watch the coefficient of the surviving variable. When it hits zero, the system stops having exactly one solution.",
      skills: ["substitution-method"]
    }
  ],

  // Section: Elimination Method
  "Elimination Method": [
    {
      id: 1,
      difficulty: "easy",
      question: "Adding the two equations $x + 3y = 19$ and $x - 3y = 1$ eliminates $y$. What is the value of $x$ in the solution to this system?",
      choices: [
        // distractor: finishes the system but reports $y$ instead of $x$.
        { id: "A", text: "$3$" },
        // distractor: subtracts the equations to get $6y = 18$ and then divides by $2$ instead of $6$.
        { id: "B", text: "$9$" },
        { id: "C", text: "$10$" },
        // distractor: adds correctly to $2x = 20$ but stops before dividing by $2$.
        { id: "D", text: "$20$" }
      ],
      correctAnswer: "C",
      hint: "Add the two left sides and the two right sides, then finish solving for the surviving variable.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** Adding gives $2x = 20$, so $x = 10$.\n\n**The Full Solution:**\nStep 1: The $y$-terms are $3y$ and $-3y$, which are opposites, so adding the equations removes $y$.\nStep 2: Adding left sides and right sides gives $2x = 20$.\nStep 3: Divide by $2$ to get $x = 10$. Check: $10 + 3y = 19$ gives $y = 3$, and $10 - 3(3) = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): finishes the system but reports $y$ instead of $x$.\n* Choice B ($9$): subtracts the equations to get $6y = 18$ and then divides by $2$ instead of $6$.\n* Choice D ($20$): adds correctly to $2x = 20$ but stops before dividing by $2$.\n\n**Test Day Takeaway:** Elimination gives you an equation, not an answer. Divide out the leading coefficient, then check which variable was requested.",
      skills: ["elimination-method"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A distribution dock logs $x$ standard pallets and $y$ oversized pallets per shipment, where $x + y = 40$ counts the pallets and $2x + 3y = 96$ gives the weight in hundreds of kilograms. Which equation results from multiplying the first equation by $2$ and subtracting that result from the second?",
      choices: [
        // distractor: subtracts in the reverse order, 80 - 96, giving -16
        { id: "A", text: "$y = -16$" },
        { id: "B", text: "$y = 16$" },
        // distractor: adds the y-terms (3y + 2y) while subtracting the constants
        { id: "C", text: "$5y = 16$" },
        // distractor: adds the right-hand sides, 96 + 80, instead of subtracting
        { id: "D", text: "$y = 176$" }
      ],
      correctAnswer: "B",
      hint: "Every term of the first equation is affected, the constant included.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** Doubling $x + y = 40$ gives $2x + 2y = 80$; the $x$-terms now match, so subtracting leaves $y = 16$.\n\n**The Full Solution:**\nStep 1: Multiply every term of $x + y = 40$ by $2$, which gives $2x + 2y = 80$.\nStep 2: Subtract that equation from $2x + 3y = 96$ term by term: $(2x - 2x) + (3y - 2y) = 96 - 80$.\nStep 3: The $x$-terms cancel and the $y$-terms leave $y = 16$. Check: $y = 16$ forces $x = 24$, and $2(24) + 3(16) = 48 + 48 = 96$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($y = -16$): subtracting in the reverse order, $80 - 96$, flips the sign of the constant.\n* Choice C ($5y = 16$): adding the $y$-terms while subtracting the constants; the operation must be the same on every term.\n* Choice D ($y = 176$): adding the right-hand sides, $96 + 80$, when the instruction was to subtract.\n\n**Test Day Takeaway:** Scale first so one variable's coefficients match, then apply the same operation to every term on both sides.",
      skills: ["elimination-method"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A student plans to eliminate $x$ from the system of equations $4x + 5y = 23$ and $6x - 7y = 1$ by multiplying the first equation by $3$, multiplying the second equation by a constant $c$, and then subtracting. What is the value of $c$?",
      choices: [
        // distractor: inverts the comparison, using $\frac{4}{6}$ instead of matching the scaled coefficient $12$.
        { id: "A", text: "$\\frac{2}{3}$" },
        // distractor: uses $\frac{6}{4}$, the factor that would match the coefficients without the multiplication by $3$.
        { id: "B", text: "$\\frac{3}{2}$" },
        { id: "C", text: "$2$" },
        // distractor: copies the $x$-coefficient of the first equation instead of solving $6c = 12$.
        { id: "D", text: "$4$" }
      ],
      correctAnswer: "C",
      hint: "The two $x$-terms must end up identical before the subtraction can remove them.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** Multiplying the first equation by $3$ makes the $x$-term $12x$, so $6c = 12$ and $c = 2$.\n\n**The Full Solution:**\nStep 1: Multiplying $4x + 5y = 23$ by $3$ gives $12x + 15y = 69$, so the first $x$-term becomes $12x$.\nStep 2: Multiplying $6x - 7y = 1$ by $c$ gives $6cx - 7cy = c$, so the second $x$-term is $6cx$.\nStep 3: Subtraction removes $x$ only when $6c = 12$, so $c = 2$. Check: the second equation becomes $12x - 14y = 2$, and subtracting it from $12x + 15y = 69$ gives $29y = 67$, an equation in $y$ alone. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{2}{3}$): inverts the comparison, using $\\frac{4}{6}$ instead of matching the scaled coefficient $12$.\n* Choice B ($\\frac{3}{2}$): uses $\\frac{6}{4}$, the factor that would match the coefficients without the multiplication by $3$.\n* Choice D ($4$): copies the $x$-coefficient of the first equation instead of solving $6c = 12$.\n\n**Test Day Takeaway:** Scale each equation until the targeted coefficients match exactly, then decide whether to add or subtract based on their signs.",
      skills: ["elimination-method"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A conservation group sold $150$ seedlings at a plant sale and collected $\\$630$ in all. The table gives the price of each type of seedling. How many tree seedlings did the group sell?",
      diagram: { type: "dataTable", params: { headers: ["Seedling type", "Price (dollars)"], rows: [["Shrub", "3"], ["Tree", "5"]] } },
      choices: [
        // distractor: solves the system but reports $s$, the number of shrub seedlings.
        { id: "A", text: "$60$" },
        // distractor: assumes the two types sold in equal numbers, $\frac{150}{2}$, which the money total does not support.
        { id: "B", text: "$75$" },
        { id: "C", text: "$90$" },
        // distractor: divides the total by the price of a tree seedling, $\frac{630}{5}$, as if every seedling sold were a tree.
        { id: "D", text: "$126$" }
      ],
      correctAnswer: "C",
      hint: "Write one equation for the number of seedlings and one for the money, then scale the first to match a coefficient in the second.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** With $s + t = 150$ and $3s + 5t = 630$, tripling the first and subtracting gives $2t = 180$, so $t = 90$.\n\n**The Full Solution:**\nStep 1: Let $s$ be the number of shrub seedlings and $t$ the number of tree seedlings. Then $s + t = 150$ and $3s + 5t = 630$.\nStep 2: Multiply the first equation by $3$ to get $3s + 3t = 450$, matching the $3s$ term.\nStep 3: Subtract from the money equation: $(3s + 5t) - (3s + 3t) = 630 - 450$, so $2t = 180$ and $t = 90$. Check: $s = 60$, and $3(60) + 5(90) = 180 + 450 = 630$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($60$): solves the system but reports $s$, the number of shrub seedlings.\n* Choice B ($75$): assumes the two types sold in equal numbers, $\\frac{150}{2}$, which the money total does not support.\n* Choice D ($126$): divides the total by the price of a tree seedling, $\\frac{630}{5}$, as if every seedling sold were a tree.\n\n**Test Day Takeaway:** Scale the count equation by one of the prices so a variable cancels. Then label your answer with the variable the question named.",
      skills: ["elimination-method"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In a system of two linear equations, the first equation is $3x + 5y = 22$ and the second equation is $5x + 3y = 26$. The solution to this system is the ordered pair $(x, y)$. What is the value of $x + y$?",
      choices: [
        // distractor: reports the value of $y$ instead of the requested sum $x + y$.
        { id: "A", text: "$2$" },
        // distractor: reports the value of $x$ instead of the requested sum $x + y$.
        { id: "B", text: "$4$" },
        { id: "C", text: "$6$" },
        // distractor: adds the two equations correctly but stops at $8x + 8y = 48$ without dividing by $8$.
        { id: "D", text: "$48$" }
      ],
      correctAnswer: "C",
      hint: "The question asks only for $x + y$, so you may not need $x$ and $y$ separately.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~50s):** Adding the two equations gives $8x + 8y = 48$, so $x + y = \\frac{48}{8} = 6$.\n\n**The Full Solution:**\nStep 1: The coefficients of $x$ and $y$ are swapped between the equations, so neither variable cancels on its own. Add the equations instead: $(3x + 5y) + (5x + 3y) = 22 + 26$.\nStep 2: The left side collects to $8x + 8y$ and the right side is $48$, so $8(x + y) = 48$.\nStep 3: Divide both sides by $8$ to get $x + y = 6$. Check: subtracting the equations gives $-2x + 2y = -4$, so $y = x - 2$; with $x + y = 6$ that gives $x = 4$ and $y = 2$, and $3(4) + 5(2) = 22$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): reports the value of $y$ instead of the requested sum $x + y$.\n* Choice B ($4$): reports the value of $x$ instead of the requested sum $x + y$.\n* Choice D ($48$): adds the two equations correctly but stops at $8x + 8y = 48$ without dividing by $8$.\n\n**Test Day Takeaway:** When a system asks for $x + y$ rather than for one variable, add the equations before solving. Swapped coefficients often collapse into a multiple of $x + y$ in a single step.",
      skills: ["elimination-method"]
    }
  ],

  // Section: DESMOS Method
  "DESMOS Method": [
    {
      id: 1,
      difficulty: "easy",
      question: "Two lines are graphed in the $xy$-plane, as shown. The lines are the graphs of the two equations in a system of linear equations. What is the $x$-coordinate of the solution to that system?",
      diagram: { type: "twoLineGraph", params: { intersection: { x: -3, y: 1 }, slope1: 2, slope2: -1, xRange: [-6, 6], yRange: [-6, 8], showIntersection: false } },
      choices: [
        { id: "A", text: "$-3$" },
        // distractor: reads the $x$-intercept of the line with negative slope instead of the intersection point.
        { id: "B", text: "$-2$" },
        // distractor: reports the $y$-coordinate of the intersection point.
        { id: "C", text: "$1$" },
        // distractor: reads the $y$-intercept of the steeper line.
        { id: "D", text: "$7$" }
      ],
      correctAnswer: "A",
      hint: "Find the point where the two lines cross, then read only the horizontal coordinate.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** The lines cross at $(-3, 1)$, so the $x$-coordinate of the solution is $-3$.\n\n**The Full Solution:**\nStep 1: A point is a solution to the system exactly when it lies on both lines, which happens only at the intersection.\nStep 2: The lines cross three units left of the vertical axis and one unit above the horizontal axis, at $(-3, 1)$.\nStep 3: The $x$-coordinate of that point is $-3$. Check: the lines shown are $y = 2x + 7$ and $y = -x - 2$, and $2(-3) + 7 = 1$ while $-(-3) - 2 = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($-2$): reads the $x$-intercept of the line with negative slope instead of the intersection point.\n* Choice C ($1$): reports the $y$-coordinate of the intersection point.\n* Choice D ($7$): reads the $y$-intercept of the steeper line.\n\n**Test Day Takeaway:** Locate the crossing point first, then read the coordinate the question names. Intercepts belong to one line only, so they are never solutions to the system.",
      skills: ["graphing-systems", "system-solution-types"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A graphing tool displays the line $2x + 3y = 6$ and the line $y = -\\frac{2}{3}x + 5$ in the same viewing window. How many points do these two lines have in common?",
      choices: [
        { id: "A", text: "Zero" },
        // distractor: assumes any two distinct lines must cross, but lines with equal slopes never do.
        { id: "B", text: "Exactly one" },
        // distractor: two distinct lines can share at most one point, so exactly two is impossible.
        { id: "C", text: "Exactly two" },
        // distractor: this happens only when the two equations describe the same line, which would require equal $y$-intercepts as well as equal slopes.
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "A",
      hint: "Rewrite the first equation in slope-intercept form before comparing the two lines.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** Both lines have slope $-\\frac{2}{3}$ but $y$-intercepts $2$ and $5$, so they are parallel and never meet.\n\n**The Full Solution:**\nStep 1: Solve $2x + 3y = 6$ for $y$: $3y = -2x + 6$, so $y = -\\frac{2}{3}x + 2$.\nStep 2: The second line is $y = -\\frac{2}{3}x + 5$. The slopes are equal, $-\\frac{2}{3}$, but the $y$-intercepts $2$ and $5$ are different.\nStep 3: Parallel and distinct lines never intersect, so the two lines share zero points. Check: setting the right sides equal gives $2 = 5$, which is never true. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: assumes any two distinct lines must cross, but lines with equal slopes never do.\n* Choice C: two distinct lines can share at most one point, so exactly two is impossible.\n* Choice D: this happens only when the two equations describe the same line, which would require equal $y$-intercepts as well as equal slopes.\n\n**Test Day Takeaway:** Convert to slope-intercept form before judging a graph. Equal slopes with different intercepts always means no points in common.",
      skills: ["graphing-systems", "system-solution-types", "parallel-line-slope"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The figure shows two lines drawn in the $xy$-plane. If the ordered pair $(x, y)$ lies on both lines, what is the value of $x + y$?",
      diagram: { type: "twoLineGraph", params: { intersection: { x: 4, y: -2 }, slope1: -1, slope2: 0.5, xRange: [-6, 6], yRange: [-6, 6], showIntersection: false } },
      choices: [
        // distractor: reports the $y$-coordinate alone instead of the sum.
        { id: "A", text: "$-2$" },
        { id: "B", text: "$2$" },
        // distractor: reports the $x$-coordinate alone instead of the sum.
        { id: "C", text: "$4$" },
        // distractor: computes $x - y$ instead of $x + y$, dropping the negative sign on $y$.
        { id: "D", text: "$6$" }
      ],
      correctAnswer: "B",
      hint: "Read both coordinates of the crossing point before combining them.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The lines cross at $(4, -2)$, so $x + y = 4 + (-2) = 2$.\n\n**The Full Solution:**\nStep 1: A point lying on both lines must be their point of intersection.\nStep 2: The lines cross four units right of the vertical axis and two units below the horizontal axis, so $x = 4$ and $y = -2$.\nStep 3: Therefore $x + y = 4 + (-2) = 2$. Check: the lines shown are $y = -x + 2$ and $y = \\frac{1}{2}x - 4$, and both give $y = -2$ when $x = 4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-2$): reports the $y$-coordinate alone instead of the sum.\n* Choice C ($4$): reports the $x$-coordinate alone instead of the sum.\n* Choice D ($6$): computes $x - y$ instead of $x + y$, dropping the negative sign on $y$.\n\n**Test Day Takeaway:** Read a graphed solution as a full ordered pair, then perform the arithmetic the question asks for. Watch signs below the horizontal axis.",
      skills: ["graphing-systems", "system-solution-types", "infinite-solutions-condition"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A water utility offers two billing plans. Plan A charges a $\\$20$ monthly fee plus $\\$3.50$ for each hundred cubic feet of water used, and Plan B charges a $\\$48$ monthly fee plus $\\$1.75$ for each hundred cubic feet used. For how many hundred cubic feet of water used do the two plans cost the same amount?",
      choices: [
        // distractor: divides the fee gap by Plan A rate alone: 28 / 3.50 = 8, ignoring that Plan B also charges per unit
        { id: "A", text: "$8$" },
        { id: "B", text: "$16$" },
        // distractor: reports the difference in monthly fees, 48 - 20 = 28, as though it were a usage amount
        { id: "C", text: "$28$" },
        // distractor: reports the sum of the two monthly fees, 48 + 20 = 68
        { id: "D", text: "$68$" }
      ],
      correctAnswer: "B",
      hint: "Graph the two cost equations and look for the crossing point.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** Setting $20 + 3.50u = 48 + 1.75u$ gives $1.75u = 28$, so $u = 16$ hundred cubic feet.\n\n**The Full Solution:**\nStep 1: Write one equation per plan. With $u$ hundred cubic feet used, Plan A costs $20 + 3.50u$ dollars and Plan B costs $48 + 1.75u$ dollars.\nStep 2: Graph both lines and find where they cross. Algebraically, the crossing is where $20 + 3.50u = 48 + 1.75u$, so $1.75u = 28$ and $u = 16$.\nStep 3: Check both plans at $u = 16$. Plan A: $20 + 3.50(16) = 20 + 56 = 76$ dollars. Plan B: $48 + 1.75(16) = 48 + 28 = 76$ dollars. The lines meet at $(16, 76)$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): divides the $28$-dollar fee gap by Plan A rate alone. Plan B charges per unit too, so the rate DIFFERENCE closes the gap.\n* Choice C ($28$): is the difference in monthly fees, in dollars, not an amount of water.\n* Choice D ($68$): adds the two monthly fees, which no crossing point uses.\n\n**Test Day Takeaway:** Two cost plans meet where the fee gap is closed by the rate difference: divide the difference in fixed fees by the difference in rates.",
      skills: ["graphing-systems"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In the $xy$-plane, line $\\ell$ passes through the points $(-2, -9)$ and $(4, 3)$, and line $m$ is the graph of $3x + y = 25$. The two lines intersect at the point $(a, b)$. What is the value of $a + b$?",
      choices: [
        // distractor: reports $a$ alone instead of the requested sum.
        { id: "A", text: "$6$" },
        // distractor: reports $b$ alone instead of the requested sum.
        { id: "B", text: "$7$" },
        { id: "C", text: "$13$" },
        // distractor: multiplies the two coordinates instead of adding them.
        { id: "D", text: "$42$" }
      ],
      correctAnswer: "C",
      hint: "You need an equation for line $\\ell$ before the two lines can be compared.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~55s):** Line $\\ell$ has slope $2$ and equation $y = 2x - 5$. Solving with $3x + y = 25$ gives $(6, 7)$, so $a + b = 13$.\n\n**The Full Solution:**\nStep 1: The slope of line $\\ell$ is $\\frac{3 - (-9)}{4 - (-2)} = \\frac{12}{6} = 2$, and using the point $(4, 3)$ gives $y = 2x - 5$.\nStep 2: Substitute into $3x + y = 25$: $3x + (2x - 5) = 25$, so $5x = 30$ and $x = 6$.\nStep 3: Then $y = 2(6) - 5 = 7$, so $a = 6$, $b = 7$, and $a + b = 13$. Check: $3(6) + 7 = 25$, and $(-2, -9)$ satisfies $y = 2x - 5$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): reports $a$ alone instead of the requested sum.\n* Choice B ($7$): reports $b$ alone instead of the requested sum.\n* Choice D ($42$): multiplies the two coordinates instead of adding them.\n\n**Test Day Takeaway:** When a line is described by two points rather than an equation, build its equation first. Only then can it be paired with the other equation as a system.",
      skills: ["graphing-systems", "system-solution-types", "parallel-line-slope"]
    }
  ],

  // Section: Infinite Solutions
  "Infinite Solutions": [
    {
      id: 1,
      difficulty: "easy",
      question: "In the $xy$-plane, the equation $y = 3x - 5$ is graphed as one line and the equation $9x - 3y = 15$ is graphed as another. Which statement about the two graphs is true?",
      choices: [
        // distractor: notices the equal slopes but stops there; the $y$-intercepts also match, so the lines coincide instead of running parallel.
        { id: "A", text: "They are parallel and distinct." },
        // distractor: assumes two equations always describe two crossing lines, which fails when the equations are multiples of each other.
        { id: "B", text: "They intersect at exactly one point." },
        // distractor: two lines can share at most one point unless they coincide entirely, so exactly two shared points is impossible.
        { id: "C", text: "They intersect at exactly two points." },
        { id: "D", text: "They are the same line." }
      ],
      correctAnswer: "D",
      hint: "Rewrite the second equation in slope-intercept form and compare it with the first.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~20s):** Dividing $9x - 3y = 15$ by $3$ gives $3x - y = 5$, or $y = 3x - 5$, which is the first equation.\n\n**The Full Solution:**\nStep 1: Solve $9x - 3y = 15$ for $y$: $-3y = -9x + 15$, so $y = 3x - 5$.\nStep 2: That is exactly the first equation, so the two equations are equivalent.\nStep 3: Equivalent equations have identical graphs, so the two lines coincide and every point on one lies on the other. Check: the second equation is $3$ times the equation $3x - y = 5$, so no new information is added. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: notices the equal slopes but stops there; the $y$-intercepts also match, so the lines coincide instead of running parallel.\n* Choice B: assumes two equations always describe two crossing lines, which fails when the equations are multiples of each other.\n* Choice C: two lines can share at most one point unless they coincide entirely, so exactly two shared points is impossible.\n\n**Test Day Takeaway:** Before counting intersections, reduce each equation to slope-intercept form. Matching slope and intercept means one line, not two.",
      skills: ["infinite-solutions-condition", "system-solution-types"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A greenhouse dosing unit delivers $x$ liters of concentrate A and $y$ liters of concentrate B per batch, and the two nutrient requirements are $3x + 12y = 45$ and $x + 4y = 15$. How many solutions $(x, y)$ does this system have?",
      choices: [
        // distractor: reads unequal coefficients as parallel distinct lines
        { id: "A", text: "Zero" },
        // distractor: assumes two written equations always cross exactly once
        { id: "B", text: "Exactly one" },
        // distractor: treats two lines as able to meet twice
        { id: "C", text: "Exactly two" },
        { id: "D", text: "Infinitely many" }
      ],
      correctAnswer: "D",
      hint: "Two requirements can describe the same batches without being written the same way.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~10s):** Dividing $3x + 12y = 45$ by $3$ gives $x + 4y = 15$, the second requirement itself, so the two describe one line.\n\n**The Full Solution:**\nStep 1: Divide every term of $3x + 12y = 45$ by $3$: $x + 4y = 15$.\nStep 2: That is exactly the second requirement, so any batch meeting one requirement meets the other.\nStep 3: A line in the $xy$-plane holds infinitely many points, so the system has infinitely many solutions. Check: $(15, 0)$ and $(7, 2)$ each satisfy both equations ✓\n\n**Why the wrong answers are tempting:**\n* Choice A (Zero): reading the different coefficients as two parallel lines; parallel and distinct requires the constants NOT to scale by the same factor, and here $45 = 3 \\cdot 15$ does.\n* Choice B (Exactly one): assuming two written equations always cross once; identical lines never cross at a single point.\n* Choice C (Exactly two): two straight lines meet at most once unless they coincide, in which case they share every point.\n\n**Test Day Takeaway:** Before solving, test whether one equation is a constant multiple of the other — coefficients and constant alike.",
      skills: ["infinite-solutions-condition", "system-solution-types"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A dairy scale's calibration frame carries $x$ steel blocks and $y$ ballast plates. Two loading rules give $6x + ky = 30$ and $9x + 12y = 45$, where $k$ is a constant and each total is a mass in kilograms. For what value of $k$ do the two rules impose exactly the same restriction?",
      choices: [
        // distractor: copies the first rule's x-coefficient, 6, instead of scaling 12
        { id: "A", text: "$6$" },
        { id: "B", text: "$8$" },
        // distractor: copies the second rule's y-coefficient, 12, ignoring the 2/3 scaling
        { id: "C", text: "$12$" },
        // distractor: inverts the ratio and computes 12 times 9/6 = 18
        { id: "D", text: "$18$" }
      ],
      correctAnswer: "B",
      hint: "A restriction can be written more than one way and still allow exactly the same loads.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** Scaling $9x + 12y = 45$ by $\\frac{2}{3}$ turns $9x$ into $6x$ and $45$ into $30$, so $12y$ must become $8y$.\n\n**The Full Solution:**\nStep 1: Two rules restrict the same pairs only when every term of one is the same multiple of the matching term of the other. The $x$-terms give the factor $\\frac{6}{9} = \\frac{2}{3}$.\nStep 2: The constants agree with that factor: $\\frac{30}{45} = \\frac{2}{3}$.\nStep 3: So the $y$-terms must satisfy $\\frac{k}{12} = \\frac{2}{3}$, giving $k = 8$. Check: $\\frac{2}{3}$ of $9x + 12y = 45$ is $6x + 8y = 30$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($6$): copying the first rule's $x$-coefficient instead of scaling the $12$.\n* Choice C ($12$): copying the second rule's $y$-coefficient and ignoring the $\\frac{2}{3}$ scaling.\n* Choice D ($18$): inverting the ratio and computing $12 \\cdot \\frac{9}{6} = 18$, which scales the wrong direction.\n\n**Test Day Takeaway:** One factor must carry every term — both coefficients and the constant — or the two equations are different lines.",
      skills: ["infinite-solutions-condition", "system-solution-types"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A student solves a system of two linear equations by elimination. After combining the equations, both variables drop out and the result is the true statement $0 = 0$. Which statement about the system must be true?",
      choices: [
        // distractor: no solution shows up as a false statement such as $0 = 7$, not as a true one.
        { id: "A", text: "The system has no solution." },
        // distractor: exactly one solution appears when elimination leaves a single variable with a single value, such as $5y = 20$.
        { id: "B", text: "The system has exactly one solution." },
        { id: "C", text: "The system has infinitely many solutions." },
        // distractor: a system of two linear equations can never have exactly two solutions.
        { id: "D", text: "The system has exactly two solutions." }
      ],
      correctAnswer: "C",
      hint: "Ask whether the surviving statement is always true or never true.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** Both variables vanishing into a true statement means the second equation adds nothing new, so every solution of one equation solves the other.\n\n**The Full Solution:**\nStep 1: Elimination combines the two equations. If both variables cancel, the second equation carried no information beyond the first.\nStep 2: The leftover statement $0 = 0$ is true for every $x$ and $y$, so no ordered pair is ruled out by the combination.\nStep 3: The two equations therefore describe the same line, and every point on that line solves the system, giving infinitely many solutions. Check: eliminating between $x + 2y = 5$ and $3x + 6y = 15$ produces $0 = 0$, and those equations are multiples of each other. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: no solution shows up as a false statement such as $0 = 7$, not as a true one.\n* Choice B: exactly one solution appears when elimination leaves a single variable with a single value, such as $5y = 20$.\n* Choice D: a system of two linear equations can never have exactly two solutions.\n\n**Test Day Takeaway:** When elimination erases both variables, read the leftover statement: true means infinitely many solutions, false means none.",
      skills: ["infinite-solutions-condition", "elimination-method"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "Each of the four choices gives a system of two linear equations in $x$ and $y$, where each equation is written in the form $ax + by = c$. Which of these systems has infinitely many solutions?",
      choices: [
        // distractor: doubling the first equation gives $4x - 10y = 18$, not $20$, so those lines are parallel and distinct and the system has no solution.
        { id: "A", text: "$2x - 5y = 9$ and $4x - 10y = 20$" },
        { id: "B", text: "$3x + 7y = 12$ and $-9x - 21y = -36$" },
        // distractor: doubling the first equation gives $2x + 8y = 12$, not $6$, so again the lines are parallel and distinct.
        { id: "C", text: "$x + 4y = 6$ and $2x + 8y = 6$" },
        // distractor: the sign of the $y$-coefficient changes, so the slopes differ and the lines meet at exactly one point.
        { id: "D", text: "$5x - 2y = 8$ and $5x + 2y = 8$" }
      ],
      correctAnswer: "B",
      hint: "Test whether one equation in each pair is a single constant multiple of the other, constant term included.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~55s):** Multiplying $3x + 7y = 12$ by $-3$ gives $-9x - 21y = -36$, so the two equations describe the same line.\n\n**The Full Solution:**\nStep 1: A system has infinitely many solutions exactly when one equation is a nonzero multiple of the other, coefficients and constant alike.\nStep 2: In choice B the $x$-coefficients give the factor $\\frac{-9}{3} = -3$, and the $y$-coefficients agree since $-3(7) = -21$.\nStep 3: The constant also scales: $-3(12) = -36$, so the second equation is exactly $-3$ times the first and the system has infinitely many solutions. Check: dividing the second equation by $-3$ reproduces the first. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: doubling the first equation gives $4x - 10y = 18$, not $20$, so those lines are parallel and distinct and the system has no solution.\n* Choice C: doubling the first equation gives $2x + 8y = 12$, not $6$, so again the lines are parallel and distinct.\n* Choice D: the sign of the $y$-coefficient changes, so the slopes differ and the lines meet at exactly one point.\n\n**Test Day Takeaway:** Check the constant last. A pair whose coefficients scale but whose constant does not is the classic no-solution trap hiding among infinitely-many choices.",
      skills: ["infinite-solutions-condition", "system-solution-types"]
    }
  ]
};
