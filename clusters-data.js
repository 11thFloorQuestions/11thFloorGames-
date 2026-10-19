/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Strict UK English spelling & terms.
 * Protocol: Strict Mutual Domain Isolation, Zero Overlap with Sets 01-04.
 * Set ID: Set 05 | Date: 2026-10-15
 * v0.5 edits: floor 3 distractors AUGER and CUTTER replaced (both are real
 * woodworking tools, so they made the floor unfair); floor 5 SESTET -> SEXTET.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-15": {
    date: "2026-10-15",
    title: "Puzzle #09: Fresh Horizons",
    floors: {
      // Floor 01: Types of Tea + Common Board Games (Distractors: Outdoor Waterproof Coats)
      1: {
        tiles: ["EARLGREY", "MATCHA", "ASSAM", "MONOPOLY", "SCRABBLE", "CLUEDO", "ANORAK", "PARKA", "PONCHO", "GAITER", "FLEECE", "MAC"],
        groups: [
          { words: ["EARLGREY", "MATCHA", "ASSAM"], category: "Varieties of tea", clue: "Tea Varieties" },
          { words: ["MONOPOLY", "SCRABBLE", "CLUEDO"], category: "Classic board games", clue: "Board Games" }
        ]
      },

      // Floor 02: UK National Parks + Web Browsers (Distractors: Monopoly Board Game Tokens)
      2: {
        tiles: ["SNOWDONIA", "DARTMOOR", "EXMOOR", "SAFARI", "CHROME", "FIREFOX", "THIMBLE", "TOPHAT", "IRON", "BOOT", "CAR", "SHIP"],
        groups: [
          { words: ["SNOWDONIA", "DARTMOOR", "EXMOOR"], category: "UK National Parks", clue: "UK National Parks" },
          { words: ["SAFARI", "CHROME", "FIREFOX"], category: "Web browsers", clue: "Web Browsers" }
        ]
      },

      // Floor 03: Astronomical Events + Handheld Woodworking Tools (Distractors: Plumbing Repair Tools)
      3: {
        tiles: ["ECLIPSE", "SUPERNOVA", "AURORA", "CHISEL", "MALLET", "FILE", "PLUNGER", "WRENCH", "SNAKE", "CRIMP", "SOLDER", "FLUX"],
        groups: [
          { words: ["ECLIPSE", "SUPERNOVA", "AURORA"], category: "Astronomical events and phenomena", clue: "Space Phenomena" },
          { words: ["CHISEL", "MALLET", "FILE"], category: "Handheld woodworking tools", clue: "Woodworking Tools" }
        ]
      },

      // Floor 04: Victorian Authors + Cloud Formations (Distractors: Office Furniture)
      4: {
        tiles: ["DICKENS", "AUSTEN", "HARDY", "CIRRUS", "STRATUS", "CUMULUS", "CREDENZA", "DESK", "CABINET", "BOOKSHELF", "CHAIR", "TABLE"],
        groups: [
          { words: ["DICKENS", "AUSTEN", "HARDY"], category: "19th-century British authors", clue: "Classic Novelists" },
          { words: ["CIRRUS", "STRATUS", "CUMULUS"], category: "Main cloud formations", clue: "Cloud Types" }
        ]
      },

      // Floor 05: Musical Ensembles + Structural Bridge Types + Espresso Drinks (Distractors: Garden Plants)
      5: {
        tiles: ["QUARTET", "SEXTET", "OCTET", "SUSPENSION", "ARCH", "CANTILEVER", "ESPRESSO", "LATTE", "CAPPUCCINO", "FERN", "HOSTA", "IVY"],
        groups: [
          { words: ["QUARTET", "SEXTET", "OCTET"], category: "Musical group sizes", clue: "Musical Ensembles" },
          { words: ["SUSPENSION", "ARCH", "CANTILEVER"], category: "Structural bridge designs", clue: "Bridge Types" },
          { words: ["ESPRESSO", "LATTE", "CAPPUCCINO"], category: "Espresso-based coffee drinks", clue: "Coffee Drinks" }
        ]
      },

      // Floor 06: Grain Flours + Historical Sailing Ships + Winter Olympic Sports (Distractors: Baking Fats)
      6: {
        tiles: ["SEMOLINA", "RICE", "SPELT", "SCHOONER", "GALLEY", "FRIGATE", "BOBSLEIGH", "SKELETON", "CURLING", "YEAST", "LARD", "PECTIN"],
        groups: [
          { words: ["SEMOLINA", "RICE", "SPELT"], category: "Types of grain flour", clue: "Grain Flours" },
          { words: ["SCHOONER", "GALLEY", "FRIGATE"], category: "Historical sailing vessels", clue: "Sailing Ships" },
          { words: ["BOBSLEIGH", "SKELETON", "CURLING"], category: "Winter Olympic sports", clue: "Winter Sports" }
        ]
      },

      // Floor 07: Geological Faults + Industrial Printing Methods + Ballroom Dances (Distractors: Tailoring Stitch Terms)
      7: {
        tiles: ["NORMAL", "REVERSE", "STRIKESLIP", "LITHOGRAPHY", "FLEXO", "GRAVURE", "WALTZ", "TANGO", "BOLERO", "PLEAT", "DART", "HEM"],
        groups: [
          { words: ["NORMAL", "REVERSE", "STRIKESLIP"], category: "Geological fault types", clue: "Geological Faults" },
          { words: ["LITHOGRAPHY", "FLEXO", "GRAVURE"], category: "Industrial printing processes", clue: "Printing Methods" },
          { words: ["WALTZ", "TANGO", "BOLERO"], category: "Ballroom and classical dances", clue: "Classical Dances" }
        ]
      },

      // Floor 08: Rope Knots + Ancient Historical Empires + Dessert Pies (Distractors: Foreign Currency Symbols)
      8: {
        tiles: ["FIGUREEIGHT", "SHEETBEND", "GRANNY", "ROMAN", "PERSIAN", "OTTONIAN", "PECAN", "RHUBARB", "BANOFFEE", "EURO", "POUND", "YEN"],
        groups: [
          { words: ["FIGUREEIGHT", "SHEETBEND", "GRANNY"], category: "Common rope knots", clue: "Rope Knots" },
          { words: ["ROMAN", "PERSIAN", "OTTONIAN"], category: "Historical empires", clue: "Ancient Empires" },
          { words: ["PECAN", "RHUBARB", "BANOFFEE"], category: "Traditional dessert pies", clue: "Dessert Pies" }
        ]
      },

      // Floor 09: Window Styles + Marine Crustaceans + Brass/Wind Instruments (Distractors: Geological Minerals)
      9: {
        tiles: ["DORMER", "BAY", "CASEMENT", "LOBSTER", "BARNACLE", "PRAWN", "PICCOLO", "CORNET", "TUBA", "QUARTZ", "FELDSPAR", "MICA"],
        groups: [
          { words: ["DORMER", "BAY", "CASEMENT"], category: "Architectural window styles", clue: "Window Styles" },
          { words: ["LOBSTER", "BARNACLE", "PRAWN"], category: "Marine crustaceans", clue: "Crustaceans" },
          { words: ["PICCOLO", "CORNET", "TUBA"], category: "Brass and wind instruments", clue: "Wind Instruments" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 Brand New Groups of 4)
      10: {
        tiles: [
          "OXYGEN", "HYDROGEN", "NITROGEN", "HELIUM",
          "LONDON", "EDINBURGH", "CARDIFF", "BELFAST",
          "SOUP", "SALAD", "MAIN", "DESSERT",
          "SOVIET", "BYZANTINE", "OTTOMAN", "MONGOL"
        ],
        groups: [
          { words: ["OXYGEN", "HYDROGEN", "NITROGEN", "HELIUM"], category: "Gaseous chemical elements", clue: "Gaseous Elements" },
          { words: ["LONDON", "EDINBURGH", "CARDIFF", "BELFAST"], category: "Capital cities of the UK nations", clue: "UK Capitals" },
          { words: ["SOUP", "SALAD", "MAIN", "DESSERT"], category: "Standard restaurant meal courses", clue: "Meal Courses" },
          { words: ["SOVIET", "BYZANTINE", "OTTOMAN", "MONGOL"], category: "Major historical empires", clue: "Historic Empires" }
        ]
      }
    }
  }
};
