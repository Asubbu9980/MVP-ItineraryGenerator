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
        "7_days": [
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
        "7_days": [
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
        "7_days": [
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
        "7_days": [
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
        "7_days": [
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