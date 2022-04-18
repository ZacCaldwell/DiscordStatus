require('./main.js')
require('./addStatus')
const mongoose = require('mongoose')
const config = require('./config.json')

mongoose.connect(config.mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})