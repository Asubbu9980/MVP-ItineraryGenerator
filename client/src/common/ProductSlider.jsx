import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
// import './ProductSlider.css';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// import { Button } from '@mui/material';
// import agraImage from '../assets/agra.jpg'
import Tooltip from '@mui/joy/Tooltip';
// import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';


// import delhiImage from '../assets/delhi.jpg'
// import hydImage from '../assets/hyderabad.jpg'
// import goaImage from '../assets/goa.jpg'

const ProductSlider = ({ placedata, pricePerNight = null, accommodationDetails, popularPlace }) => {
    // Sample product data
    const [placeDetails, setPlaceDetails] = useState(null);
    // console.log(placedata, 'placedata 1')

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            // console.log('response google')
            try {
                const response = await axios.get('http://localhost:3005/api/places', {
                    params: {
                        query: `${placedata}`,
                        key: 'AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M',
                    },
                    credentials: 'include',

                });

                // console.log(response, 'response google')
                const placeId = response?.results[0]?.place_id;
                console.log(response?.results, 'response placeId')
                if (placeId) {

                    const detailsResponse = await axios.get('http://localhost:3005/google-maps-api', {
                        params: {
                            place_id: placeId,
                            key: 'AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M',
                        },
                        credentials: 'include',

                    });
                    console.log(detailsResponse, 'detailsResponse')

                    setPlaceDetails(detailsResponse);
                }
            } catch (error) {
                console.error('Error fetching place details:');
            }
        };
        if (placedata) {
            console.log(placedata, 'placedata')
            fetchPlaceDetails();
        }

    }, [placedata]);


    // const products = [
    //     {
    //         id: 1,
    //         name: 'Product 1',
    //         image: agraImage,
    //         price: '$19.99',
    //         title: 'Product 1 Title',
    //     },
    //     // {
    //     //     id: 2,
    //     //     name: 'Product 2',
    //     //     image: delhiImage,
    //     //     price: '$29.99',
    //     //     title: 'Product 2 Title',
    //     // },
    //     // {
    //     //     id: 3,
    //     //     name: 'Product 3',
    //     //     image: hydImage,
    //     //     price: '$29.99',
    //     //     title: 'Product 2 Title',
    //     // },
    //     // {
    //     //     id: 4,
    //     //     name: 'Product 4',
    //     //     image: goaImage,
    //     //     price: '$29.99',
    //     //     title: 'Product 2 Title',
    //     // },
    //     // {
    //     //     id: 5,
    //     //     name: 'Product 5',
    //     //     image: delhiImage,
    //     //     price: '$29.99',
    //     //     title: 'Product 2 Title',
    //     // },
    //     // {
    //     //     id: 6,
    //     //     name: 'Product 6',
    //     //     image: delhiImage,
    //     //     price: '$29.99',
    //     //     title: 'Product 2 Title',
    //     // },

    //     // Add more products as needed
    // ];

    // Slick settings
    const settings = {

        slidesToScroll: 1,
        infinite: true,
        dots: true,
        speed: 500,
        // rows: 3,
        slidesToShow: 1,
    };

    return (
        <div key={placedata}>
            {/* <div className="ProductSlider"> */}
            {placeDetails ? <Card orientation="horizontal" variant="outlined" sx={{ width: '100%' }} className='my-2 product-slider-card'>
                {placeDetails?.imageUrls && placeDetails?.imageUrls?.length > 0 && <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 200, height: 100 }} className="card-image-container">
                        <Slider {...settings} className='images-slick-slider'>
                            {placeDetails?.imageUrls?.map((eachPhoto, index) =>
                                <img
                                    src={eachPhoto} alt={eachPhoto}
                                    // srcSet={product.image}
                                    className='slider-images'
                                    width='160px' height='100px'
                                    loading="lazy"
                                    key={eachPhoto + index}
                                />)}
                        </Slider>
                    </AspectRatio>
                </CardOverflow>}
                <CardContent>
                    {placeDetails && placeDetails?.details && (
                        <div style={{ width: '100% !important' }} className='text-over-flow-class pt-2'>
                            {placeDetails?.details?.name && (
                                <Tooltip title={placeDetails?.details?.name} variant="solid">
                                    <a href={placeDetails?.details?.url} target="_blank" className='place-name-link'>
                                        {placeDetails?.details?.name}
                                    </a>
                                </Tooltip>
                            )}
                            <br />
                            <Typography variant="div" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }} >
                                <span className='fw-bold me-1'>Address:</span>
                                {placeDetails?.details?.formatted_address && (
                                    <Tooltip title={placeDetails?.details?.formatted_address}  >
                                        <span>{placeDetails?.details?.formatted_address}</span>
                                    </Tooltip>
                                )}
                            </Typography>
                            <br />
                        </div>
                    )}

                    <div className='d-flex justify-content-between'>
                        {placeDetails?.details?.rating && <Typography variant="div" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                            <span className='fw-bold me-1'>Rating:</span> {placeDetails?.details?.rating}
                        </Typography>}
                        {placeDetails?.details?.opening_hours && (<>
                            {/* <p>Status : {placeDetails?.details?.opening_hours.open_now ? 'Opened' : 'Closed'}</p> */}
                            <Typography variant="div" color="text.secondary" style={{ fontSize: '12px' }} className='d-flex'>
                                <span className='fw-bold me-1'>Status:</span> {placeDetails?.details?.opening_hours?.open_now ? <p className='text-success mx-2'>Opened</p> : <p className='text-danger me-2'>Closed</p>}
                            </Typography>
                        </>

                        )}


                        {pricePerNight && <Typography variant="p" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }} className='me-2'>
                            <span className='fw-bold me-1'>Price Per Night:</span> {pricePerNight}
                        </Typography>}
                    </div>
                </CardContent>

            </Card> :
                <>
                    {/* <Card orientation="horizontal" className='shadow-sm my-2' sx={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                //     <AspectRatio ratio="1" sx={{ width: 200, height: 100 }} className="card-image-container">
                //         <Skeleton variant="rectangular" width={200} height={100} />
                //     </AspectRatio>
                //     <CardContent className=''>
                //         <Typography variant="h6" component="h6" >
                //             <Skeleton variant="text" width={300} height={30} />
                //         </Typography>
                //         <Typography variant="body2" style={{ marginBottom: '2px' }}>
                //             <Skeleton variant="text" width={260} height={30} />
                //         </Typography>
                //         <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '2px' }}>
                //             <Skeleton variant="text" width={240} height={30} />
                //         </Typography>
                //     </CardContent>
                 </Card> */}
                    {accommodationDetails && <Card className='card shadow-sm my-2'>
                        <CardContent className='p-1'>
                            <Typography variant="h6" component="h6" className='mb-1 fw-bold fs-6 text-dark'>
                                {accommodationDetails?.name}
                            </Typography>
                            <Typography variant="div" color="text.secondary" style={{ fontSize: '12px', }}>
                                <span className='fw-bold'>Address:</span> {accommodationDetails?.address}
                            </Typography>
                            {/* <br /> */}
                            <Typography variant="p" color="text.secondary" style={{ fontSize: '12px', marginBottom: '1px' }}>
                                <span className='fw-bold'>Price Per Night:</span> {accommodationDetails?.price_per_night}
                            </Typography>
                        </CardContent>

                    </Card>}
                    {popularPlace && <Chip key={popularPlace} label={`${popularPlace}`} className='my-2' />}
                </>

            }

        </div>


    );
};

export default ProductSlider;
