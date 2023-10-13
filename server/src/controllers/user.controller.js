const {
    commonResponse
} = require('../utils/Response.utils');
const { userService } = require('../services');

class userController {
    create = async (req, res, next) => {
        try {
            const { status, data } = await userService.createUser(req.body);
            if (status) {
                return commonResponse({
                    req,
                    res,
                    status: true,
                    message: "User Created Successfully",
                    data: data,
                    statusCode: 201,
                })
            } else {
                return commonResponse({
                    req,
                    res,
                    status: status,
                    message: data,
                    statusCode: 422,
                })
            }
        } catch (error) {
            return commonResponse({
                req,
                res,
                status: false,
                error: error.message,
                statusCode: 500,
            })
        }
    }
    authUser = async (req, res, next) => {
        try {
            const { status, data, message, error } = await userService.authUser(req);
            if (data !== undefined) {
                return commonResponse({
                    req,
                    res,
                    status: status,
                    message: message,
                    data: data,
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

module.exports = new userController;