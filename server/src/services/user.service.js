const slugify = require('slugify')
const { OAuth2Client } = require('google-auth-library');
const UserModel = require('../models/user.model');
const UserLoginActivity = require('../models/user.login.activity.model');
const { sendVerificationEmail } = require('./common/emailService');
const { generateVerifyEmailToken, generateAuthTokens } = require('./common/tokenService');

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
                const payload = {
                    "name": userBody.name,
                    "slug": userBody.slug,
                    "email": userBody.email,
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
                console.log("account", account);
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
                if (provider && provider == 'google') {
                    return {
                        data: { tokens, user: account, message: "User Logged In Successfully" },
                    }
                } else {
                    // const passwordCheck = await bcrypt.compare(password, account.password);

                }
            } else {
                // return commonResponse({
                //     req,
                //     res,
                //     status: false,
                //     message: "Invalid User",
                //     statusCode: 200,
                // })
            }
        } catch (error) {
            return { status: false, data: error.message }
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