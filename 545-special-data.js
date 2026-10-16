/**
 * Think You Know Ball? 5.45 Special — Question Data
 * 45 Floors (45 Questions)
 * Brand Pillar: "Made by Humans!" — Strict UK English
 */

const fullQuestions = [
    {
        floor: 1,
        question: "Erling Haaland reached 100 Manchester City goals in how many matches?",
        options: ["98", "105", "112", "120"],
        answer: "105",
        explanation: "Haaland matched Cristiano Ronaldo's record for the fastest 100 goals for a single European club."
    },
    {
        floor: 2,
        question: "Which player opened the scoring for Arsenal in their 2–0 Champions League victory over Paris Saint-Germain in October 2024?",
        options: ["Kai Havertz", "Bukayo Saka", "Gabriel Martinelli", "Leandro Trossard"],
        answer: "Kai Havertz",
        explanation: "Kai Havertz headed home Leandro Trossard's cross in the 20th minute."
    },
    {
        floor: 3,
        question: "Which manager was appointed as England head coach to succeed Gareth Southgate starting in 2025?",
        options: ["Thomas Tuchel", "Lee Carsley", "Eddie Howe", "Graham Potter"],
        answer: "Thomas Tuchel",
        explanation: "Thomas Tuchel signed an 18-month contract with the FA taking him through to the 2026 World Cup."
    },
    {
        floor: 4,
        question: "Which club did Arne Slot manage immediately before replacing Jürgen Klopp at Liverpool in 2024?",
        options: ["Feyenoord", "PSV Eindhoven", "AZ Alkmaar", "Ajax"],
        answer: "Feyenoord",
        explanation: "Slot led Feyenoord to the Eredivisie title in 2023 and the KNVB Cup in 2024 before moving to Anfield."
    },
    {
        floor: 5,
        question: "Cole Palmer scored four first-half goals in a single Premier League match against which opponent in September 2024?",
        options: ["Brighton", "Everton", "Wolverhampton Wanderers", "Leicester City"],
        answer: "Brighton",
        explanation: "Palmer became the first player in Premier League history to score four goals in the first half of a match."
    },
    {
        floor: 6,
        question: "Which team ended Bayer Leverkusen's 51-game unbeaten run in the 2024 UEFA Europa League final?",
        options: ["Atalanta", "Roma", "Benfica", "Sporting CP"],
        answer: "Atalanta",
        explanation: "Ademola Lookman scored a historic hat-trick as Atalanta won 3–0 in Dublin."
    },
    {
        floor: 7,
        question: "Which squad number does Declan Rice wear for Arsenal?",
        options: ["4", "8", "41", "6"],
        answer: "41",
        explanation: "Rice kept his trademark number 41 shirt following his £105m move from West Ham."
    },
    {
        floor: 8,
        question: "Who is the all-time leading goalscorer in UEFA Champions League history?",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Karim Benzema"],
        answer: "Cristiano Ronaldo",
        explanation: "Cristiano Ronaldo leads the all-time charts with 140 Champions League goals."
    },
    {
        floor: 9,
        question: "Who was the first Premier League manager sacked during the 2023–24 season?",
        options: ["Paul Heckingbottom", "Steve Cooper", "Roy Hodgson", "Erik ten Hag"],
        answer: "Paul Heckingbottom",
        explanation: "Sheffield United parted ways with Heckingbottom in December 2023 following a 5–0 defeat to Burnley."
    },
    {
        floor: 10,
        question: "Which club did Aston Villa defeat 1–0 at Villa Park in October 2024, echoing their 1982 European Cup final triumph?",
        options: ["Bayern Munich", "Real Madrid", "Juventus", "Barcelona"],
        answer: "Bayern Munich",
        explanation: "Jhon Durán scored a late lob over Manuel Neuer to seal a memorable Champions League victory."
    },
    {
        floor: 11,
        question: "Which club won the 2023–24 UEFA Champions League final at Wembley Stadium?",
        options: ["Real Madrid", "Borussia Dortmund", "Paris Saint-Germain", "Bayern Munich"],
        answer: "Real Madrid",
        explanation: "Real Madrid secured their 15th European Cup title with a 2–0 victory over Borussia Dortmund."
    },
    {
        floor: 12,
        question: "Who scored Real Madrid's opening goal in the 2024 UEFA Champions League final?",
        options: ["Dani Carvajal", "Vinícius Júnior", "Jude Bellingham", "Rodrygo"],
        answer: "Dani Carvajal",
        explanation: "Carvajal headed home Toni Kroos' corner in the 74th minute before Vinícius Júnior added a second."
    },
    {
        floor: 13,
        question: "How many yellow cards trigger an automatic one-match ban if accumulated before Matchweek 19 in the Premier League?",
        options: ["3", "5", "7", "10"],
        answer: "5",
        explanation: "Players picking up five yellow cards in their team's first 19 Premier League fixtures serve a one-game suspension."
    },
    {
        floor: 14,
        question: "Which current Premier League stadium has the smallest official seating capacity?",
        options: ["Bournemouth", "Brentford", "Luton Town", "Ipswich Town"],
        answer: "Bournemouth",
        explanation: "Bournemouth's Vitality Stadium holds just over 11,300 supporters."
    },
    {
        floor: 15,
        question: "Who was named Premier League Player of the Season for the 2023–24 campaign?",
        options: ["Phil Foden", "Cole Palmer", "Rodri", "Erling Haaland"],
        answer: "Phil Foden",
        explanation: "Phil Foden scored 19 goals and provided 8 assists as Manchester City won a fourth straight title."
    },
    {
        floor: 16,
        question: "Which country hosted the UEFA Euro 2024 tournament?",
        options: ["Germany", "France", "Spain", "England"],
        answer: "Germany",
        explanation: "Germany hosted the 24-team tournament across ten host cities in June and July 2024."
    },
    {
        floor: 17,
        question: "Who scored Spain's winning goal in the 86th minute of the UEFA Euro 2024 final against England?",
        options: ["Mikel Oyarzabal", "Nico Williams", "Lamine Yamal", "Dani Olmo"],
        answer: "Mikel Oyarzabal",
        explanation: "Oyarzabal slid home Marc Cucurella's cross to seal a 2–1 victory for Spain."
    },
    {
        floor: 18,
        question: "Which Premier League club plays their home matches at Craven Cottage?",
        options: ["Fulham", "Brentford", "Crystal Palace", "West Ham United"],
        answer: "Fulham",
        explanation: "Fulham have played at the historic riverbank ground in West London since 1896."
    },
    {
        floor: 19,
        question: "Who won the PFA Young Player of the Year award for the 2023–24 season?",
        options: ["Cole Palmer", "Bukayo Saka", "Kobbie Mainoo", "Phil Foden"],
        answer: "Cole Palmer",
        explanation: "Palmer bagged 22 Premier League goals and 11 assists in his debut season at Chelsea."
    },
    {
        floor: 20,
        question: "Which Slovenian referee officiated the 2024 UEFA Champions League final at Wembley?",
        options: ["Slavko Vinčić", "Szymon Marciniak", "Anthony Taylor", "Daniele Orsato"],
        answer: "Slavko Vinčić",
        explanation: "Vinčić took charge of his second European club final following the 2022 Europa League final."
    },
    {
        floor: 21,
        question: "Which manager led Atalanta to their first-ever European trophy by winning the 2024 UEFA Europa League?",
        options: ["Gian Piero Gasperini", "Xabi Alonso", "Simone Inzaghi", "Unai Emery"],
        answer: "Gian Piero Gasperini",
        explanation: "Gasperini crowned his long tenure at Bergamo with a resounding 3–0 win over Leverkusen."
    },
    {
        floor: 22,
        question: "Who scored Manchester United's opening goal in their 2–1 victory over Manchester City in the 2024 FA Cup final?",
        options: ["Alejandro Garnacho", "Kobbie Mainoo", "Bruno Fernandes", "Marcus Rashford"],
        answer: "Alejandro Garnacho",
        explanation: "Garnacho pounced on a defensive mix-up between Stefan Ortega and Joško Gvardiol to score the opener."
    },
    {
        floor: 23,
        question: "Which striker joined Tottenham Hotspur from Bournemouth in August 2024 for a club-record fee?",
        options: ["Dominic Solanke", "Evanilson", "Richarlison", "Brennan Johnson"],
        answer: "Dominic Solanke",
        explanation: "Spurs secured Solanke in a deal worth up to £65 million following his 19-goal season for Bournemouth."
    },
    {
        floor: 24,
        question: "How many total points were deducted from Everton across the 2023–24 Premier League season following appeals?",
        options: ["6", "8", "10", "12"],
        answer: "8",
        explanation: "Everton suffered two separate deductions of 6 points (reduced from 10) and 2 points for PSR breaches."
    },
    {
        floor: 25,
        question: "Which club won the 2023–24 EFL Championship title to earn direct promotion back to the Premier League?",
        options: ["Leicester City", "Ipswich Town", "Southampton", "Leeds United"],
        answer: "Leicester City",
        explanation: "Enzo Maresca's Leicester finished top with 97 points, one point ahead of Ipswich Town."
    },
    {
        floor: 26,
        question: "How many assists did Thierry Henry record in 2002–03, holding the joint single-season Premier League record?",
        options: ["18", "20", "22", "24"],
        answer: "20",
        explanation: "Henry set the 20-assist record, later matched by Kevin De Bruyne in the 2019–20 campaign."
    },
    {
        floor: 27,
        question: "Which squad number does Bukayo Saka wear for Arsenal?",
        options: ["7", "10", "11", "20"],
        answer: "7",
        explanation: "Saka took on the iconic number 7 shirt ahead of the 2020–21 season."
    },
    {
        floor: 28,
        question: "Who scored Chelsea's winning goal in their 1–0 victory over Manchester City in the 2021 UEFA Champions League final?",
        options: ["Kai Havertz", "Timo Werner", "Mason Mount", "N'Golo Kanté"],
        answer: "Kai Havertz",
        explanation: "Havertz latched onto Mason Mount's pass and rounded Ederson to score before half-time."
    },
    {
        floor: 29,
        question: "Which stadium is home to Wolverhampton Wanderers?",
        options: ["Molineux Stadium", "Villa Park", "Ewood Park", "Bramall Lane"],
        answer: "Molineux Stadium",
        explanation: "Wolves have played their home fixtures at Molineux since 1889."
    },
    {
        floor: 30,
        question: "Who scored the fastest goal in Premier League history after just 7.69 seconds for Southampton against Watford?",
        options: ["Shane Long", "Ledley King", "Philip Billing", "Alan Shearer"],
        answer: "Shane Long",
        explanation: "Long charged down Craig Cathcart's clearance right from kick-off in April 2019."
    },
    {
        floor: 31,
        question: "Who was top joint goalscorer in the 2023–24 UEFA Champions League alongside Harry Kane with 8 goals?",
        options: ["Kylian Mbappé", "Vinícius Júnior", "Antoine Griezmann", "Erling Haaland"],
        answer: "Kylian Mbappé",
        explanation: "Mbappé scored 8 goals for Paris Saint-Germain during their run to the semi-finals."
    },
    {
        floor: 32,
        question: "Which Premier League club appointed Julen Lopetegui as head coach ahead of the 2024–25 season?",
        options: ["West Ham United", "Brighton", "Wolverhampton Wanderers", "Leicester City"],
        answer: "West Ham United",
        explanation: "Lopetegui replaced David Moyes following the conclusion of the 2023–24 campaign."
    },
    {
        floor: 33,
        question: "What is the maximum number of substitutions allowed per team in a standard 90-minute Premier League match?",
        options: ["3", "4", "5", "6"],
        answer: "5",
        explanation: "Teams can make up to 5 substitutions across 3 stoppage opportunities during regulation time."
    },
    {
        floor: 34,
        question: "Which English club did Jude Bellingham represent before transferring to Borussia Dortmund in 2020?",
        options: ["Birmingham City", "Coventry City", "Derby County", "Sunderland"],
        answer: "Birmingham City",
        explanation: "Birmingham City retired Bellingham's number 22 shirt following his departure as a 17-year-old."
    },
    {
        floor: 35,
        question: "Who scored a dramatic 100th-minute winner for Coventry City to eliminate Wolves in the 2024 FA Cup quarter-finals?",
        options: ["Haji Wright", "Ellis Simms", "Callum O'Hare", "Milan van Ewijk"],
        answer: "Haji Wright",
        explanation: "Wright curled home in the 10th minute of stoppage time following Ellis Simms' 97th-minute equaliser."
    },
    {
        floor: 36,
        question: "Which club plays their home fixtures at the Gtech Community Stadium?",
        options: ["Brentford", "Fulham", "Crystal Palace", "Bournemouth"],
        answer: "Brentford",
        explanation: "Brentford moved into the 17,250-capacity venue in September 2020."
    },
    {
        floor: 37,
        question: "Who scored England's equalising goal from outside the box in the UEFA Euro 2024 final against Spain?",
        options: ["Cole Palmer", "Jude Bellingham", "Harry Kane", "Bukayo Saka"],
        answer: "Cole Palmer",
        explanation: "Palmer scored three minutes after coming off the bench before Spain scored a late winner."
    },
    {
        floor: 38,
        question: "Which French club did Kylian Mbappé depart on a free transfer to join Real Madrid in July 2024?",
        options: ["Paris Saint-Germain", "Monaco", "Lille", "Lyon"],
        answer: "Paris Saint-Germain",
        explanation: "Mbappé spent seven seasons at PSG, becoming the club's all-time leading scorer with 256 goals."
    },
    {
        floor: 39,
        question: "Who was appointed Liverpool club captain following Jordan Henderson's exit in the summer of 2023?",
        options: ["Virgil van Dijk", "Trent Alexander-Arnold", "Andy Robertson", "Mohamed Salah"],
        answer: "Virgil van Dijk",
        explanation: "Van Dijk was named captain with Trent Alexander-Arnold serving as vice-captain."
    },
    {
        floor: 40,
        question: "Which national team does Manchester City midfielder Rodri represent at international level?",
        options: ["Spain", "Portugal", "Brazil", "Argentina"],
        answer: "Spain",
        explanation: "Rodri anchored Spain's midfield during their victorious UEFA Nations League 2023 and Euro 2024 campaigns."
    },
    {
        floor: 41,
        question: "Who holds the record for the most clean sheets in Premier League history with 202 shutout matches?",
        options: ["Petr Čech", "David de Gea", "David Seaman", "Pepe Reina"],
        answer: "Petr Čech",
        explanation: "Čech recorded 202 clean sheets across spells with Chelsea and Arsenal."
    },
    {
        floor: 42,
        question: "Which German coach became the youngest permanent manager in Premier League history when hired by Brighton in 2024?",
        options: ["Fabian Hürzeler", "Kieran McKenna", "Russell Martin", "Andoni Iraola"],
        answer: "Fabian Hürzeler",
        explanation: "Hürzeler took charge of Brighton at 31 years of age after guiding St Pauli to Bundesliga promotion."
    },
    {
        floor: 43,
        question: "Who scored a hat-trick for Aston Villa in their 7–2 victory against reigning champions Liverpool in October 2020?",
        options: ["Ollie Watkins", "Jack Grealish", "John McGinn", "Ross Barkley"],
        answer: "Ollie Watkins",
        explanation: "Watkins scored a perfect first-half hat-trick in Villa's famous win at Villa Park."
    },
    {
        floor: 44,
        question: "Which Premier League club features a seagull on its official crest?",
        options: ["Brighton & Hove Albion", "Crystal Palace", "Norwich City", "Sheffield Wednesday"],
        answer: "Brighton & Hove Albion",
        explanation: "Brighton adopted the Seagulls nickname and crest emblem in the late 1970s."
    },
    {
        floor: 45,
        question: "Who scored Manchester City's 98th-minute equaliser in their dramatic 2–2 draw with 10-man Arsenal in September 2024?",
        options: ["John Stones", "Erling Haaland", "Bernardo Silva", "Rúben Dias"],
        answer: "John Stones",
        explanation: "Stones poked home from close range after Arsenal defended deep following Leandro Trossard's red card."
    }
];
