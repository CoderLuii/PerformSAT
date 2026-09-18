/**
 * landingDemoItems — four REAL bank items, frozen for the landing page's
 * "try a real question" demo (LandingTryIt). Copied verbatim from the bank on
 * 2026-09-09 so the logged-out landing does not import the whole bank:
 *   rw-1201       practiceTest12RW  words-in-context (easy)
 *   bank-alg-016  bank/algebra      word-problem-to-equation (medium)
 *   rw-1244       practiceTest12RW  boundaries (medium)
 *   bank-alg-014  bank/algebra      linear equation setup (easy)
 * `filedUnder` is the label the app itself files the answer under (the SAT
 * Pattern header for math, the CB skill for R&W). If a source item changes,
 * regenerate (scratch generator, 2026-09-09) rather than hand-edit.
 */
export const LANDING_DEMO_ITEMS = [
  {
    "id": "rw-1201",
    "sourceId": 1201,
    "section": "rw",
    "sectionLabel": "Reading and Writing",
    "skill": "words-in-context",
    "difficulty": "easy",
    "filedUnder": "Words in Context",
    "passage": "Adobe buildings are made of earthen bricks dried in the sun, and their upkeep follows a yearly rhythm. Each spring, caretakers coat the walls with a fresh layer of mud plaster. The plaster is not decoration but protection: without it, a single season of hard rain can ____ the bricks beneath, carrying away as mud the very material from which the walls were made.",
    "question": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      {
        "id": "A",
        "text": "discolor"
      },
      {
        "id": "B",
        "text": "dissolve"
      },
      {
        "id": "C",
        "text": "conceal"
      },
      {
        "id": "D",
        "text": "loosen"
      }
    ],
    "correctAnswer": "B",
    "explanation": "**Choice B is correct.** The clue comes right after the blank: rain carries the bricks away \"as mud,\" turning solid earth back into wet earth. \"Dissolve\" names exactly that — the rain breaks the bricks down and washes them away.\n\n**The Full Solution:**\n- The passage explains that the mud plaster exists for protection, so the blank must name the harm rain does to unprotected bricks.\n- The phrase \"carrying away as mud the very material from which the walls were made\" says the bricks themselves are converted to mud and lost.\n- A word meaning to break down and wash away is needed, and that is \"dissolve.\"\n\n**Why the other choices are wrong:**\n- A: \"Discolor\" describes a change in appearance only, but the sentence describes material being carried away, not stained.\n- C: \"Conceal\" means to hide the bricks, which rain does not do.\n- D: \"Loosen\" understates the damage — the bricks are not merely shaken loose but turned to mud and lost."
  },
  {
    "id": "bank-alg-016",
    "sourceId": "bank-alg-016",
    "section": "math",
    "sectionLabel": "Math",
    "skill": "word-problem-to-equation",
    "difficulty": "medium",
    "filedUnder": "Linear Equation with Starting Quantity",
    "passage": null,
    "question": "A road crew has already paved $850$ meters of a road and continues paving at a constant rate of $125$ meters per hour. How many more hours will the crew need to pave until the total paved length is $2{,}600$ meters?",
    "choices": [
      {
        "id": "A",
        "text": "$6.8$"
      },
      {
        "id": "B",
        "text": "$14$"
      },
      {
        "id": "C",
        "text": "$20.8$"
      },
      {
        "id": "D",
        "text": "$27.6$"
      }
    ],
    "correctAnswer": "B",
    "explanation": "**SAT Pattern: Linear Equation with Starting Quantity**\n\n**Choice B is correct.**\n\n**The Fast Way (~15s):** Remaining length $= 2{,}600 - 850 = 1{,}750$ meters, and $\\frac{1{,}750}{125} = 14$ hours.\n\n**The Full Solution:**\nStep 1: Let $h$ be the additional hours. The paved length after $h$ more hours is $850 + 125h$.\nStep 2: Set it equal to the target: $850 + 125h = 2{,}600$, so $125h = 1{,}750$ and $h = 14$.\nStep 3: Check: $14$ hours at $125$ meters per hour is $1{,}750$ meters, and $850 + 1{,}750 = 2{,}600$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($6.8$): computes $\\frac{850}{125}$, the time the crew has already spent, not the time remaining.\n* Choice C ($20.8$): computes $\\frac{2{,}600}{125}$, as if the crew were starting from zero.\n* Choice D ($27.6$): adds $850$ to $2{,}600$ instead of subtracting it before dividing.\n\n**Test Day Takeaway:** \"Already has\" is a starting value on the same side as the rate term; subtract it from the target before dividing by the rate."
  },
  {
    "id": "rw-1244",
    "sourceId": 1244,
    "section": "rw",
    "sectionLabel": "Reading and Writing",
    "skill": "boundaries",
    "difficulty": "medium",
    "filedUnder": "Boundaries",
    "passage": "Before opening a lake to ricing crews each season, tribal natural-resource officers judge the stand's readiness by three signs ____ and postpone the harvest if any of the three falls short.",
    "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      {
        "id": "A",
        "text": ", the density of the standing plants, the ripeness of the seed heads, and the firmness of the grain,"
      },
      {
        "id": "B",
        "text": "the density of the standing plants, the ripeness of the seed heads, and the firmness of the grain"
      },
      {
        "id": "C",
        "text": "—the density of the standing plants, the ripeness of the seed heads, and the firmness of the grain,"
      },
      {
        "id": "D",
        "text": "—the density of the standing plants, the ripeness of the seed heads, and the firmness of the grain—"
      }
    ],
    "correctAnswer": "D",
    "explanation": "**Choice D is correct.** The list of three signs is an interrupting aside dropped into the middle of the sentence, and because the list carries its own commas, it must be fenced off by a matched pair of dashes — one before \"the density\" and one after \"the grain.\"\n\n**The Full Solution:**\n- Lift the aside out and the sentence still stands: \"officers judge the stand's readiness by three signs... and postpone the harvest if any of the three falls short.\" So the list is a parenthetical insertion.\n- The rule: a mid-sentence aside takes the same mark at both ends, and when the aside contains commas of its own, dashes keep its boundaries visible.\n- Only D supplies the matched pair of dashes around the comma-filled list.\n\n**Why the other choices are wrong:**\n- A: Its fencing commas drown among the list's internal commas, leaving the aside's edges unreadable.\n- B: With no punctuation at all, the list crashes into \"three signs\" on one side and \"and postpone\" on the other.\n- C: It opens with a dash but closes with a comma — mismatched fences around a single aside."
  },
  {
    "id": "bank-alg-014",
    "sourceId": "bank-alg-014",
    "section": "math",
    "sectionLabel": "Math",
    "skill": "word-problem-to-equation",
    "difficulty": "easy",
    "filedUnder": "Linear Cost Equation Setup",
    "passage": null,
    "question": "A community garden charges $\\$32$ per season for a plot plus $\\$4$ for each bag of compost a gardener buys. A gardener paid a total of $\\$68$ for one season. Which equation can be used to find $b$, the number of bags of compost the gardener bought?",
    "choices": [
      {
        "id": "A",
        "text": "$4b - 32 = 68$"
      },
      {
        "id": "B",
        "text": "$32b + 4 = 68$"
      },
      {
        "id": "C",
        "text": "$36b = 68$"
      },
      {
        "id": "D",
        "text": "$32 + 4b = 68$"
      }
    ],
    "correctAnswer": "D",
    "explanation": "**SAT Pattern: Linear Cost Equation Setup**\n\n**Choice D is correct.**\n\n**The Fast Way (~10s):** Fixed plot fee $32$ plus $4$ per bag for $b$ bags equals the total $68$: $32 + 4b = 68$.\n\n**The Full Solution:**\nStep 1: The total cost is the one-time plot fee plus the compost cost. The compost cost is $4$ dollars per bag times $b$ bags, or $4b$.\nStep 2: Set the sum equal to the amount paid: $32 + 4b = 68$.\nStep 3: Check by solving: $4b = 36$, so $b = 9$. Nine bags at $4$ dollars is $36$ dollars, and $32 + 36 = 68$. $\\checkmark$\n\n**Why the wrong answers are tempting:**\n* Choice A ($4b - 32 = 68$): subtracts the plot fee, treating it as a discount rather than a charge.\n* Choice B ($32b + 4 = 68$): swaps the numbers, charging $32$ per bag with a $4$ fee.\n* Choice C ($36b = 68$): adds $32 + 4$ and multiplies by $b$, charging the plot fee once per bag.\n\n**Test Day Takeaway:** Fixed charge plus rate times quantity equals total; solve the equation you wrote and confirm the answer is a whole number of items."
  }
];
