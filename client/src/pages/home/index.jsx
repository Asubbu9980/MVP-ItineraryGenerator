import React from 'react';
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

const IndexPage = () => {
    const formik = useFormik({
        initialValues: {
            destination: '',
            location: '',
            budget: '',
            transport: ''
        },

        onSubmit: (values) => {
            console.log(formik.values)
        },
        validate: (values) => {

            let errors = {}
            if (!values.destination) {
                errors.destination = "Enter destination"
            }
            if (!values.location) {
                errors.location = "Enter location"
            }

            if (!values.budget) {
                errors.budget = "Enter Budget"
            }
            if (!values.transport) {
                errors.transport = "Enter transport"
            }

            return errors;
        }

    });

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },




    ];
    return (
        <div>
            <div>
                {/* <Header /> */}
                <div className='searchBanner'>
                    <Container className='banner-container'>
                        <Box style={{ borderRadius: '8px', paddingTop:"40px", background: 'rgba(0, 0, 0, 0.50)', padding: '25px' }}>
                            <form autoComplete='off' className="search-form" onSubmit={formik.handleSubmit} >
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}> Destination</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={top100Films}
                                            value={formik.values.destination}
                                            onChange={formik.handleChange}
                                            renderInput={(params) => <TextField {...params} label="Movie" />}
                                        />
                                        {formik.errors.destination ? <p className='errors'>{formik.errors.destination}</p> : null}
                                    </Grid>
                                    <Grid item xs={2} >
                                        <label style={{ marginBottom: '8px' }}> Location</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={top100Films}
                                            value={formik.values.destination}
                                            onChange={formik.handleChange}
                                            renderInput={(params) => <TextField {...params} label="Movie" />}
                                        />
                                        {formik.errors.location ? <p className='errors'>{formik.errors.location}</p> : null}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>  Budget</label>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={top100Films}
                                            value={formik.values.destination}
                                            onChange={formik.handleChange}
                                            renderInput={(params) => <TextField {...params} label="Movie" />}
                                        />
                                        {formik.errors.budget ? <p className='errors'>{formik.errors.budget}</p> : null}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>  Start Date </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <label style={{ marginBottom: '8px' }}>  End Date </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} style={{ marginTop: '8px' }}>

                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        style={{ margin: '20px auto',  }}
                                        aria-label="transport"
                                        name="transport"
                                        value={formik.values.transport}
                                        onChange={formik.handleChange}
                                    >
                                        <div style={{ marginRight: '16px' }}> Mode of transport : </div>
                                        <FormControlLabel className='custom-radio' value="car" control={<Radio />} label="Car" />
                                        <FormControlLabel className='custom-radio' value="bus" control={<Radio />} label="Bus" />
                                        <FormControlLabel className='custom-radio' value="train" control={<Radio />} label="Train" />
                                        <FormControlLabel className='custom-radio' value="flight" control={<Radio />} label="Flight" />
                                    </RadioGroup>
                                    {formik.errors.transport ? <p className='errors'>{formik.errors.transport}</p> : null}


                                </Grid>
                                  <Grid  item xs={12} style={{ display: 'flex', height:'0'  }}>
                                <Button type='submit' className='btn-submit'     style={{ margin: '20px auto', position:"relative", top:'-30px'}}> Start Planning</Button>
                              

                                </Grid>

                            </form>
                        </Box>
                    </Container>
                </div>
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
                                    <li className='tripDetails-item'>
                                        <div className="dot">
                                            <div className="center"></div>
                                            <div className="ring"></div>
                                        </div>
                                            <div className='viewmap_btn'> View Map</div>
                                        <h5>Day 1</h5>
                                        <h6>20 July, 2023</h6>
                                        <ul className="trip-points">
                                            <li>Arrive in Goa and check into your hotel.</li>
                                            <li>Hotel The Leela Goa in Goa</li>
                                            <li>Explore Panjim, the capital of Goa.</li>
                                            <li>Visit the Basilica of Bom Jesus, a UNESCO World Heritage Site.</li>
                                            <li>Take a walk along the Mandovi River.</li>
                                        </ul>
                                    </li>
                                    <li className='tripDetails-item'>
                                        <div className="dot">
                                            <div className="center"></div>
                                            <div className="ring"></div>
                                        </div>
                                        <div className='viewmap_btn'> View Map</div>
                                        <h5>Day 2</h5>
                                        <h6>20 July, 2023</h6>
                                        <ul className="trip-points">
                                            <li>Arrive in Goa and check into your hotel.</li>
                                            <li>Hotel The Leela Goa in Goa</li>
                                            <li>Explore Panjim, the capital of Goa.</li>
                                            <li>Visit the Basilica of Bom Jesus, a UNESCO World Heritage Site.</li>
                                            <li>Take a walk along the Mandovi River.</li>
                                        </ul>
                                    </li>
                                    <li className='tripDetails-item'>
                                        <div className="dot">
                                            <div className="center"></div>
                                            <div className="ring"></div>
                                        </div>
                                        <div className='viewmap_btn'> View Map</div>
                                        <h5>Day 3</h5>
                                        <h6>20 July, 2023</h6>
                                        <ul className="trip-points">
                                            <li>Arrive in Goa and check into your hotel.</li>
                                            <li>Hotel The Leela Goa in Goa</li>
                                            <li>Explore Panjim, the capital of Goa. </li>
                                            <li>Visit the Basilica of Bom Jesus, a UNESCO World Heritage Site.</li>
                                            <li>Take a walk along the Mandovi River.</li>
                                        </ul>
                                    </li>
                                    <li className='tripDetails-item'>
                                        <div className="dot">
                                            <div className="center"></div>
                                            <div className="ring"></div>
                                        </div>
                                        <div className='viewmap_btn'> View Map</div>
                                        <h5>Day 4</h5>
                                        <h6>20 July, 2023</h6>
                                        <ul className="trip-points">
                                            <li>Arrive in Goa and check into your hotel.</li>
                                            <li>Hotel The Leela Goa in Goa</li>
                                            <li>Explore Panjim, the capital of Goa.</li>
                                            <li>Visit the Basilica of Bom Jesus, a UNESCO World Heritage Site.</li>
                                            <li>Take a walk along the Mandovi River.</li>
                                        </ul>
                                    </li>
                                </ul>

                            </Card>


                        </Container>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;