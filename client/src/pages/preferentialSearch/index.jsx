import React, { useState, useContext, useRef } from 'react';
import './preferentialSearch.css'
import Slider from "react-slick";
import Box from '@mui/joy/Box';
// import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
// import bannerOne from '../../assets/banners/1.jpg'
// import bannerTwo from '../../assets/banners/2.jpg'
// import bannerThree from '../../assets/banners/3.jpg'
// import bannerFour from '../../assets/banners/4.jpg'
// import bannerFive from '../../assets/banners/5.jpg'
import bannerSix from '../../assets/banners/6.jpg'
import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/joy/Stack';
import SearchIcon from '@mui/icons-material/Search';
// import Card from '@mui/material/Card';
import { TripPayloadContext } from '../../context/TripDataContext';
import LoaderContext from '../../context/LoaderContext';
import { getTripDetailsApi } from '../../helpers/trip_helper';
// import circum_share from "../../assets/circum_share.svg";
import searchIocn from "../../assets/search-icon.svg";
// import { Button, Container } from '@mui/material';
import MapModal from '../../common/ItineraryMapModal';
import TripDataRadioGroup from '../homeSearch/TripDataRadioGroup';
import TripDatePicker from '../homeSearch/TripDatePicker';
import { cityNames, tripCity, comingWith, spendTime, food, tripTheme } from '../homeSearch/TripDataFile';
import dayjs from 'dayjs';
import { startDateInitialValue, endDateInitialValue } from '../../context/TripDataContext';
import Itinerary from '../../common/Itinerary'

// import TripDailyPlanningData from '../../TripDailyPlanningData';
// import NoTripDataAvailable from './NoTripDataAvailable';


