import React from 'react';
import Modal from '@mui/material/Modal';
// import MicIcon from '@mui/icons-material/Mic';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Search, Mic } from '@mui/icons-material';
import "./Itinerary.css"

const StyledModal = styled(Modal)({
    width: '500px',
    height: '400px',
    backgroundColor: '#5d5d5d',
    borderRadius: '10px',

});

const VoiceIcon = {
    fontSize: '10px !important',
    color: 'white',
    backgroundColor: 'red',
    borderRadius: '50%',
    border: '0px',
    width: '60px',
    height: '60px',
    padding: '15px', // You can adjust the padding as needed
    '&:hover': {
        backgroundColor: 'darkred',
    },

};
const CloseButton = styled(CloseIcon)({
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: 30,
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
        color: 'lightgray',
    },
});

const VoiceContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
}
const searchButton = {
    border: '0px',
    borderRadius: '100%',
    width: '50px',
    height: '50px',
    padding: '15px',
}



const SpeechRecognitionModal = ({ onStartSpeechRecognition, isOpen = false, onClose, speechText = null, onVoiceSearchTripPlan, isValidDestination }) => {
    const handleVoiceIconClick = () => {
        // Handle voice recognition logic here
        onStartSpeechRecognition()
        // console.log('Voice icon clicked');
    };

    return (
        <StyledModal open={isOpen} onClose={onClose} className='mx-auto mt-4 p-3 speech-recognition-modal-container'>
            <div style={VoiceContainer} >
                {speechText ? !isValidDestination ? <h5 className='text-white text-center'>{speechText}</h5> : <div> <h6 className='text-danger text-center'>Currently We Don't have any trip plan for this destination...</h6> <p className='text-center text-white mt-3'>Please Try another destination </p></div> : <h4 className='text-white text-center'>Listening...</h4>}

                <CloseButton onClick={onClose} />
                <div className='d-flex align-items-center'>
                    {/* <Mic sx={VoiceIcon} onClick={handleVoiceIconClick} /> */}
                    <div className='position-relative'>
                        <Mic
                            sx={VoiceIcon}
                            onClick={handleVoiceIconClick}

                            className='voice-icon'
                        />
                        <div className={`${!isValidDestination ? 'mice-button' : ''}`}>
                        </div>
                    </div>

                    {(speechText && !isValidDestination) ? <button title="Search" onClick={() => {
                        onVoiceSearchTripPlan(speechText)
                    }} style={searchButton} className='p-2 ms-4'>
                        <Search />
                        <span className="a11y-hidden">Search</span>
                    </button> : null}
                </div>
            </div>
        </StyledModal>
    );
};

export default SpeechRecognitionModal;

// export default SpeechRecognitionModal;
