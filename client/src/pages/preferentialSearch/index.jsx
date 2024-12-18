import React, { useState, useContext, useRef, useEffect } from 'react';
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
import { getTripDetailsApi, getTripDetailsByVoiceApi } from '../../helpers/trip_helper';
// import circum_share from "../../assets/circum_share.svg";
import searchIocn from "../../assets/search-icon.svg";
// import { Button, Container } from '@mui/material';
// import MapModal from '../../common/ItineraryMapModal';
import TripDataRadioGroup from '../homeSearch/TripDataRadioGroup';
import TripDatePicker from '../homeSearch/TripDatePicker';
import { cityNames, tripCity, comingWith, spendTime, food, tripTheme } from '../homeSearch/TripDataFile';
import dayjs from 'dayjs';
import { startDateInitialValue, endDateInitialValue } from '../../context/TripDataContext';
import Itinerary from '../../common/Itinerary'
import { useAuth0 } from '@auth0/auth0-react';
import Searchhistory from '../../common/Searchhistory';
import ItinerarySkeleton from '../../common/ItinerarySkeleton';
// import TextField from '@mui/material/TextField';
import { Mic } from '@mui/icons-material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpeechRecognitionModal from '../../common/SpeechRecognitionModal';
import axios from 'axios';
import SuggestedCities from '../../common/suggestedcities';

// import TripDailyPlanningData from '../../TripDailyPlanningData';
// import NoTripDataAvailable from './NoTripDataAvailable';


