app.use(function (req, res, next) {
    console.log('application level middleware');
    // regardless of any method and url this middleware came into action
    next();
})
app.use('/payment', function (req, res, next) {
    // application level middleware
    // regardless of any method but url must be /payment
})

app.get('/feedback', function (req, res, next) {
    // application level middleware
    // specific endpoint[Method and Url] ko handler
})

// url ra method aayapaxi communication ko lagi talako handler
app.get('/home', function (req, res, next) {
    // handler for get method and empty url
    res.json({
        // msg: 'you are at empty page.'
        msg: 'you are at home.'
    })
})
/* 
function checkTicket(req, res,next){
    next();
}
function validateTicket(req,res,next){

}
app.use(checkTicket)
app.use(validateTicket)
app.use(checkTicket,validateTicket)


// app.use("hi")
// app.use() ma function bahek aru kei rakhna mildaina and rakhiyako functions is a middleware function ie. app.use ma middleware function bahek aru kei rakhna mildaina

app.use(function(req,res,next){ // this function block is a middleware not this whole block of code is a middleware
    console.log("i am at middleware function");
    // res.json({
    //     msg:'req res cycle blocked at middleware'
    // })
    req.ommani='broadway'
    next(); // yo next() call garnu vaneko yo middleware bata arko middleware ma pass garnu ho aaphno control pass garnu ho
})
app.use(function(req,res,next){
    res.json({
        checkProp:req.ommani,
        msg:'blocked at 2nd middleware'
    })
})
*/
app.get('/help', function (req, res, next) {
    res.send('you are at help page.')
    // handler for get method and /help url
    // res is for response
    // req res cycle must be completed 
    // response can be completed with sending data as well
    // response method
    // res.send()
    // res.sendFile()
    // res.json()
    // res.jsonp()
    // res.redirect()
    // res.render()
    // res.download()
    // res.sendStatus(); -> it completess req-res cycle
    // res.status(); -> it will not complete req-res cycle but it will set status for response
    // all above method for response response cycle complete garne

})
app.get('/write/:filename/:content', function (req, res) {
    // res.send('write');
    console.log('filename: ', req.params.filename);
    console.log('content: ', req.params.content);

    res.json({
        msg: 'from write',
        params: req.params,
        query: req.query
    })
    // auta request ko lagi duita response kaile pani aaudaina
    // or auta request ko lagi duita response kaile pani pathauna mildaina
    // request-response cycle ma jaile pani header haru aadan pradain hunxa, response nai complete vaisake paxi tyo headers set garna sakdaina, update garna sakdaina
})
app.get('/read', function (req, res) {
    res.send('read');
})
app.get('/rename', function (req, res) {
    res.send('rename');
})

app.post('/login', function (req, res) {

})
app.put('/login', function (req, res) {

})