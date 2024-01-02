import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AddIcon from '@mui/icons-material/Add';
import Itinerary from './Itinerary';
import dayjs from 'dayjs';

import './Itinerary.css';



function AccordionData({ recentTripData = {} }) {
  return (
    <div className='container-xl' key={recentTripData?.createdAt}>
      <div >
        <Accordion
          // sx={{
          //   '&:hover': { backgroundColor: '#018AD3', color: '#FFF' }
          // }}
          className='my-2'
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${recentTripData?.input?.createdAt}-content`}
            id={`${recentTripData?.input?.createdAt}-header`}
          >
            <Typography className='fw-semibold'>{`${recentTripData?.input?.source}  to  ${recentTripData?.input?.destination}  from  ${recentTripData?.input?.start_date}  to  ${recentTripData?.input?.end_date},`} <span className='fw-normal mx-1 recent-trip-created-date'>{dayjs(recentTripData?.createdAt).format('DD/MM/YYYY h:mm:ss A')}</span></Typography>
          </AccordionSummary>
          <AccordionDetails >
            <div className='pb-3 recent-searches-accordian-itinerary'>
              <Itinerary tripData={recentTripData?.output} cardBackGroundColor='#F3F4F6' />
            </div>

          </AccordionDetails>
        </Accordion>

      </div>
    </div>
  )
}

export default AccordionData
