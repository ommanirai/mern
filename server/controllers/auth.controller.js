const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')
const randomStr = require('random-string')
const UserModel = require('./../models/user.model')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const conxnURL = 'mongodb://localhost:27017'
const dbName = 'group32db';
const mapUserReq = require('./../helpers/map_user_req')
const uploader = require('./../middlewares/uploader')
const jwt = require('jsonwebtoken')
const config = require('./../configs')
const passwordHash = require('password-hash')

function createToken(user) {
    let token = jwt.sign({
        _id: user._id
    }, config.JWT_SECRET)
    return token;
}


// console.log('__dirname in auth >> ',__dirname);
// console.log('__root directory path in auth >> ',process.cwd());
// sender information
const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ommanirai27@gmail.com',
        pass: 'ommanirai'
    }
})

function prepareMail(data) {
    return {
        // sender address
        from: 'ourStore',
        // list of receivers
        to: 'ommanirai27@gmail.com,' + data.email,
        // subject line
        subject: 'Forgot Password',
        // plain text body
        text: '/Forgot Password',
        // html body
        html: `<p>Hi <strong>${data.name}</strong></p>
        <p>We noticed that you are having trouble logging into our system please use link below to reset your password</p>
        <p><a href="${data.link}">/click here to reset your password</a></p>
        <p>if you have not requested to reset password please kindly ignore this email</p>
        <p>Regard</p>
        <p>ourStore team</p>
        `
    }
}


router.get('/', function (req, res, next) {
    // require('fs').readFile('slfls.lkd', function (err, done) {
    //     if (err) {
    //         return next(err);
    //     }
    // })
    res.render('index.pug', {
        title: 'Node and Express',
        message: 'welcome to Express'
    });
})


router.post('/login', function (req, res, next) {
    // console.log('here at post request');
    // console.log('data >>', req.body);
    // db operation
    UserModel.findOne({
        // find return array
        // findOne return object
        username: req.body.username
    })
        .exec(function (err, user) {
            if (err) {
                return next(err)
            }
            if (!user) {
                return next({
                    msg: 'Invalid Username',
                    status: 400
                })
            }
            if (user.isActivated) {
                return next({
                    msg: 'Your account is disabled please contact system administrator for support',
                    status: 401
                })
            }
            if (user) {
                // password verification TODO
                // res.json(user)
                var isMatched = passwordHash.verify(req.body.passwrod, user.password)
                if (isMatched) {
                    // token generation
                    var token = createToken(user);
                    res.json({
                        user: user,
                        token: token
                    })
                }
                else {
                    return next({
                        msg: 'Invalid Password',
                        status: 400
                    })
                }
            }
        })


    // MongoClient.connect(conxnURL, {
    //     useUnifiedTopology: true
    // }, function (err, client) {
    //     if (err) {
    //         return next(err)
    //     }
    //     const db = client.db(dbName)
    //     db
    //         .collection('users')
    //         .find({})
    //         .toArray(function (err, done) {
    //             if (err) {
    //                 return next(err)
    //             }
    //             res.json(done)
    //         })
    // })
    // if everything goes fine
    res.redirect('/user/dashboard')

})

