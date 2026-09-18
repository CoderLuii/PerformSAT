// Practice questions for Equivalent Expressions module
// Questions are organized by SECTION (question type)

export const equivalentExpressionsQuestions = {
  // Section: Equivalent Expressions
  "Equivalent Expressions": [
    {
      id: 1,
      difficulty: "easy",
      question: "The table shows the number of units of each supply a bakery buys and the price per unit, in dollars, in terms of $x$. Which expression represents the total amount, in dollars, the bakery pays for these supplies?",
      diagram: { type: "dataTable", params: { headers: ["Supply", "Number of units", "Price per unit (dollars)"], rows: [["Flour sacks", "4", "x + 3"], ["Yeast packets", "3", "2x − 1"]] } },
      choices: [
        { id: "A", text: "$10x + 2$" },
        { id: "B", text: "$10x + 9$" },
        { id: "C", text: "$10x + 15$" },
        { id: "D", text: "$21x + 14$" }
      ],
      correctAnswer: "B",
      hint: "Each row contributes (number of units)(price per unit); distribute each product completely before you combine anything.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $4(x+3)=4x+12$ and $3(2x-1)=6x-3$; adding gives $10x+9$ — choice B.\n\n**The Full Solution:**\nStep 1: The flour sacks cost $4(x+3)=4x+12$ dollars.\nStep 2: The yeast packets cost $3(2x-1)=6x-3$ dollars.\nStep 3: Add the two costs and combine like terms: $(4x+6x)+(12-3)=10x+9$.\nStep 4: Check with a number. At $x=2$ the unit prices are $5$ and $3$ dollars, so the bill is $4(5)+3(3)=29$ dollars, and $10(2)+9=29$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($10x + 2$): multiplies each quantity by only the $x$-term and copies the constants over untouched: $4x+3+6x-1$.\n* Choice C ($10x + 15$): distributes the $3$ across $2x-1$ as $6x+3$, losing the subtraction sign on the constant.\n* Choice D ($21x + 14$): adds the two unit prices first, $(x+3)+(2x-1)=3x+2$, then multiplies by the total number of units, $7$ — but the two supplies have different unit counts.\n\n**Test Day Takeaway:** Distribute the multiplier across every term inside the parentheses, sign included, and only then collect like terms. A quick numerical check with a convenient value of $x$ catches a dropped sign in seconds.",
      skills: ["distributive-property", "combining-like-terms"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A solar panel's uncovered area, in square centimeters, is $49t^2 - 25$, where $t$ is the number of minutes since a shade began retracting. Which expression is equivalent to that area?",
      choices: [
        { id: "A", text: "$(7t - 5)(7t + 5)$" },
        // distractor: expands to 49t^2 - 70t + 25, which has an unwanted middle term
        { id: "B", text: "$(7t - 5)^2$" },
        // distractor: expands to 49t^2 + 70t + 25
        { id: "C", text: "$(7t + 5)^2$" },
        // distractor: splits the coefficients instead of the squares and expands to 49t^2 + 24t - 25
        { id: "D", text: "$(49t - 25)(t + 1)$" }
      ],
      correctAnswer: "A",
      hint: "Notice what kind of number both $49t^2$ and $25$ are.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $49t^2 = (7t)^2$ and $25 = 5^2$, so the difference factors as $(7t - 5)(7t + 5)$.\n\n**The Full Solution:**\nStep 1: Recognize both terms as squares: $49t^2 = (7t)^2$ and $25 = 5^2$.\nStep 2: A difference of squares $a^2 - b^2$ factors as $(a - b)(a + b)$ with $a = 7t$ and $b = 5$.\nStep 3: The factored form is $(7t - 5)(7t + 5)$. Check by expanding: $49t^2 + 35t - 35t - 25 = 49t^2 - 25$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($(7t - 5)^2$): expands to $49t^2 - 70t + 25$, adding a middle term the original does not have.\n* Choice C ($(7t + 5)^2$): expands to $49t^2 + 70t + 25$, wrong in both the middle and constant terms.\n* Choice D: splits the coefficients rather than the squares and expands to $49t^2 + 24t - 25$.\n\n**Test Day Takeaway:** A binomial with a minus sign between two perfect squares always factors into conjugate pairs.",
      skills: ["difference-of-squares"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A harvester's grain-flow ratio is $\\dfrac{18x^5}{3x^{-2}}$, where $x$ is the drum speed in revolutions per second, and the ratio equals $ax^b$ for every $x > 0$. What is the value of $a + b$?",
      choices: [
        // distractor: subtracts as 5 - 2 = 3, ignoring the negative exponent, then adds 6
        { id: "A", text: "$9$" },
        { id: "B", text: "$13$" },
        // distractor: multiplies the exponents to get 10 and adds 6
        { id: "C", text: "$16$" },
        // distractor: subtracts the coefficients, 18 - 3 = 15, and adds 7
        { id: "D", text: "$22$" }
      ],
      correctAnswer: "B",
      hint: "Watch the sign of the exponent in the denominator.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $\\dfrac{18}{3} = 6$ and $x^{5 - (-2)} = x^{7}$, so $a + b = 6 + 7 = 13$.\n\n**The Full Solution:**\nStep 1: Divide the coefficients: $\\dfrac{18}{3} = 6$, so $a = 6$.\nStep 2: Subtract the exponents: $5 - (-2) = 7$, so $b = 7$.\nStep 3: Add: $a + b = 6 + 7 = 13$. Check at $x = 1$: the ratio is $\\dfrac{18}{3} = 6$ and $6(1)^7 = 6$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): computes $5 - 2 = 3$, dropping the minus sign on the denominator's exponent, and adds $6 + 3$.\n* Choice C ($16$): multiplies the exponents instead of subtracting them, giving $6 + 10$.\n* Choice D ($22$): subtracts the coefficients, $18 - 3 = 15$, and adds the correct exponent $7$.\n\n**Test Day Takeaway:** Subtracting a negative exponent adds it, so the exponent grows rather than shrinks.",
      skills: ["simplifying-rational-expressions", "exponent-laws"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The expression $9m^{2}-30m+25$ can be written in the form $(am+b)^{2}$, where $a$ and $b$ are constants and $a>0$. What is the value of $a+b$?",
      choices: [
        { id: "A", text: "$-12$" },
        { id: "B", text: "$-2$" },
        { id: "C", text: "$8$" },
        { id: "D", text: "$34$" }
      ],
      correctAnswer: "B",
      hint: "Expand $(am+b)^{2}$ in general first, then match it term by term against the given trinomial.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $9m^{2}=(3m)^{2}$ and $25=(-5)^{2}$, and $2(3)(-5)=-30$ matches the middle term, so $a=3$, $b=-5$ and $a+b=-2$ — choice B.\n\n**The Full Solution:**\nStep 1: Expanding the target form gives $(am+b)^{2}=a^{2}m^{2}+2abm+b^{2}$.\nStep 2: Match the squared term: $a^{2}=9$, and since $a>0$, $a=3$.\nStep 3: Match the middle term: $2ab=-30$, so $2(3)b=-30$ and $b=-5$. That is consistent with $b^{2}=25$.\nStep 4: Then $a+b=3+(-5)=-2$. Check: $(3m-5)^{2}=9m^{2}-30m+25$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($-12$): takes $a=3$ correctly but reads $b$ as half the middle coefficient, $\\frac{-30}{2}=-15$, giving $3+(-15)$.\n* Choice C ($8$): gets both magnitudes right but keeps $b=5$; the negative middle term forces $b$ to be negative.\n* Choice D ($34$): uses the coefficients $9$ and $25$ themselves as $a$ and $b$ rather than their square roots.\n\n**Test Day Takeaway:** To match a form, expand the form symbolically and line up coefficients. The sign of the middle term, not the constant term, is what decides the sign of $b$.",
      skills: ["perfect-square-trinomial"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A crate's cross-sectional area is $16x^2 + kx + 81$, and for two constants $k$ this area is the square of a binomial. What are those two values of $k$?",
      choices: [
        // distractor: keeps only the negative value and discards the positive one
        { id: "A", text: "$-72$ only" },
        // distractor: uses the square root of 16(81) = 36 without doubling it
        { id: "B", text: "$-36$ and $36$" },
        { id: "C", text: "$-72$ and $72$" },
        // distractor: keeps only the positive value
        { id: "D", text: "$72$ only" }
      ],
      correctAnswer: "C",
      hint: "What binomial, when squared, could produce the first and last terms?",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** A square $(4x \\pm 9)^2$ has middle term $\\pm 2(4)(9)x = \\pm 72x$, so $k = \\pm 72$.\n\n**The Full Solution:**\nStep 1: For the trinomial to be a square, it must equal $(4x + c)^2$ with $c^2 = 81$, so $c = 9$ or $c = -9$.\nStep 2: Expanding $(4x + c)^2$ gives $16x^2 + 8cx + c^2$, so $k = 8c$.\nStep 3: With $c = 9$, $k = 72$; with $c = -9$, $k = -72$. Check: $(4x + 9)^2 = 16x^2 + 72x + 81$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($-72$ only): finds the right size but discards the equally valid positive value.\n* Choice B ($-36$ and $36$): uses $\\sqrt{16 \\cdot 81} = 36$ and forgets the factor of $2$ in the middle term.\n* Choice D ($72$ only): discards the negative value, though $(4x - 9)^2$ is also a square.\n\n**Test Day Takeaway:** The middle term of a perfect square is twice the product of the two square roots — and its sign can go either way.",
      skills: ["perfect-square-trinomial"]
    }
  ]
};
