import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
// import { TextField, Button, Container, Grid, Box } from '@mui/material';
import { getRecentTripDetailsApi } from '../helpers/trip_helper';

import { Box } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';



function Searchhistory({ setTripData }) {
  const [recentSearchesTripData, setrecentSearchesTripData] = useState([]);

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

    getResult()
  }, [])

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

        setrecentSearchesTripData(updatedResData)
      }).then((e) => {
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
    <div className='container p-0'>
      <Box className='searchHistory' >
        <h6 style={{ color: '#fff', fontWeight: 'bold' }}>Recent Searches</h6>
        {recentSearchesTripData.length > 0 ? <div className='moveing' >
          {recentSearchesTripData.map(item => (
            <Chip onClick={() => onChangeTheSelectedTripData(item.output)} key={item.createdAt} label={`${item.input.source}  to  ${item.input.destination}  from  ${item.input.start_date}  to  ${item.input.end_date},`} variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} />
          ))}

        </div> : <div className='text-center pt-2'><CircularProgress variant="solid" /></div>}
        {recentSearchesTripData.length > 0 ? <div className='text-center pt-2'>
          <Link to='/recent-searches' className='text-decoration-none ' >
            <Button variant='contained' size='small'>View All</Button>
          </Link>
        </div> : null}


      </Box>


    </div>
  )
}

export default Searchhistory