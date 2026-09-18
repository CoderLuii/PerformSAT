// Practice Test 4 — SAT Reading & Writing (R&W)
// R&W seating varied 2026-09-07 (scripts/varyRWSeating.mjs): items re-dealt inside their official skill blocks with a per-test seed — block flow and per-skill counts unchanged.
// Auto-assembled by scripts/assembleRWTest.mjs from the authored JSON in
// scripts/generated/authored/test4/. Do not hand-edit this file —
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


export const practiceTest4RW = {
  id: "practice-test-4-rw",
  title: "Practice Test 4 — Reading & Writing",
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
          "id": 402,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "In many medieval workshops, the scribe who copied a book's main text worked only in dark ink, leaving gaps at chapter openings and skipping the headings entirely. Filling that blank space was a separate craft: a specialist called a rubricator was expected to ______ the missing initials and headings in red, completing pages the scribe had deliberately left unfinished.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "supply"
            },
            {
              "id": "B",
              "text": "revise"
            },
            {
              "id": "C",
              "text": "translate"
            },
            {
              "id": "D",
              "text": "withhold"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The rubricator's job was to furnish what the scribe deliberately left out, and \"supply\" means precisely to provide something missing.\n\n**The Full Solution:**\n- The scribe leaves gaps: no initials, no headings.\n- The rubricator \"completes pages the scribe had deliberately left unfinished,\" so the blank must mean adding the absent elements.\n- \"Supply the missing initials and headings\" captures that act of provision exactly.\n\n**Why the other choices are wrong:**\n- B: \"Revise\" means to alter something already written, but the initials and headings do not yet exist on the page.\n- C: \"Translate\" means to render text in another language, which nothing in the text suggests.\n- D: \"Withhold\" means to keep back, the opposite of completing the unfinished pages.",
          "_meta": {
            "anchor": "medieval scriptorium division of labor — the rubricator"
          }
        },
        {
          "id": 403,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "No map drawn at a reduced scale can carry every feature of the landscape it represents. Cartographers therefore practice what they call generalization: deciding which details a map's purpose requires and which it can afford to ______, so that the roads, rivers, and settlements that remain stay legible rather than disappearing into clutter.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "omit"
            },
            {
              "id": "B",
              "text": "enlarge"
            },
            {
              "id": "C",
              "text": "invent"
            },
            {
              "id": "D",
              "text": "duplicate"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Generalization is a choice between details a map keeps and details it leaves out, and \"omit\" names the leaving-out.\n\n**The Full Solution:**\n- The first sentence sets the constraint: a reduced-scale map cannot carry every feature.\n- The blank is paired against \"which details a map's purpose requires\" — so it must name the fate of the details not required.\n- \"Omit,\" to leave out, completes the contrast and explains why the remaining features stay legible.\n\n**Why the other choices are wrong:**\n- B: \"Enlarge\" would add prominence to details, aggravating the clutter the sentence is trying to avoid.\n- C: \"Invent\" means to fabricate features, which describes bad mapmaking, not selective mapmaking.\n- D: \"Duplicate\" means to repeat features, which no part of the text suggests and which would also worsen clutter.",
          "_meta": {
            "anchor": "cartographic generalization — selective omission at reduced scale"
          }
        },
        {
          "id": 404,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Rather than judging a soccer team by its goals alone, analysts now rate the quality of every scoring chance it creates. By comparing each shot's distance, angle, and buildup with thousands of similar attempts from past matches, they can ______ how often a chance of that kind ends in a goal — and thus whether a team's results reflect its play or merely its luck.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "guarantee"
            },
            {
              "id": "B",
              "text": "estimate"
            },
            {
              "id": "C",
              "text": "dictate"
            },
            {
              "id": "D",
              "text": "recall"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** Comparing a shot with thousands of similar past attempts yields an approximate rate, and \"estimate\" is the word for a judgment of that kind.\n\n**The Full Solution:**\n- The analysts' method is statistical: match a chance against a large sample of similar chances.\n- What that produces is a likelihood — \"how often a chance of that kind ends in a goal\" — not a certainty.\n- \"Estimate\" expresses exactly this: a reasoned approximation drawn from data.\n\n**Why the other choices are wrong:**\n- A: \"Guarantee\" promises an outcome, but past frequencies cannot promise what any one shot will do.\n- C: \"Dictate\" means to command an outcome; analysts measure chances, they do not control them.\n- D: \"Recall\" means to remember, but the analysts are computing a new figure, not retrieving an old one.",
          "_meta": {
            "anchor": "soccer analytics — rating scoring chances against historical attempts"
          }
        },
        {
          "id": 401,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Many ant species guide nestmates to food by laying down trails of chemical signals. The signals are short-lived, fading within minutes unless returning foragers add fresh marks of their own. When a food source runs out, workers simply stop marking the route, and the trail soon vanishes. To keep a productive route open, then, a colony must continually ______ its trail.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "conceal"
            },
            {
              "id": "B",
              "text": "imitate"
            },
            {
              "id": "C",
              "text": "renew"
            },
            {
              "id": "D",
              "text": "shorten"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The trail persists only while foragers keep adding fresh marks, so keeping a route open requires continually renewing it.\n\n**The Full Solution:**\n- The text establishes that trail signals fade within minutes unless returning foragers \"add fresh marks of their own.\"\n- The blank must name what a colony does to \"keep a productive route open\" — the opposite of letting the trail vanish.\n- \"Renew\" means to restore or refresh, exactly the continual re-marking the text describes.\n\n**Why the other choices are wrong:**\n- A: \"Conceal\" means to hide the trail, the opposite of keeping it available to guide nestmates.\n- B: \"Imitate\" means to copy something else; the colony is maintaining its own trail, not copying one.\n- D: \"Shorten\" changes the route's length, but the text is about the trail's persistence, not its distance.",
          "_meta": {
            "anchor": "ant trail pheromones — decay and reinforcement"
          }
        },
        {
          "id": 407,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The towering mounds built by some African termites were long described as chimneys: metabolic heat from the colony below was thought to drive a steady upward draft that vented stale air. Researchers who measured airflow inside occupied mounds have proposed a different picture, in which the mound works less like a chimney than like a lung. __When the researchers injected a tracer gas into nest chambers and followed its movement, they found air sloshing slowly back and forth through the mound's porous walls, driven by daily swings in outside temperature, rather than streaming steadily upward.__ On this account, the colony's air is exchanged by the rhythm of the surrounding day, not by the heat of the colony itself.",
          "question": "Which choice best describes the function of the underlined sentence in the text as a whole?",
          "choices": [
            {
              "id": "A",
              "text": "It describes the chimney model of mound ventilation that the rest of the passage goes on to defend against the objections of its critics."
            },
            {
              "id": "B",
              "text": "It presents the measurements that support the revised account of the mound's function introduced in the sentence before it."
            },
            {
              "id": "C",
              "text": "It concedes a weakness in the lung comparison that the passage's final sentence then attempts to repair."
            },
            {
              "id": "D",
              "text": "It explains how termites detect and repair breaches in the porous outer walls of their mounds."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The preceding sentence proposes the lung picture; the underlined sentence delivers the tracer-gas evidence — air sloshing back and forth, not streaming upward — that backs it.\n\n**The Full Solution:**\n- Sentence 2 introduces the revision: mound as lung, not chimney.\n- The underlined sentence reports the experiment behind it: tracer gas moving in slow oscillations driven by daily temperature swings.\n- The final sentence draws the conclusion the measurements license. The underline is the evidentiary middle step.\n\n**Why the other choices are wrong:**\n- A: The chimney model appears in the first sentence, and the passage undermines it rather than defending it.\n- C: The sentence strengthens the lung comparison; it concedes nothing.\n- D: Breach detection and repair are never mentioned; the porous walls figure only as the route the air takes.",
          "_meta": {
            "anchor": "termite mound ventilation — lung model supported by tracer-gas measurements"
          }
        },
        {
          "id": 405,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "In 1856 the eighteen-year-old chemist William Perkin set out to synthesize quinine, then the only effective malaria treatment, from coal-tar compounds. The attempt failed. __One flask, instead of yielding the colorless drug, produced a deep purple residue that dyed silk a brilliant, wash-fast mauve.__ Perkin patented the substance, left his studies, and opened a factory; within two decades, chemists across Europe were coaxing a whole spectrum of synthetic colors from coal tar, and the firms they founded were branching into pharmaceuticals and photographic chemicals. A failed medicine had become the founding accident of industrial organic chemistry.",
          "question": "Which choice best describes the function of the underlined sentence in the text as a whole?",
          "choices": [
            {
              "id": "A",
              "text": "It reports the unexpected result of the failed synthesis just described, the accidental discovery on which the industry discussed in the rest of the text was built."
            },
            {
              "id": "B",
              "text": "It explains why Perkin's method could never have produced quinine from the starting materials he had chosen."
            },
            {
              "id": "C",
              "text": "It signals that Perkin's commercial ambitions ultimately mattered more to him than the scientific problem he had set out to solve."
            },
            {
              "id": "D",
              "text": "It defines a technical term that readers must understand before the passage's account of the dye industry can proceed."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The underlined sentence is the hinge of the passage: the failed experiment's surprise product, from which everything after — patent, factory, industry — follows.\n\n**The Full Solution:**\n- Before the underline: Perkin attempts quinine and fails.\n- The underlined sentence reports what the failure actually produced — a brilliant, wash-fast purple dye.\n- After the underline: Perkin commercializes that dye, and the passage closes by calling it \"the founding accident\" of an industry. The sentence supplies the accident.\n\n**Why the other choices are wrong:**\n- B: The sentence describes what the flask produced, not why the synthesis was chemically doomed.\n- C: Nothing in the sentence weighs Perkin's ambitions against his scientific aims; his commercial turn comes later.\n- D: The sentence narrates an event; it defines no term.",
          "_meta": {
            "anchor": "William Perkin — mauveine, the accidental founding of synthetic dye chemistry"
          }
        },
        {
          "id": 408,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "passages": [
            {
              "label": "Text 1",
              "text": "In an influential 1985 study, psychologist Thomas Gilovich and his colleagues analyzed shooting records from professional basketball. Players, coaches, and fans overwhelmingly believed that a player who has just made several shots in a row is more likely to make the next one. The records showed otherwise: a player's chance of hitting the next shot was no higher after a string of makes than after a string of misses. The researchers concluded that the \"hot hand\" is a cognitive illusion — an instance of the human tendency to see meaningful streaks in chance sequences."
            },
            {
              "label": "Text 2",
              "text": "Economists Joshua Miller and Adam Sanjurjo have identified a subtle bias in how early studies measured streak shooting. Selecting from a finite record only the shots that immediately follow several makes skews the expected success rate on those shots downward: even a shooter with no streakiness at all would score below his overall average on that selected subset. Judged against the corrected benchmark, the very records once used to dismiss the hot hand show a modest but consistent streak effect."
            }
          ],
          "question": "Based on the texts, how would Miller and Sanjurjo (Text 2) most likely respond to the conclusion presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "Fans and players were wrong to perceive streaks in shooting records, but the tendency to see patterns in chance sequences is too deeply rooted to correct."
            },
            {
              "id": "B",
              "text": "The 1985 study relied on records too incomplete to reveal how often professional players actually attempted shots immediately after a string of makes."
            },
            {
              "id": "C",
              "text": "The records Gilovich and his colleagues analyzed do not establish that the hot hand is an illusion, because the method used to evaluate those records was itself biased against finding a streak effect."
            },
            {
              "id": "D",
              "text": "The hot hand is indeed a cognitive illusion, and the statistical bias they identified makes the illusion even more persuasive than Gilovich and his colleagues claimed."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Miller and Sanjurjo's objection is methodological: the selection procedure itself pushes measured success rates down, so records analyzed that way cannot show that streak shooting is illusory — and, corrected, the same records show a modest effect.\n\n**The Full Solution:**\n- Text 1's conclusion rests on a comparison: success after makes looked no better than after misses.\n- Text 2 shows the comparison's benchmark was wrong — a streak-free shooter would score below average on the selected shots — so \"no better\" actually conceals a positive effect.\n- Choice C states exactly that response: the data do not establish the illusion, because the method was biased against finding the effect.\n\n**Why the other choices are wrong:**\n- A: It sides with Text 1's conclusion, which Text 2's correction overturns.\n- B: Text 2 faults the analysis of the records, not the records' completeness.\n- D: It reverses Text 2's position — Miller and Sanjurjo find evidence for the hot hand, not a stronger case against it.",
          "_meta": {
            "anchor": "cross-text — Gilovich et al. (hot hand as illusion) vs. Miller and Sanjurjo (selection-bias correction); sports analytics"
          }
        },
        {
          "id": 406,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "In the early 1890s, most geographers held that a rigid ship caught in Arctic pack ice was doomed. The Norwegian explorer Fridtjof Nansen noted that wreckage from a vessel crushed near Siberia had later surfaced off Greenland, and reasoned that a slow current must carry sea ice across the polar basin. He had a ship, the Fram, built with a rounded hull that ice pressure would lift rather than crush, sailed it into the pack, and let it freeze in deliberately. Three years later the Fram emerged, intact, on the far side of the Arctic — very nearly where Nansen's proposed current, and no other explanation, said it should be.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To argue that the geographers who warned against entering the polar pack ice were relying on dramatic accounts whose details returning crews had greatly embellished over the years."
            },
            {
              "id": "B",
              "text": "To explain why the wooden ships of the nineteenth century could not survive prolonged contact with pack ice."
            },
            {
              "id": "C",
              "text": "To recount the accidents that forced a polar expedition to abandon the scientific goals it had originally set."
            },
            {
              "id": "D",
              "text": "To describe how an explorer turned a conjecture about a polar current into a test by letting a purpose-built ship freeze into the ice and drift."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text moves from Nansen's inference (drifting wreckage implies a current) to his experimental design (a hull the ice would lift) to the result (the ship crossed the Arctic as predicted) — a conjecture turned into a test.\n\n**The Full Solution:**\n- The inference: wreckage crushed near Siberia surfacing off Greenland points to a trans-polar current.\n- The test: the Fram is built to survive freezing in, then deliberately frozen in.\n- The verdict: three years later it emerges where the proposed current — and nothing else — predicted. Choice D captures this arc.\n\n**Why the other choices are wrong:**\n- A: The geographers' caution is background; the text never questions their sources.\n- B: The text explains how one ship was designed to survive the ice, not why others could not.\n- C: The freezing-in was the goal, not an accident, and no aims were abandoned.",
          "_meta": {
            "anchor": "Fridtjof Nansen — the Fram drift as a test of the trans-polar current"
          }
        },
        {
          "id": 409,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Nineteenth-century European expeditions often fared badly in conditions Arctic peoples had lived with for centuries. Crews that ignored local practice hauled heavy sledges by hand, wore woolens that soaked through and froze, and subsisted on tinned rations. Expeditions that learned from Inuit communities did far better: dog teams pulled loads at many times a walker's pace, fur clothing shed moisture before it froze, and fresh meat warded off the deficiency diseases that crippled other parties. Again and again, the polar record shows that success depended less on new equipment shipped from Europe than on a crew's willingness to adopt techniques refined over generations in the Arctic itself.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "European expeditions failed in the Arctic primarily because their crews lacked the physical endurance of the region's inhabitants."
            },
            {
              "id": "B",
              "text": "Expeditions that adopted the equipment and techniques of Arctic peoples tended to succeed where those that relied on European methods struggled."
            },
            {
              "id": "C",
              "text": "The dog teams used by nineteenth-century expeditions could haul heavier loads than any machine available at the time."
            },
            {
              "id": "D",
              "text": "Arctic peoples developed clothing and travel methods over generations that European manufacturers of the nineteenth century repeatedly tried and failed to copy."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text's contrast runs from start to finish: crews that ignored Arctic practice suffered; crews that adopted it thrived; and the closing sentence generalizes the pattern.\n\n**The Full Solution:**\n- The first half catalogs the failures of European methods: hand-hauling, freezing woolens, tinned rations.\n- The second half catalogs the successes of adopted techniques: dog teams, fur clothing, fresh meat.\n- The final sentence states the lesson — success turned on willingness to adopt local techniques — which choice B restates.\n\n**Why the other choices are wrong:**\n- A: The text attributes failure to methods, not to the crews' endurance.\n- C: Machines are never discussed; the dog teams are compared to walkers hauling sledges.\n- D: Copying by European manufacturers appears nowhere in the text.",
          "_meta": {
            "anchor": "polar expeditions — adoption of Inuit equipment and techniques"
          }
        },
        {
          "id": 415,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "A medieval book was copied not into a bound volume but onto separate gatherings of folded leaves called quires, which were sewn together only after the writing was finished. At the foot of each quire's final page, the scribe added a catchword: the first word of the quire that was meant to follow. A binder assembling the finished book could thus put the gatherings in order by simple matching, joining each quire to the one whose opening word answered its catchword, with no need to follow the text itself. The custom suggests that ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "the makers of such books did not assume that the person assembling them would be reading the text along the way."
            },
            {
              "id": "B",
              "text": "binders often placed quires in the wrong order even when the catchwords were clearly written."
            },
            {
              "id": "C",
              "text": "catchwords were added only to books whose quires had been copied by several different scribes."
            },
            {
              "id": "D",
              "text": "binders were expected to trim every catchword away so that a finished book would show no visible trace of how it had been assembled."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** A device that reduces ordering to word-matching is valuable precisely when the assembler cannot be relied on to follow the text — which is what the custom implies about the people doing the assembling.\n\n**The Full Solution:**\n- The catchword lets a binder order quires \"by simple matching,\" the text says, \"with no need to follow the text itself.\"\n- Building such a device into every quire is a precaution; precautions imply an expected need.\n- The expected need is an assembler who is not reading the text — exactly choice A, and nothing stronger.\n\n**Why the other choices are wrong:**\n- B: The text describes the system working, not failing; frequent misbinding is unsupported.\n- C: Nothing links catchwords to the number of scribes; the motive given concerns binding order.\n- D: Trimming is never mentioned, and a custom meant to guide assembly says nothing about hiding it afterward.",
          "_meta": {
            "anchor": "medieval quires and catchwords — assembly by matching"
          }
        },
        {
          "id": 410,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "At the universities of thirteenth-century Europe, demand for accurate copies of required texts outran what any bookshop could produce by copying volumes one at a time. Stationers answered with the pecia system. A shop kept an approved exemplar of each text, divided into numbered sections — peciae — that students and professional scribes rented individually for a fixed fee. Dozens of copyists could then be at work on different sections of the same book at once. And because every rented section was copied directly from a single vetted exemplar, mistakes did not compound from copy to copy, as they inevitably did when each new manuscript served as the model for the next.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "By renting out sections of one vetted master copy to many copyists at once, the pecia system produced needed texts quickly while keeping errors from compounding across copies."
            },
            {
              "id": "B",
              "text": "Thirteenth-century stationers earned most of their income by renting out sections of manuscripts rather than by selling completed books."
            },
            {
              "id": "C",
              "text": "University students of the thirteenth century were required to copy their own textbooks from exemplars that stationers kept on approved lists."
            },
            {
              "id": "D",
              "text": "The pecia system slowed the spread of errors by requiring that every new manuscript be checked against the copy from which it had been made."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The text presents the pecia system as solving two problems at once — speed and accuracy — and choice A captures both halves.\n\n**The Full Solution:**\n- The problem: demand outran one-at-a-time copying.\n- The speed half: renting numbered sections let dozens of copyists work on one book simultaneously.\n- The accuracy half: every section came straight from a single vetted exemplar, so errors did not compound from copy to copy. Choice A is the only option that joins the two.\n\n**Why the other choices are wrong:**\n- B: The stationers' sources of income are never discussed.\n- C: The text says students could rent sections, not that they were required to copy their own textbooks.\n- D: The system prevented compounding by copying from the exemplar directly; the text describes no checking of finished manuscripts.",
          "_meta": {
            "anchor": "pecia system — university book production before print"
          }
        },
        {
          "id": 412,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "passage": "Female paper wasps of the species Polistes dominula bear black facial patches that vary strikingly from individual to individual. Behavioral ecologist Elizabeth Tibbetts has proposed that these markings serve as status signals: by advertising a wasp's fighting ability, the patches let rivals size each other up and settle contests over resources without paying the costs of an actual fight.",
          "question": "Which finding, if true, would most directly support the researcher's hypothesis?",
          "choices": [
            {
              "id": "A",
              "text": "The size and shape of a wasp's black facial patches are determined mainly by the quantity and quality of the nutrition the wasp happened to receive while developing as a larva in the nest."
            },
            {
              "id": "B",
              "text": "In staged encounters over food, wasps facing rivals with more broken-up facial patches — the pattern typical of strong fighters — usually retreat without fighting."
            },
            {
              "id": "C",
              "text": "Wasps with heavily broken-up facial patches spend more of the day foraging away from the nest than wasps with plain faces do."
            },
            {
              "id": "D",
              "text": "Facial patches fade gradually as wasps age, and older wasps initiate fewer contests over resources than younger ones do."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The hypothesis says the patches let rivals assess fighting ability and avoid combat; rivals retreating from strong-fighter markings without a fight is that mechanism observed in action.\n\n**The Full Solution:**\n- The hypothesis has two parts: patches advertise fighting ability, and the advertisement lets contests end without fighting.\n- Choice B supplies both: wasps read the strong-fighter pattern on a rival's face and yield before combat begins.\n- That is a direct behavioral confirmation of the signaling function.\n\n**Why the other choices are wrong:**\n- A: It explains where patches come from, not whether rivals use them to settle contests.\n- C: Foraging time has no bearing on whether patches function as signals in contests.\n- D: It pairs two facts about aging without showing that any wasp responds to another's markings.",
          "_meta": {
            "anchor": "Elizabeth Tibbetts — paper wasp facial badges as status signals; finding-if-true form"
          }
        },
        {
          "id": 411,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Working in Heidelberg in the late 1850s, the chemist Robert Bunsen and the physicist Gustav Kirchhoff directed the light of colored flames through a prism instrument of their own design. They found that each chemical element, heated until it glows, emits light at its own fixed set of wavelengths, which their spectroscope displayed as a pattern of bright lines. The pattern proved to be a signature: it did not change with the compound in which an element arrived or the mineral from which it came. Within a year of publishing the method, the two had used unfamiliar line patterns to announce two previously unknown elements, cesium and rubidium.",
          "question": "According to the text, why could a glowing element be identified with the spectroscope?",
          "choices": [
            {
              "id": "A",
              "text": "Each element produces a flame whose distinctive overall color can be recognized without any special instrument."
            },
            {
              "id": "B",
              "text": "Each element emits its own fixed pattern of bright lines whatever compound or mineral it arrives in."
            },
            {
              "id": "C",
              "text": "The brightness of a flame's light increases in proportion to the amount of the element present."
            },
            {
              "id": "D",
              "text": "Only two elements, cesium and rubidium, produce bright lines when heated in a flame."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text states that each element's line pattern is fixed and \"did not change with the compound in which an element arrived or the mineral from which it came\" — a signature, and therefore an identifier.\n\n**The Full Solution:**\n- The instrument displays a glowing element's light as a pattern of bright lines.\n- The pattern belongs to the element itself: it is unaffected by compound or mineral of origin.\n- A property unique to each element and stable across sources is exactly what permits identification.\n\n**Why the other choices are wrong:**\n- A: The spectroscope was needed precisely because it resolves flame light into lines; the text never says overall color sufficed.\n- C: The text ties identity to the pattern's position, not to brightness or quantity.\n- D: Cesium and rubidium were discovered by the method; the text says every element emits its own pattern.",
          "_meta": {
            "anchor": "Bunsen and Kirchhoff — flame spectroscopy; element line signatures; detail stem"
          }
        },
        {
          "id": 413,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "An analyst studying one professional basketball league argues that its offenses were remade during the 2010s. In the analyst's account, teams did not merely shoot more three-pointers as the decade went on; the shift toward the three-point line was accompanied by a league-wide rise in scoring efficiency. The analyst supports the claim with league averages from three seasons.",
          "questionTable": {
            "type": "table",
            "caption": "League-wide averages in one professional basketball league, selected seasons",
            "headers": [
              "Season",
              "Three-point attempts per game",
              "Points per 100 possessions"
            ],
            "rows": [
              [
                "2011-12",
                "18.4",
                "104.6"
              ],
              [
                "2015-16",
                "24.1",
                "106.4"
              ],
              [
                "2019-20",
                "34.1",
                "110.6"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to support the claim?",
          "choices": [
            {
              "id": "A",
              "text": "Teams attempted 34.1 three-pointers per game in the 2019-20 season, nearly double the 18.4 per game they had attempted in 2011-12."
            },
            {
              "id": "B",
              "text": "Three-point attempts rose from 18.4 per game in 2011-12 to 24.1 in 2015-16 and 34.1 in 2019-20, while points per 100 possessions climbed from 104.6 to 106.4 to 110.6 over the same seasons."
            },
            {
              "id": "C",
              "text": "Points per 100 possessions rose from 104.6 in 2011-12 to 106.4 in 2015-16 and 110.6 in 2019-20."
            },
            {
              "id": "D",
              "text": "In the 2015-16 season, teams attempted 24.1 three-pointers per game and scored 106.4 points per 100 possessions, both higher than in 2011-12."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The claim has two coupled parts — attempts shifted toward the three-point line, and efficiency rose alongside — and B is the only choice that traces both series across all three seasons.\n\n**The Full Solution:**\n- Part one of the claim: more three-pointers over the decade. B shows 18.4 to 24.1 to 34.1.\n- Part two: scoring efficiency rose as the shift happened. B shows 104.6 to 106.4 to 110.6 over the same seasons.\n- Presenting the two rises together is what makes the data support an \"accompanied by\" claim.\n\n**Why the other choices are wrong:**\n- A: It documents only the rise in attempts and says nothing about efficiency.\n- C: It documents only the rise in efficiency and says nothing about attempts.\n- D: A single season's pair of values, even with a comparison to 2011-12, cannot show two sustained trends moving together.",
          "_meta": {
            "anchor": "basketball analytics — three-point shift with rising efficiency; original league-average table"
          }
        },
        {
          "id": 414,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "A nineteenth-century triangulation survey began from a baseline whose length was measured directly on the ground, since every distance in the network would ultimately be computed from it. A historian of surveying claims that the compensated measuring bars adopted at mid-century marked a decisive advance: baselines measured with the bars closed with far smaller errors than those measured with steel chains, even though the bar-measured baselines were longer.",
          "questionTable": {
            "type": "table",
            "caption": "Baselines measured by one national survey, 1821-1867",
            "headers": [
              "Baseline",
              "Year",
              "Apparatus",
              "Length (miles)",
              "Closure error (inches per mile)"
            ],
            "rows": [
              [
                "Ashford Flats",
                "1821",
                "Steel chain",
                "5.2",
                "3.1"
              ],
              [
                "Redstone Valley",
                "1838",
                "Steel chain",
                "6.0",
                "2.7"
              ],
              [
                "Millbrook Plain",
                "1852",
                "Compensated bars",
                "7.4",
                "0.6"
              ],
              [
                "Saltmarsh Level",
                "1867",
                "Compensated bars",
                "8.9",
                "0.4"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to support the claim?",
          "choices": [
            {
              "id": "A",
              "text": "The baselines measured with compensated bars, at 7.4 and 8.9 miles, were longer than either chain-measured baseline, yet they closed with errors of 0.6 and 0.4 inches per mile, against 3.1 and 2.7 for the chains."
            },
            {
              "id": "B",
              "text": "The Saltmarsh Level baseline, measured with compensated bars in 1867, was the longest of the four baselines listed in the table, at 8.9 miles."
            },
            {
              "id": "C",
              "text": "The survey's closure errors declined with every successive baseline it measured between 1821 and 1867, whatever apparatus was in use."
            },
            {
              "id": "D",
              "text": "The Ashford Flats baseline of 1821, measured with a steel chain, closed with an error of 3.1 inches per mile, the largest error of the four in the table."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The claim compares apparatus under a handicap — smaller errors from the bars even on longer baselines — and A cites the lengths and the errors for both pairs, completing the comparison.\n\n**The Full Solution:**\n- The claim's structure: bars beat chains on error despite longer lines.\n- A establishes the handicap (7.4 and 8.9 miles versus 5.2 and 6.0) and the result (0.6 and 0.4 inches per mile versus 3.1 and 2.7).\n- Both conditions of the claim are documented; nothing is left to inference.\n\n**Why the other choices are wrong:**\n- B: One baseline's length says nothing about closure errors or the chain comparison.\n- C: A steady decline over time blurs the claim's point — it credits the sequence of measurements rather than the change of apparatus.\n- D: The single worst chain error omits the bar measurements entirely, so no comparison is made.",
          "_meta": {
            "anchor": "history of surveying — chain versus compensated-bar baselines; original survey table"
          }
        },
        {
          "id": 416,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "In 1828 the German chemist Friedrich Wöhler synthesized urea, a compound until then obtained only from living bodies, out of inorganic starting materials. Textbooks often cast the experiment as the decisive blow against vitalism — the doctrine that substances formed in living things require a special vital force. The record is less tidy. Wöhler presented the result to colleagues as a striking curiosity, not a refutation; prominent chemists went on invoking vital forces for decades afterward; and vitalist explanations thinned out only gradually, as laboratory syntheses of one organic compound after another accumulated through mid-century. Taken together, these facts suggest that ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "Wöhler's contemporaries doubted that the substance he had produced from inorganic materials was in fact identical to urea."
            },
            {
              "id": "B",
              "text": "textbooks are right to treat the urea synthesis as decisive, since the chemists who continued to invoke vital forces did so for reasons unconnected to chemistry."
            },
            {
              "id": "C",
              "text": "the retreat of vitalism was a gradual affair, driven by an accumulation of syntheses rather than settled by any single experiment."
            },
            {
              "id": "D",
              "text": "vitalism would have collapsed in 1828 if Wöhler had presented his synthesis as a refutation rather than as a curiosity."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Each fact chips at the single-blow story from a different side, and together they force only the modest conclusion C draws: vitalism receded gradually, under accumulating syntheses.\n\n**The Full Solution:**\n- Wöhler himself claimed no refutation — so the experiment was not received as a decisive blow.\n- Chemists kept invoking vital forces for decades — so no blow felled the doctrine in 1828.\n- Vitalism thinned \"only gradually, as laboratory syntheses ... accumulated\" — naming the actual driver.\n- The conclusion that fits all three is gradual retreat by accumulation, exactly choice C.\n\n**Why the other choices are wrong:**\n- A: The text records no doubt about the product's identity; it questions the experiment's decisiveness, not its chemistry.\n- B: It reasserts the textbook story the three facts undermine, explaining away the holdouts with a motive the text never gives.\n- D: A speculation about presentation; the text shows persistence for decades, not a doctrine one announcement from collapse.",
          "_meta": {
            "anchor": "Friedrich Wöhler — urea synthesis and the gradual decline of vitalism; hard inference"
          }
        },
        {
          "id": 420,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "By the time an electrolytic process made aluminum abundant in the late 1880s, the metal ______ already served for decades as a showpiece more precious than silver, reserved for jewelry, medals, and banquet cutlery.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "had"
            },
            {
              "id": "B",
              "text": "has"
            },
            {
              "id": "C",
              "text": "is"
            },
            {
              "id": "D",
              "text": "have"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The sentence describes service that was already complete before a past reference point (\"by the time ... in the late 1880s\"), which calls for the past perfect: \"had already served.\"\n\n**The Full Solution:**\n- The reference point is in the past: the arrival of the electrolytic process in the late 1880s.\n- The metal's career as a showpiece happened before that point — \"already served for decades.\"\n- Past-before-past takes the past perfect, formed with \"had\": \"the metal had already served.\"\n\n**Why the other choices are wrong:**\n- B: \"Has served\" is present perfect, which connects to the present rather than to a completed past reference point.\n- C: \"Is\" cannot combine with the past participle \"served\" to express this time relationship.\n- D: \"Have\" is plural and would not agree with the singular subject \"the metal,\" besides failing to mark past-before-past.",
          "_meta": {
            "anchor": "aluminum before cheap electrolysis; past perfect"
          }
        },
        {
          "id": 418,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "The combs inside a long-abandoned honeybee nest ______ a detailed record of the colony that built them, since wax preserves traces of the pollens the bees gathered and of the brood they raised season by season.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "to hold"
            },
            {
              "id": "B",
              "text": "holds"
            },
            {
              "id": "C",
              "text": "hold"
            },
            {
              "id": "D",
              "text": "holding"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject of the sentence is the plural noun \"combs,\" so the verb must be the plural \"hold.\"\n\n**The Full Solution:**\n- Strip the intervening phrase: \"The combs ... hold a detailed record.\"\n- \"Inside a long-abandoned honeybee nest\" is a prepositional phrase; \"nest,\" the singular noun nearest the blank, is not the subject.\n- Plural subject, plural verb: \"combs hold.\"\n\n**Why the other choices are wrong:**\n- A: The infinitive \"to hold\" leaves the sentence without a main verb.\n- B: \"Holds\" is singular; it agrees with the nearby \"nest\" rather than with the subject \"combs.\"\n- D: The participle \"holding\" also leaves the sentence without a finite main verb.",
          "_meta": {
            "anchor": "honeybee comb as colony record; subject-verb agreement (plural subject with intervening phrase)"
          }
        },
        {
          "id": 417,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "Sled dogs made long-distance polar travel possible in the era before machines. Teams hauled heavily loaded sledges across ice that no vehicle of the time could ______ their thick double coats let them sleep in the open at temperatures that confined their drivers to shelter.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "cross, their"
            },
            {
              "id": "B",
              "text": "cross. Their"
            },
            {
              "id": "C",
              "text": "cross their"
            },
            {
              "id": "D",
              "text": "cross and, their"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** \"Teams hauled ... could cross\" and \"their thick double coats let them sleep ...\" are both independent clauses, and a period is a standard way to separate them.\n\n**The Full Solution:**\n- Clause one: \"Teams hauled heavily loaded sledges across ice that no vehicle of the time could cross.\"\n- Clause two: \"Their thick double coats let them sleep in the open ...\" — a complete sentence with its own subject and verb.\n- Two independent clauses need a period, a semicolon, or a comma plus a coordinating conjunction. Only choice B provides one of these.\n\n**Why the other choices are wrong:**\n- A: A comma alone between two independent clauses creates a comma splice.\n- C: No punctuation at all fuses the two clauses into a run-on.\n- D: \"And\" could join the clauses, but only with a comma before it; a comma after it is not a conventional joining.",
          "_meta": {
            "anchor": "sled dogs in polar travel; period between independent clauses"
          }
        },
        {
          "id": 421,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "The pigment ultramarine — ground from lapis lazuli that reached European scriptoria along trade routes beginning in the mountain mines of ______ was so costly that illuminators reserved it for a manuscript's most honored pages: full-page miniatures and the robes of central figures.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "Afghanistan:"
            },
            {
              "id": "B",
              "text": "Afghanistan —"
            },
            {
              "id": "C",
              "text": "Afghanistan,"
            },
            {
              "id": "D",
              "text": "Afghanistan"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The interrupting phrase that begins with the dash after \"ultramarine\" must be closed by a matching dash before the sentence resumes at \"was so costly.\"\n\n**The Full Solution:**\n- The frame sentence is \"The pigment ultramarine ... was so costly that ...\"\n- \"— ground from lapis lazuli ... Afghanistan\" is an interruption opened with an em dash.\n- Paired punctuation must match: an interruption opened with a dash is closed with a dash.\n\n**Why the other choices are wrong:**\n- A: A colon cannot close an interruption that a dash opened, and nothing after the blank is being introduced as a list or explanation.\n- C: A comma mismatches the opening dash, leaving the pair unbalanced.\n- D: With no punctuation, the interruption never closes, and the frame sentence's subject and verb collide with the modifier.",
          "_meta": {
            "anchor": "ultramarine in manuscript illumination; paired em-dashes"
          }
        },
        {
          "id": 422,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "Each of the cameras ringing the upper deck of a modern arena ______ the positions of the players and the ball dozens of times every second, producing the raw feed from which analysts later reconstruct every play.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "record"
            },
            {
              "id": "B",
              "text": "are recording"
            },
            {
              "id": "C",
              "text": "have recorded"
            },
            {
              "id": "D",
              "text": "records"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The subject is the singular pronoun \"each,\" so the verb must be the singular \"records.\"\n\n**The Full Solution:**\n- Strip the prepositional phrase: \"Each ... records the positions ...\"\n- \"Of the cameras ringing the upper deck of a modern arena\" modifies \"each\" but does not change its number.\n- \"Each\" is grammatically singular even when it points at many cameras, so it takes \"records.\"\n\n**Why the other choices are wrong:**\n- A: \"Record\" is plural, agreeing with the nearby \"cameras\" rather than with the subject \"each.\"\n- B: \"Are recording\" is likewise plural and mismatches the singular subject.\n- C: \"Have recorded\" is plural, and its completed aspect also clashes with the ongoing \"dozens of times every second.\"",
          "_meta": {
            "anchor": "player-tracking cameras; 'each' + singular verb"
          }
        },
        {
          "id": 419,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "From its stations along the northern plains of India, the Great Trigonometrical Survey sighted and computed the heights of some of the world's highest ______ Kangchenjunga, for a time believed the tallest of all; Dhaulagiri, whose height had been argued over for decades; and the distant summit the survey's computers listed simply as Peak XV.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "peaks, including"
            },
            {
              "id": "B",
              "text": "peaks. Including"
            },
            {
              "id": "C",
              "text": "peaks; including"
            },
            {
              "id": "D",
              "text": "peaks: including"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** \"Including Kangchenjunga ... Dhaulagiri ... and ... Peak XV\" is a modifying phrase attached to \"peaks,\" and a comma is the conventional way to attach it.\n\n**The Full Solution:**\n- The main clause ends at \"some of the world's highest peaks.\"\n- What follows is not a new clause but an including-phrase that lists examples of those peaks (the items separated by semicolons because they carry internal commas).\n- A phrase of this kind is joined to its noun with a comma: \"peaks, including ...\"\n\n**Why the other choices are wrong:**\n- B: A period strands the including-phrase as a fragment with no subject or verb.\n- C: A semicolon must join two independent clauses; \"including ...\" is not a clause.\n- D: A colon could introduce the list directly (\"peaks: Kangchenjunga ...\"), but placing one before \"including\" makes the word redundant and is not conventional.",
          "_meta": {
            "anchor": "Great Trigonometrical Survey of India; comma before an including-phrase"
          }
        },
        {
          "id": 423,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Before anyone had traveled far inland, many geographers pictured the Antarctic interior as a single featureless sheet of ice, level from coast to coast. ______ the first sledging parties to push toward the pole found themselves climbing: glaciers riven by crevasses led up to a high polar plateau, and whole mountain ranges emerged where the maps showed nothing at all.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "In addition,"
            },
            {
              "id": "B",
              "text": "For example,"
            },
            {
              "id": "C",
              "text": "However,"
            },
            {
              "id": "D",
              "text": "Therefore,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The first sentence states an expectation — a level, featureless interior — and the second reports discoveries that contradict it, so a contrast transition is needed.\n\n**The Full Solution:**\n- Sentence one: geographers pictured a flat sheet of ice from coast to coast.\n- Sentence two: sledging parties found climbing, crevassed glaciers, a high plateau, and uncharted mountain ranges.\n- Reality overturning expectation is the classic site for \"However.\"\n\n**Why the other choices are wrong:**\n- A: \"In addition\" would stack the discoveries on top of the expectation as if they agreed; they conflict.\n- B: \"For example\" would make the mountainous interior an illustration of the featureless one — a contradiction.\n- D: \"Therefore\" would present the discoveries as a consequence of the geographers' picture, but the picture predicted the opposite.",
          "_meta": {
            "anchor": "Antarctic interior — expectation versus sledging discoveries; contrast transition"
          }
        },
        {
          "id": 424,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Medieval scribes had more than one way to repair a slip of the pen. A copyist who caught an error early could scrape the dried ink from the parchment with a knife and write the passage afresh. ______ a corrector could leave the faulty word in place and set a row of dots beneath its letters, a signal to readers that the word should be passed over.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Alternatively,"
            },
            {
              "id": "B",
              "text": "Therefore,"
            },
            {
              "id": "C",
              "text": "For example,"
            },
            {
              "id": "D",
              "text": "Similarly,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage promises \"more than one way\" to fix an error and then gives two: scraping the ink away, or dotting the word for readers to skip. The second is an alternative to the first.\n\n**The Full Solution:**\n- The opening sentence frames a menu of options.\n- Option one: physical erasure with a knife.\n- Option two: leaving the word but marking it to be passed over — a different route to the same end, which \"Alternatively\" introduces.\n\n**Why the other choices are wrong:**\n- B: \"Therefore\" would make the dotting a consequence of the scraping; the two are independent options.\n- C: \"For example\" would make dotting an instance of scraping, but it is a different technique altogether.\n- D: \"Similarly\" notes likeness of manner, yet the two methods work in opposite ways — one removes the word, the other preserves and cancels it.",
          "_meta": {
            "anchor": "scribal error correction — erasure versus expunction; alternative transition"
          }
        },
        {
          "id": 425,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "In the 1840s, Matthew Fontaine Maury of the United States Naval Observatory began extracting wind and current observations from thousands of old ships' logbooks and charting the averages by season and route. Captains who followed the tracks his charts recommended cut days, sometimes weeks, from long passages. ______ shipmasters by the hundreds accepted Maury's price for the charts: they agreed to keep standardized logs of their own voyages and send them to the observatory, feeding the next edition.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Nevertheless,"
            },
            {
              "id": "B",
              "text": "For instance,"
            },
            {
              "id": "C",
              "text": "Consequently,"
            },
            {
              "id": "D",
              "text": "Likewise,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The charts demonstrably shortened passages; the shipmasters' willingness to pay Maury's price in logbooks follows from that demonstrated value. The relation is cause and effect.\n\n**The Full Solution:**\n- Cause: captains using the charts saved days or weeks on long passages.\n- Effect: hundreds of shipmasters accepted the charts' price — keeping and submitting standardized logs.\n- \"Consequently\" marks the second sentence as the result of the first.\n\n**Why the other choices are wrong:**\n- A: \"Nevertheless\" would signal the shipmasters acting against the charts' proven value, not because of it.\n- B: \"For instance\" would make the mass adoption an example of the time savings, but it is a response to them.\n- D: \"Likewise\" would claim the two sentences describe parallel cases, when the second grows out of the first.",
          "_meta": {
            "anchor": "Matthew Fontaine Maury — wind and current charts; result transition"
          }
        },
        {
          "id": 426,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Alice Ball (1892-1916) was an American chemist at the College of Hawaii.",
              "In her era, the standard treatment for Hansen's disease (leprosy) was oil from the chaulmoogra tree.",
              "The oil was too thick to inject, and swallowing it caused nausea so severe that many patients could not continue treatment.",
              "In 1915 Ball developed a method for converting the oil's active compounds into a water-soluble, injectable form.",
              "Injections prepared by her method remained the leading treatment for the disease until the 1940s."
            ],
            "goal": "The student wants to introduce Ball's main scientific contribution to an audience unfamiliar with her work."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Alice Ball was an American chemist who worked at the College of Hawaii in the early twentieth century."
            },
            {
              "id": "B",
              "text": "Before Ball's method existed, chaulmoogra oil was too thick to inject and so nauseating that many patients could not keep taking it."
            },
            {
              "id": "C",
              "text": "In 1915, a method was developed for converting the active compounds of chaulmoogra oil into a water-soluble, injectable form, and the resulting injections remained the leading treatment for Hansen's disease until the 1940s."
            },
            {
              "id": "D",
              "text": "The American chemist Alice Ball developed a method that converted chaulmoogra oil, then the standard treatment for Hansen's disease, into an injectable form that remained the leading therapy for decades."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The goal demands two things at once — identify Ball for unfamiliar readers and state her main contribution — and D alone does both.\n\n**The Full Solution:**\n- Identification: \"The American chemist Alice Ball\" tells a newcomer who she was.\n- Contribution: converting the era's standard treatment into an injectable form, with its significance (\"the leading therapy for decades\").\n- One sentence, both requirements met.\n\n**Why the other choices are wrong:**\n- A: It identifies Ball but never says what she contributed.\n- B: It describes the problem her method solved without saying that she solved it or how.\n- C: It reports the achievement but strips out Ball herself, failing to introduce her to readers who do not know her.",
          "_meta": {
            "anchor": "Alice Ball — injectable chaulmoogra treatment; introduce-contribution goal"
          }
        },
        {
          "id": 427,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Batting average and on-base percentage are statistics used to evaluate hitters in baseball.",
              "Batting average is the share of a hitter's official at-bats that end in hits.",
              "A walk does not count as an official at-bat, so walks have no effect on a hitter's batting average.",
              "On-base percentage is the share of all plate appearances in which a hitter reaches base, whether by a hit, a walk, or being hit by a pitch.",
              "Two hitters with equal batting averages can have very different on-base percentages if one draws many more walks."
            ],
            "goal": "The student wants to emphasize a difference between batting average and on-base percentage."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Batting average and on-base percentage are both statistics that analysts use to evaluate the performance of hitters in baseball."
            },
            {
              "id": "B",
              "text": "Unlike batting average, which ignores walks entirely, on-base percentage credits a hitter for every plate appearance that ends with the hitter reaching base, walks included."
            },
            {
              "id": "C",
              "text": "Batting average is the share of a hitter's official at-bats that end in hits, and a walk does not count as an official at-bat."
            },
            {
              "id": "D",
              "text": "Because two hitters with equal batting averages can sometimes differ widely in on-base percentage, teams should rely on neither statistic alone when evaluating the performance of hitters."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The goal is to emphasize a difference, and B places the two statistics on either side of an explicit contrast: walks ignored by one, counted by the other.\n\n**The Full Solution:**\n- The notes locate the difference in walks: excluded from batting average (bullet 3), included in on-base percentage (bullet 4).\n- B frames exactly that contrast with \"Unlike batting average ...\" and names both statistics' treatment of walks.\n- Contrastive framing is what an emphasize-a-difference goal requires.\n\n**Why the other choices are wrong:**\n- A: It emphasizes what the statistics share, not how they differ.\n- C: It defines batting average alone; with one statistic on stage there is no difference to see.\n- D: It draws a recommendation about using the statistics rather than emphasizing how they differ, a conclusion the notes do not support.",
          "_meta": {
            "anchor": "baseball statistics — batting average versus on-base percentage; difference goal"
          }
        }
      ]
    },
    {
      id: "module-2",
      title: "Module 2",
      timeLimit: 32,
      questions: [
        {
          "id": 428,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "A promising new crop variety cannot be released on the strength of one good season. Because yield is shaped by weather, soil, and disease pressures that differ from year to year and field to field, breeders must ______ a variety's performance in trials sown across many sites and seasons before offering its seed to farmers.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "imagine"
            },
            {
              "id": "B",
              "text": "overstate"
            },
            {
              "id": "C",
              "text": "recall"
            },
            {
              "id": "D",
              "text": "confirm"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** One good season is insufficient evidence, so what the multi-site, multi-season trials provide is verification — the breeders confirm the variety's performance.\n\n**The Full Solution:**\n- The problem: a single season's result may reflect weather, soil, or disease luck rather than the variety.\n- The remedy: trials \"across many sites and seasons\" — repeated testing under varied conditions.\n- Repeated testing to establish that a result holds is exactly what \"confirm\" means.\n\n**Why the other choices are wrong:**\n- A: \"Imagine\" involves no trials at all; the sentence describes empirical testing.\n- B: \"Overstate\" means to exaggerate — the opposite of the caution the sentence describes.\n- C: \"Recall\" means to remember past results, but the trials generate new evidence.",
          "_meta": {
            "anchor": "crop variety trials — multi-site confirmation before release"
          }
        },
        {
          "id": 430,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Along one stretch of a desert river, gauges record substantially less water flowing out at the downstream end than enters upstream, with no visible channel carrying the difference away. Hydrologists do not treat the gap as evidence of waste or error but as a quantity to ______ with the rest of the basin's water budget: the missing flow, seeping down through the streambed, reappears in the ledger as recharge to the aquifer below.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "equate"
            },
            {
              "id": "B",
              "text": "discard"
            },
            {
              "id": "C",
              "text": "inflate"
            },
            {
              "id": "D",
              "text": "reconcile"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The gap between gauges looks like a contradiction in the accounts, and the hydrologists' move — tracing the missing flow to aquifer recharge — brings the figures into agreement. \"Reconcile\" is the word for squaring an apparent discrepancy with the rest of an account.\n\n**The Full Solution:**\n- The setup is bookkeeping language: a \"water budget,\" a \"ledger,\" an unexplained shortfall.\n- The resolution keeps the missing water in the accounts by entering it as recharge below the streambed.\n- Making the shortfall consistent with the budget is reconciliation, not rejection.\n\n**Why the other choices are wrong:**\n- A: \"Equate\" would assert the gap equals the budget itself, a claim that makes no sense here.\n- B: \"Discard\" is precisely what the hydrologists refuse to do with the discrepancy.\n- C: \"Inflate\" means to exaggerate the quantity, not to account for it.",
          "_meta": {
            "anchor": "losing streams and aquifer recharge; hard words-in-context"
          }
        },
        {
          "id": 429,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "When opera companies in the 1980s began projecting translations of the libretto onto a screen above the stage, several prominent directors objected. A strip of glowing text, they argued, would ______ the audience's attention, pulling eyes upward at exactly the moments when a singer's face and body carried the drama.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "reward"
            },
            {
              "id": "B",
              "text": "divert"
            },
            {
              "id": "C",
              "text": "sharpen"
            },
            {
              "id": "D",
              "text": "sustain"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The directors' fear is attention pulled away from the stage — \"pulling eyes upward\" — and \"divert\" means precisely to draw something off its intended course.\n\n**The Full Solution:**\n- The screen sits above the stage; the drama lives in the singer's face and body below.\n- The objection is that the glowing text competes for the audience's gaze at the crucial moments.\n- \"Divert the audience's attention\" names that redirection exactly.\n\n**Why the other choices are wrong:**\n- A: \"Reward\" would make the text a benefit to attention, not a threat to it.\n- C: \"Sharpen\" means to focus attention more keenly — the opposite of the directors' worry.\n- D: \"Sustain\" means to keep attention going, but the objection is about where attention goes, not whether it lasts.",
          "_meta": {
            "anchor": "opera supertitles controversy — attention drawn from the stage"
          }
        },
        {
          "id": 431,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "passage": "Written around 1400, Cennino Cennini's handbook for painters ______ the practices of the workshop in exacting detail — how to season a poplar panel, how many coats of gesso to lay and how thin, how long to mull each pigment — setting down in writing procedures that masters had previously handed to apprentices only by demonstration.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "codifies"
            },
            {
              "id": "B",
              "text": "embellishes"
            },
            {
              "id": "C",
              "text": "disputes"
            },
            {
              "id": "D",
              "text": "predates"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The handbook takes practices that lived only in demonstration and sets them down systematically in writing — which is what \"codifies\" means.\n\n**The Full Solution:**\n- The content: workshop procedures, given \"in exacting detail\" and item by item.\n- The transformation: from knowledge \"handed to apprentices only by demonstration\" to procedures fixed in a written text.\n- Organizing practice into systematic written form is codification.\n\n**Why the other choices are wrong:**\n- B: \"Embellishes\" means to decorate or exaggerate, but exacting detail is the opposite of ornament.\n- C: \"Disputes\" would set the handbook against workshop practice, yet it records that practice faithfully.\n- D: \"Predates\" concerns chronology only, and the handbook follows the practices it describes rather than preceding them.",
          "_meta": {
            "anchor": "Cennino Cennini — workshop practice codified in writing; hard words-in-context"
          }
        },
        {
          "id": 432,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "When governments organized radio licensing in the early 1920s, commercial and military services claimed the long wavelengths, which were universally thought best for covering distance. Amateur operators were shunted onto wavelengths shorter than 200 meters, a band regarded as nearly worthless. Transmitting from attics and garden sheds, the amateurs then discovered what the experts had missed: short waves, rebounding between the upper atmosphere and the ground, could leap oceans on a few watts of power. Within a few years, transatlantic amateur contacts had become routine, and the services that had dismissed the short waves were scrambling to reclaim them.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To explain the physical mechanism that allows short radio waves to travel far beyond the horizon."
            },
            {
              "id": "B",
              "text": "To argue that the governments organizing radio licensing in the 1920s should have reserved the long wavelengths for amateur operators rather than for commercial and military services."
            },
            {
              "id": "C",
              "text": "To describe the homemade equipment that amateur radio operators of the 1920s assembled in their attics and garden sheds."
            },
            {
              "id": "D",
              "text": "To recount how operators confined to wavelengths considered worthless discovered those wavelengths' extraordinary reach, upending expert opinion."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text is a narrative of reversal: amateurs pushed onto a dismissed band, the discovery that the band could span oceans, and the experts scrambling back. Choice D names that arc.\n\n**The Full Solution:**\n- Setup: the valued long wavelengths go to established services; amateurs get the \"nearly worthless\" short waves.\n- Turn: the amateurs find that short waves leap oceans on little power.\n- Consequence: expert opinion is overturned and the services want the band back. The purpose is to recount that story.\n\n**Why the other choices are wrong:**\n- A: The rebounding mechanism gets one clause; it serves the story rather than being the point.\n- B: The text passes no judgment on how licensing should have been arranged.\n- C: Attics and sheds set a scene; no equipment is described.",
          "_meta": {
            "anchor": "amateur radio and the discovery of shortwave propagation"
          }
        },
        {
          "id": 433,
          "type": "multiple-choice",
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "The following text is from Willa Cather's 1913 novel *O Pioneers!*.\n\nOne January day, thirty years ago, the little town of Hanover, anchored on a windy Nebraska tableland, was trying not to be blown away. A mist of fine snowflakes was curling and eddying about the cluster of low drab buildings huddled on the gray prairie, under a gray sky. The dwelling-houses were set about haphazard on the tough prairie sod; some of them looked as if they had been moved in overnight, and others as if they were straying off by themselves, headed straight for the open plain. None of them had any appearance of permanence, and the howling wind blew under them as well as over them.",
          "question": "Which choice best describes what is happening in the text?",
          "choices": [
            {
              "id": "A",
              "text": "The narrator recalls a conversation with a longtime resident about how a prairie town was founded."
            },
            {
              "id": "B",
              "text": "The narrator pictures a small prairie town on a winter day, its scattered buildings seeming barely fixed in place against the wind."
            },
            {
              "id": "C",
              "text": "The narrator urges the residents of a prairie town to rebuild their scattered houses on more sheltered ground before the winter storms arrive."
            },
            {
              "id": "D",
              "text": "The narrator gives a factual history of how a prairie town's buildings were put up over the years."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text is a scene: a town on a windy tableland in January, snow eddying around huddled buildings that look temporary — \"trying not to be blown away.\"\n\n**The Full Solution:**\n- Every sentence describes the town's appearance on this one winter day: the snowfall, the gray prairie and sky, the haphazard houses.\n- The controlling impression is impermanence — houses that look moved in overnight or straying toward the plain, wind blowing under as well as over.\n- Choice B captures both the scene and that impression.\n\n**Why the other choices are wrong:**\n- A: No conversation occurs and no resident appears; the narrator describes unaided.\n- C: The narrator addresses no one and urges nothing; the text observes rather than argues.\n- D: The town's construction history is never given — the houses only look \"as if\" they had been moved in overnight.",
          "_meta": {
            "anchor": "Willa Cather — O Pioneers! (1913), opening scene; genuine public-domain excerpt",
            "quoteVerify": true,
            "source": "Willa Cather, O Pioneers!, Part I, Chapter I (1913); text verified against Project Gutenberg eBook #24"
          }
        },
        {
          "id": 434,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "passage": "Maize farmers in East Africa contend with two entwined pests: stemborer moths, whose larvae hollow out the growing stalks, and striga, a parasitic weed that fastens onto maize roots. The entomologist Zeyaur Khan and his colleagues developed a counterintuitive remedy called push-pull: the fodder legume desmodium is sown between the maize rows, and napier grass is planted as a border around the field. __Desmodium releases volatile compounds that repel egg-laying stemborer moths, while the napier grass at the field's edge emits odors that attract them, drawing the infestation away from the crop.__ Desmodium's roots, meanwhile, induce striga seeds to germinate before they can attach, so the parasite exhausts itself in the soil. What looks like folk gardening is, in mechanism, applied chemical ecology.",
          "question": "Which choice best describes the function of the underlined sentence in the text as a whole?",
          "choices": [
            {
              "id": "A",
              "text": "It supplies the chemical mechanism behind the planting arrangement, grounding the passage's closing claim that the method is applied science rather than folk practice."
            },
            {
              "id": "B",
              "text": "It concedes that the push-pull arrangement fails against one of the two pests the passage says farmers must contend with."
            },
            {
              "id": "C",
              "text": "It introduces a rival explanation of the method's success that the passage's final sentence rejects."
            },
            {
              "id": "D",
              "text": "It reports the results of a field trial comparing yields in push-pull plots with yields in conventionally planted fields."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The underlined sentence explains why the planting arrangement works — repellent volatiles inside the field, attractant odors at its edge — and that mechanism is what licenses the final sentence's verdict: applied chemical ecology, not folk gardening.\n\n**The Full Solution:**\n- Before the underline: the arrangement is described but unexplained, and called \"counterintuitive.\"\n- The underlined sentence converts arrangement into mechanism: push (desmodium repels) and pull (napier grass attracts).\n- The closing sentence generalizes from exactly this — the method's scientific character — so the underline is its foundation.\n\n**Why the other choices are wrong:**\n- B: The sentence shows the method working against stemborers; the striga mechanism follows in the next sentence. Nothing is conceded.\n- C: It gives the passage's own explanation, not a rival one, and the final sentence embraces it.\n- D: No trial, plots, or yields appear anywhere in the passage.",
          "_meta": {
            "anchor": "Zeyaur Khan — push-pull intercropping; mechanism sentence grounding the closing claim"
          }
        },
        {
          "id": 435,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "passages": [
            {
              "label": "Text 1",
              "text": "Studying transparent starfish larvae in the 1880s, the zoologist Élie Metchnikoff watched wandering cells converge on a splinter he had inserted and engulf foreign material around it. From such observations he built a general theory of immunity: the body's defense is waged by devouring cells, which he named phagocytes, that seek out, swallow, and digest invading microbes. Wherever protection against disease appears, Metchnikoff argued, these cells are its principal agents."
            },
            {
              "label": "Text 2",
              "text": "In 1890, Emil von Behring and Shibasaburō Kitasato reported that animals exposed to weakened diphtheria or tetanus toxins became resistant to the diseases — and, more striking, that the resistance could be transferred. Serum drawn from an immunized animal, a fluid containing no living cells at all, protected the animals that received it. The blood's cell-free portion, the two argued, must itself carry substances that disarm a toxin, a protection no devouring cell need provide."
            }
          ],
          "question": "Based on the texts, how would Behring and Kitasato (Text 2) most likely respond to the argument presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "Metchnikoff misinterpreted his observations, since the wandering cells he watched were clearing debris rather than defending the larva against infection."
            },
            {
              "id": "B",
              "text": "Immunity to diphtheria and tetanus may well depend on substances carried in serum, but immunity to most other diseases must still arise from the action of devouring cells."
            },
            {
              "id": "C",
              "text": "The starfish experiments should be repeated in animals that can be immunized, so that the contribution of the wandering cells can be measured directly."
            },
            {
              "id": "D",
              "text": "Phagocytes may well consume invading microbes, but immunity that transfers in cell-free serum shows that the body's defense cannot rest on devouring cells alone."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** Behring and Kitasato's finding targets the reach of Metchnikoff's claim, not his observations: protection that travels in a fluid \"containing no living cells at all\" cannot be the work of devouring cells, so phagocytes cannot be the whole of immunity.\n\n**The Full Solution:**\n- Text 1's argument: wherever protection appears, phagocytes are its principal agents.\n- Text 2's evidence: immunity transferred by cell-free serum — \"a protection no devouring cell need provide.\"\n- The measured response grants what phagocytes may do while denying that defense rests on them alone — exactly choice D.\n\n**Why the other choices are wrong:**\n- A: Nothing in Text 2 questions what Metchnikoff saw; the challenge is to his generalization.\n- B: It reverses the pair's position — they generalize from serum protection rather than confining it to two diseases.\n- C: Text 2 proposes no repetition of the starfish work; its argument stands on the transfer experiments.",
          "_meta": {
            "anchor": "cross-text — Metchnikoff (phagocytes) versus Behring and Kitasato (cell-free serum antitoxin); immunology history"
          }
        },
        {
          "id": 436,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "A terminal lake has no outlet to the sea; its level is set wholly by the balance between the water flowing in and the water evaporating from its surface. When one large terminal lake in the arid West fell to record lows, drought led most public discussion of the decline. Hydrologists who reconstructed a century of the basin's water budget reached a different accounting. Precipitation over the period swings widely but shows no sustained decline. What has changed steadily is the share of the rivers' flow withdrawn for irrigation and cities before it ever reaches the lake. In wet years the withdrawals are masked; in dry years they are laid bare. On the hydrologists' ledger, the lake is shrinking chiefly because its inflow is being spent upstream.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Precipitation in the basin has declined so steadily over the past century that the lake can no longer be sustained at its former level."
            },
            {
              "id": "B",
              "text": "Terminal lakes are unusually sensitive to drought because evaporation is the only way water leaves them."
            },
            {
              "id": "C",
              "text": "Although drought dominates public discussion, the basin's water budget indicates that the lake is shrinking mainly because so much of its inflow is diverted before reaching it."
            },
            {
              "id": "D",
              "text": "Wet years and dry years alternate so unpredictably in the basin that no single cause of the lake's decline can be identified."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The text sets the popular explanation (drought) against the hydrologists' accounting (steadily growing upstream withdrawals) and sides with the accounting — which is what C states.\n\n**The Full Solution:**\n- The public story: drought \"led most public discussion of the decline.\"\n- The evidence: precipitation swings but does not decline; withdrawals for irrigation and cities have grown steadily.\n- The verdict: \"the lake is shrinking chiefly because its inflow is being spent upstream.\" C compresses the contrast and the conclusion.\n\n**Why the other choices are wrong:**\n- A: It contradicts the text, which says precipitation \"shows no sustained decline.\"\n- B: A general fact about terminal lakes from the opening sentence — background, not the point.\n- D: The text identifies a chief cause; it does not throw up its hands at variability.",
          "_meta": {
            "anchor": "terminal-lake water budget — upstream diversion versus drought"
          }
        },
        {
          "id": 443,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "In the 1920s the Russian botanist Nikolai Vavilov led collecting expeditions on five continents, gathering seeds of wheat, barley, and dozens of other crops. He found their variation strikingly uneven: for each crop, a few regions held an extravagant profusion of distinct local forms, while whole continents elsewhere grew only a handful. Two principles, Vavilov reasoned, lay behind the pattern. Varieties accumulate where a crop is grown longest, as centuries of cultivation, mutation, and selection add form after form; and when farmers carry a crop into new territory, they take only a narrow sample of what exists. If both principles hold, then for any crop, the region showing the greatest concentration of distinct varieties is likely to be ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "the region where the crop has been cultivated longest, and so the strongest candidate for the place where it was first domesticated."
            },
            {
              "id": "B",
              "text": "the region whose farmers imported the most varieties from the surrounding territories over the centuries."
            },
            {
              "id": "C",
              "text": "the region with the climate best suited to the crop's wild ancestors, wherever domestication itself took place."
            },
            {
              "id": "D",
              "text": "the region where the crop's yield per acre is highest under traditional farming methods."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The two principles jointly point one way: diversity accumulates with time in place, and migration carries diversity away in narrow samples. Peak diversity therefore marks the longest cultivation — and the longest cultivation is where domestication most plausibly began.\n\n**The Full Solution:**\n- Principle one makes diversity a clock: the longer a crop grows in a region, the more forms accumulate there.\n- Principle two rules out the rival reading: newly arrived populations are impoverished samples, so a diversity peak cannot mark a recent import.\n- The region of greatest diversity is thus the oldest home of the crop, and the best candidate for its origin — choice A, and nothing more.\n\n**Why the other choices are wrong:**\n- B: It inverts principle two — importation brings narrow samples, not profusion.\n- C: The principles concern time under cultivation, not climatic suitability; the conclusion cannot suddenly be about climate.\n- D: Yield appears nowhere in the premises and has no logical link to varietal counts.",
          "_meta": {
            "anchor": "Nikolai Vavilov — centers of crop diversity as centers of origin; hard inference"
          }
        },
        {
          "id": 437,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "The court theater at Drottningholm, outside Stockholm, still possesses its eighteenth-century stage machinery in working order, and performances there still use it. Scene changes depend on a system of shafts, ropes, and rolling carriages installed beneath the stage. When stagehands turn the great capstan below the floor, every carriage moves at once: each painted flat in view slides away into concealment as a fresh one slides out to replace it, and the whole scene is transformed in a few seconds, in full sight of the audience. Eighteenth-century stagecraft treated such visible transformation not as a failure of illusion but as a spectacle in its own right.",
          "question": "According to the text, what happens when stagehands turn the capstan beneath the theater's stage?",
          "choices": [
            {
              "id": "A",
              "text": "The stage floor rises slowly into full view so that the audience can watch the eighteenth-century machinery at work beneath it."
            },
            {
              "id": "B",
              "text": "A curtain falls to conceal the stage while stagehands carry new scenery into position."
            },
            {
              "id": "C",
              "text": "All of the painted flats in view are exchanged for fresh ones at once, transforming the scene within seconds."
            },
            {
              "id": "D",
              "text": "Each painted flat is replaced one at a time, in an order fixed by the machinery's design."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The text says that when the capstan turns, \"every carriage moves at once,\" each visible flat slides away as a fresh one replaces it, and \"the whole scene is transformed in a few seconds.\"\n\n**The Full Solution:**\n- The capstan drives all the carriages simultaneously.\n- Each flat in view is exchanged for a replacement.\n- The transformation takes seconds — exactly what choice C reports.\n\n**Why the other choices are wrong:**\n- A: The machinery stays beneath the stage; nothing in the text has the floor rise or the works become visible.\n- B: The text says the change happens \"in full sight of the audience,\" with no curtain and no carrying.\n- D: \"Every carriage moves at once\" rules out one-at-a-time replacement.",
          "_meta": {
            "anchor": "Drottningholm court theater — simultaneous scene change by capstan; detail stem"
          }
        },
        {
          "id": 439,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "passage": "Winter wheat is sown in autumn, overwinters as a seedling, and flowers only after prolonged exposure to cold — a requirement called vernalization. Agronomists have hypothesized that the requirement is a safeguard keyed to local climate: by blocking flowering until a real winter has passed, it prevents a warm autumn spell from luring plants into blooming just before killing frosts arrive.",
          "question": "Which finding, if true, would most directly support the agronomists' hypothesis?",
          "choices": [
            {
              "id": "A",
              "text": "Varieties bred for centuries in regions with long, severe winters demand longer cold exposure before flowering than varieties from regions where winters are short and mild."
            },
            {
              "id": "B",
              "text": "Spring wheat, which is sown after the last frost of the season, flowers without any period of cold exposure at all."
            },
            {
              "id": "C",
              "text": "Vernalized seedlings raised in heated greenhouses flower at the same rate whether their light comes from the sun or from lamps."
            },
            {
              "id": "D",
              "text": "Varieties bred in the regions with the longest, harshest winters flower after the briefest cold exposure, while varieties from the mildest regions turn out to demand the most prolonged exposure of all."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** If the cold requirement is a safeguard \"keyed to local climate,\" it should be calibrated to the winters a variety actually faces — longer and harsher winters demanding a longer proof of winter before flowering. Choice A reports exactly that calibration.\n\n**The Full Solution:**\n- The hypothesis predicts a match between requirement and risk: flowering should stay blocked for as long as killing frosts remain possible locally.\n- Where winters are long and severe, a brief chill is no proof that winter has passed; a long requirement is protective. Where winters are short and mild, a long requirement would only cost growing time.\n- A gradient in which each variety's requirement mirrors its home climate is the safeguard hypothesis observed in the field.\n\n**Why the other choices are wrong:**\n- B: Spring wheat never faces the autumn-sowing hazard, so its lack of a requirement neither confirms nor tests the safeguard account.\n- C: The light source is irrelevant to whether cold exposure is calibrated to frost risk.\n- D: This is the reverse gradient — it would count against the hypothesis, not for it.",
          "_meta": {
            "anchor": "vernalization as a climate-keyed safeguard; finding-if-true form"
          }
        },
        {
          "id": 438,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "passage": "Smallpox inoculation reached England not through its medical colleges but through an ambassador's household. In Constantinople in 1717, Lady Mary Wortley Montagu, who had survived smallpox herself, watched Ottoman practitioners protect children by engrafting: introducing a trace of matter from a mild case into a scratch on the arm, producing a brief illness that left lasting protection. She had the procedure performed on her own son, and after returning to London she promoted it among physicians and at court, arranging for her young daughter to be inoculated before witnesses during the epidemic of 1721. The practice took hold in England decades before vaccination was introduced.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Ottoman practitioners kept the technique of engrafting secret from European visitors until the eighteenth century."
            },
            {
              "id": "B",
              "text": "Montagu's advocacy of inoculation was resisted by English physicians because she lacked formal medical training."
            },
            {
              "id": "C",
              "text": "Inoculation as practiced in Constantinople produced a brief illness followed by lasting protection, whereas the vaccination introduced decades later carried no risk of any illness at all."
            },
            {
              "id": "D",
              "text": "Montagu encountered inoculation in Constantinople and, by personal example and public advocacy, helped establish the practice in England long before vaccination existed."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text's through-line is transmission: Montagu sees engrafting in Constantinople, applies it in her own family, promotes it in London, and the practice takes hold in England decades before vaccination. D traces exactly that arc.\n\n**The Full Solution:**\n- The opening sentence frames the point: inoculation reached England through an ambassador's household, not the medical colleges.\n- The middle supplies the means: her son's inoculation, then her daughter's before witnesses — personal example turned public advocacy.\n- The final sentence gives the outcome D restates: the practice established well before vaccination.\n\n**Why the other choices are wrong:**\n- A: The practitioners let Montagu watch; no secrecy is described.\n- B: The text never says physicians resisted her or mentions her training.\n- C: It elevates a detail into a comparison the text never makes — nothing is said about vaccination's risks.",
          "_meta": {
            "anchor": "Lady Mary Wortley Montagu — inoculation's route from Constantinople to England"
          }
        },
        {
          "id": 441,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "A media historian claims that the American broadcasting boom of the 1920s had two distinct phases: the number of licensed stations exploded within a single year and then stopped growing, while the audience kept expanding steadily, with the share of households owning a radio rising throughout the decade.",
          "questionTable": {
            "type": "table",
            "caption": "Licensed broadcast stations and household radio ownership in the United States, 1921-1930",
            "headers": [
              "Year",
              "Licensed stations",
              "Households with a radio (%)"
            ],
            "rows": [
              [
                "1921",
                "28",
                "0.5"
              ],
              [
                "1922",
                "570",
                "6"
              ],
              [
                "1924",
                "535",
                "16"
              ],
              [
                "1927",
                "681",
                "26"
              ],
              [
                "1930",
                "618",
                "46"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to support the claim?",
          "choices": [
            {
              "id": "A",
              "text": "The number of licensed stations reached its highest level in 1927, when 681 stations held licenses, and it had fallen back somewhat by 1930."
            },
            {
              "id": "B",
              "text": "The share of households with a radio grew from 0.5% in 1921 to 46% by 1930, rising in every interval shown in the table."
            },
            {
              "id": "C",
              "text": "In 1922 there were 570 licensed stations on the air, but only 6% of the nation's households owned a radio in that year."
            },
            {
              "id": "D",
              "text": "After leaping from 28 in 1921 to 570 in 1922, the number of licensed stations never rose above 681, while the share of households with a radio climbed in every interval shown, from 0.5% to 46%."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The claim describes two phases moving differently — stations exploding then plateauing, audience rising throughout — and D documents both: the one-year leap, the ceiling near 681, and the uninterrupted climb in ownership.\n\n**The Full Solution:**\n- Phase one: stations jump from 28 to 570 within a single year, then oscillate without exceeding 681 — explosion followed by plateau.\n- Phase two: household ownership rises in every interval, 0.5% to 46% — the steady audience growth.\n- Only a choice tracing both series across the decade can support the two-phase claim.\n\n**Why the other choices are wrong:**\n- A: It covers only the station plateau's peak and dip, saying nothing about the audience.\n- B: It covers only the audience and says nothing about the stations' explosive-then-flat pattern.\n- C: A single year's mismatch between stations and ownership illustrates neither trend.",
          "_meta": {
            "anchor": "1920s broadcasting boom — station plateau versus rising household ownership; original compiled table"
          }
        },
        {
          "id": 440,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "passage": "In mountain basins of the American West, winter snowpack acts as a natural reservoir, holding water that is released as meltwater through the warm months. Hydrologists summarize the reservoir each spring as the snowpack's water content measured on April 1, expressed against the long-term average. A basin manager claims that summer streamflow in one such basin tracks the April snowpack closely: thin snowpacks are followed by meager summer flows, and deep snowpacks by abundant ones.",
          "questionTable": {
            "type": "table",
            "caption": "April 1 snow water content and summer streamflow in one mountain basin (percent of long-term average)",
            "headers": [
              "Year",
              "April 1 snow water content (% of average)",
              "June-August streamflow (% of average)"
            ],
            "rows": [
              [
                "2018",
                "142",
                "128"
              ],
              [
                "2019",
                "96",
                "91"
              ],
              [
                "2020",
                "71",
                "63"
              ],
              [
                "2021",
                "118",
                "109"
              ],
              [
                "2022",
                "55",
                "48"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to support the claim?",
          "choices": [
            {
              "id": "A",
              "text": "Snow water content on April 1 ranged from a low of 55% of average in 2022 to a high of 142% of average in 2018."
            },
            {
              "id": "B",
              "text": "Summer streamflow fell below its long-term average in three of the five years shown in the table and exceeded it in the other two."
            },
            {
              "id": "C",
              "text": "The two thinnest snowpacks, 55% and 71% of average in 2022 and 2020, were followed by the two lowest summer flows, 48% and 63%, while the deepest snowpack, 142% in 2018, was followed by the highest flow, 128%."
            },
            {
              "id": "D",
              "text": "In 2019, snow water content stood at 96% of average and summer streamflow at 91% of average, the closest pairing of values in the table."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** A tracking claim needs both variables moving together across years, and C shows the correspondence at both ends of the range: thinnest snowpacks with lowest flows, deepest snowpack with highest flow.\n\n**The Full Solution:**\n- The claim pairs conditions: thin snowpack with meager flow, deep snowpack with abundant flow.\n- C matches the two low years (2022, 2020) to the two lowest flows and the high year (2018) to the highest flow.\n- Correspondence across the extremes is what demonstrates tracking.\n\n**Why the other choices are wrong:**\n- A: It reports only the snowpack's range and never mentions streamflow.\n- B: It reports only streamflow and never connects it to the snowpack.\n- D: One close pairing in a single year cannot show that the two quantities move together across years.",
          "_meta": {
            "anchor": "snowpack as natural reservoir — April snow water content and summer flow; original basin table"
          }
        },
        {
          "id": 442,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "passage": "A true fresco is painted on plaster while the plaster is still damp, so that the pigment bonds into the wall as it dries. Each morning, therefore, a plasterer laid down only as much fresh plaster as could be painted before it set — a day's patch, called a giornata. Because a patch could not be reworked once dry, the joints where one day's plaster meets the next were simply left where the work ended, and although the painter smoothed them, they remain faintly detectable on the finished wall. Since each giornata represents at most a single day's painting, a historian who maps the joints across an entire fresco can ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "estimate the minimum number of working days the painting of the fresco required."
            },
            {
              "id": "B",
              "text": "identify which passages of the fresco were painted by assistants rather than by the master."
            },
            {
              "id": "C",
              "text": "recover the full-scale preparatory drawings from which the composition was transferred."
            },
            {
              "id": "D",
              "text": "establish the exact hour of the day at which each patch of fresh plaster was laid."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** If every patch is at most one day's work, then counting the patches gives a floor on the days worked — no more, and no less, than the premises allow.\n\n**The Full Solution:**\n- Premise one: a giornata is the plaster laid for a single day's painting.\n- Premise two: the joints between giornate survive and can be mapped.\n- Mapping the joints therefore counts the patches, and the count bounds the working days from below — an estimate of the minimum, exactly choice A.\n\n**Why the other choices are wrong:**\n- B: Nothing in the text connects joints to who painted a passage; hands are never discussed.\n- C: Preparatory drawings are never mentioned, and joints record scheduling, not design.\n- D: The joints reveal that a day ended, not the clock time at which its plaster went down.",
          "_meta": {
            "anchor": "fresco giornate — day patches as a record of working days"
          }
        },
        {
          "id": 447,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "After winning Florence's 1401 competition for a set of bronze doors, the young goldsmith Lorenzo Ghiberti ______ a workshop that became the city's training ground in bronze casting; the two pairs of doors he produced there occupied him, by his own account, for nearly half a century.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "runs"
            },
            {
              "id": "B",
              "text": "is running"
            },
            {
              "id": "C",
              "text": "has run"
            },
            {
              "id": "D",
              "text": "ran"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The sentence narrates completed events in the past — a competition won in 1401, doors produced over the following decades — so the simple past \"ran\" is required.\n\n**The Full Solution:**\n- The time frame is fixed by \"After winning Florence's 1401 competition\" and by the half-century of work that followed.\n- The surrounding verbs are past: \"became,\" \"produced,\" \"occupied.\"\n- A completed action in a finished past period takes the simple past: \"Ghiberti ran a workshop.\"\n\n**Why the other choices are wrong:**\n- A: The present \"runs\" clashes with the fifteenth-century time frame and the past verbs around it.\n- B: \"Is running\" describes an action in progress now, centuries too late.\n- C: \"Has run\" links a past action to the present moment, but Ghiberti's workshop belongs entirely to the past.",
          "_meta": {
            "anchor": "Lorenzo Ghiberti — Baptistery doors workshop; simple past"
          }
        },
        {
          "id": 446,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "Rain that falls on the limestone plateau does not linger at the ______ it slips into sinkholes, threads through caverns dissolved out of the rock, and emerges days later, filtered and cold, at springs in the valleys below.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "surface, it"
            },
            {
              "id": "B",
              "text": "surface; it"
            },
            {
              "id": "C",
              "text": "surface it"
            },
            {
              "id": "D",
              "text": "surface and, it"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** \"Rain ... does not linger at the surface\" and \"it slips into sinkholes ...\" are both independent clauses, and a semicolon is a standard way to join two closely related independent clauses.\n\n**The Full Solution:**\n- Clause one is complete: \"Rain that falls on the limestone plateau does not linger at the surface.\"\n- Clause two is complete: \"it slips into sinkholes, threads through caverns ..., and emerges ... at springs.\"\n- The second clause elaborates the first, so a semicolon joins them correctly.\n\n**Why the other choices are wrong:**\n- A: A comma alone between the two independent clauses creates a comma splice.\n- C: No punctuation fuses the clauses into a run-on.\n- D: \"And\" would need a comma before it to join the clauses; a comma after it is not a conventional joining.",
          "_meta": {
            "anchor": "karst drainage; semicolon between independent clauses"
          }
        },
        {
          "id": 449,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "______ a hydrologist waded into the same bend of the river every week for eleven years, lowering a current meter at measured intervals across the channel and noting the stage, the ice, and the drift of every season in a field book that colleagues still consult.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "While gauging the river's flow by hand"
            },
            {
              "id": "B",
              "text": "Having gauged the river's flow by hand,"
            },
            {
              "id": "C",
              "text": "Gauging the river's flow by hand,"
            },
            {
              "id": "D",
              "text": "Gauging the river's flow by hand"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** An introductory present-participial phrase modifying \"a hydrologist\" must end with a comma before the main clause begins, and its tense must fit the ongoing weekly work the sentence describes.\n\n**The Full Solution:**\n- The main clause is \"a hydrologist waded into the same bend ... every week for eleven years.\"\n- \"Gauging the river's flow by hand\" describes what the wading amounted to — action simultaneous with the waded visits, so the present participle is right.\n- An introductory modifier is set off from the clause it modifies with a comma: \"Gauging the river's flow by hand, a hydrologist waded ...\"\n\n**Why the other choices are wrong:**\n- A: The subordinate \"While gauging ...\" lacks the required comma before the main clause.\n- B: \"Having gauged\" marks the gauging as finished before the waded visits began, contradicting the eleven years of simultaneous work.\n- D: The participial phrase is correct but the comma is missing, running the modifier into its clause.",
          "_meta": {
            "anchor": "stream gauging by hand; present-participial modifier; single defensible answer"
          }
        },
        {
          "id": 444,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "In a Renaissance workshop, a picture began long before any paint was mixed. Turning rough planks into a painting surface meant three stages in a fixed ______ joining and smoothing the seasoned poplar, sealing the wood with coats of glue size, and building up thin layers of gesso to be scraped and polished smooth.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "order, joining"
            },
            {
              "id": "B",
              "text": "order joining"
            },
            {
              "id": "C",
              "text": "order; joining"
            },
            {
              "id": "D",
              "text": "order: joining"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** An independent clause ends at \"a fixed order,\" and what follows is the list of the three stages — the construction a colon exists to introduce.\n\n**The Full Solution:**\n- The clause before the blank is complete: \"Turning rough planks into a painting surface meant three stages in a fixed order.\"\n- The material after the blank itemizes the promised stages: joining, sealing, building up gesso.\n- A colon after an independent clause formally introduces the list it announces.\n\n**Why the other choices are wrong:**\n- A: A comma is too weak to introduce a formal list after a complete clause and blurs where the clause ends.\n- B: With no punctuation, \"order joining\" runs the clause into the list unreadably.\n- C: A semicolon must have an independent clause on each side, and the list of stages is not a clause.",
          "_meta": {
            "anchor": "Renaissance panel preparation; colon before a list"
          }
        },
        {
          "id": 448,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "passage": "At many nineteenth-century opera houses, the waves of applause that greeted a favored singer were rarely ______ instead, they were organized in advance by the chef de claque, who seated his hired clappers throughout the hall and cued their bravos on schedule.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "spontaneous, instead"
            },
            {
              "id": "B",
              "text": "spontaneous; instead,"
            },
            {
              "id": "C",
              "text": "spontaneous, instead,"
            },
            {
              "id": "D",
              "text": "spontaneous instead"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** Two independent clauses meet at the blank, and the second begins with the conjunctive adverb \"instead\" — a joining that requires a semicolon before the adverb and a comma after it.\n\n**The Full Solution:**\n- Clause one: \"the waves of applause ... were rarely spontaneous.\"\n- Clause two: \"they were organized in advance by the chef de claque ...\"\n- A conjunctive adverb like \"instead\" cannot join clauses by itself; the pattern is \"; instead,\" — semicolon, adverb, comma.\n\n**Why the other choices are wrong:**\n- A: A comma before \"instead\" splices the clauses, and the missing comma after the adverb compounds the error.\n- C: Even with the comma after \"instead,\" the comma before it still splices two independent clauses.\n- D: No punctuation at all fuses the clauses into a run-on.",
          "_meta": {
            "anchor": "the opera claque; semicolon with conjunctive adverb"
          }
        },
        {
          "id": 445,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "passage": "The mixture of winter rye, crimson clover, and hairy vetch that many growers sow after the autumn harvest ______ several jobs at once: the rye's dense roots hold the soil against winter rains, the clover and vetch draw nitrogen from the air, and the whole stand smothers early weeds.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "perform"
            },
            {
              "id": "B",
              "text": "are performing"
            },
            {
              "id": "C",
              "text": "performs"
            },
            {
              "id": "D",
              "text": "have performed"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject is the singular noun \"mixture,\" so the verb must be the singular \"performs.\"\n\n**The Full Solution:**\n- Strip the modifiers: \"The mixture ... performs several jobs at once.\"\n- \"Of winter rye, crimson clover, and hairy vetch\" and the that-clause modify \"mixture\" without changing its number.\n- The plural nouns inside those modifiers (rye, clover, vetch, growers) are bait; the head noun is \"mixture,\" and it is singular.\n\n**Why the other choices are wrong:**\n- A: \"Perform\" is plural, agreeing with the nearby crop names instead of the subject.\n- B: \"Are performing\" is likewise plural and mismatches the singular head noun.\n- D: \"Have performed\" is plural, and its completed aspect also clashes with the ongoing jobs the colon then lists.",
          "_meta": {
            "anchor": "cover-crop mixture; subject-verb agreement (singular collective subject)"
          }
        },
        {
          "id": 452,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "In wireless telegraphy's first years, ships' operators used a jumble of company-specific distress calls, and a call sent in one firm's code might mean nothing to the nearest vessel. International agreement eventually fixed a single distress signal for use at sea worldwide. ______ an operator hearing it, whatever line he worked for, knew at once that a ship nearby was in danger and that its position would follow.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Meanwhile,"
            },
            {
              "id": "B",
              "text": "As a result,"
            },
            {
              "id": "C",
              "text": "In other words,"
            },
            {
              "id": "D",
              "text": "Likewise,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The standardized signal is a cause; instant, universal recognition of a distress call is its effect. \"As a result\" marks the final sentence as the consequence of the agreement.\n\n**The Full Solution:**\n- The problem: incompatible company codes meant a distress call could go unrecognized.\n- The change: one signal fixed internationally for all ships.\n- The outcome: any operator, on any line, understood the call immediately — a state of affairs produced by the standardization.\n\n**Why the other choices are wrong:**\n- A: \"Meanwhile\" would place the operators' comprehension alongside the agreement as a separate, simultaneous development rather than its effect.\n- C: \"In other words\" introduces a restatement, but the final sentence adds a new consequence, not a paraphrase.\n- D: \"Likewise\" claims a parallel case, and there is no second case here.",
          "_meta": {
            "anchor": "standardization of the maritime distress signal; result transition"
          }
        },
        {
          "id": 451,
          "type": "multiple-choice",
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Rows of trees planted along the edges of fields blunt the wind almost as soon as they are in the ground, and fields in their shelter hold measurably more moisture through a rainless spell. ______ the maturing rows thicken into corridors dense enough to harbor the birds and predatory insects that keep crop pests in check, so a shelterbelt's protection widens as it ages.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Nevertheless,"
            },
            {
              "id": "B",
              "text": "By contrast,"
            },
            {
              "id": "C",
              "text": "Eventually,"
            },
            {
              "id": "D",
              "text": "For instance,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The first sentence describes benefits a shelterbelt delivers from the start (blunted wind \"almost as soon as they are in the ground,\" retained moisture); the second describes a benefit that emerges only later, as the rows mature. A development that arrives after time has passed calls for a sequence transition.\n\n**The Full Solution:**\n- At planting, the tree rows already blunt wind and conserve soil moisture.\n- Only as they mature do the rows thicken into corridors that harbor birds and predatory insects.\n- The closing clause — \"protection widens as it ages\" — confirms that the relationship is temporal: the habitat benefit follows the wind benefit over time. \"Eventually\" marks that later development.\n\n**Why the other choices are wrong:**\n- A: \"Nevertheless\" would set the habitat benefit against the wind benefit, but the sentences agree.\n- B: \"By contrast\" likewise demands an opposition that is not there.\n- D: \"For instance\" would make pest control an example of the wind protection, yet it is a distinct benefit that arrives later.",
          "_meta": {
            "anchor": "shelterbelts — immediate wind protection, then maturing rows harbor pest predators; sequence transition"
          }
        },
        {
          "id": 450,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "passage": "Connoisseurs long treated a Renaissance master's name on an altarpiece as an assurance that every figure came from his own brush. The surviving commissioning contracts read differently. ______ many stipulate only that the master design the composition and paint the principal heads, expressly leaving draperies, backgrounds, and minor figures to the assistants of his shop.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Similarly,"
            },
            {
              "id": "B",
              "text": "Meanwhile,"
            },
            {
              "id": "C",
              "text": "Consequently,"
            },
            {
              "id": "D",
              "text": "In fact,"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The passage announces that the contracts \"read differently\" from the connoisseurs' assumption, and the final sentence delivers the correcting detail. \"In fact\" is the transition that introduces the reality behind a mistaken belief.\n\n**The Full Solution:**\n- Sentence one: the belief — a master's name means every figure is his.\n- Sentence two: the pivot — the documents say otherwise.\n- Sentence three: the substance of the correction — contracts assign only the design and the principal heads to the master. \"In fact\" signals precisely this corrective specification.\n\n**Why the other choices are wrong:**\n- A: \"Similarly\" would liken the contracts' contents to the belief they overturn.\n- B: \"Meanwhile\" sets two developments side by side in time; there is only one thread here.\n- C: \"Consequently\" would make the contracts' stipulations a result of their reading differently, but the sentence is explaining what they say, not what followed from it.",
          "_meta": {
            "anchor": "Renaissance workshop contracts — divided authorship; corrective transition"
          }
        },
        {
          "id": 454,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "The first transatlantic telegraph cable was completed in 1858 between Ireland and Newfoundland.",
              "Its signals were faint, and after operators drove the line with ever-higher voltages, the cable's insulation failed permanently within about a month.",
              "A second cable, laid in 1866, used a much heavier copper core and thicker insulation.",
              "For the 1866 cable, physicist William Thomson supplied a mirror galvanometer that could read minute currents, so high voltages were unnecessary.",
              "The 1866 cable operated reliably for years and carried messages many times faster than the 1858 cable had."
            ],
            "goal": "The student wants to emphasize a difference between the 1858 cable and the 1866 cable."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "The first transatlantic telegraph cable, which was completed in 1858, stretched beneath the ocean between the coasts of Ireland and Newfoundland."
            },
            {
              "id": "B",
              "text": "Whereas the 1858 cable failed within about a month as operators drove its faint signals with damaging voltages, the 1866 cable — heavier, better insulated, and read by Thomson's sensitive galvanometer — carried messages reliably for years."
            },
            {
              "id": "C",
              "text": "In 1866, a cable with a much heavier copper core and thicker insulation was laid across the Atlantic, and William Thomson supplied a mirror galvanometer that could read minute currents."
            },
            {
              "id": "D",
              "text": "The 1858 and 1866 cables together showed that messages could cross the Atlantic in minutes rather than in the weeks a ship required."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** An emphasize-a-difference goal wants the two cables set against each other, and B does it in one contrastive frame: quick failure under high voltages versus years of reliable service under a gentler design.\n\n**The Full Solution:**\n- The notes supply the contrast's two sides: the 1858 cable's month-long life and voltage-driven death (bullet 2); the 1866 cable's heavier build, sensitive receiver, and years of service (bullets 3-5).\n- B binds them with \"Whereas,\" naming both cables and the fate of each.\n- Explicit contrast of both terms is what the goal demands.\n\n**Why the other choices are wrong:**\n- A: It describes the 1858 cable alone; one cable cannot exhibit a difference.\n- C: It describes the 1866 cable alone, leaving the 1858 side of the contrast unstated.\n- D: It emphasizes what the cables jointly proved — a similarity, the opposite of the goal.",
          "_meta": {
            "anchor": "1858 versus 1866 Atlantic telegraph cables; difference goal"
          }
        },
        {
          "id": 453,
          "type": "multiple-choice",
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Claudio Monteverdi (1567-1643) was an Italian composer employed at the court of Mantua.",
              "His opera L'Orfeo, first performed in 1607, retold the Greek myth of Orpheus in music and staged drama.",
              "L'Orfeo combined sung recitation, arias, choruses, and a large, varied instrumental ensemble.",
              "A handful of earlier sung dramas existed, but none holds a place in today's repertoire.",
              "Many historians consider L'Orfeo the earliest opera still regularly staged."
            ],
            "goal": "The student wants to emphasize the historical significance of L'Orfeo."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Monteverdi's L'Orfeo, first performed before the court of Mantua in 1607, retold the ancient Greek myth of Orpheus through music and staged drama."
            },
            {
              "id": "B",
              "text": "L'Orfeo combined sung recitation, arias, choruses, and a large and notably varied ensemble of instruments."
            },
            {
              "id": "C",
              "text": "First performed in 1607, Monteverdi's L'Orfeo is considered the earliest opera still regularly staged; where its predecessors vanished from the repertoire, it endured."
            },
            {
              "id": "D",
              "text": "Claudio Monteverdi, an Italian composer who lived from 1567 to 1643, spent much of his long and productive musical career employed as a court musician by the ruling family of Mantua in northern Italy."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Historical significance is a claim about a work's place in history, and C makes it: the earliest opera still regularly staged, surviving where its predecessors vanished.\n\n**The Full Solution:**\n- The notes locate the significance in two facts: earlier sung dramas left the repertoire (bullet 4), and L'Orfeo is the earliest opera still staged (bullet 5).\n- C joins them into a single claim of endurance and priority, anchored by the 1607 date.\n- That is emphasis on significance, not mere description.\n\n**Why the other choices are wrong:**\n- A: Date, place, and plot describe the premiere without asserting the work's importance to history.\n- B: A list of musical ingredients carries no claim of significance at all.\n- D: A biography of Monteverdi never mentions L'Orfeo, the subject the goal names.",
          "_meta": {
            "anchor": "Claudio Monteverdi — L'Orfeo; historical-significance goal"
          }
        }
      ]
    }
  ]
};

export default practiceTest4RW;
