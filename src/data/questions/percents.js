// Practice questions for Percents module
// Questions are organized by SECTION (question type)

export const percentsQuestions = {
  // Section: Percent Fundamentals
  "Percent Fundamentals": [
    {
      id: 1,
      difficulty: "easy",
      question: "In a chemistry lab, $6\\%$ of a sample's mass is sodium. Which of the following decimals is equivalent to $6\\%$?",
      choices: [
        // distractor: divides by 1,000
        { id: "A", text: "$0.006$" },
        { id: "B", text: "$0.06$" },
        // distractor: moves the decimal one place
        { id: "C", text: "$0.6$" },
        // distractor: drops the percent without dividing
        { id: "D", text: "$6$" }
      ],
      correctAnswer: "B",
      hint: "A percent counts hundredths, so the decimal point moves two places to the left.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~10s):** $6\\% = \\frac{6}{100} = 0.06$.\n\n**The Full Solution:**\nStep 1: The word percent means per hundred, so $6\\%$ is the fraction $\\frac{6}{100}$.\nStep 2: Dividing $6$ by $100$ moves the decimal point two places to the left: $6. \\to 0.06$.\nStep 3: So $6\\% = 0.06$. Check by reversing: $0.06 \\times 100 = 6$, which is the original percent. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.006$): divides by $1{,}000$, moving the decimal point three places.\n* Choice C ($0.6$): moves the decimal point only one place, which is $60\\%$.\n* Choice D ($6$): drops the percent sign without dividing at all.\n\n**Test Day Takeaway:** Converting a percent to a decimal is a single division by $100$; converting back is a single multiplication by $100$.",
      skills: ["percent-decimal-conversion"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A soil sample has a water content of $0.045$ by mass. What percent of the sample's mass is water?",
      choices: [
        // distractor: no multiplication by 100
        { id: "A", text: "$0.045\\%$" },
        // distractor: moves the decimal one place
        { id: "B", text: "$0.45\\%$" },
        { id: "C", text: "$4.5\\%$" },
        // distractor: multiplies by 1,000
        { id: "D", text: "$45\\%$" }
      ],
      correctAnswer: "C",
      hint: "Multiply the decimal by $100$ and attach the percent sign.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** $0.045 \\times 100 = 4.5$, so the water content is $4.5\\%$.\n\n**The Full Solution:**\nStep 1: A decimal becomes a percent when it is multiplied by $100$.\nStep 2: $0.045 \\times 100 = 4.5$, which moves the decimal point two places to the right.\nStep 3: Attach the percent sign: $4.5\\%$. Check the size: $0.045$ is a bit less than $\\frac{1}{20} = 5\\%$, and $4.5\\%$ is a bit less than $5\\%$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.045\\%$): attaches a percent sign without multiplying, which is a hundred times too small.\n* Choice B ($0.45\\%$): moves the decimal point only one place.\n* Choice D ($45\\%$): moves the decimal point three places, multiplying by $1{,}000$.\n\n**Test Day Takeaway:** Percent and decimal differ by exactly two decimal places — check the size of the answer against a familiar benchmark such as $5\\%$.",
      skills: ["percent-decimal-conversion"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "Field crews surveyed $400$ stream transects in a coastal watershed and recorded the proportion of transects on which each amphibian species was detected, shown in the table. Expressed as a percent, how much greater is the proportion for the Pacific chorus frog than the proportion for the rough-skinned newt?",
      diagram: { type: "dataTable", params: { headers: ["Species", "Proportion of transects with a detection"], rows: [["Pacific chorus frog", "0.48"], ["Rough-skinned newt", "0.32"], ["Red-legged frog", "0.21"], ["Long-toed salamander", "0.09"]] } },
      choices: [
        // distractor: reports the decimal difference $0.16$ as if it were already a percent
        { id: "A", text: "$0.16\\%$" },
        // distractor: moves the decimal point one place instead of two, giving $1.6\%$
        { id: "B", text: "$1.6\\%$" },
        { id: "C", text: "$16\\%$" },
        // distractor: adds the two proportions instead of subtracting, giving $0.80$, or $80\%$
        { id: "D", text: "$80\\%$" }
      ],
      correctAnswer: "C",
      hint: "A proportion written as a decimal becomes a percent when it is multiplied by $100$.",
      explanation: "**Choice C is correct.** The two proportions differ by $0.48 - 0.32 = 0.16$, and $0.16$ written as a percent is $16\\%$.\n\n**The Fast Way (~30s):** Subtract first, convert once: $0.48 - 0.32 = 0.16$, and $0.16 \\times 100 = 16$, so the difference is $16\\%$.\n\n**The Full Solution:**\n\nStep 1: Read the two proportions from the table. The Pacific chorus frog was detected on a proportion of $0.48$ of the transects, and the rough-skinned newt on a proportion of $0.32$.\n\nStep 2: Find how much greater one is than the other: $0.48-0.32=0.16$.\n\nStep 3: Convert the decimal to a percent by multiplying by $100$: $0.16 \\times 100 = 16$, so the difference is $16\\%$. Check with counts: $0.48(400) = 192$ transects and $0.32(400) = 128$ transects, a difference of $64$ transects, and $\\frac{64}{400} = 0.16 = 16\\%$.\n\n**Why the wrong answers are tempting:**\n\n* Choice A ($0.16\\%$): stops at the decimal difference $0.16$ and writes a percent sign after it. A decimal is not already a percent.\n* Choice B ($1.6\\%$): multiplies by $10$ instead of $100$, shifting the decimal point only one place.\n* Choice D ($80\\%$): adds the two proportions, $0.48 + 0.32 = 0.80$, instead of subtracting them.\n\n**Test Day Takeaway:** Do the arithmetic in one system, then convert once at the end -- mixing decimals and percents mid-problem is what produces the factor-of-$100$ misses.",
      skills: ["percent-decimal-conversion"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "At a recycling center, $\\frac{7}{20}$ of the material collected is glass, $0.28$ of it is paper, and $12\\%$ of it is metal. The rest of the material collected is plastic. Which type of material makes up the greatest share of the material collected?",
      choices: [
        { id: "A", text: "Glass" },
        // distractor: reads 7/20 as 7 percent and compares only the stated shares
        { id: "B", text: "Paper" },
        // distractor: compares raw numbers without converting
        { id: "C", text: "Metal" },
        // distractor: omits glass from the leftover subtraction
        { id: "D", text: "Plastic" }
      ],
      correctAnswer: "A",
      hint: "Put all three given shares into one common form before comparing, and remember the leftover has to be found.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** As percents the shares are $35$, $28$, $12$, and the leftover $25$; glass is largest.\n\n**The Full Solution:**\nStep 1: Convert everything to percents. $\\frac{7}{20} = \\frac{35}{100} = 35\\%$ glass, and $0.28 = 28\\%$ paper. Metal is already $12\\%$.\nStep 2: The four shares total $100\\%$, so plastic is $100 - 35 - 28 - 12 = 25\\%$.\nStep 3: Comparing $35\\%$, $28\\%$, $12\\%$, and $25\\%$, the largest is glass. Check the sum: $35 + 28 + 12 + 25 = 100$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B (Paper): reads $\\frac{7}{20}$ as $7\\%$ and compares only the three shares that are stated, where paper's $28\\%$ would be the largest.\n* Choice C (Metal): compares the raw numbers $\\frac{7}{20}$, $0.28$, and $12$ without converting, so $12$ looks biggest.\n* Choice D (Plastic): leaves glass out of the subtraction, computing $100 - 28 - 12 = 60$ for plastic.\n\n**Test Day Takeaway:** Comparisons across fractions, decimals, and percents are only safe after everything is in the same form — and a share described as the rest must be computed, not skipped.",
      skills: ["percent-decimal-conversion"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "In a book collection, the number of hardcover books is $\\frac{3}{5}$ of the number of paperback books. The number of hardcover books is $p\\%$ of the total number of books in the collection. What is the value of $p$?",
      choices: [
        // distractor: uses the difference share 2/8
        { id: "A", text: "$25$" },
        { id: "B", text: "$37.5$" },
        // distractor: treats 3/5 as the share of the total
        { id: "C", text: "$60$" },
        // distractor: reports the paperback share
        { id: "D", text: "$62.5$" }
      ],
      correctAnswer: "B",
      hint: "Choose a convenient number of paperback books so the fraction comes out whole, then build the total.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Take $5$ paperbacks and $3$ hardcovers; the total is $8$, and $\\frac{3}{8} = 37.5\\%$.\n\n**The Full Solution:**\nStep 1: Let the number of paperback books be $5k$ for some positive integer $k$. Then the number of hardcover books is $\\frac{3}{5}(5k) = 3k$.\nStep 2: The total number of books is $5k + 3k = 8k$, so the hardcover share of the total is $\\frac{3k}{8k} = \\frac{3}{8}$.\nStep 3: As a percent, $\\frac{3}{8} = 0.375 = 37.5\\%$, so $p = 37.5$. Check with $k = 10$: $50$ paperbacks and $30$ hardcovers out of $80$ books, and $\\frac{30}{80} = 37.5\\%$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($25$): reports $\\frac{2}{8}$, the share by which the paperbacks outnumber the hardcovers, instead of the hardcover share.\n* Choice C ($60$): treats $\\frac{3}{5}$ itself as the share of the TOTAL, but it is the share of the paperbacks only.\n* Choice D ($62.5$): reports the paperback share $\\frac{5}{8}$ of the total rather than the hardcover share.\n\n**Test Day Takeaway:** When one group is described as a fraction of ANOTHER group, the total is the sum of the parts — never the denominator of the given fraction.",
      skills: ["percent-decimal-conversion"]
    }
  ],

  // Section: Percent Of Questions
  "Percent Of Questions": [
    {
      id: 1,
      difficulty: "easy",
      question: "A theater has $340$ seats, and $45\\%$ of these seats are in the balcony. How many of the seats in this theater are in the balcony?",
      choices: [
        { id: "A", text: "$153$" },
        // distractor: reports the complement
        { id: "B", text: "$187$" },
        // distractor: subtracts 45 as a count
        { id: "C", text: "$295$" },
        // distractor: multiplies by 4.5
        { id: "D", text: "$1{,}530$" }
      ],
      correctAnswer: "A",
      hint: "Turn the percent into a decimal, then multiply it by the total number of seats.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $0.45 \\times 340 = 153$.\n\n**The Full Solution:**\nStep 1: Finding a percent OF a quantity means multiplying, so write $45\\%$ as the decimal $0.45$.\nStep 2: Multiply: $0.45 \\times 340 = 153$.\nStep 3: So $153$ seats are in the balcony. Check the size: $45\\%$ is a little under half, and $153$ is a little under half of $340$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($187$): computes $340 - 153$, the number of seats that are NOT in the balcony.\n* Choice C ($295$): subtracts $45$ from $340$, treating the percent as a count of seats.\n* Choice D ($1{,}530$): multiplies by $4.5$ instead of $0.45$, misplacing the decimal point.\n\n**Test Day Takeaway:** A percent of a total is always smaller than the total when the percent is under $100$ — a quick size check catches decimal-point slips.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "At a wildlife refuge, $65\\%$ of the tagged birds are songbirds. If $91$ of the tagged birds are songbirds, how many tagged birds are at the refuge?",
      choices: [
        // distractor: reports the non-songbirds
        { id: "A", text: "$49$" },
        { id: "B", text: "$140$" },
        // distractor: adds the percent as a count
        { id: "C", text: "$156$" },
        // distractor: divides by the complement
        { id: "D", text: "$260$" }
      ],
      correctAnswer: "B",
      hint: "The $91$ birds are a part, not the whole, so divide rather than multiply.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $91 \\div 0.65 = 140$.\n\n**The Full Solution:**\nStep 1: Let $n$ be the number of tagged birds. The statement says $0.65n = 91$.\nStep 2: Divide both sides by $0.65$: $n = \\frac{91}{0.65} = 140$.\nStep 3: So there are $140$ tagged birds. Check: $0.65 \\times 140 = 91$, and the remaining $49$ birds are $35\\%$ of $140$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($49$): reports $140 - 91$, the number of tagged birds that are not songbirds.\n* Choice C ($156$): adds $65$ to $91$, treating the percent as a count of birds.\n* Choice D ($260$): divides by $0.35$, using the percent of birds that are NOT songbirds.\n\n**Test Day Takeaway:** When the part is given and the whole is missing, divide the part by the decimal form of its percent.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "An electric utility charges a household $\\$72$ for one month of service. A new rate plan lowers that monthly charge by $35\\%$. By how many dollars is the monthly charge lowered?",
      choices: [
        // distractor: multiplies by 0.035
        { id: "A", text: "$2.52$" },
        { id: "B", text: "$25.20$" },
        // distractor: treats 35 percent as 35 dollars
        { id: "C", text: "$37$" },
        // distractor: reports the new charge
        { id: "D", text: "$46.80$" }
      ],
      correctAnswer: "B",
      hint: "The question asks for the size of the reduction, not for the charge that remains.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $0.35 \\times 72 = 25.20$.\n\n**The Full Solution:**\nStep 1: A reduction of $35\\%$ means the charge drops by $35\\%$ of the current charge, so compute $35\\%$ of $72$.\nStep 2: Write the percent as a decimal and multiply: $0.35 \\times 72 = 25.2$.\nStep 3: The charge is lowered by $\\$25.20$. Check: the new charge would be $72 - 25.20 = 46.80$, which is $65\\%$ of $72$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.52$): multiplies by $0.035$, misplacing the decimal point by one place.\n* Choice C ($37$): subtracts $35$ from $72$, treating the percent as a number of dollars.\n* Choice D ($46.80$): reports the new monthly charge instead of the amount of the reduction.\n\n**Test Day Takeaway:** Read whether the question wants the CHANGE or the NEW amount — the two differ by exactly the original value.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table summarizes the $250$ students at a school by grade level and by whether the student takes a world language course. What percent of the grade 11 students take a world language course?",
      diagram: { type: "twoWayTable", params: { headers: ["", "Takes a world language course", "Does not take a world language course", "Total"], rows: [["Grade 11", "84", "36", "120"], ["Grade 12", "56", "74", "130"], ["Total", "140", "110", "250"]] } },
      choices: [
        // distractor: uses the students who do not take a course
        { id: "A", text: "$30\\%$" },
        // distractor: divides by the school total
        { id: "B", text: "$33.6\\%$" },
        // distractor: divides by the column total
        { id: "C", text: "$60\\%$" },
        { id: "D", text: "$70\\%$" }
      ],
      correctAnswer: "D",
      hint: "The whole in this comparison is the number of grade 11 students, not the number of students at the school.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** $\\frac{84}{120} = 0.7$, so $70\\%$ of the grade 11 students take a world language course.\n\n**The Full Solution:**\nStep 1: The question restricts attention to grade 11, so the whole is that row's total, $120$ students.\nStep 2: The part is the grade 11 students who take a world language course, $84$.\nStep 3: Divide and convert: $\\frac{84}{120} = 0.7 = 70\\%$. Check: the other $36$ grade 11 students are $30\\%$, and $70 + 30 = 100$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($30\\%$): uses the $36$ grade 11 students who do NOT take a world language course.\n* Choice B ($33.6\\%$): divides $84$ by the school total of $250$ instead of by the grade 11 total.\n* Choice C ($60\\%$): divides $84$ by the column total of $140$, comparing grade 11 to all language students.\n\n**Test Day Takeaway:** In a two-way table, the phrase after of names the denominator — here it is the grade 11 row, so the row total is the whole.",
      skills: ["percent-of-value", "percent-word-problems"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "At a nursery, $20\\%$ of the seedlings are maple and the rest are oak. There are $600$ more oak seedlings than maple seedlings. How many seedlings are at the nursery?",
      choices: [
        // distractor: divides the difference by 0.8
        { id: "A", text: "$750$" },
        // distractor: reports the oak count
        { id: "B", text: "$800$" },
        { id: "C", text: "$1{,}000$" },
        // distractor: divides the difference by 0.2
        { id: "D", text: "$3{,}000$" }
      ],
      correctAnswer: "C",
      hint: "Write both counts as percents of the total; their difference is a percent of the total too.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** Oak exceeds maple by $80\\% - 20\\% = 60\\%$ of the total, so the total is $600 \\div 0.6 = 1{,}000$.\n\n**The Full Solution:**\nStep 1: Let $n$ be the total number of seedlings. Maple accounts for $0.2n$ and oak for the remaining $0.8n$.\nStep 2: The stated difference gives $0.8n - 0.2n = 600$, so $0.6n = 600$.\nStep 3: Divide: $n = 1{,}000$. Check: $200$ maple and $800$ oak seedlings differ by $600$, and $200$ is $20\\%$ of $1{,}000$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($750$): divides the difference by $0.8$, treating $600$ as the number of oak seedlings.\n* Choice B ($800$): reports the number of oak seedlings rather than the total.\n* Choice D ($3{,}000$): divides the difference by $0.2$, treating $600$ as the number of maple seedlings.\n\n**Test Day Takeaway:** Translate every quantity into the same variable before using a comparison sentence; the difference of two percents of the same total is itself a percent of that total.",
      skills: ["percent-of-value", "percent-word-problems"]
    }
  ],

  // Section: Percent Change Questions
  "Percent Change Questions": [
    {
      id: 1,
      difficulty: "easy",
      question: "The number of daily riders on a bus route rose from $400$ to $500$. What was the percent increase in the number of daily riders?",
      choices: [
        // distractor: divides by the new value
        { id: "A", text: "$20\\%$" },
        { id: "B", text: "$25\\%$" },
        // distractor: original as a percent of the new value
        { id: "C", text: "$80\\%$" },
        // distractor: new as a percent of the original
        { id: "D", text: "$125\\%$" }
      ],
      correctAnswer: "B",
      hint: "A percent change always compares the change to the original amount.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The rise is $100$, and $\\frac{100}{400} = 25\\%$.\n\n**The Full Solution:**\nStep 1: Find the change: $500 - 400 = 100$ riders.\nStep 2: Percent increase is $\\frac{\\text{change}}{\\text{original}}$, so divide by the earlier value: $\\frac{100}{400} = 0.25$.\nStep 3: Convert: $0.25 = 25\\%$. Check: increasing $400$ by $25\\%$ adds $100$ riders and lands on $500$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($20\\%$): divides the change by the NEW value, $\\frac{100}{500}$.\n* Choice C ($80\\%$): reports the original as a percent of the new value, $\\frac{400}{500}$.\n* Choice D ($125\\%$): reports the new value as a percent of the original instead of the increase; the increase is the part above $100\\%$.\n\n**Test Day Takeaway:** Percent change divides by the STARTING value, and an answer above $100\\%$ for a modest rise is a signal you reported the ratio, not the change.",
      skills: ["percent-change"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The table gives the number of nesting pairs of a shorebird species counted at a reserve in four different years. What was the percent decrease in the number of nesting pairs from 2018 to 2022?",
      diagram: { type: "dataTable", params: { headers: ["Year", "Number of nesting pairs"], rows: [["2018", "640"], ["2020", "576"], ["2022", "512"], ["2024", "480"]] } },
      choices: [
        // distractor: uses the 2020 row
        { id: "A", text: "$10\\%$" },
        { id: "B", text: "$20\\%$" },
        // distractor: divides by the later count
        { id: "C", text: "$25\\%$" },
        // distractor: reports the ratio, not the decrease
        { id: "D", text: "$80\\%$" }
      ],
      correctAnswer: "B",
      hint: "The base of a percent decrease is the earlier count in the comparison.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** The drop is $640 - 512 = 128$, and $\\frac{128}{640} = 20\\%$.\n\n**The Full Solution:**\nStep 1: Read the two counts named in the question: $640$ pairs in 2018 and $512$ pairs in 2022.\nStep 2: Find the decrease: $640 - 512 = 128$ pairs.\nStep 3: Divide by the 2018 count and convert: $\\frac{128}{640} = 0.2 = 20\\%$. Check: $80\\%$ of $640$ is $512$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($10\\%$): uses the 2020 count of $576$, reading the wrong row of the table.\n* Choice C ($25\\%$): divides the decrease by the 2022 count instead of the 2018 count.\n* Choice D ($80\\%$): reports the 2022 count as a percent of the 2018 count rather than the decrease.\n\n**Test Day Takeaway:** Two rows must be identified before any arithmetic — then divide the change by the earlier of the two.",
      skills: ["percent-change"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The enrollment in a training program increased by $20\\%$ from 2021 to 2022 and then decreased by $15\\%$ from 2022 to 2023. The enrollment was $500$ in 2021. What was the enrollment in 2023?",
      choices: [
        // distractor: applies only the decrease
        { id: "A", text: "$425$" },
        { id: "B", text: "$510$" },
        // distractor: takes 15 percent of the original
        { id: "C", text: "$525$" },
        // distractor: stops after the increase
        { id: "D", text: "$600$" }
      ],
      correctAnswer: "B",
      hint: "The second percent is applied to the amount that exists after the first change.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** $500(1.20) = 600$, then $600(0.85) = 510$.\n\n**The Full Solution:**\nStep 1: An increase of $20\\%$ multiplies by $1.20$: the 2022 enrollment is $500(1.20) = 600$.\nStep 2: A decrease of $15\\%$ multiplies by $0.85$, and it applies to the 2022 enrollment: $600(0.85) = 510$.\nStep 3: The 2023 enrollment is $510$ students. Check: $15\\%$ of $600$ is $90$, and $600 - 90 = 510$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($425$): applies only the decrease, computing $500(0.85)$ and skipping the increase.\n* Choice C ($525$): takes $15\\%$ of the original $500$ instead of the new $600$, computing $600 - 75$.\n* Choice D ($600$): stops after the increase and never applies the decrease.\n\n**Test Day Takeaway:** Chain percent changes by multiplying scale factors in order; each factor acts on the result of the one before it.",
      skills: ["percent-change", "successive-percent-change"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "After a $12\\%$ increase, the monthly membership fee at a fitness center is $\\$56$. What was the monthly membership fee, in dollars, before the increase?",
      choices: [
        // distractor: treats 12 percent as 12 dollars
        { id: "A", text: "$44$" },
        // distractor: takes 12 percent off the new fee
        { id: "B", text: "$49.28$" },
        { id: "C", text: "$50$" },
        // distractor: increases again instead of reversing
        { id: "D", text: "$62.72$" }
      ],
      correctAnswer: "C",
      hint: "The new fee is $112\\%$ of the old one, so undo the increase by dividing.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $56 \\div 1.12 = 50$.\n\n**The Full Solution:**\nStep 1: Let $f$ be the fee before the increase. Raising it by $12\\%$ multiplies it by $1.12$, so $1.12f = 56$.\nStep 2: Divide both sides by $1.12$: $f = \\frac{56}{1.12} = 50$.\nStep 3: The earlier fee was $\\$50$. Check: $12\\%$ of $50$ is $6$, and $50 + 6 = 56$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($44$): subtracts $12$ from $56$, treating the percent as a number of dollars.\n* Choice B ($49.28$): takes $12\\%$ off the NEW fee, but the $12\\%$ was computed from the old fee.\n* Choice D ($62.72$): applies the increase a second time instead of reversing it.\n\n**Test Day Takeaway:** Undoing a percent increase is division by $1 + r$, never subtraction of the same percent from the new amount.",
      skills: ["percent-change"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A quantity is increased by $p\\%$, and the result is then decreased by $p\\%$. If the final quantity is $84\\%$ of the original quantity, what is the value of $p$?",
      choices: [
        // distractor: halves the net drop
        { id: "A", text: "$8$" },
        // distractor: treats the pair as one decrease
        { id: "B", text: "$16$" },
        { id: "C", text: "$40$" },
        // distractor: reports the given percent
        { id: "D", text: "$84$" }
      ],
      correctAnswer: "C",
      hint: "Multiply the two scale factors together and set the product equal to $0.84$.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** $\\left(1 + \\frac{p}{100}\\right)\\left(1 - \\frac{p}{100}\\right) = 1 - \\frac{p^2}{10{,}000} = 0.84$, so $p^2 = 1{,}600$ and $p = 40$.\n\n**The Full Solution:**\nStep 1: Increasing by $p\\%$ multiplies by $1 + \\frac{p}{100}$; decreasing the result by $p\\%$ multiplies by $1 - \\frac{p}{100}$.\nStep 2: The product of those two factors is a difference of squares: $1 - \\frac{p^2}{10{,}000}$. Set it equal to $0.84$.\nStep 3: Then $\\frac{p^2}{10{,}000} = 0.16$, so $p^2 = 1{,}600$ and $p = 40$ (a percent change is positive here). Check with a starting value of $100$: $100(1.4) = 140$, and $140(0.6) = 84$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): halves the net $16$-point drop, as if the two steps each contributed half of it.\n* Choice B ($16$): treats the whole process as a single decrease and solves $1 - \\frac{p}{100} = 0.84$.\n* Choice D ($84$): reports the given final percent as the value of $p$.\n\n**Test Day Takeaway:** Equal-size increases and decreases never cancel; multiplying the scale factors leaves $1 - \\frac{p^2}{10{,}000}$, always less than $1$.",
      skills: ["percent-change", "successive-percent-change"]
    }
  ],

  // Section: Percent Model Questions
  "Percent Model Questions": [
    {
      id: 1,
      difficulty: "easy",
      question: "The bar graph shows the number of visitors to a museum on each of five days. On Thursday, $15\\%$ of the visitors bought a guidebook. How many of Thursday's visitors bought a guidebook?",
      diagram: { type: "barChart", params: { data: [{ label: "Mon", value: 120 }, { label: "Tue", value: 160 }, { label: "Wed", value: 200 }, { label: "Thu", value: 240 }, { label: "Fri", value: 280 }], xAxisLabel: "Day", yAxisLabel: "Number of visitors", yMax: 320, yStep: 40 } },
      choices: [
        { id: "A", text: "$36$" },
        // distractor: reads Friday's bar
        { id: "B", text: "$42$" },
        // distractor: reports the complement
        { id: "C", text: "$204$" },
        // distractor: multiplies by 1.5
        { id: "D", text: "$360$" }
      ],
      correctAnswer: "A",
      hint: "Read Thursday's bar first, then apply the percent to that number only.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** Thursday's bar is at $240$, and $0.15 \\times 240 = 36$.\n\n**The Full Solution:**\nStep 1: Read the height of the Thursday bar: $240$ visitors.\nStep 2: Write the percent as a decimal and multiply: $0.15 \\times 240$.\nStep 3: $0.15 \\times 240 = 36$ visitors bought a guidebook. Check: $10\\%$ of $240$ is $24$ and $5\\%$ is $12$, and $24 + 12 = 36$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($42$): applies the percent to Friday's $280$ visitors, reading the neighboring bar.\n* Choice C ($204$): reports the $85\\%$ of Thursday's visitors who did NOT buy a guidebook.\n* Choice D ($360$): multiplies by $1.5$ instead of $0.15$, misplacing the decimal point.\n\n**Test Day Takeaway:** Identify the exact bar the question names before computing; neighboring bars are built to catch a quick glance.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A saline solution is $8\\%$ salt by mass, and the rest of the solution is water. If the solution contains $276$ grams of water, what is the mass, in grams, of the salt?",
      choices: [
        // distractor: takes 8 percent of the water
        { id: "A", text: "$22.08$" },
        { id: "B", text: "$24$" },
        // distractor: subtracts salt from water
        { id: "C", text: "$252$" },
        // distractor: reports the total mass
        { id: "D", text: "$300$" }
      ],
      correctAnswer: "B",
      hint: "The water is $92\\%$ of the whole, so it can be used to recover the total mass first.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Water is $92\\%$ of the solution, so the total is $276 \\div 0.92 = 300$ grams and the salt is $300 - 276 = 24$ grams.\n\n**The Full Solution:**\nStep 1: Salt is $8\\%$ of the solution by mass, so water is $100\\% - 8\\% = 92\\%$ of it.\nStep 2: Let $m$ be the total mass. Then $0.92m = 276$, so $m = \\frac{276}{0.92} = 300$ grams.\nStep 3: The salt is the rest: $300 - 276 = 24$ grams. Check: $0.08 \\times 300 = 24$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($22.08$): takes $8\\%$ of the WATER mass; the $8\\%$ refers to the whole solution.\n* Choice C ($252$): subtracts the salt mass from the water mass instead of reporting the salt mass.\n* Choice D ($300$): reports the total mass of the solution rather than the mass of the salt.\n\n**Test Day Takeaway:** When a percent is stated for one component, the other component carries the complementary percent — use whichever one is given a number.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A field technician receives a bonus equal to $4\\%$ of the value of the equipment she installs. In one quarter her bonus was $\\$1{,}380$. What was the value, in dollars, of the equipment she installed that quarter?",
      choices: [
        // distractor: multiplies instead of dividing
        { id: "A", text: "$55.20$" },
        // distractor: divides by 0.4
        { id: "B", text: "$3{,}450$" },
        // distractor: multiplies by 4
        { id: "C", text: "$5{,}520$" },
        { id: "D", text: "$34{,}500$" }
      ],
      correctAnswer: "D",
      hint: "The bonus is a small part of a large whole, so the answer must be much larger than the bonus.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** $1{,}380 \\div 0.04 = 34{,}500$.\n\n**The Full Solution:**\nStep 1: Let $v$ be the value of the equipment installed. The bonus statement gives $0.04v = 1{,}380$.\nStep 2: Divide both sides by $0.04$: $v = \\frac{1{,}380}{0.04} = 34{,}500$.\nStep 3: The equipment was worth $\\$34{,}500$. Check: $4\\%$ of $34{,}500$ is $0.04 \\times 34{,}500 = 1{,}380$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($55.20$): multiplies the bonus by $0.04$ instead of dividing by it.\n* Choice B ($3{,}450$): divides by $0.4$ rather than $0.04$, misplacing the decimal point.\n* Choice C ($5{,}520$): multiplies the bonus by $4$, treating the percent as a whole-number factor.\n\n**Test Day Takeaway:** A part that is only a few percent of the whole means the whole is many times larger — check the order of magnitude before choosing.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives the amount of water stored in each of four reservoirs and the percent of that reservoir's capacity the stored amount represents. What is the capacity, in millions of gallons, of the Cedar reservoir?",
      diagram: { type: "dataTable", params: { headers: ["Reservoir", "Water stored (millions of gallons)", "Percent of capacity"], rows: [["Alder", "63", "45%"], ["Birch", "88", "55%"], ["Cedar", "96", "40%"], ["Dunn", "72", "60%"]] } },
      choices: [
        // distractor: multiplies instead of dividing
        { id: "A", text: "$38.4$" },
        // distractor: reports the unused capacity
        { id: "B", text: "$144$" },
        // distractor: divides by the empty percent
        { id: "C", text: "$160$" },
        { id: "D", text: "$240$" }
      ],
      correctAnswer: "D",
      hint: "The stored amount is a part of the capacity, so divide it by the decimal form of its percent.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~25s):** Cedar's $96$ million gallons is $40\\%$ of capacity, so the capacity is $96 \\div 0.4 = 240$.\n\n**The Full Solution:**\nStep 1: Read Cedar's row: $96$ million gallons stored, which is $40\\%$ of its capacity.\nStep 2: Let $c$ be the capacity. Then $0.40c = 96$.\nStep 3: Divide: $c = \\frac{96}{0.40} = 240$ million gallons. Check: $40\\%$ of $240$ is $96$, and the remaining $144$ million gallons is the $60\\%$ that is empty. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($38.4$): multiplies $96$ by $0.40$ instead of dividing by it.\n* Choice B ($144$): reports how much more water the reservoir could hold, not the capacity.\n* Choice C ($160$): divides by $0.60$, the percent of the capacity that is EMPTY.\n\n**Test Day Takeaway:** Read the percent's owner carefully: $40\\%$ of capacity means the capacity is the denominator, so the stored amount gets divided.",
      skills: ["percent-word-problems", "percent-of-value"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A licensing exam has $150$ questions, and a candidate must answer at least $68\\%$ of them correctly to pass. A candidate has answered $86$ of the first $110$ questions correctly. At least how many of the remaining questions must this candidate answer correctly to pass?",
      choices: [
        { id: "A", text: "$16$" },
        // distractor: counts allowed remaining misses
        { id: "B", text: "$24$" },
        // distractor: assumes all remaining must be correct
        { id: "C", text: "$40$" },
        // distractor: reports the total needed
        { id: "D", text: "$102$" }
      ],
      correctAnswer: "A",
      hint: "Find the total number of correct answers required before looking at what is already earned.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** Passing needs $0.68 \\times 150 = 102$ correct, and $102 - 86 = 16$ more.\n\n**The Full Solution:**\nStep 1: Compute the passing requirement: $68\\%$ of $150$ is $0.68 \\times 150 = 102$ correct answers.\nStep 2: The candidate already has $86$ correct, so the shortfall is $102 - 86 = 16$.\nStep 3: There are $150 - 110 = 40$ questions left, and $16$ of them must be correct. Check: $86 + 16 = 102$, and $\\frac{102}{150} = 0.68$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($24$): counts the remaining questions the candidate may answer INCORRECTLY, since $150 - 102 = 48$ misses are allowed and $110 - 86 = 24$ have already been used.\n* Choice C ($40$): assumes every one of the $40$ remaining questions must be answered correctly.\n* Choice D ($102$): reports the total number of correct answers needed rather than the additional number.\n\n**Test Day Takeaway:** Convert a passing percent into a raw count first; the question then becomes simple subtraction against what is already banked.",
      skills: ["percent-word-problems", "percent-of-value"]
    }
  ]
};
