const http = require("http");
// yo http node js ko inbuilt module ho,  require garda path haru dinu pardaina 
const fileOp = require('./file.js');

// server program
var server = http.createServer(function (request, response) {
    // this callback is executed whenever a client request arrived
    // request or 1st argument is always http request object
    // response or 2nd argument is always http response object
    // request response cycle must be completed
    console.log("client connected to server")
    // console.log("request url is: ",request.url)
    // console.log("request method is: ",request.method)
    // response must be sent
    // regardless of any method and url this callback is executed for every http client request call
    // response.end("welcome to Nodejs server");
    if (request.url === '/write') {
        fileOp.write('filename.txt', 'i am nodejs')
            .then(function (data) {
                response.end('success in write');
            })
            .catch(function (err) {
                response.end('failure in write')
            })
    }
    else if (request.url === '/read') {

    } else {
        response.end('nothing to perform')
    }
})
// skype port no: 80
// apache port no: 80
// skype ra apache ko port no same vayara skype chalako bela apache chaldaina ra apache chalako bela skype chaldaina

// server program lai as a process run garna lai host ra port ma listen garaunu parxa  
server.listen(9000, 'localhost', function (err, done) {
    if (err) {
        console.log("server listening failed: ", err)
    }
    else {
        console.log("server listening at port 9000")
        console.log("press CTRL + c to exit")
    }
})
// console.log("server is running");
// server.listen(9000,'127.0.0.1')

// program -> set of instruction, k garne vanne kura haruko instruction ko collection
// process ->runable state ma vako program