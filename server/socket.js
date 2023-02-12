const socket = require('socket.io')
const config = require('./configs')
module.exports = function (app) {
    const io = socket(app.listen(config.SOCKET_PORT), {
        cors: {
            allow: '/*'
        }
    });
    io.on('connection', function (client) {
        // id
        console.log('client connected to socket server', client)
        client.emit('welcome to socket server');

        // client.emit is for only connected client
        // client.broadcast.emit() i it is for all other connected client except own requesting client

        // client.broadcast.to('/client id').emit('event', 'message')
        // for selected client (eg. private chat)

        client.on('hi', function (data) {
            console.log('data in hi: ', data)
        })
    })
}