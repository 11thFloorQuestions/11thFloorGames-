/**
 * Think You Know Ball? 5.45 Special — Question Data
 * 45 Floors (45 Questions)
 * Brand Pillar: "Made by Humans!" — Strict UK English
 */

const fullQuestions = [
    // Floors 1–10: Modern Lore & Recent Highlights
    {
        floor: 1,
        question: "Which Arsenal player scored the opening goal with a header in their 2–0 Champions League win over Paris Saint-Germain at the Emirates?",
        options: ["Kai Havertz", "Bukayo Saka", "Gabriel Martinelli", "Leandro Trossard"],
        answer: "Kai Havertz",
        explanation: "Kai Havertz headed home Leandro Trossard's cross in the 20th minute."
    },
    {
        floor: 2,
        question: "Cole Palmer became the first player in Premier League history to score four goals in the first half of a match against which club?",
        options: ["Brighton & Hove Albion", "Everton", "Wolverhampton Wanderers", "Leicester City"],
        answer: "Brighton & Hove Albion",
        explanation: "Palmer scored all four goals within 20 first-half minutes at Stamford Bridge."
    },
    {
        floor: 3,
        question: "Which striker joined Tottenham Hotspur from Bournemouth for a club-record fee of up to £65 million?",
        options: ["Dominic Solanke", "Evanilson", "Richarlison", "Brennan Johnson"],
        answer: "Dominic Solanke",
        explanation: "Spurs secured Solanke following his 19-goal Premier League campaign for Bournemouth."
    },
    {
        floor: 4,
        question: "Which manager steered Aston Villa to 4th place to secure Champions League football for the club for the first time in 41 years?",
        options: ["Unai Emery", "Steven Gerrard", "Dean Smith", "Julen Lopetegui"],
        answer: "Unai Emery",
        explanation: "Unai Emery guided Villa back to Europe's elite competition after taking over in October 2022."
    },
    {
        floor: 5,
        question: "Which Aston Villa player scored a memorable late lob over Manuel Neuer to beat Bayern Munich 1–0 at Villa Park?",
        options: ["Jhon Durán", "Ollie Watkins", "Leon Bailey", "Morgan Rogers"],
        answer: "Jhon Durán",
        explanation: "Jhon Durán came off the bench to loft the ball over Neuer in the 79th minute."
    },
    {
        floor: 6,
        question: "Ademola Lookman scored a hat-trick in the 2024 UEFA Europa League final to end Bayer Leverkusen's 51-game unbeaten run playing for which club?",
        options: ["Atalanta", "Roma", "Benfica", "Sporting CP"],
        answer: "Atalanta",
        explanation: "Lookman scored all three goals in a clinical 3–0 victory in Dublin."
    },
    {
        floor: 7,
        question: "Which squad number does Declan Rice wear for Arsenal?",
        options: ["41", "4", "8", "6"],
        answer: "41",
        explanation: "Declan Rice retained his familiar number 41 shirt following his transfer from West Ham."
    },
    {
        floor: 8,
        question: "Who scored Manchester United's opening goal in their 2–1 FA Cup final victory over Manchester City at Wembley?",
        options: ["Alejandro Garnacho", "Kobbie Mainoo", "Bruno Fernandes", "Marcus Rashford"],
        answer: "Alejandro Garnacho",
        explanation: "Garnacho capitalised on a mix-up between Stefan Ortega and Joško Gvardiol to open the scoring."
    },
    {
        floor: 9,
        question: "Which German coach became the youngest permanent manager in Premier League history at age 31 when appointed by Brighton?",
        options: ["Fabian Hürzeler", "Kieran McKenna", "Russell Martin", "Danny Röhl"],
        answer: "Fabian Hürzeler",
        explanation: "Hürzeler took over at Brighton after guiding St Pauli to Bundesliga promotion."
    },
    {
        floor: 10,
        question: "Who scored Manchester City's 98th-minute equaliser in a dramatic 2–2 draw with 10-man Arsenal at the Etihad?",
        options: ["John Stones", "Erling Haaland", "Bernardo Silva", "Rúben Dias"],
        answer: "John Stones",
        explanation: "John Stones poked home from close range after Arsenal defended deep following Leandro Trossard's red card."
    },

    // Floors 11–20: Deeper PL Detail & Ground Lore
    {
        floor: 11,
        question: "Shane Long scored the fastest goal in Premier League history in 7.69 seconds. Which Watford defender's clearance did he block straight from kick-off?",
        options: ["Craig Cathcart", "Christian Kabasele", "Adrian Mariappa", "José Holebas"],
        answer: "Craig Cathcart",
        explanation: "Long charged down Cathcart's clearance right from the opening whistle at Vicarage Road."
    },
    {
        floor: 12,
        question: "Which opposition club visited Highbury for its final competitive match in May 2006, where Thierry Henry scored a hat-trick?",
        options: ["Wigan Athletic", "West Ham United", "Charlton Athletic", "Tottenham Hotspur"],
        answer: "Wigan Athletic",
        explanation: "Arsenal beat Wigan 4–2 to secure 4th place before kissing the Highbury turf goodbye."
    },
    {
        floor: 13,
        question: "Manchester United famously abandoned their grey kit at half-time at The Dell in 1996. Which strip did they change into for the second half?",
        options: ["Blue and white striped away kit", "Solid white third kit", "Red home kit", "All-black third kit"],
        answer: "Blue and white striped away kit",
        explanation: "Sir Alex Ferguson ordered his players to swap into their blue and white striped kit at half-time."
    },
    {
        floor: 14,
        question: "Richard Dunne shares the all-time record for most Premier League red cards (8) with Patrick Vieira and which former Everton striker?",
        options: ["Duncan Ferguson", "Roy Keane", "Vinnie Jones", "Lee Cattermole"],
        answer: "Duncan Ferguson",
        explanation: "Duncan Ferguson picked up 8 red cards during his fiery top-flight career."
    },
    {
        floor: 15,
        question: "Which player provided four assists in a single match on the opening weekend of the 2021–22 season against Leeds United?",
        options: ["Paul Pogba", "Bruno Fernandes", "Kevin De Bruyne", "Harry Kane"],
        answer: "Paul Pogba",
        explanation: "Paul Pogba set up four goals in Manchester United's 5–1 victory over Leeds at Old Trafford."
    },
    {
        floor: 16,
        question: "Which ground featured a famous pavilion cottage built into the corner of the stands between the Johnny Haynes Stand and the river end?",
        options: ["Craven Cottage", "Selhurst Park", "Gtech Community Stadium", "Kenilworth Road"],
        answer: "Craven Cottage",
        explanation: "The historic cottage pavilion sits in the corner of Fulham's riverside ground."
    },
    {
        floor: 17,
        question: "Which shirt sponsor featured on Newcastle United's chest during their 1995–96 'Entertainers' title charge under Kevin Keegan?",
        options: ["Newcastle Brown Ale", "McEwan's Lager", "Greenall's", "NTL"],
        answer: "Newcastle Brown Ale",
        explanation: "The iconic blue star logo of Newcastle Brown Ale adorned Newcastle's classic kits."
    },
    {
        floor: 18,
        question: "Which manager led Chelsea to a then-record 95 points in his debut 2004–05 season, conceding just 15 league goals?",
        options: ["José Mourinho", "Carlo Ancelotti", "Claudio Ranieri", "Guus Hiddink"],
        answer: "José Mourinho",
        explanation: "Mourinho's side lost only one match all season, setting an all-time defensive record."
    },
    {
        floor: 19,
        question: "Which opposition team did Tottenham Hotspur crush 9–1 at White Hart Lane in 2009, featuring five goals from Jermain Defoe?",
        options: ["Wigan Athletic", "Derby County", "Ipswich Town", "Hull City"],
        answer: "Wigan Athletic",
        explanation: "Spurs scored eight goals in the second half to record their biggest top-flight victory."
    },
    {
        floor: 20,
        question: "Which club played at 'The Nest' before moving to their current home at Selhurst Park in 1924?",
        options: ["Crystal Palace", "Millwall", "Charlton Athletic", "Brentford"],
        answer: "Crystal Palace",
        explanation: "Crystal Palace played at a converted brickworks known as The Nest before constructing Selhurst Park."
    },

    // Floors 21–30: Classic European Nights & Cup Lore
    {
        floor: 21,
        question: "Who scored Liverpool's stoppage-time 4–3 winner against Newcastle United in 1996, causing Kevin Keegan to slump over the advertising boards?",
        options: ["Stan Collymore", "Robbie Fowler", "Ian Rush", "John Barnes"],
        answer: "Stan Collymore",
        explanation: "Collymore struck in the 92nd minute to settle one of the Premier League's greatest ever matches."
    },
    {
        floor: 22,
        question: "Who scored Manchester United's opening header against Chelsea in the 2008 UEFA Champions League final in Moscow?",
        options: ["Cristiano Ronaldo", "Wayne Rooney", "Carlos Tevez", "Rio Ferdinand"],
        answer: "Cristiano Ronaldo",
        explanation: "Ronaldo met Wes Brown's cross in the 26th minute to open the scoring."
    },
    {
        floor: 23,
        question: "Which Spanish club did Liverpool beat 5–4 via an extra-time golden goal in the 2001 UEFA Cup final in Dortmund?",
        options: ["Alavés", "Valencia", "Deportivo La Coruña", "Espanyol"],
        answer: "Alavés",
        explanation: "Delfí Geli scored an own goal in extra time to seal Liverpool's thrilling cup treble."
    },
    {
        floor: 24,
        question: "Which goalkeeper famously went up for a 94th-minute corner and scored the header that saved Carlisle United from Football League relegation in 1999?",
        options: ["Jimmy Glass", "Neville Southall", "David Seaman", "Shaka Hislop"],
        answer: "Jimmy Glass",
        explanation: "On-loan goalkeeper Jimmy Glass volleyed home on the final day of the season to preserve Carlisle's league status."
    },
    {
        floor: 25,
        question: "Who scored the 40-yard lobbed volley over Peter Schmeichel to cap off Newcastle's iconic 5–0 win over Manchester United in 1996?",
        options: ["Philippe Albert", "David Ginola", "Les Ferdinand", "Rob Lee"],
        answer: "Philippe Albert",
        explanation: "Belgian centre-back Philippe Albert delicately chipped Schmeichel from 25 yards out."
    },
    {
        floor: 26,
        question: "Olivier Giroud scored an iconic scorpion kick off the crossbar for Arsenal against Crystal Palace on New Year's Day 2017. Who provided the cross?",
        options: ["Alexis Sánchez", "Mesut Özil", "Alexandre Lacazette", "Hector Bellerin"],
        answer: "Alexis Sánchez",
        explanation: "Alexis Sánchez crossed from the left wing after a lightning counter-attack."
    },
    {
        floor: 27,
        question: "Kevin Phillips won the European Golden Shoe in 2000 after scoring 30 Premier League goals. Who was his regular strike partner at Sunderland?",
        options: ["Niall Quinn", "Don Hutchison", "Alex Rae", "Kevin Kilbane"],
        answer: "Niall Quinn",
        explanation: "Phillips formed a legendary 'little and large' strike partnership with Niall Quinn."
    },
    {
        floor: 28,
        question: "Which manager famously sprinted down the Old Trafford touchline after Costinha scored a late equaliser for Porto in 2004?",
        options: ["José Mourinho", "Pep Guardiola", "Arsène Wenger", "Carlo Ancelotti"],
        answer: "José Mourinho",
        explanation: "Mourinho celebrated Costinha's 90th-minute strike that knocked Manchester United out of the Champions League."
    },
    {
        floor: 29,
        question: "Who scored the first-ever Premier League goal broadcast live on Sky Sports in August 1992 for Sheffield United against Manchester United?",
        options: ["Brian Deane", "Teddy Sheringham", "Alan Shearer", "Ian Wright"],
        answer: "Brian Deane",
        explanation: "Brian Deane scored after five minutes at Bramall Lane in a 2–1 victory over Alex Ferguson's side."
    },
    {
        floor: 30,
        question: "Which club were nicknamed 'The Crazy Gang' when they beat Liverpool to win the 1988 FA Cup Final?",
        options: ["Wimbledon", "Millwall", "Leeds United", "Queens Park Rangers"],
        answer: "Wimbledon",
        explanation: "Wimbledon earned the moniker due to their physical direct play, club culture, and dressing room pranks."
    },

    // Floors 31–40: Touchline Chaos, Cult Managers & Quirks
    {
        floor: 31,
        question: "Which manager brought a folder of written notes to a press conference to read out a list of 'facts' about Sir Alex Ferguson in 2009?",
        options: ["Rafa Benítez", "Kevin Keegan", "José Mourinho", "Arsène Wenger"],
        answer: "Rafa Benítez",
        explanation: "Rafa Benítez produced his sheet of notes during Liverpool's tense title race run-in."
    },
    {
        floor: 32,
        question: "Which referee mistakenly showed Croatian defender Josip Šimunić three yellow cards before sending him off at the 2006 World Cup?",
        options: ["Graham Poll", "Mike Dean", "Howard Webb", "Mark Clattenburg"],
        answer: "Graham Poll",
        explanation: "English referee Graham Poll failed to send off Šimunić after his second caution against Australia."
    },
    {
        floor: 33,
        question: "Who scored the winning goal for Greece in the UEFA Euro 2004 final against hosts Portugal with a 57th-minute header?",
        options: ["Angelos Charisteas", "Theodoros Zagorakis", "Giorgos Karagounis", "Dimitrios Papadopoulos"],
        answer: "Angelos Charisteas",
        explanation: "Charisteas headed home from a corner to complete one of international football's greatest ever shocks."
    },
    {
        floor: 34,
        question: "Which manager led Blackpool to the Premier League in 2010 and became famous for his colourful, rant-filled press conferences?",
        options: ["Ian Holloway", "Neil Warnock", "Harry Redknapp", "Sam Allardyce"],
        answer: "Ian Holloway",
        explanation: "Ian Holloway entertained fans throughout Blackpool's top-flight campaign with classic quotes."
    },
    {
        floor: 35,
        question: "Manchester City won the title in 2012 with Agüero's 93:20 winner against QPR. Who poked the ball through to assist Agüero's goal?",
        options: ["Mario Balotelli", "David Silva", "Yaya Touré", "Edin Džeko"],
        answer: "Mario Balotelli",
        explanation: "Mario Balotelli slipped while sliding on the turf to poke the ball into Agüero's path."
    },
    {
        floor: 36,
        question: "Which venue served as Manchester City's home stadium for 80 years before their relocation in 2003?",
        options: ["Maine Road", "Ewood Park", "Ayresome Park", "Burnden Park"],
        answer: "Maine Road",
        explanation: "Manchester City played at Maine Road in Moss Side from 1923 until moving to the City of Manchester Stadium."
    },
    {
        floor: 37,
        question: "Which goalkeeper was caught holding the ball for over six seconds against Sheffield Wednesday, conceding a rare indirect free-kick goal?",
        options: ["Mark Bosnich", "David Seaman", "Shaka Hislop", "Tim Flowers"],
        answer: "Mark Bosnich",
        explanation: "Bosnich held onto the ball too long inside his penalty area, resulting in an indirect free-kick goal."
    },
    {
        floor: 38,
        question: "Which club famously wore a clean, sponsorless retro kit during their rise from Non-League to the Premier League?",
        options: ["Luton Town", "Ipswich Town", "Sheffield United", "Coventry City"],
        answer: "Luton Town",
        explanation: "Luton Town won over shirt purists by wearing sponsorless kit designs during their climb up the divisions."
    },
    {
        floor: 39,
        question: "Who scored a hat-trick of headers for Everton against West Ham in 2000, legendary for his physical aerial dominance?",
        options: ["Duncan Ferguson", "Kevin Campbell", "Francis Jeffers", "Paul Rideout"],
        answer: "Duncan Ferguson",
        explanation: "Duncan Ferguson dominated the West Ham defence to score three headers at Goodison Park."
    },
    {
        floor: 40,
        question: "Which video game console brand had their Dreamcast logo emblazoned on Arsenal's home kit around the turn of the millennium?",
        options: ["SEGA", "PlayStation", "Nintendo", "Xbox"],
        answer: "SEGA",
        explanation: "Arsenal wore SEGA on their away shirt and Dreamcast on their home shirt between 1999 and 2002."
    },

    // Floors 41–45: Oooh Tricky Finishers
    {
        floor: 41,
        question: "Which Spanish midfielder provided four assists in a single match during Arsenal's 7–3 demolition of Newcastle United in 2012?",
        options: ["Santi Cazorla", "Mikel Arteta", "Cesc Fàbregas", "José Antonio Reyes"],
        answer: "Santi Cazorla",
        explanation: "Santi Cazorla ran the show at the Emirates, setting up four goals in a ten-goal thriller."
    },
    {
        floor: 42,
        question: "Which goalkeeper saved a John Aldridge penalty in the 1988 FA Cup Final to become the first goalkeeper to captain an FA Cup-winning side?",
        options: ["Dave Beasant", "Bruce Grobbelaar", "Neville Southall", "Ray Clemence"],
        answer: "Dave Beasant",
        explanation: "Dave Beasant captained Wimbledon and saved Aldridge's penalty to secure a famous 1–0 win."
    },
    {
        floor: 43,
        question: "Who scored the 90th-minute cross-shot for West Ham United in the 2006 FA Cup Final before Steven Gerrard's famous long-range equaliser?",
        options: ["Paul Konchesky", "Dean Ashton", "Marlon Harewood", "Yossi Benayoun"],
        answer: "Paul Konchesky",
        explanation: "Paul Konchesky's looping cross floated over Pepe Reina into the far corner to make it 3–2 to West Ham."
    },
    {
        floor: 44,
        question: "Which manager brought a London Underground travelcard to his opening press conference at White Hart Lane in 1997, calling it 'the ticket of his dreams'?",
        options: ["Christian Gross", "Jacques Santini", "Juande Ramos", "Gerry Francis"],
        answer: "Christian Gross",
        explanation: "Swiss manager Christian Gross famously held up his tube ticket upon arriving at Tottenham."
    },
    {
        floor: 45,
        question: "In 1999, Ole Gunnar Solskjær famously scored four goals as a substitute against Nottingham Forest. How many minutes was he on the pitch before completing his four-goal haul?",
        options: ["12 minutes", "18 minutes", "24 minutes", "30 minutes"],
        answer: "12 minutes",
        explanation: "Solskjær came on in the 72nd minute and scored in the 80th, 88th, 91st, and 92nd minutes in United's 8–1 win."
    }
];
