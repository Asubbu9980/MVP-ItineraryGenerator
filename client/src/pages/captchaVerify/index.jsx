import React, { useContext, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useHistory } from "react-router-dom";
import CaptchaContext from '../../context/CaptchaVerifyContext.jsx';

const ReCaptchaComponent = () => {
    const history = useHistory();
    const { setIsCaptchaVerified } = useContext(CaptchaContext);
    const recaptchaRef = useRef();
    // const [captchaLoading, setCaptchaLoading] = useState(true);


    // const handleAsyncScriptOnLoad = (value) => {
    //     console.log('handleAsyncScriptOnLoad:', value)
    //     const script = document.createElement('script');
    //     script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
    //     document.body.appendChild(script);

    //     script.onload = () => {
    //         // Load reCAPTCHA once the script is loaded
    //         return new Promise((resolve, reject) => {
    //             const timeoutId = setTimeout(() => {
    //                 reject(new Error('Timeout'));
    //             }, 5000); // 5 seconds timeout

    //             window.grecaptcha.ready(() => {
    //                 clearTimeout(timeoutId);
    //                 window.grecaptcha
    //                     .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, {
    //                         action: 'submit',
    //                     })
    //                     .then(function (token) {
    //                         resolve(token);
    //                     })
    //                     .catch(err => {
    //                         console.error(err);
    //                         resolve('');
    //                     });
    //             })
    //         })
    //     }
    // }


    const handleCaptchaChange = (value) => {
        if (value !== null) {
            setIsCaptchaVerified(true);
            history.push('/chatbot')
            // value.preventDefault();
        }
    };

    const handleAsyncScriptOnLoad = (value) => {
        console.log('handleAsyncScriptOnLoad:', value)
        // return new Promise(resolve => {
        //     window.grecaptcha
        // .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, {
        //     action: 'submit',
        // })
        // .then(function(token) {
        //     resolve(token);
        // })
        // .catch(err => {
        //     console.error(err);
        //     resolve('');
        // });})
    }
    const handleOnExpired = (value) => {
        recaptchaRef.current.reset();
    }
    const handleOnErrored = (value) => {
        console.log('handleOnErrored:', value)
    }

    return (
        <div style={{ minHeight: '80vh', width: '100%' }} className='d-flex align-items-center justify-content-center'>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
                type="image"
                asyncScriptOnLoad={() => handleAsyncScriptOnLoad('asyncScriptOnLoad')}
                onExpired={() => handleOnExpired('onExpired')}
                onErrored={() => handleOnErrored('onErrored')}
            />
        </div>
    );
};

export default ReCaptchaComponent;
