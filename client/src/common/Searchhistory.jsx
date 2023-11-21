import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
// import { TextField, Button, Container, Grid, Box } from '@mui/material';
import { getRecentTripDetailsApi } from '../helpers/trip_helper';

import { Box } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


function Searchhistory({ setTripData, tripData, searchHistoryClassName = 'searchHistory', containerType = 'container', setBannerHeight = () => { } }) {
  const [recentSearchesTripData, setrecentSearchesTripData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const chipData = [
  //   {
  //     "id": 1,
  //     "label": "Hyderabad to Vizag"
  //   },
  //   {
  //     "id": 2,
  //     "label": "Hyderabad to Goa"
  //   },
  //   {
  //     "id": 3,
  //     "label": "Banglore to Delhi"
  //   },
  //   {
  //     "id": 4,
  //     "label": "Hyderabad to Vizag"
  //   },
  //   {
  //     "id": 5,
  //     "label": "Hyderabad to Goa"
  //   },
  //   {
  //     "id": 6,
  //     "label": "Banglore to Delhi"
  //   }
  // ];
  useEffect(() => {
    // setIsLoading(true)
    getResult()
  }, [tripData])

  console.log(tripData, 'tripDatafghjkl;')

  const getResult = () => {

    try {
      getRecentTripDetailsApi().then((r) => {
        // console.log("RecentSearches Resp", r);

        const res = r?.data

        let updatedResData = []

        res?.forEach((eachRes) => {
          let recentSearchData = {}
          recentSearchData['input'] = JSON.parse(eachRes.input)
          recentSearchData['output'] = {}
          recentSearchData['output']['places_visited'] = JSON.parse(eachRes.output).activities
          recentSearchData['createdAt'] = eachRes.createdAt
          updatedResData.push(recentSearchData)
        })
        // console.log(JSON.parse(res[0].input), "response 2")
        // console.log(updatedResData, "updatedResData")
        setIsLoading(false)
        if (updatedResData.length > 0) {
          setBannerHeight('550px')
        } else {
          setBannerHeight('380px')
        }
        setrecentSearchesTripData(updatedResData)

      }).then((e) => {
        setIsLoading(false)
      })

    } catch (error) {

    }

  }
  //console.log(recentSearchesTripData, "recentChip")
  const onChangeTheSelectedTripData = (data) => {

    setTripData(data)
    // console.log(data, "asdfghjkdfghjk")
  }
  return (
    <div className={`${containerType} p-0`}>
      {!isLoading ? <>
        {recentSearchesTripData.length > 0 ?
          <Box className={`${searchHistoryClassName}`} >
            <div className={`${containerType !== 'container' ? 'container overflow-hidden px-3' : ''}`}>
              <h6 style={{ color: '#fff', fontWeight: 'bold' }}>Recent Searches</h6>
              {/* {recentSearchesTripData.length > 0 ? */}
              <div className='moveing' >
                {recentSearchesTripData.map(item => (
                  <Chip className='mx-2' onClick={() => onChangeTheSelectedTripData(item.output)} key={item.createdAt} label={`${item.input.source}  to  ${item.input.destination}  from  ${item.input.start_date}  to  ${item.input.end_date},`} variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} />
                ))}

              </div>
              {/* : null} */}
              <div className='text-center pt-3'>
                <Link to='/recent-searches' className='text-decoration-none ' >
                  <Button variant='contained' size='small' className='search-view-all-btn'>View All<ArrowRightAltIcon /></Button>
                </Link>
              </div>

            </div>
          </Box> : null}
      </> : <div className='text-center mt-5'><CircularProgress variant="solid" /></div>}


    </div>
  )
}

export default Searchhistory