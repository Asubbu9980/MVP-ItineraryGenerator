import React from 'react'
import Chip from '@mui/material/Chip';
// import { TextField, Button, Container, Grid, Box } from '@mui/material';
import { Box } from '@mui/material';

function Searchhistory() {
    const chipData = [
        {
          "id": 1,
          "label": "Hyderabad to Vizag"
        },
        {
          "id": 2,
          "label": "Hyderabad to Goa"
        },
        {
          "id": 3,
          "label": "Banglore to Delhi"
        },
        {
            "id": 4,
            "label": "Hyderabad to Vizag"
          },
          {
            "id": 5,
            "label": "Hyderabad to Goa"
          },
          {
            "id": 6,
            "label": "Banglore to Delhi"
          }
      ];
    
    return (
        <div className='container p-0'>
            <Box className='searchHistory' >
                <h6 style={{ color: '#fff', fontWeight: 'bold' }}>Recent Search</h6>
                <div className='moveing' >
                 {chipData.map(item => (
                    <Chip key={item.id} label={item.label} variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} />
                  ))}

</div>
             </Box>

        
        </div>
    )
}

export default Searchhistory