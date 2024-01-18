import React from 'react'

// const tripPlanSuggestions = {
//     "Agra": {
//         "3_days": ["Visit Taj Mahal", "Explore Agra Fort", "Stroll in the local markets"],
//         "4_days": ["Add Fatehpur Sikri to the itinerary"],
//         "5_days": ["Visit Mehtab Bagh for a view of Taj Mahal at sunset"],
//         "7_days": ["Explore nearby towns like Mathura and Vrindavan"],
//         "10_days": ["Extend to Orchha and Gwalior for historical exploration"]
//     },
//     "Varanasi": {
//         "3_days": ["Experience Ganga Aarti", "Explore Kashi Vishwanath Temple", "Take a boat ride on the Ganges"],
//         "4_days": ["Visit Sarnath, an important Buddhist pilgrimage site"],
//         "5_days": ["Explore local markets and street food"],
//         "7_days": ["Participate in spiritual activities and yoga retreats"],
//         "10_days": ["Extend to nearby towns like Allahabad and Bodh Gaya"]
//     },
//     "Kerala": {
//         "3_days": ["Relax on the backwaters", "Visit Fort Kochi", "Explore Munnar's tea gardens"],
//         "4_days": ["Add a houseboat stay on Alleppey backwaters"],
//         "5_days": ["Experience a traditional Kathakali performance"],
//         "7_days": ["Explore Periyar National Park for wildlife"],
//         "10_days": ["Extend to Wayanad for nature and adventure activities"]
//     },
//     "Goa": {
//         "3_days": ["Relax on beaches", "Explore Old Goa's churches", "Enjoy nightlife"],
//         "4_days": ["Add a day for water sports and beach activities"],
//         "5_days": ["Visit Dudhsagar Waterfalls", "Explore spice plantations"],
//         "7_days": ["Take a day trip to Gokarna", "Explore quieter beaches"],
//         "10_days": ["Extend to nearby states like Karnataka and Maharashtra"]
//     },
// };

