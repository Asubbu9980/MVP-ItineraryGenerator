// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const config = require('../../config/config');
// // const { APILog } = require('../database/models');
// const {
//     commonResponse
// } = require('../utils/Response.utils');
// const {
//     tokenTypes
// } = require('../../config/tokens');
// const {
//     Users,
//     UserAuthTokens,
//     UserLoginActivity,
//     UserRoles,
//     UserRolesMapping
// } = require('../database/models');
// const
//     tokenService = require('../services/token.service')
// const {
//     TokenExpiredError,
//     JsonWebTokenError
// } = jwt;


// const catchError = (err, res) => {
//     if (err instanceof TokenExpiredError) {
//         return res.status(401).send({
//             message: "Unauthorized! Access Token was expired!"
//         });
//     } else if (err instanceof JsonWebTokenError) {
//         return res.status(401).send({
//             message: "Unauthorized! Invalid Access Token!"
//         });
//     }
//     return res.sendStatus(401).send({
//         message: "Unauthorized!"
//     });
// }

// module.exports.initCookies = async function (req, res, next) {
//     const sessionToken = req.cookies['tempUserId']
//     const storeId = "1";
//     if (!sessionToken) {
//         const sessionToken = uuidv4();
//         var sixMonths = 120 * 24 * 3600 * 1000; //6 months  
//         const expiresAt = new Date(Date.now() + sixMonths);
//         res.cookie("tempUserId", sessionToken, { expires: expiresAt });
//         req.body.tempUserId = sessionToken;
//         req.body.storeId = storeId
//         res.cookie("storeId", storeId, { expires: expiresAt });
//         // var storedId = req.cookies && req.cookies?.storeId;
//         // const cookieSessionId = req.cookies && req.cookies?.sessionId;
//         // console.log("cookieSessionId", cookieSessionId);
//         // console.log("storedId", storedId);
//         // if (storedId != null) {
//         //     req.body.storeId = storedId
//         // }
//         // if (cookieSessionId != null) {
//         //     req.body.tempUserId = cookieSessionId
//         // }
//     } else {
//         req.body.tempUserId = sessionToken;
//         req.body.storeId = storeId
//         // res.cookie("tempUserId", sessionToken, { expires: expiresAt });
//         // res.cookie("storedId", storedId, { expires: expiresAt });
//     }
//     next();
// }

// module.exports.checkUserAuthStatus = async function (req, res, next) {
//     var token = req.cookies?.token || req.headers?.authorization;
//     // var token = req.cookies['token'];
//     // console.log("token", token);
//     if (token != '' && token != undefined) {
//         // next()
//         jwt.verify(token.replace(/^Bearer\s/, ''), config.jwt.secret, async (err, decoded) => {
//             if (!err) {
//                 console.log(token.replace(/^Bearer\s/, ''));
//                 const verifyToken = await tokenService.verifyToken(token.replace(/^Bearer\s/, ''), tokenTypes.REFRESH);
//                 if (verifyToken != null && verifyToken != 'Token not found' && verifyToken != undefined) {
//                     const sessionRoleId = req.headers?.rolesessionid
//                     const userSessionData = await prepareSessionData(verifyToken);
//                     req.auth = userSessionData;
//                     req.body.userId = userSessionData.userData.id
//                     req.body.created_by = userSessionData.userData.id
//                     req.body.updated_by = userSessionData.userData.id
//                     if (sessionRoleId != '' && sessionRoleId != undefined) {
//                         const activeRole = userSessionData.rolepermission.filter(function (freelancer) {
//                             // console.log("freelancer", freelancer.dataValues.id);
//                             // console.log("sessionRoleId", sessionRoleId);
//                             return freelancer.dataValues.id == sessionRoleId
//                         });
//                         if (activeRole.length > 0) {
//                             // console.log("activeRole", activeRole[0].role_permissions);
//                             const per = activeRole[0].role_permissions
//                             // console.log(per);
//                             req.auth.activeRole = activeRole[0]
//                             req.auth.permissions = per
//                             // activeRole.UserRoles role_permissions
//                         }
//                     }
//                 }
//                 // Cookies that have not been signed
//                 // res.cookie('token', token.replace(/^Bearer\s/, ''), { httpOnly: true });
//                 next();
//             } else {
//                 // console.log("Jwt Error", err);
//                 next();
//             }
//         })
//     } else {
//         next();
//     }
// }

// async function prepareSessionData(verifyToken) {
//     // console.log("verifyToken", verifyToken);
//     const loginActivity = await UserLoginActivity.findOne({
//         where: {
//             tokenId: verifyToken.id
//         }
//     });
//     // console.log("loginActivity", loginActivity);
//     if (loginActivity != null && !loginActivity.logged_out) {
//         const userData = await Users.findByPk(loginActivity.userId, {
//             include: [{
//                 model: UserRoles,
//                 attributes: ["id", ["role_name", "role"], "role_permissions", "is_super_admin"],
//                 through: {
//                     attributes: ["status"],
//                 },
//             },],
//         })
//         const userEnabledRoles = [];
//         userData['UserRoles'].forEach((element, index) => {
//             if (element['UserRolesMapping']['status'] == 'granted') {
//                 userEnabledRoles.push(
//                     element.dataValues.role,
//                 )
//             }
//         });
//         return {
//             userData,
//             "rolepermission": userData['UserRoles']
//         };
//     }
// }

