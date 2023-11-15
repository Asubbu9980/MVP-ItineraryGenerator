
import {React,useState,useCallback} from 'react';
// import Button from '@mui/joy/Button';
import { GoogleMap, Marker, useJsApiLoader,InfoWindow } from "@react-google-maps/api";
import Modal from '@mui/joy/Modal';
import { Box } from '@mui/material';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import GoogleMapReact from 'google-map-react';
// import btn_directions from "../../assets/btn-directions.png"
import './Itinerary.css'
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
// const LoadingContainer = (props) => (
//     <div>Map Loactions are loading...</div>
// )

const ItineraryMapModal = (props) => {
    const containerStyle = {
        width: '100%',
        height: '400px'
      };
      

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",

      })
      

      // const [map, setMap] = useState(null)
      const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds();
        if(props.MapCoordinates && props.MapCoordinates.length >0 && props.open){
             props.MapCoordinates?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        }
        map.fitBounds(bounds);
        setMapRef(map)
      }, [props.MapCoordinates])
    
      const onUnmount =useCallback(function callback(map) {
        setMapRef(null)
      }, [props.MapCoordinates])

      const handleMarkerClick = (id, lat, lng, address) => {
        mapRef?.panTo({ lat, lng });
        console.log("address",address);
        setInfoWindowData({ id, address });
        setIsOpen(true);
      };
    console.log("props", props);
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    // const mapStyles = {
    //     width: '96%',
    //     height: '88%',
    //     overflow: 'visible !important'
    // };

    console.log(props.MapCoordinates, "MapCoordinates")


    // const onMarkerClick = (event) => {
    //     console.log(event)
    // }



    // const onInfoWindowClose = () => {

    // }
    // const getMapBounds = (map, maps, places) => {
    //     const bounds = new maps.LatLngBounds();
      
    //     places.forEach((place) => {
    //       bounds.extend(new maps.LatLng(
    //         place.geometry.location.lat,
    //         place.geometry.location.lng,
    //       ));
    //     });
    //     return bounds;
    //   };
    // const handleApiLoaded = (map, maps, places) => {
    //     // use map and maps objects
    //      // Get bounds by our places
    //      console.log("aa",places);
    //     // const bounds = getMapBounds(map, maps, places);
    //   };
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
                { isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            // center={center}
                            zoom={7}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                             {props.open && props.MapCoordinates.length > 0 && props.MapCoordinates.map(({ lat, lng,title },index) => {
                              return <Marker key={index} position={{lat:lat, lng:lng}} onClick={(e) => {
                                handleMarkerClick(index, lat, lng, title);
                              }}>
                                {props.MapCoordinates.length > 0 && isOpen && infoWindowData?.id === index && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.address}</h3>
                </InfoWindow>
              )}
            </Marker>
                             })}
          
                        </GoogleMap>
  ) : <></>}
                </Box>
            </Modal>
        </div>
    )
}

export default ItineraryMapModal

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDomfxcX--OMcX9GeVxW91L9cFmPY3r2Tw', // Replace Your API Key
//     LoadingContainer: LoadingContainer
// })(ItineraryMapModal);

// const ItineraryMapModal = (props) => {
//     console.log("props", props);
//     const mapStyles = {
//         width: '96%',
//         height: '88%',
//         overflow: 'visible !important'
//     };

//     // console.log(props.MapCoordinates, "MapCoordinates")


//     const onMarkerClick = (event) => {
//         console.log(event)
//     }



//     const onInfoWindowClose = () => {

//     }
//     return (
//         <div>
//             <Modal
//                 open={props.open}
//                 onClose={props.onCloseModal}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//                 className='custom-map-modal'
//             >
//                 <Box className="map-modal">
//                     <Map google={props.google} zoom={14}>
//                         {props.MapCoordinates.length > 0 ? props.MapCoordinates.map((point, index) => {
//                             console.log("point", point);
//                             return <Marker
//                                 key={index}
//                                 title={point.title}
//                                 name={point.title}
//                                 position={{ lat: point.lat, lng: point.lng }}
//                                 onClick={onMarkerClick}

//                             >
//                                 <InfoWindow
//                                     onClose={onInfoWindowClose}
//                                 // className={classes.infoWindow}
//                                 >
//                                     <div>kkk
//                                         <h1>{point.title}</h1>
//                                     </div>
//                                 </InfoWindow>
//                             </Marker>
//                         }) : "No"}
//                         {/* <InfoWindow onClose={(e) => onInfoWindowClose}>
//                             <div>
//                                 <h1>""</h1>
//                             </div>
//                         </InfoWindow> */}
//                     </Map>
//                     {/* <Map
//                         google={[17.3850, 78.4867]}
//                         center={[17.3850, 78.4867]}
//                         initialCenter={{
//                             lat: 17.3850,
//                             lng: 78.4867, // Default longitude
//                         }}
//                         style={mapStyles}
//                         maxZoom={7}
//                     >
                        
//                     </Map> */}

//                 </Box>
//             </Modal>
//         </div>
//     )
// }

// // export default ItineraryMapModal

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDomfxcX--OMcX9GeVxW91L9cFmPY3r2Tw', // Replace Your API Key
//     LoadingContainer: LoadingContainer
// })(ItineraryMapModal);
