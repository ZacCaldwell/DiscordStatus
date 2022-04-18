const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    status: String,
});

const statusModel = module.exports = mongoose.model('status', statusSchema);