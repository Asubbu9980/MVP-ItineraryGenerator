import React from 'react'

const TopFamailyVacationPlaces =
    [
        {
            "place": "Goa",
            "description": "Famous for its beautiful beaches, vibrant nightlife, and Portuguese architecture."
        },
        {
            "place": "Manali",
            "description": "A picturesque hill station known for its snow-capped mountains, adventure sports, and scenic landscapes."
        },
        {
            "place": "Jaipur",
            "description": "The Pink City with its rich history, magnificent forts, and vibrant markets."
        },
        {
            "place": "Kerala",
            "description": "Known as 'God's Own Country,' Kerala offers backwaters, lush green landscapes, and cultural experiences."
        },
        {
            "place": "Shimla",
            "description": "A charming hill station with colonial architecture, snow-covered peaks, and scenic beauty."
        },
        {
            "place": "Rishikesh",
            "description": "Famous for its spiritual atmosphere, yoga retreats, and adventure sports along the Ganges River."
        },
        {
            "place": "Ooty",
            "description": "A popular hill station with tea plantations, botanical gardens, and pleasant weather."
        },
        {
            "place": "Andaman Islands",
            "description": "A tropical paradise with pristine beaches, coral reefs, and diverse marine life."
        },
        {
            "place": "Agra",
            "description": "Home to the iconic Taj Mahal, Agra offers historical monuments and a rich Mughal heritage."
        },
        {
            "place": "Darjeeling",
            "description": "Known for its tea gardens, toy train, and panoramic views of the Himalayas."
        }
    ]



const familyVacationPlaces = (props) => {
    return (
        <div className='options'>
            {/* <h1>Top 10 Family Vacation Places in India</h1> */}
            <ul className="d-flex flex-wrap">
                {TopFamailyVacationPlaces.map((place, index) => {
                    return (
                        <li key={index} onClick={() => {
                            return props.actionProvider.handleDestination(place.place, true, null, 'family_destination')
                        }} className={`trip-location-list-items m-2 p-2 shadow-sm ${props.family_destination === place.place ? 'active-family-destination' : ''}`}>
                            <h5>{place.place}</h5>
                            <p className='trip-location-list-items-paragraph m-0'>{place.description}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default familyVacationPlaces