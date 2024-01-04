import React, { useState } from 'react';
import 'react-chatbot-kit/build/main.css'

import './chatbot.css';
import Chatbot from 'react-chatbot-kit'
// import { Container } from '@mui/material';
// import Button from '@mui/material/Button';
import { Button, Container, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

import paperPlaneTilt from "../../assets/paper-plane-tilt.png";
import microphone from "../../assets/microphone.png";
// import chatBoatIcon from "../../assets/chatBoatIcon.png";
import addIcon from "../../assets/addIcon.png";
import filmStrip from "../../assets/film-strip.png";
import lightbulbFilament from "../../assets/lightbulb-filament.png";
import comments from "../../assets/comments.png";
import codeIcon from "../../assets/code-icon.png";
import questionMark from "../../assets/question-mark.png";
import pinIocn from "../../assets/pin-iocn.png";
import bulbIcon from "../../assets/bulb-icon.png";

import userIocn from "../../assets/userIocn.png";
import chatBoatIcon from "../../assets/chatBoatIcon.png";

import config from './config.js';
import MessageParser from './MessageParser.jsx';
import ActionProvider from './ActionProvider.jsx';














function IndexPage() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setError(null); // Clear error when user starts typing
    };
    const sendMessage = () => {
        if (!inputValue.trim()) {
            setError('Please enter a message.');
            return;
        }
        // Add new message to messages array and reset input field
        setMessages([...messages, inputValue]);
        setInputValue('');
    };
    return (
        <div className="chatbot-container mt-3">
            <Container>
                <div className='row' style={{ height: "100vh" }}>
                    <div className="col-sm-12  col-md-4 col-lg-3 px-2 px-sm-0 sideBar">
                        <div className=' p-3'>
                            <h2 className='my-3'> Ai Chatbot</h2>
                            <Button variant="text" className="buttonTrip mx-2">New Trip </Button>
                            <Box className="leftMenu mt-5">
                                <h6>Today</h6>
                                <MenuList>
                                    <MenuItem>
                                        <img src={comments} alt="lightbulbFilament" className='me-2' />
                                        <ListItemText>Goa trip itinerary</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <img src={lightbulbFilament} alt="lightbulbFilament" className='me-2' />
                                        <ListItemText>Manali trip ideas</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <img src={filmStrip} alt="filmStrip" className='me-2' />
                                        <ListItemText>Delhi trip planning</ListItemText>

                                    </MenuItem>
                                </MenuList>
                            </Box>
                            <Box className="leftMenu mt-2">
                                <h6>Previous 7 days</h6>
                                <MenuList>
                                    <MenuItem>
                                        <img src={comments} alt="lightbulbFilament" className='me-2' />
                                        <ListItemText>Goa trip itinerary</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <img src={lightbulbFilament} alt="lightbulbFilament" className='me-2' />
                                        <ListItemText>Manali trip ideas</ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <img src={filmStrip} alt="filmStrip" className='me-2' />
                                        <ListItemText>Delhi trip planning</ListItemText>

                                    </MenuItem>
                                </MenuList>
                            </Box>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9 px-2 px-sm-0">
                        <div className='ms-2' style={{ height: "100%" }}>
                            <div className="messages-container mb-3 p-2">
                         


                                <Box className='chatConversation'>
                                    {/* <Box className="chatContainer">
                                        <img src={userIocn} alt="Avatar" />

                                        <p>Hello. How are you today?</p>
                                        <span className="time-right">11:00</span>
                                    </Box>
                                    <Box className="chatContainer darker">
                                        <img src={chatBoatIcon} alt="Avatar" />

                                        <p>Hey! I'm fine. Thanks for asking!</p>
                                        <span className="time-left">11:01</span>
                                    </Box>
*/}
                                    <Chatbot
                                        config={config}
                                        messageParser={MessageParser}
                                        actionProvider={ActionProvider}
                                        runInitialMessagesWithHistory

                                    />                                </Box>

                                {/* {messages.map((message, index) => (
                                    <div key={index} className="message">{message}</div>
                                ))} */}
                            </div>
                            {error && <div className="error">{error}</div>}
                            {/* <div className="input-container">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder='I want to go to goa trip next week'
                                    className="message-input border-0"

                                />
                                <button onClick={sendMessage} className="send-button">Send</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default IndexPage