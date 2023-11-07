const slugify = require('slugify')
const { OAuth2Client } = require('google-auth-library');
const UserModel = require('../models/user.model');
const UserLoginActivity = require('../models/user.login.activity.model');
const { sendVerificationEmail } = require('./common/emailService');
const { generateVerifyEmailToken, generateAuthTokens } = require('./common/tokenService');
const auth0 = require('auth0-js');
const bcrypt = require('bcryptjs');
const axios = require('axios');
class userService {
    createUser = async (userBody) => {
        try {
            const userExist = await UserModel.isEmailTaken(userBody.email)
            if (!userExist) {
                const splitEmailArray = userBody
                    .email
                    .split("@");
                let formatedSlug = slugify((splitEmailArray[0]).toLowerCase());
                const count = await UserModel
                    .find({
                        'slug': {
                            $regex: `^${formatedSlug}`,
                            $options: 'i'
                        }
                    })
                    .count();

                if (count > 0) {
                    userBody.slug = formatedSlug + '-' + count;
                } else {
                    userBody.slug = formatedSlug;
                }
                const encyP = await bcrypt.hash(userBody.password, 8);
                const payload = {
                    "name": userBody.name,
                    "slug": userBody.slug,
                    "email": userBody.email,
                    "password": encyP,
                    "provider": userBody.provider,
                    "profile_url": userBody
                        ?.profile_url && userBody.profile_url != ''
                        ? userBody.profile_url
                        : '',
                    "is_email_verified": userBody
                        ?.is_email_verified && userBody.is_email_verified != ''
                        ? userBody.is_email_verified
                        : false,

                }
                if (userBody?.is_email_verified && userBody.is_email_verified != '' && userBody?.is_email_verified == true) {
                    payload.email_verified_at = new Date
                }
                const user = new UserModel(payload)
                const createdUser = await user.save();
                console.log(createdUser._id);
                if (createdUser) {
                    userBody.id = createdUser._id
                    await this.createUserOnAuthO(userBody);
                }
                await generateVerifyEmailToken(createdUser);
                // await sendVerificationEmail(createdUser.email, verifyEmailToken.token);
                return { status: true, data: createdUser }
            } else {
                return { status: false, data: "User Already Register" }
            }
        } catch (error) {
            console.log("Error", error);
            return { status: false, data: error.message }
        }
    }
    createUserOnAuthO = async (userBody) => {
        try {
            let paydata = JSON.stringify({
                "client_id": "Kd16lPoUWpRQ1YeGBsW94tgyISN6hubI",
                "email": userBody.email,
                "password": userBody.password,
                "connection": "Username-Password-Authentication",
                "name": userBody.name,
                "user_metadata": {
                    mongo_user_id: userBody.id
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://dev-w1bmqazbzn600xvo.us.auth0.com/dbconnections/signup',
                headers: {
                    'content-type': 'application/json',
                },
                data: paydata
            };
            const { data, error } = await axios.request(config);
            return data;
        } catch (error) {

        }
    }
    authUser = async (req) => {
        try {
            const {
                email,
                password,
                provider
            } = req.body;
            const account = await UserModel
                .findOne({
                    'email': {
                        $regex: `^${email}`,
                        $options: 'i'
                    }
                })
            if (account) {

                if (provider && provider == 'google') {
                    return {
                        data: { tokens, user: account, message: "User Logged In Successfully" },
                    }
                } else {
                    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;
                    var device = req.headers["user-agent"];
                    const tokens = await generateAuthTokens(account, ip, device);
                    const checkLoginActivityActivity = await UserLoginActivity.findOne({
                        where: {
                            token: tokens.authId
                        }
                    })
                    if (!checkLoginActivityActivity) {
                        await UserLoginActivity.create({
                            "token": tokens.authId,
                            "user": account.id,
                            "logged_in_at": Date.now()
                        })
                    }
                    const passwordCheck = await bcrypt.compare(password, account.password);
                    if (passwordCheck) {
                        console.log("token", tokens);
                        return {
                            data: { tokens: tokens, user: account },
                            message: "User Logged In Successfully",
                            status: true,
                        }
                    } else {
                        return { status: false, error: "Invalid Password", message: "Invalid Password" }
                    }
                }
            } else {

            }
        } catch (error) {
            console.log("e", error);
            return { error: error.message }
        }
    }
    getUsers = async () => {
        try {

        } catch (error) {
            console.log("Error", error);
            return { error }
        }
    }
}

module.exports = new userService;