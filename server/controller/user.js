const User = require('../model/user');
const mongooseHelper = require('../helper/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
exports.auth = function(req, res){
    const { email, password } = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }

    User.findOne({email}, function(err, user){
        if(err){
            return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
        }

        if(!user){
            return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'User doesnt exists'}]});
        }

        if(user.hasSamePassword(password)){
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, {expiresIn: '1hr'});
            return res.json(token);
        } else {
            return res.status(422).send({errors: [{title: 'Wrong data!', detail: 'Wrong email or password'}]});
        }
    });
}

exports.register = function(req, res){
    const { username, email, password, passwordConfirmation } = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Invalid Password', detail: 'Password is not same as confimation password!'}]});
    }

    User.findOne({email}, (err, existingUser)=>{
        if(err){
            return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
        }

        if(existingUser){
            return res.status(422).send({errors: [{title: 'Invalid email', detail: 'User with this email already exists!'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save((err)=>{
            if(err){
                return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
            }

            return res.json({'Registered':true});
        });
    })
    
}


exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    

    if(token){
        const user = parseToken(token);
        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: mongooseHelper.normalizeErrors(err.errors)});
            }
            if(user){
                res.locals.user = user;
                next();
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res){
    return res.status(401).send({errors: [{title: 'Not authorized', detail: 'You need to login to get access!'}]});
}