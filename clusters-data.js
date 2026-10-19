/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Strict UK English spelling & terms.
 * Set ID: Set 05 | Date: 2026-10-15
 *
 * v0.5 REVISION (draft): every word is now an everyday word and every category
 * is something people name in conversation. Writing rules used:
 *   1. Everyday words only. If a spell-checker underlines it, it is out.
 *   2. Tiles with two words are written with a space (EARL GREY, TOP HAT).
 *   3. Categories are things people say out loud, not trade or technical terms.
 *   4. No distractor may also fit a target group (the old AUGER / CUTTER problem).
 * NOTE: not checked against Sets 01-04 for overlap (those files were not seen).
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-15": {
    date: "2026-10-15",
    title: "Puzzle #09: Fresh Horizons",
    floors: {
      // Floor 01: Tea + Board Games (Distractors: Waterproof Coats)
      1: {
        tiles: ["EARL GREY", "MATCHA", "ASSAM", "MONOPOLY", "SCRABBLE", "CLUEDO", "ANORAK", "PARKA", "PONCHO", "CAGOULE", "FLEECE", "MAC"],
        groups: [
          { words: ["EARL GREY", "MATCHA", "ASSAM"], category: "Varieties of tea", clue: "Tea Varieties" },
          { words: ["MONOPOLY", "SCRABBLE", "CLUEDO"], category: "Classic board games", clue: "Board Games" }
        ]
      },

      // Floor 02: UK National Parks + Web Browsers (Distractors: Monopoly Tokens)
      2: {
        tiles: ["SNOWDONIA", "DARTMOOR", "EXMOOR", "SAFARI", "CHROME", "FIREFOX", "THIMBLE", "TOP HAT", "IRON", "BOOT", "CAR", "SHIP"],
        groups: [
          { words: ["SNOWDONIA", "DARTMOOR", "EXMOOR"], category: "UK National Parks", clue: "UK National Parks" },
          { words: ["SAFARI", "CHROME", "FIREFOX"], category: "Web browsers", clue: "Web Browsers" }
        ]
      },

      // Floor 03: Space Events + Woodworking Tools (Distractors: Plumbing Bits)
      3: {
        tiles: ["ECLIPSE", "SUPERNOVA", "AURORA", "CHISEL", "MALLET", "FILE", "PLUNGER", "WRENCH", "SOLDER", "PIPE", "VALVE", "WASHER"],
        groups: [
          { words: ["ECLIPSE", "SUPERNOVA", "AURORA"], category: "Astronomical events and phenomena", clue: "Space Phenomena" },
          { words: ["CHISEL", "MALLET", "FILE"], category: "Handheld woodworking tools", clue: "Woodworking Tools" }
        ]
      },

      // Floor 04: Classic Novelists + Clouds (Distractors: Furniture)
      4: {
        tiles: ["DICKENS", "AUSTEN", "HARDY", "CIRRUS", "STRATUS", "CUMULUS", "SOFA", "DESK", "CABINET", "BOOKSHELF", "CHAIR", "TABLE"],
        groups: [
          { words: ["DICKENS", "AUSTEN", "HARDY"], category: "19th-century British authors", clue: "Classic Novelists" },
          { words: ["CIRRUS", "STRATUS", "CUMULUS"], category: "Main cloud formations", clue: "Cloud Types" }
        ]
      },

      // Floor 05: Musical Groups + Pasta + Coffee (Distractors: Garden Plants)
      5: {
        tiles: ["TRIO", "QUARTET", "QUINTET", "SPAGHETTI", "PENNE", "FUSILLI", "ESPRESSO", "LATTE", "CAPPUCCINO", "FERN", "IVY", "ROSE"],
        groups: [
          { words: ["TRIO", "QUARTET", "QUINTET"], category: "Musical group sizes", clue: "Musical Groups" },
          { words: ["SPAGHETTI", "PENNE", "FUSILLI"], category: "Pasta shapes", clue: "Pasta Shapes" },
          { words: ["ESPRESSO", "LATTE", "CAPPUCCINO"], category: "Espresso-based coffee drinks", clue: "Coffee Drinks" }
        ]
      },

      // Floor 06: Breads + Sailing Ships + Winter Sports (Distractors: Baking Ingredients)
      6: {
        tiles: ["BAGUETTE", "CIABATTA", "SOURDOUGH", "GALLEON", "SCHOONER", "FRIGATE", "BOBSLEIGH", "LUGE", "CURLING", "YEAST", "FLOUR", "SUGAR"],
        groups: [
          { words: ["BAGUETTE", "CIABATTA", "SOURDOUGH"], category: "Types of bread", clue: "Breads" },
          { words: ["GALLEON", "SCHOONER", "FRIGATE"], category: "Historical sailing vessels", clue: "Sailing Ships" },
          { words: ["BOBSLEIGH", "LUGE", "CURLING"], category: "Winter Olympic sports", clue: "Winter Sports" }
        ]
      },

      // Floor 07: Dances + Cheeses + UK Rivers (Distractors: Parts of a Shirt)
      7: {
        tiles: ["WALTZ", "TANGO", "SAMBA", "CHEDDAR", "BRIE", "STILTON", "THAMES", "SEVERN", "TRENT", "COLLAR", "CUFF", "SLEEVE"],
        groups: [
          { words: ["WALTZ", "TANGO", "SAMBA"], category: "Ballroom and Latin dances", clue: "Dances" },
          { words: ["CHEDDAR", "BRIE", "STILTON"], category: "Types of cheese", clue: "Cheeses" },
          { words: ["THAMES", "SEVERN", "TRENT"], category: "Rivers of Britain", clue: "British Rivers" }
        ]
      },

      // Floor 08: Detectives + Shakespeare Plays + Dessert Pies (Distractors: Currencies)
      8: {
        tiles: ["POIROT", "MARPLE", "HOLMES", "HAMLET", "MACBETH", "OTHELLO", "PECAN", "RHUBARB", "BANOFFEE", "EURO", "POUND", "YEN"],
        groups: [
          { words: ["POIROT", "MARPLE", "HOLMES"], category: "Famous fictional detectives", clue: "Fictional Detectives" },
          { words: ["HAMLET", "MACBETH", "OTHELLO"], category: "Shakespeare plays", clue: "Shakespeare Plays" },
          { words: ["PECAN", "RHUBARB", "BANOFFEE"], category: "Traditional dessert pies", clue: "Dessert Pies" }
        ]
      },

      // Floor 09: Windows + Shellfish + Brass Instruments (Distractors: Rocks)
      9: {
        tiles: ["DORMER", "BAY", "SASH", "CRAB", "LOBSTER", "PRAWN", "TRUMPET", "TROMBONE", "TUBA", "GRANITE", "SLATE", "MARBLE"],
        groups: [
          { words: ["DORMER", "BAY", "SASH"], category: "Types of window", clue: "Window Styles" },
          { words: ["CRAB", "LOBSTER", "PRAWN"], category: "Shellfish", clue: "Shellfish" },
          { words: ["TRUMPET", "TROMBONE", "TUBA"], category: "Brass instruments", clue: "Brass Instruments" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 Groups of 4)
      10: {
        tiles: [
          "OXYGEN", "HYDROGEN", "NITROGEN", "HELIUM",
          "LONDON", "EDINBURGH", "CARDIFF", "BELFAST",
          "SOUP", "SALAD", "MAIN", "DESSERT",
          "ROMAN", "BRITISH", "OTTOMAN", "MONGOL"
        ],
        groups: [
          { words: ["OXYGEN", "HYDROGEN", "NITROGEN", "HELIUM"], category: "Gaseous chemical elements", clue: "Gaseous Elements" },
          { words: ["LONDON", "EDINBURGH", "CARDIFF", "BELFAST"], category: "Capital cities of the UK nations", clue: "UK Capitals" },
          { words: ["SOUP", "SALAD", "MAIN", "DESSERT"], category: "Standard restaurant meal courses", clue: "Meal Courses" },
          { words: ["ROMAN", "BRITISH", "OTTOMAN", "MONGOL"], category: "Major historical empires", clue: "Historic Empires" }
        ]
      }
    }
  }
};
