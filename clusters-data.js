/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Strict UK English spelling & terms.
 * Protocol: Strict Mutual Domain Isolation, Zero Overlap, Clean Distractors.
 * Set ID: Set 05 | Date: 2026-10-15
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-15": {
    date: "2026-10-15",
    title: "Puzzle #09: Grand Ascent",
    floors: {
      // Floor 01: Dog Breeds + Primary Colors (Distractors: Tree Types)
      1: {
        tiles: ["BEAGLE", "POODLE", "BOXER", "RED", "YELLOW", "BLUE", "OAK", "BEECH", "BIRCH", "WILLOW", "MAPLE", "ASH"],
        groups: [
          { words: ["BEAGLE", "POODLE", "BOXER"], category: "Domestic dog breeds", clue: "Dog Breeds" },
          { words: ["RED", "YELLOW", "BLUE"], category: "Primary colors", clue: "Primary Colors" }
        ]
      },

      // Floor 02: Citrus Fruits + Chess Pieces (Distractors: Kitchen Appliances)
      2: {
        tiles: ["LEMON", "ORANGE", "LIME", "ROOK", "BISHOP", "KNIGHT", "TOASTER", "KETTLE", "BLENDER", "FRIDGE", "OVEN", "MICROWAVE"],
        groups: [
          { words: ["LEMON", "ORANGE", "LIME"], category: "Citrus fruits", clue: "Citrus Fruits" },
          { words: ["ROOK", "BISHOP", "KNIGHT"], category: "Standard chess pieces", clue: "Chess Pieces" }
        ]
      },

      // Floor 03: British Coins + Stringed Instruments (Distractors: Stationery Items)
      3: {
        tiles: ["PENNY", "SHILLING", "FLORIN", "VIOLIN", "CELLO", "HARP", "PENCIL", "RUBBER", "RULER", "FOLDER", "STAMP", "STAPLE"],
        groups: [
          { words: ["PENNY", "SHILLING", "FLORIN"], category: "British coins", clue: "British Coins" },
          { words: ["VIOLIN", "CELLO", "HARP"], category: "Stringed musical instruments", clue: "String Instruments" }
        ]
      },

      // Floor 04: UK Rivers + Metric Mass Units (Distractors: Card Suits)
      4: {
        tiles: ["THAMES", "SEVERN", "TRENT", "GRAM", "KILOGRAM", "TONNE", "SPADE", "CLUB", "HEART", "DIAMOND", "ACE", "JOKER"],
        groups: [
          { words: ["THAMES", "SEVERN", "TRENT"], category: "Major UK rivers", clue: "UK Rivers" },
          { words: ["GRAM", "KILOGRAM", "TONNE"], category: "Metric mass units", clue: "Metric Units" }
        ]
      },

      // Floor 05: Precious Gemstones + Card Games + Weather Types (Distractors: Fast Food Items)
      5: {
        tiles: ["DIAMOND", "RUBY", "EMERALD", "POKER", "SNAP", "WHIST", "RAIN", "SLEET", "HAIL", "BURGER", "CHIPS", "PIZZA"],
        groups: [
          { words: ["DIAMOND", "RUBY", "EMERALD"], category: "Precious gemstones", clue: "Precious Gems" },
          { words: ["POKER", "SNAP", "WHIST"], category: "Traditional card games", clue: "Card Games" },
          { words: ["RAIN", "SLEET", "HAIL"], category: "Precipitation weather types", clue: "Weather Types" }
        ]
      },

      // Floor 06: Olympic Athletics + Footwear Types + Cooking Methods (Distractors: Hardware Tools)
      6: {
        tiles: ["SPRINT", "HURDLES", "MARATHON", "BOOT", "SANDAL", "SLIPPER", "BOIL", "ROAST", "STEAM", "HAMMER", "PLIERS", "SAW"],
        groups: [
          { words: ["SPRINT", "HURDLES", "MARATHON"], category: "Running track events", clue: "Track Events" },
          { words: ["BOOT", "SANDAL", "SLIPPER"], category: "Everyday footwear items", clue: "Footwear Types" },
          { words: ["BOIL", "ROAST", "STEAM"], category: "Thermal cooking techniques", clue: "Cooking Methods" }
        ]
      },

      // Floor 07: Solar System Planets + Punctuation Marks + Tree Parts (Distractors: Reading Genres)
      7: {
        tiles: ["MARS", "JUPITER", "SATURN", "COMMA", "COLON", "HYPHEN", "ROOT", "TRUNK", "BRANCH", "THRILLER", "ROMANCE", "SCI FI"],
        groups: [
          { words: ["MARS", "JUPITER", "SATURN"], category: "Solar System planets", clue: "Solar Planets" },
          { words: ["COMMA", "COLON", "HYPHEN"], category: "Punctuation marks", clue: "Punctuation Marks" },
          { words: ["ROOT", "TRUNK", "BRANCH"], category: "Structural tree anatomy", clue: "Tree Parts" }
        ]
      },

      // Floor 08: European Capitals + Metal Elements + Geometric Shapes (Distractors: Sewing Notions)
      8: {
        tiles: ["PARIS", "MADRID", "BERLIN", "IRON", "COPPER", "SILVER", "SQUARE", "CIRCLE", "TRIANGLE", "THREAD", "BUTTON", "ZIPPER"],
        groups: [
          { words: ["PARIS", "MADRID", "BERLIN"], category: "European capital cities", clue: "European Capitals" },
          { words: ["IRON", "COPPER", "SILVER"], category: "Common metallic elements", clue: "Metallic Elements" },
          { words: ["SQUARE", "CIRCLE", "TRIANGLE"], category: "Two-dimensional geometric shapes", clue: "Geometric Shapes" }
        ]
      },

      // Floor 09: Human Joints + Musical Tempo Terms + Farm Animals (Distractors: Desktop Icons)
      9: {
        tiles: ["KNEE", "ELBOW", "ANKLE", "ALLEGRO", "LENTO", "PRESTO", "COW", "SHEEP", "PIG", "FOLDER", "TRASH", "FILE"],
        groups: [
          { words: ["KNEE", "ELBOW", "ANKLE"], category: "Major human skeletal joints", clue: "Human Joints" },
          { words: ["ALLEGRO", "LENTO", "PRESTO"], category: "Musical tempo directions", clue: "Musical Tempos" },
          { words: ["COW", "SHEEP", "PIG"], category: "Domestic livestock animals", clue: "Farm Animals" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 Airtight Groups of 4)
      10: {
        tiles: [
          "NORTH", "SOUTH", "EAST", "WEST",
          "GOLD", "SILVER", "BRONZE", "COPPER",
          "SPRING", "SUMMER", "AUTUMN", "WINTER",
          "HEART", "LIVER", "KIDNEY", "LUNG"
        ],
        groups: [
          { words: ["NORTH", "SOUTH", "EAST", "WEST"], category: "Cardinal compass directions", clue: "Compass Points" },
          { words: ["GOLD", "SILVER", "BRONZE", "COPPER"], category: "Metals used in coinage and medals", clue: "Medal Metals" },
          { words: ["SPRING", "SUMMER", "AUTUMN", "WINTER"], category: "Four annual seasons", clue: "Annual Seasons" },
          { words: ["HEART", "LIVER", "KIDNEY", "LUNG"], category: "Vital human internal organs", clue: "Internal Organs" }
        ]
      }
    }
  }
};
