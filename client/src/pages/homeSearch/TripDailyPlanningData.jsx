import React from 'react'
import { Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import circum_share from "../../assets/circum_share.svg";
import '../homeSearch/homeSearch.css'
import '../homeSearch/sliderbanner.css'

const TripDailyPlanningData = ({ tripData = {}, onChangeModalState }) => {
    return (
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
                                        {m.accommodation && m.accommodation.length > 0 ? <>
                                            <h6 className='trip-recommended-hotel'>Recommended Hotels For Stay:</h6>
                                            <ol className='mb-3'>
                                                {m.accommodation.map((sm, si) => {
                                                    return <li key={sm} className='trip-hotel-title my-2'>{sm.name}
                                                        <br />
                                                        <p className='trip-hotel-address my-1 py-0'>Address:{" "}<span className='trip-hotel-details-span'>{sm.address}.</span></p>
                                                        <p className='trip-hotel-price my-0 py-0'>Price Per Night:{" "}<span className='trip-hotel-details-span'>{sm.price_per_night}.</span></p>
                                                    </li>
                                                })}
                                            </ol>
                                        </> : null}

                                        {m.food_choices && m.food_choices.length > 0 ? <>
                                            <h6 className='trip-recommended-hotel'>Recommended Famous Food Items:</h6>
                                            <ol >
                                                {m.food_choices.map((sm, si) => {
                                                    return <li key={sm} className='trip-hotel-title my-2'>{sm.name}
                                                        <br />
                                                        <p className='trip-hotel-address my-1 py-0'>Address:{" "}<span className='trip-hotel-details-span'>{sm.address}.</span></p>
                                                        <p className='trip-hotel-price my-0 py-0'>Price:{" "}<span className='trip-hotel-details-span'>{sm.price}.</span></p>
                                                    </li>
                                                })}
                                            </ol>
                                        </> : null}

                                    </li>

                                })

                            }

                        </ul>

                    </Card>

                </Container>

            </div>
        </div>
    )
}

export default TripDailyPlanningData