const PreferentialSearch = () => {
    const slider = useRef(null);
    const loaderContext = useContext(LoaderContext);
    const { tripPayloadState, setTripPayloadState } = useContext(TripPayloadContext);
    const [tripData, setTripData] = useState(null);
    const [modelState, setModelState] = useState(false);
    const [coordinatesData, setCoordinates] = useState([])
    const [errors, setErrors] = useState({
        destination: null,
        date: null,
        trip_status_type: null,
        trip_theme_type: null
    })

    console.log(tripPayloadState, "tripPayloadData")

    const next = () => {
        if (currentSlide === 0) {
            if (tripPayloadState.destination) {
                slider.current.slickNext();
                setErrors({ ...errors, destination: '' })
            } else {
                setErrors({ ...errors, destination: 'Please Select Your Destination' })
            }
        }
        else if (currentSlide === 1) {
            if (tripPayloadState.start_date && tripPayloadState.end_date) {
                slider.current.slickNext();
                setErrors({ ...errors, date: '' })
            } else {
                setErrors({ ...errors, date: 'Please Select Your Trip Length' })
            }
        }
        else if (currentSlide === 2) {
            if (tripPayloadState.trip_status_type) {
                slider.current.slickNext();
                setErrors({ ...errors, trip_status_type: '' })
            } else {
                setErrors({ ...errors, trip_status_type: 'Please Select Your Trip Status Type' })
            }
        }

        else {
            slider.current.slickNext();

        }

        //console.log(slider.current, ' slider.current')
        //console.log(slider, " slider")
    };
    const previous = () => {
        slider.current.slickPrev();
    };
    const [currentSlide, setCurrentSlide] = useState(0);
    // console.log(currentSlide,'ffff')
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (current, next) => {
            setCurrentSlide(next)
            // console.log(current, 'current')
            // console.log(next, 'next')


        },

    };
    const totalSlides = slider.current ? slider.current.props.children.length : 0;


    const sliderImages = [bannerSix]
    // const sliderImages = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix]





    const handleChangeTripPayloadState = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'activities') {
            setTripPayloadState((prevState) => ({
                ...prevState,
                activities: checked
                    ? [...prevState.activities, value]
                    : prevState.activities.filter((n) => n !== value),
            }));
        } else {
            setTripPayloadState((prevState) => ({ ...prevState, [name]: value }));
        }
    }

    const handleChangeTripDestination = (name, value) => {
        //console.log(name, value)
        setTripPayloadState((prevState) => ({ ...prevState, [name]: value }));
    }


    function isKeyInArray(array, key) {
        return array.some(obj => obj.hasOwnProperty(key));
    }


    const onChangeModalState = (data) => {
        console.log("m", data);
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

        setCoordinates(locationData)
        setModelState(true)
    }

    const onCloseModal = () => {
        setModelState(false)
    }


    const handleSubmit = () => {
        if (tripPayloadState.trip_theme_type) {

            const formattedStartDate = dayjs(tripPayloadState.start_date).format('DD MMMM, YYYY');

            const formattedEndDate = dayjs(tripPayloadState.end_date).format('DD MMMM, YYYY');

            setErrors({ ...errors, trip_theme_type: '' })
            loaderContext.startLoading(true)

            getResult({
                ...tripPayloadState, start_date: formattedStartDate, end_date: formattedEndDate, "source": "Hyderabad"
            })

        } else {
            setErrors({ ...errors, trip_theme_type: 'Please Select Your Trip Theme Type' })
        }

    }

    const getResult = (payload = {

        "source": "Hyderabad",

        "destination": "Goa",

        "start_date": "30-10-2023",

        "end_date": "5-11-2023",

    }) => {

        try {
            // let checkIfInArray = (key, list) => list.some(obj => JSON.stringify(obj).indexOf(key) > -1);
            getTripDetailsApi(payload).then((r) => {
                console.log("ChatGPT Resp", r);
                loaderContext.startLoading(false)
                setTripPayloadState({
                    destination: '',
                    start_date: startDateInitialValue,
                    end_date: endDateInitialValue,
                    trip_status_type: 'Going solo',
                    activities: [],
                    transport: '',
                    food_type: '',
                    trip_theme_type: ''
                })
                // setTripData(r.data.hasOwnProperty('trip') ? r.data.trip : r.data)
                const p = r.data.hasOwnProperty('trip') ? r.data.trip : r.data;
                const fR = {}
                // const lastKey = Object.keys(p).pop();
                Object.keys(p).forEach(function (key) {
                    var value = p[key];
                    if (key === 'activities' || key === "places") {
                        fR['places_visited'] = value
                    } else {
                        fR[key] = value
                    }
                    //     // console.log(typeof (value));
                    //     // console.log(key + ':' + value);
                    //     if (typeof (value) == 'object') {
                    //         fR['places_visited'] = value
                    //     } else {
                    // fR[key] = value
                    //     }
                });
                setTripData(fR)
                setCurrentSlide(0)
                slider.current.slickGoTo(0)
            }).then((e) => {

            })

        } catch (error) {

        }

    }
    return (
        <div className='homeSearch'>
            <div className='position-relative'>
                <div className='banner'>
                    <ul className="cb-slideshow">
                        {sliderImages.map((each, index) => (
                            <li key={index}><span style={{ backgroundImage: `url(${each})` }}></span><div><h3></h3></div></li>
                        ))}
                    </ul>
                    {/* code here */}
                    <div className='main-code position-absolute top-0 w-100'>
                        <div className="container slidecontainer">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sliderSection">
                                        <Slider ref={slider} {...settings} currentSlide={currentSlide}>
                                            <div className='sliderBox sliderBoxOne'>
                                                <h3>Where do you want to go?</h3>
                                                <div className='citySearch'>
                                                    <Stack spacing={2}>
                                                        <Autocomplete
                                                            startDecorator={<SearchIcon />}
                                                            placeholder="Search for a city"
                                                            value={tripPayloadState.destination}
                                                            // width='400px'
                                                            name='destination'
                                                            onChange={(e, value) => handleChangeTripDestination('destination', value)}
                                                            options={cityNames}
                                                            style={{ height: '35px' }}
                                                        />
                                                    </Stack>
                                                </div>
                                                <div className='RadioGroupBox'>
                                                    <TripDataRadioGroup fieldName='destination' data={tripCity} />
                                                </div>
                                                {errors.destination && !tripPayloadState.destination ? <p className='errors trip-errors mx-auto mt-3'>{errors.destination}</p> : null}

                                            </div>
                                            <div className='sliderBox sliderBoxSix'>
                                                <h3> Select Your Trip Dates</h3>
                                                {/* <div style={{ height: '70px' }}>  </div> */}
                                                <div className='container dataBgColor'>
                                                    {/* Start Date */}
                                                    <div className='row'>
                                                        <div className="col-12 col-sm-12 col-lg-6 p -2">
                                                            <label style={{ marginBottom: '8px' }}>Start Date</label>
                                                            <TripDatePicker fieldName="start_date" />
                                                        </div>
                                                        {/* End Date */}
                                                        <div className="col-12 col-sm-12 col-lg-6 p-2">
                                                            <label style={{ marginBottom: '8px' }}>End Date</label>
                                                            <TripDatePicker fieldName="end_date" />
                                                        </div>
                                                    </div>

                                                </div>
                                                {errors.date && (!tripPayloadState.start_date || !tripPayloadState.end_date) ? <p className='errors trip-errors mx-auto'>{errors.date}</p> : null}
                                            </div>
                                            <div className='sliderBox sliderBoxTwo'>
                                                <h3> Who’s coming with you?</h3>
                                                {/* <div style={{ height: '70px' }}>  </div> */}
                                                <div className='dataBgColor'>
                                                    <div className=' RadioGroupBox'>
                                                        <TripDataRadioGroup fieldName='trip_status_type' data={comingWith} />
                                                    </div>
                                                </div>
                                                {errors.trip_status_type && !tripPayloadState.trip_status_type ? <p className='errors trip-errors mx-auto'>{errors.trip_status_type}</p> : null}
                                            </div>
                                            <div className='sliderBox sliderBoxThree'>
                                                <h3> How do you want to spend your time?</h3>
                                                {/* <div style={{ height: '70px' }}>  </div> */}
                                                <div className='dataBgColor'>
                                                    <Box
                                                        role="group"
                                                        aria-labelledby="fav-time"
                                                        style={{ backgroundColor: 'transport' }}
                                                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}
                                                    >
                                                        {spendTime.map((name) => {
                                                            const checked = tripPayloadState.activities?.includes(name.item);
                                                            return (
                                                                <Chip
                                                                    key={name.id}
                                                                    variant={checked ? "default" : "outlined"}
                                                                    color={checked ? 'select' : 'nonSelect'}
                                                                    className='ccccheckbox'

                                                                >
                                                                    <Checkbox
                                                                        variant="outlined"
                                                                        color={checked ? 'primary' : 'neutral'}
                                                                        disableIcon
                                                                        overlay
                                                                        label={name.item}
                                                                        name='activities'
                                                                        value={name.item}
                                                                        onChange={handleChangeTripPayloadState}
                                                                        checked={checked}
                                                                        style={{ fontSize: '12px', padding: '5px', color: '#fff' }}

                                                                    />
                                                                </Chip>
                                                            );
                                                        })}
                                                    </Box>

                                                </div>
                                            </div>
                                            <div className='sliderBox sliderBoxFour'>
                                                <h3>Choose your foods</h3>
                                                {/* <div style={{ height: '70px' }}>  </div> */}
                                                <div className='dataBgColor'>
                                                    <div className='RadioGroupBox'>

                                                        <TripDataRadioGroup fieldName='food_type' data={food} />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='sliderBox sliderBoxFive'>
                                                <h3>Select your Trip Theme</h3>
                                                {/* <div style={{ height: '70px' }}>  </div> */}
                                                <div className='dataBgColor'>
                                                    <div className='RadioGroupBox'>

                                                        <TripDataRadioGroup fieldName='trip_theme_type' data={tripTheme} />

                                                    </div>
                                                </div>
                                                {errors.trip_theme_type && !tripPayloadState.trip_theme_type ? <p className='errors trip-errors mx-auto'>{errors.trip_theme_type}</p> : null}

                                            </div>

                                        </Slider>
                                        <div className='slickArrows' >
                                            {currentSlide !== 0 && <button className="button pre-button mx-2" onClick={previous} >
                                                Previous
                                            </button>}
                                            {currentSlide !== totalSlides - 1 && <button className="button mx-2" onClick={next} >
                                                Next
                                            </button>}
                                            {currentSlide === totalSlides - 1 && <button className="button mx-2" onClick={handleSubmit}>
                                                Submit
                                            </button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px' }}>
                {/* && (isKeyInArray(tripData.places, 'description') || isKeyInArray(tripData.places_visited, 'activity')) */}
                {
                    tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 && (isKeyInArray(tripData?.places_visited, 'description')) ?

                        <Itinerary tripData={tripData} />
                        : tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 && <div>
                            <div className='search_info'>

                                <img src={searchIocn} alt='logo' />

                                <h5>No Trip Data available <br />

                                    Please check for other popular locations.</h5>

                            </div>

                        </div>

                }
                {
                    tripData === null &&

                    <div>
                        <div className='search_info'>

                            <img src={searchIocn} alt='logo' />

                            <h5>Click the Top Button start your <br />

                                vacation planning.</h5>

                        </div>

                    </div>
                }
            </div>
        </div >
    );
};

export default PreferentialSearch;