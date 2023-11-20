import React from 'react'
import {Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
const ItinerarySkeleton = () => {
    return (
        <div style={{ background: '#F3F4F6', paddingBottom: '32px', paddingTop: '20px' }}>
            <div>
                <Container>
                    <h2 style={{ marginBottom: '32px' }}>Your Plan Details</h2>
                </Container>
            </div>
            <Container>
                <Card className='tripDetails-grid' sx={{ padding: '20px', borderRadius: '25px' }}>
                    <ul>
                        <li className='tripDetails-item ItinerarySkeleton'>
                            <div className="dot">
                                <div className="center"></div>
                                <div className="ring"></div>
                            </div>
                            <div className='recommended-stay'>
                                <Skeleton variant="rectangular" width={150} height={32} style={{ borderRadius: '10px' }} />
                            </div>
                            <h5>
                                <Skeleton variant="text" width={400} height={40} />
                            </h5>
                            {/* Description */}
                            <div className='mt-2 mb-0 pb-0'>
                                <p className='w-100 m-0'><Skeleton variant="text" width={'80%'} /></p>
                                <p className='w-100 m-0'><Skeleton variant="text" width={'70%'} /></p>
                                <p className='w-100 m-0'><Skeleton variant="text" width={'60%'} /></p>
                            </div>
                            <div className=''>
                                <h3 className='moreInfoHeading mt-4 mb-3'>
                                    <Skeleton variant="text" width={250} height={35} />
                                </h3>
                                <div className='mb-4'>
                                    <h6 className='my-2 mb-4 trip-hotel-title d-flex gap-2'>
                                        <Skeleton variant="circular" width={32} height={32} />
                                        <Skeleton variant="text" width={300} height={30} />
                                    </h6>
                                    <ul className="d-flex flex-wrap p-0 gap-1">
                                        {/*  Chip   */}
                                        <Skeleton variant="rectangular" width={100} height={30} style={{ borderRadius: '8px' }} />
                                        <Skeleton variant="rectangular" width={100} height={30} style={{ borderRadius: '8px' }} />
                                        <Skeleton variant="rectangular" width={100} height={30} style={{ borderRadius: '8px' }} />
                                    </ul>
                                </div>
                                <div className='mb-4'>
                                    <h6 className='my-2 mb-4 trip-hotel-title d-flex gap-2'>
                                        <Skeleton variant="circular" width={32} height={32} />
                                        <Skeleton variant="text" width={300} height={30} />
                                    </h6>
                                    <ul className="d-flex flex-wrap p-0 gap-1">
                                        {/*  Chip   */}
                                        <Skeleton variant="rectangular" width={100} height={30} style={{ borderRadius: '8px' }} />
                                        <Skeleton variant="rectangular" width={100} height={30} style={{ borderRadius: '8px' }} />
                                        <Skeleton variant="rectangular" width={100} height={30} style={{ borderRadius: '8px' }} />
                                    </ul>
                                </div>
                                <div className='mb-4'>
                                    <h6 className='my-2 mb-4 trip-hotel-title d-flex gap-2'>
                                        <Skeleton variant="circular" width={32} height={32} />
                                        <Skeleton variant="text" width={300} height={30} />
                                    </h6>
                                    <ul className="d-flex flex-wrap p-0 gap-2">
                                        <Card className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                            <CardContent className='p-2'>
                                                <Typography variant="h6" component="h6" >
                                                    <Skeleton variant="text" width={300} height={30} />
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={260} height={30} />
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={240} height={30} />
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                            <CardContent className='p-2'>
                                                <Typography variant="h6" component="h6" >
                                                    <Skeleton variant="text" width={300} height={30} />
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={260} height={30} />
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={240} height={30} />
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ul>
                                </div>
                                <div className='mb-4'>
                                    <h6 className='my-2 mb-4 trip-hotel-title d-flex gap-2'>
                                        <Skeleton variant="circular" width={32} height={32} />
                                        <Skeleton variant="text" width={300} height={30} />
                                    </h6>
                                    <ul className="d-flex flex-wrap p-0 gap-2">
                                        <Card className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                            <CardContent className='p-2'>
                                                <Typography variant="h6" component="h6" >
                                                    <Skeleton variant="text" width={300} height={30} />
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={260} height={30} />
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={240} height={30} />
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                            <CardContent className='p-2'>
                                                <Typography variant="h6" component="h6" >
                                                    <Skeleton variant="text" width={300} height={30} />
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={260} height={30} />
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={240} height={30} />
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ul>
                                </div>
                                <div className='mb-4'>
                                    <h6 className='my-2 mb-4 trip-hotel-title d-flex gap-2'>
                                        <Skeleton variant="circular" width={32} height={32} />
                                        <Skeleton variant="text" width={300} height={30} />
                                    </h6>
                                    <ul className="d-flex flex-wrap p-0 gap-2">
                                        <Card className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                            <CardContent className='p-2'>
                                                <Typography variant="h6" component="h6" >
                                                    <Skeleton variant="text" width={300} height={30} />
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={260} height={30} />
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={240} height={30} />
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card className='shadow-sm' sx={{ maxWidth: 345, borderRadius: '4px', border: '1px solid #rgba(0, 0, 0, 0.11)', backgroundColor: 'rgb(225 223 223 / 10%)' }}>
                                            <CardContent className='p-2'>
                                                <Typography variant="h6" component="h6" >
                                                    <Skeleton variant="text" width={300} height={30} />
                                                </Typography>
                                                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={260} height={30} />
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px', marginBottom: '5px' }}>
                                                    <Skeleton variant="text" width={240} height={30} />
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Card>
            </Container>
        </div>
    )
}
export default ItinerarySkeleton