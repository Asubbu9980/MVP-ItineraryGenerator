// in MessageParser.jsx

import React from 'react';

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
    const parse = (message) => {
        const splitedText = message.split(" ");
        let destination = null
        for (var i = 0; i < splitedText.length; i++) {
            const v = splitedText[i];
            const indexed = famousTouristCitiesInIndia.map(m => m.toLowerCase()).indexOf(v.toLowerCase());
            if (indexed >= 0) {
                destination = v
            }
        }
        if (destination) {
            actions.handleDestination(destination, true, message);
        } else {
            const lowerCaseMessage = message.toLowerCase();
            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                actions.handleHello();
            }
            if (lowerCaseMessage.includes('my name') || lowerCaseMessage.includes('name')) {
                actions.handleConfirmName()
            }
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