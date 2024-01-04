import React from 'react';
import { Button, Container, Box } from '@mui/material';
import codeIcon from "../../../assets/code-icon.png";
import questionMark from "../../../assets/question-mark.png";
import pinIocn from "../../../assets/pin-iocn.png";
import bulbIcon from "../../../assets/bulb-icon.png";

// import userIocn from "../../ass?ets/userIocn.png";
// import chatBoatIcon from "../../assets/chatBoatIcon.png";
const WelcomeWidget = (props) => {
    return (
        <Box className='aiChatbot'>
            <Box >
                <h1>Choose </h1>
                <ul className='chatbotList'>
                    <li className='mb-2 p-2'>
                        <span className='icon'> <img src={questionMark} alt='questionMark' /> </span>
                        <p className='m-0'>Where are you planning your vacation ?</p>
                    </li>
                    <li className='mb-2 p-2'>
                        <span className='icon'><img src={codeIcon} alt='codeIcon' /> </span>
                        <p className='m-0'>Are you going solo for your trip ? </p></li>
                    <li className='mb-2 p-2' onClick={() => {
                        return props.actionProvider.showDestinationList()
                    }}>
                        <span className='icon'><img src={bulbIcon} alt='bulbIcon' /> </span>
                        <p className='m-0'>Show best places in india </p></li>
                    <li className='mb-2 p-2' >
                        <span className='icon' ><img src={pinIocn} alt='pinIocn' /> </span>
                        <p className='m-0'>Trip planning suggestions </p></li>
                    <li className='mb-2 p-2' >
                        <span className='icon'><img src={bulbIcon} alt='bulbIcon' /> </span>
                        <p className='m-0'>Top vacation places for family trip </p></li>

                </ul>
            </Box>
        </Box>
    );
};

export default WelcomeWidget;