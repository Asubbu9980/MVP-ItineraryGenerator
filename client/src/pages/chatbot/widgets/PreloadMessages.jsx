import React from 'react';

const PreloadMessages = (props) => {
    console.log("From");
    const filteredMessageHistory = props?.messageHistory?.filter((m) => typeof (m?.message) === 'string')
    return props.actionProvider.setMessages(filteredMessageHistory)

};

export default PreloadMessages;