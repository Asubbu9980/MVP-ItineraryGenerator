import React from 'react'
import searchIocn from "../../assets/search-icon.svg";
import '../homeSearch/homeSearch.css'
// import '../homeSearch/sliderbanner.css'

const NoTripDataAvailable = () => {
    return (
        <div className='search_info'>

            <img src={searchIocn} alt='logo' />

            <h5>No Trip Data available <br />

                Please check for other popular locations.</h5>

        </div>
    )
}

export default NoTripDataAvailable