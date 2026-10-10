/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: UK English spelling, non-recycled subjects, balanced difficulty.
 * Banned Topics: Mountains, Rivers, Capitals, Metals, Toddler Primaries.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-12": {
    date: "2026-10-12",
    title: "Puzzle #04: Fresh Circuit",
    floors: {
      // Floor 01: 12 Tiles (2 groups of 3 + 6 clean distractors)
      1: {
        tiles: ["ESPRESSO", "CAPPUCCINO", "MACCHIATO", "CROISSANT", "BRIOCHE", "BAGUETTE", "SHIRT", "TROUSERS", "JACKET", "FORK", "SPOON", "KNIFE"],
        groups: [
          { words: ["ESPRESSO", "CAPPUCCINO", "MACCHIATO"], category: "Classic coffee drinks", clue: "Classic Coffee Drinks" },
          { words: ["CROISSANT", "BRIOCHE", "BAGUETTE"], category: "French bakery items", clue: "French Bakery Items" }
        ]
      },

      // Floor 02: 12 Tiles (2 groups of 3 + 6 clean distractors)
      2: {
        tiles: ["ARCHERY", "FENCING", "EQUESTRIAN", "SAXOPHONE", "CLARINET", "OBOE", "SKATING", "SKIING", "CURLING", "PAINTER", "SCULPTOR", "ACTOR"],
        groups: [
          { words: ["ARCHERY", "FENCING", "EQUESTRIAN"], category: "Individual Olympic sports", clue: "Individual Olympic Sports" },
          { words: ["SAXOPHONE", "CLARINET", "OBOE"], category: "Woodwind instruments", clue: "Woodwind Instruments" }
        ]
      },

      // Floor 03: 12 Tiles (2 groups of 3 + 6 clean distractors)
      3: {
        tiles: ["CINNAMON", "CARDAMOM", "TURMERIC", "SALMON", "TROUT", "MACKEREL", "BASIL", "OREGANO", "THYME", "STEAK", "ROAST", "CHOPS"],
        groups: [
          { words: ["CINNAMON", "CARDAMOM", "TURMERIC"], category: "Culinary spices", clue: "Culinary Spices" },
          { words: ["SALMON", "TROUT", "MACKEREL"], category: "Oily fish species", clue: "Oily Fish Species" }
        ]
      },

      // Floor 04: 12 Tiles (2 groups of 3 + 6 clean distractors)
      4: {
        tiles: ["TSUNAMI", "AVALANCHE", "HURRICANE", "GOTHIC", "BAROQUE", "ROCOCO", "TORNADO", "DROUGHT", "FLOOD", "NOVEL", "POEM", "ESSAY"],
        groups: [
          { words: ["TSUNAMI", "AVALANCHE", "HURRICANE"], category: "Natural disasters", clue: "Natural Disasters" },
          { words: ["GOTHIC", "BAROQUE", "ROCOCO"], category: "Architectural styles", clue: "Architectural Styles" }
        ]
      },

      // Floor 05: 12 Tiles (3 groups of 3 + 3 clean distractors)
      5: {
        tiles: ["KANGAROO", "KOALA", "WOMBAT", "EAGLE", "FALCON", "OSPREY", "SAPPHIRE", "AMETHYST", "TOPAZ", "PENGUIN", "SEAL", "WALRUS"],
        groups: [
          { words: ["KANGAROO", "KOALA", "WOMBAT"], category: "Australian marsupials", clue: "Australian Marsupials" },
          { words: ["EAGLE", "FALCON", "OSPREY"], category: "Birds of prey", clue: "Birds of Prey" },
          { words: ["SAPPHIRE", "AMETHYST", "TOPAZ"], category: "Gemstones", clue: "Gemstones" }
        ]
      },

      // Floor 06: 12 Tiles (3 groups of 3 + 3 clean distractors)
      6: {
        tiles: ["HYPERBOLE", "METAPHOR", "ALLITERATION", "NEURON", "SYNAPSE", "DENDRITE", "OCTOPUS", "SQUID", "NAUTILUS", "GLUCOSE", "ENZYME", "PROTEIN"],
        groups: [
          { words: ["HYPERBOLE", "METAPHOR", "ALLITERATION"], category: "Literary devices", clue: "Literary Devices" },
          { words: ["NEURON", "SYNAPSE", "DENDRITE"], category: "Nervous system parts", clue: "Nervous System Parts" },
          { words: ["OCTOPUS", "SQUID", "NAUTILUS"], category: "Cephalopods", clue: "Cephalopods" }
        ]
      },

      // Floor 07: 12 Tiles (3 groups of 3 + 3 clean distractors)
      7: {
        tiles: ["HEMINGWAY", "ORWELL", "STEINBECK", "COPERNICUS", "GALILEO", "KEPLER", "BALLET", "OPERETTA", "PANTOMIME", "HAWKING", "NEWTON", "DARWIN"],
        groups: [
          { words: ["HEMINGWAY", "ORWELL", "STEINBECK"], category: "20th-century novelists", clue: "20th-Century Novelists" },
          { words: ["COPERNICUS", "GALILEO", "KEPLER"], category: "Historical astronomers", clue: "Historical Astronomers" },
          { words: ["BALLET", "OPERETTA", "PANTOMIME"], category: "Stage performance arts", clue: "Stage Performance Arts" }
        ]
      },

      // Floor 08: 12 Tiles (3 groups of 3 + 3 clean distractors)
      8: {
        tiles: ["MERCUTIO", "TYBALT", "BENVOLIO", "TITANIC", "LUSITANIA", "BRITANNIC", "COMMUTATIVE", "ASSOCIATIVE", "DISTRIBUTIVE", "HAMLET", "MACBETH", "OTHELLO"],
        groups: [
          { words: ["MERCUTIO", "TYBALT", "BENVOLIO"], category: "Romeo & Juliet characters", clue: "Romeo & Juliet Characters" },
          { words: ["TITANIC", "LUSITANIA", "BRITANNIC"], category: "Historic ocean liners", clue: "Historic Ocean Liners" },
          { words: ["COMMUTATIVE", "ASSOCIATIVE", "DISTRIBUTIVE"], category: "Algebraic laws", clue: "Algebraic Laws" }
        ]
      },

      // Floor 09: 12 Tiles (3 groups of 3 + 3 clean distractors)
      9: {
        tiles: ["GLAUCOMA", "CATARACTS", "ASTIGMATISM", "MONET", "REMBRANDT", "VERMEER", "HELICOPTER", "GLIDER", "DIRIGIBLE", "PICASSO", "DALÍ", "WARHOL"],
        groups: [
          { words: ["GLAUCOMA", "CATARACTS", "ASTIGMATISM"], category: "Eye conditions", clue: "Eye Conditions" },
          { words: ["MONET", "REMBRANDT", "VERMEER"], category: "Master painters", clue: "Master Painters" },
          { words: ["HELICOPTER", "GLIDER", "DIRIGIBLE"], category: "Non-commercial aircraft", clue: "Non-Commercial Aircraft" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 groups of 4)
      10: {
        tiles: [
          "IGNEOUS", "METAMORPHIC", "SEDIMENTARY", "VOLCANIC",
          "TROPOSPHERE", "STRATOSPHERE", "MESOSPHERE", "THERMOSPHERE",
          "TROJAN", "WORM", "SPYWARE", "RANSOMWARE",
          "DORIC", "IONIC", "CORINTHIAN", "TUSCAN"
        ],
        groups: [
          { words: ["IGNEOUS", "METAMORPHIC", "SEDIMENTARY", "VOLCANIC"], category: "Rock formation types", clue: "Rock Formation Types" },
          { words: ["TROPOSPHERE", "STRATOSPHERE", "MESOSPHERE", "THERMOSPHERE"], category: "Atmospheric layers", clue: "Atmospheric Layers" },
          { words: ["TROJAN", "WORM", "SPYWARE", "RANSOMWARE"], category: "Malware types", clue: "Malware Types" },
          { words: ["DORIC", "IONIC", "CORINTHIAN", "TUSCAN"], category: "Classical architectural orders", clue: "Classical Architectural Orders" }
        ]
      }
    }
  }
};
