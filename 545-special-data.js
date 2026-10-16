const fullQuestions = [
    {
        floor: 1,
        question: "Why did Manchester City block their manager from speaking to the radio after the Liverpool match?",
        options: ["Worried about 114 financial charges being mentioned", "Enzo Maresca would accidentally leak the tactical room's Wi-Fi password", "Maresca was about to burst into song", "The club offered no explanation, breaking Premier League administrative Rule K.207"],
        answer: "The club offered no explanation, breaking Premier League administrative Rule K.207",
        explanation: "Manchester City refused to let Enzo Maresca do post-match radio interviews following the Liverpool game and gave no explanation, breaching Premier League administrative rules."
    },
    {
        floor: 2,
        question: "Which former Manchester United and Newcastle legend celebrates his birthday today?",
        options: ["Andrew Cole", "Steve Bruce"],
        answer: "Andrew Cole",
        explanation: "Andrew Cole was born on 15 October 1971 and played as a prolific striker for both Newcastle United and Manchester United."
    },
    {
        floor: 3,
        question: "Manchester City were beaten 2–4 last night (Wednesday) in the Champions League by whom?",
        options: ["PSG", "Real Madrid", "Bayern Munich", "Inter Milan"],
        answer: "PSG",
        explanation: "Paris Saint-Germain came out top in a 4–2 thriller against Manchester City in the Champions League."
    },
    {
        floor: 4,
        question: "In the Champions League last night, Liverpool bagged 6 against Austrian team LASK. Who got a hat-trick?",
        options: ["Bradley Barcola", "Cody Gakpo", "Darwin Núñez", "Mohamed Salah"],
        answer: "Bradley Barcola",
        explanation: "Bradley Barcola led the charge, claiming a spectacular hat-trick in Liverpool's 6-goal performance against LASK."
    },
    {
        floor: 5,
        question: "Which other team (not Liverpool) also netted 6 last night in Europe?",
        options: ["Aston Villa", "Real Madrid", "PSG", "Barcelona"],
        answer: "Aston Villa",
        explanation: "Aston Villa matched Liverpool's scoring feats across Europe by putting 6 goals past their opponents."
    },
    {
        floor: 6,
        question: "Who are top of the Champions League today?",
        options: ["PSG", "Barcelona", "Liverpool", "Arsenal"],
        answer: "PSG",
        explanation: "Following their impressive victory, PSG sit right at the top of the Champions League group table."
    },
    {
        floor: 7,
        question: "Which squad number was Nigel Clough given during the Premier League's inaugural year?",
        options: ["7", "6", "8", "11"],
        answer: "7",
        explanation: "Nigel Clough wore the famous number 7 shirt when official squad numbers were introduced in the Premier League era."
    },
    {
        floor: 8,
        question: "Which team has the smallest capacity ground in the Premier League?",
        options: ["Bournemouth", "Coventry", "Ipswich", "Hull"],
        answer: "Bournemouth",
        explanation: "Bournemouth's Vitality Stadium (Dean Court) holds around 11,300 fans, making it the smallest stadium in the top flight."
    },
    {
        floor: 9,
        question: "Excluding goalkeepers, who is officially the tallest outfield player to play in the Premier League?",
        options: ["Lacina Traoré", "Peter Crouch", "Dan Burn", "Per Mertesacker"],
        answer: "Lacina Traoré",
        explanation: "Standing at 6ft 8in (2.03m), striker Lacina Traoré edges out Peter Crouch and Dan Burn as the tallest outfield player in Premier League history."
    },
    {
        floor: 10,
        question: "Who scored the fastest goal in Premier League history?",
        options: ["Shane Long", "Ledley King", "Philip Billing", "Alan Shearer"],
        answer: "Shane Long",
        explanation: "Shane Long scored for Southampton against Watford in just 7.69 seconds back in April 2019."
    },
    {
        floor: 11,
        question: "Which player holds the record for most assists in Premier League history?",
        options: ["Ryan Giggs", "Cesc Fàbregas", "Kevin De Bruyne", "Wayne Rooney"],
        answer: "Ryan Giggs",
        explanation: "Ryan Giggs leads the all-time assist chart with an astonishing 162 Premier League assists."
    },
    {
        floor: 12,
        question: "Who is the all-time leading goalscorer in Premier League history?",
        options: ["Alan Shearer", "Harry Kane", "Wayne Rooney", "Andrew Cole"],
        answer: "Alan Shearer",
        explanation: "Alan Shearer holds the record with 260 Premier League goals scored for Blackburn Rovers and Newcastle United."
    },
    {
        floor: 13,
        question: "Which goalkeeper holds the record for the most clean sheets in Premier League history?",
        options: ["Petr Čech", "David James", "Mark Schwarzer", "David de Gea"],
        answer: "Petr Čech",
        explanation: "Petr Čech kept 202 clean sheets across his career at Chelsea and Arsenal."
    },
    {
        floor: 14,
        question: "Which club won the inaugural Premier League season in 1992–93?",
        options: ["Manchester United", "Blackburn Rovers", "Aston Villa", "Arsenal"],
        answer: "Manchester United",
        explanation: "Manchester United ended a 26-year league title drought by winning the inaugural Premier League campaign."
    },
    {
        floor: 15,
        question: "Who scored the famous 'Kun Agüero' title-winning goal for Manchester City in May 2012 against QPR?",
        options: ["Sergio Agüero", "Edin Džeko", "Mario Balotelli", "David Silva"],
        answer: "Sergio Agüero",
        explanation: "Sergio Agüero struck at 93:20 to snatch the Premier League title from Manchester United in sensational fashion."
    },
    {
        floor: 16,
        question: "Which manager famously guided Leicester City to their miraculous 5000-1 Premier League title in 2015–16?",
        options: ["Claudio Ranieri", "Nigel Pearson", "Brendan Rodgers", "Craig Shakespeare"],
        answer: "Claudio Ranieri",
        explanation: "Claudio Ranieri managed Leicester City to one of the greatest sporting upsets in history."
    },
    {
        floor: 17,
        question: "Who was the first player to score 100 Premier League goals for two different clubs?",
        options: ["Alan Shearer", "Wayne Rooney", "Harry Kane", "Teddy Sheringham"],
        answer: "Alan Shearer",
        explanation: "Shearer passed 100 goals for both Blackburn Rovers and Newcastle United."
    },
    {
        floor: 18,
        question: "Which club completed the unbeaten 'Invincibles' Premier League season in 2003–04?",
        options: ["Arsenal", "Chelsea", "Manchester United", "Liverpool"],
        answer: "Arsenal",
        explanation: "Arsène Wenger's Arsenal went 38 league games undefeated (26 wins, 12 draws)."
    },
    {
        floor: 19,
        question: "Who scored the fastest hat-trick in Premier League history (3 minutes 56 seconds)?",
        options: ["Sadio Mané", "Robbie Fowler", "Jermain Defoe", "Gabriel Agbonlahor"],
        answer: "Sadio Mané",
        explanation: "Sadio Mané netted three times in 176 seconds for Southampton against Aston Villa in May 2015."
    },
    {
        floor: 20,
        question: "Which player has made the most appearances in Premier League history?",
        options: ["Gareth Barry", "Ryan Giggs", "James Milner", "Frank Lampard"],
        answer: "Gareth Barry",
        explanation: "Gareth Barry leads the all-time appearances chart with 653 Premier League matches played."
    },
    {
        floor: 21,
        question: "Which English manager was the last to win the top-flight English league title?",
        options: ["Howard Wilkinson", "Sir Bobby Robson", "Harry Redknapp", "Roy Hodgson"],
        answer: "Howard Wilkinson",
        explanation: "Howard Wilkinson won the First Division title with Leeds United in 1991–92, the final season before the Premier League launch."
    },
    {
        floor: 22,
        question: "Who scored the header that won Manchester United the 1999 Champions League final in Barcelona?",
        options: ["Ole Gunnar Solskjær", "Teddy Sheringham", "Dwight Yorke", "Andy Cole"],
        answer: "Ole Gunnar Solskjær",
        explanation: "Solskjær poked home in the 93rd minute following Sheringham's equalizer to seal the Treble."
    },
    {
        floor: 23,
        question: "Which Scottish club went undefeated through an entire 38-game league season in 2016–17 under Brendan Rodgers?",
        options: ["Celtic", "Rangers", "Aberdeen", "Hearts"],
        answer: "Celtic",
        explanation: "Celtic earned the 'Invincibles' moniker in Scotland by going undefeated across all domestic competitions."
    },
    {
        floor: 24,
        question: "Who is the only goalkeeper to score a Premier League goal from inside his own penalty area?",
        options: ["Asmir Begović", "Tim Howard", "Paul Robinson", "Peter Schmeichel"],
        answer: "Asmir Begović",
        explanation: "Begović scored for Stoke against Southampton after just 13 seconds with a wind-assisted kick."
    },
    {
        floor: 25,
        question: "Which player has received the most yellow cards in Premier League history?",
        options: ["Gareth Barry", "Wayne Rooney", "Lee Bowyer", "Paul Scholes"],
        answer: "Gareth Barry",
        explanation: "Gareth Barry accumulated 123 yellow cards during his top-flight career."
    },
    {
        floor: 26,
        question: "Who was the manager of Chelsea when they conceded just 15 goals in a single Premier League season (2004–05)?",
        options: ["José Mourinho", "Carlo Ancelotti", "Guus Hiddink", "Claudio Ranieri"],
        answer: "José Mourinho",
        explanation: "Mourinho's Chelsea set the record for fewest goals conceded (15) and most clean sheets (25) in 2004–05."
    },
    {
        floor: 27,
        question: "Which ground was known as 'The Theatre of Dreams'?",
        options: ["Old Trafford", "Anfield", "Highbury", "St James' Park"],
        answer: "Old Trafford",
        explanation: "Sir Bobby Charlton famously coined the nickname 'The Theatre of Dreams' for Old Trafford."
    },
    {
        floor: 28,
        question: "Who scored Liverpool's opening goal in the 2005 Champions League final 'Miracle of Istanbul'?",
        options: ["Steven Gerrard", "Xabi Alonso", "Vladimir Šmicer", "Hernán Crespo"],
        answer: "Steven Gerrard",
        explanation: "Steven Gerrard sparked Liverpool's 3-goal comeback with a soaring header in the 54th minute."
    },
    {
        floor: 29,
        question: "Which player won Premier League titles with both Blackburn Rovers and Chelsea?",
        options: ["Chris Sutton", "Graeme Le Saux", "Mark Hughes", "Damien Duff"],
        answer: "Chris Sutton",
        explanation: "Sutton won the title with Blackburn in 1995 and later played for Chelsea."
    },
    {
        floor: 30,
        question: "Who was the first African player to reach 100 Premier League goals?",
        options: ["Didier Drogba", "Mohamed Salah", "Sadio Mané", "Emmanuel Adebayor"],
        answer: "Didier Drogba",
        explanation: "Didier Drogba reached the milestone in March 2012 playing for Chelsea."
    },
    {
        floor: 31,
        question: "Which stadium hosted the FA Cup Finals while Wembley Stadium was being rebuilt between 2001 and 2006?",
        options: ["Millennium Stadium", "Old Trafford", "Villa Park", "Hampden Park"],
        answer: "Millennium Stadium",
        explanation: "Cardiff's Millennium Stadium hosted six FA Cup finals during Wembley's redevelopment."
    },
    {
        floor: 32,
        question: "Who scored the winning penalty for England against Colombia in the 2018 World Cup shootout?",
        options: ["Eric Dier", "Harry Kane", "Kieran Trippier", "Marcus Rashford"],
        answer: "Eric Dier",
        explanation: "Eric Dier stepped up to score the decisive kick, earning England's first-ever World Cup penalty shootout victory."
    },
    {
        floor: 33,
        question: "Which team scored 101 Premier League goals in 2013–14 but still finished second in the table?",
        options: ["Liverpool", "Manchester City", "Chelsea", "Arsenal"],
        answer: "Liverpool",
        explanation: "Brendan Rodgers' Liverpool netted 101 goals but finished two points behind Manchester City."
    },
    {
        floor: 34,
        question: "Who holds the record for scoring in 11 consecutive Premier League matches?",
        options: ["Jamie Vardy", "Ruud van Nistelrooy", "Daniel Sturridge", "Erling Haaland"],
        answer: "Jamie Vardy",
        explanation: "Vardy broke Ruud van Nistelrooy's record by scoring in 11 straight games during Leicester's 2015–16 title run."
    },
    {
        floor: 35,
        question: "Which club was original host to 'The Famous Spion Kop' grandstand before the name spread across football?",
        options: ["Arsenal", "Liverpool", "Birmingham City", "Sheffield Wednesday"],
        answer: "Liverpool",
        explanation: "Liverpool's Spion Kop terrace was named in 1906 following the battle of Spion Kop in South Africa."
    },
    {
        floor: 36,
        question: "Who was the first teenager to score 50 Premier League goals?",
        options: ["Michael Owen", "Wayne Rooney", "Robbie Fowler", "Cesc Fàbregas"],
        answer: "Michael Owen",
        explanation: "Michael Owen burst onto the scene for Liverpool, reaching 50 goals faster than any other youngster."
    },
    {
        floor: 37,
        question: "Which side won the European Cup twice under manager Brian Clough?",
        options: ["Nottingham Forest", "Derby County", "Leeds United", "Aston Villa"],
        answer: "Nottingham Forest",
        explanation: "Brian Clough led Nottingham Forest to back-to-back European Cup triumphs in 1979 and 1980."
    },
    {
        floor: 38,
        question: "Who is the only player to have scored in the Merseyside, Manchester, and North London derbies?",
        options: ["Emmanuel Adebayor", "Nicolas Anelka", "Craig Bellamy", "Les Ferdinand"],
        answer: "Emmanuel Adebayor",
        explanation: "Adebayor scored for Arsenal and Spurs in North London, Man City in Manchester, and Real Madrid elsewhere."
    },
    {
        floor: 39,
        question: "Which Premier League club's nickname is 'The Cottagers'?",
        options: ["Fulham", "Burnley", "Crystal Palace", "Luton Town"],
        answer: "Fulham",
        explanation: "Fulham earned their nickname 'The Cottagers' from their historic Craven Cottage home ground."
    },
    {
        floor: 40,
        question: "Who was named Player of the Tournament at Euro 2020?",
        options: ["Gianluigi Donnarumma", "Raheem Sterling", "Jorginho", "Pedri"],
        answer: "Gianluigi Donnarumma",
        explanation: "Italy's goalkeeper Gianluigi Donnarumma took the award after penalty shootout heroics in the final."
    },
    {
        floor: 41,
        question: "Which English player won the FIFA World Cup Golden Boot in 1986?",
        options: ["Gary Lineker", "Alan Shearer", "Geoff Hurst", "Bobby Charlton"],
        answer: "Gary Lineker",
        explanation: "Gary Lineker scored 6 goals in Mexico to win the 1986 Golden Boot."
    },
    {
        floor: 42,
        question: "Who was the first manager to be sacked in the Premier League era?",
        options: ["Ian Porterfield", "Peter Reid", "Howard Wilkinson", "Brian Clough"],
        answer: "Ian Porterfield",
        explanation: "Chelsea manager Ian Porterfield was dismissed in February 1993, becoming the first PL managerial casualty."
    },
    {
        floor: 43,
        question: "Which player famously executed the 'Cruyff Turn' on his international debut against Sweden in 1974?",
        options: ["Johan Cruyff", "George Best", "Bobby Moore", "Kevin Keegan"],
        answer: "Johan Cruyff",
        explanation: "Johan Cruyff unveiled his iconic turn against Swedish defender Jan Olsson at the 1974 World Cup."
    },
    {
        floor: 44,
        question: "Who scored a famous overhead kick for Manchester United in the Manchester derby in February 2011?",
        options: ["Wayne Rooney", "Sergio Agüero", "Yaya Touré", "Mario Balotelli"],
        answer: "Wayne Rooney",
        explanation: "Wayne Rooney scored for Manchester United against City with an unforgettable bicycle kick!"
    },
    {
        floor: 45,
        question: "Which club holds the record for most FA Cup final wins?",
        options: ["Arsenal", "Manchester United", "Chelsea", "Liverpool"],
        answer: "Arsenal",
        explanation: "Arsenal hold the record with 14 FA Cup triumphs."
    }
];
<!-- END OF FILE: 545-special-data.js -->
