import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Tripdata from './Tripdata.json';
import dayjs from 'dayjs';
const DatePickerWidget = (props) => {
    return (
        <div className='startDate' style={{ marginBottom: '20px' }}>
            {/* <div> <label style={{ marginBottom: '8px' }}>Start Date</label></div> */}
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={props.start_Date}
                        onChange={(date) => {
                            if (date != null && date != "") {
                                return props.actionProvider.handleStartDateChange(date)
                            }
                        }}
                        maxDate=''
                        minDate={dayjs(new Date())}
                        className="startDate"

                    />
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default DatePickerWidget;