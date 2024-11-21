import React, { useState, useContext, useEffect } from 'react';
// import Header from './Header'
// import '../home/home.css'
import { TextField, Button, Container, Grid, Box, InputAdornment } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Tripdata from './Tripdata.json';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import LoaderContext from '../../context/LoaderContext';
import { getTripDetailsApi, getTripDetailsByVoiceApi } from '../../helpers/trip_helper';
import searchIocn from "../../assets/search-icon.svg";
import TransportModes from './TransportModes';
import { startDateInitialValue, endDateInitialValue } from '../../context/TripDataContext';
import MicIcon from '@mui/icons-material/Mic';
import Itinerary from '../../common/Itinerary'
import Searchhistory from '../../common/Searchhistory';
// import AccordionData from '../../common/AccordionData';
import { useAuth0 } from '@auth0/auth0-react';
// import Skeleton from '@mui/material/Skeleton';
import ItinerarySkeleton from '../../common/ItinerarySkeleton';
import { Search, Mic } from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import SpeechRecognitionModal from '../../common/SpeechRecognitionModal';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom'
// import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationImage from "../../assets/location.png";
import TravelType from "../../assets/travel-type.png";
import { DateRange } from "react-date-range";
import calenderIcon from '../../assets/calendar.png'
import moment from "moment";
import { enUS } from "date-fns/locale";

const famousTouristCitiesInIndia = [
    "Agra",
    "Varanasi",
    "Kerala",
    "Goa",
    'Hyderabad',
    'Delhi',
    "Chennai",
    "Hampi",
    "Rishikesh",
    "Khajuraho",
    "Mysore",
    "Srinagar",
    "Aurangabad",
    "Udaipur",
    "Darjeeling",
    "Bhuj",
    "Mumbai",
    "Leh",
    "Kolkata",
    "Jaipur",
    "Bangalore",
    "Pondicherry",
    "Himalayas",
    "Amritsar",
    "Jaisalmer",
    "Gangtok",
    "Shimla",
    "Manali",
    "Kochi",
    "Jodhpur",
    "Madurai",
    "Pushkar",
    "Pune",
    "Gokarna",
    "Rajasthan",
    "Gujarat",
    "Maharashtra",
    "Tamil Nadu",
    "Karnataka",
    "Telangana",
    "Andhra Pradesh",
    "Kashmir",
    "Haryana",
    "Uttarakhand",
    "Himachal Pradesh",
    "West Bengal",
    "Punjab",
    "Sikkim",
    "Uttar Pradesh",
    "Madhya Pradesh",
];
const destinationList = famousTouristCitiesInIndia.filter((city) => city !== 'Hyderabad');

const TravelTypes = ["All", "Car", "Bus", "Train", "Flight"]

