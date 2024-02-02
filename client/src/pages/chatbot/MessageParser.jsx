// in MessageParser.jsx

import React from 'react';
import nlp from 'compromise';
// import { parse, format, addMonths } from 'date-fns';

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

        // const dateRegex = /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Dec|Nov|Sept|Aug|Oct|Feb|Jan)\b\s+\d{1,2}(?:th|st|nd|rd)?(?:\s*,?\s*\d{4})?\b)/gi;

        // Define keywords related to itinerary
        const itineraryKeywords = ['itinerary', 'schedule', 'vacation', 'plan', 'trip', 'want go', 'Want to go', 'need to go', 'want to visit', 'need to visit', 'will go', 'will visit', 'want to travel', 'need to travel', 'will travel', 'want to explore', 'need to explore', 'will explore', 'want to see', 'need to see', 'will see', 'want to experience', 'need to experience', 'will experience', 'want to enjoy', 'need to enjoy', 'will enjoy', 'want to discover', 'need to discover', 'will discover', 'want to witness', 'need to witness', 'will witness', 'want to spend time', 'need to spend time', 'will spend time', 'want to spend some time', 'need to spend some time', 'will spend some time', 'want to spend some quality time', 'need to spend some quality time', 'will spend some quality time', 'want to spend some good time', 'need to spend some good time', 'will spend some good time', 'want to spend some quality time', 'need to spend some quality time', 'will spend some quality time', 'planning to go', 'planning visit', 'planning to visit', 'planning to travel', 'planning to explore', 'planning to see', 'planning to experience', 'planning to enjoy', 'planning to discover', 'planning to witness', 'planning to spend time', 'planning to spend some time', 'planning to spend some quality time', 'planning to spend some good time'];

        const isItineraryRelated = itineraryKeywords.some(keyword => doc.has(keyword));
        // console.log(isItineraryRelated, "isItineraryRelated")


        if (isItineraryRelated) {
            return true;
        } else {
            return false;
        }
    };

    const getDestination = (userInput) => {
        const splitedText = userInput?.split(" ");
        let destination = null
        for (var i = 0; i < splitedText.length; i++) {
            const v = splitedText[i];
            const indexed = famousTouristCitiesInIndia.map(m => m.toLowerCase()).indexOf(v.toLowerCase());
            if (indexed >= 0) {
                destination = v
            }
        }
        // console.log(destination, "destination")
        if (destination) {
            const dateRegex = /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Dec|Nov|Sept|Aug|Oct|Feb|Jan)\b|\b(?:next month)\b)?\s+(\d{1,2}(?:th|st|nd|rd)?)(?:\s*(?:to|-)\s*(\d{1,2}(?:th|st|nd|rd)?))?(?:\s*,?\s*(\d{4}))?/gi;
            // Extract potential date-like patterns
            const potentialDates = userInput?.match(dateRegex) || [];
            console.log(potentialDates, "potentialDates")
            if (potentialDates?.length > 0) {
                if (potentialDates?.length === 1) {
                    actions.handleDestinationAlongWithDate(destination, true, userInput, potentialDates[0])
                } else {
                    actions.handleDestinationAlongWithDate(destination, true, userInput, potentialDates[0], potentialDates[1])
                }
            } else {
                actions.handleDestination(destination, true, userInput);
            }

        } else {
            actions.handleMessageChages(userInput)

        }
    }

    const parse = (message) => {
        const isItineraryPlan = analyzeUserInput(message)
        // console.log(isItineraryPlan, "isItineraryPlan")
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