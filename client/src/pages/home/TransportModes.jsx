import * as React from 'react';
// import Avatar from '@mui/joy/Avatar';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
function TransportModes() {
    const transportData = [
        {
            id: '1',
            item: 'Flight',
            item_icon: 'flight-icon ',
        },
        {
            id: '2',
            item: 'Car',
            item_icon: 'car-icon ',
        },
        {
            id: '3',
            item: 'Bus',
            item_icon: 'bus-icon ',
        },
        {
            id: '4',
            item: 'Train',
            item_icon: 'train-icon ',

        },
    ];
    return (
        <div className='radio_sheets'>
            <RadioGroup
                aria-label="platform"
                defaultValue="Website"
                overlay
                name="platform"
                sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 2,
                    [`& .${radioClasses.checked}`]: {
                        [`& .${radioClasses.action}`]: {
                            inset: -1,
                            border: '1px solid',
                            borderColor: '#018AD3',
                            borderRadius: '4px',


                        },
                    },
                    [`& .${radioClasses.radio}`]: {
                        display: 'contents',
                        '& > svg': {
                            zIndex: 2,
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            bgcolor: 'background.surface',
                            borderRadius: '4px',
                        },
                    },
                }}
            >


                {transportData.map((info) => (
                    <Sheet
                        key={info.id}
                        variant="outlined"
                        className="radio_btn"
                    >
                        <Radio id={info.id} value={info.item} checkedIcon={<CheckCircleRoundedIcon />} />
                        <span className={`radio-icon ${info.item_icon}`}></span>
                        <FormLabel htmlFor={info.item}>{info.item}</FormLabel>
                    </Sheet>
                ))}
            </RadioGroup>
        </div>
    )
}

export default TransportModes
