import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import '../pages/chatbot/chatbotKit.css'
// import "../pages/chatbot/chatbot.scss"

const SuggestedCities = ({ aiExtractedInfo = {},handleSelectedDestination={} , handleSelectedSource={}, showSuggestedCities=false, setShowSuggestedCities={} }) => {

  const [selectedSource, setSelectedSource]=useState(null);
  const [selectedDestination, setSelectedDestinaion]=useState(null)

//   useEffect(() => {
//     console.log(aiExtractedInfo, "aiExtractedInfo");
//   }, []);


  const handleClose = () => {
    setShowSuggestedCities(false)
  };

  return (
    <React.Fragment>
      <Dialog open={showSuggestedCities} onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}>
        {/* <DialogTitle> Suggested Cities</DialogTitle> */}
        <Box sx={{display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
        <Typography sx={{padding:1}}>Suggested Cities</Typography>
        {/* <Box> */}
        <CloseIcon  sx={{margin:1 , cursor:"pointer"}} onClick={handleClose} />
        {/* </Box> */}
       
        {/* <Button onClick={handleClose}></Button> */}
        </Box>
      
        <DialogContent>
          <DialogContentText>
            {aiExtractedInfo?.destination_close_match?.length ? <Typography  >Destination</Typography>:null}
            {aiExtractedInfo?.destination_close_match?.length ?
              aiExtractedInfo?.destination_close_match.map((city) => {
                return <div className={`suggested-item ${selectedDestination==city && 'selected-suggestion'}`} onClick={()=>(handleSelectedDestination(city), setSelectedDestinaion(city))}>{city}</div>;
              }):null}
            {aiExtractedInfo?.source_close_match?.length ? <Typography sx={{margin:1}} >Source</Typography>:null}
            {aiExtractedInfo?.source_close_match?.length ?
              aiExtractedInfo?.source_close_match?.map((city) => {
                return <div  className={`suggested-item ${selectedSource==city && 'selected-suggestion'}`} onClick={()=>(handleSelectedSource(city),setSelectedSource(city))}>{city}</div>;
              }):null}
              {!aiExtractedInfo?.destination_close_match?.length && !aiExtractedInfo?.source_close_match?.length && <Typography>No valid city found , please modify your search...</Typography>}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
};

export default SuggestedCities;
