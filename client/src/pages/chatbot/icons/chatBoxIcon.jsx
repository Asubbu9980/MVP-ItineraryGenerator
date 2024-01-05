import React from 'react';
import BotIcon from '../../../assets/ai-bot.svg';

const ChatBoxIcon = (props) => {
    return (
        <div className="react-chatbot-kit-chat-bot-avatar">
            <div className="react-chatbot-kit-chat-bot-avatar-container">
                <img src={BotIcon} />
            </div>
        </div>
    );
};

export default ChatBoxIcon;