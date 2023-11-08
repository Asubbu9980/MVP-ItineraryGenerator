import React, { useState, useContext } from 'react';
// import Header from './Header'
import '../home/home.css'
import { TextField, Button, Container, Grid, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import { useFormik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Tripdata from './Tripdata.json';
import dayjs from 'dayjs';
import LoaderContext from '../../context/LoaderContext';
import { getTripDetailsApi } from '../../helpers/trip_helper';
import MapModal from './MapModal';

import circum_share from "../../assets/circum_share.svg";
import searchIocn from "../../assets/search-icon.svg";
import TransportModes from './TransportModes';




const famousTouristCitiesInIndia = [
    "Agra",
    "Jaipur",
    "Varanasi",
    "Kochi (Cochin)",
    "Goa",
    'Hyderabad',
    'Delhi',
    "Amritsar",
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
];


const IndexPage = () => {
    const staticTripD = { "trip_start_date": "16 November, 2023", "trip_end_date": "21 November, 2023", "trip_duration": "6 days", "starting_location": "Goa", "ending_location": "Hyderabad", "places_visited": [{ "name": "Explore Old City", "description": "Take a walk through the narrow lanes of the Old City and experience the rich history and culture of Hyderabad. Visit iconic landmarks such as Charminar, Mecca Masjid, and Chowmahalla Palace.", "coordinates": { "title": "Charminar", "lat": "17.3616° N", "lng": "78.4747° E" }, "recommended_stay": "1 day", "activity": ["Sightseeing", "Photography", "Cultural Experience"], "popular_places": ["Charminar", "Mecca Masjid", "Chowmahalla Palace"], "accommodation": [{ "address": "Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana 500002", "name": "Hotel Charminar View", "type": "Budget Hotel", "coordinates": { "title": "Hotel Charminar View", "lat": "17.3616° N", "lng": "78.4747° E" }, "price_per_night": "INR 1500" }], "transportation": { "bus": { "Goa to Hyderabad": "INR 1000" }, "train": { "Goa to Hyderabad": "INR 1500" }, "flight": { "Goa to Hyderabad": "INR 3000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Biryani", "price": "INR 200", "address": "Paradise Restaurant, Secunderabad", "coordinates": { "title": "Paradise Restaurant", "lat": "17.4416° N", "lng": "78.4983° E" } }] }, { "name": "Visit Ramoji Film City", "description": "Spend a day at the world's largest integrated film city and explore the sets of famous Bollywood and Tollywood movies. Enjoy thrilling rides at the amusement park and watch live shows.", "coordinates": { "title": "Ramoji Film City", "lat": "17.2543° N", "lng": "78.6800° E" }, "recommended_stay": "1 day", "activity": ["Film City Tour", "Amusement Park", "Live Shows"], "popular_places": ["Ramoji Film City", "Eureka", "Movie Magic Park"], "accommodation": [{ "address": "Ramoji Film City Main Rd, Anaspur Village, Hayathnagar Mandal, Hyderabad, Telangana 501512", "name": "Tara Comfort Hotel", "type": "Luxury Hotel", "coordinates": { "title": "Tara Comfort Hotel", "lat": "17.2543° N", "lng": "78.6800° E" }, "price_per_night": "INR 5000" }], "transportation": { "bus": { "Hyderabad to Ramoji Film City": "INR 500" }, "train": { "Hyderabad to Ramoji Film City": "INR 1000" }, "flight": { "Hyderabad to Ramoji Film City": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "South Indian Thali", "price": "INR 300", "address": "Ramoji Film City, Hayathnagar Mandal, Hyderabad, Telangana 501512", "coordinates": { "title": "Ramoji Film City", "lat": "17.2543° N", "lng": "78.6800° E" } }] }, { "name": "Visit Salar Jung Museum", "description": "Explore one of the largest museums in the world and admire the vast collection of art, sculptures, and artifacts from different civilizations. Don't miss the famous Veiled Rebecca sculpture.", "coordinates": { "title": "Salar Jung Museum", "lat": "17.3713° N", "lng": "78.4804° E" }, "recommended_stay": "1 day", "activity": ["Museum Tour", "Art Appreciation", "History"], "popular_places": ["Salar Jung Museum", "Veiled Rebecca", "Clock Tower"], "accommodation": [{ "address": "Salar Jung Rd, Darulshifa, Hyderabad, Telangana 500002", "name": "Hotel Salar Jung Inn", "type": "Budget Hotel", "coordinates": { "title": "Hotel Salar Jung Inn", "lat": "17.3713° N", "lng": "78.4804° E" }, "price_per_night": "INR 2000" }], "transportation": { "bus": { "Local transportation in Hyderabad": "INR 500" }, "train": { "Local transportation in Hyderabad": "INR 1000" }, "flight": { "Local transportation in Hyderabad": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Haleem", "price": "INR 250", "address": "Hotel Shadab, Charminar", "coordinates": { "title": "Hotel Shadab", "lat": "17.3616° N", "lng": "78.4747° E" } }] }, { "name": "Visit Golconda Fort", "description": "Explore the majestic ruins of Golconda Fort and learn about its rich history and architecture. Don't miss the sound and light show in the evening which narrates the story of the fort.", "coordinates": { "title": "Golconda Fort", "lat": "17.3833° N", "lng": "78.4011° E" }, "recommended_stay": "1 day", "activity": ["Fort Tour", "History", "Sound and Light Show"], "popular_places": ["Golconda Fort", "Bala Hissar Gate", "Sound and Light Show"], "accommodation": [{ "address": "Golconda Fort, Ibrahim Bagh, Hyderabad, Telangana 500008", "name": "Fort View Guest House", "type": "Budget Hotel", "coordinates": { "title": "Fort View Guest House", "lat": "17.3833° N", "lng": "78.4011° E" }, "price_per_night": "INR 1500" }], "transportation": { "bus": { "Local transportation in Hyderabad": "INR 500" }, "train": { "Local transportation in Hyderabad": "INR 1000" }, "flight": { "Local transportation in Hyderabad": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Biryani", "price": "INR 200", "address": "Paradise Restaurant, Secunderabad", "coordinates": { "title": "Paradise Restaurant", "lat": "17.4416° N", "lng": "78.4983° E" } }] }, { "name": "Visit Hussain Sagar Lake", "description": "Take a boat ride on the iconic Hussain Sagar Lake and visit the famous Buddha statue located in the middle of the lake. Enjoy the beautiful views of the lake and the surrounding city.", "coordinates": { "title": "Hussain Sagar Lake", "lat": "17.4239° N", "lng": "78.4738° E" }, "recommended_stay": "1 day", "activity": ["Boat Ride", "Sightseeing", "Relaxation"], "popular_places": ["Hussain Sagar Lake", "Buddha Statue", "Lumbini Park"], "accommodation": [{ "address": "Hussain Sagar Lake, Khairatabad, Hyderabad, Telangana 500004", "name": "Lake View Resort", "type": "Luxury Hotel", "coordinates": { "title": "Lake View Resort", "lat": "17.4239° N", "lng": "78.4738° E" }, "price_per_night": "INR 5000" }], "transportation": { "bus": { "Local transportation in Hyderabad": "INR 500" }, "train": { "Local transportation in Hyderabad": "INR 1000" }, "flight": { "Local transportation in Hyderabad": "INR 2000" }, "car": { "Local transportation in Hyderabad": "INR 2000" } }, "food_choices": [{ "name": "Hyderabadi Biryani", "price": "INR 200", "address": "Paradise Restaurant, Secunderabad", "coordinates": { "title": "Paradise Restaurant", "lat": "17.4416° N", "lng": "78.4983° E" } }] }] }
    const [tripData, setTripData] = useState(null);
    const [modelState, setModelState] = useState(false);
    const loaderContext = useContext(LoaderContext);
    const [coordinatesData, setCoordinates] = useState([])

    const initialValues = {
        destination: '',
        source: '',
        // budget: '',
        start_date: null,
        end_date: null,
        transport: 'car', // Default value
    };


    const onChangeModalState = (data) => {
        // console.log("m", data);
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

    const validate = (values) => {
        const errors = {};

        // Add your validation logic here
        if (!values.destination) {
            errors.destination = 'Destination is required';
        }
        if (!values.source) {
            errors.source = 'Location is required';
        }
        if (!values.start_date) {
            errors.start_date = 'Start Date is required';
        }
        if (!values.end_date) {
            errors.end_date = 'End Date is required';
        }
        // console.log("Errors", errors);
        // // Add validation for other fields as needed

        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            // Handle form submission here
            const formattedStartDate = dayjs(values.start_date).format('DD MMMM, YYYY');
            // const formattedStartDate = dayjs(values.start_date).format('DD-MM-YYYY');
            const formattedEndDate = dayjs(values.end_date).format('DD MMMM, YYYY');
            // const formattedEndDate = dayjs(values.end_date).format('DD-MM-YYYY');

            // Update the values with the formatted dates
            const formattedValues = {
                ...values,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
            };
            // Now you can send the `formattedValues` to the server
            console.log(formattedValues);
            loaderContext.startLoading(true)

            getResult(formattedValues)

        },
    });

    // You can use this array of city names in your application as needed for referencing famous tourist cities in India.
    function isKeyInArray(array, key) {
        return array.some(obj => obj.hasOwnProperty(key));
    }

    const getResult = (payload = {

        "source": "Hyderabad",

        "destination": "Goa",

        "start_date": "30-10-2023",

        "end_date": "5-11-2023",

    }) => {

        try {
            let checkIfInArray = (key, list) => list.some(obj => JSON.stringify(obj).indexOf(key) > -1);
            getTripDetailsApi(payload).then((r) => {
                console.log("ChatGPT Resp", r);
                loaderContext.startLoading(false)
                // setTripData(r.data.hasOwnProperty('trip') ? r.data.trip : r.data)
                const p = r.data.hasOwnProperty('trip') ? r.data.trip : r.data;
                const fR = {}
                // const lastKey = Object.keys(p).pop();
                Object.keys(p).forEach(function (key) {
                    var value = p[key];
                    if (key == 'activities' || key == "places") {
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
                console.log(JSON.stringify(fR));
                setTripData(fR)
            }).then((e) => {

            })

        } catch (error) {
            loaderContext.startLoading(false)
        }
        // finally {
        //     loaderContext.startLoading(false)
        // }
    }

    return (
        <div>
            <div>
                {/* <Header /> */}
                <div className='searchBanner'>
                    <Container className='banner-container'>
                        <Box style={{ borderRadius: '8px', paddingTop: "40px", background: '#fff', padding: '25px', paddingBottom: '35px' }}>

                            <form autoComplete='off' className="search-form" onSubmit={formik.handleSubmit}>
                                <div className="container">
                                    <div className="row">
                                        {/* Destination */}
                                        <div className="col col-3">
                                            <label style={{ marginBottom: '8px' }}>Destination </label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-destination"
                                                options={famousTouristCitiesInIndia}
                                                value={formik.values.destination}
                                                onChange={(e, value) => formik.setFieldValue('destination', value)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            {formik.errors.destination ? <p className='errors'>{formik.errors.destination}</p> : null}
                                        </div>

                                        {/* Location */}
                                        <div className="col col-3">
                                            <label style={{ marginBottom: '8px' }}>Location</label>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-location"
                                                options={famousTouristCitiesInIndia}
                                                value={formik.values.source}
                                                onChange={(e, value) => formik.setFieldValue('source', value)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            {formik.errors.source ? <p className='errors'>{formik.errors.source}</p> : null}
                                        </div>

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
                                        <div className="col col-3">
                                            <label style={{ marginBottom: '8px' }}>Start Date</label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    value={formik.values.start_date}
                                                    onChange={(date) => formik.setFieldValue('start_date', date)}
                                                />
                                            </LocalizationProvider>
                                            {formik.errors.start_date ? <p className='errors'>{formik.errors.start_date}</p> : null}
                                        </div>

                                        {/* End Date */}
                                        <div className="col col-3">
                                            <label style={{ marginBottom: '8px' }}>End Date</label>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className="end-date"
                                                    value={formik.values.end_date}
                                                    onChange={(date) => formik.setFieldValue('end_date', date)}
                                                />
                                            </LocalizationProvider>
                                            {formik.errors.end_date ? <p className='errors'>{formik.errors.end_date}</p> : null}

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

                                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', color: '#000' }}>
                                    <TransportModes></TransportModes>
                                </div>

                                <Grid item xs={12} style={{ display: 'flex', height: '0' }}>
                                    <Button type='submit' className='btn-submit' style={{ margin: '20px auto', position: "relative", top: '-5px' }}>
                                        Start Planning
                                    </Button>
                                </Grid>
                            </form>

                        </Box>
                    </Container>
                </div>
                <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px' }}>
                    {/* && (isKeyInArray(tripData.places, 'description') || isKeyInArray(tripData.places_visited, 'activity')) */}
                    {
                        tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 && (isKeyInArray(tripData?.places_visited, 'description')) ?

                            <div>
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
                                                        return < li className='tripDetails-item' key={i}>

                                                            <div className="dot">

                                                                <div className="center"></div>

                                                                <div className="ring"></div>

                                                            </div>


                                                            <div className='viewmap_btn'> <Button className='' onClick={(e) => onChangeModalState(m)}>View Map   <img src={circum_share} style={{ marginLeft: '8px' }} alt='logo' />

                                                            </Button>

                                                            </div>
                                                            {/* {m?.activity && " - " + m.activity} */}
                                                            <h5>Day {i + 1}  {" - " + m.name} </h5>

                                                            <h6>{m.date}</h6>
                                                            <p className='mt-2 mb-0 pb-0'>
                                                                {m.description}

                                                            </p>
                                                            <ul className="trip-points">
                                                                {
                                                                    m.activity?.map((sm, si) => {
                                                                        return <li key={si}>{sm}</li>
                                                                    })
                                                                }
                                                                <br />
                                                                {/* {
                                                                    m.description?.split(".")?.map((sm, si) => {
                                                                        return sm != "" && <li key={si}>{sm}</li>
                                                                       
                                                                    })
                                                                } */}

                                                            </ul>

                                                        </li>

                                                    })

                                                }

                                            </ul>

                                        </Card>

                                    </Container>

                                </div>
                            </div>
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
            </div>
            {coordinatesData.length > 0 && <MapModal open={modelState} MapCoordinates={coordinatesData} onCloseModal={onCloseModal} />}
        </div >
    );
};

export default IndexPage;