// Practice Test 12 — SAT Reading & Writing (R&W)
// R&W seating varied 2026-09-07 (scripts/varyRWSeating.mjs): items re-dealt inside their official skill blocks with a per-test seed — block flow and per-skill counts unchanged.
// Auto-assembled by scripts/assembleRWTest.mjs from the authored JSON in
// scripts/generated/authored/test12/. Do not hand-edit this file —
// re-run the assembler against the manifest to regenerate.
//
// 2 Modules, 27 questions each (54 total) in 32 minutes per module.
// Distribution per module follows the official digital SAT R&W blueprint
// (2026-06-10 re-blueprint to official-range midpoints):
//   * Craft and Structure: 8 (4 Words in Context, 3 Text Structure & Purpose,
//     1 Cross-Text Connections)
//   * Information and Ideas: 8 (3 Central Ideas/Details, 1 Command of
//     Evidence — Textual, 2 Command of Evidence — Quantitative, 2 Inferences)
//   * Standard English Conventions: 6 (Boundaries, Form/Structure/Sense)
//   * Expression of Ideas: 5 (3 Transitions, 2 Rhetorical Synthesis / Notes)
//
// Expository passages are ORIGINAL prose written for this practice test;
// literary excerpts are genuine, verified public-domain text quoted with
// attribution. Nothing is taken or paraphrased from College Board
// materials, prep books, or other copyrighted sources.


