// in MessageParser.jsx

import React from 'react';
import nlp from 'compromise';


const MessageParser = (props) => {
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

    const { children, actions } = props

    const analyzeUserInput = (userInput) => {
        const doc = nlp(userInput);

        // Define keywords related to itinerary
        const itineraryKeywords = ['itinerary', 'schedule', 'plan', 'trip'];

        // Check if any of the itinerary keywords are present in the user's input
        const isItineraryRelated = itineraryKeywords.some(keyword => doc.has(keyword));

        // Check if the input is only "Goa" without any other clear indicators
        // const isCasual = doc.out('array').length === 1;

        if (isItineraryRelated) {
            return true;
        } else {
            return false;
        }
    };

    const getDestination = (userInput) => {
        const splitedText = userInput.split(" ");
        let destination = null
        for (var i = 0; i < splitedText.length; i++) {
            const v = splitedText[i];
            const indexed = famousTouristCitiesInIndia.map(m => m.toLowerCase()).indexOf(v.toLowerCase());
            if (indexed >= 0) {
                destination = v
            }
        }
        console.log(destination, "destination")
        if (destination) {

            actions.handleDestination(destination, true, userInput);
        } else {
            actions.handleMessageChages(userInput)

        }
    }

    const parse = (message) => {
        const isItineraryPlan = analyzeUserInput(message)
        console.log(isItineraryPlan, "isItineraryPlan")
        if (isItineraryPlan) {
            getDestination(message)

        } else {
            actions.handleMessageChages(message)

        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;