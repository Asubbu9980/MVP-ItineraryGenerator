import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Tripdata from './Tripdata.json';
import dayjs from 'dayjs';
const DatePickerWidget = (props) => {
    return (
        <div className='text-center my-4'>
         <div> <label style={{ marginBottom: '8px' }}>Select your Start Date</label></div>
        <div className='startDate mb-4'>
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