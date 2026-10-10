/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Airtight global logic, clean categorical separation, zero overlap.
 * Each group contains a clear clue string for the sequential clearance engine.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-08": {
    date: "2026-10-08",
    title: "Puzzle #01: Global Alignment",
    floors: {
      // Floor 01: 12 Tiles (2 target groups + distractors)
      1: {
        tiles: ["LONDON", "PARIS", "TOKYO", "NILE", "AMAZON", "YANGTZE", "PIANO", "GUITAR", "VIOLIN", "DRUM", "FLUTE", "TRUMPET"],
        groups: [
          { words: ["LONDON", "PARIS", "TOKYO"], category: "Major global capital cities", clue: "Capital Cities" },
          { words: ["NILE", "AMAZON", "YANGTZE"], category: "Major world rivers", clue: "Global Rivers" }
        ]
      },
      // Floor 02: 12 Tiles (2 target groups + distractors)
      2: {
        tiles: ["GOLD", "SILVER", "BRONZE", "DIAMOND", "RUBY", "EMERALD", "SQUARE", "CIRCLE", "TRIANGLE", "RECTANGLE", "OVAL", "PENTAGON"],
        groups: [
          { words: ["GOLD", "SILVER", "BRONZE"], category: "Precious metals / podium medals", clue: "Podium Metals" },
          { words: ["DIAMOND", "RUBY", "EMERALD"], category: "Precious gemstones", clue: "Gemstones" }
        ]
      },
      // Floor 03: 12 Tiles (2 target groups + distractors)
      3: {
        tiles: ["MARS", "VENUS", "JUPITER", "LION", "TIGER", "LEOPARD", "EAGLE", "HAWK", "FALCON", "OWL", "CROW", "SWAN"],
        groups: [
          { words: ["MARS", "VENUS", "JUPITER"], category: "Planets of the solar system", clue: "Solar Planets" },
          { words: ["LION", "TIGER", "LEOPARD"], category: "Large wild cats", clue: "Wild Cats" }
        ]
      },
      // Floor 04: 12 Tiles (2 target groups + distractors)
      4: {
        tiles: ["RED", "BLUE", "GREEN", "OAK", "PINE", "MAPLE", "APPLE", "BANANA", "ORANGE", "GRAPE", "MANGO", "PEACH"],
        groups: [
          { words: ["RED", "BLUE", "GREEN"], category: "Primary and standard colors", clue: "Primary Colors" },
          { words: ["OAK", "PINE", "MAPLE"], category: "Common tree species", clue: "Tree Species" }
        ]
      },
      // Floor 05: 12 Tiles (3 target groups + distractors)
      5: {
        tiles: ["FOOTBALL", "TENNIS", "CRICKET", "CHESS", "POKER", "BRIDGE", "VIOLIN", "CELLO", "FLUTE", "PYTHON", "VIPER", "COBRA"],
        groups: [
          { words: ["FOOTBALL", "TENNIS", "CRICKET"], category: "Popular global ball sports", clue: "Ball Sports" },
          { words: ["CHESS", "POKER", "BRIDGE"], category: "Strategic tabletop / card games", clue: "Strategy Games" },
          { words: ["VIOLIN", "CELLO", "FLUTE"], category: "Orchestral instruments", clue: "Orchestral Instruments" }
        ]
      },
      // Floor 06: 12 Tiles (3 target groups + distractors)
      6: {
        tiles: ["IRON", "COPPER", "TIN", "WHEAT", "RICE", "MAIZE", "MILK", "WATER", "JUICE", "SOFA", "TABLE", "CHAIR"],
        groups: [
          { words: ["IRON", "COPPER", "TIN"], category: "Industrial base metals", clue: "Base Metals" },
          { words: ["WHEAT", "RICE", "MAIZE"], category: "Major global staple grains", clue: "Staple Grains" },
          { words: ["MILK", "WATER", "JUICE"], category: "Common daily beverages", clue: "Daily Drinks" }
        ]
      },
      // Floor 07: 12 Tiles (3 target groups + distractors)
      7: {
        tiles: ["PLATO", "ARISTOTLE", "SOCRATES", "BACH", "MOZART", "BEETHOVEN", "NEWTON", "EINSTEIN", "DARWIN", "SHAKESPEARE", "DANTE", "HOMER"],
        groups: [
          { words: ["PLATO", "ARISTOTLE", "SOCRATES"], category: "Ancient Greek philosophers", clue: "Greek Philosophers" },
          { words: ["BACH", "MOZART", "BEETHOVEN"], category: "Classical composers", clue: "Classical Composers" },
          { words: ["NEWTON", "EINSTEIN", "DARWIN"], category: "Revolutionary scientists", clue: "Scientists" }
        ]
      },
      // Floor 08: 12 Tiles (3 target groups + distractors)
      8: {
        tiles: ["PACIFIC", "ATLANTIC", "INDIAN", "EVEREST", "K2", "KILIMANJARO", "SAHARA", "GOBI", "KALAHARI", "LYON", "MARSEILLE", "NICE"],
        groups: [
          { words: ["PACIFIC", "ATLANTIC", "INDIAN"], category: "Major world oceans", clue: "World Oceans" },
          { words: ["EVEREST", "K2", "KILIMANJARO"], category: "Highest mountain peaks", clue: "Mountain Peaks" },
          { words: ["SAHARA", "GOBI", "KALAHARI"], category: "Major global deserts", clue: "Global Deserts" }
        ]
      },
      // Floor 09: 12 Tiles (3 target groups + distractors)
      9: {
        tiles: ["TUDOR", "STUART", "WINDSOR", "SPRING", "SUMMER", "AUTUMN", "NORTH", "SOUTH", "EAST", "RAIN", "SNOW", "WIND"],
        groups: [
          { words: ["TUDOR", "STUART", "WINDSOR"], category: "Historic royal houses / dynasties", clue: "Royal Dynasties" },
          { words: ["SPRING", "SUMMER", "AUTUMN"], category: "Temperate calendar seasons", clue: "Calendar Seasons" },
          { words: ["NORTH", "SOUTH", "EAST"], category: "Primary cardinal directions", clue: "Cardinal Directions" }
        ]
      },
      // Floor 10: Final Wall (4 groups of 4)
      10: {
        tiles: [
          "THAMES", "SEVERN", "TRENT", "CLYDE",
          "GOLD", "SILVER", "BRONZE", "PLATINUM",
          "MARBLE", "GRANITE", "SLATE", "CHALK",
          "OXFORD", "BOND", "FLEET", "LOMBARD"
        ],
        groups: [
          { words: ["THAMES", "SEVERN", "TRENT", "CLYDE"], category: "Major regional river systems", clue: "UK River Systems" },
          { words: ["GOLD", "SILVER", "BRONZE", "PLATINUM"], category: "Precious metals / podium medals", clue: "Precious Metals" },
          { words: ["MARBLE", "GRANITE", "SLATE", "CHALK"], category: "Types of geological stone", clue: "Geological Stones" },
          { words: ["OXFORD", "BOND", "FLEET", "LOMBARD"], category: "Famous historic thoroughfares", clue: "Famous London Streets" }
        ]
      }
    }
  }
};
