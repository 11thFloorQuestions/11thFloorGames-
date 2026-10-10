/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: UK English spelling, 100% fresh global themes, zero overlap.
 * Smooth difficulty scale from Floor 01 through Floor 10.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-11": {
    date: "2026-10-11",
    title: "Puzzle #03: Fresh Spectrum",
    floors: {
      // Floor 01 (Easy): 12 Tiles (2 groups of 3 + 6 clean distractors)
      1: {
        tiles: ["SOCCER", "BASKETBALL", "BASEBALL", "DOCTOR", "TEACHER", "LAWYER", "SPOON", "FORK", "KNIFE", "PEN", "PENCIL", "PAPER"],
        groups: [
          { words: ["SOCCER", "BASKETBALL", "BASEBALL"], category: "Global team sports", clue: "Team Sports" },
          { words: ["DOCTOR", "TEACHER", "LAWYER"], category: "Common professions", clue: "Professions" }
        ]
      },

      // Floor 02 (Easy): 12 Tiles (2 groups of 3 + 6 clean distractors)
      2: {
        tiles: ["EAGLE", "FALCON", "HAWK", "SHARK", "WHALE", "DOLPHIN", "OAK", "PINE", "BIRCH", "ROSE", "TULIP", "LILY"],
        groups: [
          { words: ["EAGLE", "FALCON", "HAWK"], category: "Birds of prey", clue: "Birds of Prey" },
          { words: ["SHARK", "WHALE", "DOLPHIN"], category: "Marine animals", clue: "Marine Animals" }
        ]
      },

      // Floor 03 (Moderate): 12 Tiles (2 groups of 3 + 6 clean distractors)
      3: {
        tiles: ["PIANO", "FLUTE", "DRUMS", "CIRCLE", "SQUARE", "TRIANGLE", "RED", "BLUE", "GREEN", "ONE", "TWO", "THREE"],
        groups: [
          { words: ["PIANO", "FLUTE", "DRUMS"], category: "Musical instruments", clue: "Musical Instruments" },
          { words: ["CIRCLE", "SQUARE", "TRIANGLE"], category: "Basic geometric shapes", clue: "Geometric Shapes" }
        ]
      },

      // Floor 04 (Moderate): 12 Tiles (2 groups of 3 + 6 clean distractors)
      4: {
        tiles: ["TOKYO", "PARIS", "BERLIN", "YANGTZE", "DANUBE", "VOLGA", "GOLD", "SILVER", "COPPER", "IRON", "TIN", "ZINC"],
        groups: [
          { words: ["TOKYO", "PARIS", "BERLIN"], category: "National capital cities", clue: "Capital Cities" },
          { words: ["YANGTZE", "DANUBE", "VOLGA"], category: "Major continental rivers", clue: "Continental Rivers" }
        ]
      },

      // Floor 05 (Challenging): 12 Tiles (3 groups of 3 + 3 clean distractors)
      5: {
        tiles: ["CHESS", "POKER", "DOMINOES", "TENNIS", "SQUASH", "BADMINTON", "HAMMER", "PLIERS", "SCREWDRIVER", "MAPLE", "CEDAR", "ELM"],
        groups: [
          { words: ["CHESS", "POKER", "DOMINOES"], category: "Traditional tabletop games", clue: "Tabletop Games" },
          { words: ["TENNIS", "SQUASH", "BADMINTON"], category: "Racket sports", clue: "Racket Sports" },
          { words: ["HAMMER", "PLIERS", "SCREWDRIVER"], category: "Hand tools", clue: "Hand Tools" }
        ]
      },

      // Floor 06 (Challenging): 12 Tiles (3 groups of 3 + 3 clean distractors)
      6: {
        tiles: ["MARS", "JUPITER", "SATURN", "DIAMOND", "RUBY", "EMERALD", "OXYGEN", "NITROGEN", "HYDROGEN", "GOLD", "LEAD", "MERCURY"],
        groups: [
          { words: ["MARS", "JUPITER", "SATURN"], category: "Solar system planets", clue: "Solar Planets" },
          { words: ["DIAMOND", "RUBY", "EMERALD"], category: "Precious gemstones", clue: "Precious Gemstones" },
          { words: ["OXYGEN", "NITROGEN", "HYDROGEN"], category: "Gaseous chemical elements", clue: "Gaseous Elements" }
        ]
      },

      // Floor 07 (Hard): 12 Tiles (3 groups of 3 + 3 clean distractors)
      7: {
        tiles: ["WHEAT", "RICE", "MAIZE", "COBRA", "VIPER", "PYTHON", "LION", "LEOPARD", "CHEETAH", "BEAR", "WOLF", "FOX"],
        groups: [
          { words: ["WHEAT", "RICE", "MAIZE"], category: "Global staple cereal crops", clue: "Staple Cereal Crops" },
          { words: ["COBRA", "VIPER", "PYTHON"], category: "Venomous & constrictor snakes", clue: "Snake Species" },
          { words: ["LION", "LEOPARD", "CHEETAH"], category: "Wild big cats", clue: "Wild Big Cats" }
        ]
      },

      // Floor 08 (Hard): 12 Tiles (3 groups of 3 + 3 clean distractors)
      8: {
        tiles: ["EVEREST", "K2", "KILIMANJARO", "SAHARA", "GOBI", "ATACAMA", "PACIFIC", "ATLANTIC", "INDIAN", "ALPS", "ANDES", "ROCKIES"],
        groups: [
          { words: ["EVEREST", "K2", "KILIMANJARO"], category: "Individual mountain peaks", clue: "Mountain Peaks" },
          { words: ["SAHARA", "GOBI", "ATACAMA"], category: "Major global deserts", clue: "Global Deserts" },
          { words: ["PACIFIC", "ATLANTIC", "INDIAN"], category: "Major world oceans", clue: "World Oceans" }
        ]
      },

      // Floor 09 (Expert): 12 Tiles (3 groups of 3 + 3 clean distractors)
      9: {
        tiles: ["PLATO", "ARISTOTLE", "SOCRATES", "BACH", "MOZART", "BEETHOVEN", "NEWTON", "EINSTEIN", "DARWIN", "HOMER", "VIRGIL", "OVID"],
        groups: [
          { words: ["PLATO", "ARISTOTLE", "SOCRATES"], category: "Ancient Greek philosophers", clue: "Greek Philosophers" },
          { words: ["BACH", "MOZART", "BEETHOVEN"], category: "Classical musical composers", clue: "Classical Composers" },
          { words: ["NEWTON", "EINSTEIN", "DARWIN"], category: "Historical revolutionary scientists", clue: "Revolutionary Scientists" }
        ]
      },

      // Floor 10 (Final Wall): 16 Tiles (4 groups of 4)
      10: {
        tiles: [
          "GOLD", "PLATINUM", "PALLADIUM", "RHODIUM",
          "GRANITE", "MARBLE", "SLATE", "BASALT",
          "EURO", "YEN", "DOLLAR", "FRANC",
          "TUDOR", "STUART", "BOURBON", "HABSBURG"
        ],
        groups: [
          { words: ["GOLD", "PLATINUM", "PALLADIUM", "RHODIUM"], category: "Precious metals", clue: "Precious Metals" },
          { words: ["GRANITE", "MARBLE", "SLATE", "BASALT"], category: "Types of geological rock", clue: "Geological Rocks" },
          { words: ["EURO", "YEN", "DOLLAR", "FRANC"], category: "International currencies", clue: "Global Currencies" },
          { words: ["TUDOR", "STUART", "BOURBON", "HABSBURG"], category: "European royal dynasties", clue: "European Royal Dynasties" }
        ]
      }
    }
  }
};
