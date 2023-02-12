const router = require('express').Router();
// const dbConfig = require('./../configs/db.config')
const UserModel = require('./../models/user.model')
const mapUserReq = require('./../helpers/map_user_req')
const uploader = require('./../middlewares/uploader')

// function connection(cb) {
//     dbConfig.MongoClient.connect(dbConfig.conxnURL, {
//         useUnifiedTopology: true
//     }, function (err, client) {
//         if (err) {
//             return cb(err)
//         }
//         const db = client.db(dbConfig.dbName);
//         cb(null, db)
//     })
// } 

router.route('/')
    .get(function (req, res, next) {
        console.log('loggedInUser', req.user)
        // get all user
        var condition = {}
        // projection
        UserModel
            .find(condition, {
                username: 1 // inclusion (username matra display garna lai)
                // username: 0 // exclusion (username baahek aru sabai property display garna lai)
            })
            .sort({
                _id: -1 // descending order
            })
            // .limit(2)
            // .skip()
            .exec(function (err, users) {
                if (err) {
                    return next(err)
                }
                res.json(users)
            })




        // .get(xyz,abc,function (req, res, next) {
        // res.json({
        //     msg: 'from empty user'
        // })
        // connection(function (err, db) {
        //     if (err) {
        //         return next(err)
        //     }
        //     db
        //         .collection('users')
        //         .find({})
        //         .toArray(function (err, users) {
        //             if (err) {
        //                 return next(err)
        //             }
        //             res.json(users)
        //         })
        // })

    })
    .post(function (req, res, next) {

    })
// .put(function (req, res, next) {

// })
// .delete(function (req, res, next) {

// }
// );

// Static
router.route('/search')
    .get(function (req, res, next) {
        res.send('from search of user')

    })
    .post(function (req, res, next) {

    })

// Dynamic
router.route('/:id')
    .get(function (req, res, next) {
        // res.send("from dynamic handler")
        UserModel
            // .findOne({
            //     _id: req.params.id
            // })
            .findById(req.params.id)
            .then(function (user) {
                if (!user) {
                    return next({
                        msg: 'User Not Found',
                        status: 404
                    })
                }
                res.json(user)
            })
            .catch(function (err) {
                next(err)
            })


        // connection(function (err, db) {
        //     if (err) {
        //         return next(err)
        //     }
        //     db
        //         .collection('users')
        //         .find({
        //             _id: new dbConfig.Oid(req.params.id)
        //         })
        //         .toArray(function (err, user) {
        //             if (err) {
        //                 return next(err)
        //             }
        //             // res.json(user) 
        //             // yesle array return garxa, id bata search garepaxi sadhai auta data vetinxa where array is not required
        //             res.json(user[0]) // yesle object return garxa
        //         })
        // })

    })
    .put(uploader.single('img'), function (req, res, next) {
        if (req.fileTypeError) {
            return next({
                msg: 'Invalid File Format',
                status: 400
            })
        }
        UserModel
            .findById(req.params.id, function (err, user) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return next({
                        msg: 'User Not Found',
                        status: 404
                    })
                }
                // user found now update
                // user is mongoose object

                if (req.file) {
                    req.body.images = req.file.filename
                }

                var updatedMappedUser = mapUserReq(user, req.body)

                // if (req.body.role)
                //     user.role = req.body.role
                // if (req.body.isActivated)
                //     user.isActivated = req.body.isActivated
                // if (req.body.username)
                //     user.username = req.body.username
                // if (req.body.password)
                //     user.password = req.body.password
                // if (req.body.email)
                //     user.email = req.body.emqil
                // if (req.body.name)
                //     user.name = req.body.name
                // if (req.body.gender)
                //     user.gender = req.body.gender
                // if (!user.address)
                //     user.address = {}
                // if (req.body.temp_address)
                //     user.address.tempAddress = req.body.temp_address.split(',')
                // if (req.body.permanent_address)
                //     user.body.permanentAddress = req.body.address.permanent_address
                // if (req.body.date_of_birth)
                //     user.body.dob = req.body.date_of_birth
                // if (req.body.phoneNumber)
                //     user.phoneNumber = req.body.phoneNumber

                updatedMappedUser.save(function (err, updated) {
                    if (err) {
                        return next(err);
                    }
                    // once updated if there is new file in request, remove old file
                    // server clean up
                    res.json(updated)
                })
            })


        // connection(function (err, db) {
        //     if (err) {
        //         return next(err)
        //     }
        //     db
        //         .collection('users')
        //         .update({ _id: new dbConfig.Oid(req.params.id) }, {
        //             $set: req.body
        //         }, function (err, update) { // update vayo ki vayena vanera check garna ko lagi this callback function
        //             if (err) {
        //                 return next(err)
        //             }
        //             res.json(update)
        //         })
        // })

    })
    .delete(function (req, res, next) {
        if (req.user.role !== 1) {
            return next({
                msg: 'You Dont Have Access',
                status: 401
            })
        }
        UserModel
            .findById(req.params.id, function (err, user) {
                if (err) {
                    return next(err)
                }
                if (!user) {
                    return next({
                        msg: 'User Not Found',
                        status: 404
                    })
                }
                user.remove(function (err, removed) {
                    if (err) {
                        return next(err)
                    }
                    res.json(removed)
                })
            })




        // connection(function (err, db) {
        //     if (err) {
        //         return next(err)
        //     }
        //     db
        //         .collection('users')
        //         .remove({
        //             _id: new dbConfig.Oid(req.params.id)
        //         })
        //         .then(function (removed) {
        //             res.json(removed)
        //         })
        //         .catch(function (err) {
        //             next(err)
        //         })
        // })

    })


router.get('/dashboard', function (req, res, next) {
    res.json({
        msg: 'from dashboard'
    })
})


module.exports = router;

// hamile jaile pani static handler laai first maa rakhnu parxa ani dynamic handler laai last ma rakhnu parxa