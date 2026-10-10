/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Strict UK English spelling & terms.
 * Protocol: Strict Mutual Domain Isolation, Zero Overlap, Clean Distractors.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-11": {
    date: "2026-10-11",
    title: "Puzzle #05: Locked Circuit",
    floors: {
      // Floor 01: Food + Apparel (Distractors: Furniture)
      1: {
        tiles: ["PIZZA", "PASTA", "RISOTTO", "SHIRT", "TROUSERS", "JACKET", "CHAIR", "TABLE", "DESK", "SOFA", "BED", "CABINET"],
        groups: [
          { words: ["PIZZA", "PASTA", "RISOTTO"], category: "Classic Italian dishes", clue: "Italian Dishes" },
          { words: ["SHIRT", "TROUSERS", "JACKET"], category: "Clothing items", clue: "Clothing Items" }
        ]
      },

      // Floor 02: Marine Mammals + Vehicles (Distractors: Cutlery)
      2: {
        tiles: ["DOLPHIN", "PORPOISE", "ORCA", "SCOOTER", "BICYCLE", "MOPED", "FORK", "SPOON", "KNIFE", "PLATE", "BOWL", "GLASS"],
        groups: [
          { words: ["DOLPHIN", "PORPOISE", "ORCA"], category: "Toothed marine mammals", clue: "Marine Mammals" },
          { words: ["SCOOTER", "BICYCLE", "MOPED"], category: "Two-wheeled vehicles", clue: "Two-Wheeled Vehicles" }
        ]
      },

      // Floor 03: Brass Instruments + Natural Hazards (Distractors: Footwear)
      3: {
        tiles: ["TRUMPET", "TROMBONE", "TUBA", "VOLCANO", "EARTHQUAKE", "TSUNAMI", "BOOTS", "SHOES", "SANDALS", "SLIPPERS", "TRAINERS", "CLOGS"],
        groups: [
          { words: ["TRUMPET", "TROMBONE", "TUBA"], category: "Brass musical instruments", clue: "Brass Instruments" },
          { words: ["VOLCANO", "EARTHQUAKE", "TSUNAMI"], category: "Geological hazards", clue: "Geological Hazards" }
        ]
      },

      // Floor 04: Sciences + Performance Venues (Distractors: Stationery)
      4: {
        tiles: ["ASTRONOMY", "GEOLOGY", "BOTANY", "CINEMA", "ARENA", "STADIUM", "PEN", "PENCIL", "RULER", "ERASER", "STAPLER", "NOTEPAD"],
        groups: [
          { words: ["ASTRONOMY", "GEOLOGY", "BOTANY"], category: "Branches of natural science", clue: "Branches of Science" },
          { words: ["CINEMA", "ARENA", "STADIUM"], category: "Public entertainment venues", clue: "Entertainment Venues" }
        ]
      },

      // Floor 05: Seabirds + Culinary Spices + Mathematics (Distractors: Tools)
      5: {
        tiles: ["PENGUIN", "ALBATROSS", "PUFFIN", "CINNAMON", "CARDAMOM", "TURMERIC", "ALGEBRA", "GEOMETRY", "CALCULUS", "HAMMER", "PLIERS", "SCREWDRIVER"],
        groups: [
          { words: ["PENGUIN", "ALBATROSS", "PUFFIN"], category: "Seabird species", clue: "Seabird Species" },
          { words: ["CINNAMON", "CARDAMOM", "TURMERIC"], category: "Culinary ground spices", clue: "Culinary Spices" },
          { words: ["ALGEBRA", "GEOMETRY", "CALCULUS"], category: "Branches of mathematics", clue: "Mathematical Branches" }
        ]
      },

      // Floor 06: Solar System + Medical Specialties + Time Units (Distractors: Trees)
      6: {
        tiles: ["MERCURY", "VENUS", "JUPITER", "CARDIOLOGY", "NEUROLOGY", "PEDIATRICS", "SECOND", "MINUTE", "HOUR", "OAK", "PINE", "MAPLE"],
        groups: [
          { words: ["MERCURY", "VENUS", "JUPITER"], category: "Solar system planets", clue: "Solar Planets" },
          { words: ["CARDIOLOGY", "NEUROLOGY", "PEDIATRICS"], category: "Medical specialties", clue: "Medical Specialties" },
          { words: ["SECOND", "MINUTE", "HOUR"], category: "Units of time", clue: "Units of Time" }
        ]
      },

      // Floor 07: Philosophy + Currency + Aircraft (Distractors: Gardening)
      7: {
        tiles: ["LOGIC", "ETHICS", "AESTHETICS", "EURO", "YEN", "DOLLAR", "HELICOPTER", "GLIDER", "DIRIGIBLE", "HOE", "RAKE", "SPADE"],
        groups: [
          { words: ["LOGIC", "ETHICS", "AESTHETICS"], category: "Branches of philosophy", clue: "Philosophical Branches" },
          { words: ["EURO", "YEN", "DOLLAR"], category: "International currencies", clue: "Global Currencies" },
          { words: ["HELICOPTER", "GLIDER", "DIRIGIBLE"], category: "Non-commercial aircraft", clue: "Non-Commercial Aircraft" }
        ]
      },

      // Floor 08: Noble Gases + Calendar Months + Card Suits (Distractors: Measurements)
      8: {
        tiles: ["ARGON", "HELIUM", "NEON", "OCTOBER", "NOVEMBER", "DECEMBER", "HEARTS", "SPADES", "DIAMONDS", "METRE", "LITRE", "GRAM"],
        groups: [
          { words: ["ARGON", "HELIUM", "NEON"], category: "Noble gases", clue: "Noble Gases" },
          { words: ["OCTOBER", "NOVEMBER", "DECEMBER"], category: "Final calendar months", clue: "Final Months" },
          { words: ["HEARTS", "SPADES", "DIAMONDS"], category: "Playing card suits", clue: "Card Suits" }
        ]
      },

      // Floor 09: Architectural Orders + Eye Conditions + Chess Pieces (Distractors: Weather)
      9: {
        tiles: ["DORIC", "IONIC", "CORINTHIAN", "GLAUCOMA", "CATARACTS", "ASTIGMATISM", "BISHOP", "KNIGHT", "ROOK", "RAIN", "SNOW", "HAIL"],
        groups: [
          { words: ["DORIC", "IONIC", "CORINTHIAN"], category: "Classical architectural orders", clue: "Architectural Orders" },
          { words: ["GLAUCOMA", "CATARACTS", "ASTIGMATISM"], category: "Ophthalmic eye conditions", clue: "Eye Conditions" },
          { words: ["BISHOP", "KNIGHT", "ROOK"], category: "Chess pieces", clue: "Chess Pieces" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 Airtight Groups of 4)
      10: {
        tiles: [
          "NORTH", "SOUTH", "EAST", "WEST",
          "SPRING", "SUMMER", "AUTUMN", "WINTER",
          "SOLID", "LIQUID", "GAS", "PLASMA", "TROJAN", "WORM", "SPYWARE", "RANSOMWARE"
        ],
        groups: [
          { words: ["NORTH", "SOUTH", "EAST", "WEST"], category: "Cardinal compass directions", clue: "Compass Directions" },
          { words: ["SPRING", "SUMMER", "AUTUMN", "WINTER"], category: "Four annual seasons", clue: "Annual Seasons" },
          { words: ["SOLID", "LIQUID", "GAS", "PLASMA"], category: "Fundamental states of matter", clue: "States of Matter" },
          { words: ["TROJAN", "WORM", "SPYWARE", "RANSOMWARE"], category: "Malware types", clue: "Malware Types" }
        ]
      }
    }
  }
};
