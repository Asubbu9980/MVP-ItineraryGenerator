import React, { useEffect, useState } from 'react'
import { getRecentTripDetailsApi } from '../../helpers/trip_helper';
// import LoaderContext from '../../context/LoaderContext';
import AccordionData from '../../common/AccordionData';
import Typography from '@mui/material/Typography';
import { Backdrop, CircularProgress } from '@mui/material';


const LoaderBackdrop = {
    color: '#fff',
    zIndex: 1350
}

const Index = () => {
    const [recentSearchesTripData, setrecentSearchesTripData] = useState([]);
    // const loaderContext = useContext(LoaderContext);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true)
        getResult()
    }, [])

    const getResult = () => {

        try {
            getRecentTripDetailsApi().then((r) => {
                console.log("RecentSearches Resp", r);
                setIsLoading(false);
                const res = r?.data

                let updatedResData = []

                res?.forEach((eachRes) => {
                    let recentSearchData = {}
                    recentSearchData['input'] = JSON.parse(eachRes.input)
                    recentSearchData['output'] = {}
                    recentSearchData['output']['places_visited'] = JSON.parse(eachRes.output).activities
                    recentSearchData['createdAt'] = eachRes.createdAt
                    updatedResData.push(recentSearchData)
                })
                // console.log(JSON.parse(res[0].input), "response 2")
                // console.log(updatedResData, "updatedResData")

                const sortedDesc = updatedResData.sort((objA, objB) => {
                    const date1 = new Date(objA.createdAt);
                    const date2 = new Date(objB.createdAt);
                    return (Number(date2) - Number(date1))

                });

                setrecentSearchesTripData(sortedDesc)
            }).then((e) => {
                setIsLoading(false)
            })

        } catch (error) {
            setIsLoading(false)
        }
        finally {
            // setIsLoading(false)
        }
    }

    // console.log(tripData, 'tripData')
    return (
        <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px', minHeight: '89vh' }}>
            {!isLoading ? <>
                {recentSearchesTripData?.length > 0 ?
                    <>
                        <Typography className='text-center fw-semibold my-3' sx={{ fontSize: '25px' }}>Recent Search Itineraries</Typography>

                        {
                            recentSearchesTripData.map((eachTrip, index) => <AccordionData recentTripData={eachTrip} key={index} />)
                        }
                    </>
                    :
                    <div>
                        <Typography className='text-center fw-semibold my-5'>No itineraries found in your account.</Typography>
                    </div>}
            </> :
                <Backdrop sx={LoaderBackdrop} open={isLoading}>
                    <CircularProgress size={50} color="inherit" />
                </Backdrop>
            }

        </div>
    )
}

export default Index