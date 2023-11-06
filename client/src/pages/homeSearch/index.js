import React, { useState, useContext, useRef, useEffect } from 'react';
// import Header from './Header'
import '../homeSearch/homeSearch.css'
import '../homeSearch/sliderbanner.css'
import Slider from "react-slick";
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import bannerOne from '../../assets/banners/1.jpg'
import bannerTwo from '../../assets/banners/2.jpg'
import bannerThree from '../../assets/banners/3.jpg'
import bannerFour from '../../assets/banners/4.jpg'
import bannerFive from '../../assets/banners/5.jpg'
import bannerSix from '../../assets/banners/6.jpg'

import agraImage from '../../assets/agra.jpg'
import delhiImage from '../../assets/delhi.jpg'
import hydImage from '../../assets/hyderabad.jpg'
import goaImage from '../../assets/goa.jpg'

import singleImage from '../../assets/person.png'
import coupleImage from '../../assets/parents.png'
import friendsImage from '../../assets/friends.png'
import familyImage from '../../assets/family.png'



import Autocomplete from '@mui/joy/Autocomplete';
import Stack from '@mui/joy/Stack';
import SearchIcon from '@mui/icons-material/Search';

const IndexPage = () => {
    const slider = useRef(null);
    const next = () => {
        slider.current.slickNext();
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
        beforeChange: (current, next) => setCurrentSlide(next),

    };

    const totalSlides = slider.current ? slider.current.props.children.length : 0;
    console.log(totalSlides, 'totalSlides')
    console.log(currentSlide, 'currentSlide')
    const [selected, setSelected] = React.useState([]);
    const tripCity = [
        {
            id: '1',
            item: 'Goa',
            url: goaImage,
        },
        {
            id: '2',
            item: 'Hyderabad',
            url: hydImage,
        },
        {
            id: '3',
            item: 'Delhi',
            url: delhiImage,
        },
        {
            id: '4',
            item: 'Agra',
            url: agraImage,
        },
    ]
    const comingWith = [
        {
            id: '1',
            item: 'Going solo',
            url: singleImage,
        },
        {
            id: '2',
            item: 'Partner',
            url: coupleImage,
        },
        {
            id: '3',
            item: 'Friends',
            url: friendsImage,
        },
        {
            id: '4',
            item: 'Family-friendly',
            url: familyImage,
        },
    ]
    const spendTime = [
        {
            id: '1',
            item: 'Hidden Gems',
            url: '',
        },
        {
            id: '2',
            item: 'Seafood Cuisine',
            url: '',
        },
        {
            id: '3',
            item: 'Beach Clubs',
            url: '',
        },
        {
            id: '4',
            item: 'Water Sports and Marine Adventures',
            url: '',
        },
        {
            id: '5',
            item: 'Natural Attractions',
            url: '',
        },
        {
            id: '6',
            item: 'Tequila Tastings',
            url: '',
        },
        {
            id: '7',
            item: 'History',
            url: '',
        },
        {
            id: '8',
            item: 'Wellness & Spas',
            url: '',
        },
        {
            id: '9',
            item: 'Culture',
            url: '',
        },
        {
            id: '10',
            item: 'Wine & Beer',
            url: '',
        },
        {
            id: '11',
            item: 'Outdoors',
            url: '',
        },
        {
            id: '12',
            item: 'Must-see-Attractions',
            url: '',
        },
    ]
    const food = [
        {
            id: '1',
            item: 'Vegetarian ',
            url: '',
        },
        {
            id: '2',
            item: 'Non-vegetarian',
            url: '',
        },
        {
            id: '3',
            item: 'Eggetarian',
            url: '',
        }
    ]
    const tripTheme = [
        {
            id: '1',
            item: 'Adventure ',
            url: '',
        },
        {
            id: '2',
            item: 'Cultural Immersion',
            url: '',
        },
        {
            id: '3',
            item: 'Culinary Exploration',
            url: '',
        },
        {
            id: '4',
            item: 'Wellness and Relaxation',
            url: '',
        },
        {
            id: '5',
            item: 'Eco-Tourism',
            url: '',
        },
        {
            id: '6',
            item: 'Beach Getaway',
            url: '',
        },
        {
            id: '7',
            item: 'Wildlife Safari',
            url: '',
        },
        {
            id: '8',
            item: 'Educational Travel',
            url: '',
        },
    ]
    const cityNames = [
        { label: 'Agra'},
        { label: 'Jaipur'},
        { label: 'Varanasi'},
        { label: '"Kochi (Cochin)'},
        { label: 'Goa'},
        { label: "Hyderabad"},
        { label: 'Delhi'}, 
        { label: 'Amritsar'}    
    ]

      
        
       
         
        
    const sliderImages = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix]
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
                                        <Slider ref={slider} {...settings}>
                                            <div className='sliderBox sliderBoxOne'>
                                                <h3>Where do you want to go?</h3>

                                                <div className='citySearch'>
                                                     <Stack spacing={2}>
                                                    <Autocomplete
                                                        startDecorator={<SearchIcon />}
                                                        placeholder="Search for a city"
                                                        options={cityNames}
                                                        style={{ height: '45px' }}
                                                    />
                                                   
                                                </Stack></div>
                                                <div className='RadioGroupBox'>
                                                    <RadioGroup
                                                        aria-labelledby="city"
                                                        defaultValue="Goa"
                                                        size="lg"
                                                        sx={{ gap: 1.5 }}
                                                        style={{ display: 'flex', flexDirection: 'row',justifyContent:'center' }}
                                                    >
                                                            
                                                                {tripCity.map((info) => (
                                                                    <div className='box'>
                                                                            <Sheet
                                                                                key={info.id}
                                                                                className='locationSheet'
                                                                                sx={{
                                                                                    p: 1,
                                                                                    // borderRadius: 'md',
                                                                                    // height: '140px',

                                                                                }}
                                                                                style={{ backgroundImage: `url(${info.url})`, }}
                                                                            >
                                                                                <Radio
                                                                                    label={`${info.item}`}
                                                                                    overlay
                                                                                    disableIcon
                                                                                    value={info.item}
                                                                                    slotProps={{
                                                                                        label: ({ checked }) => ({
                                                                                            sx: {
                                                                                                fontWeight: 'lg',
                                                                                                fontSize: 'md',
                                                                                                color: checked ? 'text.primary' : 'text.secondary',
                                                                                            },
                                                                                        }),
                                                                                        action: ({ checked }) => ({
                                                                                            className: 'radioButton',
                                                                                            sx: (theme) => ({
                                                                                                ...(checked && {
                                                                                                    '--variant-borderWidth': '2px',
                                                                                                    '&&': {
                                                                                                        // className: '',
                                                                                                        // && to increase the specificity to win the base :hover styles
                                                                                                        // borderColor: theme.vars.palette.primary[500],
                                                                                                    },
                                                                                                }),
                                                                                            }),
                                                                                        }),
                                                                                    }}
                                                                                />
                                                                            </Sheet>
                                                                        
                                                                    </div>
                                                                ))}
                                                             
                                                        
                                                    </RadioGroup>
                                                </div>

                                            </div>
                                            <div className='sliderBox sliderBoxTwo'>
                                                <h3> Who’s coming with you?</h3>
                                                        <div className='RadioGroupBox'>
                                                            <RadioGroup
                                                                aria-labelledby="city"
                                                                defaultValue="Goa"
                                                                size="lg"
                                                                sx={{ gap: 1.5 }}
                                                                style={{ display: 'flex', flexDirection: 'row',justifyContent:'center' }}
                                                            >
                                                                {comingWith.map((info) => (
                                                                    <div className=''>
                                                                        <div className='box' >
                                                                            <Sheet
                                                                                key={info.id}
                                                                                sx={{
                                                                                    p: 2,
                                                                                    borderRadius: 'md',
                                                                                    boxShadow: 'sm',
                                                                                }}
                                                                                style={{ height: '100px', width: '88%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                                            >
                                                                                <img src={info.url} alt='' width={25} style={{display:'block', marginRight:'5px'}}  />
                                                                                <Radio
                                                                                    label={`${info.item}`}
                                                                                    overlay
                                                                                    disableIcon
                                                                                    value={info.item}
                                                                                    slotProps={{
                                                                                        label: ({ checked }) => ({
                                                                                            sx: {
                                                                                                fontWeight: 'lg',
                                                                                                fontSize: 'md',
                                                                                                color: checked ? 'text.primary' : 'text.secondary',
                                                                                            },
                                                                                        }),
                                                                                        action: ({ checked }) => ({
                                                                                            sx: (theme) => ({
                                                                                                ...(checked && {
                                                                                                    '--variant-borderWidth': '2px',
                                                                                                    '&&': {
                                                                                                        // && to increase the specificity to win the base :hover styles
                                                                                                        borderColor: theme.vars.palette.primary[500],
                                                                                                    },
                                                                                                }),
                                                                                            }),
                                                                                        }),
                                                                                    }}
                                                                                />
                                                                            </Sheet>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </div>
                                                     
                                                
                                            </div>
                                            <div className='sliderBox sliderBoxThree'>
                                                <h3> How do you want to spend your time?</h3>
                                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                    <div>
                                                        <Box
                                                            role="group"
                                                            aria-labelledby="fav-movie"
                                                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, }}
                                                        >
                                                            {spendTime.map((name) => {
                                                                const checked = selected.includes(name.item);
                                                                return (
                                                                    <Chip
                                                                        key={name.id}
                                                                        variant="plain"
                                                                        color={checked ? 'primary' : 'neutral'}
                                                                        startDecorator={
                                                                            checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                                                                        }
                                                                    >
                                                                        <Checkbox
                                                                            variant="outlined"
                                                                            color={checked ? 'primary' : 'neutral'}
                                                                            disableIcon
                                                                            overlay
                                                                            label={name.item}
                                                                            checked={checked}
                                                                            onChange={(event) => {
                                                                                setSelected((names) =>
                                                                                    !event.target.checked
                                                                                        ? names.filter((n) => n !== name.item)
                                                                                        : [...names, name.item],
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Chip>
                                                                );
                                                            })}
                                                        </Box>
                                                    </div>
                                                </Box>
                                            </div>
                                            <div className='sliderBox sliderBoxFour'>
                                                <h3>Select Food</h3>
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='RadioGroupBox'>
                                                            <RadioGroup
                                                                aria-labelledby="city"
                                                                defaultValue="Goa"
                                                                size="lg"
                                                                sx={{ gap: 1.5 }}
                                                                style={{ display: 'flex', flexDirection: 'row' }}
                                                            >
                                                                {food.map((info) => (
                                                                    <div className='col-md-3'>
                                                                        <div className='' >
                                                                            <Sheet
                                                                                key={info.id}
                                                                                sx={{
                                                                                    p: 2,
                                                                                    borderRadius: 'md',
                                                                                    boxShadow: 'sm',
                                                                                }}
                                                                                style={{ height: '100px', width: '88%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                                            >
                                                                                <Radio
                                                                                    label={`${info.item}`}
                                                                                    overlay
                                                                                    disableIcon
                                                                                    value={info.item}
                                                                                    slotProps={{
                                                                                        label: ({ checked }) => ({
                                                                                            sx: {
                                                                                                fontWeight: 'lg',
                                                                                                fontSize: 'md',
                                                                                                color: checked ? 'text.primary' : 'text.secondary',
                                                                                            },
                                                                                        }),
                                                                                        action: ({ checked }) => ({
                                                                                            sx: (theme) => ({
                                                                                                ...(checked && {
                                                                                                    '--variant-borderWidth': '2px',
                                                                                                    '&&': {
                                                                                                        // && to increase the specificity to win the base :hover styles
                                                                                                        borderColor: theme.vars.palette.primary[500],
                                                                                                    },
                                                                                                }),
                                                                                            }),
                                                                                        }),
                                                                                    }}
                                                                                />
                                                                            </Sheet>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='sliderBox sliderBoxFive'>
                                                <h3>Select your Trip Theme</h3>
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='RadioGroupBox'>
                                                            <RadioGroup
                                                                aria-labelledby="city"
                                                                defaultValue="Goa"
                                                                size="lg"
                                                                sx={{ gap: 1.5 }}
                                                                style={{ display: 'flex', flexDirection: 'row' }}
                                                            >
                                                                {tripTheme.map((info) => (
                                                                    <div className='col-md-3'>
                                                                        <div className='tripTheme' >
                                                                            <Sheet
                                                                                key={info.id}
                                                                                sx={{
                                                                                    p: 2,
                                                                                    borderRadius: 'md',
                                                                                    boxShadow: 'sm',
                                                                                }}
                                                                                style={{ height: '100px', width: '88%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                                            >
                                                                                <Radio
                                                                                    label={`${info.item}`}
                                                                                    overlay
                                                                                    disableIcon
                                                                                    value={info.item}
                                                                                    slotProps={{
                                                                                        label: ({ checked }) => ({
                                                                                            sx: {
                                                                                                fontWeight: 'lg',
                                                                                                fontSize: 'md',
                                                                                                color: checked ? 'text.primary' : 'text.secondary',
                                                                                            },
                                                                                        }),
                                                                                        action: ({ checked }) => ({
                                                                                            sx: (theme) => ({
                                                                                                ...(checked && {
                                                                                                    '--variant-borderWidth': '2px',
                                                                                                    '&&': {
                                                                                                        // && to increase the specificity to win the base :hover styles
                                                                                                        borderColor: theme.vars.palette.primary[500],
                                                                                                    },
                                                                                                }),
                                                                                            }),
                                                                                        }),
                                                                                    }}
                                                                                />
                                                                            </Sheet>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className='sliderBox sliderBoxFour'>
                                <h3>4</h3>
                            </div> */}
                                        </Slider>
                                        <div className='slickArrows' style={{ textAlign: "center" }}>
                                            {currentSlide != 0 && <button className="button" onClick={previous} >
                                                Previous
                                            </button>}

                                            {currentSlide != totalSlides - 1 && <button className="button" onClick={next} >
                                                Next
                                            </button>}

                                            {currentSlide == totalSlides - 1 && <button className="button"  >
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
            <div>fdsfdsfsdf sfsfsf jksf fds </div>
        </div >
    );
};
export default IndexPage;