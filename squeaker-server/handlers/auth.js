const db = require('../models/index');
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
    // finding a user
    // checking if their password matches server
    // log in with jwt
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password"
            });
        }
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid Email/Password"
        });
    }
}

exports.signup = async function (req, res, next) {
    try {
        // create a user
        // create a token(signing a token)
        // process.env.SECRET_KEY
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user;
        let token = jwt.sign({
            id: id,
            username: username,
            profileImageUrl: profileImageUrl
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}