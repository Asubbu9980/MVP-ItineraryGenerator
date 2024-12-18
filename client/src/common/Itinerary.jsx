import React, { useState, useEffect } from 'react';
// import Header from './Header'
import './Itinerary.css'
// import { Button, Container } from '@mui/material';
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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import html2pdf from 'html2pdf.js';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Itinerary = ({ tripData, cardBackGroundColor = '#fff', tripTitle }) => {
    const [modelState, setModelState] = useState(false);
    const [coordinatesData, setCoordinates] = useState([])
    const [mapData, setMapdata] = useState(null)
    const componentRef = useRef();
    const [expanded, setExpanded] = useState('panel-0');
    const [timeoutId, setTimeoutId] = useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    const [mapInfoWindow, setMapInfoWindow] = useState(null)

    useEffect(() => {
        if (tripData && tripData?.places_visited && tripData.places_visited.length > 0) {
            setMapdata(tripData?.places_visited[0])
        }
    }, [tripData])


    useEffect(() => {
        // Clear the timeout if the component unmounts or if the effect is re-executed
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
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
        const randomKey = Math.random() * 1000;
        return <>
            {TrnsportTypeDataKeysLength > 0 && !isFromAvailable &&
                <>
                    {TrnsportTypeDataKeysLength === 1 ? isNaN(parseFloat(data[transport_type][TrnsportTypeDataKeys[0]])) ? (

                        <Chip key={`${transport_type}-${randomKey}`} label={`${transport_type[0].toUpperCase() + transport_type.slice(1)}: ${data[transport_type][TrnsportTypeDataKeys[0]]}`} />

                    ) : (
                        <Chip key={`${transport_type}-${randomKey}`} label={`${transport_type[0].toUpperCase() + transport_type.slice(1)}: ₹${data[transport_type][TrnsportTypeDataKeys[0]]}`} />

                    ) : isNaN(parseFloat(data[transport_type]['price'])) ? (
                        <Chip key={`${transport_type}-${randomKey}`} label={`${transport_type[0].toUpperCase() + transport_type.slice(1)}: ${data[transport_type]['price']}`} />
                    ) : (
                        <Chip key={`${transport_type}-${randomKey}`} label={`${transport_type[0].toUpperCase() + transport_type.slice(1)}: ₹${data[transport_type]['price']}`} />
                    )}
                    {/* <Chip key={transport_type} label={`${transport_type[0].toUpperCase() + transport_type.slice(1)}: ${TrnsportTypeDataKeysLength === 1 ? `₹${data[transport_type][TrnsportTypeDataKeys[0]]}` : `₹${data[transport_type]['price']}`}`} /> */}

                </>
            }
            {TrnsportTypeDataKeysLength > 0 && isFromAvailable &&
                <Card key={`${transport_type}-${randomKey}`} className='shadow-sm me-1' sx={{ maxWidth: 345, borderRadius: '4px', boxShadow: 'none', border: '1px solid #ccc', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
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
                            <span className='fw-bold'>Price: </span>
                            {' '}
                            {isNaN(parseFloat(data[transport_type]['price'])) ? (

                                <span>{data[transport_type]['price']}</span>
                            ) : (

                                <span>&#8377; {data[transport_type]['price']}</span>
                            )}
                        </Typography>
                    </CardContent>
                </Card>
            }
        </>
    }

    const onChangeMapData = (data) => {
        setMapdata(data)
    }
    const onChangeMapInfoWindow = (coordinates = { lat: '', lng: '' }, title = '') => {
        setMapInfoWindow({ ...coordinates, title })
    }

    const handleDownloadPdf = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Trip-Plan",
        onAfterPrint: () => setExpanded('panel-0'),
    });

    const handlePrint = () => {
        setExpanded('');

        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timeout
        const newTimeoutId = setTimeout(() => {
            handleDownloadPdf();
        }, 1000);

        // Store the new timeout ID
        setTimeoutId(newTimeoutId);
    };

    const getTheDayTitle = (title, day, description, isDayIncludes) => {
        // let dayTitle = title.split('-')[1];
        if (isDayIncludes) {
            const replaced_day_text = title.replace(day, '');
            if (replaced_day_text.length > 1) {
                return title
            } else {
                const dotIndex = description.indexOf('.');
                if (dotIndex !== -1) {
                    return `${day} - ${description.slice(0, dotIndex + 1)}`
                } else {
                    return `${day} - ${description}`

                }
            }
            // return dayTitle.trim();
        } else {
            if (title.length > 1) {
                return title
            }
            else {
                const dotIndex = description.indexOf('.');
                if (dotIndex !== -1) {
                    return description.slice(0, dotIndex + 1)
                } else {
                    return description

                }
            }
        }
        // return title;

    }

    const handleEventStop =(e)=>{
        e.stopPropagation()
    }
    // const handleDownloadPDF = () => {
    //     const element = document.getElementById('pdf-content');


    //     element.classList.add('pdf-content-class');
    //     html2pdf(element);
    //     setTimeout(() => {
    //         // console.log(element, "element")
    //         element.classList.remove('pdf-content-class');
    //     }, 1000);
    // };
    return (
        <div >
            <div className='container-fluid px-3' >
                {/* <Container> */}
                <div className='trp-title d-flex align-items-center justify-content-between my-3'>
                    <h3 className='itinery-trip-title-class'>Your Plan Details{tripTitle ? ` - ${tripTitle}` : ''} </h3>
                    <button className='btn btn-outline-primary downlaod-btn mb-2 me-1 py-0 px-1 px-md-2' onClick={() => handlePrint()}><FileDownloadOutlinedIcon />{" "}Download</button>
                </div>
                {/* </Container> */}
            </div>
            <div className='container-fluid ps-3'>
                {/* <Container> */}
                <div className='row g-0'>
                    <div className='col-12 col-xl-7' ref={componentRef}>
                        <h3 className='mb-2 itinery-trip-title-print-class'>Your Plan Details{tripTitle ? ` - ${tripTitle}` : ''} </h3>
                        <Card id='pdf-content' className='tripDetails-grid itinerary-Card-class' sx={{ padding: '20px', borderRadius: '25px', backgroundColor: `${cardBackGroundColor} !important` }}>
                            <ul>
                                {
                                    tripData && tripData?.places_visited && tripData.places_visited.length &&
                                    tripData?.places_visited.map((m, i) => {
                                        return <li className='tripDetails-item' key={i}>
                                            <div className="dot">
                                                <div className="center"></div>
                                                <div className="ring"></div>
                                            </div>
                                            <Accordion
                                                // // sx={{
                                                // //   '&:hover': { backgroundColor: '#018AD3', color: '#FFF' }
                                                // // }}
                                                className='tripDetails-day-accordion'
                                                onMouseOver={() => onChangeMapData(m)}
                                                expanded={expanded !== '' ? expanded === `panel-${i}` : true} onChange={handleChange(`panel-${i}`)}
                                            // defaultExpanded={true}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={`${m?.date}-content`}
                                                    id={`${m?.date}-header`}
                                                    className='tripDetails-day-accordion-summary'
                                                    defaultExpanded={true}
                                                >
                                                    <div className='d-flex'> <h5 >{m?.name?.includes(`Day ${i + 1}`) ? getTheDayTitle(m.name, `Day ${i + 1}`, m?.description, true) : `Day ${i + 1} -  ${getTheDayTitle(m.name, `Day ${i + 1}`, m?.description, false)}`}</h5><WeatherReport placeCoordinates={m?.coordinates} date={m?.date} handleEventStop={handleEventStop} /></div>

                                                </AccordionSummary>
                                                <AccordionDetails >
                                                    <div className='recommended-stay'>
                                                        {/* <Button className='' onClick={(e) => onChangeModalState(m)}>View Map   <img src={circum_share} style={{ marginLeft: '8px' }} alt='logo' />
</Button> */}
                                                        {m?.recommended_stay ? <Chip color="success" className='text-center' variant='outlined' label={`Recommended Stay: ${m.recommended_stay}`} /> : null}
                                                    </div>
                                                    {/* <div className='d-flex'> <h5>{m?.name?.includes(`Day ${i + 1}`) ? m.name : `Day ${i + 1} -  ${m.name}`}</h5><WeatherReport placeCoordinates={m?.coordinates} date={m?.date} /></div> */}
                                                    <h6>{m?.date}</h6>
                                                    {m?.recommended_stay ? <Chip color="success" variant='outlined' size="small" label={`Recommended Stay: ${m?.recommended_stay}`} className='mobile-recommended-stay text-center' /> : null}
                                                    <p className='mt-2 mb-0 pb-0'>
                                                        {m?.description}
                                                    </p>
                                                    <h3 className='moreInfoHeading my-3'>More information</h3>
                                                    <div className='container ms-0'>
                                                        <div className='row'>
                                                            <div className='col-12 ps-0'  >
                                                                <div className=''>

                                                                    {
                                                                        m?.activity && m?.activity.length > 0 ? <div className='mb-4'>
                                                                            <h6 className='my-1 mb-4 trip-hotel-title'>
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
                                                                        </div> : null
                                                                    }

                                                                    <div className='mb-4'>
                                                                        {
                                                                            m?.popular_places && m?.popular_places.length > 0 ? <>
                                                                                <h6 className='my-1 mb-4 trip-hotel-title'>
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
                                                                                        return <ItineraryInformationCard placedata={eachPlace} popularPlace={eachPlace?.name} priceKey="fee" onChangeMapInfoWindow={onChangeMapInfoWindow} />
                                                                                    }
                                                                                    return <ItineraryInformationCard placedata={eachPlace} popularPlace={eachPlace} />

                                                                                })}

                                                                            </> : null
                                                                        }
                                                                    </div>
                                                                    <div className='mb-4'>
                                                                        {m?.accommodation && m?.accommodation.length > 0 ? <>
                                                                            <h6 className='my-1 mb-4 trip-hotel-title'>  <img src={accommodationIcon} className='me-2' alt='accommodationIcon' /> Accommodations
                                                                                {/* <Button className='trip-map-view-btns' variant='outlined' size='small' onClick={(e) => onChangeModalState(m)}>View In Map{" "}<PlaceIcon sx={{ fontSize: '15px' }} /></Button>*/}
                                                                            </h6>
                                                                            <div>
                                                                            </div>
                                                                            {m?.accommodation?.map((eachHotel) => <ItineraryInformationCard placedata={eachHotel} pricePerNight={eachHotel?.price_per_night} accommodationDetails={eachHotel} priceKey="price_per_night" onChangeMapInfoWindow={onChangeMapInfoWindow} />)}

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
                                                                            <h6 className='my-1 mb-4 trip-hotel-title'>  <img src={foodIcon} className='me-2' alt='foodIcon' />  Must try Food/Restaurant
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
                                                                                                    <span className='fw-bold'>Price:</span>{' '}
                                                                                                    {isNaN(parseFloat(sm?.price)) ? (

                                                                                                        <span>{sm?.price}</span>
                                                                                                    ) : (

                                                                                                        <span>&#8377; {sm?.price}</span>
                                                                                                    )}
                                                                                                </Typography>
                                                                                            </CardContent>
                                                                                        </Card></li>
                                                                                })}
                                                                            </ul>
                                                                        </> : null}
                                                                    </div>
                                                                    <div className='mb-4'>
                                                                        {m?.transportation && (Object.keys(m?.transportation).length > 0) && ((m?.transportation?.flight && Object.keys(m.transportation?.flight).length > 0) || (m?.transportation?.train && Object.keys(m.transportation?.train).length > 0) || (m?.transportation?.bus && Object.keys(m.transportation?.bus).length > 0)) ? <>
                                                                            <h6 className='my-1 mb-4 trip-hotel-title'> <img src={transportation_icon} className='me-2' alt='transportation_icon' />  Transportation</h6>
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
                                                            <div className='col-12 itinerary-map-mobile-main-container position-relative '>
                                                                <ItineraryMapModal data={m} open={modelState} MapCoordinates={coordinatesData} onCloseModal={onCloseModal} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </AccordionDetails>
                                            </Accordion>
                                        </li>
                                    })
                                }
                            </ul>
                        </Card>

                    </div>
                    <div className='col-12 col-xl-5 itinerary-map-main-container position-sticky'>
                        {tripData && tripData?.places_visited && tripData.places_visited.length &&
                            <ItineraryMapModal data={mapData} open={modelState} MapCoordinates={coordinatesData} onCloseModal={onCloseModal} mapInfoWindow={mapInfoWindow} />
                        }
                    </div>
                </div>
                {/* </Container> */}
            </div>
        </div>
    );
};
export default Itinerary;