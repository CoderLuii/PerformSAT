// Practice questions for Statistics module
// Questions are organized by SECTION (question type)

export const statisticsQuestions = {
  // Section: Mean
  "Mean": [
    {
      id: 1,
      difficulty: "easy",
      question: "The dot plot shows the number of birds recorded at each of $8$ feeding stations during a one-hour count. What is the mean number of birds recorded per station?",
      diagram: { type: "dotPlot", params: { data: [{ value: 2, count: 3 }, { value: 4, count: 2 }, { value: 6, count: 2 }, { value: 10, count: 1 }], xMin: 1, xMax: 11, xLabel: "Number of birds" } },
      choices: [
        // distractor: reports the value with the tallest stack of dots, which is the mode, not the mean.
        { id: "A", text: "$2$" },
        // distractor: reports the median, the average of the fourth and fifth ordered values.
        { id: "B", text: "$4$" },
        { id: "C", text: "$4.5$" },
        // distractor: divides the total by $4$, the number of distinct values marked with dots, instead of by the $8$ dots.
        { id: "D", text: "$9$" }
      ],
      correctAnswer: "C",
      hint: "Every dot is one station, so the total number of dots is the number you divide by.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** The dots give $2, 2, 2, 4, 4, 6, 6, 10$. The sum is $36$, and $\\frac{36}{8} = 4.5$.\n\n**The Full Solution:**\nStep 1: Read one value for each dot: $2, 2, 2, 4, 4, 6, 6, 10$. That is $8$ values, one per station.\nStep 2: Add them: $3(2) + 2(4) + 2(6) + 10 = 6 + 8 + 12 + 10 = 36$.\nStep 3: Divide by the number of stations: $\\frac{36}{8} = 4.5$. Check: $4.5$ lies above the cluster at $2$ because the single station with $10$ birds pulls the average up. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): reports the value with the tallest stack of dots, which is the mode, not the mean.\n* Choice B ($4$): reports the median, the average of the fourth and fifth ordered values.\n* Choice D ($9$): divides the total by $4$, the number of distinct values marked with dots, instead of by the $8$ dots.\n\n**Test Day Takeaway:** On a dot plot the divisor is the number of dots, not the number of labeled positions. Count the stacks fully before dividing.",
      skills: ["calculate-mean"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The list gives the snowfall, in centimeters, recorded at a weather station on each of $5$ days: $12$, $7$, $15$, $9$, $12$. What is the mean daily snowfall, in centimeters?",
      choices: [
        // distractor: reports the range, $15 - 7$, which measures spread rather than center.
        { id: "A", text: "$8$" },
        { id: "B", text: "$11$" },
        // distractor: reports the median (and the most frequent value) instead of the mean.
        { id: "C", text: "$12$" },
        // distractor: divides the correct sum by $4$ instead of $5$, dropping one day from the count.
        { id: "D", text: "$13.75$" }
      ],
      correctAnswer: "B",
      hint: "Total the five recorded amounts first, then divide by how many days were recorded.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The five values sum to $55$, so the mean is $\\frac{55}{5} = 11$.\n\n**The Full Solution:**\nStep 1: The mean is the sum of the values divided by the number of values.\nStep 2: $12 + 7 + 15 + 9 + 12 = 55$.\nStep 3: There are $5$ days, so the mean is $\\frac{55}{5} = 11$ centimeters. Check: $11$ falls between the least value $7$ and the greatest value $15$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($8$): reports the range, $15 - 7$, which measures spread rather than center.\n* Choice C ($12$): reports the median (and the most frequent value) instead of the mean.\n* Choice D ($13.75$): divides the correct sum by $4$ instead of $5$, dropping one day from the count.\n\n**Test Day Takeaway:** Mean is total divided by count. Recount the data values before dividing; an off-by-one in the count is the most common slip.",
      skills: ["calculate-mean"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "An acoustician measures the reverberation time at six positions in a concert hall and records, in seconds, $1.2$, $1.5$, $1.1$, $1.8$, $1.4$, and $k$. These six recorded times have a mean of $1.45$ seconds. What is the value of $k$?",
      choices: [
        // distractor: reports the median of the five listed times, 1.4, instead of solving for the sixth
        { id: "A", text: "$1.4$" },
        // distractor: assumes the missing value equals the mean, 1.45
        { id: "B", text: "$1.45$" },
        { id: "C", text: "$1.7$" },
        // distractor: reports the required total of all six times, 8.7, rather than the missing value
        { id: "D", text: "$8.7$" }
      ],
      correctAnswer: "C",
      hint: "Six values with a known mean have a known total.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Six times averaging $1.45$ total $8.7$ seconds; the five listed total $7.0$, so $k = 1.7$.\n\n**The Full Solution:**\nStep 1: Convert the mean to a total. Six values with mean $1.45$ sum to $6 \\times 1.45 = 8.7$ seconds.\nStep 2: Add the five known times. $1.2 + 1.5 + 1.1 + 1.8 + 1.4 = 7.0$ seconds.\nStep 3: Subtract and check. $k = 8.7 - 7.0 = 1.7$ seconds. Recomputing: $\\frac{7.0 + 1.7}{6} = \\frac{8.7}{6} = 1.45$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($1.4$): is the median of the five listed times, not the value that fixes the mean.\n* Choice B ($1.45$): assumes the missing time equals the mean. That is only true when the five known values already average $1.45$, and they average $1.4$.\n* Choice D ($8.7$): is the required total of all six times, one subtraction short of the answer.\n\n**Test Day Takeaway:** Turn a mean into a total the moment a value is missing: total $=$ mean $\\times$ count, then subtract what you know.",
      skills: ["calculate-mean"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "Twelve cold-chain shipping cartons have a mean mass of $34.5$ kilograms. After one carton is removed from the group, the remaining eleven cartons have a mean mass of $33.8$ kilograms. What is the mass, in kilograms, of the carton that was removed?",
      choices: [
        // distractor: reports the drop in the mean, 34.5 - 33.8 = 0.7, instead of the mass removed
        { id: "A", text: "$0.7$" },
        // distractor: multiplies that drop by the eleven remaining cartons: 0.7 x 11 = 7.7
        { id: "B", text: "$7.7$" },
        { id: "C", text: "$42.2$" },
        // distractor: reports the total mass of all twelve cartons, 414, rather than the one removed
        { id: "D", text: "$414$" }
      ],
      correctAnswer: "C",
      hint: "Compare the total mass before the removal with the total after.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** Twelve cartons total $414$ kilograms and eleven total $371.8$, so the removed carton is $414 - 371.8 = 42.2$.\n\n**The Full Solution:**\nStep 1: Total before. $12 \\times 34.5 = 414$ kilograms.\nStep 2: Total after. $11 \\times 33.8 = 371.8$ kilograms.\nStep 3: Subtract and check. $414 - 371.8 = 42.2$ kilograms. Adding it back: $\\frac{371.8 + 42.2}{12} = \\frac{414}{12} = 34.5$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.7$): is how far the mean fell, not the mass of the carton.\n* Choice B ($7.7$): multiplies the drop in the mean by the eleven remaining cartons. That product is how far the removed carton sits ABOVE the original mean, so the $34.5$ still has to be added back.\n* Choice D ($414$): is the total mass of all twelve cartons.\n\n**Test Day Takeaway:** Removing one value from a mean is a totals problem: total before minus total after IS the value removed.",
      skills: ["calculate-mean"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A shipment of $60$ crystal samples is divided into two batches. The $36$ samples in batch 1 have a mean mass of $20$ grams, and all $60$ samples in the shipment have a mean mass of $24$ grams. What is the mean mass, in grams, of the $24$ samples in batch 2?",
      choices: [
        // distractor: divides batch 2 total mass by all $60$ samples, $\frac{720}{60}$, instead of by the $24$ samples in that batch.
        { id: "A", text: "$12$" },
        // distractor: reports the mean of batch 1, which the question already gives.
        { id: "B", text: "$20$" },
        // distractor: averages the two batch means as if the batches were the same size, solving $\frac{20 + m}{2} = 24$.
        { id: "C", text: "$28$" },
        { id: "D", text: "$30$" }
      ],
      correctAnswer: "D",
      hint: "Work with total mass rather than with the two averages directly.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~50s):** Total mass is $60(24) = 1440$ grams and batch 1 supplies $36(20) = 720$ grams, so batch 2 supplies $720$ grams across $24$ samples: $\\frac{720}{24} = 30$.\n\n**The Full Solution:**\nStep 1: The whole shipment has total mass $60(24) = 1440$ grams.\nStep 2: Batch 1 has total mass $36(20) = 720$ grams, so batch 2 has total mass $1440 - 720 = 720$ grams.\nStep 3: Batch 2 contains $60 - 36 = 24$ samples, so its mean mass is $\\frac{720}{24} = 30$ grams. Check: $\\frac{36(20) + 24(30)}{60} = \\frac{1440}{60} = 24$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): divides batch 2 total mass by all $60$ samples, $\\frac{720}{60}$, instead of by the $24$ samples in that batch.\n* Choice B ($20$): reports the mean of batch 1, which the question already gives.\n* Choice C ($28$): averages the two batch means as if the batches were the same size, solving $\\frac{20 + m}{2} = 24$.\n\n**Test Day Takeaway:** A combined mean is a total-over-total, never the average of two averages, unless the groups happen to be equal in size.",
      skills: ["calculate-mean", "weighted-mean"]
    }
  ],

  // Section: Median
  "Median": [
    {
      id: 1,
      difficulty: "easy",
      question: "A coach recorded the number of laps swum by each of $9$ team members: $14$, $9$, $21$, $17$, $12$, $28$, $16$, $19$, $11$. What is the median number of laps?",
      choices: [
        // distractor: reports the least value rather than the middle one.
        { id: "A", text: "$9$" },
        // distractor: takes the fifth entry in the list as written, without ordering the values first.
        { id: "B", text: "$12$" },
        { id: "C", text: "$16$" },
        // distractor: averages the least and greatest values, $\frac{9 + 28}{2}$, which is the midrange, not the median.
        { id: "D", text: "$18.5$" }
      ],
      correctAnswer: "C",
      hint: "Put the nine numbers in order before you look for a middle one.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Ordered, the values are $9, 11, 12, 14, 16, 17, 19, 21, 28$. With $9$ values the median is the fifth, $16$.\n\n**The Full Solution:**\nStep 1: Order the values from least to greatest: $9,\\ 11,\\ 12,\\ 14,\\ 16,\\ 17,\\ 19,\\ 21,\\ 28$.\nStep 2: With an odd count of $9$ values, the median is the single middle value, the fifth in the ordered list.\nStep 3: The fifth ordered value is $16$. Check: four values ($9, 11, 12, 14$) fall below it and four ($17, 19, 21, 28$) fall above it. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($9$): reports the least value rather than the middle one.\n* Choice B ($12$): takes the fifth entry in the list as written, without ordering the values first.\n* Choice D ($18.5$): averages the least and greatest values, $\\frac{9 + 28}{2}$, which is the midrange, not the median.\n\n**Test Day Takeaway:** Median means order first. For an odd count the median is a single value from the list; for an even count it is the average of the two middle values.",
      skills: ["find-median"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The table gives the height, in centimeters, of each of $8$ saplings in a nursery plot. What is the median height, in centimeters, of the saplings?",
      diagram: { type: "dataTable", params: { headers: ["Sapling", "1", "2", "3", "4", "5", "6", "7", "8"], rows: [["Height (cm)", "34", "41", "28", "37", "45", "30", "39", "44"]] } },
      choices: [
        // distractor: reports only the lower of the two middle values instead of averaging them.
        { id: "A", text: "$37$" },
        // distractor: computes the mean of the eight heights, $\frac{298}{8}$, rather than the median.
        { id: "B", text: "$37.25$" },
        { id: "C", text: "$38$" },
        // distractor: averages the fourth and fifth entries as the table lists them, $\frac{37 + 45}{2}$, without ordering first.
        { id: "D", text: "$41$" }
      ],
      correctAnswer: "C",
      hint: "With an even number of values, two of them sit in the middle after ordering.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** Ordered, the middle two heights are $37$ and $39$, so the median is $\\frac{37 + 39}{2} = 38$.\n\n**The Full Solution:**\nStep 1: Order the heights: $28,\\ 30,\\ 34,\\ 37,\\ 39,\\ 41,\\ 44,\\ 45$.\nStep 2: With an even count of $8$ values, the median is the average of the fourth and fifth ordered values, $37$ and $39$.\nStep 3: Median $= \\frac{37 + 39}{2} = 38$ centimeters. Check: exactly four heights lie below $38$ and four lie above it. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($37$): reports only the lower of the two middle values instead of averaging them.\n* Choice B ($37.25$): computes the mean of the eight heights, $\\frac{298}{8}$, rather than the median.\n* Choice D ($41$): averages the fourth and fifth entries as the table lists them, $\\frac{37 + 45}{2}$, without ordering first.\n\n**Test Day Takeaway:** For an even count the median is the average of the two middle ordered values, so it need not be one of the listed values.",
      skills: ["find-median"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A monitoring station recorded the wind speed, in kilometers per hour, on each of $27$ days. The table gives each recorded speed and the number of days on which it occurred. What is the median of the $27$ recorded speeds?",
      diagram: { type: "dataTable", params: { headers: ["Wind speed (km/h)", "Number of days"], rows: [["11", "8"], ["13", "2"], ["16", "5"], ["19", "3"], ["22", "6"], ["25", "3"]] } },
      choices: [
        // distractor: reports the median of the day counts in the second column, $\frac{3 + 5}{2}$, instead of the median of the speeds.
        { id: "A", text: "$4$" },
        // distractor: reports the speed recorded on the most days, which is the mode.
        { id: "B", text: "$11$" },
        { id: "C", text: "$16$" },
        // distractor: medians the six distinct speeds listed, $\frac{16 + 19}{2}$, treating each row as a single value instead of as many days.
        { id: "D", text: "$17.5$" }
      ],
      correctAnswer: "C",
      hint: "Count the days as you move down the table until you reach the fourteenth one.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** With $27$ days the median is the $14$th ordered speed. Running totals of $8, 10, 15$ show the $14$th day falls in the $16$ row.\n\n**The Full Solution:**\nStep 1: There are $27$ recorded speeds, an odd count, so the median is the $14$th value in order.\nStep 2: Accumulate the day counts from the least speed up: $8$ days at $11$, then $8 + 2 = 10$ days through $13$, then $10 + 5 = 15$ days through $16$.\nStep 3: Days $11$ through $15$ in order all recorded $16$ kilometers per hour, so the $14$th value is $16$. Check: only $10$ days recorded a speed below $16$, and the five days at $16$ fill positions $11$ through $15$, which includes the $14$th. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4$): reports the median of the day counts in the second column, $\\frac{3 + 5}{2}$, instead of the median of the speeds.\n* Choice B ($11$): reports the speed recorded on the most days, which is the mode.\n* Choice D ($17.5$): medians the six distinct speeds listed, $\\frac{16 + 19}{2}$, treating each row as a single value instead of as many days.\n\n**Test Day Takeaway:** A frequency table lists each value once but represents it many times. Add the counts to locate the middle position before reading a median.",
      skills: ["find-median"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A data set consists of the $8$ values $5$, $9$, $12$, $12$, $16$, $21$, $27$, and $34$. The two greatest values are removed from the data set. By how much does the median decrease?",
      choices: [
        // distractor: assumes removing values from the top of an ordered list cannot move the median.
        { id: "A", text: "$0$" },
        { id: "B", text: "$2$" },
        // distractor: tracks only the upper middle value, $16 - 12$, instead of the change in the average of the two middle values.
        { id: "C", text: "$4$" },
        // distractor: reports the original median instead of the amount it decreased.
        { id: "D", text: "$14$" }
      ],
      correctAnswer: "B",
      hint: "Find the median twice, once before the removal and once after, then compare.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** The original median is $\\frac{12 + 16}{2} = 14$; after removing $27$ and $34$ it is $\\frac{12 + 12}{2} = 12$. The decrease is $2$.\n\n**The Full Solution:**\nStep 1: The eight values are already ordered, so the original median is the average of the fourth and fifth values: $\\frac{12 + 16}{2} = 14$.\nStep 2: Removing $27$ and $34$ leaves the six values $5, 9, 12, 12, 16, 21$, whose median is the average of the third and fourth: $\\frac{12 + 12}{2} = 12$.\nStep 3: The median decreases by $14 - 12 = 2$. Check: dropping the two largest values shifts the middle position left, so a decrease is expected. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0$): assumes removing values from the top of an ordered list cannot move the median.\n* Choice C ($4$): tracks only the upper middle value, $16 - 12$, instead of the change in the average of the two middle values.\n* Choice D ($14$): reports the original median instead of the amount it decreased.\n\n**Test Day Takeaway:** Removing values from one end shifts which entries sit in the middle. Recompute the median from the shortened list rather than reasoning about it in the abstract.",
      skills: ["find-median"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A data set consists of the six values $9$, $13$, $18$, $27$, $31$, and $x$, where $x$ is an integer. The median of the data set is $21$. What is the value of $x$?",
      choices: [
        // distractor: pairs $x$ with $27$ instead of $18$, solving $\frac{x + 27}{2} = 21$; but $x = 15$ places $x$ below $18$, and the median of $9, 13, 15, 18, 27, 31$ is $16.5$.
        { id: "A", text: "$15$" },
        // distractor: assumes the median must be one of the listed values, so $x$ is set equal to it.
        { id: "B", text: "$21$" },
        { id: "C", text: "$24$" },
        // distractor: pairs $x$ with $13$, solving $\frac{13 + x}{2} = 21$, which uses the wrong middle position.
        { id: "D", text: "$29$" }
      ],
      correctAnswer: "C",
      hint: "With six values the median averages the third and fourth, so first decide where $x$ can land in the ordered list.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~55s):** The median $21$ is greater than $18$ and less than $27$, so $x$ must sit between them and pair with $18$: $\\frac{18 + x}{2} = 21$ gives $x = 24$.\n\n**The Full Solution:**\nStep 1: Order the five known values: $9, 13, 18, 27, 31$. With $x$ included there are six values, so the median is the average of the third and fourth.\nStep 2: If $x \\le 18$, the third and fourth ordered values are $x$ (or $13$) and $18$, so the median is at most $18$; if $x \\ge 27$, they are $18$ and $27$, giving a median of $\\frac{18 + 27}{2} = 22.5$. Neither case gives $21$, so $18 < x < 27$ and the middle pair is $18$ and $x$.\nStep 3: Solve $\\frac{18 + x}{2} = 21$, so $18 + x = 42$ and $x = 24$. Check: the ordered set is $9, 13, 18, 24, 27, 31$, and $\\frac{18 + 24}{2} = 21$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): pairs $x$ with $27$ instead of $18$, solving $\\frac{x + 27}{2} = 21$; but $x = 15$ places $x$ below $18$, and the median of $9, 13, 15, 18, 27, 31$ is $16.5$.\n* Choice B ($21$): assumes the median must be one of the listed values, so $x$ is set equal to it.\n* Choice D ($29$): pairs $x$ with $13$, solving $\\frac{13 + x}{2} = 21$, which uses the wrong middle position.\n\n**Test Day Takeaway:** When a data set contains an unknown, decide where the unknown falls in the order before writing the median equation, then confirm the answer is consistent with that placement.",
      skills: ["find-median"]
    }
  ],

  // Section: Mode
  "Mode": [
    {
      id: 1,
      difficulty: "easy",
      question: "A survey asked each of $55$ households how many vehicles it owns. The bar graph shows the number of households that gave each response. What is the mode of the numbers of vehicles owned?",
      diagram: { type: "barChart", params: { data: [{ label: "0", value: 4 }, { label: "1", value: 17 }, { label: "2", value: 23 }, { label: "3", value: 9 }, { label: "4", value: 2 }], xAxisLabel: "Number of vehicles", yAxisLabel: "Number of households", yMax: 25, yStep: 5 } },
      choices: [
        // distractor: reads the second-tallest bar instead of the tallest.
        { id: "A", text: "$1$" },
        { id: "B", text: "$2$" },
        // distractor: reports the greatest response shown on the axis rather than the most frequent one.
        { id: "C", text: "$4$" },
        // distractor: reports the height of the tallest bar, which is how often the mode occurs, not the mode itself.
        { id: "D", text: "$23$" }
      ],
      correctAnswer: "B",
      hint: "The mode is a response, not a bar height.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The tallest bar sits above $2$ vehicles, so $2$ is the response given most often.\n\n**The Full Solution:**\nStep 1: The horizontal axis lists the possible responses and each bar height is the number of households giving that response.\nStep 2: The bar heights are $4$, $17$, $23$, $9$, and $2$ households for $0$, $1$, $2$, $3$, and $4$ vehicles.\nStep 3: The greatest height, $23$, occurs above $2$ vehicles, so the mode is $2$ vehicles. Check: $4 + 17 + 23 + 9 + 2 = 55$ households, matching the survey size. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($1$): reads the second-tallest bar instead of the tallest.\n* Choice C ($4$): reports the greatest response shown on the axis rather than the most frequent one.\n* Choice D ($23$): reports the height of the tallest bar, which is how often the mode occurs, not the mode itself.\n\n**Test Day Takeaway:** The mode is a data value. On a bar graph read across to the axis label under the tallest bar, never up to its height.",
      skills: ["find-mode"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The number of pages in each of $6$ booklets is $18$, $24$, $31$, $37$, $42$, and $55$. Which statement about the mode of these page counts is true?",
      choices: [
        // distractor: reports the least value, which is the minimum rather than the mode.
        { id: "A", text: "The mode is $18$." },
        // distractor: reports $\frac{207}{6}$, the mean of the six page counts.
        { id: "B", text: "The mode is $34.5$." },
        // distractor: reports the greatest value, which is the maximum rather than the mode.
        { id: "C", text: "The mode is $55$." },
        { id: "D", text: "There is no mode." }
      ],
      correctAnswer: "D",
      hint: "A mode has to be a value that appears more often than the others.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** Every page count appears exactly once, so no value occurs most often and the data set has no mode.\n\n**The Full Solution:**\nStep 1: The mode of a data set is the value that occurs most frequently.\nStep 2: Each of $18$, $24$, $31$, $37$, $42$, and $55$ occurs exactly one time.\nStep 3: Since no value occurs more often than any other, the data set has no mode. Check: a mode would require at least one repeated value, and there are none. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: reports the least value, which is the minimum rather than the mode.\n* Choice B: reports $\\frac{207}{6}$, the mean of the six page counts.\n* Choice C: reports the greatest value, which is the maximum rather than the mode.\n\n**Test Day Takeaway:** Mode is about repetition. If every value appears once, the correct answer is that there is no mode, not the smallest or largest value.",
      skills: ["find-mode"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A data set contains $20$ values. The value $5$ occurs $6$ times, the value $8$ occurs $6$ times, and each of the remaining values occurs at most $3$ times. Which statement about the mode of the data set is true?",
      choices: [
        // distractor: breaks the tie by choosing the smaller value, but the definition of mode does not favor smaller values.
        { id: "A", text: "The only mode is $5$." },
        // distractor: breaks the tie by choosing the larger value, which the definition of mode does not do either.
        { id: "B", text: "The only mode is $8$." },
        { id: "C", text: "The data set has two modes, $5$ and $8$." },
        // distractor: treats a tie for the greatest frequency as no mode; a data set has no mode only when every value occurs the same number of times.
        { id: "D", text: "The data set has no mode." }
      ],
      correctAnswer: "C",
      hint: "Compare the highest frequency in the data set with how many values reach it.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** The greatest frequency is $6$, and two values reach it, so both $5$ and $8$ are modes.\n\n**The Full Solution:**\nStep 1: The mode is the value or values occurring most frequently.\nStep 2: The greatest frequency in this data set is $6$, since every other value occurs at most $3$ times.\nStep 3: Both $5$ and $8$ occur $6$ times, so the data set has two modes, $5$ and $8$. Check: no value occurs more than $6$ times, so neither can be excluded. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: breaks the tie by choosing the smaller value, but the definition of mode does not favor smaller values.\n* Choice B: breaks the tie by choosing the larger value, which the definition of mode does not do either.\n* Choice D: treats a tie for the greatest frequency as no mode; a data set has no mode only when every value occurs the same number of times.\n\n**Test Day Takeaway:** A tie for the highest frequency produces more than one mode. Only a data set with no repeats at all, or with every value equally frequent, has no mode.",
      skills: ["find-mode"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A researcher recorded the primary paint color of each of $200$ cars parked in a lot. Which measure of center can be determined from the recorded colors?",
      choices: [
        // distractor: the mean requires arithmetic on the values, which categorical labels do not support.
        { id: "A", text: "The mean only" },
        // distractor: the median requires an order on the values, and paint colors have no least-to-greatest order.
        { id: "B", text: "The median only" },
        { id: "C", text: "The mode only" },
        // distractor: assumes every measure of center applies to every data set, but only the mode applies to categorical data.
        { id: "D", text: "The mean, the median, and the mode" }
      ],
      correctAnswer: "C",
      hint: "Ask which of the three measures needs the data to be numbers you can order or add.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** Colors cannot be added or ordered, so only the most frequent color, the mode, can be found.\n\n**The Full Solution:**\nStep 1: The mean requires adding the values and dividing, which is impossible for color names.\nStep 2: The median requires arranging the values from least to greatest, and colors have no numerical order.\nStep 3: The mode requires only counting how often each value occurs, which works for colors, so the mode alone can be determined. Check: reporting that red occurs most often is meaningful, while an average color is not. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: the mean requires arithmetic on the values, which categorical labels do not support.\n* Choice B: the median requires an order on the values, and paint colors have no least-to-greatest order.\n* Choice D: assumes every measure of center applies to every data set, but only the mode applies to categorical data.\n\n**Test Day Takeaway:** Categorical data supports only the mode. Mean and median require values you can add or order.",
      skills: ["find-mode"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A data set of $15$ integers has a single mode of $24$, which occurs $4$ times. The value $19$ occurs $3$ times in this data set. Three more values, each equal to $19$, are then added. Which statement about the mode of the resulting $18$-value data set is true?",
      choices: [
        // distractor: assumes the original mode cannot be overtaken, but frequencies elsewhere can grow past it.
        { id: "A", text: "The mode is still $24$." },
        { id: "B", text: "The mode is $19$." },
        // distractor: keeps $24$ on the list because it was the original mode and adds $19$ alongside it; only the current frequencies count, and $6 > 4$.
        { id: "C", text: "The data set has two modes, $19$ and $24$." },
        // distractor: assumes that a change in the most frequent value leaves the data set without a mode.
        { id: "D", text: "The data set has no mode." }
      ],
      correctAnswer: "B",
      hint: "Track the new frequency of each candidate value rather than the original ranking.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** The value $19$ now occurs $3 + 3 = 6$ times while $24$ still occurs $4$ times, so $19$ is the new mode.\n\n**The Full Solution:**\nStep 1: Adding values changes only the frequencies of the values added, so $24$ still occurs $4$ times.\nStep 2: The value $19$ occurred $3$ times and gains $3$ more, so it now occurs $6$ times.\nStep 3: Since $6 > 4$ and every other value occurred fewer than $4$ times originally, the single mode of the new data set is $19$. Check: the data set now has $15 + 3 = 18$ values, and no value occurs more than $6$ times. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: assumes the original mode cannot be overtaken, but frequencies elsewhere can grow past it.\n* Choice C: keeps $24$ on the list because it was the original mode and adds $19$ alongside it; only the current frequencies count, and $6 > 4$.\n* Choice D: assumes that a change in the most frequent value leaves the data set without a mode.\n\n**Test Day Takeaway:** When values are added to a data set, update the frequency count of every affected value before naming a mode.",
      skills: ["find-mode"]
    }
  ],

  // Section: Range
  "Range": [
    {
      id: 1,
      difficulty: "easy",
      question: "The daily high temperature, in degrees Fahrenheit, in a city on each of $6$ days was $71$, $64$, $78$, $69$, $83$, and $66$. What is the range of these temperatures, in degrees Fahrenheit?",
      choices: [
        // distractor: subtracts the quartiles, $78 - 66$, giving the interquartile range instead of the range.
        { id: "A", text: "$12$" },
        // distractor: uses $78$, the second-greatest temperature, in place of the greatest.
        { id: "B", text: "$14$" },
        { id: "C", text: "$19$" },
        // distractor: reports the median, $\frac{69 + 71}{2}$, which measures center rather than spread.
        { id: "D", text: "$70$" }
      ],
      correctAnswer: "C",
      hint: "Only the two extreme temperatures matter here.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** The greatest temperature is $83$ and the least is $64$, so the range is $83 - 64 = 19$.\n\n**The Full Solution:**\nStep 1: The range of a data set is the greatest value minus the least value.\nStep 2: Scanning the six temperatures, the greatest is $83$ and the least is $64$.\nStep 3: Range $= 83 - 64 = 19$ degrees Fahrenheit. Check: every temperature listed lies within a $19$-degree band starting at $64$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): subtracts the quartiles, $78 - 66$, giving the interquartile range instead of the range.\n* Choice B ($14$): uses $78$, the second-greatest temperature, in place of the greatest.\n* Choice D ($70$): reports the median, $\\frac{69 + 71}{2}$, which measures center rather than spread.\n\n**Test Day Takeaway:** Range uses the two extremes only. Locate the maximum and minimum before subtracting; the middle values never enter the calculation.",
      skills: ["range-calculation"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The box plot summarizes the mass, in grams, of each of $45$ river stones collected from a streambed. What is the interquartile range, in grams, of the masses?",
      diagram: { type: "boxPlot", params: { min: 22, q1: 31, median: 38, q3: 47, max: 58, xLabel: "Mass (g)", xMin: 20, xMax: 60, xGridStep: 5, xLabelStep: 10 } },
      choices: [
        // distractor: subtracts the first quartile from the median, $38 - 31$, covering only the left half of the box.
        { id: "A", text: "$7$" },
        // distractor: subtracts the median from the third quartile, $47 - 38$, covering only the right half of the box.
        { id: "B", text: "$9$" },
        { id: "C", text: "$16$" },
        // distractor: subtracts the whisker ends, $58 - 22$, which is the range rather than the interquartile range.
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "C",
      hint: "The interquartile range is the width of the box itself.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** The box runs from $31$ to $47$ grams, so the interquartile range is $47 - 31 = 16$.\n\n**The Full Solution:**\nStep 1: A box plot marks five values: the minimum and maximum at the whisker ends, the quartiles at the box edges, and the median inside the box.\nStep 2: The interquartile range is the third quartile minus the first quartile, so it uses only the two box edges, $47$ and $31$.\nStep 3: Interquartile range $= 47 - 31 = 16$ grams. Check: the middle half of the $45$ masses lies inside a $16$-gram-wide box. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($7$): subtracts the first quartile from the median, $38 - 31$, covering only the left half of the box.\n* Choice B ($9$): subtracts the median from the third quartile, $47 - 38$, covering only the right half of the box.\n* Choice D ($36$): subtracts the whisker ends, $58 - 22$, which is the range rather than the interquartile range.\n\n**Test Day Takeaway:** Box edges give the interquartile range; whisker ends give the range. Decide which two marks the question wants before subtracting.",
      skills: ["range-calculation"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A data set of $12$ values has a least value of $14$ and a greatest value of $53$. A thirteenth value, $9$, is then included in the data set. What is the range of the $13$ values?",
      choices: [
        // distractor: reports $14 - 9$, the amount the minimum dropped, instead of the new range.
        { id: "A", text: "$5$" },
        // distractor: keeps the original range, assuming an added value cannot change it.
        { id: "B", text: "$39$" },
        { id: "C", text: "$44$" },
        // distractor: adds the new value to the original range, $39 + 9$, instead of subtracting it from the maximum.
        { id: "D", text: "$48$" }
      ],
      correctAnswer: "C",
      hint: "Decide whether the new value replaces the old minimum, the old maximum, or neither.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** The new value $9$ is below $14$, so the minimum becomes $9$ while the maximum stays $53$: the range is $53 - 9 = 44$.\n\n**The Full Solution:**\nStep 1: The original range is $53 - 14 = 39$.\nStep 2: Since $9 < 14$, the new value becomes the least value of the data set; the greatest value is unchanged at $53$.\nStep 3: The new range is $53 - 9 = 44$. Check: $44$ exceeds the original range by exactly $14 - 9 = 5$, the amount the minimum dropped. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($5$): reports $14 - 9$, the amount the minimum dropped, instead of the new range.\n* Choice B ($39$): keeps the original range, assuming an added value cannot change it.\n* Choice D ($48$): adds the new value to the original range, $39 + 9$, instead of subtracting it from the maximum.\n\n**Test Day Takeaway:** A value added outside the current extremes replaces one of them. Recompute maximum minus minimum rather than adjusting the old range by a guess.",
      skills: ["range-calculation"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "Data set P consists of $30$ values. Data set Q consists of every value in data set P together with one additional value that is greater than each value in data set P. Which measure must be greater for data set Q than for data set P?",
      choices: [
        // distractor: the added value is above every value in P, so the least value of the data set does not move.
        { id: "A", text: "The minimum" },
        // distractor: the median shifts to the sixteenth ordered value, which is at least the old median but can equal it.
        { id: "B", text: "The median" },
        // distractor: one new value cannot outnumber an existing most frequent value, so the mode may be unchanged.
        { id: "C", text: "The mode" },
        { id: "D", text: "The range" }
      ],
      correctAnswer: "D",
      hint: "Ask which measure is guaranteed to change, not merely likely to.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~40s):** The added value raises the maximum and leaves the minimum alone, so the range must grow.\n\n**The Full Solution:**\nStep 1: The added value exceeds every value in data set P, so the maximum of Q is that new value and the minimum of Q equals the minimum of P.\nStep 2: Range equals maximum minus minimum, and only the maximum increased, so the range of Q is strictly greater than the range of P.\nStep 3: No other listed measure is guaranteed to increase. Check: the minimum is unchanged, the median can stay the same when the two central values of P are equal, and the mode need not change at all. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: the added value is above every value in P, so the least value of the data set does not move.\n* Choice B: the median shifts to the sixteenth ordered value, which is at least the old median but can equal it.\n* Choice C: one new value cannot outnumber an existing most frequent value, so the mode may be unchanged.\n\n**Test Day Takeaway:** On a \"must be\" question, look for the measure whose definition forces a change; a measure that merely usually changes is not the answer.",
      skills: ["range-calculation"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The range of a data set is $24$. A new data set is formed by multiplying each value in the original data set by $4$ and then decreasing each result by $9$. What is the range of the new data set?",
      choices: [
        // distractor: subtracts $9$ from the original range, applying the shift to the spread.
        { id: "A", text: "$15$" },
        // distractor: assumes neither operation changes the range, which is true only for the shift.
        { id: "B", text: "$24$" },
        // distractor: scales correctly to $96$ but then also subtracts $9$, applying the shift a second time to the spread.
        { id: "C", text: "$87$" },
        { id: "D", text: "$96$" }
      ],
      correctAnswer: "D",
      hint: "Consider what each operation does to the distance between the greatest and least values.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~45s):** Multiplying every value by $4$ multiplies the range by $4$; subtracting $9$ from every value shifts the data without changing the spread. The range is $4(24) = 96$.\n\n**The Full Solution:**\nStep 1: Let $M$ be the greatest value and $m$ the least, so $M - m = 24$.\nStep 2: The new greatest and least values are $4M - 9$ and $4m - 9$, since multiplying by a positive number preserves order.\nStep 3: The new range is $(4M - 9) - (4m - 9) = 4(M - m) = 4(24) = 96$. Check: the $-9$ cancels, confirming that a shift leaves spread unchanged. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($15$): subtracts $9$ from the original range, applying the shift to the spread.\n* Choice B ($24$): assumes neither operation changes the range, which is true only for the shift.\n* Choice C ($87$): scales correctly to $96$ but then also subtracts $9$, applying the shift a second time to the spread.\n\n**Test Day Takeaway:** A shift added to every value leaves range and standard deviation alone; a multiplier scales them by its absolute value.",
      skills: ["range-calculation"]
    }
  ],

  // Section: Standard Deviation
  "Standard Deviation": [
    {
      id: 1,
      difficulty: "easy",
      question: "A data set consists of measured values, and its mean and standard deviation are both computed. The standard deviation of the data set describes which of the following?",
      choices: [
        { id: "A", text: "How far the values typically fall from the mean" },
        // distractor: describes the range, which uses only the two extreme values instead of every value.
        { id: "B", text: "The difference between the greatest and least values" },
        // distractor: describes the median, a measure of center rather than of spread.
        { id: "C", text: "The middle value when the values are ordered" },
        // distractor: describes the size of the data set, which does not by itself say anything about spread.
        { id: "D", text: "The number of values in the data set" }
      ],
      correctAnswer: "A",
      hint: "Think about which quantity would grow if the values were spread farther from the center.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** Standard deviation is a measure of spread about the mean, so it reports the typical distance of a value from the mean.\n\n**The Full Solution:**\nStep 1: Measures of center, such as the mean and median, report where the data sit; measures of spread report how far apart they are.\nStep 2: Standard deviation is computed from the differences between each value and the mean, so it is a measure of spread about the mean.\nStep 3: A data set whose values cluster tightly around the mean has a small standard deviation, and one whose values are far from the mean has a large one. Check: moving one value farther from the mean increases the standard deviation. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: describes the range, which uses only the two extreme values instead of every value.\n* Choice C: describes the median, a measure of center rather than of spread.\n* Choice D: describes the size of the data set, which does not by itself say anything about spread.\n\n**Test Day Takeaway:** Standard deviation answers \"how spread out,\" not \"where is the middle.\" Match the measure to the question before comparing data sets.",
      skills: ["standard-deviation-concept"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A data set consists of $12$ values, and each of these values is equal to $47$. What is the standard deviation of this data set?",
      choices: [
        { id: "A", text: "$0$" },
        // distractor: assumes a standard deviation must be positive, but identical values give no spread.
        { id: "B", text: "$1$" },
        // distractor: reports the number of values in the data set.
        { id: "C", text: "$12$" },
        // distractor: reports the common value, which is the mean of the data set rather than its spread.
        { id: "D", text: "$47$" }
      ],
      correctAnswer: "A",
      hint: "Ask how far a typical value sits from the mean when every value is identical.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** The mean is $47$ and every value equals the mean, so there is no spread at all and the standard deviation is $0$.\n\n**The Full Solution:**\nStep 1: The mean of the data set is $\\frac{12(47)}{12} = 47$.\nStep 2: Each value differs from the mean by $47 - 47 = 0$, so every deviation is zero.\nStep 3: A standard deviation built from deviations that are all zero is itself $0$. Check: standard deviation is zero exactly when all values are identical. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($1$): assumes a standard deviation must be positive, but identical values give no spread.\n* Choice C ($12$): reports the number of values in the data set.\n* Choice D ($47$): reports the common value, which is the mean of the data set rather than its spread.\n\n**Test Day Takeaway:** Standard deviation is never negative and equals zero only when every value is the same. It measures spread, not size.",
      skills: ["standard-deviation-concept"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The dot plots show the distributions of two data sets, each containing $11$ values. The two data sets have the same mean. Which statement comparing the standard deviations of the two data sets is true?",
      diagram: { type: "dotPlot", params: { sets: [{ name: "Data set A", data: [20, 21, 22, 22, 23, 23, 23, 24, 24, 25, 26] }, { name: "Data set B", data: [20, 20, 20, 21, 22, 23, 24, 25, 26, 26, 26] }], xMin: 19, xMax: 27, height: 260, xLabel: "Value" } },
      choices: [
        // distractor: reverses the comparison; data set A is the more tightly clustered of the two.
        { id: "A", text: "The standard deviation of data set A is greater than the standard deviation of data set B." },
        { id: "B", text: "The standard deviation of data set B is greater than the standard deviation of data set A." },
        // distractor: treats equal means as forcing equal spread, but two data sets can share a mean and differ widely in spread.
        { id: "C", text: "The two standard deviations are equal because the two means are equal." },
        // distractor: the plots show every value in both data sets, which is all that is needed to compare spread.
        { id: "D", text: "There is not enough information to compare the two standard deviations." }
      ],
      correctAnswer: "B",
      hint: "Compare how tightly the dots cluster around the shared center, not where that center is.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** Data set A piles up near $23$, while data set B pushes its dots out to $20$ and $26$, so data set B has the greater spread.\n\n**The Full Solution:**\nStep 1: Both data sets have $11$ values and the same mean, $23$, so the comparison depends only on spread.\nStep 2: In data set A, seven of the eleven dots sit at $22$, $23$, or $24$, within one unit of the mean.\nStep 3: In data set B, six of the eleven dots sit at $20$ or $26$, three units from the mean, so its values are typically farther from the mean and its standard deviation is greater. Check: the two plots share an axis, so the wider footprint of B is a fair comparison. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: reverses the comparison; data set A is the more tightly clustered of the two.\n* Choice C: treats equal means as forcing equal spread, but two data sets can share a mean and differ widely in spread.\n* Choice D: the plots show every value in both data sets, which is all that is needed to compare spread.\n\n**Test Day Takeaway:** When two distributions share a center, standard deviation is decided by clustering. Read the dot plots for how far the dots sit from the center, not for where the center is.",
      skills: ["standard-deviation-concept"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "Data set M has a mean of $58$ and a standard deviation of $9$. Data set N is formed by increasing each value in data set M by $12$. What is the standard deviation of data set N?",
      choices: [
        { id: "A", text: "$9$" },
        // distractor: reports the amount added to each value rather than the spread of the new data set.
        { id: "B", text: "$12$" },
        // distractor: adds $12$ to the standard deviation, treating spread the same way as center.
        { id: "C", text: "$21$" },
        // distractor: reports the mean of data set N instead of its standard deviation.
        { id: "D", text: "$70$" }
      ],
      correctAnswer: "A",
      hint: "Picture sliding every dot the same distance along the number line.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** Adding the same amount to every value slides the whole distribution without stretching it, so the standard deviation stays $9$.\n\n**The Full Solution:**\nStep 1: Each value of N is a value of M plus $12$, and the mean of N is $58 + 12 = 70$.\nStep 2: Each deviation from the mean is unchanged, since $(x + 12) - (58 + 12) = x - 58$.\nStep 3: Standard deviation is built entirely from those deviations, so it is still $9$. Check: the distances between values are unchanged by a shift, so the spread cannot change. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($12$): reports the amount added to each value rather than the spread of the new data set.\n* Choice C ($21$): adds $12$ to the standard deviation, treating spread the same way as center.\n* Choice D ($70$): reports the mean of data set N instead of its standard deviation.\n\n**Test Day Takeaway:** Adding a constant moves the center and leaves the spread alone. Only the mean and median shift by that constant.",
      skills: ["standard-deviation-concept"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A quality report lists $50$ measured pipe diameters, in millimeters, with a mean of $60$ millimeters and a standard deviation of $\\sigma$ millimeters. Each diameter is converted to centimeters and then increased by $3$ centimeters to record an outer bound. In terms of $\\sigma$, what is the standard deviation, in centimeters, of the recorded outer bounds?",
      choices: [
        { id: "A", text: "$\\frac{\\sigma}{10}$" },
        // distractor: adds the 3-centimeter allowance to the spread, but a shift moves every value equally
        { id: "B", text: "$\\frac{\\sigma}{10} + 3$" },
        // distractor: adds 3 before dividing, which again lets the shift reach the spread
        { id: "C", text: "$\\frac{\\sigma + 3}{10}$" },
        // distractor: multiplies by 10 instead of dividing, converting centimeters to millimeters
        { id: "D", text: "$10\\sigma$" }
      ],
      correctAnswer: "A",
      hint: "Only one of the two operations changes how far the values sit from each other.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~25s):** Dividing every diameter by $10$ divides the standard deviation by $10$; adding $3$ centimeters changes nothing about the spread.\n\n**The Full Solution:**\nStep 1: Handle the unit change. One centimeter is $10$ millimeters, so each diameter in centimeters is the millimeter value divided by $10$, and the standard deviation becomes $\\frac{\\sigma}{10}$ centimeters.\nStep 2: Handle the shift. Adding $3$ centimeters to every value slides the whole data set without changing any distance between values, so the standard deviation is unchanged.\nStep 3: Test two diameters. If two pipes measure $60$ and $80$ millimeters, they become $6$ and $8$ centimeters, then $9$ and $11$ centimeters. The gap shrinks from $20$ to $2$ and then stays at $2$. ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{\\sigma}{10} + 3$): adds the allowance to the spread. Every value moved up by the same $3$, so no distance between values changed.\n* Choice C ($\\frac{\\sigma + 3}{10}$): adds the $3$ before dividing, again letting a shift reach the spread.\n* Choice D ($10\\sigma$): multiplies by $10$, which would convert centimeters into millimeters — the wrong direction.\n\n**Test Day Takeaway:** Scaling multiplies the standard deviation; shifting leaves it alone. The mean of $60$ is a distractor: a spread question never needs the center.",
      skills: ["standard-deviation-concept"]
    }
  ],

  // Section: Margin of Error
  "Margin of Error": [
    {
      id: 1,
      difficulty: "easy",
      question: "A random sample of $240$ bottles was taken from a filling line. Using the sample, the mean volume of a bottle from the line was estimated to be $502$ milliliters, with an associated margin of error of $3$ milliliters. Which conclusion about the mean volume of all bottles from this line is most appropriate?",
      choices: [
        { id: "A", text: "It is plausible that the mean volume is between $499$ and $505$ milliliters." },
        // distractor: names values below the interval, which the sample gives no support for.
        { id: "B", text: "It is plausible that the mean volume is less than $499$ milliliters." },
        // distractor: names values above the interval, which the sample also gives no support for.
        { id: "C", text: "It is plausible that the mean volume is greater than $505$ milliliters." },
        // distractor: treats the sample estimate as exact, but a margin of error exists precisely because the population value is not pinned down.
        { id: "D", text: "The mean volume is exactly $502$ milliliters." }
      ],
      correctAnswer: "A",
      hint: "The margin of error marks off an interval on both sides of the estimate.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** Plausible values run from $502 - 3$ to $502 + 3$, that is, from $499$ to $505$ milliliters.\n\n**The Full Solution:**\nStep 1: An estimate reported with a margin of error describes an interval of plausible values for the population quantity.\nStep 2: Subtract and add the margin of error: $502 - 3 = 499$ and $502 + 3 = 505$.\nStep 3: So it is plausible that the mean volume of all bottles from the line is between $499$ and $505$ milliliters. Check: the interval is centered at the estimate and is $2(3) = 6$ milliliters wide. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: names values below the interval, which the sample gives no support for.\n* Choice C: names values above the interval, which the sample also gives no support for.\n* Choice D: treats the sample estimate as exact, but a margin of error exists precisely because the population value is not pinned down.\n\n**Test Day Takeaway:** Estimate plus or minus margin of error gives the whole interval of plausible values. Report the interval, not a single number and not a one-sided claim.",
      skills: ["margin-of-error"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A biologist will estimate the mean wing length of a species of moth and report the estimate with an associated margin of error. The biologist is deciding between a random sample of $150$ moths and a random sample of $600$ moths. Compared with the smaller sample, using the larger sample would most likely produce which result?",
      choices: [
        { id: "A", text: "A smaller margin of error" },
        // distractor: reverses the relationship; more data narrows the interval rather than widening it.
        { id: "B", text: "A larger margin of error" },
        // distractor: changes the estimate itself, but sample size does not push the estimated mean up.
        { id: "C", text: "A greater estimated mean wing length" },
        // distractor: also changes the estimate rather than the margin of error, and gives no reason a larger sample would lower it.
        { id: "D", text: "A smaller estimated mean wing length" }
      ],
      correctAnswer: "A",
      hint: "More data from the same population pins the estimate down more tightly.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** A larger random sample from the same population generally produces a smaller margin of error.\n\n**The Full Solution:**\nStep 1: The margin of error measures how much the estimate could differ from the true population value.\nStep 2: A larger random sample gives more information about the population, so the estimate is less variable.\nStep 3: Therefore the sample of $600$ moths would most likely give a smaller margin of error than the sample of $150$ moths. Check: sample size affects the width of the interval, not where it is centered. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: reverses the relationship; more data narrows the interval rather than widening it.\n* Choice C: changes the estimate itself, but sample size does not push the estimated mean up.\n* Choice D: also changes the estimate rather than the margin of error, and gives no reason a larger sample would lower it.\n\n**Test Day Takeaway:** Sample size controls the width of the interval, not its center. Larger random sample, smaller margin of error.",
      skills: ["margin-of-error"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A random sample of $800$ residents of a town were asked which of three transit options they prefer. The table gives the number of sampled residents who chose each option. Based on this sample, which of the following is the best estimate of the number of the town’s $26{,}000$ residents who prefer option B?",
      diagram: { type: "dataTable", params: { headers: ["Transit option", "Number of sampled residents"], rows: [["A", "296"], ["B", "344"], ["C", "160"], ["Total", "800"]] } },
      choices: [
        // distractor: reports the number of sampled residents choosing option B rather than the estimate for the town.
        { id: "A", text: "$344$" },
        // distractor: applies option A’s sample proportion, $\frac{296}{800}$, to the town.
        { id: "B", text: "$9{,}620$" },
        { id: "C", text: "$11{,}180$" },
        // distractor: estimates the residents who did not choose option B, $\frac{456}{800}(26{,}000)$.
        { id: "D", text: "$14{,}820$" }
      ],
      correctAnswer: "C",
      hint: "Convert the sample count to a proportion before applying it to the whole town.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~35s):** The sample proportion choosing option B is $\\frac{344}{800} = 0.43$, and $0.43(26{,}000) = 11{,}180$.\n\n**The Full Solution:**\nStep 1: Of the $800$ residents sampled, $344$ chose option B, so the sample proportion is $\\frac{344}{800} = 0.43$.\nStep 2: A random sample is used to estimate the same proportion in the whole population.\nStep 3: Apply the proportion to the town: $0.43(26{,}000) = 11{,}180$ residents. Check: $296 + 344 + 160 = 800$, so the three options account for the entire sample. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($344$): reports the number of sampled residents choosing option B rather than the estimate for the town.\n* Choice B ($9{,}620$): applies option A’s sample proportion, $\\frac{296}{800}$, to the town.\n* Choice D ($14{,}820$): estimates the residents who did not choose option B, $\\frac{456}{800}(26{,}000)$.\n\n**Test Day Takeaway:** To scale a sample result to a population, turn the count into a proportion first, then multiply by the population size.",
      skills: ["margin-of-error"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "In a poll of a random sample of likely voters, candidate Okafor was preferred by $51\\%$ of those sampled and candidate Villar by $49\\%$, each estimate reported with a margin of error of $3$ percentage points. Which conclusion about the preferences of all likely voters is most appropriate?",
      choices: [
        // distractor: treats the $51\%$ estimate as decisive, but values as low as $48\%$ are plausible for Okafor.
        { id: "A", text: "Okafor is preferred by more than half of all likely voters." },
        // distractor: $46\%$ is the lower end of Villar’s interval, so values below it are exactly the ones the poll does not support.
        { id: "B", text: "Villar is preferred by fewer than $46\\%$ of all likely voters." },
        { id: "C", text: "It is plausible that Villar is preferred by more likely voters than Okafor." },
        // distractor: reports the sample percentage as the population percentage, which the margin of error rules out as a conclusion.
        { id: "D", text: "Exactly $51\\%$ of all likely voters prefer Okafor." }
      ],
      correctAnswer: "C",
      hint: "Write out both intervals of plausible values and see whether they overlap.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** Plausible values run from $48\\%$ to $54\\%$ for Okafor and from $46\\%$ to $52\\%$ for Villar. The intervals overlap, so either candidate could be ahead.\n\n**The Full Solution:**\nStep 1: Okafor’s interval of plausible values is $51\\% \\pm 3\\%$, from $48\\%$ to $54\\%$.\nStep 2: Villar’s interval is $49\\% \\pm 3\\%$, from $46\\%$ to $52\\%$.\nStep 3: The intervals overlap between $48\\%$ and $52\\%$, so a support level for Villar above Okafor’s is plausible. Check: for example, $50\\%$ for Villar and $49\\%$ for Okafor lie inside both intervals. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A: treats the $51\\%$ estimate as decisive, but values as low as $48\\%$ are plausible for Okafor.\n* Choice B: $46\\%$ is the lower end of Villar’s interval, so values below it are exactly the ones the poll does not support.\n* Choice D: reports the sample percentage as the population percentage, which the margin of error rules out as a conclusion.\n\n**Test Day Takeaway:** When two estimates come with margins of error, compare the intervals, not the two headline numbers. Overlapping intervals mean no lead can be claimed.",
      skills: ["margin-of-error"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A random sample of residents of a town with $12{,}000$ residents was surveyed. Based on the survey, the percentage of all residents who hold a library card was estimated to be $68\\%$, with an associated margin of error of $2.5$ percentage points. Which conclusion about the number of residents of the town who hold a library card is most appropriate?",
      choices: [
        { id: "A", text: "It is plausible that between $7{,}860$ and $8{,}460$ residents hold a library card." },
        // distractor: names counts below the interval, which correspond to percentages the survey does not support.
        { id: "B", text: "It is plausible that fewer than $7{,}860$ residents hold a library card." },
        // distractor: names counts above the interval, which correspond to percentages above $70.5\%$.
        { id: "C", text: "It is plausible that more than $8{,}460$ residents hold a library card." },
        // distractor: converts the point estimate to a count but reports it as exact, ignoring the margin of error entirely.
        { id: "D", text: "Exactly $8{,}160$ residents hold a library card." }
      ],
      correctAnswer: "A",
      hint: "Turn the two ends of the percentage interval into counts before choosing.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~50s):** Plausible percentages run from $65.5\\%$ to $70.5\\%$; applied to $12{,}000$ residents that is $7{,}860$ to $8{,}460$.\n\n**The Full Solution:**\nStep 1: The interval of plausible percentages is $68\\% \\pm 2.5\\%$, from $65.5\\%$ to $70.5\\%$.\nStep 2: Convert each end to a number of residents: $0.655(12{,}000) = 7{,}860$ and $0.705(12{,}000) = 8{,}460$.\nStep 3: So it is plausible that between $7{,}860$ and $8{,}460$ residents hold a library card. Check: the estimate itself, $0.68(12{,}000) = 8{,}160$, sits at the center of that interval. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B: names counts below the interval, which correspond to percentages the survey does not support.\n* Choice C: names counts above the interval, which correspond to percentages above $70.5\\%$.\n* Choice D: converts the point estimate to a count but reports it as exact, ignoring the margin of error entirely.\n\n**Test Day Takeaway:** Convert both endpoints of the percentage interval before answering a count question; converting only the estimate throws away the margin of error.",
      skills: ["margin-of-error"]
    }
  ]
};