const tripPlanSuggestions = {
    "Agra": {
        "3_days": [
            "Visit Taj Mahal at sunrise",
            "Explore Agra Fort",
            "Stroll in the local markets",
            "Try local street food"
        ],
        "4_days": [
            "Add Fatehpur Sikri to the itinerary",
            "Visit Tomb of Itimad-ud-Daulah",
            "Shop for handicrafts in Sadar Bazaar"
        ],
        "5_days": [
            "Visit Mehtab Bagh for a view of Taj Mahal at sunset",
            "Explore Akbar's Tomb in Sikandra",
            "Take a heritage walk in the city",
            "Attend a cultural show in the evening"
        ],
        "One_week": [
            "Explore nearby towns like Mathura and Vrindavan",
            "Visit Bateshwar Temples",
            "Take a boat ride on the Yamuna River",
            "Experience local village life"
        ],
        "10_days": [
            "Extend to Orchha and Gwalior for historical exploration",
            "Visit the Chambal Safari Sanctuary",
            "Explore Gwalior Fort and Jai Vilas Palace"
        ]
    },
    "Varanasi": {
        "3_days": [
            "Experience Ganga Aarti at Dashashwamedh Ghat",
            "Explore Kashi Vishwanath Temple",
            "Take a boat ride on the Ganges",
            "Visit Assi Ghat"
        ],
        "4_days": [
            "Visit Sarnath, an important Buddhist pilgrimage site",
            "Explore the Ramnagar Fort",
            "Participate in a morning yoga session",
            "Shop for Banarasi silk sarees"
        ],
        "5_days": [
            "Explore local markets and street food",
            "Take a cycle rickshaw ride in narrow lanes",
            "Visit Bharat Kala Bhavan Museum",
            "Attend a classical music or dance performance"
        ],
        "One_week": [
            "Participate in spiritual activities and yoga retreats",
            "Take a day trip to Chunar Fort",
            "Explore nearby villages along the Ganges",
            "Experience a rural cooking workshop"
        ],
        "10_days": [
            "Extend to nearby towns like Allahabad and Bodh Gaya",
            "Visit Nalanda and Rajgir for historical sites",
            "Explore the ruins of Vikramshila University"
        ]
    },
    "Kerala": {
        "3_days": [
            "Relax on the backwaters",
            "Visit Fort Kochi and Chinese Fishing Nets",
            "Explore Munnar's tea gardens",
            "Try traditional Kerala cuisine"
        ],
        "4_days": [
            "Add a houseboat stay on Alleppey backwaters",
            "Visit Periyar Wildlife Sanctuary",
            "Explore the beaches in Varkala",
            "Experience a Kathakali performance"
        ],
        "5_days": [
            "Visit the historic Mattancherry Palace",
            "Explore the beautiful beaches of Kovalam",
            "Take a spice plantation tour",
            "Enjoy a traditional Ayurvedic massage"
        ],
        "One_week": [
            "Explore Periyar National Park for wildlife",
            "Visit the backwater village of Kumarakom",
            "Relax on the beaches of Poovar",
            "Experience a houseboat cruise through lesser-known backwaters"
        ],
        "10_days": [
            "Extend to Wayanad for nature and adventure activities",
            "Visit the hill station of Vagamon",
            "Explore the historic Bekal Fort",
            "Participate in a traditional Theyyam dance performance"
        ]
    },
    "Goa": {
        "3_days": [
            "Relax on the beaches",
            "Explore Old Goa's churches",
            "Enjoy nightlife at popular beach clubs",
            "Try Goan seafood"
        ],
        "4_days": [
            "Add a day for water sports and beach activities",
            "Explore the Dudhsagar Waterfalls",
            "Visit spice plantations",
            "Attend a local Goan festival"
        ],
        "5_days": [
            "Visit the Cotigao Wildlife Sanctuary",
            "Explore the Fontainhas Latin Quarter",
            "Enjoy a sunset cruise on the Mandovi River",
            "Take a day trip to Anjuna Flea Market"
        ],
        "One_week": [
            "Explore quieter beaches like Palolem and Agonda",
            "Visit the Salim Ali Bird Sanctuary",
            "Take a day trip to Gokarna in Karnataka",
            "Experience a Goan cooking class"
        ],
        "10_days": [
            "Extend to nearby states like Karnataka and Maharashtra",
            "Explore the Western Ghats in the Sattari region",
            "Visit the historic Belgaum Fort",
            "Take a road trip along the picturesque Konkan coast"
        ]
    },
    "Hyderabad": {
        "3_days": [
            "Visit Golconda Fort",
            "Explore Charminar and the Mecca Masjid",
            "Stroll through Lumbini Park",
            "Try Hyderabadi Biryani"
        ],
        "4_days": [
            "Add a visit to the Salar Jung Museum",
            "Explore the Qutb Shahi Tombs",
            "Shop at Laad Bazaar for bangles",
            "Visit the Birla Mandir"
        ],
        "5_days": [
            "Take a day trip to Ramoji Film City",
            "Visit Chowmohallah Palace",
            "Explore the Nizam's Museum",
            "Experience the nightlife at Necklace Road"
        ],
        "One_week": [
            "Visit the Shilparamam Crafts Village",
            "Explore the Nehru Zoological Park",
            "Take a day trip to Bidar in Karnataka",
            "Attend a classical dance or music performance"
        ],
        "10_days": [
            "Extend to Warangal for historical exploration",
            "Visit the Nagarjuna Sagar Dam",
            "Explore the ancient temples of Yadagirigutta",
            "Take a trek in the nearby Eastern Ghats"
        ]
    },
    "Delhi": {
        "3_days": [
            "Visit India Gate",
            "Explore Humayun's Tomb",
            "Stroll through Connaught Place",
            "Explore local markets like Chandni Chowk"
        ],
        "4_days": [
            "Add a visit to Qutub Minar",
            "Explore the National Gallery of Modern Art",
            "Visit Lotus Temple",
            "Explore the Dilli Haat market"
        ],
        "5_days": [
            "Visit the Red Fort",
            "Explore the Akshardham Temple",
            "Take a walk in Lodhi Gardens",
            "Shop for handicrafts at Janpath"
        ],
        "One_week": [
            "Explore the National Museum",
            "Visit the historic Agrasen ki Baoli",
            "Take a day trip to Neemrana Fort",
            "Attend a cultural performance at Siri Fort Auditorium"
        ],
        "10_days": [
            "Extend to nearby destinations like Mathura and Vrindavan",
            "Explore the UNESCO World Heritage Site of Bhimbetka",
            "Visit the ancient town of Sarnath",
            "Experience a heritage walk in Mehrauli"
        ]
    },
    "Chennai": {
        "3_days": [
            "Visit Marina Beach",
            "Explore Kapaleeshwarar Temple",
            "Stroll through Santhome Basilica",
            "Try South Indian delicacies"
        ],
        "4_days": [
            "Add a visit to Fort St. George",
            "Explore Government Museum",
            "Visit St. Thomas Mount",
            "Shop for silk sarees in Kanchipuram"
        ],
        "5_days": [
            "Visit the Theosophical Society",
            "Explore Guindy National Park",
            "Take a day trip to Mahabalipuram",
            "Attend a classical dance performance"
        ],
        "One_week": [
            "Explore the Kalakshetra Foundation",
            "Visit Arignar Anna Zoological Park",
            "Take a day trip to Kanchipuram",
            "Attend a Carnatic music concert"
        ],
        "10_days": [
            "Extend to Pondicherry for a leisurely experience",
            "Visit the historic town of Chidambaram",
            "Explore the ancient temples of Thanjavur",
            "Experience the beauty of Kodaikanal"
        ]
    },
    "Hampi": {
        "3_days": [
            "Explore the ruins of Hampi",
            "Visit Virupaksha Temple",
            "Take a coracle ride in Tungabhadra River",
            "Enjoy a sunset at Hemakuta Hill"
        ],
        "4_days": [
            "Visit the Lotus Mahal",
            "Explore the Underground Shiva Temple",
            "Visit the Royal Enclosure",
            "Experience the Vittala Temple's musical pillars"
        ],
        "5_days": [
            "Take a day trip to Badami and Pattadakal",
            "Explore the Hippie Island across the river",
            "Visit the Tungabhadra Dam",
            "Attend the Virupaksha Car Festival (annual event)"
        ],
        "One_week": [
            "Explore the Anegundi village on the other side of the river",
            "Visit the Daroji Sloth Bear Sanctuary",
            "Take a day trip to Aihole and Mahakuta",
            "Experience a traditional Hampi Utsav"
        ],
        "10_days": [
            "Extend to Badami, Pattadakal, and Aihole for a historical tour",
            "Explore the Western Ghats near Hampi for trekking",
            "Visit the Daroji Bear Sanctuary",
            "Experience the local rural life in surrounding villages"
        ]
    },
    "Rishikesh": {
        "3_days": [
            "Experience Ganga Aarti at Triveni Ghat",
            "Take a yoga and meditation class",
            "Visit The Beatles Ashram",
            "Explore the local markets"
        ],
        "4_days": [
            "Attend an evening satsang at Parmarth Niketan",
            "Take a trek to Neer Garh Waterfall",
            "Try river rafting in the Ganges",
            "Visit Rajaji National Park"
        ],
        "5_days": [
            "Take a day trip to Haridwar",
            "Explore the Kunjapuri Devi Temple",
            "Attend a spiritual discourse at Sivananda Ashram",
            "Experience camping by the Ganges"
        ],
        "One_week": [
            "Join a multi-day yoga and meditation retreat",
            "Take a day trip to Dehradun",
            "Explore the Vashishta Cave",
            "Attend the International Yoga Festival (if during the event)"
        ],
        "10_days": [
            "Extend to Mussoorie for a hill station experience",
            "Participate in a Ganga cleanup initiative",
            "Explore the Tehri Dam and its surroundings",
            "Visit the Chamba region for its scenic beauty"
        ]
    },
    "Khajuraho": {
        "3_days": [
            "Explore the Western Group of Temples",
            "Visit the Duladeo Temple",
            "Take a sound and light show at the Western Group",
            "Explore the local markets"
        ],
        "4_days": [
            "Visit the Eastern Group of Temples",
            "Explore the Jain Group of Temples",
            "Attend the Khajuraho Dance Festival (if during the event)",
            "Take a day trip to Raneh Falls"
        ],
        "5_days": [
            "Explore the Southern Group of Temples",
            "Visit the Duladeo Temple",
            "Experience a traditional Kandariya Mahadev Temple light and sound show",
            "Take a guided nature walk around Khajuraho"
        ],
        "One_week": [
            "Explore the Archaeological Museum",
            "Take a day trip to Panna National Park",
            "Attend a classical music concert",
            "Visit nearby villages to experience rural life"
        ],
        "10_days": [
            "Extend to Orchha for historical exploration",
            "Explore the Pandav Falls and the Ken Gharial Sanctuary",
            "Visit the Ajaygarh Fort",
            "Participate in a traditional crafts workshop"
        ]
    },
    "Mysore": {
        "3_days": [
            "Visit Mysuru Palace",
            "Explore Chamundi Hills and Chamundeshwari Temple",
            "Stroll in the Brindavan Gardens",
            "Experience the Mysuru Dasara Festival (if during the event)"
        ],
        "4_days": [
            "Visit the historic St. Philomena's Church",
            "Explore the Mysuru Zoo",
            "Take a day trip to Srirangapatna",
            "Attend a traditional silk weaving workshop"
        ],
        "5_days": [
            "Explore the Jaganmohan Palace Art Gallery",
            "Visit the Karanji Lake",
            "Take a day trip to Nanjangud",
            "Experience a classical music or dance performance"
        ],
        "One_week": [
            "Visit the Cheluvamba Mansion",
            "Explore the Folklore Museum",
            "Take a day trip to Somnathpur",
            "Participate in a yoga and wellness retreat"
        ],
        "10_days": [
            "Extend to Coorg for a nature retreat",
            "Explore the Bandipur National Park",
            "Visit the historic town of Shravanabelagola",
            "Experience the Tibetan Golden Temple in Bylakuppe"
        ]
    },
    "Srinagar": {
        "3_days": [
            "Take a Shikara ride on Dal Lake",
            "Visit the Mughal Gardens (Shalimar Bagh, Nishat Bagh, Chashme Shahi)",
            "Explore the Jamia Masjid",
            "Try traditional Kashmiri cuisine"
        ],
        "4_days": [
            "Visit the Shankaracharya Temple",
            "Explore the Hazratbal Shrine",
            "Take a stroll in the Dachigam National Park",
            "Shop for Pashmina shawls in Lal Chowk"
        ],
        "5_days": [
            "Take a day trip to Gulmarg for skiing and snowboarding",
            "Explore the Awantipora Ruins",
            "Visit the Khanqah of Shah Hamdan",
            "Experience a Shikara ride during sunset"
        ],
        "One_week": [
            "Visit the Yusmarg for a tranquil experience",
            "Explore the Betaab Valley",
            "Take a day trip to Pahalgam",
            "Attend a traditional Kashmiri music performance"
        ],
        "10_days": [
            "Extend to Sonamarg for trekking and adventure",
            "Explore the Tarsar Marsar Lakes",
            "Visit the Lolab Valley",
            "Experience the Tulip Festival (if during the event)"
        ]
    },
    "Aurangabad": {
        "3_days": [
            "Visit Ajanta Caves",
            "Explore Ellora Caves",
            "Visit Bibi Ka Maqbara",
            "Explore local markets for handicrafts"
        ],
        "4_days": [
            "Take a day trip to Daulatabad Fort",
            "Visit Aurangabad Caves",
            "Explore Panchakki",
            "Try local Aurangabadi cuisine"
        ],
        "5_days": [
            "Visit Grishneshwar Jyotirlinga Temple",
            "Explore the Aurangabad city",
            "Take a day trip to Shirdi",
            "Attend a traditional dance or music performance"
        ],
        "One_week": [
            "Extend to Ajanta and Ellora viewpoints for panoramic views",
            "Visit the Siddharth Garden and Zoo",
            "Explore the historical town of Khuldabad",
            "Participate in a local cultural festival (if during the event)"
        ]
    },
    "Udaipur": {
        "3_days": [
            "Visit City Palace",
            "Boat ride on Lake Pichola",
            "Explore Jagdish Temple",
            "Take a stroll in Saheliyon Ki Bari"
        ],
        "4_days": [
            "Visit Sajjangarh Palace (Monsoon Palace) for sunset views",
            "Explore the Vintage Car Museum",
            "Take a day trip to Eklingji and Nagda Temples",
            "Experience a traditional Rajasthani dance performance"
        ],
        "5_days": [
            "Visit the Jag Mandir Palace",
            "Explore Shilpgram for traditional arts and crafts",
            "Take a day trip to Kumbhalgarh Fort",
            "Attend the Mewar Festival (if during the event)"
        ],
        "One_week": [
            "Extend to Chittorgarh for historical exploration",
            "Explore the Bagore Ki Haveli Museum",
            "Take a day trip to Haldighati for its historical significance",
            "Attend a cultural evening at the Dharohar Folk Dance Show"
        ]
    },
    "Darjeeling": {
        "3_days": [
            "Visit Tiger Hill for sunrise views",
            "Explore Padmaja Naidu Himalayan Zoological Park",
            "Take a ride on the Darjeeling Himalayan Railway",
            "Visit Peace Pagoda"
        ],
        "4_days": [
            "Visit the Rock Garden and Ganga Maya Park",
            "Explore the Tibetan Refugee Self Help Centre",
            "Take a day trip to Mirik for Sumendu Lake",
            "Try local Darjeeling tea at a plantation"
        ],
        "5_days": [
            "Visit Batasia Loop and War Memorial",
            "Explore the Botanical Gardens",
            "Take a day trip to Kurseong",
            "Attend a cultural program at the Darjeeling Cultural and Folk Art Museum"
        ],
        "One_week": [
            "Extend to Singalila National Park for trekking",
            "Visit the Observatory Hill and Mahakal Temple",
            "Explore the Neora Valley National Park",
            "Participate in the Darjeeling Carnival (if during the event)"
        ]
    },
    "Bhuj": {
        "3_days": [
            "Visit Aina Mahal",
            "Explore Prag Mahal",
            "Take a stroll in Hamirsar Lake",
            "Visit the Kutch Museum"
        ],
        "4_days": [
            "Take a day trip to Mandvi Beach",
            "Visit the Vijay Vilas Palace",
            "Explore the Swaminarayan Temple",
            "Shop for traditional Kutchi handicrafts in Bhujodi"
        ],
        "5_days": [
            "Visit the White Desert (Rann of Kutch) during the Rann Utsav",
            "Explore Sharad Baug Palace",
            "Take a day trip to Lakhpat and Narayan Sarovar",
            "Experience the local Kutchi cuisine"
        ],
        "One_week": [
            "Extend to Dholavira for archaeological exploration",
            "Visit Kala Dungar for panoramic views",
            "Explore the Great Indian Bustard Sanctuary",
            "Participate in traditional folk music and dance"
        ]
    },
    "Mumbai": {
        "3_days": [
            "Visit Gateway of India",
            "Explore Chhatrapati Shivaji Maharaj Terminus",
            "Take a stroll at Marine Drive",
            "Visit the Elephanta Caves"
        ],
        "4_days": [
            "Explore Colaba Causeway for shopping",
            "Visit Haji Ali Dargah",
            "Take a day trip to Sanjay Gandhi National Park",
            "Attend a Bollywood movie screening"
        ],
        "5_days": [
            "Visit the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
            "Explore Juhu Beach and Chowpatty",
            "Take a day trip to Alibaug",
            "Experience the nightlife in South Mumbai"
        ],
        "One_week": [
            "Extend to Elephanta Island for trekking",
            "Explore the Chor Bazaar for antiques and vintage items",
            "Take a day trip to Matheran",
            "Attend a cultural event at the National Centre for the Performing Arts"
        ]
    },
    "Leh": {
        "3_days": [
            "Visit Shanti Stupa for panoramic views",
            "Explore Leh Palace",
            "Take a stroll in the local markets",
            "Try traditional Ladakhi cuisine"
        ],
        "4_days": [
            "Take a day trip to Magnetic Hill and Gurudwara Pathar Sahib",
            "Visit Thiksey Monastery",
            "Explore the Hall of Fame Museum",
            "Attend a cultural event at Leh Monastery"
        ],
        "5_days": [
            "Visit Hemis Monastery",
            "Explore Shey Palace and Shey Monastery",
            "Take a day trip to Pangong Lake",
            "Experience a traditional Ladakhi homestay"
        ],
        "One_week": [
            "Extend to Nubra Valley for a scenic drive",
            "Visit Tso Moriri Lake",
            "Explore the remote villages of Ladakh",
            "Participate in a photography tour"
        ]
    },
    "Kolkata": {
        "3_days": [
            "Visit Victoria Memorial",
            "Explore Howrah Bridge",
            "Take a stroll in Maidan",
            "Try local street food in New Market"
        ],
        "4_days": [
            "Visit Indian Museum",
            "Explore Marble Palace",
            "Take a boat ride on the Hooghly River",
            "Attend a cultural performance at Rabindra Sadan"
        ],
        "5_days": [
            "Visit Dakshineswar Kali Temple",
            "Explore Belur Math",
            "Take a day trip to Sundarbans",
            "Attend a Durga Puja celebration (if during the event)"
        ],
        "One_week": [
            "Extend to Shantiniketan for a cultural experience",
            "Explore Kalighat Kali Temple",
            "Visit Birla Planetarium",
            "Participate in a Bengali cooking class"
        ]
    },
    "Jaipur": {
        "3_days": [
            "Visit Hawa Mahal",
            "Explore City Palace",
            "Take a stroll in Jantar Mantar",
            "Shop for traditional Rajasthani handicrafts"
        ],
        "4_days": [
            "Visit Amer Fort",
            "Explore Jal Mahal",
            "Take a day trip to Nahargarh Fort",
            "Attend a traditional puppet show"
        ],
        "5_days": [
            "Visit Albert Hall Museum",
            "Explore Jaigarh Fort",
            "Take a day trip to Sanganer for block printing",
            "Experience a Rajasthani folk dance performance"
        ],
        "One_week": [
            "Extend to Ranthambore National Park for wildlife safari",
            "Visit the Monkey Temple (Galta Ji)",
            "Explore the Royal Gaitor Tombs",
            "Participate in a traditional Rajasthani cooking class"
        ]
    },
    "Bangalore": {
        "3_days": [
            "Visit Lalbagh Botanical Garden",
            "Explore Cubbon Park",
            "Take a stroll on MG Road",
            "Try local cuisine in Bangalore's food streets"
        ],
        "4_days": [
            "Visit Bangalore Palace",
            "Explore Vidhana Soudha",
            "Take a day trip to Nandi Hills",
            "Attend a cultural event at Rangoli Metro Art Center"
        ],
        "5_days": [
            "Visit ISKCON Temple",
            "Explore Tipu Sultan's Summer Palace",
            "Take a day trip to Bannerghatta National Park",
            "Experience the vibrant nightlife in Indiranagar"
        ],
        "One_week": [
            "Extend to Mysore for a day trip or overnight stay",
            "Explore the Bull Temple",
            "Visit Bangalore Fort",
            "Participate in a technology or startup event (if during the event)"
        ]
    },
    "Pondicherry": {
        "3_days": [
            "Visit Aurobindo Ashram",
            "Explore the French Quarter",
            "Take a stroll on Promenade Beach",
            "Try French cuisine in local cafes"
        ],
        "4_days": [
            "Visit Auroville",
            "Explore Paradise Beach",
            "Take a cycling tour of the town",
            "Attend a meditation session at Matrimandir"
        ],
        "5_days": [
            "Visit Gingee Fort",
            "Explore Serenity Beach",
            "Take a day trip to Chidambaram",
            "Experience a boat ride in Chunnambar Boat House"
        ],
        "One_week": [
            "Extend to Mahabalipuram for historical exploration",
            "Visit the Pondicherry Museum",
            "Explore the botanical gardens",
            "Participate in a yoga and wellness retreat"
        ]
    },
    "Himalayas": {
        "3_days": [
            "Explore Shimla for its colonial charm",
            "Take a scenic drive to Kufri",
            "Visit Jakhu Temple",
            "Try local Himachali cuisine"
        ],
        "4_days": [
            "Visit Manali for adventure activities",
            "Explore Hadimba Devi Temple",
            "Take a day trip to Solang Valley",
            "Attend a cultural event in Manali"
        ],
        "5_days": [
            "Visit Rishikesh for spiritual experiences",
            "Explore the Beatles Ashram",
            "Take a river rafting adventure",
            "Attend an evening Ganga Aarti"
        ],
        "One_week": [
            "Extend to Dharamshala for Tibetan culture",
            "Visit McLeod Ganj and the Dalai Lama Temple",
            "Explore Triund for trekking",
            "Participate in a meditation retreat"
        ]
    },
    "Amritsar": {
        "3_days": [
            "Visit the Golden Temple",
            "Explore Jallianwala Bagh",
            "Take a stroll in the historic lanes of Amritsar",
            "Try local Punjabi cuisine"
        ],
        "4_days": [
            "Visit the Wagah Border for the border ceremony",
            "Explore Durgiana Temple",
            "Take a heritage walk in the city",
            "Shop for traditional Punjabi artifacts"
        ],
        "5_days": [
            "Visit Maharaja Ranjit Singh Museum",
            "Explore Ram Bagh Gardens",
            "Take a day trip to Pul Kanjri",
            "Experience the local culture in the Old City"
        ],
        "One_week": [
            "Extend to Tarn Taran Sahib for a spiritual experience",
            "Visit the Gobindgarh Fort",
            "Explore the Partition Museum",
            "Participate in a traditional Punjabi dance workshop"
        ]
    },
    "Jaisalmer": {
        "3_days": [
            "Visit Jaisalmer Fort",
            "Explore Patwon Ki Haveli",
            "Take a camel safari in Sam Sand Dunes",
            "Attend a cultural program in the desert"
        ],
        "4_days": [
            "Visit Gadisar Lake",
            "Explore Jain Temples",
            "Take a day trip to Kuldhara Village",
            "Shop for Rajasthani handicrafts in local markets"
        ],
        "5_days": [
            "Visit Bada Bagh",
            "Explore the Desert Culture Centre and Museum",
            "Take a day trip to Tanot Mata Temple",
            "Experience a traditional Rajasthani folk dance"
        ],
        "One_week": [
            "Extend to Khimsar for a desert retreat",
            "Visit the Thar Heritage Museum",
            "Explore Lodurva Jain Temple",
            "Participate in the Jaisalmer Desert Festival (if during the event)"
        ]
    },
    "Gangtok": {
        "3_days": [
            "Visit Rumtek Monastery",
            "Explore Nathula Pass",
            "Take a stroll in MG Marg",
            "Try local Sikkimese cuisine"
        ],
        "4_days": [
            "Visit Enchey Monastery",
            "Explore Tsomgo Lake",
            "Take a day trip to Hanuman Tok",
            "Attend a traditional Sikkimese dance performance"
        ],
        "5_days": [
            "Visit Banjhakri Falls",
            "Explore Ranka Monastery",
            "Take a day trip to Phodong Monastery",
            "Experience a cable car ride to Tashiling"
        ],
        "One_week": [
            "Extend to Pelling for panoramic views of Kanchenjunga",
            "Visit Khecheopalri Lake",
            "Explore Yuksom for historical significance",
            "Participate in Losar Festival (if during the event)"
        ]
    },
    "Shimla": {
        "3_days": [
            "Visit the Ridge and Mall Road",
            "Explore Jakhoo Temple",
            "Take a stroll in the scenic Christ Church area",
            "Try local Himachali dishes"
        ],
        "4_days": [
            "Visit Kufri for panoramic views",
            "Explore Indian Institute of Advanced Study",
            "Take a day trip to Mashobra",
            "Attend a cultural program at Gaiety Theatre"
        ],
        "5_days": [
            "Visit Tara Devi Temple",
            "Explore Annandale Army Heritage Museum",
            "Take a day trip to Naldehra",
            "Experience a toy train ride to Shimla"
        ],
        "One_week": [
            "Extend to Chail for a peaceful retreat",
            "Visit Himalayan Bird Park",
            "Explore Kali Bari Temple",
            "Participate in the Winter Carnival (if during the event)"
        ]
    },
    "Manali": {
        "3_days": [
            "Visit Hidimba Devi Temple",
            "Explore Manu Temple",
            "Take a stroll in Old Manali",
            "Try local Himachali street food"
        ],
        "4_days": [
            "Visit Solang Valley for adventure activities",
            "Explore Tibetan Monastery",
            "Take a day trip to Rohtang Pass",
            "Attend a cultural event in Manali"
        ],
        "5_days": [
            "Visit Vashisht Hot Water Springs",
            "Explore Naggar Castle",
            "Take a day trip to Kullu",
            "Experience paragliding in Solang Valley"
        ],
        "One_week": [
            "Extend to Kasol for a serene experience",
            "Visit Great Himalayan National Park",
            "Explore Bijli Mahadev Temple",
            "Participate in Manali Winter Carnival (if during the event)"
        ]
    },
    "Kochi": {
        "3_days": [
            "Visit Fort Kochi and St. Francis Church",
            "Explore the Chinese Fishing Nets",
            "Take a stroll in Jew Town",
            "Try traditional Kerala cuisine"
        ],
        "4_days": [
            "Visit Mattancherry Palace",
            "Explore the Jewish Synagogue",
            "Take a day trip to Cherai Beach",
            "Attend a Kathakali performance"
        ],
        "5_days": [
            "Visit Santa Cruz Basilica",
            "Explore Hill Palace Museum",
            "Take a day trip to Athirapally Falls",
            "Experience a houseboat cruise in Alleppey"
        ],
        "One_week": [
            "Extend to Munnar for a tea plantation experience",
            "Visit the Kerala Folklore Museum",
            "Explore Vypin Island",
            "Participate in the Cochin Carnival (if during the event)"
        ]
    },
    "Jodhpur": {
        "3_days": [
            "Visit Mehrangarh Fort",
            "Explore Jaswant Thada",
            "Take a stroll in the Blue City",
            "Try traditional Rajasthani sweets"
        ],
        "4_days": [
            "Visit Umaid Bhawan Palace",
            "Explore Mandore Gardens",
            "Take a day trip to Osian",
            "Attend a traditional Marwari folk music performance"
        ],
        "5_days": [
            "Visit Clock Tower and Sardar Market",
            "Explore Kaylana Lake",
            "Take a day trip to Balsamand Lake",
            "Experience a guided village safari"
        ],
        "One_week": [
            "Extend to Rohet for a heritage stay",
            "Visit Ranisar and Padamsar Lakes",
            "Explore Mahamandir Temple",
            "Participate in the Marwar Festival (if during the event)"
        ]
    },
    "Madurai": {
        "3_days": [
            "Visit Meenakshi Amman Temple",
            "Explore Thirumalai Nayakkar Palace",
            "Take a stroll in the vibrant streets of Madurai",
            "Try local Tamil Nadu cuisine"
        ],
        "4_days": [
            "Visit Alagar Kovil",
            "Explore Gandhi Memorial Museum",
            "Take a day trip to Koodal Azhagar Temple",
            "Attend a classical music or dance performance"
        ],
        "5_days": [
            "Visit Vandiyur Mariamman Teppakulam",
            "Explore Athisayam Water Theme Park",
            "Take a day trip to Pazhamudhir Solai",
            "Experience the evening aarti at Meenakshi Amman Temple"
        ],
        "One_week": [
            "Extend to Rameswaram for a spiritual journey",
            "Visit Thiruparankundram Murugan Temple",
            "Explore Gandhi Museum in Rameswaram",
            "Participate in the Chithirai Festival (if during the event)"
        ]
    },
    "Pushkar": {
        "3_days": [
            "Visit Pushkar Lake and Brahma Temple",
            "Explore the bustling streets and markets",
            "Take a camel safari in the desert",
            "Try the local cuisine at Pushkar"
        ],
        "4_days": [
            "Visit Savitri Temple for panoramic views",
            "Explore Varaha Temple",
            "Take a day trip to Ajmer for Dargah Sharif",
            "Attend the evening aarti at Pushkar Lake"
        ],
        "5_days": [
            "Visit Rangji Temple",
            "Explore Pap Mochani Temple",
            "Take a day trip to Man Mahal",
            "Experience a hot air balloon ride in Pushkar"
        ],
        "One_week": [
            "Extend to the nearby Kishangarh for art and culture",
            "Explore the Rose Garden in Pushkar",
            "Visit Brahma Temple during the Kartik Purnima Fair",
            "Participate in a yoga and meditation retreat"
        ]
    },
    "Pune": {
        "3_days": [
            "Visit Aga Khan Palace",
            "Explore Shaniwar Wada",
            "Take a stroll in the Osho Garden",
            "Try local Maharashtrian street food"
        ],
        "4_days": [
            "Visit Sinhagad Fort for trekking",
            "Explore Raja Dinkar Kelkar Museum",
            "Take a day trip to Jejuri for the Khandoba Temple",
            "Attend a cultural event in Pune"
        ],
        "5_days": [
            "Visit Pataleshwar Cave Temple",
            "Explore Saras Baug and Parvati Hill",
            "Take a day trip to Lavasa",
            "Experience the nightlife in Koregaon Park"
        ],
        "One_week": [
            "Extend to Mahabaleshwar for a hill station experience",
            "Visit the National War Museum",
            "Explore the Shinde Chhatri memorial",
            "Participate in the Pune Festival (if during the event)"
        ]
    },
    "Gokarna": {
        "3_days": [
            "Visit Om Beach and Kudle Beach",
            "Explore Mahabaleshwar Temple",
            "Take a trek to Half Moon Beach",
            "Try beachside cafes for local seafood"
        ],
        "4_days": [
            "Visit Paradise Beach",
            "Explore Shiva Cave",
            "Take a day trip to Yana Rocks",
            "Attend a beachside yoga session"
        ],
        "5_days": [
            "Visit Kumta Beach and Mirjan Fort",
            "Explore Belekan Beach",
            "Take a day trip to Murudeshwar",
            "Experience a beach bonfire and stargazing"
        ],
        "One_week": [
            "Extend to Gokarna's less-explored beaches",
            "Visit the Mahabaleshwar Temple during Shivaratri",
            "Explore the Bhadrakali Temple",
            "Participate in a beach cleanup or conservation program"
        ]
    },
    "Rajasthan": {
        "3_days": [
            "Visit Jaipur for its historical attractions",
            "Explore Udaipur for its lakes and palaces",
            "Take a stroll in Jodhpur's Blue City",
            "Try Rajasthani cuisine"
        ],
        "4_days": [
            "Visit Jaisalmer for its desert charm",
            "Explore Ajmer and Pushkar for spirituality",
            "Take a day trip to Ranthambore National Park",
            "Attend a cultural event in any city"
        ],
        "5_days": [
            "Visit Bikaner for its forts and palaces",
            "Explore Mount Abu for its hill station beauty",
            "Take a day trip to Kota for its gardens",
            "Experience traditional Rajasthani music and dance"
        ],
        "One_week": [
            "Extend to Shekhawati for its painted havelis",
            "Visit Chittorgarh for its historical significance",
            "Explore Bundi for its stepwells and palaces",
            "Participate in any local festival or fair"
        ]
    },
    "Gujarat": {
        "3_days": [
            "Visit Ahmedabad for its cultural heritage",
            "Explore Gandhinagar for its modern architecture",
            "Take a stroll in the Sabarmati Riverfront",
            "Try Gujarati street food"
        ],
        "4_days": [
            "Visit Vadodara for its palaces and museums",
            "Explore Surat for its textile and diamond industry",
            "Take a day trip to Champaner-Pavagadh Archaeological Park",
            "Attend a traditional Garba dance performance"
        ],
        "5_days": [
            "Visit Dwarka for its religious significance",
            "Explore Somnath for its historic temple",
            "Take a day trip to Diu for its beaches",
            "Experience the Rann of Kutch during the Rann Utsav"
        ],
        "One_week": [
            "Extend to Bhuj for its handicrafts and history",
            "Visit Junagadh for its ancient monuments",
            "Explore Palitana for its Jain temples",
            "Participate in the Navratri Festival (if during the event)"
        ]
    },
    "Maharashtra": {
        "3_days": [
            "Visit Mumbai for its bustling city life",
            "Explore Pune for its historical and cultural sites",
            "Take a stroll in Lonavala for its scenic beauty",
            "Try Maharashtrian street food"
        ],
        "4_days": [
            "Visit Nashik for its temples and vineyards",
            "Explore Aurangabad for its historical monuments",
            "Take a day trip to Alibaug for its beaches",
            "Attend a Marathi theatre or film screening"
        ],
        "5_days": [
            "Visit Kolhapur for its temples and palaces",
            "Explore Mahabaleshwar for its hill station charm",
            "Take a day trip to Elephanta Island",
            "Experience the vibrant Ganesh Chaturthi celebrations"
        ],
        "One_week": [
            "Extend to Konkan for its coastal beauty",
            "Visit Solapur for its historical landmarks",
            "Explore Matheran for its eco-friendly atmosphere",
            "Participate in any local festival or cultural event"
        ]
    },
    "Tamil Nadu": {
        "3_days": [
            "Visit Meenakshi Amman Temple in Madurai",
            "Explore the ancient city of Mamallapuram",
            "Take a stroll in Marina Beach, Chennai",
            "Try traditional Tamil cuisine"
        ],
        "4_days": [
            "Visit Brihadeeswarar Temple in Thanjavur",
            "Explore Pondicherry's French Quarter",
            "Take a day trip to Kodaikanal",
            "Attend a Bharatanatyam dance performance"
        ],
        "5_days": [
            "Visit Rameswaram and its sacred temples",
            "Explore the Nilgiri Biosphere Reserve",
            "Take a day trip to Ooty",
            "Experience the Pongal festival (if during the event)"
        ],
        "One_week": [
            "Extend to Coimbatore for its textile heritage",
            "Visit the hill station of Yercaud",
            "Explore the Chettinad region for its heritage",
            "Participate in a traditional Carnatic music concert"
        ]
    },
    "Karnataka": {
        "3_days": [
            "Visit Mysuru Palace",
            "Explore Hampi's UNESCO World Heritage Sites",
            "Take a stroll in Cubbon Park, Bangalore",
            "Try traditional Karnataka cuisine"
        ],
        "4_days": [
            "Visit Jog Falls and Shimoga",
            "Explore the coffee plantations in Coorg",
            "Take a day trip to Belur and Halebidu",
            "Attend a Yakshagana performance"
        ],
        "5_days": [
            "Visit Gokarna for its pristine beaches",
            "Explore the ruins of Vijayanagara Empire in Hampi",
            "Take a day trip to Sravanabelagola",
            "Experience the Mysuru Dasara Festival (if during the event)"
        ],
        "One_week": [
            "Extend to Chikmagalur for its lush landscapes",
            "Visit Badami, Aihole, and Pattadakal",
            "Explore the Western Ghats for trekking",
            "Participate in a traditional Yakshagana workshop"
        ]
    },
    "Telangana": {
        "3_days": [
            "Visit the historic Golconda Fort",
            "Explore the Qutb Shahi Tombs",
            "Take a stroll in Necklace Road, Hyderabad",
            "Try traditional Telangana cuisine"
        ],
        "4_days": [
            "Visit Charminar and the Mecca Masjid",
            "Explore the Salar Jung Museum",
            "Take a day trip to Ramoji Film City",
            "Attend a Kuchipudi dance performance"
        ],
        "5_days": [
            "Visit the Chowmohallah Palace",
            "Explore the Nizam's Museum",
            "Take a day trip to Bhongir Fort",
            "Experience the Bathukamma festival (if during the event)"
        ],
        "One_week": [
            "Extend to Warangal for its historical sites",
            "Visit the Thousand Pillar Temple",
            "Explore the Deccan Plateau landscapes",
            "Participate in a traditional Telangana folk music event"
        ]
    },
    "Andhra Pradesh": {
        "3_days": [
            "Visit the Tirumala Venkateswara Temple in Tirupati",
            "Explore the Kanaka Durga Temple in Vijayawada",
            "Take a stroll on RK Beach, Visakhapatnam",
            "Try traditional Andhra cuisine"
        ],
        "4_days": [
            "Visit the Undavalli Caves",
            "Explore the Kailasagiri Hill Park",
            "Take a day trip to Srisailam",
            "Attend a Kuchipudi dance performance"
        ],
        "5_days": [
            "Visit the Simhachalam Temple",
            "Explore the Borra Caves",
            "Take a day trip to Araku Valley",
            "Experience the Ugadi festival (if during the event)"
        ],
        "One_week": [
            "Extend to Nagarjuna Sagar for its dam and wildlife",
            "Visit the Lepakshi Temple",
            "Explore the Kolleru Lake bird sanctuary",
            "Participate in a traditional Kuchipudi dance workshop"
        ]
    },
    "Kashmir": {
        "3_days": [
            "Take a Shikara ride on Dal Lake in Srinagar",
            "Visit the Mughal Gardens (Shalimar Bagh, Nishat Bagh, Chashme Shahi)",
            "Explore the Jamia Masjid",
            "Try traditional Kashmiri cuisine"
        ],
        "4_days": [
            "Visit the Shankaracharya Temple",
            "Explore the Hazratbal Shrine",
            "Take a stroll in the Dachigam National Park",
            "Shop for Pashmina shawls in Lal Chowk"
        ],
        "5_days": [
            "Take a day trip to Gulmarg for skiing and snowboarding",
            "Explore the Awantipora Ruins",
            "Visit the Khanqah of Shah Hamdan",
            "Experience a Shikara ride during sunset"
        ],
        "One_week": [
            "Visit the Yusmarg for a tranquil experience",
            "Explore the Betaab Valley",
            "Take a day trip to Pahalgam",
            "Attend a traditional Kashmiri music performance"
        ]
    },
    "Haryana": {
        "3_days": [
            "Visit the Sultanpur National Park",
            "Explore the Surajkund Crafts Mela (if during the event)",
            "Take a stroll in Leisure Valley Park, Gurgaon",
            "Try traditional Haryanvi cuisine"
        ],
        "4_days": [
            "Visit the Feroz Shah Palace in Hisar",
            "Explore the Bhishma Kund in Narkanda",
            "Take a day trip to Pinjore Gardens",
            "Attend a cultural event in Faridabad"
        ],
        "5_days": [
            "Visit the Panipat War Memorial",
            "Explore the Raja Nahar Singh Palace in Ballabhgarh",
            "Take a day trip to Thanesar",
            "Experience the Kartik Cultural Festival (if during the event)"
        ],
        "One_week": [
            "Extend to Kurukshetra for historical exploration",
            "Visit the Kalesar National Park",
            "Explore the Badkhal Lake",
            "Participate in a traditional Haryanvi folk dance workshop"
        ]
    },
    "Uttarakhand": {
        "3_days": [
            "Visit the Kedarnath Temple",
            "Explore the Rajaji National Park",
            "Take a stroll on Mall Road, Nainital",
            "Try traditional Uttarakhand cuisine"
        ],
        "4_days": [
            "Visit the Badrinath Temple",
            "Explore the Valley of Flowers",
            "Take a day trip to Haridwar",
            "Attend a cultural event in Dehradun"
        ],
        "5_days": [
            "Visit the Jim Corbett National Park",
            "Explore the Roopkund Lake trek",
            "Take a day trip to Mussoorie",
            "Experience the Nanda Devi Raj Jat Yatra (if during the event)"
        ],
        "One_week": [
            "Extend to Auli for skiing and snowboarding",
            "Visit the Binsar Wildlife Sanctuary",
            "Explore the Chota Char Dham Yatra",
            "Participate in a traditional Garhwali dance workshop"
        ]
    },
    "Himachal Pradesh": {
        "3_days": [
            "Visit the Hadimba Devi Temple in Manali",
            "Explore the Solang Valley for adventure activities",
            "Take a stroll on The Ridge, Shimla",
            "Try traditional Himachali cuisine"
        ],
        "4_days": [
            "Visit the Jakhoo Temple",
            "Explore the Great Himalayan National Park",
            "Take a day trip to Kufri",
            "Attend a cultural event in Dharamshala"
        ],
        "5_days": [
            "Visit the Baijnath Temple",
            "Explore the Spiti Valley",
            "Take a day trip to Bir Billing for paragliding",
            "Experience the Himachal Winter Carnival (if during the event)"
        ],
        "One_week": [
            "Extend to Kinnaur for its scenic beauty",
            "Visit the Manikaran Sahib",
            "Explore the Barot Valley",
            "Participate in a traditional Himachali folk music performance"
        ]
    },
    "West Bengal": {
        "3_days": [
            "Visit the Victoria Memorial in Kolkata",
            "Explore Howrah Bridge",
            "Take a stroll in Maidan",
            "Try local street food in New Market"
        ],
        "4_days": [
            "Visit Indian Museum",
            "Explore Marble Palace",
            "Take a boat ride on the Hooghly River",
            "Attend a cultural performance at Rabindra Sadan"
        ],
        "5_days": [
            "Visit Dakshineswar Kali Temple",
            "Explore Belur Math",
            "Take a day trip to Sundarbans",
            "Attend a Durga Puja celebration (if during the event)"
        ],
        "One_week": [
            "Extend to Shantiniketan for a cultural experience",
            "Explore Kalighat Kali Temple",
            "Visit Birla Planetarium",
            "Participate in a Bengali cooking class"
        ]
    },
    "Punjab": {
        "3_days": [
            "Visit the Golden Temple in Amritsar",
            "Explore Jallianwala Bagh",
            "Take a stroll in Maharaja Ranjit Singh Garden",
            "Try traditional Punjabi cuisine"
        ],
        "4_days": [
            "Visit the Wagah Border for the Beating Retreat Ceremony",
            "Explore the Punjab State War Heroes Memorial & Museum",
            "Take a day trip to Anandpur Sahib",
            "Attend a traditional Punjabi dance performance"
        ],
        "5_days": [
            "Visit the Qila Mubarak in Patiala",
            "Explore the Virasat-e-Khalsa Museum",
            "Take a day trip to the Pinjore Gardens",
            "Experience the Baisakhi festival (if during the event)"
        ],
        "One_week": [
            "Extend to Ropar for its archaeological sites",
            "Visit the Phillaur Fort",
            "Explore the Pushpa Gujral Science City",
            "Participate in a traditional Punjabi Bhangra workshop"
        ]
    },
    "Sikkim": {
        "3_days": [
            "Visit the Rumtek Monastery",
            "Explore Nathula Pass",
            "Take a stroll in MG Marg, Gangtok",
            "Try traditional Sikkimese cuisine"
        ],
        "4_days": [
            "Visit Tsomgo Lake",
            "Explore the Hanuman Tok",
            "Take a day trip to Pelling",
            "Attend a traditional Sikkimese cultural program"
        ],
        "5_days": [
            "Visit the Yumthang Valley",
            "Explore Ravangla for its scenic beauty",
            "Take a day trip to Namchi",
            "Experience Losar festival (if during the event)"
        ],
        "One_week": [
            "Extend to Dzongu for a tranquil experience",
            "Visit the Khecheopalri Lake",
            "Explore the Tashiding Monastery",
            "Participate in a traditional Sikkimese folk dance workshop"
        ]
    },
    "Uttar Pradesh": {
        "3_days": [
            "Visit the Taj Mahal in Agra",
            "Explore Agra Fort",
            "Take a boat ride in the Yamuna River",
            "Experience the evening view of the Taj Mahal from Mehtab Bagh"
        ],
        "4_days": [
            "Visit Fatehpur Sikri",
            "Explore the Tomb of Akbar the Great",
            "Take a day trip to Mathura and Vrindavan",
            "Attend the evening Aarti at the banks of the Ganges in Varanasi"
        ],
        "5_days": [
            "Explore the ghats of Varanasi",
            "Take a day trip to Sarnath",
            "Visit the Kashi Vishwanath Temple",
            "Experience a traditional Banarasi silk weaving workshop"
        ],
        "One_week": [
            "Extend to Ayodhya for a visit to Ram Janmabhoomi",
            "Explore the Chunar Fort",
            "Take a day trip to Allahabad (Prayagraj)",
            "Participate in a cultural event or festival (if during the event)"
        ]
    },
    "Madhya Pradesh": {
        "3_days": [
            "Visit Khajuraho for its ancient temples",
            "Explore the Western Group of Temples",
            "Take a guided nature walk around the town",
            "Attend the Khajuraho Dance Festival (if during the event)"
        ],
        "4_days": [
            "Explore the wildlife in Bandhavgarh National Park",
            "Take a safari for tiger spotting",
            "Visit the Bandhavgarh Fort",
            "Experience the local tribal culture"
        ],
        "5_days": [
            "Visit the historical city of Gwalior",
            "Explore Gwalior Fort and Man Singh Palace",
            "Take a day trip to Jai Vilas Palace",
            "Attend a classical music concert at Tansen Tomb"
        ],
        "One_week": [
            "Extend to Orchha for historical exploration",
            "Visit Jahangir Mahal and Raj Mahal",
            "Explore the Chhatris along the Betwa River",
            "Participate in a traditional arts and crafts workshop"
        ]
    },

};

const locationTripPlanSuggestion = (props) => {
    // console.log('trip_suggestion_duration', props.trip_suggestion_duration, props.destination)
    const tripPlanSelectedLocationSuggestions = props.trip_suggestion_duration && props.trip_suggestions_destination ? tripPlanSuggestions[props.trip_suggestions_destination][props.trip_suggestion_duration.replace(" ", "_")] : []
    // console.log(props, 'tripPlanSelectedLocationSuggestions')
    return (
        <div className='row d-flex justify-content-center'>
            {tripPlanSelectedLocationSuggestions && tripPlanSelectedLocationSuggestions?.length > 0 && <div className='col-12 col-lg-8'>
                <ol className='d-flex flex-wrap  tripPlanSuggestionsCard shadow-sm p-2'>
                    {tripPlanSelectedLocationSuggestions?.map((tripPlanSelectedLocationSuggestion, i) => {
                        return (
                            <li key={i} className='m-2 tripPlanSelectedLocationSuggestion'>
                                <span >{tripPlanSelectedLocationSuggestion}</span>
                            </li>
                        )
                    })}
                </ol>
            </div>}
        </div>
    )
}

export default locationTripPlanSuggestion