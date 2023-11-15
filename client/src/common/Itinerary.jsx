import React, { useState, useContext } from 'react';
// import Header from './Header'
import './Itinerary.css'
import { TextField, Button, Container, Grid, Box } from '@mui/material';

import Card from '@mui/material/Card';

import dayjs from 'dayjs';
import ItineraryMapModal from './ItineraryMapModal';
import circum_share from "../assets/circum_share.svg";
import Chip from '@mui/material/Chip';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import foodIcon from "../assets/food_icon.svg";
import activitiesIcon from "../assets/activities_icon.svg";
import activityIcon from "../assets/activity_icon.svg";
import calendarIcon from "../assets/calendar_icon.svg";
import accommodationIcon from "../assets/accommodation_icon.svg";
import locationIcon from "../assets/location_icon.svg";
import transportation_icon from "../assets/transportation_icon.svg";
import PlaceIcon from '@mui/icons-material/Place';


const Itinerary = ({ tripData }) => {
    const [modelState, setModelState] = useState(false);
    const [coordinatesData, setCoordinates] = useState([])
    const onChangeModalState = (data) => {
        if (data != null) {
            const mainCoordinateLat = data.coordinates.lat.replace("° N", "");
            const mainCoordinateLng = data.coordinates.lng.replace("° E", "");
            // console.log("mainCoordinate", mainCoordinateLat);
            const locationData = [];
            locationData.push(
                {
                    "title": data.coordinates.title,
                    "lat": parseFloat(mainCoordinateLat),
                    "lng": parseFloat(mainCoordinateLng)
                },
            )
            if (data?.accommodation && data?.accommodation.length > 0) {
                data?.accommodation.forEach(element => {
                    locationData.push({
                        "title": element.coordinates.title,
                        "lat": parseFloat(element.coordinates.lat),
                        "lng": parseFloat(element.coordinates.lng)
                    })
                });
            }
            if (data?.food_choices && data?.food_choices.length > 0) {
                data?.food_choices.forEach(element => {
                    locationData.push({
                        "title": element.coordinates.title,
                        "lat": parseFloat(element.coordinates.lat),
                        "lng": parseFloat(element.coordinates.lng)
                    })
                });
            }
            if (locationData.length > 0) {
                setCoordinates(locationData)
                setModelState(true)
            }
        }
    }


    const onChangeRecommendedModalState = (data) => {
        const locationData = [];
        if (data.length > 0) {
            data?.forEach(element => {
                locationData.push({
                    "title": element.coordinates.title,
                    "lat": parseFloat(element.coordinates.lat),
                    "lng": parseFloat(element.coordinates.lng)
                })
            });
        }

        if (locationData.length > 0) {
            setCoordinates(locationData)
            setModelState(true)
        }

    }

    const onCloseModal = () => {
        setModelState(false)
    }

    return (
        <>
            <div>
                <Container>
                    <h2 style={{ marginBottom: '32px' }}>Your Plan Details</h2>
                </Container>

            </div>
            <div>
                <Container>
                    <Card className='tripDetails-grid' style={{ padding: '20px', borderRadius: '25px' }}>

                        <ul>
                            {
                                tripData.places_visited.map((m, i) => {
                                    return <li className='tripDetails-item' key={i}>

                                        <div className="dot">

                                            <div className="center"></div>

                                            <div className="ring"></div>

                                        </div>


                                        <div className='viewmap_btn'>
                                            <Button className='' onClick={(e) => onChangeModalState(m)}>View Map   <img src={circum_share} style={{ marginLeft: '8px' }} alt='logo' />

                                            </Button>

                                        </div>

                                        <h5>{m.name?.includes(`Day ${i + 1}`) ? m.name : `Day ${i + 1} -  ${m.name}`}</h5>

                                        <h6>{m.date}</h6>
                                        <p className='mt-2 mb-0 pb-0'>
                                            {m.description}

                                        </p>
                                        <div className=''>
                                            <h3 className='moreInfoHeading mt-4 mb-3'>More information</h3>
                                            <div className='mb-4'>
                                                {
                                                    m.activity && m.activity.length > 0 ? <>
                                                        <h6 className='my-2 mb-4 trip-hotel-title'>
                                                            <img src={activitiesIcon} style={{ marginRight: '8px' }} alt='activitiesIcon' /> Activities
                                                        </h6>
                                                        <ul className="d-flex flex-wrap p-0 gap-1">
                                                            {
                                                                m.activity?.map((sm, si) => {
                                                                    return <Chip key={si} label={sm} />
                                                                })
                                                            }
                                                        </ul>
                                                    </> : null
                                                }
                                            </div>
                                            <div className='mb-4'>

                                                {
                                                    m.popular_places && m.popular_places.length > 0 ? <>
                                                        <h6 className='my-2 mb-4 trip-hotel-title'>
                                                            <img src={locationIcon} style={{ marginRight: '8px' }} alt='locationIcon' />  Popular Places
                                                        </h6>
                                                        <ul className="d-flex flex-wrap p-0 gap-1">
                                                            {
                                                                m.popular_places?.map((sm, si) => {
                                                                    return <Chip key={si} label={sm} />
                                                                })
                                                            }
                                                        </ul>
                                                    </> : null
                                                }
                                            </div>
                                            <div className='mb-4'>
                                                {m.accommodation && m.accommodation.length > 0 ? <>
                                                    <h6 className='my-2 mb-4 trip-hotel-title'>  <img src={accommodationIcon} style={{ marginRight: '8px' }} alt='accommodationIcon' /> Accommodations <Button className='trip-map-view-btns' variant='outlined' size='small' onClick={(e) => onChangeRecommendedModalState(m.accommodation)}>View In Map{" "}<PlaceIcon sx={{ fontSize: '15px' }} /></Button></h6>
                                                    <ul className="d-flex flex-wrap p-0 gap-2">
                                                        {m.accommodation.map((sm, si) => {
                                                            return (
                                                                <Card key={si} className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                                                    <CardContent className='p-2'>
                                                                        <Typography variant="h6" component="h6" className='mb-1 fw-bold' style={{ color: '#000', fontSize: '15px' }}>
                                                                            {sm.name}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                                            <span className='fw-bold'>Address:</span> {sm.address}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                                            <span className='fw-bold'>Price Per Night:</span> {sm.price_per_night}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            )
                                                        })}
                                                    </ul>
                                                </> : null}
                                            </div>
                                            <div className='mb-4'>
                                                {m.food_choices && m.food_choices.length > 0 ? <>
                                                    <h6 className='my-2 mb-4 trip-hotel-title'>  <img src={foodIcon} style={{ marginRight: '8px' }} alt='foodIcon' />  Must try Food <Button className='trip-map-view-btns' variant='outlined' size='small' onClick={(e) => onChangeRecommendedModalState(m.food_choices)}>View In Map{" "}<PlaceIcon sx={{ fontSize: '15px' }} /></Button></h6>
                                                    <ul className="d-flex flex-wrap p-0 gap-2">
                                                        {m.food_choices.map((sm, si) => {
                                                            return <Card key={sm} className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', boxShadow: 'none', border: '1px solid #ccc', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                                                <CardContent className='p-2'>
                                                                    <Typography variant="h6" component="h6" className='mb-1 fw-bold' style={{ color: '#000', fontSize: '15px' }}>
                                                                        {sm.name}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                                        <span className='fw-bold'>Address: </span>{sm.address}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                                        <span className='fw-bold'>Price: </span>{sm.price}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        })}
                                                    </ul>
                                                </> : null}
                                            </div>
                                            <div className='mb-4'>
                                                {m.transportation && (Object.keys(m.transportation.flight).length > 0 || Object.keys(m.transportation.train).length > 0 || Object.keys(m.transportation.bus).length > 0) ? <>
                                                    <h6 className='my-2 mb-4 trip-hotel-title'> <img src={transportation_icon} style={{ marginRight: '8px' }} alt='transportation_icon' />  Transportation</h6>
                                                    <ul className="d-flex flex-wrap p-0 gap-1">
                                                        {Object.keys(m.transportation.flight).length > 0 &&
                                                            <Chip label={`Flight: ${m.transportation.flight['price']}`} />}
                                                        {Object.keys(m.transportation.train).length > 0 &&
                                                            <Chip label={`Train: ${m.transportation.train['price']}`} />}
                                                        {Object.keys(m.transportation.bus).length > 0 &&
                                                            <Chip label={`Bus: ${m.transportation.bus['price']}`} />}
                                                    </ul>
                                                </> : null}
                                            </div>
                                        </div>
                                    </li>

                                })

                            }

                        </ul>

                    </Card>

                </Container>
                {coordinatesData.length > 0 && <ItineraryMapModal open={modelState} MapCoordinates={coordinatesData} onCloseModal={onCloseModal} />}
            </div>
        </>
    );
};

export default Itinerary;