const {
    commonResponse
} = require('../utils/Response.utils');
const { openai } = require('../openai.js');

class tripController {
    removeNewlines = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].replace(/\n\n/g, '');
            }
        }
    }
    generate = async (req, res, next) => {
        try {
            const response = await openai.createCompletion({
                model: 'gpt-3.5-turbo-instruct',
                // prompt: `Goa Trip Itinerary in json array of objects format without newlines\n\n[ `,
                prompt: `Goa Trip  Itinerary as json response `,
                max_tokens: 3050,
                temperature: 0,
                // "model": "gpt-3.5-turbo",
                // "messages": [
                //     {
                //         "role": "user",
                //         "content": "Goa Trip Itinerary in json format"
                //     }
                // ],
                // format: "json",
                // "reasoning": true,
                // "final_answer": true
            });
            // const lines = response.data.choices[0].text.toString().split('\n').filter(line => line.trim() !== '');
            // console.log("response", response.data.choices[0].text);
            // console.log("lines", lines);
            const reData = JSON.parse(response.data.choices[0].text);
            // const stringWithoutNewlines = reData.replace(/[\n\r!@#$%^&*()]/g, '');
            // obj.forEach(.removeNewlines);
            // console.log(JSON.stringify(obj, null, 2));
            return commonResponse({
                req,
                res,
                status: true,
                data: [reData],
                statusCode: 200,
            })
        } catch (error) {
            console.log("Error", error);
            return commonResponse({
                req,
                res,
                status: false,
                data: error,
                statusCode: 500,
            })
        }
    }
    // generate = async (req, res, next) => {
    //     try {
    //         console.log("openai", openai);
    //         const response = await openai.createCompletion({
    //             model: 'text-davinci-003',
    //             prompt: `Goa Trip Itinerary`,
    //             max_tokens: 100,
    //             temperature: 0,
    //         });
    //         const resData = [];
    //         console.log("response", response.data.choices[0].text);
    //         if (response.data.choices[0].text) {
    //             const data = response.data.choices[0].text;
    //             const lines = data.toString().split('\n').filter(line => line.trim() !== '');
    //             for (const line of lines) {
    //                 const message = line.replace(/^data: /, '');
    //                 const splited = message.split(":");
    //                 console.log("splited", splited);
    //                 console.log("message", message);
    //                 // let responseData = parsed.choices[0].text;
    //                 resData.push(message);
    //             }
    //         }
    //         return commonResponse({
    //             req,
    //             res,
    //             status: true,
    //             data: resData,
    //             statusCode: 200,
    //         })
    //     } catch (error) {
    //         console.log("Error", error);
    //         return commonResponse({
    //             req,
    //             res,
    //             status: false,
    //             data: error,
    //             statusCode: 500,
    //         })
    //     }
    // }
}

module.exports = new tripController;