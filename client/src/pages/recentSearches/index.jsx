import React, { useEffect, useState, useContext } from 'react'
import { getRecentTripDetailsApi } from '../../helpers/trip_helper';
import LoaderContext from '../../context/LoaderContext';
import AccordionData from '../../common/AccordionData';
import Typography from '@mui/material/Typography';


const Index = () => {
    const [recentSearchesTripData, setrecentSearchesTripData] = useState([]);
    const loaderContext = useContext(LoaderContext);


    useEffect(() => {
        loaderContext.startLoading(true)
        getResult()
    }, [])

    const getResult = () => {

        try {
            getRecentTripDetailsApi().then((r) => {
                console.log("RecentSearches Resp", r);
                loaderContext.startLoading(false);
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
                console.log(updatedResData, "updatedResData")

                setrecentSearchesTripData(updatedResData)
            }).then((e) => {
                loaderContext.startLoading(false)
            })

        } catch (error) {
            loaderContext.startLoading(false)
        }
        finally {
            loaderContext.startLoading(false)
        }
    }

    // console.log(tripData, 'tripData')
    return (
        <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px', minHeight: '89vh' }}>
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

        </div>
    )
}

export default Index