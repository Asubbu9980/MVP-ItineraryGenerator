import React, { useContext } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card from '@mui/material/Card';
import { TripPayloadContext } from '../../context/TripDataContext';
import dayjs from 'dayjs';
// import { TextField } from '@mui/material';


const TripDatePicker = ({ fieldName = '' }) => {
    const { tripPayloadState, setTripPayloadState } = useContext(TripPayloadContext);
    // console.log(tripPayloadState)

    const MaxEndDate = dayjs(tripPayloadState.start_date).add(6, 'day')

    const onChangeDate = (name, date) => {
        if (name === 'start_date') {
            const minimumTripEndDate = dayjs(date).add(3, 'day')
            setTripPayloadState((prevState) => ({ ...prevState, start_date: date, end_date: minimumTripEndDate }));

        } else {
            setTripPayloadState((prevState) => ({ ...prevState, [name]: date }));
        }

    };

    return (
        <>
            <Card>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="date-picker-classname"
                        value={tripPayloadState[fieldName]}
                        maxDate={fieldName === 'start_date' ? '' : MaxEndDate}
                        minDate={fieldName === 'start_date' ? dayjs(new Date()) : tripPayloadState.start_date}
                        name={fieldName}
                        disablePast
                        onChange={(date) => onChangeDate(fieldName, date)}
                        sx={{
                            svg: { color: '#fff' },
                            input: { color: '#fff' },
                        }}


                    />
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default TripDatePicker