// module.exports.isAuthenticated = async function (req, res, next) {
//     if (req.auth != '' && req.auth != undefined) {
//         next()
//     } else {
//         return commonResponse({
//             req,
//             res,
//             status: false,
//             message: 'Unauthorized',
//             statusCode: 401,
//         })
//     }
// }

// // module.exports. = async function (req, res, next) {
// //     if (req.auth != '' && req.auth != undefined) {
// //         next()
// //     } else {
// //         return commonResponse({
// //             req,
// //             res,
// //             status: false,
// //             message: 'Unauthorized',
// //             statusCode: 400,
// //         })
// //     }
// // }

// // req.auth.catlog.categories.views

// module.exports.isAdmin = function (req, res, next) {
//     if (req.role !== 'user') {
//         return res.status(400).json({
//             message: 'User Access Denied',
//             status: 0
//         })
//     }
//     return next();

// }


// // module.exports.requestLoggerMiddleware = async function (request, response, next) {
// //     const requestStart = Date.now();
// //     let errorMessage = null;
// //     let body = [];
// //     const chunks = [];
// //     let responseBody = null;
// //     const oldWrite = response.write;
// //     const oldEnd = response.end;
// //     request.on("data", chunk => {
// //         body.push(chunk);
// //     });
// //     request.on("end", () => {
// //         body = Buffer.concat(body).toString();
// //     });
// //     request.on("error", error => {
// //         errorMessage = error.message;
// //     });

// //     response.write = (...restArgs) => {
// //         chunks.push(Buffer.from(restArgs[0]));
// //         oldWrite.apply(response, restArgs);
// //     };
// //     // response.end = (...restArgs) => {
// //     // if (restArgs[0]) {
// //     //     chunks.push(Buffer.from(restArgs[0]));
// //     // }
// //     // responseBody = Buffer.concat(chunks).toString('utf8');
// //     // }
// //     // console.log("responseBody", responseBody);
// //     // const responseBody = Buffer.concat(chunks).toString('utf8');
// //     response.on("finish", (...restArgs) => {
// //         if (restArgs[0]) {
// //             chunks.push(Buffer.from(restArgs[0]));
// //         }
// //         responseBody = Buffer.concat(chunks).toString('utf8');
// //         console.log("responseBody", responseBody);
// //         const { rawHeaders, httpVersion, method, socket, url } = request;
// //         const { remoteAddress, remoteFamily } = socket;
// //         console.log("response", response);
// //         const { statusCode, statusMessage } = response;
// //         const headers = response.getHeaders();

// //         console.log(
// //             JSON.stringify({
// //                 timestamp: Date.now(),
// //                 fromIP: request.headers['x-forwarded-for'] ||
// //                     request.connection.remoteAddress,
// //                 processingTime: Date.now() - requestStart,
// //                 rawHeaders,
// //                 body,
// //                 errorMessage,
// //                 httpVersion,
// //                 method,
// //                 remoteAddress,
// //                 remoteFamily,
// //                 url,
// //                 response: {
// //                     statusCode,
// //                     statusMessage,
// //                     headers,
// //                     responseBody
// //                 }
// //             })
// //         );
// //         oldEnd.apply(response, restArgs)
// //     });
// //     next()
// // }

// // module.exports.requestLoggerMiddleware = async function (req, res, next) {
// //     const { rawHeaders, httpVersion, method, socket, url } = req;
// //     const requestStart = Date.now();
// //     const oldWrite = res.write;
// //     const oldEnd = res.end;
// //     const { statusCode, statusMessage } = res;
// //     const chunks = [];

// //     res.write = (...restArgs) => {
// //         chunks.push(Buffer.from(restArgs[0]));
// //         oldWrite.apply(res, restArgs);
// //     };
// //     res.end = (...restArgs) => {
// //         if (restArgs[0]) {
// //             chunks.push(Buffer.from(restArgs[0]));
// //         }
// //         const body = Buffer.concat(chunks).toString('utf8');
// //         // const APIBody = {
// //         //     'userId': '',
// //         //     'processingTime': Date.now() - requestStart,
// //         //     'fromIp': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
// //         //     'method': req.method,
// //         //     'url': req.url,
// //         //     'rawHeaders': JSON.stringify(rawHeaders),
// //         //     'reqBody': JSON.stringify(req.body),
// //         //     'reqQuery': JSON.stringify(req.query),
// //         //     'reqParams': JSON.stringify(req.params),
// //         //     'requestData': '',
// //         //     'statusCode': statusCode,
// //         //     'responseData': JSON.stringify(body),
// //         //     'userAgent': req.headers['user-agent']
// //         // }
// //         // APILog.create(APIBody)
// //         // console.log({
// //         //     time: new Date().toUTCString(),
// //         //     fromIP: req.headers['x-forwarded-for'] ||
// //         //         req.connection.remoteAddress,
// //         //     method: req.method,
// //         //     originalUri: req.originalUrl,
// //         //     uri: req.url,
// //         //     requestData: req.body,
// //         //     responseData: body,
// //         //     referer: req.headers.referer || '',
// //         //     ua: req.headers['user-agent']
// //         // });

// //         // console.log(body);
// //         oldEnd.apply(res, restArgs);
// //     };
// //     next()
// // }