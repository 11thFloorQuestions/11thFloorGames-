/**
 * Think You Know Ball? 5.45 Special — Question Data
 * 45 Floors (45 Questions)
 * Brand Pillar: "Made by Humans!" — Strict UK English
 */

const fullQuestions = [
    // Floors 1–10: TEST TEN (TYKB Set 36, Saturday 24 Oct 2026). Replace with the final results-based ten before 5.45.
    {
        floor: 1,
        question: "Who is currently sitting bottom of the Premier League table today, Saturday 24th Oct 2026?",
        options: ["Sunderland", "Nottingham Forest", "Fulham", "Coventry"],
        answer: "Sunderland",
        explanation: "Clue: This historic Northeast club plays its home fixtures at the Stadium of Light and traditionally wears red and white vertical stripes.\nFun Fact: The club's official nickname, the Black Cats, was chosen in a fan vote in 2000, drawing on local folklore and a battery of guns stationed nearby during the Napoleonic Wars."
    },
    {
        floor: 2,
        question: "Which former Manchester United and Premier League legend, now turned pundit, celebrates his birthday today?",
        options: ["Wayne Rooney", "Mark Goldbridge", "Roy Keane", "Gary Neville"],
        answer: "Wayne Rooney",
        explanation: "Clue: Bursting onto the scene as a teenager at Everton, this iconic forward went on to become Manchester United's all-time leading goalscorer.\nFun Fact: He scored a sensational hat-trick on his Manchester United debut against Fenerbahçe in the Champions League at just 18 years old."
    },
    {
        floor: 3,
        question: "Who is the current manager of Bournemouth?",
        options: ["Marco Rose", "Marco Polo", "Marco van Basten", "Eddie Howe"],
        answer: "Marco Rose",
        explanation: "Clue: This German tactician built his reputation in Austria and the Bundesliga, previously managing Borussia Dortmund and RB Leipzig before taking charge on the south coast.\nFun Fact: During his playing career as a defender, he spent nearly a decade at Mainz 05, playing alongside future managerial legends Jurgen Klopp and Thomas Tuchel."
    },
    {
        floor: 4,
        question: "Ipswich Town played Nottingham Forest last night (Friday); what was the final score?",
        options: ["1-1 draw", "2-2 draw", "2-0 win", "2-1 win"],
        answer: "1-1 draw",
        explanation: "Clue: Neither side could find a winner under the Friday night lights, leaving both teams with a single point shared in a tight contest.\nFun Fact: Friday night fixtures in top-flight English football became regular television slot features in the Premier League beginning with the 2016–17 broadcast rights agreement."
    },
    {
        floor: 5,
        question: "And what is the name of the ground Ipswich Town play their home games at?",
        options: ["Portman Road", "The Valley", "Carrow Road", "Massey Ferguson Fields"],
        answer: "Portman Road",
        explanation: "Clue: This historic venue in Suffolk has been the home of the Tractor Boys since 1884, complete with statues outside commemorating Sir Alf Ramsey and Sir Bobby Robson.\nFun Fact: In addition to football, the stadium hosted England senior international matches and a famous Ed Sheeran concert series in 2019."
    },
    {
        floor: 6,
        question: "On this day in Football History, October 24th, 1857 was the Birth of Football: Which Football Club was founded on this exact day and is officially recognized by FIFA as the world's oldest existing football club?",
        options: ["Sheffield FC", "Milton Keynes FC", "Wrexham FC", "Everton FC"],
        answer: "Sheffield FC",
        explanation: "Clue: Formed by members of a local cricket club, this pioneer team codified the earliest formal rules of the game in Yorkshire.\nFun Fact: They were awarded the FIFA Order of Merit in 2004 to celebrate their contribution to football history—an honour shared with only one other club: Real Madrid."
    },
    {
        floor: 7,
        question: "Tottenham Hotspur legendary forward Son Heung-min wore which squad number?",
        options: ["7", "10", "9", "11"],
        answer: "7",
        explanation: "Clue: The South Korean superstar made this single digit iconic in North London, combining with Harry Kane to form the most prolific tandem in Premier League history.\nFun Fact: He became the first Asian player to win the Premier League Golden Boot when he shared the award in the 2021–22 season."
    },
    {
        floor: 8,
        question: "Out of the 20 football clubs currently in the Premier League, which one has the biggest seating capacity?",
        options: ["Manchester United", "Liverpool", "Tottenham Hotspur", "Manchester City"],
        answer: "Manchester United",
        explanation: "Clue: Nicknamed 'The Theatre of Dreams', this famous ground holds over 74,000 spectators and remains the largest club stadium in English football.\nFun Fact: The stadium's iconic Stretford End stand was originally built in 1910 and was one of the last major terrace stands converted to all-seating in the 1990s."
    },
    {
        floor: 9,
        question: "How many Premier League titles has birthday boy Wayne Rooney won during his playing career?",
        options: ["5", "4", "3", "6"],
        answer: "5",
        explanation: "Clue: All of his top-flight winner's medals were secured during a single dominant era under Sir Alex Ferguson between 2006 and 2013.\nFun Fact: He is one of only two players in Premier League history to record over 200 goals and 100 assists in the competition."
    },
    {
        floor: 10,
        question: "Who is the top-scoring Welsh player in Premier League history with 109 goals?",
        options: ["Ryan Giggs", "Craig Bellamy", "Gareth Bale", "Mark Hughes"],
        answer: "Ryan Giggs",
        explanation: "Clue: This high-flying winger turned central midfielder spent his entire professional career with one club, winning a record 13 Premier League titles.\nFun Fact: He holds the extraordinary record of scoring in 21 consecutive Premier League seasons between 1992–93 and 2012–13."
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
