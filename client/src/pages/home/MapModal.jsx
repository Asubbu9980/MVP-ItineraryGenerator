
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { Box } from '@mui/material';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import btn_directions from "../../assets/btn-directions.png"

import '../home/home.css'
const LoadingContainer = (props) => (
    <div>Map Loactions are loading...</div>
)

const MapModal = (props) => {
    const mapStyles = {
        width: '96%',
        height: '88%',
        overflow: 'visible !important'
    };

    console.log(props.MapCoordinates, "MapCoordinates")


    const onMarkerClick = (event) => {
        console.log(event)
    }



    const onInfoWindowClose = () => {

    }
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.onCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='custom-map-modal'
            >
                <Box className="map-modal">
                    <Map
                        google={props.google}
                        //center={[17.3850, 78.4867]}
                        initialCenter={{
                            lat: 17.3850,
                            lng: 78.4867, // Default longitude
                        }}
                        style={mapStyles}
                        maxZoom={7}
                    >
                        {/* {LocationsData.map((point, index) => (
                            <Marker
                                key={index}
                                title={point.title}
                                name={point.title}
                                position={{ lat: point.lat, lng: point.lng }}
                                onClick={onMarkerClick}

                            >
                                <InfoWindow
                                    onClose={onInfoWindowClose}
                                // className={classes.infoWindow}
                                >
                                    <div>kkk
                                        <h1>{point.title}</h1>
                                    </div>
                                </InfoWindow>
                            </Marker>
                        ))} */}
                    </Map>
                   
                </Box>
            </Modal>
        </div>
    )
}

// export default MapModal

export default GoogleApiWrapper({
    apiKey: 'Use_Your_Api_key', // Replace Your API Key
    LoadingContainer: LoadingContainer
})(MapModal);
