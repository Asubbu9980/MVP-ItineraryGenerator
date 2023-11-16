import React from 'react'
import Chip from '@mui/material/Chip';
import { TextField, Button, Container, Grid, Box } from '@mui/material';

function Searchhistory() {
    return (
        <div className='container p-0'>
            <Box className='searchHistory' >
                <h6 style={{ color: '#fff', fontWeight: 'bold' }}>Recent Search</h6>
                <div style={{ display: 'flex', gap: 10 }}>
                    <Chip label="Hyderabad to Vizag" variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} />
                    <Chip label="Hyderabad to Goa " variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} />
                    <Chip label="Banglore to Delhi" variant="outlined" sx={{ borderColor: '#FFF', color: '#FFF', height: '25px', fontSize: '12px' }} />
                </div>
            </Box>
        </div>
    )
}

export default Searchhistory