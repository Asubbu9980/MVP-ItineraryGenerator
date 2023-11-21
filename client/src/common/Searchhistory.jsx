import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
// import { TextField, Button, Container, Grid, Box } from '@mui/material';
import { getRecentTripDetailsApi } from '../helpers/trip_helper';

import { Box } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import { Link } from 'react-router-dom'
// import { Button } from '@mui/material';
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
          setBannerHeight('530px')
        } else {
          setBannerHeight('380px')
        }
        const sortedDesc = updatedResData.sort((objA, objB) => {
          const date1 = new Date(objA.createdAt);
          const date2 = new Date(objB.createdAt);
          return (Number(date2) - Number(date1))

        });
        //console.log(sortedDesc, 'sortedDesc')
        setrecentSearchesTripData(sortedDesc.slice(0, 6))

      }).then((e) => {
        setIsLoading(false)
      })

    } catch (error) {

    }

  }
  // console.log(recentSearchesTripData, "recentChip")
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
              <div className='d-flex justify-content-between align-items-center'>
                <h6 style={{ color: '#fff', fontWeight: 'bold' }}>Recent Searches</h6>

                <Link to='/recent-searches' className=' search-view-all-btn' >
                  {/* <Button variant='outlined' size='small' className='search-view-all-btn'> */}
                  View All<ArrowRightAltIcon />
                  {/* </Button> */}
                </Link>
              </div>
              {/* {recentSearchesTripData.length > 0 ? */}
              <div className='row moveing' >
                {recentSearchesTripData.map(item => (
                  <div className='col-12 col-lg-6 col-xl-4'><Chip className='mx-1 my-2' onClick={() => onChangeTheSelectedTripData(item.output)} key={item.createdAt} label={`${item.input.source}  to  ${item.input.destination}  from  ${item.input.start_date}  to  ${item.input.end_date},`} variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} /></div>

                ))}

              </div>
              {/* : null} */}


            </div>
          </Box> : null}
      </> : <div className='text-center mt-5'><CircularProgress variant="solid" /></div>}


    </div>
  )
}

export default Searchhistory