export const practiceTest12RW = {
  id: "practice-test-12-rw",
  title: "Practice Test 12 — Reading & Writing",
  description: "Full-length SAT Reading & Writing practice test with 2 modules",
  section: "reading-writing",
  totalQuestions: 54,
  timePerModule: 32,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      timeLimit: 32,
      questions: [
        {
          "id": 1203,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "A hot-air balloon carries no rudder, propeller, or sail, and a first-time spectator at a balloon competition might assume that the pilots are simply carried wherever the breeze happens to take them. The tactics of championship flying run ____ that assumption: because winds at different altitudes often move in different directions, a skilled pilot climbs and descends among the layers, choosing a height precisely because the current there bends toward the target.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "parallel to"
            },
            {
              "id": "B",
              "text": "ahead of"
            },
            {
              "id": "C",
              "text": "independent of"
            },
            {
              "id": "D",
              "text": "contrary to"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The spectator's assumption is that pilots drift helplessly; the colon then shows pilots steering deliberately by choosing wind layers. The tactics contradict the assumption, so they run \"contrary to\" it.\n\n**The Full Solution:**\n- The assumption: with no rudder, propeller, or sail, pilots \"are simply carried wherever the breeze happens to take them.\"\n- The reality after the colon: pilots climb and descend among wind layers, picking an altitude \"precisely because the current there bends toward the target\" — that is deliberate steering.\n- Helpless drifting and deliberate steering clash, so the blank needs a word of opposition: \"contrary to.\"\n\n**Why the other choices are wrong:**\n- A: \"Parallel to\" would mean the tactics match the assumption, the opposite of the clash the colon reveals.\n- B: \"Ahead of\" is about time or position, but nothing here is a matter of sequence.\n- C: \"Independent of\" would mean the tactics are simply unrelated to the assumption, but the passage presents them as direct evidence against it."
        },
        {
          "id": 1202,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Two lighthouses standing on the same stretch of coast can look nearly identical from the deck of a ship, and by day their lamps are of little help. Maritime authorities therefore paint each tower with its own bold pattern of stripes, bands, or checks, called a daymark. Because no two towers within sight of each other share a pattern, a sailor who consults a chart can ____ any lighthouse at a glance and fix the ship's position from it.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "admire"
            },
            {
              "id": "B",
              "text": "approach"
            },
            {
              "id": "C",
              "text": "identify"
            },
            {
              "id": "D",
              "text": "restore"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The whole point of the daymark system is telling towers apart: no two neighboring towers share a pattern, so a sailor with a chart can recognize which lighthouse is which. \"Identify\" means exactly that.\n\n**The Full Solution:**\n- The problem the passage sets up is confusion — two lighthouses \"can look nearly identical\" from a ship.\n- The solution is a unique painted pattern per tower, and the payoff is that a sailor \"can ____ any lighthouse at a glance and fix the ship's position from it.\"\n- Fixing a position from a lighthouse only works if the sailor knows which lighthouse it is, so the blank must mean recognizing or naming it: \"identify.\"\n\n**Why the other choices are wrong:**\n- A: \"Admire\" is about appreciating the tower's looks, which does nothing to fix a position.\n- B: \"Approach\" means to move toward the lighthouse, but the sailor is reading it from a distance, not sailing at it.\n- D: \"Restore\" means to repair the tower, an activity that has nothing to do with the patterns or the chart."
        },
        {
          "id": 1201,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
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
          "id": 1204,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "A cast net is thrown by hand, and a good throw looks effortless. Observations of practiced net fishers show that the net's wide, circular spread does not come from the strength of the arm alone but ____ from the whole body, as a coiled rotation of the hips and shoulders releases the weighted mesh in one smooth, spinning arc.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "derives"
            },
            {
              "id": "B",
              "text": "recovers"
            },
            {
              "id": "C",
              "text": "departs"
            },
            {
              "id": "D",
              "text": "benefits"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence contrasts two possible sources of the throw's power: not \"from the strength of the arm alone but ____ from the whole body.\" The blank must name where the spread truly comes from, and \"derives\" means to come from a source.\n\n**The Full Solution:**\n- The word \"but\" sets up a contrast between two origins for the net's spread — arm strength versus the whole body.\n- The clause after the blank explains the true origin: \"a coiled rotation of the hips and shoulders releases the weighted mesh.\"\n- So the blank needs a verb meaning to originate or come from, which is \"derives.\"\n\n**Why the other choices are wrong:**\n- B: \"Recovers\" means to get something back, but nothing here was lost.\n- C: \"Departs\" means to leave, which reverses the idea of the spread coming from the body.\n- D: \"Benefits\" would make the body merely a help to the throw, but the sentence names the body as the source of the spread, not an aid to it."
        },
        {
          "id": 1208,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "passages": [
            {
              "label": "Text 1",
              "text": "In the open-field villages of medieval Europe, a family's farmland was not one compact plot but dozens of narrow strips scattered across the village's great fields. To some economic historians, the scattering was a deliberate form of insurance. Hail, flooding, and blight rarely strike a whole landscape evenly, so a household whose strips lay in many different soils and situations could expect some of them to yield in almost any year. On this account, families accepted the cost of walking between distant strips because scattering protected them against the total failure of a single consolidated holding."
            },
            {
              "label": "Text 2",
              "text": "No one doubts that scattered strips spread a household's risk to some degree. But calling the scattering insurance implies that villagers designed their holdings for that purpose, when ordinary village life could produce the same pattern without any design at all. Strips changed hands piecemeal through inheritance, marriage, and sale, each transaction dividing or relocating a family's land, and neighbors who shared a plow team worked their lands in sequence rather than in one block. On this view, scattering was less a policy than a residue — the accumulated by-product of countless transactions that no one coordinated."
            }
          ],
          "question": "Based on the texts, how would the author of Text 2 most likely respond to the argument presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "The author would accept that scattering reduced a household's risk but deny that this benefit shows the pattern was created for that purpose."
            },
            {
              "id": "B",
              "text": "The author would object that scattering actually increased the chance that a family's entire harvest could be destroyed in a single bad year."
            },
            {
              "id": "C",
              "text": "The author would agree that villagers deliberately scattered their strips but argue that they did so to share plow teams rather than to manage risk."
            },
            {
              "id": "D",
              "text": "The author would reply that the records of inheritance, marriage, and sale are too incomplete to reveal how the strips came to be scattered."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Text 2 opens by conceding the benefit — \"No one doubts that scattered strips spread a household's risk\" — and then attacks the inference from benefit to purpose: the same pattern \"could... [arise] without any design at all.\" A keeps both the concession and the objection.\n\n**The Full Solution:**\n- Text 1's argument: scattering was deliberate insurance — families accepted the walking costs because dispersed strips protected against total failure.\n- Text 2 does not dispute that dispersed strips reduce risk; it disputes that the risk reduction explains the pattern's origin.\n- Its alternative: inheritance, marriage, sale, and shared plow teams would scatter holdings on their own, making the pattern \"a residue... that no one coordinated.\"\n- So the response is: yes, scattering helped, but that does not show it was designed to help — exactly choice A.\n\n**Why the other choices are wrong:**\n- B: It contradicts Text 2's opening concession that scattering did spread risk.\n- C: It keeps the deliberateness Text 2 rejects — the plow teams are offered as an undesigned cause, not a motive villagers acted on.\n- D: It invents a complaint about incomplete records; Text 2 relies on those very transactions as its explanation."
        },
        {
          "id": 1205,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The following text is from Alfred, Lord Tennyson's poem \"The Kraken,\" first published in Poems, Chiefly Lyrical (1830).\n\nBelow the thunders of the upper deep;\nFar, far beneath in the abysmal sea,\nHis antient, dreamless, uninvaded sleep\nThe Kraken sleepeth: faintest sunlights flee\nAbout his shadowy sides: above him swell\nHuge sponges of millennial growth and height;\nAnd far away into the sickly light,\nFrom many a wondrous grot and secret cell\nUnnumber'd and enormous polypi\nWinnow with giant arms the slumbering green.\nThere hath he lain for ages and will lie\nBattening upon huge seaworms in his sleep,\nUntil the latter fire shall heat the deep;\nThen once by man and angels to be seen,\nIn roaring he shall rise and on the surface die.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "The speaker describes a creature's undisturbed sleep far beneath the sea, then foretells the single violent event that will end both the sleep and the creature itself."
            },
            {
              "id": "B",
              "text": "The speaker recounts a long search for a legendary sea creature, then admits that the search has ended without the creature ever having been seen."
            },
            {
              "id": "C",
              "text": "The speaker asks whether a fabled creature could truly survive in the deep sea, then weighs the evidence on either side without settling the question."
            },
            {
              "id": "D",
              "text": "The speaker pictures a creature rising briefly from the depths to the surface of the sea, then follows it back down to the seafloor where its long, undisturbed rest quietly resumes."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Most of the poem dwells on the Kraken's ancient, unbroken sleep in the deep; the closing lines then leap forward to the one event that will end it — \"In roaring he shall rise and on the surface die.\"\n\n**The Full Solution:**\n- The opening lines fix the setting and the state: \"Far, far beneath in the abysmal sea,\" the Kraken's \"antient, dreamless, uninvaded sleep.\"\n- The middle lines fill in the sleeping world around him — millennial sponges, giant polypi winnowing the slumbering green — all continuing the stillness.\n- The turn comes with \"Until the latter fire shall heat the deep\": the poem ends by foretelling the creature's rise and immediate death at the surface, the single event that closes both the sleep and the life.\n\n**Why the other choices are wrong:**\n- B: It invents a search and a searcher; no one in the poem is looking for the Kraken, and its future rising is when it will be seen.\n- C: It imposes a question-and-evidence debate on a poem that asserts its scene without ever doubting it.\n- D: It reverses the poem's motion — the rise to the surface comes at the end, and nothing follows it but death, not a resumed rest.",
          "_meta": {
            "anchor": "Alfred, Lord Tennyson, \"The Kraken\" (1830) — genuine public-domain text, complete poem verbatim",
            "quoteVerify": true,
            "source": "Alfred, Lord Tennyson, \"The Kraken,\" Poems, Chiefly Lyrical (1830); text verified verbatim against Project Gutenberg ebook 8601 (The Early Poems of Alfred, Lord Tennyson), including the 1830 printing's spellings \"antient\" and \"Unnumber'd\"",
            "distractors": {
              "B": "invents a search narrative the poem lacks",
              "C": "imposes a debate structure on an assertive poem",
              "D": "reverses the poem's movement from sleep to fatal rising"
            }
          }
        },
        {
          "id": 1206,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "Many maps printed in Europe in the sixteenth and seventeenth centuries survive in both plain and hand-colored copies, and the colored ones raise a question catalogers cannot avoid: when was the color applied? Some scholars treat the coloring on such a map as original, pointing to publishers' workshops that employed professional colorists and advertised colored copies at higher prices. Others caution that color was added to many plain copies in the nineteenth century, when dealers found that tinted maps sold better, so a map's color may be centuries younger than its paper. The disagreement has proved productive: it has pushed catalogers to describe a map's printing and its coloring as separate events, each needing its own evidence and its own date.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It defends the practice of coloring printed maps against modern critics, then concludes that the origin of any particular map's color can now be established with confidence."
            },
            {
              "id": "B",
              "text": "It traces the training that professional map colorists received in publishers' workshops, then ranks the pigments they used according to how well each has survived."
            },
            {
              "id": "C",
              "text": "It poses a question raised by a class of surviving objects, presents two competing answers, and then describes a productive effect the disagreement has had on cataloging."
            },
            {
              "id": "D",
              "text": "It describes a dispute between two collectors over the age of a single celebrated map, then explains in detail how scientific analysis of the paper and pigments finally resolved that dispute."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The passage opens with the catalogers' question (when was the color applied?), lays out the two scholarly answers (original workshop coloring versus nineteenth-century additions), and closes with what the disagreement accomplished — printing and coloring are now dated separately.\n\n**The Full Solution:**\n- First move: a question raised by a whole class of objects — colored copies of early printed maps.\n- Second move: two competing answers, each with its evidence — publishers' colorists and price lists on one side, dealers' later tinting on the other.\n- Third move: the payoff — the dispute \"has proved productive,\" pushing catalogers to treat printing and coloring as separate events with separate dates. That question-answers-effect sequence is exactly choice C.\n\n**Why the other choices are wrong:**\n- A: The passage takes no side and never claims a color's origin can now be established with confidence — it says each case needs its own evidence.\n- B: It invents a ranking of pigments by survival that appears nowhere in the text.\n- D: The disagreement is between groups of scholars over a whole category of maps, not two collectors over one map, and nothing in the passage says the dispute was resolved."
        },
        {
          "id": 1207,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The glass harmonica looks unlike any other instrument: a nested row of glass bowls, graduated in size, mounted on a horizontal spindle that a foot treadle keeps turning. The player touches wetted fingertips to the rims of the rotating bowls, and friction sets the glass ringing, just as a moistened finger drawn around the rim of a wine glass does. Because each bowl is ground to sound a particular pitch, melodies and full chords are possible; because the bowls turn continuously, a note can be sustained for as long as the finger stays in place. The mechanism thus turned a familiar parlor trick into a true instrument, with a range of several octaves and a tone that listeners of its era found unearthly.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To argue that the glass harmonica deserves a far more prominent place in modern concert programming than it has so far been given."
            },
            {
              "id": "B",
              "text": "To explain how the glass harmonica produces its sound and what made it a genuine instrument rather than a curiosity."
            },
            {
              "id": "C",
              "text": "To compare the tone of the glass harmonica unfavorably with the tone of the singing wine glasses from which it developed."
            },
            {
              "id": "D",
              "text": "To describe the precise process by which the instrument's individual glass bowls were ground to their intended pitches."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The passage is an explanation from start to finish: it describes the instrument's mechanism — rotating bowls, wetted fingertips, friction — and then states what that mechanism achieved, turning \"a familiar parlor trick into a true instrument.\"\n\n**The Full Solution:**\n- The opening describes the apparatus: nested bowls on a spindle, kept turning by a treadle.\n- The middle explains the sound production (friction from wetted fingertips) and the two features that make real music possible — bowls ground to pitch for melody and chords, continuous rotation for sustained notes.\n- The closing sentence gives the significance: the mechanism elevated a parlor trick into a genuine instrument with a wide range. Explaining how it works and why that mattered is exactly choice B.\n\n**Why the other choices are wrong:**\n- A: The passage never discusses modern concert programming or argues for the instrument's revival.\n- C: The wine glass appears only as a familiar comparison for the friction principle; the passage never judges either tone against the other.\n- D: How the bowls were ground is mentioned in a single phrase, not described as a process — it is a detail, not the purpose."
        },
        {
          "id": 1209,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "When government surveyors first mapped the soils of the North American prairie in the early twentieth century, many expected the treeless grasslands to prove poorer than forested country, reasoning that land which could not support timber could not be rich. Digging revealed the opposite. Beneath the sod lay dark topsoil more than a meter deep in places, built up over thousands of years by the growth and decay of dense grass roots. The surveys recorded prairie soils among the most fertile on the continent, and later assessments confirmed the pattern: regions once passed over as barren became some of the most productive farmland in the world.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Soil surveys showed that prairie grasslands, once assumed to be poor because they supported no trees, in fact held unusually deep and fertile soils."
            },
            {
              "id": "B",
              "text": "Government surveyors produced the first detailed maps of the soils of the North American prairie in the early twentieth century."
            },
            {
              "id": "C",
              "text": "The dark topsoil that lies beneath the prairie sod was built up over many thousands of years by the growth and decay of the dense roots of prairie grasses."
            },
            {
              "id": "D",
              "text": "Farmland carved from the former prairie ultimately became more valuable than farmland in any forested region on the continent."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage is built around a reversal: surveyors expected poor soil under the treeless prairie, and digging \"revealed the opposite\" — deep, dark, exceptionally fertile topsoil. A captures both the expectation and the overturning.\n\n**The Full Solution:**\n- The setup: surveyors reasoned that land unable to support timber could not be rich.\n- The finding: topsoil more than a meter deep, among the most fertile on the continent.\n- The confirmation: land once passed over as barren became some of the world's most productive farmland. The main idea is that reversal, which only choice A states.\n\n**Why the other choices are wrong:**\n- B: It reports only that the mapping happened — the setup, not the point.\n- C: It gives the mechanism behind the deep topsoil, a supporting detail rather than the central reversal.\n- D: It overshoots the text, which never compares the value of prairie farmland with that of every forested region."
        },
        {
          "id": 1210,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Along the Atlantic coast of North America, farmers once cut hay from the salt marshes every summer, prizing the salt-tolerant grasses as feed and bedding for livestock. Harvesting a marsh, however, meant working land the sea still claimed twice a day. Farmers mowed at low tide, and they did not leave the cut hay lying where it fell: they stacked it on staddles, clusters of wooden posts driven into the mud that held each haystack several feet above the surface. Perched there, the hay stayed dry while the tides washed beneath it, and it could wait for weeks until the ground froze hard enough for wagons or sleds to cross the soft marsh and carry it home.",
          "question": "According to the text, why did farmers stack salt hay on staddles rather than leave it on the marsh?",
          "choices": [
            {
              "id": "A",
              "text": "Because hay left lying on the open marsh attracted wandering livestock that would have scattered and trampled the stacks."
            },
            {
              "id": "B",
              "text": "Because raised stacks could be loaded directly onto boats at high tide far more easily than hay lying loose on the ground."
            },
            {
              "id": "C",
              "text": "Because the raised platforms kept the hay dry and above the reach of the tides that regularly covered the marsh surface."
            },
            {
              "id": "D",
              "text": "Because the tall stacks could be seen from a distance and so marked the boundaries of each farmer's section of the marsh."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The passage states the reason directly: the marsh was land \"the sea still claimed twice a day,\" and on the staddles \"the hay stayed dry while the tides washed beneath it.\"\n\n**The Full Solution:**\n- The problem the passage sets up is tidal flooding — a marsh is covered by the sea twice daily.\n- The staddles answer that problem: posts held each haystack \"several feet above the surface,\" so the tides passed under the hay instead of soaking it.\n- The elevation also let the hay wait safely for weeks until frozen ground made hauling possible. Choice C restates exactly this.\n\n**Why the other choices are wrong:**\n- A: The passage never mentions livestock reaching the marsh — animals appear only as the eventual consumers of the hay.\n- B: It invents loading by boat; the text says the hay left the marsh by wagon or sled once the ground froze.\n- D: It invents a boundary-marking function that appears nowhere in the passage."
        },
        {
          "id": 1212,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "passage": "Paul Laurence Dunbar's poem \"Sympathy\" (1899) centers on a caged bird whose condition the speaker claims to understand from within. A reader might argue that the poem's final stanza insists on reinterpreting the bird's song: what a passerby could mistake for contentment is, in the poem's account, an anguished appeal — an expression not of happiness but of longing wrung from pain.",
          "question": "Which quotation from \"Sympathy\" most effectively illustrates the claim?",
          "choices": [
            {
              "id": "A",
              "text": "\"When the sun is bright on the upland slopes; / When the wind stirs soft through the springing grass, / And the river flows like a stream of glass\""
            },
            {
              "id": "B",
              "text": "\"It is not a carol of joy or glee, / But a prayer that he sends from his heart's deep core\""
            },
            {
              "id": "C",
              "text": "\"I know why the caged bird beats his wing / Till its blood is red on the cruel bars\""
            },
            {
              "id": "D",
              "text": "\"I know why the caged bird sings, ah me, / When his wing is bruised and his bosom sore\""
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The claim is that the poem reinterprets the song — not contentment but an anguished appeal — and these lines perform that reinterpretation in full: they deny the happy reading (\"not a carol of joy or glee\") and supply the true one (\"a prayer that he sends from his heart's deep core\").\n\n**The Full Solution:**\n- The claim has two halves: rejecting the mistaken reading of the song, and replacing it with the real meaning.\n- Choice B contains both — the denial and the substitute — so it illustrates the reinterpretation, not just the bird's suffering.\n- A prayer sent \"from his heart's deep core\" is precisely an appeal wrung from pain, matching the claim's language.\n\n**Why the other choices are wrong:**\n- A: These lines describe the inviting springtime world outside the cage; they say nothing about the song or its meaning.\n- C: The beating wing and bloodied bars show the bird's pain, but the claim is specifically about how the song should be understood.\n- D: It names the song and the suffering that accompanies it, but it never says what the song means — the reinterpretation the claim describes happens only in choice B.",
          "_meta": {
            "anchor": "Paul Laurence Dunbar, \"Sympathy\" (1899) — quotations verbatim",
            "quoteVerify": true,
            "source": "Paul Laurence Dunbar, \"Sympathy,\" Lyrics of the Hearthside (1899); quotations verified verbatim against the Wikisource transcription of The Complete Poems of Paul Laurence Dunbar (1913)",
            "distractors": {
              "A": "scene outside the cage, silent on the song",
              "C": "shows pain but not the song's reinterpretation",
              "D": "names the song and the pain but not the song's meaning"
            }
          }
        },
        {
          "id": 1213,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "In target competition, hot-air balloon pilots attempt to drop a weighted marker as close as possible to a target laid out on the ground, and a pilot's performance over a championship is summarized by the mean distance from marker to target across all scored tasks. Reviewing one national championship, the event's organizers noted that although the top five finishers were closely matched on most measures, one competitor stood clearly apart from the rest because ______",
          "questionTable": {
            "type": "table",
            "caption": "Top five finishers at a national hot-air balloon championship",
            "headers": [
              "Pilot",
              "Mean distance from target (meters)",
              "Tasks scored"
            ],
            "rows": [
              [
                "Pilot 1",
                "4.2",
                "18"
              ],
              [
                "Pilot 2",
                "21.5",
                "18"
              ],
              [
                "Pilot 3",
                "24.8",
                "17"
              ],
              [
                "Pilot 4",
                "27.1",
                "18"
              ],
              [
                "Pilot 5",
                "29.9",
                "16"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "Pilot 1's mean marker distance of 4.2 meters was by far the lowest of the five, less than a fifth of the next-best mean of 21.5 meters."
            },
            {
              "id": "B",
              "text": "Pilot 5 recorded the highest mean marker distance of the five in the table, 29.9 meters, and also scored the fewest tasks of any of the finishers."
            },
            {
              "id": "C",
              "text": "Pilot 3 scored 17 tasks, one fewer than the 18 tasks scored by each of three of the other pilots and one more than the 16 tasks scored by Pilot 5."
            },
            {
              "id": "D",
              "text": "the five pilots' mean marker distances ranged from 4.2 meters at the low end to 29.9 meters at the high end."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence needs the competitor who \"stood clearly apart from the rest,\" and the table shows Pilot 1 at 4.2 meters — a mean less than one fifth of the next-best 21.5 meters, while the other four cluster between 21.5 and 29.9.\n\n**The Full Solution:**\n- In this event a lower mean distance is better, so scan the distance column for a value separated from the pack.\n- Pilots 2 through 5 sit within about 8 meters of one another (21.5 to 29.9) — that is the \"closely matched\" group the sentence describes.\n- Pilot 1's 4.2 meters lies far below that cluster, so Pilot 1 is the one who stands apart, exactly as choice A states.\n\n**Why the other choices are wrong:**\n- B: Pilot 5's 29.9 meters sits only 2.8 meters from Pilot 4's mean — the worst of the cluster, not a competitor set apart from it.\n- C: Task counts differ by at most two across the field; they show the pilots' similarity, not one standing apart.\n- D: Stating the overall range never identifies which pilot stands apart or by how much."
        },
        {
          "id": 1216,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "A cast net catches fish only during the brief moment of its fall. The net must open into a full circle at the top of its flight, covering the widest possible stretch of water, and its weighted edge must then sink quickly enough to close around the fish before they dart out from under the descending mesh. Net makers weigh these demands against each other: heavier rim weights speed the sink but make the net harder to spread fully, while a lighter rim opens beautifully yet settles too slowly to trap anything. Fishers who study the craft observe that a net failing either test — spread or speed — comes up empty just the same. Their observations suggest that an effective cast net ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "should carry the heaviest rim weights its thrower can manage, since the speed of the sink matters more than the width of the spread."
            },
            {
              "id": "B",
              "text": "will catch fish reliably so long as it opens into a full circle, whatever the rate at which its weighted edge settles through the water."
            },
            {
              "id": "C",
              "text": "performs best in deep water, where fish have extra room to dart out from beneath the mesh as it makes its long descent."
            },
            {
              "id": "D",
              "text": "must satisfy two demands at once, opening wide enough to cover the fish and sinking fast enough to close around them before they escape."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The passage names two requirements — full spread and fast sink — and then states that failing EITHER one leaves the net empty. The only conclusion that fits is that an effective net must meet both at once.\n\n**The Full Solution:**\n- Requirement one: the net \"must open into a full circle\" to cover the widest water.\n- Requirement two: the weighted edge \"must then sink quickly enough\" to close before the fish escape.\n- The design tension shows the two trade off against each other — weight helps one and hurts the other.\n- The clincher: a net \"failing either test — spread or speed — comes up empty just the same.\" A conclusion mentioning only one requirement is ruled out; D keeps both.\n\n**Why the other choices are wrong:**\n- A: Maximizing rim weight sacrifices the spread, which the passage says is just as fatal as a slow sink.\n- B: It drops the sink-speed requirement entirely, though the passage says a slow-settling net traps nothing.\n- C: It reverses the logic — room for fish to dart out from under the mesh is the problem the fast sink exists to prevent, not an advantage."
        },
        {
          "id": 1211,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Steamships are usually said to have driven sail from the seas by the end of the nineteenth century, but the coasting schooner tells a more stubborn story. Schooners rigged fore-and-aft could be worked by unusually small crews, entered shallow harbors closed to larger vessels, and burned no coal at all. On routes where speed mattered little — carrying lumber, granite, and oysters to towns along the shore — those economies kept schooners profitable for decades after steam had captured the passenger and express trades. Maritime historians who tally harbor records find schooners still delivering bulk cargo along the northern coast well into the twentieth century, long after the age of sail had supposedly closed.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "By the end of the nineteenth century, steamships had taken over from sailing vessels of every kind the carrying of both passengers and express freight."
            },
            {
              "id": "B",
              "text": "Schooners rigged fore-and-aft could be sailed by far smaller crews than the deepwater square-rigged ships of the same era required."
            },
            {
              "id": "C",
              "text": "Because they were cheap to operate and could reach harbors steamships could not, coasting schooners stayed profitable in bulk trades long after steam ruled other routes."
            },
            {
              "id": "D",
              "text": "Maritime historians have concluded that the cost of a vessel's crew mattered more to most nineteenth-century shippers than the speed of the vessel's passage."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The passage's point is the schooner's stubborn survival: cheap crews, no coal, and access to shallow harbors kept the vessels profitable in slow bulk trades for decades after steam had taken the glamorous routes.\n\n**The Full Solution:**\n- The opening announces a correction to the usual story that steam simply drove out sail.\n- The middle gives the schooner's specific economies — small crews, shallow draft, no fuel cost — and the niche where they counted: slow bulk cargo like lumber, granite, and oysters.\n- The close cites harbor records showing schooners at work \"well into the twentieth century.\" C gathers the cause (cheap operation, harbor access) and the effect (long profitability in bulk trades).\n\n**Why the other choices are wrong:**\n- A: It restates the conventional story the passage sets out to complicate, and it is the setup, not the idea.\n- B: It isolates one economy (small crews) and adds a comparison with square-riggers the text never makes in that form.\n- D: It inflates the passage into a general ranking of crew cost over speed that the historians are never said to draw."
        },
        {
          "id": 1214,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "Manoomin, the wild rice native to shallow lakes across the north-central United States, is traditionally gathered from canoes by knocking ripe seed into the boat with wooden flails, a method that lets much of the seed fall into the water and sow the following year's stand. Resource managers reviewing harvest studies caution that this reseeding cannot be treated as a single fixed rate, since at one closely monitored lake where three harvesting methods were used on separate plots in the same season, the share of seed returned to the water differed enormously by method, suggesting that ______",
          "questionTable": {
            "type": "table",
            "caption": "Share of seed returned to the water during wild rice harvest, by lake and method (single season)",
            "headers": [
              "Lake",
              "Harvest method",
              "Seed returned (%)"
            ],
            "rows": [
              [
                "Bearskin Lake",
                "hand flail, from canoe",
                "38"
              ],
              [
                "Rice Lake",
                "hand flail, from canoe",
                "42"
              ],
              [
                "Rice Lake",
                "push-pole skimmer",
                "19"
              ],
              [
                "Rice Lake",
                "mechanical harvester",
                "3"
              ],
              [
                "Little Elk Lake",
                "hand flail, from canoe",
                "35"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "across all five plots shown in the table, at least some seed was returned to the water during harvest, with shares ranging from 3 percent to 42 percent."
            },
            {
              "id": "B",
              "text": "at Rice Lake, hand flailing returned 42 percent of seed to the water while the push-pole skimmer returned 19 percent and the mechanical harvester only 3 percent — a fourteenfold spread among methods used on one lake."
            },
            {
              "id": "C",
              "text": "hand flailing returned 42 percent of seed at Rice Lake, 38 percent at Bearskin Lake, and 35 percent at Little Elk Lake, a narrow spread across the three lakes where the method was used."
            },
            {
              "id": "D",
              "text": "at Rice Lake, hand flailing returned 42 percent of seed to the water while the mechanical harvester returned only 3 percent, a gap showing that mechanical harvesting is by far the most efficient method of gathering wild rice."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The claim is about variation BY METHOD at one lake, so the supporting data must come from the single lake where multiple methods were used. Rice Lake is that lake, and its three methods span 42, 19, and 3 percent — a fourteenfold spread in one place, in one season.\n\n**The Full Solution:**\n- Reread what the blank must support: at \"one closely monitored lake,\" the seed returned \"differed enormously by method.\"\n- Only Rice Lake appears with three methods, so the evidence must stay inside its three rows.\n- Those rows run 42 percent (hand flail), 19 percent (skimmer), and 3 percent (mechanical) — the enormous within-lake spread the sentence asserts, which is exactly what B reports.\n\n**Why the other choices are wrong:**\n- A: It pools all five plots into one overall range, mixing lakes together and losing the within-lake, method-by-method comparison.\n- C: It compares one method across three different lakes — evidence that the method is consistent, nearly the opposite of the claim about methods differing.\n- D: It uses only two of Rice Lake's three methods and then smuggles in a conclusion about efficiency the table cannot support, since seed returned is not a measure of harvest efficiency."
        },
        {
          "id": 1215,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "The Shaker communities of nineteenth-century America furnished their own dwellings with plain, carefully joined furniture and also produced chairs by the thousand for sale to the outside world. The two streams of work came out of the same shops: the same members, using the same patterns and the same standards of workmanship, built for the meetinghouse and for the market alike, and few pieces of either kind carry a maker's name. Curators asked to determine whether a surviving chair was made for community use or for sale have found that the chair itself rarely settles the question. Their experience suggests that ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "sorting the two kinds of work depends on evidence beyond the furniture itself, such as sales ledgers and community records."
            },
            {
              "id": "B",
              "text": "chairs made for sale can usually be identified by their inferior workmanship, since pieces intended for outsiders were finished with less care."
            },
            {
              "id": "C",
              "text": "most surviving Shaker chairs must have been made for community use, since furniture sold to outsiders would rarely have been preserved."
            },
            {
              "id": "D",
              "text": "the question of a chair's original purpose should be abandoned, because the two streams of work cannot be told apart by any means."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** If identical hands, patterns, and standards produced both streams of work, and the pieces are unsigned, then the object alone cannot reveal its intended destination — so the answer must come from somewhere other than the object.\n\n**The Full Solution:**\n- The key facts: community furniture and sale furniture came from the same shops, by the same makers, to the same standards, and few pieces are marked.\n- The curators' experience confirms the consequence: \"the chair itself rarely settles the question.\"\n- What follows is that settling it requires outside evidence — documents like ledgers and community records — which is precisely choice A.\n\n**Why the other choices are wrong:**\n- B: It contradicts the passage, which says both streams were built to the same standards of workmanship.\n- C: Nothing in the text supports a claim about which chairs survived; preservation is never discussed.\n- D: It overshoots — the passage says the chair itself rarely answers the question, not that the question can never be answered at all."
        },
        {
          "id": 1222,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Museums devoted to Shaker craftsmanship let visitors handle the work as well as look at it. At one restored village, a joinery demonstration and a case of graduated oval boxes ____ visitors a feel for the sect's exacting standards, from the tight swallowtail joints of the boxes to the drawers that still slide shut on a cushion of air.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "gives"
            },
            {
              "id": "B",
              "text": "is giving"
            },
            {
              "id": "C",
              "text": "give"
            },
            {
              "id": "D",
              "text": "has given"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject is compound — \"a joinery demonstration and a case of graduated oval boxes\" — and two subjects joined by \"and\" take a plural verb: \"give.\"\n\n**The Full Solution:**\n- The rule: nouns joined by \"and\" form a plural subject and require a plural verb.\n- Ask what gives visitors the feel: the demonstration AND the case of boxes together, so the subject counts as plural.\n- A trap hides in the second subject: its head noun is the singular \"case\" (of boxes), which can tempt the ear toward a singular verb — but the verb agrees with the whole compound subject, not with its last piece.\n- The sentence describes what the museum offers in the present (\"let visitors handle\"), so the plural present \"give\" fits.\n\n**Why the other choices are wrong:**\n- A: \"Gives\" is singular and cannot agree with the two-part subject.\n- B: \"Is giving\" is singular as well, and its in-progress sense misfits a standing exhibit.\n- D: \"Has given\" is singular too, and it moves a present offering into a completed past."
        },
        {
          "id": 1217,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "In the nineteenth century, many cities moved their food markets out of the open street and into purpose-built halls of iron and glass. Although shoppers at first missed the noise and bargaining of the old outdoor ____ the new buildings kept produce out of the rain, allowed every stall to be inspected, and could be washed down at the close of each day.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "market"
            },
            {
              "id": "B",
              "text": "market;"
            },
            {
              "id": "C",
              "text": "market:"
            },
            {
              "id": "D",
              "text": "market,"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The sentence opens with a dependent clause beginning with \"Although,\" and a comma must mark where that clause ends and the main clause begins.\n\n**The Full Solution:**\n- The rule: an introductory clause led by a word like although, because, or when cannot stand alone, and it takes a comma at its end before the main clause starts.\n- Here the introductory clause is \"Although shoppers at first missed the noise and bargaining of the old outdoor market,\" and the main clause is \"the new buildings kept produce out of the rain...\"\n- Without the comma, the words run together as \"the old outdoor market the new buildings,\" hiding the boundary between the two clauses.\n\n**Why the other choices are wrong:**\n- A: With no punctuation, the dependent clause fuses into the main clause and the sentence becomes unreadable at the join.\n- B: A semicolon requires an independent clause on each side, but the \"Although\" clause cannot stand alone.\n- C: A colon must follow a complete statement that introduces what comes next, and the unfinished \"Although\" clause is not one."
        },
        {
          "id": 1220,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Cast-net fishing along the southern coast was long a craft passed down without written record, each fisher adjusting mesh size and rim weight by feel. In 1902, a state fisheries bureau ____ a survey of the nets then in use, measuring and cataloging the designs that individual fishers had settled on after years of trial.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "conducts"
            },
            {
              "id": "B",
              "text": "has conducted"
            },
            {
              "id": "C",
              "text": "had conducted"
            },
            {
              "id": "D",
              "text": "conducted"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The action happened at one dated moment in the past — \"In 1902\" — so the simple past tense \"conducted\" is required.\n\n**The Full Solution:**\n- The rule: a verb's tense must match the time frame the sentence establishes.\n- The phrase \"In 1902\" pins the survey to a single, finished point in the past, and a completed, dated event takes the simple past.\n- \"In 1902, a state fisheries bureau conducted a survey\" states the finished event plainly.\n\n**Why the other choices are wrong:**\n- A: \"Conducts\" is present tense, which contradicts the 1902 date.\n- B: \"Has conducted\" is the present perfect, used for actions with continuing present relevance and incompatible with a specific past date like \"In 1902.\"\n- C: \"Had conducted\" is the past perfect, which requires a second, later past event for the survey to have happened before — and the sentence supplies none."
        },
        {
          "id": 1218,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "A gondola's hull is not symmetric: the left side swells out farther than the right, so that the boat leans slightly toward the gondolier's rowing side. The curved oak ribs that a boatbuilder shapes for the port side ____ a different template from the starboard set, and the difference, invisible to most passengers, is what lets a single stern oar drive the boat in a straight line.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "follows"
            },
            {
              "id": "B",
              "text": "follow"
            },
            {
              "id": "C",
              "text": "is following"
            },
            {
              "id": "D",
              "text": "has followed"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The subject of the verb is \"ribs,\" which is plural, so the verb must be the plural form \"follow.\"\n\n**The Full Solution:**\n- The rule: a verb agrees with its actual subject, not with whatever noun happens to sit closest to the blank.\n- Ask what follows the template: \"The curved oak ribs... follow a different template.\" The subject is the plural \"ribs.\"\n- The singular noun \"boatbuilder\" sits just before the blank inside the descriptive clause \"that a boatbuilder shapes for the port side,\" but the boatbuilder is not doing the following — that clause only describes the ribs.\n- The surrounding sentence is in the present tense (\"is what lets\"), so the plural present \"follow\" fits.\n\n**Why the other choices are wrong:**\n- A: \"Follows\" is singular and clashes with the plural subject \"ribs.\"\n- C: \"Is following\" is singular as well, and its in-progress sense misdescribes a permanent fact of the design.\n- D: \"Has followed\" is singular too, and it shifts a standing practice into a completed past the sentence does not describe."
        },
        {
          "id": 1221,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "A county soil survey of the early twentieth century rested on three kinds of records: the maps drawn in the field, which traced each soil's boundaries as the survey party walked the ____ the pit descriptions, written up wherever a hole was dug, that noted the depth, color, and texture of every layer; and the laboratory reports on samples shipped back for chemical analysis.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "ground;"
            },
            {
              "id": "B",
              "text": "ground:"
            },
            {
              "id": "C",
              "text": "ground,"
            },
            {
              "id": "D",
              "text": "ground"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence lists three kinds of records, and because the items themselves contain commas, the items must be separated by semicolons — so the first item ends with a semicolon after \"ground.\"\n\n**The Full Solution:**\n- The rule: when items in a list carry commas of their own, the dividers between items are promoted to semicolons so a reader can tell where one item stops and the next starts.\n- The three items are the field maps (\"which traced each soil's boundaries...\"), the pit descriptions (\"written up wherever a hole was dug...\"), and the laboratory reports — and the second item alone contains three internal commas.\n- The list's third item is already introduced by \"; and,\" confirming the semicolon pattern, so the first divider must match: \"ground;\".\n\n**Why the other choices are wrong:**\n- B: A colon here would open a second list inside the one that the colon after \"records\" has already introduced.\n- C: A comma cannot divide these items, because commas are already at work inside them.\n- D: With no punctuation, the first two items fuse into one unreadable run."
        },
        {
          "id": 1219,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "The modern revival of the harpsichord began with compromise instruments, built on piano-style frames so that they could survive concert touring. Performers of the early twentieth century recorded and toured with these sturdy ____ later builders carried the revival further, copying surviving eighteenth-century instruments plank by plank and finding that the light older construction produced a clearer, more speaking tone.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "hybrids"
            },
            {
              "id": "B",
              "text": "hybrids,"
            },
            {
              "id": "C",
              "text": "hybrids;"
            },
            {
              "id": "D",
              "text": "hybrids, but"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Two independent clauses meet at the blank, and a semicolon joins them correctly without a conjunction.\n\n**The Full Solution:**\n- Test each side for independence: \"Performers of the early twentieth century recorded and toured with these sturdy hybrids\" stands alone, and so does \"later builders carried the revival further...\"\n- Two independent clauses require a period, a semicolon, or a comma plus a coordinating conjunction between them.\n- The second clause continues the revival's story rather than opposing the first — the builders \"carried the revival further\" — so the plain semicolon, which joins without forcing a relationship, is the right choice.\n\n**Why the other choices are wrong:**\n- A: With no punctuation, the two complete sentences collide (\"these sturdy hybrids later builders carried...\").\n- B: A comma alone between two independent clauses is a comma splice.\n- D: \"Hybrids, but\" is grammatical, yet \"but\" asserts a contrast, and the second clause extends the revival's progress rather than opposing it — the builders carried the same project further."
        },
        {
          "id": 1223,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "In the adobe villages of the southwestern United States, replastering has long been a communal and seasonal task: households gather each spring to renew the protective mud coating on one another's walls before the summer storms arrive. ______ in the oasis towns along the edge of the Sahara, families maintain their earthen houses on a shared calendar, applying fresh coats of plaster together in the weeks after the date harvest and before the rains.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Likewise,"
            },
            {
              "id": "B",
              "text": "However,"
            },
            {
              "id": "C",
              "text": "For instance,"
            },
            {
              "id": "D",
              "text": "In turn,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The second sentence presents a parallel case — another arid region where earthen walls are replastered communally on a seasonal schedule — so the similarity word \"Likewise\" fits.\n\n**The Full Solution:**\n- First sentence: in the southwestern United States, households replaster together each spring, ahead of the summer storms.\n- Second sentence: in Saharan oasis towns, families do the same kind of work together, timed after the date harvest and before the rains.\n- The two cases match point for point — communal labor, earthen walls, a weather-driven calendar — and matching cases call for a same-as-this transition: \"Likewise.\"\n\n**Why the other choices are wrong:**\n- B: \"However\" signals a clash, but the two practices agree in every particular the passage mentions.\n- C: \"For instance\" introduces an example of a general claim, but the first sentence is itself a specific case, not a generalization the second could exemplify.\n- D: \"In turn\" would make the Saharan practice a consequence flowing from the American one, but the two are independent parallel traditions, not cause and effect."
        },
        {
          "id": 1225,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "A harpsichord plucks its strings: pressing a key raises a small plectrum that snaps past the string, and the note sounds at the same loudness however firmly the player strikes. Eighteenth-century builders of the early piano replaced the plectrum with a leather-covered hammer whose force depends on the player's touch, so that a single keyboard could whisper or thunder at will. ______ composers writing for the new instrument began marking gradations of loudness directly into their scores — indications that would have been meaningless on the harpsichord.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "For example,"
            },
            {
              "id": "B",
              "text": "As a result,"
            },
            {
              "id": "C",
              "text": "Even so,"
            },
            {
              "id": "D",
              "text": "Until then,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The hammer action gave players control over loudness, and the final sentence reports what FOLLOWED from that new capability — composers began writing dynamics into their scores — so the cause-and-effect link \"As a result\" fits.\n\n**The Full Solution:**\n- The harpsichord's plectrum made every note equally loud, whatever the player did.\n- The early piano's hammer put loudness under the player's control: the keyboard \"could whisper or thunder at will.\"\n- The last sentence gives the consequence of that control: marked gradations of loudness now meant something, so composers started writing them. A consequence takes a result transition.\n\n**Why the other choices are wrong:**\n- A: \"For example\" would make the composers' markings an illustration of the hammer mechanism, but the markings are an outcome of it, not an instance.\n- C: \"Even so\" signals a result that arrives despite what came before, but the marking of dynamics flows from the new instrument rather than defying it.\n- D: \"Until then\" points to the time before the change, yet the sentence describes what composers began doing after the new instrument existed."
        },
        {
          "id": 1224,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Venetian gondolas were built with symmetric hulls for most of their long history, and propelling one was a two-person job. During the nineteenth century, boatyards began sweeping the hull's centerline into a deliberate curve, a change that balanced the push of a single stern oar and let one gondolier manage the boat alone. ______ every working gondola is built asymmetric, and the one-rower design is so completely standard that passengers rarely suspect the hull beneath them is curved.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Moreover,"
            },
            {
              "id": "B",
              "text": "Nevertheless,"
            },
            {
              "id": "C",
              "text": "Previously,"
            },
            {
              "id": "D",
              "text": "Today,"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The passage moves through time — centuries of symmetric hulls, then a nineteenth-century change, then the present state of the craft — and the final sentence describes the current situation, so the present-time marker \"Today\" fits.\n\n**The Full Solution:**\n- Sentence one covers \"most of their long history\": symmetric hulls, two rowers.\n- Sentence two covers the nineteenth century: boatyards introduced the curved, asymmetric hull.\n- The last sentence reports the present outcome — every working gondola is asymmetric, and the design is standard. A sentence describing the now needs a present-time transition: \"Today.\"\n\n**Why the other choices are wrong:**\n- A: \"Moreover\" adds another point of the same kind, but this sentence advances the story to a new time, not a further fact about the nineteenth century.\n- B: \"Nevertheless\" would make the design's universality a surprise holding out against the change just described, when it is that change's direct legacy.\n- C: \"Previously\" points backward, but the sentence describes the state of gondola building now, not before."
        },
        {
          "id": 1226,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Curtis F. Marbut (1863-1935) was an American soil scientist.",
              "In 1913 he took charge of the national soil survey of the United States.",
              "Earlier surveys had classified each soil chiefly by the rock beneath it, treating soil as little more than crushed rock.",
              "Marbut argued that a soil is a natural body in its own right, formed by climate, vegetation, and time acting on the land.",
              "He reorganized American soil classification around the soil's own layered profile rather than its parent rock.",
              "His system became the framework for the national soil maps used by farmers and land planners."
            ],
            "goal": "The student wants to explain Marbut's main contribution to an audience unfamiliar with soil science."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Curtis F. Marbut, an American soil scientist who lived from 1863 to 1935, took charge of the national soil survey of the United States in 1913 and went on to direct its fieldwork and its county-by-county mapping for more than two decades afterward."
            },
            {
              "id": "B",
              "text": "Under Marbut's direction, government surveyors carried the national soil survey of the United States forward using his reorganized system of classification."
            },
            {
              "id": "C",
              "text": "Soil scientist Curtis F. Marbut rebuilt American soil classification on the idea that a soil is a natural body formed by climate, vegetation, and time — not merely crushed rock — a framework that still underlies the national soil maps."
            },
            {
              "id": "D",
              "text": "Marbut's classification replaced an earlier system and became the accepted framework for producing the national soil maps of the United States."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The goal is to explain Marbut's main contribution to readers who know nothing of soil science, and C does the whole job: it identifies him, states the idea he introduced, contrasts it with what it replaced, and notes why it still matters.\n\n**The Full Solution:**\n- An unfamiliar audience needs the substance of the contribution, not just its reception: what did Marbut actually change?\n- C names the old view (soil as crushed rock), the new idea (soil as a natural body formed by climate, vegetation, and time), and the lasting result (the framework behind the national soil maps).\n- That is the contribution itself, explained from the ground up — exactly what the goal demands.\n\n**Why the other choices are wrong:**\n- A: It gives dates and a job title but never says what Marbut contributed.\n- B: It reports that his system was used without ever saying what the system was.\n- D: It says the contribution was adopted but leaves its content a mystery — an unfamiliar reader still cannot say what Marbut's idea actually was."
        },
        {
          "id": 1227,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "C. S. Orwin (1876-1955) was an English agricultural historian.",
              "For generations, scholars had described medieval open-field farming almost entirely from documents: court rolls, estate surveys, and legal treatises.",
              "In the village of Laxton in Nottinghamshire, an open-field system of farming survived in continuous operation into the twentieth century.",
              "With Christabel Orwin, he published The Open Fields (1938), a study of how strip farming actually worked.",
              "The Orwins mapped Laxton's fields strip by strip and followed the village's farming through its working year.",
              "Their study treated the surviving system itself as evidence, correcting details that documents alone had left unclear."
            ],
            "goal": "The student wants to emphasize the methodological innovation of the Orwins' study."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "The English agricultural historian C. S. Orwin published The Open Fields in 1938 with Christabel Orwin, a detailed study of how the strip farming of the medieval open-field villages actually worked in practice."
            },
            {
              "id": "B",
              "text": "In the Nottinghamshire village of Laxton, an open-field system of farming remained in continuous operation into the twentieth century, long after such systems had vanished elsewhere."
            },
            {
              "id": "C",
              "text": "The Orwins' study of Laxton corrected details of the standard account of open-field farming that generations of document-based scholarship had left unclear."
            },
            {
              "id": "D",
              "text": "Rather than reconstruct open-field farming from court rolls and treatises, the Orwins studied a living example, mapping Laxton's strips one by one and following the village's farming through its working year."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The goal is to spotlight what was new about the Orwins' METHOD, and D is built around exactly that contrast: not documents, but a living system, mapped strip by strip and observed through the working year.\n\n**The Full Solution:**\n- The methodological innovation, per the notes, is the shift in evidence: earlier scholars worked \"almost entirely from documents,\" while the Orwins \"treated the surviving system itself as evidence.\"\n- D states the old method (reconstruction from court rolls and treatises), then the new one (studying Laxton directly), then the concrete practices that made it a method — mapping every strip, following the farming year.\n- Foregrounding how the study was done, against the background of how such studies used to be done, is precisely what \"emphasize the methodological innovation\" requires.\n\n**Why the other choices are wrong:**\n- A: It announces the book and its subject but says nothing about how the study was carried out.\n- B: It states the fact that made the method possible — Laxton's survival — without mentioning the Orwins or their approach at all.\n- C: It reports the study's results (corrected details), but results are what the method produced, not the method itself."
        }
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 32,
      questions: [
        {
          "id": 1228,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "The great market halls of the nineteenth century were framed in cast iron, and the material shaped their later fates. A cast-iron building cannot easily be ____: unlike a timber frame, which a carpenter can cut, splice, and extend on site, iron columns and trusses were cast to their final shape at the foundry, so a hall that had outgrown its trade needed new members ordered as though a second building were being begun.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "altered"
            },
            {
              "id": "B",
              "text": "inspected"
            },
            {
              "id": "C",
              "text": "imitated"
            },
            {
              "id": "D",
              "text": "maintained"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The colon defines the blank: timber can be \"cut, splice[d], and extend[ed] on site,\" but iron members came from the foundry in final form, so changing the building meant ordering new parts. The missing word must mean changed or modified — \"altered.\"\n\n**The Full Solution:**\n- A colon after a blank typically explains it, so read on and let the explanation fix the meaning.\n- The contrast is with timber, whose advantage is easy physical modification — cutting, splicing, extending.\n- Iron's members were \"cast to their final shape,\" so enlarging or reshaping a hall required what amounted to a second building. The blocked activity is alteration.\n\n**Why the other choices are wrong:**\n- B: \"Inspected\" has nothing to do with the colon's contrast about cutting and splicing.\n- C: \"Imitated\" means copied, but the sentence concerns changing the building itself, not reproducing it.\n- D: \"Maintained\" is tempting — old buildings do need upkeep — but the colon is about reshaping outgrown structures, not keeping them in repair."
        },
        {
          "id": 1229,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "The account books of the last coasting schooners record a trade squeezed from every side. Rising insurance rates on aging wooden hulls, railroad spurs pushing into the quarry towns, and steam vessels that kept their schedules in any weather all ____ the schooners' hold on the bulk trades, until owners could turn a profit only by buying worn vessels cheaply and sailing them, uninsured, to the end of their working lives.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "confirmed"
            },
            {
              "id": "B",
              "text": "eroded"
            },
            {
              "id": "C",
              "text": "restored"
            },
            {
              "id": "D",
              "text": "described"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** Three pressures — insurance costs, railroads, steamers — act together on \"the schooners' hold on the bulk trades,\" and the result is a trade reduced to sailing worn-out, uninsured vessels. The pressures wore that hold away: they \"eroded\" it.\n\n**The Full Solution:**\n- The opening announces the direction: a trade \"squeezed from every side.\"\n- The sentence then lists three squeezing forces, each removing some of the schooners' business — costs rising, cargoes leaving by rail, customers won by reliable steam.\n- The endpoint (\"until owners could turn a profit only by...\") shows a grip weakened by degrees rather than broken at a stroke, which is exactly what \"eroded\" conveys: gradual wearing away.\n\n**Why the other choices are wrong:**\n- A: \"Confirmed\" would mean the forces strengthened or proved the schooners' hold, the reverse of a squeeze.\n- C: \"Restored\" points the wrong direction entirely — the hold was being lost, not recovered.\n- D: \"Described\" makes no sense as an action of insurance rates and rail lines upon a trade; the account books describe, the forces act."
        },
        {
          "id": 1230,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Watching a gondolier scull from the stern, a passenger might take the rowing for a leisurely push: the oar never leaves the water, and the stroke can look like idle stirring. Far from being ____, however, the technique is exact. The blade must be feathered at a precise angle on each return, and the oar must be seated against the forcola — the tall, carved wooden oarlock — at one of several distinct notches, each chosen for a particular maneuver.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "silent"
            },
            {
              "id": "B",
              "text": "modern"
            },
            {
              "id": "C",
              "text": "strenuous"
            },
            {
              "id": "D",
              "text": "casual"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The frame \"Far from being ____, however, the technique is exact\" makes the blank the opposite of \"exact\" — and specifically the false impression just described, a stroke that \"can look like idle stirring.\" \"Casual\" names that impression.\n\n**The Full Solution:**\n- \"Far from being\" announces that the blank is what the technique is NOT, in contrast to what it is: exact.\n- The passage has already supplied the mistaken appearance: a \"leisurely push,\" \"idle stirring.\" The blank should capture that look of carelessness or ease.\n- The evidence for exactness follows — a precise feathering angle, distinct notches on the forcola for particular maneuvers — confirming that the rejected idea is offhandedness, i.e., being \"casual.\"\n\n**Why the other choices are wrong:**\n- A: \"Silent\" concerns sound, which the passage never mentions and which does not contrast with exactness.\n- B: \"Modern\" concerns age, equally beside the point of the precision contrast.\n- C: \"Strenuous\" fails the logic twice — the passage's false impression is of ease, so denying strenuousness would agree with the impression rather than correct it, and effort is not the opposite of exactness."
        },
        {
          "id": 1231,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Coastal engineers reviewing the record of marsh drainage describe a practice that worked against its own purpose. To dry the surface of the marsh for haying, crews cut grids of narrow ditches; over the decades the program proved ____: as the peat drained, it compacted and sank, the lowered surface pooled and flooded more than before, and each new round of subsidence was answered with another round of ditching.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "irreversible"
            },
            {
              "id": "B",
              "text": "uncontrollable"
            },
            {
              "id": "C",
              "text": "self-defeating"
            },
            {
              "id": "D",
              "text": "methodical"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The opening sentence gives the thesis — a practice \"that worked against its own purpose\" — and the colon shows the loop: ditching sank the peat, the sunken surface flooded MORE, and the response was more ditching. A program that worsens the very condition it exists to cure is \"self-defeating.\"\n\n**The Full Solution:**\n- The purpose of the ditches was to dry the marsh surface.\n- The colon traces the actual chain: drained peat compacts and sinks, the lower surface pools and floods more than before, and more ditching follows.\n- So the program produced wetter ground, the opposite of its aim, and then demanded its own repetition — the definition of a self-defeating effort, and an echo of the first sentence's \"worked against its own purpose.\"\n\n**Why the other choices are wrong:**\n- A: \"Irreversible\" is tempting, since sunken peat is hard to restore, but the colon describes the program undermining its aim, not the permanence of the damage.\n- B: \"Uncontrollable\" would mean no one could stop the ditching, yet the crews chose each new round; the problem was the choice defeating itself, not a loss of control.\n- D: \"Methodical\" praises the grid-cutting's orderliness and ignores the failure the sentence is built to describe."
        },
        {
          "id": 1235,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "passages": [
            {
              "label": "Text 1",
              "text": "Pianists who perform music of the 1780s today usually play instruments those composers never heard: the modern concert grand, with its iron frame and thick, powerful sound. Some performers argue that this music belongs on the fortepiano, the light wooden instrument of the composers' own day. Its quick, shallow action and fast-fading notes were the conditions under which the music was composed; rapid passagework that blurs on a modern grand stays articulate, and inner voices the big instrument buries remain audible. If we want to hear these works as their composers conceived them, the argument runs, we should hear them on the instrument the composers wrote at."
            },
            {
              "label": "Text 2",
              "text": "The fortepiano undeniably clarifies certain textures, and performers have learned much from it. But the composers' instrument was a constraint as well as a choice: the same musicians eagerly acquired louder, larger pianos as fast as builders could supply them, which suggests the old instruments marked a stage in the piano's development rather than an ideal the composers wished to preserve. What the music requires is not a particular machine but transparency and balance, and a pianist who has absorbed the fortepiano's lessons can realize those qualities on a modern grand through touch, pacing, and restraint."
            }
          ],
          "question": "Based on the texts, how would the author of Text 2 most likely respond to the argument presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "The author would agree that this repertoire should be performed only on instruments of the composers' own period, adding that most of today's pianists would first need years of retraining before they could play such instruments well."
            },
            {
              "id": "B",
              "text": "The author would dismiss the fortepiano as a primitive stage in the piano's development, of interest to collectors and historians but with nothing to teach performers."
            },
            {
              "id": "C",
              "text": "The author would accept the argument without reservation, since concert audiences have repeatedly shown that they prefer the fortepiano's sound in this repertoire."
            },
            {
              "id": "D",
              "text": "The author would grant that the fortepiano reveals textures a modern grand can obscure but deny that this settles the choice of instrument, since a player who understands those textures can achieve them by other means."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** Text 2 concedes the fortepiano's revelations — it \"undeniably clarifies certain textures\" — but rejects the conclusion that the music therefore belongs on it, arguing that transparency and balance can be achieved \"on a modern grand through touch, pacing, and restraint.\" D preserves both the concession and the refusal.\n\n**The Full Solution:**\n- Text 1's argument moves from evidence (clearer passagework, audible inner voices on the fortepiano) to a prescription (perform these works on the composers' instrument).\n- Text 2 accepts the evidence but attacks the inference twice: historically, the composers treated their instruments as a stage to be outgrown, eagerly adopting bigger pianos; practically, what the music needs is qualities, not a machine, and those qualities transfer.\n- So the response grants what the fortepiano shows while denying that it dictates the instrument — exactly choice D.\n\n**Why the other choices are wrong:**\n- A: It signs the author onto the period-instrument prescription that Text 2 exists to resist.\n- B: It overshoots the author's respect for the fortepiano, from which performers \"have learned much.\"\n- C: It invents audience preferences neither text mentions and concedes the whole argument besides."
        },
        {
          "id": 1232,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The following text is Emily Brontë's poem \"Spellbound,\" written in 1837.\n\nThe night is darkening round me,\nThe wild winds coldly blow;\nBut a tyrant spell has bound me\nAnd I cannot, cannot go.\n\nThe giant trees are bending\nTheir bare boughs weighed with snow.\nAnd the storm is fast descending,\nAnd yet I cannot go.\n\nClouds beyond clouds above me,\nWastes beyond wastes below;\nBut nothing drear can move me;\nI will not, cannot go.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "The speaker describes a storm gathering force in each stanza while repeating that she cannot leave — a refusal that, in the final line, becomes her own choice."
            },
            {
              "id": "B",
              "text": "The speaker recalls being caught outdoors by a sudden storm, then describes the shelter in which she finally waited for the wind and snow to pass."
            },
            {
              "id": "C",
              "text": "The speaker pleads with an unseen companion to depart before the storm arrives, then concedes that the two of them have delayed too long to travel."
            },
            {
              "id": "D",
              "text": "The speaker surveys a wintry landscape from a safe distance, then recounts in order the storm that swept across it during the night and the destruction that it left behind."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Each stanza darkens the storm — night and wind, then bending trees and descending snow, then clouds and wastes on every side — while the refrain holds the speaker in place; and the wording of that refrain shifts from \"I cannot, cannot go\" to \"And yet I cannot go\" to \"I will not, cannot go,\" ending on her own will.\n\n**The Full Solution:**\n- Stanza one: darkness and cold wind, with a \"tyrant spell\" binding the speaker — she \"cannot\" go.\n- Stanza two: the storm worsens (bare boughs weighed with snow, the storm \"fast descending\"), and still she cannot go.\n- Stanza three: the scene expands to \"clouds beyond clouds\" and \"wastes beyond wastes,\" and the refrain changes decisively: \"I will not, cannot go.\" The final line adds will — choice — to what had been compulsion, exactly the movement A describes.\n\n**Why the other choices are wrong:**\n- B: It invents a memory and a shelter; the poem happens in the present, and the speaker never takes cover.\n- C: It invents a companion and a plea; the speaker addresses no one and asks for nothing.\n- D: It sets the speaker at a safe distance after the fact, but the storm is descending around her as she speaks.",
          "_meta": {
            "anchor": "Emily Brontë, \"Spellbound\" (1837) — genuine public-domain text, complete poem verbatim",
            "quoteVerify": true,
            "source": "Emily Brontë, \"Spellbound\" (written November 1837; published posthumously); text verified verbatim against the Academy of American Poets (poets.org) public-domain printing",
            "distractors": {
              "B": "invents recollection and shelter",
              "C": "invents a companion and a plea",
              "D": "moves the speaker outside the storm and into aftermath"
            }
          }
        },
        {
          "id": 1233,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "Coastal towns plagued by mosquitoes once saw an obvious remedy in their salt marshes: drain the shallow pools where the insects breed. Through the early twentieth century, work crews cut long grids of parallel ditches across marsh after marsh to carry the standing water away. Ecologists who later compared ditched and unditched marshes argue that the remedy fed the very problem it targeted. The drained pools had been home to small fish that eat mosquito larvae by the thousands; when the pools went, the fish went with them, and larvae hatching in the wet patches that remained faced fewer predators than before. From this record, marsh managers draw a conclusion that would have startled the ditching crews: reopening pools on a drained marsh — deliberately giving the water back — can suppress mosquitoes more effectively than drainage ever did.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It praises the engineering behind an early public-health campaign, then lists the modern excavation techniques that have replaced hand-cut drainage ditches."
            },
            {
              "id": "B",
              "text": "It describes an intuitive remedy for a problem, explains how the remedy removed a natural check on that very problem, and ends with the reversed approach now drawn from that history."
            },
            {
              "id": "C",
              "text": "It compares mosquito control efforts in several different coastal regions, then ranks the methods used according to their expense and their lasting effects."
            },
            {
              "id": "D",
              "text": "It traces the life cycle of the salt-marsh mosquito in close detail, then argues that no deliberate alteration of the marsh habitat can meaningfully reduce the insect's numbers for long."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The passage moves in three labeled steps: the obvious fix (drain the breeding pools), the backfire (the pools also held the larvae-eating fish, so draining removed the mosquitoes' predators), and the reversed lesson now drawn (put the pools back).\n\n**The Full Solution:**\n- Step one is the intuitive remedy: mosquitoes breed in marsh pools, so crews ditched the marshes to drain them.\n- Step two is the mechanism that undid it: the same pools sustained small fish that ate mosquito larvae \"by the thousands\"; without pools there were no fish, and surviving larvae \"faced fewer predators than before.\" The remedy removed a natural check on the problem.\n- Step three is the counterintuitive conclusion: managers now reopen pools — \"deliberately giving the water back\" — because restoring the predators controls mosquitoes better than drainage did. That remedy-backfire-reversal order is choice B.\n\n**Why the other choices are wrong:**\n- A: The passage criticizes the ditching campaign's logic rather than praising its engineering, and no modern excavation techniques are listed.\n- C: No regions are compared and nothing is ranked by expense.\n- D: The mosquito's life cycle is never traced, and the passage concludes that altering the habitat DOES work — in the direction nobody expected."
        },
        {
          "id": 1234,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "By the middle of the nineteenth century, the open-air food markets of many growing cities had become unmanageable. Stalls spilled into traffic; there was no roof against the rain, no drainage, and no practical way to inspect a street's worth of perishable goods. City governments responded by building covered market halls — great sheds of cast iron and glass in which every stall had a numbered place, water was piped in, refuse was carted out, and inspectors could walk the aisles. The halls did more than tidy the trade they housed. Fixed stalls with regular rents turned casual street selling into settled shopkeeping, and the buildings themselves, often among the largest a city possessed, became civic showpieces copied from one country to the next. A tool of sanitary reform ended by changing how city dwellers bought their food.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To argue that city governments exceeded their legitimate authority when they compelled independent street sellers to rent regulated indoor stalls."
            },
            {
              "id": "B",
              "text": "To describe the structural innovations in cast iron and glass that first allowed nineteenth-century builders to roof very large open spaces without any interior supports."
            },
            {
              "id": "C",
              "text": "To explain how the disorder of open-air markets led cities to build covered halls that ended up transforming the urban food trade itself."
            },
            {
              "id": "D",
              "text": "To contrast the crowded food markets of nineteenth-century cities with the smaller and more orderly weekly markets of the countryside."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The passage follows one chain from start to finish: the problem (unmanageable open-air markets), the response (covered halls with numbered stalls, piped water, and inspection), and the larger consequence (settled shopkeeping, civic showpieces — a sanitary tool that changed how cities bought food).\n\n**The Full Solution:**\n- The opening establishes the problem: stalls in traffic, no roof, no drainage, no way to inspect perishables.\n- The middle gives the governments' solution and its immediate workings inside the new halls.\n- The close widens the lens: the halls \"did more than tidy the trade,\" converting street selling into shopkeeping and becoming copied showpieces. The final sentence states the arc outright — a reform tool \"ended by changing how city dwellers bought their food.\" Explaining that problem-response-transformation chain is the text's purpose.\n\n**Why the other choices are wrong:**\n- A: The passage passes no judgment on the governments' authority; it reports what they built and what followed.\n- B: The iron-and-glass construction is mentioned, but the engineering that made it possible is never described.\n- D: Country markets never appear in the passage at all."
        },
        {
          "id": 1236,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Wild rice, called manoomin by the Ojibwe people who have gathered it for centuries, grows untended in shallow lakes and rivers, and no one plants it in fields. It would be wrong, though, to call the plant unmanaged. Ojibwe families historically returned to the same stands year after year, timed the harvest so that ripe seed showered back into the water as the canoes moved through, cleared competing vegetation from the beds, and established new stands by scattering seed in bays where none had grown. Ethnobotanists who study these practices describe manoomin as a tended landscape rather than a found one: a food never domesticated, in the sense of being genetically transformed, yet deliberately sustained and extended by the people who depended on it.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Ojibwe families historically cleared competing vegetation from wild rice beds and scattered seed in bays where the plant had not grown before."
            },
            {
              "id": "B",
              "text": "Although manoomin was never planted in fields or domesticated, Ojibwe harvesting practices deliberately sustained and extended the stands, making the plant far from unmanaged."
            },
            {
              "id": "C",
              "text": "Wild rice grows untended in the shallow lakes and rivers of the regions where the Ojibwe people have gathered it for centuries."
            },
            {
              "id": "D",
              "text": "Ethnobotanists have concluded that manoomin was in fact gradually domesticated over its centuries of harvesting, though the genetic changes involved long went unnoticed."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The passage's pivot is the second sentence — \"It would be wrong, though, to call the plant unmanaged\" — and everything after it supports that correction: the harvest reseeded the stands, beds were cleared, new bays were sown. B states the correction with its qualifier intact (no fields, no domestication, yet real management).\n\n**The Full Solution:**\n- The opening concedes the surface facts: manoomin grows untended and is not planted in fields.\n- The turn rejects the inference those facts invite — that the plant was unmanaged.\n- The evidence lists deliberate practices: returning to stands, timing the harvest so seed showered back, clearing competitors, seeding new bays.\n- The close names the resulting idea: a \"tended landscape,\" sustained and extended without domestication. B compresses exactly this.\n\n**Why the other choices are wrong:**\n- A: It lists two of the practices — supporting evidence, not the idea they support.\n- C: It restates only the opening concession, the very impression the passage goes on to correct.\n- D: It contradicts the text, which says manoomin was never domesticated \"in the sense of being genetically transformed.\""
        },
        {
          "id": 1243,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "Collectors of early printed maps have long paid premiums for period color — coloring applied when a map was first published — over color added later. Dating the printing of a map is usually straightforward, since publishers recorded their editions and the paper and plates can be traced. The coloring is another matter. Pigment might have been applied in the publisher's workshop the week the sheet was printed, or by the purchaser's own colorist a generation afterward, or by a nineteenth-century dealer brightening old stock for the collectors' market; paper takes a wash of color at any age and carries no date. Catalogers therefore treat a map's edition date as settling when the sheet was printed and nothing more. It follows that a cataloger who records the date of printing as the date of the coloring ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "will err, if at all, by making the coloring seem more recent than it truly is, since many sheets were colored before they were printed."
            },
            {
              "id": "B",
              "text": "can rely on the attribution being sound, because publishers' edition records listed which copies had been colored in the workshop."
            },
            {
              "id": "C",
              "text": "has adopted the only defensible convention available, since no physical or documentary evidence of any kind can ever distinguish early coloring from the additions of later hands."
            },
            {
              "id": "D",
              "text": "risks describing the color as older than it is, since pigment may have been applied years or even centuries after the sheet left the press."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The printing date is the earliest possible moment the color could have been applied — every alternative the passage lists (a purchaser's colorist a generation on, a nineteenth-century dealer) comes later. Equating the two dates therefore errs in one direction only: it makes the color look older than it may be.\n\n**The Full Solution:**\n- A sheet cannot be colored before it exists, so the printing date is a floor for the coloring date, never a ceiling.\n- The passage's examples of later coloring — a generation afterward, or centuries later for the collectors' market — show how far above that floor the true date can sit.\n- Recording the floor as the actual date collapses that gap in one direction: the recorded age of the color can only be too great, never too small. That is D's conclusion.\n\n**Why the other choices are wrong:**\n- A: It runs the error backward and rests on an impossibility — sheets colored before they were printed.\n- B: It contradicts the passage, whose edition records date printings; the text says the paper \"carries no date\" for color.\n- C: It overreaches twice — the passage never calls the convention defensible, and \"no evidence of any kind\" goes far beyond what the catalogers' caution implies."
        },
        {
          "id": 1239,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "passage": "In championship hot-air ballooning, pilots score points by dropping markers on ground targets, yet a balloon cannot be steered directly — it drifts with whatever air surrounds it. Observers offer two explanations for why a small group of pilots wins consistently. The first is meteorological: winds at different altitudes move in different directions, and the best pilots read those layers, climbing or descending to ride whichever current bends toward the target. The second is manual: expert burner control, the argument runs, lets a pilot hold any chosen altitude with unusual steadiness, and it is smooth flying rather than weather sense that separates champions from the field. The two accounts make different predictions about what the top pilots should be doing in the air.",
          "question": "Which finding, if true, would most directly support the meteorological explanation?",
          "choices": [
            {
              "id": "A",
              "text": "In flight records from several championships, winning pilots changed altitude more often than mid-field pilots, and their climbs and descents coincided with entries into wind layers bending toward the target."
            },
            {
              "id": "B",
              "text": "During the final approach to each target, winning pilots were found to hold their altitude within a considerably narrower band than any other group of competitors that the researchers studied."
            },
            {
              "id": "C",
              "text": "Pilots who spent an off-season training on burner-control simulators improved their standings the following year more than pilots who did no such training."
            },
            {
              "id": "D",
              "text": "Champions interviewed after major events tended to credit their success to instinct, saying they could not fully explain the choices they had made in the air."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The meteorological explanation says winners win by reading and riding wind layers, so its telltale behavior is frequent, purposeful altitude changes tied to favorable currents — exactly what A reports in the flight records.\n\n**The Full Solution:**\n- Pin down what the meteorological account predicts: top pilots should be moving between layers, and their moves should track the winds that bend toward the target.\n- A delivers both halves: winners changed altitude more often than others, and the changes coincided with entries into target-bending layers — behavior tied to wind reading, not to smoothness.\n- The rival manual account predicts the opposite signature (steady altitude), so A's finding separates the two explanations cleanly in the meteorological account's favor.\n\n**Why the other choices are wrong:**\n- B: Rock-steady altitude is the manual explanation's prediction; it supports the rival account.\n- C: Gains from burner-control training again point to piloting mechanics, not weather sense.\n- D: Champions crediting unexplainable instinct distinguishes neither account — it offers no evidence about winds or control at all."
        },
        {
          "id": 1241,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "Conservators testing protective treatments distinguish between the direction of an effect and its statistical strength. In one field trial at a historic adobe site, five wall sections received a sacrificial shelter coat of mud plaster and were monitored through two rainy seasons alongside matched untreated sections. The team reported that although every treated section lost less material to erosion than its untreated counterpart did, the data do not support the stronger claim that the improvement was statistically significant for every section, since ______",
          "questionTable": {
            "type": "table",
            "caption": "Reduction in surface erosion for shelter-coated adobe wall sections, relative to untreated controls",
            "headers": [
              "Wall section",
              "Reduction in erosion (%)",
              "Statistical significance"
            ],
            "rows": [
              [
                "North wall",
                "31",
                "p < 0.01"
              ],
              [
                "East wall",
                "24",
                "p < 0.05"
              ],
              [
                "South wall",
                "6",
                "p > 0.05 (n.s.)"
              ],
              [
                "West wall",
                "19",
                "p < 0.05"
              ],
              [
                "Courtyard wall",
                "27",
                "p < 0.01"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "the south wall recorded much the smallest reduction in erosion anywhere in the table, 6 percent, and a reduction that small cannot on its own possibly amount to statistical significance."
            },
            {
              "id": "B",
              "text": "the north wall recorded the largest reduction in the table, a 31 percent decrease in erosion that was statistically significant at p < 0.01."
            },
            {
              "id": "C",
              "text": "while four of the five sections showed reductions that reached statistical significance at p < 0.05 or better, the south wall's 6 percent reduction did not (p > 0.05)."
            },
            {
              "id": "D",
              "text": "every treated section lost less material than its untreated control, with reductions ranging from 6 percent on the south wall to 31 percent on the north wall."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The sentence separates two claims — every section improved (true), and every improvement was statistically significant (not supported) — so the blank must point to the section that broke the second claim. C names it: the south wall's 6 percent reduction, marked p > 0.05, not significant.\n\n**The Full Solution:**\n- The passage's structure is \"although X, not Y\": although the direction was uniform, significance was not.\n- Scan the significance column: four sections reach p < 0.05 or better; the south wall alone is flagged \"n.s.\"\n- The claim fails on exactly one row, and effective support cites that row against the background of the other four — which is what C does.\n\n**Why the other choices are wrong:**\n- A: It reasons from the effect's size to its non-significance, but magnitude alone cannot establish that — the p-value in the table does, and A never cites it.\n- B: It showcases the strongest result, which bears on the first claim, not on the failure of the second.\n- D: It documents the uniform direction — the part of the finding that was never in question — and says nothing about significance."
        },
        {
          "id": 1240,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "Historians of coastal shipping trace the sailing coaster's decline through customs records, which report the share of arriving cargo tonnage carried by sailing vessels at individual ports. At one stone-shipping port studied in detail, the records show that sail gave way to steam and rail not in a steady slide across the whole period but in an abrupt collapse late in the record — between 1900 and 1910 — rather than during the earlier decades, since ______",
          "questionTable": {
            "type": "table",
            "caption": "Share of arriving cargo tonnage carried by sailing vessels at one stone-shipping port",
            "headers": [
              "Cargo",
              "1880",
              "1900",
              "1910"
            ],
            "rows": [
              [
                "Granite",
                "94%",
                "88%",
                "41%"
              ],
              [
                "Lumber",
                "89%",
                "81%",
                "35%"
              ],
              [
                "Firewood",
                "78%",
                "71%",
                "30%"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "the share of granite tonnage carried by sail stood at 94 percent in 1880, the highest figure recorded for any cargo in any year shown in the table."
            },
            {
              "id": "B",
              "text": "between 1880 and 1900, the sail-carried share of granite tonnage fell gradually from 94 to 88 percent and that of lumber from 89 to 81 percent, the first sustained declines anywhere in the record."
            },
            {
              "id": "C",
              "text": "between 1900 and 1910, the sail-carried share fell from 88 to 41 percent for granite and from 81 to 35 percent for lumber — drops several times larger than any recorded between 1880 and 1900."
            },
            {
              "id": "D",
              "text": "even in 1910, sailing vessels still carried more than a third of the granite and lumber tonnage arriving at the port."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The claim to support is about timing — an abrupt collapse between 1900 and 1910, not before — and C supplies exactly the comparison that proves it: drops of 47, 46, and 41 points in the final decade against drops of only 6 to 8 points across the previous twenty years.\n\n**The Full Solution:**\n- Reread what the blank must establish: the collapse came LATE, between 1900 and 1910, \"rather than during the earlier decades.\"\n- Compute the changes per cargo: 1880 to 1900 loses 6 points (granite), 8 (lumber), 7 (firewood); 1900 to 1910 loses 47, 46, and 41.\n- A timing claim needs both periods on the table — the small early declines and the huge late ones — and C is the only choice that presents the contrast.\n\n**Why the other choices are wrong:**\n- A: A high starting share in 1880 says nothing about when the decline happened.\n- B: It cites only the early, gentle declines — evidence for the gradual story the sentence rejects.\n- D: The share remaining in 1910 describes where the collapse stopped, not when it occurred."
        },
        {
          "id": 1238,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "When the maritime boards of the nineteenth century took charge of their nations' coastal lights, they confronted a problem no single lighthouse could solve. A light helps a navigator only if the navigator knows which light it is; as coasts grew crowded with towers, one white flash looked much like another, and a confident misidentification could wreck a ship as surely as darkness could. The boards' answer was to treat the coast as a system. Each tower received its own character — a distinctive rhythm of flashes for the night and, for daylight, a painted daymark of stripes, checks, or bands unlike any neighbor's — and the full assignments were published in light lists carried aboard every ship. What made any one lighthouse trustworthy, the boards had grasped, was not the power of its lamp but its difference from every other light in view.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "As nineteenth-century coasts grew crowded with lighthouses, the white flash of one tower at night could easily be mistaken for the flash of another."
            },
            {
              "id": "B",
              "text": "Painted daymarks of stripes, checks, and bands allowed navigators to tell neighboring lighthouse towers apart during the hours of daylight."
            },
            {
              "id": "C",
              "text": "Nineteenth-century maritime boards made lighthouses trustworthy by treating the coast as a system of distinct, published identities rather than as a set of individually powerful lamps."
            },
            {
              "id": "D",
              "text": "Maritime boards eventually concluded that a lighthouse's nighttime rhythm of flashes mattered far more to practicing navigators than any pattern that could be painted on its tower for daylight."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The passage builds to a system-over-object point, stated outright in its last sentence: a lighthouse's trustworthiness lay \"not [in] the power of its lamp but [in] its difference from every other light in view\" — a difference engineered coast-wide and published in the light lists.\n\n**The Full Solution:**\n- The problem: identical-looking lights invited fatal misidentification, and no single tower, however bright, could fix that.\n- The response: \"treat the coast as a system\" — unique flash rhythms, unique daymarks, and published assignments aboard every ship.\n- The conclusion: what made each tower useful was its coordinated difference from its neighbors. C captures the whole arc — the system, its published identities, and the demotion of raw lamp power.\n\n**Why the other choices are wrong:**\n- A: It states the problem only — the setup for the main idea, not the idea.\n- B: It describes one component (daymarks) doing one job (daylight identification), a supporting detail.\n- D: It invents a ranking of night signals over day marks that the passage never draws; the two are presented as partners in the same system."
        },
        {
          "id": 1237,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "In the seventeenth-century map trade, coloring was a specialized craft carried on in workshops, often by several colorists working under a master. Because a large atlas passed through many hands, workshops faced a problem of consistency: the purchaser of a two-volume atlas expected the provinces of a region to be washed in the same greens and yellows from the first plate to the last. The solution was the pattern sheet — a printed copy of each map, colored once by the master and kept in the shop. Colorists laid their work beside it and matched their washes to its choices, so that an atlas colored by six hands left the workshop looking like the work of one. Surviving pattern sheets, worn and paint-spotted, are now prized by historians as rare direct evidence of how such workshops actually operated.",
          "question": "Based on the text, what was notable about the pattern sheets kept in map-coloring workshops?",
          "choices": [
            {
              "id": "A",
              "text": "They were colored by the workshop's newest members as practice before those members were trusted with maps intended for sale."
            },
            {
              "id": "B",
              "text": "They recorded the prices that a workshop charged for coloring atlases of different sizes and for work in different pigments."
            },
            {
              "id": "C",
              "text": "They were printed in larger numbers than the maps they reproduced, so that every colorist in a workshop could keep a personal copy."
            },
            {
              "id": "D",
              "text": "They let many colorists produce uniform work, and the surviving examples now give historians direct evidence of workshop practice."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The passage assigns the pattern sheets two distinctions, and D captures both: in their own time they solved the consistency problem (six hands producing work \"like the work of one\"), and today the survivors serve historians as \"rare direct evidence of how such workshops actually operated.\"\n\n**The Full Solution:**\n- The problem: an atlas colored by many people had to look uniform to its purchaser.\n- The solution: a master-colored reference copy of each map, kept in the shop, that every colorist matched washes against.\n- The afterlife: worn, paint-spotted survivors are prized as direct evidence of workshop practice. A detail question wants what the text actually says was notable, and D restates both halves.\n\n**Why the other choices are wrong:**\n- A: The text says the master colored the pattern sheets, not novices practicing — it reverses the hierarchy.\n- B: Nothing in the passage connects the sheets to prices; they recorded color choices.\n- C: It contradicts the text, which describes a single reference copy \"kept in the shop,\" not personal copies for every colorist."
        },
        {
          "id": 1242,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "Biologists tracking the decline of wild rice describe two separate pressures on the plant. One operates through water levels: manoomin germinates on lake bottoms in spring and needs shallow water that recedes gradually as the plant grows, so dams that hold lakes at a fixed height can keep seedlings submerged past the point of survival. The other operates through water chemistry: sulfate washing in from disturbed watersheds is converted in lake sediments to sulfide, which damages the plant's roots however well the water level suits it. Surveys have in fact documented failing stands on lakes whose levels are close to ideal. Biologists who emphasize this second pressure argue that a restoration plan confined to the management of water levels ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "will succeed wherever the dams in question are removed, because a lake's chemistry rebalances of its own accord once the water's natural seasonal rise and fall has been restored."
            },
            {
              "id": "B",
              "text": "risks leaving a major cause of the decline untouched, since stands can fail from sulfide in the sediment even where levels suit the plant well."
            },
            {
              "id": "C",
              "text": "addresses the only pressure on the plant that surveys of failing stands have so far been able to document."
            },
            {
              "id": "D",
              "text": "should be abandoned, since fixed water levels play no meaningful part in whether wild rice seedlings survive."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The passage establishes two independent causes of decline and then documents stands failing where water levels are nearly ideal — failures the level-focused plan cannot touch. A plan confined to levels therefore leaves the chemical cause in place, which is B.\n\n**The Full Solution:**\n- Cause one: fixed water levels drown seedlings — addressable by managing levels.\n- Cause two: sulfate-derived sulfide damages roots \"however well the water level suits\" the plant — untouched by any level management.\n- The clincher is the survey evidence: failing stands on lakes with near-ideal levels, which only the chemical pathway explains.\n- So the biologists' criticism of a levels-only plan must be that it misses that second pathway — exactly what B states.\n\n**Why the other choices are wrong:**\n- A: It invents a self-correcting chemistry the passage never mentions, and the sulfate arrives from watersheds, not from dam operations.\n- C: It reverses the survey evidence — the documented failures at ideal levels point to the chemical cause, not the level one.\n- D: It throws out the first pressure entirely, though the passage presents drowned seedlings as one of two real causes."
        },
        {
          "id": 1245,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "A novice learning the cast net rehearses the throw on dry land long before wading into the shallows — coiling the handline into the left hand, draping the lead line over one shoulder, and ____ the gathered mesh with the turn of the hips on which the whole cast depends.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "they release"
            },
            {
              "id": "B",
              "text": "to release"
            },
            {
              "id": "C",
              "text": "the release of"
            },
            {
              "id": "D",
              "text": "releasing"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The sentence lists three rehearsed actions, and the first two are \"-ing\" forms — \"coiling\" and \"draping\" — so the third must match: \"releasing.\"\n\n**The Full Solution:**\n- The rule: items in a series must share the same grammatical form (parallel structure).\n- Read the series aloud: \"coiling the handline..., draping the lead line..., and ____ the gathered mesh.\" The established pattern is gerund, gerund — so the blank takes a gerund.\n- \"Releasing the gathered mesh\" completes the coordinated three-item list cleanly.\n\n**Why the other choices are wrong:**\n- A: \"They release\" injects a new subject and finite verb, breaking the pattern and clashing with the singular \"novice\" besides.\n- B: \"To release\" switches the third item to an infinitive after two gerunds.\n- C: \"The release of\" turns the action into a noun phrase, abandoning the verbal form of the first two items."
        },
        {
          "id": 1244,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
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
          "id": 1248,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "The last working coasting schooners were long dismissed as quaint survivals, kept afloat by sentiment rather than ____ recent studies of harbor ledgers have shown that on many short routes the vessels remained the cheapest carriers of stone and cordwood well into the twentieth century.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "profit however"
            },
            {
              "id": "B",
              "text": "profit; however,"
            },
            {
              "id": "C",
              "text": "profit, however;"
            },
            {
              "id": "D",
              "text": "profit, however,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** Two independent clauses meet at the blank, and the conjunctive adverb \"however\" cannot join them with commas alone: it takes a semicolon before it and a comma after it — \"profit; however,\".\n\n**The Full Solution:**\n- Check each side: \"The last working coasting schooners were long dismissed as quaint survivals, kept afloat by sentiment rather than profit\" is a complete sentence, and so is \"recent studies of harbor ledgers have shown that... the vessels remained the cheapest carriers...\"\n- The rule: when \"however\" links two independent clauses, the clause boundary needs a semicolon (or a period), with a comma setting off \"however\" from the clause it introduces.\n- That yields \"profit; however, recent studies...\"\n\n**Why the other choices are wrong:**\n- A: \"Profit however\" supplies no punctuation at all, fusing the clauses and leaving \"however\" floating between them.\n- C: \"Profit, however;\" reverses the marks, putting the weak comma at the clause boundary and stranding the semicolon after \"however.\"\n- D: \"Profit, however,\" treats \"however\" as a mere aside while still splicing the two independent clauses with a comma."
        },
        {
          "id": 1249,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Trained in the new methods of iron framing rather than in masonry, ____ whose glass roof spanned every stall without a single interior column, flooding the aisles with the daylight that older markets had always lacked.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "the city's market hall was designed by a young engineer"
            },
            {
              "id": "B",
              "text": "a young engineer designed for the city a market hall"
            },
            {
              "id": "C",
              "text": "the city's market hall was a young engineer's design"
            },
            {
              "id": "D",
              "text": "the market hall the city commissioned came from a young engineer"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The opening modifier — \"Trained in the new methods of iron framing rather than in masonry\" — describes a person, so the person must come immediately after the comma. Only B places \"a young engineer\" there.\n\n**The Full Solution:**\n- The rule: an introductory descriptive phrase attaches to whatever noun directly follows it; if that noun is not the thing described, the modifier dangles.\n- Ask who was trained in iron framing: the engineer, not the building. So \"a young engineer\" must stand right after the comma.\n- B reads: \"Trained in the new methods..., a young engineer designed for the city a market hall whose glass roof...\" — the modifier lands on its person, and \"whose\" attaches naturally to the hall.\n\n**Why the other choices are wrong:**\n- A: It puts \"the city's market hall\" after the comma, absurdly making the building the thing trained in iron framing.\n- C: Same dangling attachment — the hall, not the engineer, ends up \"trained,\" and the possessive \"engineer's\" cannot rescue it.\n- D: It leads with \"the market hall,\" so the modifier again describes the building rather than the engineer it belongs to."
        },
        {
          "id": 1246,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "The earliest balloon competitions were tests of pure endurance, with trophies going to the crew that stayed aloft longest or drifted ____ the modern sport instead rewards precision, requiring pilots to steer by altitude choice alone toward targets only a few meters wide.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "farthest, but"
            },
            {
              "id": "B",
              "text": "farthest,"
            },
            {
              "id": "C",
              "text": "farthest but,"
            },
            {
              "id": "D",
              "text": "farthest"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Two independent clauses meet at the blank, and a comma plus the coordinating conjunction \"but\" joins them while marking their contrast.\n\n**The Full Solution:**\n- Check each side: \"The earliest balloon competitions were tests of pure endurance, with trophies going to the crew that stayed aloft longest or drifted farthest\" stands alone, and so does \"the modern sport instead rewards precision...\"\n- The rule: independent clauses may be joined by a comma plus a coordinating conjunction (and, but, or, so).\n- The relationship is a contrast — endurance then, precision now — so \"but\" is the right conjunction, placed after the comma: \"farthest, but.\"\n\n**Why the other choices are wrong:**\n- B: A comma alone between two independent clauses is a comma splice.\n- C: \"Farthest but,\" misplaces the comma after the conjunction instead of before it, leaving the clauses unjoined.\n- D: With no punctuation, the two complete sentences run together."
        },
        {
          "id": 1247,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Players of the glass harmonica speak of the instrument's one unforgiving skill — keeping the fingertips at exactly the right dampness against the spinning glass — and students practice ____ on slow scales for months before performing, since a finger too wet slides silently over the rims and one too dry catches with a squeak.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "them"
            },
            {
              "id": "B",
              "text": "those"
            },
            {
              "id": "C",
              "text": "it"
            },
            {
              "id": "D",
              "text": "these"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The pronoun stands in for \"the instrument's one unforgiving skill,\" a single thing, so the singular pronoun \"it\" is required.\n\n**The Full Solution:**\n- The rule: a pronoun must agree in number with the word it refers back to.\n- Ask what the students practice: the skill just named — keeping the fingertips at the right dampness. That antecedent, \"skill,\" is singular.\n- \"Students practice it on slow scales\" points cleanly back to that one skill.\n- The plural nouns nearby (\"players,\" \"fingertips,\" \"rims\") can pull the ear toward a plural pronoun, but none of them is what gets practiced.\n\n**Why the other choices are wrong:**\n- A: \"Them\" is plural and has no plural antecedent doing the work — the thing practiced is one skill.\n- B: \"Those\" is plural as well and points at nothing the students could practice.\n- D: \"These\" is plural too, and nothing plural in the sentence names what is being practiced."
        },
        {
          "id": 1251,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Agricultural historians reckoning the economics of coastal farms describe the salt marsh as the cheapest hayfield a farmer could hold. The marsh asked for no clearing, no plowing, no seeding, and no manuring; its grasses resowed themselves with every tide-borne season, and a farmer's only real costs were the mowing and the hauling of the crop. ______ the upland meadows on the same farms returned hay only after years of clearing and regular dressings of manure, and their yields sagged whenever that labor was withheld.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "On the contrary,"
            },
            {
              "id": "B",
              "text": "As a result,"
            },
            {
              "id": "C",
              "text": "By comparison,"
            },
            {
              "id": "D",
              "text": "Meanwhile,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The passage sets the upland meadows' costs beside the marsh's — two hayfields on the same farms, weighed against each other — and \"By comparison\" is the phrase that stages exactly that side-by-side measurement.\n\n**The Full Solution:**\n- The first two sentences itemize the marsh's economics: no clearing, plowing, seeding, or manuring; costs limited to mowing and hauling.\n- The final sentence itemizes the uplands' economics on the same axes: years of clearing, regular manuring, yields that sagged without labor.\n- Both accounts are true and set beside each other so the marsh's cheapness registers; a juxtaposition of two measured cases calls for \"By comparison.\"\n\n**Why the other choices are wrong:**\n- A: \"On the contrary\" rejects a preceding claim as false, but nothing here is denied — both descriptions stand.\n- B: \"As a result\" would make the uplands' costs a consequence of the marsh's cheapness, though neither causes the other.\n- D: \"Meanwhile\" marks separate events unfolding at the same time, not a weighed comparison between two standing conditions."
        },
        {
          "id": 1250,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Prairie restoration projects often begin with a symmetrical assumption: since decades of plowing destroyed the deep organic matter of grassland soils, replanting native grasses should rebuild that organic matter on roughly the same timescale. A long-term study that resampled restored prairies over several decades put the assumption to a direct test. ______ recovery lagged far behind the original loss: plots replanted for thirty years had regained only a small fraction of the organic matter their soils once held, and the study's models projected full recovery in centuries rather than decades.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Nevertheless,"
            },
            {
              "id": "B",
              "text": "Likewise,"
            },
            {
              "id": "C",
              "text": "Consequently,"
            },
            {
              "id": "D",
              "text": "For example,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The assumption predicts recovery on the same timescale as the loss; the study's finding defies that prediction — thirty-year plots had regained only a small fraction. A finding that holds against an expectation takes the concessive \"Nevertheless.\"\n\n**The Full Solution:**\n- The setup states the expectation: rebuild should mirror destruction, decade for decade.\n- The middle sentence announces a direct test of that expectation, priming the reader for a verdict.\n- The verdict contradicts the expectation: recovery \"lagged far behind,\" with full recovery projected in centuries. A result that lands despite the stated assumption calls for \"Nevertheless.\"\n\n**Why the other choices are wrong:**\n- B: \"Likewise\" would present the finding as matching the assumption, when it overturns it.\n- C: \"Consequently\" would make the slow recovery a logical outcome of the assumption or the test, but the test merely revealed the lag; nothing in the setup caused it.\n- D: \"For example\" would offer the finding as an illustration of the assumption, the reverse of what the data do to it."
        },
        {
          "id": 1252,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Mariners' reports kept confusing two lighthouses that stood twelve miles apart on one low, featureless stretch of coast. The district board might have fixed the problem in the obvious way, by rebuilding one of the towers to a plainly different height. The board chose not to. ______ it had one tower painted in broad red and white bands and the other in a single dark spiral, giving each light a daytime identity at a fraction of what any rebuilding would have cost.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Therefore,"
            },
            {
              "id": "B",
              "text": "Instead,"
            },
            {
              "id": "C",
              "text": "Similarly,"
            },
            {
              "id": "D",
              "text": "Today,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The passage says what the board did not do — rebuild a tower — and the final sentence gives the substitute action it took: painting the towers with distinct patterns. One action replacing a rejected one calls for \"Instead.\"\n\n**The Full Solution:**\n- The obvious remedy is named: rebuild one tower to a different height.\n- It is explicitly declined: \"The board chose not to.\"\n- The last sentence supplies what the board did in its place — bands on one tower, a spiral on the other. A substitution after a refusal is exactly the relation \"Instead\" marks.\n\n**Why the other choices are wrong:**\n- A: \"Therefore\" would present the painting as a conclusion following logically from the refusal, but the refusal only clears the way; the painting is the alternative, not the consequence.\n- C: \"Similarly\" would liken the painting to the rebuilding, yet the two remedies are opposed, one chosen over the other.\n- D: \"Today\" shifts to the present, but the sentence continues the same past episode in the same past tense."
        },
        {
          "id": 1253,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "In the mid-1700s, European performers gave concerts on sets of wine glasses tuned by filling each glass with a different amount of water.",
              "The glasses had to be refilled and retuned before every performance, and a player could reach only a few glasses at a time.",
              "Benjamin Franklin heard such a concert in England and set out to improve on the instrument.",
              "In 1761 he introduced the glass armonica, mounting glass bowls of graduated sizes on a single rotating spindle.",
              "Because each bowl was ground to its pitch, no water tuning was needed, and the nested bowls placed dozens of notes within reach of the player's ten fingers.",
              "Composers including Mozart went on to write music for Franklin's instrument."
            ],
            "goal": "The student wants to emphasize how Franklin's design overcame the limitations of the tuned wine glasses."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "In the mid-1700s, European performers gave concerts on sets of ordinary wine glasses, each of which had to be tuned before every performance by being filled with a precisely measured amount of water."
            },
            {
              "id": "B",
              "text": "Benjamin Franklin heard a concert played on tuned wine glasses while he was in England and became convinced that he could improve on the instrument."
            },
            {
              "id": "C",
              "text": "By grinding each bowl to its pitch and nesting the bowls on one spindle, Franklin's armonica did away with water tuning and put dozens of notes within reach of the player's fingers."
            },
            {
              "id": "D",
              "text": "Composers as celebrated as Mozart went on to write music expressly for the glass armonica that Franklin introduced in 1761."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The goal is to show HOW the design beat the glasses' limitations, and C pairs each design feature with the limitation it removed: bowls ground to pitch ended the refilling and retuning, and the nested bowls on one spindle put dozens of notes under ten fingers where the glasses had offered only a few.\n\n**The Full Solution:**\n- The notes name two limitations of the wine glasses: constant water tuning, and only a few glasses within reach.\n- They also name the design answers: pitch ground into each bowl, and graduated bowls nested on a rotating spindle.\n- C is the only choice that connects the answers to the limitations — design, then payoff — which is exactly the emphasis the goal requests.\n\n**Why the other choices are wrong:**\n- A: It describes only the old instrument and its tuning burden, never Franklin or his design.\n- B: It sets up Franklin's ambition but stops before saying what he built or what it fixed.\n- D: It attests to the instrument's later success without mentioning a single feature of the design or the limitations it overcame."
        },
        {
          "id": 1254,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "The Shakers were a religious community that established villages across the northeastern United States beginning in the late eighteenth century.",
              "Shaker craftsmen built furniture for the community's own dwellings, workshops, and meetinghouses.",
              "Community rules discouraged carving, veneer, and other ornament as worldly display.",
              "Shaker belief held that labor was a form of worship and that an object's beauty lay in its fitness for use.",
              "Chairs were made light enough to hang from wall pegs; cupboards and drawers were often built into the walls themselves.",
              "Museums now exhibit Shaker furniture as a landmark of functional design."
            ],
            "goal": "The student wants to emphasize the central principle that guided Shaker furniture making."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "The Shakers were a religious community that established villages across the northeastern United States beginning in the late eighteenth century."
            },
            {
              "id": "B",
              "text": "Holding that labor was worship and that beauty lay in fitness for use, Shaker craftsmen shunned ornament and built furniture whose every feature answered a practical need."
            },
            {
              "id": "C",
              "text": "Museums now exhibit the furniture that Shaker craftsmen made for their communities as a landmark in the history of functional design."
            },
            {
              "id": "D",
              "text": "Shaker chairs were made light enough to hang from pegs set into the wall, and Shaker cupboards and chests of drawers were often built directly into the walls of the rooms that they served."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The goal asks for the principle behind the furniture, and B states it in the Shakers' own terms — labor as worship, beauty as fitness for use — and then shows the principle at work in the shunning of ornament and the practicality of every feature.\n\n**The Full Solution:**\n- A principle is a guiding belief, so the right choice must lead with the belief, not with facts around it.\n- The notes give the belief twice over: ornament was rejected as worldly display, and beauty was located in fitness for use.\n- B opens with exactly that creed and ties it to the practice it produced, which is what \"emphasize the central principle\" requires.\n\n**Why the other choices are wrong:**\n- A: It supplies background about the community's villages and says nothing about furniture or belief.\n- C: It reports how museums regard the furniture today — reception, not the principle that guided its making.\n- D: It gives two vivid examples of the principle's results while leaving the principle itself unstated."
        }
      ]
    }
  ]
};

export default practiceTest12RW;
