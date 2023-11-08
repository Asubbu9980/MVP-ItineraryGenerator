
import React, { createContext, useContext, useState } from "react";
// import dayjs from 'dayjs';


export const TripPayloadContext = createContext();
export const useAppTripPayloadContext = () => useContext(TripPayloadContext);

export const TripPayloadContextProvider = (props) => {
    const [tripPayloadState, setTripPayloadState] = useState({
        destination: '',
        start_date: '',
        end_date: '',
        trip_status_type: '',
        activities: [],
        // transport: '',
        food_type: '',
        trip_theme_type: ''

    });



    return (
        <TripPayloadContext.Provider value={{
            tripPayloadState, setTripPayloadState,
        }} >
            {props.children}
        </TripPayloadContext.Provider>
    );

}