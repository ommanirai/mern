const { urlencoded } = require('express');
const express = require('express');
const req = require('express/lib/request');
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const app = express(); // app is now entire express framework

// const db = require('./db')
require('./db')

// event stuff
// const events = require('events')
// const myEvent = new events.EventEmitter();

// app.use(function (req, res, next) {
//     req.myEvent = myEvent
//     next();
// })

// myEvent.on('error', function (err, res) {
//     console.log('at own error handler: ', err) 
//     res.json(err)
// })

// console.log('__dirname >>',__dirname);
// console.log('__root directory path >>',process.cwd());

require('./socket.js')(app)

app.set('port', 8000)
// start of view engine setup
const pug = require('pug');
app.set('view engine', pug)
app.set('views', path.join(__dirname, 'views'));
// end of view engine setup


// import routing level middleware
// const authRouter = require('./controllers/auth.controller')
// const userRouter = require('./controllers/user.controller')
// const productRouter = require('./components/products/product.route')
const apiRoute = require('./api.routes')

// import application level middleware
// const isAdmin = require('./middlewares/isAdmin')
// const authenticate = require('./middlewares/authenticate')

// load third party middleware
// app.use(morgan('combined'))
app.use(morgan('dev'));
app.use(cors()) // accept all origin


// load inbuilt middleware
app.use(express.static('uploads')) // (internal serve) express js as an independent web application
// app.use('/file',express.static('uploads')); // inbuilt middleware(express aaphai sanga vako middleware)
app.use(express.static(path.join(__dirname, 'uploads'))) // external client request serve
// incoming data must be parsed
// parser for x-www-form-urlencoded
app.use(urlencoded({
    extended: true
}))
// json parser
app.use(express.json());
// parser middleware will parse incoming data and add those data in req.body property



// load routing level middleware
// mount incoming request
// app.use('/',authRouter);
app.use('/api', apiRoute)
// app.use('/auth', authRouter);
// app.use('/user', isAdmin, authenticate, authorize, a, b, c, userRouter);
// app.use('/user', authenticate, userRouter);
// app.use('/user', isAdmin, userRouter);
// app.use('/notification', authenticate, userRouter);
// app.use('/product', productRouter);
// app.use('/review', authenticate, userRouter);

// application handler middleware as a 404 handler
app.use(function (req, res, next) {
    // application level middleware
    next({
        // msg:'from application level midleware'
        msg: 'Not Found',
        status: 404
    })
})


// error handling middleware must be called to get executed
// to call error handling middleware we will call next with argument
// the argument sent in next is first value of error handling middleware

// app.use(function(err,req,res){ // next rakhiyana vane application level middleware hunxa
app.use(function (err, req, res, next) { // yo 4 ota argument vayako/rakheko middleware error handling middleware
    // err or 1st argument is argument passed inside next
    // req or 2nd http request
    // res or 3rd response
    // next or 4th next reference
    // TODO set status code in the error response
    // console.log('error is: ', err)
    res.status(err.status || 400)
    res.json({
        // text: 'from error handling middleware', 
        msg: err.msg || err,
        status: err.status || 400
    })
    res.send('hi')
})

app.listen(app.get('port'), function (err, done) {
    if (err) {
        console.log("error is: ", err);
    }
    else {
        console.log("server listening at port" + app.get('port'));
    }
})
// communication ko lagi url ra method is compulsory. without url and method there is no communication.

// endpoint -> combination of url and method

// middleware
// middleware is a function which has access to http request object, http response objent and next middleware function reference
// middleware always came into action in between request response cycle
// middleware is very very powerful function which can modify request and complete response

// THE ORDER OF MIDDLEWARE IS VERY IMPORTANT

// SYNTAX:
// function(req,res,next){
//     // req or 1st argument is for http request object
//     // res or 2nd argument is for http response object
//     // next or 3rd argument is for next middleware reference
// }

// configuration of middleware
// app.use() // configuration block of middleware

// nodemon instalation
// npm install -g nodemon -> -g => global


// types of middleware
/**
1. application level middleware
2. routing level middleware
3. third party middleware -> npmjs ma vako middleware haru third party middleware ho
4. inbuilt middleware -> express js aaphai sanga vako  middleware jati inbuilt middleware
5. error handling middleware

1. application level middleware
-> middleware having scope of req, res and next are application level middleware

2. routing level middleware
-> 



express js as an independent web application
*/