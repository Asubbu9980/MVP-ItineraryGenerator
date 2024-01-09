import React from 'react';
import { createClientMessage } from 'react-chatbot-kit';
import dayjs from 'dayjs';
import { getTripDetailsApi } from '../../helpers/trip_helper';
import PleaseWaitMsg from '../chatbot/widgets/pleaseWaitMsg';

const ActionProvider = ({ createChatBotMessage, state, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
        // requestAnimationFrame(() => { window.scrollTo(420); });
        handleAskName()
    };
    const handleAskName = () => {
        // console.log("name", state);
        const botMessage = createChatBotMessage('May i Know Your Name?');
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));

    };
    const handleMessageChages = (m) => {
        // console.log("name", state);
        const lowerCaseMessage = m.toLowerCase();
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            handleHello();
            return;
            // break
        }
        if (lowerCaseMessage.includes('my name') || lowerCaseMessage.includes('name')) {
            handleConfirmName();
            return;
            // break;
        }
        // let message = 
        const botMessage = createChatBotMessage(`Hi I'm AI Chatbot. I’m here to help you on Itinerary. Please ask related to trip or locations`);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleConfirmName = () => {
        console.log("state", state);
        const botMessage = createChatBotMessage(`Hello ${state.name} Where you want to go`);
        // setState((prev) => ({
        //     ...prev,
        //     name:
        //         messages: [...prev.messages, botMessage],
        // }));
    };
    const showDestinationList = () => {
        const botMessage = createChatBotMessage(`best places in india`, {
            delay: 500,
            widget: "locations",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }
    const setMessages = (messages) => {

        setState((prev) => ({
            ...prev,
            messages: messages,
        }));
    }
    const handleDestination = (destination, enterClinetMessage = true, message = null) => {
        const clientMessage = createClientMessage(message == null ? `${destination}` : message);
        const m = [...state.messages]
        if (enterClinetMessage) {
            m.push(clientMessage)
        }
        const botMessage = createChatBotMessage(`When you are planning for ${destination}`, {
            widget: "start_date",
            delay: 500,
        });
        m.push(botMessage)
        setState((prev) => ({
            ...prev,
            destination: destination,
            messages: m
        }));
    }
    const handleStartDateChange = (start_date) => {
        const clientMessage = createClientMessage(`${start_date}`);
        const botMessage = createChatBotMessage(
            <PleaseWaitMsg message="Please wait" />,
            {
                delay: 500,
                loading: true,
                terminateLoading: true,
            }
        );


        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, clientMessage, botMessage],
            start_date: start_date,
        }));
        getTripDetails();
    }

    const getTripDetails = () => {
        try {
            console.log("state", state);
            const payload = {
                destination: state.destination,
                "source": "Hyderabad",
                "start_date": dayjs(state.start_date).format('DD MMMM, YYYY'),
                "end_date": dayjs(dayjs(state.start_date).format('DD MMMM, YYYY')).add(2, 'day').format('DD MMMM, YYYY'),
            }
            getTripDetailsApi(payload).then((r) => {
                const p = r?.data.hasOwnProperty('trip') ? r?.data.trip : r?.data;
                const fR = {}
                Object.keys(p).forEach(function (key) {
                    var value = p[key];
                    if (key === 'activities' || key === "places") {
                        fR['places_visited'] = value
                    } else {
                        fR[key] = value
                    }
                });
                const botMessage = createChatBotMessage(`Here Is the plan`, {
                    delay: 500,
                    widget: "Itinerary",
                    loading: true,
                    terminateLoading: true,
                    payload: {
                        tripData: fR,
                        tripTitle: `${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  to  ${payload.end_date}`
                    },
                });
                const filteredMessages = state.messages.filter((m) => m.message.includes('Please wait') !== true);
                setState((prev) => ({
                    ...prev,
                    messages: [...filteredMessages, botMessage],
                    // start_date: start_date,
                    tripData: fR,
                    tripTitle: `${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  to  ${payload.end_date}`
                }));
            }).then((e) => {
            })

        } catch (error) {
        }
    }

    const handleThanks = () => {
        const message = this.createChatBotMessage("You're welcome, and stay safe!");

        addMessageToState(message);
    };
    const addMessageToState = (message) => {
        setState((state) => ({
            ...state,
            messages: [...state.messages, message]
        }));
    };
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleAskName,
                        handleConfirmName,
                        handleDestination,
                        handleStartDateChange,
                        showDestinationList,
                        handleMessageChages,
                        setMessages,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;