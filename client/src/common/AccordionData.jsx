import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 

const accordionData = [
    {
      id: "panel1",
      header: "Hyderabad to Vizag",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    },
    {
      id: "panel2",
      header: "Hyderabad to Goa",
      details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
    }
    // Add more data as needed
  ];


function AccordionData() {
  return (
    <div className='container'>
          <div >
                {accordionData.map((item) => (
                    <Accordion key={item.id} sx={{
                        '&:hover': { backgroundColor: '#018AD3', color: '#FFF' }
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${item.id}-content`}
                            id={`${item.id}-header`}
                        >
                            <Typography>{item.header}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {item.details}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
    </div>
  )
}

export default AccordionData
