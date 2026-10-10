/**
 * ============================================================================
 * 11TH FLOOR CLUSTERS - DAILY PUZZLE DATA (clusters-data.js)
 * ============================================================================
 * Standard: Pure UK English, airtight category separation, zero word overlaps.
 * ============================================================================
 */

window.CLUSTERS_DATA = {
  "2026-10-10": {
    date: "2026-10-10",
    title: "Puzzle #02: Clean Lines",
    floors: {
      // Floor 01: 12 Tiles (2 target groups of 3 + 6 clean distractors)
      1: {
        tiles: ["CHELSEA", "MILLWALL", "ARSENAL", "TENIS", "CRICKET", "RUGBY", "PIANO", "GUITAR", "VIOLIN", "DRUM", "FLUTE", "HARP"],
        groups: [
          { words: ["CHELSEA", "MILLWALL", "ARSENAL"], category: "London football clubs", clue: "London Football Clubs" },
          { words: ["TENNIS", "CRICKET", "RUGBY"], category: "British sports", clue: "British Sports" }
        ]
      },

      // Floor 02: 12 Tiles (2 target groups of 3 + 6 clean distractors)
      2: {
        tiles: ["COPPER", "BRONZE", "SILVER", "LION", "TIGER", "LEOPARD", "SPARROW", "ROBIN", "EAGLE", "PIGEON", "FALCON", "HAWK"],
        groups: [
          { words: ["COPPER", "BRONZE", "SILVER"], category: "Podium / coin metals", clue: "Coin Metals" },
          { words: ["LION", "TIGER", "LEOPARD"], category: "Big wild cats", clue: "Big Wild Cats" }
        ]
      },

      // Floor 03: 12 Tiles (2 target groups of 3 + 6 clean distractors)
      3: {
        tiles: ["MARS", "JUPITER", "SATURN", "OAK", "PINE", "BIRCH", "RED", "BLUE", "YELLOW", "GREEN", "PURPLE", "ORANGE"],
        groups: [
          { words: ["MARS", "JUPITER", "SATURN"], category: "Solar system planets", clue: "Solar Planets" },
          { words: ["OAK", "PINE", "BIRCH"], category: "Native British forest trees", clue: "Forest Trees" }
        ]
      },

      // Floor 04: 12 Tiles (2 target groups of 3 + 6 clean distractors)
      4: {
        tiles: ["THAMES", "SEVERN", "MERSEY", "EDINBURGH", "CARDIFF", "BELFAST", "TABLE", "CHAIR", "SOFA", "DESK", "BED", "CABINET"],
        groups: [
          { words: ["THAMES", "SEVERN", "MERSEY"], category: "Major UK rivers", clue: "Major UK Rivers" },
          { words: ["EDINBURGH", "CARDIFF", "BELFAST"], category: "UK home nation capital cities", clue: "UK Capital Cities" }
        ]
      },

      // Floor 05: 12 Tiles (3 target groups of 3 + 3 clean distractors)
      5: {
        tiles: ["CHESS", "POKER", "DRAUGHTS", "VIOLIN", "CELLO", "FLUTE", "COBRA", "VIPER", "PYTHON", "HAMSTER", "GERBIL", "RABBIT"],
        groups: [
          { words: ["CHESS", "POKER", "DRAUGHTS"], category: "Tabletop strategy games", clue: "Tabletop Games" },
          { words: ["VIOLIN", "CELLO", "FLUTE"], category: "Classical orchestra instruments", clue: "Orchestra Instruments" },
          { words: ["COBRA", "VIPER", "PYTHON"], category: "Venomous & constrictor snakes", clue: "Snake Species" }
        ]
      },

      // Floor 06: 12 Tiles (3 target groups of 3 + 3 clean distractors)
      6: {
        tiles: ["SPRING", "SUMMER", "AUTUMN", "NORTH", "SOUTH", "EAST", "WHEAT", "BARLEY", "OATS", "FORK", "SPOON", "KNIFE"],
        groups: [
          { words: ["SPRING", "SUMMER", "AUTUMN"], category: "Calendar seasons", clue: "Calendar Seasons" },
          { words: ["NORTH", "SOUTH", "EAST"], category: "Cardinal compass directions", clue: "Compass Directions" },
          { words: ["WHEAT", "BARLEY", "OATS"], category: "Cereal crop grains", clue: "Cereal Grains" }
        ]
      },

      // Floor 07: 12 Tiles (3 target groups of 3 + 3 clean distractors)
      7: {
        tiles: ["PLATO", "ARISTOTLE", "SOCRATES", "BACH", "MOZART", "BEETHOVEN", "NEWTON", "DARWIN", "EINSTEIN", "SHAKESPEARE", "DANTE", "HOMER"],
        groups: [
          { words: ["PLATO", "ARISTOTLE", "SOCRATES"], category: "Ancient Greek philosophers", clue: "Greek Philosophers" },
          { words: ["BACH", "MOZART", "BEETHOVEN"], category: "Classical composers", clue: "Classical Composers" },
          { words: ["NEWTON", "DARWIN", "EINSTEIN"], category: "Pioneering scientists", clue: "Pioneering Scientists" }
        ]
      },

      // Floor 08: 12 Tiles (3 target groups of 3 + 3 clean distractors)
      8: {
        tiles: ["PACIFIC", "ATLANTIC", "INDIAN", "EVEREST", "KILIMANJARO", "K2", "SAHARA", "GOBI", "KALAHARI", "PARIS", "BERLIN", "MADRID"],
        groups: [
          { words: ["PACIFIC", "ATLANTIC", "INDIAN"], category: "Global oceans", clue: "Global Oceans" },
          { words: ["EVEREST", "KILIMANJARO", "K2"], category: "Famous mountain peaks", clue: "Mountain Peaks" },
          { words: ["SAHARA", "GOBI", "KALAHARI"], category: "World deserts", clue: "World Deserts" }
        ]
      },

      // Floor 09: 12 Tiles (3 target groups of 3 + 3 clean distractors)
      9: {
        tiles: ["TUDOR", "STUART", "WINDSOR", "POUND", "EURO", "YEN", "GUITAR", "BASS", "DRUMS", "OVAL", "SQUARE", "CIRCLE"],
        groups: [
          { words: ["TUDOR", "STUART", "WINDSOR"], category: "British royal dynasties", clue: "Royal Dynasties" },
          { words: ["POUND", "EURO", "YEN"], category: "World currencies", clue: "World Currencies" },
          { words: ["GUITAR", "BASS", "DRUMS"], category: "Rock band instruments", clue: "Rock Instruments" }
        ]
      },

      // Floor 10: Final 16-Tile Wall (4 groups of 4)
      10: {
        tiles: [
          "TRENT", "CLYDE", "TYNE", "AVON",
          "GOLD", "PLATINUM", "PALLADIUM", "RHODIUM",
          "GRANITE", "MARBLE", "SLATE", "CHALK",
          "OXFORD", "BOND", "FLEET", "REGENT"
        ],
        groups: [
          { words: ["TRENT", "CLYDE", "TYNE", "AVON"], category: "British rivers", clue: "British Rivers" },
          { words: ["GOLD", "PLATINUM", "PALLADIUM", "RHODIUM"], category: "Precious metals", clue: "Precious Metals" },
          { words: ["GRANITE", "MARBLE", "SLATE", "CHALK"], category: "Types of rock & stone", clue: "Geological Stones" },
          { words: ["OXFORD", "BOND", "FLEET", "REGENT"], category: "Famous London streets", clue: "Famous London Streets" }
        ]
      }
    }
  }
};
