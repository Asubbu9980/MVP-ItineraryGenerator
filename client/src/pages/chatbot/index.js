import React, { useState, useEffect } from 'react';
import 'react-chatbot-kit/build/main.css'

import { useLocation } from 'react-router-dom'; // Assuming you are using React Router

import './chatbot.scss';
import './chatbotKit.css';

import Chatbot from 'react-chatbot-kit'
// import { Container } from '@mui/material';
// import Button from '@mui/material/Button';
import { Button, Container, Box } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import addIcon from "../../assets/new-add.png";
import filmStrip from "../../assets/film-strip.png";
import lightbulbFilament from "../../assets/lightbulb-filament.png";
import comments from "../../assets/comments.png";

import config from './config.js';
import MessageParser from './MessageParser.jsx';
import ActionProvider from './ActionProvider.jsx';

function IndexPage() {
    // Added the class to HTML body element
    const location = useLocation();
    useEffect(() => {
        const { pathname } = location;
        const className = pathname.substring(1).replace('/', '-');
        document.body.className = className + " chatbotPage ";
        return () => {
            document.body.className = '';
        };
    }, [location]);

    const [todayMessageHistory, setTodayMessageHistory] = useState([])
    const [oldMessageHistory, setOldMessageHistory] = useState([])
    const [messageItem, setMessageItem] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [mID, setMID] = useState();
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const saveMessages = (messages, HTMLString) => {
        // console.log("Save,", HTMLString);
        // JSON.stringify(messages);
        const mid = Date.now();
        const created_at = new Date().toLocaleDateString();
        messages.forEach((element, elementIndex) => {
            if (element.mId == undefined) {
                messages[elementIndex]['mId'] = mid;
                messages[elementIndex]['isFromLocal'] = true;
            }
            if (element.created_at == undefined) {
                messages[elementIndex]['created_at'] = created_at;
            }
        });
        console.log("savemessages", messages);
        // const getExistingMessages = localStorage.getItem("chat_messages");
        // if (getExistingMessages != null && getExistingMessages != undefined) {
        //     const newM = [...JSON.parse(getExistingMessages), messages]
        //     console.log("newM", newM);
        //     localStorage.setItem('chat_messages', JSON.stringify(newM));
        // } else {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
        // }
        return messages;
    };
    let groupBy = (array, key) => {
        return array.reduce((result, obj) => {
            (result[obj[key]] = result[obj[key]] || []).push(obj);
            return result;
        }, {});
    };
    const groupByMultipleKeys = (items, keys) =>
        items.reduce((acc, item) => {

            const isExistingItem = acc
                .flatMap(accItem => accItem)
                .find(accItem =>
                    keys.every(key => accItem[key] === item[key])
                )

            if (isExistingItem) {
                return acc;
            }

            const allRelatedItems = items.filter(ungroupedItem =>
                keys.every(key => ungroupedItem[key] === item[key])
            )

            acc.push(allRelatedItems)

            return acc

        }, [])
    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem('chat_messages'));
        // let a = groupBy(messages, "mId");
        return messages;
    };
    // useEffect(() => {
    //     console.log("messageItem", messageItem);
    // }, [messageItem])
    useEffect(() => {
        const messages = JSON.parse(localStorage.getItem('chat_messages'));
        if (messages.length > 0) {
            let a = groupBy(messages, "mId");
            console.log("a", a);
            const today = new Date().toLocaleDateString();
            const todaysData = [];
            const groupedresponse = Object.values(a)
            // console.log("groupedresponse", groupedresponse);
            groupedresponse.forEach((element, eIndex) => {
                const lMID = element[0].mId;
                console.log("lMID", lMID);
                const created_at = element[0].created_at;
                console.log("created_at", created_at);
                const m = element.map(m => m.message);
                console.log("m", m);
                if (today == created_at) {
                    console.log("Hete");
                    //     // const primaryId = 
                    const indexed = m.map(m => m).indexOf("Here Is the plan");
                    console.log("indexed", indexed);
                    if (indexed >= 0) {
                        todaysData.push({
                            id: lMID,
                            title: element[indexed].payload?.tripTitle,
                            data: element
                        })
                    } else {
                        todaysData.push({
                            id: lMID,
                            title: lMID,
                            data: element
                        })
                    }
                    // if (m.includes('Here Is the plan')) {
                    //    
                    // } 
                }
            });
            console.log("a", todaysData);
            if (todaysData.length > 0) {
                setTodayMessageHistory(todaysData);
            }
        }
    }, [localStorage.getItem("chat_messages")])
    useEffect(() => {
        // console.log("todayMessageHistory", todayMessageHistory);

    }, [todayMessageHistory])
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
            <div className="px-2 px-sm-0 sideBar custom-scroll">
                <div className=' p-3'>
                    <h2 className='my-3'> Ai Chatbot</h2>
                    <Button variant="text" className="buttonTrip mx-2" onClick={() => {

                    }}>
                        <img src={addIcon} alt='addIcon' /> New Trip </Button>
                    <Box className="leftMenu mt-5">
                        <h6>Today</h6>
                        <MenuList>
                            {
                                todayMessageHistory.map((tm, tmIndex) => {
                                    return <MenuItem key={tmIndex} onClick={() => setMessageItem(tm.data)}>
                                        <img src={comments} alt="lightbulbFilament" className='me-2' />
                                        <ListItemText>{tm.title}</ListItemText>
                                    </MenuItem>
                                })
                            }
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
            <div className="px-2 px-sm-0 rightBar custom-scroll">
                {/* <div className='ms-2'> */}
                {/* <div className='ms-2 ' style={{height:'100vh', overflowY:'scroll'}}> */}
                <div className='ms-2'>
                    <div className="messages-container mb-3">
                        <Box className='chatConversation'>
                            {/* {
                                JSON.stringify(messageItem)
                            } */}
                            {
                                messageItem.length == 0 ?
                                    <Chatbot
                                        config={config}
                                        messageParser={MessageParser}
                                        actionProvider={ActionProvider}
                                        runInitialMessagesWithHistory
                                        messageHistory={() => {
                                            console.log("Mess");
                                        }}
                                    /> : <Chatbot
                                        config={config}
                                        messageParser={MessageParser}
                                        actionProvider={ActionProvider}
                                        // runInitialMessagesWithHistory
                                        // messageHistory={messageItem.length > 0 ? messageItem : null}
                                        // messageHistory={messageItem}
                                        saveMessages={saveMessages}
                                    // validator={validateInput}
                                    />
                            }

                        </Box>
                    </div>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>


        </div>
    )
}
export default IndexPage