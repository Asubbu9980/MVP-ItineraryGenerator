import React, { useContext } from 'react'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card from '@mui/material/Card';
import { TripPayloadContext } from '../../context/TripDataContext';


const TripDatePicker = ({ fieldName = '' }) => {
    const { tripPayloadState, setTripPayloadState } = useContext(TripPayloadContext);

    const onChangeDate = (name, date) => {
        const formattedDate = dayjs(date.$d).format('DD MMMM, YYYY');
        // console.log(name, formattedDate)

        setTripPayloadState((prevState) => ({ ...prevState, [name]: formattedDate }));
    };

    return (
        <>
            <Card>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="date-picker-classname"
                        style={{ background: '#fff' }}
                        value={tripPayloadState[fieldName]}
                        name={fieldName}
                        onChange={(date) => onChangeDate(fieldName, date)}
                    />
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default TripDatePicker