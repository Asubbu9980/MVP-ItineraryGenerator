import React from 'react';
import Slider from 'react-slick';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/joy/Tooltip';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';


const ItineraryInformationCard = ({ placedata, priceKey = null, accommodationDetails = null, popularPlace = null }) => {

    // Slick settings
    const settings = {
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        // autoplay: true,
        // autoplaySpeed: 1000,
    };
    let imgUrls = []


    const getCardData = (placesInfo, placeTitle, price) => {
        if (placesInfo) {
            placesInfo?.forEach((eachPlace, index) => {

                if (eachPlace.photos && eachPlace.photos.length > 0) {
                    eachPlace.photos.forEach((eachPhoto) => {
                        imgUrls.push(eachPhoto.images)
                    })

                }
            })
        }
        // console.log('imgUrls', imgUrls)
        if (placesInfo && placesInfo.length > 0) {
            return (
                <>
                    {imgUrls.length > 0 && <CardOverflow>
                        <AspectRatio ratio="1" sx={{ width: "200px !important", height: "100px !important" }} className="card-image-container">
                            <Slider {...settings} className='images-slick-slider'>
                                {imgUrls?.map((eachPhoto, index) =>
                                    <img
                                        src={eachPhoto} alt={placeTitle}
                                        // srcSet={product.image}
                                        className='slider-images'
                                        width='160px' height='100px'
                                        loading="lazy"
                                        key={`${eachPhoto + index}`}
                                    />)}
                            </Slider>
                        </AspectRatio>
                    </CardOverflow>}

                    {placesInfo && placesInfo?.length > 0 && (<CardContent sx={{ padding: imgUrls.length > 0 ? '' : '4px 8px', width: '100%' }} className="itinerary-card-content">

                        <div style={{ width: '100%' }} className='text-over-flow-class pt-1 pt-md-2'>
                            {placesInfo[0]?.name && (
                                <Tooltip title={placesInfo[0]?.name} variant="solid">
                                    {placesInfo[0]?.url ? <> <a href={placesInfo[0]?.url} target="_blank" className='place-name-link itinerary-trip-card-title' style={{ display: 'block !important' }}>
                                        {placesInfo[0]?.name}
                                    </a> </> : <Typography variant="h6" component="h6" className='my-0 fw-bold fs-6 text-dark itinerary-trip-card-title'>
                                        {placesInfo[0]?.name}
                                    </Typography>}
                                </Tooltip>
                            )}

                            {placesInfo[0]?.formatted_address && (
                                <Typography variant="div" color="text.secondary" style={{ fontSize: '12px', marginBottom: '2px' }} >
                                    <span className='fw-bold me-1'>Address:</span>
                                    {placesInfo[0]?.formatted_address && (
                                        <Tooltip title={placesInfo[0]?.formatted_address}  >
                                            <span>{placesInfo[0]?.formatted_address}</span>
                                        </Tooltip>
                                    )}
                                </Typography>
                            )}


                        </div>


                        <div className='d-flex justify-content-between align-items-center flex-wrap pb-1'>

                            {placesInfo[0]?.rating ? <Typography variant="div" color="text.secondary" style={{ fontSize: '13px', marginBottom: '2px' }} className='d-flex align-items-center'>
                                <span><StarIcon sx={{ fontSize: '14px', color: '#ED8A19 !important' }} className='my-0 mb-1' /> {placesInfo[0]?.rating}</span>
                            </Typography> : null}
                            {placesInfo[0]?.opening_hours && (<>

                                <Typography variant="div" color="text.secondary" style={{ fontSize: '12px', }} className='d-flex align-items-center'>
                                    <span className='fw-bold me-1'>Status:</span> {placesInfo[0]?.opening_hours?.open_now ? <span className='text-success mx-2'>Opened now</span> : <span className='text-danger me-2'>Closed now</span>}
                                </Typography>
                            </>

                            )}


                            {price && <Typography variant="p" color="text.secondary" style={{ fontSize: '12px' }} className='me-2'>
                                <span className='fw-bold me-1'>{priceKey === 'price_per_night' ? 'Price Per Night:' : priceKey === 'fee' ? 'Entry Fee:' : 'Price'}</span>
                                {isNaN(parseFloat(price)) ? (

                                    <span>{price}</span>
                                ) : (

                                    <span>&#8377; {parseFloat(price)}</span>
                                )}
                            </Typography>}
                        </div>
                    </CardContent>)}
                </>
            )
        } else {
            return (<>
                {popularPlace && <Chip key={popularPlace} label={`${popularPlace}`} className='my-2' />}
            </>
            )
        }
    }
    return (
        <div key={`${placedata}`}>

            {placedata && placedata?.place_info ?
                <Card orientation="horizontal" variant="outlined" sx={{ width: '100%' }} className='my-2 product-slider-card p-0'>
                    {placedata?.place_info && placedata?.place_info?.length > 0 && <>
                        {getCardData(placedata?.place_info, placedata?.name, placedata[`${priceKey}`])}

                    </>

                    }
                </Card> :
                <>
                    {accommodationDetails && <Card className='card shadow-sm my-2'>
                        <CardContent className='p-1'>
                            <Typography variant="h6" component="h6" className=' fw-bold fs-6 text-dark'>
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

export default ItineraryInformationCard;