const PreferentialSearch = () => {
    const slider = useRef(null);
    const loaderContext = useContext(LoaderContext);
    const { tripPayloadState, setTripPayloadState } = useContext(TripPayloadContext);
    const [tripData, setTripData] = useState(null);
    const [tripTitle, setTripTitle] = useState(null)
    const [bannerHeight, setBannerHeight] = useState('380px');
    const [isValidDestination, setIsValidDestination] = useState(false)
    const [modelState, setModelState] = useState(false);
    const [showSuggestedCities,setShowSuggestedCities]=useState(false)
    const [aiExtractedInfo , setAiExtractedInfo]=useState({})
    


    const {
        transcript,
        resetTranscript,
    } = useSpeechRecognition();

    // useEffect(() => {
    //     if (transcript) {
    //         setTripPayloadState((prevState) => ({ ...prevState, destination: transcript }));
    //     }
    // }, [transcript]);

    const [errors, setErrors] = useState({
        destination: null,
        date: null,
        trip_status_type: null,
        trip_theme_type: null
    })

    // console.log(tripPayloadState, "tripPayloadData")

    const { isAuthenticated } = useAuth0();


    const next = async() => {
        if (currentSlide === 0) {
            let openAiResponse= await Extract_Info_from_Ai(`make a trip  to ${tripPayloadState?.destination}`)
            setAiExtractedInfo(openAiResponse)

            const { destination, destination_close_match } = openAiResponse || {};
            if(destination && destination_close_match?.length==0){
                slider.current.slickNext();
                setTripPayloadState((prevState) => ({ ...prevState, "destination": destination }));
            }
    
            if(destination==null || destination_close_match?.length){
                setShowSuggestedCities(true)
            }
            if (destination) {
               
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



    const Extract_Info_from_Ai = async (input) => {
        try {
          const res = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [
                {
                  role: 'system',
                  content:`Destination Handling:
    
    If only one valid city is found, set it as the destination.
    If no source is explicitly mentioned, default the source to "Hyderabad".
    If the user mentions the source city explicitly but it is invalid, set source to null and populate source_close_match with nearby or similar city names.
    Source Handling:
    
    If the source city is invalid or non-existent, set it to null and suggest similar cities in source_close_match.
    If no source is found in the input, default to "Hyderabad".
    if source is any of the known place like(state name or country name then set that as source)
    if destination is any of the known place like(state name or country name then set that as destination)
    Invalid Destination:
    
    If the destination city is invalid or non-existent, set it to null and populate destination_close_match with similar city names.
    Default Dates:
    
    If no dates are provided, set:
    start_date as ${new Date()} date.
    end_date as two days after start_date.
    Use the format DD MMM YYYY ex:02 Dec 2024.
    City Validation:
    
    Validate both source and destination against real city names.
    If either is invalid, include close matches in their respective arrays (source_close_match or destination_close_match).
    Close Match Suggestions:
    
    If a city is invalid, provide suggestions for similar city names , if minor spelling mistakes then provide the most close matched city:
    Example: "tiru" → "source_close_match": ["tirupathi", "thiruvannamalai"].
    Example: "palassssssa" → "destination_close_match": ["palasa", "palasa-kasibugga"].
    
    Common Names for Cities:
    
    If the user inputs a city with a common or well-known alternative name, replace it with the most common name:
    Example: "Vizag" → "Visakhapatnam".
    Example: "Bombay" → "Mumbai".
    
    
    Feasibility Validation:
    
    if source  valid city is found , then send source_close_match:[]
    if destination valid city is found , then send destination_close_match:[]
    
    Check if the trip is feasible based on the given or default dates.
    If not feasible, suggest alternative cities in destination_close_match.
    return the information in   {
      "start_date": "",
      "end_date": "",
      "destination": "",
      "source": "",
      "source_close_match": [],
      "destination_close_match": []
    }
    
    `
    
                //   content: `Hi, you will be acting as an AI chatbot. Based on the user input, send the information in JSON format exactly like this: { "start_date": "", "end_date": "", "destination": "", "source": "",source_close_match:[], destination_close_match:[] }. 
                //     1.If only one city is found, make it as  destination and set the source as Hyderabad(only if user does not trying to specify the source , if you find user trying to mention the source city then set source as null and send me the source_close_match:[] ).
                //    2.If no dates are found, assume from ${tomorrow} to 2 days, using the DD MMM YYYY format. 
                //    3. If invalid or non-existent source  city  found , set source values as null, like if user enterd a text and you(AI ) extracted the source  but if the source is not a valid city name then set source value as null ,
                //    4.If invalid or non-existent destination  city  found , set destination values as null, like if user enterd a text and you(AI ) extracted the destination,  but if the destination is not a valid city name then set destination value as null 
                //    5.if source is not a valid city but it has near matched city names then send array as if user source is tiru {source_close_match:["tirupathi","thiruvannmali" ]}
                //    6.if destination is not a valid city but it has near matched city names then send array as if user destination is palassssssa {destination_close_match:["palasa","palasa-kasibugga" ]}
                //    7.validate source and destination and based on user time line , if user can finish the trip compfortablly then okay , but if not possible then suggest the some cities that are close match to user destination city , destination_close_match:[] 
                //    7.return then extracted information as JSON format exactly like this: { "start_date": "", "end_date": "", "destination": "", "source": "",source_close_match:[], destination_close_match:[] }`,
                },
                { role: 'user', content: input },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
              },
            }
          );
      
          // Parse the response content into an object
          const response = res?.choices[0].message.content.trim();
          return JSON.parse(response); // Parse the JSON response
        } catch (error) {
          console.error('Error communicating with ChatGPT:', error);
          return null; // Return null on error
        }
      };

      const handleSelectedDestination =(city)=>{
        setTripPayloadState((prevState) => ({ ...prevState, "destination": city }));
        setShowSuggestedCities(false)
        // slider.current.slickNext();
        
    }

    



    const handleChangeCustomDestination = async(userInput)=>{
        try{
        // let openAiResponse= await Extract_Info_from_Ai(`make a trip  to ${userInput}`)
        // const { destination, destination_close_match } = openAiResponse || {};
        // if(destination){
        //     setTripPayloadState((prevState) => ({ ...prevState, "destination": destination }));
        // }

        // if(destination==null || destination_close_match?.length){
        //     setShowSuggestedCities(true)
        // }
        setTripPayloadState((prevState) => ({ ...prevState, "destination": userInput }));
        }
        catch(error){

        }
    }


    function isKeyInArray(array, key) {
        return array.some(obj => obj.hasOwnProperty(key));
    }


    // const onChangeModalState = (data) => {
    //     console.log("m", data);
    //     const mainCoordinateLat = data.coordinates.lat.replace("° N", "");
    //     const mainCoordinateLng = data.coordinates.lng.replace("° E", "");
    //     // console.log("mainCoordinate", mainCoordinateLat);
    //     const locationData = [];
    //     locationData.push(
    //         {
    //             "title": data.coordinates.title,
    //             "lat": parseFloat(mainCoordinateLat),
    //             "lng": parseFloat(mainCoordinateLng)
    //         },
    //     )
    //     if (data?.accommodation && data?.accommodation.length > 0) {
    //         data?.accommodation.forEach(element => {
    //             locationData.push({
    //                 "title": element.coordinates.title,
    //                 "lat": parseFloat(element.coordinates.lat),
    //                 "lng": parseFloat(element.coordinates.lng)
    //             })
    //         });
    //     }
    //     if (data?.food_choices && data?.food_choices.length > 0) {
    //         data?.food_choices.forEach(element => {
    //             locationData.push({
    //                 "title": element.coordinates.title,
    //                 "lat": parseFloat(element.coordinates.lat),
    //                 "lng": parseFloat(element.coordinates.lng)
    //             })
    //         });
    //     }

    //     setCoordinates(locationData)
    //     setModelState(true)
    // }

    // const onCloseModal = () => {
    //     setModelState(false)
    // }


    const handleSubmit = () => {
        if (tripPayloadState.trip_theme_type) {

            const formattedStartDate = dayjs(tripPayloadState.start_date).format('DD MMMM, YYYY');

            const formattedEndDate = dayjs(tripPayloadState.end_date).format('DD MMMM, YYYY');

            setErrors({ ...errors, trip_theme_type: '' })
            loaderContext.startLoading(true)
            requestAnimationFrame(() => { window.scrollTo(0, 220); });
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
                setTripTitle(`${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  to  ${payload.end_date}`)

                setTripData(fR)
                setCurrentSlide(0)
                slider.current.slickGoTo(0)
            }).then((e) => {

            })

        } catch (error) {

        }

    }


    const onStartSpeechRecognition = (e) => {
        resetTranscript()
        SpeechRecognition.startListening({
            continuous: true,
        })
        setIsValidDestination(false)
        setModelState(true)
    }

    const onClose = (e) => {
        setModelState(false)
        SpeechRecognition.stopListening()
        resetTranscript()
        setIsValidDestination(false)
    }

    const getTripByVoice = () => {

        try {
            getTripDetailsByVoiceApi({
                text: transcript,
                source: 'Hyderabad'
            }).then((r) => {
                console.log("ChatGPT Resp", r);
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
                console.log(JSON.stringify(fR));
                // setTripTitle(`${payload.source}  to  ${payload.destination}  from  ${payload.start_date}  to  ${payload.end_date}`)
                setTripData(fR)
            }).then((e) => {
            })

        } catch (error) {
            loaderContext.startLoading(false)
        }
    }

    const onVoiceSearchTripPlan = async() => {

        let openAiResponse= await Extract_Info_from_Ai(transcript)
        setAiExtractedInfo(openAiResponse)
        const { source , start_date, end_date, destination, source_close_match , destination_close_match } = openAiResponse || {};

        //const splitedText = transcript.split(" ");
        // let destination = null
        // for (var i = 0; i < splitedText.length; i++) {
        //     const v = splitedText[i];
        //     const indexed = cityNames.map(m => m.toLowerCase()).indexOf(v.toLowerCase());
        //     if (indexed > 0) {
        //         destination = v
        //     }
        // }
        if (destination) {
            setTripPayloadState((prevState) => ({ ...prevState, "destination": destination }));
            SpeechRecognition.stopListening()
            resetTranscript()
            setModelState(false)
            setIsValidDestination(false)
            loaderContext.startLoading(true)
            requestAnimationFrame(() => { window.scrollTo(0, 220); });
            getResult(openAiResponse)
            // getTripByVoice()
        } else {
            setIsValidDestination(true)
        }

        if(destination==null || destination_close_match?.length){
            
            setShowSuggestedCities(true)

        }

    }
    return (
        <div className='homeSearch'>
            <div className='position-relative'>
                <div className='banner' style={{ height: bannerHeight }}>
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
                                                <div className='citySearch d-flex justify-content-center'>
                                                    <Stack spacing={2}>
                                                        <Autocomplete
                                                            freeSolo={true}
                                                            startDecorator={<SearchIcon />}
                                                            placeholder="Search for a city"
                                                            value={tripPayloadState.destination}
                                                            // width='400px'
                                                            name='destination'
                                                            onChange={(e, value) => handleChangeTripDestination('destination', value)}
                                                            onInputChange={(e, inputValue) => handleChangeCustomDestination(inputValue)}
                                                            options={cityNames}
                                                            style={{ height: '35px' }}
                                                        />
                                                        {/* <Autocomplete
                                                            freeSolo
                                                            startDecorator={<SearchIcon />}
                                                            options={cityNames}
                                                            placeholder="Search for a city"
                                                            value={tripPayloadState.destination}
                                                            disablePortal
                                                            onChange={(event, newValue) => {
                                                                handleChangeTripDestination('destination', newValue);
                                                            }}
                                                            // onInputChange={(event, newInputValue) => {
                                                            //     handleChangeTripDestination('destination', newInputValue);
                                                            // }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    // InputProps={{
                                                                    //     ...params.InputProps,
                                                                    //     // type: 'search',
                                                                    // }}
                                                                    style={{ height: '35px' }}
                                                                />
                                                            )}

                                                        /> */}
                                                    </Stack>
                                                    <button title="Dictate" type='button' onClick={() => onStartSpeechRecognition()} className='ms-1 preferential-speech-btn'>
                                                        <Mic />
                                                    </button>
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
                                                        <div className="col-12 col-sm-12 col-md-6 p-2">
                                                            <label style={{ marginBottom: '8px' }}>Start Date</label>
                                                            <TripDatePicker fieldName="start_date" />
                                                        </div>
                                                        {/* End Date */}
                                                        <div className="col-12 col-sm-12 col-md-6 p-2">
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
                                        <div className='slickArrows mobile-slick-arrows mt-md-3' >
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
                                        <div className='pt-0 '  >
                                            {isAuthenticated ? <Searchhistory setTripData={setTripData} tripData={tripData} setTripTitle={setTripTitle} searchHistoryClassName='preferential-search-history' containerType='container-fluid' setBannerHeight={setBannerHeight} /> : null}
                                        </div>
                                        {<SpeechRecognitionModal isOpen={modelState} speechText={transcript} onClose={onClose} onVoiceSearchTripPlan={onVoiceSearchTripPlan} isValidDestination={isValidDestination} onStartSpeechRecognition={onStartSpeechRecognition} />}
                                        {showSuggestedCities && <SuggestedCities aiExtractedInfo={aiExtractedInfo}  handleSelectedDestination={handleSelectedDestination} showSuggestedCities={showSuggestedCities} setShowSuggestedCities={setShowSuggestedCities} /> }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <>{!loaderContext.loading ?
                <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px' }}>
                    {/* && (isKeyInArray(tripData.places, 'description') || isKeyInArray(tripData.places_visited, 'activity')) */}
                    {
                        tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 && (isKeyInArray(tripData?.places_visited, 'description')) ?

                            <Itinerary tripData={tripData} tripTitle={tripTitle} />
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
                </div> : <ItinerarySkeleton />}</>
        </div >
    );
};

export default PreferentialSearch;