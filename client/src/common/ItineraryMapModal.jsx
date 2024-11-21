
import {React,useState,useCallback,useEffect} from 'react';
// import Button from '@mui/joy/Button';
import { GoogleMap, Marker, useJsApiLoader,InfoWindow } from "@react-google-maps/api";
// import Modal from '@mui/joy/Modal';
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
  const [coordinatesData, setCoordinates] = useState([])

    const containerStyle = {
        width: '100%',
        height: '500px',
      position: 'absolute',
      overflow: 'hidden',
      borderRadius: '10px',
      };
      

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,

      })

      useEffect(() => {
        if(props.data)
        onChangeModalState(props.data)
      },[props.data])

      useEffect(() => { 
        if(props.mapInfoWindow){
          const { lat, lng, title } = props.mapInfoWindow;
          if(lat!=='' && lng !=='' && title !==''){ 
        mapRef?.panTo({ lat, lng });
        //console.log("address",title);
        setInfoWindowData({lat, lng, address:title });
          setIsOpen(true)
          }else{
            setInfoWindowData(null)
            setIsOpen(false)
          }
        }
        },[props.mapInfoWindow])

      const onChangeModalState = (data) => {
        if (data != null) {
            // const mainCoordinateLat = data.coordinates.lat.replace("° N", "");
            // const mainCoordinateLng = data.coordinates.lng.replace("° E", "");
            // console.log("mainCoordinate", mainCoordinateLat);
            const locationData = [];
            // locationData.push(
            //     {
            //         "title": data.coordinates.title,
            //         "lat": parseFloat(mainCoordinateLat),
            //         "lng": parseFloat(mainCoordinateLng)
            //     },
            // )

            if (data?.popular_places && data?.popular_places?.length > 0) {
              data?.popular_places?.forEach(element => {
                if(element?.place_info?.length>0){
                  locationData.push({
                      "title": element?.place_info[0]?.name,
                      "lat": parseFloat(element?.place_info[0]?.geometry?.location?.lat),
                      "lng": parseFloat(element?.place_info[0]?.geometry?.location?.lng)
                  })
                }
              });
          }
            if (data?.accommodation && data?.accommodation.length > 0) {
                data?.accommodation.forEach(element => {
                  if(element?.place_info?.length>0){
                    locationData.push({
                        "title": element?.place_info[0]?.name,
                        "lat": parseFloat(element?.place_info[0]?.geometry?.location?.lat),
                        "lng": parseFloat(element?.place_info[0]?.geometry?.location?.lng)
                    })
                  }
                });
            }
            if (data?.food_choices && data?.food_choices.length > 0) {
                data?.food_choices.forEach(element => {
                    // locationData.push({
                    //     "title": element.coordinates.title,
                    //     "lat": parseFloat(element.coordinates.lat),
                    //     "lng": parseFloat(element.coordinates.lng)
                    // })
                    if(element?.place_info?.length>0){
                      locationData.push({
                          "title": element?.place_info[0]?.name,
                          "lat": parseFloat(element?.place_info[0]?.geometry?.location?.lat),
                          "lng": parseFloat(element?.place_info[0]?.geometry?.location?.lng)
                      })
                    }
                });
            }
            if (locationData.length > 0) {
                setCoordinates(locationData)
                // setModelState(true)
            }
        }
    }

      

      // const [map, setMap] = useState(null)
      const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds();
        if(coordinatesData && coordinatesData.length >0 ){
             coordinatesData?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        }
        map.fitBounds(bounds);
        setMapRef(map)
      }, [coordinatesData])
    
      const onUnmount =useCallback(function callback(map) {
        setMapRef(null)
      }, [coordinatesData])

      const handleMarkerClick = (id, lat, lng, address) => {
        mapRef?.panTo({ lat, lng });
        console.log("address",address);
        setInfoWindowData({ id,lat, lng, address });
        setIsOpen(true);
      };
    // console.log("props", props);
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    // const mapStyles = {
    //     width: '96%',
    //     height: '88%',
    //     overflow: 'visible !important'
    // };

    // console.log(coordinatesData, "MapCoordinates 1")


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
            {/* <Modal
                open={props.open}
                onClose={props.onCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='custom-map-modal'
            > */}
                <Box className="map-modal">
                { isLoaded ? (
                        coordinatesData.length >0?<GoogleMap
                            mapContainerStyle={containerStyle}
                            // center={center}
                            center={{ lat: coordinatesData[0]['lat'], lng: coordinatesData[0]['lng'] }}
                            zoom={7}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                        >
                             {coordinatesData.length > 0 && coordinatesData.map(({ lat, lng,title },index) => {
                              return <Marker key={index} position={{lat:lat, lng:lng}} onClick={(e) => {
                                handleMarkerClick(index, lat, lng, title);
                              }}>
                                {coordinatesData?.length > 0 &&infoWindowData  && infoWindowData?.lat === lat && infoWindowData?.lng === lng && (
                <InfoWindow
                position={{ lat: infoWindowData?.lat, lng: infoWindowData?.lng }}
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h4>{infoWindowData?.address}</h4>
                </InfoWindow>
              )}
            </Marker>
                             })}
          
                        </GoogleMap>:null
  ) : <></>}
                </Box>
            {/* </Modal> */}
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

//     // console.log(coordinatesData, "MapCoordinates")


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
//                         {coordinatesData.length > 0 ? coordinatesData.map((point, index) => {
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
