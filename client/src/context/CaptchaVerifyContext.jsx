// import { Backdrop, CircularProgress } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

const CaptchaContext = createContext({ isCaptchaVerified: false });
export const useCaptchaContext = () => useContext(CaptchaContext);

export const CaptchaProvider = ({ children }) => {
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    return (
        <CaptchaContext.Provider value={{ isCaptchaVerified, setIsCaptchaVerified }} >
            {children}
        </CaptchaContext.Provider>
    )

}
export default CaptchaContext;