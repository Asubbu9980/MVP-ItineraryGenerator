import React from 'react';

const PreloadMessages = (props) => {
    console.log("From");
    return props.actionProvider.setMessages()
};

export default PreloadMessages;