const {
    commonResponse
} = require('../utils/Response.utils');
const axios = require('axios')
const RedisCache = require('../services/common/cacheHandler');
const { openai } = require('../openai.js');
const SearchHistoryModel = require('../models/search.history.model.js');
const moment = require('moment')
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
            const { source, destination, start_date, end_date } = req.body;
            const finalCacheKey = `_ml_smvp_itinerary_details_${source}_${destination}_${start_date}_${end_date}_`;
            const cc = global.isCacheEnabled ? await RedisCache.getCache(finalCacheKey) : null;
            if (cc != null) {
                return commonResponse({
                    req,
                    res,
                    status: true,
                    data: JSON.parse(cc),
                    statusCode: 200,
                })
            } else {
                var date1 = moment(start_date);
                console.log("date1", date1);
                var date2 = moment(end_date);
                console.log("date2", date2);
                var days = date2.diff(date1, 'days')
                console.log("days", days);
                const q = `Create ${destination} Trip Itinerary for ${days + 1} days starting from ${moment(date1).format("DD/MM/YYYY")} to ${moment(date2).format("DD/MM/YYYY")} with activities with detailed places with accommodation with transportation prices in rupees in valid JSON format {"activities": [{ "name": "","date": "","coordinates": { "title":"","lat":"", "lng":""},"description": "","recommended_stay": "","activity":[],"popular_places":[{"name": "","type": "","fee":""}],"accommodation": [{ "address":"","name": "", "type": "","price_per_night": "" }],"transportation": {"bus":{},"train":{},"flight":{},},"food_choices": [{ "name":"","price":"","address":"",}]},]}`;
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
                // const response = await openai.createCompletion({
                //     model: 'gpt-3.5-turbo-instruct',
                //     // prompt: `Goa Trip Itinerary in json array of objects format without newlines\n\n[ `,
                //     // prompt: `${source} to ${destination} Trip Itinerary from ${start_date} to ${end_date} JSON format `,
                //     prompt: q,
                //     max_tokens: 3050,
                //     temperature: 0,
                //     // "model": "gpt-3.5-turbo",
                //     // "messages": [
                //     //     {
                //     //         "role": "user",
                //     //         "content": "Goa Trip Itinerary in json format"
                //     //     }
                //     // ],
                //     // format: "json",
                //     // "reasoning": true,
                //     // "final_answer": true
                // });
                const response = await openai.chat.completions.create({
                    messages: [
                        { "role": "system", "content": `Hi you will be acting as AI trip Itinerary Generator,get output in given json format Create Varanasi Trip Itinerary for 4 days starting from 16/12/2023 to 20/12/2023 with activities with detailed places with accommodation with transportation prices in rupees in valid JSON format {"activities": [{ "name": "","date": "","description": "","recommended_stay": "","activity":[],"popular_places":[{"name": "","type": "","fee":""}],"accommodation": [{ "address":"","name": "", "type": "","price_per_night": "" }],"transportation": {"bus":{},"train":{},"flight":{},},"food_choices": [{ "name":"","price":"","address":""}]}]}` },
                        { "role": "user", "content": q },
                    ],
                    model: 'gpt-3.5-turbo',
                    // model: 'gpt-4',
                    max_tokens: 3050,
                    temperature: 0,
                });
                // const lines = response.data.choices[0].text.toString().split('\n').filter(line => line.trim() !== '');
                // console.log("response", response.data.choices[0].text);
                // console.log("lines", lines);
                const reData = JSON.parse(response.choices[0].message.content);

                await Promise.all(reData.activities.map(async (element, index) => {
                    const popularPlaces = element['popular_places'];
                    if (popularPlaces != null) {
                        await Promise.all(popularPlaces.map(async (place, placeindex) => {
                            const popularCacheKey = `_test_ml_mvp_itinerary_map_places_new_${place.name}`;
                            let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                            if (cres != null) {
                                popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                            } else {
                                const response = await axios.get(
                                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                                );
                                const placesInforesult = response.data.results;
                                // popularPlaces[placeindex]['place_info'] = response.data.results;
                                await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                    if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                                        await Promise.all(placeRef.photos.map(async (placephotos, placephotosindex) => {
                                            // console.log("placephotos", placephotos);
                                            const responsePhoto = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                                                params: {
                                                    photoreference: placephotos.photo_reference,
                                                    key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                                    maxwidth: 400, // adjust maxwidth as needed
                                                    maxheight: 400, // adjust maxheight as needed
                                                },
                                            });
                                            console.log("responsePhoto", responsePhoto.request.res.responseUrl);
                                            placesInforesult[placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                                            // placephotos[placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                                            // popularPlaces[placeindex]['place_info'][placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                                        }))
                                    }
                                }))
                                console.log(JSON.stringify(placesInforesult));
                                if (global.isCacheEnabled) {
                                    await RedisCache.setCache(popularCacheKey, JSON.stringify(placesInforesult));
                                }
                                popularPlaces[placeindex]['place_info'] = placesInforesult;
                            }
                        }))
                    }
                }))
                // //    accommodation
                await Promise.all(reData.activities.map(async (element, index) => {
                    const popularPlaces = element['accommodation'];
                    if (popularPlaces != null) {
                        await Promise.all(popularPlaces.map(async (place, placeindex) => {
                            const popularCacheKey = `_test_mls_mvp_itinerary_map_accommodation_new_${place.name}`;
                            let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                            if (cres != null) {
                                popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                            } else {
                                const response = await axios.get(
                                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                                );
                                const placesInforesult = response.data.results;
                                // popularPlaces[placeindex]['place_info'] = response.data.results;
                                await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                    if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                                        await Promise.all(placeRef.photos.map(async (placephotos, placephotosindex) => {
                                            // console.log("placephotos", placephotos);
                                            const responsePhoto = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                                                params: {
                                                    photoreference: placephotos.photo_reference,
                                                    key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                                    maxwidth: 400, // adjust maxwidth as needed
                                                    maxheight: 400, // adjust maxheight as needed
                                                },
                                            });
                                            console.log("responsePhoto", responsePhoto.request.res.responseUrl);
                                            placesInforesult[placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                                            // placephotos[placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                                            // popularPlaces[placeindex]['place_info'][placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                                        }))
                                    }
                                }))
                                console.log(JSON.stringify(placesInforesult));
                                // if (global.isCacheEnabled) {
                                //     await RedisCache.setCache(popularCacheKey, JSON.stringify(placesInforesult));
                                // }
                                popularPlaces[placeindex]['place_info'] = placesInforesult;
                            }
                        }))
                    }
                }))
                // await Promise.all(reData.activities.map(async (element, index) => {
                //     const popularPlaces = element['accommodation'];
                //     await Promise.all(popularPlaces.map(async (place, placeindex) => {
                //         // console.log("place", JSON.stringify(place));
                //         const response = await axios.get(
                //             `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.title}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                //         );
                //         popularPlaces[placeindex]['place_info'] = response.data.results;
                //         await Promise.all(response.data.results.map(async (placeRef, placeRefindex) => {
                //             // console.log("placeRefindex", JSON.stringify(placeRef.photos));
                //             if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                //                 await Promise.all(placeRef.photos.map(async (placephotos, placephotosindex) => {
                //                     // console.log("placephotos", placephotos);
                //                     const responsePhoto = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                //                         params: {
                //                             photoreference: placephotos.photo_reference,
                //                             key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                //                             maxwidth: 400, // adjust maxwidth as needed
                //                             maxheight: 400, // adjust maxheight as needed
                //                         },
                //                     });
                //                     // placephotos[placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                     popularPlaces[placeindex]['place_info'][placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                 }))
                //             }
                //         }))
                //     }))
                // }))
                // food choices
                // await Promise.all(reData.activities.map(async (element, index) => {
                //     const popularPlaces = element['food_choices'];
                //     await Promise.all(popularPlaces.map(async (place, placeindex) => {
                //         const popularCacheKey = `_test_ml_mvp_itinerary_map_food_choices_new_${place.title}`;
                //         let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                //         if (cres != null) {
                //             popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                //         } else {
                //             const response = await axios.get(
                //                 `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.title}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                //             );
                //             const placesInforesult = response.data.results;
                //             // popularPlaces[placeindex]['place_info'] = response.data.results;
                //             await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                //                 if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                //                     await Promise.all(placeRef.photos.map(async (placephotos, placephotosindex) => {
                //                         // console.log("placephotos", placephotos);
                //                         const responsePhoto = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                //                             params: {
                //                                 photoreference: placephotos.photo_reference,
                //                                 key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                //                                 maxwidth: 400, // adjust maxwidth as needed
                //                                 maxheight: 400, // adjust maxheight as needed
                //                             },
                //                         });
                //                         console.log("responsePhoto", responsePhoto.request.res.responseUrl);
                //                         placesInforesult[placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                         // placephotos[placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                         // popularPlaces[placeindex]['place_info'][placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                     }))
                //                 }
                //             }))
                //             console.log(JSON.stringify(placesInforesult));
                //             if (global.isCacheEnabled) {
                //                 await RedisCache.setCache(popularCacheKey, JSON.stringify(placesInforesult));
                //             }
                //             popularPlaces[placeindex]['place_info'] = placesInforesult;
                //         }
                //     }))
                // }))
                // await Promise.all(reData.activities.map(async (element, index) => {
                //     const popularPlaces = element['food_choices'];
                //     await Promise.all(popularPlaces.map(async (place, placeindex) => {
                //         const response = await axios.get(
                //             `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.title}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                //         );
                //         popularPlaces[placeindex]['place_info'] = response.data.results;
                //         await Promise.all(response.data.results.map(async (placeRef, placeRefindex) => {
                //             if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                //                 await Promise.all(placeRef.photos.map(async (placephotos, placephotosindex) => {
                //                     const responsePhoto = await axios.get('https://maps.googleapis.com/maps/api/place/photo', {
                //                         params: {
                //                             photoreference: placephotos.photo_reference,
                //                             key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                //                             maxwidth: 400, // adjust maxwidth as needed
                //                             maxheight: 400, // adjust maxheight as needed
                //                         },
                //                     });
                //                     // placephotos[placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                     popularPlaces[placeindex]['place_info'][placeRefindex]["photos"][placephotosindex]["images"] = responsePhoto.request.res.responseUrl;
                //                 }))
                //             }
                //         }))
                //     }))
                // }))
                if (global.isCacheEnabled) {
                    await RedisCache.setDefaultCache(finalCacheKey, JSON.stringify(reData));
                }
                if (req?.userId != undefined && req.userId != "") {
                    await SearchHistoryModel.create({
                        user: req?.userId,
                        input: JSON.stringify({ source, destination, start_date, end_date }),
                        output: reData
                    })
                }
                return commonResponse({
                    req,
                    res,
                    status: true,
                    data: reData,
                    statusCode: 200,
                })
            }
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
    getUserSearchHistory = async (req, res, next) => {
        try {
            const data = await SearchHistoryModel.find({
                'user': req.userId
            })
            if (data !== undefined) {
                return commonResponse({
                    req,
                    res,
                    status: true,
                    data: data,
                    message: "Success",
                    statusCode: 200,
                })
            } else {
                return commonResponse({
                    req,
                    res,
                    status: false,
                    error: error,
                    message: "Failed",
                    statusCode: 500,
                })
            }
        } catch (error) {
            console.log("error", error);
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