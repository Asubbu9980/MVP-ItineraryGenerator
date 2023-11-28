import React from 'react';
import Slider from 'react-slick';
// import './ProductSlider.css';



import agraImage from '../assets/agra.jpg'
import delhiImage from '../assets/delhi.jpg'
import hydImage from '../assets/hyderabad.jpg'
import goaImage from '../assets/goa.jpg'

const ProductSlider = () => {
    // Sample product data

    
    const products = [
        {
            id: 1,
            name: 'Product 1',
            image: agraImage,
            price: '$19.99',
            title: 'Product 1 Title',
        },
        {
            id: 2,
            name: 'Product 2',
            image: delhiImage,
            price: '$29.99',
            title: 'Product 2 Title',
        },
        {
            id: 3,
            name: 'Product 3',
            image: hydImage,
            price: '$29.99',
            title: 'Product 2 Title',
        },
        {
            id: 4,
            name: 'Product 4',
            image: goaImage,
            price: '$29.99',
            title: 'Product 2 Title',
        },
        {
            id: 5,
            name: 'Product 5',
            image: delhiImage,
            price: '$29.99',
            title: 'Product 2 Title',
        },
        {
            id: 6,
            name: 'Product 6',
            image: delhiImage,
            price: '$29.99',
            title: 'Product 2 Title',
        },
        // Add more products as needed
    ];

    // Slick settings
    const settings = {
      
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        speed: 500,
        rows: 3,
        slidesToShow: 1,
       };

    return (
        <div>
            <div className="ProductSlider">
                <Slider {...settings}>
                    {products.map((product) => (
                        <div key={product.id} >
                            <div className='slick-slideer test'>
                                <div className='imageSliders'>
                                    <img src={product.image} />
                                </div>
                                <div className='sliderContent'>
                                    <h3>{product.name}</h3>
                                    <p>{product.price}</p>
                                    <p>{product.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductSlider;
