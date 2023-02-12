const events = require('events')

// create instance
const myEvent = new events.EventEmitter();

// trigger the event
setTimeout(function () {
    myEvent.emit('ommani', 'welcome to events') // event trigger
}, 3000)

// listen
myEvent.on('ommani', function (data) { // event listener
    console.log('this block will be executed once ommani event is fired', data)
})
