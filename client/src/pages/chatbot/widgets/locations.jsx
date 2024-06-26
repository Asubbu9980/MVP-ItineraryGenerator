import React from 'react';
import Options from './options';
const LocationWidget = (props) => {
    // console.log("props.trip_suggestion_duration", props.trip_suggestion_duration);
    const famousTouristCitiesInIndia = [
        "Agra",
        "Varanasi",
        "Kerala",
        "Goa",
        'Hyderabad',
        'Delhi',
        "Chennai",
        "Hampi",
        "Rishikesh",
        "Khajuraho",
        "Mysore",
        "Srinagar",
        "Aurangabad",
        "Udaipur",
        "Darjeeling",
        "Bhuj",
        "Mumbai",
        "Leh",
        "Kolkata",
        "Jaipur",
        "Bangalore",
        "Pondicherry",
        "Himalayas",
        "Amritsar",
        "Jaisalmer",
        "Gangtok",
        "Shimla",
        "Manali",
        "Kochi",
        "Jodhpur",
        "Madurai",
        "Pushkar",
        "Pune",
        "Gokarna",
        "Rajasthan",
        "Gujarat",
        "Maharashtra",
        "Tamil Nadu",
        "Karnataka",
        "Telangana",
        "Andhra Pradesh",
        "Kashmir",
        "Haryana",
        "Uttarakhand",
        "Himachal Pradesh",
        "West Bengal",
        "Punjab",
        "Sikkim",
        "Uttar Pradesh",
        "Madhya Pradesh",
    ];
    const options = [];
    famousTouristCitiesInIndia.map((m, i) => {
        options.push({
            text: "destination",
            name: m,
            handler: () => {
                return (props.trip_suggestion_duration === '' ? props.actionProvider.handleDestination(m) : props.actionProvider.handleTripSuggestionsDestination(m))

            },
            id: i + 1
        })
    })
    return <Options options={options} title="Popular Locations" {...props} />;
};

export default LocationWidget;