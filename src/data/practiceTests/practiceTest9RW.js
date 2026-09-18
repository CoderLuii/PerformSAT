// Practice Test 9 — SAT Reading & Writing (R&W)
// R&W seating varied 2026-09-07 (scripts/varyRWSeating.mjs): items re-dealt inside their official skill blocks with a per-test seed — block flow and per-skill counts unchanged.
// Auto-assembled by scripts/assembleRWTest.mjs from the authored JSON in
// scripts/generated/authored/test9/. Do not hand-edit this file —
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


export const practiceTest9RW = {
  id: "practice-test-9-rw",
  title: "Practice Test 9 — Reading & Writing",
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
          "id": 902,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "A peat bog is a difficult place for the microbes of decay. Sphagnum moss soaks up the nutrients that bacteria need and releases compounds that ______ bacterial growth, and the cold, oxygen-poor water does the rest: leather, wood, and even human skin can rest in a bog for centuries with surprisingly little change.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "encourage"
            },
            {
              "id": "B",
              "text": "suppress"
            },
            {
              "id": "C",
              "text": "conceal"
            },
            {
              "id": "D",
              "text": "imitate"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The passage explains why decay stalls in a bog, so the moss's compounds must hold bacterial growth back — they \"suppress\" it.\n\n**The Full Solution:**\n- The opening states the effect to be explained: a bog is \"a difficult place for the microbes of decay.\"\n- Everything that follows is a cause of that difficulty — nutrients absorbed, cold oxygen-poor water — and the result is centuries of preservation.\n- The blank must continue the causal chain: compounds that hold bacteria down, which is what \"suppress\" means.\n\n**Why the other choices are wrong:**\n- A: \"Encourage\" reverses the logic — helped bacteria would mean faster decay, not preservation.\n- C: \"Conceal\" means to hide from view; bacteria are not being hidden, they are being stopped.\n- D: \"Imitate\" would have the compounds mimicking bacterial growth, an idea nothing in the passage supports."
        },
        {
          "id": 904,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "The following text is adapted from William Hazlitt's 1821 essay \"On Going a Journey.\"\n\nOne of the pleasantest things in the world is going a journey; but I like to go by myself. I can enjoy society in a room; but out of doors, nature is ______ enough for me. I am then never less alone than when alone. The soul of a journey is liberty, perfect liberty, to think, feel, do just as one pleases.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "company"
            },
            {
              "id": "B",
              "text": "entertainment"
            },
            {
              "id": "C",
              "text": "instruction"
            },
            {
              "id": "D",
              "text": "shelter"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence balances two settings against each other — \"society in a room\" indoors, and something nature supplies outdoors — so the blank needs the outdoor counterpart of society: \"company.\"\n\n**The Full Solution:**\n- The structure is a contrast hinged on \"but\": indoors the speaker enjoys society; outdoors, nature takes over that role.\n- The next sentence confirms the reading — \"never less alone than when alone\" — nature keeps him company so completely that solitude does not feel solitary.\n- \"Company\" is the one word that answers \"society\" directly.\n\n**Why the other choices are wrong:**\n- B: \"Entertainment\" is not the counterpart of \"society,\" and the following sentence is about aloneness, not amusement.\n- C: Nothing in the text presents nature as a teacher; \"instruction\" breaks the society-versus-solitude contrast.\n- D: \"Shelter\" is a physical protection, which reverses the scene — the speaker is happily out of doors, not seeking cover.",
          "_meta": {
            "anchor": "William Hazlitt — \"On Going a Journey\" (Table-Talk, 1821); genuine public-domain excerpt with one word blanked",
            "quoteVerify": true,
            "source": "William Hazlitt, Table-Talk: Essays on Men and Manners (1821), essay \"On Going a Journey\"; blanked word is \"company\""
          }
        },
        {
          "id": 901,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "In the desert city of Yazd, in central Iran, tall towers rise above the rooftops of many older houses. Travelers sometimes take the structures to be purely ______, but each tower is a working device: openings at its top catch passing breezes and channel them down into the rooms below, keeping the house livable through the hottest months.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "practical"
            },
            {
              "id": "B",
              "text": "traditional"
            },
            {
              "id": "C",
              "text": "fragile"
            },
            {
              "id": "D",
              "text": "decorative"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The sentence sets up a contrast with \"but\": what travelers assume must be the opposite of \"a working device,\" and \"decorative\" — for show rather than for use — is that opposite.\n\n**The Full Solution:**\n- The clause after \"but\" corrects the travelers' assumption: the towers actually do a job, catching breezes and cooling the house.\n- The blank therefore needs a word meaning \"for appearance only,\" and \"purely decorative\" delivers exactly that mistaken impression.\n\n**Why the other choices are wrong:**\n- A: \"Practical\" is what the towers really are — it destroys the contrast the sentence builds with \"but.\"\n- B: The towers may well be traditional, but that quality sets up no contrast with \"a working device\" — the sentence opposes appearance to function, not old to new.\n- C: Nothing in the text concerns the towers' sturdiness, and \"fragile\" sets up no contrast with \"a working device.\""
        },
        {
          "id": 903,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "The vicuña, a wild Andean relative of the alpaca, yields its prized fleece only ______: in the traditional roundups known as chaccu, herders gather the free-ranging animals no more than once every two to three years, shear a few ounces of fiber from each one, and release the herd unharmed.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "reluctantly"
            },
            {
              "id": "B",
              "text": "seasonally"
            },
            {
              "id": "C",
              "text": "sparingly"
            },
            {
              "id": "D",
              "text": "profitably"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The clause after the colon restates the blank in concrete terms — shearing once every two to three years, a few ounces at a time — and \"sparingly\" is the word that sums up such small, infrequent yields.\n\n**The Full Solution:**\n- The colon signals that what follows spells out the blank's meaning.\n- The details are all about smallness and infrequency: gatherings years apart, mere ounces per animal.\n- \"Sparingly\" — in small amounts, with restraint — is the precise one-word restatement of that pattern.\n\n**Why the other choices are wrong:**\n- A: \"Reluctantly\" attributes unwillingness to an animal; the text describes quantity and frequency, not attitude.\n- B: \"Seasonally\" implies a yearly rhythm, but the roundups happen only once every two to three years.\n- D: \"Profitably\" concerns money, which the sentence never mentions; the colon's details describe scarcity, not earnings."
        },
        {
          "id": 906,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The following text is from Jerome K. Jerome's 1889 novel Three Men in a Boat. The narrator is spending an evening with his friends.\n\nThere were four of us—George, and William Samuel Harris, and myself, and Montmorency. We were sitting in my room, smoking, and talking about how bad we were—bad from a medical point of view I mean, of course. We were all feeling seedy, and we were getting quite nervous about it. Harris said he felt such extraordinary fits of giddiness come over him at times, that he hardly knew what he was doing; and then George said that he had fits of giddiness too, and hardly knew what he was doing.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To introduce a group of companions by portraying, with gentle humor, their shared conviction that they are all unwell."
            },
            {
              "id": "B",
              "text": "To explain the underlying medical condition responsible for the mysterious symptoms that the narrator and his two friends describe in turn."
            },
            {
              "id": "C",
              "text": "To contrast the narrator's sturdy good health with the imagined ailments of his two anxious friends."
            },
            {
              "id": "D",
              "text": "To recount the disagreement that arose when the friends could not agree on the cause of their dizziness."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage's work is introduction: it names the four companions, sets the scene, and establishes the running joke — everyone is convinced he is ill, and the complaints echo one another word for word.\n\n**The Full Solution:**\n- The opening sentence performs a roll call of the group; the rest shows them at their characteristic occupation, cataloging their ailments.\n- The humor is in the repetition — George's giddiness copies Harris's down to \"hardly knew what he was doing\" — signaling that the illness is shared performance, not diagnosis.\n- Choice A captures both jobs: introducing the companions and conveying the comic self-pity that unites them.\n\n**Why the other choices are wrong:**\n- B: No condition is ever explained; the symptoms are traded, not diagnosed.\n- C: The narrator includes himself among the sufferers (\"how bad we were\"), so there is no healthy figure to contrast with.\n- D: The friends agree entirely — each claims the same complaint — and no dispute about causes occurs.",
          "_meta": {
            "anchor": "Jerome K. Jerome — Three Men in a Boat (1889), opening; genuine public-domain excerpt",
            "quoteVerify": true,
            "source": "Jerome K. Jerome, Three Men in a Boat (To Say Nothing of the Dog), Chapter I (1889)"
          }
        },
        {
          "id": 905,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The following text is from Christina Rossetti's 1861 poem \"Up-Hill.\"\n\nDoes the road wind up-hill all the way? / Yes, to the very end. / Will the day's journey take the whole long day? / From morn to night, my friend. // But is there for the night a resting-place? / A roof for when the slow dark hours begin. / May not the darkness hide it from my face? / You cannot miss that inn.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "One speaker describes a difficult journey in vivid detail, and a second speaker then argues that the journey is not worth undertaking."
            },
            {
              "id": "B",
              "text": "The text alternates between an account of a road by daylight and an account of the same road after nightfall."
            },
            {
              "id": "C",
              "text": "A series of questions about a journey, each posed by one speaker, is answered in turn by a second speaker."
            },
            {
              "id": "D",
              "text": "A traveler recalls the stages of a finished journey and reflects on the lessons each stage offered."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Every line of the poem is either a question or its answer: one voice asks about the road, the day's length, a resting place, and finding it; a second voice answers each in turn.\n\n**The Full Solution:**\n- The alternation is strict — question, answer, question, answer — through both stanzas.\n- The answering voice is distinct from the asking voice (\"my friend,\" \"You cannot miss that inn\"), confirming a two-speaker exchange.\n- Choice C names exactly that structure: questions posed by one speaker, answered in turn by a second.\n\n**Why the other choices are wrong:**\n- A: No one argues against the journey — the answering voice reassures the questioner rather than discouraging the trip.\n- B: The day-night contrast belongs to the journey being asked about, not to the text's organization, which is dialogue rather than alternating description.\n- D: The journey has not happened yet — the questions look ahead to it — and no lessons are drawn from completed stages.",
          "_meta": {
            "anchor": "Christina Rossetti — \"Up-Hill\" (1861); genuine public-domain excerpt, stanzas 1-2 verbatim",
            "quoteVerify": true,
            "source": "Christina Rossetti, \"Up-Hill,\" first published in Macmillan's Magazine (1861), collected in Goblin Market and Other Poems (1862)"
          }
        },
        {
          "id": 907,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "In the 1790s, the French engineer Claude Chappe built a chain of signal towers between Paris and Lille, each topped with a pair of jointed wooden arms. An operator set the arms to a coded position; the next tower, watching through a telescope, copied the position, and the signal leapt from hilltop to hilltop. A short message could cross the 230-kilometer line in about half an hour — a journey of more than a day on horseback. The system had a fatal dependence, however: it needed daylight and clear weather, and the electric telegraph, which needed neither, made Chappe's towers obsolete within half a century.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It follows a single message on its journey from Paris to Lille, pausing at each of the towers to describe the work performed there."
            },
            {
              "id": "B",
              "text": "It explains how a communication system worked, illustrates its speed, and then identifies the weakness that led to its replacement."
            },
            {
              "id": "C",
              "text": "It argues that a neglected invention deserves more credit than the technology that ultimately superseded it."
            },
            {
              "id": "D",
              "text": "It compares two competing signaling systems of the 1790s and explains why one attracted government support."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text moves through three stages: mechanism (arms, telescopes, tower-to-tower relay), a measure of the system's power (half an hour versus a day on horseback), and finally the limitation — dependence on daylight and weather — that let the electric telegraph displace it.\n\n**The Full Solution:**\n- Sentences one through three explain how the system worked.\n- Sentence four quantifies the achievement with the horseback comparison.\n- The closing sentence pivots on \"however\" to the fatal weakness and the replacement it invited, completing the arc that choice B describes.\n\n**Why the other choices are wrong:**\n- A: No single message is followed; the tower-to-tower description is general, not a narrated journey.\n- C: The text evaluates nothing — it reports the system's strengths and weakness without pleading for its reputation.\n- D: Only one system from the 1790s appears; the electric telegraph arrives later as a successor, not a contemporary rival."
        },
        {
          "id": 908,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "passages": [
            {
              "label": "Text 1",
              "text": "Excavating at Chavín de Huántar, a 3,000-year-old temple complex in the Peruvian Andes, the archaeologist John Rick has documented narrow stone galleries that channel and distort sound. Conch-shell trumpets recovered at the site produce roaring tones that, when played in the galleries, seem to issue from the walls themselves. Rick interprets these effects as instruments of authority: by staging overwhelming sensory experiences that only they could control, the temple's priests demonstrated seemingly supernatural power to visiting pilgrims."
            },
            {
              "label": "Text 2",
              "text": "Acoustics researcher Miriam Kolar has measured how Chavín de Huántar's galleries transmit and transform the sound of conch-shell trumpets, confirming that the disorienting effects reported by visitors can be reproduced and quantified today. Kolar notes, however, that demonstrating an effect is not the same as demonstrating a plan. Any building alters sound whether or not its makers intend it to, so tying the galleries' acoustics to deliberate design requires independent evidence about how the builders used and modified these spaces over time."
            }
          ],
          "question": "Based on the texts, how would Kolar (Text 2) most likely respond to the interpretation presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "She would caution that the acoustic effects, though real and measurable, do not by themselves show that the galleries were built to produce them."
            },
            {
              "id": "B",
              "text": "She would deny that the galleries at Chavín de Huántar meaningfully alter the sound of trumpets played inside them."
            },
            {
              "id": "C",
              "text": "She would argue that the conch-shell trumpets were most likely played in the open plaza rather than within the temple's galleries."
            },
            {
              "id": "D",
              "text": "She would agree that the priests deliberately engineered the galleries' acoustics but would question whether pilgrims actually found the resulting effects disorienting."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Kolar confirms the effects but qualifies the inference drawn from them: \"demonstrating an effect is not the same as demonstrating a plan.\" Rick's interpretation treats the acoustics as engineered for authority; Kolar would answer that intent needs independent evidence.\n\n**The Full Solution:**\n- Text 1's claim has two layers: the galleries produce striking effects, and the builders designed them to do so.\n- Text 2 accepts the first layer outright — the effects \"can be reproduced and quantified today.\"\n- Her reservation targets the second layer only: buildings alter sound regardless of intent, so design must be established separately. That is precisely the caution choice A states.\n\n**Why the other choices are wrong:**\n- B: It reverses her position — she confirms, and has measured, the galleries' effects on sound.\n- C: Neither text raises the question of where the trumpets were played; Kolar's measurements concern the galleries themselves.\n- D: It grants the very point she declines to grant — deliberate engineering — and invents a doubt about pilgrims' reactions she never expresses.",
          "_meta": {
            "anchor": "John Rick (Stanford, Chavín excavations) and Miriam Kolar (archaeoacoustics at Chavín) — both real, registered in researchers.json"
          }
        },
        {
          "id": 911,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Histories of the Pacific Coast salmon-canning industry long dwelt on fleets and machinery, treating the workforce as interchangeable hands. The canneries' own records tell another story. Labor contractors assembled experienced crews — largely Chinese, and later Japanese and Filipino, immigrants — whose members held distinct skilled positions, from butchers who could clean a fish in seconds to solderers whose seams determined whether a can spoiled. The quality of a season's pack varied with the crew, and cannery owners competed to engage the most practiced ones. The industry's output, in short, rested on expertise its own chroniclers rarely acknowledged.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Salmon canneries on the Pacific Coast succeeded largely because new machinery eliminated the industry's need for experienced and specialized workers at every station."
            },
            {
              "id": "B",
              "text": "Labor contractors weakened the canning industry by forcing owners to compete for a limited number of crews."
            },
            {
              "id": "C",
              "text": "The salmon-canning industry's records were kept too carelessly to reveal much about how its workforce was organized."
            },
            {
              "id": "D",
              "text": "Cannery records show that the salmon-packing workforce, far from being interchangeable, was organized around specialized skills on which the industry's output depended."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text corrects an old picture: histories treated cannery workers as \"interchangeable hands,\" but the records reveal skilled, differentiated crews whose expertise determined the pack. Choice D states that corrected view.\n\n**The Full Solution:**\n- The first sentence gives the received account; the second announces the correction (\"tell another story\").\n- The evidence follows: distinct skilled positions, pack quality varying with the crew, owners competing for the best ones.\n- The final sentence draws the conclusion D paraphrases — output rested on unacknowledged expertise.\n\n**Why the other choices are wrong:**\n- A: It repeats the machinery-centered account the text is written to correct, and the passage says skill, not automation, drove output.\n- B: Owners' competition for crews is presented as proof of the crews' value, not as a weakness of the industry.\n- C: The records are the text's best evidence — they are revealing, not careless."
        },
        {
          "id": 916,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "A nocturnal is a small instrument, usually of brass or boxwood, that tells time at night from the rotation of the stars around the celestial pole. Surviving examples range from richly engraved presentation pieces to plain instruments worn smooth by years of handling, and household and shipboard inventories of the sixteenth and seventeenth centuries list nocturnals among the effects of pilots, surveyors, and estate stewards alike. The period's instruction manuals, meanwhile, explain the nocturnal's use in everyday vernacular languages rather than in scholarly Latin. Taken together, these details suggest that ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "most nocturnals were commissioned as ornamental gifts and were rarely used to tell time at all."
            },
            {
              "id": "B",
              "text": "the nocturnal was a practical tool in reasonably wide working use, not merely a curiosity for wealthy collectors."
            },
            {
              "id": "C",
              "text": "reading a nocturnal demanded formal astronomical training that few laypeople of the period possessed."
            },
            {
              "id": "D",
              "text": "nocturnals had displaced sundials as the most common timekeeping instruments of the era."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** Each detail points the same way — toward ordinary, working use by a range of people — and B draws exactly that general conclusion, without going beyond it.\n\n**The Full Solution:**\n- Instruments \"worn smooth by years of handling\" were used, not displayed.\n- Inventories place them with pilots, surveyors, and stewards — working occupations, not just collectors.\n- Vernacular manuals imply an audience of ordinary readers rather than Latin-trained scholars.\n- The generalization these premises support is practical, fairly widespread use — precisely B.\n\n**Why the other choices are wrong:**\n- A: The worn, plain examples and the working owners contradict a picture of unused ornaments.\n- C: Vernacular instructions argue the opposite — the device was explained for readers without scholarly training.\n- D: The text never mentions sundials or compares the instruments' popularity; \"most common\" outruns the evidence entirely."
        },
        {
          "id": 914,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "When deep artesian wells were first bored into the confined aquifer beneath Paris in the nineteenth century, water rose to the surface under natural pressure alone. Hydrologists note that each new borehole drew on the same body of pressurized groundwater, and they conclude that the aquifer's pressure was falling steadily through the second half of the century because ______",
          "questionTable": {
            "type": "table",
            "caption": "Flow of two artesian wells in Paris",
            "headers": [
              "Well",
              "Year completed",
              "Initial flow (cubic meters per day)",
              "Flow in 1900 (cubic meters per day)"
            ],
            "rows": [
              [
                "Grenelle",
                "1841",
                "3,600",
                "800"
              ],
              [
                "Passy",
                "1861",
                "17,000",
                "5,900"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "the Passy well's initial flow, at 17,000 cubic meters per day, was nearly five times the Grenelle well's initial flow."
            },
            {
              "id": "B",
              "text": "the Grenelle well was completed twenty years before drilling of the Passy well finished."
            },
            {
              "id": "C",
              "text": "by 1900 the Grenelle well's flow had fallen from 3,600 cubic meters per day to 800, and the Passy well's had fallen from 17,000 to 5,900 in barely four decades."
            },
            {
              "id": "D",
              "text": "the Passy well still delivered more water in 1900 than the Grenelle well had delivered when it was first completed."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** A claim about steadily falling pressure needs evidence of decline over time at the wells drawing on the aquifer, and C alone provides it: both wells' flows collapsed to a fraction of their initial rates by 1900.\n\n**The Full Solution:**\n- Flow from an artesian well is driven by aquifer pressure, so falling flow is the table's proxy for falling pressure.\n- C reads the decline out of both rows — Grenelle down almost 80 percent, Passy down two-thirds within four decades — matching the claim's scope (the aquifer, not one well).\n\n**Why the other choices are wrong:**\n- A: A comparison of the two wells' starting flows describes their size, not any change in pressure over time.\n- B: The completion dates alone contain no information about flow or pressure.\n- D: True in the table, but it invites the wrong inference — highlighting how much the Passy well still produced obscures the fact that both wells' flows were falling sharply."
        },
        {
          "id": 909,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "The Hanseatic League, an association of trading towns around the Baltic and North Seas, dominated northern European commerce for three centuries without possessing a treasury, a standing army, or a written constitution. Its power operated through privileges: member merchants secured exclusive trading rights, exemptions from tolls, and their own walled compounds — known as kontors — in foreign ports from London to Novgorod. A town that flouted the League's decisions risked exclusion from this web of privileges, a penalty severe enough to hold hundreds of fiercely independent towns in loose but durable alignment.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "The Hanseatic League declined because it never acquired the treasury and army that its commercial rivals eventually possessed."
            },
            {
              "id": "B",
              "text": "The kontors that the League maintained in foreign ports mattered more to its overall success than the exclusive trading rights that its merchants enjoyed in other places."
            },
            {
              "id": "C",
              "text": "Member towns of the Hanseatic League routinely defied its decisions because the League had no formal machinery for punishing them."
            },
            {
              "id": "D",
              "text": "The Hanseatic League sustained lasting commercial power not through the institutions of a state but through privileges its member towns could not afford to lose."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text's arc runs from a puzzle — three centuries of dominance with no treasury, army, or constitution — to its resolution: power \"operated through privileges,\" enforced by the threat of exclusion. Choice D restates exactly that.\n\n**The Full Solution:**\n- Sentence one sets up the paradox: dominance without the standard equipment of a state.\n- Sentences two and three resolve it — exclusive rights, toll exemptions, and kontors bound members together, and losing them was \"a penalty severe enough\" to keep towns aligned.\n- D captures both halves: not state machinery, but indispensable privileges.\n\n**Why the other choices are wrong:**\n- A: The text describes the League's lasting power, not its decline, and never presents the missing institutions as a cause of failure.\n- B: The kontors are one item in a list of privileges; the text never ranks them above the others.\n- C: It inverts the final sentence — the threat of exclusion kept towns in alignment precisely despite the absence of formal machinery."
        },
        {
          "id": 910,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Inside a harmonica or an accordion, each note is produced by a free reed — a thin metal tongue riveted over a close-fitting slot. Air blown past the tongue makes it swing back and forth through the slot, chopping the airstream into regular pulses that the ear hears as a pitch. Because that pitch is set by the tongue's own length and stiffness rather than by anything the player does, a free reed sounds the same note no matter how forcefully the air arrives: blowing harder makes the tone louder, not higher.",
          "question": "According to the text, why does a free reed produce the same pitch regardless of how hard a player blows?",
          "choices": [
            {
              "id": "A",
              "text": "The slot beneath the tongue narrows automatically whenever the airstream strengthens."
            },
            {
              "id": "B",
              "text": "The pitch is determined by the length and stiffness of the metal tongue itself."
            },
            {
              "id": "C",
              "text": "Players adjust their technique continuously to compensate for changes in air pressure."
            },
            {
              "id": "D",
              "text": "The rivet that anchors the tongue absorbs any extra force the airstream delivers."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text states the reason directly: the pitch \"is set by the tongue's own length and stiffness rather than by anything the player does.\"\n\n**The Full Solution:**\n- The question asks for the text's stated cause, and the third sentence supplies it in so many words.\n- The consequence follows in the same sentence: harder blowing changes loudness, not pitch — confirming that the note is fixed by the tongue's physical properties.\n\n**Why the other choices are wrong:**\n- A: The text never says the slot changes size; it is described only as \"close-fitting.\"\n- C: The explanation given is mechanical, not a matter of player skill — the text says the pitch is set \"rather than by anything the player does.\"\n- D: The rivet appears only as the tongue's mounting; no force-absorbing role is mentioned anywhere."
        },
        {
          "id": 913,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "Vicuña fiber sells for many times the price of alpaca fiber, though both animals are shorn for fine textiles. Textile economists attribute the premium to two factors working together — the vicuña fiber's extreme fineness and its scarcity — rather than to either factor alone. Data on fleece-bearing animals support the economists' account because ______",
          "questionTable": {
            "type": "table",
            "caption": "Fiber characteristics of four fleece-bearing animals",
            "headers": [
              "Animal",
              "Mean fiber diameter (microns)",
              "Fleece yield per shearing (kg)",
              "Typical shearing interval (years)"
            ],
            "rows": [
              [
                "Vicuña",
                "12.5",
                "0.2",
                "2"
              ],
              [
                "Cashmere goat",
                "17.0",
                "0.4",
                "1"
              ],
              [
                "Merino sheep",
                "19.5",
                "4.3",
                "1"
              ],
              [
                "Alpaca (huacaya)",
                "26.0",
                "2.7",
                "1"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "the alpaca's mean fiber diameter, at 26.0 microns, is the largest of the four animals listed."
            },
            {
              "id": "B",
              "text": "the merino sheep yields more fleece per shearing than the other three animals combined."
            },
            {
              "id": "C",
              "text": "the vicuña has both the finest fiber listed, at 12.5 microns, and the smallest, least frequent yield — 0.2 kilograms every two years, against the alpaca's 2.7 kilograms every year."
            },
            {
              "id": "D",
              "text": "the cashmere goat's fiber is finer than the alpaca's even though both animals are shorn every year."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The economists' account rests on two factors together — fineness and scarcity — so the completing evidence must document both, and only C does: the finest fiber in the table and by far the smallest, least frequent yield.\n\n**The Full Solution:**\n- Fineness: the vicuña's 12.5 microns is the lowest diameter listed.\n- Scarcity: 0.2 kilograms per shearing, and only every two years — roughly a twenty-fifth of the alpaca's annual output.\n- C cites both columns in one comparison, matching the claim's two-factor structure.\n\n**Why the other choices are wrong:**\n- A: A fact about the alpaca's coarseness alone touches one factor for the wrong animal and says nothing about scarcity.\n- B: The merino's large yield is true in the table but irrelevant to why vicuña fiber commands a premium.\n- D: A comparison between cashmere and alpaca never engages the vicuña, the animal the claim is about."
        },
        {
          "id": 912,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "passage": "Seabird ecologists commonly estimate the size of cliff-nesting colonies from photographs taken during the breeding season, counting every bird visible on the ledges. A monitoring team argues that such counts systematically understate the number of breeding pairs, since at any given moment one member of a pair is typically away from the ledge, feeding at sea.",
          "question": "Which finding, if true, would most directly support the team's claim?",
          "choices": [
            {
              "id": "A",
              "text": "At colonies where breeding pairs were individually tracked at their nest sites, single-day ledge photographs captured only about two-thirds of the pairs known to be breeding there."
            },
            {
              "id": "B",
              "text": "Photographic counts of the same colony taken in successive years often differ from one another by more than ten percent."
            },
            {
              "id": "C",
              "text": "Birds visible on the ledges in photographs include some nonbreeding individuals that have not formed pairs."
            },
            {
              "id": "D",
              "text": "Photographic counts of cliff colonies are generally made by two independent observers, whose totals for the same photographed image can differ from each other by several percentage points."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The claim is that photographs undercount breeding pairs. A finding that photographs captured only two-thirds of pairs independently verified at their nests is direct evidence of exactly that shortfall.\n\n**The Full Solution:**\n- To support an undercount claim, a finding must compare photographic counts against a more complete, independent measure of the same colonies.\n- Choice A supplies that comparison — tracked pairs as ground truth, photographs falling a third short — in the direction the team predicts.\n\n**Why the other choices are wrong:**\n- B: Year-to-year variation shows the counts are noisy, not that they are biased low; the differences could run in either direction.\n- C: Nonbreeders on the ledges would inflate the count of apparent breeders — evidence for an overcount, the opposite of the claim.\n- D: Disagreement between observers reading the same image is measurement noise; it says nothing about how photographic counts compare with the true number of pairs."
        },
        {
          "id": 915,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "Steller's sea cow, a massive northern relative of the manatee, entered the scientific record in 1741, when the naturalist Georg Wilhelm Steller studied the animals in the shallows of the Commander Islands. By 1768 the species was gone. The sea cows were slow, buoyant, and unable to dive; the entire population was confined to a single small archipelago; and after the expedition's route became known, fur-trading crews began stopping at the islands regularly, killing the animals to provision their ships. Given how swiftly the end came, researchers infer that ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "the sea cow population had already been shrinking for centuries before Steller first described the animals."
            },
            {
              "id": "B",
              "text": "the fur-trading crews valued the sea cows chiefly for their hides rather than as a source of food."
            },
            {
              "id": "C",
              "text": "the species would have disappeared just as quickly even if the expedition's route had never become known."
            },
            {
              "id": "D",
              "text": "the species' extreme vulnerability and the steady hunting that followed the expedition together drove it to extinction within three decades."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The passage assembles a cause on each side — defenseless, concentrated animals; regular provisioning stops that began once the route was known — and the twenty-seven-year collapse is the effect those causes jointly explain.\n\n**The Full Solution:**\n- Vulnerability alone had not eliminated the species before 1741; the animals were there for Steller to study.\n- What changed afterward was sustained hunting pressure, arriving precisely when the islands entered the traders' routes.\n- The inference that fits both premises is the conjunction D states: vulnerability plus new, steady hunting produced extinction within three decades.\n\n**Why the other choices are wrong:**\n- A: The passage dates the collapse to the years after 1741 and offers no evidence of an earlier decline.\n- B: The text says the crews killed the animals \"to provision their ships\" — for food, not hides.\n- C: It severs the causal link the passage builds — without the route's discovery, the hunting that followed it has no explanation.",
          "_meta": {
            "anchor": "Georg Wilhelm Steller — naturalist on the 1741 Bering expedition; registered in researchers.json"
          }
        },
        {
          "id": 917,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "At Chavín de Huántar, a ceremonial center built high in the Peruvian Andes, stone-lined galleries wind through the temple mound. Researchers played the recorded tones of a conch-shell trumpet inside ______ however, listeners standing in the plaza outside could not agree on where the sound was coming from.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "them,"
            },
            {
              "id": "B",
              "text": "them"
            },
            {
              "id": "C",
              "text": "them;"
            },
            {
              "id": "D",
              "text": "them, and"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Two independent clauses meet at the blank, and the second begins with the conjunctive adverb \"however\" — the conventional join is a semicolon before \"however\" and a comma after it.\n\n**The Full Solution:**\n- Left of the blank is a complete sentence: \"Researchers played the recorded tones of a conch-shell trumpet inside them.\"\n- Right of the blank is another: \"listeners standing in the plaza outside could not agree...\"\n- \"However\" belongs to the second clause, so the boundary must be strong enough to separate full sentences: \"them; however, listeners...\"\n\n**Why the other choices are wrong:**\n- A: A comma alone between two independent clauses is a comma splice; \"however\" cannot carry the join.\n- B: With no punctuation at all, the two sentences fuse into a run-on.\n- D: \"And\" plus \"however\" stacks two connectors on one boundary, garbling the sentence (\"them, and however, listeners...\")."
        },
        {
          "id": 918,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "A network of river gauges strung along the lower Mississippi ______ forecasters with hourly readings of the water's height, so that towns downstream can be warned days before a flood crest arrives.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "provide"
            },
            {
              "id": "B",
              "text": "are providing"
            },
            {
              "id": "C",
              "text": "have provided"
            },
            {
              "id": "D",
              "text": "provides"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The subject is the singular \"network,\" so the verb must be the singular \"provides.\"\n\n**The Full Solution:**\n- \"Of river gauges strung along the lower Mississippi\" is a prepositional phrase between subject and verb; it does not change the subject's number.\n- Strip the phrase and the agreement is plain: \"A network... provides forecasters with hourly readings.\"\n\n**Why the other choices are wrong:**\n- A: A plural verb agreeing with the nearby \"gauges\" rather than with the true subject — the classic nearest-noun trap.\n- B: Plural again, and the progressive adds nothing the sentence needs.\n- C: The plural \"have\" fails agreement, and the perfect tense clashes with the sentence's statement of an ongoing arrangement."
        },
        {
          "id": 920,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "The emperor Frederick II began assembling his treatise on falconry around 1240, near the end of his reign. By the time the first copies circulated among European courts, he ______ more than thirty years training and observing hawks — experience he trusted above the claims of ancient authorities.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "spends"
            },
            {
              "id": "B",
              "text": "had spent"
            },
            {
              "id": "C",
              "text": "has spent"
            },
            {
              "id": "D",
              "text": "will have spent"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The sentence describes one past event completed before another past event — the years of training came before the copies circulated — and that sequence takes the past perfect, \"had spent.\"\n\n**The Full Solution:**\n- The time frame is anchored in the past: \"By the time the first copies circulated...\"\n- The training preceded that past moment, so the verb must reach further back than simple past: \"he had spent more than thirty years.\"\n\n**Why the other choices are wrong:**\n- A: The present tense breaks the passage's past narrative frame.\n- C: The present perfect connects a past action to the present moment, but the reference point here (\"circulated\") is itself in the past.\n- D: The future perfect points forward from now, which contradicts events set in the thirteenth century."
        },
        {
          "id": 922,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Neither of the two brass nocturnals recovered from the shipwreck ______ its sighting arm, but the toothed hour rings on both instruments remain crisp enough to read.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "retain"
            },
            {
              "id": "B",
              "text": "are retaining"
            },
            {
              "id": "C",
              "text": "retains"
            },
            {
              "id": "D",
              "text": "have retained"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject is the singular pronoun \"Neither,\" which takes a singular verb: \"retains.\"\n\n**The Full Solution:**\n- \"Of the two brass nocturnals recovered from the shipwreck\" is a prepositional phrase; the plural \"nocturnals\" inside it is not the subject.\n- \"Neither\" is grammatically singular — it means \"not one of the two\" — so the verb must be singular, as the singular pronoun \"its\" later in the clause confirms.\n\n**Why the other choices are wrong:**\n- A: A plural verb drawn to the nearby \"nocturnals\" rather than to the singular subject \"Neither.\"\n- B: Plural again, and the progressive misdescribes a settled state as an ongoing action.\n- D: \"Have retained\" is plural; the singular subject would require \"has retained.\""
        },
        {
          "id": 919,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "Because Chappe's optical telegraph depended on each operator reading the arms of the neighboring station through a ______ fog or nightfall could halt a message halfway down the line, leaving it stranded until morning.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "telescope,"
            },
            {
              "id": "B",
              "text": "telescope"
            },
            {
              "id": "C",
              "text": "telescope;"
            },
            {
              "id": "D",
              "text": "telescope:"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence opens with a dependent \"Because...\" clause, and the conventional boundary between an introductory dependent clause and the main clause is a comma.\n\n**The Full Solution:**\n- \"Because Chappe's optical telegraph depended on each operator reading the arms of the neighboring station through a telescope\" cannot stand alone — \"Because\" makes it subordinate.\n- The main clause follows: \"fog or nightfall could halt a message halfway down the line.\"\n- A comma is the mark that joins an introductory subordinate clause to the sentence it modifies.\n\n**Why the other choices are wrong:**\n- B: Omitting the comma runs the long introductory clause straight into the main clause, obscuring where one ends and the other begins.\n- C: A semicolon must separate two independent clauses, and the \"Because\" clause is not independent.\n- D: A colon must follow a complete statement that introduces what comes next; a dependent clause cannot support one."
        },
        {
          "id": 921,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "Inside a nineteenth-century salmon cannery, the contract system divided the season's work into a fixed sequence of ______ butchering, cleaning, filling, cooking, and labeling. Each crew was paid by the finished case, not by the hour, so speed at every station mattered.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "operations,"
            },
            {
              "id": "B",
              "text": "operations;"
            },
            {
              "id": "C",
              "text": "operations"
            },
            {
              "id": "D",
              "text": "operations:"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** A complete statement introduces a list of the operations, and the conventional mark before such a list is a colon.\n\n**The Full Solution:**\n- \"The contract system divided the season's work into a fixed sequence of operations\" is a full independent clause.\n- What follows — \"butchering, cleaning, filling, cooking, and labeling\" — itemizes the operations just announced.\n- A colon after a complete statement is the mark that formally introduces that itemization.\n\n**Why the other choices are wrong:**\n- A: A comma leaves the list dangling as if it were one more item in the sentence's own grammar, blurring where the announcement ends and the list begins.\n- B: A semicolon must join two independent clauses; the list of gerunds is not a clause.\n- C: With no mark at all, \"operations butchering\" collides — the list needs a boundary to introduce it."
        },
        {
          "id": 924,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Frederick II insisted that claims about birds be tested against direct observation, and his falconry treatise corrected several assertions that ancient authorities had repeated for a thousand years. His demanding empirical method found few imitators among medieval writers. ______ the treatise itself remained a touchstone, copied, translated, and annotated by generations of European falconers.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "In addition,"
            },
            {
              "id": "B",
              "text": "Therefore,"
            },
            {
              "id": "C",
              "text": "For instance,"
            },
            {
              "id": "D",
              "text": "Nevertheless,"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The final sentence runs against the expectation set by the one before it: the method attracted few imitators, yet the book itself stayed influential for generations. \"Nevertheless\" marks exactly that concession-and-reversal.\n\n**The Full Solution:**\n- Sentence three sets up a limitation — the empirical method was not widely adopted.\n- Sentence four reports a fact that survives despite that limitation: the treatise remained a touchstone.\n- \"Few imitators\" followed by \"remained a touchstone\" is a contrast between neglect of the method and endurance of the work.\n\n**Why the other choices are wrong:**\n- A: \"In addition\" treats the treatise's endurance as more of the same, ignoring the tension with \"few imitators.\"\n- B: \"Therefore\" claims the endurance followed from the lack of imitators, reversing the logic.\n- C: \"For instance\" would make the last sentence an example of the method finding few imitators, which it is not."
        },
        {
          "id": 925,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Chappe's optical telegraph could pass a short signal from Paris to Lille in well under an hour, a journey that took a courier on horseback more than a day. ______ the relay imposed a kind of security: each tower's operators merely copied the arm positions they saw through the telescope, so a message could cross the whole line without any single operator knowing what it said.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Moreover,"
            },
            {
              "id": "B",
              "text": "Instead,"
            },
            {
              "id": "C",
              "text": "Specifically,"
            },
            {
              "id": "D",
              "text": "Subsequently,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage stacks a second advantage on top of a first — speed, and then security — so the blank needs an additive transition: \"Moreover.\"\n\n**The Full Solution:**\n- Sentence one establishes one benefit of the system: startling speed compared with a courier.\n- Sentence two introduces a different, independent benefit: operators relayed positions without reading content.\n- Two parallel advantages of the same system are joined by addition, not contrast, illustration, or sequence.\n\n**Why the other choices are wrong:**\n- B: \"Instead\" would replace the first advantage with the second, but both hold at once.\n- C: \"Specifically\" promises a narrower restatement of the speed claim, and the security point is a new idea, not a restatement.\n- D: \"Subsequently\" imposes a time order on two features that coexisted from the start."
        },
        {
          "id": 923,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "The ogham script, carved as short strokes along the edges of standing stones in early medieval Ireland, was once assumed to be a secret writing system legible only to a small learned elite. ______ the inscriptions themselves record little more than personal names and lines of descent — the sort of information a memorial or a boundary marker would be expected to announce to any passerby.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "For example,"
            },
            {
              "id": "B",
              "text": "However,"
            },
            {
              "id": "C",
              "text": "Meanwhile,"
            },
            {
              "id": "D",
              "text": "Similarly,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The second sentence pushes against the first: a script assumed to be secret turns out to record ordinary, public information. That reversal calls for the contrast transition \"However.\"\n\n**The Full Solution:**\n- Sentence one reports an old assumption — ogham as an elite code.\n- Sentence two presents evidence that undercuts it: the inscriptions carry names and lineages meant \"to announce to any passerby.\"\n- A claim followed by evidence against it is joined by a contrast word.\n\n**Why the other choices are wrong:**\n- A: \"For example\" would make the plain inscriptions an illustration of secrecy, when they are evidence against it.\n- C: \"Meanwhile\" signals simultaneous events, but no second timeline exists here.\n- D: \"Similarly\" promises agreement between the sentences, and the second exists to disagree with the first."
        },
        {
          "id": 926,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "An artesian well taps groundwater trapped under pressure between layers of impermeable rock, so the water rises on its own, without pumping.",
              "The Grenelle well in Paris was drilled between 1833 and 1841 under the direction of the engineer Louis-Georges Mulot.",
              "The borehole finally struck pressurized water at a depth of 548 meters.",
              "When the drill broke through in 1841, water surged up the shaft and jetted above street level.",
              "The well went on to supply Parisian fountains and public water needs for decades."
            ],
            "goal": "The student wants to introduce the Grenelle well to an audience unfamiliar with it."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Completed in Paris in 1841 after eight years of drilling, the Grenelle well tapped water so deeply pressurized that it rose 548 meters to the surface without pumping."
            },
            {
              "id": "B",
              "text": "The engineer Louis-Georges Mulot directed one of the most difficult and celebrated drilling projects undertaken in Europe in the nineteenth century."
            },
            {
              "id": "C",
              "text": "An artesian well requires no pumping because its water is trapped under pressure between layers of impermeable rock."
            },
            {
              "id": "D",
              "text": "In 1841, water from the Grenelle well jetted above street level, and the well went on to supply the fountains and public water needs of Paris for several decades afterward."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** An introduction for unfamiliar readers must say what the Grenelle well is, where and when it was made, and what made it remarkable — and A folds all three into one sentence: a Paris well finished in 1841 after eight years of drilling, drawing on water pressurized enough to rise 548 meters unaided.\n\n**The Full Solution:**\n- The goal has two demands: identify the well and make it intelligible to readers who have never heard of it.\n- A names it, places it, dates it, and explains the defining fact — water rising 548 meters to the surface with no pumping.\n\n**Why the other choices are wrong:**\n- B: It introduces the engineer, not the well — the well itself is never even named.\n- C: It defines artesian wells in general and never mentions the Grenelle well at all.\n- D: It assumes the reader already knows what the Grenelle well is, recounting its debut and its later service without ever identifying what kind of thing it was or why the water rose at all."
        },
        {
          "id": 927,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Sea silk is a rare textile fiber spun from the byssus, the tuft of filaments a Mediterranean pen shell uses to anchor itself to the seabed.",
              "Divers gathered the shells by hand from shallow coastal waters.",
              "Each shell yielded only about a gram of usable fiber after cleaning and combing.",
              "Finished sea-silk cloth has a natural golden sheen that was highly prized.",
              "A single pair of knitted sea-silk gloves could require months of gathering and spinning."
            ],
            "goal": "The student wants to emphasize how much labor and raw material a single sea-silk object represented."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Sea silk is a rare textile fiber spun from the byssus, the tuft of strong, silky filaments that a Mediterranean pen shell produces to anchor itself to the seabed."
            },
            {
              "id": "B",
              "text": "Finished sea-silk cloth has a natural golden sheen that made the fabric highly prized."
            },
            {
              "id": "C",
              "text": "Because every hand-gathered shell yielded only about a gram of usable fiber, a single pair of sea-silk gloves could represent months of gathering and spinning."
            },
            {
              "id": "D",
              "text": "Divers gathered pen shells by hand from shallow coastal waters around the Mediterranean."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The goal is to convey cost in labor and material, and C compresses the two decisive quantities into one causal sentence: a gram per hand-gathered shell, and months of work behind a single pair of gloves.\n\n**The Full Solution:**\n- Emphasizing labor and material means pairing the input side (one gram per shell, gathered by hand) with the output side (months for one small object).\n- C's \"Because... could represent\" makes the scarcity the explicit cause of the labor, which is precisely the emphasis sought.\n\n**Why the other choices are wrong:**\n- A: It defines the fiber's source but conveys nothing about quantity or effort.\n- B: The golden sheen speaks to the cloth's appeal, not to the work behind it.\n- D: The gathering method alone, without the yield or the time, does not establish scale — a reader cannot tell whether diving produced pounds of fiber or grams."
        }
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 32,
      questions: [
        {
          "id": 929,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Using a nocturnal required no specialized training: the observer sighted the North Star through a hole at the instrument's center, turned a pointer until it lay along the two guard stars of the Little Bear, and read the hour against a toothed ring. Manuals of the period accordingly presented the whole procedure as ______, a matter of three motions and a glance.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "straightforward"
            },
            {
              "id": "B",
              "text": "incomprehensible"
            },
            {
              "id": "C",
              "text": "tedious"
            },
            {
              "id": "D",
              "text": "ingenious"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The blank is restated on both sides: \"no specialized training\" before it, \"three motions and a glance\" after it. The word that sums up both is \"straightforward.\"\n\n**The Full Solution:**\n- The passage opens by declaring the procedure easy and closes by compressing it into three motions.\n- The appositive after the blank (\"a matter of three motions and a glance\") is a direct paraphrase of the missing word, so the blank must mean simple and easily done.\n\n**Why the other choices are wrong:**\n- B: \"Incomprehensible\" reverses the passage's whole point — a procedure needing \"no specialized training\" is the opposite of one that cannot be understood.\n- C: \"Tedious\" implies long, wearying effort — the opposite of three motions and a glance.\n- D: \"Ingenious\" would praise the instrument's cleverness, but the sentence characterizes how easy the procedure is for its user, not how inventive its design is."
        },
        {
          "id": 931,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "When the Chinese sheng — a mouth organ of seventeen bamboo pipes bundled upright in a wind chest — first reached European courts in the eighteenth century, listeners who judged instruments by appearance expected the crowded pipes to sound ______; instead, the free reeds spoke together in a blend so even that observers compared the instrument to a small organ.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "resonant"
            },
            {
              "id": "B",
              "text": "cacophonous"
            },
            {
              "id": "C",
              "text": "muted"
            },
            {
              "id": "D",
              "text": "overwhelming"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** \"Instead\" reverses the expectation, and what actually happened was \"a blend so even\" it recalled an organ. The expectation must therefore have been the opposite of an even blend — a harsh jumble of sounds, which is what \"cacophonous\" means.\n\n**The Full Solution:**\n- The listeners reasoned from looks: seventeen pipes crowded together suggest seventeen competing voices.\n- \"Instead\" tells us the actual sound contradicted that expectation; the actual sound was smooth and unified.\n- The blank must name the contradicted expectation: discordant noise — \"cacophonous.\"\n\n**Why the other choices are wrong:**\n- A: \"Resonant\" is a virtue, not the opposite of an even, organ-like blend — no contradiction for \"instead\" to signal.\n- C: \"Muted\" concerns volume; the surprise in the text is about blend and evenness, not loudness or softness.\n- D: \"Overwhelming\" concerns force rather than order; the reversal in the text is from expected disorder to an even blend, not from loudness to restraint."
        },
        {
          "id": 928,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Steller's sea cow grazed on kelp in the shallowest water along the shore, and its buoyant body could not fully submerge. Because the animals could neither dive out of reach nor swim quickly away, hunting parties found them easy to ______, and crews provisioning their ships in the Bering Sea took the slow-breeding animals faster than the small population could replace them.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "overlook"
            },
            {
              "id": "B",
              "text": "approach"
            },
            {
              "id": "C",
              "text": "domesticate"
            },
            {
              "id": "D",
              "text": "describe"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The \"Because\" clause supplies the cause — the animals could not dive or flee — and the blank must name the effect that follows for hunters: the sea cows were easy to \"approach.\"\n\n**The Full Solution:**\n- The logic is causal: an animal that cannot escape is an animal a hunting party can get close to.\n- The rest of the sentence confirms the hunting context — crews \"took\" the animals for provisions — so the blank describes the step that made the killing easy.\n\n**Why the other choices are wrong:**\n- A: \"Overlook\" means to fail to notice, which would make the animals harder to hunt, not easier — the causal chain collapses.\n- C: Nothing in the passage involves taming; the crews wanted provisions, not livestock.\n- D: Ease of description has no connection to the inability to dive or flee, and the sentence's consequence is depletion, not documentation."
        },
        {
          "id": 930,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Medieval and early modern writers described sea silk in extravagant terms: cloth spun from the beard of a shellfish, finer than anything woven on land, fit for kings. The objects that actually survive are considerably more ______ — a scattering of gloves, caps, and small knitted panels, treasured less for their size or splendor than for their soft golden shimmer.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "elaborate"
            },
            {
              "id": "B",
              "text": "durable"
            },
            {
              "id": "C",
              "text": "valuable"
            },
            {
              "id": "D",
              "text": "modest"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The sentence pivots from the writers' extravagant descriptions to what \"actually\" survives — small, everyday objects — so the blank must run opposite to \"extravagant\": the surviving pieces are \"modest.\"\n\n**The Full Solution:**\n- The first sentence inflates: cloth for kings, finer than anything on land.\n- The second deflates: gloves, caps, small panels, prized for shimmer rather than splendor.\n- \"Considerably more ______\" must carry the deflation, and \"modest\" — unassuming in scale and pretension — does.\n\n**Why the other choices are wrong:**\n- A: \"Elaborate\" would extend the extravagance, erasing the contrast the word \"actually\" sets up.\n- B: Survival might suggest durability, but the list that follows describes the objects' smallness and plainness, not their toughness.\n- C: \"Valuable\" clashes with the concession that the objects are treasured for shimmer rather than \"size or splendor\" — their worth is not what the blank measures against the legends."
        },
        {
          "id": 934,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "For most of the nineteenth century, federal engineers held that confining the Mississippi between continuous levees would force the river to scour its own bed deeper, so that levees alone could contain any flood. The great flood of 1927 — when the river broke through in more than a hundred places and drove hundreds of thousands of people from their homes — ended the doctrine. Within a year, Congress had authorized a plan built on the opposite premise: the river would sometimes exceed any channel human beings could build for it, and engineered floodways would give the excess water somewhere safe to go.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It describes a natural disaster and then evaluates several competing proposals for preventing its recurrence."
            },
            {
              "id": "B",
              "text": "It presents two schools of engineering thought and argues that the older of the two has been unfairly dismissed."
            },
            {
              "id": "C",
              "text": "It explains how a river's behavior changed gradually over the nineteenth century and how engineers adjusted their methods, step by step, in response to each change."
            },
            {
              "id": "D",
              "text": "It states an engineering doctrine and its rationale, recounts the disaster that discredited the doctrine, and describes the opposing approach adopted in its place."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The three sentences perform exactly the three moves D names: the levees-only doctrine with its scouring rationale; the 1927 flood that \"ended the doctrine\"; and the replacement plan \"built on the opposite premise.\"\n\n**The Full Solution:**\n- Sentence one is doctrine plus rationale — confinement would deepen the bed, so levees alone would suffice.\n- Sentence two is the discrediting event, with its scale spelled out in the dash-set interruption.\n- Sentence three is the reversal: floodways that concede what the old doctrine denied.\n\n**Why the other choices are wrong:**\n- A: Only one plan follows the flood; no competing proposals are weighed against each other.\n- B: The text records the older doctrine's failure without defending it — no argument for rehabilitation appears.\n- C: The change described is abrupt, not gradual — a single flood reverses policy \"within a year\" — and it is the doctrine, not the river's behavior, that changes."
        },
        {
          "id": 932,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The following text is from Walt Whitman's poem \"I Hear America Singing,\" first published in 1860.\n\nI hear America singing, the varied carols I hear, / Those of mechanics, each one singing his as it should be blithe and strong, / The carpenter singing his as he measures his plank or beam, / The mason singing his as he makes ready for work, or leaves off work, / The boatman singing what belongs to him in his boat, the deckhand singing on the steamboat deck, / The shoemaker singing as he sits on his bench, the hatter singing as he stands.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "The speaker narrates a single worker's day from the start of a task to its completion."
            },
            {
              "id": "B",
              "text": "The speaker opens with a sweeping declaration and then develops it through a catalog of individual workers, each singing at a characteristic task."
            },
            {
              "id": "C",
              "text": "The speaker contrasts the songs of skilled tradespeople with the silence of those who perform no labor."
            },
            {
              "id": "D",
              "text": "The speaker poses a series of questions about the nature and dignity of labor and then answers each one with a concrete example drawn from a different trade."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The first line makes the sweeping claim — \"I hear America singing, the varied carols I hear\" — and every subsequent line particularizes it: carpenter, mason, boatman, deckhand, shoemaker, hatter, each attached to a task.\n\n**The Full Solution:**\n- The opening line is general: a nation heard as many songs.\n- The remaining lines are structurally parallel entries in a list, each naming one worker and the work during which he sings.\n- General declaration elaborated by an accumulating catalog is precisely the structure B describes.\n\n**Why the other choices are wrong:**\n- A: No single figure is followed; the poem moves across many workers, giving each a single line, not a day's arc.\n- C: No silent figures appear anywhere — everyone named is singing.\n- D: The poem opens with a declaration, not a question; nothing in the text is interrogative.",
          "_meta": {
            "anchor": "Walt Whitman — \"I Hear America Singing\" (1860); genuine public-domain excerpt, opening lines verbatim",
            "quoteVerify": true,
            "source": "Walt Whitman, \"I Hear America Singing,\" Leaves of Grass (1860 edition)"
          }
        },
        {
          "id": 935,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "passages": [
            {
              "label": "Text 1",
              "text": "Standard accounts date the Hanseatic League's decline to the sixteenth century and explain it geographically. As Atlantic routes eclipsed the Baltic trade and Dutch and English shippers learned to move bulk goods more cheaply, the League's grip on northern commerce simply ceased to matter. On this view the League was a casualty of forces far beyond its members' control, and its slow dissolution requires no further explanation."
            },
            {
              "label": "Text 2",
              "text": "Geography alone makes a poor executioner. The Hanseatic League had weathered earlier shifts in trade by adjusting its privileges and admitting new partners; what changed in the sixteenth century was political. As territorial princes consolidated power, member towns lost the independence that Hanseatic cooperation required — towns cannot coordinate their commercial policies when rulers now set those policies for them. Foreign competition mattered, but it pressed on an association already being hollowed out from within."
            }
          ],
          "question": "Based on the texts, how would the author of Text 2 most likely respond to the argument presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "Dutch and English competition, though often cited by historians, never posed a genuine threat to the League's merchants."
            },
            {
              "id": "B",
              "text": "The League's dissolution was indeed gradual, but the process began a full century earlier than the standard geographic accounts recognize."
            },
            {
              "id": "C",
              "text": "An account limited to shifting trade routes omits the political changes that had already undermined the League's capacity to adapt."
            },
            {
              "id": "D",
              "text": "The League's member towns deliberately dissolved the association once its trading privileges had lost their commercial value."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Text 2 does not dispute that trade shifted; it disputes the sufficiency of that explanation. The League had adapted to shifts before, so what needs explaining is the lost capacity to adapt — a political story about princes and town autonomy that Text 1's geographic account omits.\n\n**The Full Solution:**\n- Text 1's argument culminates in \"requires no further explanation\" — geography suffices.\n- Text 2's opening line rejects exactly that sufficiency (\"Geography alone makes a poor executioner\").\n- Its evidence: past resilience under earlier trade shifts, and the political consolidation that dissolved the coordination the League ran on. C reproduces this objection precisely — the geographic account is incomplete, not wrong.\n\n**Why the other choices are wrong:**\n- A: Text 2 concedes foreign competition was real pressure; it denies only that competition is the whole story.\n- B: Text 2 redates nothing — it relocates the cause, not the century.\n- D: No deliberate dissolution appears in either text; Text 2 describes erosion from within, not a decision by the towns."
        },
        {
          "id": 933,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The camera lucida, patented by the chemist William Hyde Wollaston in 1806, is often imagined as a machine that draws by itself. It is nothing of the kind. The device is a small prism on an adjustable stem: an artist looking down through it sees the scene ahead apparently superimposed on the drawing paper below and must still trace every line by hand. What the prism supplies is not skill but correspondence — proportion and placement arrive already true, while the drawing itself remains the work of the person holding the pencil.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It introduces a device and a common misconception about it, rejects the misconception, and then clarifies what the device actually contributes."
            },
            {
              "id": "B",
              "text": "It traces the development of a drawing device from its original patenting through the later refinements introduced by a series of other nineteenth-century inventors."
            },
            {
              "id": "C",
              "text": "It praises a device's ingenuity and then concedes several respects in which rival instruments outperformed it."
            },
            {
              "id": "D",
              "text": "It explains why a once-popular device was eventually abandoned by the artists who had relied on it."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The text moves in three steps: the device plus the popular fantasy about it (\"a machine that draws by itself\"), the flat rejection (\"It is nothing of the kind\"), and the clarification of its real contribution — correspondence, not skill.\n\n**The Full Solution:**\n- Sentence one pairs the introduction with the misconception.\n- Sentence two rejects the misconception in five words.\n- Sentences three and four explain what the prism actually does and pointedly assign the drawing to the artist — the correction filled out.\n\n**Why the other choices are wrong:**\n- B: After the 1806 patent, no later development or other inventors appear.\n- C: The text corrects a misunderstanding rather than praising the device, and no rival instruments are mentioned.\n- D: Nothing describes abandonment; the text is about what the device does, not its fall from use."
        },
        {
          "id": 937,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "The emperor Frederick II devoted some three decades to De arte venandi cum avibus (The Art of Hunting with Birds), a falconry treatise completed around 1245. What set the work apart from earlier bird lore was its method. Frederick repeated received claims only after testing them: he had the legend that barnacle geese hatch from driftwood investigated and dismissed it for want of evidence, covered the eyes of vultures to learn whether they found food by sight or by smell, and corrected Aristotle wherever his own evidence disagreed. The treatise's accounts of plumage, flight, and training rest on the watching of living birds rather than on the authority of older books.",
          "question": "According to the text, what distinguished Frederick II's treatise from earlier writing about birds?",
          "choices": [
            {
              "id": "A",
              "text": "It was the first written work to take falconry as its principal subject."
            },
            {
              "id": "B",
              "text": "It was composed by a reigning monarch rather than by a scholar."
            },
            {
              "id": "C",
              "text": "It described more species of birds than any earlier treatise had attempted to cover."
            },
            {
              "id": "D",
              "text": "It grounded its claims in observation and testing rather than in the authority of established sources."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text names the distinction explicitly — \"What set the work apart from earlier bird lore was its method\" — and then defines that method as testing claims and trusting observation over \"the authority of older books.\"\n\n**The Full Solution:**\n- The question asks what the text says, and the second sentence answers it directly: the method.\n- The examples specify the method — the barnacle-goose legend investigated, the vulture experiment, Aristotle corrected against evidence.\n- The final sentence restates it as D does: observation of living birds over inherited authority.\n\n**Why the other choices are wrong:**\n- A: The text never claims priority for the treatise as the first on falconry.\n- B: Frederick's rank is mentioned, but the text attributes the work's distinction to its method, not its author's throne.\n- C: Breadth of coverage is never compared; the comparison drawn is about how claims were justified.",
          "_meta": {
            "anchor": "Frederick II — De arte venandi cum avibus (c. 1245); work registered in literaryWorks.json; barnacle-goose and vulture tests are historically attested"
          }
        },
        {
          "id": 941,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "Rather than photographing whole colonies, long-term seabird monitoring programs count the same small cliff plots year after year, so that changes in the numbers reflect the birds rather than the method. Ecologists reviewing four decades of plot counts at two island colonies of common guillemots caution that a species can decline steeply at one site while thriving at another, so a trend measured at a single colony should not be read as the species' overall trajectory. The plot counts bear out this caution because ______",
          "questionTable": {
            "type": "table",
            "caption": "Breeding pairs counted in fixed study plots at two guillemot colonies",
            "headers": [
              "Colony",
              "Pairs, 1985",
              "Pairs, 2005",
              "Pairs, 2025"
            ],
            "rows": [
              [
                "Skarvholm",
                "1,240",
                "980",
                "610"
              ],
              [
                "Fuglenes",
                "410",
                "520",
                "640"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "counts at both colonies changed by hundreds of pairs over the four decades of monitoring."
            },
            {
              "id": "B",
              "text": "Skarvholm supported more breeding pairs than Fuglenes in 1985 and in 2005."
            },
            {
              "id": "C",
              "text": "the combined total of breeding pairs counted at the two colonies taken together was lower in 2025 than the corresponding combined total had been in 1985."
            },
            {
              "id": "D",
              "text": "plot counts at Skarvholm fell by roughly half between 1985 and 2025 while counts at Fuglenes rose by more than half over the same years."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The caution is about divergence — one site declining while another thrives — and D exhibits precisely that: Skarvholm down from 1,240 to 610 as Fuglenes climbed from 410 to 640.\n\n**The Full Solution:**\n- To \"bear out\" the caution, the data must show two colonies moving in opposite directions, so that either one alone would mislead.\n- D reads both rows across the full period and reports the opposing trends in comparable terms (down by half, up by more than half).\n\n**Why the other choices are wrong:**\n- A: \"Changed by hundreds of pairs\" hides direction — the crux of the caution is that the changes ran opposite ways.\n- B: Which colony is larger is irrelevant to whether single-site trends mislead.\n- C: The combined total is exactly the kind of aggregate the caution warns against; a summed decline conceals that one colony was thriving."
        },
        {
          "id": 942,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "Ogham inscriptions and the Latin memorial stones of early medieval Ireland and Britain differ in more than script. Latin stones often carry formulas — \"here lies\" — that address a reader standing at a grave, and some add phrases about the dead person's faith or office. Ogham stones typically record only a name and the name of a father or wider kin group, in a possessive form: \"of Dalagnos, son of Dallos.\" And many ogham stones stand not in cemeteries but on hillsides and at the edges of townlands mentioned in early property records. Some scholars therefore argue that, compared with the Latin memorials, ogham stones ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "were carved by rural artisans who had little or no contact with the users and conventions of the Latin alphabet."
            },
            {
              "id": "B",
              "text": "preserved fuller and more personal accounts of the people they commemorated."
            },
            {
              "id": "C",
              "text": "were intended to be read aloud during burial ceremonies at gravesides."
            },
            {
              "id": "D",
              "text": "may have served less as gravestones than as durable markers of a kin group's claim to land."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** Both premises push the same comparative conclusion: the inscriptions assert possession (\"of Dalagnos\") rather than address mourners, and the stones stand at townland edges rather than in cemeteries. A possessive formula on a boundary is the language of claim, not of burial — which is just what D infers, at the properly cautious strength of \"may have served.\"\n\n**The Full Solution:**\n- The Latin stones supply the contrast case: graveside address, personal detail, cemetery setting — the equipment of memorial.\n- The ogham stones lack each element and add one the Latin stones lack: placement at recorded property boundaries.\n- The inference that fits is functional: identity plus kin plus boundary equals a claim to land, as D concludes.\n\n**Why the other choices are wrong:**\n- A: The script difference is the text's starting point, not evidence about who the carvers knew.\n- B: It runs backward — the ogham texts are the sparser ones, recording names alone.\n- C: Reading aloud at gravesides fits the Latin stones' addressed formulas; the ogham stones often stand nowhere near a grave."
        },
        {
          "id": 939,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "passage": "Bog bodies — human remains preserved for centuries in northern European peatlands — retain skin, hair, and even clothing in remarkable condition, and the acidity of bog water was long assumed to be the preservative. A research team instead hypothesizes that the crucial agent is sphagnan, a carbohydrate released as sphagnum moss decays, which binds the calcium that decay bacteria require and chemically tans skin much as oak bark tans leather.",
          "question": "Which finding, if true, would most directly support the team's hypothesis?",
          "choices": [
            {
              "id": "A",
              "text": "Tissue samples in neutral solutions containing extracted sphagnan resist bacterial decay nearly as well as samples in bog water, while samples in equally acidic solutions without sphagnan decay quickly."
            },
            {
              "id": "B",
              "text": "Bog bodies recovered from the most strongly acidic peatlands are on average no better preserved than bodies recovered from peatlands whose waters are only mildly acidic, according to surveys of dozens of recovered bodies."
            },
            {
              "id": "C",
              "text": "Sphagnum moss grows more slowly in peatlands from which well-preserved bodies have been recovered than in peatlands containing no bodies."
            },
            {
              "id": "D",
              "text": "Peatlands where sphagnum moss is absent tend to be more acidic, on average, than peatlands where the moss is abundant."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The hypothesis makes sphagnan, not acidity, the crucial agent. A's experiment isolates exactly that variable — sphagnan without acidity preserves; acidity without sphagnan does not — which is the most direct support a finding could give.\n\n**The Full Solution:**\n- Supporting \"sphagnan is the crucial agent\" requires showing preservation tracks sphagnan when acidity is removed from the picture.\n- A's neutral-solution condition does that, and its acid-only condition simultaneously undermines the rival explanation the team is arguing against.\n\n**Why the other choices are wrong:**\n- B: It counts against the acidity hypothesis but says nothing about sphagnan — it removes a rival without supporting the team's own agent.\n- C: Slower moss growth near preserved bodies is a correlation running in an uninformative direction; it neither isolates sphagnan nor links it to preservation.\n- D: A relationship between moss and acidity levels describes the bogs themselves, not the preservation of tissue, and so tests neither hypothesis."
        },
        {
          "id": 938,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "The free reed is an ancient Asian idea with a comparatively brief European history. Mouth organs built on the principle — among them the Chinese sheng and the Lao khaen — have been played for well over two thousand years. European makers took up the free reed only around the turn of the nineteenth century, after traveling instruments and written descriptions reached Western workshops; within a few decades the borrowed principle powered a wave of new inventions, from the harmonica and the accordion to the parlor harmonium. A single acoustic idea, long established in one tradition, thus seeded an entire family of instruments in another.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "European instrument makers refined the free reed far beyond the designs found in the Asian instruments that inspired them."
            },
            {
              "id": "B",
              "text": "The harmonica and the accordion owe their popularity to the portability that free reeds made possible."
            },
            {
              "id": "C",
              "text": "The free reed, played in Asian instruments for millennia, was adopted in Europe only around 1800, where it rapidly generated a new family of instruments."
            },
            {
              "id": "D",
              "text": "The sheng and the khaen remained essentially unknown to European musicians until instrument makers in Europe had already developed free-reed instruments of their own, working independently."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The text's spine is a transfer story: millennia of Asian use, adoption in Europe around 1800, and a burst of new instruments there — the arc C compresses into one sentence.\n\n**The Full Solution:**\n- Sentence one announces the asymmetry: ancient in Asia, brief in Europe.\n- The middle sentences supply the dates and mechanism of transfer — traveling instruments and descriptions reaching Western workshops.\n- The final sentence generalizes exactly as C does: one established idea seeding a family of instruments in a new tradition.\n\n**Why the other choices are wrong:**\n- A: The text says Europeans built new instruments from the principle, not that they surpassed the Asian designs.\n- B: Portability is never mentioned; it imports a plausible-sounding cause the text does not give.\n- D: It reverses the stated direction of influence — European adoption followed the arrival of Asian instruments and descriptions."
        },
        {
          "id": 940,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "Engineers assessing passive cooling monitored four traditional courtyard houses in Yazd, Iran, on summer afternoons, recording mean indoor temperatures with each house's windcatcher shaft open and, on comparable days, with the shaft sealed. Outdoor air on the study days averaged 39°C. The engineers conclude that the towers meaningfully cooled every house monitored because ______",
          "questionTable": {
            "type": "table",
            "caption": "Mean afternoon indoor temperature in four courtyard houses, Yazd",
            "headers": [
              "House",
              "Shaft open (°C)",
              "Shaft sealed (°C)"
            ],
            "rows": [
              [
                "House 1",
                "31",
                "36"
              ],
              [
                "House 2",
                "30",
                "34"
              ],
              [
                "House 3",
                "32",
                "38"
              ],
              [
                "House 4",
                "29",
                "33"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "House 3 recorded the warmest sealed-shaft temperature of the study, at 38°C."
            },
            {
              "id": "B",
              "text": "every house was at least 4°C cooler with its shaft open than with the shaft sealed, with differences ranging from 4°C to 6°C."
            },
            {
              "id": "C",
              "text": "indoor temperatures with the windcatcher shafts open stayed well below the 39°C outdoor average in all four of the monitored courtyard houses."
            },
            {
              "id": "D",
              "text": "House 4 was the coolest of the four houses whether its shaft was open or sealed."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The conclusion is about the towers' effect in every monitored house, so the evidence must compare open against sealed for all four rows — and B does, reporting a 4-6°C advantage in each.\n\n**The Full Solution:**\n- The tower's contribution is isolated by the open-versus-sealed comparison, since the two conditions differ only in the shaft.\n- B covers all four houses, matching the claim's \"every house\" scope, and quantifies the range of the effect.\n\n**Why the other choices are wrong:**\n- A: A single sealed-shaft reading involves no comparison and no cooling effect.\n- C: Comparing open-shaft readings to the outdoor average ignores the sealed condition — sealed houses were also below 39°C, so the comparison cannot isolate what the tower added.\n- D: Ranking the houses against one another says nothing about what opening a shaft did within any house."
        },
        {
          "id": 936,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "The windcatchers of Yazd do more than move air. In the courtyard houses of the city's historic quarter, each tall tower works as one part of an integrated cooling system: air drawn down the shaft passes over a pool or through a cellar, shedding heat by evaporation before it reaches the living quarters, while warmed air escapes through the courtyard, pulling a steady current through the house. Rooms at a tower's base stay usable through the hottest afternoons, and households traditionally reorganized daily life around those rooms each summer.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Windcatchers cool the houses of Yazd primarily by chilling the water that is stored in the pools and cellars that sit beneath the bases of the towers."
            },
            {
              "id": "B",
              "text": "In Yazd's traditional houses, windcatchers operate as one element of a larger cooling system, and the comfort that system created shaped how the houses were used."
            },
            {
              "id": "C",
              "text": "The tallest windcatchers in Yazd's historic quarter belonged to the households wealthy enough to build them."
            },
            {
              "id": "D",
              "text": "Mechanical air-conditioning has now made the windcatchers of Yazd's historic quarter obsolete as cooling devices."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text's two halves are the system and its consequences: the tower works with pools, cellars, and courtyard as \"an integrated cooling system,\" and the resulting cool rooms reorganized summer life. B joins both halves.\n\n**The Full Solution:**\n- The opening sentence announces the thesis — the towers \"do more than move air.\"\n- The middle sentence details the integration: shaft, evaporation, courtyard current.\n- The final sentence gives the human consequence, which B folds in: households arranged their days around the cooled rooms.\n\n**Why the other choices are wrong:**\n- A: It inverts the mechanism — the water cools the air by evaporation; the text never says the system exists to chill the water.\n- C: Tower height and household wealth are never discussed.\n- D: Modern air-conditioning appears nowhere in the text."
        },
        {
          "id": 943,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "When engineers confine a river such as the Mississippi between continuous levees, water that once spread across kilometers of floodplain during high water must instead pass through a channel a fraction as wide. Hydrologists comparing gauge records from before and after major levee construction have found that floods carrying equivalent volumes of water now crest at measurably greater heights along many leveed reaches. Structures built to hold floodwater away from the land, then, appear to ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "reduce the total volume of water that the river carries during periods of high water."
            },
            {
              "id": "B",
              "text": "raise the very flood heights they are meant to protect against, by denying the river its room to spread."
            },
            {
              "id": "C",
              "text": "have little measurable effect on the heights that floods of a given size reach."
            },
            {
              "id": "D",
              "text": "protect the communities behind them without altering the river's behavior in any detectable way."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The premises hand over both links of the causal chain: confinement narrows the flood's path, and equivalent volumes now crest higher. The conclusion that completes \"appear to\" is the ironic one B states — the structures raise the heights they exist to guard against.\n\n**The Full Solution:**\n- Premise one is mechanism: the same water squeezed through a channel \"a fraction as wide.\"\n- Premise two is measurement: equal volumes, greater crest heights, after levee construction.\n- Mechanism plus measurement yields B's cause-and-effect conclusion, and the sentence's \"then\" demands exactly that drawn consequence.\n\n**Why the other choices are wrong:**\n- A: The comparison holds volume constant — the records concern floods of equivalent volume, so nothing supports a change in volume.\n- C: It contradicts the stated finding of \"measurably greater heights.\"\n- D: Same contradiction — the record shows detectable alteration, whatever protection the levees also provide."
        },
        {
          "id": 945,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Stored in the herders' cooperative archive ______ the shearing records of every chaccu held in the district since 1994, each one listing the animals gathered, the grams of fleece taken, and the herd's condition at release.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "is"
            },
            {
              "id": "B",
              "text": "are"
            },
            {
              "id": "C",
              "text": "has been"
            },
            {
              "id": "D",
              "text": "was"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The sentence is inverted: the subject follows the verb. That subject is the plural \"records,\" so the verb must be the plural \"are.\"\n\n**The Full Solution:**\n- \"Stored in the herders' cooperative archive\" is an opening participial phrase, not a subject.\n- Restore normal order and the agreement is plain: \"The shearing records... are stored in the archive.\"\n- The plural is confirmed by \"each one listing,\" which distributes over multiple records.\n\n**Why the other choices are wrong:**\n- A: A singular verb drawn to the singular \"archive\" beside the blank — but \"archive\" sits inside the opening phrase and cannot be the subject.\n- C: Singular again, and the perfect adds an unneeded time frame to a simple statement of where the records are.\n- D: Singular, and the past tense contradicts \"since 1994,\" which carries the records up to the present."
        },
        {
          "id": 949,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "The surviving corpus of ogham inscriptions, distributed across several hundred stones that stand in fields, churchyards, and museum collections from southern Ireland to Wales, ______ almost entirely of personal names and statements of descent.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "consist"
            },
            {
              "id": "B",
              "text": "have consisted"
            },
            {
              "id": "C",
              "text": "consists"
            },
            {
              "id": "D",
              "text": "are consisting"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject is the singular \"corpus,\" so the verb must be the singular \"consists\" — no matter how much plural material intervenes.\n\n**The Full Solution:**\n- The long interrupting phrase — \"distributed across several hundred stones that stand in fields, churchyards, and museum collections from southern Ireland to Wales\" — modifies \"corpus\" and contributes nothing to agreement.\n- Strip it away and the frame is simple: \"The corpus... consists almost entirely of personal names.\"\n\n**Why the other choices are wrong:**\n- A: A plural verb pulled toward the nearby plurals (\"stones,\" \"collections\") rather than the true subject.\n- B: Plural again, and the perfect implies a state that has ended or changed, which nothing in the sentence supports.\n- D: Plural, and \"consist\" is a stative verb that resists the progressive — a corpus is not in the process of consisting."
        },
        {
          "id": 948,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "Because the pen shells that yield the raw filaments were gathered one by one by free divers, and because each shell furnished only a wisp of usable ______ a single finished glove of sea silk could represent weeks of gathering, cleaning, and spinning.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "fiber,"
            },
            {
              "id": "B",
              "text": "fiber"
            },
            {
              "id": "C",
              "text": "fiber;"
            },
            {
              "id": "D",
              "text": "fiber:"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence opens with a pair of dependent \"Because\" clauses, and the boundary between an introductory dependent structure and the main clause is a comma.\n\n**The Full Solution:**\n- Everything before the blank hangs on \"Because... and because...\" — neither clause can stand alone.\n- The main clause follows: \"a single finished glove of sea silk could represent weeks of gathering, cleaning, and spinning.\"\n- A comma is the conventional mark that closes the introductory subordination and opens the main assertion.\n\n**Why the other choices are wrong:**\n- B: Without the comma, the long double introduction collides with the main clause, leaving the sentence's turning point unmarked.\n- C: A semicolon requires an independent clause on each side; the \"Because\" clauses are not independent.\n- D: A colon must follow a complete introducing statement, and the subordinate clauses do not form one."
        },
        {
          "id": 946,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "By the 1980s, chemists studying peat-preserved remains had identified the agent behind a paradox that had long puzzled ______ the same waterlogged conditions that keep skin, hair, and fingernails intact for millennia slowly dissolve the skeleton itself.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "excavators,"
            },
            {
              "id": "B",
              "text": "excavators"
            },
            {
              "id": "C",
              "text": "excavators:"
            },
            {
              "id": "D",
              "text": "excavators, but"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The first clause is a complete statement that announces a paradox; the clause after the blank states what that paradox is. A colon after a complete statement is the mark that delivers on such an announcement.\n\n**The Full Solution:**\n- Left of the blank is independent: \"chemists... had identified the agent behind a paradox that had long puzzled excavators.\"\n- Right of the blank spells the paradox out — preservation and destruction from the same conditions.\n- Announcement followed by its content is the colon's defining use.\n\n**Why the other choices are wrong:**\n- A: A comma alone splices two independent clauses together.\n- B: With nothing at the boundary, the two sentences fuse into a run-on.\n- D: \"But\" is grammatical at the joint but wrecks the logic — the second clause is the paradox the first clause promised, not a turn against it."
        },
        {
          "id": 947,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "The free reed entered European workshops as a curiosity, but it did not remain one. Since the first mouth-blown prototypes appeared in the 1820s, instrument makers ______ the mechanism to an astonishing range of forms, from parlor harmoniums to the concertinas that sailors carried to sea.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "adapt"
            },
            {
              "id": "B",
              "text": "adapted"
            },
            {
              "id": "C",
              "text": "would adapt"
            },
            {
              "id": "D",
              "text": "have adapted"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** A \"Since\" phrase marking the start of a period that runs to the present takes the present perfect: makers \"have adapted\" the mechanism from the 1820s onward.\n\n**The Full Solution:**\n- \"Since the first mouth-blown prototypes appeared in the 1820s\" defines a span beginning in the past and continuing now.\n- Action distributed across such a span, still open at the present end, is expressed by the present perfect.\n\n**Why the other choices are wrong:**\n- A: The simple present states a general habit and cannot pair with a \"Since\" phrase anchored to a past starting point.\n- B: The simple past seals the action inside a finished period, contradicting the open span that \"Since\" establishes.\n- C: \"Would adapt\" casts the action as habitual within a closed past frame or as conditional — either reading breaks the from-then-until-now sense."
        },
        {
          "id": 944,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "Steller watched living sea cows almost daily during the months his shipwrecked crew spent on Bering ______ no trained naturalist ever saw the animals alive after 1768, so every later account of the species rests on his notes, a few skeletons, and fragments of hide.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "Island,"
            },
            {
              "id": "B",
              "text": "Island"
            },
            {
              "id": "C",
              "text": "Island;"
            },
            {
              "id": "D",
              "text": "Island, however"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Two independent clauses meet at the blank — the months of observation, and the fact that no naturalist ever saw the animals again — and a semicolon is the conventional boundary between them.\n\n**The Full Solution:**\n- Left of the blank stands a complete sentence: \"Steller watched living sea cows almost daily during the months his shipwrecked crew spent on Bering Island.\"\n- Right of the blank stands another: \"no trained naturalist ever saw the animals alive after 1768...\"\n- With no conjunction supplied, only a semicolon can hold the two sentences together.\n\n**Why the other choices are wrong:**\n- A: A comma alone between independent clauses is a comma splice.\n- B: No punctuation at all fuses the two sentences into a run-on.\n- D: \"Island, however no trained naturalist...\" mispunctuates the conjunctive adverb — \"however\" would need a semicolon before it and a comma after it to do this job."
        },
        {
          "id": 951,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Levees along the lower Mississippi now keep the river from spilling across its floodplain during high water. The sediment that each flood once spread over the surrounding delta instead stays in the channel and rides the current out to deep water beyond the coast. ______ large areas of the delta, cut off from the deposits that once offset their natural settling, are slowly sinking below sea level.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "For example,"
            },
            {
              "id": "B",
              "text": "Consequently,"
            },
            {
              "id": "C",
              "text": "Still,"
            },
            {
              "id": "D",
              "text": "Likewise,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The final sentence is the downstream result of the chain the first two build — levees stop the flooding, so the sediment bypasses the delta, so the delta sinks. \"Consequently\" marks that cause-and-effect relation.\n\n**The Full Solution:**\n- Sentence one states the intervention; sentence two states its side effect (sediment carried past the delta).\n- Sentence three reports what follows from that side effect: land \"cut off from the deposits\" subsides.\n- The sentence even restates the cause inside itself (\"cut off from the deposits\"), confirming that the blank must signal consequence.\n\n**Why the other choices are wrong:**\n- A: The sinking delta is not an example of sediment riding the current; it is the outcome of it.\n- C: \"Still\" would concede a countercurrent, but the third sentence extends the chain rather than resisting it.\n- D: \"Likewise\" announces a parallel case, and no second, similar situation has been introduced."
        },
        {
          "id": 950,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Visitors to Chavín de Huántar in the first millennium BCE did not merely look at the temple; ceremonies there were engineered for the ear as much as for the eye, archaeologists argue, with sound at the center of the experience. ______ a single gallery within the temple has yielded twenty conch-shell trumpets, their mouthpieces polished smooth by generations of players.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Nonetheless,"
            },
            {
              "id": "B",
              "text": "Meanwhile,"
            },
            {
              "id": "C",
              "text": "By contrast,"
            },
            {
              "id": "D",
              "text": "In fact,"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The second sentence delivers striking confirmation of the first — twenty trumpets from one gallery, worn by long use — and \"In fact\" is the transition that presents evidence as emphatic support for a claim just made.\n\n**The Full Solution:**\n- Sentence one advances the archaeologists' claim: sound was central to the temple's ceremonies.\n- Sentence two does not merely continue the thought; it intensifies it with hard evidence — instruments in quantity, polished by generations.\n- A claim followed by its most arresting piece of support takes an emphasizing transition.\n\n**Why the other choices are wrong:**\n- A: \"Nonetheless\" concedes an obstacle, but the trumpet find supports rather than resists the claim.\n- B: \"Meanwhile\" implies a second, parallel scene; both sentences concern the same site and argument.\n- C: \"By contrast\" needs two things set against each other, and the discovery agrees with the claim instead of opposing it."
        },
        {
          "id": 952,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "In the 1870s, salmon canneries on the Pacific Coast packed nearly everything by hand, and even a practiced crew could clean and fill only a few thousand cans in a day. Machines then claimed the line one task at a time: mechanical soldering arrived in the 1880s, and automated filling followed within a decade. ______ a cannery floor that had employed dozens of skilled workers could be run by a handful of machine tenders.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Eventually,"
            },
            {
              "id": "B",
              "text": "However,"
            },
            {
              "id": "C",
              "text": "In other words,"
            },
            {
              "id": "D",
              "text": "In addition,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage is a timeline — the 1870s, then the 1880s, then \"within a decade\" — and the final sentence is the endpoint that timeline was building toward. \"Eventually\" places it there.\n\n**The Full Solution:**\n- The mechanization proceeds stepwise, \"one task at a time,\" with dates marking each stage.\n- The last sentence describes the situation after those steps accumulated: a floor of dozens reduced to a handful.\n- A closing state reached at the end of a dated sequence is introduced by a transition of time.\n\n**Why the other choices are wrong:**\n- B: \"However\" would set the shrunken workforce against the mechanization, but it is mechanization's direct culmination, not a reversal of it.\n- C: \"In other words\" restates; the final sentence adds a new development rather than rephrasing the 1880s ones.\n- D: \"In addition\" flattens the sequence into a list, losing the temporal arc from hand work to machine tending that the dates establish."
        },
        {
          "id": 953,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "The camera obscura, known since antiquity, projects a real image of a scene into a darkened chamber or box.",
              "An artist working inside a camera obscura can trace the projected image directly.",
              "The camera lucida, patented in 1806, is a small prism mounted on a stem and is used in ordinary daylight.",
              "An artist looking through the prism sees the scene apparently superimposed on the drawing paper, but no image is actually cast on the paper.",
              "The camera lucida was compact enough to carry in a coat pocket for fieldwork."
            ],
            "goal": "The student wants to emphasize a difference between the camera lucida and the camera obscura."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Whereas the camera obscura casts a real, traceable image inside a darkened space, the camera lucida projects nothing — the artist merely sees scene and paper superimposed in the eye."
            },
            {
              "id": "B",
              "text": "The camera lucida, patented in 1806, is a small prism mounted on a stem and used in ordinary daylight."
            },
            {
              "id": "C",
              "text": "Both the camera obscura and the camera lucida helped artists set down the proportions of a scene accurately."
            },
            {
              "id": "D",
              "text": "The camera obscura, an instrument known since antiquity, projects a real image of a scene into a darkened chamber or box, where an artist can trace the projected image directly."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Emphasizing a difference requires putting both devices in one frame and stating what divides them. A does exactly that with the sharpest divide the notes contain: a real projected image versus no projection at all.\n\n**The Full Solution:**\n- The goal names two devices, so the sentence must mention both — and in contrastive relation, which A's \"Whereas\" supplies.\n- A draws its two halves straight from the notes: the obscura's traceable projection in a dark chamber; the lucida's superimposition \"in the eye\" with \"no image... cast on the paper.\"\n\n**Why the other choices are wrong:**\n- B: It describes the camera lucida alone; with one device on stage, no difference can be emphasized.\n- C: It emphasizes a similarity — the precise opposite of the stated goal.\n- D: Like B, it presents a single device; the camera lucida never appears for the comparison."
        },
        {
          "id": 954,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "A seabird monitoring program has counted breeding pairs in the same cliff plots every summer since the late 1950s.",
              "Counts follow a written protocol fixing the date range, time of day, and plot boundaries used each year.",
              "Because the method has never changed, differences between years reflect changes in the birds themselves.",
              "The series now spans more than sixty years, longer than most instrument records of ocean conditions in the region.",
              "Ecologists have used the series to link breeding numbers to shifts in the fish populations that seabirds depend on."
            ],
            "goal": "The student wants to emphasize the scientific value of the census's long, unbroken record."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "A long-running seabird monitoring program has counted the breeding pairs nesting in the same small cliff plots every summer since the late 1950s, following a written protocol that fixes the date range and time of day for each count."
            },
            {
              "id": "B",
              "text": "Ecologists who use the census data are interested primarily in the populations of the small fish that cliff-nesting seabirds depend on for food."
            },
            {
              "id": "C",
              "text": "Counted by an unchanged protocol for over sixty years, the census offers a rare record in which trends reflect the birds themselves, long enough to tie breeding numbers to shifts in the fish they depend on."
            },
            {
              "id": "D",
              "text": "A written protocol fixes the date range, the time of day, and the plot boundaries to be used in each year's counts of breeding seabirds."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The value to be emphasized has two ingredients — length and unbrokenness — and C converts both into scientific payoff: trends that reflect the birds rather than the method, and a span long enough to reveal links to fish populations.\n\n**The Full Solution:**\n- \"Unchanged protocol for more than sixty years\" compresses the notes on constancy and duration.\n- \"Every trend reflects the birds themselves\" states why constancy matters scientifically.\n- The closing clause shows the record in use — the demonstrated payoff that makes the case for its value.\n\n**Why the other choices are wrong:**\n- A: It reports the counting arrangement without a word about why the record is scientifically valuable.\n- B: It drops the census entirely, mentioning only the fish.\n- D: The protocol detail alone establishes procedure, not the significance of six decades of consistent data."
        }
      ]
    }
  ]
};

export default practiceTest9RW;
