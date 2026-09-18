// Practice Test 3 — SAT Reading & Writing (R&W)
// R&W seating varied 2026-09-07 (scripts/varyRWSeating.mjs): items re-dealt inside their official skill blocks with a per-test seed — block flow and per-skill counts unchanged.
// Auto-assembled by scripts/assembleRWTest.mjs from the authored JSON in
// scripts/generated/authored/test3/. Do not hand-edit this file —
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


export const practiceTest3RW = {
  id: "practice-test-3-rw",
  title: "Practice Test 3 — Reading & Writing",
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
          "id": 302,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "Aquatic insects differ widely in how much pollution they can ______: caddisfly and mayfly larvae disappear from streams at the first signs of contamination, while certain midge larvae persist even in badly degraded water. Because of this difference, biologists can estimate a stream's health simply by cataloging which insect groups live in it.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "produce"
            },
            {
              "id": "B",
              "text": "tolerate"
            },
            {
              "id": "C",
              "text": "measure"
            },
            {
              "id": "D",
              "text": "conceal"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The colon defines the blank with a contrast in endurance — some larvae vanish at the first contamination while others persist in degraded water — and \"tolerate\" is the word for how much pollution an organism can endure.\n\n**The Full Solution:**\n- The blank needs a verb describing the insects' relationship to pollution that varies from species to species.\n- The examples spell out that relationship: disappearing quickly versus persisting is a difference in how much pollution each group can withstand, which is what \"tolerate\" means.\n\n**Why the other choices are wrong:**\n- A: \"Produce\" makes the insects the source of the pollution, but the text treats pollution as something that happens to them.\n- C: \"Measure\" belongs to the biologists, who use the insects as indicators; the insects themselves measure nothing.\n- D: \"Conceal\" would mean the larvae hide contamination, an idea the text never raises.",
          "_meta": {
            "anchor": "Caddisfly and midge larvae as stream water-quality indicators (unnamed biologists)"
          }
        },
        {
          "id": 301,
          "difficulty": "easy",
          "band": 2,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "In many mountain parks, wildlife biologists fit reintroduced bighorn sheep with lightweight radio collars. Each collar transmits a signal several times a day, allowing researchers to ______ the animals' movements across steep terrain that would be difficult to search on foot and to learn whether the herds are reaching the seasonal pastures they need.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "explain"
            },
            {
              "id": "B",
              "text": "restrict"
            },
            {
              "id": "C",
              "text": "imagine"
            },
            {
              "id": "D",
              "text": "follow"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The collars transmit signals so that researchers can keep track of where the sheep go, and \"follow\" names exactly that act of tracking.\n\n**The Full Solution:**\n- The sentence explains what the daily signals make possible: knowing the animals' movements across terrain too steep to search on foot.\n- What a stream of location signals lets you do with movements is follow them — the plain verb for continuous tracking.\n\n**Why the other choices are wrong:**\n- A: \"Explain\" is about accounting for why the sheep move as they do; the signals report where the animals are, not why.\n- B: \"Restrict\" reverses the collars' purpose — they observe movement rather than limit it.\n- C: \"Imagine\" contradicts the setup: the signals give researchers real data, so nothing needs to be imagined.",
          "_meta": {
            "anchor": "Bighorn sheep radio-collar telemetry in mountain parks (unnamed wildlife biologists)"
          }
        },
        {
          "id": 304,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "Many oak species do not bear steady annual crops of acorns; instead, whole populations across a region produce almost nothing for several years and then release an enormous crop all at once. Ecologists argue that the value of these mast years lies precisely in their ______: seed-eating animals, unable to build up their numbers during the lean years in between, are overwhelmed when the crop finally arrives, and a large fraction of the acorns escapes them.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "abundance"
            },
            {
              "id": "B",
              "text": "duration"
            },
            {
              "id": "C",
              "text": "regularity"
            },
            {
              "id": "D",
              "text": "intermittency"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The mechanism the colon describes depends on the lean years as much as on the flood: because crops come only at intervals, predator populations stay small and are swamped when a crop arrives. That on-and-off rhythm is intermittency.\n\n**The Full Solution:**\n- The blank must name the feature of mast years in which their \"value... lies precisely.\"\n- The explanation that follows credits the gap between crops — predators \"unable to build up their numbers during the lean years\" — so the valuable feature is the alternation itself, not any single year's size.\n\n**Why the other choices are wrong:**\n- A: \"Abundance\" is the surface trap: the crop is enormous, but a crop that was abundant every year would let predator populations grow to match it, defeating the strategy the text describes.\n- B: \"Duration\" points to how long a mast year lasts, which the text never discusses.\n- C: \"Regularity\" is closer to the opposite of the boom-and-bust pattern being described.",
          "_meta": {
            "anchor": "Mast seeding in oaks — predator satiation via intermittent acorn crops (unnamed ecologists)"
          }
        },
        {
          "id": 303,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "When the photographer Julia Margaret Cameron exhibited her portraits in the 1860s, critics complained that the images were blurry and carelessly made. Cameron maintained that the softness was ______: she kept her lens slightly out of focus by choice, convinced that a hazy image conveyed the inner character of her sitters better than a sharp one could.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "intentional"
            },
            {
              "id": "B",
              "text": "inevitable"
            },
            {
              "id": "C",
              "text": "temporary"
            },
            {
              "id": "D",
              "text": "imperceptible"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The colon explains the blank: Cameron kept her lens out of focus \"by choice,\" so the softness the critics called careless was in fact intentional.\n\n**The Full Solution:**\n- The sentence stages a disagreement: critics saw carelessness; Cameron saw something else.\n- Her defense — she blurred the image deliberately, for an artistic purpose — is the claim that the softness was intentional, the direct opposite of an accident.\n\n**Why the other choices are wrong:**\n- B: \"Inevitable\" would mean the blur could not be avoided, which concedes the critics' point instead of answering it; her practice was a choice, not a limitation.\n- C: \"Temporary\" introduces a time frame the text never discusses.\n- D: \"Imperceptible\" is contradicted by the passage — the critics could see the softness plainly enough to complain about it.",
          "_meta": {
            "anchor": "Julia Margaret Cameron — deliberate soft focus in 1860s portrait photography"
          }
        },
        {
          "id": 307,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "type": "multiple-choice",
          "passage": "During the influenza pandemic of 1918, American cities differed sharply in how quickly they acted. Philadelphia allowed a large public parade to proceed in late September; within weeks its hospitals were overwhelmed, and its death rate became one of the highest of any major city. __St. Louis, by contrast, closed schools, theaters, and other gathering places within days of its first cases, and its death rate remained well below Philadelphia's.__ Historians of public health caution that the two cities differed in more ways than their policies, but the comparison remains a touchstone in debates over how governments should act in an epidemic's earliest days.",
          "question": "Which choice best describes the function of the underlined sentence in the text as a whole?",
          "choices": [
            {
              "id": "A",
              "text": "It offers a competing explanation for the severity of the outbreak that Philadelphia experienced"
            },
            {
              "id": "B",
              "text": "It concedes that early action by a city government could do little to alter the course of the pandemic"
            },
            {
              "id": "C",
              "text": "It introduces the reservation that historians raise about drawing conclusions from the two cities"
            },
            {
              "id": "D",
              "text": "It supplies the contrasting case that gives the comparison between the two cities its force, setting up both the historians' caution and the ongoing debate described in the final sentence"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The underlined sentence provides the second half of the comparison — the city that acted fast and fared better — and everything after it (the historians' caution, the policy debate) is a response to the contrast it completes.\n\n**The Full Solution:**\n- The passage is built on a paired example: Philadelphia's delay and its consequences, then St. Louis's speed and its consequences.\n- Without the underlined sentence there is no comparison, no reason for historians to urge caution about it, and no \"touchstone\" for later debates — the final sentence refers directly to the pairing this sentence creates.\n\n**Why the other choices are wrong:**\n- A: The sentence explains nothing about Philadelphia; it reports a different city's different outcome.\n- B: It implies the opposite of a concession — St. Louis's early action coincided with a far lower death rate.\n- C: The reservation belongs to the following sentence; the underlined sentence presents the evidence the reservation is about.",
          "_meta": {
            "anchor": "1918 influenza — Philadelphia vs. St. Louis early-intervention comparison (unnamed historians of public health)"
          }
        },
        {
          "id": 308,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "type": "multiple-choice",
          "passages": [
            {
              "label": "Text 1",
              "text": "In the 1930s, geneticist George Beadle crossed maize with teosinte, a wild Mexican grass whose hard, few-kerneled spikes look nothing like an ear of corn. The hybrids were fertile, and the traits separating the two plants appeared to be governed by a small number of genes. Beadle concluded that teosinte was maize's direct wild ancestor and that ancient farmers in Mexico, by selecting favorable variants generation after generation, could have gradually transformed so unpromising a grass into a productive crop."
            },
            {
              "label": "Text 2",
              "text": "Botanist Paul Mangelsdorf found the teosinte hypothesis difficult to accept. The seed-bearing structures of the two plants differ so radically, he argued, that early farmers would have seen nothing in teosinte worth cultivating, let alone remaking. Mangelsdorf proposed instead that maize descended from a wild maize, now extinct, and that teosinte was not the crop's ancestor at all but a later offshoot produced by crossing between cultivated maize and another wild grass."
            }
          ],
          "question": "Based on the texts, how would Mangelsdorf (Text 2) most likely respond to the conclusion presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "He would deny that crosses between maize and teosinte can yield fertile offspring, undermining the evidence at the center of Beadle's argument."
            },
            {
              "id": "B",
              "text": "He would object that the two plants' seed-bearing structures differ too radically for teosinte to have struck ancient farmers as a plant worth cultivating in the first place."
            },
            {
              "id": "C",
              "text": "He would accept that teosinte was maize's ancestor while arguing that the transformation must have involved many more genes than Beadle's crosses indicated."
            },
            {
              "id": "D",
              "text": "He would grant that teosinte is maize's closest wild relative but insist that the grass became a crop through natural crossing alone, without any selection by ancient farmers."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** Text 2 states Mangelsdorf's objection directly: the plants' seed-bearing structures \"differ so radically\" that early farmers \"would have seen nothing in teosinte worth cultivating.\" That is precisely the response B attributes to him.\n\n**The Full Solution:**\n- Beadle's conclusion has two parts: teosinte was the ancestor, and ancient farmers transformed it through selection.\n- Mangelsdorf attacks the scenario at its starting point — no farmer would have bothered with so unpromising a plant — and offers an alternative ancestry (an extinct wild maize) on which teosinte is an offshoot, not a parent.\n\n**Why the other choices are wrong:**\n- A: It has him denying a result his own proposal depends on — his offshoot account requires that maize and wild grasses cross; he disputed Beadle's interpretation, not the crosses.\n- C: It concedes the very claim he rejects — that teosinte was the ancestor.\n- D: It swaps his actual objection for one he never makes: his target was teosinte's role as ancestor, not the involvement of human selection in maize's history.",
          "_meta": {
            "anchor": "Cross-text pair: George Beadle (teosinte hypothesis) vs. Paul Mangelsdorf (extinct wild maize) — maize domestication debate"
          }
        },
        {
          "id": 305,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "type": "multiple-choice",
          "passage": "Lakes accumulate sediment year after year, and each layer traps pollen grains shed by the plants growing nearby at the time. Because pollen preserves well and differs in shape from species to species, researchers can extract a narrow core of mud from a lake bottom, identify the grains in each layer, and read the surrounding vegetation's history — which trees arrived, spread, or vanished — across thousands of years, reaching far beyond the oldest written records of any landscape.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To explain how pollen preserved in lake sediments lets researchers reconstruct past changes in vegetation"
            },
            {
              "id": "B",
              "text": "To argue that written records of vegetation change are less trustworthy than the physical evidence that researchers recover from lake beds"
            },
            {
              "id": "C",
              "text": "To describe why the pollen grains of different plant species have evolved such distinctive shapes"
            },
            {
              "id": "D",
              "text": "To trace the history of a particular forest from its first appearance in a lake's pollen record to its disappearance centuries later"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Every element of the text serves one explanatory job: showing how layered lake sediment plus identifiable pollen becomes a readable record of vegetation history.\n\n**The Full Solution:**\n- The first sentence establishes the archive (annual sediment layers trapping pollen).\n- The second explains the method built on it — coring, identifying grains layer by layer — and states the payoff: reading which trees arrived, spread, or vanished over thousands of years.\n- Purpose questions ask what the whole text is doing, and the whole text is explaining this reconstruction technique.\n\n**Why the other choices are wrong:**\n- B: The text notes that the record reaches beyond written accounts but never questions those accounts' trustworthiness — no argument is being made.\n- C: Distinctive pollen shapes are mentioned as what makes identification possible, not explained as an evolutionary development.\n- D: No particular forest is traced; the text describes the method in general terms.",
          "_meta": {
            "anchor": "Palynology — lake-sediment pollen cores as archives of vegetation history (unnamed researchers)"
          }
        },
        {
          "id": 306,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "type": "multiple-choice",
          "passage": "Periodical cicadas spend thirteen or seventeen years underground and then emerge by the billions within a few weeks. Why surface all at once? A single cicada is nearly defenseless — slow, conspicuous, and edible — and a lone insect appearing in an ordinary summer would almost certainly be eaten. When an entire brood emerges together, however, predators eat their fill long before they make a dent in the swarm, and the vast majority of cicadas survive to reproduce. The staggering density that makes an emergence so overwhelming is, in other words, the species' principal defense.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It presents a widely accepted explanation of an insect behavior, then describes an observation that has led researchers to doubt that explanation and to begin searching for a new one"
            },
            {
              "id": "B",
              "text": "It compares the life cycles of two closely related insect species and argues that one species is better adapted to escaping predators than the other"
            },
            {
              "id": "C",
              "text": "It describes a striking natural phenomenon, poses a question about it, and then explains the advantage that the phenomenon provides"
            },
            {
              "id": "D",
              "text": "It recounts the history of scientific research on an insect species, ending with the questions about the species that remain unanswered"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The text moves through exactly the three steps C names: a phenomenon (mass emergence after years underground), an explicit question (\"Why surface all at once?\"), and an answer (predators are swamped, so most cicadas survive).\n\n**The Full Solution:**\n- Sentence one states the phenomenon; sentence two asks the question outright.\n- The remainder answers it by contrasting a lone cicada's fate with a brood's, closing with the point that density itself is the defense.\n- Structure questions reward the choice that matches this sequence move for move.\n\n**Why the other choices are wrong:**\n- A: Nothing in the text is doubted or overturned; the explanation given is presented as the answer, not as a discarded view.\n- B: Only one kind of insect is discussed; no second species is compared.\n- D: The text is organized around a question and its answer, not a chronological history of research, and it ends with a conclusion rather than open questions.",
          "_meta": {
            "anchor": "Periodical cicada mass emergence as predator satiation (unnamed researchers)"
          }
        },
        {
          "id": 309,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "type": "multiple-choice",
          "passage": "In the shallow lakes of the Valley of Mexico, Aztec farmers built chinampas: rectangular plots raised above the water on layers of mud and decaying vegetation, anchored by willow trees planted along their edges. The canals between plots watered the crops continuously and supplied fresh muck that farmers dredged up and spread as fertilizer, making several harvests a year possible. By the fifteenth century, chinampa fields covered thousands of acres and supplied a large share of the food eaten in Tenochtitlan, then among the largest cities in the world.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Chinampa agriculture was a highly productive farming system that helped feed one of the largest cities of its era."
            },
            {
              "id": "B",
              "text": "Aztec farmers built chinampas primarily to control seasonal flooding in the shallow lakes of the Valley of Mexico."
            },
            {
              "id": "C",
              "text": "The canals that separated chinampas were more valuable as routes for transporting harvested crops than as sources of irrigation and fertilizer for the plots."
            },
            {
              "id": "D",
              "text": "Chinampa agriculture declined once the population of Tenochtitlan grew too large for locally grown food to support."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The text builds to one point: the chinampa system was extraordinarily productive — continuous water, constant fertilizer, several harvests a year — and on that productivity a great city fed itself.\n\n**The Full Solution:**\n- The first two sentences explain the system's design and why it yielded so much.\n- The final sentence delivers the payoff, scaling the system up to thousands of acres and tying it to Tenochtitlan's food supply.\n- A captures both halves: how productive the system was and what that productivity accomplished.\n\n**Why the other choices are wrong:**\n- B: Flood control is never mentioned; the text presents chinampas as a way of farming the lakes, not taming them.\n- C: Transportation on the canals is never discussed, so no such ranking of the canals' uses can be the main idea.\n- D: The text describes the system at its height and says nothing about a decline.",
          "_meta": {
            "anchor": "Chinampa raised-field agriculture in the Valley of Mexico — productivity feeding Tenochtitlan"
          }
        },
        {
          "id": 310,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "type": "multiple-choice",
          "passage": "Feature films dominate most accounts of cinema's past, but a growing number of archivists have turned their attention to home movies. Amateur reels shot between the 1930s and the 1960s record precisely what commercial studios rarely bothered to film: family-run shops, regional festivals, workplaces, and neighborhoods that have since been transformed or demolished. Because the footage was made for private viewing rather than for sale, it also preserves unrehearsed behavior — how people actually dressed, cooked, celebrated, and greeted one another. Archivists who catalog these reels describe them as an unintended documentary of everyday life.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "Commercial studios of the mid-twentieth century occasionally filmed everyday subjects, but the scenes they produced were staged rather than spontaneous."
            },
            {
              "id": "B",
              "text": "Archivists prefer working with home movies because amateur reels are easier to repair and preserve than commercial films are."
            },
            {
              "id": "C",
              "text": "Home movies preserve details of ordinary life that commercial filmmaking largely ignored, which makes them valuable historical records."
            },
            {
              "id": "D",
              "text": "Home movies are difficult for archivists to catalog because the people and places they show were rarely identified by the amateurs who filmed them."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Every sentence advances the same claim: amateur footage captured what commercial cinema left out — vanished places and unrehearsed behavior — and archivists now treat it as \"an unintended documentary of everyday life.\"\n\n**The Full Solution:**\n- The text opens by shifting attention from feature films to home movies, then gives two reasons the amateur record matters: it shows subjects studios ignored, and it shows them unstaged.\n- The closing sentence states the resulting value in the archivists' own terms, which C restates.\n\n**Why the other choices are wrong:**\n- A: The text says studios \"rarely bothered\" with everyday subjects; it never examines the staging of what they did film.\n- B: Ease of repair and preservation is never mentioned, and no preference between formats is expressed on those grounds.\n- D: Cataloging difficulties are never raised; the archivists' cataloging work is mentioned only in passing.",
          "_meta": {
            "anchor": "Home movies as unintended documentary of everyday life (unnamed archivists)"
          }
        },
        {
          "id": 315,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "type": "multiple-choice",
          "passage": "When a word passes from one language into another, it must survive in the sound system of its new home. Japanese syllables, for example, rarely end in consonants, so English words borrowed into Japanese acquire extra vowels: baseball becomes besuboru. Speakers are not mispronouncing the foreign word so much as rebuilding it from the inventory of sounds and syllable shapes their own language provides. Linguists therefore expect that when the same English word is borrowed by several languages with different sound systems, ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "each language will reshape the word differently, in ways that reflect its own inventory of sounds and syllable patterns."
            },
            {
              "id": "B",
              "text": "the borrowed word will eventually come to be pronounced the same way in all of the borrowing languages."
            },
            {
              "id": "C",
              "text": "speakers of the borrowing languages will avoid using the word in favor of native vocabulary with a similar meaning that is easier to pronounce."
            },
            {
              "id": "D",
              "text": "the word's original pronunciation will be preserved most faithfully by languages whose speakers rarely encounter spoken English."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage's principle — borrowed words are rebuilt from the borrowing language's own sounds and syllable shapes — applied to several languages with different sound systems yields several different rebuildings.\n\n**The Full Solution:**\n- The Japanese example shows the mechanism: the borrowing language's constraints (no final consonants) dictate the reshaping (extra vowels).\n- If the constraints differ from language to language, the reshapings must differ too; A simply generalizes the mechanism the passage established.\n\n**Why the other choices are wrong:**\n- B: Convergence on one pronunciation is the opposite of what the mechanism predicts, since each language rebuilds the word under different constraints.\n- C: The passage is about how languages adapt borrowed words, not about avoiding them; nothing suggests borrowing fails.\n- D: The passage ties faithfulness to sound-system compatibility, not to how often speakers hear English — and less exposure would give speakers no extra means of preserving the original.",
          "_meta": {
            "anchor": "Loanword adaptation to native sound systems — besuboru example (unnamed linguists)"
          }
        },
        {
          "id": 312,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "type": "multiple-choice",
          "passage": "The hazel dormouse, a small European rodent, rarely crosses open ground, so populations confined to isolated patches of woodland risk becoming inbred. A team of conservation biologists hypothesized that hedgerows — continuous lines of shrubs and small trees running between one woodland and another — function as corridors that let dormice move between patches and interbreed.",
          "question": "Which finding, if true, would most directly support the biologists' hypothesis?",
          "choices": [
            {
              "id": "A",
              "text": "Genetic analysis shows that dormouse populations in woodlands linked by hedgerows are more closely related to one another than are populations in similar woodlands that lack such connections."
            },
            {
              "id": "B",
              "text": "Dormice living in hedgerows build nests that are similar in size and structure to the nests that dormice build in woodlands, according to surveys conducted across several regions, regardless of the season in which the nests are built."
            },
            {
              "id": "C",
              "text": "Woodland patches that are connected by hedgerows tend to be somewhat larger on average than woodland patches that stand alone."
            },
            {
              "id": "D",
              "text": "Dormouse populations in isolated woodland patches have remained roughly stable in size over the past decade."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The hypothesis is about movement leading to interbreeding, and interbreeding leaves a genetic signature. Finding that hedgerow-linked populations are more closely related than unlinked ones is direct evidence that dormice are actually crossing between patches and mixing.\n\n**The Full Solution:**\n- The claim has two parts: dormice use hedgerows as corridors, and the travel results in interbreeding.\n- A tests exactly the predicted outcome, with the right comparison group — similar woodlands without hedgerows — so the genetic difference can be attributed to the corridors.\n\n**Why the other choices are wrong:**\n- B: Nest similarity shows dormice can live in hedgerows, not that they travel through them to breed in other woodlands.\n- C: Patch size says nothing about movement between patches; it is a property of the woodlands, not of the animals' behavior.\n- D: Stable populations in isolated patches, if anything, cut against the premise that isolation is harmful — and stability reveals nothing about corridor use.",
          "_meta": {
            "anchor": "Hedgerow corridors and gene flow between hazel dormouse populations (unnamed conservation biologists)"
          }
        },
        {
          "id": 314,
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "type": "multiple-choice",
          "passage": "Poliomyelitis epidemics recurred in the United States through the first half of the twentieth century, peaking in the early 1950s. A student writing about the first widely used polio vaccine, introduced in 1955, claims that although reported cases did not vanish overnight, the decline that followed the vaccine's introduction was far too steep to be dismissed as the disease's ordinary year-to-year fluctuation, noting that ______",
          "questionTable": {
            "type": "table",
            "caption": "Reported cases of poliomyelitis in the United States, selected years",
            "headers": [
              "Year",
              "Reported cases"
            ],
            "rows": [
              [
                "1950",
                "33,300"
              ],
              [
                "1952",
                "57,879"
              ],
              [
                "1954",
                "38,476"
              ],
              [
                "1956",
                "15,140"
              ],
              [
                "1958",
                "5,787"
              ],
              [
                "1960",
                "3,190"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "cases fell by roughly 85 percent between 1954 and 1958, a four-year collapse with no parallel between any two of the prevaccine years shown."
            },
            {
              "id": "B",
              "text": "cases declined from 57,879 in 1952 to 38,476 in 1954, showing that the epidemic had already begun to recede before the vaccine was introduced."
            },
            {
              "id": "C",
              "text": "fewer than 3,200 cases were reported in 1960, the lowest total for any year shown in the table."
            },
            {
              "id": "D",
              "text": "reported cases rose from 33,300 in 1950 to 57,879 in 1952 before falling in each subsequent year shown."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The claim is comparative: the postvaccine decline was too steep to be ordinary fluctuation. A supplies both halves of the comparison — an 85 percent collapse across 1954-1958 and the observation that no two prevaccine years show anything like it.\n\n**The Full Solution:**\n- From 38,476 (1954) to 5,787 (1958) is a drop of about 85 percent.\n- The prevaccine rows swing up and down — 33,300 to 57,879 to 38,476 — but never fall anywhere near that far. Citing the absence of a prevaccine parallel is what turns the number into evidence against the fluctuation explanation.\n\n**Why the other choices are wrong:**\n- B: It cites the one prevaccine dip — exactly the fluctuation the student wants to distinguish the later decline from — and so undercuts the claim rather than supporting it.\n- C: The 1960 endpoint shows cases ended low but makes no comparison to prevaccine variation, which the claim requires.\n- D: It narrates the whole trajectory without quantifying the postvaccine decline's steepness or contrasting it with the earlier swings.",
          "_meta": {
            "anchor": "U.S. reported polio cases before and after the 1955 vaccine — decline vs. ordinary fluctuation"
          }
        },
        {
          "id": 313,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "type": "multiple-choice",
          "passage": "Marine reserves prohibit fishing within their boundaries, and ecologists expect fish populations inside them to recover as the years pass. Surveying five reserves along the Pacific coast, a research team compared the biomass of rockfish inside each reserve with the biomass in similar fished waters nearby. Summarizing the results, the team writes that protection appears to make a substantial difference everywhere and that the effect appears to strengthen as reserves age, noting that ______",
          "questionTable": {
            "type": "table",
            "caption": "Rockfish biomass inside five Pacific marine reserves relative to nearby fished areas",
            "headers": [
              "Reserve",
              "Years since fishing ban",
              "Biomass ratio (inside : outside)"
            ],
            "rows": [
              [
                "Point Azul",
                "6",
                "1.4"
              ],
              [
                "Gray Harbor",
                "9",
                "1.7"
              ],
              [
                "Cedar Cove",
                "14",
                "2.1"
              ],
              [
                "Osprey Bank",
                "21",
                "2.6"
              ],
              [
                "Halfmoon Shoal",
                "26",
                "3.2"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "Halfmoon Shoal, protected for 26 years, has the highest biomass ratio of the five reserves, at 3.2."
            },
            {
              "id": "B",
              "text": "rockfish biomass at Point Azul is 1.4 times as high inside the reserve as in the nearby fished waters."
            },
            {
              "id": "C",
              "text": "the two reserves protected for fewer than ten years have markedly lower biomass ratios than any of the three reserves whose fishing bans are more than a decade old."
            },
            {
              "id": "D",
              "text": "biomass ratios exceed 1.0 at every reserve and rise steadily with each reserve's age, from 1.4 after 6 years of protection to 3.2 after 26."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The statement makes two claims — protection matters everywhere, and the effect strengthens with age — and D is the only choice that documents both: every ratio tops 1.0, and the ratios climb in step with years of protection across the whole table.\n\n**The Full Solution:**\n- \"A substantial difference everywhere\" needs evidence from all five reserves: ratios above 1.0 at each one.\n- \"Strengthens as reserves age\" needs the trend: 1.4, 1.7, 2.1, 2.6, 3.2 as the ban lengthens from 6 to 26 years. D cites both patterns with the correct endpoints.\n\n**Why the other choices are wrong:**\n- A: One reserve, however impressive, cannot support a claim about all five or about a trend.\n- B: A single ratio from the youngest reserve establishes neither the everywhere claim nor the age trend.\n- C: It supports only the age-trend half of the statement and never shows that biomass is higher inside every reserve.",
          "_meta": {
            "anchor": "Rockfish biomass recovery inside Pacific marine reserves vs. reserve age (unnamed research team)"
          }
        },
        {
          "id": 311,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "type": "multiple-choice",
          "passage": "Cholera kills by draining the body of fluid faster than plain drinking water can replace it, because the inflamed intestine cannot absorb water on its own. In refugee camps during the 1971 Bangladesh war, physician Dilip Mahalanabis faced thousands of cholera patients with almost no intravenous fluid, then the standard treatment. His team instead distributed a simple drinking solution of water, salt, and glucose — the sugar carries the salt across the intestinal wall, and water follows. Deaths in the camps fell from roughly thirty percent of patients to under four, and oral rehydration therapy went on to save tens of millions of lives worldwide.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "A simple oral solution, adopted when the standard cholera treatment was unavailable, proved dramatically effective and became a lifesaving therapy used around the world."
            },
            {
              "id": "B",
              "text": "Intravenous fluid remained too scarce in most countries for cholera to be treated effectively."
            },
            {
              "id": "C",
              "text": "Cholera cannot be treated with plain drinking water because the inflamed intestine is unable to absorb it."
            },
            {
              "id": "D",
              "text": "Physicians working in the 1971 refugee camps lacked the training needed to administer intravenous fluid safely."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The text's arc runs from crisis to solution to legacy: with intravenous fluid unavailable, a salt-and-glucose drink cut deaths from thirty percent to under four and became a worldwide therapy — which is A, point for point.\n\n**The Full Solution:**\n- The first sentence sets up the problem (fluid loss the gut cannot repair on its own); the second establishes the emergency (no standard treatment available).\n- The third explains the improvised remedy and why it works; the fourth measures its success and extends it to \"tens of millions of lives worldwide.\"\n\n**Why the other choices are wrong:**\n- B: The scarcity of intravenous fluid is the story's starting condition, not its point — and the text limits that scarcity to the camps, not \"most countries.\"\n- C: This is a supporting detail explaining why plain water fails; it is background for the main idea, not the idea itself.\n- D: The text attributes the lack of intravenous treatment to supply, never to the physicians' training.",
          "_meta": {
            "anchor": "Dilip Mahalanabis — oral rehydration therapy in the 1971 Bangladesh refugee camps"
          }
        },
        {
          "id": 316,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "type": "multiple-choice",
          "passage": "The osage orange tree produces heavy, softball-sized fruits that pile up beneath the parent tree and rot; almost nothing in North America today eats them, so the seeds are rarely carried anywhere. Yet a large fruit is, in evolutionary terms, an expensive advertisement — a plant's investment in attracting animals that will swallow its seeds and deposit them far away. Ecologists note that until roughly 13,000 years ago, North America supported mammoths, giant ground sloths, and other enormous herbivores capable of gulping such fruits whole. The tree's oversized crop, they suggest, ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "shows that the tree once relied on rivers and seasonal floods rather than on animals to carry its seeds to new ground."
            },
            {
              "id": "B",
              "text": "is best understood as an adaptation to seed dispersers that no longer exist — a strategy aimed at animals that vanished from the continent thousands of years ago."
            },
            {
              "id": "C",
              "text": "indicates that the fruit evolved primarily to poison the herbivores that attempted to eat it."
            },
            {
              "id": "D",
              "text": "demonstrates that producing large fruit offers a tree no evolutionary advantage of any kind."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The puzzle (expensive fruit, no takers) plus the historical fact (giant fruit-swallowing herbivores until 13,000 years ago) resolves into B: the fruit is a courtship of partners that are now extinct.\n\n**The Full Solution:**\n- The passage sets up a mismatch: fruits are costly advertisements to dispersers, yet nothing today disperses these seeds.\n- The ecologists' contribution is the missing audience — mammoths and ground sloths that could gulp the fruits whole.\n- The only conclusion that uses both pieces is that the tree's strategy targets its former, vanished dispersers.\n\n**Why the other choices are wrong:**\n- A: Rivers and floods never appear in the passage, and the fruit-as-advertisement framing points specifically to animal dispersers.\n- C: Poison reverses the logic — the fruit is described as an attraction, an investment in being eaten.\n- D: The passage says large fruit is currently useless to this tree, not that it never conferred an advantage; the ecologists' point is that it once did.",
          "_meta": {
            "anchor": "Osage orange as anachronistic fruit — dispersal adaptation to extinct Pleistocene megafauna (unnamed ecologists)"
          }
        },
        {
          "id": 320,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "type": "multiple-choice",
          "passage": "The chambered nautilus, along with the octopuses and squids that are its distant relatives, ______ to a lineage of shelled animals that flourished hundreds of millions of years ago; unlike those relatives, however, the nautilus has kept its coiled external shell nearly unchanged.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "belongs"
            },
            {
              "id": "B",
              "text": "belong"
            },
            {
              "id": "C",
              "text": "have belonged"
            },
            {
              "id": "D",
              "text": "are belonging"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The subject is the singular \"chambered nautilus\"; the phrase beginning \"along with\" is an add-on, not part of the grammatical subject, so the verb stays singular: \"belongs.\"\n\n**The Full Solution:**\n- Phrases introduced by \"along with,\" \"as well as,\" or \"in addition to\" do not change a subject's number the way \"and\" would.\n- Strip the interrupter: \"The chambered nautilus... belongs to a lineage of shelled animals.\" Singular subject, singular verb.\n\n**Why the other choices are wrong:**\n- B: \"Belong\" treats the subject as plural, as if \"along with\" had the joining force of \"and\" — the classic trap in this construction.\n- C: \"Have belonged\" is plural too, and its perfect tense wrongly suggests the belonging might have ended.\n- D: \"Are belonging\" is both plural and an unidiomatic progressive — belonging to a lineage is a state, not an ongoing activity.",
          "_meta": {
            "anchor": "Chambered nautilus lineage — singular subject with an along-with interrupter",
            "rule": "subject-verb agreement across an 'along with' phrase"
          }
        },
        {
          "id": 322,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "type": "multiple-choice",
          "passage": "The network of burrows that a colony of alpine marmots digs and maintains over many generations ______ dozens of entrances, sleeping chambers lined with dried grass, and a deep hibernation den where the whole family passes the winter.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "include"
            },
            {
              "id": "B",
              "text": "are including"
            },
            {
              "id": "C",
              "text": "includes"
            },
            {
              "id": "D",
              "text": "have included"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject is the singular \"network,\" so the verb must be the singular \"includes\" — everything between subject and verb is a modifying clause that does not change the subject's number.\n\n**The Full Solution:**\n- Find the head noun: \"The network... includes dozens of entrances...\"\n- The intervening clause \"that a colony of alpine marmots digs and maintains over many generations\" dangles plural nouns (marmots, generations) next to the verb, but none of them is the subject.\n\n**Why the other choices are wrong:**\n- A: \"Include\" agrees with the nearby plurals rather than with the true subject \"network.\"\n- B: \"Are including\" is plural and casts a permanent feature of the burrow system as a temporary ongoing action.\n- D: \"Have included\" is plural, and its perfect tense implies the den's features belong to the past when the sentence describes what the network contains now.",
          "_meta": {
            "anchor": "Alpine marmot burrow network — agreement across a long relative clause",
            "rule": "subject-verb agreement across an intervening relative clause"
          }
        },
        {
          "id": 317,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "type": "multiple-choice",
          "passage": "Pando, a stand of quaking aspen in central Utah, is not a forest of separate trees but a single organism whose roughly 47,000 stems sprout from one enormous root system. Individual aspen stems are short-lived, rarely standing for even two ______ the root system beneath Pando has endured, by some estimates, for thousands of years.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "centuries,"
            },
            {
              "id": "B",
              "text": "centuries"
            },
            {
              "id": "C",
              "text": "centuries;"
            },
            {
              "id": "D",
              "text": "centuries:"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The blank sits between two independent clauses — \"Individual aspen stems are short-lived...\" and \"the root system beneath Pando has endured...\" — and a semicolon is the standard way to join two related independent clauses without a conjunction.\n\n**The Full Solution:**\n- Test each side: both halves have a subject and a verb and can stand alone as sentences.\n- Two independent clauses may be joined by a period, a semicolon, or a comma plus a coordinating conjunction. Among the options, only the semicolon qualifies.\n- The clauses contrast (short-lived stems, ancient roots), a relationship the semicolon handles naturally.\n\n**Why the other choices are wrong:**\n- A: A comma alone between independent clauses produces a comma splice.\n- B: No punctuation at all fuses the two clauses into a run-on.\n- D: A colon signals that what follows explains or specifies what precedes; the second clause instead pivots to a contrasting fact, so the colon misrepresents the relationship.",
          "_meta": {
            "anchor": "Pando quaking-aspen clone, Utah — semicolon between contrasting independent clauses",
            "rule": "semicolon joining two independent clauses"
          }
        },
        {
          "id": 319,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "type": "multiple-choice",
          "passage": "The photographer Gordon Parks ______ once described his camera as a weapon against poverty and racism, and his images of everyday life in segregated Washington, D.C., made in 1942, gave that conviction lasting form.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "— the first Black staff photographer at a major American picture magazine,"
            },
            {
              "id": "B",
              "text": ", the first Black staff photographer at a major American picture magazine,"
            },
            {
              "id": "C",
              "text": ", the first Black staff photographer at a major American picture magazine —"
            },
            {
              "id": "D",
              "text": "the first Black staff photographer at a major American picture magazine"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The phrase \"the first Black staff photographer at a major American picture magazine\" is a nonrestrictive appositive describing Parks, and such an interrupter must be enclosed in a matched pair of punctuation marks — here, a comma on each side.\n\n**The Full Solution:**\n- Remove the phrase and the sentence still works: \"The photographer Gordon Parks once described his camera as a weapon...\" — proof the appositive is supplementary.\n- Supplementary elements are set off by paired commas or paired dashes; the pair must match. B opens and closes with commas.\n\n**Why the other choices are wrong:**\n- A: It opens with a dash but closes with a comma — a mismatched pair.\n- C: It opens with a comma but closes with a dash, the same mismatch in reverse.\n- D: With no punctuation at all, the appositive collides with the name and the verb — \"Parks the first Black staff photographer at a major American picture magazine once described\" — obscuring where the description ends and the sentence resumes.",
          "_meta": {
            "anchor": "Gordon Parks — paired commas around a nonrestrictive appositive",
            "rule": "matched punctuation pair around a supplementary appositive"
          }
        },
        {
          "id": 321,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "type": "multiple-choice",
          "passage": "Cycads dominated the understories of the world's forests during the age of the ______ today the group survives only as a few hundred slow-growing species scattered across the tropics and subtropics.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "dinosaurs, but"
            },
            {
              "id": "B",
              "text": "dinosaurs but"
            },
            {
              "id": "C",
              "text": "dinosaurs, however"
            },
            {
              "id": "D",
              "text": "dinosaurs,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Two independent clauses — \"Cycads dominated...\" and \"today the group survives...\" — are being joined, and a comma plus the coordinating conjunction \"but\" is one of the standard ways to join them.\n\n**The Full Solution:**\n- Both halves can stand alone as sentences, so the boundary between them needs full strength: a period, a semicolon, or a comma with a coordinating conjunction.\n- A supplies the comma-plus-conjunction option, and \"but\" fits the contrast between past dominance and present scarcity.\n\n**Why the other choices are wrong:**\n- B: A coordinating conjunction joining two independent clauses conventionally requires a comma before it; without one, the clauses run together.\n- C: \"However\" is a conjunctive adverb, not a conjunction — a comma before it cannot join two independent clauses, so this produces a comma splice.\n- D: A comma alone between the clauses is a comma splice outright.",
          "_meta": {
            "anchor": "Cycads — Mesozoic dominance vs. relict present; comma plus coordinating conjunction",
            "rule": "comma + coordinating conjunction between independent clauses"
          }
        },
        {
          "id": 318,
          "difficulty": "easy",
          "band": 2,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "type": "multiple-choice",
          "passage": "The California condor, one of the largest flying birds in North America, nearly vanished in the 1980s, when the wild population fell to just twenty-two individuals. Today, thanks to captive breeding and careful monitoring, hundreds of condors ______ over the canyons of California, Arizona, and Baja California.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "soars"
            },
            {
              "id": "B",
              "text": "has soared"
            },
            {
              "id": "C",
              "text": "soar"
            },
            {
              "id": "D",
              "text": "is soaring"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The subject of the verb is the plural \"hundreds of condors,\" so the verb must take the plural form \"soar.\"\n\n**The Full Solution:**\n- Strip the sentence to its core: \"hundreds of condors ______ over the canyons.\"\n- \"Hundreds\" is the head of the subject and it is plural; plural subjects take verbs without the singular -s.\n- The sentence describes a present, ongoing situation, and the simple present plural \"soar\" fits it.\n\n**Why the other choices are wrong:**\n- A: \"Soars\" is singular and clashes with the plural subject \"hundreds.\"\n- B: \"Has soared\" is singular as well as an unneeded shift into the perfect; the sentence reports a current state, not a completed one.\n- D: \"Is soaring\" is singular; the plural would be \"are soaring,\" which is not offered.",
          "_meta": {
            "anchor": "California condor recovery — plural subject-verb agreement",
            "rule": "subject-verb agreement with plural quantity subject"
          }
        },
        {
          "id": 323,
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "type": "multiple-choice",
          "passage": "The gopher tortoise digs burrows up to twelve meters long in the sandy soils of the southeastern United States, and the tortoise itself is only one of the burrows' beneficiaries. More than three hundred other species — burrowing owls, indigo snakes, rabbits, frogs, and countless insects — take refuge in the tunnels during wildfires and winter cold. ______ conservationists rank the tortoise among the region's most important animals: protecting it protects the many species that depend on its engineering.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "However,"
            },
            {
              "id": "B",
              "text": "For example,"
            },
            {
              "id": "C",
              "text": "For this reason,"
            },
            {
              "id": "D",
              "text": "Meanwhile,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The final sentence states a consequence of what came before: because hundreds of species shelter in the tortoise's burrows, conservationists rank the tortoise as critically important. \"For this reason\" is the transition that marks a conclusion drawn from the preceding facts.\n\n**The Full Solution:**\n- Map the logic: fact (many species depend on the burrows) leads to judgment (the tortoise is a conservation priority).\n- The colon in the final sentence even restates the causal link — protecting the tortoise protects its dependents — confirming that the blank must signal cause and effect.\n\n**Why the other choices are wrong:**\n- A: \"However\" requires a reversal, but the conservationists' ranking follows from the burrow facts rather than opposing them.\n- B: \"For example\" would make the ranking an illustration of the shelter-seeking species, which it is not — it is a response to them.\n- D: \"Meanwhile\" sets two developments side by side in time; the sentences here are linked by logic, not simultaneity.",
          "_meta": {
            "anchor": "Gopher tortoise burrows as keystone shelter — consequence transition"
          }
        },
        {
          "id": 324,
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "type": "multiple-choice",
          "passage": "Highway departments have long fenced roadsides to keep large animals off the pavement, and fencing does reduce collisions. Fences alone, however, seal animals off from the feeding grounds and migration routes that lie on the far side of the road. ______ many transportation agencies now pair fencing with wildlife overpasses and underpasses, which funnel animals toward safe crossing points instead of simply barring their way.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "In contrast,"
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
              "text": "Similarly,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The blank introduces the practical response to the problem just described: because fencing alone cuts animals off from what they need, agencies now combine it with crossings. \"Consequently\" marks exactly that cause-and-effect step.\n\n**The Full Solution:**\n- Sentence two identifies a drawback (fences isolate animals from feeding grounds and migration routes).\n- Sentence three reports what agencies do about it (add overpasses and underpasses). The second development happens because of the first, so the transition must carry consequence.\n\n**Why the other choices are wrong:**\n- A: \"In contrast\" would oppose the two sentences, but the crossings are a remedy for the fences' drawback, not a contrary case.\n- B: \"For instance\" would make the agencies' practice an example of the isolation problem rather than a solution to it.\n- D: \"Similarly\" claims the final sentence parallels the previous one, but the sentences stand in a problem-solution relationship, not a resemblance.",
          "_meta": {
            "anchor": "Wildlife overpasses paired with roadside fencing — consequence transition"
          }
        },
        {
          "id": 325,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "type": "multiple-choice",
          "passage": "A pidgin arises when adults who share no common language improvise a stripped-down code for trade or work — a small vocabulary, little grammar, no native speakers. The children who grow up hearing that improvised code, however, do something their parents never did: they acquire it as a first language, and in acquiring it they expand it into a creole with fixed word order, verb marking, and the full expressive range of any human language. ______ the regularities of creole grammar are supplied by the children themselves, not inherited from the makeshift code their parents devised.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Nevertheless,"
            },
            {
              "id": "B",
              "text": "By comparison,"
            },
            {
              "id": "C",
              "text": "For example,"
            },
            {
              "id": "D",
              "text": "In other words,"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The final sentence does not add a new fact; it restates the significance of the previous one — if children expand a nearly grammarless code into a full language, then the grammar must come from them. \"In other words\" is the transition that signals a restatement.\n\n**The Full Solution:**\n- The second sentence reports what happens: children acquire the pidgin and, in doing so, give it fixed word order and verb marking it never had.\n- The blank sentence says the same thing from the other direction — the grammar's source is the children, not the parents' code. Same content, sharpened phrasing: a restatement.\n\n**Why the other choices are wrong:**\n- A: \"Nevertheless\" promises a concession-then-reversal, but the final sentence agrees entirely with what precedes it.\n- B: \"By comparison\" needs two things being measured against each other; the final sentence draws out one process's meaning rather than comparing two.\n- C: \"For example\" would require a specific instance of the general claim, but the final sentence is more general than the sentence before it, not more specific.",
          "_meta": {
            "anchor": "Pidgin-to-creole nativization — children as the source of grammar; restatement transition"
          }
        },
        {
          "id": 326,
          "difficulty": "medium",
          "band": 3,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "type": "multiple-choice",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Alice Hamilton (1869-1970) was an American physician who studied diseases of the workplace.",
              "In the early 1900s, she visited factories, mines, and mills to trace illnesses among workers to the lead, mercury, and other toxins they handled.",
              "Her reports persuaded several states to pass the first laws compensating workers sickened on the job.",
              "In 1919 she became the first woman appointed to the faculty of Harvard Medical School.",
              "Her 1925 book on industrial poisons became a standard text in the new field of industrial medicine."
            ],
            "goal": "The student wants to introduce Alice Hamilton's main contribution to an audience unfamiliar with her work."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "In 1919, Alice Hamilton became the first woman ever to be appointed to the faculty of Harvard Medical School."
            },
            {
              "id": "B",
              "text": "Physician Alice Hamilton traced illnesses among early twentieth-century workers to the toxins they handled on the job, work that persuaded states to pass the first laws compensating sickened workers."
            },
            {
              "id": "C",
              "text": "Alice Hamilton visited factories, mines, and mills in the early 1900s, and she also published a book in 1925."
            },
            {
              "id": "D",
              "text": "Because workers in the early 1900s handled lead, mercury, and other toxins on the job, many of them fell ill, and several states eventually responded by passing the first laws that compensated workers for illnesses they developed at work."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The goal has two requirements — identify Hamilton for readers who do not know her and present her main contribution — and B satisfies both: it names her profession, states what she did (traced workers' illnesses to workplace toxins), and gives the contribution's consequence (the first compensation laws).\n\n**The Full Solution:**\n- An introduction for an unfamiliar audience must say who she was; \"Physician Alice Hamilton\" does that economically.\n- Her main contribution, per the notes, is the tracing of illness to toxins and the reforms it produced; B links the two in one sentence.\n\n**Why the other choices are wrong:**\n- A: It leads with an academic honor and never mentions the work the honor recognized.\n- C: It strings together activities (visits, a book) without saying what Hamilton discovered or why it mattered.\n- D: It narrates the era's industrial illness and reform while omitting Hamilton entirely — the one thing the goal requires the sentence to introduce.",
          "_meta": {
            "anchor": "Alice Hamilton — industrial toxicology and the first workplace-compensation laws"
          }
        },
        {
          "id": 327,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "type": "multiple-choice",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Camera traps are motion-triggered cameras that photograph animals without a human observer present.",
              "Traditional wildlife surveys require field teams to walk transect lines, which is costly and disturbs the animals being counted.",
              "A camera trap operates continuously for months on one set of batteries, through darkness and weather that would halt a field team.",
              "Networks of hundreds of camera traps now generate millions of images revealing where rare species live and when they are active.",
              "Shy species such as snow leopards, seldom seen in person even by researchers, appear regularly in camera-trap images.",
              "Standard survey methods remain necessary for data that images cannot supply, such as an animal's age, weight, or health."
            ],
            "goal": "The student wants to emphasize the advantage of camera traps over traditional survey methods for studying elusive animals."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Camera traps, which are triggered by motion, photograph passing animals without requiring a human observer to be present at the site."
            },
            {
              "id": "B",
              "text": "Standard survey methods can supply data that camera-trap images cannot, such as an animal's age, weight, or health."
            },
            {
              "id": "C",
              "text": "Networks of hundreds of camera traps generate millions of images revealing where rare species live and when they are most active."
            },
            {
              "id": "D",
              "text": "Unlike traditional surveys, whose costly field teams disturb the very animals they count, motion-triggered camera traps operate unattended for months and regularly record shy species, such as snow leopards, that researchers almost never see in person."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The goal demands a comparison — camera traps versus traditional methods — aimed specifically at elusive animals, and D is the only choice that draws it: traditional teams disturb their subjects, while unattended cameras run for months and routinely capture species like snow leopards that observers never encounter.\n\n**The Full Solution:**\n- \"Advantage over\" requires both sides of the comparison to appear; D opens with the traditional method's weaknesses and pivots to the camera trap's strengths.\n- \"Elusive animals\" requires the snow-leopard note, the notes' one direct illustration of shy species on camera.\n\n**Why the other choices are wrong:**\n- A: It defines camera traps accurately but mentions neither traditional surveys nor elusive species, so no advantage is asserted.\n- B: It argues the reverse of the goal, emphasizing what traditional methods do better.\n- C: It conveys scale — many cameras, many images — but never compares that capability with traditional surveys or connects it to hard-to-see animals.",
          "_meta": {
            "anchor": "Camera-trap networks vs. transect surveys for elusive species (snow leopards)"
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
          "id": 330,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "The psychologist Adriaan de Groot found that chess masters could reproduce a briefly glimpsed board position almost perfectly, while novices could not — yet when the pieces were scattered at random, the masters' advantage nearly vanished. Their extraordinary recall, de Groot concluded, was not a general gift of memory but a ______ one: it operated only on positions that made chess sense, where familiar configurations could be grasped as wholes.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "cultivated"
            },
            {
              "id": "B",
              "text": "fleeting"
            },
            {
              "id": "C",
              "text": "deliberate"
            },
            {
              "id": "D",
              "text": "circumscribed"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The colon defines the blank: the masters' recall \"operated only on positions that made chess sense.\" A capacity confined to a limited domain is a circumscribed one — the precise contrast with \"a general gift of memory.\"\n\n**The Full Solution:**\n- The sentence is built on a not-X-but-Y frame: not general, but ______. The blank must be an antonym-in-context of \"general.\"\n- The random-board result supplies the evidence — outside meaningful chess positions, the advantage nearly vanished — so the ability's boundary, not its strength, is the point.\n\n**Why the other choices are wrong:**\n- A: \"Cultivated\" is the tempting half-truth — the skill was surely trained — but training is not the contrast being drawn with \"general,\" and the colon explains a limit of scope, not an origin.\n- B: \"Fleeting\" describes duration; the masters' recall was reliable within its domain, not short-lived.\n- C: \"Deliberate\" describes intention, but grasping configurations \"as wholes\" suggests rapid recognition rather than effortful intent — and intention is not what the colon goes on to explain.",
          "_meta": {
            "anchor": "Adriaan de Groot — chess masters' recall as domain-limited (random-board control)"
          }
        },
        {
          "id": 328,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "When a whale dies at sea, its body sinks to a seafloor that is otherwise starved of food. The carcass can ______ a dense community of scavengers and specialized organisms — some found nowhere else on Earth — for decades, functioning less like a single meal than like a long-lived oasis.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "resemble"
            },
            {
              "id": "B",
              "text": "sustain"
            },
            {
              "id": "C",
              "text": "assemble"
            },
            {
              "id": "D",
              "text": "conceal"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The carcass supports a community \"for decades\" on a seafloor \"starved of food,\" and the oasis comparison seals it: what an oasis does for life around it is sustain it.\n\n**The Full Solution:**\n- The blank's verb must describe what the carcass does for the community over a long span — provide for it, keep it alive.\n- \"Sustain\" pairs naturally with both the duration (\"for decades\") and the food-scarcity setup, and it matches the closing image of a long-lived oasis.\n\n**Why the other choices are wrong:**\n- A: \"Resemble\" would make the carcass look like a community rather than feed one, and the sentence's own comparison (\"functioning... like an oasis\") already handles resemblance elsewhere.\n- C: \"Assemble\" is the near-miss — the community does gather at the carcass, but the sentence's time span and oasis image describe ongoing support, not the initial gathering.\n- D: \"Conceal\" introduces hiding, which nothing in the passage suggests.",
          "_meta": {
            "anchor": "Whale falls as long-lived deep-sea food oases (unnamed marine biologists)"
          }
        },
        {
          "id": 331,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "By the early 1990s, the few dozen Florida panthers that remained were so inbred that kinked tails and heart defects had become widespread. Wildlife managers made a controversial decision: they released eight female pumas from Texas, the panther's closest living relative, into South Florida to ______ the population's depleted store of genetic variation. Within a decade the defects had grown rarer, and panther numbers had roughly tripled.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "replenish"
            },
            {
              "id": "B",
              "text": "stabilize"
            },
            {
              "id": "C",
              "text": "document"
            },
            {
              "id": "D",
              "text": "simplify"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The object of the blank is \"the population's depleted store of genetic variation,\" and what one does to a depleted store is replenish it — restock what has run low. The Texas pumas were introduced precisely to add new genetic material.\n\n**The Full Solution:**\n- \"Depleted\" is the key modifier: it frames the gene pool as a reserve that has been drawn down.\n- Releasing animals from a related population adds fresh variation to that reserve; \"replenish\" is the verb that matches both the metaphor and the biology, and the outcome (defects rarer, numbers tripled) confirms the restocking worked.\n\n**Why the other choices are wrong:**\n- B: \"Stabilize\" is the near-miss — managers did hope to stabilize the population, but the sentence's object is the depleted variation itself, which needed to be increased, not held steady at its dangerously low level.\n- C: \"Document\" turns an intervention into mere record-keeping; releasing pumas records nothing.\n- D: \"Simplify\" points the wrong way entirely — less variety was the problem, not the goal.",
          "_meta": {
            "anchor": "Florida panther genetic rescue via Texas pumas (unnamed wildlife managers)"
          }
        },
        {
          "id": 329,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "words-in-context",
          "type": "multiple-choice",
          "passage": "The choreographer Pearl Primus, who trained as an anthropologist, traveled through West Africa in the late 1940s to study dances in the communities where they were made. She objected to staging African dances as exotic spectacle; her aim was to present them with the ______ they carried in their home settings — as expressions of worship, work, and communal memory.",
          "question": "Which choice completes the text with the most logical and precise word or phrase?",
          "choices": [
            {
              "id": "A",
              "text": "novelty"
            },
            {
              "id": "B",
              "text": "caution"
            },
            {
              "id": "C",
              "text": "dignity"
            },
            {
              "id": "D",
              "text": "simplicity"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The sentence opposes \"exotic spectacle\" to what the dances carried at home — status as worship, work, and communal memory. The word for that seriousness of standing is \"dignity.\"\n\n**The Full Solution:**\n- The semicolon sets up a correction: not spectacle, but something the dances possess in their home settings.\n- The dash then specifies that something: the dances' roles in worship, labor, and memory — weighty communal functions. \"Dignity\" names the respect such roles confer.\n\n**Why the other choices are wrong:**\n- A: \"Novelty\" sits on the wrong side of the contrast — newness for its own sake is exactly what exotic staging traded on.\n- B: \"Caution\" describes a manner of handling something, not a quality the dances themselves carried in their home settings.\n- D: \"Simplicity\" is unsupported — the text says nothing about the dances being simple, and reducing them to simplicity would slight the roles the dash enumerates.",
          "_meta": {
            "anchor": "Pearl Primus — presenting West African dances with their home dignity, against exotic spectacle"
          }
        },
        {
          "id": 332,
          "difficulty": "medium",
          "band": 3,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "type": "multiple-choice",
          "passage": "In 1861, the photographer Carleton Watkins hauled a mammoth-plate camera — an instrument that exposed glass negatives the size of a serving tray — into California's Yosemite Valley. The prints he carried out showed granite walls and giant sequoias in astonishing detail, and they circulated among editors, scientists, and members of Congress, most of whom would never see the valley themselves. Three years later, when Congress passed the first federal law setting Yosemite aside for public protection, several lawmakers cited Watkins's photographs as evidence of what deserved saving.",
          "question": "Which choice best states the main purpose of the text?",
          "choices": [
            {
              "id": "A",
              "text": "To explain the technical challenges of operating a mammoth-plate camera in remote and rugged terrain"
            },
            {
              "id": "B",
              "text": "To argue that Congress would not have voted to protect Yosemite without the testimony of scientists who had visited the valley in person"
            },
            {
              "id": "C",
              "text": "To contrast the accuracy of Watkins's photographs with the exaggerated written descriptions of Yosemite circulating in the 1860s"
            },
            {
              "id": "D",
              "text": "To describe how one photographer's images helped build support for the legal protection of a natural landscape"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text follows a single thread from camera to law: Watkins made extraordinarily detailed prints, the prints reached decision-makers who could never visit the valley, and lawmakers cited them when Yosemite won federal protection. Its purpose is to describe that chain of influence.\n\n**The Full Solution:**\n- Each sentence advances the same story — making the images, circulating the images, and the images' role in the 1864 protection.\n- The closing sentence is the payoff, and D states the through-line that the whole text serves.\n\n**Why the other choices are wrong:**\n- A: The camera's unwieldiness appears in one aside; no technical challenges are actually explained.\n- B: The text says lawmakers cited the photographs — it nowhere weighs what Congress would have done without other kinds of testimony.\n- C: No written descriptions of Yosemite, exaggerated or otherwise, are mentioned, so no such contrast is drawn.",
          "_meta": {
            "anchor": "Carleton Watkins — Yosemite mammoth-plate photographs and the 1864 protection"
          }
        },
        {
          "id": 333,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "type": "multiple-choice",
          "passage": "In the late 1980s, oceanographer John Martin proposed that vast stretches of the ocean remain poor in phytoplankton not for lack of light or major nutrients but for lack of iron, a scarce trace element. Field experiments seeded patches of open water with dissolved iron, and the patches bloomed within days, turning visibly green with growth. __Yet the blooms proved short-lived, and only a small fraction of the carbon they absorbed sank into the deep ocean rather than returning quickly to the atmosphere.__ Accordingly, most researchers who accept Martin's account of what limits phytoplankton growth nonetheless doubt that fertilizing the ocean with iron could meaningfully slow climate change.",
          "question": "Which choice best describes the function of the underlined sentence in the text as a whole?",
          "choices": [
            {
              "id": "A",
              "text": "It presents evidence that Martin's hypothesis about what limits phytoplankton growth was mistaken"
            },
            {
              "id": "B",
              "text": "It explains why the seeded patches of ocean water bloomed within days of receiving dissolved iron"
            },
            {
              "id": "C",
              "text": "It concedes a weakness in the field experiments' design before the text goes on to defend large-scale ocean fertilization"
            },
            {
              "id": "D",
              "text": "It reports the limitation of the experimental results that grounds the doubt expressed in the sentence that follows"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The underlined sentence delivers the qualification — blooms die fast, little carbon actually sinks — and the final sentence's \"Accordingly\" builds directly on it: this limitation is why researchers doubt iron fertilization as a climate tool.\n\n**The Full Solution:**\n- The text separates two claims: Martin's hypothesis about iron (confirmed by the blooms) and the further idea that iron fertilization could slow climate change.\n- The underlined sentence supplies the evidence that splits them: the experiments vindicated the hypothesis while showing the carbon payoff to be small. The last sentence then draws exactly that distinction.\n\n**Why the other choices are wrong:**\n- A: The blooms confirmed the hypothesis; the underlined sentence limits the *application*, not the account of what limits growth.\n- B: The blooming is reported in the previous sentence, and the underlined sentence explains nothing about why it happened.\n- C: The text ends in doubt about fertilization, not a defense of it — the concession runs in the opposite direction.",
          "_meta": {
            "anchor": "John Martin — iron hypothesis confirmed, iron fertilization doubted; pivot sentence"
          }
        },
        {
          "id": 335,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "cross-text-connections",
          "type": "multiple-choice",
          "passages": [
            {
              "label": "Text 1",
              "text": "When people report picturing a scene in their heads, psychologist Stephen Kosslyn takes the report close to face value. In his experiments, participants asked to scan across a mental image of a memorized map took longer to reach distant locations than nearby ones, just as they would if moving their eyes across a physical map. Kosslyn argues that such results reveal mental imagery to be genuinely picture-like: a spatial representation whose parts preserve the distances of the scene it depicts."
            },
            {
              "label": "Text 2",
              "text": "Psychologist Zenon Pylyshyn contends that imagery experiments reveal less than they seem to. Participants know from ordinary experience how looking works — that crossing a greater distance takes more time — and they can unwittingly make their responses conform to that knowledge. On Pylyshyn's account, the mind's underlying representation is more like a structured description than a picture, and scanning times reflect participants' tacit knowledge of the world rather than the spatial format of their thoughts."
            }
          ],
          "question": "Based on the texts, how would Pylyshyn (Text 2) most likely respond to the argument presented in Text 1?",
          "choices": [
            {
              "id": "A",
              "text": "He would contend that the scanning times reflect participants' knowledge of how visual inspection works rather than demonstrating that their mental representations are picture-like."
            },
            {
              "id": "B",
              "text": "He would deny that participants in Kosslyn's experiments actually took longer to scan to distant locations on their mental images than to nearby ones."
            },
            {
              "id": "C",
              "text": "He would agree that mental images preserve the distances of remembered scenes but argue that they do so only for scenes participants have studied deliberately, such as memorized maps."
            },
            {
              "id": "D",
              "text": "He would maintain that scanning experiments could establish the format of mental imagery if participants were prevented from learning the experiments' purpose."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** Pylyshyn's stated position is that scanning times \"reflect participants' tacit knowledge of the world rather than the spatial format of their thoughts\" — precisely the reinterpretation of Kosslyn's evidence that A describes.\n\n**The Full Solution:**\n- Kosslyn's argument moves from data (distance-dependent scanning times) to conclusion (imagery is picture-like).\n- Pylyshyn accepts the data but blocks the inference: participants' knowledge of how looking works can produce the same timing pattern without any picture in the head. His response targets the interpretation, not the measurements.\n\n**Why the other choices are wrong:**\n- B: It has him disputing the experimental results themselves, when Text 2 explains those results rather than denying them.\n- C: It grants the picture-like account for memorized scenes — the very account he rejects in favor of structured descriptions.\n- D: It turns his critique into a methodological repair proposal; Text 2 offers no suggestion that better-shielded scanning experiments would settle the question.",
          "_meta": {
            "anchor": "Cross-text pair: Stephen Kosslyn (depictive imagery) vs. Zenon Pylyshyn (tacit knowledge) — mental imagery debate"
          }
        },
        {
          "id": 334,
          "difficulty": "hard",
          "band": 4,
          "domain": "craft-and-structure",
          "skill": "text-structure-and-purpose",
          "type": "multiple-choice",
          "passage": "Around 1100 CE, Cahokia, near present-day St. Louis, ranked among the largest settlements north of Mexico, its earthen mounds rising above plazas that could hold tens of thousands of people. Many early observers refused to credit the site's builders: they attributed the mounds to vanished foreign colonists rather than to the ancestors of the Native peoples living in the region. Excavation has since dismantled that fiction. Tools, refuse layers, and construction stages show the mounds rising basket-load by basket-load through generations of organized local labor — the work not of mysterious outsiders but of an Indigenous metropolis whose builders' descendants the early observers had dismissed.",
          "question": "Which choice best describes the overall structure of the text?",
          "choices": [
            {
              "id": "A",
              "text": "It poses a question about how an ancient city was built and evaluates several competing answers to that question"
            },
            {
              "id": "B",
              "text": "It narrates the founding, growth, and eventual abandonment of an ancient city in chronological order"
            },
            {
              "id": "C",
              "text": "It describes an ancient city, presents a mistaken account of the city's origins that early observers promoted, and then details the archaeological evidence that overturned that account"
            },
            {
              "id": "D",
              "text": "It summarizes a scholarly debate about an ancient city's population and concludes that the available evidence cannot resolve the debate"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The text makes three moves in order: it establishes Cahokia's scale, reports the early observers' false attribution of the mounds to foreign colonists, and then presents the excavated evidence — tools, refuse, construction stages — that overturned the false account.\n\n**The Full Solution:**\n- Sentence one describes the city. Sentence two states the mistaken origin story and who promoted it.\n- \"Excavation has since dismantled that fiction\" pivots explicitly, and the final sentence itemizes the evidence and the corrected conclusion. C tracks the sequence exactly.\n\n**Why the other choices are wrong:**\n- A: No question is posed, and only one wrong account is discussed — nothing is \"evaluated\" among competing answers; the fiction is simply refuted.\n- B: The text is organized around an argument about the builders' identity, not a chronological biography of the city, and abandonment never comes up.\n- D: The text ends in resolution, not stalemate — the evidence settles who built the mounds, and the population figure is scene-setting, not the debate's subject.",
          "_meta": {
            "anchor": "Cahokia — refutation of the foreign-builder myth by excavation evidence"
          }
        },
        {
          "id": 336,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "type": "multiple-choice",
          "passage": "When the Framingham Heart Study began in 1948, heart disease was the leading cause of death in the United States, yet physicians could say little about why some people developed it and others did not. The study's designers enrolled more than five thousand residents of one Massachusetts town and examined them every two years, recording blood pressure, cholesterol, smoking habits, and weight — and then waited to see who fell ill. Over the following decades, the accumulating records let researchers identify what they called risk factors: measurable traits that predict a person's chances of developing disease, a concept that now organizes preventive medicine well beyond cardiology.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "The Framingham study succeeded because the residents of a single Massachusetts town happened to be unusually representative of the American population as a whole."
            },
            {
              "id": "B",
              "text": "By tracking thousands of participants over decades, the Framingham study established the concept of risk factors on which preventive medicine still relies."
            },
            {
              "id": "C",
              "text": "Physicians in 1948 already suspected that blood pressure, cholesterol, smoking, and weight caused heart disease and designed the Framingham study primarily to confirm those suspicions."
            },
            {
              "id": "D",
              "text": "The Framingham study demonstrated that heart disease could be cured if its warning signs were detected early enough in a patient's life."
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text moves from ignorance (no one knew why some people developed heart disease) through method (thousands of residents, examined for decades) to legacy (the risk-factor concept that now organizes preventive medicine) — the exact arc B compresses.\n\n**The Full Solution:**\n- The first sentence establishes the problem the study confronted; the second describes its long-haul design.\n- The final sentence names the study's lasting contribution and generalizes it beyond cardiology, which is what makes B's \"still relies\" the right emphasis for the main idea.\n\n**Why the other choices are wrong:**\n- A: The text never claims the town was representative, let alone credits the study's success to that.\n- C: It reverses the setup — the text says physicians \"could say little\" about causes in 1948; the measured traits emerged as predictors from the data, not as prior suspicions being confirmed.\n- D: The study produced prediction, not cure; \"risk factors\" forecast disease, and the text says nothing about curing it.",
          "_meta": {
            "anchor": "Framingham Heart Study — origin of the risk-factor concept"
          }
        },
        {
          "id": 339,
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-textual",
          "type": "multiple-choice",
          "passage": "Historian of medicine Thomas McKeown argued that the steep decline in deaths from infectious disease in England between 1850 and 1950 owed little to doctors. Effective drugs against the era's great killers arrived only in the 1930s and 1940s, he observed, by which time mortality from those diseases had already fallen most of the way to modern levels. McKeown attributed the decline instead to rising standards of living — above all to better nutrition, which strengthened resistance to infection.",
          "question": "Which finding, if true, would most directly weaken McKeown's argument?",
          "choices": [
            {
              "id": "A",
              "text": "Local records show that death rates from waterborne diseases fell sharply in the decades immediately after towns built filtered water supplies and sewers, while deaths from diseases unrelated to water declined little until much later."
            },
            {
              "id": "B",
              "text": "Household surveys from the period show that as families' wages rose, they spent much of the increase on more and better food."
            },
            {
              "id": "C",
              "text": "Deaths from infectious disease declined over the same century in several other industrializing countries whose medical professions were organized quite differently from England's and whose towns invested in comparable sanitation over the same span of decades."
            },
            {
              "id": "D",
              "text": "The drugs introduced in the 1930s and 1940s proved even more effective against the era's major infectious diseases than physicians at the time recognized."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** McKeown's positive claim is that nutrition drove the decline. A finding that mortality fell precisely where and when towns built water infrastructure — and only for waterborne diseases — points to sanitation engineering, not diet, as the cause, striking directly at his attribution.\n\n**The Full Solution:**\n- The argument has two parts: doctors get little credit (timing of drugs), and rising living standards, chiefly nutrition, get most of it.\n- A leaves the anti-doctor timing untouched but supplies a rival cause with the signature nutrition lacks: disease-specific timing keyed to public-works projects. Better food should have lowered deaths across diseases together, not just waterborne ones after sewer construction.\n\n**Why the other choices are wrong:**\n- B: Wages flowing into better food is evidence for the nutrition account, not against it.\n- C: Parallel declines abroad under different medical systems echo his point that medicine mattered little; they do not challenge the nutrition attribution.\n- D: Drug effectiveness after the 1930s does not touch the argument's foundation — that most of the decline predated the drugs.",
          "_meta": {
            "anchor": "Thomas McKeown — nutrition thesis vs. sanitation-infrastructure counterevidence"
          }
        },
        {
          "id": 337,
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "type": "multiple-choice",
          "passage": "The grammatical machinery of a language is not designed; it condenses. Linguists have documented the process, called grammaticalization, in family after family: an ordinary content word is drafted into more abstract duty, its pronunciation erodes, and its old meaning fades until only a grammatical function remains. English speakers who say they are going to reconsider need not be going anywhere — a verb of motion has become a marker of future time, and its compressed spoken form has drifted still further from the original. What look like arbitrary particles and endings, on this view, are often the fossils of once-independent words.",
          "question": "Which choice best states the main idea of the text?",
          "choices": [
            {
              "id": "A",
              "text": "The English construction involving the phrase going to is unusual among grammatical markers in having developed from a verb of motion."
            },
            {
              "id": "B",
              "text": "Grammaticalization proceeds so slowly that linguists must reconstruct it indirectly rather than observing it in any living language."
            },
            {
              "id": "C",
              "text": "Languages abandon their grammatical markers once erosion makes the markers too short to be understood."
            },
            {
              "id": "D",
              "text": "Grammatical elements that appear arbitrary frequently originate as ordinary words whose sounds and meanings gradually wore away as they took on abstract functions."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The text's opening aphorism (grammar \"condenses\"), its account of the process (content word drafted into abstract duty, pronunciation eroding, meaning fading), and its closing image (particles as \"fossils of once-independent words\") all state one idea — the idea D restates.\n\n**The Full Solution:**\n- The passage is definition plus illustration: grammaticalization described in general terms, then shown in the English future marker derived from a motion verb.\n- The final sentence generalizes explicitly — seemingly arbitrary grammar is often the residue of ordinary words — and a main idea should match that summary sentence in scope.\n\n**Why the other choices are wrong:**\n- A: The going to example illustrates the process precisely because it is typical; the text says the process recurs \"in family after family,\" not that English is unusual.\n- B: The text presents grammaticalization as documented, and it never discusses the pace of change or any need for indirect reconstruction.\n- C: Erosion in the text wears words down into grammatical markers; nothing is said about markers being abandoned.",
          "_meta": {
            "anchor": "Grammaticalization — content words condensing into grammatical markers (unnamed linguists)"
          }
        },
        {
          "id": 343,
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "type": "multiple-choice",
          "passage": "A dance leaves thinner records than almost any other art. For works created before video recording became routine, dance historians attempting to reconstruct a piece must braid together whatever survives: a few minutes of silent film, production photographs, reviews, annotated programs, and the bodily memory of dancers who performed the work decades earlier — witnesses whose recollections are vivid but not always mutually consistent. Even the most careful reconstruction, then, ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "should rely on the surviving silent film rather than on dancers' recollections, since film cannot misremember what it recorded."
            },
            {
              "id": "B",
              "text": "will become more accurate as the dancers who performed the original work compare their memories with one another."
            },
            {
              "id": "C",
              "text": "is possible only for works that were extensively photographed during their first productions."
            },
            {
              "id": "D",
              "text": "is less a recovery of the original work than an informed interpretation of it, shaped by the gaps and disagreements within the surviving evidence."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The premises — records that are fragmentary, sources that conflict, memory that is vivid but inconsistent — cannot yield the original work itself; what they yield is a judgment call built from imperfect evidence. D draws exactly that conclusion, and no more.\n\n**The Full Solution:**\n- \"Even the most careful reconstruction, then\" signals a conclusion that must hold despite maximal care, so it must follow from the evidence's inherent limits, not from correctable sloppiness.\n- If the surviving materials are partial (a few minutes of film, photographs, programs) and the fullest sources disagree with one another, every reconstruction requires choosing among them — which is interpretation, not recovery.\n\n**Why the other choices are wrong:**\n- A: The film is described as covering only a few minutes; privileging it cannot reconstruct the rest of the work, and the passage ranks no source above the others.\n- B: Comparing inconsistent memories might help at the margins, but the conclusion must cover \"even the most careful reconstruction\" — the limit is in the evidence, not the diligence.\n- C: The passage treats photographs as one strand among several, never as a requirement for reconstruction to proceed.",
          "_meta": {
            "anchor": "Dance reconstruction from fragmentary records as interpretation (unnamed dance historians)"
          }
        },
        {
          "id": 340,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "type": "multiple-choice",
          "passage": "Insect-eating bats forage where insects are abundant, and restoration ecologists predicted that converting former cropland back to native prairie would increase bat activity. Using acoustic detectors that record bats' echolocation calls, a research team monitored four paired sites, each pair consisting of a restored prairie and an adjacent field still planted in row crops. The team concluded that the restored prairies supported more bat activity than the croplands, noting that ______",
          "questionTable": {
            "type": "table",
            "caption": "Mean bat echolocation calls recorded per night at paired prairie and cropland sites",
            "headers": [
              "Site pair",
              "Restored prairie",
              "Cropland"
            ],
            "rows": [
              [
                "1",
                "118",
                "46"
              ],
              [
                "2",
                "87",
                "51"
              ],
              [
                "3",
                "203",
                "88"
              ],
              [
                "4",
                "141",
                "63"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "detectors recorded more calls per night at the restored prairie than at the adjacent cropland in every one of the four site pairs."
            },
            {
              "id": "B",
              "text": "the restored prairie at site pair 3 recorded 203 calls per night, the highest number at any site in the study."
            },
            {
              "id": "C",
              "text": "the cropland at site pair 3 recorded more calls per night than the restored prairie at site pair 2 did."
            },
            {
              "id": "D",
              "text": "the number of echolocation calls recorded per night varied considerably more among the four restored prairies than it did among the four adjacent croplands."
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The conclusion compares prairies with croplands across the study, and the study's design makes that comparison pair by pair. A cites the decisive pattern: in all four pairs, the prairie side recorded more calls — 118 vs. 46, 87 vs. 51, 203 vs. 88, and 141 vs. 63.\n\n**The Full Solution:**\n- Paired sites exist so that each prairie is judged against its own neighboring cropland; consistent wins across every pair are exactly the evidence the conclusion needs.\n- A states that consistency, covering the entire table rather than any single site.\n\n**Why the other choices are wrong:**\n- B: One prairie's high count cannot support a conclusion about prairies versus croplands generally — it makes no comparison at all.\n- C: This cross-pair comparison is true (88 exceeds 87) but runs against the conclusion's grain, comparing sites that were never meant to be compared and muddying the pairwise pattern.\n- D: Variability among prairies says nothing about whether prairies outperform croplands.",
          "_meta": {
            "anchor": "Bat acoustic activity at paired restored-prairie vs. cropland sites (unnamed restoration ecologists)"
          }
        },
        {
          "id": 338,
          "difficulty": "medium",
          "band": 3,
          "domain": "information-and-ideas",
          "skill": "central-ideas-and-details",
          "type": "multiple-choice",
          "passage": "Until 1994, the Wollemi pine was known only from fossils, the youngest of which are about two million years old, and botanists reasonably assumed that the lineage was extinct. That year, a parks officer exploring a remote canyon northwest of Sydney, Australia, noticed a stand of unfamiliar trees with bubbly, chocolate-brown bark and fern-like foliage. Fewer than one hundred adult trees survive in the wild, all in a handful of neighboring gorges, and their exact location is kept secret to protect the trees from disease and trampling. Botanic gardens around the world now cultivate the species as insurance against the loss of the wild population.",
          "question": "According to the text, why is the location of the wild Wollemi pines kept secret?",
          "choices": [
            {
              "id": "A",
              "text": "To prevent rival botanists from collecting the trees' seeds for study"
            },
            {
              "id": "B",
              "text": "To protect the trees from disease and from trampling"
            },
            {
              "id": "C",
              "text": "To preserve the commercial value of the specimens cultivated in botanic gardens"
            },
            {
              "id": "D",
              "text": "To allow parks officers to monitor the trees without interference"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The text states the reason outright: the location \"is kept secret to protect the trees from disease and trampling.\"\n\n**The Full Solution:**\n- Detail questions are settled by the sentence that addresses the detail; here the third sentence attaches the secrecy directly to its purpose.\n- With fewer than one hundred wild adults confined to a few gorges, both named threats — introduced disease and physical damage from visitors — could reach the whole population, which is why secrecy is the protection of choice.\n\n**Why the other choices are wrong:**\n- A: No rival botanists or seed collecting appear anywhere in the text.\n- C: Botanic-garden cultivation is described as insurance for the species, and no commercial value is mentioned at all.\n- D: Parks officers appear only in the discovery story; monitoring is never given as the reason for secrecy.",
          "_meta": {
            "anchor": "Wollemi pine — 1994 rediscovery and secrecy of the wild stand"
          }
        },
        {
          "id": 341,
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "command-of-evidence-quantitative",
          "type": "multiple-choice",
          "passage": "In change-detection experiments, an image and a slightly altered copy of it alternate on a screen. When the two versions alternate directly, viewers spot the difference almost at once, but when a brief blank screen interrupts each alternation, the change can go unnoticed for dozens of cycles. A team of cognitive scientists argued that the blank works by masking the motion signal that would otherwise drag attention straight to the changing region; attention must then search the scene piece by piece, guided by expectations about which parts of a scene matter. Their account predicts a specific pattern in the results: ______",
          "questionTable": {
            "type": "table",
            "caption": "Mean alternation cycles before viewers detected the change",
            "headers": [
              "Change location",
              "No blank inserted",
              "Blank inserted"
            ],
            "rows": [
              [
                "Central to the scene's meaning",
                "1.2",
                "4.1"
              ],
              [
                "Marginal to the scene's meaning",
                "1.4",
                "17.8"
              ]
            ]
          },
          "question": "Which choice most effectively uses data from the table to complete the statement?",
          "choices": [
            {
              "id": "A",
              "text": "viewers detected central changes after an average of 1.2 cycles when no blank was inserted, the fastest detection in any condition."
            },
            {
              "id": "B",
              "text": "marginal changes took longer to detect than central changes in both conditions, by roughly the same margin in each."
            },
            {
              "id": "C",
              "text": "inserting the blank had little effect on the detection of central changes, which shows that motion signals matter only for marginal ones."
            },
            {
              "id": "D",
              "text": "the blank slowed detection of both kinds of change, but far more for marginal changes (1.4 to 17.8 cycles) than for central ones (1.2 to 4.1) — the gap expected if attention, once deprived of motion signals, goes first to what a scene is about."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The account makes a two-part prediction — masking the motion signal should slow everything, and expectation-guided search should then favor central content — and D reads both parts off the table: detection slows in each row, and the slowdown is far larger for marginal changes (1.4 to 17.8) than for central ones (1.2 to 4.1).\n\n**The Full Solution:**\n- Without the blank, location barely matters (1.2 vs. 1.4): the motion signal finds the change either way.\n- With the blank, the interaction appears: central changes cost a few extra cycles, marginal ones more than a dozen — the signature of a piece-by-piece search that starts with what the scene is about.\n\n**Why the other choices are wrong:**\n- A: A single cell, however fast, exhibits no pattern and tests no prediction.\n- B: The table contradicts it — the margins differ enormously between conditions (0.2 cycles vs. 13.7).\n- C: A jump from 1.2 to 4.1 cycles is more than a threefold slowing, not \"little effect,\" and the account says motion signals matter for both kinds of change.",
          "_meta": {
            "anchor": "Change blindness — blank-interval slowing by change centrality (unnamed cognitive scientists)"
          }
        },
        {
          "id": 342,
          "difficulty": "hard",
          "band": 4,
          "domain": "information-and-ideas",
          "skill": "inferences",
          "type": "multiple-choice",
          "passage": "Packrats collect twigs, seeds, and bones from within about fifty meters of their dens, and they urinate on the refuse piles they accumulate; in arid climates the urine crystallizes as it dries, entombing the debris in a hard, varnish-like mass. Some of these middens, tucked into desert caves and rock shelters, are more than 40,000 years old, and the plant fragments inside them can be identified to species and dated with precision. Because each midden holds only what once grew within a single packrat's small foraging radius, a sequence of middens of different ages from one canyon offers something no lake-sediment pollen core can: ______",
          "question": "Which choice most logically completes the text?",
          "choices": [
            {
              "id": "A",
              "text": "a way of estimating how far individual packrats were forced to travel from their dens as desert food plants grew scarce during dry periods."
            },
            {
              "id": "B",
              "text": "an archive of climate conditions integrated across an entire desert region rather than tied to any single location."
            },
            {
              "id": "C",
              "text": "a record of precisely which plants grew at a single spot at known moments across tens of thousands of years."
            },
            {
              "id": "D",
              "text": "evidence that desert plant communities have remained essentially unchanged for more than 40,000 years."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** Assemble the premises: fragments identifiable to species, datable with precision, and gathered only within fifty meters of a den. A dated series of such middens from one canyon therefore documents exactly what grew at that spot, time slice by time slice — the fine-grained local record C describes.\n\n**The Full Solution:**\n- The sentence's structure demands something a pollen core cannot supply. Pollen blows in from a whole region and blends sources; the midden's defining trait is the opposite — a tight, known collection radius.\n- Combine locality (fifty meters) with species-level identification and precise dates across a midden sequence, and the unique product is a site-specific vegetation history.\n\n**Why the other choices are wrong:**\n- A: The fifty-meter radius is a fixed premise of the argument, not a variable to be estimated — and travel distance is not something a pile of debris at the den records.\n- B: Regional integration is what pollen cores already provide; the passage is building toward what middens add, which is the reverse.\n- D: Nothing suggests stasis — dated middens of different ages are valuable precisely for revealing change.",
          "_meta": {
            "anchor": "Packrat middens as site-specific dated vegetation archives vs. pollen cores"
          }
        },
        {
          "id": 347,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "type": "multiple-choice",
          "passage": "The archive's collection of interviews, which preserves the voices of shipyard workers, cannery hands, and railroad porters recorded across three decades, ______ researchers a firsthand account of industrial labor that official records rarely capture.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "offer"
            },
            {
              "id": "B",
              "text": "offers"
            },
            {
              "id": "C",
              "text": "are offering"
            },
            {
              "id": "D",
              "text": "have offered"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The subject is the singular \"collection,\" so the verb must be the singular \"offers.\" The plural nouns stacked between subject and verb belong to modifying phrases, not to the subject.\n\n**The Full Solution:**\n- Strip the modifiers: \"The archive's collection... offers researchers a firsthand account.\"\n- \"Of interviews\" and the whole \"which preserves...\" clause describe the collection; none of their plural nouns (interviews, workers, hands, porters) governs the verb.\n- Note the text's own clue: the relative clause verb \"preserves\" already agrees with the singular \"collection.\"\n\n**Why the other choices are wrong:**\n- A: \"Offer\" agrees with the nearby plurals rather than with the head noun \"collection.\"\n- C: \"Are offering\" is plural and needlessly progressive for a standing property of the archive.\n- D: \"Have belonged\"-style perfect plural — \"have offered\" — both misses agreement and pushes into completed past what the sentence presents as the collection's ongoing value.",
          "_meta": {
            "anchor": "Oral-history archive collection — singular head noun across stacked plural modifiers",
            "rule": "subject-verb agreement across intervening prepositional and relative modifiers"
          }
        },
        {
          "id": 349,
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "type": "multiple-choice",
          "passage": "Working for a federal agency that documented the Depression's toll on farm families, ______ made photographs that gave economic catastrophe a human face and helped build public support for relief programs.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "Dorothea Lange's camera"
            },
            {
              "id": "B",
              "text": "the photographer Dorothea Lange"
            },
            {
              "id": "C",
              "text": "Dorothea Lange's photographs"
            },
            {
              "id": "D",
              "text": "it was Dorothea Lange who"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The opening modifier \"Working for a federal agency...\" must attach to whoever was doing the working, so the subject that follows the comma has to be the person herself: \"the photographer Dorothea Lange.\"\n\n**The Full Solution:**\n- Participial openers grab the nearest following subject. The sentence is only conventional if that subject names the worker.\n- B places Lange immediately after the modifier, and the rest of the sentence proceeds naturally: she \"made photographs that gave economic catastrophe a human face.\"\n\n**Why the other choices are wrong:**\n- A: It hands the modifier to her camera — the camera was not working for a federal agency — a classic dangling modifier.\n- C: It makes the photographs the workers, and doubly fails by having photographs make photographs.\n- D: The cleft \"it was... who\" puts the empty pronoun \"it\" in the modifier's grasp; \"it\" was not working for the agency, so the modifier still dangles.",
          "_meta": {
            "anchor": "Dorothea Lange — Depression-era documentary photography; dangling modifier repair",
            "rule": "introductory participial phrase must modify the main-clause subject"
          }
        },
        {
          "id": 345,
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "form-structure-and-sense",
          "type": "multiple-choice",
          "passage": "For decades, archaeologists could arrange the Ancestral Puebloan sites of the Southwest only in relative order, guessing at ages from styles of pottery and masonry. By matching the ring patterns of living trees to those in successively older wooden beams, the astronomer A. E. Douglass ______ an unbroken tree-ring sequence reaching back more than a thousand years, and by 1929 he could assign construction dates to hundreds of sites, sometimes to the very year a roof beam was cut.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "assembles"
            },
            {
              "id": "B",
              "text": "will assemble"
            },
            {
              "id": "C",
              "text": "has assembled"
            },
            {
              "id": "D",
              "text": "had assembled"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The sentence measures Douglass's work against a past reference point — \"by 1929 he could assign construction dates\" — and the past perfect \"had assembled\" is the form for an action completed before another past moment.\n\n**The Full Solution:**\n- The controlling clause is in the past (\"he could assign\"), and the assembling of the sequence is what made that past ability possible, so the assembling must be located earlier still.\n- English marks earlier-than-past with the past perfect; \"by 1929\" is the classic trigger for it.\n\n**Why the other choices are wrong:**\n- A: \"Assembles\" puts the work in the present, clashing with the past-tense frame of the sentence and the 1929 reference point.\n- B: \"Will assemble\" projects the work into the future, after the very date by which its results were already in use.\n- C: \"Has assembled\" ties the action to the present moment, but the sentence's timeline is anchored in the past; the present perfect cannot sit before \"by 1929 he could.\"",
          "_meta": {
            "anchor": "A. E. Douglass — tree-ring sequence dating Puebloan sites; past perfect",
            "rule": "past perfect for action completed before a past reference point"
          }
        },
        {
          "id": 346,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "type": "multiple-choice",
          "passage": "The Okavango River never reaches the sea; its waters spill instead into a vast inland delta on the edge of the Kalahari Desert. Although the delta floods during the region's dry ______ the timing is no accident: the water takes months to travel from summer rains in the Angolan highlands, arriving just as local rain has ceased.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "season."
            },
            {
              "id": "B",
              "text": "season,"
            },
            {
              "id": "C",
              "text": "season;"
            },
            {
              "id": "D",
              "text": "season"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** \"Although the delta floods during the region's dry season\" is an introductory subordinate clause, and the conventions call for a comma between such a clause and the main clause it introduces (\"the timing is no accident...\").\n\n**The Full Solution:**\n- \"Although\" makes its clause dependent — it cannot stand alone — so the boundary after it must be a comma, not sentence-ending punctuation.\n- The main clause follows immediately, and the comma marks where the introduction ends and the sentence's core begins.\n\n**Why the other choices are wrong:**\n- A: A period strands the \"Although\" clause as a sentence fragment.\n- C: A semicolon joins independent clauses; the clause before the blank is subordinate, so the semicolon creates the same fragment problem in different dress.\n- D: Omitting the comma runs the subordinate clause straight into the main clause; after an introductory dependent clause of this length, the comma is required.",
          "_meta": {
            "anchor": "Okavango Delta dry-season flood pulse — comma after introductory subordinate clause",
            "rule": "comma after an introductory subordinate clause"
          }
        },
        {
          "id": 348,
          "difficulty": "hard",
          "band": 4,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "type": "multiple-choice",
          "passage": "For a display at the 1900 world's fair in Paris, W. E. B. Du Bois and his students prepared dozens of hand-drawn charts documenting the economic progress of Black Americans in the decades since ______ in bold geometric forms and vivid color, the charts anticipated the data graphics of a century later.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "emancipation, rendered"
            },
            {
              "id": "B",
              "text": "emancipation rendered"
            },
            {
              "id": "C",
              "text": "emancipation and rendered"
            },
            {
              "id": "D",
              "text": "emancipation. Rendered"
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** Two full statements meet at the blank: the first ends at \"emancipation,\" and the second — \"Rendered in bold geometric forms and vivid color, the charts anticipated...\" — is an independent clause opening with a participial modifier. A period is the boundary that separates them cleanly.\n\n**The Full Solution:**\n- Read past the blank: \"in bold geometric forms and vivid color, the charts anticipated the data graphics of a century later\" has its own subject and verb, so a new sentence must begin with the participle that modifies \"the charts.\"\n- The period after \"emancipation\" closes the first sentence; capitalized \"Rendered\" launches the second, whose opening modifier attaches correctly to \"the charts.\"\n\n**Why the other choices are wrong:**\n- A: The comma yields a comma splice — two independent clauses separated only by a comma, with the participial phrase caught in between.\n- B: With no punctuation, the sentences fuse, and \"since emancipation rendered\" briefly misreads as emancipation doing the rendering.\n- C: \"And rendered\" pretends to coordinate, but there is no parallel element for \"rendered\" to join — the charts, not Du Bois's act of preparing, are what the participle describes — so the clauses remain tangled.",
          "_meta": {
            "anchor": "W. E. B. Du Bois — 1900 Paris data portraits; sentence boundary before a participial opener",
            "rule": "period between independent clauses where the second opens with a participial modifier"
          }
        },
        {
          "id": 344,
          "difficulty": "medium",
          "band": 3,
          "domain": "standard-english-conventions",
          "skill": "boundaries",
          "type": "multiple-choice",
          "passage": "The botanist Ynés Mexía did not begin collecting plants until she was ______ over the following thirteen years, she gathered some 145,000 specimens across Mexico and South America, including hundreds of species then unknown to science.",
          "question": "Which choice completes the text so that it conforms to the conventions of Standard English?",
          "choices": [
            {
              "id": "A",
              "text": "fifty-five,"
            },
            {
              "id": "B",
              "text": "fifty-five, and"
            },
            {
              "id": "C",
              "text": "fifty-five"
            },
            {
              "id": "D",
              "text": "fifty-five and"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The blank joins two independent clauses — \"The botanist Ynés Mexía did not begin collecting plants until she was fifty-five\" and \"over the following thirteen years, she gathered some 145,000 specimens...\" — and a comma plus the coordinating conjunction \"and\" is a standard way to join them.\n\n**The Full Solution:**\n- Confirm both halves stand alone: each has its own subject and verb and expresses a complete thought.\n- Independent clauses may be joined by a period, a semicolon, or a comma with a coordinating conjunction; B is the only option supplying one of these.\n\n**Why the other choices are wrong:**\n- A: A comma alone between independent clauses is a comma splice.\n- C: No punctuation at all fuses the clauses into a run-on.\n- D: \"And\" without the comma leaves two full independent clauses spliced together by a bare conjunction, which the conventions require a comma to accompany here.",
          "_meta": {
            "anchor": "Ynés Mexía — late-starting botanical collector; comma + conjunction boundary",
            "rule": "comma + coordinating conjunction between independent clauses"
          }
        },
        {
          "id": 352,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "type": "multiple-choice",
          "passage": "Languages carve the color spectrum into vocabulary in strikingly different ways: some supply their speakers with a dozen basic color words, others with as few as three. Surveys of vocabulary across hundreds of unrelated languages, however, find that the variation is far from arbitrary. ______ the inventories form an orderly sequence: if a language has only three basic color terms, they will name black, white, and red, and terms for green, yellow, and blue enter the vocabulary in a small number of predictable orders.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "Likewise,"
            },
            {
              "id": "B",
              "text": "In any case,"
            },
            {
              "id": "C",
              "text": "Instead,"
            },
            {
              "id": "D",
              "text": "Accordingly,"
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The previous sentence rejects one characterization — the variation \"is far from arbitrary\" — and the blank sentence supplies the correct characterization in its place: the inventories follow an orderly, predictable sequence. \"Instead\" is the transition for substituting the right account after negating the wrong one.\n\n**The Full Solution:**\n- Track the negation: not arbitrary. What then? The next sentence answers with the positive finding (black, white, red first; green, yellow, blue in predictable orders).\n- Replacement after denial is precisely the \"not X; instead, Y\" frame.\n\n**Why the other choices are wrong:**\n- A: \"Likewise\" would add a parallel point, but the sentence replaces a rejected description rather than echoing an accepted one.\n- B: \"In any case\" waves the previous sentence aside as if it did not matter, when the blank sentence depends on it directly.\n- D: \"Accordingly\" treats the orderly sequence as a consequence of non-arbitrariness, but the sequence is not caused by the survey finding — it is the content of that finding, stated positively.",
          "_meta": {
            "anchor": "Basic color-term hierarchies across languages — replacement transition"
          }
        },
        {
          "id": 351,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "type": "multiple-choice",
          "passage": "On the high plain around Lake Titicaca, Indigenous farmers of the pre-Columbian Andes built waru waru: raised planting beds separated by water-filled canals. The canal water absorbs the day's heat and releases it through the freezing highland night, keeping the air above the beds a few degrees warmer than the surrounding plain. ______ crops growing on the raised beds can survive frosts that destroy fields planted on open ground nearby — an effect agronomists confirmed when they rebuilt sections of the ancient beds and measured the difference.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "As a result,"
            },
            {
              "id": "B",
              "text": "Nevertheless,"
            },
            {
              "id": "C",
              "text": "For instance,"
            },
            {
              "id": "D",
              "text": "In comparison,"
            }
          ],
          "correctAnswer": "A",
          "explanation": "**Choice A is correct.** The passage lays out a mechanism — canal water banking daytime heat and releasing it at night — and the blank sentence states that mechanism's payoff: crops on the beds survive frosts that kill neighboring fields. Effect follows cause, so \"As a result\" is the logical connector.\n\n**The Full Solution:**\n- Sentence two explains the physics (a few degrees of nighttime warmth over the beds).\n- Sentence three reports the agricultural consequence of exactly those few degrees. The confirming experiment at the end reinforces that the relationship is causal, not merely associated.\n\n**Why the other choices are wrong:**\n- B: \"Nevertheless\" would make frost survival happen despite the warming, inverting the causal link the passage establishes.\n- C: \"For instance\" would offer the frost outcome as one example of the warming, but it is the warming's consequence — the passage gives no list of effects to exemplify.\n- D: \"In comparison\" signals a measured likeness between two items; though the sentence mentions nearby fields, its work is to state an outcome of the mechanism, and the comparison is internal to that outcome.",
          "_meta": {
            "anchor": "Waru waru raised-field frost protection on the Titicaca altiplano — cause-effect transition"
          }
        },
        {
          "id": 350,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "transitions",
          "type": "multiple-choice",
          "passage": "The spring phytoplankton bloom in cold northern seas was long explained by sunlight: as the days lengthen, the upper ocean warms and settles into layers, trapping drifting cells near the bright surface, where growth outruns loss. Satellite records complicate that story, revealing blooms that begin in the dead of winter, weeks before the surface warms or forms layers at all. ______ some oceanographers now argue that winter storms themselves set the stage — by churning phytoplankton through so deep a layer of water that the tiny grazers that normally hold them in check can no longer find them.",
          "question": "Which choice completes the text with the most logical transition?",
          "choices": [
            {
              "id": "A",
              "text": "In contrast,"
            },
            {
              "id": "B",
              "text": "Accordingly,"
            },
            {
              "id": "C",
              "text": "In the meantime,"
            },
            {
              "id": "D",
              "text": "Similarly,"
            }
          ],
          "correctAnswer": "B",
          "explanation": "**Choice B is correct.** The final sentence is the response the awkward evidence demands: because satellites show blooms starting before the sunlight mechanism could operate, oceanographers propose a new account. \"Accordingly\" signals a step taken in line with what was just established.\n\n**The Full Solution:**\n- Sentence two undermines the old explanation with winter-start blooms.\n- Sentence three offers a hypothesis engineered to fit that very observation — storms, a winter phenomenon, as the trigger. The new argument follows from the complication, so the transition must mark consequence.\n\n**Why the other choices are wrong:**\n- A: \"In contrast\" would oppose the final sentence to the satellite findings, but the storm hypothesis is motivated by those findings, not set against them.\n- C: \"In the meantime\" implies simultaneous, unrelated developments; the relationship here is evidence-then-response.\n- D: \"Similarly\" claims the storm proposal parallels the satellite records, but one is data and the other is an explanation prompted by the data — sequence, not resemblance.",
          "_meta": {
            "anchor": "Winter onset of phytoplankton blooms — storm-dilution hypothesis; consequence transition"
          }
        },
        {
          "id": 354,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "type": "multiple-choice",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Wangari Maathai (1940-2011) was a Kenyan biologist and the first woman in East and Central Africa to earn a doctorate.",
              "In 1977 she founded the Green Belt Movement, which paid rural Kenyan women small stipends to plant and tend trees.",
              "The movement's nurseries raised seedlings to counter deforestation, which had stripped hillsides, dried up streams, and degraded farmland.",
              "Women who participated earned income and gained standing in their communities while restoring the land they farmed.",
              "The movement has planted tens of millions of trees across Kenya.",
              "In 2004 Maathai received the Nobel Peace Prize, the first environmentalist so honored."
            ],
            "goal": "The student wants to emphasize how the Green Belt Movement joined environmental restoration to the economic empowerment of rural women."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Wangari Maathai, a Kenyan biologist and the first woman in East and Central Africa to earn a doctorate, received the Nobel Peace Prize in 2004 for her environmental work."
            },
            {
              "id": "B",
              "text": "The Green Belt Movement's nurseries raised seedlings to counter deforestation, which had stripped Kenyan hillsides, dried up streams, and degraded farmland."
            },
            {
              "id": "C",
              "text": "Deforestation in Kenya was so severe by 1977 that Wangari Maathai founded an organization dedicated to planting tens of millions of trees."
            },
            {
              "id": "D",
              "text": "Through the Green Belt Movement, Wangari Maathai turned tree planting into paid work for rural Kenyan women, so that the campaign against deforestation simultaneously restored degraded land and brought the women who carried it out income and standing in their communities."
            }
          ],
          "correctAnswer": "D",
          "explanation": "**Choice D is correct.** The goal names a junction — restoration joined to women's economic empowerment — and D is the only choice that makes the junction itself the sentence's point: paid tree-planting work restored land and delivered income and standing at once (\"simultaneously\").\n\n**The Full Solution:**\n- Both halves must appear and be linked: the environmental campaign (countering deforestation, restoring degraded land) and the empowerment (stipends, income, standing for rural women).\n- D fuses the notes' second, third, and fourth bullets into that single both-at-once claim, which is precisely the emphasis requested.\n\n**Why the other choices are wrong:**\n- A: It lists Maathai's credentials and prize but never mentions the movement's women or its restoration work.\n- B: It covers only the environmental half — seedlings against deforestation — with no women, wages, or standing.\n- C: It frames the movement purely as a tree-planting response to deforestation, again omitting the economic-empowerment half of the pairing.",
          "_meta": {
            "anchor": "Wangari Maathai — Green Belt Movement pairing restoration with women's livelihoods"
          }
        },
        {
          "id": 353,
          "difficulty": "hard",
          "band": 4,
          "domain": "expression-of-ideas",
          "skill": "rhetorical-synthesis",
          "type": "multiple-choice",
          "studentNotes": {
            "intro": "While researching a topic, a student has taken the following notes:",
            "bullets": [
              "Archaeologists have traditionally mapped ancient Maya sites on foot, cutting survey lines through dense forest.",
              "Lidar is an airborne laser-scanning technology that fires millions of pulses per second, letting researchers digitally strip away vegetation and expose the ground surface beneath.",
              "In 2018, a lidar survey covered more than 2,100 square kilometers of northern Guatemala.",
              "The survey revealed tens of thousands of previously unmapped structures, along with raised causeways, defensive earthworks, and extensive agricultural terracing.",
              "Population estimates for the region's Classic period have been revised sharply upward as a result.",
              "Ground crews must still excavate to confirm what the laser images show and to determine the ages of the structures."
            ],
            "goal": "The student wants to emphasize how lidar has changed archaeologists' understanding of the scale of ancient Maya settlement."
          },
          "question": "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
          "choices": [
            {
              "id": "A",
              "text": "Lidar is an airborne laser-scanning technology that fires millions of pulses per second from above the forest."
            },
            {
              "id": "B",
              "text": "Because dense forest covers many ancient Maya sites, archaeologists have traditionally mapped them on foot, cutting survey lines through the vegetation as they go."
            },
            {
              "id": "C",
              "text": "A 2018 lidar survey of northern Guatemala revealed tens of thousands of previously unmapped structures, forcing archaeologists to revise the region's ancient population estimates sharply upward."
            },
            {
              "id": "D",
              "text": "Although lidar images reveal structures, causeways, earthworks, and agricultural terracing beneath the forest canopy, ground crews must still excavate each site to confirm what the laser images show and to determine when the structures were built."
            }
          ],
          "correctAnswer": "C",
          "explanation": "**Choice C is correct.** The goal is about changed understanding of settlement scale, and C connects the instrument to exactly that change: the survey exposed tens of thousands of unmapped structures, and population estimates were revised sharply upward as a consequence.\n\n**The Full Solution:**\n- \"Changed understanding of scale\" requires two elements: what lidar found (structures by the tens of thousands) and what the finding did to prior belief (forced estimates upward).\n- C draws both from the notes and binds them causally with \"forcing,\" which is the emphasis the goal demands.\n\n**Why the other choices are wrong:**\n- A: It explains how the technology works and stops there — no discovery, no revision, no Maya settlement at all.\n- B: It describes the old method's difficulty without mentioning lidar's findings or any change in understanding.\n- D: It leads with a concession about lidar's limits and gives its emphasis to what excavation must still do, muting the transformation the student wants front and center.",
          "_meta": {
            "anchor": "2018 Guatemala lidar survey — Maya settlement scale revised upward"
          }
        }
      ]
    }
  ]
};

export default practiceTest3RW;
