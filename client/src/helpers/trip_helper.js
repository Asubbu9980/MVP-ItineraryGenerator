import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();


export const getTripDetailsApi = (trip) => api.create(url.TRIP, trip);
export const getChatbotUserTripDetailsApi = (trip) => api.create(url.TRIP + '/chatbotItinerary', trip);
export const getTripDetailsByVoiceApi = (trip) => api.create(url.TRIP + '/voice', trip);
export const getChatBotMessagesFromChatgpt = (text) => api.create(url.TRIP + '/chatbot', text);
export const getRecentTripDetailsApi = (trip) => api.get(url.TRIP);