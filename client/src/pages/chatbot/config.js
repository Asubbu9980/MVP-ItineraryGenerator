// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import LocationWidget from './widgets/locations';
import DatePickerWidget from './widgets/DatePicker';
import Itinerary from '../../common/Itinerary';
import dayjs from 'dayjs';
import ItineraryWidget from './widgets/Itinerary';
import WelcomeWidget from './widgets/welcome';



const currentDate = new Date();

export const startDateInitialValue = dayjs(currentDate).add(1, 'day')
export const endDateInitialValue = dayjs(currentDate).add(3, 'day')
const botName = 'Ai Chatbot';

const config = {
    initialMessages: [
        createChatBotMessage(
            `Hi I'm ${botName}. I’m here to help you explain how I work.`, {
            delay: 500,
            widget: 'welcome',
        }
        ),
        // createChatBotMessage(
        //     "Here's a quick overview over what I need to function. ask me about the different parts to dive deeper.",
        //     {
        //         withAvatar: false,
        //         delay: 500,
        //         widget: 'overview',
        //     }
        // ),
        // createChatBotMessage(
        //     "First things first, where you want to go?",
        //     {
        //         withAvatar: false,
        //         widget: "locations",
        //         delay: 1000,
        //     }
        // ),
    ],
    state: {
        name: '',
        destination: '',
        source: 'Hyderabad',
        // budget: '',
        start_date: startDateInitialValue,
        end_date: endDateInitialValue,
        transport: 'car',
        tripData: null,
        tripTitle: null
    },
    widgets: [
        {
            widgetName: "welcome",
            widgetFunc: (props) => <WelcomeWidget {...props} />,
            mapStateToProps: ["messages", "destination"]
        },
        {
            widgetName: "locations",
            widgetFunc: (props) => <LocationWidget {...props} />,
            mapStateToProps: ["messages", "destination"]

        },
        {
            widgetName: "start_date",
            widgetFunc: (props) => <DatePickerWidget {...props} />,
            mapStateToProps: ["messages", "destination", "start_date"]

        },
        {
            widgetName: "Itinerary",
            widgetFunc: (props) => <ItineraryWidget {...props} />,
            mapStateToProps: ["tripData", "tripTitle"]
        },

        // {
        //     widgetName: 'messageParser',
        //     widgetFunc: (props) => <MessageParserDocs {...props} />,
        //     mapStateToProps: ['gist', 'infoBox'],
        // },
        // {
        //     widgetName: 'actionProviderDocs',
        //     widgetFunc: (props) => <ActionProviderDocs {...props} />,
        //     mapStateToProps: ['gist', 'infoBox'],
        // },
    ],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: '#fff',
        },
        chatButton: {
            backgroundColor: '#5ccc9d',
        },
    },
};

export default config;