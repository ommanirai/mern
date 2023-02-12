const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config')

// mongoose.createConnection()
mongoose.connect(dbConfig.conxnURL + '/' + dbConfig.dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function (err, done) {
    if (err) {
        console.log('db connection failed: ', err)
    }
    else {
        console.log('db connection success: ', done)
    }
})