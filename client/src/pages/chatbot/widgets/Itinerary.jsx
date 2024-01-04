import React from 'react';
import Itinerary from '../../../common/Itinerary';
const ItineraryWidget = (props) => {
    return <Itinerary tripData={props.tripData} tripTitle={props.tripTitle} />;
};

export default ItineraryWidget;