router.post('/register', uploader.single('img'), function (req, res, next) {
    // for multiple file upload
    // uploader.array('img')
    // console.log('req.files: ', req.files)

    // console.log('req.body>>', req.body);
    // console.log('req.file: ', req.file)
    // db stuff
    if (fileTypeError) {
        return next({
            msg: 'Invalid File Format',
            status: 400
        })
    }
    const newUser = new UserModel({}); // newUser is mongoose Object
    if (req.file) {
        // if(req.file.mimetype === 'image/jpg' || 'image.png')
        const mimeType = req.file.mimetype.split('/')
        // console.log('mimetype: ', mimeType)
        // if (mimeType !== 'image') {
        //     // fs module inject garera remove uploaded file
        //     return next({
        //         msg: 'Invalid File Format',
        //         status: 400
        //     })
        // }
        req.body.image = req.file.filename;
    }

    // if (req.body.role)
    //     newUser.role = req.body.role
    // if (req.body.isActivated)
    //     newUser.isActivated = req.body.isActivated
    // if (req.body.username)
    //     newUser.username = req.body.username
    // if (req.body.password)
    //     newUser.password = req.body.password
    // if (req.body.email)
    //     newUser.email = req.body.emqil
    // if (req.body.name)
    //     newUser.name = req.body.name
    // if (req.body.gender)
    //     newUser.gender = req.body.gender
    // if (!newUser.address)
    //     newUser.address = {}
    // if (req.body.temp_address)
    //     newUser.address.tempAddress = req.body.temp_address.split(',')
    // if (req.body.permanent_address)
    //     newUser.body.permanentAddress = req.body.address.permanent_address
    // if (req.body.date_of_birth)
    //     newUser.body.dob = req.body.date_of_birth
    // if (req.body.phoneNumber)
    //     newUser.phoneNumber = req.body.phoneNumber



    // newUser.name = req.body.full_name,
    //     newUser.username = req.body.username,
    //     newUser.password = req.body.password, // todo hash password
    //     newUser.email = req.body.email,
    //     newUser.phoneNumber = req.body.phoneNumber,
    //     newUser.address = {};
    // if (req.body.temp_address) {
    //     newUser.address.tempAddress = req.body.temp_address.split(',')
    // }
    // newUser.address.permanentAddress = req.body.permanent_address,
    //     newUser.gender = req.body.gender,
    //     newUser.dob = req.body.date_of_birth,


    // new user is mongoose Object;
    // methods of mongoose
    // e 11000 mongodb --> duplicate key error index

    // using callback
    // newUser.save(function (err, done) {
    //     if (err) {
    //         return next(err)
    //     }
    //     res.json(done)
    // })

    const newMappedUser = mapUserReq(newUser, req.body)
    newMappedUser.password = passwordHash.generate(req.body.password)
    // using promise
    newMappedUser
        .save()
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            next(er)
        })



    // const finalData = {
    //     // ...req.body, //spread operator, object laai copy garxa
    //     name: req.body.name,
    //     email: req.body.emailAddress || req.body.email
    // }
    // MongoClient.connect(conxnURL, function (err, client) {
    //     if (err) {
    //         return next(err);
    //     }
    //     console.log('db connection open')
    //     const selectedDb = client.db(dbName);
    //     // db operation
    //     selectedDb.collection('users').insertOne(finalData, function (err, done) {
    //         if (err) {
    //             return next(err)
    //         }
    //         res.json(done)
    //     })
    // })
})

router.post('/forgot_password', function (req, res, next) {
    UserModel.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next({
                msg: 'Email not registered yet',
                status: 404
            })
        }

        const passwordResetToken = randomStr({
            length: 23
        })
        // password reset expiry time - 2 day
        const passwordResetTokenExpiry = Date.now() + (1000 * 60 * 60 * 24 * 2);
        // proceed with email sending
        var emailData = {
            name: user.username,
            email: user.email,
            // link: `${req.headers.origin}/reset_password/${user._id}`
            link: `${req.headers.origin}/reset_password/${passwordResetToken}`
        }

        var emailContent = prepareMail(emailData)

        user.passwordResetToken = passwordResetToken;
        user.passwordResetTokenExpiry = passwordResetTokenExpiry;
        user.save(function (err, saved) {
            if (err) {
                return next(err)
            }
            sender.sendMail(emailContent, function (err, done) {
                if (err) {
                    return next(err)
                }
                res.json(done)
            })
        })

    })
})

router.post('/reset_password/:token', function (req, res, next) {
    const token = req.params.token;

    UserModel.findOne({
        // _id: token
        passwordResetToken: token, passwordResetTokenExpiry: {
            $gte: Date.now()
        }
    }, function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next({
                msg: 'Password Invalid or Expired Password reset token',
                status: 404
            })
        }
        // if within time frame
        user.password = passwordHash.generate(req.body.password);
        user.passwordResetToken = null;
        user.passwordResetTokenExpiry = null;
        user.save(function (err, updated) {
            if (err) {
                return next(err);
            }
            res.json(updated)
        })
    })
})

// router.get('/', function (req, res, next) {
//     require('fs').readFile('.navakofiletohandleerror.js', function (err, done) {
//         if (err) {
//             return req.myEvent.emit('error', err, res)
//         }
//     })
// })


module.exports = router;