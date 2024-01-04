import React from 'react';
import { createClientMessage } from 'react-chatbot-kit';
import dayjs from 'dayjs';
import { getTripDetailsApi } from '../../helpers/trip_helper';
const ActionProvider = ({ createChatBotMessage, state, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
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
    const handleConfirmName = () => {
        console.log("state", state);
        const botMessage = createChatBotMessage(`Hello ${state.name} Where you want to go`);
        // setState((prev) => ({
        //     ...prev,
        //     name:
        //         messages: [...prev.messages, botMessage],
        // }));
    };
    const handleDestination = (destination) => {
        const clientMessage = createClientMessage(`${destination}`);
        const botMessage = createChatBotMessage(`Where you are planning to go to ${destination}`, {
            widget: "start_date",
            delay: 500,
        });
        setState((prev) => ({
            ...prev,
            destination: destination,
            messages: [...prev.messages, clientMessage, botMessage],
        }));

    }
    const handleStartDateChange = (start_date) => {
        const clientMessage = createClientMessage(`${start_date}`);
        const botMessage = createChatBotMessage(`Please wait`, {
            delay: 500,
            loading: true,
            terminateLoading: true,

        });
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, clientMessage, botMessage],
            start_date: start_date,
        }));
        getTripDetails();
    }

    const getTripDetails = () => {
        try {
            const payload = {
                destination: state.destination,
                "source": "Hyderabad",
                "start_date": dayjs(state.start_date).format('DD MMMM, YYYY'),
                "end_date": dayjs(dayjs(state.start_date).format('DD MMMM, YYYY')).add(3, 'day').format('DD MMMM, YYYY'),
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
                console.log(JSON.stringify(fR));
                const botMessage = createChatBotMessage(`Here Is the plan`, {
                    delay: 500,
                    widget: "Itinerary",
                    loading: true,
                    terminateLoading: true,
                });
                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, botMessage],
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
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;