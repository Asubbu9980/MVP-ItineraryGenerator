import React from 'react'
const TopSoloVacationPlaces =
    [
        {
            "place": "Hampi",
            "description": "A UNESCO World Heritage Site with ancient ruins, temples, and a unique boulder-strewn landscape."
        },
        {
            "place": "Leh-Ladakh",
            "description": "A high-altitude desert with breathtaking landscapes, monasteries, and adventure opportunities."
        },
        {
            "place": "Varanasi",
            "description": "The spiritual capital of India, known for its ghats, temples, and vibrant cultural atmosphere."
        },
        {
            "place": "Rann of Kutch",
            "description": "Experience the vast white salt desert during the Rann Utsav, along with traditional Gujarat culture."
        },
        {
            "place": "Spiti Valley",
            "description": "A remote Himalayan region offering stunning landscapes, ancient monasteries, and a serene environment."
        },
        {
            "place": "Pushkar",
            "description": "Famous for its annual camel fair, Pushkar is a vibrant town with a sacred lake and temples."
        },
        {
            "place": "Gokarna",
            "description": "A laid-back coastal town with pristine beaches, temples, and a more relaxed atmosphere compared to Goa."
        },
        {
            "place": "McLeod Ganj",
            "description": "The Tibetan-influenced town offers a peaceful environment, trekking opportunities, and the residence of the Dalai Lama."
        },
        {
            "place": "Pondicherry",
            "description": "A former French colony with a unique blend of Indian and French culture, serene beaches, and charming streets."
        },
        {
            "place": "Rishikesh",
            "description": "A spiritual retreat by the Ganges, known for yoga, meditation, and adventure sports."
        }
    ]



const SoloVaccationPlaces = (props) => {
    return (
        <div className='options'>
            <ul className="d-flex flex-wrap">
                {TopSoloVacationPlaces.map((place, index) => {
                    return (
                        <li key={index} onClick={() => {
                            return props.actionProvider.handleDestination(place.place, true, null, 'solo_destination')
                        }} className={`trip-location-list-items m-2 p-2 shadow-sm ${props.solo_destination === place.place ? 'active-solo-destination' : ''}`}>
                            <h5>{place.place}</h5>
                            <p className='trip-location-list-items-paragraph m-0'>{place.description}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SoloVaccationPlaces