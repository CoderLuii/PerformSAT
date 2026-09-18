// Practice questions for Volume module
// Questions are organized by SECTION (question type)

export const volumeQuestions = {
  // Section: Fundamentals
  "Fundamentals": [
    {
      id: 1,
      difficulty: "easy",
      question: "The length, the width, and the height of a rectangular box are each measured in centimeters. In which of the following units is the volume of the box expressed?",
      choices: [
        // distractor: the unit of a single length, not of a volume
        { id: "A", text: "Centimeters" },
        // distractor: the unit of an area, such as the area of one face of the box
        { id: "B", text: "Square centimeters" },
        { id: "C", text: "Cubic centimeters" },
        // distractor: a rate, which measures speed rather than how much the box holds
        { id: "D", text: "Centimeters per second" }
      ],
      correctAnswer: "C",
      hint: "Count how many measurements are multiplied together to get the answer.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~10s):** Volume multiplies three lengths, so the unit is centimeters cubed.\n\n**The Full Solution:**\nStep 1: The volume of a rectangular box is the product of its length, its width, and its height.\nStep 2: Each of those three factors is measured in centimeters, so the product carries the unit $\\text{cm} \\cdot \\text{cm} \\cdot \\text{cm}$.\nStep 3: That product is $\\text{cm}^3$, read as cubic centimeters.\n\nVerification: A box measuring $2$ by $3$ by $4$ centimeters holds $24$ unit cubes, each $1$ cubic centimeter. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (Centimeters): the unit of a single length, not of a volume.\n* Choice B (Square centimeters): the unit of an area, such as the area of one face of the box.\n* Choice D (Centimeters per second): a rate, which measures speed rather than how much the box holds.\n\n**Test Day Takeaway:** Count how many length factors are multiplied: one gives length units, two gives square units, three gives cubic units.",
      skills: ["volume-scaling", "volume-prism"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A produce distributor replaces each rectangular crate of canned tomatoes with a crate whose length, width, and height are each $3$ times those of the original crate. The volume of the new crate is how many times the volume of the original crate?",
      choices: [
        // distractor: applies the scale factor once, as if volume were proportional to a single length
        { id: "A", text: "$3$" },
        // distractor: squares the scale factor, which is how area scales, not volume
        { id: "B", text: "$9$" },
        { id: "C", text: "$27$" },
        // distractor: multiplies by the scale factor a fourth time: 3 to the fourth power = 81
        { id: "D", text: "$81$" }
      ],
      correctAnswer: "C",
      hint: "A crate measuring $1$ by $1$ by $1$ is the quickest case to test.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~15s):** Every one of the three dimensions is tripled, so the volume is multiplied by $3 \\cdot 3 \\cdot 3 = 27$.\n\n**The Full Solution:**\nStep 1: Let the original crate have length $\\ell$, width $w$, and height $h$, so its volume is $V = \\ell w h$.\nStep 2: The new crate has dimensions $3\\ell$, $3w$, and $3h$, so its volume is $(3\\ell)(3w)(3h) = 27\\ell w h$.\nStep 3: Dividing, $\\frac{27 \\ell w h}{\\ell w h} = 27$. Check: a $1 \\times 1 \\times 1$ crate has volume $1$ and its enlargement is $3 \\times 3 \\times 3$, with volume $27$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): applies the scale factor once, as if volume were proportional to a single length.\n* Choice B ($9$): squares the factor, giving $3^2 = 9$ — the way area scales, not volume.\n* Choice D ($81$): multiplies by the factor one time too many, giving $3^4 = 81$.\n\n**Test Day Takeaway:** Scaling every dimension by $k$ multiplies length by $k$, area by $k^2$, and volume by $k^3$ — count the dimensions, then match the exponent.",
      skills: ["volume-scaling", "volume-prism"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "The volume of a right prism is $V = Bh$, where $B$ is the area of a base and $h$ is the height. If the base area of a right prism is tripled and its height is unchanged, how does the volume of the prism change?",
      choices: [
        // distractor: divides by $3$ instead of multiplying by it
        { id: "A", text: "It is multiplied by $\\frac{1}{3}$." },
        { id: "B", text: "It is multiplied by $3$." },
        // distractor: squares the factor, as if two dimensions had changed
        { id: "C", text: "It is multiplied by $9$." },
        // distractor: cubes the factor, as if all three dimensions had changed
        { id: "D", text: "It is multiplied by $27$." }
      ],
      correctAnswer: "B",
      hint: "Only one of the two quantities in the formula changed.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~20s):** $V = Bh$ is a single product, so tripling $B$ triples $V$.\n\n**The Full Solution:**\nStep 1: The original volume is $V = Bh$.\nStep 2: Replacing $B$ with $3B$ while keeping $h$ gives $V^{\\prime} = (3B)h = 3(Bh)$.\nStep 3: So $V^{\\prime} = 3V$, three times the original volume.\n\nVerification: A prism with $B = 10$ and $h = 4$ has $V = 40$; with $B = 30$ and $h = 4$ it has $V = 120 = 3(40)$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A (It is multiplied by $\\frac{1}{3}$.): divides by $3$ instead of multiplying by it.\n* Choice C (It is multiplied by $9$.): squares the factor, as if two dimensions had changed.\n* Choice D (It is multiplied by $27$.): cubes the factor, as if all three dimensions had changed.\n\n**Test Day Takeaway:** Only the quantities that actually change contribute a factor — a tripled base area is one factor of $3$, not three of them.",
      skills: ["volume-scaling", "volume-prism"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A cube has edges of length $2$ feet. Given that $1$ foot is equal to $12$ inches, what is the volume, in cubic inches, of the cube?",
      choices: [
        // distractor: multiplies the volume in cubic feet by $12$ once
        { id: "A", text: "$96$" },
        // distractor: squares the edge length in inches instead of cubing it
        { id: "B", text: "$576$" },
        // distractor: multiplies the volume in cubic feet by $12^2$
        { id: "C", text: "$1{,}152$" },
        { id: "D", text: "$13{,}824$" }
      ],
      correctAnswer: "D",
      hint: "Change the edge into inches before you raise anything to the third power.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~35s):** The edge is $24$ inches, so the volume is $24^3 = 13{,}824$ cubic inches.\n\n**The Full Solution:**\nStep 1: Convert the edge length first: $2$ feet is $2(12) = 24$ inches.\nStep 2: The volume of a cube is $s^3$, so $V = 24^3$.\nStep 3: $24^3 = 13{,}824$ cubic inches.\n\nVerification: The cube holds $8$ cubic feet, and $8(12^3) = 8(1{,}728) = 13{,}824$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($96$): multiplies the volume in cubic feet by $12$ once.\n* Choice B ($576$): squares the edge length in inches instead of cubing it.\n* Choice C ($1{,}152$): multiplies the volume in cubic feet by $12^2$.\n\n**Test Day Takeaway:** Convert the length before cubing, or convert the volume using the cube of the conversion factor — never the factor by itself.",
      skills: ["volume-scaling", "volume-prism"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "The table gives the volume of each of two cubes. The surface area of cube $Q$ is $k$ times the surface area of cube $P$. What is the value of $k$?",
      questionTable: { headers: ["Cube", "Volume (cubic inches)"], rows: [["P", "27"], ["Q", "216"]] },
      choices: [
        // distractor: gives the ratio of the edge lengths rather than of the surface areas
        { id: "A", text: "$2$" },
        { id: "B", text: "$4$" },
        // distractor: gives the ratio of the volumes, $\frac{216}{27}$
        { id: "C", text: "$8$" },
        // distractor: squares the volume ratio instead of squaring the edge ratio
        { id: "D", text: "$64$" }
      ],
      correctAnswer: "B",
      hint: "Get back to an edge length from each volume before comparing anything.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~60s):** The edges are $3$ and $6$, so the surface areas are in the ratio $\\left(\\frac{6}{3}\\right)^2 = 4$.\n\n**The Full Solution:**\nStep 1: A cube of volume $V$ has edge $\\sqrt[3]{V}$, so cube $P$ has edge $3$ inches and cube $Q$ has edge $6$ inches.\nStep 2: The ratio of the edges is $\\frac{6}{3} = 2$.\nStep 3: Surface area scales by the square of the edge ratio, so $k = 2^2 = 4$.\n\nVerification: The surface areas are $6(3^2) = 54$ and $6(6^2) = 216$, and $\\frac{216}{54} = 4$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2$): gives the ratio of the edge lengths rather than of the surface areas.\n* Choice C ($8$): gives the ratio of the volumes, $\\frac{216}{27}$.\n* Choice D ($64$): squares the volume ratio instead of squaring the edge ratio.\n\n**Test Day Takeaway:** Move from volume to edge with a cube root, then square that ratio to compare surface areas.",
      skills: ["volume-scaling", "volume-prism"]
    }
  ],

  // Section: Rectangular Prism
  "Rectangular Prism": [
    {
      id: 1,
      difficulty: "easy",
      question: "The inside of a library's overnight drop box measures $24$ inches by $18$ inches by $30$ inches. How many cubic inches of space does the drop box enclose when its door is closed?",
      choices: [
        // distractor: adds the three dimensions instead of multiplying them: 24 + 18 + 30 = 72
        { id: "A", text: "$72$" },
        // distractor: multiplies only 24 by 18, leaving out the third dimension
        { id: "B", text: "$432$" },
        // distractor: computes the surface area 2(24 times 18 + 24 times 30 + 18 times 30) = 3384 square inches
        { id: "C", text: "$3{,}384$" },
        { id: "D", text: "$12{,}960$" }
      ],
      correctAnswer: "D",
      hint: "Three perpendicular measurements of a box multiply together, whatever order they are listed in.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** The interior is a rectangular solid, so multiply all three measurements: $24 \\cdot 18 \\cdot 30 = 12{,}960$ cubic inches.\n\n**The Full Solution:**\nStep 1: The volume of a rectangular solid is $V = \\ell w h$, the product of its three perpendicular measurements.\nStep 2: Substituting the given measurements, $V = (24)(18)(30)$.\nStep 3: $24 \\cdot 18 = 432$, and $432 \\cdot 30 = 12{,}960$ cubic inches. Check: $12{,}960 \\div 30 = 432$, the area of the $24$-by-$18$ face ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($72$): adds the three measurements, $24 + 18 + 30 = 72$, instead of multiplying them.\n* Choice B ($432$): multiplies only $24$ by $18$ and stops, leaving out the third measurement.\n* Choice C ($3{,}384$): computes the surface area $2(24 \\cdot 18 + 24 \\cdot 30 + 18 \\cdot 30) = 3{,}384$ square inches.\n\n**Test Day Takeaway:** \"Cubic\" units signal a product of three lengths; \"square\" units signal a product of two — let the unit in the question tell you how many factors to use.",
      skills: ["volume-prism"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A storage bin in the shape of a right rectangular prism has a volume of $270$ cubic inches. Its base is a rectangle measuring $9$ inches by $5$ inches. What is the height, in inches, of the bin?",
      choices: [
        { id: "A", text: "$6$" },
        // distractor: divides by the length only, ignoring the width
        { id: "B", text: "$30$" },
        // distractor: divides by the width only, ignoring the length
        { id: "C", text: "$54$" },
        // distractor: subtracts the two base dimensions from the volume
        { id: "D", text: "$256$" }
      ],
      correctAnswer: "A",
      hint: "Combine the two base measurements into a single number first.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** The base area is $45$, so $h = \\frac{270}{45} = 6$.\n\n**The Full Solution:**\nStep 1: $V = \\ell wh$, so $270 = 9 \\cdot 5 \\cdot h$.\nStep 2: The base area is $9 \\cdot 5 = 45$ square inches, giving $270 = 45h$.\nStep 3: Divide: $h = \\frac{270}{45} = 6$ inches.\n\nVerification: $9 \\cdot 5 \\cdot 6 = 270$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($30$): divides by the length only, ignoring the width.\n* Choice C ($54$): divides by the width only, ignoring the length.\n* Choice D ($256$): subtracts the two base dimensions from the volume.\n\n**Test Day Takeaway:** Collapse the two base dimensions into one base area before dividing.",
      skills: ["volume-prism"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A reservoir with a rectangular base measuring $12$ feet by $8$ feet holds $2{,}400$ cubic feet of water. By how many feet does the water level rise when an additional $960$ cubic feet of water is added?",
      choices: [
        { id: "A", text: "$10$" },
        // distractor: gives the original depth of the water rather than the rise
        { id: "B", text: "$25$" },
        // distractor: gives the new depth rather than the increase
        { id: "C", text: "$35$" },
        // distractor: divides the added volume by the length only
        { id: "D", text: "$80$" }
      ],
      correctAnswer: "A",
      hint: "The base does not change, so only the depth responds to the extra water.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** The base area is $96$ square feet, so the rise is $\\frac{960}{96} = 10$ feet.\n\n**The Full Solution:**\nStep 1: The water forms a rectangular prism whose base area is $12 \\cdot 8 = 96$ square feet.\nStep 2: The added volume equals the base area times the rise: $960 = 96r$.\nStep 3: So $r = \\frac{960}{96} = 10$ feet.\n\nVerification: The depth goes from $\\frac{2400}{96} = 25$ feet to $\\frac{3360}{96} = 35$ feet, a rise of $10$ feet. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($25$): gives the original depth of the water rather than the rise.\n* Choice C ($35$): gives the new depth rather than the increase.\n* Choice D ($80$): divides the added volume by the length only.\n\n**Test Day Takeaway:** When the base is fixed, a change in volume is just a change in height: divide the added volume by the base area.",
      skills: ["volume-prism"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The table gives the dimensions of two right rectangular prisms, $P$ and $Q$. The volume of prism $Q$ is $k$ times the volume of prism $P$. What is the value of $k$?",
      questionTable: { headers: ["Prism", "Length (cm)", "Width (cm)", "Height (cm)"], rows: [["P", "8", "5", "3"], ["Q", "16", "2.5", "3"]] },
      choices: [
        // distractor: uses only the halved width
        { id: "A", text: "$\\frac{1}{2}$" },
        { id: "B", text: "$1$" },
        // distractor: uses only the doubled length
        { id: "C", text: "$2$" },
        // distractor: adds the two changes, $2 + \frac{1}{2}$, instead of multiplying them
        { id: "D", text: "$\\frac{5}{2}$" }
      ],
      correctAnswer: "B",
      hint: "Work out each volume on its own before comparing them.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~30s):** Both prisms have volume $120$ cubic centimeters, so $k = 1$.\n\n**The Full Solution:**\nStep 1: Prism $P$: $V = 8 \\cdot 5 \\cdot 3 = 120$ cubic centimeters.\nStep 2: Prism $Q$: $V = 16 \\cdot 2.5 \\cdot 3 = 120$ cubic centimeters.\nStep 3: So $k = \\frac{120}{120} = 1$.\n\nVerification: The length doubled while the width was halved, and $2 \\cdot \\frac{1}{2} = 1$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{1}{2}$): uses only the halved width.\n* Choice C ($2$): uses only the doubled length.\n* Choice D ($\\frac{5}{2}$): adds the two changes, $2 + \\frac{1}{2}$, instead of multiplying them.\n\n**Test Day Takeaway:** Scale factors on different dimensions multiply, so a doubling and a halving cancel exactly.",
      skills: ["volume-prism"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A carton in the shape of a right rectangular prism has interior dimensions $18$ inches by $12$ inches by $10$ inches. Cubic blocks with edge length $3$ inches are packed inside the carton with their faces parallel to the faces of the carton. What is the greatest number of whole blocks that fit inside?",
      choices: [
        { id: "A", text: "$72$" },
        // distractor: divides the volume of the carton by the volume of a block, ignoring that $10$ is not a multiple of $3$
        { id: "B", text: "$80$" },
        // distractor: divides the volume of the carton by $3^2$ instead of $3^3$
        { id: "C", text: "$240$" },
        // distractor: divides the volume of the carton by $3$ instead of by $3^3$
        { id: "D", text: "$720$" }
      ],
      correctAnswer: "A",
      hint: "Check each dimension on its own — one of them does not divide evenly.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~60s):** $18 \\div 3 = 6$ and $12 \\div 3 = 4$, but only $3$ layers fit along $10$ inches, so $6 \\cdot 4 \\cdot 3 = 72$.\n\n**The Full Solution:**\nStep 1: Blocks stack in whole rows along each edge, so count how many fit along each dimension separately.\nStep 2: Along $18$ inches, $6$ blocks fit; along $12$ inches, $4$ fit; along $10$ inches only $3$ fit, since a fourth layer would need $12$ inches.\nStep 3: The total is $6 \\cdot 4 \\cdot 3 = 72$ blocks.\n\nVerification: Those blocks fill $72(27) = 1{,}944$ cubic inches inside a carton of $2{,}160$ cubic inches, leaving a $1$-inch gap on top. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($80$): divides the volume of the carton by the volume of a block, ignoring that $10$ is not a multiple of $3$.\n* Choice C ($240$): divides the volume of the carton by $3^2$ instead of $3^3$.\n* Choice D ($720$): divides the volume of the carton by $3$ instead of by $3^3$.\n\n**Test Day Takeaway:** Packing questions count blocks along each edge and round each count down; the volume quotient overcounts whenever a dimension does not divide evenly.",
      skills: ["volume-prism"]
    }
  ],

  // Section: Cube
  "Cube": [
    {
      id: 1,
      difficulty: "easy",
      question: "A university archive stores microfilm reels in cube-shaped boxes. The table gives the edge length, in inches, of each of the three box sizes the archive uses. What is the volume, in cubic inches, of one Large box?",
      questionTable: { headers: ["Box size", "Edge length (inches)"], rows: [["Small", "$6$"], ["Medium", "$9$"], ["Large", "$12$"]] },
      choices: [
        // distractor: multiplies the edge by 3 instead of raising it to the third power: 3 times 12 = 36
        { id: "A", text: "$36$" },
        // distractor: stops at 12 squared = 144, the area of one face rather than the volume
        { id: "B", text: "$144$" },
        // distractor: computes the surface area 6 times 12 squared = 864 square inches
        { id: "C", text: "$864$" },
        { id: "D", text: "$1{,}728$" }
      ],
      correctAnswer: "D",
      hint: "Every edge of a cube is the same length, so a single entry from the table fixes all three dimensions.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~15s):** A cube's volume is its edge length cubed, and the Large box has edge $12$ inches, so $V = 12^3 = 1{,}728$ cubic inches.\n\n**The Full Solution:**\nStep 1: The table gives the Large box an edge length of $12$ inches. In a cube the length, width, and height are all equal, so all three are $12$ inches.\nStep 2: The volume of a rectangular solid is $V = \\ell w h$, which for a cube with edge $s$ becomes $V = s^3$. Substituting $s = 12$ gives $V = 12^3$.\nStep 3: $12^3 = 12 \\cdot 12 \\cdot 12 = 1{,}728$ cubic inches. Check: dividing back, $1{,}728 \\div 12 = 144$ and $144 \\div 12 = 12$, returning the edge length ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($36$): multiplies the edge by $3$ instead of raising it to the third power, giving $3 \\cdot 12 = 36$.\n* Choice B ($144$): stops at $12^2 = 144$, which is the area of one square face, not the volume.\n* Choice C ($864$): computes the surface area $6 \\cdot 12^2 = 864$ square inches instead of the volume.\n\n**Test Day Takeaway:** Cubing and squaring differ by one factor of the edge — read the units in the question (cubic inches versus square inches) to confirm which power the answer needs.",
      skills: ["volume-prism", "volume-scaling"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "The volume of a cube is $216$ cubic centimeters. What is the length, in centimeters, of one edge of the cube?",
      choices: [
        { id: "A", text: "$6$" },
        // distractor: divides the volume by $3$ instead of taking a cube root
        { id: "B", text: "$72$" },
        // distractor: halves the volume
        { id: "C", text: "$108$" },
        // distractor: repeats the volume, leaving the cube undone
        { id: "D", text: "$216$" }
      ],
      correctAnswer: "A",
      hint: "Ask which number multiplied by itself three times gives the volume.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~15s):** $6^3 = 216$, so the edge is $6$ centimeters.\n\n**The Full Solution:**\nStep 1: For a cube, $V = s^3$, so $s^3 = 216$.\nStep 2: Undo the cube by taking a cube root: $s = \\sqrt[3]{216}$.\nStep 3: Since $6 \\cdot 6 \\cdot 6 = 216$, the edge is $6$ centimeters.\n\nVerification: $6^3 = 216$, the given volume. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($72$): divides the volume by $3$ instead of taking a cube root.\n* Choice C ($108$): halves the volume.\n* Choice D ($216$): repeats the volume, leaving the cube undone.\n\n**Test Day Takeaway:** Undo a cube with a cube root; dividing by $3$ undoes multiplication, not an exponent.",
      skills: ["volume-prism", "volume-scaling"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A cube has a volume of $64$ cubic feet. A second cube has an edge length that is $3$ times the edge length of the first cube. What is the volume, in cubic feet, of the second cube?",
      choices: [
        // distractor: gives the edge length of the second cube rather than its volume
        { id: "A", text: "$12$" },
        // distractor: multiplies the volume by $3$ instead of by $3^3$
        { id: "B", text: "$192$" },
        // distractor: multiplies the volume by $3^2$
        { id: "C", text: "$576$" },
        { id: "D", text: "$1{,}728$" }
      ],
      correctAnswer: "D",
      hint: "Find the first edge length before scaling anything.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~35s):** The first edge is $4$ feet, the second is $12$ feet, and $12^3 = 1{,}728$.\n\n**The Full Solution:**\nStep 1: $s^3 = 64$ gives $s = 4$ feet for the first cube.\nStep 2: The second cube has edge $3(4) = 12$ feet.\nStep 3: $12^3 = 1{,}728$ cubic feet.\n\nVerification: $64 \\cdot 3^3 = 64(27) = 1{,}728$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($12$): gives the edge length of the second cube rather than its volume.\n* Choice B ($192$): multiplies the volume by $3$ instead of by $3^3$.\n* Choice C ($576$): multiplies the volume by $3^2$.\n\n**Test Day Takeaway:** Tripling an edge multiplies volume by $27$, because the factor applies once for each of the three dimensions.",
      skills: ["volume-prism", "volume-scaling"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A water utility installs cube-shaped rainwater cisterns at two pumping stations. The table gives the interior edge length, in meters, of each cistern. If $1$ cubic meter of water is $1{,}000$ liters, what is the interior volume, in liters, of cistern B?",
      questionTable: { headers: ["Cistern", "Interior edge length (meters)"], rows: [["A", "$0.9$"], ["B", "$1.5$"]] },
      choices: [
        // distractor: cubes the edge correctly but reports 3.375 cubic meters without converting to liters
        { id: "A", text: "$3.375$" },
        // distractor: squares the edge instead of cubing it: 1.5 squared = 2.25, then times 1000 = 2250
        { id: "B", text: "$2{,}250$" },
        { id: "C", text: "$3{,}375$" },
        // distractor: uses the surface area 6 times 1.5 squared = 13.5 in place of the volume, then times 1000 = 13500
        { id: "D", text: "$13{,}500$" }
      ],
      correctAnswer: "C",
      hint: "Find the volume in cubic meters first; the conversion to liters is the last step, not the first.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~25s):** Cistern B holds $1.5^3 = 3.375$ cubic meters, and $3.375 \\cdot 1{,}000 = 3{,}375$ liters.\n\n**The Full Solution:**\nStep 1: The table gives cistern B an interior edge length of $1.5$ meters, so its interior is a cube with $s = 1.5$.\nStep 2: $V = s^3 = 1.5^3 = 1.5 \\cdot 1.5 \\cdot 1.5 = 3.375$ cubic meters.\nStep 3: Each cubic meter is $1{,}000$ liters, so $3.375 \\cdot 1{,}000 = 3{,}375$ liters. Check: cistern A, with edge $0.9$ meter, holds $0.9^3 = 0.729$ cubic meter, or $729$ liters — smaller, as its shorter edge requires ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($3.375$): the volume in cubic meters, reported before the conversion the question asks for.\n* Choice B ($2{,}250$): squares the edge instead of cubing it, giving $1.5^2 = 2.25$ and then $2{,}250$.\n* Choice D ($13{,}500$): uses the surface area $6 \\cdot 1.5^2 = 13.5$ in place of the volume, then converts to $13{,}500$.\n\n**Test Day Takeaway:** Do the geometry in the given units, then convert once at the end — converting first invites you to apply the factor to the wrong power.",
      skills: ["volume-prism", "volume-scaling"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "Cube $A$ has a volume of $1{,}000$ cubic centimeters. Cube $B$ has a surface area that is $9$ times the surface area of cube $A$. What is the volume, in cubic centimeters, of cube $B$?",
      choices: [
        // distractor: multiplies the volume by the edge ratio $3$
        { id: "A", text: "$3{,}000$" },
        // distractor: multiplies the volume by the surface-area ratio
        { id: "B", text: "$9{,}000$" },
        { id: "C", text: "$27{,}000$" },
        // distractor: cubes the surface-area ratio instead of the edge ratio
        { id: "D", text: "$729{,}000$" }
      ],
      correctAnswer: "C",
      hint: "Areas compare by the square of the edge ratio and volumes by its cube.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~60s):** Surface areas in the ratio $9$ mean edges in the ratio $3$, so volumes are in the ratio $27$: $27{,}000$.\n\n**The Full Solution:**\nStep 1: Cube $A$ has edge $\\sqrt[3]{1000} = 10$ centimeters and surface area $6(10^2) = 600$ square centimeters.\nStep 2: Cube $B$ has surface area $9(600) = 5{,}400$, so $6s^2 = 5400$, $s^2 = 900$, and $s = 30$ centimeters.\nStep 3: $V = 30^3 = 27{,}000$ cubic centimeters.\n\nVerification: $\\frac{30}{10} = 3$ and $3^3 = 27$, so $27(1{,}000) = 27{,}000$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3{,}000$): multiplies the volume by the edge ratio $3$.\n* Choice B ($9{,}000$): multiplies the volume by the surface-area ratio.\n* Choice D ($729{,}000$): cubes the surface-area ratio instead of the edge ratio.\n\n**Test Day Takeaway:** An area ratio squares the length ratio and a volume ratio cubes it — travel through the length ratio to connect them.",
      skills: ["volume-prism", "volume-scaling"]
    }
  ],

  // Section: Cylinder
  "Cylinder": [
    {
      id: 1,
      difficulty: "easy",
      question: "A specialty grocer bottles cold-pressed olive oil in cylindrical tins whose circular base has a radius of $4$ centimeters. Oil stands $15$ centimeters deep in a full tin. Which of the following represents the number of cubic centimeters of oil a full tin holds?",
      choices: [
        // distractor: omits the square on the radius, using pi r h instead of pi r squared h
        { id: "A", text: "$\\pi(4)(15)$" },
        { id: "B", text: "$\\pi(4)^2(15)$" },
        // distractor: squares the depth instead of the radius, as if 15 were the radius and 4 the height
        { id: "C", text: "$\\pi(4)(15)^2$" },
        // distractor: applies the cone formula, one third pi r squared h, to a shape with straight sides
        { id: "D", text: "$\\frac{1}{3}\\pi(4)^2(15)$" }
      ],
      correctAnswer: "B",
      hint: "Decide which of the two given lengths is the radius before you write the expression.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The oil forms a cylinder of radius $4$ and height $15$, so its volume is $\\pi r^2 h = \\pi(4)^2(15)$.\n\n**The Full Solution:**\nStep 1: The circular base has radius $4$ centimeters, so its area is $\\pi r^2 = \\pi(4)^2$ square centimeters.\nStep 2: A cylinder's volume is the base area times the height, and the oil stands $15$ centimeters deep, so $V = \\pi(4)^2(15)$.\nStep 3: Numerically that is $\\pi(16)(15) = 240\\pi \\approx 754$ cubic centimeters. Check: only the radius carries the exponent, which is exactly what $\\pi r^2 h$ requires ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\pi(4)(15)$): drops the square on the radius, computing $\\pi r h$ instead of $\\pi r^2 h$.\n* Choice C ($\\pi(4)(15)^2$): squares the depth instead of the radius, as if $15$ were the radius and $4$ the height.\n* Choice D ($\\frac{1}{3}\\pi(4)^2(15)$): applies the cone formula $\\frac{1}{3}\\pi r^2 h$ to a container with straight sides.\n\n**Test Day Takeaway:** In $\\pi r^2 h$ only the radius is squared — match each given length to its role in the formula before writing the expression.",
      skills: ["volume-prism"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A battery manufacturer models the interior volume $V$, in cubic millimeters, of a cylindrical lithium cell whose base has radius $r$ millimeters by the equation $V = \\pi r^2(65)$. Which of the following is the best interpretation of $65$ in this context?",
      choices: [
        { id: "A", text: "The interior height, in millimeters, of the cell." },
        // distractor: assigns 65 to the radius, the quantity the model already names r
        { id: "B", text: "The radius, in millimeters, of the interior base of the cell." },
        // distractor: reads 65 as the volume at r = 1, but substituting r = 1 gives 65 pi, not 65
        { id: "C", text: "The interior volume, in cubic millimeters, of a cell whose base has radius $1$ millimeter." },
        // distractor: treats 65 as a constant rate of change, though volume grows with the square of the radius
        { id: "D", text: "The increase in interior volume, in cubic millimeters, for each increase of $1$ millimeter in the radius." }
      ],
      correctAnswer: "A",
      hint: "The model already names the radius $r$, so $65$ must stand for something else.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** A cylinder's volume is $V = \\pi r^2 h$; matching it to $V = \\pi r^2(65)$ puts $65$ in the position of $h$, the height in millimeters.\n\n**The Full Solution:**\nStep 1: For any cylinder, $V = \\pi r^2 h$, where $r$ is the base radius and $h$ is the height, both in the same length unit.\nStep 2: The model is $V = \\pi r^2(65)$, with $r$ already used for the base radius in millimeters. The only factor left to identify is $65$, which occupies the $h$ slot.\nStep 3: So the cell is $65$ millimeters tall. Check: a cell with $r = 4$ would hold $\\pi(4)^2(65) = 1{,}040\\pi$ cubic millimeters, exactly the volume of a cylinder of radius $4$ and height $65$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B: assigns $65$ to the radius, but the model already names the radius $r$ and leaves it variable.\n* Choice C: reads $65$ as the volume when $r = 1$; substituting $r = 1$ actually gives $65\\pi \\approx 204$ cubic millimeters, not $65$.\n* Choice D: treats $65$ as a constant rate of change, but volume grows with $r^2$, so the increase per millimeter of radius is not constant.\n\n**Test Day Takeaway:** To interpret a constant in a geometric model, line the model up with the standard formula and read off which variable the constant replaced.",
      skills: ["volume-prism"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A cylindrical can has a diameter of $9$ centimeters and a height of $16$ centimeters. What is the volume, in cubic centimeters, of the can?",
      choices: [
        // distractor: applies the cone formula, dividing the correct volume by $3$
        { id: "A", text: "$108\\pi$" },
        // distractor: doubles the radius instead of squaring it
        { id: "B", text: "$144\\pi$" },
        { id: "C", text: "$324\\pi$" },
        // distractor: uses the diameter as the radius
        { id: "D", text: "$1{,}296\\pi$" }
      ],
      correctAnswer: "C",
      hint: "The formula wants a radius, and the problem hands you a diameter.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** The radius is $4.5$, so $V = \\pi(4.5)^2(16) = 324\\pi$.\n\n**The Full Solution:**\nStep 1: The radius is half the diameter: $r = \\frac{9}{2} = 4.5$ centimeters.\nStep 2: $r^2 = 20.25$ square centimeters.\nStep 3: $V = \\pi(20.25)(16) = 324\\pi$ cubic centimeters.\n\nVerification: $20.25 \\cdot 16 = 324$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($108\\pi$): applies the cone formula, dividing the correct volume by $3$.\n* Choice B ($144\\pi$): doubles the radius instead of squaring it.\n* Choice D ($1{,}296\\pi$): uses the diameter as the radius.\n\n**Test Day Takeaway:** A stated diameter has to be halved before it enters $\\pi r^2 h$.",
      skills: ["volume-prism"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "The radius of a right circular cylinder is multiplied by $3$, and its height is divided by $9$. The volume of the resulting cylinder is $k$ times the volume of the original cylinder. What is the value of $k$?",
      choices: [
        // distractor: uses the radius factor once instead of squaring it
        { id: "A", text: "$\\frac{1}{3}$" },
        { id: "B", text: "$1$" },
        // distractor: cubes the radius factor, as if all three dimensions had scaled
        { id: "C", text: "$3$" },
        // distractor: squares the radius factor but ignores the change in height
        { id: "D", text: "$9$" }
      ],
      correctAnswer: "B",
      hint: "The radius is squared in the formula, so its factor cannot be used just once.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~35s):** The volume scales by $\\frac{3^2}{9} = 1$, so it is unchanged.\n\n**The Full Solution:**\nStep 1: $V = \\pi r^2 h$, so the new volume is $\\pi(3r)^2\\left(\\frac{h}{9}\\right)$.\nStep 2: $(3r)^2 = 9r^2$, so the new volume is $\\pi(9r^2)\\left(\\frac{h}{9}\\right) = \\pi r^2 h$.\nStep 3: The new volume equals the original, so $k = 1$.\n\nVerification: With $r = 2$ and $h = 9$ the volume is $36\\pi$; with $r = 6$ and $h = 1$ it is again $36\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($\\frac{1}{3}$): uses the radius factor once instead of squaring it.\n* Choice C ($3$): cubes the radius factor, as if all three dimensions had scaled.\n* Choice D ($9$): squares the radius factor but ignores the change in height.\n\n**Test Day Takeaway:** The radius enters squared, so its scale factor is squared, while the height factor is used once.",
      skills: ["volume-prism"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A cylindrical tank with a radius of $10$ feet holds water to a depth of $9$ feet. All of the water is poured into an empty cylindrical tank with a radius of $5$ feet. To what depth, in feet, does the water rise in the second tank?",
      choices: [
        // distractor: scales the depth by $\left(\frac{5}{10}\right)^2$, shrinking it instead of growing it
        { id: "A", text: "$2.25$" },
        // distractor: scales the depth by $\frac{5}{10}$
        { id: "B", text: "$4.5$" },
        // distractor: uses the radius ratio $\frac{10}{5}$ once instead of squaring it
        { id: "C", text: "$18$" },
        { id: "D", text: "$36$" }
      ],
      correctAnswer: "D",
      hint: "The water keeps its volume; only the base area underneath it changes.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~60s):** The water measures $900\\pi$ cubic feet, so $25\\pi h = 900\\pi$ and $h = 36$.\n\n**The Full Solution:**\nStep 1: The water in the first tank has volume $\\pi(10^2)(9) = 900\\pi$ cubic feet.\nStep 2: Pouring changes the shape but not the amount, so $\\pi(5^2)h = 900\\pi$.\nStep 3: Divide by $\\pi$: $25h = 900$, so $h = 36$ feet.\n\nVerification: $\\pi(25)(36) = 900\\pi$, the same volume as before. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($2.25$): scales the depth by $\\left(\\frac{5}{10}\\right)^2$, shrinking it instead of growing it.\n* Choice B ($4.5$): scales the depth by $\\frac{5}{10}$.\n* Choice C ($18$): uses the radius ratio $\\frac{10}{5}$ once instead of squaring it.\n\n**Test Day Takeaway:** Pouring conserves volume: set the two $\\pi r^2 h$ expressions equal and solve for the unknown depth.",
      skills: ["volume-prism"]
    }
  ],

  // Section: Sphere
  "Sphere": [
    {
      id: 1,
      difficulty: "easy",
      question: "A sporting-goods supplier sells solid rubber training balls in two sizes. The radius of the large ball is $2$ times the radius of the small ball. Which statement about the volumes of the two balls is true?",
      choices: [
        // distractor: applies the factor once, as if volume were proportional to the radius itself
        { id: "A", text: "The volume of the large ball is $2$ times the volume of the small ball." },
        // distractor: squares the factor, giving 4, which is how surface area scales
        { id: "B", text: "The volume of the large ball is $4$ times the volume of the small ball." },
        // distractor: multiplies the factor by the exponent, 2 times 3 = 6, instead of raising 2 to the third power
        { id: "C", text: "The volume of the large ball is $6$ times the volume of the small ball." },
        { id: "D", text: "The volume of the large ball is $8$ times the volume of the small ball." }
      ],
      correctAnswer: "D",
      hint: "Only the radius changes between the two balls; the rest of the formula cancels.",
      explanation: "**Choice D is correct.**\n\n**The Fast Way (~20s):** The radius is cubed in $V = \\frac{4}{3}\\pi r^3$, so doubling the radius multiplies the volume by $2^3 = 8$.\n\n**The Full Solution:**\nStep 1: Let the small ball have radius $r$, so its volume is $V_{small} = \\frac{4}{3}\\pi r^3$.\nStep 2: The large ball has radius $2r$, so $V_{large} = \\frac{4}{3}\\pi (2r)^3 = \\frac{4}{3}\\pi \\cdot 8r^3$.\nStep 3: Dividing, $\\frac{V_{large}}{V_{small}} = 8$. Check: with $r = 1$ the volumes are $\\frac{4}{3}\\pi$ and $\\frac{32}{3}\\pi$, and $\\frac{32}{3} \\div \\frac{4}{3} = 8$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A: applies the factor once, treating volume as proportional to the radius itself.\n* Choice B: squares the factor, giving $2^2 = 4$ — the way surface area scales, not volume.\n* Choice C: multiplies the factor by the exponent, $2 \\cdot 3 = 6$, instead of raising $2$ to the third power.\n\n**Test Day Takeaway:** When a length is multiplied by $k$, anything measured in cubic units is multiplied by $k^3$ — the exponent is applied to the factor, never multiplied by it.",
      skills: ["volume-sphere"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "An anaerobic digester at a wastewater plant stores biogas in a spherical holder with an interior radius of $6$ meters. What is the interior volume, in cubic meters, of the holder?",
      choices: [
        // distractor: uses the cone coefficient one third instead of four thirds: (1/3) pi (6 cubed) = 72 pi
        { id: "A", text: "$72\\pi$" },
        // distractor: computes the surface area 4 pi r squared = 144 pi square meters
        { id: "B", text: "$144\\pi$" },
        { id: "C", text: "$288\\pi$" },
        // distractor: drops the one third, using 4 pi r cubed = 864 pi
        { id: "D", text: "$864\\pi$" }
      ],
      correctAnswer: "C",
      hint: "Cube the radius first, then apply the fraction in the sphere formula.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** $V = \\frac{4}{3}\\pi r^3$ with $r = 6$ gives $\\frac{4}{3}\\pi(216) = 288\\pi$ cubic meters.\n\n**The Full Solution:**\nStep 1: The volume of a sphere of radius $r$ is $V = \\frac{4}{3}\\pi r^3$, and here $r = 6$ meters.\nStep 2: Cube the radius: $6^3 = 216$, so $V = \\frac{4}{3}\\pi(216)$.\nStep 3: $\\frac{4}{3} \\cdot 216 = 288$, so $V = 288\\pi$ cubic meters. Check: $288\\pi \\approx 905$, and a cube of edge $12$ meters that just contains the sphere holds $1{,}728$ cubic meters, comfortably more ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($72\\pi$): uses the cone coefficient $\\frac{1}{3}$ in place of $\\frac{4}{3}$, giving $\\frac{1}{3}\\pi(216) = 72\\pi$.\n* Choice B ($144\\pi$): computes the surface area $4\\pi r^2 = 4\\pi(36) = 144\\pi$ square meters instead of the volume.\n* Choice D ($864\\pi$): drops the $\\frac{1}{3}$, computing $4\\pi r^3 = 4\\pi(216) = 864\\pi$.\n\n**Test Day Takeaway:** The sphere formula has both a fraction and a cube — apply the exponent to the radius before the coefficient, and confirm the coefficient is $\\frac{4}{3}$, not $\\frac{1}{3}$ or $4$.",
      skills: ["volume-sphere"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A confectioner melts $900\\pi$ cubic centimeters of chocolate and molds it into $25$ identical spherical truffles, with no chocolate left over. What is the radius, in centimeters, of one truffle?",
      choices: [
        { id: "A", text: "$3$" },
        // distractor: solves correctly for the radius 3 and then doubles it, reporting the diameter
        { id: "B", text: "$6$" },
        // distractor: reaches r cubed = 27 and divides by 3 instead of taking a cube root
        { id: "C", text: "$9$" },
        // distractor: reports r cubed = 27 without taking the cube root
        { id: "D", text: "$27$" }
      ],
      correctAnswer: "A",
      hint: "One truffle's volume comes first; only then does the sphere formula give you something to solve.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** Each truffle holds $\\frac{900\\pi}{25} = 36\\pi$ cubic centimeters, and $\\frac{4}{3}\\pi r^3 = 36\\pi$ gives $r^3 = 27$, so $r = 3$.\n\n**The Full Solution:**\nStep 1: The chocolate is divided evenly among $25$ truffles, so one truffle has volume $\\frac{900\\pi}{25} = 36\\pi$ cubic centimeters.\nStep 2: A sphere of radius $r$ has volume $\\frac{4}{3}\\pi r^3$, so $\\frac{4}{3}\\pi r^3 = 36\\pi$. Dividing both sides by $\\pi$ and multiplying by $\\frac{3}{4}$ gives $r^3 = 27$.\nStep 3: Taking the cube root, $r = 3$ centimeters. Check: $\\frac{4}{3}\\pi(3)^3 = 36\\pi$ per truffle, and $25 \\cdot 36\\pi = 900\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice B ($6$): finds the radius $3$ correctly and then doubles it, reporting the diameter instead of the radius.\n* Choice C ($9$): reaches $r^3 = 27$ and divides by $3$ rather than taking a cube root.\n* Choice D ($27$): stops at $r^3 = 27$ and reports that value as the radius.\n\n**Test Day Takeaway:** When a total is split among identical solids, divide before you use the formula — then finish by undoing the exponent, not the coefficient.",
      skills: ["volume-sphere"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "Sphere $B$ has a radius that is half the radius of sphere $A$. The volume of sphere $B$ is what fraction of the volume of sphere $A$?",
      choices: [
        { id: "A", text: "$\\frac{1}{8}$" },
        // distractor: multiplies the denominator by $3$ instead of raising $2$ to the third power
        { id: "B", text: "$\\frac{1}{6}$" },
        // distractor: squares the length factor, which is the rule for area
        { id: "C", text: "$\\frac{1}{4}$" },
        // distractor: uses the length factor once
        { id: "D", text: "$\\frac{1}{2}$" }
      ],
      correctAnswer: "A",
      hint: "The radius appears three times over in the volume formula.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~30s):** Volume scales by the cube of the radius factor: $\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$.\n\n**The Full Solution:**\nStep 1: Let sphere $A$ have radius $r$, so sphere $B$ has radius $\\frac{r}{2}$.\nStep 2: $V_B = \\frac{4}{3}\\pi\\left(\\frac{r}{2}\\right)^3 = \\frac{4}{3}\\pi \\cdot \\frac{r^3}{8}$.\nStep 3: That is $\\frac{1}{8}$ of $V_A = \\frac{4}{3}\\pi r^3$.\n\nVerification: With $r = 2$: $V_A = \\frac{32\\pi}{3}$ and $V_B = \\frac{4\\pi}{3}$, a ratio of $\\frac{1}{8}$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($\\frac{1}{6}$): multiplies the denominator by $3$ instead of raising $2$ to the third power.\n* Choice C ($\\frac{1}{4}$): squares the length factor, which is the rule for area.\n* Choice D ($\\frac{1}{2}$): uses the length factor once.\n\n**Test Day Takeaway:** Halving every length divides volume by $8$, not by $2$.",
      skills: ["volume-sphere"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A solid sphere with a radius of $6$ centimeters is melted and recast as a right circular cylinder with a radius of $4$ centimeters. What is the height, in centimeters, of the cylinder?",
      choices: [
        // distractor: uses $\frac{1}{3}\pi r^3$ for the volume of the sphere
        { id: "A", text: "$4.5$" },
        { id: "B", text: "$18$" },
        // distractor: omits the division by $3$ in the volume of the sphere
        { id: "C", text: "$54$" },
        // distractor: uses the diameter $12$ of the sphere as its radius
        { id: "D", text: "$144$" }
      ],
      correctAnswer: "B",
      hint: "Nothing is lost in the recasting, so one quantity is the same for both solids.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~60s):** The sphere holds $288\\pi$, so $16\\pi h = 288\\pi$ and $h = 18$.\n\n**The Full Solution:**\nStep 1: The sphere has volume $\\frac{4}{3}\\pi(6^3) = 288\\pi$ cubic centimeters.\nStep 2: Recasting preserves the amount of material, so $\\pi(4^2)h = 288\\pi$.\nStep 3: Divide by $\\pi$: $16h = 288$, so $h = 18$ centimeters.\n\nVerification: $\\pi(16)(18) = 288\\pi$, the volume of the original sphere. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.5$): uses $\\frac{1}{3}\\pi r^3$ for the volume of the sphere.\n* Choice C ($54$): omits the division by $3$ in the volume of the sphere.\n* Choice D ($144$): uses the diameter $12$ of the sphere as its radius.\n\n**Test Day Takeaway:** Melting and recasting holds volume constant — equate the two formulas and solve.",
      skills: ["volume-sphere"]
    }
  ],

  // Section: Cone
  "Cone": [
    {
      id: 1,
      difficulty: "easy",
      question: "A conical seed hopper of radius $r$ and height $h$ holds $V$ cubic centimeters when full. A replacement hopper has the same height but twice the radius. In terms of $V$, how much does the replacement hopper hold when full?",
      choices: [
        // distractor: scales the volume by the same factor as the radius
        { id: "A", text: "$2V$" },
        { id: "B", text: "$4V$" },
        // distractor: multiplies the doubling by the 3 in the formula
        { id: "C", text: "$6V$" },
        // distractor: scales all three dimensions instead of only the radius
        { id: "D", text: "$8V$" }
      ],
      correctAnswer: "B",
      hint: "The two hoppers do not differ in every dimension.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~15s):** The radius is squared in the cone formula, so doubling it multiplies the volume by $2^2 = 4$.\n\n**The Full Solution:**\nStep 1: The volume of a cone is $V = \\frac{1}{3}\\pi r^2 h$.\nStep 2: Replacing $r$ with $2r$ and keeping $h$ gives $\\frac{1}{3}\\pi (2r)^2 h = \\frac{1}{3}\\pi (4r^2) h$.\nStep 3: That is $4$ times the original, so the replacement holds $4V$. Check: with $r = 3$ and $h = 5$, $V = 15\\pi$ and the replacement holds $60\\pi = 4V$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($2V$): scaling the volume by the same factor as the radius; the radius enters squared.\n* Choice C ($6V$): multiplying the doubling by the $3$ in the denominator, which is a constant and does not change.\n* Choice D ($8V$): scaling all three dimensions, which would apply only if the height doubled as well.\n\n**Test Day Takeaway:** Track which dimensions change and to what power each appears in the formula.",
      skills: ["volume-pyramid-cone"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A right circular cone and a right circular cylinder have the same radius and the same height. The volume of the cylinder is $96$ cubic inches. What is the volume, in cubic inches, of the cone?",
      choices: [
        { id: "A", text: "$32$" },
        // distractor: halves the volume of the cylinder instead of taking a third
        { id: "B", text: "$48$" },
        // distractor: reports the volume of the cylinder unchanged
        { id: "C", text: "$96$" },
        // distractor: multiplies by $3$ instead of dividing by it
        { id: "D", text: "$288$" }
      ],
      correctAnswer: "A",
      hint: "Three identical cones fill the matching cylinder.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~20s):** A cone is $\\frac{1}{3}$ of the matching cylinder: $\\frac{96}{3} = 32$.\n\n**The Full Solution:**\nStep 1: With a shared radius and height, $V_{\\text{cylinder}} = \\pi r^2 h$ and $V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h$.\nStep 2: So the volume of the cone is $\\frac{1}{3}$ of the volume of the cylinder.\nStep 3: $\\frac{1}{3}(96) = 32$ cubic inches.\n\nVerification: $3(32) = 96$, the volume of the cylinder. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($48$): halves the volume of the cylinder instead of taking a third.\n* Choice C ($96$): reports the volume of the cylinder unchanged.\n* Choice D ($288$): multiplies by $3$ instead of dividing by it.\n\n**Test Day Takeaway:** Same base and same height means the cone holds exactly one third as much.",
      skills: ["volume-pyramid-cone"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A cider bottler drains its juice through a conical filter funnel whose circular rim is $10$ centimeters across. The funnel holds $150\\pi$ cubic centimeters of juice when it is filled to the rim. How deep, in centimeters, is the funnel?",
      choices: [
        // distractor: uses the rim measurement 10 as the radius, giving 450/100
        { id: "A", text: "$4.5$" },
        // distractor: leaves out the one-third factor, giving 150/25
        { id: "B", text: "$6$" },
        { id: "C", text: "$18$" },
        // distractor: multiplies by 3 a second time
        { id: "D", text: "$54$" }
      ],
      correctAnswer: "C",
      hint: "Check which measurement across the funnel the volume formula actually asks for.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~30s):** With radius $5$, $\\frac{1}{3}\\pi(25)h = 150\\pi$ gives $h = \\frac{450}{25} = 18$ centimeters.\n\n**The Full Solution:**\nStep 1: The rim measures $10$ centimeters across, so the radius is $5$ centimeters.\nStep 2: Substitute into the cone formula: $\\frac{1}{3}\\pi(5)^2 h = 150\\pi$, so $\\frac{25}{3}h = 150$.\nStep 3: Multiply by $3$ and divide by $25$: $h = \\frac{450}{25} = 18$ centimeters. Check: $\\frac{1}{3}\\pi(25)(18) = 150\\pi$ ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($4.5$): using the $10$-centimeter rim measurement as the radius, which gives $\\frac{450}{100}$.\n* Choice B ($6$): leaving out the factor $\\frac{1}{3}$, which gives $\\frac{150}{25}$.\n* Choice D ($54$): multiplying by $3$ a second time after already clearing the $\\frac{1}{3}$.\n\n**Test Day Takeaway:** Halve a measurement taken across a circle before squaring it, and clear the $\\frac{1}{3}$ exactly once.",
      skills: ["volume-pyramid-cone"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A right circular cone has a volume of $300\\pi$ cubic inches and a height of $4$ inches. What is the radius, in inches, of the cone?",
      choices: [
        { id: "A", text: "$15$" },
        // distractor: gives the diameter instead of the radius
        { id: "B", text: "$30$" },
        // distractor: divides by the height and stops, using neither the $\frac{1}{3}$ nor the square root
        { id: "C", text: "$75$" },
        // distractor: reports $r^2$ rather than $r$
        { id: "D", text: "$225$" }
      ],
      correctAnswer: "A",
      hint: "Work down to $r^2$ first; the last step is a square root.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~35s):** $\\frac{1}{3}r^2(4) = 300$ gives $r^2 = 225$ and $r = 15$.\n\n**The Full Solution:**\nStep 1: $\\frac{1}{3}\\pi r^2 h = 300\\pi$; divide by $\\pi$ to get $\\frac{1}{3}r^2(4) = 300$.\nStep 2: Multiply both sides by $3$: $4r^2 = 900$, so $r^2 = 225$.\nStep 3: $r = \\sqrt{225} = 15$ inches.\n\nVerification: $\\frac{1}{3}\\pi(225)(4) = 300\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($30$): gives the diameter instead of the radius.\n* Choice C ($75$): divides by the height and stops, using neither the $\\frac{1}{3}$ nor the square root.\n* Choice D ($225$): reports $r^2$ rather than $r$.\n\n**Test Day Takeaway:** Solve all the way down to $r^2$, then take the square root and check which one the question wants.",
      skills: ["volume-pyramid-cone"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A cone-shaped cup has a radius of $3$ centimeters and a height of $10$ centimeters. Water is poured into the cup until the surface of the water is exactly halfway up the height of the cup. What is the volume, in cubic centimeters, of the water?",
      choices: [
        { id: "A", text: "$3.75\\pi$" },
        // distractor: scales the full volume by $\left(\frac{1}{2}\right)^2$ instead of $\left(\frac{1}{2}\right)^3$
        { id: "B", text: "$7.5\\pi$" },
        // distractor: halves the height but keeps the full radius, which is also half the full volume
        { id: "C", text: "$15\\pi$" },
        // distractor: gives the volume of the entire cup
        { id: "D", text: "$30\\pi$" }
      ],
      correctAnswer: "A",
      hint: "The surface of the water is a smaller circle than the rim of the cup.",
      explanation: "**Choice A is correct.**\n\n**The Fast Way (~75s):** The water is a cone similar to the cup with factor $\\frac{1}{2}$, so it holds $\\frac{1}{8}(30\\pi) = 3.75\\pi$.\n\n**The Full Solution:**\nStep 1: The full cup holds $\\frac{1}{3}\\pi(3^2)(10) = 30\\pi$ cubic centimeters.\nStep 2: The water forms a smaller cone similar to the cup, so at half the height its radius is also halved, to $1.5$ centimeters.\nStep 3: $V = \\frac{1}{3}\\pi(1.5)^2(5) = \\frac{1}{3}\\pi(2.25)(5) = 3.75\\pi$ cubic centimeters.\n\nVerification: $\\left(\\frac{1}{2}\\right)^3(30\\pi) = \\frac{30\\pi}{8} = 3.75\\pi$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice B ($7.5\\pi$): scales the full volume by $\\left(\\frac{1}{2}\\right)^2$ instead of $\\left(\\frac{1}{2}\\right)^3$.\n* Choice C ($15\\pi$): halves the height but keeps the full radius, which is also half the full volume.\n* Choice D ($30\\pi$): gives the volume of the entire cup.\n\n**Test Day Takeaway:** Filling a cone partway shrinks every dimension: half the height means half the radius and one eighth the volume.",
      skills: ["volume-pyramid-cone"]
    }
  ],

  // Section: Triangular Prism
  "Triangular Prism": [
    {
      id: 1,
      difficulty: "easy",
      question: "A school woodshop cuts ramp blocks from solid maple. Each block is a prism $25$ centimeters long whose cross section is the right triangle shown. What is the volume, in cubic centimeters, of one block?",
      diagram: { type: "rightTriangle", params: { vertices: [[0, 0], [8, 0], [8, 6]], sideLabels: ["8 cm", "6 cm", "10 cm"], rightAngleVertex: 1 } },
      choices: [
        // distractor: stops at the area of the triangular cross section, 24 square centimeters
        { id: "A", text: "$24$" },
        { id: "B", text: "$600$" },
        // distractor: uses the hypotenuse 10 in place of the leg 8: (1/2)(6)(10)(25) = 750
        { id: "C", text: "$750$" },
        // distractor: omits the factor one half, computing 8 times 6 times 25 = 1200
        { id: "D", text: "$1{,}200$" }
      ],
      correctAnswer: "B",
      hint: "A prism is its cross section repeated along its length, so find that cross section's area before anything else.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~25s):** The cross section has area $\\frac{1}{2}(8)(6) = 24$ square centimeters, and a prism's volume is that area times its length: $24 \\cdot 25 = 600$ cubic centimeters.\n\n**The Full Solution:**\nStep 1: The cross section is a right triangle whose legs, the two sides meeting at the right angle, measure $8$ centimeters and $6$ centimeters. The $10$-centimeter side is the hypotenuse.\nStep 2: The area of that triangle is $\\frac{1}{2}(8)(6) = 24$ square centimeters.\nStep 3: A prism's volume is the area of its cross section times its length, so $V = 24 \\cdot 25 = 600$ cubic centimeters. Check: $600 \\div 25 = 24$, returning the cross-sectional area ✓\n\n**Why the wrong answers are tempting:**\n* Choice A ($24$): stops at the area of the triangular face, $24$ square centimeters, without extending it along the $25$-centimeter length.\n* Choice C ($750$): uses the hypotenuse in place of a leg, computing $\\frac{1}{2}(6)(10)(25) = 750$.\n* Choice D ($1{,}200$): omits the factor $\\frac{1}{2}$, computing $8 \\cdot 6 \\cdot 25 = 1{,}200$.\n\n**Test Day Takeaway:** For any prism, volume is cross-sectional area times length — and in a right triangle only the two legs, never the hypotenuse, belong in the area formula.",
      skills: ["volume-prism"]
    },
    {
      id: 2,
      difficulty: "easy",
      question: "A right triangular prism is $9$ inches long. Each triangular face is a right triangle with legs of length $6$ inches and $8$ inches. What is the volume, in cubic inches, of the prism?",
      diagram: { type: "rightTriangle", params: { sideLabels: ["6", "8", ""], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: gives the area of a triangular face and stops
        { id: "A", text: "$24$" },
        // distractor: divides by $2$ a second time
        { id: "B", text: "$108$" },
        { id: "C", text: "$216$" },
        // distractor: omits the $\frac{1}{2}$ that the triangular face requires
        { id: "D", text: "$432$" }
      ],
      correctAnswer: "C",
      hint: "The two legs of a right triangle serve as its base and its height.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~20s):** Each triangular face has area $\\frac{1}{2}(6)(8) = 24$, so $V = 24(9) = 216$.\n\n**The Full Solution:**\nStep 1: The face is a right triangle, so its legs act as base and height: $B = \\frac{1}{2}(6)(8) = 24$ square inches.\nStep 2: The length of the prism, $9$ inches, is the distance between the two triangular faces.\nStep 3: $V = 24(9) = 216$ cubic inches.\n\nVerification: $\\frac{216}{24} = 9$, the length of the prism. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($24$): gives the area of a triangular face and stops.\n* Choice B ($108$): divides by $2$ a second time.\n* Choice D ($432$): omits the $\\frac{1}{2}$ that the triangular face requires.\n\n**Test Day Takeaway:** For a prism resting on a side, the height in $V = Bh$ is the distance between the two identical faces.",
      skills: ["volume-prism"]
    },
    {
      id: 3,
      difficulty: "medium",
      question: "A right triangular prism has a volume of $360$ cubic centimeters and a length of $15$ centimeters. Its triangular base is a right triangle with one leg measuring $8$ centimeters. What is the length, in centimeters, of the other leg?",
      diagram: { type: "rightTriangle", params: { sideLabels: ["8", "", ""], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: divides the base area by $8$ but never doubles it first
        { id: "A", text: "$3$" },
        { id: "B", text: "$6$" },
        // distractor: gives the area of the triangular base rather than a leg
        { id: "C", text: "$24$" },
        // distractor: doubles the base area but never divides by $8$
        { id: "D", text: "$48$" }
      ],
      correctAnswer: "B",
      hint: "Recover the area of the triangular face before touching the legs.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** The base area is $\\frac{360}{15} = 24$, so $\\frac{1}{2}(8)L = 24$ and $L = 6$.\n\n**The Full Solution:**\nStep 1: $V = Bh$ gives $360 = B(15)$, so the base area is $B = 24$ square centimeters.\nStep 2: The base is a right triangle with legs $8$ and $L$: $\\frac{1}{2}(8)L = 24$.\nStep 3: That is $4L = 24$, so $L = 6$ centimeters.\n\nVerification: $\\frac{1}{2}(8)(6)(15) = 24(15) = 360$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($3$): divides the base area by $8$ but never doubles it first.\n* Choice C ($24$): gives the area of the triangular base rather than a leg.\n* Choice D ($48$): doubles the base area but never divides by $8$.\n\n**Test Day Takeaway:** Take the prism apart in the order it was built: volume to base area, then base area to the missing length.",
      skills: ["volume-prism"]
    },
    {
      id: 4,
      difficulty: "medium",
      question: "A right prism has a height of $10$ centimeters, and its base is an equilateral triangle with side length $6$ centimeters. The area of an equilateral triangle with side length $s$ is $\\frac{s^2\\sqrt{3}}{4}$. What is the volume, in cubic centimeters, of the prism?",
      diagram: { type: "triangleWithAngles", params: { angleLabels: ["60°", "60°", "60°"], figureNote: true } },
      choices: [
        // distractor: multiplies by $\frac{1}{3}$, as if the solid were a pyramid
        { id: "A", text: "$30\\sqrt{3}$" },
        { id: "B", text: "$90\\sqrt{3}$" },
        // distractor: divides $s^2\sqrt{3}$ by $2$ instead of by $4$
        { id: "C", text: "$180\\sqrt{3}$" },
        // distractor: omits the division by $4$ in the base-area formula
        { id: "D", text: "$360\\sqrt{3}$" }
      ],
      correctAnswer: "B",
      hint: "Evaluate the given base-area formula at $s = 6$ before anything else.",
      explanation: "**Choice B is correct.**\n\n**The Fast Way (~45s):** $B = \\frac{36\\sqrt{3}}{4} = 9\\sqrt{3}$, so $V = 9\\sqrt{3}(10) = 90\\sqrt{3}$.\n\n**The Full Solution:**\nStep 1: Evaluate the base area at $s = 6$: $B = \\frac{6^2\\sqrt{3}}{4} = \\frac{36\\sqrt{3}}{4} = 9\\sqrt{3}$ square centimeters.\nStep 2: For a prism, $V = Bh$, and here $h = 10$ centimeters.\nStep 3: $V = 9\\sqrt{3}(10) = 90\\sqrt{3}$ cubic centimeters.\n\nVerification: $9\\sqrt{3} \\approx 15.6$, and $15.6(10) \\approx 156$, which matches $90\\sqrt{3} \\approx 155.9$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($30\\sqrt{3}$): multiplies by $\\frac{1}{3}$, as if the solid were a pyramid.\n* Choice C ($180\\sqrt{3}$): divides $s^2\\sqrt{3}$ by $2$ instead of by $4$.\n* Choice D ($360\\sqrt{3}$): omits the division by $4$ in the base-area formula.\n\n**Test Day Takeaway:** The prism formula never changes: get the base area exactly, then multiply by the height once.",
      skills: ["volume-prism"]
    },
    {
      id: 5,
      difficulty: "hard",
      question: "A concrete block is a right rectangular prism measuring $10$ inches by $6$ inches by $4$ inches. A groove is cut straight through the block along the $10$-inch dimension, and the cross section of the groove is a right triangle with legs of length $6$ inches and $2$ inches. What is the volume, in cubic inches, of the block that remains?",
      diagram: { type: "rightTriangle", params: { sideLabels: ["6", "2", ""], rightAngleVertex: 1, figureNote: true } },
      choices: [
        // distractor: gives the volume of the groove instead of what is left of the block
        { id: "A", text: "$60$" },
        // distractor: treats the groove as a rectangular prism, subtracting $6 \cdot 2 \cdot 10$
        { id: "B", text: "$120$" },
        { id: "C", text: "$180$" },
        // distractor: subtracts the cross-sectional area, $6$, rather than the volume of the groove
        { id: "D", text: "$234$" }
      ],
      correctAnswer: "C",
      hint: "Find the whole block and the groove as two separate volumes.",
      explanation: "**Choice C is correct.**\n\n**The Fast Way (~75s):** $240 - \\frac{1}{2}(6)(2)(10) = 240 - 60 = 180$.\n\n**The Full Solution:**\nStep 1: The uncut block has volume $10(6)(4) = 240$ cubic inches.\nStep 2: The groove is itself a prism: its triangular cross section has area $\\frac{1}{2}(6)(2) = 6$ square inches and it runs $10$ inches, so its volume is $6(10) = 60$ cubic inches.\nStep 3: The remaining volume is $240 - 60 = 180$ cubic inches.\n\nVerification: $180 + 60 = 240$, the volume of the uncut block. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($60$): gives the volume of the groove instead of what is left of the block.\n* Choice B ($120$): treats the groove as a rectangular prism, subtracting $6 \\cdot 2 \\cdot 10$.\n* Choice D ($234$): subtracts the cross-sectional area, $6$, rather than the volume of the groove.\n\n**Test Day Takeaway:** In a composite solid, finish each piece as a complete volume before adding or subtracting — never mix an area with a volume.",
      skills: ["volume-prism"]
    }
  ]
};
