// in config.js
import { createChatBotMessage, createCustomMessage } from 'react-chatbot-kit';
import LocationWidget from './widgets/locations';
import DatePickerWidget from './widgets/DatePicker';
import Itinerary from '../../common/Itinerary';
import dayjs from 'dayjs';
import ItineraryWidget from './widgets/Itinerary';
import WelcomeWidget from './widgets/welcome';
import ChatBoxIcon from './icons/chatBoxIcon';
import CustomMessage from './widgets/CustomMessage';
import PreloadMessages from './widgets/PreloadMessages';
import FamilyVacationPlaces from './widgets/familyVacationPlaces';
import SoloVaccationPlaces from './widgets/soloVaccationPlaces';
import TripPlanDuration from './widgets/tripPlanSuggestions/tripPlanDuration';
import LocationTripPlanSuggestion from './widgets/tripPlanSuggestions/locationTripPlanSuggestion';
const currentDate = new Date()

const startDateInitialValue = dayjs(currentDate).add(1, 'day')
const endDateInitialValue = dayjs(currentDate).add(3, 'day')
const botName = 'Ai Chatbot';

const config = (message) => {
    console.log("me", (message));
    return {
        initialMessages: [
            createChatBotMessage(
                `Hi I'm ${botName}. How can i help you?`, {
                delay: 500,
                widget: message.length > 0 ? 'reset_messages' : 'welcome',
            })
            // ) : createChatBotMessage("Test", {
            //     withAvatar: false,
            //     delay: 500,
            //     widget: 'reset_messages',
            // })
            // .map((message,index) => {
            //     return createChatBotMessage(message)
            // }),
            // createChatBotMessage(
            //     `Hi I'm ${botName}. I’m here to help you explain how I work.`, {
            //     delay: 500,
            //     widget: 'welcome',
            // })

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
            tripTitle: null,
            trip_suggestion_duration: '',
            solo_destination: '',
            family_destination: '',
            trip_suggestions_destination: '',
        },
        customComponents: {
            botAvatar: (props) => <ChatBoxIcon {...props} />,
        },
        // conversationHistory: message,
        // customMessages: {
        //     custom: (props) => <CustomMessage {...props} />
        // },
        widgets: [
            {
                widgetName: "welcome",
                widgetFunc: (props) => <WelcomeWidget {...props} />,
                mapStateToProps: ["messages", "destination"]
            },
            {
                widgetName: "locations",
                widgetFunc: (props) => <LocationWidget {...props} />,
                mapStateToProps: ["messages", "destination", 'trip_suggestion_duration']

            },
            {
                widgetName: "start_date",
                widgetFunc: (props) => <DatePickerWidget {...props} />,
                mapStateToProps: ["messages", "destination", "start_date", "trip_suggestion_duration"]

            },
            {
                widgetName: "reset_messages",
                widgetFunc: (props) => <PreloadMessages {...props} />,
                mapStateToProps: ["messages", "destination", "start_date"]
            },

            // {
            //     widgetName: "reset_messages",
            //     widgetFunc: (props) => () => {

            //     },
            //     mapStateToProps: ["messages", "destination", "start_date"]

            // },
            {
                widgetName: "Itinerary",
                widgetFunc: (props) => <ItineraryWidget {...props} />,
                mapStateToProps: ["tripData", "tripTitle"]
            },
            {
                widgetName: "family_locations",
                widgetFunc: (props) => <FamilyVacationPlaces {...props} />,
                mapStateToProps: ["messages", "destination", "family_destination"]

            },
            {
                widgetName: "solo_locations",
                widgetFunc: (props) => <SoloVaccationPlaces {...props} />,
                mapStateToProps: ["messages", "destination", "solo_destination"]

            },
            {
                widgetName: "trip_suggestion_duration",
                widgetFunc: (props) => <TripPlanDuration {...props} />,
                mapStateToProps: ["messages", "trip_suggestion_duration"]

            },
            {
                widgetName: "trip_suggestion_destination",
                widgetFunc: (props) => <LocationWidget {...props} />,
                mapStateToProps: ["messages", 'trip_suggestions_destination,trip_suggestion_duration']

            },
            {
                widgetName: "location_trip_suggestions",
                widgetFunc: (props) => <LocationTripPlanSuggestion {...props} />,
                mapStateToProps: ["messages", "trip_suggestion_duration", "trip_suggestions_destination"]

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
    }
}

export default config;