const QUESTIONS = {
  "General Knowledge": [
    [
      "What is the capital of Australia?",
      "Sydney",
      "Canberra",
      "Melbourne",
      "Perth",
      "B"
    ],
    [
      "Which is the largest planet in our solar system?",
      "Earth",
      "Saturn",
      "Jupiter",
      "Mars",
      "C"
    ],
    [
      "Who wrote the national anthem of India?",
      "Rabindranath Tagore",
      "Bankim Chandra Chattopadhyay",
      "Sarojini Naidu",
      "Subhas Chandra Bose",
      "A"
    ],
    [
      "Which is the largest ocean on Earth?",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
      "D"
    ],
    [
      "How many continents are there?",
      "5",
      "6",
      "7",
      "8",
      "C"
    ],
    [
      "Which instrument is used to measure temperature?",
      "Barometer",
      "Thermometer",
      "Hygrometer",
      "Ammeter",
      "B"
    ],
    [
      "What is the currency of Japan?",
      "Won",
      "Yuan",
      "Yen",
      "Ringgit",
      "C"
    ],
    [
      "Which gas is most abundant in Earth's atmosphere?",
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide",
      "Hydrogen",
      "B"
    ],
    [
      "Who is known as the Father of the Computer?",
      "Charles Babbage",
      "Alan Turing",
      "Tim Berners-Lee",
      "Bill Gates",
      "A"
    ],
    [
      "Which is the smallest prime number?",
      "0",
      "1",
      "2",
      "3",
      "C"
    ]
  ],
  "Current Affairs": [
    [
      "Which organization publishes the World Economic Outlook?",
      "World Bank",
      "IMF",
      "WTO",
      "UNESCO",
      "B"
    ],
    [
      "Which city hosted the 2024 Summer Olympics?",
      "Paris",
      "Tokyo",
      "London",
      "Los Angeles",
      "A"
    ],
    [
      "COP28 was held in which country?",
      "India",
      "Egypt",
      "United Arab Emirates",
      "Brazil",
      "C"
    ],
    [
      "Which Indian mission successfully landed near the Moon's south polar region in 2023?",
      "Mangalyaan",
      "Chandrayaan-2",
      "Chandrayaan-3",
      "Aditya-L1",
      "C"
    ],
    [
      "What does UPI stand for in digital payments?",
      "Unified Payments Interface",
      "Universal Payment Internet",
      "United Payment Integration",
      "User Payment Interface",
      "A"
    ],
    [
      "Which mission studies the Sun from a halo orbit around L1?",
      "Aditya-L1",
      "Chandrayaan-3",
      "Gaganyaan",
      "RISAT",
      "A"
    ],
    [
      "The G20 is primarily a forum for discussion of what?",
      "Global economic cooperation",
      "Space exploration only",
      "Olympic sports",
      "Film production",
      "A"
    ],
    [
      "Which country hosted the 2023 G20 Leaders' Summit?",
      "India",
      "Indonesia",
      "Italy",
      "Japan",
      "A"
    ],
    [
      "What is the main purpose of the Paris Agreement?",
      "Regulate oceans",
      "Address climate change",
      "Create a trade union",
      "Fund space missions",
      "B"
    ],
    [
      "Which Indian city is the headquarters of the Reserve Bank of India?",
      "New Delhi",
      "Kolkata",
      "Mumbai",
      "Chennai",
      "C"
    ]
  ],
  "Indian History": [
    [
      "Who founded the Maurya Empire?",
      "Ashoka",
      "Chandragupta Maurya",
      "Harsha",
      "Samudragupta",
      "B"
    ],
    [
      "The Battle of Plassey was fought in which year?",
      "1757",
      "1764",
      "1857",
      "1947",
      "A"
    ],
    [
      "Who was the first Mughal emperor of India?",
      "Akbar",
      "Humayun",
      "Babur",
      "Shah Jahan",
      "C"
    ],
    [
      "Who founded the Brahmo Samaj?",
      "Swami Vivekananda",
      "Raja Ram Mohan Roy",
      "Dayanand Saraswati",
      "Ishwar Chandra Vidyasagar",
      "B"
    ],
    [
      "The Dandi March was associated with which movement?",
      "Quit India Movement",
      "Non-Cooperation Movement",
      "Civil Disobedience Movement",
      "Swadeshi Movement",
      "C"
    ],
    [
      "Who gave the slogan 'Do or Die' during the freedom struggle?",
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Bhagat Singh",
      "Sardar Patel",
      "A"
    ],
    [
      "The Quit India Movement began in which year?",
      "1919",
      "1930",
      "1942",
      "1947",
      "C"
    ],
    [
      "Who was the last Viceroy of British India?",
      "Lord Curzon",
      "Lord Mountbatten",
      "Lord Wellesley",
      "Lord Dalhousie",
      "B"
    ],
    [
      "Which ancient university was located in present-day Bihar?",
      "Takshashila",
      "Nalanda",
      "Vikramashila",
      "Valabhi",
      "B"
    ],
    [
      "Who was known as the 'Iron Man of India'?",
      "Sardar Vallabhbhai Patel",
      "Lal Bahadur Shastri",
      "B. R. Ambedkar",
      "Rajendra Prasad",
      "A"
    ]
  ],
  "Indian Geography": [
    [
      "Which is the longest river in India?",
      "Ganga",
      "Yamuna",
      "Godavari",
      "Narmada",
      "A"
    ],
    [
      "Which state has the longest coastline in India?",
      "Tamil Nadu",
      "Gujarat",
      "Maharashtra",
      "Kerala",
      "B"
    ],
    [
      "The Thar Desert is mainly located in which state?",
      "Rajasthan",
      "Gujarat",
      "Punjab",
      "Haryana",
      "A"
    ],
    [
      "Which mountain range forms India's northern boundary?",
      "Aravalli",
      "Western Ghats",
      "Himalayas",
      "Vindhyas",
      "C"
    ],
    [
      "Which river is known as the 'Sorrow of Bihar'?",
      "Kosi",
      "Ganga",
      "Son",
      "Gandak",
      "A"
    ],
    [
      "Which is the largest state of India by area?",
      "Madhya Pradesh",
      "Maharashtra",
      "Rajasthan",
      "Uttar Pradesh",
      "C"
    ],
    [
      "Which Indian state is famous for the Sundarbans?",
      "Odisha",
      "West Bengal",
      "Assam",
      "Bihar",
      "B"
    ],
    [
      "The Western Ghats run along which coast?",
      "Eastern coast",
      "Western coast",
      "Northern plains",
      "Northeastern hills",
      "B"
    ],
    [
      "Which lake is the largest freshwater lake in India?",
      "Dal Lake",
      "Wular Lake",
      "Chilika Lake",
      "Sambhar Lake",
      "B"
    ],
    [
      "Which line divides India roughly into northern and southern parts?",
      "Equator",
      "Tropic of Cancer",
      "Prime Meridian",
      "Arctic Circle",
      "B"
    ]
  ],
  "Indian Polity": [
    [
      "When did the Constitution of India come into effect?",
      "15 August 1947",
      "26 January 1950",
      "26 November 1949",
      "2 October 1950",
      "B"
    ],
    [
      "Who is the constitutional head of the Union of India?",
      "Prime Minister",
      "President",
      "Chief Justice",
      "Speaker",
      "B"
    ],
    [
      "How many Fundamental Rights are currently guaranteed by the Constitution?",
      "5",
      "6",
      "7",
      "8",
      "B"
    ],
    [
      "Which house of Parliament is also called the House of the People?",
      "Rajya Sabha",
      "Lok Sabha",
      "Vidhan Sabha",
      "Legislative Council",
      "B"
    ],
    [
      "Who appoints the Prime Minister of India?",
      "Chief Justice",
      "President",
      "Lok Sabha Speaker",
      "Election Commission",
      "B"
    ],
    [
      "What is the minimum age to become a member of the Lok Sabha?",
      "18",
      "21",
      "25",
      "30",
      "C"
    ],
    [
      "Which body conducts elections to Parliament in India?",
      "UPSC",
      "Election Commission of India",
      "Finance Commission",
      "NITI Aayog",
      "B"
    ],
    [
      "The Directive Principles of State Policy are contained in which part?",
      "Part II",
      "Part III",
      "Part IV",
      "Part V",
      "C"
    ],
    [
      "Who is the ex-officio Chairman of the Rajya Sabha?",
      "President",
      "Vice-President",
      "Prime Minister",
      "Speaker",
      "B"
    ],
    [
      "Which amendment lowered the voting age from 21 to 18?",
      "42nd",
      "44th",
      "61st",
      "73rd",
      "C"
    ]
  ],
  "Science & Technology": [
    [
      "Which device converts chemical energy into electrical energy?",
      "Motor",
      "Battery",
      "Transformer",
      "Generator",
      "B"
    ],
    [
      "What does CPU stand for?",
      "Central Processing Unit",
      "Computer Primary Unit",
      "Central Program Utility",
      "Control Processing User",
      "A"
    ],
    [
      "Which technology is used to make objects layer by layer from a digital model?",
      "3D printing",
      "Bluetooth",
      "GPS",
      "NFC",
      "A"
    ],
    [
      "Which semiconductor material is widely used in computer chips?",
      "Copper",
      "Silicon",
      "Iron",
      "Aluminium",
      "B"
    ],
    [
      "What does GPS stand for?",
      "Global Positioning System",
      "General Processing Satellite",
      "Global Power Signal",
      "Geographic Program Service",
      "A"
    ],
    [
      "Which type of network connects devices over a small local area?",
      "WAN",
      "LAN",
      "MAN",
      "PAN only",
      "B"
    ],
    [
      "What is the SI unit of electric current?",
      "Volt",
      "Ohm",
      "Ampere",
      "Watt",
      "C"
    ],
    [
      "Which invention is most directly associated with Tim Berners-Lee?",
      "World Wide Web",
      "Steam engine",
      "Telephone",
      "Radio",
      "A"
    ],
    [
      "What does USB stand for?",
      "Universal Serial Bus",
      "United System Board",
      "Universal Storage Block",
      "User Service Bus",
      "A"
    ],
    [
      "Which technology enables contactless short-range communication between devices?",
      "NFC",
      "FTP",
      "SMTP",
      "HTTP",
      "A"
    ]
  ],
  "Sports": [
    [
      "How many players are on the field for one football (soccer) team at a time?",
      "9",
      "10",
      "11",
      "12",
      "C"
    ],
    [
      "Which country won the 2023 ICC Men's Cricket World Cup?",
      "India",
      "Australia",
      "England",
      "New Zealand",
      "B"
    ],
    [
      "In tennis, what is the score called at 40-40?",
      "Advantage",
      "Deuce",
      "Love",
      "Break",
      "B"
    ],
    [
      "How many rings are on the Olympic flag?",
      "4",
      "5",
      "6",
      "7",
      "B"
    ],
    [
      "Which sport uses the term 'checkmate'?",
      "Boxing",
      "Chess",
      "Hockey",
      "Badminton",
      "B"
    ],
    [
      "The Thomas Cup is associated with which sport?",
      "Badminton",
      "Football",
      "Tennis",
      "Cricket",
      "A"
    ],
    [
      "How many overs are there in a standard T20 cricket innings?",
      "10",
      "20",
      "40",
      "50",
      "B"
    ],
    [
      "Which country is traditionally associated with the martial art judo?",
      "China",
      "Japan",
      "Korea",
      "Thailand",
      "B"
    ],
    [
      "In basketball, how many points is a free throw worth?",
      "1",
      "2",
      "3",
      "4",
      "A"
    ],
    [
      "Which athlete is known for the men's 100 m world record of 9.58 seconds?",
      "Usain Bolt",
      "Carl Lewis",
      "Mo Farah",
      "Michael Johnson",
      "A"
    ]
  ],
  "Entertainment": [
    [
      "Which Indian film industry is popularly known as Bollywood?",
      "Tamil cinema",
      "Hindi cinema",
      "Bengali cinema",
      "Marathi cinema",
      "B"
    ],
    [
      "Who directed the film 'Jurassic Park'?",
      "Christopher Nolan",
      "Steven Spielberg",
      "James Cameron",
      "Ridley Scott",
      "B"
    ],
    [
      "Which award is primarily associated with excellence in American cinema?",
      "Grammy",
      "Oscar",
      "Emmy",
      "Tony",
      "B"
    ],
    [
      "Which instrument has 88 keys in its standard modern form?",
      "Violin",
      "Piano",
      "Flute",
      "Trumpet",
      "B"
    ],
    [
      "Which genre commonly features imaginary worlds and magical elements?",
      "Fantasy",
      "Documentary",
      "News",
      "Biography",
      "A"
    ],
    [
      "The Grammy Awards are mainly associated with which field?",
      "Music",
      "Science",
      "Sports",
      "Architecture",
      "A"
    ],
    [
      "Which platform is primarily known for streaming films and TV series?",
      "Netflix",
      "GitHub",
      "LinkedIn",
      "Wikipedia",
      "A"
    ],
    [
      "Who composed the music for the film 'Interstellar'?",
      "Hans Zimmer",
      "John Williams",
      "A. R. Rahman",
      "Danny Elfman",
      "A"
    ],
    [
      "Which Indian musician won two Oscars for 'Slumdog Millionaire'?",
      "A. R. Rahman",
      "R. D. Burman",
      "Ilaiyaraaja",
      "Vishal Bhardwaj",
      "A"
    ],
    [
      "What does a screenplay primarily contain?",
      "Instructions for cooking",
      "Story and scene directions for a film",
      "Sports statistics",
      "Financial statements",
      "B"
    ]
  ],
  "Computer Science": [
    [
      "Which data structure follows FIFO order?",
      "Stack",
      "Queue",
      "Tree",
      "Graph",
      "B"
    ],
    [
      "Which language is primarily used to style web pages?",
      "HTML",
      "CSS",
      "SQL",
      "Python",
      "B"
    ],
    [
      "What does SQL stand for?",
      "Structured Query Language",
      "Simple Question Language",
      "System Query Logic",
      "Structured Queue List",
      "A"
    ],
    [
      "Which traversal visits a binary tree in root-left-right order?",
      "Inorder",
      "Postorder",
      "Preorder",
      "Level order only",
      "C"
    ],
    [
      "What is the time complexity of binary search on a sorted array?",
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1) always",
      "B"
    ],
    [
      "Which protocol is commonly used to transfer web pages securely?",
      "HTTP",
      "HTTPS",
      "FTP",
      "SMTP",
      "B"
    ],
    [
      "Which keyword is used to define a class in Java?",
      "object",
      "class",
      "define",
      "struct",
      "B"
    ],
    [
      "What does OOP stand for?",
      "Object-Oriented Programming",
      "Open Online Protocol",
      "Object Order Process",
      "Operating Output Program",
      "A"
    ],
    [
      "Which database key uniquely identifies a row?",
      "Foreign key",
      "Primary key",
      "Candidate list",
      "Index only",
      "B"
    ],
    [
      "Which sorting algorithm repeatedly selects the smallest remaining element?",
      "Merge sort",
      "Selection sort",
      "Quick sort",
      "Heap sort",
      "B"
    ]
  ],
  "Logical Reasoning": [
    [
      "Find the next number: 2, 4, 8, 16, ?",
      "20",
      "24",
      "32",
      "36",
      "C"
    ],
    [
      "If CAT is coded as DBU, how is DOG coded using the same pattern?",
      "EPH",
      "EOG",
      "DPH",
      "FQI",
      "A"
    ],
    [
      "Find the odd one out.",
      "Apple",
      "Mango",
      "Carrot",
      "Banana",
      "C"
    ],
    [
      "A is taller than B, and B is taller than C. Who is shortest?",
      "A",
      "B",
      "C",
      "Cannot say",
      "C"
    ],
    [
      "If today is Monday, what day will it be after 10 days?",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "B"
    ],
    [
      "Complete the series: 3, 6, 11, 18, 27, ?",
      "36",
      "38",
      "40",
      "42",
      "B"
    ],
    [
      "If all roses are flowers and some flowers fade quickly, which statement must be true?",
      "All roses fade quickly",
      "All flowers are roses",
      "Roses are flowers",
      "No roses fade",
      "C"
    ],
    [
      "A clock shows 3:00. What is the angle between the hands?",
      "0°",
      "30°",
      "90°",
      "180°",
      "C"
    ],
    [
      "Which word does not belong?",
      "Square",
      "Triangle",
      "Circle",
      "Cube",
      "D"
    ],
    [
      "If 5 workers finish a job in 12 days at the same rate, how many days would 10 workers take?",
      "3",
      "6",
      "12",
      "24",
      "B"
    ]
  ],
  "Mathematics": [
    [
      "What is 15% of 200?",
      "20",
      "25",
      "30",
      "35",
      "C"
    ],
    [
      "What is the square root of 144?",
      "10",
      "11",
      "12",
      "14",
      "C"
    ],
    [
      "If 2x + 5 = 15, what is x?",
      "4",
      "5",
      "6",
      "10",
      "B"
    ],
    [
      "What is the area of a rectangle of length 8 cm and width 5 cm?",
      "13 cm²",
      "26 cm²",
      "40 cm²",
      "80 cm²",
      "C"
    ],
    [
      "What is the value of 3² + 4²?",
      "7",
      "12",
      "25",
      "49",
      "C"
    ],
    [
      "What is the HCF of 18 and 24?",
      "3",
      "6",
      "9",
      "12",
      "B"
    ],
    [
      "A triangle has angles 50° and 60°. What is the third angle?",
      "60°",
      "70°",
      "80°",
      "90°",
      "B"
    ],
    [
      "What is the average of 10, 20 and 30?",
      "15",
      "20",
      "25",
      "30",
      "B"
    ],
    [
      "What is 7 × 8?",
      "48",
      "54",
      "56",
      "64",
      "C"
    ],
    [
      "If a train travels 120 km in 2 hours, what is its average speed?",
      "40 km/h",
      "50 km/h",
      "60 km/h",
      "80 km/h",
      "C"
    ]
  ],
  "English": [
    [
      "Choose the synonym of 'rapid'.",
      "Slow",
      "Quick",
      "Weak",
      "Quiet",
      "B"
    ],
    [
      "Choose the antonym of 'ancient'.",
      "Old",
      "Modern",
      "Historic",
      "Early",
      "B"
    ],
    [
      "Which sentence is grammatically correct?",
      "She go to school.",
      "She goes to school.",
      "She going to school.",
      "She gone to school.",
      "B"
    ],
    [
      "What is the plural of 'child'?",
      "Childs",
      "Childes",
      "Children",
      "Childrens",
      "C"
    ],
    [
      "Identify the noun: 'The teacher explained the lesson.'",
      "explained",
      "the",
      "teacher",
      "lesson",
      "C"
    ],
    [
      "Fill in the blank: He is ___ honest man.",
      "a",
      "an",
      "the",
      "no article",
      "B"
    ],
    [
      "What is the past tense of 'write'?",
      "writed",
      "written",
      "wrote",
      "writes",
      "C"
    ],
    [
      "Choose the correct spelling.",
      "Definately",
      "Definitely",
      "Definetely",
      "Definatly",
      "B"
    ],
    [
      "What type of word is 'beautiful'?",
      "Noun",
      "Verb",
      "Adjective",
      "Adverb",
      "C"
    ],
    [
      "Choose the correct preposition: The book is ___ the table.",
      "on",
      "at",
      "to",
      "by",
      "A"
    ]
  ],
  "Environment": [
    [
      "Which gas is a major greenhouse gas emitted by human activities?",
      "Carbon dioxide",
      "Helium",
      "Neon",
      "Argon",
      "A"
    ],
    [
      "What is the process of planting trees to restore forests called?",
      "Deforestation",
      "Afforestation",
      "Urbanization",
      "Mining",
      "B"
    ],
    [
      "Which renewable source uses sunlight to generate electricity?",
      "Solar energy",
      "Coal",
      "Petroleum",
      "Natural gas",
      "A"
    ],
    [
      "What does biodiversity mean?",
      "Variety of life",
      "Amount of rainfall",
      "Soil thickness",
      "Air pressure",
      "A"
    ],
    [
      "Which practice reduces household waste?",
      "Reuse and recycle",
      "Burn everything",
      "Use more plastic",
      "Dump waste in rivers",
      "A"
    ],
    [
      "The ozone layer is mainly found in which atmospheric layer?",
      "Troposphere",
      "Stratosphere",
      "Mesosphere",
      "Thermosphere",
      "B"
    ],
    [
      "Which gas protects Earth from much of the Sun's ultraviolet radiation through the ozone layer?",
      "Ozone",
      "Nitrogen",
      "Hydrogen",
      "Methane",
      "A"
    ],
    [
      "What is rainwater harvesting?",
      "Collecting and storing rainwater",
      "Making artificial rain",
      "Removing groundwater",
      "Measuring rainfall only",
      "A"
    ],
    [
      "Which is a non-renewable resource?",
      "Wind",
      "Solar",
      "Coal",
      "Tidal energy",
      "C"
    ],
    [
      "What is the main aim of sustainable development?",
      "Meet present needs without harming future generations",
      "Use all resources quickly",
      "Stop all development",
      "Increase waste",
      "A"
    ]
  ],
  "Economics": [
    [
      "What does GDP measure?",
      "Total value of final goods and services produced",
      "Government tax rate only",
      "Population only",
      "Exports only",
      "A"
    ],
    [
      "What is inflation?",
      "A sustained rise in general price levels",
      "A fall in population",
      "A rise in rainfall",
      "A decrease in money supply only",
      "A"
    ],
    [
      "Which institution is India's central bank?",
      "SBI",
      "RBI",
      "SEBI",
      "NITI Aayog",
      "B"
    ],
    [
      "What is a budget deficit?",
      "When government spending exceeds revenue",
      "When exports exceed imports",
      "When savings exceed income",
      "When prices fall",
      "A"
    ],
    [
      "Demand generally falls when price rises, other things equal. This is known as what?",
      "Law of demand",
      "Law of supply",
      "Gresham's law",
      "Say's law",
      "A"
    ],
    [
      "What is a monopoly?",
      "A market with one dominant seller",
      "A market with many equal sellers",
      "A government budget",
      "A type of tax",
      "A"
    ],
    [
      "Which is a direct tax in India?",
      "GST",
      "Income tax",
      "Customs duty",
      "Excise on goods",
      "B"
    ],
    [
      "What does per capita income mean?",
      "Income per person",
      "Total exports",
      "Corporate profit",
      "Government revenue",
      "A"
    ],
    [
      "What is a recession generally associated with?",
      "A significant decline in economic activity",
      "Rapid population growth",
      "Higher rainfall",
      "More holidays",
      "A"
    ],
    [
      "Which organization regulates the securities market in India?",
      "SEBI",
      "RBI",
      "IRDAI",
      "UPSC",
      "A"
    ]
  ],
  "World History": [
    [
      "The Renaissance began in which region?",
      "Western Europe, especially Italy",
      "East Asia",
      "South America",
      "Australia",
      "A"
    ],
    [
      "Who was the first emperor of Rome?",
      "Julius Caesar",
      "Augustus",
      "Nero",
      "Constantine",
      "B"
    ],
    [
      "The French Revolution began in which year?",
      "1688",
      "1776",
      "1789",
      "1815",
      "C"
    ],
    [
      "Which ancient civilization built the pyramids at Giza?",
      "Roman",
      "Egyptian",
      "Mayan",
      "Persian",
      "B"
    ],
    [
      "Who wrote the 95 Theses associated with the Protestant Reformation?",
      "Martin Luther",
      "Galileo",
      "Newton",
      "Columbus",
      "A"
    ],
    [
      "World War II ended in which year?",
      "1942",
      "1945",
      "1947",
      "1950",
      "B"
    ],
    [
      "The Industrial Revolution first began in which country?",
      "France",
      "Britain",
      "Germany",
      "Spain",
      "B"
    ],
    [
      "Who was the first human to travel into outer space?",
      "Neil Armstrong",
      "Yuri Gagarin",
      "Buzz Aldrin",
      "John Glenn",
      "B"
    ],
    [
      "The United Nations was founded in which year?",
      "1919",
      "1945",
      "1955",
      "1965",
      "B"
    ],
    [
      "The ancient city of Rome was founded on which river?",
      "Nile",
      "Tiber",
      "Danube",
      "Thames",
      "B"
    ]
  ],
  "World Geography": [
    [
      "What is the capital of Canada?",
      "Toronto",
      "Ottawa",
      "Vancouver",
      "Montreal",
      "B"
    ],
    [
      "Which is the largest country by area?",
      "China",
      "Canada",
      "Russia",
      "United States",
      "C"
    ],
    [
      "The Amazon rainforest is primarily located in which continent?",
      "Africa",
      "Asia",
      "South America",
      "Europe",
      "C"
    ],
    [
      "Which is the longest river in South America?",
      "Amazon River",
      "Nile",
      "Yangtze",
      "Mississippi",
      "A"
    ],
    [
      "Mount Everest lies in which mountain range?",
      "Andes",
      "Alps",
      "Himalayas",
      "Rockies",
      "C"
    ],
    [
      "Which country is known as the Land of the Rising Sun?",
      "China",
      "Japan",
      "Thailand",
      "South Korea",
      "B"
    ],
    [
      "What is the capital of Brazil?",
      "Rio de Janeiro",
      "Sao Paulo",
      "Brasilia",
      "Salvador",
      "C"
    ],
    [
      "Which desert is the largest hot desert in the world?",
      "Gobi",
      "Sahara",
      "Kalahari",
      "Atacama",
      "B"
    ],
    [
      "Which ocean lies between Africa and Australia?",
      "Atlantic",
      "Indian",
      "Pacific",
      "Arctic",
      "B"
    ],
    [
      "Which continent contains the most countries?",
      "Asia",
      "Europe",
      "Africa",
      "South America",
      "C"
    ]
  ],
  "General Science": [
    [
      "What is the chemical symbol for water?",
      "CO2",
      "H2O",
      "O2",
      "NaCl",
      "B"
    ],
    [
      "Which organ pumps blood through the human body?",
      "Lungs",
      "Heart",
      "Liver",
      "Kidneys",
      "B"
    ],
    [
      "What force pulls objects toward Earth?",
      "Magnetism",
      "Gravity",
      "Friction",
      "Electricity",
      "B"
    ],
    [
      "Which planet is known as the Red Planet?",
      "Venus",
      "Mars",
      "Jupiter",
      "Mercury",
      "B"
    ],
    [
      "What is the boiling point of water at sea level?",
      "50°C",
      "75°C",
      "100°C",
      "150°C",
      "C"
    ],
    [
      "Which blood cells help fight infections?",
      "Red blood cells",
      "White blood cells",
      "Platelets",
      "Plasma only",
      "B"
    ],
    [
      "Plants make food mainly through which process?",
      "Respiration",
      "Photosynthesis",
      "Digestion",
      "Fermentation",
      "B"
    ],
    [
      "What is the basic unit of life?",
      "Atom",
      "Cell",
      "Tissue",
      "Organ",
      "B"
    ],
    [
      "Which metal is liquid at room temperature?",
      "Iron",
      "Mercury",
      "Copper",
      "Aluminium",
      "B"
    ],
    [
      "What is the speed of light in vacuum approximately?",
      "3 × 10^8 m/s",
      "3 × 10^6 m/s",
      "3 × 10^4 m/s",
      "3 × 10^2 m/s",
      "A"
    ]
  ],
  "Cyber Security": [
    [
      "What is phishing?",
      "A fraudulent attempt to obtain sensitive information",
      "A type of printer",
      "A backup method",
      "A programming language",
      "A"
    ],
    [
      "Which password is strongest?",
      "password123",
      "Harshit2026",
      "Qwerty",
      "A long unique passphrase with mixed characters",
      "D"
    ],
    [
      "What does MFA add to account security?",
      "Multiple verification factors",
      "More usernames",
      "Faster internet",
      "Automatic backups",
      "A"
    ],
    [
      "What is malware?",
      "Malicious software",
      "A web browser",
      "A database",
      "A firewall rule",
      "A"
    ],
    [
      "Which protocol encrypts web traffic using TLS?",
      "HTTP",
      "HTTPS",
      "FTP",
      "Telnet",
      "B"
    ],
    [
      "What is ransomware designed to do?",
      "Encrypt or lock data and demand payment",
      "Improve computer speed",
      "Clean temporary files",
      "Update drivers",
      "A"
    ],
    [
      "Which practice helps protect against account takeover?",
      "Using unique passwords and MFA",
      "Sharing passwords",
      "Disabling updates",
      "Using the same password everywhere",
      "A"
    ],
    [
      "What is a firewall used for?",
      "Controlling network traffic based on rules",
      "Editing photos",
      "Compressing videos",
      "Creating spreadsheets",
      "A"
    ],
    [
      "Why are software updates important for security?",
      "They can fix known vulnerabilities",
      "They always increase storage",
      "They remove all files",
      "They disable encryption",
      "A"
    ],
    [
      "What should you do with a suspicious email attachment?",
      "Open it immediately",
      "Forward it to everyone",
      "Avoid opening it and verify the sender",
      "Disable antivirus",
      "C"
    ]
  ],
  "Artificial Intelligence": [
    [
      "What is machine learning?",
      "A method where systems learn patterns from data",
      "A type of keyboard",
      "Manual filing",
      "A network cable",
      "A"
    ],
    [
      "Which is an example of supervised learning?",
      "Learning from labeled training data",
      "Random guessing",
      "Deleting a dataset",
      "Encrypting a file",
      "A"
    ],
    [
      "What does NLP stand for?",
      "Natural Language Processing",
      "Network Logic Protocol",
      "New Learning Program",
      "Natural Link Platform",
      "A"
    ],
    [
      "What is a neural network inspired by?",
      "Biological nervous systems",
      "Car engines",
      "Bridges",
      "Databases only",
      "A"
    ],
    [
      "What is a model in machine learning?",
      "A learned mathematical/computational representation",
      "A physical robot only",
      "A database table",
      "A network switch",
      "A"
    ],
    [
      "What is overfitting?",
      "A model fits training data too closely and generalizes poorly",
      "A model has no data",
      "A model is always correct",
      "A model is too small to run",
      "A"
    ],
    [
      "Which metric is commonly used for classification accuracy?",
      "Percentage of correct predictions",
      "Disk size",
      "CPU temperature",
      "Network speed",
      "A"
    ],
    [
      "What is generative AI designed to do?",
      "Generate new content such as text or images",
      "Only store passwords",
      "Only route network packets",
      "Only compress files",
      "A"
    ],
    [
      "What is a training dataset?",
      "Data used to learn model parameters",
      "A computer monitor",
      "A web server",
      "A password manager",
      "A"
    ],
    [
      "Why is human evaluation important for AI systems?",
      "To check quality, safety and context",
      "To make CPUs faster",
      "To replace all testing",
      "To remove all data",
      "A"
    ]
  ],
  "Business & Management": [
    [
      "What is a business plan?",
      "A document describing goals, strategy and operations",
      "A tax receipt only",
      "A password list",
      "A sports schedule",
      "A"
    ],
    [
      "What does ROI stand for?",
      "Return on Investment",
      "Rate of Income",
      "Revenue of Industry",
      "Return of Inventory",
      "A"
    ],
    [
      "Which function focuses on attracting and developing employees?",
      "Marketing",
      "Human Resources",
      "Accounting",
      "Logistics",
      "B"
    ],
    [
      "What is market segmentation?",
      "Dividing a market into groups with similar characteristics",
      "Closing a business",
      "Increasing tax rates",
      "Hiring only managers",
      "A"
    ],
    [
      "What is leadership?",
      "Influencing and guiding people toward goals",
      "Only giving orders",
      "Preparing invoices",
      "Writing code only",
      "A"
    ],
    [
      "What is a stakeholder?",
      "A person or group affected by or able to affect an organization",
      "Only a shareholder",
      "Only a customer",
      "Only an employee",
      "A"
    ],
    [
      "What does SWOT stand for?",
      "Strengths, Weaknesses, Opportunities, Threats",
      "Sales, Work, Operations, Tax",
      "Strategy, Wealth, Output, Trade",
      "Systems, Workforce, Objectives, Targets",
      "A"
    ],
    [
      "What is cash flow?",
      "Movement of cash into and out of a business",
      "Total number of employees",
      "Market share only",
      "Brand color",
      "A"
    ],
    [
      "What is customer retention?",
      "Keeping existing customers over time",
      "Finding office space",
      "Reducing product quality",
      "Closing accounts",
      "A"
    ],
    [
      "Which is an example of a fixed cost?",
      "Monthly office rent",
      "Sales commission per sale",
      "Packaging per unit",
      "Raw material per product",
      "A"
    ]
  ]
};
module.exports = QUESTIONS;
