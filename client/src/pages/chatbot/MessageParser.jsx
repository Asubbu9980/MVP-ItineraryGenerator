// in MessageParser.jsx

import React from 'react';

const MessageParser = (props) => {
    const { children, actions } = props
    const parse = (message) => {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            actions.handleHello();
        }
        if (lowerCaseMessage.includes('my name') || lowerCaseMessage.includes('name')) {
            actions.handleConfirmName()
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