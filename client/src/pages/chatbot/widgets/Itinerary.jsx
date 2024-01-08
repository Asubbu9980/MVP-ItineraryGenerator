import React from 'react';
import Itinerary from '../../../common/Itinerary';
const ItineraryWidget = (props) => {
    return <Itinerary tripData={props.payload != undefined && props.payload.tripData != undefined ? props.payload.tripData : props.tripData} tripTitle={props.payload != undefined && props.payload.tripTitle != undefined ? props.payload.tripTitle : props.tripTitle} />;
};

export default ItineraryWidget;