import React from 'react';
import { createClientMessage } from 'react-chatbot-kit';
import dayjs from 'dayjs';
import { getTripDetailsApi } from '../../helpers/trip_helper';
import PleaseWaitMsg from '../chatbot/widgets/pleaseWaitMsg';
import { getChatBotMessagesFromChatgpt, getChatbotUserTripDetailsApi } from '../../helpers/trip_helper';
import ChatGptResponse from './widgets/ChatGptResponse';

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
    const getResponseFromChatgpt = (message) => {

        const botMessage = createChatBotMessage(
            <PleaseWaitMsg message="Please wait..." />,
            {
                delay: 500,
                loading: true,
                terminateLoading: true,
            }
        );
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
        getResponseMessage(message);

        // console.log("response", response);
    }
    const getResponseMessage = (message) => {
        try {
            getChatBotMessagesFromChatgpt({ text: message }).then((response) => {
                const responseMessage = response?.data?.choices[0]?.message?.content;
                if (responseMessage) {
                    const botMessage = createChatBotMessage(<ChatGptResponse response={`${responseMessage}`} />,
                        {
                            delay: 500,
                            loading: true,
                            terminateLoading: true,
                        });
                    const clientMessage = createClientMessage(`${message}`);
                    const filteredMessages = state.messages.filter((m) => {
                        if (typeof (m?.message) === 'string') {
                            return m?.message?.includes('Please wait') !== true
                        } else {
                            return m?.message?.props?.message?.includes('Please wait') !== true;
                        }
                    });
                    setState((prev) => ({
                        ...prev,
                        messages: [...filteredMessages, clientMessage, botMessage],
                    }));
                }
            }).then((e) => { })
        } catch (e) {
            console.log("e", e);
        }
    }
    // console.log("responseMessage", state.messages)
    const handleMessageChages = (m) => {
        // console.log("name", state);
        // const lowerCaseMessage = m.toLowerCase();
        const Message = m;
        // if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        //     handleHello();
        //     return;
        //     // break
        // }
        // if (lowerCaseMessage.includes('my name') || lowerCaseMessage.includes('name')) {
        //     handleConfirmName();
        //     return;
        //     // break;
        // }
        // // let message = 
        // else {
        getResponseFromChatgpt(Message)
        // }
        // const botMessage = createChatBotMessage(`Hi I'm AI Chatbot assistance. I’m here to help you on Trip Itinerary. Please ask related to any vacations or destinations`);
        // setState((prev) => ({
        //     ...prev,
        //     messages: [...prev.messages, botMessage],
        // }));
    };
    const handleConfirmName = () => {
        console.log("state", state);
        const botMessage = createChatBotMessage(`Hello ${state.name}, where you want to go?`);
        setState((prev) => ({
            ...prev,
            // name:
            messages: [...prev.messages, botMessage],
        }));
    };
    const showDestinationList = () => {
        const botMessage = createChatBotMessage(`Best places in india`, {
            delay: 500,
            widget: "locations",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            trip_suggestion_duration: '',
            messages: [...prev.messages, botMessage],
        }));
    }
    const showSoloDestinationList = () => {
        const botMessage = createChatBotMessage(`Best places for solo trip in india`, {
            delay: 500,
            widget: "solo_locations",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }
    const showFamiliesDestinationList = () => {
        const botMessage = createChatBotMessage(`Best places for family trip in india`, {
            delay: 500,
            widget: "family_locations",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }
    const showTripPlanSuggestions = () => {
        const botMessage = createChatBotMessage(`Select your trip planning duartion for suggestions`, {
            delay: 500,
            widget: "trip_suggestion_duration",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    }
    const handleTripSuggestionsDuration = (duration) => {
        const clientMessage = createClientMessage(`${duration}`);

        const botMessage = createChatBotMessage(`Select your trip planning destination`, {
            delay: 500,
            widget: "locations",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            trip_suggestion_duration: duration,
            messages: [...prev.messages, clientMessage, botMessage],
        }));
    }
    const handleTripSuggestionsDestination = (destination) => {
        const clientMessage = createClientMessage(`${destination}`);
        const botMessage = createChatBotMessage(`Here trip planning suggestions for ${destination} ${state.trip_suggestion_duration} trip plan`, {
            delay: 500,
            widget: "location_trip_suggestions",
            loading: true,
            terminateLoading: true,
        });
        const botMessage2 = createChatBotMessage(`Select your start date to create the itinerary for ${destination} ${state.trip_suggestion_duration} trip plan`, {
            delay: 500,
            widget: "start_date",
            loading: true,
            terminateLoading: true,
        });
        setState((prev) => ({
            ...prev,
            trip_suggestions_destination: destination,
            messages: [...prev.messages, clientMessage, botMessage, botMessage2],
            destination: destination
        }));
    }
    const setMessages = (messages) => {

        setState((prev) => ({
            ...prev,
            messages: messages,
        }));
    }
    const handleDestination = (destination, enterClinetMessage = true, message = null, keyName = 'destination') => {
        const clientMessage = createClientMessage(message == null ? `${destination}` : message);
        const m = [...state.messages]
        if (enterClinetMessage) {
            m.push(clientMessage)
        }
        const botMessage = createChatBotMessage(`When are you planning for ${destination}?`, {
            widget: "start_date",
            delay: 500,
        });
        m.push(botMessage)
        setState((prev) => ({
            ...prev,
            [keyName]: destination,
            messages: m,
            destination: destination
        }));
    }
    const handleTripSuggestionsStartDateChange = (start_date, duration) => {
        // console.log("start_date", start_date);
        const selectedStartDate = dayjs(start_date).add(1, 'day');
        const clientMessage = createClientMessage(`${selectedStartDate}`);
        const botMessage = createChatBotMessage(
            <PleaseWaitMsg message="Please wait..." />,
            {
                delay: 500,
                loading: true,
                terminateLoading: true,
            }
        );
        const Enddate = duration === 'One week' ? dayjs(start_date).add(6, 'day') : dayjs(start_date).add((parseInt(duration.split(' ')[0]) - 1), 'day')
        // const minimumTripEndDate = dayjs(start_date).add(2, 'day')

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, clientMessage, botMessage],
            start_date: start_date,
            end_date: Enddate,
        }));
        getTripDetails(start_date, Enddate, selectedStartDate);
    }
    const handleStartDateChange = (start_date) => {
        // console.log("start_date", start_date);
        const selectedStartDate = dayjs(start_date).add(1, 'day');
        const clientMessage = createClientMessage(`${selectedStartDate}`);
        const botMessage = createChatBotMessage(
            <PleaseWaitMsg message="Please wait..." />,
            {
                delay: 500,
                loading: true,
                terminateLoading: true,
            }
        );
        const minimumTripEndDate = dayjs(start_date).add(2, 'day')

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, clientMessage, botMessage],
            start_date: start_date,
            end_date: minimumTripEndDate,
        }));
        getTripDetails(start_date, minimumTripEndDate, selectedStartDate);
    }

    const getTripDetails = (start_date, end_date, selectedStartDate = '') => {
        try {
            console.log('state', state);
            const formattedStartDate = dayjs(start_date).format('DD MMMM, YYYY');
            const formattedEndDate = dayjs(end_date).format('DD MMMM, YYYY');
            // console.log("formattedStartDate", formattedStartDate, 'formattedEndDate', formattedEndDate);
            const payload = {
                destination: state.destination,
                "source": "Hyderabad",
                "start_date": formattedStartDate,
                "end_date": formattedEndDate,
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
                const botMessage = createChatBotMessage(`Here is your trip itinerary`, {
                    delay: 500,
                    widget: "Itinerary",
                    loading: true,
                    terminateLoading: true,
                    payload: {
                        tripData: fR,
                        tripTitle: `${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  to  ${payload.end_date}`
                    },
                });
                // const filteredMessages = state.messages.filter((m) => m.message.includes('Please wait') !== true);
                const clientMessage = createClientMessage(`${selectedStartDate}`);

                const filteredMessages = state.messages.filter((m) => {
                    if (typeof (m?.message) === 'string') {
                        return m?.message?.includes('Please wait') !== true
                    } else {
                        return m?.message?.props?.message?.includes('Please wait') !== true;
                    }
                });
                setState((prev) => ({
                    ...prev,
                    messages: [...filteredMessages, clientMessage, botMessage],
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

    const handleDestinationAlongWithDate = (destination, enterClinetMessage = true, message = null, startDate = '', endDate = '') => {
        const clientMessage = createClientMessage(message == null ? `${destination}` : message);
        const m = [...state.messages]
        if (enterClinetMessage) {
            m.push(clientMessage)
        }
        const botMessage = createChatBotMessage(
            <PleaseWaitMsg message="Please wait..." />,
            {
                delay: 500,
                loading: true,
                terminateLoading: true,
            }
        );

        // setState((prev) => ({
        //     ...prev,
        //     messages: [...prev.messages, clientMessage, botMessage],
        //     start_date: start_date,
        //     end_date: minimumTripEndDate,
        // }));

        setState((prev) => ({
            ...prev,
            destination: destination,
            messages: [...m, botMessage]
        }));
        getUserTripDetails(destination, startDate, endDate, message);

    }
    const getUserTripDetails = (destination, start_date, end_date, message) => {
        try {

            const payload = {
                destination: destination,
                "source": "Hyderabad",
                "start_date": start_date,
                "end_date": end_date,
            }
            getChatbotUserTripDetailsApi(payload).then((r) => {
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
                const botMessage = createChatBotMessage(`Here is your trip itinerary`, {
                    delay: 500,
                    widget: "Itinerary",
                    loading: true,
                    terminateLoading: true,
                    payload: {
                        tripData: fR,
                        tripTitle: `${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  ${payload?.end_date ? ` to ${payload.end_date}` : ''}`
                    },
                });
                // const filteredMessages = state.messages.filter((m) => m.message.includes('Please wait') !== true);
                const clientMessage = createClientMessage(message == null ? `${payload.destination}` : message);
                const filteredMessages = state.messages.filter((m) => {
                    if (typeof (m?.message) === 'string') {
                        return m?.message?.includes('Please wait') !== true
                    } else {
                        return m?.message?.props?.message?.includes('Please wait') !== true;
                    }
                });
                setState((prev) => ({
                    ...prev,
                    messages: [...filteredMessages, clientMessage, botMessage],
                    // start_date: start_date,
                    tripData: fR,
                    tripTitle: `${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  to  ${payload.end_date}`
                }));
            }).then((e) => {
            })

        } catch (error) {
        }
    }
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
                        showSoloDestinationList,
                        showFamiliesDestinationList,
                        showTripPlanSuggestions,
                        handleTripSuggestionsDuration,
                        handleTripSuggestionsDestination,
                        handleTripSuggestionsStartDateChange,
                        handleDestinationAlongWithDate
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;