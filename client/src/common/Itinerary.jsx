import React, { useState } from 'react';
// import Header from './Header'
import './Itinerary.css'
import { Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
// import dayjs from 'dayjs';
import ItineraryMapModal from './ItineraryMapModal';
// import circum_share from "../assets/circum_share.svg";
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import foodIcon from "../assets/food_icon.svg";
import activitiesIcon from "../assets/activities_icon.svg";
import accommodationIcon from "../assets/accommodation_icon.svg";
import locationIcon from "../assets/location_icon.svg";
import transportation_icon from "../assets/transportation_icon.svg";
// import PlaceIcon from '@mui/icons-material/Place';
// import { green, red } from '@mui/material/colors';
import ItineraryInformationCard from './ItineraryInformationCard';
import WeatherReport from './WeatherReport';


const Itinerary = ({ tripData, cardBackGroundColor = '#fff', tripTitle }) => {
    const [modelState, setModelState] = useState(false);
    const [coordinatesData, setCoordinates] = useState([])
    console.log("tripData==>", tripData)

    const onCloseModal = () => {
        setModelState(false)
    }
    const getEachTransportType = (data, transport_type) => {
        const TrnsportTypeDataKeys = Object.keys(data[transport_type]);
        let isFromAvailable = false;
        let FromKey = 'from';
        let ToKey = 'to'
        TrnsportTypeDataKeys.forEach((eachKey) => {
            if (eachKey.toLocaleLowerCase().includes('from')) {
                isFromAvailable = true;
                FromKey = eachKey;
            } else {
                if (eachKey.toLocaleLowerCase().includes('to')) {
                    ToKey = eachKey
                }
            }
        })
        const TrnsportTypeDataKeysLength = TrnsportTypeDataKeys.length
        // console.log(TrnsportTypeDataKeys, 'TrnsportTypeDataKeys', transport_type, TrnsportTypeDataKeysLength)
        return <>
            {TrnsportTypeDataKeysLength > 0 && !isFromAvailable &&
                <Chip key={transport_type} label={`${transport_type[0].toUpperCase() + transport_type.slice(1)}: ${TrnsportTypeDataKeysLength === 1 ? data[transport_type][TrnsportTypeDataKeys[0]] : data[transport_type]['price']}`} />
            }
            {TrnsportTypeDataKeysLength > 0 && isFromAvailable &&
                <Card key={transport_type} className='shadow-sm me-1' sx={{ maxWidth: 345, borderRadius: '4px', boxShadow: 'none', border: '1px solid #ccc', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                    <CardContent className='p-2'>
                        <Typography variant="h6" component="h6" className='mb-1 fw-bold' style={{ color: '#000', fontSize: '15px' }}>
                            {`${transport_type[0].toUpperCase() + transport_type.slice(1)}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                            <span className='fw-bold'>From: </span>{data[transport_type][FromKey]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                            <span className='fw-bold'>To: </span>{data[transport_type][ToKey]}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                            <span className='fw-bold'>Price: </span>{data[transport_type]['price']}
                        </Typography>
                    </CardContent>
                </Card>
            }
        </>
    }
    return (
        <>
            <div>
                <Container>
                    <h2 className='mb-3 fs-4'>Your Plan Details{tripTitle ? ` - ${tripTitle}` : ''}</h2>

                </Container>
            </div>
            <div>
                <Container>
                    <Card className='tripDetails-grid' sx={{ padding: '20px', borderRadius: '25px', backgroundColor: `${cardBackGroundColor} !important` }}>
                        <ul>
                            {
                                tripData && tripData?.places_visited && tripData.places_visited.length &&
                                tripData?.places_visited.map((m, i) => {
                                    return <li className='tripDetails-item' key={i}>
                                        <div className="dot">
                                            <div className="center"></div>
                                            <div className="ring"></div>
                                        </div>
                                        <div className='recommended-stay'>
                                            {/* <Button className='' onClick={(e) => onChangeModalState(m)}>View Map   <img src={circum_share} style={{ marginLeft: '8px' }} alt='logo' />
</Button> */}
                                            {m?.recommended_stay ? <Chip color="success" variant='outlined' label={`Recommended Stay: ${m.recommended_stay}`} /> : null}
                                        </div>
                                        <div className='d-flex'> <h5>{m?.name?.includes(`Day ${i + 1}`) ? m.name : `Day ${i + 1} -  ${m.name}`}</h5><WeatherReport placeCoordinates={m?.coordinates} date={m?.date} /></div>
                                        <h6>{m?.date}</h6>
                                        <p className='mt-2 mb-0 pb-0'>
                                            {m?.description}
                                        </p>
                                        <div className='container'>
                                            <div className='row'>
                                                <div className='col-12 col-xl-7 ps-0'  >
                                                    <div className=''>
                                                        <h3 className='moreInfoHeading mt-4 mb-3'>More information</h3>
                                                        <div className='mb-4'>
                                                            {
                                                                m?.activity && m?.activity.length > 0 ? <>
                                                                    <h6 className='my-2 mb-4 trip-hotel-title'>
                                                                        <img src={activitiesIcon} className='me-2' alt='activitiesIcon' /> Activities
                                                                    </h6>
                                                                    <ul className="d-flex flex-wrap p-0 gap-1">
                                                                        {
                                                                            m?.activity?.map((sm, si) => {
                                                                                if (typeof (sm) === 'object') {
                                                                                    return <Chip key={si} label={sm.name} />
                                                                                } else {
                                                                                    return <Chip key={si} label={sm} />
                                                                                }
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </> : null
                                                            }
                                                        </div>
                                                        <div className='mb-4'>
                                                            {
                                                                m?.popular_places && m?.popular_places.length > 0 ? <>
                                                                    <h6 className='my-2 mb-4 trip-hotel-title'>
                                                                        <img src={locationIcon} className='me-2' alt='locationIcon' />  Popular Places
                                                                    </h6>
                                                                    {/* <ul className="d-flex flex-wrap p-0 gap-1">
                                                                        {
                                                                            m?.popular_places?.map((ppl, si) => {
                                                                                if (typeof (ppl) === 'object') {
                                                                                    console.log(typeof (ppl), "types")
                                                                                    return < Chip key={si} label={`${ppl.name}`
                                                                                    } />
                                                                                }
                                                                                return <Chip key={si} label={`${ppl}`} />
                                                                            })
                                                                        }
                                                                    </ul> */}
                                                                    {/* {
                                                                        m?.popular_places?.map((ppl, si) => <ProductSlider placedata={ppl} />)
                                                                    } */}

                                                                    {m?.popular_places?.map((eachPlace) => {
                                                                        if (typeof (eachPlace) === 'object') {
                                                                            // console.log(typeof (eachPlace), "types")
                                                                            return <ItineraryInformationCard placedata={eachPlace} popularPlace={eachPlace?.name} priceKey="fee" />
                                                                        }
                                                                        return <ItineraryInformationCard placedata={eachPlace} popularPlace={eachPlace} />

                                                                    })}

                                                                </> : null
                                                            }
                                                        </div>
                                                        <div className='mb-4'>
                                                            {m?.accommodation && m?.accommodation.length > 0 ? <>
                                                                <h6 className='my-2 mb-4 trip-hotel-title'>  <img src={accommodationIcon} className='me-2' alt='accommodationIcon' /> Accommodations
                                                                    {/* <Button className='trip-map-view-btns' variant='outlined' size='small' onClick={(e) => onChangeModalState(m)}>View In Map{" "}<PlaceIcon sx={{ fontSize: '15px' }} /></Button>*/}
                                                                </h6>
                                                                <div>
                                                                </div>
                                                                {m?.accommodation?.map((eachHotel) => <ItineraryInformationCard placedata={eachHotel} pricePerNight={eachHotel?.price_per_night} accommodationDetails={eachHotel} priceKey="price_per_night" />)}

                                                                {/* <ul className="d-flex flex-wrap p-0 gap-2">
                                                                    {m?.accommodation.map((sm, si) => {
                                                                        return (
                                                                            <li className='loopCard '>
                                                                                <Card key={si} className='card shadow-sm'>
                                                                                    <CardContent className='p-2'>
                                                                                        <Typography variant="h6" component="h6" className='mb-1 fw-bold fs-6 text-dark'>
                                                                                            {sm.name}
                                                                                        </Typography>
                                                                                        <Typography variant="div" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                                                            <span className='fw-bold'>Address:</span> {sm.address}
                                                                                        </Typography>
                                                                                        <Typography variant="p" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                                                            <span className='fw-bold'>Price Per Night:</span> {sm.price_per_night}
                                                                                        </Typography>
                                                                                    </CardContent>
                                                                                </Card>
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul> */}
                                                            </> : null}
                                                        </div>
                                                        <div className='mb-4'>
                                                            {m?.food_choices && m?.food_choices.length > 0 ? <>
                                                                <h6 className='my-2 mb-4 trip-hotel-title'>  <img src={foodIcon} className='me-2' alt='foodIcon' />  Must try Food
                                                                    {/* <Button className='trip-map-view-btns' variant='outlined' size='small' onClick={(e) => onChangeRecommendedModalState(m.food_choices)}>View In Map{" "}<PlaceIcon sx={{ fontSize: '15px' }} /></Button> */}
                                                                </h6>
                                                                <ul className="d-flex flex-wrap p-0 gap-2">
                                                                    {m.food_choices.map((sm, si) => {
                                                                        return <li className='loopCard' key={`${sm}-${si}`}>
                                                                            <Card key={sm} className='card shadow-sm'>
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
                                                                            </Card></li>
                                                                    })}
                                                                </ul>
                                                            </> : null}
                                                        </div>
                                                        <div className='mb-4'>
                                                            {m?.transportation && (Object.keys(m?.transportation).length > 0) && ((m?.transportation?.flight && Object.keys(m.transportation?.flight).length > 0) || (m?.transportation?.train && Object.keys(m.transportation?.train).length > 0) || (m?.transportation?.bus && Object.keys(m.transportation?.bus).length > 0)) ? <>
                                                                <h6 className='my-2 mb-4 trip-hotel-title'> <img src={transportation_icon} className='me-2' alt='transportation_icon' />  Transportation</h6>
                                                                <ul className="d-flex flex-wrap p-0 gap-1">
                                                                    {
                                                                        Object.keys(m?.transportation).map((transport_type) => {
                                                                            return getEachTransportType(m.transportation, transport_type)
                                                                        })
                                                                    }

                                                                </ul>
                                                            </> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-xl-5 position-relative'>
                                                    <ItineraryMapModal data={m} open={modelState} MapCoordinates={coordinatesData} onCloseModal={onCloseModal} />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </Card>
                </Container>
            </div>
        </>
    );
};
export default Itinerary;