const User = require('../models/user')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
const { errorHandler } = require('../helper/dbErrorHandler')
exports.signUp = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            user
        })
    })
}
exports.signIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "User with that email doesnot exist. Please SignUp "
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password donot match"
            })
        }

        const token = jwt.sign({ id: user._id }, 'secret');
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, email, name, role } });

    })
}

exports.signOut = (req, res) => {
    res.clearCookie('t');
    res.json({ message: " signout success " })
}

exports.requiredSignIn = expressJwt({
    secret: 'secret',
    userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth.id;
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied"
        })
    }
    next()
}