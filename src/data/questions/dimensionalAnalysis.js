// Practice questions for Dimensional Analysis module
// Questions are organized by SECTION (question type)

export const dimensionalAnalysisQuestions = {
  // Section: Unit Conversion Basics
  "Unit Conversion Basics": [
    {
      id: 1,
      difficulty: "easy",
      question: "A bookshelf is $7.5$ feet tall. Given that $1$ foot is equal to $12$ inches, what is the height of the bookshelf, in inches?",
      choices: [
        { id: "A", text: "$0.625$" },
        { id: "B", text: "$19.5$" },
        { id: "C", text: "$84$" },
        { id: "D", text: "$90$" }
      ],
      correctAnswer: "D",
      hint: "An inch is smaller than a foot, so the number of inches must come out larger than the number of feet.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~10s):** $7.5(12)=90$ inches — choice D.\n\n**The Full Solution:**\nStep 1: Set up the conversion so the unwanted unit cancels: $7.5\\text{ feet}\\times\\frac{12\\text{ inches}}{1\\text{ foot}}$.\nStep 2: The unit of feet cancels, leaving $7.5(12)=90$ inches.\nStep 3: Check: $7$ feet is $84$ inches and the extra half foot is $6$ inches, so $84+6=90$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.625$): divides by $12$ instead of multiplying: $7.5\\div 12=0.625$, which would shrink the measurement rather than expressing it in smaller units.\n* Choice B ($19.5$): adds the conversion factor to the measurement: $7.5+12=19.5$.\n* Choice C ($84$): converts only the whole number of feet, $7(12)=84$, and drops the extra $0.5$ foot.\n\n**Test Day Takeaway:** Write the conversion factor as a fraction and let the unit cancel. Converting to a smaller unit always multiplies, so the count goes up.",
      skills: ["unit-conversion"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A conveyor belt carries boxes past a scanner at a constant rate of $2{,}700$ boxes per hour. At this rate, how many boxes pass the scanner per minute?",
      choices: [
        { id: "A", text: "$0.75$" },
        { id: "B", text: "$27$" },
        { id: "C", text: "$45$" },
        { id: "D", text: "$162{,}000$" }
      ],
      correctAnswer: "C",
      hint: "A minute is a small slice of an hour, so the count per minute must be far smaller than the count per hour.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** There are $60$ minutes in an hour, so $\\frac{2{,}700}{60}=45$ boxes per minute — choice C.\n\n**The Full Solution:**\nStep 1: Write the rate as a fraction: $\\frac{2{,}700\\text{ boxes}}{1\\text{ hour}}$.\nStep 2: Multiply by $\\frac{1\\text{ hour}}{60\\text{ minutes}}$ so that hours cancel: $\\frac{2{,}700}{60}$ boxes per minute.\nStep 3: Divide: $\\frac{2{,}700}{60}=45$ boxes per minute. Check: $45(60)=2{,}700$ boxes in one hour. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.75$): divides by $3{,}600$, converting all the way to boxes per second instead of boxes per minute.\n* Choice B ($27$): divides by $100$, treating an hour as $100$ minutes.\n* Choice D ($162{,}000$): multiplies by $60$ instead of dividing, which scales the rate up when a shorter time interval must scale it down.\n\n**Test Day Takeaway:** Decide the direction before you compute: a shorter time interval means a smaller count, so the $60$ belongs in the denominator.",
      skills: ["unit-conversion", "rate-conversion"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The table gives the mass, in grams, of each of four mineral samples collected on a field trip. Given that $1$ kilogram is equal to $1{,}000$ grams, what is the total mass of the four samples, in kilograms?",
      diagram: { type: "dataTable", params: { headers: ["Sample", "Mass (grams)"], rows: [["W", "1,250"], ["X", "860"], ["Y", "2,340"], ["Z", "550"]] } },
      choices: [
        { id: "A", text: "$0.5$" },
        { id: "B", text: "$5$" },
        { id: "C", text: "$50$" },
        { id: "D", text: "$5{,}000$" }
      ],
      correctAnswer: "B",
      hint: "Combine the four masses in the unit the table uses, then convert the single total once.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The masses total $5{,}000$ grams, and $\\frac{5{,}000}{1{,}000}=5$ kilograms — choice B.\n\n**The Full Solution:**\nStep 1: Add the four masses in grams: $1{,}250+860+2{,}340+550=5{,}000$ grams.\nStep 2: Convert once, at the end: $5{,}000\\text{ grams}\\times\\frac{1\\text{ kilogram}}{1{,}000\\text{ grams}}$.\nStep 3: The grams cancel, leaving $\\frac{5{,}000}{1{,}000}=5$ kilograms. Check: $5$ kilograms is $5(1{,}000)=5{,}000$ grams, the total from step 1. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.5$): divides the total by $10{,}000$ rather than $1{,}000$.\n* Choice C ($50$): divides by $100$, as if a kilogram were $100$ grams.\n* Choice D ($5{,}000$): reports the correct total but leaves it in grams, never performing the conversion the question asks for.\n\n**Test Day Takeaway:** Convert once, after the arithmetic, not sample by sample — fewer conversions means fewer places to slip a factor of ten.",
      skills: ["unit-conversion"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A soil-coring drill advances $k$ centimeters each second while sampling a field plot, and a technician must record the drill's rate in meters per hour. Which expression gives that recorded rate?",
      choices: [
        // distractor: uses 1 meter = 10,000 centimeters
        { id: "A", text: "$0.36k$" },
        // distractor: uses 1 meter = 1,000 centimeters
        { id: "B", text: "$3.6k$" },
        { id: "C", text: "$36k$" },
        // distractor: uses 1 meter = 10 centimeters
        { id: "D", text: "$360k$" }
      ],
      correctAnswer: "C",
      hint: "Convert the seconds and the centimeters one at a time.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** $k$ cm/s is $3600k$ cm/h, and dividing by $100$ gives $36k$ meters per hour.\n\n**The Full Solution:**\nStep 1: There are $3600$ seconds in an hour, so the drill advances $3600k$ centimeters per hour.\nStep 2: There are $100$ centimeters in a meter, so divide by $100$.\nStep 3: $\\dfrac{3600k}{100} = 36k$ meters per hour. Check with $k = 1$: $1$ cm/s is $36$ m/h, since $3600$ cm is $36$ m ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.36k$): divides by $10{,}000$, the number of square centimeters in a square meter.\n* Choice B ($3.6k$): divides by $1000$, treating centimeters as millimeters.\n* Choice D ($360k$): divides by $10$, as if a meter held only $10$ centimeters.\n\n**Test Day Takeaway:** Convert one unit at a time and write each conversion as a fraction so the unwanted units cancel.",
      skills: ["unit-conversion", "rate-conversion"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A bottling machine fills $r$ bottles each minute, where $r$ is a positive constant. Which expression represents the number of bottles the machine fills in $h$ hours, if it operates at this constant rate for the entire time?",
      choices: [
        { id: "A", text: "$\\frac{rh}{60}$" },
        { id: "B", text: "$\\frac{60h}{r}$" },
        { id: "C", text: "$60rh$" },
        { id: "D", text: "$3{,}600rh$" }
      ],
      correctAnswer: "C",
      hint: "Check any candidate with easy numbers: one bottle per minute for one hour has an answer you already know.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** $h$ hours is $60h$ minutes, and each minute yields $r$ bottles: $60hr$ bottles — choice C.\n\n**The Full Solution:**\nStep 1: Convert the operating time to the unit the rate uses: $h\\text{ hours}\\times\\frac{60\\text{ minutes}}{1\\text{ hour}}=60h$ minutes.\nStep 2: Multiply the number of minutes by the number of bottles filled each minute: $(60h)(r)=60rh$ bottles.\nStep 3: Check the units: $\\frac{\\text{bottles}}{\\text{minute}}\\times\\text{minutes}$ leaves bottles, which is what the question asks for.\nStep 4: Check with numbers: at $r=1$ and $h=1$ the machine fills $1$ bottle per minute for $60$ minutes, so $60$ bottles, and $60(1)(1)=60$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{rh}{60}$): divides by $60$ instead of multiplying, which would be right only if the rate were per hour and the answer were wanted per minute.\n* Choice B ($\\frac{60h}{r}$): inverts the rate, treating $r$ as minutes per bottle rather than bottles per minute.\n* Choice D ($3{,}600rh$): uses $3{,}600$, the number of seconds in an hour, even though the rate is given per minute.\n\n**Test Day Takeaway:** With letters instead of numbers, substitute $r=1$ and $h=1$: the arithmetic becomes trivial and only one expression survives.",
      skills: ["unit-conversion"]
    }
  ],

  // Section: Squared & Cubic Units
  "Squared & Cubic Units": [
    {
      id: 1,
      difficulty: "easy",
      question: "A rectangular rug covers an area of $15$ square yards. Given that $1$ yard is equal to $3$ feet, what is the area of the rug, in square feet?",
      choices: [
        { id: "A", text: "$45$" },
        { id: "B", text: "$90$" },
        { id: "C", text: "$135$" },
        { id: "D", text: "$405$" }
      ],
      correctAnswer: "C",
      hint: "A square yard is a square that is one yard on each side — picture how many one-foot squares fit inside it.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** One square yard holds $3^{2}=9$ square feet, so $15(9)=135$ square feet — choice C.\n\n**The Full Solution:**\nStep 1: A square yard is a $3$-foot by $3$-foot square, so it contains $3(3)=9$ square feet.\nStep 2: The area conversion therefore multiplies by $9$, not by $3$: $15(9)=135$ square feet.\nStep 3: Check with a concrete rug: a $5$-yard by $3$-yard rug has area $15$ square yards, and in feet it is $15$ by $9$, an area of $135$ square feet. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($45$): multiplies by the linear factor $3$ instead of its square.\n* Choice B ($90$): doubles the linear factor, using $2(3)=6$ where squaring is required.\n* Choice D ($405$): cubes the factor, $3^{3}=27$, which converts volumes rather than areas.\n\n**Test Day Takeaway:** Squaring a unit squares its conversion factor. Draw the one-unit square once and the factor of $9$ is obvious rather than memorized.",
      skills: ["squared-cubed-units"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A solar panel has an area of $2.4$ square meters. Given that $1$ meter is equal to $100$ centimeters, what is the area of the panel, in square centimeters?",
      choices: [
        { id: "A", text: "$0.024$" },
        { id: "B", text: "$240$" },
        { id: "C", text: "$24{,}000$" },
        { id: "D", text: "$2{,}400{,}000$" }
      ],
      correctAnswer: "C",
      hint: "Apply the conversion factor once for each dimension of the unit.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** A square meter is $100^{2}=10{,}000$ square centimeters, so $2.4(10{,}000)=24{,}000$ — choice C.\n\n**The Full Solution:**\nStep 1: A square meter is a $100$-centimeter by $100$-centimeter square, so it contains $100^{2}=10{,}000$ square centimeters.\nStep 2: Multiply: $2.4(10{,}000)=24{,}000$ square centimeters.\nStep 3: Check with dimensions: a panel $2$ meters by $1.2$ meters has area $2.4$ square meters, and $200$ centimeters by $120$ centimeters gives $24{,}000$ square centimeters. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.024$): divides by $100$ instead of multiplying, converting in the wrong direction entirely.\n* Choice B ($240$): multiplies by the linear factor $100$ rather than $100^{2}$.\n* Choice D ($2{,}400{,}000$): multiplies by $100^{3}=1{,}000{,}000$, the factor for volume, not area.\n\n**Test Day Takeaway:** The exponent on the unit is the exponent on the conversion factor: squared units square it, cubic units cube it.",
      skills: ["squared-cubed-units"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A storage crate is a rectangular box whose interior measures $50$ centimeters by $40$ centimeters by $30$ centimeters. Given that $1$ meter is equal to $100$ centimeters, what is the interior volume of the crate, in cubic meters?",
      choices: [
        { id: "A", text: "$0.00006$" },
        { id: "B", text: "$0.06$" },
        { id: "C", text: "$6$" },
        { id: "D", text: "$60$" }
      ],
      correctAnswer: "B",
      hint: "Find the volume in the units the dimensions are already given in, then convert that single number.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** The volume is $50(40)(30)=60{,}000$ cubic centimeters, and a cubic meter is $100^{3}=1{,}000{,}000$ of them: $\\frac{60{,}000}{1{,}000{,}000}=0.06$ — choice B.\n\n**The Full Solution:**\nStep 1: Volume in the given units: $50(40)(30)=60{,}000$ cubic centimeters.\nStep 2: A cubic meter is a $100$-centimeter cube, so it contains $100^{3}=1{,}000{,}000$ cubic centimeters.\nStep 3: Divide, because a cubic meter is the larger unit: $\\frac{60{,}000}{1{,}000{,}000}=0.06$ cubic meter.\nStep 4: Check by converting the edges first: $0.5$ by $0.4$ by $0.3$ meter gives $0.06$ cubic meter. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.00006$): divides by $1{,}000^{3}$, the factor that would apply if the dimensions were in millimeters.\n* Choice C ($6$): divides by $100^{2}=10{,}000$, the area factor, on a volume.\n* Choice D ($60$): divides by $1{,}000$, borrowing the milliliter-to-liter factor instead of cubing $100$.\n\n**Test Day Takeaway:** Either cube the conversion factor at the end or convert each edge at the start — both work, and doing one of them all the way is safer than mixing.",
      skills: ["squared-cubed-units"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives the length and the width, in feet, of each of the three rectangular sections of a lobby floor. Given that $1$ yard is equal to $3$ feet, what is the combined area of the three sections, in square yards?",
      diagram: { type: "dataTable", params: { headers: ["Section", "Length (feet)", "Width (feet)"], rows: [["A", "12", "9"], ["B", "15", "12"], ["C", "6", "9"]] } },
      choices: [
        { id: "A", text: "$38$" },
        { id: "B", text: "$114$" },
        { id: "C", text: "$342$" },
        { id: "D", text: "$3{,}078$" }
      ],
      correctAnswer: "A",
      hint: "Total the three areas in square feet first; only the last step involves yards.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** The sections total $108+180+54=342$ square feet, and $\\frac{342}{9}=38$ square yards — choice A.\n\n**The Full Solution:**\nStep 1: Find each area in square feet: $12(9)=108$, $15(12)=180$, and $6(9)=54$.\nStep 2: Add them: $108+180+54=342$ square feet.\nStep 3: A square yard is $3^{2}=9$ square feet, so divide: $\\frac{342}{9}=38$ square yards.\nStep 4: Check: $38$ square yards is $38(9)=342$ square feet, the total from step 2. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($114$): divides by the linear factor $3$ instead of $3^{2}$: $\\frac{342}{3}=114$.\n* Choice C ($342$): reports the combined area in square feet without converting to square yards.\n* Choice D ($3{,}078$): multiplies by $9$ instead of dividing: $342(9)=3{,}078$, which converts in the wrong direction.\n\n**Test Day Takeaway:** Converting to a larger unit divides, and for an area the divisor is the square of the linear factor — check the direction and the exponent separately.",
      skills: ["squared-cubed-units"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "An empty tank with a capacity of $4.5$ cubic feet is filled at a constant rate of $216$ cubic inches per second. Given that $1$ foot is equal to $12$ inches, how many seconds does it take to fill the tank?",
      choices: [
        { id: "A", text: "$0.25$" },
        { id: "B", text: "$3$" },
        { id: "C", text: "$36$" },
        { id: "D", text: "$1{,}679{,}616$" }
      ],
      correctAnswer: "C",
      hint: "The capacity and the rate are stated in different cubic units; make them agree before you divide.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~40s):** A cubic foot is $12^{3}=1{,}728$ cubic inches, so the tank holds $4.5(1{,}728)=7{,}776$ cubic inches, and $\\frac{7{,}776}{216}=36$ seconds — choice C.\n\n**The Full Solution:**\nStep 1: A cubic foot is a $12$-inch cube, so it contains $12^{3}=1{,}728$ cubic inches.\nStep 2: Convert the capacity: $4.5(1{,}728)=7{,}776$ cubic inches.\nStep 3: Divide the capacity by the rate: $\\frac{7{,}776\\text{ cubic inches}}{216\\text{ cubic inches per second}}=36$ seconds.\nStep 4: Check: in $36$ seconds the tank receives $36(216)=7{,}776$ cubic inches, which is $\\frac{7{,}776}{1{,}728}=4.5$ cubic feet. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($0.25$): converts with the linear factor $12$: $\\frac{4.5(12)}{216}=\\frac{54}{216}=0.25$.\n* Choice B ($3$): converts with the square factor $144$: $\\frac{4.5(144)}{216}=\\frac{648}{216}=3$.\n* Choice D ($1{,}679{,}616$): multiplies by the rate instead of dividing by it: $7{,}776(216)=1{,}679{,}616$.\n\n**Test Day Takeaway:** When a rate and a capacity carry different units, convert first and divide second. For cubic units the factor is the linear factor cubed — $12$, $144$, and $1{,}728$ are three different answers.",
      skills: ["squared-cubed-units"]
    }
  ]
};
