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
    stringToJson(input) {
        var result = [];

        // Replace leading and trailing [], if present
        input = input.replace(/^\[/, '');
        input = input.replace(/\]$/, '');

        // Change the delimiter to
        input = input.replace(/},{/g, '};;;{');

        // Preserve newlines, etc. - use valid JSON
        //https://stackoverflow.com/questions/14432165/uncaught-syntaxerror-unexpected-token-with-json-parse
        input = input.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");

        // Remove non-printable and other non-valid JSON characters
        input = input.replace(/[\u0000-\u0019]+/g, "");

        input = input.split(';;;');

        input.forEach(function (element) {
            //console.log(JSON.stringify(element));

            result.push(JSON.parse(element));
        }, this);

        return result;
    }
    generate = async (req, res, next) => {
        try {
            const { source, destination, days, start_date, end_date } = req.body;
            // const q = `${source} to ${destination} Trip Itinerary from ${start_date} to ${end_date}  with activities with detailed accommodation,prices in rupees with co-ordinates & transportation in valid JSON format `;
            // const t q = `create Itinerary to ${ destination } from ${ source } from ${ start_date } to ${ end_date } with activities with detailed places with accommodation,co-ordinates with transportation prices in rupees in below valid JSON format 

            const q = `create Trip Itinerary to ${destination} from ${start_date} to ${end_date} with activities, detailed descriptions for activities, accommodation with map coordinates along with transportation charges including bus,car,train,flight in indian rupees from ${source} in valid JSON format
            {
            "trip_start_date": "",
             "trip_end_date": "",
             "trip_duration": "",
             "starting_location": "",
             "ending_location": "",
             "activities": [
               {
                 "name": "",
                 "description": "",
                 "coordinates": {
                    "title":"",
                    "lat":"",
                    "lng":"",
                 },
                 "recommended_stay": "",
                 "activity":[],
                 "popular_places":[],
                 "accommodation": [{
                   "address":"",
                   "name": "",
                   "type": "",
                   "coordinates":  {
                    "title":"",
                    "lat":"",
                    "lng":"",
                 },
                   "price_per_night": ""
                 }],
                 "transportation": {
                    "bus":{},
                    "train":{},
                    "flight":{},
                    "car":{},
                 },
                 "food_choices": [{
                   "name":"",
                   "price":"",
                   "address":"",
                   "coordinates":  {
                    "title":"",
                    "lat":"",
                    "lng":"",
                 },
                 }]
               },
             ]
            }`;
            //testg const q = `create Itinerary to ${ destination } from ${ source } in between ${ start_date } to ${ end_date } with activities, with accommodation, co - ordinates with transportation prices, best food choices in rupees in valid JSON format`;
            // const q = `create Itinerary to Kochi(Cochin) from Goa in between 31 October, 2023 to 04 November, 2023 with activities, with accommodation, co - ordinates with transportation prices, best food choices in rupees in below valid JSON format
            // "itinerary": [
            //   {
            //     "date": "",
            //     "destination": "",
            //     "activities": [],
            //     "accommodation": {},
            //     "transportation": {},
            //     "food_choices": []
            //   },
            // ]
            // `
            console.log("q", q);
            const response = await openai.createCompletion({
                model: 'gpt-3.5-turbo-instruct',
                // prompt: `Goa Trip Itinerary in json array of objects format without newlines\n\n[ `,
                // prompt: `${source} to ${destination} Trip Itinerary from ${start_date} to ${end_date} JSON format `,
                prompt: q,
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
            // const reData = JSON.stringify(response.data.choices[0].text);
            // const stringWithoutNewlines = reData.replace(/[\n\r!@#$%^&*()]/g, '');
            // obj.forEach(.removeNewlines);
            // console.log(JSON.stringify(obj, null, 2));
            return commonResponse({
                req,
                res,
                status: true,
                data: reData,
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