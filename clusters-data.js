/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Strict UK English spelling & terms (FOOTBALL, COLOUR, TROUSERS).
 * Zero distractors, zero category crossovers, zero recycled subjects.
 * Every single tile belongs to an active target cluster on the floor.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-10": {
    date: "2026-10-10",
    title: "Puzzle #04: Clean Circuit",
    floors: {
      // Floor 01: 6 Tiles (2 groups of 3)
      1: {
        tiles: ["ESPRESSO", "CAPPUCCINO", "MACCHIATO", "CROISSANT", "BRIOCHE", "BAGUETTE"],
        groups: [
          { words: ["ESPRESSO", "CAPPUCCINO", "MACCHIATO"], category: "Classic coffee styles", clue: "Coffee Styles" },
          { words: ["CROISSANT", "BRIOCHE", "BAGUETTE"], category: "French bakery items", clue: "French Bakery Items" }
        ]
      },

      // Floor 02: 6 Tiles (2 groups of 3)
      2: {
        tiles: ["ARCHERY", "FENCING", "EQUESTRIAN", "SAXOPHONE", "CLARINET", "OBOE"],
        groups: [
          { words: ["ARCHERY", "FENCING", "EQUESTRIAN"], category: "Individual Olympic disciplines", clue: "Individual Olympic Disciplines" },
          { words: ["SAXOPHONE", "CLARINET", "OBOE"], category: "Woodwind instruments", clue: "Woodwind Instruments" }
        ]
      },

      // Floor 03: 6 Tiles (2 groups of 3)
      3: {
        tiles: ["CINNAMON", "CARDAMOM", "TURMERIC", "SALMON", "TROUT", "MACKEREL"],
        groups: [
          { words: ["CINNAMON", "CARDAMOM", "TURMERIC"], category: "Culinary spices", clue: "Culinary Spices" },
          { words: ["SALMON", "TROUT", "MACKEREL"], category: "Oily fish species", clue: "Oily Fish Species" }
        ]
      },

      // Floor 04: 6 Tiles (2 groups of 3)
      4: {
        tiles: ["TSUNAMI", "AVALANCHE", "HURRICANE", "BALLET", "OPERETTA", "PANTOMIME"],
        groups: [
          { words: ["TSUNAMI", "AVALANCHE", "HURRICANE"], category: "Severe natural disasters", clue: "Natural Disasters" },
          { words: ["BALLET", "OPERETTA", "PANTOMIME"], category: "Stage performance arts", clue: "Stage Performance Arts" }
        ]
      },

      // Floor 05: 9 Tiles (3 groups of 3)
      5: {
        tiles: ["KANGAROO", "KOALA", "WOMBAT", "EAGLE", "FALCON", "OSPREY", "SAPPHIRE", "AMETHYST", "TOPAZ"],
        groups: [
          { words: ["KANGAROO", "KOALA", "WOMBAT"], category: "Australian marsupials", clue: "Australian Marsupials" },
          { words: ["EAGLE", "FALCON", "OSPREY"], category: "Birds of prey", clue: "Birds of Prey" },
          { words: ["SAPPHIRE", "AMETHYST", "TOPAZ"], category: "Gemstones", clue: "Gemstones" }
        ]
      },

      // Floor 06: 9 Tiles (3 groups of 3)
      6: {
        tiles: ["HYPERBOLE", "METAPHOR", "ALLITERATION", "NEURON", "SYNAPSE", "DENDRITE", "OCTOPUS", "SQUID", "NAUTILUS"],
        groups: [
          { words: ["HYPERBOLE", "METAPHOR", "ALLITERATION"], category: "Literary devices", clue: "Literary Devices" },
          { words: ["NEURON", "SYNAPSE", "DENDRITE"], category: "Nervous system elements", clue: "Nervous System Elements" },
          { words: ["OCTOPUS", "SQUID", "NAUTILUS"], category: "Cephalopods", clue: "Cephalopods" }
        ]
      },

      // Floor 07: 9 Tiles (3 groups of 3)
      7: {
        tiles: ["HEMINGWAY", "ORWELL", "STEINBECK", "COPERNICUS", "GALILEO", "KEPLER", "COMMUTATIVE", "ASSOCIATIVE", "DISTRIBUTIVE"],
        groups: [
          { words: ["HEMINGWAY", "ORWELL", "STEINBECK"], category: "20th-century novelists", clue: "20th-Century Novelists" },
          { words: ["COPERNICUS", "GALILEO", "KEPLER"], category: "Historical astronomers", clue: "Historical Astronomers" },
          { words: ["COMMUTATIVE", "ASSOCIATIVE", "DISTRIBUTIVE"], category: "Algebraic laws", clue: "Algebraic Laws" }
        ]
      },

      // Floor 08: 9 Tiles (3 groups of 3)
      8: {
        tiles: ["MERCUTIO", "TYBALT", "BENVOLIO", "TITANIC", "LUSITANIA", "BRITANNIC", "HELICOPTER", "GLIDER", "DIRIGIBLE"],
        groups: [
          { words: ["MERCUTIO", "TYBALT", "BENVOLIO"], category: "Romeo and Juliet characters", clue: "Romeo & Juliet Characters" },
          { words: ["TITANIC", "LUSITANIA", "BRITANNIC"], category: "Historic ocean liners", clue: "Historic Ocean Liners" },
          { words: ["HELICOPTER", "GLIDER", "DIRIGIBLE"], category: "Non-commercial aircraft", clue: "Non-Commercial Aircraft" }
        ]
      },

      // Floor 09: 9 Tiles (3 groups of 3)
      9: {
        tiles: ["GLAUCOMA", "CATARACTS", "ASTIGMATISM", "MONET", "REMBRANDT", "VERMEER", "PICASSO", "DALÍ", "WARHOL"],
        groups: [
          { words: ["GLAUCOMA", "CATARACTS", "ASTIGMATISM"], category: "Ophthalmic eye conditions", clue: "Eye Conditions" },
          { words: ["MONET", "REMBRANDT", "VERMEER"], category: "Old master & impressionist painters", clue: "Master Painters" },
          { words: ["PICASSO", "DALÍ", "WARHOL"], category: "Modern & surrealist artists", clue: "Modern Artists" }
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
          { words: ["IGNEOUS", "METAMORPHIC", "SEDIMENTARY", "VOLCANIC"], category: "Rock formation types", clue: "Rock Formations" },
          { words: ["TROPOSPHERE", "STRATOSPHERE", "MESOSPHERE", "THERMOSPHERE"], category: "Atmospheric layers", clue: "Atmospheric Layers" },
          { words: ["TROJAN", "WORM", "SPYWARE", "RANSOMWARE"], category: "Malware types", clue: "Malware Types" },
          { words: ["DORIC", "IONIC", "CORINTHIAN", "TUSCAN"], category: "Classical architectural orders", clue: "Classical Architectural Orders" }
        ]
      }
    }
  }
};
