const fullQuestions = [
    {
        floor: 1,
        question: "Which Premier League manager recently blamed a heavy defeat on his players eating too many heavy pre-match crumpets?",
        options: ["Sean Dyche", "Ange Postecoglou", "Andoni Iraola", "Pep Guardiola"],
        answer: "Andoni Iraola",
        explanation: "Andoni Iraola joked after a sluggish start that the squad's carb-heavy breakfast choices needed a total tactical rethink."
    },
    {
        floor: 2,
        question: "Who holds the record for the most red cards received by a single player in Premier League history?",
        options: ["Duncan Ferguson", "Patrick Vieira", "Richard Dunne", "Roy Keane"],
        answer: "Richard Dunne",
        explanation: "Richard Dunne picked up 8 red cards (along with 8 own goals) during his rugged top-flight career."
    },
    {
        floor: 3,
        question: "Which Championship side famously wore a sponsorless, retro kit during their surprise promotion run?",
        options: ["Ipswich Town", "Luton Town", "Sheffield United", "Coventry City"],
        answer: "Luton Town",
        explanation: "Luton Town's rise through the leagues was marked by clean, minimalist kits that won over retro football shirt purists."
    },
    {
        floor: 4,
        question: "In what year did the Premier League officially transition from Mitre to Nike as its official match ball provider?",
        options: ["2000", "2004", "2008", "2012"],
        answer: "2000",
        explanation: "Nike took over the match ball contract ahead of the 2000–01 season, introducing the iconic Geo Merlin design."
    },
    {
        floor: 5,
        question: "Which team did Leicester City beat 5–0 right before their miraculous title-winning run gathered unstoppable momentum?",
        options: ["Newcastle United", "Sunderland", "Aston Villa", "Queens Park Rangers"],
        answer: "Sunderland",
        explanation: "Under Nigel Pearson and then Claudio Ranieri, Leicester's resurgence famously caught fire after dismantling Sunderland."
    },
    {
        floor: 6,
        question: "Who scored the iconic injury-time winner for Liverpool against Newcastle in the legendary 4–3 thriller of 1996?",
        options: ["Stan Collymore", "Robbie Fowler", "Ian Rush", "John Barnes"],
        answer: "Stan Collymore",
        explanation: "Collymore finished off a frantic counter-attack in stoppage time to spark Kevin Keegan's famous disconsolate slump over the advertising hoardings."
    },
    {
        floor: 7,
        question: "Which iconic stadium featured a giant walrus statue outside its ticket office until its redevelopment?",
        options: ["Beesotted Griffin Park", "Ayresome Park", "The Dell", "Ninian Park"],
        answer: "Ayresome Park",
        explanation: "Middlesbrough's old home, Ayresome Park, had unique local historical landmarks surrounding its perimeter."
    },
    {
        floor: 8,
        question: "Which player scored a hat-trick of penalties in a single Premier League match?",
        options: ["Jan Åge Fjørtoft", "Andy Johnson", "Gaizka Mendieta", "No player has ever done this"],
        answer: "No player has ever done this",
        explanation: "While players have scored two, a Premier League hat-trick entirely composed of penalties has never happened."
    },
    {
        floor: 9,
        question: "Who was the manager who famously brought 'Pashun' and tactical rants into mainstream meme culture on Sky Sports?",
        options: ["Neil Warnock", "Ian Holloway", "Harry Redknapp", "Sam Allardyce"],
        answer: "Ian Holloway",
        explanation: "Ian Holloway's colorful post-match press conferences during Blackpool's Premier League season are legendary."
    },
    {
        floor: 10,
        question: "Which club was deducted 10 points in the 2009–10 Championship season, setting a record at the time?",
        options: ["Crystal Palace", "Portsmouth", "Leeds United", "Southampton"],
        answer: "Portsmouth",
        explanation: "Portsmouth entered administration and suffered a 10-point deduction during a turbulent campaign."
    },
    {
        floor: 11,
        question: "Which foreign player was the first to win the PFA Players' Player of the Year award?",
        options: ["Eric Cantona", "Dennis Bergkamp", "Ruud Gullit", "Gianfranco Zola"],
        answer: "Eric Cantona",
        explanation: "Eric Cantona picked up the accolade in 1994 after orchestrating Manchester United's domestic dominance."
    },
    {
        floor: 12,
        question: "What color was the famously controversial away kit Manchester United abandoned at half-time at Southampton in 1996?",
        options: ["Grey", "Navy Blue", "Pink", "Gold"],
        answer: "Grey",
        explanation: "Sir Alex Ferguson ordered his players to change out of the grey kit at half-time because players couldn't see each other against the crowd."
    },
    {
        floor: 13,
        question: "Who scored the first-ever goal broadcast live on Sky Sports in the Premier League era (August 1992)?",
        options: ["Teddy Sheringham", "Brian Deane", "Alan Shearer", "Ian Wright"],
        answer: "Brian Deane",
        explanation: "Brian Deane scored after just five minutes for Sheffield United against Manchester United at Bramall Lane."
    },
    {
        floor: 14,
        question: "Which manager famously sprinted down the Old Trafford touchline celebrating a last-minute Champions League winner?",
        options: ["José Mourinho", "Pep Guardiola", "Jurgen Klopp", "Mikel Arteta"],
        answer: "José Mourinho",
        explanation: "Mourinho celebrated Porto's late equalizer/winner knocking United out in 2004 with an iconic knee slide sprint."
    },
    {
        floor: 15,
        question: "Which club holds the record for the lowest points total in a single 38-game Premier League season?",
        options: ["Derby County", "Sheffield United", "Huddersfield Town", "Sunderland"],
        answer: "Derby County",
        explanation: "Derby County managed just 11 points during the dismal 2007–08 campaign."
    },
    {
        floor: 16,
        question: "Who scored West Ham's dramatic last-minute winner in the 2006 FA Cup Final against Liverpool?",
        options: ["Paul Konchesky", "Dean Ashton", "Marlon Harewood", "Anton Ferdinand"],
        answer: "Dean Ashton",
        explanation: "While Konchesky scored a freak cross-shot, Dean Ashton capitalized on defensive errors to keep the Hammers ahead in a classic final."
    },
    {
        floor: 17,
        question: "Which goalkeeper famously scored a header past Peter Schmeichel in the 90th minute for Carlisle United?",
        options: ["Jimmy Glass", "Peter Beardsley", "Neville Southall", "David Seaman"],
        answer: "Jimmy Glass",
        explanation: "Jimmy Glass scored a dramatic 94th-minute winner on the final day of the 1998–99 season to keep Carlisle in the Football League."
    },
    {
        floor: 18,
        question: "Which team did Tottenham Hotspur famously defeat 9–1 in 2009, featuring five goals from Jermain Defoe?",
        options: ["Wigan Athletic", "Ipswich Town", "Derby County", "Reading"],
        answer: "Wigan Athletic",
        explanation: "Spurs ran riot in the second half against Wigan at White Hart Lane in November 2009."
    },
    {
        floor: 19,
        question: "Who was the sponsor on Arsenal's famous red-and-white lightning bolt away shirt from 1991–1993?",
        options: ["JVC", "SEGA", "O2", "NFC"],
        answer: "JVC",
        explanation: "The 'Bruised Banana' away shirt and the red lightning bolt home-adjacent kit both sported the classic JVC logo."
    },
    {
        floor: 20,
        question: "Which manager famously declared 'I would love it if we beat them, love it!' in a live television rant?",
        options: ["Kevin Keegan", "Sir Alex Ferguson", "Arsène Wenger", "Kenny Dalglish"],
        answer: "Kevin Keegan",
        explanation: "Newcastle manager Kevin Keegan cracked under Sir Alex Ferguson's mind games live on Sky Sports in April 1996."
    },
    {
        floor: 21,
        question: "Which player scored four goals as a substitute in a single Premier League match for Tottenham against Wigan?",
        options: ["Jermain Defoe", "Robbie Keane", "Dimitar Berbatov", "Gareth Bale"],
        answer: "Jermain Defoe",
        explanation: "Defoe netted five in total during that 9–1 rout, with four coming after the half-time break."
    },
    {
        floor: 22,
        question: "Who holds the record for the most direct free-kick goals scored in Premier League history?",
        options: ["David Beckham", "Thierry Henry", "James Ward-Prowse", "Gianfranco Zola"],
        answer: "David Beckham",
        explanation: "David Beckham netted 18 direct free-kicks, though James Ward-Prowse is hunting down the all-time record."
    },
    {
        floor: 23,
        question: "Which club was nicknamed 'The Crazy Gang' during their famous 1980s and 90s top-flight era?",
        options: ["Wimbledon FC", "Millwall", "Leeds United", "Queens Park Rangers"],
        answer: "Wimbledon FC",
        explanation: "Wimbledon earned the moniker due to their unorthodox club culture, heavy-metal football, and dressing room pranks."
    },
    {
        floor: 24,
        question: "Who scored the winning penalty for Manchester United against Chelsea in the 2008 Champions League final in Moscow?",
        options: ["Cristiano Ronaldo", "Ryan Giggs", "Nicolas Anelka", "Edwin van der Sar"],
        answer: "Edwin van der Sar",
        explanation: "After Ronaldo missed earlier and John Terry slipped, Van der Sar saved Nicolas Anelka's sudden-death penalty to seal the trophy."
    },
    {
        floor: 25,
        question: "Which stadium was home to Crystal Palace before they moved to Selhurst Park in 1924?",
        options: ["The Crystal Palace exhibition grounds", "The Nest", "Waddon Road", "Plough Lane"],
        answer: "The Nest",
        explanation: "Palace originally played at a ground known as 'The Nest' owned by the gas company before relocating."
    },
    {
        floor: 26,
        question: "Who won the Premier League Golden Boot in the 1999–2000 season with Sunderland?",
        options: ["Kevin Phillips", "Niall Quinn", "Dwight Yorke", "Michael Owen"],
        answer: "Kevin Phillips",
        explanation: "Kevin Phillips scored 30 Premier League goals, remaining the only Englishman to win the European Golden Shoe."
    },
    {
        floor: 27,
        question: "Which team did Liverpool beat 5–4 in a chaotic extra-time UEFA Cup Final thriller in Dortmund (2001)?",
        options: ["Alavés", "Borussia Dortmund", "Roma", "Valencia"],
        answer: "Alavés",
        explanation: "Liverpool won the golden goal extra-time thriller against Spanish side Deportivo Alavés to clinch a treble."
    },
    {
        floor: 28,
        question: "Who was the referee who famously ran into midfielder Ousmane Dabo during a match between Arsenal and Spurs?",
        options: ["Mike Dean", "Graham Poll", "Howard Webb", "Mark Halsey"],
        answer: "Graham Poll",
        explanation: "Graham Poll collided with players on multiple occasions, famously giving Josip Šimunić three yellow cards in a World Cup match."
    },
    {
        floor: 29,
        question: "Which player scored an incredible scorpion kick for Arsenal against Crystal Palace on New Year's Day 2017?",
        options: ["Olivier Giroud", "Alexandre Lacazette", "Mesut Özil", "Alexis Sánchez"],
        answer: "Olivier Giroud",
        explanation: "Olivier Giroud met an over-the-shoulder cross with a stunning mid-air backheel flick that looped in off the crossbar."
    },
    {
        floor: 30,
        question: "Which club holds the record for the most consecutive defeats from the start of a Premier League season?",
        options: ["Sheffield United", "Portsmouth", "Swindon Town", "Crystal Palace"],
        answer: "Crystal Palace",
        explanation: "Crystal Palace lost their opening 7 games of the 2017–18 season without scoring a single goal before sacking Frank de Boer."
    },
    {
        floor: 31,
        question: "Who scored the 1000th goal in Premier League history for Middlesbrough against Leeds United?",
        options: ["Mike Newell", "Juninho", "Tony Yeboah", "Robbie Fowler"],
        answer: "Mike Newell",
        explanation: "Mike Newell reached the landmark milestone in February 1993."
    },
    {
        floor: 32,
        question: "Which manager famously wore a massive leather bomber jacket on the touchline during his time at Tottenham?",
        options: ["Juande Ramos", "Christian Gross", "Jacques Santini", "André Villas-Boas"],
        answer: "Christian Gross",
        explanation: "Swiss manager Christian Gross arrived at White Hart Lane holding a London Underground ticket and wearing an unforgettable oversized coat."
    },
    {
        floor: 33,
        question: "Who scored the sensational solo goal past half the Wimbledon team in 1996 for Newcastle United?",
        options: ["Darren Peacock", "David Ginola", "Les Ferdinand", "Faustino Asprilla"],
        answer: "David Ginola",
        explanation: "David Ginola drove down the left wing, cut inside past multiple challenges, and curled a stunning effort into the top corner."
    },
    {
        floor: 34,
        question: "Which club was promoted to the Premier League via the play-offs despite finishing 6th in the regular table?",
        options: ["Crystal Palace", "West Ham United", "Swansea City", "Hull City"],
        answer: "West Ham United",
        explanation: "West Ham won promotion in 2005 under Alan Pardew after beating Preston North End in the Millennium Stadium final."
    },
    {
        floor: 35,
        question: "Who scored the winning goal for Greece in the Euro 2004 final against Portugal?",
        options: ["Angelos Charisteas", "Theodoros Zagorakis", "Giorgos Karagounis", "Dimitrios Papadopoulos"],
        answer: "Angelos Charisteas",
        explanation: "Charisteas headed home a corner in the 57th minute to seal one of the biggest international shocks in football history."
    },
    {
        floor: 36,
        question: "Which goalkeeper famously held the ball for too long inside his area, leading to an indirect free-kick scored by opponents?",
        options: ["Mark Bosnich", "David Seaman", "Shaka Hislop", "Tim Flowers"],
        answer: "Mark Bosnich",
        explanation: "Bosnich was caught holding the ball for an eternity against Sheffield Wednesday, resulting in a comical indirect free-kick goal."
    },
    {
        floor: 37,
        question: "Who was the first player to be sent off in a Premier League match?",
        options: ["Brian Marwood", "Vinnie Jones", "Eric Cantona", "Keith Curle"],
        answer: "Brian Marwood",
        explanation: "Sheffield Wednesday's Brian Marwood received the inaugural Premier League red card against Arsenal in August 1992."
    },
    {
        floor: 38,
        question: "Which stadium was known as 'The Dell' before its demolition in 2001?",
        options: ["Southampton's former home", "Portsmouth's former training ground", "Brighton's temporary ground", "Bournemouth's old pitch"],
        answer: "Southampton's former home",
        explanation: "The Dell was Southampton's tight, atmospheric home ground before they moved to St Mary's Stadium."
    },
    {
        floor: 39,
        question: "Who scored a legendary 40-yard dipping volley for Newcastle against Manchester United in 1996?",
        options: ["Philippe Albert", "Rob Lee", "Keith Gillespie", "David Ginola"],
        answer: "Philippe Albert",
        explanation: "Belgian center-back Philippe Albert delicately lobbed Peter Schmeichel to cap off a famous 5–0 victory."
    },
    {
        floor: 40,
        question: "Which team won the Scottish Premier League title in the 2005–06 season under manager Gordon Strachan?",
        options: ["Celtic", "Rangers", "Hearts", "Aberdeen"],
        answer: "Celtic",
        explanation: "Gordon Strachan secured his first Scottish title at Celtic Park in dominant fashion."
    },
    {
        floor: 41,
        question: "Who scored the iconic 95th-minute winner for Manchester City against QPR in 2012 that is etched into football folklore?",
        options: ["Sergio Agüero", "Mario Balotelli", "Yaya Touré", "Vincent Kompany"],
        answer: "Sergio Agüero",
        explanation: "Martin Tyler's commentary immortalized Agüero's dramatic strike as City snatched the title away from their bitter rivals."
    },
    {
        floor: 42,
        question: "Which club had a sponsorship deal with video game console giant SEGA plastered across their shirt fronts in the 1990s?",
        options: ["Arsenal", "JEF United", "Sampdoria", "Deportivo La Coruña"],
        answer: "Arsenal",
        explanation: "Arsenal famously wore the Dreamcast and SEGA logos on their shirts during the turn of the century."
    },
    {
        floor: 43,
        question: "Who scored a stunning thunderbolt volley against Liverpool at Anfield for Newcastle in 2000?",
        options: ["Laurent Robert", "Nolberto Solano", "Kieron Dyer", "Craig Bellamy"],
        answer: "Laurent Robert",
        explanation: "Laurent Robert unleashed an unstoppable, swerving left-footed rocket past Jerzy Dudek into the top corner."
    },
    {
        floor: 44,
        question: "Which manager famously brought a tactical notes folder to a press conference to list 'facts' about Rafa Benítez?",
        options: ["Sir Alex Ferguson", "Arsène Wenger", "José Mourinho", "Kevin Keegan"],
        answer: "Rafa Benítez / Sir Alex Ferguson",
        explanation: "Sir Alex Ferguson famously pulled out a written list of facts during a tense title race run-in."
    },
    {
        floor: 45,
        question: "Which club completed the historic treble of Premier League, FA Cup, and Champions League in 1998–99?",
        options: ["Manchester United", "Manchester City", "Liverpool", "Arsenal"],
        answer: "Manchester United",
        explanation: "Sir Alex Ferguson's side secured the unprecedented English treble with a miraculous week in May 1999."
    }
];
