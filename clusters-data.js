/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Strict UK English spelling & terms.
 * Protocol: Strict Mutual Domain Isolation, Zero Overlap, Clean Distractors.
 * Set ID: Set 06 | Date: 2026-10-12
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-12": {
    date: "2026-10-12",
    title: "Puzzle #06: Prime Elements",
    floors: {
      // Floor 01: Citrus Fruits + Domestic Cats (Distractors: Kitchenware)
      1: {
        tiles: ["ORANGE", "LEMON", "LIME", "SIAMESE", "PERSIAN", "BENGAL", "KETTLE", "PAN", "TEAPOT", "TOASTER", "BLENDER", "GRATER"],
        groups: [
          { words: ["ORANGE", "LEMON", "LIME"], category: "Citrus fruits", clue: "Citrus Fruits" },
          { words: ["SIAMESE", "PERSIAN", "BENGAL"], category: "Domestic cat breeds", clue: "Cat Breeds" }
        ]
      },

      // Floor 02: World Capitals + String Instruments (Distractors: Weather)
      2: {
        tiles: ["PARIS", "MADRID", "BERLIN", "VIOLIN", "CELLO", "HARP", "RAIN", "SNOW", "SLEET", "FOG", "HAIL", "FROST"],
        groups: [
          { words: ["PARIS", "MADRID", "BERLIN"], category: "European capital cities", clue: "Capital Cities" },
          { words: ["VIOLIN", "CELLO", "HARP"], category: "String musical instruments", clue: "String Instruments" }
        ]
      },

      // Floor 03: Primary Colours + Footwear (Distractors: Office Supplies)
      3: {
        tiles: ["RED", "BLUE", "YELLOW", "BOOTS", "SANDALS", "SLIPPERS", "STAPLER", "CLIPPER", "FOLDER", "BINDER", "PUNCH", "STAMP"],
        groups: [
          { words: ["RED", "BLUE", "YELLOW"], category: "Primary pigment colours", clue: "Primary Colours" },
          { words: ["BOOTS", "SANDALS", "SLIPPERS"], category: "Footwear items", clue: "Footwear Items" }
        ]
      },

      // Floor 04: Gemstones + Card Games (Distractors: Garden Tools)
      4: {
        tiles: ["SAPPHIRE", "EMERALD", "RUBY", "POKER", "BRIDGE", "CANASTA", "SPADE", "HOE", "RAKE", "SHEARS", "PRUNER", "TROWEL"],
        groups: [
          { words: ["SAPPHIRE", "EMERALD", "RUBY"], category: "Precious gemstones", clue: "Precious Gemstones" },
          { words: ["POKER", "BRIDGE", "CANASTA"], category: "Traditional card games", clue: "Card Games" }
        ]
      },

      // Floor 05: Dog Breeds + Baking Ingredients + Polygon Shapes (Distractors: Hand Tools)
      5: {
        tiles: ["BEAGLE", "POODLE", "BOXER", "FLOUR", "SUGAR", "YEAST", "PENTAGON", "HEXAGON", "OCTAGON", "HAMMER", "PLIERS", "CHISEL"],
        groups: [
          { words: ["BEAGLE", "POODLE", "BOXER"], category: "Dog breeds", clue: "Dog Breeds" },
          { words: ["FLOUR", "SUGAR", "YEAST"], category: "Baking ingredients", clue: "Baking Ingredients" },
          { words: ["PENTAGON", "HEXAGON", "OCTAGON"], category: "2D polygons", clue: "2D Polygons" }
        ]
      },

      // Floor 06: Chemical Elements + Olympic Sports + Tree Species (Distractors: Bedding)
      6: {
        tiles: ["CARBON", "OXYGEN", "NITROGEN", "FENCING", "ROWING", "ARCHERY", "WILLOW", "BIRCH", "CEDAR", "DUVET", "PILLOW", "SHEET"],
        groups: [
          { words: ["CARBON", "OXYGEN", "NITROGEN"], category: "Chemical elements", clue: "Chemical Elements" },
          { words: ["FENCING", "ROWING", "ARCHERY"], category: "Olympic sports", clue: "Olympic Sports" },
          { words: ["WILLOW", "BIRCH", "CEDAR"], category: "Deciduous & evergreen trees", clue: "Tree Species" }
        ]
      },

      // Floor 07: Monarchs + Atmospheric Layers + Geometry Terms (Distractors: Plumbing)
      7: {
        tiles: ["KING", "QUEEN", "EMPEROR", "TROPOSPHERE", "STRATOSPHERE", "MESOSPHERE", "RADIUS", "DIAMETER", "VECTOR", "VALVE", "PIPE", "FLANGE"],
        groups: [
          { words: ["KING", "QUEEN", "EMPEROR"], category: "Royal titles", clue: "Royal Titles" },
          { words: ["TROPOSPHERE", "STRATOSPHERE", "MESOSPHERE"], category: "Atmospheric layers", clue: "Atmospheric Layers" },
          { words: ["RADIUS", "DIAMETER", "VECTOR"], category: "Geometric measurements", clue: "Geometric Terms" }
        ]
      },

      // Floor 08: Classical Composers + Monetary Units + Constellations (Distractors: Hardware)
      8: {
        tiles: ["MOZART", "BEETHOVEN", "BACH", "POUND", "FRANC", "DINAR", "ORION", "TAURUS", "SCORPIUS", "BOLT", "SCREW", "WASHER"],
        groups: [
          { words: ["MOZART", "BEETHOVEN", "BACH"], category: "Classical composers", clue: "Classical Composers" },
          { words: ["POUND", "FRANC", "DINAR"], category: "World currencies", clue: "World Currencies" },
          { words: ["ORION", "TAURUS", "SCORPIUS"], category: "Astronomical constellations", clue: "Constellations" }
        ]
      },

      // Floor 09: Architectural Orders + Human Organs + Literary Genres (Distractors: Time Units)
      9: {
        tiles: ["TUSCAN", "COMPOSITE", "IONIC", "KIDNEY", "LIVER", "SPLEEN", "TRAGEDY", "SATIRE", "MEMOIR", "DECADE", "CENTURY", "EPOCH"],
        groups: [
          { words: ["TUSCAN", "COMPOSITE", "IONIC"], category: "Classical architectural orders", clue: "Architectural Orders" },
          { words: ["KIDNEY", "LIVER", "SPLEEN"], category: "Internal human organs", clue: "Human Organs" },
          { words: ["TRAGEDY", "SATIRE", "MEMOIR"], category: "Literary forms & genres", clue: "Literary Genres" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 Airtight Groups of 4)
      10: {
        tiles: [
          "SOLAR", "WIND", "HYDRO", "GEOTHERMAL",
          "MERCURY", "VENUS", "EARTH", "MARS",
          "GOLD", "SILVER", "COPPER", "PLATINUM",
          "OAK", "MAHOGANY", "TEAK", "WALNUT"
        ],
        groups: [
          { words: ["SOLAR", "WIND", "HYDRO", "GEOTHERMAL"], category: "Renewable energy sources", clue: "Renewable Energy" },
          { words: ["MERCURY", "VENUS", "EARTH", "MARS"], category: "Inner terrestrial planets", clue: "Terrestrial Planets" },
          { words: ["GOLD", "SILVER", "COPPER", "PLATINUM"], category: "Precious & noble metals", clue: "Noble Metals" },
          { words: ["OAK", "MAHOGANY", "TEAK", "WALNUT"], category: "Hardwood timber types", clue: "Hardwood Timbers" }
        ]
      }
    }
  }
};
