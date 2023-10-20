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

    const [tripData, setTripData] = useState(null);
    const [modelState, setModelState] = useState(false);
    const loaderContext = useContext(LoaderContext);

    const initialValues = {
        destination: '',
        source: '',
        // budget: '',
        start_date: null,
        end_date: null,
        transport: 'car', // Default value
    };


    const onChangeModalState = () => {
        setModelState(true)
    }

    const onCloseModal = () => {
        setModelState(false)
    }

    const validate = (values) => {
        const errors = {};

        // Add your validation logic here
        // if (!values.destination) {
        //     errors.destination = 'Destination is required';
        // }
        // // Add validation for other fields as needed

        return errors;
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            // Handle form submission here
            const formattedStartDate = dayjs(values.start_date).format('DD MMMM, YYYY');
            const formattedEndDate = dayjs(values.end_date).format('DD MMMM, YYYY');

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


    const getResult = (payload = {

        "source": "Hyderabad",

        "destination": "Goa",

        "start_date": "30-10-2023",

        "end_date": "5-11-2023",

    }) => {

        try {
            getTripDetailsApi(payload).then((r) => {

                console.log("ChatGPT Resp", r);
                loaderContext.startLoading(false)
                setTripData(r.data)
                //console.log("Resp Json Data", tripData);

            }).then((e) => {

            })

        } catch (error) {

        }

    }
    //console.log("Resp Json Data 2", tripData);
    return (
        <div>
            <div>
                {/* <Header /> */}
                <div className='searchBanner'>
                    <Container className='banner-container'>
                        <Box style={{ borderRadius: '8px', paddingTop: "40px", background: 'rgba(0, 0, 0, 0.50)', padding: '25px' }}>

                            <form autoComplete='off' className="search-form" onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* Destination */}
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>Destination</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-destination"
                                            options={famousTouristCitiesInIndia}
                                            value={formik.values.destination}
                                            onChange={(e, value) => formik.setFieldValue('destination', value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        {formik.errors.destination ? <p className='errors'>{formik.errors.destination}</p> : null}
                                    </Grid>

                                    {/* Location */}
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>Location</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-location"
                                            options={famousTouristCitiesInIndia}
                                            value={formik.values.source}
                                            onChange={(e, value) => formik.setFieldValue('source', value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        {formik.errors.location ? <p className='errors'>{formik.errors.location}</p> : null}
                                    </Grid>

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
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>Start Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={formik.values.start_date}
                                                onChange={(date) => formik.setFieldValue('start_date', date)}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    {/* End Date */}
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>End Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={formik.values.end_date}
                                                onChange={(date) => formik.setFieldValue('end_date', date)}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: '8px' }}>
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
                                </Grid>

                                <Grid item xs={12} style={{ display: 'flex', height: '0' }}>
                                    <Button type='submit' className='btn-submit' style={{ margin: '20px auto', position: "relative", top: '-30px' }}>
                                        Start Planning
                                    </Button>
                                </Grid>
                            </form>

                        </Box>
                    </Container>
                </div>

                {
                    tripData != null && tripData?.places_visited && tripData?.places_visited.length > 0 &&

                    <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px' }}>
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


                                                    <div className='viewmap_btn'> <Button className='' onClick={onChangeModalState}>View Map   <img src={circum_share} style={{ marginLeft: '8px' }} alt='logo' />

                                                    </Button>

                                                    </div>

                                                    <h5>Day {i + 1}</h5>

                                                    <h6>{m.date}</h6>

                                                    <ul className="trip-points">
                                                        {
                                                            m.activities?.map((sm, si) => {
                                                                return <li key={si}>{sm}</li>
                                                            })

                                                        }

                                                    </ul>

                                                </li>

                                            })

                                        }

                                    </ul>

                                </Card>

                            </Container>

                        </div>
                    </div>

                }
                {
                    tripData === null &&

                    <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px' }}>
                        <div className='search_info'>

                            <img src={searchIocn} alt='logo' />

                            <h5>Click the Top Button start your <br />

                                vacation planning.</h5>

                        </div>

                    </div>
                }
            </div>
            <MapModal open={modelState} onCloseModal={onCloseModal} />
        </div>
    );
};

export default IndexPage;