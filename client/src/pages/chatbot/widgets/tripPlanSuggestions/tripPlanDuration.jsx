import React from 'react'
import Chip from '@mui/joy/Chip';
const tripDurationList = [
    "3 days",
    "4 days",
    "5 days",
    "One week"
]

const tripPlanDuration = (props) => {
    return (
        <div className='d-flex justify-content-center'>
            <div className='d-flex flex-wrap '>
                {tripDurationList.map((tripDuration, i) => {
                    // console.log(tripDuration)
                    return (
                        <Chip
                            key={i}
                            variant="solid"
                            style={{ margin: "0.5rem" }}
                            className={`p-2 px-3 tripDurationChip ${props.trip_suggestion_duration === tripDuration ? "selected-trip-duration" : ""}`}
                            onClick={() => {
                                return props.actionProvider.handleTripSuggestionsDuration(tripDuration)
                            }}
                        >{tripDuration}</Chip>
                    )
                })}
            </div>
        </div>
    )
}

export default tripPlanDuration