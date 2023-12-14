import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WeatherIcon from '../assets/weather-icon.png';
// import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';
import Tooltip from '@mui/joy/Tooltip';


const WeatherReport = ({ placeCoordinates, date = new Date() }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {

        const getDestinationPlaceWeatherDetails = async () => {
            // console.log('date', date)
            const parts = date.split('/');
            const myDate = new Date(parts[2], parts[1] - 1, parts[0]);
            let unixTimestamp = Math.floor(myDate.getTime() / 1000);
            console.log('myDate', myDate)
            if (!unixTimestamp) {
                const todaysDate = new Date();
                unixTimestamp = Math.floor(todaysDate.getTime() / 1000);
            }


            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${placeCoordinates?.lat?.slice(0, -3)}&lon=${placeCoordinates?.lng?.slice(0, -3)}&dt=${unixTimestamp}&units=metric&appid=258730fe6c89445030503ee5885791ef`)
                if (weatherResponse?.ok) {
                    const contentType = weatherResponse?.headers?.get('content-type');

                    if (contentType && contentType?.includes('application/json')) {
                        // If the content type is JSON, use .json() to parse
                        const data = await weatherResponse?.json();
                        console.log('Weather JSON Response:', data);

                        setWeatherData(data);
                    } else {
                        // If the content type is not JSON, handle it accordingly
                        const textData = await weatherResponse?.text();
                        console.log('Weather Non-JSON Response:', textData);
                    }
                } else {
                    console.error('Error fetching weather data:', weatherResponse.statusText);
                }

            } catch (error) {
                console.error('Error fetching weather data:', error);

            }

        }
        if (placeCoordinates) {
            getDestinationPlaceWeatherDetails()
        }
    }, [placeCoordinates])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='position-relative'>
            {weatherData && <Tooltip title='Weather Conditions'><Button aria-describedby={id} variant="text" size="small" className='p-0 ms-1' sx={{ backgroundColor: 'transparent !important', minWidth: '30px !important', position: 'absolute', top: '-10px' }} onClick={handleClick}>
                <img src={WeatherIcon} alt="Weather Icon" width="40" height="40" />
            </Button></Tooltip>}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div>
                    <Typography variant="h6" className='py-0 text-center py-2 px-4 bg-warning weather-place-title'>
                        {placeCoordinates?.title}
                    </Typography>
                    <List className='p-2 px-4'>
                        <ListItem className='py-0'>
                            <ListItemText className='weather-condition-list-item-text'>Condition: <span className='weather-condition-status ps-1'>{weatherData?.weather[0]?.description}</span>
                                <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} alt="Weather Icon" width="30" height="30" />
                            </ListItemText>
                        </ListItem>
                        <ListItem className='py-0'>
                            <ListItemText className='weather-condition-list-item-text'>Temperature: <span className='weather-condition-status ps-1'>{weatherData?.main?.temp} °C</span></ListItemText>
                        </ListItem>
                        <ListItem className='py-0'>
                            <ListItemText className='weather-condition-list-item-text'>Clouds: <span className='weather-condition-status ps-1'>{weatherData?.clouds?.all}%</span></ListItemText>
                        </ListItem>
                        <ListItem className='py-0'>
                            <ListItemText className='weather-condition-list-item-text'>Humidity: <span className='weather-condition-status ps-1'>{weatherData?.main?.humidity}%</span></ListItemText>
                        </ListItem>
                        <ListItem className='py-0'>
                            <ListItemText className='weather-condition-list-item-text'>Wind Direction: <span className='weather-condition-status ps-1'>{weatherData?.wind?.deg}°</span></ListItemText>

                        </ListItem>
                        <ListItem className='py-0'>
                            {/* <ListItemText primary={`Wind Speed:  ${weatherData?.wind?.speed}m/s`} /> */}
                            <ListItemText className='weather-condition-list-item-text'>Wind Speed: <span className='weather-condition-status ps-1'>{weatherData?.wind?.speed}m/s</span></ListItemText>

                        </ListItem>
                        <ListItem className='py-0'>
                            <ListItemText className='weather-condition-list-item-text'>Pressure: <span className='weather-condition-status ps-1'>{weatherData?.main?.pressure}hpa</span></ListItemText>

                        </ListItem>
                    </List>
                </div>
            </Popover>

        </div>
    );
}

export default WeatherReport