const IndexPage = () => {
    // const staticTripD = { "trip_start_date": "16 November, 2023", "trip_end_date": "21 November, 2023", "trip_duration": "6 days", "starting_location": "Goa", "ending_location": "Hyderabad", "places_visited": [{ "name": "Explore Old City", "description": "Take a walk through the narrow lanes of the Old City and experience the rich history and culture of Hyderabad. Visit iconic landmarks such as Charminar, Mecca Masjid, and Chowmahalla Palace.", "coordinates": { "title": "Charminar", "lat": "17.3616° N", "lng": "78.4747° E" }, "recommended_stay": "1 day", "activity": ["Sightseeing", "Photography", "Cultural Experience"], "popular_places": ["Charminar", "Mecca Masjid", "Chowmahalla Palace"], "accommodation": [{ "address": "Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002", "name": "Hotel Charminar View", "type": "Budget Hotel", "coordinates": { "title": "Hotel Charminar View", "lat": "17.3616° N", "lng": "78.4747° E" }, "price_per_night": "INR 1500" }], "transportation": { "bus": { "Goa to Hyderabad": "INR 1000" }, "train": { "Goa to Hyderabad": "INR 1500" }, "flight": { "Goa to Hyderabad": "INR 3000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Biryani", "price": "INR 200", "address": "Paradise Restaurant, Secunderabad", "coordinates": { "title": "Paradise Restaurant", "lat": "17.4416° N", "lng": "78.4983° E" } }] }, { "name": "Visit Ramoji Film City", "description": "Spend a day at the world's largest integrated film city and explore the sets of famous Bollywood and Tollywood movies. Enjoy thrilling rides at the amusement park and watch live shows.", "coordinates": { "title": "Ramoji Film City", "lat": "17.2543° N", "lng": "78.6800° E" }, "recommended_stay": "1 day", "activity": ["Film City Tour", "Amusement Park", "Live Shows"], "popular_places": ["Ramoji Film City", "Eureka", "Movie Magic Park"], "accommodation": [{ "address": "Ramoji Film City Main Rd, Anaspur Village, Hayathnagar Mandal, Hyderabad, Telangana 501512", "name": "Tara Comfort Hotel", "type": "Luxury Hotel", "coordinates": { "title": "Tara Comfort Hotel", "lat": "17.2543° N", "lng": "78.6800° E" }, "price_per_night": "INR 5000" }], "transportation": { "bus": { "Hyderabad to Ramoji Film City": "INR 500" }, "train": { "Hyderabad to Ramoji Film City": "INR 1000" }, "flight": { "Hyderabad to Ramoji Film City": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "South Indian Thali", "price": "INR 300", "address": "Ramoji Film City, Hayathnagar Mandal, Hyderabad, Telangana 501512", "coordinates": { "title": "Ramoji Film City", "lat": "17.2543° N", "lng": "78.6800° E" } }] }, { "name": "Visit Salar Jung Museum", "description": "Explore one of the largest museums in the world and admire the vast collection of art, sculptures, and artifacts from different civilizations. Don't miss the famous Veiled Rebecca sculpture.", "coordinates": { "title": "Salar Jung Museum", "lat": "17.3713° N", "lng": "78.4804° E" }, "recommended_stay": "1 day", "activity": ["Museum Tour", "Art Appreciation", "History"], "popular_places": ["Salar Jung Museum", "Veiled Rebecca", "Clock Tower"], "accommodation": [{ "address": "Salar Jung Rd, Darulshifa, Hyderabad, Telangana 500002", "name": "Hotel Salar Jung Inn", "type": "Budget Hotel", "coordinates": { "title": "Hotel Salar Jung Inn", "lat": "17.3713° N", "lng": "78.4804° E" }, "price_per_night": "INR 2000" }], "transportation": { "bus": { "Local transportation in Hyderabad": "INR 500" }, "train": { "Local transportation in Hyderabad": "INR 1000" }, "flight": { "Local transportation in Hyderabad": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Haleem", "price": "INR 250", "address": "Hotel Shadab, Charminar", "coordinates": { "title": "Hotel Shadab", "lat": "17.3616° N", "lng": "78.4747° E" } }] }, { "name": "Visit Golconda Fort", "description": "Explore the majestic ruins of Golconda Fort and learn about its rich history and architecture. Don't miss the sound and light show in the evening which narrates the story of the fort.", "coordinates": { "title": "Golconda Fort", "lat": "17.3833° N", "lng": "78.4011° E" }, "recommended_stay": "1 day", "activity": ["Fort Tour", "History", "Sound and Light Show"], "popular_places": ["Golconda Fort", "Bala Hissar Gate", "Sound and Light Show"], "accommodation": [{ "address": "Golconda Fort, Ibrahim Bagh, Hyderabad, Telangana 500008", "name": "Fort View Guest House", "type": "Budget Hotel", "coordinates": { "title": "Fort View Guest House", "lat": "17.3833° N", "lng": "78.4011° E" }, "price_per_night": "INR 1500" }], "transportation": { "bus": { "Local transportation in Hyderabad": "INR 500" }, "train": { "Local transportation in Hyderabad": "INR 1000" }, "flight": { "Local transportation in Hyderabad": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Biryani", "price": "INR 200", "address": "Paradise Restaurant, Secunderabad", "coordinates": { "title": "Paradise Restaurant", "lat": "17.4416° N", "lng": "78.4983° E" } }] }, { "name": "Visit Hussain Sagar Lake", "description": "Take a boat ride on the iconic Hussain Sagar Lake and visit the famous Buddha statue located in the middle of the lake. Enjoy the beautiful views of the lake and the surrounding city.", "coordinates": { "title": "Hussain Sagar Lake", "lat": "17.4239° N", "lng": "78.4738° E" }, "recommended_stay": "1 day", "activity": ["Boat Ride", "Sightseeing", "Relaxation"], "popular_places": ["Hussain Sagar Lake", "Buddha Statue", "Lumbini Park"], "accommodation": [{ "address": "Hussain Sagar Lake, Khairatabad, Hyderabad, Telangana 500004", "name": "Lake View Resort", "type": "Luxury Hotel", "coordinates": { "title": "Lake View Resort", "lat": "17.4239° N", "lng": "78.4738° E" }, "price_per_night": "INR 5000" }], "transportation": { "bus": { "Local transportation in Hyderabad": "INR 500" }, "train": { "Local transportation in Hyderabad": "INR 1000" }, "flight": { "Local transportation in Hyderabad": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Biryani", "price": "INR 200", "address": "Paradise Restaurant, Secunderabad", "coordinates": { "title": "Paradise Restaurant", "lat": "17.4416° N", "lng": "78.4983° E" } }] }] }
    const [tripData, setTripData] = useState(null);
    const [modelState, setModelState] = useState(false);
    const [showcalender, setShowCalender] = useState(false)

    const loaderContext = useContext(LoaderContext);
    const [topTouristCities, setTopTouristCities] = useState({
        'originsList': famousTouristCitiesInIndia,
        'destinationsList': destinationList
    });
    const { isAuthenticated } = useAuth0();

    const [tripTitle, setTripTitle] = useState(null)
    const [isValidDestination, setIsValidDestination] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [anchorEl, setAnchorEl] = useState(null)

    const handleDateClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowCalender(false)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const {
        transcript,
        // listening,
        resetTranscript,
        // getRecognition,
        // browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    // console.log(transcript, 'transcript')

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    let nextReqDay = new Date(today);

    nextReqDay.setDate(nextReqDay.getDate() + 3);

    const initialValues = {
        destination: '',
        source: 'Hyderabad',
        // budget: '',
        start_date: moment(tomorrow).format('DD MMMM YYYY'),
        end_date: moment(new Date(nextReqDay)).format('DD MMMM YYYY'),
        transport: 'All', // Default value,
        datees: [{ startDate: moment(tomorrow).format('DD MMMM YYYY'), endDate: moment(new Date(nextReqDay)).format('DD MMMM YYYY') }]
    };


    const validate = (values) => {
        const errors = {};

        // Add your validation logic here
        if (!values.destination) {
            errors.destination = 'Destination is required';
        }
        if (!values.source) {
            errors.source = 'Origin is required';
        }
        if (!values.start_date) {
            errors.start_date = 'Start Date is required';
        }
        // if (!values.end_date) {
        //     errors.end_date = 'End Date is required';
        // }
        // console.log("Errors", errors);
        // // Add validation for other fields as needed

        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
        
        const formattedStartDate = dayjs(values.datees[0].startDate).format('DD MMMM, YYYY');
        const formattedEndDate = dayjs(values.datees[0].endDate).format('DD MMMM, YYYY');
        formik.setFieldValue('start_date' ,formattedStartDate )
        formik.setFieldValue('end_date' ,formattedEndDate )

        //console.log(formik.values , 'values')

            // Update the values with the formatted dates
            const formattedValues = {
                ...values,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
            };
            // Now you can send the `formattedValues` to the server
            //console.log(formattedValues , 'formatted');

            loaderContext.startLoading(true)
            requestAnimationFrame(() => { window.scrollTo(0, 420); });

            // console.log(formik.values , 'formattedValues.....')
            

            getResult(formattedValues)

        },
    });

    // You can use this array of city names in your application as needed for referencing famous tourist cities in India.
    function isKeyInArray(array, key) {
        return array.some(obj => obj.hasOwnProperty(key));
    }

    useEffect(() => {
        if (transcript !== "" && transcript !== null) {
            setSearchText(transcript)

        }
    }, [transcript])

    const getResult = (payload  = {

        "source": "Hyderabad",

        "destination": "Goa",

        "start_date": "30-10-2023",

        "end_date": "5-11-2023",

    }) => {
       

        try {
            getTripDetailsApi(payload).then((r) => {
                // console.log("ChatGPT Resp", r);
                loaderContext.startLoading(false)
                const p = r?.data.hasOwnProperty('trip') ? r?.data.trip : r?.data;
                const fR = {}
                Object.keys(p).forEach(function (key) {
                    var value = p[key];
                    if (key === 'activities' || key === "places") {
                        fR['places_visited'] = value
                    } else {
                        fR[key] = value
                    }

                });
                //console.log(JSON.stringify(fR));
              
                setTripTitle(`${formik.values.source}  to  ${formik.values.destination}  from  ${payload.start_date}  to  ${payload.end_date}`)
                setTripData(fR)
            }).then((e) => {
            })

        } catch (error) {
            loaderContext.startLoading(false)
        }
    }
    const getTripByVoice = (payload , destination) => {
       
        try {
            getTripDetailsByVoiceApi({
                text: payload,
                source: initialValues.source
            }).then((r) => {
                //console.log("ChatGPT Resp", r);
                loaderContext.startLoading(false)
                const p = r?.data.hasOwnProperty('trip') ? r?.data.trip : r?.data;
                const fR = {}
                Object.keys(p).forEach(function (key) {
                    var value = p[key];
                    if (key === 'activities' || key === "places") {
                        fR['places_visited'] = value
                    } else {
                        fR[key] = value
                    }

                });
                //console.log(JSON.stringify(fR));
               
                // console.log(fR , 'frrrrr')

        let data=fR.places_visited;
        let startDate=moment(data[0].date ,  ["DD/MM/YYYY", "DD-MM-YYYY"]).format('DD MMM YYYY');
        let endDate= moment(data[(data?.length)-1].date ,  ["DD/MM/YYYY", "DD-MM-YYYY"]).format('DD MMM YYYY');
        setDateRange([
            {
                startDate: startDate,
                endDate: endDate ,
                key: "selection",
            }
        ])

 setTripTitle(`${formik.values.source}  to  ${destination || formik.values.destination}  from  ${startDate}  to  ${endDate}`)

                setTripData(fR)
            }).then((e) => {
            })

        } catch (error) {
            loaderContext.startLoading(false)
        }
    }

    const onVoiceSearchTripPlan = (text) => {
        setSearchText('')
        const splitedText = text.split(" ");
        let destination = null
        for (var i = 0; i < splitedText.length; i++) {
            const v = splitedText[i];
            const indexed = famousTouristCitiesInIndia.map(m => m.toLowerCase()).indexOf(v.toLowerCase());
            if (indexed >= 0) {
                destination = v
            }
        }
        if (destination) {
            formik.setFieldValue('destination', destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase())
            //setTripTitle(`${formik.values.source}  to  ${destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase()}  from  ${formik.values.start_date}  to  ${formik.values.end_date}`)
            SpeechRecognition.stopListening()
            resetTranscript()
            setModelState(false)
           
            setIsValidDestination(false)
            loaderContext.startLoading(true)
            requestAnimationFrame(() => { window.scrollTo(0, 420); });
            getTripByVoice(text , destination)
        } else {
            console.log("No destination found");
            setIsValidDestination(true)
        }

    }

    const onStartSpeechRecognition = (e) => {
        resetTranscript()
        SpeechRecognition.startListening({
            continuous: true,
        })
        setSearchText('');
        setIsValidDestination(false)
        setModelState(true)
    }

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value)
        setIsValidDestination(false)
    }


    const onClose = (e) => {
        setModelState(false)
        SpeechRecognition.stopListening()
        resetTranscript()
        setIsValidDestination(false)
    }
    const onChangeDestinationList = (value) => {
        setTopTouristCities({ ...topTouristCities, destinationsList: famousTouristCitiesInIndia.filter((city) => city !== value) })
    }
    const onChangeSourcesList = (value) => {
        setTopTouristCities({ ...topTouristCities, originsList: famousTouristCitiesInIndia.filter((city) => city !== value) })
    }



    const [date, setDateRange] = useState([
        {
            startDate: tomorrow,
            endDate: nextReqDay,

            key: "selection",
        },
    ]);


    let maxDate = new Date(date[0]?.startDate);
    maxDate?.setDate(maxDate?.getDate() + 6);




    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
    
        const diffInDays = Math.floor(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        );
    
        if (diffInDays > 6) {
          const maxEndDate = new Date(startDate);
          maxEndDate.setDate(maxEndDate.getDate() + 6);
          const restrictedRange = {
            startDate,
            endDate: maxEndDate,
            key: "selection",
          };
          setDateRange([restrictedRange]);
          formik.setFieldValue('start_date' ,moment(restrictedRange?.startDate).format('DD MMMM, YYYY') )
          formik.setFieldValue('end_date' , moment(restrictedRange?.endDate).format('DD MMMM, YYYY'))
          formik.setFieldValue("datees", [restrictedRange]);
        } else {
            formik.setFieldValue('start_date' ,moment(startDate).format('DD MMMM, YYYY') )
            formik.setFieldValue('end_date' , moment(endDate).format('DD MMMM, YYYY'))
          setDateRange([ranges.selection]);
          formik.setFieldValue("datees", [ranges.selection]);
        }
      };

    return (
        <div>
            <div>
                {/* <Header /> */}
                {/* {`${loaderContext.loading}`} */}

                <div className='searchBanner'>
                    <Container className='banner-container'>
                        <div className='col-12'><h5 className='banner-title'>Unlock the Power of Personalized Travel with Ai</h5></div>
                        <div className='col-12 mb-3'>
                            <div className="search">
                                <div className="input-bar">
                                    <button title="Search" type='button' onClick={() => {
                                        SpeechRecognition.stopListening()
                                        resetTranscript()
                                        if (searchText !== "" && searchText !== null) {
                                            onVoiceSearchTripPlan(searchText)
                                        }

                                    }} className='ms-2'>
                                        <Search />
                                        <span className="a11y-hidden">Search</span>
                                    </button>
                                    <input type="search" placeholder='Speak/Search for your vacation trip' value={searchText} onChange={onChangeSearchText} name="search" id="search-text" autoComplete="off" />
                                    <button title="Dictate" type='button' onClick={() => onStartSpeechRecognition()
                                    }>
                                        <Mic />
                                        <span className="a11y-hidden">Dictate new search</span>
                                    </button>
                                    {/* <button title="Search" type='button' onClick={() => {
                                        SpeechRecognition.stopListening()
                                        resetTranscript()
                                        if (searchText !== "" && searchText !== null) {
                                            onVoiceSearchTripPlan(searchText)
                                        }

                                    }}>
                                        <Search />
                                        <span className="a11y-hidden">Search</span>
                                    </button> */}
                                </div>
                                {(searchText && isValidDestination) ? <div><p className='text-danger fw-bold my-1 ms-3'
                                //  style={{ backgroundColor: '#ffffff', maxWidth: '320px', borderRadius: '8px' }}
                                >Please Try with another destination ...</p></div> : ''}

                            </div>
                        </div>
                        <Box style={{ borderRadius: '8px', background: '#fff', padding: '25px', paddingTop: "30px", paddingBottom: '25px' }}>
                            <form autoComplete='off' className="search-form" onSubmit={formik.handleSubmit}>
                                <div className="container">
                                    <div className="row form-row-container-cls py-lg-2 d-flex align-items-center">
                                        {/* <p className='text-black'>Microphone: {listening ? 'on' : 'off'}</p>
                                        <button onClick={() => SpeechRecognition.startListening({
                                            continuous: true,
                                        })}>Start</button>
                                        <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
                                        <button onClick={resetTranscript}>Reset</button>
                                        <p className='text-black'>{transcript}</p> */}

                                        {/* <div className="col-12 px-2 px-sm-0 my-3"> */}
                                        {/* <div className="search"> */}
                                        {/* <div className="input-bar"> */}
                                        {/* <label htmlFor="search-text" id="search-label">
                                                        Type <span>or dictate</span> to search
                                                    </label> */}
                                        {/* <input type="search" placeholder='Speak/Search for your vacation trip' value={searchText} onChange={onChangeSearchText} name="search" id="search-text" autoComplete="off" />
                                                    <button title="Dictate" type='button' onClick={() => onStartSpeechRecognition()
                                                        // {
                                                        //     resetTranscript()
                                                        //     SpeechRecognition.startListening({
                                                        //         continuous: true,
                                                        //     })
                                                        //     setIsValidDestination(false)
                                                        //     setModelState(true)

                                                        // }
                                                    }>
                                                        <Mic />
                                                        <span className="a11y-hidden">Dictate new search</span>
                                                    </button>
                                                    <button title="Search" type='button' onClick={() => {
                                                        SpeechRecognition.stopListening()
                                                        resetTranscript()
                                                        if (searchText !== "" && searchText !== null) {
                                                            onVoiceSearchTripPlan(searchText)
                                                        }

                                                    }}>
                                                        <Search />
                                                        <span className="a11y-hidden">Search</span>
                                                    </button> */}
                                        {/* </div> */}
                                        {/* {(searchText && isValidDestination) ? <div><p className=' text-danger my-2 ms-3'>Please Try another destination ...</p></div> : ''} */}

                                        {/* bubble would go here for expansion */}
                                        {/* </div> */}

                                        {/* <label style={{ marginBottom: '8px' }}>Please Hit on MIC</label>
                                            <TextField
                                                id="input-with-icon-textfield"
                                                label="Please Hit on MIC"
                                                disabled
                                                value={transcript}
                                                onChange={(e) => {
                                                    console.log("e", e.target);
                                                }}
                                                // onBlur={() => {
                                                //     SpeechRecognition.stopListening()
                                                // }}
                                                // onTouchEnd={() => {
                                                //     console.log("Touch end");
                                                //     SpeechRecognition.stopListening()
                                                // }}
                                                // onMouseUp={() => {
                                                //     console.log("Mouse end");
                                                //     SpeechRecognition.stopListening()
                                                // }}
                                                InputProps={{
                                                    startAdornment: (
                                                        transcript ? <InputAdornment position="start" onClick={() => { SpeechRecognition.stopListening(); resetTranscript(); }}>
                                                            <CloseIcon />
                                                        </InputAdornment> : null
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end" onClick={() => {
                                                            resetTranscript(); SpeechRecognition.startListening({
                                                                continuous: true,
                                                            })
                                                        }}>{<MicIcon />}</InputAdornment>
                                                    )
                                                }}
                                                variant="standard"
                                            /> */}
                                        {/* </div> */}


                                        {/* Budget */}
                                        {/* <Grid item xs={2}>
                                            <label style={{ marginBottom: '8px' }}>Budget</label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-budget"
                                                options={top100Films}
                                                value={formik.values.budget}
                                                onChange={(e, value) => formik.setFieldValue('budget', value)}
                                                renderInput={(params) => <TextField {...params} label="Budget" />}
                                            />
                                            {formik.errors.budget ? <p className='errors'>{formik.errors.budget}</p> : null}
                                        </Grid> */}
                                        {/* Start Date */}
                                        <div className='col-12 col-lg-10'>
                                            <div className='row form-sub-row-container-cls'>
                                                {/* Location */}
                                                <div className="col col-12 col-sm-6 col-md-6 col-lg-3 px-2 px-sm-0">
                                                    <label style={{ marginBottom: '8px' }}>Origin</label>
                                                    <Autocomplete
                                                        className='originField'
                                                        disablePortal
                                                        disabled={loaderContext.loading}
                                                        id="combo-box-location"
                                                        popupIcon={<ExpandMoreIcon />}
                                                        options={topTouristCities.originsList}
                                                        value={formik.values.source}
                                                        onChange={(e, value) => {

                                                            formik.setFieldValue('source', value)
                                                            onChangeDestinationList(value)
                                                        }}
                                                        renderInput={(params) => {
                                                            // console.log("Params", params);
                                                            return <TextField {...params} sx={{ width: "100%" }}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    startAdornment: (
                                                                        <InputAdornment position='end'>
                                                                            <img src={LocationImage} alt='LocationImage' style={{ paddingTop: '20px' }} />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        }}
                                                        sx={{ width: "100%" }}
                                                    />
                                                    {formik.errors.source ? <p className='errors mb-0'>{formik.errors.source}</p> : null}
                                                </div>
                                                {/* Destination */}
                                                <div className="col col-12 col-sm-6 col-md-6 col-lg-3 px-2 px-sm-0">
                                                    <label style={{ marginBottom: '8px' }}>Destination </label>
                                                    <Autocomplete
                                                        className='destinationField'
                                                        disablePortal
                                                        disabled={loaderContext.loading}
                                                        sx={{ width: "100%" }}
                                                        id="combo-box-destination"
                                                        options={topTouristCities.destinationsList}
                                                        value={formik.values.destination}
                                                        popupIcon={<ExpandMoreIcon />}
                                                        // onChange={(e, value) => formik.setFieldValue('destination', value)}
                                                        onChange={(e, value) => {
                                                            formik.setFieldValue('destination', value)
                                                            onChangeSourcesList(value)

                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: "100%" }}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                startAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <img src={LocationImage} alt='LocationImage' style={{ paddingTop: '20px' }} />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />}
                                                    />
                                                    {formik.errors.destination ? <p className='errors mb-0'>{formik.errors.destination}</p> : null}
                                                </div>

                                                {/* <div className="col col-12 col-sm-6 col-md-6 col-lg-3 px-2 px-sm-0">
                                                    <label style={{ marginBottom: '8px' }}>Start Date</label>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            value={formik.values.start_date}
                                                            onChange={(date) => formik.setFieldValue('start_date', date)}
                                                            maxDate=''
                                                            minDate={dayjs(new Date())}
                                                            className="startDate"
                                                            slotProps={{
                                                                textField: {
                                                                    readOnly: true,
                                                                },
                                                            }}

                                                        />
                                                    </LocalizationProvider>
                                                    {formik.errors.start_date ? <p className='errors'>{formik.errors.start_date}</p> : null}
                                                </div> */}

                                                <div className="col col-12 col-sm-6 col-md-6 col-lg-3 px-2 px-sm-0">

                                                    <label style={{ marginBottom: '8px' }} onClick={() => setShowCalender(!showcalender)}>Depart - Return</label>
                                                    <div className='date-box'>
                                                        <input
                                                             disabled={loaderContext.loading}
                                                            onClick={(e) => (setShowCalender(!showcalender), handleDateClick(e))}
                                                            readOnly
                                                            onChange={(item) => setDateRange([item.selection])}
                                                            placeholder={`${moment(new Date(date[0].startDate)).format("DD MMM YYYY")} - ${moment(new Date(date[0].endDate)).format("DD MMM YYYY")}`}
                                                            value={`${moment(new Date(date[0].startDate)).format("DD MMM YYYY")} - ${moment(new Date(date[0].endDate)).format("DD MMM YYYY")}`}
                                                        />
                                                        <img src={calenderIcon} alt='' height={16} width={16} onClick={(e) => (setShowCalender(!showcalender), handleDateClick(e))}  disabled={loaderContext.loading}/>
                                                    </div>
                                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                               <DatePicker
                                                   value={formik.values.start_date}
                                                   onChange={(date) => formik.setFieldValue('start_date', date)}
                                                   maxDate=''
                                                   minDate={dayjs(new Date())}
                                                   className="startDate"
                                                   slotProps={{
                                                       textField: {
                                                           readOnly: true,
                                                       },
                                                   }}

                                               />
                                           </LocalizationProvider>
                                           {formik.errors.start_date ? <p className='errors'>{formik.errors.start_date}</p> : null} */}
                                                    {showcalender && !loaderContext.loading &&
                                                        <Popover
                                                            id={id}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                        >
                                                            <DateRange
                                                                className="datePicker"
                                                                editableDateInputs={true}
                                                                //  onChange={(item) => (setDateRange([item.selection], formik.setFieldValue('datees', [item.selection])))}
                                                                minDate={tomorrow}
                                                                moveRangeOnFirstSelection={true}
                                                                ranges={date}
                                                                // maxDate={maxDate}
                                                                locale={enUS} 
                                                                onChange={handleSelect}
                                                              
                                                               
                                                            />
                                                        </Popover>}

                                                </div>

                                                {/* </div> */}
                                                <div className="col col-12 col-sm-6 col-md-6 col-lg-3 px-2 px-sm-0">
                                                    <label style={{ marginBottom: '8px' }}>Mode of Transport </label>
                                                    <Autocomplete
                                                     disabled={loaderContext.loading}
                                                        className='destinationField'
                                                        disablePortal
                                                        id="combo-box-destination"
                                                        options={TravelTypes}
                                                        value={formik.values.transport}
                                                        // onChange={(e, value) => formik.setFieldValue('destination', value)}
                                                        onChange={(e, value) => {
                                                            formik.setFieldValue('transport', value)
                                                            // onChangeSourcesList(value)

                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: "100%" }}
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                startAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <img src={TravelType} alt='LocationImage' style={{ paddingTop: '20px' }} />
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />}
                                                        popupIcon={<ExpandMoreIcon />}
                                                        sx={{ width: "100%" }}
                                                    />
                                                    {/* {formik.errors.transport ? <p className='errors'>{formik.errors.transport}</p> : null} */}
                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-12 col-lg-2'>
                                            <div className='row'>

                                                <div className="col col-12 d-flex justify-content-center align-items-center" >
                                                    <Button type='submit' disabled={loaderContext.loading} className='btn-submit' style={{}} startIcon={<Icon icon="cuida:search-outline" />}>
                                                    {!loaderContext.loading ? "Start Planning" : "Planning..."}
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <Grid container spacing={2} style={{ marginTop: '8px' }}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="transport-label"
                                        style={{ margin: '20px auto' }}
                                        aria-label="transport"
                                        name="transport"
                                        value={formik.values.transport}
                                        onChange={formik.handleChange}
                                    >
                                        <div style={{ marginRight: '16px' }}>Mode of transport:</div>
                                        <FormControlLabel className='custom-radio' value="car" control={<Radio />} label="Car" />
                                        <FormControlLabel className='custom-radio' value="bus" control={<Radio />} label="Bus" />
                                        <FormControlLabel className='custom-radio' value="train" control={<Radio />} label="Train" />
                                        <FormControlLabel className='custom-radio' value="flight" control={<Radio />} label="Flight" />
                                    </RadioGroup>
                                    {formik.errors.transport ? <p className='errors'>{formik.errors.transport}</p> : null}
                                </Grid> */}

                                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', color: '#000' }} className='home-navigation-modes-container'>
                                    {/* <TransportModes></TransportModes> */}
                                    <Link to="/chatbot"><button className='navigation-btn-cls me-3'>Chatboat AI {"  "} <Icon icon="teenyicons:top-right-outline" className='ms-2' /></button></Link>
                                    <Link to="/preferential-search"><button className='navigation-btn-cls'>Customized Search {"  "}<Icon icon="teenyicons:top-right-outline" className='ms-2' /></button></Link>

                                </div>
                                {/* <Grid item xs={12} style={{ display: 'flex', height: '0' }}>
                                    <Button type='submit' className='btn-submit' style={{ margin: '20px auto', position: "relative", top: '-12px' }}>
                                        Start Planning
                                    </Button>
                                </Grid> */}
                            </form>

                        </Box>
                        <div className='py-3' >
                            {isAuthenticated ? <Searchhistory setTripData={setTripData} tripData={tripData} setTripTitle={setTripTitle} /> : null}
                        </div>

                    </Container>

                    {<SpeechRecognitionModal isOpen={modelState} speechText={transcript} onClose={onClose} onVoiceSearchTripPlan={onVoiceSearchTripPlan} isValidDestination={isValidDestination} onStartSpeechRecognition={onStartSpeechRecognition} />}

                </div>
                <>{!loaderContext.loading ?

                    <div style={{ background: '#F3F4F6', paddingBottom: `${(tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0) ? '8px' : '32px'}`, paddingTop: '20px' }}>
                        {/* && (isKeyInArray(tripData.places, 'description') || isKeyInArray(tripData.places_visited, 'activity')) */}
                        {
                            tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 && (isKeyInArray(tripData?.places_visited, 'description')) ?

                                <Itinerary tripData={tripData} tripTitle={tripTitle} />
                                : tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 &&
                                <div>



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
                    : <ItinerarySkeleton />}</>
            </div>
        </div >
    );
};

export default IndexPage;
