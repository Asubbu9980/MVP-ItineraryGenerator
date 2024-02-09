// import React from 'react'

// function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

// const ChatGptResponse = ({ response }) => {
//     // console.log(response.split("."), 'ChatGptResponse')

//     const serialNumbers = ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.']

//       const isOptionsRelated = serialNumbers.some(keyword => response.includes(keyword));
//     console.log(isOptionsRelated, "isOptionsRelated")

//     if (isOptionsRelated) {
//         const responseArray = response?.split(".")
//         const filteredArray = responseArray?.filter(res => isNumber(res) !== true)
//         return (
//             <div className='p-3' style={{ width: '100%' }}>
//                 {(filteredArray && filteredArray?.length > 0) ? <>
//                     {filteredArray?.map((res, index) => <p key={index}>{res !== "" ? `${index + 1} : ` : ''}  {res ? `${res}.` : ''}</p>)}
//                 </> : null}
//             </div>
//         )
//     } else {
//         return (
//             <>
//                 {response}
//             </>
//         )
//     }


// }

// export default ChatGptResponse




import React from 'react';

const ChatGptResponse = ({ response }) => {
    // const serialNumbersRegex = /\d+\./g;
    const serialNumbersRegex = /\d+\.\s/g;
    const serialNumbers = response?.match(serialNumbersRegex);

    const isOptionsRelated = serialNumbers !== null && serialNumbers?.length > 0;
    // console.log(response, 'isOptionsRelated');

    if (isOptionsRelated) {
        const responseArray = response?.split(serialNumbersRegex);
        // console.log(responseArray, 'responseArray');
        return (
            <div className="p-3" style={{ width: '100%' }}>
                {responseArray?.length > 0 &&
                    responseArray?.map((res, index) => {
                        const headingIndex = res?.indexOf(':');
                        return (
                            (headingIndex === -1)
                                ?
                                <p key={index}><b>{`${index !== 0 ? `${index}. ` : ''}`}</b> {res?.trim()}</p>
                                :
                                <p key={index}><b>{`${index !== 0 ? `${index}. ` : ''}`}{res?.slice(0, headingIndex + 1).trim()}</b>{' '}{res?.slice(headingIndex + 1).trim()}</p>
                        )
                    })}
            </div>
        );
    } else {
        return <>{response}</>;
    }
};

export default ChatGptResponse;

