const {
    commonResponse
} = require('../utils/Response.utils');
const axios = require('axios')
const RedisCache = require('../services/common/cacheHandler');
const { openai } = require('../openai.js');
const SearchHistoryModel = require('../models/search.history.model.js');
const moment = require('moment')
const extractDate = require('extract-date').default;
// const extractDate = require('extract-date-js');
const famousTouristCitiesInIndia = [
    "Agra",
    "Varanasi",
    "Kerala",
    "Goa",
    'Hyderabad',
    'Delhi',
    "Chennai",
    "Hampi",
    "Rishikesh",
    "Khajuraho",
    "Mysore",
    "Srinagar",
    "Aurangabad",
    "Udaipur",
    "Darjeeling",
    "Bhuj",
    "Mumbai",
    "Leh",
    "Kolkata",
    "Jaipur",
    "Bangalore",
    "Pondicherry",
    "Himalayas",
    "Amritsar",
    "Jaisalmer",
    "Gangtok",
    "Shimla",
    "Manali",
    "Kochi",
    "Jodhpur",
    "Madurai",
    "Pushkar",
    "Pune",
    "Gokarna",
    "Rajasthan",
    "Gujarat",
    "Maharashtra",
    "Tamil Nadu",
    "Karnataka",
    "Telangana",
    "Andhra Pradesh",
    "Kashmir",
    "Haryana",
    "Uttarakhand",
    "Himachal Pradesh",
    "West Bengal",
    "Punjab",
    "Sikkim",
    "Uttar Pradesh",
    "Madhya Pradesh",
]
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
            const finalCacheKey = `_sml_smvp_itinerary_details_${source}_${destination}_${start_date}_${end_date}_`;
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
                const response = await openai.chat.completions.create({
                    messages: [
                        { "role": "system", "content": `Hi you will be acting as AI trip Itinerary Generator,get output in given json format ` },
                        { "role": "user", "content": q },
                    ],
                    model: 'gpt-3.5-turbo',
                    // model: 'gpt-4',
                    max_tokens: 3050,
                    temperature: 0,
                });
                const reData = JSON.parse(response.choices[0].message.content);
                await Promise.all(reData.activities.map(async (element, index) => {
                    const popularPlaces = element['popular_places'];
                    if (popularPlaces != null) {
                        await Promise.all(popularPlaces.map(async (place, placeindex) => {
                            const popularCacheKey = `_testss_ml_mvp_itinerary_map_places_new_${destination + "_" + place.name}`;
                            let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                            if (cres != null) {
                                popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                            } else {
                                const response = await axios.get(
                                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination + " " + place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                                );
                                let placesInforesult = response.data.results
                                if (response.data.results.length > 0) {
                                    await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                        const place_id = placeRef.place_id;
                                        const allPlaceData = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                                            params: {
                                                place_id: place_id,
                                                key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                            },
                                        });
                                        placesInforesult[placeRefindex]["reviews"] = allPlaceData.data.result.reviews;
                                        placesInforesult[placeRefindex]["url"] = allPlaceData.data.result.url;
                                    }))
                                }
                                // popularPlaces[placeindex]['place_info'] = response.data.results;
                                await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                    if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                                        // placesInforesult[placeRefindex]["info"] = allPlaceData;
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
                                            //;
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
                // //    accommodation
                await Promise.all(reData.activities.map(async (element, index) => {
                    const popularPlaces = element['accommodation'];
                    if (popularPlaces != null) {
                        await Promise.all(popularPlaces.map(async (place, placeindex) => {
                            const popularCacheKey = `_tests_mls_mvp_itinerary_map_accommodation_new_${destination + "_" + place.name}`;
                            let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                            if (cres != null) {
                                popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                            } else {
                                const response = await axios.get(
                                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination + " " + place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                                );
                                let placesInforesult = response.data.results
                                if (response.data.results.length > 0) {
                                    await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                        const place_id = placeRef.place_id;
                                        const allPlaceData = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                                            params: {
                                                place_id: place_id,
                                                key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                            },
                                        });
                                        placesInforesult[placeRefindex]["reviews"] = allPlaceData.data.result.reviews;
                                        placesInforesult[placeRefindex]["url"] = allPlaceData.data.result.url;
                                    }))
                                }
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
                                            ;
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
                if (global.isCacheEnabled) {
                    await RedisCache.setDefaultCache(finalCacheKey, JSON.stringify(reData));
                }
                if (req?.userId != undefined && req.userId != "") {
                    await SearchHistoryModel.create({
                        user: req?.userId,
                        input: JSON.stringify({ source, destination, start_date, end_date }),
                        output: JSON.stringify(reData)
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
    generateChatbotUserMessageItinerary = async (req, res, next) => {
        try {
            const { source, destination, start_date, end_date } = req.body;


            const q = `Create ${destination} Trip Itinerary for day wise starting from ${start_date}${end_date ? ` to ${end_date}` : ''} with activities with detailed places with accommodation with transportation prices in rupees in valid JSON format {"activities": [{ "name": "","date": "","coordinates": { "title":"","lat":"", "lng":""},"description": "","recommended_stay": "","activity":[],"popular_places":[{"name": "","type": "","fee":""}],"accommodation": [{ "address":"","name": "", "type": "","price_per_night": "" }],"transportation": {"bus":{},"train":{},"flight":{},},"food_choices": [{ "name":"","price":"","address":"",}]},]}`;
            console.log("q", q);
            const response = await openai.chat.completions.create({
                messages: [
                    { "role": "system", "content": `Hi you will be acting as AI trip Itinerary Generator,get output in given json format ` },
                    { "role": "user", "content": q },
                ],
                model: 'gpt-3.5-turbo',
                // model: 'gpt-4',
                max_tokens: 3050,
                temperature: 0,
            });
            const reData = JSON.parse(response.choices[0].message.content);
            await Promise.all(reData.activities.map(async (element, index) => {
                const popularPlaces = element['popular_places'];
                if (popularPlaces != null) {
                    await Promise.all(popularPlaces.map(async (place, placeindex) => {
                        const popularCacheKey = `_testss_ml_mvp_itinerary_map_places_new_${destination + "_" + place.name}`;
                        let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                        if (cres != null) {
                            popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                        } else {
                            const response = await axios.get(
                                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination + " " + place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                            );
                            let placesInforesult = response.data.results
                            if (response.data.results.length > 0) {
                                await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                    const place_id = placeRef.place_id;
                                    const allPlaceData = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                                        params: {
                                            place_id: place_id,
                                            key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                        },
                                    });
                                    placesInforesult[placeRefindex]["reviews"] = allPlaceData.data.result.reviews;
                                    placesInforesult[placeRefindex]["url"] = allPlaceData.data.result.url;
                                }))
                            }
                            // popularPlaces[placeindex]['place_info'] = response.data.results;
                            await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                                    // placesInforesult[placeRefindex]["info"] = allPlaceData;
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
                                        //;
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
            // //    accommodation
            await Promise.all(reData.activities.map(async (element, index) => {
                const popularPlaces = element['accommodation'];
                if (popularPlaces != null) {
                    await Promise.all(popularPlaces.map(async (place, placeindex) => {
                        const popularCacheKey = `_tests_mls_mvp_itinerary_map_accommodation_new_${destination + "_" + place.name}`;
                        let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                        if (cres != null) {
                            popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                        } else {
                            const response = await axios.get(
                                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination + " " + place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                            );
                            let placesInforesult = response.data.results
                            if (response.data.results.length > 0) {
                                await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                    const place_id = placeRef.place_id;
                                    const allPlaceData = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                                        params: {
                                            place_id: place_id,
                                            key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                        },
                                    });
                                    placesInforesult[placeRefindex]["reviews"] = allPlaceData.data.result.reviews;
                                    placesInforesult[placeRefindex]["url"] = allPlaceData.data.result.url;
                                }))
                            }
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
                                        ;
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
            // if (global.isCacheEnabled) {
            //     await RedisCache.setDefaultCache(finalCacheKey, JSON.stringify(reData));
            // }
            // if (req?.userId != undefined && req.userId != "") {
            //     await SearchHistoryModel.create({
            //         user: req?.userId,
            //         input: JSON.stringify({ source, destination, start_date, end_date }),
            //         output: JSON.stringify(reData)
            //     })
            // }
            return commonResponse({
                req,
                res,
                status: true,
                data: reData,
                statusCode: 200,
            })
            // }
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
    generateusingVoice = async (req, res, next) => {
        try {
            const { text, source } = req.body;
            const splitedText = text.split(" ");
            const dates = extractDate(text, { direction: 'DMY', locale: 'en', timezone: 'Asia/Kolkata' });
            console.log("daytes", dates);
            let destination, start_date, end_date = null
            for (var i = 0; i < splitedText.length; i++) {
                const v = splitedText[i];
                const indexed = famousTouristCitiesInIndia.map(m => m.toLowerCase()).indexOf(v.toLowerCase());
                if (indexed > 0) {
                    destination = v
                }
            }
            if (dates.length > 0) {
                const fDates = dates.map(m => m.date);
                console.log("f", fDates);
                const min = fDates.reduce((acc, date) => { return acc && new Date(acc) < new Date(date) ? acc : date }, '')
                const max = fDates.reduce((acc, date) => { return acc && new Date(acc) > new Date(date) ? acc : date }, '')
                console.log("min", min);
                console.log("max", max);
                if (max != null && max != undefined && max != "" && min != max) {
                    start_date = min;
                    end_date = max;
                } else {
                    start_date = min;
                    end_date = moment(new Date(start_date), "DD/MM/YYYY").add(3, 'days')
                }

            } else {
                start_date = moment(new Date(), "DD/MM/YYYY").add(1, 'days')
                end_date = moment(new Date(), "DD/MM/YYYY").add(3, 'days')
            }
            const finalCacheKey = `_sml_smvp_itinerary_details_${source}_${destination}_${start_date}_${end_date}_`;
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
                var date2 = moment(end_date);
                var days = date2.diff(date1, 'days')
                const q = `Create ${destination} Trip Itinerary for ${days + 1} days starting from ${moment(date1).format("DD/MM/YYYY")} to ${moment(date2).format("DD/MM/YYYY")} with activities with detailed places with accommodation with transportation prices in rupees in valid JSON format {"activities": [{ "name": "","date": "","coordinates": { "title":"","lat":"", "lng":""},"description": "","recommended_stay": "","activity":[],"popular_places":[{"name": "","type": "","fee":""}],"accommodation": [{ "address":"","name": "", "type": "","price_per_night": "" }],"transportation": {"bus":{},"train":{},"flight":{},},"food_choices": [{ "name":"","price":"","address":"",}]},]}`;
                console.log("q", q);
                const response = await openai.chat.completions.create({
                    messages: [
                        { "role": "system", "content": `Hi you will be acting as AI trip Itinerary Generator,get output in given json format` },
                        { "role": "user", "content": q },
                    ],
                    model: 'gpt-3.5-turbo',
                    // model: 'gpt-4',
                    max_tokens: 3050,
                    temperature: 0,
                });
                const reData = JSON.parse(response.choices[0].message.content);
                await Promise.all(reData.activities.map(async (element, index) => {
                    const popularPlaces = element['popular_places'];
                    if (popularPlaces != null) {
                        await Promise.all(popularPlaces.map(async (place, placeindex) => {
                            const popularCacheKey = `_testss_ml_mvp_itinerary_map_places_new_${destination + "_" + place.name}`;
                            let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                            if (cres != null) {
                                popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                            } else {
                                const response = await axios.get(
                                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination + " " + place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                                );
                                let placesInforesult = response.data.results
                                if (response.data.results.length > 0) {
                                    await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                        const place_id = placeRef.place_id;
                                        const allPlaceData = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                                            params: {
                                                place_id: place_id,
                                                key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                            },
                                        });
                                        placesInforesult[placeRefindex]["reviews"] = allPlaceData.data.result.reviews;
                                        placesInforesult[placeRefindex]["url"] = allPlaceData.data.result.url;
                                    }))
                                }
                                // popularPlaces[placeindex]['place_info'] = response.data.results;
                                await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                    if (placeRef.photos != undefined && placeRef.photos.length > 0) {
                                        // placesInforesult[placeRefindex]["info"] = allPlaceData;
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
                                            //;
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
                // //    accommodation
                await Promise.all(reData.activities.map(async (element, index) => {
                    const popularPlaces = element['accommodation'];
                    if (popularPlaces != null) {
                        await Promise.all(popularPlaces.map(async (place, placeindex) => {
                            const popularCacheKey = `_tests_mls_mvp_itinerary_map_accommodation_new_${destination + "_" + place.name}`;
                            let cres = global.isCacheEnabled ? await RedisCache.getCache(popularCacheKey) : null;
                            if (cres != null) {
                                popularPlaces[placeindex]['place_info'] = JSON.parse(cres);
                            } else {
                                const response = await axios.get(
                                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${destination + " " + place.name}&key=AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M`
                                );
                                let placesInforesult = response.data.results
                                if (response.data.results.length > 0) {
                                    await Promise.all(placesInforesult.map(async (placeRef, placeRefindex) => {
                                        const place_id = placeRef.place_id;
                                        const allPlaceData = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                                            params: {
                                                place_id: place_id,
                                                key: "AIzaSyDBOOKUbB5AjZGROTna4SGgfnF4_BgDX5M",
                                            },
                                        });
                                        placesInforesult[placeRefindex]["reviews"] = allPlaceData.data.result.reviews;
                                        placesInforesult[placeRefindex]["url"] = allPlaceData.data.result.url;
                                    }))
                                }
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
                                            ;
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
                if (global.isCacheEnabled) {
                    await RedisCache.setDefaultCache(finalCacheKey, JSON.stringify(reData));
                }
                if (req?.userId != undefined && req.userId != "") {
                    await SearchHistoryModel.create({
                        user: req?.userId,
                        input: JSON.stringify({ source, destination, start_date, end_date }),
                        output: JSON.stringify(reData)
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
    generateChatbotMessages = async (req, res, next) => {
        try {
            const { text } = req.body;
            const q = `${text}`
            console.log("q", q);
            const response = await openai.chat.completions.create({
                messages: [
                    { "role": "system", "content": `Hi you will be acting as AI chatbot` },
                    { "role": "user", "content": q },
                ],
                model: 'gpt-3.5-turbo',
                // model: 'gpt-4',
                max_tokens: 3050,
                temperature: 0,
            });
            console.log("response", response);
            return commonResponse({
                req,
                res,
                status: true,
                data: response,
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
}

module.exports = new tripController;