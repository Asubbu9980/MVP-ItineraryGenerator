import React, { useContext } from 'react'
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { TripPayloadContext } from '../../context/TripDataContext';


const TripDataRadioGroup = ({ fieldName = '', data = [] }) => {

    const { tripPayloadState, setTripPayloadState } = useContext(TripPayloadContext);

    const handleChangeTripPayloadState = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'activities') {
            setTripPayloadState((prevState) => ({
                ...prevState,
                activities: checked
                    ? [...prevState.activities, value]
                    : prevState.activities.filter((n) => n !== value),
            }));
        } else {
            setTripPayloadState((prevState) => ({ ...prevState, [name]: value }));
        }
    }

    return (
        <>
            <RadioGroup
                aria-labelledby={fieldName}
                // defaultValue="Goa"
                size="lg"
                sx={{ gap: 1.5, flexWrap: 'wrap' }}
                value={tripPayloadState[fieldName]}
                name={fieldName}
                onChange={handleChangeTripPayloadState}
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
            >
                {data.map((info) => (
                    <div className='box'>
                        <Sheet
                            key={info.id}
                            className='radioSheet'
                            sx={{
                                p: 1,
                                borderRadius: '8px',
                                // height: '140px',
                                border: '1px solid #D3D3D3',
                            }}
                            style={{ backgroundImage: fieldName !== 'trip_status_type' ? `url(${info.url})` : '', }}
                        >
                            {fieldName === 'trip_status_type' || fieldName === 'food_type' ? <span className='img' ><img src={info.url} alt='' width={25} style={{ display: 'block', marginRight: '5px' }} /></span> : null}

                            <Radio
                                label={`${info.item}`}
                                overlay
                                disableIcon
                                value={info.item}
                                slotProps={{
                                    label: ({ checked }) => ({
                                        className: 'radioLabel',
                                        sx: {
                                            color: checked ? 'text.primary' : 'text.secondary',
                                        },
                                    }),
                                    action: ({ checked }) => ({
                                        className: 'radioButton',
                                        sx: (theme) => ({
                                            ...(checked && {
                                                '--variant-borderWidth': '5px',
                                                '&&': {
                                                    // className: '',
                                                    // && to increase the specificity to win the base :hover styles
                                                    // borderColor: theme.vars.palette.primary[500],
                                                },
                                            }),
                                        }),
                                    }),
                                }}
                            />
                        </Sheet>
                    </div>
                ))}
            </RadioGroup>
        </>
    )
}

export default TripDataRadioGroup