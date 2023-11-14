
import React, { createContext, useContext, useState } from "react";
import dayjs from 'dayjs';


export const TripPayloadContext = createContext();
//export const useAppTripPayloadContext = () => useContext(TripPayloadContext);

const currentDate = new Date();

export const startDateInitialValue = dayjs(currentDate).add(1, 'day')
export const endDateInitialValue = dayjs(currentDate).add(3, 'day')


export const TripPayloadContextProvider = (props) => {

    const [tripPayloadState, setTripPayloadState] = useState({
        destination: '',
        start_date: startDateInitialValue,
        end_date: endDateInitialValue,
        trip_status_type: 'Going solo',
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