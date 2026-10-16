/**
 * Think You Know Ball? 5.45 Special — Question Data (Floors 1-50)
 * Grounded in current Premier League and European football lore.
 * Brand Pillar: "Made by Humans!" — UK English terminology only.
 */

const fullQuestions = [
    {
        floor: 1,
        question: "Which Arsenal goalkeeper kept the most clean sheets in the 2025–26 Premier League season?",
        options: ["David Raya", "Neto", "Aaron Ramsdale", "Karl Hein"],
        answer: "David Raya",
        explanation: "David Raya claimed the Golden Glove award with 19 clean sheets as Arsenal clinched the title."
    },
    {
        floor: 2,
        question: "How many yellow cards trigger an automatic one-match ban if accumulated before Matchweek 19 in the Premier League?",
        options: ["3", "5", "7", "10"],
        answer: "5",
        explanation: "Five cautions picked up before the half-way threshold result in a mandatory single-game suspension."
    },
    {
        floor: 3,
        question: "Which Premier League ground has the smallest seating capacity?",
        options: ["Vitality Stadium", "Gtech Community Stadium", "Craven Cottage", "Selhurst Park"],
        answer: "Vitality Stadium",
        explanation: "Bournemouth's home ground holds just over 11,300 supporters."
    },
    {
        floor: 4,
        question: "Who provided the most assists in the 2025–26 Premier League season with 21?",
        options: ["Bruno Fernandes", "Cole Palmer", "Bukayo Saka", "Rayan Cherki"],
        answer: "Bruno Fernandes",
        explanation: "Bruno Fernandes led the league standings with 21 assists for Manchester United."
    },
    {
        floor: 5,
        question: "Which player completed the most sprints per 90 minutes in the Premier League during the 2025–26 campaign?",
        options: ["Anthony Elanga", "Federico Chiesa", "Enes Ünal", "Dominik Szoboszlai"],
        answer: "Anthony Elanga",
        explanation: "Elanga averaged 29.3 high-intensity sprints per 90 minutes for Newcastle."
    },
    {
        floor: 6,
        question: "How many total Premier League titles did José Mourinho win across his two spells at Chelsea?",
        options: ["2", "3", "4", "5"],
        answer: "3",
        explanation: "Mourinho won back-to-back titles in 2004–05 and 2005–06, followed by a third in 2014–15."
    },
    {
        floor: 7,
        question: "Which team finished top of the 2025–26 Premier League table to win the title?",
        options: ["Arsenal", "Manchester City", "Liverpool", "Manchester United"],
        answer: "Arsenal",
        explanation: "Arsenal finished top with 85 points, seven points ahead of second-placed Manchester City."
    },
    {
        floor: 8,
        question: "Which squad number does Joelinton wear for Newcastle United?",
        options: ["7", "9", "11", "14"],
        answer: "7",
        explanation: "Joelinton switched from the number 9 to number 7 shirt at St James' Park."
    },
    {
        floor: 9,
        question: "Which club holds the record for the most red cards in a single Premier League season with 8 during 2025–26?",
        options: ["Chelsea", "Tottenham Hotspur", "Everton", "West Ham United"],
        answer: "Chelsea",
        explanation: "Chelsea picked up 8 red cards across the 38-game league campaign."
    },
    {
        floor: 10,
        question: "Which outfield player was the only one not to miss a single minute of Premier League action for his club in 2025–26?",
        options: ["Virgil van Dijk", "William Saliba", "James Tarkowski", "Max Kilman"],
        answer: "Virgil van Dijk",
        explanation: "Virgil van Dijk played all 3,420 minutes for Liverpool."
    },
    {
        floor: 11,
        question: "Who was top goalscorer in the 2025–26 Premier League season with 27 goals?",
        options: ["Erling Haaland", "Igor Thiago", "Viktor Gyökeres", "Ollie Watkins"],
        answer: "Erling Haaland",
        explanation: "Erling Haaland bagged 27 goals for Manchester City to retain the top scorer award."
    },
    {
        floor: 12,
        question: "Which club plays their home fixtures at Craven Cottage?",
        options: ["Fulham", "Brentford", "Crystal Palace", "West Ham United"],
        answer: "Fulham",
        explanation: "Fulham have called Craven Cottage home on the banks of the River Thames since 1896."
    },
    {
        floor: 13,
        question: "Which player scored 22 Premier League goals for Brentford in a breakthrough 2025–26 campaign?",
        options: ["Igor Thiago", "Yoane Wissa", "Bryan Mbeumo", "Ivan Toney"],
        answer: "Igor Thiago",
        explanation: "Igor Thiago netted 22 goals to finish second in the Golden Boot standings."
    },
    {
        floor: 14,
        question: "How many London clubs competed in the Premier League during the 2025–26 season?",
        options: ["5", "6", "7", "8"],
        answer: "6",
        explanation: "Arsenal, Chelsea, Tottenham, West Ham, Fulham, and Brentford made up the London contingent."
    },
    {
        floor: 15,
        question: "Which venue hosted the 2026 UEFA Champions League final in May 2026?",
        options: ["Puskás Aréna", "Allianz Arena", "San Siro", "Wembley Stadium"],
        answer: "Puskás Aréna",
        explanation: "The European showpiece took place at the Puskás Aréna in Budapest."
    },
    {
        floor: 16,
        question: "Which side won the 2025–26 UEFA Champions League final in Budapest?",
        options: ["Paris Saint-Germain", "Arsenal", "FC Bayern Munich", "Real Madrid"],
        answer: "Paris Saint-Germain",
        explanation: "PSG claimed the European crown following a penalty shoot-out victory in the final."
    },
    {
        floor: 17,
        question: "Who holds the record for the most overall appearances in Premier League history?",
        options: ["Gareth Barry", "James Milner", "Ryan Giggs", "Frank Lampard"],
        answer: "Gareth Barry",
        explanation: "Gareth Barry racked up 653 Premier League appearances across his career."
    },
    {
        floor: 18,
        question: "Which team did Unai Emery lead to a 4th-place Premier League finish in 2025–26?",
        options: ["Aston Villa", "Villarreal", "Sevilla", "Real Betis"],
        answer: "Aston Villa",
        explanation: "Unai Emery steered Aston Villa back into the Champions League places."
    },
    {
        floor: 19,
        question: "Which player achieved the top recorded sprint speed in the Premier League at 36.4 km/h during 2025–26?",
        options: ["Anthony Gordon", "Anthony Elanga", "William Osula", "Micky van de Ven"],
        answer: "Anthony Gordon",
        explanation: "Gordon clocked 36.4 km/h to top the official speed charts for Newcastle."
    },
    {
        floor: 20,
        question: "Which team is geographically the most easterly club in the top flight of English football?",
        options: ["Ipswich Town", "Norwich City", "Sunderland", "Newcastle United"],
        answer: "Ipswich Town",
        explanation: "Portman Road in Suffolk sits further east than any other top-flight ground."
    },
    {
        floor: 21,
        question: "Which player netted 13 goals for Bournemouth in 2025–26 to break the record for most goals by a teenager in his debut Premier League season?",
        options: ["Junior Kroupi", "Evanilson", "Antoine Semenyo", "Alex Scott"],
        answer: "Junior Kroupi",
        explanation: "Junior Kroupi surpassed Robbie Keane and Robbie Fowler's teenage debut records."
    },
    {
        floor: 22,
        question: "Who holds the record for the most clean sheets in Premier League history with 202 shutouts?",
        options: ["Petr Čech", "David de Gea", "David Seaman", "Pepe Reina"],
        answer: "Petr Čech",
        explanation: "Čech recorded 202 clean sheets across his spells with Chelsea and Arsenal."
    },
    {
        floor: 23,
        question: "Which Premier League team completed the 2025–26 season without conceding a penalty or receiving a red card?",
        options: ["Arsenal", "Manchester City", "Liverpool", "Aston Villa"],
        answer: "Arsenal",
        explanation: "Arsenal became the first club in Premier League history to record zero penalties conceded and zero red cards."
    },
    {
        floor: 24,
        question: "Which player scored four goals in a single first half of a Premier League match against Brighton?",
        options: ["Cole Palmer", "Erling Haaland", "Ollie Watkins", "Mohamed Salah"],
        answer: "Cole Palmer",
        explanation: "Cole Palmer set the record in Chelsea's 4–2 victory at Stamford Bridge."
    },
    {
        floor: 25,
        question: "Which manager led St. Pauli to Bundesliga promotion before being appointed as Brighton boss at age 31?",
        options: ["Fabian Hürzeler", "Kieran McKenna", "Russell Martin", "Danny Röhl"],
        answer: "Fabian Hürzeler",
        explanation: "Hürzeler became the youngest permanent head coach in Premier League history."
    },
    {
        floor: 26,
        question: "Who scored the fastest goal in Premier League history after 7.69 seconds against Watford?",
        options: ["Shane Long", "Philip Billing", "Ledley King", "Alan Shearer"],
        answer: "Shane Long",
        explanation: "Shane Long closed down Craig Cathcart straight from kick-off at Vicarage Road."
    },
    {
        floor: 27,
        question: "Which goalkeeper holds the record for the most Premier League starts for Everton?",
        options: ["Tim Howard", "Jordan Pickford", "Neville Southall", "Nigel Martyn"],
        answer: "Tim Howard",
        explanation: "Tim Howard started 354 Premier League games between the sticks for Everton."
    },
    {
        floor: 28,
        question: "Who was top goalscorer in the 2025–26 UEFA Champions League?",
        options: ["Kylian Mbappé", "Erling Haaland", "Harry Kane", "Vinícius Júnior"],
        answer: "Kylian Mbappé",
        explanation: "Kylian Mbappé topped the European scoring charts throughout the campaign."
    },
    {
        floor: 29,
        question: "Which English club plays their home matches at Molineux?",
        options: ["Wolverhampton Wanderers", "Aston Villa", "West Bromwich Albion", "Stoke City"],
        answer: "Wolverhampton Wanderers",
        explanation: "Wolves have played at Molineux since 1889."
    },
    {
        floor: 30,
        question: "Which team finished bottom of the Premier League in 2025–26 with just 20 points?",
        options: ["Wolves", "Burnley", "West Ham United", "Ipswich Town"],
        answer: "Wolves",
        explanation: "Wolves managed only 3 victories across a tough 38-game campaign."
    },
    {
        floor: 31,
        question: "Who holds the record for the most direct free-kick goals scored in Premier League history with 18?",
        options: ["David Beckham", "James Ward-Prowse", "Thierry Henry", "Gianfranco Zola"],
        answer: "David Beckham",
        explanation: "David Beckham scored 18 direct free-kicks during his time at Manchester United."
    },
    {
        floor: 32,
        question: "Which French club did Kylian Mbappé leave on a free transfer to join Real Madrid?",
        options: ["Paris Saint-Germain", "Monaco", "Lille", "Lyon"],
        answer: "Paris Saint-Germain",
        explanation: "Mbappé departed PSG as their all-time top goalscorer with 256 goals."
    },
    {
        floor: 33,
        question: "Which stadium was home to Arsenal prior to their move to the Emirates Stadium in 2006?",
        options: ["Highbury", "White Hart Lane", "Upton Park", "The Dell"],
        answer: "Highbury",
        explanation: "Arsenal played at Highbury in North London from 1913 until 2006."
    },
    {
        floor: 34,
        question: "Which player won the PFA Players' Player of the Year award for the 2023–24 season?",
        options: ["Phil Foden", "Rodri", "Cole Palmer", "Erling Haaland"],
        answer: "Phil Foden",
        explanation: "Phil Foden picked up the award after scoring 19 Premier League goals."
    },
    {
        floor: 35,
        question: "Who scored the winning penalty for Manchester United against Chelsea in the 2008 Champions League final shoot-out?",
        options: ["Ryan Giggs", "Cristiano Ronaldo", "Edwin van der Sar", "Carlos Tevez"],
        answer: "Ryan Giggs",
        explanation: "Giggs netted United's seventh spot-kick before Edwin van der Sar saved from Anelka."
    },
    {
        floor: 36,
        question: "Which Premier League ground features a cottage built into the corner of the stands?",
        options: ["Craven Cottage", "Selhurst Park", "Gtech Community Stadium", "Kenilworth Road"],
        answer: "Craven Cottage",
        explanation: "The historic cottage pavilion sits in the corner between the Johnny Haynes Stand and Pavilion."
    },
    {
        floor: 37,
        question: "Who was the first foreign player to win the PFA Players' Player of the Year award in 1994?",
        options: ["Eric Cantona", "Dennis Bergkamp", "Gianfranco Zola", "Ruud Gullit"],
        answer: "Eric Cantona",
        explanation: "Eric Cantona claimed the award after guiding Manchester United to a domestic double."
    },
    {
        floor: 38,
        question: "Which Premier League stadium was originally built as the City of Manchester Stadium?",
        options: ["Etihad Stadium", "Emirates Stadium", "Tottenham Hotspur Stadium", "King Power Stadium"],
        answer: "Etihad Stadium",
        explanation: "Constructed for the 2002 Commonwealth Games, it became City's ground in 2003."
    },
    {
        floor: 39,
        question: "Who holds the record for the most assists in a single Premier League match with 4?",
        options: ["Paul Pogba", "Dennis Bergkamp", "Santi Cazorla", "Harry Kane"],
        answer: "Paul Pogba",
        explanation: "Pogba provided four assists against Leeds United on the opening day of the 2021–22 season."
    },
    {
        floor: 40,
        question: "Which club was nicknamed 'The Crazy Gang' during their top-flight era in the 1980s and 90s?",
        options: ["Wimbledon", "Millwall", "Leeds United", "West Ham United"],
        answer: "Wimbledon",
        explanation: "Wimbledon earned the moniker due to their heavy-metal style and dressing room pranks."
    },
    {
        floor: 41,
        question: "Who scored Spain's winning goal in the Euro 2024 final against England?",
        options: ["Mikel Oyarzabal", "Nico Williams", "Lamine Yamal", "Dani Olmo"],
        answer: "Mikel Oyarzabal",
        explanation: "Oyarzabal slid home in the 86th minute to seal a 2–1 win in Berlin."
    },
    {
        floor: 42,
        question: "Which goalkeeper made the most saves per 90 minutes in the Premier League during 2025–26?",
        options: ["Alphonse Areola", "Martin Dúbravka", "Nick Pope", "José Sá"],
        answer: "Alphonse Areola",
        explanation: "Areola averaged 3.9 saves per game for West Ham United."
    },
    {
        floor: 43,
        question: "Which player scored five goals in a single 9–1 victory for Tottenham against Wigan Athletic in 2009?",
        options: ["Jermain Defoe", "Robbie Keane", "Dimitar Berbatov", "Peter Crouch"],
        answer: "Jermain Defoe",
        explanation: "Defoe scored five, including a seven-minute hat-trick at White Hart Lane."
    },
    {
        floor: 44,
        question: "Which manager famously brought a written list of 'facts' to a press conference regarding Sir Alex Ferguson in 2009?",
        options: ["Rafa Benítez", "Kevin Keegan", "José Mourinho", "Arsène Wenger"],
        answer: "Rafa Benítez",
        explanation: "Benítez produced his sheet of notes during Liverpool's title run-in."
    },
    {
        floor: 45,
        question: "Who scored the winning goal in the 1996 FA Cup Final for Manchester United against Liverpool?",
        options: ["Eric Cantona", "Andy Cole", "David Beckham", "Ryan Giggs"],
        answer: "Eric Cantona",
        explanation: "Cantona volleyed home late through a crowded box to seal a 1–0 victory."
    },
    {
        floor: 46,
        question: "Which club won the EFL Championship play-off final in May 2024 to earn promotion to the Premier League?",
        options: ["Southampton", "Leeds United", "West Bromwich Albion", "Norwich City"],
        answer: "Southampton",
        explanation: "Adam Armstrong scored the solitary goal as Southampton beat Leeds United 1–0 at Wembley."
    },
    {
        floor: 47,
        question: "Who scored a hat-trick for Atalanta in the 2024 UEFA Europa League final to end Bayer Leverkusen's 51-game unbeaten run?",
        options: ["Ademola Lookman", "Gianluca Scamacca", "Teun Koopmeiners", "Charles De Ketelaere"],
        answer: "Ademola Lookman",
        explanation: "Lookman scored all three goals in a clinical 3–0 win in Dublin."
    },
    {
        floor: 48,
        question: "Which player accumulated the joint-most yellow cards in the Premier League during 2025–26 with 12?",
        options: ["André", "Moisés Caicedo", "Cristian Romero", "Wesley Fofana"],
        answer: "André",
        explanation: "Wolves midfielder André received 12 cautions across the 38-game season."
    },
    {
        floor: 49,
        question: "Which stadium hosted the 2025 UEFA Champions League final?",
        options: ["Allianz Arena", "Wembley Stadium", "Stade de France", "Olympic Stadium Baku"],
        answer: "Allianz Arena",
        explanation: "Munich's Allianz Arena hosted the European showpiece in May 2025."
    },
    {
        floor: 50,
        question: "Which club won four consecutive English top-flight league titles between 2021 and 2024?",
        options: ["Manchester City", "Liverpool", "Arsenal", "Manchester United"],
        answer: "Manchester City",
        explanation: "Manchester City became the first club in English football history to win four titles in a row."
    }
];
