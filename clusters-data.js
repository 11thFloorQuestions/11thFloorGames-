/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: UK English spelling, 100% unique global topics, zero overlap.
 * Completely fresh subject matter across all 10 floors.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-12": {
    date: "2026-10-12",
    title: "Puzzle #04: World Panorama",
    floors: {
      // Floor 01 (Easy): 12 Tiles (2 groups of 3 + 6 clean distractors)
      1: {
        tiles: ["VANILLA", "CHOCOLATE", "STRAWBERRY", "RED", "GREEN", "BLUE", "OAK", "PINE", "MAPLE", "DOG", "CAT", "RABBIT"],
        groups: [
          { words: ["VANILLA", "CHOCOLATE", "STRAWBERRY"], category: "Classic ice cream flavours", clue: "Ice Cream Flavours" },
          { words: ["RED", "GREEN", "BLUE"], category: "RGB additive primary colours", clue: "RGB Colours" }
        ]
      },

      // Floor 02 (Easy): 12 Tiles (2 groups of 3 + 6 clean distractors)
      2: {
        tiles: ["KANGAROO", "KOALA", "WALLABY", "PIANO", "DRUMS", "GUITAR", "TABLE", "CHAIR", "SOFA", "SHIRT", "TROUSERS", "JACKET"],
        groups: [
          { words: ["KANGAROO", "KOALA", "WALLABY"], category: "Australian marsupials", clue: "Australian Marsupials" },
          { words: ["SHIRT", "TROUSERS", "JACKET"], category: "Standard items of clothing", clue: "Clothing Items" }
        ]
      },

      // Floor 03 (Moderate): 12 Tiles (2 groups of 3 + 6 clean distractors)
      3: {
        tiles: ["BALLET", "OPERETTA", "PANTOMIME", "SOUP", "SALAD", "DESSERT", "FORK", "SPOON", "KNIFE", "PEN", "PENCIL", "PAPER"],
        groups: [
          { words: ["BALLET", "OPERETTA", "PANTOMIME"], category: "Forms of theatrical performance", clue: "Theatrical Performances" },
          { words: ["SOUP", "SALAD", "DESSERT"], category: "Standard restaurant meal courses", clue: "Meal Courses" }
        ]
      },

      // Floor 04 (Moderate): 12 Tiles (2 groups of 3 + 6 clean distractors)
      4: {
        tiles: ["ESPRESSO", "CAPPUCCINO", "LATTE", "GOLF", "ARCHERY", "FENCING", "COPPER", "IRON", "TIN", "BUS", "TRAIN", "TRAM"],
        groups: [
          { words: ["ESPRESSO", "CAPPUCCINO", "LATTE"], category: "Coffee preparations", clue: "Coffee Preparations" },
          { words: ["GOLF", "ARCHERY", "FENCING"], category: "Individual Olympic sports", clue: "Individual Olympic Sports" }
        ]
      },

      // Floor 05 (Challenging): 12 Tiles (3 groups of 3 + 3 clean distractors)
      5: {
        tiles: ["CINNAMON", "NUTMEG", "GINGER", "BEECH", "WILLOW", "ASH", "HONEY", "SYRUP", "TREACLE", "WHEAT", "RICE", "MAIZE"],
        groups: [
          { words: ["CINNAMON", "NUTMEG", "GINGER"], category: "Aromatic culinary spices", clue: "Culinary Spices" },
          { words: ["BEECH", "WILLOW", "ASH"], category: "Broadleaf deciduous trees", clue: "Deciduous Trees" },
          { words: ["HONEY", "SYRUP", "TREACLE"], category: "Viscous liquid sweeteners", clue: "Liquid Sweeteners" }
        ]
      },

      // Floor 06 (Challenging): 12 Tiles (3 groups of 3 + 3 clean distractors)
      6: {
        tiles: ["HELICOPTER", "GLIDER", "DIRIGIBLE", "SAPPHIRE", "AMETHYST", "TOPAZ", "SAXOPHONE", "CLARINET", "TRUMPET", "GOLD", "SILVER", "BRONZE"],
        groups: [
          { words: ["HELICOPTER", "GLIDER", "DIRIGIBLE"], category: "Non-commercial aircraft", clue: "Non-Commercial Aircraft" },
          { words: ["SAPPHIRE", "AMETHYST", "TOPAZ"], category: "Gemstone minerals", clue: "Gemstone Minerals" },
          { words: ["SAXOPHONE", "CLARINET", "TRUMPET"], category: "Jazz band brass & woodwind", clue: "Jazz Instruments" }
        ]
      },

      // Floor 07 (Hard): 12 Tiles (3 groups of 3 + 3 clean distractors)
      7: {
        tiles: ["TSUNAMI", "AVALANCHE", "HURRICANE", "TRIANGLE", "PENTAGON", "HEXAGON", "OXYGEN", "CARBON", "NITROGEN", "LEAD", "ZINC", "NICKEL"],
        groups: [
          { words: ["TSUNAMI", "AVALANCHE", "HURRICANE"], category: "Natural environmental disasters", clue: "Natural Disasters" },
          { words: ["TRIANGLE", "PENTAGON", "HEXAGON"], category: "Polygon geometric shapes", clue: "Polygon Shapes" },
          { words: ["OXYGEN", "CARBON", "NITROGEN"], category: "Essential biological non-metal elements", clue: "Biological Elements" }
        ]
      },

      // Floor 08 (Hard): 12 Tiles (3 groups of 3 + 3 clean distractors)
      8: {
        tiles: ["COMMUTATIVE", "ASSOCIATIVE", "DISTRIBUTIVE", "GLAUCOMA", "CATARACTS", "ASTIGMATISM", "OCTOPUS", "SQUID", "CUTTLEFISH", "COD", "TUNA", "SALMON"],
        groups: [
          { words: ["COMMUTATIVE", "ASSOCIATIVE", "DISTRIBUTIVE"], category: "Fundamental algebraic properties", clue: "Algebraic Properties" },
          { words: ["GLAUCOMA", "CATARACTS", "ASTIGMATISM"], category: "Medical eye conditions", clue: "Eye Conditions" },
          { words: ["OCTOPUS", "SQUID", "CUTTLEFISH"], category: "Cephalopod marine creatures", clue: "Cephalopods" }
        ]
      },

      // Floor 09 (Expert): 12 Tiles (3 groups of 3 + 3 clean distractors)
      9: {
        tiles: ["MONET", "REMBRANDT", "PICASSO", "NEURON", "SYNAPSE", "AXON", "METAPHOR", "ALLEGORY", "HYPERBOLE", "POETRY", "NOVEL", "DRAMA"],
        groups: [
          { words: ["MONET", "REMBRANDT", "PICASSO"], category: "Master visual painters", clue: "Master Painters" },
          { words: ["NEURON", "SYNAPSE", "AXON"], category: "Nervous system structures", clue: "Nervous System Components" },
          { words: ["METAPHOR", "ALLEGORY", "HYPERBOLE"], category: "Literary figurative devices", clue: "Literary Devices" }
        ]
      },

      // Floor 10 (Final Wall): 16 Tiles (4 groups of 4)
      10: {
        tiles: [
          "IGNEOUS", "METAMORPHIC", "SEDIMENTARY", "VOLCANIC",
          "SOLID", "LIQUID", "GAS", "PLASMA", "TROPOSPHERE",
          "STRATOSPHERE", "MESOSPHERE", "THERMOSPHERE",
          "TROJAN", "WORM", "SPYWARE", "RANSOMWARE"
        ],
        groups: [
          { words: ["IGNEOUS", "METAMORPHIC", "SEDIMENTARY", "VOLCANIC"], category: "Geological rock formation types", clue: "Rock Formations" },
          { words: ["SOLID", "LIQUID", "GAS", "PLASMA"], category: "Fundamental states of matter", clue: "States of Matter" },
          { words: ["TROPOSPHERE", "STRATOSPHERE", "MESOSPHERE", "THERMOSPHERE"], category: "Atmospheric layers", clue: "Atmospheric Layers" },
          { words: ["TROJAN", "WORM", "SPYWARE", "RANSOMWARE"], category: "Types of malicious computer software", clue: "Malware Types" }
        ]
      }
    }
  }
};
