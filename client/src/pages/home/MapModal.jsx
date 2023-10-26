
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { Box } from '@mui/material';
import btn_directions from "../../assets/btn-directions.png"
import '../home/home.css'

const MapModal = ({ open, onCloseModal }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={onCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='custom-map-modal'
            >
                <Box className="map-modal">
                    <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3846.928583897875!2d73.8303818!3d15.3803536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc7fa8c0cf84d%3A0xb7d429222d347557!2sGoa%20International%20Airport!5e0!3m2!1sen!2sin!4v1697797179508!5m2!1sen!2sin" width="600" height="450" style={{ border: '0', width: '100%', height: '300px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='map_btns' >
                        <Button type='button' className='btn-close'> Close</Button>
                        <Button type='button' className='btn-start'>   <img src={btn_directions} style={{ marginRight: '8px' }} alt='btn_directions' />    Start</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default MapModal